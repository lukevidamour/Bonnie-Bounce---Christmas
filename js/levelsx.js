/* ==========================================================================
   levelsx.js — BONNIE BOUNCE: CHRISTMAS, the eleven levels: Christmas
   Eve in Guernsey, from the harbour in the morning to the rooftops at
   midnight (the plan Luke approved, 29 Oct; CHRISTMAS-BRIEF.md).

   The story: Father Christmas was on his last practice flight over St
   Peter Port when Grabby Gus, the greediest gull in Guernsey, went for
   the sleigh's golden bell. The reindeer took fright, the sleigh crashed
   on the quay, and the eight reindeer scattered across the island. Each
   level ends at a cosy cottage where someone from the family opens the
   door with a treat — and beside it, the one that was lost there (game.js
   draws them: { found: { who, gag } }). On Sark (10) Gus gives the bell
   back; then it's the sleigh, over the rooftops, home (11).

   Every level is long (about 440 tiles) and gently trickier than the one
   before, never unfair for a six-year-old (Winnie's five): three golden
   medals, Bear and Prince to find, two or three advent-calendar doors
   (24 in all, numbered across the game), a secret tunnel, and a moment
   of wonder of its own. The lessons of the original's QA are kept: a
   secret room on the way is a tunnel with a secret wall at each end;
   flags stand on the real ground; every ride comes back; nothing stands
   between a tunnel's exit and the way on.

   Built with the kit from levels.js (its commands are explained there);
   the Christmas set pieces are in game.js, under CHRISTMAS EVE IN
   GUERNSEY, and drawn in creaturesx.js.
   ========================================================================== */
