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
 '.dgi{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;flex:none;border-radius:50%;border:1.5px solid var(--sea);color:var(--sea);background:var(--panel,#fff);font:800 17px/1 Sora,sans-serif;cursor:pointer;margin-right:6px}'+
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
 '.dgimp{margin-top:12px}.dgg{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;margin-top:6px}.dgg button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px;border:1px solid var(--line);border-radius:12px;background:var(--panel,#fff);color:var(--ink);font:inherit;text-align:left;cursor:pointer}.dgg b{font-size:14px}.dgg small{font-size:11.5px;color:var(--sub)}';document.head.appendChild(st);})();
var _after128=after;after=function(){_after128();var c=cur();if(c==='log'||c==='logimport'){[400,1300,2600].forEach(function(ms){setTimeout(dgEntry128,ms);});}};

/* ================= 홈 홍보 배너 (가로 자동 넘김) · 2026.11.22 ~ 2027.02.19 (90일) ================= */
var PROMO128=[
 {id:'sgbd',n:'슬기로운 바다생활',area:'강원 양양 · 인구항',kind:'다이빙',addr:'강원 양양군 인구항길 4-4',line:'양양 바다를 가볍게 시작해요',map:'https://naver.me/Frif4RSI',bg:'linear-gradient(135deg,#0a5a8a 0%,#1b8fb8 60%,#5cc8d6 100%)'},
 {id:'tmax',n:'팀맥스 다이브 리조트',area:'필리핀 세부 · 막탄',kind:'다이빙 리조트',addr:'Suba-Basbas – Marbeach Rd, Lapu-Lapu, Cebu',line:'세부 막탄 바다로 함께 들어가요',map:'https://maps.app.goo.gl/sj6Nj9wVNTUHoJ4y6',bg:'linear-gradient(135deg,#0d4f5c 0%,#13867e 55%,#7fd3a8 120%)'},
 {id:'beyul',n:'BEYUL 다이브 리조트',area:'필리핀 바탕가스 · 베르데 섬',kind:'다이빙 리조트',addr:'San Agapito, Verde Island, Batangas',line:'베르데 섬 바다로 함께 들어가요',map:'https://www.google.com/maps?q=BEYUL+Dive+Resort+Verde+Island+Batangas',bg:'linear-gradient(135deg,#123a5c 0%,#1f6f9a 55%,#9ad7c9 125%)'},
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
(function(){var _r=rerender,last=0,pend=0,first=0,navAt=Date.now();window.addEventListener('hashchange',function(){navAt=Date.now();});
  rerender=function(){var now=Date.now(),ev=window.event;
  if(ev&&ev.isTrusted&&/^(click|submit|change|input|keydown|keyup|pointerup|touchend|hashchange|popstate)$/.test(ev.type)){if(pend){clearTimeout(pend);pend=0;}last=now;return _r.apply(this,arguments);}
  if(now-navAt<2500){/* 막 열린 화면: 데이터가 다 올 때까지 잠깐 모았다가 한 번에 */if(!pend)first=now;else clearTimeout(pend);var wait=Math.min(450,Math.max(30,1300-(now-first)));pend=setTimeout(function(){pend=0;last=Date.now();_r();},wait);return;}
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
 '.rsfind{display:flex;gap:8px;margin:2px 0 10px}.rsfind input{flex:1;min-width:0;height:46px;border:1px solid var(--line);border-radius:12px;padding:0 14px;font:inherit;font-size:16px;background:var(--panel,#fff);color:var(--ink)}.rsfind .btn{flex:none;min-height:46px;padding:0 18px}'+
 '.rsres{margin-bottom:12px}.rsh{font-size:13px;font-weight:700;color:var(--sub);margin:4px 0 6px}.rsh:not(:first-child){margin-top:12px}.rsl{display:flex;flex-direction:column}.rsi{display:flex;flex-direction:column;gap:2px;padding:9px 0;border-top:1px dashed var(--line)}.rsi:first-child{border-top:0}.rsi a{font-weight:600;color:var(--sea)}.rsi span{font-size:12.5px;color:var(--sub)}'+
 '#main .view:has(#lmap){gap:8px!important}#main .view:has(#lmap) > *{margin-top:0!important}#mapLg{margin:6px 0 0!important}#main .mxnote{margin:2px 0 0!important;font-size:12px!important}#main .ctyrow{margin:2px 0 0!important}'+
 '#mapFind{padding-bottom:0!important;margin:0!important}#mapFind label{font-size:0!important;gap:0!important}#mapFind label input{font-size:16px!important}#main .mfmore{margin:0!important}#main .mfmore summary{padding:6px 14px!important;font-size:14px}';document.head.appendChild(st);})();
function mapTidy128(){if(cur()!=='map')return;var i=document.getElementById('mapq');if(i&&!i.dataset.t128){i.dataset.t128=1;i.placeholder='포인트 찾기 · 초성도 돼요 (예: 모알보알, ㅁㅇㅂㅇ)';}}
var _after128g=after;after=function(){_after128g();if(cur()==='map'){setTimeout(mapTidy128,100);setTimeout(mapTidy128,900);}};

var _after128h=after;after=function(){_after128h();if(cur()==='log'){setTimeout(function(){lbStLoad128();lbStMark128();},500);}};
/* 서명 · 도장을 새로 받으면 목록도 새로 */
var _sgLoad128=typeof sgLoad==='function'?sgLoad:null;if(_sgLoad128)sgLoad=function(id){state.lbSt=null;return _sgLoad128.apply(this,arguments);};

/* ================= 여러 로그 한 번에 서명 · 도장 요청 ================= */
(function(){var _lk=lk127;lk127=function(u){var s=String(u||'');try{var x=new URL(s),m=/^#signs-([0-9a-f-]{36})$/i.exec(x.hash||'');if(m&&(x.origin===location.origin||/divedeepocean\.com$/.test(x.hostname)))return x.origin+'/sb/'+m[1].toLowerCase();}catch(e){}return _lk(u);};})();
state.lbSel=null;
function lbSelOn128(on){state.lbSel=on?{}:null;document.body.classList.toggle('lbselm',!!on);var bar=document.getElementById('lbSelBar');if(bar)bar.remove();if(on){bar=document.createElement('div');bar.id='lbSelBar';bar.className='lbselbar';document.body.appendChild(bar);}lbSelPaint128();}
function lbSelPaint128(){var S=state.lbSel;[].forEach.call(document.querySelectorAll('#lbBox a.dv'),function(a){var m=(a.getAttribute('href')||'').match(/#dive-(\d+)/);if(!m)return;var dn=!!S&&lbSigned128(m[1]);if(dn&&S[m[1]])delete S[m[1]];a.classList.toggle('signed128',dn);var on=!!(S&&S[m[1]]);a.classList.toggle('sel',on);var c=a.querySelector('.lbck');if(S&&!c){c=document.createElement('span');c.className='lbck';c.setAttribute('aria-hidden','true');a.prepend(c);}else if(!S&&c)c.remove();if(!S)a.classList.remove('signed128');});
  var bar=document.getElementById('lbSelBar');if(!bar)return;var n=S?Object.keys(S).length:0;bar.innerHTML='<button type="button" class="btn btn-line" data-lbsel="off">취소</button><span><b>'+n+'개</b> 골랐어요</span><button type="button" class="btn btn-pri" data-lbsel="go"'+(n?'':' disabled')+'>서명 · 도장 요청</button>';}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('#lbBox a.dv');if(a&&state.lbSel){e.preventDefault();e.stopPropagation();var m=(a.getAttribute('href')||'').match(/#dive-(\d+)/);if(!m)return;if(lbSigned128(m[1]))return toast('이미 서명 받은 기록이에요');if(state.lbSel[m[1]])delete state.lbSel[m[1]];else{if(Object.keys(state.lbSel).length>=50)return toast('한 번에 50개까지 고를 수 있어요');state.lbSel[m[1]]=1;}lbSelPaint128();return;}
  var b=e.target.closest&&e.target.closest('[data-lbsel]');if(!b)return;e.preventDefault();var k=b.dataset.lbsel;
  if(k==='on')return lbSelOn128(true);if(k==='off')return lbSelOn128(false);
  if(k==='go'){var ids=Object.keys(state.lbSel||{}).map(Number);if(!ids.length)return;lbBatchSheet128(ids);}},true);
function lbBatchSheet128(ids){var paint=function(L){var P=(L||[]).filter(function(x){return x.kind==='instructor'||x.kind==='buddy';}).sort(function(a,b){return (a.kind==='instructor'?0:1)-(b.kind==='instructor'?0:1);});
  sheet('<button class="chip x" type="button" data-xsheet>닫기</button><h2 style="margin:0 0 4px">'+ids.length+'개 로그 한 번에 서명 받기</h2><p class="small" style="margin:0 0 12px">받는 사람은 링크 하나로 '+ids.length+'개를 한 번에 서명 · 도장해요.</p>'+
    '<div class="sgopt">'+(P.length?'<div class="sgppl"><b>내 강사 · 버디에게 바로 부탁</b><div class="sgplist">'+P.map(function(x){return '<button type="button" class="sgp" data-bto="'+esc(x.peer)+'" data-nick="'+esc(x.nick)+'"><span class="tag '+(x.kind==='instructor'?'tag-sea':'')+'">'+(x.kind==='instructor'?'강사':'버디')+'</span>'+esc(x.nick)+'</button>';}).join('')+'</div><span class="small">앱 메시지와 알림으로 링크가 가요.</span></div>':'<div class="sgppl"><span class="small">내 정보에서 강사 · 버디를 등록하면 여기서 바로 부탁할 수 있어요.</span></div>')+
    '<button type="button" class="sgo" data-blink="1"><b>카톡 · 문자로 링크 보내기</b><span>로그인 없이 한 번에 서명해요 (30일)</span></button></div>');
  state.lbBatchIds=ids;};
  if(typeof lkLoad127==='function'){state.lk=null;lkLoad127(paint);}else paint([]);}
function lbBatchMake128(cb){var ids=state.lbBatchIds||[];BE.sb.rpc('sign_batch_make',{p_logs:ids}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];if(r.error||!x||!x.id)return toast('요청을 만들지 못했어요');cb(x);});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-blink]');if(t){t.disabled=true;lbBatchMake128(function(x){var u=location.origin+'/sb/'+x.id,txt='다이브 로그 '+x.n+'개에 서명 · 도장 부탁드려요 🤿';closeSheet();lbSelOn128(false);state.lbSt=null;if(navigator.share)navigator.share({title:txt,text:txt+'\n'+u}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(txt+'\n'+u).then(function(){toast('링크를 복사했어요');});});return;}
  t=e.target.closest('[data-bto]');if(!t)return;t.disabled=true;var to=t.dataset.bto,nk=t.dataset.nick;lbBatchMake128(function(x){var me=(state.me&&state.me.nick)||'다이버',body='[일괄 서명 요청] 다이브 로그 '+x.n+'개에 서명 · 도장 부탁드려요. 한 번에 할 수 있어요.\n'+location.origin+'/sb/'+x.id;
    BE.sb.from('messages').insert({recipient:to,sender_nick:me,body:body}).select('id').then(function(m){if(m.error)return toast('보내지 못했어요: '+m.error.message);var mid=m.data&&m.data[0]&&m.data[0].id;if(mid&&typeof pushNote==='function')pushNote('message',mid);closeSheet();lbSelOn128(false);toast(nk+' 님에게 '+x.n+'개 서명 요청을 보냈어요');});});});
/* 로그북 머리: '여러 개 서명 받기' 버튼 */
function lbSelBtn128(){if(cur()!=='log'||!BE.user)return;var h=document.querySelector('#lbBox .lbh');if(!h||h.querySelector('[data-lbsel]'))return;var b=document.createElement('button');b.type='button';b.className='chip lbselb';b.dataset.lbsel='on';b.textContent='여러 개 서명 받기';var st=h.querySelector('.lbst');if(st)st.before(b);else h.appendChild(b);if(state.lbSel)lbSelPaint128();}
var _after128i=after;after=function(){_after128i();if(cur()==='log'){[300,1200].forEach(function(ms){setTimeout(lbSelBtn128,ms);});}else if(state.lbSel)lbSelOn128(false);};
if(window.MutationObserver)new MutationObserver(function(){if(state.lbSel&&[].some.call(document.querySelectorAll('#lbBox a.dv'),function(a){return !a.querySelector('.lbck');}))lbSelPaint128();}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});

/* 받는 쪽: 한 번에 서명 화면 #signs-배치번호 */
state.sbD={};
V.signs=function(id){setTitle('다이브 로그 한 번에 서명');var m=UUID127.exec(String(id||'')+' '+location.hash),t=m&&m[0].toLowerCase();if(!t)return '<div class="vh"><div><h1>잘못된 링크예요</h1></div></div>';var D=state.sbD[t];
  if(D===undefined){state.sbD[t]=null;BE.sb.rpc('sign_batch_get',{p_id:t}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];state.sbD[t]=x||false;if(cur()==='signs')rerender();});}
  if(!D)return '<div class="vh"><div><h1>다이브 로그 서명</h1><p>'+(D===false?'기간이 지났거나 없는 링크예요.':'불러오는 중이에요…')+'</p></div></div>';
  var L=D.list||[],left=L.filter(function(x){return !x.signed;}).length;
  return '<div class="vh"><div><h1>다이브 로그 '+L.length+'개 서명</h1><p>'+esc(D.diver)+' 님이 함께한 다이브 확인을 부탁했어요</p></div></div>'+
   '<div class="panel"><h2>서명할 로그 <span class="small">'+left+'개 남음</span></h2><div class="sbl">'+L.map(function(x){return '<div class="sbi'+(x.signed?' done':'')+'"><b>'+esc(x.site||'다이브')+'</b><span>'+esc(x.date||'')+(x.max_depth?' · '+x.max_depth+'m':'')+(x.minutes?' · '+x.minutes+'분':'')+'</span><i>'+(x.signed?'서명됨':'')+'</i></div>';}).join('')+'</div></div>'+
   (left?'<form class="panel form" id="sbForm" data-t="'+t+'" style="grid-template-columns:1fr"><label for="sb_n">이름<input id="sb_n" maxlength="40" value="'+esc(BE.user&&state.me&&state.me.nick||'')+'"></label><label for="sb_r">역할<select id="sb_r"><option value="instructor">강사</option><option value="buddy">버디</option><option value="divemaster">다이브마스터</option><option value="guide">가이드</option></select></label><label for="sb_c">자격 · 번호 (선택)<input id="sb_c" maxlength="60" placeholder="예: PADI OWSI 123456"></label>'+
    '<div id="sbMine"></div><div class="sbpw"><span class="small">아래 칸에 손가락으로 서명해 주세요 · 한 번이면 '+left+'개에 모두 들어가요</span><button class="chip" type="button" data-sbclr>지우기</button></div><canvas id="sbPad" width="640" height="240" class="inspad" aria-label="여기에 서명"></canvas>'+
    '<button class="btn btn-pri" type="submit">'+left+'개 한 번에 서명하기</button><p class="small" style="margin:0">이름 · 역할 · 서명만 로그 주인에게 보여요.</p></form>':'<div class="panel"><p style="margin:0">모두 서명됐어요. 고마워요 🙏</p></div>');};
function sbInit128(){if(cur()!=='signs')return;var c=document.getElementById('sbPad');if(c&&!c.dataset.on){c.dataset.on=1;var g=c.getContext('2d'),dn=false,lx=0,ly=0;g.lineWidth=4.5;g.lineCap='round';g.lineJoin='round';g.strokeStyle='#0b1f33';var pt=function(e){var r=c.getBoundingClientRect();return [(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height];};
  c.addEventListener('pointerdown',function(e){dn=true;c.setPointerCapture(e.pointerId);var p=pt(e);lx=p[0];ly=p[1];e.preventDefault();});c.addEventListener('pointermove',function(e){if(!dn)return;var p=pt(e);g.beginPath();g.moveTo(lx,ly);g.lineTo(p[0],p[1]);g.stroke();lx=p[0];ly=p[1];c.dataset.ink=1;e.preventDefault();});['pointerup','pointercancel','pointerleave'].forEach(function(k){c.addEventListener(k,function(){dn=false;});});}
  var mb=document.getElementById('sbMine');if(mb&&!mb.dataset.on&&BE.user){mb.dataset.on=1;stMine(function(s){if(!s||!(s.has||s.sign))return;var r=document.getElementById('sb_r');if(r&&!s.ok)r.value='buddy';mb.innerHTML='<label class="sbmine"><input type="checkbox" id="sb_mine" checked>'+(s.has&&s.image?'<img src="'+esc(s.image)+'" alt="">':'')+(s.sign&&s.sign_image?'<img src="'+esc(s.sign_image)+'" alt="" style="width:80px">':'')+'<span>내 '+(s.ok?'강사 ':'')+'도장 · 서명 넣기 (손글씨 안 해도 돼요)</span></label>';});}}
document.addEventListener('click',function(e){if(e.target.closest('[data-sbclr]')){var c=document.getElementById('sbPad');if(c){c.getContext('2d').clearRect(0,0,c.width,c.height);delete c.dataset.ink;}}});
document.addEventListener('submit',function(e){if(e.target.id!=='sbForm')return;e.preventDefault();var f=e.target,t=f.dataset.t,n=(val('sb_n')||'').trim(),c=document.getElementById('sbPad'),ink=c&&c.dataset.ink,mine=!!(document.getElementById('sb_mine')||{}).checked;if(!n)return toast('이름을 적어 주세요');if(!ink&&!mine)return toast('서명을 하거나 내 도장 · 서명을 넣어 주세요');
  var b=f.querySelector('button[type=submit]');b.disabled=true;BE.sb.rpc('sign_batch_submit',{p_id:t,p_name:n,p_role:val('sb_r'),p_cert:(val('sb_c')||'').trim()||null,p_sig:ink?c.toDataURL('image/png'):null,p_mine:mine}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];b.disabled=false;if(r.error||!x)return toast('서명하지 못했어요. 다시 해 주세요');
    if(!x.ok){var E=(typeof STERR!=='undefined'&&STERR[x.err])||'서명하지 못했어요';return toast(E);}delete state.sbD[t];toast(x.ok+'개에 서명했어요'+(x.ok<x.total?' ('+(x.total-x.ok)+'개는 못 했어요)':''));rerender();});});
var _after128j=after;after=function(){_after128j();if(cur()==='signs'){[200,900,2200].forEach(function(ms){setTimeout(sbInit128,ms);});}};
(function(){var st=document.createElement('style');st.textContent='.lbselb{flex:none;font-size:12.5px!important;padding:5px 10px!important}.lbselm #lbBox a.dv{padding-left:44px!important;position:relative}.lbck{position:absolute;left:12px;top:50%;width:22px;height:22px;margin-top:-11px;border-radius:6px;border:2px solid var(--line);background:var(--panel,#fff)}#lbBox a.dv.sel{background:rgba(10,90,138,.07)}#lbBox a.dv.sel .lbck{background:var(--sea);border-color:var(--sea)}#lbBox a.dv.sel .lbck::after{content:"";position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg)}'+
 '.lbselbar{position:fixed;left:12px;right:12px;bottom:calc(78px + env(safe-area-inset-bottom));z-index:80;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;background:var(--panel,#fff);box-shadow:0 8px 28px rgba(0,0,0,.18)}.lbselbar span{flex:1;font-size:14px}.lbselbar .btn{min-height:42px}'+
 '.sbl{display:flex;flex-direction:column}.sbi{display:grid;grid-template-columns:1fr auto;column-gap:10px;padding:9px 0;border-top:1px solid var(--line)}.sbi:first-child{border-top:0}.sbi span{grid-column:1;font-size:12.5px;color:var(--sub)}.sbi i{grid-column:2;grid-row:1/3;align-self:center;font-style:normal;font-size:12px;color:#1e8a4a;font-weight:700}.sbi.done{opacity:.55}.sbpw{display:flex;align-items:center;justify-content:space-between;gap:8px}.sbmine{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;background:var(--bg);cursor:pointer}.sbmine img{width:44px;height:44px;object-fit:contain}.sbmine span{font-size:13.5px}';document.head.appendChild(st);})();
(function(){var st=document.createElement('style');st.textContent='.lbselm #lbBox a.dv .lbck{position:absolute!important;z-index:2!important}.sbpw .chip{white-space:nowrap;flex:none}';document.head.appendChild(st);})();

/* ---------- 지도 포인트: 국내 · 해외 나누기 ('해외' 칩) ---------- */
var SPOTS_ALL128=null;
function ovApply128(on){if(on){if(!SPOTS_ALL128)SPOTS_ALL128=SPOTS.slice();var keep=SPOTS_ALL128.filter(function(s){return s.country!=='대한민국'||s.id==='home';});SPOTS.length=0;keep.forEach(function(s){SPOTS.push(s);});state.ovOnly=true;}
  else if(SPOTS_ALL128){SPOTS.length=0;SPOTS_ALL128.forEach(function(s){SPOTS.push(s);});SPOTS_ALL128=null;state.ovOnly=false;}else state.ovOnly=false;}
if(V.map){var _vMap128=V.map;V.map=function(a){var h=_vMap128(a);if(h.indexOf('data-lregion="해외"')>=0)return h;
  return h.replace(/(<button[^>]*data-lregion="한국"[^>]*>[\s\S]*?<\/button>)/,'$1<button class="chip" type="button" data-lregion="해외" aria-pressed="'+(!!state.ovOnly)+'">🌏 해외</button>').replace(/(<button[^>]*data-lregion="전체"[^>]*aria-pressed=")true(")/,state.ovOnly?'$1false$2':'$1true$2');};}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-lregion]');if(!b)return;if(b.dataset.lregion==='해외'){e.preventDefault();e.stopImmediatePropagation();ovApply128(true);state.region='전체';state.lv=null;rerender();return;}if(state.ovOnly)ovApply128(false);},true);
