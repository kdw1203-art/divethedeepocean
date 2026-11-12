/* ===== 4차-B: 업체·예약·광고·장비·폼·모임 ===== */
(function(){var st=document.createElement('style');st.textContent=[
'.sigpad{width:100%;height:120px;border:1px dashed var(--line);border-radius:12px;background:#fff;touch-action:none;display:block}',
'.adslot{position:relative;display:flex;gap:12px;align-items:center;text-decoration:none;color:inherit}.adslot img{width:96px;height:72px;object-fit:cover;border-radius:10px;flex:none}',
'.adtag{position:absolute;top:8px;right:10px;font-size:11px;font-weight:700;color:var(--sub);border:1px solid var(--line);border-radius:6px;padding:1px 6px}',
'.chatlog{display:flex;flex-direction:column;gap:6px;max-height:320px;overflow:auto;padding:4px 0}.chatlog .m{background:var(--bg);border-radius:12px;padding:8px 10px;max-width:85%}.chatlog .m.me{align-self:flex-end;background:#d9eef7}.chatlog .m small{display:block;color:var(--sub);font-size:11px}',
'.prev{border:2px dashed var(--sea);border-radius:16px;padding:14px}.prev h3{margin:0 0 4px}',
'.dash{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}.dash div{background:var(--bg);border-radius:12px;padding:10px}.dash b{display:block;font-size:20px}'
].join('');document.head.appendChild(st);})();
function sel(id){return document.getElementById(id);}
function val(id){var e=sel(id);return e?(e.type==='checkbox'?e.checked:String(e.value||'').trim()):'';}

/* ---------- 공용 데이터: 승인 업체 확장 목록 ---------- */
state.pb2=null;
function pb2(){if(state.pb2||!BE.on||pb2.b)return state.pb2||[];pb2.b=1;BE.sb.from('businesses').select('id,owner,biz_type,name,spot,langs,orgs,services,price,price_list,paused,parent_id,created_at').eq('status','approved').limit(500).then(function(r){pb2.b=0;state.pb2=r.data||[];var c=cur();if(c==='edu'||c==='spot'||c==='gear'||c==='resorts'||c==='biz')rerender();});return [];}

/* ---------- 194 원화 · 현지 통화 ---------- */
var CUR={'필리핀':'PHP','인도네시아':'IDR','일본':'JPY','태국':'THB','이집트':'EGP','말레이시아':'MYR','호주':'AUD','미국':'USD','미국령':'USD','몰디브':'USD','멕시코':'MXN','미크로네시아 연방':'USD','팔라우':'USD','피지':'FJD','프랑스령 폴리네시아':'XPF','바하마':'BSD','베트남':'VND','세이셸':'SCR','모리셔스':'MUR','모잠비크':'MZN','남아프리카공화국':'ZAR','탄자니아':'TZS','통가':'TOP','파푸아뉴기니':'PGK','뉴질랜드':'NZD','에콰도르':'USD','코스타리카':'CRC','벨리즈':'BZD','네덜란드령':'USD','영국령':'USD','아이슬란드':'ISK','몰타':'EUR','그리스':'EUR','튀르키예':'TRY','스페인':'EUR'};
state.fx=LS.get('fx',null);
function fxLoad(){if(fxLoad.b||(state.fx&&Date.now()-state.fx.t<12*36e5))return;fxLoad.b=1;fetch('https://open.er-api.com/v6/latest/KRW').then(function(r){return r.json();}).then(function(d){if(d&&d.rates){state.fx={t:Date.now(),r:d.rates};LS.set('fx',state.fx);var c=cur();if(c==='biz'||c==='bookings'||c==='bizbook')rerender();}}).catch(function(){});}
function fxOf(krw,country){var c=CUR[country];if(!c||!state.fx||!state.fx.r[c]||!krw)return '';var v=krw*state.fx.r[c];return ' ≈ '+(v>=100?Math.round(v).toLocaleString():v.toFixed(2))+' '+c;}

/* ---------- 199 · 216 · 220 예약 종류 · 서약서 ---------- */
var sig={on:false,drawn:false};
function bookExtra(){var k=val('bk_k')||'stay',w=null;var cv=sel('bk_sig');
  if(sel('bk_w1'))w={health:val('bk_w1'),risk:val('bk_w2'),name:val('bk_wn'),signed_at:new Date().toISOString(),sig:cv&&sig.drawn?cv.toDataURL('image/png',.5):null,cabin:val('bk_cab')||null};
  return {kind:k,waiver:w};}
function bookCheck(){if(!sel('bk_w1'))return '';if(!val('bk_w1'))return '건강 상태 확인에 체크해 주세요.';if(!val('bk_w2'))return '위험 고지와 안전 수칙에 동의해 주세요.';if(val('bk_wn').length<2)return '서명할 이름을 적어 주세요.';if(!sig.drawn)return '서명 칸에 서명해 주세요.';return '';}
function sigInit(){var c=sel('bk_sig');if(!c||c.dataset.on)return;c.dataset.on=1;sig.drawn=false;var r=c.getBoundingClientRect();c.width=Math.round(r.width*2);c.height=240;var x=c.getContext('2d');x.lineWidth=4;x.lineCap='round';x.strokeStyle='#0b3550';var dn=false;
  function p(e){var b=c.getBoundingClientRect();return [(e.clientX-b.left)*c.width/b.width,(e.clientY-b.top)*c.height/b.height];}
  c.addEventListener('pointerdown',function(e){dn=true;c.setPointerCapture(e.pointerId);var q=p(e);x.beginPath();x.moveTo(q[0],q[1]);});
  c.addEventListener('pointermove',function(e){if(!dn)return;var q=p(e);x.lineTo(q[0],q[1]);x.stroke();sig.drawn=true;});
  c.addEventListener('pointerup',function(){dn=false;});
  var cl=sel('bk_sigclr');if(cl)cl.onclick=function(){x.clearRect(0,0,c.width,c.height);sig.drawn=false;};}

