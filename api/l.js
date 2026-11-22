// 짧은 공유 링크: /s/서명 · /r/친구초대 · /c/클럽초대 · /g/클럽 · /m/소모임 · /b/버디 · /t/강사
// 카톡·문자·메신저가 읽는 제목·설명·사진을 붙이고, 사람은 앱 안 화면으로 바로 보냄
const SB = 'https://crasesnlwwyegdgzkqes.supabase.co';
const KEY = 'sb_publishable_cCtDGcChyf_L193Px9omDw_5zl85o1J'; // 화면에도 실리는 공개 키
const SITE = 'https://www.divedeepocean.com';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CODE = /^[A-Za-z0-9_-]{2,40}$/;
const NUM = /^\d{1,12}$/;

async function rpc(fn, body) {
  try {
    const r = await fetch(SB + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) return null;
    const d = await r.json();
    return Array.isArray(d) ? d[0] : d;
  } catch (e) { return null; }
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const k = String(q.k || '');
  const v = String(q.v || '').trim();
  const from = String(q.from || '').replace(/[<>"'&]/g, '').trim().slice(0, 20);
  const fq = from ? 'from=' + encodeURIComponent(from) : '';
  let go = SITE + '/', title = 'Dive the deep ocean', desc = '다이빙 로그 · 바다 날씨 · 사진 도감', label = '열기';

  if (k === 's' && UUID.test(v)) {
    go = SITE + '/#sign-' + v.toLowerCase();
    title = '다이브 로그 서명 부탁드려요';
    desc = '눌러서 바로 서명해 주세요. 로그인 없이 휴대폰으로 할 수 있어요.';
    label = '서명하러 가기';
    const d = await rpc('sign_get', { p_token: v });
    if (d && d.date !== undefined) {
      title = (d.diver || '다이버') + ' 님이 다이브 로그 서명을 부탁했어요';
      desc = [d.date, d.site, d.max_depth ? d.max_depth + 'm' : '', d.minutes ? d.minutes + '분' : ''].filter(Boolean).join(' · ') + (d.signed ? ' — 이미 서명된 로그예요' : ' — 눌러서 서명해 주세요');
    }
  } else if (k === 'r' && CODE.test(v)) {
    go = SITE + '/?ref=' + encodeURIComponent(v.toUpperCase()) + (fq ? '&' + fq : '') + '#signup';
    title = (from ? from + ' 님이 ' : '친구가 ') + 'Dive the Deep Ocean에 초대했어요';
    desc = '다이빙 로그북 · 바다 날씨 · 생물 도감을 무료로 써 보세요. 링크로 가입하면 초대가 자동으로 기록돼요.';
    label = '가입하러 가기';
  } else if (k === 'c' && CODE.test(v)) {
    go = SITE + '/?club=' + encodeURIComponent(v) + (fq ? '&' + fq : '') + '#clubs';
    title = (from ? from + ' 님이 ' : '') + '다이빙 클럽에 초대했어요';
    desc = '눌러서 클럽에 들어가요. 처음이면 가입한 뒤 바로 들어가져요.';
    label = '클럽 들어가기';
  } else if (k === 'g' && NUM.test(v)) {
    go = SITE + '/' + (fq ? '?' + fq : '') + '#club-' + v;
    title = '다이빙 클럽 소식이 왔어요';
    desc = '클럽 일정 · 사진첩 · 공지를 확인해 보세요.';
    label = '클럽 보기';
  } else if (k === 'm' && NUM.test(v)) {
    go = SITE + '/' + (fq ? '?' + fq : '') + '#meet-d' + v;
    title = (from ? from + ' 님이 ' : '') + '다이빙 소모임에 초대했어요';
    desc = '날짜 · 장소 · 참여 인원을 확인하고 바로 참여해 보세요.';
    label = '소모임 보기';
  } else if (k === 'b' && CODE.test(v)) {
    go = SITE + '/?buddy=' + encodeURIComponent(v.toUpperCase()) + (fq ? '&' + fq : '') + '#profile';
    title = (from ? from + ' 님이 ' : '') + '버디 등록을 요청했어요';
    desc = '눌러서 버디로 등록하면 서로 로그 서명을 바로 부탁할 수 있어요.';
    label = '버디 등록하기';
  } else if (k === 't' && CODE.test(v)) {
    go = SITE + '/?inst=' + encodeURIComponent(v.toUpperCase()) + (fq ? '&' + fq : '') + '#profile';
    title = (from ? from + ' 강사님의 ' : '') + '강사 등록 링크예요';
    desc = '눌러서 내 강사로 등록하면 교육 다이브 로그에 강사 서명·도장을 바로 받을 수 있어요.';
    label = '내 강사로 등록하기';
  }

  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', k === 's' ? 'private, no-store' : 'public, max-age=60, s-maxage=600');
  res.status(200).send('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(title) + ' | Dive the deep ocean</title>' +
    '<meta name="description" content="' + esc(desc) + '"><meta property="og:type" content="website"><meta property="og:site_name" content="Dive the deep ocean">' +
    '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:image" content="' + SITE + '/assets/og.jpg">' +
    '<meta name="twitter:card" content="summary_large_image"><meta name="robots" content="noindex">' +
    '<meta http-equiv="refresh" content="0;url=' + esc(go) + '"><script>location.replace(' + JSON.stringify(go) + ')</script></head>' +
    '<body style="font-family:system-ui,sans-serif;padding:32px 20px;text-align:center"><p>' + esc(title) + '</p><p><a href="' + esc(go) + '" style="display:inline-block;padding:12px 20px;border-radius:12px;background:#0a5a8a;color:#fff;text-decoration:none;font-weight:700">' + esc(label) + '</a></p></body></html>');
};
