/* ===== 손글씨 로그북: 굿노트처럼 쓰는 편집기 + 해양동물 스티커 ===== */
var STK_F='<filter id="o" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="w"/><feDropShadow in="w" dx="0" dy="1.5" stdDeviation="1.5" flood-opacity=".25" result="ws"/><feMerge><feMergeNode in="ws"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
function stkSvg(id){var s=STK[id];if(!s)return '';return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 112 112" width="224" height="224"><defs>'+STK_F+'</defs><g filter="url(#o)">'+s[1]+'</g></svg>';}
function stkUrl(id){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(stkSvg(id));}
var STKI={};function stkImg(id,cb){var i=STKI[id];if(i){if(i.complete)return i;i._cb=(i._cb||[]).concat(cb?[cb]:[]);return i;}i=STKI[id]=new Image();i._cb=cb?[cb]:[];i.onload=function(){(i._cb||[]).forEach(function(f){f();});i._cb=[];};i.src=stkUrl(id);return i;}
var STK_G=STK_G0;
function stkRecent(){try{return JSON.parse(localStorage.getItem('dtdo.stkRecent')||'[]').filter(function(k){return STK[k];});}catch(e){return [];}}
function stkUse(k){var L=stkRecent().filter(function(x){return x!==k;});L.unshift(k);try{localStorage.setItem('dtdo.stkRecent',JSON.stringify(L.slice(0,16)));}catch(e){}}
function stkGrid(keys){return '<div class="stkrow">'+keys.filter(function(k){return STK[k];}).map(function(k){return '<button type="button" class="stkb" data-stk="'+k+'" title="'+esc(STK[k][0])+'"><img src="'+stkUrl(k)+'" alt="'+esc(STK[k][0])+'" loading="lazy"><span>'+esc(STK[k][0])+'</span></button>';}).join('')+'</div>';}
function stkSheet(onPick){var R=stkRecent(),tabs=(R.length?[['최근',R]]:[]).concat(STK_G),cur0=0;try{var last=localStorage.getItem('dtdo.stkTab');tabs.forEach(function(t,i){if(t[0]===last)cur0=i;});}catch(e){}
  sheet('<h2 style="margin:0 0 4px">스티커 <span class="small">'+Object.keys(STK).length+'종</span></h2><div class="stktabs" role="tablist">'+tabs.map(function(t,i){return '<button type="button" role="tab" class="chip'+(i===cur0?' on':'')+'" data-stkt="'+i+'" aria-selected="'+(i===cur0)+'">'+t[0]+' <span class="small">'+t[1].length+'</span></button>';}).join('')+'</div><div class="stkg" id="stkG">'+stkGrid(tabs[cur0][1])+'</div><div style="margin-top:12px;text-align:right"><button class="btn btn-line" type="button" onclick="closeSheet()">닫기</button></div>');
  window._stkTabs=tabs;window._stkPick=onPick;}
document.addEventListener('click',function(e){var t=e.target.closest('[data-stkt]');if(!t||!window._stkTabs)return;var i=+t.dataset.stkt,T=window._stkTabs[i];document.querySelectorAll('[data-stkt]').forEach(function(x){var on=x===t;x.classList.toggle('on',on);x.setAttribute('aria-selected',on);});var g=document.getElementById('stkG');if(g){g.innerHTML=stkGrid(T[1]);g.scrollTop=0;}try{localStorage.setItem('dtdo.stkTab',T[0]);}catch(x){}});
document.addEventListener('click',function(e){var b=e.target.closest('[data-stk]');if(b&&window._stkPick){var f=window._stkPick;stkUse(b.dataset.stk);closeSheet();f(b.dataset.stk);}});

/* ---------- 편집기 ---------- */
var HE=null;
var HW_TPL={log:'로그북',lined:'줄',grid:'모눈',dot:'점',blank:'빈 종이'};
function heTpl(x,t,d){var W=HW.W,H=HW.H;if(t==='log')return hwTpl(x,d);x.fillStyle='#fff';x.fillRect(0,0,W,H);x.strokeStyle='rgba(20,40,60,.12)';x.fillStyle='rgba(20,40,60,.16)';x.lineWidth=2;
  if(t==='lined'){for(var y=180;y<H-60;y+=62){x.beginPath();x.moveTo(70,y);x.lineTo(W-70,y);x.stroke();}x.strokeStyle='rgba(200,16,46,.15)';x.beginPath();x.moveTo(150,60);x.lineTo(150,H-60);x.stroke();}
  else if(t==='grid'){x.lineWidth=1.2;for(var g=60;g<W-50;g+=50){x.beginPath();x.moveTo(g,60);x.lineTo(g,H-60);x.stroke();}for(var h=60;h<H-50;h+=50){x.beginPath();x.moveTo(60,h);x.lineTo(W-60,h);x.stroke();}}
  else if(t==='dot'){for(var a=80;a<W-60;a+=50)for(var b=80;b<H-60;b+=50){x.beginPath();x.arc(a,b,2.4,0,7);x.fill();}}}
var HIMG={};function heImg(path){var i=HIMG[path];if(i)return i;i=HIMG[path]=new Image();i.crossOrigin='anonymous';i.onload=function(){if(HE)HE.draw();};i.src=/^data:/.test(path)?path:pubUrl(path);return i;}
function heBB(it){if(it.t==='s'){var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;it.p.forEach(function(q){if(q[0]<x0)x0=q[0];if(q[1]<y0)y0=q[1];if(q[0]>x1)x1=q[0];if(q[1]>y1)y1=q[1];});var m=(it.w||4)*3;return [x0-m,y0-m,x1+m,y1+m];}
  if(it.t==='sh')return [Math.min(it.a[0],it.b[0])-6,Math.min(it.a[1],it.b[1])-6,Math.max(it.a[0],it.b[0])+6,Math.max(it.a[1],it.b[1])+6];
  if(it.t==='tx'){var L=String(it.s).split('\n'),w=Math.max.apply(null,L.map(function(l){return l.length;}))*it.z*.62;return [it.x,it.y-it.z,it.x+Math.max(w,it.z),it.y+(L.length-1)*it.z*1.25+it.z*.3];}
  if(it.t==='st'){var r=it.z/2;return [it.x-r,it.y-r,it.x+r,it.y+r];}
  if(it.t==='im')return [it.x,it.y,it.x+it.w,it.y+it.h];return [0,0,0,0];}
function heDrawItem(x,it){x.save();
  if(it.t==='s'){var P=it.p;x.lineCap='round';x.lineJoin='round';x.strokeStyle=it.c;
    if(it.k==='mk'){x.globalAlpha=.32;x.lineCap='butt';x.lineWidth=it.w*5;x.beginPath();x.moveTo(P[0][0],P[0][1]);for(var i=1;i<P.length;i++)x.lineTo(P[i][0],P[i][1]);x.stroke();x.restore();return;}
    if(it.k==='pc')x.globalAlpha=.78;
    if(P.length<3){x.fillStyle=it.c;x.beginPath();x.arc(P[0][0],P[0][1],it.w*.9,0,7);x.fill();x.restore();return;}
    for(var j=1;j<P.length-1;j++){var a=P[j-1],b=P[j],c=P[j+1];x.lineWidth=(it.k==='pc'?it.w*.75:it.w*(0.5+(b[2]||.5)*1.2))*1.6;x.beginPath();x.moveTo((a[0]+b[0])/2,(a[1]+b[1])/2);x.quadraticCurveTo(b[0],b[1],(b[0]+c[0])/2,(b[1]+c[1])/2);x.stroke();}}
  else if(it.t==='sh'){x.strokeStyle=it.c;x.lineWidth=it.w*1.6;x.lineCap='round';x.beginPath();var A=it.a,B=it.b;if(it.k==='line'){x.moveTo(A[0],A[1]);x.lineTo(B[0],B[1]);}else if(it.k==='rect'){x.rect(Math.min(A[0],B[0]),Math.min(A[1],B[1]),Math.abs(B[0]-A[0]),Math.abs(B[1]-A[1]));}else{x.ellipse((A[0]+B[0])/2,(A[1]+B[1])/2,Math.abs(B[0]-A[0])/2,Math.abs(B[1]-A[1])/2,0,0,7);}x.stroke();}
  else if(it.t==='tx'){x.fillStyle=it.c;x.font='500 '+it.z+'px "IBM Plex Sans KR","Apple SD Gothic Neo",sans-serif';String(it.s).split('\n').forEach(function(l,i){x.fillText(l,it.x,it.y+i*it.z*1.25);});}
  else if(it.t==='st'){var im=stkImg(it.id,function(){if(HE)HE.draw();});if(im.complete&&im.naturalWidth){x.translate(it.x,it.y);x.rotate(it.r||0);x.drawImage(im,-it.z/2,-it.z/2,it.z,it.z);}}
  else if(it.t==='im'){var g=heImg(it.path);if(g.complete&&g.naturalWidth)x.drawImage(g,it.x,it.y,it.w,it.h);}
  x.restore();}
function heRender(x,pg,d,sel){heTpl(x,pg.tpl||'log',d);pg.items.forEach(function(it){heDrawItem(x,it);});
  if(sel&&sel.length){var b=heSelBB(pg,sel);x.save();x.strokeStyle='#1e88e5';x.setLineDash([12,8]);x.lineWidth=3;x.strokeRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);x.setLineDash([]);x.fillStyle='#1e88e5';x.beginPath();x.arc(b[2],b[3],16,0,7);x.fill();if(sel.length===1&&/st|im|tx/.test(pg.items[sel[0]].t)){x.beginPath();x.arc((b[0]+b[2])/2,b[1]-34,14,0,7);x.fill();x.beginPath();x.moveTo((b[0]+b[2])/2,b[1]);x.lineTo((b[0]+b[2])/2,b[1]-20);x.stroke();}x.restore();}}
function heSelBB(pg,sel){var B=[1e9,1e9,-1e9,-1e9];sel.forEach(function(i){var b=heBB(pg.items[i]);B=[Math.min(B[0],b[0]),Math.min(B[1],b[1]),Math.max(B[2],b[2]),Math.max(B[3],b[3])];});return B;}
function heMove(it,dx,dy){if(it.t==='s')it.p.forEach(function(q){q[0]+=dx;q[1]+=dy;});else if(it.t==='sh'){it.a[0]+=dx;it.a[1]+=dy;it.b[0]+=dx;it.b[1]+=dy;}else{it.x+=dx;it.y+=dy;}}
function heScale(it,k,cx,cy){var f=function(q){q[0]=cx+(q[0]-cx)*k;q[1]=cy+(q[1]-cy)*k;};if(it.t==='s'){it.p.forEach(f);it.w=Math.max(1,it.w*k);}else if(it.t==='sh'){f(it.a);f(it.b);}else if(it.t==='st'){var p=[it.x,it.y];f(p);it.x=p[0];it.y=p[1];it.z=Math.max(40,it.z*k);}else if(it.t==='tx'){var p2=[it.x,it.y];f(p2);it.x=p2[0];it.y=p2[1];it.z=Math.max(14,it.z*k);}else if(it.t==='im'){var p3=[it.x,it.y];f(p3);it.x=p3[0];it.y=p3[1];it.w*=k;it.h*=k;}}
function heHit(pg,p){for(var i=pg.items.length-1;i>=0;i--){var it=pg.items[i],b=heBB(it);if(p[0]>=b[0]&&p[0]<=b[2]&&p[1]>=b[1]&&p[1]<=b[3]){if(it.t==='s'){var ok=it.p.some(function(q){return Math.hypot(q[0]-p[0],q[1]-p[1])<Math.max(18,it.w*3);});if(!ok)continue;}return i;}}return -1;}
function inPoly(pt,P){var c=false;for(var i=0,j=P.length-1;i<P.length;j=i++){if(((P[i][1]>pt[1])!==(P[j][1]>pt[1]))&&(pt[0]<(P[j][0]-P[i][0])*(pt[1]-P[i][1])/(P[j][1]-P[i][1])+P[i][0]))c=!c;}return c;}

hwHtml=function(d,mine){if(!mine){var P=d.hand_pages&&d.hand_pages.length?d.hand_pages:(d.hand_page?[d.hand_page]:[]);return P.length?P.map(function(p){return '<img class="hwimg" src="'+esc(pubUrl(p))+'" alt="손글씨 로그" style="margin-bottom:10px">';}).join(''):'<p class="empty" style="margin:0">아직 손글씨 페이지가 없어요.</p>';}
  var T=[['pen','✒︎','펜'],['pc','✏︎','연필'],['mk','▍','형광펜'],['er','⌫','지우개'],['lasso','◌','올가미'],['sel','☝︎','선택'],['sh','△','도형'],['tx','T','글자']];
  return '<div class="hebar">'+
   '<div class="hwg">'+T.map(function(t,i){return '<button type="button" class="hwt'+(i?'':' on')+'" data-het="'+t[0]+'" title="'+t[2]+'" aria-label="'+t[2]+'">'+t[1]+'</button>';}).join('')+'</div>'+
   '<div class="hwg"><button type="button" class="hwt" data-hestk title="스티커" aria-label="스티커">🐠</button><label class="hwt" title="사진" aria-label="사진 넣기" style="cursor:pointer">🖼<input type="file" accept="image/*" id="heImgIn" style="position:absolute;left:-9999px"></label></div>'+
   '<div class="hwg hecol">'+['#111111','#1453a0','#c8102e','#0a8a52','#f39c12','#7b4cff','#ff6b8b','#ffffff'].map(function(c,i){return '<button type="button" class="hwc'+(i?'':' on')+'" data-hec="'+c+'" style="background:'+c+'" aria-label="색"></button>';}).join('')+'<label class="hwc hecus" title="다른 색"><input type="color" id="heColor" value="#111111"></label></div>'+
   '<div class="hwg"><input type="range" id="heW" min="1" max="12" step="1" value="4" aria-label="굵기"></div>'+
   '<div class="hwg hesub" id="heShape" hidden><button type="button" class="hwt on" data-hesh="line">／</button><button type="button" class="hwt" data-hesh="rect">▭</button><button type="button" class="hwt" data-hesh="ell">◯</button></div>'+
   '<div class="hwg"><button type="button" class="hwt" data-heundo title="되돌리기">↶</button><button type="button" class="hwt" data-heredo title="다시">↷</button></div>'+
   '<div class="hwg"><button type="button" class="hwt" data-hez="-1" title="축소">−</button><button type="button" class="hwt" data-hez="0" title="맞춤" id="heZv">100%</button><button type="button" class="hwt" data-hez="1" title="확대">＋</button></div>'+
   '<label class="hwpen"><input type="checkbox" id="hwPen" checked> 펜슬만</label></div>'+
   '<div class="hesel" id="heSelBar" hidden><span>선택됨</span><button type="button" class="chip" data-hesa="dup">복제</button><button type="button" class="chip" data-hesa="front">앞으로</button><button type="button" class="chip" data-hesa="back">뒤로</button><button type="button" class="chip" data-hesa="edit" id="heEditTx" hidden>글자 고치기</button><button type="button" class="chip" data-hesa="del" style="color:#c8102e">삭제</button></div>'+
   '<div class="hescroll" id="heScroll"><div class="hwwrap" id="heWrap"><canvas id="heC" width="'+HW.W+'" height="'+HW.H+'"></canvas></div></div>'+
   '<div class="hepages"><div class="hepl" id="hePages"></div><select id="heTplSel" aria-label="양식">'+Object.keys(HW_TPL).map(function(k){return '<option value="'+k+'">'+HW_TPL[k]+'</option>';}).join('')+'</select><button type="button" class="chip" data-hepg="del">페이지 삭제</button></div>'+
   '<div class="lbsave"><button class="btn btn-pri" type="button" data-hesave="1">저장</button><span class="small" id="heInfo">회색 칸은 양식이에요. 저장하면 다시 열어서 고칠 수 있어요.</span></div>';};
hwInit=function(d){var cv=document.getElementById('heC');if(!cv||cv.dataset.on)return;cv.dataset.on=1;var x=cv.getContext('2d');
  var doc=d.hand_doc&&d.hand_doc.pages?JSON.parse(JSON.stringify(d.hand_doc)):{v:1,pages:[{tpl:'log',items:[]}]};
  if(!d.hand_doc&&d.hand_page){doc.pages=[{tpl:'blank',items:[{t:'im',path:d.hand_page,x:0,y:0,w:HW.W,h:HW.H,lock:1}]}];}
  var E=HE={doc:doc,pg:0,tool:'pen',color:'#111111',w:4,shape:'line',sel:[],hist:[],fut:[],zoom:1,penOnly:true,d:d,cur:null};
  var page=function(){return E.doc.pages[E.pg];};
  E.draw=function(){heRender(x,page(),E.d,E.sel);if(E.cur){if(E.cur.t==='s'||E.cur.t==='sh')heDrawItem(x,E.cur);if(E.cur.lasso){x.save();x.strokeStyle='#1e88e5';x.setLineDash([10,8]);x.lineWidth=3;x.beginPath();E.cur.lasso.forEach(function(q,i){i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);});x.stroke();x.restore();}}};
  E.snap=function(){E.hist.push(JSON.stringify(E.doc));if(E.hist.length>60)E.hist.shift();E.fut=[];};
  E.pages=function(){var el=document.getElementById('hePages');if(!el)return;el.innerHTML=E.doc.pages.map(function(p,i){return '<button type="button" class="hepb'+(i===E.pg?' on':'')+'" data-hepg="'+i+'">'+(i+1)+'</button>';}).join('')+'<button type="button" class="hepb" data-hepg="add" title="페이지 추가">＋</button>';var s=document.getElementById('heTplSel');if(s)s.value=page().tpl||'log';};
  E.selbar=function(){var b=document.getElementById('heSelBar');if(!b)return;b.hidden=!E.sel.length;var et=document.getElementById('heEditTx');if(et)et.hidden=!(E.sel.length===1&&page().items[E.sel[0]].t==='tx');};
  E.zoomSet=function(z){E.zoom=Math.max(.5,Math.min(3,z));var w=document.getElementById('heWrap');if(w)w.style.width=(E.zoom*100)+'%';var v=document.getElementById('heZv');if(v)v.textContent=Math.round(E.zoom*100)+'%';};
  var pen=document.getElementById('hwPen');var ta=function(){E.penOnly=pen.checked;cv.style.touchAction=E.penOnly?'pan-x pan-y':'none';};pen.onchange=ta;ta();
  function pt(e){var r=cv.getBoundingClientRect();return [Math.round((e.clientX-r.left)*HW.W/r.width*10)/10,Math.round((e.clientY-r.top)*HW.H/r.height*10)/10,e.pointerType==='pen'&&e.pressure?Math.round(e.pressure*100)/100:.5];}
  var drag=null;
  cv.addEventListener('pointerdown',function(e){if(E.penOnly&&e.pointerType==='touch'&&E.tool!=='sel')return;e.preventDefault();cv.setPointerCapture(e.pointerId);var p=pt(e),pg=page();
    if(E.tool==='pen'||E.tool==='pc'||E.tool==='mk'){E.cur={t:'s',k:E.tool,c:E.color,w:E.w,p:[p]};}
    else if(E.tool==='er'){E.snap();drag={er:1,hit:0};erase(p);}
    else if(E.tool==='lasso'){E.sel=[];E.cur={lasso:[p]};}
    else if(E.tool==='sh'){E.cur={t:'sh',k:E.shape,c:E.color,w:E.w,a:[p[0],p[1]],b:[p[0],p[1]]};}
    else if(E.tool==='tx'){var s=prompt('글자를 입력하세요');if(s&&s.trim()){E.snap();pg.items.push({t:'tx',x:p[0],y:p[1],z:24+E.w*6,c:E.color,s:s});E.sel=[pg.items.length-1];E.selbar();}E.draw();return;}
    else if(E.tool==='sel'){if(E.sel.length){var b=heSelBB(pg,E.sel);if(Math.hypot(p[0]-b[2],p[1]-b[3])<30){E.snap();drag={scale:1,o:p,c:[(b[0]+b[2])/2,(b[1]+b[3])/2],d0:Math.hypot(p[0]-(b[0]+b[2])/2,p[1]-(b[1]+b[3])/2)};return;}
        if(E.sel.length===1&&/st/.test(pg.items[E.sel[0]].t)&&Math.hypot(p[0]-(b[0]+b[2])/2,p[1]-(b[1]-34))<28){E.snap();drag={rot:1};return;}
        if(p[0]>=b[0]&&p[0]<=b[2]&&p[1]>=b[1]&&p[1]<=b[3]){E.snap();drag={mv:1,o:p};return;}}
      var h=heHit(pg,p);if(h>=0&&!pg.items[h].lock){E.sel=[h];E.snap();drag={mv:1,o:p};}else{E.sel=[];}E.selbar();E.draw();}
    E.draw();});
  cv.addEventListener('pointermove',function(e){var p=pt(e),pg=page();
    if(E.cur&&E.cur.t==='s'){var ev=e.getCoalescedEvents?e.getCoalescedEvents():[e];ev.forEach(function(c){E.cur.p.push(pt(c));});E.draw();return;}
    if(E.cur&&E.cur.t==='sh'){E.cur.b=[p[0],p[1]];E.draw();return;}
    if(E.cur&&E.cur.lasso){E.cur.lasso.push(p);E.draw();return;}
    if(!drag)return;
    if(drag.er){erase(p);return;}
    if(drag.mv){var dx=p[0]-drag.o[0],dy=p[1]-drag.o[1];E.sel.forEach(function(i){heMove(pg.items[i],dx,dy);});drag.o=p;E.draw();return;}
    if(drag.scale){var dd=Math.hypot(p[0]-drag.c[0],p[1]-drag.c[1]),k=dd/Math.max(10,drag.d0);if(k>0.2&&k<5){E.sel.forEach(function(i){heScale(pg.items[i],k,drag.c[0],drag.c[1]);});drag.d0=dd;}E.draw();return;}
    if(drag.rot){var it=pg.items[E.sel[0]];it.r=Math.atan2(p[1]-it.y,p[0]-it.x)+Math.PI/2;E.draw();return;}});
  var up=function(){var pg=page();
    if(E.cur&&E.cur.t==='s'){E.snap();pg.items.push(E.cur);}
    else if(E.cur&&E.cur.t==='sh'){if(Math.hypot(E.cur.b[0]-E.cur.a[0],E.cur.b[1]-E.cur.a[1])>6){E.snap();pg.items.push(E.cur);}}
    else if(E.cur&&E.cur.lasso){var L=E.cur.lasso;if(L.length>3){E.sel=[];pg.items.forEach(function(it,i){if(it.lock)return;var b=heBB(it);if(inPoly([(b[0]+b[2])/2,(b[1]+b[3])/2],L))E.sel.push(i);});if(E.sel.length){E.tool='sel';document.querySelectorAll('[data-het]').forEach(function(b){b.classList.toggle('on',b.dataset.het==='sel');});}}E.selbar();}
    if(drag&&drag.er&&!drag.hit)E.hist.pop();
    E.cur=null;drag=null;E.draw();};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  function erase(p){var pg=page(),n=pg.items.length;pg.items=pg.items.filter(function(it){if(it.lock)return true;if(it.t==='s')return !it.p.some(function(q){return Math.hypot(q[0]-p[0],q[1]-p[1])<14+E.w*3;});var b=heBB(it);return !(p[0]>=b[0]&&p[0]<=b[2]&&p[1]>=b[1]&&p[1]<=b[3]);});if(pg.items.length!==n){drag.hit=1;E.sel=[];E.draw();}}
  cv.addEventListener('wheel',function(e){if(!e.ctrlKey)return;e.preventDefault();E.zoomSet(E.zoom*(e.deltaY<0?1.1:.9));},{passive:false});
  E.pages();E.draw();E.zoomSet(1);};
