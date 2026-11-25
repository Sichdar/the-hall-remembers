# Phase 12: Polish, launch and beyond

*Draft 25/11/2026, S24-PLAYTEST. Approved by the director the same day ("Go"). Builds on the content and milestones of Phase 10 (version 1.0 is milestones M5 and M6; section 6 lists the decisions waiting for proof), on the testing plan of Phases 8 and 11, on the never-do list and the costs of Phase 9 ("Phase 12's launch list collects them"), and on the Settings language tab of Phase 7 ("Portuguese next, Phase 12"). Numbers for "enough interest" are **Guess**: nobody can know them before launch. Claims about itch.io's features are **Likely** (from its public help pages as known on 25/11/2026; to be re-checked before use, as Phase 9 asks).*

**In plain words:** polish means the game feels finished on a phone: nothing crashes, no save is ever lost, every screen is readable, every hit and coin sounds right, and a stranger understands the first ten minutes. Version 1.0 launches free on the web link, quietly, to a few places where people like this kind of game. The game still collects nothing, so we learn from what people write to us and from simple play counts. After launch, small updates come every month or two, never with pressure on players. Only if enough strangers play and like it do we take the next steps: selling on itch.io, the Android app, the iPhone app, better art, in that order. If not, the game stays free and finished, and that's a good ending too.

## 1. Pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Finished beats bigger** | Polish time is protected: M5 and M6 add no new features, only finish what's there (Phase 10, section 7 parks new ideas) |
| 2 | **Never lose a player's family** | A lost save or family book is the worst bug there is; it blocks any release |
| 3 | **Launch quietly, then widen** | The director's own last check, then a few communities, never paid ads (€0) |
| 4 | **Updates without pressure** | No events, countdowns or "come back" messages (Phase 9, section 2.3). An update is a gift, not a hook |
| 5 | **Proof before money** | Every cost waits for its gate in section 7 |

## 2. Polish: what "finished" means
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

### 2.1 Bugs: three levels
| Level | Example | Rule |
|---|---|---|
| **Blocker** | Crash, lost save or family book, a war that can't go on, the game won't open on a supported phone | Never shipped. After launch: fixed within a few days, ahead of everything else |
| **Major** | A rule doing the wrong thing, an order that can't be finished, a screen unreadable on a supported phone | Fixed before 1.0; after launch, in the next update |
| **Minor** | A model clipping a wall, a typo, a sound a little late | Can ship; listed in "known issues" on the game's page |

Every bug goes into the project log as one line with its level. A bug a player reports twice moves up one level.

### 2.2 The release bar
Version 1.0 ships when all of these hold:
- 0 blockers and 0 majors open.
- 500 test wars with none stuck and the targets met.
- The browser check passes at the three sizes (Phase 8, section 9).
- Both test phones and the mid-range phone play a whole war without a problem.
- The first-ten-minutes test (Phase 11, section 4) passes: new players can say what the game is about.
- An old save from the previous milestone opens and plays on (the save converter works).
- The launch list (section 3) is ticked.

## 3. The launch list (version 1.0, free)
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

## 4. Launch day and the weeks after
**Before (about 2 weeks):** the director plays the release candidate through on every test phone, and any outside players who have joined by then get it too. Only blockers and majors are fixed in this time.

**Launch day:**
1. Tag 1.0 and publish; check the live link on the iPhone.
2. Post a short "version 1.0 is out" note on the game's page (section 5) and in the repo.
3. Post in two or three online communities for indie, web or strategy games, each following its own rules about sharing your own work. One short honest post each: what it is, one clip, the link.

**After:** feedback is read **twice a week, in one sitting**, not every day: it keeps building time protected and stops one comment from setting the plan. Blockers are the exception and are fixed straight away. At the end of the first month, the director and Claude look at everything together and pick the first update (section 6).

**No paid ads, no review sites paid for, no fake accounts.** If it spreads, it spreads because people like it.

## 5. How we hear from players (no tracking)
The game still sends nothing (Phase 9, pillar 3). We learn from:
- **What people write:** comments on the game's page and messages; players can paste the "Copy bug report" and "Copy playtest summary" text (Phase 8, section 9; Phase 11, section 5).
- **Simple counts the page itself shows:** a free itch.io page counts views and plays of a browser game and shows them to the owner (Likely); GitHub shows the repo's visitors. Neither needs anything inside the game.

**Proposed (Q28; the director, 25/11/2026: not yet, decided near 1.0):** at 1.0, open a **free itch.io page** for the game next to the GitHub link. It gives the play counts above, a comments section, short news posts ("devlogs") for each update, and an audience that looks for small games. Free to open (Phase 9, section 2.4); it is also where a sale would happen later, so the page and its followers carry over. The GitHub link stays as it is. Feedback then goes to the itch.io comments, so the director's own e-mail never appears in public.

