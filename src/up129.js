/* ===== up129: 올해 다이빙 결산 · 다른 앱에서 옮기기 · 교육생 관리 · 투어 모집 · 시즌 달력 · 정비 맡길 곳 ===== */
function L129(k,e){return (typeof LANG!=='undefined'&&LANG==='en')?e:k;}
function wn129(n){return (+n||0).toLocaleString('ko-KR');}

/* ---------- 1) 올해 다이빙 결산 (#year) ---------- */
function yrData129(cb){
  if(BE.on&&BE.user){if(state.yr129)return cb(state.yr129);
    BE.sb.from('dive_logs').select('id,dive_date,site,spot,minutes,max_depth,water_temp,species,buddy,discipline').eq('owner',BE.user.id).order('dive_date').limit(3000).then(function(r){state.yr129=(r.data||[]).map(function(l){return {date:l.dive_date||'',site:l.site||'',spot:l.spot||'',min:+l.minutes||0,dep:+l.max_depth||0,temp:l.water_temp!=null?+l.water_temp:null,sp:l.species||[],buddy:l.buddy||''};});cb(state.yr129);});return;}
  cb((state.userLogs||[]).map(function(l){return {date:l.date||l.dive_date||'',site:l.site||'',spot:l.spot||'',min:+(l.time||l.minutes)||0,dep:+(l.depth||l.max_depth)||0,temp:null,sp:l.species||[],buddy:l.buddy||''};}));}
function yrStat129(A,yr){var Y=A.filter(function(l){return String(l.date).slice(0,4)===String(yr);});if(!Y.length)return null;
  var before={};A.forEach(function(l){if(String(l.date).slice(0,4)<String(yr)){if(l.spot)before['s:'+l.spot]=1;if(l.site)before['n:'+l.site]=1;}});
  var S={n:Y.length,min:0,days:{},deep:Y[0],long:Y[0],sites:{},cty:{},fresh:{},mo:new Array(12).fill(0),sp:{},bud:{},t:[]};
  Y.forEach(function(l){S.min+=l.min;S.days[l.date]=1;if(l.dep>S.deep.dep)S.deep=l;if(l.min>S.long.min)S.long=l;var nm=l.site||(l.spot&&spot(l.spot)?spot(l.spot).name:'');if(nm)S.sites[nm]=(S.sites[nm]||0)+1;
    var s=l.spot&&typeof spot==='function'?spot(l.spot):null;if(s&&s.country)S.cty[s.country]=1;var k=l.spot?'s:'+l.spot:(l.site?'n:'+l.site:'');if(k&&!before[k])S.fresh[k]=1;
    var m=+String(l.date).slice(5,7);if(m>=1&&m<=12)S.mo[m-1]++;(l.sp||[]).forEach(function(x){if(x)S.sp[x]=(S.sp[x]||0)+1;});String(l.buddy||'').split(/[,·\/]+/).forEach(function(b){b=b.trim();if(b)S.bud[b]=1;});if(l.temp!=null&&isFinite(l.temp))S.t.push(l.temp);});
  S.top=Object.keys(S.sites).sort(function(a,b){return S.sites[b]-S.sites[a];});S.spTop=Object.keys(S.sp).sort(function(a,b){return S.sp[b]-S.sp[a];});
  var bm=0;S.mo.forEach(function(v,i){if(v>S.mo[bm])bm=i;});S.best=bm;S.first=Y[0].date;S.last=Y[Y.length-1].date;
  S.depAvg=Y.filter(function(l){return l.dep;}).reduce(function(a,l,i,B){return a+l.dep/B.length;},0);return S;}
function hm129(m){return Math.floor(m/60)+L129('시간 ','h ')+(m%60)+L129('분','m');}

