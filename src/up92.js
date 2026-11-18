/* ===== 2차 점검 반영: 오류 방지 · 오류 기록 · 주소 검색 · 연락처 자동 형식 · 이미지 지연 로드 ===== */
/* 1) 화면 하나가 오류 나도 빈 화면 대신 안내 */
var CE={n:0,seen:{}};
function ceLog(msg,src){try{msg=String(msg||'').slice(0,600);if(!msg||/AbortError|ResizeObserver|Script error|maplibre|Load failed|NetworkError|Failed to fetch|cancelled|취소/i.test(msg))return;if(CE.seen[msg]||CE.n>=5)return;CE.seen[msg]=1;CE.n++;
  if(BE.on&&BE.sb)BE.sb.from('client_errors').insert({route:String(location.hash||'#home').slice(0,80),msg:msg,src:String(src||'').slice(0,200),ua:navigator.userAgent.slice(0,200),ver:(document.querySelector('script[src*="app."]')||{src:''}).src.replace(/.*app\.|\.js.*/g,'').slice(0,20)}).then(function(){},function(){});}catch(e){}}
window.addEventListener('error',function(e){ceLog(e.message,(e.filename||'')+':'+(e.lineno||''));});
window.addEventListener('unhandledrejection',function(e){var r=e.reason||{};if(r&&(r.name==='AbortError'||/AbortError/.test(String(r))))return e.preventDefault();ceLog(r.message||r,'promise');});
var _route92=route;route=function(){try{return _route92.apply(this,arguments);}catch(err){ceLog((err&&err.message)||err,'route '+(location.hash||''));if(window.console)console.error(err);
  main.innerHTML='<div class="view"><div class="vh"><div><h1>화면을 여는 중 문제가 생겼어요</h1><p>잠시 뒤 다시 열어 주세요. 운영자에게 자동으로 알려졌어요.</p></div></div><div class="panel"><a class="btn btn-pri" href="#home">홈으로</a> <button class="btn btn-line" type="button" onclick="location.reload()">새로고침</button></div></div>';}};
Object.keys(_route92).forEach(function(k){route[k]=_route92[k];});
/* 운영자: 데이터 탭에 최근 화면 오류 */
function ceAdmin(){if(cur()!=='admin'||!BE.on||!BE.user||document.getElementById('ceBox'))return;var anchor=document.querySelector('#main [data-atab="data"]');if(!anchor)return;
  var d=document.createElement('div');d.className='panel';d.id='ceBox';d.dataset.atab='data';d.style.display=anchor.style.display;d.innerHTML='<h2>화면 오류 기록 <span class="small">최근 30건 · 30일 보관</span></h2><p class="small" style="margin:0">불러오는 중이에요.</p>';anchor.parentElement.appendChild(d);
  BE.sb.from('client_errors').select('at,route,msg,src,ua,ver').order('at',{ascending:false}).limit(30).then(function(r){var L=r.data||[];var day=Date.now()-864e5;state.ceN=L.filter(function(x){return new Date(x.at)>day;}).length;
    d.innerHTML='<h2>화면 오류 기록 <span class="small">최근 30건 · 30일 보관</span></h2>'+(L.length?'<div style="overflow-x:auto"><table style="min-width:620px"><tr><th>때</th><th>화면</th><th>내용</th><th>기기</th></tr>'+L.map(function(x){return '<tr><td>'+String(x.at).slice(5,16).replace('T',' ')+'</td><td>'+esc(x.route||'')+'</td><td>'+esc(x.msg)+'<div class="small">'+esc(x.src||'')+' · '+esc(x.ver||'')+'</div></td><td class="small">'+esc(/iPhone|iPad/.test(x.ua)?'iOS':/Android/.test(x.ua)?'Android':/Mac/.test(x.ua)?'Mac':/Windows/.test(x.ua)?'Windows':'기타')+(/Instagram/.test(x.ua)?' · 인스타':/KAKAOTALK/.test(x.ua)?' · 카톡':'')+'</td></tr>';}).join('')+'</table></div>':'<p class="empty" style="margin:0">기록된 오류가 없어요.</p>');});}
