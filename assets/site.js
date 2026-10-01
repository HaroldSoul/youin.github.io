(() => {
  const en = document.documentElement.lang === "en";
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem("youin-language", link.dataset.language);
      } catch (_) {
        /* Optional. */
      }
      const url = new URL(link.href);
      url.hash = location.hash;
      link.href = url.href;
    });
  });
  const config = window.YOUIN_CONFIG || {};
  const email = (config.supportEmail || "").trim();
  const bugReportForm = (config.bugReportForm || "").trim();
  document.querySelectorAll("[data-bug-report-link]").forEach((link) => {
    link.href = bugReportForm || link.href;
  });
  document.querySelectorAll("[data-support-link]").forEach((link) => {
    link.href = email ? `mailto:${email}` : config.supportIssues || link.href;
    if (email) {
      link.textContent = en ? "Email support" : "이메일로 문의하기";
    } else if (link.dataset.supportKind === "general") {
      link.textContent = en ? "Privacy or other inquiry" : "개인정보·기타 문의";
    } else {
      link.textContent = en ? "Open a support issue" : "문의 남기기";
    }
  });
  if (email) {
    document.querySelectorAll("[data-contact-intro]").forEach((intro) => {
      intro.textContent = en
        ? "Use the contact below for YouIN privacy and support requests."
        : "YouIN 개인정보 처리 및 사용자 지원 문의는 아래 창구를 이용하세요.";
    });
    document.querySelectorAll("[data-contact-note]").forEach((note) => {
      note.textContent = en
        ? `Contact: ${email}. Please do not send photos of faces or sensitive personal information.`
        : `문의: ${email}. 얼굴 사진이나 민감한 개인정보는 보내지 마세요.`;
    });
  }

  const scenes = Array.from(document.querySelectorAll("[data-scene]"));
  const sceneLinks = Array.from(document.querySelectorAll("[data-scene-link]"));
  const motionVideos = Array.from(document.querySelectorAll("[data-game-motion]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (scenes.length && "IntersectionObserver" in window) {
    const ratios = new Map(scenes.map((scene) => [scene.id, 0]));
    let activeSceneId = "";
    const resetVideo = (video) => {
      video.pause();
      if (video.currentTime !== 0) {
        try {
          video.currentTime = 0;
        } catch (_) {
          /* The poster remains available if the media cannot seek yet. */
        }
      }
    };
    const syncSceneMotion = (id) => {
      motionVideos.forEach((video) => {
        const isActive = video.closest("[data-scene]")?.id === id;
        if (!isActive || reducedMotion.matches) {
          resetVideo(video);
          return;
        }
        video.currentTime = 0;
        video.play().catch(() => {
          /* Muted autoplay can still be blocked; the poster is the fallback. */
        });
      });
    };
    const setActiveScene = (id) => {
      if (activeSceneId === id) return;
      activeSceneId = id;
      scenes.forEach((scene) => scene.classList.toggle("is-active", scene.id === id));
      sceneLinks.forEach((link) => {
        if (link.dataset.sceneLink === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      syncSceneMotion(id);
    };
    setActiveScene(scenes[0].id);
    document.body.classList.add("scene-observed");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.intersectionRatio));
        const active = scenes.reduce((best, scene) =>
          ratios.get(scene.id) > ratios.get(best.id) ? scene : best,
        );
        setActiveScene(active.id);
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] },
    );
    scenes.forEach((scene) => observer.observe(scene));

    const desktopViewport = window.matchMedia("(min-width: 1024px)");
    let fineInputUntil = 0;
    let wheelTarget = null;
    let wheelDirection = 0;
    let wheelFrame;
    const releaseWheel = () => {
      cancelAnimationFrame(wheelFrame);
      wheelTarget = null;
      wheelDirection = 0;
      document.documentElement.classList.remove("wheel-paging");
    };
    window.addEventListener("wheel", (event) => {
      if (!desktopViewport.matches || reducedMotion.matches || event.defaultPrevented
        || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        releaseWheel();
        return;
      }
      if (event.target instanceof Element
        && event.target.closest("input, textarea, select, [contenteditable]")) {
        releaseWheel();
        return;
      }

      const now = performance.now();
      // Fine, fractional, or diagonal input keeps native trackpad scrolling for the gesture.
      const fineInput = event.deltaMode === 0 && (Math.abs(event.deltaY) < 40
        || !Number.isInteger(event.deltaY) || event.deltaX !== 0);
      if (fineInput) {
        fineInputUntil = now + 240;
        releaseWheel();
        return;
      }
      if (now < fineInputUntil || !event.deltaY || !event.cancelable
        || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        releaseWheel();
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (wheelTarget !== null && direction === wheelDirection) {
        event.preventDefault();
        return;
      }

      const y = window.scrollY;
      let index = 0;
      scenes.forEach((scene, i) => {
        if (scene.offsetTop <= y + 2) index = i;
      });
      const current = scenes[index];
      let target;
      if (direction > 0) {
        // Taller chapters must remain scrollable before advancing to the next one.
        if (y < current.offsetTop + current.offsetHeight - window.innerHeight - 2) return;
        if (index === scenes.length - 1) return;
        target = scenes[index + 1].offsetTop;
      } else if (y > current.offsetTop + 2) {
        if (current.offsetHeight > window.innerHeight + 2) return;
        target = current.offsetTop;
      } else {
        if (index === 0) return;
        const previous = scenes[index - 1];
        target = Math.max(previous.offsetTop,
          previous.offsetTop + previous.offsetHeight - window.innerHeight);
      }
      if (Math.abs(target - y) < 2) return;

      event.preventDefault();
      releaseWheel();
      wheelTarget = target;
      wheelDirection = direction;
      document.documentElement.classList.add("wheel-paging");
      const started = performance.now();
      const distance = target - y;
      const duration = Math.max(300, Math.min(700, Math.abs(distance) * 0.7));
      const move = (time) => {
        const progress = Math.max(0, Math.min(1, (time - started) / duration));
        // Smooth acceleration and deceleration, consistent across browser engines.
        const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10);
        window.scrollTo({ top: y + distance * eased, behavior: "instant" });
        if (progress < 1) {
          wheelFrame = requestAnimationFrame(move);
        } else {
          releaseWheel();
        }
      };
      wheelFrame = requestAnimationFrame(move);
    }, { passive: false });
    window.addEventListener("resize", releaseWheel);
    document.addEventListener("pointerdown", releaseWheel, { passive: true });
    document.addEventListener("keydown", releaseWheel);

    const handleMotionPreference = () => {
      releaseWheel();
      syncSceneMotion(activeSceneId);
    };
    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", handleMotionPreference);
    } else {
      reducedMotion.addListener(handleMotionPreference);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        motionVideos.forEach((video) => video.pause());
        return;
      }
      const activeVideo = motionVideos.find(
        (video) => video.closest("[data-scene]")?.id === activeSceneId,
      );
      if (activeVideo && !activeVideo.ended && !reducedMotion.matches) {
        activeVideo.play().catch(() => {});
      }
    });
  }
})();
