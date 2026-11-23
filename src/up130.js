/* ===== up130: 모임 카풀 · 방 배정(넣고 빼기) · 일차별 일정표 ===== */

/* ---------- 1) 카풀 · 방 같이 쓰기: 사람 넣고 빼기 ---------- */
function mpRpc130(uid,field,val){var id=mtId();if(!id||!BE.user)return;
  BE.sb.rpc('meet_pair',{p_meet:id,p_user:uid,p_field:field,p_val:val==null?null:String(val)}).then(function(r){var res=r.error?'err':r.data;
    if(res!=='ok'){toast({full:'자리가 다 찼어요',denied:'바꿀 수 있는 권한이 없어요',no_driver:'운전하는 사람이 바뀌었어요',not_member:'참가자만 바꿀 수 있어요'}[res]||'저장하지 못했어요');}
    BE.sb.from('meetup_members').select('*').eq('meetup_id',id).order('created_at').then(function(q){if(q.data){state.mem[id]=q.data;}var b=document.getElementById('mtCar');if(b)b.dataset.h='';mtExtra();});});}

mtExtra=function(){if(cur()!=='meet')return;var id=mtId();if(!id)return;var m=mtGet(id),v=document.querySelector('#main .view'),M=state.mem&&state.mem[id];if(!m||!v||!M)return;
  var me=BE.user&&BE.user.id,mine=M.filter(function(x){return x.user_id===me;})[0],host=!!(me&&(m.owner===me||(m.cohosts||[]).indexOf(me)>=0));
  var W=M.filter(function(x){return x.rsvp==='wait';}),G=M.filter(function(x){return x.rsvp!=='wait';}),n=G.length+1,cap=Math.min(m.max_people||15,15);
  [].forEach.call(v.querySelectorAll('.tag'),function(t){if(/^(모집 중|마감) · \d+\/\d+명/.test(t.textContent.trim())){t.textContent=(n>=cap?'마감':'모집 중')+' · '+n+'/'+cap+'명'+(W.length?' · 대기 '+W.length:'');t.className='tag '+(n>=cap?'fr':'ok');}});
  var box=document.getElementById('mtCar');if(!box){box=document.createElement('div');box.className='panel';box.id='mtCar';var ph=document.getElementById('mtPh');if(ph)ph.before(box);else{var f=v.querySelector(':scope > .foot');if(f)f.before(box);else v.appendChild(box);}}
  var nk=function(x){return esc(x.nick||'참가자')+(x.user_id===me?' (나)':'');};
  var drivers=G.filter(function(x){return x.ride==='offer';}),dIds={};drivers.forEach(function(d){dIds[d.user_id]=d;});
  var riders=function(d){return G.filter(function(x){return x.ride_with===d.user_id&&x.user_id!==d.user_id;});};
  var waiting=G.filter(function(x){return x.ride==='need'&&!(x.ride_with&&dIds[x.ride_with]);});
  var myCar=mine&&mine.ride_with&&dIds[mine.ride_with]?mine.ride_with:null;
  var rooms={};G.forEach(function(x){if(x.room_no){(rooms[x.room_no]=rooms[x.room_no]||[]).push(x);}});var rk=Object.keys(rooms).map(Number).sort(function(a,b){return a-b;});
  var roomless=G.filter(function(x){return x.room_share&&!x.room_no;}),myRoom=mine&&mine.room_no||null;
  var h='<div class="a4h"><h2 style="margin:0">카풀 · 방 같이 쓰기</h2><span class="small">참가자끼리만 보여요</span></div>';
  if(mine&&mine.rsvp==='wait')h+='<p class="small" style="margin:0 0 8px">지금 대기 '+(W.indexOf(mine)+1)+'번째예요. 빈자리가 나면 자동으로 참가돼요.</p>';
  if(mine&&mine.rsvp!=='wait'){h+='<div class="mcf"><label class="mxsel"><span>나는</span><select id="mcRide"><option value="none"'+(mine.ride!=='offer'&&mine.ride!=='need'?' selected':'')+'>따로 가요</option><option value="offer"'+(mine.ride==='offer'?' selected':'')+'>태워 줄 수 있어요</option><option value="need"'+(mine.ride==='need'?' selected':'')+'>태워 주세요</option></select></label>'+
    (mine.ride==='offer'?'<span class="st130" role="group" aria-label="빈자리 수"><span>빈자리</span><button type="button" class="chip" data-seat130="-1" aria-label="한 자리 빼기">−</button><b>'+(+mine.seats||0)+'</b><button type="button" class="chip" data-seat130="1" aria-label="한 자리 넣기">+</button></span>':'')+
    '<label class="chip mxck"><input type="checkbox" id="mcRoom"'+(mine.room_share?' checked':'')+'> 숙소 방 같이 써요</label></div>';}
  if(mine&&mine.rsvp!=='wait'||host){
    /* 차 */
    h+='<div class="c130sec"><b class="c130h">🚗 카풀 <span class="small" style="font-weight:500">· 이름을 끌어서 옮겨요</span></b>';
    if(!drivers.length)h+='<p class="small" style="margin:0">태워 줄 수 있는 사람이 아직 없어요.</p>';
    drivers.forEach(function(d){var R=riders(d),seats=+d.seats||0,left=seats-R.length,canD=host||d.user_id===me;
      h+='<div class="c130box" data-dcar130="'+esc(d.user_id)+'"><div class="c130t"><b>'+nk(d)+'의 차</b><span class="small'+(left<0?' c130over':'')+'">'+R.length+' / '+seats+'자리'+(left<0?' · 자리보다 많아요':'')+'</span></div><div class="c130m">'+
        (R.length?R.map(function(x){var canX=canD||x.user_id===me;return '<span class="c130p" data-dk="ride" data-uid="'+esc(x.user_id)+'">'+nk(x)+(canX?'<button type="button" data-cout130="'+esc(x.user_id)+'" aria-label="'+esc(x.nick||'')+' 내리기">×</button>':'')+'</span>';}).join(''):'<span class="small">아직 탄 사람이 없어요</span>')+'</div>'+
        (left>0&&canD&&waiting.length?'<select class="c130add" data-cin130="'+esc(d.user_id)+'" aria-label="태울 사람 고르기"><option value="">+ 태울 사람 넣기</option>'+waiting.map(function(x){return '<option value="'+esc(x.user_id)+'">'+nk(x)+'</option>';}).join('')+'</select>':'')+
        (left>0&&mine&&mine.ride==='need'&&!myCar&&d.user_id!==me?'<button type="button" class="btn btn-line c130join" data-cjoin130="'+esc(d.user_id)+'">이 차 탈게요</button>':'')+'</div>';});
    if(waiting.length||drivers.length)h+='<div class="c130wait" data-dcar130=""><span class="small">차 정하는 중</span>'+waiting.map(function(x){return '<span class="c130p" data-dk="ride" data-uid="'+esc(x.user_id)+'">'+nk(x)+'</span>';}).join('')+'</div>';
    h+='</div>';
    /* 방 */
    h+='<div class="c130sec"><b class="c130h">🛏 방 같이 쓰기 <span class="small" style="font-weight:500">· 끌어서 옮겨요</span></b>';
    if(!rk.length&&!roomless.length)h+='<p class="small" style="margin:0">방을 같이 쓸 사람이 아직 없어요.</p>';
    rk.forEach(function(no){var R=rooms[no],inR=myRoom===no,canR=host||inR;
      h+='<div class="c130box" data-droom130="'+no+'"><div class="c130t"><b>방 '+no+'</b><span class="small">'+R.length+'명</span></div><div class="c130m">'+R.map(function(x){var canX=canR||x.user_id===me;return '<span class="c130p" data-dk="room" data-uid="'+esc(x.user_id)+'">'+nk(x)+(canX?'<button type="button" data-rout130="'+esc(x.user_id)+'" aria-label="'+esc(x.nick||'')+' 빼기">×</button>':'')+'</span>';}).join('')+'</div>'+
        (canR&&roomless.length?'<select class="c130add" data-rin130="'+no+'" aria-label="방에 넣을 사람 고르기"><option value="">+ 이 방에 넣기</option>'+roomless.map(function(x){return '<option value="'+esc(x.user_id)+'">'+nk(x)+'</option>';}).join('')+'</select>':'')+
        (mine&&mine.room_share&&!myRoom?'<button type="button" class="btn btn-line c130join" data-rjoin130="'+no+'">이 방 쓸게요</button>':'')+'</div>';});
    if(roomless.length||rk.length)h+='<div class="c130wait" data-droom130=""><span class="small">방 정하는 중</span>'+roomless.map(function(x){return '<span class="c130p" data-dk="room" data-uid="'+esc(x.user_id)+'">'+nk(x)+'</span>';}).join('')+'</div>';
    var nextNo=(rk.length?Math.max.apply(null,rk):0)+1;
    if(roomless.length||rk.length)h+='<div class="c130new" data-droom130="'+nextNo+'">＋ 여기에 끌어다 놓으면 새 방</div>';
    if(mine&&mine.room_share&&!myRoom)h+='<button type="button" class="btn btn-line c130join" data-rjoin130="'+nextNo+'">새 방 만들기</button>';
    else if(host&&roomless.length)h+='<select class="c130add" data-rin130="'+nextNo+'" aria-label="새 방에 넣을 사람"><option value="">+ 새 방 만들어 넣기</option>'+roomless.map(function(x){return '<option value="'+esc(x.user_id)+'">'+nk(x)+'</option>';}).join('')+'</select>';
    h+='</div>';}
  else h+='<p class="small" style="margin:0">참가하면 카풀 · 방 같이 쓸 사람을 찾을 수 있어요.</p>';
  if(W.length&&(host||mine))h+='<div class="mcwt"><b>대기 명단</b><span>'+W.map(function(x,i){return (i+1)+'. '+esc(x.nick);}).join(' · ')+'</span></div>';
  if(box.dataset.h!==h){box.dataset.h=h;box.innerHTML=h;}
  [].forEach.call(document.querySelectorAll('#mtPh .mtg a'),function(a){if(a.dataset.lb)return;a.dataset.lb=1;a.addEventListener('click',function(ev){ev.preventDefault();var A=[].map.call(document.querySelectorAll('#mtPh .mtg a'),function(x){return x.getAttribute('href');});lbOpen(A,A.indexOf(a.getAttribute('href')));});});};
