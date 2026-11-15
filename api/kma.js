// 기상청 API허브 해양기상부이 실측값 (KMA_KEY 환경 변수). 관측 자료라 10분 동안만 공유 캐시.
const NUM = v => { const n = Number(v); return isFinite(n) && n > -90 ? n : null; };
module.exports = async (req, res) => {
  const key = process.env.KMA_KEY;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  if (!key) { res.setHeader('cache-control', 'public, max-age=300'); res.status(200).json({ on: false, st: [] }); return; }
  const d = new Date(Date.now() + 9 * 3600e3 - 30 * 60e3), p = n => String(n).padStart(2, '0');
  const tm = `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}${p(d.getUTCHours())}${p(Math.floor(d.getUTCMinutes() / 30) * 30)}`;
  const url = `https://apihub.kma.go.kr/api/typ01/url/kma_buoy.php?tm=${tm}&stn=0&help=0&authKey=${encodeURIComponent(key)}`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'divedeepocean.com' } });
    const buf = Buffer.from(await r.arrayBuffer());
    let txt; try { txt = new TextDecoder('euc-kr').decode(buf); } catch (e) { txt = buf.toString('utf8'); }
    if ((req.query || {}).info) { const r2 = await fetch(`https://apihub.kma.go.kr/api/typ01/url/stn_inf.php?inf=BUOY&stn=&tm=${tm}&help=0&authKey=${encodeURIComponent(key)}`); const b2 = Buffer.from(await r2.arrayBuffer()); let t2; try { t2 = new TextDecoder('euc-kr').decode(b2); } catch (e) { t2 = b2.toString('utf8'); } res.setHeader('cache-control', 'no-store'); res.status(200).json({ status: r2.status, head: t2.slice(0, 2600) }); return; }
    if ((req.query || {}).raw) { res.setHeader('cache-control', 'no-store'); res.status(200).json({ status: r.status, head: txt.slice(0, 900) }); return; }
    const ST = {22101:['덕적도',37.236,126.019],22102:['칠발도',34.793,125.777],22103:['거문도',34.001,127.501],22104:['거제도',34.767,128.9],22105:['동해',37.481,129.95],22106:['포항',36.35,129.783],22107:['마라도',33.083,126.033],22108:['외연도',36.25,125.75],21229:['울릉도',37.455,131.114],22183:['신안',34.733,126.242],22184:['추자도',33.794,126.141],22185:['인천',37.092,125.429],22186:['부안',35.659,125.814],22187:['서귀포',33.128,127.023],22188:['통영',34.391,128.225],22189:['울산',35.345,129.841],22190:['울진',36.907,129.874]};
    // 지점 좌표는 기상청 지점정보에서 받아 하루 동안 기억하고, 실패하면 위 기본값을 씀
    const G = globalThis.__kmaStn || (globalThis.__kmaStn = { at: 0, m: null });
    if (!G.m || Date.now() - G.at > 864e5) {
      try {
        const r2 = await fetch(`https://apihub.kma.go.kr/api/typ01/url/stn_inf.php?inf=BUOY&stn=&tm=${tm}&help=0&authKey=${encodeURIComponent(key)}`);
        if (r2.ok) { const b2 = Buffer.from(await r2.arrayBuffer()); let t2; try { t2 = new TextDecoder('euc-kr').decode(b2); } catch (e) { t2 = b2.toString('utf8'); }
          const m = {}; t2.split(/\r?\n/).forEach(l => { const f = l.trim().split(/\s+/); if (/^\d{5}$/.test(f[0]) && f.length >= 7) { const lon = Number(f[1]), lat = Number(f[2]); if (isFinite(lat) && isFinite(lon) && lat > 30 && lat < 40 && lon > 120 && lon < 135) m[f[0]] = [f[6], Math.round(lat * 1e4) / 1e4, Math.round(lon * 1e4) / 1e4]; } });
          if (Object.keys(m).length >= 10) { G.m = m; G.at = Date.now(); } }
      } catch (e) {}
    }
    if (G.m) Object.assign(ST, G.m);
    const st = [];
    for (const l of txt.split(/\r?\n/)) {
      const f = l.trim().split(/\s+/);
      if (!/^\d{12}$/.test(f[0]) || f.length < 15) continue;
      const info = ST[f[1]]; if (!info) continue;
      st.push({ id: f[1], name: info[0], tm: f[0], lat: info[1], lon: info[2], wd: NUM(f[2]), ws: NUM(f[3]), gst: NUM(f[4]), ta: NUM(f[10]), tw: NUM(f[11]), wh: NUM(f[13]), whmax: NUM(f[12]), wp: NUM(f[15]) });
    }
    const last = {}; st.forEach(x => { if (x.wh != null || x.tw != null) { if (!last[x.id] || x.tm > last[x.id].tm) last[x.id] = x; } }); st.length = 0; Object.values(last).forEach(x => st.push(x));
    res.setHeader('cache-control', st.length ? 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800' : 'no-store');
    res.status(200).json({ on: true, n: st.length, st });
  } catch (e) { res.setHeader('cache-control', 'no-store'); res.status(200).json({ on: true, n: 0, st: [], err: 'upstream' }); }
};
