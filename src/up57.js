/* ===== 다이브 화면 위치 지도 · 포인트 화면에 '이 바다 내 다이브' ===== */
function dvMap(){var d=state.dv[state.dvId];if(!d||typeof d!=='object'||d.lat==null||d.lon==null||document.getElementById('dvMap'))return;var v=document.querySelector('#main .view');if(!v)return;
  var notes=[].filter.call(v.querySelectorAll(':scope > .panel'),function(p){return /^기록|^Notes/.test(((p.querySelector('h2')||{}).textContent||'').trim());})[0];if(!notes)return;
  var box=document.createElement('div');box.id='dvMap';box.style.cssText='height:200px;border-radius:12px;overflow:hidden;margin-top:10px';notes.appendChild(box);var s=d.spot?spot(d.spot):null;
  initMap(box,{spots:s?[s]:[],view:{c:[d.lat,d.lon],z:12}});var n=0,t=setInterval(function(){if(++n>40){clearInterval(t);return;}if(box._m&&window.L){clearInterval(t);window.L.circleMarker([d.lat,d.lon],{radius:8,color:'#fff',weight:2,fillColor:'#e8933a',fillOpacity:1}).addTo(box._m).bindPopup('입수 위치');}},250);}
function spotMine(){var s=spot(state.sel);if(!s||!BE.user||document.getElementById('spMine'))return;if(!state.lsAll){if(typeof lsLoad==='function')lsLoad();return;}
  var L=state.lsAll.filter(function(l){return l.spot===s.id;}).sort(function(a,b){return String(b.dive_date||'').localeCompare(String(a.dive_date||''));});var v=document.querySelector('#main .view');if(!v)return;var first=v.querySelector(':scope > .panel');if(!first)return;
  var p=document.createElement('div');p.className='panel';p.id='spMine';
  if(!L.length){p.innerHTML='<h2>이 바다 내 다이브</h2><p class="small" style="margin:0 0 8px">아직 이 바다 로그가 없어요. 다녀왔다면 기록을 남겨 보세요.</p><a class="btn btn-line" href="#logimport">컴퓨터 기록 가져오기</a>';}
  else{var mx=0,mins=0,T=[];L.forEach(function(l){if(+l.max_depth>mx)mx=+l.max_depth;mins+=+l.minutes||0;if(l.water_temp!=null)T.push(+l.water_temp);});
    p.innerHTML='<h2>이 바다 내 다이브 <span class="small">'+L.length+'회</span></h2><div class="dvst"><div><small>최대 수심</small><b>'+mx+'m</b></div><div><small>물속 시간</small><b>'+Math.floor(mins/60)+'시간</b> <span>'+(mins%60)+'분</span></div>'+(T.length?'<div><small>내가 겪은 수온</small><b>'+Math.min.apply(null,T)+'~'+Math.max.apply(null,T)+'°</b></div>':'')+'<div><small>마지막</small><b style="font-size:15px">'+esc(L[0].dive_date||'')+'</b></div></div><div class="list">'+L.slice(0,5).map(function(l){return item({href:'#dive-'+l.id,t:esc(l.site||s.name),s:esc(l.dive_date||''),r:(l.max_depth!=null?l.max_depth+'m':'')+(l.minutes?' · '+l.minutes+'분':'')});}).join('')+'</div>';}
  first.after(p);}
