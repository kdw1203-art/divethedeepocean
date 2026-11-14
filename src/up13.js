/* ===== 실사용 준비 2차 ===== */

/* 21 · 23 바다 예보와 생물 자료는 우리 서버(/api)를 거쳐 공유 캐시로. 실패하면 원래 주소로 바로 */
(function(){if(!window.fetch||/^(localhost|127\.)/.test(location.hostname))return;var _f=window.fetch.bind(window);
  function via(u){var m=/^https:\/\/marine-api\.open-meteo\.com\/v1\/marine\?(.*)$/.exec(u);if(m){var q=new URLSearchParams(m[1]),k=q.get('current')?'now':/sea_level/.test(q.get('hourly')||'')?'tide':/wave_height_max/.test(q.get('daily')||'')?'week':null;if(k)return '/api/marine?lat='+q.get('latitude')+'&lon='+q.get('longitude')+'&kind='+k;}
    m=/^https:\/\/api\.inaturalist\.org\/v1\/([a-z_\/0-9,]+)\??(.*)$/.exec(u);if(m)return '/api/inat?p='+encodeURIComponent(m[1])+(m[2]?'&'+m[2]:'');return null;}
  window.fetch=function(u,o){var s=typeof u==='string'?u:null,p=s&&(!o||!o.method||o.method==='GET')?via(s):null;if(!p)return _f(u,o);
    return _f(p).then(function(r){return r.ok?r:_f(u,o);},function(){return _f(u,o);});};})();

/* 23 OSM 기본 타일은 WebGL이 안 되는 기기에서만. 지도 스타일을 못 받았으면 다시 받아서 붙이기 */
var _base13=baseLayer;baseLayer=function(L){if(KOSTYLE||!window.maplibregl||!L.maplibreGL)return _base13(L);
  var g=L.layerGroup();KOSTYLE=null;var p=koStyle();(p||Promise.resolve()).then(function(){if(KOSTYLE){try{g.addLayer(_base13(L));}catch(e){}}else{setTimeout(function(){var q=koStyle();if(q)q.then(function(){if(KOSTYLE)g.addLayer(_base13(L));else toast('지도 배경을 불러오지 못했어요. 잠시 뒤 새로고침해 주세요.');});},3000);}});return g;};

/* 사업자 정보·책임자: 운영자 화면에서 입력하면 하단·약관에 바로 반영 */
function cfgLoad(){if(!BE.on||cfgLoad.b)return;cfgLoad.b=1;BE.sb.from('site_config').select('k,v').then(function(r){(r.data||[]).forEach(function(x){if(x.k==='company'&&x.v&&x.v.name)COMPANY=x.v;});if(COMPANY)rerender();});}

/* 내 프로필 추가 정보(정지 여부·동의한 약관 버전) */
var TERMS_V='2026-11-14';
function meX(){if(!BE.on||!BE.user||!state.me||meX.u===BE.user.id)return;meX.u=BE.user.id;
  BE.sb.from('profiles').select('suspended_until,suspend_reason,terms_version').eq('id',BE.user.id).maybeSingle().then(function(r){if(!r.data||!state.me)return;Object.assign(state.me,r.data);
    var su=fstate('signup').v;if(state.me.terms_version!==TERMS_V&&su&&su.tos&&su.priv){BE.sb.rpc('agree_terms',{v:TERMS_V}).then(function(){state.me.terms_version=TERMS_V;});return;}
    rerender();});}
function termsBar(){var m=state.me;if(!BE.user||!m||!('terms_version' in m)||m.terms_version===TERMS_V||termsBar.no)return '';
  return '<div class="notice" id="termsBar" style="margin:0 0 12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:200px">'+(m.terms_version?'이용약관·개인정보 처리방침이 바뀌었어요 ('+TERMS_V+').':'이용약관·개인정보 처리방침 동의 기록이 없어요.')+' <a href="#terms">약관</a> · <a href="#privacy">개인정보</a></span><button class="btn btn-pri" type="button" data-agree="1" style="min-height:36px;height:36px">확인하고 동의</button><button class="chip" type="button" data-agree="0">나중에</button></div>';}
