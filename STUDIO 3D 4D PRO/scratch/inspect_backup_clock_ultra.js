const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

// Find all occurrences of clock-ultra
let idx = 0;
while (true) {
    idx = code.indexOf('clock-ultra', idx);
    if (idx === -1) break;
    console.log(`Found 'clock-ultra' at index ${idx}:`);
    console.log(code.substring(idx - 50, idx + 150));
    console.log("-----------------------------------------");
    idx += 11;
}
