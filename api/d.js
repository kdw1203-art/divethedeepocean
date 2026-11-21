// 다이브 공개 링크 미리보기: 카톡·인스타·메신저가 읽는 제목·설명·사진을 붙이고, 사람은 앱 화면으로 보냄
const SB = 'https://crasesnlwwyegdgzkqes.supabase.co';
const KEY = 'sb_publishable_cCtDGcChyf_L193Px9omDw_5zl85o1J'; // 화면에도 실리는 공개 키
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
module.exports = async (req, res) => {
  const t = String((req.query && req.query.t) || '');
  const ok = /^[0-9a-f-]{36}$/i.test(t);
  const site = 'https://www.divedeepocean.com';
  const go = ok ? site + '/#pub-' + t : site + '/';
  let d = null;
  if (ok) {
    try {
      const r = await fetch(SB + '/rest/v1/rpc/dive_public', { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'content-type': 'application/json' }, body: JSON.stringify({ p_token: t }) });
      if (r.ok) { d = await r.json(); if (Array.isArray(d)) d = d[0]; }
    } catch (e) { d = null; }
  }
  let title = 'Dive the deep ocean', desc = '다이빙 로그 · 바다 날씨 · 사진 도감', img = site + '/assets/og.jpg';
  if (d && d.date !== undefined) {
    title = (d.site || '다이브') + (d.max_depth ? ' · ' + d.max_depth + 'm' : '') + (d.minutes ? ' · ' + d.minutes + '분' : '');
    desc = [d.date, d.diver ? d.diver + ' 님의 다이브' : '', d.signs ? '서명 ' + d.signs + '개' : ''].filter(Boolean).join(' · ') + ' — 수심 그래프와 기록 보기';
    const p = (d.photos || [])[0];
    if (p && /^[\w\-./]+$/.test(p)) img = SB + '/storage/v1/object/public/media/' + p;
  }
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', 'public, max-age=60, s-maxage=300');
  res.status(200).send('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>' + esc(title) + ' | Dive the deep ocean</title>' +
    '<meta name="description" content="' + esc(desc) + '"><meta property="og:type" content="article"><meta property="og:site_name" content="Dive the deep ocean">' +
    '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:image" content="' + esc(img) + '">' +
    '<meta property="og:url" content="' + esc(site + '/d/' + (ok ? t : '')) + '"><meta name="twitter:card" content="summary_large_image"><meta name="robots" content="noindex">' +
    '<meta http-equiv="refresh" content="0;url=' + esc(go) + '"><link rel="canonical" href="' + esc(go) + '"></head><body><p><a href="' + esc(go) + '">다이브 기록 보기</a></p></body></html>');
};