function yrSlides129(yr,S){var W=1080,H=1350,C=IGC.ocean,out=[];
  function base(i){var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');igBg(x,'ocean');igT(x,yr+' DIVE YEAR',60,110,30,800,C.ac);igFoot(x,C,i,5);return [c,x];}
  function card(x,X,Y,w,h,lab,val,sub){x.fillStyle=C.card;igRR(x,X,Y,w,h,30);x.fill();igT(x,lab,X+34,Y+60,28,500,C.sub);igT(x,val,X+34,Y+140,60,800,C.ink,'left',w-60);if(sub)igT(x,sub,X+34,Y+190,26,500,C.sub,'left',w-60);}
  var a=base(0),x=a[1];igT(x,L129('올해의 바다','My year underwater'),60,220,86,800,C.ink);
  igT(x,S.n+'',60,560,260,800,C.ac);igT(x,L129('번 들어갔어요','dives this year'),60,650,48,700,C.ink);
  card(x,60,760,470,220,L129('물속 시간','Bottom time'),hm129(S.min));card(x,550,760,470,220,L129('다이빙한 날','Dive days'),Object.keys(S.days).length+L129('일',' days'));
  igT(x,L129('첫 다이브 ','First ')+S.first+'   ·   '+L129('마지막 ','Last ')+S.last,60,1060,30,500,C.sub);out.push(a[0]);
  a=base(1);x=a[1];igT(x,L129('가장 깊고, 가장 길게','Deepest & longest'),60,220,72,800,C.ink);
  card(x,60,300,960,240,L129('최대 수심','Max depth'),(S.deep.dep||0)+'m',[S.deep.site,S.deep.date].filter(Boolean).join(' · '));
  card(x,60,570,960,240,L129('가장 긴 다이브','Longest dive'),(S.long.min||0)+L129('분',' min'),[S.long.site,S.long.date].filter(Boolean).join(' · '));
  card(x,60,840,470,220,L129('평균 최대 수심','Avg max depth'),S.depAvg?S.depAvg.toFixed(1)+'m':'—');
  card(x,550,840,470,220,L129('수온','Water temp'),S.t.length?Math.min.apply(null,S.t)+'~'+Math.max.apply(null,S.t)+'℃':'—');out.push(a[0]);
  a=base(2);x=a[1];igT(x,L129('다녀온 바다','Where I dived'),60,220,72,800,C.ink);
  card(x,60,300,300,220,L129('포인트','Sites'),S.top.length+'');card(x,390,300,300,220,L129('나라','Countries'),Object.keys(S.cty).length+'');card(x,720,300,300,220,L129('처음 간 곳','New'),Object.keys(S.fresh).length+'');
  igT(x,L129('가장 많이 간 곳','Most visited'),60,610,30,500,C.sub);S.top.slice(0,4).forEach(function(n,i){var Y0=650+i*120;x.fillStyle=C.card;igRR(x,60,Y0,960,100,24);x.fill();igT(x,(i+1)+'',100,Y0+66,40,800,C.ac);igT(x,n,170,Y0+64,40,700,C.ink,'left',680);igT(x,S.sites[n]+L129('회',''),990,Y0+64,36,700,C.sub,'right');});out.push(a[0]);
  a=base(3);x=a[1];igT(x,L129('달마다 다이브','Dives by month'),60,220,72,800,C.ink);
  igT(x,L129('가장 많이 들어간 달','Busiest month'),60,320,30,500,C.sub);igT(x,(S.best+1)+L129('월','')+(typeof LANG!=='undefined'&&LANG==='en'?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][S.best]:'')+'  ·  '+S.mo[S.best]+L129('회',' dives'),60,410,64,800,C.ink);
  var mm=Math.max.apply(null,S.mo)||1;S.mo.forEach(function(v,i){var h=v/mm*520,X0=60+i*80;x.fillStyle=v?(i===S.best?'#f6a04d':C.ac):'rgba(255,255,255,.12)';igRR(x,X0,1160-h-6,66,h+6,12);x.fill();if(v)igT(x,v+'',X0+33,1150-h-18,26,700,C.ink,'center');igT(x,(i+1)+'',X0+33,1210,26,600,C.sub,'center');});out.push(a[0]);
  a=base(4);x=a[1];igT(x,L129('함께한 바다','Who & what I met'),60,220,72,800,C.ink);
  card(x,60,300,470,220,L129('기록한 생물','Species logged'),S.spTop.length+L129('종',''));card(x,550,300,470,220,L129('함께한 버디','Buddies'),Object.keys(S.bud).length+L129('명',''));
  if(S.spTop.length){igT(x,L129('가장 자주 만난 생물','Most seen'),60,610,30,500,C.sub);S.spTop.slice(0,3).forEach(function(n,i){igT(x,'·  '+n,60,680+i*70,44,700,C.ink,'left',960);});}
  igT(x,L129('다음 바다에서 만나요','See you in the next ocean'),60,1080,56,800,C.ac);igT(x,'divedeepocean.com',60,1150,32,600,C.sub);out.push(a[0]);
  return out;}

V.year=function(arg){setTitle(L129('올해 다이빙 결산','Dive year in review'));var now=new Date(Date.now()+9*36e5),yr=+arg||(now.getUTCMonth()===0?now.getUTCFullYear()-1:now.getUTCFullYear());state.yr129y=yr;
  setTimeout(yrPaint129,0);
  return '<div class="vh"><div><a class="small" href="#log">← '+L129('내 로그북','My logbook')+'</a><h1>'+yr+' '+L129('다이빙 결산','dive year')+'</h1><p>'+L129('한 해 기록을 사진 5장으로 만들어 공유해요','Five images that sum up your year')+'</p></div></div><div id="yr129"><div class="panel"><p class="small" style="margin:0">'+L129('불러오는 중…','Loading…')+'</p></div></div>';};
