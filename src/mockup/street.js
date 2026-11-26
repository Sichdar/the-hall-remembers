// M0: the street, the 3D world of the mock-up (Phases 6 and 7), moved here unchanged from the old single page. It stays
// plain JavaScript until M1-M3 rebuild each part in TypeScript. Babylon.js 9 is packed inside the game (docs/08, section 4).
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const V3 = BABYLON.Vector3, C3 = BABYLON.Color3, MB = BABYLON.MeshBuilder;
const canvas = document.getElementById("c");
const isTouch = matchMedia("(pointer: coarse)").matches;
const engine = new BABYLON.Engine(canvas, true, { stencil: true, preserveDrawingBuffer: false }, false);
engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 2));
const scene = new BABYLON.Scene(engine);
scene.ambientColor = new C3(0, 0, 0);
scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
scene.fogDensity = 0;

// ---------- colours (Phase 6 palette) ----------
const P = {
  grass: "#BFA552", grassDark: "#A99343", grassLight: "#CDB76A", path: "#C99A5B", sand: "#E3CF9E",
  rock: "#A89F8E", stone: "#A39A88", white: "#EFE9DC", sandstone: "#D9C19A",
  roof: ["#B5552F", "#A84B2B", "#C0623A"], ridge: "#8E3F22", thatch: "#CDB062", thatchDark: "#B89A4E",
  timber: "#8A6A45", timberDark: "#5E4329", door: "#5A3A22",
  olive: "#7C8A45", cypress: "#2F4A2C", corkLeaf: "#64733F", bush: "#6C7F3C", trunk: "#7B6A58", cork: "#B5643A",
  field: "#7E8F3E", soil: "#9C7A4A", wheat: "#D9B85C",
  sea: "#1F4E8C", shallow: "#3FB5B0", almara: "#2F6FB3", gold: "#F2C14E"
};
const mats = {};
function mat(hex, opt) {
  opt = opt || {};
  const key = hex + (opt.emissive || "") + (opt.twoSided ? "2" : "");
  if (mats[key]) return mats[key];
  const m = new BABYLON.StandardMaterial("m" + key, scene);
  m.diffuseColor = C3.FromHexString(hex);
  m.specularColor = new C3(0, 0, 0);
  m.maxSimultaneousLights = 8;
  if (opt.emissive) m.emissiveColor = C3.FromHexString(opt.emissive);
  if (opt.twoSided) m.backFaceCulling = false;
  mats[key] = m;
  return m;
}
// seeded random so the street looks the same every visit
let seed = 20261121;
function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
function rr(a, b) { return a + rnd() * (b - a); }
function pick(a) { return a[Math.floor(rnd() * a.length)]; }

// ---------- lights and shadows ----------
const hemi = new BABYLON.HemisphericLight("hemi", new V3(0, 1, 0), scene);
const sun = new BABYLON.DirectionalLight("sun", new V3(0.6, -1.3, -0.25), scene);
sun.shadowMinZ = 1; sun.shadowMaxZ = 220;
sun.autoUpdateExtends = false;
sun.shadowFrustumSize = 64;
const sg = new BABYLON.ShadowGenerator(isTouch ? 1024 : 2048, sun);
if (engine.webGLVersion >= 2) { sg.usePercentageCloserFiltering = true; sg.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM; }
else sg.usePoissonSampling = true;
sg.bias = 0.0012; sg.normalBias = 0.03; sg.darkness = 0.35;
function cast(m) { sg.addShadowCaster(m); m.receiveShadows = true; return m; }

// ---------- helpers ----------
function box(w, h, d, hex, x, y, z, parent, opt) {
  const m = MB.CreateBox("b", { width: w, height: h, depth: d }, scene);
  m.material = typeof hex === "string" ? mat(hex, opt) : hex;
  m.position.set(x, y, z);
  if (parent) m.parent = parent;
  return m;
}
// gable roof prism: length along x, span along z, apex height h
function prism(L, S, H, material, parent, y) {
  const a = [-L/2, 0, -S/2], b = [-L/2, H, 0], c = [-L/2, 0, S/2], d = [L/2, 0, -S/2], e = [L/2, H, 0], f = [L/2, 0, S/2];
  const faces = [[a, c, b], [d, e, f], [a, b, e, d], [c, f, e, b], [a, d, f, c]];
  const pos = [], idx = [], nor = [];
  const ctr = [0, H / 3, 0];
  faces.forEach(fc => {
    const p0 = new V3(...fc[0]), p1 = new V3(...fc[1]), p2 = new V3(...fc[2]);
    let n = V3.Cross(p1.subtract(p0), p2.subtract(p0)).normalize();
    const mid = fc.reduce((s, p) => s.add(new V3(...p)), V3.Zero()).scale(1 / fc.length);
    if (V3.Dot(n, mid.subtract(new V3(...ctr))) < 0) n = n.scale(-1);
    const base = pos.length / 3;
    fc.forEach(p => { pos.push(...p); nor.push(n.x, n.y, n.z); });
    for (let i = 1; i < fc.length - 1; i++) idx.push(base, base + i, base + i + 1);
  });
  const m = new BABYLON.Mesh("roof", scene);
  const vd = new BABYLON.VertexData(); vd.positions = pos; vd.indices = idx; vd.normals = nor; vd.applyToMesh(m);
  const mm = material.clone ? material : mat(material);
  m.material = mm; m.parent = parent; m.position.y = y;
  return m;
}
const roofMats = P.roof.map(h => { const m = mat(h).clone("roof" + h); m.backFaceCulling = false; return m; });

// window glass: glows at dusk and night
const winMat = new BABYLON.StandardMaterial("win", scene);
winMat.diffuseColor = C3.FromHexString("#2E2620"); winMat.specularColor = new C3(0, 0, 0); winMat.maxSimultaneousLights = 8;
const winGlow = new C3(1, 0.68, 0.3);

// instanced bases for nature and props
function base(mesh, hex) { mesh.material = mat(hex); mesh.convertToFlatShadedMesh(); mesh.position.y = -500; mesh.isPickable = false; mesh.receiveShadows = true; return mesh; }
const BS = {
  trunk: base(MB.CreateCylinder("trunk", { height: 1, diameterTop: 0.24, diameterBottom: 0.36, tessellation: 6 }, scene), P.trunk),
  cork: base(MB.CreateCylinder("cork", { height: 1, diameterTop: 0.34, diameterBottom: 0.5, tessellation: 6 }, scene), P.cork),
  cone: base(MB.CreateCylinder("cone", { height: 1, diameterTop: 0, diameterBottom: 1, tessellation: 7 }, scene), P.cypress),
  olive: base(MB.CreateIcoSphere("olive", { radius: 1, subdivisions: 1 }, scene), P.olive),
  corkLeaf: base(MB.CreateIcoSphere("corkLeaf", { radius: 1, subdivisions: 1 }, scene), P.corkLeaf),
  bush: base(MB.CreateIcoSphere("bush", { radius: 1, subdivisions: 1 }, scene), P.bush),
  rock: base(MB.CreateIcoSphere("rock", { radius: 1, subdivisions: 1 }, scene), P.rock),
  post: base(MB.CreateBox("post", { width: 0.16, height: 1, depth: 0.16 }, scene), P.timber),
  rail: base(MB.CreateBox("rail", { width: 1, height: 0.09, depth: 0.08 }, scene), "#9B8463"),
  barrel: base(MB.CreateCylinder("barrel", { height: 0.9, diameterTop: 0.6, diameterBottom: 0.6, tessellation: 8 }, scene), "#7A5232"),
  crate: base(MB.CreateBox("crate", { size: 0.7 }, scene), "#A07A4A"),
  pine: base(MB.CreateIcoSphere("pine", { radius: 1, subdivisions: 1 }, scene), "#4E6B34"),
  stump: base(MB.CreateCylinder("stump", { height: 1, diameterTop: 0.5, diameterBottom: 0.62, tessellation: 7 }, scene), "#C9A877"),
  log: base(MB.CreateCylinder("log", { height: 1.6, diameter: 0.3, tessellation: 6 }, scene), "#8C6A44"),
  row: base(MB.CreateBox("row", { width: 1, height: 0.22, depth: 0.55 }, scene), P.field),
  wheat: base(MB.CreateBox("wheat", { width: 1, height: 0.4, depth: 0.6 }, scene), P.wheat),
  patch: base(MB.CreateCylinder("patch", { height: 0.02, diameter: 1, tessellation: 9 }, scene), P.grassDark),
  patchL: base(MB.CreateCylinder("patchL", { height: 0.02, diameter: 1, tessellation: 9 }, scene), P.grassLight)
};
function inst(b, x, y, z, sx, sy, sz, ry, noShadow) {
  const i = b.createInstance("i");
  i.position.set(x, y, z);
  i.scaling.set(sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz);
  if (ry) i.rotation.y = ry;
  i.isPickable = false;
  if (!noShadow) sg.addShadowCaster(i);
  if (tagPlain) tagPlain.push(i);
  if (curParts) curParts.push(i);
  return i;
}
// things that only show in the plain look (the Quaternius look has its own versions);
// plain trees and torch posts stay in both looks, as the free Quaternius pack has no trees or lanterns
const plainOnly = [], plainTrees = [], plainTorch = [];
let tagPlain = false, curParts = null;
const spots = { trees: [], fences: [], props: [] };

// ---------- collision ----------
const blockers = []; // {x,z,hw,hd}
function block(x, z, hw, hd) { blockers.push({ x, z, hw, hd }); }

// ---------- ground, path, shore ----------
const ground = box(140, 2, 70, P.grass, 0, -1, 9); ground.receiveShadows = true;
const path = box(110, 0.06, 4.2, P.path, 0, 0.03, 0); path.receiveShadows = true;
const lane = box(3, 0.06, 23, P.path, 4.5, 0.031, -13); lane.receiveShadows = true;
const sand = box(140, 1, 6, P.sand, 0, -0.62, -27); sand.receiveShadows = true;
const shallow = MB.CreateGround("shallow", { width: 160, height: 18 }, scene); shallow.position.set(0, -0.38, -38); shallow.material = mat(P.shallow);
const sea = MB.CreateGround("sea", { width: 600, height: 600 }, scene); sea.position.set(0, -0.45, -40); sea.material = mat(P.sea);
for (let i = 0; i < 60; i++) {
  const x = rr(-60, 60), z = rr(-20, 40);
  if (Math.abs(z) < 3) continue;
  inst(rnd() < 0.5 ? BS.patch : BS.patchL, x, 0.012, z, rr(2, 6), 1, rr(2, 5), rr(0, 3), true);
}
for (let i = 0; i < 18; i++) inst(BS.rock, rr(-60, 60), rr(-0.3, 0), rr(-28, -23.5), rr(0.6, 1.6), rr(0.4, 0.9), rr(0.6, 1.4), rr(0, 3));

