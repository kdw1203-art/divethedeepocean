// 바다 예보 공유 캐시: 같은 포인트 요청은 Vercel CDN에서 3시간 동안 한 번만 Open-Meteo로 감
const KINDS = {
  now: 'current=wave_height,sea_surface_temperature,wave_period',
  now2: 'current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction&hourly=wave_height&forecast_days=2',
  wx: 'current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&wind_speed_unit=ms',
  tide: 'hourly=sea_level_height_msl&forecast_days=2',
  week: 'daily=wave_height_max,wave_period_max&forecast_days=7',
};
module.exports = async (req, res) => {
  const q = req.query || {};
  const lat = Number(q.lat), lon = Number(q.lon), k = KINDS[q.kind];
  if (!k || !isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    res.status(400).json({ error: 'bad request' }); return;
  }
  // 상업용 요금제 키를 Vercel 환경 변수 OPENMETEO_KEY에 넣으면 전용 서버(customer-)로 바뀜
  const key = process.env.OPENMETEO_KEY;
  const wx = q.kind === 'wx', live = wx || q.kind === 'now2';
  const host = (key ? 'customer-' : '') + (wx ? 'api.open-meteo.com' : 'marine-api.open-meteo.com');
  const url = `https://${host}/v1/${wx ? 'forecast' : 'marine'}?latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}&${k}&timezone=auto` + (key ? `&apikey=${encodeURIComponent(key)}` : '');
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'divedeepocean.com cache' } });
    const body = await r.text();
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', r.ok ? (live ? 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600' : 'public, max-age=900, s-maxage=10800, stale-while-revalidate=86400') : 'no-store');
    res.status(r.ok ? 200 : 502).send(body);
  } catch (e) {
    res.setHeader('cache-control', 'no-store');
    res.status(502).json({ error: 'upstream' });
  }
};
