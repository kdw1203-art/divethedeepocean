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
