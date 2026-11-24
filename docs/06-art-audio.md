# Phase 6: Art and audio direction

*Draft 21/11/2026, S02-WORLD. Waiting for the director's "go". Builds on [visual-direction.md](visual-direction.md) (end goal) and the brief's art path (Q7). Every asset must allow commercial use, because the game may be sold later.*

## 1. Art pillars
| # | Pillar | In practice |
|---|---|---|
| 1 | **Warm and sunlit** | Golden grass, ochre paths, terracotta roofs, deep blue sea. Night is blue and lit by torches, never black. |
| 2 | **Readable at phone size** | You can find your villager, enemies and the notice board in under a second on a 6-inch screen. Readability beats detail every time. |
| 3 | **The town tells the war** | 3 growth stages, burned houses, graves, banners (pillar 3 of the game). The world shows what happened. |
| 4 | **Swappable art** | Every model is a separate file, named by its role. Upgrading the art never needs a code change (CLAUDE.md rule). |

## 2. The three art steps
| Step | When | What it looks like | Cost |
|---|---|---|---|
| **A. Plain shapes** | Prototype (Phase 11) | Boxes, cones and cylinders in the final colours. Thatch = cone, house = box, person = capsule with a head and a team-coloured sash | €0, Claude makes them in code |
| **B. Free low-poly packs** | First playable version | Ready-made low-poly buildings, trees, rocks and people from free packs that allow commercial use, recoloured to our palette | €0, licences checked one by one |
| **C. End-goal detail** | After the game is proven fun | Dense, detailed towns like the reference (visual-direction.md): own models, either a paid pack plus edits or a hired 3D artist | Money; decided then (Phase 10) |

**Decision after the style test (22/11/2026):** step B uses **Quaternius** (Medieval Village MegaKit and RPG Character Pack, CC0). Plain shapes (A) stay in the game as the "Light" look, the fallback if the game turns out too heavy for phones. Kenney's models were tried and dropped (the director didn't like their themes). The village kit's walls have an inside face, and it has inside corners, floors and stairs, so house interiors can be built from it; it has no furniture, which would need another CC0 pack.

### Free packs to look at for step B (Likely, check each licence before use)
| Source | Licence (as last known) | Good for |
|---|---|---|
| Kenney (kenney.nl) | CC0: free for any use, no credit needed | Nature, buildings, props, sounds, UI |
| Quaternius | CC0 | Animated low-poly people, animals (wolves), nature |
| KayKit (Kay Lousberg) | CC0 for the free packs | Medieval buildings, characters, props |
| Poly Pizza | **Mixed**: each model has its own licence | Use only the CC0 models |

**Rule:** every outside asset gets one line in `assets/LICENCES.md` (name, source link, licence, date downloaded). No line, no asset. "Free to download" is not the same as "free to sell": anything marked non-commercial is banned.

**AI-made art:** never used, for art, music or voices (decided in Phase 9, section 4.5): who owns it is unclear, stores ask about it, and players care.

