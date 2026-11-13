/* ===== 실사용 준비 1차 ===== */
function lazyScript(src,sri,test){if(test())return Promise.resolve();lazyScript.p=lazyScript.p||{};if(lazyScript.p[src])return lazyScript.p[src];
  return lazyScript.p[src]=new Promise(function(ok,no){var s=document.createElement('script');s.src=src;s.integrity=sri;s.crossOrigin='anonymous';s.onload=ok;s.onerror=function(){delete lazyScript.p[src];no();};document.head.appendChild(s);});}

/* 7 · 44 운영자 화면: 2단계 인증을 마친 로그인에서만 열고, 회원 찾기·정지 */
state.aal=null;
function aalLoad(){if(!BE.on||!BE.user||aalLoad.b)return;aalLoad.b=1;BE.sb.auth.mfa.getAuthenticatorAssuranceLevel().then(function(a){aalLoad.b=0;state.aal=(a.data&&a.data.currentLevel)||'aal1';if(cur()==='admin')rerender();});}
state.admU=null;state.admQ='';
var _adm12=V.admin;V.admin=function(){if(BE.on&&BE.user&&state.me&&state.me.admin){if(!state.aal){aalLoad();return '<div class="vh"><div><h1>운영자 콘솔</h1><p>확인 중이에요.</p></div></div>';}
    if(state.aal!=='aal2')return '<div class="vh"><div><h1>운영자 콘솔</h1><p>운영 기능은 2단계 인증을 마친 로그인에서만 열려요.</p></div></div><div class="panel"><p style="margin:0 0 10px">비밀번호가 새어 나가도 운영자 권한은 지킬 수 있게 바꿨어요. 인증 앱을 연결하거나, 이미 연결했다면 6자리 숫자로 인증해 주세요.</p><a class="btn btn-pri" href="#mfa">2단계 인증으로 가기</a></div>';}
  var h=_adm12();if(!BE.on||!state.me||!state.me.admin||state.aal!=='aal2')return h;
  if(!state.admU&&!V.admin.u12){V.admin.u12=1;BE.sb.rpc('admin_users',{q:state.admQ||''}).then(function(r){V.admin.u12=0;state.admU=r.data||[];if(cur()==='admin')rerender();});}
  var U=state.admU||[],now=new Date().toISOString();
  var p='<div class="panel"><h2>회원 관리</h2><form class="form" id="admUq" style="grid-template-columns:minmax(0,1fr) auto;align-items:end"><label for="admq">닉네임 또는 회원 ID<input id="admq" value="'+esc(state.admQ)+'"></label><button class="btn btn-line" type="submit">찾기</button></form>'+(state.admU?(U.length?'<div class="list" style="margin-top:10px">'+U.map(function(u){var sus=u.suspended_until&&u.suspended_until>now;return '<div class="item" style="flex-wrap:wrap"><span class="tx"><span>'+(u.is_admin?tags([['운영자','ok']])+' ':'')+(sus?tags([['정지 · '+u.suspended_until.slice(0,10)+'까지','fr']])+' ':'')+String(u.created_at).slice(0,10)+' 가입 · 글 '+u.posts+' · 신고 '+u.reports_against+'</span><b>'+esc(u.nick||'(닉네임 없음)')+'</b><span class="small">'+esc(u.id)+(u.suspend_reason?' · '+esc(u.suspend_reason):'')+'</span></span>'+(u.is_admin?'':(sus?'<button class="chip" type="button" data-susp="'+u.id+'" data-d="0">정지 풀기</button>':'<button class="chip" type="button" data-susp="'+u.id+'" data-d="7">7일 정지</button><button class="chip" type="button" data-susp="'+u.id+'" data-d="30">30일 정지</button><button class="chip" type="button" data-susp="'+u.id+'" data-d="3650">영구 정지</button>'))+'</div>';}).join('')+'</div>':'<p class="empty">찾는 회원이 없어요.</p>'):'<p class="empty">불러오는 중이에요.</p>')+'<p class="small" style="margin:8px 0 0">정지된 회원은 글·댓글·메시지·예약·신고를 쓸 수 없어요. 정지와 해제는 운영 기록에 남아요.</p></div>'+
  '<div class="panel"><h2>업체 심사 체크리스트</h2><ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>사업자 등록증·현지 영업 허가의 상호가 업체 이름과 같은지</li><li>배상책임보험 증권의 기간이 지금 유효한지</li><li>교육을 올린다면 강사 자격 번호를 단체 사이트에서 조회했는지</li><li>연락처로 실제 연락이 되는지 (메일 또는 전화 1회)</li><li>홈페이지·지도에 같은 주소가 나오는지</li></ol><p class="small" style="margin:8px 0 0">하나라도 확인이 안 되면 반려하고, 반려 사유에 무엇을 보내면 되는지 적어 주세요.</p></div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('submit',function(e){if(e.target.id!=='admUq')return;e.preventDefault();state.admQ=val('admq');state.admU=null;rerender();});
document.addEventListener('click',function(e){var t=e.target.closest('[data-susp]');if(!t)return;var d=+t.dataset.d,why=d?prompt('정지 사유 (회원에게 보여요)','커뮤니티 규칙 위반: 광고·도배'):'';if(d&&!why)return;t.disabled=true;
  BE.sb.rpc('admin_suspend',{uid:t.dataset.susp,days:d,reason:why||''}).then(function(r){if(r.error){toast('처리하지 못했어요: '+r.error.message);t.disabled=false;return;}toast(d?'정지했어요':'정지를 풀었어요');state.admU=null;rerender();});});

/* 6 · 44 서버가 막았을 때 알기 쉬운 말로 */
var _toast12=toast;toast=function(m){m=String(m||'');if(/too many requests/i.test(m))m='잠시 뒤에 다시 해 주세요. 짧은 시간에 너무 많이 보냈어요.';else if(/account suspended until ([0-9-]{10})/i.test(m))m='이용이 정지된 계정이에요 ('+m.match(/until ([0-9-]{10})/)[1]+'까지). 문의는 고객 문의로 보내 주세요.';else if(/row-level security|violates row-level/i.test(m)&&cur()==='biz')m='이용 완료한 예약이 있어야 후기를 쓸 수 있어요.';return _toast12(m);};
var _prof12=V.profile;V.profile=function(){var h=_prof12(),m=state.me;if(m&&m.suspended_until&&m.suspended_until>new Date().toISOString())h=h.replace('<div class="vh">','<div class="notice" style="margin-bottom:12px">이용이 정지된 계정이에요 · '+esc(String(m.suspended_until).slice(0,10))+'까지'+(m.suspend_reason?' · 사유: '+esc(m.suspend_reason):'')+'</div><div class="vh">');return h;};

/* 16 업체 후기: 이용 완료한 예약이 있을 때만 쓰기 칸 보이기 */
var _biz12=V.biz;V.biz=function(arg){var h=_biz12(arg);if(!arg||String(arg).charAt(0)!=='d'||!BE.user)return h;var id=+String(arg).slice(1);if(!state.myBook){bookLoad();}
  var done=(state.myBook||[]).some(function(b){return b.business_id===id&&b.user_id===BE.user.id&&b.status==='done';});
  if(!done)h=h.replace(/<form class="form" id="brForm"[\s\S]*?<\/form>/,'<p class="small" style="margin:10px 0 0">이 업체를 예약하고 \'이용 완료\'가 되면 후기를 쓸 수 있어요. 실제 이용자 후기만 남기기 위해서예요.</p>');return h;};

/* 14 · 15 · 17 · 19 아직 없는 기능은 '출시 예정'으로 */
(function(){var S=FORMS.sell;if(!S)return;S.sub='판매자·구매자 수수료 없음 · 지금은 직거래만 돼요';S.steps.forEach(function(st){st.f=st.f.filter(function(f){return f.k!=='escrow';});});})();
var _partner12=V.partner;V.partner=function(){var h=_partner12();
  h=h.replace('<b>프로 (선택)</b>','<b>프로 (선택) <span class="tag gray">출시 예정</span></b>').replace(/(<div class="plan pick"><b>프로 )<span class="tag[^"]*">[^<]*<\/span>/,'$1<span class="tag gray">출시 예정</span>').replace('<details class="panel"><summary><b>건당 옵션 보기</b></summary>','<details class="panel"><summary><b>건당 옵션 보기</b> <span class="tag gray">결제 연동 뒤 열려요</span></summary>');
  h=h.replace(/<span class="f">예약 수수료 6%<\/span>/,'<span class="f">예약 수수료 6% (출시 뒤 적용)</span>').replace('월 2회 정산','정산 방식은 결제 연동 뒤 안내');
  ['홈 메인 배너','지도 스폰서 핀','검색 스폰서 결과','추천 리조트 · 강사','장비 브랜드 스폰서'].forEach(function(n){h=h.replace('<b>'+n+'</b>','<b>'+n+' <span class="tag gray">준비 중</span></b>');});
  return h.replace('<div class="panel"><h2>광고 상품</h2>','<div class="panel"><h2>광고 상품</h2><div class="notice" style="margin-bottom:10px">지금 바로 신청할 수 있는 광고는 리조트·장비 화면의 \'광고\' 칸이에요. 아래 상품은 준비 중이에요.</div>');};


/* 32 아이폰 HEIC 사진: 브라우저가 못 열면 JPG로 바꿔서 올리기 */
var _shrink12=shrink;shrink=function(file,cb){if(!file||!/heic|heif/i.test((file.type||'')+' '+(file.name||'')))return _shrink12(file,cb);
  var u=URL.createObjectURL(file),im=new Image();im.onload=function(){URL.revokeObjectURL(u);_shrink12(file,cb);};
  im.onerror=function(){URL.revokeObjectURL(u);toast('아이폰 사진을 바꾸는 중이에요…');lazyScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js','sha384-OTofQ0MEeiSgh62havBcemCIK0gqj809wX6UA0uPISNMRnR6NZyCdGzX3SbLrgwL',function(){return !!window.heic2any;}).then(function(){return window.heic2any({blob:file,toType:'image/jpeg',quality:.85});}).then(function(b){b=Array.isArray(b)?b[0]:b;_shrink12(new File([b],(file.name||'photo').replace(/\.hei[cf]$/i,'')+'.jpg',{type:'image/jpeg'}),cb);}).catch(function(){toast('이 사진은 열 수 없어요. JPG로 바꿔서 올려 주세요.');});};im.src=u;};

/* 10 올리기 전에 위치·기기 정보 지우기: 사진은 다시 그려서, PDF는 문서 정보를 비워서 */
function reencode(blob){return new Promise(function(ok){var u=URL.createObjectURL(blob),im=new Image();im.onload=function(){var c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(u);c.toBlob(function(b){ok(b||blob);},'image/jpeg',.9);};im.onerror=function(){URL.revokeObjectURL(u);ok(blob);};im.src=u;});}
function cleanPdf(blob){return lazyScript('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js','sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI',function(){return !!window.PDFLib;}).then(function(){return blob.arrayBuffer();}).then(function(buf){return window.PDFLib.PDFDocument.load(buf,{ignoreEncryption:true,updateMetadata:false});}).then(function(d){d.setTitle('');d.setAuthor('');d.setSubject('');d.setKeywords([]);d.setProducer('');d.setCreator('');var z=new Date(0);d.setCreationDate(z);d.setModificationDate(z);return d.save();}).then(function(b){return new Blob([b],{type:'application/pdf'});}).catch(function(){return blob;});}
var _upload12=upload;upload=function(bucket,blob,name){var t=(blob&&blob.type)||'',p=Promise.resolve(blob);
  if(/^image\/(jpeg|png|webp)$/.test(t)&&blob.size>0&&!blob._clean)p=reencode(blob);else if(t==='application/pdf')p=cleanPdf(blob);
  return p.then(function(b){if(b!==blob&&/^image/.test(b.type))name=String(name||'file').replace(/\.(png|webp|jpe?g)$/i,'')+'.jpg';return _upload12(bucket,b,name);});};

/* 11 글을 지우거나 탈퇴하면 올린 파일도 지우기 */
function purgeFiles(row){if(!row||!BE.on)return Promise.resolve();var m=[].concat(row.photos||[],row.photo?[row.photo]:[]).filter(function(x,i,a){return x&&a.indexOf(x)===i;});var jobs=[];
  if(m.length)jobs.push(BE.sb.storage.from('media').remove(m));if(row.video)jobs.push(BE.sb.storage.from('video').remove([row.video]));return Promise.all(jobs).catch(function(){});}
function purgeMyFiles(){if(!BE.on||!BE.user)return Promise.resolve();var me=BE.user.id;
  return Promise.all(['media','video','docs'].map(function(b){return BE.sb.storage.from(b).list(me,{limit:1000}).then(function(r){var L=(r.data||[]).map(function(f){return me+'/'+f.name;});return L.length?BE.sb.storage.from(b).remove(L):null;}).catch(function(){});})).catch(function(){});}

/* 37 계산기: 입력 범위를 지키고 위험한 결과에는 경고 */
var _tools12=V.tools;V.tools=function(){var c=state.calc;function cl(k,a,b){c[k]=Math.min(b,Math.max(a,+c[k]||a));}
  cl('o2',21,40);cl('pp',1.0,1.6);cl('depth',0,60);cl('sac',8,40);cl('tank',3,24);cl('bar',50,300);cl('reserve',30,100);
  var h=_tools12(),w=[];if(c.pp>1.4)w.push('산소 분압 1.4를 넘기면 작업 다이빙에서 위험해요. 1.6은 감압 정지 때만 써요.');if(c.depth>40)w.push('40m는 레크리에이션 다이빙 한계예요. 그보다 깊으면 텍니컬 교육과 장비가 필요해요.');if(c.o2>21&&c.depth>(c.pp/(c.o2/100)-1)*10)w.push('이 수심은 이 기체의 최대 운용 수심(MOD)보다 깊어요.');
  var note='<div class="notice" style="margin-bottom:12px"><b>참고용 계산이에요.</b> 다이브 컴퓨터와 교육받은 다이빙 계획, 기체 분석기 측정값을 대신하지 않아요. 나이트록스는 자격을 받은 뒤에 쓰세요.'+(w.length?'<ul style="margin:8px 0 0;padding-left:18px">'+w.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>':'')+'</div>';
  h=h.replace(/<div class="notice"[^>]*>계획 참고용이에요[^<]*<\/div>/,'');var i=h.indexOf('</div></div>');return i<0?note+h:h.slice(0,i+12)+note+h.slice(i+12);};

var _after12=after;after=function(){_after12();if(cur()==='admin'&&!state.aal)aalLoad();};
var _prof12b=V.profile;V.profile=function(a){return _prof12b(a).replace('안전거래를 고르면 구매자 수수료 3% · 직거래는 무료','지금은 직거래만 돼요 · 수수료 없음. 만나서 작동을 확인하고 거래하세요');};
