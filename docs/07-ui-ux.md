# Phase 7: UI and UX

*Draft 22/11/2026, S07-UI. Approved by the director ("go"). Builds on the controls (Phase 2, section 5), onboarding and accessibility (Phase 3), the Roll and the Chronicle (Phase 4), the shop list (Phase 5) and the palette (Phase 6). Sizes are for a typical phone held sideways (844 × 390 screen points) and get checked on the director's phone.*
*Updated 24/11/2026: the heir card becomes a choice between family members (P2), a hint when your patch runs out, and raid signs in the message order ([vision check](vision-check-villager-eye.md) G2, G7). Approved by the director (S5, S6).*

## 1. UI pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **The world is the interface** | Most information lives in the world, not on the screen: the sky tells the time, the town's look tells the war, the stock sign hangs over the yard. The screen only shows what your villager would know. |
| 2 | **Two thumbs, no stretching** | Everything used often sits under a thumb, in the lower corners. The top edge holds only what you look at, not what you press during action. |
| 3 | **Never more than you can read in a second** | At most 1 hint, 2 speech bubbles, 3 edge arrows and 1 banner at the same time. |
| 4 | **The town doesn't stop for menus** | Only the Pause menu stops the war. The shop, the notice board and the bag open as half-screen panels with the world still moving behind them (the director, Q15). |
| 5 | **Medieval look, instantly readable** | Menus look like the Rememberer's pages and the Steward's notices, framed in dark wood and brass; icons are bold, plain silhouettes you recognise at a glance (the director, 22/11/2026). Original look, our own icons. |

## 2. The play screen (HUD)

### 2.1 Layout, isometric view
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

### 2.2 The Action button changes with what's in front of you
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

### 2.3 Tapping in a crowd (the Phase 2 risk)
- Every person and object has a **tap area of at least 48 points**, bigger than how small they look.
- **Enemies win ties:** during a fight, a tap near an enemy targets it instead of moving you. Outside a fight, a tap near a villager talks before it moves.
- The current target has a red ring under its feet and a small health bar. Tap empty ground or move the joystick to drop it.
- **Long-press anything** to see its name and one line ("Iron axe. +25% chopping.") without acting.

### 2.4 No minimap, on purpose
A minimap would show the whole war, which a nobody can't see (Phase 1, pillar 1), and it takes space a phone can't spare. Instead: edge arrows (at most 3) for what matters now, the sky for time, sounds with visual signs for danger (Phase 3), and the full map one tap away (section 3.4).

### 2.5 In combat
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

### 2.6 First-person view
Same HUD, same places, so nothing has to be relearned. Differences:
- A small dot in the centre of the screen. The Action button acts on what the dot is on.
- The right half of the screen (outside buttons) drags to look around.
- No edge arrows for things behind you; a soft glow on the left or right edge shows which way to turn.
- The sun dial and bars fade to 60% so the darkness at night stays dark.

## 3. Panels and screens

### 3.1 Screen flow
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

### 3.2 Title and setup
- **Title:** the Hall at dawn, slow camera drift. Buttons: **Continue** (if a war is saved), **New war**, **Chronicle book**, **Settings**.
- **Family:** pick an existing family (crest, name, chapters played, side) or start a new one: random family name with a reroll die, or type one (Phase 4).
- **War setup:** difficulty (Hearth, Banner, Blood; locked ones show how to unlock them), map type, and side for new families once Quintara is unlocked. One screen, big cards, a **Begin** button. The first ever war skips this: it's the guided war (Phase 3).
- **Loading:** a Rememberer's line and the family crest, under 10 seconds as a target.

### 3.3 Notice board and orders
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

### 3.4 Map
- A parchment drawing of the valley, made from the real map. Areas you haven't seen yet stay blank, like an unfinished drawing.
- It shows: you, home, the Hall, shops, accepted order sites, your dropped sack and how long until it's looted, and what you have seen or heard (an enemy camp you scouted, a grudge target's last known place from gossip).
- **Live enemy positions are never shown** unless you can see them right now.
- Pinch to zoom, drag to move. Tap a place to set a marker that becomes an edge arrow.

### 3.5 Shop (answers the Phase 5 risk: about 22 items on a phone)
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

### 3.6 Bag and home chest
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

