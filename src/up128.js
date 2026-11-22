/* ================= 128: 기기별 로그 한 번에 올리기 — 따라하기 예시 ================= */
/* 화면 예시는 실제 앱을 단순하게 그린 그림이에요 (로고 없음) */
function dgPhone128(kind,o){o=o||{};var dark=o.dark,top=o.top||'',body='';
  if(kind==='tabs')body='<div class="dgsp"></div><div class="dgtabs">'+o.items.map(function(x,i){return '<span'+(i===o.hl?' class="hl"':'')+'>'+x+'</span>';}).join('')+'</div>';
  else if(kind==='list')body='<div class="dglist">'+o.items.map(function(x,i){return '<span'+(i===o.hl?' class="hl"':'')+'>'+x+'</span>';}).join('')+'</div>';
  else if(kind==='share')body='<div class="dgsp"></div><div class="dgshare"><div class="dgsi">'+['AirDrop','메시지','메일'].map(function(x){return '<i>'+x+'</i>';}).join('')+'</div><span class="hl">'+(o.label||'파일에 저장')+'</span><span>복사하기</span></div>';
  else if(kind==='drop')body='<div class="dgdrop"><b>Dive the deep ocean</b><span class="hl">파일 고르기</span><small>'+(o.file||'')+'</small></div>';
  else if(kind==='web')body='<div class="dgweb"><i>'+(o.url||'')+'</i>'+o.items.map(function(x,i){return '<span'+(i===o.hl?' class="hl"':'')+'>'+x+'</span>';}).join('')+'</div>';
  return '<div class="dgph'+(dark?' dk':'')+'"><div class="dgtop">'+top+'</div>'+body+'</div>';}
var DG128=[
 {k:'sw',n:'쉐어워터',d:'Perdix · Teric · Peregrine · Tern',f:'.db 파일 하나로 전부',tip:'모든 다이브가 파일 하나로 한 번에 들어와요. 이미 올린 다이브는 자동으로 빠져요.',
  s:[[dgPhone128('tabs',{dark:1,top:'Shearwater Cloud',items:['다이빙','통계','연결','프로필','더 보기'],hl:3}),'Shearwater Cloud 앱 아래쪽 <b>프로필</b>을 눌러요. 다이브는 먼저 블루투스로 받아 둬요.'],
     [dgPhone128('list',{dark:1,top:'Profile',items:['권한','내보내기 (*.db)','다른 계정에서 가져오기','로그아웃'],hl:1}),'<b>내보내기 (*.db)</b>를 눌러요.'],
     [dgPhone128('share',{label:'파일에 저장'}),'공유 창에서 <b>파일에 저장</b>을 골라요. 안드로이드는 <b>내 파일</b>이나 드라이브에 저장해요.'],
     [dgPhone128('drop',{file:'shearwater.db'}),'여기서 <b>파일 고르기</b> → 방금 저장한 .db 파일을 골라요. 미리 보고 저장하면 끝.']]},
 {k:'gm',n:'가민',d:'Descent Mk2 · Mk3 · G1 · X50i',f:'다이브마다 zip 파일',tip:'휴대폰 Garmin Connect 앱에는 원본 내보내기가 없어서 컴퓨터 브라우저로 해요. zip을 여러 개 한 번에 골라도 돼요.',
  s:[[dgPhone128('web',{url:'connect.garmin.com',items:['활동','다이브 · 문섬 18m','다이브 · 범섬 22m','수영'],hl:1}),'컴퓨터 브라우저로 Garmin Connect에 로그인해서 <b>다이브 활동</b>을 열어요.'],
     [dgPhone128('web',{url:'⚙ 메뉴',items:['편집','원본 내보내기','GPX로 내보내기','삭제'],hl:1}),'오른쪽 위 <b>톱니바퀴 → 원본 내보내기</b>를 눌러요. zip 파일이 받아져요.'],
     [dgPhone128('drop',{file:'123456789.zip'}),'받은 zip을 압축 풀지 말고 그대로 올려요. 안의 FIT 파일을 읽어요.']]},
 {k:'aw',n:'애플워치',d:'Ultra · Oceanic+ · 수심 앱',f:'건강 앱 export.zip',tip:'수심 기록과 수온만 읽고, 다른 건강 정보는 저장하지 않아요. 파일이 크면 1~2분 걸릴 수 있어요.',
  s:[[dgPhone128('list',{top:'건강',items:['요약','오른쪽 위 내 사진 ●','공유','둘러보기'],hl:1}),'아이폰 <b>건강</b> 앱을 열고 오른쪽 위 <b>내 사진</b>을 눌러요.'],
     [dgPhone128('list',{top:'건강 프로필',items:['건강 기록','앱','개인정보','모든 건강 데이터 내보내기'],hl:3}),'맨 아래 <b>모든 건강 데이터 내보내기</b> → 내보내기를 눌러요.'],
     [dgPhone128('share',{label:'파일에 저장'}),'다 만들어지면 <b>파일에 저장</b>을 골라요.'],
     [dgPhone128('drop',{file:'export.zip'}),'여기서 <b>파일 고르기</b> → export.zip을 골라요.']]},
 {k:'su',n:'순토',d:'Ocean · D5 · EON',f:'다이브마다 FIT 파일',tip:'다이브마다 파일이 하나씩이라, 저장해 둔 FIT 파일을 여러 개 한 번에 골라 올리면 돼요. 예전 기기는 PC의 DM5에서 UDDF로 내보내요.',
  s:[[dgPhone128('list',{top:'Suunto',items:['오늘','다이브 · 문섬','다이브 · 섶섬','달리기'],hl:1}),'Suunto 앱에서 올릴 <b>다이브 기록</b>을 열어요.'],
     [dgPhone128('list',{top:'⋯ 메뉴',items:['수정','공유','FIT 파일 내보내기','삭제'],hl:2}),'오른쪽 위 <b>⋯ → FIT 파일 내보내기</b>를 눌러요. 앱 버전에 따라 공유 안에 있어요.'],
     [dgPhone128('drop',{file:'dive.fit'}),'파일에 저장한 뒤 여기서 <b>파일 고르기</b>로 올려요.']]},
 {k:'et',n:'기타',d:'Mares · Cressi · Aqualung · Oceanic · Scubapro',f:'Subsurface로 UDDF',tip:'Subsurface는 무료 PC 프로그램이에요. 대부분의 다이브 컴퓨터를 케이블이나 블루투스로 읽어요.',
  s:[[dgPhone128('web',{url:'subsurface-divelog.org',items:['다운로드','Windows','macOS','Linux'],hl:1}),'PC에 무료 프로그램 <b>Subsurface</b>를 깔아요.'],
     [dgPhone128('web',{url:'가져오기 메뉴',items:['다이브 컴퓨터에서 가져오기','로그 파일 가져오기','클라우드'],hl:0}),'다이브 컴퓨터를 연결하고 <b>다이브 컴퓨터에서 가져오기</b>로 읽어요.'],
     [dgPhone128('web',{url:'파일 → 내보내기',items:['UDDF','CSV','HTML'],hl:0}),'<b>파일 → 내보내기 → UDDF</b>로 저장해요.'],
     [dgPhone128('drop',{file:'dives.uddf'}),'여기서 <b>파일 고르기</b>로 올려요.']]}];
