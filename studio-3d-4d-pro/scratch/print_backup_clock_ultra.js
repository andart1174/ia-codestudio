const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

const idx = 534344;
console.log(code.substring(idx - 100, idx + 4000));
