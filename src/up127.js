/* ================= 127: 링크 주소 정리 · 서명 요청 · 버디/강사 등록 · 홈 화면 추가 ================= */
var LK_READY=true; /* 버디·강사 테이블이 DB에 생기면 true */
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
  if(state.myInv127===undefined){state.myInv127=null;BE.sb.rpc('my_invite').then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];state.myInv127=(x&&x.code)||'';lkPanel127();});return;}if(state.myInv127===null)return;
  lkLoad127(function(L){if(cur()!=='profile'||document.getElementById('lkPanel'))return;
    var g={buddy:[],instructor:[],student:[]};(L||[]).forEach(function(x){(g[x.kind]||[]).push(x);});
    var row=function(x,lab){return '<div class="lkr"><span class="tag'+(x.kind==='instructor'?' tag-sea':'')+'">'+lab+'</span><b>'+esc(x.nick)+'</b><span class="small">'+esc(x.cert||'')+'</span><button class="chip" type="button" data-lkdel="'+esc(x.peer)+'" data-kind="'+x.kind+'" aria-label="'+esc(x.nick)+' 지우기">지우기</button></div>';};
    var list=g.instructor.map(function(x){return row(x,'내 강사');}).join('')+g.buddy.map(function(x){return row(x,'버디');}).join('')+g.student.map(function(x){return row(x,'교육생');}).join('');
    var p=document.createElement('div');p.className='panel';p.id='lkPanel';
    var bc=state.myInv127;p.innerHTML='<h2>내 버디 · 강사</h2>'+(bc?'<div class="inscode lkmy"><span class="small">내 버디 코드 · 버디가 이 코드를 넣으면 서로 등록돼요</span><b>'+esc(bc)+'</b><span class="inscb"><button class="chip" type="button" data-iccopy="'+esc(bc)+'" data-bud="1">복사</button><button class="chip" type="button" data-lkinv="b">링크로 보내기</button></span></div>':'')+(list?'<div class="lkl">'+list+'</div>':'<p class="small" style="margin:0 0 10px">아직 등록한 사람이 없어요. 등록해 두면 로그 서명을 앱 안에서 바로 부탁할 수 있어요.</p>')+
      '<div class="lkb"><button class="btn btn-pri" type="button" data-lkadd="b">내 버디 등록하기</button><button class="btn btn-pri" type="button" data-lkadd="t">내 강사 등록하기</button></div>'+
      '<p class="small" style="margin:8px 0 0">등록한 버디 · 강사에게는 로그 화면에서 서명을 앱 안에서 바로 부탁할 수 있어요.</p>';
    v.appendChild(p);order127();});}
function lkAddSheet127(pre,kind){var ins=kind==='t';sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">'+(kind?(ins?'내 강사 등록하기':'내 버디 등록하기'):'코드로 등록하기')+'</h2><p class="small" style="margin:0 0 12px">'+(kind?(ins?'강사님께 받은 강사 코드를 넣어 주세요. 강사님 내 정보에 6자리 코드가 있어요.':'버디의 버디 코드를 넣어 주세요. 버디 내 정보 → 내 버디 · 강사 칸에 있어요 (D로 시작).'):'강사 코드나 버디 초대 코드를 넣어 주세요.')+'</p><form id="lkForm" style="display:flex;gap:8px"><input id="lkCode" autocomplete="off" autocapitalize="characters" maxlength="12" placeholder="'+(ins?'예: A1B2C3':'예: D7K2QF')+'" value="'+esc(pre||'')+'" style="flex:1;text-transform:uppercase"><button class="btn btn-pri" type="submit">확인</button></form><div id="lkPeek" style="margin-top:12px"></div>'+(kind&&!ins?'<div class="lkor"><span>코드를 모르면</span><button class="btn btn-line" type="button" data-lkinv="b">버디에게 등록 링크 보내기</button></div>':'')+(ins?'<p class="small" style="margin:12px 0 0">강사님이 보낸 등록 링크를 누르면 코드 없이 바로 등록돼요.</p>':''));setTimeout(function(){var i=document.getElementById('lkCode');if(i&&!pre)i.focus();if(pre)lkPeek127(pre);},50);}
function lkPeek127(code){var o=document.getElementById('lkPeek');if(o)o.innerHTML='<p class="small">확인하는 중이에요…</p>';
  BE.sb.rpc('link_peek',{p_code:code}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];o=document.getElementById('lkPeek');if(!o)return;
    if(r.error||!x||x.err){o.innerHTML='<p class="small" style="color:var(--warn,#c0392b)">'+(x&&x.err==='login'?'로그인한 뒤 다시 해 주세요':'맞는 코드를 찾지 못했어요. 다시 확인해 주세요')+'</p>';return;}
    if(BE.user&&x.id===BE.user.id){o.innerHTML='<p class="small">내 코드예요. 상대방에게 보내 주세요.</p>';return;}
    var ins=x.kind==='instructor';o.innerHTML='<div class="lkc"><span class="tag'+(ins?' tag-sea':'')+'">'+(ins?'강사':'버디')+'</span><b>'+esc(x.nick||'다이버')+'</b><span class="small">'+esc(x.cert||'')+'</span></div><button class="btn btn-pri" type="button" data-lkok="'+esc(code)+'" style="width:100%;margin-top:10px">'+(ins?'내 강사로 등록하기':'버디로 등록하기')+'</button>';});}
