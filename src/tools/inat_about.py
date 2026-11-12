import json,time,re,requests,html
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com)'}
sp=json.load(open('/tmp/media/sp_top.json'));ids=[s['inat_id'] for s in sp if s.get('inat_id')]
by={s['inat_id']:s['sci'] for s in sp if s.get('inat_id')}
def clean(t):
  t=html.unescape(re.sub(r'<[^>]+>','',t or ''));t=re.sub(r'\s*\([^)]*\)','',t);t=re.sub(r'\s+',' ',t).strip()
  parts=re.split(r'(?<=[.!?])\s+|(?<=다\.)\s*',t);return ' '.join(p for p in parts[:2] if p)[:320]
out={}
for loc in ('ko','en'):
  need=[i for i in ids if by[i] not in out]
  for k in range(0,len(need),30):
    ch=need[k:k+30]
    for a in range(4):
      r=requests.get('https://api.inaturalist.org/v1/taxa/'+','.join(map(str,ch)),params={'locale':loc,'all_names':'false'},headers=UA,timeout=60)
      if r.status_code==429: time.sleep(20);continue
      break
    if r.status_code!=200: time.sleep(5);continue
    for t in r.json().get('results',[]):
      w=t.get('wikipedia_summary');u=t.get('wikipedia_url')
      if not w or len(w)<20: continue
      if loc=='ko' and not re.search('[가-힣]',w): continue
      out[by.get(t['id'],t.get('name'))]={'t':clean(w),'l':loc,'u':u or ''}
    time.sleep(1.1)
  print(loc,len(out),flush=True)
json.dump(out,open('/tmp/media/about.json','w'),ensure_ascii=False)
print('done',len(out),sum(1 for v in out.values() if v['l']=='ko'),flush=True)
