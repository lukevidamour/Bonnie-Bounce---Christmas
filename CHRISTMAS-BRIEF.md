# Bonnie Bounce — Christmas

The brief for a new edition of Bonnie Bounce. Read all of it before you
start, then read `README.md` (how the game is built) and `ROADMAP.md`.

## What this is

Bonnie Bounce is a pixel-art platformer Luke made with Claude for his son
Bonnie (6, he/him). It's private, made for the family only and never
published. This folder is a fresh copy of the original game, taken on 29 Oct
2026 from `../Bonnie Bounce/`, made to become a **new edition** with its own
link: **Bonnie Bounce — Christmas**. That is ten gorgeous, joyful levels
about Christmas in Guernsey, full of wonder, surprises and wholesome little
adventures.

Leave the original game in `../Bonnie Bounce/` alone. Never edit it. It's
there to read and borrow from.

## Who's in it — everyone's playable

Seven playable characters, picked on a "who's playing?" screen:

- **Bonnie**, 6, he/him. His look already exists (`js/art.js`, `js/family.js`).
- **Beau** and **Winnie**, Bonnie's cousins.
- **Ollie** and **Grace**, Beau and Winnie's parents: Uncle Ollie and
  Aunty Grace to Bonnie.
- **Luke** and **Lucy**, Bonnie's dad and mum: Uncle Luke and Aunty Lucy
  to Beau and Winnie. They already exist as playable characters
  (`WHO` in `js/game.js`, art in `js/family.js`). Luke's look is a curly
  crop and a ginger moustache, no beard. It's been redrawn once already
  because he looked "like Bob Ross", so keep it as it is.

**Luke will drop photos of Beau, Winnie, Grace and Ollie into the chat.**
Before you draw anyone, ask him how old Beau and Winnie are, and how each
new person is referred to (he/she/they). Don't guess. In anything the game
says, use the names children use: "Uncle Ollie", "Aunty Grace" and so on,
from whoever's point of view is playing.

Each character should look unmistakably like themselves in the game's own
pixel style. Look at how Bonnie, Lucy and Luke are built. Give each one a
little personality of their own: an idle animation, a cheer, a hat or
scarf, a Christmas jumper. Keep the controls and jump identical for
everyone so nobody's harder to play. Grown-ups can be taller sprites, but
use the same hitbox. Whoever isn't playing turns up as cameos: cheering at
checkpoints, waving from windows, joining the ending. Bonnie's voice clips
(`js/voice.js`) are his own, so don't play them for other characters.

## Keep from the original

- **Find Bear on every level.** Bear is the family cat, hidden somewhere
  in each level. When found, Bear follows the player and joins the ending.
  Keep the existing Bear mechanics.
- Three golden medals per level, secret walls and rooms, hidden blocks,
  balloons, musical blocks and all the other mechanics that already work.
- The engine, physics, touch controls (it's played on an iPad), the map,
  the sticker book, the save system and the robot playtest tools.
- The house style: original, whimsical, handcrafted. It should never look
  generic, no stock UI chrome, nothing that looks like a copy of another
  game. Round soft shapes lit from the top left, big friendly eyes. Read
  the header comments of `js/creatures.js` and `js/art.js`.

## What's different

- **No licensed IP at all.** The original has things Bonnie asked for:
  Pokémon, a football club's kits, branded theme parks and so on. Remove
  all of it from this edition: art, levels, sounds, map, sticker book,
  the reel tool. Grep for it. Christmas folklore is fine: Father
  Christmas, reindeer, elves, snowmen, stockings. Avoid named characters
  that someone owns, such as Rudolph, Frosty or The Snowman. Music is
  original, or uses public-domain *secular* carol melodies (Jingle Bells,
  Deck the Halls, We Wish You a Merry Christmas, Jolly Old St Nicholas…).
- **The old 55 levels, lands, stories, endings and map go.** This edition
  is its own game: one land, ten levels, its own story, its own ending.
  Keep the old levels only as reference while you build, then remove them.
  Keep the engine features they use, though.
- No crosses or religious symbols in the art (a standing choice from the
  original). Note the Guernsey flag has crosses on it.

## Setting it up as its own game (first thing, before anything else)

So it can have its own link and never touch the original's saves:

1. Change the save key in `js/game.js` (`var KEY = 'bonnie-bounce-save'`)
   to something like `'bonnie-christmas-save'`. Both games will live on
   the same github.io address, which shares browser storage, so if this
   isn't changed the editions overwrite each other's progress.
2. Change the service worker's cache name in `sw.js`
   (`'bonnie-bounce'` → `'bonnie-christmas'`). Change the
   `manifest.webmanifest` name, short name, id and start URL, the page
   `<title>`, and give it Christmas home-screen icons (`tools/icon.html`).
3. Run `git init` and make a first commit. Then tell Luke to open GitHub
   Desktop → File → Add Local Repository → this folder → **Publish
   repository**. Name it e.g. `bonnie-bounce-christmas` and set it up the
   same way as the original's repo (on a free GitHub account, Pages needs
   it public). Then in the repo on github.com: Settings →
   Pages → deploy from the `main` branch. That gives the new link. Luke
   pushes with GitHub Desktop ("Push origin"). End commit messages the way
   the original's do.
