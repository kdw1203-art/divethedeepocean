// 국세청 사업자등록 상태 조회 (공공데이터포털). NTS_KEY가 Vercel 환경 변수에 있을 때만 켜짐.
// 로그인한 회원만, 한 사람당 하루 30회.
const SB = 'https://crasesnlwwyegdgzkqes.supabase.co';
const LIM = new Map();
module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  const key = process.env.NTS_KEY;
  if (req.method === 'GET') { res.status(200).json({ on: !!key }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  if (!key) { res.status(503).json({ error: 'not_configured' }); return; }
  const auth = req.headers.authorization || '', apikey = req.headers.apikey || '';
  if (!/^Bearer [\w.-]+$/.test(auth) || !/^[\w.-]{20,400}$/.test(apikey)) { res.status(401).json({ error: 'login' }); return; }
  let user;
  try {
    const u = await fetch(SB + '/auth/v1/user', { headers: { authorization: auth, apikey } });
    if (!u.ok) { res.status(401).json({ error: 'login' }); return; }
    user = await u.json();
  } catch (e) { res.status(502).json({ error: 'auth' }); return; }
  const day = new Date().toISOString().slice(0, 10), lk = user.id + day, n = (LIM.get(lk) || 0) + 1;
  if (n > 30) { res.status(429).json({ error: 'limit' }); return; }
  LIM.set(lk, n); if (LIM.size > 5000) LIM.clear();
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const bno = String(body.b_no || '').replace(/\D/g, '');
  if (!/^\d{10}$/.test(bno)) { res.status(400).json({ error: 'b_no' }); return; }
  try {
    const r = await fetch('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=' + encodeURIComponent(key), {
      method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ b_no: [bno] })
    });
    const j = await r.json();
    const d = (j && j.data && j.data[0]) || {};
    res.status(200).json({ b_no: bno, status: d.b_stt || null, tax: d.tax_type || null, end: d.end_dt || null, found: !!d.b_stt_cd });
  } catch (e) { res.status(502).json({ error: 'nts' }); }
};
