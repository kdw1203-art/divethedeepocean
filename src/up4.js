/* ===== 4차: 포인트·도감·로그 (56 57 67 68 71 106 108 118 120 215) ===== */
(function(){var st=document.createElement('style');st.textContent=[
'.sheetbg{position:fixed;inset:0;background:rgba(4,20,35,.55);z-index:900;display:flex;align-items:flex-end;justify-content:center}',
'.sheet{background:var(--panel);color:var(--ink);width:min(560px,100%);max-height:88vh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 18px 28px;box-shadow:0 -8px 30px rgba(0,0,0,.2)}',
'@media (min-width:700px){.sheetbg{align-items:center}.sheet{border-radius:20px}}',
'.sheet h2{margin:0 0 4px;font-size:20px}.sheet .x{float:right}',
'.sheet img.big{width:100%;max-height:260px;object-fit:cover;border-radius:14px;margin:10px 0}',
'.cons{display:inline-block;padding:3px 8px;border-radius:8px;font-size:12px;font-weight:700;margin:2px 4px 2px 0}',
'.cons.hi{background:#fde2e1;color:#a4161a}.cons.md{background:#fff1d6;color:#8a5300}.cons.lo{background:#e3f4ea;color:#1d6b3a}',
'.prof svg,.tide svg{width:100%;height:auto;display:block}',
'.simgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}',
'.simgrid button{all:unset;cursor:pointer;display:flex;flex-direction:column;gap:4px;font-size:12px}',
'.simgrid .noimg{display:block;width:100%;aspect-ratio:1;border-radius:10px;background:var(--line)}#lrs{width:100%;min-width:0}.simgrid img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;background:var(--line)}',
'.qrbox{display:flex;justify-content:center;margin:10px 0}.qrbox img{width:200px;height:200px;image-rendering:pixelated}',
'.emg td{padding:6px 8px;border-bottom:1px solid var(--line);vertical-align:top}.emg{width:100%;border-collapse:collapse;font-size:14px}',
'body.locked{overflow:hidden}'
].join('');document.head.appendChild(st);})();

/* 공통 시트 (뒤 화면 스크롤 잠금 · Esc 닫기 · 포커스 이동) */
function fixPhotos(root){root=root||document;var ids=[].slice.call(root.querySelectorAll('[data-spsheet] .noimg')).map(function(e){return e.parentNode.dataset.spsheet;});ids=ids.filter(function(x,i){return ids.indexOf(x)===i;}).slice(0,30);if(!ids.length)return;
  fetch('https://api.inaturalist.org/v1/taxa/'+ids.join(',')).then(function(r){return r.json();}).then(function(d){(d.results||[]).forEach(function(t){var p=(t.taxon_photos||[]).map(function(x){return x.photo;}).filter(okPh)[0];if(!p)return;var src=p.square_url||String(p.url||'').replace('/square.','/square.');
    document.querySelectorAll('[data-spsheet="'+t.id+'"] .noimg').forEach(function(e){var im=document.createElement('img');im.src=src;im.alt='';im.loading='lazy';im.title=p.attribution||'';e.replaceWith(im);});});}).catch(function(){});}
function sheet(html){closeSheet();var bg=document.createElement('div');bg.className='sheetbg';bg.id='sheetbg';bg.innerHTML='<div class="sheet" role="dialog" aria-modal="true" tabindex="-1">'+html+'</div>';
  bg.addEventListener('click',function(e){if(e.target===bg||e.target.closest('[data-xsheet]'))closeSheet();});document.body.appendChild(bg);document.body.classList.add('locked');sheet.prev=document.activeElement;bg.firstChild.focus();return bg.firstChild;}
function closeSheet(){var b=document.getElementById('sheetbg');if(b){b.remove();document.body.classList.remove('locked');if(sheet.prev&&sheet.prev.focus)try{sheet.prev.focus();}catch(e){}}}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSheet();});
function myNick(){return (state.me&&state.me.nick)||'다이버';}

