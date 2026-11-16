// 사진으로 해양생물 후보 찾기. ANTHROPIC_API_KEY가 Vercel 환경 변수에 있을 때만 켜짐.
// 로그인한 회원만, 한 사람당 하루 20회 (인스턴스 메모리 기준).
const SB = 'https://crasesnlwwyegdgzkqes.supabase.co';
const LIM = new Map();
module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  const key = process.env.ANTHROPIC_API_KEY;
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
  if (n > 20) { res.status(429).json({ error: 'limit' }); return; }
  LIM.set(lk, n); if (LIM.size > 5000) LIM.clear();
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(body.image || '');
  if (!m || m[2].length > 1600000) { res.status(400).json({ error: 'image' }); return; }
  const prompt = '수중 사진 속 해양생물을 알아봐 주세요. JSON만 답하세요. 형식: {"marine":true|false,"candidates":[{"ko":"한국어 이름","en":"English name","sci":"학명","confidence":0~1,"why":"근거 한 줄(한국어)"}]} 후보는 가능성 높은 순 최대 3개. 확실하지 않으면 confidence를 낮게. 생물이 없거나 수중 사진이 아니면 marine:false, candidates:[]';
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 600,
        messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: 'image/' + m[1], data: m[2] } }, { type: 'text', text: prompt }] }] })
    });
    const j = await r.json();
    if (!r.ok) { res.status(502).json({ error: 'upstream' }); return; }
    const t = (j.content || []).map(c => c.text || '').join('');
    const s = t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1);
    let out; try { out = JSON.parse(s); } catch (e) { out = { marine: false, candidates: [] }; }
    const C = (Array.isArray(out.candidates) ? out.candidates : []).slice(0, 3).map(c => ({
      ko: String(c.ko || '').slice(0, 40), en: String(c.en || '').slice(0, 60), sci: String(c.sci || '').slice(0, 60),
      confidence: Math.max(0, Math.min(1, Number(c.confidence) || 0)), why: String(c.why || '').slice(0, 120) }));
    res.status(200).json({ marine: !!out.marine, candidates: C, left: 20 - n });
  } catch (e) { res.status(502).json({ error: 'upstream' }); }
};
