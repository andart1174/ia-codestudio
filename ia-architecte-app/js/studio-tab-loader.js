/**
 * IA Architecte Studio Pro — Central Tab Registry & On-Demand Lazy Loader
 * Eliminates startup bloat by loading heavy pure-tab studios on first click,
 * while providing an O(1) window.registerStudioTab(id, fn) registry.
 */
(function () {
  'use strict';

  var STUDIO_TABS = Object.create(null);
  window.STUDIO_TABS = STUDIO_TABS;
  window.registerStudioTab = function (tabId, renderFn) {
    if (tabId && typeof renderFn === 'function') {
      STUDIO_TABS[tabId] = renderFn;
    }
  };

  var LAZY_MAP = {
  "gamedevstudioultra": "js/game-dev-studio-ultra.js",
  "gamedevstudio": "js/game-dev-studio.js",
  "gamedevstudiopro": "js/game-dev-studio-pro.js",
  "cyberstudio": "js/cyber-studio.js",
  "musictosite": "js/music-to-site-studio.js",
  "webarchitect": "js/web-architect-studio.js",
  "svgmorphing": "js/svg-morphing-studio.js",
  "audiosynth": "js/audio-synth-studio.js",
  "saasforge": "js/saas-pwa-studio.js",
  "hardwareapi": "js/hardware-api-studio.js",
  "hyper4d": "js/hyper4d-synth.js",
  "indexeddbmgr": "js/indexeddb-manager-studio.js",
  "aillmstudio": "js/ai-llm-studio.js",
  "meshgradient": "js/mesh-gradient-studio.js",
  "webxr": "js/webxr-studio.js?v=5",
  "web3dapp": "js/web3-studio.js",
  "mobileuikit": "js/mobile-ui-kit.js",
  "datasciencestudio": "js/data-science-studio.js",
  "devopsstudio": "js/devops-studio.js",
  "neuralnet": "js/neural-net-sandbox.js",
  "gamedevstudioultimate": "js/game-dev-studio-ultimate.js",
  "themebreeder": "js/theme-breeder.js",
  "assetoptimizer": "js/asset-optimizer-studio.js",
  "extforge": "js/extension-forge.js",
  "holographiccard": "js/holographic-card-studio.js",
  "timewormhole": "js/git-wormhole.js",
  "spacenet": "js/space-net.js",
  "voxelextruder": "js/voxel-extruder.js",
  "apidesign": "js/api-design-studio.js",
  "codeprotector": "js/code-protector-studio.js",
  "webrtcstreamer": "js/webrtc-streamer-studio.js",
  "algoviz": "js/algo-visualizer.js",
  "creativecode": "js/creative-code-studio.js",
  "aichatbot": "js/ai-chatbot-studio.js",
  "agisentience": "js/agi-sentience-sandbox.js",
  "sonicsynth": "js/sonic-code-synth.js",
  "devbiometrics": "js/dev-biometrics.js",
  "personaswarm": "js/brand-persona-swarm.js",
  "quantumdebugger": "js/quantum-debugger.js",
  "neuroux": "js/neuro-ux-debugger.js",
  "uidreamer": "js/ui-dreamer.js",
  "deepspace": "js/deep-space-simulator.js",
  "timeline": "js/timeline-studio.js",
  "codeevolution": "js/code-evolution-lab.js",
  "svgshaper": "js/svg-shaper.js",
  "uiforge": "js/ui-forge.js",
  "gridbuilder": "js/grid-builder.js",
  "assetvault": "js/asset-vault.js",
  "tesseract": "js/tesseract-dataviz.js",
  "appdnasplicer": "js/app-dna-splicer.js",
  "physicscss": "js/physics-css-studio.js",
  "uxpredictor": "js/ux-predictor-studio.js",
  "geoadaptive": "js/geo-adaptive-studio.js",
  "dreamui": "js/dream-ui-studio.js",
  "vision": "js/vision-to-code.js"
};
  window.STUDIO_LAZY_MAP = LAZY_MAP;

  var loadedScripts = Object.create(null);
  var loadingPromises = Object.create(null);

  function loadScriptOnce(src) {
    if (loadedScripts[src]) return Promise.resolve();
    if (loadingPromises[src]) return loadingPromises[src];

    loadingPromises[src] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = function () {
        loadedScripts[src] = true;
        delete loadingPromises[src];
        resolve();
      };
      s.onerror = function () {
        delete loadingPromises[src];
        reject(new Error('Failed to load ' + src));
      };
      document.body.appendChild(s);
    });
    return loadingPromises[src];
  }

  function syncAccordion(tab) {
    var activeBtn = document.querySelector('.ltab[data-tab="' + tab + '"]');
    if (!activeBtn) return;
    document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
    activeBtn.classList.add('active');
    var cat = activeBtn.getAttribute('data-parent-folder-cat');
    if (cat) {
      document.querySelectorAll('.cat-content').forEach(function (c) { c.classList.remove('open'); });
      document.querySelectorAll('.cat-folder').forEach(function (f) { f.classList.remove('active'); });
      var folder = document.querySelector('.cat-folder[data-cat="' + cat + '"]');
      var content = document.querySelector('.cat-content[data-cat-content="' + cat + '"]');
      if (folder) folder.classList.add('active');
      if (content && content.style.display !== 'none') content.classList.add('open');
    }
  }

  function showLoadingState(tab) {
    var lb = document.getElementById('left-body');
    if (!lb) return;
    var isFr = (window.lang || window.appLang) === 'fr';
    lb.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;color:#94a3b8;gap:12px;">' +
        '<div style="width:32px;height:32px;border:3px solid rgba(99,102,241,0.25);border-top-color:#818cf8;border-radius:50%;animation:iaSpin 0.8s linear infinite;"></div>' +
        '<div style="font-size:12px;font-weight:700;color:#e2e8f0;">' + (isFr ? 'Chargement du studio...' : 'Loading studio...') + '</div>' +
        '<style>@keyframes iaSpin{to{transform:rotate(360deg)}}</style>' +
      '</div>';
  }

  function installHook() {
    var origRenderTab = window.renderTab;
    window.renderTab = function (tab) {
      // 1. O(1) Central Tab Registry
      if (typeof STUDIO_TABS[tab] === 'function') {
        window.activeTab = tab;
        syncAccordion(tab);
        STUDIO_TABS[tab]();
        return;
      }

      // 2. On-demand Lazy Module Loader
      var lazySrc = LAZY_MAP[tab];
      if (lazySrc && !loadedScripts[lazySrc]) {
        window.activeTab = tab;
        syncAccordion(tab);
        showLoadingState(tab);
        loadScriptOnce(lazySrc).then(function () {
          // Give modules with setTimeout(init, 0) a tick to attach their hook
          setTimeout(function () {
            if (window.activeTab === tab && typeof window.renderTab === 'function') {
              window.renderTab(tab);
              syncAccordion(tab);
            }
          }, 30);
        }).catch(function () {
          var lb = document.getElementById('left-body');
          if (lb) {
            lb.innerHTML =
              '<div style="padding:20px;text-align:center;color:#f87171;font-size:12px;">' +
                '<div style="margin-bottom:10px;">⚠️ Could not load module. Check connection.</div>' +
                '<button onclick="window.renderTab(\'' + tab + '\')" style="padding:8px 14px;background:#3b82f6;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">↻ Retry</button>' +
              '</div>';
          }
        });
        return;
      }

      // 3. Fallback to legacy renderTab chain
      if (typeof origRenderTab === 'function') {
        return origRenderTab(tab);
      }
    };
  }

  // Install after DOMContentLoaded so we sit cleanly on top of synchronous & DCL wrappers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installHook);
  } else {
    installHook();
  }
})();