function dgSheet128(k){k=k||'sw';var D=DG128.filter(function(x){return x.k===k;})[0]||DG128[0];
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">로그 한 번에 올리기</h2><p class="small" style="margin:0 0 10px">기기에서 내보낸 파일 하나만 올리면 날짜 · 수심 · 그래프까지 채워져요.</p>'+
    '<div class="dgt" role="tablist">'+DG128.map(function(x){return '<button type="button" role="tab" class="chip" aria-pressed="'+(x.k===D.k)+'" data-dgk="'+x.k+'">'+x.n+'</button>';}).join('')+'</div>'+
    '<div class="dgh"><b>'+D.n+'</b><span class="small">'+D.d+'</span><span class="tag">'+D.f+'</span></div>'+
    (D.s.length>2?'<p class="small dgsw">옆으로 넘겨서 '+D.s.length+'단계까지 보세요 →</p>':'')+'<div class="dgsteps">'+D.s.map(function(s,i){return '<div class="dgst">'+s[0]+'<p><em>'+(i+1)+'</em>'+s[1]+'</p></div>';}).join('')+'</div>'+
    '<p class="small dgtip">💡 '+D.tip+'</p><button class="btn btn-pri" type="button" data-dggo style="width:100%;justify-content:center;margin-top:10px">파일 올리러 가기</button>');}
document.addEventListener('click',function(e){var t=e.target.closest('[data-dgk]');if(t){dgSheet128(t.dataset.dgk);return;}
  t=e.target.closest('[data-devg]');if(t){e.preventDefault();e.stopPropagation();dgSheet128(t.dataset.devg||'sw');return;}
  if(e.target.closest('[data-dggo]')){closeSheet();if(cur()==='logimport'){var i=document.getElementById('uddfIn');if(i)setTimeout(function(){i.click();},80);}else location.hash='#logimport';}});
/* 들어가는 곳: 로그북 머리 ⓘ · 새 기록 창 · 가져오기 화면 */
function dgEntry128(){var c=cur();
  if(c==='log'){var vh=document.querySelector('#main .view > .vh'),nb=vh&&vh.querySelector('[data-lbnewsheet]');if(nb&&!vh.querySelector('.dgi')){var b=document.createElement('button');b.type='button';b.className='dgi';b.dataset.devg='sw';b.setAttribute('aria-label','다이브 컴퓨터 기록 올리는 법');b.textContent='!';var g=document.createElement('span');g.className='dgbtns';nb.before(g);g.appendChild(b);g.appendChild(nb);}}
  if(c==='logimport'){var v=document.querySelector('#main .view');if(!v||document.getElementById('dgImp'))return;var z=document.getElementById('dropZ');
    if(z){var a=document.createElement('div');a.id='dgImp';a.className='dgimp';a.innerHTML='<span class="small">어떻게 내보내는지 모르겠다면</span><div class="dgg">'+DG128.map(function(x){return '<button type="button" data-devg="'+x.k+'"><b>'+x.n+'</b><small>'+x.f+'</small></button>';}).join('')+'</div>';z.after(a);}
    var old=v.querySelector('.devg');if(old)old.style.display='none';
    try{if(!localStorage.getItem('dtdo.dgSeen')){localStorage.setItem('dtdo.dgSeen','1');setTimeout(function(){if(cur()==='logimport'&&!document.getElementById('sheetbg'))dgSheet128('sw');},700);}}catch(x){}}}
