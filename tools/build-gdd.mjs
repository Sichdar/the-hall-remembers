// Builds docs/gdd.md, the combined Game Design Document, from the phase files.
// The phase files stay the source: edit them, then run  node tools/build-gdd.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const docs = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "docs");
const parts = [
  ["summary.md", "The game on one page"],
  ["00-brief.md", "Brief and lasting decisions"],
  ["01-concept.md", "Phase 1: Concept"],
  ["02-core-gameplay.md", "Phase 2: Core gameplay"],
  ["03-player-experience.md", "Phase 3: Player experience"],
  ["04-world-story-characters.md", "Phase 4: World, story and characters"],
  ["05-content-progression.md", "Phase 5: Content and progression"],
  ["06-art-audio.md", "Phase 6: Art and audio direction"],
  ["07-ui-ux.md", "Phase 7: UI and UX"],
  ["08-technical-design.md", "Phase 8: Technical design"],
  ["09-business-ethics-legal.md", "Phase 9: Business, ethics and legal"],
  ["10-scope-production.md", "Phase 10: Scope and production plan"],
  ["11-prototyping-playtesting.md", "Phase 11: Prototyping and playtesting"],
  ["12-polish-launch-beyond.md", "Phase 12: Polish, launch and beyond"],
  ["vision-check-villager-eye.md", "Appendix A: Vision check, the villager's eye"],
  ["visual-direction.md", "Appendix B: Visual direction notes"],
];

// GitHub-style heading anchor
const anchor = t => t.trim().toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, "").replace(/ /g, "-");

// Push every heading one level down, skipping code blocks, and drop the file's own title.
function demote(text) {
  let inCode = false, droppedTitle = false;
  return text.replace(/\r\n/g, "\n").split("\n").filter(line => {
    if (/^```/.test(line)) inCode = !inCode;
    if (!inCode && !droppedTitle && /^# /.test(line)) { droppedTitle = true; return false; }
    return true;
  }).map(line => {
    if (/^```/.test(line)) inCode = !inCode;
    return !inCode && /^#{1,5} /.test(line) ? "#" + line : line;
  }).join("\n").trim();
}

const out = [
  "# The Hall Remembers: Bloodlines: Game Design Document",
  "",
  `*Combined from the phase files on ${new Date().toLocaleDateString("en-GB")}. Don't edit this file: edit the files in \`docs/\` and run \`node tools/build-gdd.mjs\`. Links to other phases open their own files.*`,
  "",
  "## Contents",
  "",
  ...parts.map(([, title]) => `- [${title}](#${anchor(title)})`),
  "",
];
for (const [file, title] of parts) {
  const body = fs.readFileSync(path.join(docs, file), "utf8");
  out.push("---", "", `# ${title}`, "", `*Source: [${file}](${file})*`, "", demote(body), "");
}
fs.writeFileSync(path.join(docs, "gdd.md"), out.join("\n"));
console.log(`docs/gdd.md written: ${parts.length} parts, ${out.join("\n").split("\n").length} lines`);
