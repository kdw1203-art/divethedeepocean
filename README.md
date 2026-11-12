# Dive the deep ocean

스쿠버·프리다이버를 위한 바다 안내서 · https://divedeepocean.com

- 정적 웹앱(PWA)이라 빌드 과정 없이 Vercel이 그대로 배포해요.
- 로그인 · 로그 · 피드 · 업체 등록 · 해양생물 도감은 Supabase(divethedeepocean 프로젝트)에 연결돼요.
- `src/preview.html`은 서버 없이 한 파일로 돌아가는 미리보기 버전이에요. `src/build.py`가 이 파일을 쪼개 `index.html`과 `assets/`를 만들어요.

## 데이터 출처
- 다이빙 센터 · 포인트 · 리조트: © OpenStreetMap contributors (ODbL)
- 해양생물 이름 · 관찰 수 · 사진: iNaturalist (사진은 CC BY · CC BY-SA · CC0 · 퍼블릭 도메인만), 해양 종 판별: OBIS, 한글 이름 일부: Wikidata
- 해안선: Natural Earth
