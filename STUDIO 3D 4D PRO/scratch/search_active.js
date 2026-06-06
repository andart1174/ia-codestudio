const fs = require('fs');
const activePath = 'js/sketch-extruder.js';
const code = fs.readFileSync(activePath, 'utf8');

function printAround(term, len = 600) {
    const idx = code.indexOf(term);
    if (idx !== -1) {
        console.log(`\n======================================================`);
        console.log(`Snippet around "${term}":`);
        console.log(`======================================================`);
        console.log(code.substring(idx - 100, idx + len));
    } else {
        console.log(`"${term}" not found in active file`);
    }
}

printAround('getCuPlaybackContext');
printAround('playTick');
printAround('playTone');
printAround('playWestminsterChime');
