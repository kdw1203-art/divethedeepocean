/* ===== 137 어두운 화면 정리: 흰 네모칸 · 흐린 글씨 · 검은 입력칸 · 자리 잘못 잡은 패널 · 목록 정돈 ===== */

/* 1) 지금 어두운 화면인지 html.dk 로 표시 (화면 설정이 바뀌면 따라감) */
(function(){var R=document.documentElement,mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
  function set(){var t=R.getAttribute('data-theme');R.classList.toggle('dk',t==='dark'||(t!=='light'&&!!(mq&&mq.matches)));}
  set();if(mq){try{mq.addEventListener('change',set);}catch(e){mq.addListener&&mq.addListener(set);}}
  try{new MutationObserver(set).observe(R,{attributes:true,attributeFilter:['data-theme']});}catch(e){}})();

(function(){var st=document.createElement('style');st.textContent=[
 /* 정의 안 된 색 변수 때문에 흰색으로 떨어지던 카드 · 흐린 회색 글씨 */
 '.dk{--card:#14304A;--mut:var(--sub);--muted:var(--sub)}',
 /* 입력칸 · 선택칸: 따로 꾸미지 않은 것도 화면 색에 맞춤 (우선순위 0이라 기존 꾸밈이 이김) */
 ':where(input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]):not([type=submit]):not([type=button]),select,textarea){background-color:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:12px}',
 ':where(input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]),select){min-height:40px;padding:0 12px;font:inherit}',
 '.dk :where(input,select,textarea)::placeholder{color:var(--sub);opacity:.75}',
 '.dk select{color-scheme:dark}',
 /* 체크박스: 기기마다 검은 네모로 보이던 것을 사이트 색으로 */
 'input[type=checkbox]:not([class]):not(.i6tg input):not([role=switch]){-webkit-appearance:none;appearance:none;flex:none;width:22px;height:22px;margin:0 2px;border:2px solid var(--line);border-radius:7px;background:var(--panel) center/14px 14px no-repeat;vertical-align:middle;cursor:pointer;transition:background-color .15s,border-color .15s}',
 'input[type=checkbox]:not([class]):not(.i6tg input):not([role=switch]):checked{background-color:var(--sea);border-color:var(--sea);background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2306202E%27 stroke-width=%273.2%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M5 12.5l4.5 4.5L19 7.5%27/%3E%3C/svg%3E")}',
 'input[type=checkbox]:not([class]):not(.i6tg input):not([role=switch]):focus-visible{outline:2px solid var(--sea);outline-offset:2px}',
 'input[type=radio]{accent-color:var(--sea)}',
 /* 종목 꼬리표: 연한 바탕 + 흐린 글씨 → 어두운 화면용 색, 줄 전체로 늘어나지 않게 */
 '.ktag{width:auto!important;align-self:flex-start;white-space:nowrap}',
 '.ktag.scuba{color:#0a5c8a!important}.ktag.free{color:#0f766e!important}.ktag.club{color:#5b21b6!important}',
 '.dk .ktag.scuba{background:rgba(56,189,248,.16)!important;color:#7DD3FC!important}',
 '.dk .ktag.free{background:rgba(45,212,191,.16)!important;color:#5EEAD4!important}',
 '.dk .ktag.club{background:rgba(167,139,250,.18)!important;color:#C4B5FD!important}',
 /* 파도 · 바다 상태 칸, 점검 아이콘 */
 '.dk .seav.g,.dk .wk7 div{background:rgba(127,214,163,.13);color:#9BE3B8}',
 '.dk .seav.m,.dk .wk7 div.m{background:rgba(253,176,34,.14);color:#FCD34D}',
 '.dk .seav.b,.dk .wk7 div.b{background:rgba(248,113,113,.15);color:#FCA5A5}',
 '.dk .rm-fly{background:rgba(253,176,34,.10);border-color:rgba(253,176,34,.5)}',
 '.dk .chk .ic.ok{background:rgba(127,214,163,.15);color:#9BE3B8}.dk .chk .ic.no{background:rgba(248,113,113,.15);color:#FCA5A5}',
 '.dk .sc129c{color:var(--ink)}',
 /* 지도 위 버튼 · 확대 버튼 · 숫자 묶음 */
 '.dk .leaflet-bar a,.dk .leaflet-bar a:hover{background:var(--panel);color:var(--ink);border-color:var(--line)}',
 '.dk .leaflet-bar{border-color:var(--line)!important}',
 '.marker-cluster div,.marker-cluster span{color:#10202C!important;font-weight:700}',
 '.dk .mxt button{background:rgba(14,34,50,.92);color:var(--ink);border-color:var(--line)}',
 '.dk .mxt button[aria-pressed=true]{background:var(--sea);color:var(--sea-ink);border-color:var(--sea)}',
 '.dk .mxfly{background:var(--soft);color:var(--sea);border-color:var(--line)}',
 /* 지도 아래 범례: 한 줄로, 설명은 범례 끝에 붙임 */
 '#mapLg{display:flex;flex-wrap:nowrap;gap:12px;overflow-x:auto;scrollbar-width:none;font-size:12.5px;padding:2px 0}#mapLg::-webkit-scrollbar{display:none}#mapLg>span{flex:none;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}',
 '#mapLg .lg137{color:var(--sub);font-weight:500}',
 '.mxnote[data-moved137]{display:none!important}',
 /* 기록 가져오기: 기기별 안내 버튼을 줄 목록으로 */
 '.dgimp .dgg{display:flex!important;flex-direction:column;gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:6px}',
 '.dgimp .dgg button{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between;gap:10px;width:100%;min-height:48px;padding:10px 14px;border:0!important;border-radius:0!important;border-top:1px solid var(--line)!important;background:transparent!important;color:var(--ink);text-align:left;font:inherit;cursor:pointer}',
 '.dgimp .dgg button:first-child{border-top:0!important}',
 '.dgimp .dgg button b{font-size:14.5px;flex:none}',
 '.dgimp .dgg button small{flex:1;min-width:0;text-align:right;font-size:12.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '.dgimp .dgg button:after{content:"›";color:var(--sub);font-size:18px;flex:none}',
 '.dgimp .dgg button:active{background:var(--soft)!important}',
 /* 모임 목록 한 줄: 꼬리표는 한 줄에, 정보 줄은 줄바꿈 */
 'a.item .tx>span:first-child{display:flex;flex-wrap:wrap;gap:4px;align-items:center}a.item .tx>span:first-child .tag,a.item .tx>span:first-child .ktag{margin:0!important}',
 'a.item .tx{gap:3px}a.item .tx>span:last-child{white-space:normal;word-break:keep-all}',
 '.m4i .m4d{align-self:center}',
 /* 정산 금액칸 */
 '#stFee{width:150px!important;height:40px}'
].join('');document.head.appendChild(st);})();

