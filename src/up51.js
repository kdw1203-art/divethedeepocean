/* ===== 지도 업체 정보 시트 · 강사 자격 프로필 ===== */
var PRO=[
 ['다이브마스터 (강사 보조)','교육 보조와 펀다이빙 가이드를 맡는 프로 등급이에요. 혼자서 자격증 과정을 가르치지는 못해요.'],
 ['PADI 오픈워터 스쿠버 인스트럭터 (OWSI)','PADI의 기본 강사 등급이에요. 체험 다이빙부터 오픈워터, 어드밴스드, 레스큐, 다이브마스터 과정까지 가르칠 수 있어요.'],
 ['PADI 스페셜티 인스트럭터','나이트록스, 딥, 난파선 같은 스페셜티 과정을 따로 가르칠 수 있는 자격을 더한 강사예요.'],
 ['PADI 마스터 스쿠버 다이버 트레이너 (MSDT)','스페셜티 강사 자격을 여러 개 갖추고 교육 실적이 쌓인 강사예요. 가르칠 수 있는 과정 폭이 넓어요.'],
 ['PADI IDC 스태프 인스트럭터','강사를 길러내는 과정(IDC)에서 코스 디렉터를 돕는 상위 강사예요.'],
 ['PADI 마스터 인스트럭터','IDC 운영을 돕고 강사 교육 경험이 많은 상위 등급이에요.'],
 ['PADI 코스 디렉터','새 강사를 양성하는 IDC를 직접 운영하는 PADI 최상위 교육 등급이에요.'],
 ['SSI 오픈워터 인스트럭터','SSI 입문 과정(오픈워터)과 여러 스페셜티를 가르치는 기본 강사 등급이에요.'],
 ['SSI 어드밴스드 오픈워터 인스트럭터','SSI 상위 레벨 과정과 다이브마스터 과정까지 가르칠 수 있는 강사예요.'],
 ['SSI 인스트럭터 트레이너','SSI 강사를 양성하는 상위 등급이에요.'],
 ['NAUI 인스트럭터','NAUI 체계의 강사로 입문부터 상위 과정까지 가르쳐요.'],
 ['CMAS 1스타 인스트럭터','CMAS 체계의 첫 강사 등급이에요. 입문 과정 위주로 가르쳐요.'],
 ['CMAS 2스타 인스트럭터','CMAS 중급 강사 등급이에요. 상위 다이버 과정까지 가르쳐요.'],
 ['CMAS 3스타 인스트럭터','CMAS 상위 강사 등급이에요. 강사 양성에도 참여해요.'],
 ['텍니컬 다이빙 인스트럭터 (TDI·IANTD 등)','감압, 혼합 기체, 사이드마운트 같은 텍니컬 과정을 가르치는 강사예요.'],
 ['AIDA 인스트럭터','AIDA 프리다이빙 과정(보통 AIDA 1~3)을 가르치는 강사예요.'],
 ['AIDA 마스터 인스트럭터','AIDA 4까지 가르치고 강사 교육에도 참여하는 상위 등급이에요.'],
 ['Molchanovs 인스트럭터','Molchanovs 프리다이빙 Wave 과정을 가르치는 강사예요.'],
 ['SSI 프리다이빙 인스트럭터','SSI 프리다이빙 레벨 과정을 가르치는 강사예요.'],
 ['PADI 프리다이버 인스트럭터','PADI 프리다이버 과정을 가르치는 강사예요.'],
 ['CMAS 프리다이빙 인스트럭터','CMAS 프리다이빙 과정을 가르치는 강사예요.'],
 ['기타 (소개에 적어 주세요)','']];
var TEACH=['체험 다이빙','오픈워터','어드밴스드','레스큐','다이브마스터','스페셜티','나이트록스','텍니컬','프리다이빙 입문','프리다이빙 중급 이상','강사 과정'];
function proDesc(l){var x=PRO.filter(function(p){return p[0]===l;})[0];return x?x[1]:'';}
/* 업체 등록 폼에 '강사 자격' 단계 */
(function(){if(!FORMS.biz||FORMS.biz.steps.some(function(s){return s.t==='강사 자격';}))return;var i=FORMS.biz.steps.findIndex(function(s){return s.t==='서류';});
  FORMS.biz.steps.splice(i<0?FORMS.biz.steps.length:i,0,{t:'강사 자격',f:[{k:'pro_level',type:'select',l:'대표 강사 등급 (강사·교육 업체만)',opts:['해당 없음'].concat(PRO.map(function(p){return p[0];}))},{k:'pro_no',type:'text',l:'강사 번호 (공개돼요 · 단체 조회용)',ph:'예: PADI 123456'},{k:'pro_years',type:'number',l:'강사 경력 (년)',ph:'예: 7'},{k:'teaches',type:'multi',l:'가르치는 과정',opts:TEACH},{k:'site_name',type:'text',l:'지도에 표시된 업체 이름 (있으면)',ph:'지도에서 눌러 본 이름 그대로'}]});})();
