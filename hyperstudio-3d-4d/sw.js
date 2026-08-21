const CACHE_NAME = 'hyperstudio-3d-v1.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((k) => {
                    if (k !== CACHE_NAME) {
                        return caches.delete(k);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResp) => {
            if (cachedResp) return cachedResp;
            return fetch(e.request).then((networkResp) => {
                if (networkResp && networkResp.status === 200 && e.request.method === 'GET' && !e.request.url.startsWith('chrome-extension')) {
                    const respClone = networkResp.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, respClone);
                    });
                }
                return networkResp;
            }).catch(() => {
                return cachedResp;
            });
        })
    );
});
