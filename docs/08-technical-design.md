# Phase 8: Technical design

*Draft 24/11/2026, S20-TECH. Approved by the director the same day ("phase 8 go"), with the crowd test (S7) and the test phones (Q20). Builds on every earlier phase; the street mock-up on the live link (one 940-line page, Babylon.js 7 from a public code website) is the starting point. Library versions and licences were checked on the npm package registry on 24/11/2026 (Verified); performance numbers are targets until the crowd test (section 10) and Phase 11 measure them.*

**In plain words:** the game stays a web page made with Babylon.js, written in TypeScript and packed by a build tool, so it loads fast, works offline, and can later be wrapped as a phone app without rewriting it. The war itself (people, AI, orders, money) runs as a separate "simulation" that doesn't know about graphics. That split lets the computer play hundreds of test wars in seconds to check the balance, lets art be swapped freely, and lets a save be a simple snapshot.

## 1. Technical pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Phone first, measured** | Every big feature is checked on the director's phone. Budgets in section 7 are hard limits, not hopes. |
| 2 | **The war runs without the picture** | The simulation (section 3) has no graphics code. Drawing only reads it. Off-screen fights are simulated, not drawn. |
| 3 | **Numbers, words and art live in data** | Balance numbers, every line of text and the art map are data files. Tuning, translating or upgrading art never needs a code change (Phases 4, 5, 6). |
| 4 | **Same war from the same seed** | Each war has a seed number; the simulation uses only its own dice. The same seed and the same player actions give the same war, so any bug can be replayed. |
| 5 | **Nothing leaves the phone** | No accounts, no tracking, no ads code, no outside websites at run time. Saves stay on the device. |

## 2. Platforms and the smallest phone
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

## 3. How the program is built (architecture)
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

## 4. Tools and libraries
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

## 5. The world in the simulation

### 5.1 Grid, sizes and units
| Rule | Value | Why |
|---|---|---|
| 1 model unit | 1 metre (Phase 6) | Unchanged |
| **1 tile** | **2 × 2 metres** | The art kit's wall pieces are 2 m wide (Verified), so buildings snap to tiles with no gaps. **Changes Phase 6's "1 tile = 1 metre"** (section 13). |
| **Map, first pass** | **160 × 96 tiles (320 × 192 m)** | Keeps Phase 5's promise "Hall to Hall in about 2 minutes" (about 280 m: 70 s jogging empty, 90 s loaded, 2 min at a villager's walk). **Changes Phase 5's 96 × 64** (section 13). |
| Your speed | 4 m/s, 3.2 m/s with a full load (Phase 2: −20%) | The street mock-up's speed felt right on the iPhone |
| Other villagers | 2.5 m/s walking, 4 m/s fleeing | Readable from above; they don't race past you |
| Sight, reach, ranges | Stay in tiles as written in Phases 2 to 5 | With 2 m tiles they come out sensible: day sight 20 m, night 8 m, torch 12 m, spear reach 3 m |

### 5.2 What the simulation keeps
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

### 5.3 Moving around (pathfinding)
- **Finding a way:** a standard shortest-path search on the tile grid (an "A-star" search), with walls, buildings and dense wood blocked and paths cheaper. 15,360 tiles take well under a millisecond per search (Likely).
- **Many people, same goal:** for places everyone walks to (the Hall, each store, each camp, the gates), the simulation keeps a **"which way from here" map** for the whole grid and updates it when a wall, building or camp changes. Hundreds of people can then find their way at almost no cost.
- **Not bumping:** people step around each other with a simple push-apart rule; soldiers keep loose rows.
- **Chokepoints come free:** gates, the bridge and gaps in the woods are simply the only open tiles, so armies queue there on their own (Phase 4, and gap G12 later).

### 5.4 The faction AI (the Warden)
The biggest build (Phase 1 risk). It's built in layers so the smallest version plays a real war first:

| Layer | Thinks every | Decides |
|---|---|---|
| **Plan** (the Warden) | 5 game s | Which step of the plan comes next: gather → houses → walls → soldiers → scout → raid → full attack (Phase 2, section 2.8). A data file per town style: Almara builds early, Quintara raids early (Phase 4). |
| **Needs** (the Steward) | 2 game s | What the town lacks for the plan; turns it into worker jobs and into **orders on the notice board** (Phase 2, section 2.3). Orders come from real gaps because they're made by the same code that tells AI villagers what to do. |
| **Workers** | 1 game s per villager, spread out | Each AI villager picks a job from the needs list and the timetable (Phase 2, section 2.10): walk, work, carry, deliver, eat, sleep, hide. A small set of states per person. |
| **War** (the Captain) | 1 game s | Raids and attacks: picks a target, gathers a squad, marches, retreats when losing. Sends the raid warning signs ahead (Phase 2, section 2.9); the watchman rings the bell only if alive. |
| **Squads** | 0.2 game s | Who fights whom inside a battle; the squad leader's target (Phase 7, section 2.5). |