document.addEventListener('click',function(e){var t=e.target.closest('[data-agree]');if(!t)return;if(t.dataset.agree==='0'){termsBar.no=1;rerender();return;}t.disabled=true;
  BE.sb.rpc('agree_terms',{v:TERMS_V}).then(function(r){if(r.error){toast('저장하지 못했어요: '+r.error.message);t.disabled=false;return;}state.me.terms_version=TERMS_V;toast('동의를 기록했어요');rerender();});});

/* 26 개인정보 처리방침: 국외 이전·외부 자료 호출·동의 기록 */
var _priv13=V.privacy;V.privacy=function(){var h=_priv13(),c=COMPANY;
  var add='<h2>국외 이전</h2>'+tbl(['받는 곳','나라','옮기는 정보','목적','보관 기간'],[['Vercel Inc.','미국','접속 기록(IP 주소, 브라우저 정보, 요청 시각)','웹사이트 전송·보안','최대 30일 (Vercel 정책)'],['Supabase Inc.','대한민국(서울 리전) 저장, 운영 지원은 미국','회원 정보와 올린 자료 전체','회원 인증, 데이터 저장','탈퇴 때까지']])+
    '<p>서비스를 쓰면 접속할 때마다 네트워크로 옮겨져요. 국외 이전을 원하지 않으면 가입하지 않거나 탈퇴할 수 있지만, 그 경우 서비스를 쓸 수 없어요.</p>'+
    '<h2>외부 자료 호출</h2><p>바다 예보(Open-Meteo)와 생물 관찰 기록(iNaturalist)은 우리 서버를 거쳐 받아 와요. 이때 보내는 것은 다이빙 포인트의 좌표뿐이고 회원 정보는 보내지 않아요.</p>'+
    '<h2>동의 기록</h2><p>어느 버전의 약관에 언제 동의했는지 기록해요. 현재 버전은 '+TERMS_V+'예요.</p>'+
    '<h2>1:1 문의</h2><p>문의할 때 적은 이메일과 내용은 답변과 분쟁 대응을 위해 3년 동안 보관한 뒤 지워요.</p>';
  if(c&&c.privacy)h=h.replace('개인정보 보호책임자 정보는 사업자 등록 정보와 함께 곧 적어 둘게요.',esc(c.privacy));
  h=h.replace('<h2>7. 책임자</h2>',add+'<h2>7. 책임자</h2>');return h;};
var _terms13=V.terms;V.terms=function(){var h=_terms13(),c=COMPANY;var who=c&&c.name?esc(c.name)+' (대표 '+esc(c.ceo||'')+', 사업자등록번호 '+esc(c.bizno||'')+(c.addr?', '+esc(c.addr):'')+(c.email?', '+esc(c.email):'')+')':'운영자 사업자 정보는 출시 전에 이곳과 화면 하단에 적어요.';
  var k=h.lastIndexOf('</div><div class="foot">');var add='<h2>운영자와 중개자 고지</h2><p>이 서비스의 운영자는 '+who+'예요. 리조트·강사·정비점의 상품과 서비스는 각 업체가 판매하고 책임지며, Dive the deep ocean은 예약과 연락을 이어 주는 통신판매중개자예요. 업체와 이용자 사이의 계약 당사자가 아니에요.</p><p class="small">약관 버전 '+TERMS_V+'</p>';
  return k<0?h:h.slice(0,k)+add+h.slice(k);};

