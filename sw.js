const CACHE_NAME = 'lekovka-v26-final';
const ASSETS = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://code.iconify.design/3/3.1.0/iconify.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// Zpracování kliknutí na notifikaci
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('./');
    })
  );
});
