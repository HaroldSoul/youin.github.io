# Homepage game motion assets

These muted clips were exported from the YouIN app at remote `develop` commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78` for the official homepage on 2026-09-27. Who More? was recaptured in Korean and English on 2026-09-29 with Doyun selected as the judge. The verified source package is `homepage-current-2026-09-27-1cd8cad/homepage-ready.zip`; it supersedes the earlier `ui-screenshots-2026-09-27` and `homepage-motion-2026-09-27` packages.

Each clip plays once when its homepage scene becomes active and holds on the final frame. Korean videos use their final-frame PNG as the video poster. English videos use a matching `*-start.webp` first-frame poster so playback starts without swapping from the final result to the opening frame. The linked PNG remains the final decoded video frame.

| Game | File | Duration | SHA-256 |
| --- | --- | ---: | --- |
| Caught You | `caught-you.mp4` | 5.0 s | `2d157fec4383746b299549cd7d80eca920adb5cb99330e444b9aeb8c4172e6a5` |
| Who More? | `who-more.mp4` | 7.5 s | `e9587caae06547dda3ce0e2c5a76f5fcd920138fcbd342a2209bb156bdc9b70e` |
| Punch King | `punch-king.mp4` | 8.0 s | `a1bffa7f73a28118895d13d2a56fae95aa0e6c4897091514e2caa1ad17019922` |
| Overflow | `overflow.mp4` | 6.67 s | `57e55abc89c2425add393db6fdda8590b82c74605eca2672d8c3ebfe68798481` |

All four files are 390 × 844, 30 fps, H.264 High Profile, `yuv420p`, fast-start MP4 files without audio.

## English Overflow correction

The English resource pack at `resources/homepage-english-2026-09-28/homepage-ready.zip` contained one Korean UI frame in `overflow-en.mp4` (decoded frame 13, about 0.4 s). The website copy replaces that frame with the following English frame and re-encodes the clip. The duration, 390 × 844 size, 30 fps, H.264 High profile, and silent audio state are preserved. `assets/screenshots/overflow-en.png` is re-extracted from the corrected clip's final frame so it remains pixel-identical to the linked final image.

| File | SHA-256 |
| --- | --- |
| `assets/motion/overflow-en.mp4` | `1840a865eea980afe229aec2194add4484e288d7f5f869c16942ff1a6a903ea3` |
| `assets/screenshots/overflow-en.png` | `a9e2ce3bbf85fb3d0080935898aba12567eb0329f95e6e6c8fafe635f947c858` |

## Who More? Doyun recapture

Both locales were captured from the same pinned Godot app commit using the in-app Who More? screen. The discovery scene selects Doyun, and the question remains `누가 더 예뻐?` / `Who is prettier?`. The capture scripts and neutral photo backend change only the capture flow; no production app files changed.

| Locale | File | SHA-256 |
| --- | --- | --- |
| Korean | `assets/motion/who-more.mp4` | `e9587caae06547dda3ce0e2c5a76f5fcd920138fcbd342a2209bb156bdc9b70e` |
| Korean final-frame PNG | `assets/screenshots/who-more.png` | `691173ed5f113326470995d49f227308f4f2196167e432ea398d3132e24372ce` |
| English | `assets/motion/who-more-en.mp4` | `9ae29f4a444b769862648afcbd35f8fa1f9deb7a5321d51f68bd9b93d07a10cd` |
| English final-frame PNG | `assets/screenshots/who-more-en.png` | `8874b6bff52827585c7152090faeffc9de2e58da38780b135883f5ff4fb4ea58` |
| English first-frame WebP poster | `assets/screenshots/who-more-en-start.webp` | `116c3cba0a3a8d130575a7436b5ae6c6f74a8f73cde576b8bc1d448f723b86ea` |

Both videos are 390 × 844, 30 fps, 225 frames, 7.5 seconds, H.264 High Profile, `yuv420p`, and have no audio. Full decode passed. Each PNG final poster is pixel-identical to its video's last frame; the English WebP poster comes from its first decoded frame. Both locale captures were played through at normal speed to confirm the Doyun result and localized question.

Last Kick remains a verified static screenshot. The current result catalog has no approved result clip, so its fallback video is excluded from the public website. Punch King uses the implemented current game screen and motion; the captured simulator result accurately retains the in-app notice that device verification was unavailable and the record was not saved.