/* ---------- 업체 공개 페이지 보강: 165 조회수 · 167 강사 · 177 지점 · 178 후기·답글 · 194 · 195 ---------- */
state.brv={};state.staff={};state.sib={};
function brvLoad(id){if(state.brv[id]!==undefined||brvLoad[id])return;brvLoad[id]=1;BE.sb.from('biz_reviews').select('*').eq('business_id',id).order('created_at',{ascending:false}).limit(100).then(function(r){brvLoad[id]=0;state.brv[id]=r.data||[];if(cur()==='biz'||cur()==='bizpage')rerender();});}
function staffLoad(id){if(state.staff[id]!==undefined||staffLoad[id])return;staffLoad[id]=1;BE.sb.from('biz_staff').select('*').eq('business_id',id).then(function(r){staffLoad[id]=0;state.staff[id]=r.data||[];if(cur()==='biz'||cur()==='bizpage')rerender();});}
function sibLoad(b){var root=b.parent_id||b.id;if(state.sib[b.id]!==undefined||sibLoad[b.id])return;sibLoad[b.id]=1;BE.sb.from('businesses').select('id,name,spot,parent_id').eq('status','approved').or('id.eq.'+root+',parent_id.eq.'+root).then(function(r){sibLoad[b.id]=0;state.sib[b.id]=(r.data||[]).filter(function(x){return x.id!==b.id;});if(cur()==='biz')rerender();});}
function stars(n){n=Math.round(n);return '★★★★★'.slice(0,n)+'☆☆☆☆☆'.slice(0,5-n);}
var _biz5=V.biz;V.biz=function(arg){var h=_biz5(arg);if(!arg||String(arg).charAt(0)!=='d'||!BE.on)return h;var id=+String(arg).slice(1),b=state.bizPub[id];if(!b)return h;
  var mine=BE.user&&b.owner===BE.user.id,s=spot(b.spot)||{};fxLoad();brvLoad(id);staffLoad(id);
  if(!mine){try{var k='bv'+id;if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,1);BE.sb.rpc('bump_biz_view',{bid:id}).then(function(){});}}catch(e){}}
  if(b.paused===undefined&&!b._x){b._x=1;BE.sb.from('businesses').select('paused,parent_id').eq('id',id).maybeSingle().then(function(r){if(r.data){b.paused=r.data.paused;b.parent_id=r.data.parent_id;sibLoad(b);if(cur()==='biz')rerender();}});}
  var R=state.brv[id]||[],avg=R.length?R.reduce(function(a,r){return a+r.rating;},0)/R.length:0,mineR=BE.user&&R.filter(function(r){return r.owner===BE.user.id;})[0];
  var ST=(state.staff[id]||[]),ok=ST.filter(function(x){return x.status==='ok';}),me=BE.user&&ST.filter(function(x){return x.user_id===BE.user.id;})[0];
  var sib=state.sib[id]||[];
  /* 예약 폼: 종류 · 리브어보드 선실 · 서약서 */
  var la=/리브어보드/.test(b.biz_type||'');
  h=h.replace('<label for="bk_r" style="grid-column:1/-1">','<label for="bk_k">예약 종류<select id="bk_k"><option value="stay"'+(la?'':' selected')+'>숙박 · 펀다이빙</option><option value="course">교육 과정</option><option value="liveaboard"'+(la?' selected':'')+'>리브어보드</option></select></label>'+(la?'<label for="bk_cab">선실<select id="bk_cab"><option>2인실 (트윈)</option><option>2인실 (더블)</option><option>4인실</option><option>스위트</option><option>상관없음</option></select></label>':'')+'<label for="bk_r" style="grid-column:1/-1">');
  h=h.replace('<div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">예약 요청 보내기','<fieldset style="grid-column:1/-1"><legend>안전 서약 (전자 서명)</legend><label class="ck" for="bk_w1"><input id="bk_w1" type="checkbox">최근 1년 안에 심장·폐·귀 질환, 수술, 임신 등 다이빙에 영향을 주는 상태가 없어요. 있으면 의사 소견서를 준비할게요.</label><label class="ck" for="bk_w2"><input id="bk_w2" type="checkbox">다이빙에는 감압병·익수 등 위험이 있다는 것을 알고, 업체 브리핑과 안전 수칙을 따를게요.</label><label for="bk_wn">서명할 이름<input id="bk_wn" maxlength="40" autocomplete="name"></label><canvas id="bk_sig" class="sigpad" aria-label="손가락이나 마우스로 서명"></canvas><button class="chip" type="button" id="bk_sigclr" style="margin-top:6px">서명 지우기</button><p class="small" style="margin:6px 0 0">서명은 이 예약을 받는 업체만 볼 수 있어요. 현장에서 업체 양식에 다시 서명할 수 있어요.</p></fieldset><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">예약 요청 보내기');
  if(b.paused)h=h.replace(/<form class="panel form" id="bookForm"[\s\S]*?<\/form>/,'<div class="panel"><h2>지금은 쉬는 기간이에요</h2><p class="empty" style="margin:0">비수기·휴업으로 예약 요청을 잠시 받지 않아요. 메시지로 다음 운영 일정을 물어보세요.</p></div>');
  var fx=CUR[s.country]&&state.fx?'<p class="small" style="margin:8px 0 0">참고 환율: 10,000원'+fxOf(10000,s.country)+' (open.er-api.com, 하루 한 번 갱신)</p>':'';
  h=h.replace('정확한 금액은 예약 요청 뒤 업체가 견적으로 알려줘요.</p>','정확한 금액은 예약 요청 뒤 업체가 견적으로 알려줘요.</p>'+fx);
  var extra='<div class="cols"><div class="panel"><h2>후기'+(avg?' <span class="stars">★ '+avg.toFixed(1)+' · '+R.length+'개</span>':'')+'</h2>'+(R.length?'<div class="list">'+R.map(function(r){return '<div class="item" style="flex-direction:column;align-items:stretch"><span class="tx"><span>'+stars(r.rating)+' · '+esc(r.nick||'다이버')+' · '+r.created_at.slice(0,10)+'</span><span style="white-space:pre-wrap;color:var(--ink)">'+esc(r.body||'')+'</span></span>'+(r.reply?'<div class="notice" style="margin-top:6px"><b>업체 답글</b> '+esc(r.reply)+'</div>':'')+(mine?'<form class="form" data-brep="'+r.id+'" style="margin-top:6px;grid-template-columns:minmax(0,1fr) auto;align-items:end"><label>'+(r.reply?'답글 고치기':'답글 달기')+'<input maxlength="1000" value="'+esc(r.reply||'')+'"></label><button class="btn btn-line" type="submit">저장</button></form>':'')+(BE.user&&r.owner===BE.user.id?'<span><button class="chip" type="button" data-brdel="'+r.id+'">내 후기 지우기</button></span>':'')+'</div>';}).join('')+'</div>':'<p class="empty">아직 후기가 없어요.</p>')+
    (BE.user&&!mine&&!mineR?'<form class="form" id="brForm" data-bid="'+id+'" style="margin-top:10px"><label for="br_r">별점<select id="br_r"><option value="5">★★★★★ 최고예요</option><option value="4">★★★★ 좋아요</option><option value="3">★★★ 보통</option><option value="2">★★ 아쉬워요</option><option value="1">★ 별로예요</option></select></label><label for="br_b" style="grid-column:1/-1">후기<textarea id="br_b" rows="3" maxlength="1000" placeholder="다녀온 시기, 다이빙·강습·숙소가 어땠는지"></textarea></label><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">후기 남기기</button></div></form>':'')+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:20px"><div class="panel"><h2>소속 강사</h2>'+(ok.length?'<div class="list">'+ok.map(function(x){return item({av:true,tags:[[x.role,'ok']],t:esc(x.nick||'강사'),s:'이 업체 소속'});}).join('')+'</div>':'<p class="empty">등록된 소속 강사가 없어요.</p>')+(BE.user&&!mine?(me?'<p class="small" style="margin:8px 0 0">'+(me.status==='ok'?'이 업체 소속으로 표시되고 있어요.':'소속 신청을 보냈어요. 업체가 승인하면 표시돼요.')+' <button class="chip" type="button" data-stleave="'+id+'">'+(me.status==='ok'?'소속 해제':'신청 취소')+'</button></p>':'<button class="btn btn-line" type="button" data-stjoin="'+id+'" style="margin-top:8px">이 업체 소속 강사로 신청</button>'):'')+'</div>'+
    (sib.length?'<div class="panel"><h2>같은 업체의 다른 지점</h2><div class="list">'+sib.map(function(x){var ss=spot(x.spot)||{};return item({href:'#biz-d'+x.id,t:esc(x.name),s:(ss.name||'')+(ss.country?' · '+ss.country:'')});}).join('')+'</div></div>':'')+'</div></div>';
  return h+extra;};