function lkInv127(kind){if(!BE.user)return typeof needLogin==='function'?needLogin('로그인하면 내 링크가 생겨요'):toast('로그인해 주세요');var nk=(state.me&&state.me.nick)||'';var go=function(code){if(!code)return toast('링크를 만들지 못했어요. 잠시 뒤 다시 해 주세요');var link=location.origin+'/'+kind+'/'+code+(nk?'?from='+encodeURIComponent(nk.slice(0,20)):''),
    msg=kind==='t'?'안녕하세요, 강사 '+nk+'입니다. 아래 링크를 눌러 저를 강사로 등록해 주세요. 교육 다이브 로그에 바로 서명·도장을 찍어 드릴게요.\n'+link:'같이 다이빙한 '+nk+'예요 🤿 아래 링크로 버디 등록해 줘요 (버디 코드 '+code+'). 로그 서명을 앱에서 바로 주고받을 수 있어요.\n'+link;
    sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">'+(kind==='t'?'강사 등록 링크':'버디 등록 링크')+'</h2><p class="small" style="margin:0 0 12px">받은 사람이 누르면 '+(kind==='t'?'나를 강사로':'서로 버디로')+' 등록돼요. 코드: <b>'+esc(code)+'</b></p><div class="sglink" style="display:flex;gap:6px"><input readonly value="'+esc(link)+'" style="flex:1"><button class="chip" type="button" data-invcopy="'+esc(link)+'">복사</button></div><textarea id="lkMsg" rows="4" style="width:100%;margin-top:10px">'+esc(msg)+'</textarea><button class="btn btn-pri" type="button" data-lkshare style="width:100%;margin-top:8px">카톡 · 문자로 보내기</button>');};
  if(kind==='t'){stMine(function(s){go(s&&s.code);});return;}
  BE.sb.rpc('my_invite').then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];go(x&&x.code);});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-lkinv]');if(t){lkInv127(t.dataset.lkinv);return;}
  t=e.target.closest('[data-lkadd]');if(t){lkAddSheet127('',t.dataset.lkadd);return;}
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
 '.lkl{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}.lkr{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;background:var(--bg)}.lkr b{white-space:nowrap}.lkr .small{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lkr .chip{padding:4px 10px;font-size:12px}.lkr .tag,.lkc .tag{margin:0}.lkb{display:flex;flex-wrap:wrap;gap:8px}.lkb .btn{flex:1 1 140px;justify-content:center}.lkb2{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.lkor{display:flex;flex-direction:column;gap:6px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.lkor span{font-size:12.5px;color:var(--sub)}.lkc{display:flex;align-items:center;gap:8px;padding:12px;border-radius:12px;background:var(--bg)}'+
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
  order127();
  if(em&&em.parentNode!==box){em.removeAttribute('style');em.className='sfrow';var b=em.querySelector('b');if(b)b.textContent='비상 연락 카드';box.insertBefore(em,box.querySelector('#alPanel'));}
  if(al&&al.parentNode!==box&&al.innerHTML){al.removeAttribute('style');al.className='sfal';var t=al.querySelector(':scope > b');if(t)t.textContent='자동 알림';var p=al.querySelector(':scope > p.small');if(p)p.innerHTML='휴대폰으로 받으려면 <a href="#notice">알림</a>에서 이 기기 알림을 켜 주세요.';box.appendChild(al);}}
