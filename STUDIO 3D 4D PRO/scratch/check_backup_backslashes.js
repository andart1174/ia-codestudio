const fs = require('fs');

const path = '../html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
if (fs.existsSync(path)) {
    const lines = fs.readFileSync(path, 'utf8').split('\n');
    let count = 0;
    lines.forEach((line, idx) => {
        if (line.includes('\\')) {
            count++;
            console.log(`Line ${idx + 1}: ${line.trim()}`);
        }
    });
    console.log('Total lines with backslash in backup:', count);
} else {
    console.log('Backup does not exist.');
}
