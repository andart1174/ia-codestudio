const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

function findWord(query) {
    let idx = 0;
    while (true) {
        idx = code.indexOf(query, idx);
        if (idx === -1) break;
        const start = Math.max(0, idx - 50);
        const end = Math.min(code.length, idx + 100);
        console.log(`Found "${query}" at index ${idx}:`);
        console.log(code.substring(start, end));
        idx += query.length;
    }
}

findWord('ondes');
findWord('accueil');
findWord('horloge');
findWord('avanguardia');