/* 28 예약 화면: 판매자와 중개자 고지 */
var _biz13=V.biz;V.biz=function(arg){var h=_biz13(arg);if(h.indexOf('id="bookForm"')<0)return h;var b=String(arg).charAt(0)==='d'&&state.bizPub?state.bizPub[+String(arg).slice(1)]:null;
  return h.replace('<div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">예약 요청 보내기</button>','<p class="small" style="grid-column:1/-1;margin:0;padding:10px 12px;background:var(--sand,#f6f1e7);border-radius:10px">이 예약의 판매자는 <b>'+esc(b&&b.name||'이 업체')+'</b>예요. Dive the deep ocean은 예약을 이어 주는 통신판매중개자이고, 다이빙·숙박 서비스의 제공과 환불은 업체가 책임져요. 업체 규정이 없으면 <a href="#refund">기본 취소·환불 규정</a>을 따라요.</p><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">예약 요청 보내기</button>');};
var _ref13=V.refund;V.refund=function(){return _ref13().replace('<p>업체가 따로 정한 규정이 있으면 예약 화면에 먼저 보여드려요.</p>','<p>업체가 따로 정한 규정이 있으면 예약 화면에 먼저 보여드려요.</p><p>Dive the deep ocean은 통신판매중개자예요. 환불은 판매한 업체가 해 주고, 업체와 연락이 안 되면 <a href="#help">고객 문의</a>로 알려 주세요. 중재를 도와드려요.</p>');};

/* 48 고객 문의: 자주 묻는 질문 + 1:1 문의 */
var FAQ=[['가입 메일이 안 와요','스팸함과 프로모션함을 먼저 확인해 주세요. 10분이 지나도 없으면 로그인 화면에서 메일을 다시 보낼 수 있어요. 그래도 안 되면 아래 1:1 문의에 가입한 이메일을 적어 주세요.'],
 ['비밀번호를 잊었어요','로그인 화면의 \'비밀번호 찾기\'에서 재설정 메일을 받을 수 있어요.'],
 ['다이버도 돈을 내나요?','아니요. 다이버는 지도·로그·도감·커뮤니티·예약 요청을 모두 무료로 써요.'],
 ['예약하면 바로 확정되나요?','요청만 보내고 결제는 하지 않아요. 업체가 견적과 함께 확정하면 알림이 와요.'],
 ['예약을 취소하고 싶어요','내 정보 → 예약에서 업체에 메시지로 알려 주세요. 환불 기준은 업체 규정, 없으면 기본 취소·환불 규정을 따라요.'],
 ['업체와 연락이 안 돼요','1:1 문의에 예약 날짜와 업체 이름을 적어 주세요. 우리가 업체에 직접 연락해 볼게요.'],
 ['다이브 컴퓨터 기록을 옮기고 싶어요','로그 화면의 \'기록 가져오기\'에서 Shearwater·Garmin·Apple Watch 등 파일을 올리면 돼요. 기기별 방법은 기기 연결 안내에 있어요.'],
 ['글이나 사진을 지우고 싶어요','내 글에서 직접 지울 수 있어요. 탈퇴하면 올린 사진·영상·서류도 함께 지워져요.'],
 ['부적절한 글이나 사람을 봤어요','글의 \'신고\' 버튼이나 프로필의 \'신고\'를 눌러 주세요. 운영자가 확인하고 처리 결과를 내 신고 내역에 남겨요.'],
 ['업체로 입점하고 싶어요','입점·광고 메뉴에서 업체 등록을 시작하면 돼요. 서류 심사 뒤 공개돼요.'],
 ['내 데이터를 받고 싶어요','내 정보 → 계정 관리에서 내 데이터 받기를 누르면 파일로 내려받을 수 있어요.']];