var _after128k=after;after=function(){if(state.ovOnly&&!/^(map|directory)$/.test(cur()))ovApply128(false);_after128k();};

/* ================= 내 정보: 내 강사 · 내 버디 (경력) / 강사용 '내 다이버들' ================= */
function career128(x){var o=[];if(x.logs!=null)o.push('로그 '+x.logs+'회');if(x.first){var f=new Date(x.first),m=Math.max(0,Math.round((Date.now()-f.getTime())/(30.44*864e5)));o.push(String(x.first).slice(0,7).replace('-','.')+'부터 · '+(m>=12?Math.floor(m/12)+1+'년차':(m||1)+'개월째'));}if(x.maxd)o.push('최대 '+(+x.maxd)+'m');return o.join(' · ');}
function lpRow128(x,lab){var sg=x.kind==='instructor'&&x.signed?'<span class="p8s">내 로그에 서명 · 도장 '+x.signed+'개</span>':'';
  return '<div class="p8r"><div class="p8h"><span class="tag'+(x.kind!=='buddy'?' tag-sea':'')+'">'+lab+'</span><b>'+esc(x.nick)+'</b><span class="small">'+esc(x.cert||'')+'</span><button class="p8x" type="button" data-lkdel="'+esc(x.peer)+'" data-kind="'+x.kind+'" aria-label="'+esc(x.nick)+' 지우기">×</button></div><div class="p8c">'+(career128(x)||'아직 기록이 없어요')+'</div>'+sg+'</div>';}