/* 업체 등록 insert에 자격 정보 덧붙이기 */
(function wrap(){if(!BE.sb){setTimeout(wrap,500);return;}if(BE.sb._w51)return;BE.sb._w51=1;var _from=BE.sb.from.bind(BE.sb);
  BE.sb.from=function(t){var q=_from(t);if(t==='businesses'){var _ins=q.insert.bind(q);q.insert=function(row){if(row&&!Array.isArray(row)&&row.biz_type){var v=(state.forms.biz||{}).v||{},S=state.bizSite||{};
    if(v.pro_level&&v.pro_level!=='해당 없음')row.pro_level=v.pro_level;if(v.pro_no)row.pro_no=String(v.pro_no).slice(0,40);if(+v.pro_years>=0&&v.pro_years!=='')row.pro_years=Math.min(60,Math.round(+v.pro_years));if(v.teaches&&v.teaches.length)row.teaches=v.teaches;
    row.site_name=(v.site_name||S.name||'').slice(0,120)||null;if(S.lat!=null){row.lat=S.lat;row.lon=S.lon;}}return _ins(row);};}return q;};})();
/* 공개 업체 + 자격 정보 */
function proLoad(cb){if(state.proBiz)return cb&&cb();if(!BE.on){state.proBiz=[];return cb&&cb();}(proLoad.q=proLoad.q||[]).push(cb);if(proLoad.b)return;proLoad.b=1;
  BE.sb.from('businesses').select('id,owner,biz_type,name,name_en,spot,addr,web,langs,services,orgs,intro,photos,lat,lon,site_name,pro_level,pro_no,pro_years,teaches').limit(1000).then(function(r){state.proBiz=r.data||[];proLoad.q.forEach(function(f){f&&f();});proLoad.q=[];});}
