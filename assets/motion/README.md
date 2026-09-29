# Homepage game motion assets

These muted clips were exported from the YouIN app at remote `develop` commit `1cd8cad88aa6798aaa46dd02c1758b2ba16bbb78` for the official homepage on 2026-09-27. The verified source package is `homepage-current-2026-09-27-1cd8cad/homepage-ready.zip`; it supersedes the earlier `ui-screenshots-2026-09-27` and `homepage-motion-2026-09-27` packages.

Each clip plays once when its homepage scene becomes active and holds on the final frame. The matching PNG in `assets/screenshots/` is both the video poster and the no-motion fallback. Each poster is pixel-identical to the last decoded video frame.

| Game | File | Duration | SHA-256 |
| --- | --- | ---: | --- |
| Caught You | `caught-you.mp4` | 5.0 s | `2d157fec4383746b299549cd7d80eca920adb5cb99330e444b9aeb8c4172e6a5` |
| Who More? | `who-more.mp4` | 7.5 s | `38f75ac591eac1313bd2904e0ceb70a2ac42ded31d552a6519d36c4872c33c99` |
| Punch King | `punch-king.mp4` | 8.0 s | `a1bffa7f73a28118895d13d2a56fae95aa0e6c4897091514e2caa1ad17019922` |
| Overflow | `overflow.mp4` | 6.67 s | `57e55abc89c2425add393db6fdda8590b82c74605eca2672d8c3ebfe68798481` |

All four files are 390 × 844, 30 fps, H.264 High Profile, `yuv420p`, fast-start MP4 files without audio.

## English Overflow correction

The English resource pack at `resources/homepage-english-2026-09-28/homepage-ready.zip` contained one Korean UI frame in `overflow-en.mp4` (decoded frame 13, about 0.4 s). The website copy replaces that frame with the following English frame and re-encodes the clip. The duration, 390 × 844 size, 30 fps, H.264 High profile, and silent audio state are preserved. `assets/screenshots/overflow-en.png` is re-extracted from the corrected clip's final frame so it remains pixel-identical to the poster.

| File | SHA-256 |
| --- | --- |
| `assets/motion/overflow-en.mp4` | `1840a865eea980afe229aec2194add4484e288d7f5f869c16942ff1a6a903ea3` |
| `assets/screenshots/overflow-en.png` | `a9e2ce3bbf85fb3d0080935898aba12567eb0329f95e6e6c8fafe635f947c858` |

Last Kick remains a verified static screenshot. The current result catalog has no approved result clip, so its fallback video is excluded from the public website. Punch King uses the implemented current game screen and motion; the captured simulator result accurately retains the in-app notice that device verification was unavailable and the record was not saved.
