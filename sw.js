// sw.js - Hlídač notifikací na pozadí
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIF') {
        const title = event.data.title;
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/3028/3028549.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/3028/3028549.png',
            vibrate: [200, 100, 200],
            tag: 'lekovka-notif',
            renotify: true,
            data: { url: self.location.origin }
        };
        event.waitUntil(self.registration.showNotification(title, options));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            if (windowClients.length > 0) return windowClients[0].focus();
            return clients.openWindow('/');
        })
    );
});
