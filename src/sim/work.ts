// P-WORK, chop and carry (docs/11, section 3; rules from docs/02, section 2.2, and docs/05, section 2.3).
// Plain rules with no 3D and no web page: the street draws what this says, and the tests check it.
// Every number the playtest may change sits in WORK, so a change is one line.

export const WORK = {
  /** Seconds between two axe strokes: the ring closes on each stroke. */
  beat: 1.5,
  /** Timber in one full load. */
  loadSize: 10,
  /** Seconds to fill a load with no good strokes (docs/02: 20 s). */
  fillTime: 20,
  /** A good stroke gives this much more timber than a normal one (+50%). */
  goodBonus: 0.5,
  /** A tap this many seconds before or after the stroke counts as on the beat. */
  window: 0.3,
  /** Full loads one tree holds before it is a stump. */
  loadsPerTree: 3,
  /** Coin for one full load at the timber yard. */
  payPerLoad: 2,
  /** A full load slows you by this much; a half load by half of it (P-WORK 2: 0.1, was 0.2). */
  carrySlow: 0.1,
  /**
   * P-WORK 2, "fewer, bigger moments" (docs/11, section 3): hold the Action button, a meter rises and falls,
   * let go inside the gold zone. Few swings, each one counts. Timber per swing: perfect, good (near the zone), weak.
   */
  swing: {
    /** Seconds for the meter to rise from empty to full; it then falls back, so waiting is never a fail. */
    fill: 0.9,
    /** Width of the gold zone, as a share of the meter. */
    zone: 0.16,
    /** Where the gold zone may start (a new place each swing). */
    zoneFrom: [0.5, 0.78],
    /** Letting go this close outside the zone is still good. */
    near: 0.1,
    perfect: 4,
    good: 2.5,
    weak: 1,
    /** Seconds after a swing before the next one can start. */
    recover: 0.4,
    /** Automatic mode: one good swing this often. */
    autoEvery: 1.6,
  },
  /** Practice ranks (docs/05, section 2.3): full loads needed, extra speed, wider beat window, extra pay. */
  ranks: [
    { name: "Novice", at: 0, speed: 0, window: 0, pay: 0 },
    { name: "Skilled", at: 15, speed: 0.15, window: 0.2, pay: 0 },
    { name: "Master", at: 40, speed: 0.3, window: 0.4, pay: 1 },
  ],
  /** Extra chopping speed from the axe: old axe, iron axe, master's axe. */
  tools: [0, 0.25, 0.5],
  /** The pass mark counts strokes from this many seconds of play onwards (docs/11: "after 3 minutes"). */
  warmUp: 180,
} as const;

export interface Tree {
  readonly id: number;
  readonly x: number;
  readonly z: number;
  /** Timber still in the tree; 0 = a stump. */
  timber: number;
}

export type WorkEvent =
  | { k: "stroke"; timber: number }
  | { k: "good"; timber: number; streak: number }
  | { k: "miss" }
  | { k: "full" }
  | { k: "felled"; tree: Tree }
  | { k: "paid"; coin: number; full: boolean }
  | { k: "rank"; name: string }
  | { k: "swing"; q: SwingQuality; timber: number; streak: number };

export type SwingQuality = "perfect" | "good" | "weak";
/** "swing": one big hold-and-release per swing (P-WORK 2); "beat": the first test's ring on the beat. */
export type ChopStyle = "swing" | "beat";

export interface WorkStats {
  playTime: number;
  chopTime: number;
  autoChopTime: number;
  strokes: number;
  good: number;
  /** Strokes and good strokes from the warm-up onwards: the pass mark's share. */
  strokesLate: number;
  goodLate: number;
  bestStreak: number;
  fullLoads: number;
  coin: number;
  felled: number;
  /** Big swings you made (automatic ones not counted), by quality; "late" = from the warm-up on. */
  swings: number;
  perfect: number;
  goodSwings: number;
  weak: number;
  swingsLate: number;
  perfectLate: number;
}

