/* ===== 다이브 컴퓨터 파일 첨부 고치기: 휴대폰에서 파일이 회색으로 막히던 문제 · Shearwater Cloud(.db) · 원본 로그(.swlogzp) ===== */
/* 아이폰은 .fit .uddf .ssrf 같은 확장자를 몰라서 accept가 있으면 고를 수가 없어요. 받는 건 다 받고, 읽을 수 있는지는 읽어 보고 알려 줘요 */
function logInFix(){var i=document.getElementById('uddfIn');if(i&&i.hasAttribute('accept'))i.removeAttribute('accept');}
var _after67=after;after=function(){_after67();logInFix();var m=document.getElementById('uddfMsg'),k=state.impMsg;if(m&&k&&!m.textContent.trim()&&Date.now()-k.t<180000)m.innerHTML=k.h;};
document.addEventListener('pointerdown',function(e){if(e.target.closest&&e.target.closest('#dropZ,label[for="uddfIn"]'))logInFix();},true);
var SQLJS='https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';
function sqlLib(){if(window._sqlP)return window._sqlP;window._sqlP=new Promise(function(ok,no){if(window.initSqlJs)return ok();var s=document.createElement('script');s.src=SQLJS+'sql-wasm.js';s.onload=ok;s.onerror=function(){window._sqlP=null;no(new Error('load'));};document.head.appendChild(s);}).then(function(){return window.initSqlJs({locateFile:function(f){return SQLJS+f;}});});return window._sqlP;}
function gunzip(u8){if(typeof DecompressionStream==='undefined')return Promise.reject(new Error('gz'));return new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer().then(function(b){return new Uint8Array(b);});}
/* Shearwater 기록: 앞 4바이트 길이 + gzip, 또는 gzip, 또는 원본 그대로 */
function swTrim(u8){/* 뒤에 0으로 채운 부분이 있으면 브라우저 압축 풀기가 실패해서, 앞 4바이트(원래 크기)와 같은 gzip 끝을 찾아 잘라요 */var e=u8.length;while(e>4&&u8[e-1]===0)e--;for(var k=Math.min(u8.length-4,e+3);k>=Math.max(8,e-4);k--){if(u8[k]===u8[0]&&u8[k+1]===u8[1]&&u8[k+2]===u8[2]&&u8[k+3]===u8[3])return u8.subarray(4,k+4);}return u8.subarray(4);}
function swRaw(u8){if(u8[4]===0x1f&&u8[5]===0x8b)return gunzip(swTrim(u8)).catch(function(){return gunzip(u8.subarray(4));});if(u8[0]===0x1f&&u8[1]===0x8b)return gunzip(u8);return Promise.resolve(u8);}
/* Petrel Native Format: 32바이트 단위 기록 */
function pnfParse(d,meta){meta=meta||{};var u16=function(i){return (d[i]<<8)|d[i+1];},op={},S=[],i;for(i=0;i+32<=d.length;i+=32){var t=d[i];if(t===1)S.push(i);else if(t>=0x10&&t<=0x19&&op[t]==null)op[t]=i;}
  if(!S.length||op[0x10]==null)return null;var o=op[0x10],imp=d[o+8]===1,ts=((d[o+12]<<24)>>>0)+(d[o+13]<<16)+(d[o+14]<<8)+d[o+15],iv=op[0x15]!=null?u16(op[0x15]+23)/1000:10;if(!(iv>0&&iv<=60))iv=10;
  var prof=[],mx=0,tmin=null;S.forEach(function(p,k){var dep=u16(p+1)/10;if(imp)dep*=0.3048;var tc=(d[p+14]<<24)>>24;if(imp)tc=(tc-32)*5/9;var bar=null;[28,20].some(function(q){var v=u16(p+q);if(v<0xFFF0&&v>0){bar=Math.round((v&0x0FFF)*2*0.0689476);return true;}});
    dep=Math.round(dep*10)/10;if(dep>mx)mx=dep;if(tc>-5&&tc<45&&(tmin==null||tc<tmin))tmin=Math.round(tc*10)/10;prof.push([Math.round(k*iv),dep,tc>-5&&tc<45?Math.round(tc*10)/10:null,bar]);});
  while(prof.length>2&&prof[prof.length-1][1]<0.5&&prof[prof.length-2][1]<0.5)prof.pop();
  if(mx<0.5)return null;var st=ts>946684800?new Date(ts*1000).toISOString().slice(0,19):(meta.date?String(meta.date).replace(' ','T').slice(0,19):null);
  return {date:st?st.slice(0,10):null,start:st,depth:mx,time:Math.max(1,Math.round(prof[prof.length-1][0]/60)),temp:tmin,profile:prof,device:meta.dev||'Shearwater',site:meta.site||'',o2:meta.o2||null,lat:meta.lat,lon:meta.lon};}
