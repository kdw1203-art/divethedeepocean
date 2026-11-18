/* ===== 4차 개선 ===== */
/* 1) 빠른 연결: 자주 쓰는 서버에 미리 연결 */
(function(){var B=(window.DTDO_BACKEND&&window.DTDO_BACKEND.url)||'https://crasesnlwwyegdgzkqes.supabase.co';[B,'https://cdn.jsdelivr.net','https://api.open-meteo.com','https://marine-api.open-meteo.com'].forEach(function(h){if(document.querySelector('link[rel=preconnect][href="'+h+'"]'))return;var l=document.createElement('link');l.rel='preconnect';l.href=h;l.crossOrigin='anonymous';document.head.appendChild(l);});})();
/* 2) 화면별 설명(검색 · 공유 미리보기) */
var DESC94={home:'스쿠버·프리다이빙 로그북, 포인트 날씨, 해양생물, 리조트를 한 곳에서.',log:'다이브 컴퓨터 기록을 올려 로그북을 만들어요.',logimport:'Shearwater · Garmin · Apple Watch · Suunto 기록 가져오기.',logstats:'내 다이빙 통계: 수심, 시간, 포인트, 기기.',map:'전 세계 다이빙 포인트 지도와 바다 예보.',resorts:'다이빙 리조트·센터 찾기와 견적 요청.',pools:'국내 다이빙 풀·수영장 정보와 비용.',edu:'자격증 단계, 교육 단체, 강사 찾기.',trip:'다이빙 여행 경비와 준비물.',life:'해양생물 도감: 이름·사진·사는 바다.',community:'다이빙 모임, 클럽, 구인구직.',safety:'다이빙 안전 수칙과 응급 연락처.',tools:'다이빙 계산기: 나이트록스, 감압, 공기 소모.',photofix:'수중 사진 색 보정: 카메라별 자동 보정.',partner:'다이빙 업체 무료 입점과 광고.',gear:'장비 정비 알림과 중고 거래.'};
var _setTitle94=setTitle;setTitle=function(t,d){_setTitle94(t,d||DESC94[cur()]||'');var og=document.querySelector('meta[property="og:title"]');if(og)og.setAttribute('content',document.title);};
/* 3) 가입 직후 환영 안내 (처음 할 일 3가지) */
var _sub94=BE.on?BE.submit:null;if(BE.on){BE.submit=function(id,v){var p=_sub94(id,v);if(id==='signup'&&p&&p.then)p.then(function(r){if(r==='profile')setTimeout(welcome94,900);return r;},function(){});return p;};}
function welcome94(){if(!BE.user)return;try{if(localStorage.getItem('dtdo.welcomed'))return;localStorage.setItem('dtdo.welcomed','1');}catch(e){}
  sheet('<h2 style="margin:0 0 6px">환영해요 🌊</h2><p class="small" style="margin:0 0 14px">이것부터 해 보세요.</p><div class="list">'+
   '<a class="item" href="#logimport" onclick="closeSheet()"><span class="tx"><b>1. 다이브 기록 가져오기</b><span>다이브 컴퓨터 파일을 올리면 로그북이 생겨요</span></span></a>'+
   '<a class="item" href="#map" onclick="closeSheet()"><span class="tx"><b>2. 다녀온 바다 표시</b><span>지도에서 다녀온 포인트를 찍어요</span></span></a>'+
   '<a class="item" href="#community" onclick="closeSheet()"><span class="tx"><b>3. 모임 둘러보기</b><span>같이 갈 버디를 찾아요</span></span></a></div><div style="margin-top:14px;text-align:right"><button class="btn btn-line" type="button" onclick="closeSheet()">나중에</button></div>');}
/* 4) 홈 인사: 로그인한 회원 닉네임 + 마지막 다이브 */
function hello94(){if(cur()!=='home'||!BE.on||!BE.user||document.getElementById('hello94'))return;var vh=document.querySelector('#main .view > .vh');if(!vh)return;var nick=(state.me&&state.me.nick)||'';if(!nick)return;
  var L=state.userLogs||[],last=L.map(function(l){return l.date;}).filter(Boolean).sort().pop(),days=last?Math.floor((Date.now()-new Date(last))/864e5):null;
  var p=document.createElement('p');p.id='hello94';p.className='hello94';p.innerHTML='<b>'+esc(nick)+'</b> 님'+(days!=null?(days<=0?' · 오늘 다이빙했어요':' · 마지막 다이브 '+days+'일 전'):' · 첫 로그를 남겨 보세요');var h1=vh.querySelector('h1');(h1||vh).before(p);}
