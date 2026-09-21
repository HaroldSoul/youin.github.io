/* Runs in <head>: language URLs stay useful without JavaScript or localStorage. */
(() => {
  const links = [
    ...document.querySelectorAll('link[rel="alternate"][hreflang]'),
  ];
  let saved;
  try {
    saved = localStorage.getItem("youin-language");
  } catch (_) {
    /* Storage is optional. */
  }
  const requested = new URLSearchParams(location.search).get("lang");
  const current = document.documentElement.lang;
  const preferred = /^(ko|en)$/.test(requested || "")
    ? requested
    : /^(ko|en)$/.test(saved || "")
      ? saved
      : (navigator.language || "").toLowerCase().startsWith("en")
        ? "en"
        : "ko";
  if (requested === "ko" || requested === "en") {
    try {
      localStorage.setItem("youin-language", requested);
    } catch (_) {
      /* Optional. */
    }
  }
  if (preferred !== current) {
    const target = links.find((link) => link.hreflang === preferred);
    if (target) {
      const url = new URL(target.getAttribute("href"), document.baseURI);
      url.search = location.search;
      url.hash = location.hash;
      location.replace(url.href);
    }
  }
})();
