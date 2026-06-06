// scratch/check_brace_depth_sp.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'scratch', 'temp_script_1.js'), 'utf8');
const lines = src.split('\n');

let depth = 0;
let spScopeLine = -1;
let spClosedLine = -1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("const sp = hasClockUltra.clockParts[0];")) {
        spScopeLine = i + 1;
        depth = 0; // let's track relative to this block
    }
    
    if (spScopeLine !== -1 && spClosedLine === -1) {
        for (const ch of line) {
            if (ch === '{') depth++;
            else if (ch === '}') depth--;
        }
        if (depth < 0) {
            spClosedLine = i + 1;
        }
    }
}

console.log(`const sp = hasClockUltra... is defined at line ${spScopeLine}`);
console.log(`relative depth drops below 0 (block closes) at line ${spClosedLine}`);
console.log("Context around closing line:");
if (spClosedLine !== -1) {
    for (let i = Math.max(1, spClosedLine - 5); i <= Math.min(lines.length, spClosedLine + 5); i++) {
        console.log(`L${i}: ${lines[i-1].trimEnd()}`);
    }
}
