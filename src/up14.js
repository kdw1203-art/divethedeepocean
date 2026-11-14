/* ===== 결정 5가지 반영 (2026-11-14) ===== */

/* 15 프로 요금제: 결제 연동 전까지 '출시 예정' 유지, 지금은 모든 업체가 무료 기능 전체 */
/* 19 광고 상품: 실제로 노출되는 리조트·장비 화면 광고칸만 판매 */
var _partner14=V.partner;V.partner=function(){var h=_partner14();
  h=h.replace(/(<div class="panel"><h2>광고 상품<\/h2>)[\s\S]*?(<p class="small" style="margin:8px 0 0">VAT 별도)/,'$1<div class="list">'+item({t:'리조트·장비 화면 광고칸',s:'지역을 골라 리조트 목록·장비 화면에 \'광고\' 표시와 함께 노출 · 운영자 확인 뒤 집행',r:'예산 직접 정하기'})+'</div><a class="btn btn-line" href="#ads" style="margin-top:10px">광고 신청하기</a>$2');
  h=h.replace('<p class="small" style="margin:8px 0 0">아래 건당 옵션과 할인은 필요할 때만 보세요. 모두 VAT 별도예요.</p>','<p class="small" style="margin:8px 0 0">프로 요금제는 결제 연동 뒤 열려요. 그 전까지는 모든 업체가 무료 기능 전체를 써요. 모두 VAT 별도예요.</p>');
  var ver='<div class="panel"><h2>인증 기준</h2><p style="margin:0 0 8px">\'인증 업체 ✓\'와 \'자격 확인 강사\'는 아래를 확인한 곳에만 달아요. <a href="#verify">자세히 보기</a></p><ul style="margin:0;padding-left:20px"><li>사업자등록 또는 현지 영업 허가</li><li>유효한 배상책임보험</li><li>강사는 소속 단체 공식 조회로 자격 번호 확인</li></ul></div>';
  var k=h.indexOf('<div class="panel"><h2>광고 상품</h2>');return k<0?h+ver:h.slice(0,k)+ver+h.slice(k);};

/* 18 인증 기준 공개 */
V.verify=function(){setTitle('인증 기준');return '<div class="vh"><div><h1>인증 기준</h1><p>무엇을 확인하고 배지를 달아 주는지 공개해요</p></div></div><div class="cols"><div class="panel doc"><h2>인증 업체 ✓</h2><p>아래 다섯 가지를 모두 확인한 리조트·다이빙 센터·리브어보드·정비점에 달아요.</p><ol><li><b>영업 자격:</b> 사업자등록증(한국) 또는 현지 영업 허가증. 상호가 업체 이름과 같아야 해요.</li><li><b>보험:</b> 다이빙 활동을 보장하는 배상책임보험 증권. 보장 기간이 지금 유효해야 해요.</li><li><b>강사 자격:</b> 교육을 판매하면 소속 강사 한 명 이상의 자격을 단체 공식 조회로 확인해요.</li><li><b>연락:</b> 등록한 메일이나 전화로 실제 연락이 되는지 한 번 확인해요.</li><li><b>위치:</b> 홈페이지·지도에 나오는 주소가 신청한 주소와 같은지 확인해요.</li></ol><p>보험 만료일이 지나거나 신고가 확인되면 배지를 내리고 다시 심사해요. 1년마다 서류를 다시 받아요.</p></div>'+
  '<div class="panel doc"><h2>자격 확인 강사</h2><p>소속 단체의 공식 조회 페이지에서 아래를 확인한 강사에게 달아요.</p><ol><li>이름과 강사 번호가 일치하는지</li><li>강사 등급(인스트럭터 이상)과 현재 활동 상태(Teaching status·Active)</li><li>프로필 사진과 신분이 같은 사람인지 (화상 통화 또는 신분증 일부 확인, 저장하지 않아요)</li></ol><p>확인 대상 단체: PADI, SSI, NAUI, CMAS, SDI·TDI, RAID, BSAC, AIDA, Molchanovs, PADI Freediver 등. 1년마다 다시 확인해요.</p><h2>배지가 뜻하지 않는 것</h2><p>배지는 서류와 자격을 확인했다는 뜻이고, 안전이나 서비스 품질을 보증하지는 않아요. 다이빙 전에는 장비·브리핑·버디 확인을 직접 하세요.</p></div></div>'+foot();};
