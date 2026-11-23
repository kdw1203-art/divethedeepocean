/* ================= 134: 최적화 · 오류 보완 ================= */

/* 1) 앱 시작 때 전체 데이터를 두 번 불러오던 것 → 한 번만
      (로그인 확인이 두 경로로 거의 동시에 끝나며 BE.pull 이 두 번 불렸음. 시작 직후 같은 사용자 요청만 합침) */
(function(){if(!BE.on||typeof BE.pull!=='function')return;var t0=Date.now(),inf=null,infU=null,_p=BE.pull;
  BE.pull=function(){var u=(BE.user&&BE.user.id)||'';
    if(inf&&infU===u&&Date.now()-t0<6000)return inf;
    var r=_p.apply(this,arguments);if(r&&r.then){inf=r;infU=u;var clr=function(){if(inf===r)inf=null;};r.then(clr,clr);}return r;};})();

/* 2) 같은 읽기 요청이 겹치면 하나로 (초대 코드 · 운영자 이벤트 통계) */
(function(){if(!BE.on||!BE.sb)return;var TTL={my_invite:30000,admin_event:60000},C={},_rpc=BE.sb.rpc.bind(BE.sb);
  BE.sb.rpc=function(fn,args){if(!TTL[fn])return _rpc.apply(null,arguments);var k=fn+'|'+((BE.user&&BE.user.id)||'')+'|'+JSON.stringify(args||{}),c=C[k];
    if(c&&Date.now()-c.t<TTL[fn])return c.p;var p=Promise.resolve(_rpc(fn,args)).then(function(r){if(r&&r.error)delete C[k];return r;},function(e){delete C[k];throw e;});C[k]={t:Date.now(),p:p};return p;};
  window.rpcFresh134=function(fn){Object.keys(C).forEach(function(k){if(k.indexOf(fn+'|')===0)delete C[k];});};})();
/* '새로고침' · 추첨 · 당첨 취소 뒤에는 새 값 */
if(typeof evAdm126==='function'){var _evAdm134=evAdm126;evAdm126=function(force){if(force&&window.rpcFresh134)rpcFresh134('admin_event');return _evAdm134.apply(this,arguments);};}

/* 3) 자격증 사진: 30분 뒤 만료되는 주소를 계속 쓰던 것 → 25분 지나면 새 주소 받기 */
if(typeof ccSign==='function'){state.ccAt134={};
  ccSign=function(paths,cb){var now=Date.now();
    var need=paths.filter(function(p){return p&&(!state.ccUrl[p]||now-(state.ccAt134[p]||0)>25*60000);});if(!need.length)return cb();
    BE.sb.storage.from('docs').createSignedUrls(need,1800).then(function(r){(r.data||[]).forEach(function(x){if(x.signedUrl){state.ccUrl[x.path]=x.signedUrl;state.ccAt134[x.path]=now;}});cb();}).catch(cb);};}

/* 4) 강사 수업 화면: 제출 서류 버튼이 옆으로 숨겨지던 것 → 줄바꿈 */
(function(){var st=document.createElement('style');st.textContent='#main .edup .chips{flex-wrap:wrap!important;overflow:visible!important}';document.head.appendChild(st);})();

/* 5) 홈 '다가오는 모임' 알림: 홈을 다시 그릴 때마다 두 번씩 새로 묻던 것 → 1분 안에는 받은 값 재사용 */
if(typeof mtHomeRm==='function'){var _mtHomeRm134=mtHomeRm;mtHomeRm=function(){var f=mtHomeRm,u=(BE.user&&BE.user.id)||'',c=f._c134;
  if(f.d===undefined&&c&&c.u===u&&Date.now()-c.t<60000){f.d=c.d;f.h=c.h;}
  var r=_mtHomeRm134.apply(this,arguments);
  if(f.d&&f.h&&(!f._c134||f._c134.d!==f.d||f._c134.h!==f.h))f._c134={u:u,t:Date.now(),d:f.d,h:f.h};return r;};}

/* 6) 자동 점검 로봇(헤드리스 브라우저)이 연 화면은 광고 노출 · 클릭으로 세지 않기 */
(function(){if(!BE.on||!BE.sb||!navigator.webdriver)return;var _r=BE.sb.rpc;BE.sb.rpc=function(fn){if(fn==='ad_hit')return Promise.resolve({data:null,error:null});return _r.apply(this,arguments);};})();