/* 56 수심 프로필 */
function depthRange(s){var m=String(s.depth||'').match(/(\d+)\s*[~\-–]\s*(\d+)/);return m?[+m[1],+m[2]]:[5,25];}
function profSvg(s){var r=depthRange(s),a=r[0],b=r[1],H=150,W=340,y=function(d){return 18+d/Math.max(b,10)*(H-40);};
  var rec=/초급/.test(s.lv)?Math.min(18,b):/중급/.test(s.lv)?Math.min(30,b):Math.min(40,b);
  var reef='M0,'+y(0)+' L40,'+y(0)+' L80,'+y(a)+' C150,'+y(a+(b-a)*.25)+' 200,'+y(a+(b-a)*.6)+' 300,'+y(b)+' L'+W+','+y(b)+' L'+W+','+H+' L0,'+H+' Z';
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(s.name)+' 수심 프로필: '+a+'m에서 '+b+'m까지"><rect width="'+W+'" height="'+H+'" fill="#dcEFF7" rx="10"/><path d="'+reef+'" fill="#c9b48a" opacity=".85"/>'+
  '<line x1="0" x2="'+W+'" y1="'+y(0)+'" y2="'+y(0)+'" stroke="#2a8fbd" stroke-width="2"/>'+
  '<line x1="0" x2="'+W+'" y1="'+y(rec)+'" y2="'+y(rec)+'" stroke="#e07a1f" stroke-dasharray="5 4"/><text x="'+(W-6)+'" y="'+(y(rec)-4)+'" text-anchor="end" font-size="11" fill="#e07a1f">권장 '+rec+'m</text>'+
  '<text x="6" y="'+(y(0)-4)+'" font-size="11" fill="#0b3550">입수 0m</text><text x="84" y="'+(y(a)-6)+'" font-size="11" fill="#0b3550">리프 위 '+a+'m</text><text x="'+(W-6)+'" y="'+(y(b)-4)+'" text-anchor="end" font-size="11" fill="#0b3550">최대 '+b+'m</text></svg>';}

/* 215 응급 연락처 */
var EMG={'대한민국':['119 구조·구급','122 해양경찰'],'필리핀':['911'],'인도네시아':['112','118 구급'],'일본':['119 구급','118 해상보안청'],'태국':['1669 구급','191 경찰'],'이집트':['123 구급'],'말레이시아':['999'],'호주':['000'],'미국령':['911'],'미국':['911'],'몰디브':['102 구급'],'멕시코':['911'],'프랑스령 폴리네시아':['15 구급'],'바하마':['911'],'베트남':['115 구급'],'팔라우':['911'],'세이셸':['999'],'모리셔스':['114 구급'],'남아프리카공화국':['10177 구급','112 휴대폰'],'뉴질랜드':['111'],'에콰도르':['911'],'코스타리카':['911'],'아이슬란드':['112'],'몰타':['112'],'그리스':['112'],'튀르키예':['112'],'스페인':['112']};
function danFor(s){var c=s.country;if(c==='일본')return ['DAN 재팬','+81-3-3812-4999'];if(/이집트|모잠비크|남아프리카|탄자니아|세이셸|모리셔스|몰타|그리스|튀르키예|스페인|아이슬란드/.test(c))return ['DAN 유럽','+39-06-4211-8685'];if(/멕시코|미국|바하마|에콰도르|코스타리카|벨리즈|네덜란드령|영국령/.test(c)&&!/미국령/.test(c))return ['DAN 아메리카','+1-919-684-9111'];return ['DAN 아시아·태평양','+61-3-9886-9166'];}
function emgPanel(s){var n=EMG[s.country],d=danFor(s);
  return '<div class="panel"><h2>응급 연락처</h2><table class="emg"><tr><td>현지 응급</td><td>'+(n?n.map(function(x){var num=x.split(' ')[0];return '<a href="tel:'+num+'">'+esc(x)+'</a>';}).join('<br>'):'현지 센터에 먼저 확인해 두세요')+'</td></tr><tr><td>잠수병 상담</td><td>'+d[0]+' 24시간 <a href="tel:'+d[1].replace(/-/g,'')+'">'+d[1]+'</a></td></tr><tr><td>감압 챔버</td><td><a href="https://www.google.com/maps/search/hyperbaric+chamber/@'+s.lat+','+s.lon+',9z" target="_blank" rel="noopener">가까운 곳 지도에서 찾기</a></td></tr></table><p class="small" style="margin:8px 0 0">번호는 바뀔 수 있어요. 출발 전에 이용하는 센터에 응급 절차와 가장 가까운 챔버를 꼭 다시 물어보세요.</p></div>';}