document.addEventListener('click',function(e){var E=HE;if(!E||!document.getElementById('heC'))return;var pg=E.doc.pages[E.pg];var b;
  if((b=e.target.closest('[data-het]'))){E.tool=b.dataset.het;document.querySelectorAll('[data-het]').forEach(function(x){x.classList.toggle('on',x===b);});var sh=document.getElementById('heShape');if(sh)sh.hidden=E.tool!=='sh';if(E.tool!=='sel'){E.sel=[];E.selbar();E.draw();}return;}
  if((b=e.target.closest('[data-hesh]'))){E.shape=b.dataset.hesh;document.querySelectorAll('[data-hesh]').forEach(function(x){x.classList.toggle('on',x===b);});return;}
  if((b=e.target.closest('[data-hec]'))){E.color=b.dataset.hec;document.querySelectorAll('[data-hec]').forEach(function(x){x.classList.toggle('on',x===b);});if(E.sel.length){E.snap();E.sel.forEach(function(i){var it=pg.items[i];if('c' in it)it.c=E.color;});E.draw();}if(/^(er|lasso|sel)$/.test(E.tool)){var pb=document.querySelector('[data-het="pen"]');if(pb)pb.click();}return;}
  if(e.target.closest('[data-heundo]')){if(!E.hist.length)return;E.fut.push(JSON.stringify(E.doc));E.doc=JSON.parse(E.hist.pop());E.pg=Math.min(E.pg,E.doc.pages.length-1);E.sel=[];E.selbar();E.pages();E.draw();return;}
  if(e.target.closest('[data-heredo]')){if(!E.fut.length)return;E.hist.push(JSON.stringify(E.doc));E.doc=JSON.parse(E.fut.pop());E.sel=[];E.selbar();E.pages();E.draw();return;}
  if((b=e.target.closest('[data-hez]'))){var z=+b.dataset.hez;E.zoomSet(z===0?1:E.zoom*(z>0?1.25:.8));return;}
  if((b=e.target.closest('[data-hesa]'))){var a=b.dataset.hesa;if(!E.sel.length)return;E.snap();
    if(a==='del'){pg.items=pg.items.filter(function(_,i){return E.sel.indexOf(i)<0;});E.sel=[];}
    else if(a==='dup'){var cp=E.sel.map(function(i){var c=JSON.parse(JSON.stringify(pg.items[i]));heMove(c,30,30);return c;});var s0=pg.items.length;cp.forEach(function(c){pg.items.push(c);});E.sel=cp.map(function(_,i){return s0+i;});}
    else if(a==='front'||a==='back'){var picked=E.sel.map(function(i){return pg.items[i];}),rest=pg.items.filter(function(_,i){return E.sel.indexOf(i)<0;});pg.items=a==='front'?rest.concat(picked):picked.concat(rest);E.sel=picked.map(function(it){return pg.items.indexOf(it);});}
    else if(a==='edit'){var it=pg.items[E.sel[0]];var s=prompt('글자 고치기',it.s);if(s!=null)it.s=s;}
    E.selbar();E.draw();return;}
  if((b=e.target.closest('[data-hepg]'))){var v=b.dataset.hepg;if(v==='add'){E.snap();E.doc.pages.splice(E.pg+1,0,{tpl:'lined',items:[]});E.pg++;}else if(v==='del'){if(E.doc.pages.length<2)return toast('마지막 페이지는 지울 수 없어요');if(!confirm((E.pg+1)+'쪽을 지울까요?'))return;E.snap();E.doc.pages.splice(E.pg,1);E.pg=Math.max(0,E.pg-1);}else{E.pg=+v;}E.sel=[];E.selbar();E.pages();E.draw();return;}
  if(e.target.closest('[data-hestk]')){stkSheet(function(id){var p=E.doc.pages[E.pg];E.snap();var sc=document.getElementById('heScroll'),cv=document.getElementById('heC'),r=cv.getBoundingClientRect(),sr=sc.getBoundingClientRect();var cx=((sr.left+sr.right)/2-r.left)*HW.W/r.width,cy=((Math.max(sr.top,r.top)+Math.min(sr.bottom,r.bottom,innerHeight))/2-r.top)*HW.H/r.height;p.items.push({t:'st',id:id,x:Math.round(Math.max(120,Math.min(HW.W-120,cx))),y:Math.round(Math.max(120,Math.min(HW.H-120,cy))),z:200,r:0});E.sel=[p.items.length-1];E.tool='sel';document.querySelectorAll('[data-het]').forEach(function(x){x.classList.toggle('on',x.dataset.het==='sel');});E.selbar();E.draw();});return;}
  if(e.target.closest('[data-hesave]')){heSave(e.target.closest('[data-hesave]'));}});
