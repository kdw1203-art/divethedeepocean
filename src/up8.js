/* ===== 5차 ===== */
/* 261 업체 연락처·서류는 본인과 운영자만: 공개 열만 읽고, 나머지는 함수로 받아 합쳐요 */
function bizCols(){return 'id,owner,biz_type,name,name_en,spot,addr,web,langs,services,orgs,facilities,price,intro,status,created_at,reject_reason,reviewed_at,photos,price_list,hours,paused,parent_id';}
function bizPriv(r){if(!r||!r.data||!r.data.length||!BE.user)return r;return BE.sb.rpc('biz_private',{ids:r.data.map(function(b){return b.id;})}).then(function(p){var o={};(p.data||[]).forEach(function(x){o[x.id]=x;});r.data.forEach(function(b){var x=o[b.id];if(x){b.owner_name=x.owner_name;b.email=x.email;b.tel=x.tel;b.docs=x.docs;}});return r;},function(){return r;});}

/* 87 사용자 차단: 차단한 사람의 글·댓글·메시지·판매글·모임·후기를 내 화면에서 숨겨요 */
state.blocked={};state.blockedList=[];
function blocksLoad(){if(!BE.on||!BE.user||blocksLoad.b)return;blocksLoad.b=1;BE.sb.from('blocks').select('blocked,blocked_nick,created_at').eq('owner',BE.user.id).then(function(r){blocksLoad.b=0;state.blockedList=r.data||[];state.blocked={};state.blockedList.forEach(function(x){state.blocked[x.blocked]=1;});rerender();});}
var BLOCKCOL={posts:'owner',comments:'owner',board_posts:'owner',board_replies:'owner',messages:'sender',market_items:'owner',meetups:'owner',jobs:'owner',spot_reviews:'owner',biz_reviews:'owner',meetup_messages:'sender'};
(function patchFrom(){if(!BE.on||!BE.sb||BE.sb._bp)return;var of=BE.sb.from.bind(BE.sb);BE.sb._bp=1;
  BE.sb.from=function(t){var q=of(t),col=BLOCKCOL[t];if(!col)return q;var os=q.select.bind(q);
    q.select=function(){var b=os.apply(null,arguments),ot=b.then.bind(b);b.then=function(res,rej){return ot(function(r){if(r&&Array.isArray(r.data)&&BE.user&&Object.keys(state.blocked).length)r.data=r.data.filter(function(x){return !(x[col]&&x[col]!==BE.user.id&&state.blocked[x[col]]);});return res?res(r):r;},rej);};return b;};return q;};})();
function blockBtn(uid,nick){if(!BE.user||!uid||uid===BE.user.id)return '';return state.blocked[uid]?'<button class="chip" type="button" data-unblock="'+esc(uid)+'">차단 풀기</button>':'<button class="chip" type="button" data-block="'+esc(uid)+'" data-nick="'+esc(nick||'')+'">차단</button>';}
var _feed8=V.feed;V.feed=function(){var save=state.pubPosts;if(save&&BE.user)state.pubPosts=save.filter(function(p){return !(p.owner&&state.blocked[p.owner]);});var h=_feed8();state.pubPosts=save;
  (state.pubPosts||[]).forEach(function(p){if(!p.owner||!BE.user||p.owner===BE.user.id)return;var k='data-report="post" data-rid="'+p.dbid+'"',i=h.indexOf(k);if(i<0)return;var s=h.lastIndexOf('<button',i);if(s<0)return;h=h.slice(0,s)+blockBtn(p.owner,p.user)+h.slice(s);});return h;};
