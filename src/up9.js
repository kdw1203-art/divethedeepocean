/* ===== 33 영어 화면 (1차): 메뉴·버튼·제목·포인트 이름·태그를 영어로, 긴 설명은 아직 한국어 ===== */
var LANG=(function(){try{var q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='ko'){localStorage.setItem('dtdo.lang',JSON.stringify(q));return q;}}catch(e){}return LS.get('lang','ko');})();
var EN_D={
/* 메뉴 · 머리말 */
'홈':'Home','지도':'Map','피드':'Feed','로그':'Log','내 정보':'Me','리조트':'Resorts','강사 · 자격증':'Instructors & certs','코스 · 비용':'Trips & costs','해양생물':'Marine life','모임 · 구인구직':'Meetups & jobs','로그 · 컨디션':'Log & condition','장비 · 정비':'Gear & service','도구':'Tools','입점 · 광고':'For business','함께':'Together','안전 · 응급':'Safety & emergency','내 다이빙':'My diving','비즈니스':'Business','찾기':'Explore','검색':'Search','통합 검색':'Search','알림':'Notifications','로그인':'Log in','회원가입':'Sign up','로그아웃':'Log out','주 메뉴':'Main menu','하단 메뉴':'Bottom menu','화면 밝기 바꾸기':'Toggle theme','밝게 · 어둡게':'Light · Dark','메시지':'Messages','계정 관리':'Account',
'포인트 · 리조트 · 강사 · 장비 검색':'Search spots, resorts, instructors, gear','포인트 · 리조트 · 생물 · 장비 검색':'Search spots, resorts, marine life, gear',
/* 홈 */
'숨 한 번 고르고, 더 깊은 바다로':'Take a breath, dive deeper','내 바다 지도':'My ocean map','전체 지도':'Full map','지도 움직이기':'Explore map','이번 시즌 추천':'In season now','지도에서 보기':'View on map','최근 본 포인트':'Recently viewed','자세히':'Details','포인트':'Spots','강사 · 자격증 ':'Instructors','맛집 · 안전':'Food & safety','모임':'Meetups','장비 마켓':'Gear market','정비 · 수리':'Service & repair','다이브 로그':'Dive log','계산기 · 체크':'Calculators','처음 오셨나요?':'New here?','닫기':'Close',
/* 공통 */
'전체':'All','스쿠버':'Scuba','프리다이빙':'Freediving','초급':'Beginner','중급':'Intermediate','상급':'Advanced','초급~중급':'Beginner–Intermediate','중급 이상':'Intermediate+','중급~':'Intermediate+','초급~':'Beginner+','입문':'Intro','입문~':'Intro+','공유':'Share','추천':'Recommended','보기':'View','더 보기':'More','이전':'Previous','다음':'Next','선택':'Select','저장':'Save','취소':'Cancel','삭제':'Delete','고치기':'Edit','확인':'OK','보내기':'Send','길찾기':'Directions','견적 문의':'Request quote','지원 페이지':'Support page','← 돌아가기':'← Back','← 지도':'← Map','불러오는 중이에요.':'Loading…','불러오는 중이에요':'Loading…','기타':'Other','나라':'Country','인원':'People','지역':'Region','단계':'Level','내용':'Details','후기':'Reviews','후기 남기기':'Write a review','별점':'Rating','찜하기':'Save','♡ 찜하기':'♡ Save','♥ 찜함':'♥ Saved','다녀왔어요':'Been there','비교에 담기':'Compare','동행 찾기':'Find buddies','신고':'Report','차단':'Block','차단 풀기':'Unblock','틀린 정보 알리기':'Report an error','봤어요':'Seen it',
/* 포인트 */
'다이빙 지도':'Dive map','난이도':'Level','가는 달':'Month','아무 때':'Any time','내 위치':'Near me','수심':'Depth','수온':'Water temp','시즌':'Season','소개':'About','위치':'Location','가는 길':'Getting there','들어가는 길':'Getting there','만날 수 있는 생물':'Marine life here','도감':'Field guide','지금 바다':'Sea now','수심 프로필':'Depth profile','조석':'Tides','응급 연락처':'Emergency contacts','현지 응급':'Local emergency','잠수병 상담':'DCS hotline','감압 챔버':'Recompression chamber','가까운 곳 지도에서 찾기':'Find nearest on map','같은 지역 포인트':'Nearby spots','주변 다이빙 센터 · 포인트':'Nearby dive centers & sites','리조트 · 업체':'Resorts & businesses','이 근처 다이버 관찰 기록':'Diver sightings nearby','다녀온 다이버 후기 0':'Diver reviews 0','다이빙한 날':'Dive date','렌탈 가격 비교':'Rental price comparison','수심 전체':'Any depth','18m 안에서':'Within 18m','30m 이상':'30m+','입수 전체':'Any entry','비치':'Shore','보트':'Boat','리브어보드':'Liveaboard','조류 상관없음':'Any current','조류 포인트':'Current dives','조류 약한 곳':'Mild current','이 지도 링크 복사':'Copy map link','더 고르기':'More filters','센터 · 샵':'Center · shop','리조트 · 숙소':'Resort · stay','포인트 고르기':'Choose a spot','달':'Month',
/* 지역 · 나라 */
'한국':'Korea','일본':'Japan','필리핀':'Philippines','동남아':'Southeast Asia','미크로네시아':'Micronesia','인도양·홍해':'Indian Ocean & Red Sea','호주·태평양':'Australia & Pacific','아메리카':'Americas','유럽':'Europe',
'대한민국':'South Korea','인도네시아':'Indonesia','태국':'Thailand','이집트':'Egypt','말레이시아':'Malaysia','호주':'Australia','미국령':'US territory','몰디브':'Maldives','미국':'USA','멕시코':'Mexico','미크로네시아 연방':'Micronesia (FSM)','피지':'Fiji','프랑스령 폴리네시아':'French Polynesia','바하마':'Bahamas','베트남':'Vietnam','팔라우':'Palau','세이셸':'Seychelles','모리셔스':'Mauritius','모잠비크':'Mozambique','남아프리카공화국':'South Africa','탄자니아':'Tanzania','통가':'Tonga','파푸아뉴기니':'Papua New Guinea','뉴질랜드':'New Zealand','에콰도르':'Ecuador','코스타리카':'Costa Rica','벨리즈':'Belize','네덜란드령':'Caribbean Netherlands','영국령':'British territory','아이슬란드':'Iceland','몰타':'Malta','그리스':'Greece','튀르키예':'Türkiye','스페인':'Spain',
/* 포인트 특징 낱말 */
'연산호':'soft coral','지형':'topography','해조류':'kelp','맑은 시야':'clear water','냉수':'cold water','인공어초':'artificial reef','교육':'training','난파선':'wreck','2차대전 난파선':'WWII wrecks','수중 암초':'pinnacle','난류':'warm current','남해':'South Sea','산호':'coral','실내 잠수풀':'indoor dive pool','거북':'turtles','바다거북':'sea turtles','동굴':'caves','체험':'try dive','해저 지형':'seabed terrain','귀상어':'hammerheads','온대':'temperate','마크로':'macro','돌고래':'dolphins','고래':'whales','스킨다이빙':'skin diving','돌고래 스킨다이빙':'dolphin skin diving','수중 사진':'underwater photo','정어리 떼':'sardine run','월':'wall','월 다이빙':'wall diving','먹 다이빙':'muck diving','석회암 섬':'limestone islands','고래상어':'whale sharks','스노클':'snorkel','고래상어 스노클':'whale shark snorkel','화산섬':'volcanic island','수중 묘지':'underwater cemetery','자격증':'certification','리브어보드 전용':'liveaboard only','화강암':'granite','데이트립':'day trips','석회암 절벽':'limestone cliffs','대형 어군':'big schools','해변 입수':'shore entry','프리다이빙 훈련':'freediving training','만타':'mantas','몰라몰라':'mola mola','프리다이빙 스쿨':'freediving school','조류':'current','생물다양성':'biodiversity','상어':'sharks','빛':'light beams','수직 동굴':'vertical cave','시야':'visibility','텍니컬':'technical','중급~텍니컬':'Intermediate–technical','채널':'channel','듀공':'dugong','해산':'seamount','아치':'arch','민물 동굴':'freshwater cave','빛기둥':'light shafts','드리프트':'drift','대형 어종':'big animals','블루홀':'blue hole','종유석':'stalactites','해변 다이빙':'shore diving','산호초':'coral reef','켈프 숲':'kelp forest','대륙판 사이':'between tectonic plates','민물':'freshwater','깊은 만':'deep bay','지중해':'Mediterranean','화산 지형':'volcanic terrain','패스 드리프트':'pass drift','상어 벽':'shark wall','만타 나이트 다이빙':'manta night dive','혹등고래 스노클':'humpback snorkel','환도상어':'thresher sharks','하우스리프':'house reef','숙박+3다이브':'stay + 3 dives','지형 · 동굴':'topography · caves','산호 · 교육':'coral · training','프리다이빙 · 블루홀':'freediving · blue hole','동굴 · 체험':'caves · try dive','만타 군집 (스노클만)':'manta aggregation (snorkel only)','초급 (드라이슈트)':'Beginner (drysuit)','수중사진 특화 · 카메라실':'photo-focused · camera room',
/* 도감 */
'해양생물 도감':'Marine life guide','상어·가오리':'Sharks & rays','고래·돌고래':'Whales & dolphins','대형 어종·군집':'Big fish & schools','산호초 어류':'Reef fish','산호·무척추':'Coral & invertebrates','두족류':'Cephalopods','한국 바다':'Korean seas','주의 생물':'Hazardous','볼 수 있는 곳':'Where to see','관찰 팁':'Tips','자주 보여요':'Common','가끔 보여요':'Occasional','드물어요':'Rare','쏘이거나 찔리면':'If stung','보호 등급':'Protection status','헷갈리기 쉬운 비슷한 종':'Look-alike species','이 바다, 이 달에 보이는 생물':'Seen here this month',
/* 로그 · 장비 */
'빠른 기록':'Quick log','기록하기':'Save log','날짜':'Date','시간 (분)':'Time (min)','최대 수심 (m)':'Max depth (m)','종류':'Type','총 다이브':'Total dives','최대 수심':'Max depth','누적 시간':'Total time','오늘의 컨디션':'Today\'s condition','기기 연결 전':'No device','기기 연결하기':'Connect device','연결 필요':'Connect','수면 · 심박':'Sleep · heart rate','마지막 다이브 후':'Since last dive','로그가 없어요':'No logs yet','비행 전 대기':'No-fly time','지남':'Clear','다이브 컴퓨터 파일 가져오기':'Import dive computer files','파일 고르기':'Choose files','최근 다이브 프로필 · 버디 확인':'Recent profiles · buddy sign-off','버디 확인 받기':'Get buddy sign-off','장비 등록':'Add gear','판매 등록':'Sell gear','호흡기':'Regulator','다이브 컴퓨터':'Dive computer','드라이슈트':'Drysuit','웻슈트':'Wetsuit','슈트':'Suit','핀 · 마스크':'Fins · mask','마스크':'Mask','탱크':'Tank','장비':'Gear','찜한 물건':'Wishlist','정비점 · 수리 센터':'Repair shops','설명서 · 리콜 공지':'Manuals · recalls',
/* 모임 · 피드 · 업체 */
'새 게시물':'New post','모임 만들기':'Create meetup','참가자 채팅':'Participant chat','업체 등록':'Register business','업체 종류':'Business type','정비점':'Repair shop','연락처':'Contact','예약 요청':'Booking request','예약 요청 보내기':'Send request','예약 종류':'Booking type','숙박 · 펀다이빙':'Stay · fun dives','교육 과정':'Course','선실':'Cabin','안전 서약 (전자 서명)':'Safety waiver (e-sign)','서명 지우기':'Clear signature','서명할 이름':'Name for signature','소속 강사':'Staff instructors','같은 업체의 다른 지점':'Other branches','업체 대시보드':'Business dashboard','가격표':'Price list','서비스':'Services','정보':'Info','운영 시간':'Hours','주소':'Address','응대 언어':'Languages','소속 단체':'Agencies','홈페이지':'Website','인증 업체 ✓':'Verified ✓','내 예약':'My bookings','광고 집행':'Advertise','한눈에 보기':'At a glance','다이버':'Divers','모든 기능 무료':'Everything free','강사 · 교육 업체 찾기':'Find instructors & schools',
/* 기타 화면 */
'이용약관':'Terms','개인정보 처리방침':'Privacy','커뮤니티 규칙':'Community rules','취소·환불':'Cancellation & refunds','사진·데이터 출처':'Photo & data credits','업데이트 소식':'Updates','보안 제보':'Security','휴대폰 알림':'Push notifications','이 기기로 알림 받기':'Get notifications on this device','다가오는 정비 · 갱신':'Upcoming service & renewals','내가 보낸 제보':'My reports','차단한 사용자':'Blocked users','이메일':'Email','비밀번호':'Password','비밀번호 보기':'Show password','닉네임':'Nickname','오픈워터':'Open Water','나이트록스':'Nitrox','다이빙':'Diving','한국어':'Korean','입수 0m':'Entry 0m','조석 (해수면 높이)':'Tides (sea level)','지금':'Now','수면':'surface','수면~10m':'surface–10m','수면~25m':'surface–25m','약 200m':'about 200m','해변에서 바로 깊은 수심':'deep water right off the beach','해변에서 100m 이상':'100m+ from the beach','해안에서 깊은 수심':'deep water from shore','대형 만타':'giant mantas','로타홀':'Rota Hole',
'브랜드 자료 · 로고 내려받기':'Brand assets · logo downloads','브랜드 자료':'Brand assets','Garmin · Apple 건강':'Garmin · Apple Health','여러 번 다이빙 기준 18시간':'18 h after repetitive dives','수면 수온':'Surface temp','파도':'Waves','파도 주기':'Wave period','모델 예보값이라 실제와 다를 수 있어요. 출항 여부는 현지 센터 판단을 따르세요.':'Model forecast; actual conditions may differ. Follow your local center on whether boats go out.',
'체크인 · 체크다이브':'Check-in · check dive','첫날은 얕게 시작':'Start shallow on day one','귀국 전날':'Day before flying home','다이빙 없이 휴식 · 비행 전 대기 시간 확보':'Rest day, no diving, before your flight','시작 압력 (bar)':'Start pressure (bar)','탱크 (L)':'Tank (L)','항공 (원)':'Flights (KRW)','리조트 패키지 (원)':'Resort package (KRW)','장비 렌탈 (원)':'Gear rental (KRW)','1인 합계':'Total per person','2명 합계':'Total for 2',
'작성 중인 내용은 이 기기에 임시 저장돼요. 비밀번호와 첨부 파일은 임시 저장하지 않아요.':'Drafts are saved on this device. Passwords and attachments are not saved.',
'파란 점은 스쿠버, 주황 점은 프리다이빙 중심 추천 포인트예요. 작은 점과 숫자 묶음은 OpenStreetMap에 등록된 센터·포인트예요. 영업 여부는 직접 확인하세요. 지도 © OpenStreetMap contributors':'Blue dots are scuba spots, orange dots are freediving spots. Small dots and numbered clusters are centers and sites from OpenStreetMap; check whether they are open. Map © OpenStreetMap contributors',
'일반적으로 알려진 범위예요. 실제 상황은 날짜와 포인트마다 다르니 현지 브리핑을 따르세요.':'Typical ranges. Conditions vary by day and site, so follow the local briefing.',
'현지 시각 · 바다 모델 추정이라 항구 조석표와 30분~1시간 다를 수 있어요. 조류 포인트는 현지 조석표를 같이 보세요.':'Local time. Model estimate; may differ from harbor tide tables by 30–60 min. Check local tables for current dives.',
'아직 후기가 없어요. 다녀오셨다면 첫 후기를 남겨 주세요.':'No reviews yet. Been here? Leave the first one.','아직 입점한 업체가 없어요. 이곳 업체라면 입점·광고 메뉴에서 문의해 주세요.':'No listed businesses yet. If you run one here, get in touch via For business.',
'© OpenStreetMap contributors · 영업 여부는 직접 확인하세요.':'© OpenStreetMap contributors · check whether they are open.','정보가 틀렸나요?':'Something wrong?','수정 제안하기':'Suggest a fix','DAN 아시아·태평양 24시간':'DAN Asia-Pacific 24h',
'번호는 바뀔 수 있어요. 출발 전에 이용하는 센터에 응급 절차와 가장 가까운 챔버를 꼭 다시 물어보세요.':'Numbers can change. Before you go, ask your dive center about emergency procedures and the nearest chamber.',
'한국어 가능, 교육, 나이트록스, 프리다이빙 시설로 골라 보세요':'Filter by Korean-speaking staff, training, nitrox and freediving facilities','한국어 가능만':'Korean-speaking only',
'심사를 통과한 입점 리조트가 아직 없어요. 아래에서 포인트를 고르면 그 바다 근처 리조트·다이빙 센터를 지도 데이터로 볼 수 있어요.':'No verified resorts listed yet. Pick a spot below to see nearby resorts and dive centers from map data.','리조트 입점 안내':'List your resort',
'가격은 시즌과 인원마다 달라 업체 견적으로 확인해요. 후기는 예약 인증된 이용자만 남길 수 있고, 유료 노출은 ‘광고’로 표시돼요.':'Prices vary by season and group size, so ask for a quote. Paid placements are labelled “Ad”.',
'이 바다 근처 리조트 · 다이빙 센터 전체':'All resorts & dive centers near this spot','대표 85종과 전체 3만6천여 종 · 어디서 볼 수 있는지와 특징':'85 featured and 26,000+ species · where to see them',
'포인트 반경 30km 안 다이버·스노클러의 검증된 관찰 기록(iNaturalist) 기준이에요. 생물을 누르면 보호 등급과 비슷한 종이 나와요.':'Based on verified iNaturalist sightings within 30 km. Tap a species for protection status and look-alikes.',
'지금이 시즌인 포인트에서 자주 만나는 생물이에요.':'Often seen at spots that are in season now.','포인트 화면에서':'On a spot page, tap','를 누르면 이 지도에 표시돼요. 로그에 적은 포인트도 자동으로 다녀온 곳에 들어가요.':'to mark it here. Spots in your log count as visited too.','포인트 찾기 (초성도 돼요)':'Find a spot','예: 모알보알, ㅍㄹㅇ, Palau':'e.g. Moalboal, Palau','대표 생물 찾기 (초성도 돼요: ㄱㄹㅅㅇ)':'Find a species','예: 고래상어, ㅁㅌ, manta':'e.g. whale shark, manta','추천 포인트':'Featured spots',
'아직 못 가본 바다부터 다녀온 바다의 기억까지 한곳에 · 다이버는 모두 무료':'From seas you have yet to see to the ones you remember, all in one place · Free for divers',
'전 세계 스쿠버·프리다이빙 포인트, 리조트, 강사, 로그와 장비 정비까지 한 곳에서':'Scuba & freediving spots, resorts, instructors, logs and gear service worldwide'
};
var EN_MON=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var EN_SP=null;function enSpots(){if(EN_SP)return EN_SP;EN_SP={};SPOTS.forEach(function(s){if(EN[s.id])EN_SP[s.name]=EN[s.id];});return EN_SP;}
function enTok(s){var t=s.trim();if(!t)return s;var d=EN_D[t]||enSpots()[t];if(d)return d;
  var m;
  if((m=t.match(/^(\d{1,2})월$/)))return EN_MON[+m[1]];
  if((m=t.match(/^시즌 (.+)$/)))return 'Season '+enSeason(m[1]);
  if((m=t.match(/^(\d{1,2})~(\d{1,2})월$/)))return EN_MON[+m[1]]+'–'+EN_MON[+m[2]];
  if((m=t.match(/^최대 (\d+)m$/)))return 'max '+m[1]+'m';
  if((m=t.match(/^권장 (\d+)m$/)))return 'recommended '+m[1]+'m';
  if((m=t.match(/^추천 포인트 ([\d,]+)곳$/)))return m[1]+' featured spots';
  if((m=t.match(/^([\d,]+)곳$/)))return m[1]+' places';
  if((m=t.match(/^([\d,]+)회$/)))return m[1]+' dives';
  if((m=t.match(/^(간조|만조) (.+)$/)))return (m[1]==='간조'?'Low tide ':'High tide ')+m[2];
  if((m=t.match(/^다이빙 센터와 포인트 ([\d,]+)곳$/)))return m[1]+' dive centers & sites';
  if((m=t.match(/^센터·포인트 ([\d,]+)곳$/)))return m[1]+' centers & sites';
  if((m=t.match(/^(\d{1,2})월에 만나기 좋은 생물$/)))return 'Great to see in '+EN_MON[+m[1]];
  if((m=t.match(/^전체 ([\d,]+)종$/)))return 'All '+m[1]+' species';
  if((m=t.match(/^본 생물 ([\d,]+)종$/)))return m[1]+' seen';
  if((m=t.match(/^(.+) 지금 바다$/)))return 'Sea now · '+enTok(m[1]);
  if((m=t.match(/^Open-Meteo 예보 · (.+) 현지$/)))return 'Open-Meteo forecast · '+m[1]+' local';
  if((m=t.match(/^(.+) 공항 → 차량 약 (\d+)시간$/)))return enTok(m[1])+' airport → about '+m[2]+' h by car';
  if((m=t.match(/^리프 위 (\d+)m$/)))return 'reef top '+m[1]+'m';
  if((m=t.match(/^다녀온 곳 ([\d,]+)곳 · ([\d,]+)개 나라$/)))return 'Visited '+m[1]+' · '+m[2]+' countries';
  if((m=t.match(/^찜한 곳 ([\d,]+)곳$/)))return 'Saved '+m[1];
  if((m=t.match(/^·\s*(.*?)\s*·?$/))&&m[1]&&m[1]!==t){var inner=enTok(m[1]);if(inner!==m[1])return t.replace(m[1],inner);}
  if(t.indexOf(' · ')>0){var parts=t.split(' · '),hit=0,out=parts.map(function(p){var r=enTok(p);if(r!==p)hit++;return r;});if(hit)return out.join(' · ');}
  return s;}
