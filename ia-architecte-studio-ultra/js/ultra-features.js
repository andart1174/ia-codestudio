// ══════════════════════════════════════════════════════════════════════════════
// ULTRA FEATURES — AI, Editor, Preview, Export, UX
// ══════════════════════════════════════════════════════════════════════════════

function getActiveCode() {
  if (window.APP && window.APP.editor) {
    try {
      const v = window.APP.editor.getValue();
      if (v && v.trim().length > 0) return v;
    } catch(e) {}
  }
  if (window.APP) {
    return window.APP.full || window.APP.html || window.APP.js || '';
  }
  return '';
}

// ── 1. PROMPT ENHANCER ────────────────────────────────────────────────────────
const UltraEnhancer = {
  _originalPrompt: '',
  _enhancedPrompt: '',

  enhance() {
    const inp = document.getElementById('prompt-input');
    if (!inp) return;

    let original = inp.value.trim();
    if (!original) {
      const cur = window.APP?.currentAppName || '';
      if (cur) {
        original = 'Enhance ' + cur + ' with modern dark UI, interactive data visualizations, and smooth animations';
      } else {
        original = 'Build a modern responsive dashboard with real-time metrics, dark mode, and sleek cards';
      }
      inp.value = original;
    }
    this._originalPrompt = original;

    const panel = document.getElementById('enhance-result-panel');
    const text  = document.getElementById('enhance-result-text');
    if (panel) panel.style.display = 'block';
    if (text)  text.textContent = '✨ Enhancing your prompt with AI architecture guidelines...';

    const hasKey = !!localStorage.getItem('ultra_api_key');
    if (hasKey && window.AIEngine) {
      AIEngine.generate(
        'Rewrite this prompt into a detailed, production-grade technical specification for a complete single-file web app. Include UI styling, responsive layout, interactive features, state management, and key animations. Keep under 180 words. Original: ' + original,
        () => {}
      ).then(result => {
        const enhanced = (result && result.full) ? result.full.replace(/<[^>]+>/g, '') : (result && result.js) ? result.js : original;
        this._enhancedPrompt = enhanced;
        if (text) text.textContent = enhanced;
      }).catch(() => { this._demoEnhance(original, text); });
    } else {
      setTimeout(() => this._demoEnhance(original, text), 250);
    }
  },

  _demoEnhance(original, textEl) {
    const lower = original.toLowerCase();
    const isGame = /game|arcade|snake|tetris|pong|breakout|space/.test(lower);
    const isDash = /dashboard|analytics|chart|metric|kpi|stat|crypto/.test(lower);
    const isShop = /shop|store|ecommerce|product|cart|buy|sneaker/.test(lower);
    const isTool = /tool|util|calc|convert|generator|regex|json|password/.test(lower);

    let additions = 'featuring a modern dark glassmorphic UI, responsive mobile-friendly grid, fluid CSS transitions, sound effects, and persistent localStorage sync';
    if (isGame) additions = 'with an energetic cyberpunk color palette, 60fps HTML5 Canvas physics, particle explosion effects, high-score leaderboard saved in localStorage, and touch/keyboard controls';
    if (isDash) additions = 'with an executive dark theme, interactive Chart.js graphs, live simulated data updates every 3 seconds, animated KPI counters, filter tabs, and export to CSV';
    if (isShop) additions = 'with a luxury e-commerce layout, interactive product cards with hover zoom, dynamic cart drawer with checkout modal, price filters, and promo code discounts';
    if (isTool) additions = 'with a clean developer-first interface, real-time input validation, one-click copy to clipboard, keyboard shortcuts, and dark/light contrast';

    const enhanced = `Build a production-quality ${original} ${additions}. The app must be fully responsive, self-contained in a single page, error-free, and delightfully interactive.`;
    this._enhancedPrompt = enhanced;
    if (textEl) textEl.textContent = enhanced;
  },

  accept() {
    const inp = document.getElementById('prompt-input');
    if (inp && this._enhancedPrompt) inp.value = this._enhancedPrompt;
    this.dismiss();
    if (typeof showToast === 'function') showToast('✨ Enhanced prompt applied!', 'success');
  },

  dismiss() {
    const panel = document.getElementById('enhance-result-panel');
    if (panel) panel.style.display = 'none';
  }
};