var _inbox8=V.inbox;V.inbox=function(arg){var save=state.inbox;if(save&&BE.user)state.inbox=save.filter(function(m){var o=m.sender===BE.user.id?m.recipient:m.sender;return !state.blocked[o];});var h=_inbox8(arg);state.inbox=save;
  if(arg&&/^[0-9a-f-]{36}$/.test(String(arg))){var m=(save||[]).filter(function(x){return x.sender===arg;})[0];h+='<div class="panel"><h2>이 사람과의 대화</h2><div style="display:flex;gap:8px;flex-wrap:wrap">'+blockBtn(arg,m&&m.sender_nick)+'<button class="chip" type="button" data-ureport="'+esc(arg)+'">신고</button></div><p class="small" style="margin:8px 0 0">차단하면 서로의 메시지가 내 화면에 보이지 않아요. 상대에게는 알리지 않아요.</p></div>';}
  return h;};
var _acct8=V.account;V.account=function(){var h=_acct8();if(!BE.user)return h;var L=state.blockedList||[];
  var p='<div class="panel"><h2>차단한 사용자</h2>'+(L.length?'<div class="list">'+L.map(function(x){return '<div class="item"><span class="tx"><b>'+esc(x.blocked_nick||'다이버')+'</b><span>'+String(x.created_at||'').slice(0,10)+' 차단</span></span><button class="chip" type="button" data-unblock="'+esc(x.blocked)+'">차단 풀기</button></div>';}).join('')+'</div>':'<p class="empty" style="margin:0">차단한 사용자가 없어요. 피드나 메시지에서 \'차단\'을 누르면 여기 모여요.</p>')+'</div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-block],[data-unblock]');if(!t)return;if(!BE.user)return needLogin('로그인 후에 쓸 수 있어요');
  if(t.dataset.block){if(!confirm((t.dataset.nick||'이 사용자')+'님을 차단할까요? 이 사람의 글과 메시지가 내 화면에서 사라져요.'))return;t.disabled=true;BE.sb.from('blocks').insert({owner:BE.user.id,blocked:t.dataset.block,blocked_nick:t.dataset.nick||null}).then(function(r){if(r.error&&!/duplicate|unique/.test(r.error.message)){toast('차단하지 못했어요');t.disabled=false;return;}toast('차단했어요. 내 정보 → 계정 관리에서 풀 수 있어요');BE.pull&&BE.pull();blocksLoad();});}
  else{t.disabled=true;BE.sb.from('blocks').delete().eq('owner',BE.user.id).eq('blocked',t.dataset.unblock).then(function(){toast('차단을 풀었어요');BE.pull&&BE.pull();blocksLoad();});}});

/* 289 내가 보낸 제보의 처리 결과 */
state.myRep=null;
var _notice8=V.notice;V.notice=function(){var h=_notice8();if(!BE.user||!BE.on)return h;if(!state.myRep&&!V.notice.r8){V.notice.r8=1;BE.sb.from('reports').select('id,target_type,reason,status,admin_note,created_at,resolved_at').eq('reporter',BE.user.id).order('created_at',{ascending:false}).limit(30).then(function(r){state.myRep=r.data||[];if(cur()==='notice')rerender();});}
  var L=state.myRep||[];if(!L.length)return h;var ST={open:['확인 중','gray'],done:['반영함','ok'],dismissed:['반영 안 함','fr']};
  var p='<div class="panel"><h2>내가 보낸 제보</h2><div class="list">'+L.map(function(r){var s=ST[r.status]||ST.open;return '<div class="item" style="flex-direction:column;align-items:stretch"><span class="tx"><span>'+tags([s])+' '+String(r.created_at).slice(0,10)+'</span><span style="color:var(--ink)">'+esc(String(r.reason||'').slice(0,120))+'</span>'+(r.admin_note?'<span>운영자: '+esc(r.admin_note)+'</span>':'')+'</span></div>';}).join('')+'</div><p class="small" style="margin:8px 0 0">제보는 운영자가 확인한 뒤에만 반영돼요.</p></div>';
  return h+p;};