### 3.7 The Roll (reputation)
Opened from the Pause menu or by tapping the feather on the HUD. A page of the Roll in the Rememberer's hand:
- Your standing with **both towns**: score, level name, and what that level allows (jobs, weapons, shelter).
- The last 10 entries that changed it ("Guarded the north gate · +3"), so the number is never a mystery.
- Your nickname and deeds so far in this war, and up to 3 marked grudges with their names.
- **Level changes** also show as a big banner on the play screen for 2 seconds (Phase 3).

### 3.8 Death card and heir card
- **Death card** (full screen, world in grey behind): name, nickname, days lived, the Rememberer's line, and "Killed by ..." for a grudge. Stays at least **2 seconds** so a stray tap can't skip it; then "Tap to go on".
- **Heir card (a choice, P2):** one small card per living family member of working age, side by side (2 to 4; in portrait they stack). Each shows the face, name, relation ("wife", "brother", "eldest daughter"), age, personality trait, blood trait if any, and their knack job. Tap one to see it larger, then **Carry on as ...** to confirm. There's no timer. With no one left, a single card: "A cousin comes from the outer farms."
- **What the heir gets**, shown under the chosen card as a short list with icons: house, chest, coin at home, half the reputation (shown as a number), know-how one rank lower, **Second wind** when it applies (Phase 3, shown openly). Then the heir carries on from home.

### 3.9 Chronicle
- **End of a war:** the Chronicle page (Phase 4 sample), then the score line by line (days alive, deeds, generations, bonuses, Phase 5), the deeds earned this war, and the **heirloom pick**: one card per item the last living family member owned. Buttons: **Next chapter**, **Title**.
- **Chronicle book** (from the Title): families → a family's tree → a chapter's page. The tree reads **left to right** (one column per chapter), which fits a sideways phone: each villager is a small card with their crest, nickname, side banner and how they died. Lost heirlooms appear as a crossed-out line.

### 3.10 Pause and settings
- **Pause** stops the war. It opens on its own when the game goes to the background, when the phone is turned upright, or when the browser tab is hidden (and the game saves, Phase 2).
- **Settings** in 5 tabs, each a short list (all Phase 3 options are here):

| Tab | Settings |
|---|---|
| Controls | Joystick size and side, tap-to-move, automatic good strokes, PC keys |
| Display | Look: Full or Light (section 6), text size (3), night brightness, reduce flashing and shaking, show meanings under Portuguese words |
| Sound | Music, effects, voices, captions |
| Game | Game speed 0.75×, Second wind, hints on or off |
| Language | English first; Portuguese in update 1.1 (Phase 12, section 6.1) |

## 4. Words on screen

### 4.1 Speech bubbles and Portuguese words
- Bubbles float above heads, 8 words at most, for 3 seconds. At most **2 on screen**, nearest first; enemy bubbles have a red-and-gold edge.
- **Portuguese call-outs** (Phase 6) show the word as spoken, with the meaning under it in small text when the game isn't in Portuguese: *"Cuidado!"* / (look out). The meanings can be turned off once learned.
- Every bubble is also a caption, so sound is never needed.

### 4.2 Text rules
- Smallest text **14 points** at the normal size (sizes: 14, 17, 20). Numbers on the HUD in a clear, wide font.
- **Text on parchment** passes the usual contrast check for reading (at least 4.5 : 1).
- **Leave a third more room** in every box: Portuguese text runs about 20–30% longer than English (Likely). No word inside a picture, so translation never needs new art.
- Every line lives in a data file (Phase 4), including button labels.

## 5. What the player is told, and in what order
When many things happen at once, the screen shows them in this order and drops the rest:

| Priority | Kind | Example | Rule |
|---|---|---|---|
| 1 | Danger to you | Enemy close, health low | Red edges, edge arrow, sound |
| 2 | War events | Horn, muster, Hall attacked, the watchman's bell | One banner at the top, 3 seconds, edge arrow |
| 3 | Your orders, raid signs | New orders, deadline near; "Smoke to the east" | Tracker blinks once; a raid sign gets an edge arrow toward it |
| 4 | Hints | "Bring it to the yard"; "This tree is done" with three choices: next patch (arrow), notice board, ask the Steward | Waits until priorities 1–2 are quiet |
| 5 | Gossip | "Quintara moved the Stone again." | Dropped first when busy |

