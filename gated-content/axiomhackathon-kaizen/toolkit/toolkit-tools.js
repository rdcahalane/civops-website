/* CESMII i3X Hackathon Kaizen — interactive working tools.
   Vanilla JS, no build step. Each tool persists to localStorage under one
   shared key so "export all" / "import all" round-trips the whole toolkit. */

const TK_STORE_KEY = 'hk-toolkit-v1';

function tkLoadStore() {
  try {
    const raw = localStorage.getItem(TK_STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Toolkit storage unreadable, starting fresh.', e);
    return {};
  }
}

function tkSaveStore(store) {
  localStorage.setItem(TK_STORE_KEY, JSON.stringify(store));
}

function tkGet(toolKey, fallback) {
  const store = tkLoadStore();
  return store[toolKey] !== undefined ? store[toolKey] : fallback;
}

function tkSet(toolKey, data) {
  const store = tkLoadStore();
  store[toolKey] = data;
  tkSaveStore(store);
}

function tkDownload(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function tkCsvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function tkRowsToCsv(columns, rows) {
  const header = columns.map(c => tkCsvEscape(c.label)).join(',');
  const lines = rows.map(row => columns.map(c => tkCsvEscape(row[c.key])).join(','));
  return [header, ...lines].join('\n');
}

/* ── generic editable table (Decision Log, Exception Log, Reuse Register,
   Validation Scorecard, Event Run Sheet) ── */
function tkInitEditableTable(config) {
  const {
    containerId, toolKey, columns, defaultRows, fixedRows, idPrefix, title
  } = config;
  const root = document.getElementById(containerId);
  if (!root) return;

  let rows = tkGet(toolKey, null);
  if (!rows) {
    rows = defaultRows.map(r => ({ ...r }));
  }

  function persist() {
    tkSet(toolKey, rows);
  }

  function makeCell(row, col, rowIndex) {
    const td = document.createElement('td');
    if (col.readonly) {
      td.className = 'tk-readonly';
      td.textContent = row[col.key] ?? '';
      return td;
    }
    let input;
    if (col.type === 'select') {
      input = document.createElement('select');
      (col.options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt; o.textContent = opt;
        input.appendChild(o);
      });
    } else if (col.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 2;
    } else {
      input = document.createElement('input');
      input.type = col.type === 'date' ? 'date' : 'text';
    }
    input.value = row[col.key] ?? '';
    input.addEventListener('input', () => {
      row[col.key] = input.value;
      persist();
    });
    input.addEventListener('change', () => {
      row[col.key] = input.value;
      persist();
    });
    td.appendChild(input);
    return td;
  }

  function render() {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'tk-editable-table-wrap';
    const table = document.createElement('table');
    table.className = 'tk-edit';
    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    columns.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c.label;
      trh.appendChild(th);
    });
    if (!fixedRows) {
      const th = document.createElement('th');
      th.textContent = '';
      trh.appendChild(th);
    }
    thead.appendChild(trh);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    rows.forEach((row, i) => {
      const tr = document.createElement('tr');
      columns.forEach(col => tr.appendChild(makeCell(row, col, i)));
      if (!fixedRows) {
        const tdDel = document.createElement('td');
        tdDel.className = 'tk-row-del';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.title = 'Remove row';
        btn.textContent = '✕';
        btn.addEventListener('click', () => {
          rows.splice(i, 1);
          persist();
          render();
        });
        tdDel.appendChild(btn);
        tr.appendChild(tdDel);
      }
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    root.appendChild(wrap);

    if (!fixedRows) {
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'tk-btn tk-add-row';
      const n = rows.length + 1;
      addBtn.textContent = '+ Add row';
      addBtn.addEventListener('click', () => {
        const blank = {};
        columns.forEach(c => { blank[c.key] = c.key === 'id' ? `${idPrefix}${n}` : ''; });
        rows.push(blank);
        persist();
        render();
      });
      root.appendChild(addBtn);
    }
  }

  render();

  return {
    exportCsv: () => tkDownload(`${title.replace(/\s+/g, '_')}.csv`, tkRowsToCsv(columns, rows)),
    reset: () => { rows = defaultRows.map(r => ({ ...r })); persist(); render(); },
    getRows: () => rows,
  };
}

/* ── weighted-score calculator (Readiness Screen) ── */
function tkInitReadiness(containerId, dimensions) {
  const root = document.getElementById(containerId);
  if (!root) return;
  const toolKey = 'readiness';
  let scores = tkGet(toolKey, {});

  function persist() { tkSet(toolKey, scores); }

  function computeTotal() {
    let total = 0;
    dimensions.forEach(d => {
      const s = Number(scores[d.key]) || 0;
      total += d.weight * (s / 5);
    });
    return total;
  }

  function criticalFloorBreach() {
    return dimensions.filter(d => d.critical && (Number(scores[d.key]) || 0) > 0 && Number(scores[d.key]) < 3);
  }

  function render() {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'tk-editable-table-wrap';
    const table = document.createElement('table');
    table.className = 'tk-edit';
    table.innerHTML = `<thead><tr>
      <th>Dimension</th><th>Diagnostic question</th><th>Weight</th><th>Score 1–5</th><th>Weighted</th><th>Evidence / note</th><th>Owner</th>
    </tr></thead>`;
    const tbody = document.createElement('tbody');
    dimensions.forEach(d => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.className = 'tk-readonly';
      tdName.textContent = d.label + (d.critical ? ' ★' : '');
      tr.appendChild(tdName);

      const tdQ = document.createElement('td');
      tdQ.className = 'tk-readonly';
      tdQ.textContent = d.question;
      tr.appendChild(tdQ);

      const tdW = document.createElement('td');
      tdW.className = 'tk-readonly';
      tdW.textContent = d.weight + '%';
      tr.appendChild(tdW);

      const tdScore = document.createElement('td');
      tdScore.className = 'tk-num';
      const input = document.createElement('input');
      input.type = 'text';
      input.inputMode = 'numeric';
      input.className = 'tk-score';
      input.value = scores[d.key] ?? '';
      input.placeholder = '1–5';
      input.addEventListener('input', () => {
        let v = input.value.replace(/[^0-9]/g, '');
        if (v && Number(v) > 5) v = '5';
        input.value = v;
        scores[d.key] = v;
        persist();
        renderBanner();
        tdWeighted.textContent = v ? (d.weight * (Number(v) / 5)).toFixed(1) : '—';
      });
      tdScore.appendChild(input);
      tr.appendChild(tdScore);

      const tdWeighted = document.createElement('td');
      tdWeighted.className = 'tk-weighted';
      tdWeighted.textContent = scores[d.key] ? (d.weight * (Number(scores[d.key]) / 5)).toFixed(1) : '—';
      tr.appendChild(tdWeighted);

      const tdNote = document.createElement('td');
      const noteInput = document.createElement('input');
      noteInput.type = 'text';
      noteInput.value = (scores[d.key + '__note']) ?? '';
      noteInput.addEventListener('input', () => { scores[d.key + '__note'] = noteInput.value; persist(); });
      tdNote.appendChild(noteInput);
      tr.appendChild(tdNote);

      const tdOwner = document.createElement('td');
      const ownerInput = document.createElement('input');
      ownerInput.type = 'text';
      ownerInput.value = (scores[d.key + '__owner']) ?? '';
      ownerInput.addEventListener('input', () => { scores[d.key + '__owner'] = ownerInput.value; persist(); });
      tdOwner.appendChild(ownerInput);
      tr.appendChild(tdOwner);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    root.appendChild(wrap);

    const legend = document.createElement('p');
    legend.style.cssText = 'font-size:12px;color:var(--muted);margin-top:8px';
    legend.textContent = '★ = critical dimension. A score below 3 here normally requires roadmapping or prerequisite work, regardless of total.';
    root.appendChild(legend);

    renderBanner();
  }

  let bannerEl;
  function renderBanner() {
    const total = computeTotal();
    const breaches = criticalFloorBreach();
    let band = 'stop', verdict = 'Not enough scored yet to recommend a path.';
    if (Object.keys(scores).some(k => !k.includes('__'))) {
      if (total >= 80) { band = 'go'; verdict = 'Proceed to challenge framing, subject to critical-dimension review.'; }
      else if (total >= 60) { band = 'revise'; verdict = 'Focused roadmapping or prerequisite sprint before event commitment.'; }
      else { band = 'stop'; verdict = 'Do not schedule the event; resolve ownership, access, or problem definition first.'; }
    }
    if (breaches.length) {
      band = 'stop';
      verdict = `Critical-dimension floor breached (${breaches.map(b => b.label).join(', ')}) — below 3 overrides the total score.`;
    }
    if (!bannerEl) {
      bannerEl = document.createElement('div');
      root.parentNode.insertBefore(bannerEl, root);
    }
    bannerEl.className = `tk-score-banner ${band}`;
    bannerEl.innerHTML = `
      <div class="tk-total">${total.toFixed(1)}<small>Weighted readiness / 100</small></div>
      <div class="tk-verdict">${verdict}</div>
    `;
  }

  render();

  return {
    exportCsv: () => {
      const cols = [
        { key: 'dimension', label: 'Dimension' }, { key: 'weight', label: 'Weight' },
        { key: 'score', label: 'Score' }, { key: 'weighted', label: 'Weighted' },
        { key: 'note', label: 'Evidence / note' }, { key: 'owner', label: 'Owner' },
      ];
      const rows = dimensions.map(d => ({
        dimension: d.label, weight: d.weight + '%',
        score: scores[d.key] ?? '', weighted: scores[d.key] ? (d.weight * (Number(scores[d.key]) / 5)).toFixed(1) : '',
        note: scores[d.key + '__note'] ?? '', owner: scores[d.key + '__owner'] ?? '',
      }));
      tkDownload('Readiness_Screen.csv', tkRowsToCsv(cols, rows));
    },
    reset: () => { scores = {}; persist(); render(); },
  };
}

/* ── weighted-score calculator (Challenge Selection matrix) ── */
function tkInitChallengeMatrix(containerId, criteria) {
  const root = document.getElementById(containerId);
  if (!root) return;
  const toolKey = 'challenge';
  let candidates = tkGet(toolKey, null);
  if (!candidates) {
    candidates = Array.from({ length: 6 }, (_, i) => ({ name: `Candidate ${i + 1}`, owner: '', comments: '' }));
  }

  function persist() { tkSet(toolKey, candidates); }

  function weightedTotal(c) {
    let total = 0;
    criteria.forEach(cr => { total += cr.weight * ((Number(c[cr.key]) || 0) / 5); });
    return total;
  }

  // Cell refs kept live so a score keystroke can update totals/ranks in
  // place instead of rebuilding the table (which would drop input focus).
  let totalCells = [];
  let rankCells = [];

  function recomputeTotals() {
    const ranked = candidates.map((c, i) => ({ i, total: weightedTotal(c) }))
      .sort((a, b) => b.total - a.total);
    const rankOf = {};
    ranked.forEach((r, pos) => { rankOf[r.i] = r.total > 0 ? pos + 1 : '—'; });
    candidates.forEach((c, i) => {
      const total = weightedTotal(c);
      if (totalCells[i]) totalCells[i].textContent = total > 0 ? total.toFixed(1) : '—';
      if (rankCells[i]) rankCells[i].textContent = rankOf[i];
    });
  }

  function render() {
    root.innerHTML = '';
    totalCells = [];
    rankCells = [];
    const wrap = document.createElement('div');
    wrap.className = 'tk-editable-table-wrap';
    const table = document.createElement('table');
    table.className = 'tk-edit';
    const thead = document.createElement('tr');
    thead.innerHTML = `<th>Candidate</th><th>Owner</th>` +
      criteria.map(c => `<th title="${c.question}">${c.label}<br><span style="opacity:.65;font-weight:700">${c.weight}%</span></th>`).join('') +
      `<th>Weighted total</th><th>Rank</th><th>Comments</th><th></th>`;
    table.appendChild(document.createElement('thead')).appendChild(thead);

    const tbody = document.createElement('tbody');
    const ranked = candidates.map((c, i) => ({ i, total: weightedTotal(c) }))
      .sort((a, b) => b.total - a.total);
    const rankOf = {};
    ranked.forEach((r, pos) => { rankOf[r.i] = r.total > 0 ? pos + 1 : '—'; });

    candidates.forEach((c, i) => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = c.name ?? '';
      nameInput.addEventListener('input', () => { c.name = nameInput.value; persist(); });
      tdName.appendChild(nameInput);
      tr.appendChild(tdName);

      const tdOwner = document.createElement('td');
      const ownerInput = document.createElement('input');
      ownerInput.type = 'text';
      ownerInput.value = c.owner ?? '';
      ownerInput.addEventListener('input', () => { c.owner = ownerInput.value; persist(); });
      tdOwner.appendChild(ownerInput);
      tr.appendChild(tdOwner);

      criteria.forEach(cr => {
        const td = document.createElement('td');
        td.className = 'tk-num';
        const input = document.createElement('input');
        input.type = 'text';
        input.inputMode = 'numeric';
        input.className = 'tk-score';
        input.value = c[cr.key] ?? '';
        input.placeholder = '1–5';
        input.addEventListener('input', () => {
          let v = input.value.replace(/[^0-9]/g, '');
          if (v && Number(v) > 5) v = '5';
          input.value = v;
          c[cr.key] = v;
          persist();
          recomputeTotals();
        });
        td.appendChild(input);
        tr.appendChild(td);
      });

      const tdTotal = document.createElement('td');
      tdTotal.className = 'tk-weighted';
      tdTotal.textContent = weightedTotal(c) > 0 ? weightedTotal(c).toFixed(1) : '—';
      tr.appendChild(tdTotal);
      totalCells[i] = tdTotal;

      const tdRank = document.createElement('td');
      tdRank.className = 'tk-rank';
      tdRank.textContent = rankOf[i];
      tr.appendChild(tdRank);
      rankCells[i] = tdRank;

      const tdComments = document.createElement('td');
      const cInput = document.createElement('input');
      cInput.type = 'text';
      cInput.value = c.comments ?? '';
      cInput.addEventListener('input', () => { c.comments = cInput.value; persist(); });
      tdComments.appendChild(cInput);
      tr.appendChild(tdComments);

      const tdDel = document.createElement('td');
      tdDel.className = 'tk-row-del';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = '✕';
      btn.title = 'Remove candidate';
      btn.addEventListener('click', () => { candidates.splice(i, 1); persist(); render(); });
      tdDel.appendChild(btn);
      tr.appendChild(tdDel);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    root.appendChild(wrap);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'tk-btn tk-add-row';
    addBtn.textContent = '+ Add candidate';
    addBtn.addEventListener('click', () => {
      candidates.push({ name: `Candidate ${candidates.length + 1}`, owner: '', comments: '' });
      persist();
      render();
    });
    root.appendChild(addBtn);
  }

  render();

  return {
    exportCsv: () => {
      const cols = [{ key: 'name', label: 'Candidate' }, { key: 'owner', label: 'Owner' },
        ...criteria.map(c => ({ key: c.key, label: c.label })),
        { key: 'total', label: 'Weighted total' }, { key: 'comments', label: 'Comments' }];
      const rows = candidates.map(c => ({ ...c, total: weightedTotal(c).toFixed(1) }));
      tkDownload('Challenge_Selection.csv', tkRowsToCsv(cols, rows));
    },
    reset: () => {
      candidates = Array.from({ length: 6 }, (_, i) => ({ name: `Candidate ${i + 1}`, owner: '', comments: '' }));
      persist(); render();
    },
  };
}

/* ── tab switching ── */
function tkInitTabs() {
  document.querySelectorAll('[data-tk-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.tkTab;
      document.querySelectorAll('[data-tk-tab]').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('[data-tk-pane]').forEach(p => p.classList.toggle('active', p.dataset.tkPane === key));
      history.replaceState(null, '', `#${key}`);
    });
  });
  const fromHash = location.hash.replace('#', '');
  if (fromHash) {
    const btn = document.querySelector(`[data-tk-tab="${fromHash}"]`);
    if (btn) btn.click();
  }
}

/* ── export / import everything ── */
function tkExportAll() {
  tkDownload('hackathon-kaizen-toolkit-backup.json', JSON.stringify(tkLoadStore(), null, 2));
}

function tkImportAll(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      tkSaveStore(data);
      onDone && onDone(true);
    } catch (e) {
      console.error(e);
      onDone && onDone(false);
    }
  };
  reader.readAsText(file);
}