(function(){var st=document.createElement('style');st.textContent='#safePanel h2{margin-bottom:6px}#safePanel .sfrow{padding:4px 0 14px}#safePanel .sfrow>div{flex-wrap:nowrap!important}#safePanel .sfrow .small{margin-top:4px!important}#safePanel .sfal{padding-top:14px;border-top:1px solid var(--line)}#safePanel .sfal>b{display:block;font-size:15px;margin-bottom:4px}#safePanel .i6tg{padding:10px 0;font-size:15px}#safePanel .i6tg .small{font-size:12.5px}#safePanel .sfal>p.small{margin:8px 0 0!important}'+
 '#safePanel .i6tg input[type=checkbox]{appearance:none;-webkit-appearance:none;flex-shrink:0;width:46px;height:28px;border-radius:14px;background:var(--line);position:relative;cursor:pointer;transition:background .15s;margin:0}#safePanel .i6tg input[type=checkbox]::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .15s}#safePanel .i6tg input[type=checkbox]:checked{background:var(--sea)}#safePanel .i6tg input[type=checkbox]:checked::after{transform:translateX(18px)}';document.head.appendChild(st);})();
var _after127b=after;after=function(){_after127b();if(cur()==='profile')[700,1500,2600,4000,6000].forEach(function(ms){setTimeout(safeTidy127,ms);});};

