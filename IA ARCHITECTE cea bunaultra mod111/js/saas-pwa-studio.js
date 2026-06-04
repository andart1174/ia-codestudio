(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 📱 APP & SAAS FORGE STUDIO
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'APP & SAAS FORGE',
      sub: 'Enterprise PWA & Dashboard Builder',
      back: '← Back',
      inject: '➕ Inject Tool Code',
      injected: '✅ Tool Code Injected!',
      tools: {
        sw: { name: 'Service Worker Generator', desc: 'Generate offline caching strategies and install scripts for your PWA.', injectBtn: 'Inject SW Generator' },
        manifest: { name: 'Web App Manifest Builder', desc: 'Construct manifest.json for installable mobile web apps.', injectBtn: 'Inject Manifest Builder' },
        push: { name: 'Push Notification Simulator', desc: 'Generate Web Push API boilerplate and notification permission UI.', injectBtn: 'Inject Push Simulator' },
        shell: { name: 'Native UI Shell Creator', desc: 'Generate iOS/Android styled app layouts with bottom navigation.', injectBtn: 'Inject UI Shell' },
        grid: { name: 'Data-Grid CRUD Builder', desc: 'Generate enterprise data tables with sorting, filtering, and pagination.', injectBtn: 'Inject Data-Grid' },
        chart: { name: 'Chart & Analytics Forge', desc: 'Generate beautiful Canvas-based dashboard charts and analytics UI.', injectBtn: 'Inject Chart Forge' },
        kanban: { name: 'Kanban Task Manager', desc: 'Generate drag-and-drop Trello-style project management boards.', injectBtn: 'Inject Kanban UI' },
        pricing: { name: 'SaaS Pricing Toggle', desc: 'Generate conversion-optimized pricing tables with Monthly/Annual toggles.', injectBtn: 'Inject Pricing UI' }
      }
    },
    fr: {
      title: 'FORGE APP & SAAS',
      sub: 'Créateur PWA & Tableaux de Bord Pro',
      back: '← Retour',
      inject: '➕ Injecter le Code',
      injected: '✅ Code de l\'outil injecté!',
      tools: {
        sw: { name: 'Générateur Service Worker', desc: 'Stratégies de cache hors ligne et scripts d\'installation pour PWA.', injectBtn: 'Injecter le Générateur SW' },
        manifest: { name: 'Constructeur Manifest App', desc: 'Générez manifest.json pour les applications web installables.', injectBtn: 'Injecter Manifest' },
        push: { name: 'Simulateur Notifications Push', desc: 'Générez l\'API Web Push et l\'interface de permission.', injectBtn: 'Injecter le Simulateur' },
        shell: { name: 'Créateur Interface Native', desc: 'Layouts style iOS/Android avec navigation en bas.', injectBtn: 'Injecter UI Native' },
        grid: { name: 'Générateur CRUD Data-Grid', desc: 'Tableaux de données d\'entreprise avec tri, filtres et pagination.', injectBtn: 'Injecter Data-Grid' },
        chart: { name: 'Forge Graphiques & Analytique', desc: 'Graphiques de tableau de bord magnifiques basés sur Canvas.', injectBtn: 'Injecter Forge Graphique' },
        kanban: { name: 'Gestionnaire Tâches Kanban', desc: 'Générez des tableaux de projet glisser-déposer type Trello.', injectBtn: 'Injecter Kanban' },
        pricing: { name: 'Tarification SaaS Animée', desc: 'Tableaux de prix optimisés avec bascule Mensuel/Annuel.', injectBtn: 'Injecter Tarification' }
      }
    }
  };

  function gl() { return window.appLang || 'en'; }

  function getTranslation(tool, key) {
    const lang = gl();
    return TX[lang] && TX[lang].tools[tool] && TX[lang].tools[tool][key]
      ? TX[lang].tools[tool][key]
      : (TX['en'].tools[tool] ? TX['en'].tools[tool][key] : key);
  }

  function showBannerToast(msg) {
    if (window.showToast) window.showToast(msg);
    else console.log('[SAAS FORGE Toast]:', msg);
  }

  window._injectSaasForgeCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      showBannerToast(TX[lang].injected);
    }
  };

  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'saasforge') {
      window.activeTab = 'saasforge';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-saasforge');
      if (btn) btn.classList.add('active');
      window.initSaasForge(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') originalRenderTab(tab);
  };

  window.initSaasForge = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#020617; color:#f8fafc;">
        <div style="background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1)); border-radius:14px; padding:16px; border:1px solid rgba(59,130,246,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
          <span style="font-size:32px; filter:drop-shadow(0 0 10px #3b82f6);">📱</span>
          <div>
            <h2 style="margin:0; color:#60a5fa; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(59,130,246,0.4);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          <div style="font-size:10px; color:#64748b; font-weight:bold; letter-spacing:1px; margin-top:5px; margin-bottom:5px;">PWA & MOBILE APP</div>
          
          <!-- 1. Service Worker -->
          <div onclick="window.handleSaasTool('sw')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(168, 85, 247, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#a855f7'; this.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.2)';" onmouseout="this.style.borderColor='rgba(168, 85, 247, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(168, 85, 247, 0.1); border-radius:10px; color:#a855f7;">⚡</div>
            <div style="flex:1;"><div style="color:#a855f7; font-weight:800; font-size:13px;">${getTranslation('sw', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('sw', 'desc')}</div></div>
          </div>
          <!-- 2. Manifest -->
          <div onclick="window.handleSaasTool('manifest')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(236, 72, 153, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ec4899'; this.style.boxShadow='0 0 15px rgba(236, 72, 153, 0.2)';" onmouseout="this.style.borderColor='rgba(236, 72, 153, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(236, 72, 153, 0.1); border-radius:10px; color:#ec4899;">📑</div>
            <div style="flex:1;"><div style="color:#ec4899; font-weight:800; font-size:13px;">${getTranslation('manifest', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('manifest', 'desc')}</div></div>
          </div>
          <!-- 3. Push Simulator -->
          <div onclick="window.handleSaasTool('push')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(245, 158, 11, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 15px rgba(245, 158, 11, 0.2)';" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(245, 158, 11, 0.1); border-radius:10px; color:#f59e0b;">🔔</div>
            <div style="flex:1;"><div style="color:#f59e0b; font-weight:800; font-size:13px;">${getTranslation('push', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('push', 'desc')}</div></div>
          </div>
          <!-- 4. UI Shell -->
          <div onclick="window.handleSaasTool('shell')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(16, 185, 129, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.2)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">📱</div>
            <div style="flex:1;"><div style="color:#10b981; font-weight:800; font-size:13px;">${getTranslation('shell', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('shell', 'desc')}</div></div>
          </div>

          <div style="font-size:10px; color:#64748b; font-weight:bold; letter-spacing:1px; margin-top:10px; margin-bottom:5px;">ENTERPRISE SAAS DASHBOARD</div>

          <!-- 5. Data Grid -->
          <div onclick="window.handleSaasTool('grid')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(56, 189, 248, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#38bdf8'; this.style.boxShadow='0 0 15px rgba(56, 189, 248, 0.2)';" onmouseout="this.style.borderColor='rgba(56, 189, 248, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(56, 189, 248, 0.1); border-radius:10px; color:#38bdf8;">🗃️</div>
            <div style="flex:1;"><div style="color:#38bdf8; font-weight:800; font-size:13px;">${getTranslation('grid', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('grid', 'desc')}</div></div>
          </div>
          <!-- 6. Charts -->
          <div onclick="window.handleSaasTool('chart')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(139, 92, 246, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#8b5cf6'; this.style.boxShadow='0 0 15px rgba(139, 92, 246, 0.2)';" onmouseout="this.style.borderColor='rgba(139, 92, 246, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(139, 92, 246, 0.1); border-radius:10px; color:#8b5cf6;">📈</div>
            <div style="flex:1;"><div style="color:#8b5cf6; font-weight:800; font-size:13px;">${getTranslation('chart', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('chart', 'desc')}</div></div>
          </div>
          <!-- 7. Kanban -->
          <div onclick="window.handleSaasTool('kanban')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(20, 184, 166, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#14b8a6'; this.style.boxShadow='0 0 15px rgba(20, 184, 166, 0.2)';" onmouseout="this.style.borderColor='rgba(20, 184, 166, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(20, 184, 166, 0.1); border-radius:10px; color:#14b8a6;">📋</div>
            <div style="flex:1;"><div style="color:#14b8a6; font-weight:800; font-size:13px;">${getTranslation('kanban', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('kanban', 'desc')}</div></div>
          </div>
          <!-- 8. Pricing Toggle -->
          <div onclick="window.handleSaasTool('pricing')" style="background:rgba(15, 23, 42, 0.8); border:1px solid rgba(244, 63, 94, 0.3); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f43f5e'; this.style.boxShadow='0 0 15px rgba(244, 63, 94, 0.2)';" onmouseout="this.style.borderColor='rgba(244, 63, 94, 0.3)'; this.style.boxShadow='none';">
            <div style="font-size:24px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(244, 63, 94, 0.1); border-radius:10px; color:#f43f5e;">💳</div>
            <div style="flex:1;"><div style="color:#f43f5e; font-weight:800; font-size:13px;">${getTranslation('pricing', 'name')}</div><div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('pricing', 'desc')}</div></div>
          </div>

        </div>
      </div>
    `;
  };

  window.handleSaasTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initSaasForge('${lang}')" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.color='#fff';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'sw') renderSaasIntro(el, backBtn, toolId, lang, '#a855f7', '⚡', getSwCode(lang));
    else if (toolId === 'manifest') renderSaasIntro(el, backBtn, toolId, lang, '#ec4899', '📑', getManifestCode(lang));
    else if (toolId === 'push') renderSaasIntro(el, backBtn, toolId, lang, '#f59e0b', '🔔', getPushCode(lang));
    else if (toolId === 'shell') renderSaasIntro(el, backBtn, toolId, lang, '#10b981', '📱', getShellCode(lang));
    else if (toolId === 'grid') renderSaasIntro(el, backBtn, toolId, lang, '#38bdf8', '🗃️', getGridCode(lang));
    else if (toolId === 'chart') renderSaasIntro(el, backBtn, toolId, lang, '#8b5cf6', '📈', getChartCode(lang));
    else if (toolId === 'kanban') renderSaasIntro(el, backBtn, toolId, lang, '#14b8a6', '📋', getKanbanCode(lang));
    else if (toolId === 'pricing') renderSaasIntro(el, backBtn, toolId, lang, '#f43f5e', '💳', getPricingCode(lang));
  };

  function renderSaasIntro(parent, backBtn, toolId, lang, color, icon, code) {
    const tx = TX[lang].tools[toolId];
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#020617;">
        ${backBtn}
        <h3 style="color:${color}; margin:0 0 5px; font-size:15px; font-weight:800;">${icon} ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 20px;">${tx.desc}</p>
        
        <div style="background:#0f172a; border:1px dashed ${color}; border-radius:10px; padding:20px; text-align:center; margin-bottom:20px;">
          <div style="font-size:40px; margin-bottom:10px; opacity:0.8;">${icon}</div>
          <div style="color:#94a3b8; font-size:12px; margin-bottom:10px;">Ready to generate the application module.</div>
        </div>

        <button id="btnInject${toolId}" style="width:100%; padding:12px; border-radius:8px; background:${color}; border:none; color:#000; font-weight:900; font-size:13px; cursor:pointer; box-shadow:0 4px 15px ${color}44;">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    document.getElementById(`btnInject${toolId}`).addEventListener('click', () => {
      window._injectSaasForgeCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // TOOL 1: Service Worker Generator
  // ═══════════════════════════════════════════
  function getSwCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Service Worker Cache Generator</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #a855f7; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; min-width: 300px; }
  input, select { width: 100%; background: #0f172a; border: 1px solid #475569; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #a855f7; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .code-area { background: #000; border: 1px solid #475569; padding: 15px; border-radius: 6px; font-family: monospace; color: #d8b4fe; white-space: pre-wrap; font-size: 13px; margin-top: 15px; height: 300px; overflow-y: auto; }
</style>
</head>
<body>
  <h1>⚡ Service Worker Builder</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#a855f7; margin-top:0;">Configuration</h3>
      <label>Cache Name:</label>
      <input type="text" id="cacheName" value="app-cache-v1">
      <label>Caching Strategy:</label>
      <select id="strategy">
        <option value="cacheFirst">Cache First (Fall back to network)</option>
        <option value="networkFirst">Network First (Fall back to cache)</option>
        <option value="staleWhileRevalidate">Stale-While-Revalidate</option>
      </select>
      <label>Files to pre-cache (comma separated):</label>
      <input type="text" id="files" value="/, /index.html, /styles.css, /app.js, /icon.png">
      <button onclick="generateSW()">Generate sw.js Code</button>
    </div>
    <div class="box" style="flex:2;">
      <h3 style="color:#a855f7; margin-top:0;">Generated Service Worker Code (sw.js)</h3>
      <div class="code-area" id="swCode"></div>
      <button onclick="copyCode()" style="margin-top:10px; background:#475569;">Copy Code</button>
    </div>
  </div>
<script>
  function generateSW() {
    const cacheName = document.getElementById('cacheName').value || 'app-cache';
    const strategy = document.getElementById('strategy').value;
    const files = document.getElementById('files').value.split(',').map(f => "'" + f.trim() + "'").join(',\\n  ');
    
    let fetchLogic = '';
    if(strategy === 'cacheFirst') {
      fetchLogic = \`    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );\`;
    } else if(strategy === 'networkFirst') {
      fetchLogic = \`    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );\`;
    } else {
      fetchLogic = \`    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );\`;
    }

    const code = \`const CACHE_NAME = '\${cacheName}';
const urlsToCache = [
  \${files}
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
\${fetchLogic}
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});\`;
    document.getElementById('swCode').textContent = code;
  }
  function copyCode() {
    navigator.clipboard.writeText(document.getElementById('swCode').textContent);
    alert('Copied sw.js to clipboard!');
  }
  generateSW();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 2: Web App Manifest Builder
  // ═══════════════════════════════════════════
  function getManifestCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Manifest JSON Builder</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; }
  h1 { color: #ec4899; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; min-width: 300px; }
  input, select { width: 100%; background: #0f172a; border: 1px solid #475569; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #ec4899; color: #fff; border: none; font-weight: bold; cursor: pointer; }
  .code-area { background: #000; border: 1px solid #475569; padding: 15px; border-radius: 6px; font-family: monospace; color: #fbcfe8; white-space: pre-wrap; font-size: 13px; margin-top: 15px; height: 350px; overflow-y: auto; }
</style>
</head>
<body>
  <h1>📑 Web App Manifest Builder</h1>
  <div class="grid">
    <div class="box">
      <h3 style="color:#ec4899; margin-top:0;">App Details</h3>
      <label>App Name:</label><input type="text" id="mName" value="My Awesome App">
      <label>Short Name:</label><input type="text" id="mShort" value="AwesomeApp">
      <label>Theme Color:</label><input type="color" id="mTheme" value="#ec4899" style="height:40px;">
      <label>Background Color:</label><input type="color" id="mBg" value="#0f172a" style="height:40px;">
      <label>Display Mode:</label>
      <select id="mDisplay">
        <option value="standalone">Standalone (Looks like a native app)</option>
        <option value="fullscreen">Fullscreen</option>
        <option value="minimal-ui">Minimal UI</option>
        <option value="browser">Browser</option>
      </select>
      <button onclick="generateManifest()">Generate manifest.json</button>
    </div>
    <div class="box" style="flex:2;">
      <h3 style="color:#ec4899; margin-top:0;">Generated manifest.json</h3>
      <div class="code-area" id="manifestCode"></div>
      <p style="color:#94a3b8; font-size:12px;">Add <code>&lt;link rel="manifest" href="/manifest.json"&gt;</code> to your HTML head.</p>
    </div>
  </div>
<script>
  function generateManifest() {
    const manifest = {
      "name": document.getElementById('mName').value,
      "short_name": document.getElementById('mShort').value,
      "start_url": "/",
      "display": document.getElementById('mDisplay').value,
      "background_color": document.getElementById('mBg').value,
      "theme_color": document.getElementById('mTheme').value,
      "icons": [
        {
          "src": "/images/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    };
    document.getElementById('manifestCode').textContent = JSON.stringify(manifest, null, 2);
  }
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', generateManifest));
  generateManifest();
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 3: Push Notification Simulator
  // ═══════════════════════════════════════════
  function getPushCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>Push Notification Simulator</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; overflow:hidden;}
  h1 { color: #f59e0b; margin-top: 0; }
  .grid { display: flex; gap: 20px; flex-wrap: wrap; }
  .box { flex: 1; background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; min-width: 300px; z-index:2; position:relative;}
  input { width: 100%; background: #0f172a; border: 1px solid #475569; color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; margin-bottom: 15px; }
  button { width: 100%; padding: 12px; border-radius: 6px; background: #f59e0b; color: #000; border: none; font-weight: bold; cursor: pointer; }
  
  /* Mock OS UI */
  .os-screen { position:absolute; top:150px; right:50px; width:350px; height:600px; background:url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop') center/cover; border-radius:30px; border:10px solid #000; box-shadow:0 20px 50px rgba(0,0,0,0.5); overflow:hidden; display:flex; flex-direction:column; padding:20px; box-sizing:border-box; z-index:1; }
  .os-header { display:flex; justify-content:space-between; color:#fff; font-size:12px; font-weight:bold; margin-bottom:20px; text-shadow:0 1px 3px rgba(0,0,0,0.8);}
  .notification { background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); padding: 15px; border-radius: 15px; margin-bottom: 10px; transform: translateY(-150%); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity:0; color:#000; display:flex; gap:12px; }
  .notification.show { transform: translateY(0); opacity:1; }
  .n-icon { width:40px; height:40px; background:#f59e0b; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; }
  .n-content { flex:1; }
  .n-title { font-weight:bold; font-size:14px; margin:0 0 2px 0; }
  .n-body { font-size:12px; margin:0; color:#475569; }
</style>
</head>
<body>
  <h1>🔔 Web Push Simulator</h1>
  <div class="grid">
    <div class="box" style="max-width:400px;">
      <h3 style="color:#f59e0b; margin-top:0;">Compose Push Notification</h3>
      <label>Notification Title:</label>
      <input type="text" id="nTitle" value="New Message Received">
      <label>Notification Body:</label>
      <input type="text" id="nBody" value="Hey! Check out our new SaaS features.">
      <label>Emoji Icon:</label>
      <input type="text" id="nIcon" value="🚀">
      <button onclick="triggerPush()">Simulate Push Event</button>
      
      <div style="margin-top:30px; padding:15px; background:#000; border-radius:6px; font-family:monospace; color:#fcd34d; font-size:11px;">
        // Web Push API Code Generator
        navigator.serviceWorker.ready.then(sw => {
          sw.showNotification("Title", {
            body: "Body text",
            icon: "/icon.png"
          });
        });
      </div>
    </div>
  </div>

  <div class="os-screen">
    <div class="os-header">
      <span>12:45</span>
      <span>5G 🔋</span>
    </div>
    <div class="notification" id="mockNotif">
      <div class="n-icon" id="mockIcon">🚀</div>
      <div class="n-content">
        <h4 class="n-title" id="mockTitle">Title</h4>
        <p class="n-body" id="mockBody">Body</p>
      </div>
    </div>
  </div>

<script>
  function triggerPush() {
    const notif = document.getElementById('mockNotif');
    document.getElementById('mockTitle').innerText = document.getElementById('nTitle').value;
    document.getElementById('mockBody').innerText = document.getElementById('nBody').value;
    document.getElementById('mockIcon').innerText = document.getElementById('nIcon').value;
    
    notif.classList.remove('show');
    setTimeout(() => {
      notif.classList.add('show');
      setTimeout(() => {
        notif.classList.remove('show');
      }, 4000);
    }, 100);
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 4: Native UI Shell Creator
  // ═══════════════════════════════════════════
  function getShellCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Native UI Shell</title>
<style>
  :root { --p: #10b981; --bg: #0f172a; --sur: #1e293b; --txt: #f8fafc; --muted: #64748b; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: var(--bg); color: var(--txt); height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
  
  /* Top App Bar */
  header { background: var(--sur); height: 60px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; border-bottom: 1px solid #334155; position: relative; z-index: 10; padding-top: env(safe-area-inset-top); }
  
  /* Scrollable Content */
  main { flex: 1; overflow-y: auto; padding: 20px; -webkit-overflow-scrolling: touch; }
  
  /* UI Elements */
  .card { background: var(--sur); border-radius: 12px; padding: 20px; margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  .btn { display: block; width: 100%; padding: 15px; background: var(--p); color: #000; text-align: center; border-radius: 10px; font-weight: bold; text-decoration: none; margin-top: 10px; }
  
  /* Bottom Navigation */
  nav { background: var(--sur); height: 65px; border-top: 1px solid #334155; display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom); position: relative; z-index: 10; }
  .nav-item { display: flex; flex-direction: column; align-items: center; color: var(--muted); cursor: pointer; text-decoration: none; font-size: 10px; gap: 4px; width: 60px; }
  .nav-item.active { color: var(--p); }
  .nav-icon { font-size: 24px; }
</style>
</head>
<body>

  <header>App Name</header>
  
  <main>
    <h2 style="margin-top:0;">Welcome Back!</h2>
    <p style="color:var(--muted); font-size:14px;">This layout mimics a native mobile application perfectly using CSS Flexbox and Safe Area Insets for notches.</p>
    
    <div class="card">
      <h3 style="margin-top:0;">Recent Activity</h3>
      <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #334155; padding-bottom:10px;"><span>Payment Sent</span> <strong>-$45.00</strong></div>
      <div style="display:flex; justify-content:space-between;"><span>Deposit</span> <strong style="color:var(--p);">+$1,200.00</strong></div>
    </div>
    
    <a href="#" class="btn" onclick="alert('Native feel button clicked!')">Perform Action</a>
    <div style="height:50px;"></div> <!-- Scroll padding -->
  </main>
  
  <nav>
    <a href="#" class="nav-item active"><span class="nav-icon">🏠</span><span>Home</span></a>
    <a href="#" class="nav-item"><span class="nav-icon">🔍</span><span>Search</span></a>
    <a href="#" class="nav-item"><span class="nav-icon">🔔</span><span>Alerts</span></a>
    <a href="#" class="nav-item"><span class="nav-icon">👤</span><span>Profile</span></a>
  </nav>

</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 5: Data Grid CRUD Builder
  // ═══════════════════════════════════════════
  function getGridCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>SaaS Data Grid</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; }
  .header-ui { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  h1 { color: #38bdf8; margin: 0; }
  input[type="text"] { background: #1e293b; border: 1px solid #334155; color: #fff; padding: 10px 15px; border-radius: 8px; width: 250px; outline: none; }
  
  /* Table Styles */
  .table-container { background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
  table { width: 100%; border-collapse: collapse; text-align: left; }
  th { background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 15px; font-size: 13px; text-transform: uppercase; cursor: pointer; user-select: none; border-bottom: 1px solid #334155; }
  th:hover { background: rgba(56, 189, 248, 0.2); }
  td { padding: 15px; border-bottom: 1px solid #334155; font-size: 14px; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }
  
  .status { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  .status.active { background: rgba(16, 185, 129, 0.2); color: #10b981; }
  .status.pending { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
  .status.inactive { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
  
  .action-btn { background: transparent; border: none; color: #38bdf8; cursor: pointer; font-size: 16px; margin-right: 10px; }
</style>
</head>
<body>
  <div class="header-ui">
    <h1>🗃️ Users Database</h1>
    <input type="text" id="searchInput" placeholder="Search by name or email...">
  </div>

  <div class="table-container">
    <table id="dataTable">
      <thead>
        <tr>
          <th onclick="sortTable(0)">ID ↕</th>
          <th onclick="sortTable(1)">Name ↕</th>
          <th onclick="sortTable(2)">Email ↕</th>
          <th onclick="sortTable(3)">Role ↕</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tableBody">
        <!-- Rows injected by JS -->
      </tbody>
    </table>
  </div>

<script>
  const data = [
    { id: 101, name: "Alice Freeman", email: "alice@example.com", role: "Admin", status: "active" },
    { id: 102, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "pending" },
    { id: 103, name: "Charlie Davis", email: "charlie@example.com", role: "Viewer", status: "inactive" },
    { id: 104, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "active" },
    { id: 105, name: "Evan Wright", email: "evan@example.com", role: "Editor", status: "active" }
  ];

  function renderTable(filter = '') {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    const filtered = data.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()) || r.email.toLowerCase().includes(filter.toLowerCase()));
    
    filtered.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = \`
        <td>#\${row.id}</td>
        <td style="font-weight:bold; color:#fff;">\${row.name}</td>
        <td style="color:#94a3b8;">\${row.email}</td>
        <td>\${row.role}</td>
        <td><span class="status \${row.status}">\${row.status.toUpperCase()}</span></td>
        <td><button class="action-btn">✎</button> <button class="action-btn" style="color:#ef4444;">🗑</button></td>
      \`;
      tbody.appendChild(tr);
    });
  }

  document.getElementById('searchInput').addEventListener('input', (e) => renderTable(e.target.value));
  renderTable();

  // Simple sort logic
  let sortAsc = true;
  function sortTable(colIdx) {
    const keys = ['id', 'name', 'email', 'role'];
    const key = keys[colIdx];
    data.sort((a, b) => {
      if(a[key] < b[key]) return sortAsc ? -1 : 1;
      if(a[key] > b[key]) return sortAsc ? 1 : -1;
      return 0;
    });
    sortAsc = !sortAsc;
    renderTable(document.getElementById('searchInput').value);
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 6: Chart & Analytics Forge
  // ═══════════════════════════════════════════
  function getChartCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>SaaS Analytics Dashboard</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; }
  h1 { color: #8b5cf6; margin-top: 0; margin-bottom: 30px; }
  .dashboard { display: grid; grid-template-columns: 2fr 1fr; gap: 25px; }
  .card { background: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
  h3 { color: #fff; margin-top: 0; font-size: 16px; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 20px; }
  .chart-wrapper { position: relative; height: 300px; width: 100%; }
  canvas { display: block; }
</style>
<!-- Include Chart.js via CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>📈 Revenue Analytics</h1>
  <div class="dashboard">
    <div class="card">
      <h3>Monthly Recurring Revenue (MRR)</h3>
      <div class="chart-wrapper"><canvas id="lineChart"></canvas></div>
    </div>
    <div class="card">
      <h3>Traffic Sources</h3>
      <div class="chart-wrapper"><canvas id="donutChart"></canvas></div>
    </div>
  </div>

<script>
  // Line Chart
  const ctxLine = document.getElementById('lineChart').getContext('2d');
  
  // Create a gradient for the line chart fill
  let gradient = ctxLine.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)'); // purple
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Revenue ($)',
        data: [12000, 19000, 15000, 22000, 28000, 25000, 32000],
        borderColor: '#8b5cf6',
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#8b5cf6',
        pointRadius: 5,
        fill: true,
        tension: 0.4 // Smooth curves
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  // Donut Chart
  const ctxDonut = document.getElementById('donutChart').getContext('2d');
  new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
      labels: ['Organic', 'Direct', 'Referral', 'Social'],
      datasets: [{
        data: [55, 20, 15, 10],
        backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#cbd5e1', padding: 20 } }
      }
    }
  });
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 7: Kanban Task Manager
  // ═══════════════════════════════════════════
  function getKanbanCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>SaaS Kanban Board</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 30px; height: 100vh; display: flex; flex-direction: column; box-sizing: border-box;}
  h1 { color: #14b8a6; margin-top: 0; flex-shrink:0; }
  .board { display: flex; gap: 20px; flex: 1; overflow-x: auto; padding-bottom: 20px; }
  .column { background: #1e293b; border-radius: 8px; width: 300px; min-width: 300px; display: flex; flex-direction: column; border: 1px solid #334155; }
  .col-header { padding: 15px; border-bottom: 1px solid #334155; font-weight: bold; color: #fff; display: flex; justify-content: space-between; align-items: center; }
  .col-count { background: #334155; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
  .task-list { padding: 15px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; min-height:100px;}
  .task { background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 15px; cursor: grab; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
  .task:active { cursor: grabbing; transform: scale(0.98); }
  .task-title { color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 8px; }
  .task-tag { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: rgba(20, 184, 166, 0.2); color: #14b8a6; }
  
  /* Dragging styles */
  .dragging { opacity: 0.5; }
  .drag-over { background: rgba(20, 184, 166, 0.1); border: 2px dashed #14b8a6; }
</style>
</head>
<body>
  <h1>📋 Project Roadmap</h1>
  <div class="board">
    <!-- TODO Column -->
    <div class="column">
      <div class="col-header"><span>To Do</span><span class="col-count">3</span></div>
      <div class="task-list" id="todo" ondragover="allowDrop(event)" ondrop="drop(event)">
        <div class="task" draggable="true" ondragstart="drag(event)" id="t1">
          <div class="task-tag" style="background:rgba(239,68,68,0.2); color:#ef4444;">High</div>
          <div class="task-title" style="margin-top:8px;">Design API Schema</div>
          <div style="font-size:12px; color:#94a3b8;">Draft JSON structures for v2.</div>
        </div>
        <div class="task" draggable="true" ondragstart="drag(event)" id="t2">
          <div class="task-tag">Feature</div>
          <div class="task-title" style="margin-top:8px;">Add OAuth Login</div>
        </div>
        <div class="task" draggable="true" ondragstart="drag(event)" id="t3">
          <div class="task-tag">Bug</div>
          <div class="task-title" style="margin-top:8px;">Fix header overlapping</div>
        </div>
      </div>
    </div>
    
    <!-- IN PROGRESS Column -->
    <div class="column">
      <div class="col-header"><span>In Progress</span><span class="col-count">1</span></div>
      <div class="task-list" id="inprogress" ondragover="allowDrop(event)" ondrop="drop(event)">
        <div class="task" draggable="true" ondragstart="drag(event)" id="t4">
          <div class="task-tag" style="background:rgba(245,158,11,0.2); color:#f59e0b;">UI/UX</div>
          <div class="task-title" style="margin-top:8px;">Build Kanban Component</div>
        </div>
      </div>
    </div>
    
    <!-- DONE Column -->
    <div class="column">
      <div class="col-header"><span>Done</span><span class="col-count">1</span></div>
      <div class="task-list" id="done" ondragover="allowDrop(event)" ondrop="drop(event)">
        <div class="task" draggable="true" ondragstart="drag(event)" id="t5">
          <div class="task-tag">Setup</div>
          <div class="task-title" style="margin-top:8px; text-decoration:line-through;">Initialize Repo</div>
        </div>
      </div>
    </div>
  </div>

<script>
  let draggedId = null;

  function drag(ev) {
    draggedId = ev.target.id;
    ev.target.classList.add('dragging');
  }

  function allowDrop(ev) {
    ev.preventDefault();
    const list = ev.target.closest('.task-list');
    if(list) list.classList.add('drag-over');
  }

  function drop(ev) {
    ev.preventDefault();
    document.querySelectorAll('.task-list').forEach(l => l.classList.remove('drag-over'));
    
    const list = ev.target.closest('.task-list');
    if (list && draggedId) {
      const draggedEl = document.getElementById(draggedId);
      draggedEl.classList.remove('dragging');
      list.appendChild(draggedEl);
      updateCounts();
    }
  }

  document.addEventListener('dragend', () => {
    const el = document.getElementById(draggedId);
    if(el) el.classList.remove('dragging');
    document.querySelectorAll('.task-list').forEach(l => l.classList.remove('drag-over'));
  });

  function updateCounts() {
    document.querySelectorAll('.column').forEach(col => {
      const count = col.querySelectorAll('.task').length;
      col.querySelector('.col-count').innerText = count;
    });
  }
</script>
</body>
</html>`;
  }

  // ═══════════════════════════════════════════
  // TOOL 8: SaaS Pricing Toggle
  // ═══════════════════════════════════════════
  function getPricingCode(lang) {
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>SaaS Pricing Toggle</title>
<style>
  body { background: #0f172a; color: #cbd5e1; font-family: 'Inter', sans-serif; margin: 0; padding: 50px; text-align: center; }
  h1 { color: #fff; font-size: 36px; margin-bottom: 10px; }
  .toggle-container { display: inline-flex; background: #1e293b; border-radius: 30px; padding: 5px; margin-bottom: 50px; border: 1px solid #334155; position: relative; }
  .toggle-btn { padding: 10px 30px; border-radius: 25px; cursor: pointer; font-weight: bold; font-size: 14px; position: relative; z-index: 2; transition: color 0.3s; color: #94a3b8; }
  .toggle-btn.active { color: #fff; }
  .toggle-slider { position: absolute; top: 5px; left: 5px; width: calc(50% - 5px); height: calc(100% - 10px); background: #f43f5e; border-radius: 25px; z-index: 1; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  
  .pricing-grid { display: flex; gap: 30px; justify-content: center; max-width: 1000px; margin: 0 auto; flex-wrap: wrap; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 40px 30px; flex: 1; min-width: 250px; text-align: left; transition: transform 0.3s, border-color 0.3s; }
  .card:hover { transform: translateY(-10px); border-color: #f43f5e; }
  .card.popular { border-color: #f43f5e; position: relative; }
  .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #f43f5e; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
  
  .tier { font-size: 20px; font-weight: bold; color: #fff; margin-bottom: 10px; }
  .price { font-size: 48px; font-weight: 900; color: #fff; margin-bottom: 5px; }
  .period { font-size: 14px; color: #64748b; font-weight: normal; }
  .features { list-style: none; padding: 0; margin: 30px 0; }
  .features li { padding: 10px 0; border-bottom: 1px solid #334155; font-size: 14px; display: flex; align-items: center; gap: 10px; }
  .features li::before { content: "✓"; color: #10b981; font-weight: bold; }
  
  .cta-btn { display: block; width: 100%; padding: 15px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: bold; font-size: 14px; transition: background 0.3s; }
  .btn-outline { background: transparent; border: 2px solid #334155; color: #fff; }
  .btn-outline:hover { border-color: #f43f5e; color: #f43f5e; }
  .btn-solid { background: #f43f5e; border: 2px solid #f43f5e; color: #fff; }
  .btn-solid:hover { background: #e11d48; }

  /* Animation for price change */
  .fade-price { animation: fadeUp 0.3s forwards; }
  @keyframes fadeUp { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
</style>
</head>
<body>

  <h1>Simple, transparent pricing</h1>
  <p style="color:#94a3b8; margin-bottom:40px;">No hidden fees. Cancel anytime.</p>

  <div class="toggle-container" id="toggleBg">
    <div class="toggle-slider" id="slider"></div>
    <div class="toggle-btn active" id="btnMonth" onclick="setBilling('month')">Monthly</div>
    <div class="toggle-btn" id="btnYear" onclick="setBilling('year')">Annually <span style="color:#10b981; font-size:10px; margin-left:5px;">Save 20%</span></div>
  </div>

  <div class="pricing-grid">
    <div class="card">
      <div class="tier">Starter</div>
      <div class="price" id="p1">$<span class="val">19</span><span class="period">/mo</span></div>
      <p style="color:#94a3b8; font-size:14px;">Perfect for side projects.</p>
      <ul class="features">
        <li>Up to 5 Projects</li>
        <li>Basic Analytics</li>
        <li>Community Support</li>
      </ul>
      <a href="#" class="cta-btn btn-outline">Get Started</a>
    </div>

    <div class="card popular">
      <div class="popular-badge">Most Popular</div>
      <div class="tier">Professional</div>
      <div class="price" id="p2">$<span class="val">49</span><span class="period">/mo</span></div>
      <p style="color:#94a3b8; font-size:14px;">For growing businesses.</p>
      <ul class="features">
        <li>Unlimited Projects</li>
        <li>Advanced Analytics</li>
        <li>Priority Email Support</li>
        <li>Custom Domains</li>
      </ul>
      <a href="#" class="cta-btn btn-solid">Start Free Trial</a>
    </div>
  </div>

<script>
  const prices = {
    month: { p1: "19", p2: "49" },
    year:  { p1: "15", p2: "39" }
  };

  function setBilling(type) {
    const btnM = document.getElementById('btnMonth');
    const btnY = document.getElementById('btnYear');
    const slider = document.getElementById('slider');
    
    if(type === 'month') {
      btnM.classList.add('active'); btnY.classList.remove('active');
      slider.style.transform = 'translateX(0)';
    } else {
      btnY.classList.add('active'); btnM.classList.remove('active');
      slider.style.transform = 'translateX(100%)';
    }

    // Animate and update prices
    ['p1', 'p2'].forEach(id => {
      const valEl = document.querySelector(\`#\${id} .val\`);
      valEl.classList.remove('fade-price');
      void valEl.offsetWidth; // trigger reflow
      valEl.innerText = prices[type][id];
      valEl.classList.add('fade-price');
    });
  }
</script>
</body>
</html>`;
  }

  // Hook localization switcher
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') originalApplyLang();
    const currentLang = gl();
    const sideLbl = document.getElementById('lbl-tab-saasforge');
    if (sideLbl) sideLbl.textContent = currentLang === 'fr' ? 'Forge App & SaaS' : 'App & SaaS Forge';
    if (window.activeTab === 'saasforge') window.initSaasForge(currentLang);
  };

  console.log('📱 App & SaaS Forge loaded successfully!');
})();