/* 2) 주소 검색 (가입 · 기본 정보) */
function kpostF(id){function open(){new window.daum.Postcode({oncomplete:function(d){var st=fstate(id);st.v.m_addr=(d.roadAddress||d.jibunAddress||'')+' ';var i=document.querySelector('form[data-form="'+id+'"] [data-f="m_addr"]');if(i){i.value=st.v.m_addr;i.focus();}toast('주소를 넣었어요. 상세 주소를 이어서 적어 주세요.');}}).open();}
  if(window.daum&&window.daum.Postcode)return open();var s=document.createElement('script');s.src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';s.onload=open;s.onerror=function(){toast('주소 검색을 열지 못했어요. 직접 적어 주세요.');};document.head.appendChild(s);}
var _fh92=fieldHtml;fieldHtml=function(id,f,st){var h=_fh92(id,f,st);if(f.k==='m_addr'&&LANG!=='en')h=h.replace(/(<input [^>]*data-f="m_addr"[^>]*>)/,'<span class="addrw">$1<button class="btn btn-line" type="button" data-kpf="'+id+'">주소 검색</button></span>');return h;};
document.addEventListener('click',function(e){var b=e.target.closest('[data-kpf]');if(b){e.preventDefault();kpostF(b.dataset.kpf);}});
/* 3) 연락처 자동 형식 010-1234-5678 */
function telFmt(v){var d=String(v).replace(/[^\d+]/g,'');if(d[0]==='+')return v;if(/^02/.test(d))return d.length>9?d.replace(/^(02)(\d{4})(\d{0,4}).*/,'$1-$2-$3'):d.replace(/^(02)(\d{0,3})(\d{0,4}).*/,'$1-$2-$3').replace(/-+$/,'');return d.length>10?d.replace(/^(\d{3})(\d{4})(\d{0,4}).*/,'$1-$2-$3'):d.replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/,'$1-$2-$3').replace(/-+$/,'');}
document.addEventListener('input',function(e){var t=e.target;if(!t.matches||!t.matches('[data-f="m_phone"]'))return;var f=telFmt(t.value);if(f!==t.value){t.value=f;}},true);
/* 4) 이메일·닉네임 앞뒤 공백 정리 (모바일 자동완성 공백으로 가입 실패 방지) */
document.addEventListener('blur',function(e){var t=e.target;if(t.matches&&t.matches('[data-f="email"],[data-f="nick"],[data-f="m_name"],#rsEmail')){var v=t.value.trim();if(t.matches('[data-f="email"],#rsEmail'))v=v.toLowerCase();if(v!==t.value){t.value=v;t.dispatchEvent(new Event('input',{bubbles:true}));}}},true);
if(BE.on){var _sub92=BE.submit;BE.submit=function(id,v){if(v){if(v.email)v.email=String(v.email).trim().toLowerCase();if(v.nick)v.nick=String(v.nick).trim();if(v.m_phone)v.m_phone=telFmt(v.m_phone);}return _sub92(id,v);};}
/* 5) 화면의 이미지는 보일 때 불러오기 */
function lazyImgs(){document.querySelectorAll('#main img:not([loading])').forEach(function(i,n){if(n>3){i.loading='lazy';}i.decoding='async';});}
var _after92=after;after=function(){_after92();lazyImgs();setTimeout(lazyImgs,800);[600,1800].forEach(function(t){setTimeout(ceAdmin,t);});};
(function(){var st=document.createElement('style');st.textContent='.addrw{display:flex;gap:8px}.addrw input{flex:1;min-width:0}.addrw .btn{flex:none;min-height:44px;padding:0 12px}';document.head.appendChild(st);})();
if(LANG==='en'){Object.assign(EN_D,{'화면을 여는 중 문제가 생겼어요':'Something went wrong','잠시 뒤 다시 열어 주세요. 운영자에게 자동으로 알려졌어요.':'Please try again. We were notified.','새로고침':'Reload','새 회원 · 최근 7일':'New members · 7 days','화면 오류 · 최근 24시간':'Errors · 24 h'});}
