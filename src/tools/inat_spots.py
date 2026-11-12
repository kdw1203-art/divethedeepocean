import json,requests,io,os,time
from PIL import Image
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com)'}
S=json.load(open('/tmp/media/spots.json'));M=json.load(open('/home/claude/dive/site/media/media.json'))
LIC={'cc-by':'CC BY 4.0','cc-by-sa':'CC BY-SA 4.0','cc0':'CC0','cc-by-nc':None}
miss=[s for s in S if not (M.get(s['id']) and M[s['id']]['photos'])]
n=0
for s in miss:
  r=requests.get('https://api.inaturalist.org/v1/observations',params={'lat':s['lat'],'lng':s['lon'],'radius':15,'photo_license':'cc-by,cc-by-sa,cc0','quality_grade':'research','order_by':'votes','per_page':12,'iconic_taxa':'Actinopterygii,Mollusca,Elasmobranchii,Reptilia,Mammalia,Animalia'},headers=UA,timeout=60)
  time.sleep(1.1)
  if not r.ok: continue
  ph=[]
  for o in r.json().get('results',[]):
    for p in o.get('photos',[])[:1]:
      lic=LIC.get(p.get('license_code'))
      if not lic: continue
      ph.append({'u':p['url'].replace('square','large'),'author':(o.get('user') or {}).get('name') or (o.get('user') or {}).get('login') or 'iNaturalist user','license':lic,'page':'https://www.inaturalist.org/observations/%d'%o['id'],'title':(o.get('taxon') or {}).get('preferred_common_name') or (o.get('taxon') or {}).get('name') or ''})
    if len(ph)>=3: break
  ent=M.get(s['id'],{'photos':[]})
  for i,p in enumerate(ph):
    k='%s_i%d'%(s['id'],i);fn='/home/claude/dive/site/media/%s.jpg'%k
    try:
      x=requests.get(p['u'],headers=UA,timeout=60);im=Image.open(io.BytesIO(x.content)).convert('RGB');im.thumbnail((1200,1200));im.save(fn,'JPEG',quality=78,optimize=True,progressive=True)
      ent['photos'].append({'src':'/assets/media/%s.jpg'%k,'title':p['title'],'author':p['author'][:70],'license':p['license'],'page':p['page']});n+=1
    except Exception: pass
  if ent['photos']: M[s['id']]=ent
json.dump(M,open('/home/claude/dive/site/media/media.json','w'),ensure_ascii=False)
print('added',n,'spots now',len([1 for v in M.values() if v['photos']]),'of',len(S))
