# The Hall Remembers: Bloodlines

A villager strategy-war game for phones (landscape, two thumbs) and PC, in early design.
You are not the king: you are one villager in a town at war. When you die, your heir carries on, and the town remembers what your family did.

## What's here

- `docs/`: the game design, one file per phase. Start with [docs/00-brief.md](docs/00-brief.md).
- `prototypes/style-test/`: a one-street 3D style test (Babylon.js). Three looks (plain shapes, Kenney's CC0 packs and Quaternius's CC0 packs), dawn, day, dusk and night, isometric and first-person view.
  - Play it: https://sichdar.github.io/the-hall-remembers/prototypes/style-test/
- `assets/`: outside art, each with its licence in [assets/LICENCES.md](assets/LICENCES.md).

## Run it on your own PC

Needs [Node.js](https://nodejs.org/). From the project folder:

```
node prototypes/dev-server.mjs
```

Then open http://localhost:5173/prototypes/style-test/

## Credits

- 3D models: Kenney (www.kenney.nl) and Quaternius (quaternius.com), CC0.
- 3D engine: [Babylon.js](https://www.babylonjs.com/), Apache 2.0.
- Design by the director; code and documents written with Claude.