function yrPaint129(){var box=document.getElementById('yr129');if(!box)return;var yr=state.yr129y;
  yrData129(function(A){if(!document.getElementById('yr129'))return;var ys={};A.forEach(function(l){var y=String(l.date).slice(0,4);if(/^\d{4}$/.test(y))ys[y]=1;});var YS=Object.keys(ys).sort().reverse();
    var chips=YS.length>1?'<div class="chips" style="margin-bottom:10px">'+YS.map(function(y){return '<a class="chip" href="#year-'+y+'" aria-pressed="'+(+y===yr)+'">'+y+'</a>';}).join('')+'</div>':'';
    var S=yrStat129(A,yr);
    if(!S){box.innerHTML=chips+'<div class="panel empty-big"><b>'+yr+L129('년 다이브가 아직 없어요',': no dives yet')+'</b><p class="small">'+L129('로그를 남기거나 다이브 컴퓨터 파일을 가져오면 결산이 만들어져요.','Log dives or import files to build your review.')+'</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="btn btn-pri" href="#logimport">'+L129('파일 가져오기','Import')+'</a><a class="btn btn-line" href="#log">'+L129('로그 쓰기','Log a dive')+'</a></div></div>';return;}
    var k=[[L129('다이브','Dives'),S.n+L129('회','')],[L129('물속 시간','Bottom time'),hm129(S.min)],[L129('최대 수심','Max depth'),(S.deep.dep||0)+'m'],[L129('포인트','Sites'),S.top.length+L129('곳','')],[L129('처음 간 곳','New sites'),Object.keys(S.fresh).length+L129('곳','')],[L129('기록한 생물','Species'),S.spTop.length+L129('종','')]];
    box.innerHTML=chips+'<div class="panel"><div class="yr129k">'+k.map(function(x){return '<div><span class="small">'+x[0]+'</span><b>'+x[1]+'</b></div>';}).join('')+'</div></div>'+
      '<div class="panel"><div class="yr129h"><h2 style="margin:0">'+L129('결산 이미지 5장','5 images')+'</h2><button class="btn btn-pri" type="button" id="yr129Share">'+L129('모두 공유 · 저장','Share all')+'</button></div><div class="yr129g" id="yr129G"></div><p class="small" style="margin:8px 0 0">'+L129('인스타그램 게시물 비율(4:5)이에요. 이미지를 누르면 한 장씩 저장돼요.','4:5 Instagram ratio. Tap an image to save it.')+'</p></div>';
    var C=yrSlides129(yr,S),F=[],g=document.getElementById('yr129G');
    C.forEach(function(c,i){var im=document.createElement('img');im.alt=yr+' '+(i+1);im.src=c.toDataURL('image/jpeg',.85);im.tabIndex=0;g.appendChild(im);c.toBlob(function(b){F[i]=new File([b],'dive-'+yr+'-'+(i+1)+'.jpg',{type:'image/jpeg'});im.onclick=function(){yrSave129([F[i]]);};},'image/jpeg',.92);});
    document.getElementById('yr129Share').onclick=function(){var A2=F.filter(Boolean);if(A2.length<C.length)return toast(L129('이미지를 만드는 중이에요. 잠시 뒤 눌러 주세요','Still preparing…'));yrSave129(A2);};});}