lkPanel127=function(){if(cur()!=='profile'||!BE.user||document.getElementById('lkPanel'))return;var v=document.querySelector('#main .view');if(!v)return;
  if(state.myInv127===undefined){state.myInv127=null;BE.sb.rpc('my_invite').then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];state.myInv127=(x&&x.code)||'';lkPanel127();});return;}if(state.myInv127===null)return;
  if(lkPanel127.b)return;lkPanel127.b=1;
  BE.sb.rpc('link_people').then(function(r){lkPanel127.b=0;if(cur()!=='profile'||document.getElementById('lkPanel'))return;var L=r.error?[]:(r.data||[]),g={instructor:[],buddy:[],student:[]};L.forEach(function(x){(g[x.kind]||[]).push(x);});state.lp=L;
    var bc=state.myInv127,p=document.createElement('div');p.className='panel';p.id='lkPanel';
    p.innerHTML='<h2>내 버디 · 강사</h2>'+(bc?'<div class="inscode lkmy"><span class="small">내 버디 코드 · 버디가 이 코드를 넣으면 서로 등록돼요</span><b>'+esc(bc)+'</b><span class="inscb"><button class="chip" type="button" data-budcopy="'+esc(bc)+'">복사</button><button class="chip" type="button" data-lkinv="b">링크로 보내기</button></span></div>':'')+
      '<div class="p8g"><div class="p8t">내 강사 <span>'+g.instructor.length+'</span></div>'+(g.instructor.length?g.instructor.map(function(x){return lpRow128(x,'강사');}).join(''):'<p class="small p8e">강사님께 받은 강사 코드로 등록해요.</p>')+'</div>'+
      '<div class="p8g"><div class="p8t">내 버디 <span>'+g.buddy.length+'</span></div>'+(g.buddy.length?g.buddy.map(function(x){return lpRow128(x,'버디');}).join(''):'<p class="small p8e">같이 다이빙한 버디의 버디 코드로 등록해요.</p>')+'</div>'+
      '<div class="lkb"><button class="btn btn-pri" type="button" data-lkadd="b">내 버디 등록하기</button><button class="btn btn-pri" type="button" data-lkadd="t">내 강사 등록하기</button></div>';
    v.appendChild(p);
    var ins=state.stMine&&state.stMine.ok;if((ins||g.student.length)&&!document.getElementById('myDivers')){var d=document.createElement('div');d.className='panel';d.id='myDivers';
      var tot=g.student.reduce(function(a,x){return a+(+x.signed||0);},0);
      d.innerHTML='<h2>내 다이버들 <span class="small">'+g.student.length+'명 · 서명 · 도장 '+tot+'개</span></h2>'+(g.student.length?g.student.map(function(x){var R=x.recent||[];return '<details class="p8r p8d"><summary><div class="p8h"><span class="tag tag-sea">교육생</span><b>'+esc(x.nick)+'</b><span class="small">'+esc(x.cert||'')+'</span><span class="p8n">'+(+x.signed||0)+'개 ▾</span></div><div class="p8c">'+(career128(x)||'아직 기록이 없어요')+'</div></summary>'+
          (R.length?'<div class="p8l">'+R.map(function(y){return '<div><span>'+esc(String(y.date||'').slice(2).replace(/-/g,'.'))+'</span><b>'+esc(y.site||'다이브')+'</b><i>'+(y.depth?(+y.depth)+'m · ':'')+(y.stamp?'도장':'서명')+'</i></div>';}).join('')+'</div>':'<p class="small" style="margin:6px 0 0">아직 내가 서명 · 도장한 로그가 없어요.</p>')+
          '<button class="chip p8del" type="button" data-lkdel="'+esc(x.peer)+'" data-kind="student">목록에서 빼기</button></details>';}).join(''):'<p class="small" style="margin:0">교육생이 내 강사 코드로 등록하면 여기에 모여요. 내가 찍어준 서명 · 도장과 다이빙 경력을 볼 수 있어요.</p><button class="btn btn-line" type="button" data-lkinv="t" style="width:100%;justify-content:center;margin-top:10px">교육생에게 강사 등록 링크 보내기</button>');
      p.after(d);}
    if(typeof order127==='function')order127();});};
