/* ===== 대표 생물 사진 · 로그 분석 ===== */
var LIFEPH=null;
function lifePhLoad(){if(LIFEPH||lifePhLoad.b)return;lifePhLoad.b=1;fetch('/assets/media/life.json').then(function(r){return r.ok?r.json():{};}).then(function(d){LIFEPH=d||{};if(cur()==='life')rerender();}).catch(function(){LIFEPH={};});}
var _life18=V.life;V.life=function(a){var h=_life18(a);if(!LIFEPH){lifePhLoad();return h;}
  return h.replace(/<div class="lcard"><span><span class="tag [^"]*">[^<]*<\/span><\/span><b>([^<]+)<\/b>/g,function(m,n){var p=LIFEPH[n];if(!p)return m;
    return m.replace('<div class="lcard">','<div class="lcard" style="padding-top:0;overflow:hidden"><span style="display:block;margin:0 -14px 8px;position:relative"><img src="'+p.src+'" alt="'+esc(n)+'" loading="lazy" style="width:100%;height:150px;object-fit:cover;display:block"><a href="'+esc(p.page)+'" target="_blank" rel="noopener" style="position:absolute;right:6px;bottom:4px;font-size:10px;color:#fff;text-shadow:0 1px 2px #000;text-decoration:none">'+esc(p.author)+' · '+esc(p.license)+'</a></span>');});};