var _after57=after;after=function(){_after57();var c=cur();if(c==='dive')setTimeout(dvMap,100);if(c==='spot')spotMine();};
/* 통계 데이터가 늦게 오면 포인트 화면에도 반영 */
setInterval(function(){if(cur()==='spot'&&state.lsAll&&!document.getElementById('spMine'))spotMine();},1200);
/* 수중 사진 보정: 로그북 메뉴에 넣고, 다이브 사진 올릴 때 자동 보정 */
(function(){var i=MAIN53.findIndex(function(m){return m.id==='logstats';});if(i>=0&&!MAIN53.some(function(m){return m.id==='photofix';})){MAIN53.splice(i+1,0,{id:'photofix',l:L53('수중 사진 보정','Photo color fix'),i:'M4 7h3l2-3h6l2 3h3v12H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'});side53();}})();
function pfAuto(){return LS.get('pfAuto',1)!==0;}
function pfFile(f){return new Promise(function(ok){var u=URL.createObjectURL(f),img=new Image();img.onload=function(){try{var c=pfApply(img,LS.get('pfK',70),2000);c.toBlob(function(b){URL.revokeObjectURL(u);ok(b?new File([b],f.name.replace(/\.[^.]+$/,'')+'_fix.jpg',{type:'image/jpeg'}):f);},'image/jpeg',0.9);}catch(e){ok(f);}};img.onerror=function(){ok(f);};img.src=u;});}
document.addEventListener('change',function(e){var t=e.target;if(t.id!=='dvMedia'||t.dataset.fixed||!pfAuto())return;var F=[].slice.call(t.files||[]);if(!F.some(function(f){return /^image\//.test(f.type);}))return;e.stopImmediatePropagation();toast('수중 색을 보정하는 중이에요…');
  Promise.all(F.map(function(f){return /^image\//.test(f.type)?pfFile(f):Promise.resolve(f);})).then(function(G){try{var dt=new DataTransfer();G.forEach(function(f){dt.items.add(f);});t.files=dt.files;}catch(x){}t.dataset.fixed=1;t.dispatchEvent(new Event('change',{bubbles:true}));setTimeout(function(){delete t.dataset.fixed;},500);});},true);
function pfToggle(){var p=document.getElementById('dvMedia');if(!p||document.getElementById('pfAutoL'))return;var h=p.closest('.panel');if(!h)return;var l=document.createElement('label');l.id='pfAutoL';l.className='small';l.style.cssText='display:flex;gap:6px;align-items:center;margin-top:8px;cursor:pointer';l.innerHTML='<input type="checkbox" id="pfAutoC"'+(pfAuto()?' checked':'')+'> 올릴 때 수중 색 자동 보정 (파랗게 죽은 색 살리기) · <a href="#photofix">따로 보정하기</a>';h.appendChild(l);}
document.addEventListener('change',function(e){if(e.target.id==='pfAutoC')LS.set('pfAuto',e.target.checked?1:0);});
document.addEventListener('input',function(e){if(e.target.id==='pfK')LS.set('pfK',+e.target.value);});
var _after57b=after;after=function(){_after57b();if(cur()==='dive')pfToggle();if(cur()==='photofix'&&PF.files.length)setTimeout(pfShow,30);};
/* 보정 방식 개선: 빨강 채널 보상(초록 기준) → 회색 기준 화이트밸런스 → 채널별 대비 펴기 → 채도 살짝 */
function pfParams(img,t){var c=document.createElement('canvas'),sc=Math.min(1,400/Math.max(img.width,img.height));c.width=Math.max(1,img.width*sc|0);c.height=Math.max(1,img.height*sc|0);var x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);var d=x.getImageData(0,0,c.width,c.height).data,n=d.length/4,mr=0,mg=0,mb=0,i;
  for(i=0;i<d.length;i+=4){mr+=d[i];mg+=d[i+1];mb+=d[i+2];}mr/=n*255;mg/=n*255;mb/=n*255;var a=1.0*t,ab=mb<mg*0.75?0.6*t:0;
  var R=new Float32Array(n),G=new Float32Array(n),B=new Float32Array(n),sr=0,sg=0,sb=0;
  for(i=0;i<n;i++){var r=d[i*4]/255,g=d[i*4+1]/255,b=d[i*4+2]/255;r=r+a*(mg-mr)*(1-r)*g;b=b+ab*(mg-mb)*(1-b)*g;R[i]=r;G[i]=g;B[i]=b;sr+=r;sg+=g;sb+=b;}
  sr/=n;sg/=n;sb/=n;var av=(sr+sg+sb)/3,cl=function(v){return Math.max(0.6,Math.min(2.5,v));},gw=[cl(av/sr),cl(av/sg),cl(av/sb)].map(function(v){return 1+(v-1)*t;});
  function pct(A,gain){var H=new Uint32Array(256);for(var k=0;k<n;k++){var v=Math.min(255,Math.max(0,A[k]*gain*255|0));H[v]++;}var lo=0,hi=255,acc=0;for(var v2=0;v2<256;v2++){acc+=H[v2];if(acc>=n*0.005){lo=v2;break;}}acc=0;for(var v3=255;v3>=0;v3--){acc+=H[v3];if(acc>=n*0.005){hi=v3;break;}}if(hi-lo<40){var m=(hi+lo)/2;lo=Math.max(0,m-20);hi=lo+40;}return [lo/255,hi/255];}
  return {mr:mr,mg:mg,mb:mb,a:a,ab:ab,gw:gw,st:[pct(R,gw[0]),pct(G,gw[1]),pct(B,gw[2])],sat:1+0.18*t,t:t};}
pfApply=function(img,k,maxW){var t=Math.max(0,Math.min(1,k/100)),c=document.createElement('canvas'),sc=maxW?Math.min(1,maxW/Math.max(img.width,img.height)):1;c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);var x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);if(t<=0)return c;
  var P=img._pp&&img._pp.t===t?img._pp:(img._pp=pfParams(img,t)),id=x.getImageData(0,0,c.width,c.height),d=id.data,st=P.st,gw=P.gw;
  for(var i=0;i<d.length;i+=4){var r0=d[i]/255,g0=d[i+1]/255,b0=d[i+2]/255,r=r0+P.a*(P.mg-P.mr)*(1-r0)*g0,g=g0,b=b0+P.ab*(P.mg-P.mb)*(1-b0)*g0;
    r=(r*gw[0]-st[0][0])/(st[0][1]-st[0][0]);g=(g*gw[1]-st[1][0])/(st[1][1]-st[1][0]);b=(b*gw[2]-st[2][0])/(st[2][1]-st[2][0]);
    r=r0+(r-r0)*t;g=g0+(g-g0)*t;b=b0+(b-b0)*t;var L=0.299*r+0.587*g+0.114*b;r=L+(r-L)*P.sat;g=L+(g-L)*P.sat;b=L+(b-L)*P.sat;
    d[i]=r<0?0:r>1?255:r*255;d[i+1]=g<0?0:g>1?255:g*255;d[i+2]=b<0?0:b>1?255:b*255;}
  x.putImageData(id,0,0);return c;};
