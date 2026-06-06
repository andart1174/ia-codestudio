const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Keys to add for each language — toast messages for nav menu
const toastKeys = {
    en: {
        section_toast: 'Navigating to section: ',
        dial_click_toast: '🕐 Hour {hour} clicked — assign a section in settings'
    },
    fr: {
        section_toast: 'Navigation vers la section : ',
        dial_click_toast: '🕐 Heure {hour} cliquée — assigner une section dans les paramètres'
    },
    ro: {
        section_toast: 'Navigare la secțiunea: ',
        dial_click_toast: '🕐 Ora {hour} apăsată — atribuiți o secțiune în setări'
    },
    de: {
        section_toast: 'Navigation zum Abschnitt: ',
        dial_click_toast: '🕐 Stunde {hour} geklickt — Abschnitt in Einstellungen zuweisen'
    },
    es: {
        section_toast: 'Navegando a la sección: ',
        dial_click_toast: '🕐 Hora {hour} clicada — asignar una sección en la configuración'
    },
    it: {
        section_toast: 'Navigazione alla sezione: ',
        dial_click_toast: '🕐 Ora {hour} cliccata — assegna una sezione nelle impostazioni'
    }
};

// For each language, insert after click_hint: "..."
const langMarkers = {
    en:  `click_hint: \"✨ Click on the clock to configure\"\n          },`,
    fr:  `click_hint: \"✨ Cliquez sur le cadran pour configurer\"\n          },`,
    ro:  `click_hint: \"💬 Faceți click pe ceas pentru a configura\"\n          },`,
    de:  `click_hint: \"💬 Klicken Sie auf die Uhr zum Konfigurieren\"\n          },`,
    es:  `click_hint: \"💬 Haga clic en el reloj para configurar\"\n          },`,
    it:  `click_hint: \"💬 Clicca sul quadrante per configurare\"\n          }`
};

// Replacements
const langReplacements = {
    en: `click_hint: \"✨ Click on the clock to configure\",\n              section_toast: \"Navigating to section: \",\n              dial_click_toast: \"🕐 Hour {hour} clicked — assign a section in settings\"\n          },`,
    fr: `click_hint: \"✨ Cliquez sur le cadran pour configurer\",\n              section_toast: \"Navigation vers la section : \",\n              dial_click_toast: \"🕐 Heure {hour} cliquée — assigner une section dans les paramètres\"\n          },`,
    ro: `click_hint: \"💬 Faceți click pe ceas pentru a configura\",\n              section_toast: \"Navigare la secțiunea: \",\n              dial_click_toast: \"🕐 Ora {hour} apăsată — atribuiți o secțiune în setări\"\n          },`,
    de: `click_hint: \"💬 Klicken Sie auf die Uhr zum Konfigurieren\",\n              section_toast: \"Navigation zum Abschnitt: \",\n              dial_click_toast: \"🕐 Stunde {hour} geklickt — Abschnitt in Einstellungen zuweisen\"\n          },`,
    es: `click_hint: \"💬 Haga clic en el reloj para configurar\",\n              section_toast: \"Navegando a la sección: \",\n              dial_click_toast: \"🕐 Hora {hour} clicada — asignar una sección en la configuración\"\n          },`,
    it: `click_hint: \"💬 Clicca sul quadrante per configurare\",\n              section_toast: \"Navigazione alla sezione: \",\n              dial_click_toast: \"🕐 Ora {hour} cliccata — assegna una sezione nelle impostazioni\"\n          }`
};

let changed = 0;
for (const lang of ['en', 'fr', 'ro', 'de', 'es', 'it']) {
    // Check if already has section_toast to avoid duplicating
    if (code.includes(`section_toast: "Navigat`)) {
        console.log(`${lang}: already has section_toast keys — no change needed`);
        continue;
    }
    const before = langMarkers[lang];
    const after = langReplacements[lang];
    if (code.includes(before)) {
        code = code.split(before).join(after);
        console.log(`✅ ${lang}: inserted section_toast and dial_click_toast`);
        changed++;
    } else {
        console.log(`❌ ${lang}: MARKER NOT FOUND: ${before.substring(0, 80)}`);
    }
}

if (changed > 0) {
    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log(`\nSaved ${changed} language(s) to js/sketch-extruder.js`);
} else {
    console.log('\nNo changes saved (either already done or markers not found).');
}
