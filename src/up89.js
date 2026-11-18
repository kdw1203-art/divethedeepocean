/* ===== 로그아웃 찾기 쉽게: 내 정보 맨 위 · 맨 아래 ===== */
var _after89=after;after=function(){_after89();if(cur()!=='profile'||!BE.on||!BE.user)return;var v=document.querySelector('#main .view');if(!v||document.getElementById('loTop'))return;
  var vh=v.querySelector('.vh');var t=document.createElement('button');t.id='loTop';t.type='button';t.className='btn btn-line lobtn';t.textContent='로그아웃';t.onclick=doLogout;
  var card=[].find.call(v.querySelectorAll('a,button'),function(e){return /내 바다 카드|My sea card/.test(e.textContent);});if(card){card.after(t);card.parentElement.style.display='flex';card.parentElement.style.gap='8px';card.parentElement.style.flexWrap='wrap';}else if(vh)vh.after(t);else v.prepend(t);
  var b=document.createElement('button');b.id='loBot';b.type='button';b.className='btn btn-line lobot';b.textContent='로그아웃';b.onclick=doLogout;v.appendChild(b);
  var c=document.getElementById('logoutBtn');if(c)c.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();doLogout();};};
(function(){var st=document.createElement('style');st.textContent='.lobtn{color:var(--coral)}.lobot{display:block;width:100%;margin:18px 0 8px;color:var(--coral);border-color:var(--line)}';document.head.appendChild(st);})();
if(LANG==='en')EN_D['로그아웃']='Log out';
if(LANG==='en')EN_D['가입했어요. 환영해요!']='Welcome aboard!';