if(typeof lbNewSheet==='function'){var _lbns128=lbNewSheet;lbNewSheet=function(){_lbns128();var w=document.querySelector('#sheetbg .lbns');if(w&&!w.querySelector('[data-devg]'))w.insertAdjacentHTML('afterend','<button type="button" class="dgline" data-devg="sw"><span class="dgi">!</span><span><b>다이브 컴퓨터 기록 한 번에 올리는 법</b><small>쉐어워터 · 가민 · 애플워치 · 순토 · 기타</small></span></button>');};}
(function(){var st=document.createElement('style');st.textContent=
 '.dgi{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;flex:none;border-radius:50%;border:1.5px solid var(--sea);color:var(--sea);background:var(--card,#fff);font:800 17px/1 Sora,sans-serif;cursor:pointer;margin-right:6px}'+
 '.dgbtns{display:inline-flex;align-items:center;gap:6px;flex:none}.dgbtns .dgi{margin:0}.dgph .dgtabs .hl::after{right:2px;bottom:-12px}'+
 '.dgline{display:flex;align-items:center;gap:10px;width:100%;margin-top:10px;padding:12px 14px;border-radius:14px;border:0;background:rgba(10,90,138,.07);color:var(--ink);font:inherit;text-align:left;cursor:pointer}.dgline .dgi{width:28px;height:28px;font-size:14px;margin:0}.dgline>span:last-child{display:flex;flex-direction:column}.dgline small{font-size:12.5px;color:var(--sub)}'+
 '.dgt{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.dgt::-webkit-scrollbar{display:none}.dgt .chip{flex:none}.dgt .chip[aria-pressed=true]{background:var(--sea);border-color:var(--sea);color:#fff}'+
 '.dgh{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin:12px 0 8px}.dgh b{font-size:17px}.dgh .tag{margin:0 0 0 auto}'+
 '.dgsteps{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:2px 2px 8px;margin:0 -2px}.dgst{flex:0 0 172px;scroll-snap-align:start;display:flex;flex-direction:column;gap:8px}.dgst p{margin:0;font-size:13px;line-height:1.5}.dgst em{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--sea);color:#fff;font:700 12px/1 Sora,sans-serif;font-style:normal;margin-right:6px;vertical-align:1px}'+
 '.dgph{position:relative;height:230px;border-radius:22px;border:5px solid #1c2733;background:#f5f7fa;overflow:hidden;display:flex;flex-direction:column;font-size:11.5px;color:#1c2733}.dgph.dk{background:#222;color:#ddd}.dgtop{flex:none;padding:16px 10px 8px;background:#e8eef4;font-weight:700;text-align:center;font-size:12px}.dgph.dk .dgtop{background:#00aeef;color:#fff}.dgsp{flex:1}'+
 '.dgtabs{display:flex;background:#333}.dgph:not(.dk) .dgtabs{background:#e8eef4}.dgtabs span{flex:1;text-align:center;padding:10px 0;font-size:8.5px;letter-spacing:-.3px;white-space:nowrap;color:#4fb8e8}.dgtabs span.hl{color:#fff;box-shadow:inset 0 -3px 0 #fff}'+
 '.dglist{display:flex;flex-direction:column;gap:5px;padding:10px 8px;margin-top:auto}.dglist span{padding:9px 8px;border-radius:5px;background:rgba(128,128,128,.14)}.dgweb{display:flex;flex-direction:column;gap:5px;padding:8px}.dgweb i{font-style:normal;font-size:10.5px;color:#6b7c8c;padding:2px 2px 4px}.dgweb span{padding:8px;border-radius:5px;background:rgba(128,128,128,.12)}'+
 '.dgshare{display:flex;flex-direction:column;gap:6px;padding:10px;background:#fff;border-radius:14px 14px 0 0;box-shadow:0 -4px 14px rgba(0,0,0,.12)}.dgsi{display:flex;gap:6px;margin-bottom:2px}.dgsi i{flex:1;font-style:normal;font-size:9.5px;text-align:center;padding:14px 0 4px;border-radius:8px;background:#eef2f6}.dgshare span{padding:8px;border-radius:6px;background:#f0f3f6}'+
 '.dgdrop{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px;text-align:center}.dgdrop b{font-size:11px;color:#0a5a8a}.dgdrop small{color:#6b7c8c}.dgdrop span{padding:16px 14px;border-radius:10px;border:1.5px dashed #0a5a8a}'+
 '.dgph .hl{outline:2.5px solid #f6a04d;outline-offset:1px;background:rgba(246,160,77,.22)!important;color:inherit;font-weight:700;position:relative}.dgph .hl::after{content:"👆";position:absolute;right:-2px;bottom:-14px;font-size:16px}'+
 '.dgsw{margin:0 0 6px;color:var(--sea)!important}.dgtip{margin:4px 0 0;padding:10px 12px;border-radius:10px;background:var(--bg)}'+
 '.dgimp{margin-top:12px}.dgg{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;margin-top:6px}.dgg button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px;border:1px solid var(--line);border-radius:12px;background:var(--card,#fff);color:var(--ink);font:inherit;text-align:left;cursor:pointer}.dgg b{font-size:14px}.dgg small{font-size:11.5px;color:var(--sub)}';document.head.appendChild(st);})();