state.myTk=null;
function tkLoad(){if(!BE.on||!BE.user||tkLoad.b)return;tkLoad.b=1;BE.sb.from('support_tickets').select('*').eq('user_id',BE.user.id).order('created_at',{ascending:false}).limit(20).then(function(r){tkLoad.b=0;state.myTk=r.data||[];if(cur()==='help')rerender();});}
V.help=function(){setTitle('고객 문의');if(BE.user&&!state.myTk)tkLoad();var cats=['계정','예약·업체','신고·안전','버그','제안','기타'];
  var faq='<div class="panel"><h2>자주 묻는 질문</h2>'+FAQ.map(function(q){return '<details style="border-top:1px solid var(--line);padding:10px 0"><summary style="cursor:pointer;font-weight:600">'+esc(q[0])+'</summary><p style="margin:8px 0 0">'+esc(q[1])+'</p></details>';}).join('')+'</div>';
  var form='<form class="panel form" id="tkForm" novalidate><h2 style="grid-column:1/-1;margin:0">1:1 문의</h2><label for="tk_c">종류<select id="tk_c">'+cats.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select></label>'+(BE.user?'':'<label for="tk_e">답변 받을 이메일<input id="tk_e" type="email" autocomplete="email" placeholder="name@example.com"></label>')+'<label for="tk_b" style="grid-column:1/-1">내용<textarea id="tk_b" rows="5" maxlength="3000" placeholder="언제, 어느 화면에서, 무엇이 안 됐는지 적어 주세요. 예약 문의는 업체 이름과 날짜도요."></textarea></label><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">문의 보내기</button></div><p class="small" style="grid-column:1/-1;margin:0">보통 하루 안에 답해요. 응급 상황이면 현지 응급번호와 <a href="#safety">응급 연락처</a>를 먼저 이용하세요.</p></form>';
  var mine=BE.user?'<div class="panel"><h2>내 문의</h2>'+(state.myTk?(state.myTk.length?'<div class="list">'+state.myTk.map(function(t){return '<div class="item" style="flex-direction:column;align-items:stretch"><span class="tx"><span>'+tags([[t.status==='open'?'답변 대기':t.status==='answered'?'답변 완료':'종료',t.status==='open'?'gray':'ok']])+' '+esc(t.category)+' · '+String(t.created_at).slice(0,10)+'</span><span style="white-space:pre-wrap;color:var(--ink)">'+esc(t.body)+'</span></span>'+(t.reply?'<div class="notice" style="margin-top:6px;white-space:pre-wrap"><b>답변</b> '+esc(t.reply)+'</div>':'')+'</div>';}).join('')+'</div>':'<p class="empty" style="margin:0">보낸 문의가 없어요.</p>'):'<p class="empty" style="margin:0">불러오는 중이에요.</p>')+'</div>':'';
  return '<div class="vh"><div><h1>고객 문의</h1><p>궁금한 점은 먼저 자주 묻는 질문에서 찾아보세요</p></div></div><div class="cols"><div style="display:flex;flex-direction:column;gap:20px">'+faq+'</div><div style="display:flex;flex-direction:column;gap:20px">'+form+mine+'</div></div>'+foot();};
document.addEventListener('submit',function(e){if(e.target.id!=='tkForm')return;e.preventDefault();if(!BE.on){toast('실제 서비스에서 보낼 수 있어요');return;}
  var b=val('tk_b').trim(),em=BE.user?null:val('tk_e').trim();if(b.length<5){toast('내용을 조금 더 적어 주세요');return;}if(!BE.user&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast('답변 받을 이메일을 확인해 주세요');return;}
  var bt=e.target.querySelector('button[type=submit]');bt.disabled=true;var row={category:val('tk_c'),body:b};if(em)row.email=em;else row.user_id=BE.user.id;
  BE.sb.from('support_tickets').insert(row).then(function(r){bt.disabled=false;if(r.error){toast('보내지 못했어요: '+r.error.message);return;}toast('문의를 보냈어요. '+(BE.user?'답변은 이 화면과 알림으로 확인할 수 있어요.':'답변은 메일로 보내 드려요.'));document.getElementById('tk_b').value='';state.myTk=null;rerender();});});

/* 하단에 고객 문의 링크 */
var _foot13=foot;foot=function(){return _foot13().replace('<a href="#credits">사진·데이터 출처</a>','<a href="#credits">사진·데이터 출처</a> · <a href="#help"><b>고객 문의</b></a>');};

