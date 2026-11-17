/* ===== 카메라별 자동 보정 (고프로 · DJI 액션 · 인스타360 · TG 디카 · 컴팩트 · 미러리스 · 휴대폰) · 아웃포커싱(조리개) ===== */
/* 카메라 특성(참고: Backscatter·UWPG·DAN·waterpixels 등 수중 촬영 가이드)
   - 고프로: 물속에서 수동 화이트밸런스를 못 맞춰 빨간색이 많이 빠짐 → 빨강 보정 강하게, 대비·채도 조금
   - DJI 액션: 색온도 센서로 어느 정도 맞춰 찍힘 → 가볍게
   - 인스타360: 자동 화이트밸런스 위주 → 중간
   - TG 디카: 수중 화이트밸런스(얕은/중간/깊은) 모드로 찍는 경우가 많음 → 살짝만
   - 미러리스·DSLR: 스트로브·수동 화이트밸런스를 많이 씀 → 원래 색 살리기
   - 플랫·로그(Flat, GP-Log, D-Log M): 대비·채도가 낮게 찍힘 → 대비·채도 더 */
var CAMP={gopro:['고프로',1.25,1.1,{con:10,sat:12,dehaze:12,sharp:8},'수동 화이트밸런스를 못 맞춰 빨간색이 많이 빠져요. 빨강을 강하게 되살려요.'],
  dji:['DJI 액션',0.75,0.9,{con:4,sat:6,dehaze:6,sharp:0},'색온도 센서로 어느 정도 맞춰서 찍혀요. 가볍게 보정해요.'],
  insta:['인스타360',0.95,1,{con:8,sat:10,dehaze:10,sharp:6},'자동 화이트밸런스로 찍힌 걸 기준으로 중간 정도 보정해요.'],
  tg:['TG 수중 디카',0.5,0.7,{con:4,sat:6,dehaze:4,sharp:0},'수중 화이트밸런스 모드로 찍은 경우가 많아 살짝만 손대요.'],
  compact:['컴팩트 디카',1,1,{con:6,sat:8,dehaze:8,sharp:4},'자동 화이트밸런스 기준으로 보정해요.'],
  ml:['미러리스 · DSLR',0.6,0.8,{con:4,sat:4,dehaze:4,sharp:0},'스트로브나 수동 화이트밸런스를 많이 써서 원래 색을 살리는 쪽으로 보정해요.'],
  phone:['휴대폰 (하우징)',1.05,1,{con:6,sat:6,dehaze:10,sharp:0},'휴대폰 자동 보정이 들어간 사진 기준으로 보정해요.']};
Object.assign(PFO0,{cam:'auto',flat:0,ap:0,fx:.5,fy:.5,fr:35,fm:'ci'});PF.opt=Object.assign({},PFO0,PF.opt);
(function(){var st=document.createElement('style');st.textContent='.pfcam{margin-top:12px}.pfcam .sttabs{display:flex;gap:6px;flex-wrap:wrap}.pfbk{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px 12px;align-items:end;margin-top:6px}.pfbk select{width:100%!important}.pfcmp.focus{cursor:crosshair}.pffp{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 2px rgba(0,0,0,.35);pointer-events:none}';document.head.appendChild(st);})();
/* EXIF 제조사 · 모델 읽기 (JPEG 앞부분만) */
function exifMM(buf){var v=new DataView(buf),o=2,L=v.byteLength;if(v.getUint16(0)!==0xFFD8)return null;while(o+4<L){var m=v.getUint16(o),n=v.getUint16(o+2);if(m===0xFFE1&&v.getUint32(o+4)===0x45786966){var t=o+10,le=v.getUint16(t)===0x4949,g16=function(p){return v.getUint16(p,le);},g32=function(p){return v.getUint32(p,le);},ifd=t+g32(t+4),cnt=g16(ifd),r={};
  for(var i=0;i<cnt;i++){var e=ifd+2+i*12,tag=g16(e);if(tag!==0x010F&&tag!==0x0110)continue;var c=g32(e+4),p=c>4?t+g32(e+8):e+8,s='';for(var j=0;j<c-1&&p+j<L;j++)s+=String.fromCharCode(v.getUint8(p+j));r[tag===0x010F?'make':'model']=s.replace(/\0/g,'').trim();}return r;}if((m&0xFF00)!==0xFF00)break;o+=2+n;}return null;}
