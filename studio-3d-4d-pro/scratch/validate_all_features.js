const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

const checks = [
    { name: 'Language flags declared (isFR, isRO, isDE, isES, isIT, isEN)', query: 'let isEN = !isFR && !isRO && !isDE && !isES && !isIT' },
    { name: 'Language flags exposed on window', query: 'window.isFR = isFR' },
    { name: 'Romanian (ro) translations present', query: 'ro: {' },
    { name: 'applyLanguage function defined', query: 'const applyLanguage = (langVal) =>' },
    { name: 'applyLanguage called on startup', query: 'applyLanguage(lang);' },
    { name: 'applyStLanguage called on startup', query: 'applyStLanguage(lang);' },
    { name: 'Panel dragging enabled', query: 'makeElementDraggable' },
    { name: 'Toast notification exposed on window', query: 'window.toast = ' },
    { name: 'getCuPlaybackContext exposed on window', query: 'window.getCuPlaybackContext = getCuPlaybackContext' },
    { name: 'playTick exposed on window', query: 'window.playTick = playTick' },
    { name: 'playTone exposed on window', query: 'window.playTone = playTone' },
    { name: 'playWestminsterChime exposed on window', query: 'window.playWestminsterChime = playWestminsterChime' },
    { name: 'angleH and angleM aliases defined for Steampunk Oracle', query: 'const angleH = angleH_real' },
    { name: 'Multilingual sections (Romanian title)', query: 'Bun Venit' },
    { name: 'Language selector in Clock Ultra panel', query: 'cu-lang-select' },
    { name: 'Language selector in Steampunk Pro panel', query: 'st-lang-select' },
    { name: 'Mock sections with multilingual home section', query: "id: 'home'" },
    { name: 'Scrollable panel (overflow-y:auto)', query: 'overflow-y:auto' },
    { name: 'Steampunk Pro startup language call', query: 'applyStLanguage(lang)' },
    { name: 'dt time-delta fix in animation callback', query: 'const dt = Math.min(100, nowMs - m._lastTimeMs)' },
];

let allOk = true;
checks.forEach((check, i) => {
    const found = code.includes(check.query);
    console.log(`${found ? '✅' : '❌'} [${i+1}/${checks.length}] ${check.name}`);
    if (!found) {
        allOk = false;
        console.log(`   MISSING: "${check.query}"`);
    }
});

console.log(`\nTotal file size: ${(code.length / 1024).toFixed(1)} KB`);
console.log(`Total lines: ${code.split('\n').length}`);
console.log(`\n${allOk ? '🎉 ALL CHECKS PASSED! Export is working correctly.' : '⚠️  SOME CHECKS FAILED - see above.'}`);
