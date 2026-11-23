/* ===== 136 수집 정보 반영(잠수풀 · 국내 센터 · 해외 한국어 리조트 · 대만) · 첫 화면 흔들림 줄이기 · 반응형 액션 ===== */

/* ---------- 1. 대만 지역 ---------- */
(function(){
  if(typeof FLAG==='object')FLAG['대만']='TW';
  if(typeof LANGS==='object')LANGS['대만']='중국어(번체) · 다이빙 업체는 간단한 영어';
  if(typeof EMG==='object')EMG['대만']=['119 구급 · 소방','118 해양경찰(해순서)','110 경찰'];
  if(typeof RB==='object')RB['대만']=[[21.7,118.2],[26.5,122.6]];
  if(typeof EN_D==='object')EN_D['대만']='Taiwan';
  if(typeof EN==='object'&&typeof EN136==='object')for(var k in EN136)EN[k]=EN136[k];
  if(typeof OV_GROUP==='object'&&!OV_GROUP.some(function(g){return g[0]==='대만';})){var i=OV_GROUP.findIndex(function(g){return g[0]==='일본';});OV_GROUP.splice(i+1,0,['대만',['대만']]);}
})();

/* ---------- 2. 잠수풀: 시도별 묶음 + 주소 · 조건 · 전화 · 누리집 ---------- */
function poolSido136(s){var x=typeof POOLX136==='object'&&POOLX136[s.id];if(x&&x.s)return x.s;return typeof spotArea128==='function'?spotArea128(s,false):'';}
function telA136(t){return t?'<a class="btn btn-line" href="tel:'+t.replace(/[^\d+]/g,'')+'">'+L53('전화','Call')+'</a>':'';}
function webA136(w){return /^https?:\/\//.test(w||'')?'<a class="btn btn-line" href="'+esc(w)+'" target="_blank" rel="noopener">'+L53('누리집','Website')+'</a>':'';}
V.pools=function(){setTitle(L53('수영장','Dive pools'));var P=SPOTS.filter(isPool),city=state.pcity||'all',ORD=['서울','경기','인천','강원','대전','충북','대구','경북','부산','울산','경남','광주','전북','전남','제주'],C=[];
  P.forEach(function(s){var a=poolSido136(s);if(a&&C.indexOf(a)<0)C.push(a);});C.sort(function(a,b){var i=ORD.indexOf(a),j=ORD.indexOf(b);return (i<0?99:i)-(j<0?99:j);});
  if(city!=='all'&&C.indexOf(city)<0)city='all';
  var dn=function(s){return parseFloat(String(s.depth).replace(/[^\d.]/g,''))||0;};
  var L=P.filter(function(s){return city==='all'||poolSido136(s)===city;}).sort(function(a,b){return dn(b)-dn(a);});
  var row=function(k,v){return v?'<tr><th>'+k+'</th><td>'+esc(v)+'</td></tr>':'';};
  return '<div class="vh"><div><h1>'+L53('수영장','Dive pools')+'</h1><p>'+L53('교육과 연습을 하는 국내 다이빙풀·잠수풀 '+P.length+'곳. 깊은 곳부터 보여 줘요',P.length+' dive pools in Korea, deepest first')+'</p></div></div>'+
    '<div class="chips" style="margin-bottom:12px"><button class="chip" type="button" data-pcity="all" aria-pressed="'+(city==='all')+'">'+L53('전체','All')+' '+P.length+'</button>'+C.map(function(c){var n=P.filter(function(s){return poolSido136(s)===c;}).length;return '<button class="chip" type="button" data-pcity="'+esc(c)+'" aria-pressed="'+(city===c)+'">'+esc(c)+' '+n+'</button>';}).join('')+'</div>'+
    '<div class="panel">'+L.map(function(s){var x=(typeof POOLX136==='object'&&POOLX136[s.id])||{};var tr=s.gw&&s.gw!==x.a;
      return '<div class="pool"><div class="hd"><div><b>'+esc(s.name)+'</b><div class="small">'+esc(s.kind||'')+'</div></div><span class="tag '+(s.t==='free'?'fr':s.t==='scuba'?'':'ok')+'">'+(s.t==='free'?L53('프리다이빙','Free'):s.t==='scuba'?L53('스쿠버','Scuba'):L53('스쿠버 · 프리','Scuba · Free'))+'</span></div><table>'+
        row(L53('최대 수심','Depth'),s.depth||'—')+row(L53('주소','Address'),x.a)+(tr?row(L53('가는 길','Access'),s.gw):'')+row(L53('이용 조건','Entry'),x.c&&!/^(확인 필요|미확인|문의|명시 없음)$/.test(x.c)?x.c:'')+row(L53('특징','About'),s.desc||'')+
        '</table><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-line" href="#spot-'+s.id+'">'+L53('자세히','Details')+'</a>'+telA136(x.t)+webA136(x.w)+'<a class="btn btn-line" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(x.a&&x.a!=='미공개'?x.a:s.name.replace(/\s*\([^)]*\)/,''))+'" target="_blank" rel="noopener">'+L53('길찾기','Map')+'</a></div></div>';}).join('')+'</div>'+
    '<p class="small">'+L53('주소 · 전화 · 조건은 2026년 11월에 시설 안내와 다이빙 정보 사이트에서 모은 내용이에요. 요금, 시간, 자격 조건은 자주 바뀌니 가기 전에 시설에 꼭 확인하세요. 틀린 정보는 ','Collected Nov 2026 from venue notices. Fees, hours and entry rules change often; confirm with the venue. Report errors via ')+'<a href="#help">'+L53('문의','Help')+'</a>'+L53('로 알려 주세요.','.')+'</p>';};

function poolSpot136(){if(cur()!=='spot'||document.getElementById('px136'))return;var x=typeof POOLX136==='object'&&POOLX136[state.sel];if(!x)return;var a=document.getElementById('poolBox')||document.getElementById('seaToday');if(!a)return;
  var d=document.createElement('div');d.className='panel';d.id='px136';
  d.innerHTML='<h2>'+L53('시설 정보','Venue')+'</h2><table class="tbl136">'+(x.a?'<tr><th>'+L53('주소','Address')+'</th><td>'+esc(x.a)+'</td></tr>':'')+(x.c&&!/^(확인 필요|미확인|문의|명시 없음)$/.test(x.c)?'<tr><th>'+L53('이용 조건','Entry')+'</th><td>'+esc(x.c)+'</td></tr>':'')+(x.t?'<tr><th>'+L53('전화','Phone')+'</th><td>'+esc(x.t)+'</td></tr>':'')+'</table><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'+telA136(x.t)+webA136(x.w)+'</div>';
  a.parentNode.insertBefore(d,a.nextSibling);}

/* ---------- 3. 리조트: 국내 단체 등록 센터 · 해외 한국어 응대 리조트 ---------- */
function resortsExtra136(){if(cur()!=='resorts')return;var v=document.querySelector('#main .view');if(!v)return;var tab=state.rtab||'kr',grp=state.rgrp||'필리핀';
  var old=document.getElementById('rx136');if(old&&old.dataset.k===tab+grp)return;if(old)old.remove();
  var src=function(u){return /^https?:\/\//.test(u||'')?' · <a href="'+esc(u)+'" target="_blank" rel="noopener">'+L53('출처','Source')+'</a>':'';};
  var html='';
  if(tab==='kr'&&typeof KRC136==='object'){var by={},ord=[];KRC136.forEach(function(r){var k=r[1]||'기타';if(!by[k]){by[k]=[];ord.push(k);}by[k].push(r);});
    html='<details class="panel rx136"><summary><b>'+L53('교육단체 등록 센터 · 리조트 '+KRC136.length+'곳','Registered dive centers & resorts ('+KRC136.length+')')+'</b><span class="small"> '+L53('PADI · SSI 등록 정보와 관광 안내 기준','From PADI/SSI listings and tourism info')+'</span></summary>'+
      ord.map(function(k){return '<h3 class="rx136h">'+esc(k)+'</h3><div class="list">'+by[k].map(function(r){return '<div class="rx136i"><b>'+esc(r[0])+'</b><div class="small">'+esc([r[2],r[3],r[4]].filter(Boolean).join(' · '))+(r[5]?' · <a href="tel:'+r[5].replace(/[^\d+]/g,'')+'">'+esc(r[5])+'</a>':'')+src(r[6])+'</div></div>';}).join('')+'</div>';}).join('')+'</details>';}
  if(tab==='ov'&&typeof OVK136==='object'){var L=OVK136.filter(function(r){return r[1]===grp;});
    if(L.length)html='<div class="panel rx136"><h2>'+L53('한국어로 상담할 수 있는 리조트','Korean-speaking resorts')+'</h2><div class="list">'+L.map(function(r){return '<div class="rx136i"><b>'+esc(r[0])+'</b><div class="small">'+esc([r[2],r[3],r[4]].filter(Boolean).join(' · '))+src(r[5])+'</div></div>';}).join('')+'</div><p class="small" style="margin:8px 0 0">'+L53('한국인이 운영하거나 한국인 강사가 있는 곳이에요. 예약 전 상담 언어를 한 번 더 확인하세요.','Korean-run or with Korean instructors. Confirm before booking.')+'</p></div>';}
  if(!html)return;var w=document.createElement('div');w.id='rx136';w.dataset.k=tab+grp;w.innerHTML=html;
  var ps=v.querySelectorAll(':scope > .panel');var last=ps[ps.length-1];if(last)last.after(w);else v.appendChild(w);}
(function(){var st=document.createElement('style');st.textContent='.rx136 summary{cursor:pointer;list-style:none;display:flex;flex-direction:column;gap:2px}.rx136 summary::-webkit-details-marker{display:none}.rx136 summary b:after{content:" ▾";color:var(--sub)}.rx136[open] summary b:after{content:" ▴"}.rx136h{font-size:14px;margin:14px 0 6px;color:var(--sub)}.rx136i{padding:8px 0;border-bottom:1px solid var(--line)}.rx136i:last-child{border-bottom:0}.tbl136 th{text-align:left;color:var(--sub);font-weight:500;padding:4px 12px 4px 0;white-space:nowrap;vertical-align:top}.tbl136 td{padding:4px 0}';document.head.appendChild(st);})();

/* ---------- 4. 첫 화면 흔들림 줄이기 ----------
   데이터가 하나씩 도착할 때마다 화면 전체를 다시 그리던 것을
   (1) 내용이 같으면 다시 그리지 않고 (2) 안내 시트가 열린 첫 몇 초 동안은 시트를 닫을 때 한 번만 그리고
   (3) 다시 그릴 때 창 스크롤 위치를 지켜요 */
(function(){
  var M=document.getElementById('main');if(!M)return;var last='',D=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  try{Object.defineProperty(M,'innerHTML',{configurable:true,get:function(){return D.get.call(this);},set:function(v){last=String(v);D.set.call(this,v);}});}catch(e){return;}
  var T0=Date.now(),pend=false;
  function viewHtml(){var h=(location.hash||'#home').slice(1),id=h,arg=null,dash=h.indexOf('-');if(!V[h]&&dash>0&&V[h.slice(0,dash)]){id=h.slice(0,dash);arg=h.slice(dash+1);}if(!V[id])return null;return '<div class="view">'+V[id](arg)+'</div>';}
  var _rr=rerender;
  rerender=function(){
    if(Date.now()-T0<9000&&document.body.classList.contains('locked')&&document.getElementById('sheetbg')){pend=true;return;}
    pend=false;var c=cur(),h=null;
    if(last){try{h=viewHtml();}catch(e){h=null;}}
    if(h!==null&&h===last){if(c!=='map'&&c!=='spot'){try{after();}catch(e){}}return;}
    var y=window.scrollY;var r=_rr.apply(this,arguments);if(y&&Math.abs(window.scrollY-y)>2)window.scrollTo(0,y);return r;};
  var _cs=closeSheet;closeSheet=function(){var r=_cs.apply(this,arguments);if(pend)setTimeout(function(){if(pend)rerender();},60);return r;};
})();

/* ---------- 5. 반응형 액션 ---------- */
(function(){var st=document.createElement('style');st.textContent=[
 '.btn,.chip,.tabbar a,.rtab button,[data-ropen]{transition:transform .16s cubic-bezier(.3,.7,.4,1.4),background-color .2s,color .2s,border-color .2s,box-shadow .2s;-webkit-tap-highlight-color:transparent}',
 '.btn:active,.chip:active,.rtab button:active{transform:scale(.95)}',
 '.btn-pri{position:relative;overflow:hidden}',
 '.rp136{position:absolute;border-radius:50%;background:rgba(255,255,255,.45);transform:scale(0);animation:rp136 .55s ease-out forwards;pointer-events:none}',
 '.btn-line .rp136{background:color-mix(in srgb,var(--sea) 28%,transparent)}',
 '@keyframes rp136{to{transform:scale(2.6);opacity:0}}',
 '.chip[aria-pressed=true],.rtab button[aria-pressed=true]{animation:pop136 .28s cubic-bezier(.3,.7,.4,1.5)}',
 '@keyframes pop136{0%{transform:scale(.92)}100%{transform:scale(1)}}',
 '.tabbar a svg,.tabbar a img,.tabbar a i{transition:transform .2s cubic-bezier(.3,.7,.4,1.5)}',
 '.tabbar a:active svg,.tabbar a:active img,.tabbar a:active i{transform:scale(.82)}',
 '.tabbar a[aria-current="page"] svg,.tabbar a[aria-current="page"] img{transform:translateY(-2px)}',
 '.tabbar a{position:relative}.tabbar a[aria-current="page"]:after{content:"";position:absolute;top:6px;left:50%;width:20px;height:3px;margin-left:-10px;border-radius:2px;background:var(--sea);animation:bar136 .3s ease-out}',
 '@keyframes bar136{from{width:0;margin-left:0}}',
 '.view.vin136{animation:vin136 .26s ease-out}',
 '@keyframes vin136{from{opacity:.0;transform:translateY(8px)}to{opacity:1;transform:none}}',
 '.rv136{opacity:0;transform:translateY(14px);transition:opacity .45s ease-out,transform .45s cubic-bezier(.2,.7,.3,1)}.rv136.in{opacity:1;transform:none}',
 '@media (hover:hover){.pool,.rx136i,.list > a,.card{transition:transform .2s,box-shadow .2s}.pool:hover,.card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(10,40,60,.12)}}',
 '#toast.on{animation:ts136 .32s cubic-bezier(.3,.7,.4,1.3)}@keyframes ts136{from{transform:translateX(-50%) translateY(18px) scale(.96)}to{transform:translateX(-50%)}}',
 '.sheet{animation:sh136 .28s cubic-bezier(.2,.8,.3,1)}@keyframes sh136{from{transform:translateY(24px);opacity:.4}to{transform:none;opacity:1}}',
 '#sheetbg{overscroll-behavior:contain}.sheet{overscroll-behavior:contain}',
 '@media (prefers-reduced-motion:reduce){.rv136{opacity:1!important;transform:none!important}.view.vin136,.sheet,#toast.on,.chip[aria-pressed=true]{animation:none!important}}'
].join('');document.head.appendChild(st);})();
var RM136=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('pointerdown',function(e){if(RM136)return;var b=e.target.closest('.btn-pri,.btn-line');if(!b||b.disabled)return;var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=document.createElement('span'),cs=getComputedStyle(b),po=b.style.position,ov=b.style.overflow;
  if(cs.position==='static')b.style.position='relative';b.style.overflow='hidden';d.className='rp136';d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.appendChild(d);setTimeout(function(){d.remove();if(!b.querySelector('.rp136')){b.style.position=po;b.style.overflow=ov;}},600);},{passive:true});
/* 화면을 옮겼을 때만 부드럽게 나타나기 (데이터 갱신으로 다시 그릴 때는 그대로) */
var nav136=false;window.addEventListener('hashchange',function(){nav136=true;});
var io136=('IntersectionObserver' in window)&&!RM136?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io136.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'}):null;
function motion136(){var v=document.querySelector('#main .view');if(!v||RM136)return;
  if(nav136){nav136=false;v.classList.remove('vin136');void v.offsetWidth;v.classList.add('vin136');}
  if(!io136||v.dataset.rv136)return;v.dataset.rv136=1;var H=window.innerHeight;
  [].forEach.call(v.querySelectorAll(':scope > .panel, :scope > div > .panel, .pool'),function(p){if(p.getBoundingClientRect().top>H){p.classList.add('rv136');io136.observe(p);}});}

var _after136=after;after=function(){_after136();try{poolSpot136();}catch(e){}try{resortsExtra136();}catch(e){}try{motion136();}catch(e){}};
document.addEventListener('click',function(e){if(e.target.closest('[data-rtab],[data-rgrp]'))setTimeout(resortsExtra136,30);});
