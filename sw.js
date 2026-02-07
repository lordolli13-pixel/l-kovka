const CACHE_NAME = 'lekovka-v26';
const assets = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/4320/4320353.png'
];

// Instalace a kešování
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Aktivace a vyčištění staré keše
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
  )));
});

// Strategie: Síť jako první, pak keš (pro offline režim)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Zpracování kliknutí na notifikaci (otevře aplikaci)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