var _after128=after;after=function(){_after128();var c=cur();if(c==='log'||c==='logimport'){[400,1300,2600].forEach(function(ms){setTimeout(dgEntry128,ms);});}};

/* ================= 홈 홍보 배너 (가로 자동 넘김) · 2026.11.22 ~ 2027.02.19 (90일) ================= */
var PROMO128=[
 {id:'sgbd',n:'슬기로운 바다생활',area:'강원 양양 · 인구항',kind:'다이빙',addr:'강원 양양군 인구항길 4-4',line:'양양 바다를 가볍게 시작해요',map:'https://naver.me/Frif4RSI',bg:'linear-gradient(135deg,#0a5a8a 0%,#1b8fb8 60%,#5cc8d6 100%)'},
 {id:'hdive',n:'에이치다이브컴퍼니',area:'제주 서귀포',kind:'SSI 다이빙 센터',addr:'제주 서귀포시 월드컵로 108',line:'서귀포 바다로 함께 들어가요',map:'https://naver.me/5ulJPZ6B',bg:'linear-gradient(135deg,#0b2742 0%,#14507a 55%,#f08a5d 140%)'}];
var PROMO128_FROM='2026-11-22',PROMO128_TO='2027-02-19';
function promoOn128(){if(typeof LANG!=='undefined'&&LANG==='en')return false;var d=new Date(Date.now()+9*36e5).toISOString().slice(0,10);return d>=PROMO128_FROM&&d<=PROMO128_TO;}
function promoHtml128(){return '<div id="prHome" class="pr128" aria-roledescription="슬라이드"><div class="prt" id="prTrack">'+PROMO128.map(function(p,i){return '<button type="button" class="prs" data-promo="'+p.id+'" style="background:'+p.bg+'" aria-label="'+esc(p.n)+' 홍보 '+(i+1)+'/'+PROMO128.length+'"><svg class="prw" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C60 30 110 70 170 50 S280 30 340 50 S390 60 400 52 V80 H0Z" fill="rgba(255,255,255,.12)"/><path d="M0 62 C70 48 120 78 190 62 S300 48 360 62 S395 70 400 64 V80 H0Z" fill="rgba(255,255,255,.1)"/></svg><span class="prtag">홍보</span><span class="prk">'+esc(p.area)+' · '+esc(p.kind)+'</span><b class="prn">'+esc(p.n)+'</b><span class="prl">'+esc(p.line)+'</span><span class="prgo">자세히 ›</span></button>';}).join('')+'</div>'+
    '<div class="prd">'+PROMO128.map(function(p,i){return '<i'+(i===(state.prIdx||0)?' class="on"':'')+'></i>';}).join('')+'</div></div>';}
