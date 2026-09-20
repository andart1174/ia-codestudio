/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ULTRA PWA OFFLINE & NATIVE APP LAUNCHER STUDIO
 * Transforms any Studio application into a 100% offline-ready Progressive Web App
 * with W3C manifest.json, procedural HD icons (192x192 & 512x512 Canvas),
 * cache-first Service Worker, OS-aware Add-to-Homescreen banners, and ZIP export.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && typeof UltraSoundFX.play === 'function') {
      UltraSoundFX.play(type);
    }
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg, type || 'info');
    } else {
      console.log(`[Toast ${type}]: ${msg}`);
    }
  }

  const UltraPwaStudio = {
    appName: 'Ultra Production App',
    shortName: 'UltraApp',
    themeColor: '#0f172a',
    bgColor: '#020617',
    displayMode: 'standalone',
    orientation: 'any',
    iconGlyph: '⚡',
    offlineCacheEnabled: true,
    installPromptEnabled: true,
    osMode: 'ios',
    simIsAirplane: false,

    open() {
      _sound('click');
      const modal = document.getElementById('modal-pwa-studio');
      if (!modal) return;
      if (typeof applyTranslations === 'function') applyTranslations();

      // Attempt to load current active application title from APP or DOM badge
      const activeBadge = document.getElementById('active-app-badge');
      if (activeBadge && activeBadge.textContent) {
        this.appName = activeBadge.textContent.replace(/^[\s\S]*?—\s*/, '').trim() || this.appName;
        this.shortName = this.appName.split(/\s+/)[0].slice(0, 12);
      } else if (typeof APP !== 'undefined' && APP.name) {
        this.appName = APP.name;
        this.shortName = APP.name.split(/\s+/)[0].slice(0, 12);
      }

      const elAppName = document.getElementById('pwa-input-appname');
      const elShortName = document.getElementById('pwa-input-shortname');
      const elGlyph = document.getElementById('pwa-input-glyph');
      const elTheme = document.getElementById('pwa-input-theme');
      const elBg = document.getElementById('pwa-input-bg');
      const elDisplay = document.getElementById('pwa-select-display');
      const elOrient = document.getElementById('pwa-select-orientation');
      const elSw = document.getElementById('pwa-toggle-sw');
      const elPrompt = document.getElementById('pwa-toggle-prompt');

      if (elAppName) elAppName.value = this.appName;
      if (elShortName) elShortName.value = this.shortName;
      if (elGlyph) elGlyph.value = this.iconGlyph;
      if (elTheme) elTheme.value = this.themeColor;
      if (elBg) elBg.value = this.bgColor;
      if (elDisplay) elDisplay.value = this.displayMode;
      if (elOrient) elOrient.value = this.orientation;
      if (elSw) elSw.checked = this.offlineCacheEnabled;
      if (elPrompt) elPrompt.checked = this.installPromptEnabled;

      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      const modal = document.getElementById('modal-pwa-studio');
      if (modal) modal.classList.remove('show');
    },

    onAppNameChange(val) {
      this.appName = val || 'Ultra App';
      this.renderSimulator();
    },

    onShortNameChange(val) {
      this.shortName = val || 'UltraApp';
      this.renderSimulator();
    },

    onGlyphChange(val) {
      this.iconGlyph = val || '⚡';
      this.renderSimulator();
    },

    onThemeColorChange(val) {
      this.themeColor = val || '#0f172a';
      this.renderSimulator();
    },

    onBgColorChange(val) {
      this.bgColor = val || '#020617';
      this.renderSimulator();
    },

    onDisplayChange(val) {
      this.displayMode = val || 'standalone';
      this.renderSimulator();
    },

    onOrientationChange(val) {
      this.orientation = val || 'any';
      this.renderSimulator();
    },

    onToggleSw(val) {
      this.offlineCacheEnabled = !!val;
      this.renderSimulator();
    },

    onTogglePrompt(val) {
      this.installPromptEnabled = !!val;
      this.renderSimulator();
    },

    toggleOsMode(mode) {
      _sound('click');
      this.osMode = mode || 'ios';

      const btnIos = document.getElementById('pwa-btn-ios');
      const btnAndroid = document.getElementById('pwa-btn-android');

      if (btnIos && btnAndroid) {
        if (mode === 'ios') {
          btnIos.style.background = 'rgba(168,85,247,0.18)';
          btnIos.style.borderColor = '#a855f7';
          btnIos.style.color = '#d8b4fe';
          btnAndroid.style.background = 'transparent';
          btnAndroid.style.borderColor = 'rgba(255,255,255,0.12)';
          btnAndroid.style.color = '#94a3b8';
        } else {
          btnAndroid.style.background = 'rgba(16,185,129,0.18)';
          btnAndroid.style.borderColor = '#10b981';
          btnAndroid.style.color = '#6ee7b7';
          btnIos.style.background = 'transparent';
          btnIos.style.borderColor = 'rgba(255,255,255,0.12)';
          btnIos.style.color = '#94a3b8';
        }
      }

      this.renderSimulator();
    },

    toggleAirplaneMode() {
      _sound('click');
      this.simIsAirplane = !this.simIsAirplane;
      this.renderSimulator();
      if (this.simIsAirplane) {
        _toast('✈️ Airplane Mode ON: Serving cached assets from Service Worker!', 'info');
      } else {
        _toast('📶 Network Online: Connected to live web.', 'success');
      }
    },

    // Procedural Icon Generation via HTML5 Canvas (192x192 & 512x512)
    generateIconDataUrl(size) {
      try {
        if (typeof document === 'undefined') return '';
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';

        // Rounded Rect Clip
        const r = size * 0.22;
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(size - r, 0);
        ctx.quadraticCurveTo(size, 0, size, r);
        ctx.lineTo(size, size - r);
        ctx.quadraticCurveTo(size, size, size - r, size);
        ctx.lineTo(r, size);
        ctx.quadraticCurveTo(0, size, 0, size - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.clip();

        // Vibrant Gradient Background
        const grad = ctx.createLinearGradient(0, 0, size, size);
        grad.addColorStop(0, this.themeColor);
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Subtle Radial Highlight
        const radGrad = ctx.createRadialGradient(size * 0.35, size * 0.3, 5, size * 0.5, size * 0.5, size * 0.6);
        radGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
        radGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, size, size);

        // Draw Centered Emoji or Character
        ctx.font = `${Math.floor(size * 0.48)}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.iconGlyph, size / 2, size / 2 + size * 0.04);

        return canvas.toDataURL('image/png');
      } catch(e) {
        return '';
      }
    },

    generateManifestJson(isDataUri = false) {
      const icon192 = isDataUri ? this.generateIconDataUrl(192) : 'icon-192.png';
      const icon512 = isDataUri ? this.generateIconDataUrl(512) : 'icon-512.png';

      const manifestObj = {
        name: this.appName,
        short_name: this.shortName,
        description: `${this.appName} - Autonomous Offline Progressive Web App`,
        start_url: './index.html',
        scope: './',
        display: this.displayMode,
        orientation: this.orientation,
        background_color: this.bgColor,
        theme_color: this.themeColor,
        icons: [
          {
            src: icon192,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: icon512,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      };
      return JSON.stringify(manifestObj, null, 2);
    },

    generateServiceWorkerCode() {
      return `// Ultra PWA Cache-First Service Worker (100% Offline Airplane Mode Support)
const CACHE_NAME = '${this.shortName.toLowerCase().replace(/[^a-z0-9]/g, '')}-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use Promise.allSettled so a single missing asset does NOT fail installation
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => cache.add(url).catch((err) => console.warn('[PWA SW] Asset skipped:', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});
`;
    },

    // ──────────────────────────────────────────────────────────────────────────
    // COMPILE 100% COMPLETE EXECUTABLE STANDALONE HTML WITH CSS & JAVASCRIPT
    // ──────────────────────────────────────────────────────────────────────────
    getFullExecutableHtml(includePwaHeaders = true, isStandalone = false) {
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

      let htmlFragment = (targetApp && targetApp.html) ? targetApp.html : '';
      let cssFragment  = (targetApp && targetApp.css)  ? targetApp.css  : '';
      let jsFragment   = (targetApp && targetApp.js)   ? targetApp.js   : '';

      // If user is editing in Full HTML Mode
      if (targetApp && targetApp.full && targetApp.currentTab === 'full') {
        htmlFragment = targetApp.full;
      }

      const hasDoctype = htmlFragment.includes('<!DOCTYPE') || htmlFragment.includes('<html');

      const icon192 = isStandalone ? this.generateIconDataUrl(192) : 'icon-192.png';
      const icon512 = isStandalone ? this.generateIconDataUrl(512) : 'icon-512.png';
      const manifestHref = isStandalone
        ? 'data:application/manifest+json;charset=utf-8,' + encodeURIComponent(this.generateManifestJson(true))
        : 'manifest.json';

      const pwaMetaTags = includePwaHeaders ? `
  <!-- Ultra PWA & Mobile Web App Meta Tags -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="${this.shortName}">
  <meta name="theme-color" content="${this.themeColor}">
  <meta name="application-name" content="${this.appName}">
  <link rel="manifest" href="${manifestHref}">
  <link rel="apple-touch-icon" href="${icon192}">
  <link rel="icon" type="image/png" sizes="192x192" href="${icon192}">
  <link rel="icon" type="image/png" sizes="512x512" href="${icon512}">` : '';

      const pwaClientScript = `
<!-- Ultra PWA Runtime Engine & Mobile Enhancer -->
<script>
(function() {
  // 1. Service Worker Registration (only on HTTP/HTTPS)
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(function(reg) {
          console.log('[Ultra PWA] Service Worker active:', reg.scope);
        })
        .catch(function(err) {
          console.warn('[Ultra PWA] SW notice:', err.message);
        });
    });
  }

  // 2. Offline Status Banner
  var banner = document.createElement('div');
  banner.id = '__pwa_offline_banner';
  banner.style.cssText = 'display:none;position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#f59e0b;color:#000;font-weight:800;font-size:0.75rem;padding:6px 14px;border-radius:20px;z-index:9999999;box-shadow:0 4px 15px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif';
  banner.textContent = '⚡ Offline Mode Active (Cache Available)';
  document.body.appendChild(banner);

  window.addEventListener('offline', function() { banner.style.display = 'block'; });
  window.addEventListener('online', function() { banner.style.display = 'none'; });

  // 3. Smart Install Banner (Android & iOS)
  var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  if (isIos && !isStandalone && !sessionStorage.getItem('__pwa_prompt_dismissed')) {
    var iosCard = document.createElement('div');
    iosCard.id = '__pwa_ios_prompt';
    iosCard.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);width:92%;max-width:340px;background:rgba(15,23,42,0.94);border:1px solid rgba(255,255,255,0.18);border-radius:16px;padding:12px 14px;box-shadow:0 15px 40px rgba(0,0,0,0.85);backdrop-filter:blur(12px);color:#fff;z-index:999999;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:space-between';
    iosCard.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.4rem">🍎</span><div style="font-size:0.72rem;color:#cbd5e1;line-height:1.35"><strong style="color:#fff">Install ${this.shortName}</strong><br>Tap <strong>Share ⎋</strong> then <strong>"Add to Home Screen ⊞"</strong></div></div><span onclick="sessionStorage.setItem(\'__pwa_prompt_dismissed\',\'1\');this.closest(\'#__pwa_ios_prompt\').remove()" style="cursor:pointer;color:#94a3b8;font-size:0.85rem;padding:4px">✕</span>';
    document.body.appendChild(iosCard);
  }

  var deferredPrompt;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    if (sessionStorage.getItem('__pwa_prompt_dismissed')) return;
    var aCard = document.createElement('div');
    aCard.id = '__pwa_android_prompt';
    aCard.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);width:92%;max-width:340px;background:rgba(15,23,42,0.94);border:1px solid rgba(255,255,255,0.18);border-radius:16px;padding:12px 14px;box-shadow:0 15px 40px rgba(0,0,0,0.85);backdrop-filter:blur(12px);color:#fff;z-index:999999;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:space-between';
    aCard.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.3rem">${this.iconGlyph}</span><div style="font-size:0.75rem;font-weight:700;color:#fff">${this.shortName}<div style="font-size:0.65rem;color:#94a3b8;font-weight:normal">Install as native app</div></div></div><div style="display:flex;align-items:center;gap:6px"><button id="__pwa_install_btn" style="background:#10b981;border:none;border-radius:6px;padding:6px 12px;font-weight:900;font-size:0.72rem;color:#000;cursor:pointer">Install</button><span onclick="sessionStorage.setItem(\'__pwa_prompt_dismissed\',\'1\');this.closest(\'#__pwa_android_prompt\').remove()" style="cursor:pointer;color:#94a3b8;font-size:0.85rem;padding:2px 4px">✕</span></div>';
    document.body.appendChild(aCard);
    var instBtn = aCard.querySelector('#__pwa_install_btn');
    if (instBtn) {
      instBtn.onclick = function() {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt = null;
        }
        aCard.remove();
      };
    }
  });
})();
</script>
`;

      if (hasDoctype) {
        let doc = htmlFragment;
        doc = doc.replace(/<!-- Ultra PWA & Offline Engine[\s\S]*?<\/link>/gi, '');
        doc = doc.replace(/<!-- Ultra PWA & Offline Engine[\s\S]*?<!-- \/Ultra PWA & Offline Engine -->/gi, '');
        doc = doc.replace(/<!-- Ultra PWA Native Launcher[\s\S]*?<\/script>/gi, '');
        doc = doc.replace(/<!-- Ultra PWA Runtime Engine[\s\S]*?<\/script>/gi, '');

        if (includePwaHeaders) {
          if (doc.includes('</head>')) {
            doc = doc.replace('</head>', `${pwaMetaTags}\n</head>`);
          } else {
            doc = pwaMetaTags + '\n' + doc;
          }
        }
        if (doc.includes('</body>')) {
          doc = doc.replace('</body>', `${pwaClientScript}\n</body>`);
        } else {
          doc = doc + '\n' + pwaClientScript;
        }
        return doc;
      }

      // Standard Assembly: full DOCTYPE + Viewport + CSS styles + HTML + JS logic
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>${this.appName}</title>
${pwaMetaTags}
  <style>
    /* Ultra PWA Native Mobile Resets */
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
      background-color: ${this.bgColor};
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
${cssFragment}
  </style>
</head>
<body>
${htmlFragment}
${pwaClientScript}
  <script>
${jsFragment}
  </script>
</body>
</html>`;
    },

    renderSimulator() {
      const container = document.getElementById('pwa-simulator-container');
      if (!container) return;

      const isIos = (this.osMode === 'ios');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      container.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;font-family:system-ui,-apple-system,sans-serif">
          <!-- Smartphone Outer Chassis -->
          <div style="width:280px;height:380px;border-radius:36px;background:#000;border:4px solid ${isIos ? '#334155' : '#1e293b'};box-shadow:0 25px 60px rgba(0,0,0,0.9),0 0 25px ${this.themeColor};position:relative;overflow:hidden;display:flex;flex-direction:column">
            <!-- Notch / Dynamic Island -->
            <div style="position:absolute;top:6px;left:50%;transform:translateX(-50%);width:${isIos ? '84px' : '50px'};height:${isIos ? '18px' : '10px'};background:#090d16;border-radius:12px;z-index:20;display:flex;align-items:center;justify-content:center">
              ${isIos ? '<div style="width:7px;height:7px;border-radius:50%;background:#0284c7;margin-right:8px"></div>' : ''}
              <div style="width:5px;height:5px;border-radius:50%;background:#1e293b"></div>
            </div>

            <!-- Top Status Bar -->
            <div style="height:28px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-size:0.6rem;color:#cbd5e1;z-index:10">
              <span style="font-weight:700">9:41</span>
              <div style="display:flex;align-items:center;gap:6px">
                <button onclick="UltraPwaStudio.toggleAirplaneMode()" style="background:${this.simIsAirplane ? '#f59e0b' : 'rgba(255,255,255,0.1)'};border:none;border-radius:8px;padding:1px 5px;color:#fff;font-size:0.58rem;cursor:pointer" title="Toggle Airplane Mode">
                  ${this.simIsAirplane ? '✈️ Offline' : '📶 5G'}
                </button>
                <span>100%</span>
              </div>
            </div>

            <!-- Screen Viewport Body -->
            <div style="flex:1;background:${this.bgColor};display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:14px;position:relative;overflow:hidden">
              <!-- Homescreen App Icon Preview -->
              <div style="display:flex;flex-direction:column;align-items:center;margin-top:10px">
                <div style="width:68px;height:68px;border-radius:18px;background:linear-gradient(135deg,${this.themeColor},#000);box-shadow:0 10px 25px rgba(0,0,0,0.6),0 0 15px rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:2rem;border:1px solid rgba(255,255,255,0.15);user-select:none">
                  ${this.iconGlyph}
                </div>
                <div style="font-size:0.75rem;font-weight:700;color:#fff;margin-top:6px;max-width:140px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                  ${this.shortName}
                </div>
                <div style="font-size:0.62rem;color:#10b981;margin-top:2px">
                  ● PWA Standalone Ready
                </div>
              </div>

              <!-- Offline Badge -->
              ${this.simIsAirplane ? `
                <div style="background:rgba(245,158,11,0.15);border:1px solid #f59e0b;border-radius:10px;padding:6px 10px;text-align:center;color:#fbbf24;font-size:0.65rem;width:90%">
                  <strong>⚡ Airplane Mode Active</strong><br>
                  Service Worker cache serving all views offline!
                </div>
              ` : `
                <div style="background:rgba(16,185,129,0.1);border:1px solid #10b981;border-radius:10px;padding:6px 10px;text-align:center;color:#6ee7b7;font-size:0.65rem;width:90%">
                  <strong>✓ 100% PWA Certified</strong><br>
                  Fast loading & instant native feel
                </div>
              `}

              <!-- OS Install Prompt Banner Simulation -->
              ${this.installPromptEnabled ? `
                <div style="background:rgba(15,23,42,0.92);border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:8px 10px;width:95%;box-shadow:0 10px 25px rgba(0,0,0,0.8);backdrop-filter:blur(10px);color:#fff">
                  ${isIos ? `
                    <div style="display:flex;align-items:center;gap:8px">
                      <div style="font-size:1.1rem">🍎</div>
                      <div style="font-size:0.64rem;color:#cbd5e1;line-height:1.3">
                        <strong style="color:#fff">Add to iPhone Screen:</strong><br>
                        Tap <strong>Share ⎋</strong> then <strong>"Add to Home Screen ⊞"</strong>
                      </div>
                    </div>
                  ` : `
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
                      <div style="display:flex;align-items:center;gap:6px">
                        <span style="font-size:1rem">🤖</span>
                        <div style="font-size:0.64rem;line-height:1.2">
                          <strong style="color:#fff">${this.shortName}</strong><br>
                          <span style="color:#94a3b8">Web App</span>
                        </div>
                      </div>
                      <button onclick="_sound('celebrate');_toast('PWA installation prompt triggered!','success')" style="background:#10b981;border:none;border-radius:6px;padding:4px 8px;font-size:0.62rem;font-weight:900;color:#000;cursor:pointer">Install</button>
                    </div>
                  `}
                </div>
              ` : ''}
            </div>

            <!-- Bottom Home Indicator Bar -->
            <div style="height:14px;background:#000;display:flex;align-items:center;justify-content:center">
              <div style="width:75px;height:3px;border-radius:3px;background:rgba(255,255,255,0.4)"></div>
            </div>
          </div>
        </div>
      `;
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 1-CLICK INJECTION INTO ACTIVE APPLICATION
    // ──────────────────────────────────────────────────────────────────────────
    injectIntoApp() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

      if (targetApp && targetApp.html !== undefined) {
        // Clean previous injections
        targetApp.html = targetApp.html.replace(/<!-- Ultra PWA & Offline Engine[\s\S]*?<\/link>/gi, '');
        targetApp.html = targetApp.html.replace(/<!-- Ultra PWA & Offline Engine[\s\S]*?<!-- \/Ultra PWA & Offline Engine -->/gi, '');
        targetApp.html = targetApp.html.replace(/<!-- Ultra PWA Native Launcher[\s\S]*?<\/script>/gi, '');

        const pwaHeaderTags = `<!-- Ultra PWA & Offline Engine -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="${this.shortName}">
<meta name="theme-color" content="${this.themeColor}">
<link rel="manifest" href="manifest.json">
<!-- /Ultra PWA & Offline Engine -->`;

        const pwaBodyScript = `<!-- Ultra PWA Native Launcher -->
<script>
(function() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function(){});
    });
  }
  var banner = document.createElement('div');
  banner.id = '__pwa_offline_banner';
  banner.style.cssText = 'display:none;position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#f59e0b;color:#000;font-weight:800;font-size:0.75rem;padding:6px 14px;border-radius:20px;z-index:9999999;box-shadow:0 4px 15px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif';
  banner.textContent = '⚡ Offline Mode Active';
  document.body.appendChild(banner);
  window.addEventListener('offline', function() { banner.style.display = 'block'; });
  window.addEventListener('online', function() { banner.style.display = 'none'; });
})();
</script>`;

        if (targetApp.html.includes('</head>')) {
          targetApp.html = targetApp.html.replace('</head>', `${pwaHeaderTags}\n</head>`);
        } else {
          targetApp.html = pwaHeaderTags + '\n' + targetApp.html;
        }
        targetApp.html = targetApp.html.trim() + '\n\n' + pwaBodyScript;

        targetApp.full = this.getFullExecutableHtml(true, false);

        if (targetApp.editor && targetApp.currentTab === 'html') {
          try { targetApp.editor.setValue(targetApp.html); } catch(e){}
        }

        if (typeof window.refreshPreview === 'function') {
          window.refreshPreview();
        } else if (typeof refreshPreview === 'function') {
          refreshPreview();
        }

        this.close();
        _sound('celebrate');
        if (window.UltraConfetti && typeof window.UltraConfetti.fire === 'function') {
          window.UltraConfetti.fire(50);
        }
        _toast(isFr ? '📱 PWA & Service Worker injectés avec succès !' : '📱 PWA & Service Worker injected into active app!', 'success');
      } else {
        _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
      }
    },

    // ──────────────────────────────────────────────────────────────────────────
    // OPEN FULLSCREEN MOBILE VIEW IN NEW TAB
    // ──────────────────────────────────────────────────────────────────────────
    openInNewTab() {
      _sound('click');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      try {
        const fullHtml = this.getFullExecutableHtml(true, true);
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        _toast(isFr ? '🌐 Aperçu mobile complet ouvert dans un nouvel onglet !' : '🌐 Full mobile preview opened in new tab!', 'success');
      } catch(e) {
        console.error(e);
        _toast('Could not open preview tab.', 'warning');
      }
    },

    // ──────────────────────────────────────────────────────────────────────────
    // OPEN MOBILE QR CODE MODAL FOR LIVE SMARTPHONE TEST
    // ──────────────────────────────────────────────────────────────────────────
    openMobileQr() {
      _sound('click');
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      if (typeof openModal === 'function') {
        this.close();
        openModal('qr');
        _toast(isFr ? '📱 Scannez le code QR avec votre téléphone !' : '📱 Scan the QR code with your phone camera!', 'info');
      } else {
        this.openInNewTab();
      }
    },

    // ──────────────────────────────────────────────────────────────────────────
    // DOWNLOAD COMPLETE PWA PACKAGE (.ZIP)
    // ──────────────────────────────────────────────────────────────────────────
    async downloadPwaZip() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export PWA Package')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      if (typeof JSZip === 'undefined') {
        _toast('JSZip library loading...', 'warning');
        return;
      }

      try {
        _sound('click');
        const zip = new JSZip();

        // 1. Fully Styled Complete Production index.html
        const fullIndexHtml = this.getFullExecutableHtml(true, false);
        zip.file('index.html', fullIndexHtml);

        // 2. Standalone All-In-One Fallback HTML (runs anywhere offline by double-clicking)
        const standaloneHtml = this.getFullExecutableHtml(true, true);
        zip.file('standalone_app.html', standaloneHtml);

        // 3. Manifest.json & Service Worker
        zip.file('manifest.json', this.generateManifestJson(false));
        zip.file('sw.js', this.generateServiceWorkerCode());

        // 4. Procedural High-Definition Icons (192 & 512 PNG)
        const icon192Url = this.generateIconDataUrl(192);
        const icon512Url = this.generateIconDataUrl(512);

        if (icon192Url && icon192Url.includes(',')) {
          zip.file('icon-192.png', icon192Url.split(',')[1], { base64: true });
        }
        if (icon512Url && icon512Url.includes(',')) {
          zip.file('icon-512.png', icon512Url.split(',')[1], { base64: true });
        }

        // 5. Bilingual Professional README Guide
        zip.file('README.md', `# ${this.appName} — Progressive Web App (PWA)

