# The Hall Remembers: Bloodlines: Game Design Document

*Combined from the phase files on 25/11/2026. Don't edit this file: edit the files in `docs/` and run `node tools/build-gdd.mjs`. Links to other phases open their own files.*

## Contents

- [The game on one page](#the-game-on-one-page)
- [Brief and lasting decisions](#brief-and-lasting-decisions)
- [Phase 1: Concept](#phase-1-concept)
- [Phase 2: Core gameplay](#phase-2-core-gameplay)
- [Phase 3: Player experience](#phase-3-player-experience)
- [Phase 4: World, story and characters](#phase-4-world-story-and-characters)
- [Phase 5: Content and progression](#phase-5-content-and-progression)
- [Phase 6: Art and audio direction](#phase-6-art-and-audio-direction)
- [Phase 7: UI and UX](#phase-7-ui-and-ux)
- [Phase 8: Technical design](#phase-8-technical-design)
- [Phase 9: Business, ethics and legal](#phase-9-business-ethics-and-legal)
- [Phase 10: Scope and production plan](#phase-10-scope-and-production-plan)
- [Phase 11: Prototyping and playtesting](#phase-11-prototyping-and-playtesting)
- [Phase 12: Polish, launch and beyond](#phase-12-polish-launch-and-beyond)
- [Appendix A: Vision check, the villager's eye](#appendix-a-vision-check-the-villagers-eye)
- [Appendix B: Visual direction notes](#appendix-b-visual-direction-notes)

---

# The game on one page

*Source: [summary.md](summary.md)*

*Written 25/11/2026, S25-LINK, from the 12 approved phases. Each line points to the phase that holds the detail. Open points are marked ⏳. Updated 25/11/2026, S26: Q28, Q30 and Q31 settled.*

**The game in one sentence.** A real-time strategy war seen from the ground: you are one villager in an AI-run town, and each day you choose whether to work, hide or fight ([Phase 1](01-concept.md)).

**What you do.** Pick a job (woodcutter, farmer, quarry worker, builder, army hauler), work with optional on-beat taps, carry, deliver and get paid. Buy bread and gear, take orders from the notice board or ignore them, and at dusk decide whether to guard the gate, answer the muster or bar your door. Combat is simple: tap to target, the villager fights on its own, plus Brace and Heavy strike ([Phase 2](02-core-gameplay.md)).

**The war around you.** Two AI towns, Almara (blue) and Quintara (red), gather, build, grow and raid on the same map. Their real shortages become your orders. The land near the Hall runs out and work moves outward, raids come with warning signs, and a town falls in stages. A war is fought until a Hall falls, over 4 to 6 in-game days of 6 minutes each: 20 to 40 minutes, tried first and tuned in tests ([Phase 2](02-core-gameplay.md)).

**Death and family.** Your household lives in your house. When you die, you choose the heir from them; they inherit your home and savings, and what you carried is dropped. Your family carries on from war to war, a dynasty of commoners, and the Chronicle book tells their story. You can change sides at a great cost, and the heir carries the traitor's mark; you choose that heir too, seeing where each family member lives and what they'd start with ([Phases 1, 2, 4, 5](04-world-story-characters.md)).

**The world.** The Sunward Coast, a made-up warm Mediterranean shore. The Hall's Rememberer writes every deed in the Roll, and your reputation is what the Roll says. Grounded, with light humour; children and the old are never hurt ([Phase 4](04-world-story-characters.md), [Phase 9](09-business-ethics-legal.md)).

**Five pillars.** Small person, big war (you only control yourself). Your choice, your risk (every order can be refused, at a cost). The town lives without you. Day for work, night for fear. A whole war in one sitting, on a phone ([Phase 1](01-concept.md)).

**Look and sound.** 3D with a fixed isometric camera and a first-person button always on screen. Warm, sunlit, readable at phone size; Quaternius CC0 models ("Full") with plain shapes as the "Light" fallback; detailed art only once the game has earned it. Folk music that follows the danger, quiet nights, short Portuguese words recorded by the director, no full voice acting ([Phase 6](06-art-audio.md)).

**On screen.** One Action button that changes with what's in front of you, bars top left, thumbs' controls in the lower corners, no minimap. Shop, board, bag and map are half-screen panels while the war keeps moving; only Pause stops it ([Phase 7](07-ui-ux.md)).

**How it's built.** A web game in Babylon.js 9 and TypeScript, published free on GitHub Pages, playable offline and from the Home Screen; a phone app later through Capacitor. The war is a simulation that runs without graphics, so hundreds of test wars check the balance. Budgets: 30 frames a second, 60 animated people on screen, smallest phone the iPhone SE ([Phase 8](08-technical-design.md)).

**Money and ethics.** Free on the web link. If it's sold later: one price, the first war free, on itch.io first, then the stores. Never ads, loot boxes, timers, pay to win or tracking. Only assets that allow selling; no AI-made art, sound or voices ([Phase 9](09-business-ethics-legal.md)).

**The plan.** The director directs and playtests; Claude writes all code and documents; weekends, €0. Seven milestones, each ending on the director's phone: M0 foundations, M1 a day in Almara, M2 the other town, M3 the first whole war (about two months, Guess), M4 content, M5 sound and welcome, M6 version 1.0 (four to six months, Guess) ([Phase 10](10-scope-production.md)).

**How we know it works.** Each milestone starts with the piece most likely to fail, beginning with "is chopping and carrying fun for ten minutes". At M3 the director plays three whole wars on three days as the fun check, which decides go, change or stop. Outside players come later. The game never sends anything from the phone ([Phase 11](11-prototyping-playtesting.md)).

**Launch and after.** Polish passes and a release bar in M5 and M6, then a quiet free launch of 1.0. Updates every one to two months without pressure, Portuguese first. Selling, the apps and detailed art each wait for a written gate checked 3 months after launch; if none is met, the game stays free and finished ([Phase 12](12-polish-launch-beyond.md)). A free itch.io page is decided near 1.0 (Q28).

**Biggest risks.** Is the work fun (tested first, P-WORK). The faction AI is the biggest build (layered, simple first). Drawing many animated people on a phone (the crowd test reached 30 frames a second with 60 villagers on the director's iPhone, with nothing to spare; the weak phone comes next). One player judging their own game (outside players before any money is spent).

---

# Brief and lasting decisions

*Source: [00-brief.md](00-brief.md)*

Answers come from the director's intake answers. Anything marked **ASSUMPTION** is Claude's choice and can be changed.

| Item | Answer |
|---|---|
| Idea | You are one villager in a medieval world where AI factions play a full strategy war around you. You do your job, survive, and may take up arms, always by your own choice. Day and night cycle. |
| Genre | Strategy-world survival / life sim with light tactical combat |
| Platform | Web browser, phone first (landscape or portrait; portrait allowed from 22/11/2026), also PC. Hosted from a GitHub repo (GitHub Pages). |
| Target player | ASSUMPTION: adults 25–45 who grew up with classic real-time strategy games and now play on phones in short sittings |
| Session length | One war per run, about 20–40 minutes |
| Players | Single-player. The factions are AI. |
| Team | The director directs, decides and playtests. Claude writes all code and documents. No artist. |
| Time and budget | Weekends. €0 budget. |
| Engine / tools | Confirmed in Phase 8 (24/11/2026): Babylon.js 9 (Apache 2.0) with TypeScript, built with Vite, published on GitHub Pages; Capacitor for a phone app later. See [08-technical-design.md](08-technical-design.md). |
| Graphics and camera | 3D. Fixed isometric camera by default, first-person view one button away, always on screen (the director, 20/11/2026). Feel of classic isometric strategy games, with original art. |
| Business model | Free for now on the web link; **keep the door open to selling later**, so every asset and library must allow commercial use. If sold (Phase 9): one price for the whole game, the first war free, no ads, no paid luck, no tracking; GitHub Pages stays the free link. |
| Inspiration (feel only) | Classic real-time strategy games with villagers, armies and town centres. No names, art, units or signature rules copied. |
| Hard limits | Player never commands the AI factions. Free agency: every order is optional. Must work on a phone with two thumbs. |

### Intake decisions
The whole design on one page: [summary.md](summary.md). All phases in one file: [gdd.md](gdd.md) (built by `node tools/build-gdd.mjs`).

- **Title (Q1):** *The Hall Remembers: Bloodlines*. Subtitle kept after the name check (Q26, 24/11/2026).
- **War length (Q4):** fought to the end, no time limit (stalemate breaker in Phase 2). **Target 20–40 minutes (Q30, 25/11/2026, tried first):** 4 to 6 in-game days of 6 minutes; forced attacks from Day 4, rams from Day 5; tuned in tests.
- **Heirs (Q5):** unlimited.
- **Movement (Q6):** joystick by default.
- **Traitor's heir (Q31, 25/11/2026, until tested):** you choose, like any heir, no dice. Each family member shows where they live (the betrayed home town or the new town) and what they'd start with. *Replaces Q3's random 75/25 roll.*
- **Death:** you take over another villager of the same town, who **inherits the previous villager's possessions**. Game over only if your town falls. *Changed 24/11/2026 (S6): your household lives with you, and you choose the heir from them (Phase 2, section 2.7).*
- **Combat:** simple and tactical (tap to attack, the soldier fights on its own). Action combat to be reassessed later.
- **Art:** simple 3D shapes first; real art decided once the game is fun (Phase 6).
- **Art pick (22/11/2026, after the style test):** Quaternius CC0 models are the game's look ("Full"); plain shapes stay as the "Light" fallback for slow phones. Kenney dropped. Details: docs/06.
- **Art path (Q7, 21/11/2026):** start with low-poly 3D (plain shapes, then free packs). **End goal:** the detail level of a modern remastered isometric strategy game (the director shared a screenshot as reference): dense towns, tiled roofs, cobbled squares, lush trees and bushes, cliffs and water, team colours on banners and trims, small readable units, warm daylight. Our own original art, never copied. Reaching it needs money (paid model packs or a 3D artist) and a phone performance check; planned for after the game is proven fun.
- **Tone:** grounded with light humour. A serious and gritty version is parked in [later/serious-gritty-tone.md](later/serious-gritty-tone.md).
- **Changing sides (Q2):** yes, at great cost and risk of life. A traitor's heir starts with a bad reputation and must rebuild it. This brings in a **reputation system** with each faction.
- **World (Phase 4, Q9, 21/11/2026):** the Sunward Coast; Almara (blue) against Quintara (red); the Hall's Rememberer keeps the Roll, and reputation is what the Roll says.
- **Family across wars (Q10, 21/11/2026):** the player's family carries on from war to war, a dynasty of commoners, never lords.
- **Side across wars (Q11, 21/11/2026):** the family stays on the side it ended the last war on; a turncoat family has switched for good.
- **Voices (Q12, 21/11/2026):** no full voice acting; villagers call out short real Portuguese words ("Bom dia!", "Vamos!"), kept in Portuguese in every translation.
- **Grudges (S1, 21/11/2026):** the enemy who killed you is marked; your heir can repay the blood.
- **Phone app (22/11/2026):** if the game proves fun, it becomes a phone app (app stores) as well as the web page. Phase 8 picks tools that allow this.
- **Jobs and mastery (22/11/2026):** the player takes jobs and levels up mastery in them (Phase 5, section 2.3).
- **UI look (22/11/2026):** medieval in feel, with icons that are instantly readable and recognisable (Phase 7).
- **Vision check (S5, 24/11/2026):** the land runs out and work moves outward; the granary pays for the town's growth; raids come with warning signs; a town falls in stages. Gaps G1-G4 and G7-G9 of [the report](vision-check-villager-eye.md) are in docs 02 to 05 and 07; the rest wait for their phases.
- **Family and town life (S6, 24/11/2026):** your family lives in your house; you pick your heir from them (replaces Q8's random heir); your villagers have personality and blood traits; the town keeps a daily timetable. Picks P4, P5, P7 and P8 wait for their phases.
- **Technical design (Phase 8, 24/11/2026):** the war runs as a simulation apart from the graphics; 1 tile = 2 metres; first map 160 × 96 tiles; smallest phone the iPhone SE (667 × 375); test phones: the director's recent high-end iPhone and an older Android phone (2018) for the weak-phone check.
- **Business, ethics and legal (Phase 9, 24/11/2026):** free web link now; if sold, one price with the first war free and never ads, paid luck or tracking; children and the old are never hurt (target rating PEGI 12 / Apple 13+); no AI-made art, sound or voices; the director records the voice words and anyone else who records signs a consent; the repo is all rights reserved (`LICENSE`). See [09-business-ethics-legal.md](09-business-ethics-legal.md).
- **Scope and production (Phase 10, 24/11/2026):** seven milestones (M0 to M6), each ending on the director's phone; the first playable (M3) is one map, two towns, two jobs, raids, death and an heir; a fun check at M3 decides go, change or stop; €0 until version 1.0 has been played; building starts after the whole design document is finished (Q27). See [10-scope-production.md](10-scope-production.md).
- **Prototyping and playtesting (Phase 11, 25/11/2026):** each milestone starts with the piece most likely to fail, beginning with "is chopping and carrying fun for ten minutes" (P-WORK) in M1; three kinds of test (test wars, the director's phone check, the fun check); the director plays the fun check alone first, three wars on three days, and outside players come later (the director, 25/11/2026); the director records the voice words; nothing is sent from the phone, the player copies a summary if they choose. See [11-prototyping-playtesting.md](11-prototyping-playtesting.md).
- **Polish, launch and beyond (Phase 12, 25/11/2026):** eight polish passes in M5 and M6 with no new features; a release bar (no blocking or major bugs, saves always open); version 1.0 launches free on the web link, quietly, with no paid ads; players are heard through what they write, never through tracking; updates every 1 to 2 months without pressure, Portuguese first (1.1); selling, the apps and detailed art each wait for a written gate checked 3 months after launch; if no gate is met, the game stays free and finished. See [12-polish-launch-beyond.md](12-polish-launch-beyond.md).
- **Kept open for later:** short runs with lasting unlocks (see [later/other-parked-ideas.md](later/other-parked-ideas.md)).

---

# Phase 1: Concept

*Source: [01-concept.md](01-concept.md)*

*Draft 20/11/2026, S01-DESIGN. Approved by the director ("go").*

### Title
**The Hall Remembers: Bloodlines** (chosen by the director 20/11/2026, Q1). Check it against existing games before going public.

Other names that were considered:

| Theme | Suggestions |
|---|---|
| The family line | **Hearthline** · **Heirs of the Field** · **Bloodline & Barley** |
| From farm tool to weapon | **Sickle to Sword** · **From Furrow to Fray** · **Plough & Pike** |
| The nobody in the war | **Common Blood** · **Lowborn** · **One of Many** |
| Reputation and betrayal | **Turncoat's Heir** · **The Hall Remembers** · **Grain & Grudge** |
| Day and night | **Dawn Toil, Dusk War** · **Hold Till Dawn** |

### High concept (one sentence)
A real-time strategy war seen from the ground: you are one villager in an AI-run town, and each day you choose whether to work, hide, or fight.

### Elevator pitch
Two AI kingdoms grow, gather and go to war on the same map, playing a full strategy game against each other. You are not their ruler: you are one of the villagers. Chop wood, farm, carry stone, earn coin, and when the horns sound at dusk, decide whether to take up a spear, guard the walls, or bar your door. Die, and your heir picks up your tools and your savings, and the war goes on.

### Design pillars
Every feature must serve at least one. If it serves none, it gets cut.

| # | Pillar | What it means in practice | Test for a new feature |
|---|---|---|---|
| 1 | **Small person, big war** | You only ever control yourself. The camera stays close; armies are bigger than your screen. | Does it give the player command over others? Then cut it. |
| 2 | **Your choice, your risk** | Every order from the chief is a request. Obeying earns pay and standing; ignoring it is allowed and has consequences. | Is there a real "no" option with a cost? |
| 3 | **The town lives without you** | The AI factions play a real game. Your work helps (the wood you chop becomes the wall), but nobody waits for you. | Would this still happen if the player stood still? |
| 4 | **Day for work, night for fear** | Daylight is for the economy; night brings raids, low sight and higher stakes. | Does it change with the time of day? |
| 5 | **A whole war in one sitting, on a phone** | 20–40 minutes, two thumbs, readable on a small screen. | Can it be done with two thumbs in landscape, and read at phone size? |

### Target audience and motivations
- **Who:** ASSUMPTION: adults 25–45 who loved classic real-time strategy games and now play on phones in short sittings; also fans of survival and life-sim games.
- **Motivations, in order:**
  1. **Autonomy:** "I decide what kind of villager I am" (farmer, hauler, soldier, deserter).
  2. **Stories that tell themselves:** "My farmer held the gate alone at night, died, and his daughter finished the war as a captain."
  3. **Mastery:** reading the war (when to work, when to hide, when a battle is winnable) and surviving to the end.
  4. **Ownership:** your house, your savings and your gear pass down your family line.

### Unique selling point
Strategy games put you above the war; survival games put you in an empty world. This one puts you **inside a strategy war that is really being played by AI**: armies march because the AI decided to attack, not because a script said so. You are a single unit with a will of its own. No popular game we know of does exactly this on a phone.

### The player fantasy
"Be the nobody who lives through the war, and maybe becomes the hero no chronicle will name."

### How "inherits possessions" works (proposal)
The director asked that the next villager inherits the previous one's possessions. Proposal:
- **What you keep:** everything at home (house, storage chest, savings, unlocked skills as "family know-how" at a reduced level).
- **What you lose:** what you were carrying when you died. It drops where you fell and can be picked up if you get there before the enemy does.
- **Why:** death still hurts (you lose what was on you and some time), but it never wipes your progress. It also makes "bank your coin at home before the night raid" a real choice, which serves pillars 2 and 4.

### Reputation (added 20/11/2026, the director's answer to Q2)
Each faction keeps a reputation score for you, from **−100 to +100**. You start at **+10** with your home town and **−40** with the enemy. Reputation is how the AI decides what it lets you do. It serves pillar 2 (every choice has a cost) and gives the family line something to protect.

| Level | Score | What it means |
|---|---|---|
| Outcast | −100 to −50 | Guards attack on sight. No jobs, no shop, locked out of the Hall at night. |
| Distrusted | −49 to −10 | Only the worst-paid jobs. No weapons inside the walls. Hall shelter only if there is room. |
| Common | −9 to +29 | Normal jobs and prices. |
| Trusted | +30 to +69 | Can enlist in the army, better pay, a place in the Hall during raids. |
| Honoured | +70 to +100 | Can lead a squad of volunteers (they follow you, you don't command them), lower prices, heir gets a head start. |

**First-pass gains and losses** (balanced in Phase 5):

| Action | Change |
|---|---|
| Finish an order from the chief | +3 |
| Deliver a full load of goods | +1 |
| Fight in a battle and survive | +5 |
| Guard the walls through a night | +3 |
| Ignore an order | −2 |
| Flee from a battle you joined | −8 |
| Caught stealing | −15 |
| Defect to the enemy | your old town drops to −100 |

**Heirs inherit reputation too:** the heir starts with **half** of your score at death. A hero's child starts well liked; a coward's child starts with a stain to wash out.

### Changing sides (added 20/11/2026, the director's answer to Q2)
You can defect to the enemy town, **at great cost and risk of life**.

1. **Decide and cross.** Walk out of your town and across the land between the two sides. Your old town's scouts and guards attack you if they see you leave carrying weapons or stolen goods.
2. **Approach unarmed.** Enemy guards attack armed strangers. Drop your weapon near their walls to be let in for questioning.
3. **Prove yourself.** You join the enemy at **Outcast (−60)**. You raise it by bringing something they want: news of your old town's army, goods, or fighting for them. Until you reach Distrusted you sleep outside the walls, where night is most dangerous.
4. **What you lose:** your house, chest and savings stay behind and are taken by your old town. You keep only what you carry. Your old town marks you as a traitor (−100) for the rest of the war.

**If a traitor dies:** the heir carries the **"traitor's child"** mark and has to build their name back up, one order and one battle at a time. You **choose the heir**, as with any death (the director, Q31, 25/11/2026, until tested; this replaces the earlier 75/25 roll of Q3). A child born before the defection lives in the betrayed town, one born after lives in the new town, and each card in the heir pick shows where they live and what they'd start with:

| Family member | The heir... | Starts in | Reputation there | Reputation with the other side | Inherits |
|---|---|---|---|---|---|
| **Born before** | grew up in the town that was betrayed | Old home town | −40 (Distrusted) | Outcast | Nothing: the family home was taken. Only what the traitor dropped, if it can be found. |
| **Born after** | was born in the new town | New town | −40 at best (half the traitor's score, capped at −40) | Outcast | What the traitor built up in the new town |

**Why −40 and not Outcast in their own town:** an Outcast is attacked by guards on sight, so the heir could not play. −40 keeps them inside the walls, but with the worst jobs and no weapons until they earn trust.

**Why it's worth building:** it is the strongest expression of free agency (pillar 2), and it creates the stories players remember ("my father betrayed us; I fought to clear the family name").

**Cost:** two reputation scores, a defection route and guard reactions. Moderate. The reputation system was needed anyway, because it is also how the chief decides who gets orders, pay and weapons.

---

### Phase 1 summary
- *The Hall Remembers: Bloodlines*: a strategy war seen through one villager's eyes.
- Reputation with each side decides your jobs, pay and safety; you can defect, at a high cost, and your heir inherits the stain.
- Two AI kingdoms play a real war; you only control yourself.
- Five pillars: small person / your choice / town lives without you / day vs night / whole war on a phone.
- Death passes your home and savings to an heir; what you carried is dropped.

### Decisions and why
| Decision | Why |
|---|---|
| Two AI factions in the first version (yours + one enemy) | A believable strategy AI is the hardest piece to build; one rivalry is enough to prove the idea. 3–4 factions later. |
| Player never commands others (pillar 1) | It is what makes the game different from the games that inspired it. |
| Inheritance keeps home, loses carried items | Keeps death meaningful without wiping progress. |
| Reputation per faction, half passed to the heir | The director's Q2 answer. One number drives jobs, pay, weapons and shelter, and makes the family line matter. |
| Defecting costs your home and savings, starts you as Outcast | "Great cost and risk of life" (the director). Keeps it a dramatic choice, not a shortcut. |
| Original names from day one (no "Town Center", no copied unit or resource sets) | Keeps the "sell later" door open and avoids looking like a copy. The building at the heart of the town will be called the **Hall** (ASSUMPTION). |

### Open questions and risks
- ⚠️ **Is the villager's job fun?** Gathering can feel repetitive. This is the biggest design risk; it is the first thing built in M1 (P-WORK, [Phase 11](11-prototyping-playtesting.md), section 3), with two backup work ideas if it fails.
- ⚠️ **The strategy AI is a big build.** It must expand, gather, build and attack on its own. We'll keep it simple (scripted build orders plus a few decisions) and grow it.
- ⚠️ **Phone performance:** two armies of 30–60 units each plus villagers. Test early on the director's phone.
- ⚠️ **Folder name:** the project folder mentions a famous game. Fine locally, but the public repo and game must not use that name.
- ✅ Q1: title is **The Hall Remembers: Bloodlines**.
- ✅ Q2: yes, you can change sides, at great cost and risk; the heir carries the traitor's mark. See "Changing sides" and "Reputation" above.
- ✅ Q3: random, 75% the old home town (born before), 25% the new town (born after). *Replaced 25/11/2026 by Q31.*
- ✅ Q31: you choose the traitor's heir like any heir, no dice; each shows where they live and what they'd start with (the director, until tested). See "Changing sides".

---

# Phase 2: Core gameplay

*Source: [02-core-gameplay.md](02-core-gameplay.md)*

*Draft 20/11/2026, S01-DESIGN. Approved by the director ("go"). All numbers are first-pass and get balanced in Phase 5.*
*Updated 24/11/2026: land that runs out, the "job ended" moment, edge camps, food from the land, raid warnings, enemy outposts and a slow fall of the Hall ([vision check](vision-check-villager-eye.md) gaps G1-G4 and G7-G9, S5); a family at home, choosing the heir and the town's timetable (S6, picks P1, P2, P6). All approved by the director.*

### 1. The three loops

#### Core loop (every few seconds)
**Look → pick a job → work → carry → deliver → get paid → look again.**

1. **Look:** check the sky (time of day), the horn (danger), the notice board (orders).
2. **Pick a job:** tap a tree, field, stone pile or order.
3. **Work:** your villager works on their own. A ring pulses every 1.5 s: tap it on the beat for a **good stroke** (+50% speed for that stroke). Optional, so you can play one-handed, but it rewards attention. This is our answer to "is gathering boring?" and must be prototyped first.
4. **Carry:** a full load slows you by 20%. Bigger loads (later bags) pay more but make you slower and give you more to lose.
5. **Deliver:** drop it at the right store (timber yard, granary, stone pile, building site). You get **coin** (yours) and the goods go into **your faction's stock** (the AI's).
6. **React:** at any moment the world can interrupt: a wolf, an enemy scout, the war horn, dusk, or **your patch running out** (section 2.2).

#### Session loop (one war, 20–40 min)
| Time | What happens | What the player does |
|---|---|---|
| 0–1 min | New map, your villager wakes at home on Day 1 | Learns to work and deliver (taught by play, Phase 3) |
| Days 1–2 | Both AI towns grow: more villagers, houses, walls | Earn coin, take orders, buy a better tool or a bag |
| Days 2–3 | Scouts, then the first raids at night | Choose: keep working, guard the walls, or answer the muster |
| Days 3–5 | Armies clash; buildings burn; the war tips one way | Fight, flee, haul for the army, or defect |
| Day 5 onwards | The war is fought to the end: it only stops when one Hall falls | Survive to the end |
| End | **The Chronicle**: what you and your bloodline did | Read your story, see the score, start a new war |

**One in-game day = 6 real minutes:** day 4 min, dusk 30 s, night 1 min 30 s. A typical war of 4–6 days = 24–36 min, inside the **20–40 minute target** (the director, Q30, 25/11/2026: tried first, tuned in tests). **No time limit** (the director, Q4).

**Stalemate breaker** (so a war can't drag on for hours): from Day 4 each AI must launch a full attack at least every 2 nights; from Day 5 both sides can build siege engines that break walls fast. Target: 95% of wars end by Day 7 (about 40 min). *Changed 25/11/2026 (Q30): was Day 6, Day 8 and Day 10 (60 min).*

**Saving mid-war:** because a war has no time limit and phones get interrupted, the game saves automatically at every dawn and whenever the app goes to the background.

#### Meta loop (why you come back)
- **The Chronicle book:** every war is saved as a short story page: your bloodline (names, how each one died), deeds, side, result. Players come back to write a better story.
- **Deeds:** named achievements ("Held the gate alone at night", "Turncoat who won the war", "Three generations in one war").
- **Harder wars:** difficulty levels and map types (river, forest, hills) unlock by finishing wars.
- **Parked:** lasting unlocks between runs (starting skills, gear). See [later/other-parked-ideas.md](later/other-parked-ideas.md). The Chronicle is built so this can be added.

### 2. Main mechanics and their rules

#### 2.1 Time of day
| Phase | Length | Rules |
|---|---|---|
| Day | 4:00 | Full sight (10 tiles). Orders posted at dawn. Normal pay. |
| Dusk | 0:30 | Bell rings. Sight shrinks. Shops close at the end of dusk. |
| Night | 1:30 | Sight 4 tiles (6 with a torch). Wolves outside the walls. The AI prefers to raid at night. Night work pays **+50%**. |

#### 2.2 Jobs and gathering (first version)
| Job | Where | One load | Time to fill (no good strokes) | Pay per load |
|---|---|---|---|---|
| Woodcutter | Forest | 10 timber | 20 s | 2 coin |
| Farmer | Fields near town | 10 grain | 15 s | 1 coin |
| Quarry worker | Stone outcrops | 8 stone | 25 s | 3 coin |
| Builder | Building sites | carry 1 load of materials to the site | depends on walk | 1 coin + 1 reputation |

Further out = better resources and more danger. Forests near the enemy hold more timber.

**The land runs out (G1).** Nothing gives forever, so the place you work keeps moving:

| Resource | Holds | When it's used up |
|---|---|---|
| Tree | 3 loads (outer forests: 4) | Becomes a stump; a sapling grows back after 3 in-game days |
| Stone outcrop | 10 loads | Gone for this war |
| Field | 4 loads per sowing | Lies bare until a farmer re-sows it (10 s); ripe again the next dawn |

Near the Hall the woods thin out by about Day 3, so by mid-war the timber is a long walk away, closer to the enemy. A map holds enough to finish a war, but not close to home.

**The "job ended" moment (G2).** When the tree, rock or field you're working runs out, your villager never just stands there. A short hint shows up to three choices: **next patch** (with an edge arrow to the nearest one), **notice board**, or **ask the Steward** (who points to whatever the town lacks most). The Action button changes to match.

**Walking is the cost; camps are the frontier (G3).** Time spent walking is time not earning. The Warden builds small **drop-off camps** (a timber camp, a stone camp) at the edge of the worked land and moves them outward as it's used up; they count as stores. Building or moving a camp is a builder order. Loads from beyond the outermost camp pay **+1 coin** (danger money), so a long walk earns less per hour but more per load.

#### 2.3 Orders (how the AI asks for your help)
The AI chief (the **Steward**) posts orders on the Hall's notice board **based on what the AI actually lacks**. If the AI is short of timber for a wall, you see a timber order.

| Example order | Reward | Deadline |
|---|---|---|
| Bring 3 loads of timber to the east wall site | 8 coin, +3 reputation | Before dusk |
| Guard the north gate tonight | 6 coin, +3 reputation | Until dawn |
| Answer the muster (join the army) | 10 coin per battle survived, +5 reputation | When the horn blows |
| Scout the enemy camp | 12 coin, +4 reputation | 1 day |

**You can ignore any order.** Ignoring costs −2 reputation; failing an order you accepted costs −4.

#### 2.4 Reputation and changing sides
As set in [Phase 1](01-concept.md): −100 to +100 per faction, five levels, half passes to the heir, defection at great cost.

#### 2.5 Health and hunger
- **Health 100.** Heals 1 per second while resting at home or in the Hall; otherwise 1 every 5 s.
- **Hunger 100**, drops to 0 over 1.5 in-game days. At 0 you lose 1 health every 3 s. A bread loaf (2 coin) restores 50.
- Keeps coin flowing out and makes home matter.

**Food from the land (G4).** Bread isn't the only way to eat:
- **Foraging:** berry bushes, birds (a snare checked at dawn) and, on the coast, shellfish at low tide. Free, but slow, and only outside the walls.
- **Seasons:** each war (chapter) happens in one season, which decides what can be found: berries in summer, nuts and mushrooms in autumn, very little in winter.
- **Look-alikes:** some plants look like good food and aren't (−20 health, a gloomy line from the Rememberer). Once a family member has eaten one, the family knows it for good, shown as a small mark when you look at the plant.
- **Bread follows the fields:** the Baker's price follows the granary. Bread costs 2 coin normally, 3 when the granary is low, 4 during a siege or after the fields burn.

**What food means to the town:** the town doesn't eat from its stock. The granary pays for **growth**: each new villager costs the town 50 grain, and a new town stage needs stored grain (Phase 5, section 3.2). Empty fields mean no new people and no next stage. Your hunger bar is your own family's matter, paid in coin or foraged food.

#### 2.6 Taking up arms (simple and tactical)
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

#### 2.7 Your family and the bloodline
**Your family lives in your house (P1).** You never live alone. Besides you, the household has 2 to 4 people: a spouse or a brother or sister, sometimes an old parent, and 1 or 2 children. They are real villagers you see every day: they eat at home, sleep there, tend the garden and run small errands near the house. At least one of them is always of working age.
- **In a raid** the adults are in danger like anyone else. You can run home and lead them to the Hall (they follow you); getting them there earns a Chronicle line. If you don't, each one may hide, flee or be hurt.
- **Children and old parents are never hurt** (Phase 9, section 3.1). When the raid bell rings they run to the cellar or the Hall on their own, and raiders walk past them. They follow you to the Hall too if you come for them.
- **Adults can die.** A family member killed in a raid is gone for this war: a grave by the chapel and a line in the Chronicle.

**When you die:**
1. You fall. A short card: name, years lived, what they're remembered for.
2. What you carried drops in a sack at that spot. It stays for 1 in-game day, then it's looted.
3. **You pick the heir (P2)** from the living family members of working age. Each shows their age, a trait (Phase 4, section 7.2) and the job they're good at. The chosen one carries on with the house, chest, savings and half your reputation (traitor rules in Phase 1).
4. **No one left?** A cousin walks in from the outer farms: same family name, no knack, about 30 s more to arrive.
5. **About 30 s lost**, not the war.
6. **Unlimited heirs** (the director, Q5): there is always a cousin, so the line never runs out. Death costs items, time and reputation, never the run.

This replaces the earlier rule "the heir is a random son or daughter" (Q8): the director chose P2 on 24/11/2026.

#### 2.8 Factions (run by the AI)
- **First version:** 2 factions, each starts with a Hall, 6 villagers and 2 guards.
- The AI runs a simple strategy plan: gather → build houses → build walls → train soldiers → scout → raid → full attack. It reacts to what it sees (rebuild after raids, call the muster when attacked).
- **Size limit:** up to 30 villagers + 30 soldiers per faction; with households, wolves and the Peddler the world holds up to 256 living beings, of which about 60 are drawn at once (phone performance, [Phase 8](08-technical-design.md), section 7).
- **Growth costs grain:** a new villager arrives only when the granary can pay 50 grain (section 2.5).
- **The enemy moves in (G8):** from Day 3 an AI may put up an **outpost** near the other town's outer fields or woods: a small palisade camp with 2 or 3 guards. Its raids start closer and its gatherers take the woods there. A villager who spots it can **report it** to the Captain (+3 reputation, 6 coin, and a "burn the outpost" order appears) or **help burn it** with a torch during a muster (Phase 5, section 3.3).

#### 2.9 Warnings before a raid (G7)
A raid should never come out of nowhere. In the in-game hours before one, signs build up, one by one:
- an enemy scout seen at the edge of the fields
- smoke on the horizon (a farm burning further out)
- a wounded runner coming in from the outer camps
- gossip turns worried ("Bram saw red cloaks by the ford")
- more guards on the walls, gatherers coming home early (section 2.10)

**The bell is rung by a person:** the watchman on the tower sees the raiders and rings it. If the watchman is killed first, there's no bell, so guarding the tower matters. On normal difficulty the bell rings at least **60 seconds** (real time) before the raiders reach the walls, enough to reach shelter from the outer camps.

#### 2.10 The town's timetable (P6)
Neighbours keep a daily routine you can learn:

| Time | What the town does |
|---|---|
| Dawn | Bell; orders posted; workers walk out to the fields, woods and quarry |
| Midday | Meal at home or at the Baker's; the market is busiest |
| Afternoon | Back to work; builders at the sites |
| Dusk | Workers come home; some go to the chapel; shops close at the end of dusk |
| Night | Houses and shops locked; a **night watch** walks the streets |

- **The night watch** stops anyone walking inside the walls at night with a weapon who isn't on a guard order or the muster: "Where are you going with that?" Stand down and walk on, or lose 2 reputation.
- **Idle neighbours are visible (G5):** when work runs out, people stand around the square and say so ("No work at the woods"). A crowd of idle people is a sign the town is in trouble.
- **A change in the routine is a warning:** more guards, workers home early or shops shut at midday mean trouble is coming (section 2.9).

### 3. Win, lose and fail states
| State | When | What it costs you |
|---|---|---|
| **Victory** | The enemy Hall falls while you live on the winning side | Nothing; best Chronicle page |
| **Defeat** | Your side's Hall falls | The run ends. Your deeds still go in the Chronicle. |
| **Death** (fail, not loss) | Health reaches 0 | Carried items, ~30 s, half your reputation |
| **Outcast** (fail) | Reputation below −50 in your town | Locked out, attacked by guards; you must flee, earn it back, or defect |

"Your side" is the town you live in at the end. A turncoat whose new side wins gets a Victory, with "Turncoat" written in the Chronicle.

**The fall of the Hall (G9).** Defeat isn't a sudden end. Once the enemy breaks in, the town falls in stages over about **2 to 3 minutes**: the outer fields burn, then the houses, then the Hall is stormed. During the fall you still choose:
- **save the home chest:** carry it out (you're slow while carrying it). If it reaches safety, its coin and any heirloom are saved for the next chapter.
- **save your family:** lead them to the watchtower or into the woods.
- **carry bread** to the people sheltering at the watchtower.
- **fight to the last** at the Hall door.

Each choice becomes a Chronicle line. The run ends when the Hall falls, as before.

### 4. Camera and view (added 20/11/2026, the director)
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

### 5. Controls
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

### 6. Game systems
| System | What it does | Inputs | Outputs | Connects to |
|---|---|---|---|---|
| Time | Runs day, dusk, night | Real time | Light level, sight, shop hours | AI (raid timing), Combat, Pay |
| Map | Terrain, resources, paths | Map seed | Tiles, resource spots, walk paths | Jobs, AI, Movement |
| Land | Resources run out and regrow; camps move outward | Work done, days passed | Patches left, camp spots | Jobs, Faction AI, Orders |
| Town timetable | Neighbours' daily routine, locked doors, night watch | Time, danger level | Where people are, warning signs | Villager AI, Time, Raid warnings |
| Raid warnings | Signs before a raid; the watchman's bell | Faction AI raid plans | Scouts, smoke, runners, bell | Time, Feedback, Timetable |
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
| Family | Your household at home | Raids, deaths, chapter start | Family members, heir choices | Bloodline, Villager AI |
| Bloodline | Heirs and inheritance | Death, your heir pick, traitor flag (Q31) | New villager, starting reputation | Family, Reputation, Chronicle |
| Defection | Changing sides | Player choice, guards' reaction | New faction, Outcast start | Reputation, Bloodline |
| Chronicle | Records the run | Deeds, deaths, result | Story page, score, deeds | Meta loop |

---

### Phase 2 summary
- Core loop: pick a job, work with optional on-beat taps, carry, deliver, get paid, react to danger.
- One war = 4–6 in-game days of 6 minutes each (20–40 minutes, Q30), fought until a Hall falls; a stalemate breaker keeps it near 40 minutes at most.
- 3D world, fixed isometric camera, with a first-person view one button away; joystick movement.
- The AI's real shortages become orders on the notice board; you may ignore any of them.
- Combat: tap to target, auto-attack, plus Brace and Heavy strike; join and leave the army freely, at a reputation cost if you flee mid-battle.
- The Chronicle book records every war and your bloodline: that's the reason to come back.
- The land runs out and work moves outward; the granary pays for the town's growth; raids are signalled in advance and a town falls in stages.
- You live with your family, and when you die you choose which of them carries on.

### Decisions and why
| Decision | Why |
|---|---|
| Joystick as the default, tapping objects still works (the director, Q6) | Works in both views; tapping a tree or a field still walks you there. |
| 3D with isometric and first-person views (the director) | First person needs a real 3D world; both views share the same rules so neither is "the right way" to play. |
| On-beat "good stroke" tap while working | Gives gathering a skill element without forcing it. Biggest risk, prototype first. |
| Orders come from the AI's real shortages | Makes "the town lives without you" visible: your work fills a real gap (pillar 3). |
| Fight to the end, with a stalemate breaker (the director, Q4) | The war has a real ending; forced attacks and siege engines keep it near 40 minutes at most (pillar 5, Q30). |
| Unlimited heirs (the director, Q5) | Death never ends the run; it costs items, time and reputation. |
| Night pays +50% | Risk for reward at night (pillar 4). |
| Formation bonus | Rewards sticking with the army without forcing it (pillar 2). |
| Land runs out, camps move outward (S5, G1-G3) | In the vision check, the land running out was what changed every worker's day. It gives the war a shape: work drifts toward the enemy. |
| Food pays for the town's growth (S5, G4) | In the vision check, food decided whether a town could grow; nobody went hungry. Links the fields, the bread price and the town's growth. |
| Warnings before raids, a slow fall (S5, G7-G9) | Gives a villager time to react, and makes defeat a story instead of a cut to black. |
| Your family at home, you pick the heir (S6, P1, P2) | The next villager is someone you've already seen and cared about, not a stranger. |
| The town keeps a timetable (S6, P6) | A routine you can learn, and changes to it that read as warnings. |

### Open questions and risks
- ⚠️ **The faction AI** is still the biggest build. The 7-step plan above is the smallest version that feels like a real war.
- ⚠️ **Tap-to-move during combat** can mis-tap on a crowded screen. Tapping an enemy targets it, tapping ground moves; we may need a larger "tap area" around units.
- ⚠️ **20–40 minute wars** (Q30) are tried first: if wars feel rushed, the stalemate breaker's days move later in the data file; the test wars and the fun check decide (Phase 11).
- ⚠️ **Six-minute days** may feel short or long: tested by P-DAY in M1 and tuned in the data file ([Phase 11](11-prototyping-playtesting.md), sections 3 and 8.1).
- ⚠️ **3D on a phone browser:** about 130 moving 3D units plus a town must run smoothly. Needs simple models, many copies of the same model drawn at once, and fog to limit how far first person draws. Test early on the director's phone.
- ⚠️ **First-person view doubles some work:** the world must look right up close (ground, walls, faces), not just from above.
- ✅ Q4: fight to the end. ✅ Q5: unlimited heirs. ✅ Q6: joystick.
- ✅ Q7: start low-poly, end goal is the detail of a modern remastered isometric strategy game, in our own art (see the brief).

#### Honest note on matching the look of a famous isometric strategy game
- **What we can match:** the feel of that genre: a fixed isometric camera, a detailed medieval town, small readable units, warm daylight colours, and clear team colours.
- **What we can't and shouldn't do:** copy that game's art, buildings, units or interface. It's someone else's work and would block selling later.
- **What fits €0 and no artist:** that game's detailed, realistic look comes from a large professional art team. With free 3D model packs that allow commercial use, the realistic target is a **clean, slightly stylised low-poly 3D look**: simple shapes, good lighting and colour. It can look very good, but it won't look like a big-budget game.
- **Order of work stays the same:** plain 3D shapes first (boxes and cylinders) until the game is fun, then the real look. The full art direction comes in Phase 6.
- **Engine:** Phaser (the 2D engine assumed in the brief) can't do 3D. Recommendation: **Babylon.js**, a free 3D engine for web browsers (Apache 2.0 licence, allows selling). It runs on phones and PC from the same GitHub page, and Claude can write it all as code. Confirmed in [Phase 8](08-technical-design.md) (Babylon.js 9).

---

# Phase 3: Player experience

*Source: [03-player-experience.md](03-player-experience.md)*

*Draft 21/11/2026, S01-DESIGN. Approved by the director ("go"). Numbers are first-pass.*

### 1. Emotional arc

#### First 10 minutes (the first war, Days 1–2)
| Minute | What happens | What the player should feel |
|---|---|---|
| 0–1 | Wake at home at dawn. The town bustles; your neighbour waves and walks to the forest. | Curious: "the town is alive" |
| 1–3 | Chop your first tree, hit a few good strokes, deliver, hear the coin. | Competent: "I get it" |
| 3–5 | Bell at the notice board: the first order. You fill it and see the wall grow with your timber. | Useful: "my work counts" |
| 5–6 | First dusk bell. Light fades, a wolf howls far away. The first-person button pulses once. | Uneasy: "I should get home" |
| 6–8 | First night, nothing attacks (guaranteed). You look around in first person, then sleep or work for night pay. | Relief, and a taste of fear |
| 8–10 | Day 2: a scout in red is seen at the forest edge. Gossip about the other town. | Anticipation: "something is coming" |

#### First whole war (20 to 40 minutes)
Curiosity → competence → **first loss** (a raid burns a house, or your first death and your heir's card) → **first real choice** (answer the muster or not) → **first battle** → the war tips → the Hall falls (yours or theirs) → the Chronicle page. The player should finish with a story they want to tell.

#### Full game (many wars)
Mastery and authorship: reading the war like a veteran, trying different lives (farmer who never fights, soldier, turncoat, three-generation hero), filling the Chronicle and its deeds, raising the difficulty.

### 2. Onboarding: taught by playing
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

### 3. Difficulty
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

### 4. Feedback and game feel
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

### 5. Accessibility
| Area | What we do |
|---|---|
| Controls | Joystick size and side can change (left-handed). Tap-to-move option. Good strokes can be set to automatic (normal speed, no taps). All buttons at least 48 × 48 pixels. PC keys can be changed. |
| Visuals | Team colours always paired with a banner shape (blue = square banner, red = forked banner) so colour-blind players can tell them apart. Enemies get an outline. 3 text sizes. Night brightness slider. "Reduce flashing and shaking" switch. |
| Audio | Every important sound has a visual sign (horn = edge banner, wolves = paw icon pointing their way, bell = sky colour). Captions for all spoken lines. Separate music, effects and voice volume. |
| Difficulty | Hearth level from the start; Second wind; game speed 0.75× option. |
| Reading load | Hints of 8 words or fewer with icons. The game can be played without reading. All text in data files, ready for translation (English first, Portuguese next: Phase 12). |

---

### Phase 3 summary
- The first 10 minutes go from curious to useful to uneasy, with a guaranteed safe first night.
- The first war is a guided war; every mechanic is taught by a situation with one short hint at most.
- Defection is never taught: it's a secret players discover through gossip.
- Three difficulty levels (Hearth, Banner, Blood) change numbers, not rules; optional Second wind after repeated deaths.
- Every key action has sight, sound and (on Android) vibration feedback; nothing depends on sound or colour alone.

### Decisions and why
| Decision | Why |
|---|---|
| Guided first war on a fixed map | A known map lets us time each lesson; random maps come after. |
| No raid before Day 3 in the first war | The player must learn the work loop before fear arrives (pillar 4 works only if day feels safe first). |
| Defection hidden, found through gossip | Discovering it yourself makes it feel like your own idea (pillar 2). |
| Second wind is shown openly | Help that hides itself feels like cheating when noticed. |
| Team colour always paired with a shape | About 1 in 12 men can't easily tell red from green or similar colours. |

### Open questions and risks
- ⚠️ **The guided war** is extra content to build and keep working as the game changes. Keep it short (Days 1–3) and data-driven.
- ⚠️ **The on-beat ring** may annoy some players; the automatic option covers this, but playtests decide if it stays: P-WORK and the good-strokes number ([Phase 11](11-prototyping-playtesting.md), sections 3 and 5).
- ⚠️ **iPhone has no vibration in the browser**, so iPhone players rely on sound and visuals only.
- ✅ Q8: the heir is a **random son or daughter** (the director, 21/11/2026). No choice screen. **Replaced 24/11/2026 by S6, pick P2:** you choose the heir from your living family (Phase 2, section 2.7; heir card in Phase 7, section 3.8).

---

# Phase 4: World, story and characters

*Source: [04-world-story-characters.md](04-world-story-characters.md)*

*Draft 21/11/2026, S02-WORLD. Approved by the director ("go"). Names approved by the director (Q9); family carries on between wars (Q10); grudges added (S1). Before going public, each name gets a quick search against existing games and real places.*
*Updated 24/11/2026: your household and choosing the heir (P1, P2), traits for your own villager (P3), and three new story events: trouble coming, an outpost, the town falls ([vision check](vision-check-villager-eye.md) G7-G9). Approved by the director (S5, S6).*

### 1. The world in one paragraph
**The Sunward Coast** is a warm, dry shore of terraced hills, cork-oak woods, cypress lanes and white salt flats, where a river meets the sea. It's a made-up land with a Mediterranean and Iberian feel (see [visual-direction.md](visual-direction.md)). There's no magic, no dragons and no empire watching over it. Small towns live off grain, olives, fish and salt, and every town is ruled from its **Hall**: a feasting hall, courthouse, granary and last refuge in one building. Two of those towns have hated each other for longer than anyone can say.

### 2. Why the Hall "remembers"
This turns the title into a rule of the world, so the reputation system belongs inside the story instead of being a number stuck on top.

- Every Hall keeps **the Roll**, a long book where the **Rememberer** writes down what every villager does: loads delivered, orders filled, nights on the wall, battles fled, thefts, betrayals.
- Your **reputation is simply what the Roll says about you.** When a guard lets you in, the Steward pays you more, or the muster refuses you, they're acting on the Roll.
- **Families are written together.** That's why an heir starts with half their parent's standing: the Rememberer turns the page and the old ink still shows through.
- **The Chronicle** at the end of each war is the Rememberer's account of the war, written in the Rememberer's voice.
- The on-screen line **"The Hall remembers"** (Phase 3) is the Rememberer's pen scratching. A small feather icon appears next to the reputation bar.

### 3. The long feud
**Grounded, with light humour.** The war is serious when you're in it, but how it started is a bit ridiculous.

> Between the two towns lie the salt flats, and in the middle of the flats stands the **Boundary Stone**. Every few years someone moves it a few paces in the night. Nobody alive remembers who moved it first. Both Halls remember exactly who moved it last.

- **What's really at stake:** the salt flats (salt is wealth on this coast), the only bridge across the river, and the good farmland on the terraces.
- **Each war is one chapter of the feud.** A new war means a new generation, a new valley along the coast, or a new spring. That's why every war has a fresh map, and it still feels like one ongoing story. **Your family lives through every chapter** (Q10): the Chronicle book becomes the saga of one common family across many wars. See section 7.
- **Running joke:** at the start of every war the Boundary Stone stands somewhere new. The gossip blames the other side every time.

### 4. The two towns (first version)
Each town has its own look, voice and AI style, so the two feel different even though their rules are the same.

| | **Almara** (blue) | **Quintara** (red) |
|---|---|---|
| Banner | Blue **square** banner with a white wave | Red **forked** banner with a gold tower |
| Where | River mouth and coast, lowlands | Hill terraces and quarries, upstream |
| Lives off | Fish, grain, salt | Stone, olives, wine |
| Look (stage 3) | Harbour, wide square, low white walls, round towers | Tall stone keep, steep streets, thick walls, small domes on the towers |
| Character | Proud, talkative, a bit vain about their harbour | Stubborn, practical, quick to take offence |
| AI style | **Builders:** expand and wall up early, raid later | **Raiders:** fewer houses, soldiers sooner, night raids |
| They say of the others | "Hill goats. They'd fight a cloud for blocking their sun." | "Fish-wives. They talk a wall down instead of building one." |

- **In the first version you always start in Almara.** The AI styles give Quintara the raider role, which suits the first war and its guided lessons (Phase 3). Starting in Quintara unlocks later (Phase 5).
- **Later factions (💤):** a third town in the marshes and a band of mercenaries for hire. The data is shaped so they can be added without new rules.

### 5. Places on a war map
Maps are random (except the guided first war), but every map is built from these places, so players learn to read them.

| Place | What it is | Why it matters |
|---|---|---|
| **The two Halls** | Heart of each town, at opposite ends of the map | Defend yours; the war ends when one falls |
| **Salt flats and the Boundary Stone** | Open white ground in the middle of the map | No cover, so battles often happen here; salt piles to gather (later job) |
| **The bridge or ford** | The only easy river crossing | A natural front line; armies queue here |
| **Cork-oak wood** | Main timber source, near your town | Safe by day, wolves at night |
| **The Wolfwood** | Darker pine wood on a ridge | Best timber, many wolves, scouts hide here |
| **Quarry ridge** | Stone outcrops and cliffs | Stone, high ground for archers later |
| **Old watchtower** | A ruin on a hill, no owner | Climb it to see far (a scouting order), a hiding place at night |
| **Hermit's chapel** | A small ruin with a well | Neutral ground; the Peddler camps here |
| **The coast** | Beach, rocks, fishing boats | Scenery and fish in the first version; ships later (parked) |

### 6. Characters
**Roles are fixed; people are made fresh for each war.** Every role exists in both towns. Each person gets a random name, face, voice set and one **trait** (for example *gloomy*, *greedy*, *cheerful*, *nosy*, *brave*, *lazy*) that changes their lines and a few choices. In the guided first war the cast is fixed, so the lessons always land the same way.

#### 6.1 In your town
| Role | What they do in the game | Personality (guided first war) |
|---|---|---|
| **The Warden** | Leads the town. This is the AI "player": decides what to build, when to raid, when to call the muster. Seen rarely: at the Hall door, on the wall during an attack. | **Warden Isolda**: calm, few words, never thanks anyone |
| **The Steward** | Posts the orders on the notice board and pays for them | **Steward Tomé**: fussy, counts every coin twice, secretly kind |
| **The Rememberer** | Keeps the Roll, narrates the Chronicle | **Old Ines**: dry wit, sees everything, writes it all down |
| **The Captain** | Calls the muster, leads the army, picks squad leaders | **Captain Rui**: loud, brave, a bit too fond of speeches |
| **The Baker** | Sells bread; prices rise during sieges | **Marta**: gossip hub, knows every rumour first |
| **The Smith** | Sells and repairs tools and weapons | **Duarte**: quiet, grumbles, makes the best spears on the coast |
| **Your neighbour** | Works beside you, shares gossip, may die in a raid | **Bram** (old woodcutter). Later, rumours say he crossed over: the first hint about defection (Phase 3). |

#### 6.2 On the other side
- The same roles exist in Quintara. You mostly meet their **Captain**, their **scouts** and their **guards**, and their Warden only if you defect or storm their Hall.
- **Enemy soldiers have names.** You can see them when you target one ("Fernão the Lame, Quintara spearman"). That makes battles feel like they're between people, and it makes grudges possible (section 7.1).

#### 6.3 Neutral
| Who | What they do |
|---|---|
| **The Peddler** | A wandering trader who sells to both sides and turns up every few days at the Hermit's chapel. Buys stolen goods with no questions asked, sells rare items (a lantern, a bigger bag), and carries news. The quiet doorway to defection: "Quintara pays well for a strong back. Just saying." |
| **Wolves** | The night's danger outside the walls. No story, only teeth. |

### 7. Your bloodline
**A dynasty of nobodies** (the director, Q10: "the player is a plebeian"). Games about family lines usually follow kings and lords. This one follows a family of woodcutters, bakers' daughters and spearmen through war after war. They never rule anything; the Roll and the Chronicle are their only crown.

- **Family name:** your first war starts with a random family name (you can reroll or type your own), for example *Calvo*, *Ferreira*, *Moranda*, *Oliva*, *Pardo*, *Seixas*, *Telhado*, *Varela*. **The family carries on into every later war** (Q10).
- **Between wars:** each new war (chapter) starts with a descendant of whoever was alive at the end of the last one, some years later. The family tree in the Chronicle grows with every chapter: every villager you played, their nickname, how they died, which side they ended on.
- **What carries over** (numbers and limits in Phase 5): the family name, the family tree, earned nicknames, a small **family standing** (a reputation head start or stain from how the last chapter ended), and maybe one **heirloom** (for example the Gate-holder's axe). Coin, house and gear do not carry over, because every chapter is a new valley.
- **Turncoat families:** if your line ended a chapter on the other side, the next chapter remembers it ("the Varelas who crossed over"), and **the family stays on its new side for good** (the director, Q11). Rules in Phase 5, section 4.1.
- **Starting over:** you can always begin a new family, and old families stay in the Chronicle book.
- **First names:** random from a pool of about 200 made-up names with a coastal feel, split by gender.
- **Your household (P1, approved 24/11/2026):** you live with 2 to 4 family members: a spouse or a brother or sister, sometimes an old parent, and 1 or 2 children. They're named, have a face and a trait, and you see them every day (rules in Phase 2, section 2.7). **You pick your heir** from them when you die (P2); this replaces the earlier random son or daughter (Q8). With no one left, a cousin comes in from the outer farms.
- **Nicknames are earned.** The Rememberer gives a nickname after a notable deed, and it shows on the death card and in the Chronicle: *"the Gate-holder"*, *"Half-loaf"* (caught stealing bread), *"the Turncoat"*, *"Who-Ran"* (fled 3 battles). Nicknames are the fastest way to make a nobody feel like a person.
- **Death card** (Phase 2): name, nickname, days lived, one line from the Rememberer. For example: *"Afonso Varela, the Gate-holder. Lived 3 days. Held the north gate alone until the torches ran out."*

#### 7.1 Grudges (S1, approved by the director 21/11/2026)
- **When an enemy kills you, they are marked.** The Rememberer writes their name in the Roll, and the death card shows who did it: *"Killed by Fernão the Lame, Quintara spearman."*
- **Your heir can see them.** The killer wears a **grudge mark** for the rest of the war: a small red notch above their head in isometric view, an outline in first person. A gossip line points the way: "Fernão the Lame drinks at their east gate."
- **Settling it:** if you (or any later heir) kill the marked enemy, you get the deed **"Blood Repaid"**, +5 reputation, and a Chronicle line: *"Beatriz Varela found Fernão the Lame on the salt flats."*
- **If someone else kills them first,** the grudge closes quietly, with the line "Fernão the Lame fell. Not by your hand."
- **Limits:** only the latest 3 grudges stay marked, so the screen never fills with red. Wolves and accidents leave no grudge.
- **Why it fits:** it turns a death into a goal for the next villager ("my daughter avenged her father"), costs one name tag and one rule, and never forces you to fight (pillar 2).
- 💤 **Later (Phase 5):** grudges between families that last across chapters (the Varelas and *that* Quintara family).

#### 7.2 Traits for your own villager (P3, approved by the director 24/11/2026)
Neighbours already have one trait each (section 6). Your villagers get them too, in two kinds:
- **One personality trait**, for example *brave*, *diligent*, *thrifty*, *kind*, *loyal*, *nosy*. Acting in character earns a small reward (+1 reputation once a day, and the Rememberer notices). Acting against it leaves a **mark**; after 3 marks you get a nickname for it (a brave villager who flees three times becomes *"the Not-So-Brave"*) and the trait may change.
- **Maybe one blood trait**, passed down in the family, for example *strong back*, *keen eyes*, *quick hands*, *hardy*. Each gives a small, always-on edge (numbers in Phase 5, section 2.5). A child has an even chance of inheriting a parent's blood trait.

Traits show on the heir card, so choosing an heir means choosing a kind of person, not just a name.

### 8. How the story is told
**No cutscenes and no fixed plot.** The story is whatever happens in the war, told back to the player through five channels:

| Channel | What it carries | Example (light humour) |
|---|---|---|
| **Gossip** (villagers' passing lines, shown as speech bubbles of 8 words or fewer, Phase 3) | Rumours about the war, the enemy, other villagers | "Quintara moved the Stone again. Obviously." |
| **The notice board** | Orders, written in the Steward's fussy voice | "TIMBER. East wall. Before dusk. Properly stacked, please." |
| **Town crier and bells** | Big events: dawn, dusk, the war horn, the muster, a fire | "The muster is called! Bring your own shoes!" |
| **The town itself** | The 3 growth stages; burned houses stay black until rebuilt; graves appear near the chapel | Seeing your timber become the wall (pillar 3) |
| **The Chronicle** | The Rememberer's account at the end, plus nicknames and death cards | See the sample below |

**Story events** happen because of what the AI and the player do, never because the clock says so:

| Event | Triggered by | What happens |
|---|---|---|
| First blood | The first raid on your town | Crier, gossip turns scared, the Baker's prices go up |
| A hero falls | A villager with a nickname dies | Bell tolls, a grave appears, gossip about them for a day |
| Turncoat spotted | Any villager defects (AI or player) | Gossip, guards stop and question strangers for a day |
| The Hall is attacked | An enemy army reaches the Hall | Muster opens to everyone (Phase 2), the Warden appears on the wall |
| Feast day | The town reaches growth stage 2 or 3 | Free bread for one day, music, every villager rests at dusk |
| The Stone moves | Once per war, at random, at night | Pure gossip and a joke, plus +2 anger on both sides |
| Trouble coming | An enemy army sets out for a raid | Warning signs one by one: a scout, smoke, a wounded runner, worried gossip, then the watchman's bell (Phase 2, section 2.9) |
| An outpost appears | The enemy builds a camp near your outer fields | Gossip about strangers in the woods; whoever reports it gets the "burn the outpost" order |
| The town falls | The enemy breaks into your town for good | Fields, houses, then the Hall burn over 2 to 3 minutes; what you saved or who you led out goes in the Chronicle (Phase 2, section 3) |

#### Sample Chronicle page
> **Chapter 4: The Spring of the Burnt Bridge**
>
> The Stone was found by the olive press this year, which fooled nobody. Quintara came over the bridge on the third night, and the Varelas answered.
>
> **Afonso Varela, the Gate-holder**, held the north gate until the torches ran out. His daughter **Beatriz** took up his axe at dawn, hauled timber for the new wall, and on the sixth day stood in the line on the salt flats. She was there when Quintara's Hall fell, and she was home for supper.
>
> *Almara won. The Hall remembers the Varelas well.*

### 9. Tone rules for writing
- **Short lines.** Gossip and hints at most 8 words, orders at most 12.
- **Light humour comes from people, not from the war:** fussy stewards, vain towns, gossiping bakers, the Stone. Deaths and battles are written straight.
- **No real-world religion, nations or historic people.** Names with a coastal flavour, all made up.
- **Every line is in a data file, grouped by speaker, trait and tone**, so the gritty tone (parked) and translations (English first, Portuguese next) can be added later.
- **No swearing worse than "blast" and "rot"** for now, to keep the age rating low (Phase 9).

---

### Phase 4 summary
- The Sunward Coast: a made-up warm Mediterranean shore of salt flats, cork-oak woods and two rival towns.
- "The Hall remembers" is literal: the Rememberer writes every deed in the Roll, and your reputation is what the Roll says.
- The feud is over a Boundary Stone in the salt flats that someone keeps moving; each war is one chapter of it.
- Almara (blue, coastal builders) against Quintara (red, hill raiders); you start in Almara in the first version.
- Fixed roles (Warden, Steward, Rememberer, Captain, Baker, Smith, neighbour, Peddler), with fresh people and traits each war.
- A dynasty of commoners: your family carries on from war to war, and the Chronicle becomes their saga.
- Grudges: the enemy who killed you is marked, and your heir can repay the blood.
- The story comes from what happens, told through gossip, the notice board, the crier, the town's look and the Chronicle. Earned nicknames make every villager memorable.

### Decisions and why
| Decision | Why |
|---|---|
| Reputation = the Hall's written Roll | Makes the title, the reputation rules and the Chronicle one idea that players understand without a tutorial |
| A household you see, and you pick the heir (S6, P1, P2) | The next villager is someone you already know; a dynasty of nobodies needs faces, not just a family name |
| Personality and blood traits for your villager (S6, P3) | Gives each heir a different feel, and nicknames a second source besides deeds |
| A slightly silly feud (the moving Stone) | Fits "grounded, light humour" and keeps the war from needing a dark backstory |
| Each war is a chapter, not one long fixed story | Matches random maps and short runs; the Chronicle book still feels like a saga |
| Roles fixed, people generated | One set of systems makes endless villagers; fixed cast only for the guided war |
| The two towns play differently (builders vs raiders) | Variety from the same rules; cheap to build (just different AI numbers) |
| Always start in Almara at first | One known start makes the guided war and early testing simpler |
| Earned nicknames | Cheap to build and the strongest "story that tells itself" tool (Phase 1 motivation 2) |
| No magic, no real places | Keeps scope small and avoids real-world sensitivity; all names checked before going public |
| Family carries on between wars (the director, Q10) | One family's saga across many wars; a dynasty of commoners, not lords |
| Only house, coin and gear reset between wars | Each chapter stays a fair fresh start; the family keeps its story, not its wealth |
| Grudges marked on the killer (the director, S1) | Gives the heir a personal goal without forcing a fight |

### Open questions and risks
- ✅ **Q9:** names approved: the Sunward Coast, Almara, Quintara, the Rememberer, the Warden (the director, 21/11/2026).
- ✅ **Q10:** the family carries on between wars, a dynasty of commoners (the director, 21/11/2026). Details of what carries over go to Phase 5.
- ✅ **S1:** yes to grudges; the enemy who killed you is marked (the director, 21/11/2026). See 7.1.
- ⚠️ **Carry-over balance:** family standing and heirlooms must help a little, never decide a war. Phase 5 sets the limits.
- ⚠️ **Writing load:** traits × roles × situations means hundreds of short lines. Start with about 150 lines for the first version and grow from playtests.
- ✅ **Name checks:** no game or fantasy town called *Almara* or *Quintara* was found (web search, 24/11/2026; Phase 9, section 4.2).
- ✅ **Voice:** no full voice acting; text bubbles plus short real Portuguese words, recorded by the director (Q12; Phase 6, section 8.4).

---

# Phase 5: Content and progression

*Source: [05-content-progression.md](05-content-progression.md)*

*Draft 21/11/2026, S02-WORLD. Approved by the director ("go"). All numbers are first-pass, to be tuned in playtests (Phase 11).*
*Updated 24/11/2026: foraged food and bread prices that follow the granary, trait numbers, drop-off camps and grain for growth, enemy outposts, land that runs out, your household across chapters ([vision check](vision-check-villager-eye.md) G1-G4, G8; picks P1, P3). Approved by the director (S5, S6).*

### 1. Two kinds of progression
| | **Within a war** (one chapter, 20–40 min) | **Across wars** (the family saga) |
|---|---|---|
| What grows | Your coin, gear, practice, reputation, deeds | Your family's name, tree, standing, one heirloom, crest |
| Resets when | The war ends | Never (unless you start a new family) |
| Power gained | Real: better gear and skills make you stronger | **Small on purpose:** a head start, never a win |
| Pillar | 2 (your choice, your risk) | Phase 1 motivation 4 (ownership) and 2 (stories) |

**The golden rule:** a fully kitted veteran is about as strong as a trained enemy soldier, never a one-person army (pillar 1: small person, big war).

### 2. Within a war

#### 2.1 Coin: what a day earns
Based on Phase 2 pay and a 4-minute day:

| Source | Per day (normal play) |
|---|---|
| About 5 loads delivered (walk + work ≈ 45 s each) | 8–12 coin |
| One or two orders | 8–20 coin |
| Night work (+50%) or a night guard order | 0–9 coin |
| **Total** | **about 20–35 coin** |
| Bread to stay fed (about 1.3 loaves) | −3 coin |

A war of 6–8 days earns roughly **120–220 coin** in total. Prices are set so you can afford one big purchase every day or two.

**Later in the war the walks get longer** as the land near the Hall runs out (Phase 2, section 2.2): fewer loads a day, but loads from beyond the outermost camp pay +1 coin, so a day's earnings stay roughly the same while the danger rises.

#### 2.2 Gear and prices
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
| Bread | 2 (3 when the granary is low, 4 in a siege or after the fields burn) | +50 hunger | |
| Foraged berries, nuts or shellfish | free (found, not bought; depends on the season) | +15 hunger each | outside the walls |
| Snared bird | free (snare 5 at the general store, checked at dawn) | +40 hunger | outside the walls |
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

#### 2.3 Practice (job skill)
Phase 1 promised "family know-how". Each job has 3 ranks, earned by doing the work:

| Rank | Earned after | Bonus |
|---|---|---|
| Novice | start | none |
| Skilled | 15 loads in that job | +15% speed, good-stroke window +20% |
| Master | 40 loads | +30% speed, window +40%, the Steward pays +1 coin per load |
| Fighting practice | 3 battles survived → **Blooded**, 8 → **Veteran** | Blooded: Brace cooldown −1 s. Veteran: +10 health, and the Captain may make you squad leader at Honoured |

**When you die, your heir keeps family know-how at one rank lower** (Master becomes Skilled, Skilled becomes Novice).

**Knack:** each family member is good at one job (shown on the heir card, Phase 2, section 2.7): +10% speed in it from the start, on top of family know-how. A cousin from the outer farms has no knack.

#### 2.4 Reputation (Phase 1 list, updated)
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

#### 2.5 Traits (P3, Phase 4 section 7.2)
**Personality traits** (one each). Acting in character: +1 reputation, once a day. Acting against it: a mark; 3 marks bring a nickname and the trait may change.

| Trait | In character | Against character |
|---|---|---|
| Brave | Fight in a battle, guard a night | Flee a battle |
| Diligent | Deliver 5 loads in a day | Do no work for a whole day |
| Thrifty | End the day with more coin at home than the day before | Spend more than half your savings in a day |
| Kind | Save a villager in a raid, lead your family to safety | Leave a family member behind in a raid |
| Loyal | Answer the muster, finish an accepted order | Fail an accepted order, defect (3 marks at once) |
| Nosy | Talk to 3 neighbours in a day (you hear one extra rumour) | Go a whole day without talking to anyone |

**Blood traits** (none or one; a child inherits a parent's blood trait half the time):

| Blood trait | Edge |
|---|---|
| Strong back | +2 per load |
| Keen eyes | +1 tile of sight at night |
| Quick hands | Good-stroke window +10% |
| Hardy | Hunger drops 20% slower |
| Sure feet | Full loads slow you 5% less |

Small on purpose: a trait colours a villager, it never decides a war.

### 3. The world's content (first version)

#### 3.1 Jobs
| Job | First version | Later (💤) |
|---|---|---|
| Woodcutter, Farmer, Quarry worker, Builder | ✅ (Phase 2) | |
| Army hauler (carry food and arrows to the front) | ✅, only during a muster; 2 coin, +2 reputation per trip, no fighting needed | |
| Fisher, salt raker, olive picker, baker's helper, scout | | 💤 one or two per update |

#### 3.2 Buildings (per town)
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

**When a town moves up a stage** (AI stock, first pass): Stage 2 when it has stored 300 timber, 200 stone and 300 grain in total, and has at least 15 villagers. Stage 3 at 600 stone and 25 villagers. Usually Day 2 and Day 3–4 (wars of 4–6 days, Q30).

**Drop-off camps (G3):** a timber camp and a stone camp, small open sheds the Warden places at the edge of the worked land and moves outward as it's used up (Phase 2, section 2.2). They count as stores. Any stage.

**Growth costs grain (G4):** each new villager costs the town 50 grain from the granary. The stage thresholds above already need stored grain, so failed or burned fields slow the whole town.

**About 15 building types** in the first version (14 plus the drop-off camp), each with up to 3 looks.

#### 3.3 Enemies and dangers
| Enemy | Health / attack / defence | When | Behaviour |
|---|---|---|---|
| Wolf | 40 / 6 / 0 | Night, outside the walls, packs of 2–3 | Circles, lunges, flees from fire |
| Enemy scout | 60 / 7 / 1 | Day 2 on, at the edges | Fast, runs from fights, spots villagers for the raids |
| Spearman | 80 / 9 / 2 | Raids and battles | Fights in squads |
| Guard | 100 / 10 / 4 | Around the enemy Hall and gates | Holds its post, doesn't chase far |
| Captain | 150 / 13 / 5 | Leads big attacks, named | Buffs nearby soldiers +10% attack; killing them breaks the squad |
| Battering ram | 300 / 0 / 8, slow | Day 5 on (stalemate breaker) | Breaks gates; needs 4 pushers; burn it with a torch (5 s) |
| Outpost (G8) | 200 / 0 / 6, a building | Day 3 on, near the other town's outer fields or woods | 2 or 3 guards; raids start from it. Report it to the Captain (+3 reputation, 6 coin), or burn it with a torch (8 s) during a muster |
| 💤 Later | archer, horse rider, catapult | | |

#### 3.4 Maps
| Map type | What makes it different | Unlocked |
|---|---|---|
| **Coast (guided war)** | Fixed map, gentle enemy, first raid not before Day 3 | Start |
| **Coast** | Random; harbour, beach and salt flats | After your first war |
| **River** | A wide river with 2 crossings: the bridge and a dangerous ford | After 2 wars |
| **Hills** | Terraces and cliffs; Quintara's home ground, more stone | After 3 wars |
| **Wolfwood** | Thick forest, short sight, many wolves | After winning a war on Banner |

Map size, first pass: **160 × 96 tiles of 2 metres** (320 × 192 m; was 96 × 64, changed in [Phase 8](08-technical-design.md), section 5.1); walking from Hall to Hall takes about 2 minutes (Likely; checked in the prototype).

**Land on every map (G1):** each map holds enough timber, stone and field space to finish a war, but the patches within 20 tiles of each Hall run thin by about Day 3. Every season changes what can be foraged (Phase 2, section 2.5); the guided war is set in summer.

#### 3.5 Deeds (first version: 17)
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

### 4. Across wars: the family saga (Q10)

#### 4.1 What carries over, with limits
| Carries over | How | Limit |
|---|---|---|
| **Family name and tree** | Every villager you played, nickname, how they died, which side | none |
| **Your household (P1)** | The next chapter's villager starts with their own household (spouse or sibling, 1 or 2 children); a family member who survived the last chapter may return as the old parent | 2 to 4 people besides you |
| **Blood traits (P3)** | Passed down the line (section 2.5) | One per villager |
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

#### 4.2 Unlocks (variety, not power)
| Unlock | How |
|---|---|
| Banner difficulty | Finish your first war (any result) |
| Blood difficulty | Win a war on Banner |
| Map types | See 3.4 |
| Start in Quintara (new families) | Win a war, or end a chapter as a turncoat (that family then continues in Quintara, Q11) |
| Crest symbols (wave, tower, axe, wolf, wheat, key…) | Deeds |
| Family colours on your door and clothes trim | 3 chapters played |

#### 4.3 Chronicle score
Each chapter gets a short score, for players who like numbers:
**days alive × 10 + deeds × 50 + generations × 25, × 1.5 if your side won, × 1.25 on Blood.**
The family's total score is the sum of all its chapters.

#### 4.4 The statue
If a member of your family earns 3 or more deeds in one chapter and your town wins, the town raises a **statue** of them in its stage 3 square in the next chapter. It's purely for show, and it's the best reward a nobody can get.

### 5. Pacing of one war (check against Phase 2)
| Day | You (typical) | The town |
|---|---|---|
| 1 | Novice, old tools, ~25 coin | Stage 1, 6–10 villagers |
| 2 | Iron tool or large sack; first wolves | Scouts appear; heading for stage 2 |
| 3 | Skilled in one job; first muster (Trusted?) | Stage 2; first raids |
| 4–5 | Spear and jacket, or carry frame; Blooded | Battles on the salt flats; stage 3 for the stronger side |
| 6–8 | Master or Veteran; one luxury (mail, lantern, master's tool) | Full attacks, the war tips |
| 8+ | | Rams; one Hall falls |

### 6. First version content budget
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

### Phase 5 summary
- Within a war you grow through coin (gear), practice (job ranks), reputation and deeds; across wars your family keeps its name, tree, a small standing, its trade, one heirloom and a crest.
- A full kit is about as strong as an enemy soldier: never a one-person army.
- A war earns about 120–220 coin; full top gear costs about 400, so you choose who to become.
- First version: 4 jobs + hauling, ~14 buildings, ~22 items, 6 enemies, 2 map types, 17 deeds.
- Unlocks add variety (difficulty, maps, starting in Quintara, crests), not power.

### Decisions and why
| Decision | Why |
|---|---|
| Across-war power capped at +10 reputation, Skilled rank, one +10% heirloom | Every chapter stays a fair, fresh start (Q10 decision noted "help a little, never decide a war") |
| Outer loads pay +1 coin; growth costs 50 grain a villager (S5) | Keeps earnings steady as walks grow, and ties the fields to the town's growth (vision check G3, G4) |
| Traits are small: +1 reputation a day, blood edges of 5–20% (S6, P3) | Colour, not power, the same rule as the heirloom |
| Load reputation capped at +5 per day | Stops hauling all day from making you Honoured; fighting, orders and guarding matter too |
| Heirlooms can be lost for good | Gives death a real cost across chapters, and a story |
| Top gear costs about twice what one war earns | Forces choices: worker, soldier or survivor (pillar 2) |
| Statue as the top reward | Cosmetic, fits "nobody becomes a hero" (the player fantasy) |
| Army hauler job in the first version | Lets peaceful players help the war without fighting |

### Open questions and risks
- ✅ **Q11:** the family stays on the side it ended the last chapter on; turncoat families have switched for good (the director, 21/11/2026). See 4.1.
- ⚠️ **Balance needs playtests:** pay, prices and ranks are guesses until the prototype runs. All numbers live in data files so they can change without code.
- ✅ **Too many items for a phone screen?** Answered in [Phase 7](07-ui-ux.md), section 3.5: one seller at a time, at most about 13 items in 3 tabs.
- ⚠️ **14 building types × 3 looks** is the biggest art job of the first version. The prototype uses plain shapes (Phase 6).

---

# Phase 6: Art and audio direction

*Source: [06-art-audio.md](06-art-audio.md)*

*Draft 21/11/2026, S02-WORLD. Approved by the director ("go"). Builds on [visual-direction.md](visual-direction.md) (end goal) and the brief's art path (Q7). Every asset must allow commercial use, because the game may be sold later.*

### 1. Art pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Warm and sunlit** | Golden grass, ochre paths, terracotta roofs, deep blue sea. Night is blue and lit by torches, never black. |
| 2 | **Readable at phone size** | You can find your villager, enemies and the notice board in under a second on a 6-inch screen. Readability beats detail every time. |
| 3 | **The town tells the war** | 3 growth stages, burned houses, graves, banners (pillar 3 of the game). The world shows what happened. |
| 4 | **Swappable art** | Every model is a separate file, named by its role. Upgrading the art never needs a code change (CLAUDE.md rule). |

### 2. The three art steps
| Step | When | What it looks like | Cost |
|---|---|---|---|
| **A. Plain shapes** | Prototype (Phase 11) | Boxes, cones and cylinders in the final colours. Thatch = cone, house = box, person = capsule with a head and a team-coloured sash | €0, Claude makes them in code |
| **B. Free low-poly packs** | First playable version | Ready-made low-poly buildings, trees, rocks and people from free packs that allow commercial use, recoloured to our palette | €0, licences checked one by one |
| **C. End-goal detail** | After the game is proven fun | Dense, detailed towns like the reference (visual-direction.md): own models, either a paid pack plus edits or a hired 3D artist | Money; only after version 1.0 has been played by people outside family and friends, with a spending cap set then ([Phase 10](10-scope-production.md), section 6) |

**Decision after the style test (22/11/2026):** step B uses **Quaternius** (Medieval Village MegaKit and RPG Character Pack, CC0). Plain shapes (A) stay in the game as the "Light" look, the fallback if the game turns out too heavy for phones. Kenney's models were tried and dropped (the director didn't like their themes). The village kit's walls have an inside face, and it has inside corners, floors and stairs, so house interiors can be built from it; it has no furniture, which would need another CC0 pack.

#### Free packs to look at for step B (Likely, check each licence before use)
| Source | Licence (as last known) | Good for |
|---|---|---|
| Kenney (kenney.nl) | CC0: free for any use, no credit needed | Nature, buildings, props, sounds, UI |
| Quaternius | CC0 | Animated low-poly people, animals (wolves), nature |
| KayKit (Kay Lousberg) | CC0 for the free packs | Medieval buildings, characters, props |
| Poly Pizza | **Mixed**: each model has its own licence | Use only the CC0 models |

**Rule:** every outside asset gets one line in `assets/LICENCES.md` (name, source link, licence, date downloaded). No line, no asset. "Free to download" is not the same as "free to sell": anything marked non-commercial is banned.

**AI-made art:** never used, for art, music or voices (decided in Phase 9, section 4.5): who owns it is unclear, stores ask about it, and players care.

### 3. Colour palette
| Use | Colours |
|---|---|
| Ground | Golden grass, dry ochre paths, white salt flats, grey-beige rock |
| Plants | Olive green, deep cypress green, cork-oak brown-green |
| Buildings | Whitewash, warm sandstone, terracotta roofs, weathered timber, thatch straw |
| Sea and river | Deep blue far out, turquoise near the shore |
| **Almara** | Blue (#2F6FB3-ish) + white, **square banner with a wave** |
| **Quintara** | Red (#B33A2F-ish) + gold, **forked banner with a tower** |
| Your villager | A small golden marker under your feet and a soft rim light, so you never lose yourself in a crowd |
| Danger | Red only for enemies and damage; nothing else in the world uses that bright red |

**Team colour rule:** team colour appears only on trims, banners, roof edges, shields and clothes sashes. Buildings stay mostly natural colours, as in the reference. Every team colour comes with its banner shape (Phase 3, colour-blind players).

### 4. Light and time of day
| Time | Sky and light | Mood |
|---|---|---|
| Day | High warm sun, short soft shadows | Safe, busy |
| Dusk | Orange and pink, long shadows, windows start to glow | Hurry home |
| Night | Blue moonlight, sight circle (isometric) or real darkness (first person), warm torch pools | Fear and focus |
| Dawn | Pale gold, mist on the fields | Relief |

Night must stay readable: a brightness slider (Phase 3), enemies get an outline, torches cast light that shows real danger.

### 5. Models

#### 5.1 People
- **Size:** about one-tenth of a house's height (visual-direction.md), but with slightly big heads and hands so poses read from above.
- **Look from the job:** each job adds one clear prop (axe, sickle, pick, carry frame, spear and shield). You can tell what anyone is doing at a glance.
- **Team:** sash, shield and hat trim in team colour.
- **Two levels of people (decided 24/11/2026):**
  - **The crowd** (ordinary workers, most of what you see from above): one body for men and one for women, the same for everyone. They differ only by job tool, team colour and 2 or 3 clothes colours. Plain on purpose: what someone is doing reads at a glance, and soldiers' classes (Phase 5) stand out against them.
  - **Named people** (you, your household and the fixed roles such as Warden, Smith and Baker; about 10 to 15 at a time): the same two bodies, plus their own head, hair and hat, combined at random, and the painted face. You know your family on sight, and Phase 4's "fresh people every war" still costs almost nothing in art.
- **Faces:** simple painted faces (eyes, brows, mouth) that work up close in first person. No detailed faces in step A or B.

#### 5.2 Buildings
- 14 types (Phase 5) × up to 3 stage looks. A stage look reuses parts: same walls, new roof and trim.
- **Damage:** 2 states per building, whole and burned (blackened, roof gone). Rebuilt buildings swap back.
- **Built in parts:** walls, roofs, doors and banners are separate pieces, so stage looks and burned looks are cheap.

#### 5.3 Nature and props
Trees (cork oak, olive, cypress, pine), bushes, rocks, cliffs, fields in rows, fences, carts, barrels, crates, woodpiles. **Density is the secret of the reference look:** many cheap copies of a few props fill every gap.

#### 5.4 Animation
| First version | Later |
|---|---|
| Walk, run, carry, chop, harvest, dig, hit, brace, fall, cheer, idle | Sitting, eating, talking gestures, ship rowing |

Quaternius and KayKit people come with many animations already (Likely). Animations are shared by every person model.

### 6. Effects
Wood chips, dust, sparks on blocks, fire and smoke on burning houses, torch flicker, the good-stroke ring, floating coins, the red grudge mark (Phase 4). All simple and cheap: small flat images that always face the camera.

### 7. Phone performance budget (first pass, checked in the prototype)
| Item | Budget |
|---|---|
| Frame rate | 30 frames per second steady on a mid-range phone, 60 on PC |
| Triangles on screen | about 150,000 |
| Person model | about 1,000 triangles |
| House | 500–1,500 triangles |
| Textures | One shared colour sheet (atlas) for most models, so the phone draws many things at once |
| First-person view distance | Fog from about 40 tiles away |

**Why it matters:** the end-goal look (step C) is the most expensive part of the project for a phone. Each art step is tested on the director's phone before the next.

### 8. Audio

#### 8.1 Audio pillars
- **Sound tells you what's happening without looking:** horn = attack, bell = dusk, howl = wolves (Phase 3 has a visual sign for each).
- **Music follows the war, not the clock alone.**
- **Quiet is allowed:** nights have long gaps with only wind, crickets and distant dogs.

#### 8.2 Music (changes with what's happening)
| State | Feel | Instruments (folk, coastal) |
|---|---|---|
| Day, peace | Light, warm | Guitar, flute, hand drum |
| Dusk | Uneasy | Slow strings, fewer notes |
| Night | Sparse, tense | Low drone, a far drum, silence |
| Muster and battle | Driving | Big drums, horns, voices shouting |
| Your town wins / loses | Proud / sad | Full tune / one guitar |
| Chronicle page | Gentle, like a story told by the fire | Solo guitar or lute |

**Changes blend smoothly** over 2–4 s. First version: about 6–8 loops from free CC0 music, or simple tunes Claude composes in code. Later: a hired composer, once the game proves fun.

#### 8.3 Sound effects
Kenney's CC0 sounds, and Freesound clips marked CC0 only (Likely). Each gets a line in `assets/LICENCES.md`. Key sounds and their feel are listed in Phase 3 (good stroke "thock", coin clink, horn, bell, drum).

#### 8.4 Voices
- **No full voice acting** (Phase 4). Text bubbles carry the words.
- **Short voice sounds** carry the feeling: grunts, laughs, "hey!", a gasp, a cheer, a tired sigh.
- **Short real words in Portuguese** (the director, Q12): they give the Sunward Coast a real accent. They stay in Portuguese in every translation, like a regional accent, and the text bubbles carry the meaning.
- **First word list (about 30):** "Bom dia!", "Boa noite", "Olá!", "Ai!", "Vamos!", "Força!", "Cuidado!", "Socorro!", "Olha!", "Obrigado!" / "Obrigada!", "Anda cá!", "Ora bolas!", "Às armas!", "Fujam!", "Viva!", plus laughs, grunts and sighs.
- **Who records them:** the director, on a phone (changed 25/11/2026, the director; free, and we own the recordings), in different moods and pitches; the game varies the pitch a little per villager. Guess: enough for men's voices; women's and children's words may stay as murmurs until a willing speaker records them, with a signed consent (Phase 9, section 4.4). 2–3 takes per word, so the same word doesn't sound identical each time. Each recording gets a line in `assets/LICENCES.md` with who recorded it.
- **Enemy accent:** Quintara uses the same words in a rougher, slower delivery, so you hear which side someone is on (always also shown by banner and colour).

#### 8.5 Ambient sound by place
| Place | Sounds |
|---|---|
| Town by day | Hammering, chatter, chickens, cart wheels |
| Coast | Waves, gulls, creaking boats |
| Woods | Wind in leaves, birds; at night owls and howls |
| Salt flats | Wind, nothing else (exposed on purpose) |
| Battle | Clashing metal, shouts, horns, the Captain's voice sound |

### 9. Keeping art swappable (for Phase 8)
- Every model is a **glTF file** (an open 3D format that Babylon.js reads directly), named by role: `building/house_stage2.glb`, `person/body.glb`, `prop/barrel.glb`.
- A data file maps each role to a file. Swapping art = dropping in a new file with the same name, or changing one line.
- Sizes and the ground point are fixed by rules (models in metres, 1 tile = 2 metres to match the art kit's 2 m wall pieces, feet at height 0), so a new model always fits. Changed from "1 tile = 1 metre" in [Phase 8](08-technical-design.md), section 5.1.

---

### Phase 6 summary
- Warm, sunlit, readable at phone size; the town's look tells the story of the war.
- Three art steps: plain shapes (prototype) → free CC0 low-poly packs (first version) → detailed own art (after the game is proven fun, costs money).
- Team colour only on trims, banners and clothes, always paired with a banner shape.
- Phone budget: 30 frames per second, ~150,000 triangles on screen, shared textures.
- Audio: folk music that follows the war, sounds that work without looking, quiet nights, no full voice acting.
- Every outside asset is logged with its licence; anything non-commercial is banned.

### Decisions and why
| Decision | Why |
|---|---|
| CC0 packs for the first version | Free, allowed for selling, no credit rules to manage |
| A licence line per asset | "Maybe sell later" (brief): we must prove every asset is allowed |
| No AI-made art for now | Ownership and store rules are unclear |
| Two bodies: a plain crowd, own heads for named people | Jobs and soldiers read at a glance; your family is known on sight; endless villagers (Phase 4) at almost no art cost |
| Burned building state | Pillar 3: the war leaves marks you can see |
| glTF files mapped by role | Swappable art, as CLAUDE.md asks |

### Open questions and risks
- ✅ **Q12:** short real words in Portuguese (the director, 21/11/2026). See 8.4.
- ✅ **S2 (done 22/11/2026):** before Phase 7, build a **one-street style test** in the browser: the same Almara street in plain shapes and with a free CC0 pack, at day and at night, to see on your phone which look works. Cost: one short session; no game code yet. Result: Quaternius became the look ("Full") and plain shapes the "Light" fallback (the director, 22/11/2026).
- ⚠️ **Mixing packs** from different makers can look patchy. Pick one main pack family and recolour everything to our palette.
- ⚠️ **The end-goal look** needs money and a phone performance check; it may need a "high detail" setting for PCs and newer phones only.
- ⚠️ **Licences can change** on a site; that's why we record the licence and date when we download, and keep a copy of the licence text.

---

# Phase 7: UI and UX

*Source: [07-ui-ux.md](07-ui-ux.md)*

*Draft 22/11/2026, S07-UI. Approved by the director ("go"). Builds on the controls (Phase 2, section 5), onboarding and accessibility (Phase 3), the Roll and the Chronicle (Phase 4), the shop list (Phase 5) and the palette (Phase 6). Sizes are for a typical phone held sideways (844 × 390 screen points) and get checked on the director's phone.*
*Updated 24/11/2026: the heir card becomes a choice between family members (P2), a hint when your patch runs out, and raid signs in the message order ([vision check](vision-check-villager-eye.md) G2, G7). Approved by the director (S5, S6).*

### 1. UI pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **The world is the interface** | Most information lives in the world, not on the screen: the sky tells the time, the town's look tells the war, the stock sign hangs over the yard. The screen only shows what your villager would know. |
| 2 | **Two thumbs, no stretching** | Everything used often sits under a thumb, in the lower corners. The top edge holds only what you look at, not what you press during action. |
| 3 | **Never more than you can read in a second** | At most 1 hint, 2 speech bubbles, 3 edge arrows and 1 banner at the same time. |
| 4 | **The town doesn't stop for menus** | Only the Pause menu stops the war. The shop, the notice board and the bag open as half-screen panels with the world still moving behind them (the director, Q15). |
| 5 | **Medieval look, instantly readable** | Menus look like the Rememberer's pages and the Steward's notices, framed in dark wood and brass; icons are bold, plain silhouettes you recognise at a glance (the director, 22/11/2026). Original look, our own icons. |

### 2. The play screen (HUD)

#### 2.1 Layout, isometric view
```
┌──────────────────────────────────────────────────────────────────────┐
│ ♥▮▮▮▮▮▯  🍞▮▮▮▯   ◐ Day 3 · dusk      [📜] [🗺] [🎒] [⏸]           │
│ 🪶 Common ▮▮▮▯▯   ◎ 37                                                │
│ ▸ Timber 1/3 · east wall  ◷                                    ⇨ ⚑   │  ← edge arrow to order site
│                                                                       │
│                          (your villager,                       [👁]  │  ← view button
│                           golden ring)                                │
│                                                          [🛡] [⚔]    │  ← only when armed
│   ╭─────╮                                                             │
│   │  ●  │           "Walk to the woodpile"  🪵                ( 🪓 )  │  ← Action button
│   ╰─────╯                                                             │
└──────────────────────────────────────────────────────────────────────┘
   joystick                    one hint                    right thumb
```

| Zone | What's there | Size (points) | Why there |
|---|---|---|---|
| Top left | Health, hunger, coin carried (◎), reputation with your town (feather, level name, bar), the tracked order | Bars 120 × 10, icons 24 | Glanced at, rarely pressed. Tap hunger to eat your best food. |
| Top centre | Sun dial: day number and part of day | 140 × 28 | Same place as the sky you'd look at. |
| Top right | Orders, map, bag, pause | 48 × 48 each, 8 apart | Used when standing still, so a stretch is fine. |
| Right edge, middle | **View button** (isometric ↔ first person) | 56 × 56 | **Moved from "top centre" (Phase 2):** the right thumb reaches it without letting go of the joystick. Always on screen. |
| Lower right | **Action button**, with Brace and Heavy strike above it | Action 88 × 88, fight buttons 64 × 64 | Under the right thumb. Fight buttons appear only with a weapon in hand, so a farmer's screen stays clean. |
| Lower left | **Joystick** (fixed base, the knob follows the thumb) | Base 120 across | Under the left thumb. Size and side can be changed (Phase 3). |
| Bottom centre | The one hint, 8 words at most, with an icon | | Between the thumbs, where the eyes already rest. |
| Screen edges | Arrows to things off screen: tracked order, home at night, your dropped sack, danger | 40 × 40 | Instead of a minimap (see 2.4). |

| Right edge, above the view button | **Zoom toggle** (magnifier: + to come closer, − to go back) | 48 × 48 | The director's iPhone test (22/11/2026): the villager looked too far away. On = camera about 40% closer; remembered on each phone. Hidden in first person. On screen for now; may move into Settings later. |

**Portrait (phone held upright, allowed from 22/11/2026, the director):** the same pieces, rearranged so nothing overlaps and the thumbs stay free:
- Bars top left, with the sun dial and the tracked order under them; orders, map, bag and pause stand in a column down the right edge.
- Zoom toggle and view button on the right edge, middle; joystick lower left, Action button lower right, as in landscape.
- The hint sits above the thumbs, not between them. Panels (board, shop, bag) fill the middle of the screen and stop above the joystick, so you can still walk away to close them (the war keeps running, Q15). The map and pause take the whole screen.
- The camera shows the same width of the world either way, so your villager is the same size; first person keeps a natural up-down view so the screen edges don't warp.

**Phone edges:** nothing sits inside the notch side or the home-bar strip at the bottom (the phone's "safe area"). The joystick and Action button sit 24 points above the bottom edge so a swipe doesn't send the game to the background.

**No browser zoom:** a double tap or a pinch anywhere in the game (buttons, bars and panels included) never zooms the page the way Safari zooms a website; only the game's own zoom toggle and the map's pinch zoom change the view. This holds in the browser and from the Home Screen (the director's iPhone test, 25/11/2026: a double tap zoomed the whole page, and only another double tap undid it). Technical note: every element gets `touch-action: manipulation` or `none`, and iPhone's page-zoom gestures are blocked (Phase 8).

#### 2.2 The Action button changes with what's in front of you
| In front of you | Button shows | Pressing it |
|---|---|---|
| Tree, field, stone | Axe, sickle or pick | Start working (the good-stroke ring then appears on the target, not on the button) |
| Your store or a building site, with a load | Sack with arrow | Deliver |
| Your home chest | Chest | **Store all coin and goods** in one tap (long-press: open the chest) |
| A shop keeper, the Steward, the Captain | Speech | Open their panel |
| Any other villager | Speech | They say one gossip line |
| An enemy (with a weapon in hand) | Sword | Target and attack |
| A dropped sack | Hand | Pick it up |
| Nothing | Hand, greyed | Nothing; never a surprise action |

**Tap the world or press the button:** both always work (Phase 2). The button is the safe way in crowds; tapping is quick when calm.

#### 2.3 Tapping in a crowd (the Phase 2 risk)
- Every person and object has a **tap area of at least 48 points**, bigger than how small they look.
- **Enemies win ties:** during a fight, a tap near an enemy targets it instead of moving you. Outside a fight, a tap near a villager talks before it moves.
- The current target has a red ring under its feet and a small health bar. Tap empty ground or move the joystick to drop it.
- **Long-press anything** to see its name and one line ("Iron axe. +25% chopping.") without acting.

#### 2.4 No minimap, on purpose
A minimap would show the whole war, which a nobody can't see (Phase 1, pillar 1), and it takes space a phone can't spare. Instead: edge arrows (at most 3) for what matters now, the sky for time, sounds with visual signs for danger (Phase 3), and the full map one tap away (section 3.4).

#### 2.5 In combat
```
┌──────────────────────────────────────────────────────────────────────┐
│ ♥▮▮▮▯▯▯ (red edges below 30)   ◐ Night 4        [📜] [🗺] [🎒] [⏸]  │
│ ⚑ Squad: 5 near · +20% defence                                ⚠ ⇨    │  ← danger arrow
│                                                                       │
│            ✕ squad leader's target            (enemy, red ring,  [👁] │
│                                                health bar)            │
│                                                        [🛡 6s] [⚔]    │  ← cooldown shown
│   ╭─────╮                                                             │    on the button
│   │  ●  │                                                    ( ⚔ )   │
│   ╰─────╯                                                             │
└──────────────────────────────────────────────────────────────────────┘
```
- **Squad line** (top left, under the bars): how many allies are near and whether the formation bonus is on. It greys out when you leave the squad.
- **Squad leader's target:** a white ✕ over the enemy the leader marked. Following it is your choice (Phase 2).
- **Cooldowns** fill the button like a clock face; the button glows and gives a tiny tap (Android) when ready.
- **Fleeing a battle you joined** shows "−8 reputation" in grey above your villager when you pass the edge of the fight, once, so it's never a hidden cost.

#### 2.6 First-person view
Same HUD, same places, so nothing has to be relearned. Differences:
- A small dot in the centre of the screen. The Action button acts on what the dot is on.
- The right half of the screen (outside buttons) drags to look around.
- No edge arrows for things behind you; a soft glow on the left or right edge shows which way to turn.
- The sun dial and bars fade to 60% so the darkness at night stays dark.

### 3. Panels and screens

#### 3.1 Screen flow
```
Title ──► Continue ─────────────────────────────────────────────┐
  │                                                              ▼
  └─► New war ─► Family (new or existing) ─► War setup ─► Loading ─► PLAY
                                                                  │  ▲
     ┌─────────────────────────────────────────────────────────────┘  │
     ├─► Pause menu (stops the war) ─► Settings · The Roll · Chronicle so far · Save and quit
     ├─► Panels (war keeps running): notice board · shop · bag and chest · map · orders
     ├─► Death card ─► Heir card ─────────────────────────────────────┘
     └─► War ends ─► Chronicle page ─► Pick heirloom ─► Next chapter or Title
```
**Rule:** anything in a war is at most **2 taps** from the play screen. Every panel closes with the same ✕ in its top-right corner, a tap anywhere outside it, the Android back gesture, or Esc. A tap outside only closes the panel: it doesn't also move you or act (the director's phone test, 25/11/2026: the mock-up's panels ignored taps outside them).

#### 3.2 Title and setup
- **Title:** the Hall at dawn, slow camera drift. Buttons: **Continue** (if a war is saved), **New war**, **Chronicle book**, **Settings**.
- **Family:** pick an existing family (crest, name, chapters played, side) or start a new one: random family name with a reroll die, or type one (Phase 4).
- **War setup:** difficulty (Hearth, Banner, Blood; locked ones show how to unlock them), map type, and side for new families once Quintara is unlocked. One screen, big cards, a **Begin** button. The first ever war skips this: it's the guided war (Phase 3).
- **Loading:** a Rememberer's line and the family crest, under 10 seconds as a target.

#### 3.3 Notice board and orders
Opened at the Hall's board (you have to walk there; the crier tells you when new orders are up).
```
┌──────────────── Notice board (Almara) ────────────────────── ✕ ┐
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│ │ 🪵 TIMBER.    │ │ 🗼 Guard the  │ │ 👁 Scout the   │   world     │
│ │ East wall.   │ │ north gate   │ │ enemy camp.  │   keeps     │
│ │ Properly     │ │ tonight.     │ │              │   moving    │
│ │ stacked.     │ │              │ │              │   here      │
│ │ ◎8  🪶+3      │ │ ◎6  🪶+3      │ │ ◎12 🪶+4      │              │
│ │ ◷ before dusk │ │ ◷ till dawn  │ │ ◷ 1 day       │              │
│ │ [ Accept ]   │ │ [ Accept ]   │ │ 🔒 Trusted    │              │
│ └──────────────┘ └──────────────┘ └──────────────┘              │
└──────────────────────────────────────────────────────────────────┘
```
- Up to **4 orders** at once, written in the Steward's voice (12 words at most, Phase 4).
- **Accept** pins it; you can hold **2 accepted orders** at most. The newest one is tracked on the HUD with an edge arrow; tap the tracker to switch.
- **Locked orders** show the lock and the level needed, so you know what reputation buys.
- **The Orders icon** (top right) lists your accepted orders anywhere. Dropping one shows "−4 reputation" before you confirm.
- Ignoring an order needs no button: when its deadline passes, the −2 shows once on the reputation bar.

#### 3.4 Map
- A parchment drawing of the valley, made from the real map. Areas you haven't seen yet stay blank, like an unfinished drawing.
- It shows: you, home, the Hall, shops, accepted order sites, your dropped sack and how long until it's looted, and what you have seen or heard (an enemy camp you scouted, a grudge target's last known place from gossip).
- **Live enemy positions are never shown** unless you can see them right now.
- Pinch to zoom, drag to move. Tap a place to set a marker that becomes an edge arrow.

#### 3.5 Shop (answers the Phase 5 risk: about 22 items on a phone)
- **One seller at a time.** Each shop holds only its own goods, so the longest list (the Smith) has about 13 items, split into tabs: **Tools · Weapons · Armour**.
```
┌──────────────── The Smith ──────────────────────── ◎ 37 ───── ✕ ┐
│ [Tools] [Weapons] [Armour]                                       │
│ 🪓 Iron axe       +25% chopping   (now: +0%)        ◎25  [ Buy ] │
│ 🌾 Iron sickle    +25% farming                       ◎25  [ Buy ] │
│ ⛏ Iron pick      +25% quarrying                    ◎25  [ Buy ] │
│ 🪓 Master's axe   +50%, wider beat window            🔒 Trusted   │
└──────────────────────────────────────────────────────────────────┘
```
- Each row: icon, name, **one line of what it does compared with what you have now**, price, **Buy**. Rows you can't afford show the price in grey; locked rows show the level needed.
- **Buying** puts the item straight into the right slot; the old one goes to your bag, or to the chest when you're at home.
- **Coin used is what you carry.** If you don't have enough on you, the row says "◎12 more (at home: 40)", a reminder that savings sit in the chest.

#### 3.6 Bag and home chest
```
┌──────────────── Bag ────────────────────────────── ◎ 37 ───── ✕ ┐
│  Hands: 🪓 Iron axe       Off-hand: 🔦 Torch (tonight)          │
│  Head:  —                  Body:    🧥 Padded jacket            │
│  Back:  👝 Large sack  ▮▮▮▮▯ 12/15 timber                        │
│  Belt:  🍞 🍞 🐟                                                  │
│  ★ Heirloom: Afonso's Axe (in hands)                            │
│  Know-how: Woodcutter · Skilled (23/40 loads)   Fighting · —    │
└──────────────────────────────────────────────────────────────────┘
```
- Slots, not a grid: hands, off-hand, head, body, back, and a food belt of 3. Tap a slot to swap from what you own.
- **Everything shown here is what you'd lose if you died now** (the sack, Phase 1). A small line says so: "Carried items drop if you fall."
- **At home** the chest opens beside the bag, two columns; tap an item to move it across. **Store all** is one button (and one tap on the Action button at the chest, section 2.2).
- The heirloom has a gold star wherever it appears, so you never carry it into danger by accident.

#### 3.7 The Roll (reputation)
Opened from the Pause menu or by tapping the feather on the HUD. A page of the Roll in the Rememberer's hand:
- Your standing with **both towns**: score, level name, and what that level allows (jobs, weapons, shelter).
- The last 10 entries that changed it ("Guarded the north gate · +3"), so the number is never a mystery.
- Your nickname and deeds so far in this war, and up to 3 marked grudges with their names.
- **Level changes** also show as a big banner on the play screen for 2 seconds (Phase 3).

#### 3.8 Death card and heir card
- **Death card** (full screen, world in grey behind): name, nickname, days lived, the Rememberer's line, and "Killed by ..." for a grudge. Stays at least **2 seconds** so a stray tap can't skip it; then "Tap to go on".
- **Heir card (a choice, P2):** one small card per living family member of working age, side by side (2 to 4; in portrait they stack). Each shows the face, name, relation ("wife", "brother", "eldest daughter"), age, personality trait, blood trait if any, and their knack job. Tap one to see it larger, then **Carry on as ...** to confirm. There's no timer. With no one left, a single card: "A cousin comes from the outer farms."
- **What the heir gets**, shown under the chosen card as a short list with icons: house, chest, coin at home, half the reputation (shown as a number), know-how one rank lower, **Second wind** when it applies (Phase 3, shown openly). Then the heir carries on from home.

#### 3.9 Chronicle
- **End of a war:** the Chronicle page (Phase 4 sample), then the score line by line (days alive, deeds, generations, bonuses, Phase 5), the deeds earned this war, and the **heirloom pick**: one card per item the last living family member owned. Buttons: **Next chapter**, **Title**.
- **Chronicle book** (from the Title): families → a family's tree → a chapter's page. The tree reads **left to right** (one column per chapter), which fits a sideways phone: each villager is a small card with their crest, nickname, side banner and how they died. Lost heirlooms appear as a crossed-out line.

#### 3.10 Pause and settings
- **Pause** stops the war. It opens on its own when the game goes to the background, when the phone is turned upright, or when the browser tab is hidden (and the game saves, Phase 2).
- **Settings** in 5 tabs, each a short list (all Phase 3 options are here):

| Tab | Settings |
|---|---|
| Controls | Joystick size and side, tap-to-move, automatic good strokes, PC keys |
| Display | Look: Full or Light (section 6), text size (3), night brightness, reduce flashing and shaking, show meanings under Portuguese words |
| Sound | Music, effects, voices, captions |
| Game | Game speed 0.75×, Second wind, hints on or off |
| Language | English first; Portuguese in update 1.1 (Phase 12, section 6.1) |

### 4. Words on screen

#### 4.1 Speech bubbles and Portuguese words
- Bubbles float above heads, 8 words at most, for 3 seconds. At most **2 on screen**, nearest first; enemy bubbles have a red-and-gold edge.
- **Portuguese call-outs** (Phase 6) show the word as spoken, with the meaning under it in small text when the game isn't in Portuguese: *"Cuidado!"* / (look out). The meanings can be turned off once learned.
- Every bubble is also a caption, so sound is never needed.

#### 4.2 Text rules
- Smallest text **14 points** at the normal size (sizes: 14, 17, 20). Numbers on the HUD in a clear, wide font.
- **Text on parchment** passes the usual contrast check for reading (at least 4.5 : 1).
- **Leave a third more room** in every box: Portuguese text runs about 20–30% longer than English (Likely). No word inside a picture, so translation never needs new art.
- Every line lives in a data file (Phase 4), including button labels.

### 5. What the player is told, and in what order
When many things happen at once, the screen shows them in this order and drops the rest:

| Priority | Kind | Example | Rule |
|---|---|---|---|
| 1 | Danger to you | Enemy close, health low | Red edges, edge arrow, sound |
| 2 | War events | Horn, muster, Hall attacked, the watchman's bell | One banner at the top, 3 seconds, edge arrow |
| 3 | Your orders, raid signs | New orders, deadline near; "Smoke to the east" | Tracker blinks once; a raid sign gets an edge arrow toward it |
| 4 | Hints | "Bring it to the yard"; "This tree is done" with three choices: next patch (arrow), notice board, ask the Steward | Waits until priorities 1–2 are quiet |
| 5 | Gossip | "Quintara moved the Stone again." | Dropped first when busy |

**Numbers that float up** (+2 coin, +1 reputation) are small and gold, and merge when they come fast ("+6"), so a busy moment isn't a cloud of numbers. The faction's stock is shown in the world (a sign over each store that ticks up when you deliver), not on the HUD.

### 6. Look and feel of the interface
- **Materials:** parchment pages for the Roll, map and Chronicle; pinned paper for orders; dark wood for the HUD frames; wax seals for confirmations. Original, drawn by us.
- **Icons:** our own simple silhouettes as SVG (small vector drawings Claude can write as code), readable at 24 points, one colour plus outline. **Medieval in subject (axe, sack, scroll, feather, bread, shield), modern in clarity:** one bold shape each, no fine detail, no decoration inside the shape, so they read at a glance (the director). No icon packs needed, so no licence to manage.
- **Fonts (confirmed in [Phase 8](08-technical-design.md), section 4):** a readable book-style font for headings and story text, and a font built for easy reading on screen for numbers and buttons. Both under the SIL Open Font Licence, which allows selling: *Alegreya* for story text, *Atkinson Hyperlegible Next* for buttons. They will be copied into the repo, not loaded from a font website, so players' browsers don't contact anyone else. The mock-up uses the fonts already on the device.
- **Colours:** parchment, ink brown and gold for the interface; your gold for yourself and coin; **red only for danger and enemies** (Phase 6); team colours always with their banner shape.
- **Motion:** panels slide in within 0.2 s; nothing on the HUD moves unless it's telling you something. "Reduce flashing and shaking" also stops panel slides.
- **Full and Light looks:** the interface is the same in both. On first launch the game checks the frame rate for 10 seconds; if the phone struggles it suggests Light, in one line, never switching on its own.

### 7. Phone and PC specifics
| Topic | Phone | PC |
|---|---|---|
| Held upright | A "turn your phone" card with a rotating phone icon; the war pauses | Any window shape; the layout follows the shorter side |
| Full screen | Android: full screen on the first tap. iPhone browsers don't allow it for games (Likely), so the title suggests "Add to Home Screen", which gives the whole screen | Full-screen button in Settings |
| Joystick | On screen | Hidden; W A S D. Key letters show in a corner of each button |
| Pointing | Tap, long-press for names | Click; hovering shows names |
| Panels | Half screen, world visible | Same, but narrower; Esc closes |

### 8. Changes to earlier phases
| Where | Was | Now | Why |
|---|---|---|---|
| Phase 2, controls | View button at top centre | Right edge, middle | Reachable by the right thumb while moving |
| Phase 2, controls | Bag, map, orders "at the top corners" | All at the top right, with pause | One place to look; the top left holds the bars |
| Phase 3, feedback | "The faction stock bar ticks" | The stock sign over the store ticks | Keeps the HUD clean (UI pillar 1) |

---

### Phase 7 summary
- The world carries most information; the HUD keeps bars top left, icons top right, thumbs' controls in the lower corners.
- One Action button that changes with what's in front of you; fight buttons appear only when armed.
- No minimap: edge arrows, the sky and the full map instead (pillar 1).
- Shop, board, bag and map are half-screen panels and the war keeps moving; only Pause stops it (the director, Q15).
- Shops show one seller at a time, at most about 13 items in 3 tabs, each compared with what you have.
- Death card, heir card, the Roll and the Chronicle book make the family's story readable on a sideways phone.

### Decisions and why
| Decision | Why |
|---|---|
| No minimap | A nobody doesn't see the whole war (pillar 1); saves space |
| Heir card is a choice with no timer (S6, P2) | Choosing who carries on is a story moment; nothing is lost by taking a moment over it |
| Same HUD in both views | Nothing to relearn when switching (Phase 2: same rules in both views) |
| Fight buttons only when armed | A farmer's screen stays clean; arming yourself feels like a change |
| One-tap "Store all" at the chest | Makes banking coin before night a quick habit (Phase 1, inheritance) |
| Costs shown before they happen (−8 for fleeing, −4 for dropping an order) | Pillar 2 works only if the player sees the price of a "no" |
| Our own SVG icons, open-licence fonts | Free, allowed for selling, nothing to credit |
| Hold-to-confirm for the one-way choices | See below |

**Hold-to-confirm:** the few choices that can't be undone (asking the enemy to take you in, starting a new family over an existing save) need the button held for 2 seconds while a wax seal fills, with the cost written plainly above it ("You lose your house, chest and savings. Almara will call you traitor."). Defecting still has no menu: you walk to their gate unarmed, drop your weapon, and the Action button offers "Ask to join" (Phase 1).

### Open questions and risks
- ✅ **Q15:** the war keeps running while the shop, notice board or bag is open (the director, 22/11/2026). The world stays visible beside the half-screen panel, danger still shows on its edge, and on Hearth the world slows to half speed while a panel is open.
- ✅ **S3:** a clickable HUD mock-up is on the live link (the director said yes, 22/11/2026). It lives in `ui/` (`hud.js`, `hud.css`), apart from the 3D street, so the interface can be swapped without touching the world. Sample rules and fast timings; the Test button (gear) holds the time of day, town stage, look and zoom.
- ⚠️ **Phone screens vary:** small phones (about 667 × 375) leave little room between the thumbs. Phase 8 set the smallest supported phone: the iPhone SE (667 × 375); every screen is checked there.
- ⚠️ **iPhone and full screen:** browser bars eat about a sixth of a sideways screen (Guess). "Add to Home Screen" helps but players must do it themselves.
- ⚠️ **A running world behind panels** can kill a player who is shopping during a raid. The danger edge and Q15's Hearth rule soften it; playtests decide.

---

# Phase 8: Technical design

*Source: [08-technical-design.md](08-technical-design.md)*

*Draft 24/11/2026, S20-TECH. Approved by the director the same day ("phase 8 go"), with the crowd test (S7) and the test phones (Q20). Builds on every earlier phase; the street mock-up on the live link (one 940-line page, Babylon.js 7 from a public code website) is the starting point. Library versions and licences were checked on the npm package registry on 24/11/2026 (Verified); performance numbers are targets until the crowd test (section 10) and Phase 11 measure them.*

**In plain words:** the game stays a web page made with Babylon.js, written in TypeScript and packed by a build tool, so it loads fast, works offline, and can later be wrapped as a phone app without rewriting it. The war itself (people, AI, orders, money) runs as a separate "simulation" that doesn't know about graphics. That split lets the computer play hundreds of test wars in seconds to check the balance, lets art be swapped freely, and lets a save be a simple snapshot.

### 1. Technical pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Phone first, measured** | Every big feature is checked on the director's phone. Budgets in section 7 are hard limits, not hopes. |
| 2 | **The war runs without the picture** | The simulation (section 3) has no graphics code. Drawing only reads it. Off-screen fights are simulated, not drawn. |
| 3 | **Numbers, words and art live in data** | Balance numbers, every line of text and the art map are data files. Tuning, translating or upgrading art never needs a code change (Phases 4, 5, 6). |
| 4 | **Same war from the same seed** | Each war has a seed number; the simulation uses only its own dice. The same seed and the same player actions give the same war, so any bug can be replayed. |
| 5 | **Nothing leaves the phone** | No accounts, no tracking, no ads code, no outside websites at run time. Saves stay on the device. |

### 2. Platforms and the smallest phone
| | Supported (Likely, confirmed by the crowd test) | Why |
|---|---|---|
| iPhone | iPhone XR / XS (2018) or newer, on iOS 17 or later, Safari | Needs WebGL 2 (3D in the browser) and about 3 GB of memory |
| Android | Phones from 2020 or newer with 4 GB of memory, current Chrome | Same reasons |
| PC | Current Chrome, Edge, Firefox or Safari | |
| **Smallest screen** | **667 × 375 points**, the iPhone SE (2020/2022) held sideways | Answers Phase 7's open question. Every screen is checked at 667 × 375, 844 × 390 and upright 390 × 844. |

**Test phones (Q20, 24/11/2026):**
| Phone | Role |
|---|---|
| The director's recent high-end iPhone (2023, large screen) | Main phone for feel and fun. It's much faster than the mid-range target, so a smooth game there proves little about speed. |
| An older Android phone from 2018 with a worn battery | The **weak-phone check**: a little below the supported Android line. If the Light look plays acceptably there, mid-range phones are safe. A worn battery can slow a phone down, so its numbers are a worst case. |
| The PC's browser pane, slowed down on purpose | Every day checks between phone tests |

**Older or weaker phones** get the Light look (plain shapes) suggested by the 10-second frame check (Phase 7, section 6). Below WebGL 2 the game shows one plain line saying the phone can't run it.

### 3. How the program is built (architecture)
```
   touch, mouse, keys ──► INPUT ──► player commands ─┐
                                                     ▼
 data files ──► ┌──────────── SIMULATION (the war) ────────────┐ ──► SAVE (snapshot)
 (numbers,      │ map · land · time · factions' AI · villagers  │
  words, art)   │ orders · economy · combat · family · Roll    │ ──► events ("bell rang",
                └──────────────────────────────────────────────┘      "order done", "you died")
                          │ read only                                      │
               ┌──────────┴──────────┐                       ┌────────────┴────────────┐
               ▼                     ▼                       ▼                         ▼
          VIEW (Babylon.js 3D)   UI (HTML panels, HUD)    SOUND (music, effects)   FEEDBACK (vibration)
```
- **Simulation:** plain TypeScript, no Babylon, no web page. It moves forward in fixed steps of **0.1 game seconds** (10 steps a second), whatever the phone's frame rate. Pause stops it; "game speed 0.75×" and Hearth's half speed behind panels (Q15) just slow its clock.
- **View:** builds and moves the 3D scene from the simulation's state, smoothing movement between steps so 30 or 60 frames a second both look fluid. Two looks (Full, Light) are two sets of models behind the same view code.
- **UI:** the HUD and panels stay plain web page elements (HTML and CSS), as in the mock-up's `ui/` folder, which already works on the iPhone. They read the simulation through one small bridge (today `window.THR`). Web elements give sharp text at every size, easy translation and screen-reader labels; a 3D-engine UI would not.
- **Events:** the simulation announces what happened ("dusk bell", "order done", "hit taken"). Sound, vibration, hints and the message order (Phase 7, section 5) listen to these. Phase 3's feedback table becomes one data file: event → picture, sound, vibration.
- **Off the main thread later, if needed:** because the simulation touches no page or graphics, it can move to a background worker (a second processor thread) if the crowd test shows the phone needs it. It starts on the main thread, which is simpler.

### 4. Tools and libraries
All allow selling the game ("maybe sell later"). Versions are the latest on 24/11/2026; the project pins exact versions and upgrades on purpose, never automatically.

| Tool | What it does | Licence | Version (24/11/2026) |
|---|---|---|---|
| **Babylon.js** (`@babylonjs/core`, `@babylonjs/loaders`) | The 3D engine; reads the glTF models | Apache 2.0 | 9.37 |
| **TypeScript** | JavaScript with checked types, so mistakes show before the game runs | Apache 2.0 | 7.0 |
| **Vite** | Packs the code for the web, live reload while working; replaces `tools/dev-server.mjs` | MIT | 8.3 |
| **Vitest** | Runs the automatic tests and the test wars (section 9) | MIT | 5.1 |
| **Playwright** | Opens the built game in real browsers at phone sizes and checks for errors | Apache 2.0 | 1.65 |
| **glTF Transform** | Shrinks the 3D model files before they're published (section 7.3) | MIT | 4.5 |
| **idb-keyval** | A tiny helper for the browser's save storage (section 6) | Apache 2.0 | 6.3 |
| **Fonts:** Alegreya (story text), Atkinson Hyperlegible Next (numbers and buttons) | Copied into the game from the `@fontsource` packages, never loaded from a font website | SIL Open Font Licence 1.1 | 5.3 |
| **Capacitor** (later) | Wraps the same built game as an iPhone and Android app (section 8) | MIT | 8.6 |

**Written by us instead of a library:** pathfinding, the faction AI, the random dice, the joystick, the save format. Each is small for this game, and owning it keeps the download small and the behaviour easy to change.

**Fonts settled (Phase 7 asked):** both are under the Open Font Licence (Verified on npm), which allows selling a game that includes them. Atkinson Hyperlegible **Next** is the newer family with more weights; same licence.

**Upgrading Babylon.js 7 → 9:** the mock-up uses version 7 from a public code website. The game moves to version 9, packed inside the game itself, so phones don't fetch code from anyone else and it works offline. The mock-up stays as it is until the first playable build replaces it.

### 5. The world in the simulation

#### 5.1 Grid, sizes and units
| Rule | Value | Why |
|---|---|---|
| 1 model unit | 1 metre (Phase 6) | Unchanged |
| **1 tile** | **2 × 2 metres** | The art kit's wall pieces are 2 m wide (Verified), so buildings snap to tiles with no gaps. **Changes Phase 6's "1 tile = 1 metre"** (section 13). |
| **Map, first pass** | **160 × 96 tiles (320 × 192 m)** | Keeps Phase 5's promise "Hall to Hall in about 2 minutes" (about 280 m: 70 s jogging empty, 90 s loaded, 2 min at a villager's walk). **Changes Phase 5's 96 × 64** (section 13). |
| Your speed | 4 m/s, 3.2 m/s with a full load (Phase 2: −20%) | The street mock-up's speed felt right on the iPhone |
| Other villagers | 2.5 m/s walking, 4 m/s fleeing | Readable from above; they don't race past you |
| Sight, reach, ranges | Stay in tiles as written in Phases 2 to 5 | With 2 m tiles they come out sensible: day sight 20 m, night 8 m, torch 12 m, spear reach 3 m |

#### 5.2 What the simulation keeps
| Part | How it's stored |
|---|---|
| **Map** | One layer per kind: ground type, height, what stands there (tree, rock, field, building), who has seen it (for the parchment map). 15,360 tiles each, small number arrays. |
| **Land** | Each tree, outcrop and field: loads left, regrow timer (Phase 2, section 2.2). |
| **People and animals** | One table with room for **256 living beings**: up to 30 villagers and 30 soldiers per faction (Phase 2), plus households, wolves and the Peddler. Each row holds place, health, job, task, faction, traits, inventory. |
| **Buildings** | Type, stage look (1 to 3), whole or burned, build progress, stock if it's a store. |
| **Factions** | Stock, town stage, the AI's current plan, reputation of every villager in its Roll. |
| **You and your family** | Your villager is an ordinary row plus the player-only parts: coin, gear slots, know-how, accepted orders, grudges. Family members are ordinary villagers with a family tag. |
| **The family book** (across wars) | Kept apart from the war save (section 6): family name, tree, nicknames, deeds, heirloom, standing, unlocks. |

**Off-screen is still real:** a fight far away is worked out by the same rules, just not drawn. The phone only draws what's within the camera's view (and in first person, up to the fog at about 40 tiles, Phase 6).

#### 5.3 Moving around (pathfinding)
- **Finding a way:** a standard shortest-path search on the tile grid (an "A-star" search), with walls, buildings and dense wood blocked and paths cheaper. 15,360 tiles take well under a millisecond per search (Likely).
- **Many people, same goal:** for places everyone walks to (the Hall, each store, each camp, the gates), the simulation keeps a **"which way from here" map** for the whole grid and updates it when a wall, building or camp changes. Hundreds of people can then find their way at almost no cost.
- **Not bumping:** people step around each other with a simple push-apart rule; soldiers keep loose rows.
- **Chokepoints come free:** gates, the bridge and gaps in the woods are simply the only open tiles, so armies queue there on their own (Phase 4, and gap G12 later).

#### 5.4 The faction AI (the Warden)
The biggest build (Phase 1 risk). It's built in layers so the smallest version plays a real war first:

| Layer | Thinks every | Decides |
|---|---|---|
| **Plan** (the Warden) | 5 game s | Which step of the plan comes next: gather → houses → walls → soldiers → scout → raid → full attack (Phase 2, section 2.8). A data file per town style: Almara builds early, Quintara raids early (Phase 4). |
| **Needs** (the Steward) | 2 game s | What the town lacks for the plan; turns it into worker jobs and into **orders on the notice board** (Phase 2, section 2.3). Orders come from real gaps because they're made by the same code that tells AI villagers what to do. |
| **Workers** | 1 game s per villager, spread out | Each AI villager picks a job from the needs list and the timetable (Phase 2, section 2.10): walk, work, carry, deliver, eat, sleep, hide. A small set of states per person. |
| **War** (the Captain) | 1 game s | Raids and attacks: picks a target, gathers a squad, marches, retreats when losing. Sends the raid warning signs ahead (Phase 2, section 2.9); the watchman rings the bell only if alive. |
| **Squads** | 0.2 game s | Who fights whom inside a battle; the squad leader's target (Phase 7, section 2.5). |

- **Fairness rule:** the AI sees what its own people see (their sight circles, its scouts' reports), never the whole map. Hard difficulty makes it faster and bolder, not all-seeing (Phase 3).
- **The stalemate breaker** (Phase 2) is a rule the plan layer must obey: forced attacks from Day 4, rams from Day 5 (Q30).

#### 5.5 Dice and determinism
- One small random-number maker written by us, started from the war's seed. The simulation never uses the clock or the browser's own dice.
- Separate dice streams for the map, the AI, combat and names, so a change to names doesn't shift every battle.
- The game records your commands (moves, taps, choices) with the step number. Seed plus that record replays the war, which is how bugs reported from a phone get reproduced on the PC.

### 6. Saving
| What | When | Where | Size (Likely) |
|---|---|---|---|
| **War save** (one slot per family) | Every dawn, when the game goes to the background or the tab is hidden, and on "Save and quit" (Phase 2) | The browser's database storage on the device (IndexedDB) | About 50 KB, packed with the browser's built-in compression |
| **The family book** | At every chapter end, death, deed and heirloom pick | Same storage, separate entry | A few KB per chapter |
| **Settings** | When changed | Small browser storage (localStorage), as the mock-up already does (`thr-look`, `thr-close`) | Tiny |

- **A save is a snapshot**, not the command record: the full simulation state written out as data, with a **save version number**. When a later update changes the format, a small converter upgrades old saves instead of breaking them.
- **Two copies:** the new save is written next to the old one and only then replaces it, so a phone dying mid-save never loses the war.
- ⚠️ **iPhone may wipe web storage:** Safari can delete a website's stored data after about 7 days of not visiting it (Likely; it doesn't apply to games added to the Home Screen). That would lose the family book, the heart of the game across wars. So:
  1. The title screen suggests **Add to Home Screen** (Phase 7 already does, for full screen).
  2. The game asks the browser to keep its storage ("persistent storage"), where allowed.
  3. **Export and import the family book** as a small file in the Chronicle book screen, so it can be kept in Files, sent to the PC, or moved to a new phone.
  4. The phone app (section 8) doesn't have this problem.

### 7. Performance

#### 7.1 Budgets (mid-range phone, 30 frames a second = 33 ms per frame)
No test phone is mid-range, so the budgets are checked two ways: the high-end iPhone should hold 60 frames a second with room to spare, and the 2018 Android phone should hold about 30 in the Light look (section 2).

| Item | Budget | Notes |
|---|---|---|
| Simulation + AI | 5 ms per frame on average | AI thinking is spread across frames (section 5.4), never in one spike |
| Drawing (the phone's processor side) | 12 ms | Mostly "draw calls": how many separate things the engine asks the graphics chip to draw |
| Draw calls | at most 150 in isometric, 250 in first person | Many copies of one model count as one (section 7.2) |
| Triangles on screen | about 150,000 (Phase 6) | |
| Animated people on screen | 60 in isometric, 40 in first person | The rest are simulated but not drawn |
| Memory | under 400 MB | iPhone Safari closes pages that use much more (Likely) |
| First download | under 15 MB, loaded in under 10 s on 4G (Phase 7) | After the first visit it loads from the phone itself (section 8) |

#### 7.2 How we stay inside them
- **Copies, not separate objects:** trees, rocks, crops, fence and wall pieces are drawn as many copies of one model in a single call ("instances"). Buildings are merged into one piece each and frozen in place (the mock-up already does this).
- **Animated people the cheap way:** the engine's usual way of animating each person separately is the biggest risk with 60 people on screen. The plan is to bake each animation (walk, chop, fight…) into a picture the graphics chip reads directly ("baked vertex animation", supported by Babylon.js, Likely), so all villagers of one model draw together. The crowd test (section 10) checks this first.
- **Light:** one sun with shadows only near you; a soft sky light; at night at most **4 real torch lights** near you, every other torch a glowing picture that looks lit but costs almost nothing.
- **Sharpness:** the screen is drawn at up to 2× the phone's pixel size (as now). If the frame rate stays below 28 for 5 seconds, it drops to 1.5×, then 1.25×, quietly; Settings shows it.
- **Shared colour sheet:** pieces that share one small colour texture can be drawn together; the Quaternius pieces mostly do (Likely), which keeps draw calls low.

#### 7.3 Download size
The art folder is about 13 MB today, 11 MB of it the six characters (Verified). Before publishing, glTF Transform shrinks the models (compressed shapes, one shared skeleton and animation set for all people, smaller textures). Target for the first playable version: **under 8 MB of models**. Music streams after the game starts; the title screen never waits for it.

### 8. Publishing: web page, offline, phone app
| Step | How |
|---|---|
| **Working on the PC** | `npm run dev` starts the game at http://localhost:5173/ with live reload |
| **Publishing** | Pushing to GitHub runs an automatic build (GitHub Actions, free for public repos) and publishes the result to the same link: https://sichdar.github.io/the-hall-remembers/ . Nothing built is stored in the repo by hand. |
| **Offline and Home Screen** | A small "app description" file (web app manifest: name, icon, sideways or upright) and an offline helper (service worker) keep the game on the phone after the first visit. Added to the Home Screen, it opens full screen like an app, with no browser bars. |
| **Updates** | When a new version is published, the game shows "A new version is ready" on the title screen and updates on the next start, never in the middle of a war. Saves carry their version (section 6). |
| **Phone app, later** (brief) | Capacitor puts the same built game inside an iPhone app and an Android app. No rewrite. Needs: a Mac (or a paid online Mac service) to build the iPhone app, Apple's yearly developer fee and Google's one-time fee. Costs and store rules: Phase 9. When: the Android app once the web link or itch.io shows interest, the iPhone app after that ([Phase 10](10-scope-production.md), section 6). |

### 9. Testing
| Test | What it checks | When |
|---|---|---|
| **Rule tests** | Pay, prices, reputation, hunger, inheritance, traits, the Roll: each rule from Phases 1 to 5 has a small automatic test | Every change, in seconds |
| **Test wars** | The simulation plays whole wars with no picture, at hundreds of times normal speed, with a robot "player" (worker, soldier, coward, turncoat). Checks: every war ends; 95% by Day 7 (Phase 2); the first raid isn't too early; the bell rings at least 60 s ahead (Phase 2, section 2.9); a day earns 20 to 35 coin (Phase 5). This is also the **"threat check"** the vision check asked for (gap G14) and the balance tool for Phase 11. | Every change (10 quick wars); 500 wars overnight before each playtest |
| **Data checks** | Every data file is complete: no missing text line, item, model or number; Portuguese text fits the 30% extra room (Phase 7) | Every change |
| **Browser check** | The built game opens in real browsers at 667 × 375, 844 × 390 and 390 × 844, with no errors; a screenshot of each | Before every publish |
| **The director's phone** | Feel, fun, frame rate, heat and battery | Each milestone ([Phase 10](10-scope-production.md), section 4) |

**Testing aids (hidden from players):** adding `?debug` to the link shows the frame rate, draw calls and number of people, and allows test shortcuts: set the time of day, call a raid, add coin, jump a day. The mock-up's gear button grows into this.

**Bug reports from the phone:** a "Copy bug report" button in Settings copies the war's seed, version, phone type and the last minutes of commands, which can be pasted into a message. Nothing is sent automatically. Next to it, a **"Copy playtest summary"** button (also shown at the end of a war) copies the ten playtest numbers of [Phase 11](11-prototyping-playtesting.md), section 5, with the same code and the same rule.

### 10. The crowd test (S7, approved 24/11/2026)
The riskiest technical question (Phase 1 and 2 risks) is whether a phone browser can draw a busy town: about 60 animated people, a town and a forest, at 30 frames a second. Everything else in this document is ordinary work; this one could change the plan (fewer people on screen, the Light look by default, or a smaller town).

**The test (S7, the director said yes):** before Phase 9, one short session adds a "crowd" switch to the live street: 30, 60, 120 and 200 animated Quaternius villagers walking about, with the frame rate shown, in both the usual and the "baked" animation ways (section 7.2). The director opens it on both test phones and reads off the numbers. No game rules, nothing else changes. Results go here.

**Results, 24/11/2026, main test phone (a recent high-end iPhone, Safari).** Live street, Full look, daytime, isometric view at normal zoom, landscape, drawn at 2× sharpness, every villager casting a shadow, nearly all of them on screen, the house in front faded to see-through. The read-out shows the average frame rate over 3 seconds, the slowest frame and the draw calls (shadow pass included). One reading each, so treat ±3 frames a second as noise. The weak test phone wasn't tested; the director judged the iPhone results enough for now.

| Villagers | Usual (own skeleton each): fps · slowest frame · draw calls | Baked: fps · slowest frame · draw calls |
|---|---|---|
| 30 | 32 · 36 ms · 575 | 40 · 36 ms · 334 |
| 60 | 24 · 55 ms · 843 | **30** · 53 ms · 328 |
| 120 | 19 · 58 ms · 1,361 | 23 · 46 ms · 332 |
| 200 | 23 · 84 ms · 2,048 | 19 · 55 ms · 326 |

**What it tells us**
- **Baked animation works on the phone and is the way to go (Verified).** The draw calls stay flat at about 330 whatever the crowd size, against roughly 10 more per villager the usual way, and the frame rate is about 20–25% higher from 30 to 120 villagers. 60 baked villagers reach 30 frames a second, the target, but with nothing to spare.
- **Draw calls are not the main limit (Likely).** Even with flat draw calls the frame rate still falls as villagers are added, and with only 30 villagers the street tops out at 40. The cost is mostly the drawing work itself: each Quaternius villager has about 2,300 to 7,200 corners (vertices), drawn twice (picture and shadow), on a screen drawn at 2× sharpness, with a see-through house on top.
- **The town is over its budget (Likely):** about 300 draw calls with 30 baked villagers, against 150 in section 7.1.

**What changes in the plan**
- Villagers use baked animation (section 7.2 confirmed).
- Lighter villager models for the isometric view: about 1,500 corners each, a cut made with glTF Transform (section 4) or simpler models.
- **Only two villager bodies** (one man, one woman), decided 24/11/2026 (docs/06 section 5.1): the crowd is the same body with different clothes colours, so only two light models need cutting and baking, and colours cost nothing extra. Named people (about 10 to 15) add their own head and hair; how those follow the baked animation is settled when the models are made (Guess: extra pieces moving with the head).
- Real shadows only for villagers near you; the rest get a soft round shadow on the ground.
- The automatic sharpness step-down (section 7.2) is needed, not optional; start at 1.5× on phones if a second test shows it pays.
- More of the town merged into fewer pieces, to get back under 150 draw calls.
- The 60-people budget (section 7.1) stays, but only with the steps above. The weak phone is checked in Phase 11 with the Light look and fewer people drawn.
- A second, short crowd test with switches for sharpness, villager shadows and lighter villagers would show which step matters most (proposed, not yet approved).

### 11. Words, sound, input
- **Words:** every line is looked up by a short key (`order.timber.east_wall`) in one file per language: English first, Portuguese next (Phase 12). Both fonts cover Portuguese accents (Likely). The Portuguese call-outs (Phase 6) are sound files with their written word and meaning in the text files.
- **Sound:** played through the browser's sound system (Web Audio) via Babylon.js. iPhones only allow sound after a tap, so the title screen's first tap turns it on. Files in MP3, which every phone plays; music loops are set to repeat without a gap. At most 16 sounds at once; the nearest win.
- **Input:** one handler for touch, mouse and pen. Joystick and Action button work at the same time (two thumbs). The page blocks the phone's own zoom, double-tap and long-press menus so they never fight the game. PC keys from Phase 2, changeable. Game controllers: 💤 later.
- **Vibration:** Android only (Phase 3); a setting turns it off.

### 12. Privacy and safety in code
- No accounts, no analytics, no ads, no outside servers, no cookies. The only connection is loading the game from GitHub Pages.
- Fonts, engine and models are inside the game, so no font or code website learns who plays.
- The public repo holds code, docs and assets only; logs and private notes stay off it (project rules).
- Every outside asset keeps its line in `assets/LICENCES.md`; the game's **Credits** screen lists the engine, libraries, fonts and models with their licences (Apache 2.0 asks for its licence text to be included).
- The game's own licence (Phase 9, section 4.7): all rights reserved, visible for learning, stated in the `LICENSE` file; outside assets keep their own licences.

### 13. Changes to earlier phases
Written into the earlier docs on 24/11/2026, after the director's "go".

| Where | Was | Now | Why |
|---|---|---|---|
| Brief, engine | Babylon.js + TypeScript + Vite, ASSUMPTION | Confirmed: Babylon.js 9, TypeScript, Vite, GitHub Pages; Capacitor for the app later | Section 4 |
| Phase 6, section 9 | 1 tile = 1 metre | Models in metres; **1 tile = 2 metres** | Matches the art kit's 2 m walls; sizes and ranges in tiles still read well |
| Phase 5, section 3.4 | Map about 96 × 64 tiles | **160 × 96 tiles** (320 × 192 m), first pass | Keeps "Hall to Hall in about 2 minutes" at the mock-up's walking speed |
| Phase 2, section 2.8 | About 130 moving units | Up to 256 living beings in the simulation; 60 drawn at once in isometric | Households, wolves and animals were missing from the count; drawing is limited, not the world |
| Phase 7, open risks | Smallest phone not set; fonts "to confirm" | 667 × 375 (iPhone SE); Alegreya and Atkinson Hyperlegible Next, Open Font Licence | Sections 2 and 4 |

---

### Phase 8 summary
- A web game in Babylon.js 9 and TypeScript, packed by Vite, published to the same GitHub link automatically, playable offline and from the Home Screen; Capacitor turns it into a phone app later without a rewrite.
- The war is a separate simulation with fixed steps and its own dice: it runs without graphics, so hundreds of test wars can check the balance and any bug can be replayed from a seed.
- Numbers, words, feedback and art are data files; the HUD stays in plain web elements as in the mock-up.
- The AI is built in layers (Warden plan, Steward needs and orders, workers, Captain, squads) and sees only what its people see.
- Saves are versioned snapshots on the device, with an export file for the family book because iPhone Safari can wipe web storage.
- Budgets: 30 frames a second, 150 draw calls, 60 animated people on screen, under 15 MB to download; the smallest phone is the iPhone SE.
- Biggest risk: drawing many animated people on a phone. The crowd test (S7, section 10) reached the target with 60 baked villagers on the director's iPhone, with nothing to spare; the real crowd is tested again in its own prototype (Phase 11, section 3).

### Decisions and why
| Decision | Why |
|---|---|
| Keep Babylon.js, move to version 9 inside the game | Already proven on the director's iPhone in the mock-up; packed inside, it works offline and needs no outside website |
| Simulation apart from drawing | Test wars without graphics, swappable art, simple saves, an option to move it to a background thread |
| HUD in web elements, not the 3D engine's UI | Already works on the iPhone; sharp text, easy translation and accessibility |
| Our own pathfinding, AI, dice and save format | Small for this game; no extra download; behaviour fully in our hands |
| 2 m tiles, 160 × 96 map | Fits the art kit and keeps the walking times Phase 5 promised |
| Snapshot saves with a version number, plus family book export | Updates never break old saves; the family saga survives a phone or browser wipe |
| No analytics or online services | Nothing to disclose, nothing to pay for, nothing to break (pillar 5) |
| Crowd test before Phase 9 (S7) | It's the one technical question that could change the design |

### Open questions and risks
- ✅ **S7:** yes to the crowd test on the live link before Phase 9 (the director, 24/11/2026). Section 10.
- ✅ **Q20:** test phones are a recent high-end iPhone and a 2018 Android phone with a worn battery (the director, 24/11/2026). Section 2.
- ⚠️ **No mid-range test phone:** the budgets are judged from a fast phone and a slow one (section 7.1). Borrowing a mid-range phone for one war at M3 closes the gap ([Phase 11](11-prototyping-playtesting.md), section 4).
- ⚠️ **Animated crowds on phones** are the top risk. Fallbacks, in order: baked animation, fewer people drawn (they still exist in the war), the Light look by default on weak phones.
- ⚠️ **The faction AI** is still the biggest build. The layered plan lets a simple version play a whole war first; test wars show where it's weak.
- ⚠️ **iPhone storage wiping** (section 6): the export file and "Add to Home Screen" soften it; only the phone app removes it.
- ⚠️ **iPhone app needs a Mac and fees** (section 8): fine for now, since the web link comes first; Phase 9 lists the costs.
- ⚠️ **Library updates** can break things: versions are pinned and upgraded one at a time, with the test wars and browser check run after each.

---

# Phase 9: Business, ethics and legal

*Source: [09-business-ethics-legal.md](09-business-ethics-legal.md)*

*Draft 24/11/2026, S22-LOOK. Approved by the director the same day ("Go, yes to both": Q24 and Q25). Builds on the brief ("free for now, maybe sell later", €0 budget) and on the open points earlier phases sent here: the age rating (Phase 4), name checks (Phase 4), AI-made art (Phase 6), the code licence and the phone app's costs (Phase 8). Prices, store rules and rating rules were looked up on the web on 24/11/2026; each claim carries its label. **Nothing here is legal or tax advice.** Before the first sale, one short talk with an accountant is in the plan (section 2.4).*

**In plain words:** the game stays free on the web while it's being made. If playtests show it's fun, it can be sold once, at one fair price, with the first war free to try: no ads, no paid luck, no timers that sell waiting. We only ship art, sound and code we're allowed to sell. The game collects nothing about its players. Violence stays stylised, and two kinds of people are never hurt: children and the old. That keeps the age rating around 12 and the game honest.

### 1. Pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **The player's time and money are theirs** | One price for the whole game. Nothing in the game is designed to make people pay, wait or come back out of fear of missing out. |
| 2 | **Own every piece we ship** | Every asset has a licence line that allows selling. No line, no asset (already the rule in `assets/LICENCES.md`). |
| 3 | **Collect nothing** | No accounts, analytics, ads or servers (Phase 8, section 12). Nothing to leak, nothing to disclose. |
| 4 | **War, but not cruelty** | People die in this game; it's about war. The defenceless are never targets, and nothing lingers on pain. |

### 2. Business

#### 2.1 Now: free, on the web
- The game is free at https://sichdar.github.io/the-hall-remembers/ while it's being designed and built. No purchases, no ads, no donation button.
- **GitHub Pages is not for selling.** GitHub's own rules say Pages isn't meant as free hosting for an online business or a site mainly for commercial transactions (Verified, GitHub Pages limits page, 24/11/2026). So the Pages link stays the free test and demo link for good; any sale happens somewhere else (section 2.2).

#### 2.2 Later, if it's fun: one fair price
Only after Phase 11's playtests say the game is fun (the brief: "if the game proves fun"). Until then this section is a plan, not a decision.

| Where | How it works | Cut and costs |
|---|---|---|
| **itch.io** (web and PC) | The same web game, uploaded as a page. A free demo (the first war) and the full game for a price, or "pay what you want" | itch.io's default cut is 10%, and the seller can change it; the payment service takes about 2.9% + $0.30. With itch.io's own payouts, itch.io collects and pays EU VAT (Likely, itch.io payments docs) |
| **Google Play** (Android) | Capacitor app (Phase 8, section 8) | One-time $25 to open the account (Likely: third-party guides, not Google's own page). Google keeps a cut of each sale |
| **App Store** (iPhone) | Capacitor app | $99 a year, shown in local currency (Verified, Apple's enrolment page). Apple keeps a cut of each sale. Building needs a Mac or a paid online Mac; GitHub's Mac build machines may be free for public repos (Guess, check before relying on it) |

**The model:** one price for the whole game, the first war free. No ads, no in-game shop for real money, no subscriptions.
- 💤 A later, optional "supporter edition" with cosmetic extras only (a family crest, a banner colour) is allowed by pillar 1. It's not planned.
- The free web link stays up even after a sale starts: the demo, and the version early players already know.

#### 2.3 What we never do
Each of these is a common money-maker in phone games. All are out, for good:
- **Paid luck:** no loot boxes, chests or random rewards for real money.
- **Selling waiting:** no energy bars, timers or "speed up for gems".
- **Fear of missing out:** no daily login rewards that punish a missed day, no limited-time offers, no countdowns.
- **Pay to win:** nothing for money makes your villager or town stronger.
- **Fake currency:** prices are in real money, never in gems or coins bought with money.
- **Nagging:** no push notifications, no "rate us" pop-ups during play, no ads.
- **Data:** no tracking, no selling data, no accounts needed (pillar 3).

#### 2.4 Costs
| Item | When | Cost |
|---|---|---|
| Hosting (GitHub Pages), engine, models, fonts | Now | €0 |
| itch.io page | Only if sold | €0 to open; cut per sale (section 2.2) |
| Google Play account | Only for the Android app | $25 once (Likely) |
| Apple developer account | Only for the iPhone app | $99 a year (Verified) |
| A Mac or online Mac to build the iPhone app | Only for the iPhone app | €0 to €30 a month (Guess, depends on the route) |
| Own web address (optional) | Any time | About €10 to €15 a year (Guess) |
| Talk with an accountant | Before the first sale | One session; cost unknown |

**Tax, in short (Likely, check with the accountant):** the stores handle sales tax (VAT) for the buyer in most cases. The money the director earns is still income, and in Portugal selling usually means registering the activity with the tax office first. US stores may hold back part of the payment for US tax unless a tax form is filed.

#### 2.5 Who buys it, honestly
- **The player** (brief): adults about 25 to 45 who grew up with classic strategy games and now play on phones in short sittings.
- **The hook:** you aren't the king, you're one villager in a war the computer plays around you. That's rare (Guess: none of the games studied so far does it this way).
- ⚠️ **The hard part:** phone stores are full of free games paid for by ads and shops, and paid phone games sell in small numbers. The web link and itch.io are a cheap way to find out whether people want it before paying Apple's yearly fee.

### 3. Ethics

#### 3.1 Violence: who can be hurt
The game is a war, so soldiers and working adults can fight and die, you included. The rules below keep it a war story, not a cruel one, and keep the age rating down (section 4.6).

| Who | In a raid or battle |
|---|---|
| Soldiers (yours and theirs) | Fight and can die |
| Working adults (you, your spouse or sibling, other villagers) | Can be attacked and can die, as Phase 2 says |
| **Children** | **Never targeted, never hurt** (Q25, yes). When the raid bell rings they run to the house's cellar or the Hall on their own. Raiders walk past them. |
| **The old** (your old parent, the elderly) | **Never targeted, never hurt**, same as children. They die only of old age, between chapters. |
| Wolves and animals | Can be fought and hunted |

- **How death looks:** a fall, a short fade, a grave by the chapel and a line in the Chronicle (Phase 2 and 4). No blood pools, no wounds, no cries of pain held on screen, no bodies left lying in the street.
- **Leading your family to the Hall** (Phase 2, section 2.7) stays: it's how you protect your spouse or sibling, and children still follow you there. Children reaching safety on their own makes the bell scarier for the adults, not for them.
- **Burning houses:** buildings burn and can be rebuilt (Phase 6). No one is ever shown trapped inside.

#### 3.2 War, traitors and revenge
- **No side is evil.** Almara and Quintara are both ordinary towns (Phase 4). The enemy has names, families and graves too.
- **The Chronicle remembers everything**, good and bad: cowardice and betrayal are remembered like bravery. The game shows what war costs; it doesn't cheer for it.
- **Grudges** (S1) are limited to the one enemy who killed you, in the war. No revenge on families, no tormenting.
- **Changing sides** has a real cost (Phase 1), and it's shown as a hard human choice, not as villainy.

#### 3.3 Real people and places
- The world is made up: no real countries, peoples, religions or historical events. The chapel is a plain village chapel with no named faith.
- **Portuguese words** (Phase 6) are used with warmth, as part of the world's sound, never as a joke on the language. Native speakers record them.
- The family names and first names are made-up or common ones. No real, living person's name on purpose.

#### 3.4 Respecting the player
- **Pause any time** from the Pause button (Phase 7) and autosave (Phase 2); the calm mode, text size and colour-blind banner shapes (Phase 7) stay.
- **Sessions end cleanly**: a war takes 20 to 40 minutes (brief), and autosave means stopping never loses the war.
- Death costs time and items, never the run (Phase 2): losing is never a reason to pay or start over.

#### 3.5 Privacy
- The game collects nothing about its players. Saves stay on the device (Phase 8, section 6).
- GitHub serves the page and keeps its own visitor logs under its own privacy statement (Likely). Our privacy page says so.
- **A short privacy page** in the repo (one paragraph: "this game collects no data; saves stay on your device; GitHub/the store serve it") is needed before any app store: both stores ask for a privacy policy link and a privacy form, even for games that collect nothing (Likely). Apple's label would read "Data Not Collected".

### 4. Legal

#### 4.1 The inspiring game
- Already the project rule: never its name, art, units, unit names, resource set, music, sounds or signature rules, in the game or in the public repo.
- Broad ideas (villagers, gathering, towns at war, a central hall) are common to the whole genre; a particular game's art, words and specific design choices belong to their makers (Likely; this is the usual reading, not legal advice).
- Screenshots of other games never go in the public repo (project rule).

#### 4.2 Our names
| Name | What the search found (24/11/2026) | Verdict |
|---|---|---|
| **The Hall Remembers** | No game with this title. Near names exist ("The Hall of Remembrance", "Hall of Memories", small itch.io projects) | Looks free to use (Likely) |
| **Bloodlines** (subtitle) | A common word in game titles, but strongly tied to a well-known vampire role-playing series, whose maker filed a trademark on "Vampire Bloodlines" | Not a legal block by itself (Likely), but players searching the stores would land on the vampire games. **Kept** by the director (Q26, 24/11/2026); the trademark search before any sale still covers it |
| **Almara**, **Quintara** | No game or fantasy town with these names. Near spellings exist (Alvara, Almora) | Fine (Likely) |

**Before any sale:** one free search of the trademark databases for the final title (the EU's and the US's free search sites), noted in this doc.

#### 4.3 Licences of what we use
| What | Licence | What it asks |
|---|---|---|
| Babylon.js | Apache 2.0 (Verified in Phase 8) | Keep its licence text and credit in the Credits screen |
| Quaternius models | CC0 (Verified in `assets/LICENCES.md`) | Nothing; credit is kind and given |
| Fonts (Alegreya, Atkinson Hyperlegible Next) | SIL Open Font Licence (Phase 8) | Ship the licence with the fonts; don't sell the fonts on their own |
| Music and sound effects | Not chosen yet (Phase 6) | Only CC0, CC-BY with credit, or made by us. No "non-commercial" licences |
| **Portuguese voice words** | Recorded by the director (Phase 6, changed 25/11/2026) | Nothing for the director's own voice; a short signed consent for anyone else who records (section 4.4) |

#### 4.4 Other people's voices
The director records the voice words (25/11/2026), so no consent is needed for now. A recorded voice is personal data under EU privacy rules (Likely). If anyone else records later, before their recording goes in the game they sign a one-page consent:
- what they recorded and that it's used in this game, including if it's sold later, in any country, with no payment (or the payment agreed);
- whether their name goes in the Credits;
- that they can ask for their voice to be removed from **future** versions; copies people already have can't be recalled.

The signed forms stay private (never in the public repo).

#### 4.5 AI-made content
- **No AI-made art, music or voices in the game** (Phase 6 said "not for now"; this makes it the rule). Reasons: who owns AI art is unclear, stores ask about it, and players of this genre care.
- **The code and docs are written by an AI assistant (Claude) under the director's direction**, which the README says openly. The assistant's terms give its output to the user (Likely). In some countries, parts written purely by a machine may have weaker copyright protection (Likely). Practical effect: little; the game's value is the whole of it, its design, its name and its store pages.
- When a store asks whether AI was used, the answer is honest: "code written with an AI assistant; no AI-made art, sound or voices".

#### 4.6 Age rating
- **The web page** needs no rating. **The app stores** need one, from a questionnaire the director fills in: Google Play uses the shared international questionnaire (IARC), which gives the European PEGI rating (Likely); Apple has its own, with the age groups 4+, 9+, 13+, 16+ and 18+ since July 2025 (Verified, Apple developer news).
- **Target: PEGI 12, Apple 13+** (Guess until the questionnaires are filled in). PEGI places violence against vulnerable or defenceless people (children, the old) at 16 or 18, and realistic violence against humans at 16 (Likely: PEGI's label descriptions as reported by several guides).
- **What keeps it there:**
  - stylised low-poly people, no blood and no gore (section 3.1);
  - children and the old are never hurt (section 3.1);
  - no swearing worse than "blast" and "rot" (Phase 4);
  - no gambling and no paid random rewards (section 2.3);
  - the serious, gritty tone stays parked (docs/later); turning it on would likely raise the rating.

#### 4.7 The game's own licence
- **Today the repo has no licence file.** By default that means all rights reserved: anyone can look, but not copy or reuse (Likely).
- **Decided (Q24, yes):** a short `LICENSE` that says so plainly: the code, docs, game text and the game's own art and sounds are © the director, all rights reserved, visible for learning; outside assets keep their own licences (`assets/LICENCES.md`). This keeps "maybe sell later" open. Open-sourcing can still happen later; going the other way is hard once copies exist.

### 5. Changes to earlier phases
Written into the earlier docs on 24/11/2026, after the director's "go".

| Where | Was | Now | Why |
|---|---|---|---|
| Phase 2, section 2.7 (family in a raid) | Each family member "may hide, flee or be hurt"; "They can die" | Adult family members can be hurt and die; **children and old parents run to the cellar or the Hall on their own and are never hurt** (Q25) | Section 3.1: no harm to the defenceless; age rating |
| Phase 4, open questions and risks | Name checks for Almara and Quintara still to do | Done: no clash found (section 4.2) | Section 4.2 |
| Phase 6, section 2 (AI-made art) | "Not used for now" | Not used, as a rule (section 4.5) | Ownership unclear, stores ask, players care |
| Phase 8, section 12 | Code licence "a Phase 9 decision" | All rights reserved, with a `LICENSE` file (Q24, yes) | Section 4.7 |
| Brief, business model | "Free for now; keep the door open to selling later" | Adds: one price, first war free, no ads or paid luck; Pages stays the free link | Sections 2.1 to 2.3 |

---

### Phase 9 summary
- Free on the web while it's built; GitHub Pages stays the free link, since its rules don't allow selling there.
- If playtests show it's fun: one price for the whole game, the first war free, on itch.io first, then Google Play and the App Store. Costs only start then: $25 once for Google, $99 a year for Apple.
- Never: ads, loot boxes, timers that sell waiting, daily-login pressure, pay to win, fake currency, tracking.
- Violence is stylised; children and the old are never hurt. Target rating PEGI 12 / Apple 13+.
- Only assets that allow selling; anyone besides the director who records a voice signs a consent; no AI-made art, sound or voices.
- The title looks free; "Bloodlines" may be confused with a famous vampire series in store searches.
- The repo has an "all rights reserved" licence file (Q24).

### Decisions and why
| Decision | Why |
|---|---|
| Free web link now, sales elsewhere later | GitHub Pages' rules; nothing to pay until the game proves itself |
| One price, first war free | Fair to players, matches pillar 1, and the demo sells the game better than ads would |
| The never-do list (section 2.3) | These designs make money by pressuring players; they'd also break "free agency", the game's core rule |
| Children and the old are never hurt | Cruelty adds nothing to the story; it would push the rating to 16 or 18 |
| No AI-made art, sound or voices | Unclear ownership, store questions, players' trust |
| All rights reserved, source visible | Keeps selling possible; opening it later stays an option |
| Consent forms for anyone else's voice | Their voice is theirs; a sale later must not surprise them |

### Open questions and risks
- ✅ **Q24:** yes, the `LICENSE` file is in the repo (the director, 24/11/2026). Section 4.7.
- ✅ **Q25:** yes, children and old parents are never hurt; adults can still die (the director, 24/11/2026). Phase 2, section 2.7 changed. Section 3.1.
- ✅ **Q26:** the subtitle "Bloodlines" stays (the director, 24/11/2026). Section 4.2.
- ⚠️ **Store rules and prices change.** Re-check sections 2.2, 2.4 and 4.6 against the stores' own pages right before any launch.
- ⚠️ **Tax is the director's**, not the store's: one talk with an accountant before the first sale (section 2.4).
- ⚠️ **Paid phone games sell in small numbers** (section 2.5). The free link and itch.io test the interest first.
- ⚠️ **"Free" stays easy only while nothing is sold:** the first sale brings tax forms, store accounts, a privacy page and the consent forms. Phase 12's launch list (section 3) and sale list (section 8) collect them.

**Sources checked 24/11/2026:** GitHub Pages limits (docs.github.com); Apple developer enrolment and the July 2025 age-rating news (developer.apple.com); itch.io payments docs (itch.io/docs/creators/payments); PEGI label descriptions (pegi.info and guides); web searches for the title and town names.

---

# Phase 10: Scope and production plan

*Source: [10-scope-production.md](10-scope-production.md)*

*Draft 24/11/2026, S23-SCOPE. Approved by the director the same day ("Go, finish doc first": Q27). Builds on the brief (weekends, €0, the director directs and playtests, Claude writes all code), on the content budget in Phase 5 (section 6), on the build plan and tests in Phase 8, and on the money plan in Phase 9. Answers the points earlier phases sent here: when to pay for detailed art (Phase 6, step C), whether and when to make the phone apps (Phase 8, section 8), and where the waiting gaps and picks go (G6, G10 to G14; P4, P5, P7, P8). All time estimates are **Guess**: nothing has been built at this scale yet.*

**In plain words:** we build the game in seven steps, called milestones. Each one ends with something the director plays on the iPhone, then a "go" before the next. The first three build the smallest war that can be fun: one map, two towns, two jobs, raids, death and an heir. That's the **first playable**, and it's where we ask the big question: is it fun? Only if the answer is yes do we add the rest of the content, sound and polish for version 1.0 on the web link. Everything costs €0 until people have played it and liked it. If we fall behind, we cut content, never the heart of the game.

### 1. Production pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Playable on the phone at every step** | Every milestone ends on the live link, played on the director's iPhone. No milestone is "only code". |
| 2 | **Fun before big** | The smallest war that can be fun comes first. Content is added only after the first playable passes the fun check (section 5). |
| 3 | **Cut width, never the heart** | When time runs short, a job, an enemy or a map goes; the things in section 3.5 never do. |
| 4 | **The simulation proves the numbers** | Test wars (Phase 8, section 9) check balance before the director spends a weekend playing. The director's time is for feel and fun, not for finding broken numbers. |
| 5 | **One goal per session** | Each work session has one stated goal and ends with something to try or a finished document. New ideas are written down and parked, never started on the spot (section 7). |

### 2. Who does what
| Who | Does |
|---|---|
| **The director** | Decides, playtests on the iPhone (and the older Android phone at the milestone checks), says "go", records the Portuguese voice words (Phase 6, section 8.4), plays the fun check alone at milestone 3 ([Phase 11](11-prototyping-playtesting.md), section 7), and brings in outside players when ready |
| **Claude** | All code, data files, tests and test wars, model assembly from the free packs, documents, the project log, the public repo |
| **Outside players (later)** | Play a whole war when the director is ready, at the latest before 1.0 ([Phase 11](11-prototyping-playtesting.md), section 7.5); anyone else who records a voice signs a consent (Phase 9, section 4.4) |

**Rhythm (Guess):** most work happens at weekends, one or two sessions a day. A session is one to three hours of the director's attention. Claude's typing speed is not the limit; the limits are the director's playtest time and how much one session can hold before it needs a fresh start (the log carries everything across sessions).

### 3. Scope: what's in, what waits

Four tiers. "First playable" is the smallest war that can be fun. "Version 1.0" is the free web release (Phase 12). "Updates" come after 1.0, one or two features at a time. "Not planned" is a firm no for now.

#### 3.1 First playable (milestones 1 to 3)
| Area | In the first playable |
|---|---|
| Map | The Guided Coast only (fixed map, summer, 160 × 96 tiles) |
| Towns | Almara (you) and Quintara, both run by a simple faction AI that gathers, builds, grows and raids |
| Time | Day, dusk, night; 6-minute days; the dusk bell |
| Jobs | **Woodcutter and Farmer** (Quarry worker and Builder come in milestone 4) |
| Work feel | Optional beat taps, carry, deliver, get paid; the land near the Hall runs out (G1) |
| Orders | The notice board with 3 kinds of order from Phase 2, section 2.3: deliver loads, guard the gate at night, answer the muster (scouting comes in milestone 4) |
| Shop | The Baker and the Smith, about 8 items in total |
| Body | Health and hunger, eating, sleeping at home |
| Combat | Tap to attack, Brace, Heavy strike; join and leave the army freely |
| Enemies | Wolf, scout, spearman |
| Danger signs | Raid warnings and the watchman's bell (Phase 2, section 2.9) |
| Family | Your household at home (2 to 4 people); on death you pick the heir, who inherits your goods |
| The Roll | Reputation with your own town only |
| End | The Hall falls in stages; the war ends |
| Save | Save and resume one war on the phone |
| Looks | Full (Quaternius) and Light (plain shapes); isometric and first person; zoom toggle |
| Interface | The mock-up's HUD, notice board, shop, map, bag, Roll, settings, pause |
| Sound | Placeholder effects only; no music yet |

#### 3.2 Version 1.0 (milestones 4 to 6)
Everything in 3.1, plus:
- **Content to the Phase 5 budget:** 4 jobs and the army hauler, about 15 building types in 3 town stages, about 22 items, 6 enemies plus the outpost, 17 deeds, 3 difficulty levels, the random Coast map after the first war.
- **Systems:** changing sides and the traitor's heir, reputation with both towns, traits and the knack job, grudges, the town's timetable and night watch, drop-off camps, foraging and seasons, the stalemate breaker and the battering ram.
- **Across wars:** the family saga (what carries over, unlocks, crest), the Chronicle book, nicknames, the statue, the family book export.
- **From the waiting gaps and picks** (proposed tiers):
  - **G6** surplus and bread prices: stock signs and prices follow what piles up. Small, ties the economy together.
  - **G10** falling behind is visible: empty stalls, higher prices, fewer guards, rumours. Makes the war readable from the street.
  - **G12** forests are walls: thick woods block walking except on paths; chokepoints matter. A map rule, cheap once the map exists.
  - **G13** a new town stage is a festival day. Cheap, and a good Chronicle moment.
  - **P8** short choice cards for story events (2 or 3 choices, some only for a trait). Cheap to make, easy on a phone.
- **Sound and words:** music that follows the danger, the full effects list, the Portuguese voice words, ambient sound by place.
- **Onboarding:** the guided first war teaches by playing (Phase 3, section 2).
- **Accessibility and settings** from Phase 7 (text size, Portuguese meanings, calm mode, game speed).
- **Offline and Home Screen**, "a new version is ready", the "Copy bug report" button.
- **Languages:** English, with the text kept in data files so a Portuguese translation can follow in an update.

#### 3.3 Updates after 1.0 (no order yet)
A proposed order, 1.1 to 1.6, is in Phase 12, section 6.1.

- Maps: River, Hills, Wolfwood. Starting in Quintara.
- Jobs: fisher, salt raker, olive picker, baker's helper, scout (one or two per update).
- Enemies: archer, horse rider, catapult.
- **G11** houses and crowding, with the parked homeless life and stealing, which needs **P7** (crime someone must see) first.
- **P4** unfinished life goals passed to the heir; **P5** neighbours who remember you.
- House interiors (needs a furniture pack).
- Portuguese translation of all text.
- Detailed art (step C) and the phone apps: only on the rules in section 6.

#### 3.4 Not planned
Commanding armies or the town (it breaks the core idea), multiplayer, accounts or online services, ads, paid luck or timers (Phase 9), sea battles (parked), lords and nobles as playable characters.

#### 3.5 Never cut, whatever happens
One villager's eyes on a war the computer plays · every order optional · the family and the heir · isometric view with first person one button away · two thumbs on a phone · the Roll · children and the old never hurt.

**G14 (threat must be tested)** isn't a feature: it becomes a fixed check in the test wars and in Phase 11's playtests.

### 4. Milestones
Each milestone starts with its prototype, the piece most likely to fail ([Phase 11](11-prototyping-playtesting.md), section 3: P-WORK and P-DAY in M1, P-RAID and P-DEATH in M2, P-AI before M3, P-CROWD in M1 and M2). Each milestone ends with: the test wars passing, the browser check at three phone sizes, the build live on the GitHub link, and the director's phone check. Then the director says "go", "change" or "stop".

| # | Milestone | What the director can do at the end | Phone check asks | Time (Guess) |
|---|---|---|---|---|
| **M0** | **Foundations** | Exactly what works today (the street, both looks, the HUD), but rebuilt on the real setup: TypeScript, Babylon.js 9, Vite, automatic build and publish, tests running, works offline | Does it still open and feel the same? | 1 weekend |
| **M1** | **A day in Almara** | Live a full day: chop or farm, carry, get paid, buy bread, eat, sleep; neighbours work by the timetable; the Steward posts orders; night falls | Is ten minutes of work pleasant? Are the controls right? | 2 weekends |
| **M2** | **The other town** | Quintara grows across the map; scouts and wolves appear; warnings and the bell; fight, die, pick an heir from your household | Does a raid feel scary but fair? Is dying sad but not punishing? | 2 to 3 weekends |
| **M3** | **First whole war (first playable)** | Play the Guided Coast from Day 1 until a Hall falls; save and come back; the Roll | **The fun check (section 5)** | 2 weekends |
| **M4** | **Content complete** | All of section 3.2's content and systems, rough but working | Is anything missing or dull? Is a war still 20 to 40 minutes? | 4 to 6 weekends |
| **M5** | **Sound, words and welcome** | Music, effects, voices, the guided first war, settings, the Chronicle book finished | Would a stranger understand the first 10 minutes? | 2 to 3 weekends |
| **M6** | **Version 1.0** | Balanced with 500 overnight test wars, bugs fixed, checked on both phones; launched on the web link (Phase 12) | Is it ready for strangers? | 2 weekends |

**Totals (Guess):** first playable in about **7 to 8 weekends** (about two months); version 1.0 in about **15 to 21 weekends** (four to six months). Faster weeks like this one would shorten it; busy months would stretch it. The estimate is checked at the end of each milestone and changed in the log, openly.

**Why this order:** the faction AI (the biggest build, Phase 8) grows across M1 to M3 in layers: first a town that only gathers and grows, then one that raids. The crowd and phone-speed work (Phase 8, section 10) lands in M1 and M2, when there are real crowds to measure.

### 5. The fun check (end of M3)
The one decision that shapes everything after it.

- **Who plays:** the director alone first, three whole wars on three different days (changed 25/11/2026, the director); at least 3 outside players later, when the director is ready. The exact questions, the observation sheet and how a session runs are in [Phase 11](11-prototyping-playtesting.md), section 7.
- **Passes if** (in short; the seven-part rule with "close" and "fail" is in [Phase 11](11-prototyping-playtesting.md), section 7.4): the wars are finished and the director wants another one; each war had its own goal; at least one moment is told as a story afterwards ("my heir took revenge on the man who killed me").
- **If it passes:** go to M4.
- **If it's close:** one or two "change" rounds of about 2 weekends each, aimed at what the players said, then check again.
- **If it still isn't fun after two rounds:** stop and rethink before adding content. Options then: a smaller game (one town and wolves, no war AI), a different core loop, or parking the project. Saying this now keeps a weak idea from eating months.

### 6. Money and the decisions waiting for proof
Everything up to version 1.0 costs **€0** (Phase 9, section 2.4). What counts as proof for each step, with numbers, is in Phase 12, section 7 (the gates).

| Decision | Waits for | Then |
|---|---|---|
| **Detailed art (Phase 6, step C)** | Version 1.0 live and played by people outside the family and friends | Compare a paid model pack plus edits against a hired 3D artist, with a spending cap the director sets then. Never before the fun check |
| **Selling on itch.io** | Version 1.0 and the fun check passed | Free demo (first war) and the full game (Phase 9, section 2.2); talk to an accountant first |
| **Android app** | Interest on the web link or itch.io (people finishing wars, asking for an app) | $25 once; Capacitor build (Phase 8, section 8) |
| **iPhone app** | The Android app doing well, or clear demand | $99 a year plus a Mac or online Mac; the only real fix for iPhone save wiping |

### 7. How we keep track
- **The project log** (private) is the tracker: each milestone becomes one request with its steps, opened when it starts and closed after the phone check.
- **Done when:** a milestone is done only when its "What the director can do" column works on the live link and the phone check is answered.
- **New ideas during building** go to `docs/later/` with one line on why, and are looked at only at the end of a milestone. This protects the current milestone without losing the idea.
- **Every change to a design decision** is written back into its phase document, so the documents stay the true description of the game.
- **Versions:** each milestone ends with a tagged version on GitHub (M0 = 0.0, M3 = 0.3, version 1.0 = 1.0), so any milestone can be played again.

### 8. If we fall behind: what goes first
In this order, one at a time, only after asking the director:
1. The random Coast map (the Guided Coast stays).
2. The Downtown stage (towns stop at stage 2).
3. The battering ram (a simpler stalemate breaker: both towns run low on food).
4. Foraging and seasons (always summer).
5. The Quarry worker (stone comes from the AI's own workers).
6. Choice cards (P8) and the festival day (G13).
7. Some deeds and items (keep at least 10 deeds and 15 items).

Nothing in section 3.5 is ever on this list.

### 9. Risks
| Risk | Size | What we do |
|---|---|---|
| The faction AI takes far longer than planned | High | Built in layers (Phase 8, section 5.4); a town that only grows is playable in M1; test wars show where it's weak |
| The first playable isn't fun | High | Found out at M3, before most of the work, with a clear rule for what happens next (section 5) |
| Too many new ideas while building | Medium | One goal per session; ideas parked in `docs/later/` and looked at between milestones (section 7) |
| Phone speed with real crowds | Medium | Measured at every milestone on two phones; the fallbacks from Phase 8, section 10 |
| The director's free time changes | Medium | Milestones are small and self-contained; the log means any session can pick up where the last stopped |
| Free packs lack a needed model | Low | Plain shapes stand in (the Light look); a missing piece never blocks a milestone |
| iPhone wipes saves | Low until 1.0 | Family book export and Home Screen in M5; the iPhone app later (section 6) |

### 10. Changes to earlier phases (written in 24/11/2026, after the director's "go")
- **Brief:** a line for Phase 10 (milestones, the fun check, €0 until proven).
- **Phase 6, section 2:** step C's "decided then (Phase 10)" points to section 6 here.
- **Phase 8, section 8:** the phone app's "whether and when" points to section 6 here; section 9's "each milestone" points to section 4.
- **Vision-check report:** G6, G10, G12, G13 placed in version 1.0, G11 in updates, G14 in the test wars and Phase 11.
- **The four-games research (P4, P5, P7, P8):** P8 in version 1.0; P4, P5, P7 in updates (private report, noted in the log).

### Phase 10 summary
- Seven milestones, each ending on the director's iPhone: M0 foundations, M1 a day in Almara, M2 the other town, M3 the first whole war, M4 content, M5 sound and welcome, M6 version 1.0.
- The first playable (M3) is one map, two towns, two jobs, three enemies, raids, death and an heir: about two months of weekends (Guess).
- The fun check at M3 decides whether content is added, the game is changed, or the project is rethought.
- Version 1.0 is the Phase 5 content budget plus G6, G10, G12, G13 and P8; about four to six months of weekends (Guess).
- €0 until people have played and liked version 1.0; then art, itch.io and the apps, in that order.
- If behind, content is cut in a set order; the heart of the game never is.

### Decisions and why
| Decision | Why |
|---|---|
| Milestones that each end on the phone | The director judges by playing; a milestone that can't be played can't be judged |
| Two jobs in the first playable | Woodcutter and Farmer feed the two things the war needs (timber to build, grain to grow); four jobs would slow the fun check |
| Fun check at M3, the director alone first, outside players later | M3 is the cheapest point to change course; outside players aren't counted on yet (the director, 25/11/2026), so the solo check is made as strict as it can be, and strangers still decide every money step (Phase 12, section 7) |
| A written "stop" rule | Keeps a weak core from absorbing months of content work |
| €0 until 1.0 is played by strangers | Phase 9: find out whether people want it before paying for art or store fees |
| Ideas parked between milestones | New ideas are welcome, but starting them mid-milestone is the fastest way to finish nothing |

### Open questions and risks
- ✅ **Q27:** building starts after the whole design document is finished (Phases 11 and 12, then the combined document); then M0 (the director, 24/11/2026).
- ⚠️ **All time estimates are guesses** until M0 and M1 show the real pace; section 4 is updated after each milestone.
- ⚠️ **A designer can't fully judge their own game's fun.** The solo fun check catches a game that isn't fun even for its maker; outside players or the first strangers are still needed before any money is spent.
- ⚠️ **The faction AI** remains the biggest single risk to the schedule (Phase 8).

---

# Phase 11: Prototyping and playtesting

*Source: [11-prototyping-playtesting.md](11-prototyping-playtesting.md)*

*Draft 25/11/2026, S24-PLAYTEST. Approved by the director the same day ("Go"). Builds on the risks named in Phases 1 and 2 (is the work fun, can a phone draw the town), on the testing plan in Phase 8 (section 9), on the milestones and the fun check in Phase 10 (sections 4 and 5), on the never-do list in Phase 9 (no tracking) and on gap G14 of the vision check (threat must be tested). Pass marks and numbers are first-pass (**Guess**) until the first playtests show what is normal.*

**In plain words:** before we build the whole game, we answer its scariest questions with small, quick pieces: is chopping wood fun for ten minutes, does a raid feel scary but fair, can the phone draw a busy town. Each piece is the first thing built in its milestone, so a "no" costs a weekend, not a month. Then we test in three ways: the computer plays hundreds of wars to check the numbers, the director plays every milestone on the iPhone with a short checklist, and at the first playable, the director plays three whole wars as a player, with notes and fixed questions. Outside players join later, when the director is ready. This document writes down the exact questions, what counts as a pass, and how what players say turns into changes. Nothing about players is ever sent anywhere: the game only shows a summary that a player can copy and send if they want to.

### 1. Playtest pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Ask the scary question first** | Each milestone starts with the smallest piece that answers its biggest unknown (section 3), before anything is built on top of it |
| 2 | **Watch, don't explain** | In a playtest nobody helps the player. Where they get stuck is the finding. Questions come after the war, not during |
| 3 | **Numbers from the computer, feelings from people** | Test wars find broken numbers overnight; people's time is for feel, fear and fun (Phase 10, pillar 4) |
| 4 | **Nothing leaves the phone by itself** | No tracking, no automatic sending (Phase 9). The game shows a summary; the player chooses to copy it |
| 5 | **The director decides** | Players report what they felt; the director decides what changes. One player's wish is noted; two players saying the same thing is acted on (section 8) |

### 2. What we have already tested
Four small prototypes ran before this phase. They count: their lessons are already in the design.

| Prototype | Question | Answer | What it changed |
|---|---|---|---|
| One-street style test (S2, 22/11) | Which look works on a phone? | Quaternius models, plain shapes as fallback | Phase 6 look ("Full" and "Light") |
| Clickable interface mock-up (S3, 22/11) | Does the screen layout fit two thumbs? | Yes after fixes: the north gate wasn't labelled on the map; landscape stretched after rotating | Order places on the map, gold rings, portrait play, zoom toggle (Phase 7) |
| iPhone retests (22/11 to 24/11) | Do portrait and zoom work? | "Upright and sideways work. Zoom works too" | Portrait allowed (brief) |
| Crowd test (S7, 24/11) | Can the phone draw 60 animated people? | Only just: 30 frames a second with baked animation, nothing to spare | Lighter villagers, two bodies, near-only shadows (Phase 8, section 10) |

**Lesson for the rest:** each one took a single session and found something no document could have. Small and early works.

### 3. The prototypes still to come
Each is the **first piece built in its milestone**, on the real setup from M0 (not thrown away), with plain shapes where art isn't ready. Each has one question, a pass mark, and what happens on a "no".

| # | Prototype | The question | Smallest version | Pass mark (Guess) | If it fails | When |
|---|---|---|---|---|---|---|
| **P-WORK** | **Chop and carry** | Is the villager's work fun for ten minutes without the war? (Phase 1's biggest risk) | One tree line, the timber yard, the beat ring, carry and get paid; no neighbours, no night | The director plays 10 minutes and wants to keep going; at least half the strokes on the beat after 3 minutes; the automatic mode still feels fine | Try the two other work ideas below before building more of M1 | M1, first weekend |
| **P-DAY** | **One full day** | Does a 6-minute day hold enough to do? | P-WORK plus the Baker, hunger, the dusk bell and sleeping at home | The director finishes a day without waiting around for more than 30 seconds at a time | Change the day length in the data file (5 or 8 minutes) and try again | M1, end |
| **P-RAID** | **The first raid** | Does a raid feel scary but fair? (G14) | A fixed raid of 3 scouts on Day 2 with all the warning signs and the bell, on the M1 town | The director sees it coming, says "I had time to choose", and the raid still hurts (a house burns or coin is lost) | Earlier or louder warnings (more time), or a harder raid (more hurt) | M2, first weekend |
| **P-DEATH** | **Death and the heir** | Is dying sad but not punishing? | The death card, the heir card, inheriting the sack, on P-RAID | The director wants to carry on as the heir straight away; can say who the heir is and what they got | Change what is kept (Phase 2, section 2.7) or slow the moment down | M2 |
| **P-AI** | **A war with nobody watching** | Can the faction AI play a whole war on its own? | Two towns that gather, grow and raid, with no picture at all, run as test wars | 10 quick wars all end; 95% of 500 end by Day 7 (Phase 2); neither town wins more than 65% of the time on the even map | Simplify the AI's choices (Phase 8, section 5.4) before adding graphics to it | M2 to M3, before the first whole war |
| **P-CROWD** | **The real crowd** | Do the crowd fixes from Phase 8 hold up with a real town? | M1's town with 60 baked, lighter villagers, near-only shadows, sharpness step-down | 30 frames a second on the iPhone; 20 on the 2018 Android with the Light look | The fallbacks in Phase 8, section 10, in order | M1 and M2 |

**If P-WORK fails**, two other work ideas are tried, one weekend each, before rethinking the core (Phase 10, section 5):
- **Fewer, bigger moments:** no beat ring; instead each tree takes one long hold-and-release with a sweet spot, and loads are bigger.
- **Work as errands:** less chopping, more carrying to where the town needs it right now (the wall, the forge, the field camp), so the "why" carries the fun.

### 4. The three kinds of test
| Test | Who | When | What it checks | Cost |
|---|---|---|---|---|
| **Test wars** | The computer, with robot players (worker, soldier, coward, turncoat) | 10 quick wars on every change; 500 overnight before each phone check | The numbers in section 5 | Nothing: runs on its own |
| **Milestone phone check** | The director, on the iPhone (the 2018 Android at M1, M3 and M6) | End of every milestone | The checklist in section 6 | About 30 to 60 minutes |
| **Fun check** | The director alone first; at least 3 outside players later (section 7.5) | End of M3 (first playable) | The questions and pass rule in section 7 | Three whole wars on three days (20 to 40 minutes each) plus 5 minutes of questions after each |

Two smaller ones:
- **First-ten-minutes test** (end of M5, if new players are available; otherwise the first strangers after launch): 2 or 3 people who have never seen the game play only the guided start. Checks Phase 3's emotional arc (curious, competent, useful, uneasy) and whether each hint was needed. The question: "Tell me what this game is about." If they can't say it, the welcome isn't working.
- **Mid-range phone** (once, at M3): borrow a middle-priced phone for one war, if one is available,, to close the gap Phase 8 left between the fast and the slow test phone.

**Adults only**, for now: every playtester is an adult who agrees to play and answer questions. That keeps consent simple (Phase 9).

### 5. What we measure
The game counts these during a war, **on the phone only**. At the end of a war (or from Settings at any time) a **"Copy playtest summary"** button copies a few lines of plain text: the numbers below, the game version and the war's seed. The player can paste it into a message if they want to. Nothing is sent by the game, and the summary has no names or phone details beyond the phone type. It shares the code of Phase 8's "Copy bug report" button.

| Number | Target (Guess) | Why it matters |
|---|---|---|
| War length | 20 to 40 minutes; 95% end by Day 7 (Q30) | The brief's session length |
| Wars finished | Most players finish their first war | A war nobody finishes can't be fun |
| First raid | Not before Day 3 on Banner (Day 4 Hearth, Day 2 Blood) | Phase 3 difficulty table |
| Warning time | The bell rings at least 60 seconds before the first enemy reaches the town | G7 and G14: you had time to choose |
| Coin earned per day | 20 to 35 | Phase 5 economy |
| Deaths per war | 1 to 4 on Banner | Death should happen, but not every day |
| Time lost | Under 10% of the war spent standing still for 30 seconds or more, outside menus | Where players don't know what to do |
| Orders taken | At least 1 in 3 orders taken, none forced | Orders matter but stay optional |
| Good strokes | Share of on-beat strokes, and how many players switch to automatic | Whether the beat ring earns its place (Phase 3 risk) |
| Frame rate | 30 frames a second on the iPhone, slowest frame under 50 ms; 20 on the old Android in the Light look | Phase 8 budgets |

The test wars check the same numbers with robot players. If a robot and a person disagree (the robot finds the war fair, the person dies on Day 2), the person wins, and the robot is changed to play more like people do.

### 6. The milestone phone check
The director plays the build for at least one game day (M1) or one whole war (M3 onwards), then answers on one sheet. The "Phone check asks" column of Phase 10, section 4 is the first question; these follow every time.

| # | Question | Answer |
|---|---|---|
| 1 | The milestone's own question (Phase 10, section 4) | Yes / not yet, and one sentence |
| 2 | Were the controls ever in the way? Where? | Moment and place |
| 3 | Was there a moment you didn't know what to do? | Moment |
| 4 | Did anything look broken or wrong? | List; screenshots to Claude |
| 5 | Was the phone warm, slow or draining fast? | Yes or no, and after how long |
| 6 | Best moment and worst moment | One line each |
| 7 | Did everything you tried work the same in the view from above and in first person? | What broke, and in which view (the director's phone test, 25/11/2026: fighting the straw dummy with a spear went wrong) |
| 8 | Go, change or stop? | One word (Phase 10, section 4) |

The playtest summary (section 5) goes with the sheet. Claude reads both, writes the findings into the project log, and proposes changes for the director's yes or no.

### 7. The fun check (end of M3)
*Changed 25/11/2026 (the director): the director tests the first playable alone first; outside players come later, when the director is ready (section 7.5). Phase 10 set the shape; this section writes the exact questions and the pass rule.*

#### 7.1 How it runs
The director plays the first playable as a player, not as its designer:
1. **Three whole wars, on three different days**, at least one on Banner. The normal link (no `?debug`, no test shortcuts), sound on.
2. **A cold start:** the third war comes after at least a week away from the game and the documents, so it's played with fresher eyes.
3. **Notes while playing**, on the observation sheet (7.3): a line for every stuck moment, surprise, laugh or groan. A voice memo on another phone works too; the game itself records nothing.
4. **After each war:** the questions in 7.2, a few words each, and the playtest summary copied and sent to Claude.

**Claude's part:** reads the notes and summaries next to the robot test wars, points out where they disagree, and says plainly when the numbers say something unwelcome (for example, "you stood still for 6 minutes on Day 2").

#### 7.2 The questions
Answered in Portuguese or English, whichever comes naturally. The first one is answered before looking at the others.

| # | Question | What it shows |
|---|---|---|
| 1 | "Write what happened in this war, as you'd tell a friend." | A moment that becomes a story ("my house burned and then…") |
| 2 | "What was I trying to do, most of the time? Why?" | A goal of my own, not "testing" |
| 3 | "Best moment? Most annoying?" | What to protect; what to fix |
| 4 | "When did I feel in danger? Did I see it coming?" | The threat check (G14) |
| 5 | "Was there a time I didn't know what to do?" | Matches the stuck moments on the sheet? |
| 6 | "Did I join the fighting? Why, or why not?" | Orders feel like a choice, not a chore |
| 7 | "When I died, how did it feel?" (if I died) | Sad and fair, not annoying |
| 8 | "Do I want to play another war now?" Yes, maybe or no | The key answer |
| 9 | "If I could change one thing, what would it be?" | The one change that matters most |
| 10 | From 1 (bad) to 5 (great): the controls · the work · the fear in raids · fairness of death · knowing what to do | Numbers to compare between wars and rounds |
| 11 | "Since the last war, did I open the game when I hadn't planned to?" | Wanting to come back, shown by doing it |

#### 7.3 The observation sheet
One line per moment: **time · what happened · what I did or felt**. Four kinds of moment are always written down: stuck (30 seconds or more not knowing what to do), surprised, laughing or groaning, and leaving a menu straight away. Two lines at the end: where the first death happened and how the war ended.

#### 7.4 The pass rule (the director alone)
Over the three wars, the first playable **passes** when all of these hold:
1. **Finished:** all three wars reach a fallen Hall (one save and resume each is fine).
2. **Again:** question 8 is "yes" after at least 2 wars, and question 11 is "yes" at least once.
3. **A reason:** each war has its own goal in question 2, not "testing".
4. **A story:** at least one answer to question 1 is a story worth telling someone.
5. **Threat:** in at least 2 of the 3 wars the first raid was seen coming, and the summary shows the bell 60 seconds or more ahead.
6. **Nothing blocking:** no war stopped because of the controls, a bug or the phone being too slow.
7. **The robots agree:** the test wars meet the targets in section 5.

**Close:** rules 1, 6 and 7 hold, but one or two of the others miss. Then one or two "change" rounds of about 2 weekends, aimed at what the notes show, then three more wars with the cold-start rule again.
**Fail:** rule 1, 6 or 7 misses, or three or more of the others do; or still "close" after two change rounds. Then stop and rethink (Phase 10, section 5).

**The honest limit:** a designer knows their own game too well and wants it to be fun. A pass here means "fun for the person who made it": needed, but not proof. The proof comes from other people (7.5) and from strangers after launch (Phase 12, section 7, gate 1).

#### 7.5 Outside players, later
When the director feels ready (at M3 or any later milestone, at the latest before version 1.0), at least 3 adults who didn't help design the game play one whole war each:
- **Before:** they're told only: "You are one villager in a town at war. Do whatever you like. I won't help, I'll just watch." Their own phone, Hearth or Banner.
- **During:** the director watches and says nothing, even when they're stuck, and fills in the observation sheet for them. One of them can play at home alone and answer by message or call, to see how the game does with nobody in the room.
- **After:** the same questions (as "you"), then the playtest summary.
- **Pass across players (the director counts as one):** at least 3 of 4 finish; at least 3 of 4 say "yes" or "maybe" to question 8, with at least 2 "yes" from outside players; at least 1 tells a story unprompted in question 1; at least 3 of 4 saw the first raid coming; nobody stops because of the controls, a bug or speed.

If nobody outside has played by the 1.0 launch, the first strangers after the quiet launch (Phase 12, section 4) are this test, and 1.0.x updates answer what they find.

### 8. From what players say to what changes
Every finding is sorted into one of four kinds, each with its own path:

| Kind | Example | What happens |
|---|---|---|
| **Bug** | "The heir card didn't close" | Fixed in the current milestone |
| **Numbers** | "I was always hungry" | A data-file change, checked with test wars first, then on the phone |
| **Feel** | "Raids came out of nowhere" | Claude proposes a change; the director says yes or no |
| **New idea** | "I wish I could own a dog" | Parked in `docs/later/` with one line on who said it and why, looked at between milestones (Phase 10, section 7) |

**Rule of two:** one player's complaint is noted; two players saying the same thing (in their own words) is acted on. A single player who gets badly stuck still counts, because it shows a hole a stranger could fall into.
**What players say they want is a clue, not the answer.** "Make the day longer" may really mean "I never had time to eat". The fix aims at the cause.
**Every change goes back into its phase document**, so the documents stay the true description of the game (Phase 10, section 7).

#### 8.1 The numbers most likely to move
All live in data files (Phase 5), so they change without code: day length (6 minutes), the beat ring's speed (1.5 seconds) and bonus (+50%), hunger speed, pay per load, bread price, raid timing per difficulty, enemy damage, warning time, how much the heir keeps, and Second wind (Phase 3). Each change is written in the log with the old value and why it changed.

### 9. The playtest kit
Made in M2, for the director's own fun check, and ready for outside players whenever they join:
- A one-page sheet with section 6's checklist, section 7.2's questions and section 7.3's observation lines, in English and Portuguese, easy to print or keep on a second phone.
- A short invite message the director can send: what the game is, how long it takes, that nothing is recorded and their name won't appear anywhere public.
- The live link with the "Copy playtest summary" button; the `?debug` link for the director only (Phase 8, section 9).

**Privacy:** outside players' names, words and summaries stay in the private project log. Public documents say "player A, B, C" and give only numbers and short anonymous quotes. No video or sound is recorded unless the player agrees first.

### 10. Changes to earlier phases (written 25/11/2026, after the director's "go")
- **Brief:** a line for Phase 11 (prototype first in each milestone, three kinds of test, the fun-check pass rule, nothing sent from the phone).
- **Phase 1, open questions:** "Is the villager's job fun?" points to P-WORK (section 3).
- **Phase 2, open questions:** "Six-minute days" points to P-DAY and section 8.1.
- **Phase 3, open questions:** the beat ring's fate is decided by P-WORK and the good-strokes number (section 5).
- **Phase 8, section 9:** adds the "Copy playtest summary" button next to "Copy bug report"; the open question on a mid-range phone points to section 4 here.
- **Phase 10, section 5:** the pass rule points to section 7.4 here; section 4's milestones M1 and M2 start with their prototypes.
- **Vision-check report, G14:** points to P-RAID, section 5 (warning time) and section 7.4, rule 5.

### Phase 11 summary
- Four prototypes are already done (style, interface, portrait and zoom, crowd); each took one session and changed the design.
- Six more are the first piece of their milestone: chop and carry (P-WORK), one full day, the first raid, death and the heir, a war the AI plays alone, the real crowd. Each has a pass mark and a plan for a "no".
- Three kinds of test: test wars for numbers, the director's phone check at every milestone, and the fun check at M3: the director alone over three wars, outside players later. Plus a first-ten-minutes test with new players at M5 (or the first strangers) and one mid-range phone at M3 if available.
- Ten numbers are counted on the phone and copied by the player if they choose; nothing is sent by the game.
- The fun check has 11 fixed questions, an observation sheet and a seven-part pass rule for the director alone, with "close" and "fail" defined; outside players have their own rule (section 7.5).
- Findings are sorted into bug, numbers, feel and idea; two players saying the same thing is acted on.

### Decisions and why
| Decision | Why |
|---|---|
| Prototypes are the first piece of each milestone, not separate throwaway programs | Building starts after the design is finished (Q27); building the scary piece first on the real setup answers the question early without doing the work twice |
| P-WORK before anything else in M1 | "Is the work fun?" has been the biggest design risk since Phase 1; everything else sits on it |
| Two backup work ideas ready | A "no" on P-WORK shouldn't stop the project; it should change how the work feels |
| The director tests the first playable alone first (the director, 25/11/2026) | Outside players aren't counted on yet; three wars on three days, a cold start and the robot numbers make a solo check as honest as it can be |
| Outside players later, watched in silence | Explaining hides the problems strangers will hit when nobody is there to explain |
| Question 1 is open ("tell me what happened") | Asking about stories directly would put the answer in their mouth |
| A summary the player copies, never automatic sending | Phase 9's never-do list: no tracking; it also keeps players' trust |
| New players for each new fun check | People who played already learn the game and can't judge it fresh |
| Rule of two | One opinion is a taste; two is a pattern. Badly stuck players still count, as a hole a stranger could fall into |

### Open questions and risks
- ⚠️ **One player judging their own game** is the weakest kind of fun check (section 7.4, the honest limit). It catches a game that isn't fun even for its maker; it can't prove strangers will like it. Outside players (7.5) and the strangers after launch (Phase 12) are the real proof.
- ⚠️ **Outside players, when they come, may know the director** and be kind. The open questions, the observation sheet and the numbers (did they finish, did they play again) matter more than what they say they liked.
- ⚠️ **Pass marks are guesses** until the first playtests show what normal looks like; they may be changed once, openly, after M1, and never during a fun check.
- ⚠️ **The robot players may play too well or too badly.** Each phone check compares the robot's numbers with the director's; the robots are changed when they don't match.
- ⚠️ **The 2018 Android phone may not run the game at all.** If it doesn't by M1, the weak-phone check moves to the mid-range phone and the smallest supported phone is reconsidered (Phase 8, section 2).

---

# Phase 12: Polish, launch and beyond

*Source: [12-polish-launch-beyond.md](12-polish-launch-beyond.md)*

*Draft 25/11/2026, S24-PLAYTEST. Approved by the director the same day ("Go"). Builds on the content and milestones of Phase 10 (version 1.0 is milestones M5 and M6; section 6 lists the decisions waiting for proof), on the testing plan of Phases 8 and 11, on the never-do list and the costs of Phase 9 ("Phase 12's launch list collects them"), and on the Settings language tab of Phase 7 ("Portuguese next, Phase 12"). Numbers for "enough interest" are **Guess**: nobody can know them before launch. Claims about itch.io's features are **Likely** (from its public help pages as known on 25/11/2026; to be re-checked before use, as Phase 9 asks).*

**In plain words:** polish means the game feels finished on a phone: nothing crashes, no save is ever lost, every screen is readable, every hit and coin sounds right, and a stranger understands the first ten minutes. Version 1.0 launches free on the web link, quietly, to a few places where people like this kind of game. The game still collects nothing, so we learn from what people write to us and from simple play counts. After launch, small updates come every month or two, never with pressure on players. Only if enough strangers play and like it do we take the next steps: selling on itch.io, the Android app, the iPhone app, better art, in that order. If not, the game stays free and finished, and that's a good ending too.

### 1. Pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Finished beats bigger** | Polish time is protected: M5 and M6 add no new features, only finish what's there (Phase 10, section 7 parks new ideas) |
| 2 | **Never lose a player's family** | A lost save or family book is the worst bug there is; it blocks any release |
| 3 | **Launch quietly, then widen** | The director's own last check, then a few communities, never paid ads (€0) |
| 4 | **Updates without pressure** | No events, countdowns or "come back" messages (Phase 9, section 2.3). An update is a gift, not a hook |
| 5 | **Proof before money** | Every cost waits for its gate in section 7 |

### 2. Polish: what "finished" means
Polish happens in M5 (sound, words and welcome) and M6 (version 1.0), after the content is complete in M4. Each pass has a clear "done".

| # | Pass | Done when |
|---|---|---|
| 1 | **Feel** | Every action in Phase 3's feedback table (section 4) has its look, sound and (on Android) buzz; nothing happens silently |
| 2 | **Readability** | Every screen checked at 667 × 375, 844 × 390 and 390 × 844: no text under 14 points, no overlaps, team colours also shown by banner shape (Phase 3, section 5), a colour-blind check of the main screens with a simulator |
| 3 | **Sound mix** | Music never covers the horn, the bell or a hit; the three volume sliders work; captions for the warning sounds (Phase 7) |
| 4 | **Speed** | Phase 8's budgets met on both test phones and the borrowed mid-range phone: 30 frames a second, first download under 15 MB, loaded in under 10 seconds on 4G |
| 5 | **Words** | All English text read through once start to finish (spelling, tone, the 8-word hint rule of Phase 3); every Portuguese word has its meaning ready to show |
| 6 | **Balance** | 500 overnight test wars meet Phase 11's targets (section 5) on all three difficulties; the director's last war agrees |
| 7 | **Interruptions** | The game survives a phone call, going to the background, rotating, low battery, losing the internet, and a new version published mid-war (Phase 8, section 8): it pauses, saves, and carries on |
| 8 | **Accessibility** | Every option in Phase 3, section 5 and Phase 7's Settings works and is remembered |

#### 2.1 Bugs: three levels
| Level | Example | Rule |
|---|---|---|
| **Blocker** | Crash, lost save or family book, a war that can't go on, the game won't open on a supported phone | Never shipped. After launch: fixed within a few days, ahead of everything else |
| **Major** | A rule doing the wrong thing, an order that can't be finished, a screen unreadable on a supported phone | Fixed before 1.0; after launch, in the next update |
| **Minor** | A model clipping a wall, a typo, a sound a little late | Can ship; listed in "known issues" on the game's page |

Every bug goes into the project log as one line with its level. A bug a player reports twice moves up one level.

#### 2.2 The release bar
Version 1.0 ships when all of these hold:
- 0 blockers and 0 majors open.
- 500 test wars with none stuck and the targets met.
- The browser check passes at the three sizes (Phase 8, section 9).
- Both test phones and the mid-range phone play a whole war without a problem.
- The first-ten-minutes test (Phase 11, section 4) passes: new players can say what the game is about.
- An old save from the previous milestone opens and plays on (the save converter works).
- The launch list (section 3) is ticked.

### 3. The launch list (version 1.0, free)
Everything needed for a free launch on the web link. Items only needed for a sale are in section 8.

| Area | Item |
|---|---|
| **Game** | Version tagged 1.0 on GitHub (Phase 10, section 7); "A new version is ready" works; Add to Home Screen and offline work; family-book export and import work |
| **Credits screen** | Babylon.js (Apache 2.0 licence text), Quaternius, the fonts and their licence, every sound with a credit-asking licence, the voice speakers (the director, and anyone else who agreed to be named, Phase 9, section 4.4), and the line "code written with an AI assistant; no AI-made art, sound or voices" (Phase 9, section 4.5) |
| **Privacy note** | One paragraph on the title screen's Credits and in the repo: the game collects nothing, saves stay on the phone, GitHub serves the page (Phase 9, section 3.5). Cheap now, and the stores will need it later |
| **Licences** | `assets/LICENCES.md` has a line for every outside file in the build (a check script compares the two) |
| **Voices** | The director's recordings listed in `assets/LICENCES.md`; a signed consent, kept privately, only for anyone else who recorded (Phase 9, section 4.4) |
| **Names** | The public game, repo and announcements never name the inspiring game or the director's private details (project rule); "inspired by classic isometric strategy games" is fine |
| **Page** | README updated: what the game is, how to play, how to send feedback (section 5), credits |
| **Press kit** | One page in the repo: a short description, 5 screenshots from the phone (both views, day and night), one 30-second clip, the logo, the link. Our own game only, never another game's pictures |

### 4. Launch day and the weeks after
**Before (about 2 weeks):** the director plays the release candidate through on every test phone, and any outside players who have joined by then get it too. Only blockers and majors are fixed in this time.

**Launch day:**
1. Tag 1.0 and publish; check the live link on the iPhone.
2. Post a short "version 1.0 is out" note on the game's page (section 5) and in the repo.
3. Post in two or three online communities for indie, web or strategy games, each following its own rules about sharing your own work. One short honest post each: what it is, one clip, the link.

**After:** feedback is read **twice a week, in one sitting**, not every day: it keeps building time protected and stops one comment from setting the plan. Blockers are the exception and are fixed straight away. At the end of the first month, the director and Claude look at everything together and pick the first update (section 6).

**No paid ads, no review sites paid for, no fake accounts.** If it spreads, it spreads because people like it.

### 5. How we hear from players (no tracking)
The game still sends nothing (Phase 9, pillar 3). We learn from:
- **What people write:** comments on the game's page and messages; players can paste the "Copy bug report" and "Copy playtest summary" text (Phase 8, section 9; Phase 11, section 5).
- **Simple counts the page itself shows:** a free itch.io page counts views and plays of a browser game and shows them to the owner (Likely); GitHub shows the repo's visitors. Neither needs anything inside the game.

**Proposed (Q28; the director, 25/11/2026: not yet, decided near 1.0):** at 1.0, open a **free itch.io page** for the game next to the GitHub link. It gives the play counts above, a comments section, short news posts ("devlogs") for each update, and an audience that looks for small games. Free to open (Phase 9, section 2.4); it is also where a sale would happen later, so the page and its followers carry over. The GitHub link stays as it is. Feedback then goes to the itch.io comments, so the director's own e-mail never appears in public.

### 6. After launch: updates
- **Rhythm (Guess):** a small update every 1 to 2 months, one or two features each, always with fixes. Hotfixes for blockers in between.
- **Each update:** test wars and the browser check as for any milestone; old saves and family books always open (save version, Phase 8, section 6); a short "What's new" card on the title screen, shown once; a news post on the page.
- **Versions:** 1.1, 1.2… for updates; 1.0.1 for hotfixes.
- **Never:** limited-time events, seasonal passes, "come back tomorrow" rewards (Phase 9, section 2.3). Seasons in the game (Phase 5) are part of the world, not a calendar promotion.

#### 6.1 The road after 1.0 (proposed order, changed by what players say)
Built from Phase 10, section 3.3. The order is a starting point: at the end of each update, players' feedback can reorder it.

| Update | Theme | What's in it |
|---|---|---|
| **1.1** | **Em português** | Portuguese translation of all text (Phase 7's language tab); fixes from the first month |
| **1.2** | **New lands** | River and Hills maps; starting in Quintara |
| **1.3** | **New trades** | Fisher and olive picker; the scout job |
| **1.4** | **Neighbours remember** | P5 (neighbours who remember you), P4 (unfinished life goals passed to the heir) |
| **1.5** | **New enemies** | Archer, horse rider, catapult; the Wolfwood map |
| **1.6** | **Hard roads** | P7 (crime someone must see), then G11 (houses and crowding) with the parked homeless life and stealing; salt raker, baker's helper |
| Later | **Inside the houses** | House interiors, once a free furniture pack that allows selling is found |

**Bigger ideas, only if 1.x does well:** the parked short runs, action combat, ships and sea battles, the serious and gritty tone (docs/later). Each would be its own design round, starting from a prototype (Phase 11), not an update.

### 7. The gates: when money and apps come in
Phase 10, section 6 says each step waits for proof. Here is what counts as proof (all **Guess**, checked 3 months after 1.0, then every 3 months):

| Step | Gate | If it isn't met |
|---|---|---|
| **1. Sell on itch.io** (free first war, one price for the full game: Phase 9, section 2.2) | About 1,000 plays on the page, at least 20 comments or messages from strangers, and at least 5 people saying they played several wars | Stay free; one update aimed at what players asked for; check again in 3 months |
| **2. Android app** ($25 once) | Selling on itch.io for 3 months, or at least 10 strangers asking for an app | Stay on the web; Add to Home Screen does most of the job |
| **3. iPhone app** ($99 a year and a Mac or online Mac) | The Android app sold enough in a year to pay Apple's fee at least twice over, or clear demand from iPhone players | Stay on the web; the family-book export protects iPhone saves |
| **4. Detailed art** (Phase 6, step C) | Selling on at least one store, with a spending cap the director sets then, paid from what the game earned | Keep the Quaternius look; it's the game's look, not a placeholder |

**The quiet ending:** if after 6 months the game hasn't reached gate 1, it stays free on the web link as a finished game, with its documents public. The family-book export means nobody loses their family. Updates continue only if the director still wants to make them. That's a good result, not a failure: a finished game that some people loved.

### 8. The sale list (only once gate 1 is passed)
What Phase 9 said a first sale brings, in order:
1. One talk with an accountant; register the activity with the Portuguese tax office if they say so (Phase 9, section 2.4).
2. Free trademark search for the final title in the EU and US databases (Phase 9, section 4.2).
3. Re-check itch.io's cut, payment and tax rules on its own pages (Phase 9 warns they change).
4. US tax form on itch.io so US sales aren't held back (Phase 9, section 2.4).
5. The free demo build (the first war) and the full build from the same code: a setting in the build, not two games.
6. The privacy note becomes a proper privacy page (already written at 1.0).
7. If anyone besides the director recorded voices, check their consent covers selling (the Phase 9 form already does).

For the apps, add: the store account, the age-rating questionnaire (target PEGI 12, Apple 13+, Phase 9, section 4.6), the stores' privacy forms ("Data Not Collected"), app icons and store pictures, and the Capacitor build (Phase 8, section 8).

### 9. Changes to earlier phases (written 25/11/2026, after the director's "go")
- **Brief:** a line for Phase 12 (polish passes, release bar, free launch, updates without pressure, the gates).
- **Phase 7, section 3.10:** Language tab "Portuguese next (Phase 12)" becomes "Portuguese in update 1.1 (Phase 12, section 6.1)".
- **Phase 9, open questions:** "Phase 12's launch list collects them" points to sections 3 and 8 here. Q28 is decided near 1.0: if yes then, section 2.2's itch.io row notes the free page opens at 1.0.
- **Phase 10, section 3.3 and section 6:** point to section 6.1 (update order) and section 7 (the gates) here.
- **README:** at 1.0 only (section 3), not now.

### Phase 12 summary
- Polish is eight passes in M5 and M6 (feel, readability, sound, speed, words, balance, interruptions, accessibility), with bugs in three levels and a release bar: no blockers, no majors, saves always open.
- Version 1.0 launches free on the web link with a credits screen, a privacy note, a press kit and a licence check; the director's last check first, then two or three communities; no paid ads.
- Players are heard through what they write and the page's own counts; the game still sends nothing. A free itch.io page at 1.0 is proposed, decided near 1.0 (Q28).
- Updates every 1 to 2 months without pressure; a proposed road from 1.1 (Portuguese) to 1.6, reordered by what players say.
- Money and apps wait for gates measured 3 months after launch; if the first gate is never met, the game stays free and finished.

### Decisions and why
| Decision | Why |
|---|---|
| No new features in M5 and M6 | Polish is where small games usually run out of time; protecting it is what makes the game feel finished |
| A lost save blocks any release | The family across wars is the heart of the game (Phase 4); losing it breaks trust for good |
| Quiet launch, no paid ads | €0 budget, and a small honest audience tells us more than a bought one |
| Feedback read twice a week | Keeps building time protected; one loud comment shouldn't steer the plan |
| Free itch.io page proposed for 1.0 | Play counts and comments without any tracking in the game; the same page carries over to a sale |
| Portuguese first after launch | Cheap (text in data files, Phase 10), and the game's voice words are already Portuguese |
| Written gates with numbers | Turns "is it worth it?" into a check, made calmly, instead of a guess on a hopeful or a bad day |
| A good quiet ending | A free, finished game is worth having; saying so now removes the pressure to make it something it isn't |

### Open questions and risks
- ✅ **Q28:** a free itch.io page at 1.0, next to the GitHub link (section 5)? Not yet: decided near 1.0 (the director, 25/11/2026).
- ⚠️ **The gate numbers are guesses.** They are a starting point, to be changed openly at the first check if they turn out clearly too high or too low, never quietly.
- ⚠️ **Few people may find the game.** Small free web games get little attention without ads. The itch.io page and short, honest community posts are the cheap answer; the quiet ending in section 7 is the honest one.
- ⚠️ **After launch, feedback can crowd out the plan.** One update at a time, chosen at the end of the previous one (Phase 10, pillar 5).
- ⚠️ **Store and itch.io rules change.** Everything in sections 5, 7 and 8 is re-checked on their own pages before it's used.
- ⚠️ **Keeping old saves working** gets harder with each update; the save converter (Phase 8, section 6) is tested at every release (section 2.2).

---

# Appendix A: Vision check, the villager's eye

*Source: [vision-check-villager-eye.md](vision-check-villager-eye.md)*

*Report 23/11/2026, S15-RAID. The director chose which gaps to fold in (S5, 24/11/2026); they are in the phase docs (see the brief). Covers two matches Claude played against the computer in an existing medieval town-building strategy game, on the director's PC, between 22 and 23/11/2026.*

### 1. Why and how
The director felt the build is still far from "a villager who has to work to survive". To find out what that feeling is made of, Claude played two matches of a classic top-down strategy game as the usual commanding hand, and wrote down after every few minutes what the same moments would mean to one villager on the ground.

| Match | Opponent | Length | Outcome |
|---|---|---|---|
| 1 | Computer on a high level, but the add-on AI loaded was broken | About 37 game minutes | No contact at all; the enemy was never found. Abandoned |
| 2 | The game's own computer on its hardest level | About 17 game minutes | Defeat: the enemy burned the town's central hall, and the match ended a minute later |

Nothing here copies names, rules or units from that game. It is a list of feelings and pressures, turned into questions for our own design.

### 2. What it felt like, seen from one villager

1. **The work is a walk.** A villager's day is walk out, fill your hands, walk back to a drop-off, repeat. Walking is the real cost; camps exist to shorten it.
2. **The land runs out under your feet.** Trees vanished, berries vanished, fields went fallow. Each time, the workers on them just stopped and stood there. For a real person that's a crisis (no work, no pay, no bread) and a decision (where do I go now?).
3. **The work moves away from home.** As the town ate its surroundings, the woods and the gold moved further out. New camps went up at the edge, far from the walls: small frontiers.
4. **Half the town stood idle.** In both matches, often more than half the villagers were idle, because their job had ended silently. Ten workers stood beside a gold pile without touching it, waiting for an order.
5. **Food was the price of growth, not of staying alive.** *(Corrected 23/11/2026, S16-STUDY, after the director pointed it out.)* In that game nobody eats: food is paid once, when a new worker is taken in, and again to advance the town to a new age or to train some soldiers. A worker who exists never needs feeding. Food was short for most of both matches, so the town stopped taking in new people and its advance was late. Food came from easy animals first, then berries, then slow farms that tie you to home. Bushes that looked like berries were only decoration.
6. **A surplus nobody spends is invisible.** The town sat on 1,000 to 6,000 wood while it lacked the food to grow. To a villager on the street, a pile in the store means nothing until someone spends it.
7. **The world ends where your eyes end.** For 27 minutes the town seemed to stand on an island: everything unexplored was dark. A villager's map is only what they have seen, and that belief can be completely wrong.
8. **Forests are walls; one road decides the war.** Soldiers could not find a way through the woods. In match 2, the only way to the enemy was one long thin strip of land, and that is exactly where the war came from.
9. **The town keeps hitting the roof.** New houses were needed again and again. For a villager a crowded house is a lived fact (who sleeps where), not a number.
10. **Falling behind is invisible from the street.** The enemy's score was 3 to 12 times ours for the whole of match 2, yet our town looked the same until the fire. A villager can't see a score.
11. **War arrived as a sudden end to a slow life.** After 16 minutes of worrying about food and wood, the attack took about one minute: no smoke on the horizon, no running neighbour, no bell until the hand rang it, too late. The first sign was the heart of the town already burning.
12. **The enemy moved in.** Enemy workers put up a building right next to our houses, guarded by soldiers. Strangers settling in your street is a different fear from a raid.
13. **A town with one heart dies in a minute.** Losing the central hall lost everything at once: the main drop-off for food and wood, the only place new people come from, and the town's advance to a new age, which burned with it.
14. **No threat, no story.** In match 1 the opponent was broken, and it felt exactly like peace: an army stuck behind trees, wealth piling up with nothing to spend it on. Danger has to be designed in and tested, never assumed.
15. **A new age is a festival.** When the town advanced, every building changed look at once and new trades opened. For a villager that's a holiday and a turning point.

### 3. What our docs already get right
- **You are the villager who chooses.** The matches showed workers waiting for a distant hand; our design flips that, with optional orders from the Steward that follow real shortages (02 §1, §2.3).
- **War has a timeline.** Scouts, then first night raids, then armies, then sieges, timed by difficulty, with a safe first night (02 §1, 03 §2-3, 05 §3.3).
- **Shelter depends on standing.** Who gets a place in the Hall during raids follows reputation (01); the muster turns villagers into a squad (02 §2.6).
- **The map is only what you've seen** (07 §3.4), and edge arrows, the war horn and red screen edges warn of danger (07 §5, 03 §4).
- **Places shape the war:** the bridge and ford as the front line, the Wolfwood where scouts hide (04 §5).
- **Death is not the end:** heirs, the Roll, grudges and the Chronicle (02 §2.7, 04 §7).

### 4. Gap list
Each gap: what the matches showed, what our docs say today, and a suggestion. "Where" is the doc that would change.

| # | Gap | Docs today | Suggestion | Where |
|---|---|---|---|---|
| G1 | **Resources run out.** Trees, berries and fields end; the job stops | Not covered | Trees and stone deplete; fields go fallow and need re-sowing; woods regrow over days. The workplace you knew moves further away | 02 §2.2, 05 |
| G2 | **The "job ended" moment** | Not covered | When your patch runs out: a short hint with your choices (further woods, notice board, ask the Steward). No silent standing | 02, 07 §5 |
| G3 | **Walking is the cost; camps are frontiers** | "Further out = better, more danger" (02 §2.2); no walking rules | The Warden builds drop-off camps at the edge and moves them as the land is used up. Long walks earn less per hour but more per load | 02 §2.2, 05 §3.2 |
| G4 | **Food from the land** | Food only bought in shops (02 §2.5, 05 §2.2) | Add foraging (berries, birds, shellfish) with seasons and look-alike plants you learn; bread gets dearer when fields fail. Note: in the matches food paid for growth (new people, the next age), not for meals; our hunger bar is our own design, not something the matches showed | 02 §2.5, 05 |
| G5 | **Neighbours who stand idle** | NPC idling not covered (02 §6) | Idle neighbours are visible and talk ("no work at the woods"). A crowd of idle people is a sign the town is failing, and a chance for the player to lead | 02 §6, 04 |
| G6 | **Surplus vs bread** | Stock shown on signs (07 §5); surplus not covered | Stock signs show what's piling up and what's missing; prices follow stock, so a villager feels the imbalance | 05 §2.1, 07 |
| G7 | **Warnings before a raid** | Horn, red edges, edge arrows (07 §5, 03 §4) | Add build-up signs in the hours before: an enemy scout seen, smoke on the horizon, a wounded runner, rumours. The bell is rung by a person, and you get time to reach shelter | 03 §4, 02 §2.1 |
| G8 | **The enemy moves in** | Raids and sieges only | An enemy outpost may appear near the outer fields; villagers who spot it can report it or help burn it | 02 §1, 05 §3.3 |
| G9 | **The Hall falls in a minute** | Defeat = your Hall falls, run ends (02 §3) | Make the fall a readable stretch, not a sudden end: outer fields burn, then houses, then the Hall. The villager can save the chest, carry bread, flee to the watchtower; the Chronicle tells it | 02 §3, 03, 04 §8 |
| G10 | **Falling behind is invisible** | "The town's look tells the war" (07 §1) | Spell out the signs of losing: empty stalls, higher prices, fewer guards, deserters, rumours | 03, 06, 07 |
| G11 | **Houses and crowding** | Town caps only (02 §2.8, 05 §3.2) | Growth needs houses the builders make; full houses mean shared beds and grumbling; ties to the parked homeless idea | 05 §3.2, docs/later |
| G12 | **Forests are walls** | Places listed (04 §5); no path rules | Dense woods block walking except on paths; chokepoints are learned and fought over | 04 §5, 05 §3.4 |
| G13 | **A new age is a festival** | Three town stages (05 §3.2), no event | A stage change is a festival day: new trades open, new looks, a Chronicle entry | 05 §3.2, 04 |
| G14 | **Threat must be tested** | Difficulty levels (03 §3) | Phase 11 playtests include a "threat check": did the first raid come on time, did the player feel warned, did it hurt? | Phase 11 |

### 5. What this means for the director's worry
The matches suggest that "working to survive" comes from three pressures, in this order:

1. **The land running out under your feet** (G1 to G3). This is missing from our docs today, and it's what made every worker's day change in both matches.
2. **Food as the town's growth** (G4, G6). In the matches, food decided whether the town could take in new people and advance; nobody went hungry. We have a hunger bar and a bakery (our own idea), but no link between the land, the harvest, the price of bread and the town's growth.
3. **War that builds up and then breaks the town** (G7 to G10). We have the timeline; we lack the warning signs before it and the long, readable fall after it.

**Recommended first step:** fold G1 to G4 and G7 to G9 into the phase docs before Phase 8, since they change the core loop. The rest can wait for their phases.

**Done 24/11/2026:** the director approved this. G1 to G4 and G7 to G9 are now in docs 02, 03, 04, 05 and 07; G5 was partly covered at the same time (idle neighbours, Phase 2 section 2.10). G6 and G10 to G14 wait for their phases.

**Placed 24/11/2026 ([Phase 10](10-scope-production.md), section 3):** G6, G10, G12 and G13 are in version 1.0; G11 waits for an update after 1.0, together with the parked homeless life; G14 is a fixed check in the test wars and in Phase 11's playtests. **Placed 25/11/2026 ([Phase 11](11-prototyping-playtesting.md)):** G14 is the P-RAID prototype (section 3), the warning-time number (section 5) and rule 5 of the fun check (section 7.4).

---

# Appendix B: Visual direction notes

*Source: [visual-direction.md](visual-direction.md)*

*21/11/2026, S01-DESIGN. Written from 4 screenshots of a remastered isometric strategy game that the director shared as reference. The screenshots are not stored in the repo (someone else's art). Everything we make is original; this file only records the qualities to aim for. Full art direction comes in Phase 6.*

### The town grows, and you can see it
The look of a town changes as the AI's town advances. This is the visual proof of pillar 3: the timber you chopped becomes the wall.

| Stage | When | What it looks like |
|---|---|---|
| **1. Founding** (start of every war) | Day 1 | Small wooden houses with thatched roofs, a wooden palisade, a little dock, open grass, a few fields, piles of stone and timber, plenty of trees |
| **2. Growing** | Days 2–3 | Stone foundations, timber-frame walls, red tiled roofs, windmills among patchwork fields, orchards, hedges and cypress trees, a stone wall with a gatehouse |
| **3. Downtown** | Days 3–4 on | A big stone keep or tower, a wide cobbled square, market stalls, statues, thick walls with towers and gates, a harbour with sailing ships, dense streets of tiled-roof houses |

### Qualities to aim for
- **Warm, sunny daylight:** golden grass, ochre paths, terracotta roofs, deep blue water.
- **Dense and lived-in:** every gap has a bush, a cart, a barrel, a fence or a tree. Fields have rows you can see.
- **Mediterranean / Iberian feel:** cypress trees, olive-like round trees, stone towers with small domes, coastal towns. (A setting idea for Phase 4.)
- **Team colour on trims and banners:** each side's colour shows on roof trims, flags and clothes, without painting the whole building.
- **Small readable units:** people are about one-tenth the height of a house, but each one is clear against the ground.
- **Height and edges:** cliffs, rocky ridges and shorelines break up the map.

### What this means for the first version
- The low-poly prototype already follows the 3 stages, using simple shapes per stage (thatch cone, then tiled roof, then stone tower).
- Ships and a harbour appear as scenery only. Sea battles are parked (see [later/other-parked-ideas.md](later/other-parked-ideas.md)).