(function(){var _o=order127;order127=function(){_o();var p=document.getElementById('lkPanel'),d=document.getElementById('myDivers');if(p&&d&&p.nextElementSibling!==d)p.after(d);};})();
document.addEventListener('click',function(e){if(e.target.closest('[data-lkdel]')){var d=document.getElementById('myDivers');setTimeout(function(){if(!document.getElementById('lkPanel')&&d)d.remove();},50);}},true);
(function(){var st=document.createElement('style');st.textContent='.p8g{margin-top:12px}.p8t{font-size:13px;font-weight:700;color:var(--sub);margin-bottom:6px}.p8t span{color:var(--sea)}.p8e{margin:0 0 4px!important}.p8r{padding:10px 12px;border-radius:12px;background:var(--bg);margin-bottom:6px}.p8h{display:flex;align-items:center;gap:8px}.p8h .tag{margin:0}.p8h b{white-space:nowrap}.p8h .small{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.p8x{flex:none;width:28px;height:28px;border-radius:50%;border:0;background:transparent;color:var(--sub);font-size:20px;line-height:1;cursor:pointer}.p8c{font-size:12.5px;color:var(--sub);margin-top:4px}.p8s{display:inline-block;margin-top:6px;font-size:12px;font-weight:700;color:var(--sea)}'+
 '.p8d summary{list-style:none;cursor:pointer}.p8d summary::-webkit-details-marker{display:none}.p8n{flex:none;font-size:12.5px;font-weight:700;color:var(--sea)}.p8l{margin-top:8px;border-top:1px solid var(--line)}.p8l div{display:grid;grid-template-columns:auto 1fr auto;gap:8px;padding:7px 0;border-bottom:1px dashed var(--line);font-size:13px;align-items:baseline}.p8l span{color:var(--sub);font-size:12px}.p8l b{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.p8l i{font-style:normal;font-size:12px;color:var(--sub)}.p8del{margin-top:8px;font-size:12px!important}';document.head.appendChild(st);})();

/* ---------- 포인트 정렬: 나라 → 지역 → 포인트 (한글 가나다 · 영어 abc, 대한민국 먼저) ---------- */
var AREA128_SRC='제주,Jeju:jeju udo beomseom chagwido hyeopjae marado hyeongje gimnyeong jigwido|강원,Gangwon:goseong yangyang gangneung samcheok jumunjin eodal|경북,Gyeongbuk:ulleung wangdol gyeongju pohang dokdo chuksan|경남,Gyeongnam:geoje tongyeong|부산,Busan:busan sajikpool|전남,Jeonnam:geomun hongdo wando|서울,Seoul:jamsilpool olympicpool|경기,Gyeonggi:k26 deepstation paradive seongnampool suwonpool|인천,Incheon:munhakpool|대구,Daegu:duryupool|광주,Gwangju:nambupool'+
 '|오키나와,Okinawa:okinawa maeda ishigaki miyako yonaguni|도쿄도 섬,Tokyo Islands:mikura ogasawara|시즈오카,Shizuoka:izu|가고시마,Kagoshima:amami|고치,Kochi:kashiwajima'+
 '|세부,Cebu:mactan oslob moalboal malapascua|보홀,Bohol:balicasag cabilao|바탕가스,Batangas:anilao|민도로,Mindoro:galera aporeef|팔라완,Palawan:coron elnido tubbataha|네그로스,Negros:dauin|시키호르,Siquijor:siquijor|보라카이,Boracay:boracay|잠발레스,Zambales:subic|소르소곤,Sorsogon:donsol|카미긴,Camiguin:camiguin'+
 '|코타오,Koh Tao:kohtao|팡아,Phang Nga:similan richelieu|푸껫,Phuket:racha|끄라비,Krabi:phiphi kohlanta|사뚠,Satun:lipe'+
 '|사바,Sabah:sipadan mabul|파항,Pahang:tioman|트렝가누,Terengganu:perhentian redang'+
 '|발리,Bali:tulamben amed nusapenida menjangan padangbai|롬복,Lombok:gili|누사틍가라,Nusa Tenggara:komodo alor|파푸아,Papua:rajaampat|술라웨시,Sulawesi:lembeh bunaken wakatobi|말루쿠,Maluku:banda'+
 '|냐짱,Nha Trang:nhatrang|푸꾸옥,Phu Quoc:phuquoc|코로르,Koror:palau|북마리아나,Northern Marianas:saipan rota|괌,Guam:guam|추크,Chuuk:chuuk|얍,Yap:yap'+
 '|아리 환초,Ari Atoll:maldives|바 환초,Baa Atoll:hanifaru|푸바물라,Fuvahmulah:fuvahmulah|남시나이,South Sinai:dahab sharm thistlegorm|홍해 연안,Red Sea Coast:hurghada brothers marsaalam quseir'+
 '|퀸즐랜드,Queensland:gbr codhole yongala|서호주,Western Australia:ningaloo|하와이,Hawaii:kona molokini|캘리포니아,California:monterey|플로리다,Florida:keys|킨타나로오,Quintana Roo:cenote cozumel playa|바하칼리포르니아,Baja California:lapaz socorro guadalupe|투아모투,Tuamotu:rangiroa fakarava';
