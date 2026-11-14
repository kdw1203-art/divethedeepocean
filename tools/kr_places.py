"""국내 다이빙 업체와 포인트 근처 숙소를 OpenStreetMap에서 모아 assets/sites.json에 합친다.
기존 항목은 지우지 않는다. 형식: [lat, lon, name, type, label]  type 0 센터·샵, 2 리조트·숙소"""
import json, math, sys, time, urllib.request, urllib.parse
PATH = sys.argv[1] if len(sys.argv) > 1 else 'assets/sites.json'
EP = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
SPOTS = [(33.22,126.57),(33.5,126.95),(37.5,130.9),(38.38,128.5),(38.08,128.63),(37.8,128.92),(36.7,129.6),(34.03,127.3),(34.84,128.43),(34.68,125.2)]
ABROAD = [(13.76, 120.9), (9.95, 123.4), (9.52, 123.68), (11.33, 124.12), (12.0, 120.2), (13.52, 120.97), (9.2, 123.27), (11.2, 119.4), (-8.28, 115.6), (-8.34, 115.66), (-8.73, 115.5), (-8.35, 116.05), (-8.55, 119.5), (26.2, 127.3), (26.44, 127.77), (24.4, 124.2), (24.8, 125.3), (7.3, 134.5), (15.26, 145.8), (13.45, 144.65), (10.1, 99.84), (7.6, 98.36), (7.74, 98.77), (4.115, 118.63), (4.24, 118.63), (12.2, 109.3), (28.5, 34.52), (3.6, 72.85), (20.42, -86.95)]
KR = '33.0,124.5,38.7,131.0'
LAB = {'hotel':'호텔','resort':'리조트','guest_house':'게스트하우스·펜션','motel':'모텔','hostel':'호스텔','chalet':'펜션','apartment':'레지던스'}
def run(q):
    data = urllib.parse.urlencode({'data': '[out:json][timeout:120];' + q}).encode()
    for ep in EP:
        for _ in range(2):
            try:
                req = urllib.request.Request(ep, data=data, headers={'User-Agent': 'divedeepocean-kr-places/1.0'})
                with urllib.request.urlopen(req, timeout=150) as r:
                    return json.load(r).get('elements', [])
            except Exception as e:
                print('retry', ep, e, file=sys.stderr); time.sleep(15)
    return []
def km(a, b, c, d):
    x = math.radians(c - a); y = math.radians(d - b) * math.cos(math.radians(a)); return 6371 * math.hypot(x, y)
def pos(e):
    return (e.get('lat') or (e.get('center') or {}).get('lat'), e.get('lon') or (e.get('center') or {}).get('lon'))
old = json.load(open(PATH, encoding='utf-8'))
seen = {(round(s[0], 3), round(s[1], 3), s[2].lower()) for s in old}
add = []
def push(lat, lon, name, typ, label):
    k = (round(lat, 3), round(lon, 3), name.lower())
    if k in seen: return
    seen.add(k); add.append([round(lat, 4), round(lon, 4), name[:80], typ, label])
# 1) 전국 다이빙 업체: 태그 또는 이름으로
els = run('(nwr["shop"="scuba_diving"](%s);nwr["amenity"="dive_centre"](%s);nwr["leisure"="dive_centre"](%s);nwr["sport"~"scuba_diving|free-diving|freediving"]["name"](%s);nwr["name"~"다이브|다이빙|스쿠버|잠수풀|Dive|Scuba",i]["shop"](%s);nwr["name"~"다이브|다이빙|스쿠버|Dive|Scuba",i]["tourism"](%s);nwr["name"~"다이브|다이빙|스쿠버|잠수풀",i]["leisure"](%s););out center tags;' % ((KR,) * 7))
for e in els:
    t = e.get('tags', {}); n = (t.get('name:ko') or t.get('name') or '').strip(); la, lo = pos(e)
    if n and la is not None: push(la, lo, n, 2 if t.get('tourism') else 0, '다이빙 리조트' if t.get('tourism') else '다이빙 업체')
print('dive', len(add)); time.sleep(8)
# 2) 포인트 8km 안 숙소, 가까운 순 60곳
for la0, lo0 in SPOTS:
    els = run('nwr(around:8000,%s,%s)["tourism"~"hotel|resort|guest_house|motel|hostel|chalet|apartment"]["name"];out center tags;' % (la0, lo0))
    L = []
    for e in els:
        t = e.get('tags', {}); n = (t.get('name:ko') or t.get('name') or '').strip(); la, lo = pos(e)
        if n and la is not None: L.append((km(la0, lo0, la, lo), la, lo, n, LAB.get(t.get('tourism'), '숙소')))
    L.sort()
    for d, la, lo, n, lab in L[:60]: push(la, lo, n, 2, lab)
    print(la0, lo0, len(els), len(add)); time.sleep(8)
def save():
    if add:
        json.dump(old + add, open(PATH, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
save()
# 3) 한국인이 자주 가는 해외 포인트 6km 안 숙소, 가까운 순 40곳
for la0, lo0 in ABROAD:
    els = run('nwr(around:6000,%s,%s)["tourism"~"hotel|resort|guest_house|hostel"]["name"];out center tags;' % (la0, lo0))
    L = []
    for e in els:
        t = e.get('tags', {}); n = (t.get('name:ko') or t.get('name:en') or t.get('name') or '').strip(); la, lo = pos(e)
        if n and la is not None: L.append((km(la0, lo0, la, lo), la, lo, n, LAB.get(t.get('tourism'), '숙소')))
    L.sort()
    for d, la, lo, n, lab in L[:40]: push(la, lo, n, 2, lab)
    print(la0, lo0, len(els), len(add), flush=True); save(); time.sleep(8)
print('added', len(add))
