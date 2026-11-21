/* ===== 파일 올리기 공통: 끌어다 놓기 · 눌러서 고르기 · 휴대폰 카메라 · 붙여넣기 (강사 자격증 · 서류 · 사진 칸 전부) ===== */
(function(){var st=document.createElement('style');st.textContent='.fu{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;margin-top:6px;padding:16px;border:2px dashed var(--line);border-radius:14px;text-align:center;cursor:pointer;font-weight:600;font-size:14px;color:var(--ink);background:var(--panel)}.fu small{font-weight:400;color:var(--sub);font-size:12.5px}.fu.on,.fudrop.on{border-color:var(--sea)!important;background:var(--soft)!important}.fucam{margin-top:6px}.fuin{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}';document.head.appendChild(st);})();
var FU_TOUCH=matchMedia('(pointer:coarse)').matches,FU_SKIP=/^(pfIn|pfCam|uddfIn|fuCamIn|heImgIn)$/;
function fuLabel(inp){return inp.closest('label')||(inp.id&&document.querySelector('label[for="'+inp.id+'"]'))||null;}
function fuAccept(inp,f){var a=(inp.getAttribute('accept')||'').split(',').map(function(x){return x.trim().toLowerCase();}).filter(Boolean);if(!a.length)return true;var t=(f.type||'').toLowerCase(),n=(f.name||'').toLowerCase();return a.some(function(x){return x[0]==='.'?n.endsWith(x):x.slice(-2)==='/*'?t.indexOf(x.slice(0,-1))===0:t===x;});}
function fuFeed(inp,list){var F=[].slice.call(list||[]).filter(function(f){return fuAccept(inp,f);});if(!F.length)return toast('이 칸에 올릴 수 없는 파일이에요');if(!inp.multiple)F=F.slice(0,1);
  try{var dt=new DataTransfer();F.forEach(function(f){dt.items.add(f);});inp.files=dt.files;inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){return toast('눌러서 골라 주세요');}fuName(inp);}
function fuName(inp){var z=document.querySelector('.fu[data-fuin="'+inp.id+'"]');if(!z||!inp.files||!inp.files.length)return;var n=inp.files.length,b=z.querySelector('b');if(b)b.textContent=n>1?n+'개 골랐어요':'고른 파일: '+inp.files[0].name;}
function fuUpgrade(){[].forEach.call(document.querySelectorAll('#main input[type=file],.sheet input[type=file]'),function(inp,i){if(inp.dataset.fu||FU_SKIP.test(inp.id||''))return;inp.dataset.fu=1;if(!inp.id)inp.id='fu'+Date.now().toString(36)+i;
  var lab=fuLabel(inp),img=/image/.test(inp.getAttribute('accept')||'')||!inp.getAttribute('accept'),hidden=!inp.offsetParent||inp.style.position==='absolute'||inp.style.display==='none';
  if(lab)lab.classList.add('fudrop'),lab.dataset.fuin=inp.id;
  if(!hidden){/* 그냥 보이던 파일 칸 → 끌어다 놓는 칸으로 */inp.classList.add('fuin');var z=document.createElement('span');z.className='fu';z.dataset.fuin=inp.id;z.innerHTML='<b>'+(FU_TOUCH?'눌러서 사진 · 파일 고르기':'여기로 끌어다 놓기')+'</b><small>'+(FU_TOUCH?'사진첩 · 파일 앱':'또는 눌러서 고르기 · Ctrl+V 붙여넣기')+'</small>';
    if(lab&&lab.contains(inp))inp.after(z);else{inp.after(z);z.addEventListener('click',function(){inp.click();});}}
  else if(lab&&!FU_TOUCH&&!lab.querySelector('small.fuh')){var h=document.createElement('small');h.className='fuh small';h.style.display='block';h.style.fontWeight='400';h.textContent='끌어다 놓아도 돼요';lab.appendChild(h);}
  /* 휴대폰: 카메라로 바로 찍기 */
  if(FU_TOUCH&&img){var c=document.createElement('button');c.type='button';c.className='chip fucam';c.dataset.fucam=inp.id;c.textContent='카메라로 찍기';var at=document.querySelector('.fu[data-fuin="'+inp.id+'"]')||lab||inp;(at.closest('label')&&at.closest('label')!==at?at.closest('label'):at).after(c);}
  inp.addEventListener('change',function(){fuName(inp);});});}
/* 카메라 */
document.addEventListener('click',function(e){var b=e.target.closest('[data-fucam]');if(!b)return;e.preventDefault();e.stopPropagation();var tgt=document.getElementById(b.dataset.fucam);if(!tgt)return;var c=document.getElementById('fuCamIn');if(c)c.remove();c=document.createElement('input');c.type='file';c.id='fuCamIn';c.accept='image/*';c.setAttribute('capture','environment');c.className='fuin';document.body.appendChild(c);c.onchange=function(){if(c.files.length)fuFeed(tgt,c.files);c.remove();};c.click();},true);
/* 끌어다 놓기 */
(function(){function zone(e){var z=e.target.closest&&e.target.closest('.fu,.fudrop');if(!z||!z.dataset.fuin)return null;return z;}function files(e){return e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],'Files')>=0;}
  document.addEventListener('dragover',function(e){var z=zone(e);if(!z||!files(e))return;e.preventDefault();e.dataTransfer.dropEffect='copy';z.classList.add('on');});
  document.addEventListener('dragleave',function(e){var z=zone(e);if(z&&!z.contains(e.relatedTarget))z.classList.remove('on');});
  document.addEventListener('drop',function(e){var z=zone(e);if(!z||!files(e))return;e.preventDefault();e.stopPropagation();z.classList.remove('on');var inp=document.getElementById(z.dataset.fuin);if(inp)fuFeed(inp,e.dataTransfer.files);},true);
  /* 화면에 파일 칸이 하나뿐이면 Ctrl+V 붙여넣기 */
  document.addEventListener('paste',function(e){if(cur()==='photofix')return;var tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA')return;var Z=[].filter.call(document.querySelectorAll('#main .fu,#main .fudrop,.sheet .fu,.sheet .fudrop'),function(z){return z.offsetParent;});var ids={};Z.forEach(function(z){ids[z.dataset.fuin]=1;});var k=Object.keys(ids);if(k.length!==1)return;
    var it=[].slice.call((e.clipboardData||{}).items||[]).filter(function(x){return x.kind==='file';});if(!it.length)return;e.preventDefault();fuFeed(document.getElementById(k[0]),it.map(function(x){return x.getAsFile();}));});})();
var _after82=after;after=function(){_after82();setTimeout(fuUpgrade,0);};
var _sheet82=sheet;sheet=function(h){_sheet82(h);setTimeout(fuUpgrade,0);};
if(window.MutationObserver){var _fu82;new MutationObserver(function(){clearTimeout(_fu82);_fu82=setTimeout(fuUpgrade,150);}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});}