/* 44 · 48 운영자 화면: 문의 답변(템플릿) · 사업자 정보 입력 */
var TK_TPL=[['받았어요','문의 잘 받았어요. 확인하고 오늘 안에 다시 연락드릴게요.'],['메일 재발송','가입 메일은 스팸함·프로모션함으로 가는 경우가 많아요. 로그인 화면에서 메일을 다시 보내 보시고, 그래도 없으면 다른 메일 주소로 가입해 보세요.'],['업체 연락','해당 업체에 직접 연락해 두었어요. 업체 답을 받는 대로 이곳에 남길게요.'],['신고 처리','신고해 주셔서 고마워요. 확인 후 커뮤니티 규칙에 따라 처리했어요.'],['버그 확인','알려 주셔서 고마워요. 같은 문제가 재현돼서 고치고 있어요. 고치면 다시 알려 드릴게요.']];
state.admTk=null;
var _adm13=V.admin;V.admin=function(){var h=_adm13();if(!BE.on||!state.me||!state.me.admin||state.aal!=='aal2')return h;
  if(!state.admTk&&!V.admin.t13){V.admin.t13=1;BE.sb.from('support_tickets').select('*').order('created_at',{ascending:false}).limit(50).then(function(r){V.admin.t13=0;state.admTk=r.data||[];if(cur()==='admin')rerender();});}
  var T=state.admTk||[],open=T.filter(function(t){return t.status==='open';}).length,c=COMPANY||{};
  var p='<div class="panel"><h2>고객 문의 <span class="small">답변 대기 '+open+'건</span></h2>'+(state.admTk?(T.length?'<div class="list">'+T.map(function(t){return '<div class="item" style="flex-direction:column;align-items:stretch"><span class="tx"><span>'+tags([[t.status==='open'?'대기':t.status==='answered'?'답변함':'종료',t.status==='open'?'fr':'ok']])+' '+esc(t.category)+' · '+String(t.created_at).slice(0,16).replace('T',' ')+' · '+(t.user_id?'회원':'비회원 '+esc(t.email||''))+'</span><span style="white-space:pre-wrap;color:var(--ink)">'+esc(t.body)+'</span></span>'+
    '<form class="form" data-tkrep="'+t.id+'" style="margin-top:6px"><label style="grid-column:1/-1">답변<textarea rows="3" maxlength="3000">'+esc(t.reply||'')+'</textarea></label><div class="chips" style="grid-column:1/-1">'+TK_TPL.map(function(x,i){return '<button class="chip" type="button" data-tpl="'+i+'">'+esc(x[0])+'</button>';}).join('')+'</div><div style="grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-pri" type="submit">답변 저장</button><button class="btn btn-line" type="button" data-tkclose="'+t.id+'">종료</button>'+(t.email?'<a class="btn btn-line" href="mailto:'+esc(t.email)+'?subject='+encodeURIComponent('[Dive the deep ocean] 문의 답변')+'">메일로 답하기</a>':'')+'</div></form></div>';}).join('')+'</div>':'<p class="empty">문의가 없어요.</p>'):'<p class="empty">불러오는 중이에요.</p>')+'<p class="small" style="margin:8px 0 0">비회원 문의는 저장한 뒤 \'메일로 답하기\'로 보내 주세요.</p></div>'+
  '<form class="panel form" id="cfgForm"><h2 style="grid-column:1/-1;margin:0">사업자 정보</h2><p class="small" style="grid-column:1/-1;margin:0">저장하면 화면 하단·이용약관·개인정보 처리방침에 바로 나와요.</p>'+
    [['cf_name','상호','name'],['cf_ceo','대표자','ceo'],['cf_bizno','사업자등록번호','bizno'],['cf_mail','통신판매업 신고번호','mailorder'],['cf_addr','주소','addr'],['cf_email','고객 문의 메일','email'],['cf_phone','전화번호','phone']].map(function(f){return '<label for="'+f[0]+'">'+f[1]+'<input id="'+f[0]+'" value="'+esc(c[f[2]]||'')+'"></label>';}).join('')+
    '<label for="cf_priv" style="grid-column:1/-1">개인정보 보호책임자 (이름 · 직책 · 연락처)<input id="cf_priv" value="'+esc(c.privacy||'')+'" placeholder="예: 홍길동 · 대표 · privacy@divedeepocean.com"></label><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">저장</button></div></form>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-tpl]');if(t){var ta=t.closest('form').querySelector('textarea');ta.value=TK_TPL[+t.dataset.tpl][1];ta.focus();return;}
  t=e.target.closest('[data-tkclose]');if(t){BE.sb.from('support_tickets').update({status:'closed'}).eq('id',+t.dataset.tkclose).then(function(r){if(r.error){toast(r.error.message);return;}state.admTk=null;rerender();});}});
