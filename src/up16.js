/* ===== 다이브 컴퓨터 기록 가져오기 고도화 ===== */
function dsProf(p,n){n=n||180;if(!p||!p.length)return null;p=p.filter(function(x){return x&&isFinite(x[0])&&isFinite(x[1]);});if(p.length<2)return null;var step=Math.max(1,Math.ceil(p.length/n)),o=[];for(var i=0;i<p.length;i+=step)o.push([Math.round(p[i][0]),Math.round(p[i][1]*10)/10]);var l=p[p.length-1];if(o[o.length-1][0]!==Math.round(l[0]))o.push([Math.round(l[0]),Math.round(l[1]*10)/10]);return o;}
function avgOf(p){if(!p||p.length<2)return null;var a=0,t=0;for(var i=1;i<p.length;i++){var dt=p[i][0]-p[i-1][0];if(dt<=0)continue;a+=(p[i][1]+p[i-1][1])/2*dt;t+=dt;}return t?Math.round(a/t*10)/10:null;}

/* Garmin FIT: 수심 곡선 · 수온 · 시작 위치 · 기기 이름까지 */
parseFIT=function(buf){var dv=new DataView(buf),hs=dv.getUint8(0),size=dv.getUint32(4,true),end=Math.min(hs+size,buf.byteLength),p=hs,defs={},last=0,R=[],start=0,lat=null,lon=null,prod=null,manu=null,temps=[];
  if(buf.byteLength<14||String.fromCharCode(dv.getUint8(8),dv.getUint8(9),dv.getUint8(10),dv.getUint8(11))!=='.FIT')return [];
  function rd(off,sz,le,base){try{if(sz===1)return (base===1)?dv.getInt8(off):dv.getUint8(off);if(sz===2)return (base===3)?dv.getInt16(off,le):dv.getUint16(off,le);if(sz===4)return (base===5)?dv.getInt32(off,le):dv.getUint32(off,le);}catch(e){}return null;}
  function read(d,at){var o={},q=at;d.f.forEach(function(f){if(f[0]>=0)o[f[0]]=rd(q,f[1],d.le,f[2]&0x1F);q+=f[1];});return o;}
  function rec(d,v,ts){if(d.g===20){var dp=v[92];if(ts&&ts!==0xFFFFFFFF&&dp!=null&&dp!==0xFFFFFFFF)R.push([ts,dp/1000]);if(v[13]!=null&&v[13]!==127&&v[13]!==-128)temps.push(v[13]);if(lat==null&&v[0]!=null&&v[0]!==0x7FFFFFFF&&v[0]!==0&&v[1]!=null&&v[1]!==0x7FFFFFFF){lat=v[0]*180/2147483648;lon=v[1]*180/2147483648;}}
    if(d.g===18){if(v[2]&&v[2]!==0xFFFFFFFF)start=v[2];if(v[3]!=null&&v[3]!==0x7FFFFFFF&&v[3]!==0&&v[4]!=null&&v[4]!==0x7FFFFFFF){lat=v[3]*180/2147483648;lon=v[4]*180/2147483648;}}
    if(d.g===0){manu=v[1];prod=v[2];}}
  while(p<end){var h=dv.getUint8(p++);
    if(h&0x80){var lt=(h>>5)&3,off=h&0x1F,d=defs[lt];if(!d)break;var ts=(last&~0x1F)+off;if(off<(last&0x1F))ts+=0x20;last=ts;rec(d,read(d,p),ts);p+=d.len;continue;}
    if(h&0x40){var loc=h&0x0F,dev=h&0x20,le=dv.getUint8(p+1)===0,g=le?dv.getUint16(p+2,true):dv.getUint16(p+2,false),nf=dv.getUint8(p+4),q=p+5,F=[],len=0;
      for(var i=0;i<nf;i++){F.push([dv.getUint8(q),dv.getUint8(q+1),dv.getUint8(q+2)]);len+=dv.getUint8(q+1);q+=3;}
      if(dev){var nd=dv.getUint8(q);q++;for(var j=0;j<nd;j++){F.push([-1,dv.getUint8(q+1),0]);len+=dv.getUint8(q+1);q+=3;}}
      defs[loc]={g:g,le:le,f:F,len:len};p=q;continue;}
    var dd=defs[h&0x0F];if(!dd)break;var vv=read(dd,p);p+=dd.len;if(vv[253]!=null&&vv[253]!==0xFFFFFFFF)last=vv[253];rec(dd,vv,vv[253]);}
  if(!R.length)return [];var t0=R[0][0],s=start||t0,mx=0;R.forEach(function(r){if(r[1]>mx)mx=r[1];});if(mx<0.5)return [];
  var dt=new Date((s+631065600)*1000),date=dt.getFullYear()+'-'+('0'+(dt.getMonth()+1)).slice(-2)+'-'+('0'+dt.getDate()).slice(-2),prof=R.map(function(r){return [r[0]-t0,r[1]];});
  var names={1:'Garmin',23:'Suunto',259:'Shearwater'};
  return [{date:date,start:dt.toISOString(),depth:Math.round(mx*10)/10,time:Math.round((R[R.length-1][0]-t0)/60),site:'',device:(names[manu]||'Garmin')+(prod&&manu===1?' (제품 '+prod+')':''),lat:lat,lon:lon,temp:temps.length?Math.min.apply(null,temps):null,profile:prof}];};