var _bizpage14=V.bizpage;V.bizpage=function(i){return _bizpage14(i).replace(/<span class="tag ok">인증 업체 ✓<\/span>/g,'<a class="tag ok" href="#verify" style="text-decoration:none">인증 업체 ✓</a>');};
var _biz14=V.biz;V.biz=function(a){return _biz14(a).replace(/<span class="tag ok">인증 업체 ✓<\/span>/g,'<a class="tag ok" href="#verify" style="text-decoration:none">인증 업체 ✓</a>');};

/* 45 베타 모집: 추천 코드 저장 + 베타 안내 화면 */
function refSave(){if(!BE.on||!BE.user||refSave.u===BE.user.id)return;var v=fstate('signup').v,c=(v&&v.ref||'')||LS.get('ref','');if(!c)return;refSave.u=BE.user.id;BE.sb.rpc('set_ref',{code:String(c)}).then(function(){LS.set('ref','');});}
(function(){var m=/[?&]ref=([A-Za-z0-9_-]{2,40})/.exec(location.search);if(m){LS.set('ref',m[1].toUpperCase());var st=fstate('signup');st.v.ref=st.v.ref||m[1].toUpperCase();}})();
V.beta=function(){setTitle('베타 다이버 모집');var c=LS.get('ref','')||'BETA';
  return '<div class="vh"><div><h1>베타 다이버 · 업체 모집</h1><p>정식 출시 전에 먼저 써 보고 고칠 점을 알려 주실 분을 찾아요</p></div></div><div class="cols"><div class="panel"><h2>다이버</h2><ul style="margin:0 0 12px;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>다녀온 바다를 지도에 모으고, 로그를 다이브 컴퓨터에서 바로 가져와요</li><li>포인트별 생물·바다 예보·응급 연락처를 한 화면에서 봐요</li><li>베타 기간에 남긴 로그·후기에는 \'베타 다이버\' 표시가 남아요</li></ul><a class="btn btn-pri" href="#signup">추천 코드 '+esc(c)+'로 가입하기</a></div>'+
  '<div class="panel"><h2>리조트 · 강사</h2><ul style="margin:0 0 12px;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>입점비·월 요금 없음, 처음 6개월 예약 수수료 3%</li><li>먼저 입점한 5곳은 지역 첫 화면에 우선 소개해요</li><li>서류 심사 뒤 \'인증 업체 ✓\' 배지 (<a href="#verify">기준</a>)</li></ul><a class="btn btn-line" href="#biz">업체 등록 시작</a></div></div>'+
  '<div class="panel"><h2>참여 방법</h2><ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>가입할 때 추천 코드 칸에 받은 코드를 적어요</li><li>2주 동안 로그 3개 이상, 다녀온 곳·찜한 곳 표시, 사진 한 장을 올려 봐요</li><li>불편했던 점은 <a href="#help">고객 문의</a>의 \'제안\'으로 보내 주세요</li></ol></div>'+foot();};
state.refStat=null;
var _adm14=V.admin;V.admin=function(){var h=_adm14();if(!BE.on||!state.me||!state.me.admin||state.aal!=='aal2')return h;
  if(!state.refStat&&!V.admin.r14){V.admin.r14=1;BE.sb.rpc('admin_ref_stats').then(function(r){V.admin.r14=0;state.refStat=r.data||[];if(cur()==='admin')rerender();});}
  var R=state.refStat||[],base=location.origin+'/?ref=';
  var p='<div class="panel"><h2>베타 모집 현황</h2>'+(R.length?'<div class="list">'+R.map(function(x){return item({t:esc(x.code),r:x.n+'명'});}).join('')+'</div>':'<p class="empty" style="margin:0">아직 추천 코드로 가입한 사람이 없어요.</p>')+'<p class="small" style="margin:8px 0 0">모집 경로마다 다른 코드를 쓰면 어디서 많이 왔는지 알 수 있어요. 링크 예: <code>'+esc(base)+'CAFE</code> · <code>'+esc(base)+'INSTA</code> · <code>'+esc(base)+'BIZ</code> (링크로 들어오면 가입할 때 코드가 저절로 들어가요)</p></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
var _foot14=foot;foot=function(){return _foot14().replace('<a href="#help"><b>고객 문의</b></a>','<a href="#help"><b>고객 문의</b></a> · <a href="#verify">인증 기준</a> · <a href="#beta">베타 모집</a>');};
var _after14=after;after=function(){_after14();refSave();};

if(LANG==='en'){var EN14={'인증 기준':'Verification','베타 모집':'Beta','베타 다이버 모집':'Beta divers','리조트·장비 화면 광고칸':'Ad slots on resort and gear pages','예산 직접 정하기':'Set your own budget','광고 신청하기':'Apply for ads','업체 등록 시작':'Register your business'};Object.keys(EN14).forEach(function(k){EN_D[k]=EN14[k];});}