/* 170 업체 심사 결과를 업체 휴대폰으로 알림 */
var _ass8=admSetStatus;admSetStatus=function(id){var a=arguments;return _ass8.apply(null,a).then(function(r){pushNote('biz',id);return r;});};
var _after8=after;after=function(){_after8();if(BE.user&&!blocksLoad.done){blocksLoad.done=1;blocksLoad();}};

document.addEventListener('click',function(e){var t=e.target.closest('[data-ureport]');if(!t)return;if(!BE.user)return needLogin('신고하려면 로그인해 주세요');var r=prompt('신고 사유를 적어 주세요','스팸 · 욕설 · 사기 의심');if(!r)return;BE.sb.from('reports').insert({reporter:BE.user.id,target_type:'user',target_id:0,reason:('[사용자 '+t.dataset.ureport+'] '+r).slice(0,300)}).then(function(x){toast(x.error?'보내지 못했어요':'접수했어요. 운영자가 확인할게요');});});
/* 270 태그 글자도 이스케이프 (업체 종류·단체명 등 사용자가 넣은 값) */
tags=function(t){return (t||[]).map(function(x){return '<span class="tag '+String(x[1]||'').replace(/[^\w -]/g,'')+'">'+esc(String(x[0]==null?'':x[0]))+'</span>';}).join(' ');};

/* 102 Garmin FIT 파일 읽기 (수심 기록에서 날짜·최대 수심·시간) */
function parseFIT(buf){var dv=new DataView(buf),hs=dv.getUint8(0),size=dv.getUint32(4,true),end=Math.min(hs+size,buf.byteLength),p=hs,defs={},last=0,t0=0,t1=0,maxd=0,start=0;
  if(String.fromCharCode(dv.getUint8(8),dv.getUint8(9),dv.getUint8(10),dv.getUint8(11))!=='.FIT')return [];
  function rd(off,sz,le){if(sz===1)return dv.getUint8(off);if(sz===2)return dv.getUint16(off,le);if(sz===4)return dv.getUint32(off,le);return null;}
  while(p<end){var h=dv.getUint8(p++);
    if(h&0x80){var lt=(h>>5)&3,off=h&0x1F,d=defs[lt];if(!d)break;var ts=(last&~0x1F)+off;if(off<(last&0x1F))ts+=0x20;last=ts;var v=read(d,p);p+=d.len;rec(d,v,ts);continue;}
    if(h&0x40){var loc=h&0x0F,dev=h&0x20,le=dv.getUint8(p+1)===0,g=le?dv.getUint16(p+2,true):dv.getUint16(p+2,false),nf=dv.getUint8(p+4),q=p+5,F=[],len=0;
      for(var i=0;i<nf;i++){F.push([dv.getUint8(q),dv.getUint8(q+1)]);len+=dv.getUint8(q+1);q+=3;}
      if(dev){var nd=dv.getUint8(q);q++;for(var j=0;j<nd;j++){F.push([-1,dv.getUint8(q+1)]);len+=dv.getUint8(q+1);q+=3;}}
      defs[loc]={g:g,le:le,f:F,len:len};p=q;continue;}
    var dd=defs[h&0x0F];if(!dd)break;var vv=read(dd,p);p+=dd.len;if(vv[253]!=null&&vv[253]!==0xFFFFFFFF)last=vv[253];rec(dd,vv,vv[253]);}
  function read(d,at){var o={},q=at;d.f.forEach(function(f){if(f[0]>=0)o[f[0]]=rd(q,f[1],d.le);q+=f[1];});return o;}
  function rec(d,v,ts){if(d.g===20){if(ts&&ts!==0xFFFFFFFF){if(!t0)t0=ts;t1=ts;}var dp=v[92];if(dp!=null&&dp!==0xFFFFFFFF&&dp>0)maxd=Math.max(maxd,dp/1000);}
    if(d.g===18&&v[2]&&v[2]!==0xFFFFFFFF)start=v[2];}
  var s=start||t0;if(!s||!maxd)return [];var dt=new Date((s+631065600)*1000),date=dt.getFullYear()+'-'+('0'+(dt.getMonth()+1)).slice(-2)+'-'+('0'+dt.getDate()).slice(-2);
  return [{date:date,depth:Math.round(maxd*10)/10,time:t1>t0?Math.round((t1-t0)/60):null,site:'Garmin 기록'}];}

