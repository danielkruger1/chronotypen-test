

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

// --- START-PRÜFUNG ---
if (true) {
    document.getElementById('quiz-card').classList.remove('hidden');
    zeigeFrage();
} else {
    document.getElementById('access-denied').classList.remove('hidden');
}

// --- FUNKTIONEN ---
function zeigeFrage() {
    const frage = fragen[aktuelleFrageIndex];
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
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    let typ = gesamtPunkte <= 4 ? "Lerche" : (gesamtPunkte >= 8 ? "Eule" : "Taube");
    document.getElementById('typ-name').innerText = typ;

  
}
