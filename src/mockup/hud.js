// M0: the mock-up interface (Phase 7), moved here unchanged from ui/hud.js. It stays plain JavaScript until M1-M3
// rebuild each part in TypeScript (docs/08, section 4: "the mock-up stays as it is until the first playable build replaces it").
import * as BABYLON from "@babylonjs/core";
import { Work, WORK } from "../sim/work";
import { Errands } from "../sim/errands";
// Interface layer: Phase 7 HUD mock-up (docs/07-ui-ux.md). Clickable, with mock rules and fast mock timings.
// It only talks to the 3D page through window.THR, so the whole interface can be swapped without touching the world.
(function () {
"use strict";
const W = window.THR; if (!W) return;
const BAB = BABYLON, V3 = BAB.Vector3;
const $ = (s, r) => (r || document).querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

// ---------- icons: our own bold silhouettes (24×24), one colour, readable at small size ----------
const I = {
  heart: '<path fill="currentColor" d="M12 21s-7.3-4.6-9.5-9.2C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.7 0 5.8 3.8 4.2 7.3C19.3 16.4 12 21 12 21z"/>',
  bread: '<path fill="currentColor" d="M3 13.5C3 9 7 6 12 6s9 3 9 7.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 9.5l1.5 3M12 9l1.2 3.3M16 9.6l1 3" stroke="#3A2817" stroke-width="1.6" stroke-linecap="round"/>',
  coin: '<circle cx="12" cy="12" r="9" fill="currentColor"/><circle cx="12" cy="12" r="5.6" fill="none" stroke="#5A4210" stroke-width="1.6"/><path d="M12 8.6v6.8" stroke="#5A4210" stroke-width="1.8" stroke-linecap="round"/>',
  feather: '<path fill="currentColor" d="M20.5 2.5C12.5 3.2 6.6 8.3 5.6 16.3L4.4 18.5l1.3-.4c1.6-1.6 3.4-2.4 5.6-2.7C17 14.6 20.1 9.2 20.5 2.5z"/><path d="M3 21.5L14.5 8.5" stroke="#3A2817" stroke-width="1.5" stroke-linecap="round"/>',
  scroll: '<path fill="currentColor" d="M6 3h11a3 3 0 0 1 3 3v1h-3v12a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3v-1h3V6a3 3 0 0 1 0 0z"/><path d="M8.5 8h6M8.5 11.5h6M8.5 15h4" stroke="#3A2817" stroke-width="1.6" stroke-linecap="round"/>',
  map: '<path fill="currentColor" d="M2.5 5.5l6.3-2.3 6.4 2.3 6.3-2.3v15.3l-6.3 2.3-6.4-2.3-6.3 2.3z"/><path d="M8.8 3.2v15.3M15.2 5.5v15.3" stroke="#3A2817" stroke-width="1.4"/>',
  sack: '<path fill="currentColor" d="M9 2.5h6l-1.7 3.2C16.8 7.3 19.5 11 19.5 15c0 4-3.3 6.5-7.5 6.5S4.5 19 4.5 15c0-4 2.7-7.7 6.2-9.3z"/><path d="M9.6 6.2h4.8" stroke="#3A2817" stroke-width="1.7" stroke-linecap="round"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor"/><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor"/>',
  zoomIn: '<circle cx="10" cy="10" r="6.6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l6.5 6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M6.8 10h6.4M10 6.8v6.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  zoomOut: '<circle cx="10" cy="10" r="6.6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l6.5 6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M6.8 10h6.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  eye: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" d="M1.8 12S5.5 5 12 5s10.2 7 10.2 7-3.7 7-10.2 7S1.8 12 1.8 12z"/><circle cx="12" cy="12" r="3.4" fill="currentColor"/>',
  iso: '<path fill="currentColor" d="M12 2.5l9 4.8v9.4l-9 4.8-9-4.8V7.3z" opacity=".35"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 2.5l9 4.8-9 4.8-9-4.8zM12 12.1v9.4M3 7.3v9.4l9 4.8 9-4.8V7.3"/>',
  axe: '<path d="M5 21L15.5 7.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path fill="currentColor" d="M12.5 4.2c2.8-2.3 6.6-2 8.6.3-1.2.2-2.3 1-2.9 2.1-.8 1.4-.6 3 .4 4.2-2.7.3-5.6-1.1-7-3.6z"/>',
  hand: '<path fill="currentColor" d="M7.4 12.6V6.3a1.5 1.5 0 0 1 3 0v4.9V4.6a1.5 1.5 0 0 1 3 0v6.6V5.6a1.5 1.5 0 0 1 3 0v6.9-3.1a1.4 1.4 0 0 1 2.8 0v5.2c0 4.1-2.9 7-6.6 7-2.7 0-4.4-1.3-5.9-3.7L3.9 13.6a1.5 1.5 0 0 1 2.4-1.8z"/>',
  chest: '<path fill="currentColor" d="M3 10h18v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19zM3.2 9a8.8 5 0 0 1 17.6 0z"/><rect x="10.2" y="9.2" width="3.6" height="4.6" rx=".8" fill="#3A2817"/><path d="M3 12.5h18" stroke="#3A2817" stroke-width="1.3"/>',
  talk: '<path fill="currentColor" d="M4 4h16a1.8 1.8 0 0 1 1.8 1.8v9.4A1.8 1.8 0 0 1 20 17h-8.5L6 21v-4H4a1.8 1.8 0 0 1-1.8-1.8V5.8A1.8 1.8 0 0 1 4 4z"/><circle cx="8" cy="10.5" r="1.3" fill="#3A2817"/><circle cx="12" cy="10.5" r="1.3" fill="#3A2817"/><circle cx="16" cy="10.5" r="1.3" fill="#3A2817"/>',
  sword: '<path fill="currentColor" d="M20.5 2.5l-.6 4.4L9.6 17.2l-2.8-2.8L17.1 4.1z"/><path d="M4.4 13.6l6 6M6.2 17.8l-3.1 3.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  shield: '<path fill="currentColor" d="M12 2.3l8.3 3v6.3c0 5.2-3.6 8.6-8.3 10.1-4.7-1.5-8.3-4.9-8.3-10.1V5.3z"/><path d="M12 5.5v13" stroke="#3A2817" stroke-width="1.6" opacity=".6"/>',
  strike: '<path fill="currentColor" d="M12 1.5l2.1 6.2 6.2-2.4-3.6 5.4 5.8 2.9-6.5.9 1.1 6.5-5.1-4.2-5.1 4.2 1.1-6.5-6.5-.9 5.8-2.9-3.6-5.4 6.2 2.4z"/>',
  sun: '<circle cx="12" cy="12" r="4.8" fill="currentColor"/><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M4.8 19.2l2.1-2.1M17.1 6.9l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  moon: '<path fill="currentColor" d="M15.5 2.8A9.5 9.5 0 1 0 21.2 15 7.6 7.6 0 0 1 15.5 2.8z"/>',
  paw: '<ellipse cx="12" cy="16" rx="5" ry="4.2" fill="currentColor"/><circle cx="5.2" cy="10.6" r="2.1" fill="currentColor"/><circle cx="9.3" cy="6.3" r="2.2" fill="currentColor"/><circle cx="14.7" cy="6.3" r="2.2" fill="currentColor"/><circle cx="18.8" cy="10.6" r="2.1" fill="currentColor"/>',
  lock: '<path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="4.5" y="10" width="15" height="11" rx="2" fill="currentColor"/>',
  star: '<path fill="currentColor" d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/>',
  house: '<path fill="currentColor" d="M12 3l9.5 8h-2.7v9.5h-5v-6h-3.6v6h-5V11H2.5z"/>',
  tower: '<path fill="currentColor" d="M5 3h3v2h2.5V3h3v2H16V3h3v6l-2 2v10H7V11L5 9z"/><rect x="10.3" y="14" width="3.4" height="7" fill="#3A2817"/>',
  look: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" stroke="currentColor" stroke-width="2.2"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 6.8V12l3.6 2.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  pick: '<path d="M6 21L14.5 9.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path fill="currentColor" d="M3 6.5c4.2-3.8 11-4.4 16.5-1.5 1 .5 1.7 1.3 1.9 2.4-4.5-2.2-10-2.4-14.6.6z"/>',
  sickle: '<path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M17.5 4.5A8 8 0 1 0 19 15"/><path d="M8.5 15.5L4 20.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  jacket: '<path fill="currentColor" d="M8 3l4 2.2L16 3l5 3.2-2 5.3-2-.9V21H7V10.6l-2 .9-2-5.3z"/><path d="M12 5.4V21" stroke="#3A2817" stroke-width="1.4"/>',
  cap: '<path fill="currentColor" d="M3.5 16a8.5 8.5 0 0 1 17 0v1.5h-17z"/><rect x="2" y="17" width="20" height="2.6" rx="1.2" fill="currentColor"/>',
  mail: '<path fill="currentColor" d="M7 3h10l4 4-2.5 2.8V21h-13V9.8L3 7z"/><path d="M8 10h8M8 13h8M8 16h8" stroke="#3A2817" stroke-width="1.3" stroke-dasharray="1.6 1.4"/>',
  cudgel: '<path d="M5 20.5L13 10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="16" cy="6.8" rx="4" ry="5.2" transform="rotate(38 16 6.8)" fill="currentColor"/>',
  spear: '<path d="M4 21.5L17.5 6.5" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path fill="currentColor" d="M21.5 2.5l-1.2 6.7-3.2-1.3-1.4-3.2z"/>',
  frame: '<path fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" d="M7 2.5v19M17 2.5v19M7 7h10M7 12.5h10M7 18h10"/>',
  gear: '<path fill="currentColor" d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"/><circle cx="12" cy="12" r="3.4" fill="#3A2817"/>',
  dummy: '<circle cx="12" cy="5" r="3" fill="currentColor"/><path fill="currentColor" d="M8.5 9h7l-1 7h-5z"/><path d="M3.5 10.5h17M12 16v6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  arrow: '<path fill="currentColor" d="M12 2l5 7h-3.2v13h-3.6V9H7z"/>'
};
const ic = (n, cls) => '<svg class="ic' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + I[n] + "</svg>";
const ARROW = '<svg viewBox="0 0 58 58" aria-hidden="true"><path d="M29 1l7 9H22z" fill="currentColor" stroke="#2E2015" stroke-width="1.5"/></svg>';

// ---------- mock state ----------
const S = {
  hp: 100, food: 64, coin: 30, chest: 40, rep: 10, repQ: -40, bread: 2, fish: 0,
  load: 0, loadMax: 10, toolLvl: 0, weapon: null, shield: false, jacket: false, cap: false, mail: false, sack: "Sack",
  loadsDone: 0, orders: [], tracked: null, log: [], readBoard: false, goodStrokes: 0, dummyHits: 0,
  chop: null, target: null, braceCd: 0, strikeCd: 0, windup: 0, braceOn: 0, swingT: 0
};
W.ui = S; // for testing in the browser console

// ---------- P-WORK: chop and carry, on the real rules (src/sim/work.ts) ----------
const workSpots = W.spots.trees.filter(t => t.work);
const work = new Work(workSpots);
W.work = work; // for testing in the browser console
const spotOf = t => workSpots[t.id];
try { work.auto = localStorage.getItem("thr-auto") === "1"; } catch (e) {}
// P-WORK 2 (the director's answer to Q34): the big swing and errands are the new default; the Test drawer switches back
try { work.style = localStorage.getItem("thr-chop") === "beat" ? "beat" : "swing"; } catch (e) {}
const ES = W.errandSites;
const errands = new Errands([
  { id: "palisade", x: ES.palisade.x, z: ES.palisade.z, name: "north palisade", ask: "Stakes pulled from the palisade. Fill the gap!", done: "The palisade holds", i: "tower" },
  { id: "forge", x: ES.forge.x, z: ES.forge.z, name: "Smith's forge", ask: "The forge is going cold. Firewood!", done: "The forge roars again", i: "strike" },
  { id: "oven", x: ES.oven.x, z: ES.oven.z, name: "bread oven", ask: "Wood for the evening bake, please.", done: "Bread tonight", i: "bread" }
]);
W.errands = errands; // for testing in the browser console
try { errands.setOn(localStorage.getItem("thr-errands") !== "0"); } catch (e) {}
const errandAt = () => errands.active && errands.active.site;
let felledT = 0; // seconds the "tree down" hint stays
// placeholder sounds made on the spot (no sound files yet, docs/10: placeholder effects only)
let ac = null;
function audio() { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = false; } } if (ac && ac.state === "suspended") ac.resume(); return ac || null; }
window.addEventListener("pointerdown", () => audio(), { once: true, capture: true });
function thock(pitch, vol) {
  const a = audio(); if (!a) return; const t = a.currentTime;
  const o = a.createOscillator(), g = a.createGain();
  o.type = "triangle"; o.frequency.setValueAtTime(pitch, t); o.frequency.exponentialRampToValueAtTime(pitch * 0.45, t + 0.09);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.13);
}
function clink() { [1320, 1760].forEach((f, i) => { const a = audio(); if (!a) return; const t = a.currentTime + i * 0.07, o = a.createOscillator(), g = a.createGain();
  o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.26); }); }
