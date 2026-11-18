/* ===== 회원 기본정보: 가입 때 필수 입력 + 기존 회원 채우기 ===== */
var MI_PUR=['로그 기록','포인트·날씨','자격증 취득','여행 준비','동행·모임','장비','업체·강사 운영'];
var MI_F=[{k:'m_name',type:'text',l:'이름',req:1,min:2,max:40,ph:'실명',auto:'name'},
 {k:'m_birth',type:'date',l:'생년월일',req:1,birth:1,auto:'bday'},
 {k:'m_gender',type:'select',l:'성별',req:1,opts:function(){return [['m','남성'],['f','여성']];}},
 {k:'m_phone',type:'tel',l:'연락처',req:1,phone:1,ph:'010-0000-0000',auto:'tel',pat:/^(0\d{1,2}-?\d{3,4}-?\d{4}|\+\d[\d\- ]{7,18})$/,err:'연락처를 다시 확인해 주세요'},
 {k:'m_addr',type:'text',l:'주소',req:1,min:4,max:200,ph:'시·구·동까지',auto:'street-address'},
 {k:'kind',type:'select',l:'다이빙',req:1,opts:['스쿠버','프리다이빙','둘 다','아직 시작 전']},
 {k:'cert',type:'select',l:'최고 자격',req:1,opts:['자격증 없음','오픈워터','어드밴스드','레스큐','다이브마스터','인스트럭터','AIDA 2','AIDA 3','AIDA 4','프리다이빙 인스트럭터']},
 {k:'m_purpose',type:'multi',l:'가입 목적',req:1,opts:MI_PUR}];
(function(){var F=FORMS.signup,f=F.steps[0].f,i=f.findIndex(function(x){return x.k==='pw2';});
  if(!f.some(function(x){return x.k==='m_name';}))f.splice(i+1,0,{k:'_h',type:'sec',l:'기본 정보'}).concat();
  f.splice(i+2,0,...MI_F.map(function(x){return Object.assign({},x);}));
  F.sub='모두 필수예요. 연락처·주소는 운영자만 봐요.';
  FORMS.meminfo={title:'기본 정보',sub:'모두 필수예요. 연락처·주소는 운영자만 봐요.',back:'profile',steps:[{t:'기본 정보',f:MI_F.map(function(x){return Object.assign({},x);})}],submit:'저장'};})();
var _fh88=fieldHtml;fieldHtml=function(id,f,st){if(f.type==='sec')return '<h3 class="fsec" style="grid-column:1/-1">'+f.l+'</h3>';var h=_fh88(id,f,st);
  if(f.birth)h=h.replace('<input ','<input max="'+new Date().toISOString().slice(0,10)+'" min="1920-01-01" ');return h;};
var _val88=validate;validate=function(id){var ok=_val88(id),st=fstate(id),F=FORMS[id];
  F.steps[st.step].f.forEach(function(f){var v=st.v[f.k];if(st.e[f.k]||!v)return;
    if(f.birth){var d=new Date(v),a=(Date.now()-d)/31557600000;if(isNaN(a)||a<14||a>105){st.e[f.k]=a<14?'만 14세 이상만 가입할 수 있어요':'날짜를 다시 확인해 주세요';ok=false;}}
    if(f.pat&&f.k==='m_phone'&&!f.pat.test(String(v).trim())){st.e[f.k]=f.err;ok=false;}});return ok;};
var KIND88={'스쿠버':'scuba','프리다이빙':'free','둘 다':'both','아직 시작 전':'none'};
function miRow(v){return {name:String(v.m_name||'').trim(),birth:v.m_birth,gender:v.m_gender,phone:String(v.m_phone||'').trim(),addr:String(v.m_addr||'').trim(),purpose:v.m_purpose||[]};}
if(BE.on){var _sub88=BE.submit;BE.submit=function(id,v){
  if(id==='signup'){var a=BE.sb.auth,o=a.signUp;a.signUp=function(arg){a.signUp=o;var r=miRow(v);arg.options=arg.options||{};arg.options.data=Object.assign(arg.options.data||{},{m_name:r.name,m_birth:r.birth,m_gender:r.gender,m_phone:r.phone,m_addr:r.addr,m_purpose:r.purpose,kind:v.kind,cert:v.cert});return o.call(a,arg);};
    return _sub88(id,v).finally(function(){a.signUp=o;});}
  if(id==='meminfo'){if(!BE.user)return Promise.reject({message:'로그인이 필요해요'});var r=miRow(v);r.id=BE.user.id;r.updated_at=new Date().toISOString();
    return BE.sb.from('member_info').upsert(r).then(function(x){if(x.error)throw x.error;return BE.sb.from('profiles').update({dive_kind:v.kind,cert:v.cert}).eq('id',BE.user.id);}).then(function(){state.miDone=1;toast('저장했어요');return 'profile';});}
  return _sub88(id,v);};}