/* UDDF · Subsurface XML (Shearwater Cloud·Subsurface·MacDive 내보내기): 수심 곡선 · 수온 · GPS · 기기 */
var _pdx16=parseDiveXml;parseDiveXml=function(txt,name){var base=_pdx16(txt,name);var doc=new DOMParser().parseFromString(txt,'application/xml');if(doc.querySelector('parsererror'))return base;
  var tag=function(el,n){return el.getElementsByTagName(n);},num=function(x){var v=parseFloat(String(x||'').replace(',','.'));return isFinite(v)?v:null;};
  var dives=[].slice.call(tag(doc,'dive'));if(!dives.length)return base;
  return base.map(function(o,i){var d=dives[i];if(!d)return o;var prof=[],temps=[];
    [].forEach.call(tag(d,'sample'),function(s){var t=String(s.getAttribute('time')||''),m=t.match(/(\d+):(\d+)/),sec=m?(+m[1]*60+ +m[2]):num(t);var dp=num(s.getAttribute('depth'));if(sec!=null&&dp!=null)prof.push([sec,dp]);var tc=num(s.getAttribute('temp'));if(tc!=null)temps.push(tc);});
    if(!prof.length)[].forEach.call(tag(d,'waypoint'),function(w){var dp=num((tag(w,'depth')[0]||{}).textContent),sec=num((tag(w,'divetime')[0]||{}).textContent),tk=num((tag(w,'temperature')[0]||{}).textContent);if(dp!=null&&sec!=null)prof.push([sec,dp]);if(tk!=null)temps.push(tk>200?tk-273.15:tk);});
    var wt=d.getAttribute('watertemp')||((tag(d,'temperature')[0]||{}).getAttribute&&tag(d,'temperature')[0].getAttribute('water'));var wv=num(wt);if(wv!=null)temps.push(wv>200?wv-273.15:wv);
    var lw=tag(d,'lowesttemperature')[0];if(lw){var lv=num(lw.textContent);if(lv!=null)temps.push(lv>200?lv-273.15:lv);}
    var dc=tag(d,'divecomputer')[0],dev=dc&&dc.getAttribute('model');if(!dev){var mdl=tag(doc,'model')[0];dev=mdl&&mdl.textContent;}
    var lat=null,lon=null,sid=d.getAttribute('divesiteid'),site=sid&&doc.querySelector('site[uuid="'+sid+'"]');if(site&&site.getAttribute('gps')){var g=site.getAttribute('gps').split(/\s+/);lat=num(g[0]);lon=num(g[1]);}
    if(lat==null){var gl=tag(d,'latitude')[0]||tag(doc,'latitude')[0],go=tag(d,'longitude')[0]||tag(doc,'longitude')[0];if(gl&&go){lat=num(gl.textContent);lon=num(go.textContent);}}
    var tm=d.getAttribute('time');o.start=o.date&&tm?o.date+'T'+tm:o.start;
    o.profile=prof.length>1?prof:null;o.temp=temps.length?Math.round(Math.min.apply(null,temps)*10)/10:null;o.device=dev||null;o.lat=lat;o.lon=lon;return o;});};

