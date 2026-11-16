/* ===== 사진 편집 2: 되돌리기 · 한 번에 맞추기 · 사진별 설정 · 내 설정 · 밝은 곳/어두운 곳 · 노이즈 · 수평 · 글자 · 저장 크기 · 공유 ===== */
PFS.push(['hi','밝은 곳 누르기',0,100],['sh','어두운 곳 살리기',0,100],['nr','노이즈 줄이기',0,100],['tilt','수평 맞추기',-15,15]);
Object.assign(PFO0,{hi:0,sh:0,nr:0,tilt:0,txt:'',tpos:'bl'});
PF.opt=Object.assign({},PFO0,PF.opt);
PF.link=LS.get('pfLink',true);PF.out=Object.assign({size:0,q:.92},LS.get('pfOut',{}));PF.hist=[];PF.redo=[];
(function(){var st=document.createElement('style');st.textContent='.pfrow{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:10px}.pfrow input[type=text]{flex:1;min-width:150px;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font:inherit}.pfrow select{width:auto!important;flex:0 1 auto;padding:7px 8px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit}.pfmy{display:inline-flex;align-items:center;gap:2px}.pfmy .x{border:0;background:none;color:var(--mut);cursor:pointer;padding:0 4px;font-size:15px}.pfh{font-size:12.5px;color:var(--mut);margin:12px 0 0;font-weight:600}';document.head.appendChild(st);})();
function pfMy(){return LS.get('pfMy',[]);}
function pfMyHtml(){var m=pfMy();return m.map(function(p,i){return '<span class="pfmy"><button class="chip" type="button" data-pfmy="'+i+'">'+esc(p.n)+'</button><button class="x" type="button" data-pfmyx="'+i+'" aria-label="'+esc(p.n)+' 지우기">×</button></span>';}).join('')+(m.length<8?'<button class="chip" type="button" data-pfmyadd="1">+ 지금 설정 저장</button>':'');}
function pfExtraHtml(){var o=PF.opt,O=PF.out;return '<div class="pfrow"><button class="chip" type="button" data-pfundo="1" aria-label="되돌리기">↶ 되돌리기</button><button class="chip" type="button" data-pfredo="1" aria-label="다시 하기">↷ 다시</button><button class="chip" type="button" data-pfautolv="1">한 번에 맞추기</button><label class="chip" style="cursor:pointer"><input type="checkbox" id="pf_link"'+(PF.link?' checked':'')+' style="margin-right:4px">모든 사진 같은 설정</label></div>'+
  '<p class="pfh">내 설정</p><div class="pfrow" id="pfMyBox">'+pfMyHtml()+'</div>'+
  '<p class="pfh">사진에 글자 넣기</p><div class="pfrow"><input type="text" id="pf_txt" maxlength="60" placeholder="예: 문섬 · 18m · 2026.11" value="'+esc(o.txt||'')+'"><select id="pf_tpos" aria-label="글자 위치"><option value="bl">왼쪽 아래</option><option value="br">오른쪽 아래</option><option value="tl">왼쪽 위</option></select></div>'+
  '<p class="pfh">저장</p><div class="pfrow"><select id="pf_size" aria-label="저장 크기"><option value="0">원본 크기</option><option value="2048">2048px (인스타·블로그)</option><option value="1080">1080px (메신저)</option></select><select id="pf_q" aria-label="화질"><option value="0.92">고화질</option><option value="0.8">보통 (용량 작게)</option></select>'+(navigator.canShare?'<button class="chip" type="button" data-pfshare="1">바로 공유</button>':'')+'</div>';}
var _pfV66=V.photofix;V.photofix=function(){return _pfV66().replace('<canvas class="pfhist"',pfExtraHtml()+'<canvas class="pfhist"');};
/* 추가 조절: 밝은 곳 · 어두운 곳 · 노이즈 · 수평 · 글자 */
var _pfAdj66=pfAdjust;
pfAdjust=function(c,o){c=_pfAdj66(c,o);if(o.hi||o.sh)pfTone(c,o.hi/100,o.sh/100);if(o.nr)pfDenoise(c,o.nr/100);if(o.tilt)c=pfTilt(c,o.tilt);if(o.txt)pfText(c,o.txt,o.tpos);return c;};
function pfTone(c,hi,sh){var x=c.getContext('2d'),id=x.getImageData(0,0,c.width,c.height),d=id.data;for(var i=0;i<d.length;i+=4){var L=(0.299*d[i]+0.587*d[i+1]+0.114*d[i+2])/255,f=1-hi*0.45*Math.pow(L,3)+sh*0.6*Math.pow(1-L,3)*(L>0.02?1:L/0.02),k;for(k=0;k<3;k++){var v=d[i+k]*f;d[i+k]=v>255?255:v;}}x.putImageData(id,0,0);}
function pfDenoise(c,a){var x=c.getContext('2d'),W=c.width,H=c.height,src=x.getImageData(0,0,W,H),s=src.data,out=x.createImageData(W,H),o=out.data,th=8+a*30;o.set(s);
  for(var y=1;y<H-1;y++)for(var xx=1;xx<W-1;xx++){var i=(y*W+xx)*4;for(var ch=0;ch<3;ch++){var v=s[i+ch],sum=0,cnt=0;for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var u=s[i+(dy*W+dx)*4+ch];if(Math.abs(u-v)<th){sum+=u;cnt++;}}o[i+ch]=v+(sum/cnt-v)*a;}}x.putImageData(out,0,0);}