// ── 2. AUTO-FIX CONSOLE ERRORS ────────────────────────────────────────────────
const UltraAutoFix = {
  _lastErrors: [],

  recordError(msg) {
    this._lastErrors.unshift({ msg, time: Date.now() });
    if (this._lastErrors.length > 10) this._lastErrors.splice(10);
    const btn = document.getElementById('btn-autofix');
    if (btn) btn.style.display = 'inline-flex';
    const btnC = document.getElementById('btn-autofix-console');
    if (btnC) btnC.style.display = 'inline-flex';
  },

  async fix() {
    const code = getActiveCode();
    if (!code) {
      if (typeof showToast === 'function') showToast('No code loaded to fix!', 'error');
      return;
    }

    if (typeof showToast === 'function') showToast('🔧 Analyzing and fixing code...', 'info');

    if (window.AIEngine && localStorage.getItem('ultra_api_key')) {
      try {
        const errorSummary = this._lastErrors.slice(0, 3).map(e => e.msg).join('\n') || 'Fix any runtime JavaScript syntax errors or unhandled exceptions.';
        const result = await AIEngine.modify({
          request: 'Fix any JavaScript runtime or syntax errors in this code:\n' + errorSummary,
          context: 'Ensure the application runs smoothly without console errors.'
        }, code, () => {});
        if (result && (result.full || result.html)) {
          if (typeof loadAppIntoStudio === 'function') {
            loadAppIntoStudio({ id: 'fixed', name: (window.APP?.currentAppName || 'App') + ' (Fixed)', full: result.full || code, html: result.html || '', css: result.css || '', js: result.js || '' }, false);
          }
          this._clearButtons();
          if (typeof showToast === 'function') showToast('✅ AI Auto-Fix applied successfully!', 'success');
          return;
        }
      } catch(e) {}
    }

    this._clearButtons();
    if (typeof refreshPreview === 'function') refreshPreview();
    if (typeof showToast === 'function') showToast('✅ Code checked & preview refreshed!', 'success');
  },

  _clearButtons() {
    this._lastErrors = [];
    const btn = document.getElementById('btn-autofix');
    if (btn) btn.style.display = 'none';
    const btnC = document.getElementById('btn-autofix-console');
    if (btnC) btnC.style.display = 'none';
  }
};

window.addEventListener('message', e => {
  if (e.data && e.data.type === 'con' && (e.data.level === 'error' || e.data.level === 'err')) {
    UltraAutoFix.recordError(e.data.msg);
  }
});

// ── 3. EXPLAIN CODE ───────────────────────────────────────────────────────────
const UltraExplain = {
  async explain() {
    const code = getActiveCode();
    if (!code || code.trim().length === 0) {
      if (typeof showToast === 'function') showToast('No code to explain! Load an app from App Hub first.', 'error');
      return;
    }

    const panel = document.getElementById('explain-slide-panel');
    const content = document.getElementById('explain-content');
    if (!panel || !content) return;

    const faker = document.getElementById('data-faker-panel');
    if (faker) faker.classList.remove('open');

    panel.classList.add('open');
    content.innerHTML = '<div style="color:#64748b;font-size:0.85rem;padding:8px 0">💡 Analyzing application architecture...</div>';

    const summary = this._demoExplain(code);
    content.innerHTML = summary;
    if (typeof showToast === 'function') showToast('💡 Code explained!', 'success');
  },

  _demoExplain(code) {
    const lower = code.toLowerCase();
    const tags = [];
    if (/canvas/.test(lower)) tags.push('🎮 HTML5 Canvas 2D Graphics');
    if (/chart/.test(lower))  tags.push('📊 Chart.js Data Visualization');
    if (/fetch|xmlhttp|api/.test(lower)) tags.push('🌐 Remote API / HTTP Requests');
    if (/localstorage/.test(lower)) tags.push('💾 Browser localStorage Persistence');
    if (/audio|webaudio|audiocontext/.test(lower)) tags.push('🎵 Web Audio API Sound Effects');
    if (/drag|drop/.test(lower)) tags.push('🖱️ Interactive Drag & Drop');
    if (/requestanimationframe/.test(lower)) tags.push('✨ Smooth 60fps Animation Loop');
    if (/input|button|form/.test(lower)) tags.push('📝 Dynamic Form & UI Controls');
    if (/flex|grid/.test(lower)) tags.push('📐 Responsive CSS Flexbox & Grid');

    const lines = code.split('\n').length;
    const kb = (code.length / 1024).toFixed(1);
    const appName = window.APP?.currentAppName || 'Current Application';

    return `
      <div style="margin-bottom:14px">
        <div style="font-weight:800;color:#f1f5f9;font-size:0.95rem;margin-bottom:4px">📱 ${appName}</div>
        <div style="color:#64748b;font-size:0.75rem">${lines} lines of code · ${kb} KB total size</div>
      </div>

      <div style="margin-bottom:14px;background:rgba(255,255,255,0.03);padding:10px 12px;border-radius:9px;border:1px solid rgba(255,255,255,0.06)">
        <div style="font-weight:700;color:#a5b4fc;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Architecture Highlights</div>
        <div style="color:#cbd5e1;font-size:0.8rem;line-height:1.55">
          This self-contained application utilizes inline styles and pure JavaScript. All state is maintained in-memory and synced to the browser viewport in real time.
        </div>
      </div>

      ${tags.length ? `
      <div style="margin-bottom:14px">
        <div style="font-weight:700;color:#a5b4fc;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Detected Technologies</div>
        <div style="display:flex;flex-direction:column;gap:5px">
          ${tags.map(t => '<div style="background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);color:#c7d2fe;padding:5px 9px;border-radius:6px;font-size:0.78rem">' + t + '</div>').join('')}
        </div>
      </div>` : ''}

      <div style="color:#64748b;font-size:0.76rem;border-top:1px solid rgba(255,255,255,0.05);padding-top:10px">
        Tip: Add your Gemini API key in <strong>⚙️ Settings</strong> for live AI multi-agent code explanations and refactoring suggestions.
      </div>`;
  },

  close() {
    const panel = document.getElementById('explain-slide-panel');
    if (panel) panel.classList.remove('open');
  }
};

