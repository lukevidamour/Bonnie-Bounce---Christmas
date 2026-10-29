/* ==========================================================================
   musicx.js — the soundtrack of Bonnie Bounce — Christmas: Christmas Eve in
   Guernsey, from the morning harbour to the midnight rooftops. The title,
   the story, the map, eleven levels, Grabby Gus, the ending, the Boxing Day
   dip and the level-clear jingle. Same format as music.js (read that header
   first): tracks of note tokens, '-' holds, '.' rests, 'x'/'X' on noise
   tracks, and `sustain` (music5.js) for notes that are plucked and ring away.

   Most tunes are originals, written for this game. A few arrange
   public-domain, non-religious carols, and each one says so in its comment:
   Jingle Bells (the title), O Tannenbaum (Candie Gardens), Deck the Halls
   (Town Lights) and We Wish You a Merry Christmas (the ending). Nothing
   else is borrowed.

   Two tunes of our own come back again and again, so the game hangs
   together like a story: the Sleigh Theme (Father Christmas's sleigh, first
   heard on the title, flown for real over the rooftops, and played in
   triumph at the end) and Grabby Gus's taunt (the playground 'nyah-nyah',
   sol-sol-mi-la-sol-mi, which belongs to nobody and every child knows).

   Christmas lives on the noise channel too: the short (7-bit) noise as a
   hi-hat sounds just like sleigh bells shaken in a rhythm. Some tunes are
   waltzes, jigs or swing, so twelve steps to a bar instead of sixteen; every
   track in a tune is the same length, so they all loop together, and no note
   is held longer than sixteen steps (the most the player holds one).
   ========================================================================== */