document.addEventListener('input',function(e){var E=HE;if(!E)return;if(e.target.id==='heW'){E.w=+e.target.value;if(E.sel.length){E.sel.forEach(function(i){var it=E.doc.pages[E.pg].items[i];if(it.t==='s'||it.t==='sh')it.w=E.w;});E.draw();}}if(e.target.id==='heColor'){E.color=e.target.value;document.querySelectorAll('[data-hec]').forEach(function(x){x.classList.remove('on');});}});
document.addEventListener('change',function(e){var E=HE;if(!E)return;
  if(e.target.id==='heTplSel'){E.snap();E.doc.pages[E.pg].tpl=e.target.value;E.draw();}
  if(e.target.id==='heImgIn'){var f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;var im=new Image(),u=URL.createObjectURL(f);im.onload=function(){var s=Math.min(1,1200/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);toast('사진을 올리는 중이에요');
      c.toBlob(function(bl){upload('media',bl,'logimg.jpg').then(function(path){var pg=E.doc.pages[E.pg];E.snap();var w=Math.min(700,c.width),h=w*c.height/c.width;HIMG[path]=im;pg.items.push({t:'im',path:path,x:Math.round((HW.W-w)/2),y:300,w:Math.round(w),h:Math.round(h)});E.sel=[pg.items.length-1];E.tool='sel';document.querySelectorAll('[data-het]').forEach(function(x){x.classList.toggle('on',x.dataset.het==='sel');});E.selbar();E.draw();}).catch(function(er){toast('사진을 넣지 못했어요: '+(er.message||er));});},'image/jpeg',.85);};im.src=u;}});
