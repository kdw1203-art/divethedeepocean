/* ===== 자격증 안내: 단체 · 단계 · 필요 조건 · 내 다음 단계 (강사 · 자격증 메뉴) ===== */
/* 출처: PADI · SSI · AIDA 공식 안내와 교육 센터 공지 (2026년 기준). 단체 기준은 바뀔 수 있어 수강 전 강사에게 꼭 확인. */
var CERT_AG=[['PADI','세계에서 가장 많이 발급하는 단체. 전 세계 센터가 많아 여행지에서 교육받기 쉬워요.','https://www.padi.com'],
 ['SSI','센터 중심 교육. 스페셜티와 로그 수가 쌓이면 다음 등급을 자동으로 인정해 줘요.','https://www.divessi.com'],
 ['NAUI','미국 비영리 단체. 강사 재량이 큰 편이에요.','https://www.naui.org'],
 ['CMAS','세계수중연맹. 별 1~4개(★) 체계로, 유럽 · 한국 동호회에서 많이 써요.','https://www.cmas.org'],
 ['BSAC','영국 다이빙 클럽 중심 단체.','https://www.bsac.com'],
 ['SDI · TDI','레크리에이션(SDI)과 테크니컬(TDI)을 같이 운영해요.','https://www.tdisdi.com'],
 ['RAID','온라인 이론 중심, 리브리더(재호흡기)까지 이어져요.','https://www.diveraid.com'],
 ['GUE · IANTD','테크니컬 · 동굴 다이빙 중심 단체.','https://www.gue.com'],
 ['AIDA','프리다이빙 국제 단체. 대회 · 기록 공인도 해요.','https://www.aidainternational.org'],
 ['Molchanovs · Apnea Total','프리다이빙 전문 교육 단체.','https://molchanovs.com']];
/* [이름, 조건, 할 수 있게 되는 것] */
var CERT_LD={padi:[['오픈워터 다이버','만 10세 이상 (10~14세는 주니어) · 수영 200m 또는 스노클 300m · 바다 실습 4회','버디와 18m까지 (주니어 12m)'],
  ['어드밴스드 오픈워터','오픈워터 · 만 12세 이상 · 딥 · 수중 내비게이션 포함 어드벤처 다이브 5회','30m까지 (12~14세 21m)'],
  ['레스큐 다이버','어드밴스드(또는 내비게이션을 한 어드벤처 다이버) · 만 12세 이상 · 2년 안에 응급처치(EFR) 교육','나와 버디의 문제를 미리 막고 구조'],
  ['마스터 스쿠버 다이버','레스큐 · 스페셜티 5개 · 로그 50회','레크리에이션 최고 등급 (과정이 아니라 인정 등급)'],
  ['다이브마스터 (프로)','만 18세 이상 · 레스큐 · 2년 안에 EFR · 1년 안에 의사 소견 · 로그 40회로 시작, 60회에 인증','가이드 · 강사 보조'],
  ['오픈워터 강사','다이브마스터 · 다이버가 된 지 6개월 · IDC 수료 · 강사 시험 때 로그 100회','오픈워터부터 교육']],
 ssi:[['오픈워터 다이버','만 10세 이상 · 바다 실습 포함','버디와 18m까지'],
  ['스페셜티 다이버','스페셜티 2개 · 로그 12회','자동 인정'],
  ['어드밴스드 오픈워터','스페셜티 4개 · 로그 24회','자동 인정'],
  ['다이버 스트레스 & 레스큐','오픈워터 · 응급처치 교육','구조 · 문제 예방'],
  ['마스터 다이버','딥 다이빙 · 스트레스 & 레스큐 · 스페셜티 3개 더 · 로그 50회','자동 인정 (레크리에이션 최고 등급)'],
  ['다이브 가이드 (프로)','만 15세 이상 · 스트레스 & 레스큐 · 로그 40회 (25시간 이상)','인증 다이버 가이드'],
  ['다이브마스터','만 18세 이상 · 로그 60회 (40시간 이상)','강사 보조까지']],
 free:[['PADI 베이직 프리다이버','만 12세 이상 · 수영장 과정만','수영장 6m까지'],
  ['PADI 프리다이버 / AIDA 2','PADI 만 15세 · AIDA 만 18세(16~17세 보호자 동의) · 수영 200m','바다 10~16m (AIDA 2 기준 STA 2분 · DYN 40m · CWT 16m)'],
  ['PADI 어드밴스드 / AIDA 3','앞 단계 자격 · PADI 만 15세','16~24m (AIDA 3 기준 STA 2분45초 · DYN 55m · CWT 24m)'],
  ['PADI 마스터 / AIDA 4','앞 단계 자격 · 만 18세','24~40m · 훈련 계획 · 대회 준비'],
  ['프리다이빙 강사','마스터 등급 · 강사 과정 수료','프리다이빙 교육']]};
