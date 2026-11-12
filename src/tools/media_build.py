import json,re,requests,io,os,concurrent.futures as cf
from PIL import Image
UA={'User-Agent':'DiveTheDeepOcean/1.0 (https://www.divedeepocean.com; media credits)'}
REJ=set('''yangyang_0 yangyang_1 yangyang_2 gangneung_1 gangneung_2 tongyeong_1 tongyeong_2 maeda_1 miyako_0 yonaguni_3 izu_0 mikura_0 mikura_2
tubbataha_2 subic_0 subic_4 subic_5 donsol_1 similan_5 racha_2
nusapenida_3 menjangan_5 komodo_4 komodo_5 rajaampat_3 rajaampat_4 bunaken_2 bunaken_5
wakatobi_4 nhatrang_4 rota_0 rota_1 rota_2 hurghada_3 hurghada_4 hurghada_5 marsaalam_5 seychelles_2 mauritius_3 mauritius_5 tofo_2 tofo_5 aliwal_3 aliwal_4 aliwal_5
yongala_2 yongala_3 ningaloo_3 poorknights_3 poorknights_4 poorknights_5 cenote_2 cozumel_4 cozumel_5 socorro_1 socorro_2 socorro_3 cocos_0 cocos_5
bonaire_3 bonaire_5 keys_0 keys_1 keys_2 monterey_0 monterey_1 monterey_2 silfra_1 kalamata_0 kalamata_1 kalamata_2'''.split())
VID={'malapascua','maldives','marsaalam','beqa','gbr','monterey'}
R=json.load(open('/tmp/media/commons2.json'));out={};jobs=[]
for r in R:
  ph=[]
  for i,p in enumerate(r['photos']):
    k='%s_%d'%(r['id'],i)
    if k in REJ or not os.path.exists('/tmp/media/th/%s.jpg'%k): continue
    ph.append((k,p))
  ph.sort(key=lambda x:0 if x[1]['kind']=='uw' else 1);ph=ph[:4]
  ent={'photos':[]}
  for k,p in ph:
    jobs.append((k,p['url']))
    ent['photos'].append({'src':'/assets/media/%s.jpg'%k,'title':p['title'],'author':re.sub(r'\s+',' ',p['author'])[:70],'license':p['license'],'page':p['page']})
  if r['id'] in VID and r['video']:
    v=r['video'];ent['video']={'src':v['orig'],'poster':v['url'] if v['url']!=v['orig'] else '','title':v['title'],'author':re.sub(r'\s+',' ',v['author'])[:70],'license':v['license'],'page':v['page']}
  if ent['photos'] or ent.get('video'): out[r['id']]=ent
def get(j):
  k,u=j;fn='/home/claude/dive/site/media/%s.jpg'%k
  if os.path.exists(fn): return 1
  for a in range(3):
    try:
      x=requests.get(u,headers=UA,timeout=60)
      if x.ok:
        im=Image.open(io.BytesIO(x.content)).convert('RGB');im.thumbnail((1200,1200));im.save(fn,'JPEG',quality=80,optimize=True,progressive=True);return 1
    except Exception as e: pass
  return 0
with cf.ThreadPoolExecutor(6) as ex: ok=sum(ex.map(get,jobs))
for k in list(out):
  out[k]['photos']=[p for p in out[k]['photos'] if os.path.exists('/home/claude/dive/site'+p['src'].replace('/assets',''))]
json.dump(out,open('/home/claude/dive/site/media/media.json','w'),ensure_ascii=False)
print(ok,len(jobs),len(out),sum(len(v['photos']) for v in out.values()),sum(1 for v in out.values() if v.get('video')))