// a tree coming down: a short burst of low noise
function crash() {
  const a = audio(); if (!a) return; const t = a.currentTime, n = Math.floor(a.sampleRate * 0.7);
  const buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
  const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  src.buffer = buf; f.type = "lowpass"; f.frequency.value = 420; g.gain.value = 0.5;
  src.connect(f).connect(g).connect(a.destination); src.start(t);
}
function buzz(ms) { if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) try { navigator.vibrate(ms); } catch (e) {} }
let lastTree = null;
function onWork(ev) {
  ev.forEach(e => {
    if (e.k === "stroke") { const sp = spotOf(work.chopping || lastTree); W.swing(); if (sp) W.shake(sp); thock(170, 0.18); }
    else if (e.k === "good") {
      const ringAt = { x: parseFloat(ringEl.style.left), y: parseFloat(ringEl.style.top) - 50 };
      S.goodStrokes++; float(e.streak > 1 ? "Good! x" + e.streak : "Good!", "good", ringAt);
      thock(260 + Math.min(10, e.streak) * 25, 0.3); buzz(10);
    }
    else if (e.k === "swing") {
      const sp = spotOf(work.chopping || lastTree); W.swing(); if (sp) W.shake(sp); S.swung = true;
      const at = sp ? W.project(sp.x, 2.6, sp.z) : null;
      if (e.q === "perfect") { float(e.streak > 1 ? "Perfect! x" + e.streak : "Perfect!", "good", at); thock(300 + Math.min(8, e.streak) * 30, 0.38); buzz(25); }
      else if (e.q === "good") { float("Good", "good", at); thock(220, 0.25); buzz(10); }
      else { float("Weak", "good weak", at); thock(130, 0.14); }
    }
    else if (e.k === "full") { float("Sack full", "good"); }
    else if (e.k === "felled") { W.fell(spotOf(e.tree)); felledT = 6; float("TIMBER!", "good big"); crash(); buzz(60); }
    else if (e.k === "rank") { banner("axe", e.name + " woodcutter"); }
  });
}
const LEVELS = [[-100, "Outcast"], [-49, "Distrusted"], [-9, "Common"], [30, "Trusted"], [70, "Honoured"]];
const level = r => { let n = LEVELS[0][1]; LEVELS.forEach(([m, l]) => { if (r >= m) n = l; }); return n; };
const levelRank = n => LEVELS.findIndex(l => l[1] === n);

// ---------- places in the street (mock jobs for the one-street test) ----------
const home = W.housesSpec[1]; // the second house on the south side is "your home"
const PL = {
  board: { x: -3.5, z: 2.0, name: "Notice board" },
  cart: { x: -24, z: 1.0, name: "Timber yard" },
  home: { x: home.x - home.w * 0.2, z: home.z + home.d / 2 + 0.9, name: "Your home" },
  dummy: { x: -2.4, z: -7.2, name: "Straw dummy" },
  gate: { x: W.gate.x, z: W.gate.z - 1.6, name: "North gate" }
};
const ORDER_AT = { timber: PL.cart, gate: PL.gate }; // where each order is done: marked on the map, arrowed when tracked
const smith = W.walkers[4], reader = W.walkers[5];
const NAMES = ["Inês", "Bento", "Marta", "Duarte", "Rui", "Leonor"];
const posOf = w => w.p.root.position;

// straw practice dummy (the street has no enemies; it stands in for one)
(function () {
  const r = new BAB.TransformNode("dummy", W.scene); r.position.set(PL.dummy.x, 0, PL.dummy.z);
  const m = (n, mesh, hex) => { mesh.material = W.mat(hex); mesh.parent = r; return mesh; };
  const post = m("p", BAB.MeshBuilder.CreateCylinder("dp", { height: 1.9, diameter: 0.14, tessellation: 6 }, W.scene), "#5E4329"); post.position.y = 0.95;
  const body = m("b", BAB.MeshBuilder.CreateCylinder("db", { height: 0.9, diameterTop: 0.5, diameterBottom: 0.62, tessellation: 8 }, W.scene), "#CDB062"); body.position.y = 1.25;
  const head = m("h", BAB.MeshBuilder.CreateIcoSphere("dh", { radius: 0.26, subdivisions: 1 }, W.scene), "#D9C27A"); head.position.y = 1.95;
  const arm = m("a", BAB.MeshBuilder.CreateBox("da", { width: 1.3, height: 0.1, depth: 0.1 }, W.scene), "#5E4329"); arm.position.y = 1.5;
  const ringT = BAB.MeshBuilder.CreateTorus("dring", { diameter: 1.4, thickness: 0.12, tessellation: 24 }, W.scene);
  const rm = new BAB.StandardMaterial("dringM", W.scene); rm.diffuseColor = BAB.Color3.FromHexString("#D23B2E"); rm.emissiveColor = BAB.Color3.FromHexString("#8E1F16"); rm.specularColor = new BAB.Color3(0, 0, 0);
  ringT.material = rm; ringT.parent = r; ringT.position.y = 0.05; ringT.isVisible = false;
  PL.dummy.node = r; PL.dummy.body = body; PL.dummy.ring = ringT; PL.dummy.hp = 60;
  W.block(PL.dummy.x, PL.dummy.z, 0.35, 0.35);
})();

