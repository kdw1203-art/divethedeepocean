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