/* 내 자격으로 다음 단계 고르기 */
function certNext(cert,logs){var c=String(cert||'').toLowerCase(),n=logs||0,s=[];
  if(!c||/없|none|체험/.test(c))return [['오픈워터 다이버','처음 자격이에요. 이론 · 수영장 · 바다 4회로 보통 3~4일 걸려요.']];
  if(/강사|instructor/.test(c))return [['스페셜티 강사 · 상위 강사 과정','가르칠 수 있는 스페셜티를 늘리거나 MSDT · IDC 스태프로 이어가요.']];
  if(/마스터|dm|divemaster|가이드/.test(c)&&!/스쿠버 다이버|master scuba/.test(c))return [['오픈워터 강사 (IDC)',n>=100?'로그 '+n+'회 — 강사 시험 조건(100회)을 채웠어요.':'강사 시험까지 로그 '+(100-n)+'회 더 필요해요 (지금 '+n+'회).']];
  if(/레스큐|rescue/.test(c)||/마스터 스쿠버|master scuba/.test(c)){s.push(['다이브마스터 (프로)',n>=40?'로그 '+n+'회 — 시작 조건(40회)을 채웠어요. 만 18세 · 2년 안 EFR · 1년 안 의사 소견을 준비해요.':'시작까지 로그 '+(40-n)+'회 더 필요해요 (지금 '+n+'회).']);if(!/마스터/.test(c))s.push(['마스터 스쿠버 다이버',n>=50?'로그 50회를 채웠어요. 스페셜티 5개를 맞추면 신청할 수 있어요.':'스페셜티 5개와 로그 50회가 필요해요 (지금 '+n+'회).']);return s;}
  if(/어드|advanced|aow/.test(c))return [['레스큐 다이버','2년 안에 응급처치(EFR) 교육을 받았는지 먼저 확인해요. 실력이 가장 많이 느는 과정이라는 평이 많아요.'],['나이트록스 · 딥 스페셜티','나이트록스는 바닥 시간을 늘려 주고, 딥은 40m까지 열어 줘요.']];
  if(/오픈|open|ow/.test(c))return [['어드밴스드 오픈워터','딥 · 내비게이션 포함 5회 다이빙으로 30m까지 열려요. SSI는 스페셜티 4개 · 로그 24회면 자동 인정이에요 (지금 '+n+'회).'],['나이트록스','이론 중심이라 하루면 돼요. 같은 수심에서 더 오래 머물 수 있어요.']];
  if(/프리|free|aida/.test(c))return [['다음 프리다이빙 단계','지금 기록(STA · DYN · CWT)이 다음 단계 인증 기준에 얼마나 남았는지 강사와 확인해요.']];
  return [['내 자격 확인','내 정보에서 자격을 적으면 다음 단계를 골라 드려요.']];}
