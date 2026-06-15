const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

const query = 'function exportScene';
const idx = code.indexOf(query);
if (idx !== -1) {
    const searchStr = 'code-editor';
    let searchIdx = code.indexOf(searchStr, idx);
    while (searchIdx !== -1) {
        console.log(`Found "${searchStr}" at index ${searchIdx}:`);
        console.log(code.substring(searchIdx - 200, searchIdx + 200));
        console.log("-----------------------------------------");
        searchIdx = code.indexOf(searchStr, searchIdx + 1);
    }
}
