import re,json,shutil,os,hashlib
s=open('site/index.html').read()
css=s[s.index('<style>')+7:s.index('</style>')]
a=s.rindex('<script>'); b=s.rindex('</script>'); js=s[a+8:b]
head=s[:s.index('<style>')]; body=s[s.index('</head>'):a]
os.makedirs('dist/assets',exist_ok=True)
js=js.replace("fetch('land.json')","fetch('/assets/land.json')").replace("fetch('sites.json')","fetch('/assets/sites.json')")
head=head.replace('href="icon-192.png"','href="/assets/icon-192.png"').replace('href="manifest.json"','href="/manifest.json"')
V=hashlib.sha1((css+js).encode()).hexdigest()[:8]
open('dist/assets/app.%s.css'%V,'w').write(css); open('dist/assets/app.%s.js'%V,'w').write(js)
cfg='<script>window.DTDO_BACKEND={url:"https://crasesnlwwyegdgzkqes.supabase.co",key:"sb_publishable_cCtDGcChyf_L193Px9omDw_5zl85o1J"};</script>\n'
shell=head+'<link rel="stylesheet" href="/assets/app.%s.css">\n'%V+body+cfg+'<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n<script src="/assets/app.%s.js"></script>\n</body>\n</html>\n'%V
open('dist/index.html','w').write(shell)
for f in ['land.json','sites.json','icon-192.png','icon-512.png']: shutil.copy('site/'+f,'dist/assets/'+f)
shutil.copy('site/manifest.json','dist/manifest.json')
m=json.load(open('dist/manifest.json')); m['start_url']='/'; m['scope']='/'
for ic in m['icons']: ic['src']='/assets/'+ic['src']
json.dump(m,open('dist/manifest.json','w'),ensure_ascii=False)
sw=open('site/sw.js').read().replace("const C='dtdo-v1';const SHELL=['./','index.html','manifest.json','icon-192.png'];","const C='dtdo-%s';const SHELL=['/','/manifest.json','/assets/app.%s.css','/assets/app.%s.js','/assets/icon-192.png'];"%(V,V,V))
open('dist/sw.js','w').write(sw)
ST='https://crasesnlwwyegdgzkqes.supabase.co/storage/v1/object/public/site/'
json.dump({"cleanUrls":False,"headers":[{"source":"/assets/app.(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]},{"source":"/sw.js","headers":[{"key":"Cache-Control","value":"no-cache"}]},{"source":"/","headers":[{"key":"Cache-Control","value":"no-cache"},{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"}]}]},open('dist/vercel.json','w'),indent=1)
print(V,{f:os.path.getsize('dist/'+f) for f in ['index.html','manifest.json','sw.js','vercel.json']})
open('dist/VERSION','w').write(V)