// ---------- trees ----------
function olive(x, z, s) {
  spots.trees.push({ x, z, s, k: "olive" }); tagPlain = plainTrees;
  inst(BS.trunk, x, 0.7 * s, z, s * 1.1, 1.4 * s, s * 1.1, rr(0, 3));
  inst(BS.olive, x, 1.9 * s, z, 1.35 * s, 0.85 * s, 1.25 * s, rr(0, 3));
  inst(BS.olive, x + 0.6 * s, 2.35 * s, z - 0.3 * s, 0.8 * s, 0.6 * s, 0.8 * s, rr(0, 3));
  block(x, z, 0.35, 0.35); tagPlain = false;
}
function corkOak(x, z, s) {
  spots.trees.push({ x, z, s, k: "cork" }); tagPlain = plainTrees;
  inst(BS.cork, x, 1.1 * s, z, s, 2.2 * s, s, rr(0, 3));
  inst(BS.corkLeaf, x, 2.9 * s, z, 2.3 * s, 1.15 * s, 2.0 * s, rr(0, 3));
  inst(BS.corkLeaf, x - 1.1 * s, 2.6 * s, z + 0.5 * s, 1.2 * s, 0.8 * s, 1.2 * s, rr(0, 3));
  inst(BS.corkLeaf, x + 1.0 * s, 3.2 * s, z - 0.4 * s, 1.1 * s, 0.8 * s, 1.1 * s, rr(0, 3));
  block(x, z, 0.4, 0.4); tagPlain = false;
}
function cypress(x, z, s) {
  spots.trees.push({ x, z, s, k: "cypress" }); tagPlain = plainTrees;
  inst(BS.trunk, x, 0.25 * s, z, 0.8 * s, 0.5 * s, 0.8 * s);
  inst(BS.cone, x, 0.4 * s + 2.6 * s, z, 1.15 * s, 5.2 * s, 1.15 * s, rr(0, 3));
  block(x, z, 0.4, 0.4); tagPlain = false;
}
// P-WORK: stone pines of the work forest. Each remembers its pieces, so it can shake when struck and become a stump.
function pine(x, z, s) {
  const spot = { x, z, s, k: "pine", work: true, parts: [] };
  spots.trees.push(spot); tagPlain = plainTrees; curParts = spot.parts;
  inst(BS.trunk, x, 1.6 * s, z, s * 1.3, 3.2 * s, s * 1.3, (x * 7) % 3);
  inst(BS.pine, x, 3.6 * s, z, 2.2 * s, 0.75 * s, 2.0 * s, (x * 3) % 3);
  inst(BS.pine, x + 0.7 * s, 3.25 * s, z + 0.5 * s, 1.3 * s, 0.55 * s, 1.2 * s, (z * 5) % 3);
  block(x, z, 0.4, 0.4); tagPlain = false; curParts = null;
}
function bush(x, z, s) { inst(BS.bush, x, 0.35 * s, z, s, 0.7 * s, s * rr(0.8, 1.2), rr(0, 3)); }

// ---------- fences ----------
function fence(x1, z1, x2, z2) {
  spots.fences.push([x1, z1, x2, z2]); tagPlain = plainOnly;
  const len = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(len / 2)), ang = Math.atan2(z2 - z1, x2 - x1);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    inst(BS.post, x1 + (x2 - x1) * t, 0.5, z1 + (z2 - z1) * t, 1, 1, 1, rr(-0.1, 0.1));
  }
  const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
  [0.45, 0.8].forEach(h => inst(BS.rail, cx, h, cz, len, 1, 1, -ang));
  tagPlain = false;
}

// ---------- houses (rebuilt when the town stage changes) ----------
const housesSpec = [
  { x: -19, z: -6.4, f: 1 }, { x: -7.5, z: -6.2, f: 1 }, { x: 3.5, z: -6.6, f: 1 }, { x: 15, z: -6.3, f: 1 },
  { x: -13, z: 6.3, f: -1 }, { x: -1.5, z: 6.5, f: -1 }, { x: 10, z: 6.2, f: -1 }
].map(h => ({ ...h, w: rr(4.6, 5.6), d: rr(3.8, 4.4), yaw: rr(-0.07, 0.07), wall: pick([P.white, P.white, P.sandstone]), roof: Math.floor(rnd() * 3) }));
let houseRoot = null;
const winMeshes = [];
function buildHouses(stage) {
  if (houseRoot) houseRoot.dispose(false, false);
  winMeshes.length = 0;
  houseRoot = new BABYLON.TransformNode("houses", scene);
  housesSpec.forEach(h => {
    const r = new BABYLON.TransformNode("house", scene);
    r.parent = houseRoot; r.position.set(h.x, 0, h.z); r.rotation.y = (h.f > 0 ? 0 : Math.PI) + h.yaw;
    const parts = [];
    const win = (x, y, z, ry) => { const m = box(0.62, 0.62, 0.1, winMat, x, y, z, r); m.rotation.y = ry || 0; winMeshes.push(m); parts.push(m); };
    if (stage === 2) {
      const w = h.w, d = h.d, H = 2.8, y0 = 0.5;
      parts.push(box(w + 0.3, 0.5, d + 0.3, P.stone, 0, 0.25, 0, r));
      parts.push(box(w, H, d, h.wall, 0, y0 + H / 2, 0, r));
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sz]) => parts.push(box(0.2, H, 0.2, P.timberDark, sx * (w / 2 - 0.02), y0 + H / 2, sz * (d / 2 - 0.02), r)));
      parts.push(box(w + 0.02, 0.16, d + 0.02, P.timberDark, 0, y0 + H * 0.52, 0, r));
      parts.push(prism(w + 0.7, d + 0.9, 1.7, roofMats[h.roof], r, y0 + H));
      parts.push(box(w + 0.75, 0.16, 0.24, P.ridge, 0, y0 + H + 1.7, 0, r));
      [1, -1].forEach(s => parts.push(box(w + 0.72, 0.14, 0.16, P.almara, 0, y0 + H + 0.02, s * (d + 0.9) / 2, r)));
      parts.push(box(0.5, 1.4, 0.5, P.stone, w * 0.26, y0 + H + 1.3, -d * 0.12, r));
      parts.push(box(0.95, 1.75, 0.12, P.door, -w * 0.2, y0 + 0.88, d / 2 + 0.05, r));
      parts.push(box(1.3, 0.12, 0.6, P.timberDark, -w * 0.2, y0 + 1.95, d / 2 + 0.25, r));
      win(w * 0.22, y0 + H * 0.74, d / 2 + 0.05); win(w * 0.22, y0 + H * 0.3, d / 2 + 0.05);
      win(-w * 0.2, y0 + H * 0.74, -d / 2 - 0.05); win(w * 0.22, y0 + H * 0.5, -d / 2 - 0.05);
      win(w / 2 + 0.05, y0 + H * 0.6, 0, Math.PI / 2); win(-w / 2 - 0.05, y0 + H * 0.6, 0, Math.PI / 2);
    } else {
      const w = h.w * 0.88, d = h.d * 0.9, H = 2.3;
      parts.push(box(w, H, d, P.timber, 0, H / 2, 0, r));
      for (let i = 1; i <= 3; i++) parts.push(box(w + 0.03, 0.07, d + 0.03, P.timberDark, 0, i * H / 4, 0, r));
      const roof = MB.CreateCylinder("thatch", { height: 2.3, diameterTop: 0, diameterBottom: Math.SQRT2, tessellation: 4 }, scene);
      roof.rotation.y = Math.PI / 4; roof.bakeCurrentTransformIntoVertices(); roof.convertToFlatShadedMesh();
      roof.scaling.set(w + 1.0, 1, d + 1.0); roof.position.y = H + 1.15; roof.parent = r; roof.material = mat(P.thatch);
      parts.push(roof);
      parts.push(box(w + 0.9, 0.18, 0.12, P.almara, 0, H + 0.02, (d + 0.9) / 2, r));
      parts.push(box(0.9, 1.6, 0.12, P.door, -w * 0.18, 0.8, d / 2 + 0.05, r));
      win(w * 0.24, H * 0.55, d / 2 + 0.05); win(-w * 0.1, H * 0.55, -d / 2 - 0.05);
      parts.push(box(1.6, 0.9, 0.5, P.thatchDark, w * 0.3, 0.45, -d / 2 - 0.6, r));
    }
    parts.forEach(cast);
  });
}
housesSpec.forEach(h => block(h.x, h.z, h.w / 2 + 0.4, h.d / 2 + 0.4));

// ---------- fields, orchards, fences, props ----------
for (let z = -12; z > -21; z -= 1.15) { inst(BS.row, -20, 0.11, z, 22, 1, 1, 0, true); }
for (let z = -12; z > -21; z -= 1.2) { inst(BS.wheat, 20, 0.2, z, 22, 1, 1, 0, true); }
fence(-31, -10.6, -9, -10.6); fence(9, -10.6, 31, -10.6); fence(-31, -10.6, -31, -21.5); fence(31, -10.6, 31, -21.5);
fence(-22, 10.8, -6, 10.8); fence(6, 10.8, 23, 10.8); // gap at x 4.2 for the north lane (same length, same random draws)
for (let x = -20; x <= -8; x += 4) for (let z = 14; z <= 22; z += 4) olive(x + rr(-0.6, 0.6), z + rr(-0.6, 0.6), rr(0.85, 1.1));
for (let x = 8; x <= 22; x += 4.5) for (let z = 14; z <= 22; z += 4.5) olive(x + rr(-0.6, 0.6), z + rr(-0.6, 0.6), rr(0.85, 1.1));
[[-27, 4], [-28, 12], [27, 5], [-2, 15], [1, 25], [28, 14], [-30, 22], [30, 24]].forEach(([x, z]) => corkOak(x, z, rr(0.9, 1.2)));
[[-25, -4.5], [-25.5, -8], [23, -3.8], [23.5, -8.5], [-2.5, -9.5], [9.5, -9.5], [-6, 11.5], [-3, 11.5], [6.8, 11.5], [36, 0], [-36, 0], [-36, 4]]
  .forEach(([x, z]) => cypress(x, z, rr(0.85, 1.15)));
for (let i = 0; i < 46; i++) {
  const x = rr(-34, 34), z = rr(-10, 12);
  if (Math.abs(z) < 3.2) continue;
  if (Math.abs(x - 4.2) < 2 && z > 0) continue; // keep the north lane clear
  if (blockers.some(b => Math.abs(x - b.x) < b.hw + 0.6 && Math.abs(z - b.z) < b.hd + 0.6)) continue;
  bush(x, z, rr(0.5, 0.95));
}
// P-WORK: one line of stone pines west of the timber yard, nearest first, so the work walks outward as they fall.
// Fixed small offsets instead of the street's random draws, so everything else in the street keeps its place.
for (let i = 0; i < 12; i++) pine(-33 - 2.2 * i, (i % 2 ? 11 : 7.5) + Math.sin(i * 2.3) * 0.5, 0.95 + 0.1 * Math.sin(i * 1.7));
function props(x, z) {
  const k = Math.floor(rnd() * 3);
  if (k === 0) { inst(BS.barrel, x, 0.45, z, 1); inst(BS.barrel, x + 0.7, 0.45, z + 0.2, 1); inst(BS.crate, x + 0.2, 0.35, z + 0.8, 1, 1, 1, 0.4); }
  else if (k === 1) { for (let i = 0; i < 3; i++) for (let j = 0; j < 3 - i; j++) { const l = inst(BS.log, x + j * 0.32 + i * 0.16, 0.15 + i * 0.27, z, 1); l.rotation.x = Math.PI / 2; } }
  else { inst(BS.crate, x, 0.35, z, 1); inst(BS.crate, x, 1.05, z, 1, 1, 1, 0.3); inst(BS.barrel, x + 0.8, 0.45, z, 1); }
  block(x + 0.4, z + 0.3, 0.9, 0.8);
}
[[-13.2, -3.4], [-1.3, -3.3], [9.6, -3.4], [21, -3.3], [-19.5, 3.2], [-7.2, 3.3], [4.8, 3.2], [16, 3.4]].forEach(([x, z]) => props(x, z));

