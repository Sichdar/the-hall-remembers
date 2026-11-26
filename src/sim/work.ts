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
  /** A full load slows you by this much; a half load by half of it. */
  carrySlow: 0.2,
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
  | { k: "rank"; name: string };

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
  /** Seconds since the last stroke. */
  phase = 0;
  streak = 0;
  readonly stats: WorkStats = {
    playTime: 0, chopTime: 0, autoChopTime: 0, strokes: 0, good: 0, strokesLate: 0, goodLate: 0,
    bestStreak: 0, fullLoads: 0, coin: 0, felled: 0,
  };
  /** Number of the stroke a good tap was last given to, so one stroke can't be good twice. */
  private goodFor = -1;
  private strokeNo = 0;
  /** Number of the last good stroke, for the streak. */
  private lastGood = -2;

  constructor(spots: readonly { x: number; z: number }[]) {
    this.trees = spots.map((s, id) => ({ id, x: s.x, z: s.z, timber: WORK.loadsPerTree * WORK.loadSize }));
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

  /** Start chopping a standing tree. Returns false if it can't be done (stump, sack full). */
  start(tree: Tree): boolean {
    if (tree.timber <= 0 || this.full) return false;
    if (this.chopping !== tree) { this.chopping = tree; this.phase = 0; this.streak = 0; this.goodFor = -1; this.lastGood = -2; }
    return true;
  }
  stop() { this.chopping = null; this.streak = 0; }

  /** Time moves on by dt seconds. */
  step(dt: number): WorkEvent[] {
    const ev: WorkEvent[] = [];
    this.stats.playTime += dt;
    if (!this.chopping) return ev;
    this.stats.chopTime += dt; if (this.auto) this.stats.autoChopTime += dt;
    this.phase += dt;
    while (this.chopping && this.phase >= WORK.beat) {
      this.phase -= WORK.beat;
      this.stroke(ev);
    }
    return ev;
  }

  /** You tapped the ring. A tap close to a stroke (before or after) makes that stroke good. */
  tap(): WorkEvent[] {
    const ev: WorkEvent[] = [];
    if (!this.chopping || this.auto) return ev;
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

  /** Drop your load at the timber yard. */
  deliver(): WorkEvent[] {
    const ev: WorkEvent[] = [];
    if (this.load < 1) return ev;
    const full = this.full, before = this.rank.name;
    const coin = full ? WORK.payPerLoad + this.rank.pay : Math.max(1, Math.round(WORK.payPerLoad * this.load / WORK.loadSize));
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

  /** A few lines of plain text the director can paste into a message (docs/11, section 5). Nothing is sent. */
  summary(version: string): string {
    const s = this.stats, pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) + "%" : "-");
    const mins = (t: number) => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
    return [
      `P-WORK summary · version ${version}`,
      `Played ${mins(s.playTime)}, chopping ${mins(s.chopTime)} (automatic ${mins(s.autoChopTime)})`,
      `Full loads ${s.fullLoads}, coin ${s.coin}, trees felled ${s.felled}, rank ${this.rank.name}`,
      `Good strokes ${s.good}/${s.strokes} (${pct(s.good, s.strokes)}), after 3 min ${s.goodLate}/${s.strokesLate} (${pct(s.goodLate, s.strokesLate)}), best streak ${s.bestStreak}`,
    ].join("\n");
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