document.addEventListener('click',function(e){var t;
  if((t=e.target.closest('[data-seat130]'))){var id=mtId(),M=id&&state.mem[id]||[],me=BE.user&&BE.user.id,mi=M.filter(function(x){return x.user_id===me;})[0];if(!mi)return;var s=Math.max(1,Math.min(8,(+mi.seats||0)+(+t.dataset.seat130)));if(s!==+mi.seats){var b=document.getElementById('mtCar');if(b)b.dataset.h='';mcSave({seats:s});}return;}
  if((t=e.target.closest('[data-cout130]'))){mpRpc130(t.dataset.cout130,'ride',null);return;}
  if((t=e.target.closest('[data-cjoin130]'))){mpRpc130(BE.user.id,'ride',t.dataset.cjoin130);return;}
  if((t=e.target.closest('[data-rout130]'))){mpRpc130(t.dataset.rout130,'room',null);return;}
  if((t=e.target.closest('[data-rjoin130]'))){mpRpc130(BE.user.id,'room',t.dataset.rjoin130);return;}});
document.addEventListener('change',function(e){var t=e.target;if(t.dataset&&t.dataset.cin130&&t.value){mpRpc130(t.value,'ride',t.dataset.cin130);return;}if(t.dataset&&t.dataset.rin130&&t.value){mpRpc130(t.value,'room',t.dataset.rin130);return;}
  /* 운전 안 하기로 바꾸면 내 차에 탄 사람은 '차 정하는 중'으로 */
  if(t.id==='mcRide'){var b=document.getElementById('mtCar');if(b)b.dataset.h='';}
  if(t.id==='mcRoom'&&!t.checked){var id=mtId(),M=id&&state.mem[id]||[],me=BE.user&&BE.user.id,mi=M.filter(function(x){return x.user_id===me;})[0];if(mi&&mi.room_no)mpRpc130(me,'room',null);}});