/* 2) 목록 · 패널 자리 정리 */
function tidy137(){var v=document.querySelector('#main .view');if(!v)return;
  /* 아래 바닥글보다 뒤에 붙은 패널은 바닥글 앞으로 */
  var f=v.querySelector(':scope > .foot, .foot');if(f&&f.parentNode){var n=f.nextElementSibling,mv=[];while(n){if(n.classList&&(n.classList.contains('panel')||n.querySelector&&n.querySelector('.panel')))mv.push(n);n=n.nextElementSibling;}mv.forEach(function(p){f.parentNode.insertBefore(p,f);});}
  /* 종목 꼬리표 · 참가 가능 표시는 위쪽 꼬리표 줄로 */
  [].forEach.call(v.querySelectorAll('a.item .tx'),function(t){var row=t.firstElementChild;if(!row||row.tagName!=='SPAN'||!row.querySelector('.tag'))return;[].forEach.call(t.querySelectorAll(':scope > .ktag, :scope > .fitb'),function(k){row.appendChild(k);});});
  /* 지도 범례 설명 문구는 범례 끝으로 */
  var lg=document.getElementById('mapLg'),nt=v.querySelector('.mxnote');if(lg&&nt&&!nt.dataset.moved137&&/숫자 묶음|Numbered/.test(nt.textContent)){var s=document.createElement('span');s.className='lg137';s.textContent=(typeof LANG!=='undefined'&&LANG==='en')?'Numbers = dive centers':'숫자 묶음 = 다이빙 센터';if(!lg.querySelector('.lg137'))lg.appendChild(s);nt.dataset.moved137=1;}
}
var _after137=after;after=function(){_after137();try{tidy137();}catch(e){}setTimeout(function(){try{tidy137();}catch(e){}},700);};
/* 목록을 나중에 다시 채우는 화면도 있어서 한 번 더 */
document.addEventListener('click',function(e){if(e.target.closest('.chip,[data-mtab],[data-m4],button'))setTimeout(function(){try{tidy137();}catch(x){}},120);});

