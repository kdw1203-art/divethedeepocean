/* ===== 사진 보정 화면 정리: 글씨체 통일 · 선택칸/슬라이더/체크 칸 디자인 · 구역 제목 ===== */
(function(){var st=document.createElement('style');st.textContent=
 /* 공통: 선택칸 · 체크 · 슬라이더가 브라우저 기본 모양으로 나오지 않게 */
 'select,input,button,textarea{font-family:inherit}'+
 'input[type=range]{accent-color:var(--sea)}input[type=checkbox],input[type=radio]{accent-color:var(--sea);width:16px;height:16px;margin:0;vertical-align:middle}'+
 '.pfedit select,#pfRoot select{-webkit-appearance:none;appearance:none;height:40px;padding:0 34px 0 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 fill=%27none%27 stroke=%27%2389a2b3%27 stroke-width=%272%27/%3E%3C/svg%3E") no-repeat right 12px center;color:var(--ink);font-size:14px;font-weight:500;width:100%!important;max-width:100%}'+
 '.pfedit input[type=text]{height:40px;padding:0 12px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--ink);font-size:14px}'+
 /* 슬라이더 */
 '.pfedit input[type=range]{-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:var(--line);outline:none;margin:8px 0 4px}'+
 '.pfedit input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--sea);border:3px solid var(--panel);box-shadow:0 0 0 1px var(--sea);cursor:pointer}'+
 '.pfedit input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:var(--sea);border:3px solid var(--panel);cursor:pointer}'+
 '.pfedit .pfctl label,.pfedit .pfbk label{font-size:13px;font-weight:500;color:var(--sub)}.pfedit .pfctl label span b,.pfedit .pfbk label b{color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}'+
 /* 칩 버튼 · 체크가 들어간 칩 */
 '.pfedit .chip{height:36px;min-height:36px;padding:0 14px;font-size:13.5px;display:inline-flex;align-items:center;gap:6px;line-height:1}.pfedit label.chip input{margin:0}'+
 /* 구역 */
 '.pfsec{margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}.pfsec>.pfh,.pfedit .pfh{margin:0 0 8px;font-size:13px;font-weight:700;color:var(--ink);letter-spacing:.2px}'+
 '.pfedit .pfbk{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));align-items:end}.pfedit .pfbk>button{height:40px;justify-content:center}'+
 '.pfedit .pfbar,.pfedit .pfrow{gap:8px;align-items:center}.pfedit .pfbar select{width:auto!important;min-width:140px}.pfedit .pfrow select{width:auto!important;min-width:120px}'+
 '.pfedit .pfrow input[type=text]{flex:1;min-width:160px}.pfedit #pfCamTx{font-size:12.5px;color:var(--sub)}'+
 '@media(max-width:600px){.pfedit .pfctl{grid-template-columns:1fr 1fr;gap:6px 14px}.pfedit .pfcam .sttabs,.pfedit .pfpre{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.pfedit .pfcam .sttabs::-webkit-scrollbar,.pfedit .pfpre::-webkit-scrollbar{display:none}.pfedit .pfcam .chip,.pfedit .pfpre .chip{flex:none}.pfedit .pfbk{grid-template-columns:1fr 1fr}.pfedit .pfbk>button{grid-column:1/-1}}';
 document.head.appendChild(st);})();
/* 구역마다 제목을 달고 같은 모양으로 묶기 */
function pfSections(){var c=document.getElementById('pfCmp');if(!c)return;var root=c.closest('.panel');if(!root||root.dataset.sec)return;root.dataset.sec=1;root.classList.add('pfedit');
  var add=function(el,t){if(!el)return;var w=document.createElement('div');w.className='pfsec';if(t){var h=document.createElement('p');h.className='pfh';h.textContent=t;w.appendChild(h);}el.before(w);w.appendChild(el);return w;};
  var cam=root.querySelector('.pfcam');if(cam){var ph=cam.querySelector('.pfh');if(ph)ph.remove();add(cam,'찍은 카메라');}
  add(root.querySelector('.pfpre'),'물 상태');add(root.querySelector('.pfctl'),'세부 조절');
  var bk=root.querySelector('.pfbk');if(bk){var bh=bk.previousElementSibling;if(bh&&bh.classList.contains('pfh'))bh.remove();add(bk,'아웃포커싱 (배경 흐리기)');}
  var bars=root.querySelectorAll('.pfbar');if(bars[0])add(bars[0],'비율 · 회전 · 비교');
  var rows=[].slice.call(root.querySelectorAll('.pfrow'));if(rows[0]&&!rows[0].previousElementSibling)add(rows[0],'편집 기록');else if(rows[0])add(rows[0],'편집 기록');
  [].forEach.call(root.querySelectorAll(':scope > .pfh, :scope > p.pfh'),function(h){var n=h.nextElementSibling;if(n&&n.classList.contains('pfrow')){var w=document.createElement('div');w.className='pfsec';h.before(w);w.appendChild(h);w.appendChild(n);}});}
var _pfShow83=pfShow;pfShow=function(){_pfShow83();pfSections();};
var _after83=after;after=function(){_after83();if(cur()==='photofix')setTimeout(pfSections,0);};
