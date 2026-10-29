/* ==========================================================================
   backdropx1.js — CHRISTMAS EVE IN GUERNSEY, part one (levels 1–6): from
   a soft pink sunrise over St Peter Port harbour, up through a frosty
   morning in Candie Gardens, to the noon-day gun at Castle Cornet, the
   green lanes in the early afternoon, Saumarez Park as the light goes
   gold, and the sun going down into the sea off Cobo and Vazon.

   Each world's theme (its colours, ground, platforms, scenery, music, the
   little things on its ground and its light), the scenery that stands on
   its ground, and the scenery behind it. Painted the same way as
   backdrop.js, with its kit (BB.bgKit): a graded sky, then layers that
   slide past slower the further away they are, each fainter and nearer
   the colour of the sky than the one in front; round things lit from the
   top left in three tones; fine detail at the screen's full density; every
   strip 512 game pixels wide and seamless at its ends.

   Real, local and lovely rather than a snow globe: granite and pastel
   houses stacked up the hill, Herm, Jethou and Sark on the horizon, golden
   Guernsey cows, old glasshouses, the pink rocks of Cobo. No words, no
   flags with crosses, no churches; Christmas comes in wreaths, fairy
   lights, a tree on the quay and frost on the lawns.

   Load it after creatures6c.js and backdrop6.js: its scenery sprites use
   BB.ART.kit and BB.ART.deco, its backdrops BB.bgKit.
   ========================================================================== */