const perStroke = () => WORK.loadSize / (WORK.fillTime / WORK.beat);

export class Work {
  readonly trees: Tree[];
  /** Timber on your back. */
  load = 0;
  /** The tree you are chopping, or null. */
  chopping: Tree | null = null;
  /** Automatic good strokes (docs/03): normal speed, no ring, no taps. */
  auto = false;
  /** 0 old axe, 1 iron axe, 2 master's axe. */
  tool = 0;
  /** How you chop: the big swing (default since P-WORK 2) or the beat ring. */
  style: ChopStyle = "swing";
  /** Seconds since the last stroke. */
  phase = 0;
  streak = 0;
  /** Big swing: the button is held; seconds held; seconds left before the next swing; where the gold zone starts. */
  holding = false;
  holdT = 0;
  recoverT = 0;
  zoneAt: number = WORK.swing.zoneFrom[0];
  private autoT = 0;
  readonly stats: WorkStats = {
    playTime: 0, chopTime: 0, autoChopTime: 0, strokes: 0, good: 0, strokesLate: 0, goodLate: 0,
    bestStreak: 0, fullLoads: 0, coin: 0, felled: 0,
    swings: 0, perfect: 0, goodSwings: 0, weak: 0, swingsLate: 0, perfectLate: 0,
  };
  /** Number of the stroke a good tap was last given to, so one stroke can't be good twice. */
  private goodFor = -1;
  private strokeNo = 0;
  /** Number of the last good stroke, for the streak. */
  private lastGood = -2;

  /** `rnd` places the gold zone (0 to 1); tests pass their own, the game uses Math.random (looks only, no war rules). */
  constructor(spots: readonly { x: number; z: number }[], private readonly rnd: () => number = Math.random) {
    this.trees = spots.map((s, id) => ({ id, x: s.x, z: s.z, timber: WORK.loadsPerTree * WORK.loadSize }));
    this.newZone();
  }

  get rank() {
    let r: (typeof WORK.ranks)[number] = WORK.ranks[0];
    for (const k of WORK.ranks) if (this.stats.fullLoads >= k.at) r = k;
    return r;
  }
  get full() { return this.load >= WORK.loadSize - 1e-9; }
  /** How fast you walk now, 1 = empty-handed. */
  get speedFactor() { return 1 - WORK.carrySlow * Math.min(1, this.load / WORK.loadSize); }
  /** Seconds either side of a stroke that count as on the beat. */
  get window() { return WORK.window * (1 + this.rank.window); }
  /** Timber from one normal stroke with your rank and axe. */
  get strokeTimber() { return perStroke() * (1 + this.rank.speed + WORK.tools[this.tool]!); }
  /** Where the ring is: 0 just after a stroke, 1 at the next stroke. */
  get ringPhase() { return this.phase / WORK.beat; }
  /** Big swing: where the meter is now, 0 to 1. It rises in `fill` seconds, then falls, then rises again. */
  get meter() {
    const k = (this.holdT / WORK.swing.fill) % 2;
    return k <= 1 ? k : 2 - k;
  }
  /** Width of the gold zone with your rank (the beat window's rank bonus widens it the same way). */
  get zone() { return WORK.swing.zone * (1 + this.rank.window); }

  /** Start chopping a standing tree. Returns false if it can't be done (stump, sack full). */
  start(tree: Tree): boolean {
    if (tree.timber <= 0 || this.full) return false;
    if (this.chopping !== tree) {
      this.chopping = tree; this.phase = 0; this.streak = 0; this.goodFor = -1; this.lastGood = -2;
      this.holding = false; this.holdT = 0; this.autoT = 0;
    }
    return true;
  }
  stop() { this.chopping = null; this.streak = 0; this.holding = false; this.holdT = 0; }

