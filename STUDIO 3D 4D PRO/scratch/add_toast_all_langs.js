const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// The exact last lines of each language block (guaranteed unique strings)
const insertAfter = {
    fr: 'click_hint: "✨ Cliquez sur le cadran pour configurer"',
    ro: 'click_hint: "💬 Faceți click pe ceas pentru a configura"',
    de: 'click_hint: "💬 Klicken Sie auf die Uhr zum Konfigurieren"',
    es: 'click_hint: "💬 Haga clic en el reloj para configurar"',
    it: 'click_hint: "💬 Clicca sul quadrante per configurare"'
};

const toastLines = {
    fr: ',\n              section_toast: "Navigation vers la section : ",\n              dial_click_toast: "🕐 Heure {hour} cliquée — assigner une section dans les paramètres"',
    ro: ',\n              section_toast: "Navigare la secțiunea: ",\n              dial_click_toast: "🕐 Ora {hour} apăsată — atribuiți o secțiune în setări"',
    de: ',\n              section_toast: "Navigation zum Abschnitt: ",\n              dial_click_toast: "🕐 Stunde {hour} geklickt — Abschnitt in Einstellungen zuweisen"',
    es: ',\n              section_toast: "Navegando a la sección: ",\n              dial_click_toast: "🕐 Hora {hour} clicada — asignar una sección en la configuración"',
    it: ',\n              section_toast: "Navigazione alla sezione: ",\n              dial_click_toast: "🕐 Ora {hour} cliccata — assegna una sezione nelle impostazioni"'
};

let changed = 0;
for (const lang of ['fr', 'ro', 'de', 'es', 'it']) {
    const marker = insertAfter[lang];
    if (!code.includes(marker)) {
        console.log(`❌ ${lang}: marker not found: ${marker}`);
        continue;
    }
    const idx = code.indexOf(marker);
    const after = idx + marker.length;
    // Insert the toast lines right after the click_hint line
    code = code.substring(0, after) + toastLines[lang] + code.substring(after);
    console.log(`✅ ${lang}: inserted section_toast + dial_click_toast`);
    changed++;
}

if (changed > 0) {
    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log(`\nSaved ${changed} language(s) to js/sketch-extruder.js`);
} else {
    console.log('\nNo changes saved.');
}
