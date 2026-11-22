// Tiny local web server for the game (no installs needed): node tools/dev-server.mjs
// Serves the project folder at http://localhost:5173/ , like GitHub Pages does. Only for testing on this PC.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || process.argv[2] || 5173); // another port lets two sessions test at once
const root =normalize(fileURLToPath(new URL("..", import.meta.url)));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".mjs": "text/javascript", ".json": "application/json",
  ".glb": "model/gltf-binary", ".gltf": "model/gltf+json", ".png": "image/png", ".jpg": "image/jpeg", ".bin": "application/octet-stream" };

http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(root, p));
  // only the game page and the folders that go public are served
  const ok = file === join(root, "index.html") || ["prototypes", "assets", "docs", "ui"].some(d => file.startsWith(join(root, d) + sep));
  if (!ok) { res.writeHead(403); return res.end(); }
  try {
    let body = await readFile(file);
    if (extname(file) === ".html" && !body.toString("utf8", 0, 20).toLowerCase().startsWith("<!doctype")) {
      body = Buffer.concat([Buffer.from('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'), body]);
    }
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("not found"); }
}).listen(port, "127.0.0.1", () => console.log("Serving the game at http://localhost:" + port + "/"));