/* ---------- 2) 일차별 일정표 (다이빙 · 식사 · 이동 · 집결 · 자유) ---------- */
var SK130=[['meet','집결','📍'],['move','이동','🚐'],['dive','다이빙','🤿'],['meal','식사','🍽'],['brief','브리핑','📋'],['free','자유','☀️'],['etc','기타','•']];
function skOf130(k){return SK130.filter(function(x){return x[0]===k;})[0]||SK130[SK130.length-1];}
function skGuess130(x){x=String(x||'');if(/다이빙|다이브|입수|출항|회차|펀|보트|비치|dive/i.test(x))return 'dive';if(/아침|점심|저녁|식사|조식|중식|석식|밥|meal|lunch|dinner|breakfast/i.test(x))return 'meal';if(/집결|모이|만나/.test(x))return 'meet';if(/이동|출발|도착|공항|버스|차량|배|페리/.test(x))return 'move';if(/브리핑/.test(x))return 'brief';if(/자유|휴식|쉬/.test(x))return 'free';return 'etc';}
function schNorm130(S){return (S||[]).map(function(x){return {d:Math.max(1,Math.min(14,+x.d||1)),t:String(x.t||''),k:x.k||skGuess130(x.x),x:String(x.x||'')};});}
function dayLabel130(m,d){var b=m.meet_date&&Date.parse(m.meet_date+'T00:00:00+09:00');if(!b)return d+'일차';var dt=new Date(b+(d-1)*864e5+9*36e5);return d+'일차 · '+(dt.getUTCMonth()+1)+'월 '+dt.getUTCDate()+'일 ('+'일월화수목금토'[dt.getUTCDay()]+')';}
mtPlan=function(m,v){var W=mtWho(m),host=W.host||!!(W.me&&(m.cohosts||[]).indexOf(W.me)>=0),C=m.checklist||[],S=schNorm130(m.schedule);var box=document.getElementById('mtPlan');if(!C.length&&!S.length&&!host){if(box)box.remove();return;}var ck=LS.get('mck'+m.id,{});
  var days={};S.forEach(function(x){(days[x.d]=days[x.d]||[]).push(x);});var D=Object.keys(days).map(Number).sort(function(a,b){return a-b;});
  var h='<div class="a4h"><h2 style="margin:0">일정 · 준비물</h2>'+(host?'<button type="button" class="chip" data-mpedit="'+m.id+'">고치기</button>':'')+'</div>';
  if(D.length){h+='<div class="sc130">'+D.map(function(d){var L=days[d].slice().sort(function(a,b){return (a.t||'99').localeCompare(b.t||'99');}),nd=L.filter(function(x){return x.k==='dive';}).length;
      return '<section class="sc130d"><div class="sc130h"><b>'+dayLabel130(m,d)+'</b>'+(nd?'<span class="tag tag-sea">다이빙 '+nd+'회</span>':'')+'</div><ol>'+L.map(function(x){var k=skOf130(x.k);return '<li class="k-'+k[0]+'"><time>'+esc(x.t||'')+'</time><span class="sc130k">'+k[2]+' '+k[1]+'</span><span class="sc130x">'+esc(x.x)+'</span></li>';}).join('')+'</ol></section>';}).join('')+'</div>';}
  else if(host)h+='<p class="small" style="margin:0 0 8px">일차별로 집결 · 다이빙 · 식사 시간을 넣어 두면 참가자가 편해요.</p>';
  h+=(C.length?'<div class="mpck">'+C.map(function(x,i){return '<label><input type="checkbox" data-mck="'+m.id+'|'+i+'"'+(ck[i]?' checked':'')+'> <span>'+esc(x)+'</span></label>';}).join('')+'</div><p class="small" style="margin:6px 0 0">체크는 내 기기에만 저장돼요. '+C.filter(function(x,i){return ck[i];}).length+'/'+C.length+' 챙김</p>':(host?'<p class="small" style="margin:0">로그북 · 자격증 · 마스크 · 수영복처럼 챙길 것을 넣어 두세요.</p>':''));
  if(!box){box=document.createElement('div');box.className='panel';box.id='mtPlan';var ps=v.querySelectorAll(':scope > .panel');var ref=ps[0]||v.querySelector(':scope > .vh');ref.after(box);}if(box.dataset.h!==h){box.dataset.h=h;box.innerHTML=h;}};
