/* ===== 홈 정리: 상단 바 · 지도 카드 · 달마다 바다 · 바다 날씨 통합 · 최근 본 포인트 삭제 · 접기 확대 ===== */
/* 상단: 모바일에선 하단 '내 정보' 탭과 겹치는 버튼 숨김 */
(function(){var st=document.createElement('style');st.textContent=
'@media (max-width:860px){body.authed .topbar #authAct a.btn[href="#profile"],body.authed .topbar #authAct a.btn[href="#me"]{display:none!important}.topbar{gap:6px}}'+
/* 접힌 카드는 얇게 */
'#main .panel.fold{padding-top:10px!important;padding-bottom:10px!important}#main .panel.fold .fhd,#main .panel.fold h2.fhd{margin:0!important}#main .panel.fold h2{font-size:16px}'+
'#main .view > .panel{margin-bottom:12px}'+
/* 지도 카드 */
'#main .hmtabs{display:none!important}'+
'#main .mystat.hm1{display:flex;flex-wrap:wrap;gap:4px 12px;margin:8px 0 0!important;font-size:12.5px;color:var(--sub)}#main .mystat.hm1 span{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}#main .mystat.hm1 .dot2{width:9px;height:9px}'+
'#main .hmvisit{display:none!important}'+
'#main .hmsearch{margin-top:10px!important}#main .hmsearch input{height:40px!important;font-size:15px!important}#main .hmsearch .chips{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none;gap:6px;margin-top:8px!important;padding:0}#main .hmsearch .chips::-webkit-scrollbar{display:none}#main .hmsearch .chip{min-height:32px!important;height:32px;padding:0 12px!important;font-size:13px!important;flex:none}'+
/* 달마다 가기 좋은 바다: 한 장씩, 가로 밀림 없이 */
'#hbundle .mtrack{overflow:hidden!important;scroll-snap-type:none!important}#hbundle .mslide{display:none}#hbundle .mslide.on{display:block;flex:0 0 100%}'+
'#hbundle .mslide .ph .mb{font-size:12px;padding:3px 9px;border-radius:999px}#hbundle .mslide .bd{padding:8px 2px 0!important}#hbundle .mslide .k{font-size:12.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#hbundle .mslide .nm{display:block;margin:2px 0 4px;font-size:19px;text-decoration:none;color:var(--ink)}#hbundle .mslide .nm span{display:none}#hbundle .mslide p{margin:0 0 8px;font-size:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'+
'#hbundle .mslide .more{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;flex-wrap:nowrap}#hbundle .mslide .more::-webkit-scrollbar{display:none}#hbundle .mslide .more a{flex:none;font-size:12.5px;padding:4px 10px;border-radius:999px;background:var(--bg);color:var(--ink);text-decoration:none}'+
'#hbundle [data-mr="auto"]{display:none!important}#hbundle .mbar{display:none}#hbundle .mtabs{padding-bottom:8px}#hbundle .mtabs button{height:30px;padding:0 11px;font-size:13px}'+
/* 바다 날씨 통합 */
'#seaToday .seav{display:none!important}#seaToday .sea6{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important}#seaToday .sea6 .stat{padding:8px 6px!important;min-height:0!important;border-radius:10px}#seaToday .sea6 .stat *{font-size:11px;line-height:1.25}#seaToday .sea6 .stat b,#seaToday .sea6 .stat strong,#seaToday .sea6 .stat .v{font-size:15px!important}#seaToday .sea6 .stat span:last-child,#seaToday .sea6 .stat small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--sub)}'+
'#seaToday > p.small{font-size:12px;margin:2px 0 8px}#seaToday .sea6 + p.small{display:none}#seaToday .hrbox > h3:first-child{display:none}#seaToday .hrbox{margin-top:10px}'+
'#seaToday details.hrdet{margin-top:10px}#seaToday details.hrdet summary{cursor:pointer;font-weight:600;font-size:14px;padding:8px 0;list-style:none}#seaToday details.hrdet summary::-webkit-details-marker{display:none}#seaToday details.hrdet summary::after{content:" ▾";color:var(--sub)}#seaToday details.hrdet[open] summary::after{content:" ▴"}'+
'.seatabs{display:flex;gap:4px;margin:0 0 10px;padding:3px;border-radius:999px;background:var(--bg);width:max-content}.seatabs button{height:30px;padding:0 14px;border:0;border-radius:999px;background:none;color:var(--sub);font:600 13px/1 inherit}.seatabs button[aria-pressed=true]{background:var(--sea);color:#fff}:root[data-theme=dark] .seatabs button[aria-pressed=true]{color:#06202e}'+
'#seaToday.kr > :not(.seatabs):not(.seah):not(#knowBox){display:none!important}#seaToday:not(.kr) > #knowBox{display:none!important}#seaToday #knowBox{border:0!important;padding:0!important;margin:0!important;background:none!important;box-shadow:none!important}#seaToday #knowBox > h2{display:none}'+
'@media (max-width:380px){#seaToday .sea6{grid-template-columns:repeat(2,minmax(0,1fr))!important}}';
document.head.appendChild(st);})();
function authMark(){document.body.classList.toggle('authed',!!(BE&&BE.user));}
/* 지도 종류는 상단 전체·스쿠버·프리를 따름 */
state.hmode=DM;var _dmSet100=dmSet;dmSet=function(k){state.hmode=k;_dmSet100(k);};
function homeTidy(){if(cur()!=='home')return;var v=document.querySelector('#main .view');if(!v)return;
  /* 최근 본 포인트 삭제 */
  v.querySelectorAll('.panel').forEach(function(p){var h=p.querySelector('h2');if(h&&/최근 본 포인트|Recently viewed/.test(h.textContent))p.remove();});
  /* 지도 카드: 범례 한 줄, 다녀온 곳 칩 숨김 */
  var mp=[].filter.call(v.querySelectorAll('.panel'),function(p){return p.querySelector('.hmsearch');})[0];
  if(mp&&!mp.dataset.tidy){mp.dataset.tidy=1;var ms=mp.querySelectorAll(':scope > .mystat');if(ms.length){var a=ms[0];a.classList.add('hm1');for(var i=1;i<ms.length;i++){[].slice.call(ms[i].children).forEach(function(c){a.appendChild(c);});ms[i].remove();}var nx=a.nextElementSibling;if(nx&&nx.classList.contains('chips'))nx.classList.add('hmvisit');}}
  /* 달마다: 고른 달 한 장만 */
  monthShow();
  /* 바다 날씨 통합 */
  seaTidy();}