// ---------- build the screen ----------
const ui = el("div"); ui.id = "ui"; document.body.appendChild(ui);
ui.innerHTML = `
<div id="stats" class="plate">
  <div class="row" id="hpRow" title="Health">${ic("heart")}<div class="bar"><i></i></div><span class="num" id="hpN"></span></div>
  <div class="row" id="foodRow" title="Hunger: tap to eat">${ic("bread")}<div class="bar"><i></i></div><span class="num" id="foodN"></span><span class="tip">tap to eat</span></div>
  <div class="row" id="coinRow" title="Coin you carry">${ic("coin")}<span class="num" id="coinN"></span><span class="tip" style="font-size:.8em;color:#D8C9A8">carried</span></div>
  <div class="row" id="repRow" title="The Roll: your standing in Almara">${ic("feather")}<span class="lvl" id="repL"></span><div class="bar"><i></i></div></div>
</div>
<div id="track" class="plate"></div>
<div id="dial" class="plate"><span id="dialI"></span><span id="dialT"></span></div>
<div id="icons">
  <button class="wbtn test" id="testB" aria-label="Test controls (not part of the game)" title="Test controls">${ic("gear")}</button>
  <button class="wbtn" id="ordB" aria-label="Your orders">${ic("scroll")}</button>
  <button class="wbtn" id="mapB" aria-label="Map">${ic("map")}</button>
  <button class="wbtn" id="bagB" aria-label="Bag">${ic("sack")}</button>
  <button class="wbtn" id="pauseB" aria-label="Pause">${ic("pause")}</button>
</div>
<div id="drawer" class="plate"></div>
<button class="wbtn" id="zoomB" aria-label="Zoom in" aria-pressed="false">${ic("zoomIn")}</button>
<button class="wbtn" id="viewB" aria-label="Switch to first-person view">${ic("eye")}</button>
<button class="wbtn fight" id="braceB" aria-label="Brace" hidden><span class="cd"></span>${ic("shield")}<span class="k">Q</span></button>
<button class="wbtn fight" id="strikeB" aria-label="Heavy strike" hidden><span class="cd"></span>${ic("strike")}<span class="k">E</span></button>
<button class="wbtn" id="actB" aria-label="Action"><span id="actI"></span><span class="cap" id="actC"></span></button>
<div id="hint" class="plate"></div>
<div id="banner" class="plate"></div>
<div id="ring"></div>
<div id="swing" aria-hidden="true"><b class="zone"></b><i class="mark"></i></div>
<div id="dot"></div>
<div id="world"></div>
<section id="panel" aria-modal="false"></section>`;
const world = $("#world");
const isTouch = matchMedia("(pointer: coarse)").matches;
if (!isTouch) document.querySelectorAll(".fight .k").forEach(k => k.hidden = false); else document.querySelectorAll(".fight .k").forEach(k => k.hidden = true);

// the style test's controls go into the Test drawer (same buttons, same handlers)
const drawer = $("#drawer");
drawer.appendChild($("#hud > .top"));
const zb = el("button", "pbtn", "Zoom (3 levels)"); zb.onclick = () => W.zoom(); drawer.appendChild(zb);
const fpsL = el("div", "fps"); drawer.appendChild(fpsL);
// P-WORK numbers for the director's 10-minute test (docs/11, sections 3 and 5): read here, copy to paste in a message
const workL = el("div", "fps"); drawer.appendChild(workL);
function workLine() {
  const s = work.stats, m = Math.floor(s.playTime / 60), share = work.lateShare;
  if (work.style === "swing") {
    const lp = work.latePerfect;
    return "Work " + m + " min · " + s.fullLoads + " loads · ◎" + s.coin + " · perfect " + (s.swings ? Math.round(100 * s.perfect / s.swings) + "%" : "-") + (lp === null ? "" : " (after 3 min " + Math.round(100 * lp) + "%)") + " · errands " + errands.stats.done + "/" + errands.stats.asked;
  }
  return "Work " + m + " min · " + s.fullLoads + " loads · ◎" + s.coin + " · good " + (s.strokes ? Math.round(100 * s.good / s.strokes) + "%" : "-") + (share === null ? "" : " (after 3 min " + Math.round(100 * share) + "%)");
}
// P-WORK 2 switches, so one session can compare the old and new ways
const chopB = el("button", "pbtn"), errB = el("button", "pbtn");
function switchText() {
  chopB.textContent = "Chop: " + (work.style === "swing" ? "big swing" : "beat ring") + " ⇄";
  errB.textContent = "Errands: " + (errands.on ? "on" : "off") + " ⇄";
}
chopB.onclick = () => { work.stop(); work.style = work.style === "swing" ? "beat" : "swing"; try { localStorage.setItem("thr-chop", work.style); } catch (e) {} switchText(); };
errB.onclick = () => { errands.setOn(!errands.on); if (!errands.on) W.errandShow("palisade", 1); try { localStorage.setItem("thr-errands", errands.on ? "1" : "0"); } catch (e) {} switchText(); };
switchText(); drawer.appendChild(chopB); drawer.appendChild(errB);
const cpB = el("button", "pbtn", "Copy playtest summary");
cpB.onclick = () => {
  const txt = work.summary("M1 P-WORK 2") + "\n" + errands.summaryLine() + (errands.on ? "" : " (errands switched off now)") + "\nWalk 5.5 m/s, a full load 10% slower";
  const done = () => float("Copied", "good");
  if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => prompt("Copy this:", txt)); else prompt("Copy this:", txt);
};
drawer.appendChild(cpB);
drawer.appendChild(el("div", "fps", "Chopping and errands use the real P-WORK 2 rules; the rest is still the mock-up"));
$("#testB").onclick = () => drawer.classList.toggle("on");

// ---------- helpers: floating numbers, banner, toast-like log ----------
let lastFloat = null;
function float(text, cls, at) {
  const p = at || W.project(W.me.root.position.x, 2.3, W.me.root.position.z);
  const now = performance.now();
  if (!cls && lastFloat && now - lastFloat.t < 600 && lastFloat.kind === text.replace(/[+\-\d]/g, "")) {
    lastFloat.n += parseInt(text.replace(/[^\d\-]/g, ""), 10) || 0; lastFloat.e.textContent = "+" + lastFloat.n + lastFloat.kind; lastFloat.t = now; return;
  }
  const e = el("div", "float" + (cls ? " " + cls : ""), text); e.style.left = p.x + "px"; e.style.top = p.y + "px"; world.appendChild(e);
  setTimeout(() => e.remove(), 1400);
  if (!cls) lastFloat = { e, t: now, n: parseInt(text.replace(/[^\d\-]/g, ""), 10) || 0, kind: text.replace(/[+\-\d]/g, "") };
}
let bannerT = 0;
function banner(icon, text) { const b = $("#banner"); b.innerHTML = ic(icon) + "<span>" + text + "</span>"; b.classList.remove("on"); void b.offsetWidth; b.classList.add("on"); bannerT = 2.4; }
function addRep(n, why) {
  const before = level(S.rep); S.rep = Math.max(-100, Math.min(100, S.rep + n)); S.log.unshift((n > 0 ? "+" : "") + n + " · " + why); S.log.length = Math.min(S.log.length, 10);
  const r = $("#repRow"); r.classList.remove("pulse"); void r.offsetWidth; r.classList.add("pulse");
  if (level(S.rep) !== before) banner("feather", "The Roll now says: " + level(S.rep));
}
function addCoin(n) { S.coin += n; float("+" + n + " ◎"); }

// ---------- panels ----------
const panel = $("#panel");
let panelKind = null, panelSrc = null;
function openPanel(kind, title, bodyHTML, opts) {
  opts = opts || {};
  panelKind = kind; panelSrc = opts.src || null;
  panel.className = "on" + (opts.full ? " full" : "");
  panel.innerHTML = `<header><h2>${title}</h2>${opts.purse ? '<span class="purse">' + ic("coin") + '<span id="purseN">' + S.coin + "</span></span>" : ""}<button class="x" aria-label="Close">✕</button></header><div class="body">${bodyHTML}</div>`;
  $(".x", panel).onclick = closePanel;
  if (opts.after) opts.after(panel);
}
function closePanel() {
  if (panelKind === "pause") W.setPaused(false);
  panel.className = ""; panel.innerHTML = ""; panelKind = null; panelSrc = null;
}
window.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  if (k === "escape") { if (panelKind) closePanel(); else openPause(); }
  if (panelKind === "pause") return;
  if (k === " ") { e.preventDefault(); if (e.repeat && swingHeld) return; if (!swingPress()) act(); }
  if (k === "q") brace(); if (k === "e") strike();
  if (k === "b") toggle("bag", openBag); if (k === "m") toggle("map", openMap); if (k === "o") toggle("orders", openOrders);
});
function toggle(kind, fn) { if (panelKind === kind) closePanel(); else fn(); }

