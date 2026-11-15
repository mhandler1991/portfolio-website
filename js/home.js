// maxwellhandler.com homepage: intro edit, workflow step animation and phone menu.

// Intro edit: the lede strikes old words and writes new ones in, once per page load,
// starting when the lede is at least 60% on screen. The finished state is the CSS
// default, so with reduced motion this does nothing and the visitor sees it as is.
(function () {
  var lede = document.getElementById('intro-lede');
  var replay = document.getElementById('intro-replay');
  if (!lede || !replay) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // [ms after start, step]. Each mark's own transition sets how long its step takes.
  var PLAN = [[500, 1], [1900, 2], [2800, 3], [4600, 4], [5500, 5], [7600, 6]];
  var REPLAY_AT = 10300; // 2s after the highlighter finishes
  var marks = lede.querySelectorAll('[data-step]');
  var timers = [];

  function toStart() {
    timers.forEach(clearTimeout);
    timers = [];
    replay.classList.remove('is-on');
    lede.classList.add('is-resetting');
    for (var i = 0; i < marks.length; i++) {
      marks[i].classList.add('is-pending');
      marks[i].style.maxWidth = '';
      marks[i].style.transitionDuration = '';
    }
    void lede.offsetWidth; // flush, so the next changes animate from the start state
    lede.classList.remove('is-resetting');
  }

  function apply(step) {
    for (var i = 0; i < marks.length; i++) {
      var el = marks[i];
      if (el.dataset.step !== String(step)) continue;
      if (el.classList.contains('intro__insert')) {
        // Open to the insert's measured width at a steady writing speed.
        el.style.transitionDuration = el.dataset.ms + 'ms';
        el.style.maxWidth = el.firstElementChild.scrollWidth + 'px';
      }
      el.classList.remove('is-pending');
    }
  }

  // Once an insert has opened, drop the pixel width so it re-fits if the font size changes.
  lede.addEventListener('transitionend', function (e) {
    var el = e.target;
    if (e.propertyName === 'max-width' && !el.classList.contains('is-pending')) {
      el.style.maxWidth = '';
      el.style.transitionDuration = '';
    }
  });

  // Height of the finished lede, measured without painting the finished state.
  function finishedHeight() {
    lede.classList.add('is-resetting');
    for (var i = 0; i < marks.length; i++) marks[i].classList.remove('is-pending');
    lede.style.minHeight = '';
    var h = lede.offsetHeight;
    toStart();
    return h;
  }

  function play() {
    // Reserve the finished height so the links below don't jump as words push along.
    lede.style.minHeight = finishedHeight() + 'px';
    PLAN.forEach(function (p) { timers.push(setTimeout(function () { apply(p[1]); }, p[0])); });
    timers.push(setTimeout(function () {
      replay.classList.add('is-on');
      lede.style.minHeight = '';
    }, REPLAY_AT));
  }

  replay.hidden = false; // takes its inline space now (still invisible), so its fade-in can't reflow
  toStart(); // hide the new words before the first paint that matters
  replay.addEventListener('click', play);

  // Wait for fonts so the measured insert widths are right.
  function start() {
    if (!('IntersectionObserver' in window)) { play(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); play(); }
    }, { threshold: 0.6 });
    io.observe(lede);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
})();

// Workflow steps: highlight 01 to 05 in turn, only while at least half the row is
// visible, paused on hover, stopping after two full cycles. Off with reduced motion.
(function () {
  var list = document.getElementById('steps');
  if (!list) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var steps = list.querySelectorAll('.step');
  var interval = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--step'), 10) || 2200;
  var maxTicks = steps.length * 2;
  var visible = false;
  var hovering = false;
  var ticks = 0;
  var timer = null;

  function paint(active) {
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.toggle('is-active', i === active);
    }
  }

  function tick() {
    if (!visible || hovering) return;
    ticks += 1;
    if (ticks > maxTicks) {
      clearInterval(timer);
      paint(-1);
      return;
    }
    paint((ticks - 1) % steps.length);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.5 }).observe(list);
  } else {
    visible = true;
  }
  list.addEventListener('mouseenter', function () { hovering = true; });
  list.addEventListener('mouseleave', function () { hovering = false; });
  timer = setInterval(tick, interval);
})();

// Phone menu (640px and under). A native <button>, so Enter and Space work.
(function () {
  var btn = document.getElementById('menu-btn');
  var panel = document.getElementById('menu-panel');
  if (!btn || !panel) return;

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  }

  btn.addEventListener('click', function () {
    setOpen(!panel.classList.contains('is-open'));
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      setOpen(false);
      btn.focus();
    }
  });
})();