/* 116 로그 지우기 되돌리기 · 113·116 로그 고치기 (사진 · 본 생물 · 메모) */
function logDelete(id){var L=(state.userLogs||[]).filter(function(l){return l.id===id;})[0];if(!confirm('이 로그를 지울까요? 바로 아래에서 되돌릴 수 있어요.'))return;
  BE.sb.from('dive_logs').select('*').eq('id',id).maybeSingle().then(function(r){var row=r.data;return BE.sb.from('dive_logs').delete().eq('id',id).then(function(x){if(x.error){toast('지우지 못했어요');return;}BE.pull();undoBar('로그를 지웠어요',function(){if(!row)return;delete row.id;BE.sb.from('dive_logs').insert(row).then(function(y){toast(y.error?'되돌리지 못했어요':'되돌렸어요');BE.pull();});});
    try{var tr=LS.get('logTrash',[]);tr.unshift({at:Date.now(),row:row});LS.set('logTrash',tr.filter(function(t){return Date.now()-t.at<30*864e5;}).slice(0,30));}catch(e){}});});}
function undoBar(msg,fn){var b=document.getElementById('undoBar');if(b)b.remove();b=document.createElement('div');b.id='undoBar';b.setAttribute('role','status');b.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:84px;z-index:950;background:var(--deep);color:#fff;border-radius:14px;padding:10px 12px 10px 16px;display:flex;gap:12px;align-items:center;box-shadow:0 6px 20px rgba(0,0,0,.25)';b.innerHTML='<span>'+esc(msg)+'</span><button type="button" class="chip" style="background:#fff">되돌리기</button>';document.body.appendChild(b);b.querySelector('button').onclick=function(){b.remove();fn();};setTimeout(function(){if(b.parentNode)b.remove();},9000);}
var _log8=V.log;V.log=function(){var h=_log8();var tr=LS.get('logTrash',[]).filter(function(t){return Date.now()-t.at<30*864e5;});
  h=h.replace(/<button class="chip" type="button" data-ldel="(\d+)">삭제<\/button>/g,'<span style="display:flex;gap:6px"><button class="chip" type="button" data-ledit="$1">고치기</button><button class="chip" type="button" data-ldel="$1">삭제</button></span>');
  if(tr.length&&BE.user)h=h.replace('<div class="cols">','<details class="panel"><summary><b>최근 지운 로그 '+tr.length+'개</b> <span class="small">30일 동안 되살릴 수 있어요</span></summary><div class="list" style="margin-top:8px">'+tr.map(function(t,i){var r=t.row||{};return '<div class="item"><span class="tx"><span>'+esc(r.dive_date||'')+'</span><b>'+esc(r.site||'포인트 없음')+'</b><span>최대 '+esc(r.max_depth||'—')+'m · '+esc(r.minutes||'—')+'분</span></span><button class="chip" type="button" data-lrestore="'+i+'">되살리기</button></div>';}).join('')+'</div></details><div class="cols">');
  return h;};
function logEdit(id){BE.sb.from('dive_logs').select('*').eq('id',id).maybeSingle().then(function(r){var l=r.data;if(!l)return toast('로그를 불러오지 못했어요');
  var box=sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2>로그 고치기</h2><form class="form" id="leForm" data-id="'+l.id+'" novalidate><label for="le_d">날짜<input id="le_d" type="date" value="'+esc(l.dive_date||'')+'"></label><label for="le_s">포인트<input id="le_s" value="'+esc(l.site||'')+'" list="spotList"></label><label for="le_p">최대 수심 (m)<input id="le_p" inputmode="decimal" value="'+esc(l.max_depth==null?'':l.max_depth)+'"></label><label for="le_t">시간 (분)<input id="le_t" inputmode="numeric" value="'+esc(l.minutes==null?'':l.minutes)+'"></label><label for="le_b">버디<input id="le_b" maxlength="60" value="'+esc(l.buddy||'')+'"></label><label for="le_v">시야<input id="le_v" maxlength="20" placeholder="예: 15m" value="'+esc(l.visibility||'')+'"></label><label for="le_sp" style="grid-column:1/-1">본 생물 (쉼표로 구분)<input id="le_sp" placeholder="예: 바다거북, 만타, 갯민숭달팽이" value="'+esc((l.species||[]).join(', '))+'"></label><label for="le_n" style="grid-column:1/-1">메모<textarea id="le_n" rows="3" maxlength="1000" placeholder="조류, 수온, 장비, 다음에 해 볼 것">'+esc(l.notes||'')+'</textarea></label><label for="le_ph" style="grid-column:1/-1">사진 '+(l.photo?'(바꾸려면 새로 고르기)':'(선택)')+'<input id="le_ph" type="file" accept="image/*"></label>'+(l.photo?'<img src="'+esc(pubUrl(l.photo))+'" alt="로그 사진" style="grid-column:1/-1;max-height:160px;object-fit:cover;border-radius:12px">':'')+'<div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">저장</button></div></form>');
  box.querySelector('#leForm').onsubmit=function(e){e.preventDefault();var f=e.target,btn=f.querySelector('button[type=submit]');btn.disabled=true;
    var up={dive_date:val('le_d')||null,site:val('le_s')||null,max_depth:val('le_p')?+val('le_p'):null,minutes:val('le_t')?+val('le_t'):null,buddy:val('le_b')||null,visibility:val('le_v')||null,species:val('le_sp')?val('le_sp').split(/[,·]/).map(function(x){return x.trim();}).filter(Boolean).slice(0,30):[],notes:val('le_n')||null};
    var fi=sel('le_ph').files[0];var go=function(path){if(path)up.photo=path;BE.sb.from('dive_logs').update(up).eq('id',+f.dataset.id).then(function(x){if(x.error){toast('저장하지 못했어요');btn.disabled=false;return;}closeSheet();toast('로그를 고쳤어요');BE.pull();});};
    if(fi)shrink(fi,function(u){upload('media',dataUrlToBlob(u),'log.jpg').then(go).catch(function(){toast('사진을 올리지 못했어요');btn.disabled=false;});});else go(null);};});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-ledit],[data-lrestore]');if(!t)return;if(!BE.user)return needLogin('로그인 후에 쓸 수 있어요');
  if(t.dataset.ledit)return logEdit(+t.dataset.ledit);
  var tr=LS.get('logTrash',[]),it=tr[+t.dataset.lrestore];if(!it||!it.row)return;var row=Object.assign({},it.row);delete row.id;t.disabled=true;BE.sb.from('dive_logs').insert(row).then(function(y){if(y.error){toast('되살리지 못했어요');t.disabled=false;return;}tr.splice(+t.dataset.lrestore,1);LS.set('logTrash',tr);toast('되살렸어요');BE.pull();rerender();});});