(function () {
  'use strict';
  var K = BB.levelKit, add = K.add, TL = K.TL, R1 = K.R1;

  /* A room inside a block, a secret wall at each end: across the way on,
     so walking along takes you in one side and out of the other (a
     tunnel, never a dead end). floor: the row the room's floor is on, if
     it isn't the ground's. */
  var den = function (L, x0, y0, x1, floor, look) {
    floor = floor || 16;
    L.box(x0, y0, x1, floor, look === 'hard' ? TL.HARD : undefined);
    L.clear(x0 + 2, y0 + 1, x1 - 2, floor);
    L.secret(x0, y0 + 1, x0 + 2, floor, look); L.secret(x1 - 2, y0 + 1, x1, floor, look);
  };
  // Prince, Beau and Winnie's cat: found like Bear (row: the tile row he sits on)
  var prince = function (L, x, row) { L.e('prince', x, row); L.noDeco.push([x - 1, x + 3]); };
  var advent = function (L, n, x, row) { L.e('advent', x, row, { n: n }); };
  var cracker = function (L, x, row, give) { L.e('cracker', x, row === undefined ? 16 : row, give ? { give: give } : null); };
  /* A sledge run: the sledge waits on the hilltop at (x, row); it rides
     `ride` tiles downhill, dropping `slope` rows, and the hill under it
     steps down two rows clear of its path, so it can never catch the
     rider. Left at the bottom a while, it goes back up for another go. */
  var sledge = function (L, x, row, ride, slope) {
    L.ground(x - 6, x + 4, row + 1);
    // (all the way down to the ground at its foot: walk down it instead of riding and there's no gap at the bottom — the stuck hunt found one)
    for (var k = 4; k < ride + 4; k++) { var r = Math.ceil(row + (k - 3) / ride * slope + 2.2); L.ground(x + k, x + k + 1, Math.min(16, r)); }
    L.plat(x, row, 4, { ride: ride, slope: slope, look: 'sledge', speed: 0.9 });
  };
  // a street lamp that comes on as you pass (Town Lights)
  var lamp = function (L, x, row) { L.e('townlamp', x, row === undefined ? 16 : row); L.noDeco.push([x - 1, x + 2]); };

  /* 1 — Harbour Lights. St Peter Port, Christmas Eve morning. Father
     Christmas is on the quay by his crashed sleigh: HO HO… OH NO! The
     basics, one at a time — and the game's first cracker: BANG, a paper
     crown (a cheeky gull would love it). Bobbing boats across the
     harbour, the market's striped awnings to bounce on, up the steps into
     the Town, a secret way through a granite house, and Jingle Bells laid
     into the quay. Dasher's at the end, dizzy from running round a lamp
     post, wrapped in tinsel. */
  add({
    name: 'HARBOUR LIGHTS', theme: 'stpeterport', alt: 'harbour', w: 440, seed: 1101, snow: 0,
    found: { who: 'dasher', gag: 'dizzy' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 200, 3, { say: "CAN'T CATCH ME!" });
      L.ground(0, 62);
      L.e('santa', 8, 16, { crashed: true, say: ['HO HO HO...', 'OH NO!', 'MY REINDEER RAN OFF!', 'PLEASE FIND THEM!'] });
      L.tip(19, 'jump');
      L.row(22, R1, '?P?');
      L.tip(27, 'stomp');
      // the first sprout waits for you, rather than hopping into the signs
      L.e('sprout', 31, undefined, { wait: 70 });
      // the first cracker: BANG — a paper crown, a joke and stars
      cracker(L, 37);
      L.pipe(42, 2);
      L.e('sprout', 48);
      L.row(52, R1, 'B?B');
      // the harbour: three little boats bobbing in the water, a short hop between each
      L.plat(64, 15, 3, { bob: true, look: 'boatR' }); L.plat(70, 15, 3, { bob: true, look: 'boatB' }); L.plat(76, 15, 3, { bob: true, look: 'boatG' });
      L.arc(64, 11, 15);
      L.e('xgull', 74, 7);
      L.ground(80, 160);
      // the market: bounce on an awning up onto the market hall's roof (a medal at its far end)
      L.spring(86);
      L.semi(92, 118, 8); L.coins(94, 7, 10);
      L.medal(115, 6);
      L.e('xcrab', 98); L.e('sprout', 108);
      cracker(L, 120, 16, 'heart');
      L.row(126, R1, 'B?B');
      L.e('xgull', 134, 8);
      L.pipe(140, 3);
      L.e('robin', 146);
      L.check(152);
      // up the steps into the Town, and down again
      L.ground(160, 172, 14); L.ground(172, 184, 12); L.ground(184, 196, 10); L.ground(196, 206, 12);
      L.e('sprout', 176, 12); L.e('sprout', 189, 10);
      L.coins(186, 8, 6);
      L.ground(206, 346);
      /* A granite house across the way, with a secret way through it
         (a medal and the first advent door inside); bounce over the top if
         you like. Its far wall is a secret door too: a tunnel. */
      L.spring(210);
      den(L, 214, 10, 230);
      L.medal(225, 14); advent(L, 1, 219, 16); L.coins(217, 13, 4);
      L.e('xcrab', 238);
      // Bear, the first time, easy to spot: on a stack of lobster pots
      L.box(245, 13, 248, 16, TL.HARD);
      L.bear(246, 13);
      L.e('sprout', 254); L.e('xgull', 262, 8);
      L.row(258, R1, 'B?B?B');
      // balloons on the quay: up past a trail of stars to a medal in the sky
      L.balloons(272, 14);
      L.row(271, 11, 'C'); L.row(271, 8, 'C');
      L.row(275, 12, 'C'); L.row(277, 10, 'C'); L.row(279, 8, 'C'); L.row(282, 6, 'C'); L.row(285, 4, 'C');
      L.coins(287, 2, 5); L.medal(293, 2);
      L.check(304);
      // Prince, up on the harbour crane's ledge
      L.row(312, 11, 'XXX');
      prince(L, 313, 11);
      // Jingle Bells, laid into the quay: run along it and it plays
      L.notes(320, 16, 'EEE EEE EGCDE');
      cracker(L, 336);
      // the last of the harbour: two boats, then the quay to the cottage
      L.plat(348, 15, 3, { bob: true, look: 'boatG' }); L.plat(354, 15, 3, { bob: true, look: 'boatR' });
      L.arc(347, 11, 12);
      L.ground(360, 440);
      L.semi(368, 374, 11); advent(L, 2, 371, 11);
      L.e('sprout', 378); L.e('xcrab', 388);
      L.row(394, R1, '?P?');
      L.e('robin', 402);
      L.goal(412);
    }
  });

  /* 2 — Frosty Morning. Candie Gardens on a frosty morning: frost on the
     lawns, a frozen pond to slide across, the warm Victorian glasshouses
     (one with a secret way through), a snowdrift hiding a medal — and the
     giant snow globe on its lawn. Shake it and the game's first snow
     starts to fall, here and all over the island from then on. Then up to
     the top lawn and SLEDGE down it. Prancer's at the end, skating in
     wobbly circles on a puddle of ice. */
  add({
    name: 'FROSTY MORNING', theme: 'candie', alt: 'frosty', w: 450, seed: 1202, snow: 0,
    ice: [[52, 70], [262, 294]],
    found: { who: 'prancer', gag: 'skate' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 180, 3, { say: 'BRRR! STILL MINE!' });
      L.ground(0, 150);
      L.row(10, R1, '?P?');
      L.e('robin', 16); L.e('sprout', 24); L.e('robin', 30);
      L.e('leafpile', 36, 16, { snow: true }); L.coins(37, 15, 2);
      // the frozen pond: slow to start, slower to stop
      L.coins(54, 13, 14);
      L.e('sprout', 62);
      cracker(L, 76);
      L.pipe(84, 3); L.e('sprout', 90); L.pipe(96, 4);
      // the first glasshouse: bounce up over it, or find the way through (a medal, an advent door)
      L.spring(100);
      den(L, 104, 10, 120);
      L.medal(114, 14); advent(L, 3, 109, 16); L.coins(107, 13, 3);
      L.e('robin', 126); L.e('sprout', 132);
      L.row(136, R1, 'B?B');
      L.e('xgull', 142, 8);
      // the snow globe on its lawn: shake it and it snows
      L.e('snowglobe', 148, 16);
      L.ground(150, 170);
      L.check(156);
      // up the terraces to the top lawn, and the sledge waiting at the top
      L.ground(170, 178, 13); L.ground(178, 186, 10);
      L.coins(180, 8, 4);
      sledge(L, 190, 7, 36, 8);
      L.arc(196, 5, 26);
      L.ground(230, 450);
      // it's snowing now: snowmen come out (with colds)
      L.e('xsnowman', 240); L.e('sprout', 248);
      // a snowdrift with a medal in it: jump in!
      L.e('leafpile', 254, 16, { snow: true }); L.medal(255, 15);
      // the big frozen pond
      L.e('sprout', 270); L.row(276, R1, '?L?'); L.e('xsnowman', 286);
      cracker(L, 298, 16, 'power');
      L.check(304);
      // the great glasshouse: climb it; Bear's sitting on its roof
      L.stairs(310, 4);
      L.box(314, 12, 324, 16, TL.HARD);
      L.semi(316, 322, 8);
      L.bear(319, 8);
      L.e('robin', 330); L.e('sprout', 336);
      // an old oak: Prince, up on its top branch
      L.semi(346, 352, 11); L.semi(352, 358, 7);
      prince(L, 356, 7);
      L.e('xgull', 362, 7);
      L.row(366, R1, 'B?B');
      // a yew clipped into a tall column: bounce up, a medal on top
      L.spring(372);
      L.pipe(376, 6); L.medal(377, 8);
      // a hedge with a way through: the fourth advent door
      den(L, 386, 11, 398);
      advent(L, 4, 392, 16); L.coins(389, 14, 3);
      L.e('xsnowman', 404); L.e('sprout', 412);
      L.goal(422);
    }
  });

  /* 3 — The Noon-Day Gun. Castle Cornet at midday: along the breakwater,
     up the ramparts with Christmas puddings rolling down at you, and in
     the courtyard the noon-day gun. Stand by it and it's NOON — BOOM — it
     fires you right over the keep in a shower of tinsel (or find the
     secret passage through the keep). Then the battlements, the turret
     with Bear, the castle gardens. Dancer's at the end, dancing. */
  add({
    name: 'THE NOON-DAY GUN', theme: 'cornet', alt: 'castle', w: 450, seed: 1303,
    found: { who: 'dancer', gag: 'dance' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 160, 3, { say: 'TOO SLOW! HEE HEE!' });
      L.ground(0, 44);
      L.row(10, R1, '?P?');
      L.e('xcrab', 20); L.e('xgull', 28, 8);
      // the breakwater: stones with the sea between
      L.ground(44, 50); L.ground(54, 62); L.ground(66, 74); L.ground(78, 120);
      L.arc(49, 12, 6); L.arc(61, 12, 6); L.arc(73, 12, 6);
      L.e('xcrab', 58);
      cracker(L, 70);
      // the castle gate and the ramparts, up; puddings rolling down them
      L.stairs(84, 4);
      L.box(88, 12, 112, 16, TL.HARD);
      L.e('sprout', 96, 12);
      L.row(100, 8, 'B?B');
      L.box(112, 9, 120, 16, TL.HARD);
      L.e('pudcart', 118, 9, { every: 170, dir: -1 });
      L.ground(120, 200, 12);
      L.check(124);
      L.e('xgull', 134, 6);
      L.e('xsnowman', 138, 12);
      // the noon-day gun: BOOM, over the keep
      L.e('noongun', 143, 12, { far: 30 });
      L.arc(146, 4, 26);
      /* The keep, too tall to jump: the gun's the way over — or walk into
         its wall: a secret passage right through (a medal, an advent door). */
      den(L, 150, 4, 168, 12, 'hard');
      L.medal(160, 10); advent(L, 5, 155, 12); L.coins(153, 9, 3); L.coins(163, 9, 3);
      L.e('robin', 182, 12);
      L.e('sprout', 190, 12);
      // the battlements: hop the crenellations
      L.ground(200, 262, 12);
      for (var x = 204; x < 258; x += 5) L.row(x, 11, 'X');
      L.e('xsnowman', 220, 11); L.e('xgull', 230, 6);
      // a turret, Bear on top
      L.box(236, 8, 240, 11, TL.HARD); L.bear(237, 8);
      L.e('sprout', 248, 11);
      L.check(262);
      // down into the castle gardens
      L.ground(262, 270, 14); L.ground(270, 392);
      L.e('robin', 278); L.e('sprout', 286); L.e('sprout', 294);
      cracker(L, 302, 16, 'power');
      L.row(308, R1, 'B?B');
      // an old tree in the gardens: Prince, at the top
      L.semi(318, 322, 12); L.semi(322, 327, 8);
      prince(L, 325, 8);
      L.e('xsnowman', 332);
      // a cannon that throws you high (a spring): a medal up on the flagstaff's ledge
      L.spring(340);
      L.semi(344, 350, 5); L.medal(347, 3); L.coins(344, 4, 6);
      advent(L, 6, 356, 16);
      L.e('xgull', 364, 8);
      // a snowdrift with the last medal in it
      L.e('leafpile', 378, 16, { snow: true }); L.medal(379, 15);
      // the garden slope: more puddings rolling at you
      L.ground(392, 400, 14); L.ground(400, 412, 12);
      L.e('pudcart', 410, 12, { every: 190, dir: -1 });
      L.ground(412, 450);
      L.e('robin', 418);
      L.goal(426);
    }
  });

  /* 4 — The Green Lanes. Guernsey's quiet lanes between high hedge
     banks: hedge-veg stalls with their honesty boxes (a coin in, a treat
     out), sprouts everywhere (it's vegetable country), puddles, a field of
     Guernsey cows to ride on — hop along the cows' choir and they moo
     Jingle Bells — and a blue postbox: post a letter to Father Christmas
     and a whoosh of letters carries you up into the sky. Vixen's at the
     end, among the cows, going MOO: she thinks she's one of them. */
  add({
    name: 'THE GREEN LANES', theme: 'lanes', alt: 'hills', w: 460, seed: 1404,
    found: { who: 'vixen', gag: 'moo' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 150, 3, { say: 'MOO TO YOU!' });
      L.ground(0, 84);
      L.row(10, R1, '?P?');
      L.e('sprout', 18); L.e('robin', 24);
      L.e('vegstall', 30, 16, { give: 'stars' });
      L.e('sprout', 40); L.e('sprout', 46);
      // a hedge bank across the lane, with a way through it (bounce over, or find it)
      L.spring(52);
      den(L, 56, 10, 70);
      advent(L, 7, 62, 16); L.coins(59, 13, 4);
      // the cows' field: she ambles along, and you can stand on her back
      L.e('cow', 72, 16, { range: 6 });
      L.clear(84, 16, 88, 18); L.arc(83, 13, 6);
      L.ground(88, 140);
      L.e('cow', 92, 16, { range: 6 });
      // the cows' choir: hop along their backs and they moo Jingle Bells
      for (var k = 0; k < 5; k++) L.e('cow', 104 + k * 4, 16, { still: true, dir: k % 2 ? 1 : -1 });
      L.coins(104, 11, 18);
      L.e('vegstall', 126, 16, { give: 'heart' });
      L.check(134);
      // up onto the hedge banks: the high lane, and the barn's hay loft (Bear)
      L.ground(140, 152, 13); L.ground(152, 200, 11);
      L.e('sprout', 160, 11);
      L.e('xgull', 172, 5);
      L.row(186, 7, 'BBBBBB');
      L.bear(190, 7);
      L.e('xsnowman', 196, 11);
      // down into a lane with puddles
      L.ground(200, 296);
      L.e('puddle', 206, 16); L.e('sprout', 214); L.e('puddle', 222, 16); L.e('xsnowman', 232);
      cracker(L, 240, 16, 'power');
      L.row(246, R1, 'B?B?B');
      L.e('sprout', 254);
      /* The blue postbox: post a letter and the letters pour out of it,
         up and up, carrying you into the sky — a path of stars along the
         clouds' edge, a medal at its end, and a drop back down. */
      L.e('postbox', 262, 16, { h: 12 });
      // (the cloud's edge starts right beside the letters, so you step off them onto it)
      L.semi(264, 290, 5); L.coins(266, 4, 18); L.medal(287, 3);
      L.check(296);
      // the old glasshouses: climb over them; Prince on top
      L.stairs(302, 3);
      L.box(305, 13, 320, 16, TL.HARD);
      L.semi(309, 315, 9); prince(L, 312, 9);
      L.e('sprout', 324);
      L.ground(296, 372);
      // through a hedge bank: a medal and an advent door inside
      den(L, 336, 11, 350);
      L.medal(344, 14); advent(L, 8, 340, 16); L.coins(339, 13, 3);
      L.e('robin', 356); L.e('xsnowman', 364);
      // a cow to stand on, up onto the high bank (a snowdrift with a medal in it)
      L.e('cow', 362, 16, { range: 5 });
      L.ground(372, 390, 11);
      L.e('leafpile', 380, 11, { snow: true }); L.medal(381, 10);
      L.ground(390, 460);
      L.e('vegstall', 404, 16, { give: 'stars' });
      L.e('robin', 410); L.e('sprout', 416);
      L.goal(432);
    }
  });

  /* 5 — Saumarez Park. Everyone on bikes! (The original's bike ride, for
     whoever's playing.) Through the park in the afternoon: trees wrapped
     in fairy lights that light up as you ride under, the bridge over the
     lake (its lights come on as you cross), the playground, the hedge
     maze with a way through, the manor lawn in the snow. And at the end,
     not a reindeer: Father Christmas's hat — on a duck, very pleased with
     it. The road's three rows up, so the lake under the bridge is deep
     enough to swim if you tumble in. */
  add({
    name: 'SAUMAREZ PARK', theme: 'saumarez', alt: 'park', w: 440, seed: 1505, bike: true,
    found: { who: 'hat', gag: 'hat' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 150, 3, { say: 'NO BIKES IN THE SKY!' });
      var d = 13;
      L.start = { x: 3, row: d };
      L.ground(0, 120, d);
      L.row(30, d - 5, '?P?');
      L.stairs(40, 2, 1, d); L.stairs(42, 2, -1, d);
      L.e('sprout', 50, d);
      L.clear(58, d, 62, 18); L.arc(57, d - 3, 6); L.medal(59, d - 7);
      L.e('robin', 66, d); L.e('sprout', 74, d);
      // the big trees: branches over the path, strung with fairy lights
      L.semi(80, 92, d - 5); L.e('lights', 80, d - 5, { w: 12 }); L.coins(82, d - 6, 8);
      L.e('duck', 98, d);
      L.row(104, d - 5, 'B?B');
      // the lake, and the bridge over it, lit as you cross
      L.ground(120, 150, 17); L.water(120, d, 150, 17);
      L.semi(120, 150, d); L.e('lights', 120, d - 4, { w: 30 });
      L.e('duck', 134, d);
      L.ground(150, 440, d);
      L.check(156, d);
      // the playground: bounce up onto the climbing frame's top
      L.spring(168, d);
      L.semi(172, 182, d - 7); L.coins(173, d - 8, 8);
      L.e('sprout', 186, d);
      // the hedge maze: a way through (a medal, an advent door)
      den(L, 194, d - 6, 208, d);
      L.medal(203, d - 2); advent(L, 9, 199, d); L.coins(197, d - 3, 3);
      // the climbing frame: Bear at the top
      L.semi(214, 218, d - 4); L.semi(218, 222, d - 8); L.bear(220, d - 8);
      L.e('xgull', 228, 4);
      L.clear(236, d, 241, 18); L.arc(235, d - 4, 7);
      // balloons: a medal in the sky
      L.balloons(252, d - 2);
      L.coins(256, 3, 5); L.medal(264, 2); L.coins(268, 3, 5);
      L.e('sprout', 260, d); L.e('duck', 274, d);
      L.row(282, d - 5, '?L?');
      L.check(290, d);
      // the manor lawn, in the snow
      L.e('xsnowman', 300, d); L.e('leafpile', 308, d, { snow: true });
      // the lamp by the folk museum: Prince on its ledge
      L.semi(323, 329, d - 5); prince(L, 326, d - 5);
      cracker(L, 334, d, 'power');
      // the bandstand, its edge strung with lights: an advent door up there
      L.semi(340, 348, d - 5); L.e('lights', 340, d - 5, { w: 8 }); advent(L, 10, 344, d - 5);
      L.stairs(356, 2, 1, d); L.stairs(358, 2, -1, d);
      L.clear(366, d, 370, 18); L.arc(365, d - 3, 6);
      L.e('sprout', 380, d); L.e('robin', 390, d);
      L.goal(404, d);
    }
  });

  /* 6 — Sunset Bays. Cobo and Vazon on the west coast at sunset: sledge
     down the dunes onto the beach, crabs in Santa hats, seals to bounce
     on in the sea, and the big rock pools — flooded, until you come near
     and the tide goes out, row by row, and a path of rocks is there to
     walk (a medal on the bottom). Cobo's pink granite rocks to climb, a
     way through the sea wall. Cupid's at the end, buried to his antlers
     in a sandcastle. */
  add({
    name: 'SUNSET BAYS', theme: 'bays', alt: 'beach', w: 450, seed: 1606,
    found: { who: 'cupid', gag: 'sandcastle' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 200, 3, { say: 'SHINY SUNSET! MINE!' });
      L.ground(0, 44);
      L.row(10, R1, '?P?');
      L.e('xcrab', 20); L.e('xgull', 30, 8);
      // the dunes: up, and a sledge down to the beach
      L.ground(44, 54, 13); L.ground(54, 64, 10);
      sledge(L, 70, 7, 34, 8);
      L.arc(76, 5, 24);
      L.ground(106, 136);
      L.e('xcrab', 112);
      cracker(L, 118);
      L.e('sprout', 126);
      // the sea, with seals to bounce on (fall in and you swim)
      L.ground(136, 150, 17); L.water(136, 14, 150, 17);
      L.e('seal', 140, 14); L.e('seal', 146, 14);
      L.arc(137, 9, 13);
      L.ground(150, 176);
      L.check(156);
      L.e('xcrab', 166);
      /* The rock pools, flooded: as you come near the tide goes out, a
         row at a time, and the rocks are a path across (swim it, if you
         don't wait). A medal on the bottom of the deepest pool. */
      L.ground(176, 220, 17);
      L.water(176, 11, 220, 17);
      L.box(180, 14, 184, 17, TL.HARD); L.box(190, 13, 194, 17, TL.HARD); L.box(200, 14, 204, 17, TL.HARD); L.box(210, 13, 214, 17, TL.HARD);
      L.medal(196, 16);
      L.e('tide', 176, 11, { x0: 176, x1: 220, from: 11, to: 17, lead: 16 });
      L.ground(220, 312);
      // Cobo's pink granite rocks: climb them, Bear's on top
      L.stairs(228, 3);
      L.box(231, 13, 240, 16, TL.HARD); L.box(234, 10, 238, 13, TL.HARD);
      L.bear(236, 10);
      L.e('xsnowman', 246); L.e('sprout', 254);
      // the old bunker in the sea wall: a way through (a medal, an advent door)
      L.spring(258);
      den(L, 262, 10, 276);
      L.medal(272, 14); advent(L, 11, 267, 16); L.coins(265, 13, 3);
      L.e('xgull', 284, 7);
      L.check(296);
      // a seal to bounce up to the high rock (a medal there)
      L.ground(312, 326, 17); L.water(312, 14, 326, 17);
      L.e('seal', 318, 14);
      // (the rock's ledge is right over the seal: bounce straight up through it)
      L.semi(315, 325, 6); L.medal(321, 4);
      L.ground(326, 450);
      // the lifeguard's hut: Prince on its roof
      L.box(338, 12, 344, 16, TL.HARD); L.semi(339, 343, 8); prince(L, 341, 8);
      // a rock ledge: an advent door
      L.box(360, 11, 366, 16, TL.HARD); advent(L, 12, 363, 11);
      L.e('xcrab', 372);
      cracker(L, 380, 16, 'heart');
      L.e('xcrab', 388); L.e('xgull', 396, 7);
      L.row(404, R1, 'B?B');
      L.goal(422);
    }
  });

  /* 7 — The Cup and Saucer. Fort Grey and Rocquaine Bay at dusk, the
     Hanois lighthouse sweeping its beam: a shipwreck to climb, rigging to
     swing on, treasure in the secret rooms (stars and stars), the fort
     itself to climb — the little white tower on its round wall — and Bear
     at the very top. Donner's at the end, stuck up on the cottage roof:
     HELP! */
  add({
    name: 'THE CUP AND SAUCER', theme: 'fortgrey', alt: 'harbour', w: 460, seed: 1707,
    found: { who: 'donner', gag: 'roof' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 60, 3, { say: 'KEEP OUT OF MY NEST!' });
      L.ground(0, 48);
      L.row(10, R1, '?P?');
      L.e('xcrab', 18); L.e('sprout', 26);
      L.e('xsnowman', 38);
      // a gap in the causeway: a little boat bobbing
      L.plat(50, 15, 3, { bob: true, look: 'boatB' });
      L.arc(48, 11, 9);
      L.ground(56, 106);
      L.e('xsnowman', 64); L.e('xgull', 74, 8);
      // the wreck: up its hull onto the deck
      L.stairs(80, 3);
      L.box(83, 13, 104, 16, TL.HARD);
      L.semi(88, 100, 9); L.coins(89, 8, 10);
      // and on the deck, Grabby Gus's nest — and the clue: he's off to Sark
      L.e('gusnest', 95, 13);
      // the rigging: swing across the water (swim if you fall in)
      L.ground(106, 118, 17); L.water(106, 15, 118, 17);
      L.plat(110, 2, 3, { swing: 8, speed: 0.025 });
      L.ground(118, 200);
      // the treasure room in the rocks: bounce over it, or through (a medal, an advent door, treasure)
      L.spring(122);
      den(L, 126, 10, 140);
      L.medal(136, 14); advent(L, 13, 131, 16); L.coins(129, 12, 9); L.coins(129, 14, 9);
      L.check(146);
      /* Fort Grey: the round wall (the saucer), and the white tower (the
         cup) on it. Up a ledge onto the tower's top: Bear's waiting. */
      L.stairs(156, 3);
      L.box(159, 13, 185, 16, TL.HARD);
      L.row(161, 10, 'XX');
      // the cup has a way through it too, a secret door each side: a medal inside
      den(L, 165, 6, 179, 13, 'hard');
      L.medal(172, 11); L.coins(168, 10, 3); L.coins(174, 10, 3);
      L.bear(172, 6);
      L.e('xgull', 172, 3);
      L.ground(185, 222);
      L.e('xcrab', 192); L.e('xsnowman', 202);
      L.row(210, R1, 'B?B?B');
      // the bay, with seals to bounce on
      L.ground(222, 238, 17); L.water(222, 14, 238, 17);
      L.e('seal', 227, 14); L.e('seal', 233, 14);
      L.arc(223, 9, 14);
      L.ground(238, 460);
      L.check(244);
      cracker(L, 250, 16, 'power');
      // a pile of lobster pots: Prince on top
      L.box(262, 12, 266, 16, TL.HARD); L.box(263, 9, 265, 12, TL.HARD);
      prince(L, 264, 9);
      L.e('sprout', 272); L.e('xcrab', 280);
      // the wreck's other half: a way through (an advent door, treasure)
      den(L, 290, 11, 304);
      advent(L, 14, 296, 16); L.coins(293, 13, 9);
      // balloons over the bay: the last medal up in the dusk
      L.balloons(316, 14);
      L.row(320, 10, 'C'); L.row(323, 7, 'C'); L.row(326, 4, 'C');
      L.medal(330, 2); L.coins(332, 3, 4);
      L.e('xsnowman', 338); L.e('sprout', 346); L.e('xgull', 356, 8);
      L.row(364, R1, '?L?');
      L.stairs(380, 3); L.ground(383, 395, 13); L.stairs(395, 3, -1);
      L.e('xcrab', 404); L.e('robin', 410);
      L.goal(426);
    }
  });

  /* 8 — Town Lights. St Peter Port as it gets dark: up the steep streets
     and steps, every street lamp coming on as you pass, knock-knock doors
     (someone from the family answers with a treat — one has a medal),
     fairy-light bridges across the gaps between the roofs (they light up
     under your feet), chimney smoke to ride up, shop awnings to bounce on
     — and at the end, the big red button: jump on it and the whole Town's
     lights come on at once, with fireworks. Comet's at the end, tangled in
     fairy lights, glowing like a Christmas tree. */
  add({
    name: 'TOWN LIGHTS', theme: 'townlights', alt: 'night', w: 460, seed: 1808,
    found: { who: 'comet', gag: 'lights' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 230, 3, { say: 'OOH! LIGHTS! SHINY!' });
      L.ground(0, 50);
      lamp(L, 8);
      L.row(14, R1, '?P?');
      L.e('xdoor', 22, 16, { give: 'stars' });
      L.e('sprout', 30); lamp(L, 36); L.e('xsnowman', 42);
      // up the steep streets: the High Street, high on the hill
      L.ground(50, 60, 14); L.ground(60, 70, 12); L.ground(70, 80, 10); L.ground(80, 120, 8);
      lamp(L, 64, 12); lamp(L, 84, 8);
      L.e('xdoor', 90, 8, { give: 'heart' });
      L.e('sprout', 98, 8); L.e('xgull', 106, 3);
      lamp(L, 112, 8);
      // a bridge of fairy lights across to the next roofs
      L.semi(120, 128, 8); L.e('lights', 120, 8, { w: 8 });
      L.ground(128, 170, 8);
      cracker(L, 132, 8);
      L.check(140, 8);
      /* the old market house across the street: bounce up over its roof —
         or through it (a medal, an advent door) */
      L.spring(146, 8);
      den(L, 150, 2, 164, 8);
      L.medal(160, 6); advent(L, 15, 155, 8); L.coins(153, 5, 3);
      lamp(L, 167, 8);
      // down the steps
      L.ground(170, 180, 10); L.ground(180, 190, 12); L.ground(190, 262, 14);
      lamp(L, 176, 10);
      L.e('xdoor', 196, 14, { give: 'power' });
      L.e('xsnowman', 206, 14); L.e('sprout', 214, 14);
      // a shop's awning: bounce up onto its sign — Bear's sitting on it
      L.spring(224, 14);
      L.semi(228, 234, 7); L.bear(231, 7);
      lamp(L, 240, 14);
      L.row(246, 10, 'B?B');
      L.e('sprout', 254, 14);
      L.ground(262, 282);
      L.check(266);
      // the harbour steps: a long bridge of lights across the gap
      L.stairs(276, 3);
      L.semi(279, 297, 13); L.e('lights', 279, 13, { w: 18 }); L.coins(281, 12, 14);
      L.ground(297, 460);
      lamp(L, 300);
      L.e('xgull', 304, 8);
      // smoke from a chimney: ride it up to the rooftop (a medal)
      L.steam(312, 11);
      L.semi(313, 324, 6); L.medal(320, 4); L.coins(315, 5, 6);
      // a window box: Prince
      L.row(330, 12, 'XXX'); prince(L, 331, 12);
      // knock here: they've found a medal for you
      L.e('xdoor', 340, 16, { give: 'medal' });
      L.medal(344, 10, { hidden: true });
      lamp(L, 348);
      L.e('sprout', 352); L.e('xsnowman', 362);
      cracker(L, 370);
      L.semi(378, 384, 11); advent(L, 16, 381, 11);
      // the big red button for the Town's Christmas lights
      L.e('bigswitch', 394, 16);
      L.e('lights', 386, 8, { w: 40 });
      lamp(L, 404); lamp(L, 420);
      L.goal(430);
    }
  });

  /* 9 — Shell Beach. The evening boat to Herm: ride the ferry across
     (it comes back for you if you fall in), past seals and gulls; the
     little harbour; the dunes, a snowdrift with a medal in it; the old
     quarry's tunnel; and Shell Beach under the moon, sparkling with
     shells. Blitzen's at the end, in a deckchair, in sunglasses, in
     December. */
  add({
    name: 'SHELL BEACH', theme: 'herm', alt: 'beach', w: 450, seed: 1909,
    found: { who: 'blitzen', gag: 'deckchair' },
    build: function (L) {
      // Grabby Gus, swooping by with the bell (game.js KINDS.gusby)
      L.e('gusby', 300, 3, { say: 'SEE YOU ON SARK!' });
      L.ground(0, 30);
      L.row(12, R1, '?P?');
      L.e('xcrab', 18);
      // the crossing to Herm: the ferry waits at the quay
      L.ground(30, 72, 17); L.water(30, 14, 72, 17);
      L.plat(30, 14, 6, { ride: 36, look: 'ferry', speed: 0.7 });
      L.coins(38, 9, 24);
      L.e('xgull', 46, 7);
      L.ground(72, 120);
      L.check(80);
      // Herm's little harbour
      L.e('xcrab', 88); L.e('sprout', 96);
      L.row(102, R1, 'B?B');
      cracker(L, 110);
      // the dunes, up and down; a snowdrift on the top with a medal in it
      L.ground(120, 130, 14); L.ground(130, 142, 12); L.ground(142, 150, 14); L.ground(150, 200);
      L.e('leafpile', 134, 12, { snow: true }); L.medal(135, 11);
      L.e('xsnowman', 146, 14);
      // Bear, sat on a dune
      L.ground(160, 166, 12); L.bear(163, 12);
      // Shell Beach: sparkling shells everywhere
      L.coins(170, 15, 4); L.e('xcrab', 176); L.coins(182, 15, 4); L.e('xcrab', 190);
      // the sea, with seals
      L.ground(200, 216, 17); L.water(200, 14, 216, 17);
      L.e('seal', 204, 14); L.e('seal', 210, 14);
      L.ground(216, 450);
      // the old quarry: bounce over the rock, or through it (a medal, an advent door)
      L.spring(219);
      den(L, 224, 10, 238);
      L.medal(234, 14); advent(L, 17, 229, 16); L.coins(227, 13, 3);
      L.check(246);
      L.e('xgull', 256, 7); L.e('sprout', 264);
      // the beach kiosk: Prince on its roof
      L.box(276, 11, 284, 16, TL.HARD); L.semi(278, 284, 7); prince(L, 281, 7);
      L.row(294, R1, '?L?');
      L.e('xsnowman', 302); L.e('xcrab', 312);
      // balloons over the bay: a medal in the moonlight
      L.balloons(324, 14);
      L.row(328, 10, 'C'); L.row(331, 7, 'C'); L.row(334, 4, 'C');
      L.medal(338, 2); L.coins(340, 3, 4);
      L.semi(350, 356, 11); advent(L, 18, 353, 11);
      cracker(L, 362, 16, 'power');
      L.e('xgull', 372, 8); L.e('xcrab', 382);
      L.stairs(392, 3); L.ground(395, 405, 13); L.stairs(405, 3, -1);
      L.goal(424);
    }
  });

  /* 10 — Sark by Starlight. No cars on Sark: a boat to the harbour, up
     the steep hill, the horse and cart along the lane (it comes back for
     you), shooting stars to catch, the old silver mine's tunnel, across
     La Coupée — the narrow ridge high above the sea — and on the clifftop
     at the end, Grabby Gus with the golden bell. He dives at you and
     crash-lands in a heap: stomp him while he's dizzy. Three, and he's
     sorry, and the bell is back. (No cottage at the end: the bell's the
     prize, and then it's Christmas Eve night.) */
  add({
    name: 'SARK BY STARLIGHT', theme: 'sark', alt: 'night', w: 440, seed: 2010, boss: true,
    build: function (L) {
      L.ground(0, 24);
      L.row(10, R1, '?P?');
      // the boat to Sark
      L.ground(24, 52, 17); L.water(24, 14, 52, 17);
      L.plat(24, 14, 6, { ride: 22, look: 'ferry', speed: 0.7 });
      L.coins(30, 9, 14);
      L.ground(52, 64);
      L.check(56);
      // up the harbour hill
      L.ground(64, 74, 14); L.ground(74, 84, 12); L.ground(84, 162, 10);
      L.e('sprout', 70, 14);
      L.e('xsnowman', 92, 10);
      L.e('shooting', 100, 3);
      // the horse and cart: hop on the back, and it trots you along the lane
      L.plat(104, 9, 5, { ride: 40, look: 'cart', speed: 0.8 });
      L.coins(108, 5, 30);
      L.e('xgull', 152, 4);
      // the old silver mine: bounce over it, or through (a medal, an advent door)
      L.spring(158, 10);
      den(L, 162, 4, 176, 10);
      L.medal(172, 8); advent(L, 19, 167, 10); L.coins(165, 7, 3);
      L.ground(176, 210, 10);
      L.e('sprout', 184, 10); L.e('xsnowman', 194, 10);
      L.e('shooting', 190, 2);
      L.check(202, 10);
      /* La Coupée: the narrow ridge between Sark and Little Sark, high over
         the sea, two little gaps to hop and gulls swooping */
      L.box(210, 10, 226, 12); L.box(229, 10, 245, 12); L.box(248, 10, 262, 12);
      L.arc(225, 7, 5); L.arc(244, 7, 5);
      L.e('xgull', 222, 5); L.e('xgull', 240, 5);
      L.ground(262, 274, 12); L.ground(274, 290, 14); L.ground(290, 440);
      L.e('sprout', 280, 14);
      // a haystack: Bear on top
      L.box(290, 13, 296, 16, TL.HARD); L.semi(292, 298, 9); L.bear(295, 9);
      // a cottage: Prince on its roof
      L.box(306, 12, 314, 16, TL.HARD); L.semi(308, 314, 8); prince(L, 311, 8);
      L.e('shooting', 300, 3);
      L.semi(318, 324, 11); advent(L, 20, 321, 11);
      // a barn with a way through (a medal, an advent door)
      den(L, 326, 11, 338);
      L.medal(334, 14); advent(L, 21, 330, 16); L.coins(329, 13, 3);
      L.check(344);
      // balloons: the last medal, among the stars
      L.balloons(350, 14); L.coins(352, 4, 6); L.medal(360, 2);
      /* the clifftop: Grabby Gus. He crash-lands on the ground; two
         ledges to get out of his way; the cliff's edge behind him. */
      L.e('gate', 370, 15);
      L.semi(380, 386, 11); L.semi(404, 410, 11);
      L.e('gus', 398, 5);
      L.box(424, 2, 430, 16, TL.HARD);
    }
  });

  /* 11 — Over the Rooftops. Christmas Eve, midnight, the snow coming down
     thick. Father Christmas is waiting on a roof with the sleigh and the
     reindeer: YOU FLY IT! Fly over St Peter Port's roofs, holding jump to
     climb, and a present drops down every chimney you pass (its window
     lights up below); then on foot across the rooftops — chimney smoke to
     ride, snowmen, a fairy-light bridge, an attic with a way through; and
     the sleigh again for the last run — home. The last chimney is your
     own. */
  add({
    name: 'OVER THE ROOFTOPS', theme: 'rooftops', alt: 'night', w: 470, seed: 2111, snow: 2,
    build: function (L) {
      L.start = { x: 3, row: 12 };
      L.ground(0, 34, 12);
      L.e('santa', 9, 12, { say: ['HO HO HO!', 'THE BELL IS BACK!', 'I HAVE AN IDEA FOR GUS!', 'YOU FLY THE SLEIGH!', 'A PRESENT DOWN EVERY CHIMNEY!'] });
      L.e('sleigh', 22, 12, { t: 2400, land: 238 });
      // the roofs of the Town, a chimney on each; the streets between them far below
      L.ground(40, 60, 13); L.ground(66, 90, 12); L.ground(96, 120, 13); L.ground(126, 150, 11);
      L.ground(156, 180, 12); L.ground(186, 210, 13); L.ground(216, 262, 12);
      [[48, 13], [76, 12], [104, 13], [136, 11], [166, 12], [196, 13], [224, 12]].forEach(function (c) { L.e('chimney', c[0], c[1]); });
      L.arc(52, 7, 20); L.arc(108, 6, 20); L.arc(170, 7, 20);
      // a medal up in the snow clouds: fly high for it
      L.coins(118, 3, 6); L.medal(126, 2);
      L.check(244, 12);
      // on foot over the rooftops
      L.e('xsnowman', 252, 12);
      L.ground(262, 272, 10); L.ground(272, 290, 8);
      L.e('sprout', 280, 8);
      // a string of fairy lights across the street
      L.semi(290, 300, 8); L.e('lights', 290, 8, { w: 10 });
      L.ground(300, 362, 8);
      L.e('xgull', 310, 3);
      // smoke from a chimney: ride it up to the ledge where Bear's sitting
      L.steam(318, 5, 8);
      L.semi(320, 326, 3); L.bear(323, 3);
      // an attic with a way through (a medal, an advent door); bounce over, or go in
      L.spring(330, 8);
      den(L, 334, 3, 348, 8);
      L.medal(344, 6); advent(L, 22, 339, 8); L.coins(337, 5, 3);
      L.e('xsnowman', 354, 8);
      L.check(358, 8);
      // the sleigh again, for the last run home
      L.e('sleigh', 362, 8, { t: 1600, land: 430 });
      L.ground(370, 382, 11); L.ground(388, 400, 12); L.ground(406, 420, 11);
      [[374, 11], [392, 12], [412, 11]].forEach(function (c) { L.e('chimney', c[0], c[1]); });
      L.semi(382, 388, 10); advent(L, 23, 384, 10);
      L.semi(398, 406, 9); prince(L, 403, 9);
      L.coins(394, 3, 6); L.medal(400, 2);
      L.ground(426, 470, 14);
      L.semi(434, 440, 10); advent(L, 24, 437, 10);
      L.goal(444, 14);
    }
  });

  /* The bonus — CHRISTMAS DAY. Behind the advent calendar's big last door,
     once all 24 doors are open (game.js: the sticker book). Christmas
     morning in the snow: Father Christmas waving you off, presents in
     every block, a cracker every few steps (every joke), the whole of
     Jingle Bells laid into the path, a sledge run, balloons, snowmen to
     snowball, knock-knock doors with the family behind them, and the
     cottage at the end. Nothing to find and no medals: just a treat. */
  add({
    name: 'CHRISTMAS DAY', theme: 'xmorning', alt: 'frosty', w: 250, seed: 2512, snow: 1, bonus: true,
    build: function (L) {
      L.ground(0, 250);
      L.e('santa', 8, 16, { say: ['HO HO HO!', 'MERRY CHRISTMAS!', 'PRESENTS FOR EVERYONE!'] });
      L.row(18, R1, '?P?L?');
      cracker(L, 26);
      L.e('robin', 30);
      // the whole of Jingle Bells, laid into the path
      L.notes(34, 16, 'EEE EEE EGCDE FFFFFEEEEDDED G EEE EEE EGCDE FFFFFEEEGGFDC');
      L.arc(40, 11, 12); L.arc(62, 11, 12);
      cracker(L, 96);
      L.row(100, R1, 'S?M?S');
      L.e('xsnowman', 108); L.e('xdoor', 114, 16, { give: 'stars' });
      cracker(L, 120);
      // balloons up to a row of stars
      L.balloons(126, 14); L.coins(128, 7, 12);
      L.e('robin', 140);
      // up a terrace to the hilltop, and the sledge run down it
      L.ground(137, 144, 13);
      sledge(L, 150, 10, 22, 5);
      cracker(L, 182);
      L.e('xsnowman', 188); L.row(192, R1, 'P?L?P');
      L.e('xdoor', 200, 16, { give: 'stars' });
      L.spring(206); L.semi(210, 220, 10); L.coins(211, 9, 8);
      cracker(L, 224);
      L.arc(226, 11, 10);
      L.goal(238);
    }
  });
})();
