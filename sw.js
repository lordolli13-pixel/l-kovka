self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Lékovka", {
      body: data.body || "Čas na vaše léky!",
      icon: "https://api.iconify.design/lucide:pill.png?color=%238b8071"
    })
  );
});
