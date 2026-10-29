# tools/qa/sheet.py TAG [cols]: tiles tools/reel/out/fp-TAG-*.png into fp-TAG-sheet.png, for the review
import sys, glob
from PIL import Image
tag = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 3
files = sorted(glob.glob('tools/reel/out/fp-%s-[0-9]*.png' % tag))
ims = [Image.open(f) for f in files]
w = max(i.width for i in ims); h = max(i.height for i in ims); rows = (len(ims) + cols - 1) // cols
o = Image.new('RGB', (cols * (w + 6), rows * (h + 6)), 'black')
for k, i in enumerate(ims): o.paste(i, ((k % cols) * (w + 6), (k // cols) * (h + 6)))
o.save('tools/reel/out/fp-%s-sheet.png' % tag); print(o.size, len(ims))
