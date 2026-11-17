"""생물 사진 다시 받기: assets/media/life_map.json (한글 이름 → 학명)을 보고
iNaturalist에서 그 학명 사진(상업 이용 가능한 CC BY · CC BY-SA · CC0만)을 받아 webp로 저장하고 life.json을 새로 써요."""
import json, os, sys, time, urllib.request, urllib.parse, io, hashlib
from PIL import Image
D = 'assets/media'
M = json.load(open(f'{D}/life_map.json', encoding='utf-8'))
OK = {'cc-by', 'cc-by-sa', 'cc0'}
LIC = {'cc-by': 'CC BY', 'cc-by-sa': 'CC BY-SA', 'cc0': 'CC0'}
def get(u):
    for _ in range(3):
        try:
            r = urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'divedeepocean-life/1.0'}), timeout=40)
            return r.read()
        except Exception as e:
            print('retry', u, e); time.sleep(5)
    return None
def taxon(sci):
    b = get('https://api.inaturalist.org/v1/taxa?' + urllib.parse.urlencode({'q': sci, 'per_page': 10, 'is_active': 'true'}))
    if not b: return None
    R = json.loads(b).get('results', [])
    for t in R:
        if t.get('name', '').lower() == sci.lower(): return t
    b = get('https://api.inaturalist.org/v1/taxa/autocomplete?' + urllib.parse.urlencode({'q': sci, 'per_page': 10}))
    for t in (json.loads(b).get('results', []) if b else []):
        if t.get('name', '').lower() == sci.lower(): return t
    return None
def photo(t):
    p = t.get('default_photo') or {}
    if p.get('license_code') in OK: return p
    # 관찰 기록 중 상업 이용 가능한 사진 (연구 등급, 추천 많은 순)
    b = get('https://api.inaturalist.org/v1/observations?' + urllib.parse.urlencode({'taxon_id': t['id'], 'photo_license': 'cc-by,cc-by-sa,cc0', 'quality_grade': 'research', 'order_by': 'votes', 'per_page': 5, 'photos': 'true'}))
    if b:
        for o in json.loads(b).get('results', []):
            for ph in o.get('photos', []):
                if ph.get('license_code') in OK: return ph
    b = get(f"https://api.inaturalist.org/v1/taxa/{t['id']}")
    if not b: return None
    for tp in (json.loads(b).get('results') or [{}])[0].get('taxon_photos', []):
        ph = tp.get('photo') or {}
        if ph.get('license_code') in OK: return ph
    return None
old = json.load(open(f'{D}/life.json', encoding='utf-8')) if os.path.exists(f'{D}/life.json') else {}
out, cache = {}, {}
for name, sci in M.items():
    if sci in cache:
        out[name] = dict(cache[sci]); continue
    t = taxon(sci); time.sleep(1.1)
    if not t: print('no taxon', name, sci); continue
    p = photo(t); time.sleep(1.1)
    if not p: print('no cc photo', name, sci); continue
    url = (p.get('medium_url') or p.get('url') or '').replace('square', 'medium')
    raw = get(url)
    if not raw: continue
    im = Image.open(io.BytesIO(raw)).convert('RGB'); im.thumbnail((640, 640))
    fn = 'lp_' + hashlib.md5(sci.encode()).hexdigest()[:10] + '.webp'
    im.save(f'{D}/{fn}', 'WEBP', quality=80)
    e = {'src': f'/assets/media/{fn}', 'author': (p.get('attribution') or '').replace('(c) ', '').split(',')[0].strip(),
         'license': LIC.get(p.get('license_code'), p.get('license_code')), 'page': f"https://www.inaturalist.org/photos/{p.get('id')}", 'sci': sci}
    cache[sci] = e; out[name] = dict(e); print('ok', name, sci)
print('done', len(out), '/', len(M))
for n, e in old.items():
    if n not in out and (n not in M or e.get('sci') == M[n]): out[n] = e  # 실패한 건 맞는 옛 사진만 남겨요
if len(out) > len(M) * 0.6:
    json.dump(out, open(f'{D}/life.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
