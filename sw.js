// Service Worker for IA Code Studio (ia-codestudio.com)
// PWA Offline Support & Asset Cache - Network-First Strategy

const CACHE_NAME = 'iacodestudio-v1.2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-ia-codestudio.png',
  '/genius-ia-coin.png'
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

  // Do not cache external tracking, Firebase auth, or Stripe checkout
  if (url.hostname.includes('firebase') || url.hostname.includes('stripe') || url.hostname.includes('analytics')) {
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
