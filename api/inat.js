// iNaturalist 공유 캐시: 허용한 조회만 받아 Vercel CDN에 하루(분류 정보는 7일) 저장
const PATHS = [/^observations$/, /^observations\/species_counts$/, /^taxa$/, /^taxa\/\d{1,9}(,\d{1,9}){0,29}$/];
const KEYS = ['lat','lng','radius','photo_license','quality_grade','per_page','order_by','locale','iconic_taxa','month','taxon_id','parent_id','rank','is_active','q','order','page','photos','preferred_place_id','id','place_id','captive'];
module.exports = async (req, res) => {
  const q = req.query || {};
  const p = String(q.p || '');
  if (!PATHS.some(rx => rx.test(p))) { res.status(400).json({ error: 'bad path' }); return; }
  const sp = new URLSearchParams();
  KEYS.forEach(k => { if (q[k] != null && String(q[k]).length <= 300) sp.set(k, String(q[k])); });
  const n = Number(sp.get('per_page') || 30); if (n > 200) sp.set('per_page', '200');
  const url = `https://api.inaturalist.org/v1/${p}?${sp.toString()}`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'divedeepocean.com (cache; contact via site)' } });
    const body = await r.text();
    const age = /^taxa/.test(p) ? 604800 : 86400;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', r.ok ? `public, max-age=3600, s-maxage=${age}, stale-while-revalidate=${age}` : 'no-store');
    res.status(r.ok ? 200 : 502).send(body);
  } catch (e) {
    res.setHeader('cache-control', 'no-store');
    res.status(502).json({ error: 'upstream' });
  }
};
