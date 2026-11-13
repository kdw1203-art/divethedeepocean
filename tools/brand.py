"""Builds Dive the deep ocean logo files with text converted to outlines (no font needed to print)."""
import math, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
F = '/tmp/tz/node_modules/@fontsource/sora/files/sora-latin-%d-normal.woff'
FONTS = {w: TTFont(F % w) for w in (500, 600, 700)}
OUT = '/home/claude/dive/brand'
C = dict(sky='#5CC8F0', mid='#2C8FC4', sea='#0A5C8A', navy='#0B1F2E', arc='#1C5C84', coral='#F6A04D', pale='#8FD3F2', foam='#CFEFFB', white='#FFFFFF')

def metrics(w):
    f = FONTS[w]; return f['head'].unitsPerEm, f['hhea'].ascent, -f['hhea'].descent

def run(text, w, size, ls, x, y, rot=None):
    """Return (path d, advance) for text with baseline at (x,y). rot=(cx,cy,deg,anchor_dx) for single glyphs."""
    f = FONTS[w]; gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm; s = size / upm
    d = []; cx = x
    for ch in text:
        g = cmap.get(ord(ch)); 
        if g is None: cx += size * .3 + ls; continue
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
        gs[g].draw(tp); d.append(pen.getCommands())
        cx += gs[g].width * s + ls
    return ' '.join(d), cx - x - ls

def adv(text, w, size, ls):
    return run(text, w, size, ls, 0, 0)[1]

def line_baseline(top, w, size, lh):
    upm, a, dsc = metrics(w); asc = a / upm * size; de = dsc / upm * size
    return top + (lh - (asc + de)) / 2 + asc

def svg(w, h, body, title):
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.1f %.1f" width="%.0f" height="%.0f" role="img" aria-label="%s"><title>%s</title>%s</svg>\n' % (w, h, w, h, title, title, body)

# ---- 1. 메인 로고: 물결 ----
def waves(sx, ox, oy, cols):
    return ''.join('<path d="M10 %d q12.5 -11 25 0 t25 0 t25 0 t25 0" fill="none" stroke="%s" stroke-width="8" stroke-linecap="round" transform="translate(%.2f %.2f) scale(%.4f)"/>' % (y, c, ox, oy, sx, sx) if False else
                   '<g transform="translate(%.2f %.2f) scale(%.4f)"><path d="M10 %d q12.5 -11 25 0 t25 0 t25 0 t25 0" fill="none" stroke="%s" stroke-width="8" stroke-linecap="round"/></g>' % (ox, oy, sx, y, c) for y, c in zip((28, 50, 72, 94), cols))
def main_logo(dark=False):
    S = 92; sx = S / 120; gap = 18; size = 30; lh = 33; ls = -0.5; m = 6
    cols = (C['sky'], C['mid'], C['sea'], C['white'] if dark else C['navy'])
    t1, t2 = (C['white'], C['sky']) if dark else (C['navy'], C['sea'])
    tx = m + S + gap; top = m + (S - 2 * lh) / 2
    d1, w1 = run('Dive the', 700, size, ls, tx, line_baseline(top, 700, size, lh))
    d2, w2 = run('deep ocean', 700, size, ls, tx, line_baseline(top + lh, 700, size, lh))
    W = tx + max(w1, w2) + m; H = S + 2 * m
    body = waves(sx, m, m, cols) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (d1, t1, d2, t2)
    return svg(W, H, body, 'Dive the deep ocean')
def main_symbol(dark=False):
    cols = (C['sky'], C['mid'], C['sea'], C['white'] if dark else C['navy'])
    return svg(120, 120, waves(1, 0, 0, cols), 'Dive the deep ocean')
def main_stacked(dark=False):
    S = 120; size = 34; lh = 37; ls = -0.5; m = 8
    cols = (C['sky'], C['mid'], C['sea'], C['white'] if dark else C['navy'])
    t1, t2 = (C['white'], C['sky']) if dark else (C['navy'], C['sea'])
    w1 = adv('Dive the', 700, size, ls); w2 = adv('deep ocean', 700, size, ls); W = max(w1, w2, S) + 2 * m
    top = m + S + 6
    d1, _ = run('Dive the', 700, size, ls, (W - w1) / 2, line_baseline(top, 700, size, lh))
    d2, _ = run('deep ocean', 700, size, ls, (W - w2) / 2, line_baseline(top + lh, 700, size, lh))
    body = waves(1, (W - S) / 2, m, cols) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (d1, t1, d2, t2)
    return svg(W, top + 2 * lh + m, body, 'Dive the deep ocean')

