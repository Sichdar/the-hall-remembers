import { describe, expect, it } from "vitest";
import { WORK, Work, type WorkEvent } from "../src/sim/work";

// P-WORK rules (docs/02 section 2.2, docs/05 section 2.3, docs/11 section 3).
const one = () => new Work([{ x: 0, z: 0 }, { x: 10, z: 0 }]);
/** Runs time in 0.05 s steps; `tapAt` taps when this many seconds are left before each stroke (null = no taps). */
function chop(w: Work, seconds: number, tapAt: number | null = null) {
  const out = [];
  for (let t = 0; t < seconds - 1e-9; t += 0.05) {
    if (tapAt !== null && w.chopping && Math.abs(WORK.beat - w.phase - tapAt) < 0.025) out.push(...w.tap());
    out.push(...w.step(0.05));
  }
  return out;
}

describe("chopping", () => {
  it("fills a load in about 20 seconds with no good strokes", () => {
    const w = one(); w.start(w.trees[0]!);
    chop(w, 19.4); expect(w.full).toBe(false);
    chop(w, 2); expect(w.full).toBe(true); // 14 strokes of 1.5 s
    expect(w.chopping).toBeNull(); // a full sack stops the work
  });

  it("a tap on the beat makes the stroke 50% bigger", () => {
    const w = one(); w.start(w.trees[0]!);
    const ev = chop(w, 1.5, 0.1);
    const got = ev.filter(e => e.k === "stroke" || e.k === "good").reduce((a, e) => a + ("timber" in e ? e.timber : 0), 0);
    expect(got).toBeCloseTo(WORK.loadSize / (WORK.fillTime / WORK.beat) * 1.5, 5);
    expect(w.stats.good).toBe(1);
  });

  it("a tap just after the stroke still counts", () => {
    const w = one(); w.start(w.trees[0]!);
    w.step(1.55); // stroke landed 0.05 s ago
    expect(w.tap().some(e => e.k === "good")).toBe(true);
    expect(w.tap().some(e => e.k === "good")).toBe(false); // the same stroke can't be good twice
  });

  it("a tap far from the beat is a miss and breaks the streak", () => {
    const w = one(); w.start(w.trees[0]!);
    chop(w, 3, 0.1); expect(w.streak).toBe(2);
    w.step(0.7);
    expect(w.tap()).toEqual([{ k: "miss" }]);
    expect(w.streak).toBe(0);
  });

  it("all good strokes fill a load in about 13 seconds", () => {
    const w = one(); w.start(w.trees[0]!);
    chop(w, 13.6, 0.1);
    expect(w.full).toBe(true);
  });

  it("automatic mode: normal speed, taps do nothing, no strokes counted for the pass mark", () => {
    const w = one(); w.auto = true; w.start(w.trees[0]!);
    chop(w, 15, 0.1);
    expect(w.stats.good).toBe(0); expect(w.stats.strokes).toBe(0);
    expect(w.full).toBe(false);
    expect(w.stats.autoChopTime).toBeCloseTo(15, 5);
  });
});

describe("the land runs out", () => {
  it("a tree gives 3 loads, then it's a stump and can't be chopped", () => {
    const w = one(); const t = w.trees[0]!;
    let felled = 0;
    for (let n = 0; n < 3; n++) {
      expect(w.start(t)).toBe(true);
      felled += chop(w, 25).filter(e => e.k === "felled").length;
      expect(w.full).toBe(true); w.deliver();
    }
    expect(felled).toBe(1); expect(t.timber).toBe(0);
    expect(w.start(t)).toBe(false);
    expect(w.nearestStanding(0, 0)).toBe(w.trees[1]);
  });
});

describe("carry and pay", () => {
  it("a full load slows you by 20%, a half load by 10%", () => {
    const w = one(); expect(w.speedFactor).toBe(1);
    w.load = 5; expect(w.speedFactor).toBeCloseTo(0.9);
    w.load = 10; expect(w.speedFactor).toBeCloseTo(0.8);
  });

  it("a full load pays 2 coin; a part load pays its share, at least 1", () => {
    const w = one();
    w.load = 10; expect(w.deliver()).toEqual([{ k: "paid", coin: 2, full: true }]);
    w.load = 3; expect(w.deliver()).toEqual([{ k: "paid", coin: 1, full: false }]);
    w.load = 0.5; expect(w.deliver()).toEqual([]); // less than one log: nothing to deliver
    expect(w.stats.coin).toBe(3); expect(w.stats.fullLoads).toBe(1);
  });

  it("15 full loads make you Skilled: faster and a wider beat window", () => {
    const w = one(); const base = w.strokeTimber, win = w.window;
    let ev: WorkEvent[] = [];
    for (let n = 0; n < 15; n++) { w.load = 10; ev = w.deliver(); }
    expect(ev).toContainEqual({ k: "rank", name: "Skilled" });
    expect(w.strokeTimber).toBeCloseTo(base * 1.15);
    expect(w.window).toBeCloseTo(win * 1.2);
  });

  it("Master pays 1 coin more per full load", () => {
    const w = one(); w.stats.fullLoads = 40; w.load = 10;
    expect(w.deliver()).toEqual([{ k: "paid", coin: 3, full: true }]);
  });
});

describe("the pass mark", () => {
  it("counts the share of good strokes only after 3 minutes of play", () => {
    const w = one();
    w.step(170); // walking about
    w.start(w.trees[0]!);
    chop(w, 20, 0.1);
    expect(w.stats.strokesLate).toBeGreaterThan(0);
    expect(w.stats.strokesLate).toBeLessThan(w.stats.strokes);
    expect(w.lateShare).toBe(1);
    expect(w.summary("test")).toContain("after 3 min");
  });
});