**Numbers that float up** (+2 coin, +1 reputation) are small and gold, and merge when they come fast ("+6"), so a busy moment isn't a cloud of numbers. The faction's stock is shown in the world (a sign over each store that ticks up when you deliver), not on the HUD.

## 6. Look and feel of the interface
- **Materials:** parchment pages for the Roll, map and Chronicle; pinned paper for orders; dark wood for the HUD frames; wax seals for confirmations. Original, drawn by us.
- **Icons:** our own simple silhouettes as SVG (small vector drawings Claude can write as code), readable at 24 points, one colour plus outline. **Medieval in subject (axe, sack, scroll, feather, bread, shield), modern in clarity:** one bold shape each, no fine detail, no decoration inside the shape, so they read at a glance (the director). No icon packs needed, so no licence to manage.
- **Fonts (confirmed in [Phase 8](08-technical-design.md), section 4):** a readable book-style font for headings and story text, and a font built for easy reading on screen for numbers and buttons. Both under the SIL Open Font Licence, which allows selling: *Alegreya* for story text, *Atkinson Hyperlegible Next* for buttons. They will be copied into the repo, not loaded from a font website, so players' browsers don't contact anyone else. The mock-up uses the fonts already on the device.
- **Colours:** parchment, ink brown and gold for the interface; your gold for yourself and coin; **red only for danger and enemies** (Phase 6); team colours always with their banner shape.
- **Motion:** panels slide in within 0.2 s; nothing on the HUD moves unless it's telling you something. "Reduce flashing and shaking" also stops panel slides.
- **Full and Light looks:** the interface is the same in both. On first launch the game checks the frame rate for 10 seconds; if the phone struggles it suggests Light, in one line, never switching on its own.

## 7. Phone and PC specifics
| Topic | Phone | PC |
|---|---|---|
| Held upright | A "turn your phone" card with a rotating phone icon; the war pauses | Any window shape; the layout follows the shorter side |
| Full screen | Android: full screen on the first tap. iPhone browsers don't allow it for games (Likely), so the title suggests "Add to Home Screen", which gives the whole screen | Full-screen button in Settings |
| Joystick | On screen | Hidden; W A S D. Key letters show in a corner of each button |
| Pointing | Tap, long-press for names | Click; hovering shows names |
| Panels | Half screen, world visible | Same, but narrower; Esc closes |

## 8. Changes to earlier phases
| Where | Was | Now | Why |
|---|---|---|---|
| Phase 2, controls | View button at top centre | Right edge, middle | Reachable by the right thumb while moving |
| Phase 2, controls | Bag, map, orders "at the top corners" | All at the top right, with pause | One place to look; the top left holds the bars |
| Phase 3, feedback | "The faction stock bar ticks" | The stock sign over the store ticks | Keeps the HUD clean (UI pillar 1) |

---

## Phase 7 summary
- The world carries most information; the HUD keeps bars top left, icons top right, thumbs' controls in the lower corners.
- One Action button that changes with what's in front of you; fight buttons appear only when armed.
- No minimap: edge arrows, the sky and the full map instead (pillar 1).
- Shop, board, bag and map are half-screen panels and the war keeps moving; only Pause stops it (the director, Q15).
- Shops show one seller at a time, at most about 13 items in 3 tabs, each compared with what you have.
- Death card, heir card, the Roll and the Chronicle book make the family's story readable on a sideways phone.

## Decisions and why
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

## Open questions and risks
- ✅ **Q15:** the war keeps running while the shop, notice board or bag is open (the director, 22/11/2026). The world stays visible beside the half-screen panel, danger still shows on its edge, and on Hearth the world slows to half speed while a panel is open.
- ✅ **S3:** a clickable HUD mock-up is on the live link (the director said yes, 22/11/2026). It lives in `ui/` (`hud.js`, `hud.css`), apart from the 3D street, so the interface can be swapped without touching the world. Sample rules and fast timings; the Test button (gear) holds the time of day, town stage, look and zoom.
- ⚠️ **Phone screens vary:** small phones (about 667 × 375) leave little room between the thumbs. Phase 8 set the smallest supported phone: the iPhone SE (667 × 375); every screen is checked there.
- ⚠️ **iPhone and full screen:** browser bars eat about a sixth of a sideways screen (Guess). "Add to Home Screen" helps but players must do it themselves.
- ⚠️ **A running world behind panels** can kill a player who is shopping during a raid. The danger edge and Q15's Hearth rule soften it; playtests decide.
