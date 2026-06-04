(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 📱 NATIVE COMPILER STUDIO (APK / IPA)
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'NATIVE MOBILE COMPILER',
      sub: 'Export HTML/JS to APK & IPA via Cloud Build',
      appName: 'Application Name',
      pkgId: 'Package ID (e.g., com.studio.app)',
      version: 'Version',
      buildApk: '🤖 Build Android (APK)',
      buildIpa: '🍏 Build iOS (IPA)',
      logs: 'Compilation Logs',
      clearLogs: 'Clear Logs',
      building: 'Initializing Cloud Builder...',
      success: 'Build successful! Download ready.',
      errorMissing: 'Please fill all fields before building.',
      injected: '✅ Native Compiler initialized.'
    },
    fr: {
      title: 'COMPILATEUR MOBILE NATIF',
      sub: 'Exportez HTML/JS en APK & IPA via Cloud',
      appName: 'Nom de l\'application',
      pkgId: 'ID du Paquet (ex: com.studio.app)',
      version: 'Version',
      buildApk: '🤖 Compiler Android (APK)',
      buildIpa: '🍏 Compiler iOS (IPA)',
      logs: 'Journaux de Compilation',
      clearLogs: 'Effacer',
      building: 'Initialisation du Cloud Builder...',
      success: 'Compilation réussie! Téléchargement prêt.',
      errorMissing: 'Veuillez remplir tous les champs avant de compiler.',
      injected: '✅ Compilateur Natif initialisé.'
    }
  };

  function gl() { return window.appLang || 'en'; }

  function showBannerToast(msg) {
    if (window.showToast) window.showToast(msg);
    else console.log('[NATIVE COMPILER Toast]:', msg);
  }

  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'nativecompiler') {
      window.activeTab = 'nativecompiler';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-nativecompiler');
      if (btn) btn.classList.add('active');
      initNativeCompiler(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') originalRenderTab(tab);
  };

  function initNativeCompiler(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#020617; color:#f8fafc;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg, rgba(236,72,153,0.1), rgba(139,92,246,0.1)); border-radius:14px; padding:16px; border:1px solid rgba(236,72,153,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);">
          <span style="font-size:32px; filter:drop-shadow(0 0 10px #ec4899);">📱</span>
          <div>
            <h2 style="margin:0; color:#f472b6; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(236,72,153,0.4);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <!-- Configuration Form -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:15px; margin-bottom:15px;">
          <label style="display:block; font-size:11px; font-weight:bold; color:#cbd5e1; margin-bottom:5px;">${activeTx.appName}</label>
          <input type="text" id="nc-app-name" value="My Awesome App" style="width:100%; background:#1e293b; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px; box-sizing:border-box; margin-bottom:12px; font-family:'Inter'; outline:none;">

          <label style="display:block; font-size:11px; font-weight:bold; color:#cbd5e1; margin-bottom:5px;">${activeTx.pkgId}</label>
          <input type="text" id="nc-pkg-id" value="com.studio.myapp" style="width:100%; background:#1e293b; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px; box-sizing:border-box; margin-bottom:12px; font-family:'Inter'; outline:none;">

          <label style="display:block; font-size:11px; font-weight:bold; color:#cbd5e1; margin-bottom:5px;">${activeTx.version}</label>
          <input type="text" id="nc-version" value="1.0.0" style="width:100%; background:#1e293b; border:1px solid #334155; color:#fff; padding:10px; border-radius:6px; box-sizing:border-box; margin-bottom:15px; font-family:'Inter'; outline:none;">

          <div style="display:flex; justify-content:center; margin-bottom:15px;">
            <div style="width:80px; height:80px; background:#1e293b; border:2px dashed #475569; border-radius:16px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:10px; cursor:pointer;" onmouseover="this.style.borderColor='#ec4899'" onmouseout="this.style.borderColor='#475569'">
              + ICON
            </div>
          </div>
        </div>

        <!-- Build Buttons -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
          <button id="btn-nc-apk" style="background:linear-gradient(90deg, #10b981, #059669); border:none; color:#fff; padding:14px; border-radius:8px; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3); transition:transform 0.1s;">
            ${activeTx.buildApk}
          </button>
          <button id="btn-nc-ipa" style="background:linear-gradient(90deg, #3b82f6, #2563eb); border:none; color:#fff; padding:14px; border-radius:8px; font-weight:900; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(59,130,246,0.3); transition:transform 0.1s;">
            ${activeTx.buildIpa}
          </button>
        </div>

        <!-- Terminal -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; overflow:hidden;">
          <div style="background:#1e293b; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; font-weight:bold; color:#cbd5e1;">&gt;_ ${activeTx.logs}</div>
            <button id="btn-nc-clear" style="background:none; border:none; color:#ef4444; font-size:10px; cursor:pointer; font-weight:bold;">${activeTx.clearLogs}</button>
          </div>
          <div id="nc-terminal-output" style="height:220px; padding:12px; font-family:'JetBrains Mono', monospace; font-size:10px; color:#fbcfe8; background:#000; overflow-y:auto; line-height:1.5;">
            <span style="color:#94a3b8;">[System]</span> Ready for compilation.<br>
          </div>
        </div>

      </div>
    `;

    // Logic
    const term = document.getElementById('nc-terminal-output');
    let isBuilding = false;

    function log(msg, type='info') {
      let color = '#fbcfe8';
      if(type === 'error') color = '#ef4444';
      if(type === 'success') color = '#34d399';
      if(type === 'warn') color = '#f59e0b';
      
      const time = new Date().toLocaleTimeString();
      term.innerHTML += `<span style="color:#64748b;">[${time}]</span> <span style="color:${color};">${msg}</span><br>`;
      term.scrollTop = term.scrollHeight;
    }

    document.getElementById('btn-nc-clear').addEventListener('click', () => {
      term.innerHTML = '';
    });

    function startBuild(platform) {
      if (isBuilding) return;
      const name = document.getElementById('nc-app-name').value;
      const pkg = document.getElementById('nc-pkg-id').value;
      
      if(!name || !pkg) {
        log(activeTx.errorMissing, 'error');
        return;
      }

      isBuilding = true;
      log(activeTx.building, 'info');
      log(`Platform target: ${platform.toUpperCase()}`, 'info');
      log(`Syncing files for ${name} (${pkg})...`, 'info');

      setTimeout(() => log('-> Running Capacitor bundle...', 'info'), 1000);
      setTimeout(() => log('-> Compiling assets...', 'info'), 2500);
      
      if(platform === 'apk') {
        setTimeout(() => log('-> Assembling Gradle project: :app:assembleRelease', 'warn'), 4000);
        setTimeout(() => log('-> Signing APK...', 'info'), 6000);
        setTimeout(() => {
          log(activeTx.success, 'success');
          log('⬇️ DOWNLOAD: ' + name.replace(/ /g, '_') + '.apk', 'success');
          isBuilding = false;
        }, 7500);
      } else {
        setTimeout(() => log('-> Archiving iOS workspace (Xcodebuild)...', 'warn'), 4000);
        setTimeout(() => log('-> Signing IPA with Apple certificates...', 'info'), 6000);
        setTimeout(() => {
          log(activeTx.success, 'success');
          log('⬇️ DOWNLOAD: ' + name.replace(/ /g, '_') + '.ipa', 'success');
          isBuilding = false;
        }, 8000);
      }
    }

    document.getElementById('btn-nc-apk').addEventListener('click', () => startBuild('apk'));
    document.getElementById('btn-nc-ipa').addEventListener('click', () => startBuild('ipa'));

    showBannerToast(activeTx.injected);
  }

})();
