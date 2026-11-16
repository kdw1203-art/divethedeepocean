/* ===== 수영장 입장료 제보 · 로그북 '마지막 다이브 · 비행 대기' ===== */
state.poolPri=null;
function poolPriLoad(){if(!BE.on||poolPriLoad.b)return;poolPriLoad.b=1;BE.sb.from('dive_prices').select('spot,item,price,currency').in('item',['fd_pool','rental','fun']).limit(2000).then(function(r){poolPriLoad.b=0;state.poolPri=r.data||[];if(cur()==='pools')poolPriPaint();});}
function poolPriPaint(){var P=state.poolPri||[];[].forEach.call(document.querySelectorAll('#main .pool'),function(el){if(el.querySelector('.ppri'))return;var a=el.querySelector('a[href^="#spot-"]');if(!a)return;var id=a.getAttribute('href').slice(6),L=P.filter(function(p){return p.spot===id&&p.item==='fd_pool'&&p.currency==='KRW';}).map(function(p){return +p.price;}).sort(function(x,y){return x-y;});
  var md=L.length?L[L.length>>1]:null,row=document.createElement('tr');row.className='ppri';row.innerHTML='<th>입장료</th><td>'+(md?'<b>'+Math.round(md).toLocaleString('ko-KR')+'원</b> <span class="small">다이버 제보 '+L.length+'건 중간값</span>':'<span class="small">아직 제보가 없어요</span>')+' <button class="chip" type="button" data-poolpri="'+id+'" style="margin-left:4px">알려주기</button></td>';var tb=el.querySelector('table tbody')||el.querySelector('table');if(tb)tb.appendChild(row);});}
document.addEventListener('click',function(e){var t=e.target.closest('[data-poolpri]');if(!t)return;var id=t.dataset.poolpri;if(typeof priSheet!=='function')return;priSheet(id);setTimeout(function(){var i=document.getElementById('pr_i');if(i)i.value='fd_pool';var c=document.getElementById('pr_c');if(c)c.value='KRW';var m=document.getElementById('pr_m');if(m&&!m.value)m.placeholder='예: 2시간 · 평일 · 장비 대여 별도';},50);});
/* 저장되면 수영장 목록도 다시 */
document.addEventListener('submit',function(e){if(e.target.id==='priForm'&&cur()==='pools')setTimeout(function(){poolPriLoad.b=0;state.poolPri=null;poolPriLoad();[].forEach.call(document.querySelectorAll('#main .ppri'),function(r){r.remove();});},1500);});

/* 로그북: 마지막 다이브 · 비행 대기 */
function lastDiveLine(){var L=(state.userLogs||[]).filter(function(l){return l.date;}).sort(function(a,b){return String(b.date).localeCompare(String(a.date));});if(!L.length)return '';var l=L[0],P=state.lbP&&state.lbP[l.id],now=new Date(),end=null;
  if(P&&P.start_at){var w=String(P.start_at).replace('Z','').slice(0,19);var st=new Date(w);if(!isNaN(st))end=new Date(st.getTime()+((+P.minutes||+l.time||0)*60000));}
  var day=new Date(l.date+'T00:00:00'),today=new Date();today.setHours(0,0,0,0);var n=Math.round((today-day)/864e5);
  var txt='마지막 다이브 '+(n<=0?'오늘':n===1?'어제':n+'일 전')+' · '+esc(l.site||'');
  if(end&&now-end<24*3600e3&&now>=end){var fly=new Date(end.getTime()+18*3600e3),h=('0'+fly.getHours()).slice(-2)+':'+('0'+fly.getMinutes()).slice(-2);txt+='<br><b style="color:#b8342c">비행은 '+(fly.toDateString()===now.toDateString()?'오늘':'내일')+' '+h+' 이후</b> <span class="small">여러 번 다이빙한 날은 18시간 비우기 (DAN 권고)</span>';}
  else if(n>=60)txt+=' <span class="small">· 오랜만이면 얕은 곳에서 체크 다이브부터</span>';
  return txt;}
function lastDivePaint(){var b=document.getElementById('lbBox');if(!b)return;var t=lastDiveLine(),el=document.getElementById('lbLast');if(!t){if(el)el.remove();return;}if(!el){el=document.createElement('p');el.id='lbLast';el.className='small';el.style.cssText='margin:0 18px 10px;line-height:1.6';var h=b.querySelector('.lbh');if(h)h.after(el);}el.innerHTML=t;}
setInterval(function(){if(cur()==='log')lastDivePaint();},1500);
var _after56=after;after=function(){_after56();var c=cur();if(c==='pools'){if(!state.poolPri)poolPriLoad();else poolPriPaint();}if(c==='log')setTimeout(lastDivePaint,300);};
