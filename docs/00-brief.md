# Game brief (filled in 20/11/2026, session S01-DESIGN)

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

## Intake decisions
- **Title (Q1):** *The Hall Remembers: Bloodlines*. Subtitle kept after the name check (Q26, 24/11/2026).
- **War length (Q4):** fought to the end, no time limit (stalemate breaker in Phase 2).
- **Heirs (Q5):** unlimited.
- **Movement (Q6):** joystick by default.
- **Traitor's heir (Q3):** random: 75% grew up in the betrayed home town, 25% born in the new town.
- **Death:** you take over another villager of the same town, who **inherits the previous villager's possessions**. Game over only if your town falls.
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
- **Business, ethics and legal (Phase 9, 24/11/2026):** free web link now; if sold, one price with the first war free and never ads, paid luck or tracking; children and the old are never hurt (target rating PEGI 12 / Apple 13+); no AI-made art, sound or voices; friends sign a consent for their voices; the repo is all rights reserved (`LICENSE`). See [09-business-ethics-legal.md](09-business-ethics-legal.md).
- **Scope and production (Phase 10, 24/11/2026):** seven milestones (M0 to M6), each ending on the director's phone; the first playable (M3) is one map, two towns, two jobs, raids, death and an heir; a fun check with outside players at M3 decides go, change or stop; €0 until version 1.0 has been played; building starts after the whole design document is finished (Q27). See [10-scope-production.md](10-scope-production.md).
- **Prototyping and playtesting (Phase 11, 25/11/2026):** each milestone starts with the piece most likely to fail, beginning with "is chopping and carrying fun for ten minutes" (P-WORK) in M1; three kinds of test (test wars, the director's phone check, the fun check with at least 3 friends); a six-part pass rule for the fun check; nothing is sent from the phone, the player copies a summary if they choose. See [11-prototyping-playtesting.md](11-prototyping-playtesting.md).
- **Kept open for later:** short runs with lasting unlocks (see [later/other-parked-ideas.md](later/other-parked-ideas.md)).