# ---- 2. 소나 로고 ----
def sonar_sym(ox, oy, sx):
    g = '<g transform="translate(%.2f %.2f) scale(%.4f)">' % (ox, oy, sx)
    g += '<path d="M38 98 A22 22 0 0 1 82 98" fill="none" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % C['sky']
    g += '<path d="M20 98 A40 40 0 0 1 100 98" fill="none" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % C['mid']
    g += '<path d="M4 98 A56 56 0 0 1 116 98" fill="none" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % C['arc']
    return g + '<circle cx="60" cy="98" r="8" fill="%s"/></g>' % C['coral']
def sonar_logo(dark=True):
    S = 96; sx = S / 120; gap = 18; m = 6
    a_col, b_col = (C['pale'], C['white']) if dark else (C['mid'], C['navy'])
    lh1 = 20; lh2 = 34 * 1.1; blk = lh1 + lh2
    # symbol art spans y 42..106 of 120 → visually center text on the arcs
    sy0 = m; art_top = sy0 + 38 * sx; art_bot = sy0 + 106 * sx; top = (art_top + art_bot) / 2 - blk / 2
    tx = m + S + gap
    d1, w1 = run('DIVE THE', 500, 16, 3, tx, line_baseline(top, 500, 16, lh1))
    d2, w2 = run('deep ocean', 700, 34, -0.5, tx, line_baseline(top + lh1, 700, 34, lh2))
    W = tx + max(w1, w2) + m; H = S + 2 * m
    return svg(W, H, sonar_sym(m, sy0, sx) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (d1, a_col, d2, b_col), 'Dive the deep ocean')
def sonar_symbol():
    return svg(120, 120, sonar_sym(0, 0, 1), 'Dive the deep ocean')

# ---- 3. 뱃지 ----
def badge():
    b = '<circle cx="100" cy="100" r="94" fill="%s"/>' % C['navy']
    b += '<circle cx="100" cy="100" r="58" fill="none" stroke="%s" stroke-width="2.5"/>' % C['sky']
    b += '<path d="M42 100 A58 58 0 0 0 158 100 Z" fill="%s"/>' % C['sea']
    b += '<path d="M42 100 q7 -6 14.5 0 t14.5 0 t14.5 0 t14.5 0 t14.5 0 t14.5 0 t14.5 0 t14.5 0" fill="none" stroke="%s" stroke-width="3"/>' % C['sky']
    for y in (114, 124, 134): b += '<circle cx="100" cy="%d" r="2.5" fill="%s"/>' % (y, C['foam'])
    b += '<circle cx="100" cy="146" r="6" fill="%s"/>' % C['coral']
    # text along the upper arc r=70, centered
    txt, w, size, ls, R = 'DIVE THE DEEP OCEAN', 600, 15, 3, 70
    f = FONTS[w]; gs = f.getGlyphSet(); cmap = f.getBestCmap(); s = size / f['head'].unitsPerEm
    advs = [gs[cmap[ord(c)]].width * s if ord(c) in cmap else size * .3 for c in txt]
    L = sum(advs) + ls * (len(txt) - 1); pos = (math.pi * R - L) / 2; ds = []
    for ch, a in zip(txt, advs):
        mid = pos + a / 2; th = math.pi - mid / R
        px, py = 100 + R * math.cos(th), 100 - R * math.sin(th); rot = (math.pi / 2 - th) * 180 / math.pi
        if ord(ch) in cmap:
            pen = SVGPathPen(gs); r = math.radians(rot); cr, sr = math.cos(r), math.sin(r)
            # glyph space (x right, y up) → rotate → place
            tp = TransformPen(pen, (s * cr, s * sr, s * sr, -s * cr, px - a / 2 * cr, py - a / 2 * sr))
            gs[cmap[ord(ch)]].draw(tp); ds.append(pen.getCommands())
        pos += a + ls
    b += '<path d="%s" fill="%s"/>' % (' '.join(ds), C['white'])
    return svg(200, 200, b, 'Dive the deep ocean 뱃지')

files = {
  'logo-main.svg': main_logo(False), 'logo-main-dark.svg': main_logo(True),
  'logo-main-stacked.svg': main_stacked(False), 'logo-main-stacked-dark.svg': main_stacked(True),
  'symbol-waves.svg': main_symbol(False), 'symbol-waves-dark.svg': main_symbol(True),
  'logo-sonar-dark.svg': sonar_logo(True), 'logo-sonar-light.svg': sonar_logo(False), 'symbol-sonar.svg': sonar_symbol(),
  'badge.svg': badge(),
}
for k, v in files.items(): open(os.path.join(OUT, k), 'w').write(v)
print('\n'.join(files))