/* 화면을 그릴 때 같이 넣어서 다시 그려도 깜박이지 않게 */
if(V.home){var _vHome128=V.home;V.home=function(a){var h=_vHome128(a);if(!promoOn128()||h.indexOf('id="prHome"')>=0)return h;var d=document.createElement('div');d.innerHTML=h;var vh=d.querySelector(':scope > .vh');if(vh)vh.insertAdjacentHTML('afterend',promoHtml128());else d.insertAdjacentHTML('afterbegin',promoHtml128());return d.innerHTML;};}
function promoHome128(){if(cur()!=='home'||!promoOn128())return;var w=document.getElementById('prHome');
  if(!w){var v=document.querySelector('#main .view');if(!v)return;var vh=v.querySelector(':scope > .vh');if(vh)vh.insertAdjacentHTML('afterend',promoHtml128());else v.insertAdjacentHTML('afterbegin',promoHtml128());w=document.getElementById('prHome');}
  if(!w||w.dataset.b)return;w.dataset.b=1;var tr=w.querySelector('#prTrack'),n=PROMO128.length,x0=null,dx=0,moved=false;
  var show=function(i,anim){state.prIdx=(i+n)%n;tr.style.transition=anim?'transform .45s ease':'none';tr.style.transform='translate3d('+(-100*state.prIdx)+'%,0,0)';[].forEach.call(w.querySelectorAll('.prd i'),function(d,k){d.classList.toggle('on',k===state.prIdx);});};
  show(state.prIdx||0,false);w._show=show;
  tr.addEventListener('pointerdown',function(ev){x0=ev.clientX;dx=0;moved=false;promoHome128.hold=Date.now();});
  tr.addEventListener('pointermove',function(ev){if(x0===null)return;dx=ev.clientX-x0;if(Math.abs(dx)>8){moved=true;tr.style.transition='none';tr.style.transform='translate3d(calc('+(-100*state.prIdx)+'% + '+dx+'px),0,0)';}});
  var end=function(){if(x0===null)return;x0=null;if(Math.abs(dx)>40)show(state.prIdx+(dx<0?1:-1),true);else show(state.prIdx,true);promoHome128.hold=Date.now();};
  tr.addEventListener('pointerup',end);tr.addEventListener('pointercancel',end);tr.addEventListener('pointerleave',end);
  tr.addEventListener('click',function(ev){if(moved){ev.preventDefault();ev.stopPropagation();moved=false;}},true);
  if(!promoHome128.t)promoHome128.t=setInterval(function(){var w2=document.getElementById('prHome');if(!w2||!w2._show||document.hidden||cur()!=='home'||Date.now()-(promoHome128.hold||0)<6000)return;w2._show((state.prIdx||0)+1,true);},4500);}
function promoSheet128(id){var p=PROMO128.filter(function(x){return x.id===id;})[0];if(!p)return;
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><div class="prsh" style="background:'+p.bg+'"><span class="prtag">홍보</span><span class="prk">'+esc(p.area)+' · '+esc(p.kind)+'</span><b>'+esc(p.n)+'</b><span>'+esc(p.line)+'</span></div>'+
    '<div class="list" style="margin-top:12px"><div class="item" style="padding:8px 0"><span class="tx"><b>주소</b><span>'+esc(p.addr)+'</span></span></div><div class="item" style="padding:8px 0"><span class="tx"><b>분류</b><span>'+esc(p.kind)+'</span></span></div></div>'+
    '<div style="display:flex;gap:8px;margin-top:12px"><a class="btn btn-pri" href="'+esc(p.map)+'" target="_blank" rel="noopener" style="flex:1;justify-content:center">지도에서 보기</a><a class="btn btn-line" href="#resorts" data-xsheet style="flex:1;justify-content:center">근처 업체 · 바다</a></div>'+
    '<p class="small" style="margin:10px 0 0">예약 · 문의는 업체에 직접 해 주세요. 홍보 기간 '+PROMO128_FROM.slice(5).replace('-','.')+' ~ '+PROMO128_TO.slice(2).replace(/-/g,'.')+'</p>');}
document.addEventListener('click',function(e){var t=e.target.closest('[data-promo]');if(t){e.preventDefault();promoSheet128(t.dataset.promo);}});
(function(){var st=document.createElement('style');st.textContent='.pr128{margin:0 0 10px}.pr128 .prd{padding-bottom:2px}.pr128{overflow:hidden}.prs{border-radius:18px}.prt{display:flex;will-change:transform;touch-action:pan-y}'+
 '.prs{position:relative;flex:0 0 100%;scroll-snap-align:start;min-height:84px;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto auto;align-items:center;column-gap:10px;row-gap:1px;padding:12px 16px;border:0;color:#fff;text-align:left;font:inherit;cursor:pointer;overflow:hidden}.prw{position:absolute;left:0;right:0;bottom:0;width:100%;height:30px}'+
 '.prtag,.prsh .prtag{position:absolute;top:9px;right:10px;font-size:10.5px;font-weight:700;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,.22);color:#fff}.prk{position:relative;grid-column:1;font-size:11.5px;opacity:.9}.prn{position:relative;grid-column:1;font-size:17px;letter-spacing:-.3px;line-height:1.25}.prl{position:relative;grid-column:1;font-size:12.5px;opacity:.95}.prgo{position:relative;grid-column:2;grid-row:1/4;align-self:end;font-size:12px;white-space:nowrap;font-weight:700;padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.95);color:#0a3d5c}'+
 '.prd{display:flex;justify-content:center;gap:6px;margin-top:6px}.prd i{width:6px;height:6px;border-radius:3px;background:var(--line);transition:width .2s}.prd i.on{width:18px;background:var(--sea)}'+
 '#main .hsum a{padding-top:10px!important;padding-bottom:10px!important}.prsh{position:relative;display:flex;flex-direction:column;gap:3px;padding:18px;border-radius:16px;color:#fff;margin-top:48px}.prsh b{font-size:22px}.prsh span{font-size:13px;opacity:.95}';document.head.appendChild(st);})();