function yrSave129(F){if(navigator.canShare&&navigator.canShare({files:F})){navigator.share({files:F,title:'Dive the deep ocean'}).catch(function(){});return;}F.forEach(function(f,i){setTimeout(function(){var u=URL.createObjectURL(f),a=document.createElement('a');a.href=u;a.download=f.name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},4000);},i*350);});}
/* 예전 '결산 이미지' 버튼은 새 결산 화면으로 */
document.addEventListener('click',function(e){var b=e.target.closest('[data-yrrep]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();location.hash='#year-'+b.dataset.yrrep;},true);
/* 로그가 바뀌면 다시 계산 */
if(typeof BE==='object'&&BE.pull){var _pull129=BE.pull;BE.pull=function(){state.yr129=null;return _pull129.apply(this,arguments);};}
/* 홈(12월 ~ 1월) · 로그북 · 기록 통계에서 들어가기 */
function yrEntry129(){var c=cur();if(c!=='home'&&c!=='log'&&c!=='logstats')return;var v=document.querySelector('#main .view');if(!v||document.getElementById('yrIn129'))return;
  var now=new Date(Date.now()+9*36e5),m=now.getUTCMonth(),yr=m===0?now.getUTCFullYear()-1:now.getUTCFullYear();
  if(c==='home'){if(!(m===11||m===0))return;try{if(+localStorage.getItem('dtdo.yr129')>Date.now())return;}catch(x){}
    var hasL=(state.userLogs||[]).length||(state.sacL||[]).length;if(!hasL)return;
    var d=document.createElement('div');d.id='yrIn129';d.className='panel yr129in';d.innerHTML='<a href="#year-'+yr+'"><span class="small">'+yr+' DIVE YEAR</span><b>'+L129('올해 바다, 사진 5장으로 정리했어요','Your dive year in 5 images')+'</b></a><button type="button" class="chip" data-yrhide aria-label="'+L129('일주일 숨기기','Hide for a week')+'">'+L129('닫기','Close')+'</button>';v.insertBefore(d,v.firstChild);return;}
  var vh=v.querySelector('.vh');if(!vh)return;var a=document.createElement('a');a.id='yrIn129';a.className='chip';a.href='#year-'+yr;a.textContent=yr+' '+L129('결산','year review');a.style.alignSelf='center';vh.appendChild(a);}
document.addEventListener('click',function(e){if(!e.target.closest('[data-yrhide]'))return;try{localStorage.setItem('dtdo.yr129',Date.now()+7*864e5);}catch(x){}var d=document.getElementById('yrIn129');if(d)d.remove();});

/* ---------- 2) 다른 로그북 앱에서 옮기기 · CSV 양식 ---------- */
if(typeof DEVG!=='undefined'&&Array.isArray(DEVG)){
  DEVG.push(['다른 로그북 앱 (MacDive · Diving Log · DiveMate 등)',['앱의 내보내기(Export) 메뉴에서 UDDF를 골라 저장해요.','UDDF가 없으면 CSV(엑셀)로 내보내도 돼요.','저장한 파일을 위 칸에 올리면 겹치는 다이브는 빼고 들어가요.']]);
  DEVG.push(['엑셀 · 구글 시트로 정리한 기록',['아래 "CSV 양식 받기"를 눌러 양식을 받아요.','날짜 · 포인트 · 최대 수심 · 잠수 시간 칸에 기록을 붙여 넣어요.','CSV로 저장해서 위 칸에 올려요.']]);}
function csvTpl129(){var t='﻿날짜,포인트,최대 수심(m),잠수 시간(분)\n2026-06-14,제주 서귀포 문섬·섶섬,18.4,46\n2026-06-14,제주 서귀포 문섬·섶섬,15.2,52\n',b=new Blob([t],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='divedeepocean-log-template.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},4000);}
function impTpl129(){if(cur()!=='logimport'||document.getElementById('tpl129'))return;var g=document.querySelector('#main .devg');if(!g)return;var p=document.createElement('div');p.className='panel';p.id='tpl129';
  p.innerHTML='<div class="yr129h"><div><h2 style="margin:0 0 4px">'+L129('엑셀로 정리한 기록이 있나요','Kept your log in a spreadsheet?')+'</h2><p class="small" style="margin:0">'+L129('양식에 붙여 넣고 CSV로 저장하면 한 번에 들어와요','Paste into the template, save as CSV, upload')+'</p></div><button class="btn btn-line" type="button" data-csvtpl>'+L129('CSV 양식 받기','Get CSV template')+'</button></div>';g.parentNode.insertBefore(p,g.nextSibling);}
document.addEventListener('click',function(e){if(e.target.closest('[data-csvtpl]'))csvTpl129();});

/* ---------- 3) 강사 · 교육생 관리 (#students) ---------- */
var STU_FREE129=5;
function stuLoad129(cb){if(!BE.on||!BE.user)return cb([]);if(state.stu129)return cb(state.stu129);BE.sb.rpc('my_students').then(function(r){state.stu129=r.error?[]:(r.data||[]);cb(state.stu129);});}
function daysSince129(d){if(!d)return null;return Math.floor((Date.now()-Date.parse(d+'T00:00:00+09:00'))/864e5);}
V.students=function(){setTitle(L129('교육생 관리','My students'));setTimeout(stuPaint129,0);
  return '<div class="vh"><div><a class="small" href="#profile">← '+L129('내 정보','Profile')+'</a><h1>'+L129('교육생 관리','My students')+'</h1><p>'+L129('나를 강사로 등록한 다이버의 기록 요약','Divers who added you as their instructor')+'</p></div></div><div id="stu129"><div class="panel"><p class="small" style="margin:0">'+L129('불러오는 중…','Loading…')+'</p></div></div>';};
function stuPaint129(){var box=document.getElementById('stu129');if(!box)return;
  if(!BE.on||!BE.user){box.innerHTML='<div class="panel empty-big"><b>'+L129('로그인하면 볼 수 있어요','Log in to see your students')+'</b><a class="btn btn-pri" href="#login">'+L129('로그인','Log in')+'</a></div>';return;}
  planLoad(function(){stuLoad129(function(L){if(!document.getElementById('stu129'))return;var pro=state.myPlan&&state.myPlan!=='…'&&state.myPlan.pro;
    if(!L.length){box.innerHTML='<div class="panel empty-big"><b>'+L129('아직 등록한 교육생이 없어요','No students yet')+'</b><p class="small">'+L129('교육생이 내 강사 코드를 넣으면 여기에 나와요. 강사 코드는 내 정보 → 내 강사 코드에서 보내요.','Students appear here after entering your instructor code.')+'</p><a class="btn btn-pri" href="#profile">'+L129('강사 코드 보내기','Share my code')+'</a></div>';return;}
    var A=[],act=0;L.forEach(function(s,i){var ds=daysSince129(s.last_dive),ex=s.cert_exp?Math.floor((Date.parse(s.cert_exp+'T00:00:00+09:00')-Date.now())/864e5):null;if(s.d90>0)act++;if(i>=STU_FREE129&&!pro)return;
      if(ds!=null&&ds>=180)A.push(['🔁',esc(s.nick)+L129(' · 마지막 다이브 ',' · last dive ')+ds+L129('일 전',' days ago'),L129('리프레시 교육을 권해 보세요','Suggest a refresher')]);
      if(ex!=null&&ex<=60)A.push(['🪪',esc(s.nick)+L129(' · 자격증 ',' · card ')+(ex<0?L129('만료됨','expired'):L129('만료 ','expires in ')+ex+L129('일 전',' days')),L129('갱신 안내를 보내 보세요','Remind to renew')]);});
    var K='<div class="panel"><div class="yr129k"><div><span class="small">'+L129('교육생','Students')+'</span><b>'+L.length+L129('명','')+'</b></div><div><span class="small">'+L129('최근 90일 다이브','Active 90d')+'</span><b>'+act+L129('명','')+'</b></div><div><span class="small">'+L129('챙길 일','To follow up')+'</span><b>'+A.length+L129('건','')+'</b></div></div></div>';
    var AL=A.length?'<div class="panel"><h2>'+L129('챙길 일','Follow-ups')+'</h2><div class="list">'+A.map(function(a){return '<div class="item"><div class="it129"><b>'+a[0]+' '+a[1]+'</b><span class="small">'+a[2]+'</span></div></div>';}).join('')+'</div></div>':'';
    var R='<div class="panel"><h2>'+L129('교육생 목록','Students')+'</h2><div class="stu129l">'+L.map(function(s,i){var lock=i>=STU_FREE129&&!pro,ds=daysSince129(s.last_dive);
      return '<div class="stu129c'+(lock?' lock':'')+'"><div class="stu129t"><b>'+esc(s.nick)+'</b><span class="small">'+esc(s.cert||L129('자격 미입력','No cert'))+'</span></div>'+(lock?'<span class="small">'+L129('프로에서 볼 수 있어요','Available on Pro')+'</span>':
        '<div class="stu129s"><span><em>'+L129('다이브','Dives')+'</em>'+wn129(s.dives)+'</span><span><em>'+L129('최근','Last')+'</em>'+(s.last_dive?(ds<=0?L129('오늘','today'):ds+L129('일 전','d ago')):'—')+'</span><span><em>'+L129('최대','Max')+'</em>'+(s.max_depth!=null?s.max_depth+'m':'—')+'</span><span><em>'+L129('내 도장','My stamps')+'</em>'+wn129(s.stamped)+'</span></div><button class="chip" type="button" data-stu129="'+esc(s.id)+'" data-nick="'+esc(s.nick)+'">'+L129('최근 로그 보기','Recent dives')+'</button>')+'</div>';}).join('')+'</div>'+
      (!pro&&L.length>STU_FREE129?'<div class="stu129pro"><span>'+L129('무료는 교육생 '+STU_FREE129+'명까지 자세히 보여요','Free plan shows '+STU_FREE129+' students in detail')+'</span><a class="btn btn-pri" href="#pay" data-ptpro="1">'+L129('프로 신청','Go Pro')+'</a></div>':'')+
      '<p class="small" style="margin:10px 0 0">'+L129('교육생이 나를 강사로 등록했을 때만 보여요. 다이브 횟수 · 날짜 · 포인트 · 수심만 보이고, 메모 · 사진 · 개인정보는 보이지 않아요.','Shown only for divers who added you. Counts, dates, sites and depths only.')+'</p></div>';
    box.innerHTML=K+AL+R;});});}
document.addEventListener('click',function(e){var b=e.target.closest('[data-stu129]');if(!b)return;var id=b.dataset.stu129,nk=b.dataset.nick||'';
  sheet('<h2 style="margin:0 0 8px">'+esc(nk)+' · '+L129('최근 로그','Recent dives')+'</h2><div id="stuD129"><p class="small">'+L129('불러오는 중…','Loading…')+'</p></div><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn btn-line" type="button" onclick="closeSheet()">'+L129('닫기','Close')+'</button></div>');
  BE.sb.rpc('student_dives',{p_student:id}).then(function(r){var el=document.getElementById('stuD129');if(!el)return;var D=r.error?[]:(r.data||[]);
    el.innerHTML=D.length?'<div class="list">'+D.map(function(d){return '<div class="item"><div class="it129"><b>'+esc(d.site||L129('포인트 미입력','No site'))+'</b><span class="small">'+esc(d.dive_date||'')+(d.max_depth!=null?' · '+d.max_depth+'m':'')+(d.minutes?' · '+d.minutes+L129('분',' min'):'')+'</span></div>'+(d.by_me?'<span class="tag tag-sea">'+L129('내 도장','My stamp')+'</span>':'')+'</div>';}).join('')+'</div>':'<p class="small">'+L129('아직 로그가 없어요','No dives yet')+'</p>';});});
/* 내 정보: 교육생 관리 들어가기 · 교육생 쪽 안내 */
function stuEntry129(){if(cur()!=='profile')return;var L=state.lp||state.lk||[];
  var d=document.getElementById('myDivers');if(d&&!d.dataset.s129&&L.some(function(x){return x.kind==='student';})){d.dataset.s129=1;var a=document.createElement('a');a.className='btn btn-line';a.href='#students';a.style.cssText='width:100%;justify-content:center;margin-top:10px';a.textContent=L129('교육생 관리 · 챙길 일 보기','Manage students');d.appendChild(a);}
  var p=document.getElementById('lkPanel');if(p&&!p.dataset.s129&&L.some(function(x){return x.kind==='instructor';})){p.dataset.s129=1;var n=document.createElement('p');n.className='small';n.style.margin='8px 0 0';n.textContent=L129('등록한 강사는 내 다이브 횟수 · 날짜 · 포인트 · 수심을 볼 수 있어요. 메모 · 사진은 보이지 않아요.','Your instructor can see dive counts, dates, sites and depths.');p.appendChild(n);}}

/* ---------- 4) 투어 · 동행 모집 ---------- */
function canTour129(){var m=state.me||{};if(m.admin)return true;if(/강사|instructor|트레이너|trainer|코스 ?디렉터|course director/i.test(String(m.cert||'')))return true;return !!(state.stMine&&state.stMine.code);}
if(typeof M4K!=='undefined'&&M4K.indexOf('투어')<0)M4K.push('투어');
if(typeof FORMS==='object'&&FORMS.meet){(function(){var F=FORMS.meet.steps[0].f,kf=F.filter(function(f){return f.k==='kind';})[0];
  if(kf&&Array.isArray(kf.opts)){var base=kf.opts.slice();kf.opts=function(){return base.concat(canTour129()?['투어']:[]).map(function(o){return [o,o];});};}
  if(!F.some(function(f){return f.k==='fee';})){var i=F.findIndex(function(f){return f.k==='max';});F.splice(i<0?F.length:i+1,0,{k:'fee',type:'number',l:'1인 비용 (원 · 투어는 꼭 적어 주세요)',ph:'예: 450000'});}})();}
if(typeof BE==='object'&&BE.submit){var _sub129=BE.submit;BE.submit=function(id,v){var p=_sub129.apply(this,arguments);if(id!=='meet'||!v||!(+v.fee>0)||!p||!p.then)return p;
  return p.then(function(r){var m=String(r||'').match(/^meet-d(\d+)$/);if(!m)return r;return BE.sb.from('meetups').update({fee_per:Math.round(+v.fee)}).eq('id',+m[1]).then(function(){return r;},function(){return r;});});};}
function tourSpot129(s){s=String(s||'');if(s.indexOf('a:')===0){var p=s.slice(2).split('|');return {name:(p[1]||'')+(p[0]?' · '+p[0]:''),cty:p[0]||''};}var o=typeof spot==='function'?spot(s):null;return {name:o?o.name:s,cty:o?o.country:''};}
V.tours=function(){setTitle(L129('투어 · 동행 모집','Dive trips'));setTimeout(tourPaint129,0);
  return '<div class="vh"><div><a class="small" href="#community">← '+L129('모임','Meetups')+'</a><h1>'+L129('투어 · 동행 모집','Dive trips')+'</h1><p>'+L129('강사 · 센터가 여는 다이빙 투어','Trips hosted by instructors and centers')+'</p></div>'+(canTour129()?'<a class="btn btn-pri" href="#meet">'+L129('투어 열기','Host a trip')+'</a>':'')+'</div><div id="tour129"><div class="panel"><p class="small" style="margin:0">'+L129('불러오는 중…','Loading…')+'</p></div></div>';};
function tourPaint129(){var box=document.getElementById('tour129');if(!box)return;if(!BE.on){box.innerHTML='<div class="panel empty-big"><b>'+L129('모집 중인 투어가 없어요','No trips yet')+'</b></div>';return;}
  var today=new Date(Date.now()+9*36e5).toISOString().slice(0,10);
  BE.sb.from('meetups').select('id,title,spot,meet_date,max_people,fee_per,min_cert,closed').eq('kind','투어').gte('meet_date',today).order('meet_date').limit(60).then(function(r){var T=(r.data||[]).filter(function(m){return !m.closed;});if(!document.getElementById('tour129'))return;
    if(!T.length){box.innerHTML='<div class="panel empty-big"><b>'+L129('모집 중인 투어가 없어요','No open trips')+'</b><p class="small">'+L129('강사 · 센터 운영자는 모임 만들기에서 종류를 "투어"로 고르면 여기에 올라와요.','Instructors can host a trip from "Create meetup".')+'</p>'+(canTour129()?'<a class="btn btn-pri" href="#meet">'+L129('투어 열기','Host a trip')+'</a>':'<a class="btn btn-line" href="#community">'+L129('모임 보기','See meetups')+'</a>')+'</div>';return;}
    BE.sb.from('meetup_members').select('meetup_id').in('meetup_id',T.map(function(m){return m.id;})).then(function(q){var N={};(q.data||[]).forEach(function(x){N[x.meetup_id]=(N[x.meetup_id]||0)+1;});
      var C={};T.forEach(function(m){var c=tourSpot129(m.spot).cty;if(c)C[c]=1;});var sel=state.tour129c||'';
      var chips=Object.keys(C).length>1?'<div class="chips" style="margin-bottom:10px">'+[['',L129('전체','All')]].concat(Object.keys(C).sort().map(function(c){return [c,c];})).map(function(c){return '<button class="chip" type="button" data-tour129c="'+esc(c[0])+'" aria-pressed="'+(sel===c[0])+'">'+esc(c[1])+'</button>';}).join('')+'</div>':'';
      box.innerHTML=chips+'<div class="panel"><div class="list">'+T.filter(function(m){return !sel||tourSpot129(m.spot).cty===sel;}).map(function(m){var sp=tourSpot129(m.spot),n=N[m.id]||0,left=m.max_people?Math.max(0,m.max_people-n):null;
        return '<a class="item" href="#meet-d'+m.id+'"><div class="it129"><b>'+esc(m.title)+'</b><span class="small">'+esc(m.meet_date||'')+' · '+esc(sp.name)+(m.min_cert&&m.min_cert!=='제한 없음'?' · '+esc(m.min_cert):'')+'</span></div><div style="text-align:right;white-space:nowrap"><b>'+(m.fee_per?wn129(m.fee_per)+L129('원','₩'):L129('비용 문의','Ask'))+'</b><span class="small" style="display:block">'+(left==null?'':left?L129('남은 자리 ','Spots left ')+left:L129('마감','Full'))+'</span></div></a>';}).join('')+'</div><p class="small" style="margin:10px 0 0">'+L129('비용 · 일정 · 환불은 주최자가 정해요. 신청 전 모임 화면의 안내를 꼭 확인해 주세요.','Hosts set fees and refund rules. Check each trip page.')+'</p></div>';});});}
document.addEventListener('click',function(e){var b=e.target.closest('[data-tour129c]');if(!b)return;state.tour129c=b.dataset.tour129c;tourPaint129();});
/* 모임 화면에 '투어 모아보기' */
function tourEntry129(){if(cur()!=='community'||state.tab&&state.tab!=='meet')return;var v=document.querySelector('#main .view .vh');if(!v||document.getElementById('tourIn129'))return;var a=document.createElement('a');a.id='tourIn129';a.className='btn btn-line';a.href='#tours';a.textContent=L129('투어 모아보기','Dive trips');a.style.alignSelf='center';v.appendChild(a);}

/* ---------- 5) 포인트 시즌 달력 (평년 수온 · 슈트) ---------- */
function tempRange129(s){var m=String(s.temp||'').match(/(-?\d+)\s*[~\-–]\s*(-?\d+)/);if(m)return [+m[1],+m[2]];var one=String(s.temp||'').match(/(-?\d+)/);return one?[+one[1],+one[1]]:null;}
function suit129(t){if(t>=29)return L129('래시가드 · 1mm','Rash · 1mm');if(t>=26)return '3mm';if(t>=23)return '5mm';if(t>=19)return '7mm';if(t>=15)return L129('7mm+후드','7mm+hood');return L129('드라이슈트','Drysuit');}
function seasonCal129(s){var R=tempRange129(s);if(!R)return '';var lo=Math.min(R[0],R[1]),hi=Math.max(R[0],R[1]),south=(+s.lat||0)<0,peak=south?2:8,In=typeof months==='function'?months(s.season):[],now=new Date(Date.now()+9*36e5).getUTCMonth()+1;
  var cells=[];for(var m=1;m<=12;m++){var d=Math.min(Math.abs(m-peak),12-Math.abs(m-peak)),t=Math.round(lo+(hi-lo)*(1+Math.cos(Math.PI*d/6))/2);cells.push([m,t,In.indexOf(m)>=0]);}
  var col=function(t){var k=Math.max(0,Math.min(1,(t-8)/22)),dk=document.documentElement.classList.contains('dk');return 'hsl('+Math.round(210-k*190)+','+(dk?'38%,':'70%,')+(dk?Math.round(17+k*9):Math.round(92-k*12))+'%)';};
  return '<div class="panel" id="sc129"><h2>'+L129('월별 시즌 달력','Season calendar')+' <span class="small">'+L129('평년 수온 추정','typical water temp')+'</span></h2><div class="sc129g" role="table" aria-label="'+L129('월별 수온과 슈트','Monthly temperature and suit')+'">'+
    cells.map(function(c){return '<div class="sc129c'+(c[2]?' in':'')+(c[0]===now?' now':'')+'" role="row" style="background:'+col(c[1])+'"><b>'+c[0]+L129('월','')+'</b><span>'+c[1]+'℃</span><em>'+suit129(c[1])+'</em>'+(c[2]?'<i>'+L129('시즌','Season')+'</i>':'')+'</div>';}).join('')+'</div><p class="small" style="margin:8px 0 0">'+L129('포인트 수온 범위('+esc(s.temp)+')로 계산한 참고값이에요. 그해 바다와 다를 수 있어요.','Estimated from the site range ('+esc(s.temp)+'). Actual conditions vary.')+'</p></div>';}
function seasonEntry129(){if(cur()!=='spot'||document.getElementById('sc129'))return;var s=spot(state.sel);if(!s)return;var h=seasonCal129(s);if(!h)return;var st=document.querySelector('#main .view .stats');var anchor=st&&(st.closest('.panel')||st);if(!anchor)return;anchor.insertAdjacentHTML('afterend',h);}

/* ---------- 6) 장비: 정비 맡길 곳 ---------- */
var BRAND129=[['Scubapro','https://www.scubapro.com'],['Aqua Lung','https://www.aqualung.com'],['Apeks','https://www.apeksdiving.com'],['Mares','https://www.mares.com'],['Cressi','https://www.cressi.com'],['TUSA','https://www.tusa.com'],['Atomic Aquatics','https://www.atomicaquatics.com'],['Shearwater','https://www.shearwater.com'],['Suunto','https://www.suunto.com'],['Garmin','https://www.garmin.com']];
function gearEntry129(){if(cur()!=='gear'||document.getElementById('gs129'))return;var v=document.querySelector('#main .view');if(!v)return;var G=state.gearL||[],mine={};
  G.forEach(function(g){var b=String(g.brand||'').toLowerCase();BRAND129.forEach(function(x){if(b&&b.indexOf(x[0].toLowerCase().split(' ')[0])>=0)mine[x[0]]=1;});});
  var due=G.filter(function(g){var s=g.served||g.bought;if(!s)return false;return (Date.now()-Date.parse(s))/864e5>=330;}).length;
  var L=BRAND129.slice().sort(function(a,b){return (mine[b[0]]?1:0)-(mine[a[0]]?1:0);});
  var p=document.createElement('div');p.className='panel';p.id='gs129';
  p.innerHTML='<h2>'+L129('정비 맡길 곳','Where to service')+(due?' <span class="tag">'+L129('정비할 때 된 장비 ','Due ')+due+L129('개','')+'</span>':'')+'</h2><p class="small" style="margin:0 0 10px">'+L129('브랜드 공식 사이트에서 가까운 공식 판매 · 정비점을 찾을 수 있어요. 오버홀은 공식 정비점에 맡겨야 보증이 이어져요.','Find authorized dealers on each brand site.')+'</p><div class="chips">'+L.map(function(x){return '<a class="chip'+(mine[x[0]]?' on':'')+'" href="'+x[1]+'" target="_blank" rel="noopener">'+esc(x[0])+(mine[x[0]]?' · '+L129('내 장비','mine'):'')+'</a>';}).join('')+'</div><div style="margin-top:10px"><a class="btn btn-line" href="#directory">'+L129('입점한 정비점 보기','Service shops on the site')+'</a></div>';
  v.appendChild(p);}

/* ---------- 화면 붙이기 ---------- */
var _after129=after;after=function(){_after129();setTimeout(function(){try{yrEntry129();impTpl129();stuEntry129();tourEntry129();seasonEntry129();gearEntry129();}catch(x){}},60);setTimeout(function(){try{stuEntry129();yrEntry129();}catch(x){}},1400);};
(function(){var st=document.createElement('style');st.textContent='.it129{display:flex;flex-direction:column;gap:2px;min-width:0}.yr129k{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.yr129k>div{display:flex;flex-direction:column;gap:2px;padding:12px;border-radius:12px;background:var(--soft,#eef4f8)}.yr129k b{font-size:20px}.yr129h{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}.yr129g{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.yr129g img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:12px;cursor:pointer;transition:transform .15s}.yr129g img:hover{transform:translateY(-2px)}.yr129in{display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(120deg,#04263f,#0a5c8a);color:#fff;border:0}.yr129in a{color:#fff;text-decoration:none;display:flex;flex-direction:column;gap:2px;min-width:0}.yr129in .small{color:#5cc8f0;font-weight:700;letter-spacing:1px}.yr129in .chip{background:rgba(255,255,255,.12);color:#fff;border-color:transparent}'+
  '.stu129l{display:flex;flex-direction:column;gap:8px}.stu129c{display:flex;flex-direction:column;gap:8px;padding:12px;border:1px solid var(--line,#dfe7ec);border-radius:12px}.stu129c.lock{opacity:.6}.stu129t{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.stu129s{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.stu129s span{display:flex;flex-direction:column;font-weight:700}.stu129s em{font-style:normal;font-size:12px;font-weight:500;opacity:.7}.stu129c .chip{align-self:flex-start}.stu129pro{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--soft,#eef4f8)}'+
  '.sc129g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}.sc129c{position:relative;display:flex;flex-direction:column;gap:1px;padding:8px 6px;border-radius:10px;color:#0d1b26;min-width:0}.sc129c b{font-size:13px}.sc129c span{font-weight:700;font-size:15px}.sc129c em{font-style:normal;font-size:11px;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sc129c i{position:absolute;top:6px;right:6px;font-style:normal;font-size:10px;font-weight:700;color:#0a5c8a}.sc129c.now{outline:2px solid #f6a04d;outline-offset:-2px}.sc129c:not(.in){opacity:.72}@media(max-width:520px){.sc129g{grid-template-columns:repeat(4,minmax(0,1fr))}.stu129s{grid-template-columns:repeat(2,minmax(0,1fr))}.yr129k b{font-size:17px}}';document.head.appendChild(st);})();
if(typeof LANG!=='undefined'&&LANG==='en'&&typeof EN_D!=='undefined')Object.assign(EN_D,{'투어':'Trip','1인 비용 (원 · 투어는 꼭 적어 주세요)':'Fee per person (KRW)','다른 로그북 앱 (MacDive · Diving Log · DiveMate 등)':'Other logbook apps','엑셀 · 구글 시트로 정리한 기록':'Spreadsheet logs'});
/* 하단 메뉴: 리조트 → 모임 (side53이 다시 그려도 유지) */
function tabMeet129(){var tb=document.getElementById('tabbar');if(!tb)return;var a=tb.querySelector('[data-nav="resorts"]');if(!a)return;a.setAttribute('href','#community');a.dataset.nav='community';a.innerHTML=ic(mIcon('community'),22)+L129('모임','Meetups');if(typeof navMark==='function')navMark();}
if(typeof side53==='function'){var _side129=side53;side53=function(){_side129.apply(this,arguments);tabMeet129();};}
tabMeet129();
var _navMark129=navMark;navMark=function(){_navMark129();if(cur()==='tours'){document.querySelectorAll('#tabbar [data-nav]').forEach(function(a){if(a.dataset.nav==='community')a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}};
