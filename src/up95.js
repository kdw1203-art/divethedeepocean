/* ===== 사진 보정: 미리보기를 작게, 오른쪽에 테마 미리보기 4칸 ===== */
var THM95=['auto','tropic','green','deep'];
function thmWrap(){if(cur()!=='photofix')return;var c=document.getElementById('pfCmp');if(!c||c.parentElement.classList.contains('pfstage'))return;var r=document.createElement('div');r.className='pfstage';c.before(r);r.appendChild(c);var t=document.createElement('div');t.className='pfthm';t.id='pfThm';t.setAttribute('role','group');t.setAttribute('aria-label','보정 테마 미리보기');r.appendChild(t);thmPaint();}
function thmPaint(){var t=document.getElementById('pfThm');if(!t)return;var f=PF.files&&PF.files[PF.i||0],cur=(PF.opt&&PF.opt.preset)||'auto';
  t.innerHTML=THM95.map(function(k){var nm=(PFP[k]||[k])[0].replace(/\s*\(.*\)/,'');return '<button type="button" class="thm'+(k===cur?' on':'')+'" data-thm="'+k+'" aria-pressed="'+(k===cur)+'"><span class="thi thi-'+k+'"></span><b>'+esc(nm)+'</b></button>';}).join('');
  if(!f||!f.img)return;THM95.forEach(function(k,i){setTimeout(function(){try{var cv=pfApply(f.img,PF.k==null?70:PF.k,260,Object.assign({},PF.opt||{},{preset:k}));var sp=t.querySelector('[data-thm="'+k+'"] .thi');if(sp&&cv){sp.className='thi';sp.innerHTML='';cv.removeAttribute('class');sp.appendChild(cv);}}catch(e){}},30*i);});}
var _thT;function thmLater(){clearTimeout(_thT);_thT=setTimeout(thmPaint,260);}
if(typeof pfShow==='function'){var _pfS95=pfShow;pfShow=function(){var r=_pfS95.apply(this,arguments);thmWrap();thmLater();return r;};}
document.addEventListener('click',function(e){var b=e.target.closest('[data-thm]');if(b){var k=b.dataset.thm,ch=document.querySelector('[data-pfpre="'+k+'"]');if(ch)ch.click();else{PF.opt=PF.opt||{};PF.opt.preset=k;if(typeof pfShow==='function')pfShow();}setTimeout(thmPaint,60);return;}if(e.target.closest('[data-pfpre]'))setTimeout(thmPaint,120);});
document.addEventListener('change',function(e){if(e.target.closest&&e.target.closest('.pfedit'))thmLater();},true);
var _after95=after;after=function(){_after95();thmWrap();setTimeout(thmWrap,300);};
(function(){var st=document.createElement('style');st.textContent=
'.pfstage{display:grid;grid-template-columns:minmax(0,1fr) 128px;gap:10px;align-items:stretch;margin-bottom:10px}'+
'.pfstage .pfcmp{aspect-ratio:auto!important;height:clamp(220px,40vh,360px);min-height:0}.pfstage .pfempty{height:100%!important;min-height:0!important;padding:12px!important}'+
'.pfthm{display:grid;grid-template-rows:repeat(4,minmax(0,1fr));gap:8px;height:clamp(220px,40vh,360px)}'+
'.thm{position:relative;display:block;padding:0;border:2px solid transparent;border-radius:12px;overflow:hidden;background:var(--bg);cursor:pointer;min-height:0}.thm.on{border-color:var(--sea);box-shadow:0 0 0 2px color-mix(in srgb,var(--sea) 25%,transparent)}'+
'.thm .thi{position:absolute;inset:0;display:block}.thm .thi canvas{width:100%;height:100%;object-fit:cover;display:block}'+
'.thm b{position:absolute;left:6px;right:6px;bottom:5px;font-size:11.5px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6);text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.thi-auto{background:linear-gradient(135deg,#2d6f8f,#7fb3a8 60%,#e0b48a)}.thi-tropic{background:linear-gradient(135deg,#0e7fb8,#39c0d8 60%,#f2d49b)}.thi-green{background:linear-gradient(135deg,#3c6f4a,#7aa56b 60%,#d9b38c)}.thi-deep{background:linear-gradient(135deg,#0b2e4f,#2b5f86 60%,#c98b6b)}'+
'@media (max-width:600px){.pfstage{grid-template-columns:minmax(0,1fr) 78px;gap:8px}.pfstage .pfcmp,.pfthm{height:clamp(200px,34vh,280px)}.thm b{font-size:10.5px}}';document.head.appendChild(st);})();
if(LANG==='en'){Object.assign(EN_D,{'보정 테마 미리보기':'Theme previews'});}
