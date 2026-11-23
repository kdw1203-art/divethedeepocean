/* ================= 135: 2차 최적화 · 오류 보완 ================= */

/* 1) 스티커 그림(약 170KB)은 첫 화면 파일에서 빼고, 로그 화면에 들어가거나 스티커를 열 때 받기 */
function stkLoad(cb){if(STK_READY){if(cb)cb();return Promise.resolve();}
  stkLoad.q=stkLoad.q||[];if(cb)stkLoad.q.push(cb);
  if(!stkLoad.p)stkLoad.p=fetch('/assets/stk.json').then(function(r){if(!r.ok)throw new Error('stk '+r.status);return r.json();}).then(function(d){
    Object.assign(STK,d);STK_READY=true;var q=stkLoad.q;stkLoad.q=[];q.forEach(function(f){try{f();}catch(e){}});
  }).catch(function(e){stkLoad.p=null;throw e;});
  return stkLoad.p;}
/* 아직 안 받았으면: 받은 뒤 다시 그리기 */
if(typeof stkSvg==='function'){var _stkSvg135=stkSvg;stkSvg=function(id){if(!STK_READY){stkLoad(function(){if(typeof decoPaint==='function')decoPaint();});return '';}return _stkSvg135(id);};}
if(typeof stkImg==='function'){var _stkImg135=stkImg;stkImg=function(id,cb){if(!STK_READY){stkLoad(function(){_stkImg135(id,cb);});return {complete:false,naturalWidth:0};}return _stkImg135(id,cb);};}
if(typeof stkSheet==='function'){var _stkSheet135=stkSheet;stkSheet=function(){var a=arguments,t=this;if(!STK_READY){toast('스티커를 불러오는 중이에요');stkLoad(function(){_stkSheet135.apply(t,a);}).catch(function(){toast('스티커를 불러오지 못했어요. 다시 눌러 주세요');});return;}return _stkSheet135.apply(t,a);};}
if(typeof igStk==='function'){var _igStk135=igStk;igStk=function(){var a=arguments,t=this;return stkLoad().then(function(){return _igStk135.apply(t,a);},function(){return _igStk135.apply(t,a);});};}
/* 로그 목록 · 로그 상세에 들어가면 미리 받아 두기 */
var _after135=after;after=function(){_after135();var c=cur();if(c==='dive'||c==='log')setTimeout(function(){stkLoad().catch(function(){});},300);};

/* 2) 국기 글꼴(78KB): 아이폰 · 안드로이드 · 맥은 국기 이모지가 원래 있어서 받지 않기 (윈도우 등에서만 사용) */
(function(){if(!/iPhone|iPad|iPod|Macintosh|Android/.test(navigator.userAgent))return;var st=document.createElement('style');st.textContent='body,input,select,textarea,button{font-family:var(--font-body)}';document.head.appendChild(st);})();

