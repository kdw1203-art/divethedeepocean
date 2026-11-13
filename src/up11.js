/* ===== 다이브 기록 가져오기: Shearwater · Apple Watch · Garmin · 그 밖의 CSV ===== */
function readAs(f,how){return new Promise(function(ok){var r=new FileReader();r.onload=function(){ok(r.result);};r.onerror=function(){ok(null);};if(how==='buf')r.readAsArrayBuffer(f);else r.readAsText(f);});}
function importFiles(files,say){var out=[];return files.reduce(function(p,f){return p.then(function(){var n=f.name.toLowerCase();
    if(/\.fit$/.test(n))return readAs(f,'buf').then(function(b){try{out=out.concat(parseFIT(b));}catch(e){}});
    if(/\.zip$/.test(n)){say&&say('아이폰 건강 앱 기록을 읽는 중이에요. 파일이 크면 1~2분 걸려요…');return appleHealth(f,say).then(function(a){out=out.concat(a);});}
    if(/\.(csv|txt)$/.test(n))return readAs(f).then(function(t){out=out.concat(parseCSV(t||''));});
    return readAs(f.size>30*1048576?f.slice(0,4096):f).then(function(t){t=t||'';if(/<HealthData|HKQuantityTypeIdentifier/.test(t)){say&&say('아이폰 건강 앱 기록을 읽는 중이에요…');return appleHealth(f,say).then(function(a){out=out.concat(a);});}try{out=out.concat(parseDiveXml(t,f.name));}catch(e){}});});},Promise.resolve()).then(function(){return out;});}

/* CSV: Shearwater Cloud · MacDive · Suunto · 엑셀 정리 파일 등. 머리줄 이름으로 칸을 찾아요 */
function csvRows(t){var d=(t.split('\n')[0].match(/;/g)||[]).length>(t.split('\n')[0].match(/,/g)||[]).length?';':(t.indexOf('\t')>=0&&t.split('\n')[0].indexOf(',')<0?'\t':','),rows=[],row=[],cell='',q=false;
  for(var i=0;i<t.length;i++){var c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){cell+='"';i++;}else q=false;}else cell+=c;}else if(c==='"')q=true;else if(c===d){row.push(cell);cell='';}else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;row.push(cell);rows.push(row);row=[];cell='';}else cell+=c;}
  if(cell||row.length){row.push(cell);rows.push(row);}return rows.filter(function(r){return r.some(function(x){return x.trim();});});}
function toDate(s){s=String(s||'').trim();var m;
  if((m=s.match(/(\d{4})[-.\/년 ]\s*(\d{1,2})[-.\/월 ]\s*(\d{1,2})/)))return m[1]+'-'+('0'+m[2]).slice(-2)+'-'+('0'+m[3]).slice(-2);
  if((m=s.match(/(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})/))){var a=+m[1],b=+m[2];if(a>12)return m[3]+'-'+('0'+b).slice(-2)+'-'+('0'+a).slice(-2);return m[3]+'-'+('0'+a).slice(-2)+'-'+('0'+b).slice(-2);}
  var dt=new Date(s);return isNaN(dt)?null:dt.toISOString().slice(0,10);}
function toMin(s,hdr){s=String(s||'').trim();if(!s)return null;var m;
  if((m=s.match(/^(\d+):(\d{2}):(\d{2})$/)))return Math.round(+m[1]*60+ +m[2]+ +m[3]/60);
  if((m=s.match(/^(\d+):(\d{2})$/)))return Math.round(/sec|초|\(s\)/i.test(hdr)?+m[1]/60:+m[1]+ +m[2]/60);
  var v=parseFloat(s.replace(',','.'));if(!isFinite(v))return null;if(/sec|초|\(s\)/i.test(hdr)||v>400)return Math.round(v/60);return Math.round(v);}
function parseCSV(t){var R=csvRows(t);if(R.length<2)return [];var H=R[0].map(function(h){return h.trim().toLowerCase();});
  function col(re){for(var i=0;i<H.length;i++)if(re.test(H[i]))return i;return -1;}
  var cd=col(/^(date|dive ?date|start|start ?time|date ?time|날짜|일자|입수)/),cp=col(/max.?depth|최대.?수심|^depth|수심/),ct=col(/duration|dive ?time|bottom ?time|run ?time|length|elapsed|잠수.?시간|다이브.?시간|^시간/),cs=col(/site|location|spot|포인트|장소|지점/);
  if(cd<0||(cp<0&&ct<0))return [];var ft=cp>=0&&/\(ft\)|feet|\bft\b/.test(H[cp]);
  return R.slice(1).map(function(r){var d=toDate(r[cd]),p=cp>=0?parseFloat(String(r[cp]||'').replace(',','.')):NaN;if(ft&&isFinite(p))p=p*0.3048;
    return d?{date:d,depth:isFinite(p)&&p>0?Math.round(p*10)/10:null,time:ct>=0?toMin(r[ct],H[ct]):null,site:cs>=0?String(r[cs]||'').trim().slice(0,80):''}:null;}).filter(function(x){return x&&(x.depth||x.time);});}