// A tap outside an open panel or the Test drawer only closes it: it doesn't also move you or act (docs/07).
// The panel buttons (top-right icons, the Roll row) keep their own job: switch to their panel, or close it.
let eatClick = false;
window.addEventListener("pointerdown", e => {
  eatClick = false;
  const t = e.target instanceof Element ? e.target : null;
  if (!t) return;
  const panelButton = !!t.closest("#icons, #repRow");
  let closed = false;
  if (drawer.classList.contains("on") && !t.closest("#drawer, #testB")) { drawer.classList.remove("on"); closed = true; }
  if (panelKind && !t.closest("#panel") && !panelButton) { closePanel(); closed = true; }
  if (closed && !panelButton) { e.stopPropagation(); e.preventDefault(); eatClick = true; }
}, true);
window.addEventListener("click", e => { if (eatClick) { eatClick = false; e.stopPropagation(); e.preventDefault(); } }, true);

// notice board
const BOARD = [
  { id: "timber", icon: "axe", text: "TIMBER. To the yard. Properly stacked, please.", coin: 8, rep: 3, need: 3, unit: "loads", dl: "Before dusk", dlI: "sun" },
  { id: "gate", icon: "tower", text: "Guard the north gate tonight.", coin: 6, rep: 3, need: 1, unit: "night", dl: "Until dawn", dlI: "moon" },
  { id: "scout", icon: "look", text: "Scout the enemy camp. Quietly.", coin: 12, rep: 4, need: 1, unit: "trip", dl: "1 day", dlI: "clock", lock: "Trusted" }
];
function openBoard() {
  S.readBoard = true;
  const cards = BOARD.map(o => {
    const taken = S.orders.find(x => x.id === o.id), locked = o.lock && levelRank(level(S.rep)) < levelRank(o.lock);
    const btn = taken ? '<button class="pbtn" disabled>Taken</button>'
      : locked ? `<span class="lock">${ic("lock")} Needs ${o.lock}</span>`
      : S.orders.length >= 2 ? '<button class="pbtn" disabled>2 orders max</button>'
      : `<button class="pbtn" data-acc="${o.id}">Accept</button>`;
    return `<div class="notep${taken ? " taken" : ""}">${ic(o.icon)}<p>${o.text}</p>
      <div class="rw"><i>${ic("coin")}${o.coin}</i><i>${ic("feather")}+${o.rep}</i></div>
      <div class="dl">${ic(o.dlI)}${o.dl}</div>${btn}</div>`;
  }).join("");
  openPanel("board", "Notice board · Almara", `<div class="notes">${cards}</div><p class="note">The Steward posts what the town really lacks. Ignoring an order costs 2 reputation when its time runs out.</p>`, {
    src: PL.board, after: p => p.querySelectorAll("[data-acc]").forEach(b => b.onclick = () => {
      const o = BOARD.find(x => x.id === b.dataset.acc); S.orders.push({ ...o, have: 0 }); S.tracked = o.id;
      float("Order taken", "good", W.project(PL.board.x, 2.6, PL.board.z + 0.9)); openBoard();
    })
  });
}
function openOrders() {
  const rows = S.orders.length ? S.orders.map(o => `<div class="item">${ic(o.icon)}<div><b>${o.text}</b><span>${o.have}/${o.need} ${o.unit} · ${o.dl} · ◎${o.coin} · +${o.rep} reputation</span></div>
      <button class="pbtn" data-tr="${o.id}" ${S.tracked === o.id ? "disabled" : ""}>${S.tracked === o.id ? "Tracked" : "Track"}</button>
      <button class="pbtn warn seal" data-drop="${o.id}">Drop <small>−4</small><i></i></button></div>`).join("")
    : '<p>No orders taken. The notice board is by the banner in the square.</p>';
  openPanel("orders", "Your orders", rows + '<p class="note">Dropping an order you took costs 4 reputation. Hold "Drop" for 1 second.</p>', {
    after: p => {
      p.querySelectorAll("[data-tr]").forEach(b => b.onclick = () => { S.tracked = b.dataset.tr; openOrders(); });
      p.querySelectorAll("[data-drop]").forEach(b => holdToConfirm(b, 1000, () => {
        S.orders = S.orders.filter(o => o.id !== b.dataset.drop); if (S.tracked === b.dataset.drop) S.tracked = S.orders[0] ? S.orders[0].id : null;
        addRep(-4, "Dropped an order"); openOrders();
      }));
    }
  });
}
function holdToConfirm(btn, ms, fn) {
  let t0 = 0, raf = 0; const fill = btn.querySelector("i");
  const step = () => { const k = Math.min(1, (performance.now() - t0) / ms); fill.style.width = (k * 100) + "%"; if (k >= 1) { stop(); fn(); } else raf = requestAnimationFrame(step); };
  const stop = () => { cancelAnimationFrame(raf); fill.style.width = "0"; };
  btn.addEventListener("pointerdown", e => { e.preventDefault(); t0 = performance.now(); raf = requestAnimationFrame(step); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(n => btn.addEventListener(n, stop));
}

// shop: the Smith (one seller, three tabs)
const SHOP = {
  Tools: [
    { n: "Iron axe", i: "axe", d: "+25% chopping", p: 25, buy: () => S.toolLvl = Math.max(S.toolLvl, 1), has: () => S.toolLvl >= 1, cmp: () => "now: old axe, +0%" },
    { n: "Iron sickle", i: "sickle", d: "+25% farming", p: 25 },
    { n: "Iron pick", i: "pick", d: "+25% quarrying", p: 25 },
    { n: "Master's axe", i: "axe", d: "+50% chopping, wider beat window", p: 60, lock: "Trusted" }
  ],
  Weapons: [
    { n: "Cudgel", i: "cudgel", d: "Attack 7", p: 8, buy: () => S.weapon = S.weapon || "Cudgel", has: () => !!S.weapon, cmp: () => S.weapon ? "now: " + S.weapon : "now: bare hands" },
    { n: "Spear", i: "spear", d: "Attack 10, longer reach", p: 20, buy: () => S.weapon = "Spear", has: () => S.weapon === "Spear", cmp: () => S.weapon ? "now: " + S.weapon : "now: bare hands" },
    { n: "Short sword", i: "sword", d: "Attack 13, faster swings", p: 60, lock: "Trusted" }
  ],
  Armour: [
    { n: "Shield", i: "shield", d: "Brace blocks 60%", p: 15, buy: () => S.shield = true, has: () => S.shield },
    { n: "Padded jacket", i: "jacket", d: "Defence +2", p: 25, buy: () => S.jacket = true, has: () => S.jacket },
    { n: "Iron cap", i: "cap", d: "Defence +2", p: 35, buy: () => S.cap = true, has: () => S.cap },
    { n: "Mail shirt", i: "mail", d: "Defence +4, 10% slower", p: 120, lock: "Honoured" }
  ]
};
let shopTab = "Tools";
function openShop() {
  const tabs = Object.keys(SHOP).map(t => `<button data-tab="${t}" class="${t === shopTab ? "on" : ""}">${t}</button>`).join("");
  const rows = SHOP[shopTab].map((it, k) => {
    const locked = it.lock && levelRank(level(S.rep)) < levelRank(it.lock), owned = it.has && it.has(), short = it.p - S.coin;
    const right = owned ? '<span class="lock">Owned</span>' : locked ? `<span class="lock">${ic("lock")} ${it.lock}</span>`
      : !it.buy ? '<button class="pbtn" disabled>Mock-up</button>'
      : short > 0 ? `<button class="pbtn" disabled>◎${short} more</button>` : `<button class="pbtn" data-buy="${k}">Buy</button>`;
    return `<div class="item">${ic(it.i)}<div><b>${it.n}</b><span>${it.d}${it.cmp ? " · " + it.cmp() : ""}</span></div><span class="price${short > 0 || locked ? " no" : ""}">${ic("coin")}${it.p}</span>${right}</div>`;
  }).join("");
  const savings = `<p class="note">You pay with the coin you carry. Your savings at home: ◎${S.chest}.</p>`;
  openPanel("shop", "The Smith · Vasco", `<div class="tabs">${tabs}</div>${rows}${savings}`, {
    purse: true, src: smith ? { x: posOf(smith).x, z: posOf(smith).z } : null,
    after: p => {
      p.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { shopTab = b.dataset.tab; openShop(); });
      p.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => {
        const it = SHOP[shopTab][+b.dataset.buy]; S.coin -= it.p; it.buy(); float("−" + it.p + " ◎", "good");
        if (it.i === "spear" || it.i === "cudgel") banner(it.i, it.n + " in hand. Fight buttons are out.");
        openShop();
      });
    }
  });
}

