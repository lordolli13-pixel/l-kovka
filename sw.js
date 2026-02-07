// sw.js - Service Worker pro Lékovka PRO
const CACHE_NAME = 'lekovka-v26';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Poslech zpráv z hlavní aplikace
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
            tag: 'med-notif-' + event.data.medId + '-' + Date.now(), // Unikátní tag zajistí, že se nesloučí
            renotify: true,
            requireInteraction: true,
            data: { url: './' }
        };
        event.waitUntil(self.registration.showNotification(event.data.title, options));
    }
});

// Reakce na kliknutí na notifikaci
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
