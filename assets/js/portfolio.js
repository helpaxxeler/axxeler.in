/*
  AXXELER.IN — PORTFOLIO PAGE SCRIPT
  Loaded only by portfolio.html, after the shared assets/js/script.js.
  Modules: card reveal/in-view, filters, detail dialog, tilt, hero particles,
  hero parallax, counters, cursor hover hook.
*/
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = function () { return reduceMotionQuery.matches; };

  var cards = Array.prototype.slice.call(document.querySelectorAll('.pf-card'));

  /* ------------------------------------------------------------------
     1. CARD REVEAL + IN-VIEW (pauses SVG animations off-screen)
  ------------------------------------------------------------------ */
  function initCardObservers() {
    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (c) { c.classList.add('is-revealed', 'is-inview'); });
      return;
    }

    var revealObserver = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (entry, i) {
        var card = entry.target;
        setTimeout(function () { card.classList.add('is-revealed'); }, reduceMotion() ? 0 : i * 90);
        revealObserver.unobserve(card);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var viewObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-inview', entry.isIntersecting);
      });
    }, { threshold: 0 });

    cards.forEach(function (card) {
      revealObserver.observe(card);
      viewObserver.observe(card);
    });
  }

  function revealNow(list) {
    list.forEach(function (card, i) {
      setTimeout(function () { card.classList.add('is-revealed'); }, reduceMotion() ? 0 : i * 70);
    });
  }

  /* ------------------------------------------------------------------
     2. CATEGORY FILTERS
  ------------------------------------------------------------------ */
  function initFilters() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.pf-filter'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('.pf-group'));
    var groupsWrap = document.getElementById('pfGroups');
    var filterBar = document.getElementById('pfFilterBar');
    var status = document.getElementById('pfFilterStatus');
    if (!buttons.length || !groups.length || !groupsWrap) return;

    var busy = false;
    var LEAVE_MS = 300;

    function scrollToResults() {
      var nav = document.querySelector('.nav');
      var offset = (nav ? nav.offsetHeight : 80) + (filterBar ? filterBar.offsetHeight : 0) + 12;
      var top = groupsWrap.getBoundingClientRect().top;
      if (top < offset) {
        window.scrollTo({
          top: window.scrollY + top - offset,
          behavior: reduceMotion() ? 'auto' : 'smooth'
        });
      }
    }

    function apply(key, btn) {
      if (busy) return;
      busy = true;

      buttons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      var targets = groups.filter(function (g) { return key === 'all' || g.dataset.group === key; });
      var leaving = groups.filter(function (g) { return !g.hidden && targets.indexOf(g) === -1; });
      var entering = targets.filter(function (g) { return g.hidden; });

      // hold the current height so the page does not jump while groups swap
      groupsWrap.style.minHeight = groupsWrap.offsetHeight + 'px';
      leaving.forEach(function (g) { g.classList.add('is-leaving'); });

      var delay = leaving.length && !reduceMotion() ? LEAVE_MS : 0;

      setTimeout(function () {
        leaving.forEach(function (g) {
          g.hidden = true;
          g.classList.remove('is-leaving');
        });
        entering.forEach(function (g) {
          g.classList.add('is-entering');
          g.hidden = false;
        });

        // two frames so the browser paints the start state before transitioning
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            entering.forEach(function (g) { g.classList.remove('is-entering'); });
          });
        });

        var visibleCards = [];
        targets.forEach(function (g) {
          visibleCards = visibleCards.concat(Array.prototype.slice.call(g.querySelectorAll('.pf-card')));
        });
        revealNow(visibleCards);

        groupsWrap.style.minHeight = '';
        scrollToResults();

        if (status) {
          var label = btn.childNodes[0].textContent.trim();
          status.textContent = 'Showing ' + visibleCards.length + (visibleCards.length === 1 ? ' project' : ' projects') + ': ' + label + '.';
        }
        busy = false;
      }, delay);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-active')) return;
        apply(btn.dataset.filter, btn);
        // keep the active pill in view on small, horizontally scrolling bars
        if (btn.scrollIntoView) {
          btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     3. PROJECT DETAIL DIALOG
  ------------------------------------------------------------------ */
  function initModal() {
    var modal = document.getElementById('pfModal');
    if (!modal || typeof modal.showModal !== 'function') {
      // Very old browsers: hide the trigger buttons rather than leave them dead.
      document.querySelectorAll('[data-open-project]').forEach(function (b) { b.hidden = true; });
      cards.forEach(function (c) { c.style.cursor = 'default'; });
      return;
    }

    var visualSlot = document.getElementById('pfModalVisual');
    var metaSlot = document.getElementById('pfModalMeta');
    var titleSlot = document.getElementById('pfModalTitle');
    var contentSlot = document.getElementById('pfModalContent');
    var closeBtn = document.getElementById('pfModalClose');
    var lastTrigger = null;

    function open(card, trigger) {
      var src = card.querySelector('.pf-detail-src');
      if (!src) return;
      lastTrigger = trigger || card.querySelector('[data-open-project]');

      visualSlot.innerHTML = '';
      var visual = card.querySelector('.pf-card-visual');
      if (visual) {
        var v = visual.cloneNode(true);
        v.removeAttribute('role');
        v.setAttribute('aria-hidden', 'true');
        visualSlot.appendChild(v);
      }

      var num = card.querySelector('.pf-num');
      var cat = card.querySelector('.pf-cat');
      metaSlot.innerHTML = '';
      if (num) metaSlot.appendChild(num.cloneNode(true));
      if (cat) metaSlot.appendChild(cat.cloneNode(true));

      var title = card.querySelector('.pf-card-title');
      titleSlot.textContent = title ? title.textContent : '';

      contentSlot.innerHTML = '';
      Array.prototype.forEach.call(src.children, function (child) {
        contentSlot.appendChild(child.cloneNode(true));
      });

      modal.showModal();
      document.body.classList.add('pf-modal-open');
      var inner = modal.querySelector('.pf-modal-inner');
      if (inner) inner.scrollTop = 0;
      closeBtn.focus();

      if (card.id && history.replaceState) {
        history.replaceState(null, '', '#' + card.id);
      }
    }

    function close() {
      if (modal.open) modal.close();
    }

    // Esc fires 'cancel' before 'close'; release the scroll lock right away
    modal.addEventListener('cancel', function () {
      document.body.classList.remove('pf-modal-open');
    });

    modal.addEventListener('close', function () {
      document.body.classList.remove('pf-modal-open');
      if (history.replaceState && /^#project-/.test(location.hash)) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus({ preventScroll: true });
      }
    });

    closeBtn.addEventListener('click', close);

    // click on the backdrop (outside the dialog box) closes it
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });

    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        // real links inside the card (e.g. live product) keep their own behaviour
        if (e.target.closest('a')) return;
        var trigger = e.target.closest('[data-open-project]');
        open(card, trigger);
      });
    });

    // deep link: portfolio.html#project-07 opens that project (on load or hash change)
    function openFromHash() {
      var hash = location.hash;
      if (!/^#project-\d{2}$/.test(hash) || modal.open) return;
      var target = document.getElementById(hash.slice(1));
      if (target && target.classList.contains('pf-card') && target.offsetParent !== null) {
        target.classList.add('is-revealed');
        target.scrollIntoView({ block: 'center' });
        open(target);
      }
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  /* ------------------------------------------------------------------
     4. 3D TILT (desktop, fine pointer, motion allowed)
  ------------------------------------------------------------------ */
  function initTilt() {
    if (!finePointerQuery.matches || reduceMotion()) return;
    var MAX = 4; // degrees — subtle on purpose

    cards.forEach(function (card) {
      var frame = null;
      card.addEventListener('pointermove', function (e) {
        if (frame) return;
        frame = requestAnimationFrame(function () {
          frame = null;
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--ry', (x * MAX * 2).toFixed(2) + 'deg');
          card.style.setProperty('--rx', (-y * MAX * 2).toFixed(2) + 'deg');
          card.style.setProperty('--edge-angle', Math.round(Math.atan2(y, x) * 180 / Math.PI + 90) + 'deg');
        });
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ------------------------------------------------------------------
     5. HERO PARTICLES (canvas, paused when off-screen / tab hidden)
  ------------------------------------------------------------------ */
  function initParticles() {
    var canvas = document.getElementById('pfParticles');
    var hero = document.getElementById('pf-hero');
    if (!canvas || !hero || reduceMotion() || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, particles = [], running = false, inView = true, raf = null;
    // Axxeler brand: --primary #6A5BFF and --accent-light #8B7EFF
    var COLORS = ['106,91,255', '139,126,255'];

    function setup() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = w < 720 ? 18 : 48;
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.35 - 0.05,
          r: Math.random() * 1.6 + 0.6,
          c: COLORS[i % COLORS.length],
          a: Math.random() * 0.5 + 0.25
        });
      }
    }

    var linkLines = function () { return w >= 720; };

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
        ctx.fill();
      }
      if (linkLines()) {
        for (var a = 0; a < particles.length; a++) {
          for (var b = a + 1; b < particles.length; b++) {
            var dx = particles[a].x - particles[b].x;
            var dy = particles[a].y - particles[b].y;
            var d2 = dx * dx + dy * dy;
            if (d2 < 10000) {
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.strokeStyle = 'rgba(106,91,255,' + (0.14 * (1 - d2 / 10000)).toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    setup();
    start();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) { start(); } else { stop(); }
      }).observe(hero);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    });
  }

  /* ------------------------------------------------------------------
     6. HERO PARALLAX (mouse on desktop, light scroll on all)
  ------------------------------------------------------------------ */
  function initParallax() {
    if (reduceMotion()) return;
    var visual = document.querySelector('.pf-hero-visual');
    var hero = document.getElementById('pf-hero');
    var glow = document.querySelector('.pf-hero-glow');
    if (!visual || !hero) return;

    if (finePointerQuery.matches) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        visual.style.setProperty('--px', (x * -18).toFixed(1) + 'px');
        visual.style.setProperty('--py', (y * -18).toFixed(1) + 'px');
      });
      hero.addEventListener('pointerleave', function () {
        visual.style.setProperty('--px', '0px');
        visual.style.setProperty('--py', '0px');
      });
    }

    if (glow) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var y = Math.min(window.scrollY, window.innerHeight);
          glow.style.transform = 'translate3d(0,' + (y * 0.25).toFixed(1) + 'px,0)';
        });
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------------
     7. COUNTERS (real counts only — final values are already in the HTML)
  ------------------------------------------------------------------ */
  function initCounters() {
    var counters = Array.prototype.slice.call(document.querySelectorAll('.pf-count'));
    if (!counters.length || reduceMotion() || !('IntersectionObserver' in window)) return;

    counters.forEach(function (el) { el.textContent = '0'; });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        obs.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var startTime = performance.now();
        var DURATION = 1100;
        (function tick(now) {
          var p = Math.min((now - startTime) / DURATION, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        })(startTime);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* ------------------------------------------------------------------
     8. CUSTOM CURSOR HOOK (shared cursor grows over cards)
  ------------------------------------------------------------------ */
  function initCursorHook() {
    var ring = document.querySelector('.custom-cursor-ring');
    if (!ring) return;
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () { ring.classList.add('hovered'); });
      card.addEventListener('mouseleave', function () { ring.classList.remove('hovered'); });
    });
  }

  /* ------------------------------------------------------------------
     INIT
  ------------------------------------------------------------------ */
  function init() {
    root.classList.add('pf-js');
    initCardObservers();
    initFilters();
    initModal();
    initTilt();
    initParticles();
    initParallax();
    initCounters();
    initCursorHook();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
