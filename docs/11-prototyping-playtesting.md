# Phase 11: Prototyping and playtesting

*Draft 25/11/2026, S24-PLAYTEST. Approved by the director the same day ("Go"). Builds on the risks named in Phases 1 and 2 (is the work fun, can a phone draw the town), on the testing plan in Phase 8 (section 9), on the milestones and the fun check in Phase 10 (sections 4 and 5), on the never-do list in Phase 9 (no tracking) and on gap G14 of the vision check (threat must be tested). Pass marks and numbers are first-pass (**Guess**) until the first playtests show what is normal.*

**In plain words:** before we build the whole game, we answer its scariest questions with small, quick pieces: is chopping wood fun for ten minutes, does a raid feel scary but fair, can the phone draw a busy town. Each piece is the first thing built in its milestone, so a "no" costs a weekend, not a month. Then we test in three ways: the computer plays hundreds of wars to check the numbers, the director plays every milestone on the iPhone with a short checklist, and at the first playable, at least three friends play a whole war while the director watches and stays quiet. This document writes down the exact questions, what counts as a pass, and how what players say turns into changes. Nothing about players is ever sent anywhere: the game only shows a summary that a player can copy and send if they want to.

## 1. Playtest pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Ask the scary question first** | Each milestone starts with the smallest piece that answers its biggest unknown (section 3), before anything is built on top of it |
| 2 | **Watch, don't explain** | In a playtest nobody helps the player. Where they get stuck is the finding. Questions come after the war, not during |
| 3 | **Numbers from the computer, feelings from people** | Test wars find broken numbers overnight; people's time is for feel, fear and fun (Phase 10, pillar 4) |
| 4 | **Nothing leaves the phone by itself** | No tracking, no automatic sending (Phase 9). The game shows a summary; the player chooses to copy it |
| 5 | **The director decides** | Players report what they felt; the director decides what changes. One player's wish is noted; two players saying the same thing is acted on (section 8) |

## 2. What we have already tested
Four small prototypes ran before this phase. They count: their lessons are already in the design.

| Prototype | Question | Answer | What it changed |
|---|---|---|---|
| One-street style test (S2, 22/11) | Which look works on a phone? | Quaternius models, plain shapes as fallback | Phase 6 look ("Full" and "Light") |
| Clickable interface mock-up (S3, 22/11) | Does the screen layout fit two thumbs? | Yes after fixes: the north gate wasn't labelled on the map; landscape stretched after rotating | Order places on the map, gold rings, portrait play, zoom toggle (Phase 7) |
| iPhone retests (22/11 to 24/11) | Do portrait and zoom work? | "Upright and sideways work. Zoom works too" | Portrait allowed (brief) |
| Crowd test (S7, 24/11) | Can the phone draw 60 animated people? | Only just: 30 frames a second with baked animation, nothing to spare | Lighter villagers, two bodies, near-only shadows (Phase 8, section 10) |

**Lesson for the rest:** each one took a single session and found something no document could have. Small and early works.

## 3. The prototypes still to come
Each is the **first piece built in its milestone**, on the real setup from M0 (not thrown away), with plain shapes where art isn't ready. Each has one question, a pass mark, and what happens on a "no".