/* ---------- 9) 생물 도감 목록: 알약 모양 → 사진 + 글 카드 ---------- */
function lifeg127(){if(cur()!=='life')return;[].forEach.call(document.querySelectorAll('#main .spgrid:not(.lifeg)'),function(g){g.classList.add('lifeg');});}
if(window.MutationObserver)new MutationObserver(function(){if(cur()==='life'&&document.querySelector('#main .spgrid:not(.lifeg)'))lifeg127();}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
(function(){var st=document.createElement('style');st.textContent='#main .spgrid.lifeg{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}#main .spgrid.lifeg a.sp{display:flex;align-items:flex-start;gap:12px;padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--card,#fff);color:var(--ink);text-decoration:none}'+
 '#main .spgrid.lifeg a.sp>img,#main .spgrid.lifeg a.sp>.noimg{display:flex!important;align-items:center;justify-content:center;width:64px!important;height:64px!important;flex:0 0 64px;border-radius:10px;object-fit:cover;background:var(--bg);margin:0;position:static!important}'+
 '#main .spgrid.lifeg a.sp .tx{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}#main .spgrid.lifeg a.sp .tx b{font-size:15px;line-height:1.3}#main .spgrid.lifeg a.sp .tx .en{font-size:13px;color:var(--sub)}#main .spgrid.lifeg a.sp .tx i{font-size:12.5px;color:var(--sub)}#main .spgrid.lifeg a.sp .ab{margin-top:2px}#main .spgrid.lifeg a.sp .small{margin-top:4px}';document.head.appendChild(st);})();
var _after127c=after;after=function(){_after127c();if(cur()==='life')setTimeout(lifeg127,0);};

/* 내 정보 칸 순서: 프로필 → 자격증 카드 → 내 버디·강사 → 안전·알림 */
function order127(){if(cur()!=='profile')return;var v=document.querySelector('#main .view');if(!v)return;var topOf=function(el){return el&&[].filter.call(v.children,function(c){return c.contains(el);})[0];};
  var cc=topOf(document.getElementById('cc2'))||v.querySelector(':scope > .panel.kvp'),ins=document.getElementById('insPanel'),lk=document.getElementById('lkPanel'),sf=document.getElementById('safePanel');if(!cc)return;var at=cc;
  [ins,lk,sf].forEach(function(x){if(x&&x.parentNode===v){if(at.nextElementSibling!==x)at.after(x);at=x;}});}
var _after127d=after;after=function(){_after127d();if(cur()==='profile')[900,2000,3500,5000,7000].forEach(function(ms){setTimeout(order127,ms);});};
document.addEventListener('error',function(e){var i=e.target;if(i&&i.tagName==='IMG'&&i.parentNode&&i.closest&&i.closest('.spgrid.lifeg')){var s=document.createElement('span');s.className='noimg';i.replaceWith(s);}},true);

/* ---------- 10) 내 정보: 강사 칸 (등록 · 코드 · 도장 · 서명) ---------- */
function insFresh127(){state.stMine=undefined;state.canClub=null;var p=document.getElementById('insPanel');if(p)p.remove();setTimeout(insPanel127,400);}
function insPanel127(){if(cur()!=='profile'||!BE.user||document.getElementById('insPanel'))return;var v=document.querySelector('#main .view');if(!v)return;
  if(!state.canClub){if(typeof canClubLoad==='function')canClubLoad();setTimeout(insPanel127,700);return;}
  stMine(function(s){if(cur()!=='profile'||document.getElementById('insPanel'))return;var x=state.canClub||{},isIns=/인스트럭터|instructor|강사/i.test(x.cert||''),ok=!!(s&&s.ok),pend=!ok&&isIns&&x.photos>0;
    var p=document.createElement('div');p.className='panel';p.id='insPanel';
    if(ok){var code=s&&s.code;
      p.innerHTML='<h2>강사 <span class="tag ok">'+(x.verified?'확인됨':'업체 운영자')+'</span></h2>'+
        (code?'<div class="inscode"><span class="small">내 강사 코드</span><b>'+esc(code)+'</b><span class="inscb"><button class="chip" type="button" data-iccopy="'+esc(code)+'">복사</button><button class="chip" type="button" data-lkinv="t">교육생에게 등록 링크</button></span></div>':'<div class="inscode"><span class="small">강사 코드는 도장이나 서명을 등록하면 생겨요.</span></div>')+
        '<div class="insg">'+
        '<a class="inst" href="#stamp"><span class="insth">'+(s&&s.has&&s.image?'<img src="'+esc(s.image)+'" alt="">':'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M9 3h6v5l2 3H7l2-3z"/><path d="M5 14h14v3H5zM4 20h16"/></svg>')+'</span><b>강사 도장</b><span class="small">'+(s&&s.has?'등록됨 · 바꾸기':'등록하기')+'</span></a>'+
        '<button class="inst" type="button" data-inssign><span class="insth">'+(s&&s.sign&&s.sign_image?'<img src="'+esc(s.sign_image)+'" alt="">':'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 17c3-1 4-8 6-8s0 8 3 8 3-4 5-4 2 2 4 2"/><path d="M3 21h18"/></svg>')+'</span><b>강사 서명</b><span class="small">'+(s&&s.sign?'등록됨 · 바꾸기':'등록하기')+'</span></button>'+
        '<button class="inst" type="button" data-insapply><span class="insth"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h4M14 13h3"/></svg></span><b>강사 정보</b><span class="small">'+esc((x.cert||'자격 적기').slice(0,18))+'</span></button>'+
        '</div><p class="small" style="margin:10px 0 0">교육생 로그 서명 화면에서 \'내 도장 · 서명 넣기\'를 누르면 비밀번호 없이 들어가요.</p>';}
    else if(pend){p.innerHTML='<h2>강사 <span class="tag fr">확인 중</span></h2><p class="small" style="margin:0 0 10px">'+esc(x.cert||'')+' · 올린 자격증 사진을 운영자가 보고 있어요. 보통 1~2일 걸리고, 확인되면 강사 코드가 바로 생겨요.</p><button class="btn btn-line" type="button" data-insapply style="width:100%;justify-content:center">자격 · 사진 고치기</button>';}
    else{p.innerHTML='<h2>강사 등록</h2><p class="small" style="margin:0 0 10px">강사라면 자격증 사진으로 등록해 주세요. 확인되면 강사 코드가 생기고, 교육생 로그에 도장 · 서명을 찍을 수 있어요.</p><button class="btn btn-line" type="button" data-insapply style="width:100%;justify-content:center">강사 등록하기</button>';}
    v.appendChild(p);document.body.classList.add('ins127');order127();});}
function insApply127(){var x=state.canClub||{},isIns=/인스트럭터|instructor|강사/i.test(x.cert||'');state.insNew=[];
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">강사 등록하기</h2><p class="small" style="margin:0 0 12px">강사 자격증 사진을 올리면 운영자가 확인해요. 확인되면 강사 코드가 바로 생겨요.'+(x.verified?' <b>자격이나 사진을 바꾸면 다시 확인받아야 해요.</b>':'')+'</p>'+
    '<form id="insForm" class="form" style="grid-template-columns:1fr"><label for="ins_c">강사 자격<input id="ins_c" maxlength="60" value="'+esc(isIns?x.cert:'')+'" placeholder="예: PADI 오픈워터 스쿠버 인스트럭터"></label>'+
    '<label class="drop" for="insIn" style="cursor:pointer"><b>강사 자격증 사진 올리기</b><span class="small" id="insPhN">'+(x.photos?'이미 '+x.photos+'장 올렸어요 · 더 올리면 추가돼요':'앞면이 잘 보이게 · 최대 4장')+'</span></label><input id="insIn" type="file" accept="image/*" multiple style="position:absolute;left:-9999px">'+
    '<button class="btn btn-pri" type="submit">확인 요청하기</button></form>');}
