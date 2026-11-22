# Phase 5: Content and progression

*Draft 21/11/2026, S02-WORLD. Waiting for the director's "go". All numbers are first-pass, to be tuned in playtests (Phase 11).*

## 1. Two kinds of progression
| | **Within a war** (one chapter, 20–40 min) | **Across wars** (the family saga) |
|---|---|---|
| What grows | Your coin, gear, practice, reputation, deeds | Your family's name, tree, standing, one heirloom, crest |
| Resets when | The war ends | Never (unless you start a new family) |
| Power gained | Real: better gear and skills make you stronger | **Small on purpose:** a head start, never a win |
| Pillar | 2 (your choice, your risk) | Phase 1 motivation 4 (ownership) and 2 (stories) |

**The golden rule:** a fully kitted veteran is about as strong as a trained enemy soldier, never a one-person army (pillar 1: small person, big war).

## 2. Within a war

### 2.1 Coin: what a day earns
Based on Phase 2 pay and a 4-minute day:

| Source | Per day (normal play) |
|---|---|
| About 5 loads delivered (walk + work ≈ 45 s each) | 8–12 coin |
| One or two orders | 8–20 coin |
| Night work (+50%) or a night guard order | 0–9 coin |
| **Total** | **about 20–35 coin** |
| Bread to stay fed (about 1.3 loaves) | −3 coin |

A war of 6–8 days earns roughly **120–220 coin** in total. Prices are set so you can afford one big purchase every day or two.

### 2.2 Gear and prices
Sold by the **Smith** (tools, weapons, armour), the **Baker** (food), the **general store** at the market (bags, light) and the **Peddler** (rare items). Reputation limits what you may buy (Phase 1 levels).

| Item | Price | What it does | Needs |
|---|---|---|---|
| **Tools** | | | |
| Old axe / sickle / pick | free (at home) | Normal work speed | |
| Iron axe / sickle / pick | 25 each | +25% work speed for that job | Common |
| Master's tool | 60 each | +50% speed, wider good-stroke window | Trusted |
| **Carrying** | | | |
| Sack | free | 10 per load (8 stone) | |
| Large sack | 20 | 15 per load, −25% speed when full | |
| Carry frame | 45 | 20 per load, −35% speed when full | Common |
| **Light** | | | |
| Torch | 3 | Sight 6 at night, lasts one night | |
| Lantern | 30 (Peddler) | Sight 6 every night, hands free for a shield | |
| **Food** | | | |
| Bread | 2 | +50 hunger | |
| Salted fish (Almara) / olives and cheese (Quintara) | 4 | +80 hunger, +10 health | |
| Feast pie | 8 | +100 hunger, +30 health | Trusted |
| **Weapons** (lent at the muster or bought) | | | |
| Cudgel | 8 | Attack 7. Allowed for Distrusted villagers outside the walls | |
| Spear | 20 | Attack 10, reach 1.5 tiles | Common outside, Trusted inside the walls |
| Short sword | 60 | Attack 13, 20% faster swings | Trusted |
| **Armour** | | | |
| Shield | 15 (lent at the muster) | Brace blocks 60% (80% with an iron rim, +20 coin) | |
| Padded jacket | 25 | Defence +2 | |
| Iron cap | 35 | Defence +2 | Common |
| Mail shirt | 120 | Defence +4, −10% speed | Honoured |

**Top gear:** master's tool, carry frame, lantern, short sword, iron-rimmed shield, cap, jacket and mail. That costs about 400 coin, more than one war normally earns, so you have to choose what kind of villager to be.

### 2.3 Practice (job skill)
Phase 1 promised "family know-how". Each job has 3 ranks, earned by doing the work:

| Rank | Earned after | Bonus |
|---|---|---|
| Novice | start | none |
| Skilled | 15 loads in that job | +15% speed, good-stroke window +20% |
| Master | 40 loads | +30% speed, window +40%, the Steward pays +1 coin per load |
| Fighting practice | 3 battles survived → **Blooded**, 8 → **Veteran** | Blooded: Brace cooldown −1 s. Veteran: +10 health, and the Captain may make you squad leader at Honoured |

**When you die, your heir keeps family know-how at one rank lower** (Master becomes Skilled, Skilled becomes Novice).