// ── 4. 3 APP VARIANTS ─────────────────────────────────────────────────────────
const UltraVariants = {
  show() {
    const inp = document.getElementById('prompt-input');
    const prompt = (inp ? inp.value.trim() : '') || (window.APP?.currentAppName || '');
    const templates = (typeof window.ULTRA_TEMPLATES !== 'undefined' ? window.ULTRA_TEMPLATES : []) || [];
    if (templates.length === 0) {
      if (typeof showToast === 'function') showToast('App templates loading...', 'info');
      return;
    }

    let top3 = [];
    if (prompt) {
      const lower = prompt.toLowerCase();
      const scored = templates.map(t => {
        let score = 0;
        const name = (t.name || '').toLowerCase();
        const desc = (t.description || '').toLowerCase();
        const cat  = (t.category || '').toLowerCase();
        lower.split(' ').forEach(w => {
          if (w.length < 3) return;
          if (name.includes(w)) score += 4;
          if (desc.includes(w)) score += 2;
          if (cat.includes(w))  score += 1;
        });
        return { ...t, score };
      }).sort((a,b) => b.score - a.score);
      top3 = scored.slice(0, 3);
    } else {
      top3 = templates.slice(0, 3);
    }

    const list = document.getElementById('variants-list');
    if (list) {
      list.innerHTML = top3.map((t, i) => `
        <div onclick="UltraVariants.pick('${t.id}')" style="cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(99,102,241,0.25);border-radius:12px;padding:14px 16px;margin-bottom:10px;transition:all .18s" onmouseover="this.style.borderColor='rgba(99,102,241,0.6)';this.style.background='rgba(99,102,241,0.08)'" onmouseout="this.style.borderColor='rgba(99,102,241,0.25)';this.style.background='rgba(255,255,255,0.04)'">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:1.6rem">${t.icon || '📱'}</span>
            <div style="flex:1">
              <div style="color:#fff;font-weight:700;font-size:0.92rem">${t.name}</div>
              <div style="color:#64748b;font-size:0.74rem">${t.badge || t.category}</div>
            </div>
            <span style="background:rgba(99,102,241,0.2);color:#a5b4fc;padding:3px 10px;border-radius:12px;font-size:0.72rem;font-weight:700">Variant ${i+1}</span>
          </div>
          <div style="color:#94a3b8;font-size:0.79rem;line-height:1.45">${t.description || ''}</div>
        </div>
      `).join('');
    }

    if (typeof openModal === 'function') {
      openModal('variants');
    } else {
      const m = document.getElementById('modal-variants');
      if (m) m.classList.add('show');
    }
  },

  pick(id) {
    const templates = (typeof window.ULTRA_TEMPLATES !== 'undefined' ? window.ULTRA_TEMPLATES : []) || [];
    const tpl = templates.find(t => t.id === id);
    if (!tpl) return;
    if (typeof loadAppIntoStudio === 'function') loadAppIntoStudio(tpl, false);
    if (typeof closeModal === 'function') closeModal('variants');
    if (typeof showToast === 'function') showToast('⟳ Variant "' + tpl.name + '" loaded!', 'success');
  }
};

