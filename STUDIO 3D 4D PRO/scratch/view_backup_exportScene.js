const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

const query = 'function exportScene';
const idx = code.indexOf(query);
if (idx !== -1) {
    console.log(`Found "${query}" at index ${idx}.`);
    console.log(code.substring(idx - 100, idx + 800));
} else {
    console.log(`"${query}" not found in backup.`);
}