- **Fairness rule:** the AI sees what its own people see (their sight circles, its scouts' reports), never the whole map. Hard difficulty makes it faster and bolder, not all-seeing (Phase 3).
- **The stalemate breaker** (Phase 2) is a rule the plan layer must obey: forced attacks from Day 6, rams from Day 8.

### 5.5 Dice and determinism
- One small random-number maker written by us, started from the war's seed. The simulation never uses the clock or the browser's own dice.
- Separate dice streams for the map, the AI, combat and names, so a change to names doesn't shift every battle.
- The game records your commands (moves, taps, choices) with the step number. Seed plus that record replays the war, which is how bugs reported from a phone get reproduced on the PC.

## 6. Saving
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

## 7. Performance

### 7.1 Budgets (mid-range phone, 30 frames a second = 33 ms per frame)
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

### 7.2 How we stay inside them
- **Copies, not separate objects:** trees, rocks, crops, fence and wall pieces are drawn as many copies of one model in a single call ("instances"). Buildings are merged into one piece each and frozen in place (the mock-up already does this).
- **Animated people the cheap way:** the engine's usual way of animating each person separately is the biggest risk with 60 people on screen. The plan is to bake each animation (walk, chop, fight…) into a picture the graphics chip reads directly ("baked vertex animation", supported by Babylon.js, Likely), so all villagers of one model draw together. The crowd test (section 10) checks this first.
- **Light:** one sun with shadows only near you; a soft sky light; at night at most **4 real torch lights** near you, every other torch a glowing picture that looks lit but costs almost nothing.
- **Sharpness:** the screen is drawn at up to 2× the phone's pixel size (as now). If the frame rate stays below 28 for 5 seconds, it drops to 1.5×, then 1.25×, quietly; Settings shows it.
- **Shared colour sheet:** pieces that share one small colour texture can be drawn together; the Quaternius pieces mostly do (Likely), which keeps draw calls low.

### 7.3 Download size
The art folder is about 13 MB today, 11 MB of it the six characters (Verified). Before publishing, glTF Transform shrinks the models (compressed shapes, one shared skeleton and animation set for all people, smaller textures). Target for the first playable version: **under 8 MB of models**. Music streams after the game starts; the title screen never waits for it.

## 8. Publishing: web page, offline, phone app
| Step | How |
|---|---|
| **Working on the PC** | `npm run dev` starts the game at http://localhost:5173/ with live reload |
| **Publishing** | Pushing to GitHub runs an automatic build (GitHub Actions, free for public repos) and publishes the result to the same link: https://sichdar.github.io/the-hall-remembers/ . Nothing built is stored in the repo by hand. |
| **Offline and Home Screen** | A small "app description" file (web app manifest: name, icon, sideways or upright) and an offline helper (service worker) keep the game on the phone after the first visit. Added to the Home Screen, it opens full screen like an app, with no browser bars. |
| **Updates** | When a new version is published, the game shows "A new version is ready" on the title screen and updates on the next start, never in the middle of a war. Saves carry their version (section 6). |
| **Phone app, later** (brief) | Capacitor puts the same built game inside an iPhone app and an Android app. No rewrite. Needs: a Mac (or a paid online Mac service) to build the iPhone app, Apple's yearly developer fee and Google's one-time fee. Costs and store rules go to Phase 9; whether and when, to Phase 10. |

## 9. Testing
| Test | What it checks | When |
|---|---|---|
| **Rule tests** | Pay, prices, reputation, hunger, inheritance, traits, the Roll: each rule from Phases 1 to 5 has a small automatic test | Every change, in seconds |
| **Test wars** | The simulation plays whole wars with no picture, at hundreds of times normal speed, with a robot "player" (worker, soldier, coward, turncoat). Checks: every war ends; 95% by Day 10 (Phase 2); the first raid isn't too early; the bell rings at least 60 s ahead (Phase 2, section 2.9); a day earns 20 to 35 coin (Phase 5). This is also the **"threat check"** the vision check asked for (gap G14) and the balance tool for Phase 11. | Every change (10 quick wars); 500 wars overnight before each playtest |
| **Data checks** | Every data file is complete: no missing text line, item, model or number; Portuguese text fits the 30% extra room (Phase 7) | Every change |
| **Browser check** | The built game opens in real browsers at 667 × 375, 844 × 390 and 390 × 844, with no errors; a screenshot of each | Before every publish |
| **The director's phone** | Feel, fun, frame rate, heat and battery | Each milestone (Phase 10) |

**Testing aids (hidden from players):** adding `?debug` to the link shows the frame rate, draw calls and number of people, and allows test shortcuts: set the time of day, call a raid, add coin, jump a day. The mock-up's gear button grows into this.

**Bug reports from the phone:** a "Copy bug report" button in Settings copies the war's seed, version, phone type and the last minutes of commands, which can be pasted into a message. Nothing is sent automatically.

## 10. The crowd test (S7, approved 24/11/2026)
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

## 11. Words, sound, input
- **Words:** every line is looked up by a short key (`order.timber.east_wall`) in one file per language: English first, Portuguese next (Phase 12). Both fonts cover Portuguese accents (Likely). The Portuguese call-outs (Phase 6) are sound files with their written word and meaning in the text files.
- **Sound:** played through the browser's sound system (Web Audio) via Babylon.js. iPhones only allow sound after a tap, so the title screen's first tap turns it on. Files in MP3, which every phone plays; music loops are set to repeat without a gap. At most 16 sounds at once; the nearest win.
- **Input:** one handler for touch, mouse and pen. Joystick and Action button work at the same time (two thumbs). The page blocks the phone's own zoom, double-tap and long-press menus so they never fight the game. PC keys from Phase 2, changeable. Game controllers: 💤 later.
- **Vibration:** Android only (Phase 3); a setting turns it off.

## 12. Privacy and safety in code
- No accounts, no analytics, no ads, no outside servers, no cookies. The only connection is loading the game from GitHub Pages.
- Fonts, engine and models are inside the game, so no font or code website learns who plays.
- The public repo holds code, docs and assets only; logs and private notes stay off it (project rules).
- Every outside asset keeps its line in `assets/LICENCES.md`; the game's **Credits** screen lists the engine, libraries, fonts and models with their licences (Apache 2.0 asks for its licence text to be included).
- The game's own code licence (public but "all rights reserved", or open source) is a Phase 9 decision.

## 13. Changes to earlier phases
Written into the earlier docs on 24/11/2026, after the director's "go".

| Where | Was | Now | Why |
|---|---|---|---|
| Brief, engine | Babylon.js + TypeScript + Vite, ASSUMPTION | Confirmed: Babylon.js 9, TypeScript, Vite, GitHub Pages; Capacitor for the app later | Section 4 |
| Phase 6, section 9 | 1 tile = 1 metre | Models in metres; **1 tile = 2 metres** | Matches the art kit's 2 m walls; sizes and ranges in tiles still read well |
| Phase 5, section 3.4 | Map about 96 × 64 tiles | **160 × 96 tiles** (320 × 192 m), first pass | Keeps "Hall to Hall in about 2 minutes" at the mock-up's walking speed |
| Phase 2, section 2.8 | About 130 moving units | Up to 256 living beings in the simulation; 60 drawn at once in isometric | Households, wolves and animals were missing from the count; drawing is limited, not the world |
| Phase 7, open risks | Smallest phone not set; fonts "to confirm" | 667 × 375 (iPhone SE); Alegreya and Atkinson Hyperlegible Next, Open Font Licence | Sections 2 and 4 |

---

## Phase 8 summary
- A web game in Babylon.js 9 and TypeScript, packed by Vite, published to the same GitHub link automatically, playable offline and from the Home Screen; Capacitor turns it into a phone app later without a rewrite.
- The war is a separate simulation with fixed steps and its own dice: it runs without graphics, so hundreds of test wars can check the balance and any bug can be replayed from a seed.
- Numbers, words, feedback and art are data files; the HUD stays in plain web elements as in the mock-up.
- The AI is built in layers (Warden plan, Steward needs and orders, workers, Captain, squads) and sees only what its people see.
- Saves are versioned snapshots on the device, with an export file for the family book because iPhone Safari can wipe web storage.
- Budgets: 30 frames a second, 150 draw calls, 60 animated people on screen, under 15 MB to download; the smallest phone is the iPhone SE.
- Biggest risk: drawing many animated people on a phone. A short crowd test (S7) checks it before more is built.

## Decisions and why
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

## Open questions and risks
- ✅ **S7:** yes to the crowd test on the live link before Phase 9 (the director, 24/11/2026). Section 10.
- ✅ **Q20:** test phones are a recent high-end iPhone and a 2018 Android phone with a worn battery (the director, 24/11/2026). Section 2.
- ⚠️ **No mid-range test phone:** the budgets are judged from a fast phone and a slow one (section 7.1). Borrowing a mid-range phone for one playtest in Phase 11 would close the gap.
- ⚠️ **Animated crowds on phones** are the top risk. Fallbacks, in order: baked animation, fewer people drawn (they still exist in the war), the Light look by default on weak phones.
- ⚠️ **The faction AI** is still the biggest build. The layered plan lets a simple version play a whole war first; test wars show where it's weak.
- ⚠️ **iPhone storage wiping** (section 6): the export file and "Add to Home Screen" soften it; only the phone app removes it.
- ⚠️ **iPhone app needs a Mac and fees** (section 8): fine for now, since the web link comes first; Phase 9 lists the costs.
- ⚠️ **Library updates** can break things: versions are pinned and upgraded one at a time, with the test wars and browser check run after each.
