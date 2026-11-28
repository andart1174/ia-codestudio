/**
 * IA Code Studio — Neural Forge Frontend Controller
 * - Connects the Hero Prompt Bar directly to Google Gemini 2.5 Flash via /.netlify/functions/ai-architect
 * - ZERO free API burn: non-paying visitors get 4 rich local interactive demos ($0 cost) + Creator Pro Paywall on any custom prompt
 * - Verified Creator Pro (Stripe active subscription / Firestore premium / Admin) unlocks:
 *     * Unlimited custom app generation with IA Code Studio 3D & UI DNA Memory
 *     * 3D WebGL Boost toggle, Sketch/Screenshot-to-App multimodal upload, EN/FR Voice-to-App
 *     * Iterative multi-turn chat with memory + Invisible JS Auto-Repair
 *     * Saved Memory Vault + 1-click handoff to Studio Pro IDE / Ultra IDE + Standalone HTML & ZIP export
 */
(function (window, document) {
  'use strict';

  const API_ENDPOINT = '/.netlify/functions/ai-architect';
  const STRIPE_PRO_URL = 'https://buy.stripe.com/bJecN61Fk3staax7mGbfO03';
  const VAULT_KEY = 'ia_neural_forge_vault_v1';
  const HANDOFF_KEY = 'ia_forge_handoff';

  const state = {
    mode: 'pro',
    boost3d: false,
    imageBase64: '',
    imageMime: '',
    imageName: '',
    isPro: false,
    proSource: 'none',
    proEmail: '',
    proChecked: false,
    isDemoMode: false,
    busy: false,
    autoRepairedOnce: false,
    pendingCustomRequest: null,
    currentApp: null, // { id, title, summary, html, css, js, dnaUsed, model, createdAt, isDemo }
    activeCodeTab: 'html',
    activeView: 'preview',
    chatHistory: []
  };

  function getLang() {
    if (document.documentElement && document.documentElement.lang === 'fr') return 'fr';
    if (window.currentLang === 'fr') return 'fr';
    return 'en';
  }

  function t(en, fr) {
    return getLang() === 'fr' ? fr : en;
  }

  // ============================================================================
  // ZERO-DEPENDENCY STORE-MODE ZIP BUILDER (index.html + style.css + script.js)
  // ============================================================================
  function buildZipBlob(files) {
    const encoder = new TextEncoder();
    const crcTable = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      crcTable[i] = c >>> 0;
    }
    function crc32(bytes) {
      let c = 0xFFFFFFFF;
      for (let i = 0; i < bytes.length; i++) c = crcTable[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
      return (c ^ 0xFFFFFFFF) >>> 0;
    }

    const localParts = [];
    const centralParts = [];
    let offset = 0;

    for (const f of files) {
      const nameBytes = encoder.encode(f.name);
      const dataBytes = encoder.encode(f.content);
      const crc = crc32(dataBytes);

      const lh = new ArrayBuffer(30);
      const lv = new DataView(lh);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true);
      lv.setUint16(8, 0, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, dataBytes.length, true);
      lv.setUint32(22, dataBytes.length, true);
      lv.setUint16(26, nameBytes.length, true);

      localParts.push(new Uint8Array(lh), nameBytes, dataBytes);

      const ch = new ArrayBuffer(46);
      const cv = new DataView(ch);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, dataBytes.length, true);
      cv.setUint32(24, dataBytes.length, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint32(42, offset, true);

      centralParts.push(new Uint8Array(ch), nameBytes);
      offset += 30 + nameBytes.length + dataBytes.length;
    }

    const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
    const eocd = new ArrayBuffer(22);
    const ev = new DataView(eocd);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, files.length, true);
    ev.setUint16(10, files.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);

    return new Blob([...localParts, ...centralParts, new Uint8Array(eocd)], { type: 'application/zip' });
  }

  function assembleStandaloneHtml(app, includeErrorBridge) {
    const safeTitle = String(app.title || 'IA Code Studio App').replace(/</g, '&lt;');
    const errBridge = includeErrorBridge
      ? `<script>(function(){window.addEventListener('error',function(e){try{parent.postMessage({type:'ia-nf-runtime-error',message:(e.message||'Runtime error')+(e.lineno?' (line '+e.lineno+')':'')},'*');}catch(_){}});window.addEventListener('unhandledrejection',function(e){try{parent.postMessage({type:'ia-nf-runtime-error',message:'Unhandled Promise: '+(e.reason&&e.reason.message?e.reason.message:String(e.reason))},'*');}catch(_){}});})();<\/script>`
      : '';
    return `<!DOCTYPE html>
<html lang="${getLang()}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>\n${app.css || ''}\n  </style>
  ${errBridge}
</head>
<body>
${app.html || ''}
<script>
try {
${app.js || ''}
} catch (err) {
  console.error(err);
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'ia-nf-runtime-error', message: err && err.message ? err.message : String(err) }, '*');
  }
}
<\/script>
</body>
</html>`;
  }

  // ============================================================================
  // FIREBASE ID TOKEN & SERVER-SIDE PRO STATUS CHECK (ZERO GEMINI COST)
  // ============================================================================
  async function getFirebaseIdToken(forceRefresh) {
    try {
      if (typeof firebase !== 'undefined' && firebase.auth) {
        const user = firebase.auth().currentUser;
        if (user) {
          return await user.getIdToken(Boolean(forceRefresh));
        }
      }
    } catch (e) {}
    return null;
  }

  async function refreshProStatus() {
    const token = await getFirebaseIdToken(false);
    if (!token) {
      state.isPro = false;
      state.proSource = 'none';
      state.proEmail = '';
      state.proChecked = true;
      updateProBadgeUI();
      return state.isPro;
    }

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ action: 'status' })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data && data.ok) {
        state.isPro = Boolean(data.isPro);
        state.proSource = data.source || 'none';
        state.proEmail = data.email || '';
      } else {
        state.isPro = false;
        state.proSource = 'none';
      }
    } catch (e) {
      // Offline / local dev fallback: keep server-first strictness
      state.isPro = false;
    }
    state.proChecked = true;
    updateProBadgeUI();

    // If user just signed in after hitting the Pro Paywall and IS verified Pro, auto-launch their queued prompt!
    if (state.isPro && state.pendingCustomRequest) {
      const queued = state.pendingCustomRequest;
      state.pendingCustomRequest = null;
      closePaywall();
      runGeminiBuild(queued);
    }
    return state.isPro;
  }

  function updateProBadgeUI() {
    const pill = document.getElementById('nf-pro-status-pill');
    if (!pill) return;
    if (state.isPro) {
      pill.classList.add('is-pro');
      if (state.proSource === 'admin') {
        pill.textContent = t('⚡ ADMIN AI ACTIVE', '⚡ IA ADMIN ACTIVE');
      } else {
        pill.textContent = t('✓ PRO AI ACTIVE', '✓ IA PRO ACTIVE');
      }
      pill.title = state.proEmail || 'Pro Active';
    } else {
      pill.classList.remove('is-pro');
      pill.textContent = t('🔒 Creator Pro AI', '🔒 IA Creator Pro');
      pill.title = t('Unlock Google Gemini Pro AI ($10/mo)', 'Débloquer IA Google Gemini Pro (10 $/mois)');
    }
    updateVaultChipUI();
  }

  // ============================================================================
  // MEMORY VAULT (LOCAL PERSISTENCE FOR PRO CREATIONS)
  // ============================================================================
  function loadVault() {
    try {
      const arr = JSON.parse(localStorage.getItem(VAULT_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function saveToVault(app) {
    if (!app || app.isDemo) return;
    const list = loadVault().filter(item => item.id !== app.id);
    list.unshift({
      id: app.id || ('app_' + Date.now()),
      title: app.title,
      summary: app.summary,
      html: app.html,
      css: app.css,
      js: app.js,
      dnaUsed: app.dnaUsed || [],
      model: app.model || 'gemini-3.8-flash',
      createdAt: app.createdAt || Date.now()
    });
    try {
      localStorage.setItem(VAULT_KEY, JSON.stringify(list.slice(0, 12)));
    } catch (e) {}
    renderVaultList();
    updateVaultChipUI();
  }

  function updateVaultChipUI() {
    const btn = document.getElementById('nf-vault-chip-btn');
    if (!btn) return;
    const count = loadVault().length;
    if (count > 0) {
      btn.style.display = 'inline-flex';
      btn.textContent = t(`🧠 My Apps (${count})`, `🧠 Mes Apps (${count})`);
    } else {
      btn.style.display = 'none';
    }
  }

  function renderVaultList() {
    const wrap = document.getElementById('nf-vault-list');
    if (!wrap) return;
    const list = loadVault();
    if (!list.length) {
      wrap.innerHTML = `<div class="nf-msg ai">${t('No saved AI apps yet. Your Pro builds will automatically save here in Memory Vault.', 'Aucune app sauvegardée. Vos créations Pro s’enregistrent automatiquement ici.')}</div>`;
      return;
    }
    wrap.innerHTML = list.map((item, idx) => {
      const dt = new Date(item.createdAt || Date.now()).toLocaleDateString(getLang() === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const safeTitle = String(item.title || 'App').replace(/</g, '&lt;');
      return `<div class="nf-vault-item" data-vidx="${idx}">
        <div class="nf-vault-item-title">⚡ ${safeTitle}</div>
        <div class="nf-vault-item-meta"><span>${item.model || 'Gemini 2.5'}</span><span>${dt}</span></div>
      </div>`;
    }).join('');
    wrap.querySelectorAll('.nf-vault-item').forEach(el => {
      el.addEventListener('click', () => {
        const chosen = list[Number(el.dataset.vidx)];
        if (chosen) {
          state.isDemoMode = false;
          mountAppInForge({ ...chosen, isDemo: false });
          switchSideTab('chat');
        }
      });
    });
  }

  // ============================================================================
  // UI INJECTION: LIVE FORGE OVERLAY + PRO PAYWALL MODAL
  // ============================================================================
  function injectModalsOnce() {
    if (document.getElementById('nf-workspace-modal')) return;

    const forgeHtml = `
    <div id="nf-workspace-modal" class="nf-overlay" role="dialog" aria-modal="true" aria-label="Neural Forge Live Workspace">
      <header class="nf-header">
        <div class="nf-brand">
          <div class="nf-logo-orb">⚡</div>
          <div class="nf-title-wrap">
            <div class="nf-app-title" id="nf-app-title">IA Neural Architect</div>
            <div class="nf-meta-badge" id="nf-meta-badge">Gemini 3.8 Flash · IA DNA</div>
          </div>
        </div>

        <div class="nf-center-controls">
          <button type="button" class="nf-seg-btn active" data-nf-view="preview" id="nf-tab-preview">👁️ Preview</button>
          <button type="button" class="nf-seg-btn" data-nf-view="code" id="nf-tab-code">💻 Code</button>
          <span style="width:1px;height:16px;background:rgba(255,255,255,0.12);margin:0 2px;"></span>
          <button type="button" class="nf-seg-btn active" data-nf-vp="desktop" title="Desktop">🖥️</button>
          <button type="button" class="nf-seg-btn" data-nf-vp="tablet" title="Tablet 768px">📱</button>
          <button type="button" class="nf-seg-btn" data-nf-vp="mobile" title="Mobile 390px">📲</button>
        </div>

        <div class="nf-actions">
          <button type="button" class="nf-btn nf-btn-primary" id="nf-btn-open-pro">🏛️ Studio Pro IDE</button>
          <button type="button" class="nf-btn" id="nf-btn-open-ultra">⚡ Ultra IDE</button>
          <button type="button" class="nf-btn nf-btn-emerald" id="nf-btn-export-zip">📦 Export ZIP</button>
          <button type="button" class="nf-btn" id="nf-btn-export-html">📥 HTML</button>
          <button type="button" class="nf-btn nf-btn-close" id="nf-btn-close">✕</button>
        </div>
      </header>

      <div id="nf-demo-banner" class="nf-demo-banner">
        <span id="nf-demo-banner-text"></span>
        <div class="nf-demo-banner-actions">
          <button type="button" class="nf-demo-cta" id="nf-demo-upgrade-btn">💎 Unlock Pro ($10/mo)</button>
          <button type="button" class="nf-demo-login" id="nf-demo-signin-btn">🔐 Sign in</button>
        </div>
      </div>

      <div class="nf-body">
        <aside class="nf-sidebar">
          <div class="nf-side-tabs">
            <button type="button" class="nf-side-tab active" id="nf-stab-chat">💬 Neural Chat</button>
            <button type="button" class="nf-side-tab" id="nf-stab-vault">🧠 Memory Vault</button>
          </div>
          <div class="nf-dna-strip" id="nf-dna-strip"></div>
          <div class="nf-chat-log" id="nf-chat-log"></div>
          <div class="nf-vault-list" id="nf-vault-list"></div>
          <form class="nf-chat-form" id="nf-chat-form">
            <input type="text" class="nf-chat-input" id="nf-chat-input" placeholder="Refine app... e.g. Make it light mode, add French" autocomplete="off">
            <button type="submit" class="nf-chat-send" id="nf-chat-send">⚡</button>
          </form>
        </aside>

        <section class="nf-stage">
          <div class="nf-loader" id="nf-loader">
            <div class="nf-orb-spin"></div>
            <div class="nf-loader-title" id="nf-loader-title">IA Neural Architect</div>
            <div class="nf-loader-step" id="nf-loader-step">Analyzing prompt &amp; selecting 3D DNA...</div>
          </div>

          <div class="nf-iframe-wrap" id="nf-iframe-wrap">
            <iframe id="nf-preview-iframe" class="nf-iframe" sandbox="allow-scripts allow-forms allow-modals allow-popups"></iframe>
          </div>

          <div class="nf-code-wrap" id="nf-code-wrap">
            <div class="nf-code-bar">
              <div class="nf-code-tabs">
                <button type="button" class="nf-code-tab active" data-ctab="html">HTML</button>
                <button type="button" class="nf-code-tab" data-ctab="css">CSS</button>
                <button type="button" class="nf-code-tab" data-ctab="js">JavaScript</button>
              </div>
              <button type="button" class="nf-btn" id="nf-btn-copy-code">📋 Copy</button>
            </div>
            <pre class="nf-code-pre" id="nf-code-pre"></pre>
          </div>
        </section>
      </div>
    </div>

    <div id="nf-paywall-modal" class="nf-paywall-overlay" role="dialog" aria-modal="true" aria-label="Creator Pro AI Required">
      <div class="nf-paywall-card">
        <button type="button" class="nf-paywall-close" id="nf-pw-close">×</button>
        <div class="nf-pw-badge">⚡ CREATOR PRO · GOOGLE GEMINI 3.8 ENGINE</div>
        <h2 id="nf-pw-heading">Unlock Unlimited Custom AI App Generation</h2>
        <div class="nf-pw-prompt-box" id="nf-pw-prompt-preview"></div>
        <ul class="nf-pw-list" id="nf-pw-features"></ul>
        <button type="button" class="nf-pw-cta" id="nf-pw-upgrade">💎 Unlock Creator Pro ($10/mo via Stripe)</button>
        <button type="button" class="nf-pw-signin" id="nf-pw-signin">🔐 Already Pro? Sign in with Google</button>
        <button type="button" class="nf-pw-demo-link" id="nf-pw-try-demo">✨ Or preview a free interactive Demo App ($0)</button>
        <p class="nf-pw-note" id="nf-pw-note"></p>
      </div>
    </div>`;

    const holder = document.createElement('div');
    holder.innerHTML = forgeHtml;
    while (holder.firstChild) document.body.appendChild(holder.firstChild);

    bindModalEvents();
  }

  function bindModalEvents() {
    document.getElementById('nf-btn-close').addEventListener('click', closeForge);
    document.getElementById('nf-pw-close').addEventListener('click', closePaywall);
    document.getElementById('nf-paywall-modal').addEventListener('click', (e) => {
      if (e.target.id === 'nf-paywall-modal') closePaywall();
    });

    document.getElementById('nf-pw-upgrade').addEventListener('click', () => {
      window.open(STRIPE_PRO_URL, '_blank', 'noopener');
    });
    document.getElementById('nf-demo-upgrade-btn').addEventListener('click', () => {
      window.open(STRIPE_PRO_URL, '_blank', 'noopener');
    });

    function triggerGoogleProSignIn() {
      closePaywall();
      if (typeof window.handleGoogleSignIn === 'function') {
        window.handleGoogleSignIn().then(() => {
          setTimeout(() => refreshProStatus(), 500);
        });
      } else if (typeof window.openModal === 'function') {
        window.openModal('login');
      } else {
        window.location.href = '/index.html?lang=' + getLang() + '&auth=login';
      }
    }
    document.getElementById('nf-pw-signin').addEventListener('click', triggerGoogleProSignIn);
    document.getElementById('nf-demo-signin-btn').addEventListener('click', () => {
      closeForge();
      triggerGoogleProSignIn();
    });

    document.getElementById('nf-pw-try-demo').addEventListener('click', () => {
      closePaywall();
      launchZeroCostDemo('saas');
    });

    // View & Viewport buttons
    document.querySelectorAll('[data-nf-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.nfView;
        state.activeView = v;
        document.querySelectorAll('[data-nf-view]').forEach(b => b.classList.toggle('active', b === btn));
        document.getElementById('nf-iframe-wrap').style.display = v === 'preview' ? 'flex' : 'none';
        document.getElementById('nf-code-wrap').classList.toggle('visible', v === 'code');
        if (v === 'code') renderCodeInspector();
      });
    });

    document.querySelectorAll('[data-nf-vp]').forEach(btn => {
      btn.addEventListener('click', () => {
        const vp = btn.dataset.nfVp;
        document.querySelectorAll('[data-nf-vp]').forEach(b => b.classList.toggle('active', b === btn));
        const wrap = document.getElementById('nf-iframe-wrap');
        wrap.classList.remove('vp-tablet', 'vp-mobile');
        if (vp === 'tablet') wrap.classList.add('vp-tablet');
        if (vp === 'mobile') wrap.classList.add('vp-mobile');
      });
    });

    // Sidebar tabs (Chat vs Memory Vault)
    document.getElementById('nf-stab-chat').addEventListener('click', () => switchSideTab('chat'));
    document.getElementById('nf-stab-vault').addEventListener('click', () => switchSideTab('vault'));

    // Code inspector language tabs
    document.querySelectorAll('.nf-code-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCodeTab = btn.dataset.ctab;
        document.querySelectorAll('.nf-code-tab').forEach(b => b.classList.toggle('active', b === btn));
        renderCodeInspector();
      });
    });

    // Copy code (Pro gated on demos)
    document.getElementById('nf-btn-copy-code').addEventListener('click', () => {
      if (!state.isPro) {
        openPaywall(t('Unlock unlimited clean code copy & ZIP export', 'Débloquez la copie du code source et l’export ZIP illimité'));
        return;
      }
      if (!state.currentApp) return;
      const val = state.currentApp[state.activeCodeTab] || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(val).then(() => {
          const btn = document.getElementById('nf-btn-copy-code');
          btn.textContent = t('✓ Copied!', '✓ Copié !');
          setTimeout(() => { btn.textContent = t('📋 Copy', '📋 Copier'); }, 1800);
        });
      }
    });

    // Export standalone HTML & ZIP (Pro gated!)
    document.getElementById('nf-btn-export-html').addEventListener('click', () => {
      if (!state.isPro) {
        openPaywall(t('Download standalone production HTML files', 'Télécharger le fichier HTML autonome de production'));
        return;
      }
      if (!state.currentApp) return;
      const fullHtml = assembleStandaloneHtml(state.currentApp, false);
      const slug = (state.currentApp.title || 'ia-app').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'ia-app';
      downloadBlob(new Blob([fullHtml], { type: 'text/html;charset=utf-8' }), slug + '.html');
    });

    document.getElementById('nf-btn-export-zip').addEventListener('click', () => {
      if (!state.isPro) {
        openPaywall(t('Export clean multi-file ZIP project bundles', 'Exporter le projet complet en archive ZIP (HTML/CSS/JS)'));
        return;
      }
      if (!state.currentApp) return;
      const app = state.currentApp;
      const slug = (app.title || 'ia-app').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'ia-app';
      const indexHtml = `<!DOCTYPE html>\n<html lang="${getLang()}">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${String(app.title || 'IA App').replace(/</g, '&lt;')}</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n${app.html || ''}\n  <script src="script.js"><\/script>\n</body>\n</html>`;
      const blob = buildZipBlob([
        { name: 'index.html', content: indexHtml },
        { name: 'style.css', content: app.css || '' },
        { name: 'script.js', content: app.js || '' }
      ]);
      downloadBlob(blob, slug + '.zip');
    });

    // Handoff to Studio Pro IDE & Ultra IDE
    function handoffToIde(targetPath) {
      if (!state.currentApp) return;
      try {
        localStorage.setItem(HANDOFF_KEY, JSON.stringify({
          title: state.currentApp.title,
          html: state.currentApp.html,
          css: state.currentApp.css,
          js: state.currentApp.js,
          combinedHtml: assembleStandaloneHtml(state.currentApp, false),
          ts: Date.now()
        }));
      } catch (e) {}
      window.location.href = targetPath + '?from=forge&lang=' + getLang();
    }
    document.getElementById('nf-btn-open-pro').addEventListener('click', () => handoffToIde('/ia-architecte-app/index.html'));
    document.getElementById('nf-btn-open-ultra').addEventListener('click', () => handoffToIde('/ia-architecte-studio-ultra/index.html'));

    // Iterative Multi-Turn Chat Form (Pro only — Zero API Burn!)
    document.getElementById('nf-chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = document.getElementById('nf-chat-input');
      const text = (inp.value || '').trim();
      if (!text || state.busy) return;
      if (!state.isPro) {
        state.pendingCustomRequest = { prompt: text, isModify: Boolean(state.currentApp && !state.isDemoMode) };
        openPaywall(text);
        return;
      }
      inp.value = '';
      if (state.currentApp) {
        runGeminiModify(text);
      } else {
        runGeminiBuild({ prompt: text, mode: state.mode, boost3d: state.boost3d });
      }
    });

    // Invisible Auto-Repair Listener from sandboxed preview iframe
    window.addEventListener('message', (e) => {
      if (!e.data || e.data.type !== 'ia-nf-runtime-error') return;
      if (!state.isPro || state.isDemoMode || state.busy || state.autoRepairedOnce || !state.currentApp) return;
      const errMsg = String(e.data.message || '').trim();
      if (!errMsg) return;
      state.autoRepairedOnce = true;
      runGeminiAutoRepair(errMsg);
    });
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function switchSideTab(tab) {
    const isChat = tab === 'chat';
    document.getElementById('nf-stab-chat').classList.toggle('active', isChat);
    document.getElementById('nf-stab-vault').classList.toggle('active', !isChat);
    document.getElementById('nf-chat-log').style.display = isChat ? 'flex' : 'none';
    document.getElementById('nf-chat-form').style.display = isChat ? 'flex' : 'none';
    document.getElementById('nf-vault-list').style.display = isChat ? 'none' : 'flex';
    if (!isChat) renderVaultList();
  }

  function appendChat(role, text) {
    const log = document.getElementById('nf-chat-log');
    if (!log) return;
    const div = document.createElement('div');
    div.className = 'nf-msg ' + role;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function renderCodeInspector() {
    const pre = document.getElementById('nf-code-pre');
    if (!pre || !state.currentApp) return;
    if (!state.isPro) {
      const snippet = String(state.currentApp[state.activeCodeTab] || '').slice(0, 420);
      pre.textContent = snippet + '\n\n/* 🔒 ' + t('Creator Pro ($10/mo) unlocks full source code inspection, copy & ZIP export.', 'Creator Pro (10 $/mois) débloque le code source complet, la copie et l’export ZIP.') + ' */';
      return;
    }
    pre.textContent = state.currentApp[state.activeCodeTab] || '';
  }

  function openForge() {
    injectModalsOnce();
    document.getElementById('nf-workspace-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    // Update bilingual placeholders & buttons
    document.getElementById('nf-chat-input').placeholder = t(
      'Refine app... e.g. Light mode, add charts, translate FR',
      'Modifier l’app... ex : Mode clair, ajouter un graphique, en anglais'
    );
    document.getElementById('nf-btn-open-pro').textContent = t('🏛️ Studio Pro IDE', '🏛️ Studio Pro IDE');
    document.getElementById('nf-btn-export-zip').textContent = t('📦 Export ZIP', '📦 Exporter ZIP');
    document.getElementById('nf-demo-upgrade-btn').textContent = t('💎 Unlock Pro ($10/mo)', '💎 Passer Pro (10 $/mois)');
    document.getElementById('nf-demo-signin-btn').textContent = t('🔐 Sign in', '🔐 Connexion');
  }

  function closeForge() {
    const m = document.getElementById('nf-workspace-modal');
    if (m) m.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setLoader(visible, title, step) {
    const el = document.getElementById('nf-loader');
    if (!el) return;
    el.classList.toggle('visible', Boolean(visible));
    if (title) document.getElementById('nf-loader-title').textContent = title;
    if (step) document.getElementById('nf-loader-step').textContent = step;
  }

  function mountAppInForge(app) {
    state.currentApp = app;
    document.getElementById('nf-app-title').textContent = app.title || 'IA Generated App';
    document.getElementById('nf-meta-badge').textContent = app.isDemo
      ? t('✨ Interactive Demo ($0 API)', '✨ Démo Interactive (0 $ API)')
      : `${app.model || 'Gemini 2.5 Flash'} · IA Neural Architect`;

    const demoBanner = document.getElementById('nf-demo-banner');
    if (app.isDemo && !state.isPro) {
      demoBanner.classList.add('visible');
      document.getElementById('nf-demo-banner-text').textContent = t(
        '✨ Interactive Demo Preview — Unlock Unlimited Custom AI Prompts (Any App, 3D WebGL Boost, Photo→App & ZIP Export) with Creator Pro ($10/mo).',
        '✨ Aperçu Démo Interactif — Débloquez les Prompts IA Illimités (Toute App, Boost 3D WebGL, Photo→App & Export ZIP) avec Creator Pro (10 $/mois).'
      );
    } else {
      demoBanner.classList.remove('visible');
    }

    const dnaStrip = document.getElementById('nf-dna-strip');
    const dnaList = Array.isArray(app.dnaUsed) && app.dnaUsed.length ? app.dnaUsed : ['IA Cyber-Glass DNA'];
    dnaStrip.innerHTML = dnaList.map(d => `<span class="nf-dna-chip">🧬 ${String(d).replace(/</g, '&lt;')}</span>`).join('');

    const iframe = document.getElementById('nf-preview-iframe');
    iframe.srcdoc = assembleStandaloneHtml(app, !app.isDemo);

    if (state.activeView === 'code') renderCodeInspector();
  }

  // ============================================================================
  // PAYWALL MODAL ($0 API BURN PROTECTION)
  // ============================================================================
  function openPaywall(promptText) {
    injectModalsOnce();
    const isFr = getLang() === 'fr';
    document.getElementById('nf-pw-heading').textContent = isFr
      ? 'Débloquez l’IA Architecte Google Gemini Pro'
      : 'Unlock Google Gemini Pro Neural Architect';
    document.getElementById('nf-pw-prompt-preview').innerHTML = promptText
      ? `<strong>${isFr ? 'Prêt à construire :' : 'Ready to build:'}</strong> “${String(promptText).slice(0, 180).replace(/</g, '&lt;')}”`
      : `<strong>${isFr ? 'Construisez n’importe quelle application web ou 3D à partir d’une phrase ou d’un croquis.' : 'Build any custom web app or 3D interface from plain text or a sketch.'}</strong>`;

    const feats = isFr
      ? [
          '✓ Moteur IA Google Gemini 3.8 Flash + Mémoire DNA 3D IA Code Studio',
          '✓ Créez n’importe quelle app complète (SaaS, boutique, CRM, jeux, 3D WebGL)',
          '✓ Mode Boost 3D WebGL, Photo/Croquis → App & Dictée vocale FR/EN',
          '✓ Chat itératif avec mémoire + Auto-Réparation JS invisible',
          '✓ Exports HTML / ZIP illimités + accès complet à tous les studios (10 $/mois)'
        ]
      : [
          '✓ Real Google Gemini 3.8 Flash Engine + IA Code Studio 3D DNA Memory',
          '✓ Build ANY custom working app (SaaS, booking, e-commerce, games, 3D WebGL)',
          '✓ 3D WebGL Boost toggle, Sketch/Screenshot → App & Voice-to-App (EN/FR)',
          '✓ Multi-turn iterative chat with memory + invisible JS Auto-Repair',
          '✓ Unlimited HTML / ZIP exports + all Pro studios unlocked ($10/mo)'
        ];
    document.getElementById('nf-pw-features').innerHTML = feats.map(f => `<li>${f}</li>`).join('');
    document.getElementById('nf-pw-upgrade').textContent = isFr
      ? '💎 Passer à Creator Pro (10 $/mois via Stripe)'
      : '💎 Unlock Creator Pro ($10/mo via Stripe)';
    document.getElementById('nf-pw-signin').textContent = isFr
      ? '🔐 Déjà abonné Pro ? Se connecter avec Google'
      : '🔐 Already Pro? Sign in with Google';
    document.getElementById('nf-pw-try-demo').textContent = isFr
      ? '✨ Ou tester une Démo Interactive gratuite (0 $)'
      : '✨ Or preview a free interactive Demo App ($0)';
    document.getElementById('nf-pw-note').textContent = isFr
      ? 'Activation automatique immédiate : utilisez le même email Google que celui utilisé sur Stripe.'
      : 'Instant automatic activation: sign in with the same Google email used at Stripe checkout.';

    document.getElementById('nf-paywall-modal').classList.add('open');
  }

  function closePaywall() {
    const m = document.getElementById('nf-paywall-modal');
    if (m) m.classList.remove('open');
  }

  // ============================================================================
  // ZERO-COST INTERACTIVE SHOWCASE DEMO LAUNCHER ($0.00 API CALLS)
  // ============================================================================
  function launchZeroCostDemo(demoId) {
    const demos = window.IANeuralDemos ? window.IANeuralDemos.getDemos(getLang()) : null;
    const demo = (demos && demos[demoId]) || (demos && demos.saas);
    if (!demo) return;

    state.isDemoMode = true;
    state.autoRepairedOnce = false;
    openForge();
    switchSideTab('chat');
    document.getElementById('nf-chat-log').innerHTML = '';

    setLoader(true, demo.title, t('🧠 Loading IA Code Studio DNA Blueprint...', '🧠 Chargement du Blueprint DNA IA Code Studio...'));
    setTimeout(() => {
      setLoader(true, demo.title, t('⚡ Mounting interactive 60 FPS live preview...', '⚡ Montage de l’aperçu interactif 60 FPS...'));
    }, 450);
    setTimeout(() => {
      setLoader(false);
      mountAppInForge({ ...demo, isDemo: true });
      appendChat('ai', '✨ ' + demo.summary);
      if (!state.isPro) {
        appendChat('ai', t(
          '💡 This is a pre-built interactive showcase ($0 API). Upgrade to Creator Pro ($10/mo) to generate ANY custom app or refine apps via live Gemini chat.',
          '💡 Ceci est une vitrine interactive pré-construite (0 $ API). Passez Creator Pro (10 $/mois) pour générer n’importe quelle app sur mesure par chat Gemini.'
        ));
      }
    }, 950);
  }

  // ============================================================================
  // REAL GOOGLE GEMINI 2.5 PRO GENERATION / MODIFY / AUTO-REPAIR
  // ============================================================================
  async function runGeminiBuild(opts) {
    if (state.busy) return;
    const token = await getFirebaseIdToken(false);
    if (!token || !state.isPro) {
      state.pendingCustomRequest = opts;
      openPaywall(opts.prompt || t('Sketch-to-App Build', 'Création depuis Croquis'));
      return;
    }

    state.busy = true;
    state.isDemoMode = false;
    state.autoRepairedOnce = false;
    openForge();
    switchSideTab('chat');
    document.getElementById('nf-chat-log').innerHTML = '';
    appendChat('user', opts.prompt || t('📸 Build app from attached sketch', '📸 Créer l’app depuis l’image jointe'));
    document.getElementById('nf-chat-send').disabled = true;

    const steps = [
      t('🧠 Analyzing request & injecting IA Code Studio 3D DNA...', '🧠 Analyse du prompt & injection du DNA 3D IA Code Studio...'),
      t('⚡ Google Gemini 3.8 Flash architecting HTML, CSS & JS...', '⚡ Google Gemini 3.8 Flash génère HTML, CSS & JS...'),
      t('✨ Wiring interactive state, responsiveness & visuals...', '✨ Connexion de la logique interactive et des animations...')
    ];
    let stepIdx = 0;
    setLoader(true, t('Building Your Custom App', 'Construction de votre Application'), steps[0]);
    const stepTimer = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, steps.length - 1);
      setLoader(true, t('Building Your Custom App', 'Construction de votre Application'), steps[stepIdx]);
    }, 2400);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          action: 'generate',
          prompt: opts.prompt || '',
          mode: opts.mode || state.mode,
          boost3d: Boolean(opts.boost3d),
          lang: getLang(),
          imageBase64: opts.imageBase64 || '',
          imageMime: opts.imageMime || ''
        })
      });
      const data = await res.json().catch(() => ({}));
      clearInterval(stepTimer);
      setLoader(false);

      if (res.status === 401 || res.status === 402 || data.code === 'PRO_REQUIRED') {
        state.isPro = false;
        updateProBadgeUI();
        closeForge();
        state.pendingCustomRequest = opts;
        openPaywall(opts.prompt);
        return;
      }
      if (!res.ok || !data.ok || !data.app) {
        appendChat('repair', '⚠️ ' + (data.error || t('Generation failed. Please try again.', 'Échec de génération. Réessayez.')));
        return;
      }

      const builtApp = {
        id: 'app_' + Date.now(),
        ...data.app,
        dnaUsed: data.dnaUsed || [],
        model: data.model || 'gemini-3.8-flash',
        createdAt: Date.now(),
        isDemo: false
      };
      mountAppInForge(builtApp);
      saveToVault(builtApp);
      appendChat('ai', '✅ ' + builtApp.summary);
      clearAttachedImage();
    } catch (err) {
      clearInterval(stepTimer);
      setLoader(false);
      appendChat('repair', '⚠️ ' + (err.message || 'Network error'));
    } finally {
      state.busy = false;
      const sb = document.getElementById('nf-chat-send');
      if (sb) sb.disabled = false;
    }
  }

  async function runGeminiModify(instruction) {
    if (state.busy || !state.currentApp) return;
    const token = await getFirebaseIdToken(false);
    if (!token || !state.isPro) {
      openPaywall(instruction);
      return;
    }

    state.busy = true;
    state.autoRepairedOnce = false;
    appendChat('user', instruction);
    document.getElementById('nf-chat-send').disabled = true;
    setLoader(true, t('Refining Your App...', 'Modification en cours...'), t('⚡ Applying changes with Gemini 3.8 Memory...', '⚡ Application des modifications avec Gemini 3.8...'));

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          action: 'modify',
          prompt: instruction,
          mode: state.mode,
          boost3d: state.boost3d,
          lang: getLang(),
          currentHtml: state.currentApp.html,
          currentCss: state.currentApp.css,
          currentJs: state.currentApp.js
        })
      });
      const data = await res.json().catch(() => ({}));
      setLoader(false);

      if (!res.ok || !data.ok || !data.app) {
        appendChat('repair', '⚠️ ' + (data.error || t('Update failed.', 'Échec de la mise à jour.')));
        return;
      }

      const updated = {
        ...state.currentApp,
        ...data.app,
        dnaUsed: data.dnaUsed || state.currentApp.dnaUsed,
        model: data.model || state.currentApp.model,
        isDemo: false
      };
      mountAppInForge(updated);
      saveToVault(updated);
      appendChat('ai', '✅ ' + updated.summary);
    } catch (err) {
      setLoader(false);
      appendChat('repair', '⚠️ ' + (err.message || 'Network error'));
    } finally {
      state.busy = false;
      const sb = document.getElementById('nf-chat-send');
      if (sb) sb.disabled = false;
    }
  }

  async function runGeminiAutoRepair(errMsg) {
    const token = await getFirebaseIdToken(false);
    if (!token || !state.isPro || !state.currentApp) return;
    state.busy = true;
    appendChat('repair', t('🔧 Runtime JS error detected — Auto-Repairing automatically...', '🔧 Erreur JS détectée — Auto-réparation en cours...'));
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({
          action: 'repair',
          errorMessage: errMsg,
          lang: getLang(),
          currentHtml: state.currentApp.html,
          currentCss: state.currentApp.css,
          currentJs: state.currentApp.js
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.app) {
        const fixed = { ...state.currentApp, ...data.app, isDemo: false };
        mountAppInForge(fixed);
        saveToVault(fixed);
        appendChat('ai', t('🛠️ Auto-Repair succeeded! Preview refreshed cleanly.', '🛠️ Auto-réparation réussie ! Aperçu actualisé.'));
      }
    } catch (e) {} finally {
      state.busy = false;
    }
  }

  // ============================================================================
  // PROMPT BAR ENHANCEMENTS (3D BOOST, PHOTO->APP, VOICE EN/FR, VAULT CHIP)
  // ============================================================================
  function clearAttachedImage() {
    state.imageBase64 = '';
    state.imageMime = '';
    state.imageName = '';
    const row = document.getElementById('nf-img-chip-row');
    if (row) row.classList.remove('visible');
    const inp = document.getElementById('nf-img-input');
    if (inp) inp.value = '';
  }

  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 768;
        let w = img.width, h = img.height;
        if (w > maxSide || h > maxSide) {
          const scale = maxSide / Math.max(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        const dataUrl = c.toDataURL('image/jpeg', 0.78);
        state.imageBase64 = dataUrl.split(',')[1] || '';
        state.imageMime = 'image/jpeg';
        state.imageName = file.name;

        const row = document.getElementById('nf-img-chip-row');
        const thumb = document.getElementById('nf-img-thumb');
        const lbl = document.getElementById('nf-img-name');
        if (thumb) thumb.src = dataUrl;
        if (lbl) lbl.textContent = '📸 ' + file.name + ' (' + t('Sketch-to-App ready', 'Croquis prêt') + ')';
        if (row) row.classList.add('visible');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function startVoiceDictation(btn, inputEl) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert(t('Voice dictation is supported in Chrome, Edge, and Safari.', 'La dictée vocale est prise en charge dans Chrome, Edge et Safari.'));
      return;
    }
    const rec = new SR();
    rec.lang = getLang() === 'fr' ? 'fr-FR' : 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    btn.classList.add('recording');
    rec.onresult = (e) => {
      const spoken = e.results?.[0]?.[0]?.transcript || '';
      if (spoken && inputEl) {
        inputEl.value = (inputEl.value ? inputEl.value + ' ' : '') + spoken;
        inputEl.focus();
      }
    };
    rec.onerror = () => btn.classList.remove('recording');
    rec.onend = () => btn.classList.remove('recording');
    try { rec.start(); } catch (e) { btn.classList.remove('recording'); }
  }

  function enhanceHeroPromptBar() {
    const form = document.querySelector('.prompt-launcher');
    if (!form || form.dataset.nfEnhanced) return;
    form.dataset.nfEnhanced = '1';

    const tabsRow = form.querySelector('.prompt-mode-tabs');
    if (tabsRow && !document.getElementById('nf-pro-status-pill')) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.id = 'nf-pro-status-pill';
      pill.className = 'nf-pro-pill';
      pill.textContent = t('🔒 Creator Pro AI', '🔒 IA Creator Pro');
      pill.addEventListener('click', () => {
        if (state.isPro) {
          openForge();
          switchSideTab('vault');
        } else {
          openPaywall('');
        }
      });
      tabsRow.appendChild(pill);
    }

    const inputRow = form.querySelector('.prompt-input-row');
    const submitBtn = inputRow && inputRow.querySelector('.prompt-submit-btn');
    const inputEl = inputRow && inputRow.querySelector('.prompt-input');

    if (inputRow && submitBtn && !document.getElementById('nf-boost3d-btn')) {
      const tools = document.createElement('div');
      tools.className = 'nf-bar-tools';
      tools.innerHTML = `
        <button type="button" class="nf-tool-btn" id="nf-boost3d-btn" title="${t('Toggle 3D WebGL Boost (Three.js)', 'Activer le Boost 3D WebGL (Three.js)')}">✨ 3D</button>
        <button type="button" class="nf-tool-btn" id="nf-img-btn" title="${t('Sketch / Screenshot to App (Pro)', 'Photo / Croquis vers App (Pro)')}">📸</button>
        <button type="button" class="nf-tool-btn" id="nf-voice-btn" title="${t('Voice-to-App (EN/FR)', 'Dictée Vocale (FR/EN)')}">🎙️</button>
        <input type="file" id="nf-img-input" accept="image/*" style="display:none;">
      `;
      inputRow.insertBefore(tools, submitBtn);

      const chipRow = document.createElement('div');
      chipRow.id = 'nf-img-chip-row';
      chipRow.className = 'nf-img-chip-row';
      chipRow.innerHTML = `<img id="nf-img-thumb" alt="Sketch preview"><span id="nf-img-name"></span><button type="button" class="nf-img-chip-remove" id="nf-img-remove">×</button>`;
      inputRow.insertAdjacentElement('afterend', chipRow);

      document.getElementById('nf-boost3d-btn').addEventListener('click', function () {
        state.boost3d = !state.boost3d;
        this.classList.toggle('active', state.boost3d);
      });
      document.getElementById('nf-img-btn').addEventListener('click', () => {
        document.getElementById('nf-img-input').click();
      });
      document.getElementById('nf-img-input').addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
      });
      document.getElementById('nf-img-remove').addEventListener('click', clearAttachedImage);
      document.getElementById('nf-voice-btn').addEventListener('click', function () {
        startVoiceDictation(this, inputEl);
      });
    }

    const chipsRow = form.querySelector('.prompt-chips');
    if (chipsRow && !document.getElementById('nf-vault-chip-btn')) {
      const vBtn = document.createElement('button');
      vBtn.type = 'button';
      vBtn.id = 'nf-vault-chip-btn';
      vBtn.className = 'prompt-chip nf-vault-chip';
      vBtn.style.display = 'none';
      vBtn.addEventListener('click', () => {
        openForge();
        switchSideTab('vault');
      });
      chipsRow.appendChild(vBtn);
    }

    // Intercept mode tab clicks to keep Neural Forge mode in sync
    form.querySelectorAll('.prompt-mode-btn').forEach(b => {
      b.addEventListener('click', () => {
        const m = b.getAttribute('data-target') || (b.getAttribute('onclick') || '').match(/'(pro|ultra|ui3d|chrome)'/)?.[1] || 'pro';
        state.mode = m;
        if (m === 'ui3d' || m === 'chrome') {
          state.boost3d = true;
          const b3 = document.getElementById('nf-boost3d-btn');
          if (b3) b3.classList.add('active');
        }
      });
    });
  }

  // ============================================================================
  // PUBLIC ENTRYPOINTS (WIRED TO HERO PROMPT FORM & 4 QUICK CHIPS)
  // ============================================================================
  async function handlePromptSubmit(promptText, modeOverride) {
    const text = String(promptText || '').trim();
    const mode = modeOverride || state.mode;

    if (!text && !state.imageBase64) {
      // Empty prompt? Open a quick demo showcase ($0) or focus input
      launchZeroCostDemo('saas');
      return;
    }

    // Ensure server-side Pro check is fresh before making ANY decision
    if (!state.proChecked) {
      await refreshProStatus();
    } else if (!state.isPro) {
      // Re-check once in case user just signed in or paid
      const tok = await getFirebaseIdToken(false);
      if (tok) await refreshProStatus();
    }

    if (!state.isPro) {
      // STRICT ZERO FREE API BURN: show Pro Paywall immediately without touching Gemini!
      state.pendingCustomRequest = {
        prompt: text,
        mode,
        boost3d: state.boost3d,
        imageBase64: state.imageBase64,
        imageMime: state.imageMime
      };
      openPaywall(text);
      return;
    }

    runGeminiBuild({
      prompt: text,
      mode,
      boost3d: state.boost3d,
      imageBase64: state.imageBase64,
      imageMime: state.imageMime
    });
  }

  function handleQuickChip(demoKey) {
    // Always $0.00 API cost! Instant interactive demo preview in Live Forge!
    const keyMap = { saas: 'saas', landing: 'landing', pricing: 'pricing', contact: 'contact' };
    launchZeroCostDemo(keyMap[demoKey] || 'saas');
  }

  // Auto-init & listen for Firebase Auth state changes + EN/FR switcher
  document.addEventListener('DOMContentLoaded', () => {
    enhanceHeroPromptBar();
    updateVaultChipUI();
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.addEventListener('click', () => setTimeout(updateProBadgeUI, 60));
    });

    const attachAuthWatcher = (tries) => {
      if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(() => {
          refreshProStatus();
        });
      } else if (tries > 0) {
        setTimeout(() => attachAuthWatcher(tries - 1), 350);
      }
    };
    attachAuthWatcher(12);
  });

  window.IANeuralForge = {
    handlePromptSubmit,
    handleQuickChip,
    launchZeroCostDemo,
    refreshProStatus,
    openPaywall,
    openForge,
    closeForge,
    setMode: (m) => { state.mode = m; },
    getState: () => ({ ...state })
  };
})(window, document);
