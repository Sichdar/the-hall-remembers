// Dice and determinism (docs/08, section 5.5). One small random-number maker of our own, started from the war's seed.
// The simulation never uses the clock or the browser's Math.random, so a seed plus the player's commands replays a war.
// Separate streams for the map, the AI, combat and names: drawing a name never shifts a battle.

export type StreamName = "map" | "ai" | "combat" | "names";

export class Dice {
  private state: number;

  constructor(seed: number) {
    this.state = seed | 0;
  }

  /** A number from 0 (included) to 1 (not included). Same algorithm as the mock-up street, so its look can move here unchanged. */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** A number from a (included) to b (not included). */
  range(a: number, b: number): number {
    return a + this.next() * (b - a);
  }

  /** A whole number from 0 to n - 1. */
  int(n: number): number {
    if (!Number.isInteger(n) || n <= 0) throw new RangeError(`Dice.int needs a whole number above 0, got ${n}`);
    return Math.floor(this.next() * n);
  }

  /** True with the given chance (0 to 1). */
  chance(p: number): boolean {
    return this.next() < p;
  }

  pick<T>(items: readonly T[]): T {
    if (items.length === 0) throw new RangeError("Dice.pick needs at least one item");
    return items[this.int(items.length)] as T;
  }

  /** Where the dice are now, for a save. */
  save(): number {
    return this.state;
  }

  static load(state: number): Dice {
    return new Dice(state);
  }
}

/** Turns a stream's name into a number, so each stream starts from its own seed (FNV-1a). */
function hashName(name: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h | 0;
}

/** The war's dice: one independent stream per kind of chance. */
export function warDice(warSeed: number): Record<StreamName, Dice> {
  const make = (name: StreamName) => new Dice((warSeed ^ hashName(name)) | 0);
  return { map: make("map"), ai: make("ai"), combat: make("combat"), names: make("names") };
}
