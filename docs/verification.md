# Website verification — 2026-09-22

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

The owner supplied the app's `output/ui-screenshots-2026-09-27/homepage-picks/` review page and approved its latest in-game screens for the public site. The home, Caught You, Who More? and Last Kick images were replaced with those picks, and the new Overflow (`간당간당`) screen was added as a fifth game. Punch King continues to use its previously approved screen because the latest review set does not contain a replacement. The private app repository was read only and was not modified.

The Korean and English home pages now contain nine full-page scenes and five linked game screenshots. The privacy policy was updated for Overflow's optional on-device microphone level processing and nearby play, with a September 27, 2026 revision date.

Chromium checks passed for all six Korean/English home, privacy and support pages at 1440, 390 and 320 pixels. All 26 internal page and asset URLs returned 200; direct and nested 404 behavior, language switching, keyboard controls, reduced motion, blocked storage, no-JavaScript reading and 200% zoom-equivalent reflow passed. No JavaScript errors, missing images, horizontal overflow or axe-core WCAG A/AA violations were reported. Desktop and mobile captures of the first scene, updated game scenes, Overflow and privacy pages were visually inspected. Live deployment is verified separately after merging to `main`.

## Game motion — 2026-09-27

The owner supplied a verified motion package from the current Godot workspace. Caught You, Who More? and Overflow now use 390 × 844 muted H.264 clips that play once when their scene becomes active and hold on the final frame. Their exact final-frame PNGs replace the earlier posters. Inactive clips pause and reset, only the active scene plays, and `prefers-reduced-motion: reduce` keeps all clips on their static posters.

Last Kick remains static because the supplied package marked its clip blocked: the ball begins moving before visible boot contact. Punch King remains static because the current app workspace has no implemented gameplay scene. Neither excluded clip was copied into the public repository.

The motion behavior test was observed failing before implementation with zero motion videos, then passing after the change in Korean and English. Chromium and WebKit both played the active muted inline clip without page errors. All three MP4 copies match their source bytes, decode fully, contain no audio tracks and use H.264 High Profile, `yuv420p`, 30 fps. Local Chromium checks passed for all six language pages at 1440, 390 and 320 pixels, 27 internal URLs, language and keyboard flows, nested 404 behavior, no-JavaScript reading, reduced motion and 200% zoom-equivalent reflow. Axe-core reported zero WCAG A/AA violations at desktop and mobile widths. Mid-motion mobile captures for Caught You and Who More? and a desktop Overflow capture were visually inspected.
