// IA Code Studio — Service Worker v1.0
// Handles Web Push Notifications so users are alerted even when the site is closed

const CACHE_NAME = 'ia-studio-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Handle push notifications from server (or Firestore Cloud Functions)
self.addEventListener('push', e => {
  let data = { title: '🌟 IA Code Studio', body: 'You have a new notification!', icon: '/favicon.ico', badge: '/favicon.ico' };
  try {
    if (e.data) data = { ...data, ...e.data.json() };
  } catch(err) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/community/' },
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
  const targetUrl = (e.notification.data && e.notification.data.url) ? e.notification.data.url : '/community/';
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