/* 3) 운영자 회원 목록: 날짜 · 로그 수 등 칸이 줄바꿈되지 않게 한 줄로 (표는 옆으로 밀어서 봄) */
amT=function(s){if(!s)return '—';var d=new Date(s);if(isNaN(d))return '—';var p=function(n){return (n<10?'0':'')+n;};return (d.getFullYear()!==new Date().getFullYear()?String(d.getFullYear()).slice(2)+'.':'')+(d.getMonth()+1)+'.'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes());};
(function(){var st=document.createElement('style');st.textContent='#main .ai table[style*="min-width:1100px"]{min-width:0!important;width:max-content;border-collapse:collapse}#main .ai table[style*="min-width:1100px"] th,#main .ai table[style*="min-width:1100px"] td{white-space:nowrap;padding:10px 12px 10px 0;vertical-align:top;font-variant-numeric:tabular-nums}#main .ai table[style*="min-width:1100px"] td[style*="max-width:180px"]{white-space:normal;min-width:160px}#main .ai table[style*="min-width:1100px"] td:last-child,#main .ai table[style*="min-width:1100px"] th:last-child{text-align:right;padding-right:4px}';document.head.appendChild(st);})();

/* 4) 홈 위 홍보 배너에 승인된 '홈' 광고도 함께 돌리기 (맨 앞, '광고' 표시) */
function adHomeList137(){if(typeof state==='undefined'||!state.ads)return [];var mo=new Date().getMonth()+1;return state.ads.filter(function(a){var P=a.placement||['list'];if(P.indexOf('home')<0)return false;if(a.kind&&a.kind!=='all'&&typeof DM!=='undefined'&&DM!=='all'&&a.kind!==DM)return false;if(a.months&&a.months.length&&a.months.indexOf(mo)<0)return false;return true;});}
if(typeof promoHtml128==='function'&&typeof PROMO128==='object'){
  var _prH137=promoHtml128;
  promoHtml128=function(){
    for(var i=PROMO128.length-1;i>=0;i--)if(PROMO128[i].ad137)PROMO128.splice(i,1);
    try{if(typeof adsLoad==='function')adsLoad();}catch(e){}
    var A=adHomeList137(),BG=['linear-gradient(135deg,#1b2f5e 0%,#2f6aa3 58%,#7cc0e8 125%)','linear-gradient(135deg,#3b1f5e 0%,#6a3fa0 58%,#b59ae8 125%)'];
    A.forEach(function(a,k){var t=String(a.title||''),cut=t.lastIndexOf(', ');PROMO128.splice(k,0,{id:'ad'+a.id,ad137:a,n:cut>0?t.slice(cut+2):t,area:cut>0?t.slice(0,cut):(a.region||'전 지역'),kind:'스폰서',line:a.title_b||'',bg:BG[k%BG.length]});});
    var h=_prH137();if(!A.length)return h;
    var d=document.createElement('div');d.innerHTML=h;
    [].forEach.call(d.querySelectorAll('.prs[data-promo^="ad"]'),function(b){var p=PROMO128.filter(function(x){return x.id===b.dataset.promo;})[0];if(!p||!p.ad137)return;var a=p.ad137,inner=a.business_id,href=inner?'#biz-d'+a.business_id:a.link;
      var el=document.createElement('a');[].forEach.call(b.attributes,function(at){if(at.name!=='type'&&at.name!=='data-promo')el.setAttribute(at.name,at.value);});el.setAttribute('href',href);el.setAttribute('data-adclick',a.id);if(!inner){el.target='_blank';el.rel='noopener sponsored';}el.setAttribute('aria-label',(p.n||'')+' 광고');el.innerHTML=b.innerHTML;var tg=el.querySelector('.prtag');if(tg)tg.textContent='광고';if(!p.line){var l=el.querySelector('.prl');if(l)l.remove();}
      b.replaceWith(el);
      adSlot.shown=adSlot.shown||{};if(!adSlot.shown[a.id+'home']){adSlot.shown[a.id+'home']=1;try{BE.sb.rpc('ad_hit',{aid:a.id,is_click:false}).then(function(){});}catch(e){}}});
    return d.innerHTML;};
  /* 광고 목록이 늦게 도착하면 배너를 한 번 다시 그림 */
  if(typeof adPaintAll==='function'){var _apa137=adPaintAll;adPaintAll=function(){_apa137.apply(this,arguments);if(cur()==='home'&&adHomeList137().length&&document.getElementById('prHome')&&!document.querySelector('#prHome [data-adclick]'))rerender();};}
}
(function(){var st=document.createElement('style');st.textContent='a.prs{text-decoration:none;color:#fff}';document.head.appendChild(st);})();

