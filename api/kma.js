// 기상청 API허브 해양기상부이 실측값 (KMA_KEY 환경 변수). 관측 자료라 10분 동안만 공유 캐시.
const NUM = v => { const n = Number(v); return isFinite(n) && n > -90 ? n : null; };
module.exports = async (req, res) => {
  const key = process.env.KMA_KEY;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  if (!key) { res.setHeader('cache-control', 'public, max-age=300'); res.status(200).json({ on: false, st: [] }); return; }
  const d = new Date(Date.now() + 9 * 3600e3 - 20 * 60e3), p = n => String(n).padStart(2, '0');
  const tm = `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}${p(d.getUTCHours())}00`;
  const url = `https://apihub.kma.go.kr/api/typ01/url/kma_buoy.php?tm=${tm}&stn=0&help=0&authKey=${encodeURIComponent(key)}`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'divedeepocean.com' } });
    const buf = Buffer.from(await r.arrayBuffer());
    let txt; try { txt = new TextDecoder('euc-kr').decode(buf); } catch (e) { txt = buf.toString('utf8'); }
    if ((req.query || {}).info) { const r2 = await fetch(`https://apihub.kma.go.kr/api/typ01/url/stn_inf.php?inf=BUOY&stn=&tm=${tm}&help=0&authKey=${encodeURIComponent(key)}`); const b2 = Buffer.from(await r2.arrayBuffer()); let t2; try { t2 = new TextDecoder('euc-kr').decode(b2); } catch (e) { t2 = b2.toString('utf8'); } res.setHeader('cache-control', 'no-store'); res.status(200).json({ status: r2.status, head: t2.slice(0, 2600) }); return; }
    if ((req.query || {}).raw) { res.setHeader('cache-control', 'no-store'); res.status(200).json({ status: r.status, head: txt.slice(0, 900) }); return; }
    const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    let cols = null; const st = [];
    for (const l of lines) {
      if (l[0] === '#') { const t = l.replace(/^#+/, '').split(/[,\s]+/).filter(Boolean); if (t.includes('STN_ID') || t.includes('STN')) cols = t; continue; }
      const f = l.split(l.includes(',') ? ',' : /\s+/).map(x => x.trim()).filter((x, i, a) => !(i === a.length - 1 && x === '='));
      if (f.length < 8) continue;
      const c = cols && cols.length <= f.length + 1 ? cols : ['TP', 'TM', 'STN_ID', 'STN_KO', 'LON', 'LAT', 'WH', 'WD', 'WS', 'WS_GST', 'TW', 'TA', 'PA', 'HM'];
      const g = k => f[c.indexOf(k)];
      const lat = NUM(g('LAT')), lon = NUM(g('LON'));
      if (lat == null || lon == null || lat < 30 || lat > 40 || lon < 120 || lon > 135) continue;
      st.push({ id: g('STN_ID') || g('STN'), name: g('STN_KO') || '', tm: g('TM') || tm, lat, lon, wh: NUM(g('WH')), tw: NUM(g('TW')), ws: NUM(g('WS')), wd: NUM(g('WD')), gst: NUM(g('WS_GST')), ta: NUM(g('TA')) });
    }
    res.setHeader('cache-control', st.length ? 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800' : 'no-store');
    res.status(200).json({ on: true, n: st.length, st });
  } catch (e) { res.setHeader('cache-control', 'no-store'); res.status(200).json({ on: true, n: 0, st: [], err: 'upstream' }); }
};