(function () {
  'use strict';
  var r = function (s, n) { var o = []; for (var i = 0; i < n; i++) o.push(s); return o.join(' '); };
  var j = function () { return Array.prototype.join.call(arguments, ' '); };
  var rest = function (n) { return r('.', n); };
  // a whole line moved up or down by semitones (or octaves), keeping its rhythm
  var NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  var NUM = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var midi = function (n) { var m = /^([A-G])([#b]?)(\d)$/.exec(n); return NUM[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (+m[3] + 1) * 12; };
  var name = function (k) { return NAMES[k % 12] + (Math.floor(k / 12) - 1); };
  var shift = function (s, k) { return s.split(' ').map(function (t) { return /^[A-G]/.test(t) ? name(midi(t) + k) : t; }).join(' '); };
  var oct = function (s, o) { return shift(s, 12 * o); };

  /* -- sixteen-step bars -- */
  // a four-note arpeggio in sixteenths, a bar long
  var ar = function (a, b, c, d) { return r([a, b, c, d || b].join(' '), 4); };
  // a bouncing bass: root and fifth in eighths, a bar long
  var b8 = function (a, b) { return r(a + ' . ' + b + ' .', 4); };
  // a bass on every beat, root and fifth: boom, boom, boom, boom
  var q4 = function (a, b) { return r(a + ' - . . ' + b + ' - . .', 2); };
  // a slow bass, two long notes to the bar
  var bh = function (a, b) { return a + ' - - - - - . . ' + b + ' - - - - - . .'; };
  // the 'pah' of oom-pah: chord notes on the off-beats; ph is half a bar
  var ph = function (a, b) { return '. . ' + a + ' . . . ' + b + ' .'; };
  var pah = function (a, b) { return r(ph(a, b), 2); };
  // reindeer at full gallop: ba-da-dum, ba-da-dum
  var gal = function (a, b) { return r([a, '.', a, a, b, '.', b, b].join(' '), 2); };
  // stars blinking round a chord at odd moments, a bar long (music6's fireflies)
  var spark = function (a, b, c, d) { return [a, '.', c, '.', '.', b, '.', '.', d, '.', '.', c, '.', a, '.', '.'].join(' '); };
  // sleigh bells shaken in time (chk, chikka-chikka), and the drummer's back-beat
  var BELLS = 'x . x x x . x x x . x x x . x x';
  var BACK = '. . . . X . . . . . . . X . . .';
  var FILL = '. . . . X . . . X . X . X X X X';

  /* -- twelve-step bars (waltzes, jigs, 12/8 and swing) -- */
  // a jig's bass: root on the first big beat, fifth on the second
  var b6 = function (a, b) { return a + ' - - - - . ' + b + ' - - - - .'; };
  // a squeezebox in 6/8: the chord on the two small beats of each big one
  var j6 = function (a, b) { return r('. . ' + a + ' . ' + b + ' .', 2); };
  // a waltz: oom on one (in the bass), pah-pah on two and three
  var oom = function (a) { return a + ' - - . . . . . . . . .'; };
  var pp = function (a, b) { return '. . . . ' + a + ' . . . ' + b + ' . . .'; };
  // frost glinting in a waltz bar
  var tw = function (a, b, c) { return ['.', '.', c, '.', '.', a, '.', '.', b, '.', '.', '.'].join(' '); };
  // 12/8: a strum on the two small beats of every big one (chk-chk)
  var tr = function (a, b) { return r('. ' + a + ' ' + b, 4); };
  // swing: a walking bass, a note a beat, and big-band stabs on two and four
  var walk = function (a, b, c, d) { return [a, '-', '.', b, '-', '.', c, '-', '.', d, '-', '.'].join(' '); };
  var sw = function (a, b) { return '. . . ' + a + ' . . . . . ' + b + ' . .'; };

  /* The Sleigh Theme, in G. It takes off up the chord (G, A, B, D, G: the
     sleigh lifting off the snow), glides down, and the second time round
     the C major chord turns to C minor for a moment (the E flat), the warm,
     slightly-wistful sound that makes music feel like Christmas, before the
     F sharp lifts it home. The rooftops and the ending play it in A. */
  var SLEIGH = [
    'G5 . A5 . B5 - D6 - G6 - - - D6 - B5 -', 'C6 - - - E6 - - - G6 - - - E6 - C6 -',
    'B5 - - - D6 - B5 - A5 - G5 - E5 - D5 -', 'E5 - - - A5 - - - F#5 . G5 . A5 . . .',
    'G5 . A5 . B5 - D6 - G6 - - - D6 - B5 -', 'C6 - - - E6 - - - Eb6 - - - C6 - G5 -',
    'B5 - - - D6 - G6 - A5 - - - F#6 - - -', 'G6 - - - - - - - D6 . B5 . G5 . D5 .'
  ];
  var SLEIGH_A = SLEIGH.map(function (b) { return shift(b, 2); });
  // its sparkle underneath: the chords as arpeggios (in A, for the rooftops)
  var SLEIGH_ARP_A = [ar('A4', 'C#5', 'E5'), ar('A4', 'D5', 'F#5'), 'A4 C#5 E5 C#5 A4 C#5 E5 C#5 A4 C#5 F#5 C#5 A4 C#5 F#5 C#5', 'A4 B4 D#5 B4 A4 B4 D#5 B4 G#4 B4 D5 B4 G#4 B4 E5 B4',
    ar('A4', 'C#5', 'E5'), 'A4 D5 F#5 D5 A4 D5 F#5 D5 A4 D5 F5 D5 A4 D5 F5 D5', 'A4 C#5 E5 C#5 A4 C#5 E5 C#5 G#4 B4 D5 B4 G#4 B4 E5 B4', ar('A4', 'C#5', 'E5')];
  // and the reindeer galloping under it
  var SLEIGH_GAL_A = [gal('A2', 'E3'), gal('D3', 'A2'), 'A2 . A2 A2 E3 . E3 E3 F#2 . F#2 F#2 C#3 . C#3 C#3', 'B2 . B2 B2 F#2 . F#2 F#2 E2 . E2 E2 B2 . B2 B2',
    gal('A2', 'E3'), 'D3 . D3 D3 A2 . A2 A2 D3 . D3 D3 F2 . F2 F2', 'E2 . E2 E2 A2 . A2 A2 E2 . E2 E2 B2 . B2 B2', 'A2 . A2 A2 E3 . E3 E3 A2 . . . E2 . . .'];

  Object.assign(BB.SONGS, {

    /* ---- Bonnie Bounce — Christmas: Christmas Eve in Guernsey ---------- */

    // the title: the Sleigh Theme, then the chorus of JINGLE BELLS (public
    // domain, James Lord Pierpont, 1857), because nothing makes a five-year-
    // old grin faster. Sleigh bells shake all the way through, the thin
    // voice sparkles round the theme then goes 'pah' on the off-beats like
    // a pony trotting, and the bass bounces, then trots a beat at a time
    xtitle: {
      step: 0.09,
      tracks: [
        { duty: 0.25, vol: 0.026, notes: j(SLEIGH.join(' '),
          'B5 - - - B5 - - - B5 - - - - - - .', 'B5 - - - B5 - - - B5 - - - - - - .', 'B5 - - - D6 - - - G5 - - - - - A5 -', 'B5 - - - - - - - - - - - . . . .',
          'C6 - - - C6 - - - C6 - - - - - C6 -', 'C6 - - - B5 - - - B5 - - - B5 - B5 -', 'B5 - - - A5 - - - A5 - - - B5 - - -', 'A5 - - - - - - - D6 - - - - - - -',
          'B5 - - - B5 - - - B5 - - - - - - .', 'B5 - - - B5 - - - B5 - - - - - - .', 'B5 - - - D6 - - - G5 - - - - - A5 -', 'B5 - - - - - - - - - - - . . . .',
          'C6 - - - C6 - - - C6 - - - - - C6 -', 'C6 - - - B5 - - - B5 - - - B5 - B5 -', 'D6 - - - D6 - - - C6 - - - A5 - - -', 'G5 - - - - - - - - - - - . . . .') },
        { duty: 0.125, vol: 0.01, notes: j(ar('G4', 'B4', 'D5'), ar('G4', 'C5', 'E5'), 'G4 B4 D5 B4 G4 B4 D5 B4 G4 B4 E5 B4 G4 B4 E5 B4', 'G4 A4 C#5 A4 G4 A4 C#5 A4 F#4 A4 C5 A4 F#4 A4 D5 A4',
          ar('G4', 'B4', 'D5'), 'G4 C5 E5 C5 G4 C5 E5 C5 G4 C5 Eb5 C5 G4 C5 Eb5 C5', 'G4 B4 D5 B4 G4 B4 D5 B4 F#4 A4 C5 A4 F#4 A4 D5 A4', ar('G4', 'B4', 'D5'),
          r(pah('B4', 'D5'), 4), pah('C5', 'E5'), pah('B4', 'D5'), pah('C#5', 'E5'), pah('C5', 'F#5'),
          r(pah('B4', 'D5'), 4), pah('C5', 'E5'), pah('B4', 'D5'), pah('C5', 'F#5'), pah('B4', 'D5')) },
        { wave: 'tri', vol: 0.09, notes: j(b8('G2', 'D3'), b8('C3', 'G2'), 'G2 . D3 . G2 . D3 . E2 . B2 . E2 . B2 .', 'A2 . E3 . A2 . E3 . D3 . A2 . D3 . C3 .',
          b8('G2', 'D3'), 'C3 . G2 . C3 . G2 . C3 . G2 . Eb3 . G2 .', 'D3 . G2 . B2 . D3 . D3 . A2 . F#2 . A2 .', 'G2 . D3 . G2 . D3 . G2 . . . D3 . F#2 .',
          r(q4('G2', 'D3'), 3), 'G2 - . . D3 - . . G2 - . . B2 - . .', q4('C3', 'G2'), q4('G2', 'D3'), q4('A2', 'E3'), 'D3 - . . A2 - . . D3 - . . F#2 - . .',
          r(q4('G2', 'D3'), 3), 'G2 - . . D3 - . . G2 - . . B2 - . .', q4('C3', 'G2'), q4('G2', 'D3'), 'D3 - . . A2 - . . D3 - . . F#2 - . .', 'G2 - . . D3 - . . G2 - . . D2 - . .') },
        { noise: 1, vol: 0.009, notes: r(BELLS, 24) },
        { noise: 0, vol: 0.011, notes: j(r(BACK, 7), FILL, r(BACK, 7), '. . . . X . . . . . . . X . X X', r(BACK, 7), FILL) }
      ]
    },
    // the opening story, a little cartoon in eight bars: Father Christmas's
    // practice flight (the Sleigh Theme, bells jingling), Grabby Gus swoops
    // (a squawk and a slide all the way down, a semitone at a time), the
    // reindeer panic (everything scurries up in a tizzy), the crash (a
    // tumble down a diminished chord, and the bells stop), then "Ho ho…"
    // (two jolly notes and a pause) "…oh no!" (a wobbly sinking E flat to D,
    // C minor to G, more 'whoops' than sad), and Gus flies off with the
    // golden bell, singing his taunt (one ding: the bell going with him)
    xstory: {
      step: 0.08,
      tracks: [
        { duty: 0.25, vol: 0.026, vib: true, notes: j(SLEIGH[0], 'C6 - - - E6 - G6 - A6 - - - F#6 - D6 -', 'A6 - - - G#6 G6 F#6 F6 E6 Eb6 D6 Db6 C6 B5 Bb5 A5', 'D5 F5 D5 F5 Eb5 Gb5 Eb5 Gb5 E5 G5 E5 G5 F5 Ab5 F5 Ab5',
          'G5 E5 C#5 Bb4 G4 E4 C#4 Bb3 G3 - - - . . . .', 'C5 - - . . . G4 - - . . . . . . .', 'Eb5 - - - - - - - D5 - - - - - - .', 'D6 - - D6 B5 - - - E6 - D6 - B5 - - -') },
        { duty: 0.125, vol: 0.01, notes: j(ar('G4', 'B4', 'D5'), 'G4 C5 E5 C5 G4 C5 E5 C5 F#4 A4 D5 A4 F#4 A4 C5 A4', 'C7 - . . A6 - . . . . . . . . . .', 'A4 . A4 . Bb4 . Bb4 . B4 . B4 . C5 . C5 .',
          rest(48), '. . . . . . . . D7 . . . . . . .') },
        { wave: 'tri', vol: 0.09, notes: j(b8('G2', 'D3'), 'C3 . G2 . C3 . G2 . D3 . A2 . D3 . F#2 .', 'F3 - - - E3 - - - Eb3 - - - D3 - - -', 'D2 D3 D2 D3 Eb2 Eb3 Eb2 Eb3 E2 E3 E2 E3 F2 F3 F2 F3',
          'G2 . . . E2 . . . C#2 - - - . . . .', 'C3 - - . . . G2 - - . . . . . . .', 'C3 - - - - - - - G2 - - - - - - .', 'G2 . . . D3 . . . G2 . . . D3 . D2 .') },
        { noise: 1, vol: 0.009, notes: j(r(BELLS, 3), r('x x x x', 4), 'x x x x x x x x . . . . . . . .', rest(48)) },
        { noise: 0, vol: 0.012, notes: j(r(BACK, 2), '. . . . . . . . . . . . X . X X', 'X x X x X x X x X X X X X X X X', 'X . X . X . . . X . . . . . . .', rest(32), 'x . . . X . . . x . . . X . X .') }
      ]
    },
    // the map of Guernsey: a cosy walk in F, slow enough to hum, for
    // choosing where to go next. The tune leaps up a sixth and strolls
    // down (C up to A, like looking up at the lights), then says it again
    // a step higher; the second time B flat turns to B flat minor (D flat),
    // the fireside glow. Then it wanders through D minor and G minor, a
    // little wistful, and home. The thin voice goes 'pah' softly on the
    // off-beats, the bass takes two long steps a bar, and the sleigh bells
    // give a quiet jingle-jing on two and four
    xmap: {
      step: 0.13,
      tracks: [
        { duty: 0.5, vol: 0.023, vib: true, notes: j('C5 - - - A5 - - - G5 - A5 - F5 - - -', 'D5 - - - Bb5 - - - A5 - Bb5 - G5 - - -', 'E5 - - - G5 - - - C6 - - - Bb5 - - -', 'A5 - - - - - G5 - F5 - - - - - . .',
          'C5 - - - A5 - - - G5 - A5 - F5 - - -', 'D5 - - - Bb5 - - - Db6 - - - Bb5 - - -', 'A5 - - - C6 - - - G5 - - - E5 - G5 -', 'F5 - - - - - - - . . . . . . . .',
          'F5 - - - A5 - - - D6 - - - C6 - A5 -', 'Bb5 - - - - - A5 - G5 - - - D5 - - -', 'E5 - - - G5 - - - Bb5 - - - D6 - C6 -', 'A5 - - - - - - - . . . . F#5 - - -',
          'G5 - - - Bb5 - - - D6 - - - Bb5 - G5 -', 'E5 - - - G5 - - - C6 - - - Bb5 - - -', 'A5 - - - C6 - - - Bb5 - - - G5 - - -', 'F5 - - - - - - - . . . . . . . .') },
        { duty: 0.125, vol: 0.009, notes: j(pah('A4', 'C5'), pah('Bb4', 'D5'), ph('Bb4', 'D5'), ph('Bb4', 'E5'), pah('A4', 'C5'),
          pah('A4', 'C5'), ph('Bb4', 'D5'), ph('Bb4', 'Db5'), ph('A4', 'C5'), ph('Bb4', 'E5'), pah('A4', 'C5'),
          pah('A4', 'D5'), pah('Bb4', 'D5'), pah('Bb4', 'E5'), ph('A4', 'C5'), ph('F#4', 'C5'),
          pah('Bb4', 'D5'), pah('Bb4', 'E5'), ph('A4', 'C5'), ph('Bb4', 'E5'), pah('A4', 'C5')) },
        { wave: 'tri', vol: 0.08, notes: j(bh('F2', 'C3'), bh('Bb2', 'F2'), bh('G2', 'C3'), bh('F2', 'C3'), bh('F2', 'C3'), bh('Bb2', 'Db3'), bh('A2', 'C3'), bh('F2', 'C3'),
          bh('D3', 'A2'), bh('G2', 'D3'), bh('C3', 'G2'), bh('F2', 'D3'), bh('G2', 'D3'), bh('C3', 'E2'), bh('A2', 'C3'), bh('F2', 'C3')) },
        { noise: 1, vol: 0.006, notes: r('. . . . x . x . . . . . x . . .', 16) }
      ]
    },
    // level clear, Christmas-style: the same length and shape as `clear`
    // (played once, then the game carries on), but the sleigh bells shake
    // the whole way, the run up the G chord lands on a ringing top G, and
    // the thin voice sings along a third below like a second carol singer
    xclear: {
      step: 0.09, once: true, ms: 2600,
      tracks: [
        { duty: 0.25, vol: 0.03, notes: 'D6 . B5 . G5 . D6 - G6 - - - E6 . F#6 . G6 - - - - - - - - - - - . . . .' },
        { duty: 0.125, vol: 0.015, notes: 'B5 . G5 . D5 . B5 - D6 - - - C6 . C6 . B5 - - - - - - - - - - - . . . .' },
        { wave: 'tri', vol: 0.1, notes: 'G2 . D3 . G2 . G3 - C3 - - - C3 . D3 . G2 - - - - - - - - - - - . . . .' },
        { noise: 1, vol: 0.012, notes: 'x x x x x x x x x . x . x . x . x x x x x x x x x x x x . . . .' }
      ]
    },
    // Harbour Lights: St Peter Port on Christmas Eve morning, as a jig in D
    // (6/8, so twelve steps to a bar, two big beats of three). The tune
    // bobs like boats at their moorings, hopping up to the top D and
    // back; then a sea-shanty swing through B minor and E minor, holding
    // its long notes like a sailor's 'heave'. The squeezebox on the quay
    // puffs the chord on the little beats, the bass rolls root and fifth,
    // the sleigh bells jingle in sixes, and the ship's bell rings twice at
    // the end of each half
    stpeterport: {
      step: 0.08,
      tracks: [
        { duty: 0.25, vol: 0.026, notes: j('A5 - F#5 - A5 - D6 - - - A5 -', 'B5 - G5 - B5 - D6 - - - B5 -', 'C#6 - B5 - A5 - E6 - D6 - C#6 -', 'D6 - - - A5 - F#5 - - - D5 -',
          'F#5 - A5 - D6 - F#6 - - - D6 -', 'G6 - - - E6 - B5 - - - G5 -', 'E6 - C#6 - A5 - G5 - E5 - C#5 -', 'D5 - - - F#5 - D6 - - - . .',
          'F#6 - - - - - D6 - - - B5 -', 'G6 - - - - - D6 - - - B5 -', 'B5 - - - E6 - G6 - - - E6 -', 'C#6 - - - E6 - A6 - - - G6 -',
          'F#6 - - - D6 - A5 - - - F#5 -', 'G5 - A5 - B5 - D6 - - - G6 -', 'E6 - F#6 - G6 - C#6 - - - E6 -', 'D6 - - - - - A5 - - - . .') },
        { duty: 0.125, vol: 0.01, notes: j(j6('F#4', 'A4'), j6('G4', 'B4'), j6('A4', 'C#5'), j6('F#4', 'A4'), j6('F#4', 'A4'), '. . G4 . B4 . . . E4 . G4 .', j6('G4', 'C#5'), '. . F#4 . A4 . D6 . D6 . . .',
          j6('F#4', 'B4'), j6('G4', 'B4'), j6('E4', 'G4'), j6('G4', 'C#5'), j6('F#4', 'A4'), j6('G4', 'B4'), j6('G4', 'C#5'), '. . F#4 . A4 . D6 . D6 . . .') },
        { wave: 'tri', vol: 0.09, notes: j(b6('D3', 'A2'), b6('G2', 'D3'), b6('A2', 'E3'), b6('D3', 'A2'), b6('D3', 'F#2'), b6('G2', 'E2'), b6('A2', 'C#3'), b6('D3', 'A2'),
          b6('B2', 'F#2'), b6('G2', 'D3'), b6('E2', 'B2'), b6('A2', 'C#3'), b6('F#2', 'A2'), b6('G2', 'B2'), b6('A2', 'E2'), 'D3 - - - - . A2 - - D2 - .') },
        { noise: 1, vol: 0.009, notes: r('x . x x x .', 32) },
        { noise: 0, vol: 0.011, notes: j(r('x . . . . . X . . . . .', 7), 'x . . x . . X . X . X X', r('x . . . . . X . . . . .', 7), 'X . X . X . X X X X X X') }
      ]
    },
    // Frosty Morning in Candie Gardens: a music box playing O TANNENBAUM
    // (O Christmas Tree; public domain, a German folk tune, words by Ernst
    // Anschütz, 1824) as a delicate waltz in C, for the first snow. It
    // starts with four bars of our own: snowflakes drifting down the chord,
    // a bar at a time, until the music box takes up the carol. Every note
    // is plucked and rings away (a low sustain), the comb goes pah-pah on
    // two and three, frost glints high above in the thinnest voice, and the
    // bass just touches the first beat
    candie: (function () {
      var A = j('C5 - - C5 C5 - - - - - D5 -', 'E5 - - E5 E5 - - - - - E5 -', 'D5 - E5 - F5 - - - B4 - - -');
      return {
        step: 0.11,
        tracks: [
          { duty: 0.25, vol: 0.024, sustain: 0.3, notes: j('G5 - - E5 - - C5 - - G4 - -', 'A5 - - F5 - - C5 - - A4 - -', 'F5 - - D5 - - B4 - - G4 - -', 'D5 - - - B4 - - - G4 - - -',
            A, 'D5 - - - C5 - - - G5 - - -', 'G5 - - E5 A5 - - - - - G5 -', 'G5 - - F5 F5 - - - - - F5 -', 'F5 - - D5 G5 - - - - - F5 -', 'F5 - - E5 E5 - - - G4 - - -',
            A, 'D5 - - - C5 - - - . . . .') },
          { duty: 0.125, vol: 0.008, sustain: 0.3, notes: j(pp('E4', 'G4'), pp('F4', 'A4'), pp('F4', 'B4'), pp('F4', 'B4'),
            pp('E4', 'G4'), pp('E4', 'G4'), pp('F4', 'B4'), pp('E4', 'G4'), pp('E4', 'G4'), pp('F4', 'B4'), pp('F4', 'B4'), pp('E4', 'G4'),
            pp('E4', 'G4'), pp('E4', 'G4'), pp('F4', 'B4'), pp('E4', 'G4')) },
          { duty: 0.125, vol: 0.007, sustain: 0.2, notes: j(tw('E6', 'G6', 'C7'), tw('F6', 'A6', 'C7'), tw('D6', 'F6', 'B6'), tw('B5', 'D6', 'G6'),
            tw('E6', 'G6', 'C7'), tw('G6', 'C7', 'E6'), tw('D6', 'F6', 'B6'), tw('E6', 'G6', 'C7'), tw('E6', 'G6', 'C7'), tw('D6', 'F6', 'B6'), tw('F6', 'B6', 'D7'), tw('E6', 'G6', 'C7'),
            tw('E6', 'G6', 'C7'), tw('G6', 'C7', 'E6'), tw('D6', 'F6', 'B6'), tw('E6', 'G6', 'C7')) },
          { wave: 'tri', vol: 0.08, notes: j(oom('C3'), oom('F2'), oom('G2'), oom('G2'),
            oom('C3'), oom('E2'), oom('G2'), 'G2 - - . C3 - - . . . . .', oom('C3'), oom('G2'), oom('B2'), oom('C3'),
            oom('C3'), oom('E2'), oom('G2'), 'G2 - - . C3 - - . . . . .') },
          { noise: 1, vol: 0.005, notes: r('. . . . . . . . x . . .', 16) }
        ]
      };
    })(),
    // The Noon-Day Gun at Castle Cornet: a brass-band march in B flat. The
    // cornets strut in dotted pairs (ta-TUM) up the chord and each phrase
    // climbs higher; the second bar stops short and leaves a gap, so the
    // castle can fill it. E flat turns to E flat minor for a wink, and then,
    // like every proper march, the trio: a big singing tune in E flat, the
    // key a fourth up, before C seven and F seven march it back. A second
    // cornet doubles the tune an octave down, the horns go 'pah' on the
    // off-beats, the tuba goes OOM on every beat, and the side drum rattles
    // and rolls at the end of every four bars
    cornet: (function () {
      var tune = j('F5 - - F5 Bb5 - - - D6 - - - Bb5 - - -', 'C6 - - - A5 - - - F5 - - - . . . .', 'Bb5 - - Bb5 D6 - - - F6 - - - D6 - Bb5 -', 'G5 - - G5 C6 - - - E6 - - - F6 - - -',
        'F5 - - F5 Bb5 - - - D6 - - - Bb5 - - -', 'Eb6 - - Eb6 G6 - - - Gb6 - - - Eb6 - - -', 'D6 - - D6 F6 - - - Eb6 - - - C6 - A5 -', 'Bb5 - - - F5 - - - Bb5 - - - . . . .',
        'G5 - - - - - Bb5 - Eb6 - - - - - D6 -', 'C6 - - - - - Ab5 - Eb5 - - - F5 - G5 -', 'Ab5 - - - - - F5 - D5 - - - Eb5 - F5 -', 'G5 - - - - - Eb5 - Bb4 - - - . . . .',
        'G5 - - - - - Bb5 - Eb6 - - - G6 - - -', 'G6 - - - - - E6 - C6 - - - Bb5 - - -', 'A5 - - - - - C6 - F6 - - - Eb6 - - -', 'Eb6 - - - C6 - - - A5 - - - . . . .');
      var MARCH = 'X . . x X . . . X . . x X . x x', ROLL = 'X x X x X x X x X X X X X . . .';
      return {
        step: 0.1,
        tracks: [
          { duty: 0.25, vol: 0.025, notes: tune },
          { duty: 0.5, vol: 0.009, notes: oct(tune, -1) },
          { duty: 0.125, vol: 0.008, notes: j(pah('F4', 'Bb4'), pah('F4', 'A4'), pah('F4', 'Bb4'), ph('G4', 'Bb4'), ph('F4', 'A4'), pah('F4', 'Bb4'), ph('G4', 'Bb4'), ph('Gb4', 'Bb4'), ph('F4', 'Bb4'), ph('Eb4', 'A4'), pah('F4', 'Bb4'),
            pah('G4', 'Bb4'), pah('Ab4', 'C5'), pah('F4', 'Ab4'), pah('G4', 'Bb4'), pah('G4', 'Bb4'), pah('G4', 'Bb4'), ph('A4', 'C5'), ph('A4', 'Eb5'), pah('A4', 'Eb5')) },
          { wave: 'tri', vol: 0.09, notes: j(q4('Bb2', 'F2'), q4('F2', 'C3'), q4('Bb2', 'F2'), 'C3 - . . G2 - . . C3 - . . F2 - . .', q4('Bb2', 'F2'), q4('Eb3', 'Bb2'), 'F2 - . . Bb2 - . . F2 - . . A2 - . .', 'Bb2 - . . F2 - . . Bb2 - . . . . . .',
            q4('Eb3', 'Bb2'), q4('Ab2', 'Eb3'), q4('Bb2', 'F2'), 'Eb3 - . . Bb2 - . . Eb2 - . . . . . .', q4('Eb3', 'Bb2'), q4('C3', 'G2'), q4('F2', 'C3'), 'F2 - . . C3 - . . F2 - . . A2 - . .') },
          { noise: 0, vol: 0.012, notes: j(r(MARCH, 3), ROLL, r(MARCH, 3), ROLL, r(MARCH, 3), ROLL, r(MARCH, 3), 'X x X x X x X x X X X X X X X X') }
        ]
      };
    })(),
    // The Green Lanes: a hoedown in A, the fiddle's key, among the cows and
    // the hedge-veg stalls. The fiddle saws away (diddle-dum, a doubled
    // note and a hop), the mandolin chops the off-beats, the cowbell clanks
    // on every beat and the bass goes boom-boom. In the second half the
    // fiddle leans on long notes through F sharp minor, and twice the whole
    // band stops dead for a cow: a long, low, wobbly MOOO (once on E, and
    // once, the punchline, on A)
    lanes: (function () {
      var COW = 'E6 . . . E6 . . . E6 . . . E6 . E6 .', COWQ = 'E6 . . . E6 . . . . . . . . . . .';
      var HD = 'x . x . X . x . x . x . X . x x', MOOD = 'x . x . X . x . . . . . . . . .';
      return {
        step: 0.075,
        tracks: [
          { duty: 0.125, vol: 0.026, vib: true, notes: j('A5 A5 E5 . A5 . C#6 . E6 E6 C#6 . A5 . E5 .', 'F#5 F#5 D5 . F#5 . A5 . D6 D6 A5 . F#5 . D5 .', 'E5 E5 A5 . C#6 . E6 . F#6 . E6 . C#6 . A5 .', 'B5 . G#5 . E5 . G#5 . B5 - - - . . . .',
            'A5 A5 E5 . A5 . C#6 . E6 E6 C#6 . A5 . E5 .', 'F#5 F#5 D5 . F#5 . A5 . D6 D6 F#6 . E6 . D6 .', 'E6 . D6 . B5 . G#5 . E5 . D5 . B4 . G#4 .', 'A5 . E5 . C#5 . E5 . A5 - - - . . . .',
            'C#6 - - - C#6 . B5 . A5 . F#5 . A5 . C#6 .', 'D6 - - - D6 . C#6 . B5 . A5 . F#5 . D5 .', 'E5 . A5 . C#6 . E6 . A6 - - - E6 . C#6 .', 'B5 - - - - - - - E3 - - - - - - .',
            'C#6 - - - C#6 . B5 . A5 . F#5 . A5 . C#6 .', 'D6 - - - F#6 . E6 . D6 . B5 . A5 . F#5 .', 'E5 . G#5 . B5 . D6 . E6 . D6 . B5 . G#5 .', 'A5 - - - - - - - A3 - - - - - - .') },
          { duty: 0.25, vol: 0.009, sustain: 0.3, notes: j(pah('C#5', 'E5'), pah('D5', 'F#5'), pah('C#5', 'E5'), pah('B4', 'E5'), pah('C#5', 'E5'), pah('D5', 'F#5'), pah('B4', 'D5'), pah('C#5', 'E5'),
            pah('C#5', 'F#5'), pah('D5', 'F#5'), pah('C#5', 'E5'), ph('B4', 'E5'), rest(8), pah('C#5', 'F#5'), pah('D5', 'F#5'), pah('B4', 'D5'), ph('C#5', 'E5'), rest(8)) },
          { duty: 0.5, vol: 0.007, sustain: 0.15, notes: j(r(COW, 11), COWQ, r(COW, 3), COWQ) },
          { wave: 'tri', vol: 0.09, notes: j(q4('A2', 'E3'), q4('D3', 'A2'), q4('A2', 'E3'), 'E2 - . . B2 - . . E2 - . . G#2 - . .', q4('A2', 'E3'), q4('D3', 'A2'), 'E2 - . . B2 - . . D3 - . . B2 - . .', 'A2 - . . E2 - . . A2 - . . C#3 - . .',
            q4('F#2', 'C#3'), q4('D3', 'A2'), q4('A2', 'E3'), 'E2 - . . B2 - . . E2 - - - - - - .', q4('F#2', 'C#3'), q4('D3', 'A2'), 'E2 - . . B2 - . . E2 - . . D3 - . .', 'A2 - . . E2 - . . A2 - - - - - - .') },
          { noise: 1, vol: 0.013, notes: j(r(HD, 7), 'x . x . X . x . X . X . X X X X', r(HD, 3), MOOD, r(HD, 3), MOOD) }
        ]
      };
    })(),
    // Saumarez Park, on bikes: a galop in E, the fastest dance there is.
    // The tune rides up the chord two at a time (pedal, pedal) and
    // freewheels all the way down the scale; the thin voice goes 'pah' on
    // every off-beat and the bass on every beat, like legs going round.
    // Then the second half coasts: long notes through C sharp minor while
    // the wheels spin underneath in sixteenths, A turns to A minor for a
    // moment of wheee, and the bicycle bell goes ding-ding at the end of
    // each run
    saumarez: (function () {
      var GD = 'x . X . x . X . x . X . x . X x', GF = 'X . X . X . X . X X X X X X X X';
      var DING = '. . . . . . . . . . . . B6 . B6 .';
      return {
        step: 0.065,
        tracks: [
          { duty: 0.25, vol: 0.026, notes: j('B4 . E5 . G#5 . B5 . E6 . . . B5 . G#5 .', 'A5 . F#5 . D#5 . F#5 . A5 . B5 . F#5 . D#5 .', 'E5 . G#5 . B5 . E6 . G#6 . . . E6 . B5 .', 'A6 G#6 F#6 E6 D#6 C#6 B5 A5 G#5 - - - . . . .',
            'B4 . E5 . G#5 . B5 . E6 . . . B5 . G#5 .', 'C#5 . E5 . A5 . C#6 . E6 . . . C#6 . A5 .', 'G#5 . B5 . E6 . G#6 . F#6 . D#6 . B5 . A5 .', 'G#5 - - - E5 - - - E6 - - - . . . .',
            'E6 - - - - - - - C#6 - - - G#5 - - -', 'A5 - - - - - - - C#6 - - - E6 - - -', 'F#6 - - - - - - - E6 - - - A#5 - - -', 'B5 - - - - - - - A5 . B5 . D#6 . F#6 .',
            'G#6 - - - - - - - E6 - - - C#6 - - -', 'A6 - - - E6 - - - C6 - - - A5 - - -', 'G#5 - - - B5 - - - E6 - - - D#6 - - -', 'E6 - - - - - - - B5 . . . . . . .') },
          { duty: 0.125, vol: 0.01, notes: j(pah('G#4', 'B4'), pah('F#4', 'A4'), pah('G#4', 'B4'), ph('F#4', 'A4'), ph('G#4', 'B4'), pah('G#4', 'B4'), pah('A4', 'C#5'), ph('G#4', 'B4'), ph('F#4', 'A4'), pah('G#4', 'B4'),
            ar('C#5', 'E5', 'G#5'), ar('C#5', 'E5', 'A5'), ar('C#5', 'E5', 'A#5'), ar('B4', 'D#5', 'F#5', 'A5'), ar('C#5', 'E5', 'G#5'), 'C#5 E5 A5 E5 C#5 E5 A5 E5 C5 E5 A5 E5 C5 E5 A5 E5',
            'B4 E5 G#5 E5 B4 E5 G#5 E5 A4 B4 D#5 B4 A4 B4 D#5 B4', ar('B4', 'E5', 'G#5')) },
          { duty: 0.5, vol: 0.011, sustain: 0.2, notes: j(rest(48), DING, rest(48), DING, rest(112), DING) },
          { wave: 'tri', vol: 0.09, notes: j(q4('E2', 'B2'), q4('B2', 'F#2'), q4('E2', 'B2'), 'B2 - . . F#2 - . . E2 - . . G#2 - . .', q4('E2', 'B2'), q4('A2', 'E2'), 'B2 - . . E3 - . . B2 - . . A2 - . .', 'E2 - . . B2 - . . E2 - - - . . . .',
            b8('C#3', 'G#2'), b8('A2', 'E2'), b8('F#2', 'C#3'), b8('B2', 'F#2'), b8('C#3', 'G#2'), 'A2 . E3 . A2 . E3 . A2 . E3 . C3 . E3 .', 'B2 . E3 . B2 . E3 . B2 . F#2 . A2 . B2 .', 'E2 . B2 . E2 . B2 . E2 . . . B1 . . .') },
          { noise: 1, vol: 0.014, notes: j(r(GD, 7), GF, r(GD, 7), GF) }
        ]
      };
    })(),
    // Sunset Bays, Cobo and Vazon going gold: a slow swaying 12/8 in A flat,
    // the warmest key, every step an eighth and every beat three of them,
    // so it rocks like the sea. The tune leans long-short (a wave coming
    // in, a little one after it) and reaches up for the sun; halfway, D flat
    // melts into D flat minor as the sun touches the water. The ukulele
    // strums chk-chk on the small beats, the bass sways on the big ones,
    // and the brushes keep it bouncing softly
    bays: {
      step: 0.15,
      tracks: [
        { duty: 0.5, vol: 0.023, vib: true, notes: j('C5 - Eb5 Ab5 - - G5 - Ab5 C6 - -', 'Bb5 - Ab5 F5 - - C5 - - . . .', 'Db5 - F5 Ab5 - - Bb5 - Ab5 F5 - -', 'G5 - - - - - Eb5 - - . . .',
          'C5 - Eb5 Ab5 - - G5 - Ab5 C6 - -', 'Bb5 - C6 Db6 - - C6 - Bb5 G5 - -', 'Ab5 - Db6 F6 - - E6 - Db6 Ab5 - -', 'G5 - - Bb5 - - Ab5 - - - . .',
          'C6 - - - - - Ab5 - F5 C6 - -', 'Db6 - - - - - Ab5 - F5 Db6 - -', 'Db6 - C6 Bb5 - - G5 - Ab5 Bb5 - -', 'C6 - - - - - Ab5 - - Eb5 - -',
          'F5 - Ab5 C6 - - Eb6 - C6 Ab5 - -', 'Bb5 - Db6 F6 - - Eb6 - Db6 Bb5 - -', 'Eb6 - - Db6 - - Bb5 - - G5 - -', 'Ab5 - - - - - - - - . . .') },
        { duty: 0.125, vol: 0.008, sustain: 0.3, notes: j(tr('Eb4', 'Ab4'), tr('F4', 'Ab4'), tr('F4', 'Ab4'), tr('G4', 'Db5'), tr('Eb4', 'Ab4'), tr('E4', 'Bb4'), '. F4 Ab4 . F4 Ab4 . E4 Ab4 . E4 Ab4', '. G4 Db5 . G4 Db5 . Eb4 Ab4 . Eb4 Ab4',
          tr('F4', 'Ab4'), tr('F4', 'Ab4'), '. F4 Db5 . F4 Db5 . G4 Db5 . G4 Db5', tr('Eb4', 'Ab4'), tr('F4', 'C5'), tr('F4', 'Db5'), tr('G4', 'Db5'), tr('Eb4', 'Ab4')) },
        { wave: 'tri', vol: 0.08, notes: j(b6('Ab2', 'Eb2'), b6('F2', 'C3'), b6('Db3', 'Ab2'), b6('Eb2', 'Bb2'), b6('Ab2', 'Eb2'), b6('C3', 'E2'), b6('Db3', 'Db3'), b6('Eb2', 'Ab2'),
          b6('F2', 'C3'), b6('Db3', 'Ab2'), b6('Bb2', 'Eb2'), b6('Ab2', 'Eb3'), b6('F2', 'C3'), b6('Bb2', 'F2'), b6('Eb2', 'Bb2'), 'Ab2 - - - - . Eb3 - - Eb2 - .') },
        { noise: 1, vol: 0.007, notes: r('x . . X . . x . . X . .', 16) }
      ]
    },
    // The Cup and Saucer, Fort Grey at dusk: a sea shanty in D minor, but
    // the Dorian kind, with a bright B natural that keeps winking at you,
    // so it's an adventure, never a fright. Each line is a call (a pickup
    // and a long 'heave') answered a step lower, and the crew stamp on one
    // and three and clap on two and four. The second half finds the
    // treasure: it sails off into F major, and gold glints high up in the
    // thin voice, before the lighthouse brings it round again. Twice, at
    // the end of a verse, the squeezebox sneaks in a cheeky 'yo-HO'
    fortgrey: (function () {
      var SD = 'x . . . X . . . x . . . X . . .', SF = 'x . . . X . . . X . X . X X X X';
      var a = 'A4 . D5 - - - D5 . D5 - E5 - F5 - D5 -', b = 'G4 . C5 - - - C5 . C5 - D5 - E5 - C5 -';
      return {
        step: 0.095,
        tracks: [
          { duty: 0.25, vol: 0.026, notes: j(a, b, 'F5 - - - A5 - - - B5 - - - A5 - G5 -', 'A5 - - - E5 - C#5 - D5 - - - . . . .',
            a, b, 'D6 - - - Bb5 - - - A5 - G5 - F5 - E5 -', 'D5 - - - A4 - - - D5 - - - . . . .',
            'C6 - - - - - A5 - F5 - - - A5 - C6 -', 'E6 - - - - - C6 - G5 - - - C6 - E6 -', 'F6 - - - D6 - Bb5 - D6 - F6 - D6 - Bb5 -', 'A5 - - - - - E6 - C#6 - - - A5 - - -',
            'D6 - - - A5 - - - F5 - - - D5 - - -', 'B5 - - - G5 - - - D5 - - - B4 - - -', 'Bb5 - - - G5 - - - A5 - - - C#6 - E6 -', 'D6 - - - - - - - . . . . . . . .') },
          { duty: 0.125, vol: 0.009, notes: j(pah('F4', 'A4'), pah('E4', 'G4'), ph('F4', 'A4'), ph('G4', 'B4'), ph('E4', 'G4'), ph('F4', 'A4'),
            pah('F4', 'A4'), pah('E4', 'G4'), ph('F4', 'Bb4'), ph('E4', 'G4'), ph('F4', 'A4'), '. . . . A5 . D6 .',
            spark('F6', 'A6', 'C7', 'A6'), spark('E6', 'G6', 'C7', 'G6'), spark('F6', 'Bb6', 'D7', 'Bb6'), spark('E6', 'A6', 'C#7', 'G6'),
            spark('D6', 'F6', 'A6', 'F6'), spark('D6', 'G6', 'B6', 'G6'), spark('D6', 'G6', 'A6', 'E6'), 'D6 . F6 . . A6 . . . . . . A5 . D6 .') },
          { wave: 'tri', vol: 0.09, notes: j(q4('D3', 'A2'), q4('C3', 'G2'), 'D3 - . . A2 - . . G2 - . . D3 - . .', 'A2 - . . E2 - . . D3 - . . A2 - . .',
            q4('D3', 'A2'), q4('C3', 'G2'), 'Bb2 - . . F2 - . . A2 - . . A2 - . .', 'D3 - . . A2 - . . D2 - . . . . . .',
            q4('F2', 'C3'), q4('C3', 'G2'), q4('Bb2', 'F2'), q4('A2', 'E2'), q4('D3', 'A2'), q4('G2', 'D3'), 'Bb2 - . . F2 - . . A2 - . . C#3 - . .', 'D3 - . . A2 - . . D2 - . . . . . .') },
          { noise: 0, vol: 0.012, notes: j(r(SD, 7), SF, r(SD, 7), SF) }
        ]
      };
    })(),
    // Town Lights: St Peter Port as the Christmas lights come on, so the
    // most Christmassy tune in the game. DECK THE HALLS (public domain, a
    // Welsh carol, 'Nos Galan') played by a swing band in F: three steps to
    // a beat, the 'and' late (long-short), a sax-ish lead with a wobble, a
    // walking bass a note a beat, brass stabs on two and four, and sleigh
    // bells on the swung eighths. After the carol, eight bars of our own,
    // the shout chorus: riffs that jump up the B flat chord, flicker to B
    // flat minor, and brighten to D major, like the lights coming on one
    // street after another, before a turnaround back to the carol
    townlights: (function () {
      var deck = j('C6 - - - - Bb5 A5 - - G5 - -', 'F5 - - G5 - - A5 - - F5 - -', 'G5 - A5 Bb5 - G5 A5 - - - - G5', 'F5 - - E5 - - F5 - - - . .');
      var SN = '. . . X . . . . . X . .', SNF = '. . . X . . X . X X X X';
      return {
        step: 0.125,
        tracks: [
          { duty: 0.5, vol: 0.024, vib: true, notes: j(deck, deck,
            'G5 - - - - A5 Bb5 - - G5 - -', 'A5 - - - - Bb5 C6 - - G5 - -', 'A5 - B5 C6 - - D6 - E6 F6 - -', 'E6 - - D6 - - C6 - - - . .',
            'C6 - - - - Bb5 A5 - - G5 - -', 'F5 - - G5 - - A5 - - F5 - -', 'D6 - D6 D6 - D6 C6 - - - - Bb5', 'A5 - - G5 - - F5 - - - . .',
            'F5 - Bb5 D6 - F6 . . D6 F6 - -', 'F5 - Bb5 Db6 - F6 . . Db6 F6 - -', 'A6 - - - - F6 C6 - - A5 - -', 'F#6 - - - - D6 A5 - - F#5 - -',
            'G5 - Bb5 D6 - F6 . . D6 F6 - -', 'E6 - - - - G6 Bb6 - - G6 - -', 'F6 - - A6 - - D6 - - F#6 - -', 'D6 - - C6 - - Bb5 - - G5 - -') },
          { duty: 0.25, vol: 0.009, notes: j(r(j(sw('A4', 'C5'), sw('A4', 'C5'), sw('E4', 'Bb4'), sw('Bb4', 'A4')), 2),
            sw('E4', 'Bb4'), sw('A4', 'Bb4'), sw('A4', 'B4'), sw('E4', 'G4'), sw('A4', 'C5'), sw('A4', 'C5'), sw('F4', 'Bb4'), sw('Bb4', 'A4'),
            sw('Bb4', 'D5'), sw('Bb4', 'Db5'), sw('A4', 'C5'), sw('F#4', 'C5'), sw('Bb4', 'F4'), sw('Bb4', 'E4'), sw('A4', 'F#4'), sw('F4', 'E4')) },
          { wave: 'tri', vol: 0.085, notes: j(r(j(walk('F2', 'A2', 'C3', 'A2'), walk('F2', 'G2', 'A2', 'Bb2'), walk('C3', 'Bb2', 'A2', 'C3'), walk('F2', 'C3', 'F2', 'C2')), 2),
            walk('C3', 'E3', 'G2', 'Bb2'), walk('F2', 'A2', 'C3', 'C2'), walk('F2', 'D2', 'G2', 'B2'), walk('C3', 'E3', 'G2', 'E2'),
            walk('F2', 'A2', 'C3', 'A2'), walk('F2', 'G2', 'A2', 'C3'), walk('Bb2', 'D3', 'C3', 'E2'), walk('F2', 'C3', 'F2', 'A2'),
            walk('Bb2', 'D3', 'F3', 'D3'), walk('Bb2', 'Db3', 'F3', 'Db3'), walk('F2', 'A2', 'C3', 'A2'), walk('D3', 'F#2', 'A2', 'C3'),
            walk('G2', 'Bb2', 'D3', 'Bb2'), walk('C3', 'E3', 'G2', 'Bb2'), walk('A2', 'F2', 'D3', 'F#2'), walk('G2', 'D3', 'C3', 'E2')) },
          { noise: 1, vol: 0.009, notes: r('x . x x . x x . x x . x', 24) },
          { noise: 0, vol: 0.008, notes: j(r(SN, 7), SNF, r(SN, 7), SNF, r(SN, 7), SNF) }
        ]
      };
    })(),
    // Shell Beach, Herm by moonlight: a lullaby in E flat with a gentle
    // groove. The tune rises slowly like the moon over the water and drifts
    // down, a whole bar to breathe in between; A flat turns to A flat minor
    // (the C flat) for the hush, and the middle bit plays like the seals
    // bobbing up. Stars twinkle in the thinnest voice, plucked and fading,
    // and the bass rocks three, three, two, the lilt of a boat at anchor,
    // with the softest tap to match
    herm: (function () {
      var hb = function (a, b, c) { return a + ' - - - - . ' + b + ' - - - - . ' + (c || a) + ' - - .'; };
      return {
        step: 0.14,
        tracks: [
          { duty: 0.5, vol: 0.022, vib: true, notes: j('G5 - - - - - Bb5 - - - - - Eb6 - - -', 'D6 - - - - - C6 - - - - - G5 - - -', 'Ab5 - - - - - C6 - - - - - Eb6 - - -', 'D6 - - - C6 - Bb5 - - - - - . . . .',
            'G5 - - - - - Bb5 - - - - - G6 - - -', 'F6 - - - - - Eb6 - - - - - B5 - - -', 'Bb5 - - - - - G5 - - - - - Ab5 - F5 -', 'Eb5 - - - - - - - - - - - . . . .',
            'C6 - - - Eb6 - - - Ab6 - - - G6 - Eb6 -', 'F6 - - - - - D6 - B5 - - - G5 - - -', 'Ab5 - - - C6 - - - Eb6 - - - D6 - C6 -', 'Bb5 - - - - - - - G5 - - - F5 - - -') },
          { duty: 0.125, vol: 0.008, sustain: 0.25, notes: j(spark('Eb6', 'G6', 'Bb6', 'Eb7'), spark('C6', 'Eb6', 'G6', 'C7'), spark('C6', 'Eb6', 'Ab6', 'C7'), spark('D6', 'F6', 'Ab6', 'Bb6'),
            spark('Eb6', 'G6', 'Bb6', 'Eb7'), spark('Eb6', 'Ab6', 'Eb7', 'Ab6'), spark('Bb5', 'Eb6', 'G6', 'D6'), spark('Eb6', 'G6', 'Bb6', 'Eb7'),
            spark('C6', 'Eb6', 'Ab6', 'C7'), spark('B5', 'D6', 'G6', 'F6'), spark('C6', 'F6', 'Ab6', 'D6'), spark('Bb5', 'Eb6', 'G6', 'F6')) },
          { wave: 'tri', vol: 0.08, notes: j(hb('Eb2', 'Bb2'), hb('C3', 'G2'), hb('Ab2', 'Eb3'), hb('Bb2', 'F2'), hb('Eb2', 'Bb2'), hb('Ab2', 'Eb3'), hb('Bb2', 'F2'), hb('Eb2', 'Bb2'),
            hb('Ab2', 'Eb3'), hb('G2', 'D3', 'B2'), hb('F2', 'Bb2', 'Bb2'), hb('Eb2', 'Bb2')) },
          { noise: 1, vol: 0.006, notes: r('x . . . . . x . . . . . x . . .', 12) }
        ]
      };
    })(),
    // Sark by Starlight: no cars, just a horse and cart under more stars
    // than you've ever seen. C major with a sharpened fourth (the F sharp
    // of a D chord over C), the sound of wonder; the tune looks up and
    // holds its breath. The horse trots all the way (clip-clop, a woodblock
    // made from the softest wave, played short), stars blink high above,
    // and at the end of each half a shooting star streaks down the sky. In
    // the middle, crossing La Coupée, the chords climb A flat, B flat, C,
    // and F turns to F minor, as if the whole sky just went 'ooh'
    sark: (function () {
      var SHOOT = 'E7 D7 C7 B6 A6 G6 F#6 E6 D6 C6 B5 A5 G5 . . .', SHOOT2 = 'C7 B6 A6 G6 F6 E6 D6 C6 B5 A5 G5 F5 E5 . . .';
      return {
        step: 0.105,
        tracks: [
          { duty: 0.5, vol: 0.022, vib: true, notes: j('E5 - - - G5 - - - C6 - - - - - B5 -', 'A5 - - - - - F#5 - D5 - - - - - . .', 'E5 - - - G5 - - - C6 - - - E6 - - -', 'F#6 - - - - - E6 - D6 - - - B5 - - -',
            'C6 - - - - - B5 - A5 - - - E5 - - -', 'F5 - - - A5 - - - C6 - - - F6 - - -', 'E6 - - - D6 - - - C6 - - - B5 - D6 -', 'C6 - - - - - - - . . . . . . . .',
            'C6 - - - - - Eb6 - - - - - Ab6 - - -', 'D6 - - - - - F6 - - - - - Bb6 - - -', 'G6 - - - - - - - E6 - - - C6 - - -', 'F#6 - - - - - - - D6 - - - A5 - - -',
            'A5 - - - C6 - - - F6 - - - E6 - - -', 'Ab5 - - - C6 - - - F6 - - - Eb6 - - -', 'E6 - - - G6 - - - F6 - - - D6 - - -', 'C6 - - - - - - - . . . . . . . .') },
          { duty: 0.125, vol: 0.008, sustain: 0.3, notes: j(spark('E6', 'G6', 'C7', 'B6'), spark('D6', 'F#6', 'A6', 'C7'), spark('E6', 'G6', 'C7', 'G6'), spark('D6', 'F#6', 'A6', 'B6'),
            spark('C6', 'E6', 'A6', 'E6'), spark('C6', 'F6', 'A6', 'F6'), spark('D6', 'F6', 'A6', 'B6'), SHOOT,
            spark('C6', 'Eb6', 'Ab6', 'C7'), spark('D6', 'F6', 'Bb6', 'D7'), spark('E6', 'G6', 'C7', 'G6'), spark('D6', 'F#6', 'A6', 'C7'),
            spark('C6', 'F6', 'A6', 'E6'), spark('C6', 'F6', 'Ab6', 'Eb6'), spark('E6', 'G6', 'C7', 'F6'), SHOOT2) },
          { wave: 'tri', vol: 0.08, notes: j(q4('C3', 'G2'), q4('C3', 'A2'), q4('C3', 'G2'), 'C3 - . . A2 - . . G2 - . . D3 - . .', q4('A2', 'E2'), q4('F2', 'C3'), 'D3 - . . A2 - . . G2 - . . B2 - . .', 'C3 - . . G2 - . . C2 - - - . . . .',
            q4('Ab2', 'Eb3'), q4('Bb2', 'F2'), q4('C3', 'G2'), q4('C3', 'A2'), q4('F2', 'C3'), q4('F2', 'Ab2'), 'G2 - . . D3 - . . G2 - . . B2 - . .', 'C3 - . . G2 - . . C2 - - - . . . .') },
          { wave: 'tri', vol: 0.03, sustain: 0.05, notes: r('G5 . . C6 . . . . G5 . . C6 . . . .', 16) }
        ]
      };
    })(),
    // Grabby Gus, the greediest gull in Guernsey, at the top of Sark's
    // cliffs: a cheeky chase in C, silly from start to finish. A kazoo (the
    // thinnest, buzziest wave, wobbling) plays Gus's taunt, the playground
    // 'nyah-nyah nyah-nyah-nyah', then blows a raspberry (a quick trill a
    // semitone off); the tuba oom-pahs and the xylophone plinks. Then the
    // chase: A minor, scampering sixteenths and a tumble down the scale.
    // Then Gus gets dizzy: everything slides down a semitone at a time,
    // tuba too, while stars go round his head (stomp him now!), a big leap
    // up, and the taunt again, cheekier, with a ta-da to finish
    gusboss: (function () {
      var GA = 'x . x . X . x . x . x . X . x x', GC = 'x x X x x x X x x x X x x x X x', GDZ = '. . . . X . . . . . . . X . . .';
      var nyah = 'G5 - - G5 E5 - - - A5 - G5 - E5 - - -';
      return {
        step: 0.075,
        tracks: [
          { duty: 0.125, vol: 0.025, vib: true, notes: j(nyah, 'G5 - - G5 E5 - - - A5 - G5 - Db5 C5 Db5 C5', 'A5 - - A5 F5 - - - Bb5 - A5 - F5 - - -', 'B5 - - B5 G5 - - - C6 - B5 - G5 F5 E5 D5',
            'A5 B5 C6 A5 E6 . E6 . A5 B5 C6 A5 E6 . E6 .', 'D6 E6 F6 D6 A6 . A6 . D6 E6 F6 D6 A6 . G6 F6', 'E6 F6 E6 D#6 E6 . B5 . G#5 A5 G#5 F#5 E5 . . .', 'A5 . E5 . C5 . A4 . G#4 . B4 . E5 . G#5 .',
            'C6 - - - B5 - - - Bb5 - - - A5 - - -', 'Ab5 - - - G5 - - - Gb5 - - - F5 - - -', 'E5 . G5 . C6 . E6 . G6 - - - . . . .', 'F6 . D6 . B5 . G5 . D6 - B5 - G5 - - -',
            nyah, 'E6 - - E6 C6 - - - D6 - C6 - A5 - - -', 'F5 . A5 . C6 . F6 . G6 . F6 . D6 . B5 .', 'C6 . . . G5 . . . C5 . . . . . . .') },
          { duty: 0.25, vol: 0.01, sustain: 0.3, notes: j(pah('E4', 'G4'), ph('E4', 'G4'), ph('F4', 'B3'), pah('F4', 'A4'), pah('F4', 'B3'),
            ar('A4', 'C5', 'E5'), ar('A4', 'D5', 'F5'), ar('G#4', 'B4', 'E5', 'D5'), 'A4 C5 E5 C5 A4 C5 E5 C5 G#4 B4 E5 B4 G#4 B4 E5 B4',
            ar('E6', 'G6', 'C7'), ar('F6', 'Ab6', 'C7'), pah('E4', 'G4'), pah('F4', 'B3'),
            pah('E4', 'G4'), pah('E4', 'A4'), ph('F4', 'A4'), ph('F4', 'B3'), 'E5 . . . D5 . . . E5 . . . . . . .') },
          { wave: 'tri', vol: 0.09, notes: j(q4('C3', 'G2'), 'C3 - . . G2 - . . G2 - . . B2 - . .', q4('F2', 'C3'), 'G2 - . . D3 - . . G2 - . . B2 - . .',
            b8('A2', 'E3'), b8('D3', 'A2'), b8('E2', 'B2'), 'A2 . E3 . A2 . E3 . E2 . B2 . E2 . G#2 .',
            'C3 - - - B2 - - - Bb2 - - - A2 - - -', 'Ab2 - - - G2 - - - Gb2 - - - F2 - - -', q4('G2', 'C3'), 'G2 - . . D3 - . . G2 - . . B2 - . .',
            q4('C3', 'G2'), q4('A2', 'E3'), 'F2 - . . C3 - . . G2 - . . D3 - . .', 'C3 - . . G2 - . . C2 - . . . . . .') },
          { noise: 1, vol: 0.013, notes: j(r(GA, 4), r(GC, 4), r(GDZ, 3), 'X . X . X . X . X X X X X X X X', r(GA, 3), 'X . . . X . . . X . . . . . . .') }
        ]
      };
    })(),
    // Over the Rooftops: the finale, flying Father Christmas's sleigh at
    // midnight. The Sleigh Theme at last, for real, a tone higher in A so
    // it soars, with the reindeer galloping underneath (ba-da-dum) and the
    // sleigh bells going like mad. Then above the clouds: long notes
    // climbing up to a top B over a big E chord, a C sharp seven that
    // shines, and the thin voice doubling the tune. Then the chimneys: a
    // present whizzes down the scale, lands with a plop, and a window lights
    // up with a ding, three times, and the sleigh climbs away again
    rooftops: (function () {
      var B = j('C#6 - - - - - - - F#6 - - - - - E6 -', 'F#6 - - - - - - - D6 - - - A5 - D6 -', 'E6 - - - - - - - G#6 - - - B6 - - -', 'A6 - - - - - - - - - - - E6 - C#6 -',
        'D6 - - - - - - - F#6 - - - A6 - - -', 'G#6 - - - - - - - F6 - - - C#6 - - -', 'D6 - - - F#6 - - - E6 - - - D6 - B5 -', 'B5 - - - - - - - . . E6 . D6 . B5 .');
      var PLOP = 'x . . . . . . . X . . . . . . .';
      return {
        step: 0.085,
        tracks: [
          { duty: 0.25, vol: 0.026, notes: j(SLEIGH_A.join(' '), B,
            'E6 D6 C#6 B5 A5 G#5 F#5 E5 A4 . . . . . A6 .', 'F#6 E6 D6 C#6 B5 A5 G#5 F#5 D5 . . . . . D6 .', 'D#6 C#6 B5 A5 G#5 F#5 E5 D#5 B4 . . . . . B5 .', 'E5 . G#5 . B5 . D6 . E6 - - - G#5 - - -') },
          { duty: 0.5, vol: 0.01, notes: j(SLEIGH_ARP_A.join(' '), oct(B, -1), pah('C#5', 'E5'), pah('D5', 'F#5'), pah('D#5', 'A5'), pah('G#4', 'D5')) },
          { wave: 'tri', vol: 0.09, notes: j(SLEIGH_GAL_A.join(' '),
            b8('F#2', 'C#3'), b8('D3', 'A2'), b8('E2', 'B2'), b8('A2', 'E3'), b8('D3', 'A2'), b8('C#3', 'G#2'), 'B2 . F#2 . B2 . F#2 . E2 . B2 . E2 . B2 .', b8('E2', 'B2'),
            q4('A2', 'E2'), q4('D3', 'A2'), q4('B2', 'F#2'), 'E2 . E2 . E2 . E2 . E2 E2 E2 E2 E2 . B2 .') },
          { noise: 1, vol: 0.01, notes: r(BELLS, 20) },
          { noise: 0, vol: 0.012, notes: j(r(BACK, 7), FILL, r(BACK, 7), FILL, r(PLOP, 3), 'X . X . X . X . X X X X X X X X') }
        ]
      };
    })(),
    // Christmas morning, everyone together, then the credits: a little suite
    // of four parts, about a minute and a quarter, so it can play under the
    // whole ending before it comes round again.
    //  1. Morning: the Sleigh Theme on a music box, slow and glowing, with
    //     a soft bass and the bells barely jingling (the last note leads in).
    //  2. WE WISH YOU A MERRY CHRISTMAS (public domain, an English West
    //     Country carol), a waltz, so twelve steps to a bar: sung once
    //     gently over oom-pah-pah, then again with everyone joining in, the
    //     music box an octave up, the bass fuller and the drum in.
    //  3. The credits: a new bouncy tune in G over a choir's long 'ooh's,
    //     the bells back, C turning to C minor once, and an E seven at the
    //     end that lifts the key...
    //  4. ...up a tone to A for the Sleigh Theme in triumph, the whole band
    //     and the galloping reindeer, D to D minor, and a last long chord
    //     with the bells shaking and a sparkle running up to the top
    xending: (function () {
      var WW = j('G5 - - - G5 - A5 - G5 - F#5 -', 'E5 - - - E5 - - - E5 - - -', 'A5 - - - A5 - B5 - A5 - G5 -', 'F#5 - - - D5 - - - D5 - - -',
        'B5 - - - B5 - C6 - B5 - A5 -', 'G5 - - - E5 - - - D5 - D5 -', 'E5 - - - A5 - - - F#5 - - -');
      var WALTZ = j(pp('B4', 'D5'), pp('C5', 'E5'), pp('C#5', 'E5'), pp('A4', 'D5'), pp('A4', 'D#5'), pp('B4', 'E5'), pp('A4', 'C5'), pp('B4', 'D5'));
      var oomp = function (a, b) { return a + ' - - . ' + b + ' - . . ' + b + ' - . .'; };
      var CREDITS = j('D5 . G5 . B5 . G5 . D6 - - - B5 . G5 .', 'E5 . G5 . C6 . G5 . E6 - - - C6 . G5 .', 'F#5 . A5 . D6 - - - C6 . A5 . F#5 . A5 .', 'B5 - - - G5 - - - D5 - - - . . . .',
        'D5 . G5 . B5 . G5 . D6 - - - B5 . G5 .', 'E5 . G5 . C6 . G5 . Eb6 - - - C6 . G5 .', 'B5 - - - D6 - - - C6 - - - A5 - F#5 -', 'G#5 - - - B5 - - - D6 - - - E6 - - -');
      return {
        step: 0.12,
        tracks: [
          // the music box: the morning theme, the waltz's pah-pah, the carol an octave up, one last ding
          { duty: 0.25, vol: 0.02, sustain: 0.3, notes: j(SLEIGH.slice(0, 7).join(' '), 'G6 - - - - - - - D6 . B5 . G5 . . .',
            WALTZ, oct(j(WW, 'G5 - - - - - - - . . . .'), 1), rest(128), rest(144), 'A6 - - - - - - - . . . . . . . .') },
          // the thin voice: soft off-beats, then pah-pah, the credits' sparkle and the finale's
          { duty: 0.125, vol: 0.009, notes: j(pah('B4', 'D5'), pah('C5', 'E5'), ph('B4', 'D5'), ph('B4', 'E5'), ph('C#5', 'E5'), ph('C5', 'F#5'), pah('B4', 'D5'), ph('C5', 'E5'), ph('C5', 'Eb5'), ph('B4', 'D5'), ph('C5', 'F#5'), pah('B4', 'D5'),
            rest(96), WALTZ,
            ar('G4', 'B4', 'D5'), ar('G4', 'C5', 'E5'), ar('F#4', 'A4', 'C5', 'D5'), ar('G4', 'B4', 'D5'), ar('G4', 'B4', 'D5'), 'G4 C5 E5 C5 G4 C5 E5 C5 G4 C5 Eb5 C5 G4 C5 Eb5 C5',
            'G4 B4 D5 B4 G4 B4 D5 B4 F#4 A4 C5 A4 F#4 A4 D5 A4', 'G#4 B4 E5 B4 G#4 B4 E5 B4 G#4 B4 D5 B4 G#4 B4 E5 B4',
            SLEIGH_ARP_A.join(' '), 'A4 D5 F#5 D5 A4 D5 F#5 D5 A4 D5 F5 D5 A4 D5 F5 D5', 'A4 C#5 E5 A5 C#6 E6 A6 - - - - - . . . .') },
          { wave: 'tri', vol: 0.085, notes: j(bh('G2', 'D3'), bh('C3', 'G2'), bh('G2', 'E2'), bh('A2', 'D3'), bh('G2', 'D3'), bh('C3', 'C3'), bh('D3', 'D2'), bh('G2', 'D3'),
            oom('G2'), oom('C3'), oom('A2'), oom('D3'), oom('B2'), 'E3 - - . . . . . C3 - - .', 'C3 - - . D3 - - . . . . .', 'G2 - - . . . . . D3 - - .',
            oomp('G2', 'D3'), oomp('C3', 'G2'), oomp('A2', 'E3'), oomp('D3', 'A2'), oomp('B2', 'F#2'), 'E3 - - . B2 - . . C3 - . .', 'C3 - - . D3 - . . D3 - . .', 'G2 - - . D3 - . . G2 - . .',
            q4('G2', 'D3'), q4('C3', 'G2'), q4('D3', 'A2'), 'G2 - . . D3 - . . G2 - . . B2 - . .', q4('G2', 'D3'), 'C3 - . . G2 - . . C3 - . . Eb3 - . .', 'D3 - . . G2 - . . D3 - . . F#2 - . .', 'E2 - . . B2 - . . E2 - . . G#2 - . .',
            SLEIGH_GAL_A.join(' '), 'D3 - - - - - - - D3 - - - - - - -', 'A2 - - - - - - - - - - - . . . .') },
          // the singing voice: the carol twice, the choir's 'ooh's, then the theme an octave under the brass
          { duty: 0.5, vol: 0.022, vib: true, notes: j(rest(112), '. . . . . . . . . . . . D5 - - -',
            WW, 'G5 - - - - - - - D5 - - -', WW, 'G5 - - - - - - - . . . .',
            'B3 - - - - - - - - - - - - - - .', 'C4 - - - - - - - - - - - - - - .', 'C4 - - - - - - - A3 - - - - - - .', 'B3 - - - - - - - - - - - - - - .',
            'B3 - - - - - - - - - - - - - - .', 'C4 - - - - - - - Eb4 - - - - - - .', 'B3 - - - - - - - C4 - - - - - - .', 'B3 - - - - - - - D4 - - - - - - .',
            oct(SLEIGH_A.join(' '), -1), 'D5 - - - - - - - D5 - - - - - - -', 'C#5 - - - - - - - - - - - . . . .') },
          // the brass: silent until the credits
          { duty: 0.25, vol: 0.024, notes: j(rest(128), rest(192), CREDITS, SLEIGH_A.join(' '), 'F#6 - - - - - - - F6 - - - - - - -', 'E6 - - - - - - - - - - - . . . .') },
          { noise: 1, vol: 0.008, notes: j(r('. . . . x . . . . . . . x . x .', 8), r('x . . . . . . . . . . .', 8), r('x . . . x . x . x . x .', 8), r(BELLS, 8), r(BELLS, 9), 'x x x x x x x x x x x x . . . .') },
          { noise: 0, vol: 0.01, notes: j(rest(128), rest(96), r('X . . . x . . . x . . .', 7), 'X . . . x . x . X X X X', r(BACK, 7), FILL, r(BACK, 7), FILL, 'X . . . . . . . X . . . . . . .', 'X . X . X X X X X . . . . . . .') }
        ]
      };
    })(),
    // the Boxing Day dip, after the credits: everyone scampers down the
    // beach (a run up the F chord, then faster, climbing a semitone at a
    // time), hits the freezing water with a SPLASH and a long wobbly
    // shriek right at the top, shivers (teeth chattering, two notes a
    // semitone apart, brrrr), scrambles straight back out (the whole run
    // backwards, top to bottom) and goes 'phe-ew'. Then, being a loop,
    // they do it all again
    dip: {
      step: 0.075,
      tracks: [
        { duty: 0.25, vol: 0.026, vib: true, notes: j('C5 . F5 . A5 . C6 . F5 . A5 . C6 . F6 .', 'G5 . C6 . E6 . G6 . A6 . Bb6 . B6 . C7 .', 'C7 - - - - - - - - - - - - - - .',
          'E6 F6 E6 F6 E6 F6 E6 F6 D6 Eb6 D6 Eb6 D6 Eb6 D6 Eb6', 'F6 E6 D6 C6 Bb5 A5 G5 F5 E5 D5 C5 Bb4 A4 G4 F4 .', 'C5 - - - - - . . F4 - - - . . . .') },
        { duty: 0.125, vol: 0.01, notes: j(pah('A4', 'C5'), pah('Bb4', 'E5'), 'A6 - - - - - - - - - - - - - - .',
          'C6 Db6 C6 Db6 C6 Db6 C6 Db6 B5 C6 B5 C6 B5 C6 B5 C6', 'F5 . . . C5 . . . A4 . . . F4 . . .', '. . . . . . . . A4 - - - . . . .') },
        { wave: 'tri', vol: 0.09, notes: j('F2 . C3 . F2 . C3 . F2 . C3 . F2 . C3 .', 'C3 . G2 . C3 . G2 . C3 . C#3 . D3 . D#3 .', 'E3 - - - - - - - - - - - - - - .',
          'C3 . . . C3 . . . Bb2 . . . Bb2 . . .', 'F3 . E3 . D3 . C3 . Bb2 . A2 . G2 . F2 .', 'C3 - - - - - . . F2 - - - . . . .') },
        { noise: 0, vol: 0.012, notes: j('x . x . x . x . x . x . x . x .', 'x . x . x . x . x x x x x x x x', 'X X X x x x x . x . . . x . . .',
          'x . x . x . x . x . x . x . x .', 'x x x x x x x x x x x x x x x x', 'X . . . . . . . X . . . . . . .') }
      ]
    }
  });
})();
