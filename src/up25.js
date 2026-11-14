/* ===== 포인트 자료 보강: 대표 다이빙 사이트 · 지도에 등록된 근처 사이트와 센터 ===== */
var SUBSITES={
 jeju:[['문섬 새끼섬','연산호 군락 · 보트 · 5~35m'],['문섬 한개창','직벽과 연산호 · 중급'],['문섬 불턱','초급도 가능한 완만한 지형'],['섶섬','연산호와 자리돔 떼 · 보트'],['범섬','직벽 · 동굴 지형 · 조류 주의']],
 udo:[['성산 일출봉 앞','화산 지형 · 해조류 숲'],['우도 주간명월','수중 아치와 동굴 · 보트']],
 anilao:[['Twin Rocks','초급 · 잭피시 떼와 대왕조개 · 5~20m'],['Cathedral','수중 십자가 · 물고기 떼'],['Secret Bay','머크 다이빙 · 희귀 마크로'],["Kirby's Rock",'직벽 · 갯민숭달팽이'],['Beatrice','조류 · 산호와 안티아스 떼']],
 moalboal:[['Panagsama (Sardine Run)','해변 바로 앞 정어리 떼 · 5~15m'],['Pescador Island','직벽 · 대성당 동굴'],['Talisay Wall','거북 · 완만한 직벽'],['Tongo Point','마크로 · 한적함']],
 balicasag:[['Black Forest','거북과 잭피시 떼 · 조류'],["Diver's Heaven",'직벽 · 산호'],['Cathedral','수중 동굴 지형'],['Marine Sanctuary','보호구역 · 물고기 많음']],
 galera:[['Canyons','조류 · 대형 어종 · 중급 이상'],['Sabang Wrecks','작은 난파선 3척 · 초급'],['Monkey Beach','완만한 산호 경사'],['Verde Island','강한 조류 · 직벽 (당일 원정)']],
 coron:[['Irako Maru','대형 난파선 · 중급 이상 · 28~43m'],['Okikawa Maru','유조선 · 얕은 갑판 10m~'],['Akitsushima','수상기 모함 · 20~36m'],['Barracuda Lake','수온이 층층이 바뀌는 호수'],['Morazan Maru','초급도 가능한 난파선']],
 malapascua:[['Kimud Shoal','환도상어 · 이른 아침'],['Monad Shoal','환도상어 · 타이거샤크'],['Gato Island','터널 · 화이트팁 · 해마'],['Lighthouse','만다린피시 · 해 질 무렵']],
 tulamben:[['USAT Liberty Wreck','해변 입수 난파선 · 5~30m'],['Coral Garden','얕은 산호 정원 · 조각상'],['Drop Off','직벽 · 대형 부채산호'],['Seraya Secrets','머크 다이빙 · 마크로']],
 nusapenida:[['Manta Point','만타 클리닝 스테이션 · 너울 주의'],['Crystal Bay','몰라몰라(7~10월) · 하강 조류 주의'],['Toyapakeh','산호 경사 · 드리프트'],['SD Point','드리프트 · 거북']],
 komodo:[['Batu Bolong','물고기가 가장 많은 암초 · 조류'],['Manta Point (Karang Makassar)','만타 · 드리프트'],['Castle Rock','강한 조류 · 상어와 대형 어종'],['Crystal Rock','산호와 어군'],['Siaba Besar','거북 · 초급']],
 okinawa:[['자마미 · 아카섬 주변','맑은 시야 · 거북'],['도카시키 아리가 케이블','산호 군락'],['구로시마 북쪽','드리프트 · 대형 어종']],
 maeda:[['Blue Cave (青の洞窟)','동굴 안 푸른 빛 · 초급'],['마에다 포인트 직벽','산호 경사와 물고기 떼']],
 ishigaki:[['Kabira Ishizaki Manta Scramble','만타 클리닝 스테이션 (여름~가을)'],['Manta City','만타 · 보트'],['Osaki Hanagoi Reef','산호와 거북']],
 palau:[['Blue Corner','리프 훅 · 상어와 대형 어종 · 조류'],['German Channel','만타 클리닝 스테이션'],['Ulong Channel','드리프트 · 산호'],['Blue Holes','수직 동굴 지형'],['Chandelier Cave','공기 방이 있는 동굴']],
 saipan:[['Grotto','계단 입수 동굴 · 푸른 빛'],['Lau Lau Beach','초급 · 비치 · 거북'],['Obyan Beach','가든일 · 비치'],['Wing Beach','지형 · 계절 한정']],
 guam:[['Blue Hole','수직 굴 · 중급 이상'],['Gab Gab II','초급 · 물고기 많음'],['Tokai Maru · SMS Cormoran','두 난파선이 맞닿은 곳'],['Fish Eye Marine Park','초급 · 비치']],
 kohtao:[['Chumphon Pinnacle','대형 어군 · 고래상어 가끔'],['Sail Rock','굴뚝 지형 · 당일 원정'],['White Rock','교육 · 야간'],['HTMS Sattakut','난파선 · 18~30m'],['Japanese Gardens','초급 · 얕은 산호']],
 similan:[['Elephant Head Rock','바위 지형 · 스윔스루'],['Christmas Point','바위와 산호'],['East of Eden','산호 정원'],['Koh Bon','만타 (시즌)'],['Koh Tachai','대형 어종 · 조류']],
 richelieu:[['Richelieu Rock','보라색 연산호 · 고래상어 (2~4월)']],
 sipadan:[['Barracuda Point','바라쿠다 소용돌이 · 조류'],['South Point','상어 · 대형 어종'],['Turtle Cavern','거북 무덤 동굴 (동굴 교육 필수)'],['Hanging Gardens','직벽 연산호'],['Drop Off','해변 앞 600m 직벽']],
 mabul:[['Paradise · Froggy Lair','머크 다이빙 · 마크로'],['Seaventures Rig','석유 시추대 아래 · 마크로'],['Kapalai House Reef','만다린피시 · 인공 구조물']],
 dahab:[['Blue Hole','깊은 수직 구멍 · 프리다이빙 성지'],['The Bells','블루홀로 이어지는 수직 굴'],['Canyon','협곡 지형 · 중급 이상'],['Lighthouse','교육 · 야간 · 비치'],['Eel Garden','가든일 군락']],
 maldives:[['Maamigili (고래상어 구역)','연중 고래상어'],['Kudarah Thila','보호구역 · 어군'],['Rangali Madivaru','만타 (북동 몬순)'],['Fish Head (Mushimasmingili)','회색암초상어']],
 cozumel:[['Palancar Reef','산호 탑과 스윔스루'],['Santa Rosa Wall','드리프트 직벽'],['Columbia Wall','거북 · 대형 산호'],['Paradise Reef','초급 · 야간']],
 cenote:[['Dos Ojos','빛이 드는 동굴 · 초급 가능'],['The Pit','깊은 수직 굴 · 황화수소층'],['Angelita','수중 구름층 · 30m'],['Gran Cenote','종유석 · 맑은 시야']],
 gbr:[['Norman Reef','산호와 거북 · 당일'],['Saxon Reef','초급 · 스윔스루'],['Flynn Reef','산호 정원']],
 rajaampat:[['Cape Kri','어종 수 기록 보유 · 조류'],['Blue Magic','만타 · 대형 어군'],['Manta Sandy','만타 클리닝 스테이션'],['Melissa\'s Garden','산호 정원'],['Arborek Jetty','부두 아래 어군']],
 lembeh:[['Hairball','머크 · 헤어리 프로그피시'],['Nudi Falls','갯민숭달팽이 · 직벽'],['Police Pier','반가이 카디널피시'],['TK 1 · 2 · 3','검은 모래 마크로']],
 bunaken:[['Lekuan 1 · 2 · 3','직벽 · 거북'],['Fukui Point','대왕조개 · 완만한 경사'],['Mandolin','직벽 · 조류']]};