/* 업체 관리: 대시보드 · 일시정지 · 지점 묶기 · 소속 강사 승인 */
state.bizX={};state.bviews={};
function bizXLoad(dbid){if(state.bizX[dbid]!==undefined||bizXLoad[dbid])return;bizXLoad[dbid]=1;BE.sb.from('businesses').select('id,paused,parent_id').eq('id',dbid).maybeSingle().then(function(r){bizXLoad[dbid]=0;state.bizX[dbid]=r.data||{};if(cur()==='bizpage')rerender();});
  var since=new Date(Date.now()-30*864e5).toISOString().slice(0,10);BE.sb.from('biz_views').select('day,n').eq('business_id',dbid).gte('day',since).then(function(r){state.bviews[dbid]=r.data||[];if(cur()==='bizpage')rerender();});}
var _bizpage5=V.bizpage;V.bizpage=function(i){var h=_bizpage5(i),b=state.biz[+i];if(!b||!BE.on||!b.dbid)return h;var id=b.dbid;bizXLoad(id);brvLoad(id);staffLoad(id);if(!state.myBook)bookLoad();
  var X=state.bizX[id]||{},V7=0,V30=0,vw=state.bviews[id]||[],wk=new Date(Date.now()-7*864e5).toISOString().slice(0,10);vw.forEach(function(v){V30+=v.n;if(v.day>=wk)V7+=v.n;});
  var B=(state.myBook||[]).filter(function(x){return x.business_id===id;}),req=B.length,conf=B.filter(function(x){return x.status==='confirmed'||x.status==='done';}).length,R=state.brv[id]||[],avg=R.length?(R.reduce(function(a,r){return a+r.rating;},0)/R.length).toFixed(1):'—',noRep=R.filter(function(r){return !r.reply;}).length;
  var ST=state.staff[id]||[],pend=ST.filter(function(x){return x.status==='pending';}),okS=ST.filter(function(x){return x.status==='ok';});
  var others=state.biz.map(function(x,j){return {x:x,j:j};}).filter(function(o){return o.x.dbid&&o.x.dbid!==id;});
  var p='<div class="panel"><h2>업체 대시보드 <span class="small">최근 30일</span></h2><div class="dash"><div><small>페이지 조회</small><b>'+V30.toLocaleString()+'</b><span class="small">7일 '+V7+'</span></div><div><small>예약 요청</small><b>'+req+'</b><span class="small">확정 '+conf+'</span></div><div><small>전환율</small><b>'+(V30?Math.round(req/V30*1000)/10+'%':'—')+'</b><span class="small">요청 ÷ 조회</span></div><div><small>후기 평점</small><b>'+avg+'</b><span class="small">답글 안 단 후기 '+noRep+'</span></div></div>'+
    (b.status==='승인됨'?'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn '+(X.paused?'btn-pri':'btn-line')+'" type="button" data-bpause="'+id+'" data-v="'+(X.paused?0:1)+'">'+(X.paused?'운영 다시 시작':'비수기 일시정지')+'</button>'+(X.paused?'<span class="tag fr">일시정지 중 · 예약 요청을 받지 않아요</span>':'')+'</div>':'')+
    (others.length?'<div class="form" style="margin-top:12px;grid-template-columns:minmax(0,1fr) auto;align-items:end"><label for="bpar">본점으로 묶기 (다지점)<select id="bpar"><option value="">묶지 않음 (단독 · 본점)</option>'+others.map(function(o){return '<option value="'+o.x.dbid+'"'+(X.parent_id===o.x.dbid?' selected':'')+'>'+esc(o.x.name)+'</option>';}).join('')+'</select></label><button class="btn btn-line" type="button" data-bpar="'+id+'">저장</button></div><p class="small" style="margin:6px 0 0">지점으로 묶으면 공개 페이지에 다른 지점이 함께 보이고, 프로 요금은 두 번째 지점부터 50%예요.</p>':'')+'</div>'+
    '<div class="panel"><h2>소속 강사</h2>'+(pend.length?'<div class="list">'+pend.map(function(x){return '<div class="item"><span class="tx"><span>신청</span><b>'+esc(x.nick||'강사')+'</b></span><button class="chip" type="button" data-stok="'+id+'" data-u="'+x.user_id+'">승인</button><button class="chip" type="button" data-stno="'+id+'" data-u="'+x.user_id+'">거절</button></div>';}).join('')+'</div>':'')+(okS.length?'<div class="list">'+okS.map(function(x){return '<div class="item"><span class="tx"><span>'+esc(x.role)+'</span><b>'+esc(x.nick||'강사')+'</b></span><button class="chip" type="button" data-stno="'+id+'" data-u="'+x.user_id+'">해제</button></div>';}).join('')+'</div>':'')+(!pend.length&&!okS.length?'<p class="empty">강사가 공개 페이지에서 \'소속 강사로 신청\'을 누르면 여기서 승인해요.</p>':'')+'</div>';
  var k=h.indexOf('<div class="cols">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};

/* 196 수수료 표시 · 194 견적 환율 */
var _bizbook5=V.bizbook;V.bizbook=function(i){var h=_bizbook5(i);return h.replace(/수수료 \((입점 6개월 3%|7%)\)/,'수수료 ($1 · 월 3천만원↑ −0.5%p, 1억↑ −1%p)').replace(/<span class="small" style="white-space:pre-wrap">/g,'<span class="small" style="white-space:pre-wrap">');};
var _bookings5=V.bookings;V.bookings=function(){var h=_bookings5();if(!state.myBook)return h;fxLoad();
  state.myBook.forEach(function(b){var biz=b.businesses||{},s=spot(biz.spot)||{};if(b.quote_krw!=null)h=h.replace('<b>견적 '+(+b.quote_krw).toLocaleString()+'원</b>','<b>견적 '+(+b.quote_krw).toLocaleString()+'원</b><span class="small">'+fxOf(b.quote_krw,s.country)+'</span>');});
  return h.replace(/(<span style="display:flex;gap:6px;flex-wrap:wrap">)/g,'$1').replace(/data-bkcancel="(\d+)"/g,'data-bkcancel="$1"');};

/* ---------- 207 강사 찾기 (실제 입점 강사 · 필터) ---------- */
state.ef=state.ef||{lang:'',org:'',ctry:'',price:false};
var _edu5=V.edu;V.edu=function(){var h=_edu5();if(!BE.on)return h;var L=pb2().filter(function(b){return /강사/.test(b.biz_type)||(b.services||[]).some(function(s){return /교육/.test(s);});}),f=state.ef;
  var langs={},orgs={},cs={};L.forEach(function(b){(b.langs||[]).forEach(function(x){langs[x]=1;});(b.orgs||[]).forEach(function(x){orgs[x]=1;});var s=spot(b.spot);if(s)cs[s.country]=1;});
  var R=L.filter(function(b){var s=spot(b.spot)||{};return (!f.lang||(b.langs||[]).indexOf(f.lang)>=0)&&(!f.org||(b.orgs||[]).indexOf(f.org)>=0)&&(!f.ctry||s.country===f.ctry)&&(!f.price||b.price||(b.price_list||[]).length);});
  function opt(id,lab,o,v){return '<label for="'+id+'">'+lab+'<select id="'+id+'" data-ef="'+id.slice(3)+'"><option value="">전체</option>'+Object.keys(o).sort().map(function(x){return '<option'+(x===v?' selected':'')+'>'+esc(x)+'</option>';}).join('')+'</select></label>';}
  var p='<div class="panel"><h2>강사 · 교육 업체 찾기</h2><div class="form">'+opt('ef_lang','응대 언어',langs,f.lang)+opt('ef_org','소속 단체',orgs,f.org)+opt('ef_ctry','나라',cs,f.ctry)+'<label class="ck" for="ef_price"><input id="ef_price" type="checkbox"'+(f.price?' checked':'')+'>가격을 공개한 곳만</label></div>'+(state.pb2?(R.length?'<div class="list" style="margin-top:10px">'+R.map(function(b){var s=spot(b.spot)||{};return item({href:'#biz-d'+b.id,av:true,tags:[[b.biz_type,'ok']].concat((b.orgs||[]).slice(0,2).map(function(o){return [o,'gray'];})),t:esc(b.name),s:(s.name||'')+(s.country?' · '+s.country:'')+((b.langs||[]).length?' · '+esc(b.langs.join('·')):''),r:esc(b.price||'')});}).join('')+'</div>':'<p class="empty">조건에 맞는 강사가 아직 없어요. 필터를 줄여 보세요.</p>'):'<p class="empty">불러오는 중이에요.</p>')+'<p class="small" style="margin:8px 0 0">심사를 통과한 강사·교육 업체만 보여요. 리조트 소속 강사는 각 업체 페이지에 나와요.</p></div>';
  var i0=h.indexOf('<div class="panel"><h2>강사 찾기</h2>');if(i0<0)return h+p;var i1=h.indexOf('</p></div>',i0);return h.slice(0,i0)+p+h.slice(i1+10);};

/* ---------- 132 렌탈 가격 비교 (포인트) ---------- */
var _spot5=V.spot;V.spot=function(id){var h=_spot5(id),s=spot(state.sel);if(!s||!BE.on)return h;var L=pb2().filter(function(b){return b.spot===s.id;}),rows=[];
  L.forEach(function(b){(b.price_list||[]).forEach(function(x){if(/렌탈|대여|rent/i.test(x.n||''))rows.push([b,x]);});});
  if(!rows.length)return h;var p='<div class="panel"><h2>렌탈 가격 비교</h2><div class="list">'+rows.map(function(r){return item({href:'#biz-d'+r[0].id,t:esc(r[1].n),s:esc(r[0].name),r:esc(r[1].p)});}).join('')+'</div><p class="small" style="margin:8px 0 0">입점 업체가 올린 가격표 기준이에요.</p></div>';
  return h.replace('<div class="panel" id="obsBox">',p+'<div class="panel" id="obsBox">');};

/* ---------- 126 찜 · 가격 내림 · 129 정비점 · 136 설명서 ---------- */
state.wish=LS.get('wish',{});
var MAN={'scubapro':'https://www.scubapro.com','aqualung':'https://www.aqualung.com','aqua lung':'https://www.aqualung.com','apeks':'https://www.apeksdiving.com','mares':'https://www.mares.com','shearwater':'https://shearwater.com/pages/support','suunto':'https://www.suunto.com/support/','garmin':'https://support.garmin.com','cressi':'https://www.cressi.com','atomic':'https://www.atomicaquatics.com','tusa':'https://www.tusa.com','oceanic':'https://www.oceanicworldwide.com','hollis':'https://www.hollis.com','zeagle':'https://www.zeagle.com','halcyon':'https://www.halcyon.net','xdeep':'https://www.xdeep.eu','gull':'https://www.gull.jp','bare':'https://www.baresports.com','sherwood':'https://www.sherwoodscuba.com','bauer':'https://www.bauer-kompressoren.de'};
function manLink(brand){var b=String(brand||'').toLowerCase();for(var k in MAN)if(b.indexOf(k)>=0)return MAN[k];return null;}
var _item5=V.item;V.item=function(i){var h=_item5(i);if(String(i).charAt(0)!=='d')return h;var id=String(i).slice(1),x=(state.pubItems||[]).filter(function(y){return String(y.id)===id;})[0];if(!x)return h;var w=state.wish[id];
  var btn='<button class="chip" type="button" data-wish="'+id+'" data-p="'+(+x.price||0)+'" aria-pressed="'+!!w+'">'+(w?'♥ 찜함':'♡ 찜하기')+'</button>';
  var ml=manLink(x.brand||x.title);
  return h.replace('</h1>','</h1>').replace(/(<b style="font-size:22px;color:var\(--sea\)">)/,btn+' $1')+(ml?'<div class="panel"><h2>설명서 · 정비 매뉴얼</h2><p style="margin:0"><a href="'+ml+'" target="_blank" rel="noopener">제조사 지원 페이지 열기</a></p><p class="small" style="margin:6px 0 0">모델명으로 설명서와 리콜·안전 공지를 찾을 수 있어요.</p></div>':'');};
var _gear5=V.gear;V.gear=function(){var h=_gear5(),W=Object.keys(state.wish),P=state.pubItems||[];
  var wl=W.map(function(id){var x=P.filter(function(y){return String(y.id)===id;})[0];if(!x)return '';var old=state.wish[id].p,now=+x.price||0;return item({href:'#item-d'+id,tags:now<old?[['가격 내림 '+(old-now).toLocaleString()+'원','ok']]:x.sold?[['판매 완료','gray']]:[],t:esc(x.title),s:'찜할 때 '+(+old).toLocaleString()+'원',r:now.toLocaleString()+'원'});}).join('');
  var rep=pb2().filter(function(b){return /정비/.test(b.biz_type)||(b.services||[]).some(function(s){return /정비/.test(s);});});
  var brands={};(state.gearL||[]).forEach(function(g){var l=manLink(g.brand);if(l)brands[g.brand]=l;});
  var p=(wl?'<div class="panel"><h2>찜한 물건</h2><div class="list">'+wl+'</div><p class="small" style="margin:8px 0 0">찜한 뒤 값이 내려가면 여기 표시돼요.</p></div>':'')+
    '<div class="cols"><div class="panel"><h2>정비점 · 수리 센터</h2>'+(rep.length?'<div class="list">'+rep.map(function(b){var s=spot(b.spot)||{};return item({href:'#biz-d'+b.id,tags:[['입점','ok']],t:esc(b.name),s:(s.name||'')+(s.country?' · '+s.country:''),r:esc(b.price||'')});}).join('')+'</div>':'<p class="empty">아직 입점한 정비점이 없어요.</p>')+'<p style="margin:8px 0 0"><a href="https://www.google.com/maps/search/scuba+regulator+service" target="_blank" rel="noopener">내 주변 정비점 지도에서 찾기</a></p></div>'+
    '<div class="panel"><h2>설명서 · 리콜 공지</h2><div class="list">'+(Object.keys(brands).length?Object.keys(brands).map(function(k){return item({t:esc(k),s:'내 장비 브랜드',r:'<a href="'+brands[k]+'" target="_blank" rel="noopener">지원 페이지</a>'});}).join(''):['Scubapro','Aqualung','Mares','Apeks','Shearwater','Suunto','Garmin','Cressi'].map(function(k){return item({t:k,r:'<a href="'+manLink(k)+'" target="_blank" rel="noopener">지원 페이지</a>'});}).join(''))+'</div><p class="small" style="margin:8px 0 0">리콜·안전 공지는 제조사 지원 페이지에서 모델명이나 일련번호로 확인해요.</p></div></div>'+adSlot('gear');
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};

/* ---------- 191-193 광고 ---------- */
state.ads=null;
function adsLoad(){if(state.ads||!BE.on||adsLoad.b)return;adsLoad.b=1;BE.sb.from('ads').select('id,title,image,link,region,owner,status,starts,ends').eq('status','approved').limit(50).then(function(r){adsLoad.b=0;var t=new Date().toISOString().slice(0,10);state.ads=(r.data||[]).filter(function(a){return a.starts<=t&&a.ends>=t;});if(state.ads.length&&/^(gear|resorts|map)$/.test(cur()))rerender();});}
function adSlot(where,region){if(!BE.on)return '';adsLoad();var A=(state.ads||[]).filter(function(a){return !region||!a.region||a.region===region;});if(!A.length)return '';var a=A[Math.floor((Date.now()/6e4)%A.length)];adSlot.shown=adSlot.shown||{};if(!adSlot.shown[a.id+where]){adSlot.shown[a.id+where]=1;BE.sb.rpc('ad_hit',{aid:a.id,is_click:false}).then(function(){});}
  return '<a class="panel adslot" href="'+esc(a.link)+'" target="_blank" rel="noopener sponsored" data-adclick="'+a.id+'"><span class="adtag">광고</span>'+(a.image?'<img src="'+esc(pubUrl(a.image))+'" alt="">':'')+'<span class="tx"><b>'+esc(a.title)+'</b><span class="small">'+esc(a.region||'전 지역')+' · 스폰서</span></span></a>';}
var _resorts5=V.resorts;V.resorts=function(){var h=_resorts5();var k=h.lastIndexOf('<div class="foot">');var a=adSlot('resorts');return k<0?h+a:h.slice(0,k)+a+h.slice(k);};
state.myAds=null;
V.ads=function(){setTitle('광고 집행');if(!BE.on||!BE.user)return '<div class="vh"><div><h1>광고 집행</h1><p>로그인하면 광고를 신청하고 성과를 볼 수 있어요.</p></div><a class="btn btn-pri" href="#login">로그인</a></div>';
  if(!state.myAds&&!V.ads.b){V.ads.b=1;BE.sb.from('ads').select('*').eq('owner',BE.user.id).order('created_at',{ascending:false}).then(function(r){V.ads.b=0;state.myAds=r.data||[];if(cur()==='ads')rerender();});}
  var t=new Date().toISOString().slice(0,10),ST={pending:['심사 중','gray'],approved:['집행 중','ok'],rejected:['반려','fr'],ended:['종료','gray']};
  var regions=['전 지역'].concat(Object.keys(SPOTS.reduce(function(o,s){o[s.region]=1;return o;},{})));
  return '<div class="vh"><div><a class="small" href="#partner">← 입점 · 광고</a><h1>광고 집행</h1><p>기간·지역·예산을 정해 신청하면 운영자 확인 뒤 노출돼요. 광고는 \'광고\' 표시와 함께 리조트·장비 화면에 나와요.</p></div></div>'+
  '<form class="panel form" id="adForm" novalidate><h2 style="grid-column:1/-1;margin:0">새 광고 신청</h2><label for="ad_t" style="grid-column:1/-1">문구 (2~60자)<input id="ad_t" maxlength="60" placeholder="예: 아닐라오 11월 펀다이빙 10% 할인"></label><label for="ad_l" style="grid-column:1/-1">연결할 주소 (https://)<input id="ad_l" type="url" placeholder="https://"></label><label for="ad_r">지역<select id="ad_r">'+regions.map(function(r){return '<option>'+r+'</option>';}).join('')+'</select></label><label for="ad_b">예산 (원)<input id="ad_b" type="number" inputmode="numeric" min="0" step="10000" value="200000"></label><label for="ad_s">시작일<input id="ad_s" type="date" min="'+t+'" value="'+t+'"></label><label for="ad_e">종료일<input id="ad_e" type="date" min="'+t+'"></label><label for="ad_i" style="grid-column:1/-1">이미지 (선택, 2MB 이하)<input id="ad_i" type="file" accept="image/*"></label><div style="grid-column:1/-1"><button class="btn btn-pri" type="submit">광고 신청</button></div><p class="small" style="grid-column:1/-1;margin:0">결제는 아직 온라인으로 받지 않아요. 승인되면 운영자가 청구서를 보내요. 광고는 검색·추천 순위를 바꾸지 않아요.</p></form>'+
  '<div class="panel"><h2>내 광고</h2>'+(state.myAds?(state.myAds.length?'<div class="list">'+state.myAds.map(function(a){var s=ST[a.status]||ST.pending;if(a.status==='approved'&&a.ends<t)s=ST.ended;return item({tags:[s],t:esc(a.title),s:a.starts+' ~ '+a.ends+' · '+esc(a.region||'전 지역')+' · 예산 '+(+a.budget_krw||0).toLocaleString()+'원',r:'노출 '+(+a.impressions).toLocaleString()+' · 클릭 '+(+a.clicks).toLocaleString()+(a.impressions?' ('+(a.clicks/a.impressions*100).toFixed(1)+'%)':'')});}).join('')+'</div>':'<p class="empty">신청한 광고가 없어요.</p>'):'<p class="empty">불러오는 중이에요.</p>')+'</div>';};
var _partner5=V.partner;V.partner=function(){var h=_partner5();
  var sum='<div class="panel"><h2>한눈에 보기</h2><div class="list">'+item({t:'다이버',r:'모든 기능 무료'})+item({t:'업체 입점',s:'입점비·월 요금 없음',r:'예약이 생길 때만 7%'})+item({t:'처음 6개월',r:'3%'})+item({t:'리브어보드 · 정비 예약',r:'5% · 3%'})+item({t:'프로 (선택)',s:'월 4,900원 · 통계 · 후기 답글 · 다국어',r:'6%'})+'</div><p class="small" style="margin:8px 0 0">아래 건당 옵션과 할인은 필요할 때만 보세요. 모두 VAT 별도예요.</p><a class="btn btn-line" href="#ads" style="margin-top:10px">광고 신청하기</a></div>';
  h=h.replace('<div class="panel"><h2>건당 옵션</h2>','<details class="panel"><summary><b>건당 옵션 보기</b></summary>').replace('<div class="panel"><h2>차등 할인</h2>','</details><details class="panel"><summary><b>할인 조건 보기</b></summary>').replace('<div class="panel"><h2>광고 상품</h2>','</details><div class="panel"><h2>광고 상품</h2>');
  /* 원래 '건당 옵션'·'차등 할인' 패널의 닫는 </div> 두 개를 details 쪽으로 옮김 */
  h=h.replace(/<\/div><\/details><details class="panel">/,'</details><details class="panel">').replace(/<\/div><\/details><div class="panel"><h2>광고 상품/,'</details><div class="panel"><h2>광고 상품');
  var k=h.indexOf('<div class="big">');return k<0?sum+h:h.slice(0,k)+sum+h.slice(k);};

/* ---------- 210 모임 단체 채팅 ---------- */
state.mchat={};
function mchatLoad(id){if(mchatLoad.b)return;mchatLoad.b=1;BE.sb.from('meetup_messages').select('*').eq('meetup_id',id).order('created_at',{ascending:true}).limit(300).then(function(r){mchatLoad.b=0;var old=state.mchat[id];state.mchat[id]=r.data||[];if(cur()==='meet'&&(!old||old.length!==state.mchat[id].length)){rerender();var c=document.querySelector('.chatlog');if(c)c.scrollTop=c.scrollHeight;}});}
var _meet5=V.meet;V.meet=function(i){var h=_meet5(i);if(String(i).charAt(0)!=='d'||!BE.on||!BE.user)return h;var id=+String(i).slice(1),x=(state.pubMeets||[]).filter(function(y){return y.id===id;})[0];if(!x)return h;
  var M=(state.mem&&state.mem[id])||[],isIn=x.owner===BE.user.id||M.some(function(m){return m.user_id===BE.user.id;});
  if(!isIn)return h+'<div class="panel"><h2>참가자 채팅</h2><p class="empty" style="margin:0">참가하면 다른 참가자와 대화할 수 있어요.</p></div>';
  if(!state.mchat[id])mchatLoad(id);var C=state.mchat[id]||[];
  return h+'<div class="panel"><h2>참가자 채팅 <span class="small">'+C.length+'개</span></h2><div class="chatlog" aria-live="polite">'+(C.length?C.map(function(m){var me=m.sender===BE.user.id;return '<div class="m'+(me?' me':'')+'"><small>'+esc(me?'나':(m.nick||'참가자'))+' · '+m.created_at.slice(5,16).replace('T',' ')+'</small>'+esc(m.body)+(me?' <button class="chip" type="button" data-mcdel="'+m.id+'" data-mid="'+id+'" style="padding:0 6px;font-size:11px">지우기</button>':'')+'</div>';}).join(''):'<p class="empty" style="margin:0">첫 인사를 남겨 보세요.</p>')+'</div><form class="form" id="mcForm" data-mid="'+id+'" style="grid-template-columns:minmax(0,1fr) auto;align-items:end;margin-top:8px"><label for="mc_b">메시지<input id="mc_b" maxlength="1000" autocomplete="off" placeholder="집결 시간, 장비, 카풀"></label><button class="btn btn-pri" type="submit">보내기</button></form><p class="small" style="margin:6px 0 0">참가자와 모임장만 볼 수 있어요. 연락처는 꼭 필요할 때만 남겨 주세요.</p></div>';};
setInterval(function(){if(document.hidden||!BE.on||!BE.user||cur()!=='meet')return;var m=(location.hash||'').match(/meet-d(\d+)/);if(m&&state.mchat[+m[1]])mchatLoad(+m[1]);},15000);

/* ---------- 219 이용 완료 → 후기 ---------- */
var _bookings6=V.bookings;V.bookings=function(){var h=_bookings6();if(!state.myBook)return h;state.myBook.forEach(function(b){if(b.status==='done'&&b.business_id)h=h.replace('data-bkcancel="'+b.id+'"','data-bkcancel="'+b.id+'"');});
  return h.replace(/<span class="small">([^<]*)부터 (\d+)박/g,function(m){return m;})+((state.myBook||[]).some(function(b){return b.status==='done'&&b.user_id===(BE.user&&BE.user.id);})?'<div class="panel"><h2>다녀온 곳 후기 남기기</h2><div class="list">'+state.myBook.filter(function(b){return b.status==='done'&&b.user_id===BE.user.id;}).map(function(b){var biz=b.businesses||{};return item({href:'#biz-d'+b.business_id,t:esc(biz.name||'업체'),s:esc(b.date_from)+' 이용',r:'후기 쓰기'});}).join('')+'</div><p class="small" style="margin:8px 0 0">후기는 업체 평점과 리조트 목록에 반영돼요.</p></div>':'');};

/* ---------- 폼: 146 우편번호 · 157 측정 · 158 미리보기 · 162 기존 센터 불러오기 ---------- */
function fev(form,step){if(!BE.on)return;try{var k='fe'+form+step;if(step==='open'){if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,1);}}catch(e){}BE.sb.from('form_events').insert({form:form,step:step}).then(function(){});}
var PREV={biz:function(v){var s=spot(v.spot)||{};return '<h3>'+esc(v.name||'업체 이름')+'</h3><p class="small" style="margin:0">'+esc(v.type||'')+(s.name?' · '+s.name:'')+'</p><p style="white-space:pre-wrap;margin:8px 0">'+esc(v.intro||'소개 글이 여기 보여요')+'</p><div class="chips">'+(v.svc||[]).map(function(x){return '<span class="chip" style="cursor:default">'+esc(x)+'</span>';}).join('')+'</div>';},
  sell:function(v){return '<h3>'+esc(v.title||'제목')+'</h3><p class="small" style="margin:0">'+esc(v.cat||'')+' · '+esc(v.brand||'')+'</p><b style="color:var(--sea)">'+(+v.price||0).toLocaleString()+'원</b><p style="white-space:pre-wrap;margin:8px 0 0">'+esc(v.desc||'')+'</p>';},
  meet:function(v){var s=spot(v.spot)||{};return '<h3>'+esc(v.title||'모임 이름')+'</h3><p class="small" style="margin:0">'+esc(v.kind||'')+(s.name?' · '+s.name:'')+(v.date?' · '+esc(v.date):'')+'</p><p style="white-space:pre-wrap;margin:8px 0 0">'+esc(v.desc||'')+'</p>';}};
var _formView5=formView;formView=function(id){var h=_formView5(id),F=FORMS[id],st=fstate(id),last=st.step===F.steps.length-1;fev(id,'open');
  if(last&&PREV[id])h=h.replace('<form class="panel form" data-form="'+id+'" novalidate>','<div class="panel"><h2>공개될 모습 미리보기</h2><div class="prev">'+PREV[id](st.v)+'</div><p class="small" style="margin:8px 0 0">고칠 곳이 있으면 \'이전\'으로 돌아가요.</p></div><form class="panel form" data-form="'+id+'" novalidate>');
  if(id==='biz'&&st.step===0)h=h.replace('<form class="panel form" data-form="biz" novalidate>','<div class="panel"><h2>지도에 이미 있는 센터인가요?</h2><div class="form" style="grid-template-columns:minmax(0,1fr) auto;align-items:end"><label for="osmq">센터 이름으로 찾기<input id="osmq" placeholder="예: Blue Corner" autocomplete="off"></label><button class="btn btn-line" type="button" id="osmGo">찾기</button></div><div id="osmRes"></div><p class="small" style="margin:6px 0 0">OpenStreetMap에 있는 다이빙 센터 7,600여 곳에서 찾아 이름과 가까운 포인트를 채워요.</p></div><form class="panel form" data-form="biz" novalidate>');
  if(id==='biz'&&/addr/.test(h))h=h.replace(/(<input id="f_biz_addr"[^>]*>)/,'$1<button class="chip" type="button" id="kpost" style="margin-top:6px;align-self:flex-start">국내 주소 검색</button>');
  return h;};
function osmFind(){var q=val('osmq').toLowerCase(),el=sel('osmRes');if(!el)return;if(q.length<2){el.innerHTML='<p class="small">두 글자 이상 적어 주세요.</p>';return;}
  function go(){var R=(DB.sites||[]).filter(function(x){return x[3]===0&&String(x[2]).toLowerCase().indexOf(q)>=0;}).slice(0,8);
    el.innerHTML=R.length?'<div class="list">'+R.map(function(x,i){var n=nearSpot(x[1],x[0]);return '<div class="item"><span class="tx"><b>'+esc(x[2])+'</b><span>'+(n?'가까운 포인트: '+n.name+' · '+n.country:'')+'</span></span><button class="chip" type="button" data-osmpick="'+esc(x[2])+'" data-sp="'+(n?n.id:'')+'">불러오기</button></div>';}).join('')+'</div>':'<p class="small">찾지 못했어요. 직접 입력해 주세요.</p>';}
  if(DB.sites)return go();el.innerHTML='<p class="small">센터 목록을 불러오는 중이에요.</p>';fetch('/assets/sites.json').then(function(r){return r.json();}).then(function(d){DB.sites=d;go();}).catch(function(){el.innerHTML='<p class="small">목록을 불러오지 못했어요.</p>';});}
function nearSpot(lat,lon){var best=null,bd=1e9;SPOTS.forEach(function(s){var d=Math.pow(s.lat-lat,2)+Math.pow((s.lon-lon)*Math.cos(lat*Math.PI/180),2);if(d<bd){bd=d;best=s;}});return bd<1.5?best:null;}
function kpost(){function open(){new window.daum.Postcode({oncomplete:function(d){var st=fstate('biz');st.v.addr=(d.roadAddress||d.jibunAddress||'')+(d.zonecode?' ('+d.zonecode+')':'');rerender();toast('주소를 넣었어요. 상세 주소를 이어서 적어 주세요.');}}).open();}
  if(window.daum&&window.daum.Postcode)return open();var s=document.createElement('script');s.src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';s.onload=open;s.onerror=function(){toast('주소 검색을 열지 못했어요. 직접 적어 주세요.');};document.head.appendChild(s);}
document.addEventListener('submit',function(e){var f=e.target;if(f.matches&&f.matches('form[data-form]')){var id=f.dataset.form,F=FORMS[id],st=fstate(id);if(F&&st.step===F.steps.length-1)fev(id,'submit');}},true);

/* 관리자: 광고 심사 · 폼 제출 지표 */
state.admAds=null;state.admFev=null;
var _adm5=V.admin;V.admin=function(){var h=_adm5();if(!BE.on||!state.me||!state.me.admin)return h;
  if(!state.admAds&&!V.admin.b5){V.admin.b5=1;BE.sb.from('ads').select('*').order('created_at',{ascending:false}).limit(100).then(function(r){state.admAds=r.data||[];if(cur()==='admin')rerender();});
    BE.sb.from('form_events').select('form,step').gte('created_at',new Date(Date.now()-30*864e5).toISOString()).limit(10000).then(function(r){var c={};(r.data||[]).forEach(function(x){c[x.form]=c[x.form]||{open:0,submit:0};c[x.form][x.step]=(c[x.form][x.step]||0)+1;});state.admFev=c;if(cur()==='admin')rerender();});}
  var A=state.admAds||[],F=state.admFev||{};
  var p='<div class="panel"><h2>광고 심사</h2>'+(A.length?'<div class="list">'+A.map(function(a){return '<div class="item"><span class="tx"><span>'+esc(a.status)+' · '+a.starts+'~'+a.ends+' · '+esc(a.region||'전 지역')+' · '+(+a.budget_krw||0).toLocaleString()+'원</span><b>'+esc(a.title)+'</b><span>'+esc(a.link)+' · 노출 '+a.impressions+' · 클릭 '+a.clicks+'</span></span>'+(a.status==='pending'?'<button class="chip" type="button" data-adok="'+a.id+'">승인</button><button class="chip" type="button" data-adno="'+a.id+'">반려</button>':a.status==='approved'?'<button class="chip" type="button" data-adno="'+a.id+'">내리기</button>':'')+'</div>';}).join('')+'</div>':'<p class="empty">신청된 광고가 없어요.</p>')+'</div>'+
    '<div class="panel"><h2>폼 완료율 <span class="small">최근 30일</span></h2>'+(Object.keys(F).length?'<div class="list">'+Object.keys(F).map(function(k){var o=F[k];return item({t:esc((FORMS[k]&&FORMS[k].title)||k),s:'열람 '+o.open+' · 제출 '+o.submit,r:o.open?Math.round(o.submit/o.open*100)+'%':'—'});}).join('')+'</div>':'<p class="empty">아직 기록이 없어요.</p>')+'</div>';
  var k=h.lastIndexOf('<div class="foot">');return k<0?h+p:h.slice(0,k)+p+h.slice(k);};

/* ---------- 이벤트 ---------- */
document.addEventListener('change',function(e){var t=e.target;if(t.dataset&&t.dataset.ef!==undefined&&t.id.indexOf('ef_')===0){state.ef[t.id.slice(3)]=t.value;rerender();}else if(t.id==='ef_price'){state.ef.price=t.checked;rerender();}});
document.addEventListener('click',function(e){var t=e.target.closest('[data-stjoin],[data-stleave],[data-stok],[data-stno],[data-bpause],[data-bpar],[data-brdel],[data-wish],[data-adclick],[data-adok],[data-adno],[data-mcdel],[data-osmpick],#osmGo,#kpost');if(!t)return;var d=t.dataset;
  function done(msg,fn){return function(r){if(r&&r.error){toast('처리하지 못했어요: '+r.error.message);t.disabled=false;return;}if(fn)fn();if(msg)toast(msg);rerender();};}
  if(t.id==='osmGo'){osmFind();return;}
  if(t.id==='kpost'){e.preventDefault();kpost();return;}
  if(d.osmpick){var st=fstate('biz');st.v.name=d.osmpick;if(d.sp)st.v.spot=d.sp;rerender();toast('이름'+(d.sp?'과 포인트를':'을')+' 채웠어요');return;}
  if(d.adclick){BE.sb.rpc('ad_hit',{aid:+d.adclick,is_click:true}).then(function(){});return;}
  if(!BE.user&&!d.wish)return needLogin('로그인 후에 쓸 수 있어요');t.disabled=true;
  if(d.stjoin)return BE.sb.from('biz_staff').insert({business_id:+d.stjoin,user_id:BE.user.id,nick:myNick()}).then(done('소속 신청을 보냈어요',function(){delete state.staff[+d.stjoin];}));
  if(d.stleave)return BE.sb.from('biz_staff').delete().eq('business_id',+d.stleave).eq('user_id',BE.user.id).then(done('정리했어요',function(){delete state.staff[+d.stleave];}));
  if(d.stok)return BE.sb.from('biz_staff').update({status:'ok'}).eq('business_id',+d.stok).eq('user_id',d.u).then(done('승인했어요',function(){delete state.staff[+d.stok];}));
  if(d.stno)return BE.sb.from('biz_staff').delete().eq('business_id',+d.stno).eq('user_id',d.u).then(done('정리했어요',function(){delete state.staff[+d.stno];}));
  if(d.bpause)return BE.sb.from('businesses').update({paused:d.v==='1'}).eq('id',+d.bpause).then(done(d.v==='1'?'일시정지했어요. 예약 요청을 받지 않아요':'운영을 다시 시작했어요',function(){delete state.bizX[+d.bpause];state.pb2=null;}));
  if(d.bpar){var v=val('bpar');return BE.sb.from('businesses').update({parent_id:v?+v:null}).eq('id',+d.bpar).then(done('저장했어요',function(){delete state.bizX[+d.bpar];}));}
  if(d.brdel)return BE.sb.from('biz_reviews').delete().eq('id',+d.brdel).then(done('후기를 지웠어요',function(){state.brv={};}));
  if(d.wish){var id=d.wish;if(state.wish[id])delete state.wish[id];else state.wish[id]={p:+d.p,t:Date.now()};LS.set('wish',state.wish);toast(state.wish[id]?'찜했어요. 값이 내려가면 장비 화면에 표시돼요':'찜을 풀었어요');rerender();return;}
  if(d.adok)return BE.sb.from('ads').update({status:'approved'}).eq('id',+d.adok).then(done('승인했어요',function(){state.admAds=null;V.admin.b5=0;state.ads=null;}));
  if(d.adno)return BE.sb.from('ads').update({status:'rejected'}).eq('id',+d.adno).then(done('반려했어요',function(){state.admAds=null;V.admin.b5=0;state.ads=null;}));
  if(d.mcdel)return BE.sb.from('meetup_messages').delete().eq('id',+d.mcdel).then(done('',function(){delete state.mchat[+d.mid];}));
});
document.addEventListener('submit',function(e){var f=e.target;if(!f.id&&!f.dataset.brep)return;
  if(f.id==='brForm'){e.preventDefault();if(!BE.user)return needLogin('후기는 로그인 후에 쓸 수 있어요');var b=+f.dataset.bid;f.querySelector('button').disabled=true;BE.sb.from('biz_reviews').insert({business_id:b,owner:BE.user.id,nick:myNick(),rating:+val('br_r'),body:val('br_b')||null}).then(function(r){if(r.error){toast(/unique|duplicate/.test(r.error.message)?'이미 후기를 남겼어요':'남기지 못했어요');f.querySelector('button').disabled=false;return;}delete state.brv[b];toast('후기를 남겼어요');rerender();});return;}
  if(f.dataset.brep){e.preventDefault();var v=f.querySelector('input').value.trim();BE.sb.from('biz_reviews').update({reply:v||null}).eq('id',+f.dataset.brep).then(function(r){if(r.error){toast('저장하지 못했어요');return;}state.brv={};toast('답글을 저장했어요');rerender();});return;}
  if(f.id==='mcForm'){e.preventDefault();var mid=+f.dataset.mid,b=val('mc_b');if(!b)return;f.querySelector('button').disabled=true;BE.sb.from('meetup_messages').insert({meetup_id:mid,sender:BE.user.id,nick:myNick(),body:b}).select('id').then(function(r){if(r.error){toast('보내지 못했어요');f.querySelector('button').disabled=false;return;}if(r.data&&r.data[0])pushNote('meetup',r.data[0].id);mchatLoad(mid);});return;}
  if(f.id==='adForm'){e.preventDefault();var ti=val('ad_t'),li=val('ad_l'),s=val('ad_s'),en=val('ad_e'),fi=sel('ad_i').files[0];
    if(ti.length<2)return toast('문구를 2자 이상 적어 주세요');if(!/^https:\/\//.test(li))return toast('연결 주소는 https:// 로 시작해야 해요');if(!s||!en||en<s)return toast('기간을 확인해 주세요');if(fi&&fi.size>2*1024*1024)return toast('이미지는 2MB 이하로 올려 주세요');
    f.querySelector('button[type=submit]').disabled=true;var go=function(path){BE.sb.from('ads').insert({owner:BE.user.id,title:ti,link:li,region:val('ad_r')==='전 지역'?null:val('ad_r'),budget_krw:+val('ad_b')||0,starts:s,ends:en,image:path||null}).then(function(r){if(r.error){toast('신청하지 못했어요: '+r.error.message);f.querySelector('button[type=submit]').disabled=false;return;}state.myAds=null;toast('광고를 신청했어요. 확인 뒤 알려드릴게요');rerender();});};
    if(fi)upload('media',fi,fi.name).then(go).catch(function(){toast('이미지를 올리지 못했어요');f.querySelector('button[type=submit]').disabled=false;});else go(null);return;}
});
var _after5=after;after=function(){_after5();if(cur()==='biz')sigInit();};
