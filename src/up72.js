/* ===== 사진 보정 기본기: 끌어다 놓기 · 붙여넣기 · 눌러서 고르기 · 사진첩 저장 · PC 저장 폴더 ===== */
(function(){var st=document.createElement('style');st.textContent='.pfempty{cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:16px}.pfempty b{font-size:16px;color:var(--ink)}.pfdrop{outline:3px dashed var(--sea);outline-offset:-6px;background:rgba(10,90,138,.06)!important}.pfsrc{display:flex;gap:8px;margin-top:8px}.pfsrc label{flex:1;justify-content:center;cursor:pointer}.pfdir{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}.pfdir .small{flex:1;min-width:160px}';document.head.appendChild(st);})();
var PF_TOUCH=matchMedia('(pointer:coarse)').matches;
/* 받은 파일을 기존 사진 열기 흐름(#pfIn)으로 넘겨요 */
function pfFeed(list){var F=[].slice.call(list||[]).filter(function(f){return /^image\//.test(f.type)||/\.(jpe?g|png|webp|heic|heif|gif|bmp)$/i.test(f.name||'');}).slice(0,10);var inp=document.getElementById('pfIn');if(!inp)return;if(!F.length)return toast('사진 파일만 넣을 수 있어요');
  try{var dt=new DataTransfer();F.forEach(function(f){dt.items.add(f);});inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){toast('이 브라우저에선 "내 사진 고르기"를 눌러 주세요');}}
/* 빈 화면 문구 · 고르는 버튼 */
var _pfV72=V.photofix;V.photofix=function(){var h=_pfV72();
  h=h.replace(/<div class="pfempty">[^<]*<\/div>/,'<div class="pfempty" role="button" tabindex="0" data-pfpick="1"><b>'+(PF_TOUCH?'눌러서 사진첩에서 고르기':'사진을 여기로 끌어다 놓으세요')+'</b><span class="small">'+(PF_TOUCH?'한 번에 10장까지 · 사진은 서버로 올라가지 않아요':'또는 눌러서 고르기 · Ctrl+V로 붙여넣기 · 한 번에 10장까지')+'</span></div>');
  if(PF_TOUCH)h=h.replace(/<label class="btn btn-pri" style="width:100%;justify-content:center;margin-top:12px;cursor:pointer">([^<]*)(<input id="pfIn"[^>]*>)<\/label>/,'<div class="pfsrc"><label class="btn btn-pri">사진첩에서 고르기$2</label><label class="btn btn-line">카메라로 찍기<input id="pfCam" type="file" accept="image/*" capture="environment" style="display:none"></label></div>');
  return h;};
document.addEventListener('click',function(e){if(e.target.closest('[data-pfpick]')){var i=document.getElementById('pfIn');if(i)i.click();}});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.dataset&&e.target.dataset.pfpick){e.preventDefault();e.target.click();}});
document.addEventListener('change',function(e){if(e.target.id==='pfCam'&&e.target.files.length){pfFeed(e.target.files);e.target.value='';}});
/* 끌어다 놓기: 보정 화면 어디든 */
(function(){var n=0;function on(v){var b=document.getElementById('pfCmp');if(b)b.classList.toggle('pfdrop',v);}
  function isFiles(e){return e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],'Files')>=0;}
  document.addEventListener('dragenter',function(e){if(cur()!=='photofix'||!isFiles(e))return;e.preventDefault();n++;on(true);});
  document.addEventListener('dragover',function(e){if(cur()!=='photofix'||!isFiles(e))return;e.preventDefault();e.dataTransfer.dropEffect='copy';});
  document.addEventListener('dragleave',function(e){if(cur()!=='photofix')return;n=Math.max(0,n-1);if(!n)on(false);});
  document.addEventListener('drop',function(e){if(cur()!=='photofix'||!isFiles(e))return;e.preventDefault();n=0;on(false);pfFeed(e.dataTransfer.files);});})();