// cart
(function () {
  const r = new BABYLON.TransformNode("cart", scene); r.position.set(-24, 0, 2.6); r.rotation.y = 0.3;
  cast(box(2.2, 0.5, 1.3, "#94704A", 0, 0.85, 0, r));
  [[0, 0.68], [0, -0.68]].forEach(([x, z]) => { const w = MB.CreateCylinder("wheel", { height: 0.12, diameter: 1.1, tessellation: 10 }, scene); w.material = mat(P.timberDark); w.rotation.x = Math.PI / 2; w.position.set(x, 0.55, z); w.parent = r; cast(w); });
  [0.4, -0.4].forEach(z => { const s = box(1.8, 0.1, 0.1, P.timber, 1.9, 0.6, z, r); s.rotation.z = 0.25; cast(s); });
  block(-24, 2.6, 1.6, 1.0);
  plainOnly.push(r);
})();
// P-WORK: the timber yard's log pile, one log per load delivered (15 at most), in both looks
const yardLogs = [];
(function () {
  const rows = [5, 4, 3, 2, 1];
  rows.forEach((n, row) => { for (let k = 0; k < n; k++) {
    const l = BS.log.createInstance("yl"); l.rotation.z = Math.PI / 2; l.rotation.y = 0.3;
    l.position.set(-23 + Math.sin(0.3) * (k - (n - 1) / 2) * 0.32, 0.15 + row * 0.27, 5.1 + Math.cos(0.3) * (k - (n - 1) / 2) * 0.32);
    l.isPickable = false; l.setEnabled(false); sg.addShadowCaster(l); yardLogs.push(l);
  } });
  block(-23, 5.1, 0.9, 0.9);
})();
function yardPile(n) { yardLogs.forEach((l, i) => l.setEnabled(i < n)); }

