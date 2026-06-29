/* Vahan site animations — additive, defensive, non-destructive. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CARD_SEL = ".feat-card,.news-card,.pl-card,.tcard,.video-card,.partner-img-card,.powering-box,.news-box,.tech,.acc-item";

  function ready(fn){ if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  function arr(nl){ return Array.prototype.slice.call(nl); }
  function uniq(a){ return a.filter(function(n,i){ return a.indexOf(n)===i; }); }

  ready(function(){
    try { initReveal(); }     catch(e){}
    try { initCount(); }      catch(e){}
    try { initWaves(); }      catch(e){}
    try { initMarquee(); }    catch(e){}
    try { initGenericCards(); } catch(e){}
    try { initStickyNav(); }  catch(e){}
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal(){
    var els = uniq(arr(document.querySelectorAll(CARD_SEL + ",.h-section,.heading,.h-partner")));
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
    els.forEach(function(el){ el.setAttribute("data-anim-reveal",""); io.observe(el); });
    setTimeout(function(){ arr(document.querySelectorAll("[data-anim-reveal]:not(.is-in)")).forEach(function(el){ el.classList.add("is-in"); }); }, 4000);
  }

  /* ---------- Count-up ---------- */
  function initCount(){
    var els = uniq(arr(document.querySelectorAll(".num,.stat-num")));
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(e){ if (e.isIntersecting){ animateCount(e.target); io.unobserve(e.target); } });
    }, { threshold:0.6 });
    els.forEach(function(el){ io.observe(el); });
  }
  function animateCount(el){
    if (el.__counted) return;
    var raw = el.textContent, m = raw.match(/[\d][\d,]*\.?\d*/);
    if (!m) return;
    var numStr = m[0], pre = raw.slice(0, m.index), post = raw.slice(m.index + numStr.length);
    var hasComma = numStr.indexOf(",") > -1, decPart = numStr.split(".")[1], decimals = decPart ? decPart.length : 0;
    var target = parseFloat(numStr.replace(/,/g, ""));
    if (!isFinite(target) || target <= 0) return;
    el.__counted = true;
    var dur = 1400, start = null;
    function fmt(v){ var s = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
      if (hasComma){ var p = s.split("."); p[0] = Number(p[0]).toLocaleString("en-US"); s = p.join("."); } return s; }
    function step(ts){ if (start===null) start=ts; var p=Math.min((ts-start)/dur,1), e=1-Math.pow(1-p,3);
      el.textContent = pre + fmt(target*e) + post; if (p<1) requestAnimationFrame(step); else el.textContent = pre + fmt(target) + post; }
    requestAnimationFrame(step);
  }

  /* ---------- Waves: continuous gentle drift ---------- */
  function initWaves(){
    var sel = '.bg-powering-wave img,.bg-wave2 img,.wave-divider,img[src*="wave" i],img[src*="waves" i],img[src*="hero-wave" i]';
    var nodes = uniq(arr(document.querySelectorAll(sel)));
    nodes.forEach(function(n, i){
      n.setAttribute("data-anim-wave", "");
      n.style.setProperty("--anim-wave-dur", (22 + (i % 4) * 3) + "s");  /* 22-31s, slow + varied */
    });
  }

  /* ---------- Logo strip marquee (slow) ---------- */
  function initMarquee(){
    var sel = '.logos img, img[src*="logo-strip" i], img[src*="top%20logos" i], img[src*="top logos" i], img[src*="icons%20strip" i], img[src*="icons strip" i]';
    uniq(arr(document.querySelectorAll(sel))).forEach(function(img){ try { marqueeify(img); } catch(e){} });
  }
  function marqueeify(img){
    if (img.__marquee) return;
    function build(){
      var w = img.getBoundingClientRect().width || img.naturalWidth;
      if (!w){ setTimeout(build, 200); return; }
      img.__marquee = true;
      var cs = getComputedStyle(img);
      var wrap = document.createElement("div");
      wrap.className = "anim-marquee";
      wrap.style.position = (cs.position === "static") ? "relative" : cs.position;
      ["left","top","right","bottom","zIndex","margin","height"].forEach(function(p){ if (img.style[p]) wrap.style[p] = img.style[p]; });
      wrap.style.width = (img.style.width || (w + "px"));
      var track = document.createElement("div");
      track.className = "anim-marquee-track";
      track.style.animationDuration = Math.max(w / 18, 48) + "s";  /* slow, subtle */
      img.parentNode.insertBefore(wrap, img);
      img.style.position = "static";
      ["left","top","right","bottom"].forEach(function(p){ img.style[p] = ""; });
      img.style.margin = "0";
      var clone = img.cloneNode(true);
      clone.setAttribute("aria-hidden", "true"); clone.__marquee = true;
      track.appendChild(img); track.appendChild(clone);
      wrap.appendChild(track);
    }
    if (img.complete) build(); else img.addEventListener("load", build);
  }

  /* ---------- Generic card detection (sites without semantic classes) ---------- */
  function initGenericCards(){
    if (document.querySelector(CARD_SEL)) return;
    var all = arr(document.querySelectorAll("div,article,a"));
    var tagged = 0;
    all.forEach(function(el){
      if (tagged >= 48 || el.hasAttribute("data-anim-card")) return;
      var cs = getComputedStyle(el), br = parseFloat(cs.borderTopLeftRadius) || 0;
      var hasShadow = cs.boxShadow && cs.boxShadow !== "none", r = el.getBoundingClientRect();
      if (br >= 10 && (hasShadow || cs.borderStyle !== "none") && r.width >= 120 && r.width <= 560 && r.height >= 80 && r.height <= 520){
        if (el.closest("[data-anim-card]")) return;
        el.setAttribute("data-anim-card", ""); tagged++;
      }
    });
  }

  /* ---------- Sticky floating-pill navbar ---------- */
  function luminance(c){ var m = (c||"").match(/(\d+(\.\d+)?)/g); if (!m) return 1;
    return 0.2126*(+m[0]/255) + 0.7152*(+m[1]/255) + 0.0722*(+m[2]/255); }
  function initStickyNav(){
    var existing = document.querySelector('header[class*="sticky"]');  /* Site2 already sticky */
    var nav = document.querySelector("nav.nav, nav#nav-bar, #nav-bar");
    if (!nav){
      var cands = arr(document.querySelectorAll("nav, header"));
      nav = cands.filter(function(el){ var r=el.getBoundingClientRect(); return r.top<200 && r.width>500 && r.height>24 && el.querySelector("img"); })[0];
    }
    if (!nav) return;
    if (existing && (existing === nav || existing.contains(nav))) return;
    var r = nav.getBoundingClientRect();
    if (r.width < 200 || r.height < 20) return;  /* fragmented/collapsed nav — skip safely */

    var sample = nav.querySelector(".nav-links a, .nav-item, a, button");
    var lum = sample ? luminance(getComputedStyle(sample).color) : 1;
    nav.style.setProperty("--anim-pill-bg", lum > 0.55 ? "rgba(20,20,28,.74)" : "rgba(255,255,255,.86)");

    setGetStarted(nav);

    var threshold = 150, on = false;
    function onScroll(){
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var want = y > threshold;
      if (want !== on){ on = want; nav.classList.toggle("anim-nav-stuck", want); }
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }
  function setGetStarted(nav){
    var cta = nav.querySelector(".btn-orange, .btn-primary")
           || nav.querySelector(".nav-right .btn:last-child, a.btn, button.btn");
    if (!cta) return;
    var done = false;
    for (var i=0;i<cta.childNodes.length;i++){
      var n = cta.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()){ n.textContent = "Get Started "; done = true; break; }
    }
    if (!done) cta.insertBefore(document.createTextNode("Get Started "), cta.firstChild);
  }
})();
