// CSS Grid & Apple-Style Bento Layout Builder (v2.0)

const BENTO_PRESETS = {
  saas: {
    cols: 4, rows: 3, gap: 14,
    tiles: [
      { id: 1, title: 'AI Engine Core', colSpan: 2, rowSpan: 2, color: '#00f0ff' },
      { id: 2, title: '99.99% Uptime', colSpan: 1, rowSpan: 1, color: '#10b981' },
      { id: 3, title: 'Global CDN', colSpan: 1, rowSpan: 1, color: '#8a2be2' },
      { id: 4, title: 'Real-Time Analytics', colSpan: 2, rowSpan: 1, color: '#f59e0b' },
      { id: 5, title: 'One-Click Deploy', colSpan: 4, rowSpan: 1, color: '#ec4899' }
    ]
  },
  portfolio: {
    cols: 3, rows: 3, gap: 16,
    tiles: [
      { id: 1, title: 'Featured Case Study', colSpan: 2, rowSpan: 2, color: '#38bdf8' },
      { id: 2, title: 'About Me', colSpan: 1, rowSpan: 1, color: '#a855f7' },
      { id: 3, title: 'Tech Stack', colSpan: 1, rowSpan: 1, color: '#10b981' },
      { id: 4, title: 'Open Source', colSpan: 1, rowSpan: 1, color: '#f59e0b' },
      { id: 5, title: 'Contact & Socials', colSpan: 2, rowSpan: 1, color: '#ec4899' }
    ]
  },
  analytics: {
    cols: 4, rows: 3, gap: 12,
    tiles: [
      { id: 1, title: 'Revenue KPI', colSpan: 1, rowSpan: 1, color: '#10b981' },
      { id: 2, title: 'Active Users', colSpan: 1, rowSpan: 1, color: '#00f0ff' },
      { id: 3, title: 'Conversion', colSpan: 1, rowSpan: 1, color: '#a855f7' },
      { id: 4, title: 'NPS Score', colSpan: 1, rowSpan: 1, color: '#f59e0b' },
      { id: 5, title: 'Traffic Time-Series', colSpan: 3, rowSpan: 2, color: '#3b82f6' },
      { id: 6, title: 'Live Events', colSpan: 1, rowSpan: 2, color: '#ec4899' }
    ]
  },
  commerce: {
    cols: 4, rows: 2, gap: 16,
    tiles: [
      { id: 1, title: 'Flagship Drop', colSpan: 2, rowSpan: 2, color: '#00f0ff' },
      { id: 2, title: 'New Arrivals', colSpan: 2, rowSpan: 1, color: '#f43f5e' },
      { id: 3, title: 'Audio Gear', colSpan: 1, rowSpan: 1, color: '#8b5cf6' },
      { id: 4, title: 'Accessories', colSpan: 1, rowSpan: 1, color: '#10b981' }
    ]
  }
};

function generateBentoExport(state) {
  const esc = (typeof window !== 'undefined' && window.HubUtils) ? window.HubUtils.escapeHtml : (s) => String(s || '');
  const cols = Math.max(1, Math.min(6, parseInt(state.cols, 10) || 4));
  const gap = Math.max(0, Math.min(48, parseInt(state.gap, 10) || 14));
  const tiles = Array.isArray(state.tiles) ? state.tiles : [];

  const cardCssRules = tiles.map((t, idx) => {
    const cSpan = Math.min(cols, Math.max(1, parseInt(t.colSpan, 10) || 1));
    const rSpan = Math.max(1, parseInt(t.rowSpan, 10) || 1);
    const col = /^#[0-9a-f]{6}$/i.test(t.color || '') ? t.color : '#00f0ff';
    return `.bento-card-${idx + 1} { grid-column: span ${cSpan}; grid-row: span ${rSpan}; border-color: ${col}44; background: linear-gradient(145deg, ${col}18, rgba(15, 23, 42, 0.85)); }`;
  }).join('\n  ');

  const cardsHtml = tiles.map((t, idx) => {
    return `  <article class="bento-card bento-card-${idx + 1}">\n    <h3>${esc(t.title || `Tile ${idx + 1}`)}</h3>\n    <p>Interactive Bento Grid item (${t.colSpan}×${t.rowSpan}).</p>\n  </article>`;
  }).join('\n');

  const watermark = state.includeWatermark && typeof window !== 'undefined' && window.HubUtils
    ? '\n' + window.HubUtils.getWatermarkCode()
    : '';

  return `<style>
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(${cols}, minmax(0, 1fr));
    grid-auto-rows: minmax(120px, auto);
    gap: ${gap}px;
    max-width: 1100px;
    margin: 0 auto;
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .bento-card {
    padding: 1.5rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.35);
  }
  .bento-card h3 { margin: 0 0 0.5rem 0; font-size: 1.15rem; font-weight: 700; }
  .bento-card p { margin: 0; font-size: 0.9rem; color: #94a3b8; }
  ${cardCssRules}
  @media (max-width: 768px) {
    .bento-grid { grid-template-columns: 1fr; }
    .bento-card { grid-column: span 1 !important; grid-row: span 1 !important; }
  }
</style>

<section class="bento-grid">
${cardsHtml}
</section>${watermark}`;
}