// banner of Almara: square, blue, white wave
const bannerTex = new BABYLON.DynamicTexture("bannerTex", { width: 256, height: 320 }, scene, true);
(function () {
  const g = bannerTex.getContext();
  g.fillStyle = P.almara; g.fillRect(0, 0, 256, 320);
  g.strokeStyle = "#F4F1EA"; g.lineWidth = 16; g.strokeRect(14, 14, 228, 292);
  g.lineWidth = 22; g.lineCap = "round"; g.beginPath(); g.moveTo(40, 175);
  g.bezierCurveTo(80, 110, 110, 110, 128, 165); g.bezierCurveTo(146, 220, 176, 220, 216, 150); g.stroke();
  g.lineWidth = 12; g.beginPath(); g.moveTo(52, 230); g.bezierCurveTo(90, 195, 115, 200, 128, 225); g.bezierCurveTo(141, 250, 170, 250, 204, 215); g.stroke();
  bannerTex.update();
})();
const bannerMat = new BABYLON.StandardMaterial("bannerMat", scene);
bannerMat.diffuseTexture = bannerTex; bannerMat.specularColor = new C3(0, 0, 0); bannerMat.backFaceCulling = false; bannerMat.maxSimultaneousLights = 8;
bannerMat.emissiveColor = new C3(0.12, 0.12, 0.12);
const bannerPole = box(0.16, 5.4, 0.16, P.timberDark, 1.2, 2.7, 2.9); cast(bannerPole);
const bar = box(1.7, 0.1, 0.1, P.timberDark, 2.0, 5.2, 2.9); cast(bar);
const banner = MB.CreatePlane("banner", { width: 1.5, height: 1.9, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
banner.material = bannerMat; banner.setPivotPoint(new V3(0, 0.95, 0)); banner.position.set(2.05, 4.2, 2.9); cast(banner);
block(1.2, 2.9, 0.3, 0.3);
// notice board
(function () {
  const r = new BABYLON.TransformNode("board", scene); r.position.set(-3.5, 0, 2.9);
  [-0.8, 0.8].forEach(x => cast(box(0.14, 2, 0.14, P.timberDark, x, 1, 0, r)));
  cast(box(1.9, 1.1, 0.1, "#9B7B52", 0, 1.45, 0, r));
  cast(box(2.1, 0.12, 0.35, P.timberDark, 0, 2.06, 0, r));
  [[-0.5, 1.6], [0.1, 1.35], [0.55, 1.65]].forEach(([x, y]) => box(0.42, 0.5, 0.02, "#EEE6D2", x, y, -0.07, r));
  block(-3.5, 2.9, 1.0, 0.3);
})();

// P-WORK 2: where the town's errands are done (src/sim/errands.ts). The interface adds the words; this draws the work.
const ERRAND_SITES = {
  palisade: { x: -12, z: 25.4 },  // a gap in the north palisade, filled stake by stake
  forge: { x: 6.6, z: -3.0 },     // the Smith's firewood stack, across the lane from where he stands
  oven: { x: -17, z: -3.2 }       // the bread oven's wood pile, in front of the baker's house
  // (both on the south side of the street, whose house fronts face the camera, so the piles can be seen growing)
};
const gapStakes = [];
// a wood pile of up to 8 logs that grows with the errand
function woodPile(x, z) {
  const logs = [];
  [4, 3, 1].forEach((n, row) => { for (let k = 0; k < n; k++) {
    // logs lie along x (rotated a quarter turn), side by side along z, rows stacked up
    const l = BS.log.createInstance("el"); l.rotation.z = Math.PI / 2;
    l.position.set(x, 0.15 + row * 0.27, z + (k - (n - 1) / 2) * 0.32);
    l.isPickable = false; l.setEnabled(false); sg.addShadowCaster(l); logs.push(l);
  } });
  block(x, z, 0.7, 0.7);
  return logs;
}
// the piles stand just east of where you stand to deliver, clear of the house fronts
const errandPiles = { forge: woodPile(ERRAND_SITES.forge.x + 1.6, ERRAND_SITES.forge.z), oven: woodPile(ERRAND_SITES.oven.x + 1.6, ERRAND_SITES.oven.z) };
/** Shows how far an errand has got, 0 to 1: the palisade gap fills, a pile grows. `open` = the palisade's gap before anyone fills it. */
function errandShow(id, share) {
  if (id === "palisade") { const n = Math.round(share * gapStakes.length); gapStakes.forEach((p, i) => p.forEach(m => m.setEnabled(i < n))); return; }
  const logs = errandPiles[id]; if (logs) { const n = Math.round(share * logs.length); logs.forEach((l, i) => l.setEnabled(i < n)); }
}

// north lane and the north gate (a timber gatehouse in a palisade; shown in both looks, the Quaternius packs have no gate)
const gate = { x: 4.2, z: 27 };
const northLane = box(2.6, 0.06, 25, P.path, gate.x, 0.032, 14.6); northLane.receiveShadows = true;
(function () {
  const r = new BABYLON.TransformNode("northGate", scene); r.position.set(gate.x, 0, gate.z);
  [-2.1, 2.1].forEach(x => {
    cast(box(1.5, 4.6, 1.5, P.timberDark, x, 2.3, 0, r));          // tower
    cast(box(1.9, 0.25, 1.9, P.timber, x, 4.7, 0, r));             // tower top
    [-0.7, 0.7].forEach(dx => cast(box(0.18, 0.5, 1.9, P.timber, x + dx, 5.05, 0, r))); // battlements
    block(gate.x + x, gate.z, 0.85, 0.85);
  });
  cast(box(2.8, 0.45, 0.6, P.timber, 0, 3.7, 0, r));               // beam over the way
  [-1, 1].forEach(s => { const d = box(1.35, 3, 0.14, "#7A5A3A", s * 1.35, 1.5, 0.75, r); d.rotation.y = s * -1.2; cast(d); }); // doors swung open
  // palisade of pointed stakes either side (instances: about 80 stakes cost one draw each for stake and tip)
  const stakeB = base(MB.CreateBox("stake", { width: 0.42, height: 1, depth: 0.42 }, scene), "#8A6A44");
  const tipB = base(MB.CreateCylinder("tip", { height: 0.45, diameterTop: 0, diameterBottom: 0.5, tessellation: 4 }, scene), "#8A6A44");
  const stake = x => { const h = 2.5 + Math.abs(Math.sin(x * 3.7)) * 0.35; return [inst(stakeB, gate.x + x, h / 2, gate.z, 1, h, 1), inst(tipB, gate.x + x, h + 0.22, gate.z, 1)]; };
  // P-WORK 2: the stakes around x = -12 can be pulled out and put back, one by one (the palisade errand)
  for (let x = -3.3; x > -22; x -= 0.46) { const pair = stake(x), wx = gate.x + x; if (Math.abs(wx - ERRAND_SITES.palisade.x) < 1.4) gapStakes.push(pair); }
  for (let x = 3.3; x < 22; x += 0.46) stake(x);
  block(gate.x - 12.6, gate.z, 9.4, 0.3); block(gate.x + 12.6, gate.z, 9.4, 0.3);
  // a post and iron cup each side of the way
  [-3.3, 3.3].forEach(x => { cast(box(0.2, 1.4, 0.2, P.timberDark, x, 0.7, 1.1, r)); box(0.5, 0.2, 0.5, "#3E3A35", x, 1.45, 1.1, r); });
})();

// torches along the street (light at dusk and night)
const torches = [];
[[-17, 2.5], [-6, -2.6], [7, 2.5], [18, -2.6], [-26, -2.6], [26, 2.5]].forEach(([x, z], i) => {
  plainTorch.push(cast(box(0.14, 2.1, 0.14, P.timberDark, x, 1.05, z)));
  const cup = box(0.32, 0.18, 0.32, "#3E3A35", x, 2.15, z); plainTorch.push(cup);
  spots.props.push({ k: "lantern", x, z });
  const flameMat = new BABYLON.StandardMaterial("flame" + i, scene); flameMat.diffuseColor = new C3(0.3, 0.15, 0.05); flameMat.specularColor = new C3(0, 0, 0);
  const flame = MB.CreateIcoSphere("flame", { radius: 0.17, subdivisions: 1 }, scene); flame.material = flameMat; flame.position.set(x, 2.36, z); flame.scaling.y = 1.5;
  const light = i < 4 ? new BABYLON.PointLight("torch" + i, new V3(x, 2.6, z), scene) : null;
  if (light) { light.diffuse = new C3(1, 0.6, 0.28); light.specular = new C3(0, 0, 0); light.range = 13; light.intensity = 0; }
  torches.push({ flame, flameMat, light, phase: rr(0, 6) });
  block(x, z, 0.25, 0.25);
});

// ---------- people ----------
const skins = ["#E0B48C", "#C68E62", "#9A6A45", "#F1C9A5", "#B57B52"];
const tunics = ["#7A5C3E", "#9C8A6A", "#5E6B4A", "#8B4E3A", "#B8A27A", "#6E6250"];
function person(o) {
  const root = new BABYLON.TransformNode("person", scene);
  const bodyN = new BABYLON.TransformNode("bodyN", scene); bodyN.parent = root;
  const parts = [];
  const body = MB.CreateCapsule("body", { height: 1.1, radius: 0.27, tessellation: 8, subdivisions: 1 }, scene);
  body.material = mat(o.tunic); body.position.y = 0.6; body.parent = bodyN; parts.push(body);
  const head = MB.CreateIcoSphere("head", { radius: 0.25, subdivisions: 2, flat: false }, scene);
  head.material = mat(o.skin); head.position.y = 1.4; head.parent = bodyN; parts.push(head);
  [-0.09, 0.09].forEach(x => { const e = box(0.05, 0.06, 0.03, "#2A211B", x, 1.44, 0.235, bodyN); parts.push(e); });
  const sash = box(0.6, 0.11, 0.6, P.almara, 0, 0.84, 0, bodyN); sash.rotation.z = 0.65; parts.push(sash);
  if (o.hat === 1) { const h = MB.CreateCylinder("hat", { height: 0.32, diameterTop: 0.1, diameterBottom: 0.75, tessellation: 8 }, scene); h.material = mat("#D9C27A"); h.position.y = 1.66; h.parent = bodyN; parts.push(h); }
  if (o.hat === 2) { const h = MB.CreateCylinder("cap", { height: 0.16, diameter: 0.46, tessellation: 8 }, scene); h.material = mat(P.almara); h.position.y = 1.6; h.parent = bodyN; parts.push(h); }
  if (o.prop === "axe") {
    const hd = box(0.06, 0.9, 0.06, "#7A5A3A", 0.34, 0.75, 0.1, bodyN); hd.rotation.x = 0.3; parts.push(hd);
    parts.push(box(0.05, 0.22, 0.26, "#8F8F8F", 0.34, 1.15, 0.27, bodyN));
  } else if (o.prop === "basket") {
    const b = MB.CreateCylinder("basket", { height: 0.36, diameterTop: 0.55, diameterBottom: 0.4, tessellation: 8 }, scene);
    b.material = mat("#B08A4E"); b.position.set(0, 1.0, -0.33); b.parent = bodyN; parts.push(b);
  } else if (o.prop === "spear") {
    parts.push(box(0.05, 2.0, 0.05, "#7A5A3A", 0.33, 1.0, 0.05, bodyN));
    parts.push(box(0.06, 0.24, 0.06, "#9A9A9A", 0.33, 2.1, 0.05, bodyN));
    const sh = MB.CreateCylinder("shield", { height: 0.06, diameter: 0.6, tessellation: 10 }, scene);
    sh.material = mat(P.almara); sh.rotation.z = Math.PI / 2; sh.position.set(-0.32, 0.8, 0.05); sh.parent = bodyN; parts.push(sh);
  }
  parts.forEach(p => { sg.addShadowCaster(p); p.isPickable = false; });
  return { root, bodyN, parts };
}
const walkers = [];
[
  { x1: -28, x2: 26, z: 0.8, prop: "basket" }, { x1: -20, x2: 12, z: -0.9, prop: "axe" },
  { x1: -5, x2: 24, z: 1.4, prop: null }, { x1: -26, x2: -2, z: -1.4, prop: "spear" },
  { x1: 2, x2: 4, z: 3.9, prop: null, idle: true }, { x1: -4.5, x2: -2.5, z: 1.9, prop: null, idle: true }
].forEach(w => {
  const p = person({ tunic: pick(tunics), skin: pick(skins), hat: Math.floor(rnd() * 3), prop: w.prop });
  const x = rr(w.x1, w.x2); p.root.position.set(x, 0, w.z);
  walkers.push({ ...w, p, x, dir: rnd() < 0.5 ? 1 : -1, speed: w.idle ? 0 : rr(1.0, 1.5), t: rr(0, 6), wait: 0, moving: false });
});

// the player's villager
const me = person({ tunic: "#4F6A86", skin: "#E0B48C", hat: 0, prop: "axe" }); // P-WORK: you are the woodcutter
me.root.position.set(-1, 0, -0.2);
const ring = MB.CreateTorus("ring", { diameter: 1.3, thickness: 0.13, tessellation: 24 }, scene);
const ringMat = new BABYLON.StandardMaterial("ringMat", scene); ringMat.diffuseColor = C3.FromHexString(P.gold); ringMat.emissiveColor = C3.FromHexString("#C8932A"); ringMat.specularColor = new C3(0, 0, 0);
ring.material = ringMat; ring.parent = me.root; ring.position.y = 0.05;
// start facing down the street (+x), so first person doesn't open on the villager at the notice board
const meState = { yaw: Math.PI / 2, fpYaw: Math.PI / 2, fpPitch: 0.05 };
me.root.rotation.y = meState.yaw;

// ---------- cameras ----------
const iso = new BABYLON.ArcRotateCamera("iso", Math.PI / 4, 0.955, 80, new V3(0, 1, 0), scene);
iso.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA; iso.minZ = 1; iso.maxZ = 400;
const zooms = [7.5, 11, 15.5]; let zoomI = Math.min(window.innerWidth, window.innerHeight) < 500 ? 0 : 1;
// "close" = the on-screen zoom toggle: brings the camera in so your villager is bigger (remembered per device)
let close = false; try { close = localStorage.getItem("thr-close") === "1"; } catch (e) {}
const CLOSE = 0.6; let fpReady = false;
function fitOrtho() {
  const a = engine.getRenderWidth() / Math.max(1, engine.getRenderHeight()), h = zooms[zoomI] * (close ? CLOSE : 1);
  // landscape: h is half the screen's height; portrait: h is half its width, so the villager is the same size both ways
  const top = a >= 1 ? h : h / a;
  iso.orthoTop = top; iso.orthoBottom = -top; iso.orthoLeft = -top * a; iso.orthoRight = top * a;
  // first person: a fixed sideways view in landscape; upright phones keep a fixed up-down view so the edges don't warp
  if (fpReady) {
    if (a >= 1) { fp.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED; fp.fov = 1.4; }
    else { fp.fovMode = BABYLON.Camera.FOVMODE_VERTICAL_FIXED; fp.fov = 1.2; }
  }
}
function setClose(b) { close = !!b; try { localStorage.setItem("thr-close", close ? "1" : "0"); } catch (e) {} fitOrtho(); }
const fp = new BABYLON.UniversalCamera("fp", new V3(0, 1.55, 0), scene);
// fixed horizontal view (about 80°): on wide landscape phones a fixed vertical view stretched the screen edges
fp.minZ = 0.08; fp.maxZ = 400; fp.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED; fp.fov = 1.4; fp.inputs.clear();
fpReady = true; fitOrtho(); // first fit, now that both cameras exist
let view = "iso";
scene.activeCamera = iso;

// ---------- time of day ----------
const T = {
  dawn:  { dir: [-0.35, -0.5, 0.9],   sI: 0.7, sC: "#FFD9A8", hI: 0.5, hC: "#E7DCCB", hG: "#6E5A44", sky: "#E7D3B0", fog: 0.006, win: 0.25, torch: 0.2, vig: 0.12 },
  day:   { dir: [0.6, -1.3, -0.25],   sI: 0.95, sC: "#FFF2DC", hI: 0.5, hC: "#DDE6F5", hG: "#7A6440", sky: "#8FBCE6", fog: 0, win: 0, torch: 0, vig: 0 },
  dusk:  { dir: [0.9, -0.38, 0.4],    sI: 0.8, sC: "#FF9A5A", hI: 0.42, hC: "#E9A79A", hG: "#4E3A3A", sky: "#E58A6B", fog: 0.003, win: 0.75, torch: 0.65, vig: 0.25 },
  night: { dir: [0.4, -1, 0.3],       sI: 0.4, sC: "#8FA6FF", hI: 0.36, hC: "#5A6FB8", hG: "#141A33", sky: "#0C1430", fog: 0, win: 1, torch: 1, vig: 0.85 }
};
function toState(p) { return { dir: new V3(...p.dir).normalize(), sI: p.sI, sC: C3.FromHexString(p.sC), hI: p.hI, hC: C3.FromHexString(p.hC), hG: C3.FromHexString(p.hG), sky: C3.FromHexString(p.sky), fog: p.fog, win: p.win, torch: p.torch, vig: p.vig }; }
let cur = toState(T.day), target = toState(T.day), timeName = "day";
function lerpState(k) {
  cur.dir = V3.Lerp(cur.dir, target.dir, k).normalize();
  ["sI", "hI", "fog", "win", "torch", "vig"].forEach(n => cur[n] += (target[n] - cur[n]) * k);
  ["sC", "hC", "hG", "sky"].forEach(n => cur[n] = C3.Lerp(cur[n], target[n], k));
}
const vig = document.getElementById("vig");
function applyState(t) {
  sun.direction.copyFrom(cur.dir); sun.intensity = cur.sI; sun.diffuse.copyFrom(cur.sC); sun.specular.set(0, 0, 0);
  const fpDark = view === "fp" ? 1 - 0.45 * cur.vig : 1;
  hemi.intensity = cur.hI * fpDark; hemi.diffuse.copyFrom(cur.hC); hemi.groundColor.copyFrom(cur.hG); hemi.specular.set(0, 0, 0);
  scene.clearColor = new BABYLON.Color4(cur.sky.r, cur.sky.g, cur.sky.b, 1);
  scene.fogColor = cur.sky; scene.fogDensity = cur.fog;
  winMat.emissiveColor = winGlow.scale(cur.win);
  torches.forEach(tc => {
    const fl = 0.85 + 0.15 * Math.sin(t * 9 + tc.phase) * Math.sin(t * 5.3 + tc.phase * 2);
    tc.flameMat.emissiveColor = new C3(1, 0.55, 0.18).scale(Math.min(1, cur.torch * 1.2) * fl);
    if (tc.light) tc.light.intensity = cur.torch * 1.7 * fl;
  });
  vig.style.opacity = view === "iso" ? cur.vig.toFixed(3) : "0";
  const outline = cur.vig > 0.4;
  me.parts.forEach(p => { p.renderOutline = outline; p.outlineColor = C3.FromHexString(P.gold); p.outlineWidth = 0.025; });
  ringMat.emissiveColor = C3.FromHexString("#C8932A").scale(0.8 + cur.vig * 0.6);
}

// ---------- input: joystick (left thumb), look (right thumb), keyboard ----------
const joyEl = document.getElementById("joy"), knob = document.getElementById("knob"), touchEl = document.getElementById("touch");
const joy = { id: null, cx: 0, cy: 0, x: 0, y: 0 };
const look = { id: null, lx: 0, ly: 0 };
const keys = {};
const R = 50;
function joyHome() { joyEl.style.left = ""; joyEl.style.bottom = ""; joyEl.style.top = ""; knob.style.transform = ""; }
touchEl.addEventListener("pointerdown", e => {
  const leftSide = e.clientX < window.innerWidth * 0.45;
  if (e.pointerType !== "mouse" && leftSide && joy.id === null) {
    joy.id = e.pointerId; joy.cx = e.clientX; joy.cy = e.clientY; joy.x = 0; joy.y = 0;
    joyEl.style.left = (e.clientX - 62) + "px"; joyEl.style.top = (e.clientY - 62) + "px"; joyEl.style.bottom = "auto";
  } else if (look.id === null) {
    look.id = e.pointerId; look.lx = e.clientX; look.ly = e.clientY;
  }
  touchEl.setPointerCapture(e.pointerId);
});
touchEl.addEventListener("pointermove", e => {
  if (e.pointerId === joy.id) {
    let dx = e.clientX - joy.cx, dy = e.clientY - joy.cy; const l = Math.hypot(dx, dy);
    if (l > R) { dx *= R / l; dy *= R / l; }
    joy.x = dx / R; joy.y = dy / R; knob.style.transform = `translate(${dx}px, ${dy}px)`;
  } else if (e.pointerId === look.id) {
    const dx = e.clientX - look.lx, dy = e.clientY - look.ly; look.lx = e.clientX; look.ly = e.clientY;
    if (view === "fp") { meState.fpYaw += dx * 0.006; meState.fpPitch = Math.max(-1.1, Math.min(1.1, meState.fpPitch + dy * 0.005)); }
  }
});
function endPtr(e) { if (e.pointerId === joy.id) { joy.id = null; joy.x = joy.y = 0; joyHome(); } if (e.pointerId === look.id) look.id = null; }
touchEl.addEventListener("pointerup", endPtr); touchEl.addEventListener("pointercancel", endPtr);
window.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; if (e.key.toLowerCase() === "v") toggleView(); });
window.addEventListener("keyup", e => { keys[e.key.toLowerCase()] = false; });

