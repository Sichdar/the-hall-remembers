# The Hall Remembers: Bloodlines

A villager strategy-war game for phones (landscape, two thumbs) and PC, in early design.
You are not the king: you are one villager in a town at war. When you die, your heir carries on, and the town remembers what your family did.

**Play it:** https://sichdar.github.io/the-hall-remembers/

## What's here

- `index.html`: the game (Babylon.js). Right now one street of Almara with a clickable interface mock-up (Phase 7): dawn, day, dusk and night, a founding or growing town, isometric and first-person view. Two looks: **Full** (Quaternius's CC0 models) and **Light** (plain shapes, for slower phones; the choice is remembered on each device).
- `ui/`: the interface (buttons, bars, menus), kept apart from the 3D world so it can be swapped.
- `docs/`: the game design, one file per phase. Start with [docs/00-brief.md](docs/00-brief.md).
- `assets/`: outside art, each with its licence in [assets/LICENCES.md](assets/LICENCES.md).
- `tools/dev-server.mjs`: a tiny local web server for testing.
- `prototypes/style-test/`: the old address of the style test; it now forwards to the game.

## Run it on your own PC

Needs [Node.js](https://nodejs.org/). From the project folder:

```
node tools/dev-server.mjs
```

Then open http://localhost:5173/

## Credits

- 3D models: Quaternius (quaternius.com), CC0.
- 3D engine: [Babylon.js](https://www.babylonjs.com/), Apache 2.0.
- Design by the director; code and documents written with Claude.

## Licence

All rights reserved: see [LICENSE](LICENSE). Outside assets keep their own licences ([assets/LICENCES.md](assets/LICENCES.md)).
