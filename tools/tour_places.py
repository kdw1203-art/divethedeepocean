"""한국관광공사 TourAPI(국문 관광정보 KorService2)에서 국내 다이빙 업체·리조트를 모아 assets/sites.json에 합친다.
키는 환경 변수 TOURAPI_KEY로만 받는다. 형식: [lat, lon, name, type, label]"""
import json, os, re, sys, time, urllib.request, urllib.parse
KEY = os.environ.get('TOURAPI_KEY', '').strip()
if not KEY: print('TOURAPI_KEY 없음: 건너뜀'); sys.exit(0)
PATH = sys.argv[1] if len(sys.argv) > 1 else 'assets/sites.json'
BASE = 'https://apis.data.go.kr/B551011/KorService2/searchKeyword2'
RX = re.compile(r'다이브|다이빙|스쿠버|스킨스쿠버|잠수|프리다이|dive|scuba', re.I)
def call(kw, page):
    q = {'serviceKey': KEY, 'MobileOS': 'ETC', 'MobileApp': 'divedeepocean', '_type': 'json', 'numOfRows': '100', 'pageNo': str(page), 'arrange': 'A', 'keyword': kw}
    u = BASE + '?' + urllib.parse.urlencode(q)
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'divedeepocean-tour/1.0'}), timeout=40) as r:
                t = r.read().decode('utf-8', 'replace')
            try: return json.loads(t)
            except Exception: print('JSON 아님:', re.sub(r'serviceKey=[^&\s"<]+', 'serviceKey=***', t)[:300]); return None
        except Exception as e:
            print('retry', kw, page, type(e).__name__); time.sleep(5)
    return None
old = json.load(open(PATH, encoding='utf-8'))
seen = {re.sub(r'\s+', '', s[2]).lower() for s in old}
add = []; total = 0
for kw in ['스쿠버', '다이빙', '다이브', '프리다이빙', '스킨스쿠버', '잠수풀']:
    page = 1
    while page <= 10:
        d = call(kw, page)
        body = (((d or {}).get('response') or {}).get('body') or {})
        items = ((body.get('items') or {}) if isinstance(body.get('items'), dict) else {}).get('item') or []
        if isinstance(items, dict): items = [items]
        if page == 1: print(kw, 'totalCount', body.get('totalCount'), 'header', ((d or {}).get('response') or {}).get('header'))
        for it in items:
            total += 1
            name = (it.get('title') or '').strip()
            try: lat, lon = float(it.get('mapy') or 0), float(it.get('mapx') or 0)
            except ValueError: continue
            if not name or not RX.search(name) or not (33 < lat < 39 and 124 < lon < 132): continue
            k = re.sub(r'\s+', '', name).lower()
            if k in seen: continue
            seen.add(k)
            addr = (it.get('addr1') or '').split()
            area = ' '.join(addr[:2]) if addr else ''
            tel = re.sub(r'<[^>]+>', '', it.get('tel') or '').strip()[:20]
            stay = str(it.get('contenttypeid')) == '32' or '리조트' in name
            label = ('다이빙 리조트' if stay else '다이빙 업체') + (' · ' + area if area else '') + (' · ' + tel if tel else '')
            add.append([round(lat, 4), round(lon, 4), name[:80], 2 if stay else 0, label[:80]])
        if len(items) < 100: break
        page += 1; time.sleep(1)
# 2) 레포츠 전체 목록에서 스쿠버 분류를 찾아 이름에 다이빙이 없는 업체도 받는다
LIST = BASE.replace('searchKeyword2', 'areaBasedList2')
def call2(page):
    q = {'serviceKey': KEY, 'MobileOS': 'ETC', 'MobileApp': 'divedeepocean', '_type': 'json', 'numOfRows': '1000', 'pageNo': str(page), 'arrange': 'A', 'contentTypeId': '28'}
    u = LIST + '?' + urllib.parse.urlencode(q)
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'divedeepocean-tour/1.0'}), timeout=90) as r:
                return json.loads(r.read().decode('utf-8', 'replace'))
        except Exception as e:
            print('retry list', page, type(e).__name__); time.sleep(6)
    return None
allit = []; page = 1
while page <= 15:
    d = call2(page); body = (((d or {}).get('response') or {}).get('body') or {})
    items = ((body.get('items') or {}) if isinstance(body.get('items'), dict) else {}).get('item') or []
    if isinstance(items, dict): items = [items]
    if page == 1: print('레포츠 totalCount', body.get('totalCount'), 'keys', sorted((items[0] if items else {}).keys()))
    allit += items
    if len(items) < 1000: break
    page += 1; time.sleep(1)
def code(it): return it.get('lclsSystm3') or it.get('cat3') or ''
hist = {}
for it in allit:
    c = code(it); h = hist.setdefault(c, [0, 0]); h[0] += 1
    if RX.search(it.get('title') or ''): h[1] += 1
good = {c for c, h in hist.items() if c and h[1] >= 3 and h[1] / h[0] >= 0.25 and h[0] <= 600}
print('분류별(전체, 이름일치):', {c: h for c, h in hist.items() if h[1]}, '채택', good)
for it in allit:
    name = (it.get('title') or '').strip()
    if not name or not (code(it) in good or RX.search(name)): continue
    try: lat, lon = float(it.get('mapy') or 0), float(it.get('mapx') or 0)
    except ValueError: continue
    if not (33 < lat < 39 and 124 < lon < 132): continue
    k = re.sub(r'\s+', '', name).lower()
    if k in seen: continue
    seen.add(k); addr = (it.get('addr1') or '').split(); area = ' '.join(addr[:2]) if addr else ''
    tel = re.sub(r'<[^>]+>', '', it.get('tel') or '').strip()[:20]; stay = '리조트' in name
    add.append([round(lat, 4), round(lon, 4), name[:80], 2 if stay else 0, (('다이빙 리조트' if stay else '다이빙 업체') + (' · ' + area if area else '') + (' · ' + tel if tel else ''))[:80]])
print('받은 항목', total, '레포츠 목록', len(allit), '새로 추가', len(add))
for a in add[:40]: print(' ', a[2], '|', a[4])
if add:
    json.dump(old + add, open(PATH, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