document.addEventListener('submit',function(e){var f=e.target;if(f.dataset&&f.dataset.tkrep){e.preventDefault();var v=f.querySelector('textarea').value.trim();if(!v){toast('답변을 적어 주세요');return;}
    BE.sb.from('support_tickets').update({reply:v,status:'answered',replied_at:new Date().toISOString()}).eq('id',+f.dataset.tkrep).then(function(r){if(r.error){toast('저장하지 못했어요: '+r.error.message);return;}toast('답변을 저장했어요');state.admTk=null;rerender();});return;}
  if(f.id==='cfgForm'){e.preventDefault();var v={name:val('cf_name').trim(),ceo:val('cf_ceo').trim(),bizno:val('cf_bizno').trim(),mailorder:val('cf_mail').trim(),addr:val('cf_addr').trim(),email:val('cf_email').trim(),phone:val('cf_phone').trim(),privacy:val('cf_priv').trim()};
    BE.sb.from('site_config').upsert({k:'company',v:v,updated_at:new Date().toISOString()}).then(function(r){if(r.error){toast('저장하지 못했어요: '+r.error.message);return;}COMPANY=v.name?v:null;toast('사업자 정보를 저장했어요');rerender();});}});

var _after13=after;after=function(){_after13();cfgLoad();meX();var m=document.getElementById('main');if(m&&!document.getElementById('termsBar')){var b=termsBar();if(b)m.insertAdjacentHTML('afterbegin',b);}};

if(LANG==='en'){var EN13={'고객 문의':'Help','자주 묻는 질문':'FAQ','1:1 문의':'Contact us','문의 보내기':'Send','내 문의':'My requests','답변 받을 이메일':'Email for our reply','종류':'Topic','내용':'Message','확인하고 동의':'Review and agree','나중에':'Later','국외 이전':'Overseas transfer','외부 자료 호출':'External data','동의 기록':'Consent records','운영자와 중개자 고지':'Operator and intermediary notice','궁금한 점은 먼저 자주 묻는 질문에서 찾아보세요':'Check the FAQ first'};Object.keys(EN13).forEach(function(k){EN_D[k]=EN13[k];});}

