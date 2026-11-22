/* ================= 127: 링크 주소 정리 · 서명 요청 · 버디/강사 등록 · 홈 화면 추가 ================= */
var LK_READY=false; /* 버디·강사 테이블이 DB에 생기면 true */
var UUID127=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/* ---------- 1) 공유 링크를 용도별 짧은 주소로 ---------- */
/* /s/서명  /r/친구초대  /c/클럽초대  /g/클럽  /m/소모임  /b/버디  /t/강사 */
function lk127(u){var s=String(u||'');try{var x=new URL(s);if(x.origin!==location.origin&&!/divedeepocean\.com$/.test(x.hostname))return s;if(/^\/(s|r|c|g|m|b|t)\//.test(x.pathname))return s;
  var q=x.searchParams,h=x.hash||'',f=q.get('from'),m,out=null;
  if((m=/^#sign-(.+)$/.exec(h))&&UUID127.test(m[1]))out='/s/'+UUID127.exec(m[1])[0].toLowerCase();
  else if((m=/^#meet-d(\d+)$/.exec(h)))out='/m/'+m[1];
  else if(q.get('club'))out='/c/'+encodeURIComponent(q.get('club'));
  else if(q.get('ref'))out='/r/'+encodeURIComponent(q.get('ref'));
  else if((m=/^#club-(\d+)$/.exec(h)))out='/g/'+m[1];
  if(!out)return s;return x.origin+out+(f?'?from='+encodeURIComponent(f.slice(0,20)):'');}catch(e){return s;}}
function lkText127(t){var o=location.origin.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return String(t==null?'':t).replace(new RegExp('('+o+'|https://www\\.divedeepocean\\.com)[^\\s"\'<>]*','g'),function(a){var amp=a.indexOf('&amp;')>=0,r=lk127(amp?a.replace(/&amp;/g,'&'):a);return amp&&r===a.replace(/&amp;/g,'&')?a:r;});}
function lkDom127(root){if(!root)return;[].forEach.call(root.querySelectorAll('input[readonly],textarea'),function(i){var v=lkText127(i.value);if(v!==i.value)i.value=v;});
  [].forEach.call(root.querySelectorAll('[data-invcopy],[data-frcopy],[data-frshare],[data-frqr]'),function(b){['invcopy','frcopy','frshare','frqr'].forEach(function(k){if(b.dataset[k])b.dataset[k]=lkText127(b.dataset[k]);});});}
(function(){var _sh=sheet;sheet=function(h){_sh(lkText127(h));var bg=document.getElementById('sheetbg');lkDom127(bg);setTimeout(function(){lkDom127(document.getElementById('sheetbg'));},250);};
  if(typeof qrSvg==='function'){var _q=qrSvg;qrSvg=function(u){return _q(lk127(u));};}
  if(typeof sgUrl==='function')sgUrl=function(t){return location.origin+'/s/'+t;};
  try{if(navigator.share){var _ns=navigator.share.bind(navigator);navigator.share=function(o){o=Object.assign({},o||{});if(o.url)o.url=lk127(o.url);if(o.text)o.text=lkText127(o.text);if(o.url&&o.text&&o.text.indexOf(o.url)>=0)delete o.url;return _ns(o);};}}catch(e){}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){var _cw=navigator.clipboard.writeText.bind(navigator.clipboard);navigator.clipboard.writeText=function(t){return _cw(lkText127(t));};}}catch(e){}})();

/* ---------- 2) 서명 링크: 카톡 등에서 주소 뒤에 뭐가 붙어도 열리게 ---------- */
var _vSign127=V.sign;V.sign=function(tok){var s=String(tok||''),m=UUID127.exec(s)||UUID127.exec(location.hash)||UUID127.exec(location.search);if(m)return _vSign127(m[0].toLowerCase());
  if(/^\d+~/.test(s)||/^\d+$/.test(s)){setTitle('다이브 로그 서명');return '<div class="vh"><div><h1>예전 방식의 서명 링크예요</h1><p>로그 주인에게 새 서명 링크를 다시 받아 주세요. 새 링크는 로그인 없이 바로 서명할 수 있어요.</p></div><a class="btn btn-line" href="#home">홈으로</a></div>';}
  return _vSign127(tok);};

/* ---------- 3) 서명 받기: 한 버튼 → 방법 고르기 ---------- */
state.lk=state.lk||null;
function lkLoad127(cb){if(!LK_READY||!BE.user){state.lk=[];return cb&&cb([]);}if(state.lk&&state.lk!=='…')return cb&&cb(state.lk);BE.sb.rpc('link_list').then(function(r){state.lk=r.error?[]:(r.data||[]);cb&&cb(state.lk);});}
function sgLogInfo127(id){var d=state.dv&&state.dv[id];if(d&&typeof d==='object')return {site:d.site||'',date:d.dive_date||''};var l=(state.userLogs||[]).filter(function(x){return String(x.id)===String(id);})[0];return l?{site:l.site||'',date:l.date||l.dive_date||''}:{site:'',date:''};}
function sgReq127(id){if(!BE.user)return typeof needLogin==='function'?needLogin('로그인하면 서명을 받을 수 있어요'):toast('로그인해 주세요');
  var paint=function(L){var P=(L||[]).filter(function(x){return x.kind==='buddy'||x.kind==='instructor';});
    sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">서명 · 도장 받기</h2><p class="small" style="margin:0 0 14px">버디나 강사가 확인해 주면 로그 옆에 서명이 남아요.</p>'+
      '<div class="sgopt">'+
      (LK_READY?'<div class="sgppl"><b>내 버디 · 강사에게 바로 부탁</b>'+(P.length?'<div class="sgplist">'+P.map(function(x){return '<button type="button" class="sgp" data-sgto="'+esc(x.peer)+'" data-sglog="'+id+'" data-nick="'+esc(x.nick)+'"><span class="tag '+(x.kind==='instructor'?'tag-sea':'')+'">'+(x.kind==='instructor'?'강사':'버디')+'</span>'+esc(x.nick)+'</button>';}).join('')+'</div><span class="small">누르면 앱 메시지와 알림으로 서명 링크가 가요.</span>':'<span class="small">내 정보에서 버디 · 강사를 등록하면 여기서 바로 부탁할 수 있어요. <a href="#profile" data-xsheet>등록하러 가기</a></span>')+'</div>':'')+
      '<button type="button" class="sgo" data-sgnow="'+id+'"><b>이 휴대폰으로 바로 받기</b><span>옆에 있는 버디에게 휴대폰을 건네요</span></button>'+
      '<button type="button" class="sgo" data-sgnew="'+id+'"><b>카톡 · 문자로 링크 보내기</b><span>받은 사람은 로그인 없이 서명해요 (30일)</span></button>'+
      '<button type="button" class="sgo" data-sgqr="'+id+'"><b>QR로 받기</b><span>버디가 자기 휴대폰 카메라로 찍어요</span></button>'+
      '</div>');};
  if(LK_READY){state.lk=null;lkLoad127(paint);}else paint([]);}
document.addEventListener('click',function(e){var t=e.target.closest('[data-sgreq]');if(t){e.preventDefault();sgReq127(+t.dataset.sgreq);return;}
  t=e.target.closest('[data-signqr]');if(t&&BE.on){e.preventDefault();e.stopImmediatePropagation();sgReq127(+t.dataset.signqr);return;}
  t=e.target.closest('.sgopt [data-sgnew]');if(t){setTimeout(closeSheet,0);return;}
  t=e.target.closest('[data-sgto]');if(!t)return;e.preventDefault();var id=+t.dataset.sglog,to=t.dataset.sgto,nk=t.dataset.nick||'';t.disabled=true;
  BE.sb.from('dive_signs').insert({log_id:id}).select('token').then(function(r){var tk=r.data&&r.data[0]&&r.data[0].token;if(r.error||!tk){t.disabled=false;return toast('서명 칸을 만들지 못했어요');}
    var I=sgLogInfo127(id),me=(state.me&&state.me.nick)||'다이버',body='[서명 요청] '+[I.date,I.site].filter(Boolean).join(' · ')+' 다이브 로그에 서명 부탁해요.\n'+location.origin+'/s/'+tk;
    BE.sb.from('messages').insert({recipient:to,sender_nick:me,body:body}).select('id').then(function(m){if(m.error){t.disabled=false;return toast('보내지 못했어요: '+m.error.message);}var mid=m.data&&m.data[0]&&m.data[0].id;if(mid&&typeof pushNote==='function')pushNote('message',mid);
      closeSheet();toast(nk+' 님에게 서명 요청을 보냈어요');if(state.sg){delete state.sg[id];if(typeof sgLoad==='function')sgLoad(id);}});});},true);

/* 로그 화면 서명 칸: 버튼 셋 → 하나로, 기다리는 링크는 한 줄씩 */
if(typeof sgHtml==='function'){var _sgH127=sgHtml;sgHtml=function(id){var h=_sgH127(id),S=state.sg&&state.sg[id];if(!S||S==='…')return h;
  var d=document.createElement('div');d.innerHTML=h;[].forEach.call(d.querySelectorAll('.sglink'),function(x){x.remove();});
  [].forEach.call(d.querySelectorAll('[data-sgnew],[data-sgnow],[data-sgqr]'),function(b){var p=b.parentNode;b.remove();if(p&&p!==d&&!p.textContent.trim()&&!p.querySelector('*'))p.remove();});
  [].forEach.call(d.querySelectorAll('p.small'),function(p){if(/링크를 버디나 강사에게/.test(p.textContent))p.remove();});
  var W=S.filter(function(x){return !x.signed_at;});
  var w=W.length?'<div class="sgwait">'+W.map(function(x,i){var c=String(x.created_at||'').slice(5,10).replace('-','.');return '<div class="sgw"><span>서명 기다리는 중'+(c?' · '+c:'')+'</span><button class="chip" type="button" data-sgshare="'+esc(x.token)+'">다시 보내기</button><button class="chip" type="button" data-sgdel="'+x.id+'">취소</button></div>';}).join('')+'</div>':'';
  return d.innerHTML+w+'<button class="btn btn-pri sgmain" type="button" data-sgreq="'+id+'">서명 · 도장 받기</button>';};}

/* ---------- 4) 사진 · 영상 칸 정리 ---------- */
function dvMedia127(){var inp=document.getElementById('dvMedia');if(!inp)return;var pn=inp.closest('.panel');if(!pn||pn.dataset.t127)return;var h2=pn.querySelector('h2');if(!h2)return;pn.dataset.t127=1;pn.classList.add('dvmp');
  var lab=inp.closest('label'),cam=pn.querySelector('.fucam'),bx=document.createElement('span');bx.className='dvhb';
  if(cam){cam.textContent='카메라';bx.appendChild(cam);}if(lab){lab.firstChild&&lab.firstChild.nodeType===3&&(lab.firstChild.nodeValue='+ 추가');bx.appendChild(lab);}
  [].forEach.call(h2.querySelectorAll('small.fuh'),function(s){s.remove();});h2.appendChild(bx);
  var add=pn.querySelector('.dvadd');[].forEach.call(pn.querySelectorAll(':scope > p.small'),function(p){if(/사진 10장/.test(p.textContent))p.remove();});
  if(add){var s=add.querySelector('.small');if(s)s.textContent='사진 10장 · 영상 1개까지 · 붙인 뒤 사진마다 색 보정';var b=add.querySelector('b');if(b)b.textContent='눌러서 사진 · 영상 붙이기';[].forEach.call(add.querySelectorAll('small.fuh'),function(x){x.remove();});}
  else pn.insertAdjacentHTML('beforeend','<p class="small" style="margin:8px 0 0">사진 10장 · 영상 1개(50MB)까지</p>');}

/* ---------- 5) 내 정보: 내 버디 · 강사 ---------- */
function lkPanel127(){if(cur()!=='profile'||!BE.user||!LK_READY||document.getElementById('lkPanel'))return;var v=document.querySelector('#main .view');if(!v)return;
  lkLoad127(function(L){if(cur()!=='profile'||document.getElementById('lkPanel'))return;
    var g={buddy:[],instructor:[],student:[]};(L||[]).forEach(function(x){(g[x.kind]||[]).push(x);});
    var row=function(x,lab){return '<div class="lkr"><span class="tag'+(x.kind==='instructor'?' tag-sea':'')+'">'+lab+'</span><b>'+esc(x.nick)+'</b><span class="small">'+esc(x.cert||'')+'</span><button class="chip" type="button" data-lkdel="'+esc(x.peer)+'" data-kind="'+x.kind+'" aria-label="'+esc(x.nick)+' 지우기">지우기</button></div>';};
    var list=g.instructor.map(function(x){return row(x,'내 강사');}).join('')+g.buddy.map(function(x){return row(x,'버디');}).join('')+g.student.map(function(x){return row(x,'교육생');}).join('');
    var p=document.createElement('div');p.className='panel';p.id='lkPanel';
    p.innerHTML='<h2>내 버디 · 강사</h2>'+(list?'<div class="lkl">'+list+'</div>':'<p class="small" style="margin:0 0 10px">아직 등록한 사람이 없어요. 등록해 두면 로그 서명을 앱 안에서 바로 부탁할 수 있어요.</p>')+
      '<div class="lkb"><button class="btn btn-pri" type="button" data-lkinv="b">버디 등록 링크 보내기</button><button class="btn btn-line" type="button" data-lkadd>코드로 등록하기</button>'+(state.stMine&&state.stMine.code?'<button class="btn btn-line" type="button" data-lkinv="t">교육생에게 강사 등록 링크</button>':'')+'</div>'+
      '<p class="small" style="margin:8px 0 0">강사 등록은 강사님께 받은 6자리 강사 코드로, 버디 등록은 버디의 초대 코드로 해요.</p>';
    var a=document.getElementById('frPanel')||document.getElementById('icPanel'),top=a&&[].filter.call(v.children,function(c){return c.contains(a);})[0];if(top)top.after(p);else{var kv=v.querySelector(':scope > .panel.kvp');if(kv)kv.after(p);else v.appendChild(p);}});}
function lkAddSheet127(pre){sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">코드로 등록하기</h2><p class="small" style="margin:0 0 12px">강사 코드(6자리)를 넣으면 내 강사로, 버디 초대 코드(D로 시작)를 넣으면 버디로 등록돼요.</p><form id="lkForm" style="display:flex;gap:8px"><input id="lkCode" autocomplete="off" autocapitalize="characters" maxlength="12" placeholder="예: A1B2C3" value="'+esc(pre||'')+'" style="flex:1;text-transform:uppercase"><button class="btn btn-pri" type="submit">확인</button></form><div id="lkPeek" style="margin-top:12px"></div>');setTimeout(function(){var i=document.getElementById('lkCode');if(i&&!pre)i.focus();if(pre)lkPeek127(pre);},50);}
function lkPeek127(code){var o=document.getElementById('lkPeek');if(o)o.innerHTML='<p class="small">확인하는 중이에요…</p>';
  BE.sb.rpc('link_peek',{p_code:code}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];o=document.getElementById('lkPeek');if(!o)return;
    if(r.error||!x||x.err){o.innerHTML='<p class="small" style="color:var(--warn,#c0392b)">'+(x&&x.err==='login'?'로그인한 뒤 다시 해 주세요':'맞는 코드를 찾지 못했어요. 다시 확인해 주세요')+'</p>';return;}
    if(BE.user&&x.id===BE.user.id){o.innerHTML='<p class="small">내 코드예요. 상대방에게 보내 주세요.</p>';return;}
    var ins=x.kind==='instructor';o.innerHTML='<div class="lkc"><span class="tag'+(ins?' tag-sea':'')+'">'+(ins?'강사':'버디')+'</span><b>'+esc(x.nick||'다이버')+'</b><span class="small">'+esc(x.cert||'')+'</span></div><button class="btn btn-pri" type="button" data-lkok="'+esc(code)+'" style="width:100%;margin-top:10px">'+(ins?'내 강사로 등록하기':'버디로 등록하기')+'</button>';});}
function lkInv127(kind){if(!BE.user)return typeof needLogin==='function'?needLogin('로그인하면 내 링크가 생겨요'):toast('로그인해 주세요');var nk=(state.me&&state.me.nick)||'';var go=function(code){if(!code)return toast('링크를 만들지 못했어요. 잠시 뒤 다시 해 주세요');var link=location.origin+'/'+kind+'/'+code+(nk?'?from='+encodeURIComponent(nk.slice(0,20)):''),
    msg=kind==='t'?'안녕하세요, 강사 '+nk+'입니다. 아래 링크를 눌러 저를 강사로 등록해 주세요. 교육 다이브 로그에 바로 서명·도장을 찍어 드릴게요.\n'+link:'같이 다이빙한 '+nk+'예요 🤿 아래 링크로 버디 등록해 줘요. 로그 서명을 앱에서 바로 주고받을 수 있어요.\n'+link;
    sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">'+(kind==='t'?'강사 등록 링크':'버디 등록 링크')+'</h2><p class="small" style="margin:0 0 12px">받은 사람이 누르면 '+(kind==='t'?'나를 강사로':'서로 버디로')+' 등록돼요. 코드: <b>'+esc(code)+'</b></p><div class="sglink" style="display:flex;gap:6px"><input readonly value="'+esc(link)+'" style="flex:1"><button class="chip" type="button" data-invcopy="'+esc(link)+'">복사</button></div><textarea id="lkMsg" rows="4" style="width:100%;margin-top:10px">'+esc(msg)+'</textarea><button class="btn btn-pri" type="button" data-lkshare style="width:100%;margin-top:8px">카톡 · 문자로 보내기</button>');};
  if(kind==='t'){stMine(function(s){go(s&&s.code);});return;}
  BE.sb.rpc('my_invite').then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];go(x&&x.code);});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-lkinv]');if(t){lkInv127(t.dataset.lkinv);return;}
  if(e.target.closest('[data-lkadd]')){lkAddSheet127('');return;}
  t=e.target.closest('[data-lkshare]');if(t){var m=(document.getElementById('lkMsg')||{}).value||'';if(navigator.share)navigator.share({text:m}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(m).then(function(){toast('문구를 복사했어요. 카톡에 붙여 넣어 주세요');});return;}
  t=e.target.closest('[data-lkok]');if(t){t.disabled=true;BE.sb.rpc('link_add',{p_code:t.dataset.lkok}).then(function(r){var x=String(r.data||'');if(r.error||!/^ok|^dup/.test(x)){t.disabled=false;return toast(x==='self'?'내 코드예요':'등록하지 못했어요. 코드를 확인해 주세요');}
    try{LS.set('lkPend','');}catch(z){}closeSheet();toast(x==='dup'?'이미 등록돼 있어요':(/instructor/.test(x)?'내 강사로 등록했어요':'버디로 등록했어요'));state.lk=null;var p=document.getElementById('lkPanel');if(p)p.remove();lkPanel127();});return;}
  t=e.target.closest('[data-lkdel]');if(t){if(!confirm('목록에서 지울까요?'))return;BE.sb.rpc('link_remove',{p_peer:t.dataset.lkdel,p_kind:t.dataset.kind}).then(function(){state.lk=null;var p=document.getElementById('lkPanel');if(p)p.remove();lkPanel127();});}});