var AREA128={};AREA128_SRC.split('|').forEach(function(g){var a=g.split(':'),n=a[0].split(',');a[1].split(' ').forEach(function(id){AREA128[id]=n;});});
function spotArea128(s,en){if(!s)return '';var a=AREA128[s.id];if(a)return en?a[1]:a[0];
  if(en){var e=(typeof EN==='object'&&EN[s.id])||s.name;return String(e).split(',').slice(-1)[0].replace(/\(.*\)/,'').trim();}
  var nm=String(s.name),m=nm.match(/\(([^)]+)\)/);var f=nm.replace(/\(.*\)/,'').trim().split(/[ ·]/)[0];if(f===s.country||nm.indexOf(s.country)===0)f=nm.replace(s.country,'').replace(/\(.*\)/,'').trim().split(/[ ·]/)[0]||f;return f||nm;}
function ctyName128(c,en){return en&&typeof EN_D==='object'&&EN_D[c]&&EN_D[c].length>3?EN_D[c]:c;}
function spotKey128(s){var en=typeof LANG!=='undefined'&&LANG==='en',nm=en&&typeof EN==='object'&&EN[s.id]?EN[s.id]:s.name;return [s.country==='대한민국'?'':ctyName128(s.country,en)||'~',spotArea128(s,en),nm||''];}
function spotCmp128(a,b){if(!a||!b)return a?-1:b?1:0;if(a.id==='home')return -1;if(b.id==='home')return 1;var A=spotKey128(a),B=spotKey128(b),loc=(typeof LANG!=='undefined'&&LANG==='en')?'en':'ko';for(var i=0;i<3;i++){var c=String(A[i]).localeCompare(String(B[i]),loc,{sensitivity:'base',numeric:true});if(c)return c;}return 0;}
if(typeof EN_D==='object'){var EC128={"온두라스": "Honduras", "쿠바": "Cuba", "도미니카 연방": "Dominica", "세인트루시아": "Saint Lucia", "그레나다": "Grenada", "콜롬비아": "Colombia", "파나마": "Panama", "아르헨티나": "Argentina", "동티모르": "Timor-Leste", "인도": "India", "바누아투": "Vanuatu", "솔로몬 제도": "Solomon Islands", "쿡 제도": "Cook Islands", "크로아티아": "Croatia", "키프로스": "Cyprus", "이탈리아": "Italy", "포르투갈": "Portugal", "노르웨이": "Norway", "요르단": "Jordan", "지부티": "Djibouti", "카보베르데": "Cape Verde", "케냐": "Kenya", "마다가스카르": "Madagascar", "남극": "Antarctica"};for(var k8 in EC128)if(!EN_D[k8])EN_D[k8]=EC128[k8];}
try{SPOTS.sort(spotCmp128);}catch(e){}
if(typeof EN_D==='object')EN_D['추천 포인트 '+SPOTS.length+'곳과 다이빙 센터 7,700여 곳']=SPOTS.length+' featured spots and about 7,700 dive centers';
function spTree128(){var en=typeof LANG!=='undefined'&&LANG==='en',T=[],C={};SPOTS.forEach(function(s){if(s.id==='home')return;var c=C[s.country];if(!c){c=C[s.country]={c:s.country,n:ctyName128(s.country,en),A:[],M:{}};T.push(c);}var ar=spotArea128(s,en),x=c.M[ar];if(!x){x=c.M[ar]={a:ar,S:[]};c.A.push(x);}x.S.push(s);});return T;}

/* 모임: 포인트 대신 나라 → 지역. 값은 'a:나라|지역' 으로 저장하고 spot()이 대표 포인트로 풀어 줘요 */
function areaVal128(s){return 'a:'+s.country+'|'+spotArea128(s,false);}
var _spot128=spot;spot=function(id){if(typeof id==='string'&&id.indexOf('a:')===0){var p=id.slice(2).split('|'),en=typeof LANG!=='undefined'&&LANG==='en',L=SPOTS.filter(function(s){return s.country===p[0]&&spotArea128(s,false)===p[1];});if(!L.length)return null;
    var o={};for(var k in L[0])o[k]=L[0][k];var ar=en?spotArea128(L[0],true):p[1];o.name=p[0]==='대한민국'?ar:ar+' · '+ctyName128(p[0],en);o.area128=1;o.spots128=L;return o;}return _spot128(id);};
if(typeof FORMS==='object'&&FORMS.meet){FORMS.meet.steps[0].f.forEach(function(f){if(f.k==='spot'){f.l='지역';f.opts=function(){var R=[];spTree128().forEach(function(c){c.A.forEach(function(a){R.push(['a:'+c.c+'|'+(AREA128[a.S[0].id]?AREA128[a.S[0].id][0]:spotArea128(a.S[0],false)),(c.c==='대한민국'?'':c.n+' · ')+a.a]);});});return R;};}});}

/* 선택 칸: 나라 → 지역 (→ 포인트) */
function spPickHtml128(mode,cv,av,pv){var T=spTree128(),c=T.filter(function(x){return x.c===cv;})[0],a=c&&c.A.filter(function(x){return x.a===av;})[0];
  return '<select class="sp3c" aria-label="나라"><option value="">나라</option>'+T.map(function(x){return '<option value="'+esc(x.c)+'"'+(x.c===cv?' selected':'')+'>'+esc(x.n)+'</option>';}).join('')+'</select>'+
   '<select class="sp3a" aria-label="지역"'+(c?'':' disabled')+'><option value="">지역</option>'+(c?c.A.map(function(x){return '<option value="'+esc(x.a)+'"'+(x.a===av?' selected':'')+'>'+esc(x.a)+'</option>';}).join(''):'')+'</select>'+
   (mode===3?'<select class="sp3p" aria-label="포인트"'+(a?'':' disabled')+'><option value="">포인트</option>'+(a?a.S.map(function(s){return '<option value="'+esc(s.id)+'"'+(s.id===pv?' selected':'')+'>'+esc(s.name)+'</option>';}).join(''):'')+'</select>':'');}
function spPick128(){var en=typeof LANG!=='undefined'&&LANG==='en';
  [].forEach.call(document.querySelectorAll('input[list="spotList"]:not([data-sp3])'),function(inp){inp.dataset.sp3=1;var s=SPOTS.filter(function(x){return x.name===inp.value;})[0],w=document.createElement('div');w.className='sp3';w.dataset.mode=3;
    w.innerHTML=spPickHtml128(3,s?s.country:'',s?spotArea128(s,en):'',s?s.id:'');var lb=inp.closest('label')||inp;lb.parentNode.insertBefore(w,lb.nextSibling);w._inp=inp;});
  var ms=document.querySelector('select[data-f="spot"][id^="f_meet"]:not([data-sp3])');if(ms){ms.dataset.sp3=1;var st=state.forms&&state.forms.meet&&state.forms.meet.v||{},v=st.spot||'';
    if(v&&v.indexOf('a:')!==0){var s0=spot(v);if(s0){v=areaVal128(s0);st.spot=v;}}
    var p=v.indexOf('a:')===0?v.slice(2).split('|'):['',''];ms.value=v;var w=document.createElement('div');w.className='sp3';w.dataset.mode=2;
    var ar=p[1];if(en&&p[0]){var L=SPOTS.filter(function(s){return s.country===p[0]&&spotArea128(s,false)===p[1];});ar=L[0]?spotArea128(L[0],true):p[1];}
    w.innerHTML=spPickHtml128(2,p[0],ar,'');ms.style.display='none';ms.parentNode.appendChild(w);w._sel=ms;}}
document.addEventListener('change',function(e){var t=e.target,w=t.closest&&t.closest('.sp3');if(!w)return;e.stopPropagation();var mode=+w.dataset.mode,c=w.querySelector('.sp3c').value,a=w.querySelector('.sp3a').value,p=w.querySelector('.sp3p');p=p?p.value:'';
  if(t.classList.contains('sp3c')){a='';p='';}if(t.classList.contains('sp3a'))p='';w.innerHTML=spPickHtml128(mode,c,a,p);
  var T=spTree128(),cc=T.filter(function(x){return x.c===c;})[0],aa=cc&&cc.A.filter(function(x){return x.a===a;})[0];
  if(mode===3&&w._inp&&p){var s=SPOTS.filter(function(x){return x.id===p;})[0];if(s){w._inp.value=s.name;w._inp.dispatchEvent(new Event('input',{bubbles:true}));w._inp.dispatchEvent(new Event('change',{bubbles:true}));}}
  if(mode===2&&w._sel){var val=aa?areaVal128(aa.S[0]):'';w._sel.value=val;w._sel.dispatchEvent(new Event('change',{bubbles:true}));w._sel.dispatchEvent(new Event('input',{bubbles:true}));}
  var nx=w.querySelector(t.classList.contains('sp3c')?'.sp3a':'.sp3p');if(nx&&!nx.disabled)try{nx.focus();}catch(_){}},true);