function enSeason(x){return x.replace(/연중/g,'year-round').replace(/(\d{1,2})~(\d{1,2})월/g,function(a,b,c){return EN_MON[+b]+'–'+EN_MON[+c];}).replace(/(\d{1,2})월/g,function(a,b){return EN_MON[+b];}).replace(/최적/g,'best').replace(/만 개방/g,' only').replace(/중순/g,'mid').replace(/우기 제외/g,'except rainy season').replace(/겨울 드라이슈트/g,'drysuit in winter').replace(/지형은 겨울 인기/g,'topography popular in winter').replace(/가을/g,'autumn').replace(/여름 어군/g,'summer schools').replace(/그루퍼 산란/g,'grouper spawning').replace(/혹등고래/g,'humpbacks').replace(/밍크고래/g,'minke whales').replace(/고래상어/g,'whale sharks').replace(/귀상어/g,'hammerheads').replace(/몰라몰라/g,'mola mola').replace(/만타/g,'mantas').replace(/래기/g,'raggies').replace(/빛/g,'light beams');}
function enWalk(root){if(LANG!=='en'||!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,L=[];while((n=w.nextNode()))L.push(n);
  L.forEach(function(n){var v=n.nodeValue;if(!/[가-힣]/.test(v)||n.parentElement&&n.parentElement.closest('script,style,textarea,[data-noen]'))return;var lead=v.match(/^\s*/)[0],trail=v.match(/\s*$/)[0],r=enTok(v.trim());if(r!==v.trim())n.nodeValue=lead+r+trail;});
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function(e){['placeholder','aria-label','title'].forEach(function(a){var v=e.getAttribute(a);if(v&&/[가-힣]/.test(v)){var r=enTok(v);if(r!==v)e.setAttribute(a,r);}});});}
function enApply(){if(LANG!=='en')return;document.documentElement.lang='en';enWalk(document.body);}
var _after9=after;after=function(){_after9();enApply();};
var _rer9=rerender;rerender=function(){_rer9();enApply();};
if(LANG==='en'){var _mo9=new MutationObserver(function(ms){if(_mo9.busy)return;_mo9.busy=1;setTimeout(function(){_mo9.busy=0;ms.forEach(function(m){m.addedNodes.forEach(function(nd){if(nd.nodeType===1)enWalk(nd);else if(nd.nodeType===3&&nd.parentElement)enWalk(nd.parentElement);});});},30);});
  document.addEventListener('DOMContentLoaded',function(){_mo9.observe(document.body,{childList:true,subtree:true});});if(document.body)_mo9.observe(document.body,{childList:true,subtree:true});
  (function(){var st=document.createElement('style');st.textContent='.enbar{background:var(--soft);border-radius:12px;padding:8px 12px;font-size:13px;margin-bottom:12px}';document.head.appendChild(st);})();}