function camOf(mm){if(!mm)return null;var a=(mm.make||'')+' '+(mm.model||'');if(/gopro/i.test(a))return 'gopro';if(/\bdji\b|osmo|\bOA\d/i.test(a))return 'dji';if(/insta360|arashi/i.test(a))return 'insta';if(/(olympus|om digital)/i.test(a)&&/TG-/i.test(a))return 'tg';
  if(/apple|samsung|google|xiaomi|huawei|oneplus|oppo|vivo/i.test(mm.make||''))return 'phone';if(/ILCE|EOS|NIKON Z|\bZ ?\d|X-[A-Z]\d|X-[A-Z]|DC-G|DC-S|E-M\d|OM-\d|GFX|\bD\d{3,4}|α/i.test(mm.model||''))return 'ml';if(/RX100|PowerShot|DC-TZ|DMC|COOLPIX|DSC-|G7 ?X|TG-/i.test(a))return 'compact';return null;}
function pfCamDetect(f){if(f.camChk)return;f.camChk=1;fetch(f.url).then(function(r){return r.blob();}).then(function(b){return b.slice(0,262144).arrayBuffer();}).then(function(buf){var mm=exifMM(buf);f.mm=mm;f.img._cam=camOf(mm);if(f===PF.files[PF.i||0]){pfCamLabel();if(f.img._cam&&PF.opt.cam==='auto')pfShow();}}).catch(function(){});}
function pfCamId(img,o){if(!o||o.cam==='none')return null;return o.cam==='auto'?(img&&img._cam)||null:o.cam;}
/* 보정 적용: 카메라 특성은 숨은 기본값으로 더해지고, 내가 움직인 슬라이더는 그대로예요 */
var _pfA73=pfApply;pfApply=function(img,k,maxW,opt){if(!opt)return _pfA73(img,k,maxW,opt);var cid=pfCamId(img,opt),o2=opt;
  if(cid||opt.flat){var C=CAMP[cid]||['',1,1,{con:0,sat:0,dehaze:0,sharp:0}],pr=PFP[opt.preset]||PFP.auto,key='_c_'+(cid||'x')+'_'+opt.preset;if(!PFP[key])Object.defineProperty(PFP,key,{value:[pr[0]+'/'+(cid||'x'),pr[1]*C[1],Math.min(1.6,pr[2]*C[2]),pr[3],pr[4]],enumerable:false});
    var off=C[3],fl=opt.flat?{con:22,sat:25}:{con:0,sat:0},cl=function(v,a,b){return Math.max(a,Math.min(b,v));};
    o2=Object.assign({},opt,{preset:key,con:cl(opt.con+off.con+fl.con,-100,100),sat:cl(opt.sat+off.sat+fl.sat,-100,100),dehaze:cl(opt.dehaze+off.dehaze,0,100),sharp:cl(opt.sharp+off.sharp,0,100)});}
  return _pfA73(img,k,maxW,o2);};
/* --- 아웃포커싱: 조리개 값이 작을수록 초점 밖이 더 흐려져요 --- */
var APR={'1.4':0.032,'2':0.024,'2.8':0.017,'4':0.012,'5.6':0.008,'8':0.005};
var CF=(function(){try{var c=document.createElement('canvas').getContext('2d');c.filter='blur(2px)';return c.filter==='blur(2px)';}catch(e){return false;}})();
function pfBlurCopy(c,r){var W=c.width,H=c.height,b=document.createElement('canvas');b.width=W;b.height=H;var x=b.getContext('2d');
  if(CF){x.filter='blur('+r.toFixed(1)+'px)';x.drawImage(c,0,0);x.filter='none';return b;}
  /* 필터를 못 쓰는 브라우저: 작게 줄였다 키워서 흐리게 */
  var k=Math.max(1,r/1.6),s=document.createElement('canvas');s.width=Math.max(1,W/k|0);s.height=Math.max(1,H/k|0);var sx=s.getContext('2d');sx.imageSmoothingQuality='high';sx.drawImage(c,0,0,s.width,s.height);
  var s2=document.createElement('canvas');s2.width=Math.max(1,s.width/2|0);s2.height=Math.max(1,s.height/2|0);s2.getContext('2d').drawImage(s,0,0,s2.width,s2.height);x.imageSmoothingQuality='high';x.drawImage(s,0,0,W,H);x.globalAlpha=0.5;x.drawImage(s2,0,0,W,H);x.globalAlpha=1;return b;}