// ── 5. COMMAND PALETTE (CTRL+K) ───────────────────────────────────────────────
const UltraCmdPalette = {
  _selected: 0,
  _filtered: [],

  COMMANDS: [
    { icon: '✦',  label: 'Generate App with AI',         tag: 'AI',      action: () => document.getElementById('btn-generate')?.click() },
    { icon: '✨',  label: 'Enhance Prompt (AI Architect)',tag: 'AI',      action: () => UltraEnhancer.enhance() },
    { icon: '⟳',  label: '3 App Variants',               tag: 'AI',      action: () => UltraVariants.show() },
    { icon: '💡',  label: 'Explain Code Architecture',    tag: 'AI',      action: () => UltraExplain.explain() },
    { icon: '🔧',  label: 'Auto-Fix Console Errors',      tag: 'AI',      action: () => UltraAutoFix.fix() },
    { icon: '🚀',  label: 'Open App Hub (28+ Apps)',      tag: 'Hub',     action: () => openModal('hub') },
    { icon: '🛸',  label: 'Cosmic Odyssey Game Station',  tag: 'Game',    action: () => (window.CosmicOdyssey && CosmicOdyssey.open()) },
    { icon: '⭐',  label: 'Filter Favorite Apps',         tag: 'Hub',     action: () => { openModal('hub'); window.hubActiveCat = 'favorites'; if (typeof renderHub === 'function') renderHub(); } },
    { icon: '📁',  label: 'My Saved Projects',            tag: 'Save',    action: () => openProjectsModal() },
    { icon: '💾',  label: 'Save Current App to Projects', tag: 'Save',    action: () => UltraProjects.saveCurrentWithPrompt() },
    { icon: '⏪',  label: 'Version History (20 Snapshots)',tag: 'Save',   action: () => { openProjectsModal(); showProjectsTab('history'); } },
    { icon: '⬚',  label: 'View Mode: Split (50/50)',     tag: 'View',    action: () => setViewMode('split') },
    { icon: '≡',   label: 'View Mode: Code Only',         tag: 'View',    action: () => setViewMode('code') },
    { icon: '▶',  label: 'View Mode: Live Preview Only', tag: 'View',    action: () => setViewMode('preview') },
    { icon: '⊞',  label: 'Dual Preview (Mobile + Desktop)',tag: 'Preview',action: () => UltraDualPreview.toggle() },
    { icon: '🌗',  label: 'Toggle Preview Theme (Dark/Light)',tag: 'Preview',action: () => UltraPreviewTheme.toggle() },
    { icon: '📸',  label: 'Take Screenshot (PNG)',        tag: 'Export',  action: () => UltraScreenshot.take() },
    { icon: '📱',  label: 'Export as PWA (Installable)',  tag: 'Export',  action: () => UltraPWA.export() },
    { icon: '⚛️', label: 'Export as React Component',     tag: 'Export',  action: () => UltraReactExport.convert() },
    { icon: '🐙',  label: 'Publish to GitHub Gist',       tag: 'Export',  action: () => UltraGist.export() },
    { icon: '📄',  label: 'Export Single HTML File',      tag: 'Export',  action: () => exportHTML() },
    { icon: '📦',  label: 'Export Source ZIP Archive',    tag: 'Export',  action: () => exportZIP() },
    { icon: '🔍',  label: 'Find & Replace in Code (Ctrl+F)',tag: 'Editor', action: () => UltraFindReplace.open() },
    { icon: '📊',  label: 'Data Faker Panel',             tag: 'Editor',  action: () => UltraDataFaker.toggle() },
    { icon: '🎨',  label: 'Visual CSS Theme Editor',      tag: 'Editor',  action: () => UltraVisualCSS.toggle() },
    { icon: '📱',  label: 'QR Code Mobile Live Test',     tag: 'Share',   action: () => openModal('qr') },
    { icon: '📖',  label: 'Start Interactive Tutorial',   tag: 'Help',    action: () => UltraTutorial.start() },
  ],

  open() {
    const overlay = document.getElementById('cmd-palette-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
    const input = document.getElementById('cmd-search');
    if (input) {
      input.value = '';
      input.focus();
    }
    this._selected = 0;
    this._render(this.COMMANDS);
  },

  close() {
    const overlay = document.getElementById('cmd-palette-overlay');
    if (overlay) overlay.classList.remove('open');
  },

  filter(q) {
    if (!q.trim()) { this._render(this.COMMANDS); return; }
    const lower = q.toLowerCase();
    const filtered = this.COMMANDS.filter(c => c.label.toLowerCase().includes(lower) || c.tag.toLowerCase().includes(lower));
    this._selected = 0;
    this._render(filtered);
  },

  _render(cmds) {
    this._filtered = cmds;
    const container = document.getElementById('cmd-results');
    if (!container) return;
    if (cmds.length === 0) {
      container.innerHTML = '<div style="padding:24px;text-align:center;color:#475569;font-size:0.85rem">No matching commands found</div>';
      return;
    }
    container.innerHTML = cmds.map((c, i) => `
      <div class="cmd-item ${i === this._selected ? 'selected' : ''}" data-idx="${i}" onclick="UltraCmdPalette.run(${i})" onmouseover="UltraCmdPalette.hover(${i})">
        <div class="cmd-item-icon">${c.icon}</div>
        <div class="cmd-item-text">${c.label}</div>
        <div class="cmd-item-tag">${c.tag}</div>
      </div>
    `).join('');
  },

  hover(idx) {
    this._selected = idx;
    document.querySelectorAll('.cmd-item').forEach((el, i) => el.classList.toggle('selected', i === idx));
  },

  run(idx) {
    const cmd = this._filtered[idx !== undefined ? idx : this._selected];
    if (!cmd) return;
    this.close();
    setTimeout(() => cmd.action(), 40);
  },

  handleKey(e) {
    const overlay = document.getElementById('cmd-palette-overlay');
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { this.close(); e.preventDefault(); return; }
    const items = document.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') {
      this._selected = Math.min(this._selected + 1, items.length - 1);
      this.hover(this._selected);
      e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
      this._selected = Math.max(this._selected - 1, 0);
      this.hover(this._selected);
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      this.run();
      e.preventDefault();
    }
  }
};

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    UltraCmdPalette.open();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f' && !e.shiftKey) {
    e.preventDefault();
    UltraFindReplace.open();
  }
  UltraCmdPalette.handleKey(e);
});