var _spot4=V.spot;V.spot=function(id){var h=_spot4(id),s=spot(state.sel);if(!s)return h;
  var add='<div class="cols"><div class="panel prof"><h2>수심 프로필</h2>'+profSvg(s)+'<p class="small" style="margin:6px 0 0">'+esc(s.depth)+' · 실제 지형은 포인트마다 달라요. 권장 수심은 난이도('+esc(s.lv)+') 기준이에요.</p></div><div class="panel tide" id="tideBox"><h2>조석 (해수면 높이)</h2><p class="empty" style="margin:0">불러오는 중이에요.</p></div></div>';
  h=h.replace('<div class="panel" id="seaToday">',add+'<div class="panel" id="seaToday">');
  var i=h.lastIndexOf('</div>');return h.slice(0,i)+emgPanel(s)+h.slice(i);};

/* 57 조석 */
tideLoad.c={};
function tideLoad(s){var el=document.getElementById('tideBox');if(!el)return;var c=tideLoad.c[s.id];if(c)return draw(c);
  fetch('https://marine-api.open-meteo.com/v1/marine?latitude='+s.lat+'&longitude='+s.lon+'&hourly=sea_level_height_msl&forecast_days=2&timezone=auto').then(function(r){return r.json();}).then(function(d){tideLoad.c[s.id]=d;draw(d);}).catch(function(){el.querySelector('p').textContent='조석 정보를 불러오지 못했어요.';});
  function draw(d){var el=document.getElementById('tideBox');if(!el)return;var H=d&&d.hourly,v=H&&H.sea_level_height_msl;if(d&&d.error){delete tideLoad.c[s.id];el.innerHTML='<h2>조석</h2><p class="empty" style="margin:0">예보 서버가 바빠요. 잠시 뒤 다시 열어 주세요.</p>';return;}if(!v||!v.filter(function(x){return x!=null;}).length){el.innerHTML='<h2>조석</h2><p class="empty" style="margin:0">이 지점은 조석 예보 범위 밖이에요.</p>';return;}
    var t=H.time,W=340,Ht=120,mn=Math.min.apply(null,v.filter(function(x){return x!=null;})),mx=Math.max.apply(null,v.filter(function(x){return x!=null;})),sp=Math.max(mx-mn,.05);
    var X=function(i){return 8+i*(W-16)/(v.length-1);},Y=function(x){return 12+(mx-x)/sp*(Ht-34);};
    var path=v.map(function(x,i){return x==null?'':(i?'L':'M')+X(i).toFixed(1)+','+Y(x).toFixed(1);}).join(' ');
    var ev=[];for(var i=1;i<v.length-1;i++){if(v[i]==null)continue;if(v[i]>=v[i-1]&&v[i]>v[i+1])ev.push([i,'만조']);if(v[i]<=v[i-1]&&v[i]<v[i+1])ev.push([i,'간조']);}
    var now=new Date(),ni=t.findIndex(function(x){return new Date(x)>=now;});
    el.innerHTML='<h2>조석 (해수면 높이) <span class="small">Open-Meteo</span></h2><svg viewBox="0 0 '+W+' '+Ht+'" role="img" aria-label="48시간 해수면 높이 그래프"><rect width="'+W+'" height="'+Ht+'" rx="10" fill="#dcEFF7"/><path d="'+path+'" fill="none" stroke="#2a8fbd" stroke-width="2.5"/>'+(ni>0?'<line x1="'+X(ni)+'" x2="'+X(ni)+'" y1="6" y2="'+(Ht-20)+'" stroke="#e07a1f" stroke-dasharray="4 3"/><text x="'+X(ni)+'" y="'+(Ht-6)+'" font-size="10" text-anchor="middle" fill="#e07a1f">지금</text>':'')+ev.map(function(e){return '<circle cx="'+X(e[0])+'" cy="'+Y(v[e[0]])+'" r="3.5" fill="'+(e[1]==='만조'?'#2a8fbd':'#8a6d3b')+'"/>';}).join('')+'</svg>'+
    '<div class="chips" style="margin-top:8px">'+ev.slice(0,6).map(function(e){var d=t[e[0]];return '<span class="chip" style="cursor:default">'+e[1]+' '+d.slice(5,10).replace('-','/')+' '+d.slice(11,16)+'</span>';}).join('')+'</div><p class="small" style="margin:6px 0 0">현지 시각 · 바다 모델 추정이라 항구 조석표와 30분~1시간 다를 수 있어요. 조류 포인트는 현지 조석표를 같이 보세요.</p>';}}