// ---------- HUD ----------
const info = document.getElementById("info"), toast = document.getElementById("toast");
let toastTimer = 0;
function showToast(html) { toast.innerHTML = html; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.hidden = true, 5200); }
toast.addEventListener("click", () => toast.hidden = true);
function group(id, fn) {
  const g = document.getElementById(id);
  g.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    if (fn(b.dataset.v) === false) return;
    g.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
  }));
}
group("timeG", v => { timeName = v; target = toState(T[v]); });
group("stageG", v => {
  stage = +v; buildHouses(stage); if (lookName !== "plain") houseRoot.setEnabled(false);
  if (quatLoaded) buildQuatHouses(stage);
});
function markOn(id, v) { document.getElementById(id).querySelectorAll("button").forEach(x => x.classList.toggle("on", x.dataset.v === v)); }
// two looks: "Full" (Quaternius models, the game's look) and "Light" (plain shapes, the fallback for slow phones).
// The choice is remembered on this device, so a phone that picked Light doesn't download the models every visit.
const LOADERS = {
  quat: { done: () => quatLoaded, load: () => loadQuat(), msg: "Quaternius Medieval Village and RPG Characters (CC0), about 13 MB." }
};
function saveLook(v) { try { localStorage.setItem("thr-look", v); } catch (e) {} }
function savedLook() { try { return localStorage.getItem("thr-look"); } catch (e) { return null; } }
function chooseLook(v) {
  const L = LOADERS[v];
  if (L && !L.done()) {
    showToast("<b>Loading the town…</b><br>" + L.msg);
    L.load().then(() => { toast.hidden = true; setLook(v); markOn("lookG", v); saveLook(v); })
      .catch(err => showToast("<b>The models didn't load.</b> Staying on Light.<br>" + String(err && err.message || err).slice(0, 160)));
    return false;
  }
  setLook(v); saveLook(v);
}
group("lookG", chooseLook);
const viewBtn = document.getElementById("viewBtn"), viewLbl = document.getElementById("viewLbl"), zoomBtn = document.getElementById("zoomBtn"), lookpad = document.getElementById("lookpad");
function toggleView() {
  view = view === "iso" ? "fp" : "iso";
  if (view === "fp") { meState.fpYaw = meState.yaw; meState.fpPitch = 0.05; }
  scene.activeCamera = view === "iso" ? iso : fp;
  me.parts.forEach(p => p.isVisible = view === "iso"); ring.isVisible = view === "iso";
  if (me.q) me.q.setEnabled(lookName !== "plain" && view === "iso");
  viewLbl.textContent = view === "iso" ? "First person" : "Isometric";
  viewBtn.setAttribute("aria-label", view === "iso" ? "Switch to first-person view" : "Switch to isometric view");
  zoomBtn.hidden = view === "fp";
  lookpad.hidden = !(view === "fp" && isTouch);
  info.textContent = view === "fp" ? (isTouch ? "Left thumb: walk · right thumb: look" : "WASD: walk · drag: look · V: view") : (isTouch ? "Left thumb: walk" : "WASD or arrows: walk · V: view");
}
viewBtn.addEventListener("click", toggleView);
zoomBtn.addEventListener("click", () => { zoomI = (zoomI + 1) % zooms.length; fitOrtho(); });
if (!isTouch) { info.textContent = "WASD or arrows: walk · V: view"; document.getElementById("joy").hidden = true; }

// ---------- movement ----------
function collide(pos, r) {
  for (const b of blockers) {
    const dx = pos.x - b.x, dz = pos.z - b.z, ox = b.hw + r - Math.abs(dx), oz = b.hd + r - Math.abs(dz);
    if (ox > 0 && oz > 0) { if (ox < oz) pos.x += Math.sign(dx || 1) * ox; else pos.z += Math.sign(dz || 1) * oz; }
  }
  pos.x = Math.max(-60, Math.min(60, pos.x)); pos.z = Math.max(-23, Math.min(40, pos.z));
}
let mx = 0, mz = 0, walkT = 0, speedMul = 1, swingT = 0;
function swing() {
  swingT = 0.32;
  const q = me.q;
  if (q && q.chop) { if (q.walk) q.walk.stop(); if (q.idle) q.idle.stop(); q.chop.stop(); q.chop.start(false, 1.5); q.state = "swing"; }
}
function face(x, z) { const p = me.root.position; meState.yaw = Math.atan2(x - p.x, z - p.z); }
// a struck tree shakes for a moment; a felled one leaves a stump
const shaking = [];
function shake(spot) { if (!spot.parts) return; if (!spot.shakeT) { spot.base = spot.parts.map(p => p.rotation.z); shaking.push(spot); } spot.shakeT = 0.3; }
function shakeTrees(dt) {
  for (let k = shaking.length - 1; k >= 0; k--) {
    const t = shaking[k]; t.shakeT = Math.max(0, t.shakeT - dt);
    const a = Math.sin(t.shakeT * 40) * 0.05 * (t.shakeT / 0.3);
    t.parts.forEach((p, i) => p.rotation.z = t.base[i] + a);
    if (!t.shakeT) shaking.splice(k, 1);
  }
}
// P-WORK 2: near the work pines, their canopies turn see-through, so you can watch your own swing.
// Instances can't fade one by one, so each nearby canopy is swapped for a faded copy while you're there.
let ghostMat = null;
const ghosted = new Map(); // spot -> [[instance, faded copy], ...]
function unghost(t) { (ghosted.get(t) || []).forEach(([p, g]) => { if (!t.stump) p.setEnabled(true); g.dispose(); }); ghosted.delete(t); }
function seeThrough(pos) {
  for (const t of spots.trees) {
    if (!t.work) continue;
    const near = !t.stump && Math.hypot(t.x - pos.x, t.z - pos.z) < 4.5;
    if (near && !ghosted.has(t)) {
      if (!ghostMat) { ghostMat = BS.pine.material.clone("pineGhost"); ghostMat.alpha = 0.28; }
      const list = [];
      t.parts.forEach(p => { if (p.sourceMesh !== BS.pine) return;
        const g = BS.pine.clone("pineGhost"); g.material = ghostMat; g.isPickable = false; g.receiveShadows = false;
        g.position.copyFrom(p.position); g.scaling.copyFrom(p.scaling); g.rotation.copyFrom(p.rotation);
        p.setEnabled(false); list.push([p, g]); });
      ghosted.set(t, list);
    } else if (!near && ghosted.has(t)) unghost(t);
  }
  ghosted.forEach(list => list.forEach(([p, g]) => g.rotation.copyFrom(p.rotation))); // the faded copy shakes with the tree
}
function fell(spot) {
  if (ghosted.has(spot)) unghost(spot);
  if (!spot.parts || spot.stump) return;
  spot.parts.forEach(p => p.setEnabled(false));
  spot.stump = inst(BS.stump, spot.x, 0.25, spot.z, spot.s, 0.5 * spot.s, spot.s, 0);
  const lg = inst(BS.log, spot.x + 1.1, 0.16, spot.z + 0.4, 0.9, 1, 0.9, 0); lg.rotation.z = Math.PI / 2; lg.rotation.y = 0.6;
}
function updatePlayer(dt) {
  let ix = joy.x, iy = joy.y;
  if (keys.a || keys.arrowleft) ix -= 1; if (keys.d || keys.arrowright) ix += 1;
  if (keys.w || keys.arrowup) iy -= 1; if (keys.s || keys.arrowdown) iy += 1;
  const l = Math.hypot(ix, iy); if (l > 1) { ix /= l; iy /= l; }
  let fx, fz;
  if (view === "iso") { fx = -Math.cos(iso.alpha); fz = -Math.sin(iso.alpha); }
  else { fx = Math.sin(meState.fpYaw); fz = Math.cos(meState.fpYaw); }
  const rx = fz, rz = -fx;
  // P-WORK 2: 5.5 m/s, about 30% faster than the first test's 4.2 (the director: "the character is slow")
  const speed = 5.5 * speedMul;
  const vx = (rx * ix - fx * iy) * speed, vz = (rz * ix - fz * iy) * speed;
  const pos = me.root.position;
  pos.x += vx * dt; pos.z += vz * dt; collide(pos, 0.35);
  const moving = Math.hypot(vx, vz) > 0.1;
  if (moving) { meState.yaw = Math.atan2(vx, vz); walkT += dt * 11; }
  if (view === "iso") me.root.rotation.y = meState.yaw;
  me.bodyN.position.y = moving ? Math.abs(Math.sin(walkT)) * 0.07 : 0;
  // P-WORK: an axe stroke leans the plain body forward; the Full look plays its strike once
  if (swingT > 0) { swingT = Math.max(0, swingT - dt); me.bodyN.rotation.x = Math.sin((1 - swingT / 0.32) * Math.PI) * 0.4; }
  else me.bodyN.rotation.x = 0;
  if (!(me.q && me.q.chop && me.q.chop.isPlaying && !moving)) setAnim(me.q, moving);
  shakeTrees(dt);
  seeThrough(pos);
  ring.rotation.y += dt * 0.8;
}
function updateWalkers(dt, t) {
  walkers.forEach(w => {
    const p = w.p;
    const moving = !w.idle && !(w.wait > 0);
    setAnim(w.q, moving);
    if (w.idle) { p.root.rotation.y = Math.sin(t * 0.3 + w.t) * 1.2; p.bodyN.position.y = 0; return; }
    if (w.wait > 0) { w.wait -= dt; p.bodyN.position.y = 0; return; }
    w.x += w.dir * w.speed * dt;
    if (w.x > w.x2) { w.x = w.x2; w.dir = -1; w.wait = rr(1, 3); }
    if (w.x < w.x1) { w.x = w.x1; w.dir = 1; w.wait = rr(1, 3); }
    p.root.position.x = w.x;
    p.root.rotation.y = w.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    w.t += dt * 8.5; p.bodyN.position.y = Math.abs(Math.sin(w.t)) * 0.06;
  });
}

let lookName = "plain", stage = 2;
function setAnim(q, moving) {
  const want = moving ? "walk" : "idle";
  if (!q || q.state === want) return;
  q.state = want;
  if (q.walk) q.walk.stop(); if (q.idle) q.idle.stop();
  // your own walk plays 30% faster to match your faster pace (P-WORK 2); the townsfolk keep theirs
  const a = moving ? q.walk : q.idle; if (a) a.start(true, moving && q === me.q ? 1.3 : 1.0);
}
function setLook(l) {
  lookName = l;
  const quat = l === "quat", plain = l === "plain";
  quatRoot.setEnabled(quat);
  if (houseRoot) houseRoot.setEnabled(plain);
  plainOnly.forEach(n => n.setEnabled(plain));
  const bodyOf = o => (quat ? o.qq : null);
  walkers.forEach(w => { if (w.q) w.q.setEnabled(false); w.q = bodyOf(w); w.p.bodyN.setEnabled(plain); if (w.q) { w.q.setEnabled(true); w.q.state = ""; } });
  if (me.q) me.q.setEnabled(false);
  me.q = bodyOf(me); me.bodyN.setEnabled(plain); if (me.q) { me.q.setEnabled(view === "iso"); me.q.state = ""; }
}

