// OmniConvert Pro 2.0 — Main Shell Orchestrator (Sidebar, Favorites, Resizer, Themes, Routing, Send-To, Share Restore)
(function (global) {
  'use strict';

  const Omni = (global.Omni = global.Omni || {});
  const $ = (id) => document.getElementById(id);

  const TAB_TITLES = {
    en: {
      playground: 'Playground 2.0 — Live HTML/CSS/JS Sandbox',
      omnipipe: 'OmniPipe — Visual Chained Pipelines',
      serialize: 'JSON / XML / YAML / CSV Data Explorer',
      codegen: 'JSON → TypeScript, Zod, SQL & Go Generator',
      base64: 'Base64 & Base64URL Media Studio',
      minify: 'Tokenizer Code Minifier & JS Obfuscator',
      http: 'cURL Translator & URL Query Builder',
      qrcode: 'ISO QR Code Studio 2.0 (PNG / SVG / Scanner)',
      hash: 'Crypto Vault — Hash, Checksum, AES-256 & PEM',
      jwt: 'Offline JWT Inspector, Verifier & Signer',
      colors: 'Colors, OKLCH & WCAG 2.1 Contrast Lab',
      gradient: 'CSS Gradient & Mesh Studio',
      shadow: 'Multi-Layer Shadow & Glassmorphism Lab',
      svg: 'SVG Optimizer & React JSX Converter',
      regex: 'Live Regex Lab, Capture Groups & Replace',
      diff: 'Myers Text Diff Studio',
      utilities: 'Dev Utilities, Timestamp, Cron & BigInt Base',
      snippets: 'Code Snippet Vault 2.0',
    },
    fr: {
      playground: 'Playground 2.0 — Bac à Sable HTML/CSS/JS',
      omnipipe: 'OmniPipe — Pipelines Visuels Chaînés',
      serialize: 'Explorateur JSON / XML / YAML / CSV',
      codegen: 'Générateur JSON → TypeScript, Zod, SQL & Go',
      base64: 'Studio Base64 & Base64URL',
      minify: 'Minificateur Tokenizer & Offuscateur JS',
      http: 'Traducteur cURL & Inspecteur URL',
      qrcode: 'Studio QR Code ISO 2.0 (PNG / SVG / Lecteur)',
      hash: 'Coffre Crypto — Hash, AES-256 & PEM',
      jwt: 'Studio JWT Hors Ligne',
      colors: 'Couleurs, OKLCH & Contraste WCAG 2.1',
      gradient: 'Studio Dégradés CSS & Mesh',
      shadow: 'Lab Ombres Multi-Couches & Glassmorphism',
      svg: 'Optimiseur SVG & Convertisseur JSX',
      regex: 'Lab Regex, Groupes & Remplacement',
      diff: 'Studio Diff Myers',
      utilities: 'Utilitaires Dev, Horodatage, Cron & BigInt',
      snippets: 'Coffre à Snippets 2.0',
    },
  };

  function getValidTabs() {
    return Array.from(document.querySelectorAll('.tab-panel')).map((p) => p.id.replace(/^tab-/, ''));
  }

  function updateTitleAndHash(tabId, updateHash = true) {
    const dict = TAB_TITLES[Omni.state.lang] || TAB_TITLES.en;
    document.title = `${dict[tabId] || 'Ultimate Dev Workstation'} — OmniConvert Pro 2.0`;
    if (updateHash && !location.hash.startsWith('#share=')) {
      if (location.hash.slice(1) !== tabId) {
        try { history.replaceState(null, '', '#' + tabId); } catch (_) {}
      }
    }
  }

  Omni.switchToTab = function (tabId, updateHash = true) {
    const valid = getValidTabs();
    const target = valid.includes(tabId) ? tabId : 'playground';
    Omni.state.activeTab = target;

    document.querySelectorAll('.sidebar .nav-item').forEach((btn) => {
      const isMatch = btn.dataset.tab === target;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
    document.querySelectorAll('.tab-panel').forEach((p) => {
      p.classList.toggle('active', p.id === `tab-${target}`);
    });

    // Trigger tab-specific contextual right panel (eliminates stale output!)
    if (typeof Omni.onTabActivate[target] === 'function') {
      Omni.onTabActivate[target]();
    } else {
      Omni.activateOutput('out-code', Omni.t('outputDefaultTitle'), () => $('code-output').value);
    }

    updateTitleAndHash(target, updateHash);
    $('sidebar')?.classList.remove('mobile-open');
  };

  // ---------------------------------------------------------------------------
  // Sidebar, Pinned Favorites & Responsive Drawer
  // ---------------------------------------------------------------------------
  function setupSidebar() {
    try {
      const savedFavs = JSON.parse(localStorage.getItem(Omni.STORAGE.FAVORITES) || 'null');
      if (Array.isArray(savedFavs) && savedFavs.length) Omni.state.favorites = savedFavs;
    } catch (_) {}

    function renderPinned() {
      const host = $('pinned-nav-list');
      const group = $('nav-group-pinned');
      host.innerHTML = '';
      if (!Omni.state.favorites.length) {
        group.classList.add('hidden');
        return;
      }
      group.classList.remove('hidden');
      Omni.state.favorites.forEach((tabId) => {
        const srcBtn = document.querySelector(`.sidebar .nav-group:not(#nav-group-pinned) .nav-item[data-tab="${tabId}"]`);
        if (!srcBtn) return;
        const clone = document.createElement('button');
        clone.className = 'nav-item' + (Omni.state.activeTab === tabId ? ' active' : '');
        clone.dataset.tab = tabId;
        clone.setAttribute('role', 'tab');
        clone.innerHTML = srcBtn.querySelector('svg').outerHTML + `<span>${Omni.escapeHTML(Omni.t(`tab_${tabId}`))}</span>`;
        clone.onclick = () => Omni.switchToTab(tabId);
        host.appendChild(clone);
      });
    }

    // Add pin toggles to all main nav buttons
    document.querySelectorAll('.sidebar .nav-group:not(#nav-group-pinned) .nav-item').forEach((btn) => {
      const tabId = btn.dataset.tab;
      const pin = document.createElement('span');
      pin.className = 'pin-btn' + (Omni.state.favorites.includes(tabId) ? ' pinned' : '');
      pin.title = 'Pin / Unpin';
      pin.innerHTML = '<svg class="ic ic-sm"><use href="#ic-pin"/></svg>';
      pin.onclick = (e) => {
        e.stopPropagation();
        const idx = Omni.state.favorites.indexOf(tabId);
        if (idx === -1) Omni.state.favorites.push(tabId);
        else Omni.state.favorites.splice(idx, 1);
        pin.classList.toggle('pinned', idx === -1);
        try { localStorage.setItem(Omni.STORAGE.FAVORITES, JSON.stringify(Omni.state.favorites)); } catch (_) {}
        renderPinned();
      };
      btn.appendChild(pin);
      btn.addEventListener('click', () => Omni.switchToTab(tabId));
    });

    renderPinned();
    Omni.onLangChange(renderPinned);

    $('btn-sidebar-toggle').onclick = () => {
      const sb = $('sidebar');
      if (window.innerWidth <= 960) sb.classList.toggle('mobile-open');
      else sb.classList.toggle('collapsed');
    };
  }

  // ---------------------------------------------------------------------------
  // Resizable Split-Pane Divider (Mouse + Keyboard)
  // ---------------------------------------------------------------------------
  function setupResizer() {
    const resizer = $('split-resizer');
    const left = $('pane-left');
    const right = $('pane-right');
    const bench = $('split-workbench');
    if (!resizer || !left || !right) return;

    let dragging = false;
    resizer.addEventListener('mousedown', (e) => {
      dragging = true;
      resizer.classList.add('dragging');
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const rect = bench.getBoundingClientRect();
      const pct = Math.min(75, Math.max(25, ((e.clientX - rect.left) / rect.width) * 100));
      left.style.flex = `0 0 ${pct}%`;
      right.style.flex = `1 1 ${100 - pct}%`;
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      resizer.classList.remove('dragging');
      document.body.style.userSelect = '';
    });
  }

  // ---------------------------------------------------------------------------
  // Theme Switcher (Cyber Dark -> Midnight -> Clean Light)
  // ---------------------------------------------------------------------------
  function setupTheme() {
    const themes = ['cyber', 'midnight', 'light'];
    try {
      const saved = localStorage.getItem(Omni.STORAGE.THEME);
      if (themes.includes(saved)) Omni.state.theme = saved;
    } catch (_) {}
    document.documentElement.setAttribute('data-theme', Omni.state.theme);

    $('btn-theme').onclick = () => {
      const next = themes[(themes.indexOf(Omni.state.theme) + 1) % themes.length];
      Omni.state.theme = next;
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(Omni.STORAGE.THEME, next); } catch (_) {}
      const label = next === 'cyber' ? Omni.t('themeCyber') : next === 'midnight' ? Omni.t('themeMidnight') : Omni.t('themeLight');
      Omni.showToast(`Theme: ${label}`, 'info');
    };
  }

  // ---------------------------------------------------------------------------
  // Universal Copy Output & "Send Output To..." Menu
  // ---------------------------------------------------------------------------
  function setupOutputHeaderActions() {
    $('btn-copy-output').onclick = () => {
      const val = typeof Omni.currentOutputGetter === 'function' ? Omni.currentOutputGetter() : '';
      if (!val) return Omni.showToast('Nothing to copy yet.', 'info');
      Omni.copyText(val);
    };

    const btnSend = $('btn-send-to');
    const menu = $('send-to-menu');
    btnSend.onclick = (e) => {
      e.stopPropagation();
      menu.innerHTML = '';
      Object.entries(Omni.sendToRegistry).forEach(([tabId, cfg]) => {
        const item = document.createElement('button');
        item.className = 'dropdown-item';
        item.textContent = Omni.state.lang === 'fr' ? cfg.labelFr : cfg.labelEn;
        item.onclick = () => {
          const val = typeof Omni.currentOutputGetter === 'function' ? Omni.currentOutputGetter() : '';
          menu.classList.add('hidden');
          if (!val) return Omni.showToast('Current output is empty.', 'info');
          Omni.switchToTab(tabId);
          cfg.handler(val);
          Omni.showToast(`Sent output → ${Omni.t(`tab_${tabId}`)}`, 'success');
        };
        menu.appendChild(item);
      });
      menu.classList.toggle('hidden');
    };
    document.addEventListener('click', () => menu.classList.add('hidden'));
  }

  // ---------------------------------------------------------------------------
  // Bootstrap Everything in Deterministic Order
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', async () => {
    // Auto-hide Back-to-Hub link when running inside Chrome Extension
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      $('link-back-hub')?.classList.add('hidden');
    }

    // Enhance universal code output editor
    Omni.enhanceCodeEditor($('code-output'), { lang: 'plain' });

    setupTheme();
    Omni.initLanguage();
    $('btn-lang').onclick = () => {
      Omni.setLanguage(Omni.state.lang === 'en' ? 'fr' : 'en', true);
      updateTitleAndHash(Omni.state.activeTab, false);
    };

    $('btn-pro-modal-close').onclick = Omni.closePremiumModal;
    $('pro-modal').addEventListener('click', (e) => { if (e.target.id === 'pro-modal') Omni.closePremiumModal(); });
    $('btn-panic-wipe').onclick = () => {
      if (confirm(Omni.t('panicWipeConfirm'))) Omni.panicWipe();
    };

    // Initialize all tools & OmniPipe BEFORE initial tab activation
    Omni.initAllTools();
    Omni.initOmniPipeAndPalette();
    setupSidebar();
    setupResizer();
    setupOutputHeaderActions();

    // Handle URL Hash routing + Serverless #share=... restoration
    const rawHash = location.hash.slice(1);
    if (rawHash.startsWith('share=')) {
      try {
        const payload = await Omni.decodeSharePayload(rawHash.slice(6));
        if (payload.kind === 'pg' && Omni.loadSharedPlayground) {
          Omni.switchToTab('playground', false);
          Omni.loadSharedPlayground(payload);
        } else if (payload.kind === 'pipe' && Omni.loadSharedPipe) {
          Omni.loadSharedPipe(payload);
        } else {
          Omni.switchToTab('playground', false);
        }
      } catch (_) {
        Omni.switchToTab('playground', false);
      }
    } else {
      Omni.switchToTab(rawHash || 'playground', false);
    }

    window.addEventListener('hashchange', () => {
      const h = location.hash.slice(1);
      if (h && !h.startsWith('share=')) Omni.switchToTab(h, false);
    });
  });
})(typeof window !== 'undefined' ? window : globalThis);