## 3. Colour palette
| Use | Colours |
|---|---|
| Ground | Golden grass, dry ochre paths, white salt flats, grey-beige rock |
| Plants | Olive green, deep cypress green, cork-oak brown-green |
| Buildings | Whitewash, warm sandstone, terracotta roofs, weathered timber, thatch straw |
| Sea and river | Deep blue far out, turquoise near the shore |
| **Almara** | Blue (#2F6FB3-ish) + white, **square banner with a wave** |
| **Quintara** | Red (#B33A2F-ish) + gold, **forked banner with a tower** |
| Your villager | A small golden marker under your feet and a soft rim light, so you never lose yourself in a crowd |
| Danger | Red only for enemies and damage; nothing else in the world uses that bright red |

**Team colour rule:** team colour appears only on trims, banners, roof edges, shields and clothes sashes. Buildings stay mostly natural colours, as in the reference. Every team colour comes with its banner shape (Phase 3, colour-blind players).

## 4. Light and time of day
| Time | Sky and light | Mood |
|---|---|---|
| Day | High warm sun, short soft shadows | Safe, busy |
| Dusk | Orange and pink, long shadows, windows start to glow | Hurry home |
| Night | Blue moonlight, sight circle (isometric) or real darkness (first person), warm torch pools | Fear and focus |
| Dawn | Pale gold, mist on the fields | Relief |

Night must stay readable: a brightness slider (Phase 3), enemies get an outline, torches cast light that shows real danger.

## 5. Models

### 5.1 People
- **Size:** about one-tenth of a house's height (visual-direction.md), but with slightly big heads and hands so poses read from above.
- **Look from the job:** each job adds one clear prop (axe, sickle, pick, carry frame, spear and shield). You can tell what anyone is doing at a glance.
- **Team:** sash, shield and hat trim in team colour.
- **Two levels of people (decided 24/11/2026):**
  - **The crowd** (ordinary workers, most of what you see from above): one body for men and one for women, the same for everyone. They differ only by job tool, team colour and 2 or 3 clothes colours. Plain on purpose: what someone is doing reads at a glance, and soldiers' classes (Phase 5) stand out against them.
  - **Named people** (you, your household and the fixed roles such as Warden, Smith and Baker; about 10 to 15 at a time): the same two bodies, plus their own head, hair and hat, combined at random, and the painted face. You know your family on sight, and Phase 4's "fresh people every war" still costs almost nothing in art.
- **Faces:** simple painted faces (eyes, brows, mouth) that work up close in first person. No detailed faces in step A or B.

### 5.2 Buildings
- 14 types (Phase 5) × up to 3 stage looks. A stage look reuses parts: same walls, new roof and trim.
- **Damage:** 2 states per building, whole and burned (blackened, roof gone). Rebuilt buildings swap back.
- **Built in parts:** walls, roofs, doors and banners are separate pieces, so stage looks and burned looks are cheap.

### 5.3 Nature and props
Trees (cork oak, olive, cypress, pine), bushes, rocks, cliffs, fields in rows, fences, carts, barrels, crates, woodpiles. **Density is the secret of the reference look:** many cheap copies of a few props fill every gap.

### 5.4 Animation
| First version | Later |
|---|---|
| Walk, run, carry, chop, harvest, dig, hit, brace, fall, cheer, idle | Sitting, eating, talking gestures, ship rowing |

Quaternius and KayKit people come with many animations already (Likely). Animations are shared by every person model.

## 6. Effects
Wood chips, dust, sparks on blocks, fire and smoke on burning houses, torch flicker, the good-stroke ring, floating coins, the red grudge mark (Phase 4). All simple and cheap: small flat images that always face the camera.

## 7. Phone performance budget (first pass, checked in the prototype)
| Item | Budget |
|---|---|
| Frame rate | 30 frames per second steady on a mid-range phone, 60 on PC |
| Triangles on screen | about 150,000 |
| Person model | about 1,000 triangles |
| House | 500–1,500 triangles |
| Textures | One shared colour sheet (atlas) for most models, so the phone draws many things at once |
| First-person view distance | Fog from about 40 tiles away |

**Why it matters:** the end-goal look (step C) is the most expensive part of the project for a phone. Each art step is tested on the director's phone before the next.

## 8. Audio

### 8.1 Audio pillars
- **Sound tells you what's happening without looking:** horn = attack, bell = dusk, howl = wolves (Phase 3 has a visual sign for each).
- **Music follows the war, not the clock alone.**
- **Quiet is allowed:** nights have long gaps with only wind, crickets and distant dogs.

### 8.2 Music (changes with what's happening)
| State | Feel | Instruments (folk, coastal) |
|---|---|---|
| Day, peace | Light, warm | Guitar, flute, hand drum |
| Dusk | Uneasy | Slow strings, fewer notes |
| Night | Sparse, tense | Low drone, a far drum, silence |
| Muster and battle | Driving | Big drums, horns, voices shouting |
| Your town wins / loses | Proud / sad | Full tune / one guitar |
| Chronicle page | Gentle, like a story told by the fire | Solo guitar or lute |

**Changes blend smoothly** over 2–4 s. First version: about 6–8 loops from free CC0 music, or simple tunes Claude composes in code. Later: a hired composer, once the game proves fun.

### 8.3 Sound effects
Kenney's CC0 sounds, and Freesound clips marked CC0 only (Likely). Each gets a line in `assets/LICENCES.md`. Key sounds and their feel are listed in Phase 3 (good stroke "thock", coin clink, horn, bell, drum).

### 8.4 Voices
- **No full voice acting** (Phase 4). Text bubbles carry the words.
- **Short voice sounds** carry the feeling: grunts, laughs, "hey!", a gasp, a cheer, a tired sigh.
- **Short real words in Portuguese** (the director, Q12): they give the Sunward Coast a real accent. They stay in Portuguese in every translation, like a regional accent, and the text bubbles carry the meaning.
- **First word list (about 30):** "Bom dia!", "Boa noite", "Olá!", "Ai!", "Vamos!", "Força!", "Cuidado!", "Socorro!", "Olha!", "Obrigado!" / "Obrigada!", "Anda cá!", "Ora bolas!", "Às armas!", "Fujam!", "Viva!", plus laughs, grunts and sighs.
- **Who records them:** The director and willing friends on a phone (Likely the cheapest way: free, and we own the recordings). Several voices (young and old, men and women), 2–3 takes per word, so the same word doesn't sound identical each time. Each recording gets a line in `assets/LICENCES.md` with who recorded it.
- **Enemy accent:** Quintara uses the same words in a rougher, slower delivery, so you hear which side someone is on (always also shown by banner and colour).

### 8.5 Ambient sound by place
| Place | Sounds |
|---|---|
| Town by day | Hammering, chatter, chickens, cart wheels |
| Coast | Waves, gulls, creaking boats |
| Woods | Wind in leaves, birds; at night owls and howls |
| Salt flats | Wind, nothing else (exposed on purpose) |
| Battle | Clashing metal, shouts, horns, the Captain's voice sound |

## 9. Keeping art swappable (for Phase 8)
- Every model is a **glTF file** (an open 3D format that Babylon.js reads directly), named by role: `building/house_stage2.glb`, `person/body.glb`, `prop/barrel.glb`.
- A data file maps each role to a file. Swapping art = dropping in a new file with the same name, or changing one line.
- Sizes and the ground point are fixed by rules (models in metres, 1 tile = 2 metres to match the art kit's 2 m wall pieces, feet at height 0), so a new model always fits. Changed from "1 tile = 1 metre" in [Phase 8](08-technical-design.md), section 5.1.

---

## Phase 6 summary
- Warm, sunlit, readable at phone size; the town's look tells the story of the war.
- Three art steps: plain shapes (prototype) → free CC0 low-poly packs (first version) → detailed own art (after the game is proven fun, costs money).
- Team colour only on trims, banners and clothes, always paired with a banner shape.
- Phone budget: 30 frames per second, ~150,000 triangles on screen, shared textures.
- Audio: folk music that follows the war, sounds that work without looking, quiet nights, no full voice acting.
- Every outside asset is logged with its licence; anything non-commercial is banned.

## Decisions and why
| Decision | Why |
|---|---|
| CC0 packs for the first version | Free, allowed for selling, no credit rules to manage |
| A licence line per asset | "Maybe sell later" (brief): we must prove every asset is allowed |
| No AI-made art for now | Ownership and store rules are unclear |
| Two bodies: a plain crowd, own heads for named people | Jobs and soldiers read at a glance; your family is known on sight; endless villagers (Phase 4) at almost no art cost |
| Burned building state | Pillar 3: the war leaves marks you can see |
| glTF files mapped by role | Swappable art, as CLAUDE.md asks |

## Open questions and risks
- ✅ **Q12:** short real words in Portuguese (the director, 21/11/2026). See 8.4.
- 💡 **S2 (suggestion):** before Phase 7, build a **one-street style test** in the browser: the same Almara street in plain shapes and with a free CC0 pack, at day and at night, to see on your phone which look works. Cost: one short session; no game code yet.
- ⚠️ **Mixing packs** from different makers can look patchy. Pick one main pack family and recolour everything to our palette.
- ⚠️ **The end-goal look** needs money and a phone performance check; it may need a "high detail" setting for PCs and newer phones only.
- ⚠️ **Licences can change** on a site; that's why we record the licence and date when we download, and keep a copy of the licence text.
