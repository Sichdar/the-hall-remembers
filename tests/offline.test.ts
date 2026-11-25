import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// docs/08, sections 4 and 8: the game works offline and phones never fetch code from anyone else.
const files = (dir: string): string[] => readdirSync(dir).flatMap(n => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? files(p) : [p];
});

describe("offline and nothing from other websites", () => {
  it("the page loads no script, style or font from another website", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).not.toMatch(/<(script|link)[^>]+(src|href)="https?:\/\//i);
  });

  it("the game's code fetches nothing from another website", () => {
    for (const f of files("src")) {
      const text = readFileSync(f, "utf8");
      expect(text, f).not.toMatch(/(fetch|import|SceneLoader[\w.]*|url)\(\s*["'`]https?:\/\//i);
      expect(text, f).not.toMatch(/cdn\.jsdelivr|unpkg\.com|cdnjs|googleapis/i);
    }
  });

  it("the page has what the Home Screen needs", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('rel="manifest"');
    const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("./");
    for (const icon of manifest.icons) expect(statSync(join("public", icon.src)).size).toBeGreaterThan(0);
  });
});
