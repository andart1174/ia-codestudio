// Service Worker for IA Code Studio (ia-codestudio.com)
// PWA Offline Support & Asset Cache - Network-First Strategy

const CACHE_NAME = 'iacodestudio-v2.11';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/fr/index.html',
  '/404.html',
  '/style.css',
  '/css/hub-pages.css',
  '/css/neural-forge.css',
  '/js/neural-demos.js',
  '/js/neural-forge.js',
  '/3d-studios/index.html',
  '/marketing-widgets/index.html',
  '/arcade/index.html',
  '/compare/index.html',
  '/llms.txt',
  '/preview.html',
  '/manifest.json',
  '/logo-ia-codestudio.png',
  '/genius-ia-coin.png',
  '/free-tools/index.html',
  '/free-tools/style.css',
  '/free-tools/js/hub-utils.js',
  '/free-tools/js/i18n.js',
  '/free-tools/js/main.js',
  '/free-tools/playground/index.html',
  '/free-tools/playground/playground-style.css',
  '/free-tools/playground/templates.js',
  '/free-tools/playground/playground.js',
  '/free-tools/converters/converters-style.css',
  '/free-tools/converters/tailwind-to-vanilla/index.html',
  '/free-tools/converters/tailwind-to-vanilla/tailwind-to-vanilla.js',
  '/free-tools/converters/markdown-to-html/index.html',
  '/free-tools/converters/markdown-to-html/markdown-to-html.js',
  '/free-tools/converters/svg-optimizer/index.html',
  '/free-tools/converters/svg-optimizer/svg-optimizer.js',
  '/free-tools/converters/font-previewer-3d/index.html',
  '/free-tools/converters/font-previewer-3d/font-previewer-3d.css',
  '/free-tools/converters/font-previewer-3d/font-previewer-3d.js',
  '/free-tools/converters/base64/index.html',
  '/free-tools/converters/base64/base64.css',
  '/free-tools/converters/base64/base64.js',
  '/free-tools/converters/text-to-html/index.html',
  '/free-tools/converters/text-to-html/text-to-html.css',
  '/free-tools/converters/text-to-html/text-to-html.js',
  '/free-tools/converters/css-mesh-lab/index.html',
  '/free-tools/converters/css-mesh-lab/css-mesh-lab.js',
  '/free-tools/converters/grid-bento-builder/index.html',
  '/free-tools/converters/grid-bento-builder/grid-bento-builder.js',
  '/free-tools/converters/dev-swiss-kit/index.html',
  '/free-tools/converters/dev-swiss-kit/dev-swiss-kit.js',
  '/free-tools/omni-convert/index.html',
  '/free-tools/omni-convert/style.css',
  '/free-tools/omni-convert/app.js',
  '/free-tools/omni-convert/icon-48.png',
  '/free-tools/omni-convert/modules/core.js',
  '/free-tools/omni-convert/modules/code-editor.js',
  '/free-tools/omni-convert/modules/engines-data.js',
  '/free-tools/omni-convert/modules/engines-crypto-qr.js',
  '/free-tools/omni-convert/modules/engines-misc.js',
  '/free-tools/omni-convert/modules/ui-tools.js',
  '/free-tools/omni-convert/modules/ui-omnipipe.js',
  '/studio-3d-4d-pro/index.html',
  '/studio-3d-4d-pro/js/studio-module-loader.js',
  '/studio-3d-4d-pro/js/studio-shell-ui.js',
  '/hyperstudio-3d-4d/index.html',
  '/hyperstudio-3d-4d/style.css',
  '/hyperstudio-3d-4d/app.js',
  '/hyperstudio-3d-4d/modules/pbr-studio-env.js',
  '/hyperstudio-3d-4d/modules/flight-combat-v2.js',
  '/hyperstudio-3d-4d/modules/audio-video-4d-v2.js',
  '/hyperstudio-3d-4d/modules/export-webar-templates-v2.js',
  '/hyperstudio-3d-4d/modules/smart-editor-v2.js',
  '/hologram-hud-builder/index.html',
  '/hologram-hud-builder/app.js',
  '/hologram-hud-builder/js/premium-lock.js',
  '/hologram-hud-builder/modules/hologram-shaders-presets.js',
  '/hologram-hud-builder/modules/hud-director-ai-audio.js',
  '/hologram-hud-builder/modules/hud-pro-exporters.js',
  '/hologram-hud-builder/modules/hud-vault-qr.js',
  '/3d-creative-studio/index.html',
  '/3d-creative-studio/style.css',
  '/3d-creative-studio/app.js',
  '/3d-creative-studio/templates.js',
  '/3d-creative-studio/js/premium-lock.js',
  '/3d-creative-studio/modules/creative-templates-v2.js',
  '/3d-creative-studio/modules/creative-stage-tools.js',
  '/3d-creative-studio/modules/creative-gallery-ai.js',
  '/3d-creative-studio/modules/creative-exporters.js',
  '/3d-creative-studio/modules/creative-vault-share.js',
  '/ad-genius-ai/index.html',
  '/ad-genius-ai/style.css',
  '/ad-genius-ai/app.js',
  '/ad-genius-ai/js/genius-core-utils.js',
  '/ad-genius-ai/js/genius-pro-suite.js',
  '/ad-genius-ai/js/3d-showroom.js',
  '/ad-genius-ai/js/ar-business-card.js',
  '/ad-genius-ai/js/biolink-hub-pro.js',
  '/ad-genius-ai/js/brand-ad-studio.js',
  '/ad-genius-ai/js/certificate-studio-pro.js',
  '/ad-genius-ai/js/digital-book-studio.js',
  '/ad-genius-ai/js/digital-menu-pro.js',
  '/ad-genius-ai/js/gravity-sandbox.js',
  '/ad-genius-ai/js/gravity-sandbox-pro.js',
  '/ad-genius-ai/js/greeting-card-pro.js',
  '/ad-genius-ai/js/infinite-zoom.js',
  '/ad-genius-ai/js/kinetic-typography.js',
  '/ad-genius-ai/js/localized-ad-engine.js',
  '/ad-genius-ai/js/magazine-cover-pro.js',
  '/ad-genius-ai/js/mockup-box-studio.js',
  '/ad-genius-ai/js/mockup-master-pro.js',
  '/ad-genius-ai/js/playable-ad-builder.js',
  '/ad-genius-ai/js/pricing-table-studio.js',
  '/ad-genius-ai/js/scratch-card-studio.js',
  '/ad-genius-ai/js/smart-signage-pro.js',
  '/ad-genius-ai/js/smart-vcard-pro.js',
  '/ad-genius-ai/js/spin-wheel-ads.js'
];

// Install: Pre-cache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache fallback:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up older cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First with Cache Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and http/https schemes
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // Do not cache external tracking, Firebase auth, Stripe checkout, or Netlify serverless APIs
  if (url.pathname.startsWith('/.netlify/functions/') || url.hostname.includes('firebase') || url.hostname.includes('stripe') || url.hostname.includes('analytics')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If response is valid, clone and update cache for static assets
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Cache same-origin static assets
            if (url.origin === self.location.origin) {
              cache.put(event.request, responseToCache).catch(() => {});
            }
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed (offline) - try cache fallback
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Fallback to root index.html if navigating
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