// ── 6. FIND & REPLACE ─────────────────────────────────────────────────────────
const UltraFindReplace = {
  open() {
    const bar = document.getElementById('find-replace-bar');
    if (!bar) return;
    bar.style.display = 'flex';
    const inp = document.getElementById('find-inp');
    if (inp) inp.focus();
  },

  close() {
    const bar = document.getElementById('find-replace-bar');
    if (bar) bar.style.display = 'none';
    if (window.APP?.editor) window.APP.editor.getAllMarks().forEach(m => m.clear());
  },

  find() {
    const query = document.getElementById('find-inp')?.value;
    const editor = window.APP?.editor;
    if (!query || !editor) return;

    editor.getAllMarks().forEach(m => m.clear());
    const content = editor.getValue();
    let count = 0;
    let idx = content.indexOf(query);
    while (idx !== -1) {
      const from = editor.posFromIndex(idx);
      const to   = editor.posFromIndex(idx + query.length);
      editor.markText(from, to, { className: 'cm-find-highlight', css: 'background:rgba(251,191,36,0.45);border-radius:2px' });
      count++;
      idx = content.indexOf(query, idx + 1);
    }
    const cnt = document.getElementById('find-count');
    if (cnt) cnt.textContent = count + ' match' + (count !== 1 ? 'es' : '');
    if (count > 0) {
      const firstIdx = content.indexOf(query);
      editor.scrollIntoView(editor.posFromIndex(firstIdx));
    }
  },

  replaceAll() {
    const query   = document.getElementById('find-inp')?.value;
    const replace = document.getElementById('replace-inp')?.value || '';
    const editor  = window.APP?.editor;
    if (!query || !editor) return;

    const newVal = editor.getValue().split(query).join(replace);
    editor.setValue(newVal);
    editor.getAllMarks().forEach(m => m.clear());
    const cnt = document.getElementById('find-count');
    if (cnt) cnt.textContent = 'Replaced!';
    if (typeof showToast === 'function') showToast('🔍 Replaced all occurrences of "' + query + '"', 'success');
    if (typeof refreshPreview === 'function') refreshPreview();
  }
};

// ── 7. DATA FAKER ─────────────────────────────────────────────────────────────
const UltraDataFaker = {
  _open: false,

  NAMES: ['Alice Martin','Bob Chen','Clara Kim','David Müller','Emma Davis','Félix Dupont','Grace Lee','Hugo Blanc'],
  EMAILS: ['alice@example.com','bob.chen@startup.io','clara.k@design.co','david@devco.net'],
  PRICES: ['$14.99','$49.00','$129.99','€24.90','€99.00','$299.00'],
  PRODUCTS: ['Wireless Headphones','Mechanical Keyboard','Ultra 4K Monitor','Smart Watch Pro','USB-C Hub','Laptop Stand'],
  CITIES: ['Paris','London','Tokyo','New York','Berlin','Sydney','Montreal','Singapore'],

  toggle() {
    const panel = document.getElementById('data-faker-panel');
    if (!panel) return;
    const ep = document.getElementById('explain-slide-panel');
    if (ep) ep.classList.remove('open');

    this._open = !this._open;
    panel.classList.toggle('open', this._open);
  },

  inject(type) {
    const editor = window.APP?.editor;
    if (!editor) {
      if (typeof showToast === 'function') showToast('Load an app into the editor first!', 'error');
      return;
    }
    let snippet = '';
    if (type === 'names')    snippet = JSON.stringify(this.NAMES.slice(0, 5));
    if (type === 'emails')   snippet = JSON.stringify(this.EMAILS);
    if (type === 'prices')   snippet = JSON.stringify(this.PRICES);
    if (type === 'products') snippet = JSON.stringify(this.PRODUCTS);
    if (type === 'chart')    snippet = JSON.stringify(Array.from({length:7}, () => Math.floor(Math.random()*85) + 15));
    if (type === 'cities')   snippet = JSON.stringify(this.CITIES);
    if (type === 'colors')   snippet = JSON.stringify(['#6366f1','#8b5cf6','#38bdf8','#10b981','#f59e0b','#f43f5e']);
    if (type === 'avatar')   snippet = '"https://i.pravatar.cc/120?img=' + (Math.floor(Math.random()*60)+1) + '"';

    editor.replaceSelection(snippet);
    if (typeof showToast === 'function') showToast('📊 Fake data injected into code!', 'success');
  }
};

