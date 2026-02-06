// sw.js - Kompletní kód pro spolehlivé notifikace na pozadí

self.addEventListener('install', (event) => {
    // Okamžitá aktivace nové verze SW bez čekání
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // SW převezme kontrolu nad aplikací ihned po aktivaci
    event.waitUntil(clients.claim());
});

// Naslouchání na zprávy z index.html (funkce triggerSystemNotif)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIF') {
        const title = event.data.title;
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            
            // Vibrace: 200ms vibruje, 100ms pauza, 200ms vibruje
            vibrate: [200, 100, 200],
            
            // Důležité: Odstraněním tagu zajistíme, že každá notifikace 
            // přijde jako nová zpráva a nesmaže tu předchozí.
            tag: undefined, 
            
            // Zajišťuje, že telefon pípne/zavibruje i u dalších zpráv
            renotify: false, 
            
            // Metadata pro budoucí akce
            data: {
                timestamp: Date.now()
            },
            
            // Akce přímo v notifikaci (volitelné, zobrazí se jako tlačítka)
            actions: [
                { action: 'open', title: 'Otevřít Lékovku' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    }
});

// Co se stane, když na notifikaci klikneš
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Zavře notifikaci

    // Pokusí se najít otevřené okno aplikace a zaměřit se na něj
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            // Pokud aplikace neběží, otevře ji
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
