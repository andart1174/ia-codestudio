// REALMONT ⚜️ Global Cyber Social — Service Worker v2.1
// Handles Web Push Notifications & Fast Standalone App Shell

const CACHE_NAME = 'realmont-pwa-v2.1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  '../logo-ia-codestudio.png',
  './genius-ia-coin.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('REALMONT PWA precache note:', err);
      });
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => clients.claim())
  );
});

// Cache with network fallback for static assets
self.addEventListener('fetch', e => {
  // Pass Firestore, Firebase auth, live streams, and external APIs directly to network
  if (e.request.url.includes('firestore.googleapis.com') ||
      e.request.url.includes('firebaseio.com') ||
      e.request.url.includes('identitytoolkit.googleapis.com') ||
      e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Push notifications from server (or Firestore triggers)
self.addEventListener('push', e => {
  let data = { 
    title: '⚜️ REALMONT', 
    body: 'New social activity in REALMONT!', 
    icon: '../logo-ia-codestudio.png', 
    badge: './genius-ia-coin.png' 
  };
  try {
    if (e.data) data = { ...data, ...e.data.json() };
  } catch(err) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '../logo-ia-codestudio.png',
      badge: data.badge || './genius-ia-coin.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' },
      actions: [
        { action: 'open', title: '👀 View' },
        { action: 'close', title: '✕ Close' }
      ]
    })
  );
});

// Click on notification → open community page
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'close') return;
  const targetUrl = (e.notification.data && e.notification.data.url) ? e.notification.data.url : './';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/community/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