4. A preview server is set up: `preview_start {name: "christmas"}` serves
   this folder at http://localhost:8183. The original uses 8173, so both
   can run at once.

## The ten levels: Christmas in Guernsey

Luke lives in the Channel Islands, so ask him for the real details. The
Christmas-in-Guernsey feel should be real, local and lovely, not generic
snow-globe. Below are seeds to shape with him, not a fixed list. Check
anything factual with him rather than inventing it.

- St Peter Port at Christmas: harbour lights, the market, the steep
  streets and steps, the Town's lights coming on.
- Castle Cornet, and its noon-day gun.
- Candie Gardens, Saumarez Park and the Christmas lights; a frosty
  morning.
- The green lanes and hedge-veg stalls with their honesty boxes; Guernsey
  cows; the island's blue postboxes (a letter to Father Christmas?).
- The west-coast bays (Cobo, Vazon) at sunset; Fort Grey, the "cup and
  saucer"; the Boxing Day dip; rock pools at a big low tide.
- A boat trip to Herm and its Shell Beach; Sark by starlight, with no cars
  but horse and cart and bicycles, and La Coupée.
- Guernsey food: gâche, bean jar, Christmas pudding, mince pies.
- Christmas Eve over the rooftops, and Christmas Day with the whole family
  together for the ending.

A story to suggest to Luke (he decides): Christmas Eve is coming. Bear
has gone off on an adventure round the island, or Father Christmas needs
help. Each level ends at a cosy house with a present or a treat. The finale
is everyone together on Christmas morning, with the cousins, the aunties,
the uncles and Bear in a Christmas jumper.

**Wonder in every level.** Every level should have at least one moment
that makes a six-year-old gasp or giggle, plus surprises tucked away.
Ideas to build on:

- sledging slopes; ice to skate on (ice physics exists)
- snowballs to throw at baddies (a thrown ball exists)
- crackers that pop open with a surprise
- advent-calendar doors in walls hiding secrets
- presents sliding down wrapping-paper chutes
- fairy-light bridges that light up as you cross
- a reindeer or sleigh to ride (like the kite, the pterodactyl and the broomstick)
- a snow globe that sets the snow falling
- gingerbread platforms; jelly or Christmas pudding to bounce on
- the tide going out to reveal a path
- the noon-day gun launching you
- robins and seagulls and friendly snowmen

Spooky-cute was the half-term rule; here it's cosy-cute. Nothing scary,
nothing mean. Even the baddies are a bit silly.

## The quality bar (non-negotiable)

Match or beat the original's Half Term! land (levels 46–55 in the original:
`js/levels6.js`, `js/creatures6*.js`, `js/backdrop6.js`, `js/music6.js`).

- Every level is long and rich, roughly 420–480 tiles: three medals, Bear,
  secrets, a wonder moment. It gets gently trickier as it goes, but stays
  fair for a six-year-old.
- **Verify, don't assume.** For every level, run all of these, and when
  something fails, fix the level rather than the test:
  - `tools/playtest.html?level=…` must finish it.
  - `&medals=1` reaches all three medals.
  - `&bear=1` finds Bear.
  - `&stuck=1` hunts for places you can get into but not out of.
- Look at your own work. Use `tools/sheet.html` for sprites,
  `tools/backdrops.html` for backdrops and screenshots in the browser
  pane. Check it on an iPad-sized touch layout (`index.html?touch`).
- **Lessons from the original's QA. These bugs actually reached Bonnie:**
  - A secret room sitting across the path must be a tunnel, with a
    secret wall at each end. A one-door room you walk into from the
    ground and can't walk out of the far side reads as "stuck in the
    ground".
  - Every checkpoint must stand on the real ground. `L.check(x)` now does
    this itself. The robot restarts from every checkpoint to check.
  - Every ride must come back: rockets, pterodactyls, kites, boats.
    Never leave a one-shot ride that strands him.
  - Nothing should stand between a tunnel's exit and the way on.
  - A jump to a moving platform should be fair from where he's standing,
    not his maximum jump while it's moving.
- Comments explain *why*, like the original's. Keep `README.md` true for
  this edition.

## How to work with Luke

- Ask for the photos first, then pronouns and ages. Then propose the
  story and the ten levels (names, places, wonder moments) for him to
  approve before building.
- Build in stages and show him as you go: characters first, then a
  level or two, then the rest.
- Commit as you go. Luke pushes with GitHub Desktop.
- When it's done, a short trailer can come later (the original has
  `tools/reel`). Keep it clean: no text on screen, hard cuts, and nothing
  he hasn't approved.

## Luke's answers (29 Oct)

- **Beau**, 8, he/him: long wavy dark-blond hair past his shoulders,
  lighter at the ends, blue eyes, rosy cheeks, a big happy smile (drawn without the gap tooth: Luke, 29 Oct); a royal
  blue zip tracksuit with white stripes down the arms and legs.
- **Winnie**, 5, he/him: a blond bob, blue eyes, very rosy cheeks, a
  a big happy smile, double thumbs up; a black bomber jacket with red and
  white striped cuffs and collar.
