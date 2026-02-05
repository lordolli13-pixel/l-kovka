// Načtení stavu při startu
let notifsActive = localStorage.getItem('notifs_active') === 'true';

async function toggleNotif(active) {
    if (active) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            notifsActive = true;
            localStorage.setItem('notifs_active', 'true');
            console.log("Notifikace povoleny");
        } else {
            alert("Povolte prosím oznámení v nastavení telefonu.");
            notifsActive = false;
            localStorage.setItem('notifs_active', 'false');
        }
    } else {
        notifsActive = false;
        localStorage.setItem('notifs_active', 'false');
    }
    updateNotifUI();
}

function updateNotifUI() {
    const toggle = document.getElementById('notif-toggle');
    if (toggle) toggle.checked = notifsActive;
    
    document.getElementById('notif-status').innerText = notifsActive ? "Aktivní" : "Vypnuto";
    document.getElementById('notif-icon').setAttribute('data-icon', notifsActive ? 'lucide:bell' : 'lucide:bell-off');
}

// Opravená funkce testu, která funguje i v nainstalované aplikaci
async function testNotif() {
    if (!notifsActive) {
        alert("Nejdříve zapněte upozornění vypínačem.");
        return;
    }

    const reg = await navigator.serviceWorker.ready;
    reg.showNotification("Lékovka PRO 2026", {
        body: "Upozornění je nyní správně nastaveno!",
        icon: "icon.png",
        badge: "icon.png",
        vibrate: [200, 100, 200]
    });
}

// Volat při startu aplikace
updateNotifUI();
