/* ===== 모바일: 창 자체가 스크롤되게 → 사파리 주소창·아래 도구막대가 스크롤에 따라 접힘 ===== */
(function(){var mq=window.matchMedia('(max-width:860px)');var m=document.getElementById('main');if(!m)return;
  var st=document.createElement('style');st.textContent='@media (max-width:860px){html,body{height:auto!important;min-height:100%}.app{display:block!important;height:auto!important;min-height:100vh}'+
  '.topbar{position:sticky!important;top:0;z-index:60;height:60px;padding-top:env(safe-area-inset-top)}'+
  '#main{overflow:visible!important;height:auto!important;min-height:calc(100vh - 60px);padding-bottom:calc(96px + env(safe-area-inset-bottom))!important}'+
  '#tabbar,.tabbar{position:fixed!important;left:0;right:0;bottom:0;height:calc(64px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);z-index:60}}';document.head.appendChild(st);
  var on=function(){return mq.matches;},P=Element.prototype,d=Object.getOwnPropertyDescriptor(P,'scrollTop');
  Object.defineProperty(m,'scrollTop',{configurable:true,get:function(){return on()?window.scrollY:d.get.call(m);},set:function(v){if(on())window.scrollTo(0,v);else d.set.call(m,v);}});
  ['scrollHeight','clientHeight'].forEach(function(k){var dd=Object.getOwnPropertyDescriptor(P,k);Object.defineProperty(m,k,{configurable:true,get:function(){return on()?(k==='scrollHeight'?document.documentElement.scrollHeight:window.innerHeight):dd.get.call(m);}});});
  var sTo=m.scrollTo;m.scrollTo=function(a,b){if(on()){return typeof a==='object'?window.scrollTo(a):window.scrollTo(a||0,b||0);}return sTo.apply(m,arguments);};
  var sBy=m.scrollBy;m.scrollBy=function(a,b){if(on()){return typeof a==='object'?window.scrollBy(a):window.scrollBy(a||0,b||0);}return sBy.apply(m,arguments);};
  var busy=false;window.addEventListener('scroll',function(){if(!on()||busy)return;busy=true;requestAnimationFrame(function(){busy=false;m.dispatchEvent(new Event('scroll'));});},{passive:true});
  /* 위에 붙는 요소는 상단 바 아래로 */
  function stickFix(){if(!on())return;var tb=document.querySelector('.topbar'),h=tb?Math.round(tb.getBoundingClientRect().height):60;var sel=stickSel();if(!sel)return;document.querySelectorAll(sel).forEach(function(e){if(e.dataset.stk2||!e.closest('#main'))return;var cs=getComputedStyle(e);if(cs.position==='sticky'&&cs.top==='0px'){e.dataset.stk2=1;e.style.top=h+'px';}});}
  /* 모든 요소의 스타일을 계산하던 것을, 스타일시트에서 position:sticky 가 걸린 선택자만 골라 검사 (지도 · 목록 화면이 무거워지던 원인) */
  function stickSel(){var n=document.styleSheets.length;if(stickSel.n===n&&stickSel.s!=null)return stickSel.s;var L=['[style*="sticky"]'];[].forEach.call(document.styleSheets,function(ss){var R;try{R=ss.cssRules;}catch(e){return;}(function walk(R){[].forEach.call(R||[],function(r){if(r.cssRules&&!r.selectorText)walk(r.cssRules);else if(r.style&&/sticky/.test(r.style.position||'')&&r.selectorText)L.push(r.selectorText);});})(R);});var ok=L.filter(function(x){try{document.querySelector(x);return true;}catch(e){return false;}});stickSel.n=n;stickSel.s=ok.join(',');return stickSel.s;}
  var _a=after;after=function(){_a();setTimeout(stickFix,50);setTimeout(stickFix,800);};})();
