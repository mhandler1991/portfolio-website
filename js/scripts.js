(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");
  const heroPhoto = document.getElementById("hero-photo");
  const heroProfile = document.getElementById("hero-profile");

  if (heroPhoto && heroProfile) {
    function applyPhotoState() {
      if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
        heroProfile.classList.add("has-photo");
      }
    }
    heroPhoto.addEventListener("load", function () {
      heroProfile.classList.add("has-photo");
    });
    heroPhoto.addEventListener("error", function () {
      heroProfile.classList.remove("has-photo");
    });
    applyPhotoState();
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  initHeroTagsTicker();

  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

function initHeroTagsTicker() {
  const shell = document.getElementById("hero-tags-shell");
  const track = document.getElementById("hero-tags-track");
  if (!shell || !track) return;

  const viewport = shell.querySelector(".hero-tags-viewport");
  if (!viewport) return;

  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let rafId = 0;

  function teardown() {
    track.classList.remove("is-marquee");
    track.style.removeProperty("--hero-ticker-shift");
    track.style.removeProperty("--hero-ticker-duration");
    viewport.classList.remove("is-scroll-fallback");
    track.querySelectorAll(".hero-tags-group--clone").forEach(function (node) {
      node.remove();
    });
  }

  function measureAndApply() {
    teardown();

    const primary = track.querySelector(".hero-tags-group:not(.hero-tags-group--clone)");
    if (!primary) return;

    const tolerance = 2;
    const needsMarquee = primary.scrollWidth > viewport.clientWidth + tolerance;

    if (!needsMarquee) {
      return;
    }

    if (mqReduce.matches) {
      viewport.classList.add("is-scroll-fallback");
      return;
    }

    const clone = primary.cloneNode(true);
    clone.classList.add("hero-tags-group--clone");
    clone.setAttribute("aria-hidden", "true");
    const cloneUl = clone.querySelector(".hero-tags");
    if (cloneUl) {
      cloneUl.removeAttribute("aria-label");
    }
    track.appendChild(clone);

    track.getBoundingClientRect();

    const shift = clone.getBoundingClientRect().left - primary.getBoundingClientRect().left;

    if (shift <= 0) {
      clone.remove();
      viewport.classList.add("is-scroll-fallback");
      return;
    }

    const pxPerSec = 38;
    const duration = Math.max(18, Math.min(44, shift / pxPerSec));

    track.style.setProperty("--hero-ticker-shift", "-" + shift + "px");
    track.style.setProperty("--hero-ticker-duration", duration + "s");
    track.classList.add("is-marquee");
  }

  function schedule() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () {
      rafId = requestAnimationFrame(measureAndApply);
    });
  }

  schedule();
  window.addEventListener("resize", schedule);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule);
  }

  mqReduce.addEventListener("change", schedule);

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(schedule);
    ro.observe(viewport);
    const primaryGroup = track.querySelector(".hero-tags-group:not(.hero-tags-group--clone)");
    if (primaryGroup) {
      ro.observe(primaryGroup);
    }
  }
}