/* 5) 내 정보 순서: 나 → 자격 · 사람 → 강사 도구 → 내 활동 → 안전 · 화면 설정 → 안내 */
var PFORD137=[
 function(v){return v.querySelector(':scope > #miAsk');},
 function(v){return v.querySelector(':scope > .kvp');},
 function(v){return [].filter.call(v.querySelectorAll(':scope > .cols'),function(c){return /바로가기|Shortcuts/.test(c.textContent);})[0];},
 function(v){return pfH137(v,/^(운영자 콘솔|Admin console)/);},
 function(v){return v.querySelector(':scope > #cc2');},
 function(v){return v.querySelector(':scope > #lkPanel');},
 function(v){return v.querySelector(':scope > #insPanel');},
 function(v){return v.querySelector(':scope > #myDivers');},
 function(v){var a=document.getElementById('actBox');if(a&&v.contains(a)){var r=a.querySelector('#rankBox'),d=a.querySelector(':scope > .dci');if(r&&d&&d.nextElementSibling!==r)d.after(r);}return a&&v.contains(a)?a:null;},
 function(v){return v.querySelector(':scope > #myCert');},
 function(v){return pfH137(v,/^(예약|Bookings)/);},
 function(v){return pfH137(v,/^(저장한 포인트|Saved spots)/);},
 function(v){return pfH137(v,/^(내가 등록한 것|My listings)/);},
 function(v){return v.querySelector(':scope > #safePanel');},
 function(v){return v.querySelector(':scope > #thmBox');},
 function(v){return v.querySelector(':scope > #fzBox');},
 function(v){return v.querySelector(':scope > #tidyTop');}];
function pfH137(v,re){return [].filter.call(v.children,function(c){var h=c.querySelector&&c.querySelector(':scope > h2, :scope > .fhd h2, :scope > div > h2, :scope > div:first-child > b:first-child');return h&&re.test(h.textContent.trim());})[0];}
function pfOrder137(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var at=v.querySelector(':scope > .vh');if(!at)return;
  PFORD137.forEach(function(f){var el;try{el=f(v);}catch(e){el=null;}if(!el||el===at)return;if(at.nextElementSibling!==el)at.after(el);at=el;});}
var _after137p=after;after=function(){_after137p();if(cur()==='profile'){pfOrder137();[300,900,1800,3500].forEach(function(ms){setTimeout(pfOrder137,ms);});}};
/* 예전 순서 정리(127)가 뒤늦게 다른 순서로 되돌리지 않게 같은 규칙을 쓰게 함 */
if(typeof order127==='function')order127=pfOrder137;