/* 67·71 생물 상세 시트 (보호 등급 · 비슷한 종) */
var IUCN={LC:['관심 대상','lo'],NT:['준위협','md'],VU:['취약','hi'],EN:['위기','hi'],CR:['위급','hi'],DD:['정보 부족','md'],EW:['야생 절멸','hi'],EX:['절멸','hi']};
function consHtml(t){var out=[],cs=t.conservation_statuses||[],g=t.conservation_status;
  if(g&&g.status){var k=String(g.status).toUpperCase(),m=IUCN[k];if(m)out.push('<span class="cons '+m[1]+'">IUCN '+m[0]+' ('+k+')</span>');}
  cs.forEach(function(c){if(/CITES/i.test(c.authority||'')){var lvl=String(c.status||'').replace(/^.*?(I{1,3}).*$/,'$1');out.push('<span class="cons hi">CITES 부속서 '+esc(lvl||c.status)+'</span>');}});
  var seen={};out=out.filter(function(x){if(seen[x])return false;seen[x]=1;return true;});
  return out.length?out.join('')+'<p class="small" style="margin:6px 0 0">보호종은 만지거나 쫓거나 채집하면 안 돼요. 나라에 따라 처벌받을 수 있어요.</p>':'<span class="small">국제 보호 등급 정보가 없어요. 그래도 만지지 않는 게 원칙이에요.</span>';}