function monthShow(i){var hb=document.getElementById('hbundle');if(!hb)return;var S=hb.querySelectorAll('.mslide');if(!S.length)return;if(i==null){var on=hb.querySelector('.mtabs [aria-selected=true]');i=on?+on.dataset.mt:(state.mIdx!=null?state.mIdx:new Date().getMonth());}i=((i%S.length)+S.length)%S.length;state.mIdx=i;S.forEach(function(s,k){s.classList.toggle('on',k===i);});hb.querySelectorAll('.mtabs [data-mt]').forEach(function(b){var o=+b.dataset.mt===i;b.setAttribute('aria-selected',o);if(o&&b.scrollIntoView&&b.parentElement.scrollWidth>b.parentElement.clientWidth){b.parentElement.scrollLeft=b.offsetLeft-b.parentElement.clientWidth/2+b.offsetWidth/2;}});var t=hb.querySelector('.mtrack');if(t)t.scrollLeft=0;}
document.addEventListener('click',function(e){var b=e.target.closest('#hbundle [data-mt]');if(b){e.preventDefault();e.stopImmediatePropagation();monthShow(+b.dataset.mt);return;}b=e.target.closest('#hbundle [data-mr]');if(b&&b.dataset.mr!=='auto'){e.preventDefault();e.stopImmediatePropagation();var d=/prev|-1|left/.test(b.dataset.mr)?-1:1;monthShow((state.mIdx||0)+d);}},true);
/* 자동 넘김 끄기 */
(function(){var _si=window.setInterval;window.setInterval=function(f,ms){var s=String(f);if(ms>=2500&&/mtrack|mslide|data-mr/.test(s))return 0;return _si.apply(window,arguments);};})();
function seaTidy(){var s=document.getElementById('seaToday');if(!s)return;var h2=s.querySelector(':scope > h2');
  if(!s.dataset.tidy){s.dataset.tidy=1;if(h2)h2.classList.add('seah');
    var hr=s.querySelector('.hrbox .hrt');if(hr&&!hr.closest('details')){var h3=hr.previousElementSibling&&hr.previousElementSibling.tagName==='H3'?hr.previousElementSibling:null;var d=document.createElement('details');d.className='hrdet';d.innerHTML='<summary>시간별 예보</summary>';hr.before(d);d.appendChild(hr);var nt=d.nextElementSibling;if(nt&&nt.tagName==='P')d.appendChild(nt);if(h3)h3.remove();}}
  var k=document.getElementById('knowBox');
  if(k&&k.parentElement!==s){s.appendChild(k);}
  if(k&&!s.querySelector('.seatabs')){var t=document.createElement('div');t.className='seatabs';t.setAttribute('role','group');var kr=state.seaTab==='kr';t.innerHTML='<button type="button" data-seat="pt" aria-pressed="'+!kr+'">포인트 예보</button><button type="button" data-seat="kr" aria-pressed="'+kr+'">국내 바다 지금</button>';(h2||s.firstChild).after(t);s.classList.toggle('kr',kr);if(h2&&!h2.dataset.t0)h2.dataset.t0=h2.childNodes[0]?h2.childNodes[0].textContent:'';}
  if(h2&&!/바다 날씨/.test(h2.textContent)&&h2.firstChild&&h2.firstChild.nodeType===3)h2.firstChild.textContent=h2.firstChild.textContent.replace(/오늘 날씨/,'바다 날씨');}
