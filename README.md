# YOU IN? 공식 홈페이지

친구와 함께하는 소셜 파티 게임 YouIN의 공개 소개, 개인정보처리방침, 사용자 지원 사이트입니다. 앱은 iOS / Android 출시 준비 중입니다.

- 공개 사이트: **https://haroldsoul.github.io/youin.github.io/**
- 공개 저장소: https://github.com/HaroldSoul/youin.github.io
- 정책: https://haroldsoul.github.io/youin.github.io/privacy/
- 지원: https://haroldsoul.github.io/youin.github.io/support/
- 영어: https://haroldsoul.github.io/youin.github.io/en/

저장소 이름이 `youin.github.io`여도 `https://youin.github.io`가 생기는 것은 아닙니다. 이 저장소는 `HaroldSoul` 계정의 **프로젝트 Pages 사이트**이며 기본 경로는 `/youin.github.io/`입니다.

## 구성과 관리

순수 HTML / CSS / JavaScript입니다. 패키지 설치, 프레임워크, 번들러, 빌드 명령은 필요하지 않습니다. 완성된 HTML을 그대로 배포합니다. 외부 폰트, 분석 도구, 광고 SDK를 홈페이지에서 불러오지 않습니다.

| 파일 | 역할 |
| --- | --- |
| `index.html`, `en/index.html` | 한국어 / 영어 홈페이지 |
| `privacy/index.html`, `en/privacy/index.html` | 정책 전문 (한·영 함께 수정) |
| `support/index.html`, `en/support/index.html` | FAQ 및 문의 안내 |
| `404.html` | 잘못된 중첩 주소에서도 동작하는 한·영 안내 |
| `assets/styles.css` | 색상 토큰, 레이아웃, 반응형, 접근성 |
| `assets/language.js` | 시스템 언어 및 저장된 선호 언어 선택 |
| `assets/site.js` | 언어 링크 및 문의 주소 설정 |
| **`assets/config.js`** | **승인된 지원 이메일을 설정하는 유일한 곳** |
| `assets/app-icon.svg`, `.png` | 사용자가 공개 사용을 승인한 앱 아이콘 |
| `assets/favicon-32.png`, `apple-touch-icon.png` | 앱 아이콘에서 크기 변환한 사이트 아이콘 |
| `assets/screenshots/` | 사용자가 제공한 실제 앱 화면 5장 (원본 비율 유지) |
| `assets/og-card.png` | 타이포그래피와 제공된 앱 스크린샷으로 구성한 1200 × 630 공유 이미지 |
| `sitemap.xml`, `robots.txt` | 공개 페이지 목록 및 크롤링 안내 |
| `.github/workflows/pages.yml` | `main` 푸시 시 GitHub Pages 배포 |

본문은 JavaScript 없이도 읽을 수 있습니다. KO/EN은 같은 페이지의 다른 언어로 이동합니다. 첫 방문은 영어 시스템 언어에 영어, 그 밖에는 한국어를 사용하며, 명시적으로 선택한 언어가 우선합니다. `?lang=ko` / `?lang=en`으로 링크의 언어를 고정할 수도 있습니다. 저장소 접근이 차단돼도 언어 링크는 작동합니다.

공개 사이트는 카메라 권한을 요청하지 않습니다. 홈페이지 언어 설정과 호스팅 요청 정보는 앱의 온디바이스 카메라 처리와 별개입니다. 광고 및 UMP는 **앱 출시 시 도입 예정**으로 표시합니다. 앱 기능/SDK가 변경되면 정책, FAQ, 스토어 개인정보 공개 내용과 함께 확인하고 날짜를 갱신하세요.

## 지원 이메일 변경

`assets/config.js`의 `supportEmail: ''`에 **승인된 공개 지원 이메일**만 입력합니다. 모든 문의 버튼과 문의 안내가 이메일로 전환됩니다. 현재 값은 비어 있고 임시 창구는 공개 GitHub Issues입니다. JavaScript가 꺼진 환경에는 공개 이슈 링크를 계속 대체 창구로 제공합니다. 개인 이메일은 포함하지 않았습니다. 이메일 주소를 바꾸는 데 다른 HTML 파일 수정은 필요하지 않습니다.

문의는 공개될 수 있다는 점과 얼굴 사진·민감정보를 올리지 말라는 안내를 유지하세요. 이슈 작성에는 GitHub 계정이 필요합니다.

## 로컬 확인

저장소 폴더에서 다음을 실행하고 `http://localhost:8000/`을 엽니다.

```sh
python3 -m http.server 8000
```

프로젝트 경로를 재현하려면 이 공개 저장소만 임시 폴더 아래 `youin.github.io` 이름으로 연결합니다. 비공개 앱 저장소를 서버 루트에 넣지 마세요.

```sh
preview_dir=$(mktemp -d)
ln -s "$PWD" "$preview_dir/youin.github.io"
python3 -m http.server 8001 --directory "$preview_dir"
```

`http://localhost:8001/youin.github.io/`에서 확인합니다. 기본 Python 서버는 미등록 경로에 사용자 정의 404를 적용하지 않으므로 `404.html`을 직접 확인하고, 실제 배포에서는 존재하지 않는 중첩 경로로 404 상태/문서/링크를 검증합니다.

## 배포

1. 홈페이지 파일을 수정하고 로컬에서 모바일·데스크톱, 한국어·영어, 정책·지원, 키보드와 링크를 확인합니다.
2. `main`에 커밋하고 push합니다.
3. GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정합니다.
4. `Deploy official website to GitHub Pages` 워크플로 성공과 실제 공개 URL을 확인합니다.

