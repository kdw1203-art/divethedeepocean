/* ===== 브랜드: 메인 로고(물결) · 보조 로고(소나) · 뱃지 ===== */
(function(){var st=document.createElement('style');st.textContent=[
'.brand{display:flex;align-items:center;flex:none}.brand img{height:40px;width:auto;display:block}.brand .logo-d{display:none}',
':root[data-theme="dark"] .brand .logo-l{display:none}:root[data-theme="dark"] .brand .logo-d{display:block}',
'@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .brand .logo-l{display:none}:root:not([data-theme="light"]) .brand .logo-d{display:block}}',
'@media (max-width:360px){.brand img{height:34px}}',
'.footbrand{display:flex;align-items:center;gap:12px;margin-bottom:10px}.footbrand img{width:56px;height:56px}',
'.bk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:16px}.bk-card{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel)}.bk-card .art{height:180px;display:flex;align-items:center;justify-content:center;padding:18px}.bk-card .art img{max-width:100%;max-height:100%}.bk-card .meta{padding:12px 14px;display:flex;flex-direction:column;gap:6px}.bk-dl{display:flex;gap:6px;flex-wrap:wrap}',
'.sw{display:flex;gap:8px;flex-wrap:wrap}.sw span{display:flex;flex-direction:column;gap:4px;font-size:12px;font-family:var(--font-mono)}.sw i{width:64px;height:40px;border-radius:10px;border:1px solid var(--line);display:block}'
].join('');document.head.appendChild(st);})();
var _foot10=foot;foot=function(){var h=_foot10();return h.replace('<div class="foot">','<div class="foot"><div class="footbrand"><img src="/assets/brand/badge.svg" alt="" width="56" height="56" loading="lazy"><span class="small">숨 한 번 고르고, 더 깊은 바다로<br><a href="#brand">브랜드 자료 · 로고 내려받기</a></span></div>');};
V.brand=function(){setTitle('브랜드 자료','Dive the deep ocean 로고와 색상, 사용 규칙');
  var B='/assets/brand/';
  function card(t,s,img,bg,files){return '<div class="bk-card"><div class="art" style="background:'+bg+'"><img src="'+B+img+'" alt="'+esc(t)+'"></div><div class="meta"><b>'+t+'</b><span class="small">'+s+'</span><div class="bk-dl">'+files.map(function(f){return '<a class="chip" href="'+B+f[0]+'" download style="text-decoration:none">'+f[1]+'</a>';}).join('')+'</div></div></div>';}
  return '<div class="vh"><div><h1>브랜드 자료</h1><p>로고는 세 가지예요. 메인 로고는 물결 로고예요.</p></div></div>'+
  '<div class="panel"><h2>1. 메인 로고 · 물결</h2><div class="bk-grid">'+
    card('메인 로고 (가로)','홈페이지 머리말, 문서, 굿즈 등 기본으로 쓰는 로고','logo-main.svg','#F3F6F8',[['logo-main.svg','SVG'],['png/logo-main.png','PNG']])+
    card('메인 로고 (어두운 배경)','남색·사진 위에 쓸 때','logo-main-dark.svg','#0B1F2E',[['logo-main-dark.svg','SVG'],['png/logo-main-dark.png','PNG']])+
    card('메인 로고 (세로)','정사각형 자리, 티셔츠 가슴·등판','logo-main-stacked.svg','#FFFFFF',[['logo-main-stacked.svg','SVG'],['png/logo-main-stacked.png','PNG'],['logo-main-stacked-dark.svg','어두운 배경 SVG'],['png/logo-main-stacked-dark.png','어두운 배경 PNG']])+
    card('물결 심볼','앱 아이콘, 파비콘, 작은 자리','symbol-waves.svg','#FFFFFF',[['symbol-waves.svg','SVG'],['png/symbol-waves.png','PNG'],['symbol-waves-dark.svg','어두운 배경 SVG'],['png/symbol-waves-dark.png','어두운 배경 PNG']])+'</div></div>'+
  '<div class="panel"><h2>2. 보조 로고 · 소나</h2><div class="bk-grid">'+
    card('소나 로고 (어두운 배경)','홈페이지 어두운 화면 머리말, 남색 배경 굿즈','logo-sonar-dark.svg','#0B1F2E',[['logo-sonar-dark.svg','SVG'],['png/logo-sonar-dark.png','PNG']])+
    card('소나 로고 (밝은 배경)','밝은 배경에 보조로 쓸 때','logo-sonar-light.svg','#FFFFFF',[['logo-sonar-light.svg','SVG'],['png/logo-sonar-light.png','PNG']])+
    card('소나 심볼','스티커, 작은 아이콘','symbol-sonar.svg','#FFFFFF',[['symbol-sonar.svg','SVG'],['png/symbol-sonar.png','PNG']])+'</div></div>'+
  '<div class="panel"><h2>3. 뱃지</h2><div class="bk-grid">'+card('뱃지','스티커, 패치, 인증 표시, 굿즈','badge.svg','#F3F6F8',[['badge.svg','SVG'],['png/badge.png','PNG']])+'</div></div>'+
  '<div class="panel"><h2>색상</h2><div class="sw">'+[['#5CC8F0','하늘'],['#2C8FC4','바다'],['#0A5C8A','깊은 바다'],['#0B1F2E','심해 남색'],['#1C5C84','소나 바깥'],['#8FD3F2','옅은 하늘'],['#F6A04D','코랄 포인트'],['#F3F6F8','배경']].map(function(c){return '<span><i style="background:'+c[0]+'"></i>'+c[0]+'<br>'+c[1]+'</span>';}).join('')+'</div><p class="small" style="margin:10px 0 0">글꼴은 Sora (영문), IBM Plex Sans KR (한글)이에요.</p></div>'+
  '<div class="panel"><h2>사용 규칙</h2><div class="list">'+item({t:'메인은 물결 로고',s:'처음 보는 사람에게는 물결 로고를 먼저 보여 줘요.'})+item({t:'홈페이지',s:'밝은 화면은 물결 로고, 어두운 화면은 소나 로고, 바닥글은 뱃지'})+item({t:'최소 크기',s:'가로 로고는 높이 24px(인쇄 10mm) 아래로 줄이지 않아요. 더 작으면 심볼을 써요.'})+item({t:'여백',s:'로고 둘레에 물결 한 줄 높이만큼 빈 공간을 둬요.'})+item({t:'하지 않기',s:'색 바꾸기, 늘리거나 눕히기, 그림자·테두리 넣기, 사진 위 대비가 낮은 곳에 놓기'})+'</div><p class="small" style="margin:8px 0 0">파일의 글자는 모두 선(아웃라인)으로 바꿔 두어서, 글꼴이 없어도 인쇄소에서 그대로 쓸 수 있어요. PNG는 배경이 투명해요.</p></div>'+foot();};

