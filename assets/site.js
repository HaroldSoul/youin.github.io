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
  document.querySelectorAll("[data-support-link]").forEach((link) => {
    link.href = email ? `mailto:${email}` : config.supportIssues || link.href;
    link.textContent = email
      ? en
        ? "Email support"
        : "이메일로 문의하기"
      : en
        ? "Open a support issue"
        : "문의 남기기";
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
    const handleMotionPreference = () => syncSceneMotion(activeSceneId);
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
