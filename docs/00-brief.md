# Game brief (filled in 20/11/2026, session S01-DESIGN)

Answers come from the director's intake answers. Anything marked **ASSUMPTION** is Claude's choice and can be changed.

| Item | Answer |
|---|---|
| Idea | You are one villager in a medieval world where AI factions play a full strategy war around you. You do your job, survive, and may take up arms, always by your own choice. Day and night cycle. |
| Genre | Strategy-world survival / life sim with light tactical combat |
| Platform | Web browser, phone first (landscape), also PC. Hosted from a GitHub repo (GitHub Pages). |
| Target player | ASSUMPTION: adults 25–45 who grew up with classic real-time strategy games and now play on phones in short sittings |
| Session length | One war per run, about 20–40 minutes |
| Players | Single-player. The factions are AI. |
| Team | The director directs, decides and playtests. Claude writes all code and documents. No artist. |
| Time and budget | Weekends. €0 budget. |
| Engine / tools | ASSUMPTION (changed 20/11/2026 because the game is now 3D): Babylon.js (free, Apache 2.0 licence) with TypeScript, built with Vite, published on GitHub Pages. Confirmed or changed in Phase 8. |
| Graphics and camera | 3D. Fixed isometric camera by default, first-person view one button away, always on screen (the director, 20/11/2026). Feel of classic isometric strategy games, with original art. |
| Business model | Free for now; **keep the door open to selling later**. So every asset and library must allow commercial use. |
| Inspiration (feel only) | Classic real-time strategy games with villagers, armies and town centres. No names, art, units or signature rules copied. |
| Hard limits | Player never commands the AI factions. Free agency: every order is optional. Must work on a phone with two thumbs. |

## Intake decisions
- **Title (Q1):** *The Hall Remembers: Bloodlines*.
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
- **Kept open for later:** short runs with lasting unlocks (see [later/other-parked-ideas.md](later/other-parked-ideas.md)).
