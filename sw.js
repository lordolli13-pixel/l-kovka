const CACHE_NAME = 'lekovka-cache-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('push', (event) => {
  const options = { body: 'Čas na vaše léky!', icon: './icon.png', badge: './icon.png' };
  event.waitUntil(self.registration.showNotification('Lékovka PRO', options));
});