/* 6) 내 정보 요약 카드 · 바로가기: 여백 줄이고 한눈에 */
(function(){var st=document.createElement('style');st.textContent=[
 '.pfsum137{gap:10px!important}',
 '.pfsum137>.panel:first-child{padding:14px!important}',
 '.pfsum137>.panel:first-child>.item{padding:0!important;gap:12px;min-height:0}',
 '.pfsum137>.panel:first-child .av{width:44px!important;height:44px!important;flex:none}',
 '.pfsum137>.panel:first-child .tx b{font-size:16px!important}.pfsum137>.panel:first-child .tx span{font-size:12.5px}',
 '.pfsum137 .stats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px!important;margin-top:12px!important}',
 '.pfsum137 .stat{padding:8px 4px!important;min-height:0!important;text-align:center;border-radius:12px;display:flex;flex-direction:column-reverse;gap:1px;align-items:center}',
 '.pfsum137 .stat b{font-size:17px!important;line-height:1.2}.pfsum137 .stat small{font-size:11px!important;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}',
 '.pfsum137>.panel:last-child{padding:14px!important}',
 '.pfsum137>.panel:last-child .list{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}',
 '.pfsum137>.panel:last-child .list>a.item{flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:52px!important;padding:8px 4px!important;border:1px solid var(--line)!important;border-radius:12px;background:var(--soft)}',
 '.pfsum137>.panel:last-child .list>a.item .tx{align-items:center}.pfsum137>.panel:last-child .list>a.item .tx b{font-size:13.5px}.pfsum137>.panel:last-child .list>a.item .tx span{display:none}',
 '.pfsum137>.panel:last-child .list>a.item:after{display:none!important}',
 '.pfsum137>.panel:last-child h2.fhd{margin-bottom:8px}',
 '.pfnolo137{display:none!important}',
 '#actBox .dci{padding:10px 12px!important;gap:12px!important}#actBox .dci .sc{font-size:30px!important;line-height:1}',
 '#actBox>.list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:10px}',
 '#actBox>.list>.item{min-height:0!important;padding:8px 10px!important;border:1px solid var(--line)!important;border-radius:12px;gap:6px;align-items:center}',
 '#actBox>.list>.item .tx b{font-size:13px}#actBox>.list>.item .tx span{font-size:11.5px}#actBox>.list>.item .rt{font-size:12.5px;white-space:nowrap}',
 '#actBox #rankBox{margin:12px 0 4px;padding-bottom:12px;border-bottom:1px solid var(--line)}#rankBox{margin-top:12px}#rankBox .item,#rankBox>div>div{min-height:0}'
].join('');document.head.appendChild(st);})();
function pfCompact137(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;
  [].forEach.call(v.querySelectorAll(':scope > .cols'),function(c){if(c.querySelector('.stats'))c.classList.add('pfsum137');});
  /* 위 머리말에 로그아웃이 있으니 프로필 칸 안의 같은 버튼은 숨김 */
  /* 로그아웃은 위 머리말 하나 + 맨 아래 하나만 */
  var L=[].filter.call(v.querySelectorAll('button,a'),function(b){return /^(로그아웃|Log out)$/.test(b.textContent.trim());}),keepBot=document.getElementById('loBot')||L.filter(function(b){return !b.closest('.vh')&&!b.closest('.kvp');}).pop();
  L.forEach(function(b){b.classList.toggle('pfnolo137',!(b.closest('.vh')||b===keepBot));});}
var _po137=pfOrder137;pfOrder137=function(){_po137();try{pfCompact137();}catch(e){}};if(typeof order127==='function')order127=pfOrder137;

/* 7) 내 정보 묶기: 저장한 포인트 → 내가 등록한 것 / 강사 도장 → 강사 칸 / 화면 밝기 · 글자 크기 → 설정 · 안내 */
(function(){var st=document.createElement('style');st.textContent='.sub137{border:0!important;border-top:1px solid var(--line)!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;padding:14px 0 0!important;margin:14px 0 0!important}.sub137>h2,.sub137>.fhd{font-size:15px!important;margin-bottom:8px!important}.sub137 .foldbtn{display:none!important}.panel.fold .sub137{display:none!important}';document.head.appendChild(st);})();
function pfMerge137(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;
  var put=function(el,box){if(!el||!box||el===box||box.contains(el))return;el.classList.add('sub137');el.classList.remove('fold');box.appendChild(el);};
  put(pfH137(v,/^(저장한 포인트|Saved spots)/),pfH137(v,/^(내가 등록한 것|My listings)/));
  put(document.getElementById('stLink'),document.getElementById('insPanel'));
  var tt=document.getElementById('tidyTop');tt=tt&&(tt.classList.contains('panel')?tt:(tt.querySelector(':scope > .panel')||tt));put(document.getElementById('thmBox'),tt);put(document.getElementById('fzBox'),tt);
  if(tt&&document.getElementById('thmBox')&&tt.contains(document.getElementById('thmBox')))[].forEach.call(tt.querySelectorAll('.chip,button'),function(b){if(/^(화면 밝기|Theme)$/.test(b.textContent.trim())&&!b.closest('#thmBox'))b.classList.add('pfnolo137');});}
