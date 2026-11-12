"""Monthly OSM refresh for assets/sites.json.

Merges new dive centres / dive sites / dive resorts from OpenStreetMap (Overpass API)
into the existing list. Existing entries are never removed, so a failed or partial
Overpass run cannot shrink the data. Format: [lat, lon, name, type]
type 0 = 센터·샵, 1 = 포인트, 2 = 리조트·숙소
"""
import json, math, sys, time, urllib.request, urllib.parse

PATH = sys.argv[1] if len(sys.argv) > 1 else 'assets/sites.json'
EP = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
Q = """[out:json][timeout:180];
(
  nwr["shop"="scuba_diving"]({b});
  nwr["amenity"="dive_centre"]({b});
  nwr["leisure"="dive_centre"]({b});
  nwr["sport"="scuba_diving"]["name"]({b});
  nwr["scuba_diving:divespot"="yes"]["name"]({b});
  nwr["tourism"~"hotel|resort|guest_house"]["sport"="scuba_diving"]({b});
);
out center tags;"""
# 30x60 degree tiles keep each query small enough for public Overpass servers
TILES = [(la, lo, la + 30, lo + 60) for la in range(-60, 75, 30) for lo in range(-180, 180, 60)]

def kind(t):
    if t.get('scuba_diving:divespot') == 'yes' or t.get('leisure') == 'dive_site':
        return 1
    if t.get('tourism') in ('hotel', 'resort', 'guest_house'):
        return 2
    return 0

def fetch(b):
    q = Q.replace('{b}', '%s,%s,%s,%s' % b)
    data = urllib.parse.urlencode({'data': q}).encode()
    for ep in EP:
        for _ in range(2):
            try:
                req = urllib.request.Request(ep, data=data, headers={'User-Agent': 'divedeepocean-osm-refresh/1.0'})
                with urllib.request.urlopen(req, timeout=200) as r:
                    return json.load(r).get('elements', [])
            except Exception as e:
                print('retry', ep, b, e, file=sys.stderr)
                time.sleep(20)
    return None

def near(a, b):
    return abs(a[0] - b[0]) < 0.003 and abs(a[1] - b[1]) < 0.003

old = json.load(open(PATH, encoding='utf-8'))
grid = {}
for s in old:
    grid.setdefault((round(s[0], 1), round(s[1], 1)), []).append(s)
added, failed = [], 0
for b in TILES:
    els = fetch(b)
    if els is None:
        failed += 1
        continue
    for e in els:
        t = e.get('tags', {})
        n = (t.get('name:ko') or t.get('name') or t.get('name:en') or '').strip()
        lat = e.get('lat') or (e.get('center') or {}).get('lat')
        lon = e.get('lon') or (e.get('center') or {}).get('lon')
        if not n or lat is None or lon is None:
            continue
        item = [round(lat, 4), round(lon, 4), n[:80], kind(t)]
        key = (round(item[0], 1), round(item[1], 1))
        if any(near(item, s) and s[2].lower() == item[2].lower() for s in grid.get(key, [])):
            continue
        grid.setdefault(key, []).append(item)
        added.append(item)
    time.sleep(5)
print('tiles failed', failed, 'added', len(added))
if added:
    json.dump(old + added, open(PATH, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