/* 가져온 다이브를 포인트에 자동 연결: GPS가 있으면 가장 가까운 포인트(30km 안), 없으면 이름으로 */
function kmBetween(a,b,c,d){var R=6371,x=(c-a)*Math.PI/180,y=(d-b)*Math.PI/180,s=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(s));}
function guessSpot(o){if(o.lat!=null&&o.lon!=null){var best=null,bd=1e9;SPOTS.forEach(function(s){var k=kmBetween(o.lat,o.lon,s.lat,s.lon);if(k<bd){bd=k;best=s;}});if(best&&bd<=30)return {s:best,why:'GPS '+Math.round(bd)+'km'};}
  var t=String(o.site||'').toLowerCase();if(t){var hit=SPOTS.filter(function(s){var k=[s.name.split(/[ ·(]/)[0],String(EN[s.id]||'').split(/[ ,(]/)[0]].filter(function(x){return x&&x.length>=2;});return k.some(function(x){return t.indexOf(x.toLowerCase())>=0;});})[0];if(hit)return {s:hit,why:'이름'};}return null;}

/* 미리 보기: 무엇을 가져올지 고르고 포인트를 고친 뒤 저장 */
state.imp=null;
function impSheet(){var I=state.imp;if(!I)return;var have={};(state.userLogs||[]).forEach(function(l){have[(l.date||'')+'|'+Math.round(+l.depth||0)]=1;});
  var opts='<option value="">포인트 모름</option>'+SPOTS.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+' · '+esc(s.country)+'</option>';}).join('');
  var rows=I.list.map(function(o,i){var dup=have[(o.date||'')+'|'+Math.round(+o.depth||0)];if(o.pick==null)o.pick=!dup;
    return '<tr'+(dup?' style="opacity:.6"':'')+'><td><input type="checkbox" data-ipick="'+i+'"'+(o.pick?' checked':'')+' aria-label="가져오기"></td><td>'+esc(o.date||'?')+(o.start&&o.start.length>12?'<br><span class="small">'+esc(String(o.start).slice(11,16))+'</span>':'')+'</td><td><b>'+(o.depth!=null?o.depth+'m':'—')+'</b>'+(o.avg?'<br><span class="small">평균 '+o.avg+'m</span>':'')+'</td><td>'+(o.time!=null?o.time+'분':'—')+'</td><td>'+(o.temp!=null?Math.round(o.temp*10)/10+'℃':'—')+'</td><td><select data-ispot="'+i+'" style="max-width:150px">'+opts.replace('value="'+(o.spot||'')+'"','value="'+(o.spot||'')+'" selected')+'</select>'+(o.why?'<br><span class="small">'+esc(o.why)+'로 찾음</span>':'')+(dup?'<br><span class="small">이미 있는 로그</span>':'')+'</td><td>'+(o.profile?'<svg width="80" height="28" aria-hidden="true">'+profPath(o.profile,80,28)+'</svg>':'')+'</td></tr>';}).join('');
  var n=I.list.filter(function(o){return o.pick;}).length;
  sheet('<h2 style="margin:0 0 4px">가져올 다이브 '+I.list.length+'개</h2><p class="small" style="margin:0 0 10px">'+esc(I.files)+' · 체크한 것만 저장해요. 포인트가 틀리면 바꿔 주세요.</p><div class="tbl" style="max-height:52vh;overflow:auto"><table><thead><tr><th></th><th>날짜</th><th>최대 수심</th><th>시간</th><th>수온</th><th>포인트</th><th>곡선</th></tr></thead><tbody>'+rows+'</tbody></table></div><div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn btn-pri" type="button" id="impGo"'+(n?'':' disabled')+'>'+n+'개 저장</button><button class="btn btn-line" type="button" data-xsheet="1">취소</button></div>');}
