/* ===== 출시 직후 품질 1차 ===== */

/* 30 · 31 예약: 응답 기한 안내, 현지 날짜 기준, 출발 3일·1일 전 알림 띠 */
var _biz15=V.biz;V.biz=function(a){return _biz15(a).replace('<label for="bk_d">시작일<','<label for="bk_d">시작일 (현지 날짜)<').replace('업체가 견적과 함께 확정하면 알려드려요.','업체가 견적과 함께 확정하면 알려드려요. 48시간 안에 답이 없으면 요청은 자동으로 마감돼요.');};
function tripBar(){if(!BE.user||!state.myBook||tripBar.no)return '';var now=new Date();now.setHours(0,0,0,0);
  var up=state.myBook.filter(function(b){if(b.user_id!==BE.user.id||b.status!=='confirmed'||!b.date_from)return false;var d=(new Date(b.date_from+'T00:00:00')-now)/864e5;return d>=0&&d<=3;}).sort(function(a,b){return a.date_from<b.date_from?-1:1;})[0];
  if(!up)return '';var d=Math.round((new Date(up.date_from+'T00:00:00')-now)/864e5),n=up.businesses&&up.businesses.name||'예약한 업체';
  return '<div class="notice" id="tripBar" style="margin:0 0 12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:200px"><b>'+(d===0?'오늘 출발':'출발 '+d+'일 전')+'</b> · '+esc(n)+' '+esc(up.date_from)+' (현지 날짜) · 자격증·로그북·다이브 보험 증서를 챙기세요. 다이빙 전 24시간은 음주를 피하세요.</span><a class="btn btn-line" href="#profile" style="min-height:36px;height:36px">예약 보기</a><button class="chip" type="button" id="tripNo">닫기</button></div>';}
document.addEventListener('click',function(e){if(e.target.id==='tripNo'){tripBar.no=1;var b=document.getElementById('tripBar');if(b)b.remove();}});

/* 36 로그 검사: 자격보다 깊은 수심·비현실적인 값 */
function certMax(c){c=String(c||'');if(/인스트럭터|다이브마스터|레스큐|딥/.test(c))return 40;if(/어드밴스드/.test(c))return 30;if(/오픈워터/.test(c))return 18;return 0;}
document.addEventListener('submit',function(e){if(e.target.id!=='quickLog')return;var g=function(i){var x=document.getElementById(i);return x?x.value:'';};
  var dt=g('qd'),dp=+g('qp')||0,tm=+g('qt')||0,w=[],today=new Date().toISOString().slice(0,10);
  if(dt&&dt>today){e.preventDefault();e.stopImmediatePropagation();toast('미래 날짜에는 로그를 남길 수 없어요.');return;}
  if(dp>130||tm>600||dp<0||tm<0){e.preventDefault();e.stopImmediatePropagation();toast('수심은 130m, 시간은 600분 안에서 적어 주세요.');return;}
  var cm=certMax(state.me&&state.me.cert);if(cm&&dp>cm)w.push('최대 수심 '+dp+'m는 지금 자격('+state.me.cert+')의 권장 한계 '+cm+'m보다 깊어요.');
  if(dp>40)w.push('40m보다 깊은 다이빙은 텍니컬 교육과 장비가 필요해요.');if(tm>120)w.push('다이빙 시간이 '+tm+'분이에요. 맞나요?');
  if(w.length&&!confirm(w.join('\n')+'\n\n그래도 이대로 저장할까요?')){e.preventDefault();e.stopImmediatePropagation();}},true);

/* 38 통합 검색: 같은 뜻 낱말 */
var SYN=[['만타','쥐가오리','manta'],['거북','바다거북','turtle'],['고래상어','whale shark','고래 상어'],['상어','shark'],['해마','seahorse'],['갯민숭달팽이','누디','nudibranch','갯민숭이'],['정어리','sardine'],['돌고래','dolphin'],['혹등고래','고래','whale'],['산호','coral','연산호'],['난파선','wreck','침몰선','렉'],['동굴','cave','세노테','cenote'],['프리다이빙','freediving','프리'],['스쿠버','scuba'],['마크로','macro','접사'],['세부','cebu','모알보알','말라파스쿠아'],['보홀','bohol'],['발리','bali'],['오키나와','okinawa'],['제주','jeju'],['괌','guam'],['사이판','saipan'],['팔라우','palau'],['몰디브','maldives'],['홍해','이집트','다합','dahab']];
(function(){if(typeof INDEX==='undefined')return;INDEX.forEach(function(x){var k=String(x.k||'').toLowerCase()+' '+String(x.t||'').toLowerCase(),add=[];SYN.forEach(function(g){if(g.some(function(w){return k.indexOf(w.toLowerCase())>=0;}))add=add.concat(g);});if(add.length)x.k+=' '+add.join(' ');});})();

/* 39 포인트 정보 기준일과 출처 */
var _spot15=V.spot;V.spot=function(id){var h=_spot15(id);var p='<p class="small" style="margin:8px 0 0">정보 기준: 2026년 11월 · 수심·시즌·가는 길은 현지 다이빙 센터 안내와 공개 자료를 모아 정리했어요. 현지 사정과 다르면 \'수정 제안하기\'로 알려 주세요.</p>';
  return h.replace('<div class="panel"><h2>정보가 틀렸나요?</h2>','<div class="panel"><h2>정보가 틀렸나요?</h2>'+p);};