document.addEventListener('change',function(e){if(e.target.id!=='insIn')return;var F=[].slice.call(e.target.files||[],0,4);state.insNew=F;var n=document.getElementById('insPhN');if(n)n.textContent=F.length?F.length+'장 골랐어요':'앞면이 잘 보이게 · 최대 4장';});
document.addEventListener('submit',function(e){if(e.target.id!=='insForm')return;e.preventDefault();var c=(val('ins_c')||'').trim(),x=state.canClub||{},F=state.insNew||[];if(c.length<3)return toast('강사 자격을 적어 주세요');if(!/인스트럭터|instructor|강사/i.test(c))c+=' 강사';if(!F.length&&!x.photos)return toast('강사 자격증 사진을 올려 주세요');
  var b=e.target.querySelector('button[type=submit]');b.disabled=true;b.textContent='올리는 중…';
  BE.sb.from('profiles').select('cert_photos').eq('id',BE.user.id).maybeSingle().then(function(r){var P=((r.data&&r.data.cert_photos)||[]).slice(0,4),k=Math.min(F.length,Math.max(0,4-P.length));
    var fin=function(){BE.sb.from('profiles').update({cert:c,cert_photos:P}).eq('id',BE.user.id).then(function(u){if(u.error){b.disabled=false;b.textContent='확인 요청하기';return toast('보내지 못했어요: '+u.error.message);}if(state.me)state.me.cert=c;closeSheet();toast('확인 요청을 보냈어요. 1~2일 안에 알려 드릴게요');insFresh127();});};
    if(!k)return fin();var left=k;F.slice(0,k).forEach(function(f){shrink(f,function(u){upload('docs',dataUrlToBlob(u),'cert.jpg').then(function(pth){P.push(pth);}).catch(function(){toast('사진 하나를 올리지 못했어요');}).then(function(){if(--left===0)fin();});});});});});
