const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');
let idx = 0;
while (true) {
    idx = code.indexOf('showChrono', idx);
    if (idx === -1) break;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineEnd = code.indexOf('\n', idx);
    const lineNum = code.substring(0, idx).split('\n').length;
    console.log(`Active Line ${lineNum}: ${code.substring(lineStart, lineEnd).trim()}`);
    idx += 10;
}
