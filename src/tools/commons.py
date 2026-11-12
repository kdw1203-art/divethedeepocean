import json,re,sys,time,requests,concurrent.futures as cf
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com; media credits)'}
API='https://commons.wikimedia.org/w/api.php'
OK=re.compile(r'^(CC BY(-SA)? [0-9.]+|CC0|Public domain|PD.*|CC BY [0-9.]+ .*|CC BY-SA [0-9.]+ .*)$',re.I)
def strip(h): return re.sub(r'<[^>]+>','',h or '').strip()
def q(params):
  for i in range(3):
    try:
      r=requests.get(API,params=dict(params,format='json',formatversion=2),headers=UA,timeout=40)
      if r.ok: return r.json()
    except Exception: pass
    time.sleep(2)
  return {}
def files(search=None,geo=None,video=False,n=12):
  p={'action':'query','prop':'imageinfo','iiprop':'url|extmetadata|mime|size','iiurlwidth':1200}
  if search:
    p.update(generator='search',gsrsearch=search+(' filetype:video' if video else ' filetype:bitmap'),gsrnamespace=6,gsrlimit=n)
  else:
    p.update(generator='geosearch',ggscoord='%s|%s'%geo,ggsradius=10000,ggsnamespace=6,ggslimit=n)
  d=q(p);out=[]
  for pg in (d.get('query',{}).get('pages') or []):
    ii=(pg.get('imageinfo') or [{}])[0];m=ii.get('extmetadata',{})
    lic=strip(m.get('LicenseShortName',{}).get('value'))
    if not OK.match(lic or ''): continue
    mime=ii.get('mime','')
    if video and not mime.startswith('video'): continue
    if not video and mime not in ('image/jpeg','image/png'): continue
    if not video and (ii.get('width',0)<800): continue
    out.append({'title':pg['title'],'url':ii.get('thumburl') or ii.get('url'),'orig':ii.get('url'),'page':ii.get('descriptionurl'),
      'author':strip(m.get('Artist',{}).get('value'))[:80] or '알 수 없음','license':lic,'desc':strip(m.get('ImageDescription',{}).get('value'))[:200],'mime':mime,'idx':pg.get('index',99)})
  out.sort(key=lambda x:x['idx'])
  return out
BAD=re.compile(r'map|logo|flag|chart|diagram|stamp|coat of arms|locator|svg|plan',re.I)
GEN=set('island islands isla isle blue hole reef reefs bay point wall north south east west the and park marine national sea lake river beach cave caves cove harbor harbour city town grotto pool dive diving sites site area coast'.split())
def place(en):
  return re.sub(r'\(.*?\)','',en).replace('&',' ').replace('/',' ').replace(',',' ').strip()
def keys(en):
  w=[x.lower() for x in re.findall(r"[A-Za-z\u00C0-\u024F']{4,}",en)]
  k=[x for x in w if x not in GEN]
  return k or w
def one(s):
  P=place(s['en']);K=keys(s['en']);res={'id':s['id'],'q':P,'photos':[],'video':None}
  def rel(f): t=(f['title']+' '+f['desc']).lower(); return any(k in t for k in K)
  seen=set()
  def add(L,k):
    for f in L:
      if f['title'] in seen or BAD.search(f['title']) or not rel(f): continue
      seen.add(f['title']);f['kind']=k;res['photos'].append(f)
      if sum(1 for x in res['photos'] if x['kind']==k)>=3: break
  add(files('%s underwater'%P,n=25),'uw')
  if len([x for x in res['photos'] if x['kind']=='uw'])<2: add(files('%s diving'%P,n=25),'uw')
  add(files(P,n=20),'scene')
  if len(res['photos'])<2: add(files(geo=(s['lat'],s['lon']),n=20),'scene')
  v=[f for f in (files('%s underwater'%P,video=True,n=10)+files('%s diving'%P,video=True,n=10)) if rel(f)]
  if v: res['video']=v[0]
  return res
if __name__=='__main__':
  S=json.load(open(sys.argv[1]))
  with cf.ThreadPoolExecutor(6) as ex: R=list(ex.map(one,S))
  json.dump(R,open(sys.argv[2],'w'),ensure_ascii=False,indent=0)
  print(sum(1 for r in R if r['photos']),'spots with photos;',sum(len(r['photos']) for r in R),'photos;',sum(1 for r in R if r['video']),'videos')