- **Uncle Ollie**, he/him: shoulder-length wavy blond hair, a full blond
  beard, blue eyes, a big smile; a pale grey suit and a white shirt.
- **Aunty Grace**, she/her: long dark curly hair, half up, red lipstick,
  a big smile; a pink and red patterned dress with puffed sleeves and a
  sparkly necklace.
- **Prince**, Beau and Winnie's cat: white, with a black cap over his ears
  and round his eyes, a white stripe down his nose and a pink nose.
- No club badges or brand logos from the photos (the tracksuit's coaching
  badge, the football club): no licensed IP. Their colours are fine.
- Story: Father Christmas needs help. All the brief's Guernsey places are
  good. Yes to the Town's lights coming on and to the Boxing Day dip.
- Luke: "Make it crazy fun, so the boys are smiling and laughing as they
  play. Attention to detail in everything, even the map. I want the boys
  to LOVE it." Then QA it thoroughly.

## The approved plan (29 Oct)

**Story.** Christmas Eve in Guernsey, from morning to midnight. Father
Christmas is on his last practice flight over St Peter Port when **Grabby
Gus**, the greediest gull in Guernsey, spots the sleigh's shiny golden bell.
He swoops, the reindeer take fright, and the sleigh crash-lands in the
harbour. The eight reindeer scatter across the island and Gus flies off with
the bell. "Ho ho… oh no!" Each level ends at a cosy house where a family
member opens the door with a treat, and in levels 1–9 something lost waits
there doing something silly. Gus is silly, never mean: beaten, he says sorry,
gets a bag of chips for Christmas and joins the ending in a cracker crown.
Reindeer names come from the 1823 poem (public domain). Never Rudolph, and
no red nose.

| # | Level | Place, time | Wonder moment | Found at the end |
|---|---|---|---|---|
| 1 | Harbour Lights | St Peter Port harbour and market, morning | the first cracker: BANG, a paper crown (a gull tries to pinch it) | Dasher, dizzy round a lamp post, wrapped in tinsel |
| 2 | Frosty Morning | Candie Gardens | a giant snow globe starts the game's first snow; skating; sledging; the warm Victorian glasshouses | Prancer, skating in wobbly circles |
| 3 | The Noon-Day Gun | Castle Cornet | at noon the gun goes BOOM and fires you over the walls in tinsel | Dancer, dancing on the battlements |
| 4 | The Green Lanes | hedge-veg stalls, Guernsey cows | honesty boxes; cow rides; cows moo Jingle Bells; a blue postbox's whoosh of letters carries you up | Vixen, among the cows going "MOO" |
| 5 | Saumarez Park | on bikes, like the original's Bike Ride; the family rides alongside | the lake, the Japanese garden's bridges, the big playground | Father Christmas's hat, on a duck |
| 6 | Sunset Bays | Cobo and Vazon, the red rocks at sunset | the big low tide reveals a hidden path; sledge down the dunes | Cupid, buried to his antlers in a sandcastle |
| 7 | The Cup and Saucer | Fort Grey and Rocquaine at dusk | the lighthouse beam; shipwreck-treasure secret rooms | Donner, stuck on top of Fort Grey |
| 8 | Town Lights | St Peter Port's steep streets and steps as it gets dark | the Town's lights come on as you run; fairy-light bridges; the whole Town lights up | Comet, tangled in fairy lights |
| 9 | Shell Beach | the evening boat to Herm (ride there and back) | moonlit Shell Beach, sparkling shells; seals | Blitzen in a deckchair, in sunglasses |
| 10 | Sark by Starlight | no cars, the brightest stars; horse and cart, bikes, La Coupée | shooting stars; Grabby Gus at the top of the cliffs: stomp him when he's dizzy and win back the bell | the golden bell |
| 11 | Over the Rooftops | Christmas Eve night | fly Father Christmas's sleigh, drop presents down chimneys, windows glow; the last chimney is home | — |

**Ending:** Christmas morning, everyone round the tree: the cousins, the
aunties and uncles, Bear and Prince in jumpers, Gus in his crown, Father
Christmas waving from the sky. After the credits, the **Boxing Day dip**:
everyone runs into the sea, shrieks and runs straight back out; Bear and
Prince watch from a towel, appalled.

**Everywhere:** Bear *and* Prince hidden in every level (both join the
ending); sprouts that hop and go *pfft* when stomped; snowmen who sneeze
their carrots off; Christmas puddings to bounce on; Gus's gulls who try to
pinch your crown; advent-calendar doors hidden in walls, each opening a door
of an advent calendar in the sticker book; Christmas outfits to win (elf,
reindeer onesie, snowman, gingerbread, Father Christmas suit). A living map
of Guernsey with Herm and Sark: the sky goes from morning to starry night,
snow after level 2, the Town lights after level 8, the sleigh in the harbour
fills with reindeer, Gus circling; at the end a snowy Christmas morning.
Music: original, plus public-domain secular carols.

Still to ask Luke: whose house Christmas morning is at, and which beach the
Boxing Day dip is.
