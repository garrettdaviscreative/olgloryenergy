/* Ol' Glory site behavior: mobile menu, buy buttons, signup form, social links. */
(function () {
  var cfg = window.OG_CONFIG || {};

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // Buy buttons: <a data-buy="citrus">
  document.querySelectorAll('[data-buy]').forEach(function (btn) {
    var link = (cfg.buyLinks || {})[btn.getAttribute('data-buy')];
    if (link) {
      btn.href = link;
      btn.removeAttribute('aria-disabled');
    } else {
      btn.textContent = 'Online ordering coming soon';
      btn.setAttribute('aria-disabled', 'true');
      btn.removeAttribute('href');
    }
  });

  // Social links: <a data-social="instagram">. Hidden when empty.
  document.querySelectorAll('[data-social]').forEach(function (a) {
    var url = (cfg.social || {})[a.getAttribute('data-social')];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.hidden = true; }
  });
  document.querySelectorAll('[data-social-group]').forEach(function (group) {
    var anyVisible = Array.prototype.some.call(group.querySelectorAll('[data-social]'), function (a) { return !a.hidden; });
    if (!anyVisible) group.hidden = true;
  });

  // Contact email: <a data-contact>
  document.querySelectorAll('[data-contact]').forEach(function (a) {
    if (cfg.contactEmail) { a.href = 'mailto:' + cfg.contactEmail; }
    else { a.hidden = true; }
  });

  // Newsletter form
  document.querySelectorAll('form[data-signup]').forEach(function (form) {
    var note = form.querySelector('.form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!email.value || !email.checkValidity()) {
        note.textContent = 'That email looks off. Try again, patriot.';
        email.focus();
        return;
      }
      if (!cfg.newsletterAction) {
        note.textContent = 'Signups open soon. Check back shortly.';
        return;
      }
      note.textContent = 'Sending…';
      fetch(cfg.newsletterAction, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        form.reset();
        note.textContent = 'You’re in. Welcome to the crew.';
      }).catch(function () {
        note.textContent = 'Something went wrong. Please try again.';
      });
    });
  });

  // ===== Scroll animations: reveals, count-up stats, stamp slams =====
  // Only touches things below the fold at load, so nothing flashes or hides
  // if the script fails. Skipped entirely for "reduce motion" users.
  (function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var vh = window.innerHeight;
    var below = function (el) { return el.getBoundingClientRect().top > vh * 0.92; };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        if (el.classList.contains('og-reveal')) {
          el.classList.add('is-in');
          // Hand control back to the element's own hover transitions once revealed
          setTimeout(function () { el.classList.remove('og-reveal', 'is-in'); el.style.transitionDelay = ''; }, 1400);
        }
        if (el.hasAttribute('data-count')) countUp(el);
        if (el.classList.contains('og-stamp-pre')) el.classList.add('og-stamp-in');
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    // 1. Fade/slide reveals, staggered within each group
    var sel = '.section-head, .news-card, .flavor-card, .stats, .split > :not(.stamp-wrap), .cta-card, .og-faq-head, .og-faq-item, ' +
              '.product-media, .product-info, .nutrition-wrap > *, .xsell a, .memorial .container > *, .closing .container > *, ' +
              '.section > .container > h2.display';
    var seen = [];
    document.querySelectorAll(sel).forEach(function (el) {
      if (seen.indexOf(el) > -1 || !below(el)) return;
      seen.push(el);
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(sel); });
      var i = sibs.indexOf(el);
      el.style.transitionDelay = Math.min(i, 4) * 90 + 'ms';
      el.classList.add('og-reveal');
      io.observe(el);
    });

    // 2. Count-up stats (153mg, 0g, 42, 16oz)
    function countUp(el) {
      var node = el.firstChild, end = parseFloat(el.getAttribute('data-count')), t0 = null, dur = 1400;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        node.nodeValue = Math.round(end * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    document.querySelectorAll('.stat-value').forEach(function (el) {
      var node = el.firstChild;
      if (!node || node.nodeType !== 3 || !/^\s*\d+\s*$/.test(node.nodeValue) || !below(el)) return;
      el.setAttribute('data-count', node.nodeValue.trim());
      node.nodeValue = '0';
      io.observe(el);
    });

    // 3. "Approved" stamp slams down when it scrolls into view
    document.querySelectorAll('.stamp-wrap').forEach(function (el) {
      if (!below(el)) return;
      el.classList.add('og-stamp-pre');
      io.observe(el);
    });
  })();

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