function heSave(btn){var E=HE,id=state.dvId,d=state.dv[id];if(!E||!d)return;var js=JSON.stringify(E.doc);if(js.length>2500000)return toast('페이지 내용이 너무 많아요. 페이지를 나눠 주세요.');
  btn.disabled=true;btn.textContent='저장 중…';var c=document.createElement('canvas');c.width=HW.W;c.height=HW.H;var x=c.getContext('2d'),paths=[];
  var one=function(i){if(i>=E.doc.pages.length)return Promise.resolve();heRender(x,E.doc.pages[i],d,null);return new Promise(function(res,rej){try{c.toBlob(function(bl){if(!bl)return rej(new Error('그림을 만들지 못했어요'));upload('media',bl,'handlog-'+(i+1)+'.jpg').then(function(p){paths.push(p);res();},rej);},'image/jpeg',.88);}catch(er){rej(er);}}).then(function(){return one(i+1);});};
  one(0).then(function(){var up={hand_doc:E.doc,hand_pages:paths,hand_page:paths[0]||null,log_mode:'hand'};return BE.sb.from('dive_logs').update(up).eq('id',id).then(function(r){if(r.error)throw r.error;Object.assign(d,up);toast(paths.length+'쪽을 저장했어요');});}).catch(function(er){toast('저장하지 못했어요: '+(er.message||er));}).then(function(){btn.disabled=false;btn.textContent='저장';E.draw();});}