/* 3) 영어 화면: 영어 사전(약 55KB)은 영어 방문자만 따로 받기 + 새 기능 문구 · 날짜 · 숫자 문구 번역 */
if(LANG==='en'){
  fetch('/assets/en2.json').then(function(r){return r.json();}).then(function(d){Object.keys(d).forEach(function(k){EN_D[k]=d[k];});if(typeof enApply==='function')enApply();}).catch(function(){});
  var WD135={'일':'Sun','월':'Mon','화':'Tue','수':'Wed','목':'Thu','금':'Fri','토':'Sat'},MO135=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var _enTok135=enTok;enTok=function(s){var r=_enTok135(s);if(r!==s)return r;var t=String(s).trim(),m,pl=function(n,a,b){return n+' '+(+n===1?a:b);};
    if((m=t.match(/^(\d{1,2})월 (\d{1,2})일 \(([일월화수목금토])\)( \d{1,2}:\d\d)?$/)))return WD135[m[3]]+', '+MO135[+m[1]]+' '+m[2]+(m[4]||'');
    if((m=t.match(/^(\d{1,2})월 (\d{1,2})일 \(([일월화수목금토])\) (\d{1,2}:\d\d)로 바꾸기 요청 중$/)))return 'Change to '+WD135[m[3]]+', '+MO135[+m[1]]+' '+m[2]+' '+m[4]+' requested';
    if((m=t.match(/^(\d{1,2})월 (\d{1,2})일 \(([일월화수목금토])\) (\d{1,2}:\d\d) →$/)))return WD135[m[3]]+', '+MO135[+m[1]]+' '+m[2]+' '+m[4]+' →';
    if((m=t.match(/^(\d{1,2})\/(\d{1,2}) \(([일월화수목금토])\)(.*)$/)))return WD135[m[3]]+' '+m[1]+'/'+m[2]+m[4];
    if((m=t.match(/^(\d{4})년 (\d{1,2})월$/)))return MO135[+m[2]]+' '+m[1];
    if((m=t.match(/^(\d{1,2})월 다이빙 리포트$/)))return MO135[+m[1]]+' dive report';
    if((m=t.match(/^다이브 ([\d,]+)회$/)))return pl(m[1],'dive','dives');
    if((m=t.match(/^올해 ([\d,]+)회$/)))return m[1]+' this year';
    if((m=t.match(/^\/ ([\d,]+)회$/)))return '/ '+m[1];
    if((m=t.match(/^지난 수업 ([\d,]+)회( 보기)?$/)))return (m[2]?'See ':'')+pl(m[1],'past class','past classes');
    if((m=t.match(/^발견 ([\d,]+)회$/)))return 'Seen '+m[1]+'×';
    if((m=t.match(/^([\d,]+)개 나라$/)))return pl(m[1],'country','countries');
    if((m=t.match(/^([\d,]+)장$/)))return pl(m[1],'card','cards');
    if((m=t.match(/^([\d,]+)일$/)))return pl(m[1],'day','days');
    if((m=t.match(/^(\d+)시간 (\d+)분$/)))return m[1]+' h '+m[2]+' min';
    if((m=t.match(/^(\d+)시간$/)))return m[1]+' h';
    if((m=t.match(/^마지막 다이브 후 (\d+)시간$/)))return m[1]+' h after last dive';
    if((m=t.match(/^(님 · )?마지막 다이브 ([\d,]+)일 전( · (.+))?$/)))return (m[1]?'· ':'')+'Last dive '+pl(m[2],'day','days')+' ago'+(m[4]?' · '+enTok(m[4]):'');
    if((m=t.match(/^(\S+) · ([\d,]+)일 전$/)))return m[1]+' · '+pl(m[2],'day','days')+' ago';
    if((m=t.match(/^로그 ([\d,]+)개 기준$/)))return 'Based on '+pl(m[1],'log','logs');
    if((m=t.match(/^스쿠버 기록 ([\d,]+)개 기준$/)))return 'Based on '+pl(m[1],'scuba log','scuba logs');
    if((m=t.match(/^내 로그 ([\d,]+)개$/)))return 'My logs · '+m[1];
    if((m=t.match(/^([\d,]+)회까지 ([\d,]+)회$/)))return m[2]+' to go until '+m[1];
    if((m=t.match(/^(요청|일정 바꾸기 요청|📅 일정 바꾸기 요청) ([\d,]+)건$/)))return (m[1].indexOf('📅')===0?'📅 ':'')+m[2]+' '+(m[1]==='요청'?'requests':'reschedule requests');
    if((m=t.match(/^D-(\d+) · (.+)$/)))return 'D-'+m[1]+' · '+enTok(m[2]);
    if((m=t.match(/^로그 (.+) \(올해 ([\d,]+)회\)$/)))return 'Logs '+m[1]+' ('+m[2]+' this year)';
    if((m=t.match(/^([\d,]+) logs · (\d{4}\.\d\d)부터 · (\d+)(개월째|년차) · (.+)$/)))return m[1]+' logs · since '+m[2]+' · '+(m[4]==='개월째'?m[3]+' mo':'year '+m[3])+' · '+m[5];
    if((m=t.match(/^Open · (\d+)\/(\d+)명$/)))return 'Open · '+m[1]+'/'+m[2];
    if((m=t.match(/^최대 ([\d,]+)명$/)))return 'max '+m[1];
    if((m=t.match(/^내 로그에 서명 · 도장 ([\d,]+)개$/)))return pl(m[1],'signature/stamp','signatures/stamps')+' on my logs';
    if((m=t.match(/^([\d,]+)개 ▾$/)))return m[1]+' ▾';
    /* 그래도 못 바꾼 'A · B · C' 문구는 조각마다 번역 */
    if(t.indexOf(' · ')>0){var P=t.split(' · '),Q=P.map(function(x){return enTok(x);});if(Q.some(function(x,i){return x!==P[i];}))return Q.join(' · ');}
    return r;};
}
