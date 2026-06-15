const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

function findMatches(regex) {
    let match;
    console.log(`\nMatches for regex: ${regex}`);
    while ((match = regex.exec(code)) !== null) {
        console.log(`Found at index ${match.index}: "${match[0]}"`);
        console.log(`Context: ${code.substring(match.index - 50, match.index + 150)}`);
        break; // just print first match
    }
}

findMatches(/playTone/gi);
findMatches(/chime/gi);
findMatches(/AudioContext/gi);
findMatches(/clock-ultra/gi);
