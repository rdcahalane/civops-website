(function () {
  var LABELS = {
    plant:   'Plant Management',
    ops:     'Operations Management',
    quality: 'Quality Management',
    itot:    'IT / OT Management',
    maint:   'Maintenance Management'
  };

  // Which nav hrefs to highlight per role
  var NAV_MAP = {
    plant:   ['index.html', 'benchmarking.html', 'journey.html', 'roi.html'],
    ops:     ['index.html', 'journey.html', 'ops-cockpit.html', 'roi.html'],
    quality: ['journey.html', 'ops-cockpit.html', 'asset-health.html'],
    itot:    ['architecture.html', 'detail-design.html', 'technology.html', 'poc.html'],
    maint:   ['cockpit.html', 'asset-health.html', 'architecture.html', 'detail-design.html']
  };

  var KEY = 'civops_role';

  function getRole() { return localStorage.getItem(KEY) || ''; }
  function saveRole(r) { if (r) localStorage.setItem(KEY, r); else localStorage.removeItem(KEY); }

  function clearAll() {
    var bar = document.getElementById('civops-role-bar');
    if (bar) bar.remove();
    document.querySelectorAll('.role-nav-active').forEach(function (el) { el.classList.remove('role-nav-active'); });
    document.querySelectorAll('.role-highlight').forEach(function (el) { el.classList.remove('role-highlight'); });
    document.querySelectorAll('.role-section-chip').forEach(function (el) { el.remove(); });
  }

  function applyRole(role) {
    clearAll();
    if (!role || !LABELS[role]) return;
    var label = LABELS[role];

    // 1 — Role bar
    var bar = document.createElement('div');
    bar.id = 'civops-role-bar';
    bar.className = 'civops-role-bar';
    bar.innerHTML = 'Viewing as : <strong>' + label + '</strong>&ensp;&middot;&ensp;<a href="index.html#role-select">Change role</a>';
    var header = document.querySelector('header.site-header');
    if (header) header.insertAdjacentElement('afterend', bar);

    // 2 — Nav highlights
    document.querySelectorAll('.page-nav a').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('?')[0].split('#')[0];
      if (NAV_MAP[role] && NAV_MAP[role].indexOf(href) !== -1) {
        link.classList.add('role-nav-active');
      }
    });

    // 3 — Section highlights
    document.querySelectorAll('[data-role]').forEach(function (el) {
      var roles = el.getAttribute('data-role').split(',').map(function (r) { return r.trim(); });
      if (roles.indexOf(role) !== -1) {
        el.classList.add('role-highlight');
        var chip = document.createElement('div');
        chip.className = 'role-section-chip';
        chip.innerHTML = '<span class="role-chip-star">&#9733;</span> Recommended for ' + label;
        // Insert chip inside .container so it gets proper padding
        var target = el.querySelector('.container') || el;
        target.insertBefore(chip, target.firstChild);
      }
    });
  }

  function init() {
    var role = getRole();
    if (role) applyRole(role);

    // Wire selector if present
    var sel = document.getElementById('role-selector');
    if (sel) {
      sel.value = role;
      sel.addEventListener('change', function () {
        saveRole(sel.value);
        applyRole(sel.value);
        updateClearBtn();
      });
    }

    // Wire clear button
    var clearBtn = document.getElementById('role-clear-btn');
    if (clearBtn) {
      updateClearBtn();
      clearBtn.addEventListener('click', function () {
        saveRole('');
        applyRole('');
        if (sel) sel.value = '';
        updateClearBtn();
      });
    }

    function updateClearBtn() {
      var btn = document.getElementById('role-clear-btn');
      if (btn) btn.style.display = getRole() ? 'inline-block' : 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.civopsRole = { set: function (r) { saveRole(r); applyRole(r); }, clear: function () { saveRole(''); applyRole(''); } };
})();
