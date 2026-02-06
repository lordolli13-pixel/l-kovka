// UPRAVENÁ FUNKCE PRO RUČNÍ PŘIDÁNÍ ČASU (automaticky zaměří pole)
function addManualTime() { 
    const t = document.getElementById('manual-time').value; 
    if (t) { 
        addTime(t); 
        document.getElementById('manual-time').value = ''; 
    } else {
        alert("Nejdříve vyberte čas na hodinách!");
    }
}

// UPRAVENÁ FUNKCE SAVE, KTERÁ NEZAPOMENE NA RUČNĚ ZADANÝ ČAS
function saveMed() {
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('f-name').value;
    let timesVal = document.getElementById('f-times').value;
    const manualT = document.getElementById('manual-time').value;

    // POJISTKA: Pokud jsi vybral čas na hodinách, ale neklikl na "+ ČAS", 
    // tato oprava ho tam přidá automaticky za tebe.
    if (manualT) {
        let current = timesVal ? timesVal.split(',').map(x => x.trim()).filter(x => x !== "") : [];
        if (!current.includes(manualT)) {
            current.push(manualT);
            current.sort();
            timesVal = current.join(', ');
            document.getElementById('f-times').value = timesVal;
        }
    }

    if (!name || !timesVal) {
        return alert("Vyplňte název a alespoň jeden čas (nezapomeňte kliknout na + ČAS nebo vybrat čas na hodinách)!");
    }

    const data = { 
        id: id ? parseInt(id) : Date.now(), 
        name, 
        stock: parseFloat(document.getElementById('f-stock').value) || 0, 
        dose: parseFloat(document.getElementById('f-dose').value) || 1, 
        type: currentType, 
        times: timesVal.split(',').map(x => x.trim()).filter(x => x !== ""), 
        obden: obdenType, 
        days: Array.from(document.querySelectorAll('.day-chip.chip-active')).map(c => parseInt(c.dataset.day)), 
        created: id ? meds.find(m => m.id == id).created : Date.now() 
    };

    if (id) { 
        const idx = meds.findIndex(m => m.id == id); 
        if(idx !== -1) meds[idx] = data; 
    } else { meds.push(data); }
    
    cancelEdit(); 
    update();
}