document.addEventListener('submit',function(e){if(e.target.id!=='lkForm')return;e.preventDefault();var c=(val('lkCode')||'').trim().toUpperCase();if(c)lkPeek127(c);});
/* 링크로 들어온 경우 (?buddy=코드 / ?inst=코드) */
(function(){try{var q=new URLSearchParams(location.search),c=q.get('buddy')||q.get('inst');if(c&&/^[A-Za-z0-9]{4,12}$/.test(c)){LS.set('lkPend',c.toUpperCase());q.delete('buddy');q.delete('inst');var s=q.toString();history.replaceState(history.state,'',location.pathname+(s?'?'+s:'')+location.hash);}}catch(e){}})();
function lkPendCheck127(){var c='';try{c=LS.get('lkPend','');}catch(e){}if(!c||document.getElementById('sheetbg')||document.getElementById('evbg'))return;
  if(!BE.user){if(lkPendCheck127.n)return;lkPendCheck127.n=1;sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 6px">버디 · 강사 등록 링크예요</h2><p class="small" style="margin:0 0 14px">로그인하거나 가입하면 바로 등록돼요.</p><div style="display:flex;gap:8px"><a class="btn btn-pri" href="#login" data-xsheet style="flex:1;justify-content:center">로그인</a><a class="btn btn-line" href="#signup" data-xsheet style="flex:1;justify-content:center">가입하기</a></div>');return;}
  if(!LK_READY)return;if(lkPendCheck127.u===c)return;lkPendCheck127.u=c;lkAddSheet127(c);}

/* ---------- 6) 강사 코드: 승인되면 도장 전에도 보여요 ---------- */
function icFix127(){var p=document.getElementById('icPanel'),s=state.stMine;if(!p||!s||!s.code||s.has)return;var a=p.querySelector('a[href="#stamp"]');if(a&&!a.dataset.f127){a.dataset.f127=1;a.textContent='도장 만들기';}var sm=p.querySelector('p.small');if(sm&&!sm.dataset.f127){sm.dataset.f127=1;sm.textContent='관리자 승인으로 강사 코드가 발급됐어요. 교육생이 이 코드로 나를 강사로 등록할 수 있어요. 도장을 만들면 교육생 로그에 도장도 찍을 수 있어요.';}}
function stampCode127(){if(cur()!=='stamp'||!BE.user||document.getElementById('stCode127'))return;stMine(function(s){if(!s||!s.code||document.getElementById('stCode127'))return;var v=document.querySelector('#main .view');if(!v)return;if(s.has&&v.textContent.indexOf(s.code)>=0)return;
  var d=document.createElement('div');d.className='panel';d.id='stCode127';d.innerHTML='<h2 style="margin:0 0 6px">내 강사 코드</h2><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><b style="font:700 26px Sora,sans-serif;letter-spacing:2px">'+esc(s.code)+'</b><button class="chip" type="button" data-iccopy="'+esc(s.code)+'">복사</button>'+(LK_READY?'<button class="chip" type="button" data-lkinv="t">교육생에게 등록 링크 보내기</button>':'')+'</div><p class="small" style="margin:8px 0 0">'+(s.has?'교육생 로그 서명 화면에서 이 코드와 도장 비밀번호로 도장을 찍어요.':'승인돼서 코드가 발급됐어요. 아래에서 도장을 만들면 교육생 로그에 도장까지 찍을 수 있어요.')+'</p>';
  var h=v.querySelector(':scope > .vh');if(h)h.after(d);else v.prepend(d);});}

/* ---------- 7) 홈 화면에 추가 (이벤트 팝업 · 안내) ---------- */
function a2hsOn127(){return !(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)&&!navigator.standalone;}
function a2hsSheet127(){var ua=navigator.userAgent||'',kk=/KAKAOTALK/i.test(ua),ios=/iphone|ipad|ipod/i.test(ua),url=location.origin+'/';
  if(!kk&&typeof DEFER!=='undefined'&&DEFER){try{DEFER.prompt();DEFER.userChoice.finally(function(){DEFER=null;});return;}catch(e){}}
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">📲 홈 화면에 추가하기</h2><p class="small" style="margin:0 0 12px">설치 없이 앱처럼 써요. 아이콘 한 번에 바로 열리고 화면도 넓어져요.</p>'+
    (kk?'<div class="a2k"><b>카카오톡 안에서는 추가가 안 돼요</b><span class="small">먼저 휴대폰 기본 브라우저로 열어 주세요.</span><a class="btn btn-pri" href="kakaotalk://web/openExternal?url='+encodeURIComponent(url)+'" style="justify-content:center;margin-top:8px">다른 브라우저로 열기</a></div>':'')+
    '<div class="a2s"><b>아이폰 · 사파리</b><ol><li>아래쪽 <b>공유</b> 버튼(네모에 위 화살표)</li><li><b>홈 화면에 추가</b></li><li>오른쪽 위 <b>추가</b></li></ol></div>'+
    '<div class="a2s"><b>안드로이드 · 크롬 · 삼성 인터넷</b><ol><li>오른쪽 위(삼성은 아래) <b>메뉴</b></li><li><b>홈 화면에 추가</b> 또는 <b>앱 설치</b></li></ol></div>');
  if(ios||kk){}}
