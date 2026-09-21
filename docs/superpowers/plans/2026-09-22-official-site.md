# YouIN official website implementation plan

Approved brief: the owner's full request on 2026-09-22. This is a new public static site for app registration, privacy information, and support. The requested design and deployment steps are already authorized.

Architecture: independent Korean and English HTML documents, shared CSS and small progressive-enhancement scripts. No framework, build step, runtime dependencies, analytics, or external fonts. Relative paths support both a project subdirectory and a domain root. The approved app icon is the only asset copied from the app repository.

- [x] Implement home, privacy, support and a self-contained language-aware 404; add metadata, icons, robots and sitemap.
- [x] Document support configuration, future advertising setup and deployment. Publish only an explicit allowlist of public files through Pages Actions.
- [x] Serve locally at root and under /youin.github.io/. Verify desktop/mobile layouts, both languages, links, keyboard use, reduced motion, blocked storage, no JavaScript, unknown nested paths, assets and browser errors.
- [ ] Commit and push main, enable Pages, inspect the successful deployment, and rerun browser checks on the public URL.

Review focus: automatic language redirects must not override an explicit choice; nested 404 assets must resolve; release plans must not be written as deployed features; website hosting metadata must be distinguished from on-device camera processing; no private app content or invented publisher ID may be published.
