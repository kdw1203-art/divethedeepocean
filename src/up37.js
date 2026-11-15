/* ===== 국내 포인트: 가까운 기상청 해양기상부이 실측값 ===== */
var KMA={p:null};
function kmaLoad(){if(KMA.p&&Date.now()-KMA.at<6e5)return KMA.p;KMA.at=Date.now();if(/^(localhost|127\.)/.test(location.hostname))return (KMA.p=Promise.resolve([]));return (KMA.p=fetch('/api/kma').then(function(r){return r.json();}).then(function(d){return (d&&d.st)||[];}).catch(function(){return [];}));}
function kmaPanel(){var s=spot(state.sel),box=document.getElementById('seaToday');if(!s||s.country!=='대한민국'||!box||document.getElementById('kmaBox'))return;
  kmaLoad().then(function(L){if(!L.length||document.getElementById('kmaBox')||!document.body.contains(box)||(cur()==='spot'&&state.sel!==s.id))return;
    var best=null;L.forEach(function(x){if(x.wh==null&&x.tw==null)return;var d=km(s.lat,s.lon,x.lat,x.lon);if(!best||d<best.d)best={x:x,d:d};});if(!best||best.d>120)return;var x=best.x,t=String(x.tm||''),tm=t.length>=12?(+t.slice(4,6))+'/'+(+t.slice(6,8))+' '+t.slice(8,10)+':'+t.slice(10,12):'';
    var st=function(l,v,sub){return '<div class="stat"><small>'+l+'</small><b>'+v+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</div>';};
    var d=document.createElement('div');d.id='kmaBox';d.style.cssText='margin:0 0 12px;padding:12px;border:2px solid #0e7c86;border-radius:14px';
    d.innerHTML='<p style="margin:0 0 8px"><b>실제 관측값</b> <span class="small">기상청 해양기상부이 '+esc(x.name||x.id||'')+' · 여기서 '+Math.round(best.d)+'km'+(tm?' · '+tm+' 관측':'')+'</span></p><div class="sea6">'+st('파고 (실측)',x.wh!=null?x.wh.toFixed(1)+'m':'—','')+st('수온 (실측)',x.tw!=null?x.tw.toFixed(1)+'℃':'—','')+st('바람 (실측)',x.ws!=null?x.ws.toFixed(1)+'m/s':'—',x.wd!=null?dirKo(x.wd)+'풍'+(x.gst!=null?' · 돌풍 '+x.gst.toFixed(0)+'m/s':''):'')+st('기온 (실측)',x.ta!=null?x.ta.toFixed(0)+'℃':'—','')+'</div><p class="small" style="margin:8px 0 0">부이가 떠 있는 자리의 값이라 포인트 바로 앞과는 다를 수 있어요. 아래는 모델 계산값이에요.</p>';
    var h=box.querySelector('.seav')||box.querySelector('.sea6');if(h)h.before(d);else box.appendChild(d);});}
var _after37=after;after=function(){_after37();var c=cur();if(c==='spot'||c==='home'){setTimeout(kmaPanel,1500);setTimeout(kmaPanel,5000);}};