function pfTilt(c,deg){var r=deg*Math.PI/180,W=c.width,H=c.height,s=Math.abs(Math.cos(r))+Math.abs(Math.sin(r))*Math.max(W/H,H/W),n=document.createElement('canvas');n.width=W;n.height=H;var x=n.getContext('2d');x.translate(W/2,H/2);x.rotate(r);x.scale(s,s);x.drawImage(c,-W/2,-H/2);return n;}
function pfText(c,t,pos){var x=c.getContext('2d'),W=c.width,H=c.height,fs=Math.max(14,Math.round(Math.min(W,H)*0.042)),m=Math.round(fs*0.9);x.save();x.font='600 '+fs+'px Pretendard,system-ui,sans-serif';x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=fs*0.35;x.shadowOffsetY=fs*0.06;x.textBaseline=pos==='tl'?'top':'bottom';x.textAlign=pos==='br'?'right':'left';x.fillText(t,pos==='br'?W-m:m,pos==='tl'?m:H-m);x.restore();}
/* 되돌리기 */
function pfSnap(){return JSON.stringify([PF.opt,PF.k]);}
function pfCommit(){var s=pfSnap();if(PF.hist[PF.hist.length-1]!==s){PF.hist.push(s);if(PF.hist.length>40)PF.hist.shift();PF.redo=[];}}
function pfRestore(s){var a=JSON.parse(s);PF.opt=Object.assign({},PFO0,a[0]);PF.k=a[1];pfSync();pfSaveOpt();pfShow();}
function pfUndo(){if(PF.hist.length<2)return toast('더 되돌릴 게 없어요');PF.redo.push(PF.hist.pop());pfRestore(PF.hist[PF.hist.length-1]);}
function pfRedo(){if(!PF.redo.length)return;var s=PF.redo.pop();PF.hist.push(s);pfRestore(s);}
var _pfRe66=pfRe;pfRe=function(){_pfRe66();clearTimeout(PF.t3);PF.t3=setTimeout(function(){pfCommit();pfKeep();},400);};
/* 화면 조절값 맞추기 */
function pfSync(){var o=PF.opt;PFS.forEach(function(s){var i=document.getElementById('pf_'+s[0]),v=document.getElementById('pfv_'+s[0]);if(i)i.value=o[s[0]]||0;if(v)v.textContent=o[s[0]]||0;});[].forEach.call(document.querySelectorAll('[data-pfpre]'),function(b){b.setAttribute('aria-pressed',b.dataset.pfpre===o.preset);});
  var q=function(id){return document.getElementById(id);};if(q('pf_bw'))q('pf_bw').checked=!!o.bw;if(q('pf_crop'))q('pf_crop').value=o.crop;if(q('pf_txt'))q('pf_txt').value=o.txt||'';if(q('pf_tpos'))q('pf_tpos').value=o.tpos||'bl';if(q('pfK')){q('pfK').value=PF.k;var kv=q('pfKv');if(kv)kv.textContent=PF.k;}if(q('pf_size'))q('pf_size').value=String(PF.out.size);if(q('pf_q'))q('pf_q').value=String(PF.out.q);}
/* 사진별 설정 */
function pfKeep(){var f=PF.files[PF.i||0];if(f&&!PF.link){f.opt=Object.assign({},PF.opt);f.k=PF.k;}}
document.addEventListener('click',function(e){var t=e.target.closest('[data-pfi]');if(!t||PF.link)return;pfKeep();var f=PF.files[+t.dataset.pfi];if(f){PF.i=+t.dataset.pfi;if(f.opt){PF.opt=Object.assign({},f.opt);PF.k=f.k;}pfSync();}},true);
/* 한 번에 맞추기: 밝기 · 대비 · 밝은 곳/어두운 곳을 사진에 맞춰 자동으로 */
function pfAutoLevel(){var f=PF.files[PF.i||0];if(!f)return;var o=Object.assign({},PF.opt,{exp:0,con:0,hi:0,sh:0,txt:'',sharp:0,nr:0,vig:0}),c=pfApply(f.img,PF.k,360,o),d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,n=d.length/4,H=new Uint32Array(256),sum=0,i;
  for(i=0;i<d.length;i+=4){var L=(0.299*d[i]+0.587*d[i+1]+0.114*d[i+2])|0;H[L]++;sum+=L;}var mean=sum/n/255,acc=0,p2=0,p98=255,hiN=0,loN=0;for(i=0;i<256;i++){acc+=H[i];if(acc<n*0.02)p2=i;if(acc<n*0.98)p98=i;if(i>242)hiN+=H[i];if(i<16)loN+=H[i];}
  var cl=function(v,a,b){return Math.round(Math.max(a,Math.min(b,v)));},spread=Math.max(0.1,(p98-p2)/255);
  Object.assign(PF.opt,{exp:cl(100*Math.log(0.46/Math.max(.05,mean))/Math.LN2*0.8,-60,60),con:cl((0.82/spread-1)*60,-25,45),hi:hiN/n>0.015?cl(hiN/n*1500,20,70):0,sh:loN/n>0.04?cl(loN/n*500,15,60):0,sat:Math.max(PF.opt.sat,8)});
  pfSync();pfRe();toast('밝기와 대비를 맞췄어요. 마음에 안 들면 되돌리기를 눌러요');}
