/* ===== up124: 소모임 · 클럽 탭 정리, 소모임 고도화, 클럽 고도화, 초대, 소모임 → 클럽 이전 ===== */
(function(){var st=document.createElement('style');st.textContent=
/* 소모임 | 클럽 · 모임 전환 막대: 바탕이 페이지와 같은 색이라 안 보이던 것 */
'#ctypeBox.ctseg{background:var(--panel)!important;border:1px solid var(--line);max-width:460px!important}#ctypeBox.ctseg .ctype{display:flex!important;flex:1;gap:4px;margin:0!important;flex-wrap:nowrap}#ctypeBox.ctseg .ctype a{min-width:0!important}'+
'.m4seg{display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--bg);border:1px solid var(--line);margin:0 0 12px}.m4seg button{flex:1;min-height:36px;border:0;border-radius:999px;background:none;color:var(--sub);font:inherit;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap}.m4seg button[aria-pressed=true]{background:var(--sea);color:#fff}:root[data-theme=dark] .m4seg button[aria-pressed=true]{color:#06202e}.m4seg em{font-style:normal;opacity:.75;margin-left:4px;font-size:12px}'+
'.m4k{margin:0 0 10px}.m4k .chip{min-height:32px;font-size:13px}'+
'.m4i{align-items:center}.m4i .m4d{flex:none;width:50px;text-align:center;border-radius:12px;background:var(--bg);padding:6px 0;line-height:1.1}.m4i .m4d b{display:block;font-size:19px}.m4i .m4d span{font-size:11.5px;color:var(--sub)}.m4i.past{opacity:.78}.m4i .tx>span:first-child{display:flex;flex-wrap:wrap;gap:4px;align-items:center}'+
'.m4hint{margin:8px 0 0;font-size:12.5px;color:var(--sub)}'+
'.m4ban{display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-radius:14px;padding:12px 14px;margin:0 0 12px;background:var(--bg);border:1px solid var(--line);font-size:14px}.m4ban b{flex:1;min-width:180px}.m4ban.done{border-color:var(--sea)}'+
'.m2mem{display:flex;flex-direction:column;gap:6px;max-height:220px;overflow:auto;margin:6px 0 10px;padding:8px 10px;border:1px solid var(--line);border-radius:12px}.m2mem label{display:flex!important;flex-direction:row!important;justify-content:flex-start!important;gap:10px;align-items:center;font-size:14px;font-weight:500;margin:0}.m2mem input{width:auto!important;margin:0;flex:none}#m2form .ck{display:flex!important;flex-direction:row!important;gap:10px;align-items:flex-start;font-weight:500}#m2form .ck input{width:auto!important;flex:none;margin-top:3px}.m4i .fitb{align-self:flex-start}'+
'.m2price{border-radius:14px;background:var(--bg);padding:12px 14px;margin:10px 0;font-size:14px;display:grid;grid-template-columns:1fr auto;gap:4px 12px}.m2price b{font-size:17px}'+
'.invcard{border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:0 0 12px;font-size:14px;line-height:1.55}.invcard b{display:block;font-size:15.5px}.invqr{display:flex;justify-content:center;margin:10px 0}.invqr svg{width:180px;height:180px;background:#fff;border-radius:12px}'+
'.invmsg{width:100%;box-sizing:border-box;min-height:96px;margin-top:6px;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font:inherit;font-size:14px;background:var(--panel);color:var(--ink)}'+
'.clq{display:flex;gap:8px;margin:0 0 10px;flex-wrap:wrap}.clq input{flex:1;min-width:160px}.clq select{flex:none}.clq input,.clq select{min-height:40px;box-sizing:border-box;border:1px solid var(--line);border-radius:12px;padding:0 12px;font:inherit;font-size:14px;background:var(--panel);color:var(--ink)}'+
'.clmeet .item{padding:10px 0}';document.head.appendChild(st);})();