function schRow130(x){x=x||{d:1,t:'',k:'dive',x:''};var o='';for(var d=1;d<=14;d++)o+='<option value="'+d+'"'+(+x.d===d?' selected':'')+'>'+d+'일차</option>';
  return '<div class="se130r"><select name="d" aria-label="일차">'+o+'</select><input name="t" type="time" value="'+esc(/^\d{1,2}:\d{2}$/.test(x.t)?('0'+x.t).slice(-5):'')+'" aria-label="시간"><select name="k" aria-label="종류">'+SK130.map(function(k){return '<option value="'+k[0]+'"'+(x.k===k[0]?' selected':'')+'>'+k[2]+' '+k[1]+'</option>';}).join('')+'</select><input name="x" type="text" maxlength="80" value="'+esc(x.x||'')+'" placeholder="예: 1회차 문섬 보트" aria-label="내용"><button type="button" class="chip" data-serm130 aria-label="이 줄 지우기">×</button></div>';}
var SET130=[['07:30','meet','항구 집결'],['08:00','dive','1회차 다이빙'],['10:30','dive','2회차 다이빙'],['12:30','meal','점심'],['14:00','dive','3회차 다이빙'],['18:30','meal','저녁']];
document.addEventListener('click',function(e){var b=e.target.closest('[data-mpedit]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var m=mtGet(+b.dataset.mpedit);if(!m)return;var S=schNorm130(m.schedule),C=(m.checklist||[]).join('\n');
  sheet('<h2 style="margin:0 0 6px">일정 · 준비물</h2><form id="mpF130" data-m="'+m.id+'"><div class="se130h"><b>일정표</b><span class="small">일차 · 시간 · 종류 · 내용</span></div><div id="se130L">'+(S.length?S.map(schRow130).join(''):schRow130())+'</div>'+
    '<div class="se130b"><button type="button" class="chip" data-seadd130>+ 한 줄</button><button type="button" class="chip" data-senext130>+ 다음 날</button><button type="button" class="chip" data-seset130>하루 기본 일정 넣기</button></div>'+
    '<label class="se130c">준비물 (한 줄에 하나)<textarea name="c" rows="4" placeholder="로그북 · 자격증&#10;마스크 · 핀&#10;멀미약">'+esc(C)+'</textarea></label><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"><button class="btn btn-line" type="button" onclick="closeSheet()">취소</button><button class="btn btn-pri" type="submit">저장</button></div></form>');},true);
function seLast130(){var L=document.querySelectorAll('#se130L .se130r');return L.length?+L[L.length-1].querySelector('[name=d]').value:1;}
document.addEventListener('click',function(e){var L=document.getElementById('se130L');if(!L)return;var t;
  if((t=e.target.closest('[data-serm130]'))){t.closest('.se130r').remove();if(!L.children.length)L.insertAdjacentHTML('beforeend',schRow130());return;}
  if(e.target.closest('[data-seadd130]')){if(L.children.length>=60)return toast('일정은 60줄까지예요');L.insertAdjacentHTML('beforeend',schRow130({d:seLast130(),t:'',k:'dive',x:''}));return;}
  if(e.target.closest('[data-senext130]')){if(L.children.length>=60)return toast('일정은 60줄까지예요');L.insertAdjacentHTML('beforeend',schRow130({d:Math.min(14,seLast130()+1),t:'',k:'meet',x:''}));return;}
  if(e.target.closest('[data-seset130]')){var d=seLast130(),R=[].slice.call(L.querySelectorAll('.se130r')),empty=R.length===1&&!R[0].querySelector('[name=x]').value&&!R[0].querySelector('[name=t]').value;if(empty)L.innerHTML='';else if(R.some(function(r){return +r.querySelector('[name=d]').value===d;}))d=Math.min(14,d+1);
    SET130.forEach(function(s){if(L.children.length<60)L.insertAdjacentHTML('beforeend',schRow130({d:d,t:s[0],k:s[1],x:s[2]}));});}});
document.addEventListener('submit',function(e){var f=e.target;if(f.id!=='mpF130')return;e.preventDefault();var id=+f.dataset.m;
  var S=[].map.call(f.querySelectorAll('.se130r'),function(r){var x=r.querySelector('[name=x]').value.trim().slice(0,80),t=r.querySelector('[name=t]').value;if(!x&&!t)return null;return {d:+r.querySelector('[name=d]').value||1,t:t,k:r.querySelector('[name=k]').value,x:x};}).filter(Boolean).slice(0,60);
  S.sort(function(a,b){return a.d-b.d||(a.t||'99').localeCompare(b.t||'99');});
  var C=f.c.value.split('\n').map(function(l){return l.trim().slice(0,60);}).filter(Boolean).slice(0,30);
  BE.sb.from('meetups').update({schedule:S,checklist:C}).eq('id',id).then(function(r){if(r.error)return toast('저장하지 못했어요');var m=mtGet(id);if(m){m.schedule=S;m.checklist=C;}closeSheet();var b=document.getElementById('mtPlan');if(b)b.dataset.h='';mtPanels122();toast('저장했어요');});});

(function(){var st=document.createElement('style');st.textContent=
 '.st130{display:inline-flex;align-items:center;gap:6px}.st130 .chip{min-width:34px;justify-content:center;font-weight:700}.st130 b{min-width:18px;text-align:center}'+
 '.c130sec{display:flex;flex-direction:column;gap:8px;margin-top:12px}.c130h{font-size:15px}.c130box{display:flex;flex-direction:column;gap:8px;padding:10px 12px;border:1px solid var(--line,#dfe7ec);border-radius:12px}.c130t{display:flex;justify-content:space-between;align-items:baseline;gap:8px}.c130over{color:#b8342c;font-weight:600}.c130m{display:flex;flex-wrap:wrap;gap:6px}'+
 '.c130p{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;background:var(--soft,#eef4f8);font-size:14px}.c130p button{border:0;background:none;padding:0 2px;font-size:16px;line-height:1;cursor:pointer;color:inherit;opacity:.6}.c130p button:hover{opacity:1}.c130add{max-width:100%;min-height:38px}.c130join{align-self:flex-start;min-height:36px}.c130wait{display:flex;flex-wrap:wrap;align-items:center;gap:6px}'+
 '.sc130{display:flex;flex-direction:column;gap:12px;margin-bottom:10px}.sc130h{display:flex;align-items:center;gap:8px;margin-bottom:6px}.sc130d ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}.sc130d li{display:grid;grid-template-columns:52px 84px minmax(0,1fr);gap:8px;align-items:center;padding:8px 10px;border-radius:10px;background:var(--soft,#eef4f8)}.sc130d time{font-weight:700;font-variant-numeric:tabular-nums}.sc130k{font-size:13px;font-weight:600;white-space:nowrap}.sc130x{min-width:0;overflow-wrap:anywhere}.sc130d li.k-dive{background:rgba(26,134,199,.12)}.sc130d li.k-meal{background:rgba(246,160,77,.16)}.sc130d li.k-meet,.sc130d li.k-move{background:rgba(120,140,160,.12)}'+
 '.se130h{display:flex;justify-content:space-between;align-items:baseline;margin:4px 0 6px}#se130L{display:flex;flex-direction:column;gap:6px;max-height:46vh;overflow:auto}.se130r{display:grid;grid-template-columns:78px 92px 96px minmax(0,1fr) 34px;gap:6px;align-items:center}.se130r select,.se130r input{min-height:38px;min-width:0}.se130b{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.se130c{display:flex;flex-direction:column;gap:4px;margin-top:6px}.se130c textarea{width:100%}'+
 '@media(max-width:560px){.se130r{grid-template-columns:72px 1fr 1fr 34px;padding-bottom:8px;border-bottom:1px dashed var(--line,#dfe7ec)}.se130r [name=x]{grid-column:1/4}.sc130d li{grid-template-columns:46px 74px minmax(0,1fr)}}';document.head.appendChild(st);})();

/* ---------- 3) 모임 사진첩: 일차별로 올리고 보기 · 올린 사람 표시 ---------- */
state.phDay130=state.phDay130||{};state.phView130=state.phView130||{};
function phDays130(m){var n=1;(m.schedule||[]).forEach(function(x){if(+x.d>n)n=+x.d;});((state.mph&&state.mph[m.id])||[]).forEach(function(p){if(+p.day>n)n=+p.day;});return Math.max(1,Math.min(14,n));}
function phDayOf130(m,p){if(+p.day)return +p.day;var b=m.meet_date&&Date.parse(m.meet_date+'T00:00:00+09:00');if(!b||!p.created_at)return 0;var k=Math.floor((Date.parse(p.created_at)+9*36e5-b-9*36e5)/864e5)+1;return k>=1&&k<=14?k:0;}
function phWho130(m,uid){var me=BE.user&&BE.user.id;if(uid===me)return '나';var M=(state.mem&&state.mem[m.id])||[],x=M.filter(function(y){return y.user_id===uid;})[0];if(x&&x.nick)return x.nick;if(uid===m.owner)return '모임장';return '참가자';}
function phPaint130(){if(cur()!=='meet')return;var id=mtId();if(!id)return;var m=mtGet(id),ph=document.getElementById('mtPh'),P=state.mph&&state.mph[id];if(!m||!ph||!P)return;
  var M=(state.mem&&state.mem[id])||[],me=BE.user&&BE.user.id,host=me&&(m.owner===me||(m.cohosts||[]).indexOf(me)>=0),joined=me&&M.some(function(x){return x.user_id===me;}),past=m.meet_date&&m.meet_date<=new Date().toISOString().slice(0,10);
  var nd=phDays130(m),up=state.phDay130[id];if(!up){var b=m.meet_date&&Date.parse(m.meet_date+'T00:00:00+09:00'),k=b?Math.floor((Date.now()-b)/864e5)+1:1;up=k>=1&&k<=nd?k:1;}if(up>nd+1)up=nd;
  var view=state.phView130[id]||0,G={};P.forEach(function(p){var d=phDayOf130(m,p);(G[d]=G[d]||[]).push(p);});
  var tabs='<div class="chips ph130t">'+[[0,'전체 '+P.length]].concat(Array.apply(null,{length:nd}).map(function(_,i){return [i+1,(i+1)+'일차 '+((G[i+1]||[]).length)];})).concat(G[0]&&G[0].length?[[-1,'날짜 미정 '+G[0].length]]:[]).map(function(t){return '<button type="button" class="chip" data-phv130="'+t[0]+'" aria-pressed="'+(view===t[0])+'">'+t[1]+'</button>';}).join('')+'</div>';
  var upl=(joined||host)?'<div class="ph130u"><select data-phday130="'+id+'" aria-label="올릴 일차">'+Array.apply(null,{length:Math.min(14,nd+1)}).map(function(_,i){return '<option value="'+(i+1)+'"'+(up===i+1?' selected':'')+'>'+(i+1)+'일차'+(i===nd?' (추가)':'')+'</option>';}).join('')+'</select><label class="chip" style="cursor:pointer">＋ 사진 올리기<input type="file" accept="image/*" multiple data-mtup="'+id+'" style="position:absolute;left:-9999px"></label></div>':'';
  var cell=function(p){var d=phDayOf130(m,p),mine=p.owner===me,u=esc(pubUrl(p.path));return '<figure class="ph130f"><a href="'+u+'" target="_blank" rel="noopener"><img src="'+u+'" alt="" loading="lazy"></a><figcaption><span>'+esc(phWho130(m,p.owner))+'</span>'+(mine?'<select data-phmv130="'+p.id+'" aria-label="일차 바꾸기">'+Array.apply(null,{length:nd}).map(function(_,i){return '<option value="'+(i+1)+'"'+(d===i+1?' selected':'')+'>'+(i+1)+'일차</option>';}).join('')+(d?'':'<option value="" selected>미정</option>')+'</select>':'')+((mine||host)?'<button type="button" data-phdel130="'+p.id+'" aria-label="사진 지우기">×</button>':'')+'</figcaption></figure>';};
  var body;if(!P.length)body='<p class="small" style="margin:0">'+(past?'함께 다녀온 사진을 일차별로 모아 보세요.':'모임 날 찍은 사진을 일차별로 모아요.')+'</p>';
  else if(view===0){var ks=Object.keys(G).map(Number).sort(function(a,b){return (a||99)-(b||99);});body=ks.map(function(d){return '<section class="ph130s"><div class="ph130h"><b>'+(d?dayLabel130(m,d):'날짜 미정')+'</b><span class="small">'+G[d].length+'장</span></div><div class="mtg ph130g">'+G[d].map(cell).join('')+'</div></section>';}).join('');}
  else{var L=G[view===-1?0:view]||[];body=L.length?'<div class="mtg ph130g">'+L.map(cell).join('')+'</div>':'<p class="small" style="margin:0">'+view+'일차 사진이 아직 없어요.</p>';}
  var h='<div class="sph"><h2>모임 사진첩 <span class="small">'+P.length+'</span></h2>'+upl+'</div>'+(P.length?tabs:'')+body;
  if(ph.dataset.h130!==h){ph.dataset.h130=h;ph.innerHTML=h;}}
if(typeof mtPanels==='function'){var _mtp130=mtPanels;mtPanels=function(){var ph=document.getElementById('mtPh');if(ph)ph.dataset.h130='';_mtp130.apply(this,arguments);phPaint130();if(typeof mtExtra==='function')mtExtra();};}
document.addEventListener('click',function(e){var t;if((t=e.target.closest('[data-phv130]'))){var id=mtId();state.phView130[id]=+t.dataset.phv130;phPaint130();mtExtra();return;}
  if((t=e.target.closest('[data-phdel130]'))){if(!confirm('이 사진을 지울까요?'))return;var pid=+t.dataset.phdel130,id=mtId();BE.sb.from('meetup_photos').delete().eq('id',pid).then(function(r){if(r.error)return toast('지우지 못했어요');state.mph[id]=(state.mph[id]||[]).filter(function(p){return p.id!==pid;});phPaint130();});}});
document.addEventListener('change',function(e){var t=e.target;
  if(t.dataset&&t.dataset.phday130){state.phDay130[+t.dataset.phday130]=+t.value;return;}
  if(t.dataset&&t.dataset.phmv130){var pid=+t.dataset.phmv130,d=+t.value||null,id=mtId();BE.sb.from('meetup_photos').update({day:d}).eq('id',pid).then(function(r){if(r.error)return toast('바꾸지 못했어요');(state.mph[id]||[]).forEach(function(p){if(p.id===pid)p.day=d;});phPaint130();toast(d?d+'일차로 옮겼어요':'바꿨어요');});return;}
  if(!t.dataset||!t.dataset.mtup)return;e.stopImmediatePropagation();var id=+t.dataset.mtup,m=mtGet(id),F=[].slice.call(t.files||[]).slice(0,20);if(!F.length)return;
  var sel=document.querySelector('[data-phday130="'+id+'"]'),day=sel?+sel.value:(state.phDay130[id]||1);toast(day+'일차에 '+F.length+'장 올리는 중…');
  Promise.all(F.map(function(f){return new Promise(function(res){var im=new Image(),u=URL.createObjectURL(f);im.onload=function(){var s=Math.min(1,1800/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(function(bl){upload('media',bl,'meetup.jpg').then(function(p){return BE.sb.from('meetup_photos').insert({meetup_id:id,path:p,day:day}).select('*');}).then(function(r){res(r&&r.data&&r.data[0]);}).catch(function(){res(null);});},'image/jpeg',.85);};im.onerror=function(){res(null);};im.src=u;});}))
    .then(function(R){R=R.filter(Boolean);state.mph[id]=R.concat(state.mph[id]||[]);state.phView130[id]=state.phView130[id]||0;toast(R.length?day+'일차에 '+R.length+'장 올렸어요':'올리지 못했어요');phPaint130();mtExtra();t.value='';});},true);
(function(){var st=document.createElement('style');st.textContent='.ph130u{display:flex;align-items:center;gap:6px;margin-left:auto}.ph130u select{min-height:36px}.ph130t{margin:4px 0 10px;flex-wrap:wrap}.ph130s{margin-bottom:12px}.ph130h{display:flex;align-items:baseline;gap:8px;margin:0 0 6px}#mtPh .ph130g{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}.ph130f{margin:0;display:flex;flex-direction:column;gap:4px;min-width:0}.ph130f a{display:block}.ph130f img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;display:block}.ph130f figcaption{display:flex;align-items:center;gap:4px;font-size:12px;min-width:0}.ph130f figcaption span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}.ph130f figcaption select{font-size:11px;min-height:24px;padding:0 2px;max-width:62px}.ph130f figcaption button{border:0;background:none;cursor:pointer;font-size:15px;opacity:.55;padding:0 2px;color:inherit}';document.head.appendChild(st);})();

/* ---------- 4) 카풀 · 방: 끌어서 옮기기 (마우스 · 터치 공통) ---------- */
(function(){var D=null;
  function canDrag(){var id=mtId(),M=id&&state.mem&&state.mem[id]||[],me=BE.user&&BE.user.id,m=id&&mtGet(id);if(!me||!m)return false;if(m.owner===me||(m.cohosts||[]).indexOf(me)>=0)return true;return M.some(function(x){return x.user_id===me&&x.rsvp!=='wait';});}
  function zoneAt(x,y,kind){var el=document.elementFromPoint(x,y);if(!el)return null;var z=el.closest(kind==='ride'?'[data-dcar130]':'[data-droom130]');return z&&z.closest('#mtCar')?z:null;}
  function clear(){[].forEach.call(document.querySelectorAll('#mtCar .dz130'),function(z){z.classList.remove('dz130');});}
  function stop(){if(!D)return;clear();document.body.classList.remove('dragging130');if(D.ghost)D.ghost.remove();D.c.classList.remove('c130drag');D=null;}
  document.addEventListener('pointerdown',function(e){var c=e.target.closest('#mtCar .c130p[data-uid]');if(!c||e.target.closest('button')||e.button>0||!canDrag())return;
    D={c:c,uid:c.dataset.uid,kind:c.dataset.dk,x0:e.clientX,y0:e.clientY,on:false,ghost:null,from:c.closest(c.dataset.dk==='ride'?'[data-dcar130]':'[data-droom130]'),pid:e.pointerId};});
  document.addEventListener('pointermove',function(e){if(!D||e.pointerId!==D.pid)return;var dx=e.clientX-D.x0,dy=e.clientY-D.y0;
    if(!D.on){if(Math.abs(dx)+Math.abs(dy)<7)return;D.on=true;var r=D.c.getBoundingClientRect(),g=D.c.cloneNode(true);g.className='c130p c130ghost';g.style.width=r.width+'px';g.style.left=r.left+'px';g.style.top=r.top+'px';document.body.appendChild(g);D.ghost=g;D.ox=e.clientX-r.left;D.oy=e.clientY-r.top;D.c.classList.add('c130drag');document.body.classList.add('dragging130');}
    e.preventDefault();D.ghost.style.left=(e.clientX-D.ox)+'px';D.ghost.style.top=(e.clientY-D.oy)+'px';clear();var z=zoneAt(e.clientX,e.clientY,D.kind);if(z&&z!==D.from)z.classList.add('dz130');
    if(e.clientY<70)window.scrollBy(0,-12);else if(e.clientY>innerHeight-90)window.scrollBy(0,12);},{passive:false});
  document.addEventListener('pointerup',function(e){if(!D||e.pointerId!==D.pid)return;var d=D;var on=d.on,z=on?zoneAt(e.clientX,e.clientY,d.kind):null;stop();if(!on)return;
    var sup=function(ev){ev.stopPropagation();ev.preventDefault();};document.addEventListener('click',sup,true);setTimeout(function(){document.removeEventListener('click',sup,true);},250);
    if(!z||z===d.from)return;if(d.kind==='ride')mpRpc130(d.uid,'ride',z.dataset.dcar130||null);else mpRpc130(d.uid,'room',z.dataset.droom130||null);});
  document.addEventListener('pointercancel',stop);
  var st=document.createElement('style');st.textContent='#mtCar .c130p[data-uid]{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}.c130ghost{position:fixed;z-index:9999;pointer-events:none;box-shadow:0 10px 26px rgba(0,0,0,.25);transform:scale(1.06) rotate(-2deg);background:#fff!important;cursor:grabbing}.c130drag{opacity:.35}#mtCar .dz130{outline:2px dashed #1a86c7;outline-offset:2px;background:rgba(26,134,199,.08)}.c130new{padding:12px;border:2px dashed var(--line,#cfdbe4);border-radius:12px;text-align:center;font-size:14px;opacity:.75}body.dragging130{cursor:grabbing}.c130wait{min-height:40px;padding:6px;border-radius:10px}';document.head.appendChild(st);})();
