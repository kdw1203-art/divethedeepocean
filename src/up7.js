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

/* 201·285 리조트 확충: 포인트 주변 지도 데이터(OSM) 리조트·센터 · 219 입점 업체 평점 */
state.rsp=state.rsp||'';state.bavg=null;
function bavgLoad(){if(state.bavg||!BE.on||bavgLoad.b)return;bavgLoad.b=1;BE.sb.from('biz_reviews').select('business_id,rating').limit(5000).then(function(r){var o={};(r.data||[]).forEach(function(x){var a=o[x.business_id]||(o[x.business_id]={s:0,n:0});a.s+=x.rating;a.n++;});state.bavg=o;if(cur()==='resorts')rerender();});}
var _resorts7=V.resorts;V.resorts=function(){var h=_resorts7();bavgLoad();
  if(state.bavg)Object.keys(state.bavg).forEach(function(id){var a=state.bavg[id];h=h.replace('href="#biz-d'+id+'"','href="#biz-d'+id+'" data-avg="1"').replace(new RegExp('(href="#biz-d'+id+'" data-avg="1"[\\s\\S]*?<b>)'),'$1★ '+(a.s/a.n).toFixed(1)+' ('+a.n+') · ');});
  var s=spot(state.rsp),L=[];if(s){if(!DB.sites){fetch('/assets/sites.json').then(function(r){return r.json();}).then(function(d){DB.sites=d;if(cur()==='resorts')rerender();});}else L=nearSites(s,60).filter(function(x){return x.t!==1;}).slice(0,40);}
  var opts='<option value="">포인트 고르기</option>'+SPOTS.map(function(x){return '<option value="'+x.id+'"'+(x.id===state.rsp?' selected':'')+'>'+esc(x.country+' · '+x.name)+'</option>';}).join('');
  var p='<div class="panel"><h2>이 바다 근처 리조트 · 다이빙 센터 전체</h2><div class="form"><label for="rspSel">포인트<select id="rspSel">'+opts+'</select></label></div>'+(s?(DB.sites?(L.length?'<div class="list" style="margin-top:10px">'+L.map(function(x){return item({tags:[[x.t===2?'리조트 · 숙소':'센터 · 샵',x.t===2?'fr':'gray']],t:esc(x.n),s:Math.round(x.d)+'km',r:'<a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(x.n+' '+s.country)+'" target="_blank" rel="noopener">지도</a>'});}).join('')+'</div>':'<p class="empty">60km 안에 등록된 곳이 없어요.</p>'):'<p class="empty">불러오는 중이에요.</p>'):'<p class="small" style="margin:8px 0 0">전 세계 다이빙 센터·리조트 4,000여 곳(OpenStreetMap)을 포인트별로 보여줘요. 입점하지 않은 곳은 직접 연락해야 해요.</p>')+'</div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('change',function(e){if(e.target.id==='rspSel'){state.rsp=e.target.value;rerender();}});

/* 233·240 홈 지도: 한글 세계지도 그림을 먼저 보여주고, 누르면 움직이는 지도로 바꿔요 (무거운 지도 엔진을 첫 화면에서 빼기) */
function wmXY(lat,lon){var mc=function(a){var p=a*Math.PI/180;return (1-Math.log(Math.tan(Math.PI/4+p/2))/Math.PI)/2;};var fx=.5+((((lon-140)%360)+540)%360-180)/360,fy=.5+(mc(lat)-mc(15))*1.6;return [fx*100,fy*100];}
state.hmLive=false;
var _hmb7=homeMapBox;homeMapBox=function(){var h=_hmb7();if(state.hmLive)return h;var M=myPlaces(),vs={},fs={};M.v.forEach(function(s){vs[s.id]=1;});M.f.forEach(function(s){fs[s.id]=1;});
  var dots=SPOTS.slice().sort(function(a,b){return (vs[a.id]?2:fs[a.id]?1:0)-(vs[b.id]?2:fs[b.id]?1:0);}).map(function(s){var p=wmXY(s.lat,s.lon);if(p[1]<0||p[1]>100)return '';var c=vs[s.id]?'v':fs[s.id]?'f':'r';return '<i class="wd '+c+'" style="left:'+p[0].toFixed(2)+'%;top:'+p[1].toFixed(2)+'%"></i>';}).join('');
  var fig='<div class="wmap"><img src="/assets/media/world_s.webp" srcset="/assets/media/world_s.webp 800w, /assets/media/world.webp 1600w" sizes="(min-width:860px) 1100px, 100vw" alt="세계지도: 추천 포인트 '+SPOTS.length+'곳, 다녀온 곳 '+M.v.length+'곳, 찜한 곳 '+M.f.length+'곳" width="1600" height="1000" fetchpriority="high">'+dots+'<button class="chip wmgo" type="button" id="hmLive">지도 움직이기</button><span class="wmcr">© OpenFreeMap © OpenStreetMap</span></div>';
  return h.replace(/<div id="homemap"[^>]*><\/div>/,fig);};
homeMapInit=(function(orig){return function(){if(state.hmLive)return orig();};})(homeMapInit);
(function(){var st=document.createElement('style');st.textContent='.wmap{cursor:pointer;position:relative;aspect-ratio:16/10;border-radius:14px;overflow:hidden;background:#9ec5f8}.wmap img{width:100%;height:100%;display:block;object-fit:cover}.wd{position:absolute;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;border:1.5px solid #fff;background:#9FB3C2;box-shadow:0 0 0 1px rgba(0,0,0,.15)}.wd.f{background:#E5484D;width:12px;height:12px;margin:-6px 0 0 -6px}.wd.v{background:#F6A04D;width:13px;height:13px;margin:-6.5px 0 0 -6.5px}.wmgo{position:absolute;left:10px;top:10px;background:var(--panel)}.wmcr{position:absolute;right:6px;bottom:4px;font-size:10px;color:#24425a;background:rgba(255,255,255,.7);padding:0 4px;border-radius:4px}';document.head.appendChild(st);})();
(function(){var b=document.querySelector('a.brand');if(b)b.removeAttribute('aria-label');})();
document.addEventListener('click',function(e){if(e.target.id!=='hmLive'&&!(e.target.closest&&e.target.closest('.wmap')))return;state.hmLive=true;rerender();});
