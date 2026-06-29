/* Vahan site animations — additive, defensive, non-destructive.
   Enhances existing DOM at runtime; never alters source content. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CARD_SEL = ".feat-card,.news-card,.pl-card,.tcard,.video-card,.partner-img-card,.powering-box,.news-box,.tech,.acc-item";

  function ready(fn){ if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  function arr(nl){ return Array.prototype.slice.call(nl); }
  function uniq(a){ return a.filter(function(n,i){ return a.indexOf(n)===i; }); }

  ready(function(){
    try { initReveal(); }   catch(e){}
    try { initCount(); }    catch(e){}
    try { initParallax(); } catch(e){}
    try { initMarquee(); }  catch(e){}
    try { initGenericCards(); } catch(e){}
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal(){
    var els = uniq(arr(document.querySelectorAll(CARD_SEL + ",.h-section,.heading,.h-partner")));
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
    els.forEach(function(el){ el.setAttribute("data-anim-reveal",""); io.observe(el); });
    /* failsafe: never leave content hidden */
    setTimeout(function(){
      arr(document.querySelectorAll("[data-anim-reveal]:not(.is-in)")).forEach(function(el){ el.classList.add("is-in"); });
    }, 4000);
  }

  /* ---------- Count-up on stat numbers ---------- */
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
    var raw = el.textContent;
    var m = raw.match(/[\d][\d,]*\.?\d*/);
    if (!m) return;
    var numStr = m[0];
    var pre = raw.slice(0, m.index);
    var post = raw.slice(m.index + numStr.length);
    var hasComma = numStr.indexOf(",") > -1;
    var decPart = numStr.split(".")[1];
    var decimals = decPart ? decPart.length : 0;
    var target = parseFloat(numStr.replace(/,/g, ""));
    if (!isFinite(target) || target <= 0) return;
    el.__counted = true;
    var dur = 1400, start = null;
    function fmt(v){
      var s = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
      if (hasComma){ var p = s.split("."); p[0] = Number(p[0]).toLocaleString("en-US"); s = p.join("."); }
      return s;
    }
    function step(ts){
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(target * eased) + post;
      if (p < 1) requestAnimationFrame(step); else el.textContent = pre + fmt(target) + post;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Wave parallax ---------- */
  function initParallax(){
    var sel = '.bg-powering-wave img,.bg-wave2 img,.wave-divider,'
      + 'img[src*="wave" i],img[src*="waves" i],img[src*="hero-wave" i]';
    var nodes = uniq(arr(document.querySelectorAll(sel)));
    if (!nodes.length) return;
    var items = nodes.map(function(n, i){
      n.setAttribute("data-anim-wave", "");
      return { el:n, speed: 0.04 + (i % 3) * 0.02 };
    });
    var ticking = false;
    function update(){
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      items.forEach(function(it){
        var off = Math.max(Math.min(y * it.speed, 60), -60);
        it.el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function(){ if (!ticking){ requestAnimationFrame(update); ticking = true; } }, { passive:true });
    update();
  }

  /* ---------- Logo strip marquee ---------- */
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
      ["left","top","right","bottom","zIndex","margin","height"].forEach(function(p){
        if (img.style[p]) wrap.style[p] = img.style[p];
      });
      wrap.style.width = (img.style.width || (w + "px"));
      var track = document.createElement("div");
      track.className = "anim-marquee-track";
      track.style.animationDuration = Math.max(w / 60, 18) + "s";
      img.parentNode.insertBefore(wrap, img);
      img.style.position = "static";
      ["left","top","right","bottom"].forEach(function(p){ img.style[p] = ""; });
      img.style.margin = "0";
      var clone = img.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.__marquee = true;
      track.appendChild(img);
      track.appendChild(clone);
      wrap.appendChild(track);
    }
    if (img.complete) build(); else img.addEventListener("load", build);
  }

  /* ---------- Generic card detection (sites with no semantic card classes) ---------- */
  function initGenericCards(){
    if (document.querySelector(CARD_SEL)) return; /* other sites already handled */
    var all = arr(document.querySelectorAll("div,article,a"));
    var tagged = 0;
    all.forEach(function(el){
      if (tagged >= 40 || el.hasAttribute("data-anim-card")) return;
      var cs = getComputedStyle(el);
      var br = parseFloat(cs.borderTopLeftRadius) || 0;
      var hasShadow = cs.boxShadow && cs.boxShadow !== "none";
      var r = el.getBoundingClientRect();
      if (br >= 10 && (hasShadow || cs.borderStyle !== "none")
          && r.width >= 120 && r.width <= 560 && r.height >= 80 && r.height <= 520){
        if (el.closest("[data-anim-card]")) return;
        el.setAttribute("data-anim-card", "");
        tagged++;
      }
    });
  }
})();