| # | Prototype | The question | Smallest version | Pass mark (Guess) | If it fails | When |
|---|---|---|---|---|---|---|
| **P-WORK** | **Chop and carry** | Is the villager's work fun for ten minutes without the war? (Phase 1's biggest risk) | One tree line, the timber yard, the beat ring, carry and get paid; no neighbours, no night | The director plays 10 minutes and wants to keep going; at least half the strokes on the beat after 3 minutes; the automatic mode still feels fine | Try the two other work ideas below before building more of M1 | M1, first weekend |
| **P-DAY** | **One full day** | Does a 6-minute day hold enough to do? | P-WORK plus the Baker, hunger, the dusk bell and sleeping at home | The director finishes a day without waiting around for more than 30 seconds at a time | Change the day length in the data file (5 or 8 minutes) and try again | M1, end |
| **P-RAID** | **The first raid** | Does a raid feel scary but fair? (G14) | A fixed raid of 3 scouts on Day 2 with all the warning signs and the bell, on the M1 town | The director sees it coming, says "I had time to choose", and the raid still hurts (a house burns or coin is lost) | Earlier or louder warnings (more time), or a harder raid (more hurt) | M2, first weekend |
| **P-DEATH** | **Death and the heir** | Is dying sad but not punishing? | The death card, the heir card, inheriting the sack, on P-RAID | The director wants to carry on as the heir straight away; can say who the heir is and what they got | Change what is kept (Phase 2, section 2.7) or slow the moment down | M2 |
| **P-AI** | **A war with nobody watching** | Can the faction AI play a whole war on its own? | Two towns that gather, grow and raid, with no picture at all, run as test wars | 10 quick wars all end; 95% of 500 end by Day 10 (Phase 2); neither town wins more than 65% of the time on the even map | Simplify the AI's choices (Phase 8, section 5.4) before adding graphics to it | M2 to M3, before the first whole war |
| **P-CROWD** | **The real crowd** | Do the crowd fixes from Phase 8 hold up with a real town? | M1's town with 60 baked, lighter villagers, near-only shadows, sharpness step-down | 30 frames a second on the iPhone; 20 on the 2018 Android with the Light look | The fallbacks in Phase 8, section 10, in order | M1 and M2 |

**If P-WORK fails**, two other work ideas are tried, one weekend each, before rethinking the core (Phase 10, section 5):
- **Fewer, bigger moments:** no beat ring; instead each tree takes one long hold-and-release with a sweet spot, and loads are bigger.
- **Work as errands:** less chopping, more carrying to where the town needs it right now (the wall, the forge, the field camp), so the "why" carries the fun.

## 4. The three kinds of test
| Test | Who | When | What it checks | Cost |
|---|---|---|---|---|
| **Test wars** | The computer, with robot players (worker, soldier, coward, turncoat) | 10 quick wars on every change; 500 overnight before each phone check | The numbers in section 5 | Nothing: runs on its own |
| **Milestone phone check** | The director, on the iPhone (the 2018 Android at M1, M3 and M6) | End of every milestone | The checklist in section 6 | About 30 to 60 minutes |
| **Fun check** | The director plus at least 3 friends who didn't help design it | End of M3 (first playable) | The questions and pass rule in section 7 | One whole war each (20 to 40 minutes) plus 10 minutes of questions |

Two smaller ones:
- **First-ten-minutes test** (end of M5): 2 or 3 people who have never seen the game play only the guided start. Checks Phase 3's emotional arc (curious, competent, useful, uneasy) and whether each hint was needed. The question: "Tell me what this game is about." If they can't say it, the welcome isn't working.
- **Mid-range phone** (once, at M3): borrow a friend's middle-priced phone for one war, to close the gap Phase 8 left between the fast and the slow test phone.

**Adults only**, for now: every playtester is an adult who agrees to play and answer questions. That keeps consent simple (Phase 9).

## 5. What we measure
The game counts these during a war, **on the phone only**. At the end of a war (or from Settings at any time) a **"Copy playtest summary"** button copies a few lines of plain text: the numbers below, the game version and the war's seed. The player can paste it into a message if they want to. Nothing is sent by the game, and the summary has no names or phone details beyond the phone type. It shares the code of Phase 8's "Copy bug report" button.

| Number | Target (Guess) | Why it matters |
|---|---|---|
| War length | 20 to 40 minutes; 95% end by Day 10 | The brief's session length |
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

## 6. The milestone phone check
The director plays the build for at least one game day (M1) or one whole war (M3 onwards), then answers on one sheet. The "Phone check asks" column of Phase 10, section 4 is the first question; these follow every time.

| # | Question | Answer |
|---|---|---|
| 1 | The milestone's own question (Phase 10, section 4) | Yes / not yet, and one sentence |
| 2 | Were the controls ever in the way? Where? | Moment and place |
| 3 | Was there a moment you didn't know what to do? | Moment |
| 4 | Did anything look broken or wrong? | List; screenshots to Claude |
| 5 | Was the phone warm, slow or draining fast? | Yes or no, and after how long |
| 6 | Best moment and worst moment | One line each |
| 7 | Go, change or stop? | One word (Phase 10, section 4) |

