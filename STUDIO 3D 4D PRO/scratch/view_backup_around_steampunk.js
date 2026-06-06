const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

const query = 'hasSteampunkPro';
const idx = code.indexOf(query);
if (idx !== -1) {
    const start = Math.max(0, code.lastIndexOf('\n', idx) - 1000);
    const end = Math.min(code.length, code.indexOf('\n', idx) + 3000);
    console.log(`Found ${query} at index ${idx}. Printing snippet:`);
    console.log(code.substring(start, end));
} else {
    console.log(`Could not find ${query} in backup.`);
}