/* 언어 바꾸기: 바닥글과 계정 화면 */
var _foot9=foot;foot=function(){var h=_foot9();var b='<button class="lnk" type="button" id="langBtn" data-noen>'+(LANG==='en'?'한국어로 보기':'English')+'</button>';var i=h.indexOf('</div>');return i<0?h+b:h.slice(0,i)+' · '+b+h.slice(i);};
var _home9=V.home;V.home=function(){var h=_home9();if(LANG!=='en')return h;return h.replace('<div class="vh">','<p class="enbar" data-noen>English view (beta): menus, buttons, spot names and tags are in English. Longer descriptions are still in Korean.</p><div class="vh">');};
document.addEventListener('click',function(e){if(e.target.id!=='langBtn')return;var n=LANG==='en'?'ko':'en';LS.set('lang',n);location.reload();});

/* 영어 화면에서는 지도 글자도 영어로 */
if(LANG==='en'){koStyle=function(){if(KOSTYLE||!window.maplibregl)return;return fetch('https://tiles.openfreemap.org/styles/liberty').then(function(r){return r.json();}).then(function(st){st.layers.forEach(function(l){if(l.layout&&l.layout['text-field'])l.layout['text-field']=['coalesce',['get','name:en'],['get','name_int'],['get','name']];});KOSTYLE=st;}).catch(function(){});};}
if(LANG==='en'){var _hmb9=homeMapBox;homeMapBox=function(){return _hmb9().replace(/world_s\.webp/g,'world_en_s.webp').replace(/world\.webp/g,'world_en.webp');};}
/* 영어 화면: 포인트 소개 104곳 */
if(LANG==='en'){var EN_DESC={};Object.keys(EN_DESC).forEach(function(k){EN_D[k]=EN_DESC[k];});}

