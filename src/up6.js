/* ===== 4차-C: 디자인 토큰 · 대비 · 스켈레톤 · 큰 글씨 ===== */
(function(){var st=document.createElement('style');st.textContent=[
/* 250 토큰: 간격 · 모서리 · 그림자 하나로 */
':root{--r-sm:10px;--r-md:14px;--r-lg:18px;--sp-1:6px;--sp-2:10px;--sp-3:16px;--sp-4:20px;--sh-1:0 1px 2px rgba(11,31,46,.06),0 4px 14px rgba(11,31,46,.06)}',
'.panel{border-radius:var(--r-lg)}.chip{border-radius:999px}.btn{border-radius:var(--r-md)}',
/* 251 버튼 3종: 주(btn-pri) · 보조(btn-line) · 텍스트(.lnk) — 높이와 굵기 통일 */
'.btn{min-height:44px;font-weight:700}.btn-pri,.btn-line{padding-left:16px;padding-right:16px}.lnk{background:none;border:0;padding:0;color:var(--sea);font-weight:600;text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
/* 242 · 255 대비 */
'.season .on{color:var(--sea-ink)}',
':root[data-theme="dark"] .chatlog .m.me{background:var(--soft)}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .chatlog .m.me{background:var(--soft)}}',
/* 253 스켈레톤 */
'.skel{color:transparent!important;position:relative;min-height:64px;border-radius:var(--r-md);background:linear-gradient(90deg,var(--line) 0%,var(--soft) 40%,var(--line) 80%);background-size:200% 100%;animation:skel 1.2s linear infinite}',
'.skel *{visibility:hidden}@keyframes skel{from{background-position:200% 0}to{background-position:-200% 0}}',
'@media (prefers-reduced-motion:reduce){.skel{animation:none}}',
/* 246 큰 글씨 · 좁은 화면: 넘치지 않게 */
'.vh,.item,.tx,.form label,.panel h2{min-width:0;overflow-wrap:anywhere}',
'.form select,.form input,.form textarea{max-width:100%;min-width:0}',
'.panel h2{flex-wrap:wrap;gap:6px}',
'@media (max-width:360px){.cats{grid-template-columns:repeat(3,minmax(0,1fr))}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.form{grid-template-columns:minmax(0,1fr)!important}}',
/* 259 가로 모드: 낮은 화면에서 지도 높이 줄이기 */
'@media (orientation:landscape) and (max-height:500px){.lmap{height:70vh!important;min-height:220px!important}#homemap{height:60vh!important}.sheet{max-height:94vh}}',
/* 258 넓은 화면: 프로필 그림 크기 제한 */
'@media (max-width:860px){.app{grid-template-columns:minmax(0,1fr)}}',
'@media (max-width:360px){.topbar{gap:6px;padding:0 8px}.topbar .btn{padding:0 10px;font-size:13px;min-height:38px}.wm b{font-size:16px}}',
'@media (max-width:1000px){.cols{grid-template-columns:minmax(0,1fr)!important}}',
'.cols3{grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))}',
'.prof svg{max-width:560px;margin:0 auto}.tide svg{max-width:560px;margin:0 auto}'
].join('');document.head.appendChild(st);})();
var _after6=after;after=function(){_after6();skel();};
function skel(){document.querySelectorAll('p.empty, .small').forEach(function(e){if(/^\s*(불러오는 중|목록을 불러오는 중|센터 목록을 불러오는 중)/.test(e.textContent))e.classList.add('skel');});}
var _rer6=rerender;rerender=function(){_rer6();skel();};
