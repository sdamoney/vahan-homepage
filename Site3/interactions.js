/* Static re-implementation of the page's React interactions.
   Widgets are found by structure/text at runtime, so this is robust to
   the compiled Tailwind class names. */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---------- 1. "One Partner" tabs ---------- */
  var TAB_CONTENT = {
    "Vahan.ai": {
      eyebrow: "Vahan.ai",
      heading: "AI-Powered Hiring At Scale",
      paragraph: "Hire efficiently and quickly at scale using AI sourcing across largest worker network",
      stat: "4 Crore+ worker network",
      cta: "Explore Vahan.ai",
    },
    "Vahan Partners": {
      eyebrow: "Vahan Partners",
      heading: "Grow your business with India's biggest demand pool.",
      paragraph: "Steady hiring demand from top employers, AI tools that make every recruiter more productive, and fast, reliable payouts.",
      stat: "10-Day payment cycle",
      cta: "Explore Vahan Partners",
    },
    "Vahan Jobs": {
      eyebrow: "Vahan Jobs",
      heading: "Find real work, in your language.",
      paragraph: "Real jobs from India's top employers. Apply by chat or voice, in the language you speak, any time of day.",
      stat: "10 Lakh+ workers placed",
      cta: "Explore Vahan Jobs",
    },
  };

  function initTabs() {
    var labels = Object.keys(TAB_CONTENT);
    // find the tab bar: a row whose direct children are buttons matching the labels
    var buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
    var tabBtns = buttons.filter(function (b) {
      return labels.indexOf(b.textContent.trim()) !== -1;
    });
    if (tabBtns.length < 3) return;
    var bar = tabBtns[0].parentElement;
    // keep only buttons that share the same parent (the real tab bar)
    tabBtns = tabBtns.filter(function (b) { return b.parentElement === bar; });
    if (tabBtns.length < 3) return;

    var panel = bar.nextElementSibling;
    if (!panel) return;
    var h3 = panel.querySelector("h3");
    if (!h3) return;
    var col = h3.parentElement;
    var ps = col.querySelectorAll("p");
    var ctaBtn = col.querySelector("button, a");

    tabBtns.forEach(function (b) { b.classList.add("v-tab"); });

    function activate(label) {
      var c = TAB_CONTENT[label];
      if (!c) return;
      tabBtns.forEach(function (b) {
        b.classList.toggle("v-tab--active", b.textContent.trim() === label);
      });
      if (h3) h3.textContent = c.eyebrow;
      if (ps[0]) ps[0].textContent = c.heading;
      if (ps[1]) ps[1].textContent = c.paragraph;
      if (ps[2]) ps[2].textContent = c.stat;
      if (ctaBtn) {
        // preserve trailing icon (svg) if present
        var svg = ctaBtn.querySelector("svg");
        ctaBtn.textContent = c.cta + " ";
        if (svg) ctaBtn.appendChild(svg);
      }
      // restart the fade animation on the panel
      panel.classList.remove("v-fade");
      void panel.offsetWidth;
      panel.classList.add("v-fade");
    }

    tabBtns.forEach(function (b) {
      b.addEventListener("click", function () { activate(b.textContent.trim()); });
    });
    activate("Vahan.ai");
  }

  /* ---------- 2. Features accordion ---------- */
  var FEATURE_TITLES = [
    "Intelligent Sourcing", "Smart Screening", "Best-Fit Matching",
    "Retention Intelligence", "Engagement Automation",
  ];

  function initAccordion() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
    var items = buttons.filter(function (b) {
      var t = b.textContent.trim();
      return FEATURE_TITLES.some(function (ft) { return t.indexOf(ft) === 0; });
    });
    if (items.length < 5) return;
    var wrap = items[0].parentElement;
    items = items.filter(function (b) { return b.parentElement === wrap; });
    if (items.length < 5) return;

    items.forEach(function (btn) {
      btn.classList.add("v-feat");
      var head = btn.children[0];
      if (head) {
        if (head.children[0]) head.children[0].classList.add("v-feat-icon");
        if (head.children[1]) head.children[1].classList.add("v-feat-title");
      }
      var descWrap = btn.children[1];
      if (descWrap) descWrap.classList.add("v-feat-desc");
    });

    function open(idx) {
      items.forEach(function (b, i) { b.classList.toggle("v-feat--open", i === idx); });
    }
    items.forEach(function (b, i) {
      b.addEventListener("click", function () { open(i); });
    });
    open(0);
  }

  /* ---------- 3. Mobile menu (hamburger) ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('button[aria-label="Toggle menu"]');
    if (!toggle) return;
    var header = toggle.closest("header");
    if (!header) return;
    // the mobile panel is the last child div of <header> (overflow-hidden wrapper)
    var panel = header.lastElementChild;
    if (!panel || panel === toggle.closest("div")) return;
    panel.classList.add("v-mobile-panel");
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("v-mobile-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    // expandable sub-sections inside the mobile panel
    var subBtns = panel.querySelectorAll("button");
    Array.prototype.forEach.call(subBtns, function (sb) {
      sb.addEventListener("click", function () {
        var sub = sb.nextElementSibling;
        if (sub) sub.classList.toggle("v-sub-open");
      });
    });
  }

  /* ---------- 4. Video lightbox ---------- */
  function initVideoLightbox() {
    var btns = Array.prototype.slice.call(document.querySelectorAll('button[aria-label^="Play "]'));
    if (!btns.length) return;
    var SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
    var overlay = document.createElement("div");
    overlay.className = "v-lightbox";
    overlay.innerHTML =
      '<div class="v-lightbox-inner">' +
      '<button class="v-lightbox-close" aria-label="Close video">&times;</button>' +
      '<video controls playsinline></video></div>';
    document.body.appendChild(overlay);
    var video = overlay.querySelector("video");
    function close() {
      overlay.classList.remove("v-lightbox-open");
      video.pause();
      document.body.style.overflow = "";
    }
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("v-lightbox-close")) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    btns.forEach(function (b) {
      var img = b.querySelector("img");
      b.addEventListener("click", function () {
        video.poster = img ? img.src : "";
        video.src = SRC;
        overlay.classList.add("v-lightbox-open");
        document.body.style.overflow = "hidden";
        video.play().catch(function () {});
      });
    });
  }

  /* ---------- 5. Header scroll border ---------- */
  function initScrollHeader() {
    var header = document.querySelector("header");
    if (!header) return;
    function onScroll() { header.classList.toggle("v-scrolled", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  ready(function () {
    try { initTabs(); } catch (e) { console.warn("tabs", e); }
    try { initAccordion(); } catch (e) { console.warn("accordion", e); }
    try { initMobileMenu(); } catch (e) { console.warn("mobile", e); }
    try { initVideoLightbox(); } catch (e) { console.warn("video", e); }
    try { initScrollHeader(); } catch (e) { console.warn("scroll", e); }
  });
})();