/* 40 모임 안전: 처음 만나는 사람 주의, 참가 조건 확인 */
function certRank(c){c=String(c||'');if(/인스트럭터|다이브마스터/.test(c))return 4;if(/레스큐/.test(c))return 3;if(/어드밴스드|AIDA 3|AIDA 4/.test(c))return 2;if(/오픈워터|AIDA 2/.test(c))return 1;return 0;}
document.addEventListener('click',function(e){var b=e.target.closest('[data-join]');if(!b||!BE.user)return;var m=(state.pubMeets||[]).filter(function(x){return x.id===+b.dataset.join;})[0];if(!m)return;
  var me=state.me||{},w=[],need=certRank(m.min_cert),have=certRank(me.cert);
  if(m.min_cert&&!/제한 없음/.test(m.min_cert)&&have<need)w.push('이 모임은 \''+m.min_cert+'\' 조건이 있는데, 내 정보의 자격은 \''+(me.cert||'미입력')+'\'이에요.');
  if(m.min_logs&&(+me.logs||0)<m.min_logs)w.push('최소 로그 '+m.min_logs+'회 조건이 있는데, 내 로그는 '+(+me.logs||0)+'회예요.');
  if(w.length&&!confirm(w.join('\n')+'\n\n조건이 맞지 않으면 모임장이 거절할 수 있어요. 그래도 신청할까요?')){e.preventDefault();e.stopImmediatePropagation();}},true);
var _meet15=V.meet;V.meet=function(i){var h=_meet15(i);if(String(i).charAt(0)!=='d')return h;
  var s='<div class="panel"><h2>처음 만나는 다이버와 갈 때</h2><ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>첫 만남은 다이빙 센터나 사람이 많은 곳에서 해요.</li><li>버디의 자격증과 최근 다이빙 날짜를 입수 전에 서로 확인해요.</li><li>돈은 센터에 직접 내고, 개인 계좌로 먼저 보내지 마세요.</li><li>불편한 일이 있었다면 프로필의 \'신고\'로 알려 주세요.</li></ul></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+s:h.slice(0,k)+s+h.slice(k);};

/* 41 중고 거래 사기 방지 안내 */
var _item15=V.item;V.item=function(i){var h=_item15(i);var s='<div class="panel"><h2>안전하게 거래하려면</h2><ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>직접 만나 호흡기·컴퓨터가 작동하는지 확인한 뒤 돈을 보내세요.</li><li>시세보다 너무 싼 물건, 택배 거래만 고집하는 판매자는 조심하세요.</li><li>정비 영수증과 마지막 오버홀 날짜를 꼭 물어보세요.</li><li>신고가 3건 쌓인 판매글은 운영자 확인 전까지 자동으로 숨겨져요.</li></ul></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+s:h.slice(0,k)+s+h.slice(k);};

/* 41 운영자: 신고로 숨겨진 글 되살리기 */
state.hidP=null;
var _adm15=V.admin;V.admin=function(){var h=_adm15();if(!BE.on||!state.me||!state.me.admin||state.aal!=='aal2')return h;
  if(!state.hidP&&!V.admin.h15){V.admin.h15=1;Promise.all([BE.sb.from('posts').select('id,body,created_at').eq('hidden',true).limit(30),BE.sb.from('market_items').select('id,title,created_at').eq('status','hidden').limit(30)]).then(function(r){V.admin.h15=0;state.hidP={p:r[0].data||[],m:r[1].data||[]};if(cur()==='admin')rerender();});}
  var H=state.hidP||{p:[],m:[]},L=H.p.map(function(x){return ['post',x.id,x.body];}).concat(H.m.map(function(x){return ['item',x.id,x.title];}));
  var p='<div class="panel"><h2>신고로 숨겨진 글 <span class="small">'+L.length+'건</span></h2>'+(L.length?'<div class="list">'+L.map(function(x){return '<div class="item"><span class="tx"><span>'+(x[0]==='post'?'피드 글':'판매글')+' #'+x[1]+'</span><b>'+esc(String(x[2]||'').slice(0,80))+'</b></span><button class="chip" type="button" data-unhide="'+x[0]+'|'+x[1]+'">되살리기</button></div>';}).join('')+'</div>':'<p class="empty" style="margin:0">숨겨진 글이 없어요.</p>')+'<p class="small" style="margin:8px 0 0">서로 다른 세 사람이 신고하면 자동으로 숨겨요. 문제없으면 되살리고 신고는 \'기각\'으로 닫아 주세요.</p></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-unhide]');if(!t)return;var a=t.dataset.unhide.split('|');
  BE.sb.rpc('admin_unhide',{kind:a[0],rid:+a[1]}).then(function(r){if(r.error){toast('되살리지 못했어요: '+r.error.message);return;}toast('되살렸어요');state.hidP=null;rerender();});});

var _after15=after;after=function(){_after15();var m=document.getElementById('main');if(m&&BE.user&&!document.getElementById('tripBar')){if(!state.myBook&&typeof bookLoad==='function')bookLoad();var b=tripBar();if(b)m.insertAdjacentHTML('afterbegin',b);}};
(function(){if(typeof INDEX==='undefined')return;for(var i=INDEX.length-1;i>=0;i--){if(/^\[/.test(String(INDEX[i].t||'')))INDEX.splice(i,1);}})();