if(window.MutationObserver)new MutationObserver(function(){if(document.querySelector('input[list="spotList"]:not([data-sp3]),select[data-f="spot"][id^="f_meet"]:not([data-sp3])'))spPick128();}).observe(document.body,{childList:true,subtree:true});
(function(){var st=document.createElement('style');st.textContent='.sp3{display:flex;gap:6px;margin:6px 0 2px;grid-column:1/-1}.sp3 select{flex:1;min-width:0;height:40px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:inherit;font-size:14px;padding:0 8px}.sp3 select:disabled{opacity:.5}label>.sp3{margin-top:8px}';document.head.appendChild(st);})();

/* ---------- 서명 · 도장: 배경 지우기 ---------- */
var CLR128={};
function inkRgb128(){var c=document.createElement('canvas').getContext('2d');c.fillStyle='#000';c.fillStyle=(getComputedStyle(document.documentElement).getPropertyValue('--ink')||'#0b2a3c').trim();var h=c.fillStyle;if(h[0]!=='#')return [11,42,60];return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}
function clearBg128(src,kind,cb){if(!src)return;var ink=kind==='sg'?inkRgb128():null,key=kind+(ink?ink.join(','):'')+'|'+src;if(key in CLR128){if(CLR128[key]!=='…')cb(CLR128[key]);return;}CLR128[key]='…';
  var im=new Image();if(!/^data:/.test(src))im.crossOrigin='anonymous';im.onload=function(){try{var W=im.naturalWidth,H=im.naturalHeight,s=Math.min(1,900/Math.max(W,H));W=Math.max(1,Math.round(W*s));H=Math.max(1,Math.round(H*s));var cv=document.createElement('canvas');cv.width=W;cv.height=H;var x=cv.getContext('2d');x.drawImage(im,0,0,W,H);var d=x.getImageData(0,0,W,H),p=d.data;
    for(var i=0;i<p.length;i+=4){if(!p[i+3])continue;var r=p[i],g=p[i+1],b=p[i+2],k;
      if(ink){var l=(r+g+b)/3;k=l>=235?0:l<=150?1:(235-l)/85;p[i]=ink[0];p[i+1]=ink[1];p[i+2]=ink[2];}
      else{var mn=Math.min(r,g,b);k=mn>=232?0:mn<=190?1:(232-mn)/42;}
      p[i+3]=Math.round(p[i+3]*k);}
    x.putImageData(d,0,0);CLR128[key]=cv.toDataURL('image/png');cb(CLR128[key]);}catch(e){CLR128[key]=src;cb(src);}};im.onerror=function(){CLR128[key]='';cb('');};im.src=src;}
function sealHtml128(sg,st,cls){return '<span class="seal128 '+(cls||'')+'">'+(sg?'<img class="s8sg" alt="" data-src="'+esc(sg)+'">':'')+(st?'<img class="s8st" alt="" data-src="'+esc(st)+'">':'')+'</span>';}
function sealFill128(root){[].forEach.call((root||document).querySelectorAll('.seal128 img[data-src]:not([src])'),function(im){var s=im.dataset.src;im.style.visibility='hidden';clearBg128(s,im.classList.contains('s8sg')?'sg':'st',function(u){if(!u){im.remove();return;}im.src=u;im.style.visibility='';});});}

/* 로그북 줄: 서명 위에 도장이 겹쳐 찍힌 모양 */
function lbStLoad128(){if(!BE.on||!BE.user||state.lbSt)return;state.lbSt={};BE.sb.from('dive_signs').select('log_id,stamp,signature').not('signed_at','is',null).order('signed_at',{ascending:false}).limit(1000).then(function(r){var M={};(r.data||[]).forEach(function(x){var o=M[x.log_id]||(M[x.log_id]={});if(x.stamp&&!o.st)o.st=x.stamp;if(x.signature&&!o.sg)o.sg=x.signature;});state.lbSt=M;lbStMark128();if(state.lbSel)lbSelPaint128();});}
function lbStMark128(){var M=state.lbSt;if(!M)return;[].forEach.call(document.querySelectorAll('#lbBox a.dv'),function(a){if(a.querySelector('.seal128'))return;var m=(a.getAttribute('href')||'').match(/#dive-(\d+)/),o=m&&M[m[1]];if(!o||!(o.st||o.sg))return;a.classList.add('dvst');var old=a.querySelector('img.lbst');if(old)old.remove();
  a.insertAdjacentHTML('beforeend',sealHtml128(o.sg,o.st,'lbseal'));var t=a.querySelector('.lbsg');if(t)t.remove();});sealFill128(document.getElementById('lbBox'));}
function lbSigned128(id){return !!(state.lbSt&&state.lbSt[id]&&(state.lbSt[id].st||state.lbSt[id].sg));}

/* 상세: 제목 오른쪽에 서명 · 도장 */
sgLoad=function(id){if(state.sg[id]||!BE.user)return;state.sg[id]='…';BE.sb.from('dive_signs').select('id,token,signer_name,signer_role,signer_cert,signature,stamp,signed_at,created_at').eq('log_id',id).order('created_at').then(function(r){state.sg[id]=r.data||[];if(cur()==='dive'){sgPaint();dvSeal128();}});};
var _sgPaint128=sgPaint;sgPaint=function(){_sgPaint128.apply(this,arguments);setTimeout(dvSeal128,0);};
function dvSeal128(){if(cur()!=='dive')return;var m=location.hash.match(/dive-(\d+)/);if(!m)return;var S=state.sg&&state.sg[m[1]];if(!Array.isArray(S))return;var D=S.filter(function(x){return x.signed_at;});
  var v=document.querySelector('#main .view'),h=v&&v.querySelector('h1');if(h&&!v.querySelector('.dvseal')){var sg=null,st=null;D.forEach(function(x){if(x.signature&&!sg)sg=x.signature;if(x.stamp&&!st)st=x.stamp;});
    if(sg||st){var box=h.parentNode;box.classList.add('dvsealbox');box.insertAdjacentHTML('afterbegin',sealHtml128(sg,st,'dvseal'));var se=box.querySelector('.dvseal');if(se)se.style.top=Math.max(0,h.offsetTop-14)+'px';}}
  [].forEach.call(document.querySelectorAll('.sgl .s'),function(row){if(row.querySelector('.seal128'))return;var im=row.querySelector(':scope > img:not(.stp)'),sp=row.querySelector(':scope > img.stp'),src=im&&im.getAttribute('src'),x=src?D.filter(function(y){return y.signature===src;})[0]:null,stp=x&&x.stamp||(sp&&sp.getAttribute('src'));
    if(!im&&!sp)return;var w=document.createElement('span');w.innerHTML=sealHtml128(src,stp,'rowseal');(im||sp).replaceWith(w.firstChild);if(im&&sp)sp.remove();});
  sealFill128(v);}
var _after128s=after;after=function(){_after128s();if(cur()==='dive'){setTimeout(dvSeal128,300);setTimeout(dvSeal128,1200);}};
(function(){var st=document.createElement('style');st.textContent=
'.seal128{position:relative;display:inline-block;pointer-events:none}.seal128 img{position:absolute;object-fit:contain}'+
'#lbBox a.dv.dvst{position:relative;overflow:hidden}#lbBox a.dv.dvst .lbsg{display:none!important}#lbBox a.dv>.lbseal{position:absolute;right:92px;top:50%;width:120px;height:64px;transform:translateY(-50%);z-index:0}'+
'.lbseal .s8sg{left:0;top:8px;width:92px;height:44px;transform:rotate(-5deg);opacity:.9}.lbseal .s8st{right:0;top:2px;width:58px;height:58px;transform:rotate(-12deg);opacity:.88}.lbseal:not(:has(.s8sg)) .s8st{right:20px}#lbBox a.dv.dvst>*:not(.seal128){position:relative;z-index:1}'+
'.dvsealbox{position:relative}.dvsealbox>h1,.dvsealbox>h1+p{padding-right:118px}.dvseal{position:absolute;right:0;top:-6px;width:124px;height:84px;z-index:1}.dvseal .s8sg{left:0;top:18px;width:100px;height:48px;transform:rotate(-5deg)}.dvseal .s8st{right:0;top:4px;width:70px;height:70px;transform:rotate(-12deg);opacity:.9}'+
'.sgl .s .rowseal{flex:none;width:150px;height:48px}.rowseal .s8sg{left:0;top:2px;width:118px;height:44px}.rowseal .s8st{right:0;top:-4px;width:52px;height:52px;transform:rotate(-12deg);opacity:.9}.sgl .s img{background:transparent!important}'+
'#lbBox a.dv.signed128{opacity:.55}#lbBox a.dv.signed128 .lbck{background:transparent!important;border:0!important;width:auto!important;font-size:11px;font-weight:700;color:var(--sub);white-space:nowrap}#lbBox a.dv.signed128 .lbck:before{content:"받음";}#lbBox a.dv.signed128 .lbck:after{display:none!important}';document.head.appendChild(st);})();

state.lbSt=null;
if(window.MutationObserver)new MutationObserver(function(){if(!state.lbSt)return;var need=false;[].forEach.call(document.querySelectorAll('#lbBox a.dv:not([data-st8])'),function(a){a.dataset.st8=1;need=true;});if(need){lbStMark128();if(state.lbSel)lbSelPaint128();}}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});