// bag (and the chest, when at home)
function openBag() {
  const atHome = dist(W.me.root.position, PL.home) < 3;
  const food = ["🍞".repeat(0)].concat([]);
  const belt = (S.bread ? ic("bread") + " Bread × " + S.bread : "") + (S.fish ? " · Salted fish × " + S.fish : "") || "—";
  const pct = Math.round(100 * S.load / S.loadMax), fl = work.stats.fullLoads, rank = work.rank.name;
  const next = fl >= 40 ? "" : " (" + fl + "/" + (fl >= 15 ? 40 : 15) + " full loads)";
  const body = `<dl class="slots">
    <dt>Hands</dt><dd>${S.weapon ? ic(S.weapon === "Spear" ? "spear" : "cudgel") + S.weapon : ic("axe") + (S.toolLvl ? "Iron axe" : "Old axe")}</dd>
    <dt>Off-hand</dt><dd>${S.shield ? ic("shield") + "Shield" : "—"}</dd>
    <dt>Head</dt><dd>${S.cap ? ic("cap") + "Iron cap" : "—"}</dd>
    <dt>Body</dt><dd>${S.jacket ? ic("jacket") + "Padded jacket" : "—"}</dd>
    <dt>Back</dt><dd>${ic("sack")}${S.sack} <span class="loadbar"><i style="width:${pct}%"></i></span> ${S.load}/${S.loadMax} timber</dd>
    <dt>Belt</dt><dd>${belt}</dd>
    <dt>Heirloom</dt><dd>${ic("star")}none yet (first war)</dd>
    <dt>Know-how</dt><dd>Woodcutter · ${rank}${next}</dd>
  </dl>
  <p class="note">Everything above, and the ◎${S.coin} you carry, drops in a sack where you fall.</p>
  ${atHome ? `<p><b>Home chest:</b> ◎${S.chest} saved. <button class="pbtn" id="storeB">Store all coin</button> <button class="pbtn" id="takeB" ${S.chest < 10 ? "disabled" : ""}>Take ◎10</button></p>` : '<p class="note">Your chest is at home (the house with the gold marker on the map).</p>'}`;
  openPanel("bag", "Bag", body, { purse: true, after: p => {
    const sb = $("#storeB", p), tb = $("#takeB", p);
    if (sb) sb.onclick = () => { storeAll(); openBag(); };
    if (tb) tb.onclick = () => { S.chest -= 10; S.coin += 10; openBag(); };
  } });
}
function storeAll() { if (!S.coin) { float("Nothing to store", "good"); return; } S.chest += S.coin; float("◎" + S.coin + " stored", "good"); S.coin = 0; }

// map: a parchment drawing of the street, from the real layout
function openMap() {
  openPanel("map", "Map · the square of Almara", '<canvas id="mapc"></canvas>', { full: true, after: () => drawMap() });
}
function drawMap() {
  const c = $("#mapc"); if (!c) return;
  const r = c.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = r.width * dpr; c.height = r.height * dpr;
  const g = c.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const X0 = -40, X1 = 40, Z0 = -26, Z1 = 31, s = Math.min(r.width / (X1 - X0), r.height / (Z1 - Z0));
  const ox = (r.width - (X1 - X0) * s) / 2, oy = (r.height - (Z1 - Z0) * s) / 2;
  const mx = x => ox + (x - X0) * s, my = z => oy + (Z1 - z) * s; // north (+z) up
  g.fillStyle = "#EADBB5"; g.fillRect(0, 0, r.width, r.height);
  g.fillStyle = "#9FB7C9"; g.fillRect(mx(X0), my(-24), (X1 - X0) * s, (24 + Z0 + 50) * s);
  g.strokeStyle = "#B08A5A"; g.lineWidth = 4.2 * s; g.beginPath(); g.moveTo(mx(X0), my(0)); g.lineTo(mx(X1), my(0)); g.stroke();
  g.lineWidth = 3 * s; g.beginPath(); g.moveTo(mx(4.5), my(-1.5)); g.lineTo(mx(4.5), my(-24)); g.stroke();
  // north lane, palisade and the north gate
  const G = W.gate; g.lineWidth = 2.6 * s; g.beginPath(); g.moveTo(mx(G.x), my(2)); g.lineTo(mx(G.x), my(G.z)); g.stroke();
  g.strokeStyle = "#6B4A2B"; g.lineWidth = Math.max(2, 0.45 * s); g.setLineDash([3, 2]); g.beginPath();
  g.moveTo(mx(G.x - 21.8), my(G.z)); g.lineTo(mx(G.x - 3), my(G.z)); g.moveTo(mx(G.x + 3), my(G.z)); g.lineTo(mx(G.x + 21.8), my(G.z)); g.stroke(); g.setLineDash([]);
  g.fillStyle = "#5A3A22"; [-2.1, 2.1].forEach(dx => g.fillRect(mx(G.x + dx - 0.75), my(G.z + 0.75), 1.5 * s, 1.5 * s));
  g.fillStyle = "rgba(122,140,62,.35)"; g.fillRect(mx(-31), my(-11), 22 * s, 10 * s); g.fillRect(mx(9), my(-11), 22 * s, 10 * s);
  g.fillStyle = "#6E7A3E"; W.spots.trees.forEach(t => { g.beginPath(); g.arc(mx(t.x), my(t.z), 0.9 * s, 0, 7); g.fill(); });
  W.housesSpec.forEach((h, i) => { g.fillStyle = i === 1 ? "#C9A23A" : "#A9643C"; g.strokeStyle = "#5A3A22"; g.lineWidth = 1.5;
    g.fillRect(mx(h.x - h.w / 2), my(h.z + h.d / 2), h.w * s, h.d * s); g.strokeRect(mx(h.x - h.w / 2), my(h.z + h.d / 2), h.w * s, h.d * s); });
  const label = (x, z, t, col) => { g.font = "700 " + Math.max(11, 1.5 * s) + "px Georgia, serif"; g.fillStyle = col || "#3A2817"; g.textAlign = "center"; g.fillText(t, mx(x), my(z) - 6); };
  const dot = (x, z, col, rad) => { g.fillStyle = col; g.beginPath(); g.arc(mx(x), my(z), rad || 5, 0, 7); g.fill(); g.strokeStyle = "#2E2015"; g.lineWidth = 1.5; g.stroke(); };
  dot(PL.board.x, PL.board.z + 0.9, "#8A6A45"); label(PL.board.x, PL.board.z + 1.4, "Notice board");
  dot(PL.cart.x, PL.cart.z + 1.6, "#8A6A45"); label(PL.cart.x, PL.cart.z + 2.2, "Timber yard");
  if (smith) { const p = posOf(smith); dot(p.x, p.z, "#8A6A45"); label(p.x, p.z + 0.8, "Smith"); }
  dot(PL.dummy.x, PL.dummy.z, "#D23B2E"); label(PL.dummy.x + 5, PL.dummy.z + 0.4, "Straw dummy", "#8E1F16");
  label(home.x - 1, home.z - home.d / 2 - 1.8, "Home");
  label(G.x, G.z + 1.4, "North gate");
  // every accepted order's place gets a dashed gold ring, the tracked one a thicker ring
  S.orders.forEach(o => { const at = ORDER_AT[o.id]; if (!at) return; const on = o.id === S.tracked;
    g.strokeStyle = "#A27A1E"; g.lineWidth = on ? 3 : 1.6; g.setLineDash([5, 4]); g.beginPath(); g.arc(mx(at.x), my(at.z + 1.6), on ? 13 : 10, 0, 7); g.stroke(); g.setLineDash([]); });
  const ea = errands.active;
  if (ea) { dot(ea.site.x, ea.site.z, "#C9A23A"); label(ea.site.x, ea.site.z + 0.8, ea.site.name); g.strokeStyle = "#A27A1E"; g.lineWidth = 3; g.setLineDash([5, 4]); g.beginPath(); g.arc(mx(ea.site.x), my(ea.site.z), 13, 0, 7); g.stroke(); g.setLineDash([]); }
  const me = W.me.root.position; dot(me.x, me.z, "#F2C14E", 7); label(me.x, me.z + 1.2, "You", "#5A4210");
  g.font = "italic 12px Georgia, serif"; g.fillStyle = "#7A6243"; g.textAlign = "left"; g.fillText("Only what you have seen. Enemies show only while you can see them.", 10, r.height - 10);
}