var _after128b=after;after=function(){_after128b();if(cur()==='home'){promoHome128();setTimeout(promoHome128,600);}};
/* 홈: 위 숫자 카드(다녀온 곳 · 로그 · 찜한 곳)는 지도 아래 칩과 겹쳐서 빼고, 로그 수는 인사말 줄에 */
(function(){var st=document.createElement('style');st.textContent='#main .view > .hsum{display:none!important}.hello94 .h128{color:inherit;text-decoration:none;font-weight:600}';document.head.appendChild(st);})();
function hsumMove128(){if(cur()!=='home')return;var h=document.getElementById('hello94');if(!h||h.querySelector('.h128'))return;var s=document.querySelector('#main .hsum a[href="#log"]'),n=s&&s.querySelector('b'),y=s&&s.querySelectorAll('.small')[1];
  var tot=n?n.textContent.trim():((state.userLogs||[]).length?(state.userLogs||[]).length+'회':'');if(!tot)return;h.insertAdjacentHTML('beforeend',' · <a class="h128" href="#log">로그 '+esc(tot)+(y&&/올해/.test(y.textContent)?' ('+esc(y.textContent.trim())+')':'')+'</a>');}
var _after128c=after;after=function(){_after128c();if(cur()==='home'){[200,900,2000].forEach(function(ms){setTimeout(hsumMove128,ms);});}};
/* 푸터: 줄 간격 · 위아래 여백 줄이기 */
(function(){var st=document.createElement('style');st.textContent='.foot{line-height:1.45!important;gap:4px!important;padding-top:12px!important;margin-top:20px!important}.foot *{line-height:inherit}.foot .footbrand{margin-bottom:4px!important;gap:10px!important}.foot .footbrand img{width:46px!important;height:46px!important}.foot button.lnk,.foot a{min-height:0!important;height:auto!important;padding-top:0!important;padding-bottom:0!important;vertical-align:baseline}.foot .i6fb{margin-top:4px!important}.foot p{margin:0!important}';document.head.appendChild(st);})();

/* ---------- 깜박임: 데이터가 올 때마다 화면 전체를 연달아 다시 그리던 것을 한 번으로 모아요 ---------- */
(function(){var _r=rerender,last=0,pend=0;rerender=function(){var now=Date.now(),ev=window.event;
  if(ev&&ev.isTrusted&&/^(click|submit|change|input|keydown|keyup|pointerup|touchend|hashchange|popstate)$/.test(ev.type)){if(pend){clearTimeout(pend);pend=0;}last=now;return _r.apply(this,arguments);}
  if(!pend&&now-last>300){last=now;return _r.apply(this,arguments);}
  if(pend)return;pend=setTimeout(function(){pend=0;last=Date.now();_r();},Math.max(30,300-(now-last)));};})();

/* ---------- 모임 만들기 예시 팝업: 깔끔한 내용으로, 기기마다 한 번만 ---------- */
var MEETEX128='<h2 style="margin:0 0 4px">모임은 이렇게 공개돼요</h2><p class="small" style="margin:0 0 10px">예시예요. 만들면 바로 이런 모습으로 올라가요.</p><div class="mex"><div class="mext">'+'<span class="tag">펀다이빙</span><span class="tag ok">모집 중 · 3/6명</span></div><b>12월 첫 주 아닐라오 마크로 2박 3일</b><span class="small">아닐라오 · 2026-12-04 · 어드밴스드 이상 · 로그 30회 이상</span><p>금요일 밤 출발, 토·일 보트 다이빙 5회. 숙소·다이빙 비용은 인원수로 나눠 리조트에 직접 내요. 카메라 있으신 분 환영해요.</p><span class="small">참가자 · 모임장 · 바다거북 · 누디사랑</span></div>';
try{Object.defineProperty(state,'meetExHtml',{configurable:true,get:function(){return MEETEX128;},set:function(){}});}catch(e){}
window.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#meetnew"]');if(!a||e.target.closest('.sheet'))return;try{if(localStorage.getItem('dtdo.meetEx1'))sessionStorage.setItem('dtdo.meetEx','1');else localStorage.setItem('dtdo.meetEx1','1');}catch(x){}},true);
(function(){var st=document.createElement('style');st.textContent='.meetex h2 .fold,.meetex .fold,.meetex h2 button{display:none!important}.mex{display:flex;flex-direction:column;gap:6px;padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--bg)}.mext{display:flex;gap:6px}.mext .tag{margin:0}.mex b{font-size:16px}.mex p{margin:2px 0;font-size:14px;line-height:1.55}';document.head.appendChild(st);})();

/* ---------- 가입하면 내 도장 · 서명 자동 등록, 도장 비밀번호 없애기 ---------- */
function sigPng128(name){var c=document.createElement('canvas');c.width=640;c.height=220;var g=c.getContext('2d'),n=String(name||'다이버').slice(0,12);g.fillStyle='#0b1f33';g.strokeStyle='#0b1f33';g.textAlign='center';g.textBaseline='middle';
  var fs=n.length<=3?104:n.length<=6?86:64;g.save();g.translate(320,100);g.rotate(-0.06);g.font='italic 700 '+fs+'px "Nanum Pen Script","Brush Script MT","Segoe Script","Apple SD Gothic Neo",cursive';g.fillText(n,0,0);g.restore();
  g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(150,168);g.bezierCurveTo(260,150,400,190,500,160);g.stroke();return c.toDataURL('image/png');}
