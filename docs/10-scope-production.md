# Phase 10: Scope and production plan

*Draft 24/11/2026, S23-SCOPE. Approved by the director the same day ("Go, finish doc first": Q27). Builds on the brief (weekends, €0, the director directs and playtests, Claude writes all code), on the content budget in Phase 5 (section 6), on the build plan and tests in Phase 8, and on the money plan in Phase 9. Answers the points earlier phases sent here: when to pay for detailed art (Phase 6, step C), whether and when to make the phone apps (Phase 8, section 8), and where the waiting gaps and picks go (G6, G10 to G14; P4, P5, P7, P8). All time estimates are **Guess**: nothing has been built at this scale yet.*

**In plain words:** we build the game in seven steps, called milestones. Each one ends with something the director plays on the iPhone, then a "go" before the next. The first three build the smallest war that can be fun: one map, two towns, two jobs, raids, death and an heir. That's the **first playable**, and it's where we ask the big question: is it fun? Only if the answer is yes do we add the rest of the content, sound and polish for version 1.0 on the web link. Everything costs €0 until people have played it and liked it. If we fall behind, we cut content, never the heart of the game.

## 1. Production pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Playable on the phone at every step** | Every milestone ends on the live link, played on the director's iPhone. No milestone is "only code". |
| 2 | **Fun before big** | The smallest war that can be fun comes first. Content is added only after the first playable passes the fun check (section 5). |
| 3 | **Cut width, never the heart** | When time runs short, a job, an enemy or a map goes; the things in section 3.5 never do. |
| 4 | **The simulation proves the numbers** | Test wars (Phase 8, section 9) check balance before the director spends a weekend playing. The director's time is for feel and fun, not for finding broken numbers. |
| 5 | **One goal per session** | Each work session has one stated goal and ends with something to try or a finished document. New ideas are written down and parked, never started on the spot (section 7). |

## 2. Who does what
| Who | Does |
|---|---|
| **The director** | Decides, playtests on the iPhone (and the older Android phone at the milestone checks), says "go", records the Portuguese voice words (Phase 6, section 8.4), plays the fun check alone at milestone 3 ([Phase 11](11-prototyping-playtesting.md), section 7), and brings in outside players when ready |
| **Claude** | All code, data files, tests and test wars, model assembly from the free packs, documents, the project log, the public repo |
| **Outside players (later)** | Play a whole war when the director is ready, at the latest before 1.0 ([Phase 11](11-prototyping-playtesting.md), section 7.5); anyone else who records a voice signs a consent (Phase 9, section 4.4) |

**Rhythm (Guess):** most work happens at weekends, one or two sessions a day. A session is one to three hours of the director's attention. Claude's typing speed is not the limit; the limits are the director's playtest time and how much one session can hold before it needs a fresh start (the log carries everything across sessions).

## 3. Scope: what's in, what waits

Four tiers. "First playable" is the smallest war that can be fun. "Version 1.0" is the free web release (Phase 12). "Updates" come after 1.0, one or two features at a time. "Not planned" is a firm no for now.

### 3.1 First playable (milestones 1 to 3)
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

### 3.2 Version 1.0 (milestones 4 to 6)
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

### 3.3 Updates after 1.0 (no order yet)
A proposed order, 1.1 to 1.6, is in Phase 12, section 6.1.

- Maps: River, Hills, Wolfwood. Starting in Quintara.
- Jobs: fisher, salt raker, olive picker, baker's helper, scout (one or two per update).
- Enemies: archer, horse rider, catapult.
- **G11** houses and crowding, with the parked homeless life and stealing, which needs **P7** (crime someone must see) first.
- **P4** unfinished life goals passed to the heir; **P5** neighbours who remember you.
- House interiors (needs a furniture pack).
- Portuguese translation of all text.
- Detailed art (step C) and the phone apps: only on the rules in section 6.

### 3.4 Not planned
Commanding armies or the town (it breaks the core idea), multiplayer, accounts or online services, ads, paid luck or timers (Phase 9), sea battles (parked), lords and nobles as playable characters.

### 3.5 Never cut, whatever happens
One villager's eyes on a war the computer plays · every order optional · the family and the heir · isometric view with first person one button away · two thumbs on a phone · the Roll · children and the old never hurt.

**G14 (threat must be tested)** isn't a feature: it becomes a fixed check in the test wars and in Phase 11's playtests.

## 4. Milestones
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

## 5. The fun check (end of M3)
The one decision that shapes everything after it.

- **Who plays:** the director alone first, three whole wars on three different days (changed 25/11/2026, the director); at least 3 outside players later, when the director is ready. The exact questions, the observation sheet and how a session runs are in [Phase 11](11-prototyping-playtesting.md), section 7.
- **Passes if** (in short; the seven-part rule with "close" and "fail" is in [Phase 11](11-prototyping-playtesting.md), section 7.4): the wars are finished and the director wants another one; each war had its own goal; at least one moment is told as a story afterwards ("my heir took revenge on the man who killed me").
- **If it passes:** go to M4.
- **If it's close:** one or two "change" rounds of about 2 weekends each, aimed at what the players said, then check again.
- **If it still isn't fun after two rounds:** stop and rethink before adding content. Options then: a smaller game (one town and wolves, no war AI), a different core loop, or parking the project. Saying this now keeps a weak idea from eating months.

## 6. Money and the decisions waiting for proof
Everything up to version 1.0 costs **€0** (Phase 9, section 2.4). What counts as proof for each step, with numbers, is in Phase 12, section 7 (the gates).