/* 홈 지도 아래: 다녀온 곳·찜한 곳·추천 포인트 검색 */
state.hmF=state.hmF||'all';state.hmQ=state.hmQ||'';
function hmNorm(x){return String(x||'').toLowerCase().replace(/\s+/g,'');}
function hmResults(){var M=myPlaces(),vs={},fs={};M.v.forEach(function(s){vs[s.id]=1;});M.f.forEach(function(s){fs[s.id]=1;});var q=hmNorm(state.hmQ),f=state.hmF;
  var L=SPOTS.filter(function(s){if(f==='v'&&!vs[s.id])return false;if(f==='f'&&!fs[s.id])return false;if(!q)return f!=='all';
    var en=LANG==='en'&&typeof enTok==='function'?enTok(s.name)+' '+enTok(s.country):'';return hmNorm([s.name,s.country,s.region,s.kind,s.life.join(' '),s.id,s.gw,s.desc,en].join(' ')).indexOf(q)>=0;});
  L.sort(function(a,b){return (vs[b.id]?2:fs[b.id]?1:0)-(vs[a.id]?2:fs[a.id]?1:0);});
  if(!q&&f==='all')return '';
  if(!L.length)return '<p class="empty" style="margin:8px 0 0">'+(f==='v'&&!M.v.length?'아직 다녀온 곳이 없어요. 포인트 화면에서 \'다녀왔어요\'를 누르거나 로그를 적으면 여기에 모여요.':f==='f'&&!M.f.length?'아직 찜한 곳이 없어요. 포인트 화면에서 \'찜하기\'를 눌러 보세요.':'맞는 포인트가 없어요. 나라나 지역 이름으로 찾아보세요.')+'</p>';
  return '<div class="list" style="margin-top:8px">'+L.slice(0,30).map(function(s){var c=vs[s.id]?['다녀온 곳','#F6A04D']:fs[s.id]?['찜한 곳','#E5484D']:['추천 포인트','#9FB3C2'];
    return '<a class="item" href="#spot-'+s.id+'"><span class="thumb" style="background:'+c[1]+';width:12px;height:12px;min-width:12px;border-radius:50%"></span><span class="tx"><b>'+esc(s.name)+'</b><span>'+esc(s.country)+' · '+esc(s.kind)+' · '+esc(s.lv)+'</span></span><span class="rt small">'+c[0]+'</span></a>';}).join('')+'</div>'+(L.length>30?'<p class="small" style="margin:6px 0 0">'+L.length+'곳 중 30곳만 보여요. 더 자세히 적어 보세요.</p>':'');}
var _hmb13=homeMapBox;homeMapBox=function(){var h=_hmb13(),M=myPlaces(),F=[['all','전체',SPOTS.length],['v','다녀온 곳',M.v.length],['f','찜한 곳',M.f.length],['r','추천 포인트',SPOTS.length]];
  var box='<div class="hmsearch" style="margin-top:12px"><label for="hmQ" class="sr-only" style="position:absolute;left:-9999px">포인트 검색</label><input id="hmQ" type="search" autocomplete="off" value="'+esc(state.hmQ)+'" placeholder="포인트·나라·생물로 찾기 (예: 세부, 만타, 오키나와)" style="width:100%;height:46px;padding:0 14px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:15px var(--font-body)"><div class="chips" role="group" aria-label="검색 범위" style="margin-top:8px">'+F.map(function(x){return '<button class="chip'+(state.hmF===x[0]?' on':'')+'" type="button" data-hmf="'+x[0]+'" aria-pressed="'+(state.hmF===x[0])+'">'+x[1]+' '+x[2]+'</button>';}).join('')+'</div><div id="hmRes">'+hmResults()+'</div></div>';
  var k=h.lastIndexOf('</div>');return k<0?h+box:h.slice(0,k)+box+h.slice(k);};
document.addEventListener('input',function(e){if(e.target.id!=='hmQ')return;state.hmQ=e.target.value;var r=document.getElementById('hmRes');if(r){r.innerHTML=hmResults();if(LANG==='en'&&typeof enWalk==='function')enWalk(r);}});
document.addEventListener('click',function(e){var t=e.target.closest('[data-hmf]');if(!t)return;state.hmF=state.hmF===t.dataset.hmf&&t.dataset.hmf!=='all'?'all':t.dataset.hmf;
  document.querySelectorAll('[data-hmf]').forEach(function(b){var on=b.dataset.hmf===state.hmF;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);});var r=document.getElementById('hmRes');if(r){r.innerHTML=hmResults();if(LANG==='en'&&typeof enWalk==='function')enWalk(r);}});
if(LANG==='en'){var EN13b={'전체':'All','포인트·나라·생물로 찾기 (예: 세부, 만타, 오키나와)':'Search spots, countries, marine life (e.g. Cebu, manta, Okinawa)','맞는 포인트가 없어요. 나라나 지역 이름으로 찾아보세요.':'No matching spots. Try a country or region name.'};Object.keys(EN13b).forEach(function(k){EN_D[k]=EN13b[k];});}