워크플로는 `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll`, `assets/`, `privacy/`, `support/`, `en/`만 배포합니다. 향후 `CNAME` 또는 실제 `app-ads.txt`가 있으면 포함합니다. README, 문서, 예제 파일, 로컬 캡처는 배포 아티팩트에서 제외합니다. 공개 Git 저장소에 커밋한 파일 자체는 누구나 볼 수 있으므로 비밀키·개인정보·미승인 자산을 커밋하지 마세요.

## AdMob: 아직 인증 완료가 아닙니다

실제 Publisher ID가 아직 없으므로 **최종 `app-ads.txt`는 게시하지 않았습니다.** `app-ads.txt.example`은 형식 안내이며 인증 파일이 아닙니다.

```text
google.com, pub-발급받은번호, DIRECT, f08c47fec0942fa0
```

`pub-발급받은번호`를 AdMob 계정의 실제 `pub-...` 값으로 바꿔야 합니다. 앱 ID (`ca-app-pub-...~...`)나 광고 단위 ID가 아닙니다.

현재 사이트 hostname은 `haroldsoul.github.io`입니다. AdMob이 개발자 웹사이트에서 일반적으로 확인할 위치는 **https://haroldsoul.github.io/app-ads.txt**입니다. **https://haroldsoul.github.io/youin.github.io/app-ads.txt 만 만들면 hostname 루트의 인증을 해결한 것이 아닙니다.**

최종 설정에는 다음 중 하나가 필요합니다.

1. **YouIN 전용 커스텀 도메인**을 이 저장소에 연결하고 그 도메인 루트 `/app-ads.txt`에 제공합니다.
2. **HaroldSoul 계정 루트 Pages 사이트**(일반적으로 별도의 `HaroldSoul/HaroldSoul.github.io` 저장소)에서 `/app-ads.txt`를 제공합니다. 이 홈페이지 저장소의 프로젝트 경로와 별개로 설정해야 합니다.

이 작업에서는 다른 계정 루트 사이트나 DNS를 수정하지 않습니다. 공식 참고: [AdMob app-ads.txt 설정](https://support.google.com/admob/answer/9363762?hl=en).

### Publisher ID와 도메인 결정 후 체크리스트

- [ ] AdMob에서 실제 `pub-...`를 받아 예제의 해당 값만 교체한다.
- [ ] 전용 커스텀 도메인 또는 계정 루트 Pages 중 제공 위치를 확정한다.
- [ ] 그 hostname의 루트 `/app-ads.txt`를 익명 HTTP 요청으로 확인한다. 응답은 200, 본문은 텍스트여야 한다.
- [ ] App Store / Google Play의 개발자 웹사이트를 해당 도메인으로 설정하고 반영을 확인한다.
- [ ] AdMob에서 크롤링/인증 상태를 확인한다. 웹파일 게시와 AdMob 인증 완료를 구분한다.
- [ ] 실제 광고 SDK, UMP 화면, 연령 설정과 정책·스토어 공개 내용을 대조한 후 출시한다.

## 커스텀 도메인으로 이전할 때

GitHub Pages의 Custom domain과 DNS를 설정한 뒤 HTTPS를 활성화합니다. [GitHub 공식 안내](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)를 따르고, HTTPS 공개 응답을 검증하세요.

일반 페이지의 내부 링크, 언어 링크, 자산 참조는 상대 경로이므로 도메인 루트에서도 동작합니다. 다음 절대 URL은 함께 갱신해야 합니다.

- 각 HTML의 canonical, `og:url`, `og:image`
- `sitemap.xml`의 모든 URL과 `robots.txt`의 Sitemap URL
- `404.html`의 기본 `<base href="/youin.github.io/">`를 `/`로 변경 (JavaScript 비활성 환경까지 지원). 현재 스크립트도 커스텀 hostname의 루트를 자동 인식합니다.
- 이 README의 공개 URL과 스토어 개발자 웹사이트
- 선택한 실제 도메인 루트의 `app-ads.txt`

프로젝트 Pages의 `robots.txt`는 준비되어 있지만 크롤러의 표준 robots 규칙 조회 위치는 hostname 루트입니다. 현재 계정 루트의 robots 설정은 이 프로젝트가 제어하지 않으며, 사이트맵은 위 공개 URL로 직접 제출할 수 있습니다. 전용 도메인 연결 후에는 이 저장소의 `robots.txt`가 hostname 루트에서 제공됩니다.

## 자산 및 저장소 경계

비공개 앱 저장소는 수정하지 않습니다. 공개 사용이 승인된 앱 아이콘과 사용자가 후속 요청에서 홈페이지 사용을 지시한 스크린샷 5장을 사용합니다. 다운로드 폴더의 `ui-screenshots-2026-09-21-8664300`에서 홈, 딱 걸렸어 진입, 라스트 킥 결과, 누가 더? 안내, 펀치 킹 준비 화면을 원본 그대로 복사했습니다. 사진 선택 테스트용 fixture 화면, 개발 파일 및 앱 Git 기록은 포함하지 않습니다. 사용자가 제공한 화면에 포함된 게임 비주얼 외에 별도 인물·얼굴 사진을 추가하지 않습니다. 기존 추상 카드와 문 그래픽은 제거했습니다. `assets/screenshots/`의 PNG는 390 × 844 원본이며 클릭하면 새 탭에서 크게 볼 수 있습니다.

화면 캡처는 로컬 `output/playwright/`에 저장하며 Git에서는 제외합니다. 검증 기록은 `docs/verification.md`에 정리합니다.