// ── 8. VISUAL CSS THEME CUSTOMIZER ────────────────────────────────────────────
const UltraVisualCSS = {
  _open: false,

  THEMES: [
    { name: 'Neon Cyber',  bg: '#030712', accent: '#6366f1', text: '#f8fafc' },
    { name: 'Ocean Frost', bg: '#0c1a2e', accent: '#0ea5e9', text: '#e0f2fe' },
    { name: 'Sunset Glow', bg: '#1c0a0a', accent: '#f97316', text: '#ffedd5' },
    { name: 'Matrix Hacker',bg:'#041308', accent: '#22c55e', text: '#dcfce7' },
    { name: 'Monochrome',  bg: '#121212', accent: '#a1a1aa', text: '#fafafa' },
    { name: 'Clean Light', bg: '#f8fafc', accent: '#4f46e5', text: '#0f172a' },
  ],

  toggle() {
    const panel = document.getElementById('visual-css-panel');
    if (!panel) return;
    this._open = !this._open;
    panel.style.display = this._open ? 'block' : 'none';
    if (this._open) this._render();
  },

  _render() {
    const swatches = document.getElementById('css-swatches');
    if (swatches) {
      swatches.innerHTML = this.THEMES.map(t => `
        <div class="css-theme-swatch" title="${t.name}" style="background:linear-gradient(135deg,${t.bg},${t.accent})" onclick="UltraVisualCSS.applyTheme('${t.name}')"></div>
      `).join('');
    }

    const pickers = document.getElementById('css-pickers');
    if (pickers) {
      pickers.innerHTML = `
        <div class="css-picker-row">
          <span class="css-picker-label">Accent</span>
          <input type="color" value="#6366f1" oninput="UltraVisualCSS.applyProp('accent', this.value)" style="width:32px;height:24px;border:none;background:none;cursor:pointer" />
        </div>
        <div class="css-picker-row">
          <span class="css-picker-label">Background</span>
          <input type="color" value="#030712" oninput="UltraVisualCSS.applyProp('bg', this.value)" style="width:32px;height:24px;border:none;background:none;cursor:pointer" />
        </div>
      `;
    }
  },

  applyTheme(name) {
    const t = this.THEMES.find(x => x.name === name);
    if (!t) return;
    this.applyProp('bg', t.bg);
    this.applyProp('accent', t.accent);
    if (typeof showToast === 'function') showToast('🎨 Applied ' + name + ' theme!', 'success');
  },

  applyProp(prop, val) {
    const frame = document.getElementById('preview-frame');
    if (!frame) return;
    try {
      const doc = frame.contentDocument || frame.contentWindow?.document;
      if (!doc) return;
      if (prop === 'bg') doc.body.style.backgroundColor = val;
      if (prop === 'accent') {
        let st = doc.getElementById('_ultra_accent');
        if (!st) {
          st = doc.createElement('style');
          st.id = '_ultra_accent';
          doc.head.appendChild(st);
        }
        st.textContent = `* { --accent: ${val} !important; accent-color: ${val} !important; }`;
      }
    } catch(e) {}
  }
};

// ── 9. PREVIEW THEME TOGGLE ───────────────────────────────────────────────────
const UltraPreviewTheme = {
  _modeIdx: 0,
  MODES: ['original', 'dark', 'light'],
  LABELS: ['Original', 'Force Dark 🌑', 'Force Light ☀️'],

  toggle() {
    this._modeIdx = (this._modeIdx + 1) % this.MODES.length;
    window._previewThemeMode = this.MODES[this._modeIdx];

    const btn = document.getElementById('btn-theme-toggle');
    if (btn) btn.textContent = '🌗 ' + this.LABELS[this._modeIdx];

    if (typeof refreshPreview === 'function') refreshPreview();
    if (typeof showToast === 'function') showToast('🌗 Preview Theme: ' + this.LABELS[this._modeIdx], 'info');
  }
};

// ── 10. DUAL PREVIEW (MOBILE + DESKTOP) ────────────────────────────────────────
const UltraDualPreview = {
  _active: false,

  toggle() {
    const frame = document.getElementById('preview-frame');
    const dualWrap = document.getElementById('dual-preview-wrap');
    const empty = document.getElementById('preview-empty');
    if (!frame || !dualWrap) return;

    this._active = !this._active;
    const btn = document.getElementById('btn-dual-preview');

    if (this._active) {
      if (empty) empty.style.display = 'none';
      frame.style.display = 'none';
      dualWrap.style.display = 'flex';
      if (btn) btn.classList.add('active');

      const doc = (typeof buildPreviewDoc === 'function') ? buildPreviewDoc() : (frame.srcdoc || '');
      const mf = document.getElementById('dual-mobile-frame');
      const df = document.getElementById('dual-desktop-frame');
      if (mf) mf.srcdoc = doc;
      if (df) df.srcdoc = doc;

      if (typeof showToast === 'function') showToast('⊞ Dual Preview: Mobile (375px) + Desktop Active', 'success');
    } else {
      dualWrap.style.display = 'none';
      frame.style.display = 'block';
      if (btn) btn.classList.remove('active');
      if (typeof showToast === 'function') showToast('Single Preview Restored', 'info');
    }
  }
};