(function () {
  'use strict';
  var A = BB.ART;

  /* ==========================================================================
     THEMES — tile palettes are [1, 2, 3, 4], light to dark. The day goes by
     as the levels do: sunrise (1), a frosty morning (2), noon (3), early
     afternoon (4), late afternoon (5) and sunset (6). None sets ice: the
     levels lay their own ice where they want it.
     ========================================================================== */
  var THEMES = {
    // 1 · Harbour Lights: granite setts on the quay, brick-red and granite blocks, pontoon planks
    stpeterport: {
      sky: ['#6c98d2', '#dcb4c6', '#ffd8aa'], ground: 'stone', gpal: ['#e8e2da', '#b4aca4', '#7e7672', '#383234'],
      brick: ['#ffb4a0', '#d0604e', '#963a32', '#3e1618'], hard: ['#e6e4e0', '#aaa6a4', '#74706e', '#2e2c30'],
      semi: 'bridge', spal: ['#ecc896', '#b88a58', '#7a5634', '#3a2414'], column: 'chimney',
      deco: ['x1lamppost', 'x1lobsterpots', 'x1bollard', 'x1xmastree', 'x1lifebuoy', 'x1lobsterpots'], bg: 'stpeterport', music: 'stpeterport', sea: true, ice: false
    },
    // 2 · Frosty Morning: frosted lawn, flower-pot terracotta blocks, pale stone blocks, rimed branches
    candie: {
      sky: ['#8cb4e0', '#d4e2f0', '#fff0dc'], ground: 'grass', gpal: ['#f2f8fa', '#aec8c0', '#8a6c5a', '#46322c'],
      brick: ['#ffc4a4', '#e07c5a', '#a84c34', '#4a1c14'], hard: ['#f2eee6', '#c8c0b4', '#948a7e', '#403a34'],
      semi: 'branch', spal: ['#eef2f4', '#a8968a', '#6c5648', '#2c1e18'], column: 'snowstump',
      deco: ['x1urn', 'x1frostbench', 'x1topiary', 'x1lamppost', 'x1frostholly', 'x1robinpost'], bg: 'candie', music: 'candie', ice: false
    },
    // 3 · The Noon-Day Gun: grey-gold castle flags, lichened granite blocks, cool grey blocks, oak walkways
    cornet: {
      sky: ['#3a8ae0', '#84c0f0', '#e6f4ff'], ground: 'stone', gpal: ['#eee6ce', '#beb294', '#867a64', '#3a342a'],
      brick: ['#ecdfc0', '#bcab88', '#807058', '#342e24'], hard: ['#dcdce2', '#a2a2ac', '#6a6a76', '#2c2c36'],
      semi: 'bridge', spal: ['#e2c08e', '#ae8656', '#725230', '#322212'], column: 'sandcastle',
      deco: ['x1shotpile', 'x1pennant', 'x1barrels', 'x1xmastree', 'x1shotpile', 'x1lamppost'], bg: 'cornet', music: 'cornet', sea: true, ice: false
    },
    // 4 · The Green Lanes: green-gold turf on red earth, farm-granite blocks, brick-red blocks, gate planks
    lanes: {
      sky: ['#64a2de', '#a8cdea', '#fff0c8'], ground: 'grass', gpal: ['#cee27a', '#7aa648', '#9a6a44', '#523422'],
      brick: ['#f2dcc2', '#c4a686', '#8a6e56', '#3a2c22'], hard: ['#ffb898', '#d66a4c', '#983e2c', '#3e1810'],
      semi: 'bridge', spal: ['#e2c898', '#a88a58', '#6c5434', '#2c2014'], column: 'stump',
      deco: ['x1churns', 'x1gate', 'x1holly', 'x1ferns', 'x1robinpost', 'x1ferns'], bg: 'lanes', music: 'lanes', ice: false
    },
    // 5 · Saumarez Park: park lawn, honey-gold blocks, lacquer-red blocks, wooden boardwalks
    saumarez: {
      sky: ['#5c9ee0', '#a8ccea', '#ffe4c0'], ground: 'grass', gpal: ['#bce072', '#64a648', '#a87a50', '#5a3a24'],
      brick: ['#ffdca0', '#eca450', '#b46c28', '#4a2a10'], hard: ['#ffaa98', '#e04c3c', '#a42c26', '#401010'],
      semi: 'bridge', spal: ['#ecc890', '#b88c50', '#7a5628', '#3a2410'], column: 'stump',
      deco: ['x1parkbench', 'x1stonelantern', 'x1fairytree', 'x1lamppost', 'x1holly', 'x1fairytree'], bg: 'saumarez', music: 'saumarez', ice: false
    },
    // 6 · Sunset Bays: sand gone gold and rose, pink Cobo granite blocks, sea-wall granite blocks, groyne planks
    bays: {
      sky: ['#4c3c8c', '#e4788c', '#ffc276'], ground: 'sand', gpal: ['#ffe2bc', '#f2b88c', '#c88064', '#7a4a3a'],
      brick: ['#ffc8b6', '#e08876', '#a4544c', '#48201c'], hard: ['#e2d2cc', '#ae9c9a', '#76666a', '#302830'],
      semi: 'bridge', spal: ['#e8bc8c', '#b8845a', '#7a5032', '#38200e'], column: 'sandcastle',
      deco: ['x1pinkrocks', 'x1vraic', 'x1lifebuoy', 'x1lobsterpots', 'x1pinkrocks'], bg: 'bays', music: 'bays', sea: true, ice: false
    }
  };
  // the little things on the ground (A.tiny names), what hangs beneath it, and each world's light (see art.js, light.js)
  var TINY = {
    stpeterport: ['pebble', 'moss', 'pebble', 'shell', 'moss'],
    candie: ['snowTuft', 'tuft', 'snowTuft', 'berries', 'flowerW', 'snowTuft'],
    cornet: ['pebble', 'moss', 'tuft', 'pebble', 'flowerY'],
    lanes: ['tuft', 'berries', 'clover', 'flowerY', 'tuft', 'shroom', 'moss'],
    saumarez: ['tuft', 'clover', 'flowerW', 'tuft', 'shroom', 'berries'],
    bays: ['shell', 'pebble', 'seagrass', 'shell', 'pebble']
  };
  var HANG = {
    stpeterport: ['kelp', ['#3a7a5a', '#6ab088', '#2a5a44']],
    candie: ['icicles', ['#d8eef8', '#ffffff', '#9ac0d8']],
    cornet: ['vines', ['#3e7a40', '#7cbc64', '#5a4a30']],
    lanes: ['vines', ['#3e8a40', '#7cc860', '#6a4a2c']],
    saumarez: ['roots', ['#8a6a44', '#c09a6c', '#5a4028']],
    bays: ['kelp', ['#6a5a2a', '#a8904a', '#3e3418']]
  };
  /* The light follows the sun round the island: low and rosy over the
     harbour, clean and white on the frost and at noon, honey-gold in the
     lanes and the park, and orange at sunset, with the first hint of dusk
     laid over the bays. */
  var LIGHT = {
    stpeterport: { rays: { col: '#ffdcb4', a: 0.36 }, motes: '#fff2e0' },
    candie: { rays: { col: '#fff6e6', a: 0.32 }, motes: '#ffffff' },
    cornet: { rays: { col: '#ffffff', a: 0.28 }, motes: '#ffffff' },
    lanes: { rays: { col: '#fff0c0', a: 0.38 }, motes: '#fffbe0' },
    saumarez: { rays: { col: '#ffe4a8', a: 0.38 }, motes: '#fff6d8' },
    bays: { dark: { col: '#2c0c34', a: 0.08 }, rays: { col: '#ffae6a', a: 0.44 }, motes: '#ffd8b0' }
  };
  if (A && A.themes) Object.keys(THEMES).forEach(function (k) {
    var th = A.themes[k] = THEMES[k];
    th.tiny = TINY[k]; th.hang = HANG[k]; th.light = LIGHT[k];
  });

  /* ==========================================================================
     SCENERY — what stands on the ground in front of the backdrop, behind
     everything Bonnie touches. Drawn the way creatures6a.js draws its
     scenery: parts lit from the top left (each shade from a five-tone ramp,
     deep to shine), a coloured outline, everything standing on its bottom
     row. Every name starts x1, so none can clash with older scenery.
     ========================================================================== */
  var K = A && A.kit, D = A && A.deco;
  if (K && D) (function () {
    var ell = K.ell, cap = K.cap, limb = K.limb, rrect = K.rrect;
    // creatures.js's palette, copied, so the shared tones (outline, eyes, snow, gold) match exactly
    var PAL = {
      '#': '#1c1428', w: '#ffffff', W: '#dfe2f2', E: '#1d1a3c', G: '#2a2440',
      a: '#3a1e6a', b: '#5a32a0', c: '#7c4ed2', d: '#a47ef0', e: '#e6d8ff',
      f: '#121024', g: '#211d38', h: '#302a50', i: '#4a4278', j: '#8c84c4',
      k: '#8a3a10', l: '#c45a18', m: '#f08a30', n: '#ffb860', o: '#fff0c8',
      p: '#9a3a6a', q: '#d0609a', r: '#f08ac0', s: '#ffb8de', t: '#fff0f8',
      u: '#7a1a24', v: '#b82a34', x: '#e84a4a', y: '#ff8a7a', z: '#ffe0d8',
      A: '#8a5a10', B: '#d09018', C: '#ffc830', D: '#ffe470', F: '#fffbe0',
      H: '#2a6a34', I: '#4ea84a', J: '#8ee070',
      L: '#e6f8ff', M: '#9ad0f0',
      N: '#3a3a50', O: '#5c5c78', P: '#8a8aa8', Q: '#b8b8d0', R: '#f0f0ff',
      S: '#4a2a18', T: '#7a4a28', U: '#a8703c', V: '#d09a5c', X: '#ffe0b0',
      Y: '#ffe8c8', Z: '#e8c8a0',
      1: '#c8d4f0', 2: '#a4b4e0', 3: '#ff9aa8'
    };
    // this file's own ramps, five tones each, on characters from U+0100 on
    var next = 0x100;
    var ramp = function (cols) { var s = ''; cols.forEach(function (c) { var ch = String.fromCharCode(next++); PAL[ch] = c; s += ch; }); return s; };
    var INK = 'fghij', SNOW = '21WwR', RED = 'uvxyz', GOLD = 'ABCDF', WOOD = 'STUVX';
    var CAST = ramp(['#0c0e18', '#181c2c', '#2a3046', '#465072', '#8290b8']);   // black cast iron, a blue sheen
    var PINE = ramp(['#0a281a', '#14442e', '#206442', '#388a58', '#7ac48e']);   // a Christmas tree's fir
    var HOLLY = ramp(['#061e0e', '#0c3418', '#185224', '#2c7838', '#86c896']);  // glossy holly
    var IVY = ramp(['#0e2a16', '#1a4422', '#2a6432', '#4a8a48', '#9cc890']);
    var FERN = ramp(['#14361a', '#245a26', '#3a8432', '#64b048', '#b8e486']);
    var BLUE = ramp(['#14306a', '#2050a8', '#3a7ade', '#7ab0f4', '#d4e8ff']);   // a bauble, a present
    var GRAN = ramp(['#4a4448', '#746c6c', '#a09690', '#c8beb4', '#ece4da']);   // grey island granite
    var PINKG = ramp(['#6a3230', '#a4564c', '#d08672', '#eeb29c', '#fde0d0']);  // Cobo's rose-red granite
    var STONE = ramp(['#7a7468', '#a8a092', '#cec6b6', '#e8e2d4', '#fbf8f0']);  // pale carved stone
    var FROST = ramp(['#8aa8c0', '#b8d0e0', '#dceaf4', '#f2f8fc', '#ffffff']);
    var BUOY = ramp(['#8a2a04', '#c84a0c', '#f07a1c', '#ffa850', '#ffd8a8']);   // lifebuoy and float orange
    var NET = ramp(['#1a3640', '#2a5662', '#44808e', '#74aab6', '#c0e2ea']);    // a pot's blue-green netting
    var ROPE = ramp(['#6a4a22', '#9a7438', '#c4a060', '#e2c88c', '#fbecc4']);
    var CHURN = ramp(['#565e6a', '#8a929e', '#b8c0cc', '#dce2ea', '#ffffff']);  // galvanised
    var TERRA = ramp(['#5a2210', '#8e3c1e', '#c0602e', '#e08a52', '#f8c49a']);  // flower-pot terracotta
    var BARK = ramp(['#2e1c12', '#4a3020', '#6a4a32', '#8e6a4a', '#b8946c']);
    var GREYW = ramp(['#4a443c', '#706a5e', '#9a9282', '#c4bca8', '#e8e2d0']);  // gate wood gone silver
    var KELP = ramp(['#1e1a08', '#3a3410', '#5c5418', '#8a7e2a', '#c4b85a']);   // vraic, washed up
    var LAMP = ramp(['#8a7a58', '#c8b888', '#ece0b8', '#fff4d8', '#ffffff']);   // lamp glass by day
    var GLOW = ramp(['#c86a10', '#f0a028', '#ffcc48', '#ffe88a', '#fffbe0']);   // warm light
    var ROBIN = ramp(['#8a2a10', '#c84a1c', '#f0743a', '#ffa070', '#ffd0b0']);  // a robin's breast
    var BROWN = ramp(['#3a2414', '#5c3a20', '#86583a', '#ae8058', '#d8b088']);  // and his back
    var MOSS = ramp(['#3a4430', '#56643e', '#76885a', '#9cae7e', '#d0dcb4']);

    // a round shape lit from the top left and a little in front
    var orb = function (cx, cy, rx, ry, t) {
      return function (x, y) {
        var dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, n = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
        var i = -0.48 * dx - 0.58 * dy + 0.66 * n;
        return i > 0.9 ? t[4] : i > 0.6 ? t[3] : i > 0.22 ? t[2] : i > -0.12 ? t[1] : t[0];
      };
    };
    var P = function (c, f, tex, line) { return { c: c, f: f, tex: tex, line: line || null }; };
    var O = function (cx, cy, rx, ry, t, line) { return P(t[2], ell(cx, cy, rx, ry), orb(cx, cy, rx, ry, t), line); };
    var or = function () { var fs = arguments; return function (x, y) { for (var i = 0; i < fs.length; i++) if (fs[i](x, y)) return true; return false; }; };
    var but = function (a, b) { return function (x, y) { return a(x, y) && !b(x, y); }; };
    var tri = function (ax, ay, bx, by, cx, cy) {
      return function (x, y) {
        var s1 = (x - bx) * (ay - by) - (ax - bx) * (y - by), s2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy), s3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay);
        return !((s1 < 0 || s2 < 0 || s3 < 0) && (s1 > 0 || s2 > 0 || s3 > 0));
      };
    };
    // a tone k steps lighter (or darker, k < 0) along its ramp
    var step = function (t, ch, k) { var i = t.indexOf(ch); return i < 0 ? ch : t.charAt(Math.max(0, Math.min(t.length - 1, i + k))); };
    // a little pseudo-random number for each pixel, 0 to 1 (speckle, leaf shine, crystals in granite)
    var hash = function (x, y, k) { var h = Math.sin(x * 12.9898 + y * 78.233 + (k || 0) * 37.719) * 43758.5453; return h - Math.floor(h); };
    /* Frost: a texture made rimed — white along every top edge where the
       shape meets the air, a paler tone just under it, and a sparkle here
       and there. */
    var rime = function (f, tex, deep) {
      return function (x, y) {
        var X = x + 0.5, Y = y + 0.5;
        if (!f(X, Y - 1)) return hash(x, y, 3) > 0.8 ? 'R' : 'w';
        if (!f(X, Y - 2)) return FROST[3];
        if (deep && !f(X, Y - 3)) return hash(x, y, 4) > 0.5 ? FROST[2] : tex(x, y);
        return hash(x, y, 5) > 0.97 ? 'w' : tex(x, y);
      };
    };
    // a five-pointed star: its points at radius ro, its valleys at ri
    var star = function (cx, cy, ro, ri) {
      return function (x, y) {
        var dx = x - cx, dy = y - cy, r = Math.sqrt(dx * dx + dy * dy), u = ((Math.atan2(dy, dx) + Math.PI / 2) / (Math.PI * 2 / 5) % 1 + 1) % 1;
        return r <= ro - (ro - ri) * Math.min(u, 1 - u) * 2;
      };
    };
    // paint rows anywhere ('.' keeps what's there): sparkles and twinkles that shouldn't get an outline
    var put = function (rows, x, y, list) {
      list.forEach(function (str, i) {
        var Y = y + i;
        if (Y < 0 || Y >= rows.length) return;
        var r = rows[Y].split('');
        for (var k = 0; k < str.length; k++) if (str[k] !== '.' && x + k >= 0 && x + k < r.length) r[x + k] = str[k];
        rows[Y] = r.join('');
      });
    };
    var build = function (W, H, parts, stamps, free) {
      var rows = K.scene(W, H, parts);
      (stamps || []).forEach(function (s) { K.stamp(rows, s[0], s[1], s[2]); });
      (free || []).forEach(function (s) { put(rows, s[0], s[1], s[2]); });
      if (rows.some(function (r) { return r.length !== W; }) && window.console) console.error('backdropx1: ragged sprite', W);
      var sp = BB.sprHi(rows, PAL, 'shade');
      sp.noLight = 'all';
      return sp;
    };
    // a spiky clump of holly: overlapping leafy balls whose edges prickle
    var prickly = function (cx, cy, rx, ry, n, ph) {
      return function (x, y) { var dx = (x - cx) / rx, dy = (y - cy) / ry; return Math.sqrt(dx * dx + dy * dy) < 1 + 0.13 * Math.sin(Math.atan2(dy, dx) * n + ph); };
    };
    var hollyTex = function (cx, cy, rx, ry, k) {
      var lit = orb(cx - rx * 0.3, cy - ry * 0.4, rx * 1.2, ry * 1.1, HOLLY);
      return function (x, y) {
        var v = lit(x, y), h = hash(x, y, k);
        // each leaf's glossy shine, and the dark between leaves
        return h > 0.86 ? step(HOLLY, v, 2) : h < 0.12 ? step(HOLLY, v, -1) : v;
      };
    };
    // berries: little red balls with a white catchlight, as stamps
    var berries = function (list) { return list.map(function (b) { return [b[0], b[1], [RED[3] + RED[2], RED[2] + RED[1]]]; }); };

    /* ---- the harbour ---- */
    /* A Victorian lamp standard on the quay, black cast iron with a gold
       collar: a fluted post, a glass lantern, and a holly wreath with a red
       bow hung on it for Christmas. */
    D.x1lamppost = build(20, 68, [
      P(CAST[2], or(rrect(8.4, 20, 11.6, 56, 1), rrect(7.2, 30, 12.8, 32.4, 0.8), rrect(7.2, 47, 12.8, 49.4, 0.8)), function (x, y) {
        // the flutes: a lit groove down the post
        if (y > 20 && y < 55 && x === 9) return CAST[4];
        return orb(8, 30, 4, 40, CAST)(x, y);
      }, CAST[0]),
      P(CAST[2], or(rrect(6, 53, 14, 61, 1.4), rrect(4, 60, 16, 67.6, 1.4)), function (x, y) { return y === 60 || y === 53 ? CAST[3] : orb(6, 54, 10, 14, CAST)(x, y); }, CAST[0]),
      // (no ladder bar across the post: with the lantern on top it would read as a cross)
      O(10, 20.6, 2.2, 1.4, GOLD, GOLD[0]),
      // the lantern: tall panes in a black frame, wider at the top
      P(LAMP[2], function (x, y) { return y > 6.4 && y < 19 && Math.abs(x - 10) < 5.2 - (y - 6.4) * 0.14; }, function (x, y) {
        return x === 7 || x === 12 ? CAST[2] : orb(8, 8, 7, 12, LAMP)(x, y);
      }, CAST[0]),
      P(CAST[2], or(rrect(6, 18.4, 14, 20.4, 0.6), rrect(3.4, 5.4, 16.6, 7.4, 0.6), tri(3.4, 6, 10, 1.8, 16.6, 6)), orb(7, 3, 9, 6, CAST), CAST[0]),
      O(10, 1.6, 1.3, 1.3, GOLD, GOLD[0]),
      // the wreath, and its bow
      P(HOLLY[2], but(ell(10, 37.4, 5.4, 5.4), ell(10, 37.4, 2.4, 2.4)), hollyTex(10, 37.4, 5.4, 5.4, 1), HOLLY[0]),
      P(RED[2], or(ell(8, 42.6, 1.9, 1.3), ell(12, 42.6, 1.9, 1.3), cap(9.4, 43.4, 8, 47.4, 0.7), cap(10.6, 43.4, 12, 47.4, 0.7)), orb(8, 41, 5, 4, RED), RED[0])
    ], berries([[6, 33], [12, 33], [5, 38], [13, 39]]).concat([[9, 42, [RED[1] + RED[1]]]]), [[13, 8, ['w']], [6, 15, [LAMP[4]]]]);

    /* A decorated Christmas tree in a hooped wooden tub: four tiers of fir,
       a gold tinsel garland looping round, baubles in red, gold, blue and
       silver, a gold star on top, and two presents waiting at its foot. */
    D.x1xmastree = (function () {
      var cx = 18, T = [[6, 17, 0.6, 6.6], [12, 27, 3, 10.4], [20, 37, 5, 13.6], [29, 47.4, 7, 16.6]];
      var wid = function (i, y) { var t = T[i]; return y < t[0] || y > t[1] ? -1 : t[2] + (y - t[0]) / (t[1] - t[0]) * (t[3] - t[2]); };
      // each tier's hem scalloped into soft drooping boughs
      var droop = function (x) { return (1 - Math.abs(Math.sin((x - cx) * Math.PI / 5))) * 1.8; };
      var inT = function (i, x, y) { return Math.abs(x - cx) <= wid(i, y) && y <= T[i][1] - droop(x); };
      var tree = function (x, y) { for (var i = 0; i < T.length; i++) if (inT(i, x, y)) return true; return false; };
      var tex = function (x, y) {
        var X = x + 0.5, Y = y + 0.5, i = 0;
        while (i < T.length - 1 && !inT(i, X, Y)) i++;
        // the tinsel, looping across each tier
        var loop = T[i][0] + (T[i][1] - T[i][0]) * 0.62 + Math.pow((X - cx) / 8, 2) * 2;
        if (Math.abs(Y - loop) < 0.55) return (x + y) % 2 ? GOLD[3] : GOLD[2];
        var edge = T[i][1] - droop(X) - Y;
        if (edge < 1.2) return PINE[1];
        if (hash(x, y, 2) > 0.85) return PINE[1];
        return X < cx - 2 - (Y - T[i][0]) * 0.3 ? PINE[3] : X < cx + 4 ? PINE[2] : PINE[1];
      };
      var parts = [
        // the tub, with its iron hoops
        P(WOOD[2], or(rrect(11, 46.4, 25, 56, 1.2), rrect(10, 46, 26, 48.4, 0.8)), function (x, y) {
          if (y === 50 || y === 54) return CAST[2];
          if ((x - 11) % 3 === 0) return WOOD[1];
          return orb(13, 46, 14, 12, WOOD)(x, y);
        }, WOOD[0]),
        P(PINE[2], tree, tex, PINE[0])
      ];
      // baubles
      [[13, 21, RED], [22, 24, GOLD], [16.6, 31, BLUE], [26, 34, RED], [9, 41, GOLD], [21, 43, SNOW], [12, 32, SNOW], [29, 44.6, BLUE]].forEach(function (b) {
        parts.push(O(b[0], b[1], 1.6, 1.6, b[2], b[2][0]));
      });
      // the star, and the presents
      parts.push(P(GOLD[3], star(cx, 4.8, 4.6, 1.9), orb(17, 3, 5, 5, GOLD), GOLD[0]));
      parts.push(P(RED[2], rrect(1.4, 49, 10.6, 56, 0.8), function (x, y) { return x === 5 || x === 6 ? GOLD[3] : y === 49 ? RED[3] : orb(3, 49, 9, 8, RED)(x, y); }, RED[0]));
      parts.push(P(GOLD[3], or(ell(4.6, 48, 1.6, 1.1), ell(7.4, 48, 1.6, 1.1)), null, GOLD[1]));
      // (the blue one's ribbon runs one way only, with a bow: tied both ways it would look like a flag)
      parts.push(P(BLUE[2], rrect(26, 51, 34.6, 56, 0.8), function (x, y) { return x === 30 ? 'w' : y === 51 ? BLUE[3] : orb(28, 51, 8, 6, BLUE)(x, y); }, BLUE[0]));
      parts.push(P(SNOW[3], or(ell(29, 50.2, 1.5, 1), ell(31.6, 50.2, 1.5, 1)), null, SNOW[1]));
      return build(36, 56, parts, [[12, 20, ['w']], [21, 23, ['w']], [16, 30, ['w']], [25, 33, ['w']], [8, 40, ['w']], [20, 42, ['w']]], [[13, 0, ['F.......F']], [24, 4, ['F']]]);
    })();

    /* A stack of lobster pots, the hooped kind with blue-green netting over
       a wooden base and a ring for the way in, an orange float tied on top. */
    D.x1lobsterpots = (function () {
      var parts = [];
      var pot = function (cx, base, w, h) {
        var dome = function (x, y) { return y < base - 2.6 && ell(cx, base - 2.6, w / 2, h - 2.6)(x, y); };
        parts.push(P(NET[2], dome, function (x, y) {
          var X = x + 0.5;
          // the hoops arching over, and the mesh between them
          if (Math.abs(X - cx) < 0.6 || Math.abs(Math.abs(X - cx) - w * 0.3) < 0.5) return WOOD[2];
          var v = orb(cx - w * 0.2, base - h * 0.8, w * 0.7, h, NET)(x, y);
          if ((x + y) % 3 === 0 || (x - y + 99) % 3 === 0) return step(NET, v, 1);
          return step(NET, v, -1);
        }, NET[0]));
        parts.push(P(WOOD[2], rrect(cx - w / 2 - 0.4, base - 3, cx + w / 2 + 0.4, base - 0.2, 0.6), function (x, y) { return y === base - 3 ? WOOD[4] : (x % 4 === 0 ? WOOD[1] : WOOD[3]); }, WOOD[0]));
        // the way in: a ring of rope in the netting
        parts.push(P(ROPE[2], but(ell(cx - w * 0.15, base - h * 0.5, 2, 1.8), ell(cx - w * 0.15, base - h * 0.5, 0.9, 0.8)), null, ROPE[0]));
      };
      pot(8, 28, 15, 11); pot(23, 28, 14, 10.4); pot(15.4, 18, 13.6, 10);
      parts.push(P(ROPE[2], cap(24, 13, 22, 9, 0.5), null, ROPE[0]));
      parts.push(O(25.6, 7.2, 3, 3, BUOY, BUOY[0]));
      // a coil of rope on the quay beside them
      parts.push(P(ROPE[2], ell(31.6, 25.8, 4, 2), function (x, y) {
        var dx = (x + 0.5 - 31.6) / 4, dy = (y + 0.5 - 25.8) / 2, d = Math.sqrt(dx * dx + dy * dy);
        return d < 0.3 ? ROPE[0] : Math.floor(d * 5) % 2 ? ROPE[1] : (dy < 0 ? ROPE[4] : ROPE[3]);
      }, ROPE[0]));
      return build(36, 28, parts, [[24, 5, ['w']]]);
    })();

    /* A cast-iron bollard on a granite kerbstone: a stout waisted post
       under an overhanging head, a mooring rope looped round it and
       trailing off along the quay. */
    D.x1bollard = build(20, 22, [
      P(GRAN[2], rrect(0.6, 18.4, 19.4, 22, 1), function (x, y) { return y === 18 ? GRAN[4] : hash(x, y, 1) > 0.8 ? GRAN[1] : hash(x, y, 2) > 0.85 ? GRAN[3] : GRAN[2]; }, GRAN[0]),
      P(CAST[2], function (x, y) { if (y < 8 || y > 19) return false; var t = (y - 8) / 11; return Math.abs(x - 9) < 4.6 - Math.sin(t * Math.PI) * 0.8 + t * 0.6; }, orb(7.4, 9, 5, 12, CAST), CAST[0]),
      P(CAST[2], ell(9, 7.6, 6, 3.8), orb(7, 5, 7, 5, CAST), CAST[0]),
      P(ROPE[2], or(cap(4.6, 13.8, 13.6, 12.6, 1.1), limb([[13.6, 12.6], [16.4, 15.4], [19, 17.6]], 0.9)), function (x, y) { return (x + y) % 3 ? ROPE[3] : ROPE[1]; }, ROPE[0])
    ], [[5, 6, [CAST[4] + CAST[4]]]]);

    /* A lifebuoy on its post at the water's edge, orange with white bands,
       under a little pitched cap. */
    D.x1lifebuoy = build(22, 36, [
      P(WOOD[2], or(rrect(9, 5, 13, 35, 0.8), rrect(8, 4, 14, 6.4, 0.8)), function (x, y) { return y < 5 ? WOOD[4] : x === 9 ? WOOD[3] : orb(9, 10, 4, 30, WOOD)(x, y); }, WOOD[0]),
      P(GRAN[2], rrect(6.4, 32.4, 15.6, 36, 0.8), function (x, y) { return y === 32 ? GRAN[4] : GRAN[2]; }, GRAN[0]),
      P(BUOY[2], but(ell(11, 18, 9.4, 9.4), ell(11, 18, 4.4, 4.4)), function (x, y) {
        var dx = x + 0.5 - 11, dy = y + 0.5 - 18, q = (Math.atan2(dy, dx) + Math.PI / 4) / (Math.PI / 2) + 8, fr = q % 1;
        // four white bands where the grab-line is bound on
        if (fr < 0.11 || fr > 0.89) return orb(8, 14, 11, 11, SNOW)(x, y);
        return orb(8, 14, 11, 11, BUOY)(x, y);
      }, BUOY[0])
    ]);

    /* ---- Candie Gardens on a frosty morning ---- */
    /* A stone urn on its pedestal, ivy trailing over the lip, everything
       furred with frost along the top. */
    D.x1urn = (function () {
      var ped = or(rrect(5, 22.4, 17, 33, 0.6), rrect(3.6, 21, 18.4, 23.6, 0.6), rrect(3.6, 31.4, 18.4, 34, 0.6));
      var bowl = or(function (x, y) { return y > 8 && y < 17.4 && Math.abs(x - 11) < 3 + 5.6 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 8) / 9.6, 2))); }, rrect(2.6, 6.6, 19.4, 9.2, 1), rrect(8.6, 17, 13.4, 21.4, 0.6), ell(11, 19.6, 3.6, 1.2));
      var leaves = or(ell(7, 5.4, 4, 2.8), ell(13, 4, 5, 3.4), ell(17, 5.6, 2.8, 2.2), cap(3.4, 8, 1.6, 15.4, 1.1), cap(18.6, 8, 20.4, 12.4, 1));
      return build(22, 34, [
        P(STONE[2], ped, rime(ped, function (x, y) {
          // a sunk panel on the pedestal's face
          if ((x === 7 || x === 15) && y > 24 && y < 30 || (y === 24 || y === 30) && x > 6 && x < 16) return STONE[1];
          return orb(6, 22, 12, 14, STONE)(x, y);
        }), STONE[0]),
        P(STONE[2], bowl, rime(bowl, function (x, y) {
          // fluting round the lower bowl
          if (y > 12 && y < 17 && x % 2 === 0) return step(STONE, orb(7, 8, 10, 10, STONE)(x, y), -1);
          return orb(7, 8, 10, 10, STONE)(x, y);
        }), STONE[0]),
        P(IVY[2], leaves, rime(leaves, function (x, y) { var v = orb(9, 2, 12, 8, IVY)(x, y); return hash(x, y, 7) > 0.8 ? step(IVY, v, 1) : v; }), IVY[0])
      ]);
    })();

    /* A park bench: wooden slats on curly cast-iron ends. frost lays rime
       along every slat; without it, it's the park's bench in the sun. */
    var bench = function (frost) {
      var ends = or(cap(4, 1.4, 4, 15.4, 1.1), cap(28, 1.4, 28, 15.4, 1.1), cap(3.2, 10.4, 1.4, 15.4, 1), cap(28.8, 10.4, 30.6, 15.4, 1), cap(4, 7.6, 1.6, 7.6, 0.9), cap(28, 7.6, 30.4, 7.6, 0.9));
      var slats = or(rrect(1.6, 0.4, 30.4, 4, 1), rrect(1.6, 4.6, 30.4, 8.2, 1), rrect(1, 9.2, 31, 12.8, 1));
      var wood = function (x, y) { if (y === 1 || y === 5 || y === 10) return WOOD[4]; return (x * 5 + y) % 9 === 0 ? WOOD[2] : WOOD[3]; };
      return build(32, 16, [
        P(CAST[2], ends, frost ? rime(ends, orb(3, 3, 6, 12, CAST)) : orb(3, 3, 6, 12, CAST), CAST[0]),
        P(WOOD[2], slats, frost ? rime(slats, wood) : wood, WOOD[0])
      ]);
    };
    D.x1frostbench = bench(true);
    D.x1parkbench = bench(false);

    /* A bay tree clipped into a ball on a bare stem, in a terracotta pot,
       a red ribbon tied round the stem, the ball rimed white on top. */
    D.x1topiary = (function () {
      var ball = ell(9, 9, 7.4, 7.6);
      return build(18, 34, [
        P(BARK[2], rrect(8.2, 14, 9.8, 25.6, 0.6), function (x) { return x === 8 ? BARK[3] : BARK[2]; }, BARK[0]),
        P(TERRA[2], or(rrect(4, 25.6, 14, 33.6, 1.2), rrect(2.8, 24, 15.2, 27, 0.8)), function (x, y) { return y === 24 ? TERRA[4] : y === 27 ? TERRA[1] : orb(5, 25, 10, 9, TERRA)(x, y); }, TERRA[0]),
        P(IVY[2], ball, rime(ball, function (x, y) {
          var v = orb(6, 5, 9, 9, IVY)(x, y), h = hash(x, y, 9);
          // frost lies on the upper leaves, the lower ones in shade stay green
          if (y < 7 && h > 0.45) return FROST[y < 4 ? 3 : 2];
          return h > 0.85 ? step(IVY, v, 1) : h < 0.1 ? step(IVY, v, -1) : v;
        }, true), IVY[0]),
        P(RED[2], or(ell(7.4, 18.6, 1.7, 1.1), ell(10.6, 18.6, 1.7, 1.1), cap(8.6, 19.4, 7.4, 22.4, 0.6), cap(9.4, 19.4, 10.6, 22.4, 0.6)), orb(7, 17, 5, 4, RED), RED[0])
      ]);
    })();

    /* A holly bush, glossy and prickly, heavy with red berries. Frosted, it
       wears white along every top edge, as on the morning in the gardens. */
    var hollyBush = function (frost) {
      var clumps = [[7, 14, 6.6, 5.6], [15, 9, 8, 7.4], [22.6, 13.4, 6, 5.4], [14, 16, 7, 5]];
      var parts = clumps.map(function (c, i) {
        var f = prickly(c[0], c[1], c[2], c[3], 9, i * 1.7);
        var tex = hollyTex(c[0], c[1], c[2], c[3], i + 3);
        return P(HOLLY[2], f, frost ? rime(f, tex) : tex, HOLLY[0]);
      });
      return build(28, 21, parts, berries([[6, 10], [13, 5], [17, 7], [21, 10], [10, 14], [19, 15], [24, 13]]));
    };
    D.x1holly = hollyBush(false);
    D.x1frostholly = hollyBush(true);

    /* A robin on a fence post, round as a bauble: a brown back, an orange
       breast, a cocked tail and a bright eye. He bobs and flicks his tail
       now and then, the way robins do. */
    D.x1robinpost = (function () {
      var bird = function (k) {
        var hy = k === 1 ? -0.8 : 0, ty = k === 2 ? -1.8 : 0;
        return build(16, 26, [
          P(GREYW[2], rrect(4.4, 13.4, 11.6, 26, 0.8), function (x, y) {
            if (y === 13) return GREYW[4];
            if (x === 7 && y > 15 || x === 10 && y > 18 && y < 24) return GREYW[1];
            return hash(x, y, 6) > 0.86 ? MOSS[2] : orb(5, 14, 8, 14, GREYW)(x, y);
          }, GREYW[0]),
          P(INK[1], or(cap(7, 12, 6.6, 13.6, 0.4), cap(9.4, 12, 9.8, 13.6, 0.4)), null, INK[0]),
          // the tail, cocked up behind
          P(BROWN[2], or(tri(11, 9.6, 15.6, 4.4 + ty, 15.2, 7.6 + ty), cap(11, 9.6, 14.6, 6 + ty, 1.1)), orb(12, 5, 4, 5, BROWN), BROWN[0]),
          O(8.6, 9.2, 5, 4, BROWN, BROWN[0]),
          P(BROWN[1], ell(10.4, 8.6, 2.8, 2), orb(9.6, 7.6, 3, 2.4, BROWN), BROWN[0]),
          O(6.2, 5.4 + hy, 3.6, 3.3, BROWN, BROWN[0]),
          // the red-orange face and breast, and the cream belly under it
          P('Y', ell(7.6, 11.6, 3, 1.4), null, BROWN[1]),
          P(ROBIN[2], or(ell(5.6, 9.2, 3.2, 3.2), ell(4.6, 6.6 + hy, 2.4, 2)), orb(4.4, 6.6, 4, 5, ROBIN), ROBIN[1]),
          P(INK[2], tri(0.8, 6 + hy, 2.8, 5 + hy, 2.8, 6.8 + hy), null, INK[0])
        ], [[4, 4 + Math.round(hy), ['Ew']]]);
      };
      var a = bird(0);
      return [a, a, a, bird(1), a, a, bird(2), a];
    })();

    /* ---- Castle Cornet ---- */
    // a pyramid of iron cannonballs on a wooden rack
    D.x1shotpile = (function () {
      var parts = [P(WOOD[2], rrect(0.6, 14.4, 25.4, 18, 0.8), function (x, y) { return y === 14 ? WOOD[4] : x % 6 === 0 ? WOOD[1] : WOOD[3]; }, WOOD[0])];
      [[12.4, [4.4, 9.8, 15.2, 20.6]], [7.8, [7.1, 12.5, 17.9]], [3.2, [9.8, 15.2]]].forEach(function (row) {
        row[1].forEach(function (bx) { parts.push(O(bx + 0.5, row[0], 2.8, 2.8, CAST, CAST[0])); });
      });
      return build(26, 18, parts);
    })();

    /* A tall white flagpole with a long plain pennant streaming out, red
       with a gold edge (no flag with a cross on it: just the pennant). */
    D.x1pennant = [0, 1].map(function (f) {
      var fly = function (x, y) {
        var t = (x - 4.6) / 25;
        if (t < 0 || t > 1) return false;
        var mid = 8 + t * 2.4 + Math.sin(t * 6 + f * 2.2) * (0.6 + t * 1.6), hw = 3.6 * (1 - t * 0.78);
        // the swallowtail: a notch cut into the fly end
        if (t > 0.82 && Math.abs(y - mid) < (t - 0.82) * 6) return false;
        return Math.abs(y - mid) <= hw;
      };
      return build(30, 60, [
        P(SNOW[3], rrect(2.4, 3, 4.6, 58, 0.6), function (x) { return x === 2 ? 'w' : x === 4 ? SNOW[1] : SNOW[2]; }, SNOW[0]),
        O(3.5, 2.2, 1.7, 1.7, GOLD, GOLD[0]),
        P(GRAN[2], rrect(0.4, 55.4, 6.6, 60, 0.6), function (x, y) { return y === 55 ? GRAN[4] : GRAN[2]; }, GRAN[0]),
        P(RED[2], fly, function (x, y) {
          var X = x + 0.5, Y = y + 0.5;
          if (!fly(X, Y - 1)) return GOLD[3];
          if (!fly(X, Y + 1)) return GOLD[2];
          return orb(8, 4, 20, 10, RED)(x, y);
        }, RED[0])
      ]);
    });

    // powder kegs: two barrels and one atop them, with iron hoops
    D.x1barrels = (function () {
      var parts = [];
      var keg = function (cx, top, h, w) {
        var f = function (x, y) { if (y < top || y > top + h) return false; var t = (y - top) / h; return Math.abs(x - cx) < w / 2 - 1 + Math.sin(t * Math.PI) * 1.2; };
        parts.push(P(WOOD[2], f, function (x, y) {
          var t = (y + 0.5 - top) / h;
          if (Math.abs(t - 0.2) < 0.06 || Math.abs(t - 0.8) < 0.06) return CAST[2];
          if ((x - Math.round(cx)) % 3 === 0) return WOOD[1];
          return orb(cx - w * 0.25, top + h * 0.3, w * 0.8, h * 0.8, WOOD)(x, y);
        }, WOOD[0]));
      };
      keg(7.6, 11.4, 12.4, 13); keg(20.4, 11.4, 12.4, 13); keg(14, 0.6, 11.4, 12.4);
      return build(28, 24, parts);
    })();

    /* ---- the green lanes ---- */
    /* A granite churn stand by the farm gate, the way farms left their milk
       out for collection, with two churns waiting on it. */
    D.x1churns = (function () {
      var parts = [
        P(GRAN[2], or(rrect(2.6, 19, 7, 30, 0.6), rrect(25, 19, 29.4, 30, 0.6)), function (x, y) { return hash(x, y, 1) > 0.82 ? GRAN[1] : orb(3, 18, 6, 14, GRAN)(x, y); }, GRAN[0]),
        P(GRAN[2], rrect(0.6, 16.4, 31.4, 19.6, 0.8), function (x, y) { return y === 16 ? GRAN[4] : hash(x, y, 2) > 0.8 ? GRAN[1] : GRAN[3]; }, GRAN[0])
      ];
      // a churn: a broad body, a sloping shoulder up to the neck, and a mushroom lid
      var churn = function (cx, top, s) {
        var bot = 16.6, body = function (x, y) {
          if (y < top + 3 || y > bot) return false;
          var t = y - top - 3, hw = t < 3.2 * s ? (2.4 + t / (3.2 * s) * 2.2) * s : 4.6 * s;
          return Math.abs(x - cx) < hw;
        };
        parts.push(P(CHURN[1], or(cap(cx - 5.4 * s, top + 7, cx - 5.4 * s, top + 9.4, 0.7), cap(cx + 5.4 * s, top + 7, cx + 5.4 * s, top + 9.4, 0.7)), null, CHURN[0]));
        parts.push(P(CHURN[2], body, function (x, y) {
          var Y = y + 0.5;
          // a rolled band round its belly, and one at the foot
          if (Math.abs(Y - (top + 10.6)) < 0.6 || Math.abs(Y - (bot - 1.2)) < 0.5) return CHURN[1];
          return orb(cx - 2.2 * s, top + 5, 6.4 * s, 12, CHURN)(x, y);
        }, CHURN[0]));
        parts.push(P(CHURN[2], or(rrect(cx - 3.2 * s, top + 1.4, cx + 3.2 * s, top + 3.4, 0.8), function (x, y) { return ell(cx, top + 1.6, 2.2 * s, 1.4)(x, y) && y < top + 1.8; }), orb(cx - 1.4, top, 4, 3, CHURN), CHURN[0]));
      };
      churn(9.6, 1.4, 1); churn(22, 2.6, 0.92);
      return build(32, 30, parts);
    })();

    /* A field gate between two square granite gateposts with pointed caps,
       its five bars and brace gone silver with weather, ivy creeping up one
       post. */
    D.x1gate = (function () {
      var posts = or(rrect(0.6, 3.4, 6.6, 26, 0.6), rrect(35.4, 3.4, 41.4, 26, 0.6), tri(0.6, 3.8, 3.6, 0.4, 6.6, 3.8), tri(35.4, 3.8, 38.4, 0.4, 41.4, 3.8));
      var gw = function (x, y) { return (x * 3 + y) % 7 === 0 ? GREYW[2] : GREYW[3]; };
      var parts = [P(GREYW[3], or(cap(9.4, 22, 32.4, 7, 1.2), rrect(6.6, 4.6, 9.4, 25.4, 0.6), rrect(32.6, 4.6, 35.4, 25.4, 0.6)), gw, GREYW[1])];
      [6.4, 10.6, 14.8, 19, 23.2].forEach(function (y) { parts.push(P(GREYW[3], rrect(6.6, y - 1.4, 35.4, y + 1.2, 0.5), function (x, yy) { return yy < y - 0.4 ? GREYW[4] : gw(x, yy); }, GREYW[1])); });
      parts.push(P(GRAN[2], posts, function (x, y) {
        if (y < 4) return (x < 4 || (x > 35 && x < 39)) ? GRAN[4] : GRAN[1];
        return hash(x, y, 3) > 0.84 ? GRAN[1] : hash(x, y, 4) > 0.9 ? GRAN[4] : orb(x < 20 ? 2 : 37, 4, 6, 24, GRAN)(x, y);
      }, GRAN[0]));
      // ivy: little leaves creeping up the left-hand post
      var ivy = or.apply(null, [[1.4, 24.6], [3, 22.4], [1.6, 20], [3.6, 17.6], [1.8, 15], [4.2, 12.6], [2.4, 10.4], [1.4, 7.8]].map(function (l, i) { return ell(l[0], l[1], 1.5 - i * 0.05, 1.2); }));
      parts.push(P(IVY[2], ivy, function (x, y) { var v = orb(1, 8, 5, 20, IVY)(x, y); return hash(x, y, 8) > 0.7 ? step(IVY, v, 1) : v; }, IVY[0]));
      return build(42, 26, parts);
    })();

    /* Ferns at a hedge-bank's foot: fronds arching up and out from one
       crown and drooping at their tips, their leaflets in pairs and
       shorter towards the end, a little ivy round them. */
    D.x1ferns = (function () {
      var parts = [];
      // each frond a curve from the crown, by a control point, to its tip
      [[13, 22, 5, 5, 0.6, 13], [16, 22, 24, 4, 29.4, 12], [14, 22, 10, 1, 6, 4.6], [15, 22, 19, 0.6, 23, 4], [14.6, 22, 14, 3, 15.4, 0.8]].forEach(function (fr, fi) {
        var segs = [], pt = function (t) { var u = 1 - t; return [u * u * fr[0] + 2 * u * t * fr[2] + t * t * fr[4], u * u * fr[1] + 2 * u * t * fr[3] + t * t * fr[5]]; };
        for (var t = 0; t < 1; t += 0.06) {
          var a = pt(t), b = pt(Math.min(1, t + 0.06)), dx = b[0] - a[0], dy = b[1] - a[1], dl = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / dl, ny = dx / dl;
          segs.push(cap(a[0], a[1], b[0], b[1], 0.55));
          if (t > 0.18) {
            var len = 3.4 * (1 - t) + 0.7;
            // leaflets sweep forward along the frond, one to each side
            segs.push(cap(a[0], a[1], a[0] + nx * len + dx / dl * len * 0.5, a[1] + ny * len + dy / dl * len * 0.5, 0.6));
            segs.push(cap(a[0], a[1], a[0] - nx * len + dx / dl * len * 0.5, a[1] - ny * len + dy / dl * len * 0.5, 0.6));
          }
        }
        var lit = orb(8, 2, 22, 22, FERN);
        parts.push(P(FERN[2], function (x, y) { return segs.some(function (sg) { return sg(x, y); }); }, function (x, y) { var v = lit(x, y); return fi > 2 ? step(FERN, v, 1) : hash(x, y, fi) > 0.82 ? step(FERN, v, 1) : v; }, FERN[0]));
      });
      parts.push(P(IVY[2], or(ell(5, 20.6, 4, 1.8), ell(24.4, 20.8, 3.6, 1.6), ell(14.6, 21, 4.4, 1.4)), function (x, y) { var v = orb(4, 18, 24, 5, IVY)(x, y); return hash(x, y, 9) > 0.7 ? step(IVY, v, 1) : v; }, IVY[0]));
      return build(30, 22, parts);
    })();

    /* ---- Saumarez Park ---- */
    /* A stone lantern from the Japanese garden: a stepped base, a post, the
       light box with a little window lit warm, a broad roof whose corners
       curl up, and a round finial. Moss in its joints. */
    D.x1stonelantern = (function () {
      var st = function (x, y) { var v = orb(5, 8, 12, 26, STONE)(x, y); return hash(x, y, 2) > 0.88 ? MOSS[2] : hash(x, y, 3) > 0.92 ? step(STONE, v, -1) : v; };
      return build(20, 30, [
        P(STONE[2], or(rrect(3.4, 26.6, 16.6, 30, 0.8), rrect(8, 18.4, 12, 27, 0.6), rrect(4.6, 16.4, 15.4, 19.2, 0.8), rrect(5.6, 10.4, 14.4, 17, 0.6)), st, STONE[0]),
        P(GLOW[2], rrect(7.6, 11.6, 12.4, 15.6, 0.4), orb(8.6, 12, 5, 4, GLOW), STONE[0]),
        // the roof: broad and low, its eaves sweeping up a little at each corner
        P(STONE[2], function (x, y) { var d = Math.abs(x - 10); return y > 5.4 && d < 3 + (y - 5.4) * 1.4 && y < 10.8 - Math.max(0, d - 6.4) * 0.7; }, st, STONE[0]),
        P(STONE[2], or(ell(10, 3.2, 1.8, 2.2), ell(10, 5.4, 2.8, 1.1)), st, STONE[0])
      ], [], [[9, 12, [GLOW[4]]]]);
    })();

    /* A little tree in the park wrapped in fairy lights: bare winter boughs
       with the lights wound up the trunk and strung out along every branch,
       twinkling. */
    D.x1fairytree = (function () {
      var boughs = [
        [[22, 56], [22, 40], [21, 28]], [[22, 44], [14, 34], [8, 26]], [[22, 42], [30, 33], [36, 25]], [[21, 32], [16, 20], [12, 12]],
        [[21, 30], [27, 19], [32, 11]], [[21, 30], [22, 16], [21, 5]], [[14, 34], [6, 32]], [[30, 33], [38, 32]], [[16, 22], [10, 18]], [[27, 20], [34, 18]], [[22, 18], [17, 9]], [[22, 16], [26, 6]]
      ];
      var w = [2.4, 1.3, 1.3, 1.1, 1.1, 1.1, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7];
      var shape = or.apply(null, boughs.map(function (b, i) { return limb(b, w[i]); }).concat([function (x, y) { return y > 50 && Math.abs(x - 22) < 2.4 + (y - 50) * 0.5; }]));
      var BULB = [GLOW[3], RED[3], BLUE[3], GOLD[3], 'J', 'F'];
      // the lights: every few pixels along each bough, and a spiral up the trunk
      var dots = [];
      boughs.forEach(function (b, i) {
        for (var s = 0; s < b.length - 1; s++) {
          var ax = b[s][0], ay = b[s][1], bx = b[s + 1][0], by = b[s + 1][1], n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 3.2));
          for (var k = i ? 1 : 0; k <= n; k++) dots.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n - (i ? 1 : 0)]);
        }
      });
      for (var yy = 52; yy > 30; yy -= 2.6) dots.push([22 + Math.sin(yy * 1.2) * 2.2, yy]);
      return [0, 1].map(function (f) {
        var free = dots.map(function (d, k) {
          var on = (k + f) % 3 !== 0, c = BULB[(k * 7 + f * 2) % BULB.length];
          return [Math.round(d[0] - 0.5), Math.round(d[1] - 1), on ? [c, c] : ['P']];
        });
        return build(44, 56, [P(BARK[2], shape, function (x, y) { return orb(19, 30, 8, 30, BARK)(x, y); }, BARK[0])], [], free);
      });
    })();

    /* ---- Cobo and Vazon ---- */
    /* Cobo's rocks: rounded boulders of the rose-red granite, speckled with
       their crystals, limpets and barnacles low down, weed round the foot. */
    D.x1pinkrocks = (function () {
      var bs = [[11, 13.4, 9.4, 8.4], [36, 15.4, 7.4, 6.6], [24.4, 10.6, 11.4, 10.4]];
      var parts = bs.map(function (b, i) {
        return P(PINKG[2], ell(b[0], b[1], b[2], b[3]), function (x, y) {
          var v = orb(b[0] - b[2] * 0.25, b[1] - b[3] * 0.4, b[2] * 1.2, b[3] * 1.2, PINKG)(x, y), h = hash(x, y, i);
          if (y > 17 && hash(x, y, i + 9) > 0.7) return h > 0.5 ? 'W' : GRAN[3];
          return h > 0.9 ? step(PINKG, v, 1) : h < 0.1 ? GRAN[1] : h < 0.16 ? step(PINKG, v, -1) : v;
        }, PINKG[0]);
      });
      parts.push(P(KELP[2], function (x, y) { return y > 19.4 - Math.abs(Math.sin(x * 1.3)) * 1.6 && x > 2 && x < 43; }, function (x, y) { return (x + y) % 3 ? KELP[2] : KELP[3]; }, KELP[0]));
      // two limpets, little cones clinging on
      parts.push(P(GRAN[3], or(tri(16, 18.6, 18, 16.4, 20, 18.6), tri(30.4, 18.2, 32, 16.4, 33.6, 18.2)), null, GRAN[1]));
      return build(44, 22, parts);
    })();

    /* A heap of vraic on the sand — the seaweed the tide leaves, that
       Guernsey farmers used to gather for their fields — glossy and
       popping with bladders, a white shell beside it. */
    D.x1vraic = build(34, 11, [
      P(KELP[2], or(ell(9, 10.4, 8.6, 4.4), ell(19, 9.6, 9.6, 5.6), ell(28, 10.6, 5.4, 3.4)), function (x, y) {
        var v = orb(14, 5, 18, 7, KELP)(x, y);
        if (hash(x, y, 1) > 0.86) return KELP[4];
        // long ribbons of oarweed lying across the heap
        return (Math.round(x * 0.5 + y * 1.4) % 4 === 0) ? step(KELP, v, -1) : v;
      }, KELP[0]),
      P(SNOW[3], or(ell(31.4, 9.6, 2, 1.4)), function (x, y) { return x % 2 ? 'w' : SNOW[2]; }, SNOW[1])
    ]);
  })();

  /* ==========================================================================
     THE BACKDROPS
     ========================================================================== */
  var KB = BB.bgKit, GEN = BB.backdropGen;
  if (!KB || !GEN) return;
  var H = KB.H, SW = KB.SW, HP = KB.HP, snap = KB.snap, mix = KB.mix, strip = KB.strip, R = KB.R, disc = KB.disc,
    canopy = KB.canopy, cloud = KB.cloud, land = KB.land, mist = KB.mist, span = KB.span, oval = KB.oval, ring = KB.ring,
    line = KB.line, glow = KB.glow, bird = KB.bird, streak = KB.streak, gull = KB.gull, pad = KB.pad, beam = KB.beam, hline = KB.hline;
  // one turn of a wave across the strip: edges built from whole turns meet at the seam
  var TAU = Math.PI * 2 / SW;
  var wv = function (x, n, ph) { return Math.sin(x * TAU * n + (ph || 0)); };
  var smooth = function (a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  // where x falls along a stretch that starts at x0 and may run on round the strip's seam
  var along = function (x, x0) { return ((x - x0) % SW + SW) % SW; };

  /* ==========================================================================
     SHARED SHAPES
     ========================================================================== */
  /* A heap of granite boulders rising out of the sea or the sand, the
     biggest near the middle, lit on their top left shoulders, weed dark
     round the foot. c = [shade, body, light, weed] */
  var rocks = function (g, x, base, w, h, rnd, c) {
    var n = Math.max(3, Math.round(w / Math.max(2, h * 0.8))), bs = [];
    for (var i = 0; i < n; i++) {
      var u = (i + rnd() * 0.6 - 0.3) / (n - 1) - 0.5, k = Math.cos(u * 2.8) * (0.55 + rnd() * 0.5);
      bs.push([x + u * w * 0.9, Math.max(0.3, k) * h, w / n * (0.8 + rnd() * 0.7), rnd()]);
    }
    bs.sort(function (p, q) { return p[1] - q[1]; });
    bs.forEach(function (p) {
      var rx = p[2] * 0.62, ry = p[1], tilt = (p[3] - 0.5) * 0.6;
      var lx = function (yy) { var t = (base - yy) / ry; return p[0] - rx * Math.sqrt(Math.max(0, 1 - t * t)) * (1 - tilt * t); };
      var rx2 = function (yy) { var t = (base - yy) / ry; return p[0] + rx * Math.sqrt(Math.max(0, 1 - t * t)) * (1 + tilt * t); };
      span(g, base - ry, base, lx, function (yy) { return rx2(yy) + 0.4; }, c[0]);
      span(g, base - ry, base - HP, lx, function (yy) { return p[0] + (rx2(yy) - p[0]) * 0.55; }, c[1]);
      span(g, base - ry, base - ry * 0.55, function (yy) { return lx(yy) + 0.3; }, function (yy) { return p[0] - (p[0] - lx(yy)) * 0.15; }, c[2]);
      if (ry > 3 && p[3] > 0.4) line(g, p[0] - rx * 0.2, base - ry * 0.7, p[0] + rx * 0.3, base - ry * 0.35, HP, c[0]);
    });
    if (c[3]) for (var xx = x - w * 0.5 - 1; xx < x + w * 0.5 + 1; xx += HP) { var wh = 0.8 + Math.max(0, Math.sin(xx * 1.7) + Math.sin(xx * 0.6)) * 0.6; R(g, xx, base - wh, HP, wh, c[3]); }
  };

  /* A run of land along the horizon, column by column from a height
     profile f(t) for t from 0 to 1: lit where it rises to the right (its
     slope faces the top left), in shade where it falls, a bright rim along
     the top. c = [shade, body, rim] */
  var profile = function (g, x0, w, base, f, c) {
    for (var xx = x0; xx < x0 + w; xx += HP) {
      var t = (xx - x0) / w, h = f(t);
      if (h < HP * 0.6) continue;
      var dh = f(Math.min(1, t + HP / w)) - h, top = snap(base - h);
      R(g, xx, top, HP, base - top, dh < -0.02 ? c[0] : c[1]);
      R(g, xx, top, HP, HP, c[2]);
    }
  };
  /* The islands across the water from St Peter Port, as they lie from
     north to south: Herm, long and low, the flat common at its north end
     and its hill to the south; little Jethou just off it, a round hump;
     and Sark beyond them, further and paler, a flat-topped plateau on
     sheer cliffs, with the dip of La Coupée before Little Sark at its
     south end. c1 for Herm and Jethou, c2 for Sark: [shade, body, rim] */
  var islands = function (g, x, sea, s, c1, c2) {
    profile(g, x + 60 * s, 62 * s, sea, function (t) {
      var cl = smooth(0, 0.07, t) * (1 - smooth(0.95, 1, t));
      // La Coupée: a narrow neck before Little Sark, which is a little lower
      var neck = 1 - 0.7 * Math.exp(-Math.pow((t - 0.74) / 0.025, 2));
      return s * (t > 0.74 ? 4.4 : 5.2) * cl * neck * (0.94 + 0.06 * Math.sin(t * 23));
    }, c2);
    profile(g, x + 46 * s, 9 * s, sea, function (t) { return s * 4 * Math.sqrt(Math.max(0, 1 - Math.pow(t * 2 - 1, 2))); }, c1);
    profile(g, x, 42 * s, sea, function (t) {
      // the common: low dunes at the north end, then the hill, then cliffs
      return s * (0.9 + 0.3 * Math.sin(t * 40) * (1 - smooth(0.25, 0.35, t)) + 3.6 * smooth(0.22, 0.45, t)) * smooth(0, 0.04, t) * (1 - smooth(0.9, 1, t));
    }, c1);
  };

  /* Castle Cornet on its rock at the harbour mouth, as the town sees it:
     curtain walls rising in steps up the rock, the lower ward's batteries,
     the citadel at the top with its little tower and a plain pennant, the
     slate roofs of the buildings inside peeping over the walls, and its
     breakwater running out with a small lighthouse at the end.
     C = {rock: [shade, body, light, weed], wall: [shade, body, light], roof: [shade, body], dark, pen} */
  var cornet = function (g, cx, sea, s, C, rnd) {
    var W = C.wall, y;
    // the breakwater, low and long, and its lighthouse
    R(g, cx - 64 * s, sea - 2.2 * s, 46 * s, 2.2 * s, W[1]); R(g, cx - 64 * s, sea - 2.2 * s, 46 * s, HP, W[2]);
    for (var bx = cx - 62 * s; bx < cx - 20 * s; bx += 3 * s) R(g, bx, sea - 1.6 * s, HP, 1.6 * s, W[0]);
    R(g, cx - 66 * s, sea - 7 * s, 3 * s, 7 * s, W[1]); R(g, cx - 64 * s, sea - 7 * s, 1 * s, 7 * s, W[0]);
    R(g, cx - 66.4 * s, sea - 7.6 * s, 3.8 * s, 0.8 * s, W[2]); R(g, cx - 65.6 * s, sea - 9.4 * s, 2.2 * s, 1.8 * s, C.lamp); R(g, cx - 66 * s, sea - 10 * s, 3 * s, 0.7 * s, W[0]);
    rocks(g, cx - 2 * s, sea + 0.5, 70 * s, 8 * s, rnd, C.rock);
    // the walls, in steps; each leans back a little (its batter) and is lit on its left
    var tier = function (x0, x1, h, base) {
      var top = base - h;
      span(g, top, base, function (yy) { return cx + x0 * s - (yy - top) * 0.22; }, function (yy) { return cx + x1 * s + (yy - top) * 0.22; }, W[1]);
      span(g, top, base, function (yy) { return cx + (x1 - 5) * s + (yy - top) * 0.1; }, function (yy) { return cx + x1 * s + (yy - top) * 0.22; }, W[0]);
      span(g, top, base, function (yy) { return cx + x0 * s - (yy - top) * 0.22; }, function (yy) { return cx + x0 * s - (yy - top) * 0.22 + 0.8 * s; }, W[2]);
      R(g, cx + x0 * s - 0.3, top - 0.6 * s, (x1 - x0) * s + 0.6, 0.8 * s, W[2]);
      // the battlements along the top
      for (var mx = cx + x0 * s; mx < cx + x1 * s - 0.5; mx += 2.2 * s) R(g, mx, top - 1.6 * s, 1.1 * s, 1.1 * s, mx > cx + (x1 - 5) * s ? W[0] : W[1]);
      // the stone courses, and embrasures and windows, small and dark
      for (var cy = top + 1.6 * s; cy < base - 0.5; cy += 1.6 * s) for (var sx = cx + x0 * s + rnd() * 2; sx < cx + x1 * s; sx += 2 + rnd() * 3) R(g, sx, cy, 1 + rnd() * 1.5, HP, mix(W[1], W[0], 0.5));
      for (var ex = cx + (x0 + 3) * s; ex < cx + (x1 - 2) * s; ex += (4.5 + rnd() * 3) * s) if (rnd() > 0.35) R(g, ex, top + h * (0.25 + rnd() * 0.3), 0.8 * s, 1 * s, C.dark);
    };
    // a building inside the walls: a gable wall with windows under a slate roof
    var hall = function (x0, w, base, h, rh) {
      R(g, x0, base - h, w, h, W[1]); R(g, x0 + w - 0.8 * s, base - h, 0.8 * s, h, W[0]); R(g, x0, base - h, HP, h, W[2]);
      span(g, base - h - rh, base - h + HP, function (yy) { return x0 - 0.4 + (base - h - yy) * 0.9; }, function (yy) { return x0 + w + 0.4 - (base - h - yy) * 0.9; }, C.roof[1]);
      R(g, x0 - 0.4 + rh * 0.9, base - h - rh, Math.max(HP, w + 0.8 - rh * 1.8), HP, mix(C.roof[1], '#ffffff', 0.3));
      for (var wx = x0 + 1.2 * s; wx < x0 + w - 1.4 * s; wx += 2.4 * s) R(g, wx, base - h + 1.2 * s, 0.9 * s, 1.3 * s, C.dark);
      R(g, x0 + w - 2.6 * s, base - h - rh - 1.6 * s, 1.2 * s, 2.4 * s, W[0]);
    };
    // the citadel at the top: its keep-like tower, and a flagstaff with a plain pennant
    tier(-6, 14, 6 * s, sea - 12 * s);
    R(g, cx + 2 * s, sea - 24.4 * s, 6 * s, 6.4 * s, W[1]); R(g, cx + 6.4 * s, sea - 24.4 * s, 1.6 * s, 6.4 * s, W[0]); R(g, cx + 2 * s, sea - 24.4 * s, 0.7 * s, 6.4 * s, W[2]);
    R(g, cx + 1.6 * s, sea - 25 * s, 6.8 * s, 0.8 * s, W[2]);
    for (y = 0; y < 3; y++) R(g, cx + 2 * s + y * 2.4 * s, sea - 26.2 * s, 1.1 * s, 1.2 * s, W[1]);
    R(g, cx + 3.4 * s, sea - 22.4 * s, 0.9 * s, 1.2 * s, C.dark);
    R(g, cx + 4.8 * s, sea - 33.4 * s, Math.max(HP, 0.4 * s), 8.4 * s, C.pole);
    span(g, sea - 33 * s, sea - 30.8 * s, function () { return cx + 5.2 * s; }, function (yy) { return cx + 5.2 * s + 5.2 * s * (1 - Math.abs(yy - (sea - 31.9 * s)) / (1.1 * s) * 0.7); }, C.pen);
    hall(cx - 16 * s, 10 * s, sea - 9.6 * s, 3.4 * s, 2.6 * s);
    hall(cx + 9 * s, 9 * s, sea - 9.4 * s, 2.8 * s, 2.2 * s);
    tier(-21, 19, 5.4 * s, sea - 5 * s);
    // the lowest walls along the water, with a round bastion at the end
    tier(-33, -4, 5 * s, sea + 0.4); tier(-4, 29, 4.2 * s, sea + 0.4);
    for (y = sea - 7.4 * s; y < sea + 0.4; y += HP) { var bw = 4.2 * s * Math.sqrt(Math.max(0.15, (y - sea + 7.4 * s) / (7.8 * s))) + 1; R(g, cx - 34 * s - bw, y, bw * 2, HP, W[1]); R(g, cx - 34 * s + bw * 0.3, y, bw * 0.7, HP, W[0]); R(g, cx - 34 * s - bw, y, HP, HP, W[2]); }
    for (var mx2 = cx - 38 * s; mx2 < cx - 30 * s; mx2 += 2.2 * s) R(g, mx2, sea - 8.6 * s, 1.1 * s, 1.2 * s, W[1]);
  };

  /* A sailing yacht moored for the winter: a white hull with a stripe, a
     little cabin, a tall mast with its sail furled along the boom under a
     blue cover, the forestay running down to the bow. At Christmas some
     have lights strung up the rigging. c = [hull, hull shade, stripe, mast, cover, line] */
  var yacht = function (g, x, wl, s, c, lights) {
    var L = 13 * s, mh = 30 * s + s * 6;
    span(g, wl - 2.4 * s, wl, function (yy) { return x - L / 2 + (yy - wl + 2.4 * s) * 0.9; }, function (yy) { return x + L / 2 - (yy - wl + 2.4 * s) * 1.6; }, c[0]);
    R(g, x - L / 2 + 1, wl - 1.4 * s, L - 3 * s, HP, c[2]);
    R(g, x - L / 2 + 2 * s, wl - 0.7 * s, L - 4 * s, 0.7 * s, c[1]);
    R(g, x - 2.6 * s, wl - 4 * s, 5.4 * s, 1.6 * s, c[0]); R(g, x - 2.2 * s, wl - 3.6 * s, 3.6 * s, 0.6 * s, c[5]);
    var mx = x - 0.6 * s, top = wl - mh;
    R(g, mx, top, Math.max(HP, 0.5 * s), mh - 2.4 * s, c[3]);
    R(g, mx, wl - 6.6 * s, 6 * s, 1.2 * s, c[4]); R(g, mx, wl - 6.6 * s, 6 * s, HP, mix(c[4], '#ffffff', 0.4));
    line(g, mx, top + 0.5, x - L / 2 + 0.4, wl - 2.4 * s, HP, c[5]);
    line(g, mx + 0.4, top + 0.5, x + L / 2 - 1, wl - 2.4 * s, HP, c[5]);
    if (lights) {
      // a string of bulbs up the forestay and down the backstay
      var BU = ['#ff6a5a', '#ffe070', '#7ad870', '#7ab8ff', '#fff4e0'];
      for (var t = 0.04; t < 1; t += 0.08) {
        R(g, mx + (x - L / 2 + 0.4 - mx) * t, top + 0.5 + (wl - 2.4 * s - top) * t, HP, HP, BU[Math.round(t * 12) % 5]);
        R(g, mx + (x + L / 2 - 1 - mx) * t, top + 0.5 + (wl - 2.4 * s - top) * t, HP, HP, BU[(Math.round(t * 12) + 2) % 5]);
      }
    }
  };
  /* A little fishing boat: a stout painted hull, a white wheelhouse, a
     gantry at the stern, a mast with its light. c = [hull, hull shade, house, house shade, trim] */
  var fisher = function (g, x, wl, s, c) {
    var L = 12 * s;
    span(g, wl - 3 * s, wl, function (yy) { return x - L / 2 + Math.pow((yy - wl + 3 * s) / (3 * s), 2) * 1.6 * s; }, function (yy) { return x + L / 2 - (yy - wl + 3 * s) * 0.5; }, c[0]);
    R(g, x - L / 2, wl - 3 * s, L, HP, c[4]); R(g, x - L / 2 + 1.6 * s, wl - 0.8 * s, L - 3 * s, 0.8 * s, c[1]);
    R(g, x - 1 * s, wl - 7 * s, 4.4 * s, 4 * s, c[2]); R(g, x + 2.6 * s, wl - 7 * s, 0.8 * s, 4 * s, c[3]);
    R(g, x - 0.4 * s, wl - 6.2 * s, 1.2 * s, 1.2 * s, c[1]); R(g, x + 1.2 * s, wl - 6.2 * s, 1.2 * s, 1.2 * s, c[1]);
    R(g, x - 1.4 * s, wl - 7.4 * s, 5.2 * s, 0.6 * s, c[4]);
    R(g, x + 0.8 * s, wl - 12 * s, Math.max(HP, 0.4 * s), 5 * s, c[4]);
    R(g, x - L / 2 + 1 * s, wl - 7 * s, Math.max(HP, 0.4 * s), 4 * s, c[4]); R(g, x - L / 2 + 1 * s, wl - 7 * s, 2.4 * s, Math.max(HP, 0.4 * s), c[4]);
  };
  /* A festoon of Christmas bulbs slung between two points, sagging in the
     middle. Unlit by day they're coloured glass with a glint of the sun;
     lit, each has a little glow round it. */
  var BULBS = ['#e8505a', '#f4c040', '#4cb86a', '#4c8ae8', '#f0f0f0'];
  var festoon = function (g, x0, y0, x1, y1, sag, every, lit, rope) {
    line(g, x0, y0, x1, y1, HP, rope, sag);
    var n = Math.max(2, Math.round(Math.abs(x1 - x0) / every));
    for (var i = 1; i < n; i++) {
      var t = i / n, bx = x0 + (x1 - x0) * t, by = y0 + (y1 - y0) * t + sag * 4 * t * (1 - t) + HP, col = BULBS[i % BULBS.length];
      if (lit) glow(g, bx, by, 2.4, col, 0.9);
      R(g, bx - HP / 2, by, 1, 1, lit ? mix(col, '#ffffff', 0.45) : col);
      if (!lit) R(g, bx - HP / 2, by, HP, HP, mix(col, '#ffffff', 0.7));
    }
  };
  /* A Victorian street lamp, seen from across the harbour: a slim black
     post and its lantern (no ladder bar, which at this size would make a
     cross of it). c = [post, glass] */
  var lampPost = function (g, x, base, h, c) {
    R(g, x - HP / 2, base - h, 1, h, c[0]); R(g, x - 1, base - 1, 2, 1, c[0]);
    R(g, x - 1, base - h - 1.6, 2, 2, c[1]); R(g, x - 1.2, base - h - 2.1, 2.4, HP, c[0]); R(g, x - HP / 2, base - h - 2.6, 1, HP, c[0]);
  };
  /* A cabbage palm, the spiky little tree that grows in gardens all over
     the island: a slim trunk (sometimes forked) and a burst of strap
     leaves at the top. c = [leaf shade, leaf, leaf light, trunk] */
  var cordyline = function (g, x, base, h, c) {
    R(g, x - HP / 2, base - h, 1, h, c[3]);
    for (var a = 0; a < 11; a++) {
      var ang = -Math.PI / 2 + (a - 5) * 0.32, len = h * (0.34 + (a % 3) * 0.05), droop = Math.abs(a - 5) * 0.22;
      for (var t = 0; t < 1; t += 0.1) R(g, x + Math.cos(ang) * len * t, base - h + Math.sin(ang) * len * t + t * t * droop * len, HP, HP, a < 4 ? c[2] : a > 7 ? c[0] : c[1]);
    }
  };
  /* A bare winter tree: a trunk forking into boughs that fork again into
     twigs, each thinner than the last, lit on the left. c = [shade, body, light] */
  var bare = function (g, x, y, len, ang, w, depth, c, rnd, tips) {
    var n = Math.max(2, Math.ceil(len / HP)), px = x, py = y;
    for (var i = 0; i <= n; i++) {
      var t = i / n, ww = Math.max(HP, w * (1 - 0.55 * t));
      R(g, px - ww / 2, py - ww / 2, ww, ww, c[1]);
      if (ww > 1) { R(g, px - ww / 2, py - ww / 2, HP, ww, c[2]); R(g, px + ww / 2 - HP, py - ww / 2, HP, ww, c[0]); }
      px += Math.cos(ang) * len / n; py += Math.sin(ang) * len / n;
      ang += Math.sin(i * 1.3 + x) * 0.03;
    }
    if (depth <= 0) { if (tips) R(g, px - HP / 2, py - HP / 2, HP, HP, tips); return; }
    var kids = depth > 1 ? 3 : 2;
    for (var k = 0; k < kids; k++) {
      var f = 0.45 + k * 0.22 + rnd() * 0.1, sx = x + (px - x) * f, sy = y + (py - y) * f;
      bare(g, sx, sy, len * (0.55 + rnd() * 0.2), ang + (k % 2 ? 0.55 : -0.55) + (rnd() - 0.5) * 0.4, w * 0.6, depth - 1, c, rnd, tips);
    }
    bare(g, px, py, len * 0.5, ang + (rnd() - 0.5) * 0.5, w * 0.55, depth - 1, c, rnd, tips);
  };

  /* A fir tree for the town's Christmas: tiers of boughs, lit on the left,
     bulbs strung round it, a gold bauble on top. c = [shade, body, light] */
  var fir = function (g, x, base, h, c, lit, rnd) {
    R(g, x - 0.75, base - h * 0.16, 1.5, h * 0.16, '#5a3a28');
    for (var k = 0; k < 4; k++) {
      var t0 = base - h * 0.14 - (k + 1) * h * 0.21, t1 = t0 + h * 0.34, hw = h * (0.36 - k * 0.075);
      span(g, t0, t1, function (yy) { return x - hw * (yy - t0) / (t1 - t0) - 0.4; }, function (yy) { return x + hw * (yy - t0) / (t1 - t0) + 0.4; }, c[0]);
      span(g, t0, t1 - HP, function (yy) { return x - hw * (yy - t0) / (t1 - t0); }, function (yy) { return x + hw * 0.25 * (yy - t0) / (t1 - t0); }, c[1]);
      span(g, t0 + 1, t1 - 1, function (yy) { return x - hw * (yy - t0) / (t1 - t0) + 0.3; }, function (yy) { return x - hw * 0.45 * (yy - t0) / (t1 - t0); }, c[2]);
      for (var b = 0; b < 4 + k * 2; b++) {
        var by = t0 + (t1 - t0) * (0.45 + rnd() * 0.5), bx = x + (rnd() * 2 - 1) * hw * (by - t0) / (t1 - t0) * 0.85, col = BULBS[(b + k) % BULBS.length];
        if (lit) glow(g, bx, by, 2.2, col, 0.8);
        R(g, bx, by, HP, HP, lit ? mix(col, '#ffffff', 0.5) : col);
      }
    }
    // a gold bauble on top (a twinkle drawn as crossed lines would look like a cross)
    var sy = base - h * 0.14 - 4 * h * 0.21 - 1.2;
    if (lit) glow(g, x, sy, 4, '#ffe080', 0.9);
    disc(g, x, sy, 1.2, '#e8a820'); disc(g, x - 0.2, sy - 0.2, 0.8, '#ffd040'); R(g, x - HP, sy - HP, HP, HP, '#fff8d0');
  };

  /* ---- 1 · Harbour Lights ---- */
  /* A town house of St Peter Port, one of the terraces stacked up the hill:
     a rendered front in a soft colour (or bare granite), rows of sash
     windows in white frames, a slate roof with its ridge along the street,
     chimney stacks at its ends with their pots, sometimes a dormer, and now
     and then a wreath on the door. shop gives it a shop front below.
     P = {wall: [shade, body, light], roof: [shade, body, light], chim: [shade, body, light],
          pot, frame, glass, glint, door, granite, wreath, fascia, snow} */
  var house = function (g, x, base, w, h, P, rnd, shop) {
    var top = base - h, rh = Math.min(5, 1.6 + w * 0.2), i, yy;
    // chimney stacks at the gable ends, behind the roof
    [x + 0.3, x + w - 2.8].forEach(function (cx, ci) {
      if (rnd() < (ci ? 0.3 : 0.12)) return;
      var ct = top - rh - 1.5 - rnd() * 2.5;
      R(g, cx, ct, 2.5, top - ct, P.chim[1]); R(g, cx + 1.8, ct, 0.7, top - ct, P.chim[0]); R(g, cx, ct, HP, top - ct, P.chim[2]);
      R(g, cx - 0.3, ct, 3.1, HP, P.chim[2]);
      R(g, cx + 0.2, ct - 1, 0.8, 1, P.pot); R(g, cx + 1.4, ct - 0.8, 0.8, 0.8, P.pot);
      if (P.snow) R(g, cx - 0.3, ct - HP, 3.1, HP, P.snow);
    });
    if (P.gable) {
      // a gable to the street: the wall runs up into a point, a little round window in it
      var gh = w * 0.42;
      span(g, top - gh - 0.6, top + HP, function (yy) { return x + w / 2 - (yy - top + gh + 0.6) / (gh + 0.6) * (w / 2 + 0.6); }, function (yy) { return x + w / 2 + (yy - top + gh + 0.6) / (gh + 0.6) * (w / 2 + 0.6); }, P.roof[1]);
      span(g, top - gh + 0.4, top + HP, function (yy) { return x + w / 2 - (yy - top + gh - 0.4) / (gh - 0.4) * (w / 2 - 0.2); }, function (yy) { return x + w / 2 + (yy - top + gh - 0.4) / (gh - 0.4) * (w / 2 - 0.2); }, P.wall[1]);
      line(g, x - 0.6, top, x + w / 2, top - gh - 0.6, HP, P.roof[2]);
      if (P.snow) line(g, x - 0.4, top - 0.4, x + w / 2, top - gh - 0.8, HP, P.snow);
      R(g, x + w / 2 - 0.8, top - gh * 0.5, 1.6, 1.6, P.frame); R(g, x + w / 2 - 0.4, top - gh * 0.5 + 0.4, 0.8, 0.8, P.glass);
    } else {
      // the roof, slates in courses, its ridge catching the light
      span(g, top - rh, top + HP, function (yy) { return x - 0.4 + (top - yy) * 0.5; }, function (yy) { return x + w + 0.4 - (top - yy) * 0.5; }, P.roof[1]);
      for (yy = top - rh + 1.2; yy < top - HP; yy += 1.2) R(g, x - 0.4 + (top - yy) * 0.5, yy, w + 0.8 - (top - yy), HP, P.roof[0]);
      R(g, x - 0.4 + rh * 0.5, top - rh, w + 0.8 - rh, HP, P.roof[2]);
      if (P.snow) { R(g, x - 0.4 + rh * 0.5, top - rh, w + 0.8 - rh, 1, P.snow); for (i = 0; i < w; i += 1.5) if (rnd() > 0.4) R(g, x + i, top - rh + 1, HP + rnd(), HP + rnd() * rh * 0.5, P.snow); }
      // a dormer
      if (w > 10 && rnd() > 0.55) { var dx = x + w * (0.3 + rnd() * 0.3); R(g, dx, top - rh * 0.75, 2.6, rh * 0.75, P.wall[1]); R(g, dx - 0.3, top - rh * 0.75 - HP, 3.2, HP, P.roof[2]); R(g, dx + 0.6, top - rh * 0.55, 1.4, 1.4, P.glass); }
    }
    // the walls: the front lit, a shadow down the right and under the eaves; bare granite speckled with its stones
    R(g, x, top, w, h, P.wall[1]); R(g, x + w - 1, top, 1, h, P.wall[0]); R(g, x, top, HP, h, P.wall[2]);
    R(g, x, top, w, HP, P.wall[0]);
    if (P.granite) for (i = 0; i < w * h / 4; i++) R(g, x + 0.5 + rnd() * (w - 1.5), top + 1 + rnd() * (h - 1.5), 0.8 + rnd(), HP, rnd() > 0.5 ? P.wall[0] : P.wall[2]);
    // sash windows in rows, a few catching the low sun
    var nw = Math.max(1, Math.round((w - 1.5) / 3.4)), sp = (w - 1) / nw, floor = shop ? 5.4 : 4.4;
    for (var wy = top + 1.6; wy < base - floor; wy += 3.8) for (i = 0; i < nw; i++) {
      var wx = x + 0.5 + sp * (i + 0.5) - 1.1, gl = rnd() > 0.86;
      R(g, wx - HP, wy - HP, 2.2 + HP * 2, 2.6 + HP, P.frame);
      R(g, wx, wy, 2.2, 2.6, gl ? P.glint : P.glass);
      R(g, wx, wy + 1.2, 2.2, HP, P.frame);
      if (gl) R(g, wx, wy, 1, HP, '#ffffff');
    }
    if (shop) {
      // a shop front: a painted fascia (no lettering), a big window, a garland along the top
      R(g, x + 0.5, base - 5, w - 1, 1.2, P.fascia); R(g, x + 0.5, base - 5, w - 1, HP, mix(P.fascia, '#ffffff', 0.35));
      R(g, x + 1, base - 3.6, w - 4.4, 3, P.frame); R(g, x + 1.5, base - 3.2, w - 5.4, 2.6, P.glint);
      R(g, x + w - 3, base - 3.8, 1.8, 3.8, P.door);
      for (i = 0; i < w - 1; i += 1) R(g, x + 0.5 + i, base - 5.6 + (i % 3 === 1 ? HP : 0), 1, HP, i % 4 === 2 ? '#e84a4a' : '#2e6a3a');
      return;
    }
    // the front door, with a fanlight over it, and a wreath on some of them
    var ddx = x + (rnd() > 0.5 ? w * 0.22 : w * 0.58);
    R(g, ddx - HP, base - 3.8, 2.2 + HP * 2, 3.8, P.frame); R(g, ddx, base - 3.2, 2.2, 3.2, P.door); R(g, ddx, base - 3.8 + HP, 2.2, HP, P.glass);
    if (P.wreath && rnd() > 0.45) { R(g, ddx + 0.5, base - 2.6, 1.2, 1.2, '#2e6a3a'); R(g, ddx + 0.85, base - 2.25, HP, HP, P.door); R(g, ddx + 0.85, base - 1.6, HP, HP, '#e84a4a'); }
  };
  // St Peter Port's colours: soft painted fronts, and its grey and honey granite
  var TOWN = [['#c4b090', '#f0dcb4', '#fff4dc'], ['#d08c84', '#ecaca0', '#ffd6cc'], ['#7c9cbc', '#a8c4e0', '#dceaf8'], ['#d0a850', '#f0cc74', '#fff0bc'],
    ['#88ac88', '#b4d4ac', '#e2f2da'], ['#d4d0c8', '#f6f4ee', '#ffffff'], ['#a888b4', '#c8acd2', '#ecdcf2'], ['#d08c64', '#eeac80', '#ffd8b8'], ['#7cb0b0', '#a4d0cc', '#d8f0ec']];
  var GRANITE = [['#625c5c', '#8e8682', '#c0b8b0'], ['#7c6c5e', '#a28e7c', '#d4bea8']];
  var SLATES = [['#46506a', '#5c6884', '#9aa4bc'], ['#3a4054', '#50586e', '#848ca4'], ['#565a6a', '#6e7284', '#a8acbc']];

  GEN.stpeterport = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SEA = 94, SX = 64, SY = 78;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };

    /* Christmas Eve, first thing: the sun just up out of the sea, big and
       soft and gold, the sky going from blue overhead through pink to
       peach, long clouds lit rose from beneath, the islands lying low on
       the horizon against the light. One layer, so the sun and its road on
       the water keep together. */
    var far = strip(), g = far.getContext('2d');
    for (y = 30; y < SEA; y += 1) { g.globalAlpha = 0.34 * Math.pow((y - 30) / (SEA - 30), 1.6); R(g, 0, y, SW, 1, '#ffc8a4'); }
    g.globalAlpha = 1;
    [[3.8, 0.05], [2.8, 0.08], [2, 0.12], [1.45, 0.2]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 10 * q[0], '#fff0d0'); });
    g.globalAlpha = 1;
    disc(g, SX, SY, 10, '#ffbc78'); disc(g, SX - 0.6, SY - 0.8, 9, '#ffd49a'); disc(g, SX - 3, SY - 3.2, 4.2, '#fff2d6');
    for (i = 0; i < 11; i++) {
      x = rnd() * SW; var near = Math.abs(((x - SX + SW * 1.5) % SW) - SW / 2) < 80;
      streak(g, x, 16 + rnd() * 56, 40 + rnd() * 90, 1.3 + rnd() * 2, [hm('#a888b8', 0.25), hm(near ? '#ffc8a8' : '#f2b8c8', 0.15), near ? '#fff2cc' : '#ffe2e8'], true);
    }
    [[30, 24, 0.75], [316, 14, 0.9], [446, 34, 0.6]].forEach(function (q) { cloud(g, q[0], q[1], q[2], [hm('#d8a0b8', 0.2), hm('#fff0f0', 0.08), '#ffffff']); });
    // the sea: pale where it meets the sky, deepening towards us, ruffled
    for (y = SEA; y < H; y += HP) { k = (y - SEA) / (H - SEA); R(g, 0, y, SW, HP, k < 0.3 ? mix(hm('#c4b4d0', 0.35), '#88a2cc', k / 0.3) : mix('#88a2cc', '#5678ae', (k - 0.3) / 0.7)); }
    R(g, 0, SEA, SW, HP, hm('#fff0e4', 0.15));
    for (i = 0; i < 140; i++) { x = rnd() * SW; k = Math.pow(rnd(), 1.4); y = SEA + 1 + k * (H - SEA - 2); R(g, x, y, 0.8 + k * 4 * rnd(), HP, rnd() > 0.4 ? hm('#f2e2ee', 0.3) : '#4c6ea6'); }
    // the sun's road on the water
    for (y = SEA + HP; y < H; y += HP) {
      k = (y - SEA) / (H - SEA);
      if (rnd() < 0.3) continue;
      for (j = 0; j < 1 + Math.floor(rnd() * 2); j++) { x = SX + (rnd() + rnd() - 1) * (5 + k * 24); R(g, x - 1, y, 0.6 + rnd() * (1 + k * 4), HP, rnd() > 0.3 ? '#fff0c4' : '#ffc890'); }
    }
    // the islands, low against the light, a gold rim where the sun catches their tops
    islands(g, 226, SEA + 0.5, 1, [hm('#7c7898', 0.42), hm('#8c86a4', 0.42), '#ffe0b8'], [hm('#9690b0', 0.55), hm('#a29cba', 0.55), '#ffe8c8']);
    L.push({ c: far, f: 0.02 });

    /* Out at the harbour mouth, Castle Cornet on its rock, its walls warm
       in the first light, its breakwater and little lighthouse; a fishing
       boat heading out, and the gulls up already. */
    var bl = strip(), b = bl.getContext('2d');
    var hb = function (c, a) { return mix(c, hz, a === undefined ? 0.42 : a); };
    cornet(b, 104, SEA + 1.5, 1, {
      rock: [hb('#4e4a5a', 0.35), hb('#6e6878', 0.35), hb('#ffcca0', 0.25), hb('#3e4a3e', 0.35)], wall: [hb('#6e6a7e', 0.32), hb('#8e8898', 0.32), hb('#ffd8a8', 0.2)],
      roof: [hb('#5a6074'), hb('#747c92')], dark: hb('#4a4450'), lamp: hb('#fff4e0', 0.2), pole: hb('#e8e4e0', 0.3), pen: hb('#d84a40', 0.25)
    }, rnd);
    fisher(b, 210, SEA + 2, 0.7, [hb('#3a6aa8'), hb('#2a4a7a'), hb('#f4f0ea'), hb('#c8c0c0'), hb('#e8e0d8')]);
    for (y = SEA + 2.4; y < SEA + 3.6; y += HP) R(b, 214, y, 10 + (y - SEA) * 4, HP, hb('#e8eef8', 0.3));
    for (i = 0; i < 7; i++) gull(b, 20 + rnd() * 480, 34 + rnd() * 36, 0.45 + rnd() * 0.3, [hb('#ffffff', 0.15), hb('#d0c8d4', 0.3), hb('#5a5a6a', 0.4)]);
    L.push({ c: bl, f: 0.04 });

    /* The town, climbing the hill from the harbour: terrace above terrace
       of tall houses, cream and pink and pale blue and grey granite, all
       warm in the low sun, each with its chimney stacks and its rows of
       windows, gardens and trees and cabbage palms between. Along the
       front, the lamps with Christmas lights strung between them, the
       market's arches, and the town's tree. Off to the left the hill
       comes down to the water, so the castle shows past it. */
    var tw = strip(), t = tw.getContext('2d');
    var X0 = 140, TW = 330, FRONT = 107.5;
    var crest = function (xx) {
      var u = along(xx, X0) / TW;
      if (u > 1) return 999;
      return FRONT - 2 - 72 * smooth(0, 0.3, u) * (1 - smooth(0.72, 1, u)) - (wv(xx, 6, 1) * 2.5 + wv(xx, 15, 2) * 1.2) * smooth(0, 0.1, u) * (1 - smooth(0.9, 1, u));
    };
    var GG = [hm('#4a6448', 0.38), hm('#5e7a5a', 0.38), hm('#9ab888', 0.3)];
    for (x = 0; x < SW; x += HP) { y = crest(x); if (y > 200) continue; R(t, x, y, HP, H - y, GG[1]); R(t, x, y, HP, HP, GG[2]); }
    // trees along the top of the hill
    for (i = 0; i < 70; i++) { x = X0 + rnd() * TW; y = crest(x) + 1.5 + rnd() * 3; if (y > 200) continue; pad(t, x, y, 2.5 + rnd() * 4, 2 + rnd() * 1.6, 1.1, rnd, [hm('#36503c', 0.4), hm('#4a6a4a', 0.38), hm('#88a878', 0.32)]); }
    var pick = function (a) {
      var P = rnd() < 0.28 ? GRANITE[Math.floor(rnd() * 2)] : TOWN[Math.floor(rnd() * TOWN.length)];
      var S = SLATES[Math.floor(rnd() * SLATES.length)];
      return { wall: [hm(P[0], a), hm(P[1], a), hm(P[2], a * 0.8)], roof: [hm(S[0], a), hm(S[1], a), hm(S[2], a)], chim: [hm('#7a6a66', a), hm('#a8968c', a), hm('#d0c0b4', a)], gable: rnd() < 0.22,
        pot: hm('#b8684a', a), frame: hm('#f8f6f0', a * 0.8), glass: hm('#56607a', a), glint: hm('#ffe0a0', a * 0.6), door: hm(['#2a4a6a', '#6a2a2a', '#2a5a3a', '#3a3a4a'][Math.floor(rnd() * 4)], a),
        granite: P === GRANITE[0] || P === GRANITE[1], wreath: true, fascia: hm(['#2a4a6a', '#6a2a3a', '#2a5a4a', '#5a4a7a'][Math.floor(rnd() * 4)], a) };
    };
    // the terraces, from the top of the hill down, each in front of the one above
    for (var yb = 46, row = 0; yb < FRONT - 4; yb += 7.4, row++) {
      var a = 0.3 - row * 0.012;
      for (x = X0 + rnd() * 6; x < X0 + TW - 8;) {
        var w = 8 + Math.floor(rnd() * 4) * 2, hh = 9.5 + rnd() * 4.5;
        if (crest(x + w / 2) > yb - hh * 0.6 || crest(x) > yb - 3 || crest(x + w) > yb - 3) { x += 3; continue; }
        // a garden now and then: a tree, or a cabbage palm
        if (rnd() < 0.12) {
          if (rnd() < 0.5) pad(t, x + 3, yb - 4, 3.5, 3.4, 1.2, rnd, [hm('#36503c', a), hm('#4e6e4c', a), hm('#90b07c', a)]);
          else cordyline(t, x + 3, yb, 9 + rnd() * 4, [hm('#3a5a3a', a), hm('#5a7a48', a), hm('#a8c070', a), hm('#6a5a4a', a)]);
          x += 6; continue;
        }
        house(t, x, yb, w, hh, pick(a), rnd);
        x += w + (rnd() < 0.15 ? 2 : 0);
      }
    }
    // the front: the biggest buildings, shop fronts below, the market's arches among them
    var MX = X0 + 150;
    for (x = X0 + 30; x < X0 + TW - 40;) {
      var fw = 13 + Math.floor(rnd() * 4) * 2, fh = 17 + rnd() * 5;
      if (x < MX + 30 && x + fw > MX) { x = MX + 30; continue; }
      house(t, x, FRONT, fw, fh, pick(0.18), rnd, rnd() > 0.35);
      x += fw;
    }
    // the market hall: a long granite front of tall arches, a wreath in every one
    var MP = { s: [hm('#7c7068', 0.26), hm('#aa9c8c', 0.26), hm('#dccab4', 0.2)] };
    R(t, MX, FRONT - 14, 30, 14, MP.s[1]); R(t, MX + 28.5, FRONT - 14, 1.5, 14, MP.s[0]); R(t, MX, FRONT - 14, HP, 14, MP.s[2]);
    span(t, FRONT - 18, FRONT - 13.6, function (yy) { return MX - 0.5 + (FRONT - 13.6 - yy) * 0.9; }, function (yy) { return MX + 30.5 - (FRONT - 13.6 - yy) * 0.9; }, hm('#646e86', 0.26));
    R(t, MX - 0.5, FRONT - 14, 31, 1, MP.s[2]);
    for (j = 0; j < 5; j++) {
      var ax = MX + 2.4 + j * 5.4;
      R(t, ax, FRONT - 9.4, 3.4, 9.4, hm('#3a3440', 0.26)); disc(t, ax + 1.7, FRONT - 9.4, 1.7, hm('#3a3440', 0.26));
      R(t, ax + 0.4, FRONT - 7.4, 2.6, 7.4, hm('#ffd890', 0.3));
      R(t, ax + 1, FRONT - 10.6, 1.4, 1.4, hm('#2e6a3a', 0.2)); R(t, ax + 1.45, FRONT - 9.6, HP, HP, hm('#e84a4a', 0.2));
    }
    // the road along the front, the harbour wall's coping, its face going down to the water
    R(t, 0, FRONT, SW, 1.5, hm('#8a8490', 0.3));
    for (x = 0; x < SW; x += HP) { y = crest(x) > 200 ? FRONT + 1 : FRONT + 1.5; R(t, x, y, HP, 1, hm('#d8ccbc', 0.25)); R(t, x, y + 1, HP, 6, hm('#8e8478', 0.28)); }
    for (x = 0; x < SW; x += 5 + rnd() * 3) R(t, x, FRONT + 1.6, HP, 1, hm('#9a9088', 0.25));
    for (y = FRONT + 3.5; y < FRONT + 8; y += 2) for (x = (y * 3) % 6; x < SW; x += 4 + rnd() * 3) R(t, x, y, HP, 2, hm('#6e665e', 0.28));
    // the lamps along the front, and the Christmas lights slung between them (not lit yet: it's morning)
    var LX = [];
    for (x = 6; x < SW; x += 23) LX.push(x);
    LX.forEach(function (lx, li) {
      lampPost(t, lx, FRONT + 1.5, 9, [hm('#2a2c3a', 0.25), hm('#fff2d8', 0.2)]);
      var nx = LX[(li + 1) % LX.length] + (li === LX.length - 1 ? SW : 0);
      festoon(t, lx, FRONT - 6.5, nx, FRONT - 6.5, 1.6, 2.2, false, hm('#4a4a5a', 0.3));
    });
    // the town's Christmas tree on the quay
    fir(t, MX + 40, FRONT + 1.5, 22, [hm('#1c3e2a', 0.2), hm('#2a5a3a', 0.2), hm('#5a9a5a', 0.15)], false, rnd);
    L.push({ c: tw, f: 0.085 });

    /* The marina, still in the morning: yachts laid up for the winter in
       their rows along the pontoons, masts all standing, a few with lights
       up their rigging; little fishing boats; the town wobbling in the
       water. */
    var mr = strip(), m = mr.getContext('2d');
    var WT = 112;
    for (y = WT; y < H; y += HP) { k = (y - WT) / (H - WT); R(m, 0, y, SW, HP, mix(hm('#a0b0d0', 0.25), hm('#6e8cbc', 0.15), k)); }
    R(m, 0, WT, SW, HP, hm('#5a6478', 0.25));
    // the town's colours in the water, in wobbling strokes
    for (i = 0; i < 300; i++) { x = rnd() * SW; y = WT + 1 + rnd() * 12; m.globalAlpha = 0.3; R(m, x, y, 1 + rnd() * 3.5, HP, hm(TOWN[i % TOWN.length][1], 0.3)); }
    m.globalAlpha = 1;
    for (i = 0; i < 120; i++) { x = rnd() * SW; y = WT + 2 + rnd() * 20; R(m, x, y, 1 + rnd() * 4, HP, rnd() > 0.5 ? hm('#ffffff', 0.4) : hm('#5a74a4', 0.2)); }
    var HULLS = [['#f8f8f4', '#c8ccd8', '#2a4a8a'], ['#f8f8f4', '#c8ccd8', '#c03a3a'], ['#f4f0e6', '#c8c0b4', '#2a6a5a'], ['#2a3a5a', '#1a2440', '#f4f0e6']];
    var COVERS = ['#2a5aa8', '#3a6ab8', '#8a2a2a', '#2a6a6a'];
    // two rows of boats along their pontoons, the far row smaller
    [[117.5, 0.62, 0.22], [123.5, 0.8, 0.12]].forEach(function (rw, ri) {
      for (x = 4 + rnd() * 8; x < SW - 6; x += 13 * rw[1] + rnd() * 9) {
        var hc = HULLS[Math.floor(rnd() * HULLS.length)], q = function (c) { return hm(c, rw[2]); };
        if (rnd() < 0.18) fisher(m, x, rw[0], rw[1] * 0.9, [q(['#3a6aa8', '#c04a3a', '#2a7a5a', '#e0a030'][Math.floor(rnd() * 4)]), q('#2a3a5a'), q('#f4f0ea'), q('#c8c0c0'), q('#e8e0d8')]);
        else yacht(m, x, rw[0], rw[1] * (0.8 + rnd() * 0.35), [q(hc[0]), q(hc[1]), q(hc[2]), q('#e8e8ee'), q(COVERS[Math.floor(rnd() * 4)]), q('#a8a8b8')], rnd() < 0.25);
        // its reflection, broken by the ripples
        for (y = rw[0] + 0.5; y < rw[0] + 4; y += 1) { m.globalAlpha = 0.25; R(m, x - 4 * rw[1] + Math.sin(y * 3) * 0.5, y, 8 * rw[1], HP, q(hc[0])); }
        m.globalAlpha = 1;
      }
      // the pontoon: weathered boards on floats
      var py = rw[0] + 0.8 + ri * 0.4;
      R(m, 0, py, SW, 1.2, hm('#9a8a78', rw[2])); R(m, 0, py, SW, HP, hm('#d8c8b0', rw[2])); R(m, 0, py + 1.2, SW, HP, hm('#4a4a54', rw[2]));
      for (x = 2; x < SW; x += 14) R(m, x, py - 2.4, 0.8, 2.6, hm('#6a5a4a', rw[2]));
    });
    L.push({ c: mr, f: 0.14 });

    /* In front: the quay itself, big granite coping stones along its edge,
       and the harbour's things on it — lobster pots stacked up, coils of
       rope, fish boxes, an iron mooring ring. Kept low, so the play stays clear. */
    var nr = strip(), n = nr.getContext('2d');
    var NQ = 121;
    R(n, 0, NQ, SW, H - NQ, '#8a8078');
    for (x = 0; x < SW;) {
      var sw2 = 7 + rnd() * 6;
      R(n, x, NQ, sw2, 3, rnd() > 0.5 ? '#b4aaa0' : '#a89e94'); R(n, x, NQ, sw2, HP, '#e4dcd0'); R(n, x + sw2 - HP, NQ, HP, 3, '#6a625c');
      for (j = 0; j < sw2 * 0.6; j++) R(n, x + rnd() * sw2, NQ + 0.6 + rnd() * 2, HP, HP, rnd() > 0.5 ? '#ccc2b6' : '#8a8078');
      x += sw2;
    }
    R(n, 0, NQ + 3, SW, HP, '#5a524c');
    var POTS = ['#2e5a66', '#44808e', '#74aab6'];
    var pot = function (px, base, w) {
      span(n, base - w * 0.6 - 1, base - 1, function (yy) { return px + w / 2 - Math.sqrt(Math.max(0, 1 - Math.pow((base - 1 - yy) / (w * 0.6), 2))) * w / 2; }, function (yy) { return px + w / 2 + Math.sqrt(Math.max(0, 1 - Math.pow((base - 1 - yy) / (w * 0.6), 2))) * w / 2; }, POTS[0]);
      for (var yy = base - w * 0.6; yy < base - 1; yy += 1) for (var xx = px + ((yy * 2) % 2); xx < px + w; xx += 1.5) if (Math.abs(xx - px - w / 2) < Math.sqrt(Math.max(0, 1 - Math.pow((base - 1 - yy) / (w * 0.6), 2))) * w / 2 - 0.5) R(n, xx, yy, HP, HP, POTS[2]);
      R(n, px + w / 2 - HP / 2, base - w * 0.6 - 1, HP, w * 0.6, '#c8a070');
      R(n, px - 0.3, base - 1.5, w + 0.6, 1.5, '#9a7448'); R(n, px - 0.3, base - 1.5, w + 0.6, HP, '#d8b080');
    };
    [[40, 3], [196, 2], [338, 3], [470, 2]].forEach(function (q) {
      for (j = 0; j < q[1]; j++) pot(q[0] + j * 8.4, NQ + 0.5, 8);
      if (q[1] > 2) pot(q[0] + 4.2, NQ + 0.5 - 5.4, 8);
      R(n, q[0] - 3, NQ - 2.4, 2.4, 2.4, '#f07a1c'); R(n, q[0] - 2.6, NQ - 2.2, 0.8, 0.8, '#ffc890');
    });
    // coils of rope, fish boxes, a mooring ring
    [[90, 0], [262, 1], [420, 0]].forEach(function (q) { for (j = 0; j < 3; j++) { oval(n, q[0], NQ - j * 0.8, 3.4 - j * 0.6, 1.2, j % 2 ? '#c4a060' : '#9a7438'); } R(n, q[0] - 0.5, NQ - 2.4, 1, HP, '#e2c88c'); });
    [[128, '#3a6ab8'], [136, '#e0a030'], [130.5, '#3a6ab8'], [300, '#c04a3a'], [308, '#3a6ab8']].forEach(function (q, qi) {
      var by2 = qi === 2 ? NQ - 3.4 : NQ - 0.2;
      R(n, q[0], by2 - 3, 7.6, 3, q[1]); R(n, q[0], by2 - 3, 7.6, HP, mix(q[1], '#ffffff', 0.4)); R(n, q[0] + 6.8, by2 - 3, 0.8, 3, mix(q[1], '#000000', 0.3)); R(n, q[0] + 1, by2 - 2, 2, 1, mix(q[1], '#000000', 0.35));
    });
    [160, 380].forEach(function (rx) { ring(n, rx, NQ + 1.4, 0.8, 1.5, '#3a3440'); R(n, rx - 1, NQ + 0.1, 2, HP, '#2a2430'); });
    L.push({ c: nr, f: 0.24 });
    return L;
  };

  /* ---- 2 · Frosty Morning ---- */
  /* A Victorian glasshouse: a low wall of red brick, glazed sides in white
     glazing bars, a pitched glass roof with a raised lantern along its
     ridge and finials at the ends, the glass holding the pale sky, green
     shapes of the plants inside, frost along the bars.
     c = {brick: [shade, body, light], frame, glass: [shade, body, light], plant, frost} */
  var glasshouse = function (g, x, base, w, h, c, rnd) {
    var eave = base - h * 0.52, ridge = base - h, xx, yy;
    // the plinth wall
    R(g, x, base - 2.4, w, 2.4, c.brick[1]); R(g, x, base - 2.4, w, HP, c.brick[2]); R(g, x + w - 1, base - 2.4, 1, 2.4, c.brick[0]);
    for (xx = x + 1; xx < x + w; xx += 2) R(g, xx, base - 1.2, HP, HP, c.brick[0]);
    // the glass sides, the plants in the warm inside, the glazing bars
    R(g, x, eave, w, base - 2.4 - eave, c.glass[1]);
    for (var i = 0; i < w / 3; i++) { var px = x + 1 + rnd() * (w - 2); pad(g, px, base - 3.4 - rnd() * 2, 1.6 + rnd() * 2, 1.2 + rnd(), 0.7, rnd, [c.plant[0], c.plant[1], c.plant[2]]); }
    for (xx = x; xx <= x + w; xx += 2.5) R(g, xx, eave, HP, base - 2.4 - eave, c.frame);
    R(g, x, eave + (base - 2.4 - eave) * 0.45, w, HP, c.frame);
    // the roof: two slopes of glass up to the ridge, the light catching the near one
    for (yy = ridge; yy < eave; yy += HP) { var k = (yy - ridge) / (eave - ridge); R(g, x - 0.6, yy, w + 1.2, HP, mix(c.glass[2], c.glass[1], k * 0.6)); }
    R(g, x - 0.6, eave - 0.4, w + 1.2, 0.8, c.frame);
    for (xx = x + 1; xx < x + w; xx += 2.5) R(g, xx, ridge, HP, eave - ridge, c.frame);
    // diagonal glints of the sun on the glass
    for (i = 0; i < w / 8; i++) { var gx = x + 2 + rnd() * (w - 6); line(g, gx, eave + 1, gx + 3, base - 4, HP, mix(c.glass[2], '#ffffff', 0.6)); }
    // the lantern along the ridge, and the finials
    R(g, x + w * 0.2, ridge - 2.2, w * 0.6, 2.2, c.glass[1]); for (xx = x + w * 0.2; xx <= x + w * 0.8; xx += 1.5) R(g, xx, ridge - 2.2, HP, 2.2, c.frame);
    R(g, x + w * 0.2 - 0.4, ridge - 2.6, w * 0.6 + 0.8, HP, c.frame); R(g, x + w * 0.2 - 0.4, ridge - 2.9, w * 0.6 + 0.8, HP, c.frost);
    R(g, x - 0.6, ridge - HP, w + 1.2, HP, c.frame); R(g, x - 0.6, ridge - 1, w + 1.2, HP, c.frost);
    [x, x + w].forEach(function (fx) { R(g, fx - HP / 2, ridge - 3.4, 1, 3.4, c.frame); R(g, fx - 0.75, ridge - 4, 1.5, 1, c.frame); });
    // frost along the eaves and the top of the wall
    R(g, x - 0.6, eave - 0.9, w + 1.2, HP, c.frost); R(g, x, base - 2.9, w, HP, c.frost);
  };
  /* A bare tree in the frost: drawn once a half-pixel higher in white, then
     again in its own colours, so every bough and twig has rime along its
     top. */
  var frostTree = function (g, x, base, len, w, depth, c, seed, frost) {
    bare(g, x, base - HP, len, -Math.PI / 2 + 0.05, w, depth, [frost, frost, frost], BB.rng(seed), frost);
    bare(g, x - HP, base - HP, len, -Math.PI / 2 + 0.05, w, depth, [frost, frost, frost], BB.rng(seed), frost);
    bare(g, x, base, len, -Math.PI / 2 + 0.05, w, depth, c, BB.rng(seed), frost);
  };
  // iron railings along the edge of the lawn: a top rail with frost on it, bars with spear tips
  var railings = function (g, x0, x1, y, h, c, frost) {
    for (var x = x0; x < x1; x += 1.5) { R(g, x, y - h, HP, h, c); R(g, x - HP / 2 + HP / 2, y - h - 0.8, HP, 0.8, c); }
    R(g, x0, y - h + 0.6, x1 - x0, HP, c); R(g, x0, y - 1.2, x1 - x0, HP, c);
    R(g, x0, y - h + 0.6 - HP, x1 - x0, HP, frost);
    for (x = x0; x < x1; x += 12) { R(g, x - 0.5, y - h - 1.2, 1.5, h + 1.2, c); R(g, x - 0.5, y - h - 1.6, 1.5, HP, frost); }
  };

  GEN.candie = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SEA = 76, SX = 150, SY = 44;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };
    var FROST = '#f4faff';

    /* A clear, frosty morning seen from up in the gardens: the sun low and
       white-gold in a pale sky, a few frozen wisps of cloud, and the sea
       spread out silver right to the horizon, with Herm, Jethou and Sark
       lying along it. */
    var far = strip(), g = far.getContext('2d');
    for (y = 20; y < SEA; y += 1) { g.globalAlpha = 0.3 * Math.pow((y - 20) / (SEA - 20), 1.4); R(g, 0, y, SW, 1, '#fff2dc'); }
    g.globalAlpha = 1;
    [[4, 0.04], [3, 0.06], [2.1, 0.1], [1.5, 0.16]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 8 * q[0], '#fffaf0'); });
    g.globalAlpha = 1;
    disc(g, SX, SY, 8, '#fff0c8'); disc(g, SX - 0.4, SY - 0.5, 7.2, '#fff8e4'); disc(g, SX - 2.4, SY - 2.6, 3.4, '#ffffff');
    for (i = 0; i < 9; i++) streak(g, rnd() * SW, 10 + rnd() * 50, 50 + rnd() * 90, 1 + rnd() * 1.6, [hm('#b8c8e0', 0.2), hm('#eef4fa', 0.1), '#ffffff']);
    // low banks of cloud along the horizon, touched with the morning's pink
    [[20, 66, 0.5], [300, 68, 0.6], [420, 64, 0.45]].forEach(function (q) { cloud(g, q[0], q[1], q[2], [hm('#e0c4cc', 0.2), hm('#fff4f2', 0.1), '#ffffff']); });
    for (y = SEA; y < H; y += HP) { k = (y - SEA) / (H - SEA); R(g, 0, y, SW, HP, k < 0.35 ? mix(hm('#c8d4e4', 0.3), '#9ab4d4', k / 0.35) : mix('#9ab4d4', '#7a9cc8', (k - 0.35) / 0.65)); }
    R(g, 0, SEA, SW, HP, hm('#ffffff', 0.4));
    for (i = 0; i < 120; i++) { x = rnd() * SW; k = Math.pow(rnd(), 1.3); y = SEA + 1 + k * (H - SEA - 2); R(g, x, y, 0.8 + k * 3 * rnd(), HP, rnd() > 0.4 ? '#f4f8ff' : '#7a98c4'); }
    // the sun's glitter on the sea
    for (y = SEA + HP; y < SEA + 40; y += HP) { if (rnd() < 0.4) continue; x = SX + (rnd() + rnd() - 1) * (8 + (y - SEA) * 0.8); R(g, x - 1, y, 0.6 + rnd() * 2.5, HP, rnd() > 0.3 ? '#ffffff' : '#fff2c8'); }
    islands(g, 40, SEA + 0.4, 1.15, [hm('#8a98b4', 0.45), hm('#a4b0c8', 0.45), hm('#f4f0e8', 0.3)], [hm('#a8b4cc', 0.58), hm('#b8c2d6', 0.58), hm('#f8f4ec', 0.4)]);
    L.push({ c: far, f: 0.015 });

    /* Far below, the harbour: its two long arms reaching out round the
       boats, Castle Cornet small at the end of its breakwater, a ferry
       coming in from the islands, gulls. */
    var hl = strip(), h2 = hl.getContext('2d');
    var hb = function (c, a) { return mix(c, hz, a === undefined ? 0.45 : a); };
    var HY = 84;
    for (y = HY - 2; y < H; y += HP) R(h2, 0, y, SW, HP, mix(hb('#a8bcd4'), hb('#94acc8'), (y - HY) / 40));
    // the harbour's arms: long granite piers
    [[40, 150], [196, 300]].forEach(function (q) { R(h2, q[0], HY - 1.4, q[1] - q[0], 1.4, hb('#c8c0b4')); R(h2, q[0], HY - 1.4, q[1] - q[0], HP, hb('#f4ece0')); R(h2, q[0], HY, q[1] - q[0], HP, hb('#7a7470')); });
    // the boats in the marina between them, in their rows
    for (j = 0; j < 3; j++) for (x = 154 + j; x < 192; x += 2.6 + rnd()) { y = HY + 1.5 + j * 2.2; R(h2, x, y, 1.6, 0.8, hb(rnd() > 0.2 ? '#ffffff' : '#c04a3a', 0.3)); if (rnd() > 0.3) R(h2, x + 0.6, y - 3 - rnd() * 2, HP, 3, hb('#e8eaf0', 0.4)); }
    cornet(h2, 176, HY - 1, 0.5, {
      rock: [hb('#6a6a78'), hb('#8a8a98'), hb('#e8e4e0'), hb('#5a6a5a')], wall: [hb('#8a8690'), hb('#aca6aa'), hb('#f4ece0', 0.3)],
      roof: [hb('#5a6478'), hb('#6e7890')], dark: hb('#4a4a58'), lamp: hb('#ffffff', 0.2), pole: hb('#f0f0f0', 0.3), pen: hb('#d84a40', 0.3)
    }, rnd);
    fisher(h2, 360, HY + 4, 0.5, [hb('#c04a3a'), hb('#8a2a2a'), hb('#f4f0ea'), hb('#c8c0c0'), hb('#e8e0d8')]);
    for (i = 0; i < 6; i++) gull(h2, rnd() * SW, 50 + rnd() * 30, 0.4 + rnd() * 0.2, [hb('#ffffff', 0.2), hb('#d0d4dc', 0.3), hb('#5a5a6a', 0.4)]);
    L.push({ c: hl, f: 0.03 });

    /* The town's rooftops tumbling away below the gardens: slates white
       with frost, chimney pots, smoke going straight up from the morning
       fires into the still air. */
    var rf = strip(), r = rf.getContext('2d');
    var rh = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };
    var rt = function (xx) { return 91 + wv(xx, 2, 0.6) * 2.5 + wv(xx, 5, 2) * 1.2; };
    for (x = 0; x < SW; x += HP) R(r, x, rt(x) + 4, HP, H, rh('#7a7a88'));
    var SMOKE = [];
    for (j = 0; j < 4; j++) for (x = rnd() * 6 + j * 3; x < SW;) {
      var rw = 9 + j * 1.5 + rnd() * 9, ry = rt(x) + j * 5.4 + rnd() * 2, rhh = 3.6 + j * 0.5 + rnd() * 2, frost = rh('#e8f0f8', 0.2);
      var S = [rh(TOWN[Math.floor(rnd() * TOWN.length)][1], 0.3), rh(SLATES[j % 3][1], 0.3), rh(SLATES[j % 3][2], 0.3)];
      // the walls just showing under the eaves, with a window or two
      R(r, x, ry, rw, 4, S[0]); R(r, x + rw - 0.8, ry, 0.8, 4, mix(S[0], '#000000', 0.15));
      for (var wx = x + 1.5; wx < x + rw - 2; wx += 3) R(r, wx, ry + 1.2, 1.2, 1.6, rh('#5a6478'));
      // the roof, frosted: the slates paler towards the ridge where the frost lies thickest
      span(r, ry - rhh, ry + HP, function (yy) { return x - 0.4 + (ry - yy) * 0.6; }, function (yy) { return x + rw + 0.4 - (ry - yy) * 0.6; }, S[1]);
      for (y = ry - rhh; y < ry; y += HP) { k = (ry - y) / rhh; if (k > 0.3) R(r, x - 0.4 + (ry - y) * 0.6, y, rw + 0.8 - (ry - y) * 1.2, HP, mix(S[2], frost, k * 0.8)); }
      for (y = ry - rhh + 1; y < ry; y += 1.2) R(r, x - 0.4 + (ry - y) * 0.6, y, rw + 0.8 - (ry - y) * 1.2, HP, mix(S[1], frost, 0.25));
      R(r, x - 0.4 + rhh * 0.6, ry - rhh, rw + 0.8 - rhh * 1.2, HP, frost);
      if (rnd() > 0.35) {
        var cx = x + rw * (rnd() > 0.5 ? 0.15 : 0.7), ct = ry - rhh - 2.5;
        R(r, cx, ct, 2.4, rhh + 2.5, rh('#a89080')); R(r, cx + 1.7, ct, 0.7, rhh + 2.5, rh('#7a6458')); R(r, cx - 0.2, ct, 2.8, HP, frost);
        R(r, cx + 0.3, ct - 0.9, 0.7, 0.9, rh('#b8684a')); R(r, cx + 1.4, ct - 0.7, 0.7, 0.7, rh('#b8684a'));
        if (rnd() > 0.45) SMOKE.push([cx + 0.7, ct - 1.4]);
      }
      x += rw + rnd() * 2;
    }
    // the smoke from the chimneys, rising straight in the still cold air and spreading
    SMOKE.forEach(function (sm) { for (var q = 0; q < 9; q++) { r.globalAlpha = 0.45 - q * 0.045; disc(r, sm[0] + Math.sin(q * 0.8) * 0.6 + q * 0.25, sm[1] - q * 2.2, 0.8 + q * 0.3, '#f8f8fc'); } r.globalAlpha = 1; });
    mist(r, 104, 22, hz);
    L.push({ c: rf, f: 0.06 });

    /* Candie Gardens: frosted lawns, the old Victorian glasshouses with
       their lanterns and the warm green shapes of the plants inside, great
       old trees bare and rimed white, a holm oak dark among them, clipped
       shrubs, the iron railings along the edge where the gardens look out
       over the town. */
    var gd = strip(), d = gd.getContext('2d');
    var gh = function (c, a) { return mix(c, hz, a === undefined ? 0.2 : a); };
    var gf = function (xx) { return 109 + wv(xx, 2, 1.2) * 1.5 + wv(xx, 7, 0.3) * 0.6; };
    // the trees first, behind everything: bare limes and chestnuts in their frost, and an evergreen oak
    [[24, 30, 3.4, 7001], [186, 36, 4, 7002], [262, 26, 3, 7003], [420, 34, 3.8, 7004]].forEach(function (q) {
      frostTree(d, q[0], gf(q[0]) + 1, q[1], q[2], 3, [gh('#4a3e3a'), gh('#6a5a52'), gh('#9a8a7e')], q[3], gh(FROST, 0.1));
    });
    [[330, 26, 15], [470, 20, 12]].forEach(function (q) {
      R(d, q[0] - 1.2, gf(q[0]) - q[1] * 0.5, 2.4, q[1] * 0.5, gh('#4a3e36'));
      canopy(d, q[0], gf(q[0]) - q[1] * 0.72, q[2], q[1] * 0.38, rnd, [gh('#1e3a2c'), gh('#2c4e38'), gh('#5a7a5a')]);
      for (i = 0; i < 40; i++) { x = q[0] + (rnd() * 2 - 1) * q[2] * 0.9; y = gf(q[0]) - q[1] * 0.72 - q[1] * 0.36 * (0.4 + rnd() * 0.6) * Math.sqrt(Math.max(0, 1 - Math.pow((x - q[0]) / q[2], 2))); R(d, x, y, 1, HP, gh(FROST, 0.1)); }
    });
    land(d, gf, [gh('#a8bcb4'), gh('#cadcd4'), gh('#ffffff')], 6);
    // a gravel path winding across the lawn, and the frost on the grass, sparkling
    for (x = 0; x < SW; x += HP) { y = gf(x) + 4 + wv(x, 3, 1) * 2.5 + wv(x, 7, 0.4); R(d, x, y, HP, 1.6, gh('#c8bcb0')); R(d, x, y, HP, HP, gh('#e8e0d8')); if (Math.sin(x * 2.9) > 0.6) R(d, x, y + 1, HP, HP, gh('#a89c90')); }
    for (i = 0; i < 300; i++) { x = rnd() * SW; y = gf(x) + 1 + rnd() * 30; R(d, x, y, HP + rnd(), HP, rnd() > 0.6 ? '#ffffff' : gh('#9ab0a8')); }
    // the glasshouses
    var GC = { brick: [gh('#7a3a2e'), gh('#a85a44'), gh('#d88a6a')], frame: gh('#f4f4f0'), glass: [gh('#6a8aa0'), gh('#8eaec4'), gh('#c8dcec')], plant: [gh('#1e4a2a'), gh('#2e6a38'), gh('#5a9a50')], frost: gh(FROST, 0.1) };
    glasshouse(d, 62, gf(62) + 1, 46, 22, GC, rnd);
    glasshouse(d, 120, gf(120) + 1, 30, 17, GC, rnd);
    // flowerbeds edged with clipped box, rimed white; clipped yews like cones
    [[200, 30], [370, 40]].forEach(function (q) {
      for (x = q[0]; x < q[0] + q[1]; x += HP) { y = gf(x); R(d, x, y - 2, HP, 2, gh('#2e4a34')); R(d, x, y - 2.4, HP, HP, gh(FROST, 0.1)); }
      for (i = 0; i < 4; i++) { x = q[0] + 5 + i * (q[1] - 10) / 3; y = gf(x); span(d, y - 10, y - 1, function (yy) { return x - (yy - y + 10) * 0.32; }, function (yy) { return x + (yy - y + 10) * 0.32; }, gh('#24402e')); span(d, y - 10, y - 1, function (yy) { return x - (yy - y + 10) * 0.32; }, function (yy) { return x - (yy - y + 10) * 0.08; }, gh('#3a5a40')); line(d, x, y - 10.4, x - 3, y - 1.6, HP, gh(FROST, 0.1)); }
    });
    // a bed of winter heather, pink and white under the frost
    for (i = 0; i < 90; i++) { x = 214 + rnd() * 40; y = gf(x) - rnd() * 2.4; R(d, x, y, 1, 1, rnd() > 0.3 ? gh(['#d870a8', '#f0a0c8', '#b04888'][i % 3]) : gh('#ffffff', 0.1)); }
    // a garden lamp or two, and the railings along the edge of the view
    [176, 300, 456].forEach(function (lx) { lampPost(d, lx, gf(lx) + 1, 10, [gh('#1e2030'), gh('#fff4dc')]); R(d, lx - 1.2, gf(lx) - 11.6, 2.4, HP, gh(FROST, 0.1)); });
    railings(d, 150, 260, gf(200) + 0.5, 4, gh('#1e2030'), gh(FROST, 0.1));
    railings(d, 400, 512 + 20, gf(450) + 0.5, 4, gh('#1e2030'), gh(FROST, 0.1));
    L.push({ c: gd, f: 0.11 });

    /* In front: the lawn's edge, every blade white with frost, a low
       clipped hedge rimed along its top, the winter pansies in the bed
       still bright, and frost sparkling on the air. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 121 + wv(xx, 3, 0.8) * 1.2 + wv(xx, 8, 2) * 0.5; };
    land(n, nf, ['#8aa49a', '#b8ccc4', '#ffffff'], 5);
    for (x = 0; x < SW; x += 0.7) { var gb = nf(x) + 0.5, glen = 1.5 + Math.abs(Math.sin(x * 0.53)) * 2.5; for (var tq = 0; tq < 1; tq += HP / glen) R(n, x + tq * 0.4, gb - tq * glen, HP, HP, tq > 0.5 ? '#ffffff' : '#a8c4b8'); }
    // low hedges of clipped box, their rounded tops thick with frost
    [[30, 112], [300, 392]].forEach(function (q) {
      for (x = q[0]; x < q[1]; x += HP) {
        var e = Math.min(x - q[0], q[1] - x), top = nf(x) - 6.5 + (e < 2.5 ? (2.5 - e) * (2.5 - e) * 0.5 : 0), bot = nf(x) + 1;
        R(n, x, top, HP, bot - top, e < 1.5 ? '#1c3824' : '#2a4a30');
        if (x < q[0] + 2) R(n, x, top, HP, bot - top, '#3e6444');
        for (y = top + 2; y < bot; y += 1) if (Math.sin(x * 3.7 + y * 2.1) > 0.55) R(n, x, y, HP, HP, Math.sin(x + y) > 0 ? '#4a7050' : '#1c3824');
        R(n, x, top, HP, 1.2, '#ffffff'); R(n, x, top + 1.2, HP, HP, '#d4e6f2');
        if (Math.sin(x * 1.9) > 0.3) R(n, x, top + 1.7, HP, HP + Math.abs(Math.sin(x * 0.7)) * 1.4, '#c4d8e4');
      }
    });
    // frosted shrubs, round as puddings, and a holly bright with berries
    [[150, 7, 5], [272, 6, 4.4], [440, 8, 5.4]].forEach(function (q) {
      var sx = q[0], sy = nf(sx) - q[2] * 0.6;
      pad(n, sx, sy, q[1], q[2], 1.6, rnd, ['#1e3a28', '#2e5038', '#567a5a']);
      for (i = 0; i < q[1] * 5; i++) { var fx = sx + (rnd() * 2 - 1) * q[1], fy = sy - q[2] * Math.sqrt(Math.max(0, 1 - Math.pow((fx - sx) / q[1], 2))) * (0.6 + rnd() * 0.5); R(n, fx, fy, 1, HP, '#ffffff'); }
    });
    pad(n, 482, nf(482) - 6, 6, 6, 1.4, rnd, ['#0c3418', '#185224', '#2e7838']);
    for (i = 0; i < 16; i++) { x = 478 + rnd() * 9; y = nf(482) - 10 + rnd() * 8; R(n, x, y, 1, 1, '#e84a4a'); R(n, x, y, HP, HP, '#ffc8c0'); }
    for (x = 476; x < 488; x += HP) { y = nf(482) - 6 - 6 * Math.sqrt(Math.max(0, 1 - Math.pow((x - 482) / 6, 2))); R(n, x, y + 0.6, HP, HP, '#ffffff'); }
    // winter pansies in the beds, purple and yellow
    for (i = 0; i < 40; i++) { x = 160 + rnd() * 110; y = nf(x) - 1 - rnd() * 1.5; R(n, x, y, 1, 1, ['#8a4ac8', '#f4d040', '#ffffff', '#c84a8a'][i % 4]); R(n, x + HP / 2, y + HP / 2, HP, HP, '#3a2a4a'); }
    // frost glittering in the air
    for (i = 0; i < 40; i++) { x = rnd() * SW; y = 10 + rnd() * 100; n.globalAlpha = 0.7; R(n, x, y, HP, HP, '#ffffff'); n.globalAlpha = 1; }
    L.push({ c: nr, f: 0.22 });
    return L;
  };

  /* ---- 3 · The Noon-Day Gun ---- */
  /* St Peter Port seen across the water, small with distance: a hill
     of tiny houses in their soft colours, rows of windows, slate roofs,
     trees between, the harbour wall along its foot.
     f(t) = the hill's height for t from 0 to 1; c = {cols: [[wall, shade]…], roof, win, green: [body, light], wall: [body, light]} */
  var farTown = function (g, x0, w, base, f, c, rnd) {
    var xx, yy;
    for (xx = x0; xx < x0 + w; xx += HP) { var h = f((xx - x0) / w); if (h <= 0) continue; R(g, xx, base - h, HP, h, c.green[0]); R(g, xx, base - h, HP, HP, c.green[1]); }
    for (yy = base - 40; yy < base - 1; yy += 3.2) {
      for (xx = x0 + rnd() * 3; xx < x0 + w - 3;) {
        var hw = 2.6 + rnd() * 3, hh = 2.6 + rnd() * 1.6;
        if (base - f((xx + hw / 2 - x0) / w) > yy - hh * 0.4) { xx += 2; continue; }
        if (rnd() < 0.1) { disc(g, xx + 1.4, yy - 1.4, 1.5, c.green[0]); disc(g, xx + 1, yy - 1.8, 0.7, c.green[1]); xx += 3; continue; }
        var col = c.cols[Math.floor(rnd() * c.cols.length)];
        R(g, xx, yy - hh, hw, hh, col[0]); R(g, xx + hw - HP, yy - hh, HP, hh, col[1]);
        R(g, xx - 0.2, yy - hh - 1, hw + 0.4, 1, c.roof);
        if (rnd() > 0.5) R(g, xx + hw - 1, yy - hh - 1.8, HP, 0.8, c.roof);
        for (var wy = yy - hh + 0.8; wy < yy - 0.6; wy += 1.2) for (var wx = xx + 0.6; wx < xx + hw - 0.6; wx += 1.1) R(g, wx, wy, HP, HP, c.win);
        xx += hw + (rnd() < 0.15 ? 1 : 0);
      }
    }
    R(g, x0, base - 1.4, w, 1.4, c.wall[0]); R(g, x0, base - 1.4, w, HP, c.wall[1]);
  };
  /* A stretch of castle wall: granite in courses, flecked with the gold
     lichen the island's old stones wear, lit on its left, battlements
     along the top. P = {s: [shade, body, light, joint], lichen, merlon} */
  var castleWall = function (g, x0, x1, top, base, P, rnd, merlons, opt) {
    var y, x, ch = opt && opt.big ? 4 : 2.4, sw = opt && opt.big ? 6 : 3;
    R(g, x0, top, x1 - x0, base - top, P.s[1]);
    R(g, x0, top, 1, base - top, P.s[2]); R(g, x1 - 1.5, top, 1.5, base - top, P.s[0]);
    // the courses of stone, each block with its lit top edge
    for (y = top + ch, j = 0; y < base; y += ch, j++) {
      R(g, x0, y, x1 - x0, HP, P.s[3]);
      if (opt && opt.big) R(g, x0, y + HP, x1 - x0, HP, mix(P.s[1], P.s[2], 0.4));
      for (x = x0 + (j % 2) * sw * 0.6 + rnd() * 2; x < x1 - 1; x += sw + rnd() * sw) R(g, x, y - ch, HP, ch, P.s[3]);
    }
    for (var i = 0; i < (x1 - x0) * (base - top) / (opt && opt.big ? 60 : 18); i++) { x = x0 + rnd() * (x1 - x0); y = top + rnd() * (base - top); R(g, x, y, 1 + rnd() * 1.5, HP + rnd() * 0.6, rnd() > 0.45 ? P.lichen : (rnd() > 0.5 ? P.s[2] : P.s[0])); }
    var j;
    if (merlons !== false) for (x = x0; x < x1 - 1; x += 4) { R(g, x, top - 2.4, 2.4, 2.4, P.s[1]); R(g, x, top - 2.4, 2.4, HP, P.s[2]); R(g, x + 2, top - 2.4, HP, 2.4, P.s[0]); }
    R(g, x0, top, x1 - x0, HP, P.s[2]);
    if (!opt) return;
    // its side, going back into shade, so the block stands out from the wall behind it
    if (opt.depth) {
      span(g, top - opt.depth * 0.5, base, function () { return x1; }, function (yy) { return x1 + opt.depth * Math.min(1, (yy - top + opt.depth * 0.5) / opt.depth); }, P.s[0]);
      for (y = top + 2.4; y < base; y += 2.4) R(g, x1, y, opt.depth, HP, mix(P.s[0], '#000000', 0.12));
      if (merlons !== false) R(g, x1, top - 2.4, opt.depth * 0.6, 2.4, P.s[0]);
    }
    // a string course part-way up, and windows: narrow loops high, little square ones lower
    if (opt.course) { R(g, x0 - 0.6, opt.course, x1 - x0 + 1.2, 1.2, P.s[2]); R(g, x0 - 0.6, opt.course + 1.2, x1 - x0 + 1.2, HP, P.s[0]); }
    // (plain slits: the cross-shaped kind would put crosses on the walls)
    if (opt.loops) for (x = x0 + 5; x < x1 - 4; x += opt.loops) { R(g, x, top + 4, 0.8, 3.6, '#3a3038'); R(g, x - 0.3, top + 4, HP, HP, P.s[0]); }
    if (opt.wins) for (x = x0 + 4; x < x1 - 5; x += opt.wins) { y = base - 9; R(g, x - HP, y - HP, 3 + HP * 2, 3.4 + HP * 2, P.s[2]); R(g, x, y, 3, 3.4, '#3a4054'); R(g, x, y, 1.2, 1.2, '#8aa0c0'); }
  };
  // an old cannon on its wooden carriage, its barrel run out over the wall. c = [iron, iron light, wood, wood light]
  var cannon = function (g, x, base, s, c) {
    R(g, x - 3 * s, base - 2.4 * s, 6 * s, 2.4 * s, c[2]); R(g, x - 3 * s, base - 2.4 * s, 6 * s, HP, c[3]);
    disc(g, x - 2 * s, base - 0.9 * s, 1.1 * s, c[0]); disc(g, x + 2 * s, base - 0.9 * s, 1.1 * s, c[0]);
    span(g, base - 4.6 * s, base - 2.2 * s, function () { return x - 3.4 * s; }, function (yy) { return x + 6 * s - Math.abs(yy - (base - 3.4 * s)) * 0.6; }, c[0]);
    R(g, x - 3.4 * s, base - 4.6 * s, 9 * s, HP, c[1]); disc(g, x - 3.6 * s, base - 3.4 * s, 1 * s, c[0]);
    R(g, x + 6 * s - HP, base - 4.4 * s, HP, 2 * s, c[1]);
  };

  GEN.cornet = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SEA = 90, SX = 330, SY = 30;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };

    /* Noon on Christmas Eve: the winter sun as high as it gets, the sky a
       clean bright blue with big white clouds sailing over, and the sea
       sparkling all the way out to Herm and Sark. */
    var far = strip(), g = far.getContext('2d');
    [[3, 0.06], [2.1, 0.1], [1.5, 0.16]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 8 * q[0], '#ffffff'); });
    g.globalAlpha = 1; disc(g, SX, SY, 8, '#fffbe6'); disc(g, SX - 2, SY - 2, 4, '#ffffff');
    var CB = [hm('#b4cce8', 0.15), '#ffffff', '#ffffff'];
    [[20, 40, 1.1], [150, 24, 1.3], [250, 50, 0.9], [400, 30, 1.2], [480, 56, 0.8]].forEach(function (q) { cloud(g, q[0], q[1], q[2], CB); cloud(g, q[0] + 24 * q[2], q[1] + 4, q[2] * 0.7, CB); });
    for (i = 0; i < 6; i++) streak(g, rnd() * SW, 10 + rnd() * 60, 50 + rnd() * 80, 1 + rnd() * 1.5, [hm('#b4d0f0', 0.2), hm('#f0f8ff', 0.1), '#ffffff']);
    for (y = SEA; y < H; y += HP) { k = (y - SEA) / (H - SEA); R(g, 0, y, SW, HP, k < 0.3 ? mix(hm('#8ec0e8', 0.35), '#3a8ad0', k / 0.3) : mix('#3a8ad0', '#2264b0', (k - 0.3) / 0.7)); }
    R(g, 0, SEA, SW, HP, hm('#e8f4ff', 0.2));
    // the sea sparkling: white glints everywhere, thickest under the sun
    for (i = 0; i < 260; i++) { x = rnd() * SW; k = Math.pow(rnd(), 1.2); y = SEA + 1 + k * (H - SEA - 2); var nearS = Math.abs(((x - SX + SW * 1.5) % SW) - SW / 2) < 40; R(g, x, y, 0.6 + k * 2.4 * rnd(), HP, nearS || rnd() > 0.5 ? '#ffffff' : '#7ab8f0'); }
    islands(g, 300, SEA + 0.4, 1.05, [hm('#6a8ab8', 0.42), hm('#86a4cc', 0.42), hm('#e4f0fc', 0.3)], [hm('#88a6cc', 0.55), hm('#9cb6d8', 0.55), hm('#eef6ff', 0.4)]);
    // yachts out on the water, their sails white in the sun
    [[200, 0.4], [262, 0.3], [460, 0.36]].forEach(function (q) { KB.boat(g, q[0], SEA + 3 + q[1] * 6, q[1], [hm('#2a4a7a', 0.3), '#ffffff', hm('#d8e4f0', 0.2), hm('#4a5a7a', 0.3)]); });
    L.push({ c: far, f: 0.015 });

    /* Across the water, the town: St Peter Port on its hill, all its
       colours small and soft, the harbour's arms reaching out, and the
       castle's own breakwater running back to the shore. */
    var tl = strip(), t = tl.getContext('2d');
    var ht = function (c, a) { return mix(c, hz, a === undefined ? 0.56 : a); };
    farTown(t, 10, 250, SEA + 0.5, function (u) { return 44 * smooth(0, 0.3, u) * (1 - smooth(0.72, 1, u)) + 2 + Math.sin(u * 19) * 1.4 * smooth(0.1, 0.3, u) * (1 - smooth(0.7, 0.9, u)); }, {
      cols: TOWN.map(function (q) { return [ht(q[1]), ht(q[0])]; }).concat([[ht('#a49c94'), ht('#7a726c')], [ht('#b0a090'), ht('#86786a')]]),
      roof: ht('#5c6880'), win: ht('#4a5468'), green: [ht('#5e7a5e'), ht('#9ab88a')], wall: [ht('#a49a8e'), ht('#e4dcd0')]
    }, rnd);
    R(t, 260, SEA - 1.2, 70, 1.2, ht('#b0a698')); R(t, 260, SEA - 1.2, 70, HP, ht('#ece4d8'));
    for (i = 0; i < 5; i++) gull(t, 100 + rnd() * 300, 30 + rnd() * 30, 0.5 + rnd() * 0.3, [ht('#ffffff', 0.15), ht('#d0d8e4', 0.3), ht('#5a5a6a', 0.4)]);
    L.push({ c: tl, f: 0.035 });

    /* The castle about us: the citadel's tower with its plain pennant, the
       old granite buildings of the wards under slate roofs with a dusting
       of snow, walls and battlements stepping up and down, all grey-gold
       and freckled with lichen; where the walls drop away the sea shows. */
    var cw = strip(), c = cw.getContext('2d');
    var hc = function (q, a) { return mix(q, hz, a === undefined ? 0.22 : a); };
    var CP = { s: [hc('#706a66'), hc('#a49c90'), hc('#e8dcc4'), hc('#86807a')], lichen: hc('#d8b048') };
    var ROOF = [hc('#3e4458'), hc('#566078'), hc('#8a94ac')], SNOWC = hc('#ffffff', 0.1);
    // a building of the wards: granite walls, a slate roof (snow along its ridge), chimneys, windows, an arched door
    var ward = function (x0, w, base, h, rh, door) {
      castleWall(c, x0, x0 + w, base - h, base, CP, rnd, false);
      span(c, base - h - rh, base - h + HP, function (yy) { return x0 - 0.8 + (base - h - yy) * 0.8; }, function (yy) { return x0 + w + 0.8 - (base - h - yy) * 0.8; }, ROOF[1]);
      for (y = base - h - rh + 1.2; y < base - h; y += 1.2) R(c, x0 - 0.8 + (base - h - y) * 0.8, y, w + 1.6 - (base - h - y) * 1.6, HP, ROOF[0]);
      R(c, x0 - 0.8 + rh * 0.8, base - h - rh, w + 1.6 - rh * 1.6, 1, SNOWC);
      for (x = x0 + 2; x < x0 + w - 4; x += 3 + rnd() * 4) if (rnd() > 0.4) R(c, x, base - h - rh * 0.6 + rnd(), 1.5 + rnd(), HP, SNOWC);
      [x0 + 2, x0 + w - 5].forEach(function (cx) { R(c, cx, base - h - rh - 3, 3, rh + 3, CP.s[1]); R(c, cx + 2.2, base - h - rh - 3, 0.8, rh + 3, CP.s[0]); R(c, cx - 0.3, base - h - rh - 3.4, 3.6, 0.8, SNOWC); });
      for (x = x0 + 3; x < x0 + w - 3; x += 5) for (y = base - h + 2.4; y < base - 5; y += 5) { R(c, x - HP, y - HP, 2.4 + HP * 2, 3 + HP, CP.s[2]); R(c, x, y, 2.4, 3, hc('#3a4458')); R(c, x, y, 1, 1, hc('#8aa0c0')); }
      if (door) { var dx = x0 + w / 2 - 2; R(c, dx, base - 6, 4, 6, hc('#4a3424')); disc(c, dx + 2, base - 6, 2, hc('#4a3424')); R(c, dx + 1.4, base - 4.4, 1.2, 1.2, hc('#2e6a3a')); R(c, dx + 1.85, base - 3.6, HP, HP, hc('#e84a4a')); }
    };
    // the low walls of the lower ward, along the water, behind everything else
    castleWall(c, 0, SW, 104, H, CP, rnd);
    // the citadel: its walls and its tower, the flagstaff and a long plain pennant
    castleWall(c, 30, 76, 82, 104, CP, rnd, true, { depth: 4, loops: 11 });
    castleWall(c, 50, 118, 66, 104, CP, rnd, true, { depth: 5, course: 80, loops: 13, wins: 14 });
    castleWall(c, 66, 92, 44, 66, CP, rnd, true, { depth: 4, loops: 8 });
    for (y = 50; y < 62; y += 6) R(c, 76, y, 2, 3, hc('#3a3440'));
    R(c, 79, 22, 1, 22, hc('#f0f0f0', 0.1)); disc(c, 79.5, 21.6, 0.9, hc('#e8c040', 0.1));
    span(c, 23, 28, function () { return 80; }, function (yy) { return 80 + 16 * (1 - Math.abs(yy - 25.5) / 2.5 * 0.85) + Math.sin(yy) * 0.4; }, hc('#d83a34', 0.1));
    R(c, 80, 23, 14, HP, hc('#f05a4a', 0.1));
    // the wards' buildings
    ward(150, 46, 104, 20, 7, true);
    ward(320, 38, 104, 16, 6, false);
    // a corner turret on the wall: a little round sentry box with a cone of a roof
    castleWall(c, 226, 300, 84, 104, CP, rnd, true, { depth: 3, loops: 12 });
    R(c, 286, 74, 10, 12, CP.s[1]); R(c, 293, 74, 3, 12, CP.s[0]); R(c, 286, 74, 1, 12, CP.s[2]);
    span(c, 66, 74.4, function (yy) { return 291 - (yy - 66) * 0.7; }, function (yy) { return 291 + (yy - 66) * 0.7; }, ROOF[1]); line(c, 291, 66, 285.4, 74, HP, SNOWC);
    R(c, 289.4, 78, 1.4, 2.4, hc('#3a3440'));
    // the gateway arch, its heavy door open
    R(c, 250, 92, 10, 12, hc('#3a3030')); disc(c, 255, 92, 5, hc('#3a3030')); R(c, 251, 94, 8, 10, hc('#5a4434'));
    ward(392, 30, 104, 22, 6, false);
    castleWall(c, 418, 476, 78, 104, CP, rnd, true, { depth: 4, course: 90, loops: 10 });
    L.push({ c: cw, f: 0.07 });

    /* The ramparts we run along: a parapet of big granite blocks with its
       embrasures, the old guns of the battery run out through them, and
       the sea glittering beyond. */
    var rp = strip(), r = rp.getContext('2d');
    var PT = 110;
    var RP = { s: ['#7a7064', '#a49884', '#dccdb0', '#8a7e6e'], lichen: '#d4b05a' };
    castleWall(r, 0, SW, PT, H, RP, rnd, false, { big: true });
    // the embrasures: openings in the parapet every so often, with a gun in some
    for (x = 20; x < SW; x += 46) {
      R(r, x, PT - 5, 34, 5, RP.s[1]); R(r, x, PT - 5, 34, HP, RP.s[2]); R(r, x + 33, PT - 5, 1, 5, RP.s[0]);
      for (j = 0; j < 34; j += 5 + (j % 3)) R(r, x + j, PT - 5, HP, 5, RP.s[3]);
    }
    for (x = 20; x < SW; x += 46) if ((x / 46 | 0) % 2 === 0) cannon(r, x - 6, PT + 0.2, 1, ['#22242e', '#5a6478', '#6a4a30', '#a88050']);
    // snow lying in drifts along the parapet's top, where the sun doesn't reach
    for (x = 0; x < SW; x += HP) if (Math.sin(x * 0.13) + Math.sin(x * 0.41) > 0.9) { var blk = ((x - 20) % 46 + 46) % 46 < 34; R(r, x, blk ? PT - 5.4 : PT - 0.4, HP, 1, '#ffffff'); }
    L.push({ c: rp, f: 0.13 });

    /* In front: the castle's little herb garden by the wall — clipped
       box, rosemary and lavender gone grey-green for the winter — and the
       flagstones' edge. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 0.4) * 0.6; };
    land(n, nf, ['#6a6050', '#8a7e6a', '#d8ccb0'], 3);
    for (x = 0; x < SW;) { var fw2 = 5 + rnd() * 4; R(n, x, nf(x), HP, 4, '#5a5044'); x += fw2; }
    [[30, 40], [180, 30], [340, 50]].forEach(function (q) {
      for (x = q[0]; x < q[0] + q[1]; x += 2.4 + rnd() * 2) pad(n, x, nf(x) - 2, 2.4, 2.2, 0.9, rnd, rnd() > 0.5 ? ['#3a5a3e', '#5a7a58', '#9ab48a'] : ['#5a6a7a', '#7a8a9a', '#b4c0cc']);
      for (i = 0; i < q[1] / 3; i++) { x = q[0] + rnd() * q[1]; R(n, x, nf(x) - 4 - rnd() * 2, HP, 1, '#8a6ac8'); }
    });
    L.push({ c: nr, f: 0.24 });
    return L;
  };

  /* ---- 4 · The Green Lanes ---- */
  /* A Guernsey cow: golden-fawn with white patches, a white face, short
     legs, grazing with her head down or looking up to see who's coming.
     face = which way she faces (1 right, -1 left). c = {coat: [shade, body, light], white, nose} */
  var cow = function (g, x, base, s, face, c, graze, seed) {
    var by = base - 3 * s, hx = x + face * 4.4 * s, hy = by + (graze ? 1.8 : -0.8) * s;
    [-2.6, -1.4, 1.6, 2.6].forEach(function (lx, li) { R(g, x + lx * s - 0.35 * s, by + 0.8 * s, 0.75 * s, 2.2 * s, li % 2 ? c.coat[0] : c.white); });
    oval(g, x + 0.2 * s, by + 0.3 * s, 3.9 * s, 2.1 * s, c.coat[0]);
    oval(g, x, by, 3.8 * s, 1.9 * s, c.coat[1]);
    // her white patches, never the same twice
    var r = BB.rng(seed || Math.round(x * 7));
    for (var p = 0; p < 2; p++) { var px = x + (r() * 2 - 1) * 2.4 * s, py = by + (r() * 2 - 1) * 0.8 * s; oval(g, px, py, (0.9 + r() * 0.8) * s, (0.6 + r() * 0.5) * s, c.white); }
    oval(g, x - face * 0.6 * s, by + 1.4 * s, 2.6 * s, 0.6 * s, c.white);
    oval(g, x - 0.8 * s, by - 1.1 * s, 2.2 * s, 0.5 * s, c.coat[2]);
    // the tail, and the head with its white face and pink nose
    R(g, x - face * 3.9 * s - 0.25 * s, by - 0.4 * s, 0.5 * s, 2.6 * s, c.coat[0]);
    line(g, x + face * 3 * s, by - 0.4 * s, hx, hy, Math.max(HP, 1.4 * s), c.coat[1]);
    oval(g, hx, hy, 1.2 * s, 1 * s, c.coat[1]);
    oval(g, hx + face * 0.4 * s, hy + 0.1 * s, 0.6 * s, 0.9 * s, c.white);
    R(g, hx + face * 0.8 * s - 0.4 * s, hy + 0.5 * s, 0.8 * s, 0.6 * s, c.nose);
    R(g, hx - face * 0.6 * s - 0.4 * s, hy - 1.1 * s, 0.8 * s, 0.5 * s, c.coat[0]);
  };
  /* A granite farmhouse the Guernsey way: a long, low, two-storey front of
     big honey and grey stones, five windows over four and a round-arched
     doorway between, the arch's stones fanned round it; a stack at each
     gable end; and the barn running on beside it under a pantile roof.
     P = {s: [shade, body, light], roof: [shade, body, light], tile: [shade, body], frame, glass, door, smoke, snow} */
  var farmhouse = function (g, x, base, w, h, P, rnd) {
    var top = base - h, rh = h * 0.42, i, y;
    // the barn alongside, lower, pantiles in ripples
    var bw = w * 0.6, bh = h * 0.7, bx = x + w;
    R(g, bx, base - bh, bw, bh, P.s[1]); R(g, bx + bw - 1, base - bh, 1, bh, P.s[0]);
    span(g, base - bh - rh * 0.7, base - bh + HP, function (yy) { return bx - 0.6; }, function (yy) { return bx + bw + 0.6 - (base - bh - yy) * 0.9; }, P.tile[1]);
    for (y = base - bh - rh * 0.7 + 0.8; y < base - bh; y += 1.2) for (var tx = bx; tx < bx + bw - (base - bh - y) * 0.9; tx += 1.4) R(g, tx, y, HP, 1, P.tile[0]);
    R(g, bx + bw * 0.4, base - bh * 0.7, bw * 0.3, bh * 0.7, P.door);
    // the walls of big granite stones
    R(g, x, top, w, h, P.s[1]); R(g, x + w - 1, top, 1, h, P.s[0]); R(g, x, top, HP, h, P.s[2]);
    for (i = 0; i < w * h / 3.5; i++) { var sx = x + 0.5 + rnd() * (w - 1.5), sy = top + 0.6 + rnd() * (h - 1); R(g, sx, sy, 1 + rnd() * 1.4, 0.6 + rnd() * 0.5, rnd() > 0.5 ? P.s[0] : P.s[2]); }
    // the chimney stacks at the gable ends, then the roof
    [x - 0.6, x + w - 3].forEach(function (cx) { R(g, cx, top - rh - 3, 3.6, rh + 3, P.s[1]); R(g, cx + 2.6, top - rh - 3, 1, rh + 3, P.s[0]); R(g, cx - 0.3, top - rh - 3.4, 4.2, 0.8, P.s[2]); if (P.snow) R(g, cx - 0.3, top - rh - 3.8, 4.2, HP, P.snow); });
    span(g, top - rh, top + HP, function (yy) { return x - 0.6 + (top - yy) * 0.3; }, function (yy) { return x + w + 0.6 - (top - yy) * 0.3; }, P.roof[1]);
    for (y = top - rh + 1.2; y < top; y += 1.2) R(g, x - 0.6 + (top - y) * 0.3, y, w + 1.2 - (top - y) * 0.6, HP, P.roof[0]);
    R(g, x - 0.6 + rh * 0.3, top - rh, w + 1.2 - rh * 0.6, HP, P.roof[2]);
    if (P.snow) for (i = 0; i < w; i += 1.2) if (rnd() > 0.35) R(g, x + i, top - rh + HP, 1 + rnd(), HP + rnd() * 1.2, P.snow);
    // smoke from the kitchen fire
    for (i = 0; i < 7; i++) { g.globalAlpha = 0.5 - i * 0.06; disc(g, x + w - 1.2 + Math.sin(i * 0.9) * 1.2 + i * 1.1, top - rh - 5 - i * 2, 0.9 + i * 0.25, P.smoke); }
    g.globalAlpha = 1;
    // five windows over four, the arched door in the middle with its fan of stones
    var win = function (wx, wy) { R(g, wx - HP, wy - HP, 2.4 + HP * 2, 2.8 + HP * 2, P.frame); R(g, wx, wy, 2.4, 2.8, P.glass); R(g, wx, wy + 1.2, 2.4, HP, P.frame); };
    for (i = 0; i < 5; i++) win(x + w * (0.1 + i * 0.19) - 1.2, top + 1.6);
    [0, 1, 3, 4].forEach(function (k) { win(x + w * (0.1 + k * 0.19) - 1.2, top + h * 0.56); });
    var dx = x + w / 2;
    for (var a = Math.PI; a <= Math.PI * 2 + 0.01; a += Math.PI / 6) line(g, dx + Math.cos(a) * 1.6, base - 3.6 + Math.sin(a) * 1.6, dx + Math.cos(a) * 2.6, base - 3.6 + Math.sin(a) * 2.6, HP, P.s[2]);
    R(g, dx - 1.6, base - 3.6, 3.2, 3.6, P.door); disc(g, dx, base - 3.6, 1.6, P.door);
    R(g, dx - 0.6, base - 3, 1.2, 1.2, '#2e6a3a'); R(g, dx - 0.15, base - 2.2, HP, HP, '#e84a4a');
  };
  /* An old vinery — one of the long glasshouses the island grew its
     grapes and tomatoes in — a run of spans side by side, sawtoothed
     ridges catching the sky, white-painted bars, a brick boiler chimney at
     one end. c = {frame, glass: [shade, body, light], wall, brick, plant} */
  var vinery = function (g, x, base, w, h, spans, c, rnd) {
    var sw = w / spans, eave = base - h * 0.55, xx;
    R(g, x + w - 2, base - h * 2.2, 2.4, h * 2.2, c.brick); R(g, x + w - 2.4, base - h * 2.2, 3.2, HP, c.frame);
    for (var k = 0; k < spans; k++) {
      var sx = x + k * sw;
      span(g, base - h, eave, function (yy) { return sx + sw / 2 - (yy - base + h) / (eave - base + h) * sw / 2; }, function (yy) { return sx + sw / 2 + (yy - base + h) / (eave - base + h) * sw / 2; }, c.glass[2]);
      line(g, sx, eave, sx + sw / 2, base - h, HP, c.frame); line(g, sx + sw / 2, base - h, sx + sw, eave, HP, c.frame);
    }
    // the glass sides below the eaves
    R(g, x, eave, w, base - eave, c.glass[1]);
    for (xx = x; xx < x + w; xx += 1.6) { R(g, xx, eave, HP, base - eave, c.frame); if (rnd() > 0.8) R(g, xx + HP, eave + 1, 1, base - eave - 2, c.glass[2]); }
    for (xx = x + 0.5; xx < x + w; xx += 3) pad(g, xx, base - 2.2, 1.2, 1, 0.6, rnd, c.plant);
    R(g, x, eave, w, HP, c.frame); R(g, x, base - 1.4, w, 1.4, c.wall);
  };
  // a high hedge-bank's crown: hawthorn and blackthorn, holly and ivy, in leafy clumps. c = [[shade, body, light]…]
  var hedgeCrown = function (g, f, x0, x1, c, rnd, berries) {
    for (var x = x0; x < x1; x += 2.2 + rnd() * 2) {
      var y = f(x), cc = c[Math.floor(rnd() * c.length)];
      pad(g, x, y - 1.4 - rnd() * 2, 2.6 + rnd() * 2.4, 2 + rnd() * 1.6, 1, rnd, cc);
      if (berries && rnd() > 0.7) for (var b = 0; b < 3; b++) R(g, x + (rnd() - 0.5) * 3, y - 2 - rnd() * 3, HP, HP, berries);
    }
  };

  GEN.lanes = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SX = 400, SY = 50;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };

    /* Early afternoon: the sun already low in the south-west the way it is
       in December, warm on everything, soft round clouds, and a silver
       glimpse of the sea beyond the fields. */
    var far = strip(), g = far.getContext('2d');
    for (y = 40; y < 90; y += 1) { g.globalAlpha = 0.26 * Math.pow((y - 40) / 50, 1.5); R(g, 0, y, SW, 1, '#fff0c8'); }
    g.globalAlpha = 1;
    [[3.4, 0.05], [2.4, 0.08], [1.7, 0.13]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 9 * q[0], '#fff6d8'); });
    g.globalAlpha = 1; disc(g, SX, SY, 9, '#ffe8a8'); disc(g, SX - 0.5, SY - 0.6, 8, '#fff2c4'); disc(g, SX - 2.6, SY - 2.8, 3.8, '#ffffff');
    var CB = [hm('#c8c0c8', 0.2), hm('#fff8ee', 0.05), '#ffffff'];
    [[30, 34, 0.9], [150, 20, 1.1], [270, 40, 0.8], [470, 26, 1]].forEach(function (q) { cloud(g, q[0], q[1], q[2], CB); });
    for (i = 0; i < 7; i++) streak(g, rnd() * SW, 14 + rnd() * 50, 40 + rnd() * 70, 1.2 + rnd() * 1.6, [hm('#d8c8b8', 0.2), hm('#fff6e8', 0.1), '#ffffff'], true);
    // the sea, a silver line beyond the land in places
    for (x = 0; x < SW; x += HP) { var sv = wv(x, 2, 0.4) + wv(x, 3, 2); if (sv > 0.3) { R(g, x, 83, HP, 1.4, hm('#b8cce0', 0.4)); if (Math.sin(x * 1.7) > 0.6) R(g, x, 83.4, HP, HP, '#ffffff'); } }
    L.push({ c: far, f: 0.015 });

    /* The island spread out in the haze: little fields in their hedges,
       granite farms, the glint of glasshouse roofs everywhere, trees in
       their winter brown, and not a steeple on the skyline. */
    var dl = strip(), d = dl.getContext('2d');
    var hd = function (c, a) { return mix(c, hz, a === undefined ? 0.5 : a); };
    var df = function (xx) { return 75 + wv(xx, 2, 1.1) * 2.5 + wv(xx, 5, 0.3) * 1; };
    land(d, df, [hd('#7a8c58'), hd('#8ea05e'), hd('#d0d8a0')], 4);
    for (j = 0; j < 4; j++) for (x = rnd() * 20; x < SW; x += 14 + rnd() * 22) {
      var fy = df(x) + 2 + j * 4.4, fw = 12 + rnd() * 18;
      R(d, x, fy, fw, 4.4, hd(['#9ab060', '#b0b868', '#8aa458', '#c4b870'][Math.floor(rnd() * 4)]));
      R(d, x, fy - HP, fw, 1, hd('#5a6a3a')); R(d, x + fw - 0.8, fy, 0.8, 4.4, hd('#5a6a3a'));
    }
    // glasshouses glinting among the fields, farms of grey and honey stone, trees
    for (i = 0; i < 14; i++) { x = rnd() * SW; y = df(x) + 2 + rnd() * 10; var gw2 = 6 + rnd() * 12; R(d, x, y - 1.6, gw2, 1.6, hd('#c8dcec', 0.4)); for (var gx = x; gx < x + gw2; gx += 1.5) R(d, gx, y - 2.2, 0.8, 0.6, hd('#ffffff', 0.3)); }
    for (i = 0; i < 12; i++) { x = rnd() * SW; y = df(x) + 1 + rnd() * 10; R(d, x, y - 2.2, 4, 2.2, hd(['#d8c8a8', '#b8b0a8', '#e8dcc0'][i % 3])); R(d, x - 0.3, y - 3.2, 4.6, 1, hd('#6a6e80')); R(d, x + 0.6, y - 1.6, HP, HP, hd('#5a6070')); R(d, x + 2.4, y - 1.6, HP, HP, hd('#5a6070')); }
    for (i = 0; i < 40; i++) { x = rnd() * SW; y = df(x) + rnd() * 12; pad(d, x, y - 1.6, 1.6 + rnd() * 2.6, 1.4 + rnd(), 0.8, rnd, rnd() > 0.3 ? [hd('#6a5a48'), hd('#8a7860'), hd('#b8a48a')] : [hd('#3a5a3a'), hd('#4e704a'), hd('#88a878')]); }
    mist(d, 76, 14, hz);
    L.push({ c: dl, f: 0.035 });

    /* Nearer: the fields over the hedge, where the golden Guernsey cows
       graze; an old vinery glinting; a granite farmhouse with its round
       arched door, smoke from the chimney; a field of winter cabbages. */
    var fl = strip(), f = fl.getContext('2d');
    var hf = function (c, a) { return mix(c, hz, a === undefined ? 0.22 : a); };
    var ff = function (xx) { return 84 + wv(xx, 2, 2.4) * 2.4 + wv(xx, 4, 0.8) * 1.2; };
    land(f, ff, [hf('#5c8a3a'), hf('#76a448'), hf('#c4dc88')], 30);
    // the little fields, each its own green (one ploughed), with hedges between them running back
    var FX = [0, 70, 128, 186, 270, 352, 420, 512], FT = ['#7aa84a', '#8cb450', '#6e9e44', '#86a84c', '#9a7a52', '#7ca64a', '#88b04e'];
    for (j = 0; j < FX.length - 1; j++) {
      for (x = FX[j]; x < FX[j + 1]; x += HP) { y = ff(x) + 1.5; R(f, x, y, HP, H - y, hf(FT[j])); if (FT[j] === '#9a7a52') for (var py2 = y + 1; py2 < y + 30; py2 += 1.6) R(f, x, py2, HP, HP, hf('#7a5a3a')); }
      for (y = 0; y < 22; y += HP) R(f, FX[j] + y * 0.5 * (j % 2 ? 1 : -1), ff(FX[j]) + 1 + y, 1.4, HP, hf('#4a6a2e'));
      for (y = 0; y < 22; y += 3) pad(f, FX[j] + y * 0.5 * (j % 2 ? 1 : -1), ff(FX[j]) + y, 1.6, 1.2, 0.8, rnd, [hf('#3a5a26'), hf('#4e7030'), hf('#7a9a48')]);
    }
    for (x = 0; x < SW; x += 2) pad(f, x, ff(x) + 0.5, 1.6, 1, 0.8, rnd, [hf('#3a5a26'), hf('#4e7030'), hf('#86a650')]);
    for (i = 0; i < 160; i++) { x = rnd() * SW; y = ff(x) + 2 + rnd() * 16; R(f, x, y, 1.5 + rnd() * 2, HP, hf(rnd() > 0.5 ? '#a0c464' : '#5a8436')); }
    // the farm
    var FP = { s: [hf('#8a7460'), hf('#c4ac8c'), hf('#ecdcc0')], roof: [hf('#40485c'), hf('#58627a'), hf('#929cb4')], tile: [hf('#9a4a30'), hf('#c8684a')], frame: hf('#f4f0e6'),
      glass: hf('#4a5468'), door: hf('#3a5a4a'), smoke: hf('#f4f0ec', 0.3), snow: hf('#ffffff', 0.1) };
    farmhouse(f, 140, ff(140) + 4, 30, 12, FP, rnd);
    // the vinery
    vinery(f, 300, ff(300) + 5, 70, 9, 6, { frame: hf('#f0f0ec'), glass: [hf('#7a98b0'), hf('#a4c0d4'), hf('#d4e6f2')], wall: hf('#a89888'), brick: hf('#a85a44'), plant: [hf('#3a5a2a'), hf('#5a7a3a'), hf('#8aa858')] }, rnd);
    // winter cabbages in rows
    for (j = 0; j < 4; j++) for (x = 400; x < 470; x += 3) { y = ff(x) + 3 + j * 2.6; disc(f, x + j, y, 1.1 + j * 0.15, hf('#5a8a6a')); R(f, x + j - 0.4, y - 0.6, HP, HP, hf('#a8d0b0')); }
    // trees in the hedgerows between the fields, bare
    [[24, 20], [262, 22], [486, 18]].forEach(function (q) { bare(f, q[0], ff(q[0]) + 2, q[1], -Math.PI / 2 + 0.06, 2, 3, [hf('#4a3a30', 0.3), hf('#6a5444', 0.3), hf('#9a8470', 0.3)], BB.rng(q[0] + 40), null); });
    // and pines planted against the wind, dark and flat-topped
    [[110, 20], [380, 24]].forEach(function (q) { var px = q[0], py = ff(px) + 2; R(f, px - 0.6, py - q[1], 1.2, q[1], hf('#4a3a30')); [[0, 0, 7], [-4, 4, 5], [4, 3, 5.4], [-1, 7, 6]].forEach(function (p2) { pad(f, px + p2[0], py - q[1] + p2[1], p2[2], 2, 0.9, rnd, [hf('#1e3a2a'), hf('#2e5038'), hf('#5a7a58')]); }); });
    // the cows
    var CC = { coat: [hf('#a86a2a'), hf('#d89a48'), hf('#f4c478')], white: hf('#fbf6ee'), nose: hf('#f0a8a0') };
    [[40, 1, 1], [62, -1, 0], [196, 1, 1], [214, -1, 1], [236, 1, 0], [432, -1, 1], [458, 1, 1], [500, -1, 0]].forEach(function (q, qi) { cow(f, q[0], ff(q[0]) + 9 + (qi % 3) * 1.6, 1.1, q[1], CC, q[2], qi * 31 + 7); });
    L.push({ c: fl, f: 0.07 });

    /* The lane's own banks: high hedges on earth and granite, the stones
       showing through, ferns and ivy down the face, holly bright with
       berries and gorse in flower along the top, a big tree here and
       there, and gateways where you can see out to the fields. */
    var bk = strip(), b = bk.getContext('2d');
    var GATES = [[96, 26], [330, 22]];
    var inGate = function (xx) { for (var q = 0; q < GATES.length; q++) { var d2 = along(xx, GATES[q][0]); if (d2 < GATES[q][1]) return Math.min(d2, GATES[q][1] - d2); } return -1; };
    var bf = function (xx) { return 105 + wv(xx, 3, 0.6) * 1.6 + wv(xx, 7, 2) * 0.8; };
    // the big trees in the bank, behind its crown
    [[60, 44, 4], [420, 40, 3.8]].forEach(function (q) { bare(b, q[0], bf(q[0]) + 4, q[1], -Math.PI / 2 + 0.04, q[2], 3, ['#3e3028', '#5e4a3c', '#8e7864'], BB.rng(q[0] + 91), null); });
    // a holly tree grown up out of the bank, dark and glossy, red with berries
    var HXX = 250, HBB = bf(HXX);
    R(b, HXX - 1, HBB - 14, 2, 14, '#5a4a3c');
    [[0, -22, 7, 6], [-5, -15, 6, 5], [5, -14, 6.4, 5], [0, -9, 7, 4]].forEach(function (p2) { pad(b, HXX + p2[0], HBB + p2[1], p2[2], p2[3], 1.3, rnd, ['#0c3418', '#185224', '#2e7838']); });
    for (i = 0; i < 26; i++) { x = HXX + (rnd() * 2 - 1) * 8; y = HBB - 26 + rnd() * 18; R(b, x, y, 1, 1, '#e8403a'); R(b, x, y, HP, HP, '#ffc0b0'); }
    // the bank: earth and old granite, ivy and ferns
    for (x = 0; x < SW; x += HP) {
      if (inGate(x) >= 0) continue;
      y = bf(x);
      R(b, x, y, HP, H - y, '#4a6a2c'); R(b, x, y, HP, 1.5, '#6a8a3a');
      // earth showing through the green in places, where the bank's face has slipped
      if (Math.sin(x * 2.1) > 0.4) R(b, x, y + 1.5 + Math.abs(Math.sin(x * 0.7)) * 3, HP, HP, '#6a8a3a');
    }
    // earth showing through the green where the bank's face has slipped, and its old granite
    for (i = 0; i < 16; i++) { x = rnd() * SW; if (inGate(x) >= 0 || inGate(x + 8) >= 0) continue; y = bf(x) + 8 + rnd() * 10; oval(b, x, y, 4 + rnd() * 5, 2 + rnd() * 2, '#6a5034'); oval(b, x - 1, y - 1, 3, 1, '#7e6444'); }
    for (i = 0; i < 70; i++) {
      x = rnd() * SW; if (inGate(x) >= 0) continue;
      y = bf(x) + 5 + rnd() * 18; var sr = 1.4 + rnd() * 1.8;
      oval(b, x + 0.3, y + 0.3, sr * 1.3, sr, '#5a5450'); oval(b, x, y, sr * 1.2, sr * 0.9, '#9a948c'); oval(b, x - sr * 0.4, y - sr * 0.35, sr * 0.5, sr * 0.3, '#cec8bc');
    }
    for (i = 0; i < 60; i++) { x = rnd() * SW; if (inGate(x) >= 0) continue; y = bf(x) + 3 + rnd() * 16; pad(b, x, y, 2 + rnd() * 2, 1.6 + rnd(), 0.9, rnd, rnd() > 0.5 ? ['#1e4a22', '#2e6a2e', '#5a9a48'] : ['#2a4a1e', '#46702a', '#7aa848']); }
    // the crown of the hedge, with holly berries and gorse flowers in it
    hedgeCrown(b, function (xx) { return inGate(xx) >= 0 ? 999 : bf(xx); }, 0, SW, [['#1e3e1e', '#2e5a2a', '#5a8a44'], ['#3e3424', '#5a4c34', '#86744e'], ['#0c3418', '#185224', '#2e7838']], rnd, '#e8403a');
    for (i = 0; i < 60; i++) { x = rnd() * SW; if (inGate(x) >= 0) continue; R(b, x, bf(x) - 1 - rnd() * 4, 1, HP, '#f8d038'); }
    // the gateways: granite posts, and the fields beyond
    GATES.forEach(function (q) {
      [q[0] - 3, q[0] + q[1]].forEach(function (px) { var py = bf(px - 4); R(b, px, py - 6, 3.4, H - py + 6, '#9a948c'); R(b, px, py - 6, 1, H - py + 6, '#cec8bc'); R(b, px + 2.6, py - 6, 0.8, H - py + 6, '#6a645e'); R(b, px - 0.3, py - 6.6, 4, 0.8, '#d8d2c6'); });
    });
    L.push({ c: bk, f: 0.13 });

    /* In front: the lane's verge — long grass, hart's-tongue ferns, ivy,
       a holly sprig, dead leaves blown into the side. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 1.4) * 1.4 + wv(xx, 9, 0.4) * 0.6; };
    land(n, nf, ['#4a6a2a', '#5e8432', '#a0c460'], 5);
    for (x = 0; x < SW; x += 0.8) { var gb2 = nf(x) + 0.5, gl2 = 1.5 + Math.abs(Math.sin(x * 0.41) * Math.sin(x * 0.13 + 1)) * 5 + rnd() * 1.5; for (var tq = 0; tq < 1; tq += HP / gl2) R(n, x + tq * tq * 1.2, gb2 - tq * gl2, HP, HP, tq > 0.6 ? '#c8dc78' : '#6a9438'); }
    // hart's-tongue ferns: glossy straps fanning out of a crown
    [[60, 1], [180, -1], [300, 1], [440, -1]].forEach(function (q) {
      for (var a = -2.5; a <= -0.6; a += 0.38) { for (var tt = 0; tt < 1; tt += 0.06) { var fx2 = q[0] + Math.cos(a) * 7 * tt, fy2 = nf(q[0]) - Math.sin(-a) * 7 * tt + tt * tt * 3; R(n, fx2, fy2, 1.2, 1, a < -1.6 ? '#4a8a3a' : '#2e6a2a'); R(n, fx2, fy2, HP, HP, '#8ac868'); } }
    });
    for (i = 0; i < 60; i++) { x = rnd() * SW; y = nf(x) + 1 + rnd() * 5; R(n, x, y, 1, HP, ['#c8782a', '#a85a24', '#e0a040', '#8a4a20'][i % 4]); }
    L.push({ c: nr, f: 0.24 });
    return L;
  };

  /* ---- 5 · Saumarez Park ---- */
  /* A pine clipped the Japanese way into flat clouds of needles on
     curving boughs. c = [shade, body, light], t = trunk */
  var cloudPine = function (g, x, base, h, c, t, rnd) {
    var pts = [[0, 1], [-0.3, 0.72], [0.25, 0.5], [-0.15, 0.28], [0.1, 0.06]];
    for (var i = 0; i < pts.length - 1; i++) line(g, x + pts[i][0] * h * 0.4, base - (1 - pts[i][1]) * h, x + pts[i + 1][0] * h * 0.4, base - (1 - pts[i + 1][1]) * h, Math.max(HP, h * 0.07 * (1 - i * 0.15)), t);
    [[-0.45, 0.62, 0.32], [0.42, 0.46, 0.3], [-0.3, 0.3, 0.26], [0.18, 0.12, 0.24], [0, -0.04, 0.2]].forEach(function (p) {
      var px = x + p[0] * h * 0.6, py = base - (1 - p[1]) * h;
      line(g, x + p[0] * h * 0.15, py + 1, px, py + 0.5, HP, t);
      pad(g, px, py, p[2] * h, p[2] * h * 0.34, Math.max(0.6, h * 0.05), rnd, c);
    });
  };
  /* A tree wrapped in fairy lights for Christmas: bare boughs, every one
     strung with little bulbs, a spiral round the trunk, the bulbs lit and
     glowing in the dimming afternoon. */
  var lightTree = function (g, x, base, len, w, seed, c, bulbs) {
    var pts = [], rr = BB.rng(seed);
    var grow = function (gx, gy, l, a, ww, dep) {
      var n = Math.max(2, Math.ceil(l / HP)), px = gx, py = gy;
      for (var i = 0; i <= n; i++) {
        var t = i / n, wd = Math.max(HP, ww * (1 - 0.5 * t));
        R(g, px - wd / 2, py - wd / 2, wd, wd, c[1]);
        if (wd > 1) { R(g, px - wd / 2, py - wd / 2, HP, wd, c[2]); R(g, px + wd / 2 - HP, py - wd / 2, HP, wd, c[0]); }
        if (i % 6 === 3 && dep > 0 && dep < 3) pts.push([px, py]);
        px += Math.cos(a) * l / n; py += Math.sin(a) * l / n;
      }
      if (dep <= 0) return;
      for (var k = 0; k < 3; k++) { var f = 0.4 + k * 0.22, sx = gx + (px - gx) * f, sy = gy + (py - gy) * f; grow(sx, sy, l * (0.5 + rr() * 0.2), a + (k % 2 ? 0.6 : -0.6) + (rr() - 0.5) * 0.4, ww * 0.6, dep - 1); }
      grow(px, py, l * 0.5, a + (rr() - 0.5) * 0.5, ww * 0.5, dep - 1);
    };
    grow(x, base, len, -Math.PI / 2, w, 3);
    for (var y = base - 1; y > base - len * 0.85; y -= 2.2) pts.push([x + Math.sin(y * 0.8) * w * 0.45, y]);
    pts.forEach(function (p, i) { var col = bulbs[i % bulbs.length]; glow(g, p[0], p[1], 3, col, 0.9); R(g, p[0] - HP / 2, p[1] - HP / 2, 1, 1, mix(col, '#ffffff', 0.5)); });
  };
  // a duck on the water: a little round body, a head, a tail up. c = [body, head, beak]
  var duck = function (g, x, wl, s, face, c) {
    oval(g, x, wl - 0.8 * s, 2 * s, 1 * s, c[0], true);
    R(g, x - face * 2 * s, wl - 1.6 * s, 0.8 * s, 0.8 * s, c[0]);
    disc(g, x + face * 1.5 * s, wl - 2 * s, 0.75 * s, c[1]);
    R(g, x + face * 2.1 * s - (face < 0 ? 0.8 * s : 0), wl - 2 * s, 0.8 * s, 0.45 * s, c[2]);
    R(g, x - 0.6 * s, wl - 1.4 * s, 1.4 * s, HP, mix(c[0], '#ffffff', 0.4));
  };

  GEN.saumarez = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SX = 110, SY = 60;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };

    /* Late afternoon: the sun going down in the south-west, gold, the
       clouds lit warm from beneath, the light long and low over the park. */
    var far = strip(), g = far.getContext('2d');
    for (y = 34; y < 100; y += 1) { g.globalAlpha = 0.3 * Math.pow((y - 34) / 66, 1.5); R(g, 0, y, SW, 1, '#ffd8a0'); }
    g.globalAlpha = 1;
    [[3.6, 0.05], [2.6, 0.08], [1.8, 0.13], [1.35, 0.2]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 10 * q[0], '#fff0c8'); });
    g.globalAlpha = 1; disc(g, SX, SY, 10, '#ffc868'); disc(g, SX - 0.6, SY - 0.8, 9, '#ffdc8c'); disc(g, SX - 3.2, SY - 3.4, 4.4, '#fff4cc');
    var CB = [hm('#e0a8a0', 0.12), hm('#fff2e4', 0.05), '#ffffff'];
    [[230, 30, 1], [350, 18, 0.8], [470, 40, 0.9], [20, 22, 0.7]].forEach(function (q) { cloud(g, q[0], q[1], q[2], CB); });
    for (i = 0; i < 9; i++) { x = rnd() * SW; var nearS = Math.abs(((x - SX + SW * 1.5) % SW) - SW / 2) < 80; streak(g, x, 30 + rnd() * 44, 40 + rnd() * 80, 1.3 + rnd() * 1.8, [hm('#d0a0a8', 0.2), hm(nearS ? '#ffd0a0' : '#f8d0c0', 0.15), nearS ? '#fff4c8' : '#ffece0'], true); }
    L.push({ c: far, f: 0.015 });

    /* Beyond the park: its woods all round in their winter purple-brown,
       dark evergreens among them, and the old manor house in the trees,
       its windows just beginning to glow. */
    var wl = strip(), w = wl.getContext('2d');
    var hw = function (c, a) { return mix(c, hz, a === undefined ? 0.5 : a); };
    var wf = function (xx) { return 88 + wv(xx, 3, 0.8) * 2 + wv(xx, 7, 2) * 1; };
    for (i = 0; i < 46; i++) { x = rnd() * SW; var th2 = 8 + rnd() * 9; bare(w, x, wf(x) + 4, th2, -Math.PI / 2 + (rnd() - 0.5) * 0.2, 1.2, 2, [hw('#6a5060', 0.58), hw('#806878', 0.58), hw('#a8909c', 0.58)], BB.rng(i * 13 + 5), null); }
    for (i = 0; i < 26; i++) { x = rnd() * SW; pad(w, x, wf(x) - 4 - rnd() * 6, 4 + rnd() * 5, 4 + rnd() * 4, 1.4, rnd, [hw('#2e4a3e'), hw('#3e5e4a'), hw('#6a8a6e')]); }
    // the manor
    var MX = 150, MB = wf(MX) + 3, MT = MB - 22;
    R(w, MX, MT, 46, 22, hw('#e8dcc4')); R(w, MX + 44, MT, 2, 22, hw('#b8a890')); R(w, MX, MT, HP, 22, hw('#fff8e8'));
    R(w, MX + 17, MT - 4, 12, 26, hw('#f0e6d0')); R(w, MX + 27.5, MT - 4, 1.5, 26, hw('#c0b098'));
    span(w, MT - 9, MT - 3.6, function (yy) { return MX + 16.5 + (MT - 3.6 - yy) * 1.1; }, function (yy) { return MX + 29.5 - (MT - 3.6 - yy) * 1.1; }, hw('#e8dcc4'));
    span(w, MT - 6, MT + HP, function (yy) { return MX - 0.8 + (MT - yy) * 0.6; }, function (yy) { return MX + 46.8 - (MT - yy) * 0.6; }, hw('#5a6078'));
    // a dusting of snow left on the roof from the morning
    for (x = MX + 3; x < MX + 44; x += 1.2) if (rnd() > 0.35) R(w, x, MT - 5.6 + rnd() * 3, 1 + rnd(), HP, hw('#ffffff', 0.35));
    R(w, MX + 2.8, MT - 6, 41, HP, hw('#ffffff', 0.35));
    R(w, MX - 0.8, MT, 47.6, HP, hw('#8a90a8'));
    [MX + 3, MX + 12, MX + 34, MX + 42].forEach(function (cx) { R(w, cx - 1, MT - 11, 2.6, 6, hw('#c8b8a4')); R(w, cx - 1.3, MT - 11.4, 3.2, 0.8, hw('#e8dcc8')); });
    for (j = 0; j < 3; j++) for (x = MX + 2.5; x < MX + 44; x += 4.4) { if (x > MX + 16 && x < MX + 29) continue; var lit = rnd() > 0.7; R(w, x, MT + 2.5 + j * 6.4, 2.2, 3.4, lit ? hw('#ffd890', 0.3) : hw('#4a5468')); R(w, x, MT + 4.2 + j * 6.4, 2.2, HP, hw('#f8f4ea')); }
    R(w, MX + 20, MB - 6, 6, 6, hw('#4a3a30')); disc(w, MX + 23, MB - 6, 3, hw('#4a3a30')); R(w, MX + 21, MB - 5, 4, 5, hw('#ffd890', 0.3));
    disc(w, MX + 23, MT + 2.4, 1.6, hw('#2e6a3a')); disc(w, MX + 23, MT + 2.4, 0.8, hw('#f0e6d0')); R(w, MX + 22.75, MT + 3.6, HP, 1, hw('#e84a4a'));
    land(w, function (xx) { return wf(xx) + 3; }, [hw('#6a8a4a'), hw('#7a9a52'), hw('#b8cc88')], 6);
    mist(w, 84, 18, hz);
    L.push({ c: wl, f: 0.035 });

    /* The park: the lake with its ducks and reeds and a little wooded
       island; the Japanese garden, its red bridge arching over the
       stream, stone lanterns, pines clipped into clouds; and the big
       adventure playground, its wooden towers and bright slides. */
    var pk = strip(), p = pk.getContext('2d');
    var hp2 = function (c, a) { return mix(c, hz, a === undefined ? 0.2 : a); };
    var pf = function (xx) { return 100 + wv(xx, 2, 2) * 1.6 + wv(xx, 6, 0.4) * 0.8; };
    land(p, pf, [hp2('#5a8a3e'), hp2('#6e9e46'), hp2('#b4d478')], 30);
    // the lake
    var LK0 = 6, LK1 = 190, LY = 103;
    for (y = LY; y < 116; y += HP) { var lw = Math.sqrt(Math.max(0, 1 - Math.pow((y - LY - 6.5) / 6.5, 2))); var cx2 = (LK0 + LK1) / 2, hw2 = (LK1 - LK0) / 2 * (0.86 + 0.14 * lw); R(p, cx2 - hw2, y, hw2 * 2, HP, mix(hp2('#a8c4e0'), hp2('#ffd8a8'), Math.max(0, 1 - (y - LY) / 6) * 0.4)); }
    for (i = 0; i < 90; i++) { x = LK0 + 8 + rnd() * (LK1 - LK0 - 16); y = LY + 1 + rnd() * 11; R(p, x, y, 1 + rnd() * 4, HP, rnd() > 0.5 ? hp2('#ffffff') : hp2('#7a98c0')); }
    // the sun's reflection, and the island with its willow
    for (y = LY + 1; y < 114; y += 1) R(p, 120 + Math.sin(y * 2) * 1.5 - 3, y, 6, HP, hp2('#fff0c0', 0.1));
    oval(p, 70, LY + 4, 12, 2.4, hp2('#5a7a3a'), true);
    bare(p, 70, LY + 2, 14, -Math.PI / 2, 1.6, 2, [hp2('#6a5a3a'), hp2('#8a7a50'), hp2('#c0b078')], BB.rng(77), null);
    for (i = 0; i < 30; i++) { x = 64 + rnd() * 12; R(p, x, LY - 8 + rnd() * 9, HP, 2 + rnd() * 3, hp2('#c8b468')); }
    // reeds at the edges, and the ducks
    [[LK0 + 2, 14], [LK1 - 16, 14]].forEach(function (q) { for (x = q[0]; x < q[0] + q[1]; x += 0.8) { var rh2 = 3 + Math.abs(Math.sin(x * 1.3)) * 4; R(p, x, LY + 2 - rh2, HP, rh2, hp2(Math.sin(x * 3) > 0 ? '#b8a060' : '#8a7a40')); if (Math.sin(x * 2.1) > 0.85) R(p, x - HP, LY + 2 - rh2, 1, 1.6, hp2('#6a4a2a')); } });
    var DK = [[hp2('#f8f8f4'), hp2('#f8f8f4'), hp2('#f0a030')], [hp2('#8a7058'), hp2('#2a6a4a'), hp2('#e8c040')], [hp2('#a88a68'), hp2('#9a7a5a'), hp2('#e0b040')]];
    [[30, 1, 0], [42, -1, 1], [96, 1, 2], [104, 1, 1], [150, -1, 0], [162, -1, 2], [174, 1, 1]].forEach(function (q, qi) { duck(p, q[0], LY + 4 + (qi % 3) * 2.6, 1, q[1], DK[q[2]]); for (j = 1; j < 4; j++) R(p, q[0] - q[1] * (2 + j * 2), LY + 4.3 + (qi % 3) * 2.6, 1.4, HP, hp2('#e8f0fa')); });
    // the Japanese garden: its pond and stream, rocks, the red bridge, lanterns, cloud pines
    var JX = 236;
    for (y = pf(JX) + 2; y < pf(JX) + 7; y += HP) R(p, JX - 14, y, 50, HP, hp2('#9ab8d8'));
    cloudPine(p, JX - 10, pf(JX - 10) + 2, 20, [hp2('#1e3e2a'), hp2('#2e5a38'), hp2('#5e8a5a')], hp2('#4a3a30'), rnd);
    cloudPine(p, JX + 44, pf(JX + 44) + 2, 16, [hp2('#1e3e2a'), hp2('#2e5a38'), hp2('#5e8a5a')], hp2('#4a3a30'), rnd);
    var BR = [hp2('#a02a20'), hp2('#d8402e'), hp2('#ff7a5a')], by0 = pf(JX) + 3;
    // the arched bridge: a deck curving up over the water, its red rails and posts
    for (x = JX - 8; x <= JX + 30; x += HP) { var u = (x - JX - 11) / 19, ay = by0 - 8 * (1 - u * u); R(p, x, ay, HP, 1.4, BR[1]); R(p, x, ay, HP, HP, BR[2]); R(p, x, ay + 1.4, HP, HP, BR[0]); R(p, x, ay - 4, HP, HP, BR[1]); R(p, x, ay - 4 + HP, HP, HP, BR[0]); }
    for (x = JX - 8; x <= JX + 30; x += 4.75) { var u2 = (x - JX - 11) / 19, ay2 = by0 - 8 * (1 - u2 * u2); R(p, x - HP / 2, ay2 - 4.6, 1, 4.6, BR[1]); R(p, x - HP / 2, ay2 - 5, 1, HP, hp2('#e8c040')); }
    for (y = by0; y < by0 + 4; y += HP) R(p, JX - 3 + Math.sin(y * 3) * 0.6, y, 28, HP, hp2('#c84a3a', 0.45));
    [[JX - 18, 6], [JX + 36, 5.4]].forEach(function (q) {
      var lx = q[0], lb = pf(lx) + 2, sz = q[1];
      R(p, lx - sz * 0.15, lb - sz * 0.9, sz * 0.3, sz * 0.9, hp2('#b0aaa0')); R(p, lx - sz * 0.4, lb - sz, sz * 0.8, sz * 0.25, hp2('#c8c2b8'));
      R(p, lx - sz * 0.3, lb - sz * 1.5, sz * 0.6, sz * 0.5, hp2('#c8c2b8')); R(p, lx - sz * 0.12, lb - sz * 1.4, sz * 0.24, sz * 0.3, hp2('#ffd070'));
      span(p, lb - sz * 1.9, lb - sz * 1.45, function (yy) { return lx - (yy - lb + sz * 1.9) * 1.6; }, function (yy) { return lx + (yy - lb + sz * 1.9) * 1.6; }, hp2('#a8a298'));
      R(p, lx - HP / 2, lb - sz * 2.1, 1, sz * 0.25, hp2('#a8a298'));
    });
    [[JX + 4, 3], [JX + 22, 2.4], [JX - 4, 2]].forEach(function (q) { oval(p, q[0], pf(q[0]) + 3, q[1] * 1.4, q[1], hp2('#8a8680'), true); oval(p, q[0] - q[1] * 0.4, pf(q[0]) + 3 - q[1] * 0.5, q[1] * 0.5, q[1] * 0.3, hp2('#c8c4bc')); });
    // the adventure playground: wooden towers with pointed roofs, slides, a net, a rope bridge, swings
    var PX = 340, PB = pf(PX) + 3, TWD = [hp2('#7a5434'), hp2('#a87a4c'), hp2('#d8ac78')];
    var tower = function (tx, th3, roofC) {
      [tx - 4, tx + 4].forEach(function (lx) { R(p, lx - 0.6, PB - th3, 1.2, th3, TWD[1]); R(p, lx - 0.6, PB - th3, HP, th3, TWD[2]); });
      R(p, tx - 5, PB - th3 * 0.55, 10, 1.4, TWD[1]); R(p, tx - 5, PB - th3 * 0.55, 10, HP, TWD[2]);
      for (x = tx - 4.5; x < tx + 4.5; x += 1.4) R(p, x, PB - th3 * 0.55 - 3, HP, 3, TWD[0]);
      span(p, PB - th3 - 7, PB - th3 + HP, function (yy) { return tx - (yy - PB + th3 + 7) * 0.85; }, function (yy) { return tx + (yy - PB + th3 + 7) * 0.85; }, roofC[1]);
      span(p, PB - th3 - 7, PB - th3 + HP, function (yy) { return tx - (yy - PB + th3 + 7) * 0.85; }, function (yy) { return tx - (yy - PB + th3 + 7) * 0.35; }, roofC[2]);
      R(p, tx - HP / 2, PB - th3 - 9, 1, 2, TWD[0]);
    };
    tower(PX, 22, [hp2('#2a5aa0'), hp2('#3a7ad0'), hp2('#7ab0f0')]);
    tower(PX + 46, 26, [hp2('#a02a2a'), hp2('#d84a3a'), hp2('#ff8a6a')]);
    tower(PX + 92, 18, [hp2('#2a7a3a'), hp2('#3aa04a'), hp2('#7ad070')]);
    // the rope bridge between the first two, and a cargo net up the third
    for (x = PX + 5; x < PX + 41; x += HP) { var sg = Math.sin((x - PX - 5) / 36 * Math.PI) * 3; R(p, x, PB - 22 * 0.55 + sg, HP, HP, TWD[2]); R(p, x, PB - 22 * 0.55 - 3 + sg * 0.7, HP, HP, hp2('#e8d8b0')); if ((x - PX) % 2 < HP) R(p, x, PB - 22 * 0.55 - 3 + sg * 0.7, HP, 3 + sg * 0.3, hp2('#c8b890')); }
    for (j = 0; j < 6; j++) { line(p, PX + 96 + j * 2, PB - 10, PX + 104 + j * 1.2, PB, HP, hp2('#e8d8b0')); line(p, PX + 96, PB - 10 + j * 1.8, PX + 107, PB - 10 + j * 1.8 + 1, HP, hp2('#e8d8b0')); }
    // a tube slide curling down from the tall tower, and a wide yellow one from the first
    for (var t2 = 0; t2 < 1; t2 += 0.01) { var sx2 = PX + 50 + Math.sin(t2 * 5) * 5 + t2 * 16, sy2 = PB - 26 * 0.55 + t2 * 26 * 0.55; disc(p, sx2, sy2 - 1.4, 1.6, hp2('#e8582a')); R(p, sx2 - 1, sy2 - 2.6, 1, HP, hp2('#ffa070')); }
    for (x = PX - 5; x > PX - 22; x -= HP) { var sy3 = PB - 22 * 0.55 + (PX - 5 - x) * 0.7; if (sy3 > PB) break; R(p, x, sy3 - 1, HP, 1.4, hp2('#f4c030')); R(p, x, sy3 - 1, HP, HP, hp2('#fff090')); R(p, x, sy3 - 2.4, HP, HP, hp2('#d89a10')); }
    // the swings
    R(p, PX + 116, PB - 16, 26, 1.2, TWD[1]); line(p, PX + 116, PB - 16, PX + 112, PB, 1, TWD[1]); line(p, PX + 142, PB - 16, PX + 146, PB, 1, TWD[1]);
    [PX + 122, PX + 130, PX + 138].forEach(function (sx3, si) { R(p, sx3, PB - 15, HP, 11, hp2('#8a8a90')); R(p, sx3 + 3, PB - 15, HP, 11, hp2('#8a8a90')); R(p, sx3 - 0.4, PB - 4.4, 4.2, 1, hp2(['#d84a3a', '#3a7ad0', '#f4c030'][si])); });
    L.push({ c: pk, f: 0.07 });

    /* The big old trees of the park, every one wrapped in fairy lights,
       glowing as the afternoon fades; lamps along the paths. */
    var tr = strip(), t = tr.getContext('2d');
    var tf = function (xx) { return 112 + wv(xx, 2, 0.6) * 1.2; };
    var BULB2 = ['#fff0c0', '#ffd070', '#ff8a7a', '#8ad0ff', '#fff0c0', '#a8f08a'];
    [[50, 40, 4.4, 101], [196, 34, 4, 202], [336, 42, 4.8, 303], [462, 34, 4, 404]].forEach(function (q) { lightTree(t, q[0], tf(q[0]) + 2, q[1], q[2], q[3], ['#4a3a32', '#6a5648', '#9a8270'], BULB2); });
    land(t, tf, ['#4e7e36', '#62943e', '#a8cc6a'], 4);
    for (i = 0; i < 120; i++) { x = rnd() * SW; y = tf(x) + 1 + rnd() * 10; R(t, x, y, 1, HP, ['#c8782a', '#a85a24', '#e0a040'][i % 3]); }
    [120, 270, 400].forEach(function (lx) { lampPost(t, lx, tf(lx) + 1, 12, ['#1e2030', '#fff0c0']); glow(t, lx, tf(lx) - 12.6, 5, '#ffe090', 0.7); });
    L.push({ c: tr, f: 0.13 });

    /* In front: the edge of the lawn, leaves blown along it, a clipped
       hedge of box. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 0.2) * 1.2 + wv(xx, 8, 1.4) * 0.5; };
    land(n, nf, ['#3e6a2a', '#528a34', '#94c25a'], 5);
    for (x = 0; x < SW; x += 0.9) { var gl3 = 1.4 + Math.abs(Math.sin(x * 0.53) * Math.sin(x * 0.17 + 2)) * 3.5 + rnd(); for (var tq = 0; tq < 1; tq += HP / gl3) R(n, x + tq * 0.6, nf(x) + 0.5 - tq * gl3, HP, HP, tq > 0.55 ? '#b4dc70' : '#5a8a34'); }
    [[90, 70], [330, 60]].forEach(function (q) { for (x = q[0]; x < q[0] + q[1]; x += 2.4) pad(n, x, nf(x) - 3, 2.6, 2.6, 1.1, rnd, ['#1e4a26', '#2e6a32', '#5a9a4a']); });
    for (i = 0; i < 70; i++) { x = rnd() * SW; y = nf(x) + 1 + rnd() * 5; R(n, x, y, 1, HP, ['#c8782a', '#a85a24', '#e0a040', '#8a4a20'][i % 4]); }
    L.push({ c: nr, f: 0.24 });
    return L;
  };

  /* ---- 6 · Sunset Bays ---- */
  /* One of the island's old loophole towers on its headland: a round
     granite tower, flat-topped, a few narrow loopholes, a door high up
     reached by steps. c = [shade, body, light, dark] */
  var loophole = function (g, x, base, s, c) {
    var h = 14 * s, r = 3.4 * s, y;
    for (y = base - h; y < base; y += HP) { var k = (y - base + h) / h, rr = r * (1 + k * 0.12); R(g, x - rr, y, rr * 2, HP, c[1]); R(g, x + rr * 0.3, y, rr * 0.7, HP, c[0]); R(g, x - rr, y, HP, HP, c[2]); }
    R(g, x - r - 0.4, base - h - 0.8, r * 2 + 0.8, 1, c[2]);
    [[-1.4, 0.3], [1, 0.45], [-0.6, 0.7]].forEach(function (q) { R(g, x + q[0] * s, base - h + h * q[1], 0.6 * s, 1.6 * s, c[3]); });
    R(g, x - 0.6 * s, base - h * 0.42, 1.4 * s, 2.2 * s, c[3]);
    for (y = 0; y < 4; y++) R(g, x - 0.6 * s - (y + 1) * 1.2 * s, base - h * 0.42 + 2.2 * s + y * 1.1 * s, 1.4 * s, 1.1 * s, c[0]);
  };
  /* A wave rolling in: a long low swell whose crest curls over into white
     and breaks along its length, foam running ahead of it.
     c = [deep, body, light, foam] */
  var breaker = function (g, x0, w, y, h, c, rnd) {
    for (var x = x0; x < x0 + w; x += HP) {
      var t = (x - x0) / w, hh = h * Math.sin(t * Math.PI) * (0.8 + 0.2 * Math.sin(x * 0.7));
      if (hh < HP) continue;
      R(g, x, y - hh, HP, hh, c[1]); R(g, x, y - hh * 0.35, HP, hh * 0.35, c[0]); R(g, x, y - hh, HP, HP, c[2]);
      if (Math.sin(x * 0.9 + x0) > -0.2) R(g, x, y - hh - HP, HP, HP + (rnd() > 0.7 ? HP : 0), c[3]);
      if (rnd() > 0.6) R(g, x, y + rnd() * 1.2, HP, HP, c[3]);
    }
  };

  GEN.bays = function (rnd, th) {
    var hz = th.sky[2], L = [], i, j, x, y, k, SEA = 92, SX = 150, SY = 88;
    var hm = function (c, a) { return mix(c, hz, a === undefined ? 0.3 : a); };

    /* The sun going down into the sea off Cobo: a great orange disc half
       gone under the horizon, the sky burning orange low down, through
       pink to violet overhead with the first star out; long clouds lit
       from beneath in gold and rose; the sun's road blazing across the
       water to the shore. One layer, so the sun and its road keep together. */
    var far = strip(), g = far.getContext('2d');
    for (y = 30; y < SEA; y += 1) { g.globalAlpha = 0.4 * Math.pow((y - 30) / (SEA - 30), 1.4); R(g, 0, y, SW, 1, '#ffb070'); }
    g.globalAlpha = 1;
    [[4, 0.05], [3, 0.08], [2.2, 0.12], [1.6, 0.18]].forEach(function (q) { g.globalAlpha = q[1]; disc(g, SX, SY, 12 * q[0], '#ffd890'); });
    g.globalAlpha = 1;
    disc(g, SX, SY, 12, '#ff9a48'); disc(g, SX - 0.6, SY - 0.8, 11, '#ffb860'); disc(g, SX - 3, SY - 3.4, 6, '#ffdc98'); disc(g, SX - 4, SY - 4.6, 2.6, '#fff4d0');
    for (i = 0; i < 14; i++) {
      x = rnd() * SW; y = 18 + rnd() * 62; var near = Math.abs(((x - SX + SW * 1.5) % SW) - SW / 2) < 90;
      streak(g, x, y, 50 + rnd() * 100, 1.5 + rnd() * 2.4, [hm('#7a4a8a', 0.2), hm(y > 60 ? '#ff9a70' : '#e87a98', 0.15), near ? '#ffe8a0' : '#ffc0b0'], true);
    }
    [[260, 40, 0.9], [400, 26, 1], [40, 30, 0.7]].forEach(function (q) { cloud(g, q[0], q[1], q[2], [hm('#a05a8a', 0.15), hm('#f49a9a', 0.1), '#ffd0a8']); });
    glow(g, 330.5, 12.5, 2.4, '#fff4e0', 0.8); R(g, 330, 12, 1, 1, '#ffffff');
    // the sea: lit gold and pink near the sun, violet away from it
    for (y = SEA; y < H; y += HP) { k = (y - SEA) / (H - SEA); R(g, 0, y, SW, HP, mix(hm('#c88aa0', 0.2), '#5a4a8a', Math.min(1, k * 1.4))); }
    // the sun's bottom half is under the sea: paint the sea back over it, leaving its reflection
    for (y = SEA; y < H; y += HP) { k = (y - SEA) / (H - SEA); for (x = SX - 60; x < SX + 60; x += HP) { var dd = Math.abs(x - SX) / (14 + k * 50); if (dd < 1) { g.globalAlpha = (1 - dd) * (1 - k * 0.6) * 0.5; R(g, x, y, HP, HP, '#ffb070'); } } }
    g.globalAlpha = 1;
    R(g, 0, SEA, SW, HP, '#ffd8a0');
    for (y = SEA + HP; y < H; y += HP) { k = (y - SEA) / (H - SEA); if (rnd() < 0.15) continue; for (j = 0; j < 2 + Math.floor(rnd() * 2); j++) { x = SX + (rnd() + rnd() - 1) * (8 + k * 34); R(g, x - 1, y, 0.8 + rnd() * (1 + k * 5), HP, rnd() > 0.3 ? '#ffe8a0' : '#ff9a58'); } }
    for (i = 0; i < 120; i++) { x = rnd() * SW; k = Math.pow(rnd(), 1.3); y = SEA + 1 + k * (H - SEA - 2); R(g, x, y, 0.8 + k * 4 * rnd(), HP, rnd() > 0.5 ? hm('#e8a0b8', 0.2) : '#4a3a7a'); }
    L.push({ c: far, f: 0.02 });

    /* Out on the water: the reefs the west coast is strewn with, black
       against the light; Fort Hommet's headland at the end of Vazon with its
       round tower; a fishing boat heading home; gulls going over. */
    var rf = strip(), r = rf.getContext('2d');
    var hr = function (c, a) { return mix(c, hz, a === undefined ? 0.35 : a); };
    var RK = [hr('#3a2a4a'), hr('#5a3e5a'), hr('#ffb080', 0.2), hr('#2a2438')];
    [[200, 10, 2.4], [236, 6, 1.6], [300, 14, 2.8], [330, 5, 1.4], [440, 8, 2]].forEach(function (q) { rocks(r, q[0], SEA + 0.6, q[1], q[2], rnd, RK); });
    profile(r, 20, 110, SEA + 0.5, function (t) { return (t < 0.5 ? 9 * smooth(0, 0.5, t) : 9 - 3 * smooth(0.5, 1, t)) * (1 - smooth(0.92, 1, t)) + Math.sin(t * 30) * 0.4; }, [hr('#3a2e4a'), hr('#4e3c5a'), hr('#ffb080', 0.15)]);
    loophole(r, 72, SEA - 8.4, 0.7, [hr('#3e3048'), hr('#5a4660'), hr('#ffb888', 0.15), hr('#2a2032')]);
    fisher(r, 260, SEA + 2.2, 0.55, [hr('#3a2a4a'), hr('#2a2038'), hr('#4a3a58'), hr('#3a2e48'), hr('#ffb080', 0.3)]);
    for (i = 0; i < 6; i++) gull(r, rnd() * SW, 40 + rnd() * 34, 0.45 + rnd() * 0.3, [hr('#3a2e48'), hr('#2a2038'), hr('#2a2038')]);
    L.push({ c: rf, f: 0.035 });

    /* Round the bay, the land comes out to a headland: pines dark along its
       top, a loophole tower on the granite point, and under the hill the
       long curve of the sea wall in grey granite, the coast road along it
       with its lamps coming on, granite cottages with their windows lit,
       the beach below gone gold and rose. The rest is open sea. */
    var by = strip(), b = by.getContext('2d');
    var hb = function (c, a) { return mix(c, hz, a === undefined ? 0.22 : a); };
    var HX = 296, HW = 260, WT2 = 101;
    var hf2 = function (xx) {
      var u = along(xx, HX) / HW;
      if (u > 1) return 999;
      return 104 - 22 * smooth(0, 0.22, u) * (1 - smooth(0.82, 1, u)) - wv(xx, 5, 1) * 1.6 * smooth(0.1, 0.3, u) - 6 * Math.exp(-Math.pow((u - 0.12) / 0.06, 2));
    };
    for (x = 0; x < SW; x += HP) { y = hf2(x); if (y > 200) continue; R(b, x, y, HP, 112 - y, hb('#5a4648')); R(b, x, y, HP, HP, hb('#ffb070', 0.1)); if (Math.sin(x * 1.7) > 0.3) R(b, x, y + HP, HP, HP, hb('#c88a6a', 0.15)); }
    // the pines along the top, flat-topped against the glow
    for (i = 0; i < 22; i++) {
      x = HX + 50 + rnd() * (HW - 80); var py = hf2(x); if (py > 200) continue;
      R(b, x - 0.5, py - 9, 1, 9, hb('#2a2028'));
      [[0, -10, 5], [-3, -8, 3.4], [3, -7.4, 3.6]].forEach(function (q) { pad(b, x + q[0], py + q[1], q[2], 1.6, 0.8, rnd, [hb('#1e1a22'), hb('#2e2a30'), hb('#c07a58', 0.15)]); });
    }
    // the granite point with its loophole tower
    rocks(b, HX + 28, 106, 40, 10, rnd, [hb('#4a3440'), hb('#7a5058'), hb('#ffa880', 0.1), hb('#3a3424')]);
    loophole(b, HX + 30, hf2(HX + 30) + 1.5, 1, [hb('#5a4252'), hb('#8a6a74'), hb('#ffc090', 0.08), hb('#2e2230')]);
    // the road along the top of the sea wall, its lamps, and the cottages behind
    var W0 = HX + 70, W1 = HX + HW - 10;
    for (x = W0 + 6; x < W1 - 14; x += 22 + rnd() * 16) {
      var cw2 = 12 + rnd() * 6, ch2 = 7 + rnd() * 2, cb2 = WT2;
      R(b, x, cb2 - ch2, cw2, ch2, hb(['#b89490', '#d0aca0', '#c4a0a4'][Math.floor(rnd() * 3)])); R(b, x + cw2 - 1, cb2 - ch2, 1, ch2, hb('#7a5a5a')); R(b, x, cb2 - ch2, HP, ch2, hb('#ffc8a0', 0.1));
      span(b, cb2 - ch2 - 4, cb2 - ch2 + HP, function (yy) { return x - 0.5 + (cb2 - ch2 - yy) * 0.8; }, function (yy) { return x + cw2 + 0.5 - (cb2 - ch2 - yy) * 0.8; }, hb('#3e3448'));
      R(b, x + 1, cb2 - ch2 - 6, 2, 3, hb('#8a6a68')); R(b, x + cw2 - 3, cb2 - ch2 - 5.6, 2, 3, hb('#8a6a68'));
      for (var wx2 = x + 2; wx2 < x + cw2 - 2; wx2 += 3.4) { var lit2 = rnd() > 0.35; R(b, wx2, cb2 - ch2 + 1.6, 1.8, 2, lit2 ? '#ffd27a' : hb('#3e3448')); if (lit2) glow(b, wx2 + 0.9, cb2 - ch2 + 2.6, 3, '#ffb860', 0.45); }
    }
    R(b, W0, WT2, W1 - W0, 2, hb('#5a4a5a'));
    for (x = W0 + 16; x < W1; x += 48) { lampPost(b, x, WT2 + 0.5, 9, [hb('#2a2030'), '#ffe8b0']); glow(b, x, WT2 - 9.4, 5, '#ffd080', 0.85); }
    // the wall, its granite in courses, curving down into the rocks at the point
    for (x = W0; x < W1; x += HP) { var wtop = WT2 + 2 + Math.max(0, (W0 + 10 - x)) * 0.3; R(b, x, wtop, HP, 110 - wtop, hb('#7a6a74')); R(b, x, wtop, HP, 1, hb('#e8b8a0', 0.1)); }
    for (y = WT2 + 4; y < 110; y += 1.6) for (x = W0 + (y * 7) % 5; x < W1; x += 3 + rnd() * 2.5) R(b, x, y, HP, 1.6, hb('#64566a'));
    for (j = 0; j < 6; j++) R(b, W0 + 90 + j * 1.4, WT2 + 2 + j * 1.3, 4.4, 1.3, hb('#a88c94'));
    L.push({ c: by, f: 0.07 });

    /* Cobo's rocks: great rounded boulders of the rose-red granite piled
       along the beach and out into the shallows, glowing in the last of the
       sun, the waves rolling in between them and breaking white. */
    var ck = strip(), c = ck.getContext('2d');
    var SH = 112;
    for (y = SH - 4; y < H; y += HP) { k = (y - SH + 4) / 30; R(c, 0, y, SW, HP, mix('#c87a8a', '#7a5a9a', Math.min(1, k))); }
    // the sun's road reaching in across the shallows
    for (y = SH - 4; y < SH + 10; y += HP) { if (rnd() < 0.3) continue; x = 60 + rnd() * 120; R(c, x, y, 1 + rnd() * 5, HP, rnd() > 0.4 ? '#ffd890' : '#ffb070'); }
    breaker(c, 0, 140, SH - 1, 2.4, ['#7a5a9a', '#a87aa8', '#f8c8c0', '#ffffff'], rnd);
    breaker(c, 150, 200, SH, 2.8, ['#7a5a9a', '#a87aa8', '#f8c8c0', '#ffffff'], rnd);
    breaker(c, 360, 152, SH - 0.5, 2.2, ['#7a5a9a', '#a87aa8', '#f8c8c0', '#ffffff'], rnd);
    // wet sand at the water's edge, holding the sky
    for (y = SH + 3; y < H; y += HP) { k = (y - SH - 3) / 16; R(c, 0, y, SW, HP, mix('#f4b49a', '#e0a088', Math.min(1, k))); }
    for (i = 0; i < 80; i++) { x = rnd() * SW; y = SH + 4 + rnd() * 12; c.globalAlpha = 0.6; R(c, x, y, 2 + rnd() * 8, HP, rnd() > 0.5 ? '#ffd8b8' : '#c88a9a'); c.globalAlpha = 1; }
    var PG = ['#8a4048', '#c8706a', '#ffb898', '#4a3a2a'];
    [[30, 36, 18], [96, 16, 8], [196, 46, 22], [256, 16, 9], [330, 30, 15], [430, 48, 21], [494, 18, 9]].forEach(function (q) { rocks(c, q[0], SH + 5 + (q[2] > 12 ? 2 : 0), q[1], q[2], rnd, PG); });
    // speckles of the granite's crystals, and the gold catching their tops
    for (i = 0; i < 300; i++) { x = rnd() * SW; y = SH - 10 + rnd() * 16; c.globalAlpha = 0.5; R(c, x, y, HP, HP, rnd() > 0.5 ? '#ffd0b0' : '#5a2a30'); c.globalAlpha = 1; }
    L.push({ c: ck, f: 0.13 });

    /* In front: the beach at low tide — rippled sand, rock pools holding
       the sunset, boulders hung with vraic, limpets, a crab's empty shell. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 0.9) * 1 + wv(xx, 7, 0.2) * 0.5; };
    land(n, nf, ['#c87a68', '#e8a084', '#ffd0a8'], 3);
    for (y = 124; y < H; y += 2) hline(n, 0, SW, function (xx) { return y + Math.sin(xx * 0.45 + y) * 0.4; }, '#d08a78', function (xx) { return Math.sin(xx * 0.2 + y * 1.3) > -0.3; });
    for (i = 0; i < 6; i++) { x = i * 86 + rnd() * 30; var pw = 10 + rnd() * 12; for (y = 123; y < 126.5; y += HP) R(n, x - pw / 2 + (y - 123) * 0.7, y, pw - (y - 123) * 1.4, HP, mix('#ffc890', '#a07ab8', (y - 123) / 3.5)); R(n, x - pw / 2 + 1.5, 123.5, pw * 0.4, HP, '#fff0d0'); }
    var NG = ['#6a3236', '#a85450', '#f09a80', '#4a4220'];
    [[60, 16, 7], [250, 22, 9], [400, 12, 5]].forEach(function (q) { rocks(n, q[0], nf(q[0]) + 3, q[1], q[2], rnd, NG); for (j = 0; j < q[1] / 2; j++) R(n, q[0] - q[1] / 2 + rnd() * q[1], nf(q[0]) + 2 - rnd() * q[2] * 0.4, 1, HP, '#d8d0c0'); });
    for (i = 0; i < 40; i++) { x = rnd() * SW; y = nf(x) + 2 + rnd() * 5; R(n, x, y, 1, HP, ['#fff4e8', '#f0c0a0', '#e8e0d0'][i % 3]); }
    L.push({ c: nr, f: 0.26 });
    return L;
  };
})();
