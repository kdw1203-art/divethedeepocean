import re,json,shutil,os,hashlib
s=open('site/index.html').read()
css=s[s.index('<style>')+7:s.index('</style>')]
a=s.rindex('<script>'); b=s.rindex('</script>'); js=s[a+8:b]
head=s[:s.index('<style>')]; body=s[s.index('</head>'):a]
os.makedirs('dist/assets',exist_ok=True)
js=js.replace("fetch('land.json')","fetch('/assets/land.json')").replace("fetch('sites.json')","fetch('/assets/sites.json')")
head=head.replace('<title>','<meta property="og:type" content="website">\n<meta property="og:site_name" content="Dive the deep ocean">\n<meta property="og:title" content="Dive the deep ocean · 다음 바다, 여기서 고르세요">\n<meta property="og:description" content="전 세계 스쿠버·프리다이빙 포인트, 리조트, 해양생물, 로그와 장비 정비까지. 다이버는 모두 무료.">\n<meta property="og:image" content="https://www.divedeepocean.com/assets/og.jpg">\n<meta property="og:url" content="https://www.divedeepocean.com/">\n<meta name="twitter:card" content="summary_large_image">\n<link rel="canonical" href="https://www.divedeepocean.com/">\n<title>',1)
head=head.replace('href="icon-192.png"','href="/assets/icon-192.png"').replace('href="manifest.json"','href="/manifest.json"')
V=hashlib.sha1((css+js).encode()).hexdigest()[:8]
open('dist/assets/app.%s.css'%V,'w').write(css); open('dist/assets/app.%s.js'%V,'w').write(js)
open('dist/assets/cfg.js','w').write('window.DTDO_BACKEND={url:"https://crasesnlwwyegdgzkqes.supabase.co",key:"sb_publishable_cCtDGcChyf_L193Px9omDw_5zl85o1J"};\n')
cfg='<script src="/assets/cfg.js"></script>\n'
shell=head+'<link rel="stylesheet" href="/assets/app.%s.css">\n'%V+body+cfg+'<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js" integrity="sha384-0w2KAL2YHP6wKOkUDzkCDGgVvfmHnj02DHeQ6XcHOgTfFsGyonKOpShMH1x6nk9o" crossorigin="anonymous"></script>\n<script src="/assets/app.%s.js"></script>\n</body>\n</html>\n'%V
open('dist/index.html','w').write(shell)
for f in ['land.json','sites.json','icon-192.png','icon-512.png','og.jpg']: shutil.copy('site/'+f,'dist/assets/'+f)
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
SEC=[{"key":"Content-Security-Policy","value":"default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://crasesnlwwyegdgzkqes.supabase.co https://inaturalist-open-data.s3.amazonaws.com https://static.inaturalist.org https://tile.openstreetmap.org https://upload.wikimedia.org https://cdn.jsdelivr.net; media-src 'self' https://upload.wikimedia.org; connect-src 'self' https://crasesnlwwyegdgzkqes.supabase.co wss://crasesnlwwyegdgzkqes.supabase.co https://marine-api.open-meteo.com https://api.inaturalist.org https://cdn.jsdelivr.net; worker-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"},{"key":"Strict-Transport-Security","value":"max-age=63072000; includeSubDomains; preload"},{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"X-Frame-Options","value":"DENY"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},{"key":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=(self), payment=()"}]
json.dump({"cleanUrls":False,"headers":[{"source":"/(.*)","headers":SEC},{"source":"/assets/app.(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]},{"source":"/assets/media/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=604800"}]},{"source":"/sw.js","headers":[{"key":"Cache-Control","value":"no-cache"}]},{"source":"/","headers":[{"key":"Cache-Control","value":"no-cache"}]}]},open('dist/vercel.json','w'),indent=1)
print(V,{f:os.path.getsize('dist/'+f) for f in ['index.html','manifest.json','sw.js','vercel.json']})
open('dist/VERSION','w').write(V)
