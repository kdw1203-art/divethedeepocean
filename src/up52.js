/* ===== 생물 사진 최소화: 포인트·홈·피드에서는 사진 대신 글로 ===== */
(function(){var st=document.createElement('style');st.textContent=
'#main .gal{display:none!important}'+
'#main .lcard .ph1{display:none!important}'+
'#feedPh{display:none!important}'+
'#main .spgrid:not(.lifeg){display:flex!important;flex-wrap:wrap;gap:6px}#main .spgrid:not(.lifeg) a.sp{display:inline-flex!important;width:auto!important;height:auto!important;aspect-ratio:auto!important;padding:5px 10px;border-radius:999px;background:var(--bg);color:var(--ink);text-decoration:none;font-size:13px}#main .spgrid:not(.lifeg) a.sp img{display:none!important}#main .spgrid:not(.lifeg) a.sp *{position:static!important;background:none!important;color:inherit!important;padding:0!important;text-shadow:none!important}'+
'#hbundle .mslide .ph{height:auto!important;background:none!important;padding:0 0 2px}#hbundle .mslide .ph img,#hbundle .mslide .ph .credit{display:none!important}#hbundle .mslide .ph .mb{position:static!important;display:inline-block;background:var(--bg);color:var(--ink)}#hbundle .mslide .bd{padding-top:8px}';
document.head.appendChild(st);})();
/* 홈 묶음 안으로 들어간 '국내 바다 지금'은 묶음 밖으로 */
var _after52=after;after=function(){_after52();if(cur()!=='home')return;var hb=document.getElementById('hbundle');if(!hb)return;[].forEach.call(hb.querySelectorAll(':scope > .panel:not(#seaToday)'),function(p){hb.after(p);});var s=document.getElementById('seaToday');if(s)[].forEach.call(s.querySelectorAll(':scope > .panel'),function(p){hb.after(p);});};
new MutationObserver(function(){var hb=document.getElementById('hbundle');if(!hb)return;var P=hb.querySelectorAll(':scope > .panel:not(#seaToday)');for(var i=P.length-1;i>=0;i--)hb.after(P[i]);}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
