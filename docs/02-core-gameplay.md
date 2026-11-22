# Phase 2: Core gameplay

*Draft 20/11/2026, S01-DESIGN. Waiting for the director's "go". All numbers are first-pass and get balanced in Phase 5.*

## 1. The three loops

### Core loop (every few seconds)
**Look → pick a job → work → carry → deliver → get paid → look again.**

1. **Look:** check the sky (time of day), the horn (danger), the notice board (orders).
2. **Pick a job:** tap a tree, field, stone pile or order.
3. **Work:** your villager works on their own. A ring pulses every 1.5 s: tap it on the beat for a **good stroke** (+50% speed for that stroke). Optional, so you can play one-handed, but it rewards attention. This is our answer to "is gathering boring?" and must be prototyped first.
4. **Carry:** a full load slows you by 20%. Bigger loads (later bags) pay more but make you slower and give you more to lose.
5. **Deliver:** drop it at the right store (timber yard, granary, stone pile, building site). You get **coin** (yours) and the goods go into **your faction's stock** (the AI's).
6. **React:** at any moment the world can interrupt: a wolf, an enemy scout, the war horn, dusk.

### Session loop (one war, 20–40 min)
| Time | What happens | What the player does |
|---|---|---|
| 0–1 min | New map, your villager wakes at home on Day 1 | Learns to work and deliver (taught by play, Phase 3) |
| Days 1–2 | Both AI towns grow: more villagers, houses, walls | Earn coin, take orders, buy a better tool or a bag |
| Days 2–4 | Scouts, then the first raids at night | Choose: keep working, guard the walls, or answer the muster |
| Days 4–6 | Armies clash; buildings burn; the war tips one way | Fight, flee, haul for the army, or defect |
| Day 6 onwards | The war is fought to the end: it only stops when one Hall falls | Survive to the end |
| End | **The Chronicle**: what you and your bloodline did | Read your story, see the score, start a new war |

**One in-game day = 6 real minutes:** day 4 min, dusk 30 s, night 1 min 30 s. A typical war of 5–8 days = 30–50 min. **No time limit** (the director, Q4).

