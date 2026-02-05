const CACHE_NAME = 'lekovka-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Instalace a uložení souborů do paměti (offline režim)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Aktivace a vyčištění staré paměti
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Obsluha požadavků (načítání z cache při offline stavu)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// --- PŘIDÁNO: Podpora pro notifikace ---
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { 
    title: 'Lékovka PRO 2026', 
    body: 'Je čas vzít si vaše léky!' 
  };
  
  const options = {
    body: data.body,
    icon: './icon.png',
    badge: './icon.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Reakce na kliknutí na notifikaci (otevře aplikaci)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
