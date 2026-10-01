(() => {
  "use strict";
  if (!document.body.classList.contains("home-page")) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videos = [...document.querySelectorAll("video")];
  const tabs = [...document.querySelectorAll("[data-game]")];
  const panels = new Map([...document.querySelectorAll(".game-panel")].map((panel) => [panel.id, panel]));
  const visibleVideos = new Map();
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  let activeGame = null;

  const syncVideos = () => {
    videos.forEach((video) => {
      const panel = video.closest(".game-panel");
      const visible = visibleVideos.get(video) && (!panel || !panel.hidden);
      if (!visible || reducedMotion.matches || document.hidden) {
        video.pause();
      } else if (video.paused) {
        video.play().catch(() => { /* A blocked autoplay keeps the native poster. */ });
      }
    });
  };

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
      // Existing links to the former feature lead to its gallery panel.
      return id === "overflow-story" ? "overflow" : id;
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
    syncVideos();
  };
  if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", onMotionPreference);
  else reducedMotion.addListener(onMotionPreference);
  document.addEventListener("visibilitychange", syncVideos);
  window.addEventListener("pagehide", () => videos.forEach((video) => video.pause()));
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
      hero.to(".hero-copy", {y: -60, autoAlpha: 0, duration: .32, ease: "none"}, .02);
      hero.fromTo(".hero-brand-screen", {xPercent: -50, x: 0, y: 0, scale: 1, autoAlpha: 1}, {
        y: -20, scale: 1.05, autoAlpha: 0, duration: .3, ease: "none"
      }, .04);
      document.querySelectorAll(".hero-screen").forEach((screen) => {
        const index = Number(screen.dataset.position);
        hero.fromTo(screen, {
          xPercent: -50,
          x: () => index * innerWidth * (mobile ? .17 : .16),
          y: Math.abs(index) * 22, rotation: index * 5,
          scale: 1, autoAlpha: 1
        }, {
          x: () => {
            if (!mobile) return index * innerWidth * .17;
            return index < 0 ? (index === -2 ? -.15 : .15) * innerWidth : (index - 1) * innerWidth * .29;
          },
          y: () => {
            const baseCenter = lineup.offsetTop + screen.offsetHeight / 2;
            const rowCenter = mobile ? (index < 0 ? .49 : .77) : .74;
            return heroStage.offsetHeight * rowCenter - baseCenter;
          },
          rotation: 0,
          scale: () => {
            const height = mobile
              ? Math.min(heroStage.offsetHeight * .245, innerWidth * .6, 230)
              : Math.min(heroStage.offsetHeight * .5, innerWidth * .31, 500);
            return height / screen.offsetHeight;
          },
          autoAlpha: 1, duration: .7, ease: "none"
        }, .08);
      });
      hero.fromTo(".hero-focus", {autoAlpha: 0, y: 25}, {autoAlpha: 1, y: 0, duration: .28, ease: "none"}, .48)
        .to({}, {duration: .18}, .83);
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