**Stalemate breaker** (so a war can't drag on for hours): from Day 6 each AI must launch a full attack at least every 2 nights; from Day 8 both sides can build siege engines that break walls fast. Target: 95% of wars end by Day 10 (60 min).

**Saving mid-war:** because a war has no time limit and phones get interrupted, the game saves automatically at every dawn and whenever the app goes to the background.

### Meta loop (why you come back)
- **The Chronicle book:** every war is saved as a short story page: your bloodline (names, how each one died), deeds, side, result. Players come back to write a better story.
- **Deeds:** named achievements ("Held the gate alone at night", "Turncoat who won the war", "Three generations in one war").
- **Harder wars:** difficulty levels and map types (river, forest, hills) unlock by finishing wars.
- **Parked:** lasting unlocks between runs (starting skills, gear). See [later/other-parked-ideas.md](later/other-parked-ideas.md). The Chronicle is built so this can be added.

## 2. Main mechanics and their rules

### 2.1 Time of day
| Phase | Length | Rules |
|---|---|---|
| Day | 4:00 | Full sight (10 tiles). Orders posted at dawn. Normal pay. |
| Dusk | 0:30 | Bell rings. Sight shrinks. Shops close at the end of dusk. |
| Night | 1:30 | Sight 4 tiles (6 with a torch). Wolves outside the walls. The AI prefers to raid at night. Night work pays **+50%**. |

### 2.2 Jobs and gathering (first version)
| Job | Where | One load | Time to fill (no good strokes) | Pay per load |
|---|---|---|---|---|
| Woodcutter | Forest | 10 timber | 20 s | 2 coin |
| Farmer | Fields near town | 10 grain | 15 s | 1 coin |
| Quarry worker | Stone outcrops | 8 stone | 25 s | 3 coin |
| Builder | Building sites | carry 1 load of materials to the site | depends on walk | 1 coin + 1 reputation |

Further out = better resources and more danger. Forests near the enemy hold more timber.

### 2.3 Orders (how the AI asks for your help)
The AI chief (the **Steward**) posts orders on the Hall's notice board **based on what the AI actually lacks**. If the AI is short of timber for a wall, you see a timber order.

| Example order | Reward | Deadline |
|---|---|---|
| Bring 3 loads of timber to the east wall site | 8 coin, +3 reputation | Before dusk |
| Guard the north gate tonight | 6 coin, +3 reputation | Until dawn |
| Answer the muster (join the army) | 10 coin per battle survived, +5 reputation | When the horn blows |
| Scout the enemy camp | 12 coin, +4 reputation | 1 day |

**You can ignore any order.** Ignoring costs −2 reputation; failing an order you accepted costs −4.

### 2.4 Reputation and changing sides
As set in [Phase 1](01-concept.md): −100 to +100 per faction, five levels, half passes to the heir, defection at great cost.

### 2.5 Health and hunger
- **Health 100.** Heals 1 per second while resting at home or in the Hall; otherwise 1 every 5 s.
- **Hunger 100**, drops to 0 over 1.5 in-game days. At 0 you lose 1 health every 3 s. A bread loaf (2 coin) restores 50.
- Keeps coin flowing out and makes home matter.

### 2.6 Taking up arms (simple and tactical)
- **Joining:** when the war horn blows, answer the muster at the barracks. Needs **Trusted (+30)**, or Common during a desperate defence (the AI opens the muster to everyone when the Hall is attacked). You get a spear and a basic shield, or use your own better gear.
- **In the army:** you are placed in a squad of 5–8 AI soldiers. The squad leader marks a target; **you choose** whether to follow it.
- **Fighting:** tap an enemy to target it; your soldier closes in and attacks on its own (1 hit per 1.2 s).
- **Two buttons:**
  - **Brace:** blocks 60% of damage for 2 s. Cooldown 6 s.
  - **Heavy strike:** double damage, 1 s wind-up. Cooldown 8 s.
- **Formation bonus:** +20% defence while 3 or more allies are within 3 tiles. Leaving the squad is allowed but you lose it.
- **Fleeing:** tap away from the fight. If you joined the battle, fleeing costs −8 reputation.
- **Standing down:** back in town, hand in your arms at the barracks. No cost unless a muster is active.

**Starting soldier stats:** health 100, attack 10, defence 2, speed 1.0. Enemy basic soldier: health 80, attack 9, defence 2.

### 2.7 Death and the bloodline
1. You fall. A short card: name, years lived, what they're remembered for.
2. What you carried drops in a sack at that spot. It stays for 1 in-game day, then it's looted.
3. Your heir wakes at home with the house, chest, savings and half your reputation (traitor rules in Phase 1).
4. **About 30 s lost**, not the war.
5. **Unlimited heirs** (the director, Q5): the line never runs out. Death costs items, time and reputation, never the run.

### 2.8 Factions (run by the AI)
- **First version:** 2 factions, each starts with a Hall, 6 villagers and 2 guards.
- The AI runs a simple strategy plan: gather → build houses → build walls → train soldiers → scout → raid → full attack. It reacts to what it sees (rebuild after raids, call the muster when attacked).
- **Size limit:** up to 30 villagers + 30 soldiers per faction, about 130 moving units in total (phone performance, Phase 8).

## 3. Win, lose and fail states
| State | When | What it costs you |
|---|---|---|
| **Victory** | The enemy Hall falls while you live on the winning side | Nothing; best Chronicle page |
| **Defeat** | Your side's Hall falls | The run ends. Your deeds still go in the Chronicle. |
| **Death** (fail, not loss) | Health reaches 0 | Carried items, ~30 s, half your reputation |
| **Outcast** (fail) | Reputation below −50 in your town | Locked out, attacked by guards; you must flee, earn it back, or defect |

"Your side" is the town you live in at the end. A turncoat whose new side wins gets a Victory, with "Turncoat" written in the Chronicle.

## 4. Camera and view (added 20/11/2026, the director)
The game is **3D**, with two views. A **view button is on screen at all times** to switch between them.

| | Isometric view (default) | First-person view |
|---|---|---|
| Camera | Fixed angle looking down at about 35°, rotated 45°, following your villager. No rotating. | From your villager's eyes |
| What it's for | Seeing the town, the fields and armies coming. All work and fighting are designed for this view. | Feeling small inside the war: walking the walls at night, standing in the battle line |
| Zoom | 3 levels (pinch or mouse wheel) | None |
| Sight at night | 4 tiles shown as a lit circle | Real darkness; torchlight reaches 6 tiles |
| Rules | Same in both views. No bonus or penalty for either. | Same |

**Readability rules for isometric:** when a building or tree hides your villager, you see an outline of them through it. Enemies get a red outline when they are within 8 tiles.

**Why 3D matters:** the first-person view only works in 3D, because it is the same world seen from a different camera. That is why the whole game is 3D, not flat drawings.

## 5. Controls
| Action | Phone (landscape or portrait, see Phase 7) | PC |
|---|---|---|
| Move | **Joystick** (left thumb, fixed in the lower-left corner) (the director, Q6). Tapping an object still walks you to it. Tap-to-move available in settings. | W A S D, or click the ground |
| Switch view (isometric / first person) | View button, always on screen (right edge, middle; moved from top centre in [Phase 7](07-ui-ux.md)) | V |
| Look around (first person) | Drag on the right half of the screen | Mouse |
| Work, pick up, deliver, talk | Tap the object; or the big **Action** button (right thumb), which changes with context | Click the object, or Space |
| Good stroke | Tap the ring when it pulses | Space |
| Target an enemy | Tap the enemy (first person: the enemy in the centre of the screen) | Click the enemy |
| Brace / Heavy strike | Two buttons above the Action button | Q / E |
| Bag, map, orders | Icons at the top right, next to pause ([Phase 7](07-ui-ux.md)) | B / M / O |
| Zoom (isometric only) | Pinch (3 levels) | Mouse wheel |
| Pause | Top-right button | Esc |

## 6. Game systems
| System | What it does | Inputs | Outputs | Connects to |
|---|---|---|---|---|
| Time | Runs day, dusk, night | Real time | Light level, sight, shop hours | AI (raid timing), Combat, Pay |
| Map | Terrain, resources, paths | Map seed | Tiles, resource spots, walk paths | Jobs, AI, Movement |
| Faction AI | Plays the strategy war | Faction stock, what it sees | Build plans, soldiers, raids, orders | Orders, Economy, Combat |
| Villager AI | Other villagers work and flee | Orders from faction AI | Gathered goods, panic | Economy, Combat |
| Player control | Moves and acts for you | Joystick, touch, mouse, keys | Movement, actions | Jobs, Combat, Defection |
| Camera | Isometric or first-person view of the same 3D world | View button, joystick, look drag | What is drawn on screen | Time (darkness), Player control |
| Jobs | Gathering and building | Player action, good strokes | Loads carried | Economy |
| Economy | Faction stock and your coin | Deliveries, purchases | Stock for the AI, coin for you | Faction AI, Shops, Orders |
| Orders | Turns AI needs into requests | Faction stock gaps | Order list, rewards | Reputation, Economy |
| Reputation | Trust per faction | Orders, battles, crimes, defection | Access to jobs, weapons, shelter | Orders, Combat, Bloodline |
| Combat | Fights | Targets, stats, Brace/Strike | Damage, deaths | Health, Reputation, AI |
| Health and hunger | Keeps you alive | Damage, food, rest | Death | Bloodline, Economy |
| Bloodline | Heirs and inheritance | Death, traitor flag, Q3 roll | New villager, starting reputation | Reputation, Chronicle |
| Defection | Changing sides | Player choice, guards' reaction | New faction, Outcast start | Reputation, Bloodline |
| Chronicle | Records the run | Deeds, deaths, result | Story page, score, deeds | Meta loop |

---

## Phase 2 summary
- Core loop: pick a job, work with optional on-beat taps, carry, deliver, get paid, react to danger.
- One war = 5–8 in-game days of 6 minutes each, fought until a Hall falls; a stalemate breaker keeps it near an hour at most.
- 3D world, fixed isometric camera, with a first-person view one button away; joystick movement.
- The AI's real shortages become orders on the notice board; you may ignore any of them.
- Combat: tap to target, auto-attack, plus Brace and Heavy strike; join and leave the army freely, at a reputation cost if you flee mid-battle.
- The Chronicle book records every war and your bloodline: that's the reason to come back.

## Decisions and why
| Decision | Why |
|---|---|
| Joystick as the default, tapping objects still works (the director, Q6) | Works in both views; tapping a tree or a field still walks you there. |
| 3D with isometric and first-person views (the director) | First person needs a real 3D world; both views share the same rules so neither is "the right way" to play. |
| On-beat "good stroke" tap while working | Gives gathering a skill element without forcing it. Biggest risk, prototype first. |
| Orders come from the AI's real shortages | Makes "the town lives without you" visible: your work fills a real gap (pillar 3). |
| Fight to the end, with a stalemate breaker (the director, Q4) | The war has a real ending; forced attacks and siege engines keep it near an hour at most (pillar 5). |
| Unlimited heirs (the director, Q5) | Death never ends the run; it costs items, time and reputation. |
| Night pays +50% | Risk for reward at night (pillar 4). |
| Formation bonus | Rewards sticking with the army without forcing it (pillar 2). |

## Open questions and risks
- ⚠️ **The faction AI** is still the biggest build. The 7-step plan above is the smallest version that feels like a real war.
- ⚠️ **Tap-to-move during combat** can mis-tap on a crowded screen. Tapping an enemy targets it, tapping ground moves; we may need a larger "tap area" around units.
- ⚠️ **Six-minute days** may feel short or long: tune after the first playtest.
- ⚠️ **3D on a phone browser:** about 130 moving 3D units plus a town must run smoothly. Needs simple models, many copies of the same model drawn at once, and fog to limit how far first person draws. Test early on the director's phone.
- ⚠️ **First-person view doubles some work:** the world must look right up close (ground, walls, faces), not just from above.
- ✅ Q4: fight to the end. ✅ Q5: unlimited heirs. ✅ Q6: joystick.
- ✅ Q7: start low-poly, end goal is the detail of a modern remastered isometric strategy game, in our own art (see the brief).

### Honest note on matching the look of a famous isometric strategy game
- **What we can match:** the feel of that genre: a fixed isometric camera, a detailed medieval town, small readable units, warm daylight colours, and clear team colours.
- **What we can't and shouldn't do:** copy that game's art, buildings, units or interface. It's someone else's work and would block selling later.
- **What fits €0 and no artist:** that game's detailed, realistic look comes from a large professional art team. With free 3D model packs that allow commercial use, the realistic target is a **clean, slightly stylised low-poly 3D look**: simple shapes, good lighting and colour. It can look very good, but it won't look like a big-budget game.
- **Order of work stays the same:** plain 3D shapes first (boxes and cylinders) until the game is fun, then the real look. The full art direction comes in Phase 6.
- **Engine:** Phaser (the 2D engine assumed in the brief) can't do 3D. Recommendation: **Babylon.js**, a free 3D engine for web browsers (Apache 2.0 licence, allows selling). It runs on phones and PC from the same GitHub page, and Claude can write it all as code. Confirmed in Phase 8.
