/* ==========================================================================
   backdropx2.js — Christmas Eve in Guernsey, the second half (levels 7–11):
   from dusk at Fort Grey, through the Town's lights coming on, a moonlit
   Shell Beach on Herm and Sark under all its stars, to midnight over the
   snowy rooftops of St Peter Port — and the two screens either side of the
   adventure: the harbour at dusk on Christmas Eve (the title) and a bright
   snowy Christmas morning (the ending).

   Each world's theme (its colours, ground, platforms, scenery, music, the
   little things on its ground and its light), the scenery props that stand
   on its ground, and the painted scenery behind it. Painted the same way as
   backdrop.js and backdrop6.js, with the kit (BB.bgKit): a graded sky, then
   layers that slide past slower the further away they are, each fainter
   and nearer the colour of the sky than the one in front; round things lit
   from the top left in three tones; fine detail at the screen's full
   density; every strip 512 game pixels wide and seamless at its ends.

   Cosy and twinkly, never spooky: the night worlds are blue rather than
   black, every window is warm, the moon is big and friendly, and the busy
   detail stays above or below the band Bonnie runs through. Everything is
   true of the real places, or else kept generic: no words anywhere, no
   brands, no church towers, no crosses (so no flags either).
   ========================================================================== */
(function () {
  'use strict';
  var A = BB.ART;

  /* ==========================================================================
     THEMES — tile palettes are [1, 2, 3, 4], light to dark. Dusk at Fort
     Grey (7), the blue hour in Town (8), moonlight on Herm (9), starlight
     on Sark (10), midnight over the rooftops (11); then the title's harbour
     at dusk and the ending's Christmas morning.
     ========================================================================== */
  var THEMES = {
    // 7 · Fort Grey at dusk: granite shore rocks, whitewashed blocks, shipwreck-timber blocks, a jetty's planks
    fortgrey: {
      sky: ['#2a2a70', '#6a56a6', '#ffa89c'], ground: 'rock', gpal: ['#e2cad8', '#a28cac', '#6a5a80', '#2c2442'],
      brick: ['#fff6fa', '#e2d4ea', '#a898c0', '#443a5e'], hard: ['#f0bc8c', '#b47c4c', '#784a2a', '#301a0c'],
      semi: 'bridge', spal: ['#e8b48a', '#a8764c', '#6a4628', '#2c1a0c'], column: 'sandcastle',
      deco: ['x2anchor', 'x2lobsterpot', 'x2cannon', 'x2dinghy', 'x2vraic', 'x2wheel'], bg: 'fortgrey', music: 'fortgrey', sea: true
    },
    // 8 · the Town at the blue hour: granite setts, Christmas-red blocks, granite blocks, green-painted planks
    townlights: {
      sky: ['#141e58', '#2c4894', '#7aa2d8'], ground: 'stone', gpal: ['#cacce4', '#8c90b4', '#5a5e84', '#22243e'],
      brick: ['#ffb4b0', '#e2484e', '#a0202e', '#3e0c18'], hard: ['#dcd8e8', '#a8a4c0', '#706c90', '#2c2a40'],
      semi: 'bridge', spal: ['#9ad8b4', '#4a9a7a', '#2a6050', '#10281e'], column: 'chimney',
      deco: ['x2lamp', 'x2shoptree', 'x2barrow', 'x2parcels', 'x2bench'], bg: 'townlights', music: 'townlights'
    },
    // 9 · Shell Beach by moonlight: pale moonlit sand, shell-pink blocks, granite blocks, driftwood planks
    herm: {
      sky: ['#121a4a', '#2a3a7a', '#6878b6'], ground: 'sand', gpal: ['#f6f2ff', '#d2cce8', '#9c94bc', '#4c466c'],
      brick: ['#ffe2ee', '#f2a8c8', '#b86894', '#4a1e3a'], hard: ['#ccd0e4', '#9298b8', '#5e6488', '#262a42'],
      semi: 'bridge', spal: ['#dcd2cc', '#a29690', '#6a5e5a', '#2c2624'], column: 'sandcastle',
      deco: ['x2marram', 'x2shells', 'x2dinghy', 'x2driftwood', 'x2marram', 'x2lobsterpot'], bg: 'herm', music: 'herm', sea: true, dark: true
    },
    // 10 · Sark by starlight: night turf, moonlit granite blocks, hay-bale blocks, hedge branches
    sark: {
      sky: ['#10163e', '#222c66', '#46528e'], ground: 'grass', gpal: ['#86c8a0', '#3e8070', '#463c62', '#1c1832'],
      brick: ['#d8d0ec', '#a69cc4', '#6c6494', '#2a2444'], hard: ['#fff0a8', '#e6be5c', '#a67c2e', '#46300e'],
      semi: 'branch', spal: ['#b49a7c', '#7c6248', '#4c3a2a', '#1e140c'], column: 'stump',
      deco: ['x2haybale', 'x2bike', 'x2signpost', 'x2gorse', 'x2lantern', 'x2gorse'], bg: 'sark', music: 'sark', dark: true
    },
    // 11 · over the rooftops at midnight: snow underfoot, chimney-brick blocks, slate blocks, icy gutters
    rooftops: {
      sky: ['#0e1442', '#24306e', '#5c6aa8'], ground: 'snow', gpal: ['#ffffff', '#d6e2fc', '#8494cc', '#38427a'],
      brick: ['#f4a890', '#c45e4a', '#84382c', '#30100c'], hard: ['#acb6da', '#6e7aaa', '#464e7a', '#1c2240'],
      semi: 'ice', spal: ['#ffffff', '#cadcff', '#7e94cc', '#2c3a6c'], column: 'chimney',
      deco: ['x2chimney', 'x2aerial', 'x2dormer', 'x2vane', 'x2chimney'], bg: 'rooftops', music: 'rooftops', dark: true
    },
    // the title: St Peter Port harbour at dusk on Christmas Eve — frosty quay granite, red blocks, granite blocks
    xtitle: {
      sky: ['#1a1c5c', '#46408e', '#f0a0b4'], ground: 'stone', gpal: ['#e2e0f0', '#a4a2c2', '#6a688c', '#2a2842'],
      brick: ['#ffb4b0', '#e2484e', '#a0202e', '#3e0c18'], hard: ['#dcd8e8', '#a8a4c0', '#706c90', '#2c2a40'],
      semi: 'bridge', spal: ['#9ad8b4', '#4a9a7a', '#2a6050', '#10281e'], column: 'chimney',
      deco: ['x2lamp', 'x2anchor', 'x2shoptree'], bg: 'xtitle', music: 'xtitle'
    },
    // the ending: Christmas morning after the snow — snow, Christmas-red blocks, pink granite blocks, icy planks
    xmorning: {
      sky: ['#3a8ae6', '#86c4f4', '#e6f6ff'], ground: 'snow', gpal: ['#ffffff', '#e2f0ff', '#94bce4', '#5078a8'],
      brick: ['#ffb4b0', '#e2484e', '#a0202e', '#3e0c18'], hard: ['#eadcd8', '#bea8a6', '#86706c', '#3a2c2a'],
      semi: 'ice', spal: ['#ffffff', '#d0ecff', '#86bce4', '#3a70a0'], column: 'snowstump',
      deco: ['x2shoptree', 'x2gorse', 'x2signpost'], bg: 'xmorning', music: 'xending'
    }
  };
  // the little things on the ground (A.tiny names), what hangs beneath it, and each world's light (see art.js, light.js)
  var TINY = {
    fortgrey: ['pebble', 'shell', 'seagrass', 'moss', 'pebble'],
    townlights: ['pebble', 'moss', 'pebble'],
    herm: ['shell', 'seagrass', 'shell', 'pebble', 'shell'],
    sark: ['tuft', 'flowerY', 'tuft', 'clover', 'berries', 'tuft'],
    rooftops: ['snowTuft', 'moss', 'snowTuft'],
    xtitle: ['pebble', 'snowTuft'],
    xmorning: ['snowTuft', 'berries', 'snowTuft', 'pebble']
  };
  var HANG = {
    fortgrey: ['kelp', ['#3a5a40', '#6a9a62', '#24402a']],
    townlights: ['vines', ['#2c5a3e', '#5e9a5c', '#3a3044']],
    herm: ['roots', ['#a89cb8', '#d4cce0', '#6a6080']],
    sark: ['roots', ['#4a4062', '#7a6a9a', '#2a2440']],
    rooftops: ['icicles', ['#c8dcff', '#ffffff', '#8098d0']],
    xtitle: ['icicles', ['#c8dcff', '#ffffff', '#8098d0']],
    xmorning: ['icicles', ['#c8ecff', '#ffffff', '#88b8e0']]
  };
  /* The light goes on with the evening: the last of the sunset slanting in
     at Fort Grey, then a soft dusk with pools of light round every lamp and
     lantern (and round Bonnie) as night comes on — moonbeams on Herm and
     over the rooftops, none at all on Sark, where it's the stars' turn. The
     night worlds stay light enough to play: their dusk is no deeper than
     Half Term's graveyard or firework night. Christmas morning is all sun. */
  var LIGHT = {
    fortgrey: { dark: { col: '#1c0c32', a: 0.14 }, rays: { col: '#ffb4a0', a: 0.22 }, motes: '#ffd8e0' },
    townlights: { dark: { col: '#0c1030', a: 0.2 }, motes: '#ffe0a0' },
    herm: { dark: { col: '#080c2a', a: 0.26 }, rays: { col: '#d0dcff', a: 0.22 }, motes: '#e0f0ff' },
    sark: { dark: { col: '#0a0828', a: 0.3 }, motes: '#fff8e0' },
    rooftops: { dark: { col: '#0a0c2c', a: 0.26 }, rays: { col: '#d8e4ff', a: 0.2 }, motes: '#ffffff' },
    xtitle: { dark: { col: '#140c30', a: 0.12 }, motes: '#ffe8c8' },
    xmorning: { rays: { col: '#fffbe8', a: 0.34 }, motes: '#ffffff' }
  };
  if (A && A.themes) Object.keys(THEMES).forEach(function (k) {
    var th = A.themes[k] = THEMES[k];
    th.tiny = TINY[k]; th.hang = HANG[k]; th.light = LIGHT[k];
  });

  /* ==========================================================================
     THE SCENERY — the props that stand on each world's ground, behind
     everything you touch (A.deco; every name starts x2). Drawn in the same
     hand as creatures.js: round soft shapes lit from the top left, each
     shade from a five-tone ramp (deep, shade, base, light, shine), a
     coloured outline. Like the land files, this keeps its own palette and
     copies of the drawing helpers it needs, so it depends only on
     BB.ART.kit. (Before the backdrops, so the sprite sheet can show them
     even where the painting kit isn't loaded.)
     ========================================================================== */
  if (A && A.kit && A.deco) (function () {
    var Kt = A.kit, D = A.deco, ell = Kt.ell, cap = Kt.cap, limb = Kt.limb, rrect = Kt.rrect;
    // creatures.js's palette, copied, so the outline and the shared tones match exactly
    var PAL = {
      '#': '#1c1428', w: '#ffffff', W: '#dfe2f2', E: '#1d1a3c',
      4: '#b8200c', 5: '#ff5a1c', 6: '#ff9a2c', 7: '#ffd85a', 8: '#fffbe0'
    };
    // this file's ramps (deep, shade, base, light, shine) take characters from U+0100 on
    var next = 0x100;
    var ramp = function (cols) { var s = ''; for (var i = 0; i < cols.length; i++) { var ch = String.fromCharCode(next++); PAL[ch] = cols[i]; s += ch; } return s; };
    var RUST = ramp(['#2a1a1e', '#4e3232', '#76504a', '#a07a66', '#d0aa90']);     // an old anchor, salt-rusted
    var IRON = ramp(['#141420', '#262636', '#3e3e52', '#626278', '#a0a0b8']);     // a cannon's black iron
    var WOOD = ramp(['#3a2010', '#6a3e1e', '#9a6232', '#c88e52', '#ecc88e']);
    var DRIFT = ramp(['#46404c', '#746c7c', '#a49ca8', '#ccc4cc', '#f0eaee']);    // wood the sea has bleached silver
    var ROPE = ramp(['#5a4020', '#86683a', '#b4945a', '#dcc08a', '#f6e6c4']);
    var WITHY = ramp(['#4a3014', '#7a5226', '#a87a3e', '#d0a862', '#f2da9a']);    // willow, for pots and baskets
    var HULL = ramp(['#4e5a7a', '#8c98b6', '#cfd8ea', '#f2f6ff', '#ffffff']);     // a white-painted boat
    var BLUE = ramp(['#0e2656', '#1c4690', '#2e6cce', '#64a2f0', '#b8dcff']);     // boat paint, and Guernsey blue
    var RED = ramp(['#560c18', '#941c28', '#d03a3a', '#f47060', '#ffb8a4']);
    var HOLLY = ramp(['#0a2c16', '#145024', '#227a38', '#46a852', '#a0e08e']);
    var PINE = ramp(['#0c2a20', '#164438', '#23644c', '#3e8a62', '#8cc8a0']);
    var GOLD = ramp(['#7a4a08', '#b8800c', '#e8b020', '#ffd860', '#fff4c0']);
    var WEED = ramp(['#1a2410', '#34401a', '#55602a', '#808a3e', '#b4b870']);     // bladderwrack, olive
    var KELP = ramp(['#281a0c', '#483214', '#6c4e22', '#98763a', '#c8a868']);     // oarweed, brown
    var MARRAM = ramp(['#383e20', '#5c6630', '#8a9248', '#b8bc6a', '#e6e2a0']);
    var SAND = ramp(['#86705a', '#b8a084', '#dcc8a8', '#f2e4c8', '#fffaf0']);
    var SHELL = ramp(['#98585a', '#d08a86', '#f2bcb0', '#ffe2d8', '#ffffff']);
    var CREAM = ramp(['#8a7a68', '#c0b09c', '#e8dcc8', '#f8f0e2', '#ffffff']);
    var STRAW = ramp(['#6a4a14', '#9a7428', '#c8a040', '#e8cc78', '#fff0bc']);
    var GORSE = ramp(['#182e18', '#284824', '#406836', '#628c4a', '#a2c47c']);
    var FLOWER = ramp(['#a87010', '#e0a018', '#ffd030', '#ffe878', '#fffbe0']);   // gorse in flower, any month
    var BRICK = ramp(['#481810', '#782c20', '#a6463a', '#cc6e5e', '#eea494']);
    var POT = ramp(['#58240e', '#88401c', '#bc622c', '#e49250', '#ffc890']);      // terracotta chimney pots
    var SNOW = ramp(['#5a6aa0', '#9aaad8', '#d6e2fc', '#f2f6ff', '#ffffff']);
    var SLATE = ramp(['#1c2238', '#2e3652', '#465070', '#68749a', '#a0aed0']);
    var STEEL = ramp(['#2c3246', '#4c546c', '#788096', '#a8b0c2', '#e0e6f0']);
    var LAMPI = ramp(['#0e1a18', '#1a2c28', '#2a443e', '#486a5e', '#88a898']);    // a lamp post's green-black iron
    var BENCH = ramp(['#0e2c1c', '#1a462c', '#2a6842', '#4a9060', '#9acc9a']);
    var GLOW = ramp(['#b0600c', '#e89a30', '#ffc860', '#ffe8a0', '#fffbe8']);     // warm lit glass
    var PAPER = [RED, BLUE, GOLD, HOLLY, ramp(['#4a1a5a', '#74308a', '#a050b8', '#cc86e0', '#f2d0ff'])];

    // a round shape lit from the top left and a little in front
    var orb = function (cx, cy, rx, ry, t) {
      return function (x, y) {
        var dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, n = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
        var i = -0.48 * dx - 0.58 * dy + 0.66 * n;
        return i > 0.9 ? t[4] : i > 0.6 ? t[3] : i > 0.22 ? t[2] : i > -0.12 ? t[1] : t[0];
      };
    };
    // a drum standing upright, lit from the left: by column only
    var cyl = function (x0, x1, t) { return function (x) { var u = (x + 0.5 - x0) / (x1 - x0); return u < 0.14 ? t[3] : u < 0.5 ? t[2] : u < 0.84 ? t[1] : t[0]; }; };
    /* A part: its colour, its inside test, a texture, the line where it
       crosses a part behind it, and rim, a colour for its outer edge in place
       of the dark outline (for things too thin to outline: spokes, aerials). */
    var P = function (c, f, tex, line, rim) { return { c: c, f: f, tex: tex, line: line || null, rim: rim || null }; };
    var O = function (cx, cy, rx, ry, t, line) { return P(t[2], ell(cx, cy, rx, ry), orb(cx, cy, rx, ry, t), line); };
    var or = function () { var fs = arguments; return function (x, y) { for (var i = 0; i < fs.length; i++) if (fs[i](x, y)) return true; return false; }; };
    var minus = function (a, b) { return function (x, y) { return a(x, y) && !b(x, y); }; };
    var and = function (a, b) { return function (x, y) { return a(x, y) && b(x, y); }; };
    var tri = function (ax, ay, bx, by, cx, cy) {
      return function (x, y) {
        var s1 = (x - bx) * (ay - by) - (ax - bx) * (y - by), s2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy), s3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay);
        return !((s1 < 0 || s2 < 0 || s3 < 0) && (s1 > 0 || s2 > 0 || s3 > 0));
      };
    };
    var ringT = function (cx, cy, r, w) { return function (x, y) { var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)); return Math.abs(d - r) <= w; }; };
    var turned = function (f, px, py, a) { var c = Math.cos(a), s = Math.sin(a); return function (x, y) { var dx = x - px, dy = y - py; return f(px + dx * c + dy * s, py - dx * s + dy * c); }; };
    // a leaf or blade: from (ax, ay) out to (bx, by), w wide at its widest
    var blade = function (ax, ay, bx, by, w) {
      var dx = bx - ax, dy = by - ay, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
      return function (x, y) { var px = x - ax, py = y - ay, t = (px * ux + py * uy) / L, d = Math.abs(-px * uy + py * ux); return t >= 0 && t <= 1 && d <= w * Math.sin(Math.PI * Math.pow(t, 0.7)); };
    };
    var hash = function (x, y, k) { var h = Math.sin(x * 12.9898 + y * 78.233 + (k || 0) * 37.719) * 43758.5453; return h - Math.floor(h); };
    // paint rows anywhere, even off the figure ('.' keeps what's there): sparkles and glows that want no outline
    var put = function (rows, x, y, list) {
      x = Math.round(x); y = Math.round(y);
      list.forEach(function (str, i) {
        var Y = y + i;
        if (Y < 0 || Y >= rows.length) return;
        var r = rows[Y].split('');
        for (var k = 0; k < str.length; k++) if (str[k] !== '.' && x + k >= 0 && x + k < r.length) r[x + k] = str[k];
        rows[Y] = r.join('');
      });
    };
    /* build(W, H, parts, stamps, free): the scene, then the stamps (detail on
       the figure), then the free paint (glows and sparkles off it); then it's
       settled onto its bottom row, since every prop stands on the ground. */
    // the kit's scene, with the part's rim (if it has one) on its outer edge instead of '#'
    var scene = function (W, H, parts) {
      var own = [], x, y, i;
      for (y = 0; y < H; y++) for (x = 0; x < W; x++) { var top = -1; for (i = 0; i < parts.length; i++) if (parts[i].f(x + 0.5, y + 0.5)) top = i; own.push(top); }
      var at = function (x, y) { return x < 0 || y < 0 || x >= W || y >= H ? -1 : own[y * W + x]; };
      var rows = [];
      for (y = 0; y < H; y++) {
        var r = '';
        for (x = 0; x < W; x++) {
          var k = at(x, y);
          if (k < 0) { r += '.'; continue; }
          var Pk = parts[k], n = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)];
          if (n.indexOf(-1) > -1) r += Pk.rim || '#';
          else if (Pk.line && n.some(function (j) { return j < k; })) r += Pk.line;
          else r += Pk.tex ? Pk.tex(x, y) : Pk.c;
        }
        rows.push(r);
      }
      return rows;
    };
    var build = function (W, H, parts, stamps, free) {
      var rows = scene(W, H, parts);
      (stamps || []).forEach(function (s) { Kt.stamp(rows, Math.round(s[0]), Math.round(s[1]), s[2]); });
      (free || []).forEach(function (s) { put(rows, s[0], s[1], s[2]); });
      var n = 0;
      while (n < H - 1 && !/[^.]/.test(rows[H - 1 - n])) n++;
      if (n) rows = new Array(n + 1).join('.').split('').map(function () { return new Array(W + 1).join('.'); }).concat(rows.slice(0, H - n));
      var sp = BB.sprHi(rows, PAL, 'shade');
      sp.noLight = 'all';
      return sp;
    };
    var names = [];
    var deco = function (name, v) { D[name] = v; names.push(name); };

    // a five-pointed star (a tree's star, a starfish): n points, tips R out, valleys r
    var star = function (cx, cy, Rr, r, rot, n) {
      n = n || 5;
      var seg = Math.PI * 2 / n;
      return function (x, y) { var dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy), t = (((Math.atan2(dy, dx) - rot) % seg) + seg) % seg / seg, k = Math.abs(t - 0.5) * 2; return d <= r + (Rr - r) * k * k; };
    };
    // a spoked wheel: the tyre, n spokes, the hub. Parts, so it can sit among others
    var wheel = function (cx, cy, r, rim, spoke, hub, n) {
      var sp = [];
      for (var k = 0; k < n; k++) { var a = k / n * Math.PI * 2 + 0.3; sp.push(cap(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.4)); }
      return [P(spoke[2], or.apply(null, sp), null, null, spoke[1]), P(rim[2], ringT(cx, cy, r, 0.95), orb(cx - 1, cy - 1, r + 1, r + 1, rim), null, rim[0]), O(cx, cy, Math.max(1.2, r * 0.18), Math.max(1.2, r * 0.18), hub, hub[0])];
    };

    /* ---- 7 · Fort Grey and Rocquaine: the shipwreck museum's things, and the shore's ---- */
    // an old ship's anchor left leaning on a rock on the shore, salt-rusted, its rope wound round the
    // shank (leaning, not upright: stood straight up, its stock and shank would make a cross)
    var lean = function (f) { var t = turned(f, 14, 31, 0.5); return function (x, y) { return t(x - 4, y + 1); }; };
    deco('x2anchor', build(38, 34, [
      P(SLATE[2], or(ell(31, 33, 7, 9), ell(35, 33.6, 4, 5)), function (x, y) { return hash(x, y, 6) > 0.86 ? GOLD[2] : orb(28, 26, 10, 10, SLATE)(x, y); }, SLATE[0]),
      P(RUST[2], lean(or(ringT(14, 4, 2.6, 1), rrect(12.6, 6, 15.4, 30.4, 1.2), rrect(4.6, 8.4, 23.4, 10.8, 1.1), ell(4.2, 9.6, 1.6, 1.6), ell(23.8, 9.6, 1.6, 1.6),
        function (x, y) { var d = Math.sqrt((x - 14) * (x - 14) + (y - 21.4) * (y - 21.4)); return y > 21 && Math.abs(d - 8.6) < 1.5; },
        turned(ell(5.4, 19.4, 1.9, 3.2), 5.4, 19.4, -0.5), turned(ell(22.6, 19.4, 1.9, 3.2), 22.6, 19.4, 0.5))), function (x, y) {
        var t = orb(12, 10, 22, 24, RUST)(x, y);
        return hash(x, y, 3) > 0.9 ? RUST[1] : hash(x, y, 4) > 0.93 ? RUST[3] : t;
      }, RUST[0]),
      P(ROPE[2], lean(or(cap(10.4, 13.4, 17.6, 15.4, 0.8), cap(10.4, 16.4, 17.6, 18.4, 0.8), cap(17.4, 18.4, 19.4, 24, 0.7), cap(19.4, 24, 18.6, 27.6, 0.6))), function (x, y) { return (x + y) % 3 === 0 ? ROPE[1] : y % 3 ? ROPE[3] : ROPE[2]; }, ROPE[0]),
      P(WEED[2], or(ell(8, 33, 5, 1.6), ell(26, 33.2, 6, 1.4), ell(35, 32.4, 2, 1.8)), function (x, y) { return (x * 3 + y) % 4 ? WEED[2] : WEED[3]; }, WEED[0])
    ]));
    // a ship's wheel saved from a wreck, on a stand
    deco('x2wheel', build(32, 42, wheel(16, 14, 9.6, WOOD, WOOD, GOLD, 8).concat([
      P(WOOD[2], or.apply(null, [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) { var a = k / 8 * Math.PI * 2 + 0.3; return or(cap(16 + Math.cos(a) * 10.6, 14 + Math.sin(a) * 10.6, 16 + Math.cos(a) * 13.2, 14 + Math.sin(a) * 13.2, 0.9), ell(16 + Math.cos(a) * 13.6, 14 + Math.sin(a) * 13.6, 1.3, 1.3)); })), orb(12, 8, 18, 18, WOOD), WOOD[0]),
      P(WOOD[2], or(rrect(14.4, 20, 17.6, 39, 1), rrect(8, 37.4, 24, 42, 1.4)), function (x, y) { return y > 37 ? (y < 39 ? WOOD[3] : WOOD[1]) : x < 15.4 ? WOOD[3] : WOOD[2]; }, WOOD[0])
    ]).concat([O(16, 14, 2.4, 2.4, GOLD, GOLD[0])])));
    // a crab pot of woven willow, the old "inkwell" kind, with its rope and float
    deco('x2lobsterpot', build(30, 22, [
      P(ROPE[2], or(cap(22, 10, 26, 14, 0.6), cap(26, 14, 27, 18, 0.6)), null, ROPE[1]),
      P(WITHY[2], minus(and(ell(13, 15, 11.6, 9), function (x, y) { return y < 21.6; }), ell(13, 6.6, 3.2, 1.4)), function (x, y) {
        var t = orb(9, 9, 16, 14, WITHY)(x, y);
        // woven: the rods running round it, the stakes up it
        if (y % 3 === 0) return WITHY[Math.max(0, WITHY.indexOf(t) - 1)];
        return (x + Math.floor(y / 3)) % 4 === 0 ? WITHY[Math.max(0, WITHY.indexOf(t) - 1)] : t;
      }, WITHY[0]),
      P(WITHY[1], ringT(13, 6.8, 3.4, 0.7), null, WITHY[0]),
      P(WITHY[0], ell(13, 6.8, 2.6, 0.9)),
      O(27.4, 18.8, 2.4, 2.4, RED, RED[0])
    ], [[25, 17, [RED[4]]]]));
    // a cannon from the fort's battery on its wooden carriage, cannonballs piled by it
    deco('x2cannon', build(48, 26, [
      P(IRON[2], function (x, y) { if (x < 4 || x > 33) return false; var t = (x - 4) / 29, r = 2.4 + t * 1.4, cy = 10 + t * 1.4; return Math.abs(y - cy) < r; }, function (x, y) { var t = (x + 0.5 - 4) / 29, cy = 10 + t * 1.4, u = (y + 0.5 - cy) / (2.4 + t * 1.4); return u < -0.45 ? IRON[3] : u < 0.2 ? IRON[2] : u < 0.7 ? IRON[1] : IRON[0]; }, IRON[0]),
      P(IRON[3], or(rrect(3, 6.8, 5, 13.4, 0.6), rrect(20, 7.4, 21.4, 15.4, 0.4), ell(34.6, 11.4, 1.6, 1.6)), null, IRON[1]),
      P(WOOD[2], or(rrect(14, 13, 36, 18.4, 1), rrect(26, 10.6, 36, 13.4, 0.8)), function (x, y) { return y < 14 || (y < 12 && x > 26) ? WOOD[3] : y > 17 ? WOOD[1] : WOOD[2]; }, WOOD[0])
    ].concat(wheel(18, 20.6, 4.6, WOOD, WOOD, IRON, 6), wheel(32, 21.2, 4, WOOD, WOOD, IRON, 6), [
      O(40, 23.6, 2.3, 2.3, IRON, IRON[0]), O(44.6, 23.6, 2.3, 2.3, IRON, IRON[0]), O(42.3, 19.8, 2.3, 2.3, IRON, IRON[0])
    ])));
    // a little clinker dinghy pulled up above the tide, oars shipped
    var sheer = function (x) { var u = (x - 27) / 25; return 9 - 4.6 * u * u - (x < 27 ? 1.4 * u * u : 0); };
    var keel = function (x) { var u = (x - 27) / 25; return 9 + 12 * Math.sqrt(Math.max(0, 1 - u * u)); };
    deco('x2dinghy', build(54, 26, [
      P(SAND[2], ell(27, 24.4, 25, 3.4), function (x, y) { return (x * 7 + y * 3) % 9 === 0 ? SAND[1] : y < 24 ? SAND[3] : SAND[2]; }, SAND[1]),
      P(WOOD[2], or(cap(8, 3.4, 44, 7.4, 0.7), cap(12, 2.2, 47, 6.4, 0.7), ell(45.8, 7.2, 2.6, 1), ell(48.4, 6.2, 2.6, 1)), null, WOOD[0]),
      P(HULL[2], function (x, y) { return x > 2 && x < 49.6 && y > sheer(x) && y < keel(x); }, function (x, y) {
        var X = x + 0.5, Y = y + 0.5, s = sheer(X), k = keel(X), u = (X - 27) / 25;
        if (Y - s < 1.6) return Y - s < 0.8 ? WOOD[3] : WOOD[1];
        if (Y - s < 4) return u < -0.6 ? BLUE[3] : BLUE[2];
        if (k - Y < 3.4) return SLATE[u < -0.3 ? 3 : 2];
        if (Math.floor((Y - s - 4) / 2.6) !== Math.floor((Y - s - 3.4) / 2.6)) return HULL[1];
        return u < -0.55 ? HULL[4] : u < 0.5 ? HULL[3] : HULL[2];
      }, HULL[0]),
      P(WOOD[2], rrect(47.6, 4.4, 50, 15, 0.6), null, WOOD[0])
    ]));
    // a heap of vraic left on the rocks by the tide: bladderwrack and oarweed, olive and brown
    deco('x2vraic', build(46, 22, (function () {
      var parts = [P(SLATE[2], or(ell(13, 19, 11, 7), ell(33, 20, 10, 5.4)), orb(9, 14, 18, 12, SLATE), SLATE[0])], rs = BB.rng(31);
      // fronds draped over the rocks, falling either side of where they caught
      for (var i = 0; i < 18; i++) {
        var fx = 4 + rs() * 38, top = (fx < 24 ? 12 + Math.abs(fx - 13) * 0.35 : 14.6 + Math.abs(fx - 33) * 0.3) - rs() * 1.6, side = rs() > 0.5 ? 1 : -1, tt = i % 3 ? WEED : KELP;
        parts.push(P(tt[2], blade(fx, top, fx + side * (2 + rs() * 4), 21.6, 1.4 + rs() * 0.8), function (x, y) { return y < 15 ? tt[3] : (x + y) % 4 ? tt[2] : tt[1]; }, tt[0]));
      }
      // bladders on the wrack
      [[9, 14.6], [16, 15], [21, 17], [29, 16.6], [36, 17.4], [12, 18.4], [33, 19.4]].forEach(function (b) { parts.push(P(WEED[3], ell(b[0], b[1], 1, 0.9), function (x, y) { return y + 0.5 < b[1] ? WEED[4] : WEED[3]; }, WEED[1])); });
      parts.push(P(SHELL[2], or(ell(43, 21, 1.8, 1.1), ell(43, 20.4, 1.1, 0.9)), orb(42, 20, 2, 2, SHELL), SHELL[1]));
      return parts;
    })()));

    /* ---- 8 · Town Lights ---- */
    // an old street lamp of the town: a fluted iron post, a four-paned lantern lit, a wreath with a red bow
    deco('x2lamp', build(22, 76, [
      P(LAMPI[2], or(rrect(9.4, 22, 12.6, 68, 1), rrect(5.6, 66, 16.4, 72, 1.4), rrect(4, 71, 18, 76, 1.4), rrect(8.4, 40, 13.6, 42, 0.8), rrect(8.4, 56, 13.6, 58, 0.8), rrect(8.6, 20.4, 13.4, 23, 0.6), rrect(8, 28, 14, 30, 0.8)), function (x, y) { var t = orb(8, 30, 6, 46, LAMPI)(x, y); return y > 23 && y < 66 && x === 10 ? LAMPI[3] : t; }, LAMPI[0]),
      P(GLOW[2], function (x, y) { return y > 8 && y < 20.6 && Math.abs(x - 11) < 5.4 - (20.6 - y) / 12.6 * 1.4; }, function (x, y) { return x === 10 || x === 11 || y === 14 ? LAMPI[2] : orb(9, 11, 6, 10, GLOW)(x, y); }, LAMPI[1]),
      P(LAMPI[2], or(rrect(4.4, 6.4, 17.6, 8.8, 0.8), tri(5.4, 6.8, 16.6, 6.8, 11, 1.6), ell(11, 1.6, 1.2, 1.2), rrect(5.4, 19.6, 16.6, 21.4, 0.6)), orb(9, 3, 8, 6, LAMPI), LAMPI[0]),
      P(HOLLY[2], ringT(11, 47, 3.4, 1.7), function (x, y) { return hash(x, y, 7) > 0.8 ? HOLLY[3] : hash(x, y, 8) > 0.85 ? HOLLY[1] : orb(9, 45, 6, 6, HOLLY)(x, y); }, HOLLY[0]),
      P(RED[2], or(tri(11, 51, 7.4, 49, 7.8, 53.4), tri(11, 51, 14.6, 49, 14.2, 53.4), cap(10.4, 51.6, 9, 55.8, 0.6), cap(11.6, 51.6, 13, 55.8, 0.6), ell(11, 51.2, 1, 1)), orb(10, 49, 4, 4, RED), RED[0])
    ], [[8, 44, [RED[3]]], [14, 46, [RED[3]]], [9, 48, [RED[3]]]]));
    // a Christmas tree in a tub by a shop door: baubles, a star on top, lights that twinkle (two frames)
    deco('x2shoptree', [0, 1].map(function (f) {
      var tier = function (cy, hw, hh) { return function (x, y) { return y > cy - hh && y < cy && Math.abs(x - 14) < hw * (y - cy + hh) / hh + 0.2 * Math.sin(x * 2); }; };
      var tree = or(tier(18, 6.6, 12), tier(28, 9, 12), tier(38, 11.4, 12));
      var bulbs = [[11, 12], [16.4, 15], [9.6, 21], [14, 23.6], [19, 25.6], [7.4, 31], [12.6, 33], [17.6, 34.6], [21.4, 35], [5.6, 36]];
      var baubles = [[13, 16.6, RED], [8, 26, GOLD], [18, 22, BLUE], [11, 36, RED], [20, 31, GOLD], [5, 33.4, BLUE]];
      var parts = [
        P(WOOD[2], or(rrect(7.4, 38, 20.6, 48, 1.2), rrect(6.4, 37.4, 21.6, 39.4, 0.8)), function (x, y) { return y === 41 || y === 45 ? IRON[2] : x < 9 ? WOOD[3] : x > 18 ? WOOD[1] : (x % 3 === 0 ? WOOD[1] : WOOD[2]); }, WOOD[0]),
        P(PINE[2], tree, function (x, y) { var X = x + 0.5, Y = y + 0.5, band = (Y - 6) % 10; var t = orb(10, 12, 14, 30, PINE)(x, y); return band > 8.4 ? PINE[1] : hash(x, y, 2) > 0.86 ? PINE[3] : t; }, PINE[0])
      ];
      baubles.forEach(function (b) { parts.push(O(b[0], b[1], 1.6, 1.6, b[2], b[2][0])); });
      parts.push(P(GOLD[2], star(14, 4.4, 4.4, 1.9, -Math.PI / 2), orb(12, 2, 6, 6, GOLD), GOLD[0]));
      var free = bulbs.map(function (b, i) { return [b[0], b[1], [(i + f) % 2 ? '8' : ['5', '7', '6'][i % 3]]]; });
      return build(28, 48, parts, [], free);
    }));
    // a market barrow piled with holly and mistletoe, two wreaths propped on its side
    deco('x2barrow', build(48, 34, [
      P(WOOD[2], or(cap(1, 15, 12, 17.6, 0.9), cap(1, 18.4, 12, 20, 0.9), cap(10, 20, 10, 33, 0.9)), null, WOOD[0]),
      P(HOLLY[2], or(ell(14, 11, 5, 4), ell(22, 9, 6, 5), ell(31, 10, 5.6, 4.4), ell(37.6, 12, 4, 3.4), ell(26, 12, 6, 3)), function (x, y) {
        // holly leaves, glossy, every which way
        return hash(x, y, 11) > 0.84 ? HOLLY[4] : hash(x, y, 12) > 0.7 ? HOLLY[1] : orb(18, 6, 22, 10, HOLLY)(x, y);
      }, HOLLY[0]),
      P(WOOD[2], or(rrect(8, 13.6, 42, 22, 1)), function (x, y) { return y < 15 ? WOOD[3] : y > 20.6 ? WOOD[1] : (x % 6 === 0 ? WOOD[1] : WOOD[2]); }, WOOD[0]),
      P(HOLLY[2], ringT(17, 18.6, 3.4, 1.4), function (x, y) { return hash(x, y, 5) > 0.8 ? HOLLY[3] : HOLLY[2]; }, HOLLY[0]),
      P(PINE[2], ringT(26, 18.4, 3.2, 1.3), function (x, y) { return hash(x, y, 6) > 0.8 ? PINE[3] : PINE[2]; }, PINE[0])
    ].concat(wheel(36, 25.6, 7.6, WOOD, WOOD, IRON, 8)), [[12, 8, [RED[3]]], [19, 6, [RED[3]]], [24, 10, [RED[2]]], [29, 7, [RED[3]]], [35, 9, [RED[3]]], [21, 11, [RED[2]]], [16, 21, [RED[3]]], [33, 6, ['w']], [34, 7, ['W']], [39, 10, ['w']]]));
    // a pile of presents, wrapped and ribboned, waiting by a door
    deco('x2parcels', build(30, 28, (function () {
      var box = function (x0, y0, x1, y1, paper, ribbon) {
        var mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
        return P(paper[2], rrect(x0, y0, x1, y1, 0.8), function (x, y) {
          var X = x + 0.5, Y = y + 0.5;
          // one band of ribbon down the front and over the lid
          if (Math.abs(X - mx) < 1) return X < mx ? ribbon[3] : ribbon[2];
          if (Y < y0 + 1.4 && Math.abs(X - mx) < 1.6) return ribbon[4];
          return Y < y0 + 1.4 ? paper[3] : X < x0 + 1.4 ? paper[3] : X > x1 - 1.6 || Y > y1 - 1.6 ? paper[1] : paper[2];
        }, paper[0]);
      };
      return [box(1, 13, 19, 28, PAPER[0], GOLD), box(16, 17, 29, 28, PAPER[4], SNOW), box(4, 5, 16, 13.4, PAPER[1], GOLD), box(6.6, -1, 13.6, 5.4, PAPER[3], RED),
        P(GOLD[2], or(turned(ell(7.4, 4.4, 2.6, 1.4), 7.4, 4.4, -0.5), turned(ell(12.6, 4.4, 2.6, 1.4), 12.6, 4.4, 0.5)), orb(8, 3, 6, 3, GOLD), GOLD[0]),
        O(10, 5, 1.2, 1.2, GOLD, GOLD[0])];
    })()));
    // a town bench, green ironwork and wooden slats, a sprig of holly tied to its arm
    deco('x2bench', build(36, 20, [
      P(BENCH[2], or(cap(4, 2, 4, 19.4, 1.1), cap(32, 2, 32, 19.4, 1.1), cap(3.4, 13, 1.4, 19.4, 1), cap(32.6, 13, 34.6, 19.4, 1), cap(4, 9.6, 1, 9.6, 0.9), cap(32, 9.6, 35, 9.6, 0.9)), orb(4, 4, 6, 14, BENCH), BENCH[0]),
      P(WOOD[2], or(rrect(1.6, 1, 34.4, 3.8, 1), rrect(1.6, 5, 34.4, 7.8, 1), rrect(1, 11.4, 35, 14.4, 1)), function (x, y) { if (y === 1 || y === 5 || y === 11) return WOOD[4]; return (x * 5 + y) % 11 === 0 ? WOOD[2] : WOOD[3]; }, WOOD[0]),
      P(HOLLY[2], or(blade(33, 8.4, 30, 5.6, 1.3), blade(33.4, 8.4, 35.6, 5.2, 1.2)), function (x, y) { return y < 7 ? HOLLY[3] : HOLLY[2]; }, HOLLY[0])
    ], [[32, 7, [RED[3], RED[2]]]]));

    /* ---- 9 · Shell Beach ---- */
    // a clump of marram grass on its little hummock of sand
    deco('x2marram', build(28, 24, (function () {
      var parts = [P(SAND[2], and(ell(14, 24, 13, 5), function (x, y) { return y < 23.8; }), orb(10, 19, 14, 7, SAND), SAND[1])];
      var bl = [[13, 20, 4, 2], [14, 20, 9, 0.4], [14.6, 20, 21, 3], [15, 20, 26, 8], [12, 20, 2, 8], [13.6, 20, 12, 1], [15.6, 20, 18, 0.6], [12.6, 20, 6, 4]];
      bl.forEach(function (b, i) { parts.push(P(MARRAM[2], blade(b[0], b[1], b[2], b[3], 0.9), function (x, y) { return y < b[3] + 4 ? MARRAM[4] : x < b[0] ? MARRAM[3] : MARRAM[2]; }, MARRAM[i % 2 ? 1 : 0])); });
      return parts;
    })()));
    // shells piled on the sand: a scallop, a cockle, a pink top shell, a limpet and a little cowrie
    deco('x2shells', build(26, 12, [
      P(SHELL[2], or(and(ell(7, 11, 6, 6.4), function (x, y) { return y < 11; }), rrect(5.4, 10, 8.6, 12, 0.4)), function (x, y) { var a = Math.atan2(y + 0.5 - 11, x + 0.5 - 7); return Math.floor((a + 4) * 4.4) % 2 ? SHELL[3] : orb(5, 6, 8, 8, SHELL)(x, y); }, SHELL[0]),
      P(CREAM[2], and(ell(15.4, 12, 4.4, 4.2), function (x, y) { return y < 12; }), function (x, y) { return (x % 2) ? CREAM[1] : orb(14, 9, 6, 5, CREAM)(x, y); }, CREAM[0]),
      P(RED[3], tri(19.6, 12, 25.4, 12, 22.6, 5), function (x, y) { return (y % 2) ? RED[4] : orb(21, 7, 5, 6, RED)(x, y); }, RED[1]),
      P(SAND[3], and(ell(11.6, 12, 2.4, 1.6), function (x, y) { return y < 12; }), null, SAND[1]),
      P(SHELL[3], ell(2, 10.6, 1.4, 1), null, SHELL[1])
    ]));
    // a silvered driftwood log with a tangle of blue rope round it, and a starfish
    deco('x2driftwood', build(42, 16, [
      P(DRIFT[2], or(cap(2, 11, 38, 9.6, 2.6), cap(26, 9, 31, 2.6, 1), ell(39.4, 9.4, 2.2, 2.4)), function (x, y) {
        if (Math.abs(x - 39) < 2 && y > 7) return (x + y) % 3 ? DRIFT[1] : DRIFT[3];
        return (y + Math.floor(x / 5)) % 3 === 0 ? DRIFT[1] : orb(14, 6, 30, 8, DRIFT)(x, y);
      }, DRIFT[0]),
      P(BLUE[2], or(cap(12, 7, 14, 13, 0.6), cap(13, 7, 16, 13, 0.6), cap(14, 13.6, 20, 15.4, 0.55), cap(20, 15.4, 23, 13.8, 0.55)), null, BLUE[0]),
      P('5', star(6.4, 6.4, 3.8, 1.6, -Math.PI / 2 + 0.3), function (x, y) { return (x + y) % 3 ? '6' : '7'; }, '4')
    ]));

    /* ---- 10 · Sark by Starlight ---- */
    // two bales of hay stacked in the field corner, tied with twine
    deco('x2haybale', build(32, 26, (function () {
      var bale = function (x0, y0, x1, y1) {
        return P(STRAW[2], rrect(x0, y0, x1, y1, 1.4), function (x, y) {
          var X = x + 0.5, Y = y + 0.5;
          if (Math.abs(X - x0 - (x1 - x0) * 0.28) < 0.6 || Math.abs(X - x0 - (x1 - x0) * 0.72) < 0.6) return STRAW[0];
          if (Y < y0 + 1.6) return hash(x, y, 1) > 0.5 ? STRAW[4] : STRAW[3];
          return hash(x, y, 2) > 0.72 ? STRAW[1] : hash(x, y, 3) > 0.8 ? STRAW[3] : X > x1 - 2 ? STRAW[1] : STRAW[2];
        }, STRAW[0]);
      };
      return [bale(1, 14, 31, 26), bale(6, 3, 26, 14.6)];
    })(), [[3, 12, [STRAW[3] + '.' + STRAW[3]]], [27, 1, [STRAW[3]]], [30, 13, [STRAW[3]]]]));
    // a bicycle (there are no cars on Sark): an upright with a wicker basket, on its stand
    deco('x2bike', build(46, 30, (function () {
      var FR = function (f) { return P(RED[2], f, function (x, y) { return y % 3 === 0 ? RED[3] : RED[2]; }, null, RED[0]); };
      return [].concat(wheel(9, 21, 7.6, IRON, STEEL, STEEL, 12), wheel(36, 21, 7.6, IRON, STEEL, STEEL, 12), [
        FR(or(cap(9, 21, 15, 12, 0.9), cap(15, 12, 30, 12, 0.9), cap(30, 12, 36, 21, 0.9), cap(15, 12, 22, 21, 0.9), cap(22, 21, 36, 21, 0.9), cap(30, 12, 31.4, 8.6, 0.9), cap(9, 21, 13.4, 8.4, 0.9))),
        P(IRON[2], or(rrect(28.4, 6.4, 35, 8.6, 1), cap(13.6, 8.4, 15.6, 5.4, 0.6), cap(11, 5.6, 17.6, 5.6, 0.7)), null, IRON[1]),
        P(IRON[1], cap(22, 21, 26, 29, 0.6), null, IRON[0]),
        O(22, 21, 1.8, 1.8, STEEL, STEEL[0]),
        P(WITHY[2], rrect(3, 7, 13, 13.6, 1.2), function (x, y) { return (x + y) % 3 === 0 || y % 2 ? WITHY[orb(5, 8, 10, 8, WITHY)(x, y) === WITHY[4] ? 4 : 3] : WITHY[1]; }, WITHY[0]),
        P(HOLLY[2], or(ell(6, 6.4, 1.8, 1.4), ell(9.4, 6, 2, 1.4)), null, HOLLY[0])
      ]);
    })(), [[7, 5, [RED[3]]], [10, 5, [RED[3]]]]));
    // a wooden fingerpost at the lane's end, its arms blank (no words anywhere)
    deco('x2signpost', build(30, 48, [
      P(WOOD[2], or(rrect(13.4, 3, 16.6, 47.6, 0.8), tri(13.4, 3.4, 16.6, 3.4, 15, 0.6)), function (x, y) { return x === 13 ? WOOD[3] : x === 16 ? WOOD[1] : (y % 7 === 0 ? WOOD[1] : WOOD[2]); }, WOOD[0]),
      P(WOOD[3], or(function (x, y) { return y > 7 && y < 12.4 && x > 2.4 && x < 18 && x > 2.4 + Math.abs(y - 9.7) * 0.9; }, function (x, y) { return y > 15 && y < 19.6 && x > 12 && x < 27.6 && x < 27.6 - Math.abs(y - 17.3) * 0.9; }, function (x, y) { return y > 23 && y < 27 && x > 4 && x < 18 && x > 4 + Math.abs(y - 25) * 0.9; }), function (x, y) { var Y = y + 0.5; return Y < 8.6 || (Y > 15 && Y < 16.6) || (Y > 23 && Y < 24.4) ? WOOD[4] : Y > 11 && Y < 12.4 || Y > 18.4 && Y < 19.6 || Y > 26 ? WOOD[1] : WOOD[3]; }, WOOD[0]),
      P(GORSE[2], or(ell(10, 47, 6, 2.4), ell(21, 47.4, 5, 2)), function (x, y) { return hash(x, y, 9) > 0.6 ? GORSE[3] : GORSE[2]; }, GORSE[0])
    ], [[8, 45, [FLOWER[2]]], [11, 44, [FLOWER[3]]], [20, 45, [FLOWER[2]]]]));
    // a gorse bush in flower — it flowers all the year round
    deco('x2gorse', build(34, 22, [
      P(GORSE[2], or(ell(9, 15, 8, 7), ell(18, 11, 9, 9), ell(26, 15, 7.6, 7), rrect(2, 15, 32, 22, 2)), function (x, y) {
        var t = orb(14, 6, 22, 16, GORSE)(x, y);
        return hash(x, y, 4) > 0.78 ? GORSE[Math.min(4, GORSE.indexOf(t) + 1)] : hash(x, y, 5) > 0.82 ? GORSE[Math.max(0, GORSE.indexOf(t) - 1)] : t;
      }, GORSE[0])
    ], [], (function () { var f = [], rs = BB.rng(77); for (var i = 0; i < 34; i++) { var a = rs() * Math.PI * 2, d = Math.sqrt(rs()), x = Math.round(17 + Math.cos(a) * d * 14), y = Math.round(13 + Math.sin(a) * d * 8 - (1 - d) * 3); if (y < 21) f.push([x, y, [rs() > 0.5 ? FLOWER[3] + FLOWER[2] : FLOWER[2], rs() > 0.6 ? FLOWER[1] : '.']]); } return f; })()));
    // a lantern hung from a post by a farm gate, lit (its flame flickers: two frames)
    deco('x2lantern', [0, 1].map(function (f) {
      return build(18, 46, [
        P(WOOD[2], or(rrect(12, 4, 15.4, 46, 0.8), cap(13.6, 6, 4.6, 6, 0.7)), function (x, y) { return x === 12 ? WOOD[3] : (y % 6 === 0 ? WOOD[1] : WOOD[2]); }, WOOD[0]),
        P(IRON[2], or(cap(4.6, 6, 4.6, 9.6, 0.4), ringT(4.6, 10.6, 1.4, 0.4), rrect(1.4, 11.4, 7.8, 13.2, 0.6), rrect(1.4, 22.4, 7.8, 24.6, 0.8), cap(1.8, 13, 1.8, 22.6, 0.45), cap(7.4, 13, 7.4, 22.6, 0.45)), null, IRON[1]),
        P(GLOW[2], ell(4.6, 18, 2.6, 4.2), function (x, y) { var X = x + 0.5, Y = y + 0.5; return ell(4.6 + (f ? 0.3 : -0.2), 18.6, 0.9, f ? 1.8 : 1.5)(X, Y) ? '8' : orb(3.6, 16, 3.6, 5, GLOW)(x, y); }, GLOW[1])
      ]);
    }));

    /* ---- 11 · Over the Rooftops ---- */
    // a chimney stack on the ridge: brick, a stone cap, two pots, snow on everything, a puff of smoke (two frames)
    deco('x2chimney', [0, 1].map(function (f) {
      var parts = [
        P(BRICK[2], rrect(5, 15, 25, 40, 0.8), function (x, y) { var row = Math.floor((y - 15) / 3), X = x + (row % 2 ? 2 : 0); if ((y - 15) % 3 === 2 || X % 5 === 0) return BRICK[1]; return x < 7 ? BRICK[3] : x > 22 ? BRICK[1] : BRICK[2]; }, BRICK[0]),
        P(SLATE[3], rrect(3.4, 12.6, 26.6, 15.6, 0.8), function (x, y) { return y < 14 ? SLATE[4] : SLATE[2]; }, SLATE[1]),
        P(POT[2], or(rrect(7.6, 4, 12.4, 13, 0.6), rrect(7, 3.2, 13, 5, 0.6), rrect(16.6, 6, 21.4, 13, 0.6), rrect(16, 5.2, 22, 7, 0.6)), function (x, y) { var c0 = x < 14.5 ? 10 : 19; return orb(c0 - 2, 4, 4, 12, POT)(x, y); }, POT[0]),
        P(SNOW[3], or(rrect(2.4, 10.6, 27.6, 13.4, 1.2), ell(10, 3.4, 3.4, 1.4), ell(19, 5.4, 3.4, 1.4), ell(15, 38.6, 13, 3), ell(26.4, 37.4, 3.6, 2.6)), function (x, y) { return y < 11.6 || (y < 4 && x < 13) ? SNOW[4] : x > 24 ? SNOW[2] : SNOW[3]; }, SNOW[1])
      ];
      var puff = f ? [[7, 0, ['.WW.', 'WwwW', '.WW.']]] : [[10, -1, ['.W.', 'WwW', '.W.']]];
      var sp = build(30, 42, parts, [], puff.map(function (p) { return [p[0], Math.max(0, p[1]), p[2]]; }));
      return sp;
    }));
    // a television aerial on its mast, snow along every arm
    deco('x2aerial', build(28, 44, (function () {
      // the boom slants off towards the transmitter, so it meets the mast at its end, not across it
      var bx = function (t) { return 3 + t * 22; }, by = function (t) { return 13 - t * 8; };
      var arms = [cap(bx(0), by(0), bx(1), by(1), 0.6)];
      [0.08, 0.26, 0.44, 0.62, 0.8, 0.96].forEach(function (t, i) { var h = 4.6 - i * 0.5; arms.push(cap(bx(t), by(t) - h, bx(t), by(t) + h, 0.45)); });
      return [
        P(STEEL[2], or.apply(null, arms), null, null, STEEL[0]),
        P(STEEL[2], or(cap(6, 11.6, 6, 42, 0.7), cap(6, 20, 11, 26, 0.45)), function (x) { return x === 5 ? STEEL[3] : STEEL[2]; }, null, STEEL[0]),
        P(STEEL[1], or(rrect(2.6, 40, 9.4, 44, 0.8), rrect(4, 32, 8, 34, 0.4)), null, STEEL[0]),
        P(SNOW[4], or(function (x, y) { var t = (x - 3) / 22; return t > -0.02 && t < 1.02 && Math.abs(y - (by(t) - 1.2)) < 0.7; }, ell(6, 42.4, 5, 1.6)), null, null, SNOW[2]),
        P(SNOW[4], or.apply(null, [0.08, 0.26, 0.44, 0.62, 0.8, 0.96].map(function (t, i) { return ell(bx(t), by(t) - 4.6 + i * 0.5 - 0.4, 0.9, 0.7); })), null, null, SNOW[2])
      ];
    })(), [], [[7, 15, ['W', 'W']], [16, 10, ['W']], [23, 7, ['W']]]));
    // a dormer window poking out of the snowy slates: lit, a wreath hung in it
    deco('x2dormer', build(38, 36, [
      P(SLATE[2], tri(2, 36, 36, 36, 19, 2), function (x, y) { return (y % 3 === 0) ? SLATE[1] : x < 19 ? SLATE[3] : SLATE[2]; }, SLATE[0]),
      P(CREAM[3], rrect(8, 14, 30, 36, 0.6), function (x) { return x < 10 ? CREAM[4] : x > 27 ? CREAM[1] : CREAM[3]; }, CREAM[0]),
      P(GLOW[2], rrect(11.4, 17, 26.6, 32, 0.6), function (x, y) { var X = x + 0.5, Y = y + 0.5; if (Math.abs(X - 19) < 0.7 || Math.abs(Y - 24.6) < 0.6) return CREAM[2]; return Y > 28 ? GLOW[1] : orb(15, 20, 10, 10, GLOW)(x, y); }, CREAM[1]),
      P(HOLLY[2], ringT(19, 22.6, 2.8, 1.3), function (x, y) { return hash(x, y, 3) > 0.75 ? HOLLY[3] : HOLLY[2]; }, HOLLY[0]),
      P(SNOW[3], or(function (x, y) { return y > 0 && y < 15 && Math.abs(x - 19) < (y - 0.6) * 1.2 && Math.abs(x - 19) > (y - 4.6) * 1.2; }, rrect(9, 31.6, 29, 34, 0.8), ell(4, 34.6, 5, 2), ell(33.6, 34.4, 5, 2.2)), function (x, y) { return x < 19 && y < 12 ? SNOW[4] : x > 19 ? SNOW[2] : SNOW[3]; }, SNOW[1])
    ], [[18, 25, [RED[3] + RED[3]]], [18, 26, [RED[2] + '.' + RED[2]]]]));
    // a weathervane on the ridge: a little gilded sailing ship on its rod, gold balls down the rod, snow on
    // everything (no compass arms: rod and arms together would make a cross)
    deco('x2vane', build(26, 50, [
      P(IRON[2], or(rrect(12, 14, 14, 50, 0.6), rrect(8.6, 46, 17.4, 50, 1), cap(13, 40, 9, 46, 0.5), cap(13, 40, 17, 46, 0.5)), function (x) { return x === 12 ? IRON[3] : IRON[2]; }, null, IRON[0]),
      O(13, 16, 2, 2, GOLD, GOLD[0]), O(13, 27, 1.6, 1.6, GOLD, GOLD[0]), O(13, 36, 1.3, 1.3, GOLD, GOLD[0]),
      P(GOLD[2], or(function (x, y) { return y > 9 && y < 13 && x > 4 + (y - 9) * 0.8 && x < 22 - (y - 9) * 0.6; }, tri(13, 1, 13, 9.4, 20, 9.4), tri(12, 2.4, 12, 9.4, 7, 9.4), cap(13, 0.6, 13, 10, 0.4)), function (x, y) { return y < 9.6 ? (x < 13 ? GOLD[4] : GOLD[3]) : orb(10, 9, 14, 6, GOLD)(x, y); }, GOLD[0]),
      P(SNOW[4], or(rrect(4.6, 8.4, 21.6, 9.8, 0.6), ell(13, 14.2, 1.6, 0.7), ell(13, 49.4, 6, 1.6)), null, null, SNOW[2])
    ]));

    // on the sprite sheet: tools/sheet.html?only=x2 (when the sheet loads this file)
    (A.sheet = A.sheet || []).push(['x2 scenery', [].concat.apply([], names.map(function (k) { return (Array.isArray(D[k]) ? D[k] : [D[k]]).map(function (s, i) { return [i ? '' : k, s]; }); }))]);
  })();

  /* ==========================================================================
     THE PAINTING KIT (backdrop.js's, as backdrop6.js takes it)
     ========================================================================== */
  var K = BB.bgKit, GEN = BB.backdropGen;
  if (!K || !GEN) return;
  var H = K.H, SW = K.SW, HP = K.HP, snap = K.snap, mix = K.mix, strip = K.strip, R = K.R, disc = K.disc,
    cloud = K.cloud, land = K.land, span = K.span, oval = K.oval, ring = K.ring, line = K.line, glow = K.glow,
    stars = K.stars, bird = K.bird, streak = K.streak, crescent = K.crescent, pad = K.pad, gull = K.gull;
  // one turn of a wave across the strip: edges built from whole turns meet at the seam
  var TAU = Math.PI * 2 / SW;
  var wv = function (x, n, ph) { return Math.sin(x * TAU * n + (ph || 0)); };
  // how far x is from c, the short way round the strip (for shapes that sit across its seam)
  var wd = function (x, c) { return ((x - c) % SW + SW * 1.5) % SW - SW / 2; };

  /* ==========================================================================
     SHARED SHAPES
     ========================================================================== */
  /* A big friendly moon: a soft halo, its rim in shade low on the right,
     grey-blue seas on its face, a few craters, and the light high on its
     left. c = [rim, body, light, seas], halo = [colour, strength] */
  var crater = function (g, cx, cy, rx, ry, c) {
    oval(g, cx, cy - HP, rx + 0.5, ry + 0.5, c[2]); oval(g, cx + 0.3, cy + 0.2, rx, ry, c[2]); oval(g, cx - rx * 0.1, cy - ry * 0.14, rx * 0.9, ry * 0.82, c[0]);
  };
  var moon = function (g, x, y, r, c, halo) {
    if (halo) { glow(g, x, y, r * 3.4, halo[0], halo[1]); glow(g, x, y, r * 1.7, halo[0], halo[1] * 0.8); }
    disc(g, x + r * 0.05, y + r * 0.05, r, c[0]);
    disc(g, x - r * 0.03, y - r * 0.03, r * 0.95, c[1]);
    [[-0.3, -0.18, 0.34], [0.18, 0.28, 0.28], [0.36, -0.3, 0.2], [-0.05, 0.12, 0.18]].forEach(function (q) { g.globalAlpha = 0.55; oval(g, x + q[0] * r, y + q[1] * r, q[2] * r * 1.3, q[2] * r, c[3]); g.globalAlpha = 1; });
    [[0.42, 0.18, 0.1], [-0.5, 0.3, 0.08], [0.1, -0.5, 0.09], [-0.15, 0.55, 0.07]].forEach(function (q) { crater(g, x + q[0] * r, y + q[1] * r, Math.max(HP, q[2] * r), Math.max(HP, q[2] * r * 0.85), [c[3], c[1], c[2]]); });
    g.globalAlpha = 0.6; crescent(g, x - r * 0.04, y - r * 0.04, r * 0.92, r * 0.18, r * 0.2, r * 0.86, c[2]); g.globalAlpha = 1;
    disc(g, x - r * 0.5, y - r * 0.48, Math.max(HP, r * 0.1), c[2]);
  };
  // a horizontal band of haze: thickest in its middle, fading above and below
  var haze = function (g, y, h, col, a) {
    for (var i = 0; i < h; i += HP) { g.globalAlpha = a * Math.sin(Math.PI * i / h); R(g, 0, y + i, SW, HP, col); }
    g.globalAlpha = 1;
  };
  // a star that twinkles: a bright point with a soft cross of light. s = size
  var twinkle = function (g, x, y, s, col) {
    glow(g, x, y, 3 * s, col, 0.5);
    g.globalAlpha = 0.55; R(g, x - 1.6 * s, y, 3.2 * s + HP, HP, col); R(g, x, y - 1.6 * s, HP, 3.2 * s + HP, col); g.globalAlpha = 1;
    R(g, x - HP / 2, y - HP / 2, 1, 1, '#ffffff');
  };
  /* A soft ray of light from (x0, y0) out to (x1, y1), widening from w0 to
     w1 and fading to nothing: stepped along its length, so it can lie at
     any angle (a lighthouse's beam across the sea). */
  var ray = function (g, x0, y0, x1, y1, w0, w1, col, a) {
    var L = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), n = Math.ceil(L / HP), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
    for (var i = 0; i <= n; i++) {
      var t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t, w = w0 + (w1 - w0) * t;
      for (var q = 1; q > 0.3; q -= 0.33) { g.globalAlpha = a * Math.pow(1 - t, 1.4) * 0.3; for (var o = -w * q / 2; o <= w * q / 2; o += HP) R(g, x + nx * o, y + ny * o, HP, HP, col); }
    }
    g.globalAlpha = 1;
  };
  /* The sea from its horizon y0 down to the foot of the strip: a wash from
     the horizon's colour into the deep, long thin ripples that lengthen as
     they come nearer, and the glitter of a light in a broken path down it.
     c = [horizon, deep, ripple]; paths = [[x, width at the horizon, width
     at the foot, colour, strength], …] */
  var sea = function (g, y0, c, rnd, paths, deep) {
    var y, i;
    for (y = y0; y < H; y += HP) R(g, 0, y, SW, HP, mix(c[0], c[1], Math.pow(Math.min(1, (y - y0) / (deep || 34)), 0.8)));
    R(g, 0, y0, SW, HP, mix(c[0], '#ffffff', 0.3));
    for (i = 0; i < 300; i++) {
      var yy = y0 + 1 + Math.pow(rnd(), 1.5) * (H - y0 - 1), k = (yy - y0) / 30;
      g.globalAlpha = 0.25 + rnd() * 0.35; R(g, rnd() * SW, snap(yy), 1 + k * (2 + rnd() * 6), HP, c[2]);
    }
    g.globalAlpha = 1;
    (paths || []).forEach(function (p) {
      for (y = y0 + HP; y < H; y += 1) {
        var k = (y - y0) / (H - y0), w = p[1] + (p[2] - p[1]) * Math.sqrt(k), n = 2 + Math.floor(w / 6);
        for (var j = 0; j < n; j++) {
          var dx = (rnd() + rnd() - 1) * w * 0.6, near = 1 - Math.abs(dx) / (w * 0.6 + 0.1);
          g.globalAlpha = p[4] * near * (1 - k * 0.45); R(g, p[0] + dx, y + (rnd() > 0.5 ? HP : 0), 0.5 + rnd() * (1 + k * 4) * near, HP, p[3]);
        }
      }
      g.globalAlpha = 1;
    });
  };
  /* A light's reflection in still water below it: a column of short
     dashes, swaying, fading as it goes down. */
  var reflect = function (g, x, y0, len, w, col, a) {
    for (var y = y0; y < y0 + len; y += 1) {
      var k = (y - y0) / len;
      g.globalAlpha = a * (1 - k) * (0.6 + 0.4 * Math.sin(y * 2.3 + x));
      R(g, x - w / 2 + Math.sin(y * 1.7 + x) * 0.6, y, w * (0.6 + 0.4 * Math.sin(y * 3.1)), HP, col);
    }
    g.globalAlpha = 1;
  };
  /* A granite boulder: rounded and a little lumpy, lit on its top left, in
     shade low on its right, lichen gold along its top and weed dark at its
     foot. c = [shade, body, light, lichen, weed] */
  var boulder = function (g, x, base, w, h, c, rnd) {
    oval(g, x + w * 0.08, base, w / 2, h, c[0], true);
    oval(g, x - w * 0.04, base - HP, w * 0.44, h * 0.94, c[1], true);
    oval(g, x + w * 0.16, base - h * 0.45, w * 0.18, h * 0.32, c[1]);
    oval(g, x - w * 0.2, base - h * 0.7, w * 0.16, h * 0.18, c[2]);
    if (c[3]) for (var i = 0; i < w * 0.8; i++) { var u = rnd() * 2 - 1, yy = base - h * Math.sqrt(1 - u * u) * 0.94 + rnd() * 1.2; if (u < 0.5) R(g, x - w * 0.04 + u * w * 0.42, yy, HP, HP, c[3]); }
    if (c[4]) for (var xx = x - w / 2; xx < x + w / 2; xx += HP) if (Math.sin(xx * 3.3 + x) > -0.5) R(g, xx, base - HP - Math.abs(Math.sin(xx * 1.9)) * 1.3, HP, HP + Math.abs(Math.sin(xx * 1.9)) * 1.3, c[4]);
  };
  /* A lit window: its frame, the glass warm (or dark), the glow it throws,
     and now and then something Christmassy in it — a little tree with its
     star, a wreath with a red bow, a paper star. */
  var WARM = '#ffd27a';
  var litWin = function (g, x, y, w, h, frame, lit, deco, dark) {
    if (lit) glow(g, x + w / 2, y + h / 2, w * 1.3 + 2.4, '#ffb860', 0.5);
    R(g, x - HP, y - HP, w + HP * 2, h + HP * 2, frame);
    R(g, x, y, w, h, lit ? WARM : dark);
    if (!lit) { R(g, x, y, Math.max(HP, w * 0.3), HP, mix(dark, '#ffffff', 0.2)); return; }
    R(g, x, y + h * 0.55, w, h * 0.45, '#ffb850'); R(g, x + HP * 0.5, y + HP * 0.5, Math.max(HP, w * 0.3), HP, '#fff2c0');
    if (deco === 'tree' && w >= 2) {
      span(g, y + h * 0.2, y + h - HP, function (yy) { return x + w / 2 - (yy - y - h * 0.2) * 0.42 - HP / 2; }, function (yy) { return x + w / 2 + (yy - y - h * 0.2) * 0.42 + HP / 2; }, '#2a7a44');
      R(g, x + w / 2 - HP / 2, y + h * 0.12, HP, HP, '#fffbe0'); R(g, x + w / 2 - w * 0.2, y + h * 0.7, HP, HP, '#ff6a6a'); R(g, x + w / 2 + w * 0.14, y + h * 0.55, HP, HP, '#ffffff');
      return;
    }
    if (deco === 'wreath' && w >= 2) { ring(g, x + w / 2, y + h / 2, w * 0.18, w * 0.18 + HP * 1.6, '#2a7a44'); R(g, x + w / 2 - HP / 2, y + h / 2 + w * 0.2, HP, HP, '#e83a3a'); return; }
    R(g, x + w / 2 - HP / 2, y, HP, h, frame); R(g, x, y + h / 2 - HP / 2, w, HP, frame);
    if (deco === 'star') R(g, x + w * 0.25, y + h * 0.18, HP, HP, '#ffffff');
  };
  /* A string of Christmas lights slung from (x0, y0) to (x1, y1), hanging
     like a rope: a dark wire and a bulb every gap or so, in turn through
     the colours, each with a little glow of its own (gl, its radius). */
  var lights = function (g, x0, y0, x1, y1, sag, cols, gap, wire, gl) {
    line(g, x0, y0, x1, y1, HP, wire, sag);
    var n = Math.max(2, Math.round(Math.abs(x1 - x0) / gap));
    for (var i = 1; i < n; i++) {
      var t = i / n, bx = x0 + (x1 - x0) * t, by = y0 + (y1 - y0) * t + sag * 4 * t * (1 - t) + HP, c = cols[i % cols.length];
      if (gl) glow(g, bx, by, gl, c, 0.55);
      R(g, bx - HP / 2, by, 1, 1, c); R(g, bx - HP / 2, by, HP, HP, mix(c, '#ffffff', 0.6));
    }
  };
  var XMAS = ['#ff5a5a', '#ffd040', '#6af07a', '#6ab8ff', '#ffffff', '#ff9ad8'];
  /* A wide soft glow (a sunset, a town's lights on the cloud): the kit's
     glow has five rings, which show as steps when it's big, so this one
     lays down many faint rings, squashed flat if asked (ry/r). */
  var bloom = function (g, x, y, r, col, a, sq) {
    sq = sq || 1;
    for (var i = 0; i < 16; i++) { var k = 1 - i / 16; g.globalAlpha = a * 0.05 * (0.4 + i / 16); oval(g, x, y, r * k, r * k * sq, col); }
    g.globalAlpha = 1;
  };
  /* Granite cottages along a lane or a shore, Guernsey style: two storeys
     of stone under a slate roof, chimneys at both ends, windows lit warm.
     P = {wall: [shade, body, light], roof: [shade, body, light], frame,
     dark, door, smoke, snow (or none)}; lit is the chance of a lit window */
  var cottage = function (g, x, base, w, h, P, rnd, lit, xmas) {
    var top = base - h, rh = h * 0.62, y;
    R(g, x, top, w, h, P.wall[1]); R(g, x + w - 1, top, 1, h, P.wall[0]); R(g, x, top, HP, h, P.wall[2]);
    if (!P.plain) for (var i = 0; i < w * h / 5; i++) R(g, x + rnd() * (w - 1), top + rnd() * h, 1, HP, rnd() > 0.5 ? P.wall[0] : P.wall[2]);
    // chimneys at the gable ends, one smoking
    [x + 0.6, x + w - 2.6].forEach(function (cx, ci) {
      R(g, cx, top - rh - 2.4, 2, rh + 2, P.wall[ci ? 0 : 1]); R(g, cx - 0.3, top - rh - 2.8, 2.6, 0.8, P.wall[2]);
      if (P.smoke && ci === 1) for (var j = 0; j < 7; j++) { g.globalAlpha = 0.3 - j * 0.04; disc(g, cx + 1 + j * 1.3 + Math.sin(j) * 0.7, top - rh - 4.4 - j * 2, 0.8 + j * 0.3, P.smoke); }
      g.globalAlpha = 1;
    });
    span(g, top - rh, top + 0.5, function (yy) { return x - 0.8 + (top - yy) * 0.25; }, function (yy) { return x + w + 0.8 - (top - yy) * 0.25; }, P.roof[1]);
    for (y = top - rh + 1.2; y < top; y += 1.2) R(g, x - 0.8 + (top - y) * 0.25, y, w + 1.6 - (top - y) * 0.5, HP, mix(P.roof[1], P.roof[0], 0.5));
    R(g, x - 0.8 + rh * 0.25, top - rh, w + 1.6 - rh * 0.5, HP, P.roof[2]);
    if (P.snow) {
      span(g, top - rh - HP, top - rh * 0.35, function (yy) { return x - 0.6 + (top - yy) * 0.25; }, function (yy) { return x + w + 0.6 - (top - yy) * 0.25; }, P.snow[1]);
      for (var sx = x; sx < x + w; sx += HP) R(g, sx, top - rh * 0.35, HP, HP + Math.abs(Math.sin(sx * 1.7)) * 1.2, P.snow[1]);
      R(g, x - 0.6, top - HP, w + 1.2, 1, P.snow[0]); R(g, x - 0.6, top - HP, w + 1.2, HP, P.snow[1]);
    }
    var ww = Math.max(1.5, h * 0.2), n = Math.max(2, Math.round(w / Math.max(5.5, ww * 3.2)));
    for (i = 0; i < n; i++) {
      var wx = x + (i + 0.5) * w / n - ww / 2;
      litWin(g, wx, top + h * 0.14, ww, ww * 1.1, P.frame, rnd() < lit, xmas && rnd() > 0.6 ? 'tree' : null, P.dark);
      if (i === Math.floor(n / 2)) { R(g, wx, base - h * 0.44, ww, h * 0.44, P.door); if (xmas) { ring(g, wx + ww / 2, base - h * 0.3, ww * 0.24, ww * 0.24 + HP * 1.6, '#5ab866'); R(g, wx + ww / 2 - HP, base - h * 0.3 + ww * 0.22, 1, HP, '#ff4a4a'); } }
      else litWin(g, wx, base - h * 0.42, ww, ww * 1.1, P.frame, rnd() < lit, xmas && rnd() > 0.5 ? 'tree' : null, P.dark);
    }
  };

  /* ==========================================================================
     THE BACKDROPS
     ========================================================================== */

  /* ---- 7 · The Cup and Saucer ---- */
  /* Fort Grey, "the cup and saucer": a squat round Martello tower,
     whitewashed as a seamark, standing in the middle of its round battery
     wall on a rock in Rocquaine Bay. Each drum is lit across its width from
     the left. P = {wall: [deep, shade, body, light], stone: [deep, shade,
     body, light], win, lit, rock: [shade, body, light], weed} */
  var fortGrey = function (g, cx, base, s, P, rnd) {
    var y, x, u, k;
    var tone = function (u, c) { var i = -0.62 * u + 0.5 * Math.sqrt(Math.max(0, 1 - u * u)); return i > 0.62 ? c[3] : i > 0.18 ? c[2] : i > -0.28 ? c[1] : c[0]; };
    // the rock it stands on, humped and dark, weed along the waterline
    var rr = 30 * s;
    for (x = cx - rr; x < cx + rr; x += HP) {
      u = (x - cx) / rr; var top = base - 5 * s * Math.sqrt(Math.max(0, 1 - u * u)) - Math.sin(x * 0.9) * 0.6 * s;
      R(g, x, top, HP, base - top + 1, u < -0.3 ? P.rock[2] : u < 0.4 ? P.rock[1] : P.rock[0]);
      if (Math.sin(x * 2.1) > -0.3) R(g, x, base - HP - Math.abs(Math.sin(x * 1.3)) * 1.2, HP, HP + Math.abs(Math.sin(x * 1.3)) * 1.2, P.weed);
    }
    // the saucer: the battery wall, a low drum with a white-coped parapet round its courtyard
    var sr = 23 * s, sry = 3.4 * s, st = base - 4 * s - 7 * s, sb = base - 4 * s;
    for (x = cx - sr; x < cx + sr; x += HP) {
      u = (x - cx) / sr; var e = sry * Math.sqrt(Math.max(0, 1 - u * u));
      R(g, x, st + e, HP, sb - st, tone(u, P.stone));
      // courses of granite
      for (y = st + e + 1.6 * s; y < sb + e; y += 1.6 * s) R(g, x, y, HP, HP, mix(tone(u, P.stone), P.stone[0], 0.35));
      if (Math.sin(x * 1.6 / s) > 0.85) for (y = st + e; y < sb + e; y += HP) if (Math.floor((y - st) / (1.6 * s)) % 2) R(g, x, y, HP, HP, mix(tone(u, P.stone), P.stone[0], 0.3));
    }
    // its top: the courtyard inside, in shadow, and the whitewashed coping round it, lit at the back and the left
    oval(g, cx, st, sr, sry, P.wall[3]);
    oval(g, cx + 0.3 * s, st + 0.4 * s, sr - 1.4 * s, sry - 0.9 * s, mix(P.stone[0], P.wall[0], 0.4));
    for (x = cx - sr; x < cx + sr; x += HP) { u = (x - cx) / sr; R(g, x, st + sry * Math.sqrt(Math.max(0, 1 - u * u)) - HP, HP, 1.2 * s, tone(u, P.wall)); }
    // the cup: the tower, sloping in as it rises, its parapet, small windows
    var tr0 = 9 * s, tr1 = 7.6 * s, tb = st + 0.6 * s, th = 17 * s, try_ = 1.8 * s;
    for (y = tb - th; y < tb; y += HP) {
      k = (tb - y) / th; var tr = tr0 + (tr1 - tr0) * k;
      for (x = -tr; x < tr; x += HP) R(g, cx + x, y, HP, HP, tone(x / tr, P.wall));
    }
    for (x = -tr0; x < tr0; x += HP) { u = x / tr0; R(g, cx + x, tb + try_ * Math.sqrt(Math.max(0, 1 - u * u)) - HP, HP, HP * 2, tone(u, P.wall)); }
    // the parapet: a band standing proud of the wall, its rim catching the last light
    var pt = tb - th - 2.6 * s, pr = tr1 + 0.8 * s;
    for (y = pt; y < tb - th + 0.4 * s; y += HP) for (x = -pr; x < pr; x += HP) R(g, cx + x, y + try_ * 0.5 * Math.sqrt(Math.max(0, 1 - (x / pr) * (x / pr))), HP, HP, tone(x / pr, P.wall));
    oval(g, cx, pt, pr, try_ * 0.6, P.wall[3]); oval(g, cx + 0.2 * s, pt + 0.2 * s, pr - 0.8 * s, try_ * 0.4, mix(P.wall[1], P.wall[0], 0.5));
    for (x = -pr; x < pr; x += HP) { u = x / pr; R(g, cx + x, pt + try_ * 0.5 * Math.sqrt(Math.max(0, 1 - u * u)) + 2.6 * s - HP, HP, HP, mix(tone(u, P.wall), P.wall[0], 0.5)); }
    // windows: small and deep-set, one lit (the museum's still open)
    [[-3.6, 8, false], [2.2, 8.6, true], [-0.8, 14, false]].forEach(function (q) {
      var wx = cx + q[0] * s, wy = tb - q[1] * s - 1.6 * s;
      if (q[2]) glow(g, wx + 0.6 * s, wy + 1 * s, 5 * s, '#ffb860', 0.6);
      R(g, wx - HP, wy - HP, 1.4 * s + HP * 2, 2.2 * s + HP * 2, P.wall[0]); R(g, wx, wy, 1.4 * s, 2.2 * s, q[2] ? P.lit : P.win);
      if (q[2]) R(g, wx, wy, HP, 2.2 * s, '#fff4c8');
    });
    // a doorway in the saucer, facing the causeway, and a wreath hung over it
    var dx = cx + 12 * s, dy = sb + sry * Math.sqrt(1 - Math.pow(12 / 23, 2));
    R(g, dx - 1.2 * s, dy - 4.4 * s, 2.4 * s, 4.4 * s, P.win); oval(g, dx, dy - 4.4 * s, 1.2 * s, 1 * s, P.win, true);
    glow(g, dx, dy - 2 * s, 4 * s, '#ffb860', 0.3);
    ring(g, dx, dy - 7 * s, 0.9 * s, 1.5 * s, '#2a6a44'); R(g, dx - HP / 2, dy - 6 * s, HP, HP, '#e84a4a');
  };
  /* Les Hanois lighthouse far out on its reef: a tall slim tower of grey
     granite tapering as it rises, a gallery, the lantern lit, and its beam
     reaching out faintly both ways across the dusk. c = [shade, body,
     light, iron, lamp] */
  var hanois = function (g, x, base, h, c, rnd) {
    var y, k;
    for (y = base - h; y < base; y += HP) {
      k = (y - base + h) / h; var hw = 0.9 + 1.1 * k * k + 0.5 * k;
      R(g, x - hw, y, hw * 2, HP, c[1]); R(g, x + hw * 0.25, y, hw * 0.75, HP, c[0]); R(g, x - hw, y, Math.max(HP, hw * 0.35), HP, c[2]);
      if (Math.round((y - base) * 2) % 6 === 0) R(g, x - hw, y, hw * 2, HP, mix(c[1], c[0], 0.4));
    }
    var top = base - h;
    R(g, x - 1.6, top - HP, 3.2, 1, c[3]); R(g, x - 1.6, top - HP, 3.2, HP, c[2]);
    glow(g, x, top - 2, 16, c[4], 0.8);
    ray(g, x - 1, top - 2, x - 90, top + 3, 1, 12, c[4], 0.5);
    ray(g, x + 1, top - 2, x + 70, top + 5, 1, 9, c[4], 0.35);
    R(g, x - 0.9, top - 3.2, 1.8, 2.8, c[4]); R(g, x - 0.9, top - 3.2, HP, 2.8, '#ffffff');
    oval(g, x, top - 3.2, 1.3, 1, c[3], true); R(g, x - HP / 2, top - 4.6, HP, 0.8, c[3]);
    // the reef it stands on, the swell breaking white round it
    for (var i = 0; i < 9; i++) { var rx = x - 9 + i * 2.2 + rnd(), rh = 0.8 + rnd() * 1.6; oval(g, rx, base + 0.6, 1.2 + rnd(), rh, i % 3 ? c[0] : c[1], true); }
    for (i = 0; i < 14; i++) R(g, x - 11 + rnd() * 22, base + rnd() * 1.2, 0.5 + rnd(), HP, '#fff4f4');
  };
  /* A small fishing boat at her mooring: a stubby hull, a wheelhouse, a
     short mast with its riding light lit, her reflection under her.
     c = [hull, top band, house, window lit, mast] */
  var mooring = function (g, x, y, s, c, face) {
    var f = face || 1;
    span(g, y - 2 * s, y, function (yy) { return x - 5 * s + (yy - y + 2 * s) * 0.5 * (f > 0 ? 1 : 0.2); }, function (yy) { return x + 5 * s - (yy - y + 2 * s) * 0.5 * (f > 0 ? 0.2 : 1); }, c[0]);
    R(g, x - 5 * s, y - 2 * s, 10 * s, Math.max(HP, 0.5 * s), c[1]);
    R(g, x - f * 1.5 * s - 1.4 * s, y - 4.2 * s, 2.8 * s, 2.2 * s, c[2]); R(g, x - f * 1.5 * s - 0.9 * s, y - 3.8 * s, 1.6 * s, 0.8 * s, c[3]);
    R(g, x + f * 1.4 * s, y - 8 * s, HP, 6 * s, c[4]);
    glow(g, x + f * 1.4 * s, y - 8 * s, 2.4, '#fff4d8', 0.6); R(g, x + f * 1.4 * s - HP / 2, y - 8.4 * s, 1, 1, '#ffffff');
    g.globalAlpha = 0.35; for (var yy = y + HP; yy < y + 2.4 * s; yy += 1) R(g, x - 4.4 * s + Math.sin(yy * 3) * 0.4, yy, 8.8 * s, HP, c[0]); g.globalAlpha = 1;
    reflect(g, x + f * 1.4 * s, y + 0.5, 6 * s, 1, '#fff4d8', 0.5);
  };

  GEN.fortgrey = function (rnd, th) {
    var L = [], i, j, x, y;
    // the haze of the dusk: lilac going rose towards the sea
    var HZ = '#b896c4';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    /* The sun's gone down into the sea and left the sky violet overhead,
       going rose and peach down to the horizon, brightest where it set;
       the first stars, the evening star, clouds lit pink and gold from
       beneath, and the gulls going home. (The far layers hardly move, so
       what matters sits in their first two hundred pixels or so.) */
    var SX = 150;
    var far = strip(), g = far.getContext('2d');
    for (y = 34; y < 100; y++) { g.globalAlpha = 0.46 * Math.pow((y - 34) / 66, 1.9); R(g, 0, y, SW, 1, '#ffb0a4'); }
    g.globalAlpha = 1;
    bloom(g, SX, 98, 150, '#ff9a90', 0.9, 0.55); bloom(g, SX, 98, 70, '#ffc890', 1, 0.6); bloom(g, SX, 98, 30, '#fff0c8', 1, 0.6);
    stars(g, 50, 2, 38, rnd, ['#ffffff', '#ffe8f8', '#e0e8ff']);
    stars(g, 14, 38, 52, rnd, ['#ffe8f0']);
    twinkle(g, 62, 24, 1.3, '#fff8e8');
    // clouds: a high wisp or two still blue, lower banks lit from beneath, gold nearest the sunset
    for (i = 0; i < 4; i++) streak(g, rnd() * SW, 14 + rnd() * 20, 40 + rnd() * 60, 1 + rnd(), [hm('#2a2a68', 0.1), hm('#443e80', 0.1), hm('#8a72b0', 0.2)], true);
    [[18, 64, 0.5], [96, 74, 0.42], [190, 60, 0.55], [262, 78, 0.4], [340, 66, 0.5], [430, 72, 0.45]].forEach(function (q) {
      var nr = Math.abs(wd(q[0] + 14, SX)) < 80;
      cloud(g, q[0], q[1], q[2], [hm('#6a4a88', 0.1), hm(nr ? '#b07a9a' : '#8a6a9e', 0.1), nr ? '#ffc8a0' : '#f0a8b8']);
      streak(g, q[0] - 30, q[1] + 3, 90, 1.6, [hm('#5a4480', 0.1), hm(nr ? '#a87098' : '#7a5c94', 0.1), nr ? '#ffd8a8' : '#ffb4b4'], true);
    });
    // the cloud undersides catch the light: flip the lit edge so the gold is underneath
    for (i = 0; i < 6; i++) { x = SX - 120 + rnd() * 240; streak(g, x, 82 + rnd() * 10, 40 + rnd() * 60, 1.2 + rnd(), [hm('#8a5a8a', 0.1), hm('#c08aa0', 0.1), '#ffe0b0'], true); }
    [[210, 40], [216, 37.6], [223, 39], [100, 34], [107, 36]].forEach(function (q) { bird(g, q[0], q[1], hm('#3a2c5a', 0.2)); });
    L.push({ c: far, f: 0.02 });

    /* The open sea, out to the horizon: violet and rose with the sunset's
       glitter spilling down it; Pleinmont's headland coming steeply down
       into the sea at one end of the bay, a cottage or two lit on its top,
       and far out on its reef Les Hanois lighthouse, lit, its beam reaching
       faintly out across the water both ways. */
    var sl = strip(), s = sl.getContext('2d'), SEA = 96;
    sea(s, SEA, [hm('#e8acc0', 0.15), '#3a3880', '#f8d0dc'], rnd, [[SX, 10, 80, '#ffe4c4', 0.8]], 26);
    // the headland: a long ridge that falls in cliffs to the sea, its top in gorse, the light along its rim
    var PC = -24;
    var PM = function (xx) { var d = wd(xx, PC); return d > 74 || d < -170 ? SEA + 1 : d > 52 ? SEA - 4 - (74 - d) * 0.9 + Math.sin(xx * 0.9) * 0.6 : SEA - 24 + Math.max(0, d) * 0.04 + Math.max(0, -d - 60) * 0.22 + wv(xx, 11, 1) * 1.2 + wv(xx, 23, 2) * 0.5; };
    for (x = 0; x < SW; x += HP) {
      y = PM(x); if (y > SEA - 0.5) continue;
      var dd = wd(x, PC), cliff = dd > 52;
      R(s, x, y, HP, SEA - y + 1, hm(cliff ? '#3e3260' : '#4a3e6c', 0.32));
      R(s, x, y, HP, HP * 2, hm(cliff ? '#d8a0b8' : '#c08ab0', 0.2));
      // gorse in clumps on the top, the cliff's face in ledges going down
      if (!cliff && Math.sin(x * 1.3) + Math.sin(x * 0.37) > 0.6) R(s, x, y + 1, HP, 1 + Math.abs(Math.sin(x * 0.7)) * 1.5, hm('#3a3a4a', 0.3));
      if (cliff) for (var ly = y + 2; ly < SEA; ly += 2.5) if (Math.sin(x * 2.1 + ly) > 0.3) R(s, x, ly, HP, HP, hm('#6a5684', 0.3));
      if (dd > 40 && Math.sin(x * 2.3) > 0.5) R(s, x, SEA - HP, HP, HP, '#fff0f0');
    }
    [[-44, 0.7], [-20, 0.6], [6, 0.7]].forEach(function (q) {
      var bx = (q[0] + SW) % SW, by = PM(bx) + 1.6;
      R(s, bx, by - 2.2, 4, 2.2, hm('#d8c8d8', 0.32)); span(s, by - 3.6, by - 2.1, function (yy) { return bx - 0.4 + (by - 2.1 - yy) * 0.8; }, function (yy) { return bx + 4.4 - (by - 2.1 - yy) * 0.8; }, hm('#4a4060', 0.3));
      glow(s, bx + 1.2, by - 1.2, 3, '#ffb860', 0.7); R(s, bx + 0.8, by - 1.6, 1, HP, '#ffd890');
    });
    hanois(s, 196, SEA + 0.5, 25, [hm('#5a5070', 0.3), hm('#9a90ac', 0.3), hm('#ece0e8', 0.2), hm('#3a3048', 0.3), '#fff4d0'], rnd);
    // and Lihou, low and far off at the other end of the bay
    for (x = 268; x < 340; x += HP) { var lh = 3.2 * Math.sin(Math.PI * (x - 268) / 72) + Math.sin(x * 0.4) * 0.4; if (lh > 0.3) { R(s, x, SEA - lh, HP, lh + 0.5, hm('#5a4a78', 0.4)); R(s, x, SEA - lh, HP, HP, hm('#d0a0c0', 0.3)); } }
    haze(s, SEA - 7, 12, '#ffd8c8', 0.3);
    L.push({ c: sl, f: 0.035 });

    /* The bay: Fort Grey on its rock, the causeway running out to it, its
       round battery wall and the white tower in the middle — a wreath over
       the door, a window lit; small boats on their moorings with their
       riding lights on, and rocks breaking the water. */
    var bl = strip(), b = bl.getContext('2d');
    var FX = 112, FB = 110;
    // the fort's reflection first, a pale wobbling column
    for (y = FB; y < FB + 12; y += 1) { b.globalAlpha = 0.22 * (1 - (y - FB) / 12); R(b, FX - 10 + Math.sin(y * 2.1) * 0.8, y, 20, HP, '#fff0f4'); }
    b.globalAlpha = 1;
    fortGrey(b, FX, FB, 1.12, {
      wall: [hm('#6c5c90', 0.12), hm('#a898c4', 0.12), hm('#e2d8ee', 0.08), '#fff2ee'], stone: [hm('#3e3456', 0.12), hm('#6a5c80', 0.12), hm('#9a8aa8', 0.12), hm('#c8b4c4', 0.1)],
      win: hm('#2a2440', 0.12), lit: '#ffd27a', rock: [hm('#2a2238', 0.12), hm('#463850', 0.12), hm('#7a5e7c', 0.12)], weed: hm('#2a3020', 0.15)
    }, rnd);
    // the causeway, a long low stone path from the shore out to the fort's door
    for (x = FX + 14; x < FX + 130; x += HP) {
      var t = (x - FX - 14) / 116, cy = FB - 3.2 + t * t * 15 + t * 2, cw = 1.6 + t * 3.4;
      R(b, x, cy, HP, cw, hm(Math.sin(x * 1.3) > 0.3 ? '#9a8aa8' : '#8a7a98', 0.12)); R(b, x, cy, HP, HP, hm('#f0d8e0', 0.1)); R(b, x, cy + cw, HP, 1 + t, hm('#2e2a40', 0.12));
      if (Math.sin(x * 0.7) > 0.7) R(b, x, cy + cw + 1, HP, HP, '#fff0f0');
    }
    // boats on their moorings
    [[40, 106, 0.9, 1], [176, 103, 0.6, -1], [282, 104, 0.75, -1], [330, 108, 1, 1], [452, 103, 0.65, 1]].forEach(function (q, qi) {
      mooring(b, q[0], q[1], q[2], [hm(['#3a4a7a', '#8a2a3a', '#2a5a5a'][qi % 3], 0.12), hm('#e8e0ec', 0.12), hm('#d8d0dc', 0.15), '#ffd890', hm('#5a5068', 0.15)], q[3]);
      // someone's dressed their boat for Christmas
      if (qi === 0) { var mx = q[0] + q[3] * 1.4 * q[2], mt = q[1] - 8 * q[2]; lights(b, q[0] - 5 * q[2], q[1] - 2 * q[2], mx, mt, 0.4, XMAS, 1.1, hm('#2a2440', 0.1), 1); lights(b, mx, mt, q[0] + 5 * q[2], q[1] - 2 * q[2], 0.4, XMAS, 1.1, hm('#2a2440', 0.1), 1); }
    });
    // rocks breaking the water out in the bay
    var RK = [hm('#2a2238', 0.18), hm('#463850', 0.18), hm('#8a6e88', 0.18), hm('#c8a070', 0.2), hm('#2a3020', 0.2)];
    [[70, 107, 8, 2.6], [200, 106, 10, 3.4], [214, 107, 6, 2], [390, 106, 12, 4], [404, 108, 6, 2], [490, 105, 8, 2.6]].forEach(function (q) {
      boulder(b, q[0], q[1], q[2], q[3], RK, rnd);
      for (var k = 0; k < 6; k++) R(b, q[0] - q[2] / 2 + rnd() * q[2], q[1] + rnd() * 0.6, 0.5 + rnd(), HP, '#fff0f4');
    });
    L.push({ c: bl, f: 0.07 });

    /* The beach going down to the water: wet sand holding the pink of the
       sky, the tideline's lace of foam, ripples left in the sand, round
       granite boulders with gold lichen on their heads and vraic at their
       feet, rock pools shining. */
    var sh = strip(), h = sh.getContext('2d');
    var sf = function (xx) { return 114 + wv(xx, 2, 0.6) * 1.6 + wv(xx, 5, 2.2) * 0.8; };
    for (x = 0; x < SW; x += HP) {
      y = snap(sf(x));
      for (var yy = y; yy < H; yy += HP) { var k2 = Math.min(1, (yy - y) / 9); R(h, x, yy, HP, HP, mix(hm('#f0b8c4', 0.05), hm(yy > y + 9 ? '#7a6080' : '#a07c98', 0.12), Math.pow(k2, 0.6))); }
      if (Math.sin(x * 0.9 + Math.sin(x * 0.13) * 3) > -0.2) R(h, x, y - HP, HP, HP, '#fff4f4');
      if (Math.sin(x * 0.37) > 0.4) R(h, x, y + 1.5 + Math.sin(x * 0.2), HP, HP, '#ffffff');
      // ripples left by the tide, in long gentle curves
      for (var rp = 0; rp < 4; rp++) { var ry = y + 6 + rp * 3 + Math.sin(x * 0.15 + rp * 1.7) * 1.2; if (Math.sin(x * 0.5 + rp) > -0.4) R(h, x, ry, HP, HP, hm(rp % 2 ? '#c09ab0' : '#8a6a88', 0.12)); }
    }
    // rock pools, holding the sky
    [[60, 6], [236, 8], [330, 5], [450, 7]].forEach(function (q) { var py = sf(q[0]) + 6; oval(h, q[0], py, q[1], 1.4, hm('#4a3a5a', 0.12)); oval(h, q[0] - 0.4, py - 0.2, q[1] - 1, 1, '#f4c0cc'); R(h, q[0] - q[1] * 0.4, py - 0.4, q[1] * 0.5, HP, '#fff4e8'); });
    var BR = ['#3a2c48', '#5e4a66', '#a08094', '#d8b070', '#2e3a22'];
    [[18, 15, 8], [30, 9, 5], [100, 20, 11], [118, 11, 6], [176, 13, 6], [282, 18, 9], [298, 10, 5], [372, 22, 10], [390, 12, 6], [430, 9, 4], [490, 16, 8]].forEach(function (q) { boulder(h, q[0], sf(q[0]) + 4, q[1], q[2], BR.map(function (c) { return hm(c, 0.1); }), rnd); });
    L.push({ c: sh, f: 0.12 });

    /* In front, kept low: the top of the shore — shingle, rocks in their
       limpets and barnacles, and heaps of vraic, the seaweed Guernsey
       gathered for its fields. */
    var nr2 = strip(), n = nr2.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 1.4) * 1.4 + wv(xx, 7, 0.3) * 0.7; };
    land(n, nf, ['#241c34', '#3a2e48', '#7a6280'], 5);
    for (i = 0; i < 160; i++) { x = rnd() * SW; y = nf(x) + 0.5 + rnd() * 6; R(n, x, y, 1, HP, ['#9a849a', '#6a5470', '#c8a8b4', '#4a3c58'][i % 4]); }
    // vraic: tangled heaps, olive and brown, drooping over the stones
    for (i = 0; i < 16; i++) {
      x = rnd() * SW; y = nf(x) + 1;
      oval(n, x, y, 4 + rnd() * 3, 1.6, '#3a3a1e', true);
      for (var w2 = 0; w2 < 9; w2++) { var a0 = -Math.PI / 2 + (w2 - 4) * 0.32, len = 2.4 + rnd() * 2; for (var tt = 0; tt < 1; tt += 0.12) R(n, x + Math.cos(a0) * len * tt * 1.6, y - 1 + Math.sin(a0) * len * tt + tt * tt * 2.4, HP, HP, ['#4a4a22', '#6a6a2c', '#7a5a2a', '#8a8a3e'][w2 % 4]); }
    }
    [[40, 14, 7], [52, 8, 4], [188, 12, 6], [300, 16, 8], [316, 8, 4], [444, 13, 6]].forEach(function (q) {
      boulder(n, q[0], nf(q[0]) + 2, q[1], q[2], ['#2e2440', '#4e3e5e', '#8a7090', '#d0a868', '#3a3a1e'], rnd);
      for (var k = 0; k < q[1] * 0.6; k++) { var lx = q[0] - q[1] * 0.4 + rnd() * q[1] * 0.8, ly = nf(q[0]) + 2 - q[2] * (0.2 + rnd() * 0.5); R(n, lx, ly, 1, HP, '#d8c8d0'); R(n, lx + HP / 2, ly - HP, HP, HP, '#f0e4e8'); }
    });
    L.push({ c: nr2, f: 0.22 });
    return L;
  };

  /* ---- shared by the Town, the rooftops and the title ---- */
  /* The islands seen from St Peter Port, low on the horizon across the
     Little Russel: Herm, long and low with its common at the north end;
     Jethou, a small round hump just south of it; and Sark beyond, a long
     flat-topped plateau standing on cliffs. A few lights are on. x is
     where Herm begins, s the scale; c = [body, rim, light] */
  var isles = function (g, x, y, s, c, rnd, lit) {
    var prof = function (x0, w, hgt, f) { for (var xx = 0; xx < w; xx += HP) { var u = xx / w, hh = hgt * f(u); if (hh > HP) { R(g, x0 + xx, y - hh, HP, hh + HP, c[0]); R(g, x0 + xx, y - hh, HP, HP, c[1]); } } };
    // Sark first, furthest and palest
    prof(x + 96 * s, 74 * s, 5.4 * s, function (u) { return u < 0.06 ? u / 0.06 * 0.9 : u > 0.94 ? (1 - u) / 0.06 * 0.85 : 0.92 + 0.06 * Math.sin(u * 9); });
    prof(x, 52 * s, 3.4 * s, function (u) { return Math.pow(Math.sin(Math.PI * u), 0.6) * (0.7 + 0.3 * u); });
    prof(x + 58 * s, 12 * s, 3 * s, function (u) { return Math.pow(Math.sin(Math.PI * u), 0.8); });
    if (lit) [[x + 30 * s, 1.4], [x + 40 * s, 1.8], [x + 110 * s, 4], [x + 132 * s, 4.4], [x + 150 * s, 4.2]].forEach(function (q) { glow(g, q[0], y - q[1] * s * 0.6, 2, c[2], 0.5); R(g, q[0], y - q[1] * s * 0.6, HP, HP, c[2]); });
  };
  /* Castle Cornet on its rock at the harbour mouth, floodlit for the
     evening: its walls stepping up the rock to the keep at the top, gold
     on the faces the lights find and violet in the shadows, a few windows
     lit, its light doubled in the water. c = [shade, body, lit, rock] */
  var cornet = function (g, cx, base, s, c) {
    bloom(g, cx, base - 6 * s, 26 * s, '#ffc880', 0.7, 0.6);
    oval(g, cx, base, 18 * s, 3 * s, c[3], true);
    var block = function (x0, x1, y1, y0) { R(g, cx + x0 * s, base - y1 * s, (x1 - x0) * s, (y1 - y0) * s, c[1]); R(g, cx + x0 * s, base - y1 * s, (x1 - x0) * s, HP, c[2]); R(g, cx + x0 * s, base - y1 * s, Math.max(HP, 0.8 * s), (y1 - y0) * s, c[2]); R(g, cx + x1 * s - Math.max(HP, 1.2 * s), base - y1 * s, Math.max(HP, 1.2 * s), (y1 - y0) * s, c[0]); };
    block(-16, 15, 5, 0); block(-12, 10, 9, 4.5); block(-6, 6, 13, 8.5); block(-2.5, 3.5, 17, 12.5); block(8, 14, 8, 4.5); block(-15, -10, 8, 4.5);
    // a round bastion at the seaward end
    oval(g, cx + 15 * s, base - 2.5 * s, 3 * s, 3 * s, c[1], true); R(g, cx + 12 * s, base - 5 * s, 6 * s, 5 * s, c[1]); R(g, cx + 16 * s, base - 5 * s, 2 * s, 5 * s, c[0]);
    [[-9, 6.5], [-3, 6.5], [4, 6.5], [-1, 10.5], [1, 14.5], [10, 6]].forEach(function (q) { R(g, cx + q[0] * s, base - q[1] * s, Math.max(HP, 0.6 * s), Math.max(HP, 0.9 * s), '#fff0c0'); });
    reflect(g, cx, base + 1, 10 * s, 16 * s, '#ffd8a0', 0.35);
  };
  /* A tall town house of St Peter Port: three or four storeys of rendered
     wall (cream, rose, duck-egg) or bare granite with quoins at its
     corners, sash windows in rows, most of them lit; a slate roof with a
     dormer and chimney stacks on the party walls; at the street, maybe a
     shopfront — a painted fascia (no words), a big window glowing with
     Christmas, and a door with a wreath. P = {wall: [shade, body, light],
     roof: [shade, body, light], frame, dark, door, fascia, snow (or none)} */
  var townHouse = function (g, x, base, w, h, P, rnd, o) {
    var top = base - h, y, i, j;
    R(g, x, top, w, h, P.wall[1]); R(g, x + w - 1, top, 1, h, P.wall[0]); R(g, x, top, HP, h, P.wall[2]);
    if (o.granite) {
      for (i = 0; i < w * h / 4; i++) R(g, x + rnd() * (w - 1), top + rnd() * h, 1 + rnd(), HP, rnd() > 0.5 ? P.wall[0] : P.wall[2]);
      for (y = top; y < base; y += 2.4) { var q = Math.floor((y - top) / 2.4) % 2; R(g, x, y, q ? 2 : 3, 2, P.wall[2]); R(g, x + w - (q ? 2 : 3), y, q ? 2 : 3, 2, mix(P.wall[1], P.wall[2], 0.5)); R(g, x, y + 2, w, HP, mix(P.wall[1], P.wall[0], 0.4)); }
    }
    // the roof: its slope going back from the cornice, slates in courses, the ridge lit
    var rh = Math.min(7, w * 0.24);
    span(g, top - rh, top, function (yy) { return x + (top - yy) * 0.3; }, function (yy) { return x + w - (top - yy) * 0.3; }, P.roof[1]);
    for (y = top - rh + 1.2; y < top; y += 1.2) R(g, x + (top - y) * 0.3, y, w - (top - y) * 0.6, HP, mix(P.roof[1], P.roof[0], 0.55));
    R(g, x + rh * 0.3, top - rh, w - rh * 0.6, HP, P.roof[2]);
    R(g, x - 0.6, top - HP, w + 1.2, 1, mix(P.wall[1], '#ffffff', 0.25)); R(g, x - 0.6, top + HP, w + 1.2, HP, P.wall[0]);
    if (P.snow) { span(g, top - rh - HP, top - rh * 0.4, function (yy) { return x + (top - yy) * 0.3 - 0.2; }, function (yy) { return x + w - (top - yy) * 0.3 + 0.2; }, P.snow[1]); for (var sx = x; sx < x + w; sx += HP) R(g, sx, top - rh * 0.4, HP, HP + Math.abs(Math.sin(sx * 1.9 + x)) * 1.4, P.snow[1]); R(g, x - 0.6, top - 1, w + 1.2, HP, P.snow[1]); }
    // chimney stacks on the party walls, with their pots
    [x + 1, x + w - 4].forEach(function (cx, ci) {
      if (o.stacks === 0 || (o.stacks === 1 && ci === 0)) return;
      R(g, cx, top - rh - 4, 3, rh + 4, P.wall[ci ? 0 : 1]); R(g, cx, top - rh - 4, HP, rh + 4, P.wall[2]); R(g, cx - 0.4, top - rh - 4.6, 3.8, 0.8, P.wall[2]);
      for (var k = 0; k < 2; k++) { R(g, cx + 0.3 + k * 1.4, top - rh - 6, 1, 1.6, '#b0603a'); R(g, cx + 0.3 + k * 1.4, top - rh - 6, HP, 1.6, '#e0905a'); }
      if (P.snow) R(g, cx - 0.4, top - rh - 5, 3.8, HP, P.snow[1]);
      if (P.smoke && ci === 1) { for (var s2 = 0; s2 < 8; s2++) { g.globalAlpha = 0.28 - s2 * 0.03; disc(g, cx + 1.2 + s2 * 1.2 + Math.sin(s2) * 0.6, top - rh - 7.4 - s2 * 2.1, 0.8 + s2 * 0.3, P.smoke); } g.globalAlpha = 1; }
    });
    // a dormer in the roof, lit
    if (o.dormer && w > 16) { var dx = x + w / 2 - 2; R(g, dx, top - rh * 0.8, 4, rh * 0.8, P.wall[1]); span(g, top - rh * 0.8 - 2, top - rh * 0.8, function (yy) { return dx - 0.5 + (top - rh * 0.8 - yy) * 1.2; }, function (yy) { return dx + 4.5 - (top - rh * 0.8 - yy) * 1.2; }, P.roof[1]); if (P.snow) span(g, top - rh * 0.8 - 2.2, top - rh * 0.8 - 0.6, function (yy) { return dx - 0.3 + (top - rh * 0.8 - yy) * 1.2; }, function (yy) { return dx + 4.3 - (top - rh * 0.8 - yy) * 1.2; }, P.snow[1]); litWin(g, dx + 1, top - rh * 0.65, 2, 2, P.frame, rnd() < o.lit + 0.2, rnd() > 0.6 ? 'wreath' : null, P.dark); }
    // the windows, floor by floor
    var shopH = o.shop ? Math.min(11, h * 0.3) : 0, fl = o.floors || 3, fh = (h - shopH - 1) / fl, n = Math.max(1, Math.round((w - 3) / 6.5)), ww = Math.min(2.6, (w - 4) / n * 0.45);
    for (j = 0; j < fl; j++) for (i = 0; i < n; i++) {
      var wx = x + 2 + (i + 0.5) * (w - 4) / n - ww / 2, wy = top + 1.5 + j * fh, wh = Math.min(fh - 1.6, ww * 1.6);
      var on = rnd() < o.lit, dk = on ? (rnd() < 0.12 ? 'tree' : rnd() < 0.1 ? 'wreath' : rnd() < 0.2 ? 'star' : null) : null;
      R(g, wx - 0.4, wy + wh + HP, ww + 0.8, HP * 2, mix(P.wall[1], '#ffffff', 0.35));
      litWin(g, wx, wy, ww, wh, P.frame, on, dk, P.dark);
      if (P.snow) R(g, wx - 0.4, wy + wh + HP, ww + 0.8, HP, P.snow[1]);
    }
    if (!o.shop) { R(g, x + w / 2 - 1.2, base - 4.6, 2.4, 4.6, P.door); R(g, x + w / 2 - 1.6, base - 5.2, 3.2, HP, P.frame); return; }
    // the shopfront: fascia, the window full of Christmas, the door with its wreath
    var sy = base - shopH;
    R(g, x + 0.6, sy, w - 1.2, 2.2, P.fascia); R(g, x + 0.6, sy, w - 1.2, HP, mix(P.fascia, '#ffffff', 0.35)); R(g, x + 0.6, sy + 2.2, w - 1.2, HP, mix(P.fascia, '#000000', 0.3));
    var dw = 3, dsx = o.doorLeft ? x + 1.6 : x + w - 1.6 - dw, sw0 = o.doorLeft ? dsx + dw + 1 : x + 1.6, sw1 = o.doorLeft ? x + w - 1.6 : dsx - 1;
    glow(g, (sw0 + sw1) / 2, base - shopH * 0.45, (sw1 - sw0) * 0.7, '#ffb860', 0.6);
    R(g, sw0 - HP, sy + 2.6, sw1 - sw0 + HP * 2, base - sy - 3.2, P.fascia);
    R(g, sw0, sy + 3, sw1 - sw0, base - sy - 4, '#ffd68a'); R(g, sw0, sy + 3 + (base - sy - 4) * 0.6, sw1 - sw0, (base - sy - 4) * 0.4, '#f4aa5c');
    // the display: a little tree, presents piled, a row of baubles hung across the top
    var mid = sw0 + (sw1 - sw0) * (0.3 + rnd() * 0.4), fy = base - 1.2;
    span(g, sy + 4, fy, function (yy) { return mid - (yy - sy - 4) * 0.42; }, function (yy) { return mid + (yy - sy - 4) * 0.42; }, '#2a7a44');
    R(g, mid - HP / 2, sy + 3.4, HP, HP, '#fffbe0'); R(g, mid - 1, sy + 6, HP, HP, '#ff5a5a'); R(g, mid + 0.6, sy + 7, HP, HP, '#6ab8ff');
    for (var px = sw0 + 0.4; px < sw1 - 1; px += 1.6 + rnd()) { if (Math.abs(px - mid) < 2.4) continue; var ph = 1 + rnd() * 1.6, pc = XMAS[Math.floor(rnd() * 4)]; R(g, px, fy - ph, 1.4, ph, pc); R(g, px + 0.6, fy - ph, HP, ph, '#fff4d0'); }
    for (px = sw0 + 0.8; px < sw1 - 0.4; px += 1.4) R(g, px, sy + 3.4 + Math.sin(px * 1.3) * 0.4, HP, HP, XMAS[Math.floor(px * 7) % 5]);
    R(g, sw0, base - 0.8, sw1 - sw0, 0.8, P.fascia);
    R(g, dsx, sy + 2.6, dw, base - sy - 2.6, P.door); R(g, dsx + dw * 0.3, sy + 3.4, dw * 0.4, 2.4, '#ffe2a0');
    ring(g, dsx + dw / 2, sy + 7, 0.8, 1.4, '#2a7a44'); R(g, dsx + dw / 2 - HP / 2, sy + 8.2, HP, HP, '#e83a3a');
  };

  /* ---- 8 · Town Lights ---- */
  GEN.townlights = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#6c8cc8';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    // the colours of things in the blue hour: cooled, a little dimmed
    var blue = function (c, a) { return mix(mix(c, '#222a62', 0.56), HZ, a === undefined ? 0.04 : a); };
    /* The blue hour: the sky a deep, clear blue, still light low down, the
       warm light of the town rising faintly onto it; a young moon, the
       first stars, a few long clouds catching the town's glow beneath. */
    var far = strip(), g = far.getContext('2d');
    bloom(g, 120, 118, 200, '#ffb890', 0.55, 0.35);
    stars(g, 34, 2, 40, rnd, ['#ffffff', '#e0e8ff', '#fff4d8']);
    twinkle(g, 168, 18, 1, '#ffffff');
    glow(g, 66, 24, 18, '#c8d8ff', 0.5);
    crescent(g, 66, 24, 6, 2.6, -1.4, 5.6, '#fff6d8'); crescent(g, 65.6, 23.6, 5.4, 2.6, -1.4, 5.6, '#ffffff');
    for (i = 0; i < 7; i++) streak(g, rnd() * SW, 40 + rnd() * 34, 50 + rnd() * 80, 1.4 + rnd() * 1.6, [hm('#24306a', 0.1), hm('#3e4a88', 0.1), '#d8a8c0'], true);
    L.push({ c: far, f: 0.02 });

    /* Far below, beyond the town: the harbour and the sea, still holding a
       little light; Herm, Jethou and Sark low on the horizon with a light
       or two; Castle Cornet floodlit on its rock at the harbour mouth, the
       breakwater running out to it lit with lamps; the marina's masts. */
    var sl = strip(), s = sl.getContext('2d'), SEA = 84;
    sea(s, SEA, [hm('#8aa4d8', 0.1), '#22306a', '#a8c0f0'], rnd, [[66, 2, 16, '#fff6d8', 0.35]], 24);
    isles(s, 14, SEA, 1.05, [hm('#3a4884', 0.35), hm('#8aa0d8', 0.3), '#ffd890'], rnd, true);
    // the breakwater, a long lit arm out to the castle
    for (x = 150; x < 236; x += HP) { y = 100 - (x - 150) * 0.04; R(s, x, y, HP, 1.4, hm('#5a6290', 0.2)); R(s, x, y, HP, HP, hm('#a8b4e0', 0.2)); }
    for (x = 152; x < 234; x += 6) { glow(s, x, 98.6 - (x - 150) * 0.04, 2.2, '#ffd890', 0.6); R(s, x, 98.4 - (x - 150) * 0.04, HP, HP, '#fff0c0'); reflect(s, x, 101.6 - (x - 150) * 0.04, 6, 1, '#ffd890', 0.4); }
    cornet(s, 250, 98, 0.95, [hm('#4a4a7a', 0.15), hm('#c8a888', 0.12), '#ffe2a8', hm('#2a2a50', 0.15)]);
    // the quay and the marina: masts in their dozens, their tips lit, a line of lamps along the front
    for (x = 0; x < SW; x += HP) { y = 106 + wv(x, 2, 1) * 0.6; R(s, x, y, HP, H - y, hm('#2a2c58', 0.15)); R(s, x, y, HP, HP, hm('#7a84b8', 0.15)); }
    for (i = 0; i < 70; i++) { x = (i * 7.3 + rnd() * 5) % SW; if (x > 140 && x < 270) continue; var mh = 5 + rnd() * 8; R(s, x, 104 - mh, HP, mh, hm('#c8d0f0', 0.35)); if (rnd() > 0.5) R(s, x, 104 - mh, HP, HP, '#ffffff'); }
    for (x = 3; x < SW; x += 5.2) { glow(s, x, 104.2, 2.4, '#ffc870', 0.6); R(s, x, 104, HP, HP, '#fff0c0'); }
    L.push({ c: sl, f: 0.035 });

    /* The lower town, tumbling down the hill to the harbour: roof after
       roof, chimneys and gable ends, windows lit in their hundreds, and
       strings of lights already twinkling along a street or two. */
    var lw = strip(), m = lw.getContext('2d');
    var WALLS = ['#e8dcc4', '#f0c8c0', '#c8dcd8', '#d8d0e0', '#a8a4b4', '#f0e0b0'];
    for (j = 0; j < 3; j++) {
      var rb = 100 + j * 7, sc = 0.7 + j * 0.15;
      for (x = -6 + j * 9; x < SW;) {
        var bw = (12 + rnd() * 12) * sc, bh = (8 + rnd() * 8) * sc, wc = WALLS[Math.floor(rnd() * WALLS.length)], a = 0.42 - j * 0.1;
        var top = rb - bh;
        R(m, x, top, bw, H - top, hm(blue(wc), a)); R(m, x + bw - 1, top, 1, H - top, hm(blue(mix(wc, '#3a3a6a', 0.4)), a));
        span(m, top - bw * 0.22, top + 0.5, function (yy) { return x - 0.5 + (top - yy) * 1.4; }, function (yy) { return x + bw + 0.5 - (top - yy) * 1.4; }, hm(blue('#3a4060'), a));
        R(m, x - 0.5 + bw * 0.22 * 1.4, top - bw * 0.22, Math.max(HP, bw + 1 - bw * 0.22 * 2.8), HP, hm('#9aa8d8', a));
        for (var wy = top + 2 * sc; wy < rb + 6; wy += 3.6 * sc) for (var wx = x + 1.5 * sc; wx < x + bw - 2; wx += 3.4 * sc) { var on = rnd() < 0.55; if (on) glow(m, wx + 0.6, wy + 0.8, 2.2 * sc, '#ffb860', 0.4); R(m, wx, wy, 1.2 * sc, 1.6 * sc, on ? '#ffd27a' : hm('#2a3058', a)); }
        if (rnd() > 0.5) R(m, x + bw * 0.7, top - bw * 0.22 - 2.4, 1.6 * sc, 3, hm(blue('#6a5a6a'), a));
        x += bw + (rnd() > 0.7 ? 2 + rnd() * 4 : 0);
      }
      // a street of lights running across, half hidden between the roofs
      for (x = 10 + j * 40; x < SW; x += 70 + rnd() * 40) lights(m, x, rb - 3, x + 40, rb - 4, 1.4, ['#fff0b0', '#ffd27a', '#ff9a9a'], 1.6, hm('#2a2e50', 0.2), 1.2);
    }
    L.push({ c: lw, f: 0.065 });

    /* Our street: tall houses of granite and painted render climbing the
       hill, shopfronts at the bottom glowing with Christmas, windows lit
       above, and between the terraces granite steps going up and a low
       wall to lean on and look down at the harbour. */
    var st = strip(), t = st.getContext('2d'), SB = 118;
    var groups = [[0, 3, 0], [118, 4, 1], [262, 3, 0], [384, 4, 1]], PAINT = ['#f2e2c2', '#f4cfc4', '#cfe2dc', '#e4dcea', '#f0e6b8'];
    groups.forEach(function (gq, gi) {
      var gx = gq[0], climb = 0;
      for (var hN = 0; hN < gq[1]; hN++) {
        var hw = 22 + Math.floor(rnd() * 4) * 3, hh = 46 + rnd() * 16 + climb, granite = rnd() < 0.3, wc = granite ? '#b8b0b8' : PAINT[Math.floor(rnd() * PAINT.length)];
        townHouse(t, gx, SB - climb, hw, hh - climb, {
          wall: [blue(mix(wc, '#4a4a7a', 0.35)), blue(wc), blue(mix(wc, '#ffffff', 0.35))], roof: [blue('#262c48'), blue('#3a4262'), blue('#7a88b8')],
          frame: blue('#f4f0ec', 0.04), dark: blue('#1e2448'), door: blue(['#2a5a48', '#7a2a34', '#2a3a6a'][hN % 3]), fascia: blue(['#1e4a3a', '#5a1e2a', '#22305a', '#3a2a4a'][(hN + gi) % 4]), smoke: hm('#c8d0e8', 0.2)
        }, rnd, { floors: hh > 58 ? 4 : 3, lit: 0.42, shop: true, doorLeft: hN % 2, dormer: rnd() > 0.4, granite: granite, stacks: 2 });
        // the street climbs: each house up a step from the last
        if (hN < gq[1] - 1) { for (var sx = 0; sx < 3; sx++) R(t, gx + hw - 1, SB - climb - sx * 1.5 - 1.5, 2, 1.5, blue('#9a9ab8')); }
        gx += hw; climb += gi % 2 ? 3 : 2;
      }
      // the gap after the terrace: granite steps climbing to the next, with a handrail; a low wall to look over
      var g0 = gx, g1 = groups[(gi + 1) % 4][0] + (gi === 3 ? SW : 0);
      for (x = g0; x < g1; x += HP) { y = SB - 3; R(t, x, y, HP, H - y, blue('#8a88a8')); R(t, x, y, HP, HP, blue('#d0d0e8')); if (Math.round(x * 2) % 8 === 0) R(t, x, y + 0.5, HP, 2.5, blue('#5a5a7a')); }
      var stepsX = g1 - 18;
      for (var k = 0; k < 8; k++) { R(t, stepsX + k * 2, SB - 4 - k * 1.6, 18 - k * 2, 1.6, blue(k % 2 ? '#a8a6c0' : '#9896b4')); R(t, stepsX + k * 2, SB - 4 - k * 1.6, 18 - k * 2, HP, blue('#e0e0f0')); }
      line(t, stepsX - 1, SB - 9, stepsX + 15, SB - 22, HP, blue('#2a2a40')); for (k = 0; k < 4; k++) R(t, stepsX - 1 + k * 5.3, SB - 9 - k * 4.3, HP, 5, blue('#2a2a40'));
      // and Christmas lights strung across the gap from roof to roof
      lights(t, g0 - 2, SB - 60, g1 + 1, SB - 58, 6, XMAS, 2.6, blue('#1a1e38'), 1.8);
    });
    L.push({ c: st, f: 0.12 });

    /* In front: festoons of lights criss-crossing the street overhead, a
       star of bulbs hung at the middle of every other one — and at our
       feet, kept low, the granite kerb, the cobbles and an old lamp post
       or two, lit, with a wreath on each. */
    var nr = strip(), n = nr.getContext('2d'), NB = 124;
    var bulbStar = function (cx, cy, r) {
      for (var a = 0; a < 10; a++) {
        var a0 = -Math.PI / 2 + a * Math.PI / 5, a1 = -Math.PI / 2 + (a + 1) * Math.PI / 5, r0 = a % 2 ? r * 0.45 : r, r1 = a % 2 ? r : r * 0.45;
        for (var tt = 0; tt < 1; tt += 0.34) { var bx = cx + Math.cos(a0 + (a1 - a0) * tt) * (r0 + (r1 - r0) * tt), by = cy + Math.sin(a0 + (a1 - a0) * tt) * (r0 + (r1 - r0) * tt); glow(n, bx, by, 1.6, '#ffe8a0', 0.45); R(n, bx - HP / 2, by - HP / 2, 1, 1, '#fff6d0'); }
      }
    };
    [[0, 96, 2, 10], [96, 190, 6, 8], [190, 300, 0, 11], [300, 404, 5, 9], [404, 512, 1, 10]].forEach(function (q, qi) {
      lights(n, q[0], q[2], q[1], q[2] + 2, q[3], qi % 2 ? ['#fff4c8', '#ffd27a'] : XMAS, 3, '#141830', 2);
      if (qi % 2 === 0) { var mx = (q[0] + q[1]) / 2, my = q[2] + 1 + q[3]; line(n, mx, my, mx, my + 5, HP, '#141830'); bulbStar(mx, my + 10, 5); }
    });
    R(n, 0, NB, SW, H - NB, '#262a48'); R(n, 0, NB, SW, 1, '#8a8cb0'); R(n, 0, NB, SW, HP, '#c8cae4');
    for (x = 0; x < SW; x += 3.2) { R(n, x, NB + 1.5, 2.6, 1.4, '#3a3e60'); R(n, x + 1.6, NB + 3.6, 2.6, 1.4, '#34385a'); }
    [70, 330].forEach(function (lx) {
      glow(n, lx, NB - 30, 22, '#ffd890', 0.85);
      R(n, lx - 0.75, NB - 28, 1.5, 28, '#1a2a28'); R(n, lx - 0.75, NB - 28, HP, 28, '#4a6a5e'); R(n, lx - 1.8, NB - 2.6, 3.6, 2.6, '#1a2a28'); R(n, lx - 1.2, NB - 18, 2.4, 1, '#1a2a28');
      R(n, lx - 2, NB - 34, 4, 5, '#ffe8a0'); R(n, lx - 1.4, NB - 33.4, 1.2, 3.6, '#fffbe0'); R(n, lx - 2.6, NB - 35, 5.2, 1.2, '#1a2a28'); R(n, lx - 2.2, NB - 29.2, 4.4, 1, '#1a2a28'); R(n, lx - HP / 2, NB - 36.6, HP, 1.6, '#1a2a28');
      ring(n, lx, NB - 22, 1.6, 2.8, '#24683c'); R(n, lx - 1.2, NB - 22, HP, HP, '#e83a3a'); R(n, lx + 0.8, NB - 23.5, HP, HP, '#e83a3a'); R(n, lx - 0.8, NB - 19.6, 1.6, 1.4, '#d8302e'); R(n, lx - 1.6, NB - 18.4, 1, 2, '#d8302e'); R(n, lx + 0.6, NB - 18.4, 1, 2, '#d8302e');
    });
    L.push({ c: nr, f: 0.22 });
    return L;
  };
  /* ---- 9 · Shell Beach ---- */
  /* Marram grass on a dune top: stiff blades fanning up and bending over
     with the wind, the moonlight on their tips. c = [shade, body, tip] */
  var marram = function (g, x, base, h, n, c, rnd) {
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + (i / (n - 1) - 0.5) * 1.3 + (rnd() - 0.5) * 0.3, len = h * (0.6 + rnd() * 0.5), bend = 0.25 + rnd() * 0.3;
      for (var t = 0; t < 1; t += HP / len) R(g, x + Math.cos(a) * len * t + bend * t * t * len, base + Math.sin(a) * len * t + t * t * len * 0.12, HP, HP, t > 0.7 ? c[2] : t > 0.3 ? c[1] : c[0]);
    }
  };
  /* A dune: a soft hump of sand, its top lit by the moon and its lee in
     blue shadow, with marram along its crest. c = [shade, body, light] */
  var dune = function (g, cx, base, w, h, c, grass, rnd) {
    for (var x = cx - w; x < cx + w; x += HP) {
      var u = (x - cx) / w, top = base - h * Math.pow(Math.cos(u * Math.PI / 2), 1.6) * (1 - 0.15 * u);
      // lit on its left, the lee in shadow: the boundary runs down from just past the crest, leaning out
      for (var y = top; y < base; y += HP) { var lee = u - 0.12 - (y - top) / h * 0.35 + Math.sin(y * 2.7 + x) * 0.04, foot = (base - y) < 1.5 && Math.sin(x * 3.1 + y) > 0; R(g, x, y, HP, HP, foot ? c[1] : lee > 0 ? c[0] : (y - top < 1.2 ? c[2] : c[1])); }
      if (Math.sin(x * 1.1 + cx) > 0.6) R(g, x, top + 2 + Math.abs(Math.sin(x * 0.3)) * (base - top) * 0.5, HP, HP, mix(c[0], c[1], 0.5));
    }
    if (grass) for (x = cx - w * 0.7; x < cx + w * 0.7; x += 2 + rnd() * 3) { var u2 = (x - cx) / w; marram(g, x, base - h * Math.pow(Math.cos(u2 * Math.PI / 2), 1.6) * (1 - 0.15 * u2) + 0.6, 3 + rnd() * 3, 5, grass, rnd); }
  };

  GEN.herm = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#5a6aa8';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    var MX = 206, MY = 34;
    /* A clear night with a big full moon, a ring of light round it, the
       stars thick everywhere else, and a few small clouds going by lit
       silver on top. */
    var far = strip(), g = far.getContext('2d');
    stars(g, 150, 2, 88, rnd, ['#ffffff', '#e0e8ff', '#fff4d8', '#d8f0ff']);
    [[40, 20], [262, 30], [310, 12], [214, 64]].forEach(function (q) { twinkle(g, q[0], q[1], 1, '#e8f0ff'); });
    moon(g, MX, MY, 22, ['#b0bcdc', '#f0f2ff', '#ffffff', '#c4ccea'], ['#c0d4ff', 0.6]);
    [[88, 58, 0.5], [200, 50, 0.38], [300, 70, 0.45], [420, 56, 0.5]].forEach(function (q) { cloud(g, q[0], q[1], q[2], [hm('#2a3470', 0.1), hm('#4a5a98', 0.1), '#c8d4f4']); });
    for (i = 0; i < 4; i++) streak(g, MX - 60 + i * 34 + rnd() * 10, MY + 4 + i * 5, 40 + rnd() * 30, 1.2 + rnd(), [hm('#1c2450', 0.2), hm('#3a4a86', 0.2), '#b8c8f0']);
    L.push({ c: far, f: 0.02 });

    /* The sea, dark blue, the moon's road laid down it in silver; across
       the water Guernsey, a long low line with its lights twinkling — St
       Peter Port's climbing its hill — and a harbour light at its end. */
    var sl = strip(), s = sl.getContext('2d'), SEA = 92;
    sea(s, SEA, [hm('#5a6aa8', 0.2), '#141c4a', '#8a9ad8'], rnd, [[MX, 6, 90, '#f4f6ff', 0.85]], 30);
    var GF = function (xx) { var d = wd(xx, 60); return Math.abs(d) > 120 ? SEA + 1 : SEA - (3.4 + 2.6 * Math.cos(d / 120 * Math.PI / 2) + wv(xx, 13, 0.4) * 0.5) * Math.min(1, (120 - Math.abs(d)) / 18); };
    for (x = 0; x < SW; x += HP) { y = GF(x); if (y < SEA) { R(s, x, y, HP, SEA - y + HP, hm('#1c2454', 0.3)); R(s, x, y, HP, HP, hm('#6a7ac0', 0.3)); } }
    for (i = 0; i < 70; i++) { var d0 = (rnd() - 0.5) * 220, gx = 60 + d0, top = GF(gx); if (top >= SEA) continue; var town = Math.abs(d0 - 22) < 22, gy = SEA - rnd() * (SEA - top) * (town ? 1 : 0.4); glow(s, gx, gy, town ? 2 : 1.6, '#ffc870', 0.5); R(s, gx, gy, HP, HP, rnd() > 0.3 ? '#ffe0a0' : '#ffffff'); if (town && rnd() > 0.6) reflect(s, gx, SEA + 1, 5, 0.8, '#ffd890', 0.4); }
    [[-50, '#ff6a6a'], [-44, '#6aff9a']].forEach(function (q) { var lx = 60 + q[0]; glow(s, lx, SEA - 1, 3, q[1], 0.7); R(s, lx, SEA - 1.2, HP, HP, '#ffffff'); reflect(s, lx, SEA + 1, 6, 1, q[1], 0.45); });
    haze(s, SEA - 5, 9, '#8a9ad8', 0.25);
    L.push({ c: sl, f: 0.035 });

    /* Herm's little harbour: the granite pier curving out with a lamp at
       its end, boats tucked in behind it, a row of whitewashed cottages
       climbing from the quay with their windows lit, and the dark wooded
       hill behind; elsewhere a rock or two out in the moonlit water. */
    var hb = strip(), b = hb.getContext('2d');
    var HX = 30;
    var HF = function (xx) { var d = wd(xx, HX + 60); return 109 - 30 * Math.exp(-Math.pow((d - 4) / 42, 2)) - 6 * Math.exp(-Math.pow((d + 48) / 24, 2)) + wv(xx, 17, 0.3) * 0.6; };
    for (x = 0; x < SW; x += HP) { y = HF(x); if (y < 108.5) { R(b, x, y, HP, 110 - y, hm('#1a2244', 0.18)); R(b, x, y, HP, HP, hm('#7a8ac8', 0.2)); R(b, x, 110, HP, 3, hm('#1a2244', 0.5)); } }
    // trees on the hill: round dark heads, moonlit on top
    for (i = 0; i < 26; i++) { x = HX + 18 + rnd() * 90; y = HF(x) + 3 + rnd() * 5; pad(b, x, y, 3 + rnd() * 3, 2 + rnd(), 1.2, rnd, [hm('#101a30', 0.15), hm('#1e2c48', 0.15), hm('#5a6ea0', 0.15)]); }
    // the cottages, white walls blue in the moonlight, stepping up from the quay
    [[HX + 24, 104, 12, 6.5], [HX + 44, 101.5, 11, 6], [HX + 62, 102.5, 13, 7]].forEach(function (q, qi) {
      cottage(b, q[0], q[1], q[2], q[3], { plain: true, wall: [hm('#8a94c0', 0.12), hm('#d0d6f0', 0.1), '#eef2ff'], roof: [hm('#2a3256', 0.12), hm('#46507e', 0.12), hm('#a8b4e0', 0.12)], frame: hm('#e8ecf8', 0.1), dark: hm('#1e2648', 0.15), door: hm(['#2a4a6a', '#6a2a3a'][qi % 2], 0.15), smoke: hm('#c8d0f0', 0.2) }, rnd, 0.7, true);
    });
    // the quay and the pier, curving out round the harbour, its lamp lit at the end
    for (x = HX + 10; x < HX + 100; x += HP) { R(b, x, 104.5, HP, 3, hm('#4a5280', 0.12)); R(b, x, 104.5, HP, HP, hm('#c0c8ec', 0.1)); }
    for (x = HX - 30; x < HX + 14; x += HP) { var py = 104.5 + (HX + 14 - x) * 0.08; R(b, x, py, HP, 2.6, hm('#4a5280', 0.12)); R(b, x, py, HP, HP, hm('#c0c8ec', 0.1)); if (Math.round(x * 2) % 6 === 0) R(b, x, py + 1, HP, 1.6, hm('#2a3058', 0.12)); }
    var LX = HX - 28;
    glow(b, LX, 98, 12, '#ffd890', 0.8); R(b, LX - HP / 2, 100, 1, 7, '#1a2030'); R(b, LX - 1.2, 97.4, 2.4, 2.6, '#ffe8a0'); R(b, LX - 1.6, 96.8, 3.2, 0.8, '#1a2030'); reflect(b, LX, 109, 9, 1.4, '#ffd890', 0.5);
    [[HX - 4, 110, 0.6, 1], [HX + 8, 112, 0.7, -1]].forEach(function (q, qi) { mooring(b, q[0], q[1], q[2], [hm(['#2a4a7a', '#7a2a3a'][qi], 0.12), hm('#e0e4f0', 0.12), hm('#c8d0e0', 0.15), '#ffd890', hm('#5a6080', 0.15)], q[3]); });
    for (x = HX - 34; x < HX + 104; x += HP) { y = HF(x); if (y < 106) R(b, x, 107 + Math.sin(x * 0.8) * 0.4, HP, HP, '#e8f0ff'); }
    var RK = [hm('#1a2040', 0.2), hm('#2e3658', 0.2), hm('#7a88b8', 0.2), null, hm('#1a2418', 0.2)];
    [[230, 106, 10, 3], [244, 107, 6, 2], [356, 104, 14, 4], [372, 106, 7, 2.4], [470, 105, 9, 3]].forEach(function (q) { boulder(b, q[0], q[1], q[2], q[3], RK, rnd); for (var k = 0; k < 7; k++) R(b, q[0] - q[2] / 2 + rnd() * q[2], q[1] + rnd() * 0.6, 0.5 + rnd(), HP, '#eef4ff'); });
    L.push({ c: hb, f: 0.07 });

    /* The beach curving round: dunes humped up behind the sand where it
       bends, marram along their tops, and between them the water's edge,
       the small waves breaking white in the moonlight. */
    var dl = strip(), d = dl.getContext('2d');
    var DF = function (xx) { return 112 + wv(xx, 3, 0.8) * 1 + wv(xx, 7, 2) * 0.5; };
    for (x = 0; x < SW; x += HP) {
      y = snap(DF(x));
      for (var yy = y; yy < H; yy += HP) R(d, x, yy, HP, HP, mix('#b0acdc', hm('#5c5a90', 0.1), Math.min(1, (yy - y) / 14)));
      // the wave just broken, and the lace it leaves on the sand
      R(d, x, y - 1, HP, 1, Math.sin(x * 0.6 + Math.sin(x * 0.1) * 2) > -0.3 ? '#ffffff' : '#c8d8ff');
      if (Math.sin(x * 1.3 + Math.sin(x * 0.07) * 4) > 0.2) R(d, x, y + 1.5 + Math.sin(x * 0.11) * 0.8, HP, HP, '#eef2ff');
      R(d, x, y + HP, HP, HP * 2, '#e0e4ff');
    }
    var DC = [hm('#5a5c98', 0.06), hm('#8a8cc4', 0.04), '#d8dcfc'], MG = [hm('#3a4a5a', 0.1), hm('#6a7a7a', 0.1), '#d8e0c8'];
    [[34, 112.5, 40, 10], [250, 112.5, 46, 11], [300, 113, 24, 6], [430, 112.5, 36, 9]].forEach(function (q) { dune(d, q[0], q[1], q[2], q[3], DC, MG, rnd); });
    // the shells, a glitter all along the sand
    for (i = 0; i < 160; i++) { x = rnd() * SW; y = DF(x) + 3 + rnd() * 18; R(d, x, y, HP, HP, ['#ffffff', '#ffd8e8', '#fff0d0', '#d8e0ff'][i % 4]); }
    L.push({ c: dl, f: 0.12 });

    /* In front, kept low: Shell Beach itself — pale sand made of tiny
       shells, a few of them catching the moon and twinkling, tufts of
       marram, a pebble or two. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 2) * 1.4 + wv(xx, 8, 0.6) * 0.6; };
    land(n, nf, ['#6a68a0', '#9894c8', '#e0e0fa'], 6);
    for (i = 0; i < 260; i++) { x = rnd() * SW; y = nf(x) + 1 + rnd() * 18; R(n, x, y, HP, HP, ['#ffffff', '#ffc8dc', '#fff0d0', '#a8a4d0', '#e0d8ff'][i % 5]); }
    for (i = 0; i < 9; i++) { x = rnd() * SW; twinkle(n, x, nf(x) + 2 + rnd() * 4, 0.6, '#ffffff'); }
    [[46, 1], [180, 0.8], [196, 1.2], [338, 1], [470, 0.9]].forEach(function (q) { marram(n, q[0], nf(q[0]) + 1, 7 * q[1], 9, ['#4a5a5a', '#7a8a7a', '#e0e8d0'], rnd); });
    L.push({ c: nr, f: 0.22 });
    return L;
  };

  /* ---- 10 · Sark by Starlight ---- */
  /* The Milky Way: a broad river of light arching across the sky, made of
     stars too many to count, its heart brighter and warmer, a dark lane of
     dust wandering along it. Its line is a whole wave across the strip, so
     it meets itself at the seam. */
  var milkyWay = function (g, rnd, mid, amp, wid, core) {
    var cy = function (x) { return mid + amp * wv(x, 1, 2.2) + amp * 0.25 * wv(x, 2, 0.4); };
    var wf = function (x) { return wid * (0.85 + 0.22 * wv(x, 3, 1.3) + 0.12 * wv(x, 7, 0.2)); };
    var x, i, k;
    // the glow of it: nested soft bands, a little wider and warmer at its heart
    for (x = 0; x < SW; x += HP) {
      var hot = Math.exp(-Math.pow(wd(x, core) / 80, 2)), c = cy(x), w = wf(x) * (1 + hot * 0.35);
      for (k = 0; k < 8; k++) { var hh = w * (1 - k / 8.5); g.globalAlpha = 0.04 + hot * 0.035; R(g, x, c - hh * 0.9, HP, hh * 1.8, k < 3 ? '#6a78c8' : hot > 0.35 && k > 4 ? '#ffe4cc' : '#b4bcf0'); }
    }
    // clouds of starlight bunched along it
    for (i = 0; i < 40; i++) { x = rnd() * SW; var h2 = Math.exp(-Math.pow(wd(x, core) / 80, 2)); g.globalAlpha = 0.04 + h2 * 0.05; oval(g, x, cy(x) + (rnd() - 0.5) * wf(x), 5 + rnd() * 12, 2 + rnd() * 4, h2 > 0.3 ? '#fff0e0' : '#d0d8ff'); }
    // the dust lane, a darker river wandering down the middle, soft at its edges
    for (x = 0; x < SW; x += HP) {
      var dy = cy(x) + wf(x) * (0.12 * wv(x, 5, 1) + 0.08), dw = wf(x) * (0.1 + 0.06 * (1 + wv(x, 9, 2)));
      g.globalAlpha = 0.18; R(g, x, dy - dw * 1.6, HP, dw * 3.2, '#1c2256'); g.globalAlpha = 0.28; R(g, x, dy - dw * 0.8, HP, dw * 1.6, '#161c4a');
      if (Math.sin(x * 0.21) > 0.55) { g.globalAlpha = 0.22; R(g, x, dy + dw * 1.6, HP, dw * 1.4, '#1c2256'); }
    }
    g.globalAlpha = 1;
    // its stars, crowding thickest at its spine
    for (i = 0; i < 1300; i++) {
      x = rnd() * SW; var o = (rnd() + rnd() + rnd() - 1.5) / 1.5 * wf(x), y = cy(x) + o;
      g.globalAlpha = 0.25 + rnd() * 0.65; R(g, x, y, HP, HP, ['#ffffff', '#e8ecff', '#fff4e0', '#d0dcff'][i % 4]);
      if (rnd() > 0.985) { g.globalAlpha = 1; R(g, x, y, 1, 1, '#ffffff'); }
    }
    g.globalAlpha = 1;
  };
  /* A horse and cart going home along a lane far off, the lantern on the
     cart lit: Sark's traffic, being an island without cars. */
  var cart = function (g, x, base, s, col, lamp) {
    // the horse: body, neck and head up, legs, a tail
    oval(g, x, base - 4 * s, 2.6 * s, 1.4 * s, col);
    line(g, x - 2 * s, base - 4.6 * s, x - 3.2 * s, base - 7 * s, Math.max(HP, 1 * s), col); oval(g, x - 3.8 * s, base - 7 * s, 1.1 * s, 0.6 * s, col);
    R(g, x - 3.4 * s, base - 8 * s, HP, 0.8 * s, col);
    [-1.8, -1, 1, 1.8].forEach(function (lx) { R(g, x + lx * s, base - 3 * s, Math.max(HP, 0.35 * s), 3 * s, col); });
    line(g, x + 2.4 * s, base - 4.6 * s, x + 3 * s, base - 2.6 * s, HP, col);
    // the cart, its big wheel, the shafts, the driver
    R(g, x + 3.6 * s, base - 4.8 * s, 6 * s, 2 * s, col); line(g, x + 3.6 * s, base - 4 * s, x + 1.6 * s, base - 4.2 * s, HP, col);
    for (var a = 0; a < 6.28; a += 0.3) R(g, x + 6.4 * s + Math.cos(a) * 1.8 * s, base - 1.8 * s + Math.sin(a) * 1.8 * s, HP, HP, col);
    R(g, x + 7.2 * s, base - 7.4 * s, 1.4 * s, 2.6 * s, col); disc(g, x + 7.9 * s, base - 8.2 * s, 0.7 * s, col);
    glow(g, x + 9.8 * s, base - 6.4 * s, 5 * s, '#ffc870', 0.8); R(g, x + 9.4 * s, base - 7 * s, 0.8 * s, 1 * s, lamp);
  };

  GEN.sark = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#3a4680';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    /* Sark is a Dark Sky island: no street lights, no cars, and so a sky
       the like of which you never see in town — stars in their thousands,
       the Milky Way arched right across it, a few bright stars sparkling.
       No moon tonight: it's the stars' turn. */
    var far = strip(), g = far.getContext('2d');
    bloom(g, 140, 112, 180, '#4a5aa0', 0.6, 0.35);
    stars(g, 320, 2, 104, rnd, ['#ffffff', '#e0e8ff', '#fff4d8', '#d8f0ff', '#ffe0e0']);
    milkyWay(g, rnd, 40, 22, 20, 150);
    [[30, 14, 1.2], [96, 58, 1], [176, 22, 1.4], [232, 70, 1], [300, 36, 1.2], [372, 12, 1], [440, 50, 1.2], [490, 28, 0.9]].forEach(function (q) { twinkle(g, q[0], q[1], q[2], ['#ffffff', '#d8e4ff', '#fff0d0'][Math.floor(q[0]) % 3]); });
    L.push({ c: far, f: 0.015 });

    /* Across the bay, far below: La Coupée, the narrow ridge that joins
       Little Sark to Great Sark, a high path with railings along it and
       steep drops either side down to the sea; the cliffs of both stand
       up dark, starlight along their tops, and the sea far below glints. */
    var cl = strip(), c = cl.getContext('2d'), SEA = 104;
    sea(c, SEA, [hm('#3a4a88', 0.2), '#141a44', '#6a7ac0'], rnd, null, 30);
    var CL = [hm('#141a3a', 0.3), hm('#222a52', 0.3), hm('#8090c8', 0.25)];
    // the cliff profile: Great Sark (left), the ridge, Little Sark (right)
    var CF = function (xx) {
      if (xx < 34 || xx > 360) return SEA + 2;
      if (xx < 56) return SEA - (xx - 34) / 22 * 30 + Math.sin(xx * 1.7) * 1;
      if (xx < 176) return SEA - 30 - wv(xx, 7, 1) * 1.6 - wv(xx, 19, 2) * 0.6;
      if (xx < 188) return SEA - 30 + (xx - 176) * 0.92;
      if (xx < 228) return SEA - 19 - Math.sin((xx - 188) / 40 * Math.PI) * 1.2;
      if (xx < 240) return SEA - 19 - (xx - 228) * 0.75;
      if (xx < 342) return SEA - 28 - wv(xx, 9, 0.6) * 1.4;
      return SEA - 28 + (xx - 342) / 18 * 30;
    };
    for (x = 34; x < 362; x += HP) {
      y = CF(x); var neck = x > 182 && x < 236;
      R(c, x, y, HP, SEA - y + HP, CL[0]);
      R(c, x, y, HP, HP, CL[2]);
      // the cliff faces in gullies and ledges; the ridge's own sides plunge in long streaks
      if (!neck) { for (var ly = y + 2; ly < SEA; ly += 3) if (Math.sin(x * 1.9 + ly * 0.7) > 0.4) R(c, x, ly, HP, HP, CL[1]); }
      else if (Math.sin(x * 2.6) > 0.4) R(c, x, y + 2 + Math.abs(Math.sin(x * 0.7)) * 3, HP, SEA - y - 6, hm('#1c2448', 0.3));
      if (Math.sin(x * 0.8) + Math.sin(x * 0.23) > 1.1 && !neck) R(c, x, y + 0.6, HP, 0.8, hm('#2a3a3a', 0.3));
    }
    // the beach far below the ridge, and the sea's white edge along it
    for (x = 192; x < 228; x += HP) { var bu = (x - 192) / 36; R(c, x, SEA - 1.4 * Math.sin(bu * Math.PI), HP, 1.4 * Math.sin(bu * Math.PI) + HP, hm('#9a9ac8', 0.25)); if (Math.sin(x * 1.3) > 0) R(c, x, SEA, HP, HP, '#d8e0ff'); }
    // the path along the top, its railings against the sky, and the road climbing up at each end
    for (x = 176; x < 242; x += HP) { y = CF(x); R(c, x, y - 1.6, HP, HP, hm('#a8b4e8', 0.15)); if (Math.round(x * 2) % 5 === 0) R(c, x, y - 1.6, HP, 1.6, hm('#a8b4e8', 0.15)); }
    for (x = 150; x < 178; x += HP) R(c, x, CF(x) + 2 + (178 - x) * 0.03, HP, HP, hm('#5a6aa0', 0.25));
    for (x = 240; x < 268; x += HP) R(c, x, CF(x) + 1.6 + (x - 240) * 0.03, HP, HP, hm('#5a6aa0', 0.25));
    // a cottage light or two up on the tops
    [[80, 0], [140, 0], [270, 0], [318, 0]].forEach(function (q) { var lx = q[0], ly2 = CF(lx) + 1.4; glow(c, lx, ly2, 3, '#ffc870', 0.7); R(c, lx, ly2, 1, HP, '#ffe0a0'); });
    haze(c, SEA - 8, 14, '#4a5a98', 0.3);
    L.push({ c: cl, f: 0.03 });

    /* The plateau: little fields and their hedges, farms with a lit window
       and a curl of smoke, wind-bent trees, and along a lane a horse and
       cart going home with its lantern lit. */
    var pl = strip(), p = pl.getContext('2d');
    var PF = function (xx) { return 104 + wv(xx, 2, 1.1) * 2 + wv(xx, 5, 0.3) * 1; };
    land(p, PF, [hm('#141c34', 0.2), hm('#1e2a44', 0.2), hm('#6a7cb0', 0.2)], 6);
    for (j = 0; j < 4; j++) for (x = 0; x < SW;) {
      var fw = 22 + rnd() * 34, fy0 = PF(x) + 2 + j * 4, fc = [hm('#1e2c46', 0.2), hm('#22304a', 0.2), hm('#26303e', 0.2), hm('#1a2840', 0.2)][Math.floor(rnd() * 4)];
      for (var xx = x; xx < x + fw && xx < SW; xx += HP) { R(p, xx, fy0, HP, 4.2, fc); if (j % 2 && Math.round(xx * 2) % 3 === 0) R(p, xx, fy0 + 1.6, HP, HP, hm('#2a3858', 0.2)); }
      for (xx = x; xx < x + fw && xx < SW; xx += HP) { R(p, xx, fy0 - HP, HP, 1, hm('#0e1426', 0.2)); if (Math.sin(xx * 2.1) > 0.5) R(p, xx, fy0 - 1, HP, HP, hm('#0e1426', 0.2)); }
      R(p, x, fy0, 1, 4.2, hm('#0e1426', 0.2));
      x += fw;
    }
    for (i = 0; i < 18; i++) { x = rnd() * SW; y = PF(x) + 1; pad(p, x, y, 2.4 + rnd() * 2.6, 1.6 + rnd(), 1, rnd, [hm('#0a1020', 0.15), hm('#141c30', 0.15), hm('#4a5a88', 0.15)]); }
    [[60, 5], [150, 4.4], [236, 5], [330, 4.6], [430, 5]].forEach(function (q, qi) {
      var bx = q[0], by = PF(bx) + 2.5;
      cottage(p, bx, by, 11, q[1], { wall: [hm('#2a3050', 0.12), hm('#4a5070', 0.12), hm('#8a90b0', 0.12)], roof: [hm('#141a30', 0.12), hm('#20283e', 0.12), hm('#6a78a8', 0.12)], frame: hm('#5a6080', 0.12), dark: hm('#161c34', 0.12), door: hm('#2a2a40', 0.12), smoke: hm('#a8b4d8', 0.25) }, rnd, 0.5, qi % 2 === 0);
    });
    // the lane, and the cart on it
    for (x = 180; x < 300; x += HP) R(p, x, PF(x) + 6 + (x - 180) * 0.02, HP, HP, hm('#4a5478', 0.2));
    cart(p, 210, PF(210) + 6.6, 0.75, hm('#0a0e1e', 0.1), '#fff0c0');
    L.push({ c: pl, f: 0.065 });

    /* Nearer: the hedge-bank along our field, an earth bank grown over with
       gorse and bracken; a farm with its windows warm and a lantern by the
       door; a five-bar gate; bicycles left against the wall. */
    var hl = strip(), h = hl.getContext('2d');
    var HF2 = function (xx) { return 112 + wv(xx, 3, 2.4) * 1.4 + wv(xx, 6, 0.8) * 0.6; };
    land(h, HF2, [hm('#0e1426', 0.1), hm('#18203a', 0.1), hm('#5a6a9a', 0.12)], 8);
    for (x = 0; x < SW; x += 1.6 + rnd() * 2) { if ((x > 92 && x < 150) || (x > 300 && x < 318)) continue; pad(h, x, HF2(x) - 1, 2.4 + rnd() * 1.6, 1.6, 1, rnd, [hm('#0c1428', 0.08), hm('#1a2840', 0.08), hm('#4a6080', 0.1)]); if (rnd() > 0.7) R(h, x, HF2(x) - 2.4, 1, HP, '#e8c860'); }
    cottage(h, 100, HF2(120) + 1.5, 32, 11, { wall: [hm('#3a4060', 0.06), hm('#5a6080', 0.06), hm('#9aa0c0', 0.06)], roof: [hm('#161c30', 0.06), hm('#222a42', 0.06), hm('#7a88b8', 0.06)], frame: hm('#6a7090', 0.06), dark: hm('#161c34', 0.06), door: hm('#3a2a2a', 0.06), smoke: hm('#a8b4d8', 0.2) }, rnd, 0.8, true);
    glow(h, 138, HF2(138) - 6, 9, '#ffc870', 0.8); R(h, 137.4, HF2(138) - 7.4, 1.4, 2, '#ffe8a0'); R(h, 137.2, HF2(138) - 7.8, 1.8, HP, '#2a2a3a');
    // the gate, five bars and a brace
    var GX = 302, GY = HF2(GX);
    for (x = GX; x < GX + 16; x += HP) for (var bar = 0; bar < 5; bar++) R(h, x, GY - 8 + bar * 1.6, HP, HP, hm('#6a7090', 0.1));
    line(h, GX, GY - 1.6, GX + 16, GY - 8, HP, hm('#6a7090', 0.1)); R(h, GX - 1, GY - 9, 1.4, 9, hm('#3a4060', 0.1)); R(h, GX + 16, GY - 9, 1.4, 9, hm('#3a4060', 0.1));
    // two bicycles leaning on the bank
    [[198, 1], [212, -1]].forEach(function (q) {
      var bx = q[0], by = HF2(bx) + 0.5, col = hm('#7a84b0', 0.1);
      [[-3, 0], [3, 0]].forEach(function (w) { for (var a = 0; a < 6.28; a += 0.25) R(h, bx + w[0] + Math.cos(a) * 2.2, by - 2.2 + Math.sin(a) * 2.2, HP, HP, col); });
      line(h, bx - 3, by - 2.2, bx, by - 5, HP, col); line(h, bx, by - 5, bx + 3, by - 2.2, HP, col); line(h, bx - 3, by - 2.2, bx + 0.6, by - 2.6, HP, col); line(h, bx, by - 5, bx - 0.6, by - 6.4, HP, col); R(h, bx - 1.4, by - 6.6, 1.8, HP, col); line(h, bx + 3, by - 2.2, bx + 2.4, by - 6, HP, col); R(h, bx + 1.6, by - 6.4, 1.8, HP, col);
      R(h, bx + 2.2, by - 7.6, 2.4, 1.4, hm('#a88a5a', 0.15));
    });
    L.push({ c: hl, f: 0.12 });

    /* In front, kept low: long grass and gorse in flower (it flowers all
       year round), a few ferns. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 4, 0.4) * 1.2 + wv(xx, 9, 1.3) * 0.5; };
    land(n, nf, ['#10162a', '#1a2238', '#4a5a80'], 5);
    for (x = 0; x < SW; x += 0.9) { var gb = nf(x) + 1, gh = 2.4 + Math.abs(Math.sin(x * 0.41)) * 3.4; for (var t = 0; t < 1; t += HP / gh) R(n, x + t * t * gh * 0.4 * Math.sin(x), gb - t * gh, HP, HP, t > 0.7 ? '#6a7ca8' : t > 0.35 ? '#2e3e5e' : '#1e2a44'); }
    for (i = 0; i < 9; i++) {
      x = 20 + i * 56 + rnd() * 20; y = nf(x) + 1;
      pad(n, x, y - 3, 6 + rnd() * 3, 3, 1.2, rnd, ['#0e1a20', '#1c3030', '#3e5a54']);
      for (j = 0; j < 14; j++) { var fx = x + (rnd() - 0.5) * 12, fy = y - 2 - rnd() * 4; R(n, fx, fy, 1, HP, '#e8b830'); R(n, fx, fy, HP, HP, '#fff0a0'); }
    }
    L.push({ c: nr, f: 0.22 });
    return L;
  };
  /* ---- 11 · Over the Rooftops ---- */
  /* A row of snowy roofs, seen from above them: long slate roofs side-on
     and gable ends turned to us, the snow lying thick on every slope with
     a dark line of slates showing at the eaves, icicles hanging from the
     gutters, chimney stacks capped with snow and smoking, dormers and
     windows lit. base = where the walls stand; s = size; tone hazes it;
     lit = the chance of a window being lit */
  var snowRoofs = function (g, base, s, rnd, tone, lit, gap) {
    var SN = [tone('#9aa8d8'), tone('#dce6fc'), tone('#ffffff')], RF = [tone('#1a2038'), tone('#2a3250'), tone('#46507a')];
    var WALLS = ['#3e3a52', '#3a3e56', '#46404e', '#384052'];
    for (var x = -4; x < SW;) {
      var w = (18 + rnd() * 18) * s, hw = (5 + rnd() * 7) * s, top = base - hw, rh = (6 + rnd() * 5) * s, gable = rnd() < 0.35, y;
      var WL = [tone('#221e30'), tone(WALLS[Math.floor(rnd() * 4)]), tone('#5a5468')];
      R(g, x, top, w, hw + 3, WL[1]); R(g, x + w - 1.5, top, 1.5, hw + 3, WL[0]); R(g, x, top, HP, hw + 3, WL[2]);
      // the windows in the wall: at midnight most are dark, the children asleep; a few still lit
      for (var wy = top + 2 * s; wy < base - 2 * s; wy += 5 * s) for (var wx = x + 2.5 * s; wx < x + w - 4 * s; wx += 5 * s) litWin(g, wx, wy, 2.2 * s, 2.6 * s, WL[0], rnd() < lit, rnd() > 0.7 ? 'tree' : null, tone('#161a2e'));
      if (gable) {
        // the gable end turned to us: a triangle of wall, the roof's edges in snow, a round window lit
        span(g, top - rh, top, function (yy) { return x + (top - yy) / rh * w / 2; }, function (yy) { return x + w - (top - yy) / rh * w / 2; }, WL[1]);
        span(g, top - rh, top, function (yy) { return x + w * 0.62 + (top - yy) / rh * w * 0.12 - (top - yy) / rh * w * 0.24; }, function (yy) { return x + w - (top - yy) / rh * w / 2; }, WL[0]);
        line(g, x - 1, top + 0.6, x + w / 2, top - rh - 0.8, 1.2 * s, SN[1]); line(g, x + w + 1, top + 0.6, x + w / 2, top - rh - 0.8, 1.2 * s, SN[0]); line(g, x - 1, top, x + w / 2, top - rh - 1.2, HP, SN[2]);
        var on = rnd() < lit + 0.2;
        if (on) glow(g, x + w / 2, top - rh * 0.38, 4 * s, '#ffb860', 0.5);
        disc(g, x + w / 2, top - rh * 0.38, 1.4 * s + HP, WL[2]); disc(g, x + w / 2, top - rh * 0.38, 1.4 * s, on ? WARM : tone('#161a2e'));
        if (on && rnd() > 0.4) { ring(g, x + w / 2, top - rh * 0.38, 0.7 * s, 1.1 * s, '#2a7a44'); R(g, x + w / 2 - HP / 2, top - rh * 0.38 + 0.9 * s, HP, HP, '#e83a3a'); }
      } else {
        // a long roof side-on: slates showing only in a dark band at the eaves, the rest under snow
        span(g, top - rh, top + 0.5, function (yy) { return x - 1.2 + (top - yy) * 0.9; }, function (yy) { return x + w + 1.2 - (top - yy) * 0.9; }, RF[1]);
        span(g, top - rh - HP, top - 1.4 * s, function (yy) { return x - 1 + (top - yy) * 0.9; }, function (yy) { return x + w + 1 - (top - yy) * 0.9; }, SN[1]);
        span(g, top - rh - HP, top - 1.4 * s, function (yy) { return x + w * 0.7 + (top - yy) * 0.25; }, function (yy) { return x + w + 1 - (top - yy) * 0.9; }, SN[0]);
        for (var sx = x - 1; sx < x + w + 1; sx += HP) R(g, sx, top - 1.4 * s, HP, HP + Math.abs(Math.sin(sx * 1.3 + x)) * 0.8 * s, SN[sx > x + w * 0.7 ? 0 : 1]);
        R(g, x - 1.2 + rh * 0.9, top - rh - HP, w + 2.4 - rh * 1.8, HP, SN[2]);
        R(g, x - 1.2, top, w + 2.4, HP, RF[0]);
        // a dormer, lit, snow on its little roof
        if (rnd() > 0.4 && w > 20 * s) {
          var dx = x + 4 * s + rnd() * (w - 12 * s), dt = top - rh * 0.62, don = rnd() < lit + 0.3;
          R(g, dx, dt, 4 * s, rh * 0.62 - s, WL[1]); R(g, dx + 4 * s - HP, dt, HP, rh * 0.62 - s, WL[0]);
          span(g, dt - 2.2 * s, dt + HP, function (yy) { return dx - 0.8 + (dt - yy) * 1.1; }, function (yy) { return dx + 4 * s + 0.8 - (dt - yy) * 1.1; }, SN[1]);
          litWin(g, dx + 0.9 * s, dt + 0.8 * s, 2.2 * s, Math.max(1, rh * 0.62 - 2.6 * s), WL[0], don, don && rnd() > 0.5 ? 'wreath' : null, tone('#161a2e'));
        }
        // icicles along the gutter
        for (sx = x - 0.6; sx < x + w + 0.6; sx += 1 + rnd() * 1.6) { var il = 0.6 + rnd() * 1.8 * s; R(g, sx, top + HP, HP, il, SN[1]); R(g, sx, top + HP, HP, HP, SN[2]); }
      }
      // chimney stacks, capped with snow, smoking
      if (rnd() > 0.3) {
        var cx = x + w * (0.15 + rnd() * 0.55), ch = (4 + rnd() * 4) * s, cb = gable ? top - rh * (1 - Math.abs(cx + 2 - x - w / 2) / (w / 2)) + 1 : top - rh + 1, cw = (3.5 + rnd() * 3) * s;
        R(g, cx, cb - ch, cw, ch, tone('#7a3430')); R(g, cx + cw * 0.7, cb - ch, cw * 0.3, ch, tone('#4a2224')); R(g, cx, cb - ch, HP, ch, tone('#a85a48'));
        for (y = cb - ch + 1.5; y < cb; y += 1.5) R(g, cx, y, cw, HP, tone('#5a2a28'));
        var np = 1 + Math.floor(rnd() * 3);
        for (var k = 0; k < np; k++) { var px = cx + (k + 0.5) * cw / np - 0.7; R(g, px, cb - ch - 2.6, 1.4, 2.2, tone('#9a5432')); R(g, px + 0.9, cb - ch - 2.6, 0.5, 2.2, tone('#5a2e22')); R(g, px - 0.2, cb - ch - 2.8, 1.8, HP, SN[2]); }
        R(g, cx - 0.6, cb - ch - 1, cw + 1.2, 1.2, SN[1]); R(g, cx - 0.6, cb - ch - 1, cw + 1.2, HP, SN[2]);
        if (rnd() > 0.3) for (var j = 0; j < 8; j++) { g.globalAlpha = 0.3 - j * 0.034; disc(g, cx + cw / 2 + j * 1.3 + Math.sin(j) * 0.7, cb - ch - 4.4 - j * 2.2, 0.8 + j * 0.32, tone('#b8c0e0')); }
        g.globalAlpha = 1;
      }
      x += w + (rnd() > gap ? 2 + rnd() * 5 : -1);
    }
  };
  // the harbour far below and the sea out to the islands, by night; shared by the rooftops and the title
  var harbourBelow = function (s, SEA, rnd, hm, moonX, cornetX, glowA) {
    sea(s, SEA, [hm('#5a6ab0', 0.15), '#121a48', '#8a9ad8'], rnd, moonX ? [[moonX, 4, 70, '#f0f4ff', 0.8]] : null, 22);
    isles(s, 170, SEA, 1, [hm('#1e2860', 0.35), hm('#7a8cd0', 0.3), '#ffd890'], rnd, true);
    for (var x = cornetX + 12; x < cornetX + 100; x += HP) { var y = SEA + 14 - (x - cornetX - 12) * 0.03; R(s, x, y, HP, 1.4, hm('#4a5288', 0.2)); R(s, x, y, HP, HP, hm('#a8b4e0', 0.2)); }
    for (x = cornetX + 14; x < cornetX + 98; x += 7) { var ly = SEA + 12.8 - (x - cornetX - 12) * 0.03; glow(s, x, ly, 2.2, '#ffd890', 0.6); R(s, x, ly - HP, HP, HP, '#fff0c0'); reflect(s, x, ly + 2.6, 5, 1, '#ffd890', 0.35); }
    cornet(s, cornetX, SEA + 14, 0.85, [hm('#3a3c6a', 0.15), hm('#b8a090', 0.12), '#ffe2a8', hm('#22244a', 0.15)]);
    for (x = 0; x < SW; x += HP) { var qy = SEA + 22 + wv(x, 2, 1) * 0.6; R(s, x, qy, HP, H - qy, hm('#22264e', 0.15)); R(s, x, qy, HP, HP, hm('#7a84b8', 0.15)); }
    for (var i = 0; i < 60; i++) { x = (i * 8.5 + rnd() * 5) % SW; if (Math.abs(wd(x, cornetX + 50)) < 70) continue; var mh = 5 + rnd() * 7; R(s, x, SEA + 20 - mh, HP, mh, hm('#c8d0f0', 0.4)); if (rnd() > 0.5) R(s, x, SEA + 20 - mh, HP, HP, '#ffffff'); }
    for (x = 3; x < SW; x += 5.6) { glow(s, x, SEA + 20.2, 2.2, '#ffc870', 0.5 * glowA); R(s, x, SEA + 20, HP, HP, '#fff0c0'); }
  };

  GEN.rooftops = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#4a5a9a';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    /* Midnight on Christmas Eve: a huge moon over the town, its halo wide
       and soft, the stars out everywhere, a silver cloud or two. */
    var far = strip(), g = far.getContext('2d'), MX = 118, MY = 42;
    stars(g, 190, 2, 84, rnd, ['#ffffff', '#e0e8ff', '#fff4d8', '#d8f0ff']);
    [[30, 18], [220, 24], [270, 60], [330, 14], [440, 36]].forEach(function (q) { twinkle(g, q[0], q[1], 1.1, '#e8f0ff'); });
    moon(g, MX, MY, 30, ['#b4bede', '#f2f4ff', '#ffffff', '#c6cee8'], ['#c4d4ff', 0.6]);
    for (i = 0; i < 5; i++) streak(g, MX - 80 + i * 40 + rnd() * 12, MY + 14 + i * 4 + rnd() * 3, 40 + rnd() * 40, 1.2 + rnd(), [hm('#1c2450', 0.2), hm('#34407a', 0.2), '#c8d4f8']);
    L.push({ c: far, f: 0.015 });

    /* Far below: the harbour asleep, a few lamps along the quay, Castle
       Cornet lit on its rock, the moon's road across the sea to the
       islands. */
    var hl = strip(), h = hl.getContext('2d');
    harbourBelow(h, 80, rnd, hm, MX, 26, 0.7);
    L.push({ c: hl, f: 0.03 });

    /* The town falling away below us, roof upon roof under the snow,
       chimneys smoking, a window lit here and there; and nearer, the big
       roofs we're running over, icicles at their gutters, dormers lit,
       wreaths in the windows. */
    var r1 = strip(), q1 = r1.getContext('2d');
    snowRoofs(q1, 106, 0.7, rnd, function (c) { return hm(c, 0.36); }, 0.32, 0.6);
    R(q1, 0, 106, SW, H - 106, hm('#1c2036', 0.36));
    L.push({ c: r1, f: 0.06 });
    var r2 = strip(), q2 = r2.getContext('2d');
    snowRoofs(q2, 118, 1.05, rnd, function (c) { return hm(c, 0.14); }, 0.4, 0.55);
    R(q2, 0, 118, SW, H - 118, hm('#161a2c', 0.14));
    L.push({ c: r2, f: 0.11 });

    /* In front, kept low: a near ridge under deep snow, big chimney stacks
       with their pots, an aerial with snow on its arms, a robin's footprints. */
    var nr = strip(), n = nr.getContext('2d'), NB = 124;
    R(n, 0, NB, SW, H - NB, '#2a3254'); R(n, 0, NB - 1.4, SW, 2, '#e4ecff'); R(n, 0, NB - 1.4, SW, HP, '#ffffff'); R(n, 0, NB + 0.6, SW, HP, '#9aa8d8');
    for (x = 0; x < SW; x += HP) { var hump = Math.abs(Math.sin(x * 0.11)) * 1.4 + Math.abs(Math.sin(x * 0.37)) * 0.5; R(n, x, NB - 1.4 - hump, HP, hump, '#f0f4ff'); }
    for (x = 0; x < SW; x += 2.6) R(n, x, NB + 2, 2, 1, '#3a4268');
    [[40, 12, 12, 3], [200, 9, 10, 2], [330, 13, 14, 4], [470, 9, 11, 2]].forEach(function (q) {
      var cx = q[0], cw = q[1], ch = q[2], cb = NB - 1;
      R(n, cx, cb - ch, cw, ch, '#7a3430'); R(n, cx + cw * 0.7, cb - ch, cw * 0.3, ch, '#4a2224'); R(n, cx, cb - ch, HP, ch, '#a85a48');
      for (y = cb - ch + 1.5; y < cb; y += 1.5) for (var bx = cx + ((y - cb) / 1.5 % 2 ? 0 : 1); bx < cx + cw; bx += 2) R(n, bx, y, HP, HP, '#4a2224');
      for (var k = 0; k < q[3]; k++) { var px = cx + (k + 0.5) * cw / q[3] - 0.8; R(n, px, cb - ch - 3.4, 1.6, 2.4, '#b06a40'); R(n, px + 1, cb - ch - 3.4, 0.6, 2.4, '#6a3a24'); R(n, px - 0.2, cb - ch - 3.8, 2, 0.6, '#ffffff'); }
      R(n, cx - 0.8, cb - ch - 1.2, cw + 1.6, 1.4, '#e4ecff'); R(n, cx - 0.8, cb - ch - 1.2, cw + 1.6, HP, '#ffffff'); R(n, cx + 1, cb - ch + 0.2, 1, 1.4, '#e4ecff');
      for (var j2 = 0; j2 < 9; j2++) { n.globalAlpha = 0.32 - j2 * 0.033; disc(n, cx + cw * 0.3 + j2 * 1.4 + Math.sin(j2) * 0.8, cb - ch - 5.4 - j2 * 2.3, 0.9 + j2 * 0.34, '#c8d0ec'); }
      n.globalAlpha = 1;
    });
    // an aerial with snow along its arms
    var AX = 268;
    R(n, AX, NB - 22, HP * 1.5, 21, '#5a6280');
    for (var a = 0; a < 5; a++) { R(n, AX - 6 + a * 0.6, NB - 21 + a * 1.6, 12 - a * 1.2, HP, '#5a6280'); R(n, AX - 6 + a * 0.6, NB - 21.5 + a * 1.6, 12 - a * 1.2, HP, '#ffffff'); }
    // footprints of a robin across the snow
    for (x = 96; x < 150; x += 3) { R(n, x, NB - 0.6 + Math.sin(x) * 0.3, HP, HP, '#8a9ad0'); R(n, x + 1, NB - 0.2, HP, HP, '#8a9ad0'); }
    L.push({ c: nr, f: 0.2 });
    return L;
  };

  /* ---- the title: St Peter Port harbour at dusk on Christmas Eve ---- */
  GEN.xtitle = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#8a7ab8';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    var dusk = function (c, a) { return mix(mix(c, '#3a3478', 0.42), HZ, a === undefined ? 0.04 : a); };
    /* Dusk on Christmas Eve: deep blue overhead, going rose and gold low
       down behind the town, the evening star out and the first stars, a
       few clouds lit pink beneath. (The top is kept calm for the title.) */
    var far = strip(), g = far.getContext('2d');
    for (y = 40; y < 110; y++) { g.globalAlpha = 0.4 * Math.pow((y - 40) / 70, 1.7); R(g, 0, y, SW, 1, '#ffb0b0'); }
    g.globalAlpha = 1;
    bloom(g, 140, 96, 160, '#ffb0a0', 0.7, 0.4);
    stars(g, 70, 2, 46, rnd, ['#ffffff', '#ffe8f8', '#e0e8ff']);
    twinkle(g, 210, 22, 1.3, '#fff8e8');
    for (i = 0; i < 7; i++) streak(g, rnd() * SW, 50 + rnd() * 26, 60 + rnd() * 80, 1.4 + rnd() * 1.8, [hm('#3c2c6c', 0.15), hm('#8a6aa0', 0.15), '#ffc0b0'], true);
    L.push({ c: far, f: 0.02 });

    /* The top of the hill behind the town: snowy trees and the big houses
       along the skyline, windows lit. */
    var hl = strip(), h = hl.getContext('2d');
    var HF = function (xx) { return 40 + wv(xx, 2, 0.6) * 4 + wv(xx, 5, 1.6) * 1.6; };
    land(h, HF, [dusk('#2a2c58', 0.2), dusk('#3a3c6a', 0.2), dusk('#e8e8ff', 0.15)], 4);
    for (i = 0; i < 40; i++) { x = rnd() * SW; y = HF(x) + 1; pad(h, x, y, 2.6 + rnd() * 2.4, 1.8 + rnd(), 1, rnd, [dusk('#1a2440', 0.2), dusk('#2a3a54', 0.2), dusk('#f0f4ff', 0.1)]); }
    for (x = 4; x < SW; x += 14 + rnd() * 20) { var bw = 8 + rnd() * 6, bt = HF(x) - 3 - rnd() * 3; R(h, x, bt, bw, 8, dusk('#8a84a8', 0.2)); span(h, bt - 2.6, bt + 0.4, function (yy) { return x - 0.4 + (bt - yy) * 0.8; }, function (yy) { return x + bw + 0.4 - (bt - yy) * 0.8; }, dusk('#f4f6ff', 0.1)); for (var wx = x + 1.4; wx < x + bw - 1; wx += 2.4) { glow(h, wx + 0.5, bt + 2.4, 1.6, '#ffb860', 0.5); R(h, wx, bt + 1.8, 1, 1.2, '#ffd27a'); } }
    L.push({ c: hl, f: 0.03 });

    /* The town climbing its hill from the harbour, terrace above terrace,
       snow on every roof and every window lit. */
    var ul = strip(), u = ul.getContext('2d');
    for (j = 0; j < 3; j++) {
      var rb = 52 + j * 11, sc = 0.62 + j * 0.1, PT = ['#e8dcc4', '#f0c8c0', '#c8dcd8', '#d8d0e0', '#f0e0b0', '#b8b0b8'];
      for (x = -4 + j * 7; x < SW;) {
        var w = (12 + rnd() * 10) * sc, hh = (10 + rnd() * 6) * sc, pc = PT[Math.floor(rnd() * PT.length)];
        var hz2 = 0.34 - j * 0.08;
        townHouse(u, x, rb, w, hh, { wall: [dusk(mix(pc, '#4a4a7a', 0.35), hz2), dusk(pc, hz2), dusk(mix(pc, '#ffffff', 0.3), hz2)], roof: [dusk('#262c48', hz2), dusk('#3a4262', hz2), dusk('#7a88b8', hz2)], frame: dusk('#f4f0ec', hz2), dark: dusk('#1e2448', hz2), door: dusk('#2a3a5a', hz2), snow: [dusk('#c8d0f0', hz2 + 0.06), dusk('#f4f6ff', hz2 * 0.6)] }, rnd, { floors: 2, lit: 0.8, stacks: rnd() > 0.5 ? 1 : 0 });
        x += w + (rnd() > 0.7 ? 2 : 0);
      }
    }
    L.push({ c: ul, f: 0.045 });

    /* The front: the tall terrace along the harbour, its windows all lit,
       strings of lights along the quay, the town's big Christmas tree
       shining at the water's edge, lamp posts lit. */
    var fl = strip(), f = fl.getContext('2d'), FB = 102, PAINT = ['#f2e2c2', '#f4cfc4', '#cfe2dc', '#e4dcea', '#f0e6b8', '#c8c0c8'];
    for (x = 0; x < SW;) {
      var hw = 18 + Math.floor(rnd() * 4) * 3, h2 = 26 + rnd() * 10, wc = PAINT[Math.floor(rnd() * PAINT.length)];
      if (x > 128 && x < 168) { x = 168; continue; }
      townHouse(f, x, FB, hw, h2, { wall: [dusk(mix(wc, '#4a4a7a', 0.35)), dusk(wc), dusk(mix(wc, '#ffffff', 0.35))], roof: [dusk('#262c48'), dusk('#3a4262'), dusk('#7a88b8')], frame: dusk('#f4f0ec', 0.02), dark: dusk('#1e2448'), door: dusk(['#2a5a48', '#7a2a34', '#2a3a6a'][Math.floor(rnd() * 3)]), fascia: dusk(['#1e4a3a', '#5a1e2a', '#22305a'][Math.floor(rnd() * 3)]), snow: ['#c8d0f0', '#f6f8ff'], smoke: hm('#d8d0f0', 0.2) }, rnd, { floors: 3, lit: 0.85, shop: rnd() > 0.3, doorLeft: rnd() > 0.5, dormer: rnd() > 0.5, stacks: 2 });
      x += hw;
    }
    // behind the tree, a lower house set back, so the gap the tree stands in isn't empty
    townHouse(f, 129, FB, 38, 22, { wall: [dusk('#8a7a8a', 0.12), dusk('#d8c8c0', 0.12), dusk('#f0e4dc', 0.12)], roof: [dusk('#262c48'), dusk('#3a4262'), dusk('#7a88b8')], frame: dusk('#f4f0ec', 0.1), dark: dusk('#1e2448'), door: dusk('#2a3a5a'), snow: ['#c8d0f0', '#f6f8ff'] }, rnd, { floors: 2, lit: 0.9, stacks: 2 });
    // the quay, its lamps, and the lights strung along it
    R(f, 0, FB, SW, 4, dusk('#8a88a8')); R(f, 0, FB, SW, HP, dusk('#e0e0f4'));
    for (x = 0; x < SW; x += 64) lights(f, x, FB - 12, x + 64, FB - 12, 3, XMAS, 2.4, dusk('#1a1e38'), 1.6);
    for (x = 20; x < SW; x += 48) { glow(f, x, FB - 13, 9, '#ffd890', 0.8); R(f, x - HP / 2, FB - 12, 1, 12, '#1a2030'); R(f, x - 1.2, FB - 14.6, 2.4, 2.8, '#ffe8a0'); R(f, x - 1.6, FB - 15.2, 3.2, 0.8, '#1a2030'); R(f, x - 1.2, FB - 15.8, 2.4, HP, '#ffffff'); }
    // the big Christmas tree on the quay: tiers of fir, snow on its boughs, lights all over and a star on top
    var TX = 148, TB = FB, TH = 40;
    glow(f, TX, TB - TH * 0.5, 34, '#ffd890', 0.55);
    for (y = 0; y < TH; y += HP) {
      var k = y / TH, tier = (k * 5) % 1, hw2 = (2 + k * 13) * (0.72 + 0.28 * tier);
      R(f, TX - hw2, TB - TH + y, hw2 * 2, HP, '#1e5a3c'); R(f, TX + hw2 * 0.3, TB - TH + y, hw2 * 0.7, HP, '#164430'); R(f, TX - hw2, TB - TH + y, hw2 * 0.4, HP, '#2e7a4a');
      if (tier < 0.12) R(f, TX - hw2, TB - TH + y, hw2 * 1.4, HP, '#f0f4ff');
    }
    R(f, TX - 1.2, TB - 2, 2.4, 2, '#4a2a1a');
    for (i = 0; i < 70; i++) { var tk = rnd(), ty = TB - TH + 4 + tk * (TH - 6), tw = (2 + tk * 13) * 0.85, tx = TX + (rnd() * 2 - 1) * tw; glow(f, tx, ty, 1.6, XMAS[i % 6], 0.5); R(f, tx - HP / 2, ty - HP / 2, 1, 1, XMAS[i % 6]); }
    glow(f, TX, TB - TH - 2, 9, '#fff0a0', 0.9);
    for (var a = 0; a < 10; a++) { var r0 = a % 2 ? 1.2 : 3; line(f, TX, TB - TH - 2, TX + Math.cos(-Math.PI / 2 + a * Math.PI / 5) * r0, TB - TH - 2 + Math.sin(-Math.PI / 2 + a * Math.PI / 5) * r0, HP * 1.5, '#ffe060'); }
    R(f, TX - HP, TB - TH - 2.6, 1, 1, '#ffffff');
    L.push({ c: fl, f: 0.07 });

    /* The harbour: the water holding every light, broken into ribbons by
       the ripples; boats on their moorings dressed with Christmas lights up
       their masts and down to their bows. */
    var wl = strip(), w2 = wl.getContext('2d'), WY = 106;
    for (y = WY; y < H; y += HP) R(w2, 0, y, SW, HP, mix(hm('#4a4a8a', 0.1), '#1c1e4a', Math.min(1, (y - WY) / 30)));
    R(w2, 0, WY, SW, HP, hm('#c8b8e0', 0.1));
    for (x = 2; x < SW; x += 2 + rnd() * 3) reflect(w2, x, WY + 1, 8 + rnd() * 14, 1 + rnd(), rnd() > 0.7 ? XMAS[Math.floor(rnd() * 6)] : '#ffd890', 0.3);
    reflect(w2, 148, WY + 1, 26, 6, '#ffe0a0', 0.4);
    for (i = 0; i < 160; i++) { x = rnd() * SW; y = WY + 2 + Math.pow(rnd(), 1.4) * (H - WY - 2); w2.globalAlpha = 0.3; R(w2, x, y, 2 + rnd() * 6, HP, '#8a8ad0'); }
    w2.globalAlpha = 1;
    [[40, 118, 1.3, 1], [96, 114, 1, -1], [214, 120, 1.4, -1], [286, 115, 1, 1], [372, 119, 1.3, 1], [452, 114, 0.9, -1]].forEach(function (q, qi) {
      var bx = q[0], by = q[1], s2 = q[2], col = [hm('#2a4a7a', 0.1), hm('#8a2a3a', 0.1), hm('#e8e4f0', 0.1), hm('#2a5a4a', 0.1)][qi % 4];
      mooring(w2, bx, by, s2, [col, hm('#f0ecf4', 0.1), hm('#d8d0e0', 0.12), '#ffd890', hm('#5a5068', 0.12)], q[3]);
      // dressed overall: a string of lights from the bow up to the masthead and down to the stern
      var mx = bx + q[3] * 1.4 * s2, mt = by - 8 * s2;
      lights(w2, bx - 5 * s2, by - 2 * s2, mx, mt, 0.6, XMAS, 1.2, hm('#2a2440', 0.1), 1.2);
      lights(w2, mx, mt, bx + 5 * s2, by - 2 * s2, 0.6, XMAS, 1.2, hm('#2a2440', 0.1), 1.2);
    });
    L.push({ c: wl, f: 0.11 });
    return L;
  };

  /* ---- the ending: Christmas morning ---- */
  /* A tree in winter: bare boughs reaching up and out, each one with snow
     along its top. c = [bark, bark light, snow] */
  var bareTree = function (g, x, base, h, c, rnd) {
    var bough = function (x0, y0, len, a, w, d) {
      var n = Math.ceil(len / HP), px = x0, py = y0;
      for (var i = 0; i < n; i++) { var t = i / n, ww = Math.max(HP, w * (1 - t * 0.7)); R(g, px - ww / 2, py, ww, ww, c[0]); R(g, px - ww / 2, py - HP, ww * 0.7, HP, c[2]); px += Math.cos(a) * HP; py += Math.sin(a) * HP; a += (rnd() - 0.5) * 0.06; }
      if (d > 0) [0.45, 0.75].forEach(function (f2, k) { bough(x0 + Math.cos(a) * len * f2, y0 + Math.sin(a) * len * f2, len * 0.55, a + (k ? -0.6 : 0.55) + (rnd() - 0.5) * 0.3, w * 0.6, d - 1); });
    };
    R(g, x - h * 0.04, base - h * 0.45, h * 0.08, h * 0.45, c[0]); R(g, x - h * 0.04, base - h * 0.45, HP, h * 0.45, c[1]);
    bough(x, base - h * 0.44, h * 0.5, -Math.PI / 2 - 0.5, h * 0.06, 2);
    bough(x, base - h * 0.44, h * 0.55, -Math.PI / 2 + 0.45, h * 0.06, 2);
    bough(x, base - h * 0.44, h * 0.5, -Math.PI / 2, h * 0.07, 2);
  };

  GEN.xmorning = function (rnd, th) {
    var L = [], i, j, x, y;
    var HZ = '#c8e4fa';
    var hm = function (c, a) { return mix(c, HZ, a === undefined ? 0.3 : a); };
    /* Christmas morning: the snow's stopped and the sky's washed a clear
       blue, the low winter sun bright on the left, a few soft clouds, gulls
       wheeling over the sea. */
    var far = strip(), g = far.getContext('2d');
    bloom(g, 50, 26, 90, '#fff6d8', 0.9); bloom(g, 50, 26, 30, '#ffffff', 1);
    disc(g, 50, 26, 8, '#fffbe8'); disc(g, 48.6, 24.6, 4.4, '#ffffff');
    [[110, 30, 0.9], [200, 18, 0.7], [290, 40, 1], [400, 26, 0.8], [470, 44, 0.6]].forEach(function (q) { cloud(g, q[0], q[1], q[2], [hm('#a8cce8', 0.1), '#ffffff', '#ffffff']); });
    [[160, 50, 1], [170, 46, 0.8], [330, 34, 0.9]].forEach(function (q) { gull(g, q[0], q[1], q[2], [hm('#ffffff', 0.05), hm('#c8d4e4', 0.1), hm('#3a4a5a', 0.2)]); });
    L.push({ c: far, f: 0.02 });

    /* The island under snow, out to the sea: white fields quilted by their
       hedges, a granite farm or two with smoke going up, and the sea
       beyond, deep blue and sparkling. */
    var sl = strip(), s = sl.getContext('2d'), SEA = 84;
    sea(s, SEA, [hm('#5aa8e8', 0.2), '#2a6ac8', '#ffffff'], rnd, [[50, 10, 60, '#ffffff', 0.7]], 30);
    var SF = function (xx) { return 92 + wv(xx, 2, 0.4) * 4 + wv(xx, 5, 1.1) * 1.4; };
    land(s, SF, [hm('#b8d0ec', 0.2), hm('#e8f2ff', 0.15), '#ffffff'], 4);
    for (j = 0; j < 4; j++) for (x = 0; x < SW; x += HP) { y = SF(x) + 2 + j * (2 + j * 1.4) + wv(x, 3, j) * 0.6; R(s, x, y, HP, HP * (j > 1 ? 2 : 1), hm('#6a7a6a', 0.35)); if (Math.sin(x * 2.3 + j) > 0.4) R(s, x, y - HP, HP, HP, hm('#5a6a5a', 0.35)); }
    [[70, 0], [220, 1], [380, 0]].forEach(function (q) { var bx = q[0], by = SF(bx) + 4; R(s, bx, by - 3, 6, 3, hm('#b8a8a4', 0.3)); span(s, by - 5, by - 2.8, function (yy) { return bx - 0.6 + (by - 2.8 - yy) * 0.9; }, function (yy) { return bx + 6.6 - (by - 2.8 - yy) * 0.9; }, '#ffffff'); for (var k = 0; k < 6; k++) { s.globalAlpha = 0.4 - k * 0.06; disc(s, bx + 5 + k * 1 + Math.sin(k) * 0.6, by - 6 - k * 1.8, 0.6 + k * 0.25, '#ffffff'); } s.globalAlpha = 1; });
    L.push({ c: sl, f: 0.035 });

    /* The lane: a granite wall along it with snow on its top, bare trees
       and a holly bush heavy with berries, a blue Guernsey postbox wearing
       a cap of snow, and the family's cottage — pink-grey granite, a snowy
       roof, smoke from both chimneys, a wreath on the green door and the
       tree twinkling in the window. */
    var ll = strip(), l = ll.getContext('2d');
    var LF = function (xx) { return 110 + wv(xx, 2, 2.1) * 1.2 + wv(xx, 6, 0.4) * 0.6; };
    land(l, LF, [hm('#a8c4e4', 0.1), hm('#e6f0fc', 0.08), '#ffffff'], 6);
    [[30, 34], [214, 30], [262, 26], [420, 36]].forEach(function (q) { bareTree(l, q[0], LF(q[0]) + 1, q[1], [hm('#5a4a44', 0.15), hm('#8a786e', 0.15), '#ffffff'], rnd); });
    var CX = 92, CB = LF(116) + 1;
    cottage(l, CX, CB, 48, 19, { wall: [hm('#8a706c', 0.08), hm('#c0a8a0', 0.06), hm('#e8d8d0', 0.05)], roof: [hm('#3a4258', 0.08), hm('#525c76', 0.08), hm('#8a96b4', 0.08)], frame: '#ffffff', dark: hm('#3a4a6a', 0.1), door: '#2e7a4a', smoke: '#ffffff', snow: [hm('#c8dcf4', 0.05), '#ffffff'] }, rnd, 1, true);
    // the granite wall along the lane, snow along its top
    for (x = 0; x < SW; x += HP) {
      if (x > CX - 2 && x < CX + 50) continue;
      y = LF(x) - 4; R(l, x, y, HP, 5, hm(Math.sin(x * 1.7) > 0.3 ? '#a89090' : '#8a7878', 0.1)); if (Math.round(x * 2) % 7 === 0) R(l, x, y + 1 + (x % 3), HP, HP, hm('#6a5a5a', 0.1));
      R(l, x, y - 1 - Math.abs(Math.sin(x * 0.5)) * 0.6, HP, 1.4 + Math.abs(Math.sin(x * 0.5)) * 0.6, '#ffffff');
    }
    // the postbox: Guernsey's are blue
    var PX = 192, PY = LF(PX) + 0.5;
    R(l, PX - 2.4, PY - 11, 4.8, 11, '#1e4a9a'); R(l, PX - 2.4, PY - 11, 1, 11, '#4a7ae0'); R(l, PX + 1.4, PY - 11, 1, 11, '#143a7a');
    oval(l, PX, PY - 11, 2.6, 1.4, '#1e4a9a', true); oval(l, PX, PY - 11.6, 2.8, 1.4, '#ffffff', true); R(l, PX - 1.4, PY - 8.6, 2.8, HP, '#0e2450'); R(l, PX - 2.8, PY - 1, 5.6, 1, '#143a7a');
    // a snowman in the garden, built this morning: a scarf, a carrot nose, a hat, twig arms
    var SX = 160, SB = LF(SX) + 0.5;
    disc(l, SX + 0.4, SB - 4.2, 4.6, hm('#b8cce8', 0.05)); disc(l, SX, SB - 4.6, 4.2, '#ffffff'); disc(l, SX - 1.4, SB - 6, 1.6, '#ffffff');
    disc(l, SX + 0.3, SB - 10.6, 3, hm('#b8cce8', 0.05)); disc(l, SX, SB - 10.9, 2.7, '#ffffff');
    R(l, SX - 2.6, SB - 15.6, 5.2, 1, '#2a2a3a'); R(l, SX - 1.8, SB - 18.4, 3.6, 3, '#2a2a3a'); R(l, SX - 1.8, SB - 16.4, 3.6, HP, '#c83030');
    R(l, SX - 1.3, SB - 11.8, 0.8, 0.8, '#1a1a2a'); R(l, SX + 0.6, SB - 11.8, 0.8, 0.8, '#1a1a2a'); R(l, SX - 3.2, SB - 10.6, 2.6, 0.8, '#ff8a2a'); R(l, SX - 3.2, SB - 10.6, 2.6, HP, '#ffb060');
    R(l, SX - 2.8, SB - 8.6, 5.6, 1.4, '#d83a3a'); R(l, SX + 1.2, SB - 8, 1.4, 3.4, '#d83a3a'); for (var sy = SB - 8.6; sy < SB - 4.6; sy += 1.2) R(l, SX + 1.2, sy, 1.4, HP, '#ffffff');
    [SB - 6, SB - 4, SB - 2].forEach(function (yy) { disc(l, SX - 0.2, yy, 0.5, '#2a2a3a'); });
    line(l, SX - 4, SB - 8, SX - 8, SB - 11, HP, '#5a4030'); line(l, SX - 7, SB - 10.2, SX - 7.6, SB - 12, HP, '#5a4030'); line(l, SX + 4, SB - 8, SX + 8, SB - 10.6, HP, '#5a4030');
    // footprints in the snow, up the path to the door and round to the snowman
    for (x = SX + 6; x < CX + 26; x += 2.2) { R(l, x, LF(x) + 2 + Math.sin(x) * 0.4, 1, HP, hm('#a8c0e0', 0.05)); R(l, x + 1, LF(x) + 3, 1, HP, hm('#a8c0e0', 0.05)); }
    // a robin on the wall, puffed up against the cold
    var RX = 236, RY = LF(RX) - 5.6;
    oval(l, RX, RY - 1.2, 1.5, 1.3, '#7a5a3a'); oval(l, RX - 0.5, RY - 1, 1, 0.9, '#f05a2a'); disc(l, RX - 0.8, RY - 2.6, 0.9, '#7a5a3a'); R(l, RX - 1.8, RY - 2.6, 0.7, HP, '#3a2a1a'); R(l, RX - 1, RY - 2.9, HP, HP, '#1a1a1a'); R(l, RX + 1.2, RY - 1.8, 1.2, 0.8, '#5a4028');
    // the holly bush
    pad(l, 330, LF(330) - 3, 7, 4, 1.4, rnd, ['#0e3a1e', '#1a5a2c', '#3a8a48']);
    for (i = 0; i < 18; i++) R(l, 324 + rnd() * 12, LF(330) - 6 + rnd() * 5, 1, 1, '#e8302e');
    for (x = 323; x < 337; x += HP) R(l, x, LF(330) - 7 + Math.abs(x - 330) * 0.4, HP, HP, '#ffffff');
    L.push({ c: ll, f: 0.08 });

    /* In front, kept low: deep snow in soft drifts, glittering where the
       sun catches it. */
    var nr = strip(), n = nr.getContext('2d');
    var nf = function (xx) { return 122 + wv(xx, 3, 0.9) * 1.6 + wv(xx, 7, 2) * 0.7; };
    land(n, nf, ['#a8c4e8', '#e2eefc', '#ffffff'], 5);
    for (x = 0; x < SW; x += HP) if (Math.sin(x * 0.29) > 0.3) R(n, x, nf(x) + 3 + Math.sin(x * 0.29) * 2, HP, HP, '#c0d6f0');
    for (i = 0; i < 26; i++) { x = rnd() * SW; twinkle(n, x, nf(x) + 1 + rnd() * 6, 0.5 + rnd() * 0.5, '#ffffff'); }
    for (i = 0; i < 6; i++) { x = 30 + i * 84 + rnd() * 20; pad(n, x, nf(x) - 1, 4 + rnd() * 3, 2, 1.1, rnd, ['#2a4a3a', '#3a6a4a', '#5a8a5a']); for (var k2 = x - 4; k2 < x + 4; k2 += HP) R(n, k2, nf(x) - 3 - Math.cos((k2 - x) / 4) * 1, HP, 1, '#ffffff'); }
    L.push({ c: nr, f: 0.2 });
    return L;
  };
})();