var M4K=['펀다이빙','교육','여행 동행','프리다이빙 훈련','해양 정화'];
function m4Today(){var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function m4Sport(m){var k=m.kind||'';return /정화/.test(k)?'both':/프리/.test(k)?'free':'scuba';}
function m4ModeOk(m){var d=typeof DM!=='undefined'?DM:'all';if(d==='all')return true;var s=m4Sport(m);return s==='both'||s===d;}
function m4Dd(d){if(!d)return '';var t=new Date(m4Today()+'T00:00:00'),x=new Date(d+'T00:00:00'),n=Math.round((x-t)/864e5);return n===0?'오늘':n>0?'D-'+n:'';}

/* ---------- 지난 모임 · 내 모임 불러오기 (기본 목록은 오늘 이후만 받아 옴) ---------- */
state.m4extra=state.m4extra||[];state.m4cnt=state.m4cnt||{};state.m4mine=state.m4mine||{};
function m4Merge(){var P=state.pubMeets||(state.pubMeets=[]),have={};P.forEach(function(x){have[x.id]=1;});(state.m4extra||[]).forEach(function(x){if(!have[x.id]){P.push(x);have[x.id]=1;}});}
function m4Load(force){if(!BE.on)return;var uid=BE.user?BE.user.id:'';if(!force&&m4Load.u===uid)return;m4Load.u=uid;
  var t=m4Today(),from=new Date(Date.now()-90*864e5).toISOString().slice(0,10),J=[BE.sb.from('meetups').select('*').lt('meet_date',t).gte('meet_date',from).order('meet_date',{ascending:false}).limit(40)];
  if(uid){J.push(BE.sb.from('meetups').select('*').eq('owner',uid).order('meet_date',{ascending:false}).limit(60));J.push(BE.sb.from('meetup_members').select('meetup_id').eq('user_id',uid).limit(300));}
  Promise.all(J).then(function(R){var add=(R[0].data||[]).concat(R[1]&&R[1].data||[]),mine={};(R[2]&&R[2].data||[]).forEach(function(x){mine[x.meetup_id]=1;});state.m4mine=mine;
    var known={};add.concat(state.pubMeets||[]).forEach(function(x){known[x.id]=1;});var miss=Object.keys(mine).filter(function(k){return !known[k];}).map(Number);
    return (miss.length?BE.sb.from('meetups').select('*').in('id',miss).then(function(r){return add.concat(r.data||[]);}):Promise.resolve(add));
  }).then(function(add){var seen={};state.m4extra=add.filter(function(x){if(seen[x.id])return false;seen[x.id]=1;return true;});m4Merge();return m4Count();})
  .then(function(){var c=cur();if(c==='meet'||/^meet-d\d+$/.test(c))rerender();}).catch(function(){});}
function m4Count(){var ids=(state.pubMeets||[]).map(function(x){return x.id;});if(!ids.length)return Promise.resolve();
  return BE.sb.from('meetup_members').select('meetup_id').in('meetup_id',ids.slice(0,200)).then(function(r){var c={};(r.data||[]).forEach(function(x){c[x.meetup_id]=(c[x.meetup_id]||0)+1;});state.m4cnt=c;});}
var _pull124=BE.pull;BE.pull=function(){return _pull124.apply(this,arguments).then(function(v){m4Merge();return v;});};

/* ---------- 소모임 목록 ---------- */
function m4Item(m){var t=m4Today(),past=m.meet_date&&m.meet_date<t,uid=BE.user&&BE.user.id,own=uid&&m.owner===uid,joined=state.m4mine[m.id],s=spot(m.spot)||{},n=state.m4cnt[m.id],mx=+m.max_people||0,full=n!=null&&mx&&n>=mx;
  var d=m.meet_date?new Date(m.meet_date+'T00:00:00'):null,dd=m4Dd(m.meet_date),T=[[m.kind||'모임','']];
  if(past)T.push(['지난 모임','gray']);else if(m.closed||full)T.push([m.closed?'마감':'정원 마감','gray']);else if(dd)T.push([dd,dd==='오늘'?'warn':'ok']);
  if(own)T.push(['내가 연 모임','']);else if(joined)T.push(['참가 중','ok']);
  return '<a class="item m4i'+(past?' past':'')+'" data-dd="1" data-kt="1" href="#meet-d'+m.id+'"><span class="m4d">'+(d?'<b>'+d.getDate()+'</b><span>'+(d.getMonth()+1)+'월</span>':'<b>–</b>')+'</span><span class="tx"><span>'+tags(T)+'</span><b>'+esc(m.title)+'</b><span>'+esc(s.name||m.spot||'')+(n!=null?' · '+n+(mx?'/'+mx:'')+'명':(mx?' · 최대 '+mx+'명':''))+(m.min_cert&&!/제한 없음/.test(m.min_cert)?' · '+esc(m.min_cert):'')+(m.meet_time?' · '+esc(String(m.meet_time).slice(0,5)):'')+'</span></span><span class="rt">자세히</span></a>';}
function m4Panel(){var t=m4Today(),uid=BE.user&&BE.user.id,P=(state.pubMeets||[]).slice(),tab=state.m4tab||'open',k=state.m4k||'';
  var open=P.filter(function(m){return !m.meet_date||m.meet_date>=t;}).sort(function(a,b){return String(a.meet_date)<String(b.meet_date)?-1:1;}),
      mine=P.filter(function(m){return uid&&(m.owner===uid||state.m4mine[m.id]);}).sort(function(a,b){var ap=a.meet_date<t,bp=b.meet_date<t;if(ap!==bp)return ap?1:-1;return ap?(a.meet_date<b.meet_date?1:-1):(a.meet_date<b.meet_date?-1:1);}),
      past=P.filter(function(m){return m.meet_date&&m.meet_date<t;}).sort(function(a,b){return a.meet_date<b.meet_date?1:-1;});
  var L={open:open,mine:mine,past:past}[tab]||open,hidden=0,L2=L.filter(function(m){if(tab!=='mine'&&!m4ModeOk(m)){hidden++;return false;}return !k||m.kind===k;});
  var cntMode=function(A){return A.filter(function(m){return m4ModeOk(m);}).length;};
  var seg='<div class="m4seg" role="tablist">'+[['open','모집 중',cntMode(open)],['mine','내 모임',mine.length],['past','지난 모임',cntMode(past)]].map(function(x){return '<button type="button" role="tab" data-m4tab="'+x[0]+'" aria-pressed="'+(tab===x[0])+'">'+x[1]+'<em>'+x[2]+'</em></button>';}).join('')+'</div>';
  var chips='<div class="chips m4k">'+[['','전체']].concat(M4K.map(function(x){return [x,x];})).map(function(x){return '<button type="button" class="chip" data-m4k="'+esc(x[0])+'" aria-pressed="'+(k===x[0])+'">'+x[1]+'</button>';}).join('')+'</div>';
  var title={open:'모집 중인 모임',mine:'내 모임',past:'지난 모임'}[tab];
  var empty={open:'지금 모집 중인 모임이 없어요. 첫 모임을 열어 보세요.',mine:BE.user?'아직 열거나 참가한 모임이 없어요.':'로그인하면 내가 열거나 참가한 모임이 모여요.',past:'최근 90일 동안 끝난 모임이 없어요.'}[tab];
  var modeName=typeof DML!=='undefined'&&typeof DM!=='undefined'?DML[DM]:'';
  return '<div class="panel" id="m4p">'+seg+chips+'<h2>'+title+' <span class="small">'+L2.length+'개</span></h2>'+(L2.length?'<div class="list">'+L2.map(m4Item).join('')+'</div>':'<p class="empty" style="margin:0">'+empty+'</p>')+
    (hidden?'<p class="m4hint">'+esc(modeName)+' 화면이라 다른 종목 모임 '+hidden+'개는 숨겼어요. 위에서 "전체"를 누르면 다 보여요.</p>':'')+
    (tab==='mine'&&!BE.user?'<button class="btn btn-line" type="button" onclick="needLogin&&needLogin(\'내 모임을 보려면 로그인해 주세요\')" style="margin-top:10px">로그인</button>':'')+'</div>';}
var _meet124=V.meet;V.meet=function(i){m4Merge();var h=_meet124(i);if(i!=null&&i!==''&&(state.pubMeets||[]).some(function(y){return 'd'+y.id===String(i);})){setTimeout(m4Detail,350);setTimeout(m4Detail,1300);return h;}
  if(BE.on)m4Load();var s=h.indexOf('<div class="panel"><h2>모집 중인 모임');if(s<0)return h;var e=h.indexOf('<div class="cols">',s);if(e<0)return h;return h.slice(0,s)+m4Panel()+h.slice(e);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-m4tab]');if(t){state.m4tab=t.dataset.m4tab;rerender();return;}t=e.target.closest('[data-m4k]');if(t){state.m4k=t.dataset.m4k;rerender();}});

/* ---------- 소모임 상세: 지난 모임 안내 · 다시 열기 · 클럽 이전 ---------- */
function m4Id(){var m=/^#meet-d(\d+)$/.exec(location.hash||'');return m?+m[1]:0;}
function m4Get(id){return (state.pubMeets||[]).filter(function(x){return x.id===id;})[0];}
function m4Detail(){var id=m4Id();if(!id)return;var v=document.querySelector('#main .view'),vh=v&&v.querySelector(':scope > .vh');if(!vh||vh.dataset.m4)return;var m=m4Get(id);if(!m)return;vh.dataset.m4=1;
  var t=m4Today(),past=m.meet_date&&m.meet_date<t,own=BE.user&&m.owner===BE.user.id,box=document.createElement('div');box.id='m4ban';
  var parts=[];if(past)parts.push('<div class="m4ban"><b>'+esc(m.meet_date)+'에 끝난 모임이에요.</b>'+(own?'<button class="btn btn-line" type="button" data-m4again="'+id+'">같은 모임 다시 열기</button>':'')+'</div>');
  box.innerHTML=parts.join('');vh.after(box);
  if(own){var b=document.createElement('button');b.type='button';b.className='btn btn-line';b.id='m2btn';b.dataset.m2c=id;b.textContent='클럽으로 옮기기';vh.appendChild(b);}
  if(BE.on)BE.sb.rpc('meet2club_status',{p_meetup:id}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];if(!x||r.error)return;var bx=document.getElementById('m4ban');if(!bx||m4Id()!==id)return;
    if(x.state==='done'){bx.insertAdjacentHTML('afterbegin','<div class="m4ban done"><b>이 모임은 클럽으로 옮겼어요. 일정 · 사진 · 이야기는 클럽에서 이어가요.</b><a class="btn btn-pri" href="#club-'+(+x.club)+'">클럽 가기</a></div>');var mb=document.getElementById('m2btn');if(mb)mb.remove();}
    else if(x.state==='pending'){bx.insertAdjacentHTML('afterbegin','<div class="m4ban"><b>클럽 "'+esc(x.name||'')+'"으로 옮기는 중이에요. 입금 '+won124(x.total)+'원이 확인되면 바로 만들어져요.</b><a class="btn btn-line" href="#pay">입금 안내 보기</a></div>');var mb2=document.getElementById('m2btn');if(mb2)mb2.remove();}}).catch(function(){});}