/* 46 지도 필터 더하기: 수심 · 입수 방식 · 조류  /  60 지도 상태를 주소에 담기 (공유·새로고침해도 그대로) */
state.mf=LS.get('mapF',{d:'',e:'',c:''});
function mfOk(s){var f=state.mf,r=depthRange(s),k=String(s.kind||'')+' '+String(s.route||'');
  if(f.d==='18'&&r[0]>18)return false;if(f.d==='30'&&r[1]<30)return false;
  if(f.e==='beach'&&!/비치|해안|샤워|해변|쇼어|shore/i.test(k))return false;if(f.e==='boat'&&!/보트|boat/i.test(k))return false;if(f.e==='la'&&!/리브어보드/.test(k))return false;
  if(f.c==='yes'&&!/조류|드리프트/.test(k))return false;if(f.c==='no'&&/조류|드리프트/.test(k))return false;return true;}
var _vis8=vis;vis=function(s){return _vis8(s)&&(cur()!=='map'||mfOk(s));};
function mapHash(){var v=state.lv,f=state.mf,parts=[v?[v.z,(+v.c[0]).toFixed(3),(+v.c[1]).toFixed(3)].join(','):'',state.lvl==='전체'?'':state.lvl||'',state.mon||'',state.region==='전체'?'':state.region||'',state.mode==='all'?'':state.mode||'',f.d,f.e,f.c];return '#map-'+parts.map(encodeURIComponent).join('~');}
var _map8=V.map;V.map=function(arg){if(arg&&!V.map.applied){V.map.applied=1;var p=String(arg).split('~').map(function(x){try{return decodeURIComponent(x);}catch(e){return x;}});var v=(p[0]||'').split(',');
    if(v.length===3&&isFinite(+v[0]))state.lv={z:+v[0],c:[+v[1],+v[2]]};if(p[1])state.lvl=p[1];if(p[2]!==undefined)state.mon=+p[2]||0;if(p[3])state.region=p[3];if(p[4])state.mode=p[4];state.mf={d:p[5]||'',e:p[6]||'',c:p[7]||''};LS.set('mapF',state.mf);}
  V.map.applied=1;var h=_map8(),f=state.mf;
  function ch(k,v,l){return '<button class="chip" type="button" data-mf="'+k+'" data-v="'+v+'" aria-pressed="'+(f[k]===v)+'">'+l+'</button>';}
  var row='<div class="chips" role="group" aria-label="더 고르기" style="margin:-4px 0 8px">'+ch('d','','수심 전체')+ch('d','18','18m 안에서')+ch('d','30','30m 이상')+'<span style="width:8px"></span>'+ch('e','','입수 전체')+ch('e','beach','비치')+ch('e','boat','보트')+ch('e','la','리브어보드')+'<span style="width:8px"></span>'+ch('c','','조류 상관없음')+ch('c','yes','조류 포인트')+ch('c','no','조류 약한 곳')+'<button class="chip" type="button" id="mapShare">이 지도 링크 복사</button></div>';
  return h.replace('<div id="lmap"',row+'<div id="lmap"');};
