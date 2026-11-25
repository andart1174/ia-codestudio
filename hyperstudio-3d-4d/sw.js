// Service Worker for HyperStudio 3D/4D & Flight Simulator v2.0
// Network-First Strategy with Offline Cache Fallback (never freezes returning users on stale code)

const CACHE_NAME = 'hyperstudio-3d-v2.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './modules/pbr-studio-env.js',
    './modules/flight-combat-v2.js',
    './modules/audio-video-4d-v2.js',
    './modules/export-webar-templates-v2.js',
    './modules/smart-editor-v2.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.warn('[HyperStudio SW] Pre-cache partial fallback:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((k) => {
                    if (k !== CACHE_NAME && k.startsWith('hyperstudio-3d-')) {
                        return caches.delete(k);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;
    let url;
    try {
        url = new URL(e.request.url);
    } catch (_) {
        return;
    }
    if (!url.protocol.startsWith('http')) return;

    // Never intercept auth, payments, or analytics
    if (url.hostname.includes('stripe') || url.hostname.includes('firebase') || url.hostname.includes('analytics') || url.hostname.includes('googletagmanager')) {
        return;
    }

    // Network-First strategy: always fetch latest code when online, fall back to cache offline
    e.respondWith(
        fetch(e.request)
            .then((networkResp) => {
                if (networkResp && networkResp.status === 200 && url.origin === self.location.origin) {
                    const respClone = networkResp.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, respClone).catch(() => {});
                    });
                }
                return networkResp;
            })
            .catch(() => {
                return caches.match(e.request).then((cachedResp) => {
                    if (cachedResp) return cachedResp;
                    if (e.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                    return new Response('Offline', { status: 503, statusText: 'Offline' });
                });
            })
    );
});