function subPanel(s){var L=SUBSITES[s.id],near=[],cen=0;if(DB.sites){var sn={};nearSites(s,35).forEach(function(x){var nm=String(x.n).split(' · ')[0].trim(),k=nm.toLowerCase();if(x.t!==1){cen++;return;}if(/^(dive ?site|diving|dive spot|snorkel(ing)?|unnamed)$/i.test(nm)||/parking|resort|hotel|shop|center|centre|school|리조트|센터/i.test(nm)||sn[k])return;sn[k]=1;near.push(x);});}else if(!subPanel.b){subPanel.b=1;fetch('/assets/sites.json').then(function(r){return r.json();}).then(function(d){DB.sites=d;if(cur()==='spot')rerender();}).catch(function(){});}
  var h='';if(L)h+='<div class="panel"><h2>대표 다이빙 사이트 <span class="small">'+L.length+'곳</span></h2><div class="list">'+L.map(function(x){return '<div class="item"><span class="tx"><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></span></div>';}).join('')+'</div><p class="small" style="margin:8px 0 0">널리 알려진 사이트를 정리했어요. 수심·조류·입수 조건은 날마다 달라서 현지 센터 브리핑을 따르세요.</p></div>';
  if(near.length)h+='<div class="panel"><h2>지도에 등록된 근처 사이트 <span class="small">'+near.length+'곳</span></h2><div class="chips">'+near.slice(0,24).map(function(x){return '<a class="chip" style="text-decoration:none" href="https://www.google.com/maps/search/?api=1&query='+x.lat+','+x.lon+'" target="_blank" rel="noopener">'+esc(x.n)+' · '+Math.round(x.d)+'km</a>';}).join('')+'</div><p class="small" style="margin:8px 0 0">OpenStreetMap에 다이빙 사이트로 등록된 곳이에요'+(near.length>24?' (가까운 24곳만 표시)':'')+'.'+(cen?' 근처 다이빙 센터 · 리조트 '+cen+'곳은 <a href="#resorts" data-near="'+s.id+'">리조트 화면</a>에서 볼 수 있어요.':'')+'</p></div>';
  else if(cen&&DB.sites)h+='<div class="panel"><p style="margin:0">근처 35km 안에 등록된 다이빙 센터 · 리조트가 '+cen+'곳 있어요. <a href="#resorts" data-near="'+s.id+'">리조트 화면에서 보기</a></p></div>';
  return h;}
var _spot25=V.spot;V.spot=function(id){var h=_spot25(id),s=spot(id);if(!s)return h;var p=subPanel(s);if(!p)return h;var k=h.indexOf('<div class="panel" id="seaToday">');if(k<0)k=h.lastIndexOf('<div class="sbar"');if(k<0)k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
