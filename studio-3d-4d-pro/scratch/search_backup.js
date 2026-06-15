const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

function printAround(term, len = 500) {
    const idx = code.indexOf(term);
    if (idx !== -1) {
        console.log(`\n======================================================`);
        console.log(`Snippet around "${term}":`);
        console.log(`======================================================`);
        console.log(code.substring(idx - 100, idx + len));
    } else {
        console.log(`"${term}" not found`);
    }
}

printAround('getCuPlaybackContext');
printAround('playTick');
printAround('playTone');
printAround('playWestminsterChime');