/* 130 다이빙 장비 리콜 알림 (미국 소비자제품안전위원회 CPSC 공개 자료) */
state.recalls=null;
function recallLoad(){if(state.recalls||recallLoad.b)return;var c=LS.get('recalls',null);if(c&&Date.now()-c.t<864e5){state.recalls=c.d;return;}recallLoad.b=1;
  var Q=['scuba','dive computer','diving regulator','buoyancy compensator','snorkel'];
  Promise.all(Q.map(function(q){return fetch('https://www.saferproducts.gov/RestWebServices/Recall?format=json&ProductName='+encodeURIComponent(q)).then(function(r){return r.ok?r.json():[];}).catch(function(){return [];});})).then(function(A){var seen={},L=[],since=new Date(Date.now()-6*365*864e5).toISOString();
    A.forEach(function(a){(a||[]).forEach(function(x){if(seen[x.RecallID]||String(x.RecallDate)<since)return;var txt=(x.Title+' '+(x.Products||[]).map(function(p){return p.Name;}).join(' ')).toLowerCase();if(!/scuba|dive|diving|regulator|snorkel|buoyancy|bcd|wetsuit|fins?\b/.test(txt))return;seen[x.RecallID]=1;L.push({id:x.RecallID,d:String(x.RecallDate).slice(0,10),t:x.Title,u:x.URL,p:(x.Products||[]).map(function(p){return p.Name;}).join(', '),m:(x.Manufacturers||[]).map(function(m){return m.Name;}).join(', ')});});});
    L.sort(function(a,b){return a.d<b.d?1:-1;});state.recalls=L;LS.set('recalls',{t:Date.now(),d:L});recallLoad.b=0;var c=cur();if(c==='gear'||c==='notice')rerender();});}
