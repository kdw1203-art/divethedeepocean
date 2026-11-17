/* ===== 문구 짧게: 설명 문단은 첫 문장만 · 최대 2줄 · 눌러서 전체 보기 (약관 · 기준 같은 긴 글은 그대로) ===== */
SHORT.push(
 [/^Open-Meteo 해양·기상 모델 값/,'모델 예보값이에요. 실제 바다와 다를 수 있어요.'],
 [/^바람은 m\/s, 해류는 m\/s/,'단위 m/s · 화살표는 흘러가는 방향'],
 [/^기록한 값으로 계산한 참고 자료예요/,'참고용 계산이에요.'],
 [/^점 색: 파랑 스쿠버/,'숫자 묶음은 다이빙 센터예요.'],
 [/^다이브 컴퓨터 기록을 가져오거나 직접 써요/,'기록 가져오기 · 직접 쓰기'],
 [/^쌓인 로그를 한눈에 보고/,'내 다이빙 한눈에 보기'],
 [/^고른 설정은 이 기기에 저장돼서/,'설정은 이 기기에 저장돼요.']);
var LONG_ROUTES=/^(terms|privacy|refund|rules|bizrules|credits|guide|cert|logprint|sign|pub)$/;
var TRIM_SEL='.vh p,.panel > p,.panel > div > p.small,p.small,.tip,.st7 .tip';
var TRIM_SKIP='form,.sheet,[aria-live],#uddfMsg,.pfdest,.basic,.rules,table,.mc,.post,.cmt,.review,.chat,.bubble,[data-ugc],.lpcard,#certGuide details';
function firstSentence(t){var m=t.match(/^(.{6,}?[.!?])(\s|$)/);return m?m[1]:t;}
function trimCopy(){var r=cur();if(LONG_ROUTES.test(r))return;
  [].forEach.call(document.querySelectorAll('#main '+TRIM_SEL.split(',').join(',#main ')),function(p){if(p.dataset.tr||p.closest(TRIM_SKIP))return;p.dataset.tr=1;
    var t=p.textContent.replace(/\s+/g,' ').trim();if(!t)return;
    if(!p.children.length){var s=firstSentence(t);if(s.length<t.length){p.dataset.full=t;p.textContent=s;p.classList.add('trm');}}
    else p.classList.add('trm2');});
  /* 로그북 요약 줄: 조언 꼬리 떼기 */
  [].forEach.call(document.querySelectorAll('#main .lbh + p, #main .lbsum'),function(p){if(p.dataset.tr2)return;p.dataset.tr2=1;p.textContent=p.textContent.replace(/ · 오랜만이면[^·]*$/,'');});
  /* 통계 문장 목록: 첫 문장만 */
  if(r==='logstats')[].forEach.call(document.querySelectorAll('#main .panel ul li'),function(li){if(li.dataset.tr||li.children.length)return;li.dataset.tr=1;var t=li.textContent.trim(),s=firstSentence(t);if(s.length<t.length){li.dataset.full=t;li.textContent=s;li.classList.add('trm');}});}
(function(){var st=document.createElement('style');st.textContent='#main .trm,#main .trm2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#main .trm[data-full]{cursor:pointer}#main .lcard p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#main .trm.open,#main .trm2.open{-webkit-line-clamp:unset;display:block}';document.head.appendChild(st);})();
document.addEventListener('click',function(e){var p=e.target.closest&&e.target.closest('#main .trm[data-full]');if(!p||e.target.closest('a,button'))return;var o=p.classList.toggle('open'),f=p.dataset.full;p.dataset.full=p.textContent;p.textContent=f;});
var _after80=after;after=function(){_after80();setTimeout(function(){shortTexts();trimCopy();},0);};
if(window.MutationObserver){var _tr80;new MutationObserver(function(){clearTimeout(_tr80);_tr80=setTimeout(function(){shortTexts();trimCopy();},120);}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});}
SHORT.forEach(function(e){if(/^점 색/.test(e[1]||''))e[1]='숫자 묶음은 다이빙 센터예요.';if(/^기록으로 계산한 참고값/.test(e[1]||''))e[1]='참고용 계산이에요.';});
/* ===== 스쿠버 · 프리다이빙 테마 색: 스쿠버 파랑, 프리다이빙 초록 (지도 점 색과 같게) ===== */
(function(){var st=document.createElement('style');st.textContent='body[data-dm="free"]{--sea:#0E8A72;--sea-ink:#FFFFFF;--soft:#DDF3EC}'+
 ':root[data-theme="dark"] body[data-dm="free"]{--sea:#4FD8B4;--sea-ink:#04241C;--soft:#103D35}'+
 '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) body[data-dm="free"]{--sea:#4FD8B4;--sea-ink:#04241C;--soft:#103D35}}';document.head.appendChild(st);
 if(document.body&&!document.body.dataset.dm)document.body.dataset.dm=DM;})();