/* ---------- 자동 · 반자동 양식 꾸미기 스티커 ---------- */
var DECO={on:false,sel:-1,t:null};
function decoPaint(){var box=document.getElementById('lbfBody');if(!box||cur()!=='dive')return;var id=state.dvId,d=state.dv[id];if(!d||typeof d!=='object'||(d.log_mode||lbmGet())==='hand')return;var f=box.querySelector('.lbform');if(!f)return;
  var L=box.querySelector('.decol');if(!L){L=document.createElement('div');L.className='decol';box.style.position='relative';box.appendChild(L);}
  var S=Array.isArray(d.stickers)?d.stickers:[];L.classList.toggle('on',DECO.on);L.innerHTML=S.map(function(s,i){return '<div class="deco'+(i===DECO.sel&&DECO.on?' sel':'')+'" data-deco="'+i+'" style="left:'+s.x+'%;top:'+s.y+'%;width:'+s.s+'%;transform:translate(-50%,-50%) rotate('+(s.r||0)+'deg)"><img src="'+stkUrl(s.id)+'" alt="'+esc((STK[s.id]||[''])[0])+'" draggable="false">'+(i===DECO.sel&&DECO.on?'<button type="button" class="decx" data-decx="'+i+'" aria-label="빼기">✕</button><button type="button" class="decs" data-decs="'+i+'" aria-label="크기">⤡</button>':'')+'</div>';}).join('');
  var bt=document.querySelector('[data-decot]');if(bt)bt.textContent=DECO.on?'꾸미기 끝':'스티커 꾸미기';}
