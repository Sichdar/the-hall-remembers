# The Hall Remembers: Bloodlines

A villager strategy-war game for phones (landscape, two thumbs) and PC, in early design.
You are not the king: you are one villager in a town at war. When you die, your heir carries on, and the town remembers what your family did.

**Play it:** https://sichdar.github.io/the-hall-remembers/

## What's here

- `index.html` and `src/`: the game, in TypeScript with Babylon.js 9, packed by Vite (since M0). Right now one street of Almara with a clickable interface mock-up (Phase 7): dawn, day, dusk and night, a founding or growing town, isometric and first-person view. Two looks: **Full** (Quaternius's CC0 models) and **Light** (plain shapes, for slower phones; the choice is remembered on each device).
- `src/mockup/`: the mock-up street and interface (buttons, bars, menus), moved over unchanged; they become TypeScript part by part from M1. The interface stays apart from the 3D world so it can be swapped.
- `src/sim/`: the war itself, with no graphics (so far: the dice, chop and carry for the P-WORK test in M1, and the errands of P-WORK 2).
- `tests/`: automatic tests (`npm test`).
- `browser-check/`: the browser check run before every publish (docs/08, section 9).
- `public/`: the icon and the Home Screen description; with the offline helper, the game opens without a connection after the first visit.
- `docs/`: the game design, one file per phase. Start with the one-page [docs/summary.md](docs/summary.md); everything in one file: [docs/gdd.md](docs/gdd.md).
- `assets/`: outside art, each with its licence in [assets/LICENCES.md](assets/LICENCES.md).
- `tools/dev-server.mjs`: the old test server, replaced by Vite in M0.
- `tools/build-gdd.mjs`: rebuilds `docs/gdd.md` from the phase files.
- `prototypes/style-test/`: the old address of the style test; it now forwards to the game.
- `.github/workflows/publish.yml`: every push to `main` runs the tests, builds the game and publishes it to the play link.

## Run it on your own PC

Needs [Node.js](https://nodejs.org/) 26. From the project folder:

```
npm install
npm run dev
```

Then open http://localhost:5173/ . Other commands: `npm test` (tests), `npm run check` (type check), `npm run build` (the published version, in `dist/`), `npm run preview` (opens that build), `npm run browser-check` (builds, then opens the game at three phone sizes in Chrome and plays the chop-and-carry loop; pictures in `browser-check/results/`).

## Credits

- 3D models: Quaternius (quaternius.com), CC0.
- 3D engine: [Babylon.js](https://www.babylonjs.com/), Apache 2.0.
- Design by the director; code and documents written with Claude.

## Licence

All rights reserved: see [LICENSE](LICENSE). Outside assets keep their own licences ([assets/LICENCES.md](assets/LICENCES.md)).
