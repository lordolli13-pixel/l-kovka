// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Zpracování požadavku na notifikaci z hlavní aplikace
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIF') {
        const title = event.data.title;
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            vibrate: [200, 100, 200, 100, 200],
            tag: 'lekovka-notif', // Zabrání kupení stejných notifikací
            renotify: true
        };
        event.waitUntil(self.registration.showNotification(title, options));
    }
});

// Otevření aplikace po kliknutí na notifikaci
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
