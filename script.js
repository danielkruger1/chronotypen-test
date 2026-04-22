// --- EINSTELLUNGEN ---
// Füge hier deine URL aus der Google Web-App Bereitstellung ein
const scriptURL = "https://script.google.com/macros/s/AKfycbwUxAnJkNGBkJrck4w-IlB0469Z_Rb5IHJEe9Ux7ZoWvIxpti40-fM4R-qrfdqz4Rbegw/exec";

const fragen = [
    { 
        q: "Wann bist du am produktivsten?", 
        a: [{t: "Morgens", p: 1}, {t: "Mittags", p: 2}, {t: "Abends", p: 3}] 
    },
    { 
        q: "Wie fühlst du dich direkt nach dem Aufstehen?", 
        a: [{t: "Fit wie ein Turnschuh", p: 1}, {t: "Brauche Kaffee", p: 2}, {t: "Bin ein Zombie", p: 3}] 
    },
    { 
        q: "Wann gehst du meistens schlafen?", 
        a: [{t: "Vor 22 Uhr", p: 1}, {t: "Gegen Mitternacht", p: 2}, {t: "Nach 2 Uhr", p: 3}] 
    }
];

let aktuelleFrageIndex = 0;
let gesamtPunkte = 0;

// --- DIREKTER START ---
// Da der Key entfernt wurde, blenden wir das Quiz sofort ein
document.getElementById('quiz-card').classList.remove('hidden');
zeigeFrage();

// --- FUNKTIONEN ---
function zeigeFrage() {
    const frage = fragen[aktuelleFrageIndex];
    
    // Fortschritt & Text aktualisieren
    document.getElementById('progress').innerText = `Frage ${aktuelleFrageIndex + 1} von ${fragen.length}`;
    document.getElementById('question-text').innerText = frage.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = ""; 
    
    frage.a.forEach(antwort => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = antwort.t;
        btn.onclick = () => waehleAntwort(antwort.p);
        container.appendChild(btn);
    });
}

function waehleAntwort(punkte) {
    gesamtPunkte += punkte;
    aktuelleFrageIndex++;

    if (aktuelleFrageIndex < fragen.length) {
        zeigeFrage();
    } else {
        beenden();
    }
}

function beenden() {
    // Quiz ausblenden, Ergebnis einblenden
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    // Typ bestimmen
    let typ = "";
    if (gesamtPunkte <= 4) typ = "Lerche";
    else if (gesamtPunkte >= 8) typ = "Eule";
    else typ = "Taube";

    document.getElementById('typ-name').innerText = typ;

    // Versand an Google Sheets (nur wenn URL eingetragen wurde)
    if (scriptURL !== "DEINE_GOOGLE_WEB_APP_URL_HIER_EINSETZEN") {
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ "typ": typ })
        }).catch(err => console.log("Fehler beim Senden:", err));
    }
}
