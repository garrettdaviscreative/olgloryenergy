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

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
