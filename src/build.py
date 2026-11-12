import re,json,shutil,os,hashlib
s=open('site/index.html').read()
css=s[s.index('<style>')+7:s.index('</style>')]
a=s.rindex('<script>'); b=s.rindex('</script>'); js=s[a+8:b]
head=s[:s.index('<style>')]; body=s[s.index('</head>'):a]
os.makedirs('dist/assets',exist_ok=True)
js=js.replace("fetch('land.json')","fetch('/assets/land.json')").replace("fetch('sites.json')","fetch('/assets/sites.json')")
head=head.replace('<title>','<meta property="og:type" content="website">\n<meta property="og:site_name" content="Dive the deep ocean">\n<meta property="og:title" content="Dive the deep ocean · 숨 한 번 고르고, 더 깊은 바다로">\n<meta property="og:description" content="전 세계 스쿠버·프리다이빙 포인트, 리조트, 해양생물, 로그와 장비 정비까지. 다이버는 모두 무료.">\n<meta property="og:image" content="https://www.divedeepocean.com/assets/og.jpg">\n<meta property="og:url" content="https://www.divedeepocean.com/">\n<meta name="twitter:card" content="summary_large_image">\n<link rel="canonical" href="https://www.divedeepocean.com/">\n<title>',1)
head=head.replace('href="icon-192.png"','href="/assets/icon-192.png"').replace('href="manifest.json"','href="/manifest.json"')
V=hashlib.sha1((css+js).encode()).hexdigest()[:8]
open('dist/assets/app.%s.css'%V,'w').write(css); open('dist/assets/app.%s.js'%V,'w').write(js)
open('dist/assets/cfg.js','w').write('window.DTDO_BACKEND={url:"https://crasesnlwwyegdgzkqes.supabase.co",key:"sb_publishable_cCtDGcChyf_L193Px9omDw_5zl85o1J"};\n')
cfg='<script src="/assets/cfg.js"></script>\n'
shell=head+'<link rel="stylesheet" href="/assets/app.%s.css">\n'%V+body+cfg+'<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js" integrity="sha384-0w2KAL2YHP6wKOkUDzkCDGgVvfmHnj02DHeQ6XcHOgTfFsGyonKOpShMH1x6nk9o" crossorigin="anonymous"></script>\n<script src="/assets/app.%s.js"></script>\n</body>\n</html>\n'%V
open('dist/index.html','w').write(shell)
for f in ['sites.json','icon-192.png','icon-512.png','icon-maskable-512.png','og.jpg']: shutil.copy('site/'+f,'dist/assets/'+f)
if os.path.exists('dist/assets/media'): shutil.rmtree('dist/assets/media')
shutil.copytree('site/media','dist/assets/media')
open('dist/robots.txt','w').write('User-agent: *\nAllow: /\nSitemap: https://www.divedeepocean.com/sitemap.xml\n')
import datetime
open('dist/sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.divedeepocean.com/</loc><lastmod>%s</lastmod></url></urlset>\n'%datetime.date.today())
shutil.copy('site/manifest.json','dist/manifest.json')
m=json.load(open('dist/manifest.json')); m['start_url']='/'; m['scope']='/'
for ic in m['icons']: ic['src']='/assets/'+ic['src']
json.dump(m,open('dist/manifest.json','w'),ensure_ascii=False)
sw=open('site/sw.js').read().replace("const C='dtdo-v1';const SHELL=['./','index.html','manifest.json','icon-192.png'];","const C='dtdo-%s';const SHELL=['/','/manifest.json','/assets/app.%s.css','/assets/app.%s.js','/assets/icon-192.png'];"%(V,V,V))
open('dist/sw.js','w').write(sw)
ST='https://crasesnlwwyegdgzkqes.supabase.co/storage/v1/object/public/site/'
SEC=[{"key":"Content-Security-Policy","value":"default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://tiles.openfreemap.org https://crasesnlwwyegdgzkqes.supabase.co https://inaturalist-open-data.s3.amazonaws.com https://static.inaturalist.org https://tile.openstreetmap.org https://upload.wikimedia.org https://cdn.jsdelivr.net; media-src 'self' https://upload.wikimedia.org; connect-src 'self' https://tiles.openfreemap.org https://crasesnlwwyegdgzkqes.supabase.co wss://crasesnlwwyegdgzkqes.supabase.co https://marine-api.open-meteo.com https://api.inaturalist.org https://cdn.jsdelivr.net; worker-src 'self' blob:; child-src blob:; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"},{"key":"Strict-Transport-Security","value":"max-age=63072000; includeSubDomains; preload"},{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"X-Frame-Options","value":"DENY"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},{"key":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=(self), payment=()"}]
json.dump({"cleanUrls":False,"headers":[{"source":"/(.*)","headers":SEC},{"source":"/assets/app.(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]},{"source":"/assets/media/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=604800"}]},{"source":"/sw.js","headers":[{"key":"Cache-Control","value":"no-cache"}]},{"source":"/","headers":[{"key":"Cache-Control","value":"no-cache"}]}]},open('dist/vercel.json','w'),indent=1)
print(V,{f:os.path.getsize('dist/'+f) for f in ['index.html','manifest.json','sw.js','vercel.json']})
open('dist/VERSION','w').write(V)
# ---- 검색엔진용 포인트 정적 페이지 ----
import subprocess,html as H
spots=json.loads(subprocess.check_output(['node','-e','''const s=require("fs").readFileSync("site/index.html","utf8").split("\\n");global.PAL=["#1"];const i=s.findIndex(l=>l.startsWith("var SPOTS=["));let j=i;while(!s[j].startsWith("].map("))j++;eval(s.slice(i,j+1).join("\\n").replace("var SPOTS","global.SPOTS"));const e=s.find(l=>l.startsWith("var EN="));eval(e.replace("var EN","global.EN"));process.stdout.write(JSON.stringify(SPOTS.map(x=>Object.assign({},x,{en:EN[x.id]}))))''']))
M=json.load(open('site/media/media.json'))
os.makedirs('dist/spot',exist_ok=True)
CSSL='/assets/app.%s.css'%V
items=[]
for x in spots:
  ph=(M.get(x['id']) or {}).get('photos') or []
  img=('https://www.divedeepocean.com'+ph[0]['src']) if ph else 'https://www.divedeepocean.com/assets/og.jpg'
  t='%s 다이빙 · %s'%(x['name'],x['country']);d='%s (%s). %s 시즌 %s, 수심 %s, 수온 %s, 난이도 %s.'%(x['name'],x['en'],x['desc'],x['season'],x['depth'],x['temp'],x['lv'])
  ld={"@context":"https://schema.org","@type":"TouristAttraction","name":x['name'],"alternateName":x['en'],"description":x['desc'],"image":img,"geo":{"@type":"GeoCoordinates","latitude":x['lat'],"longitude":x['lon']},"address":{"@type":"PostalAddress","addressCountry":x['country']},"touristType":["스쿠버다이버","프리다이버"],"url":"https://www.divedeepocean.com/spot/"+x['id']}
  cr=''.join('<figure style="margin:0"><img src="%s" alt="%s" loading="lazy" style="width:100%%;border-radius:12px"><figcaption class="small"><a href="%s">%s · %s</a></figcaption></figure>'%(H.escape(p.get('thumb') or p['src']),H.escape(x['name']),H.escape(p['page']),H.escape(p['author']),H.escape(p['license'])) for p in ph[:3])
  life=' · '.join(H.escape(l) for l in x.get('life') or [])
  page='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>%s | Dive the deep ocean</title><meta name="description" content="%s"><link rel="canonical" href="https://www.divedeepocean.com/spot/%s"><meta property="og:type" content="article"><meta property="og:title" content="%s"><meta property="og:description" content="%s"><meta property="og:image" content="%s"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/icon-192.png"><link rel="stylesheet" href="%s"><script type="application/ld+json">%s</script></head><body style="background:var(--bg);color:var(--ink)"><main style="max-width:860px;margin:0 auto;padding:24px 16px;display:flex;flex-direction:column;gap:16px"><a href="/" style="font-weight:700;color:var(--sea)">Dive the deep ocean</a><h1 style="margin:0">%s</h1><p style="margin:0;color:var(--sub)">%s · %s · %s</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">%s</div><p>%s</p><div class="panel"><b>시즌</b> %s · <b>수심</b> %s · <b>수온</b> %s · <b>난이도</b> %s</div><div class="panel"><b>만날 수 있는 생물</b><br>%s</div><div class="panel"><b>가는 길</b><br>%s</div><a class="btn btn-pri" href="/#spot-%s" style="align-self:flex-start">앱에서 지도·후기·리조트 보기</a><p class="small">일반적으로 알려진 정보예요. 실제 상황은 현지 브리핑을 따르세요.</p></main></body></html>'%(H.escape(t),H.escape(d),x['id'],H.escape(t),H.escape(d),img,CSSL,json.dumps(ld,ensure_ascii=False),H.escape(x['name']),H.escape(x['en']),H.escape(x['country']),H.escape(x['kind']),cr,H.escape(x['desc']),H.escape(x['season']),H.escape(x['depth']),H.escape(x['temp']),H.escape(x['lv']),life or '—',H.escape(x.get('gw') or ''),x['id'])
  open('dist/spot/%s.html'%x['id'],'w').write(page);items.append(x['id'])
import datetime
today=datetime.date.today().isoformat()
open('dist/sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.divedeepocean.com/</loc><lastmod>%s</lastmod></url>%s</urlset>\n'%(today,''.join('<url><loc>https://www.divedeepocean.com/spot/%s</loc><lastmod>%s</lastmod></url>'%(i,today) for i in items)))
vj=json.load(open('dist/vercel.json'));vj['rewrites']=[{"source":"/spot/:id","destination":"/spot/:id.html"}];json.dump(vj,open('dist/vercel.json','w'),indent=1)
print('spot pages',len(items))