The playtest summary (section 5) goes with the sheet. Claude reads both, writes the findings into the project log, and proposes changes for the director's yes or no.

## 7. The fun check (end of M3)
Phase 10 set the shape; this section writes the exact questions and the refined pass rule.

### 7.1 How a session runs
1. **Before:** the player is told only: "You are one villager in a town at war. Do whatever you like. I won't help, I'll just watch." Hearth or Banner, their choice. Their own phone, sound on if they can.
2. **During:** the director watches over the shoulder (or sits nearby) and says nothing, even when the player is stuck. On the observation sheet (section 7.3) the director notes the time and what happened at every stuck moment, every laugh or groan, and every time the player says something out loud.
3. **After:** the questions in 7.2, open ones first, then the numbers. About 10 minutes. The player's own words are written down as said.
4. **Then:** the player copies the playtest summary and sends it to the director.

At least **2 of the 3 friends are watched in person**. A third (or more) can play at home alone and answer the questions afterwards by message or call; this shows how the game does with nobody in the room, as it will with strangers.

### 7.2 The questions
Asked in the player's own language (a Portuguese copy of the sheet goes into the playtest kit, section 9). The order matters: the first question comes before anything that hints at what we hope to hear.

| # | Question | What we listen for |
|---|---|---|
| 1 | "Tell me what happened in your war." | A moment told as a story, unprompted ("my house burned and then…") |
| 2 | "What were you trying to do, most of the time? Why?" | The player has their own goal, and it matches what they did |
| 3 | "What was the best moment? And the most annoying?" | What to protect; what to fix |
| 4 | "When did you feel in danger? Did you see it coming?" | The threat check (G14) |
| 5 | "Was there a time you didn't know what to do?" | Matches the stuck moments on the sheet? |
| 6 | "Did you ever join the fighting? Why, or why not?" | Orders feel like a choice, not a chore |
| 7 | "When you died, how did it feel?" (if they died) | Sad and fair, not annoying |
| 8 | "Would you play another war now?" Yes, maybe or no | The key answer |
| 9 | "If you could change one thing, what would it be?" | The one change each player cares about |
| 10 | From 1 (bad) to 5 (great): the controls · the work · the fear in raids · fairness of death · knowing what to do | Numbers to compare between rounds |

### 7.3 The observation sheet
One line per moment: **time · what happened · what the player said or did**. Four kinds of moment are always written down: stuck (30 seconds or more not knowing what to do), surprised, laughing or groaning, and quitting a menu straight away. Two lines at the end: where the first death happened and how the war ended.

### 7.4 The pass rule (refines Phase 10, section 5)
With the director plus at least 3 friends (4 or more players), the first playable **passes** when all of these hold:
1. **Finished:** at least 3 of 4 players finish their war (a Hall falls), in one sitting or with one save and resume.
2. **Again:** at least 3 of 4 answer "yes" or "maybe" to question 8, and at least 2 say "yes".
3. **A reason:** at least 3 of 4 can say what they were doing and why (question 2), and it matches the sheet.
4. **A story:** at least 1 player tells a moment as a story in question 1, without being asked about it.
5. **Threat:** at least 3 of 4 say they saw the first raid coming (question 4), and the summary shows the bell 60 seconds or more ahead.
6. **Nothing blocking:** nobody stops playing because of the controls, a bug or the phone being too slow.

**Close:** rules 1 and 6 hold, but one or two of the others miss. Then one or two "change" rounds of about 2 weekends, aimed at what the players said, then a new fun check with at least 2 new players (people who have played already know the game too well to judge it fresh).
**Fail:** rule 1 or 6 misses, or three or more of the others do; or still "close" after two change rounds. Then stop and rethink (Phase 10, section 5).

The director's own answers count as one player, but can't be the deciding "yes" on rule 2: at least 2 of the "yes" answers come from friends.

## 8. From what players say to what changes
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

### 8.1 The numbers most likely to move
All live in data files (Phase 5), so they change without code: day length (6 minutes), the beat ring's speed (1.5 seconds) and bonus (+50%), hunger speed, pay per load, bread price, raid timing per difficulty, enemy damage, warning time, how much the heir keeps, and Second wind (Phase 3). Each change is written in the log with the old value and why it changed.

