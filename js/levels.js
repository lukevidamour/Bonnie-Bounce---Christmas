/* ==========================================================================
   levels.js — the level builder: a small set of commands the levels
   (levelsx.js) are built with.

   A level is a grid of 8x8 tiles, 18 rows tall unless it says otherwise
   (Cloud Kingdom climbs, so it is 36). Each world's build() lays out its
   ground, blocks, enemies and set pieces with the builder below; the
   scenery (bushes, palms, pines…) is scattered afterwards from the theme.

   The numbers the levels are built on (game.js has the physics):
     ground top      row 16 (y 128), two rows of ground under it
     low blocks      row 11 — 32px over the ground, so big Bonnie walks
                     under them with his hair clear, and a jump lands on them
     high blocks     row 6  — the same 32px over the low row
     a walking jump  ~6 tiles high, ~7 tiles across; running ~10 across
   Gaps stay at 4 or under early on (he is five), and widen slowly.
   ========================================================================== */
(function () {
  'use strict';
  var T = 8;
  var TL = BB.TILES = {
    EMPTY: 0, GROUND: 1, BRICK: 2, Q: 3, USED: 4, HARD: 5, PIPE: 6, PIPER: 7, PIPETOP: 8, PIPETOPR: 9,
    SEMI: 10, COIN: 11, SPIKE: 12, LAVA: 13, CONVL: 14, CONVR: 15, HIDDEN: 16, CRATE: 17, WALL: 18,
    SECRET: 20, SECRETH: 21, WATER: 22,
    // the rainbow's paint blocks: solid only in the colour of the last paint pot touched
    PAINTR: 23, PAINTY: 24, PAINTB: 25
  };
  // what is in a "?" block, a brick or a hidden block
  var C = BB.CONTENTS = { COIN: 1, POWER: 2, STAR: 3, LIFE: 4, MULTI: 5, ROCKET: 6 };

  var GR = 16, R1 = 11, R2 = 6;

  var Builder = function (def) {
    var h = def.h || 18;
    this.w = def.w; this.h = h;
    this.gr = def.gr || GR;
    this.map = new Uint8Array(def.w * h);
    this.cont = new Uint8Array(def.w * h);
    this.ents = [];
    this.deco = [];
    this.noDeco = [];
    this.start = { x: 3, row: this.gr };
  };
  var B = Builder.prototype;
  B.set = function (x, y, t, c) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    this.map[y * this.w + x] = t;
    this.cont[y * this.w + x] = c || 0;
  };
  B.get = function (x, y) { return x < 0 || x >= this.w || y < 0 || y >= this.h ? 0 : this.map[y * this.w + x]; };
  // solid ground from row `top` to the bottom, columns x0..x1-1
  B.ground = function (x0, x1, top) {
    top = top === undefined ? this.gr : top;
    for (var x = x0; x < x1; x++) for (var y = top; y < this.h; y++) this.set(x, y, TL.GROUND);
  };
  B.box = function (x0, y0, x1, y1, t) {
    // (t may be EMPTY, 0, for B.clear: only a missing t means ground)
    var tile = t === undefined ? TL.GROUND : t;
    for (var x = x0; x < x1; x++) for (var y = y0; y < y1; y++) this.set(x, y, tile);
  };
  B.clear = function (x0, y0, x1, y1) { this.box(x0, y0, x1, y1, TL.EMPTY); };
  B.ceiling = function (x0, x1, rows) { this.box(x0, 0, x1, rows, TL.GROUND); };
  /* A row of things, one character per tile:
       B brick   ? star block   P power-up block   S rainbow-lolly block
       L heart block   M brick of many stars   k hidden star   h hidden heart
       R bullet block (Bonnie's bullet: it zooms you along)
       U used block   X hard block   C star   = one-way platform   # ground
       ^ spikes   c crate   r y b paint blocks (red, yellow, blue)   space: nothing */
  B.row = function (x, y, s) {
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], tx = x + i;
      switch (ch) {
        case 'B': this.set(tx, y, TL.BRICK); break;
        case '?': this.set(tx, y, TL.Q, C.COIN); break;
        case 'P': this.set(tx, y, TL.Q, C.POWER); break;
        case 'S': this.set(tx, y, TL.Q, C.STAR); break;
        case 'L': this.set(tx, y, TL.Q, C.LIFE); break;
        case 'R': this.set(tx, y, TL.Q, C.ROCKET); break;
        case 'M': this.set(tx, y, TL.BRICK, C.MULTI); break;
        case 'k': this.set(tx, y, TL.HIDDEN, C.COIN); break;
        case 'h': this.set(tx, y, TL.HIDDEN, C.LIFE); break;
        case 'U': this.set(tx, y, TL.USED); break;
        case 'X': this.set(tx, y, TL.HARD); break;
        case 'C': this.set(tx, y, TL.COIN); break;
        case '=': this.set(tx, y, TL.SEMI); break;
        case '#': this.set(tx, y, TL.GROUND); break;
        case '^': this.set(tx, y, TL.SPIKE); break;
        case 'c': this.set(tx, y, TL.CRATE); break;
        case 'r': this.set(tx, y, TL.PAINTR); break;
        case 'y': this.set(tx, y, TL.PAINTY); break;
        case 'b': this.set(tx, y, TL.PAINTB); break;
      }
    }
  };
  B.coins = function (x, y, n) { for (var i = 0; i < n; i++) this.set(x + i, y, TL.COIN); };
  // an arc of stars over a gap: the line a jump should take
  B.arc = function (x, y, n) {
    for (var i = 0; i < n; i++) {
      var t = n > 1 ? i / (n - 1) : 0.5;
      this.set(x + i, y - Math.round(Math.sin(t * Math.PI) * Math.min(3, n / 2)), TL.COIN);
    }
  };
  B.semi = function (x0, x1, y) { for (var x = x0; x < x1; x++) this.set(x, y, TL.SEMI); };
  B.spikes = function (x0, x1, y) { for (var x = x0; x < x1; x++) this.set(x, y === undefined ? this.gr - 1 : y, TL.SPIKE); };
  B.lava = function (x0, x1, y) { for (var x = x0; x < x1; x++) for (var yy = y === undefined ? this.gr + 1 : y; yy < this.h; yy++) this.set(x, yy, TL.LAVA); };
  B.conveyor = function (x0, x1, dir, y) { for (var x = x0; x < x1; x++) this.set(x, y === undefined ? this.gr : y, dir < 0 ? TL.CONVL : TL.CONVR); };
  // a pipe, h tiles tall, standing on the ground (or on row `base`)
  B.pipe = function (x, h, plant, base) {
    base = base === undefined ? this.gr : base;
    for (var k = 1; k <= h; k++) {
      var y = base - k;
      this.set(x, y, k === h ? TL.PIPETOP : TL.PIPE);
      this.set(x + 1, y, k === h ? TL.PIPETOPR : TL.PIPER);
    }
    if (plant) this.e('plant', x, base - h);
    this.noDeco.push([x - 1, x + 3]);
  };
  // stairs of hard blocks: n steps up from the ground (or down, with dir -1)
  B.stairs = function (x, n, dir, base) {
    base = base === undefined ? this.gr : base;
    for (var k = 0; k < n; k++) {
      var hgt = dir < 0 ? n - k : k + 1;
      for (var j = 1; j <= hgt; j++) this.set(x + k, base - j, TL.HARD);
    }
    this.noDeco.push([x - 1, x + n + 1]);
  };
  B.column = function (x, hgt, base) {
    base = base === undefined ? this.gr : base;
    for (var j = 1; j <= hgt; j++) this.set(x, base - j, TL.HARD);
  };
  // an enemy or a set piece: x in tiles; row is the tile row it stands on
  // (walkers) or its middle (fliers); opts as each kind reads them
  B.e = function (k, x, row, opts) {
    var o = { k: k, x: x * T, row: row === undefined ? this.gr : row };
    if (opts) for (var key in opts) o[key] = opts[key];
    this.ents.push(o);
    return o;
  };
  B.spring = function (x, row) { this.e('spring', x, row); this.noDeco.push([x - 1, x + 3]); };
  /* A checkpoint flag. Without a row it stands on whatever ground is
     there, at whatever height (see settle) */
  B.check = function (x, row) { var o = this.e('check', x, row); if (row === undefined) o.onGround = true; this.noDeco.push([x - 1, x + 2]); };
  /* Once the whole level's built: each checkpoint with no row of its own
     is stood on the ground actually there — up out of it, or down onto
     it. They used to go at the usual ground height whatever was there, and
     one on a hill put Bonnie back inside the hill when he restarted from
     it, stuck (Windy Hill, 23 Oct; five more were buried). It checks the
     flag's tile and the two after, where he's put back. */
  var STANDS = [TL.GROUND, TL.BRICK, TL.Q, TL.USED, TL.HARD, TL.PIPE, TL.PIPER, TL.PIPETOP, TL.PIPETOPR, TL.SEMI, TL.CONVL, TL.CONVR, TL.CRATE, TL.WALL];
  B.settle = function () {
    var L = this;
    var solid = function (x, y) { return STANDS.indexOf(L.get(x, y)) >= 0 || STANDS.indexOf(L.get(x + 1, y)) >= 0 || STANDS.indexOf(L.get(x + 2, y)) >= 0; };
    this.ents.forEach(function (o) {
      if (!o.onGround) return;
      var x = Math.floor(o.x / T), r = o.row;
      while (r > 2 && solid(x, r - 1)) r--;
      var d = r;
      while (d < L.h && !solid(x, d)) d++;
      o.row = d < L.h ? d : r;
    });
  };
  // moving platforms: w tiles wide; dx/dy the travel in tiles; fall: drops
  // a moment after you land on it
  B.plat = function (x, row, w, o) { return this.e('plat', x, row, Object.assign({ w: w }, o || {})); };
  B.goal = function (x, row) {
    row = row === undefined ? this.gr : row;
    this.e('goal', x, row);
    this.e('house', x + 5, row);
    this.noDeco.push([x - 3, x + 12]);
  };
  /* A signpost that teaches by doing: when Bonnie walks up to it, a
     bubble pops up showing the real control for the player's device (the
     Space bar, or the A button) next to a word or two. */
  /* Three golden medals hide in every level, to be found: one usually
     along the way but a little off it, the others behind a secret wall, up
     a balloon ride, over the top of something. x, row: the tile it's in. */
  // ({ hidden: true }: kept behind a trick-or-treat door till it opens)
  B.medal = function (x, row, o) { this.medalN = (this.medalN || 0) + 1; this.e('medal', x, row, Object.assign({ i: this.medalN - 1 }, o || {})); };
  /* A secret wall: tiles that look solid (the world's ground, or with
     'hard' its blocks) but that Bonnie walks straight through — they go
     see-through while he's inside. Hide a medal or a room of stars in it. */
  B.secret = function (x0, y0, x1, y1, look) {
    this.secretN = (this.secretN || 0) + 1;
    for (var x = x0; x < x1; x++) for (var y = y0; y < y1; y++) this.set(x, y, look === 'hard' ? TL.SECRETH : TL.SECRET, this.secretN);
  };
  /* A bunch of balloons: grab it and Bonnie floats up into the sky for a
     few seconds, steering as he goes, then drifts gently down. row: the
     tile row the bunch's knot hangs at. */
  B.balloons = function (x, row) { this.e('balloons', x, row); this.noDeco.push([x - 1, x + 3]); };
  /* Musical blocks: a row of them (one note letter per tile, 'CDEFGAB'
     and 'c' for the high C), each bouncing Bonnie a little and singing
     its note as he lands — a tune if he hops along in order. */
  B.notes = function (x, row, tune) { for (var i = 0; i < tune.length; i++) if (tune[i] !== ' ') this.e('note', x + i, row, { note: tune[i] }); this.noDeco.push([x - 1, x + tune.length + 1]); };
  // water to swim in (a pool, the sea at the shore): x0..x1-1, rows y0..y1-1
  B.water = function (x0, y0, x1, y1) { for (var x = x0; x < x1; x++) for (var y = y0; y < y1; y++) this.set(x, y, TL.WATER); this.noDeco.push([x0, x1]); };
  // a steam vent on the ground (or on row `base`): its plume lifts Bonnie h rows
  B.steam = function (x, h, base) { this.e('steam', x, base === undefined ? this.gr : base, { h: h }); this.noDeco.push([x - 1, x + 3]); };
  B.tip = function (x, kind, row) { this.e('tip', x, row, { tip: kind }); this.noDeco.push([x - 1, x + 3]); };
  /* Bear, the family cat: one in every level, somewhere off the main way —
     up on a bonus route or a ledge you have to look for. Touch him and he
     follows Bonnie home. row is the tile row he sits on. Every spot is
     at most 32px (four tiles) above somewhere to jump from: a held jump
     reaches about 42, so it's a hunt, not a test of skill. */
  B.bear = function (x, row) { this.e('bear', x, row); this.noDeco.push([x - 1, x + 3]); };
  B.deco1 = function (name, x, row) { this.deco.push({ name: name, x: x * T, row: row === undefined ? this.gr : row }); this.noDeco.push([x - 2, x + 4]); };

  /* Scenery: from the theme's list, on open ground, never over a pipe, a
     stair or a set piece, and never under something it would poke into. */
  B.scatter = function (theme, seed) {
    // only scenery that has actually been drawn (a world can list one before it's painted)
    var A = BB.ART, rnd = BB.rng(seed), list = theme.deco.filter(function (n) { return A.deco[n]; });
    if (!list.length) return;
    var x = 4;
    while (x < this.w - 6) {
      var name = list[Math.floor(rnd() * list.length)];
      var s = A.deco[name];
      if (Array.isArray(s)) s = s[0];
      var wT = Math.ceil(s.w / T), hT = Math.ceil(s.h / T);
      var ok = true, top = -1;
      for (var y = 2; y < this.h; y++) { if (this.get(x, y) === TL.GROUND) { top = y; break; } if (this.get(x, y)) { ok = false; break; } }
      if (top < 0) ok = false;
      for (var i = 0; ok && i < wT; i++) {
        if (this.get(x + i, top) !== TL.GROUND || this.get(x + i, top - 1) !== TL.EMPTY) ok = false;
        for (var j = 1; ok && j <= hT + 1; j++) if (this.get(x + i, top - j) !== TL.EMPTY && this.get(x + i, top - j) !== TL.COIN) ok = false;
      }
      if (ok && this.noDeco.some(function (r) { return x + wT > r[0] && x < r[1]; })) ok = false;
      if (ok && this.ents.some(function (e) { return (e.k === 'goal' || e.k === 'house') && Math.abs(e.x / T - x) < 8; })) ok = false;
      if (ok) {
        this.deco.push({ name: name, x: x * T + Math.floor(rnd() * 4), row: top });
        x += wT + 2 + Math.floor(rnd() * 7);
      } else x += 2;
    }
  };

  /* ==========================================================================
     THE LEVELS: added by levelsx.js (the Christmas edition's eleven), with
     this file's kit. (The original's fifty-five are in ../Bonnie Bounce.)
     ========================================================================== */
  var LEVELS = BB.LEVELS = [];
  var add = function (def) { def.n = LEVELS.length + 1; LEVELS.push(def); };

  // the kit, for levelsx.js

  BB.levelKit = { add: add, TL: TL, C: C, GR: GR, R1: R1, R2: R2, T: T };

  BB.buildLevel = function (n) {
    var def = LEVELS[n - 1];
    var L = new Builder(def);
    def.build(L);
    L.settle();
    L.scatter(BB.ART.themes[def.theme], def.seed);
    L.def = def;
    return L;
  };
})();