if (typeof window !== 'undefined') {
  window._bentoBuilder = { generateBentoExport };
}

document.addEventListener('DOMContentLoaded', () => {
  const inpCols = document.getElementById('inp-cols');
  const valCols = document.getElementById('val-cols');
  const inpRows = document.getElementById('inp-rows');
  const valRows = document.getElementById('val-rows');
  const inpGap = document.getElementById('inp-gap');
  const valGap = document.getElementById('val-gap');

  const liveGrid = document.getElementById('bento-live-grid');
  const statsPill = document.getElementById('bento-stats-pill');
  const outputCode = document.getElementById('output-code');
  const chkWatermark = document.getElementById('chk-watermark');

  const inspectorLabel = document.getElementById('inspector-label');
  const tileTitleInp = document.getElementById('tile-title-inp');
  const tileColorInp = document.getElementById('tile-color-inp');

  const btnAddTile = document.getElementById('btn-add-tile');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnDownloadHtml = document.getElementById('btn-download-html');

  const PALETTE = ['#00f0ff', '#8a2be2', '#10b981', '#f59e0b', '#ec4899', '#38bdf8'];
  let state = JSON.parse(JSON.stringify(BENTO_PRESETS.saas));
  let selectedId = state.tiles[0].id;
  let nextId = 100;

  function syncInspector() {
    const active = state.tiles.find(t => t.id === selectedId) || state.tiles[0];
    if (!active) {
      inspectorLabel.textContent = 'No tile';
      tileTitleInp.value = '';
      return;
    }
    selectedId = active.id;
    const idx = state.tiles.indexOf(active) + 1;
    inspectorLabel.textContent = `Tile #${idx} (${active.colSpan}×${active.rowSpan})`;
    tileTitleInp.value = active.title;
    tileColorInp.value = active.color;
  }

  function render() {
    valCols.textContent = state.cols;
    valRows.textContent = state.rows;
    valGap.textContent = state.gap;
    inpCols.value = state.cols;
    inpRows.value = state.rows;
    inpGap.value = state.gap;

    liveGrid.style.gridTemplateColumns = `repeat(${state.cols}, minmax(0, 1fr))`;
    liveGrid.style.gridAutoRows = 'minmax(82px, auto)';
    liveGrid.style.gap = `${state.gap}px`;
    liveGrid.innerHTML = '';

    state.tiles.forEach((tile) => {
      const cSpan = Math.min(state.cols, tile.colSpan);
      const rSpan = Math.min(state.rows, tile.rowSpan);
      tile.colSpan = cSpan;
      tile.rowSpan = rSpan;

      const el = document.createElement('div');
      el.className = 'bento-tile' + (tile.id === selectedId ? ' selected' : '');
      el.style.gridColumn = `span ${cSpan}`;
      el.style.gridRow = `span ${rSpan}`;
      el.style.borderRadius = '14px';
      el.style.background = `linear-gradient(145deg, ${tile.color}24, rgba(15, 23, 42, 0.85))`;
      el.style.borderColor = tile.id === selectedId ? '#00f0ff' : `${tile.color}55`;

      const head = document.createElement('div');
      const titleEl = document.createElement('div');
      titleEl.className = 'bento-tile-title';
      titleEl.textContent = tile.title;
      const metaEl = document.createElement('div');
      metaEl.className = 'bento-tile-meta';
      metaEl.textContent = `${cSpan} col × ${rSpan} row`;
      head.appendChild(titleEl);
      head.appendChild(metaEl);

      const actions = document.createElement('div');
      actions.className = 'bento-tile-actions';

      const btnCol = document.createElement('button');
      btnCol.type = 'button';
      btnCol.className = 'bento-mini-btn';
      btnCol.textContent = '↔ Col';
      btnCol.addEventListener('click', (e) => {
        e.stopPropagation();
        tile.colSpan = (tile.colSpan % state.cols) + 1;
        selectedId = tile.id;
        render();
      });

      const btnRow = document.createElement('button');
      btnRow.type = 'button';
      btnRow.className = 'bento-mini-btn';
      btnRow.textContent = '↕ Row';
      btnRow.addEventListener('click', (e) => {
        e.stopPropagation();
        tile.rowSpan = (tile.rowSpan % state.rows) + 1;
        selectedId = tile.id;
        render();
      });

      const btnDel = document.createElement('button');
      btnDel.type = 'button';
      btnDel.className = 'bento-mini-btn del';
      btnDel.textContent = '✕';
      btnDel.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.tiles.length <= 1) return;
        state.tiles = state.tiles.filter(t => t.id !== tile.id);
        if (selectedId === tile.id) selectedId = state.tiles[0].id;
        render();
      });

      actions.appendChild(btnCol);
      actions.appendChild(btnRow);
      actions.appendChild(btnDel);

      el.appendChild(head);
      el.appendChild(actions);
      el.addEventListener('click', () => {
        selectedId = tile.id;
        render();
      });

      liveGrid.appendChild(el);
    });

    syncInspector();
    statsPill.textContent = `${state.tiles.length} tiles • ${state.cols}×${state.rows}`;
    outputCode.value = generateBentoExport({
      cols: state.cols,
      rows: state.rows,
      gap: state.gap,
      tiles: state.tiles,
      includeWatermark: chkWatermark ? chkWatermark.checked : true
    });
  }

  inpCols.addEventListener('input', () => { state.cols = parseInt(inpCols.value, 10); render(); });
  inpRows.addEventListener('input', () => { state.rows = parseInt(inpRows.value, 10); render(); });
  inpGap.addEventListener('input', () => { state.gap = parseInt(inpGap.value, 10); render(); });
  if (chkWatermark) chkWatermark.addEventListener('change', render);

  tileTitleInp.addEventListener('input', () => {
    const active = state.tiles.find(t => t.id === selectedId);
    if (!active) return;
    active.title = tileTitleInp.value || 'Tile';
    render();
  });

  tileColorInp.addEventListener('input', () => {
    const active = state.tiles.find(t => t.id === selectedId);
    if (!active) return;
    active.color = tileColorInp.value;
    render();
  });

  btnAddTile.addEventListener('click', () => {
    if (state.tiles.length >= 16) {
      window.HubUtils.showToast(currentLang === 'en' ? 'Maximum 16 tiles reached.' : 'Maximum 16 tuiles atteint.', 'warn');
      return;
    }
    const id = ++nextId;
    const color = PALETTE[state.tiles.length % PALETTE.length];
    state.tiles.push({ id, title: `Feature #${state.tiles.length + 1}`, colSpan: 1, rowSpan: 1, color });
    selectedId = id;
    render();
  });

  document.querySelectorAll('#bento-presets .preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#bento-presets .preset-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = BENTO_PRESETS[btn.getAttribute('data-preset')];
      if (!preset) return;
      state = JSON.parse(JSON.stringify(preset));
      selectedId = state.tiles[0].id;
      render();
    });
  });

  btnCopyCode.addEventListener('click', () => {
    const msg = (translations[currentLang] && translations[currentLang].success_copy) || 'Copied!';
    window.HubUtils.copyText(outputCode.value, msg);
  });

  btnDownloadHtml.addEventListener('click', () => {
    const doc = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bento Grid Layout — IA Code Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>body { margin: 0; padding: 2rem; min-height: 100vh; background: #05050a; color: #fff; }</style>
</head>
<body>
${outputCode.value}
</body>
</html>`;
    window.HubUtils.safeDownloadText(doc, 'bento-grid-layout.html', 'text/html;charset=utf-8');
    window.HubUtils.showToast(currentLang === 'en' ? '📥 Bento HTML downloaded!' : '📥 Bento HTML téléchargé !', 'success');
  });

  render();
});