// ---------- Quaternius look: Medieval Village MegaKit (free tier) + RPG Character Pack, CC0 (see assets/LICENCES.md) ----------
// pieces are in metres: walls 2 m wide and 3.12 m tall, outer face toward +z; roofs "4x6" = 4 m span, 6 m long
const QV = "assets/quaternius/medieval-village-megakit/models/", QC = "assets/quaternius/rpg-character-pack/models/";
const QW = 2, QH = 3.12;
const QTOWN = ["Wall_Plaster_Straight", "Wall_Plaster_Straight_Base", "Wall_Plaster_Door_Round", "Wall_Plaster_Window_Wide_Round",
  "Wall_Plaster_Window_Thin_Round", "Wall_Plaster_WoodGrid", "Wall_UnevenBrick_Straight", "Wall_UnevenBrick_Door_Round",
  "Wall_UnevenBrick_Window_Wide_Round", "Wall_UnevenBrick_Window_Thin_Round", "Window_Wide_Round1", "Window_Thin_Round1",
  "WindowShutters_Wide_Round_Open", "WindowShutters_Thin_Round_Open", "Door_1_Round", "Corner_Exterior_Brick", "Corner_Exterior_Wood",
  "Wall_BottomCover", "Roof_RoundTiles_4x4", "Roof_RoundTiles_4x6", "Roof_Front_Brick4", "Prop_Chimney", "Prop_Crate", "Prop_Wagon",
  "Prop_WoodenFence_Single", "Prop_Vine1", "Prop_Vine2"];
const QPEOPLE = ["Monk", "Rogue", "Ranger", "Warrior", "Cleric", "Wizard"];
const qkit = {};
let quatLoaded = false, quatLoading = null, quatHouseRoot = null;
const quatRoot = new BABYLON.TransformNode("quatRoot", scene); quatRoot.setEnabled(false);
const qTint = new C3(1.04, 1.0, 0.94);
// every piece file carries its own copy of the shared materials (MI_Plaster, MI_WoodTrim…): one material per name
// lets each house merge into a few meshes; the window glass uses the glass that glows at dusk and night
const qMats = new Map();
function toStandardSmooth(c, share) {
  const swap = new Map();
  c.meshes.forEach(m => {
    const pm = m.material; if (!pm) return;
    if (share && pm.name === "MI_WindowGlass") { m.material = winMat; return; }
    if (share && qMats.has(pm.name)) { m.material = qMats.get(pm.name); return; }
    if (!swap.has(pm)) {
      const sm = new BABYLON.StandardMaterial(pm.name + "-q", scene);
      const tex = pm.albedoTexture || pm.diffuseTexture;
      if (tex) { sm.diffuseTexture = tex; sm.diffuseColor = qTint.clone(); if (pm.transparencyMode === 1 || pm.needAlphaTesting && pm.needAlphaTesting()) { tex.hasAlpha = true; sm.useAlphaFromDiffuseTexture = false; } }
      else sm.diffuseColor = (pm.albedoColor || new C3(1, 1, 1)).multiply(qTint);
      sm.backFaceCulling = pm.backFaceCulling; sm.specularColor = new C3(0, 0, 0); sm.maxSimultaneousLights = 8;
      swap.set(pm, sm); if (share) qMats.set(pm.name, sm);
    }
    m.material = swap.get(pm);
  });
}
async function loadQKit(root, names, ext, share) {
  await Promise.all(names.map(async n => {
    const c = await BABYLON.SceneLoader.LoadAssetContainerAsync(root, n + ext, scene);
    toStandardSmooth(c, share); qkit[n] = c;
  }));
}
function qpiece(name, x, y, z, ry, parent, s) {
  const e = qkit[name].instantiateModelsToScene(n => n, false, { doNotInstantiate: true });
  const h = new BABYLON.TransformNode(name, scene);
  h.parent = parent || quatRoot; h.position.set(x, y, z); h.rotation.y = ry || 0;
  if (s) h.scaling.setAll(s);
  e.rootNodes.forEach(r => r.parent = h);
  h.getChildMeshes().forEach(m => { sg.addShadowCaster(m); m.receiveShadows = true; m.isPickable = false; });
  e.animationGroups.forEach(a => a.stop());
  h.anims = e.animationGroups;
  return h;
}
// one wall segment facing local +z, with its window or door
function qWall(parent, kind, mat2, x, y, z, ry) {
  const set = mat2 === "brick" ? "Wall_UnevenBrick_" : "Wall_Plaster_";
  const name = kind === "door" ? set + "Door_Round" : kind === "wide" ? set + "Window_Wide_Round" : kind === "thin" ? set + "Window_Thin_Round"
    : kind === "grid" ? "Wall_Plaster_WoodGrid" : kind === "base" ? "Wall_Plaster_Straight_Base" : set === "Wall_UnevenBrick_" ? "Wall_UnevenBrick_Straight" : "Wall_Plaster_Straight";
  const w = qpiece(name, x, y, z, ry, parent);
  if (kind === "wide") { qpiece("Window_Wide_Round1", 0, 0, 0, 0, w); qpiece("WindowShutters_Wide_Round_Open", 0, 0, 0, 0, w); }
  if (kind === "thin") { qpiece("Window_Thin_Round1", 0, 0, 0, 0, w); qpiece("WindowShutters_Thin_Round_Open", 0, 0, 0, 0, w); }
  if (kind === "door") qpiece("Door_1_Round", -0.56, 0, 0, 0, w);
  return w;
}
function mergeHouse(r) {
  // one mesh per material per house keeps the draw calls low on phones
  const byMat = new Map();
  const keep = ["position", "normal", "uv"];
  r.getChildMeshes().forEach(m => {
    if (!m.material || !m.getTotalVertices()) return;
    // pieces differ in extra data (second UV set, colours): keep only what the material uses, so they can merge
    m.getVerticesDataKinds().forEach(k => { if (!keep.includes(k)) m.removeVerticesData(k); });
    if (!m.isVerticesDataPresent("uv")) m.setVerticesData("uv", new Array(m.getTotalVertices() * 2).fill(0));
    const k = m.material; if (!byMat.has(k)) byMat.set(k, []); byMat.get(k).push(m); });
  byMat.forEach(list => {
    if (list.length < 2) return;
    try { const mm = BABYLON.Mesh.MergeMeshes(list, true, true, undefined, false, false); if (mm) { mm.parent = null; mm.setParent(r); cast(mm); mm.isPickable = false; } } catch (e) { console.warn("merge skipped", e && e.message); }
  });
}
function buildQuatHouses(st) {
  if (quatHouseRoot) quatHouseRoot.dispose(false, false);
  quatHouseRoot = new BABYLON.TransformNode("quatHouses", scene); quatHouseRoot.parent = quatRoot;
  quatHouses.length = 0;
  housesSpec.forEach((h, hi) => {
    const r = new BABYLON.TransformNode("qh", scene); r.parent = quatHouseRoot;
    r.position.set(h.x, 0, h.z); r.rotation.y = (h.f > 0 ? 0 : Math.PI) + h.yaw;
    const nx = st === 2 && h.w > 5.1 ? 3 : 2, W = nx * QW, D = 2 * QW;
    const floors = st === 2 ? [hi % 2 ? "brick" : "plaster", "plaster"] : ["brick"];
    floors.forEach((m2, fl) => {
      const y = fl * QH;
      for (let i = 0; i < nx; i++) {
        const cx = (i - (nx - 1) / 2) * QW;
        const front = fl === 0 && i === 0 ? "door" : fl === 0 ? "wide" : (i % 2 ? "grid" : "wide");
        qWall(r, front, m2, cx, y, D / 2, 0);
        qWall(r, i === nx - 1 ? "thin" : "plain", m2, cx, y, -D / 2, Math.PI);
      }
      [-1, 1].forEach(sd => [-1, 1].forEach((sz, k) => qWall(r, k === 0 && fl === st - 1 ? "thin" : "plain", m2, sd * W / 2, y, sz * QW / 2, sd * Math.PI / 2)));
      if (fl > 0) [[0, D / 2, 0], [0, -D / 2, Math.PI]].forEach(([, z, ry]) => { for (let i = 0; i < nx; i++) qpiece("Wall_BottomCover", (i - (nx - 1) / 2) * QW, y, z, ry, r); });
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sz]) => qpiece(m2 === "brick" ? "Corner_Exterior_Brick" : "Corner_Exterior_Wood", sx * W / 2, y, sz * D / 2, Math.atan2(sx, sz) - Math.PI / 4, r));
    });
    const top = floors.length * QH;
    qpiece(nx === 3 ? "Roof_RoundTiles_4x6" : "Roof_RoundTiles_4x4", 0, top, 0, Math.PI / 2, r);
    [-1, 1].forEach(sd => qpiece("Roof_Front_Brick4", sd * W / 2, top, 0, sd * Math.PI / 2, r));
    if (st === 2) qpiece(hi % 3 ? "Prop_Chimney" : "Prop_Chimney", W / 2 - 1, top, -1, 0, r);
    if (hi % 3 === 1) qpiece("Prop_Vine1", -W / 2 + 0.6, QH, D / 2 + 0.12, 0, r);
    mergeHouse(r);
    r.getChildMeshes().forEach(m => m.freezeWorldMatrix());
    const ms = r.getChildMeshes().filter(m => m.getTotalVertices() > 0);
    const lo = new V3(Infinity, Infinity, Infinity), hiV = new V3(-Infinity, -Infinity, -Infinity);
    ms.forEach(m => { m.computeWorldMatrix(true); const bb = m.getBoundingInfo().boundingBox; lo.minimizeInPlace(bb.minimumWorld); hiV.maximizeInPlace(bb.maximumWorld); });
    quatHouses.push({ x: h.x, z: h.z, half: W / 2 + 1, meshes: ms, fade: 1, lo, hi: hiV });
  });
  quatHouseRoot.setEnabled(true);
}
// these houses stand about 10 m tall: one between the camera and your villager fades so you never lose sight of them
const quatHouses = [];
// A house fades when it stands between the camera and you AND covers you on screen (checked with its real outline,
// so it also works when the camera is zoomed in or the phone is upright).
const projM = BABYLON.Matrix.Identity();
function screenRect(lo, hi, vp) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < 8; i++) {
    const c = new V3(i & 1 ? hi.x : lo.x, i & 2 ? hi.y : lo.y, i & 4 ? hi.z : lo.z);
    const s = V3.Project(c, projM, scene.getTransformMatrix(), vp);
    x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x); y0 = Math.min(y0, s.y); y1 = Math.max(y1, s.y);
  }
  return { x0, y0, x1, y1 };
}
function fadeQuatHouses(dt) {
  const p = me.root.position, dx = Math.cos(iso.alpha), dz = Math.sin(iso.alpha);
  const vp = iso.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight());
  const meS = view === "iso" ? V3.Project(new V3(p.x, 0.9, p.z), projM, scene.getTransformMatrix(), vp) : null;
  quatHouses.forEach(q => {
    const vx = q.x - p.x, vz = q.z - p.z, along = vx * dx + vz * dz;
    let covers = false;
    if (meS && along > 0) { const r = screenRect(q.lo, q.hi, vp), pad = 12; covers = meS.x > r.x0 - pad && meS.x < r.x1 + pad && meS.y > r.y0 - pad && meS.y < r.y1 + pad; }
    const want = covers ? 0.18 : 1;
    if (Math.abs(q.fade - want) < 0.01) return;
    q.fade += (want - q.fade) * Math.min(1, dt * 8);
    if (Math.abs(q.fade - want) < 0.01) q.fade = want;
    q.meshes.forEach(m => m.visibility = q.fade);
  });
}
function buildQuatWorld() {
  spots.fences.forEach(([x1, z1, x2, z2]) => {
    const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz), n = Math.max(1, Math.round(len / 2)), ang = Math.atan2(dz, dx);
    for (let k = 0; k < n; k++) { const t = (k + 0.5) / n; const f = qpiece("Prop_WoodenFence_Single", x1 + dx * t, 0, z1 + dz * t, -ang, quatRoot); f.scaling.x = len / n / 2.06; }
  });
  qpiece("Prop_Wagon", -24, 0, 2.6, 0.3 + Math.PI / 2, quatRoot);
  [[27, -3.8], [-13.6, -3.0], [10.2, 3.6]].forEach(([x, z], i) => { qpiece("Prop_Crate", x, 0, z, i * 0.5, quatRoot, 0.75); block(x, z, 0.5, 0.5); });
  quatRoot.getChildMeshes().forEach(m => m.freezeWorldMatrix());
  buildQuatHouses(stage);
  const addBody = (holderParent, name) => {
    const q = qpiece(name, 0, 0, 0, 0, holderParent);
    const bb = q.getHierarchyBoundingVectors(true);
    q.scaling.setAll(1.7 / Math.max(0.1, bb.max.y - bb.min.y));
    const find = nm => q.anims.find(a => a.name.toLowerCase() === nm);
    q.walk = find("walk"); q.idle = find("idle"); q.chop = find("punch") || null;
    q.state = ""; q.setEnabled(false);
    return q;
  };
  walkers.forEach((w, i) => { w.qq = addBody(w.p.root, QPEOPLE[i % QPEOPLE.length]); });
  me.qq = addBody(me.root, "Ranger");
}
// the glTF loader keeps colour textures in sRGB GPU buffers by default; our simple materials then read them far too dark
// (people came out black), so the Quaternius files load without them. The flag only covers the load calls started here.
let qPlainTextures = false;
BABYLON.SceneLoader.OnPluginActivatedObservable.add(p => { if (qPlainTextures && p.name === "gltf") p.useSRGBBuffers = false; });
function loadQuat() {
  if (quatLoading) return quatLoading;
  qPlainTextures = true;
  quatLoading = Promise.all([loadQKit(QV, QTOWN, ".gltf", true), loadQKit(QC, [...new Set([...QPEOPLE])], ".glb")]).then(() => { buildQuatWorld(); quatLoaded = true; });
  qPlainTextures = false;
  return quatLoading;
}

