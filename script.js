// --- EINSTELLUNGEN ---
const scriptURL = "https://script.google.com/macros/s/AKfycbwUxAnJkNGBkJrck4w-IlB0469Z_Rb5IHJEe9Ux7ZoWvIxpti40-fM4R-qrfdqz4Rbegw/exec";

const fragen = [
    { 
        q: "Wie stark bist Du von deinem Wecker abhängig, wenn Du morgens zu einer bestimmten Zeit aufstehen musst?",
        a: [{t: "Überhaupt nicht abhängig", p: 4}, {t: "Etwas abhängig", p: 3}, {t: "Ziemlich abhängig", p: 2}, {t: "Sehr abhängig", p: 1}] 
    },
    { 
        q: "Wie leicht fällt es Dir üblicherweise morgens aufzustehen?", 
        a: [{t: "Überhaupt nicht leicht", p: 1}, {t: "Nicht sehr leicht", p: 2}, {t: "Ziemlich leicht", p: 3}, {t: "Sehr leicht", p: 4}] 
    },
    { 
        q: "Wie wach fühlst Du dich morgens in der ersten halben Stunde nach dem Aufwachen?", 
        a: [{t: "Überhaupt nicht wach", p: 1}, {t: "Ein bisschen wach", p: 2}, {t: "Ziemlich wach", p: 3}, {t: "Sehr wach", p: 4}] 
    },
    { 
        q: "Wie ist Dein Appetit in der ersten halben Stunde nach dem Aufwachen?", 
        a: [{t: "Sehr gering", p: 1}, {t: "Ziemlich gering", p: 2}, {t: "Ziemlich gut", p: 3}, {t: "Sehr gut", p: 4}] 
    },
    { 
        q: " In einer Nacht musst Du für eine Nachtwache zwischen 4 und 6 Uhr wach sein. Am darauffolgenden Tag hast du keine weiteren Verpflichtungen. Welche der nachfolgenden Alternativen sagt Dir am ehesten zu?", 
        a: [{t: "Ich werde erst nach der Nachtwache zu Bett zu gehen", p: 1}, {t: "Ich werde vorher ein Nickerchen machen und nach der Nachtwache schlafen", p: 2}, {t: "Ich werde vorher richtig schlafen und hinterher noch ein Nickerchen machen", p: 3}, {t: "Ich werde nur vorher schlafen", p: 4}] 
    },
    { 
        q: "Wenn Du am folgenden Tag keinerlei Verpflichtungen hast, wann gehst Du dann - verglichen mit Deiner üblichen Schlafenszeit – zu Bett?", 
        a: [{t: "Selten oder nie später", p: 4}, {t: "Weniger als eine Stunde später", p: 3}, {t: "1-2 Stunden später", p: 2}, {t: "Mehr als 2 Stunden später", p: 1}] 
    },
    { 
        q: "Wenn Du um 23 Uhr zu Bett gehen solltest, wie müde wärst Du dann?", 
        a: [{t: "Überhaupt nicht müde", p: 0}, {t: "Etwas müde", p: 2}, {t: "Ziemlich müde", p: 3}, {t: "Sehr müde", p: 5}] 
    },
    { 
        q: "Du musst zwei Stunden körperlich schwer arbeiten. Wenn es nur nach Deinem Wohlbefinden ginge, welche der folgenden Zeiten würdest Du wählen?", 
        a: [{t: "8-10 Uhr", p: 4}, {t: "11-13 Uhr", p: 3}, {t: "15-17 Uhr", p: 2}, {t: "19-21 Uhr", p: 1}] 
    }
];

let aktuelleFrageIndex = 0;
let gesamtPunkte = 0;

// --- DIREKTER START ---
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
    if (gesamtPunkte <= 16) typ = "Lerche";
    else if (gesamtPunkte >= 23) typ = "Eule";
    else typ = "Mischtyp";

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
