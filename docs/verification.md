# Website verification — 2026-09-22

> Current media baseline: app `develop` commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78`. The final section in this document supersedes the earlier September 27 asset notes, which remain as deployment history.

## Local pre-deployment checks

Verified the static site with a loopback-only server serving this public repository. Both a domain root and the `/youin.github.io/` project prefix were exercised.

- Chromium (real Chrome via Playwright): all six Korean/English home, privacy and support pages at widths 320, 390 and 1440. HTTP 200, one primary heading, loaded images, no horizontal overflow.
- Static document audit: 148 relative file references and fragment links resolved; no duplicate IDs; sitemap XML parsed.
- Browser checks: 19 unique internal page/asset URLs responded with HTTP 200; no JavaScript exceptions or missing assets.
- Language checks: English, Korean and other system locales; explicit KO/EN selection; language preference across pages; same-page anchor preserved; switching with localStorage blocked.
- No JavaScript: all six documents readable; native FAQ expansion usable.
- Keyboard: skip link transfers focus into main content; FAQ responds to Enter and Space.
- Reduced motion: smooth scrolling disabled. Reflow checked at the viewport equivalent of 200% desktop zoom.
- 404: direct document and unknown nested paths; expected 404 HTTP status for unknown paths; working logo/home/asset paths.
- Support configuration: a local, intercepted test configuration confirmed one approved email value changes all four policy/support contact blocks without editing HTML. Test value is not in production configuration.
- axe-core WCAG 2 A/AA and WCAG 2.1 AA rules: all seven documents at desktop/mobile widths, FAQs expanded, **zero reported violations** after fixes. Automated checks do not replace a complete human accessibility audit.
- Visual inspection: Korean/English home, privacy and support layouts, favicon and 1200 × 630 Open Graph image. Desktop/mobile captures are in ignored `output/playwright/`.
- JavaScript syntax checks passed for the three shared scripts.
- Approved app icon copies matched their source bytes. No face images, private fixtures, private Git history, support email or publisher ID were introduced.

Resolved during verification: explicit keyboard focus target for skip links and a policy-document link color rule that overrode the contact button text color.

## Repeating checks

Use the local-preview commands in README. Open all six language routes and an unknown nested URL after deployment. Inspect console/network errors, switch languages, use Tab/Enter/Space, expand FAQs, and test at desktop and narrow mobile widths. If changing contact settings, verify the policy and support pages in both languages. Keep screenshots and temporary testing packages out of Git.

The initial commit records local verification. Deployment status and the live URL are available in the repository’s GitHub Actions and Pages environments; live verification is reported separately after publication.

## Screenshot replacement — 2026-09-22

The owner supplied app screenshots in Downloads and requested replacement of the abstract graphics. The home preview, four game graphics and social image now use those supplied screens. The source mapping and original SHA-256 values are recorded in `screenshot-sources.json`; all five PNG copies match the originals byte for byte. The photo-selection fixture screens were excluded.

After the replacement, Chromium checks passed on all six language pages at 320, 390 and 1440 pixels: no horizontal overflow, JavaScript errors or missing images. All 24 internal URLs returned 200. Language switching, keyboard navigation, FAQ, reduced motion, no-JavaScript pages and nested 404 checks passed. The screenshot links open the original PNGs in a new tab; root-domain paths also passed in both languages.

axe-core returned zero WCAG A/AA rule violations across the seven documents at desktop and mobile widths. Desktop, mobile hero and mobile game captures were visually inspected. Stylesheet and Open Graph URL query versions were updated so returning visitors can fetch the replacement artwork. Deployment is verified separately after pushing this revision.

## Overflow game and latest app screens — 2026-09-27

The owner supplied the app's `output/ui-screenshots-2026-09-27/homepage-picks/` review page and approved its latest in-game screens for the public site. The home and Last Kick images use those picks; Caught You, Who More? and Overflow (`간당간당`) use the exact final-frame posters from the verified motion package. Punch King has no implemented gameplay scene or current capture, so the older screenshot was removed and the section now states that it is in development. The private app repository was read only and was not modified.

The Korean and English home pages now contain nine full-page scenes, five verified app images, and a non-interactive Punch King coming-soon panel. The privacy policy was updated for Overflow's optional on-device microphone level processing and nearby play, with a September 27, 2026 revision date.

Chromium checks passed for all six Korean/English home, privacy and support pages at 1440, 390 and 320 pixels. All 26 internal page and asset URLs returned 200; direct and nested 404 behavior, language switching, keyboard controls, reduced motion, blocked storage, no-JavaScript reading and 200% zoom-equivalent reflow passed. No JavaScript errors, missing images, horizontal overflow or axe-core WCAG A/AA violations were reported. Desktop and mobile captures of the first scene, updated game scenes, Overflow and privacy pages were visually inspected. Live deployment is verified separately after merging to `main`.

## Game motion — 2026-09-27

The owner supplied a verified motion package from the current Godot workspace. Caught You, Who More? and Overflow now use 390 × 844 muted H.264 clips that play once when their scene becomes active and hold on the final frame. Their exact final-frame PNGs replace the earlier posters. Inactive clips pause and reset, only the active scene plays, and `prefers-reduced-motion: reduce` keeps all clips on their static posters.

Last Kick remains static because the supplied package marked its clip blocked: the ball begins moving before visible boot contact. Punch King has no current gameplay scene, so its older screenshot was removed and replaced by the coming-soon panel. Neither excluded clip was copied into the public repository.

## App shape alignment — 2026-09-27

The website now maps the app's current control scale directly: 6 px for small controls, 10 px for cards and mode controls, 12 px for primary controls and panels, and 23 px for popup-style pills. Primary website actions use the app's left-label/right-arrow composition. The old Punch King capture was removed because it is absent from the current app workspace; the section is clearly labeled as in development.

The motion behavior test was observed failing before implementation with zero motion videos, then passing after the change in Korean and English. Chromium and WebKit both played the active muted inline clip without page errors. All three MP4 copies match their source bytes, decode fully, contain no audio tracks and use H.264 High Profile, `yuv420p`, 30 fps. Local Chromium checks passed for all six language pages at 1440, 390 and 320 pixels, 27 internal URLs, language and keyboard flows, nested 404 behavior, no-JavaScript reading, reduced motion and 200% zoom-equivalent reflow. Axe-core reported zero WCAG A/AA violations at desktop and mobile widths. Mid-motion mobile captures for Caught You and Who More? and a desktop Overflow capture were visually inspected.

## Game request Google Form — 2026-09-27

The Korean and English homepage buttons open the same bilingual Google Form. The destination uses the published responder URL, opens in a new tab, and does not expose submissions as public GitHub Issues. The obsolete Korean and English game request Issue Forms were removed. Blank GitHub Issues remain available for general support requests.

## Current app media correction — 2026-09-27

The public media was replaced from `homepage-current-2026-09-27-1cd8cad/homepage-ready.zip`, captured from a clean worktree at verified remote `develop` commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78`. This package supersedes the earlier `ui-screenshots-2026-09-27` and `homepage-motion-2026-09-27` outputs. The ZIP inventory was restricted to its handoff, README, manifest, six PNG files and four MP4 files. Every copied file matches the byte count and SHA-256 recorded in `capture-manifest.json`.

