// 바다 예보 공유 캐시: 같은 포인트 요청은 Vercel CDN에서 3시간 동안 한 번만 Open-Meteo로 감
const KINDS = {
  now: 'current=wave_height,sea_surface_temperature,wave_period',
  tide: 'hourly=sea_level_height_msl&forecast_days=2',
  week: 'daily=wave_height_max,wave_period_max&forecast_days=7',
};
module.exports = async (req, res) => {
  const q = req.query || {};
  const lat = Number(q.lat), lon = Number(q.lon), k = KINDS[q.kind];
  if (!k || !isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    res.status(400).json({ error: 'bad request' }); return;
  }
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}&${k}&timezone=auto`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'divedeepocean.com cache' } });
    const body = await r.text();
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', r.ok ? 'public, max-age=900, s-maxage=10800, stale-while-revalidate=86400' : 'no-store');
    res.status(r.ok ? 200 : 502).send(body);
  } catch (e) {
    res.setHeader('cache-control', 'no-store');
    res.status(502).json({ error: 'upstream' });
  }
};