function won124(n){return (+n||0).toLocaleString('ko-KR');}
document.addEventListener('click',function(e){var t=e.target.closest('[data-m4again]');if(!t)return;var m=m4Get(+t.dataset.m4again);if(!m)return;
  state.forms=state.forms||{};state.forms.meet={step:0,v:{title:m.title,kind:m.kind,spot:m.spot,max:String(m.max_people||''),cert:m.min_cert,logs:String(m.min_logs||0),desc:m.descr||''},e:{}};toast('지난 모임 내용을 채웠어요. 날짜만 고르면 돼요');location.hash='#meetnew';});

/* 소모임 → 클럽 이전 (참가자 인당 금액, 무통장 입금 확인 후 만들어짐) */
function m2Price(){if(state.m2price)return Promise.resolve(state.m2price);return BE.sb.from('pay_products').select('price_krw').eq('id','meet2club').maybeSingle().then(function(r){state.m2price=(r.data&&+r.data.price_krw)||3000;return state.m2price;},function(){return 3000;});}
function m2Calc(){var p=state.m2price||3000,n=document.querySelectorAll('#m2mem input:checked').length,a=p*n,v=Math.round(a*0.1);var el=document.getElementById('m2sum');if(el)el.innerHTML='<span>인당 '+won124(p)+'원 × '+n+'명</span><span>'+won124(a)+'원</span><span>부가세 10%</span><span>'+won124(v)+'원</span><span><b>입금할 금액</b></span><span><b>'+won124(a+v)+'원</b></span>';var g=document.getElementById('m2go');if(g)g.disabled=!n;}
function m2Open(id){var m=m4Get(id);if(!m||!BE.user)return;var M=((state.mem&&state.mem[id])||[]).filter(function(x){return x.user_id&&x.user_id!==BE.user.id;});
  m2Price().then(function(){sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">클럽으로 옮기기</h2><p class="small" style="margin:0 0 12px">참가자를 그대로 데리고, 계속 이어지는 클럽을 만들어요. 클럽에서는 게시판 · 채팅 · 일정 · 사진첩 · 투표를 쓸 수 있어요.</p>'+
    '<form id="m2form" data-id="'+id+'" class="form" style="grid-template-columns:1fr"><label for="m2_name">클럽 이름 (2~40자)<input id="m2_name" maxlength="40" value="'+esc(String(m.title||'').slice(0,40))+'"></label>'+
    '<label class="ck" for="m2_pub"><input id="m2_pub" type="checkbox" checked> 공개 클럽 (목록에 보이고 누구나 가입). 끄면 초대로만 들어와요.</label>'+
    '<div><b style="font-size:14px">같이 옮길 사람</b> <span class="small">'+M.length+'명 · 옮긴 뒤에도 원하지 않으면 언제든 나갈 수 있어요</span>'+(M.length?'<div class="m2mem" id="m2mem">'+M.map(function(x){return '<label><input type="checkbox" value="'+esc(x.user_id)+'" checked> '+esc(x.nick||'다이버')+'</label>';}).join('')+'</div>':'<p class="empty" style="margin:6px 0">아직 참가한 사람이 없어요. 참가자가 생기면 옮길 수 있어요.</p>')+'</div>'+
    '<div class="m2price" id="m2sum"></div>'+
    '<label for="m2_payer">입금자 이름<input id="m2_payer" maxlength="40" value="'+esc((state.me&&state.me.nick)||'')+'"></label>'+
    '<p class="small" style="margin:0">신청하면 입금 계좌가 나와요. 입금이 확인되면 클럽이 만들어지고, 옮긴 사람들에게 쪽지로 알려 드려요. 모임장은 클럽장이 돼요.</p>'+
    '<button class="btn btn-pri" type="submit" id="m2go" style="justify-content:center">신청하고 입금 안내 보기</button></form>');
    document.getElementById('m2form').addEventListener('change',m2Calc);m2Calc();});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-m2c]');if(!t)return;e.preventDefault();if(!BE.user)return needLogin('로그인해 주세요');m2Open(+t.dataset.m2c);});
document.addEventListener('submit',function(e){if(e.target.id!=='m2form')return;e.preventDefault();var f=e.target,id=+f.dataset.id,ids=[].map.call(f.querySelectorAll('#m2mem input:checked'),function(x){return x.value;}),nm=val('m2_name').trim();
  if(nm.length<2)return toast('클럽 이름을 2자 이상 적어 주세요');if(!ids.length)return toast('같이 옮길 사람을 1명 이상 골라 주세요');var g=document.getElementById('m2go');g.disabled=true;g.textContent='신청하는 중…';
  BE.sb.rpc('meet2club_order',{p_meetup:id,p_name:nm,p_public:document.getElementById('m2_pub').checked,p_members:ids,p_payer:val('m2_payer').trim()}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];
    if(r.error||!x){g.disabled=false;g.textContent='신청하고 입금 안내 보기';return toast(r.error&&/function|schema/i.test(r.error.message||'')?'아직 준비 중이에요. 잠시 뒤 다시 해 주세요':'신청하지 못했어요. 다시 해 주세요');}
    if(!x.ok){g.disabled=false;g.textContent='신청하고 입금 안내 보기';var E={exists:'이미 신청했거나 클럽으로 옮긴 모임이에요',nomembers:'같이 옮길 참가자를 1명 이상 골라 주세요',name:'클럽 이름은 2~40자로 적어 주세요',notowner:'모임장만 옮길 수 있어요',toomany:'클럽은 300명까지예요',login:'로그인해 주세요'};return toast(E[x.e]||'신청하지 못했어요');}
    closeSheet();state.payP=null;toast('신청했어요. '+won124(x.total)+'원을 입금해 주세요');location.hash='#pay';});});