## 📱 How to Run on Mobile (Android & iPhone)

### ⚠️ IMPORTANT NOTE: Avoid Android "HTML Viewer" Plain Text Mode
When transferring or tapping \`index.html\` or \`standalone_app.html\` in mobile file managers (Samsung My Files, Files by Google), the operating system may default to **"HTML Viewer"** (a document reader that displays plain unstyled text and disables scripts).

**To run the real application with full styles and interactivity:**
1. Choose **"Open with Google Chrome"** (Android) or **"Safari"** (iPhone).
2. **Double-click \`standalone_app.html\`** to run offline anywhere on any phone or laptop!

---

### 🚀 Production Deployment (1-Click Free Hosting)
To get the full native mobile experience with home screen icon and offline caching:
1. Upload this folder to any free HTTPS static host:
   - **Netlify Drop** (https://app.netlify.com/drop) — Just drag & drop this folder or .zip!
   - **GitHub Pages** (https://pages.github.com)
   - **Vercel** (https://vercel.com)
   - **Cloudflare Pages** (https://pages.cloudflare.com)
2. Open your HTTPS URL in your mobile phone browser:
   - **iOS (Safari)**: Tap the **Share ⎋** button -> select **"Add to Home Screen ⊞"**.
   - **Android (Chrome)**: Tap the 3-dots menu (⋮) -> select **"Install App"** or **"Add to Home Screen"**.

---

## 📦 Package Contents
- \`index.html\`: Production Progressive Web App with Service Worker & Manifest link.
- \`standalone_app.html\`: Single-file autonomous app with embedded styles and icons.
- \`manifest.json\`: Standard W3C Web App Manifest.
- \`sw.js\`: Resilient Cache-First Service Worker for 100% offline access.
- \`icon-192.png\`: 192x192 HD Mobile Icon.
- \`icon-512.png\`: 512x512 Splash Screen Icon.
`);

        const blob = await zip.generateAsync({ type: 'blob' });
        const safeName = this.shortName.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'pwa_app';

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${safeName}_pwa.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        _sound('celebrate');
        _toast(isFr ? '📦 Package PWA complet (.zip) téléchargé !' : '📦 Complete PWA Package (.zip) downloaded!', 'success');
      } catch(e) {
        console.error(e);
        _toast('Failed to create PWA zip package.', 'warning');
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraPwaStudio = UltraPwaStudio;
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const modal = document.getElementById('modal-pwa-studio');
          if (modal && modal.classList.contains('show')) {
            UltraPwaStudio.close();
          }
        }
      });
    }
  }

  console.log('[ULTRA] PWA Offline & Native App Launcher Studio initialized.');
})();