function autoMine128(){if(!BE.on||!BE.user||autoMine128.b)return;var k='dtdo.autoMine.'+BE.user.id;try{var flag=localStorage.getItem(k);}catch(e){return;}
  stMine(function(s){if(!s||autoMine128.b)return;var nk=(state.me&&state.me.nick)||'';if(!nk)return;var ins=!!s.ok,jobs=[];
    var cert=(state.canClub&&state.canClub.cert)||(state.me&&state.me.cert)||'';
    if(!s.has&&!flag)jobs.push(BE.sb.rpc('stamp_save',{p_image:sealPng127(nk,ins?'강사':'다이버'),p_label:ins?String(cert).replace(/\s*\(.*\)$/,'').slice(0,30)||null:null,p_pin:null}));
    else if(s.has&&ins&&flag==='diver')jobs.push(BE.sb.rpc('stamp_save',{p_image:sealPng127(nk,'강사'),p_label:String(cert).replace(/\s*\(.*\)$/,'').slice(0,30)||null,p_pin:null}));
    if(!s.sign&&!flag)jobs.push(BE.sb.rpc('instr_sign_save',{p_img:sigPng128(nk)}));
    if(!jobs.length){if(!flag)try{localStorage.setItem(k,ins?'ins':'diver');}catch(e){}return;}
    autoMine128.b=1;Promise.all(jobs).then(function(){try{localStorage.setItem(k,ins?'ins':'diver');}catch(e){}state.stMine=undefined;if(!flag)toast('내 도장과 서명을 만들어 뒀어요. 내 정보에서 바꿀 수 있어요');else toast('강사 도장으로 바꿨어요');var p=document.getElementById('insPanel');if(p){p.remove();setTimeout(insPanel127,300);}}).catch(function(){autoMine128.b=0;});});}
var _after128d=after;after=function(){_after128d();if(BE.user)setTimeout(autoMine128,1500);};
/* 도장 비밀번호 칸 · 도장 번호로 찍기 없애기 */
(function(){var st=document.createElement('style');st.textContent='label[for="st_p"],#stCodeRow{display:none!important}';document.head.appendChild(st);})();
window.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-stsave]');if(!t)return;var m=state.stMine;if(m&&m!=='…'&&!m.has){var tmp=Object.assign({},m,{has:true});state.stMine=tmp;setTimeout(function(){if(state.stMine===tmp)state.stMine=m;},0);}},true);
if(V.stamp){var _vSt128=V.stamp;V.stamp=function(a){return _vSt128(a).replace('교육생 휴대폰에서 서명할 때 이 번호와 도장 비밀번호를 넣으면 도장이 찍혀요. 내 휴대폰으로 서명 링크를 열면 비밀번호 없이 찍을 수 있어요.','서명 링크를 로그인한 내 휴대폰에서 열면 \'내 도장 넣기\'로 바로 찍혀요. 비밀번호는 필요 없어요.');};}
function sgStampTidy128(){if(cur()!=='sign')return;var b=document.querySelector('.sgstamp');if(!b||b.dataset.t128)return;b.dataset.t128=1;var s=b.querySelector('summary');if(s)s.textContent='내 도장 · 서명 넣기';var p=b.querySelector(':scope > p.small');if(p)p.innerHTML=BE.user?'내 도장을 넣으면 손글씨 서명은 안 해도 돼요. 도장 · 서명은 <a href="#profile">내 정보</a>에서 바꿔요.':'이 링크를 <a href="#login">로그인</a>한 내 휴대폰에서 열면 내 도장 · 서명이 바로 들어가요.';}
var _after128e=after;after=function(){_after128e();if(cur()==='sign'){[800,2000,3800].forEach(function(ms){setTimeout(sgStampTidy128,ms);});}};
autoStamp127=function(){autoMine128();};

