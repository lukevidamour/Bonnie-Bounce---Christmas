/* ==========================================================================
   creaturesx.js — the Christmas cast: everyone Bonnie (and the cousins)
   meet on Christmas Eve in Guernsey, and the things they ride, pull,
   shake and post.

   Cosy-cute, never scary (the brief: "even the baddies are a bit silly"):
   sprouts that hop about grumpily and go PFFT when stomped, snowmen with a
   sneeze that blows their carrot off, Grabby Gus's gang of cheeky gulls,
   crabs in Santa hats. And friends: robins, Guernsey cows, seals, the
   eight lost reindeer (from the 1823 poem, so the names are anyone's — no
   Rudolph, no red nose) and Father Christmas himself.

   The same hand as creatures.js: round soft shapes lit from the top left
   (each shade from a five-tone ramp, deep to shine), a coloured outline,
   big friendly eyes with a sparkle. Every creature faces left, as they
   all do; the game flips them. Like creatures6c.js this file keeps its own
   palette and copies of the drawing helpers it needs, so it depends only
   on BB.ART.kit.
   ========================================================================== */
(function () {
  'use strict';
  var A = BB.ART, K = A.kit, E = A.en, D = A.deco, ell = K.ell, cap = K.cap, limb = K.limb, rrect = K.rrect;
  var LK = A.looks = A.looks || {};

  // the shared colours, as creatures.js has them, so eyes, blush and
  // outlines read the same as everyone else's
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
    1: '#c8d4f0', 2: '#a4b4e0', 3: '#ff9aa8',
    4: '#b8200c', 5: '#ff5a1c', 6: '#ff9a2c', 7: '#ffd85a', 8: '#fffbe0',
    '[': '#1c5a2c', ']': '#2e8a3c', '{': '#4cb44a', '}': '#86e06a', '~': '#d8ffb8'
  };
  var RED = 'uvxyz', GOLD = 'ABCDF', WOOD = 'STUVX', IRON = 'NOPQR', LEAF = '[]{}~', CREAM = 'ZZYYw';
  // this file's own ramps, five tones deep to shine, on characters made at
  // load time (as creatures6c.js does), so no unusual letters are typed here
  var nextCh = 0x0531;
  var ramp = function (cols) { var s = ''; cols.forEach(function (c) { var ch = String.fromCharCode(nextCh++); PAL[ch] = c; s += ch; }); return s; };
  var SNOW = ramp(['#7c90bc', '#b2c4e4', '#dce8f8', '#f2f8ff', '#ffffff']);     // snow, lit from the top left
  var SPROUT = ramp(['#1e4a14', '#2e7420', '#4ea232', '#86cc52', '#cdf09a']);   // a Brussels sprout's leaves
  var GULLW = ramp(['#8c96ae', '#bcc4d8', '#e2e8f2', '#f6f8fc', '#ffffff']);    // a herring gull's white
  var GULLG = ramp(['#4a5470', '#6c7896', '#96a2bc', '#bec8dc', '#e4eaf4']);    // its grey back and wings
  var BEAK = ramp(['#a86a10', '#e0a020', '#f8cc3a', '#ffe680', '#fff6c8']);     // yellow beak and legs
  var COW = ramp(['#7a4012', '#b06424', '#d68c3e', '#ecb46a', '#fbdcaa']);      // a Guernsey cow: golden fawn
  var COWW = ramp(['#a8a0a0', '#d4ccc8', '#f0ece6', '#faf8f4', '#ffffff']);     // her white patches
  var MUZZ = ramp(['#b88a70', '#dcb498', '#f4d4bc', '#fde8d8', '#fff8f0']);     // her pale pink muzzle
  var SEAL = ramp(['#3a4250', '#5a6474', '#808a9a', '#aab2c0', '#d8dde6']);     // a grey seal
  var DEER = ramp(['#4a2a14', '#74441e', '#a0682e', '#c89050', '#ecc48a']);     // reindeer brown
  var DEERW = ramp(['#9a8a74', '#c8b8a0', '#e8dcc6', '#f6eedf', '#ffffff']);    // its pale belly and neck ruff
  var HORN = ramp(['#6a5030', '#987848', '#c8a874', '#e8d0a4', '#fff0d0']);     // antler
  var SKIN = ramp(['#b8785a', '#e0a888', '#f8d0b4', '#ffe8d8', '#ffffff']);     // Father Christmas's face
  var SUIT = ramp(['#6a0c18', '#a01828', '#d42a3a', '#f05a62', '#ff9ea0']);     // his red suit
  var FUR = ramp(['#a8b0c8', '#d0d6e6', '#eef2fa', '#fafcff', '#ffffff']);      // white fur trim and his beard
  var BOOT = ramp(['#141018', '#24202c', '#3a3446', '#58506a', '#8a84a0']);     // black boots and belt
  var ROBIN = ramp(['#4a2c18', '#6e4426', '#946038', '#b8844c', '#dcb07a']);    // a robin's brown back
  var BREAST = ramp(['#a8301a', '#d84a24', '#f07038', '#ff9a5a', '#ffc89a']);   // its red-orange breast
  var GRANITE = ramp(['#5a5058', '#7c7078', '#a0949a', '#c4b8b8', '#e8dcd8']);  // grey-pink Guernsey granite
  var SLATE = ramp(['#2a2c3c', '#40445a', '#5a6078', '#7c849c', '#b0b8cc']);    // roof slate
  var POST = ramp(['#0c2a6a', '#163ea0', '#2a5ad0', '#5a8aec', '#a8c8ff']);     // a Guernsey postbox's blue
  var BRASS = ramp(['#6a4a10', '#a07a1c', '#d8b038', '#f4dc78', '#fff6c0']);    // the golden bell
  var IRONB = ramp(['#141420', '#24242e', '#3a3a48', '#5a5a6c', '#8a8aa0']);    // a cannon's black iron
  var GLASS = ramp(['#4a7ab0', '#7cb0e0', '#b4dcf8', '#e6f6ff', '#ffffff']);    // the snow globe's glass
  var CARROT = ramp(['#9a3a08', '#d0601a', '#f08a30', '#ffb860', '#ffe0b0']);   // a snowman's nose
  var HOLLY = ramp(['#0e3a1a', '#1a5a2a', '#2a8040', '#4aa85a', '#8cd890']);    // holly and wreath green
  var PUD = ramp(['#2a140c', '#4a2414', '#6c3820', '#8e5030', '#b47048']);      // a Christmas pudding
  var BOAT = ramp(['#8a96aa', '#c0c8d6', '#e6eaf2', '#f6f8fc', '#ffffff']);     // the ferry's white hull
  var NAVY = ramp(['#0e1a3a', '#1a2c5c', '#2a447e', '#4a68a8', '#8aa4d4']);     // its navy stripe and the bike's frame
  var HORSE = ramp(['#3a200e', '#5c3418', '#824c26', '#a8703c', '#d0a070']);    // a chestnut horse
  var WARM = ramp(['#a0501a', '#e08a2a', '#ffc04a', '#ffe08a', '#fff8d8']);     // a lit window, a lamp

  // a round shape lit from the top left and a little in front
  var orb = function (cx, cy, rx, ry, t) {
    return function (x, y) {
      var dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, n = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
      var i = -0.48 * dx - 0.58 * dy + 0.66 * n;
      return i > 0.9 ? t[4] : i > 0.6 ? t[3] : i > 0.22 ? t[2] : i > -0.12 ? t[1] : t[0];
    };
  };
  /* A part: its colour, its inside test, a texture, the line where it
     crosses a part behind it, and `rim`: a colour for its outer edge in
     place of the dark outline (for things that glow, or are too thin). */
  var P = function (c, f, tex, line, rim) { return { c: c, f: f, tex: tex, line: line || null, rim: rim || null }; };
  var O = function (cx, cy, rx, ry, t, line) { return P(t[2], ell(cx, cy, rx, ry), orb(cx, cy, rx, ry, t), line); };
  var or = function () { var fs = arguments; return function (x, y) { for (var i = 0; i < fs.length; i++) if (fs[i](x, y)) return true; return false; }; };
  var both = function (a, b) { return function (x, y) { return a(x, y) && b(x, y); }; };
  var but = function (a, b) { return function (x, y) { return a(x, y) && !b(x, y); }; };
  var turned = function (f, px, py, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return function (x, y) { var dx = x - px, dy = y - py; return f(px + dx * c + dy * s, py - dx * s + dy * c); };
  };
  var tri = function (ax, ay, bx, by, cx, cy) {
    return function (x, y) {
      var s1 = (x - bx) * (ay - by) - (ax - bx) * (y - by), s2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy), s3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay);
      return !((s1 < 0 || s2 < 0 || s3 < 0) && (s1 > 0 || s2 > 0 || s3 > 0));
    };
  };
  var hash = function (x, y, k) { var h = Math.sin(x * 12.9898 + y * 78.233 + (k || 0) * 37.719) * 43758.5453; return h - Math.floor(h); };
  // a flat colour lit only by a band of light down its top-left edge
  var flat = function (t, f, dx, dy) {
    return function (x, y) { return f(x + 0.5 - (dx || 1.2), y + 0.5 - (dy || 1.2)) ? t[2] : t[3]; };
  };
  var scene = function (W, H, parts) {
    var own = [], x, y, i;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var top = -1;
      for (i = 0; i < parts.length; i++) if (parts[i].f(x + 0.5, y + 0.5)) top = i;
      own.push(top);
    }
    var at = function (x, y) { return x < 0 || y < 0 || x >= W || y >= H ? -1 : own[y * W + x]; };
    var rows = [];
    for (y = 0; y < H; y++) {
      var r = '';
      for (x = 0; x < W; x++) {
        var k = at(x, y);
        if (k < 0) { r += '.'; continue; }
        var Pk = parts[k], n = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)];
        if (n.indexOf(-1) > -1) r += Pk.rim ? (typeof Pk.rim === 'function' ? Pk.rim(x, y) : Pk.rim) : '#';
        else if (Pk.line && n.some(function (j) { return j < k; })) r += Pk.line;
        else r += Pk.tex ? Pk.tex(x, y) : Pk.c;
      }
      rows.push(r);
    }
    return rows;
  };
  var finish = function (rows, W) {
    if (rows.some(function (r) { return r.length !== W; }) && window.console) console.error('creaturesx: ragged sprite', W, rows.length);
    var sp = BB.sprHi(rows, PAL, 'shade');
    sp.noLight = 'all';
    return sp;
  };
  var build = function (W, H, parts, stamps) {
    var rows = scene(W, H, parts);
    (stamps || []).forEach(function (s) { K.stamp(rows, Math.round(s[0]), Math.round(s[1]), s[2]); });
    return finish(rows, W);
  };
  var look = function (sp, top) { sp.top = top || 0; return sp; };
  // eyes, looking left: big, small, closed, happy
  var EYE = ['.##.', '#ww#', '#Ew#', '#EE#', '.##.'];
  var EYE_S = ['.#.', '#Ew', '#EE', '.#.'];
  var SHUT = ['....', '#..#', '.##.'];
  var HAPPY = ['.##.', '#..#'];
  var CROSS = ['#.#', '.#.', '#.#'];

  /* ==========================================================================
     THE BADDIES (a bit silly, every one)
     ========================================================================== */
  /* A Brussels sprout: round and tight, its leaves wrapped round it in
     layers (each leaf's edge a lighter line), a grumpy little face and two
     stubby feet. It hops about, cross at being on the plate; stomp it and
     it goes PFFT (game.js). Frames: crouched, mid-hop. */
  var sproutBody = function (cx, cy, r, sq) {
    var ry = r * sq;
    return P(SPROUT[2], ell(cx, cy, r, ry), function (x, y) {
      var X = x + 0.5, Y = y + 0.5, t = orb(cx, cy, r, ry, SPROUT)(x, y);
      // the leaves' edges: curves sweeping up from the base, round the ball
      var a = Math.atan2((Y - cy - ry * 0.9) / ry, (X - cx) / r), d = Math.hypot((X - cx) / r, (Y - cy - ry * 0.9) / ry);
      var leaf = Math.abs(((a * 3.2 + d * 2.4) % 1 + 1) % 1 - 0.5);
      if (leaf < 0.08 && d > 0.45) return t === SPROUT[0] ? SPROUT[1] : SPROUT[Math.min(4, SPROUT.indexOf(t) + 1)];
      // the little stalk end at the bottom, paler
      if (Y > cy + ry * 0.72 && Math.abs(X - cx) < r * 0.28) return 'Z';
      return t;
    });
  };
  var sprout = function (hop) {
    var sq = hop ? 1.08 : 0.92, cy = hop ? 10 : 11.5;
    var feet = hop ? [P('m', or(ell(8, 21, 2.2, 1.5), ell(15, 21, 2.2, 1.5)))] : [P('m', or(ell(7, 21, 2.6, 1.4), ell(16, 21, 2.6, 1.4)))];
    var legs = hop ? [P('l', or(cap(8.5, 16, 8, 20, 0.9), cap(14.5, 16, 15, 20, 0.9)))] : [];
    return build(24, 23, legs.concat(feet, [sproutBody(11.5, cy, 9, sq),
      // the loose outer leaf curling off its top, like a quiff
      P(SPROUT[3], tri(9, cy - 8.4 * sq, 15, cy - 7.4 * sq, 16.5, cy - 11 * sq), null, SPROUT[1])
    ]), [[5, cy - 3, EYE_S], [10, cy - 3, EYE_S], [4, cy - 4.5, ['##.']], [10, cy - 4.5, ['.##']], [7, cy + 2.4, ['.##.', '#..#']]]);
  };
  E.sprout = [sprout(false), sprout(true)];
  E.sproutFlat = build(26, 9, [P(SPROUT[2], ell(13, 5.5, 11.5, 3.4), orb(13, 5, 11.5, 3.4, SPROUT))], [[6, 4, CROSS], [12, 4, CROSS]]);

  /* A snowman: two snowballs, a red scarf, coal eyes, stick arms, and a
     carrot nose he can't keep on — every so often he winds up, AH… AH…
     ACHOO!, and the carrot shoots off at Bonnie (game.js). Frames: idle,
     winding up (head back, eyes shut, arms up), the sneeze (no nose, mouth
     wide), and squashed flat (stomped: he sits down, his hat pops off). */
  var snowman = function (kind) {
    var back = kind === 'ahh' ? -1 : 0, hx = 12 + back, hy = 10 + (kind === 'ahh' ? -1 : 0);
    var arms = kind === 'ahh' ? [[[5, 22], [1.5, 15.5], [0.5, 13]], [[19, 22], [22.5, 15.5], [23.6, 13]]] : [[[5, 23], [1.5, 26], [0.5, 24.5]], [[19, 23], [22.5, 26], [23.6, 24.5]]];
    var parts = [
      P('T', or.apply(null, arms.map(function (a) { return limb(a, 0.7); })), null, 'S'),
      O(12, 29, 10, 9.5, SNOW),
      O(hx, hy, 7, 6.6, SNOW),
      // the scarf, its knotted end hanging down his front
      P('x', or(rrect(hx - 6.5, hy + 4.6, hx + 6.5, hy + 7.4, 1.4), rrect(hx + 1.5, hy + 6, hx + 4.4, hy + 13, 1)), function (x, y) { return (x + y) % 4 < 1 ? 'v' : y < hy + 5.4 ? 'y' : 'x'; }, 'v')
    ];
    if (kind !== 'achoo') parts.push(P(CARROT[2], kind === 'ahh' ? tri(hx - 1, hy + 0.6, hx + 1, hy + 0.2, hx - 1.6, hy - 6) : tri(hx - 0.8, hy - 0.8, hx - 0.8, hy + 1.6, hx - 8.5, hy + 0.6), orb(hx - 3, hy, 5, 2, CARROT), CARROT[0]));
    var st = [[19, 19, ['#']], [12, 26, ['#']], [12, 30, ['#']], [12, 34, ['#']]];
    if (kind === 'ahh') st.push([hx - 5, hy - 2, SHUT], [hx + 1, hy - 2, SHUT], [hx - 2, hy + 3, ['.#.', '#.#', '.#.']]);
    else if (kind === 'achoo') st.push([hx - 5, hy - 3, ['#..#', '.##.']], [hx + 1, hy - 3, ['#..#', '.##.']], [hx - 3, hy + 1, ['.###.', '#mmm#', '#mmm#', '.###.']]);
    else st.push([hx - 5, hy - 3, EYE_S], [hx + 1, hy - 3, EYE_S], [hx - 4, hy + 3, ['#.#.#']]);
    return build(26, 39, parts, st);
  };
  E.xsnowman = { idle: snowman('idle'), ahh: snowman('ahh'), achoo: snowman('achoo') };
  E.xsnowman.flat = build(26, 22, [O(13, 15, 11, 6.5, SNOW), O(12, 7, 6.6, 5.6, SNOW),
    P('x', rrect(5.5, 10.5, 18.5, 13, 1.2), function (x, y) { return (x + y) % 4 < 1 ? 'v' : 'x'; }, 'v')], [[7, 5, CROSS], [13, 5, CROSS]]);
  // the sneezed carrot, flying point first (its leafy end flapping), and turned on end as it tumbles
  var carrot = function (up) {
    var parts = up ? [P(CARROT[2], tri(3.6, 1.4, 8.4, 1.4, 6, 13), orb(5, 4, 4, 9, CARROT), CARROT[0]), P(LEAF[2], or(tri(5.4, 1.6, 3, -1, 4, 2), tri(6.6, 1.6, 9, -1, 8, 2)), null, LEAF[0])]
      : [P(CARROT[2], tri(10.6, 3.6, 10.6, 8.4, 0, 6), orb(7, 5, 9, 4, CARROT), CARROT[0]), P(LEAF[2], or(tri(10.4, 5.4, 13, 2.8, 12, 4.4), tri(10.4, 6.6, 13, 9.2, 12, 7.6)), null, LEAF[0])];
    return build(14, 14, parts);
  };
  E.carrot = [carrot(false), carrot(true)];

  /* A herring gull of Grabby Gus's gang: white, grey back, a yellow beak
     with a red spot, a cheeky eye. They swoop at whoever's passing — and
     what they'd really like is a shiny paper crown. Two wing beats. */
  var gull = function (up, s) {
    s = s || 1;
    var W = Math.round(30 * s), H = Math.round(20 * s), S = function (v) { return v * s; };
    var wing = up ? tri(S(13), S(10), S(23), S(9), S(28), S(0.5)) : tri(S(13), S(10), S(24), S(10.5), S(27), S(19));
    var wingF = up ? tri(S(10), S(10), S(18), S(9.5), S(16), S(1)) : tri(S(10), S(10.5), S(19), S(10.5), S(15), S(19.5));
    return build(W, H, [
      P(GULLG[2], wingF, orb(S(14), S(6), S(8), S(8), GULLG), GULLG[0]),
      P(GULLW[2], or(ell(S(14), S(11.5), S(8.5), S(4.6)), tri(S(20), S(10), S(20), S(14), S(28), S(11.5))), orb(S(14), S(10), S(10), S(5), GULLW)),
      O(S(7.5), S(8.5), S(4.6), S(4.2), GULLW),
      P(BEAK[2], tri(S(3.6), S(8.6), S(3.6), S(10.4), S(-0.4), S(9.8)), null, BEAK[0]),
      P(GULLG[2], wing, orb(S(20), S(8), S(8), S(8), GULLG), GULLG[0]),
      P(GULLG[1], tri(S(24), S(10.5), S(29), S(10.5), S(28), S(13)), null, GULLG[0])
    ], [[S(5), S(6.6), ['.#', '#w', '##']], [S(1.2), S(9.6), ['x']]]);
  };
  E.xgull = [gull(true), gull(false)];

  /* Grabby Gus, the greediest gull in Guernsey: big and round, a scruffy
     crest, a fat yellow beak with its red spot, greedy grinning eyes, and
     a stripy scarf of his own. He flies with the golden bell (game.js
     draws it in his beak), dives, and after a crash sits there dizzy.
     Beaten, he's sorry and gets a bag of chips; for the ending, a paper
     crown. Frames: fly (two), dive, dizzy (two), sit. */
  var gus = function (kind) {
    var up = kind === 'fly0', dive = kind === 'dive', sitting = kind === 'dizzy0' || kind === 'dizzy1' || kind === 'sit';
    var parts = [];
    if (!sitting && !dive) parts.push(P(GULLG[2], up ? tri(22, 20, 34, 18, 42, 0.5) : tri(22, 21, 36, 22, 40, 39), orb(30, 14, 12, 14, GULLG), GULLG[0]));
    // his round tummy, his head, the crest sticking up
    parts.push(
      P(GULLW[2], ell(23, 23, 14, 11), orb(22, 20, 15, 12, GULLW)),
      P(GULLG[2], ell(30, 19, 10, 6.5), orb(28, 17, 10, 6, GULLG), GULLG[0]),
      P(GULLW[3], or(tri(9, 6, 12, 1, 13, 7), tri(12, 6, 16, 0.5, 16, 7), tri(15, 6, 20, 2, 18.5, 8)), null, GULLW[1]),
      O(13, 13, 8.6, 8.2, GULLW),
      // the stripy scarf round his neck, its end flying behind
      P('x', or(rrect(8, 18.5, 22, 22.5, 1.8), tri(20, 19, 20, 22.5, 30, 18)), function (x, y) { return Math.floor((x + y) / 2) % 2 ? 'x' : 'w'; }, 'v'),
      P(BEAK[2], or(tri(6, 12, 6, 17, -2.5, 15.5), ell(4, 14.5, 3.4, 2.4)), orb(4, 13.5, 4, 3, BEAK), BEAK[0])
    );
    if (dive) parts.push(P(GULLG[2], tri(24, 16, 44, 9, 40, 19), orb(32, 14, 10, 6, GULLG), GULLG[0]));
    if (sitting) parts.push(P(BEAK[2], or(cap(18, 33, 17, 37.5, 0.9), cap(26, 33, 27, 37.5, 0.9), ell(15.5, 38, 2.6, 1), ell(25.5, 38, 2.6, 1))), P(GULLG[2], tri(26, 18, 40, 24, 30, 30), orb(32, 22, 8, 6, GULLG), GULLG[0]));
    else parts.push(P(BEAK[2], or(cap(20, 32, 21, 37, 0.9), cap(25, 32, 27, 36.5, 0.9)), null, BEAK[0]));
    var st = [[-1, 15, ['x']]];
    if (kind === 'dizzy0' || kind === 'dizzy1') st.push([8, 9, CROSS], [14, 9, CROSS], [4, 18, ['#..#', '.##.']]);
    else if (dive) st.push([8, 9, EYE], [14, 9, EYE], [7, 8, ['###.']], [14, 8, ['.###']]);
    else st.push([8, 9, EYE], [14, 9, EYE], [7, 7.5, ['.##']], [15, 7.5, ['##.']], [5, 18, ['#...#', '.###.']]);
    return build(44, 40, parts, st);
  };
  E.gus = { fly: [gus('fly0'), gus('fly1')], dive: gus('dive'), dizzy: [gus('dizzy0'), gus('dizzy1')], sit: gus('sit') };

  // a crab in a Santa hat: Bonnie's sandy-shore crab, all set for Christmas
  E.xcrab = [0, 1].map(function (f) {
    var legs = [];
    [[6, 1], [9, 1], [12, 1], [18, -1], [21, -1], [24, -1]].forEach(function (L, i) {
      var k = (i + f) % 2 ? 1.2 : -0.6;
      legs.push(P('v', cap(L[0], 21, L[0] - L[1] * 2.5, 25.5 + k * 0.3, 0.8)));
    });
    return build(30, 27, legs.concat([
      O(15, 18, 10.5, 6.2, RED),
      P('x', or(ell(3.8, 12.2, 3.5, 2.2), ell(4.2, 15.6, 3, 1.7)), orb(4, 14, 4, 4, RED)),
      P('x', or(ell(26.2, 12.2, 3.5, 2.2), ell(25.8, 15.6, 3, 1.7)), orb(26, 14, 4, 4, RED)),
      P('v', or(cap(12, 13, 11, 8.5, 0.7), cap(18, 13, 19, 8.5, 0.7))),
      P('w', or(ell(11, 7.6, 2.1, 2.1), ell(19, 7.6, 2.1, 2.1))),
      // the Santa hat, perched on the shell between the eyes, flopping over
      P(SUIT[2], or(tri(10, 11.5, 21, 11.5, 22, 1.5), ell(22, 2.5, 2, 2)), orb(15, 7, 7, 6, SUIT), SUIT[0]),
      P(FUR[2], rrect(9, 10.5, 22, 13.4, 1.4), orb(14, 11, 8, 2, FUR)),
      O(23.2, 2.2, 2.2, 2.2, FUR)
    ]), [[10, 7, ['E.']], [18, 7, ['E.']], [12, 19, ['#....#', '.####.']]]);
  });

  /* A rolling Christmas pudding (where the original's pumpkins rolled
     down the hill): dark and fruity, a drizzle of white sauce over its
     top and a sprig of holly. Four turns of a roll, and a squash. */
  var pudding = function (a, sq) {
    var parts = [P(PUD[2], ell(8, 9 + (sq ? 2 : 0), 7.2, sq ? 4.6 : 6.4), function (x, y) {
      var t = orb(8, 8, 7.2, 6.4, PUD)(x, y), r = hash(Math.floor((x - 8) * Math.cos(a) - (y - 8) * Math.sin(a)), Math.floor((x - 8) * Math.sin(a) + (y - 8) * Math.cos(a)));
      return r < 0.12 ? 'S' : r > 0.92 ? 'u' : t;
    })];
    if (!sq) parts.push(P('w', turned(or(ell(8, 4, 6, 2.6), ell(4, 6.4, 1.4, 1.6), ell(11.5, 6.6, 1.2, 1.8)), 8, 9, a), function () { return 'w'; }, 'W'),
      P(HOLLY[2], turned(or(ell(6.6, 1.6, 2.2, 1.1), ell(9.6, 1.8, 2.2, 1.1)), 8, 9, a), null, HOLLY[0]), P('x', turned(ell(8, 2.4, 1, 1), 8, 9, a), null, 'v'));
    return build(16, 16, parts);
  };
  E.rollpud = [0, 1, 2, 3].map(function (k) { return pudding(k * Math.PI / 2, false); }).concat([pudding(0, true)]);

  /* ==========================================================================
     FRIENDS
     ========================================================================== */
  // a robin: a little round brown bird with a red-orange breast, hopping about
  var robin = function (kind) {
    var parts = [
      P(ROBIN[2], tri(10, 8.5, 15, 7, 16, 11.5), null, ROBIN[0]),
      P(ROBIN[2], ell(9, 9, 5.6, 4.8), orb(9, 8, 6, 5, ROBIN)),
      P(BREAST[2], ell(6.6, 10, 3.8, 3.6), orb(6, 9, 4, 4, BREAST)),
      P('U', tri(3.4, 7.8, 3.4, 9.2, 0.6, 8.6), null, 'S')
    ];
    if (kind === 'fly0') parts.push(P(ROBIN[1], tri(8, 7, 14, 6, 13, 0.5), null, ROBIN[0]));
    else if (kind === 'fly1') parts.push(P(ROBIN[1], tri(8, 9, 14, 8.5, 12, 14.5), null, ROBIN[0]));
    else parts.push(P('S', or(cap(8, 13, 7.6, 15.6, 0.5), cap(10.5, 13, 10.8, 15.6, 0.5)), null, 'S'));
    return build(17, 16, parts, [[4, 6.5, ['#w', '##']]]);
  };
  E.robin = { sit: robin('sit'), fly: [robin('fly0'), robin('fly1')] };

  /* A Guernsey cow: golden fawn with white patches, a pale pink muzzle,
     short curved horns, big gentle eyes and long lashes, a bell on a
     strap. They let you stand on their backs, walking you along, and moo
     a note of Jingle Bells when you land (game.js). Frames: two steps and
     a MOO. */
  var cow = function (k) {
    var lg = k === 1 ? [1.6, -1.6] : [-1.2, 1.2], moo = k === 2;
    var patches = function (x, y) { return hash(Math.floor(x / 7), Math.floor(y / 6), 3) < 0.36 || ell(36, 18, 6, 5)(x, y) || ell(22, 23, 5, 4)(x, y); };
    var hide = function (x, y) { var t = orb(30, 15, 20, 11, COW)(x, y); return patches(x + 0.5, y + 0.5) ? COWW[COW.indexOf(t)] : t; };
    var legs = [[19, lg[0]], [24, lg[1]], [38, lg[1]], [43, lg[0]]].map(function (L, i) {
      return P(i % 2 ? COW[1] : COW[2], cap(L[0], 24, L[0] + L[1], 33, 2.1), function (x, y) { return y > 31 ? 'S' : i % 2 ? COW[1] : COW[2]; }, COW[0]);
    });
    var parts = [P(COW[1], limb([[48, 15], [52, 20], [51, 27]], 0.9), null, COW[0]), P('S', ell(51, 28, 1.4, 2.2))].concat(legs, [
      P(COW[2], rrect(14, 9, 49, 26, 8), hide),
      // her head, low and forward, with the muzzle, horns and ears
      P(COW[3], or(tri(3.2, 4.6, 6, 6.2, 2.4, 1.6), tri(13.8, 4.6, 11, 6.2, 14.6, 1.6)), null, COW[0]),
      P(COW[2], or(ell(8.5, 10.5, 7, 6.6), tri(14, 8, 18, 10, 14, 18)), function (x, y) { return x > 6.6 && x < 10.4 && y < 11 ? COWW[2] : orb(8, 9, 7, 7, COW)(x, y); }),
      P(COW[1], or(ell(1.5, 9, 3, 1.7), ell(15.5, 9, 3, 1.7)), null, COW[0]),
      P(MUZZ[2], ell(8.5, 15.8, 5.4, 3.8), orb(8, 15, 5, 4, MUZZ)),
      // the bell on its strap
      P('T', rrect(4.5, 19, 13, 20.6, 0.6), null, 'S'),
      O(8.8, 22.4, 2, 2, GOLD)
    ]);
    var st = [[4, 8, ['.#', '#w', '##']], [10, 8, ['.#', 'w#', '##']], [3, 7, ['#.']], [12, 7, ['.#']], [6, 15, ['#..#']]];
    if (moo) st.push([6, 17, ['.##.', '#mm#', '.##.']]);
    return build(56, 36, parts, st);
  };
  E.cow = { walk: [cow(0), cow(1)], moo: cow(2) };

  /* A grey seal bobbing in the sea, whiskers and big wet eyes — land on
     his head and BOING (a spring, in the water). Bob, bob, and the squash. */
  var seal = function (k) {
    var sq = k === 2, by = sq ? 12 : 10 + (k ? 1 : 0);
    return build(28, 22, [
      P(SEAL[2], ell(14, by + 5, 11, sq ? 5.6 : 7), orb(13, by + 3, 11, 7, SEAL)),
      O(9, by - (sq ? 0 : 1), 6.6, sq ? 5 : 6, SEAL),
      P(SEAL[3], ell(5.6, by + 1.6, 3, 2.2), orb(5, by + 1, 3, 2.4, SEAL))
    ], [[5, by - 3, EYE_S], [9, by - 3, EYE_S], [3, by + 1, ['#']], [0, by + 1, ['-..-'.replace(/-/g, '#')]], [0, by + 2.5, ['#....#']]]);
  };
  E.seal = [seal(0), seal(1), seal(2)];

  /* A reindeer: brown, a pale ruff and belly, white tail, a black nose
     (never a red one), branching antlers, kind eyes. Eight of them —
     Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner and Blitzen, from
     the 1823 poem — each lost somewhere on the island, waiting at the end
     of a level doing something silly. Each has his own coat (palette
     variants below). Frames: stand, two steps, a happy leap. */
  var antler = function (bx, by, d, k) {
    return P(HORN[2], or(limb([[bx, by], [bx + d * 1.4, by - 4], [bx + d * 0.8, by - 8.4]], 0.9), limb([[bx + d * 1.1, by - 3], [bx + d * 4.4, by - 5.6]], 0.75), limb([[bx + d * 1.2, by - 6.2], [bx + d * 4, by - 9.6]], 0.7), limb([[bx + d * 0.9, by - 7.6], [bx - d * 1.6, by - 10.4]], 0.65)), orb(bx, by - 6, 4, 6, HORN), HORN[0]);
  };
  var reindeer = function (kind) {
    var leap = kind === 'leap', lg = kind === 'walk1' ? [2, -2] : kind === 'walk0' ? [-1.6, 1.6] : leap ? [-3, 3] : [0, 0];
    var ly = leap ? -3 : 0, hy = leap ? 9 : 11, sit = kind === 'sit';
    var legs = sit ? [P(DEER[1], or(rrect(14, 27, 34, 31, 2), ell(16, 30, 4, 2)), null, DEER[0])] : [[14, lg[0]], [18, lg[1]], [30, lg[1]], [34, lg[0]]].map(function (L, i) {
      return P(i % 2 ? DEER[1] : DEER[2], cap(L[0], 24 + ly, L[0] + L[1] * (leap ? (i < 2 ? -1 : 1) : 1), 36 + ly - (leap ? 2 : 0), 1.5), function (x, y) { return y > 34 + ly - (leap ? 2 : 0) ? 'S' : i % 2 ? DEER[1] : DEER[2]; }, DEER[0]);
    });
    var by = sit ? 6 : 0;
    var parts = [P('w', ell(38.5, 17 + ly + by, 2.6, 2.2), null, DEERW[1])].concat(legs, [
      P(DEER[2], rrect(11, 13 + ly + by, 38, 27 + ly + by, 6.5), function (x, y) { return y > 23 + ly + by ? DEERW[x < 20 ? 3 : 2] : orb(24, 18 + ly + by, 14, 8, DEER)(x, y); }),
      // the neck and its pale ruff, then the head with the muzzle
      P(DEERW[2], or(tri(9, 8 + ly + by, 17, 13 + ly + by, 11, 22 + ly + by), ell(12, 17 + ly + by, 4.4, 5.4)), orb(11, 14, 6, 8, DEERW)),
      antler(9.5, hy - 4 + by, 1, 0), antler(6, hy - 4.4 + by, -1, 1),
      P(DEER[2], or(ell(8, hy + by, 5.8, 5), ell(3.6, hy + 2.2 + by, 4, 3)), orb(7, hy - 1 + by, 6, 5, DEER)),
      P(DEER[1], ell(13.6, hy - 2.6 + by, 2.6, 1.4), null, DEER[0]),
      P('f', ell(0.8, hy + 1.6 + by, 1.8, 1.6), function () { return 'f'; })
    ]);
    var st = leap || kind === 'happy' ? [[4, hy - 2.5 + by, HAPPY], [9, hy - 2.5 + by, HAPPY], [1.5, hy + 4 + by, ['#..#', '.##.']]] : [[4, hy - 3 + by, EYE_S], [8, hy - 3 + by, EYE_S], [2, hy + 4.4 + by, ['.##']]];
    st.push([0, hy + 1 + by, ['.w']]);
    return build(42, 38 + (sit ? 0 : 0), parts, st);
  };
  E.reindeer = { stand: reindeer('stand'), walk: [reindeer('walk0'), reindeer('walk1')], leap: reindeer('leap'), happy: reindeer('happy'), sit: reindeer('sit') };
  // each reindeer's own coat, so they can be told apart: a shade lighter, darker, warmer, greyer…
  var coat = function (name, cols) { var m = {}; DEER.split('').forEach(function (ch, i) { m[ch] = cols[i]; }); return BB.variant('deer-' + name, m); };
  A.deerCoat = {
    dasher: null,
    dancer: coat('dancer', ['#5a2a10', '#8a4418', '#b8682a', '#dc9450', '#f8c88c']),
    prancer: coat('prancer', ['#3a2a1e', '#5a4430', '#806446', '#a88a64', '#d4b890']),
    vixen: coat('vixen', ['#6a2a0e', '#9a4214', '#c86a26', '#e89a52', '#ffcc90']),
    comet: coat('comet', ['#4a3c32', '#6e5c4c', '#968070', '#bcaa98', '#e6d8c8']),
    cupid: coat('cupid', ['#5a3418', '#86502a', '#ae7442', '#d29e68', '#f2cea0']),
    donner: coat('donner', ['#2a1a10', '#46301e', '#66482e', '#8a6844', '#b8946a']),
    blitzen: coat('blitzen', ['#4e2e1a', '#7a4a28', '#a8703c', '#cc9a62', '#f0cc98'])
  };

  /* Father Christmas: a red suit and hat trimmed with white fur, a big
     white beard and moustache, rosy cheeks, twinkly eyes, a black belt
     with a gold buckle, black boots. Frames: standing, waving (two), and
     HO HO HO (head back, hands on his tummy). Faces left. */
  var santa = function (kind) {
    var wave = kind === 'wave0' || kind === 'wave1', ho = kind === 'ho';
    var arm0 = ho ? [[9, 26], [12, 33]] : wave ? [[5, 17], kind === 'wave0' ? [2, 9] : [6, 8]] : [[8, 26], [8, 34]];
    var arm1 = ho ? [[27, 26], [24, 33]] : [[28, 26], [28, 34]];
    var hy = ho ? 9 : 10;
    return build(38, 50, [
      P(BOOT[2], or(rrect(10, 42, 17.5, 49, 2), rrect(19.5, 42, 27, 49, 2)), orb(14, 44, 8, 4, BOOT), BOOT[0]),
      P(SUIT[2], or(rrect(11, 36, 17, 44, 1.5), rrect(20, 36, 26, 44, 1.5)), orb(16, 38, 10, 6, SUIT), SUIT[0]),
      // the big round tummy, the fur down the front
      P(SUIT[2], ell(18.5, 31, 12, 11), orb(17, 28, 12, 11, SUIT)),
      P(FUR[2], or(rrect(16.6, 20, 20.4, 42, 1), rrect(7, 38, 30, 42.5, 2)), orb(18, 30, 5, 12, FUR)),
      P(BOOT[2], rrect(6.8, 32, 30.2, 35.2, 0.8), null, BOOT[0]),
      P(GOLD[2], rrect(16, 31.4, 21, 35.8, 0.8), function (x, y) { return x > 17.4 && x < 19.6 && y > 32.6 && y < 34.6 ? BOOT[2] : GOLD[3]; }, GOLD[0]),
      P(SUIT[2], limb([[10, 21], arm0[0], arm0[1]], 3), null, SUIT[0]),
      P(SUIT[2], limb([[27, 21], arm1[0], arm1[1]], 3), null, SUIT[0]),
      P(FUR[3], or(ell(arm0[1][0], arm0[1][1], 3.4, 2.2), ell(arm1[1][0], arm1[1][1], 3.4, 2.2)), null, FUR[1]),
      P(BOOT[2], or(ell(arm0[1][0], arm0[1][1] + 2, 2.6, 2.4), ell(arm1[1][0], arm1[1][1] + 2, 2.6, 2.4)), orb(arm0[1][0], arm0[1][1], 3, 3, BOOT), BOOT[0]),
      // his face, the beard round it, the hat
      P(SKIN[2], ell(16, hy + 4, 6.8, 6.4), orb(15, hy + 3, 7, 7, SKIN)),
      P(FUR[2], or(ell(16, hy + 9, 8.6, 7.6), ell(16, hy + 15, 6, 4.4)), function (x, y) { var t = orb(15, hy + 8, 9, 9, FUR)(x, y); return (x + Math.floor(y / 2)) % 3 === 0 ? FUR[Math.max(0, FUR.indexOf(t) - 1)] : t; }),
      P(FUR[3], or(ell(12.4, hy + 7.6, 4, 2), ell(19.6, hy + 7.6, 4, 2)), null, FUR[1]),
      P(SKIN[3], ell(16, hy + 6.4, 1.8, 1.5), null, SKIN[1]),
      P(SUIT[2], or(tri(8, hy - 0.6, 24.5, hy - 0.6, 27, hy - 9), ell(27.5, hy - 5, 3.4, 4)), orb(17, hy - 4, 10, 6, SUIT), SUIT[0]),
      O(30, hy - 2.6, 2.8, 2.8, FUR),
      P(FUR[2], rrect(7.4, hy - 2, 25, hy + 1.6, 1.8), orb(14, hy - 1, 12, 3, FUR))
    ], ho ? [[11, hy + 2, HAPPY], [17, hy + 2, HAPPY], [10, hy + 5, ['3.', '33']], [21, hy + 5, ['.3', '33']], [13, hy + 10, ['.####.', '#mmmm#', '.####.']]]
      : [[11, hy + 1.5, EYE_S], [17, hy + 1.5, EYE_S], [9, hy + 5, ['3.', '33']], [21, hy + 5, ['.3', '33']], [14, hy + 10.4, ['#..#', '.##.']]]);
  };
  E.santa = { stand: santa('stand'), wave: [santa('wave0'), santa('wave1')], ho: santa('ho') };

  /* ==========================================================================
     THINGS TO RIDE, SHAKE, PULL AND POST
     ========================================================================== */
  /* Father Christmas's sleigh: red, curling at the front, gold scrolls
     along its side, on runners; a sack of presents in the back. Its top is
     where the rider sits (game.js draws them in it). */
  A.sleigh = build(60, 32, [
    P(GOLD[2], or(limb([[2, 30], [50, 30], [57, 26], [56, 22]], 1), cap(14, 25, 14, 30, 1), cap(40, 25, 40, 30, 1)), orb(30, 26, 30, 6, GOLD), GOLD[0]),
    P('S', ell(40, 9, 9, 8), function (x, y) { return orb(38, 7, 10, 9, 'STUVX')(x, y); }, 'S'),
    P('x', rrect(33.5, 2, 37, 6, 1), null, 'v'), P(HOLLY[2], rrect(42, 1, 46, 5, 1), null, HOLLY[0]),
    // the body: a deep seat at the back, the front swept up into a curl
    P(SUIT[2], or(rrect(10, 11, 52, 26, 5), ell(9, 14, 7, 9), tri(2, 6, 12, 10, 8, 22)), function (x, y) {
      var t = orb(28, 14, 26, 12, SUIT)(x, y);
      // a gold scroll along the side
      var d = Math.abs(Math.sin((x - 10) * 0.42) * 2.2 + 20 - y);
      return d < 0.7 && x > 13 && x < 49 ? GOLD[3] : t;
    }),
    P(GOLD[3], or(ell(4.4, 8, 2.6, 2.6), rrect(9, 10, 53, 12.4, 1.2)), null, GOLD[1])
  ]);
  A.sleigh.seat = 24;   // how far along its back the rider's middle sits

  /* A Christmas cracker: red, wrapped tight, gold bands at the waist and
     frilly gold ends; pull it (touch it) and BANG — two halves fly apart
     and out comes a paper crown, a joke and a surprise (game.js). */
  var crackerHalf = function (x0, x1, side) {
    var mid = (x0 + x1) / 2;
    return [P(SUIT[2], rrect(x0, 3, x1, 9, 1.4), orb(mid, 4, (x1 - x0), 5, SUIT), SUIT[0]),
      P(GOLD[3], rrect(side < 0 ? x1 - 2 : x0, 2.4, side < 0 ? x1 : x0 + 2, 9.6, 0.6), null, GOLD[1]),
      P(GOLD[2], side < 0 ? or(tri(x0 + 0.5, 6, x0 - 3.6, 1.6, x0 - 3.6, 10.4)) : or(tri(x1 - 0.5, 6, x1 + 3.6, 1.6, x1 + 3.6, 10.4)), function (x, y) { return y % 2 ? GOLD[3] : GOLD[2]; }, GOLD[0])];
  };
  A.cracker = [build(30, 12, crackerHalf(5, 15, -1).concat(crackerHalf(15, 25, 1), [P('w', or(ell(10, 6, 1.4, 1.4), ell(20, 6, 1.4, 1.4)), null, 'W')])),
    build(30, 12, crackerHalf(4, 13, -1).concat(crackerHalf(17, 26, 1)))];

  /* The giant snow globe in Candie Gardens: a glass dome on a carved
     wooden base, and inside, a tiny Guernsey cottage and a fir tree in the
     snow. Shake it (touch it) and snow swirls inside — and then it starts
     to snow for real, all over the island (game.js). Frames: still, and
     two swirls. */
  var globe = function (sw) {
    var parts = [
      P(WOOD[2], or(rrect(4, 34, 32, 42, 2.4), rrect(7, 31, 29, 35, 1.6)), function (x, y) { var t = orb(16, 34, 16, 6, WOOD)(x, y); return y === 37 ? WOOD[1] : t; }, WOOD[0]),
      P(GLASS[2], ell(18, 17, 15, 15.6), function (x, y) {
        var X = x + 0.5, Y = y + 0.5, d = Math.hypot((X - 18) / 15, (Y - 17) / 15.6);
        if (ell(12, 9, 3.4, 5)(X, Y)) return 'w';
        if (d > 0.9) return GLASS[1];
        // snow on the ground inside, the cottage, the tree
        if (Y > 26) return SNOW[3];
        if (rrect(11, 18, 22, 26.4, 1)(X, Y)) return Y < 20 ? SNOW[4] : X > 14.6 && X < 17.4 && Y > 21.4 ? 'x' : (X < 13.6 || X > 18.6) && Y > 20.6 && Y < 23 ? WARM[3] : GRANITE[3];
        if (tri(9.6, 18.6, 23.4, 18.6, 16.5, 12.6)(X, Y)) return SNOW[4];
        if (tri(23, 26, 31, 26, 27, 13)(X, Y)) return HOLLY[(x + y) % 3 ? 2 : 3];
        if (sw && hash(x, y, sw) < 0.16) return 'w';
        return GLASS[3];
      })
    ];
    return build(36, 43, parts);
  };
  A.snowglobe = [globe(0), globe(1), globe(2)];

  /* The noon-day gun at Castle Cornet: an old black cannon on a wooden
     carriage, pointing up and away over the walls. Climb in front of it
     at noon and BOOM — off you go, in a shower of tinsel (game.js). Frames:
     waiting, and firing (a flash and a puff of smoke). */
  var cannon = function (fire) {
    var a = -0.5;
    var barrel = turned(or(rrect(10, 9, 42, 17, 4), ell(10, 13, 5, 5.6), rrect(39, 7.6, 44, 18.4, 1.6)), 14, 13, a);
    var parts = [
      P(WOOD[2], or(tri(4, 30, 34, 30, 14, 15), rrect(4, 26, 34, 31, 1.4)), orb(18, 24, 18, 8, WOOD), WOOD[0]),
      P(IRONB[2], barrel, function (x, y) { var X = x + 0.5, Y = y + 0.5; var u = (X - 14) * Math.cos(a) + (Y - 13) * Math.sin(a); return Math.abs(u - 20) < 0.8 || Math.abs(u - 8) < 0.8 ? IRONB[3] : orb(20, 6, 22, 9, IRONB)(x, y); }),
      P(IRONB[2], or(ell(10, 29, 6.4, 6.4), ell(30, 29, 6.4, 6.4)), function (x, y) { var X = x + 0.5, Y = y + 0.5, d = Math.min(Math.hypot(X - 10, Y - 29), Math.hypot(X - 30, Y - 29)); return d < 1.6 ? GOLD[3] : d > 5.2 ? IRONB[1] : (Math.floor(Math.atan2(Y - 29, X - (X < 20 ? 10 : 30)) * 2.6 + 9) % 2 ? WOOD[2] : WOOD[3]); }, IRONB[0])
    ];
    if (fire) {
      var mx = 14 + Math.cos(a) * 30, my = 13 + Math.sin(a) * 30;
      parts.push(P('7', or(ell(mx + 3, my - 1.6, 5, 4), tri(mx, my - 4, mx + 12, my - 9, mx + 6, my + 3)), function (x, y) { return hash(x, y) < 0.3 ? '8' : '7'; }, null, '5'));
    }
    return build(56, 37, parts);
  };
  A.noongun = [cannon(false), cannon(true)];
  A.noongun.mouth = [14 + Math.cos(-0.5) * 30, 13 + Math.sin(-0.5) * 30];

  /* A hedge-veg stall: a little wooden stand at the lane's edge under a
     sloping roof, with boxes of carrots, a cabbage, a jar of flowers, and
     the honesty box: an old tin with a slot. Drop a coin in (walk up to
     it) and help yourself to a treat (game.js). */
  A.vegstall = build(44, 40, [
    P(WOOD[2], or(rrect(4, 18, 40, 22, 1), cap(6, 20, 6, 39, 1.2), cap(38, 20, 38, 39, 1.2), rrect(4, 32, 40, 35, 1)), function (x, y) { return orb(22, 20, 22, 12, WOOD)(x, y); }, WOOD[0]),
    P(SLATE[2], or(tri(0, 9, 44, 9, 44, 1), rrect(0, 7, 44, 11, 1.4)), function (x, y) { return x % 6 === 0 ? SLATE[1] : orb(18, 4, 24, 8, SLATE)(x, y); }, SLATE[0]),
    P(WOOD[3], or(cap(5, 10, 5, 19, 1.1), cap(39, 10, 39, 19, 1.1)), null, WOOD[1]),
    // carrots in a crate, a cabbage, a jar of flowers, the honesty tin
    P(WOOD[1], rrect(7, 13, 18, 18.4, 0.8), null, WOOD[0]),
    P(CARROT[2], or(tri(8, 13.4, 10.4, 13.4, 9.2, 8), tri(11, 13.4, 13.4, 13.4, 12.2, 8.4), tri(14, 13.4, 16.4, 13.4, 15.2, 7.6)), orb(12, 10, 6, 4, CARROT), CARROT[0]),
    P(LEAF[3], or(ell(9, 7.4, 1.4, 1), ell(12.2, 7.8, 1.4, 1), ell(15.4, 7, 1.4, 1)), null, LEAF[1]),
    O(23, 14.2, 4.2, 3.8, LEAF),
    P(GLASS[3], rrect(28, 11, 32, 18, 1), null, GLASS[1]),
    P('r', or(ell(29, 9, 1.8, 1.6), ell(31.6, 8.4, 1.6, 1.6), ell(30.4, 6.8, 1.4, 1.4)), null, 'q'),
    P(POST[3], rrect(33, 13, 38.6, 18.2, 1), function (x, y) { return y === 14 && x > 34 && x < 37.6 ? '#' : orb(35, 14, 4, 4, IRONB)(x, y) === IRONB[4] ? 'w' : POST[3]; }, POST[1])
  ]);

  /* A Guernsey postbox: they're blue here, not red (a pillar box with a
     domed cap and a slot). Post a letter to Father Christmas and a whoosh
     of letters carries you up into the sky (game.js). */
  A.postbox = build(20, 36, [
    P(POST[2], or(rrect(3, 7, 17, 33, 2.4), ell(10, 7, 8, 4.4)), function (x, y) {
      var t = orb(8, 14, 9, 18, POST)(x, y);
      if (y >= 12 && y <= 13 && x > 5 && x < 15) return 'f';
      if (y === 17 && x > 5 && x < 15) return POST[1];
      return t;
    }),
    P(POST[1], rrect(1.6, 6, 18.4, 8.6, 1.2), null, POST[0]),
    P(BOOT[2], rrect(2, 32, 18, 35.6, 1), null, BOOT[0]),
    P(GOLD[3], ell(10, 23, 2.2, 2.2), null, GOLD[1])
  ]);

  /* The golden bell from Father Christmas's sleigh: Grabby Gus pinched it,
     and without it the sleigh can't fly. A red bow at its top. */
  A.bell = build(18, 20, [
    P(BRASS[2], or(ell(9, 11, 7, 7), rrect(2, 11, 16, 16, 1.4), ell(9, 16, 7.6, 1.8)), orb(7, 9, 9, 9, BRASS)),
    O(9, 17.8, 1.8, 1.6, BRASS),
    P('x', or(ell(6, 3, 3, 2), ell(12, 3, 3, 2), ell(9, 3.4, 1.4, 1.4)), orb(8, 2, 5, 3, RED), 'v')
  ]);

  /* The treats handed out at each house's door: a mince pie, a slice of
     gâche (Guernsey's fruit loaf, buttered), a mug of hot chocolate, a
     candy cane, a gingerbread man, a little Christmas pudding. */
  A.xtreat = {
    mincepie: build(16, 12, [P('V', or(ell(8, 8, 7, 3.6), rrect(1, 6, 15, 9, 1.6)), orb(7, 6, 8, 4, 'STUVX'), 'T'), P('X', ell(8, 6, 6, 2.6), function (x, y) { return (x * 3 + y * 7) % 5 === 0 ? 'T' : (x + y) % 4 ? 'X' : 'Y'; }, 'V'), P('w', or(ell(6, 4.8, 1, 0.6), ell(10, 5.6, 1, 0.6)), null, 'W')]),
    gache: build(16, 14, [P('V', rrect(1, 2, 15, 13, 2.6), function (x, y) { var r = hash(x, y, 2); return y < 4 ? 'T' : r < 0.12 ? 'S' : r < 0.2 ? 'k' : r > 0.9 ? 'C' : 'X'; }, 'T'), P('D', rrect(3, 4, 9, 6, 0.8), null, 'C')]),
    cocoa: build(14, 16, [P('w', or(rrect(2, 5, 11, 15, 1.6), cap(11, 8, 13, 11, 1.4)), function (x, y) { return y > 8 && y < 11 ? 'x' : x < 4 ? 'w' : 'W'; }, 'Q'), P('S', ell(6.5, 5.4, 4.2, 1.2), null, 'S'), P('w', or(ell(5, 3.6, 1.8, 1.6), ell(8, 3, 1.8, 1.8)), null, 'W')]),
    candycane: build(10, 18, [P('w', or(limb([[3, 17], [3, 5]], 1.6), limb([[3, 5], [4, 2], [6.6, 1.8], [8, 4], [8, 6]], 1.6)), function (x, y) { return (x + y) % 4 < 2 ? 'x' : 'w'; }, 'v')]),
    gingerman: build(16, 18, [P('U', or(ell(8, 4, 3.6, 3.6), rrect(4.4, 6, 11.6, 13, 2), cap(5, 8, 1.6, 10.6, 1.6), cap(11, 8, 14.4, 10.6, 1.6), cap(6.4, 12, 4.6, 16.6, 1.8), cap(9.6, 12, 11.4, 16.6, 1.8)), orb(7, 6, 7, 9, 'STUVX'), 'S')], [[6, 3, ['w.w']], [6, 5, ['www']], [7, 8, ['x']], [7, 10, ['x']]]),
    pudding: build(16, 15, [P(PUD[2], ell(8, 9, 7, 5.6), orb(7, 7, 7, 6, PUD)), P('w', or(ell(8, 5, 5.6, 2.4), ell(4, 7, 1.2, 1.4), ell(11.4, 7.4, 1, 1.6)), null, 'W'), P(HOLLY[2], or(ell(6.6, 3, 2, 1), ell(9.6, 3, 2, 1)), null, HOLLY[0]), P('x', ell(8, 3.4, 0.9, 0.9), null, 'v')])
  };

  /* An advent-calendar door, set into a wall: a little painted door with
     its number (game.js writes the number on), opening on a hidden
     treasure. 24 hide across the island; each one found opens that door
     in the sticker book's advent calendar. Shut, and swung open. */
  A.advent = [
    build(16, 20, [P(SUIT[2], rrect(1, 1, 15, 19, 1.6), function (x, y) { return x === 2 || y === 2 ? SUIT[3] : orb(6, 6, 12, 14, SUIT)(x, y); }, SUIT[0]), P(GOLD[3], ell(12.4, 11, 1.1, 1.1), null, GOLD[1])]),
    build(16, 20, [P(WARM[3], rrect(1, 1, 15, 19, 1.6), function (x, y) { return y > 15 ? WARM[2] : WARM[4]; }, WARM[1]), P(SUIT[2], rrect(0, 1, 3.4, 19, 1), null, SUIT[0])])
  ];

  /* A Christmas wreath for a door (holly, red berries, a bow), drawn by
     game.js on the cottages and in the town. */
  A.wreath = build(16, 16, [
    P(HOLLY[2], but(ell(8, 8, 7.4, 7.4), ell(8, 8, 3.6, 3.6)), function (x, y) { var a = Math.atan2(y - 8, x - 8); return Math.floor(a * 3.2 + 10) % 2 ? HOLLY[2] : (x + y < 14 ? HOLLY[4] : HOLLY[3]); }, HOLLY[0]),
    P('x', or(ell(4, 10, 1.2, 1.2), ell(12, 5, 1.2, 1.2), ell(10, 13, 1.1, 1.1)), null, 'v'),
    P('x', or(ell(5.6, 13.4, 2.4, 1.6), ell(10.4, 13.4, 2.4, 1.6)), orb(8, 12, 5, 3, RED), 'v')
  ]);

  /* ---- platforms' looks (game.js draws them where L.plat says { look }) ---- */
  // a wooden sledge with red runners curling up at the front
  LK.sledge = look(build(34, 14, [
    P(SUIT[2], limb([[2, 12], [28, 12], [32, 9], [31, 6.4]], 1), null, SUIT[0]),
    P(WOOD[2], rrect(3, 2, 28, 7, 1.4), function (x, y) { return y === 4 ? WOOD[1] : orb(14, 2, 14, 4, WOOD)(x, y); }, WOOD[0]),
    P(WOOD[1], or(rrect(6, 6, 8, 11, 0.6), rrect(23, 6, 25, 11, 0.6)), null, WOOD[0])
  ]), 2);
  /* The Herm ferry: a small white passenger boat with a navy stripe, a
     cabin with round windows, a little funnel. Its deck is where you stand. */
  LK.ferry = look(build(96, 34, [
    P(BOAT[2], or(rrect(4, 12, 92, 30, 4), tri(84, 12, 96, 10, 90, 24)), function (x, y) { if (y > 20 && y < 24) return NAVY[2]; if (y > 27) return NAVY[1]; return orb(40, 12, 50, 14, BOAT)(x, y); }, BOAT[0]),
    P(BOAT[3], rrect(26, 0, 66, 13, 2.4), function (x, y) { var X = x + 0.5, Y = y + 0.5; return Y > 4 && Y < 9 && ((X - 30) % 8 + 8) % 8 < 4 ? NAVY[3] : orb(40, 2, 24, 8, BOAT)(x, y); }, BOAT[0]),
    P(SUIT[2], rrect(68, -2, 74, 9, 1.2), function (x, y) { return y < 1 ? BOOT[2] : SUIT[2]; }, SUIT[0]),
    P(BOAT[4], rrect(2, 10, 94, 13, 1.2), null, BOAT[1])
  ]), 10);
  /* Sark's horse and cart: a chestnut horse in harness, trotting, and the
     flat wooden cart behind him you stand on (its top is the cart's bed). */
  var cart = function (k) {
    var lg = k ? [2, -2] : [-2, 2];
    return look(build(84, 40, [
      P('S', or(limb([[30, 22], [52, 22]], 1), limb([[30, 25], [52, 26]], 1)), null, 'S'),
      P(HORSE[2], or.apply(null, [[54, lg[0]], [58, lg[1]], [70, lg[1]], [74, lg[0]]].map(function (L) { return cap(L[0], 26, L[0] + L[1], 38, 1.6); })), function (x, y) { return y > 36 ? BOOT[2] : HORSE[2]; }, HORSE[0]),
      P(HORSE[2], rrect(52, 16, 78, 29, 6.5), orb(64, 20, 14, 8, HORSE)),
      P(HORSE[2], or(tri(76, 18, 82, 4, 72, 10), ell(80, 6, 4, 4.4), ell(83, 9.6, 3, 2.4)), orb(80, 6, 5, 5, HORSE), HORSE[0]),
      P(HORSE[0], or(limb([[78, 3], [75, 10], [74, 16]], 1.2), limb([[52, 18], [49, 24], [50, 30]], 1)), null, HORSE[0]),
      P('x', rrect(70, 14, 80, 16.4, 0.8), null, 'v'),
      P(WOOD[2], or(rrect(2, 12, 44, 20, 1.6), rrect(2, 6, 4, 14, 0.8), rrect(42, 6, 44, 14, 0.8)), function (x, y) { return y === 15 ? WOOD[1] : orb(20, 12, 22, 6, WOOD)(x, y); }, WOOD[0]),
      P(IRONB[2], or(ell(12, 26, 7.4, 7.4), ell(34, 26, 7.4, 7.4)), function (x, y) { var X = x + 0.5, Y = y + 0.5, d = Math.min(Math.hypot(X - 12, Y - 26), Math.hypot(X - 34, Y - 26)); return d < 1.8 ? IRONB[3] : d > 6 ? IRONB[1] : (Math.floor(Math.atan2(Y - 26, X - (X < 23 ? 12 : 34)) * 2.6 + 9 + k) % 2 ? WOOD[2] : WOOD[3]); }, IRONB[0])
    ], [[79, 4, ['#w', '##']]]), 12);
  };
  LK.cart = [cart(0), cart(1)];
  ['rows', 'cols', 'w', 'h', 'pal', 'hi', 'mode', 'noLight', 'top'].forEach(function (k) { LK.cart[k] = LK.cart[0][k]; });
  LK.cart.c = {};
  // a gingerbread platform: a long biscuit, iced along its edge with sweets on top
  LK.gingerbread = look(build(26, 10, [
    P('U', rrect(1, 1, 25, 9, 2.4), function (x, y) { var t = orb(10, 2, 14, 6, 'STUVX')(x, y); return (y === 2 || y === 7) && x > 2 && x < 24 && x % 3 ? 'w' : t; }, 'S'),
    P('x', ell(7, 2, 1.2, 1), null, 'v'), P(LEAF[3], ell(13, 1.6, 1.2, 1), null, LEAF[1]), P(GOLD[3], ell(19, 2, 1.2, 1), null, GOLD[1])
  ]), 1);

  /* The springs: what a spring looks like in the Christmas worlds (see
     SPRING_ART in game.js) — a big Christmas pudding, a pile of presents,
     a snow-heaped hedge… Each is [still, squashed]. */
  var spr = function (parts, sparts) { return [build(30, 20, parts), build(30, 20, sparts)]; };
  var bigPud = function (sq) {
    var ry = sq ? 6 : 8.6, cy = 20 - ry;
    return [P(PUD[2], ell(15, cy, 13, ry), function (x, y) { var r = hash(x, y, 5); return r < 0.1 ? 'S' : r > 0.93 ? 'u' : orb(13, cy - 2, 13, ry, PUD)(x, y); }),
      P('w', or(ell(15, cy - ry + 3, 10.6, 3.6), ell(7, cy - ry + 6, 1.6, 2.2), ell(21, cy - ry + 6.4, 1.4, 2.6), ell(13, cy - ry + 6.6, 1.2, 1.8)), function (x, y) { return x < 12 && y < cy - ry + 3 ? 'w' : 'W'; }, 'W'),
      P(HOLLY[2], or(ell(12, cy - ry + 1, 3, 1.4), ell(17.6, cy - ry + 1, 3, 1.4)), null, HOLLY[0]), P('x', or(ell(14.8, cy - ry + 0.6, 1.2, 1.2), ell(16, cy - ry + 1.6, 1, 1)), null, 'v')];
  };
  A.pudspring = spr(bigPud(false), bigPud(true));
  var presentPile = function (sq) {
    var d = sq ? 2.5 : 0;
    var box = function (x0, y0, x1, y1, t, rib) { return [P(t[2], rrect(x0, y0 + d, x1, y1, 1), orb(x0 + 2, y0, x1 - x0, y1 - y0, t), t[0]), P(rib[2], or(rrect((x0 + x1) / 2 - 1, y0 + d, (x0 + x1) / 2 + 1, y1, 0.3), rrect(x0, (y0 + y1 + d) / 2 - 1, x1, (y0 + y1 + d) / 2 + 1, 0.3)), null, rib[0])]; };
    return box(2, 8, 14, 20, SUIT, GOLD).concat(box(14, 10, 28, 20, POST, 'uvxyz'), box(7, 1, 20, 9.4, HOLLY, 'uvxyz'), [P('x', or(ell(11.6, 1 + d, 2.4, 1.4), ell(15.4, 1 + d, 2.4, 1.4)), null, 'v')]);
  };
  A.presentspring = spr(presentPile(false), presentPile(true));

  /* The cosy cottage at the end of every level: grey-pink Guernsey
     granite, a slate roof under snow, a chimney (game.js puffs its
     smoke), two windows glowing, a red door with a wreath — open, a
     family member stands in its light with a treat (game.js). */
  var cottage = function (open, snowy) {
    var parts = [
      // the chimney, the granite walls
      P(GRANITE[2], rrect(66, 2, 76, 22, 1), function (x, y) { return (Math.floor(y / 3) + Math.floor(x / 4)) % 2 ? GRANITE[2] : GRANITE[3]; }, GRANITE[0]),
      P(GRANITE[2], rrect(6, 30, 90, 80, 1), function (x, y) {
        // stones: rounded blocks of grey and pink, mortared
        var row = Math.floor(y / 5), off = row % 2 ? 4 : 0, cx = Math.floor((x + off) / 8);
        if (y % 5 === 0 || (x + off) % 8 === 0) return GRANITE[1];
        var r = hash(cx, row, 4);
        return r < 0.3 ? GRANITE[3] : r < 0.45 ? 'Z' : r > 0.85 ? GRANITE[4] : GRANITE[2];
      }, GRANITE[0]),
      // the roof: slates, snow along it if it's snowed
      P(SLATE[2], or(tri(0, 32, 96, 32, 48, 2), rrect(0, 28, 96, 34, 1.6)), function (x, y) {
        if (snowy && y < 30 - Math.abs(x - 48) * 0.6 + 6 + Math.sin(x * 0.7) * 1.4) return y < 28 - Math.abs(x - 48) * 0.6 + 4 ? SNOW[4] : SNOW[3];
        return y % 4 === 0 || (x + Math.floor(y / 4) * 3) % 7 === 0 ? SLATE[1] : orb(30, 10, 50, 24, SLATE)(x, y);
      }, SLATE[0]),
      // the windows, glowing, with little panes and a sill of snow
      P(WARM[3], or(rrect(14, 44, 32, 60, 1), rrect(64, 44, 82, 60, 1)), function (x, y) { return x === 23 || x === 73 || y === 52 ? 'S' : y < 48 ? WARM[4] : WARM[3]; }, 'S'),
      P(SNOW[3], or(rrect(13, 59, 33, 62, 1), rrect(63, 59, 83, 62, 1)), null, SNOW[1]),
      // the door, under a little porch
      P(open ? WARM[2] : SUIT[2], rrect(40, 48, 56, 80, 2), open ? function (x, y) { return y > 74 ? WARM[1] : WARM[3]; } : function (x, y) { return x === 48 ? SUIT[1] : orb(44, 54, 12, 26, SUIT)(x, y); }, open ? WARM[0] : SUIT[0]),
      P(SLATE[2], tri(36, 48, 60, 48, 48, 40), null, SLATE[0])
    ];
    if (open) parts.push(P(SUIT[2], rrect(36, 48, 40.6, 80, 1), null, SUIT[0]));
    else parts.push(P(GOLD[3], ell(53, 64, 1.2, 1.2), null, GOLD[1]));
    var sp = build(96, 82, parts);
    sp.door = [40, 56];
    return sp;
  };
  A.cottage = { shut: cottage(false, false), open: cottage(true, false), snowShut: cottage(false, true), snowOpen: cottage(true, true) };

  // a chimney on a roof, to drop a present down from the sleigh (11): a brick stack with a pot, snow on top
  A.xchimney = [false, true].map(function (lit) {
    return build(22, 28, [
      P('v', rrect(2, 6, 20, 28, 1), function (x, y) { if (y % 4 === 0 || (x + (Math.floor(y / 4) % 2) * 3) % 6 === 0) return 'u'; return lit ? 'x' : 'v'; }, 'u'),
      P('V', rrect(7, 0, 15, 7, 1.4), orb(10, 2, 6, 6, 'STUVX'), 'T'),
      P(SNOW[3], or(rrect(1, 5, 21, 8, 1.6), ell(5, 5, 4, 2), ell(16, 5.4, 4.4, 2.2)), orb(8, 4, 12, 4, SNOW))
    ]);
  });

  /* The big Christmas tree for Christmas morning (the ending): a fir in
     three tiers, tinsel looping round it, baubles, a gold star on top, in
     a red pot; two frames, its lights twinkling. */
  var TREE_BAUBLE = ['x', 'C', 'w', 'M', 'r'];
  var bigTree = function (k) {
    var tiers = [[24, 12, 20, 36], [24, 28, 26, 54], [24, 44, 32, 74]], parts = [
      P('v', rrect(14, 74, 34, 86, 2), orb(20, 76, 12, 8, RED), 'u'),
      P('T', rrect(21, 68, 27, 76, 1), null, 'S')
    ];
    tiers.slice().reverse().forEach(function (q) {
      parts.push(P(HOLLY[2], tri(q[0] - q[2] / 2 - 4, q[3], q[0] + q[2] / 2 + 4, q[3], q[0], q[1] - 8), function (x, y) {
        var X = x + 0.5, Y = y + 0.5, t = (X - q[0]) * 0.5 + (Y - q[1]) * 0.18 < 3 ? HOLLY[3] : HOLLY[2];
        if (X > q[0] + (Y - q[1]) * 0.4) t = HOLLY[1];
        // the tinsel, looping down across the tier
        if (Math.abs(Y - (q[1] + (q[3] - q[1]) * 0.55 + (X - q[0]) * 0.32)) < 0.8) return GOLD[(Math.floor(X / 2) + k) % 2 ? 3 : 2];
        // the lights and baubles
        var h = hash(Math.floor(X / 3), Math.floor(Y / 3), 9);
        if (h < 0.07) return TREE_BAUBLE[Math.floor(h * 70 + k) % TREE_BAUBLE.length];
        return t;
      }, HOLLY[0]));
    });
    parts.push(P(GOLD[3], or(tri(24, 0, 21, 6, 27, 6), tri(18, 4, 30, 4, 24, 9), tri(20, 11, 24, 6, 22, 5), tri(28, 11, 24, 6, 26, 5)), orb(23, 4, 6, 6, GOLD), GOLD[1]));
    return build(48, 88, parts);
  };
  D.xtree = [bigTree(0), bigTree(1)];

  // a present caught on the finishing arch: it swoops down to you as you run through (game.js, the goal)
  A.xgift = [0, 1].map(function (k) {
    return build(16, 16, [
      P(SUIT[2], rrect(1, 5, 15, 15, 1.4), orb(5, 6, 14, 10, SUIT), SUIT[0]),
      P(GOLD[3], or(rrect(7, 5, 9, 15, 0.3), rrect(1, 8.6, 15, 10.4, 0.3)), null, GOLD[1]),
      P(GOLD[2], or(ell(5.4 - k * 0.4, 3.2, 3, 2), ell(10.6 + k * 0.4, 3.2, 3, 2)), orb(7, 2, 6, 3, GOLD), GOLD[0])
    ]);
  });

  // for the sprite sheet: tools/sheet.html?only=xmas
  (A.sheet = A.sheet || []).push(['xmas things', [
    ['sleigh', A.sleigh], ['cracker', A.cracker[0]], ['', A.cracker[1]], ['globe', A.snowglobe[0]], ['', A.snowglobe[1]],
    ['gun', A.noongun[0]], ['', A.noongun[1]], ['stall', A.vegstall], ['postbox', A.postbox], ['bell', A.bell],
    ['pie', A.xtreat.mincepie], ['gache', A.xtreat.gache], ['cocoa', A.xtreat.cocoa], ['cane', A.xtreat.candycane], ['ginger', A.xtreat.gingerman], ['pud', A.xtreat.pudding],
    ['advent', A.advent[0]], ['', A.advent[1]], ['wreath', A.wreath], ['sledge', LK.sledge], ['ferry', LK.ferry], ['cart', LK.cart[0]], ['ginger', LK.gingerbread],
    ['pudspring', A.pudspring[0]], ['', A.pudspring[1]], ['presents', A.presentspring[0]], ['', A.presentspring[1]],
    ['cottage', A.cottage.shut], ['', A.cottage.snowOpen], ['chimney', A.xchimney[0]], ['', A.xchimney[1]]
  ]]);
})();