function decoSave(){var id=state.dvId,d=state.dv[id];if(!d)return;clearTimeout(DECO.t);DECO.t=setTimeout(function(){BE.sb.from('dive_logs').update({stickers:d.stickers||[]}).eq('id',id).then(function(r){if(r.error)toast('스티커를 저장하지 못했어요');});},500);}
var _lbFoot98=lbFoot;lbFoot=function(id,mine){var h=_lbFoot98(id,mine);var d=state.dv&&state.dv[id];if(!mine||!d||(d.log_mode||lbmGet())==='hand')return h;return h.replace('</div>','<button class="btn btn-line" type="button" data-decot="1">스티커 꾸미기</button></div>');};
document.addEventListener('click',function(e){if(cur()!=='dive')return;var id=state.dvId,d=state.dv&&state.dv[id];if(!d)return;var b;
  if(e.target.closest('[data-decot]')){if(!DECO.on){DECO.on=true;stkSheet(function(sid){d.stickers=(Array.isArray(d.stickers)?d.stickers:[]).concat([{id:sid,x:Math.round(15+Math.random()*70),y:Math.round(8+Math.random()*30),s:16,r:Math.round(Math.random()*24-12)}]).slice(-40);DECO.sel=d.stickers.length-1;decoPaint();decoSave();});}else{DECO.on=false;DECO.sel=-1;}decoPaint();return;}
  if((b=e.target.closest('[data-decx]'))){e.stopPropagation();d.stickers.splice(+b.dataset.decx,1);DECO.sel=-1;decoPaint();decoSave();return;}
  if(DECO.on&&e.target.closest('#lbfBody')&&!e.target.closest('[data-deco]')&&!e.target.closest('input,textarea,button')){stkSheet(function(sid){d.stickers=(d.stickers||[]).concat([{id:sid,x:50,y:20,s:16,r:0}]).slice(-40);DECO.sel=d.stickers.length-1;decoPaint();decoSave();});}},true);
