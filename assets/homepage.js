(() => {
  "use strict";
  if (!document.body.classList.contains("home-page")) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videos = [...document.querySelectorAll("video")];
  const tabs = [...document.querySelectorAll("[data-game]")];
  const panels = new Map([...document.querySelectorAll(".game-panel")].map((panel) => [panel.id, panel]));
  const visibleVideos = new Map();
  const playbackIntent = new WeakMap();
  const managedPlays = new WeakSet();
  const managedPauses = new WeakSet();
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  let activeGame = null;

  const pauseVideo = (video) => {
    if (video.paused) return;
    if (video.controls) managedPauses.add(video);
    video.pause();
  };

  const syncVideos = () => {
    videos.forEach((video) => {
      const panel = video.closest(".game-panel");
      const visible = visibleVideos.get(video) && (!panel || !panel.hidden);
      const intent = playbackIntent.get(video);
      if (!visible || (reducedMotion.matches && intent !== "playing") || document.hidden) {
        pauseVideo(video);
      } else if (video.paused && intent !== "paused") {
        if (video.controls) managedPlays.add(video);
        video.play().catch((error) => {
          // An interrupted play still dispatches its queued play event.
          if (error.name !== "AbortError") managedPlays.delete(video);
          // Native controls remain available when autoplay is blocked.
        });
      }
    });
  };

  // The main hero screen loops the reaction portion of the original clip.
  // Gallery videos retain their complete playback sequence.
  videos.forEach((video) => {
    if (video.controls) {
      // Visibility changes must not overwrite a choice made with native controls.
      video.addEventListener("play", () => {
        if (!managedPlays.delete(video)) playbackIntent.set(video, "playing");
      });
      video.addEventListener("pause", () => {
        if (!managedPauses.delete(video)) playbackIntent.set(video, "paused");
      });
    }
    const start = Number(video.dataset.motionStart);
    if (!Number.isFinite(start) || start <= 0) return;
    const seekToStart = () => {
      if (Number.isFinite(video.duration) && video.duration > start) video.currentTime = start;
    };
    video.addEventListener("loadedmetadata", seekToStart);
    if (video.readyState >= 1) seekToStart();
    video.addEventListener("ended", () => {
      seekToStart();
      syncVideos();
    });
  });

  const clearPanelMotion = () => {
    if (!gsap) return;
    const children = [...panels.values()].flatMap((panel) => [...panel.children]);
    gsap.killTweensOf(children);
    gsap.set(children, {clearProps: "opacity,transform"});
  };

  const selectGame = (id, {focus = false, updateUrl = false, animate = true} = {}) => {
    const panel = panels.get(id);
    if (!panel) return;
    if (updateUrl) {
      const url = new URL(location.href);
      url.hash = id;
      history.replaceState(null, "", url);
    }
    if (activeGame !== id) {
      clearPanelMotion();
      activeGame = id;
      panels.forEach((item) => { item.hidden = item !== panel; });
      if (gsap && animate && !reducedMotion.matches) {
        gsap.fromTo(panel.children, {opacity: .35, x: 16}, {
          opacity: 1, x: 0, duration: .32, ease: "power2.out",
          clearProps: "opacity,transform", overwrite: true
        });
      }
      syncVideos();
    }
    tabs.forEach((tab) => {
      const selected = tab.dataset.game === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
  };

  const fragmentId = () => {
    try {
      const id = decodeURIComponent(location.hash.slice(1));
      return id === "caught-story" ? "intro" : id;
    }
    catch (_) { return ""; }
  };
  const alignFragment = () => {
    const id = fragmentId();
    if (panels.has(id)) selectGame(id, {animate: false});
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({block: "start", behavior: "instant"});
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectGame(tab.dataset.game, {updateUrl: true}));
    tab.addEventListener("keydown", (event) => {
      let target;
      if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") target = 0;
      if (event.key === "End") target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      selectGame(tabs[target].dataset.game, {focus: true, updateUrl: true});
    });
  });
  selectGame(panels.has(fragmentId()) ? fragmentId() : tabs[0]?.dataset.game, {animate: false});
  window.addEventListener("hashchange", alignFragment);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibleVideos.set(entry.target, entry.isIntersecting && entry.intersectionRatio > .2));
      syncVideos();
    }, {threshold: [0, .2, .5]});
    videos.forEach((video) => observer.observe(video));
  }
  const onMotionPreference = () => {
    clearPanelMotion();
    videos.forEach((video) => {
      if (playbackIntent.get(video) === "playing") playbackIntent.delete(video);
    });
    syncVideos();
  };
  if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", onMotionPreference);
  else reducedMotion.addListener(onMotionPreference);
  document.addEventListener("visibilitychange", syncVideos);
  window.addEventListener("pagehide", () => videos.forEach(pauseVideo));
  window.addEventListener("pageshow", syncVideos);

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)", mobile: "(max-width: 767px)",
      motion: "(prefers-reduced-motion: no-preference)",
      // Short mobile viewports keep the static stage's minimum height so copy clears the screen fan.
      tall: "(min-width: 768px) and (min-height: 561px), (max-width: 767px) and (min-height: 800px)"
    }, (context) => {
      if (!context.conditions.motion || !context.conditions.tall) return;
      const mobile = context.conditions.mobile;
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"));
      document.documentElement.classList.add("motion-enabled");
      const heroStage = document.querySelector(".hero-stage");
      const lineup = document.querySelector(".hero-lineup");
      // CSS sticky holds the stage. Only the visual follows scroll; wheel input stays native.
      const hero = gsap.timeline({scrollTrigger: {
        trigger: ".hero-track", start: `top ${navHeight}px`, end: "bottom bottom",
        scrub: .32, invalidateOnRefresh: true
      }});
      hero.to(".hero-copy", {y: -80, autoAlpha: 0, duration: .45, ease: "none"}, .02);
      document.querySelectorAll(".hero-screen").forEach((screen) => {
        const index = Number(screen.dataset.position);
        hero.fromTo(screen, {
          xPercent: -50,
          x: () => index * (mobile ? Math.min(innerWidth * .34, 150) : innerWidth * .16),
          y: Math.abs(index) * 22, rotation: index * 5,
          scale: 1 - Math.abs(index) * .08, autoAlpha: 1
        }, {
          x: () => index ? index * innerWidth * .5 : (mobile ? 0 : innerWidth * .2),
          y: () => {
            if (index) return 35;
            const baseCenter = lineup.offsetTop + screen.offsetHeight / 2;
            return heroStage.offsetHeight * (mobile ? .66 : .55) - baseCenter;
          },
          rotation: 0,
          scale: () => index ? .82 : heroStage.offsetHeight * (mobile ? .55 : .82) / screen.offsetHeight,
          autoAlpha: index ? 0 : 1, duration: .7, ease: "none"
        }, .08);
      });
      hero.fromTo(".hero-focus", {autoAlpha: 0, y: 25}, {autoAlpha: 1, y: 0, duration: .28, ease: "none"}, .55)
        .to({}, {duration: .18}, .83);

      document.querySelectorAll(".story-track").forEach((section) => {
        const story = gsap.timeline({scrollTrigger: {
          trigger: section, start: `top ${navHeight}px`, end: mobile ? "top -25%" : "bottom bottom",
          scrub: .32, invalidateOnRefresh: true
        }});
        story.fromTo(section.querySelector(".story-copy"), {y: 28}, {
          y: 0, duration: .3, ease: "none"
        }, 0);
        story.fromTo(section.querySelector(".story-visual"), {
          scale: .96
        }, {
          scale: 1, duration: 1, ease: "none"
        }, 0);
      });

      gsap.from(".gallery-surface", {
        y: 35, opacity: .55, duration: .7, ease: "power2.out",
        scrollTrigger: {trigger: ".gallery-surface", start: "top 88%", once: true}
      });
      return () => { document.documentElement.classList.remove("motion-enabled"); };
    });
    window.addEventListener("load", () => ScrollTrigger.refresh(), {once: true});
  }
  // Reveal hidden linked panels before aligning the native fragment with the final layout.
  if (location.hash) requestAnimationFrame(alignFragment);
})();