  /** Time moves on by dt seconds. */
  step(dt: number): WorkEvent[] {
    const ev: WorkEvent[] = [];
    this.stats.playTime += dt;
    this.recoverT = Math.max(0, this.recoverT - dt);
    if (!this.chopping) return ev;
    this.stats.chopTime += dt; if (this.auto) this.stats.autoChopTime += dt;
    if (this.style === "swing") {
      if (this.auto) {
        this.autoT += dt;
        while (this.chopping && this.autoT >= WORK.swing.autoEvery) { this.autoT -= WORK.swing.autoEvery; this.land("good", ev); }
      } else if (this.holding) this.holdT += dt;
      return ev;
    }
    this.phase += dt;
    while (this.chopping && this.phase >= WORK.beat) {
      this.phase -= WORK.beat;
      this.stroke(ev);
    }
    return ev;
  }

  /** Big swing: the Action button goes down. Returns false if a swing can't start now. */
  hold(): boolean {
    if (!this.chopping || this.style !== "swing" || this.auto || this.holding || this.recoverT > 0) return false;
    this.holding = true; this.holdT = 0;
    return true;
  }

  /** Big swing: the Action button comes up. Inside the gold zone = perfect, close to it = good, else weak. */
  release(): WorkEvent[] {
    const ev: WorkEvent[] = [];
    if (!this.holding) return ev;
    this.holding = false;
    const m = this.meter, a = this.zoneAt, b = Math.min(1, a + this.zone);
    const off = m < a ? a - m : m > b ? m - b : 0;
    this.holdT = 0;
    if (!this.chopping) return ev;
    this.land(off === 0 ? "perfect" : off <= WORK.swing.near ? "good" : "weak", ev);
    return ev;
  }

  private land(q: SwingQuality, ev: WorkEvent[]) {
    const s = this.stats, late = s.playTime >= WORK.warmUp;
    if (!this.auto) {
      s.swings++; if (late) s.swingsLate++;
      if (q === "perfect") { s.perfect++; if (late) s.perfectLate++; } else if (q === "good") s.goodSwings++; else s.weak++;
    }
    this.streak = q === "perfect" ? this.streak + 1 : 0;
    if (q === "perfect") s.bestStreak = Math.max(s.bestStreak, this.streak);
    const got = this.take(WORK.swing[q] * (1 + this.rank.speed + WORK.tools[this.tool]!));
    ev.push({ k: "swing", q, timber: got, streak: this.streak });
    this.recoverT = WORK.swing.recover;
    this.newZone();
    this.after(ev);
  }

  private newZone() {
    const [lo, hi] = WORK.swing.zoneFrom;
    this.zoneAt = lo + (hi - lo) * this.rnd();
  }

  /** You tapped the ring. A tap close to a stroke (before or after) makes that stroke good. */
  tap(): WorkEvent[] {
    const ev: WorkEvent[] = [];
    if (!this.chopping || this.auto || this.style !== "beat") return ev;
    const before = WORK.beat - this.phase, after = this.phase;
    // which stroke the tap belongs to: the one about to land, or the one that just landed
    const target = before <= after ? this.strokeNo + 1 : this.strokeNo;
    const off = Math.min(before, after);
    if (off > this.window || target === 0) { this.streak = 0; ev.push({ k: "miss" }); return ev; }
    if (this.goodFor === target) return ev; // a second tap on the same stroke: nothing
    this.goodFor = target;
    if (target === this.strokeNo) this.giveGood(ev); // the stroke has landed: add its bonus now
    // otherwise the bonus is added when that stroke lands (stroke() checks goodFor)
    return ev;
  }

  /** Drop your load at the timber yard, or (with `coin`) wherever an errand pays that much for it. */
  deliver(coinFor?: number): WorkEvent[] {
    const ev: WorkEvent[] = [];
    if (this.load < 1) return ev;
    const full = this.full, before = this.rank.name;
    const coin = coinFor ?? (full ? WORK.payPerLoad + this.rank.pay : Math.max(1, Math.round(WORK.payPerLoad * this.load / WORK.loadSize)));
    this.load = 0;
    if (full) this.stats.fullLoads++;
    this.stats.coin += coin;
    ev.push({ k: "paid", coin, full });
    if (this.rank.name !== before) ev.push({ k: "rank", name: this.rank.name });
    return ev;
  }