V.meminfo=function(){setTitle('기본 정보');if(!BE.user)return '<div class="vh"><div><h1>기본 정보</h1><p>로그인해 주세요.</p></div><a class="btn btn-pri" href="#login">로그인</a></div>';
  var st=fstate('meminfo');if(!st.loaded){st.loaded=1;BE.sb.from('member_info').select('*').eq('id',BE.user.id).maybeSingle().then(function(x){var d=x.data;if(d){st.v.m_name=d.name;st.v.m_birth=d.birth;st.v.m_gender=d.gender;st.v.m_phone=d.phone;st.v.m_addr=d.addr;st.v.m_purpose=d.purpose||[];}
    return BE.sb.from('profiles').select('dive_kind,cert').eq('id',BE.user.id).maybeSingle();}).then(function(x){var p=x&&x.data;if(p){var k=Object.keys(KIND88).find(function(z){return KIND88[z]===p.dive_kind||z===p.dive_kind;});if(k)st.v.kind=k;if(p.cert)st.v.cert=p.cert;}if(cur()==='meminfo')rerender();});}
  return formView('meminfo').replace('<ol class="steps">','<ol class="steps" style="display:none">');};
/* 로그인했는데 기본 정보가 없으면 내 정보 위에 알려요 */
function miCheck(){if(!BE.on||!BE.user||state.miDone)return Promise.resolve(true);if(state.miHas!=null)return Promise.resolve(state.miHas);
  return BE.sb.from('member_info').select('id').eq('id',BE.user.id).maybeSingle().then(function(x){state.miHas=!!(x.data);if(state.miHas)state.miDone=1;return state.miHas;});}
var _after88=after;after=function(){_after88();if(cur()!=='profile'||!BE.user)return;miCheck().then(function(has){if(has||document.getElementById('miAsk'))return;var v=document.querySelector('#main .view .vh')||document.querySelector('#main .view');if(!v)return;
  var d=document.createElement('a');d.id='miAsk';d.href='#meminfo';d.className='panel miask';d.innerHTML='<b>기본 정보를 채워 주세요</b><span>이름 · 연락처 · 주소 · 가입 목적</span><span class="btn btn-pri">입력</span>';v.after(d);});};
(function(){var st=document.createElement('style');st.textContent='.fsec{margin:10px 0 0;padding-top:12px;border-top:1px solid var(--line);font-size:15px}.miask{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 14px;text-decoration:none;color:inherit;border:1.5px solid var(--sea)}.miask b{flex:1 1 100%}.miask span:not(.btn){flex:1;font-size:13px;color:var(--muted)}'+
 '@media (max-width:860px){form.form .fsticky{bottom:calc(var(--tabh,64px));box-shadow:0 -6px 12px -8px rgba(0,0,0,.15)}form.form{padding-bottom:14px}}';document.head.appendChild(st);
 function th(){var s=document.querySelector('form.form .fsticky'),t=document.getElementById('tabbar');if(!s||!t)return;var sc=s.parentElement;while(sc&&sc!==document.body){var o=getComputedStyle(sc).overflowY;if(o==='auto'||o==='scroll')break;sc=sc.parentElement;}
  var isEl=sc&&sc!==document.body,vb=(isEl?sc.getBoundingClientRect().bottom-parseFloat(getComputedStyle(sc).paddingBottom||0):window.innerHeight),r=t.getBoundingClientRect(),vis=getComputedStyle(t).display!=='none'&&r.height>0;document.documentElement.style.setProperty('--tabh',Math.round(vis?vb-r.top:0)+'px');}
 window.addEventListener('resize',th);setTimeout(th,300);setInterval(th,1000);var _a88b=after;after=function(){_a88b();setTimeout(th,50);};})();
if(LANG==='en'){Object.assign(EN_D,{'기본 정보':'Basic info','이름':'Name','실명':'Full name','생년월일':'Date of birth','성별':'Gender','남성':'Male','여성':'Female','연락처':'Phone','주소':'Address','시·구·동까지':'City and district','다이빙':'Diving','최고 자격':'Highest cert','가입 목적':'Why you joined','로그 기록':'Logging dives','포인트·날씨':'Spots & weather','자격증 취득':'Getting certified','여행 준비':'Trip planning','동행·모임':'Buddies & meetups','장비':'Gear','업체·강사 운영':'Running a business','모두 필수예요. 연락처·주소는 운영자만 봐요.':'All required. Only admins see phone and address.','기본 정보를 채워 주세요':'Please add your basic info','이름 · 연락처 · 주소 · 가입 목적':'Name · phone · address · purpose','입력':'Fill in','저장':'Save','만 14세 이상만 가입할 수 있어요':'You must be 14 or older','연락처를 다시 확인해 주세요':'Check your phone number'});}