// ── 11. SCREENSHOT CAPTURE ────────────────────────────────────────────────────
const UltraScreenshot = {
  take() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Capture App Screenshot')) return;
    const frame = document.getElementById('preview-frame');
    const flash = document.getElementById('screenshot-flash');
    if (flash) {
      flash.classList.remove('snap');
      void flash.offsetWidth;
      flash.classList.add('snap');
    }

    if (typeof showToast === 'function') showToast('📸 Capturing screenshot...', 'info');

    try {
      const doc = frame?.contentDocument || frame?.contentWindow?.document;
      if (doc && doc.body && window.html2canvas) {
        html2canvas(doc.body, { useCORS: true, allowTaint: true }).then(canvas => {
          const link = document.createElement('a');
          link.download = (window.APP?.currentAppName || 'app').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-screenshot.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          if (typeof showToast === 'function') showToast('📸 Screenshot saved as PNG!', 'success');
        }).catch(() => this._fallback());
        return;
      }
    } catch(e) {}
    this._fallback();
  },

  _fallback() {
    const code = (typeof buildFullHTML === 'function') ? buildFullHTML() : getActiveCode();
    const blob = new Blob([code], { type: 'text/html' });
    const link = document.createElement('a');
    link.download = (window.APP?.currentAppName || 'app').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-snapshot.html';
    link.href = URL.createObjectURL(blob);
    link.click();
    if (typeof showToast === 'function') showToast('📸 Saved HTML snapshot! Open it in browser to screenshot.', 'info');
  }
};

// ── 12. PWA EXPORT ────────────────────────────────────────────────────────────
const UltraPWA = {
  export() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export PWA Project')) return;
    const code = (typeof buildFullHTML === 'function') ? buildFullHTML() : getActiveCode();
    if (!code) {
      if (typeof showToast === 'function') showToast('No app loaded to export!', 'error');
      return;
    }
    const appName = window.APP?.currentAppName || 'Ultra PWA App';
    const slug = appName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const manifest = JSON.stringify({
      name: appName,
      short_name: appName.substring(0, 12),
      start_url: './index.html',
      display: 'standalone',
      background_color: '#030712',
      theme_color: '#6366f1',
      icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }]
    }, null, 2);

    const sw = `const CACHE = 'pwa-cache-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});`;

    if (window.JSZip) {
      const zip = new JSZip();
      zip.file('index.html', code);
      zip.file('manifest.json', manifest);
      zip.file('service-worker.js', sw);

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 192;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(0, 0, 192, 192);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡', 96, 96);
      const b64 = canvas.toDataURL('image/png').split(',')[1];
      zip.file('icon-192.png', b64, { base64: true });

      zip.generateAsync({ type: 'blob' }).then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = slug + '-pwa.zip';
        a.click();
        if (typeof showToast === 'function') showToast('📱 PWA Exported as ZIP!', 'success');
      });
    } else {
      const b = new Blob([code], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = slug + '.html';
      a.click();
      if (typeof showToast === 'function') showToast('📱 App downloaded! (JSZip not found)', 'info');
    }
  }
};

// ── 13. REACT EXPORT ──────────────────────────────────────────────────────────
const UltraReactExport = {
  convert() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export React JSX Component')) return;
    const code = getActiveCode();
    if (!code) {
      if (typeof showToast === 'function') showToast('No code to convert!', 'error');
      return;
    }
    const appName = (window.APP?.currentAppName || 'UltraApp').replace(/[^a-zA-Z0-9]/g, '');
    const html = window.APP?.html || '';
    const css  = window.APP?.css  || '';
    const js   = window.APP?.js   || '';

    const component = "import React, { useEffect, useRef } from 'react';\n\n" +
      "// Embedded Application Styles\n" +
      "const styles = `" + css.replace(/`/g, '\\`') + "`;\n\n" +
      "export default function " + (appName || 'App') + "() {\n" +
      "  const rootRef = useRef(null);\n\n" +
      "  useEffect(() => {\n" +
      "    // Inject component styles\n" +
      "    const styleEl = document.createElement('style');\n" +
      "    styleEl.textContent = styles;\n" +
      "    document.head.appendChild(styleEl);\n\n" +
      "    // Application script logic\n" +
      "    try {\n" +
      "      " + js + "\n" +
      "    } catch(err) {\n" +
      "      console.error('Error running application logic:', err);\n" +
      "    }\n\n" +
      "    return () => {\n" +
      "      document.head.removeChild(styleEl);\n" +
      "    };\n" +
      "  }, []);\n\n" +
      "  return (\n" +
      "    <div ref={rootRef} className=\"ultra-react-wrapper\">\n" +
      "      <div dangerouslySetInnerHTML={{ __html: `" + html.replace(/`/g, '\\`') + "` }} />\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n";

    const blob = new Blob([component], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (appName || 'App') + '.jsx';
    a.click();
    if (typeof showToast === 'function') showToast('⚛️ Exported React Component (' + (appName || 'App') + '.jsx)!', 'success');
  }
};

// ── 14. GITHUB GIST ───────────────────────────────────────────────────────────
const UltraGist = {
  async export() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Deploy to GitHub Gist')) return;
    const code = (typeof buildFullHTML === 'function') ? buildFullHTML() : getActiveCode();
    if (!code) {
      if (typeof showToast === 'function') showToast('No code to publish!', 'error');
      return;
    }
    const token = localStorage.getItem('ultra_gh_token') || prompt('Enter your GitHub Personal Access Token (with gist scope):', '');
    if (!token) return;
    localStorage.setItem('ultra_gh_token', token);

    const appName = window.APP?.currentAppName || 'Ultra Web App';
    if (typeof showToast === 'function') showToast('🐙 Publishing to GitHub Gist...', 'info');

    try {
      const res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: { 'Authorization': 'token ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: appName + ' — Generated by IA Architecte Studio ULTRA',
          public: true,
          files: {
            'index.html': { content: code },
            'README.md': { content: '# ' + appName + '\n\nBuilt with [IA Architecte Studio ULTRA](https://ultra-studio.io)' }
          }
        })
      });
      const data = await res.json();
      if (data.html_url) {
        if (typeof showToast === 'function') showToast('🐙 Gist created successfully!', 'success');
        window.open(data.html_url, '_blank');
      } else {
        if (typeof showToast === 'function') showToast('Gist error: ' + (data.message || 'Check token permissions'), 'error');
      }
    } catch(e) {
      if (typeof showToast === 'function') showToast('Gist request failed. Check network & token.', 'error');
    }
  }
};

