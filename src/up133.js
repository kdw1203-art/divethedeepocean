/* ================= 133: 복사 버튼 고침 (알림이 시트 뒤에 가려짐 · 앱 내 브라우저 대비) ================= */
(function(){var st=document.createElement('style');st.textContent='#toast{z-index:2000!important}'+
  '.cpok133{background:var(--sea,#0E7C9B)!important;color:#fff!important;border-color:transparent!important}';document.head.appendChild(st);})();

/* 마지막으로 누른 버튼 기억 → 복사되면 버튼에 '복사됨' 표시 */
var cpBtn133=null;
document.addEventListener('click',function(e){cpBtn133=e.target.closest&&e.target.closest('button,.chip,a');},true);
function cpFlash133(){var b=cpBtn133;if(!b||b._cp133)return;var t=b.textContent;b._cp133=1;b.textContent='복사됨 ✓';b.classList.add('cpok133');
  setTimeout(function(){b.textContent=t;b.classList.remove('cpok133');b._cp133=0;},1600);}

/* 예전 방식 복사 (iOS · 카톡/인스타 앱 안 브라우저) */
function cpOld133(t){var box=document.getElementById('sheetbg')||document.body,ta=document.createElement('textarea'),ok=false,fo=document.activeElement;
  ta.value=t;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;border:0;padding:0';box.appendChild(ta);
  try{var r=document.createRange();r.selectNodeContents(ta);var s=window.getSelection();s.removeAllRanges();s.addRange(r);ta.select();ta.setSelectionRange(0,t.length);ok=document.execCommand('copy');}catch(e){ok=false;}
  ta.remove();try{window.getSelection().removeAllRanges();if(fo&&fo.focus)fo.focus({preventScroll:true});}catch(e){}return ok;}

/* 둘 다 안 되면: 옆 입력칸을 선택해 두고 길게 눌러 복사하도록 안내 */
function cpManual133(){var b=cpBtn133,row=b&&b.parentElement,i=row&&row.querySelector('input[readonly],textarea');
  if(!i){var bg=document.getElementById('sheetbg');i=bg&&bg.querySelector('input[readonly],textarea');}
  if(i){try{i.focus({preventScroll:true});i.select();i.setSelectionRange(0,i.value.length);}catch(e){}toast('선택된 글자를 길게 눌러 복사해 주세요');}
  else toast('이 브라우저에서는 복사가 막혀 있어요. Safari나 Chrome에서 열어 주세요');}

(function(){var lk=function(t){return typeof lkText127==='function'?lkText127(t):t;};
  var nat=null;try{if(navigator.clipboard&&navigator.clipboard.writeText)nat=navigator.clipboard.writeText.bind(navigator.clipboard);}catch(e){}
  var wt=function(t){t=String(t==null?'':t);
    var done=function(){cpFlash133();};
    if(!nat){if(cpOld133(lk(t))){done();return Promise.resolve();}cpManual133();return new Promise(function(){});}
    return nat(t).then(done,function(){if(cpOld133(lk(t))){done();return;}cpManual133();return new Promise(function(){});});};
  try{if(navigator.clipboard)navigator.clipboard.writeText=wt;else Object.defineProperty(navigator,'clipboard',{value:{writeText:wt},configurable:true});}catch(e){}})();

/* 읽기 전용 주소칸을 누르면 전체 선택 */
document.addEventListener('click',function(e){var i=e.target.closest&&e.target.closest('#sheetbg input[readonly]');if(i){try{i.select();i.setSelectionRange(0,i.value.length);}catch(x){}}});
