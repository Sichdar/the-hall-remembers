# Phase 3: Player experience

*Draft 21/11/2026, S01-DESIGN. Approved by the director ("go"). Numbers are first-pass.*

## 1. Emotional arc

### First 10 minutes (the first war, Days 1–2)
| Minute | What happens | What the player should feel |
|---|---|---|
| 0–1 | Wake at home at dawn. The town bustles; your neighbour waves and walks to the forest. | Curious: "the town is alive" |
| 1–3 | Chop your first tree, hit a few good strokes, deliver, hear the coin. | Competent: "I get it" |
| 3–5 | Bell at the notice board: the first order. You fill it and see the wall grow with your timber. | Useful: "my work counts" |
| 5–6 | First dusk bell. Light fades, a wolf howls far away. The first-person button pulses once. | Uneasy: "I should get home" |
| 6–8 | First night, nothing attacks (guaranteed). You look around in first person, then sleep or work for night pay. | Relief, and a taste of fear |
| 8–10 | Day 2: a scout in red is seen at the forest edge. Gossip about the other town. | Anticipation: "something is coming" |

### First whole war (20 to 40 minutes)
Curiosity → competence → **first loss** (a raid burns a house, or your first death and your heir's card) → **first real choice** (answer the muster or not) → **first battle** → the war tips → the Hall falls (yours or theirs) → the Chronicle page. The player should finish with a story they want to tell.

### Full game (many wars)
Mastery and authorship: reading the war like a veteran, trying different lives (farmer who never fights, soldier, turncoat, three-generation hero), filling the Chronicle and its deeds, raising the difficulty.

## 2. Onboarding: taught by playing
The **first war is a guided war** on a fixed, small map. Its enemy is gentle and the first raid cannot come before Day 3. After that, every war is random, and hints only appear for things the player hasn't done yet.

**Rule:** at most one hint on screen, **8 words or fewer**, always with an icon. No text boxes to close. The hint disappears when the player does the thing.

| Mechanic | How it's taught | Hint |
|---|---|---|
| Move | A glowing woodpile ahead; the joystick pulses until you move | "Walk to the woodpile" |
| Work | Arriving at a tree starts chopping on its own | none |
| Good stroke | The ring pulses; the first on-beat tap gives a big "Good!" | "Tap the ring on the beat" |
| Deliver | Full load: an arrow points to the timber yard | "Bring it to the yard" |
| Orders | The notice board bell rings at minute 3 | "The Steward needs timber" |
| Reputation | First gain: the bar pulses, chime | "The Hall remembers" |
| Hunger | Stomach growl at hunger 50, bakery highlighted | "Buy bread at the bakery" |
| Night | Dusk bell; home and Hall glow | "Night falls. Get to safety" |
| First-person view | The view button pulses once at first dusk | none |
| Combat | Day 2: a lone wolf at the forest edge. First lunge plays in slow motion. | "Tap to fight" then "Brace!" |
| Muster | Day 3 horn, banner icon at the screen edge | "The muster is called. Your choice." |
| Death and heirs | Heir card explains in one line | "Your daughter takes up your tools" |
| Defection | **Never taught.** Discovered through gossip ("they say old Bram crossed over…") and the Chronicle | none |

## 3. Difficulty
Three levels, chosen before each war. The rules stay the same; only the numbers change.

| Setting | Hearth (easy) | Banner (normal) | Blood (hard) |
|---|---|---|---|
| Enemy damage | ×0.7 | ×1.0 | ×1.3 |
| Earliest enemy raid | Day 4 | Day 3 | Day 2 |
| Hunger speed | ×0.7 | ×1.0 | ×1.2 |
| Carried sack lasts after death | 2 days | 1 day | Half a day |
| Wolves at night | Few | Normal | Many |
| Enemy AI | Slower to expand | Normal | Expands and attacks faster |

**Gentle help (on by default, can be turned off):** if you die 3 times in one in-game day, your next heir gets **Second wind** (+20% health until dawn). Shown openly on the heir card, never hidden.

Harder levels unlock by finishing a war (Phase 2 meta loop). Hearth is open from the start.

## 4. Feedback and game feel
Vibration works on Android browsers; iPhone browsers ignore it, so nothing important relies on it.

| Action | See | Hear | Feel (Android) |
|---|---|---|---|
| Good stroke | Wood chips fly, "Good!" pops, streak counter | Sharp "thock", pitch rises with the streak | 10 ms tap |
| Load full | Bag icon fills and glows | Satisfied grunt | none |
| Deliver | Coins float up; the faction stock bar ticks | Coin clink | 10 ms tap |
| Order done | Notice board stamp, reputation bar pulses | Chime, "The Hall remembers" | 2 short taps |
| Hit an enemy | Flash and small knockback | Hit sound, grunt | 15 ms |
| Take damage | Red edges of the screen; heartbeat below 30 health | Pain grunt, heartbeat | 30 ms |
| Brace blocks a hit | Spark, shield shudder | Metal clang | 20 ms |
| Raid sign (G7) | Smoke on the horizon, a scout at the field edge, a runner coming in; a small edge arrow | Distant crow calls, a worried gossip line | none |
| Watchman's bell (G7) | The watchman ringing on the tower; banner at the top | Fast, uneven bell | 2 long pulses |
| War horn | Banner icon at the screen edge pointing to the danger | Deep horn | 3 long pulses |
| Dusk bell | Light shifts to orange; shadows stretch | Town bell | none |
| Death | Slow motion, colour drains, heir card | Single drum, silence | 1 long pulse |
| The town falls (G9) | Fires spread from the fields to the houses to the Hall over 2 to 3 minutes; the sky darkens with smoke | Bells stop one by one; shouting, then quiet | none |
| Reputation level change | Big banner with the new level | Fanfare (up) or low drum (down) | none |

## 5. Accessibility
| Area | What we do |
|---|---|
| Controls | Joystick size and side can change (left-handed). Tap-to-move option. Good strokes can be set to automatic (normal speed, no taps). All buttons at least 48 × 48 pixels. PC keys can be changed. |
| Visuals | Team colours always paired with a banner shape (blue = square banner, red = forked banner) so colour-blind players can tell them apart. Enemies get an outline. 3 text sizes. Night brightness slider. "Reduce flashing and shaking" switch. |
| Audio | Every important sound has a visual sign (horn = edge banner, wolves = paw icon pointing their way, bell = sky colour). Captions for all spoken lines. Separate music, effects and voice volume. |
| Difficulty | Hearth level from the start; Second wind; game speed 0.75× option. |
| Reading load | Hints of 8 words or fewer with icons. The game can be played without reading. All text in data files, ready for translation (English first, Portuguese next: Phase 12). |

---

## Phase 3 summary
- The first 10 minutes go from curious to useful to uneasy, with a guaranteed safe first night.
- The first war is a guided war; every mechanic is taught by a situation with one short hint at most.
- Defection is never taught: it's a secret players discover through gossip.
- Three difficulty levels (Hearth, Banner, Blood) change numbers, not rules; optional Second wind after repeated deaths.
- Every key action has sight, sound and (on Android) vibration feedback; nothing depends on sound or colour alone.

## Decisions and why
| Decision | Why |
|---|---|
| Guided first war on a fixed map | A known map lets us time each lesson; random maps come after. |
| No raid before Day 3 in the first war | The player must learn the work loop before fear arrives (pillar 4 works only if day feels safe first). |
| Defection hidden, found through gossip | Discovering it yourself makes it feel like your own idea (pillar 2). |
| Second wind is shown openly | Help that hides itself feels like cheating when noticed. |
| Team colour always paired with a shape | About 1 in 12 men can't easily tell red from green or similar colours. |

## Open questions and risks
- ⚠️ **The guided war** is extra content to build and keep working as the game changes. Keep it short (Days 1–3) and data-driven.
- ⚠️ **The on-beat ring** may annoy some players; the automatic option covers this, but playtests decide if it stays: P-WORK and the good-strokes number ([Phase 11](11-prototyping-playtesting.md), sections 3 and 5).
- ⚠️ **iPhone has no vibration in the browser**, so iPhone players rely on sound and visuals only.
- ✅ Q8: the heir is a **random son or daughter** (the director, 21/11/2026). No choice screen. **Replaced 24/11/2026 by S6, pick P2:** you choose the heir from your living family (Phase 2, section 2.7; heir card in Phase 7, section 3.8).
