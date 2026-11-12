import json,time,re,requests,urllib.parse,concurrent.futures as cf
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com; contact via site) python-requests'}
sp=json.load(open('/tmp/media/sp_top.json'));ko=json.load(open('/tmp/data/wd_ko.json'))
for s in sp:
  if not s.get('ko') and ko.get(s['sci']): s['ko']=ko[s['sci']]
def summ(host,title):
  u='https://%s/api/rest_v1/page/summary/%s?redirect=true'%(host,urllib.parse.quote(title.replace(' ','_')))
  for i in range(4):
    try:
      r=requests.get(u,headers=UA,timeout=30)
      if r.status_code==429: time.sleep(5*(i+1));continue
      if r.status_code!=200: return None
      d=r.json()
      if d.get('type')!='standard': return None
      return d.get('extract'),d.get('content_urls',{}).get('desktop',{}).get('page')
    except Exception: time.sleep(3)
  return None
def sent(t,n=2):
  t=re.sub(r'\s*\([^)]*\)','',t or '');t=re.sub(r'\s+',' ',t).strip()
  parts=re.split(r'(?<=[.!?다])\s+',t)
  return ' '.join(parts[:n])[:320]
def one(s):
  if s.get('ko'):
    r=summ('ko.wikipedia.org',s['ko'])
    if r and r[0] and len(r[0])>15: return s['sci'],{'t':sent(r[0]),'l':'ko','u':r[1]}
  r=summ('en.wikipedia.org',s['sci'])
  if r and r[0] and len(r[0])>20 and 'may refer to' not in r[0]: return s['sci'],{'t':sent(r[0]),'l':'en','u':r[1]}
  return s['sci'],None
out={};n=0
with cf.ThreadPoolExecutor(4) as ex:
  for k,v in ex.map(one,sp):
    n+=1
    if v: out[k]=v
    if n%250==0: print(n,len(out),flush=True)
json.dump(out,open('/tmp/media/about.json','w'),ensure_ascii=False)
print('done',len(out),sum(1 for v in out.values() if v['l']=='ko'),flush=True)
