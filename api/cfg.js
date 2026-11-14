// 화면에 그대로 드러나도 되는 공개 설정만 내려줌 (카카오 JavaScript 키는 등록한 도메인에서만 동작하는 공개 키)
module.exports = (req, res) => {
  const k = process.env.KAKAO_JS_KEY || '';
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'public, max-age=300, s-maxage=600');
  res.status(200).json({ kakao: /^[0-9a-f]{20,40}$/i.test(k) ? k : '' });
};
