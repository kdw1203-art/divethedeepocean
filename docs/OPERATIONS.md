# Dive the deep ocean · 운영 절차

사이트를 운영하면서 정기적으로 확인할 일과 사고가 났을 때의 순서를 정리했어요. (개선안 256·273·276·277·278)

## 1. 운영자 계정 관리 (276)

- 운영자 권한(`profiles.is_admin`)은 꼭 필요한 사람에게만 줘요. 기본은 대표 1명, 많아도 2명이에요.
- 권한은 Supabase 대시보드 → Table Editor → `profiles`에서 직접 바꿔요. 사이트 화면에서는 바꿀 수 없어요(`profile_guard` 트리거가 막아요).
- 운영자 계정은 2단계 인증(사이트 `#mfa`)을 꼭 켜요.
- **매달 1일 점검**
  1. SQL Editor에서 `select id, nick, created_at from profiles where is_admin;` 실행
  2. 모르는 계정이나 그만둔 사람이 있으면 바로 `is_admin=false`
  3. Supabase 대시보드 → Organization → Members에서 팀원 목록도 같이 확인
  4. 사이트 운영자 콘솔의 `admin_log`에서 지난달 승인·반려·삭제 기록을 훑어봐요

## 2. DB 백업과 복구 연습 (277)

- Supabase는 매일 자동 백업을 만들어요. 대시보드 → Database → Backups에서 날짜별로 보여요.
  무료 요금제는 보관 기간이 짧아요. 유료 전환 시 PITR(시점 복구)을 켜는 것을 권해요.
- **매주 월요일**: Backups 화면에서 어제 날짜 백업이 있는지 확인
- **분기마다 복구 연습 (30분)**
  1. 대시보드에서 새 프로젝트를 하나 만들어요(이름 예: `restore-test`)
  2. 최근 백업을 그 프로젝트로 복구하거나, `supabase db dump`로 받은 파일을 넣어요
  3. `select count(*) from profiles; select count(*) from businesses; select count(*) from bookings;` 숫자가 운영 DB와 비슷한지 확인
  4. 확인이 끝나면 테스트 프로젝트는 지워요
- 사진·서류 파일(Storage)은 DB 백업에 들어가지 않아요. 분기마다 `media`, `docs`, `video` 버킷을 내려받아 따로 보관해요.

## 3. API 키 교체 순서 (278)

키가 유출됐거나 담당자가 바뀌었을 때 이 순서로 해요.

| 키 | 어디에 있나 | 교체 방법 |
|---|---|---|
| Supabase publishable 키 (`sb_publishable_…`) | `assets/cfg.js` (공개돼도 되는 키) | 대시보드 → Settings → API Keys에서 새 키 발급 → `cfg.js` 수정·배포 → 옛 키 폐기 |
| Supabase secret / service_role 키 | 엣지 함수 환경 변수에만 있음. 코드·저장소에 넣지 않아요 | 대시보드에서 새 secret 키 발급 → 엣지 함수가 자동으로 새 키를 써요 → 옛 키 폐기 |
| 웹 푸시 VAPID 키 | `private.push_vapid` 테이블 (서버에서만 읽음) | 행을 지우면 `push` 함수가 새 키를 만들어요. 기존 구독은 모두 끊기니 사용자에게 알림을 다시 켜 달라고 공지해요 |
| GitHub 토큰 · Vercel 토큰 | 각 서비스 계정 설정 | 새 토큰 발급 → 연결 다시 하기 → 옛 토큰 삭제 |

유출이 의심되면: ① 키 교체 → ② Supabase Logs에서 이상 요청 확인 → ③ 필요하면 이용자에게 알리고 개인정보보호위원회 신고 기준(72시간)을 검토해요.

## 4. 로그인 토큰 저장 방식 점검 (273)

- 지금 로그인 세션은 supabase-js 기본값대로 브라우저 localStorage에 저장돼요. 정적 사이트 구조에서는 이게 표준 방식이에요.
- 그래서 **스크립트 주입(XSS)을 막는 것**이 핵심이에요. 현재 적용된 방어:
  - CSP: 우리 도메인과 허용한 CDN(jsdelivr·Daum 우편번호) 스크립트만 실행, 인라인 스크립트·`eval` 금지 (WASM만 허용)
  - 외부 라이브러리는 버전 고정 + SRI 해시 검사 (Daum 우편번호는 해시를 제공하지 않아 예외)
  - 사용자 글은 모두 `esc()`로 이스케이프한 뒤 화면에 넣어요
  - 액세스 토큰 유효 시간 1시간, 리프레시 토큰 회전 사용
- 더 강하게 하려면 서버(엣지 함수)를 두고 httpOnly 쿠키 세션으로 바꿔야 해요. 결제를 붙일 때 같이 검토해요.

## 5. 로고 사용처 (256)

로고는 세 가지예요. **메인 로고는 1번 물결 로고**예요. 파일은 `assets/brand/`에 있고, 사이트 `#brand` 화면에서도 내려받을 수 있어요.

| 로고 | 쓰는 곳 | 파일 |
|---|---|---|
| 1. 물결 (메인) | 홈페이지 머리말(밝은 화면), 문서, 공유 이미지, 앱 아이콘·파비콘(물결 심볼), 굿즈 기본 | logo-main.svg · logo-main-dark.svg · logo-main-stacked.svg · symbol-waves.svg |
| 2. 소나 (보조) | 홈페이지 머리말(어두운 화면), 남색 배경 굿즈 | logo-sonar-dark.svg · logo-sonar-light.svg · symbol-sonar.svg |
| 3. 뱃지 | 홈페이지 바닥글, 스티커·패치·인증 표시 등 뱃지형 굿즈 | badge.svg |

- 파일의 글자는 모두 아웃라인으로 바꿔 두어서 글꼴 없이 인쇄할 수 있어요. PNG는 투명 배경이에요(가로 로고 3000px, 뱃지 3000×3000px).
- 가로 로고는 높이 24px(인쇄 10mm) 아래로 줄이지 않아요. 그보다 작으면 심볼을 써요.
- 로고 둘레에 물결 한 줄 높이만큼 여백을 둬요. 색을 바꾸거나 늘리지 않아요.
- 로고를 다시 만들 때는 `tools/brand.py`를 실행해요.

## 6. 정기 자동 작업

- **매달 2일**: GitHub Actions `Monthly OSM dive centre refresh`가 OpenStreetMap에서 다이빙 센터를 다시 모아 `assets/sites.json`에 더해요. 기존 항목은 지우지 않아요. 저장소 Actions 탭에서 결과를 볼 수 있고, 수동 실행(Run workflow)도 돼요.
