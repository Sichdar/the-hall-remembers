# Vision check: a villager's-eye view of two strategy matches

*Report 23/11/2026, S15-RAID. Waiting for the director's decision on which gaps to fold into the phase docs. Covers two matches Claude played against the computer in an existing medieval town-building strategy game, on the director's PC, between 22 and 23/11/2026.*

## 1. Why and how
The director felt the build is still far from "a villager who has to work to survive". To find out what that feeling is made of, Claude played two matches of a classic top-down strategy game as the usual commanding hand, and wrote down after every few minutes what the same moments would mean to one villager on the ground.

| Match | Opponent | Length | Outcome |
|---|---|---|---|
| 1 | Computer on a high level, but the add-on AI loaded was broken | About 37 game minutes | No contact at all; the enemy was never found. Abandoned |
| 2 | The game's own computer on its hardest level | About 17 game minutes | Defeat: the enemy burned the town's central hall, and the match ended a minute later |

Nothing here copies names, rules or units from that game. It is a list of feelings and pressures, turned into questions for our own design.

## 2. What it felt like, seen from one villager

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

## 3. What our docs already get right
- **You are the villager who chooses.** The matches showed workers waiting for a distant hand; our design flips that, with optional orders from the Steward that follow real shortages (02 §1, §2.3).
- **War has a timeline.** Scouts, then first night raids, then armies, then sieges, timed by difficulty, with a safe first night (02 §1, 03 §2-3, 05 §3.3).
- **Shelter depends on standing.** Who gets a place in the Hall during raids follows reputation (01); the muster turns villagers into a squad (02 §2.6).
- **The map is only what you've seen** (07 §3.4), and edge arrows, the war horn and red screen edges warn of danger (07 §5, 03 §4).
- **Places shape the war:** the bridge and ford as the front line, the Wolfwood where scouts hide (04 §5).
- **Death is not the end:** heirs, the Roll, grudges and the Chronicle (02 §2.7, 04 §7).

## 4. Gap list
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

## 5. What this means for the director's worry
The matches suggest that "working to survive" comes from three pressures, in this order:

1. **The land running out under your feet** (G1 to G3). This is missing from our docs today, and it's what made every worker's day change in both matches.
2. **Food as the town's growth** (G4, G6). In the matches, food decided whether the town could take in new people and advance; nobody went hungry. We have a hunger bar and a bakery (our own idea), but no link between the land, the harvest, the price of bread and the town's growth.
3. **War that builds up and then breaks the town** (G7 to G10). We have the timeline; we lack the warning signs before it and the long, readable fall after it.

**Recommended first step:** fold G1 to G4 and G7 to G9 into the phase docs before Phase 8, since they change the core loop. The rest can wait for their phases.

**Done 24/11/2026:** the director approved this. G1 to G4 and G7 to G9 are now in docs 02, 03, 04, 05 and 07; G5 was partly covered at the same time (idle neighbours, Phase 2 section 2.10). G6 and G10 to G14 wait for their phases.

**Placed 24/11/2026 ([Phase 10](10-scope-production.md), section 3):** G6, G10, G12 and G13 are in version 1.0; G11 waits for an update after 1.0, together with the parked homeless life; G14 is a fixed check in the test wars and in Phase 11's playtests.