/* ---------- 초대: 모임 정보 카드 · 고쳐 쓰는 문구 · QR ---------- */
if(typeof invSheet==='function'){var _inv124=invSheet;invSheet=function(kind,id,title,link,code){_inv124.apply(this,arguments);var box=document.querySelector('#sheetbg .invbox');if(!box)return;
  var info='',msg='';if(kind==='meetup'){var m=m4Get(+id)||{},s=spot(m.spot)||{},n=state.m4cnt[m.id]!=null?state.m4cnt[m.id]:((state.mem&&state.mem[m.id])||[]).length,mx=+m.max_people||0,left=mx?Math.max(0,mx-n-1):null;
    info='<b>'+esc(m.title||title)+'</b>'+esc([m.meet_date,m.meet_time?String(m.meet_time).slice(0,5):'',s.name||m.spot||''].filter(Boolean).join(' · '))+(mx?'<br>자리 '+(n+1)+'/'+mx+'명'+(left!=null?' · '+left+'자리 남음':''):'')+(m.min_cert&&!/제한 없음/.test(m.min_cert)?'<br>참가 조건 '+esc(m.min_cert)+(m.min_logs?' · 로그 '+(+m.min_logs)+'회':''):'');
    msg='['+(m.title||title)+']\n'+[m.meet_date,s.name||m.spot||''].filter(Boolean).join(' · ')+'\n같이 들어가요!'+(left?' 자리 '+left+'개 남았어요.':'')+'\n'+link;}
  else{var c=(state.clubs||[]).filter(function(x){return x.id===+id;})[0]||{},cn=state.clubN&&state.clubN[id];info='<b>'+esc(c.name||title)+'</b>'+(cn?'멤버 '+cn+'명 · ':'')+(c.is_public?'공개 클럽':'초대 전용 클럽')+(c.intro?'<br>'+esc(String(c.intro).split('\n')[0].slice(0,80)):'');
    msg='['+(c.name||title)+'] 클럽에 초대해요.\n'+(c.intro?String(c.intro).split('\n')[0].slice(0,80)+'\n':'')+link+(code?'\n초대 코드 '+code:'');}
  box.insertAdjacentHTML('afterbegin','<div class="invcard">'+info+'</div>');
  var sh=box.querySelector('[data-invshare]');if(sh){sh.insertAdjacentHTML('beforebegin','<label style="display:block;margin-top:12px;font-size:14px"><b>보낼 문구</b> <span class="small">고쳐서 보내도 돼요</span><textarea class="invmsg" id="invMsgTx" maxlength="500">'+esc(msg)+'</textarea></label><div class="chips" style="margin-top:6px"><button class="chip" type="button" data-invcopymsg>문구 복사</button><button class="chip" type="button" data-invqr="'+esc(link)+'">QR 보기</button></div><div class="invqr" id="invQr" hidden></div>');
    sh.removeAttribute('data-invshare');sh.dataset.invshare2=link;sh.dataset.invtitle2=title;}};}
