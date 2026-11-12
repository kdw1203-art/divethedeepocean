/* ===== 4차-D: 로그북 글자 인식(104) · 동영상 올리기(95) ===== */
/* 104 종이 로그북 사진에서 날짜·수심·시간 읽기 (기기 안에서 처리, 사진은 서버로 보내지 않아요) */
function loadOCR(){if(window.Tesseract)return Promise.resolve();if(loadOCR.p)return loadOCR.p;loadOCR.p=new Promise(function(ok,no){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.integrity='sha384-GJqSu7vueQ9qN0E9yLPb3Wtpd7OrgK8KmYzC8T1IysG1bcvxvIO4qtYR/D3A991F';s.crossOrigin='anonymous';s.onload=ok;s.onerror=function(){loadOCR.p=null;no();};document.head.appendChild(s);});return loadOCR.p;}
function parseLog(t){var o={},s=String(t||'').replace(/[Oo](?=\d)/g,'0');
  var d=s.match(/(20\d{2})\s*[.\-\/년]\s*(\d{1,2})\s*[.\-\/월]\s*(\d{1,2})/);if(d)o.date=d[1]+'-'+('0'+d[2]).slice(-2)+'-'+('0'+d[3]).slice(-2);
  var dp=s.match(/(?:max|최대|수심|depth)[^\d]{0,12}(\d{1,3}(?:[.,]\d)?)\s*m/i)||s.match(/(\d{1,2}(?:[.,]\d)?)\s*m(?![a-z])/i);if(dp)o.depth=dp[1].replace(',','.');
  var tm=s.match(/(?:time|시간|bottom|다이브\s*타임)[^\d]{0,12}(\d{1,3})\s*(?:분|min|')/i)||s.match(/(\d{2,3})\s*(?:분|min)/i);if(tm)o.time=tm[1];
  var st=s.match(/(?:site|포인트|장소|location)\s*[:：]?\s*([^\n]{2,30})/i);if(st)o.site=st[1].trim();
  return o;}
function ocrScan(i,btn){var sc=state.scans[+i];if(!sc)return;btn.disabled=true;btn.textContent='글자 읽는 중 (처음엔 1분쯤 걸려요)';
  loadOCR().then(function(){return window.Tesseract.recognize(sc.url,'kor+eng');}).then(function(r){var o=parseLog(r.data&&r.data.text),n=0;
    [['sd'+i,'date'],['ss'+i,'site'],['sp'+i,'depth'],['st'+i,'time']].forEach(function(k){var e=document.getElementById(k[0]);if(e&&!e.value&&o[k[1]]){e.value=o[k[1]];n++;e.style.outline='2px solid var(--coral)';}});
    btn.textContent=n?n+'칸을 채웠어요 · 확인 후 저장':'읽을 수 있는 칸을 찾지 못했어요';toast(n?'읽은 값을 확인하고 고쳐 주세요':'손글씨는 잘 안 읽힐 수 있어요. 직접 입력해 주세요');
  }).catch(function(){btn.disabled=false;btn.textContent='다시 읽기';toast('글자 인식을 불러오지 못했어요');});}
var _log7=V.log;V.log=function(){var h=_log7();return h.replace(/<button class="btn btn-pri" type="button" data-savescan="(\d+)">로그로 저장<\/button>/g,'<button class="btn btn-line" type="button" data-ocr="$1">사진에서 글자 읽기</button><button class="btn btn-pri" type="button" data-savescan="$1">로그로 저장</button>');};

/* 95 짧은 동영상 */
state.vdraft=null;
var _feed7=V.feed;V.feed=function(){var h=_feed7();
  h=h.replace('<input id="postPhoto"','<label class="chip" for="postVideo" style="align-self:flex-start">'+(state.vdraft?'동영상 1개 선택됨 · '+Math.round(state.vdraft.size/1048576)+'MB':'동영상 추가 (1분 · 50MB 이하)')+'</label><input id="postVideo" type="file" accept="video/mp4,video/quicktime,video/webm" style="position:absolute;left:-9999px"><input id="postPhoto"');
  (state.pubPosts||[]).forEach(function(p){if(p.video){var u=BE.sb.storage.from('video').getPublicUrl(p.video).data.publicUrl;h=h.replace('<img class="ph" src="'+esc(p.url)+'"','<video class="ph vid" controls playsinline preload="none" poster="'+esc(p.url)+'" src="'+esc(u)+'"></video><img hidden src="'+esc(p.url)+'"');}});
  return h;};
var _post7=BE.post;BE.post=function(o){var v=state.vdraft;if(!v||!BE.user)return _post7(o);
  var D=state.drafts.length?state.drafts:[o.url];
  return upload('video',v,v.name||'clip.mp4').then(function(vp){return Promise.all(D.map(function(u){return upload('media',dataUrlToBlob(u),'post.jpg');})).then(function(P){return BE.sb.from('posts').insert({author_nick:KO(),spot:o.sid,body:o.text,photo:P[0],photos:P,log_label:o.log,video:vp});});}).then(function(r){if(r.error)throw r.error;state.drafts=[];state.vdraft=null;return BE.pull();});};
document.addEventListener('change',function(e){var t=e.target;if(t.id!=='postVideo')return;var f=t.files[0];if(!f)return;
  if(f.size>50*1048576){toast('50MB 이하 영상만 올릴 수 있어요');t.value='';return;}
  var v=document.createElement('video');v.preload='metadata';v.onloadedmetadata=function(){URL.revokeObjectURL(v.src);if(v.duration>65){toast('1분 이내 영상만 올릴 수 있어요');t.value='';return;}state.vdraft=f;if(!BE.user)return needLogin('동영상은 로그인 후에 올릴 수 있어요');rerender();toast('동영상을 담았어요. 사진 1장과 함께 올려 주세요');};v.onerror=function(){state.vdraft=f;rerender();};v.src=URL.createObjectURL(f);});
document.addEventListener('click',function(e){var t=e.target.closest('[data-ocr]');if(t)ocrScan(t.dataset.ocr,t);});

/* 239 웹 푸시: 메시지 · 모임 채팅 · 예약 소식 */
var PUSHFN='https://crasesnlwwyegdgzkqes.supabase.co/functions/v1/push';
function pushNote(kind,id){if(!BE.on||!BE.user||!id)return;BE.sb.auth.getSession().then(function(s){var t=s&&s.data&&s.data.session&&s.data.session.access_token;if(!t)return;fetch(PUSHFN,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+t},body:JSON.stringify({kind:kind,id:id})}).catch(function(){});});}
function b64u(s){var p='='.repeat((4-s.length%4)%4),b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/')),a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a;}
function pushOK(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;}
function pushOn(btn){if(!BE.user)return needLogin('알림은 로그인 후에 켤 수 있어요');if(!pushOK())return toast('이 브라우저는 알림을 지원하지 않아요. 아이폰은 홈 화면에 추가한 뒤 켤 수 있어요');btn.disabled=true;
  Notification.requestPermission().then(function(p){if(p!=='granted')throw 'deny';return Promise.all([navigator.serviceWorker.ready,fetch(PUSHFN).then(function(r){return r.json();})]);}).then(function(a){return a[0].pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(a[1].publicKey)});}).then(function(sub){var j=sub.toJSON();return BE.sb.from('push_subs').upsert({endpoint:j.endpoint,user_id:BE.user.id,p256dh:j.keys.p256dh,auth:j.keys.auth});}).then(function(r){if(r&&r.error)throw r.error;LS.set('pushOn',true);toast('이 기기로 알림을 받아요');rerender();}).catch(function(e){btn.disabled=false;toast(e==='deny'?'알림이 차단돼 있어요. 브라우저 설정에서 허용해 주세요':'알림을 켜지 못했어요');});}