/* 로그인 안 한 서명자: 도장 찍으려면 로그인 */
function stLogin128(){if(BE.user)return;var h='<div class="stlg"><b>도장도 찍으려면 로그인해 주세요</b><span>로그인하면 내 도장 · 서명이 바로 들어가요. 처음이면 가입하면 도장이 자동으로 만들어져요.</span><div><button class="btn btn-pri" type="button" data-stlogin="login">로그인하고 도장 찍기</button><button class="btn btn-line" type="button" data-stlogin="signup">가입하기</button></div></div>';
  if(cur()==='signs'){var mb=document.getElementById('sbMine');if(mb&&!mb.dataset.lg){mb.dataset.lg=1;mb.innerHTML=h;}}
  if(cur()==='sign'){var r=document.getElementById('stMineRow');if(r&&!r.dataset.lg){r.dataset.lg=1;r.innerHTML=h;var d=r.closest('details');if(d)d.open=true;}}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-stlogin]');if(!b)return;e.preventDefault();state.after=location.hash.replace(/^#/,'');try{sessionStorage.setItem('dtdo.after',JSON.stringify({h:state.after,t:Date.now()}));}catch(_){}location.hash='#'+b.dataset.stlogin;});
var _after128L=after;after=function(){_after128L();if(cur()==='signs'||cur()==='sign'){setTimeout(stLogin128,200);setTimeout(stLogin128,900);}
  if(BE.user&&!state.after){try{var a=JSON.parse(sessionStorage.getItem('dtdo.after')||'null');if(a&&cur()==='profile'){sessionStorage.removeItem('dtdo.after');if(Date.now()-a.t<1800000)location.hash='#'+a.h;}}catch(_){}}};
(function(){var st=document.createElement('style');st.textContent='.stlg{display:flex;flex-direction:column;gap:6px;border:1px dashed var(--sea);border-radius:12px;padding:12px 14px;margin:2px 0}.stlg span{font-size:13px;color:var(--sub)}.stlg>div{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}.stlg .btn{min-height:40px}';document.head.appendChild(st);})();

