/* ===== up125: 첫 다이버 모집 이벤트 팝업 (26.11.22~12.18) · 친구 초대 ===== */
var EVT125={from:'2026-11-22',to:'2026-12-18',img:'/assets/media/event-2026-11.jpg'};
var EVT125_TXT='🤿 Dive the Deep Ocean 첫 번째 다이버를 모집합니다! 🌊\n\n다이버를 위한 새로운 공간\nDive the Deep Ocean이 탄생하였어요!\n\n로그북 작성부터 다양한 기능까지,\n직접 경험해 보고 첫 사용자가 되어주실 다이버를 찾습니다.\n\n사용한 후에 솔직한 후기와 의견을 들려주세요. 여러분의 피드백이 더 좋은 서비스를 만드는 첫걸음이 됩니다! 💙\n\n🎁 가입 및 리서치를 완료해 주신 분 중 추첨을 통해 10분께 스타벅스 커피 쿠폰 쏠게요!\n💧기간: 26.11.22~12.18\n\n우리의 첫걸음, 함께해 주실거죠?';
(function(){var st=document.createElement('style');st.textContent=
'.evbg{position:fixed;inset:0;z-index:9000;background:rgba(4,16,26,.62);display:flex;align-items:center;justify-content:center;padding:18px;animation:evf .2s ease}@keyframes evf{from{opacity:0}to{opacity:1}}'+
'.evbox{width:100%;max-width:400px;max-height:calc(100vh - 36px);overflow:auto;border-radius:22px;background:var(--panel);box-shadow:0 20px 60px rgba(0,0,0,.35)}'+
'.evbox img{display:block;width:100%;height:auto;border-radius:22px 22px 0 0}'+
'.evbody{padding:14px 16px 12px;display:flex;flex-direction:column;gap:8px}.evbody .btn{width:100%;justify-content:center;min-height:46px}'+
'.evmore{white-space:pre-line;font-size:14px;line-height:1.65;color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:0}'+
'.evfoot{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding:4px 6px}.evfoot button{border:0;background:none;color:var(--sub);font:inherit;font-size:14px;padding:12px 10px;cursor:pointer}'+
'.frbox{border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:0 0 10px}.frcode{font:700 24px Sora,sans-serif;letter-spacing:2px}'+
'.evsign{display:flex;gap:12px;align-items:center;border-radius:16px;padding:12px 14px;margin:0 0 12px;background:linear-gradient(135deg,#0A5C8A,#0B3A5A);color:#fff}.evsign img{width:56px;height:70px;object-fit:cover;border-radius:10px;flex:none}.evsign b{display:block;font-size:15px}.evsign span{font-size:12.5px;opacity:.85}.evsign .chip{background:#fff;color:#0B1F2E;border:0;flex:none}';document.head.appendChild(st);})();
function kst125(){return new Date(Date.now()+9*36e5).toISOString().slice(0,10);}
function evOn125(){var d=kst125();return d>=EVT125.from&&d<=EVT125.to;}
function evClose125(hideToday){var b=document.getElementById('evbg');if(b)b.remove();try{sessionStorage.setItem('evSeen','1');}catch(e){}if(hideToday)LS.set('evHide',kst125());}
function evShow125(force){if(!evOn125()||document.getElementById('evbg'))return;if(!force){if(LS.get('evHide','')===kst125())return;try{if(sessionStorage.getItem('evSeen'))return;}catch(e){}if(document.getElementById('sheetbg'))return;}
  var u=!!BE.user,bg=document.createElement('div');bg.className='evbg';bg.id='evbg';
  bg.innerHTML='<div class="evbox" role="dialog" aria-modal="true" aria-label="첫 다이버 모집 이벤트"><img src="'+EVT125.img+'" alt="'+esc(EVT125_TXT)+'" width="1080" height="1350"><div class="evbody">'+
   (u?'<button class="btn btn-pri" type="button" data-frinv>친구 초대하기</button><button class="btn btn-line" type="button" data-evlog>로그북 써 보기</button>':'<a class="btn btn-pri" href="#signup" data-evgo>가입하고 참여하기</a><button class="btn btn-line" type="button" data-evshare>친구에게 알려주기</button>')+
   '<details><summary class="small" style="cursor:pointer;padding:4px 2px">이벤트 내용 자세히</summary><p class="evmore">'+esc(EVT125_TXT)+'</p></details></div>'+
   '<div class="evfoot"><button type="button" data-evhide>오늘 그만 보기</button><button type="button" data-evx>닫기</button></div></div>';
  bg.addEventListener('click',function(e){if(e.target===bg)evClose125(false);});document.body.appendChild(bg);}