function swMeta(r){var m={date:r.DiveDate||r.DateAndTime,site:[r.Location,r.Site].filter(Boolean).join(' · ')};var fn=String(r.FileName||'');if(fn)m.dev='Shearwater '+fn.split('[')[0].trim();
  try{var g=JSON.parse(r.TankProfileData||'{}').GasProfiles;if(g&&g[0]&&g[0].O2Percent)m.o2=g[0].O2Percent;}catch(e){}
  var gp=String(r.GnssEntryLocation||'').match(/(-?\d+\.\d+)[^\d-]+(-?\d+\.\d+)/);if(gp){m.lat=+gp[1];m.lon=+gp[2];}return m;}
function readSwDb(f,say){say&&say('Shearwater Cloud 기록을 여는 중이에요…');return Promise.all([sqlLib(),readAs(f,'buf')]).then(function(a){var db=new a[0].Database(new Uint8Array(a[1])),rows=[];
  try{var q=db.prepare('SELECT d.*, l.data_bytes_1 AS raw FROM log_data l LEFT JOIN dive_details d ON d.DiveId=l.log_id');while(q.step())rows.push(q.getAsObject());q.free();}catch(e){rows=[];}db.close();
  if(!rows.length)throw new Error('noTable');say&&say(rows.length+'개 다이브를 읽는 중이에요…');
  return rows.reduce(function(p,r){return p.then(function(out){if(!r.raw)return out;return swRaw(r.raw).then(function(d){var x=pnfParse(d,swMeta(r));if(x)out.push(x);return out;}).catch(function(){return out;});});},Promise.resolve([]));});}
function readSwLog(f){return readAs(f,'buf').then(function(b){return swRaw(new Uint8Array(b));}).then(function(d){var x=pnfParse(d,{dev:'Shearwater '+f.name.split('[')[0].trim()});return x?[x]:[];});}
/* 파일 종류별로 나눠서 읽고, 못 읽은 파일은 이유를 알려 줘요 */
var _imp67=importFiles;
importFiles=function(files,say){var sw=[],rest=[],bad=[];files.forEach(function(f){var n=f.name.toLowerCase();if(/\.db$|\.sqlite3?$/.test(n))sw.push(['db',f]);else if(/\.swlogz?p?$/.test(n))sw.push(['log',f]);else if(/\.(jpe?g|png|heic|heif|gif|webp|mp4|mov|pdf|docx?|xlsx?|hwp)$/.test(n))bad.push(f.name);else rest.push(f);});
  state.impBad=[];var out=[];
  return sw.reduce(function(p,x){return p.then(function(){return (x[0]==='db'?readSwDb(x[1],say):readSwLog(x[1])).then(function(a){if(!a.length)state.impBad.push(x[1].name+' (다이브 기록이 비어 있어요)');out=out.concat(a);}).catch(function(e){state.impBad.push(x[1].name+(e&&e.message==='load'?' (인터넷 연결을 확인하고 다시 해 주세요)':e&&e.message==='noTable'?' (Shearwater Cloud 파일이 아니에요)':' (읽지 못했어요)'));});});},Promise.resolve())
    .then(function(){return rest.length?_imp67(rest,say):[];}).then(function(a){bad.forEach(function(n){state.impBad.push(n+' (사진·문서 파일이에요)');});out=out.concat(a||[]);setTimeout(function(){impBadNote();var m=document.getElementById('uddfMsg');if(m&&m.textContent.trim())state.impMsg={h:m.innerHTML,t:Date.now()};},60);return out;});};
function impBadNote(){var m=document.getElementById('uddfMsg');if(!m||!state.impBad||!state.impBad.length)return;var ok=/개를 읽었어요/.test(m.textContent);
  m.innerHTML=esc(ok?m.textContent:'읽을 수 있는 다이브를 찾지 못했어요.')+'<br><span class="small">못 읽은 파일: '+state.impBad.map(esc).join(', ')+'</span>'+(ok?'':'<br><span class="small">Shearwater는 앱에서 내보낸 <b>.db</b>나 <b>UDDF·XML</b>, Garmin은 <b>.fit</b>, Suunto는 <b>.fit·.json·.xml</b> 파일을 넣어 주세요. <a href="/guide/shearwater-export">내보내는 방법</a></span>');}