// pause, the Roll, settings
function openPause() {
  W.setPaused(true);
  openPanel("pause", "Paused", `<div class="menu">
    <button class="pbtn" id="pRes">Resume</button><button class="pbtn" id="pRoll">The Roll</button>
    <button class="pbtn" id="pSet">Settings</button><button class="pbtn" id="pChr">Chronicle so far</button>
    <button class="pbtn" disabled>Save and quit (mock-up)</button></div><p class="note" style="text-align:center">Only this menu stops the war.</p>`, {
    full: true, after: p => {
      $("#pRes", p).onclick = closePanel;
      $("#pRoll", p).onclick = () => { W.setPaused(false); openRoll(); };
      $("#pSet", p).onclick = openSettings;
      $("#pChr", p).onclick = () => openPanel("pause", "Chronicle so far", `<p style="font-family:var(--serif);font-size:1.05em;line-height:1.5">Day one in Almara. The Varelas' youngest took up the old axe and walked to the square. ${S.loadsDone ? "By noon there was timber in the yard, " + S.loadsDone + (S.loadsDone > 1 ? " loads of it" : " load") + ", properly stacked." : "So far the axe has mostly been admired."}${S.dummyHits ? " The straw dummy will not forget this day." : ""}</p><p class="note">Written by the Rememberer at the end of each war (Phase 4).</p><div class="menu"><button class="pbtn" id="pBack">Back</button></div>`, { full: true, after: q => $("#pBack", q).onclick = openPause });
    }
  });
}
function openRoll() {
  const ban = c => `<svg class="ban" viewBox="0 0 18 22"><path d="${c === "a" ? "M1 1h16v20H1z" : "M1 1h16v20l-8-5-8 5z"}" fill="${c === "a" ? "#2F6FB3" : "#B33A2F"}" stroke="#2E2015"/></svg>`;
  const entries = S.log.length ? S.log.map(l => "<li>" + l + "</li>").join("") : "<li>Nothing written yet.</li>";
  openPanel("roll", "The Roll", `<div class="roll">
    <div class="town">${ban("a")}<b>Almara</b> (home): ${S.rep} · <b>${level(S.rep)}</b>. ${level(S.rep) === "Common" ? "Normal jobs and prices." : ""}</div>
    <div class="town">${ban("q")}<b>Quintara</b>: ${S.repQ} · <b>${level(S.repQ)}</b>. No weapons inside their walls.</div>
    <h3>Last entries</h3><ul>${entries}</ul>
    <h3>Nickname and deeds</h3><p>None yet. The Rememberer is watching.</p>
    <h3>Grudges</h3><p>None. Nobody has killed a Varela this war.</p></div>`);
}
function openSettings() {
  const ts = getComputedStyle(document.documentElement).getPropertyValue("--ts").trim();
  openPanel("pause", "Settings", `<div class="tabs"><button class="on">Display</button><button disabled>Controls</button><button disabled>Sound</button><button disabled>Game</button><button disabled>Language</button></div>
    <p><b>Text size</b></p><div class="tabs">${[["1", "Normal"], ["1.2", "Large"], ["1.4", "Larger"]].map(([v, n]) => `<button data-ts="${v}" class="${ts === v ? "on" : ""}">${n}</button>`).join("")}</div>
    <p><b>Meanings under Portuguese words</b></p><div class="tabs"><button data-pt="1" class="${showPT ? "on" : ""}">Show</button><button data-pt="0" class="${showPT ? "" : "on"}">Hide</button></div>
    <p><b>Chopping</b> (Controls)</p><div class="tabs"><button data-auto="0" class="${work.auto ? "" : "on"}">By hand</button><button data-auto="1" class="${work.auto ? "on" : ""}">Automatic</button></div>
    <p><b>Reduce flashing and motion</b></p><div class="tabs"><button data-calm="0" class="${calm ? "" : "on"}">Off</button><button data-calm="1" class="${calm ? "on" : ""}">On</button></div>
    <p class="note">Mock-up: only these work. The other tabs are listed in docs/07, section 3.10.</p><div class="menu"><button class="pbtn" id="pBack">Back</button></div>`, {
    full: true, after: p => {
      p.querySelectorAll("[data-ts]").forEach(b => b.onclick = () => { document.documentElement.style.setProperty("--ts", b.dataset.ts); openSettings(); });
      p.querySelectorAll("[data-pt]").forEach(b => b.onclick = () => { showPT = b.dataset.pt === "1"; openSettings(); });
      p.querySelectorAll("[data-auto]").forEach(b => b.onclick = () => { work.auto = b.dataset.auto === "1"; try { localStorage.setItem("thr-auto", work.auto ? "1" : "0"); } catch (e) {} openSettings(); });
      p.querySelectorAll("[data-calm]").forEach(b => b.onclick = () => { calm = b.dataset.calm === "1"; document.body.classList.toggle("calm", calm); openSettings(); });
      $("#pBack", p).onclick = openPause;
    }
  });
}
let showPT = true, calm = false;

$("#ordB").onclick = () => toggle("orders", openOrders);
$("#mapB").onclick = () => toggle("map", openMap);
$("#bagB").onclick = () => toggle("bag", openBag);
$("#pauseB").onclick = () => panelKind === "pause" ? closePanel() : openPause();
$("#repRow").onclick = () => toggle("roll", openRoll);
$("#foodRow").onclick = () => {
  if (S.fish) { S.fish--; S.food = Math.min(100, S.food + 80); float("+80 food", "good"); }
  else if (S.bread) { S.bread--; S.food = Math.min(100, S.food + 50); float("+50 food", "good"); }
  else float("No food on you", "good");
};
$("#track").onclick = () => { if (S.orders.length > 1) { const i = S.orders.findIndex(o => o.id === S.tracked); S.tracked = S.orders[(i + 1) % S.orders.length].id; } };
const viewB = $("#viewB");
viewB.onclick = () => { W.toggleView(); };
// zoom toggle (the director, 22/11: "so the character isn't so far away"): on = camera closer; shown in the isometric view only
const zoomB = $("#zoomB");
zoomB.onclick = () => W.setClose(!W.close);

// ---------- speech bubbles (at most 2) ----------
const GOSSIP = [
  ["Quintara moved the Stone again. Obviously."], ["Bom dia!", "good morning"], ["The Steward counts every log twice."],
  ["Olha! Smoke past the river.", "look!"], ["Bread's dearer since the bridge burned."], ["Vamos! The cart won't fill itself.", "let's go!"],
  ["Ora bolas, my back.", "oh, blast"], ["They say Quintara eats olives for breakfast."]
];
const bubbles = [];
function say(who, line) {
  if (bubbles.find(b => b.who === who)) return;
  if (bubbles.length >= 2) { bubbles[0].e.remove(); bubbles.shift(); }
  const e = el("div", "bub", line[0] + (line[1] && showPT ? "<small>(" + line[1] + ")</small>" : "")); world.appendChild(e);
  bubbles.push({ who, e, t: 3 });
}

// ---------- the Action button ----------
const actB = $("#actB"), actI = $("#actI"), actC = $("#actC");
let ctx = { k: "none" };
// only the work forest's pines can be chopped; the town's olives and oaks stay
function nearestTree(p) { let best = null, bd = 2.6; work.trees.forEach(t => { const d = dist(p, t); if (d < bd) { bd = d; best = t; } }); return best; }
function nearestWalker(p) {
  let best = null, bd = 2.4;
  W.walkers.forEach((w, i) => { if (w === smith) return; const d = dist(p, posOf(w)); if (d < bd) { bd = d; best = { w, i }; } });
  return best;
}
function context() {
  const p = W.me.root.position;
  if (S.weapon && dist(p, PL.dummy) < 3) return { k: "fight", icon: "sword", cap: S.target ? "Attacking" : "Attack" };
  if (smith && dist(p, posOf(smith)) < 2.4) return { k: "shop", icon: "talk", cap: "The Smith" };
  if (dist(p, PL.board) < 2.4) return { k: "board", icon: "scroll", cap: "Read the board" };
  const es = errandAt(); if (S.load > 0 && es && dist(p, es) < 3.2) return { k: "errand", icon: "sack", cap: "Deliver" };
  if (S.load > 0 && dist(p, PL.cart) < 3.2) return { k: "deliver", icon: "sack", cap: "Deliver" };
  if (dist(p, PL.home) < 2.2) return { k: "home", icon: "chest", cap: "Store all coin" };
  const w = nearestWalker(p); if (w) return { k: "talk", icon: "talk", cap: "Talk", w };
  const t = nearestTree(p);
  if (t && t.timber <= 0) return { k: "stump", icon: "axe", cap: "Stump" };
  if (t && !work.full) return { k: "chop", icon: "axe", cap: work.chopping === t ? (work.auto ? "Chopping" : work.style === "swing" ? "Hold, let go" : "On the beat") : "Chop", t };
  if (t) return { k: "full", icon: "sack", cap: "Sack full" };
  return { k: "none", icon: "hand", cap: "" };
}
let lastCtxKey = "";
function act() {
  const c = ctx;
  if (c.k === "chop") {
    // big swing by hand: the button's press and release do the work (swingPress, swingLift)
    if (work.style === "swing" && !work.auto) return;
    // the first press starts the work; while chopping, the Action button (and Space) taps the beat like the ring
    if (work.chopping === c.t) onWork(work.tap());
    else if (work.start(c.t)) { lastTree = c.t; W.face(c.t.x, c.t.z); }
  }
  else if (c.k === "stump") float("Nothing left: the next pine", "good");
  else if (c.k === "board") openBoard();
  else if (c.k === "shop") openShop();
  else if (c.k === "deliver") deliver();
  else if (c.k === "errand") deliverErrand();
  else if (c.k === "home") storeAll();
  else if (c.k === "talk") say(c.w.w, GOSSIP[Math.floor(Math.random() * GOSSIP.length)]);
  else if (c.k === "fight") { S.target = PL.dummy; }
  else if (c.k === "full") float("Sack full: to the cart", "good");
}
actB.onclick = act;
// big swing: hold the Action button (or Space), let go when the mark is in the gold
let swingHeld = false;
function swingPress() {
  const c = ctx;
  if (c.k !== "chop" || work.style !== "swing" || work.auto) return false;
  if (work.chopping !== c.t) { if (!work.start(c.t)) return false; lastTree = c.t; W.face(c.t.x, c.t.z); }
  swingHeld = true; work.hold(); // during the short recovery the hold starts as soon as it can (every frame)
  return true;
}
function swingLift() { if (!swingHeld) return; swingHeld = false; onWork(work.release()); }
actB.addEventListener("pointerdown", e => { if (swingPress()) e.preventDefault(); });
["pointerup", "pointercancel"].forEach(n => window.addEventListener(n, swingLift));
window.addEventListener("keyup", e => { if (e.key === " ") swingLift(); });

