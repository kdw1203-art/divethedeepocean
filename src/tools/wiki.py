import json,time,re,requests,sys
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com; species notes)'}
sp=json.load(open('/tmp/media/sp_top.json'));ko=json.load(open('/tmp/data/wd_ko.json'))
for s in sp:
  if not s.get('ko') and ko.get(s['sci']): s['ko']=ko[s['sci']]
def batch(host,titles):
  for i in range(5):
    try:
      r=requests.get('https://%s/w/api.php'%host,params={'action':'query','format':'json','formatversion':2,'prop':'extracts','exintro':1,'explaintext':1,'exsentences':2,'exlimit':20,'redirects':1,'titles':'|'.join(titles)},headers=UA,timeout=40)
      if r.status_code==429: time.sleep(10*(i+1));continue
      d=r.json()['query'];m={}
      norm={x['from']:x['to'] for x in d.get('normalized',[])};red={x['from']:x['to'] for x in d.get('redirects',[])}
      pages={p['title']:p for p in d.get('pages',[])}
      for t in titles:
        tt=norm.get(t,t);tt=red.get(tt,tt);p=pages.get(tt)
        if p and not p.get('missing') and p.get('extract'):m[t]=(p['extract'].strip(),tt)
      return m
    except Exception as e: time.sleep(5)
  return {}
def clean(t):
  t=re.sub(r'\s*\([^)]*\)','',t);t=re.sub(r'\s+',' ',t).strip()
  return t[:300]
out={}
kos=[s for s in sp if s.get('ko')]
for i in range(0,len(kos),20):
  ch=kos[i:i+20];m=batch('ko.wikipedia.org',[s['ko'] for s in ch])
  for s in ch:
    if s['ko'] in m:
      tx,tt=m[s['ko']]
      if len(tx)>15 and '동음이의' not in tx: out[s['sci']]={'t':clean(tx),'l':'ko','u':'https://ko.wikipedia.org/wiki/'+tt.replace(' ','_')}
  time.sleep(.6)
print('ko',len(out),flush=True)
rest=[s for s in sp if s['sci'] not in out]
for i in range(0,len(rest),20):
  ch=rest[i:i+20];m=batch('en.wikipedia.org',[s['sci'] for s in ch])
  for s in ch:
    if s['sci'] in m:
      tx,tt=m[s['sci']]
      if len(tx)>20 and 'may refer to' not in tx: out[s['sci']]={'t':clean(tx),'l':'en','u':'https://en.wikipedia.org/wiki/'+tt.replace(' ','_')}
  time.sleep(.6)
  if i%400==0: print(i,len(out),flush=True)
json.dump(out,open('/tmp/media/about.json','w'),ensure_ascii=False)
print('done',len(out),sum(1 for v in out.values() if v['l']=='ko'))
