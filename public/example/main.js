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
});