function deliver() {
  const ev = work.deliver(), paid = ev.find(e => e.k === "paid"); if (!paid) return;
  const loads = paid.full ? 1 : 0;
  S.load = 0; S.loadsDone++; addCoin(paid.coin); clink(); W.yardPile(Math.min(15, S.loadsDone));
  onWork(ev);
  const today = S.log.filter(l => l.endsWith("Delivered a full load")).length;
  if (loads >= 1 && today < 5) addRep(1, "Delivered a full load");
  const o = S.orders.find(x => x.id === "timber");
  if (o && loads >= 1) {
    o.have++;
    if (o.have >= o.need) {
      S.orders = S.orders.filter(x => x !== o); if (S.tracked === "timber") S.tracked = S.orders[0] ? S.orders[0].id : null;
      setTimeout(() => { addCoin(o.coin); addRep(o.rep, "Finished the Steward's timber order"); banner("feather", "The Hall remembers"); }, 500);
    }
  }
}

function deliverErrand() {
  const e = errands.active; if (!e || work.load < 1) return;
  const ev = errands.deliver(work.load), load = ev.find(x => x.k === "load"), done = ev.find(x => x.k === "done");
  if (!load) return;
  onWork(work.deliver(load.coin));
  S.load = 0; S.loadsDone++; addCoin(load.coin); clink();
  W.errandShow(e.site.id, e.haveT / e.needT);
  if (done) {
    work.stats.coin += done.coin;
    setTimeout(() => { addCoin(done.coin); addRep(done.rep, "Brought timber to the " + e.site.name); banner(e.site.i, e.site.done); buzz(40); }, 500);
  }
}
function onErrands(ev) {
  ev.forEach(x => {
    const s = x.e.site;
    if (x.k === "new") { W.errandShow(s.id, 0); banner(s.i, s.ask); thock(520, 0.2); }
    else if (x.k === "missed") { W.errandShow(s.id, 1); float("Too late: someone else saw to it", "good"); }
  });
}
const mmss = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");

// ---------- fight (mock, against the straw dummy) ----------
const braceB = $("#braceB"), strikeB = $("#strikeB");
function brace() { if (!S.weapon || S.braceCd > 0) return; S.braceCd = 6; S.braceOn = 2; float(S.shield ? "Braced" : "Braced (no shield: weaker)", "good"); }
function strike() { if (!S.weapon || S.strikeCd > 0) return; S.strikeCd = 8; S.windup = 1; if (!S.target && dist(W.me.root.position, PL.dummy) < 3) S.target = PL.dummy; }
braceB.onclick = brace; strikeB.onclick = strike;
function hitDummy(dmg) {
  const d = PL.dummy; d.hp = Math.max(0, d.hp - dmg); S.dummyHits++;
  const p = W.project(d.x, 2.4, d.z); float("−" + dmg, "", p);
  d.body.scaling.x = d.body.scaling.z = 1.15; setTimeout(() => d.body.scaling.x = d.body.scaling.z = 1, 120);
  if (d.hp <= 0) { S.target = null; float("The dummy has had enough", "good", p); setTimeout(() => d.hp = 60, 2500); }
}

// ---------- good-stroke ring ----------
const ringEl = $("#ring"), swingEl = $("#swing");
ringEl.addEventListener("pointerdown", e => {
  e.stopPropagation(); if (!work.chopping) return;
  onWork(work.tap()); // the ring closes on each stroke; a tap close to it (before or after) is a good stroke
});

// ---------- hint (one at a time, 8 words or fewer) and edge arrows (3 at most) ----------
function hintNow() {
  const o = S.orders.find(x => x.id === "timber");
  // the work comes first (P-WORK): a full sack, then learning the swing (or the beat), then the town's errand, then the board
  const es = errandAt();
  if (work.full) return es ? { i: "sack", t: "Bring it to the " + es.name, at: es } : { i: "sack", t: "Bring it to the yard", at: PL.cart };
  if (work.chopping && !work.auto && work.style === "swing" && !S.swung) return { i: "axe", t: "Hold Action, let go in the gold" };
  if (work.chopping && !S.goodStrokes && !work.auto && work.style === "beat") return { i: "axe", t: "Tap the ring on the beat" };
  const me = W.me.root.position, next = work.nearestStanding(me.x, me.z);
  if (es && !work.chopping) return work.load >= 1 ? { i: es.i, t: "Chop on, or to the " + es.name, at: es } : next ? { i: "axe", t: "Wood for the " + es.name, at: next } : null;
  if (!S.readBoard) return { i: "scroll", t: "Read the notice board", at: PL.board };
  if (felledT > 0 && !work.chopping) return next ? { i: "axe", t: "Tree down: on to the next", at: next } : { i: "axe", t: "The forest is all stumps" };
  if (!work.chopping && !work.full && next) return { i: "axe", t: work.load >= 1 ? "Chop on, or deliver" : "Chop a pine", at: next };
  if (!S.weapon && S.loadsDone >= 1) return { i: "talk", t: "The Smith sells spears", at: smith ? { x: posOf(smith).x, z: posOf(smith).z } : null };
  if (S.weapon && !S.dummyHits) return { i: "dummy", t: "Try the straw dummy", at: PL.dummy };
  if (S.coin >= 20 && W.timeName !== "day" && W.timeName !== "dawn") return { i: "chest", t: "Night: store your coin at home", at: PL.home };
  return null;
}
const edges = [];
function edgeArrows(list) {
  while (edges.length < list.length) { const e = el("div", "edge plate", '<span class="ar">' + ARROW + "</span><span class='ei'></span>"); world.appendChild(e); edges.push(e); }
  edges.forEach((e, k) => {
    const a = list[k]; if (!a) { e.hidden = true; return; }
    const p = W.project(a.x, 1, a.z), w = innerWidth, h = innerHeight, m = 46;
    const inView = p.vis && p.x > m && p.x < w - m && p.y > m + 50 && p.y < h - m;
    if (inView) { e.hidden = true; return; }
    let dx = p.x - w / 2, dy = p.y - h / 2; if (!p.vis) { dx = -dx; dy = -dy; }
    const k2 = Math.min((w / 2 - m) / Math.abs(dx || 1), (h / 2 - m - 30) / Math.abs(dy || 1));
    e.hidden = false; e.style.left = (w / 2 + dx * k2) + "px"; e.style.top = (h / 2 + dy * k2) + "px";
    e.classList.toggle("foe", !!a.foe);
    $(".ar", e).style.transform = "rotate(" + (Math.atan2(dy, dx) * 180 / Math.PI + 90) + "deg)";
    const ei = $(".ei", e); if (ei.dataset.i !== a.i) { ei.innerHTML = ic(a.i); ei.dataset.i = a.i; }
  });
}

// ---------- world-anchored labels (names, dummy health) ----------
const tags = {};
function tag(id, x, y, z, html, cls) {
  let t = tags[id]; if (!t) { t = tags[id] = el("div", "tag" + (cls ? " " + cls : "")); world.appendChild(t); }
  const p = W.project(x, y, z); t.hidden = !p.vis; t.style.left = p.x + "px"; t.style.top = p.y + "px"; if (t._h !== html) { t.innerHTML = html; t._h = html; }
}