function mapHashSync(){if(cur()!=='map')return;try{history.replaceState(null,'',mapHash());}catch(e){}}
document.addEventListener('click',function(e){var t=e.target.closest('[data-mf],#mapShare');if(!t)return;
  if(t.id==='mapShare'){mapHashSync();var u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){toast('지금 보는 지도와 필터를 링크로 복사했어요');}).catch(function(){prompt('이 주소를 복사해 주세요',u);});return;}
  state.mf[t.dataset.mf]=t.dataset.v;LS.set('mapF',state.mf);rerender();mapHashSync();});
var _after8b=after;after=function(){_after8b();if(cur()==='map'){setTimeout(mapHashSync,50);var el=document.getElementById('lmap');if(el&&el._m&&!el._hs){el._hs=1;el._m.on('moveend',function(){setTimeout(mapHashSync,30);});}}};
document.addEventListener('change',function(e){if(cur()==='map')setTimeout(mapHashSync,60);});

/* 156 입력 예시를 실제 예로 */
(function(){var PH={biz:{name:'예: 블루코너 다이브 리조트',addr:'예: Brgy. Tabinay, Puerto Galera, Oriental Mindoro',owner:'예: 김바다',email:'예: hello@bluecorner.com'},gearreg:{model:'예: MK25 EVO / S620Ti',serial:'예: 2304A1187 (호흡기 1단계에 각인)'},sell:{title:'예: 스쿠바프로 MK25/S620Ti 호흡기 세트 (2023 오버홀)',brand:'예: Scubapro MK25 EVO',price:'예: 650000'},meet:{title:'예: 12월 첫 주 문섬 펀다이빙 (보트 2회)'}};
  Object.keys(PH).forEach(function(id){var F=FORMS[id];if(!F)return;F.steps.forEach(function(s){s.f.forEach(function(f){if(PH[id][f.k]&&!f.ph)f.ph=PH[id][f.k];});});});})();

