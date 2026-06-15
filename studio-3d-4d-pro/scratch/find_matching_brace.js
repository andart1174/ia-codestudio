// scratch/find_matching_brace.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'scratch', 'temp_script_1.js'), 'utf8');
const lines = src.split('\n');

const targetLine = 9129; // 1-indexed

let depth = 1; // we assume we are starting at the closing brace which has depth 1
let matchingLine = -1;

for (let i = targetLine - 2; i >= 0; i--) {
    const line = lines[i];
    for (let j = line.length - 1; j >= 0; j--) {
        const ch = line[j];
        if (ch === '}') depth++;
        else if (ch === '{') depth--;
        
        if (depth === 0) {
            matchingLine = i + 1;
            break;
        }
    }
    if (depth === 0) {
        break;
    }
}

console.log(`The closing brace at line ${targetLine} matches the opening brace at line ${matchingLine}`);
if (matchingLine !== -1) {
    console.log("Matching line content:", lines[matchingLine - 1].trim());
}
