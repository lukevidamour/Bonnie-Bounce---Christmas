/* ==========================================================================
   map.js — the Christmas map: Guernsey, with Herm and Sark across the
   water, on Christmas Eve.

   A living map of the island, seen from the south as a gull would see it
   (so the south coast's cliffs stand up as cliffs, and everything on the
   land stands up off it). Guernsey is drawn from its real coast: the long
   south coast of cliffs, the west coast's sandy bays (Rocquaine, Perelle,
   Vazon, Cobo), the east coast with St Peter Port's harbour and Castle
   Cornet on its rock; then Herm, with Shell Beach, and Sark, with La
   Coupée. It's stretched west to east, the way a picture map is, and the
   Town is drawn bigger than life, so its five medallions have room. The
   island sits low on the screen: the ribbon, the tag and the medals are
   drawn over its top, so every medallion is far enough down that he can
   stand on it below them, and the top is sea and sky.

   The eleven levels sit at their real places, joined by the path: by road
   across Guernsey, by boat to Herm and to Sark, and home over the water
   in Father Christmas's sleigh.

   The day goes by as the levels do: a pink-gold morning, a bright noon,
   a golden afternoon, the sunset over Cobo, then dusk and a starry night,
   with every window lit. Snow falls once the snow globe in Candie Gardens
   has been shaken (level 2), and lies on the roofs and the fields; the
   Town's lights come on once level 8 is done. And once it's all done,
   it's Christmas morning: sun on the snow, and a tree in the Town.

   The sleigh sits in the harbour where it crash-landed, filling up with
   reindeer as they're found; Father Christmas waves from beside it (with
   no hat until it's found in Saumarez Park, where a duck has it on).
   Grabby Gus circles the island with the golden bell until he's beaten
   on Sark; then he sits on the sleigh, pleased as anything.

   The island is painted once into a surface at full density, and again
   only when the time of day changes; everything that moves is drawn over
   it each frame. game.js owns the walking and the choosing; this file
   only draws.
   ========================================================================== */