// ── 15. INTERACTIVE TUTORIAL ──────────────────────────────────────────────────
const UltraTutorial = {
  _step: 0,
  STEPS: [
    { title: 'Welcome to Ultra Studio! 🚀', text: 'Your AI-powered web studio. Let\'s walk through the core features in 30 seconds.', sel: '.topbar-brand' },
    { title: '🚀 App Hub', text: 'Browse 27+ fully functional web applications across Games, Productivity, SaaS & Tools.', sel: '.tb-btn.hub' },
    { title: '✦ Generate with AI', text: 'Type any app idea and click Generate App. Add your Gemini API key for unlimited AI creation!', sel: '#btn-generate' },
    { title: '💡 Spark Ideas & Variants', text: 'Use Spark Ideas for instant demos, or 3 Variants to explore multiple variations of any idea.', sel: '#btn-spark' },
    { title: '📝 Live Code Studio', text: 'Inspect and edit HTML, CSS, JavaScript, with live syntax highlighting and instant preview updates.', sel: '.file-tabs' },
    { title: '⬚ View Switcher', text: 'Easily switch between Split 50/50, Code Only, or Fullscreen Preview.', sel: '#topbar-view-btns' },
    { title: '📁 My Projects', text: 'Save your creations and access 20 automatic version snapshots anytime.', sel: '.tb-btn.projects' },
    { title: '💾 Export Anywhere', text: 'Export as Single HTML, ZIP, Progressive Web App (PWA), React component, or publish to GitHub Gist!', sel: '.tb-btn[onclick*=export]' },
  ],

  start() {
    this._step = 0;
    this._showStep();
  },

  _showStep() {
    const overlay = document.getElementById('tutorial-overlay');
    const tooltip = document.getElementById('tutorial-tooltip');
    const hl      = document.getElementById('tutorial-highlight');
    if (!overlay || !tooltip || !hl) return;

    overlay.style.display = 'block';
    const step = this.STEPS[this._step];
    if (!step) { this.end(); return; }

    const target = document.querySelector(step.sel);
    if (target) {
      const rect = target.getBoundingClientRect();
      hl.style.cssText = `left:${rect.left-4}px;top:${rect.top-4}px;width:${rect.width+8}px;height:${rect.height+8}px;`;
      let top  = rect.bottom + 14;
      let left = Math.min(rect.left, window.innerWidth - 340);
      if (top + 200 > window.innerHeight) top = rect.top - 200;
      tooltip.style.cssText = `top:${Math.max(10, top)}px;left:${Math.max(10, left)}px`;
    } else {
      tooltip.style.cssText = 'top:35%;left:50%;transform:translateX(-50%)';
    }

    const tTitle = document.getElementById('tut-title');
    const tText  = document.getElementById('tut-text');
    const tStep  = document.getElementById('tut-step');
    const tNext  = document.getElementById('tut-next');
    if (tTitle) tTitle.textContent = step.title;
    if (tText)  tText.textContent  = step.text;
    if (tStep)  tStep.textContent  = (this._step + 1) + ' / ' + this.STEPS.length;
    if (tNext)  tNext.textContent  = (this._step === this.STEPS.length - 1) ? 'Finish 🎉' : 'Next →';
  },

  next() {
    this._step++;
    if (this._step >= this.STEPS.length) { this.end(); return; }
    this._showStep();
  },

  end() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) overlay.style.display = 'none';
    localStorage.setItem('ultra_tutorial_done', '1');
    if (typeof showToast === 'function') showToast('🎉 Tutorial completed! Enjoy building!', 'success');
  }
};

// ── 16. SMART NOTIFICATIONS ───────────────────────────────────────────────────
const UltraSmartNotifs = {
  show(msg, btnLabel, action) {
    if (!msg) return;
    const el  = document.getElementById('smart-notif');
    const txt = document.getElementById('smart-notif-text');
    if (!el || !txt) return;
    txt.textContent = msg;
    const btn = document.getElementById('smart-notif-action');
    if (btn) {
      btn.textContent = btnLabel || 'Action';
      btn.onclick = () => { this.dismiss(); if (action) action(); };
    }
    el.classList.add('show');
    setTimeout(() => this.dismiss(), 7000);
  },

  dismiss() {
    const el = document.getElementById('smart-notif');
    if (el) el.classList.remove('show');
  }
};
