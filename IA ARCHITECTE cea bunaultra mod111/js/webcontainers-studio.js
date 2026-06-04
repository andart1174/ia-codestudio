(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🐳 WEBCONTAINERS STUDIO (NODE.JS OS)
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'WEBCONTAINERS OS',
      sub: 'Native Node.js Browser Environment',
      booting: 'Booting WebContainer OS...',
      terminal: 'Terminal',
      startServer: '▶ Start Dev Server',
      stopServer: '⏹ Stop Server',
      installDeps: '📦 Install Dependencies',
      sysInfo: 'System Information',
      ram: 'Memory (RAM)',
      cpu: 'vCPU Usage',
      statusOffline: 'OFFLINE',
      statusOnline: 'ONLINE',
      injected: '✅ Container environment initialized.',
      pkgJson: 'package.json',
      logs: 'System Logs',
      clearLogs: 'Clear Logs'
    },
    fr: {
      title: 'WEBCONTAINERS OS',
      sub: 'Environnement Node.js Natif',
      booting: 'Démarrage de WebContainer OS...',
      terminal: 'Terminal',
      startServer: '▶ Lancer le Serveur',
      stopServer: '⏹ Arrêter le Serveur',
      installDeps: '📦 Installer les Dépendances',
      sysInfo: 'Informations Système',
      ram: 'Mémoire (RAM)',
      cpu: 'Utilisation vCPU',
      statusOffline: 'HORS LIGNE',
      statusOnline: 'EN LIGNE',
      injected: '✅ Environnement conteneurisé initialisé.',
      pkgJson: 'package.json',
      logs: 'Journaux Système',
      clearLogs: 'Effacer'
    }
  };

  function gl() { return window.appLang || 'en'; }

  function showBannerToast(msg) {
    if (window.showToast) window.showToast(msg);
    else console.log('[WEBCONTAINERS Toast]:', msg);
  }

  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'webcontainers') {
      window.activeTab = 'webcontainers';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-webcontainers');
      if (btn) btn.classList.add('active');
      initWebContainers(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') originalRenderTab(tab);
  };

  function initWebContainers(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#020617; color:#f8fafc;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1)); border-radius:14px; padding:16px; border:1px solid rgba(16,185,129,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
          <span style="font-size:32px; filter:drop-shadow(0 0 10px #10b981);">🐳</span>
          <div>
            <h2 style="margin:0; color:#34d399; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(16,185,129,0.4);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <!-- System Status Box -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:15px; margin-bottom:15px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="font-size:12px; font-weight:bold; color:#64748b; text-transform:uppercase;">${activeTx.sysInfo}</div>
            <div id="wc-status-badge" style="background:rgba(239,68,68,0.2); color:#ef4444; padding:3px 8px; border-radius:12px; font-size:10px; font-weight:900;">${activeTx.statusOffline}</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="background:#1e293b; padding:10px; border-radius:8px;">
              <div style="font-size:10px; color:#94a3b8; margin-bottom:4px;">${activeTx.ram}</div>
              <div id="wc-ram-val" style="font-size:14px; color:#34d399; font-weight:bold;">0 MB / 1024 MB</div>
              <div style="width:100%; height:4px; background:#0f172a; border-radius:2px; margin-top:5px; overflow:hidden;">
                <div id="wc-ram-bar" style="width:0%; height:100%; background:#34d399; transition:width 0.3s;"></div>
              </div>
            </div>
            <div style="background:#1e293b; padding:10px; border-radius:8px;">
              <div style="font-size:10px; color:#94a3b8; margin-bottom:4px;">${activeTx.cpu}</div>
              <div id="wc-cpu-val" style="font-size:14px; color:#38bdf8; font-weight:bold;">0%</div>
              <div style="width:100%; height:4px; background:#0f172a; border-radius:2px; margin-top:5px; overflow:hidden;">
                <div id="wc-cpu-bar" style="width:0%; height:100%; background:#38bdf8; transition:width 0.3s;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
          <button id="btn-wc-install" style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.4); color:#60a5fa; padding:12px; border-radius:8px; font-weight:bold; font-size:11px; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(59,130,246,0.2)'" onmouseout="this.style.background='rgba(59,130,246,0.1)'">
            ${activeTx.installDeps}
          </button>
          <button id="btn-wc-start" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.4); color:#34d399; padding:12px; border-radius:8px; font-weight:bold; font-size:11px; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(16,185,129,0.2)'" onmouseout="this.style.background='rgba(16,185,129,0.1)'">
            ${activeTx.startServer}
          </button>
        </div>

        <!-- Package.json snippet -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; overflow:hidden; margin-bottom:15px;">
          <div style="background:#1e293b; padding:8px 12px; font-size:11px; font-weight:bold; color:#cbd5e1; border-bottom:1px solid #334155;">
            📄 ${activeTx.pkgJson}
          </div>
          <pre style="margin:0; padding:12px; font-family:'JetBrains Mono', monospace; font-size:10px; color:#a5b4fc; background:#000; overflow-x:auto;">{
  "name": "ia-architecte-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}</pre>
        </div>

        <!-- Terminal -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; overflow:hidden;">
          <div style="background:#1e293b; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; font-weight:bold; color:#cbd5e1;">&gt;_ ${activeTx.terminal}</div>
            <button id="btn-wc-clear" style="background:none; border:none; color:#ef4444; font-size:10px; cursor:pointer; font-weight:bold;">${activeTx.clearLogs}</button>
          </div>
          <div id="wc-terminal-output" style="height:200px; padding:12px; font-family:'JetBrains Mono', monospace; font-size:10px; color:#4ade80; background:#000; overflow-y:auto; line-height:1.5;">
            <span style="color:#94a3b8;">[System]</span> ${activeTx.booting}<br>
          </div>
        </div>

      </div>
    `;

    // Logic
    const term = document.getElementById('wc-terminal-output');
    let isRunning = false;
    let simInterval = null;

    function log(msg, type='info') {
      const color = type === 'error' ? '#ef4444' : (type === 'warn' ? '#f59e0b' : '#4ade80');
      const time = new Date().toLocaleTimeString();
      term.innerHTML += `<span style="color:#64748b;">[${time}]</span> <span style="color:${color};">${msg}</span><br>`;
      term.scrollTop = term.scrollHeight;
    }

    document.getElementById('btn-wc-clear').addEventListener('click', () => {
      term.innerHTML = '';
    });

    document.getElementById('btn-wc-install').addEventListener('click', () => {
      if (isRunning) { log('Cannot install while server is running.', 'error'); return; }
      log('$ npm install', 'info');
      setTimeout(() => log('npm WARN deprecated...', 'warn'), 500);
      setTimeout(() => log('added 54 packages, and audited 55 packages in 2s', 'info'), 1500);
      setTimeout(() => log('found 0 vulnerabilities', 'info'), 1800);
    });

    const btnStart = document.getElementById('btn-wc-start');
    const badge = document.getElementById('wc-status-badge');
    const ramVal = document.getElementById('wc-ram-val');
    const ramBar = document.getElementById('wc-ram-bar');
    const cpuVal = document.getElementById('wc-cpu-val');
    const cpuBar = document.getElementById('wc-cpu-bar');

    btnStart.addEventListener('click', () => {
      if (isRunning) {
        // Stop
        isRunning = false;
        clearInterval(simInterval);
        btnStart.innerHTML = activeTx.startServer;
        btnStart.style.background = 'rgba(16,185,129,0.1)';
        btnStart.style.borderColor = 'rgba(16,185,129,0.4)';
        btnStart.style.color = '#34d399';
        badge.innerText = activeTx.statusOffline;
        badge.style.background = 'rgba(239,68,68,0.2)';
        badge.style.color = '#ef4444';
        ramVal.innerText = '0 MB / 1024 MB'; ramBar.style.width = '0%';
        cpuVal.innerText = '0%'; cpuBar.style.width = '0%';
        log('$ npm run stop', 'info');
        log('Server gracefully stopped.', 'warn');
      } else {
        // Start
        isRunning = true;
        btnStart.innerHTML = activeTx.stopServer;
        btnStart.style.background = 'rgba(239,68,68,0.1)';
        btnStart.style.borderColor = 'rgba(239,68,68,0.4)';
        btnStart.style.color = '#ef4444';
        badge.innerText = activeTx.statusOnline;
        badge.style.background = 'rgba(16,185,129,0.2)';
        badge.style.color = '#10b981';
        log('$ npm run dev', 'info');
        setTimeout(() => log('> ia-architecte-app@1.0.0 dev', 'info'), 200);
        setTimeout(() => log('> nodemon server.js', 'info'), 400);
        setTimeout(() => log('[nodemon] starting `node server.js`', 'info'), 800);
        setTimeout(() => log('🚀 Server running at http://localhost:3000', 'info'), 1200);

        simInterval = setInterval(() => {
          const r = Math.floor(Math.random() * 50) + 100;
          const c = Math.floor(Math.random() * 15) + 2;
          ramVal.innerText = `${r} MB / 1024 MB`;
          ramBar.style.width = `${(r/1024)*100}%`;
          cpuVal.innerText = `${c}%`;
          cpuBar.style.width = `${c}%`;
        }, 2000);
      }
    });

    showBannerToast(activeTx.injected);
  }

})();
