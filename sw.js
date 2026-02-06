// sw.js - Service Worker pro Lékovka PRO 2026
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
            vibrate: [300, 100, 300],
            data: { arrival: Date.now() },
            actions: [{ action: 'open', title: 'Otevřít Lékovku' }]
        };

        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
