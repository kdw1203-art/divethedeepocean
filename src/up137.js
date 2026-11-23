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