function normN(s){return String(s||'').toLowerCase().replace(/[\s·\-_.,()'"]/g,'').replace(/(dive|diving|resort|center|centre|다이빙|다이브|리조트|센터|스쿠버|scuba)/g,'');}
function proBlock(b){if(!b.pro_level&&!b.pro_years&&!(b.teaches||[]).length)return '';var d=proDesc(b.pro_level);
  return '<div class="mpin" style="margin:8px 0 0">'+(b.pro_level?'<div><b>등급</b><span class="v">'+esc(b.pro_level)+(d?'<span class="small" style="display:block;margin-top:2px">'+esc(d)+'</span>':'')+'</span></div>':'')+(b.pro_years!=null?'<div><b>경력</b><span class="v">강사 '+b.pro_years+'년</span></div>':'')+((b.teaches||[]).length?'<div><b>과정</b><span class="v">'+b.teaches.map(esc).join(' · ')+'</span></div>':'')+(b.pro_no?'<div><b>번호</b><span class="v">'+esc(b.pro_no)+' <span class="small">단체 공식 조회로 확인할 수 있어요</span></span></div>':'')+'</div>';}
function bizCard(b){var s=spot(b.spot)||{};return '<div class="panel" style="margin:10px 0 0;padding:14px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><span class="small">'+esc(b.biz_type||'')+(s.name?' · '+esc(s.name):'')+'</span><b style="display:block;font-size:16px">'+esc(b.name)+(b.name_en?' <span class="small">'+esc(b.name_en)+'</span>':'')+'</b></div><a class="chip" href="#biz-d'+b.id+'">자세히</a></div>'+
  ((b.langs||[]).length||(b.orgs||[]).length?'<p class="small" style="margin:6px 0 0">'+[(b.orgs||[]).join(' · '),(b.langs||[]).join(' · ')].filter(Boolean).join(' | ')+'</p>':'')+((b.services||[]).length?'<div class="more" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">'+b.services.slice(0,6).map(function(x){return '<span class="tag">'+esc(x)+'</span>';}).join('')+'</div>':'')+
  (b.intro?'<p style="margin:8px 0 0;font-size:14px;line-height:1.5">'+esc(String(b.intro).slice(0,140))+(b.intro.length>140?'…':'')+'</p>':'')+proBlock(b)+'</div>';}
function siteSheet(lat,lon){var x=(DB.sites||[]).filter(function(y){return Math.abs(y[0]-lat)<1e-6&&Math.abs(y[1]-lon)<1e-6;})[0]||[lat,lon,'',0,''];var N=['다이빙 센터·샵','다이빙 포인트','리조트·숙소'];
  sheet('<h2 style="margin:0 0 4px">'+esc(x[2]||'업체')+'</h2><p class="small" style="margin:0 0 10px">'+N[x[3]]+(x[4]?' · '+esc(x[4]):'')+'</p><div id="ssBody"><p class="empty" style="margin:0">불러오는 중이에요.</p></div>');
  proLoad(function(){var el=document.getElementById('ssBody');if(!el)return;var nn=normN(x[2]),B=state.proBiz||[];
    var near=SPOTS.map(function(s){return {s:s,d:km(lat,lon,s.lat,s.lon)};}).filter(function(o){return o.d<40;}).sort(function(a,b){return a.d-b.d;}).slice(0,3);
    var M=B.filter(function(b){if(b.lat!=null&&km(lat,lon,b.lat,b.lon)<0.4)return true;var a=[b.site_name,b.name,b.name_en].map(normN);return nn.length>=2&&a.some(function(k){return k&&k.length>=2&&(k===nn||k.indexOf(nn)>=0||nn.indexOf(k)>=0);});});
    var ids=M.map(function(b){return b.id;}),sp=near.map(function(o){return o.s.id;}),P=B.filter(function(b){return ids.indexOf(b.id)<0&&sp.indexOf(b.spot)>=0&&/강사|교육|샵|센터|리조트/.test(b.biz_type||'');}).slice(0,6);
    el.innerHTML='<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-line" href="https://www.google.com/maps/search/?api=1&query='+lat+','+lon+'" target="_blank" rel="noopener">길찾기</a>'+(near[0]?'<a class="btn btn-line" href="#spot-'+near[0].s.id+'">가까운 포인트 · '+esc(near[0].s.name)+'</a>':'')+'</div>'+
      (M.length?'<h3 style="font-size:15px;margin:16px 0 0">등록된 업체 정보</h3>'+M.map(bizCard).join(''):'<div class="notice" style="margin-top:14px">아직 이 업체가 직접 등록한 정보가 없어요. 지도 위치와 이름은 오픈스트리트맵 자료예요.</div>')+
      (P.length?'<h3 style="font-size:15px;margin:16px 0 0">이 바다에서 활동하는 강사·업체</h3>'+P.map(bizCard).join(''):'')+
      '<div class="panel" style="margin:14px 0 0;padding:14px;border:1px dashed var(--line)"><b>이 업체를 운영하거나 여기서 가르치시나요?</b><p class="small" style="margin:4px 0 8px">업체 정보와 강사 자격(등급·경력·가르치는 과정)을 올리면 이 화면에 같이 나와요. 심사 후 공개돼요.</p><button class="btn btn-pri" type="button" data-siteown="'+lat+','+lon+'">업체 · 강사 등록하기</button></div>'+
      '<p class="small" style="margin:10px 0 0">강사 자격은 PADI·SSI·AIDA 같은 단체 공식 조회에서 이름과 번호로 꼭 확인하세요.</p><button class="btn btn-line" type="button" onclick="closeSheet()" style="margin-top:10px">닫기</button>';});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-site]');if(t){e.preventDefault();var a=t.dataset.site.split(',');siteSheet(+a[0],+a[1]);return;}
  t=e.target.closest('[data-siteown]');if(t){var a2=t.dataset.siteown.split(','),x=(DB.sites||[]).filter(function(y){return Math.abs(y[0]-a2[0])<1e-6&&Math.abs(y[1]-a2[1])<1e-6;})[0];state.bizSite={lat:+a2[0],lon:+a2[1],name:x?x[2]:''};var st=fstate('biz');if(x&&!st.v.name)st.v.name=x[2];if(x)st.v.site_name=x[2];if(x&&x[3]===2&&!st.v.type)st.v.type='다이빙 리조트';closeSheet();location.hash=BE.user?'#biz':'#login';toast('업체 등록으로 이동해요. 지도 위치가 함께 저장돼요.');}},true);
/* 업체 상세: 강사 자격 프로필 + 주인은 고치기 */
function proEdit(b){sheet('<h2 style="margin:0 0 10px">강사 자격 정보 고치기</h2><form class="form" id="proForm" data-bid="'+b.id+'" novalidate><label for="pe_l">대표 강사 등급<select id="pe_l"><option value="">해당 없음</option>'+PRO.map(function(p){return '<option'+(p[0]===b.pro_level?' selected':'')+'>'+esc(p[0])+'</option>';}).join('')+'</select></label><label for="pe_n">강사 번호 (공개돼요)<input id="pe_n" maxlength="40" value="'+esc(b.pro_no||'')+'"></label><label for="pe_y">강사 경력 (년)<input id="pe_y" type="number" min="0" max="60" value="'+(b.pro_years==null?'':b.pro_years)+'"></label><fieldset style="border:0;padding:0;margin:0;grid-column:1/-1"><legend style="font-size:14px;margin-bottom:6px">가르치는 과정</legend><div class="chips">'+TEACH.map(function(t){return '<label class="chip"><input type="checkbox" name="pe_t" value="'+t+'"'+((b.teaches||[]).indexOf(t)>=0?' checked':'')+' style="margin-right:4px">'+t+'</label>';}).join('')+'</div></fieldset><div style="grid-column:1/-1;display:flex;gap:8px"><button class="btn btn-pri" type="submit">저장</button><button class="btn btn-line" type="button" onclick="closeSheet()">닫기</button></div></form>');}
document.addEventListener('submit',function(e){if(e.target.id!=='proForm')return;e.preventDefault();var id=+e.target.dataset.bid,y=val('pe_y');var up={pro_level:val('pe_l')||null,pro_no:val('pe_n').trim()||null,pro_years:y===''?null:Math.max(0,Math.min(60,Math.round(+y))),teaches:[].map.call(document.querySelectorAll('input[name=pe_t]:checked'),function(i){return i.value;})};
  BE.sb.from('businesses').update(up).eq('id',id).then(function(r){if(r.error)return toast('저장하지 못했어요: '+r.error.message);(state.proBiz||[]).forEach(function(b){if(b.id===id)Object.assign(b,up);});closeSheet();toast('강사 자격 정보를 저장했어요');rerender();});},true);
document.addEventListener('click',function(e){var t=e.target.closest('[data-proedit]');if(!t)return;var id=+t.dataset.proedit;var b=(state.proBiz||[]).filter(function(x){return x.id===id;})[0];if(b)proEdit(b);else{BE.sb.from('businesses').select('id,pro_level,pro_no,pro_years,teaches').eq('id',id).single().then(function(r){if(r.data)proEdit(r.data);});}});
var _after51=after;after=function(){_after51();var h=location.hash||'',m=h.match(/^#biz-d(\d+)/);if(!m||document.getElementById('proBox'))return;var id=+m[1];
  proLoad(function(){if(document.getElementById('proBox')||(location.hash||'').indexOf('#biz-d'+id)!==0)return;var b=(state.proBiz||[]).filter(function(x){return x.id===id;})[0],mine=BE.user&&b&&b.owner===BE.user.id;var v=document.querySelector('#main .view');if(!v)return;
    var body=b?proBlock(b):'';if(!body&&!mine)return;var p=document.createElement('div');p.className='panel';p.id='proBox';p.innerHTML='<h2>강사 자격 프로필</h2>'+(body||'<p class="empty" style="margin:0">아직 자격 정보를 넣지 않았어요.</p>')+(mine?'<button class="btn btn-line" type="button" data-proedit="'+id+'" style="margin-top:10px">자격 정보 고치기</button>':'')+'<p class="small" style="margin:8px 0 0">등급 설명은 단체 기준을 쉽게 풀어 쓴 참고용이에요.</p>';var pn=v.querySelectorAll('.panel');(pn[1]||pn[0]||v).after?((pn[1]||pn[0]).after(p)):v.appendChild(p);});};
/* 목록의 업체·강사 항목에 대표 강사 등급 표시 */
var _after51b=after;after=function(){_after51b();var A=document.querySelectorAll('#main a.item[href^="#biz-d"]:not([data-pl])');if(!A.length)return;proLoad(function(){[].forEach.call(document.querySelectorAll('#main a.item[href^="#biz-d"]:not([data-pl])'),function(a){a.dataset.pl=1;var id=+a.getAttribute('href').slice(6),b=(state.proBiz||[]).filter(function(x){return x.id===id;})[0];if(!b||!b.pro_level)return;var tx=a.querySelector('.tx');if(tx)tx.insertAdjacentHTML('beforeend','<span>'+esc(b.pro_level)+(b.pro_years!=null?' · 경력 '+b.pro_years+'년':'')+'</span>');});});};