document.addEventListener('click',function(e){if(e.target.closest('[data-a2hs]')){e.preventDefault();var bg=document.getElementById('evbg');if(bg&&typeof evClose125==='function')evClose125(false);a2hsSheet127();}});
if(typeof evShow125==='function'){var _ev127=evShow125;evShow125=function(f){_ev127(f);var b=document.querySelector('#evbg .evbody');if(b&&a2hsOn127()&&!b.querySelector('[data-a2hs]')){var x=document.createElement('button');x.type='button';x.className='eva2';x.dataset.a2hs=1;x.innerHTML='<span>📲</span><span><b>홈 화면에 추가하기</b><small>앱처럼 바로 열려서 편해요</small></span><span aria-hidden="true">›</span>';var p=b.querySelector('p.small');if(p)p.after(x);else b.appendChild(x);}};}

/* ---------- 공통 ---------- */
(function(){var st=document.createElement('style');st.textContent=
 '.sgopt{display:flex;flex-direction:column;gap:8px}.sgo{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--card,#fff);color:var(--ink);font:inherit;cursor:pointer}.sgo b{font-size:15px}.sgo span{font-size:12.5px;color:var(--sub)}.sgo:active{background:var(--bg)}'+
 '.sgppl{display:flex;flex-direction:column;gap:6px;padding:12px 14px;border-radius:12px;background:rgba(10,90,138,.06)}.sgplist{display:flex;flex-wrap:wrap;gap:6px}.sgp{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card,#fff);color:var(--ink);font:inherit;font-weight:600;cursor:pointer}.sgp .tag{margin:0}'+
 '.sgwait{display:flex;flex-direction:column;gap:6px;margin-top:10px}.sgw{display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:10px;background:var(--bg)}.sgw span{flex:1;font-size:13px;color:var(--sub)}.sgw .chip{padding:5px 10px;font-size:12.5px}.sgmain{width:100%;justify-content:center;margin-top:12px}'+
 '.dvmp h2{display:flex;align-items:center;justify-content:space-between;gap:8px}.dvhb{display:inline-flex;gap:6px;flex-shrink:0}.dvhb small.fuh,.dvmp .dvadd small.fuh{display:none!important}.dvhb .chip,.dvhb label{margin:0!important;font-size:13px!important;font-weight:500!important;padding:6px 12px!important;position:relative}.dvmp .dvadd{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:110px;padding:16px;border:1.5px dashed var(--line);border-radius:12px;text-align:center;cursor:pointer;background:var(--bg)}.dvmp .dvadd b{font-size:15px}'+
 '.lkl{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}.lkr{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;background:var(--bg)}.lkr b{white-space:nowrap}.lkr .small{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lkr .chip{padding:4px 10px;font-size:12px}.lkr .tag,.lkc .tag{margin:0}.lkb{display:flex;flex-wrap:wrap;gap:8px}.lkb .btn{flex:1 1 140px;justify-content:center}.lkc{display:flex;align-items:center;gap:8px;padding:12px;border-radius:12px;background:var(--bg)}'+
 '.eva2{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);font:inherit;text-align:left;cursor:pointer}.eva2>span:first-child{font-size:22px}.eva2>span:nth-child(2){flex:1;display:flex;flex-direction:column}.eva2 small{font-size:12px;color:var(--sub)}.eva2>span:last-child{font-size:20px;color:var(--sub)}'+
 '.a2s{padding:12px 14px;border:1px solid var(--line);border-radius:12px;margin-top:8px}.a2s ol{margin:6px 0 0;padding-left:20px;line-height:1.8}.a2k{display:flex;flex-direction:column;padding:12px 14px;border-radius:12px;background:rgba(246,160,77,.12)}';
 document.head.appendChild(st);})();
