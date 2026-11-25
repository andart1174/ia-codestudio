/**
 * Studio 3D/4D Pro v2.0 — Studio Shell UI
 * 1. Categorized Searchable Module Dock inside #se-tools-sidebar (with Favorites & Recents)
 * 2. Global Command Palette (Ctrl+K) searching all 80+ modules & Studio 2.0 Pro Tools
 * 3. Floating Glass Pro Tools Dock inside 3D Viewport for all 12 Flagship v2.0 Features
 */
(function () {
  'use strict';

  const PRO_TOOLS = [
    { id: 'ai-director', icon: '🤖', en: 'AI Director', fr: 'Directeur IA', color: '#a855f7', action: () => window.StudioAIDirector && window.StudioAIDirector.toggle() },
    { id: 'presets', icon: '🖼️', en: 'Templates', fr: 'Modèles', color: '#38bdf8', action: () => window.StudioPresets && window.StudioPresets.toggle() },
    { id: 'outliner', icon: '🌳', en: 'Outliner', fr: 'Hiérarchie', color: '#10b981', action: () => window.StudioOutliner && window.StudioOutliner.toggle() },
    { id: 'pbr-lab', icon: '🎨', en: 'PBR & HDRI', fr: 'PBR & HDRI', color: '#f59e0b', action: () => window.StudioPBRLab && window.StudioPBRLab.toggle() },
    { id: '4d-mod', icon: '🌀', en: '4D Lab', fr: 'Labo 4D', color: '#ec4899', action: () => window.Studio4DModifiers && window.Studio4DModifiers.toggle() },
    { id: 'csg', icon: '🧩', en: 'CSG & Array', fr: 'CSG & Grille', color: '#6366f1', action: () => window.StudioCSG && window.StudioCSG.toggle() },
    { id: 'physics', icon: '⚛️', en: 'Physics', fr: 'Physique', color: '#ef4444', action: () => window.StudioPhysics && window.StudioPhysics.toggle() },
    { id: 'timeline', icon: '🎬', en: 'Timeline', fr: 'Timeline', color: '#14b8a6', action: () => window.StudioTimeline && window.StudioTimeline.toggle() },
    { id: 'webar-print', icon: '📱', en: 'AR & 3D Print', fr: 'AR & Print 3D', color: '#0ea5e9', action: () => window.StudioWebARPrint && window.StudioWebARPrint.toggle() },
    { id: 'configurator', icon: '🛍️', en: 'E-Com Hotspots', fr: 'Configurateur', color: '#f97316', action: () => window.StudioConfigurator && window.StudioConfigurator.toggle() },
    { id: 'dev-export', icon: '💻', en: 'React / ESM', fr: 'React / ESM', color: '#22d3ee', action: () => window.StudioDevExport && window.StudioDevExport.toggle() }
  ];

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  function injectStyles() {
    if (document.getElementById('studio-shell-v2-css')) return;
    const s = document.createElement('style');
    s.id = 'studio-shell-v2-css';
    s.textContent = `
      /* Studio 2.0 Floating Pro Tools Dock */
      #studio-pro-dock {
        position: absolute; top: 12px; left: 292px; right: 14px; z-index: 24;
        display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
        pointer-events: none;
      }
      .studio-dock-pill {
        pointer-events: auto;
        display: inline-flex; align-items: center; gap: 5px;
        padding: 5px 10px; border-radius: 999px;
        background: rgba(13, 18, 37, 0.86); backdrop-filter: blur(12px);
        border: 1px solid rgba(148, 163, 184, 0.22);
        color: #e2e8f0; font-family: Inter, sans-serif; font-size: 11px; font-weight: 700;
        cursor: pointer; transition: all 0.16s ease; white-space: nowrap;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
      }
      .studio-dock-pill:hover {
        transform: translateY(-1px);
        border-color: var(--pill-col, #6366f1);
        background: rgba(30, 41, 59, 0.95);
        color: #fff;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
      }
      .studio-dock-pill.active {
        border-color: var(--pill-col, #6366f1);
        background: rgba(99, 102, 241, 0.28);
        color: #fff;
      }

      /* Sidebar Search & Category Filter */
      #studio-sidebar-filter {
        background: rgba(2, 6, 23, 0.65); border: 1px solid #1e293b;
        border-radius: 8px; padding: 8px; margin-bottom: 10px;
      }
      #studio-mod-search {
        width: 100%; box-sizing: border-box; padding: 7px 10px;
        background: #0f172a; border: 1px solid #334155; border-radius: 6px;
        color: #f1f5f9; font-size: 11px; outline: none; margin-bottom: 7px;
      }
      #studio-mod-search:focus { border-color: #6366f1; }
      .studio-cat-pills { display: flex; flex-wrap: wrap; gap: 4px; }
      .studio-cat-pill {
        padding: 3px 7px; border-radius: 999px; font-size: 9.5px; font-weight: 700;
        background: #1e293b; color: #94a3b8; border: 1px solid transparent; cursor: pointer;
      }
      .studio-cat-pill.active { background: rgba(99, 102, 241, 0.28); color: #c7d2fe; border-color: #6366f1; }

      /* Command Palette Ctrl+K */
      #studio-cmd-overlay {
        position: fixed; inset: 0; z-index: 99990; display: none;
        background: rgba(2, 6, 23, 0.78); backdrop-filter: blur(8px);
        align-items: flex-start; justify-content: center; padding-top: 10vh;
        font-family: Inter, sans-serif;
      }
      #studio-cmd-overlay.open { display: flex; }
      #studio-cmd-box {
        width: min(560px, 92vw); background: #0d1225;
        border: 1px solid rgba(99, 102, 241, 0.45); border-radius: 14px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8); overflow: hidden;
      }
      #studio-cmd-input {
        width: 100%; box-sizing: border-box; padding: 15px 18px;
        background: transparent; border: none; border-bottom: 1px solid #1e293b;
        color: #f8fafc; font-size: 14px; outline: none;
      }
      #studio-cmd-list { max-height: 360px; overflow-y: auto; padding: 6px; }
      .studio-cmd-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 9px 12px; border-radius: 8px; cursor: pointer; color: #cbd5e1; font-size: 12.5px;
      }
      .studio-cmd-item:hover, .studio-cmd-item.selected { background: rgba(99, 102, 241, 0.22); color: #fff; }
      .studio-cmd-badge { font-size: 10px; padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,0.08); color: #94a3b8; }

      /* Unified Floating Tool Drawer (Right Side of 3D Viewport) */
      .studio-tool-panel {
        position: absolute; top: 54px; right: 14px; width: min(330px, calc(100% - 28px));
        max-height: calc(100% - 76px); overflow-y: auto; z-index: 38;
        background: rgba(11, 16, 34, 0.96); backdrop-filter: blur(16px);
        border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 14px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.72); color: #f1f5f9;
        font-family: Inter, sans-serif; padding: 14px; display: none;
      }
      .studio-tool-panel.open { display: block; }
      .studio-tool-hdr {
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px;
      }
      .studio-tool-title { font-size: 13.5px; font-weight: 800; display: flex; align-items: center; gap: 8px; }
      .studio-tool-close {
        background: rgba(239, 68, 68, 0.16); border: 1px solid rgba(239, 68, 68, 0.4);
        color: #fca5a5; border-radius: 6px; padding: 3px 8px; cursor: pointer; font-size: 12px; font-weight: 700;
      }
      .studio-btn-primary {
        width: 100%; padding: 9px 12px; border: none; border-radius: 8px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff;
        font-weight: 700; font-size: 11.5px; cursor: pointer; transition: 0.15s;
      }
      .studio-btn-primary:hover { filter: brightness(1.12); }
      .studio-btn-sec {
        padding: 7px 10px; border: 1px solid #334155; border-radius: 7px;
        background: #1e293b; color: #e2e8f0; font-weight: 600; font-size: 11px; cursor: pointer;
      }
      .studio-btn-sec:hover { border-color: #6366f1; color: #fff; }
      @media (max-width: 960px) {
        #studio-pro-dock { left: 10px; right: 10px; top: 8px; }
        #se-tools-sidebar { top: 68px !important; width: 230px !important; max-height: calc(100% - 82px) !important; }
      }
    `;
    document.head.appendChild(s);
  }

  function buildSidebarSearch(sidebar) {
    if (!sidebar || document.getElementById('studio-sidebar-filter')) return;
    const filterBox = document.createElement('div');
    filterBox.id = 'studio-sidebar-filter';
    const cats = [
      { id: 'all', en: 'All', fr: 'Tout' },
      { id: 'ultra', en: 'Ultra', fr: 'Ultra' },
      { id: 'studios', en: 'Studios', fr: 'Studios' },
      { id: 'science', en: 'Science', fr: 'Science' },
      { id: 'creative', en: 'Creative', fr: 'Créatif' },
      { id: 'media', en: 'Media', fr: 'Média' },
      { id: 'recent', en: '🕒 Recent', fr: '🕒 Récents' }
    ];
    let activeCat = 'all';

    function renderFilterUI() {
      const fr = isFR();
      filterBox.innerHTML = `
        <div style="display:flex;gap:5px;align-items:center;margin-bottom:7px;">
          <input id="studio-mod-search" type="search" placeholder="${fr ? '🔍 Chercher 80+ modules (Ctrl+K)...' : '🔍 Search 80+ modules (Ctrl+K)...'}" style="margin-bottom:0;flex:1;">
          <button id="studio-open-cmd" title="Ctrl+K" style="padding:6px 8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#a5b4fc;font-size:10px;font-weight:800;cursor:pointer;">⌘K</button>
        </div>
        <div class="studio-cat-pills">
          ${cats.map(c => `<button class="studio-cat-pill ${c.id === activeCat ? 'active' : ''}" data-cat="${c.id}">${fr ? c.fr : c.en}</button>`).join('')}
        </div>
      `;
      filterBox.querySelector('#studio-open-cmd').onclick = openCmdPalette;
      const inp = filterBox.querySelector('#studio-mod-search');
      inp.oninput = () => applyFilter(inp.value, activeCat);
      filterBox.querySelectorAll('.studio-cat-pill').forEach(p => {
        p.onclick = () => {
          activeCat = p.dataset.cat;
          filterBox.querySelectorAll('.studio-cat-pill').forEach(x => x.classList.toggle('active', x.dataset.cat === activeCat));
          applyFilter(inp.value, activeCat);
        };
      });
    }

    function applyFilter(query, cat) {
      const q = (query || '').trim().toLowerCase();
      const catalog = (window.StudioModuleLoader && window.StudioModuleLoader.catalog) || [];
      let recents = [];
      try { recents = JSON.parse(localStorage.getItem('studio3d_recents') || '[]'); } catch (e) {}
      catalog.forEach(m => {
        const el = document.getElementById(m.btn);
        if (!el) return;
        const matchQ = !q || m.en.toLowerCase().includes(q) || m.fr.toLowerCase().includes(q) || m.cat.includes(q) || m.btn.includes(q);
        const matchCat = cat === 'all' || (cat === 'recent' ? recents.includes(m.btn) : m.cat === cat);
        el.style.display = (matchQ && matchCat) ? '' : 'none';
      });
      // Hide empty row wrappers while filtering
      sidebar.querySelectorAll('#sec-import-tools > div').forEach(row => {
        const btns = row.querySelectorAll('button[id$="-scene"]');
        if (btns.length === 0) return;
        const anyVisible = Array.from(btns).some(b => b.style.display !== 'none');
        row.style.display = anyVisible ? 'flex' : 'none';
      });
    }

    const importTools = sidebar.querySelector('#sec-import-tools');
    if (importTools) {
      sidebar.insertBefore(filterBox, importTools);
    } else {
      sidebar.appendChild(filterBox);
    }
    renderFilterUI();
    window.addEventListener('studio:langchange', renderFilterUI);
  }

  function buildProToolsDock() {
    const mainPane = window.SketchExtruder && window.SketchExtruder.getMainPane ? window.SketchExtruder.getMainPane() : null;
    if (!mainPane || document.getElementById('studio-pro-dock')) return;

    const dock = document.createElement('div');
    dock.id = 'studio-pro-dock';
    mainPane.appendChild(dock);

    function renderDock() {
      const fr = isFR();
      dock.innerHTML = '';
      PRO_TOOLS.forEach(tool => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'studio-dock-pill';
        b.id = 'dock-tool-' + tool.id;
        b.style.setProperty('--pill-col', tool.color);
        b.innerHTML = `<span>${tool.icon}</span><span>${fr ? tool.fr : tool.en}</span>`;
        b.onclick = () => tool.action();
        dock.appendChild(b);
      });
      // Compact Undo / Redo + Command Palette buttons
      const undoBtn = document.createElement('button');
      undoBtn.type = 'button'; undoBtn.className = 'studio-dock-pill'; undoBtn.title = 'Undo (Ctrl+Z)';
      undoBtn.innerHTML = '↩️'; undoBtn.onclick = () => window.StudioHistory && window.StudioHistory.undo();
      dock.appendChild(undoBtn);

      const redoBtn = document.createElement('button');
      redoBtn.type = 'button'; redoBtn.className = 'studio-dock-pill'; redoBtn.title = 'Redo (Ctrl+Y)';
      redoBtn.innerHTML = '↪️'; redoBtn.onclick = () => window.StudioHistory && window.StudioHistory.redo();
      dock.appendChild(redoBtn);
    }

    renderDock();
    window.addEventListener('studio:langchange', renderDock);
  }

  // ── Command Palette (Ctrl+K) ────────────────────────────────────────────
  let cmdOverlay = null, cmdSelIdx = 0, cmdItems = [];

  function buildCmdPalette() {
    if (cmdOverlay) return;
    cmdOverlay = document.createElement('div');
    cmdOverlay.id = 'studio-cmd-overlay';
    cmdOverlay.innerHTML = `
      <div id="studio-cmd-box">
        <input id="studio-cmd-input" type="text" autocomplete="off" placeholder="Search 80+ 3D/4D modules, tools, presets...">
        <div id="studio-cmd-list"></div>
      </div>
    `;
    document.body.appendChild(cmdOverlay);
    cmdOverlay.addEventListener('click', e => { if (e.target === cmdOverlay) closeCmdPalette(); });
    const inp = cmdOverlay.querySelector('#studio-cmd-input');
    inp.addEventListener('input', () => renderCmdResults(inp.value));
    inp.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeCmdPalette(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); cmdSelIdx = Math.min(cmdItems.length - 1, cmdSelIdx + 1); highlightCmd(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); cmdSelIdx = Math.max(0, cmdSelIdx - 1); highlightCmd(); }
      if (e.key === 'Enter' && cmdItems[cmdSelIdx]) { e.preventDefault(); const fn = cmdItems[cmdSelIdx].run; closeCmdPalette(); fn(); }
    });
  }

  function renderCmdResults(query) {
    const q = (query || '').trim().toLowerCase();
    const fr = isFR();
    const all = [];
    PRO_TOOLS.forEach(t => all.push({
      icon: t.icon, label: fr ? t.fr : t.en, badge: 'Studio 2.0',
      search: (t.en + ' ' + t.fr + ' ' + t.id).toLowerCase(),
      run: t.action
    }));
    const catalog = (window.StudioModuleLoader && window.StudioModuleLoader.catalog) || [];
    catalog.forEach(m => all.push({
      icon: m.icon, label: fr ? m.fr : m.en, badge: m.cat.toUpperCase(),
      search: (m.en + ' ' + m.fr + ' ' + m.cat + ' ' + m.btn).toLowerCase(),
      run: () => window.StudioModuleLoader.openModule(m.btn)
    }));
    cmdItems = all.filter(x => !q || x.search.includes(q)).slice(0, 30);
    cmdSelIdx = 0;
    const list = cmdOverlay.querySelector('#studio-cmd-list');
    list.innerHTML = cmdItems.length
      ? cmdItems.map((it, idx) => `<div class="studio-cmd-item ${idx === 0 ? 'selected' : ''}" data-i="${idx}"><span>${it.icon} ${it.label}</span><span class="studio-cmd-badge">${it.badge}</span></div>`).join('')
      : `<div style="padding:20px;text-align:center;color:#64748b;font-size:12px;">${fr ? 'Aucun résultat' : 'No matching tool or module'}</div>`;
    list.querySelectorAll('.studio-cmd-item').forEach(el => {
      el.onclick = () => { const fn = cmdItems[+el.dataset.i].run; closeCmdPalette(); fn(); };
    });
  }

  function highlightCmd() {
    cmdOverlay.querySelectorAll('.studio-cmd-item').forEach((el, idx) => {
      el.classList.toggle('selected', idx === cmdSelIdx);
      if (idx === cmdSelIdx) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function openCmdPalette() {
    buildCmdPalette();
    const inp = cmdOverlay.querySelector('#studio-cmd-input');
    inp.placeholder = isFR() ? 'Chercher parmi 80+ modules, outils & modèles...' : 'Search 80+ 3D/4D modules, tools & presets...';
    inp.value = '';
    renderCmdResults('');
    cmdOverlay.classList.add('open');
    setTimeout(() => inp.focus(), 20);
  }

  function closeCmdPalette() {
    if (cmdOverlay) cmdOverlay.classList.remove('open');
  }

  // Helper to create/toggle unified right-hand Studio 2.0 Tool Drawers (only 1 open at a time)
  function createToolDrawer(id, titleFn) {
    const mainPane = window.SketchExtruder && window.SketchExtruder.getMainPane ? window.SketchExtruder.getMainPane() : document.body;
    let panel = document.getElementById(id);
    if (!panel) {
      panel = document.createElement('div');
      panel.id = id;
      panel.className = 'studio-tool-panel';
      mainPane.appendChild(panel);
    }
    return {
      panel,
      open() {
        document.querySelectorAll('.studio-tool-panel.open').forEach(p => { if (p !== panel) p.classList.remove('open'); });
        panel.classList.add('open');
      },
      close() { panel.classList.remove('open'); },
      toggle() {
        if (panel.classList.contains('open')) this.close();
        else this.open();
      },
      renderHeader(icon, titleText) {
        return `<div class="studio-tool-hdr"><div class="studio-tool-title"><span>${icon}</span><span>${titleText}</span></div><button class="studio-tool-close" onclick="this.closest('.studio-tool-panel').classList.remove('open')">✕</button></div>`;
      }
    };
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdOverlay && cmdOverlay.classList.contains('open')) closeCmdPalette();
      else openCmdPalette();
    }
  });

  function initShell() {
    injectStyles();
    const sidebar = document.getElementById('se-tools-sidebar');
    if (sidebar) buildSidebarSearch(sidebar);
    buildProToolsDock();
  }

  window.addEventListener('studio:composerready', initShell);
  if (document.readyState !== 'loading') setTimeout(initShell, 600);
  else document.addEventListener('DOMContentLoaded', () => setTimeout(initShell, 600));

  window.StudioShellUI = { openCmdPalette, closeCmdPalette, createToolDrawer };
})();
