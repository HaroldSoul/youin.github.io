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
})();
