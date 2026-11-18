/* ===== 점검 반영: 페이지 안 이동 링크 · 주소 별칭 · 기본 정보 수정 입구 ===== */
/* 1) #applyForm 같은 '페이지 안 위치' 링크가 404로 가지 않게 */
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href').slice(1);if(!id||V[id]||/^[a-z]+-/.test(id))return;var el=document.getElementById(id);if(!el)return;e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});var f=el.querySelector&&el.querySelector('input,select,textarea');if(f)setTimeout(function(){try{f.focus({preventScroll:true});}catch(x){}},400);},true);
/* 2) 자주 쓰는 주소 별칭 */
var ALIAS91={faq:'help',contact:'help',support:'help',settings:'account',setting:'account',mypage:'profile',me:'profile',logbook:'log',join:'signup',register:'signup',signin:'login',ad:'ads',advertise:'ads',price:'pay',pricing:'pay',certs:'edu',cert:'edu',instructors:'edu',species:'life',fish:'life',weather:'home',search:'home'};
Object.keys(ALIAS91).forEach(function(k){if(!V[k])V[k]=function(){setTimeout(function(){location.replace('#'+ALIAS91[k]);if(k==='search')setTimeout(function(){var i=document.querySelector('#homeSearch input');if(i)i.focus();},600);},0);return '<p class="empty">이동하는 중이에요…</p>';};});
/* 3) 계정 관리에 '기본 정보 수정' 입구 */
var _after91=after;after=function(){_after91();if(cur()==='account'&&BE.on&&BE.user&&!document.getElementById('miEdit')){var v=document.querySelector('#main .view .vh')||document.querySelector('#main .view');if(v){var a=document.createElement('a');a.id='miEdit';a.href='#meminfo';a.className='panel miask';a.innerHTML='<b>기본 정보</b><span>이름 · 생년월일 · 성별 · 연락처 · 주소 · 가입 목적</span><span class="btn btn-line">수정</span>';v.after(a);}}};
if(LANG==='en'){Object.assign(EN_D,{'이동하는 중이에요…':'Redirecting…','이름 · 생년월일 · 성별 · 연락처 · 주소 · 가입 목적':'Name · birth · gender · phone · address · purpose','수정':'Edit','지금 메일 발송이 잠시 안 돼요. 고객센터(1:1 문의)로 알려 주시면 도와드릴게요.':'Email is temporarily unavailable. Please contact support.'});}
/* 4) 해상 특보 문구: 두 줄로 깔끔히 자르고 눌러서 전체 보기 */
(function(){var st=document.createElement('style');st.textContent='#wrnSum{display:-webkit-box!important;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;max-height:none!important;cursor:pointer}#wrnSum.open{-webkit-line-clamp:unset;display:block!important}';document.head.appendChild(st);})();
document.addEventListener('click',function(e){var w=e.target.closest('#wrnSum');if(w)w.classList.toggle('open');});
/* 5) 가입: 생년월일이 만 14세 이상이면 '만 14세 이상' 동의를 자동 체크 */
document.addEventListener('change',function(e){var t=e.target;if(!t.matches||!t.matches('[data-f="m_birth"]'))return;var f=t.closest('form[data-form="signup"]');if(!f)return;var a=(Date.now()-new Date(t.value))/31557600000;var st=fstate('signup');if(a>=14&&a<=105&&!st.v.age){st.v.age=true;var c=f.querySelector('[data-f="age"]');if(c)c.checked=true;}},true);
/* 6) 로그아웃하면 기본 정보 확인 상태도 초기화 (다른 계정으로 바로 로그인할 때) */
var _doLogout91=doLogout;doLogout=function(){state.miHas=null;state.miDone=0;var fm=fstate('meminfo');fm.loaded=0;fm.v={};return _doLogout91.apply(this,arguments);};
if(BE.on&&BE.sb){BE.sb.auth.onAuthStateChange(function(ev){if(ev==='SIGNED_OUT'||ev==='SIGNED_IN'){state.miHas=null;if(ev==='SIGNED_OUT')state.miDone=0;}});}
