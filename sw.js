const CACHE_NAME = 'lekovka-v26-ultra';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://code.iconify.design/3/3.1.0/iconify.min.js',
  'https://cdn.tailwindcss.com',
  'https://img.icons8.com/fluency/512/pill-2.png'
];

// Instalace - okamžité převzetí kontroly
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Aktivace - vyčištění starých verzí
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Strategie: Cache jako záloha (aby fungoval Tailwind offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Klíčová funkce: Poslech zpráv z aplikace pro zobrazení notifikace
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIF') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://img.icons8.com/fluency/512/pill-2.png',
      badge: 'https://img.icons8.com/fluency/128/pill-2.png',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: { url: self.registration.scope }
    });
  }
});

// Kliknutí na notifikaci otevře/zaměří aplikaci
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('./');
    })
  );
});