function pfBokeh(c,o){var W=c.width,H=c.height,mn=Math.min(W,H),r=mn*(APR[String(o.ap)]||0.012);if(r<0.6)return c;var bl=pfBlurCopy(c,r),out=document.createElement('canvas');out.width=W;out.height=H;var x=out.getContext('2d');
  /* 흐린 쪽 밝은 점을 살짝 살려서 망울 느낌 */
  x.drawImage(bl,0,0);x.globalCompositeOperation='screen';x.globalAlpha=0.12;x.drawImage(bl,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';
  var sh=document.createElement('canvas');sh.width=W;sh.height=H;var s=sh.getContext('2d');s.drawImage(c,0,0);s.globalCompositeOperation='destination-in';var cx=o.fx*W,cy=o.fy*H,g,rad=mn*(0.08+o.fr/100*0.6);
  if(o.fm==='band'){g=s.createLinearGradient(0,cy-rad*1.6,0,cy+rad*1.6);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(0.32,'rgba(0,0,0,1)');g.addColorStop(0.68,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');}
  else{g=s.createRadialGradient(cx,cy,rad*0.55,cx,cy,rad*1.7);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');}
  s.fillStyle=g;s.fillRect(0,0,W,H);x.drawImage(sh,0,0);return out;}
var _pfAdj73=pfAdjust;pfAdjust=function(c,o){var txt=o.txt;if(o.ap&&txt){o=Object.assign({},o,{txt:''});}c=_pfAdj73(c,o);if(o.ap)c=pfBokeh(c,o);if(txt&&o.ap&&typeof pfText==='function')pfText(c,txt,o.tpos);return c;};
/* --- 화면 --- */
function pfCamHtml(){var o=PF.opt,keys=['auto'].concat(Object.keys(CAMP)).concat(['none']);return '<div class="pfcam"><p class="pfh" style="margin-top:0">찍은 카메라</p><div class="sttabs" role="group" aria-label="카메라">'+keys.map(function(k){return '<button class="chip" type="button" data-pfcam="'+k+'" aria-pressed="'+(o.cam===k)+'">'+(k==='auto'?'자동 감지':k==='none'?'안 씀':CAMP[k][0])+'</button>';}).join('')+'</div><p class="small" id="pfCamTx" style="margin:6px 0 0"></p><label class="small" style="display:flex;gap:6px;align-items:center;margin-top:4px;cursor:pointer"><input type="checkbox" id="pf_flat"'+(o.flat?' checked':'')+'> 플랫 · 로그로 찍었어요 (Flat, GP-Log, D-Log M, Log)</label></div>';}
function pfBkHtml(){var o=PF.opt;return '<p class="pfh">아웃포커싱 (배경 흐리기)</p><div class="pfbk"><label for="pf_ap">조리개<select id="pf_ap"><option value="0">끄기</option>'+['1.4','2','2.8','4','5.6','8'].map(function(a){return '<option value="'+a+'"'+(String(o.ap)===a?' selected':'')+'>f/'+a+(a==='1.4'?' (가장 흐리게)':a==='8'?' (살짝)':'')+'</option>';}).join('')+'</select></label><label for="pf_fm">초점 모양<select id="pf_fm"><option value="ci"'+(o.fm==='ci'?' selected':'')+'>동그랗게 (피사체)</option><option value="band"'+(o.fm==='band'?' selected':'')+'>가로 띠 (바닥·수평)</option></select></label><label for="pf_fr">초점 크기 <b id="pfv_fr">'+o.fr+'</b><input id="pf_fr" type="range" min="0" max="100" value="'+o.fr+'"></label><button class="chip" type="button" data-pffocus="1" aria-pressed="false">사진을 눌러 초점 정하기</button></div>';}
var _pfV73=V.photofix;V.photofix=function(){return _pfV73().replace('<div class="pfpre" role="group"',pfCamHtml()+'<div class="pfpre" role="group"').replace('<div class="pfbar">',pfBkHtml()+'<div class="pfbar">');};
function pfCamLabel(){var tx=document.getElementById('pfCamTx');if(!tx)return;var f=PF.files[PF.i||0],o=PF.opt,cid=f?pfCamId(f.img,o):null,mm=f&&f.mm;
  tx.textContent=o.cam==='none'?'카메라 특성은 빼고 보정해요.':o.cam==='auto'?(f?(cid?'감지: '+(mm?[mm.make,mm.model].filter(Boolean).join(' '):CAMP[cid][0])+' → '+CAMP[cid][0]+'. '+CAMP[cid][4]:(mm&&(mm.make||mm.model)?'감지: '+[mm.make,mm.model].filter(Boolean).join(' ')+' (따로 맞춘 값이 없어 기본으로 보정해요)':'사진에 카메라 정보가 없어요. 직접 골라 주세요.')):'사진을 열면 카메라를 알아서 찾아요.'):CAMP[o.cam][4];}
var _pfShow73=pfShow;pfShow=function(){_pfShow73();PF.files.forEach(pfCamDetect);pfCamLabel();pfFocusDot();};
var _pfSync73=pfSync;pfSync=function(){_pfSync73();var o=PF.opt;[].forEach.call(document.querySelectorAll('[data-pfcam]'),function(b){b.setAttribute('aria-pressed',b.dataset.pfcam===o.cam);});var q=function(i){return document.getElementById(i);};if(q('pf_flat'))q('pf_flat').checked=!!o.flat;if(q('pf_ap'))q('pf_ap').value=String(o.ap||0);if(q('pf_fm'))q('pf_fm').value=o.fm;if(q('pf_fr')){q('pf_fr').value=o.fr;q('pfv_fr').textContent=o.fr;}pfCamLabel();};
document.addEventListener('click',function(e){var t=e.target.closest('[data-pfcam],[data-pffocus]');if(!t)return;if(t.dataset.pfcam){PF.opt.cam=t.dataset.pfcam;[].forEach.call(document.querySelectorAll('[data-pfcam]'),function(b){b.setAttribute('aria-pressed',b===t);});pfCamLabel();pfRe();return;}
  PF.focus=!PF.focus;t.setAttribute('aria-pressed',PF.focus);var b=document.getElementById('pfCmp');if(b)b.classList.toggle('focus',PF.focus);if(PF.focus){if(!+PF.opt.ap){PF.opt.ap=2.8;var s=document.getElementById('pf_ap');if(s)s.value='2.8';pfRe();}toast('사진에서 또렷하게 둘 곳을 눌러 주세요');}});
document.addEventListener('change',function(e){var t=e.target;if(t.id==='pf_flat'){PF.opt.flat=t.checked?1:0;pfRe();}if(t.id==='pf_ap'){PF.opt.ap=+t.value;pfRe();}if(t.id==='pf_fm'){PF.opt.fm=t.value;pfRe();}});
document.addEventListener('input',function(e){if(e.target.id==='pf_fr'){PF.opt.fr=+e.target.value;document.getElementById('pfv_fr').textContent=e.target.value;pfRe();}});
/* 초점 위치 찍기 (비교 선 끌기보다 먼저 받아요) */
window.addEventListener('pointerdown',function(e){if(!PF.focus)return;var box=e.target.closest&&e.target.closest('#pfCmp');if(!box)return;var c=box.querySelector('canvas.aft');if(!c)return;e.preventDefault();e.stopImmediatePropagation();
  var r=box.getBoundingClientRect(),s=Math.min(r.width/c.width,r.height/c.height),w=c.width*s,h=c.height*s,ox=r.left+(r.width-w)/2,oy=r.top+(r.height-h)/2,fx=(e.clientX-ox)/w,fy=(e.clientY-oy)/h;if(fx<0||fx>1||fy<0||fy>1)return;
  PF.opt.fx=Math.round(fx*1000)/1000;PF.opt.fy=Math.round(fy*1000)/1000;pfFocusDot();pfRe();},true);
function pfFocusDot(){var box=document.getElementById('pfCmp');if(!box)return;var d=box.querySelector('.pffp');if(!+PF.opt.ap){if(d)d.remove();return;}var c=box.querySelector('canvas.aft');if(!c)return;if(!d){d=document.createElement('span');d.className='pffp';box.appendChild(d);}
  var r=box.getBoundingClientRect(),s=Math.min(r.width/c.width,r.height/c.height),w=c.width*s,h=c.height*s;d.style.left=((r.width-w)/2+PF.opt.fx*w)+'px';d.style.top=((r.height-h)/2+PF.opt.fy*h)+'px';box.classList.toggle('focus',!!PF.focus);}