function pushOff(btn){btn.disabled=true;navigator.serviceWorker.ready.then(function(r){return r.pushManager.getSubscription();}).then(function(s){if(!s)return;var ep=s.endpoint;return s.unsubscribe().then(function(){return BE.sb.from('push_subs').delete().eq('endpoint',ep);});}).then(function(){LS.set('pushOn',false);toast('알림을 껐어요');rerender();}).catch(function(){btn.disabled=false;});}
var _notice7=V.notice;V.notice=function(){var h=_notice7();if(!BE.user)return h;var on=LS.get('pushOn',false)&&pushOK()&&Notification.permission==='granted';
  var p='<div class="panel"><h2>휴대폰 알림</h2><p class="small" style="margin:0 0 10px">새 메시지, 모임 채팅, 예약 요청·확정 소식을 이 기기로 받아요.'+(/iPhone|iPad/.test(navigator.userAgent)?' 아이폰은 Safari 공유 → \'홈 화면에 추가\' 뒤 그 앱에서 켜 주세요.':'')+'</p><button class="btn '+(on?'btn-line':'btn-pri')+'" type="button" id="'+(on?'pushOff':'pushOn')+'">'+(on?'이 기기 알림 끄기':'이 기기로 알림 받기')+'</button></div>';
  var k=h.indexOf('<div class="panel">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('click',function(e){var t=e.target.closest('#pushOn,#pushOff');if(!t)return;if(t.id==='pushOn')pushOn(t);else pushOff(t);});
