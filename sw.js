// sw.js - Service Worker pro Lékovku PRO 2026
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Naslouchání na zprávu z hlavní aplikace
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            vibrate: [500, 110, 500, 110, 450, 110, 200, 110],
            tag: 'med-reminder-' + event.data.medId, // Zabrání duplicitám pro stejný lék
            renotify: true,
            requireInteraction: true,
            data: { url: './' }
        };
        event.waitUntil(self.registration.showNotification(event.data.title, options));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('./');
        })
    );
});