// ---------- every frame ----------
let fpsT = 0, foodT = 0;
W.onFrame(dt => {
  const me = W.me.root.position;
  // hunger falls slowly (mock speed)
  foodT += dt; if (foodT > 6) { foodT = 0; S.food = Math.max(0, S.food - 1); }

  // chopping (P-WORK rules): walking away stops it; a full load makes you slower
  work.tool = S.toolLvl;
  if (work.chopping && dist(me, work.chopping) > 2.8) work.stop();
  onWork(work.step(dt));
  onErrands(errands.step(dt));
  if (swingHeld && !work.holding && work.chopping) work.hold();
  if (swingHeld && !work.chopping) swingHeld = false;
  S.load = Math.floor(work.load); S.loadMax = WORK.loadSize;
  W.speedMul = work.speedFactor;
  felledT = Math.max(0, felledT - dt);
  if (work.chopping && !work.auto && work.style === "beat") {
    const p = W.project(work.chopping.x, 2.2, work.chopping.z);
    ringEl.classList.add("on"); ringEl.style.left = p.x + "px"; ringEl.style.top = p.y + "px";
    ringEl.style.setProperty("--s", (2 - work.ringPhase).toFixed(3));
  } else ringEl.classList.remove("on");
  if (work.chopping && !work.auto && work.style === "swing") {
    const p = W.project(work.chopping.x, 2.0, work.chopping.z);
    swingEl.classList.add("on"); swingEl.style.left = (p.x + 56) + "px"; swingEl.style.top = p.y + "px";
    swingEl.style.setProperty("--m", work.meter.toFixed(3));
    swingEl.style.setProperty("--a", work.zoneAt.toFixed(3)); swingEl.style.setProperty("--w", work.zone.toFixed(3));
    swingEl.classList.toggle("held", work.holding);
  } else swingEl.classList.remove("on");

  // fight
  S.braceCd = Math.max(0, S.braceCd - dt); S.strikeCd = Math.max(0, S.strikeCd - dt); S.braceOn = Math.max(0, S.braceOn - dt);
  [[braceB, S.braceCd, 6], [strikeB, S.strikeCd, 8]].forEach(([b, cd, mx]) => {
    const was = b.dataset.cd === "1"; b.querySelector(".cd").style.setProperty("--p", (100 * cd / mx).toFixed(1) + "%"); b.dataset.cd = cd > 0 ? "1" : "0";
    if (was && cd <= 0) { b.classList.remove("ready"); void b.offsetWidth; b.classList.add("ready"); if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {} }
  });
  braceB.hidden = strikeB.hidden = !S.weapon;
  if (S.target && dist(me, PL.dummy) > 3.4) S.target = null;
  if (S.windup > 0) { S.windup -= dt; if (S.windup <= 0 && S.target) hitDummy(S.weapon === "Spear" ? 20 : 14); }
  if (S.target) { S.swingT += dt; if (S.swingT >= 1.2) { S.swingT = 0; hitDummy(S.weapon === "Spear" ? 10 : 7); } } else S.swingT = 0;
  PL.dummy.ring.isVisible = !!S.weapon && dist(me, PL.dummy) < 8;

  // Action button
  ctx = context();
  const key = ctx.k + ctx.icon + ctx.cap;
  if (key !== lastCtxKey) { lastCtxKey = key; actI.innerHTML = ic(ctx.icon); actC.textContent = ctx.cap; actB.classList.toggle("idle", ctx.k === "none"); actB.classList.toggle("hot", ctx.k !== "none"); }

  // panels close when you walk away from their source (the world keeps moving: Q15)
  if (panelSrc && dist(me, panelSrc) > 4.5) closePanel();
  if (panelKind === "map") drawMap();
  if (panelKind === "shop" || panelKind === "bag") { const pn = $("#purseN"); if (pn) pn.textContent = S.coin; }

  // bars
  $("#hpRow .bar i").style.width = S.hp + "%"; $("#hpN").textContent = S.hp;
  $("#foodRow .bar i").style.width = S.food + "%"; $("#foodN").textContent = S.food;
  $("#coinN").textContent = S.coin;
  $("#repL").textContent = level(S.rep); $("#repRow .bar i").style.width = ((S.rep + 100) / 2) + "%";
  const o = S.orders.find(x => x.id === S.tracked), tr = $("#track");
  const ea = errands.active, ep = errands.progress;
  tr.classList.toggle("on", !!o || !!ea);
  tr.classList.toggle("late", !!ea && ea.left < 20);
  if (ea) { const f = n => (Math.round(n * 10) / 10).toString(); const h = ic(ea.site.i) + "<span>" + ea.site.name[0].toUpperCase() + ea.site.name.slice(1) + " " + f(ep.have) + "/" + f(ep.need) + " · " + mmss(ea.left) + "</span>"; if (tr._h !== h) { tr.innerHTML = h; tr._h = h; } }
  else if (o) { const h = ic(o.icon) + "<span>" + (o.id === "timber" ? "Timber " + o.have + "/" + o.need + " · yard" : o.id === "gate" ? "North gate · tonight" : o.text) + (S.orders.length > 1 ? " ⇄" : "") + "</span>"; if (tr._h !== h) { tr.innerHTML = h; tr._h = h; } }
  const tn = W.timeName, dI = (tn === "night") ? "moon" : "sun";
  const dT = "Day 1 · " + tn[0].toUpperCase() + tn.slice(1);
  if ($("#dialT").textContent !== dT) { $("#dialT").textContent = dT; $("#dialI").innerHTML = ic(dI); }
  $("#dot").classList.toggle("on", W.view === "fp");
  zoomB.hidden = W.view === "fp";
  const zi = W.close ? "zoomOut" : "zoomIn";
  if (zoomB.dataset.i !== zi) { zoomB.innerHTML = ic(zi); zoomB.dataset.i = zi; zoomB.classList.toggle("on", W.close); zoomB.setAttribute("aria-pressed", String(W.close)); zoomB.setAttribute("aria-label", W.close ? "Zoom out" : "Zoom in"); }
  viewB.classList.toggle("fp", W.view === "fp"); const vi = W.view === "fp" ? "iso" : "eye";
  if (viewB.dataset.i !== vi) { viewB.innerHTML = ic(vi); viewB.dataset.i = vi; viewB.setAttribute("aria-label", W.view === "fp" ? "Switch to isometric view" : "Switch to first-person view"); }

  // hint
  const hn = panelKind ? null : hintNow(), hEl = $("#hint");
  hEl.classList.toggle("on", !!hn);
  if (hn) { const h = ic(hn.i) + "<span>" + hn.t + "</span>"; if (hEl._h !== h) { hEl.innerHTML = h; hEl._h = h; } }

  // edge arrows: tracked order, hint target, danger at night, home at night (3 at most)
  const arrows = [];
  if (ea) arrows.push({ x: ea.site.x, z: ea.site.z, i: ea.site.i });
  if (tn === "night") arrows.push({ x: -45, z: 10, i: "paw", foe: true });
  if (o && o.id === "timber") arrows.push({ ...PL.cart, i: "axe" });
  if (o && o.id === "gate") arrows.push({ ...PL.gate, i: "tower" });
  if (hn && hn.at && !(o && o.id === "timber" && hn.at === PL.cart) && !(ea && hn.at === ea.site)) arrows.push({ ...hn.at, i: hn.i });
  if ((tn === "night" || tn === "dusk") && arrows.length < 3 && dist(me, PL.home) > 6) arrows.push({ ...PL.home, i: "house" });
  edgeArrows(arrows.slice(0, 3));

  // bubbles follow heads; villagers sometimes speak on their own
  for (let k = bubbles.length - 1; k >= 0; k--) {
    const b = bubbles[k]; b.t -= dt; const p = posOf(b.who), s = W.project(p.x, 2.3, p.z);
    b.e.style.left = s.x + "px"; b.e.style.top = s.y + "px"; b.e.hidden = !s.vis;
    if (b.t <= 0) { b.e.remove(); bubbles.splice(k, 1); }
  }
  if (!panelKind && Math.random() < dt * 0.06) { const w = W.walkers[Math.floor(Math.random() * W.walkers.length)]; if (w !== smith && dist(me, posOf(w)) < 9) say(w, GOSSIP[Math.floor(Math.random() * GOSSIP.length)]); }

  // labels: the Smith, the dummy's health when armed
  if (smith) { const p = posOf(smith); tag("smith", p.x, 2.35, p.z, ic("talk").replace('class="ic"', 'class="ic" style="width:12px;height:12px;display:inline;vertical-align:-2px"') + " Smith"); }
  if (S.weapon && dist(me, PL.dummy) < 8) tag("dummy", PL.dummy.x, 2.5, PL.dummy.z, "Straw dummy<span class='hb'><i style='width:" + (100 * PL.dummy.hp / 60) + "%'></i></span>", "foe");
  else if (tags.dummy) tags.dummy.hidden = true;

  // banner timer, test drawer fps
  if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) $("#banner").classList.remove("on"); }
  fpsT += dt; if (fpsT > 0.5) { fpsT = 0; if (drawer.classList.contains("on")) { fpsL.textContent = W.fps().toFixed(0) + " fps"; workL.textContent = workLine(); } }
});
})();
