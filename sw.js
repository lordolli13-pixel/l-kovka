self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

self.addEventListener('push', (event) => {
  const options = {
    body: 'Čas na vaše léky!',
    icon: 'icon.png',
    vibrate: [200, 100, 200],
    tag: 'med-reminder',
    renotify: true
  };
  event.waitUntil(self.registration.showNotification('Lékovka PRO', options));
});
