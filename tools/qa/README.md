# tools/qa

The responsive QA standard's page checks (audit.py, overlays.py, shots.py,
cdp.py: Python 3 and Google Chrome) and the game's own first-play review:

- `firstplay.js`: inject into `index.html?touch` at any viewport and run
  `FP.run('tag')`. It plays a new player's first few minutes and saves each
  moment to `tools/reel/out/fp-tag-*.png` (served by `tools/reel/serve.js`).
- `sheet.py TAG`: tiles those into one sheet to look at.

The page checks see the game as one canvas, so they cover the page (fit,
overflow, the turn-sideways note, load speed); what's inside the canvas is
checked by eye with firstplay.js.