(function () {
  'use strict';
  var H = BB.H, RR = BB.R, HP = 1 / RR, snap = BB.snap, mix = BB.mix, A = BB.ART, rgb = BB.toRgb;
  var MW = 620, W2 = MW * RR, H2 = H * RR;

  /* ---- where things are --------------------------------------------------------
     Guernsey from its real latitude and longitude: nine pixels to the
     kilometre north to south, eighteen west to east, and the Town spread a
     further 70 pixels wide (a smooth step, so the coast runs on without a
     kink). Along the Town's waterfront the coast is drawn taller than life
     too, so the harbour has room for its piers, its boats and the sleigh.
     Herm and Sark each have their own scale, a little bigger than
     Guernsey's, so they're more than a speck; they sit where they do in
     life, but nearer: the channels between are shrunk, not the islands. */
  var KM = 0.013806;
  var gx = function (lon) { var e = (lon + 2.675) / KM; return 70 + 18 * e + 35 * (1 + Math.tanh((e - 9.7) / 0.6)); };
  var gy = function (lat) { return 30 + (49.51 - lat) * 1000.8; };
  var townY = function (y) {
    if (y < 56 || y > 117) return y;
    if (y < 72) return 56 + (y - 56) * 10 / 16;
    if (y < 91) return 66 + (y - 72) * 38 / 19;
    return 104 + (y - 91) * 13 / 26;
  };
  var HERM = { x: 436, y: 70, sx: 22, sy: 13 }, SARK = { x: 548, y: 90, sx: 18, sy: 12 };
  var hp = function (dx, dy) { return [HERM.x + dx * HERM.sx, HERM.y - dy * HERM.sy]; };
  var sp = function (dx, dy) { return [SARK.x + dx * SARK.sx, SARK.y - dy * SARK.sy]; };

  /* where each level's medallion sits. (Laid out so that no leg of the
     path grazes another level's medallion: each passes well clear, except
     Candie to the Castle, which runs straight through the harbour's.) */
  var NODES = [
    [308, 84],  // 1 · St Peter Port: the harbour and the market
    [276, 74],  // 2 · Candie Gardens, up above the Town
    [338, 106], // 3 · Castle Cornet, on its rock at the harbour mouth
    [214, 86],  // 4 · the green lanes, in the middle of the island
    [184, 67],  // 5 · Saumarez Park, in the Castel
    [150, 64],  // 6 · Cobo and Vazon, on the west coast
    [92, 98],   // 7 · Fort Grey, in Rocquaine Bay
    [284, 108], // 8 · the Town's steep streets, up the hill
    [446, 66],  // 9 · Herm: Shell Beach
    [548, 101], // 10 · Sark, at the top of La Coupée (so the ridge shows below it)
    [292, 60]   // 11 · over the rooftops, at midnight
  ];
  var node = function (i) { var p = NODES[Math.max(0, Math.min(10, i))]; return { x: p[0], y: p[1] }; };
  // the way game.js walks from one to the next: a straight line with a hop
  var legAt = function (i, u) { var a = NODES[i], b = NODES[i + 1]; return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - Math.sin(u * Math.PI) * 4]; };

  /* ---- the coast ---------------------------------------------------------------
     Each island's outline, going round clockwise, and what each stretch
     of coast is like (from that point to the next):
       c  Guernsey's south-coast cliffs     k  Sark's cliffs
       h  Herm's and its neighbours' cliffs r  low rocks
       s  sand                              w  Shell Beach's shell sand
       q  a quay or a sea wall                                             */
  var KINDS = 'xckhrswq';
  var GUERNSEY = [
    [49.5040, -2.5045, 'r'], // Fort Doyle, the north-east tip
    [49.4990, -2.5065, 'r'], // Beaucette
    [49.4935, -2.5085, 'r'],
    [49.4885, -2.5110, 'r'], // Bordeaux
    [49.4850, -2.5140, 'q'], // past the Vale Castle to St Sampson's harbour
    [49.4818, -2.5130, 'q'],
    [49.4806, -2.5195, 'q'],
    [49.4792, -2.5150, 'q'],
    [49.4765, -2.5160, 'r'],
    [49.4720, -2.5235, 's'], // Belle Greve Bay
    [49.4675, -2.5295, 'q'], // Les Banques, the sea wall into Town
    [49.4630, -2.5325, 'q'],
    [49.4600, -2.5342, 'q'], // the harbour's quays
    [49.4560, -2.5348, 'q'],
    [49.4520, -2.5342, 'q'],
    [49.4495, -2.5322, 'r'], // Havelet
    [49.4450, -2.5300, 'r'], // La Vallette
    [49.4400, -2.5305, 'c'],
    [49.4372, -2.5318, 's'], // Fermain Bay
    [49.4352, -2.5300, 'c'],
    [49.4290, -2.5262, 'c'],
    [49.4245, -2.5220, 'c'], // Jerbourg Point
    [49.4215, -2.5275, 'c'],
    [49.4195, -2.5360, 'c'], // St Martin's Point
    [49.4205, -2.5440, 'c'], // Moulin Huet
    [49.4185, -2.5520, 'c'], // Saints Bay
    [49.4150, -2.5590, 'c'],
    [49.4128, -2.5650, 'c'], // Icart Point
    [49.4160, -2.5730, 'c'],
    [49.4180, -2.5848, 's'], // Petit Bot
    [49.4186, -2.5885, 'c'],
    [49.4190, -2.5980, 'c'], // Le Gouffre
    [49.4180, -2.6100, 'c'], // La Moye
    [49.4200, -2.6250, 'c'], // Corbière
    [49.4230, -2.6420, 'c'],
    [49.4250, -2.6580, 'c'], // Pleinmont
    [49.4275, -2.6700, 'r'], // Pleinmont Point, the south-west tip
    [49.4310, -2.6735, 'r'],
    [49.4355, -2.6655, 's'], // Portelet, and Rocquaine Bay
    [49.4400, -2.6600, 's'],
    [49.4450, -2.6575, 's'],
    [49.4510, -2.6580, 's'],
    [49.4560, -2.6620, 'r'], // L'Erée
    [49.4590, -2.6640, 'r'],
    [49.4610, -2.6560, 's'],
    [49.4640, -2.6440, 's'], // Perelle
    [49.4665, -2.6355, 'r'], // Le Crocq
    [49.4690, -2.6280, 's'], // Vazon Bay
    [49.4715, -2.6175, 's'],
    [49.4750, -2.6120, 'r'],
    [49.4785, -2.6135, 'r'], // Fort Hommet's headland
    [49.4800, -2.6060, 's'], // Cobo Bay
    [49.4790, -2.5990, 's'],
    [49.4830, -2.5950, 'r'],
    [49.4875, -2.5920, 'r'], // Grandes Rocques
    [49.4905, -2.5850, 's'],
    [49.4945, -2.5790, 's'], // Port Soif
    [49.4960, -2.5720, 'r'],
    [49.4975, -2.5650, 'r'],
    [49.5000, -2.5605, 'r'], // Rousse
    [49.4960, -2.5545, 's'], // Grand Havre
    [49.5005, -2.5530, 'r'],
    [49.5055, -2.5560, 'r'], // Chouet
    [49.5080, -2.5470, 's'], // Pembroke and L'Ancresse
    [49.5060, -2.5370, 's'],
    [49.5100, -2.5230, 'r'], // Fort Le Marchant
    [49.5070, -2.5140, 'r']
  ].map(function (p) { var x = gx(p[1]), y = gy(p[0]); return [x, x > 296 ? townY(y) : y, p[2]]; });
  // Herm and Sark in kilometres east and north of their middles
  var HERM_O = [
    [0.05, 1.45, 's'], // the north point, below the Common
    [0.25, 1.1, 'w'],  // Shell Beach
    [0.42, 0.75, 'w'],
    [0.48, 0.4, 'r'],
    [0.44, 0.12, 's'], // Belvoir Bay
    [0.52, -0.15, 'h'],
    [0.52, -0.55, 'h'],
    [0.42, -0.95, 'h'],
    [0.22, -1.25, 'h'],
    [-0.05, -1.33, 'h'],
    [-0.3, -1.18, 'h'],
    [-0.44, -0.85, 'r'],
    [-0.47, -0.4, 'q'], // the harbour
    [-0.44, -0.15, 's'], // Fisherman's Beach
    [-0.36, 0.4, 's'],
    [-0.25, 0.9, 's'],
    [-0.1, 1.25, 's']
  ].map(function (p) { return hp(p[0], p[1]).concat(p[2]); });
  var SARK_O = [
    [0.1, 1.75, 'k'], // Bec du Nez
    [0.5, 1.3, 'k'],
    [0.85, 0.8, 'k'],
    [1.05, 0.3, 'k'],
    [1.15, -0.1, 'k'], // the Creux harbour
    [1.05, -0.55, 'k'],
    [0.85, -0.95, 'k'], // Dixcart
    [0.45, -1.25, 'k'],
    [0.16, -1.45, 'k'], // La Coupée
    [0.12, -1.62, 'k'],
    [0.3, -1.85, 'k'], // Little Sark
    [0.45, -2.3, 'k'],
    [0.3, -2.75, 'k'],
    [-0.05, -2.95, 'k'],
    [-0.45, -2.75, 'k'],
    [-0.55, -2.3, 'k'],
    [-0.32, -1.85, 'k'],
    [-0.1, -1.62, 'k'],
    [-0.14, -1.45, 'k'],
    [-0.55, -1.2, 'k'],
    [-0.95, -0.85, 'k'],
    [-1.15, -0.4, 'k'], // Havre Gosselin
    [-1.1, 0.1, 'k'],
    [-0.95, 0.6, 'k'], // Port du Moulin
    [-0.6, 1.1, 'k'],
    [-0.3, 1.5, 'k']
  ].map(function (p) { return sp(p[0], p[1]).concat(p[2]); });
  // a round little island, in map pixels
  var islet = function (cx, cy, rx, ry, k, n) { var o = []; n = n || 10; for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + i * Math.PI * 2 / n; o.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, k]); } return o; };
  var CASTLE = { x: 344, y: 98 }, JETHOU = hp(-0.75, -2.0), BRECQHOU = sp(-1.75, -0.5), LIHOU = [gx(-2.6705), gy(49.4595)], HANOIS = [34, gy(49.4342)];
  var ISLES = [
    { id: 1, pts: GUERNSEY },
    { id: 2, pts: HERM_O },
    { id: 3, pts: SARK_O },
    { id: 4, pts: islet(JETHOU[0], JETHOU[1], 6.5, 4.2, 'h') },
    { id: 4, pts: islet(HERM.x - 1.1 * HERM.sx, HERM.y + 1.8 * HERM.sy, 2, 1.3, 'r', 7) },   // Crevichon
    { id: 4, pts: islet(BRECQHOU[0], BRECQHOU[1], 7, 3.2, 'h') },
    { id: 5, pts: islet(LIHOU[0], LIHOU[1], 4.2, 2.6, 'r') },
    { id: 6, pts: islet(CASTLE.x - 1, CASTLE.y + 0.5, 11, 7, 'q', 12) },                     // Castle Cornet's rock
    { id: 4, pts: islet(HANOIS[0], HANOIS[1] + 1, 3.5, 1.6, 'r', 8) },                      // the Hanois reef
    { id: 4, pts: islet(gx(-2.5195) + 3, gy(49.4225) + 1, 1.6, 1, 'r', 6) },                // the Pea Stacks, off Jerbourg
    { id: 4, pts: islet(gx(-2.5180) + 7, gy(49.4235) + 3, 1.2, 0.8, 'r', 6) },
    { id: 4, pts: islet(HERM.x + 2, HERM.y - 25, 2.2, 1.1, 'r', 7) },                        // the Humps, north of Herm
    { id: 4, pts: islet(HERM.x + 9, HERM.y - 23, 1.5, 0.9, 'r', 6) }
  ];
  // the harbour's piers, as thick lines: [width, points…]
  var PIERS = [
    [2.2, [311.5, 98], [322, 99.5], [334, 100]],    // the Castle's breakwater, out to the Castle
    [2, [313, 82], [323, 81], [336, 80.5]],         // the White Rock pier
    [1.6, [311.5, 90], [320, 90.5]],                // the Albert Pier, between the marinas
    [1.4, [hp(-0.47, -0.4)[0] + 0.5, hp(-0.47, -0.4)[1] + 1.5], [hp(-0.47, -0.4)[0] - 4, hp(-0.47, -0.4)[1] + 2.5]],  // Herm's harbour wall
    [1.2, [sp(1.15, -0.1)[0] - 0.5, sp(1.15, -0.1)[1] + 1], [sp(1.15, -0.1)[0] + 3, sp(1.15, -0.1)[1] + 2]]            // Sark's Creux harbour
  ];

  // ---- painting helpers (no wrap-round: the map has ends)
  var R = function (g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(snap(x), snap(y), Math.max(HP, snap(w)), Math.max(HP, snap(h))); };
  var disc = function (g, cx, cy, r, c) {
    g.fillStyle = c;
    for (var y = -r; y <= r; y += HP) { var hw = Math.sqrt(Math.max(0, r * r - y * y)); g.fillRect(snap(cx - hw), snap(cy + y), Math.max(HP, snap(hw * 2)), HP); }
  };
  var oval = function (g, cx, cy, rx, ry, c) {
    g.fillStyle = c;
    for (var y = -ry; y <= ry; y += HP) { var hw = rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))); g.fillRect(snap(cx - hw), snap(cy + y), Math.max(HP, snap(hw * 2)), HP); }
  };
  var shadow = function (g, x, y, rx) { oval(g, x, y, rx, Math.max(0.5, rx * 0.3), 'rgba(30,30,70,0.2)'); };
  var line = function (g, ax, ay, bx, by, c, w) { var n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / HP)); w = w || HP; for (var i = 0; i <= n; i++) R(g, ax + (bx - ax) * i / n - w / 2, ay + (by - ay) * i / n - w / 2, w, w, c); };
  var hsh = function (a, b) { var q = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return q - Math.floor(q); };
  // soft value noise
  var noise = function (x, y) {
    var xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    var n00 = hsh(xi, yi), n10 = hsh(xi + 1, yi), n01 = hsh(xi, yi + 1), n11 = hsh(xi + 1, yi + 1);
    return n00 + (n10 - n00) * u + (n01 - n00) * v + (n00 - n10 - n01 + n11) * u * v;
  };
  var shd = function (c, f) { return f > 0 ? [c[0] + (255 - c[0]) * f, c[1] + (255 - c[1]) * f, c[2] + (255 - c[2]) * f] : [c[0] * (1 + f), c[1] * (1 + f), c[2] * (1 + f)]; };
  var mx3 = function (a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };
  // a soft light, added over what's there
  var glow = function (g, x, y, r, col, a) {
    var gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(' + col + ',' + a + ')'); gr.addColorStop(1, 'rgba(' + col + ',0)');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
  };

  /* ---- the island's shape, worked out once -------------------------------------
     Each outline is drawn as a smooth curve through its points, given a
     crinkle along it (more on rocks, none on a quay), and filled. From that:
       LAND  which island each fine pixel is (0 for the sea)
       KIND  the kind of coast nearest it
       FACE  how far down a cliff face it is: seen from the south, a coast
             that faces south shows its cliff, so below its edge the land
             carries on down, as rock, for the cliff's height
       DSEA  for the sea, how far it is to the shore (or the foot of a cliff)
       DLAND for the land, how far it is to the edge                       */
  var CRINKLE = { c: 0.9, k: 1, h: 0.8, r: 1.1, s: 0.25, w: 0.2, q: 0, x: 0.5 };
  var CLIFF = { c: 6, k: 7, h: 4, r: 1.2, s: 0.35, w: 0.3, q: 1.5, x: 1 };
  var outline = function (pts) {
    // Catmull-Rom through the points, sampled every half pixel or so
    var out = [], n = pts.length, i, s, arc = 0;
    for (i = 0; i < n; i++) {
      var p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), m = Math.max(2, Math.ceil(len / 0.5));
      for (s = 0; s < m; s++) {
        var t = s / m, t2 = t * t, t3 = t2 * t;
        var x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
        var y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
        out.push([x, y, p1[2]]);
      }
    }
    // the crinkle, along each point's outward normal
    var o = [];
    for (i = 0; i < out.length; i++) {
      var a = out[(i + out.length - 1) % out.length], b = out[(i + 1) % out.length], dx = b[0] - a[0], dy = b[1] - a[1], dl = Math.hypot(dx, dy) || 1;
      if (i) arc += Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]);
      var amp = CRINKLE[out[i][2]], wob = ((noise(arc / 2.2, 3.7) - 0.5) * 1.4 + (noise(arc / 0.9, 9.1) - 0.5) * 0.6) * amp;
      o.push([out[i][0] + dy / dl * wob, out[i][1] - dx / dl * wob, out[i][2]]);
    }
    return o;
  };
  // the distance to the nearest set pixel, by two sweeps (in fine pixels)
  var chamfer = function (inside, w, h) {
    var d = new Float32Array(w * h), i, x, y, v, D = 1.4142;
    for (i = 0; i < w * h; i++) d[i] = inside[i] ? 0 : 1e6;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      i = y * w + x; v = d[i]; if (!v) continue;
      if (x > 0 && d[i - 1] + 1 < v) v = d[i - 1] + 1;
      if (y > 0) { if (d[i - w] + 1 < v) v = d[i - w] + 1; if (x > 0 && d[i - w - 1] + D < v) v = d[i - w - 1] + D; if (x < w - 1 && d[i - w + 1] + D < v) v = d[i - w + 1] + D; }
      d[i] = v;
    }
    for (y = h - 1; y >= 0; y--) for (x = w - 1; x >= 0; x--) {
      i = y * w + x; v = d[i]; if (!v) continue;
      if (x < w - 1 && d[i + 1] + 1 < v) v = d[i + 1] + 1;
      if (y < h - 1) { if (d[i + w] + 1 < v) v = d[i + w] + 1; if (x < w - 1 && d[i + w + 1] + D < v) v = d[i + w + 1] + D; if (x > 0 && d[i + w - 1] + D < v) v = d[i + w - 1] + D; }
      d[i] = v;
    }
    return d;
  };
  var GEO = null;
  var geo = function () {
    if (GEO) return GEO;
    var cv = document.createElement('canvas'); cv.width = W2; cv.height = H2;
    var g = cv.getContext('2d'), kc = document.createElement('canvas'); kc.width = W2; kc.height = H2;
    var kg = kc.getContext('2d'), i, k, x, y;
    g.scale(RR, RR); kg.scale(RR, RR);
    kg.lineCap = 'round'; kg.lineJoin = 'round';
    var kindCol = function (c) { return 'rgb(' + (KINDS.indexOf(c) * 30 + 15) + ',0,0)'; };
    ISLES.forEach(function (isl) {
      var o = outline(isl.pts);
      g.fillStyle = 'rgb(' + isl.id * 30 + ',0,0)';
      g.beginPath(); o.forEach(function (p, j) { if (j) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.closePath(); g.fill();
      // the kind of coast, stroked thick along it, so the land and the sea
      // either side of the line know what they're next to
      kg.lineWidth = 9;
      for (k = 1; k <= o.length; k++) { var p = o[k - 1], q = o[k % o.length]; kg.strokeStyle = kindCol(p[2]); kg.beginPath(); kg.moveTo(p[0], p[1]); kg.lineTo(q[0], q[1]); kg.stroke(); }
    });
    // the piers, laid on as quay
    PIERS.forEach(function (pc) {
      [[g, 'rgb(' + (pc[1][0] > 500 ? 90 : pc[1][0] > 400 ? 60 : 30) + ',0,0)', pc[0]], [kg, kindCol('q'), pc[0] + 6]].forEach(function (L) {
        L[0].strokeStyle = L[1]; L[0].lineWidth = L[2]; L[0].lineCap = 'butt';
        L[0].beginPath(); for (k = 1; k < pc.length; k++) { if (k === 1) L[0].moveTo(pc[k][0], pc[k][1]); else L[0].lineTo(pc[k][0], pc[k][1]); } L[0].stroke();
      });
    });
    var id = g.getImageData(0, 0, W2, H2).data, kd = kg.getImageData(0, 0, W2, H2).data, N = W2 * H2;
    var LAND = new Uint8Array(N), KIND = new Uint8Array(N), FACE = new Uint8Array(N), FACEH = new Uint8Array(N);
    for (i = 0; i < N; i++) {
      if (id[i * 4 + 3] > 127) LAND[i] = Math.round(id[i * 4] / 30);
      KIND[i] = kd[i * 4 + 3] > 20 ? Math.max(0, Math.round((kd[i * 4] - 15) / 30)) : 0;
    }
    // the cliffs that face south, hanging down below their edges
    for (x = 0; x < W2; x++) {
      var last = -1, lh = 0;
      for (y = 0; y < H2; y++) {
        i = y * W2 + x;
        if (LAND[i]) { last = y; var kk = KINDS[KIND[i]] || 'x'; lh = CLIFF[kk] * (kk === 'c' || kk === 'k' ? 0.8 + noise(x / 9, 1.3) * 0.45 : 1); continue; }
        if (last < 0) continue;
        var dep = y - last;
        if (dep <= lh * RR) { FACE[i] = dep; FACEH[i] = Math.max(1, Math.round(lh * RR)); } else last = -1;
      }
    }
    var solid = new Uint8Array(N), sea = new Uint8Array(N);
    for (i = 0; i < N; i++) { solid[i] = LAND[i] || FACE[i] ? 1 : 0; sea[i] = LAND[i] ? 0 : 1; }
    var DSEA = chamfer(solid, W2, H2), DLAND = chamfer(sea, W2, H2);
    // and, a game pixel at a time, where the open water is (for the boats,
    // the path's wake, the glints): 2 is more than a couple of pixels out
    var SEA = new Uint8Array(MW * H);
    for (y = 0; y < H; y++) for (x = 0; x < MW; x++) { i = (y * RR + 1) * W2 + x * RR + 1; SEA[y * MW + x] = !solid[i] ? (DSEA[i] > 2.5 * RR ? 2 : 1) : 0; }
    GEO = { LAND: LAND, KIND: KIND, FACE: FACE, FACEH: FACEH, DSEA: DSEA, DLAND: DLAND, SEA: SEA };
    return GEO;
  };
  // is a map point out on the open water? on which island?
  var atSea = function (x, y) { var G = geo(), xi = Math.round(x), yi = Math.round(y); if (xi < 0 || xi >= MW || yi < 0 || yi >= H) return true; return G.SEA[yi * MW + xi] === 2; };
  var wet = function (x, y) { var G = geo(), xi = Math.round(x), yi = Math.round(y); if (xi < 0 || xi >= MW || yi < 0 || yi >= H) return true; return G.SEA[yi * MW + xi] > 0; };
  var isle = function (x, y) { var G = geo(), xi = Math.round(x * RR), yi = Math.round(y * RR); if (xi < 0 || xi >= W2 || yi < 0 || yi >= H2) return 0; return G.LAND[yi * W2 + xi]; };
  var inland = function (x, y, m) { var G = geo(), xi = Math.round(x * RR), yi = Math.round(y * RR); if (xi < 0 || xi >= W2 || yi < 0 || yi >= H2) return false; var i = yi * W2 + xi; return G.LAND[i] > 0 && G.DLAND[i] > m * RR; };

  /* ---- the regions that aren't fields ---------------------------------------------
     St Peter Port spreads up the hill behind its harbour; St Sampson's is
     smaller, round its own. Candie Gardens and Saumarez Park are lawns and
     trees; L'Ancresse, Pleinmont and Herm's north end are commons, rough
     grass and gorse; and the airport is in the Forest. */
  var inTown = function (x, y) { if (x > 314) return false; var dx = (x - 287) / 31, dy = (y - 89) / 26; return dx * dx + dy * dy < 1 || (x > 326 && x < 346 && (x - 336) * (x - 336) / 100 + (y - 59) * (y - 59) / 25 < 1); };
  var STP = function (x, y) { var dx = (x - 287) / 31, dy = (y - 89) / 26; return x < 314 && dx * dx + dy * dy < 1; };
  var inPark = function (x, y) { var a = (x - 189) / 14, b = (y - 68) / 8.5, c = (x - 266) / 12, d = (y - 83) / 7.5; return a * a + b * b < 1 || c * c + d * d < 1; };
  var inCommon = function (x, y, id) { return id === 1 && ((y < 38 && x > 228) || (x < 86 && y > 104) || (x > 300 && y > 112)) || id === 2 && y < HERM.y - 7; };
  var AIR = { x0: 152, x1: 181, y: Math.round(gy(49.4346)) };
  var inAirport = function (x, y) { return x > AIR.x0 - 3 && x < AIR.x1 + 3 && y > AIR.y - 3.5 && y < AIR.y + 2.5; };

  /* ---- the fields ------------------------------------------------------------------
     Guernsey's countryside is a patchwork of little fields with banks and
     hedges between them, and the green lanes running along some of them:
     a Voronoi of jittered points, the edges between cells hedges (lit on
     their upper left, a shadow on their lower right), some of them lanes.
     Sark's and Herm's fields are smaller still. */
  var FGRID = [[10, 6.5], [6.5, 4.5]];
  var FIELD = ['#7cc45a', '#8acc60', '#6cb852', '#96d068', '#80c05c', '#a0d26e', '#74bc56', '#88c862'].map(rgb);
  var fieldAt = function (x, y, small) {
    var cw = FGRID[small][0], ch = FGRID[small][1], ci = Math.floor(x / cw), cj = Math.floor(y / ch), d1 = 1e9, d2 = 1e9, a = null, b = null, i, j;
    for (j = cj - 1; j <= cj + 1; j++) for (i = ci - 1; i <= ci + 1; i++) {
      var px = (i + 0.2 + hsh(i * 1.7 + small * 50, j * 2.3) * 0.6) * cw, py = (j + 0.2 + hsh(j * 3.1 + 7, i * 1.3 - 4 + small * 9) * 0.6) * ch, dd = (x - px) * (x - px) + (y - py) * (y - py);
      if (dd < d1) { d2 = d1; b = a; d1 = dd; a = [i, j, px, py]; } else if (dd < d2) { d2 = dd; b = [i, j, px, py]; }
    }
    var sep = Math.hypot(a[2] - b[2], a[3] - b[3]) || 1;
    return { a: a, b: b, edge: (d2 - d1) / (2 * sep), down: (a[2] - b[2]) + (a[3] - b[3]) };
  };

  /* ---- the time of day -------------------------------------------------------------
     How far the story's got sets the light: for each, what share of red,
     green and blue gets through, what's added, which side the sun's low on
     (east in the morning, west at sunset) and how strongly it tints that
     end. The last is Christmas morning. */
  var LIGHT = [
    { m: [1, 0.92, 0.9], a: [30, 14, 18], sun: 1, glow: '255,170,150', ga: 0.34 },   // 0 · dawn, pink and gold
    { m: [1, 0.97, 0.95], a: [16, 8, 6], sun: 1, glow: '255,210,150', ga: 0.2 },      // 1 · morning
    { m: [1, 1, 1], a: [6, 5, 6], sun: 0 },                                            // 2 · late morning
    { m: [1.03, 1.03, 1.03], a: [8, 8, 8], sun: 0 },                                   // 3 · noon
    { m: [1, 0.98, 0.93], a: [10, 6, 0], sun: 0 },                                     // 4 · afternoon
    { m: [1, 0.95, 0.88], a: [18, 8, 0], sun: -1, glow: '255,200,110', ga: 0.24 },     // 5 · the golden end of the afternoon
    { m: [0.96, 0.8, 0.76], a: [34, 8, 16], sun: -1, glow: '255,130,90', ga: 0.42 },   // 6 · sunset over Cobo
    { m: [0.6, 0.55, 0.74], a: [26, 12, 38], sun: -1, glow: '240,130,150', ga: 0.3 },  // 7 · dusk
    { m: [0.42, 0.46, 0.62], a: [12, 16, 32], sun: 0 },                                // 8 · night
    { m: [0.39, 0.43, 0.6], a: [10, 15, 32], sun: 0 },                                 // 9 · night
    { m: [0.36, 0.4, 0.58], a: [8, 14, 32], sun: 0 },                                  // 10 · midnight
    { m: [1.04, 1.04, 1.06], a: [10, 10, 16], sun: 1, glow: '255,236,190', ga: 0.16 }  // Christmas morning
  ];
  // where the story's got to: the last level finished (up to 10), or 11 for Christmas morning
  var stage = function (st) {
    if (st.done) return 11;
    var h = 0; (st.cleared || []).forEach(function (n) { if (n > h) h = Math.min(10, n); });
    return h;
  };
  var hasDone = function (st, n) { return st.done || (st.cleared || []).indexOf(n) > -1; };

  /* ---- what's painted, and what shines and moves later -------------------------------
     Painting the landmarks fills in these lists, so the frame knows where
     the windows, chimneys, glasshouses and lamps are. */
  var WIN = [], SMOKE = [], GLASS = [], LAMPS = [], BULBS = [], STARS = [];

  /* ---- the terrain: every fine pixel of sea, shore, cliff and field ----------------- */
  var TERR = { sn: -1, img: null };
  var terrain = function (g, sn) {
    var i, x, y;
    // (the ground only changes with the snow, so it's kept for the next time of day)
    if (TERR.sn === sn) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.putImageData(TERR.img, 0, 0); g.restore(); seaTexture(g); return; }
    var G = geo(), img = g.createImageData(W2, H2), d = img.data, px, py, col;
    var SEA0 = rgb('#48a8dc'), SEA1 = rgb('#2a66ae'), SHAL = rgb('#86dae6'), SHALW = rgb('#9cf0ea'), FOAM = [255, 255, 255];
    var SAND = rgb('#f0d698'), WETS = rgb('#d6b87e'), SHELL = rgb('#fbf1de'), SHELLW = rgb('#e4d4ba');
    var ROCK = rgb('#a48c84'), ROCKD = rgb('#6e5c58'), REDR = rgb('#c4705e'), QUAY = rgb('#c8c0b8'), QUAYD = rgb('#8e8680');
    var RIM = rgb('#8a9848'), BRACK = rgb('#b8864a'), GORSE = rgb('#f0c43a');
    var CF = { 1: [rgb('#c2a894'), rgb('#927a6a'), rgb('#5e4c48')], 3: [rgb('#aa9a8a'), rgb('#7c6c62'), rgb('#4e4248')], 2: [rgb('#b8a698'), rgb('#8a7a70'), rgb('#5a4c4a')], 4: [rgb('#a89a8e'), rgb('#7a6c66'), rgb('#4e4448')], 6: [rgb('#b8b0a8'), rgb('#8a8480'), rgb('#5a5458')], 5: [rgb('#a89a8e'), rgb('#7a6c66'), rgb('#4e4448')] };
    var HEDGE = rgb('#3a763a'), HEDGEL = rgb('#5e9e4a'), LANE = rgb('#d8c896'), TOWN = rgb('#b4aca8'), TOWND = rgb('#948c8c'), LAWN = rgb('#82cc5e'), COMMON = rgb('#9cbe62');
    var PLOUGH = rgb('#a47c58'), FURROW = rgb('#86603e'), STUBBLE = rgb('#c4bc7c'), RUNWAY = rgb('#8c8c94');
    var SNOW = rgb('#f2f6ff'), SNOWB = rgb('#c8d6f0');
    // the lie of the land, a game pixel at a time: gentle slopes, lit from the top left
    var SH = new Float32Array(MW * H);
    for (y = 0; y < H; y++) for (x = 0; x < MW; x++) {
      var h0 = noise(x / 16, y / 9) + noise(x / 7, y / 4.5) * 0.4, h1 = noise((x + 1.5) / 16, (y + 1.5) / 9) + noise((x + 1.5) / 7, (y + 1.5) / 4.5) * 0.4;
      SH[y * MW + x] = (h1 - h0) * 0.22;
    }
    var put = function (o, c) { d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255; };
    for (py = 0; py < H2; py++) for (px = 0; px < W2; px++) {
      i = py * W2 + px; x = px / RR; y = py / RR;
      var o = i * 4, id = G.LAND[i], gi = Math.min(H - 1, Math.floor(y)) * MW + Math.min(MW - 1, Math.floor(x)), grain = hsh(px, py);
      if (id) {
        var kk = KINDS[G.KIND[i]], dl = G.DLAND[i] / RR, n1 = noise(x * 0.9, y * 1.4), sh = SH[gi], sw = 0;
        if (id === 6 || (kk === 'q' && (dl < 0.9 || (dl < 2.2 && x > 305 && x < 336 && y > 60 && y < 92)))) {
          // the quays and the castle's rock: granite setts
          col = shd(dl < 0.7 ? QUAY : mx3(QUAY, QUAYD, 0.25), (grain - 0.5) * 0.1 + (dl < 0.5 ? 0.12 : 0)); sw = 0.4;
        } else if ((kk === 's' || kk === 'w') && dl < (kk === 'w' ? 3.4 : 2.6) + n1 * 0.9) {
          // the beach: wet near the water
          var sd = kk === 'w' ? SHELL : SAND, wt = kk === 'w' ? SHELLW : WETS;
          col = dl < 0.8 ? wt : shd(sd, (grain - 0.5) * 0.08 + (kk === 'w' && grain > 0.93 ? 0.3 : 0));
          if (kk === 'w' && grain < 0.04) col = [255, 186, 196];
          sw = dl < 0.8 ? 0 : 0.3;
        } else if ((kk === 'r' || kk === 'x') && dl < 1.2 + n1 * 1.3 && noise(x * 1.2, y * 1.8) > 0.32) {
          // rocks, the pink granite of Cobo's among them
          var rc = x > 150 && x < 178 && y > 38 && y < 56 && id === 1 ? REDR : ROCK, rs = noise(x * 1.2 - 0.4, y * 1.8 - 0.4) - noise(x * 1.2 + 0.4, y * 1.8 + 0.4);
          col = shd(mx3(rc, ROCKD, Math.max(0, 0.3 - rs * 2)), rs * 0.6 + (grain - 0.5) * 0.08); sw = 0.45;
        } else if ((kk === 'c' || kk === 'k' || kk === 'h') && dl < 1.5 + n1 * 1.2) {
          // the cliff tops: gorse (in flower all winter) and bracken
          col = grain < 0.12 ? GORSE : mx3(RIM, BRACK, Math.max(0, noise(x * 0.7, y) - 0.4)); col = shd(col, sh + (grain - 0.5) * 0.12); sw = 0.75;
        } else if (id === 1 && inAirport(x, y)) {
          var rw = Math.abs(y - AIR.y) < 0.75 && x > AIR.x0 && x < AIR.x1;
          col = rw ? (Math.abs(y - AIR.y) < 0.2 && Math.floor(x) % 3 === 0 ? [240, 240, 240] : RUNWAY) : shd(LAWN, -0.05 + (grain - 0.5) * 0.06);
          sw = rw ? 0.15 : 0.85;
        } else if (inPark(x, y)) {
          col = shd(LAWN, sh + ((Math.floor(x / 2.5) % 2) ? 0.04 : -0.02) + (grain - 0.5) * 0.05); sw = 0.9;
        } else if (id === 1 && inTown(x, y)) {
          col = shd(grain < 0.18 ? TOWND : TOWN, (grain - 0.5) * 0.08); sw = 0.55;
        } else if (inCommon(x, y, id)) {
          col = grain < 0.05 ? GORSE : grain < 0.16 ? shd(COMMON, -0.25) : shd(COMMON, sh + (n1 - 0.5) * 0.15); sw = 0.8;
        } else {
          // the fields, their hedges and the lanes between them
          var small = id === 1 ? 0 : 1, F = fieldAt(x, y, small), ka = F.a[0] * 37 + F.a[1] * 101, kb = F.b[0] * 37 + F.b[1] * 101;
          var nearLanes = Math.hypot(x - NODES[3][0], y - NODES[3][1]) < 34 ? 0.5 : 0.22;
          var lane = hsh(Math.min(ka, kb) * 0.37 + small, Math.max(ka, kb) * 0.71) < nearLanes, hw = lane ? 1.05 : 0.6;
          if (lane && F.edge < 0.45) { col = shd(LANE, (grain - 0.5) * 0.1); sw = 0.7; }
          else if (F.edge < hw) { col = F.down < 0 ? HEDGEL : HEDGE; if (grain < 0.2) col = shd(col, -0.15); sw = F.down < 0 ? 0.6 : 0.25; }
          else {
            var fk = hsh(F.a[0] * 1.31 + small * 7, F.a[1] * 2.17), base = FIELD[Math.floor(hsh(F.a[1] * 0.9, F.a[0] * 1.9) * FIELD.length)];
            if (fk < 0.1) { var fu = (x * 0.8 + y * (hsh(F.a[0], 3) - 0.5) * 2); col = Math.floor(fu * 1.6) % 2 ? PLOUGH : FURROW; sw = 0.75; }
            else if (fk < 0.17) { col = grain < 0.3 ? shd(STUBBLE, -0.1) : STUBBLE; sw = 0.95; }
            else { col = grain < 0.06 ? shd(base, -0.14) : base; sw = 0.95; }
            col = shd(col, sh + (F.edge < hw + 0.7 && F.down > 0 ? -0.16 : 0));
            if (F.edge < hw + 0.7 && F.down > 0) sw *= -1;
          }
        }
        // the snow, lying where it can (thinnest on the beaches, bluish in the hedges' shadows)
        if (sn > 0 && sw !== 0) {
          var amt = sn * Math.min(1, Math.abs(sw) * (0.85 + n1 * 0.3)) * (sw > 0.9 ? 0.86 + noise(x / 9, y / 6) * 0.14 : 1);
          var sc = sw < 0 ? SNOWB : shd(SNOW, sh * 0.9 + (grain - 0.5) * 0.03);
          col = mx3(col, sc, amt);
        }
      } else if (G.FACE[i]) {
        // a cliff face: strata and gullies, lit at the top, dark and wet at the foot
        var fd = G.FACE[i] / G.FACEH[i], idf = 1, k2;
        for (k2 = 1; k2 <= G.FACE[i] + 1 && py - k2 >= 0; k2++) if (G.LAND[i - k2 * W2]) { idf = G.LAND[i - k2 * W2]; break; }
        var CC = CF[idf] || CF[1], strip = hsh(Math.floor(px / 3), idf), ledge = hsh(Math.floor(px / 2), Math.floor(py / 3)) < 0.12;
        col = fd < 0.2 ? CC[0] : fd < 0.78 ? mx3(CC[1], CC[0], strip * 0.35) : CC[2];
        if (ledge && fd > 0.2 && fd < 0.75) col = sn > 0 ? mx3([90, 130, 70], SNOW, sn * 0.6) : [96, 128, 72];
        col = shd(col, (strip - 0.5) * 0.12);
        if (sn > 0 && fd < 0.2) col = mx3(col, SNOW, sn * 0.5);
      } else {
        // the sea: foam at the shore, turquoise over sand, deepening blue
        var ds = G.DSEA[i] / RR, kn = KINDS[G.KIND[i]], deep = mx3(SEA0, SEA1, Math.min(1, y / H * 1.1));
        deep = shd(deep, (noise(x / 26, y / 9) - 0.5) * 0.12);
        if (ds < 0.7 && noise(x * 0.8, y * 1.6) > 0.22) col = FOAM;
        else if (ds < 10) {
          var f = Math.pow(1 - ds / 10, 1.7);
          col = mx3(deep, kn === 'w' ? SHALW : kn === 'r' || kn === 'c' || kn === 'k' ? mx3(SHAL, deep, 0.3) : SHAL, f);
          if (ds < 1.8) col = mx3(col, FOAM, 0.35 * (1 - ds / 1.8) + 0.1);
          // rocks just offshore, where the coast is rocky
          if ((kn === 'r' || kn === 'c' || kn === 'k' || kn === 'h') && ds < 3.5 && noise(x * 0.75 + 11, y * 1.1) > 0.74) col = shd(ROCK, (noise(x * 0.75 + 10.6, y * 1.1 - 0.4) - noise(x * 0.75 + 11.4, y * 1.1 + 0.4)) * 0.7 - 0.08);
        } else col = deep;
      }
      put(o, col);
    }
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.putImageData(img, 0, 0); g.restore();
    TERR.sn = sn; TERR.img = img;
    seaTexture(g);
  };
  // the sea's own texture: little strokes of light on it
  var seaTexture = function (g) {
    var rnd = BB.rng(77), x, y;
    for (var i = 0; i < 420; i++) { x = rnd() * MW; y = rnd() * H; if (!atSea(x, y)) continue; R(g, x, y, 2 + rnd() * 4, HP, 'rgba(255,255,255,' + (0.1 + rnd() * 0.12) + ')'); }
  };

  /* ---- the landmarks' painters ------------------------------------------------------- */
  // a house seen from the south: its front wall, the south slope of its
  // roof (snow on it, once it's snowing), a chimney, windows to light at night
  var house = function (g, x, base, w, h, wall, roof, sn, o) {
    o = o || {};
    var k, lw = mix(wall, '#ffffff', 0.4), dw = mix(wall, '#3a3050', 0.22), rd = mix(roof, '#1c1428', 0.35), rl = mix(roof, '#ffffff', 0.22);
    var rh = o.rh || Math.max(1.5, w * 0.42), x0 = x - w / 2;
    if (!o.noShadow) shadow(g, x + 0.8, base + 0.2, w * 0.62);
    R(g, x0, base - h, w, h, wall); R(g, x0, base - h, HP, h, lw); R(g, x0 + w - HP, base - h, HP, h, dw);
    if (o.gable) {
      for (k = 0; k < rh; k += HP) { var gw = (w / 2 + 0.4) * (1 - k / rh); R(g, x - gw, base - h - k - HP, gw * 2, HP, k < HP ? rd : roof); R(g, x - gw, base - h - k - HP, Math.min(gw, HP * 2), HP, rl); if (sn && k > rh * 0.3) R(g, x - gw, base - h - k - HP, gw * 2, HP, mix(roof, '#f2f6ff', Math.min(1, sn * 1.2))); }
    } else {
      R(g, x0 - 0.4, base - h - rh, w + 0.8, rh, roof); R(g, x0 - 0.4, base - h - HP, w + 0.8, HP, rd); R(g, x0 - 0.4, base - h - rh, w + 0.8, HP, rl);
      if (sn) { var sh2 = rh * (0.45 + sn * 0.3); R(g, x0 - 0.4, base - h - rh, w + 0.8, sh2, mix('#dfe8fa', '#f6f9ff', 0.6)); for (k = 0; k < w + 0.8; k += 1) if (hsh(x0 + k, base) < 0.5) R(g, x0 - 0.4 + k, base - h - rh + sh2, 1, HP, '#e8eefa'); R(g, x0 - 0.4, base - h - rh, w + 0.8, HP, '#ffffff'); }
    }
    if (o.chim !== false) {
      var cx = x0 + w * (o.chim === -1 ? 0.2 : 0.72), cy = base - h - rh - (o.gable ? -rh * 0.4 : 0);
      R(g, cx, cy - 1.6, 1, 1.8, o.chimCol || mix(wall, '#8a6a5a', 0.6)); R(g, cx - 0.25, cy - 1.8, 1.5, HP, '#5a4a4a');
      if (sn) R(g, cx - 0.25, cy - 2.2, 1.5, HP, '#f6f9ff');
      SMOKE.push([cx + 0.5, cy - 2]);
    }
    // the windows: a row to a storey, the ground floor's with the door
    if (o.win !== false) {
      var cols = Math.max(1, Math.floor((w - 1) / 2)), gap = (w - cols) / (cols + 1), rows = Math.max(1, Math.floor((h - 1.4) / 2));
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) { var wx = x0 + gap + c * (1 + gap), wy = base - h + 0.8 + r * 2; if (h < 3.5 && cols > 1 && c === Math.floor(cols / 2)) continue; R(g, wx, wy, 1, 1, '#3c4460'); WIN.push([wx, wy, 1, 1]); }
      if (h >= 3.5) { R(g, x - 0.5, base - 1.6, 1, 1.6, o.door || '#5a3a2a'); }
    }
  };
  // trees: evergreen (holm oaks and the like), bare winter ones, and pines
  var canopy = function (g, cx, cy, rw, rh, rnd, c, sn) {
    var pts = [], n = Math.max(4, Math.round(rw * rh / 5)), i;
    for (i = 0; i < n; i++) { var a = rnd() * 6.283, dd = Math.sqrt(rnd()); pts.push([cx + Math.cos(a) * rw * dd, cy + Math.sin(a) * rh * dd, 1.2 + rnd() * 1.6]); }
    pts.sort(function (p, q) { return p[1] - q[1]; });
    pts.forEach(function (p) { disc(g, p[0] + 0.4, p[1] + 0.6, p[2], c[0]); });
    pts.forEach(function (p) { disc(g, p[0], p[1], p[2] * 0.86, c[1]); });
    pts.forEach(function (p) { if (p[1] < cy + 0.5) disc(g, p[0] - p[2] * 0.3, p[1] - p[2] * 0.35, p[2] * 0.42, sn ? mix(c[2], '#f6f9ff', Math.min(1, sn * 1.3)) : c[2]); });
  };
  var EVER = ['#245a34', '#38804a', '#62aa5e'], OAK = ['#2c6a3c', '#46904c', '#78b866'];
  var tree = function (g, x, y, s, rnd, sn, c) {
    shadow(g, x + 1, y + 0.3, 2.6 * s);
    R(g, x - 0.4 * s, y - 2.6 * s, 0.8 * s, 2.6 * s, '#6a4a32');
    canopy(g, x, y - 4 * s, 2.6 * s, 2.1 * s, rnd, c || EVER, sn);
  };
  var bare = function (g, x, y, s, sn) {
    var k, col = '#6e5444';
    shadow(g, x + 0.8, y + 0.3, 2 * s);
    for (k = 0; k < 6 * s; k += HP) R(g, x - (0.5 - k / (24 * s)) * s, y - k - HP, Math.max(HP, (1 - k / (8 * s)) * s), HP, col);
    [[-1, 3, 2.6], [1, 2.4, 2.4], [-1, 4.6, 1.8], [1, 4.2, 2], [1, 5.4, 1.2]].forEach(function (b) {
      for (k = 0; k < b[2] * s; k += HP) { R(g, x + b[0] * k * 0.8, y - b[1] * s - k * 0.7, HP, HP, col); if (sn && hsh(x + k, b[1]) < 0.35) R(g, x + b[0] * k * 0.8, y - b[1] * s - k * 0.7 - HP, HP, HP, '#f6f9ff'); }
    });
  };
  var pine = function (g, x, y, s, sn) {
    shadow(g, x + 0.8, y + 0.3, 1.8 * s);
    R(g, x - 0.3, y - 1.2 * s, 0.6, 1.2 * s, '#5a3e2c');
    for (var t = 0; t < 3; t++) {
      var by = y - 1 * s - t * 1.7 * s, w = (2.4 - t * 0.6) * s;
      for (var k = 0; k < 2.4 * s; k += HP) { var hw = w * (1 - k / (2.4 * s)); R(g, x - hw, by - k, hw, HP, '#2e6a44'); R(g, x, by - k, hw, HP, '#1e4e34'); }
      if (sn) for (k = 0.8 * s; k < 2.4 * s; k += HP) { var hw2 = w * (1 - k / (2.4 * s)); R(g, x - hw2, by - k, hw2 * 1.4, HP, '#eef4ff'); }
    }
  };
  // a glasshouse, running east to west: its low south wall of glass and its
  // roof, glinting (the glass stays clear of snow: it's warm in there)
  var glasshouse = function (g, x, base, w) {
    shadow(g, x + w / 2 + 0.8, base + 0.3, w * 0.55);
    R(g, x, base - 1.6, w, 1.6, '#bcdce6'); R(g, x, base - HP, w, HP, '#8a8478');
    R(g, x - 0.3, base - 3.2, w + 0.6, 1.6, '#e2f4f8'); R(g, x - 0.3, base - 3.2, w + 0.6, HP, '#ffffff'); R(g, x - 0.3, base - 1.8, w + 0.6, HP, '#9ab8c4');
    for (var k = 0.4; k < w - 0.3; k += 0.8) R(g, x + k, base - 1.1 - (k * 7 % 3 > 1.5 ? 0.3 : 0), 0.6, 0.8, k * 3 % 2 > 1 ? '#5aa04a' : '#4a8a3c');
    for (k = 0.7; k < w - 0.3; k += 2.4) R(g, x + k, base - 0.9, HP, HP, '#e84a3a');
    for (k = 1; k < w; k += 1.5) { R(g, x + k, base - 1.6, HP, 1.6, '#9ab8c4'); R(g, x + k - 0.1, base - 3.2, HP, 1.4, '#c4dce4'); }
    GLASS.push([x, base - 3.2, w]);
  };
  // a round granite loophole tower, as stand all along Guernsey's coast
  var tower = function (g, x, base, s, sn) {
    var w = 3 * s, h = 4.2 * s;
    shadow(g, x + 0.8, base + 0.2, w * 0.7);
    R(g, x - w / 2, base - h, w, h, '#b49c8c'); R(g, x - w / 2, base - h, HP * 2, h, '#d8c4b4'); R(g, x + w / 2 - HP * 2, base - h, HP * 2, h, '#8a7468');
    R(g, x - w / 2 - 0.3, base - h - 0.8, w + 0.6, 0.8, '#a08878'); R(g, x - w / 2 - 0.3, base - h - 0.8, w + 0.6, HP, sn ? '#f6f9ff' : '#d0bcac');
    R(g, x - 0.25, base - h * 0.6, HP, 1, '#3a3040'); R(g, x - 0.5, base - 1.2, 1, 1.2, '#4a3a32');
  };
  // a cow (a Guernsey: golden, with white patches), painted where it stands; the cows that move are drawn each frame
  var COWS = [];

  /* ---- the landmarks -------------------------------------------------------------------
     Each is put on a list with the y of its foot, and they're painted from
     the back (north) forward, so nearer things stand in front of further. */
  var features = function (g, S) {
    var F = [], sn = S.snow, rnd = BB.rng(2512), i, k, x, y, p;
    var add = function (y, f) { F.push([y, f]); };
    var clearOf = function (x, y, r) { for (var j = 0; j < 11; j++) if (Math.hypot(x - NODES[j][0], y - NODES[j][1]) < r) return false; return true; };
    WIN.length = 0; SMOKE.length = 0; GLASS.length = 0; LAMPS.length = 0; BULBS.length = 0; COWS.length = 0;

    // ---- St Peter Port: tall granite and stucco houses in terraces up the
    // hill behind the harbour, cream and white and the odd pastel, slate
    // roofs; Candie Gardens up at the top, the market down by the quay
    var WALLS = ['#f2ead8', '#e8dcc4', '#d8d2c8', '#f4e2d0', '#d4e2f0', '#f2cfc4', '#c8bcae', '#f4e6b8', '#e2d4ec', '#cfe6d4', '#fbfaf4', '#bfb2a4'], ROOFS = ['#5a6478', '#4e5a6e', '#66707e', '#5e5868'];
    var townRnd = BB.rng(8);
    for (y = 62; y < 117; y += 4.2) {
      for (x = 255 + townRnd() * 3; x < 312; ) {
        var w = 3.4 + townRnd() * 2.6, h = 4 + townRnd() * 3.5 + (x > 296 ? 1.5 : 0), cx = x + w / 2;
        x += w + (townRnd() < 0.18 ? 1.5 + townRnd() * 2 : 0.2);
        if (!STP(cx, y) || !inland(cx, y, 1.2) || !inland(cx - w / 2, y, 0.6) || !inland(cx + w / 2, y, 0.6)) continue;
        if (inPark(cx, y - 1) || inPark(cx, y - h - 2) || inPark(cx - w / 2, y - h) || inPark(cx + w / 2, y - h) || !clearOf(cx, y - 3, 8.5) || Math.abs(cx - VT.x) < 4 && y > VT.y - 3 && y < VT.y + 12) continue;
        // (the market's place, by the quay)
        if (cx > 286 && cx < 313 && y > 91 && y < 109) continue;
        (function (cx, y, w, h, wall, roof, chim) { add(y, function () { house(g, cx, y, w, h, wall, roof, sn, { chim: chim }); }); })(cx, y + (townRnd() - 0.5) * 0.8, w, h, WALLS[Math.floor(townRnd() * WALLS.length)], ROOFS[Math.floor(townRnd() * ROOFS.length)], townRnd() < 0.55 ? (townRnd() < 0.5 ? 1 : -1) : false);
      }
    }
    // the market halls by the quay: pale granite, arches along the front
    add(99, function () {
      var mx = 305, mb = 99;
      shadow(g, mx + 1, mb + 0.3, 7);
      R(g, mx - 6, mb - 5, 12, 5, '#e8dcc8'); R(g, mx - 6, mb - 5, HP, 5, '#fff4e4'); R(g, mx + 6 - HP, mb - 5, HP, 5, '#b8ac9a');
      R(g, mx - 6.5, mb - 7, 13, 2, '#6a7080'); R(g, mx - 6.5, mb - 7, 13, HP, sn ? '#f6f9ff' : '#8a90a0'); if (sn) R(g, mx - 6.5, mb - 6.5, 13, 0.8, '#eef3fc');
      for (k = 0; k < 4; k++) { var ax = mx - 4.6 + k * 3; R(g, ax, mb - 3.2, 1.6, 3.2, '#5a4a48'); disc(g, ax + 0.8, mb - 3.2, 0.8, '#5a4a48'); WIN.push([ax, mb - 3, 1.6, 2.6]); }
      R(g, mx - 6, mb - 0.6, 12, 0.6, '#c8bca8');
    });
    // Victoria Tower: a tall red granite tower on the hill
    add(VT.y, function () {
      var vx = VT.x, vb = VT.y;
      shadow(g, vx + 1, vb + 0.3, 2.5);
      R(g, vx - 1.5, vb - 11, 3, 11, '#b85a48'); R(g, vx - 1.5, vb - 11, HP, 11, '#e08a72'); R(g, vx + 1, vb - 11, HP, 11, '#8a3a32');
      R(g, vx - 2, vb - 11.6, 4, 0.8, '#a04a3c'); for (k = 0; k < 4; k += 1) R(g, vx - 2 + k, vb - 12.4, 0.6, 0.8, '#a04a3c');
      for (k = 0; k < 2.5; k += HP) R(g, vx - 0.8 + k * 0.3, vb - 12.4 - k, 1.6 - k * 0.6, HP, '#7a3a34');
      R(g, vx - 0.25, vb - 8, HP, 1.2, '#3a2a30'); R(g, vx - 0.25, vb - 4.5, HP, 1.2, '#3a2a30');
    });
    // Candie Gardens: lawns, flower beds, the Victorian glasshouses, the bandstand
    add(86, function () {
      var cx = 266;
      [[-8, 79.5], [-1, 78.5], [6, 88.5], [-5, 89.5]].forEach(function (b) { oval(g, cx + b[0], b[1], 2.2, 0.9, sn ? '#e8eef8' : '#6a4a3a'); for (k = 0; k < 6; k++) R(g, cx + b[0] - 1.6 + hsh(k, b[0]) * 3.2, b[1] - 0.6 + hsh(b[1], k) * 1.2, HP, HP, ['#ff5a7a', '#ffd84a', '#c86aff', '#ffffff'][k % 4]); });
      // the pond, frozen over (Prancer skates on it, till he's found)
      oval(g, cx - 1, 85.4, 5.4, 1.9, sn ? '#c8d8ec' : '#8ab07a'); oval(g, cx - 1, 85, 5, 1.6, '#cfe8f6'); R(g, cx - 4, 84.4, 2, HP, '#ffffff'); R(g, cx + 1, 85.6, 1.5, HP, '#ffffff');
      glasshouse(g, cx - 13, 87.5, 5.5); glasshouse(g, cx - 3, 81.5, 5);
      var bs = { x: cx + 8, y: 84.5 };
      R(g, bs.x - 2, bs.y - 0.6, 4, 0.6, '#d8d0c0'); for (k = -1.6; k <= 1.6; k += 1.6) R(g, bs.x + k - 0.2, bs.y - 2.6, 0.4, 2, '#4a6a5a');
      for (k = 0; k < 1.6; k += HP) R(g, bs.x - 2.4 + k, bs.y - 2.6 - k * 0.6, 4.8 - k * 2, HP, sn ? '#f2f6ff' : '#3e7a62');
    });
    // trees about the Town and up Candie
    [[266, 66], [260, 74], [256, 91], [287, 67], [300, 70], [258, 102], [270, 114], [298, 113], [275, 91]].forEach(function (t) { if (inland(t[0], t[1], 1)) add(t[1], function () { tree(g, t[0], t[1], 1, rnd, sn, OAK); }); });
    // the harbour: the boats in the marinas (their masts), the harbour light on the White Rock pier
    add(84, function () {
      var b, rb = BB.rng(19);
      for (b = 0; b < 9; b++) {
        var bx = 315 + (b % 5) * 3.6 + rb() * 1.2, by = b < 5 ? 85 : 88;
        oval(g, bx, by, 1.4, 0.55, ['#ffffff', '#e8f0ff', '#ffe8d8'][b % 3]); R(g, bx - 1, by - 0.2, 2, HP, '#3a4a6a');
        R(g, bx - 0.15, by - 4.5 - rb() * 1.5, HP, 4.2, '#d8d4cc');
      }
      for (b = 0; b < 6; b++) { var bx2 = 315.5 + b * 3.4 + rb(), by2 = 93.5 + (b % 2) * 2.2; oval(g, bx2, by2, 1.5, 0.6, ['#ffffff', '#d84a3a', '#ffffff', '#3a6ac8'][b % 4]); R(g, bx2 - 0.8, by2 - 0.8, 1.4, 0.6, '#f0ece4'); }
    });
    add(81.5, function () {
      var lx = 336, lb = 80.6;
      R(g, lx - 0.8, lb - 3.5, 1.6, 3.5, '#f4f0e8'); R(g, lx - 0.8, lb - 3.5, HP, 3.5, '#ffffff'); R(g, lx - 1, lb - 4.4, 2, 0.9, '#3a8a4a'); R(g, lx - 0.5, lb - 5, 1, 0.6, '#2a2a38');
      LAMPS.push([lx, lb - 4, '120,255,140', 4]);
    });
    // lamps along the quay
    for (y = 80; y <= 97; y += 5.5) LAMPS.push([310.6, y, '255,214,140', 3.5]);

    // ---- Castle Cornet, on its rock: granite walls in tiers, the citadel on
    // top (its pennant flies: drawn each frame), the noon-day gun's battery
    add(CASTLE.y + 6, function () {
      var c = CASTLE, wl = '#b8aca4', wd = '#8a7e7a', wt = sn ? '#f2f6ff' : '#d8ccc4';
      shadow(g, c.x + 1, c.y + 5.5, 10);
      // the outer wall, round the rock
      R(g, c.x - 9, c.y - 1, 18, 5, wl); R(g, c.x - 9, c.y - 1, HP * 2, 5, '#d8ccc4'); R(g, c.x + 9 - HP * 2, c.y - 1, HP * 2, 5, wd);
      for (k = 0; k < 18; k += 1.5) R(g, c.x - 9 + k, c.y - 1.8, 0.9, 0.8, wl);
      R(g, c.x - 9, c.y - 1, 18, HP, wt);
      // the middle ward and its walls
      R(g, c.x - 6, c.y - 5, 13, 4, '#c4b8b0'); R(g, c.x - 6, c.y - 5, HP * 2, 4, '#e0d4cc'); R(g, c.x + 7 - HP * 2, c.y - 5, HP * 2, 4, wd);
      for (k = 0; k < 13; k += 1.5) R(g, c.x - 6 + k, c.y - 5.8, 0.9, 0.8, '#c4b8b0');
      R(g, c.x - 6, c.y - 5, 13, HP, wt);
      // the citadel, at the top
      R(g, c.x - 2, c.y - 9.5, 6, 4.5, '#ccc0b8'); R(g, c.x - 2, c.y - 9.5, HP * 2, 4.5, '#ece0d8'); R(g, c.x + 4 - HP * 2, c.y - 9.5, HP * 2, 4.5, wd);
      for (k = 0; k < 6; k += 1.5) R(g, c.x - 2 + k, c.y - 10.3, 0.9, 0.8, '#ccc0b8');
      R(g, c.x + 0.75, c.y - 13.5, HP, 3.2, '#4a4048');
      // windows and the gate, the gun on its battery
      [[-7, 1], [-3, 1], [4, 1], [-4, -3], [2, -3], [0, -8]].forEach(function (w) { R(g, c.x + w[0], c.y + w[1], 1, 1, '#3c3a50'); WIN.push([c.x + w[0], c.y + w[1], 1, 1]); });
      R(g, c.x - 0.5, c.y + 1.5, 1.4, 2.5, '#4a3a32'); disc(g, c.x + 0.2, c.y + 1.5, 0.7, '#4a3a32');
      R(g, c.x - 9.5, c.y - 2.6, 2.6, 0.9, '#3a3438'); disc(g, c.x - 7, c.y - 2.2, 0.6, '#3a3438');
      // the little lighthouse at the end of the breakwater
      R(g, c.x + 8.5, c.y - 3, 1.4, 3, '#f4f0e8'); R(g, c.x + 8.5, c.y - 3.8, 1.4, 0.8, '#c84a3a');
      LAMPS.push([c.x + 9.2, c.y - 3.4, '255,120,110', 4]);
    });

    // ---- 2-3 and the east: St Sampson's harbour and its boats, the Vale
    // Castle on its hill, the glasshouses all over the Vale, and L'Ancresse
    // Common's loophole towers
    add(55, function () {
      var vx = 342, vb = 54;
      ellipseHill(g, vx, vb + 1, 7, 3);
      R(g, vx - 4, vb - 3.5, 8, 3.5, '#a49488'); R(g, vx - 4, vb - 3.5, HP * 2, 3.5, '#c8b8aa'); for (k = 0; k < 8; k += 1.6) R(g, vx - 4 + k, vb - 4.3, 1, 0.8, '#a49488');
      if (sn) R(g, vx - 4, vb - 3.6, 8, HP, '#f2f6ff');
    });
    add(60, function () { for (k = 0; k < 4; k++) { var bx = 336 + k * 2.4, by = 59.5; oval(g, bx, by, 1.1, 0.5, k % 2 ? '#d84a3a' : '#3a6ac8'); R(g, bx - 0.1, by - 2.6, HP, 2.4, '#d8d4cc'); } });
    var GH = [[278, 46.4, 7], [286, 48.8, 6], [279, 50.5, 8], [292, 44.7, 6], [300, 52.1, 7], [270, 52.9, 6], [306, 46.4, 5], [312, 54.5, 6], [262, 47.2, 6], [318, 49.6, 5], [296, 57.0, 6], [326, 52.1, 5], [168, 80.7, 6], [176, 83.2, 5], [196, 93.8, 6], [232, 95.5, 6], [238, 90.5, 5], [205, 74.2, 5], [224, 67.6, 6], [244, 59.5, 6], [250, 66.0, 5], [138, 75.8, 5], [128, 85.6, 6], [118, 92.2, 5]];
    GH.forEach(function (q) { if (inland(q[0], q[1], 1.5) && inland(q[0] + q[2], q[1], 1.5) && clearOf(q[0] + q[2] / 2, q[1], 9)) add(q[1], function () { glasshouse(g, q[0], q[1], q[2]); }); });
    [[gx(-2.535), gy(49.5075)], [gx(-2.545) + 2, gy(49.5055)], [gx(-2.528), gy(49.5085)], [220, gy(49.4985)], [181, gy(49.4865)], [gx(-2.664) + 2, gy(49.4585)], [321, 110.5], [185.4, gy(49.419)]].forEach(function (t, j) { if (inland(t[0], t[1], 0.5)) add(t[1], function () { tower(g, t[0], t[1], j === 6 ? 0.8 : 1, sn); }); });

    // ---- 4 · the green lanes: a hedge-veg stall with its honesty box, the
    // blue postbox, a granite farmhouse, and Guernsey cows in the fields
    var pL = { x: NODES[3][0], y: NODES[3][1] };
    add(pL.y - 1, function () {
      var sx = pL.x + 10.5, sb = pL.y - 1;
      shadow(g, sx + 0.5, sb + 0.2, 3);
      R(g, sx - 2.5, sb - 2.2, 5, 2.2, '#a87448'); R(g, sx - 2.5, sb - 2.2, 5, HP, '#d8a070');
      [['#e8603a', -1.8], ['#7ac85a', -0.6], ['#f0d860', 0.6], ['#ffffff', 1.6]].forEach(function (v) { disc(g, sx + v[1], sb - 2.6, 0.55, v[0]); });
      R(g, sx - 2.8, sb - 5, HP, 2.8, '#7a5030'); R(g, sx + 2.4, sb - 5, HP, 2.8, '#7a5030');
      for (k = 0; k < 1.2; k += HP) R(g, sx - 3.2 + k * 0.4, sb - 5 - k, 6.4 - k * 0.8, HP, sn ? '#f2f6ff' : '#c84a3a');
      R(g, sx + 1.2, sb - 1.6, 1, 1, '#5a3a24'); R(g, sx + 1.45, sb - 1.6, 0.5, HP, '#2a1a10');
    });
    add(pL.y + 1, function () {
      var bx = pL.x - 9, bb = pL.y + 1;
      shadow(g, bx + 0.4, bb + 0.2, 1.2);
      R(g, bx - 0.75, bb - 3.2, 1.5, 3.2, '#2a5ab8'); R(g, bx - 0.75, bb - 3.2, HP, 3.2, '#5a8ae8'); disc(g, bx, bb - 3.2, 0.75, '#2a5ab8');
      R(g, bx - 0.5, bb - 2.4, 1, HP, '#122a60'); R(g, bx - 0.4, bb - 1.6, 0.8, 0.6, '#d8e4ff');
      if (sn) disc(g, bx, bb - 3.6, 0.6, '#f6f9ff');
    });
    add(pL.y - 9, function () { house(g, pL.x + 15, pL.y - 9, 7, 4, '#c8b49c', '#8a5a4a', sn, { chim: 1, door: '#3a5a8a' }); });
    add(pL.y + 16, function () { house(g, pL.x - 18, pL.y + 16, 6, 3.5, '#b8a490', '#5e6474', sn, { chim: -1 }); });
    COWS.push([pL.x - 6, pL.y + 9, 1], [pL.x - 1, pL.y + 11, -1], [pL.x + 11, pL.y + 7, 1], [pL.x + 16, pL.y + 9.5, -1], [pL.x + 9, pL.y - 14, 1], [pL.x - 30, pL.y + 2, 1], [pL.x - 26, pL.y + 4, -1], [pL.x + 40, pL.y + 26, 1], [pL.x + 44, pL.y + 27, -1], [pL.x - 70, pL.y - 10, 1]);

    // ---- 5 · Saumarez Park: the manor, the duck pond, the Japanese
    // garden's little red bridge, the playground, and big old trees
    var pS = { x: NODES[4][0], y: NODES[4][1] };
    add(pS.y - 1, function () {
      var mx = pS.x + 12, mb = pS.y - 1;
      shadow(g, mx + 1, mb + 0.3, 7);
      R(g, mx - 6, mb - 5, 12, 5, '#e2d8c8'); R(g, mx - 6, mb - 5, HP, 5, '#fff6e8'); R(g, mx + 6 - HP, mb - 5, HP, 5, '#b0a494');
      R(g, mx - 6.5, mb - 7, 13, 2, '#5c6472'); R(g, mx - 6.5, mb - 7, 13, HP, sn ? '#f6f9ff' : '#7a8290'); if (sn) R(g, mx - 6.5, mb - 6.6, 13, 0.9, '#eef3fc');
      R(g, mx - 6, mb - 9.5, 3, 4.5, '#e2d8c8'); R(g, mx - 6, mb - 9.5, HP, 4.5, '#fff6e8'); for (k = 0; k < 1.6; k += HP) R(g, mx - 6.2 + k * 0.6, mb - 9.5 - k, 3.4 - k * 1.2, HP, sn ? '#f6f9ff' : '#5c6472');
      for (k = 0; k < 5; k++) { R(g, mx - 4.6 + k * 2.2, mb - 4, 1, 1.2, '#3c4460'); WIN.push([mx - 4.6 + k * 2.2, mb - 4, 1, 1.2]); R(g, mx - 4.6 + k * 2.2, mb - 2, 1, 1.2, '#3c4460'); WIN.push([mx - 4.6 + k * 2.2, mb - 2, 1, 1.2]); }
      R(g, mx - 0.6, mb - 1.6, 1.2, 1.6, '#5a3a2a');
      SMOKE.push([mx + 3.5, mb - 8]);
      R(g, mx + 3, mb - 8, 1, 1.2, '#a89888');
    });
    add(pS.y + 9, function () {
      var px = pS.x - 9, py = pS.y + 9;
      oval(g, px, py, 6.5, 2.6, sn ? '#c4d8ec' : '#7a9a5a'); oval(g, px, py, 5.8, 2.1, '#5ab0d8'); oval(g, px + 0.6, py + 0.3, 4.6, 1.5, '#4498c8'); R(g, px - 3.5, py - 1.2, 2.4, HP, '#bfe8f8');
      // the little red bridge, over the stream out of the pond
      for (k = -2; k <= 2; k += HP) R(g, px + 6 + k, py + 1.6 - (1 - k * k / 4) * 1.2, HP, 0.7, '#d8402e');
      R(g, px + 4, py + 1.6, HP, 0.8, '#a83020'); R(g, px + 8, py + 1.6, HP, 0.8, '#a83020');
    });
    add(pS.y + 9, function () {
      var px = pS.x + 9, py = pS.y + 9;
      R(g, px - 0.2, py - 3, HP, 3, '#d84a3a'); R(g, px + 3.2, py - 3, HP, 3, '#d84a3a'); R(g, px - 0.2, py - 3, 3.6, HP, '#d84a3a');
      R(g, px + 0.9, py - 2.6, HP, 1.8, '#ffffff'); R(g, px + 2.2, py - 2.6, HP, 1.8, '#ffffff'); R(g, px + 0.6, py - 0.8, 0.9, HP, '#3a6ac8'); R(g, px + 1.9, py - 0.8, 0.9, HP, '#3a6ac8');
      for (k = 0; k < 3; k += HP) R(g, px + 4.4 + k, py - 2.6 + k * 0.8, 0.8, HP, '#ffd84a'); R(g, px + 4.2, py - 2.8, HP, 2.8, '#3a8ad8');
    });
    [[-12, -6], [-6, -9], [6, -10], [20, -3], [24, 3], [-14, 3], [15, 11], [-2, 13], [0, -12]].forEach(function (t, j) { var tx = pS.x + t[0], ty = pS.y + t[1]; if (inland(tx, ty, 1)) add(ty, function () { if (j % 3 === 2) bare(g, tx, ty, 1.1, sn); else tree(g, tx, ty, 1.15, rnd, sn, OAK); }); });

    // ---- 6 · Cobo and Vazon: Fort Hommet's tower on the headland, the
    // red rocks of Cobo, the coast road and a little kiosk
    var pC = { x: NODES[5][0], y: NODES[5][1] };
    add(pC.y - 5, function () { tower(g, pC.x - 7, pC.y - 5, 1, sn); });
    add(pC.y - 4, function () { var kx = pC.x + 15, kb = pC.y - 3.5; if (inland(kx, kb, 0.5)) house(g, kx, kb, 4, 2.4, '#f4f0e4', '#3a8ac8', sn, { chim: false, win: false }); R(g, kx - 1, kb - 1.4, 2, 0.9, '#3c4460'); WIN.push([kx - 1, kb - 1.4, 2, 0.9]); });

    // ---- 7 · Fort Grey, the "cup and saucer": a white round tower in a
    // round wall on a rock in Rocquaine Bay, joined to the shore
    var pF = { x: NODES[6][0], y: NODES[6][1] };
    add(pF.y + 3, function () {
      var fx = pF.x - 12, fb = pF.y + 3;
      line(g, fx + 3, fb - 0.8, pF.x - 4.5, pF.y + 1, '#b8aca0', 1);
      oval(g, fx + 0.6, fb + 0.3, 5.4, 1.8, 'rgba(30,30,70,0.25)');
      oval(g, fx, fb - 0.4, 5, 2.1, '#8a8078'); oval(g, fx, fb - 1.4, 5, 2.1, '#e8e4dc'); oval(g, fx, fb - 1.4, 4.2, 1.6, sn ? '#f4f7ff' : '#c8c0b4'); R(g, fx - 5, fb - 1.4, HP * 2, 1, '#ffffff');
      R(g, fx - 2, fb - 7, 4, 5.8, '#f8f6f0'); R(g, fx - 2, fb - 7, HP * 2, 5.8, '#ffffff'); R(g, fx + 2 - HP * 2, fb - 7, HP * 2, 5.8, '#c8c4bc');
      R(g, fx - 2.3, fb - 7.8, 4.6, 0.8, '#d8d4cc'); R(g, fx - 2.3, fb - 7.8, 4.6, HP, sn ? '#ffffff' : '#ece8e0');
      R(g, fx - 0.4, fb - 5.6, 0.8, 1, '#3a3848'); WIN.push([fx - 0.4, fb - 5.6, 0.8, 1]); R(g, fx - 0.4, fb - 3.2, 0.8, 1, '#3a3848'); WIN.push([fx - 0.4, fb - 3.2, 0.8, 1]);
    });
    // Lihou's one house, and Portelet's little harbour wall; the Fairy Ring on Pleinmont
    add(LIHOU[1], function () { house(g, LIHOU[0] - 0.5, LIHOU[1] + 0.5, 3.4, 2.2, '#f0ece0', '#5a6070', sn, { chim: 1 }); });
    add(105, function () { line(g, gx(-2.6655) - 1, 105, gx(-2.6655) - 4, 106, '#a8a098', 1); });
    add(108.5, function () { var fx = 79, fy = 108.5; oval(g, fx, fy, 3, 1.2, sn ? '#c8d8f0' : '#6a8a3a'); oval(g, fx, fy, 2.3, 0.8, sn ? '#f2f6ff' : '#9cbe62'); for (k = 0; k < 8; k++) { var a = k * 0.785; R(g, fx + Math.cos(a) * 2.7 - 0.25, fy + Math.sin(a) * 1 - 0.4, HP, HP * 2, '#d8d0c4'); } });
    // the airport in the Forest: its little terminal
    add(AIR.y - 2, function () { house(g, 175, AIR.y - 2, 5, 1.8, '#e8ecf0', '#b8c0c8', sn, { chim: false, rh: 0.8 }); R(g, 172, AIR.y - 6, HP, 4.2, '#a8a8b0'); R(g, 171.4, AIR.y - 6.6, 1.4, 1, '#d8e4f0'); });

    // ---- Les Hanois, the lighthouse on its reef off Pleinmont
    add(HANOIS[1], function () {
      var lx = HANOIS[0], lb = HANOIS[1];
      R(g, lx - 1.4, lb - 12, 2.8, 12, '#a8a4a0'); R(g, lx - 1.4, lb - 12, HP * 2, 12, '#d0ccc8'); R(g, lx + 1.4 - HP * 2, lb - 12, HP * 2, 12, '#7a7672');
      for (k = 0; k < 12; k += 2.4) R(g, lx - 1.4, lb - 12 + k, 2.8, HP, '#8e8a86');
      R(g, lx - 1.8, lb - 12.6, 3.6, 0.6, '#5a5a62'); R(g, lx - 1, lb - 14.4, 2, 1.8, '#fff6c8'); R(g, lx - 1.3, lb - 15, 2.6, 0.6, '#3a3a48');
      LAMPS.push([lx, lb - 13.5, '255,244,180', 6]);
    });

    // ---- farmhouses, cottages and trees across the island
    var FARMS = [[120, 79.1], [136, 88.9], [150, 97.1], [118, 103.6], [138, 106.9], [160, 88.9], [196, 84.0], [230, 79.1], [240, 102.0], [210, 110.2], [186, 113.5], [252, 113.5], [262, 106.9], [230, 54.5], [210, 59.5], [252, 51.3], [268, 57.8], [174, 57.8], [198, 54.5], [104, 90.5], [146, 70.9], [230, 113.5], [266, 39.8], [300, 39.8], [322, 43.1], [158, 115.1], [104, 111.8], [244, 74.2], [278, 113.5], [300, 111.8]];
    FARMS.forEach(function (q, j) {
      if (!inland(q[0], q[1], 2.5) || !clearOf(q[0], q[1] - 2, 9) || inTown(q[0], q[1]) || inPark(q[0], q[1]) || inAirport(q[0], q[1])) return;
      var gran = ['#c8b49c', '#b8a48e', '#d4c4b0', '#f0ece0'][j % 4], roof = j % 3 ? '#5e6474' : '#9a5e48';
      add(q[1], function () { house(g, q[0], q[1], 5 + (j % 3), 3.2 + (j % 2) * 0.6, gran, roof, sn, { chim: j % 2 ? 1 : -1 }); });
      // (a tree or two by each)
      add(q[1] + 1.5, function () { if (inland(q[0] + 5, q[1] + 1.5, 1)) tree(g, q[0] + 5, q[1] + 1.5, 0.9, rnd, sn, j % 2 ? EVER : OAK); });
    });
    // woods in the valleys running down to the south coast and round the island
    for (i = 0; i < 170; i++) {
      x = 64 + rnd() * 290; y = 30 + rnd() * 96;
      var vv = noise(x / 14, y / 8);
      if (vv < 0.52 || !inland(x, y, 2.2) || inTown(x, y) || inPark(x, y) || inAirport(x, y) || inCommon(x, y, 1) || !clearOf(x, y - 2, 8)) continue;
      (function (x, y, kind, s) { add(y, function () { if (kind < 0.18) bare(g, x, y, s, sn); else if (kind < 0.32) pine(g, x, y, s * 0.9, sn); else tree(g, x, y, s, rnd, sn, kind < 0.66 ? EVER : OAK); }); })(x, y, rnd(), 0.8 + rnd() * 0.35);
    }

    // ---- Herm: its harbour, the White House and the cottages; the Manor
    // village on the hill; trees; the Common's dunes in the north
    var hh = hp(-0.47, -0.4);
    add(hh[1] - 1, function () { house(g, hh[0] + 4, hh[1] - 1, 6, 3.4, '#fbfaf4', '#4e5a6e', sn, { chim: 1 }); });
    add(hh[1] + 2.5, function () { house(g, hh[0] + 4.5, hh[1] + 3, 3.6, 2.4, '#f0e8d8', '#7a5a4a', sn, { chim: -1 }); });
    add(hh[1] - 5, function () { house(g, hh[0] + 3, hh[1] - 5, 3.4, 2.2, '#ece4d4', '#5e6474', sn, { chim: 1 }); });
    var hm = hp(0.05, -0.55);
    add(hm[1], function () { house(g, hm[0], hm[1], 5, 2.8, '#d0c0aa', '#5e6474', sn, { chim: 1 }); house(g, hm[0] + 5, hm[1] + 1.5, 3.4, 2.4, '#c8b49c', '#8a5a4a', sn, { chim: -1 }); });
    [[-0.25, -0.1], [0.2, -0.2], [0.3, -0.8], [-0.2, -0.9], [0.1, 0.2], [-0.3, 0.5]].forEach(function (q, j) { var t = hp(q[0], q[1]); if (inland(t[0], t[1], 1)) add(t[1], function () { tree(g, t[0], t[1], 0.85, rnd, sn, j % 2 ? EVER : OAK); }); });
    [[0, 1.0], [0.15, 0.75], [-0.12, 0.85]].forEach(function (q) { var t = hp(q[0], q[1]); add(t[1], function () { oval(g, t[0], t[1], 2.4, 0.9, sn ? '#e8eef8' : '#d8d098'); R(g, t[0] - 1.2, t[1] - 0.6, 2.4, HP, sn ? '#ffffff' : '#ece4b0'); }); });
    // Jethou: wooded all over, one house
    add(JETHOU[1] - 1, function () { canopy(g, JETHOU[0] - 1, JETHOU[1] - 3, 4.2, 2, rnd, EVER, sn); house(g, JETHOU[0] + 2, JETHOU[1] - 0.5, 3, 2, '#f0ece0', '#5e6474', sn, { chim: 1 }); });

    // ---- Sark: whitewashed cottages, the old windmill, the Seigneurie and
    // its walled garden, La Coupée's road and its railings, the old silver
    // mines' chimneys on Little Sark; Brecqhou's trees
    var wm = sp(-0.4, 0.2);
    add(wm[1], function () {
      shadow(g, wm[0] + 0.8, wm[1] + 0.2, 2);
      R(g, wm[0] - 1.4, wm[1] - 5.5, 2.8, 5.5, '#c0b4a6'); R(g, wm[0] - 1.4, wm[1] - 5.5, HP * 2, 5.5, '#e0d4c6'); R(g, wm[0] + 1.4 - HP * 2, wm[1] - 5.5, HP * 2, 5.5, '#8a7e72');
      for (k = 0; k < 1.6; k += HP) R(g, wm[0] - 1.5 + k * 0.7, wm[1] - 5.5 - k, 3 - k * 1.4, HP, sn ? '#f2f6ff' : '#6a5e58');
      R(g, wm[0] - 0.3, wm[1] - 3.4, 0.6, 0.9, '#3c3a50'); WIN.push([wm[0] - 0.3, wm[1] - 3.4, 0.6, 0.9]);
    });
    var sg = sp(0.1, 0.95);
    add(sg[1], function () {
      R(g, sg[0] - 7, sg[1] + 0.5, 6, HP, '#a89888'); R(g, sg[0] - 7, sg[1] - 3, HP, 3.5, '#a89888');
      for (k = 0; k < 6; k++) R(g, sg[0] - 6.4 + hsh(k, 3) * 5, sg[1] - 2.4 + hsh(3, k) * 2.4, HP, HP, sn ? '#ffffff' : ['#ff6a7a', '#ffd84a', '#ffffff'][k % 3]);
      house(g, sg[0] + 1.5, sg[1], 6, 3.4, '#c8b8a4', '#5e6474', sn, { chim: 1 });
      R(g, sg[0] + 3.2, sg[1] - 7.2, 2, 4, '#c8b8a4'); for (k = 0; k < 1.4; k += HP) R(g, sg[0] + 3 + k * 0.5, sg[1] - 7.2 - k, 2.4 - k, HP, sn ? '#f2f6ff' : '#5e6474');
    });
    [[0.5, 0.4], [-0.6, -0.3], [0.7, -0.5], [-0.2, -0.75], [0.35, 1.25], [0.15, -2.3], [-0.65, 0.9], [0.85, 0.1]].forEach(function (q, j) {
      var c = sp(q[0], q[1]); if (!inland(c[0], c[1], 1.5)) return;
      add(c[1], function () { house(g, c[0], c[1], 3.4 + (j % 2), 2.2, '#f6f2ea', j % 3 ? '#5e6474' : '#8a5a4a', sn, { chim: j % 2 ? 1 : -1 }); });
    });
    [[0.75, 0.7], [-0.75, 0.3], [0.5, -0.9], [-0.4, -1.0], [0.9, -0.3], [-0.2, 1.3]].forEach(function (q, j) { var t = sp(q[0], q[1]); if (inland(t[0], t[1], 1.2)) add(t[1], function () { tree(g, t[0], t[1], 0.8, rnd, sn, j % 2 ? EVER : OAK); }); });
    var mn = sp(-0.3, -2.55);
    add(mn[1], function () { [[0, 0], [2.5, 1.2]].forEach(function (c) { R(g, mn[0] + c[0] - 0.6, mn[1] + c[1] - 3.4, 1.2, 3.4, '#9a8a7e'); R(g, mn[0] + c[0] - 0.6, mn[1] + c[1] - 3.4, HP, 3.4, '#c0b0a2'); }); });
    // La Coupée: the narrow road along the ridge, white railings either side
    var lc0 = sp(0.02, -1.38), lc1 = sp(0.02, -1.9);
    add(lc1[1], function () {
      for (k = 0; k <= 1; k += 0.05) { var lx = lc0[0] + (lc1[0] - lc0[0]) * k, ly = lc0[1] + (lc1[1] - lc0[1]) * k; R(g, lx - 0.5, ly, 1, HP * 2, sn ? '#e8eef8' : '#cfc6b8'); R(g, lx - 1.1, ly, HP, HP * 2, '#ffffff'); R(g, lx + 0.85, ly, HP, HP * 2, '#ffffff'); }
    });
    add(BRECQHOU[1], function () { canopy(g, BRECQHOU[0] + 1, BRECQHOU[1] - 1.4, 3.2, 1.2, rnd, EVER, sn); });

    // ---- once it's all done, Christmas morning: the big tree in the Town,
    // by the market (its lights twinkle: drawn each frame)
    if (S.done) add(TREE.y, function () { bigTree(g, TREE.x, TREE.y, true); });
    else if (S.lights) add(TREE.y, function () { bigTree(g, TREE.x, TREE.y, false); });

    F.sort(function (a, b) { return a[0] - b[0]; });
    F.forEach(function (f) { f[1](); });
  };
  // a low round hill under something
  var ellipseHill = function (g, x, y, rx, ry) { oval(g, x + 0.6, y + 0.4, rx, ry, 'rgba(30,40,40,0.18)'); };
  // the Town's Christmas tree: big for Christmas morning, smaller with its lights the night before
  var TREE = { x: 293.5, y: 100 };
  // Victoria Tower, up the hill by Candie
  var VT = { x: 252, y: 75 };
  var bigTree = function (g, x, base, big) {
    var s = big ? 1.2 : 0.9, k, t;
    shadow(g, x + 1, base + 0.3, 4 * s);
    R(g, x - 0.6, base - 2 * s, 1.2, 2 * s, '#6a4a32');
    for (t = 0; t < 4; t++) {
      var by = base - 1.5 * s - t * 2.6 * s, w = (5 - t * 1.05) * s;
      for (k = 0; k < 3.4 * s; k += HP) { var hw = w * (1 - k / (3.4 * s)); R(g, x - hw, by - k, hw, HP, '#2e7a44'); R(g, x, by - k, hw, HP, '#1e5a34'); }
      R(g, x - w, by - HP, w * 2, HP, '#f2f6ff');
    }
    TREE.x = x; TREE.y = base; TREE.s = s;
  };

  /* ---- the light: the whole surface coloured by the time of day, then what shines ---- */
  var light = function (g, S) {
    var L = LIGHT[S.stage], cv = g.canvas, img = g.getImageData(0, 0, cv.width, cv.height), d = img.data, x, y, o;
    var gc = L.glow ? L.glow.split(',').map(Number) : null, cols = [];
    // (the low sun's warmth is strongest at its own end of the map)
    for (x = 0; x < cv.width; x++) { var u = x / cv.width, f = L.sun > 0 ? Math.pow(u, 1.6) : L.sun < 0 ? Math.pow(1 - u, 1.6) : 0; cols.push(f * (L.ga || 0)); }
    for (y = 0; y < cv.height; y++) for (x = 0; x < cv.width; x++) {
      o = (y * cv.width + x) * 4;
      var r = d[o] * L.m[0] + L.a[0], gg = d[o + 1] * L.m[1] + L.a[1], b = d[o + 2] * L.m[2] + L.a[2], f2 = cols[x];
      if (gc && f2) { r += (gc[0] - r) * f2 * 0.6; gg += (gc[1] - gg) * f2 * 0.6; b += (gc[2] - b) * f2 * 0.6; }
      d[o] = r; d[o + 1] = gg; d[o + 2] = b;
    }
    g.putImageData(img, 0, 0);
  };
  var shine = function (g, S) {
    var i, x, y, k, rnd = BB.rng(31), night = S.stage >= 7 && S.stage <= 10, dusk = S.stage === 6;
    // the sun: just up over the sea off Sark in the morning; going down past the Hanois at sunset
    if (S.stage <= 1 || S.stage === 11) { glow(g, 600, 18, 70, S.stage === 0 ? '255,170,140' : '255,230,170', S.stage === 0 ? 0.5 : 0.35); disc(g, 600, 18, 6, S.stage === 0 ? '#ffd8a0' : '#fff2c8'); disc(g, 599, 17, 4.5, '#fffbe8'); }
    if (S.stage === 5 || dusk) {
      var sy = dusk ? 64 : 52;
      glow(g, 10, sy, 90, '255,150,80', dusk ? 0.55 : 0.35);
      disc(g, 10, sy, 7, dusk ? '#ff9a50' : '#ffc870'); disc(g, 9, sy - 1, 5, dusk ? '#ffc070' : '#ffe8a8');
      // its path of light across the water
      for (i = 0; i < 40; i++) { x = 18 + rnd() * 140; y = sy + (rnd() - 0.5) * (4 + (x - 18) * 0.06); if (atSea(x, y)) R(g, x, y, 1 + rnd() * 2.5, HP, dusk ? 'rgba(255,190,120,0.6)' : 'rgba(255,230,170,0.5)'); }
    }
    // the stars, over the sea (thickest over Sark, which keeps its sky dark)
    STARS.length = 0;
    if (S.stage >= 7 && S.stage <= 10) {
      var ns = S.stage === 7 ? 50 : 190;
      for (i = 0; i < ns; i++) {
        x = rnd() * MW; y = rnd() * H;
        if (x > 470 && rnd() < 0.4) { x = 470 + rnd() * 150; }
        if (!atSea(x, y)) continue;
        var big = rnd() < 0.12, a = 0.45 + rnd() * 0.5;
        R(g, x, y, big ? 1 : HP, big ? 1 : HP, 'rgba(255,248,220,' + a + ')');
        if (big || rnd() < 0.2) STARS.push([x, y, big]);
      }
    }
    // the moon, over the sea north of Sark, and its light on the water
    if (S.stage >= 8 && S.stage <= 10) {
      var MO = { x: 512, y: 22 };
      glow(g, MO.x, MO.y, 46, '255,244,210', 0.3);
      disc(g, MO.x, MO.y, 8, '#fff6dc'); disc(g, MO.x + 2.4, MO.y + 2.6, 2, '#efe2bc'); disc(g, MO.x - 3, MO.y - 1, 1.4, '#efe2bc'); disc(g, MO.x + 1, MO.y - 4, 1, '#efe2bc'); disc(g, MO.x - 3, MO.y - 3.4, 1.2, '#ffffff');
    }
    // the windows: at dusk, most; at night, all of them
    if (S.stage >= 6 && S.stage <= 10) WIN.forEach(function (w, j) {
      if (S.stage === 6 && hsh(j, 2) > 0.3) return;
      var c = hsh(j, 5) < 0.2 ? '#ffe8a0' : hsh(j, 5) < 0.6 ? '#ffd264' : '#ffbe4a';
      R(g, w[0], w[1], w[2], w[3], c);
      if (S.stage >= 7) glow(g, w[0] + w[2] / 2, w[1] + w[3] / 2, 3.2, '255,200,100', 0.25);
    });
    // the lamps and the lights
    if (S.stage >= 6 && S.stage <= 10) LAMPS.forEach(function (l) { glow(g, l[0], l[1], l[3] * (night ? 1.1 : 0.8), l[2], night ? 0.38 : 0.26); R(g, l[0] - 0.4, l[1] - 0.4, 0.8, 0.8, '#fffbe8'); });
    // the Town's Christmas lights: strings of coloured bulbs along the quay,
    // across the streets, and round the harbour
    BULBS.length = 0;
    if (S.lights) {
      var strings = [[[311, 83], [311, 100]], [[262, 68], [286, 66], [306, 70]], [[256, 84], [280, 88], [304, 86]], [[258, 98], [280, 100], [304, 95]], [[262, 112], [292, 114]], [[313, 82], [334, 81]], [[312, 99], [332, 100.5]]];
      var BC = ['#ff4a5a', '#ffd84a', '#5ae07a', '#5ab8ff', '#ffffff', '#ff8ad0'];
      strings.forEach(function (s, si) {
        for (var j = 0; j < s.length - 1; j++) {
          var a = s[j], b = s[j + 1], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.6);
          for (k = 0; k <= n; k++) {
            var u = k / n, bx = a[0] + (b[0] - a[0]) * u, by = a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * (Math.abs(b[0] - a[0]) > 6 ? 1.4 : 0) - (si < 1 ? 3 : 0);
            var c = BC[(k + si * 2) % BC.length];
            if (k % 2 === 0) glow(g, bx, by, 1.6, BB.toRgb(c).join(','), 0.16);
            R(g, bx - 0.25, by - 0.25, HP, HP, c);
            BULBS.push([bx, by, c]);
          }
        }
      });
    }
  };

  /* ---- the painted island, cached per time of day ------------------------------------- */
  var surf = null, surfKey = '';
  var paint = function (S) {
    var c = BB.surface(MW, H), g = c.getContext('2d');
    terrain(g, S.snow);
    features(g, S);
    light(g, S);
    shine(g, S);
    return c;
  };

  /* ---- what moves: its colours in the time of day's light -----------------------------
     What's drawn each frame is drawn in daylight colours put through the
     same light as the painted island (k < 1 for what stands near a lamp,
     as the sleigh does on the quay at night). */
  var LC = {}, lcStage = -1;
  var hex2 = function (n) { n = Math.max(0, Math.min(255, Math.round(n))); return (n < 16 ? '0' : '') + n.toString(16); };
  var lc = function (hex, k) {
    var kk = k === undefined ? 1 : k, key = hex + kk, v = LC[key];
    if (v) return v;
    var L = LIGHT[lcStage < 0 ? 2 : lcStage], c = rgb(hex), o = '#';
    for (var j = 0; j < 3; j++) o += hex2(c[j] + (c[j] * L.m[j] + L.a[j] - c[j]) * kk);
    return (LC[key] = o);
  };
  // a little figure facing either way: P(dx, dy, w, h, colour) in its own frame, as if facing right
  // (sc draws it bigger: the sleigh he rides in is drawn at his own size)
  var mirror = function (g, x, y, dir, sc) { sc = sc || 1; return function (dx, dy, w, h, c) { R(g, dir > 0 ? x + dx * sc : x - (dx + w) * sc, y + dy * sc, w * sc, h * sc, c); }; };

  /* ---- the characters --------------------------------------------------------------- */
  // a reindeer, its feet at x, y: standing (0), grazing (1), galloping (2), dancing (3)
  var DEER = { b: '#9a6a3c', l: '#c8925a', d: '#6a4424', belly: '#f2dcb4', ant: '#ecdab0', nose: '#3a2418' };
  var deer = function (g, x, y, dir, t, k, pose, kl, sc) {
    var P = mirror(g, x, y, dir, sc), C = function (h) { return lc(h, kl); };
    var run = pose === 2, ph = run ? Math.floor(t / 4 + k) % 2 : 0, up = pose === 3 ? -Math.abs(Math.sin(t * 0.12 + k)) * 1.6 : run ? -ph * 0.4 : 0;
    var graze = pose === 1 && Math.floor((t + k * 53) / 70) % 3 !== 2, flick = Math.floor((t + k * 31) / 40) % 9 === 0;
    var b = C(DEER.b), l = C(DEER.l), d = C(DEER.d), sw = run ? (ph ? 0.5 : -0.5) : pose === 3 ? Math.sin(t * 0.24 + k) * 0.5 : 0;
    P(-1.5 + sw, -1.4 + up, HP, 1.4, d); P(0.9 - sw, -1.4 + up, HP, 1.4, d);
    P(-1.0 - sw, -1.3 + up, HP, 1.3, b); P(1.4 + sw, -1.3 + up, HP, 1.3, b);
    P(-1.8, -2.8 + up, 3.6, 1.5, b); P(-1.6, -2.8 + up, 3.0, HP, l); P(-1.1, -1.5 + up, 2.2, HP, C(DEER.belly)); P(-2.3, -2.9 + up, 0.6, 0.6, C('#fbf4e4'));
    var hy = graze ? 1.5 : 0, hx = graze ? 0.5 : 0;
    P(1.2, -3.8 + up + hy * 0.5, 0.8, 1.4, b);
    P(1.5 + hx, -4.4 + up + hy, 1.4, 1, b); P(1.5 + hx, -4.4 + up + hy, 1.4, HP, l); P(2.8 + hx, -4.0 + up + hy, 0.5, 0.5, C(DEER.nose)); P(2.0 + hx, -4.2 + up + hy, HP, HP, '#1c1428');
    P(1.0 + hx, -4.7 + up + hy - (flick ? 0.3 : 0), 0.6, 0.4, d);
    var an = C(DEER.ant);
    P(1.5 + hx, -5.8 + up + hy, HP, 1.4, an); P(2.2 + hx, -5.5 + up + hy, HP, 1.1, an); P(1.0 + hx, -5.6 + up + hy, 0.5, HP, an); P(2.2 + hx, -5.9 + up + hy, 0.6, HP, an); P(1.4 + hx, -6.2 + up + hy, HP, HP, an);
  };
  // Father Christmas, sitting at x, y: red coat, white beard; his hat (once
  // it's been found), and his near arm waving
  var santa = function (g, x, y, dir, t, hat, wave, kl, sc) {
    sc = sc || 1;
    var P = mirror(g, x, y, dir, sc), C = function (h) { return lc(h, kl); };
    var red = C('#d8283a'), redL = C('#ff6262'), redD = C('#9a1426'), fur = C('#fbf8f0'), skin = C('#ffd4b6'), wv = wave ? Math.floor(t / 9) % 2 : 0;
    P(-1.3, -2.8, 2.6, 2.8, red); P(-1.3, -2.8, HP, 2.8, redL); P(1.0, -2.8, HP, 2.8, redD); P(-0.2, -2.6, HP, 2.6, fur);
    P(-1.3, -1.3, 2.6, HP, C('#2a2030')); P(-0.35, -1.4, 0.7, 0.4, C('#f0c040'));
    P(-0.9, -4.5, 1.8, 1.7, skin); P(-1.0, -3.5, 2.0, 1.4, fur); P(-0.7, -2.4, 1.4, 0.5, fur); P(0.1, -3.6, 0.9, HP, fur);
    P(0.5, -4.1, HP, HP, '#1c1428'); P(0.8, -3.8, HP, HP, C('#ff9a9a'));
    if (hat) { P(-1.1, -4.9, 2.2, 0.6, fur); P(-0.9, -5.9, 1.8, 1.0, red); P(-1.6, -6.0, 0.8, 0.7, red); disc(g, x - dir * 1.9 * sc, y - 5.6 * sc, 0.45 * sc, fur); }
    else { P(-1.1, -4.5, 0.5, 0.9, fur); P(0.7, -4.5, 0.4, 0.7, fur); P(-0.6, -4.8, 1.3, 0.4, skin); P(-0.3, -4.85, 0.6, HP, C('#fff0e4')); }
    if (wv) { P(1.1, -5.2, 0.6, 2.4, red); P(1.0, -5.8, 0.8, 0.7, C('#2a5a3a')); }
    else { P(1.1, -3.4, 0.6, 1.8, red); P(1.4, -4.1, 0.8, 0.7, C('#2a5a3a')); }
  };
  // the sleigh: red, gold runners curling up at the front, a sack of presents in the back
  var sleighBody = function (g, x, y, dir, kl, bell, sack, sc, part) {
    sc = sc || 1;
    var P = mirror(g, x, y, dir, sc), C = function (h) { return lc(h, kl); };
    var gold = C('#e8b830'), red = C('#d8283a'), redL = C('#ff6a6a'), redD = C('#9a1426');
    if (part !== 'front') {
      if (sack) { P(-3.6, -6.6, 2.4, 2.2, C('#8a5a3a')); P(-3.6, -6.6, 2.4, HP, C('#b07a50')); P(-3.2, -7.6, 1.2, 1.1, C('#4ac85a')); P(-2.2, -7.2, 1.2, 0.9, C('#ff5a8a')); P(-2.8, -7.6, HP, 1.1, C('#ffd84a')); }
      P(-3.7, -5.2, 1.4, 2.0, red); P(-3.7, -5.2, 1.4, HP, redL);
      if (part === 'back') return;
    }
    P(-3.4, -0.6, 7, HP, gold); P(3.4, -1.7, HP, 1.3, gold); P(2.9, -1.9, 0.7, HP, gold); P(-2.6, -1.2, HP, 0.6, gold); P(2.0, -1.2, HP, 0.6, gold);
    P(-3.2, -3.6, 5.8, 2.4, red); P(-3.2, -3.6, 5.8, HP, redL); P(-3.2, -1.4, 5.8, HP, redD); P(-3.2, -2.7, 5.8, HP, gold);
    P(2.3, -4.4, 1.1, 1.2, red); P(2.5, -4.6, 0.9, HP, gold);
    if (bell) { disc(g, x + dir * 3.3 * sc, y - 2.6 * sc, 0.75 * sc, C('#ffd23a')); R(g, x + dir * 3.3 * sc - 0.25 * sc, y - 3.1 * sc, HP * sc, HP * sc, C('#fff6c0')); }
  };
  // a team of n reindeer, harnessed in pairs ahead of a sleigh at x
  var team = function (g, x, y, dir, n, t, pose, kl, fcx, fcy, sc) {
    var k, pts = [];
    sc = sc || 1;
    for (k = 0; k < n; k++) { var pr = Math.floor(k / 2), far = k % 2 === 0; pts.push([x + dir * (6.2 + pr * 3.8) * sc - (far ? dir * 0.5 * sc : 0), y - (far ? 1.2 * sc : 0) - (pose === 2 ? pr * 0.9 * sc : 0), far, k]); }
    // the reins, from his mittens to each pair's collar (or lying slack on the quay)
    var rc = lc('#c8a040', kl);
    if (!n) { for (k = 0; k < 7; k += HP) R(g, x + dir * (3.6 + k), y - 0.3 - Math.abs(Math.sin(k * 0.9)) * 0.3, HP, HP, rc); }
    pts.forEach(function (p) { if (p[2]) deer(g, p[0], p[1], dir, t, p[3], pose, kl, sc); });
    for (k = 0; k < n; k += 2) { var p = pts[k + 1] || pts[k]; line(g, fcx, fcy, p[0] + dir * 1.4 * sc, p[1] - 3.2 * sc, rc, sc > 1 ? 0.5 : HP); }
    pts.forEach(function (p) { if (!p[2]) deer(g, p[0], p[1], dir, t, p[3], pose, kl, sc); });
    pts.forEach(function (p) { var C2 = mirror(g, p[0], p[1], dir, sc); C2(1.1, -3.4, 0.6, 0.5, lc('#d8283a', kl)); C2(1.3, -2.9, 0.4, 0.4, lc('#ffd23a', kl)); });
  };
  /* Grabby Gus: the greediest gull in Guernsey. Big, white, grey-winged,
     a yellow beak with its red spot, googly eyes and a cheeky eyebrow.
     Flying, with the golden bell dangling from his beak on its ribbon;
     sitting, very pleased with himself (and, on Christmas morning, in a
     paper crown with a bag of chips). */
  var gus = function (g, x, y, dir, t, o, kl) {
    var P = mirror(g, x, y, dir), C = function (h) { return lc(h, kl); };
    var Wt = C('#ffffff'), G1 = C('#c0c8d4'), G2 = C('#8e96a8'), BK = C('#2a2a38'), Y = C('#ffc828'), OR = C('#ff9a2a');
    if (o.fly) {
      var fl = o.glide ? 1 : Math.floor(t / 6) % 4, wy = [-4.5, -1.8, 1.8, -1.8][fl], wx = [-1.2, -4, -2.4, -4][fl];
      // the far wing, then the body, then the near wing
      line(g, x - dir * 0.2, y - 1.4, x + dir * (wx + 1.2), y + wy - 1, G2, 1);
      oval(g, x, y, 3.2, 1.5, Wt); P(-3, -1.5, 5.2, HP, G1);
      P(-4.4, -0.8, 1.6, 1.1, Wt); P(-4.8, -0.7, 0.6, 0.9, BK);
      P(-0.8, 1.2, 0.7, 0.4, OR); P(0.2, 1.2, 0.7, 0.4, OR);
      line(g, x + dir * 0.6, y - 1.0, x + dir * wx, y + wy, G1, 1.3); line(g, x + dir * wx, y + wy, x + dir * (wx - 1.1), y + wy + (wy < 0 ? -0.5 : 0.5), BK, 1.1);
    } else {
      // sitting: a round white body, the wing folded down his side, orange feet
      oval(g, x, y - 2, 2.6, 2.0, Wt); P(-2.2, -3.2, 3.2, 1.8, G1); P(-2.6, -2.2, 1.6, 0.8, BK); P(-1.6, -3.0, HP, HP, Wt); P(-0.6, -3.0, HP, HP, Wt);
      P(-1.2, -0.3, 0.6, 0.6, OR); P(0.6, -0.3, 0.6, 0.6, OR);
    }
    var hx = o.fly ? 2.8 : 1.9, hy = o.fly ? -1.3 : -4.6;
    disc(g, x + dir * hx, y + hy, 1.55, Wt);
    if (o.happy) { P(hx + 0.1, hy - 0.5, 0.4, HP, BK); P(hx + 0.5, hy - 0.8, 0.4, HP, BK); P(hx + 0.9, hy - 0.5, 0.4, HP, BK); }
    else { disc(g, x + dir * (hx + 0.5), y + hy - 0.3, 0.62, BK); R(g, x + dir * (hx + 0.35) - 0.12, y + hy - 0.65, HP, HP, Wt); P(hx - 0.2, hy - 1.3, 1.4, HP, G2); }
    P(hx + 1.1, hy + 0.0, 1.7, 0.6, Y); P(hx + 2.6, hy + 0.2, 0.5, 0.5, Y); P(hx + 2.0, hy + 0.35, 0.4, 0.3, C('#e83a3a'));
    if (o.crown) { P(hx - 1.1, hy - 2.2, 2.2, 0.7, C('#ffd84a')); P(hx - 1.1, hy - 2.7, 0.5, 0.5, C('#ffd84a')); P(hx - 0.25, hy - 2.7, 0.5, 0.5, C('#ffd84a')); P(hx + 0.6, hy - 2.7, 0.5, 0.5, C('#ffd84a')); }
    if (o.chips) { P(3.2, -2.2, 1.6, 2.2, C('#fbf6ec')); P(3.2, -2.2, 1.6, HP, C('#d83a3a')); P(3.3, -2.9, HP, 0.8, Y); P(3.9, -3.1, HP, 1, Y); P(4.4, -2.8, HP, 0.7, Y); }
    if (o.bell) {
      var bx = x + dir * (hx + 2.4), by = y + hy + 0.6, sw2 = Math.sin(t * 0.2) * 0.4;
      line(g, bx, by, bx + sw2, by + 1.8, C('#d8283a'));
      disc(g, bx + sw2, by + 2.6, 0.95, C('#ffd23a')); R(g, bx + sw2 - 0.4, by + 2.1, HP, HP, C('#fff6c8')); R(g, bx + sw2 - 0.15, by + 3.4, 0.4, 0.3, C('#a87818'));
    }
  };
  // a cow (a Guernsey: golden, with white patches), grazing, looking up, swishing her tail; at night, lying down asleep
  var cow = function (g, x, y, dir, t, k, asleep) {
    var P = mirror(g, x, y, dir, 1.25);
    var gold = lc('#d89a50'), goldL = lc('#f0b868'), wht = lc('#fbf6ec'), dk = lc('#8a5a30'), pink = lc('#f4c8b0');
    shadow(g, x + 0.5, y + 0.1, 2.8);
    if (asleep) { P(-1.9, -1.4, 3.8, 1.4, gold); P(-1.9, -1.4, 3.8, HP, goldL); P(-0.6, -1.3, 1.2, 0.8, wht); P(1.6, -1.9, 1.2, 1.1, gold); P(2.5, -1.5, 0.6, 0.6, pink); P(1.9, -1.6, 0.6, HP, '#1c1428'); return; }
    var graze = Math.floor((t + k * 71) / 90) % 3 !== 0, sw = Math.sin(t * 0.07 + k * 2) > 0.5 ? 0.4 : 0;
    P(-1.4, -1.1, HP, 1.1, dk); P(0.9, -1.1, HP, 1.1, dk); P(-0.9, -1.0, HP, 1.0, gold); P(1.4, -1.0, HP, 1.0, gold);
    P(-1.9, -2.7, 3.8, 1.7, gold); P(-1.9, -2.7, 3.8, HP, goldL); P(-0.9, -2.5, 1.3, 1.1, wht); P(0.9, -1.6, 0.8, 0.5, wht); P(-0.2, -1.1, 0.8, 0.4, pink);
    P(-2.3, -2.6 + sw, HP, 1.5, dk); P(-2.5, -1.3 + sw, 0.6, 0.5, dk);
    var hy = graze ? 1.4 : 0;
    P(1.8, -3.2 + hy, 1.3, 1.2, gold); P(2.2, -3.2 + hy, 0.5, 1.2, wht); P(2.7, -2.4 + hy, 0.7, 0.6, pink); P(2.0, -3.5 + hy, HP, 0.4, lc('#f2ead4')); P(2.6, -3.5 + hy, HP, 0.4, lc('#f2ead4'));
    if (!graze) P(2.3, -2.9, 0.4, 0.4, '#1c1428');
  };
  // boats: the ferries, a fishing boat, a yacht; at night their lights on
  var boat = function (g, x, y, dir, kind, t, night, moving) {
    var P = mirror(g, x, y, dir), C = lc;
    if (moving) for (var k = 0; k < 3; k++) R(g, x - dir * (kind === 'sark' ? 7 : 5) - dir * k * 2.4 - (dir > 0 ? 1.6 : 0), y + 0.4 + (k % 2) * 0.4, 1.6 - k * 0.3, HP, 'rgba(255,255,255,0.65)');
    if (kind === 'ferry' || kind === 'sark') {
      var big = kind === 'sark', hc = big ? '#c83a3a' : '#2a5ab8';
      P(-4.2 - big, -1.2, 8.6 + big * 2, 1.5, C('#f6f6f2')); P(-4 - big, 0.2, 8.2 + big * 2, 0.6, C(hc)); P(-4.2 - big, -1.2, 8.6 + big * 2, HP, C('#ffffff'));
      P(-2.6 - big, -2.8, 4.8 + big, 1.7, C('#ffffff')); P(-2.2 - big, -2.3, 3.8 + big, 0.5, night ? '#ffd870' : C('#3a4a6a'));
      P(0.6, -4, 0.6, 1.3, C(hc)); P(0.6, -4, 0.6, 0.4, C('#2a2a38'));
      if (night) { glow(g, x, y - 2, 6, '255,210,120', 0.3); R(g, x + dir * 3.8 - 0.25, y - 1.6, HP, HP, dir > 0 ? '#5aff7a' : '#ff5a5a'); }
    } else if (kind === 'fish') {
      P(-2.6, -0.9, 5.2, 1.3, C('#3a6ac8')); P(-2.6, -0.9, 5.2, HP, C('#f4f0e8')); P(-1.0, -2.3, 1.6, 1.4, C('#f0f0e8')); P(-0.6, -1.9, 0.8, 0.5, night ? '#ffd870' : C('#3a4a6a'));
      P(1.6, -3.6, HP, 2.8, C('#6a4a3a')); P(1.6, -3.4, 1.2, HP, C('#6a4a3a'));
      if (night) R(g, x + dir * 1.6, y - 3.8, HP, HP, '#fff6c8');
    } else {
      P(-2.2, -0.7, 4.4, 1, C('#ffffff')); P(-2.2, 0, 4.4, HP, C('#2a3a5a'));
      P(0, -6, HP, 5.4, C('#c8c4bc'));
      for (var s = 0; s < 5; s += HP) { P(-0.2 - s * 0.5, -6 + s, s * 0.5, HP, C('#fffaf0')); P(0.5, -5.2 + s * 0.85, (5 - s) * 0.3, HP, C('#ffe0e0')); }
      if (night) R(g, x - 0.25, y - 6.3, HP, HP, '#fff6c8');
    }
  };

  /* ---- the levels' lost things, at their places until they're found ------------------- */
  var LOST = {
    1: { x: 311, y: 96.5 },                         // Dasher, dizzy round a lamp post on the quay
    2: { x: 265, y: 85 },                           // Prancer, skating wobbly circles on Candie's frozen pond
    3: { x: CASTLE.x, y: CASTLE.y - 9.4 },          // Dancer, dancing on the Castle's battlements
    4: { x: NODES[3][0] - 11.5, y: NODES[3][1] + 10 }, // Vixen, among the cows
    6: { x: 140, y: 72.5 },                         // Cupid, buried to his antlers in a sandcastle on Vazon beach
    7: { x: NODES[6][0] - 12, y: NODES[6][1] - 4.8 }, // Donner, stuck on top of Fort Grey
    8: { x: NODES[7][0] + 10, y: NODES[7][1] + 3 },  // Comet, tangled in fairy lights
    9: { x: HERM.x + 1, y: HERM.y - 16 }             // Blitzen, in a deckchair on the beach below the Common, in sunglasses
  };
  var lost = function (g, st, t, h) {
    var n, L, k;
    for (n in LOST) {
      n = +n; L = LOST[n];
      if (hasDone(st, n) || L.x < cam0 - 10 || L.x > cam1 + 10) continue;
      var night = h >= 7;
      if (n === 1) {
        var a = t * 0.07, x = L.x + Math.cos(a) * 2.4, y = L.y + Math.sin(a) * 0.9;
        R(g, L.x - 0.3, L.y - 5, 0.6, 5, lc('#3a3a48')); disc(g, L.x, L.y - 5.3, 0.6, night ? '#fff2b0' : lc('#f0e8c0'));
        deer(g, x, y, -Math.sin(a) > 0 ? 1 : -1, t, 1, 0);
        for (k = 0; k < 3; k++) { var sa = a * 1.8 + k * 2.1; R(g, x + Math.cos(sa) * 1.8, y - 7 + Math.sin(sa) * 0.6, HP, HP, lc('#ffe04a')); }
        R(g, x - 1.5, y - 2.5, 3, HP, lc('#c8d8e8'));
      } else if (n === 2) {
        var a2 = t * 0.05, wob = Math.sin(t * 0.3) * 0.5;
        deer(g, L.x + Math.cos(a2) * 2.8, L.y + Math.sin(a2) * 0.8 + 0.4, Math.sin(a2) < 0 ? 1 : -1, t, 2, wob > 0.3 ? 3 : 0);
      } else if (n === 3) {
        deer(g, L.x, L.y, Math.floor(t / 40) % 2 ? 1 : -1, t, 3, 3);
      } else if (n === 4) {
        deer(g, L.x, L.y, -1, t, 4, 1);
      } else if (n === 6) {
        oval(g, L.x, L.y, 3, 0.9, lc('#c8a868')); R(g, L.x - 2.2, L.y - 2.6, 4.4, 2.6, lc('#e8cc8a')); R(g, L.x - 2.2, L.y - 2.6, 4.4, HP, lc('#f6e2a8'));
        R(g, L.x - 2.2, L.y - 3.4, 1, 0.8, lc('#e8cc8a')); R(g, L.x + 1.2, L.y - 3.4, 1, 0.8, lc('#e8cc8a'));
        var wg = Math.floor(t / 14) % 3 === 0 ? 0.3 : 0, an = lc(DEER.ant);
        R(g, L.x - 0.6, L.y - 4.4 - wg, HP, 1.6, an); R(g, L.x + 0.3, L.y - 4.2 - wg, HP, 1.4, an); R(g, L.x - 1.0, L.y - 4.0 - wg, 0.5, HP, an); R(g, L.x + 0.3, L.y - 4.4 - wg, 0.6, HP, an);
        R(g, L.x + 3.4, L.y - 3.6, HP, 3.6, lc('#8a5a3a')); R(g, L.x + 3.4, L.y - 3.6, 1.4, 0.8, lc('#3a8ae0'));
      } else if (n === 7) {
        deer(g, L.x, L.y, Math.floor(t / 70) % 2 ? 1 : -1, t, 7, 0);
        if (Math.floor(t / 30) % 4 === 0) { R(g, L.x + 2.4, L.y - 8, HP, 1.2, lc('#ffffff')); R(g, L.x + 2.4, L.y - 6.6, HP, HP, lc('#ffffff')); }
      } else if (n === 8) {
        deer(g, L.x, L.y, -1, t, 8, 0);
        for (k = 0; k < 9; k++) { var la = k * 0.75, on = (k + Math.floor(t / 12)) % 3 !== 0; R(g, L.x + Math.cos(la) * 2.2 - 0.25, L.y - 2.6 + Math.sin(la) * 1.4, HP, HP, on ? ['#ff4a5a', '#ffd84a', '#5ae07a', '#5ab8ff'][k % 4] : lc('#3a3a48')); }
      } else if (n === 9) {
        var dx = L.x, dy = L.y;
        R(g, dx - 2.6, dy - 1.4, 4.6, 0.8, lc('#3ab8e8')); R(g, dx - 2.6, dy - 0.6, 4.6, 0.8, lc('#ffffff')); R(g, dx + 1.6, dy - 3.6, 0.8, 3, lc('#3ab8e8')); R(g, dx - 2.4, dy - 0.6, HP, 1.4, lc('#8a5a3a')); R(g, dx + 1.6, dy - 0.6, HP, 1.4, lc('#8a5a3a'));
        var P2 = mirror(g, dx, dy - 1.2, -1);
        P2(-1.6, -1.8, 3, 1.2, lc(DEER.b)); P2(-1.6, -1.8, 3, HP, lc(DEER.l)); P2(1.0, -3.4, 1.4, 1.2, lc(DEER.b)); P2(1.1, -3.1, 1.2, 0.4, '#1c1428'); P2(2.4, -2.9, 0.5, 0.5, lc(DEER.nose));
        P2(1.2, -4.6, HP, 1.2, lc(DEER.ant)); P2(1.8, -4.4, HP, 1, lc(DEER.ant)); P2(0.8, -4.4, 0.5, HP, lc(DEER.ant));
        P2(-2.4, -1.2, 1.6, 0.6, lc(DEER.b));
      }
    }
    // Father Christmas's hat, on a duck on Saumarez Park's pond (and the ducks, paddling about)
    var pd = { x: NODES[4][0] - 9, y: NODES[4][1] + 9 };
    if (pd.x > cam0 - 10 && pd.x < cam1 + 10) for (k = 0; k < 3; k++) {
      var du = ((t * 0.003 + k * 0.33) % 1), dxx = pd.x + Math.sin(du * Math.PI * 2) * 3.6, dyy = pd.y + Math.cos(du * Math.PI * 2) * 0.9, dd = Math.cos(du * Math.PI * 2) > 0 ? 1 : -1;
      var P3 = mirror(g, dxx, dyy, dd);
      P3(-1.0, -0.8, 2, 0.8, k ? lc('#8a6a4a') : lc('#f4f4ec')); P3(0.6, -1.6, 0.8, 0.9, k ? lc('#2a7a4a') : lc('#f4f4ec')); P3(1.4, -1.2, 0.6, 0.3, lc('#ff9a2a')); P3(0.9, -1.4, HP, HP, '#1c1428');
      if (!k && !hasDone(st, 5)) { P3(0.3, -2.3, 1.4, 0.7, lc('#d8283a')); P3(0.3, -1.8, 1.4, HP, lc('#fbf8f0')); P3(-0.4, -2.4, 0.8, 0.5, lc('#d8283a')); disc(g, dxx - dd * 0.6, dyy - 2.1, 0.35, lc('#fbf8f0')); }
    }
  };

  /* ---- the frame ----------------------------------------------------------------------
     BB.Map, for game.js:
       N          11 levels
       node(i)    level i+1's medallion, { x, y } in map pixels
       width()    the map's width (it's always 144 high, and scrolls sideways)
       draw(ctx, st)  paints it, scrolled by st.camX. st: t (frames), reduce,
                  camX, at, unlocked, cleared, done, bonnie {x, y}, walking,
                  facing, set, v, power, hat, reindeer (0–8)
     Which way he faces is worked out here, from where he's walking to (st.at)
     and where he is, since the path doubles back on itself (game.js's facing
     says whether he's going up or down the levels, not left or right). On
     the leg between 10 and 11 he's in the sleigh; on the open water between
     the islands, in his boat. */
  var cam0 = 0, cam1 = 240, lastDir = 1, cloudC = null;
  // the medallions' colours, a level each
  var MCOL = ['#e8404a', '#5ab8f0', '#f0b030', '#4ab85a', '#f08a30', '#ff7a8a', '#9a6ae0', '#ffc83a', '#3ad0c8', '#4a72e0', '#d8283a'];
  var medal = function (g, i, st, t) {
    var p = NODES[i], x = p[0], y = p[1], open = i < st.unlocked, done = (st.cleared || []).indexOf(i + 1) > -1, here = i + 1 === st.at, e = i >= 9 ? 1 : 0;
    if (i === 10) {
      // the last one's up in the sky, on a little cloud, with a twinkle round it
      [[-5, 5.5, 3], [0, 6.5, 3.6], [5, 5.5, 3], [-2, 4, 2.6], [2.6, 4, 2.6]].forEach(function (c) { disc(g, x + c[0], y + c[1] + 0.6, c[2], lc('#b8c8e8')); });
      [[-5, 5.5, 3], [0, 6.5, 3.6], [5, 5.5, 3], [-2, 4, 2.6], [2.6, 4, 2.6]].forEach(function (c) { disc(g, x + c[0], y + c[1], c[2] * 0.9, lc('#ffffff')); });
      if (open) for (var k = 0; k < 4; k++) { var a = t * 0.02 + k * Math.PI / 2, sx = x + Math.cos(a) * 10, sy = y + Math.sin(a) * 5; if ((t + k * 13) % 40 < 26) { R(g, sx - 0.25, sy - 1, HP, 2, '#fff6c8'); R(g, sx - 1, sy - 0.25, 2, HP, '#fff6c8'); } }
    }
    if (here && !st.reduce) disc(g, x, y, 8 + e + Math.sin(t * 0.12) * 1.2, 'rgba(255,255,255,0.35)');
    else if (here) disc(g, x, y, 8.6 + e, 'rgba(255,255,255,0.35)');
    disc(g, x, y + 1, 6.6 + e, 'rgba(20,10,40,0.35)');
    disc(g, x, y, 6.4 + e, '#1c1428');
    disc(g, x, y, 5.8 + e, done ? '#e8a820' : open ? '#e4e8f4' : '#7a7690');
    disc(g, x, y, 4.6 + e, open ? MCOL[i] : '#4a4660');
    disc(g, x - 1.4, y - 1.6, 1.6, 'rgba(255,255,255,0.5)');
    if (open) {
      var o = { color: '#ffffff', shadow: '#1c1428' };
      // (two digits set tight so they sit inside the disc: the font's 1 has a blank column either side)
      if (i + 1 >= 10) { var ds = String(i + 1), w0 = ds[0] === '1' ? 3 : 5, w1 = ds[1] === '1' ? 3 : 5, sx2 = snap(x - (w0 + 1 + w1) / 2); BB.text(g, ds[0], sx2 - (ds[0] === '1' ? 1 : 0), y - 3, o); BB.text(g, ds[1], sx2 + w0 + 1 - (ds[1] === '1' ? 1 : 0), y - 3, o); }
      else BB.text(g, String(i + 1), x + 0.5, y - 3, { color: '#ffffff', align: 'center', shadow: '#1c1428' });
    } else { R(g, x - 2, y - 1, 4, 3.5, '#c8cce0'); R(g, x - 1.5, y - 3.5, 0.5, 2.5, '#c8cce0'); R(g, x + 1, y - 3.5, 0.5, 2.5, '#c8cce0'); R(g, x - 1.5, y - 3.5, 3, 0.5, '#c8cce0'); }
    if (done && A.starSmall) BB.draw(g, A.starSmall, x - 3.5, y - 12 - e);
  };
  // the path between the medallions: dots on the land, the boat's wake on
  // the water, and the sleigh's sparkling trail through the sky
  var path = function (g, st, t) {
    for (var i = 0; i < 10; i++) {
      var a = NODES[i], b = NODES[i + 1], open = i + 1 < st.unlocked;
      if (Math.max(a[0], b[0]) < cam0 - 8 || Math.min(a[0], b[0]) > cam1 + 8) continue;
      var n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 5.5));
      for (var k = 1; k < n; k++) {
        var q = legAt(i, k / n), x = q[0], y = q[1];
        if (x < cam0 - 4 || x > cam1 + 4 || Math.hypot(x - a[0], y - a[1]) < 6.8 || Math.hypot(x - b[0], y - b[1]) < 6.8) continue;
        if (i === 9) {
          if (open) { var tw = (k + Math.floor(t / 10)) % 4; R(g, x - 0.25, y - (tw ? 0.25 : 1), HP, tw ? HP : 2, '#fff6c8'); if (!tw) R(g, x - 1, y - 0.25, 2, HP, '#fff6c8'); }
          else if (k % 2 === 0) R(g, x - 0.25, y - 0.25, HP, HP, 'rgba(255,255,255,0.45)');
        } else if (inBoat(i, x)) {
          if (open && (k + Math.floor(t / 20)) % 3) R(g, x - 1.5, y, 3, 1, 'rgba(255,255,255,0.75)');
          else if (!open && k % 2 === 0) R(g, x - 1, y, 2, HP, 'rgba(255,255,255,0.4)');
        } else if (open) { disc(g, x + 0.2, y + 0.5, 1.4, 'rgba(30,20,60,0.45)'); disc(g, x, y, 1.3, '#6a4a3a'); disc(g, x, y, 0.95, '#ffe9a8'); R(g, x - 0.5, y - 0.5, HP, HP, '#ffffff'); }
        else if (k % 2 === 0) { disc(g, x, y, 0.8, 'rgba(60,40,80,0.35)'); disc(g, x, y, 0.5, 'rgba(255,255,255,0.5)'); }
      }
    }
  };
  /* where on each leg he's in his boat: the stretches over open water,
     with the little gaps (a pier, a breakwater) bridged and the odd few
     pixels of harbour left out, so he gets in once and out once rather than
     flickering. (Not the last leg: that's the sleigh's.) */
  var BOATS = null;
  var boatRuns = function () {
    if (BOATS) return BOATS;
    BOATS = [];
    for (var i = 0; i < 9; i++) {
      var a = NODES[i], b = NODES[i + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(len), runs = [], cur = null;
      for (var k = 0; k <= n; k++) { var u = k / n, q = legAt(i, u); if (atSea(q[0], q[1])) { if (cur && (u - cur[1]) * len < 16) cur[1] = u; else { cur = [u, u]; runs.push(cur); } } }
      BOATS.push(runs.filter(function (r) { return (r[1] - r[0]) * len >= 10; }));
    }
    return BOATS;
  };
  var inBoat = function (leg, x) { if (leg < 0 || leg > 8) return false; var a = NODES[leg], b = NODES[leg + 1], u = (x - a[0]) / (b[0] - a[0]); return boatRuns()[leg].some(function (r) { return u >= r[0] - 0.002 && u <= r[1] + 0.002; }); };
  // which leg of the path he's on (when walking): the one, of the two that
  // meet at where he's going, whose curve he's nearest; and which way he's
  // heading across the screen
  var whereOn = function (st) {
    var bp = st.bonnie, a = Math.max(0, Math.min(10, st.at - 1)), best = -1, bd = 1e9;
    [a - 1, a].forEach(function (i) {
      if (i < 0 || i > 9) return;
      for (var u = 0; u <= 1; u += 0.02) { var q = legAt(i, u), dd = Math.hypot(q[0] - bp.x, q[1] - bp.y); if (dd < bd) { bd = dd; best = i; } }
    });
    return { leg: bd < 3 ? best : -1, dir: NODES[a][0] > bp.x + 0.01 ? 1 : NODES[a][0] < bp.x - 0.01 ? -1 : 0 };
  };

  BB.Map = {
    N: 11,
    node: node,
    width: function () { return MW; },
    draw: function (ctx, st) {
      var h = stage(st), rd = !!st.reduce, t = rd ? 0 : st.t, W = BB.W, i, k, x, y, p;
      var S = { stage: h, snow: st.done ? 1 : h >= 4 ? 1 : h === 3 ? 0.8 : h === 2 ? 0.55 : 0, lights: !st.done && hasDone(st, 8), done: !!st.done };
      var key = h + '|' + S.snow + '|' + S.lights;
      if (!surf || key !== surfKey) { surf = paint(S); surfKey = key; }
      if (lcStage !== h) { lcStage = h; LC = {}; }
      var night = h >= 7 && h <= 10, day = !night, cx = st.camX;
      cam0 = cx; cam1 = cx + W;
      var vis = function (x, m) { m = m || 12; return x > cam0 - m && x < cam1 + m; };
      ctx.save();
      ctx.translate(-snap(cx), 0);
      BB.blit(ctx, surf, 0, 0);

      // ---- the sea: glints on it (and by night, starlight and the moon's path)
      for (i = 0; i < 150; i++) {
        x = (i * 53.3 + t * (0.14 + (i % 3) * 0.04)) % MW; y = (i * 37.7) % H;
        if (!vis(x) || !atSea(x, y) || !atSea(x + 2, y)) continue;
        if ((t + i * 13) % 90 < 50) R(ctx, x, y, 2, HP, night ? 'rgba(200,220,255,0.35)' : 'rgba(255,255,255,0.55)');
      }
      // little waves, coming and going
      for (i = 0; i < 60; i++) {
        x = (i * 89.1) % MW + Math.sin(t * 0.01 + i) * 2; y = (i * 29.3 + 7) % H;
        if (!vis(x) || !atSea(x, y) || !atSea(x + 3, y)) continue;
        var wa = Math.sin(t * 0.03 + i * 1.7); if (wa < 0.2) continue;
        ctx.globalAlpha = (wa - 0.2) * (night ? 0.25 : 0.45); R(ctx, x, y, 1, HP, '#ffffff'); R(ctx, x + 1, y - HP, 1.5, HP, '#ffffff'); R(ctx, x + 2.5, y, 1, HP, '#ffffff'); ctx.globalAlpha = 1;
      }
      if (h >= 8 && h <= 10 && vis(512, 30)) for (k = 0; k < 14; k++) { var my = 34 + k * 3.2 + ((t * 0.1 + k) % 1), mw = 3 - k * 0.12 + Math.sin(t * 0.08 + k * 1.3) * 1.2; if (atSea(512, my)) R(ctx, 512 - mw / 2 + Math.sin(t * 0.05 + k) * 0.8, my, mw, HP, 'rgba(255,244,200,' + (0.55 - k * 0.03) + ')'); }
      if (night) STARS.forEach(function (s, j) { if (!vis(s[0]) || (t + j * 37) % 140 > 12) return; R(ctx, s[0] - 0.25, s[1] - 1.25, HP, 2.5, '#fffbe0'); R(ctx, s[0] - 1.25, s[1] - 0.25, 2.5, HP, '#fffbe0'); });
      // the surf rolling in on Vazon
      if (vis(136, 20)) for (k = 0; k < 3; k++) {
        var su = ((t * 0.004 + k / 3) % 1), sd = 6 * (1 - su);
        ctx.globalAlpha = Math.sin(su * Math.PI) * 0.75;
        for (x = 127; x < 147; x += 0.5) { if (noise(x * 0.35 + k * 7, Math.floor(t * 0.004 + k / 3) * 3.1) < 0.35) continue; var cy = 73.5 - (x - 121.5) * 0.28 - sd * 0.75, cxx = x - sd * 0.5; if (wet(cxx, cy)) R(ctx, cxx, cy, 0.5, HP, '#ffffff'); }
        ctx.globalAlpha = 1;
      }

      // ---- the boats: the Herm ferry, the Sark boat, a fisherman, a yacht
      var ferryAt = function (period, off, P0, P1, P2) {
        var u = ((t + off) % period) / period, ph = u < 0.44 ? u / 0.44 : u < 0.5 ? 1 : u < 0.94 ? 1 - (u - 0.5) / 0.44 : 0, e2 = ph * ph * (3 - 2 * ph), m = 1 - e2;
        return { x: m * m * P0[0] + 2 * m * e2 * P1[0] + e2 * e2 * P2[0], y: m * m * P0[1] + 2 * m * e2 * P1[1] + e2 * e2 * P2[1], dir: u < 0.47 ? 1 : -1, moving: (u > 0.02 && u < 0.42) || (u > 0.52 && u < 0.92) };
      };
      var fb = ferryAt(1500, 300, [338, 86], [382, 82], [hp(-0.47, -0.4)[0] - 5, hp(-0.47, -0.4)[1] + 1.5]);
      if (vis(fb.x)) boat(ctx, fb.x, fb.y, fb.dir, 'ferry', t, night, fb.moving && !rd);
      var sb = ferryAt(2600, 1100, [340, 92], [430, 120], [sp(-0.55, -1.2)[0] - 6, sp(-0.55, -1.2)[1] + 3]);
      if (vis(sb.x)) boat(ctx, sb.x, sb.y, sb.dir, 'sark', t, night, sb.moving && !rd);
      var fu = (t * 0.0008) % 1, fx = 42 + Math.sin(fu * Math.PI * 2) * 20, fy = 76 + Math.cos(fu * Math.PI * 2) * 9;
      if (vis(fx)) boat(ctx, fx, fy, Math.cos(fu * Math.PI * 2) > 0 ? 1 : -1, 'fish', t, night, !rd);
      var yu = (t * 0.0011) % 1, yx = 388 + Math.sin(yu * Math.PI * 2) * 18, yy = 52 + Math.sin(yu * Math.PI * 4) * 5;
      if (vis(yx)) boat(ctx, yx, yy, Math.cos(yu * Math.PI * 2) > 0 ? 1 : -1, 'yacht', t, night, !rd);
      // seals by the Humps, off Herm, bobbing up for a look; a dolphin, now and then
      [[HERM.x - 4, HERM.y - 21], [HERM.x + 12, HERM.y - 19], [HERM.x + 14, HERM.y - 8]].forEach(function (s, j) {
        if (!vis(s[0])) return;
        var su2 = ((t + j * 170) % 420) / 420;
        if (su2 < 0.55) { var up = Math.min(1, su2 * 8, (0.55 - su2) * 8); oval(ctx, s[0], s[1] + 0.4, 1.8, 0.5, 'rgba(255,255,255,0.4)'); disc(ctx, s[0], s[1] - up * 0.9, 1.1 * up + 0.2, lc('#7a8090')); if (up > 0.7) { R(ctx, s[0] - 0.6, s[1] - 1.4, HP, HP, '#1c1428'); R(ctx, s[0] + 0.3, s[1] - 1.4, HP, HP, '#1c1428'); R(ctx, s[0] - 0.2, s[1] - 0.8, 0.5, 0.4, '#3a3a48'); } }
        else if (su2 < 0.62) oval(ctx, s[0], s[1], (su2 - 0.55) * 40, (su2 - 0.55) * 12, 'rgba(255,255,255,0.35)');
      });
      var dU = (t % 900) / 60;
      if (dU < 1 && vis(486)) { var dx2 = 482 + dU * 12, dy2 = 86 - Math.sin(dU * Math.PI) * 5; for (k = 0; k < 4; k++) disc(ctx, dx2 - k * 1.1, dy2 + Math.sin((dU - k * 0.08) * Math.PI) * -0.8 + k * 0.5 * Math.cos(dU * Math.PI), 1 - k * 0.15, lc('#7a8aa0')); R(ctx, dx2 - 3.8, dy2 + 0.8, 1, HP, lc('#7a8aa0')); }
      else if (dU < 1.3 && vis(486)) { ctx.globalAlpha = 1.3 - dU; R(ctx, 492, 85, 3, HP, '#ffffff'); R(ctx, 493, 84, 1, 1, '#ffffff'); ctx.globalAlpha = 1; }

      // ---- the clouds' shadows, going over (by day)
      var NC = 9;
      if (h <= 5 || h === 11) for (i = 0; i < NC; i++) { var ccx = ((i * 97 + t * 0.05 * (1 + i * 0.15)) % (MW + 120)) - 60, ccy = 20 + (i * 29) % 70; if (!vis(ccx + 6, 30)) continue; ctx.globalAlpha = 0.08; oval(ctx, ccx + 6, ccy + 26, 14, 4, '#1c1030'); ctx.globalAlpha = 1; }

      // ---- on the land: the lighthouse's beam, smoke from the chimneys, the
      // glasshouses glinting, the cows, the castle's pennant and its gun, the
      // postbox's letters, the horse and cart on Sark
      if (h >= 7 && h <= 10 && vis(HANOIS[0], 60)) {
        var ba = t * 0.025, lx2 = HANOIS[0], ly2 = HANOIS[1] - 13.5;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for (k = 0; k < 2; k++) { var ang = ba + k * Math.PI; for (var r = 2; r < 46; r += 1) { var spr2 = r * 0.16, bxx = lx2 + Math.cos(ang) * r, byy = ly2 + Math.sin(ang) * r * 0.45; ctx.globalAlpha = 0.22 * (1 - r / 46); R(ctx, bxx - spr2 / 2, byy - spr2 * 0.2, spr2, Math.max(HP, spr2 * 0.4), '#fff6c8'); } }
        ctx.restore(); ctx.globalAlpha = 1;
        glow(ctx, lx2, ly2, 6 + Math.sin(t * 0.1), '255,246,200', 0.5);
      }
      for (i = 0; i < SMOKE.length; i++) {
        var sm = SMOKE[i]; if (!vis(sm[0]) || i % 3) continue;
        for (k = 0; k < 3; k++) { var ph2 = ((t * 0.4 + k * 26 + i * 17) % 78) / 78; ctx.globalAlpha = (rd ? 0.35 : 0.5) * (1 - ph2); disc(ctx, sm[0] + ph2 * 5 + Math.sin(ph2 * 5 + i) * 0.8, sm[1] - ph2 * 11, 0.7 + ph2 * 1.6, night ? '#8a8aa8' : lc('#eeeef4')); }
      }
      ctx.globalAlpha = 1;
      if (day) GLASS.forEach(function (gl, j) { if (!vis(gl[0])) return; var gp = (t * 0.35 + j * 47) % 220; if (gp < gl[2] + 2) { var gx2 = gl[0] + gp - 1; ctx.globalAlpha = 0.85; R(ctx, gx2, gl[1], 0.5, 1.6, '#ffffff'); R(ctx, gx2 + 0.5, gl[1] + 0.4, 0.5, 0.8, '#ffffff'); ctx.globalAlpha = 1; } });
      COWS.forEach(function (c, j) { if (vis(c[0]) && isle(c[0], c[1]) && !inTown(c[0], c[1])) cow(ctx, c[0], c[1], c[2], t, j, night); });
      // the castle's pennant (a plain one) and the noon-day gun's puff of smoke
      if (vis(CASTLE.x)) {
        var pnx = CASTLE.x + 0.75 + HP, pny = CASTLE.y - 13.5;
        for (k = 0; k < 3.4; k += HP) R(ctx, pnx + k, pny + k * 0.16 + Math.sin(t * 0.15 - k * 0.9) * 0.4, HP, Math.max(HP, 1.3 - k * 0.32), lc('#d8283a'));
        if (h <= 6) { var gu = (t % 480) / 60; if (gu < 1) { var gpx = CASTLE.x - 10.5, gpy = CASTLE.y - 2.4; ctx.globalAlpha = 1 - gu; disc(ctx, gpx - gu * 4, gpy - gu * 2, 0.8 + gu * 2.6, '#ffffff'); disc(ctx, gpx - gu * 2, gpy - gu * 3, 0.6 + gu * 1.8, '#f4f4fa'); if (gu < 0.12) disc(ctx, gpx, gpy, 1, '#ffe08a'); ctx.globalAlpha = 1; } }
      }
      p = { x: NODES[3][0] - 9, y: NODES[3][1] + 1 };
      if (vis(p.x)) { var lu = (t % 360) / 90; if (lu < 1) { var lx3 = p.x + lu * 6 + Math.sin(lu * 9) * 1, ly3 = p.y - 3.6 - lu * 12; ctx.globalAlpha = Math.min(1, (1 - lu) * 3); R(ctx, lx3 - 0.7, ly3 - 0.45, 1.4, 0.9, lc('#fbf8f0')); R(ctx, lx3 - 0.7, ly3 - 0.45, 1.4, HP, lc('#d8d0c0')); R(ctx, lx3 - 0.15, ly3 - 0.1, 0.3, 0.3, lc('#d8283a')); ctx.globalAlpha = 1; } }
      var hc0 = sp(-0.5, -0.6), hc1 = sp(0.55, 0.55);
      if (vis(hc0[0])) {
        var cu = rd ? 0.3 : (t * 0.0016) % 2, cw = cu < 1 ? cu : 2 - cu, cd = cu < 1 ? 1 : -1, hx2 = hc0[0] + (hc1[0] - hc0[0]) * cw, hy2 = hc0[1] + (hc1[1] - hc0[1]) * cw, trot = Math.floor(t / 7) % 2;
        var P4 = mirror(ctx, hx2, hy2, cd);
        P4(-3.6, -2.2, 2.6, 1.4, lc('#a8784a')); P4(-3.6, -2.2, 2.6, HP, lc('#d0a070')); disc(ctx, hx2 - cd * 3.2, hy2 - 0.5, 0.6, lc('#4a3a2a')); disc(ctx, hx2 - cd * 1.4, hy2 - 0.5, 0.6, lc('#4a3a2a'));
        P4(-3.0, -3.8, 1.2, 1.6, lc('#3a6ac8')); disc(ctx, hx2 - cd * 2.4, hy2 - 4.2, 0.55, lc('#ffd4b6'));
        P4(-0.8, -2.4, 2.6, 1.2, lc('#6a4a32')); P4(1.4, -3.4, 0.9, 1.4, lc('#6a4a32')); P4(-0.6, -1.2, HP, 1.2 - trot * 0.3, lc('#4a3424')); P4(1.4, -1.2, HP, 0.9 + trot * 0.3, lc('#4a3424')); P4(-1.0, -2.2, 0.4, 0.9, lc('#3a2a1a'));
      }
      // the lights: the harbour's blinking at night, the Town's twinkling, the windows' candles
      if (night) {
        if (vis(336) && Math.floor(t / 30) % 3) glow(ctx, 336, 76.6, 3, '120,255,140', 0.6);
        if (vis(CASTLE.x) && Math.floor(t / 40) % 2) glow(ctx, CASTLE.x + 9.2, CASTLE.y - 3.4, 3, '255,120,110', 0.6);
      }
      if (S.lights) BULBS.forEach(function (b, j) { if (!vis(b[0]) || (j + Math.floor(t / 16)) % 5) return; R(ctx, b[0] - 0.25, b[1] - 0.25, HP, HP, '#ffffff'); glow(ctx, b[0], b[1], 1.8, BB.toRgb(b[2]).join(','), 0.3); });
      if ((S.lights || S.done) && vis(TREE.x)) {
        var ts = TREE.s || 1;
        for (k = 0; k < 14; k++) { var ty = TREE.y - 1.6 * ts - hsh(k, 7) * 10 * ts, tw2 = (TREE.y - ty) / (11.6 * ts), tx = TREE.x + (hsh(k, 3) - 0.5) * 2 * (5 * ts * (1 - tw2 * 0.85)); if ((k + Math.floor(t / 12)) % 3) R(ctx, tx - 0.25, ty - 0.25, HP, HP, ['#ff4a5a', '#ffd84a', '#5ab8ff', '#ffffff', '#ff8ad0'][k % 5]); }
        var sy2 = TREE.y - 1.5 * ts - 4 * 2.6 * ts + 0.5;
        glow(ctx, TREE.x, sy2, 4 + Math.sin(t * 0.08), '255,230,120', 0.6); R(ctx, TREE.x - 0.75, sy2 - 0.25, 1.5, HP, '#fff2a0'); R(ctx, TREE.x - 0.25, sy2 - 0.75, HP, 1.5, '#fff2a0');
      }
      // Christmas morning: the snow sparkling in the sun
      if (S.done) for (i = 0; i < 150; i++) { x = cam0 + hsh(i, 1) * (cam1 - cam0); y = 30 + hsh(i, 2) * 100; if ((t + i * 23) % 110 > 10 || !isle(x, y)) continue; R(ctx, x - 0.25, y - 1, HP, 2, '#ffffff'); R(ctx, x - 1, y - 0.25, 2, HP, '#ffffff'); }

      // ---- the levels' lost things, waiting to be found
      lost(ctx, st, t, h);

      // ---- the sleigh, where it crash-landed on the White Rock pier: the
      // reindeer that are back harnessed to it, Father Christmas in it waving
      // (and, once he's said sorry, Gus perched on the back of it). Not
      // there while he's riding in it, nor on Christmas morning.
      var wo = st.walking ? whereOn(st) : null;
      if (wo && wo.dir) lastDir = wo.dir;
      var riding = (wo && wo.leg === 9) || (!st.walking && st.at === 11);
      var SX = 318.5, SY = 81.6, kl = night ? 0.55 : 1, nR = Math.max(0, Math.min(8, st.reindeer || 0));
      if (!riding && !st.done && vis(SX, 30)) {
        shadow(ctx, SX + 4, SY + 0.2, 9);
        team(ctx, SX, SY, 1, nR, t, nR >= 8 ? 0 : 1, kl, SX + 1.6, SY - 5);
        sleighBody(ctx, SX, SY, 1, kl, hasDone(st, 10), true, 1, 'back');
        santa(ctx, SX - 0.6, SY - 2.6, 1, t, hasDone(st, 5), true, kl);
        sleighBody(ctx, SX, SY, 1, kl, hasDone(st, 10), true, 1, 'front');
        if (hasDone(st, 10)) gus(ctx, SX - 3.4, SY - 5.4, 1, t, { happy: Math.floor(t / 90) % 4 !== 0 }, kl);
      }
      if (st.done && vis(320, 20)) gus(ctx, 321, 82, -1, t, { crown: true, chips: true, happy: Math.floor(t / 70) % 3 !== 0 });

      // ---- the path, and the medallions
      path(ctx, st, t);
      for (i = 0; i < 11; i++) if (vis(NODES[i][0], 16)) medal(ctx, i, st, t);

      // ---- him: walking, sailing over the water, or up in the sleigh
      var BS = st.set || A.bonnie.s, bp = st.bonnie, vv = st.power === 2 && A.bonnie.red ? A.bonnie.red : st.v;
      var dir = st.walking ? (wo && wo.dir ? wo.dir : lastDir) : (st.at === 11 ? -1 : lastDir);
      var hat = function (fr, x, y, flip) { if (st.hat && BB.drawHat) BB.drawHat(ctx, st.hat, x, y, fr.w, fr.h, fr, flip); };
      if (riding) {
        /* Father Christmas's sleigh, drawn at his size: all eight reindeer
           galloping through the sky, climbing as they go, from Sark back over
           the water to the Town; Father Christmas at the reins in front, him
           in the back with the presents; sparkles behind, and its shadow on
           the sea far below. At the last medallion it waits in the air. */
        var a10 = NODES[9], a11 = NODES[10], u = st.walking ? Math.max(0, Math.min(1, (a10[0] - bp.x) / (a10[0] - a11[0]))) : 1;
        var gy2 = a10[1] + (92 - a10[1]) * u, bob = rd ? 0 : Math.sin(t * 0.1) * 0.8, SC = 1.8, kr = night ? 0.4 : 1;
        var ry = (st.walking ? bp.y + 2 : bp.y + 3) + bob, rx = bp.x - dir * 4;
        ctx.globalAlpha = 0.3; shadow(ctx, rx + dir * 14, gy2 + 2, 14); ctx.globalAlpha = 1;
        glow(ctx, rx + dir * 10, ry - 8, 26, '255,240,190', night ? 0.2 : 0.12);
        if (!rd) for (k = 0; k < 12; k++) { var tu = ((t * 0.03 + k / 12) % 1), tx2 = rx - dir * (8 + tu * 30), ty2 = ry - 3 + Math.sin(tu * 8 + k) * 2 + tu * 4; if ((k + Math.floor(t / 5)) % 3) { ctx.globalAlpha = 1 - tu; R(ctx, tx2 - 0.25, ty2 - 0.25, k % 4 ? HP : 1, k % 4 ? HP : 1, ['#fff6c8', '#ffffff', '#ffd84a'][k % 3]); ctx.globalAlpha = 1; } }
        sleighBody(ctx, rx, ry, dir, kr, true, true, SC, 'back');
        var s2 = BS.idle, px2 = rx - dir * 2.2 * SC - s2.w / 2, py2 = ry - 1.6 * SC - s2.h;
        BB.draw(ctx, s2, px2, py2, dir < 0, vv);
        hat(s2, px2, py2, dir < 0);
        santa(ctx, rx + dir * 1.6 * SC, ry - 2.6 * SC, dir, t, true, false, kr, SC);
        sleighBody(ctx, rx, ry, dir, kr, true, true, SC, 'front');
        team(ctx, rx, ry, dir, Math.max(nR, 8), t, rd ? 0 : 2, kr, rx + dir * 3.2 * SC, ry - 4.4 * SC, SC);
      } else if (wo && inBoat(wo.leg, bp.x)) {
        // crossing the water: he sails, in a little boat of his own
        var rk = rd ? 0 : Math.sin(t * 0.12) * 0.8, s3 = BS.idle, mx = bp.x - dir * 3;
        R(ctx, mx - 0.25, bp.y - 13 + rk, HP, 13, '#6a4a3a');
        for (k = 0; k < 10; k += HP) R(ctx, dir > 0 ? mx - 0.25 - k * 0.75 : mx + 0.25, bp.y - 13 + rk + k, k * 0.75, HP, '#fff8ea');
        BB.draw(ctx, s3, bp.x - s3.w / 2, bp.y - s3.h + 2 + rk, dir < 0, vv);
        hat(s3, bp.x - s3.w / 2, bp.y - s3.h + 2 + rk, dir < 0);
        for (k = 0; k < 4; k += HP) { var hw3 = 8 - k * 0.8; R(ctx, bp.x - hw3, bp.y + rk + k, hw3 * 2, HP, k < 1 ? '#e8b880' : k < 3 ? '#c06a3a' : '#7a4a28'); }
        if (st.walking) for (k = 0; k < 3; k++) R(ctx, bp.x - dir * (10 + k * 3), bp.y + 3 + rk, 2, HP, 'rgba(255,255,255,0.7)');
      } else {
        var f = st.walking ? BS[['run1', 'run2', 'run3', 'run2'][Math.floor(t / 6) % 4]] : BS.idle;
        var hop = !st.walking && !rd ? -Math.abs(Math.sin(t * 0.06)) * 1.5 : 0, stand = st.walking ? 0 : -5;
        shadow(ctx, bp.x, bp.y + 0.5 + stand, 5);
        BB.draw(ctx, f, bp.x - f.w / 2, bp.y - f.h + hop + stand, dir < 0, vv);
        hat(f, bp.x - f.w / 2, bp.y - f.h + hop + stand, dir < 0);
      }

      // ---- in the sky: Grabby Gus, circling with the bell; the gulls; the clouds; the snow
      // (once his nest's been found at Fort Grey, he's off east, towards Sark: over it when it's in view)
      if (!hasDone(st, 10)) {
        var east = hasDone(st, 7), gcx = east ? Math.min(SARK.x, cx + W * 0.8) : Math.max(150, Math.min(560, cx + W * 0.55 + Math.sin(t * 0.0021) * W * 0.22));
        var gcy = (east ? 62 : 76) + Math.sin(t * 0.0037) * 6, ga = rd ? 1 : t * 0.017;
        var gxx = gcx + Math.cos(ga) * 30, gyy = gcy + Math.sin(ga) * 11 - 6, gd = -Math.sin(ga) > 0 ? 1 : -1;
        ctx.globalAlpha = 0.14; oval(ctx, gxx + 3, gyy + 24, 4, 1.2, '#1c1030'); ctx.globalAlpha = 1;
        gus(ctx, gxx, gyy, gd, t, { fly: true, bell: true, glide: Math.floor(t / 120) % 3 === 2 }, night ? 0.6 : 1);
      }
      if (h <= 6 || h === 11) for (i = 0; i < 6; i++) {
        var gbx = (i * 131 + t * (0.22 + i * 0.03)) % (MW + 40) - 20, gby = 40 + (i * 23) % 70 + Math.sin(t * 0.03 + i) * 4, fl = Math.floor(t / 9 + i) % 2;
        if (!vis(gbx)) continue;
        R(ctx, gbx - 2, gby - (fl ? 1 : 0), 2, HP, lc('#f4f6ff')); R(ctx, gbx - 0.25, gby, HP, HP, lc('#8a92a4')); R(ctx, gbx + 0.5, gby - (fl ? 1 : 0), 2, HP, lc('#f4f6ff')); R(ctx, gbx - 2, gby - (fl ? 1 : 0), HP, HP, lc('#3a3a48')); R(ctx, gbx + 2, gby - (fl ? 1 : 0), HP, HP, lc('#3a3a48'));
      }
      if (h <= 7 || h === 11) {
        if (!cloudC) cloudC = BB.surface(44, 26);
        var cl = cloudC.getContext('2d'), cA = h === 6 ? '#f8c0b0' : h === 7 ? '#a890c8' : h === 0 ? '#f0d0d8' : '#d6e2f6', cB = h === 6 ? '#ffe4d0' : h === 7 ? '#d0b8e8' : h === 0 ? '#fff0f0' : '#ffffff';
        for (i = 0; i < NC; i++) {
          var ccx2 = ((i * 97 + t * 0.05 * (1 + i * 0.15)) % (MW + 120)) - 60, ccy2 = 20 + (i * 29) % 70;
          if (!vis(ccx2 + 6, 30)) continue;
          cl.clearRect(0, 0, 44, 26);
          [[0, 0, 6], [7, -3, 7], [15, 0, 6], [7, 2, 6], [21, 1, 4]].forEach(function (q) { disc(cl, 10 + q[0], 13 + q[1] + 1.2, q[2], cA); });
          [[0, 0, 6], [7, -3, 7], [15, 0, 6], [7, 2, 6], [21, 1, 4]].forEach(function (q) { disc(cl, 10 + q[0], 13 + q[1], q[2] * 0.92, cB); });
          ctx.globalAlpha = 0.6; BB.blit(ctx, cloudC, ccx2 - 10, ccy2 - 13); ctx.globalAlpha = 1;
        }
      }
      if (S.snow && !S.done && !rd) for (i = 0; i < 80; i++) {
        var spd = 0.18 + (i % 5) * 0.05, fx3 = cam0 + ((i * 47.31 + t * 0.06 + Math.sin(t * 0.02 + i) * 6) % (W + 20) + W + 20) % (W + 20) - 10, fy3 = ((i * 31.7 + t * spd) % (H + 8)) - 4;
        R(ctx, fx3, fy3, i % 4 ? HP : 1, i % 4 ? HP : 1, night ? '#e8eeff' : '#ffffff');
      }
      ctx.restore();
    }
  };
})();