document.addEventListener('click',function(e){var t=e.target;
  if(t.closest('[data-evx]'))return evClose125(false);if(t.closest('[data-evhide]'))return evClose125(true);
  if(t.closest('[data-evgo]'))return evClose125(false);if(t.closest('[data-evlog]')){evClose125(false);location.hash='#log';return;}
  if(t.closest('[data-evshare]')){evShare125(location.origin+'/');return;}
  if(t.closest('[data-frinv]')){e.preventDefault();evClose125(false);frSheet125();return;}
  var c=t.closest('[data-frcopy]');if(c&&navigator.clipboard){navigator.clipboard.writeText(c.dataset.frcopy).then(function(){toast('복사했어요');});return;}
  c=t.closest('[data-frmsg]');if(c){var x=document.getElementById('frMsg');if(x&&navigator.clipboard)navigator.clipboard.writeText(x.value).then(function(){toast('문구를 복사했어요');});return;}
  c=t.closest('[data-frshare]');if(c){var tx=(document.getElementById('frMsg')||{}).value||'';evShare125(c.dataset.frshare,tx);return;}
  c=t.closest('[data-frqr]');if(c){var q=document.getElementById('frQr');if(!q)return;if(!q.hidden){q.hidden=true;return;}if(typeof qrLib!=='function')return;qrLib().then(function(){q.innerHTML=qrSvg(c.dataset.frqr);q.hidden=false;}).catch(function(){toast('QR을 만들지 못했어요');});}});
function evMsg125(link){return '🤿 Dive the Deep Ocean 첫 번째 다이버를 모집해요! 🌊\n로그북 작성부터 다양한 기능까지 써 보고 의견을 들려주세요.\n🎁 가입 + 리서치 완료하면 추첨으로 10분께 스타벅스 커피 쿠폰\n💧 기간 26.11.22~12.18\n🔗 '+link;}
function evShare125(link,text){text=text||evMsg125(link);var go=function(files){var d={title:'Dive the Deep Ocean 첫 다이버 모집',text:text};if(files)d.files=files;return navigator.share(d);};
  if(navigator.share){fetch(EVT125.img).then(function(r){return r.blob();}).then(function(b){var f=[new File([b],'dive-the-deep-ocean-event.jpg',{type:'image/jpeg'})];if(navigator.canShare&&navigator.canShare({files:f}))return go(f);return go();}).catch(function(){return go().catch(function(){});});}
  else if(navigator.clipboard)navigator.clipboard.writeText(text).then(function(){toast('초대 문구를 복사했어요. 카톡에 붙여 넣으세요');});}

/* 친구 초대: 내 초대 코드 · 링크 · 문구 · QR · 이벤트 이미지 */
function frLoad125(cb){if(!BE.user)return cb(null);if(state.frInv&&state.frInv.u===BE.user.id)return cb(state.frInv);BE.sb.rpc('my_invite').then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];if(r.error||!x||!x.code)return cb(null);x.u=BE.user.id;state.frInv=x;cb(x);});}
function frSheet125(){if(!BE.user){if(typeof needLogin==='function')needLogin('로그인하면 내 초대 링크가 생겨요');return;}frLoad125(function(x){if(!x)return toast('초대 링크를 만들지 못했어요. 잠시 뒤 다시 해 주세요');var link=location.origin+'/?ref='+x.code;
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">친구 초대하기</h2><p class="small" style="margin:0 0 12px">친구가 내 링크로 가입하면 몇 명이 들어왔는지 여기서 보여요.</p>'+
   '<div class="frbox"><div class="small">내 초대 코드</div><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span class="frcode">'+esc(x.code)+'</span><span class="small">내 링크로 가입한 친구 <b>'+(+x.n||0)+'명</b></span></div>'+
   '<div class="invrow" style="margin-top:8px"><input readonly value="'+esc(link)+'" aria-label="초대 링크"><button class="chip" type="button" data-frcopy="'+esc(link)+'">복사</button></div></div>'+
   (evOn125()?'<img src="'+EVT125.img+'" alt="첫 다이버 모집 이벤트 이미지" style="width:100%;border-radius:14px;display:block;margin:0 0 6px"><a class="small" href="'+EVT125.img+'" download="dive-the-deep-ocean-event.jpg">이미지 저장</a>':'')+
   '<label style="display:block;margin-top:12px;font-size:14px"><b>보낼 문구</b> <span class="small">고쳐서 보내도 돼요</span><textarea class="invmsg" id="frMsg" maxlength="600">'+esc(evOn125()?evMsg125(link):'다이빙 로그북 · 포인트 · 모임을 한곳에서 쓰는 Dive the deep ocean에 같이 가입해요!\n'+link)+'</textarea></label>'+
   '<div class="chips" style="margin-top:6px"><button class="chip" type="button" data-frmsg>문구 복사</button><button class="chip" type="button" data-frqr="'+esc(link)+'">QR 보기</button></div><div class="invqr" id="frQr" hidden></div>'+
   '<button class="btn btn-pri" type="button" data-frshare="'+esc(link)+'" style="width:100%;justify-content:center;margin-top:10px">카톡 · 문자로 보내기</button>');});}