var _po137b=pfOrder137;pfOrder137=function(){_po137b();try{pfMerge137();}catch(e){}};if(typeof order127==='function')order127=pfOrder137;

/* 8) '내 바다 카드' 버튼은 내 프로필 칸의 '계정 관리' 왼쪽으로 */
function pfCard137(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var k=v.querySelector(':scope > .kvp');if(!k)return;
  var c=[].filter.call(v.querySelectorAll('a,button'),function(b){return /^(내 바다 카드|My sea cards?)$/.test(b.textContent.trim())&&!k.contains(b);})[0];if(!c)return;
  var acc=[].filter.call(k.querySelectorAll('a,button'),function(b){return /^(계정 관리|Account)$/.test(b.textContent.trim());})[0];
  var box=acc?acc.parentNode:k.querySelector('.fright');if(!box)return;c.classList.add('chip','pfcard137');if(acc)box.insertBefore(c,acc);else box.insertBefore(c,box.firstChild);}
(function(){var st=document.createElement('style');st.textContent='.pfcard137{margin:0!important;white-space:nowrap}';document.head.appendChild(st);})();
var _po137c=pfOrder137;pfOrder137=function(){_po137c();try{pfCard137();}catch(e){}};if(typeof order127==='function')order127=pfOrder137;

/* 9) 로그북 정리: 순서(기록 분석 → 내 다이빙 분석 → 최근 다이브 → 다이브 목록) · 최근 다이브 2개 · 같은 날 여러 번은 최근 다이브 안 · 요약 카드에 올해 · 배지 축소 · 다녀온 바다 숨김 */
(function(){var st=document.createElement('style');st.textContent=[
 '.lgs137{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;padding:14px!important}',
 '.lgs137>.stat{padding:8px 6px!important;min-height:0!important;text-align:center;display:flex;flex-direction:column-reverse;align-items:center;gap:1px}',
 '.lgs137>.stat b{font-size:17px!important;line-height:1.2}.lgs137>.stat small{font-size:11px!important;color:var(--sub);white-space:nowrap}',
 '.lgs137>.stat.yr137{display:none!important}',
 '.lgx137{grid-column:1/-1;border-top:1px solid var(--line);margin-top:6px;padding-top:10px;display:flex;flex-direction:column;gap:8px}',
 '.lgx137 .lgh{display:flex;justify-content:space-between;align-items:baseline;font-size:12.5px;color:var(--sub)}.lgx137 .lgh b{font-size:13.5px;color:var(--ink)}',
 '.lgx137 .stats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:none!important}',
 '.lgx137 .stats .stat{padding:7px 4px!important;min-height:0!important;text-align:center;display:flex;flex-direction:column-reverse;align-items:center;gap:1px}',
 '.lgx137 .stats .stat b{font-size:15px!important;line-height:1.2;white-space:nowrap}.lgx137 .stats .stat small{font-size:10.5px!important;color:var(--sub);white-space:nowrap}',
 '.lgx137 .trm2{margin:0!important;font-size:12.5px;color:var(--sub)}.lgx137 .trm2 b{color:var(--ink);font-weight:700;margin-right:4px}',
 '.lgx137 .bdg{display:flex!important;flex-wrap:nowrap!important;gap:6px!important;overflow-x:auto;scrollbar-width:none;margin:0!important}.lgx137 .bdg::-webkit-scrollbar{display:none}',
 '.lgx137 .bdg i{flex:none;width:38px!important;height:38px!important;min-width:0!important;font-size:9px!important;border-width:1.5px!important;line-height:1.05}.lgx137 .bdg i b{font-size:12px!important}',
 '.lgx137 .bdgn{margin:0!important;font-size:12px!important;color:var(--sub)}',
 '.lgr137 .list>.item:nth-child(n+3){display:none!important}'
].join('');document.head.appendChild(st);})();
function logTidy137(){if(cur()!=='log')return;var v=document.querySelector('#main .view');if(!v)return;
  var S=v.querySelector(':scope > .stats');
  /* 순서 */
  var rec=pfH137(v,/^(최근 다이브|Recent dive)/);
  var lb=document.getElementById('lbBox');if(lb&&lb.parentNode===v){var L=[document.getElementById('lxBox'),document.getElementById('anBox'),rec].filter(function(x){return x&&x.parentNode===v;});var ok=L.every(function(x,i){return x.nextElementSibling===(i<L.length-1?L[i+1]:lb);});if(!ok)L.forEach(function(x){lb.before(x);});}
  /* 최근 다이브: 2개만 · 같은 날 여러 번은 안으로 */
  if(rec){rec.classList.add('lgr137');var sd=[].filter.call(v.querySelectorAll('.panel'),function(p){var h=p.querySelector(':scope > h2');return h&&/^(같은 날 여러 번|Multiple dives)/.test(h.textContent.trim())&&!rec.contains(p);})[0];if(sd){sd.classList.add('sub137');rec.appendChild(sd);}}
  /* 다녀온 바다: 로그북에서는 숨김 (로그를 쓰면 지도에 자동으로 들어가요) */
  [].forEach.call(v.querySelectorAll('.panel'),function(p){var h=p.querySelector(':scope > h2');if(h&&/^(다녀온 바다|Seas visited)/.test(h.textContent.trim()))p.classList.add('pfnolo137');});
  var sm=v.querySelector('details.lbx > summary');if(sm&&/다녀온 바다/.test(sm.textContent))sm.textContent='더 보기 · 종이 로그북';
  /* 요약 카드 안에 올해 · 배지 */
  if(!S)return;S.classList.add('lgs137');[].forEach.call(S.querySelectorAll(':scope > .stat'),function(s){var k=s.querySelector('small');if(k&&/^\d{4}년$/.test(k.textContent.trim()))s.classList.add('yr137');});
  var bb=document.getElementById('bdgBox');if(!bb)return;
  var yp=[].filter.call(bb.querySelectorAll('.panel'),function(p){var h=p.querySelector(':scope > h2');return h&&/돌아보기|in review/.test(h.textContent);})[0],bp=[].filter.call(bb.querySelectorAll('.panel'),function(p){return p.querySelector(':scope > .bdg');})[0];
  var yHas=yp&&yp.querySelector(':scope > .stats'),bHas=bp&&bp.querySelector(':scope > .bdg');if(!yHas&&!bHas)return;var w=S.querySelector(':scope > .lgx137');if(!w){w=document.createElement('div');w.className='lgx137';S.appendChild(w);}w.innerHTML='';
  if(yp){var ys=yp.querySelector(':scope > .stats'),h2=yp.querySelector(':scope > h2'),hd=document.createElement('div');hd.className='lgh';hd.innerHTML='<b></b>';hd.firstChild.textContent=h2?h2.firstChild.textContent.trim():'';w.appendChild(hd);if(ys)w.appendChild(ys);[].forEach.call(yp.querySelectorAll(':scope > p.trm2'),function(p){w.appendChild(p);});yp.classList.add('pfnolo137');}
  if(bp){var bd=bp.querySelector(':scope > .bdg'),nt=bp.querySelector(':scope > p'),hd2=document.createElement('div');hd2.className='lgh';hd2.innerHTML='<b>로그 배지</b>';if(nt){nt.classList.add('bdgn');var sp=document.createElement('span');sp.textContent=nt.textContent;hd2.appendChild(sp);}w.appendChild(hd2);if(bd)w.appendChild(bd);bp.classList.add('pfnolo137');}}
