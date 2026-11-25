# Phase 1: Concept

*Draft 20/11/2026, S01-DESIGN. Approved by the director ("go").*

## Title
**The Hall Remembers: Bloodlines** (chosen by the director 20/11/2026, Q1). Check it against existing games before going public.

Other names that were considered:

| Theme | Suggestions |
|---|---|
| The family line | **Hearthline** · **Heirs of the Field** · **Bloodline & Barley** |
| From farm tool to weapon | **Sickle to Sword** · **From Furrow to Fray** · **Plough & Pike** |
| The nobody in the war | **Common Blood** · **Lowborn** · **One of Many** |
| Reputation and betrayal | **Turncoat's Heir** · **The Hall Remembers** · **Grain & Grudge** |
| Day and night | **Dawn Toil, Dusk War** · **Hold Till Dawn** |

## High concept (one sentence)
A real-time strategy war seen from the ground: you are one villager in an AI-run town, and each day you choose whether to work, hide, or fight.

## Elevator pitch
Two AI kingdoms grow, gather and go to war on the same map, playing a full strategy game against each other. You are not their ruler: you are one of the villagers. Chop wood, farm, carry stone, earn coin, and when the horns sound at dusk, decide whether to take up a spear, guard the walls, or bar your door. Die, and your heir picks up your tools and your savings, and the war goes on.

## Design pillars
Every feature must serve at least one. If it serves none, it gets cut.

| # | Pillar | What it means in practice | Test for a new feature |
|---|---|---|---|
| 1 | **Small person, big war** | You only ever control yourself. The camera stays close; armies are bigger than your screen. | Does it give the player command over others? Then cut it. |
| 2 | **Your choice, your risk** | Every order from the chief is a request. Obeying earns pay and standing; ignoring it is allowed and has consequences. | Is there a real "no" option with a cost? |
| 3 | **The town lives without you** | The AI factions play a real game. Your work helps (the wood you chop becomes the wall), but nobody waits for you. | Would this still happen if the player stood still? |
| 4 | **Day for work, night for fear** | Daylight is for the economy; night brings raids, low sight and higher stakes. | Does it change with the time of day? |
| 5 | **A whole war in one sitting, on a phone** | 20–40 minutes, two thumbs, readable on a small screen. | Can it be done with two thumbs in landscape, and read at phone size? |

## Target audience and motivations
- **Who:** ASSUMPTION: adults 25–45 who loved classic real-time strategy games and now play on phones in short sittings; also fans of survival and life-sim games.
- **Motivations, in order:**
  1. **Autonomy:** "I decide what kind of villager I am" (farmer, hauler, soldier, deserter).
  2. **Stories that tell themselves:** "My farmer held the gate alone at night, died, and his daughter finished the war as a captain."
  3. **Mastery:** reading the war (when to work, when to hide, when a battle is winnable) and surviving to the end.
  4. **Ownership:** your house, your savings and your gear pass down your family line.

## Unique selling point
Strategy games put you above the war; survival games put you in an empty world. This one puts you **inside a strategy war that is really being played by AI**: armies march because the AI decided to attack, not because a script said so. You are a single unit with a will of its own. No popular game we know of does exactly this on a phone.

## The player fantasy
"Be the nobody who lives through the war, and maybe becomes the hero no chronicle will name."

## How "inherits possessions" works (proposal)
The director asked that the next villager inherits the previous one's possessions. Proposal:
- **What you keep:** everything at home (house, storage chest, savings, unlocked skills as "family know-how" at a reduced level).
- **What you lose:** what you were carrying when you died. It drops where you fell and can be picked up if you get there before the enemy does.
- **Why:** death still hurts (you lose what was on you and some time), but it never wipes your progress. It also makes "bank your coin at home before the night raid" a real choice, which serves pillars 2 and 4.

## Reputation (added 20/11/2026, the director's answer to Q2)
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

## Changing sides (added 20/11/2026, the director's answer to Q2)
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

## Phase 1 summary
- *The Hall Remembers: Bloodlines*: a strategy war seen through one villager's eyes.
- Reputation with each side decides your jobs, pay and safety; you can defect, at a high cost, and your heir inherits the stain.
- Two AI kingdoms play a real war; you only control yourself.
- Five pillars: small person / your choice / town lives without you / day vs night / whole war on a phone.
- Death passes your home and savings to an heir; what you carried is dropped.

## Decisions and why
| Decision | Why |
|---|---|
| Two AI factions in the first version (yours + one enemy) | A believable strategy AI is the hardest piece to build; one rivalry is enough to prove the idea. 3–4 factions later. |
| Player never commands others (pillar 1) | It is what makes the game different from the games that inspired it. |
| Inheritance keeps home, loses carried items | Keeps death meaningful without wiping progress. |
| Reputation per faction, half passed to the heir | The director's Q2 answer. One number drives jobs, pay, weapons and shelter, and makes the family line matter. |
| Defecting costs your home and savings, starts you as Outcast | "Great cost and risk of life" (the director). Keeps it a dramatic choice, not a shortcut. |
| Original names from day one (no "Town Center", no copied unit or resource sets) | Keeps the "sell later" door open and avoids looking like a copy. The building at the heart of the town will be called the **Hall** (ASSUMPTION). |

## Open questions and risks
- ⚠️ **Is the villager's job fun?** Gathering can feel repetitive. This is the biggest design risk; it is the first thing built in M1 (P-WORK, [Phase 11](11-prototyping-playtesting.md), section 3), with two backup work ideas if it fails.
- ⚠️ **The strategy AI is a big build.** It must expand, gather, build and attack on its own. We'll keep it simple (scripted build orders plus a few decisions) and grow it.
- ⚠️ **Phone performance:** two armies of 30–60 units each plus villagers. Test early on the director's phone.
- ⚠️ **Folder name:** the project folder mentions a famous game. Fine locally, but the public repo and game must not use that name.
- ✅ Q1: title is **The Hall Remembers: Bloodlines**.
- ✅ Q2: yes, you can change sides, at great cost and risk; the heir carries the traitor's mark. See "Changing sides" and "Reputation" above.
- ✅ Q3: random, 75% the old home town (born before), 25% the new town (born after). *Replaced 25/11/2026 by Q31.*
- ✅ Q31: you choose the traitor's heir like any heir, no dice; each shows where they live and what they'd start with (the director, until tested). See "Changing sides".