## 9. The playtest kit
Made in M2, so the director can ask friends early (Phase 10 risk: finding players takes time):
- A one-page sheet with section 6's checklist, section 7.2's questions and section 7.3's observation lines, in English and Portuguese, easy to print or keep on a second phone.
- A short invite message the director can send: what the game is, how long it takes, that nothing is recorded and their name won't appear anywhere public.
- The live link with the "Copy playtest summary" button; the `?debug` link for the director only (Phase 8, section 9).

**Privacy:** friends' names, words and summaries stay in the private project log. Public documents say "player A, B, C" and give only numbers and short anonymous quotes. No video or sound is recorded unless the player agrees first.

## 10. Changes to earlier phases (written 25/11/2026, after the director's "go")
- **Brief:** a line for Phase 11 (prototype first in each milestone, three kinds of test, the fun-check pass rule, nothing sent from the phone).
- **Phase 1, open questions:** "Is the villager's job fun?" points to P-WORK (section 3).
- **Phase 2, open questions:** "Six-minute days" points to P-DAY and section 8.1.
- **Phase 3, open questions:** the beat ring's fate is decided by P-WORK and the good-strokes number (section 5).
- **Phase 8, section 9:** adds the "Copy playtest summary" button next to "Copy bug report"; the open question on a mid-range phone points to section 4 here.
- **Phase 10, section 5:** the pass rule points to section 7.4 here; section 4's milestones M1 and M2 start with their prototypes.
- **Vision-check report, G14:** points to P-RAID, section 5 (warning time) and section 7.4, rule 5.

## Phase 11 summary
- Four prototypes are already done (style, interface, portrait and zoom, crowd); each took one session and changed the design.
- Six more are the first piece of their milestone: chop and carry (P-WORK), one full day, the first raid, death and the heir, a war the AI plays alone, the real crowd. Each has a pass mark and a plan for a "no".
- Three kinds of test: test wars for numbers, the director's phone check at every milestone, and the fun check with at least 3 friends at M3. Plus a first-ten-minutes test with new players at M5 and one mid-range phone at M3.
- Ten numbers are counted on the phone and copied by the player if they choose; nothing is sent by the game.
- The fun check has 10 fixed questions, an observation sheet and a six-part pass rule, with "close" and "fail" defined.
- Findings are sorted into bug, numbers, feel and idea; two players saying the same thing is acted on.

## Decisions and why
| Decision | Why |
|---|---|
| Prototypes are the first piece of each milestone, not separate throwaway programs | Building starts after the design is finished (Q27); building the scary piece first on the real setup answers the question early without doing the work twice |
| P-WORK before anything else in M1 | "Is the work fun?" has been the biggest design risk since Phase 1; everything else sits on it |
| Two backup work ideas ready | A "no" on P-WORK shouldn't stop the project; it should change how the work feels |
| The director watches in silence | Explaining hides the problems strangers will hit when nobody is there to explain |
| Question 1 is open ("tell me what happened") | Asking about stories directly would put the answer in their mouth |
| A summary the player copies, never automatic sending | Phase 9's never-do list: no tracking; it also keeps the friends' trust |
| New players for each new fun check | People who played already learn the game and can't judge it fresh |
| Rule of two | One opinion is a taste; two is a pattern. Badly stuck players still count, as a hole a stranger could fall into |

## Open questions and risks
- ⚠️ **Friends know the director** and may be kind. The open questions, the observation sheet and the numbers (did they finish, did they play again) matter more than what they say they liked.
- ⚠️ **Four players is a small test.** It can catch a game that isn't fun; it can't prove one is. The 1.0 strangers (Phase 12) are the real proof.
- ⚠️ **Pass marks are guesses** until the first playtests show what normal looks like; they may be changed once, openly, after M1, and never during a fun check.
- ⚠️ **The robot players may play too well or too badly.** Each phone check compares the robot's numbers with the director's; the robots are changed when they don't match.
- ⚠️ **The 2018 Android phone may not run the game at all.** If it doesn't by M1, the weak-phone check moves to the mid-range phone and the smallest supported phone is reconsidered (Phase 8, section 2).
