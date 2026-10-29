/* faces.js — a dev tool for checking everyone's faces: draws each player
   big, in each expression (standing, blinking, cheering, jumping, hurt)
   and the grown-ups' tall cameos, and saves the sheet to tools/reel/out/
   (served by tools/reel/serve.js). Load index.html, inject this script
   and run FACES.run('name'). */
(function () {
  'use strict';
  window.FACES = {
    // heads: just the top of each sprite, close up (the faces themselves)
    run: function (name, z, heads) {
      z = z || 5;
      var A = BB.ART, who = ['bonnie', 'beau', 'winnie', 'lucy', 'luke', 'grace', 'ollie'];
      var cols = [['idle', 'b'], ['blink', 'b'], ['cheer', 'b'], ['jump', 'b'], ['swim', 'b'], ['idle', 's']];
      var cw = 44, ch = heads ? 24 : 50, c = document.createElement('canvas');
      c.width = (cols.length + 1) * cw * z; c.height = who.length * ch * z;
      var g = c.getContext('2d');
      g.imageSmoothingEnabled = false;
      g.fillStyle = '#f4ecd8'; g.fillRect(0, 0, c.width, c.height);
      g.scale(z, z);
      who.forEach(function (w, r) {
        var P = A.player(w);
        var put = function (f, i) {
          if (!f) return;
          g.save(); g.beginPath(); g.rect(i * cw, r * ch, cw, ch); g.clip();
          BB.draw(g, f, i * cw + cw / 2 - f.w / 2, heads ? r * ch + 1 : r * ch + ch - 4 - f.h);
          g.restore();
        };
        cols.forEach(function (k, i) { put(P[k[1]][k[0]], i); });
        // the grown-ups' tall cameo (the cheering at the flags, the cottage door)
        var cam = A.family && A.family[w];
        if (cam && cam.idle) put(cam.idle, cols.length);
      });
      return new Promise(function (res) {
        c.toBlob(function (b) { fetch('/reel/frame?i=' + name, { method: 'POST', body: b }).then(function () { res(c.width + 'x' + c.height); }); });
      });
    }
  };
})();
