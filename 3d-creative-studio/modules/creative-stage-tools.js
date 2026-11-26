/* ============================================================================
   3D CREATIVE STUDIO v2.0 — MODULE 3: VIEWPORT, BACKDROPS, PALETTES & LIST EDITOR
   Ideas #4 (Desktop/Tablet/Mobile Viewport + Stage Backdrop + Fullscreen),
   #5 (Global 3D Stage Scale & Speed Tuners),
   #7 (10 Curated Color Palettes + Swap + Dice Surprise),
   #10 (Smart Multi-Item List Builder for sections/menus/charts)
   ============================================================================ */
(function () {
  'use strict';

  const CURATED_PALETTES = [
    { name: 'Cyber Neon',     c1: '#00f0ff', c2: '#ff007f' },
    { name: 'Luxury Gold',    c1: '#f59e0b', c2: '#fef08a' },
    { name: 'Matrix Acid',    c1: '#10b981', c2: '#00f0ff' },
    { name: 'Synthwave 84',   c1: '#a855f7', c2: '#ff007f' },
    { name: 'Volcanic Ember', c1: '#ef4444', c2: '#f97316' },
    { name: 'Arctic Glass',   c1: '#38bdf8', c2: '#e2e8f0' },
    { name: 'Hyper Violet',   c1: '#8b5cf6', c2: '#22d3ee' },
    { name: 'Solar Plasma',   c1: '#eab308', c2: '#ec4899' },
    { name: 'Bio Lime',       c1: '#84cc16', c2: '#14b8a6' },
    { name: 'Crimson Holo',   c1: '#f43f5e', c2: '#6366f1' }
  ];

  const LIST_COMPONENTS = new Set([
    'bar_chart_3d', 'coverflow_3d', 'isometric_stack_menu', 'macos_dock_menu',
    'fluid_tab_menu', 'radial_orbit_menu', 'testimonial_deck_3d', 'cyber_calendar_3d',
    'product_hotspots_3d', 'features_grid_3d', 'stats_counter_3d', 'pricing_section_3d',
    'how_it_works_3d', 'partner_logos_3d', 'bento_grid_3d'
  ]);

  function applyViewportSize(mode) {
    const core = window.__CreativeStudioCore;
    const iframe = core?.els?.iframe;
    const bodyEl = document.querySelector('.preview-body');
    if (!core || !iframe || !bodyEl) return;

    core.stageSettings.viewport = mode;
    document.querySelectorAll('.vp-btn').forEach(b => b.classList.toggle('active', b.dataset.vp === mode));

    bodyEl.classList.remove('vp-tablet', 'vp-mobile');
    if (mode === 'tablet') {
      bodyEl.classList.add('vp-tablet');
      iframe.style.width = '768px';
      iframe.style.maxWidth = '100%';
    } else if (mode === 'mobile') {
      bodyEl.classList.add('vp-mobile');
      iframe.style.width = '375px';
      iframe.style.maxWidth = '100%';
    } else {
      iframe.style.width = '100%';
      iframe.style.maxWidth = '100%';
    }
  }

  function applyColorPair(c1, c2) {
    const core = window.__CreativeStudioCore;
    if (!core) return;
    if (core.els.colorPrimary) {
      core.els.colorPrimary.value = c1;
      if (core.els.valColorPrimary) core.els.valColorPrimary.textContent = c1.toUpperCase();
    }
    if (core.els.colorSecondary) {
      core.els.colorSecondary.value = c2;
      if (core.els.valColorSecondary) core.els.valColorSecondary.textContent = c2.toUpperCase();
    }
    core.updatePreview();
  }

  function renderSmartListEditor(key) {
    const core = window.__CreativeStudioCore;
    const wrap = document.getElementById('smart-list-group');
    const chipsEl = document.getElementById('smart-list-chips');
    if (!core || !wrap || !chipsEl) return;

    const show = LIST_COMPONENTS.has(key);
    wrap.style.display = show ? 'flex' : 'none';
    if (!show) return;

    const raw = core.els.inputText?.value || '';
    const items = raw.split(',').map(s => s.trim()).filter(Boolean);
    chipsEl.textContent = '';

    items.forEach((item, idx) => {
      const chip = document.createElement('div');
      chip.className = 'smart-chip';

      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'smart-chip-input';
      inp.value = item;
      inp.addEventListener('input', () => {
        const all = Array.from(chipsEl.querySelectorAll('.smart-chip-input')).map(i => i.value.trim()).filter(Boolean);
        if (core.els.inputText) {
          core.els.inputText.value = all.join(', ');
          core.updatePreview();
        }
      });

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'smart-chip-del';
      del.textContent = '×';
      del.title = 'Remove';
      del.addEventListener('click', () => {
        const next = items.filter((_, i) => i !== idx);
        if (core.els.inputText) core.els.inputText.value = next.join(', ');
        renderSmartListEditor(key);
        core.updatePreview();
      });

      chip.append(inp, del);
      chipsEl.appendChild(chip);
    });
  }

  function bindStageTools() {
    const core = window.__CreativeStudioCore;
    if (!core) return;

    // 1. Render 10 Curated Palettes
    const palWrap = document.getElementById('curated-palettes-row');
    if (palWrap) {
      palWrap.textContent = '';
      CURATED_PALETTES.forEach(p => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'palette-dot-btn';
        btn.title = `${p.name} (${p.c1} / ${p.c2})`;
        btn.style.background = `linear-gradient(135deg, ${p.c1} 50%, ${p.c2} 50%)`;
        btn.addEventListener('click', () => applyColorPair(p.c1, p.c2));
        palWrap.appendChild(btn);
      });
    }

    // 2. Swap Colors & Dice Randomizer
    const btnSwap = document.getElementById('btn-swap-colors');
    if (btnSwap) {
      btnSwap.addEventListener('click', () => {
        const c1 = core.els.colorPrimary?.value || '#00f0ff';
        const c2 = core.els.colorSecondary?.value || '#ff007f';
        applyColorPair(c2, c1);
      });
    }
    const btnSurprise = document.getElementById('btn-surprise-mix');
    if (btnSurprise && window.uiTemplates) {
      btnSurprise.addEventListener('click', () => {
        const allKeys = Object.keys(window.uiTemplates);
        const pickKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        const pal = CURATED_PALETTES[Math.floor(Math.random() * CURATED_PALETTES.length)];
        core.selectComponentByKey(pickKey);
        applyColorPair(pal.c1, pal.c2);
        core.showToast(`🎲 ${window.uiTemplates[pickKey].name?.[core.getLang()] || pickKey}`, 'success');
      });
    }

    // 3. Smart List Builder "+ Add Item"
    const btnAdd = document.getElementById('btn-smart-list-add');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const key = core.els.selectComponent?.value;
        const curr = (core.els.inputText?.value || '').trim();
        const extra = key === 'bar_chart_3d' ? '88' : 'New Item 3D';
        if (core.els.inputText) {
          core.els.inputText.value = curr ? `${curr}, ${extra}` : extra;
          renderSmartListEditor(key);
          core.updatePreview();
        }
      });
    }
    if (core.els.inputText) {
      core.els.inputText.addEventListener('input', () => {
        renderSmartListEditor(core.els.selectComponent?.value);
      });
    }

    // 4. Global 3D Scale & Speed Tuners
    const sSlider = document.getElementById('range-stage-scale');
    const sVal = document.getElementById('val-stage-scale');
    if (sSlider) {
      sSlider.addEventListener('input', (e) => {
        core.stageSettings.scale = parseFloat(e.target.value) || 1.0;
        if (sVal) sVal.textContent = core.stageSettings.scale.toFixed(1) + 'x';
        core.updatePreview();
      });
    }
    const spSlider = document.getElementById('range-stage-speed');
    const spVal = document.getElementById('val-stage-speed');
    if (spSlider) {
      spSlider.addEventListener('input', (e) => {
        core.stageSettings.speed = parseFloat(e.target.value) || 1.0;
        if (spVal) spVal.textContent = core.stageSettings.speed.toFixed(1) + 'x';
        core.updatePreview();
      });
    }

    // 5. Viewport & Backdrop & Fullscreen buttons
    document.querySelectorAll('.vp-btn').forEach(btn => {
      btn.addEventListener('click', () => applyViewportSize(btn.dataset.vp));
    });
    const bgSel = document.getElementById('select-stage-backdrop');
    if (bgSel) {
      bgSel.addEventListener('change', (e) => {
        core.stageSettings.backdrop = e.target.value;
        core.updatePreview();
      });
    }
    const btnFs = document.getElementById('btn-stage-fullscreen');
    const previewPanel = document.querySelector('.preview-panel');
    if (btnFs && previewPanel) {
      btnFs.addEventListener('click', () => {
        previewPanel.classList.toggle('is-fullscreen');
        btnFs.classList.toggle('active', previewPanel.classList.contains('is-fullscreen'));
      });
    }

    renderSmartListEditor(core.els.selectComponent?.value);
  }

  const prevChanged = window.__CreativeStudioHooks.onComponentChanged;
  window.__CreativeStudioHooks.onComponentChanged = function (key, tpl) {
    if (typeof prevChanged === 'function') prevChanged(key, tpl);
    renderSmartListEditor(key);
  };

  const prevReady = window.__CreativeStudioHooks.onReady;
  window.__CreativeStudioHooks.onReady = function () {
    if (typeof prevReady === 'function') prevReady();
    bindStageTools();
  };

  window.__CreativeStageTools = { CURATED_PALETTES, applyViewportSize, applyColorPair };
})();
