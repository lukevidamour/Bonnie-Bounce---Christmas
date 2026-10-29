/* firstplay.js — a dev tool for the design and playability review: plays a
   new player's first few minutes on whatever screen size the tab is, and
   saves a picture of each moment to tools/reel/out/ (served by
   tools/reel/serve.js). Load index.html?touch, then inject this script and
   run FP.run('844x390').

   The moments: the title, the story, the level card, the start of level 1
   (Father Christmas talking, the touch buttons), the first cracker's joke,
   the boats, the level-clear card, the map the first time, the sticker
   book's players page and the pause menu. */
(function () {
  'use strict';
  var shot = function (name) {
    return new Promise(function (res) {
      document.getElementById('screen').toBlob(function (b) { fetch('/reel/frame?i=' + name, { method: 'POST', body: b }).then(function () { res(name); }); });
    });
  };
  // the player put down at tile x of level n, on the floor there
  var at = function (n, x) {
    BB.game.startLevel(n); BB.game.go('play');
    var G = BB.game.G(), p = G.p;
    if (x !== undefined) { p.x = x * 8; for (var y = 0; y < G.h; y++) if (G.map[y * G.w + x]) { p.y = y * 8 - p.h; break; } }
  };
  window.FP = {
    run: async function (tag) {
      var out = [], step = function (n, keys) { BB.steps(n, keys || {}, false); };
      localStorage.removeItem('bonnie-christmas-save');
      var sv = BB.game.save();
      for (var k in sv) delete sv[k];
      Object.assign(sv, { unlocked: 1, cleared: [], lives: 3, stars: 0, score: 0, power: 0, seenStory: false, at: 1, won: false, best: {}, bears: {}, princes: {}, advent: 0, met: {}, outfit: 'everyday', who: 'bonnie', medals: {} });
      BB.game.go('title'); step(70); out.push(await shot('fp-' + tag + '-01title'));
      BB.game.go('story'); step(200); out.push(await shot('fp-' + tag + '-02story'));
      step(240); out.push(await shot('fp-' + tag + '-03story'));
      BB.game.go('card'); step(40); out.push(await shot('fp-' + tag + '-04card'));
      at(1); step(90); out.push(await shot('fp-' + tag + '-05start'));
      at(1, 33); step(20, { right: 1 }); step(40); out.push(await shot('fp-' + tag + '-06cracker'));
      at(1, 62); step(30); out.push(await shot('fp-' + tag + '-07boats'));
      at(1, 404); step(260, { right: 1 }); step(60); out.push(await shot('fp-' + tag + '-08house'));
      BB.game.go('clear'); step(70); out.push(await shot('fp-' + tag + '-09clear'));
      sv.unlocked = 2; sv.cleared = [1]; sv.at = 2;
      BB.game.go('map'); BB.game.mapEnter(1); step(120); out.push(await shot('fp-' + tag + '-10map'));
      BB.game.go('book'); step(2); BB.steps(1, { right: 1 }, true); BB.steps(1, {}, true); step(2); out.push(await shot('fp-' + tag + '-11book'));
      at(2); step(20); BB.game.go('pause'); step(10); out.push(await shot('fp-' + tag + '-12pause'));
      return out.length + ' shots at W=' + BB.W + ' scale=' + BB.scale.toFixed(2);
    }
  };
})();
