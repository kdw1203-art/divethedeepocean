/* ===== 영어 화면: 새로 넣은 화면 · 남은 문구 번역 ===== */
if(LANG==='en'){var EN86={};Object.keys(EN86).forEach(function(k){EN_D[k]=EN86[k];}); /* 사전 본문은 en2.json 으로 분리 (up135 에서 받음) */
var SEAS={'겨울':'Winter','봄':'Spring','여름':'Summer','가을':'Autumn'};
var _enTok86=enTok;enTok=function(s){var r=_enTok86(s);if(r!==s)return r;var t=String(s).trim(),m,f;
  if((m=t.match(/^([\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF])\s*(.+)$/))){f=_enTok86(m[2]);if(f!==m[2])return m[1]+' '+f;}
  if((m=t.match(/^([A-Z][a-z]{2}) · (겨울|봄|여름|가을) 추천$/)))return m[1]+' · '+SEAS[m[2]]+' picks';
  if((m=t.match(/^(.+) 오늘 날씨$/)))return "Today's weather · "+_enTok86(m[1]);
  if((m=t.match(/^(.+) 조석$/)))return 'Tides · '+_enTok86(m[1]);
  if((m=t.match(/^(.+) 가는 길$/)))return 'Getting to '+_enTok86(m[1]);
  if((m=t.match(/^(.+) 수심 프로필: (\d+)m에서 (\d+)m까지$/)))return _enTok86(m[1])+' depth: '+m[2]+'–'+m[3]+'m';
  if((m=t.match(/^([\d,]+)종$/)))return m[1]+' species';
  if((m=t.match(/^전체 ([\d,]+)$/)))return 'All '+m[1];
  if((m=t.match(/^다녀온 곳 ([\d,]+)$/)))return 'Visited '+m[1];
  if((m=t.match(/^찜한 곳 ([\d,]+)$/)))return 'Saved '+m[1];
  if((m=t.match(/^추천 포인트 ([\d,]+)$/)))return 'Featured '+m[1];
  if((m=t.match(/^약 ([\d.]+)℃$/)))return 'about '+m[1]+'℃';
  if((m=t.match(/^회원 ([\d,]+)명$/)))return m[1]+' members';
  if((m=t.match(/^([\d,]+)명$/)))return m[1];
  if((m=t.match(/^([\d,]+)원$/)))return '₩'+m[1];
  if((m=t.match(/^([\d,]+)건$/)))return m[1];
  if((m=t.match(/^([\d,]+)분$/)))return m[1]+' min';
  if((m=t.match(/^([\d,]+)개$/)))return m[1];
  if((m=t.match(/^(.+) 님의 로그북$/)))return m[1]+"'s logbook";
  if((m=t.match(/^(.+) (\d)\/5$/)))return _enTok86(m[1])+' '+m[2]+'/5';
  if((m=t.match(/^로그 ([\d,]+)회$/)))return m[1]+' logs';
  if((m=t.match(/^최근 ([\d]+)일$/)))return 'Last '+m[1]+' days';
  if((m=t.match(/^([1-5])점$/)))return m[1]+' ★';
  if((m=t.match(/^평년 (.+)$/)))return 'Normal '+m[1];
  if((m=t.match(/^(.+)에서 · 주기 (\d+)초$/)))return 'From '+_enTok86(m[1])+' · '+m[2]+' s';
  if((m=t.match(/^(.+)으로 · ([\d.]+)노트$/)))return 'Toward '+_enTok86(m[1])+' · '+m[2]+' kn';
  if((m=t.match(/^(\d+)\/(\d+) (\d+:\d+) 무렵$/)))return 'around '+m[1]+'/'+m[2]+' '+m[3];
  if((m=t.match(/^(.+) 현지 시각 기준 · 30분마다 새로 받아요$/)))return m[1]+' local time · updates every 30 min';
  if((m=t.match(/^합계 (.+)$/)))return 'Total '+m[1];
  return s;};
['북','남','동','서','북동','북서','남동','남서'].forEach(function(k,i){var e=['north','south','east','west','northeast','northwest','southeast','southwest'][i];EN_D[k+'쪽']=e;});
/* 약관 · 개인정보 · 환불 같은 법적 문서는 한국어 원문이 기준이라고 위에 알려요 */
var _after86=after;after=function(){_after86();if(/^(terms|privacy|refund|rules)$/.test(cur())&&!document.getElementById('enLegal')){var v=document.querySelector('#main .view .vh');if(v){var p=document.createElement('p');p.id='enLegal';p.className='small';p.setAttribute('data-noen','1');p.textContent='This document is provided in Korean. The Korean version is the official one.';v.after(p);}}};}
if(LANG==='en'){Object.assign(EN_D,{'겨울 추천':'Winter picks','봄 추천':'Spring picks','여름 추천':'Summer picks','가을 추천':'Autumn picks','가평':'Gapyeong','용인':'Yongin','시흥':'Siheung','서울':'Seoul','성남':'Seongnam','수원':'Suwon','부산':'Busan','인천':'Incheon','대구':'Daegu','대전':'Daejeon','광주':'Gwangju','제주':'Jeju','연중':'Year-round','연중 (겨울 드라이슈트)':'Year-round (drysuit in winter)','다이브 0회':'0 dives','f/1.4 (가장 흐리게)':'f/1.4 (most blur)','f/8 (살짝)':'f/8 (slight)','+ 지금 설정 저장':'+ Save current settings','24시간 · Korean':'24 h · Korean','정비점용 요금제예요.':'Plan for service shops.','리조트·강사·정비점 페이지를 만들고 예약·견적 요청을 받아요.':'Create a resort, instructor or service page and get booking requests.','지역을 골라 리조트·장비 화면에 노출해요.':'Show on resort and gear pages by region.','정비 예약':'Service booking','월 4,900원':'₩4,900/mo','다국어':'Multilingual','후기 답글':'Review replies','렌탈 풀세트':'Full rental set','나이트':'Night dive','시야':'Visibility','버디':'Buddy','바다거북':'Sea turtle','일정':'Schedule','사진첩':'Albums','초대':'Invite','밴드처럼 계속 이어지는 모임방':'Ongoing group rooms','밴드처럼 계속 이어지는 다이빙 모임방':'Ongoing dive group rooms','환불':'Refund','우리동네이야기':'Woori Dongne Iyagi','대표 고대웅':'CEO Ko Daewoong'});
EN_D['Cancel · 환불은 Cancellation & refunds을 따라요']='Cancellations follow the refund policy';}
if(LANG==='en'){Object.assign(EN_D,{'사업자등록번호':'Business reg. no.','통신판매업':'E-commerce reg.','서쪽에서':'From west','동쪽에서':'From east','남쪽에서':'From south','북쪽에서':'From north','남동쪽에서':'From southeast','남서쪽에서':'From southwest','북동쪽에서':'From northeast','북서쪽에서':'From northwest','이집트':'Egypt','필리핀':'Philippines','일본 오키나와':'Okinawa, Japan','아도보':'Adobo','시니강':'Sinigang','레촌':'Lechon','망고':'Mango','팁 문화가 있어요':'Tipping is common','오키나와 소바':'Okinawa soba','고야 참푸루':'Goya champuru','타코라이스':'Taco rice','현금만 받는 가게가 있어요':'Some shops are cash only','팟타이':'Pad thai','솜땀':'Som tam','똠얌':'Tom yum','섬은 페리 시간에 맞춰 일정 짜기':'Plan islands around ferry times','나시고렝':'Nasi goreng','사테':'Satay','미고렝':'Mie goreng','발리 외 지역은 국내선 연결 확인':'Outside Bali, check domestic flights','코샤리':'Koshari','타진':'Tagine','생과일 주스':'Fresh juice','다합은 장기 체류자가 많아요':'Dahab has many long-stay divers','마스후니':'Mas huni','참치 커리':'Tuna curry','리조트 섬과 로컬 섬의 규칙이 달라요':'Resort and local islands have different rules','제주 서귀포 문섬':'Munseom, Seogwipo, Jeju','차량 약 1시간 30분':'about 1 h 30 min by car','차량 약 1시간':'about 1 h by car'});}
