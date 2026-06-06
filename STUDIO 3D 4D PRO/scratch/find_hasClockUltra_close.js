// scratch/find_hasClockUltra_close.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'sketch-extruder.js'), 'utf8');
const lines = src.split('\n');

const startLine = 10435; // 1-indexed

let depth = 0;
let closedLine = -1;

for (let i = startLine - 1; i < lines.length; i++) {
    const line = lines[i];
    for (const ch of line) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
    }
    if (depth < 0) {
        closedLine = i + 1;
        break;
    }
}

console.log(`if (hasClockUltra) { at line ${startLine} closes at line ${closedLine}`);
console.log("Context:");
if (closedLine !== -1) {
    for (let i = Math.max(1, closedLine - 5); i <= Math.min(lines.length, closedLine + 5); i++) {
        console.log(`L${i}: ${lines[i-1].trimEnd()}`);
    }
}