/* 5) 최근 검색어 (위쪽 통합 검색) */
function rsGet(){try{return JSON.parse(localStorage.getItem('dtdo.recentQ')||'[]');}catch(e){return [];}}
function rsAdd(q){q=String(q||'').trim();if(q.length<1)return;var L=rsGet().filter(function(x){return x!==q;});L.unshift(q);try{localStorage.setItem('dtdo.recentQ',JSON.stringify(L.slice(0,6)));}catch(x){}}
function rsShow(){var g=document.getElementById('gq'),r=document.getElementById('gres');if(!g||!r||g.value.trim())return;var L=rsGet();if(!L.length)return;r.innerHTML='<div class="rsbox"><span class="small">최근 검색</span>'+L.map(function(q){return '<button class="chip" type="button" data-rsq="'+esc(q)+'">'+esc(q)+'</button>';}).join('')+'<button class="rsx" type="button" data-rsclr>지우기</button></div>';r.classList.add('open');}
document.addEventListener('focusin',function(e){if(e.target.id==='gq')setTimeout(rsShow,30);});
document.addEventListener('input',function(e){if(e.target.id==='gq'&&!e.target.value.trim())setTimeout(rsShow,30);});
document.addEventListener('mousedown',function(e){var a=e.target.closest('#gres a');if(a){var g=document.getElementById('gq');if(g)rsAdd(g.value);}},true);
document.addEventListener('keydown',function(e){if(e.target.id==='gq'&&e.key==='Enter'&&!e.isComposing)rsAdd(e.target.value);},true);
document.addEventListener('click',function(e){var c=e.target.closest('[data-rsq]');if(c){e.preventDefault();var g=document.getElementById('gq');if(g){g.value=c.dataset.rsq;g.dispatchEvent(new Event('input'));g.focus();}}if(e.target.closest('[data-rsclr]')){e.preventDefault();try{localStorage.removeItem('dtdo.recentQ');}catch(x){}var r=document.getElementById('gres');if(r){r.classList.remove('open');r.innerHTML='';}}},true);
function rsPaint(){}
/* 6) 휴대폰 뒤로가기: 열린 창(시트)부터 닫기 */
(function(){var _sheet94=sheet,opening=0;sheet=function(h){opening=1;try{_sheet94(h);}finally{opening=0;}try{if(!history.state||!history.state.sheet){history.pushState({sheet:1},'',location.href);sheet._href=location.href;}}catch(e){}};Object.keys(_sheet94).forEach(function(k){sheet[k]=_sheet94[k];});
  var _close94=closeSheet;closeSheet=function(fromPop){var had=!!document.getElementById('sheetbg');_close94();if(opening)return;if(had&&fromPop!==true){var hf=sheet._href;setTimeout(function(){if(history.state&&history.state.sheet&&location.href===hf&&!document.getElementById('sheetbg')){try{history.back();}catch(e){}}},0);}};Object.keys(_close94).forEach(function(k){closeSheet[k]=_close94[k];});
  window.addEventListener('popstate',function(){if(document.getElementById('sheetbg'))closeSheet(true);});})();
/* 7) 찾을 수 없는 페이지: 검색과 자주 가는 곳 */
function nf94(){var v=document.querySelector('#main .view');if(v&&/페이지를 찾을 수 없어요/.test((v.querySelector('h1')||{}).textContent||'')&&!document.getElementById('nf94')){var d=document.createElement('div');d.id='nf94';d.className='panel';d.innerHTML='<h2>이런 곳은 어때요</h2><div class="chips">'+[['home','홈'],['log','로그북'],['map','지도'],['resorts','리조트'],['life','해양생물'],['community','모임'],['help','고객센터']].map(function(x){return '<a class="chip" href="#'+x[0]+'" style="text-decoration:none">'+x[1]+'</a>';}).join('')+'</div>';v.appendChild(d);}}
var _r94=route;route=function(){var x=_r94.apply(this,arguments);try{nf94();}catch(e){}return x;};Object.keys(_r94).forEach(function(k){route[k]=_r94[k];});
var _after94=after;after=function(){_after94();
  hello94();setTimeout(hello94,1200);rsPaint();copyBank94();};
/* 8) 결제 화면: 계좌 · 금액 복사 버튼 */
function copyBank94(){document.querySelectorAll('#main .bank').forEach(function(b){if(b.querySelector('.cpy'))return;var acc=(b.querySelector('b')||{}).textContent;if(!acc)return;var btn=document.createElement('button');btn.type='button';btn.className='chip cpy';btn.textContent='계좌 복사';btn.onclick=function(){var t=acc.replace(/[^\d-]/g,'');(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){toast('계좌번호를 복사했어요');},function(){prompt('계좌번호',t);});};b.appendChild(document.createElement('br'));b.appendChild(btn);});}
/* 9) 키보드 사용자 초점 표시 · 움직임 줄이기 설정 존중 */
(function(){var st=document.createElement('style');st.textContent=':focus-visible{outline:3px solid color-mix(in srgb,var(--sea) 70%,transparent);outline-offset:2px;border-radius:8px}@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}'+
 '.hello94{margin:0 0 4px;font-size:14px;color:var(--muted)}.hello94 b{color:var(--ink)}.rsbox{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}.rsbox .chip{min-height:30px;padding:0 10px;font-size:13px}.rsx{background:none;border:0;color:var(--muted);font-size:12px;text-decoration:underline;cursor:pointer}.bank .cpy{margin-top:8px}';document.head.appendChild(st);})();
/* 10) 입력 중 엔터: 다음 칸으로 (가입 · 기본 정보) */
document.addEventListener('keydown',function(e){if(e.key!=='Enter'||e.isComposing)return;var t=e.target,f=t.closest&&t.closest('form[data-form="signup"],form[data-form="meminfo"]');if(!f||t.tagName!=='INPUT'||t.type==='checkbox')return;var L=[].slice.call(f.querySelectorAll('input:not([type=checkbox]):not([type=hidden]):not([data-hp]),select'));var i=L.indexOf(t);if(i>=0&&i<L.length-1){e.preventDefault();L[i+1].focus();}},true);
if(LANG==='en'){Object.assign(EN_D,{'환영해요 🌊':'Welcome 🌊','이것부터 해 보세요.':'Start here.','나중에':'Later','최근':'Recent','지우기':'Clear','이런 곳은 어때요':'Try these','계좌 복사':'Copy account','계좌번호를 복사했어요':'Copied'});}
window.closeSheet=function(){return closeSheet();};
