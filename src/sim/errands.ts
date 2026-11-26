// P-WORK 2, "work as errands" (docs/11, section 3): less chopping for its own sake, more carrying timber to where
// the town needs it right now, so the "why" carries the fun. One errand at a time, with a place, a need and a time.
// Plain rules with no 3D: the street draws what this says, and the tests check it.

export const ERRANDS = {
  /** Seconds before the first errand, and between one errand ending and the next. */
  firstAfter: 8,
  gap: 12,
  /** Loads one errand asks for: from 2 to 3. */
  need: [2, 3],
  /** Seconds the town waits: this much per load asked, plus the extra. */
  perLoad: 40,
  extra: 25,
  /** Coin for each full load brought to an errand (the timber yard pays 2), and the bonus per load when it's done. */
  payPerLoad: 3,
  bonusPerLoad: 2,
  /** Reputation when an errand is done. A missed one costs nothing: someone else sees to it. */
  rep: 2,
  /** Timber in one full load (the same as WORK.loadSize). */
  loadSize: 10,
} as const;

export interface Site {
  readonly id: string;
  readonly x: number;
  readonly z: number;
  /** Shown on the screen: the place, what the town says, what it says when it's done. */
  readonly name: string;
  readonly ask: string;
  readonly done: string;
}

export interface Errand {
  readonly site: Site;
  /** Timber asked for, and brought so far. */
  readonly needT: number;
  haveT: number;
  /** Seconds left. */
  left: number;
}

export type ErrandEvent =
  | { k: "new"; e: Errand }
  | { k: "load"; e: Errand; coin: number }
  | { k: "done"; e: Errand; coin: number; rep: number }
  | { k: "missed"; e: Errand };

export interface ErrandStats { asked: number; done: number; missed: number; loads: number; coin: number }

export class Errands {
  active: Errand | null = null;
  /** Seconds until the next errand is asked for. */
  wait: number = ERRANDS.firstAfter;
  /** Off: no errands are asked for (the Test drawer switch); one already running is dropped quietly. */
  on = true;
  readonly stats: ErrandStats = { asked: 0, done: 0, missed: 0, loads: 0, coin: 0 };
  private last: Site | null = null;

  /** `rnd` picks the place and the size (0 to 1); tests pass their own. */
  constructor(readonly sites: readonly Site[], private readonly rnd: () => number = Math.random) {}

  /** Loads still to bring, and loads asked for (for the screen: "1.5/3"). */
  get progress() { const e = this.active; return e ? { have: e.haveT / ERRANDS.loadSize, need: e.needT / ERRANDS.loadSize } : null; }

  setOn(on: boolean) { this.on = on; if (!on) { this.active = null; this.wait = ERRANDS.firstAfter; } }

  step(dt: number): ErrandEvent[] {
    const ev: ErrandEvent[] = [];
    if (!this.on) return ev;
    if (this.active) {
      this.active.left -= dt;
      if (this.active.left <= 0) { this.stats.missed++; ev.push({ k: "missed", e: this.active }); this.active = null; this.wait = ERRANDS.gap; }
      return ev;
    }
    this.wait -= dt;
    if (this.wait <= 0) ev.push({ k: "new", e: this.ask() });
    return ev;
  }

  /** Bring `timber` to the errand's place. Returns what it was worth; the caller empties your sack only if it was taken. */
  deliver(timber: number): ErrandEvent[] {
    const e = this.active;
    if (!e || timber < 1) return [];
    const ev: ErrandEvent[] = [];
    const share = timber / ERRANDS.loadSize, coin = Math.max(1, Math.round(ERRANDS.payPerLoad * share));
    e.haveT = Math.min(e.needT, e.haveT + timber);
    this.stats.loads += share; this.stats.coin += coin;
    ev.push({ k: "load", e, coin });
    if (e.haveT >= e.needT - 1e-9) {
      const bonus = ERRANDS.bonusPerLoad * (e.needT / ERRANDS.loadSize);
      this.stats.done++; this.stats.coin += bonus;
      ev.push({ k: "done", e, coin: bonus, rep: ERRANDS.rep });
      this.active = null; this.wait = ERRANDS.gap;
    }
    return ev;
  }

  /** A few words for the playtest summary. */
  summaryLine(): string {
    const s = this.stats;
    return `Errands asked ${s.asked}, done ${s.done}, missed ${s.missed}; loads carried to them ${Math.round(s.loads * 10) / 10}, coin from them ${s.coin}`;
  }

  private ask(): Errand {
    // never the same place twice in a row, so the walks change
    const pool = this.sites.length > 1 ? this.sites.filter(s => s !== this.last) : this.sites;
    const site = pool[Math.min(pool.length - 1, Math.floor(this.rnd() * pool.length))]!;
    const [lo, hi] = ERRANDS.need, loads = lo + Math.min(hi - lo, Math.floor(this.rnd() * (hi - lo + 1)));
    const e: Errand = { site, needT: loads * ERRANDS.loadSize, haveT: 0, left: loads * ERRANDS.perLoad + ERRANDS.extra };
    this.active = e; this.last = site; this.stats.asked++;
    return e;
  }
}
