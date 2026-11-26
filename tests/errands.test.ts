import { describe, expect, it } from "vitest";
import { ERRANDS, Errands, type Site } from "../src/sim/errands";

// P-WORK 2: work as errands (docs/11, section 3).
const site = (id: string): Site => ({ id, x: 0, z: 0, name: id, ask: "Timber for the " + id, done: "Done: " + id });
const SITES = [site("palisade"), site("forge"), site("oven")];
/** Errands whose dice always say `r`: r = 0 picks the first place and 2 loads. */
const make = (r = 0) => new Errands(SITES, () => r);

describe("errands", () => {
  it("the first errand is asked for after 8 seconds: a place, 2 loads, 105 seconds", () => {
    const x = make();
    expect(x.step(7.9)).toEqual([]);
    const ev = x.step(0.2);
    expect(ev).toHaveLength(1);
    expect(ev[0]).toMatchObject({ k: "new" });
    expect(x.active).toMatchObject({ site: SITES[0], needT: 20, haveT: 0, left: 2 * ERRANDS.perLoad + ERRANDS.extra });
  });

  it("each load pays 3 coin; the last one finishes it with a bonus and reputation", () => {
    const x = make(); x.step(9);
    expect(x.deliver(10)).toEqual([{ k: "load", e: expect.anything(), coin: 3 }]);
    expect(x.progress).toEqual({ have: 1, need: 2 });
    const ev = x.deliver(10);
    expect(ev.map(e => e.k)).toEqual(["load", "done"]);
    expect(ev[1]).toMatchObject({ coin: 4, rep: 2 });
    expect(x.active).toBeNull();
    expect(x.stats).toMatchObject({ asked: 1, done: 1, coin: 10, loads: 2 });
  });

  it("a part load counts its share and pays at least 1 coin; nothing is taken with no errand", () => {
    const x = make();
    expect(x.deliver(10)).toEqual([]);
    x.step(9);
    expect(x.deliver(3)[0]).toMatchObject({ coin: 1 });
    expect(x.progress!.have).toBeCloseTo(0.3);
  });

  it("an errand not finished in time is missed, with no penalty; the next comes 12 seconds later", () => {
    const x = make(); x.step(9);
    const ev = x.step(200);
    expect(ev).toEqual([{ k: "missed", e: expect.anything() }]);
    expect(x.active).toBeNull();
    expect(x.step(11.9)).toEqual([]);
    expect(x.step(0.2)[0]).toMatchObject({ k: "new" });
    expect(x.stats).toMatchObject({ asked: 2, missed: 1 });
  });

  it("never asks at the same place twice in a row", () => {
    const x = make();
    const seen: string[] = [];
    for (let n = 0; n < 4; n++) { x.step(30); seen.push(x.active!.site.id); x.deliver(30); }
    for (let n = 1; n < seen.length; n++) expect(seen[n]).not.toBe(seen[n - 1]);
  });

  it("3 loads when the dice say so, with 145 seconds", () => {
    const x = make(0.99); x.step(9);
    expect(x.active).toMatchObject({ needT: 30, left: 3 * ERRANDS.perLoad + ERRANDS.extra });
  });

  it("switched off: none are asked, and a running one is dropped", () => {
    const x = make(); x.step(9); expect(x.active).not.toBeNull();
    x.setOn(false);
    expect(x.active).toBeNull();
    expect(x.step(100)).toEqual([]);
    x.setOn(true);
    expect(x.step(8.1)[0]).toMatchObject({ k: "new" });
  });

  it("the summary line counts asked, done and missed", () => {
    const x = make(); x.step(9); x.deliver(20);
    expect(x.summaryLine()).toBe("Errands asked 1, done 1, missed 0; loads carried to them 2, coin from them 10");
  });
});