document.addEventListener('click',function(e){var t=e.target.closest('[data-invcopymsg]');if(t){var x=document.getElementById('invMsgTx');if(x&&navigator.clipboard)navigator.clipboard.writeText(x.value).then(function(){toast('문구를 복사했어요');});return;}
  t=e.target.closest('[data-invshare2]');if(t){var tx=(document.getElementById('invMsgTx')||{}).value||'';if(navigator.share)navigator.share({title:t.dataset.invtitle2,text:tx}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(tx).then(function(){toast('문구를 복사했어요. 카톡에 붙여 넣으세요');});return;}
  t=e.target.closest('[data-invqr]');if(t){var q=document.getElementById('invQr');if(!q)return;if(!q.hidden){q.hidden=true;return;}if(typeof qrLib!=='function')return toast('QR을 만들지 못했어요');qrLib().then(function(){q.innerHTML=qrSvg(t.dataset.invqr)+'';q.hidden=false;}).catch(function(){toast('QR을 만들지 못했어요. 인터넷 연결을 확인해 주세요');});}});

/* ---------- 클럽 목록: 검색 · 정렬 · 종목 기본값 ---------- */
if(state.ckind==null&&typeof DM!=='undefined')state.ckind=DM;
function clq124(){if(cur()!=='clubs')return;var v=document.querySelector('#main .view');if(!v||document.getElementById('clq'))return;var pn=[].filter.call(v.querySelectorAll('.panel'),function(p){return /공개 클럽/.test((p.querySelector('h2')||{}).textContent||'');})[0];if(!pn)return;var h=pn.querySelector('h2');
  var w=document.createElement('div');w.className='clq';w.innerHTML='<input type="search" id="clq" placeholder="클럽 이름 · 지역 · 소개로 찾기" aria-label="클럽 찾기" value="'+esc(state.clq||'')+'"><select id="clsort" aria-label="정렬"><option value="new">새로 생긴 순</option><option value="mem"'+(state.clsort==='mem'?' selected':'')+'>멤버 많은 순</option></select>';h.after(w);clqApply();}
function clqApply(){var q=(state.clq||'').trim().toLowerCase(),srt=state.clsort||'new',C=state.clubs||[];[].forEach.call(document.querySelectorAll('#main .panel'),function(p){if(!/공개 클럽/.test((p.querySelector('h2')||{}).textContent||''))return;var list=p.querySelector('.list');if(!list)return;
  var A=[].slice.call(list.querySelectorAll('a.item[href^="#club-"]'));A.forEach(function(a){var c=C.filter(function(x){return x.id===+a.getAttribute('href').slice(6);})[0]||{};var hay=[c.name,c.region,c.intro,(spot(c.spot)||{}).name].join(' ').toLowerCase();a.dataset.q=!q||hay.indexOf(q)>=0?'1':'0';a.dataset.n=(state.clubN&&state.clubN[c.id])||1;a.dataset.t=c.created_at||'';});
  A.sort(function(a,b){return srt==='mem'?(+b.dataset.n-+a.dataset.n):(a.dataset.t<b.dataset.t?1:-1);}).forEach(function(a){list.appendChild(a);});});
  if(typeof clubListTidy==='function')clubListTidy();[].forEach.call(document.querySelectorAll('#main a.item[href^="#club-"]'),function(a){if(a.dataset.q==='0')a.style.display='none';});}
document.addEventListener('input',function(e){if(e.target.id==='clq'){state.clq=e.target.value;clqApply();}});
document.addEventListener('change',function(e){if(e.target.id==='clsort'){state.clsort=e.target.value;clqApply();}});

/* ---------- 클럽 상세: 클럽 소모임 열기 · 이 클럽 소모임 ---------- */
function clMeet124(){var id=clubId();if(!id)return;var v=document.querySelector('#main .view'),vh=v&&v.querySelector(':scope > .vh');if(!vh||document.getElementById('clMeetBtn'))return;var c=(state.clubs||[]).filter(function(x){return x.id===id;})[0];if(!c||!BE.user||!(state.clubMine||{})[id])return;
  var b=document.createElement('button');b.type='button';b.className='btn btn-line';b.id='clMeetBtn';b.dataset.clmeet=id;b.textContent='소모임 열기';vh.appendChild(b);
  var tag='['+c.name+']',t=m4Today(),L=(state.pubMeets||[]).filter(function(m){return String(m.title||'').indexOf(tag)===0&&(!m.meet_date||m.meet_date>=t);}).sort(function(a,b){return a.meet_date<b.meet_date?-1:1;});
  if(L.length&&!document.getElementById('clMeets')){var p=document.createElement('div');p.className='panel clmeet';p.id='clMeets';p.innerHTML='<h2>이 클럽 소모임 <span class="small">'+L.length+'개</span></h2><div class="list">'+L.slice(0,5).map(m4Item).join('')+'</div>';var anc=v.querySelector(':scope > .ctab, :scope > .chips')||vh;anc.after(p);}}
document.addEventListener('click',function(e){var t=e.target.closest('[data-clmeet]');if(!t)return;var c=(state.clubs||[]).filter(function(x){return x.id===+t.dataset.clmeet;})[0];if(!c)return;
  state.forms=state.forms||{};state.forms.meet={step:0,v:{title:'['+c.name+'] ',kind:c.dive_kind==='free'?'프리다이빙 훈련':'펀다이빙',spot:c.spot||'',desc:'클럽 "'+c.name+'" 멤버 모임이에요.\n'},e:{}};toast('클럽 이름을 붙여 둘게요. 나머지만 채워 주세요');location.hash='#meetnew';});

/* ---------- 홈 바로가기: 같은 집 모양 아이콘 정리 ---------- */
var IC124={cam:'M4 8h3l2-3h6l2 3h3v11H4z M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',club:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5 M16 4.3a3.5 3.5 0 0 1 0 6.4 M18 14.8c2 .7 3.2 2.6 3.5 5.2'};
(function(){if(typeof MENU!=='undefined'&&MENU)MENU.forEach(function(m){if(m.id==='photofix')m.i=IC124.cam;if(m.id==='clubs')m.i=IC124.club;});if(typeof MAIN53!=='undefined')MAIN53.forEach(function(m){if(m.id==='clubs')m.i=IC124.club;if(m.id==='photofix')m.i=IC124.cam;});})();
if(typeof HOMEC!=='undefined'&&typeof photoCats==='function'){photoCats=function(){return '<div class="cats cats12">'+HOMEC.map(function(c){var I53=typeof IC53!=='undefined'?IC53:{},i=c[0]==='logimport'&&I53.imp?I53.imp:c[0]==='pools'&&I53.pool?I53.pool:c[0]==='logstats'&&I53.stats?I53.stats:c[0]==='photofix'?IC124.cam:c[0]==='clubs'?IC124.club:mIcon(c[0]);return '<a class="cat" href="#'+c[0]+'"><i>'+ic(i,22)+'</i>'+(LANG==='en'?c[2]:c[1])+'</a>';}).join('')+'</div>';};}

var _after124=after;after=function(){_after124();var c=cur();if(c==='meet'&&BE.on)m4Load();if(/^meet-d\d+$/.test(c)){if(BE.on)m4Load();setTimeout(m4Detail,300);setTimeout(m4Detail,1200);}if(c==='clubs'){setTimeout(clq124,400);setTimeout(clq124,1600);}if(/^club-\d+$/.test(c)){setTimeout(clMeet124,500);setTimeout(clMeet124,1500);}};
var _club124=V.club;V.club=function(i){var h=_club124.apply(this,arguments);setTimeout(clMeet124,400);setTimeout(clMeet124,1400);return h;};
var _clubs124=V.clubs;V.clubs=function(){var h=_clubs124.apply(this,arguments);setTimeout(clq124,400);return h;};

/* ---------- 소모임 상세 정리: 버튼 한 줄, 지난 모임 표시, 섹션 순서, 칩 높이 ---------- */
(function(){var st=document.createElement('style');st.textContent=
'.mdact>button,.mdact>a{background:var(--panel)!important;border:1.5px solid var(--sea)!important;color:var(--sea)!important;font-weight:700;border-radius:14px}.mdact{display:flex;flex-wrap:wrap;gap:8px;width:100%;margin-top:4px}.mdact>*{flex:1 1 0;min-width:96px;justify-content:center;min-height:42px;margin:0!important;white-space:nowrap}.mdact .chip{border:1px solid var(--line)}'+
'.vh .mdtag{margin-top:6px;display:inline-flex}'+
'#main .view .chips>span.chip{display:inline-flex;align-items:center;gap:4px;line-height:1.2;min-height:36px;padding-top:0;padding-bottom:0}'+
'#mtPlan h2,#mtCm h2,#mtCar h2,#mtRv h2{flex:1;display:flex;align-items:center;gap:8px}'+
'#mtPh .sph{display:flex;flex-wrap:wrap;align-items:center;gap:8px}#mtPh .sph h2{flex:1 0 100%;margin:0 0 4px}#mtPh .sph .chip,#mtPh .chip{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;margin:0}#mtPh .fuh{display:none!important}'+
'#m4ban .m4ban{margin-top:0}.view:has(#mdAct) #ctypeBox{display:none!important}';document.head.appendChild(st);})();
function mdTidy(){var id=m4Id();if(!id)return;var v=document.querySelector('#main .view'),vh=v&&v.querySelector(':scope > .vh');if(!vh)return;var m=m4Get(id);if(!m)return;var past=m.meet_date&&m.meet_date<m4Today();
  [].forEach.call(v.querySelectorAll('#ctypeBox'),function(x){x.style.display='none';});
  var act=document.getElementById('mdAct');if(!act){act=document.createElement('div');act.id='mdAct';act.className='mdact';vh.appendChild(act);}
  ['#icsBtn','[data-mtshare]','#meetInv','#m2btn','#costBtn'].forEach(function(s){var b=vh.querySelector(':scope > '+s);if(b){if(b.classList.contains('chip')){b.classList.remove('chip');b.classList.add('btn','btn-line');}act.appendChild(b);}});
  var cb=document.getElementById('costBtn');if(cb&&cb.parentNode!==act){cb.classList.remove('chip');cb.classList.add('btn','btn-line');act.appendChild(cb);}
  ['#mtCm','#mtCar'].forEach(function(s){var p=v.querySelector(s);if(!p)return;var h=p.querySelector('h2'),fr=h&&h.querySelector('.fright');if(!fr)return;var wrap=h.parentElement;[].forEach.call(wrap.children,function(c){if(c!==h&&c.classList.contains('small')&&c.textContent.length<30&&!fr.contains(c)){c.style.margin='0';fr.insertBefore(c,fr.firstChild);}});});
  if(past){var ib=document.getElementById('icsBtn');if(ib)ib.style.display='none';}
  var tg=vh.querySelector(':scope > .tag');if(tg){var box=vh.firstElementChild;if(past){var n=(tg.textContent.match(/(\d+)\s*\/\s*\d+명/)||[])[1];tg.textContent='지난 모임'+(n?' · '+n+'명 참가':'');tg.className='tag gray';}tg.classList.add('mdtag');box.appendChild(tg);}
  if(!act.children.length)act.remove();
  var P=function(s){return v.querySelector(':scope > '+s);},byH=function(re){return [].filter.call(v.querySelectorAll(':scope > .panel, :scope > .cols'),function(p){return re.test((p.querySelector('h2')||{}).textContent||'');})[0];};
  var anchor=document.getElementById('m4ban')||vh,order=past?[P('#mtRv'),P('#mtPh'),P('#mtAt'),byH(/^참가자 \d/),P('#coPanel'),byH(/참가자 채팅/),P('#mtCm'),byH(/^소개/),P('#mtPlan'),P('#mtCar'),byH(/처음 만나는/),P('#msetBox')]
    :[byH(/^소개/),byH(/^참가자 \d/),P('#coPanel'),P('#mtPlan'),byH(/참가자 채팅/),P('#mtCm'),P('#mtCar'),byH(/처음 만나는/),P('#mtAt'),P('#mtPh'),P('#mtRv'),P('#msetBox')];
  var ref=anchor;order.forEach(function(p){if(p&&p!==ref){ref.after(p);ref=p;}});}
var _m4d124=m4Detail;m4Detail=function(){_m4d124();mdTidy();};
var _after124b=after;after=function(){_after124b();if(/^meet-d\d+$/.test(cur())){setTimeout(mdTidy,600);setTimeout(mdTidy,1600);setTimeout(mdTidy,2600);}};

/* ---------- 권한: 소모임 부모임장 · 모임장 넘기기 / 클럽 운영진 · 클럽장 넘기기 ---------- */
(function(){var st=document.createElement('style');st.textContent=
'.rolerow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 0;border-top:1px solid var(--line)}.rolerow:first-of-type{border-top:0}.rolerow b{flex:1;min-width:90px;font-size:14.5px}.rolerow .chip{min-height:34px;font-size:13px}'+
'.rbadge{display:inline-flex;align-items:center;font-size:11.5px;font-weight:600;padding:2px 7px;border-radius:999px;background:var(--bg);color:var(--sea);border:1px solid var(--line);margin-left:4px}'+
'#coTools textarea{width:100%;box-sizing:border-box;min-height:80px;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font:inherit;font-size:14px;background:var(--panel);color:var(--ink)}';document.head.appendChild(st);})();
function mtRole(id){var m=m4Get(id),u=BE.user&&BE.user.id;if(!m||!u)return '';return m.owner===u?'owner':(m.cohosts||[]).indexOf(u)>=0?'cohost':'';}
function mtRoles(){var id=m4Id();if(!id)return;var v=document.querySelector('#main .view');if(!v)return;var m=m4Get(id);if(!m)return;var M=(state.mem&&state.mem[id])||[],co=m.cohosts||[],role=mtRole(id);
  var pp=[].filter.call(v.querySelectorAll(':scope > .panel'),function(p){return /^참가자 \d/.test((p.querySelector('h2')||{}).textContent||'');})[0];
  if(pp)[].forEach.call(pp.querySelectorAll('.chips > span.chip'),function(c){if(c.querySelector('.rbadge'))return;var nk=c.firstChild&&c.firstChild.textContent.trim(),x=M.filter(function(y){return y.nick===nk;})[0];if(x&&co.indexOf(x.user_id)>=0)c.insertAdjacentHTML('beforeend','<span class="rbadge">부모임장</span>');});
  if(!pp||document.getElementById('coPanel'))return;var others=M.filter(function(x){return x.user_id&&x.user_id!==m.owner&&x.user_id!==(BE.user&&BE.user.id);});
  var box=document.createElement('div');box.className='panel';box.id='coPanel';
  if(role==='owner'){if(!others.length)return;box.innerHTML='<h2>운영 · 권한 <span class="small">부모임장은 3명까지</span></h2><p class="small" style="margin:0 0 6px">부모임장은 공지 · 마감 · 참가자 내보내기를 함께 할 수 있어요.</p>'+others.map(function(x){var on=co.indexOf(x.user_id)>=0;return '<div class="rolerow"><b>'+esc(x.nick||'다이버')+(on?'<span class="rbadge">부모임장</span>':'')+'</b><button class="chip" type="button" data-mtco="'+id+'|'+esc(x.user_id)+'|'+(on?0:1)+'">'+(on?'부모임장 해제':'부모임장으로')+'</button><button class="chip" type="button" data-mtxfer="'+id+'|'+esc(x.user_id)+'|'+esc(x.nick||'다이버')+'">모임장 넘기기</button></div>';}).join('');}
  else if(role==='cohost'){box.innerHTML='<h2>부모임장 도구</h2><form id="coTools" data-id="'+id+'" class="form" style="grid-template-columns:1fr"><label for="co_n">공지 (채팅 위에 고정)<textarea id="co_n" maxlength="500">'+esc(m.notice||'')+'</textarea></label><label class="ck" for="co_c" style="display:flex;gap:8px;align-items:center"><input id="co_c" type="checkbox"'+(m.closed?' checked':'')+' style="width:auto"> 모집 마감</label><button class="btn btn-pri" type="submit">저장</button></form>'+
    (others.length?'<p class="small" style="margin:14px 0 4px">참가자 내보내기</p>'+others.filter(function(x){return co.indexOf(x.user_id)<0;}).map(function(x){return '<div class="rolerow"><b>'+esc(x.nick||'다이버')+'</b><button class="chip" type="button" data-mtkick="'+id+'|'+esc(x.user_id)+'">내보내기</button></div>';}).join(''):'');}
  else return;pp.after(box);}
document.addEventListener('click',function(e){var t=e.target.closest('[data-mtco]');if(t){var a=t.dataset.mtco.split('|');t.disabled=true;BE.sb.rpc('meetup_set_cohost',{p_meetup:+a[0],p_user:a[1],p_on:a[2]==='1'}).then(function(r){var x=r.data;var E={max:'부모임장은 3명까지예요',notmember:'참가자만 지정할 수 있어요',notowner:'모임장만 바꿀 수 있어요'};if(r.error||x!=='ok'){t.disabled=false;return toast(E[x]||'바꾸지 못했어요');}var m=m4Get(+a[0]);if(m){m.cohosts=(m.cohosts||[]).filter(function(u){return u!==a[1];});if(a[2]==='1')m.cohosts.push(a[1]);}toast(a[2]==='1'?'부모임장으로 정했어요':'부모임장을 해제했어요');var p=document.getElementById('coPanel');if(p)p.remove();[].forEach.call(document.querySelectorAll('#main .rbadge'),function(b){b.remove();});mtRoles();});return;}
  t=e.target.closest('[data-mtxfer]');if(t){var b=t.dataset.mtxfer.split('|');if(!confirm(b[2]+' 님에게 모임장을 넘길까요? 넘기면 나는 참가자가 돼요.'))return;BE.sb.rpc('meetup_transfer',{p_meetup:+b[0],p_to:b[1]}).then(function(r){if(r.error||r.data!=='ok')return toast('넘기지 못했어요');var m=m4Get(+b[0]);if(m){m.owner=b[1];m.cohosts=(m.cohosts||[]).filter(function(u){return u!==b[1];});}if(state.mem)delete state.mem[+b[0]];toast('모임장을 넘겼어요');BE.pull().then(function(){rerender();});});return;}
  t=e.target.closest('[data-mtkick]');if(t){var k=t.dataset.mtkick.split('|');if(!confirm('이 참가자를 내보낼까요?'))return;BE.sb.from('meetup_members').delete().eq('meetup_id',+k[0]).eq('user_id',k[1]).then(function(r){if(r.error)return toast('내보내지 못했어요');if(state.mem&&state.mem[+k[0]])state.mem[+k[0]]=state.mem[+k[0]].filter(function(x){return x.user_id!==k[1];});toast('내보냈어요');rerender();});}});
document.addEventListener('submit',function(e){if(e.target.id!=='coTools')return;e.preventDefault();var id=+e.target.dataset.id,n=val('co_n').trim(),c=document.getElementById('co_c').checked,m=m4Get(id)||{},up={notice:n||null,closed:c};if((m.notice||'')!==n)up.notice_at=n?new Date().toISOString():null;
  BE.sb.from('meetups').update(up).eq('id',id).then(function(r){if(r.error)return toast('저장하지 못했어요');Object.assign(m,up);toast('저장했어요');});});
var _mdT124=mdTidy;mdTidy=function(){_mdT124();mtRoles();};

/* 클럽 멤버 탭: 운영진 지정 · 클럽장 넘기기 · 운영진 내보내기 */
function clRole(id){var D=state.clubD&&state.clubD[id],u=BE.user&&BE.user.id;if(!D||!u)return '';var me=(D.M||[]).filter(function(x){return x.user_id===u;})[0];return me?me.role:'';}
var _club124b=V.club;V.club=function(i){var h=_club124b.apply(this,arguments),id=+i;if(clRole(id)==='manager'&&(!state.clubTab||state.clubTab==='post')&&h.indexOf('cnNotice')<0)h=h.replace(/(<div data-club="\d+">[\s\S]*?<textarea[^>]*>[^<]*<\/textarea>)/,'$1<label class="cnck small"><input type="checkbox" id="cnNotice"> 공지로 맨 위에 고정</label>');setTimeout(clMem124,300);return h;};
function clMem124(){var id=clubId();if(!id)return;var D=state.clubD&&state.clubD[id];if(!D)return;var v=document.querySelector('#main .view');if(!v)return;var pn=[].filter.call(v.querySelectorAll('.panel'),function(p){return /^멤버 \d/.test((p.querySelector('h2')||{}).textContent||'');})[0];if(!pn||pn.dataset.rl)return;pn.dataset.rl=1;
  var role=clRole(id),u=BE.user&&BE.user.id,M=(D.M||[]).slice().sort(function(a,b){var o={owner:0,manager:1,member:2};return (o[a.role]||2)-(o[b.role]||2);}),list=pn.querySelector('.list');if(!list)return;
  var mg=M.filter(function(x){return x.role==='manager';}).length;
  list.innerHTML=M.map(function(m){var lab=m.role==='owner'?'<span class="rbadge">클럽장</span>':m.role==='manager'?'<span class="rbadge">운영진</span>':'',btn='';
    if(m.user_id!==u){if(role==='owner'&&m.role!=='owner')btn='<button class="chip" type="button" data-clrole="'+id+'|'+esc(m.user_id)+'|'+(m.role==='manager'?'member':'manager')+'">'+(m.role==='manager'?'운영진 해제':'운영진으로')+'</button><button class="chip" type="button" data-clxfer="'+id+'|'+esc(m.user_id)+'|'+esc(m.nick)+'">클럽장 넘기기</button><button class="chip" type="button" data-ckick="'+id+'|'+esc(m.user_id)+'">내보내기</button>';
      else if(role==='manager'&&m.role==='member')btn='<button class="chip" type="button" data-ckick="'+id+'|'+esc(m.user_id)+'">내보내기</button>';}
    return '<div class="item rolerow"><b>'+esc(m.nick)+lab+'</b><span class="small">'+String(m.created_at).slice(0,10)+' 가입</span>'+btn+'</div>';}).join('');
  if(role==='owner')list.insertAdjacentHTML('beforebegin','<p class="small" style="margin:0 0 6px">운영진은 공지 · 글 정리 · 멤버 내보내기를 함께 할 수 있어요. 5명까지 · 지금 '+mg+'명</p>');}
document.addEventListener('click',function(e){var t=e.target.closest('[data-clrole]');if(t){var a=t.dataset.clrole.split('|');t.disabled=true;BE.sb.rpc('club_set_role',{p_club:+a[0],p_user:a[1],p_role:a[2]}).then(function(r){var x=r.data,E={max:'운영진은 5명까지예요',notowner:'클럽장만 바꿀 수 있어요',notmember:'멤버가 아니에요'};if(r.error||x!=='ok'){t.disabled=false;return toast(E[x]||'바꾸지 못했어요');}var D=state.clubD[+a[0]];(D&&D.M||[]).forEach(function(m){if(m.user_id===a[1])m.role=a[2];});toast(a[2]==='manager'?'운영진으로 정했어요':'운영진을 해제했어요');rerender();});return;}
  t=e.target.closest('[data-clxfer]');if(t){var b=t.dataset.clxfer.split('|');if(!confirm(b[2]+' 님에게 클럽장을 넘길까요? 나는 운영진이 돼요.'))return;BE.sb.rpc('club_transfer',{p_club:+b[0],p_to:b[1]}).then(function(r){if(r.error||r.data!=='ok')return toast('넘기지 못했어요');var c=(state.clubs||[]).filter(function(x){return x.id===+b[0];})[0];if(c)c.owner=b[1];var D=state.clubD[+b[0]];(D&&D.M||[]).forEach(function(m){if(m.user_id===b[1])m.role='owner';else if(m.user_id===BE.user.id)m.role='manager';});toast('클럽장을 넘겼어요');rerender();});}});
var _after124c=after;after=function(){_after124c();if(/^club-\d+$/.test(cur())){setTimeout(clMem124,400);setTimeout(clMem124,1500);}};

/* ---------- 초대하기: 상세에 항상 버튼, 초대한 사람 표시 링크, 받은 사람 배너 ---------- */
(function(){try{var q=new URLSearchParams(location.search),f=q.get('from');if(f){f=f.replace(/[<>"'&]/g,'').trim().slice(0,20);if(f)sessionStorage.setItem('invFrom',f);var u=new URL(location.href);u.searchParams.delete('from');history.replaceState(null,'',u.pathname+(u.search||'')+u.hash);}}catch(e){}})();
function invFrom(){try{return sessionStorage.getItem('invFrom')||'';}catch(e){return '';}}
if(typeof invSheet==='function'){var _inv124b=invSheet;invSheet=function(kind,id,title,link,code){var nk=state.me&&state.me.nick;if(nk){try{var u=new URL(link);u.searchParams.set('from',nk.slice(0,20));link=u.toString();}catch(e){}}
  _inv124b.call(this,kind,id,title,link,code);if(kind==='meetup'){var r=mtRole(+id),M=(state.mem&&state.mem[+id])||[],mem=r||M.some(function(x){return BE.user&&x.user_id===BE.user.id;});var f=document.getElementById('invNick');if(f&&!mem)f.style.display='none';}};}
function invTidy(){var id=m4Id();if(!id)return;var m=m4Get(id);if(!m)return;var past=m.meet_date&&m.meet_date<m4Today(),act=document.getElementById('mdAct');
  if(!past&&act&&!document.getElementById('meetInv')){var b=document.createElement('button');b.type='button';b.className='btn btn-line';b.id='meetInv';b.dataset.minv=id;b.textContent='초대하기';act.insertBefore(b,act.firstChild);}
  if(past){var mi=document.getElementById('meetInv');if(mi)mi.style.display='none';}
  var f=invFrom(),u=BE.user&&BE.user.id,M=(state.mem&&state.mem[id])||[],joined=u&&(m.owner===u||M.some(function(x){return x.user_id===u;}));
  if(f&&!past&&!joined&&!document.getElementById('invBan')){var bx=document.getElementById('m4ban');if(!bx)return;var full=state.m4cnt[id]!=null&&m.max_people&&state.m4cnt[id]>=m.max_people;
    bx.insertAdjacentHTML('afterbegin','<div class="m4ban done" id="invBan"><b>'+esc(f)+' 님이 이 모임에 초대했어요.'+(m.closed||full?' 지금은 모집이 마감됐어요.':' 같이 가요!')+'</b>'+(m.closed||full?'':'<button class="btn btn-pri" type="button" data-m4join="'+id+'">참가 신청</button>')+'</div>');}
  if(joined){var ib=document.getElementById('invBan');if(ib)ib.remove();}}
document.addEventListener('click',function(e){var t=e.target.closest('[data-m4join]');if(!t)return;var j=document.querySelector('#main [data-join="'+t.dataset.m4join+'"]');if(j){j.scrollIntoView({block:'center'});j.click();}else if(!BE.user)needLogin('참가하려면 로그인해 주세요');else toast('아래 참가 신청 버튼을 눌러 주세요');});
var _mdT124b=mdTidy;mdTidy=function(){_mdT124b();invTidy();};

/* ---------- 내 정보: 강사 코드 ---------- */
function isInstr124(){var me=state.me||{},c=String(me.cert||'')+' '+(me.orgs||[]).join(' ');return /강사|instructor|IDC|트레이너|trainer/i.test(c);}
function instrCode124(){if(cur()!=='profile'||!BE.user||document.getElementById('icPanel'))return;if(typeof stMine!=='function')return;stMine(function(s){if(cur()!=='profile'||document.getElementById('icPanel'))return;if(!(s&&s.code)&&!isInstr124())return;var v=document.querySelector('#main .view');if(!v)return;
  var p=document.createElement('div');p.id='icPanel';p.style.cssText='margin-top:14px;padding-top:14px;border-top:1px solid var(--line)';
  p.innerHTML=s&&s.code?'<b style="font-size:15px">강사 코드</b><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><b style="font:700 26px Sora,sans-serif;letter-spacing:2px">'+esc(s.code)+'</b><button class="chip" type="button" data-iccopy="'+esc(s.code)+'">복사</button><a class="chip" href="#stamp">도장 보기 · 바꾸기</a></div><p class="small" style="margin:8px 0 0">교육생이 로그 서명 화면에서 이 코드를 넣으면 내 강사 도장을 찍을 수 있어요. 도장 비밀번호는 따로 알려 주지 마세요.</p>'
    :'<b style="font-size:15px">강사 코드</b><p class="small" style="margin:4px 0 10px">강사 도장을 만들면 강사 코드가 생겨요. 교육생 로그에 서명할 때 써요.</p><a class="btn btn-pri" href="#stamp">도장 만들고 코드 받기</a>';
  var kv=v.querySelector(':scope > .panel.kvp');if(kv)kv.appendChild(p);else{var a=document.getElementById('cc2')||v.querySelector(':scope > .vh');if(a)a.after(p);}});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-iccopy]');if(t&&navigator.clipboard)navigator.clipboard.writeText(t.dataset.iccopy).then(function(){toast('강사 코드를 복사했어요');});});
var _after124d=after;after=function(){_after124d();if(cur()==='profile'){setTimeout(instrCode124,500);setTimeout(instrCode124,1600);setTimeout(instrCode124,3000);}};

/* ---------- 새 버전 자동 적용: 앱을 오래 켜 둬도 다음 화면 이동 때 새 버전으로 ---------- */
(function(){var s=document.querySelector('script[src*="/assets/app."]'),m=s&&/app\.([0-9a-f]+)\.js/.exec(s.src),mine=m&&m[1];if(!mine)return;var stale=false,last=0;
  function check(){if(stale||Date.now()-last<60000)return;last=Date.now();fetch('/VERSION?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.text():'';}).then(function(v){v=(v||'').trim();if(v&&/^[0-9a-f]{6,}$/.test(v)&&v!==mine){stale=true;try{navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(function(r){r&&r.update();});}catch(e){}}}).catch(function(){});}
  document.addEventListener('visibilitychange',function(){if(!document.hidden)check();});window.addEventListener('focus',check);setInterval(check,10*60000);setTimeout(check,30000);
  window.addEventListener('hashchange',function(){if(stale){var sb=document.getElementById('sheetbg');if(sb)return;location.reload();}});})();