/* 붙여넣기 (캡처·복사한 사진) */
document.addEventListener('paste',function(e){if(cur()!=='photofix')return;var tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA')return;var it=[].slice.call((e.clipboardData||{}).items||[]).filter(function(x){return x.kind==='file'&&/^image\//.test(x.type);});if(!it.length)return;e.preventDefault();pfFeed(it.map(function(x,i){var f=x.getAsFile();return new File([f],'붙여넣은사진'+(i+1)+'.'+(f.type.split('/')[1]||'png'),{type:f.type});}));});
/* 못 여는 사진(HEIC 등) 안내 */
document.addEventListener('change',function(e){if(e.target.id!=='pfIn')return;var F=[].slice.call(e.target.files||[]);if(F.some(function(f){return /heic|heif/i.test(f.type+f.name);})&&!/Safari/.test(navigator.userAgent.replace(/Chrome|CriOS|Edg/g,'X')))setTimeout(function(){toast('HEIC 사진은 이 브라우저에서 못 열 수 있어요. 휴대폰 사진첩에서 고르면 자동으로 JPG로 바뀌어요');},400);});
/* --- 저장 --- */
/* 휴대폰: 공유 창의 "이미지 저장"으로 사진첩에 바로. PC: 고른 폴더(예: 사진 폴더)에 바로 저장 */
var PFDIR={h:null};
function idb(){return new Promise(function(ok,no){var r=indexedDB.open('dtdo',1);r.onupgradeneeded=function(){r.result.createObjectStore('kv');};r.onsuccess=function(){ok(r.result);};r.onerror=no;});}
function idbGet(k){return idb().then(function(db){return new Promise(function(ok){var q=db.transaction('kv').objectStore('kv').get(k);q.onsuccess=function(){ok(q.result);};q.onerror=function(){ok(null);};});}).catch(function(){return null;});}
function idbSet(k,v){return idb().then(function(db){return new Promise(function(ok){var t=db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=ok;t.onerror=ok;});}).catch(function(){});}
if(window.showDirectoryPicker)idbGet('pfDir').then(function(h){PFDIR.h=h||null;});
function pfDirOk(h,ask){if(!h||!h.queryPermission)return Promise.resolve(false);return h.queryPermission({mode:'readwrite'}).then(function(p){if(p==='granted')return true;return ask?h.requestPermission({mode:'readwrite'}).then(function(q){return q==='granted';}):false;});}
function pfToDir(blob,name){var h=PFDIR.h;return pfDirOk(h,true).then(function(ok){if(!ok)throw 0;var base=name.replace(/\.jpg$/,''),nm=name,i=1;
  function free(){return h.getFileHandle(nm).then(function(){nm=base+' ('+(i++)+').jpg';return free();},function(){return nm;});}
  return free().then(function(n){return h.getFileHandle(n,{create:true});}).then(function(fh){return fh.createWritable();}).then(function(w){return w.write(blob).then(function(){return w.close();});});});}
function pfDl(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},2000);}
pfSave=function(f){pfBlob(f,function(b){var name=pfName(f);
  if(PF_TOUCH&&navigator.canShare){var file=new File([b],name,{type:'image/jpeg'});if(navigator.canShare({files:[file]})){navigator.share({files:[file]}).then(function(){toast('저장했어요');}).catch(function(err){if(err&&err.name!=='AbortError')pfDl(b,name);});return;}}
  if(PFDIR.h)return pfToDir(b,name).then(function(){toast('"'+PFDIR.h.name+'" 폴더에 저장했어요');}).catch(function(){pfDl(b,name);});
  pfDl(b,name);});};
/* 여러 장: 휴대폰은 한 번에 공유 창으로 */
window.addEventListener('click',function(e){var t=e.target.closest('[data-pfsave="all"]');if(!t||!PF_TOUCH||!navigator.canShare)return;e.preventDefault();e.stopImmediatePropagation();toast('사진을 준비하는 중이에요…');
  Promise.all(PF.files.map(function(f){return new Promise(function(ok){pfBlob(f,function(b){ok(new File([b],pfName(f),{type:'image/jpeg'}));});});})).then(function(F){if(navigator.canShare({files:F}))navigator.share({files:F}).then(function(){toast(F.length+'장을 저장했어요');}).catch(function(){});else F.forEach(function(f,i){setTimeout(function(){pfDl(f,f.name);},i*400);});});},true);
/* 저장 위치 안내 · PC 폴더 고르기 */
var _pfShow72=pfShow;pfShow=function(){_pfShow72();var a=document.getElementById('pfAll');if(!a||!PF.files.length||document.getElementById('pfDirBox'))return;var d=document.createElement('div');d.className='pfdir';d.id='pfDirBox';
  if(PF_TOUCH)d.innerHTML='<span class="small">저장을 누르면 공유 창이 떠요. <b>"이미지 저장"</b>(아이폰) 또는 <b>"갤러리"</b>(안드로이드)를 고르면 사진첩에 들어가요.</span>';
  else if(window.showDirectoryPicker)d.innerHTML='<span class="small" id="pfDirTx">'+(PFDIR.h?'저장 폴더: <b>'+esc(PFDIR.h.name)+'</b>':'지금은 "다운로드" 폴더에 저장돼요.')+'</span><button class="chip" type="button" data-pfdir="1">'+(PFDIR.h?'폴더 바꾸기':'저장 폴더 고르기 (예: 사진)')+'</button>'+(PFDIR.h?'<button class="chip" type="button" data-pfdir="0">다운로드로</button>':'');
  else d.innerHTML='<span class="small">보정한 사진은 "다운로드" 폴더에 저장돼요.</span>';a.appendChild(d);};
document.addEventListener('click',function(e){var t=e.target.closest('[data-pfdir]');if(!t)return;var box=document.getElementById('pfDirBox');
  if(t.dataset.pfdir==='0'){PFDIR.h=null;idbSet('pfDir',null);if(box)box.remove();pfShow();return;}
  window.showDirectoryPicker({id:'dtdo-photos',mode:'readwrite',startIn:'pictures'}).then(function(h){PFDIR.h=h;idbSet('pfDir',h);if(box)box.remove();pfShow();toast('"'+h.name+'" 폴더에 저장할게요');}).catch(function(){});});