document.addEventListener('pointerdown',function(e){if(!DECO.on)return;var el=e.target.closest('[data-deco]');if(!el)return;var id=state.dvId,d=state.dv[id],i=+el.dataset.deco,L=el.parentElement,r=L.getBoundingClientRect(),s=d.stickers[i];if(!s)return;e.preventDefault();var sz=!!e.target.closest('[data-decs]');DECO.sel=i;
  var sx=e.clientX,sy=e.clientY,x0=s.x,y0=s.y,s0=s.s;var mv=function(ev){if(sz){s.s=Math.max(6,Math.min(60,s0+((ev.clientX-sx)+(ev.clientY-sy))/r.width*100));}else{s.x=Math.max(0,Math.min(100,x0+(ev.clientX-sx)/r.width*100));s.y=Math.max(0,Math.min(100,y0+(ev.clientY-sy)/r.height*100));}var n=L.querySelector('[data-deco="'+i+'"]');if(n){n.style.left=s.x+'%';n.style.top=s.y+'%';n.style.width=s.s+'%';}};
  var upf=function(){document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',upf);s.x=Math.round(s.x*10)/10;s.y=Math.round(s.y*10)/10;s.s=Math.round(s.s*10)/10;decoPaint();decoSave();};document.addEventListener('pointermove',mv);document.addEventListener('pointerup',upf);decoPaint();},true);
var _after98=after;after=function(){_after98();if(cur()!=='dive'){DECO.on=false;DECO.sel=-1;HE=null;return;}[60,600,1700].forEach(function(t){setTimeout(decoPaint,t);});};
(function(){var st=document.createElement('style');st.textContent=
'.hebar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;position:sticky;top:0;z-index:4;background:var(--panel);padding:6px 0 8px}.hebar .hwt{width:38px;height:38px;font-size:17px}.hecol{flex-wrap:wrap;max-width:100%}.hecol .hwc{width:24px;height:24px;margin:4px;border:1px solid rgba(0,0,0,.15)}.hecus{position:relative;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red)!important}.hecus input{position:absolute;inset:-6px;opacity:0;cursor:pointer}#heW{width:110px;accent-color:var(--sea);margin:0 6px}#heZv{width:auto!important;padding:0 6px;font-size:13px!important;white-space:nowrap}'+
'.hesel{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 8px;padding:6px 10px;border-radius:12px;background:color-mix(in srgb,#1e88e5 10%,var(--panel));font-size:13px}.hesel .chip{min-height:30px;padding:0 10px;font-size:13px}'+
'.hescroll{overflow:auto;max-height:78vh;border-radius:10px;background:var(--soft);padding:8px;-webkit-overflow-scrolling:touch}.hescroll .hwwrap{max-width:none;margin:0 auto;aspect-ratio:1240/1754;position:relative}.hescroll canvas{position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;background:#fff;border-radius:6px;box-shadow:0 1px 6px rgba(0,0,0,.12)}'+
'.hepages{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}.hepl{display:flex;gap:4px;flex-wrap:wrap}.hepb{min-width:34px;height:34px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer;font-weight:600}.hepb.on{background:var(--sea);color:#fff;border-color:var(--sea)}#heTplSel{height:34px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--ink);padding:0 8px;font-size:14px}'+
'.stktabs{display:flex;gap:6px;overflow-x:auto;padding:4px 0 8px;scrollbar-width:none}.stktabs::-webkit-scrollbar{display:none}.stktabs .chip{flex:none;min-height:34px}.stktabs .chip.on{background:var(--sea);color:#fff;border-color:var(--sea)}.stktabs .chip.on .small{color:#e6f4ff}.stkg{max-height:58vh;overflow:auto}.stkh{margin:10px 0 6px;font-weight:700;font-size:13px;color:var(--muted)}.stkrow{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px}.stkb{display:flex;flex-direction:column;align-items:center;gap:2px;border:0;background:var(--soft);border-radius:12px;padding:6px 2px;cursor:pointer;color:var(--ink)}.stkb img{width:56px;height:56px}.stkb span{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.stkb:active{transform:scale(.95)}'+
'.decol{position:absolute;inset:0;pointer-events:none;z-index:2}.decol.on{pointer-events:none}.deco{position:absolute;pointer-events:none}.decol.on .deco{pointer-events:auto;cursor:grab;touch-action:none}.deco img{width:100%;display:block;filter:drop-shadow(0 1px 1px rgba(0,0,0,.15))}.deco.sel{outline:2px dashed #1e88e5;outline-offset:2px;border-radius:8px}.decx,.decs{position:absolute;width:24px;height:24px;border-radius:50%;border:0;background:#1e88e5;color:#fff;font-size:12px;cursor:pointer;display:grid;place-items:center}.decx{top:-10px;right:-10px;background:#c8102e}.decs{bottom:-10px;right:-10px}'+
'@media (max-width:600px){.hebar .hwt{width:34px;height:34px;font-size:15px}#heW{width:80px}}';document.head.appendChild(st);})();
if(LANG==='en'){Object.assign(EN_D,{'스티커':'Stickers','스티커 꾸미기':'Decorate','꾸미기 끝':'Done','페이지 삭제':'Delete page','선택됨':'Selected','복제':'Duplicate','앞으로':'Front','뒤로':'Back','삭제':'Delete','글자 고치기':'Edit text','펜슬만':'Pencil only'});}