| Decision | Waits for | Then |
|---|---|---|
| **Detailed art (Phase 6, step C)** | Version 1.0 live and played by people outside the family and friends | Compare a paid model pack plus edits against a hired 3D artist, with a spending cap the director sets then. Never before the fun check |
| **Selling on itch.io** | Version 1.0 and the fun check passed | Free demo (first war) and the full game (Phase 9, section 2.2); talk to an accountant first |
| **Android app** | Interest on the web link or itch.io (people finishing wars, asking for an app) | $25 once; Capacitor build (Phase 8, section 8) |
| **iPhone app** | The Android app doing well, or clear demand | $99 a year plus a Mac or online Mac; the only real fix for iPhone save wiping |

## 7. How we keep track
- **The project log** (private) is the tracker: each milestone becomes one request with its steps, opened when it starts and closed after the phone check.
- **Done when:** a milestone is done only when its "What the director can do" column works on the live link and the phone check is answered.
- **New ideas during building** go to `docs/later/` with one line on why, and are looked at only at the end of a milestone. This protects the current milestone without losing the idea.
- **Every change to a design decision** is written back into its phase document, so the documents stay the true description of the game.
- **Versions:** each milestone ends with a tagged version on GitHub (M0 = 0.0, M3 = 0.3, version 1.0 = 1.0), so any milestone can be played again.

## 8. If we fall behind: what goes first
In this order, one at a time, only after asking the director:
1. The random Coast map (the Guided Coast stays).
2. The Downtown stage (towns stop at stage 2).
3. The battering ram (a simpler stalemate breaker: both towns run low on food).
4. Foraging and seasons (always summer).
5. The Quarry worker (stone comes from the AI's own workers).
6. Choice cards (P8) and the festival day (G13).
7. Some deeds and items (keep at least 10 deeds and 15 items).

Nothing in section 3.5 is ever on this list.

## 9. Risks
| Risk | Size | What we do |
|---|---|---|
| The faction AI takes far longer than planned | High | Built in layers (Phase 8, section 5.4); a town that only grows is playable in M1; test wars show where it's weak |
| The first playable isn't fun | High | Found out at M3, before most of the work, with a clear rule for what happens next (section 5) |
| Too many new ideas while building | Medium | One goal per session; ideas parked in `docs/later/` and looked at between milestones (section 7) |
| Phone speed with real crowds | Medium | Measured at every milestone on two phones; the fallbacks from Phase 8, section 10 |
| The director's free time changes | Medium | Milestones are small and self-contained; the log means any session can pick up where the last stopped |
| Free packs lack a needed model | Low | Plain shapes stand in (the Light look); a missing piece never blocks a milestone |
| iPhone wipes saves | Low until 1.0 | Family book export and Home Screen in M5; the iPhone app later (section 6) |

## 10. Changes to earlier phases (written in 24/11/2026, after the director's "go")
- **Brief:** a line for Phase 10 (milestones, the fun check, €0 until proven).
- **Phase 6, section 2:** step C's "decided then (Phase 10)" points to section 6 here.
- **Phase 8, section 8:** the phone app's "whether and when" points to section 6 here; section 9's "each milestone" points to section 4.
- **Vision-check report:** G6, G10, G12, G13 placed in version 1.0, G11 in updates, G14 in the test wars and Phase 11.
- **The four-games research (P4, P5, P7, P8):** P8 in version 1.0; P4, P5, P7 in updates (private report, noted in the log).

## Phase 10 summary
- Seven milestones, each ending on the director's iPhone: M0 foundations, M1 a day in Almara, M2 the other town, M3 the first whole war, M4 content, M5 sound and welcome, M6 version 1.0.
- The first playable (M3) is one map, two towns, two jobs, three enemies, raids, death and an heir: about two months of weekends (Guess).
- The fun check at M3 decides whether content is added, the game is changed, or the project is rethought.
- Version 1.0 is the Phase 5 content budget plus G6, G10, G12, G13 and P8; about four to six months of weekends (Guess).
- €0 until people have played and liked version 1.0; then art, itch.io and the apps, in that order.
- If behind, content is cut in a set order; the heart of the game never is.

## Decisions and why
| Decision | Why |
|---|---|
| Milestones that each end on the phone | The director judges by playing; a milestone that can't be played can't be judged |
| Two jobs in the first playable | Woodcutter and Farmer feed the two things the war needs (timber to build, grain to grow); four jobs would slow the fun check |
| Fun check at M3, the director alone first, outside players later | M3 is the cheapest point to change course; outside players aren't counted on yet (the director, 25/11/2026), so the solo check is made as strict as it can be, and strangers still decide every money step (Phase 12, section 7) |
| A written "stop" rule | Keeps a weak core from absorbing months of content work |
| €0 until 1.0 is played by strangers | Phase 9: find out whether people want it before paying for art or store fees |
| Ideas parked between milestones | New ideas are welcome, but starting them mid-milestone is the fastest way to finish nothing |

## Open questions and risks
- ✅ **Q27:** building starts after the whole design document is finished (Phases 11 and 12, then the combined document); then M0 (the director, 24/11/2026).
- ⚠️ **All time estimates are guesses** until M0 and M1 show the real pace; section 4 is updated after each milestone.
- ⚠️ **A designer can't fully judge their own game's fun.** The solo fun check catches a game that isn't fun even for its maker; outside players or the first strangers are still needed before any money is spent.
- ⚠️ **The faction AI** remains the biggest single risk to the schedule (Phase 8).