function profPath(p,w,h){var mt=p[p.length-1][0]||1,md=0;p.forEach(function(x){if(x[1]>md)md=x[1];});md=md||1;return '<path d="'+p.map(function(x,i){return (i?'L':'M')+(x[0]/mt*w).toFixed(1)+','+(2+x[1]/md*(h-4)).toFixed(1);}).join('')+'" fill="none" stroke="#2a8fbd" stroke-width="1.5"/>';}
document.addEventListener('change',function(e){var t=e.target;
  if(t.id==='uddfIn'){e.stopImmediatePropagation();var msg=document.getElementById('uddfMsg'),fs=[].slice.call(t.files||[]);if(!fs.length)return;if(msg)msg.textContent='읽는 중…';
    importFiles(fs,function(x){if(msg)msg.textContent=x;}).then(function(a){t.value='';a=(a||[]).filter(function(o){return o&&(o.date||o.depth);});
      if(!a.length){if(msg)msg.textContent='읽을 수 있는 다이브를 찾지 못했어요. UDDF, Subsurface XML, Garmin FIT, CSV, 아이폰 건강 앱 내보내기(zip) 파일인지 확인해 주세요.';return;}
      a.forEach(function(o){if(o.profile){o.profile=dsProf(o.profile,180);o.avg=avgOf(o.profile);}var g=guessSpot(o);if(g){o.spot=g.s.id;o.why=g.why;}});
      a.sort(function(x,y){return String(y.start||y.date).localeCompare(String(x.start||x.date));});
      state.imp={list:a,files:fs.map(function(f){return f.name;}).join(', ').slice(0,80)};if(msg)msg.textContent=a.length+'개를 읽었어요. 저장할 것을 골라 주세요.';impSheet();});return;}
  if(t.dataset&&t.dataset.ipick!=null){state.imp.list[+t.dataset.ipick].pick=t.checked;var n=state.imp.list.filter(function(o){return o.pick;}).length,b=document.getElementById('impGo');if(b){b.textContent=n+'개 저장';b.disabled=!n;}}
  if(t.dataset&&t.dataset.ispot!=null){var o=state.imp.list[+t.dataset.ispot];o.spot=t.value||null;o.why=t.value?'직접 고름':null;}},true);
document.addEventListener('click',function(e){if(e.target.id!=='impGo')return;var I=state.imp;if(!I)return;var L=I.list.filter(function(o){return o.pick;});if(!L.length)return;
  if(!BE.on){state.userLogs=L.map(function(o){return {date:o.date,site:o.spot?spot(o.spot).name:(o.site||'파일에서 가져옴'),depth:o.depth,time:o.time};}).concat(state.userLogs||[]);persist();closeSheet();rerender();return;}
  if(!BE.user){needLogin('로그를 저장하려면 로그인해 주세요');return;}e.target.disabled=true;e.target.textContent='저장하는 중…';
  var rows=L.map(function(o){var s=o.spot?spot(o.spot):null;return {dive_date:o.date||null,site:s?s.name:(o.site||'파일에서 가져옴'),spot:o.spot||null,max_depth:o.depth||null,minutes:o.time||null,source:'file',start_at:o.start&&!isNaN(Date.parse(o.start))?new Date(o.start).toISOString():null,avg_depth:o.avg||null,water_temp:o.temp!=null?Math.round(o.temp*10)/10:null,device:o.device?String(o.device).slice(0,60):null,lat:o.lat!=null?Math.round(o.lat*1e4)/1e4:null,lon:o.lon!=null?Math.round(o.lon*1e4)/1e4:null,profile:o.profile||null};});
  BE.sb.from('dive_logs').insert(rows).then(function(r){if(r.error){toast('저장하지 못했어요: '+r.error.message);e.target.disabled=false;e.target.textContent=L.length+'개 저장';return;}
    var mins=L.reduce(function(a,o){return a+(+o.time||0);},0),mx=Math.max.apply(null,L.map(function(o){return +o.depth||0;})),sp={};L.forEach(function(o){if(o.spot)sp[o.spot]=1;});
    closeSheet();state.imp=null;state.profIds=null;BE.pull();
    sheet('<h2 style="margin:0 0 8px">'+L.length+'개 다이브를 저장했어요</h2><div class="list">'+item({t:'물속에 있었던 시간',r:Math.floor(mins/60)+'시간 '+(mins%60)+'분'})+item({t:'이번에 가장 깊었던 곳',r:mx+'m'})+item({t:'지도에 표시된 포인트',r:Object.keys(sp).length+'곳'})+'</div><p class="small" style="margin:10px 0 0">포인트가 연결된 다이브는 홈 지도에 \'다녀온 곳\'으로 표시돼요. 로그 목록의 \'곡선\'을 누르면 수심 그래프를 볼 수 있어요.</p><div style="margin-top:12px"><button class="btn btn-pri" type="button" data-xsheet="1">확인</button></div>');});});