// ---------- crowd test (S7, docs/08 section 10): many animated Quaternius villagers and the numbers that matter ----------
// Test only, no game rules. Two ways to animate them:
//  "Usual": every villager has its own skeleton and animation, the engine's normal way (what the street's people use now).
//  "Baked": each model's walk and idle are recorded once into a picture the graphics chip reads ("baked vertex animation"),
//           and all villagers of one model are drawn together as copies ("thin instances"): one draw per model.
// Villagers carry nothing (weapons hidden in both ways), so both ways draw the same people.
const crowd = { n: 0, mode: "usual", agents: [], root: new BABYLON.TransformNode("crowd", scene), baked: {}, scale: {}, area: null, token: 0 };
const crowdInfo = document.getElementById("crowdInfo");
const BAKE_FPS = 30;
function crowdPick(a) { const r = crowd.area; a.tx = r.x0 + Math.random() * (r.x1 - r.x0); a.tz = r.z0 + Math.random() * (r.z1 - r.z0); a.stuck = 0; }
function crowdAgents(n) {
  const cx = Math.max(-22, Math.min(22, me.root.position.x));
  crowd.area = { x0: cx - 16, x1: cx + 16, z0: -4.6, z1: 4.6 };  // the street and the front yards around you
  const list = [];
  for (let i = 0; i < n; i++) {
    const a = { m: QPEOPLE[i % QPEOPLE.length], pos: new V3(0, 0, 0), yaw: Math.random() * 6.28, wait: Math.random() * 2, walking: false, shown: null,
      speed: 1.0 + Math.random() * 0.5, tx: 0, tz: 0, stuck: 0, off: Math.random() * 40 };
    crowdPick(a); a.pos.set(a.tx, 0, a.tz); collide(a.pos, 0.3); crowdPick(a);
    list.push(a);
  }
  return list;
}
function crowdStep(dt) {
  crowd.agents.forEach(a => {
    if (a.wait > 0) { a.wait -= dt; a.walking = false; return; }
    const dx = a.tx - a.pos.x, dz = a.tz - a.pos.z, d = Math.hypot(dx, dz);
    if (d < 0.4) { a.wait = 0.5 + Math.random() * 2.5; a.walking = false; crowdPick(a); return; }
    const ox = a.pos.x, oz = a.pos.z;
    a.pos.x += dx / d * a.speed * dt; a.pos.z += dz / d * a.speed * dt; collide(a.pos, 0.3);
    if (Math.hypot(a.pos.x - ox, a.pos.z - oz) < a.speed * dt * 0.3) { a.stuck += dt; if (a.stuck > 1) crowdPick(a); } else a.stuck = 0;
    a.yaw = Math.atan2(dx, dz); a.walking = true;
  });
}
// one fresh copy of a character (own skeleton and animations), weapons hidden
function crowdCopy(name, prefix) {
  const e = qkit[name].instantiateModelsToScene(n => prefix + n, false, { doNotInstantiate: true });
  const h = new BABYLON.TransformNode(prefix + name, scene); h.parent = crowd.root;
  e.rootNodes.forEach(r => r.parent = h);
  e.animationGroups.forEach(g => g.stop());
  const meshes = h.getChildMeshes(false).filter(m => m.getTotalVertices() > 0);
  const skin = meshes.find(m => m.skeleton);
  meshes.forEach(m => { m.isPickable = false; if (m.material !== skin.material) m.setEnabled(false); });
  if (!crowd.scale[name]) {
    const bb = h.getHierarchyBoundingVectors(true, m => !!m.getTotalVertices && m.isEnabled() && m.getTotalVertices() > 0);
    crowd.scale[name] = 1.7 / Math.max(0.1, bb.max.y - bb.min.y);
  }
  const find = nm => e.animationGroups.find(g => g.name.toLowerCase() === (prefix + nm).toLowerCase());
  return { e, h, skin, meshes: meshes.filter(m => m.isEnabled()), walk: find("walk"), idle: find("idle") };
}
function dropCopy(c) {
  c.meshes.forEach(m => sg.removeShadowCaster(m));
  c.e.animationGroups.forEach(g => { g.stop(); g.dispose(); });
  c.e.skeletons.forEach(s => s.dispose());
  c.h.dispose(false, false);
}
function playAnim(c, walking, off) {
  const g = walking ? c.walk : c.idle, o = walking ? c.idle : c.walk;
  if (o) o.stop();
  if (g) { g.start(true, 1.0, g.from, g.to); g.goToFrame(g.from + (off % 1) * (g.to - g.from)); }
}
// "Baked": record walk and idle once per model into a float texture, fold the head and gear into the skinned body,
// then draw every villager of that model as a copy with its own place, facing and animation frame.
function bakeModel(name) {
  if (crowd.baked[name]) return crowd.baked[name];
  const c = crowdCopy(name, "bk_");
  try { return bakeFrom(name, c); } catch (err) { dropCopy(c); throw err; }
}
function bakeFrom(name, c) {
  const skin = c.skin, sk = skin.skeleton;
  const nodes = c.h.getDescendants(false);
  const pose = () => { nodes.forEach(n => n.computeWorldMatrix && n.computeWorldMatrix(true)); sk.prepare(true); };
  const walk = c.walk, idle = c.idle;
  walk.start(false, 1, walk.from, walk.to); walk.pause(); walk.goToFrame(walk.from); pose();
  // the head, hair and gear hang from a bone: turn them into body parts that follow that bone, so one mesh draws all
  const invS = skin.getWorldMatrix().clone().invert(), m0 = sk.getTransformMatrices(skin);
  const P0 = Array.from(skin.getVerticesData("position")), N0 = Array.from(skin.getVerticesData("normal")), U0 = Array.from(skin.getVerticesData("uv") || []),
    MI = Array.from(skin.getVerticesData("matricesIndices")), MW = Array.from(skin.getVerticesData("matricesWeights")), IX = Array.from(skin.getIndices());
  if (!U0.length) for (let i = 0; i < P0.length / 3; i++) U0.push(0, 0);
  const boneOf = n => { for (; n; n = n.parent) { const b = sk.bones.find(b => b.getTransformNode() === n); if (b) return b; } return null; };
  c.meshes.forEach(m => {
    if (m === skin) return;
    const b = boneOf(m.parent); if (!b) return;
    const bi = b.getIndex(), B = BABYLON.Matrix.FromArray(m0, bi * 16);
    const T = m.getWorldMatrix().multiply(invS).multiply(B.clone().invert());
    const p = m.getVerticesData("position"), nn = m.getVerticesData("normal"), u = m.getVerticesData("uv"), ix = m.getIndices(), base = P0.length / 3;
    for (let v = 0; v < p.length / 3; v++) {
      const q = V3.TransformCoordinates(new V3(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]), T); P0.push(q.x, q.y, q.z);
      const r = nn ? V3.TransformNormal(new V3(nn[v * 3], nn[v * 3 + 1], nn[v * 3 + 2]), T).normalize() : V3.Up(); N0.push(r.x, r.y, r.z);
      U0.push(u ? u[v * 2] : 0, u ? u[v * 2 + 1] : 0);
      MI.push(bi, 0, 0, 0); MW.push(1, 0, 0, 0);
    }
    const flip = T.determinant() < 0;
    for (let i = 0; i < ix.length; i += 3) { if (flip) IX.push(ix[i] + base, ix[i + 2] + base, ix[i + 1] + base); else IX.push(ix[i] + base, ix[i + 1] + base, ix[i + 2] + base); }
  });
  const skinLocal = skin.getWorldMatrix().clone();
  // record the animation frames
  const take = g => {
    g.start(false, 1, g.from, g.to); g.pause();
    const fps = (g.targetedAnimations[0] && g.targetedAnimations[0].animation.framePerSecond) || 60;
    const K = Math.max(2, Math.round((g.to - g.from) / fps * BAKE_FPS)), out = [];
    for (let k = 0; k < K; k++) { g.goToFrame(g.from + (g.to - g.from) * k / K); pose(); out.push(Float32Array.from(sk.getTransformMatrices(skin))); }
    g.stop(); return out;
  };
  const W = take(walk), I = idle ? take(idle) : W, per = W[0].length, frames = W.concat(I);
  const data = new Float32Array(per * frames.length); frames.forEach((f, k) => data.set(f, k * per));
  const tex = BABYLON.RawTexture.CreateRGBATexture(data, per / 4, frames.length, scene, false, false, BABYLON.Texture.NEAREST_NEAREST, BABYLON.Constants.TEXTURETYPE_FLOAT);
  const man = new BABYLON.BakedVertexAnimationManager(scene); man.texture = tex;
  const bm = new BABYLON.Mesh("baked_" + name, scene);
  const vd = new BABYLON.VertexData(); vd.positions = P0; vd.normals = N0; vd.uvs = U0; vd.indices = IX; vd.matricesIndices = MI; vd.matricesWeights = MW;
  vd.applyToMesh(bm);
  bm.material = skin.material; bm.skeleton = sk; bm.numBoneInfluencers = 4;
  bm.bakedVertexAnimationManager = man; bm.isPickable = false; bm.receiveShadows = true; bm.alwaysSelectAsActiveMesh = true;
  bm.parent = crowd.root; bm.setEnabled(false);
  c.h.setEnabled(false);  // the recording copy stays hidden; its skeleton is only kept for the shader setup
  const k = { bm, man, walk: [0, W.length - 1], idle: [W.length, frames.length - 1], skinLocal, list: [], mats: null, sets: null };
  crowd.baked[name] = k;
  return k;
}
function clearCrowd() {
  crowd.agents.forEach(a => { if (a.copy) dropCopy(a.copy); });
  crowd.agents = [];
  Object.values(crowd.baked).forEach(k => { k.bm.thinInstanceCount = 0; k.bm.setEnabled(false); sg.removeShadowCaster(k.bm); k.list = []; });
}
function setCrowd(n, mode) {
  clearCrowd();
  crowd.n = n; crowd.mode = mode; stats.reset();
  crowdInfo.hidden = !n;
  if (!n) return;
  crowd.agents = crowdAgents(n);
  if (mode === "usual") {
    crowd.agents.forEach(a => {
      a.copy = crowdCopy(a.m, "cr_");
      a.copy.h.scaling.setAll(crowd.scale[a.m]);
      a.copy.meshes.forEach(m => { sg.addShadowCaster(m); m.receiveShadows = true; });
    });
  } else {
    crowd.agents.forEach(a => bakeModel(a.m).list.push(a));
    Object.values(crowd.baked).forEach(k => {
      if (!k.list.length) return;
      k.mats = new Float32Array(16 * k.list.length); k.sets = new Float32Array(4 * k.list.length);
      k.bm.thinInstanceSetBuffer("matrix", k.mats, 16, false);
      k.bm.thinInstanceSetBuffer("bakedVertexAnimationSettingsInstanced", k.sets, 4, false);
      k.bm.setEnabled(true); sg.addShadowCaster(k.bm);
    });
  }
}
// if this phone can't do one of the ways, say so on screen (with the reason) and go back to no crowd
function trySetCrowd(n, mode) {
  const prev = crowd.mode;
  try { setCrowd(n, mode); return true; }
  catch (err) {
    console.warn("crowd test", err);
    try { setCrowd(0, prev); } catch (e) {}
    markOn("crowdG", "0");
    showToast("<b>The " + (mode === "baked" ? "baked" : "usual") + " crowd didn't work on this phone.</b><br>" + String(err && err.message || err).slice(0, 160));
    return false;
  }
}
function chooseCrowd(n, mode) {
  const tok = ++crowd.token;
  if (!n || quatLoaded) return trySetCrowd(n, mode);
  showToast("<b>Loading the villagers…</b><br>" + LOADERS.quat.msg);
  loadQuat().then(() => { if (tok !== crowd.token) return; toast.hidden = true; if (trySetCrowd(n, mode)) { markOn("crowdG", String(n)); markOn("animG", mode); } })
    .catch(err => showToast("<b>The models didn't load.</b><br>" + String(err && err.message || err).slice(0, 160)));
  return false;
}
group("crowdG", v => chooseCrowd(+v, crowd.mode));
group("animG", v => { if (!crowd.n) { crowd.mode = v; return; } return chooseCrowd(crowd.n, v); });
const tmpQ = new BABYLON.Quaternion(), tmpM = BABYLON.Matrix.Identity(), tmpM2 = BABYLON.Matrix.Identity(), tmpS = new V3(1, 1, 1);
function crowdDraw(dt) {
  if (crowd.mode === "usual") {
    crowd.agents.forEach(a => {
      const h = a.copy.h; h.position.copyFrom(a.pos); h.rotation.y = a.yaw;
      if (a.shown !== a.walking) { a.shown = a.walking; playAnim(a.copy, a.walking, a.off); }
    });
    return;
  }
  Object.values(crowd.baked).forEach(k => {
    if (!k.list.length) return;
    k.man.time += dt;
    let setsChanged = false;
    k.list.forEach((a, i) => {
      tmpS.setAll(crowd.scale[a.m]); BABYLON.Quaternion.RotationYawPitchRollToRef(a.yaw, 0, 0, tmpQ);
      BABYLON.Matrix.ComposeToRef(tmpS, tmpQ, a.pos, tmpM); k.skinLocal.multiplyToRef(tmpM, tmpM2); tmpM2.copyToArray(k.mats, i * 16);
      if (a.shown !== a.walking) {
        a.shown = a.walking; const r = a.walking ? k.walk : k.idle;
        k.sets.set([r[0], r[1], a.off, BAKE_FPS], i * 4); setsChanged = true;
      }
    });
    k.bm.thinInstanceBufferUpdated("matrix");
    if (setsChanged) k.bm.thinInstanceBufferUpdated("bakedVertexAnimationSettingsInstanced");
  });
}
// the numbers: average frame rate and slowest frame over the last 3 seconds, draw calls, villagers on screen
const stats = {
  dts: [], t: 0, skip: 0, dc: 0,
  reset() { this.dts = []; this.t = 0; this.skip = 1000; crowdInfo.innerHTML = "<b>Setting up the crowd…</b>"; },
  frame(dtMs) {
    if (this.skip > 0) { this.skip -= dtMs; return; }  // the first second after a change is the setting-up hitch, not the crowd
    this.dts.push(dtMs); let sum = 0; for (const d of this.dts) sum += d;
    while (sum > 3000 && this.dts.length > 1) sum -= this.dts.shift();
    this.t += dtMs; if (this.t < 500 || !crowd.n) return;
    this.t = 0;
    const fps = this.dts.length * 1000 / Math.max(1, sum), worst = Math.max(...this.dts);
    const planes = BABYLON.Frustum.GetPlanes(scene.getTransformMatrix()), pt = new V3(0, 0, 0);
    let seen = 0; crowd.agents.forEach(a => { pt.set(a.pos.x, 0.9, a.pos.z); if (BABYLON.Frustum.IsPointInFrustum(pt, planes)) seen++; });
    const dc = this.dc;
    crowdInfo.innerHTML = "<b>" + crowd.n + " villagers · " + (crowd.mode === "usual" ? "Usual" : "Baked") + " · " + (lookName === "plain" ? "Light" : "Full") + "</b><br>" +
      fps.toFixed(0) + " fps · slowest frame " + worst.toFixed(0) + " ms<br>" + dc + " draw calls · " + seen + " on screen";
  }
};
// draw calls in this frame (shadow pass included): the engine's counter only adds up, so take the difference
const dcNow = () => (engine._drawCalls ? engine._drawCalls.current : 0);
let dc0 = 0;
scene.onBeforeRenderObservable.add(() => {
  dc0 = dcNow();
  if (!crowd.n) return;
  const dt = Math.min(0.05, engine.getDeltaTime() / 1000);
  crowdStep(dt); crowdDraw(dt);
});
scene.onAfterRenderObservable.add(() => {
  if (!crowd.n) return;
  const d = dcNow() - dc0; stats.dc = d >= 0 ? d : dcNow();
  stats.frame(engine.getDeltaTime());
});