/* 내 정보: 친구 초대 */
function frProfile125(){if(cur()!=='profile'||!BE.user||document.getElementById('frPanel'))return;var v=document.querySelector('#main .view'),kv=v&&v.querySelector(':scope > .panel.kvp');if(!kv)return;var p=document.createElement('div');p.id='frPanel';p.style.cssText='margin-top:14px;padding-top:14px;border-top:1px solid var(--line)';
  p.innerHTML='<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><b style="font-size:15px;flex:1">친구 초대</b><button class="btn btn-pri" type="button" data-frinv style="min-height:40px">친구 초대하기</button></div><p class="small" id="frLine" style="margin:6px 0 0">내 링크를 보내면 친구가 그 링크로 가입했는지 셀 수 있어요.</p>';
  var ic=document.getElementById('icPanel');if(ic&&ic.parentElement===kv)kv.insertBefore(p,ic);else kv.appendChild(p);
  frLoad125(function(x){var l=document.getElementById('frLine');if(l&&x)l.innerHTML='내 초대 코드 <b>'+esc(x.code)+'</b> · 내 링크로 가입한 친구 <b>'+(+x.n||0)+'명</b>'+(evOn125()?' · 첫 다이버 이벤트 중 (~12.18)':'');});}

/* 회원가입 화면: 이벤트 안내 · 추천 코드 · 친구에게 알려주기 */
function frSignup125(){if(cur()!=='signup'||document.getElementById('evSign'))return;var v=document.querySelector('#main .view');if(!v)return;var ref=LS.get('ref','');var d=document.createElement('div');d.id='evSign';
  d.innerHTML=(evOn125()?'<div class="evsign"><img src="'+EVT125.img+'" alt=""><div style="flex:1;min-width:0"><b>첫 다이버 모집 이벤트</b><span>가입 + 리서치 완료하면 추첨으로 10분께 커피 쿠폰 · ~12.18</span></div><button class="chip" type="button" data-evopen>자세히</button></div>':'')+
   (ref?'<p class="small" style="margin:0 0 8px">추천 코드 <b>'+esc(ref)+'</b>가 함께 적용돼요.</p>':'')+
   '<div class="frbox" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span style="flex:1;min-width:180px;font-size:14px"><b>친구랑 같이 시작해요</b><br><span class="small">가입하면 내 정보에서 내 초대 링크를 받을 수 있어요.</span></span><button class="chip" type="button" data-evshare>친구에게 알려주기</button></div>';
  var vh=v.querySelector(':scope > .vh');if(vh)vh.after(d);else v.insertBefore(d,v.firstChild);}
document.addEventListener('click',function(e){if(e.target.closest('[data-evopen]'))evShow125(true);});

var _after125=after;after=function(){_after125();var c=cur();if(c==='home'){setTimeout(function(){evShow125(false);},900);}if(c==='profile'){setTimeout(frProfile125,600);setTimeout(frProfile125,1700);}if(c==='signup'){setTimeout(frSignup125,300);setTimeout(frSignup125,1200);}};
