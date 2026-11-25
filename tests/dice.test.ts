import { describe, expect, it } from "vitest";
import { Dice, warDice } from "../src/sim/dice";

describe("dice (docs/08, section 5.5)", () => {
  it("the same seed always rolls the same numbers", () => {
    const a = new Dice(42), b = new Dice(42);
    const ra = Array.from({ length: 50 }, () => a.next());
    const rb = Array.from({ length: 50 }, () => b.next());
    expect(ra).toEqual(rb);
  });

  it("different seeds roll differently", () => {
    expect(new Dice(1).next()).not.toEqual(new Dice(2).next());
  });

  it("matches the mock-up street's random numbers, so the street can move to it unchanged", () => {
    // the street's own function, copied from src/mockup/street.js
    let seed = 20261121;
    const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const d = new Dice(20261121);
    for (let i = 0; i < 100; i++) expect(d.next()).toBe(rnd());
  });

  it("stays inside its ranges", () => {
    const d = new Dice(7);
    for (let i = 0; i < 2000; i++) {
      const x = d.next(), r = d.range(-3, 5), n = d.int(6);
      expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(1);
      expect(r).toBeGreaterThanOrEqual(-3); expect(r).toBeLessThan(5);
      expect(Number.isInteger(n)).toBe(true); expect(n).toBeGreaterThanOrEqual(0); expect(n).toBeLessThan(6);
    }
  });

  it("every face of a six-sided die comes up about equally often", () => {
    const d = new Dice(2026), counts = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 60000; i++) counts[d.int(6)]!++;
    for (const c of counts) expect(Math.abs(c - 10000)).toBeLessThan(500);
  });

  it("refuses impossible rolls instead of returning nonsense", () => {
    const d = new Dice(1);
    expect(() => d.int(0)).toThrow(RangeError);
    expect(() => d.int(2.5)).toThrow(RangeError);
    expect(() => d.pick([])).toThrow(RangeError);
  });

  it("a saved roll carries on exactly where it stopped", () => {
    const d = new Dice(99);
    d.next(); d.next();
    const copy = Dice.load(d.save());
    expect(copy.next()).toBe(d.next());
  });

  it("drawing names never shifts combat (separate streams)", () => {
    const quiet = warDice(123), busy = warDice(123);
    for (let i = 0; i < 10; i++) busy.names.next();
    expect(busy.combat.next()).toBe(quiet.combat.next());
  });

  it("each stream rolls its own numbers", () => {
    const w = warDice(5);
    const firsts = [w.map.next(), w.ai.next(), w.combat.next(), w.names.next()];
    expect(new Set(firsts).size).toBe(4);
  });
});
