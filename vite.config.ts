/// <reference types="vitest/config" />
// Build setup (docs/08, sections 4 and 8). `npm run dev` serves the game with live reload; `npm run build` packs it into dist/,
// which GitHub Actions publishes to the play link.
import { defineConfig, type Plugin } from "vite";
import { cpSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";

// Folders served as they are, next to the game: the 3D models and the old style-test link (it forwards to the game).
const COPY = ["assets", "prototypes"];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(n => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? listFiles(p) : [p];
  });
}

// Copies the folders above into dist/ and writes the offline helper (sw.js) with the list of the game's own files.
// The models are not in that list: the helper keeps each one the first time it's used, so a phone on the Light look
// never downloads them.
function copyAndOffline(): Plugin {
  let outDir = "dist";
  return {
    name: "thr-copy-and-offline",
    apply: "build",
    configResolved(c) { outDir = c.build.outDir; },
    closeBundle() {
      for (const d of COPY) cpSync(d, join(outDir, d), { recursive: true });
      const all = listFiles(outDir)
        .map(p => relative(outDir, p).replaceAll("\\", "/"))
        .filter(p => !COPY.some(d => p.startsWith(d + "/")) && p !== "sw.js");
      // stored on the first visit: the page, what it loads directly, the icons and the manifest. Engine pieces loaded
      // only when needed (shaders and such, in build/) are kept the first time they're used.
      const html = readFileSync(join(outDir, "index.html"), "utf8");
      const direct = new Set([...html.matchAll(/(?:src|href)="\.\/(build\/[^"]+)"/g)].map(m => m[1]!));
      const files = all.filter(f => !f.startsWith("build/") || direct.has(f));
      const hash = createHash("sha256");
      for (const f of all.sort()) hash.update(f);
      const version = hash.digest("hex").slice(0, 12);
      const sw = `// Offline helper, written by vite.config.ts at build time. Version ${version}.
const VERSION = "thr-${version}", MODELS = "thr-models";
const GAME = ${JSON.stringify(["./", ...files.filter(f => f !== "index.html")])};
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(GAME)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("thr-") && k !== VERSION && k !== MODELS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    // the page itself: the newest from the web when online, the kept copy when offline
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put("./", c)); return r; })
      .catch(() => caches.match("./")));
    return;
  }
  const isModel = url.pathname.includes("/assets/");
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(isModel ? MODELS : VERSION).then(x => x.put(req, c)); }
    return r;
  })));
});
`;
      writeFileSync(join(outDir, "sw.js"), sw);
    },
  };
}

export default defineConfig({
  base: "./",
  build: { assetsDir: "build", target: "es2022", chunkSizeWarningLimit: 6000 },
  server: { port: 5173, strictPort: true },
  plugins: [copyAndOffline()],
  test: { include: ["tests/**/*.test.ts"] },
});