/* 로그 목록: 수심 곡선 보기 */
state.profIds=null;
function profIdsLoad(){if(!BE.on||!BE.user||profIdsLoad.b)return;profIdsLoad.b=1;BE.sb.from('dive_logs').select('id').eq('owner',BE.user.id).not('profile','is',null).limit(1000).then(function(r){profIdsLoad.b=0;state.profIds={};(r.data||[]).forEach(function(x){state.profIds[x.id]=1;});if(cur()==='log')rerender();});}
var _log16=V.log;V.log=function(){var h=_log16();if(BE.user&&!state.profIds)profIdsLoad();var P=state.profIds||{};
  h=h.replace(/<button class="chip" type="button" data-ledit="(\d+)">고치기<\/button>/g,function(m,id){return (P[id]?'<button class="chip" type="button" data-lprof="'+id+'">곡선</button>':'')+m;});
  return h.replace('기록 가져오기','기록 가져오기 <span class="tag ok">미리 보기 · 포인트 자동 연결</span>');};
document.addEventListener('click',function(e){var t=e.target.closest('[data-lprof]');if(!t)return;BE.sb.from('dive_logs').select('*').eq('id',+t.dataset.lprof).maybeSingle().then(function(r){var d=r.data;if(!d||!d.profile)return toast('곡선 정보가 없어요');
  var p=d.profile,W=560,H=220,mt=p[p.length-1][0]||1,md=0;p.forEach(function(x){if(x[1]>md)md=x[1];});md=Math.ceil((md||1)/5)*5;
  var grid='';for(var k=0;k<=md;k+=md>20?10:5)grid+='<line x1="34" x2="'+W+'" y1="'+(10+k/md*(H-30))+'" y2="'+(10+k/md*(H-30))+'" stroke="#e3edf3"/><text x="30" y="'+(14+k/md*(H-30))+'" font-size="10" text-anchor="end" fill="#6b8597">'+k+'m</text>';
  var path=p.map(function(x,i){return (i?'L':'M')+(34+x[0]/mt*(W-40)).toFixed(1)+','+(10+x[1]/md*(H-30)).toFixed(1);}).join('');
  sheet('<h2 style="margin:0 0 4px">'+esc(d.site||'다이브')+' · '+esc(d.dive_date||'')+'</h2><p class="small" style="margin:0 0 8px">'+[d.max_depth!=null?'최대 '+d.max_depth+'m':'',d.avg_depth!=null?'평균 '+d.avg_depth+'m':'',d.minutes?d.minutes+'분':'',d.water_temp!=null?'수온 '+d.water_temp+'℃':'',d.device||''].filter(Boolean).join(' · ')+'</p><svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto" role="img" aria-label="수심 곡선">'+grid+'<path d="'+path+' L'+(W-6)+',10 L34,10 Z" fill="#dcEFF7" opacity=".6"/><path d="'+path+'" fill="none" stroke="#1d6f99" stroke-width="2"/><text x="'+(W-6)+'" y="'+(H-4)+'" font-size="10" text-anchor="end" fill="#6b8597">'+Math.round(mt/60)+'분</text></svg><div style="margin-top:12px"><button class="btn btn-line" type="button" data-xsheet="1">닫기</button></div>');});});

if(LANG==='en'){var EN16={'곡선':'Profile','포인트 모름':'Unknown spot','취소':'Cancel','최대 수심':'Max depth','시간':'Time','수온':'Water temp','포인트':'Spot','날짜':'Date','미리 보기 · 포인트 자동 연결':'Preview · auto spot match','물속에 있었던 시간':'Time underwater','이번에 가장 깊었던 곳':'Deepest this time','지도에 표시된 포인트':'Spots added to map'};Object.keys(EN16).forEach(function(k){EN_D[k]=EN16[k];});}