var _after137l=after;after=function(){_after137l();if(cur()==='log'){logTidy137();[300,900,1800,3500].forEach(function(ms){setTimeout(logTidy137,ms);});var v=document.querySelector('#main .view');if(v&&!v._lg137&&window.MutationObserver){var t=0;v._lg137=new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){if(cur()==='log')logTidy137();},120);});v._lg137.observe(v,{childList:true});}}};
document.addEventListener('toggle',function(e){if(cur()==='log'&&e.target.matches&&e.target.matches('details'))setTimeout(logTidy137,50);},true);

/* 10) 지도: 검색칸 줄에 '조건' 버튼 · 목록 위 거르기 칸 한 줄 */
(function(){var st=document.createElement('style');st.textContent=[
 '#mapFind.f137{grid-template-columns:minmax(0,1fr) auto auto!important;align-items:end}#mapFind.f137>span:empty{display:none}',
 '#mapFind .mfc137{height:44px;padding:0 14px;white-space:nowrap}#mapFind .mfc137[aria-expanded=true]{background:var(--soft);border-color:var(--sea)}',
 'details.mfmore.f137>summary{display:none!important}details.mfmore.f137{margin:0}',
 '.mxbar{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none;gap:6px!important}.mxbar::-webkit-scrollbar{display:none}',
 '.mxbar>*{flex:none}.mxbar .mxsel>span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
 '.mxbar .mxsel select{height:34px!important;font-size:12.5px!important;padding:0 24px 0 10px!important;min-height:0!important;width:auto!important;min-width:0!important}',
 '.mxbar .mxck{min-height:34px!important;height:34px;padding:0 10px!important;font-size:13px;gap:6px}.mxbar .mxck input{width:18px!important;height:18px!important}',
 '.mxbar .mxcnt{display:none!important}'
].join('');document.head.appendChild(st);})();
function mapTidy137(){if(cur()!=='map')return;var f=document.getElementById('mapFind'),d=document.querySelector('#main details.mfmore');
  if(f&&d&&!f.querySelector('.mfc137')){var sb=f.querySelector('button[type=submit]');var b=document.createElement('button');b.type='button';b.className='btn btn-line mfc137';b.textContent=(typeof LANG!=='undefined'&&LANG==='en')?'Filters':'조건';b.setAttribute('aria-expanded',d.open?'true':'false');b.onclick=function(){d.open=!d.open;b.setAttribute('aria-expanded',d.open?'true':'false');};if(sb)f.insertBefore(b,sb);else f.appendChild(b);f.classList.add('f137');d.classList.add('f137');f.style.gridTemplateColumns='';}
  var mo=document.getElementById('mxMo');if(mo)[].forEach.call(mo.options,function(o){o.textContent=o.textContent.replace(' (이번 달)','').replace(/^아무 때나$/,'모든 달');});var s=document.getElementById('mxSort');if(s)[].forEach.call(s.options,function(o){if(/나라 · 도시 · 이름순/.test(o.textContent))o.textContent='이름순';if(/^가까운 순$/.test(o.textContent))o.textContent='가까운순';});
  var ck=document.querySelector('.mxbar .mxck');if(ck){[].forEach.call(ck.childNodes,function(n){if(n.nodeType===3&&/지도에 보이는 곳만/.test(n.textContent))n.textContent=' 보이는 곳';});}}
var _after137m=after;after=function(){_after137m();if(cur()==='map'){mapTidy137();[400,1200,2500].forEach(function(ms){setTimeout(mapTidy137,ms);});}};

/* 11) 내 정보 바로가기: 글자를 칸 가운데로 */
(function(){var st=document.createElement('style');st.textContent='.pfsum137>.panel:last-child .list>a.item{justify-content:center!important;align-items:center!important;padding:0 6px!important;height:48px;min-height:48px!important}.pfsum137>.panel:last-child .list>a.item .tx{flex:none!important;margin:0!important;padding:0!important;display:flex;justify-content:center;align-items:center;width:100%}.pfsum137>.panel:last-child .list>a.item .tx b{margin:0!important;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';document.head.appendChild(st);})();
