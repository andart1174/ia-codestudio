const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const query = 'applyLanguage(';
let idx = 0;
while (true) {
    idx = code.indexOf(query, idx);
    if (idx === -1) break;
    const start = Math.max(0, idx - 100);
    const end = Math.min(code.length, idx + 200);
    console.log(`Found "${query}" at index ${idx}:`);
    console.log(code.substring(start, end));
    console.log("-----------------------------------------");
    idx += query.length;
}