document.addEventListener('click',function(e){var b=e.target.closest('[data-seat]');if(!b)return;var s=document.getElementById('seaToday');if(!s)return;state.seaTab=b.dataset.seat;s.classList.toggle('kr',state.seaTab==='kr');s.querySelectorAll('[data-seat]').forEach(function(x){x.setAttribute('aria-pressed',x===b);});});
/* 국내 바다 지금이 나중에 붙어도 합치기 */
new MutationObserver(function(){if(cur()!=='home')return;var k=document.getElementById('knowBox'),s=document.getElementById('seaToday');if(k&&s&&k.parentElement!==s)seaTidy();}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
/* 접기: 로그북 · 모임 · 지도 페이지까지, '같은 날 여러 번 다이빙'은 처음엔 접힘 */
FOLD_R=/^(home|profile|logstats|admin|log|community|meet|clubs|life|tools|safety|gear|edu|trip|pools|resorts)$/;
var FOLD_DEF=[/^log:같은 날 여러 번/,/^home:이번 시즌 추천/];
function foldSeed(){var F=foldGet(),S;try{S=JSON.parse(localStorage.getItem('dtdo.foldseed')||'{}');}catch(e){S={};}var ch=false;document.querySelectorAll('#main .view .panel[data-fk]').forEach(function(p){var k=p.dataset.fk;if(S[k])return;if(FOLD_DEF.some(function(r){return r.test(k);})){S[k]=1;ch=true;if(F[k]===undefined){F[k]=1;p.classList.add('fold');var b=p.querySelector('.foldbtn');if(b)b.setAttribute('aria-expanded','false');}}});if(ch){foldSet(F);try{localStorage.setItem('dtdo.foldseed',JSON.stringify(S));}catch(e){}}}
var _after100=after;after=function(){_after100();authMark();homeTidy();setTimeout(homeTidy,400);setTimeout(homeTidy,1600);setTimeout(foldSeed,450);setTimeout(foldSeed,1600);};
/* 로그북 작성 방식 이름 */
LBM_T.auto=['빠른 쓰기','파일만 올리면 위치·수심까지 채워요'];LBM_T.semi=['직접 입력','기본은 채워 두고 나머지는 골라서 써요'];LBM_T.hand=['수기','태블릿 펜슬로 양식에 직접 써요'];
if(LANG==='en'){Object.assign(EN_D,{'빠른 쓰기':'Quick','직접 입력':'Manual','수기':'Handwritten','포인트 예보':'Spot forecast','국내 바다 지금':'Korea now','시간별 예보':'Hourly'});}
/* 로그북 화면 정리: 빠른 기록 폼·위쪽 가져오기 버튼 중복 삭제, 목록 머리 줄 정리 */
FOLD_DEF.push(/^log:최근 다이브 프로필/);
function logTidy100(){if(cur()!=='log')return;var v=document.querySelector('#main .view');if(!v)return;
  var q=document.getElementById('quickLog');if(q&&!q.dataset.hid){q.dataset.hid=1;if(!state.qOpen)q.classList.add('qhide');var qc=q.closest('.cols');var lb=document.getElementById('lbBox');if(qc&&lb){lb.after(q);if(!qc.textContent.trim())qc.remove();}var h2=q.querySelector('h2');if(h2&&!q.querySelector('.qx')){h2.textContent='직접 쓰기';h2.insertAdjacentHTML('beforeend',' <button type="button" class="chip qx" style="float:right;min-height:28px;font-size:12px">닫기</button>');}}
  var lt=document.getElementById('logTop');if(lt)lt.remove();
  var h=document.querySelector('#lbBox .lbh');if(h&&!h.querySelector('.lbst')){var a=document.createElement('a');a.className='small lbst';a.href='#logstats';a.textContent='통계';var bx=h.querySelector('a.btn,button.btn,.chip');(bx?bx.parentElement:h).insertBefore(a,bx||null);}}
var _after100b=after;after=function(){_after100b();logTidy100();setTimeout(logTidy100,300);};
(function(){var st=document.createElement('style');st.textContent=
'#lbBox .lbh{display:flex;align-items:center;gap:6px;flex-wrap:nowrap}#lbBox .lbh h2{margin:0;font-size:18px;white-space:nowrap;margin-right:auto}#lbBox .lbh .btn,#lbBox .lbh .chip{min-height:32px!important;height:32px;padding:0 12px!important;font-size:13px!important;flex:none}#lbBox .lbh .lbst{margin-right:4px;white-space:nowrap}'+
'#quickLog.qhide{display:none!important}#lbLast{font-size:12.5px;margin:6px 0 8px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#lbBox input[type=search],#lbBox input#lbQ{height:40px!important;font-size:15px!important;margin-bottom:6px}'+
'#lbmBox{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 10px}#lbmBox .lbm button{height:34px;font-size:13.5px}#lbmBox .lbmhint{flex-basis:100%;font-size:12px;margin:0}';document.head.appendChild(st);})();

document.addEventListener('click',function(e){if(e.target.closest('[data-lbnew]')){state.qOpen=1;var q=document.getElementById('quickLog');if(q)q.classList.remove('qhide');}if(e.target.closest('#quickLog .qx')){state.qOpen=0;var q2=document.getElementById('quickLog');if(q2)q2.classList.add('qhide');}},true);
/* 다이브 프로필: 실제 기록 곡선 + 격자 · 오르내림 화살표 · 상승 속도 · 안전정지 */
function profPts(l){var P=state.lbP&&state.lbP[l.id];if(P&&Array.isArray(P.profile)&&P.profile.length>3)return {p:P.profile.map(function(x){return [x[0]/60,+x[1]||0,x[2]];}),real:true,temp:P.water_temp};
  var d=+l.depth||0,m=+l.time||0;if(!d||!m)return null;var desc=Math.max(1,d/18),asc=Math.max(1,(d-5)/9),stop=d>10?3:0,bot=Math.max(1,m-desc-asc-stop-.5),pts=[[0,0],[desc,d],[desc+bot,d],[desc+bot+asc,stop?5:0]];if(stop)pts.push([desc+bot+asc+stop,5]);pts.push([desc+bot+asc+stop+.5,0]);return {p:pts,real:false};}
function profChart(l){var o=profPts(l);if(!o)return '';var p=o.p,W=340,H=170,L=30,R=8,T=14,B=22,mt=p[p.length-1][0]||1,md=0;p.forEach(function(x){if(x[1]>md)md=x[1];});var ys=md<=12?3:md<=25?5:md<=50?10:20,ymax=Math.ceil(Math.max(md,ys)/ys)*ys,xs=mt<=20?5:mt<=60?10:mt<=120?20:30;
  var X=function(t){return L+t/mt*(W-L-R);},Y=function(z){return T+z/ymax*(H-T-B);};
  var g='';for(var z=0;z<=ymax;z+=ys)g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(z).toFixed(1)+'" y2="'+Y(z).toFixed(1)+'" stroke="currentColor" stroke-opacity="'+(z?'.12':'.25')+'"/><text x="'+(L-4)+'" y="'+(Y(z)+3).toFixed(1)+'" text-anchor="end" font-size="9" fill="currentColor" fill-opacity=".55">'+z+'</text>';
  for(var t=0;t<=mt+.01;t+=xs)g+='<line x1="'+X(t).toFixed(1)+'" x2="'+X(t).toFixed(1)+'" y1="'+T+'" y2="'+(H-B)+'" stroke="currentColor" stroke-opacity=".08"/><text x="'+X(t).toFixed(1)+'" y="'+(H-8)+'" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity=".55">'+Math.round(t)+'</text>';
  var band=md>8?'<rect x="'+L+'" y="'+Y(3).toFixed(1)+'" width="'+(W-L-R)+'" height="'+(Y(6)-Y(3)).toFixed(1)+'" fill="#f39c12" opacity=".1"/><text x="'+(W-R-2)+'" y="'+(Y(3)-2).toFixed(1)+'" text-anchor="end" font-size="8.5" fill="#d68910">안전정지 3~6m</text>':'';
  var line=p.map(function(x,i){return (i?'L':'M')+X(x[0]).toFixed(1)+','+Y(x[1]).toFixed(1);}).join(''),area=line+'L'+X(mt).toFixed(1)+','+Y(0)+'L'+X(0)+','+Y(0)+'Z';
  /* 1분 단위로 묶어 오르내림 속도 계산 */
  var seg=[],win=o.real?1:0;if(o.real){var j=0;for(var a=0;a<mt;a+=win){var s=null,e=null;for(;j<p.length&&p[j][0]<a;j++);var k=j;s=p[Math.max(0,k-1)]||p[0];for(;k<p.length&&p[k][0]<a+win;k++);e=p[Math.min(p.length-1,k)];if(e[0]>s[0])seg.push([ (s[0]+e[0])/2,(s[1]+e[1])/2,(e[1]-s[1])/(e[0]-s[0])]);}}
  else{for(var i=1;i<p.length;i++){var dt=p[i][0]-p[i-1][0];if(dt>0)seg.push([(p[i][0]+p[i-1][0])/2,(p[i][1]+p[i-1][1])/2,(p[i][1]-p[i-1][1])/dt]);}}
  var arr='',maxUp=0,maxDn=0,step=Math.max(1,Math.round(seg.length/16));seg.forEach(function(s,i){var r=s[2];if(-r>maxUp)maxUp=-r;if(r>maxDn)maxDn=r;if(!o.real||i%step||Math.abs(r)<1.5)return;var up=r<0,c=up?(-r>9?'#e74c3c':-r>6?'#f39c12':'#27ae60'):'#3498db',x=X(s[0]),y=Y(s[1])+(up?-9:9);arr+='<path d="'+(up?'M'+(x-4)+','+(y+3)+'L'+x+','+(y-3)+'L'+(x+4)+','+(y+3)+'Z':'M'+(x-4)+','+(y-3)+'L'+x+','+(y+3)+'L'+(x+4)+','+(y-3)+'Z')+'" fill="'+c+'"/>';});
  var mi=0;p.forEach(function(x,i){if(x[1]>p[mi][1])mi=i;});var mx=X(p[mi][0]),my=Y(p[mi][1]);
  var stopOk=false;if(md>10){var st=0;for(var i2=1;i2<p.length;i2++){if(p[i2][1]>=2.5&&p[i2][1]<=6.5&&p[i2-1][1]>=2.5&&p[i2-1][1]<=6.5&&p[i2][0]>p[mi][0])st+=p[i2][0]-p[i2-1][0];}stopOk=st>=2.5;}
  var av=0,at=0;for(var i3=1;i3<p.length;i3++){var d3=p[i3][0]-p[i3-1][0];if(d3>0){av+=(p[i3][1]+p[i3-1][1])/2*d3;at+=d3;}}av=at?av/at:0;
  var id='pg'+(l.id||Math.round(md*100+mt));
  var svg='<svg class="pchart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="최대 '+md.toFixed(1)+'m '+Math.round(mt)+'분 다이브 프로필'+(o.real?'':'(추정)')+'"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a8fbd" stop-opacity=".05"/><stop offset="1" stop-color="#2a8fbd" stop-opacity=".45"/></linearGradient></defs>'+g+band+'<path d="'+area+'" fill="url(#'+id+')"/><path d="'+line+'" fill="none" stroke="#2a8fbd" stroke-width="1.8" stroke-linejoin="round"/>'+arr+
   '<circle cx="'+mx.toFixed(1)+'" cy="'+my.toFixed(1)+'" r="3.2" fill="#fff" stroke="#e74c3c" stroke-width="1.6"/><text x="'+Math.min(W-R-30,mx+5).toFixed(1)+'" y="'+Math.min(H-B-3,my+12).toFixed(1)+'" font-size="10" font-weight="700" fill="#e74c3c">▼'+md.toFixed(1)+'m</text><text x="'+L+'" y="10" font-size="8.5" fill="currentColor" fill-opacity=".55">m</text><text x="'+(W-R)+'" y="'+(H-1)+'" text-anchor="end" font-size="8.5" fill="currentColor" fill-opacity=".55">분</text></svg>';
  var chip=function(k,v,c){return '<span'+(c?' class="'+c+'"':'')+'><em>'+k+'</em>'+v+'</span>';};
  return '<div class="pcw">'+svg+'<div class="pcs">'+chip('최대',md.toFixed(1)+'m')+chip('평균',av.toFixed(1)+'m')+chip('시간',Math.round(mt)+'분')+(o.real?chip('하강 ▼',maxDn.toFixed(1)+'m/분')+chip('상승 ▲',maxUp.toFixed(1)+'m/분',maxUp>9?'bad':maxUp>6?'warn':'ok')+(md>10?chip('안전정지',stopOk?'했어요':'확인 안 됨',stopOk?'ok':'warn'):''):'')+(o.temp!=null?chip('수온',o.temp+'°C'):'')+'</div>'+(o.real?'':'<div class="small" style="margin-top:2px">수심·시간으로 그린 추정 곡선이에요</div>')+'</div>';}
function profPanel(){if(cur()!=='log')return;var pn=[].filter.call(document.querySelectorAll('#main .view .panel'),function(p){var h=p.querySelector('h2');return h&&/최근 다이브 프로필/.test(h.textContent);})[0];if(!pn)return;var L=(state.userLogs||[]).slice().sort(function(a,b){return (b.date||'')>(a.date||'')?1:-1;}).slice(0,6);
  if(typeof lbProf==='function'){state.lbP=state.lbP||{};lbProf(L.filter(function(l){return l.id;}).map(function(l){return l.id;}));}
  var items=pn.querySelectorAll('.list > .item');items.forEach(function(it,i){var l=L[i];if(!l)return;var box=it.querySelector(':scope > div[style*="flex-basis"]');if(!box)return;var P=state.lbP&&state.lbP[l.id],key=(P&&P.profile?'r':'e')+(l.id||i);if(box.dataset.pk===key)return;var h=profChart(l);if(h){box.innerHTML=h;box.dataset.pk=key;}});
  var tr=pn.querySelector('.trm');if(tr)tr.textContent='▲ 상승(초록 6m/분 이하 · 주황 6~9 · 빨강 9 넘음) · ▼ 하강';}
var _lbPaint100=typeof lbPaint==='function'?lbPaint:null;if(_lbPaint100){lbPaint=function(){_lbPaint100();profPanel();};}
var _after100c=after;after=function(){_after100c();profPanel();setTimeout(profPanel,500);setTimeout(profPanel,1800);};
(function(){var st=document.createElement('style');st.textContent='.pcw{margin-top:8px;color:var(--ink)}.pchart{width:100%;max-width:520px;display:block;background:var(--bg);border-radius:12px}.pcs{display:flex;flex-wrap:wrap;gap:4px 6px;margin-top:6px}.pcs span{font-size:12px;padding:3px 8px;border-radius:8px;background:var(--bg);white-space:nowrap}.pcs em{font-style:normal;color:var(--sub);margin-right:4px}.pcs .ok{color:#27ae60}.pcs .warn{color:#d68910}.pcs .bad{color:#e74c3c}';document.head.appendChild(st);})();
/* 내 정보 순서: 프로필 → 자격증 → 바로가기 → 예약 → 저장한 포인트 → 내가 등록한 것 → 운영자 → 설정 · 안내 → 로그아웃 → 바닥글 */
var PR_ORD=[/^miAsk$/,/내 프로필/,/자격증 카드/,/강사 도장|리조트 도장/,/바로가기/,/예약/,/저장한 포인트/,/내가 등록한 것/,/운영자 콘솔/,/설정 · 안내/,/^loBot$/];
function profOrder(){if(cur()!=='profile'||location.hash.replace('#','')!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var vh=v.querySelector(':scope > .vh'),ft=v.querySelector(':scope > .foot');
  var K=[].slice.call(v.children).filter(function(c){return c!==vh&&c!==ft;}),key=function(c){var t=(c.querySelector('h2,summary,h3')||{}).textContent||'';for(var i=0;i<PR_ORD.length;i++){if(PR_ORD[i].test(c.id||'')||PR_ORD[i].test(t))return i;}return 8.5;};
  var S=K.map(function(c,i){return [key(c),i,c];}).sort(function(a,b){return a[0]-b[0]||a[1]-b[1];});var ok=S.every(function(s,i){return s[2]===K[i];});if(ok&&(!ft||v.lastElementChild===ft))return;S.forEach(function(s){v.appendChild(s[2]);});if(ft)v.appendChild(ft);}
var _after100d=after;after=function(){_after100d();profOrder();setTimeout(profOrder,400);setTimeout(profOrder,1500);setTimeout(profOrder,3500);};
/* 활동 순위 */
function rankLoad(){if(!BE.on||!BE.user||rankLoad.b)return;rankLoad.b=1;BE.sb.rpc('activity_rank',{p_limit:10}).then(function(r){rankLoad.b=0;state.rank=r.data||{top:[]};rankPaint();});}
function rankPaint(){var a=document.getElementById('actBox');if(!a)return;var R=state.rank;if(!R){rankLoad();return;}var o=document.getElementById('rankBox');var me=R.me,T=R.top||[];
  var h='<div class="rkh"><b>활동 순위</b><span class="small">'+(me?'전체 '+R.total+'명 중 <b class="rkme">'+me.rank+'위</b>':'활동을 시작하면 순위에 올라가요')+'</span></div>'+
   '<ol class="rkl">'+T.map(function(x){return '<li class="'+(x.me?'me':'')+'"><span class="rkn'+(x.rank<=3?' t'+x.rank:'')+'">'+x.rank+'</span><span class="rknm">'+esc(x.nick||'익명 다이버')+(x.me?' <em>나</em>':'')+'</span><span class="small">로그 '+x.logs+'</span><b>'+Number(x.pts).toLocaleString()+'P</b></li>';}).join('')+'</ol>'+
   (me&&me.rank>T.length?'<div class="rkl1 small">… 내 순위 '+me.rank+'위 · '+Number(me.pts).toLocaleString()+'P</div>':'')+
   '<label class="rkhide small"><input type="checkbox" id="rkHide"'+(me&&me.hidden?' checked':'')+'> 순위에서 내 닉네임 숨기기</label>';
  if(!o){o=document.createElement('div');o.id='rankBox';a.appendChild(o);}o.innerHTML=h;}
document.addEventListener('change',function(e){if(e.target.id!=='rkHide')return;var v=e.target.checked;BE.sb.from('profiles').update({rank_hidden:v}).eq('id',BE.user.id).then(function(r){if(r.error){toast('바꾸지 못했어요');e.target.checked=!v;return;}toast(v?'순위에서 닉네임을 숨겼어요':'순위에 닉네임이 보여요');state.rank=null;rankLoad();});});
var _after100e=after;after=function(){_after100e();if(cur()==='profile'){setTimeout(rankPaint,300);setTimeout(rankPaint,1500);}};
(function(){var st=document.createElement('style');st.textContent='#rankBox{margin-top:14px;border-top:1px solid var(--line);padding-top:12px}.rkh{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}.rkme{color:var(--sea)}.rkl{list-style:none;margin:0;padding:0;display:grid;gap:2px}.rkl li{display:grid;grid-template-columns:28px 1fr auto auto;gap:8px;align-items:center;padding:6px 4px;border-radius:8px;font-size:14px}.rkl li.me{background:color-mix(in srgb,var(--sea) 14%,transparent)}.rkl li b{font-size:13.5px}.rkl em{font-style:normal;font-size:11px;color:var(--sea)}.rkn{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;background:var(--bg)}.rkn.t1{background:#f5c542;color:#4a3500}.rkn.t2{background:#cfd8dc;color:#263238}.rkn.t3{background:#d7a26b;color:#3e2410}.rknm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rkl1{padding:4px}.rkhide{display:flex;gap:6px;align-items:center;margin-top:8px}';document.head.appendChild(st);})();
/* 입점 · 광고 화면 다시 짜기: 한 장짜리 메뉴 + 요금 + 기준, 중복 버튼 정리, 문의는 팝업 */
function partnerTidy(){if(cur()!=='partner')return;var v=document.querySelector('#main .view');if(!v||v.dataset.pt)return;var tt=document.getElementById('tidyTop');if(!tt)return;v.dataset.pt=1;
  var vp=v.querySelector('.vh p');if(vp)vp.textContent='입점비 · 월 요금 없이, 예약이 생길 때만 수수료를 내요.';
  var cards=tt.firstElementChild;if(cards&&cards.querySelectorAll(':scope > .panel').length>=3){var rows=[['🏝','업체 등록','리조트 · 강사 · 정비점 페이지 만들기','#biz','btn-pri','등록'],['📣','광고 신청','지역을 골라 리조트 · 장비 화면에 노출','#ads','btn-line','신청'],['💬','먼저 문의','이름과 연락처만 남기면 연락드려요','#','btn-line','문의','data-ptask="1"']];
    var act=document.createElement('div');act.className='panel ptact';act.innerHTML=rows.map(function(r){return '<div class="ptr"><span class="pti">'+r[0]+'</span><span class="ptx"><b>'+r[1]+'</b><span>'+r[2]+'</span></span><a class="btn '+r[4]+'" href="'+r[3]+'" '+(r[6]||'')+'>'+r[5]+'</a></div>';}).join('');cards.replaceWith(act);}
  /* 요금 한눈에를 메뉴 바로 아래로, 안의 광고 버튼 빼기 */
  var P=[].slice.call(v.querySelectorAll(':scope > .panel'));var find=function(re){return P.filter(function(p){var h=p.querySelector('h2');return (h&&re.test(h.textContent))||re.test((p.firstElementChild||{}).textContent||'');})[0];};
  var sum=find(/한눈에 보기/),ad=find(/광고 상품/),rule=find(/입점 · 광고 기준과 결제/),reg=find(/업체 등록하고 내 페이지/),form=document.getElementById('applyForm');
  if(sum){var b=sum.querySelector(':scope > a.btn');if(b)b.remove();var h=sum.querySelector('h2');if(h)h.textContent='요금';tt.before(sum);var act2=v.querySelector('.ptact');if(act2)sum.before(act2);}
  if(ad){var b2=ad.querySelector(':scope > a.btn');if(b2)b2.remove();if(sum)sum.after(ad);}
  if(rule&&ad)ad.after(rule);
  if(reg)reg.remove();
  if(form){form.classList.add('pthide');}
  var tp=tt.querySelector(':scope > .panel h2');if(tp&&/요금 · 기준/.test(tp.textContent)){var pp=tp.parentElement.querySelector('p.small');if(pp)pp.remove();tp.textContent='더 알아보기';}}
document.addEventListener('click',function(e){var a=e.target.closest('[data-ptask]');if(!a)return;e.preventDefault();var f=document.getElementById('applyForm');if(!f)return;sheet('<h2 style="margin:0 0 10px">입점 문의</h2><div id="applySlot"></div>');var ph=document.createElement('div');ph.id='applyPh';f.before(ph);var s=document.getElementById('applySlot');f.classList.remove('pthide');f.style.margin='0';f.style.border='0';f.style.padding='0';s.appendChild(f);},true);
var _closeSheet100=closeSheet;closeSheet=function(){var f=document.getElementById('applyForm'),ph=document.getElementById('applyPh');if(f&&ph){ph.replaceWith(f);f.classList.add('pthide');}return _closeSheet100.apply(this,arguments);};window.closeSheet=closeSheet;
var _after100f=after;after=function(){_after100f();partnerTidy();setTimeout(partnerTidy,300);};
(function(){var st=document.createElement('style');st.textContent='#applyForm.pthide{display:none!important}.ptact{display:grid;gap:0;padding-top:6px!important;padding-bottom:6px!important}.ptr{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}.ptr:last-child{border-bottom:0}.pti{width:36px;height:36px;border-radius:10px;background:var(--bg);display:grid;place-items:center;font-size:18px}.ptx{display:flex;flex-direction:column;min-width:0}.ptx b{font-size:15px}.ptx span{font-size:12.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ptr .btn{min-height:34px;height:34px;padding:0 14px;font-size:13.5px}';document.head.appendChild(st);})();
/* 상단 바 정렬: 좁은 화면에선 로고를 물결 심볼만 */
(function(){var b=document.querySelector('.topbar .brand');if(!b||b.querySelector('.logo-sym'))return;b.insertAdjacentHTML('beforeend','<img class="logo-sym" src="/assets/brand/symbol-waves.svg" alt="Dive the deep ocean" width="36" height="36">');
  var st=document.createElement('style');st.textContent='.topbar .brand .logo-sym{display:none}'+
  '@media (max-width:480px){.topbar{display:flex;align-items:center;gap:6px!important;padding-left:12px!important;padding-right:12px!important}.topbar .brand img.logo-l,.topbar .brand img.logo-d{display:none!important}.topbar .brand .logo-sym{display:block!important;height:34px!important;width:34px!important}'+
  '.topbar .dmtop{margin:0 auto!important;flex:0 1 auto;min-width:0}.topbar .dmtop button{padding:0 12px!important;font-size:13px!important;height:32px!important}.topbar .topact{flex:none;gap:6px!important;margin-left:0!important}.topbar .topact .iconbtn{width:38px!important;height:38px!important;min-width:38px}.topbar #authAct{gap:6px!important}}'+
  '@media (max-width:350px){.topbar .dmtop button{padding:0 8px!important;font-size:12px!important}}';document.head.appendChild(st);})();
/* 달마다: 탭의 달과 같은 달 카드 · 아래 날씨도 그 포인트로 */
function mNum(t){var m=String(t||'').match(/(\d{1,2})월|^(\w{3})/);if(!m)return null;if(m[1])return +m[1];var E=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(m[2]);return E>=0?E+1:null;}
monthShow=function(i){var hb=document.getElementById('hbundle');if(!hb)return;var S=[].slice.call(hb.querySelectorAll('.mslide')),T=[].slice.call(hb.querySelectorAll('.mtabs [data-mt]'));if(!S.length)return;
  if(i==null){var on=hb.querySelector('.mtabs [aria-selected=true]');i=on?T.indexOf(on):(state.mIdx!=null?state.mIdx:new Date().getMonth());}i=((i%T.length)+T.length)%T.length;state.mIdx=i;
  var want=T[i]?mNum(T[i].textContent):null,sl=S.filter(function(s){var mb=s.querySelector('.mb');return mb&&mNum(mb.textContent)===want;})[0]||S[i]||S[0];
  S.forEach(function(s){s.classList.toggle('on',s===sl);});T.forEach(function(b,k){var o=k===i;b.setAttribute('aria-selected',o);if(o&&b.parentElement.scrollWidth>b.parentElement.clientWidth)b.parentElement.scrollLeft=b.offsetLeft-b.parentElement.clientWidth/2+b.offsetWidth/2;});
  var s=sl&&spot(sl.dataset.sid);if(s&&state.seaSid!==s.id){state.seaSid=s.id;state.sel=s.id;if(typeof MR!=='undefined'){MR.sea=s.id;MR.i=S.indexOf(sl);}seaToday(s);}};
/* 날씨를 새로 그려도 국내 바다 · 탭 · 접힘이 유지되게 */
var _seaToday100=seaToday;seaToday=function(s){var k=document.getElementById('knowBox'),el=document.getElementById('seaToday');if(k&&el&&k.parentElement===el)el.after(k);var r=_seaToday100.apply(this,arguments);setTimeout(seaTidy,0);setTimeout(seaTidy,1200);setTimeout(seaTidy,3500);return r;};Object.keys(_seaToday100).forEach(function(k){seaToday[k]=_seaToday100[k];});
seaTidy=function(){var s=document.getElementById('seaToday');if(!s)return;var h2=s.querySelector(':scope > h2');if(h2)h2.classList.add('seah');
  var hr=s.querySelector('.hrbox .hrt');if(hr&&!hr.closest('details')){var h3=hr.previousElementSibling&&hr.previousElementSibling.tagName==='H3'?hr.previousElementSibling:null;var d=document.createElement('details');d.className='hrdet';d.innerHTML='<summary>시간별 예보</summary>';hr.before(d);d.appendChild(hr);var nt=d.nextElementSibling;if(nt&&nt.tagName==='P')d.appendChild(nt);if(h3)h3.remove();}
  var k=document.getElementById('knowBox');if(k&&k.parentElement!==s)s.appendChild(k);
  if(k&&!s.querySelector('.seatabs')){var t=document.createElement('div');t.className='seatabs';var kr=state.seaTab==='kr';t.innerHTML='<button type="button" data-seat="pt" aria-pressed="'+!kr+'">포인트 예보</button><button type="button" data-seat="kr" aria-pressed="'+kr+'">국내 바다 지금</button>';(h2||s.firstChild).after(t);}
  s.classList.toggle('kr',state.seaTab==='kr'&&!!k);
  if(h2&&h2.firstChild&&h2.firstChild.nodeType===3)h2.firstChild.textContent=h2.firstChild.textContent.replace(/오늘 (날씨|바다)/,'바다 날씨');};
/* 운영자 콘솔: 탭 12개 → 6개로 묶기, 요약은 할 일 중심 */
var AG=[['sum','요약',['sum']],['work','처리할 일',['rev','rep','help']],['users','회원',['users']],['stat','통계',['stat','data','cont']],['biz','업체 · 결제',['bizads','pay']],['set','설정 · 기록',['set','audit']]],AGOF={};AG.forEach(function(g){g[2].forEach(function(k){AGOF[k]=g[0];});AGOF[g[0]]=g[0];});
aShow=function(){var t=AGOF[state.atab]||state.atab||'sum',c=aCounts();[].forEach.call(document.querySelectorAll('#main [data-atab]'),function(p){var d=(AGOF[p.dataset.atab]||p.dataset.atab)===t?'':'none';if(p.style.display!==d)p.style.display=d;});var tb=document.getElementById('aTabs');if(!tb)return;
  var h=AG.map(function(g){var n=0;g[2].forEach(function(k){n+=+c[k]||0;});return '<button type="button" data-atgo="'+g[0]+'" aria-pressed="'+(t===g[0])+'">'+g[1]+(n?'<b>'+n+'</b>':'')+'</button>';}).join('');if(tb.dataset.h!==h){tb.dataset.h=h;tb.innerHTML=h;}};
FOLD_DEF.push(/^admin:서비스 상태/,/^admin:로그북/,/^admin:많이 쓰는 기기/,/^admin:로그 많은 포인트/,/^admin:업체 심사 체크리스트/,/^admin:외부 서비스 키/,/^admin:베타 모집/);
function admTidy(){if(cur()!=='admin')return;var v=document.querySelector('#main .view');if(!v)return;var vp=v.querySelector('.vh p');if(vp)vp.textContent='할 일 · 회원 · 통계 · 업체를 한곳에서';var q=document.getElementById('aQuick');if(q&&!q.dataset.t){q.dataset.t=1;q.classList.add('aqk');}}
var _after100g=after;after=function(){_after100g();admTidy();setTimeout(admTidy,400);};
(function(){var st=document.createElement('style');st.textContent='#aTabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;flex-wrap:nowrap}#aTabs::-webkit-scrollbar{display:none}#aTabs button{flex:none;height:34px;padding:0 13px;font-size:13.5px}#aTabs button b{margin-left:5px;font-size:11px;background:#e74c3c;color:#fff;border-radius:999px;padding:1px 6px}#aQuick.aqk{padding-top:10px!important;padding-bottom:10px!important}#aQuick.aqk h2{font-size:14px;margin:0 0 6px}#aQuick.aqk .chips,#aQuick.aqk > div{display:flex;gap:6px;flex-wrap:wrap}#aQuick.aqk .chip,#aQuick.aqk a,#aQuick.aqk button{min-height:32px}#aSum .atodo{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}';document.head.appendChild(st);})();
/* 내 정보 머리 정리: 중복 계정 관리 · 로그아웃 빼고, 내 바다 카드는 제목 옆 작은 버튼 */
function profHead(){if(cur()!=='profile'||location.hash.replace('#','')!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var vh=v.querySelector(':scope > .vh');if(!vh||vh.dataset.ph2)return;
  var kvp=v.querySelector('.panel.kvp');if(!kvp)return;vh.dataset.ph2=1;var lt=document.getElementById('loTop');if(lt)lt.remove();
  [].slice.call(vh.querySelectorAll('a,button')).forEach(function(e){if(/계정 관리|Account/.test(e.textContent)&&!kvp.contains(e))e.remove();});
  var card=[].find.call(v.querySelectorAll('a,button'),function(e){return /내 바다 카드|My sea card/.test(e.textContent)&&!kvp.contains(e);});var p=vh.querySelector('p');if(p)p.remove();
  if(card){card.classList.remove('btn-line','btn');card.classList.add('chip','phcard');var wrap=card.parentElement;vh.appendChild(card);if(wrap&&wrap!==vh&&wrap!==v&&!wrap.textContent.trim())wrap.remove();}
  vh.classList.add('phd');}
var _after100h=after;after=function(){_after100h();profHead();setTimeout(profHead,300);setTimeout(profHead,1200);};
(function(){var st=document.createElement('style');st.textContent='.vh.phd{display:flex!important;align-items:center;justify-content:space-between;gap:8px;flex-wrap:nowrap}.vh.phd > div{min-width:0}.vh.phd .phcard{flex:none;min-height:34px;font-size:13.5px}.kvp .fright .btn,.kvp .fright .chip,.kvp h2 .btn,.kvp h2 .chip{min-height:30px!important;height:30px;padding:0 10px!important;font-size:12.5px!important}';document.head.appendChild(st);})();
/* 클럽 화면 다듬기: 머리 줄 정리 · 로고 아래 군더더기 숨김 · 글쓰기 칸 작게 */
function clubTidy(){if(cur()!=='club')return;var v=document.querySelector('#main .view');if(!v)return;var vh=v.querySelector('.vh');if(vh&&!vh.dataset.ct){vh.dataset.ct=1;vh.classList.add('clubvh');}
  v.querySelectorAll('label[title="로고 바꾸기"] small.fuh, label[title="로고 바꾸기"] > span.small').forEach(function(e){e.remove();});
  var ta=[].filter.call(v.querySelectorAll('[data-club] form textarea'),function(x){return !x.closest('.lesf,.lesnew,.lesff');})[0];if(ta&&!ta.dataset.ct){ta.dataset.ct=1;ta.rows=2;ta.classList.add('ctxt');var f=ta.closest('form');if(f)f.classList.add('cform');}}
var _after100i=after;after=function(){_after100i();clubTidy();setTimeout(clubTidy,300);};
(function(){var st=document.createElement('style');st.textContent='.clubvh{display:grid!important;grid-template-columns:auto 1fr;gap:4px 14px;align-items:center}.clubvh label[title="로고 바꾸기"],.clubvh > .clogo{grid-row:1/span 3}.clubvh .clogo{width:64px;height:64px;border-radius:16px;font-size:26px}.clubvh h1{font-size:22px;margin:0}.clubvh p{margin:0;font-size:13px}.clubvh .btn{min-height:34px;height:34px;padding:0 14px;font-size:13.5px;justify-self:start}.clubvh a.small{font-size:13px}'+
'.cform{display:flex!important;gap:8px;align-items:flex-end;flex-wrap:nowrap}.cform .ctxt{flex:1;min-height:44px!important;height:auto;resize:none;font-size:15px}.cform .btn{flex:none;min-height:40px;height:40px;padding:0 16px}'+
'[data-club] .empty{font-size:13.5px;text-align:center;padding:14px 0;color:var(--sub)}';document.head.appendChild(st);})();