var _after127=after;after=function(){_after127();var c=cur();
  if(c==='dive'){setTimeout(dvMedia127,60);setTimeout(dvMedia127,700);setTimeout(dvMedia127,1800);}
  if(c==='profile'){[600,1700,3200].forEach(function(ms){setTimeout(function(){lkPanel127();icFix127();lkDom127(document.getElementById('main'));},ms);});}
  if(c==='stamp'){setTimeout(stampCode127,500);setTimeout(stampCode127,1600);}
  setTimeout(function(){lkDom127(document.getElementById('main'));},900);setTimeout(lkPendCheck127,1500);};
if(window.MutationObserver)new MutationObserver(function(){if(cur()==='dive'){var i=document.getElementById('dvMedia');if(i){var p=i.closest('.panel');if(p&&!p.dataset.t127)dvMedia127();}}}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
if(typeof EN_D==='object')Object.assign(EN_D,{'서명 · 도장 받기':'Get signed','이 휴대폰으로 바로 받기':'Sign on this phone','카톡 · 문자로 링크 보내기':'Send a link','QR로 받기':'Use a QR code','내 버디 · 강사':'My buddies · instructors','버디 등록 링크 보내기':'Send buddy link','코드로 등록하기':'Add by code','홈 화면에 추가하기':'Add to Home Screen','서명 기다리는 중':'Waiting','다시 보내기':'Resend'});

/* ---------- 8) 내 정보: 비상 연락 카드 · 자동 알림 → '안전 · 알림' 칸으로 따로 ---------- */
function safeTidy127(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var em=document.getElementById('emPanel'),al=document.getElementById('alPanel');if(!em&&!al)return;
  var box=document.getElementById('safePanel');
  if(!box){box=document.createElement('div');box.className='panel';box.id='safePanel';box.innerHTML='<h2>안전 · 알림</h2>';
    var cc=document.getElementById('cc2'),top=cc&&[].filter.call(v.children,function(c){return c.contains(cc);})[0];if(!top){var kv=v.querySelector(':scope > .panel.kvp');top=kv;}if(top)top.after(box);else v.appendChild(box);}
  else{var cc2=document.getElementById('cc2'),tp=cc2&&[].filter.call(v.children,function(c){return c.contains(cc2);})[0];if(tp&&tp.nextElementSibling!==box)tp.after(box);}
  if(em&&em.parentNode!==box){em.removeAttribute('style');em.className='sfrow';var b=em.querySelector('b');if(b)b.textContent='비상 연락 카드';box.insertBefore(em,box.querySelector('#alPanel'));}
  if(al&&al.parentNode!==box&&al.innerHTML){al.removeAttribute('style');al.className='sfal';var t=al.querySelector(':scope > b');if(t)t.textContent='자동 알림';var p=al.querySelector(':scope > p.small');if(p)p.innerHTML='휴대폰으로 받으려면 <a href="#notice">알림</a>에서 이 기기 알림을 켜 주세요.';box.appendChild(al);}}
(function(){var st=document.createElement('style');st.textContent='#safePanel h2{margin-bottom:6px}#safePanel .sfrow{padding:4px 0 14px}#safePanel .sfrow>div{flex-wrap:nowrap!important}#safePanel .sfrow .small{margin-top:4px!important}#safePanel .sfal{padding-top:14px;border-top:1px solid var(--line)}#safePanel .sfal>b{display:block;font-size:15px;margin-bottom:4px}#safePanel .i6tg{padding:10px 0;font-size:15px}#safePanel .i6tg .small{font-size:12.5px}#safePanel .sfal>p.small{margin:8px 0 0!important}'+
 '#safePanel .i6tg input[type=checkbox]{appearance:none;-webkit-appearance:none;flex-shrink:0;width:46px;height:28px;border-radius:14px;background:var(--line);position:relative;cursor:pointer;transition:background .15s;margin:0}#safePanel .i6tg input[type=checkbox]::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .15s}#safePanel .i6tg input[type=checkbox]:checked{background:var(--sea)}#safePanel .i6tg input[type=checkbox]:checked::after{transform:translateX(18px)}';document.head.appendChild(st);})();
var _after127b=after;after=function(){_after127b();if(cur()==='profile')[700,1500,2600,4000,6000].forEach(function(ms){setTimeout(safeTidy127,ms);});};