/* 152 제출 뒤 '다음 할 일' 안내 · 157 완료 기록 */
state.justDone=null;
var NEXT={biz:{t:'업체 등록을 접수했어요',s:['운영자가 서류를 보고 보통 1~3일 안에 심사해요.','결과는 알림과 휴대폰 알림으로 알려드려요. 알림 화면에서 \'이 기기로 알림 받기\'를 켜 두세요.','기다리는 동안 업체 사진, 가격표, 운영 시간을 채워 두면 승인 직후 바로 손님을 받을 수 있어요.'],a:[['#notice','알림 켜기']]},
  sell:{t:'판매글을 올렸어요',s:['장비 화면과 검색에 바로 보여요.','사고 싶은 사람이 메시지를 보내면 알림이 와요.','팔리면 판매글에서 \'판매 완료\'로 바꿔 주세요.'],a:[['#inbox','메시지함']]},
  meet:{t:'모임을 만들었어요',s:['모임 화면에 바로 공개돼요.','참가자가 생기면 아래 참가자 채팅에서 집결 시간과 장비를 정해요.','링크를 친구에게 보내 함께 모아 보세요.'],a:[['#community','모임 목록']]},
  gearreg:{t:'장비를 등록했어요',s:['정비 시기가 가까워지면 알림 화면에 표시돼요.','판매할 때는 정비 이력이 있으면 더 빨리 팔려요.'],a:[['#notice','알림 보기']]},
  signup:{t:'가입을 마쳤어요',s:['처음 할 일: 다녀온 포인트에 \'다녀왔어요\'를 누르면 홈 지도에 표시돼요.','로그 화면에서 첫 다이브를 기록해 보세요.','알림 화면에서 휴대폰 알림을 켜 두면 메시지를 놓치지 않아요.'],a:[['#map','포인트 찾기'],['#log','첫 로그 쓰기']]}};
if(BE.submit){var _sub8=BE.submit;BE.submit=function(id){var r=_sub8.apply(this,arguments);if(r&&r.then)return r.then(function(x){state.justDone={f:id,t:Date.now()};fev(id,'ok');return x;},function(e){fev(id,'fail');throw e;});state.justDone={f:id,t:Date.now()};return r;};}
Object.keys(FORMS).forEach(function(k){var d=FORMS[k].done;if(typeof d==='function')FORMS[k].done=function(){state.justDone={f:k,t:Date.now()};return d.apply(this,arguments);};});
var _after8c=after;after=function(){_after8c();var j=state.justDone;if(!j||Date.now()-j.t>120000||cur()===j.f)return;var n=NEXT[j.f];if(!n)return;var v=document.querySelector('#main .view, main .view');if(!v||v.querySelector('#nextBox'))return;
  var box=document.createElement('div');box.className='panel';box.id='nextBox';box.style.border='2px solid var(--ok)';box.innerHTML='<h2>✓ '+esc(n.t)+' <button class="chip" type="button" id="nextX">닫기</button></h2><ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px">'+n.s.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ol><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'+n.a.map(function(a){return '<a class="btn btn-line" href="'+a[0]+'">'+esc(a[1])+'</a>';}).join('')+'</div>';
  var vh=v.querySelector('.vh');if(vh&&vh.nextSibling)v.insertBefore(box,vh.nextSibling);else v.prepend(box);};
document.addEventListener('click',function(e){if(e.target.id==='nextX'){state.justDone=null;var b=document.getElementById('nextBox');if(b)b.remove();}});