### 2.4 Reputation (Phase 1 list, updated)
| Action | Change |
|---|---|
| Finish an order | +3 |
| Deliver a full load | +1 (at most +5 per day, so hauling alone can't make you Honoured) |
| Fight in a battle and survive | +5 |
| Guard the walls through a night | +3 |
| Repay a grudge ("Blood Repaid", Phase 4) | +5 |
| Save a villager in a raid (fight off their attacker) | +4 |
| Ignore an order / fail an accepted one | −2 / −4 |
| Flee from a battle you joined | −8 |
| Caught stealing | −15 |
| Defect | old town −100 |

## 3. The world's content (first version)

### 3.1 Jobs
| Job | First version | Later (💤) |
|---|---|---|
| Woodcutter, Farmer, Quarry worker, Builder | ✅ (Phase 2) | |
| Army hauler (carry food and arrows to the front) | ✅, only during a muster; 2 coin, +2 reputation per trip, no fighting needed | |
| Fisher, salt raker, olive picker, baker's helper, scout | | 💤 one or two per update |

### 3.2 Buildings (per town)
Each building appears at a town stage (see [visual-direction.md](visual-direction.md)). The AI decides when to build it; your deliveries make it happen sooner.

| Stage 1: Founding | Stage 2: Growing | Stage 3: Downtown |
|---|---|---|
| Hall (wooden) | Hall (stone base) | Hall with keep tower |
| Thatched houses | Tiled-roof houses | Dense streets |
| Timber yard, granary, stone pile | Windmill | Market square with the general store |
| Notice board | Bakery (moves from a stall to a building) | Statue of a town hero (may be *your* family's, see 4.4) |
| Bakery stall, smithy | Barracks | Harbour (scenery) |
| Wooden palisade with a gate | Stone wall, gatehouse, 2 towers | Thick walls, 4 towers |
| Little dock (scenery) | | |

**When a town moves up a stage** (AI stock, first pass): Stage 2 when it has stored 300 timber, 200 stone and 300 grain in total, and has at least 15 villagers. Stage 3 at 600 stone and 25 villagers. Usually Day 2–3 and Day 4–6.

**About 14 building types** in the first version, each with up to 3 looks.

### 3.3 Enemies and dangers
| Enemy | Health / attack / defence | When | Behaviour |
|---|---|---|---|
| Wolf | 40 / 6 / 0 | Night, outside the walls, packs of 2–3 | Circles, lunges, flees from fire |
| Enemy scout | 60 / 7 / 1 | Day 2 on, at the edges | Fast, runs from fights, spots villagers for the raids |
| Spearman | 80 / 9 / 2 | Raids and battles | Fights in squads |
| Guard | 100 / 10 / 4 | Around the enemy Hall and gates | Holds its post, doesn't chase far |
| Captain | 150 / 13 / 5 | Leads big attacks, named | Buffs nearby soldiers +10% attack; killing them breaks the squad |
| Battering ram | 300 / 0 / 8, slow | Day 8 on (stalemate breaker) | Breaks gates; needs 4 pushers; burn it with a torch (5 s) |
| 💤 Later | archer, horse rider, catapult | | |

### 3.4 Maps
| Map type | What makes it different | Unlocked |
|---|---|---|
| **Coast (guided war)** | Fixed map, gentle enemy, first raid not before Day 3 | Start |
| **Coast** | Random; harbour, beach and salt flats | After your first war |
| **River** | A wide river with 2 crossings: the bridge and a dangerous ford | After 2 wars |
| **Hills** | Terraces and cliffs; Quintara's home ground, more stone | After 3 wars |
| **Wolfwood** | Thick forest, short sight, many wolves | After winning a war on Banner |

Map size, first pass: about 96 × 64 tiles; walking from Hall to Hall takes about 2 minutes (Likely; checked in the prototype).

### 3.5 Deeds (first version: 17)
Each deed adds a line to the Chronicle; some give a nickname (Phase 4).

| Deed | How | Nickname |
|---|---|---|
| First Load | Deliver your first load | |
| Night Watch | Guard the walls through a whole night | |
| Gate-holder | Stop 5 enemies at a gate in one night | *the Gate-holder* |
| Blooded | Survive 3 battles | |
| Blood Repaid | Kill your grudge target | *the Avenger* |
| Hall Defender | Fight at your Hall when it is attacked, and survive | |
| Master of the Axe / Field / Stone | Reach Master rank in a job | *the Woodsman* / *Green-hand* / *Stonejaw* |
| Never Lifted a Blade | Finish a war without fighting once | *the Peaceable* |
| Who-Ran | Flee 3 battles | *Who-Ran* |
| Half-loaf | Caught stealing | *Half-loaf* |
| Turncoat | Defect | *the Turncoat* |
| Turncoat who Won | Defect and finish the war on the winning side | *the Lucky Coat* |
| Three Generations | 3 family members play in one war | |
| Burned the Ram | Destroy a battering ram | *Fire-hand* |
| Weathervane | Your family crosses sides twice (across any number of chapters) | *the Weathervane* |
| Last One Standing | Your town loses, but you are alive at the end | *the Survivor* |
| Captain-killer | Strike the killing blow on an enemy Captain | *Captain's Bane* |

## 4. Across wars: the family saga (Q10)

### 4.1 What carries over, with limits
| Carries over | How | Limit |
|---|---|---|
| **Family name and tree** | Every villager you played, nickname, how they died, which side | none |
| **Family standing** | From how the last chapter ended: won and well liked → +; lost, fled, stole or turned coat → − | Starting reputation +10 (Phase 1) **plus −10 to +10**. Never reaches Trusted on Day 1. |
| **Family trade** | The job your family did most last chapter | The first villager starts at **Skilled** in it (not Master) |
| **One heirloom** | When a chapter ends, pick one item the last living member owned | A "named" version: **+10%** on its one stat, with the owner's name (*"Afonso's Axe"*). Only one at a time. |
| **Family crest** | Earned from deeds; painted on your door, shown on your death card | Cosmetic only |
| **Old grudges** | 💤 Later: a Quintara family that killed yours may return in the next chapter | |

**Which side the family is on (the director, Q11):** a family stays on the side where its last living member ended the chapter. There's no free choice of side each war.
- **A turncoat family has switched for good.** If your line ended the war in Quintara, the next chapter starts in Quintara, even in the first version (this unlocks starting in Quintara automatically).
- **In the new town:** family standing works as usual, but gossip calls you "the Almara blood" for the whole chapter, and the first order each day pays 1 coin less until you reach Trusted.
- **In the old town:** you start at −60 (Outcast) instead of the usual −40, for one chapter. After that, the old town treats you like any other enemy.
- **Crossing back is allowed**, by defecting again, with the same cost and risk. A family that crossed twice earns the deed **Weathervane** (nickname *the Weathervane*).
- **A new family** chooses its side freely once Quintara is unlocked.

**Heirlooms can be lost.** If you die carrying it and the sack is looted, it's gone from the family for good, and the Rememberer writes that down. The Peddler might sell it back, at a high price, in a later chapter (a 1 in 4 chance). It's a small real loss that turns into a story.

### 4.2 Unlocks (variety, not power)
| Unlock | How |
|---|---|
| Banner difficulty | Finish your first war (any result) |
| Blood difficulty | Win a war on Banner |
| Map types | See 3.4 |
| Start in Quintara (new families) | Win a war, or end a chapter as a turncoat (that family then continues in Quintara, Q11) |
| Crest symbols (wave, tower, axe, wolf, wheat, key…) | Deeds |
| Family colours on your door and clothes trim | 3 chapters played |

### 4.3 Chronicle score
Each chapter gets a short score, for players who like numbers:
**days alive × 10 + deeds × 50 + generations × 25, × 1.5 if your side won, × 1.25 on Blood.**
The family's total score is the sum of all its chapters.

### 4.4 The statue
If a member of your family earns 3 or more deeds in one chapter and your town wins, the town raises a **statue** of them in its stage 3 square in the next chapter. It's purely for show, and it's the best reward a nobody can get.

## 5. Pacing of one war (check against Phase 2)
| Day | You (typical) | The town |
|---|---|---|
| 1 | Novice, old tools, ~25 coin | Stage 1, 6–10 villagers |
| 2 | Iron tool or large sack; first wolves | Scouts appear; heading for stage 2 |
| 3 | Skilled in one job; first muster (Trusted?) | Stage 2; first raids |
| 4–5 | Spear and jacket, or carry frame; Blooded | Battles on the salt flats; stage 3 for the stronger side |
| 6–8 | Master or Veteran; one luxury (mail, lantern, master's tool) | Full attacks, the war tips |
| 8+ | | Rams; one Hall falls |

## 6. First version content budget
| Content | Amount |
|---|---|
| Jobs | 4 + army hauler |
| Building types | ~14 (with up to 3 looks each) |
| Items | ~22 |
| Enemy types | 6 |
| Map types | Guided Coast + random Coast (River, Hills, Wolfwood next) |
| Deeds | 17 |
| Text lines | ~150 (Phase 4) |
| Difficulty levels | 3 |

---

## Phase 5 summary
- Within a war you grow through coin (gear), practice (job ranks), reputation and deeds; across wars your family keeps its name, tree, a small standing, its trade, one heirloom and a crest.
- A full kit is about as strong as an enemy soldier: never a one-person army.
- A war earns about 120–220 coin; full top gear costs about 400, so you choose who to become.
- First version: 4 jobs + hauling, ~14 buildings, ~22 items, 6 enemies, 2 map types, 17 deeds.
- Unlocks add variety (difficulty, maps, starting in Quintara, crests), not power.

## Decisions and why
| Decision | Why |
|---|---|
| Across-war power capped at +10 reputation, Skilled rank, one +10% heirloom | Every chapter stays a fair, fresh start (Q10 decision noted "help a little, never decide a war") |
| Load reputation capped at +5 per day | Stops hauling all day from making you Honoured; fighting, orders and guarding matter too |
| Heirlooms can be lost for good | Gives death a real cost across chapters, and a story |
| Top gear costs about twice what one war earns | Forces choices: worker, soldier or survivor (pillar 2) |
| Statue as the top reward | Cosmetic, fits "nobody becomes a hero" (the player fantasy) |
| Army hauler job in the first version | Lets peaceful players help the war without fighting |

## Open questions and risks
- ✅ **Q11:** the family stays on the side it ended the last chapter on; turncoat families have switched for good (the director, 21/11/2026). See 4.1.
- ⚠️ **Balance needs playtests:** pay, prices and ranks are guesses until the prototype runs. All numbers live in data files so they can change without code.
- ✅ **Too many items for a phone screen?** Answered in [Phase 7](07-ui-ux.md), section 3.5: one seller at a time, at most about 13 items in 3 tabs.
- ⚠️ **14 building types × 3 looks** is the biggest art job of the first version. The prototype uses plain shapes (Phase 6).