function certGuideHtml(){var me=state.me||{},logs=(state.userLogs||[]).length,nx=certNext(me.cert,logs),tab=state.certTab||'padi',T={padi:'PADI 스쿠버',ssi:'SSI 스쿠버',free:'프리다이빙'};
  return '<div class="panel" id="certGuide"><h2>자격증 안내</h2><p class="small" style="margin:0 0 10px">어떤 자격이 있고, 다음 단계로 가려면 무엇이 필요한지 정리했어요. 단체 기준은 바뀔 수 있으니 수강 전에 강사에게 한 번 더 확인해요.</p>'+
   '<div class="mystat" style="margin-bottom:12px"><b>'+(me.cert?esc(me.cert):'자격 미입력')+'</b> · 로그 '+logs+'회'+(BE.user&&!me.cert?' · <a href="#profile">내 자격 적기</a>':'')+'</div>'+
   '<h3 style="margin:0 0 6px;font-size:15px">내 다음 단계</h3><div class="list">'+nx.map(function(x){return '<div class="item"><span class="tx"><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></span></div>';}).join('')+'</div>'+
   '<h3 style="margin:16px 0 6px;font-size:15px">단계와 필요 조건</h3><div class="sttabs" role="group" aria-label="단체" style="display:flex;gap:6px;flex-wrap:wrap">'+Object.keys(T).map(function(k){return '<button class="chip" type="button" data-certtab="'+k+'" aria-pressed="'+(tab===k)+'">'+T[k]+'</button>';}).join('')+'</div>'+
   '<ol class="certld">'+CERT_LD[tab].map(function(x){return '<li><b>'+esc(x[0])+'</b><span>조건: '+esc(x[1])+'</span><span>할 수 있는 것: '+esc(x[2])+'</span></li>';}).join('')+'</ol>'+
   '<p class="small" style="margin:6px 0 0">단체끼리는 대부분 같은 등급으로 인정해 줘요. 예: PADI 오픈워터 → SSI 어드밴스드 과정 수강 가능, CMAS ★ ≈ 오픈워터, ★★ ≈ 어드밴스드 · 레스큐 근처.</p>'+
   '<details style="margin-top:12px"><summary><b>교육 단체 '+CERT_AG.length+'곳</b></summary><div class="list" style="margin-top:6px">'+CERT_AG.map(function(a){return '<a class="item" href="'+a[2]+'" target="_blank" rel="noopener"><span class="tx"><b>'+esc(a[0])+'</b><span>'+esc(a[1])+'</span></span></a>';}).join('')+'</div></details>'+
   '<details style="margin-top:8px"><summary><b>자격증 기본 상식</b></summary><ul style="margin:6px 0 0;padding-left:18px;line-height:1.6"><li>자격증은 평생 유효해요. 다만 6개월~1년 넘게 쉬면 리프레시(재교육) 다이빙을 권해요.</li><li>잃어버리면 단체 앱 · 누리집에서 전자 카드로 다시 받을 수 있어요.</li><li>나이트록스 자격이 없으면 리조트에서 나이트록스 탱크를 받지 못해요.</li><li>로그북은 다음 과정 조건(로그 수)을 증명하는 기록이에요. 서명 · 강사 도장을 받아 두면 좋아요.</li><li>프로 등급(다이브마스터 이상)은 매년 단체 회원 갱신 · 보험이 필요해요.</li></ul></details></div>';}
(function(){var st=document.createElement('style');st.textContent='.certld{margin:10px 0 0;padding-left:20px}.certld li{margin:0 0 10px}.certld li b{display:block}.certld li span{display:block;font-size:13px;color:var(--mut);line-height:1.5}';document.head.appendChild(st);})();
var _edu75=V.edu;V.edu=function(){var h=_edu75(),g=certGuideHtml(),i=h.indexOf('</div></div>');return i<0?h+g:h.slice(0,i+12)+g+h.slice(i+12);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-certtab]');if(!t)return;state.certTab=t.dataset.certtab;var b=document.getElementById('certGuide');if(b){var w=document.createElement('div');w.innerHTML=certGuideHtml();b.replaceWith(w.firstChild);}});