appleHealth=function(file,say){var samples=[],works=[],temps=[],tail='',dec=new TextDecoder('utf-8'),seen=0;
  function scan(txt,final){var s=tail+txt,cut=final?s.length:s.lastIndexOf('>')+1;tail=s.slice(cut);s=s.slice(0,cut);
    var re=/<Record type="HKQuantityTypeIdentifierUnderwaterDepth"[^>]*>/g,m;while((m=re.exec(s))){var a=m[0],v=(a.match(/ value="([\d.]+)"/)||[])[1],u=(a.match(/ unit="([^"]+)"/)||[])[1],sd=(a.match(/ startDate="([^"]+)"/)||[])[1];if(v&&sd){var dep=+v;if(/ft/.test(u||''))dep*=0.3048;samples.push([sd,dep]);}}
    var rt=/<Record type="HKQuantityTypeIdentifierWaterTemperature"[^>]*>/g;while((m=rt.exec(s))){var a2=m[0],v2=(a2.match(/ value="([\d.]+)"/)||[])[1],u2=(a2.match(/ unit="([^"]+)"/)||[])[1],sd2=(a2.match(/ startDate="([^"]+)"/)||[])[1];if(v2&&sd2){var tc=+v2;if(/F/.test(u2||''))tc=(tc-32)*5/9;temps.push([sd2,tc]);}}
    var rw=/<Workout [^>]*workoutActivityType="HKWorkoutActivityTypeUnderwaterDiving"[^>]*>/g;while((m=rw.exec(s))){var w=m[0],du=(w.match(/ duration="([\d.]+)"/)||[])[1],un=(w.match(/ durationUnit="([^"]+)"/)||[])[1],st=(w.match(/ startDate="([^"]+)"/)||[])[1];if(st)works.push([st,du?(/sec|^s$/.test(un||'')?+du/60:+du):null]);}}
  function tsec(s){var m=String(s).match(/(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/);return m?Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6])/1000:0;}
  function finish(){var D=[];samples.sort(function(a,b){return a[0]<b[0]?-1:1;});var cur=null;
    samples.forEach(function(s){var t=tsec(s[0]);if(!cur||t-cur.e>15*60){cur={d:s[0].slice(0,10),s:t,e:t,m:0,p:[],st:s[0]};D.push(cur);}cur.e=t;cur.m=Math.max(cur.m,s[1]);cur.p.push([t-cur.s,s[1]]);});
    var out=D.filter(function(d){return d.m>=1;}).map(function(d){var tw=temps.filter(function(x){var tt=tsec(x[0]);return tt>=d.s-300&&tt<=d.e+300;}).map(function(x){return x[1];});return {date:d.d,depth:Math.round(d.m*10)/10,time:Math.max(1,Math.round((d.e-d.s)/60)),site:'Apple Watch 기록',device:'Apple Watch',start:d.st,profile:d.p,temp:tw.length?Math.min.apply(null,tw):null};});
    works.forEach(function(w){var t=tsec(w[0]);if(!D.some(function(d){return Math.abs(d.s-t)<30*60;}))out.push({date:w[0].slice(0,10),depth:null,time:w[1]?Math.round(w[1]):null,site:'Apple Watch 다이빙'});});
    return out;}
  var isZip=/\.zip$/i.test(file.name);
  var reader=file.stream?file.stream().getReader():null;if(!reader)return Promise.resolve([]);
  function tick(n){seen+=n;if(say&&file.size)say('아이폰 건강 앱 기록을 읽는 중이에요… '+Math.min(99,Math.round(seen/file.size*100))+'%');}
  if(!isZip)return (function pump(){return reader.read().then(function(r){if(r.done){scan(dec.decode(),true);return finish();}tick(r.value.length);scan(dec.decode(r.value,{stream:true}),false);return pump();});})();
  return loadFflate().then(function(){return new Promise(function(ok){var F=window.fflate,uz=new F.Unzip(),hit=false,doneFile=false;uz.register(F.UnzipInflate);
    uz.onfile=function(f){if(!/export\.xml$/i.test(f.name)||/cda/i.test(f.name)||hit)return;hit=true;f.ondata=function(err,chunk,fin){if(err){doneFile=true;return;}scan(dec.decode(chunk,{stream:!fin}),fin);if(fin)doneFile=true;};f.start();};
    (function pump(){reader.read().then(function(r){if(r.done){uz.push(new Uint8Array(0),true);ok(finish());return;}tick(r.value.length);uz.push(r.value,false);pump();}).catch(function(){ok(finish());});})();});}).catch(function(){toast('압축 파일을 여는 도구를 불러오지 못했어요');return [];});};
