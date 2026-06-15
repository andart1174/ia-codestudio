// scratch/temp_script_brace_counter.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'scratch', 'temp_script_1.js'), 'utf8');
const lines = src.split('\n');

const startLine = 10950;
const endLine = lines.length;

let depth = 0;
// First let's calculate depth from the beginning of the file up to startLine
for (let i = 0; i < startLine - 1; i++) {
    for (const ch of lines[i]) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
    }
}

console.log(`Initial depth at line ${startLine}: ${depth}`);

for (let i = startLine - 1; i < endLine; i++) {
    const line = lines[i];
    let opens = 0;
    let closes = 0;
    
    for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        if (ch === '{') {
            opens++;
            depth++;
        } else if (ch === '}') {
            closes++;
            depth--;
        }
    }
    
    console.log(`L${i+1} [depth=${depth}] (+${opens}, -${closes}): ${line.trimEnd().substring(0, 100)}`);
}