/* 강사 서명 등록 */
function insSign127(){var s=state.stMine||{};sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">강사 서명 등록</h2><p class="small" style="margin:0 0 10px">한 번 등록하면 교육생 로그에 매번 그리지 않고 넣을 수 있어요.</p>'+(s.sign_image?'<div class="inssv"><span class="small">지금 서명</span><img src="'+esc(s.sign_image)+'" alt="지금 서명"></div>':'')+'<canvas id="insPad" width="640" height="260" class="inspad" aria-label="여기에 서명"></canvas><div class="insbt"><button class="btn btn-line" type="button" data-insclr>다시 쓰기</button>'+(s.sign?'<button class="btn btn-line" type="button" data-insdel>서명 지우기</button>':'')+'<button class="btn btn-pri" type="button" data-inssave>저장</button></div>');
  setTimeout(function(){var c=document.getElementById('insPad');if(!c)return;var g=c.getContext('2d'),dn=false,lx=0,ly=0;g.lineWidth=4.5;g.lineCap='round';g.lineJoin='round';g.strokeStyle='#0b1f33';
    var pt=function(e){var r=c.getBoundingClientRect();return [(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height];};
    c.addEventListener('pointerdown',function(e){dn=true;c.setPointerCapture(e.pointerId);var p=pt(e);lx=p[0];ly=p[1];e.preventDefault();});
    c.addEventListener('pointermove',function(e){if(!dn)return;var p=pt(e);g.beginPath();g.moveTo(lx,ly);g.lineTo(p[0],p[1]);g.stroke();lx=p[0];ly=p[1];c.dataset.ink=1;e.preventDefault();});
    ['pointerup','pointercancel','pointerleave'].forEach(function(k){c.addEventListener(k,function(){dn=false;});});},60);}
document.addEventListener('click',function(e){if(e.target.closest('[data-insapply]')){insApply127();return;}if(e.target.closest('[data-inssign]')){insSign127();return;}
  if(e.target.closest('[data-insclr]')){var c=document.getElementById('insPad');if(c){c.getContext('2d').clearRect(0,0,c.width,c.height);delete c.dataset.ink;}return;}
  var t=e.target.closest('[data-inssave],[data-insdel]');if(!t)return;var del=!!t.dataset.insdel,c2=document.getElementById('insPad');if(!del&&!(c2&&c2.dataset.ink))return toast('서명을 그려 주세요');if(del&&!confirm('저장한 서명을 지울까요?'))return;t.disabled=true;
  BE.sb.rpc('instr_sign_save',{p_img:del?null:c2.toDataURL('image/png')}).then(function(r){var v=r.data;if(r.error||v!=='ok'){t.disabled=false;return toast(v==='notok'?'강사 확인이 끝난 뒤에 등록할 수 있어요':'저장하지 못했어요');}closeSheet();toast(del?'서명을 지웠어요':'강사 서명을 저장했어요');insFresh127();});});
/* 서명 화면: 저장한 서명도 비밀번호 없이 */
if(typeof sgPrefill==='function')sgPrefill=function(){var f=document.getElementById('sgForm');if(!f||f.dataset.pre||!BE.user)return;f.dataset.pre=1;stMine(function(m){if(!m||!(m.has||m.sign))return;var n=document.getElementById('sg_n'),r=document.getElementById('sg_r'),c=document.getElementById('sg_c');if(n&&!n.value&&state.me&&state.me.nick)n.value=state.me.nick;if(r)r.value='instructor';if(c&&!c.value&&m.label)c.value=m.label;setTimeout(function(){var k=document.getElementById('sg_mine');if(k)k.checked=true;},300);});};
function sgMine127(){if(cur()!=='sign'||!BE.user)return;stMine(function(m){if(!m||!m.sign)return;var r=document.getElementById('stMineRow');if(!r||r.dataset.s127)return;r.dataset.s127=1;
  if(!m.has)r.innerHTML='<label style="display:flex;gap:8px;align-items:center;margin-top:8px;cursor:pointer"><input type="checkbox" id="sg_mine" checked><img src="'+esc(m.sign_image)+'" alt="" style="width:72px;height:30px;object-fit:contain"> 내 강사 서명 넣기 (비밀번호 없이)</label>';
  else{var l=r.querySelector('label');if(l)l.insertAdjacentHTML('beforeend',' + 저장한 서명');}var d=r.closest('details');if(d)d.open=true;});}
(function(){var st=document.createElement('style');st.textContent='.ins127 #icPanel,.ins127 #myCert{display:none!important}#insPanel h2{display:flex;align-items:center;gap:8px}#insPanel h2 .tag{margin:0;font-size:12px}'+
 '.inscode{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:12px 14px;border-radius:12px;background:var(--bg);margin-bottom:10px}.inscode .small{flex-basis:100%}.inscode b{font:700 26px Sora,sans-serif;letter-spacing:2px}.inscb{display:flex;gap:6px;flex-wrap:wrap}'+
 '.insg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.inst{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 6px;border:1px solid var(--line);border-radius:12px;background:var(--card,#fff);color:var(--ink);font:inherit;text-decoration:none;text-align:center;cursor:pointer;min-width:0}.inst b{font-size:14px}.inst .small{font-size:12px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.insth{display:flex;align-items:center;justify-content:center;width:52px;height:40px;color:var(--sea)}.insth img{max-width:52px;max-height:40px;object-fit:contain}'+
 '.inspad{width:100%;height:auto;aspect-ratio:64/26;border:1.5px dashed var(--line);border-radius:12px;background:#fff;touch-action:none;display:block}.insbt{display:flex;gap:8px;margin-top:10px}.insbt .btn{flex:1;justify-content:center}.inssv{display:flex;align-items:center;gap:10px;margin-bottom:8px}.inssv img{height:40px;max-width:160px;object-fit:contain;background:#fff;border-radius:6px}';document.head.appendChild(st);})();
var _after127e=after;after=function(){_after127e();var c=cur();if(c==='profile')[650,1600,3000].forEach(function(ms){setTimeout(insPanel127,ms);});if(c==='sign')[900,2200,4000].forEach(function(ms){setTimeout(sgMine127,ms);});};

document.addEventListener('click',function(e){var t=e.target.closest('[data-budcopy]');if(t&&navigator.clipboard)navigator.clipboard.writeText(t.dataset.budcopy).then(function(){toast('버디 코드를 복사했어요');});});