/* Apple Watch (Ultra · Oceanic+ · 수심 앱): 아이폰 건강 앱 '모든 건강 데이터 내보내기' zip에서 수심 기록과 다이빙 운동을 찾아요.
   큰 파일도 조금씩 풀어 읽고, 다른 건강 정보는 저장하지 않아요. */
function loadFflate(){if(window.fflate)return Promise.resolve();if(loadFflate.p)return loadFflate.p;loadFflate.p=new Promise(function(ok,no){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js';s.integrity='sha384-DT0Ls0mO7JmjTnT+oBuMhEJzYJO1zUqzuuMXNdnOmOQRIpN2BgSjvBV/j50NngIT';s.crossOrigin='anonymous';s.onload=ok;s.onerror=function(){loadFflate.p=null;no();};document.head.appendChild(s);});return loadFflate.p;}
function appleHealth(file,say){var samples=[],works=[],tail='',dec=new TextDecoder('utf-8'),seen=0;
  function scan(txt,final){var s=tail+txt,cut=final?s.length:s.lastIndexOf('>')+1;tail=s.slice(cut);s=s.slice(0,cut);
    var re=/<Record type="HKQuantityTypeIdentifierUnderwaterDepth"[^>]*>/g,m;while((m=re.exec(s))){var a=m[0],v=(a.match(/ value="([\d.]+)"/)||[])[1],u=(a.match(/ unit="([^"]+)"/)||[])[1],sd=(a.match(/ startDate="([^"]+)"/)||[])[1];if(v&&sd){var dep=+v;if(/ft/.test(u||''))dep*=0.3048;samples.push([sd,dep]);}}
    var rw=/<Workout [^>]*workoutActivityType="HKWorkoutActivityTypeUnderwaterDiving"[^>]*>/g;while((m=rw.exec(s))){var w=m[0],du=(w.match(/ duration="([\d.]+)"/)||[])[1],un=(w.match(/ durationUnit="([^"]+)"/)||[])[1],st=(w.match(/ startDate="([^"]+)"/)||[])[1];if(st)works.push([st,du?(/sec|^s$/.test(un||'')?+du/60:+du):null]);}}
  function tsec(s){var m=String(s).match(/(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/);return m?Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6])/1000:0;}
  function finish(){var D=[];samples.sort(function(a,b){return a[0]<b[0]?-1:1;});var cur=null;
    samples.forEach(function(s){var t=tsec(s[0]);if(!cur||t-cur.e>15*60){cur={d:s[0].slice(0,10),s:t,e:t,m:0};D.push(cur);}cur.e=t;cur.m=Math.max(cur.m,s[1]);});
    var out=D.filter(function(d){return d.m>=1;}).map(function(d){return {date:d.d,depth:Math.round(d.m*10)/10,time:Math.max(1,Math.round((d.e-d.s)/60)),site:'Apple Watch 기록'};});
    works.forEach(function(w){var t=tsec(w[0]);if(!D.some(function(d){return Math.abs(d.s-t)<30*60;}))out.push({date:w[0].slice(0,10),depth:null,time:w[1]?Math.round(w[1]):null,site:'Apple Watch 다이빙'});});
    return out;}
  var isZip=/\.zip$/i.test(file.name);
  var reader=file.stream?file.stream().getReader():null;if(!reader)return Promise.resolve([]);
  function tick(n){seen+=n;if(say&&file.size)say('아이폰 건강 앱 기록을 읽는 중이에요… '+Math.min(99,Math.round(seen/file.size*100))+'%');}
  if(!isZip)return (function pump(){return reader.read().then(function(r){if(r.done){scan(dec.decode(),true);return finish();}tick(r.value.length);scan(dec.decode(r.value,{stream:true}),false);return pump();});})();
  return loadFflate().then(function(){return new Promise(function(ok){var F=window.fflate,uz=new F.Unzip(),hit=false,doneFile=false;uz.register(F.UnzipInflate);
    uz.onfile=function(f){if(!/export\.xml$/i.test(f.name)||/cda/i.test(f.name)||hit)return;hit=true;f.ondata=function(err,chunk,fin){if(err){doneFile=true;return;}scan(dec.decode(chunk,{stream:!fin}),fin);if(fin)doneFile=true;};f.start();};
    (function pump(){reader.read().then(function(r){if(r.done){uz.push(new Uint8Array(0),true);ok(finish());return;}tick(r.value.length);uz.push(r.value,false);pump();}).catch(function(){ok(finish());});})();});}).catch(function(){toast('압축 파일을 여는 도구를 불러오지 못했어요');return [];});}

/* 기기 연결 화면: 기기별로 지금 할 수 있는 방법 */
V.devices=function(){setTitle('기기 연결');
  function dev(name,how,steps,state){return '<div class="panel"><h2>'+name+' '+tags([state])+'</h2><p style="margin:0 0 8px">'+how+'</p><ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px">'+steps.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ol></div>';}
  return '<div class="vh"><div><a class="small" href="#log">← 로그</a><h1>기기 연결</h1><p>다이브 컴퓨터와 워치 기록을 로그로 옮기는 방법이에요</p></div><a class="btn btn-pri" href="#log">파일 올리러 가기</a></div>'+
  dev('Shearwater (Perdix · Teric · Peregrine · Petrel 등)','Shearwater Cloud 앱으로 컴퓨터를 받은 뒤, 기록을 파일로 내보내 올려요.',['휴대폰이나 PC의 Shearwater Cloud 앱에서 다이브 컴퓨터를 블루투스로 연결해 기록을 받아요.','PC용 Shearwater Cloud에서 다이브를 고르고 내보내기에서 <b>UDDF</b> 또는 <b>CSV</b>를 골라요.','로그 화면의 \'다이브 컴퓨터 파일 가져오기\'에 그 파일을 올리면 날짜·최대 수심·시간이 들어와요.','Subsurface를 쓰신다면 Subsurface의 .ssrf/.xml 파일도 그대로 올릴 수 있어요.'],['지금 가능','ok'])+
  dev('Apple Watch (Ultra · 수심 앱 · Oceanic+)','워치의 다이빙 기록은 아이폰 건강 앱에 쌓여요. 건강 데이터를 내보내서 올리면 다이빙만 골라 읽어요.',['아이폰에서 건강 앱 → 오른쪽 위 프로필 사진 → <b>모든 건강 데이터 내보내기</b>를 눌러요.','만들어진 <b>내보내기.zip</b>(export.zip)을 파일 앱에 저장해요. 기록이 많으면 몇 분 걸려요.','로그 화면에서 그 zip 파일을 그대로 올려요. 수심 기록을 다이브별로 묶어 날짜·최대 수심·시간을 만들어요.','zip 안의 다른 건강 정보(걸음, 심박 등)는 읽기만 하고 저장하지 않아요. 파일은 서버로 보내지 않고 휴대폰 안에서 처리해요.'],['지금 가능','ok'])+
  dev('Garmin (Descent Mk3 · G1 · Mk2)','Garmin Connect에서 다이빙 활동을 FIT 파일로 받아 올려요.',['Garmin Connect 웹사이트에서 다이빙 활동을 열어요.','오른쪽 위 톱니바퀴 → <b>원본 내보내기</b>로 zip을 받고, 풀어서 나온 <b>.fit</b> 파일을 올려요.','자동 연동(수면·심박 포함)은 Garmin 개발자 프로그램 승인 뒤 열려요.'],['지금 가능','ok'])+
  dev('그 밖의 컴퓨터 · 앱 (Suunto · Mares · Cressi · MacDive · 엑셀)','UDDF나 CSV로 내보낼 수 있으면 대부분 읽어요.',['앱의 내보내기에서 UDDF, Subsurface XML, CSV 가운데 하나를 골라요.','CSV는 첫 줄에 날짜, 최대 수심(Max Depth), 시간(Duration) 같은 이름이 있으면 알아서 칸을 찾아요. 피트(ft)는 미터로 바꿔요.','엑셀로 정리한 기록도 CSV로 저장해 올리면 돼요.'],['지금 가능','ok'])+
  '<div class="panel"><h2>앞으로</h2><div class="list">'+item({tags:[['준비 중','gray']],t:'Shearwater 블루투스 직접 연결',s:'안드로이드 크롬에서 컴퓨터를 바로 연결하는 방식이에요. 아이폰 사파리는 블루투스 웹 연결을 지원하지 않아요.'})+item({tags:[['개발자 승인 필요','gray']],t:'Garmin Connect 자동 연동',s:'승인되면 다이빙·수면·심박이 자동으로 들어와요.'})+item({tags:[['앱 출시 뒤','gray']],t:'Apple 건강 자동 연동',s:'아이폰 앱이 나오면 내보내기 없이 바로 가져와요.'})+'</div></div>'+foot();};
var _log11=V.log;V.log=function(){return _log11().replace(/Shearwater Cloud · Subsurface · Suunto 등에서 내보낸 <b>UDDF<\/b>, Subsurface <b>\.ssrf\/\.xml<\/b>, Garmin <b>\.fit<\/b> 파일을/,'Shearwater·Garmin·Apple Watch·Suunto 기록을 올려요. <b>UDDF</b>, <b>CSV</b>, Subsurface <b>.ssrf/.xml</b>, Garmin <b>.fit</b>, 아이폰 건강 앱 <b>내보내기 zip</b> 파일을').replace('여러 개도 돼요','여러 개도 돼요 · <a href="#devices">기기별 방법</a>');};