/* 로그 분석: 기록에서 읽어 낸 숫자와 해석 */
state.an=null;
function anLoad(){if(!BE.on||!BE.user||anLoad.b)return;anLoad.b=1;BE.sb.from('dive_logs').select('dive_date,max_depth,avg_depth,minutes,site,spot,water_temp,species,bar_start,bar_end,tank_l,kind').eq('owner',BE.user.id).limit(3000).then(function(r){anLoad.b=0;state.an=(r.data||[]).map(function(l){return {date:l.dive_date,depth:+l.max_depth||0,avg:+l.avg_depth||0,time:+l.minutes||0,site:l.site,spot:l.spot,temp:l.water_temp,species:l.species||[],b0:l.bar_start,b1:l.bar_end,tank:l.tank_l,kind:l.kind};});state.anN=(state.userLogs||[]).length;if(cur()==='log')rerender();});}
function bars(rows,unit){var mx=Math.max.apply(null,rows.map(function(r){return r[1];}))||1;return '<div style="display:flex;flex-direction:column;gap:5px">'+rows.map(function(r){return '<div style="display:grid;grid-template-columns:78px minmax(0,1fr) 46px;gap:8px;align-items:center;font-size:13px"><span>'+esc(r[0])+'</span><span style="height:12px;border-radius:6px;background:var(--soft);overflow:hidden"><i style="display:block;height:100%;width:'+Math.round(r[1]/mx*100)+'%;background:var(--sea);border-radius:6px"></i></span><b style="text-align:right">'+r[1]+(unit||'')+'</b></div>';}).join('')+'</div>';}
function analyze(L){L=L.filter(function(l){return l.date;}).sort(function(a,b){return a.date<b.date?-1:1;});var n=L.length;if(!n)return '';
  var mins=0,dsum=0,dn=0,mx=L[0],lg=L[0],Y={},M=[0,0,0,0,0,0,0,0,0,0,0,0],B=[0,0,0,0,0],S={},SP={},temps=[],sac=[];
  L.forEach(function(l){mins+=l.time;if(l.depth){dsum+=l.depth;dn++;}if(l.depth>mx.depth)mx=l;if(l.time>lg.time)lg=l;var y=l.date.slice(0,4);Y[y]=(Y[y]||0)+1;M[+l.date.slice(5,7)-1]++;
    B[l.depth<=10?0:l.depth<=18?1:l.depth<=30?2:l.depth<=40?3:4]++;var k=l.site||'기록 없음';S[k]=(S[k]||0)+1;(l.species||[]).forEach(function(x){SP[x]=(SP[x]||0)+1;});if(l.temp!=null)temps.push(+l.temp);
    if(l.b0&&l.b1&&l.tank&&l.time&&l.b0>l.b1){var ad=l.avg||l.depth*0.6;if(ad>0)sac.push([l.date,(l.b0-l.b1)*l.tank/l.time/(ad/10+1)]);}});
  var last=L[n-1],days=Math.floor((Date.now()-new Date(last.date+'T00:00:00'))/864e5),now=new Date(),y0=String(now.getFullYear()),y1=String(now.getFullYear()-1),bm=M.indexOf(Math.max.apply(null,M));
  var top=Object.keys(S).map(function(k){return [k,S[k]];}).sort(function(a,b){return b[1]-a[1];}).slice(0,5),tsp=Object.keys(SP).map(function(k){return [k,SP[k]];}).sort(function(a,b){return b[1]-a[1];}).slice(0,5);
  var MS=[10,25,50,100,200,300,500,1000],nx=MS.filter(function(m){return m>n;})[0],got=MS.filter(function(m){return m<=n;});
  var I=[];
  I.push('마지막 다이빙은 '+last.date+' ('+days+'일 전)이에요.'+(days>180?' 6개월이 넘었어요. 다음 다이빙은 얕은 체크 다이브나 리프레시 과정으로 시작하는 걸 권해요.':days>90?' 3개월이 넘었으니 첫 다이빙은 여유 있게 잡으세요.':''));
  if(Y[y0]||Y[y1])I.push('올해 '+(Y[y0]||0)+'회, 작년 '+(Y[y1]||0)+'회 다이빙했어요.');
  I.push((bm+1)+'월에 가장 많이 다이빙했어요 ('+M[bm]+'회).');
  if(dn){var deep=B[2]+B[3]+B[4];I.push('18m보다 깊은 다이빙이 '+Math.round(deep/n*100)+'%예요.'+(B[4]?' 40m를 넘긴 기록이 '+B[4]+'회 있어요. 레크리에이션 한계를 넘는 수심이에요.':''));}
  if(temps.length)I.push('기록된 수온은 '+Math.min.apply(null,temps)+'~'+Math.max.apply(null,temps)+'℃예요.');
  if(sac.length>=3){var a=sac.reduce(function(s,x){return s+x[1];},0)/sac.length,r3=sac.slice(-3).reduce(function(s,x){return s+x[1];},0)/3;I.push('공기 소모량(수면 기준)은 평균 '+a.toFixed(1)+'L/분, 최근 3회는 '+r3.toFixed(1)+'L/분이에요.'+(r3<a*0.95?' 줄어드는 중이에요.':r3>a*1.05?' 최근에 조금 늘었어요.':'')+(sac[0][1]&&!L[0].avg?' (평균 수심이 없는 로그는 최대 수심의 60%로 어림했어요)':''));}
  if(nx)I.push('다음 기록까지 '+(nx-n)+'회 남았어요 ('+nx+'회).');
  var yrs=Object.keys(Y).sort().slice(-6).map(function(y){return [y+'년',Y[y]];});
  return '<details class="panel" open id="anBox"><summary><b style="font-size:17px">내 다이빙 분석</b> <span class="small">로그 '+n+'개 기준</span></summary>'+
   '<div class="stats" style="margin-top:12px"><div class="stat"><small>물속 시간</small><b>'+Math.floor(mins/60)+'시간 '+(mins%60)+'분</b></div><div class="stat"><small>평균 최대 수심</small><b>'+(dn?(dsum/dn).toFixed(1)+'m':'—')+'</b></div><div class="stat"><small>평균 시간</small><b>'+Math.round(mins/n)+'분</b></div><div class="stat"><small>가장 깊었던 곳</small><b>'+(mx.depth?mx.depth+'m':'—')+'</b><small>'+esc(mx.site||'')+'</small></div></div>'+
   '<ul style="margin:14px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:5px">'+I.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'+
   (got.length?'<div class="chips" style="margin-top:12px">'+got.map(function(m){return '<span class="chip" style="cursor:default;border-color:var(--coral)">'+m+'회 달성</span>';}).join('')+'</div>':'')+
   '<div class="cols" style="margin-top:16px"><div><h2 style="font-size:15px">연도별</h2>'+bars(yrs,'회')+'<h2 style="font-size:15px;margin-top:16px">수심 분포</h2>'+bars([['10m까지',B[0]],['10~18m',B[1]],['18~30m',B[2]],['30~40m',B[3]],['40m 넘게',B[4]]],'회')+'</div>'+
   '<div><h2 style="font-size:15px">월별</h2><div style="display:flex;align-items:flex-end;gap:4px;height:90px">'+M.map(function(v,i){var h=Math.round(v/(Math.max.apply(null,M)||1)*70);return '<div style="flex:1;text-align:center;font-size:11px"><div style="height:'+(h+2)+'px;background:'+(i===bm?'var(--coral)':'var(--sea)')+';border-radius:4px 4px 0 0" title="'+v+'회"></div>'+(i+1)+'</div>';}).join('')+'</div>'+
   '<h2 style="font-size:15px;margin-top:16px">자주 간 곳</h2>'+bars(top,'회')+(tsp.length?'<h2 style="font-size:15px;margin-top:16px">자주 본 생물</h2>'+bars(tsp,'회'):'')+'</div></div>'+
   '<p class="small" style="margin:12px 0 0">기록한 값으로 계산한 참고 자료예요. 공기 소모량은 탱크 압력·용량을 적은 로그만 계산돼요. 감압 계획이나 건강 판단에는 쓰지 마세요.</p></details>';}
var _log18=V.log;V.log=function(){var h=_log18(),U=state.userLogs||[];if(!U.length)return h;var L;
  if(BE.on&&BE.user){if(!state.an||state.anN!==U.length){anLoad();}L=state.an||U.map(function(l){return {date:l.date,depth:+l.depth||0,time:+l.time||0,site:l.site};});}
  else L=U.map(function(l){return {date:l.date,depth:+l.depth||0,time:+l.time||0,site:l.site};});
  var p=analyze(L);return p?h.replace(/(<div class="stats">[\s\S]*?<\/div><\/div>)/,'$1'+p):h;};
if(LANG==='en'){var EN18={'내 다이빙 분석':'My dive analysis','물속 시간':'Time underwater','평균 최대 수심':'Avg max depth','평균 시간':'Avg duration','가장 깊었던 곳':'Deepest','연도별':'By year','수심 분포':'Depth range','월별':'By month','자주 간 곳':'Top sites','자주 본 생물':'Most seen'};Object.keys(EN18).forEach(function(k){EN_D[k]=EN18[k];});}