// ---------- loop ----------
buildHouses(2);
let time = 0, fpsT = 0;
const fpsBase = () => (view === "fp" ? (isTouch ? "Left thumb: walk · right thumb: look" : "WASD: walk · drag: look · V: view") : (isTouch ? "Left thumb: walk" : "WASD or arrows: walk · V: view"));
scene.onBeforeRenderObservable.add(() => {
  const dt = Math.min(0.05, engine.getDeltaTime() / 1000); time += dt;
  updatePlayer(dt); updateWalkers(dt, time);
  if (lookName === "quat") fadeQuatHouses(dt);
  lerpState(Math.min(1, dt * 2.2)); applyState(time);
  const p = me.root.position;
  iso.target = V3.Lerp(iso.target, new V3(p.x, 1, p.z), Math.min(1, dt * 6));
  fp.position.set(p.x, 1.55 + me.bodyN.position.y * 0.5, p.z);
  fp.rotation.set(meState.fpPitch, meState.fpYaw, 0);
  sun.position = new V3(p.x, 0, p.z).subtract(cur.dir.scale(90));
  banner.rotation.y = Math.sin(time * 1.3) * 0.18; banner.rotation.x = Math.sin(time * 2.1) * 0.05;
  fpsT += dt; if (fpsT > 0.5) { fpsT = 0; info.textContent = fpsBase() + " · " + engine.getFps().toFixed(0) + " fps"; }
});
scene.executeWhenReady(() => {
  document.getElementById("loading").remove();
  // start in the Full look unless this device chose Light before; the plain street shows while the models load
  if (savedLook() !== "plain") chooseLook("quat");
});
engine.runRenderLoop(() => scene.render());
// Keep the 3D picture's shape matched to the screen. iPhone Safari sends "resize" while rotating, before the page has its
// new size, so the picture kept the old shape and looked stretched. Watch the canvas itself, re-check after rotations,
// and as a last guard compare shapes twice a second.
function fit() {
  const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
  const a = w / h, b = engine.getRenderWidth() / Math.max(1, engine.getRenderHeight());
  if (Math.abs(a - b) > 0.005 || Math.abs(w * engine.getHardwareScalingLevel() ** -1 - engine.getRenderWidth()) > 2) { engine.resize(); fitOrtho(); }
}
window.addEventListener("resize", fit);
window.addEventListener("orientationchange", () => [60, 250, 600, 1200].forEach(t => setTimeout(fit, t)));
if (window.visualViewport) visualViewport.addEventListener("resize", fit);
if (window.ResizeObserver) new ResizeObserver(fit).observe(canvas);
setInterval(fit, 500);

// ---------- hooks for the interface layer (ui/hud.js): it reads the world, never the other way round ----------
let paused = false;
window.THR = {
  scene, engine, me, walkers, spots, housesSpec, block, mat, P, gate,
  // P-WORK hooks: walking speed (1 = empty-handed), an axe stroke, face a point, shake or fell a work tree, the yard's pile
  set speedMul(v) { speedMul = v; }, swing, face, shake, fell, yardPile,
  // P-WORK 2 hooks: where errands are done, and how far one has got
  errandSites: ERRAND_SITES, errandShow,
  get view() { return view; }, get timeName() { return timeName; }, get look() { return lookName; },
  toggleView, setTime: v => document.querySelector('#timeG button[data-v="' + v + '"]').click(),
  zoom: () => zoomBtn.click(),
  get close() { return close; }, setClose,
  fps: () => engine.getFps(),
  onFrame: fn => scene.onBeforeRenderObservable.add(() => { if (!paused) fn(Math.min(0.05, engine.getDeltaTime() / 1000)); }),
  setPaused(b) { if (b === paused) return; paused = b; if (b) engine.stopRenderLoop(); else engine.runRenderLoop(() => scene.render()); },
  get paused() { return paused; },
  // world point -> screen point in CSS pixels; vis=false when behind the camera
  project(x, y, z) {
    const w = engine.getRenderWidth(), h = engine.getRenderHeight(), cam = scene.activeCamera;
    const p = V3.Project(new V3(x, y, z), BABYLON.Matrix.Identity(), scene.getTransformMatrix(), cam.viewport.toGlobal(w, h));
    const k = canvas.clientWidth / w;
    // the isometric camera sees everything in front of it; in first person, behind = dot product below 0
    const vis = cam !== fp || V3.Dot(cam.getDirection(V3.Forward()), new V3(x - cam.position.x, y - cam.position.y, z - cam.position.z)) > 0;
    return { x: p.x * k, y: p.y * k, vis };
  }
};