/* ---------- 홈 화면 추가 안내: 이미 했으면 다시 안 띄우기 ---------- */
function a2Done128(){try{if((window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone){localStorage.setItem('dtdo.installed','1');return true;}return localStorage.getItem('dtdo.installed')==='1';}catch(e){return false;}}
a2Done128();
function a2hsOn127(){return !a2Done128();}
function installBar(){if(a2Done128())return;try{if(sessionStorage.getItem('dtdo.viaLink'))return;}catch(e){}var h=location.hash||'';if(/^#signs?-|^#sb/.test(h)||/^\/(s|sb)\//.test(location.pathname))return;
  try{var n=+localStorage.getItem('dtdo.visits')||0;if(n<2||+localStorage.getItem('dtdo.instHide')>Date.now())return;}catch(e){return;}if(document.getElementById('instBar'))return;
  var ios=/iphone|ipad|ipod/i.test(navigator.userAgent)&&!/crios|fxios/i.test(navigator.userAgent);if(!DEFER&&!ios)return;
  var b=document.createElement('div');b.id='instBar';b.innerHTML='<img src="/icon-192.png" alt="" width="36" height="36"><span><b>앱처럼 쓰기</b><br><small>홈 화면에 놓고 바로 열어요</small></span><button type="button" class="btn btn-pri" id="instGo">설치</button><button type="button" class="instx" id="instX" aria-label="닫기">✕</button>';document.body.appendChild(b);
  var hide=function(d){try{localStorage.setItem('dtdo.instHide',Date.now()+d*864e5);}catch(e){}b.remove();};
  document.getElementById('instX').onclick=function(){hide(60);};
  document.getElementById('instGo').onclick=function(){if(DEFER){DEFER.prompt();DEFER.userChoice.then(function(c){if(c&&c.outcome==='accepted')try{localStorage.setItem('dtdo.installed','1');}catch(e){}}).finally(function(){DEFER=null;b.remove();});return;}
    hide(365);sheet('<h2 style="margin:0 0 10px">홈 화면에 추가하기</h2><ol style="margin:0;padding-left:20px;line-height:1.9"><li>사파리 아래쪽 <b>공유</b> 버튼(네모에 위 화살표)을 눌러요</li><li><b>홈 화면에 추가</b>를 골라요</li><li>오른쪽 위 <b>추가</b>를 누르면 끝</li></ol><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button class="btn btn-pri" type="button" data-a2ok>이미 추가했어요</button><button class="btn btn-line" type="button" onclick="closeSheet()">닫기</button></div>');};}
window.addEventListener('appinstalled',function(){try{localStorage.setItem('dtdo.installed','1');}catch(e){}var b=document.getElementById('instBar');if(b)b.remove();});
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-a2ok]')){try{localStorage.setItem('dtdo.installed','1');}catch(_){}closeSheet();toast('다시 안 띄울게요');}});
var _after128I=after;after=function(){_after128I();if(/^(sign|signs)$/.test(cur())){var b=document.getElementById('instBar');if(b)b.remove();}};
var _a2s128=a2hsSheet127;a2hsSheet127=function(){_a2s128.apply(this,arguments);var s=document.querySelectorAll('.a2s'),l=s[s.length-1];if(l&&!document.querySelector('[data-a2ok]'))l.insertAdjacentHTML('afterend','<div style="text-align:right;margin-top:10px"><button class="btn btn-line" type="button" data-a2ok>이미 추가했어요</button></div>');};
/* 카톡 · 공유 링크로 들어온 방문에선 설치 안내 안 띄우기 (사파리는 홈 화면 앱과 저장소가 달라서 이미 추가했는지 알 수 없어요) */
(function(){try{var h=location.hash||'',q=location.search||'';if(/[?&]from=/.test(q)||/^#(signs?|meet-d|club|inv|buddy|inst)/.test(h)||/[?&](buddy|inst|ref)=/.test(q)||/KAKAOTALK|Instagram|FBAN|Line\//i.test(navigator.userAgent)||/kakao|instagram|facebook|naver/i.test(document.referrer||''))sessionStorage.setItem('dtdo.viaLink','1');}catch(e){}})();

/* ---------- 서명 · 도장: 강사가 서명만 / 도장만 / 둘 다 골라서 ---------- */
function usePick128(px,m){var hs=!!(m&&m.has&&m.image),hg=!!(m&&m.sign&&m.sign_image);
  return '<div class="use8" data-px="'+px+'"><b>넣을 것</b><div class="use8r">'+
   '<label class="use8c"><input type="checkbox" id="'+px+'_usg" checked><span>서명</span>'+(hg?'<img src="'+esc(m.sign_image)+'" alt="">':'')+'</label>'+
   (hs?'<label class="use8c"><input type="checkbox" id="'+px+'_ust" checked><span>'+(m.ok?'강사 ':'')+'도장</span><img src="'+esc(m.image)+'" alt=""></label>':'')+'</div>'+
   '<p class="small" style="margin:6px 0 0">'+(hg?'아래 칸을 비워 두면 저장한 서명이 들어가요.':'서명은 아래 칸에 해 주세요.')+(hs?'':' 도장은 <a href="#stamp">내 도장</a>에서 만들어요.')+'</p></div>';}
function usePad128(px){var g=document.getElementById(px+'_usg'),on=!g||g.checked,c=document.getElementById(px==='sb'?'sbPad':'sgPad');if(!c)return;c.style.display=on?'':'none';var w=c.previousElementSibling;if(w&&(w.classList.contains('sbpw')||w.querySelector&&w.querySelector('[data-sbclr],[data-sgclr]')))w.style.display=on?'':'none';}
document.addEventListener('change',function(e){var w=e.target.closest&&e.target.closest('.use8');if(w)usePad128(w.dataset.px);});
/* 한 번에 서명 페이지 */
sbInit128=(function(old){return function(){var mb=document.getElementById('sbMine');if(mb)mb.dataset.on=1;old();if(mb&&BE.user&&!mb.dataset.u8){mb.dataset.u8=1;stMine(function(s){mb.dataset.on=1;mb.dataset.has=s&&(s.has||s.sign)?1:'';if(!s||!(s.has||s.sign)){mb.innerHTML='';return;}var r=document.getElementById('sb_r');if(r&&!s.ok)r.value='buddy';mb.innerHTML=usePick128('sb',s);usePad128('sb');});}};})(sbInit128);
document.addEventListener('submit',function(e){if(e.target.id!=='sbForm')return;e.preventDefault();e.stopImmediatePropagation();var f=e.target,t=f.dataset.t,n=(val('sb_n')||'').trim(),c=document.getElementById('sbPad'),g=document.getElementById('sb_usg'),s=document.getElementById('sb_ust'),
   ug=g?g.checked:true,us=!!(s&&s.checked),ink=ug&&c&&c.dataset.ink,mb=document.getElementById('sbMine'),row=!!(BE.user&&mb&&mb.dataset.has),hasSg=!!(g&&g.parentNode.querySelector('img'));
  if(!n)return toast('이름을 적어 주세요');if(!ug&&!us)return toast('서명이나 도장 중 하나는 골라 주세요');if(ug&&!ink&&!hasSg)return toast('아래 칸에 서명해 주세요');
  var b=f.querySelector('button[type=submit]');b.disabled=true;
  BE.sb.rpc('sign_batch_submit2',{p_id:t,p_name:n,p_role:val('sb_r'),p_cert:(val('sb_c')||'').trim()||null,p_sig:ink?c.toDataURL('image/png'):null,p_mine:row&&(us||!ink),p_use_stamp:us,p_use_sign:ug}).then(function(r){var x=r.data;if(Array.isArray(x))x=x[0];b.disabled=false;if(r.error||!x)return toast('서명하지 못했어요. 다시 해 주세요');
    if(!x.ok){var E=(typeof STERR!=='undefined'&&STERR[x.err])||'서명하지 못했어요';return toast(E);}delete state.sbD[t];toast(x.ok+'개에 '+(ug&&us?'서명 · 도장':us?'도장':'서명')+'을 넣었어요'+(x.ok<x.total?' ('+(x.total-x.ok)+'개는 못 했어요)':''));rerender();});},true);
/* 한 개 서명 페이지 */
sgMine127=function(){if(cur()!=='sign'||!BE.user)return;stMine(function(m){var r=document.getElementById('stMineRow');if(!r||r.querySelector('.use8'))return;if(!m||!(m.has||m.sign))return;r.dataset.s127=1;r.innerHTML=usePick128('sg',m);var d=r.closest('details');if(d){d.open=true;var sm=d.querySelector('summary');if(sm)sm.textContent='서명 · 도장 고르기';}usePad128('sg');});};
var _after128U=after;after=function(){_after128U();if(cur()==='sign'){[300,1000,2200].forEach(function(ms){setTimeout(sgMine127,ms);});}};
if(typeof STERR==='object'){STERR.none='서명이나 도장 중 하나는 골라 주세요';STERR.login='도장을 찍으려면 로그인해 주세요';}
(function(){var st=document.createElement('style');st.textContent='.use8{border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:2px 0}.use8>b{font-size:13px}.use8r{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}.use8c{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:10px;padding:8px 12px;cursor:pointer;min-height:44px}.use8c:has(input:checked){border-color:var(--sea);background:color-mix(in srgb,var(--sea) 12%,transparent)}.use8c img{height:30px;max-width:80px;object-fit:contain;background:#fff;border-radius:4px}.use8c input{width:18px;height:18px}';document.head.appendChild(st);})();

function sgSubmit128(e,f,id){e.preventDefault();e.stopImmediatePropagation();var t=f.dataset.t,c=document.getElementById('sgPad'),n=(val('sg_n')||'').trim(),g=document.getElementById('sg_usg'),s=document.getElementById('sg_ust'),ug=g?g.checked:true,us=!!(s&&s.checked),ink=ug&&c&&c.dataset.ink,hasSg=!!(g&&g.parentNode.querySelector('img'));
  if(!n)return toast('이름을 적어 주세요');if(!ug&&!us)return toast('서명이나 도장 중 하나는 골라 주세요');if(ug&&!ink&&!hasSg)return toast('아래 칸에 서명해 주세요');
  var b=f.querySelector('button[type=submit]');if(b)b.disabled=true;
  BE.sb.rpc('sign_submit3',{p_token:t,p_name:n,p_role:val('sg_r'),p_cert:val('sg_c'),p_sig:ink?c.toDataURL('image/png'):null,p_mine:us||!ink,p_use_stamp:us,p_use_sign:ug}).then(function(r){var v=r.data;if(r.error||v!=='ok'){if(b)b.disabled=false;return toast((typeof STERR==='object'&&STERR[v])||'서명하지 못했어요. 다시 해 주세요');}
    var w=ug&&us?'서명 · 도장':us?'도장':'서명';if(id==='sgFormH'){var x=state.sgNow;if(x){x.done=true;delete state.sg[x.id];}closeSheet();toast(n+' 님 '+w+'을 받았어요');if(x)sgLoad(x.id);}else{if(state.sgT)delete state.sgT[t];toast(w+'을 넣었어요. 고마워요!');rerender();}});}
/* 폼 실패 이유 기록 (개인정보 없이 짧은 코드만) */
function ferr128(e){var m=String((e&&(e.message||e.error_description||e.msg))||e||'').toLowerCase();
  if(/already|registered|exists|duplicate/.test(m))return 'dup';if(/password/.test(m))return 'pw';if(/rate|too many|429/.test(m))return 'rate';if(/fetch|network|timeout|load failed/.test(m))return 'net';if(/confirm/.test(m))return 'confirm';if(/email/.test(m))return 'email';if(/required|invalid|입력|확인/.test(m))return 'val';return 'etc';}
if(BE.submit){var _sub128=BE.submit;BE.submit=function(id){var r=_sub128.apply(this,arguments);if(r&&r.then)return r.then(null,function(e){try{if(typeof fev==='function')fev(id,'e:'+ferr128(e));}catch(_){}throw e;});return r;};}
/* 관리자 · 표: 화면보다 넓은 표는 그 칸 안에서만 옆으로 밀리게 */
(function(){var st=document.createElement('style');st.textContent='#main .view .panel,#main .view>div,#main .view section{min-width:0}.tblw8{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}#main .view table th,#main .view table td{vertical-align:top}'+
 '.aig2{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))!important}.aig2>*{min-width:0}#ceBox td:nth-child(1),#ceBox td:nth-child(2),#ceBox th{white-space:nowrap}#ceBox td:nth-child(3){min-width:220px;word-break:break-all}';document.head.appendChild(st);})();

function tblWrap128(){[].forEach.call(document.querySelectorAll('#main .view table'),function(tb){var p=tb.parentElement;if(!p||p.classList.contains('tblw8'))return;var ox=getComputedStyle(p).overflowX;if(ox==='auto'||ox==='scroll')return;var w=document.createElement('div');w.className='tblw8';p.insertBefore(w,tb);w.appendChild(tb);});}
var _after128T=after;after=function(){_after128T();tblWrap128();setTimeout(tblWrap128,600);setTimeout(tblWrap128,2000);};
if(window.MutationObserver)new MutationObserver(function(){if(document.querySelector('#main .view table:not(.tblw8 > table)'))tblWrap128();}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
