# YouIN homepage English resource pack

English homepage assets from app commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78`. Who More? was recaptured on 2026-09-29 with male NPC Doyun selected; the question remains `Who is prettier?`. Other assets retain their original capture date.

## Contents

- Six Godot scene screenshots/posters with English UI: `assets/screenshots/*-en.png`
- Four normal-speed muted videos: `assets/motion/*-en.mp4`
- `capture-manifest.json` with file hashes, source commit, and technical QA

All public assets are 390 × 844. The four videos are H.264 30 fps, play once, and end on a frame identical to their matching PNG poster. Last Kick has only a static screenshot because the pinned game has no approved result clip.

## Website integration

Copy the `assets/` files into the website repository without overwriting the Korean assets. In `en/index.html`, replace each screenshot and motion reference with the matching `-en` filename. Keep `index.html` on the Korean filenames. The six screenshot slugs are `home`, `caught-you`, `who-more`, `last-kick`, `punch-king`, and `overflow`; the four motion slugs are all except `home` and `last-kick`. Preserve the site's motion-reduction poster behavior.

The large QA capture set and capture scripts remain in the app workspace. This package's `qa_screenshot_files` lists the original 2026-09-28 broad capture set; `recaptures` records the later Who More? public media. The latest Korean and English website resources and Doyun start poster are in `assets/` at the site root. The English Who More? video is muted and fully decodes to 225 frames at 30 fps; its PNG final poster is pixel-identical to the final frame.

The pinned Overflow UI and two Last Kick fallback labels lack English runtime copy. Their text is translated by the capture adapter for these website assets; the app's runtime localization is a separate task. Motion and game outcomes remain from the original Godot scenes.