  nearestStanding(x: number, z: number): Tree | null {
    let best: Tree | null = null, bd = Infinity;
    for (const t of this.trees) {
      if (t.timber <= 0) continue;
      const d = Math.hypot(t.x - x, t.z - z);
      if (d < bd) { bd = d; best = t; }
    }
    return best;
  }

  /** Share of good strokes from the warm-up on (null before any): docs/11's "at least half after 3 minutes". */
  get lateShare(): number | null { return this.stats.strokesLate ? this.stats.goodLate / this.stats.strokesLate : null; }

  /** Share of perfect swings from the warm-up on (null before any): the big swing's version of the pass mark. */
  get latePerfect(): number | null { return this.stats.swingsLate ? this.stats.perfectLate / this.stats.swingsLate : null; }

  /** A few lines of plain text the director can paste into a message (docs/11, section 5). Nothing is sent. */
  summary(version: string): string {
    const s = this.stats, pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) + "%" : "-");
    const mins = (t: number) => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
    const lines = [
      `P-WORK summary · version ${version}`,
      `Played ${mins(s.playTime)}, chopping ${mins(s.chopTime)} (automatic ${mins(s.autoChopTime)}), chop style now ${this.style === "swing" ? "big swing" : "beat ring"}`,
      `Full loads ${s.fullLoads}, coin ${s.coin}, trees felled ${s.felled}, rank ${this.rank.name}`,
    ];
    if (s.swings) lines.push(`Big swings ${s.swings}: perfect ${pct(s.perfect, s.swings)}, good ${pct(s.goodSwings, s.swings)}, weak ${pct(s.weak, s.swings)}; perfect after 3 min ${s.perfectLate}/${s.swingsLate} (${pct(s.perfectLate, s.swingsLate)}), best perfect streak ${s.bestStreak}`);
    if (s.strokes) lines.push(`Beat ring: good strokes ${s.good}/${s.strokes} (${pct(s.good, s.strokes)}), after 3 min ${s.goodLate}/${s.strokesLate} (${pct(s.goodLate, s.strokesLate)})`);
    return lines.join("\n");
  }

  private stroke(ev: WorkEvent[]) {
    this.strokeNo++;
    const late = this.stats.playTime >= WORK.warmUp;
    if (!this.auto) { this.stats.strokes++; if (late) this.stats.strokesLate++; }
    const got = this.take(this.strokeTimber);
    ev.push({ k: "stroke", timber: got });
    if (this.goodFor === this.strokeNo) this.giveGood(ev);
    this.after(ev);
  }

  private giveGood(ev: WorkEvent[]) {
    if (!this.chopping) return;
    this.stats.good++; if (this.stats.playTime >= WORK.warmUp) this.stats.goodLate++;
    this.streak = this.lastGood === this.goodFor - 1 ? this.streak + 1 : 1;
    this.lastGood = this.goodFor;
    this.stats.bestStreak = Math.max(this.stats.bestStreak, this.streak);
    const got = this.take(this.strokeTimber * WORK.goodBonus);
    ev.push({ k: "good", timber: got, streak: this.streak });
    this.after(ev);
  }

  /** Moves timber from the tree to your back, never more than either holds. */
  private take(want: number): number {
    const tree = this.chopping!;
    const got = Math.max(0, Math.min(want, tree.timber, WORK.loadSize - this.load));
    tree.timber -= got; this.load += got;
    if (tree.timber < 1e-9) tree.timber = 0;
    if (this.load > WORK.loadSize - 1e-9) this.load = WORK.loadSize;
    return got;
  }

  private after(ev: WorkEvent[]) {
    const tree = this.chopping;
    if (!tree) return;
    if (tree.timber <= 0) { this.stats.felled++; ev.push({ k: "felled", tree }); this.stop(); }
    if (this.full) { ev.push({ k: "full" }); this.stop(); }
  }
}
