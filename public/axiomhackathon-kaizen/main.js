document.addEventListener('DOMContentLoaded', () => {
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

  // ── active section highlight in the in-page nav ──
  const navLinks = Array.from(document.querySelectorAll('.page-nav a'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const byId = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = byId.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('current'));
          link.classList.add('current');
        }
      });
    }, { threshold: 0, rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(el => sio.observe(el));
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
