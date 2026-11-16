/* ===== 모바일 정리: 메뉴·칩은 한 줄(옆으로 밀기) · 안내 문구 짧게 · 정렬 ===== */
(function(){var st=document.createElement('style');st.textContent=
'@media (max-width:860px){'+
'#main .mystat,#main .maplegend{display:flex!important;gap:14px}#main .chips,#main .mystat,#main .maplegend,#main .rtab{flex-wrap:nowrap!important;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding-bottom:2px}'+
'#main .chips::-webkit-scrollbar,#main .mystat::-webkit-scrollbar,#main .maplegend::-webkit-scrollbar{display:none}'+
'#main .chips>*,#main .mystat>*,#main .maplegend>*{flex:none!important;white-space:nowrap}'+
'#main .cats{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}#main .cats .cat{padding:10px 4px!important;font-size:12.5px!important;white-space:nowrap}#main .cats .cat i{width:42px!important;height:42px!important}'+
'}'+
'.kvp .item .tx{flex:none}.kvp .item .rt{flex:1;min-width:0;text-align:right;white-space:normal;word-break:keep-all;line-height:1.45}.kvp .item{gap:12px}'+
'.lbx>summary{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#main p.small{word-break:keep-all}';
document.head.appendChild(st);})();
/* 길고 설명하는 문구 → 짧게 */
var SHORT=[[/^포인트 화면에서 다녀왔어요나 찜하기를/,'다녀온 곳 · 찜한 곳이 지도에 표시돼요. 로그를 쓰면 자동으로 들어가요.'],
 [/^파란 점은 스쿠버, 주황 점은 프리다이빙/,'점 색: 파랑 스쿠버 · 초록 프리다이빙 · 보라 둘 다. 숫자 묶음은 다이빙 센터예요 (OpenStreetMap).'],
 [/^가격은 시즌과 인원마다 달라/,'가격은 업체 견적으로 확인해요. 광고는 "광고"로 표시돼요.'],
 [/^다이버가 직접 남긴 값이라 시즌/,'다이버 제보 값이에요. 예약 전 업체 견적으로 확인하세요.'],
 [/^기록된 값으로 계산한 참고 정보예요/,'기록으로 계산한 참고값이에요. 감압은 다이브 컴퓨터를 따르세요.'],
 [/^업체 위치와 이름은 오픈스트리트맵 자료예요/,null]];
function shortTexts(){[].forEach.call(document.querySelectorAll('#main p.small,#main p'),function(p){if(p.dataset.sh)return;var t=p.textContent.trim();for(var i=0;i<SHORT.length;i++){if(SHORT[i][0].test(t)&&SHORT[i][1]){p.dataset.sh=1;var a=p.querySelector('a');p.textContent=SHORT[i][1];if(a&&/등록/.test(a.textContent)){p.appendChild(document.createTextNode(' '));p.appendChild(a);}break;}}});}
function kvpMark(){[].forEach.call(document.querySelectorAll('#main .panel'),function(p){var h=(p.querySelector('h2')||{}).textContent||'';if(/^내 프로필/.test(h))p.classList.add('kvp');});}
function tidyLbx(){var s=document.querySelector('#main .lbx>summary');if(s&&!s.dataset.sh){s.dataset.sh=1;s.textContent='더 보기 · 분석 · 배지 · 다녀온 바다 · 종이 로그북';}}
var _after65=after;after=function(){_after65();shortTexts();kvpMark();tidyLbx();setTimeout(function(){shortTexts();tidyLbx();},600);};