## 6. After launch: updates
- **Rhythm (Guess):** a small update every 1 to 2 months, one or two features each, always with fixes. Hotfixes for blockers in between.
- **Each update:** test wars and the browser check as for any milestone; old saves and family books always open (save version, Phase 8, section 6); a short "What's new" card on the title screen, shown once; a news post on the page.
- **Versions:** 1.1, 1.2… for updates; 1.0.1 for hotfixes.
- **Never:** limited-time events, seasonal passes, "come back tomorrow" rewards (Phase 9, section 2.3). Seasons in the game (Phase 5) are part of the world, not a calendar promotion.

### 6.1 The road after 1.0 (proposed order, changed by what players say)
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

## 7. The gates: when money and apps come in
Phase 10, section 6 says each step waits for proof. Here is what counts as proof (all **Guess**, checked 3 months after 1.0, then every 3 months):

| Step | Gate | If it isn't met |
|---|---|---|
| **1. Sell on itch.io** (free first war, one price for the full game: Phase 9, section 2.2) | About 1,000 plays on the page, at least 20 comments or messages from strangers, and at least 5 people saying they played several wars | Stay free; one update aimed at what players asked for; check again in 3 months |
| **2. Android app** ($25 once) | Selling on itch.io for 3 months, or at least 10 strangers asking for an app | Stay on the web; Add to Home Screen does most of the job |
| **3. iPhone app** ($99 a year and a Mac or online Mac) | The Android app sold enough in a year to pay Apple's fee at least twice over, or clear demand from iPhone players | Stay on the web; the family-book export protects iPhone saves |
| **4. Detailed art** (Phase 6, step C) | Selling on at least one store, with a spending cap the director sets then, paid from what the game earned | Keep the Quaternius look; it's the game's look, not a placeholder |

**The quiet ending:** if after 6 months the game hasn't reached gate 1, it stays free on the web link as a finished game, with its documents public. The family-book export means nobody loses their family. Updates continue only if the director still wants to make them. That's a good result, not a failure: a finished game that some people loved.

## 8. The sale list (only once gate 1 is passed)
What Phase 9 said a first sale brings, in order:
1. One talk with an accountant; register the activity with the Portuguese tax office if they say so (Phase 9, section 2.4).
2. Free trademark search for the final title in the EU and US databases (Phase 9, section 4.2).
3. Re-check itch.io's cut, payment and tax rules on its own pages (Phase 9 warns they change).
4. US tax form on itch.io so US sales aren't held back (Phase 9, section 2.4).
5. The free demo build (the first war) and the full build from the same code: a setting in the build, not two games.
6. The privacy note becomes a proper privacy page (already written at 1.0).
7. If anyone besides the director recorded voices, check their consent covers selling (the Phase 9 form already does).

For the apps, add: the store account, the age-rating questionnaire (target PEGI 12, Apple 13+, Phase 9, section 4.6), the stores' privacy forms ("Data Not Collected"), app icons and store pictures, and the Capacitor build (Phase 8, section 8).

## 9. Changes to earlier phases (written 25/11/2026, after the director's "go")
- **Brief:** a line for Phase 12 (polish passes, release bar, free launch, updates without pressure, the gates).
- **Phase 7, section 3.10:** Language tab "Portuguese next (Phase 12)" becomes "Portuguese in update 1.1 (Phase 12, section 6.1)".
- **Phase 9, open questions:** "Phase 12's launch list collects them" points to sections 3 and 8 here. Q28 is decided near 1.0: if yes then, section 2.2's itch.io row notes the free page opens at 1.0.
- **Phase 10, section 3.3 and section 6:** point to section 6.1 (update order) and section 7 (the gates) here.
- **README:** at 1.0 only (section 3), not now.

## Phase 12 summary
- Polish is eight passes in M5 and M6 (feel, readability, sound, speed, words, balance, interruptions, accessibility), with bugs in three levels and a release bar: no blockers, no majors, saves always open.
- Version 1.0 launches free on the web link with a credits screen, a privacy note, a press kit and a licence check; the director's last check first, then two or three communities; no paid ads.
- Players are heard through what they write and the page's own counts; the game still sends nothing. A free itch.io page at 1.0 is proposed, decided near 1.0 (Q28).
- Updates every 1 to 2 months without pressure; a proposed road from 1.1 (Portuguese) to 1.6, reordered by what players say.
- Money and apps wait for gates measured 3 months after launch; if the first gate is never met, the game stays free and finished.

## Decisions and why
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

## Open questions and risks
- ✅ **Q28:** a free itch.io page at 1.0, next to the GitHub link (section 5)? Not yet: decided near 1.0 (the director, 25/11/2026).
- ⚠️ **The gate numbers are guesses.** They are a starting point, to be changed openly at the first check if they turn out clearly too high or too low, never quietly.
- ⚠️ **Few people may find the game.** Small free web games get little attention without ads. The itch.io page and short, honest community posts are the cheap answer; the quiet ending in section 7 is the honest one.
- ⚠️ **After launch, feedback can crowd out the plan.** One update at a time, chosen at the end of the previous one (Phase 10, pillar 5).
- ⚠️ **Store and itch.io rules change.** Everything in sections 5, 7 and 8 is re-checked on their own pages before it's used.
- ⚠️ **Keeping old saves working** gets harder with each update; the save converter (Phase 8, section 6) is tested at every release (section 2.2).
