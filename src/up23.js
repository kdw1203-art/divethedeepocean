/* ===== 사진 없는 포인트는 이름 글자로 · 지도 조건 접기 ===== */
(function(){var st=document.createElement('style');st.textContent='.ph1>div.phtxt::after{content:none!important}.phtxt{display:flex!important;flex-direction:column;justify-content:flex-end;padding:12px 14px;color:#fff}.phtxt b{font-size:17px;line-height:1.25;text-shadow:0 1px 3px rgba(0,0,0,.35)}.phtxt span{font-size:11.5px;opacity:.85;margin-top:2px}.mfmore{margin:0 0 8px}.mfmore>summary{cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:var(--panel);font-size:14px;font-weight:600;list-style:none}.mfmore>summary::-webkit-details-marker{display:none}.mfmore[open]>summary{margin-bottom:8px}';document.head.appendChild(st);})();
function phText(h){return h.replace(/(<a class="lcard" href="#spot-([a-z0-9-]+)"[^>]*><div class="ph1"[^>]*>(?:<span[^>]*>[^<]*<\/span>)*)<div style="height:100%;background:([^"]+)"><\/div>/g,function(m,pre,id,bg){var s=spot(id);if(!s)return m;return pre+'<div class="phtxt" style="height:100%;background:'+bg+'"><b>'+esc(s.name)+'</b><span>'+esc(EN[id]||'')+' · '+esc(s.kind)+'</span></div>';});}
var _map23=V.map;V.map=function(a){return phText(_map23(a));};
state.mfOpen=!!state.mfOpen;
function mapFold(){var v=document.querySelector('#main .view');if(!v||v.querySelector('.mfmore'))return;var bar=v.querySelector('.mapbar'),more=v.querySelector('.chips[aria-label="더 고르기"]');if(!bar)return;
  var on=more?[].filter.call(more.querySelectorAll('[aria-pressed="true"]'),function(b){return b.dataset.v!==''&&b.dataset.v!=null;}).length:0;
  [].forEach.call(bar.querySelectorAll('select'),function(s){if(s.selectedIndex>0)on++;});
  var d=document.createElement('details');d.className='mfmore';if(state.mfOpen)d.open=true;d.innerHTML='<summary>조건으로 좁히기'+(on?' <span class="tag ok">'+on+'개 켜짐</span>':'')+' ▾</summary>';bar.before(d);d.appendChild(bar);if(more)d.appendChild(more);
  d.addEventListener('toggle',function(){state.mfOpen=d.open;});
  if(on&&!state.mfOpen){var c=document.createElement('button');c.type='button';c.className='chip';c.id='mfReset';c.textContent='조건 모두 풀기';c.style.marginLeft='8px';d.after(c);}}
document.addEventListener('click',function(e){if(e.target.id!=='mfReset')return;state.mf={d:'',e:'',c:''};LS.set('mapF',state.mf);state.lvl='전체';state.mon=0;rerender();});
var _after23=after;after=function(){_after23();if(cur()==='map')mapFold();};
if(LANG==='en'){EN_D['조건으로 좁히기']='Filters';EN_D['조건 모두 풀기']='Clear filters';}
/* 나라 이름 앞에 국기 */
var CRX=(function(){var C={};SPOTS.forEach(function(s){C[s.country]=1;});var a=Object.keys(C).sort(function(x,y){return y.length-x.length;}).map(function(c){return c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('|');return [new RegExp('(>)('+a+')( · )','g'),new RegExp('( · )('+a+')( · )','g')];})();
function addFlags(h){if(typeof h!=='string'||LANG==='en')return h;return h.replace(CRX[0],function(m,a,c,b){return a+flag(c)+' '+c+b;}).replace(CRX[1],function(m,a,c,b){return a+flag(c)+' '+c+b;});}
['map','spot','resorts','trip','meet','compare','community'].forEach(function(k){var f=V[k];if(f)V[k]=function(a){return addFlags(f(a));};});
var _hmr23=hmResults;hmResults=function(){return addFlags(_hmr23());};
var _map23b=V.map;V.map=function(a){return _map23b(a).replace(/(data-lregion="한국"[^>]*>)한국/,'$1'+flag('대한민국')+' 한국').replace(/(data-lregion="일본"[^>]*>)일본/,'$1'+flag('일본')+' 일본').replace(/(data-lregion="필리핀"[^>]*>)필리핀/,'$1'+flag('필리핀')+' 필리핀');};
/* 지역·지명 앞에 나라 국기 */
(function(){if(LANG==='en')return;var C={};SPOTS.forEach(function(s){C[s.country]=1;});var names=Object.keys(C).sort(function(a,b){return b.length-a.length;}),esc2=function(x){return x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');};
  var re=new RegExp('(^|· )('+names.map(esc2).join('|')+')(?= ·|$)','g'),RI=/[\uD83C][\uDDE6-\uDDFF]/,REG={'한국':'대한민국','일본':'일본','필리핀':'필리핀'};
  function run(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,L=[];while((n=w.nextNode())){var t=n.nodeValue;if(!t||t.length>120||RI.test(t))continue;var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(p.tagName))continue;var prev=n.previousSibling;if(prev&&prev.nodeType===3&&RI.test(prev.nodeValue))continue;if(p.textContent&&RI.test(p.textContent)&&p.childNodes.length<4)continue;re.lastIndex=0;if(re.test(t.trim()))L.push(n);}
    L.forEach(function(n){var t=n.nodeValue,lead=t.match(/^\s*/)[0],body=t.slice(lead.length);n.nodeValue=lead+body.replace(re,function(m,a,c){var f=flag(c);return a+(f?f+' ':'')+c;});});
    [].forEach.call(root.querySelectorAll('[data-lregion]'),function(b){var c=REG[b.dataset.lregion];if(c&&!RI.test(b.textContent))b.textContent=flag(c)+' '+b.textContent;});}
  var m=document.getElementById('main'),tm=null,busy=false;if(!m)return;
  new MutationObserver(function(){if(busy)return;clearTimeout(tm);tm=setTimeout(function(){busy=true;try{run(m);}catch(e){}setTimeout(function(){busy=false;},0);},60);}).observe(m,{childList:true,subtree:true});run(m);})();
