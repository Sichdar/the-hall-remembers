# The Hall Remembers: Bloodlines, on one page

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
