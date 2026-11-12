import json,time,requests
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com)'}
sp=json.load(open('/tmp/media/sp_top.json'))
need=[s for s in sp if not s.get('photo') and s.get('inat_id')]
by={s['inat_id']:s['sci'] for s in need};ids=list(by);out={}
LIC={'cc-by':'CC BY','cc-by-sa':'CC BY-SA','cc0':'CC0'}
for k in range(0,len(ids),30):
  r=requests.get('https://api.inaturalist.org/v1/taxa/'+','.join(map(str,ids[k:k+30])),headers=UA,timeout=60)
  if r.status_code==429: time.sleep(20);continue
  for t in r.json().get('results',[]):
    p=t.get('default_photo') or {}
    if LIC.get(p.get('license_code')) and p.get('square_url'):
      out[by[t['id']]]=[p['square_url'],LIC[p['license_code']],(p.get('attribution') or '')[:90]]
  time.sleep(1.1)
d=json.load(open('/home/claude/dive/site/media/species_about.json'));d['p']=out
json.dump(d,open('/home/claude/dive/site/media/species_about.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(need),len(out))
