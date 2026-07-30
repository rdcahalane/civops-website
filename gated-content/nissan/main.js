document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-build-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.dataset.buildBtn;
      document.querySelectorAll('[data-build-btn]').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('[data-build-pane]').forEach(p => p.classList.toggle('active', p.dataset.buildPane === step));
      const state = document.querySelector('[data-build-state]');
      if (state) state.dataset.buildState = step;
      document.querySelectorAll('[data-stage]').forEach(el => {
        const stages = el.dataset.stage.split(',');
        const visible = stages.includes(step) || stages.includes('all');
        el.classList.toggle('gone', !visible && !el.dataset.persist);
        el.classList.toggle('hide', !visible && !!el.dataset.persist);
        el.classList.toggle('highlight', visible);
      });
    });
  });

  document.querySelectorAll('[data-role-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.roleBtn;
      document.querySelectorAll('[data-role-btn]').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('[data-role-pane]').forEach(p => p.classList.toggle('active', p.dataset.rolePane === role));
    });
  });

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // Coefficients tied to "The Opportunity" OEE card economics:
  //   downtime  = shift-points of availability recovered × $200K/shift-point × 2 shifts
  //   response  = minutes of avg MTTR improvement per event × $35K/min-event
  //   repeat    = first-pass yield points improved × $175K/yield-point
  const DOWNTIME_RATE = 400000;  // $200K × 2 shifts
  const RESPONSE_RATE = 35000;   // $35K per minute per event
  const REPEAT_RATE   = 175000;  // $175K per yield point

  const UNITS = { downtime: 'pts', response: 'min', repeat: 'pts' };

  const update = () => {
    const downtime = +document.getElementById('downtime')?.value || 6;
    const response = +document.getElementById('response')?.value || 18;
    const repeat   = +document.getElementById('repeat')?.value   || 14;

    const annual = downtime * DOWNTIME_RATE + response * RESPONSE_RATE + repeat * REPEAT_RATE;
    const payback = Math.max(3, Math.round(18 - (downtime / 1.5 + response / 7 + repeat / 5)));

    ['downtime', 'response', 'repeat'].forEach(id => {
      const out = document.querySelector('[data-output="' + id + '"]');
      const input = document.getElementById(id);
      if (out && input) out.textContent = input.value + ' ' + UNITS[id];
    });

    const annualOut = document.getElementById('roiAnnual');
    const paybackOut = document.getElementById('roiPayback');
    if (annualOut) annualOut.textContent = money.format(annual);
    if (paybackOut) paybackOut.textContent = payback + ' months';
  };

  ['downtime', 'response', 'repeat'].forEach(id => document.getElementById(id)?.addEventListener('input', update));
  update();

  // ── scroll progress bar ──
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);
  const setProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    bar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
  };
  document.addEventListener('scroll', setProgress, { passive: true });
  setProgress();

  // ── reveal-on-scroll ──
  const revealTargets = document.querySelectorAll('.hero, .page-intro, .section');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in'));
  }

  // ── mobile nav drawer ──
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.page-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('open');
      nav.classList.toggle('open', willOpen);
      toggle.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