function spName(t){var c=t.preferred_common_name||'';return /[가-힣]/.test(c)?c:t.name;}
var OKLIC={'cc-by':1,'cc-by-sa':1,'cc0':1,'pd':1};function okPh(p){return p&&OKLIC[String(p.license_code||'').toLowerCase()]?p:null;}
function spSheet(id){var box=sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2>불러오는 중이에요</h2>');
  fetch('https://api.inaturalist.org/v1/taxa/'+(+id)+'?locale=ko').then(function(r){return r.json();}).then(function(d){var t=d.results&&d.results[0];if(!t)throw 0;
    var ph=okPh(t.default_photo)||((t.taxon_photos||[]).map(function(x){return x.photo;}).filter(okPh)[0]),anc=(t.ancestors||[]),genus=anc.filter(function(a){return a.rank==='genus';})[0]||anc[anc.length-1],fam=anc.filter(function(a){return a.rank==='family';})[0];
    box.innerHTML='<button class="chip x" type="button" data-xsheet>닫기</button><h2>'+esc(spName(t))+'</h2><p class="small" style="margin:0">'+(spName(t)!==t.name?'<i>'+esc(t.name)+'</i> · ':'')+''+(fam?esc(spName(fam))+' 무리 · ':'')+'관찰 '+(t.observations_count||0).toLocaleString()+'건</p>'+
    (ph?'<img class="big" src="'+esc(ph.medium_url)+'" alt="'+esc(spName(t))+'"><p class="small" style="margin:-4px 0 8px">'+esc(ph.attribution||'')+'</p>':'')+
    '<h3 style="margin:10px 0 6px;font-size:15px">보호 등급</h3>'+consHtml(t)+
    '<h3 style="margin:16px 0 6px;font-size:15px">헷갈리기 쉬운 비슷한 종</h3><div id="simBox" class="small">불러오는 중이에요.</div>'+
    '<p style="margin:16px 0 0"><a class="btn btn-line" href="https://www.inaturalist.org/taxa/'+t.id+'" target="_blank" rel="noopener">iNaturalist에서 더 보기</a></p>';
    var pid=(t.rank==='species'&&genus)?genus.id:t.id;
    return fetch('https://api.inaturalist.org/v1/taxa?parent_id='+pid+'&rank=species&per_page=9&order_by=observations_count&locale=ko&is_active=true').then(function(r){return r.json();}).then(function(s){var L=(s.results||[]).filter(function(x){return x.id!==t.id;}).slice(0,8),el=document.getElementById('simBox');if(!el)return;
      el.innerHTML=L.length?'<div class="simgrid">'+L.map(function(x){return '<button type="button" data-spsheet="'+x.id+'">'+(okPh(x.default_photo)?'<img src="'+esc(x.default_photo.square_url)+'" alt="" loading="lazy">':'<span class="noimg"></span>')+'<b>'+esc(spName(x))+'</b>'+(spName(x)!==x.name?'<i>'+esc(x.name)+'</i>':'')+'</button>';}).join('')+'</div><p class="small" style="margin:6px 0 0">같은 속(屬)의 종이에요. 무늬·지느러미 모양·사는 수심을 비교해 보세요.</p>':'같은 무리에 등록된 다른 종이 없어요.';fixPhotos(el);});
  }).catch(function(){box.innerHTML='<button class="chip x" type="button" data-xsheet>닫기</button><h2>불러오지 못했어요</h2><p>연결을 확인하고 다시 눌러 주세요.</p>';});}

/* 68 바다·달별 생물 찾기 */
state.lr=state.lr||{spot:'',m:new Date().getMonth()+1,res:null,busy:false};
var MARINE_TAXA='47178,47273,47534,47115,47549,39532,152871';
function lifeRegionPanel(){var r=state.lr;
  var opts='<option value="">포인트 고르기</option>'+SPOTS.map(function(s){return '<option value="'+s.id+'"'+(r.spot===s.id?' selected':'')+'>'+esc(s.country+' · '+s.name)+'</option>';}).join('');
  var mo='';for(var i=1;i<=12;i++)mo+='<option value="'+i+'"'+(+r.m===i?' selected':'')+'>'+i+'월</option>';
  var body=r.busy?'<p class="empty">불러오는 중이에요.</p>':r.res?(r.res.length?'<div class="simgrid">'+r.res.map(function(x){var t=x.taxon;return '<button type="button" data-spsheet="'+t.id+'">'+(okPh(t.default_photo)?'<img src="'+esc(t.default_photo.square_url)+'" alt="" loading="lazy">':'<span class="noimg"></span>')+'<b>'+esc(spName(t))+'</b><span>관찰 '+x.count+'건</span></button>';}).join('')+'</div>':'<p class="empty">그 달 기록이 적어요. 다른 달을 골라 보세요.</p>'):'';
  return '<div class="panel"><h2>이 바다, 이 달에 보이는 생물</h2><div class="form" style="grid-template-columns:minmax(0,1fr) 88px auto;align-items:end"><label for="lrs">포인트<select id="lrs">'+opts+'</select></label><label for="lrm">달<select id="lrm">'+mo+'</select></label><button class="btn btn-pri" type="button" id="lrGo">보기</button></div>'+body+'<p class="small" style="margin:8px 0 0">포인트 반경 30km 안 다이버·스노클러의 검증된 관찰 기록(iNaturalist) 기준이에요. 생물을 누르면 보호 등급과 비슷한 종이 나와요.</p></div>';}