/* 저장 · 공유 */
function pfOptOf(f){return PF.link?PF.opt:(f===PF.files[PF.i||0]?PF.opt:(f.opt||PF.opt));}
function pfKOf(f){return PF.link||f===PF.files[PF.i||0]?PF.k:(f.k!=null?f.k:PF.k);}
function pfBlob(f,cb){var c=pfApply(f.img,pfKOf(f),PF.out.size||null,pfOptOf(f));c.toBlob(cb,'image/jpeg',PF.out.q);}
function pfName(f){return f.name.replace(/\.[^.]+$/,'')+'_보정.jpg';}
pfSave=function(f){pfBlob(f,function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=pfName(f);document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},2000);});};
function pfShare(){var f=PF.files[PF.i||0];if(!f)return;pfBlob(f,function(b){var file=new File([b],pfName(f),{type:'image/jpeg'});if(navigator.canShare&&navigator.canShare({files:[file]}))navigator.share({files:[file]}).catch(function(){});else{pfSave(f);}});}
/* 이벤트 */
document.addEventListener('click',function(e){var t=e.target.closest('[data-pfundo],[data-pfredo],[data-pfautolv],[data-pfmy],[data-pfmyx],[data-pfmyadd],[data-pfshare]');if(!t)return;var d=t.dataset;
  if(d.pfundo)return pfUndo();if(d.pfredo)return pfRedo();if(d.pfautolv)return pfAutoLevel();if(d.pfshare)return pfShare();
  if(d.pfmyadd){var nm=(prompt('이 설정 이름','내 설정 '+(pfMy().length+1))||'').trim().slice(0,16);if(!nm)return;var m=pfMy();m.push({n:nm,o:Object.assign({},PF.opt,{txt:''}),k:PF.k});LS.set('pfMy',m);}
  else if(d.pfmyx){var m2=pfMy();m2.splice(+d.pfmyx,1);LS.set('pfMy',m2);}
  else if(d.pfmy){var p=pfMy()[+d.pfmy];if(p){var keepT=PF.opt.txt,keepP=PF.opt.tpos;PF.opt=Object.assign({},PFO0,p.o,{txt:keepT,tpos:keepP});PF.k=p.k;pfSync();pfRe();toast('"'+p.n+'" 설정을 적용했어요');}}
  var box=document.getElementById('pfMyBox');if(box)box.innerHTML=pfMyHtml();});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='pf_txt'){PF.opt.txt=t.value;pfRe();}if(t.id==='pfK'){clearTimeout(PF.t3);PF.t3=setTimeout(function(){pfCommit();pfKeep();},400);}});
document.addEventListener('change',function(e){var t=e.target;if(t.id==='pf_tpos'){PF.opt.tpos=t.value;pfRe();}if(t.id==='pf_link'){PF.link=t.checked;LS.set('pfLink',PF.link);if(!PF.link)PF.files.forEach(function(f){if(!f.opt){f.opt=Object.assign({},PF.opt);f.k=PF.k;}});toast(PF.link?'모든 사진에 같은 설정을 써요':'사진마다 따로 조절해요');}
  if(t.id==='pf_size'){PF.out.size=+t.value;LS.set('pfOut',PF.out);}if(t.id==='pf_q'){PF.out.q=+t.value;LS.set('pfOut',PF.out);}if(t.id==='pfIn'){PF.hist=[];PF.redo=[];setTimeout(pfCommit,600);}});
document.addEventListener('keydown',function(e){if(cur()!=='photofix'||!(e.ctrlKey||e.metaKey)||e.key.toLowerCase()!=='z')return;var tg=e.target.tagName;if(tg==='INPUT'&&e.target.type==='text')return;e.preventDefault();e.shiftKey?pfRedo():pfUndo();});
var _after66=after;after=function(){_after66();if(cur()==='photofix')setTimeout(pfSync,0);};