function myRecalls(){var R=state.recalls||[],G=state.gearL||[];return R.filter(function(r){var s=(r.t+' '+r.p+' '+r.m).toLowerCase();return G.some(function(g){var b=String(g.brand||'').toLowerCase().split(/\s+/)[0];return b.length>2&&s.indexOf(b)>=0;});});}
var _gear9=V.gear;V.gear=function(){var h=_gear9();recallLoad();var R=(state.recalls||[]).slice(0,6),M=myRecalls();
  var p='<div class="panel"><h2>최근 다이빙 장비 리콜 <span class="small">미국 CPSC</span></h2>'+(M.length?'<div class="notice" style="margin-bottom:8px">내 장비 브랜드와 겹치는 리콜이 '+M.length+'건 있어요. 모델명을 꼭 확인해 주세요.</div>':'')+(state.recalls?(R.length?'<div class="list">'+R.map(function(r){return item({tags:M.indexOf(r)>=0?[['내 브랜드','fr']]:[],t:esc(r.p||r.t),s:esc(r.d+' · '+(r.m||'')),r:'<a href="'+esc(r.u)+'" target="_blank" rel="noopener">자세히</a>'});}).join('')+'</div>':'<p class="empty" style="margin:0">최근 리콜이 없어요.</p>'):'<p class="empty" style="margin:0">불러오는 중이에요.</p>')+'<p class="small" style="margin:8px 0 0">미국에서 발표된 리콜이에요. 같은 모델이 한국에서도 팔렸을 수 있어요. 국내 리콜은 소비자24에서도 확인해 보세요.</p></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
var _notice9=V.notice;V.notice=function(){var h=_notice9();if(!(state.gearL||[]).length)return h;recallLoad();var M=myRecalls();if(!M.length)return h;
  var p='<div class="panel" style="border:2px solid var(--coral)"><h2>내 장비 리콜 확인</h2><div class="list">'+M.slice(0,5).map(function(r){return item({tags:[['리콜','fr']],t:esc(r.p||r.t),s:esc(r.d),r:'<a href="'+esc(r.u)+'" target="_blank" rel="noopener">자세히</a>'});}).join('')+'</div><p class="small" style="margin:8px 0 0">등록한 장비 브랜드와 겹치는 리콜이에요. 모델명이 같으면 판매처나 제조사에 바로 연락하세요.</p></div>';
  var k=h.indexOf('<div class="panel">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
/* 275 개인정보 처리방침에 자동 삭제 기간 안내 */
var _priv9=V.privacy;V.privacy=function(){var h=_priv9();var p='<div class="panel"><h2>자동으로 지우는 기록</h2><div class="list">'+item({t:'폼 열람·제출 기록 (어디서 이탈하는지 보는 통계)',r:'180일'})+item({t:'업체 페이지 조회수',r:'400일'})+item({t:'모임 참가자 채팅',r:'모임 날짜로부터 180일'})+item({t:'처리가 끝난 신고·제보',r:'1년'})+'</div><p class="small" style="margin:8px 0 0">매일 한 번 자동으로 지워요. 로그·게시물·메시지처럼 회원님이 직접 남긴 기록은 회원님이 지우거나 탈퇴할 때 지워져요.</p></div>';var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
/* 영어 화면: 대표 해양생물 85종 이름·특징·관찰 팁 */
if(LANG==='en'){var EN_LIFE={};Object.keys(EN_LIFE).forEach(function(k){if(!EN_D[k])EN_D[k]=EN_LIFE[k];});}
if(LANG==='en'){
  ['어류:Fish','연체동물:Molluscs','산호·말미잘·해파리:Corals, anemones & jellies','갑각류:Crustaceans','극피동물:Echinoderms','물범·바다사자:Seals & sea lions','듀공·매너티:Dugongs & manatees','해면:Sponges','멍게류:Sea squirts','갯지렁이류:Marine worms','납작벌레:Flatworms','이끼벌레:Bryozoans','빗해파리:Comb jellies','이름으로 찾기 (한글 · 영어 · 학명):Search by name (Korean, English or scientific)','파고:Wave height','안전:Safety','처음부터:Start over','0원:KRW 0','열대 전역:all tropical seas','모래 바닥 전역:sandy bottoms everywhere','호주 북부:northern Australia','동남아 일부:parts of Southeast Asia','코드홀:Cod Hole','용갈라:Yongala','마닐라:Manila','리프샤크:Reef sharks','바라쿠다:Barracuda','씬벵이:Frogfish','무당씬벵이:Painted frogfish','물 밖으로 나와 가이드에게 알리고, 통증이 심하거나 숨쉬기 힘들면 바로 응급 번호로 연락하세요.:Get out of the water and tell your guide. If pain is severe or breathing is hard, call emergency services right away.'].forEach(function(s){var i=s.indexOf(':');EN_D[s.slice(0,i)]=s.slice(i+1);});
  var _tok9=enTok;enTok=function(s){var t=s.trim(),m;
    if((m=t.match(/^관찰 ([\d,]+)건$/)))return m[1]+' sightings';
    if((m=t.match(/^(.+) · 관찰 ([\d,]+)건$/)))return _tok9(m[1])+' · '+m[2]+' sightings';
    if((m=t.match(/^전체 도감 ([\d,]+)종$/)))return 'Full guide · '+m[1]+' species';
    if((m=t.match(/^([\d,]+)종 · (\d+) \/ ([\d,]+)쪽$/)))return m[1]+' species · page '+m[2]+' / '+m[3];
    if((m=t.match(/^([\d,]+)초$/)))return m[1]+' s';
    return _tok9(s);};
  /* 3만6천 종 도감 카드: 영어 이름을 앞에, 한국어 설명은 숨김 */
  var _after9b=after;after=function(){_after9b();if(cur()!=='life')return;document.querySelectorAll('.spgrid .sp').forEach(function(c){var en=c.querySelector('.en'),b=c.querySelector('b');if(en&&b&&!c._en){c._en=1;b.textContent=en.textContent;en.remove();}c.querySelectorAll('.ab').forEach(function(a){if(/[가-힣]/.test(a.textContent))a.style.display='none';});});};
}
if(LANG==='en'){var EN_MORE={};Object.keys(EN_MORE).forEach(function(k){EN_D[k]=EN_MORE[k];});
 var _tok9c=enTok;enTok=function(s){var t=s.trim(),m;if((m=t.match(/^(\d+)분$/)))return m[1]+' min';if((m=t.match(/^(\d{4})년$/)))return m[1];return _tok9c(s);};}

/* 영어 사전 큰 묶음은 영어 화면일 때만 따로 받아요 (한국어 화면 속도 유지) */
if(LANG==='en'){fetch('/assets/en.json').then(function(r){return r.json();}).then(function(d){Object.keys(d).forEach(function(k){if(!EN_D[k])EN_D[k]=d[k];});enApply();}).catch(function(){});}
