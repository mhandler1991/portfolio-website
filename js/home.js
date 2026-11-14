// maxwellhandler.com homepage: workflow step animation and phone menu.

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
