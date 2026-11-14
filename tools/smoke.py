"""배포 전 자동 점검: 주요 화면 30곳을 열어 스크립트 오류·깨진 파일·빈 화면을 찾는다.
사용: python tools/smoke.py http://localhost:8765"""
import asyncio, sys
from playwright.async_api import async_playwright
BASE = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:8765'
ROUTES = ['home','map','feed','log','profile','login','signup','search','spot-anilao','spot-tulamben','life','gear','sell',
          'resorts','pros','meet','board','tools','safety','devices','partner','biz','ads','brand','privacy','terms',
          'rules','refund','sources','news','help','verify','beta','meet','meetnew']
IGNORE = ('429', 'tiles.openfreemap', 'basemaps', 'supabase.co', 'er-api', 'saferproducts', 'Failed to load resource: net::ERR', 'AbortError')
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for lang, w in [('ko', 390), ('en', 1280)]:
            pg = await b.new_page(viewport={'width': w, 'height': 900})
            errs = []
            pg.on('pageerror', lambda e: errs.append('JS ' + str(e)[:200]))
            pg.on('console', lambda m: errs.append('CON ' + m.text[:200]) if m.type == 'error' else None)
            pg.on('response', lambda r: errs.append(f'HTTP {r.status} {r.url}') if r.status >= 400 and r.url.startswith(BASE) else None)
            for r in ROUTES:
                errs.clear()
                await pg.goto(f'{BASE}/?lang={lang}#{r}' if lang == 'en' else f'{BASE}/#{r}')
                await pg.wait_for_timeout(1500)
                txt = (await pg.inner_text('main')).strip()
                e = [x for x in errs if not any(i in x for i in IGNORE)]
                if len(txt) < 10: e.append('빈 화면')
                if lang == 'en' and r in ('home', 'tools', 'safety') and any('가' <= ch <= '힣' for ch in txt.replace('한국어로 보기', '')[:400]): e.append('영어 화면에 한글 남음')
                print(('FAIL ' if e else 'ok   ') + lang, r, e[:3])
                if e: bad.append((lang, r, e))
        await b.close()
    print(f'\n{len(bad)} 곳 실패' if bad else '\n모두 통과')
    sys.exit(1 if bad else 0)
asyncio.run(main())
