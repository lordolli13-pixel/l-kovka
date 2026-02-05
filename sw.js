if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registrován');
        // Registrace pro notifikace hned při načtení
        return registration;
      })
      .catch(err => console.log('SW chyba', err));
  });
}

// Funkce pro testování notifikace přímo přes registrační objekt
function testNotif() {
  if (!("Notification" in window)) {
    alert("Tento prohlížeč nepodporuje notifikace.");
    return;
  }
  
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification("Lékovka PRO 2026", {
          body: "Takhle vypadá aktivní upozornění!",
          icon: "icon.png",
          vibrate: [200, 100, 200]
        });
      });
    } else {
      alert("Notifikace jsou v systému zakázány. Povolte je v Nastavení -> Oznámení.");
    }
  });
}