/* 자리표시 데이터 숨기기: 이름이 정해지지 않은 예시 리조트·강사는 화면에 내보내지 않아요 */
RESORTS.length=0;PROS.length=0;
var _resorts10=V.resorts;V.resorts=function(){if(!state.rsp)state.rsp='anilao';var h=_resorts10();return h.replace('<div class="panel"><div class="list"></div></div>','<div class="panel"><p class="empty" style="margin:0">심사를 통과한 입점 리조트가 아직 없어요. 아래에서 포인트를 고르면 그 바다 근처 리조트·다이빙 센터를 지도 데이터로 볼 수 있어요.</p><a class="btn btn-line" href="#partner" style="margin-top:10px">리조트 입점 안내</a></div>');};
/* 이미 생긴 기능인데 '준비 중'으로 남은 문구 고치기 */
var _log10=V.log;V.log=function(){return _log10().replace('사진에서 날짜 · 수심을 자동으로 읽는 기능은 준비 중이에요.','사진마다 \'사진에서 글자 읽기\'를 누르면 날짜·수심·시간을 읽어 칸을 채워요.');};
var _dev10=V.devices;V.devices=function(){var h=_dev10();return h.replace("Shearwater Cloud, Subsurface, Suunto DM5, MacDive에서 내보낸 파일을 로그 화면에서 가져와요","Shearwater Cloud, Subsurface, Suunto DM5, MacDive에서 내보낸 파일과 Garmin Descent의 .fit 파일을 로그 화면에서 가져와요").replace('UDDF · Subsurface 파일','UDDF · Subsurface · Garmin FIT 파일');};