The Korean and English home pages now show all six approved current images: the app home plus Caught You, Last Kick, Who More?, Punch King and Overflow. Punch King is implemented in the current app, so its temporary coming-soon panel was removed and replaced with its verified result motion. Last Kick remains a current static result because the package contains no approved result clip for public use.

The four public MP4 files are 390 × 844 H.264 High Profile, `yuv420p`, 30 fps, muted and fast-start. Full frame counts are 150, 225, 240 and 200 for Caught You, Who More?, Punch King and Overflow respectively. Independent decoding confirmed that each final frame is pixel-identical to its PNG poster. Browser checks confirmed that only the active scene plays, Punch King reaches and holds its final frame, inactive scenes reset, and reduced-motion mode leaves videos on their posters.

Website actions now use the current app control geometry: 52 px controls use a 26 px radius and the compact language control uses a 24 px radius. The obsolete arrow divider and the 4 px privacy CTA override were removed. Cards and media keep their separate 10 px and 22 px radii. Overflow's in-app 25 px primary and 10 px secondary controls remain unchanged inside the approved capture.

Local Chrome checks passed across all six Korean and English routes at 1440, 390 and 320 pixels. Twenty-six internal URLs returned 200; language switching, keyboard controls, nested 404 behavior, JavaScript-disabled reading, reduced motion and 200%-zoom-equivalent reflow passed without console errors, missing assets or horizontal overflow. Axe-core reported zero WCAG A/AA violations across all seven documents at desktop and mobile widths. The desktop hero and desktop/mobile Punch King motion were visually inspected.

## Bug report form — 2026-09-28

The Korean and English support pages use the same published Google Form for short bug reports. The form URL is managed in `assets/config.js` and is also present as the no-JavaScript fallback. The primary action opens the form in a new tab; privacy and other inquiries continue to use the separately configured support channel or a future approved support email. The privacy policy now describes the optional issue, device, and contact information submitted through Google Forms and identifies Google Forms as a third-party service.

The published form returned HTTP 200 and exposed four questions with only the location and issue description required; the device and contact fields are optional. Submission is available without forced authentication. Local Chrome checks passed across all six Korean and English routes at 1440, 390, and 320 pixels, including the form destination, no-JavaScript fallback, future support-email override, internal links, language switching, keyboard controls, and nested 404 behavior. No console errors, missing assets, horizontal overflow, or axe-core WCAG A/AA violations were reported.

## 2026-09-29 Who More? recapture

Recaptured the Korean and English Who More? public media from app commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78`, selecting male NPC Doyun while keeping the `pretty` question (`누가 더 예뻐?` / `Who is prettier?`). Replaced both MP4s and final PNG posters, plus the English first-frame WebP poster. The two clips are 390 × 844, 30 fps, 225 frames, 7.5 seconds, H.264 High Profile and silent; both fully decode and their final PNGs match the last video frame pixel-for-pixel. Both locale videos were watched through at normal speed and reach Doyun's result screen.