/* ---------- 리조트: 키워드 검색 ---------- */
function rsNorm128(s){return String(s||'').toLowerCase().replace(/[\s·\-_.()]/g,'');}
function rsSearch128(q){var box=document.getElementById('rsRes');if(!box)return;q=String(q||'').trim();state.rsq=q;if(!q){box.innerHTML='';box.hidden=true;return;}box.hidden=false;
  if(!DB.sites){if(typeof need==='function')need('map');box.innerHTML='<p class="empty" style="margin:0">업체 목록을 불러오는 중이에요…</p>';setTimeout(function(){rsSearch128(state.rsq);},700);return;}
  var n=rsNorm128(q),S=SPOTS.filter(function(s){return !(typeof isPool==='function'&&isPool(s))&&rsNorm128([s.name,s.en,s.country,s.region].join(' ')).indexOf(n)>=0;}).slice(0,8);
  var B=DB.sites.filter(function(x){return x[3]!==1&&rsNorm128((x[2]||'')+' '+(x[4]||'')).indexOf(n)>=0;}).slice(0,40).map(function(x){var best=null,bd=1e9;SPOTS.forEach(function(s){var d=km(s.lat,s.lon,x[0],x[1]);if(d<bd){bd=d;best=s;}});return {x:x,s:best,d:bd};});
  box.innerHTML=(S.length||B.length?'':'<p class="empty" style="margin:0">\''+esc(q)+'\'에 맞는 곳이 없어요. 다른 이름으로 찾아보세요.</p>')+
    (B.length?'<div class="rsh">리조트 · 센터 '+B.length+(B.length>=40?'+':'')+'</div><div class="rsl">'+B.map(function(o){var x=o.x;return '<div class="rsi"><a href="#" data-site="'+x[0]+','+x[1]+'">'+esc(x[2]||'이름 없음')+'</a><span>'+(x[3]===2?'리조트':'센터')+(o.s&&o.d<80?' · '+esc(o.s.name)+' 근처':'')+(x[4]&&!/^[a-z]/i.test(x[4])?' · '+esc(String(x[4]).slice(0,24)):'')+'</span></div>';}).join('')+'</div>':'')+
    (S.length?'<div class="rsh">바다 · 포인트 '+S.length+'</div><div class="rsl">'+S.map(function(s){return '<div class="rsi"><a href="#spot-'+s.id+'">'+esc(s.name)+'</a><span>'+esc(s.country||'')+'</span></div>';}).join('')+'</div>':'');}
function rsBox128(){if(cur()!=='resorts')return;var v=document.querySelector('#main .view');if(!v||document.getElementById('rsFind'))return;var tab=v.querySelector('.rtab');
  var f=document.createElement('form');f.id='rsFind';f.className='rsfind';f.setAttribute('role','search');f.innerHTML='<input id="rsq" type="search" enterkeyhint="search" autocomplete="off" placeholder="리조트 · 센터 · 바다 이름으로 찾기" value="'+esc(state.rsq||'')+'"><button class="btn btn-pri" type="submit">검색</button>';
  var r=document.createElement('div');r.id='rsRes';r.className='panel rsres';r.hidden=true;
  if(tab){tab.after(f);f.after(r);}else{var vh=v.querySelector(':scope > .vh');(vh||v.firstChild).after(f);f.after(r);}
  if(state.rsq)rsSearch128(state.rsq);}
document.addEventListener('submit',function(e){if(e.target.id!=='rsFind')return;e.preventDefault();var i=document.getElementById('rsq');rsSearch128(i&&i.value);if(i)i.blur();});
document.addEventListener('input',function(e){if(e.target.id!=='rsq')return;clearTimeout(rsBox128.t);var v=e.target.value;rsBox128.t=setTimeout(function(){rsSearch128(v);},250);});
var _after128f=after;after=function(){_after128f();if(cur()==='resorts'){rsBox128();setTimeout(rsBox128,400);}};
/* ---------- 지도: 빈 공간 줄이기 ---------- */
(function(){var st=document.createElement('style');st.textContent=
 '.rsfind{display:flex;gap:8px;margin:2px 0 10px}.rsfind input{flex:1;min-width:0;height:46px;border:1px solid var(--line);border-radius:12px;padding:0 14px;font:inherit;font-size:16px;background:var(--card,#fff);color:var(--ink)}.rsfind .btn{flex:none;min-height:46px;padding:0 18px}'+
 '.rsres{margin-bottom:12px}.rsh{font-size:13px;font-weight:700;color:var(--sub);margin:4px 0 6px}.rsh:not(:first-child){margin-top:12px}.rsl{display:flex;flex-direction:column}.rsi{display:flex;flex-direction:column;gap:2px;padding:9px 0;border-top:1px dashed var(--line)}.rsi:first-child{border-top:0}.rsi a{font-weight:600;color:var(--sea)}.rsi span{font-size:12.5px;color:var(--sub)}'+
 '#main .view:has(#lmap){gap:8px!important}#main .view:has(#lmap) > *{margin-top:0!important}#mapLg{margin:6px 0 0!important}#main .mxnote{margin:2px 0 0!important;font-size:12px!important}#main .ctyrow{margin:2px 0 0!important}'+
 '#mapFind{padding-bottom:0!important;margin:0!important}#mapFind label{font-size:0!important;gap:0!important}#mapFind label input{font-size:16px!important}#main .mfmore{margin:0!important}#main .mfmore summary{padding:6px 14px!important;font-size:14px}';document.head.appendChild(st);})();
function mapTidy128(){if(cur()!=='map')return;var i=document.getElementById('mapq');if(i&&!i.dataset.t128){i.dataset.t128=1;i.placeholder='포인트 찾기 · 초성도 돼요 (예: 모알보알, ㅁㅇㅂㅇ)';}}
var _after128g=after;after=function(){_after128g();if(cur()==='map'){setTimeout(mapTidy128,100);setTimeout(mapTidy128,900);}};
