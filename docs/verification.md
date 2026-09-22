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
