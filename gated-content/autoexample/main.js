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

  const ids = ['downtime', 'response', 'repeat'];
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const update = () => {
    const downtime = +document.getElementById('downtime')?.value || 6;
    const response = +document.getElementById('response')?.value || 18;
    const repeat = +document.getElementById('repeat')?.value || 14;
    const annual = downtime * 180000 + response * 22000 + repeat * 12000;
    const payback = Math.max(4, Math.round(10 - (downtime / 2 + response / 9 + repeat / 10)));

    ids.forEach(id => {
      const out = document.querySelector(`[data-output="${id}"]`);
      const input = document.getElementById(id);
      if (out && input) out.textContent = input.value + '%';
    });

    const annualOut = document.getElementById('roiAnnual');
    const paybackOut = document.getElementById('roiPayback');
    if (annualOut) annualOut.textContent = money.format(annual);
    if (paybackOut) paybackOut.textContent = payback + ' months';
  };

  ids.forEach(id => document.getElementById(id)?.addEventListener('input', update));
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
