const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

console.log("Length of backup file:", code.length);
console.log("Last 2000 characters of backup file:");
console.log(code.substring(code.length - 2000));