function lifeRegionGo(){var r=state.lr,s=spot(r.spot);if(!s){toast('포인트를 먼저 골라 주세요');return;}r.busy=true;rerender();
  fetch('https://api.inaturalist.org/v1/observations/species_counts?lat='+s.lat+'&lng='+s.lon+'&radius=30&month='+r.m+'&quality_grade=research&taxon_id='+MARINE_TAXA+'&per_page=24&locale=ko').then(function(x){return x.json();}).then(function(d){r.res=d.results||[];r.busy=false;if(cur()==='life')rerender();}).catch(function(){r.busy=false;r.res=[];toast('불러오지 못했어요');if(cur()==='life')rerender();});}
var _lifeV5=V.life;V.life=function(){var h=_lifeV5();var k=h.indexOf('<div class="panel">');return k<0?h+lifeRegionPanel():h.slice(0,k)+lifeRegionPanel()+h.slice(k);};

/* 106 수심 그래프 · 108 버디 확인 · 120 예시 로그 */
function diveSvg(d,m){d=+d||0;m=+m||0;if(!d||!m)return '';var W=260,H=90,desc=Math.max(1,d/18),asc=Math.max(1,(d-5)/9),stop=d>10?3:0,bot=Math.max(1,m-desc-asc-stop-.5);
  var tot=desc+bot+asc+stop+.5,X=function(t){return 6+t/tot*(W-12);},Y=function(z){return 8+z/Math.max(d,10)*(H-22);};
  var pts=[[0,0],[desc,d],[desc+bot,d],[desc+bot+asc,stop?5:0]];if(stop)pts.push([desc+bot+asc+stop,5]);pts.push([tot,0]);
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="최대 '+d+'m '+m+'분 다이브 프로필(추정)" style="max-width:260px"><rect width="'+W+'" height="'+H+'" rx="8" fill="#dcEFF7"/><polyline points="'+pts.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' ')+'" fill="none" stroke="#2a8fbd" stroke-width="2.5" stroke-linejoin="round"/><text x="'+(X(desc)+4)+'" y="'+(Y(d)-4)+'" font-size="10" fill="#0b3550">'+d+'m</text><text x="'+(W-6)+'" y="'+(H-4)+'" font-size="10" text-anchor="end" fill="#0b3550">'+m+'분</text>'+(stop?'<text x="'+(X(desc+bot+asc)-2)+'" y="'+(Y(5)+12)+'" font-size="9" text-anchor="end" fill="#e07a1f">안전정지</text>':'')+'</svg>';}
state.signs=state.signs||null;
function signsLoad(ids){if(!BE.on||!BE.user||!ids.length||signsLoad.busy||state.signs)return;signsLoad.busy=1;BE.sb.from('log_signs').select('log_id,signer_nick,created_at').in('log_id',ids).then(function(r){signsLoad.busy=0;state.signs={};(r.data||[]).forEach(function(x){(state.signs[x.log_id]=state.signs[x.log_id]||[]).push(x);});if(cur()==='log')rerender();});}
var _log4=V.log;V.log=function(){var h=_log4(),L=(state.userLogs||[]).slice().sort(function(a,b){return (b.date||'')>(a.date||'')?1:-1;}).slice(0,6);
  var p;if(!L.length){p='<div class="panel"><h2>이렇게 기록돼요 <span class="tag gray">예시</span></h2><div class="item"><span class="tx"><span>2026-10-03 · 보트 다이빙</span><b>제주 서귀포 문섬</b><span>최대 18m · 42분 · 시야 12m · 버디 바다거북</span></span></div>'+diveSvg(18,42)+'<p class="small" style="margin:8px 0 0">위 \'빠른 기록\'에 날짜·포인트·수심·시간만 넣어도 이런 프로필과 통계가 만들어져요.</p></div>';}
  else{signsLoad(L.filter(function(l){return l.id;}).map(function(l){return l.id;}));
    p='<div class="panel"><h2>최근 다이브 프로필 · 버디 확인</h2><div class="list">'+L.map(function(l){var sg=(state.signs&&state.signs[l.id])||[];return '<div class="item" style="flex-wrap:wrap"><span class="tx"><span>'+esc(l.date||'')+'</span><b>'+esc(l.site||'포인트 없음')+'</b><span>'+(sg.length?'확인: '+sg.map(function(x){return esc(x.signer_nick||'버디');}).join(', '):'아직 버디 확인 전')+'</span></span>'+(BE.on&&l.id?'<button class="chip" type="button" data-signqr="'+l.id+'">버디 확인 받기</button>':'')+'<div style="flex-basis:100%">'+diveSvg(l.depth,l.time)+'</div></div>';}).join('')+'</div><p class="small" style="margin:8px 0 0">그래프는 수심·시간으로 그린 추정 프로필이에요. 다이브 컴퓨터 파일을 올리면 실제 기록이 더 정확해요.</p></div>';}
  var k=h.indexOf('<div class="cols">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
function loadQR(cb){if(window.qrcode)return cb();var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';s.integrity='sha384-8FWZA6BGMXhsfO+BLtrJK0We6gg5o1JyO8xQm6peWDEUs17ACA5ziE/NIAkl9z2k';s.crossOrigin='anonymous';s.onload=cb;s.onerror=function(){cb(1);};document.head.appendChild(s);}
function signQR(id){var l=(state.userLogs||[]).filter(function(x){return String(x.id)===String(id);})[0];if(!l)return;
  var url=location.origin+'/#sign-'+l.id+'~'+encodeURIComponent([l.date||'',l.site||'',l.depth||'',l.time||'',myNick()].join('~'));
  var box=sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2>버디 확인 받기</h2><p class="small">함께 들어간 버디나 강사가 휴대폰 카메라로 찍고 로그인한 뒤 \'확인\'을 누르면 이 로그에 이름이 남아요.</p><div class="qrbox" id="qrb">QR 만드는 중</div><div class="form"><label for="sgu">또는 링크 보내기<input id="sgu" readonly value="'+esc(url)+'"></label></div><button class="btn btn-line" type="button" id="sgcopy" style="margin-top:8px">링크 복사</button>');
  box.querySelector('#sgcopy').onclick=function(){(navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){toast('링크를 복사했어요');}).catch(function(){box.querySelector('#sgu').select();});};
  loadQR(function(err){var el=document.getElementById('qrb');if(!el)return;if(err||!window.qrcode){el.textContent='QR을 만들지 못했어요. 링크를 보내 주세요.';return;}var q=qrcode(0,'M');q.addData(url);q.make();el.innerHTML=q.createImgTag(6,8,'버디 확인 QR 코드');});}
V.sign=function(arg){setTitle('버디 확인');var p=String(arg||'').split('~'),id=+p[0],f=(p[1]?decodeURIComponent(p.slice(1).join('~')):'').split('~');
  var info='<div class="item"><span class="tx"><span>'+esc(f[0]||'')+' · '+esc(f[4]||'다이버')+'님의 로그</span><b>'+esc(f[1]||'포인트')+'</b><span>최대 '+esc(f[2]||'—')+'m · '+esc(f[3]||'—')+'분</span></span></div>';
  if(!id)return '<div class="vh"><div><h1>잘못된 확인 링크예요</h1></div></div>';
  if(!BE.on||!BE.user)return '<div class="vh"><div><h1>버디 확인</h1><p>로그인하면 이 다이브를 함께했다고 확인할 수 있어요.</p></div></div><div class="panel">'+info+'<a class="btn btn-pri" href="#login" style="margin-top:12px">로그인하고 확인하기</a></div>';
  return '<div class="vh"><div><h1>버디 확인</h1><p>이 다이브를 함께했다면 확인을 눌러 주세요. 내 닉네임이 상대 로그에 남아요.</p></div></div><div class="panel">'+info+'<button class="btn btn-pri" type="button" id="signGo" data-sid="'+id+'" style="margin-top:12px">함께 다이빙했어요 · 확인</button></div>';};
function signGo(id){BE.sb.from('log_signs').insert({log_id:+id,signer:BE.user.id,signer_nick:myNick()}).then(function(r){if(r.error){toast(/duplicate|unique/.test(r.error.message)?'이미 확인했어요':/row-level/.test(r.error.message)?'내 로그는 직접 확인할 수 없어요':'확인하지 못했어요');return;}toast('확인을 남겼어요');location.hash='#log';});}

/* 118 정비·자격 갱신 알림 */
var _notice4=V.notice;V.notice=function(){var h=_notice4();if(!BE.user)return h;
  var G=(state.gearL||[]).map(function(x){return {g:x,d:due(x)};}).filter(function(x){return x.d&&x.d.days<=60;}).sort(function(a,b){return a.d.days-b.d.days;});
  var cr=LS.get('certRenew',''),cd=cr?Math.round((new Date(cr)-new Date())/864e5):null;
  var rows=G.map(function(x){return item({href:'#gear',tags:[[x.d.days<0?'지남':'정비',x.d.days<0?'fr':'']],t:esc(x.g.cat)+' '+esc(x.g.brand||''),s:x.d.days<0?(-x.d.days)+'일 지났어요':x.d.days+'일 남았어요'});}).join('')+(cd!=null&&cd<=90?item({tags:[[cd<0?'지남':'갱신',cd<0?'fr':'']],t:'자격·응급처치 갱신',s:cd<0?(-cd)+'일 지났어요':cd+'일 남았어요'}):'');
  var p='<div class="panel"><h2>다가오는 정비 · 갱신</h2>'+(rows?'<div class="list">'+rows+'</div>':'<p class="empty">60일 안에 챙길 정비가 없어요.</p>')+'<div class="form" style="margin-top:10px;grid-template-columns:1fr auto;align-items:end"><label for="certR">응급처치·자격 갱신일 (예: EFR 2년)<input id="certR" type="date" value="'+esc(cr)+'"></label><button class="btn btn-line" type="button" id="certSave">저장</button></div><p class="small" style="margin:6px 0 0">정비일은 장비 등록일과 종류별 권장 주기로 계산해요. 갱신일은 이 기기에만 저장돼요.</p></div>';
  var k=h.indexOf('<div class="panel">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};

/* 이벤트 */
document.addEventListener('click',function(e){var t=e.target.closest('[data-spsheet],a.sp,[data-signqr],#signGo,#lrGo,#certSave');if(!t)return;
  if(t.matches('a.sp')){var m=(t.getAttribute('href')||'').match(/taxa\/(\d+)/);if(m){e.preventDefault();spSheet(m[1]);}return;}
  if(t.dataset.spsheet){e.preventDefault();spSheet(t.dataset.spsheet);return;}
  if(t.dataset.signqr){signQR(t.dataset.signqr);return;}
  if(t.id==='signGo'){t.disabled=true;signGo(t.dataset.sid);return;}
  if(t.id==='lrGo'){state.lr.spot=(document.getElementById('lrs')||{}).value||'';state.lr.m=+((document.getElementById('lrm')||{}).value||1);lifeRegionGo();return;}
  if(t.id==='certSave'){LS.set('certRenew',(document.getElementById('certR')||{}).value||'');toast('저장했어요');rerender();return;}
});
var _after4=after;after=function(){_after4();if(cur()==='life')fixPhotos(document.getElementById('main')||document);if(cur()==='spot'){var s=spot(state.sel);if(s)tideLoad(s);}};
