const fs = require('fs');

const filePath = 'js/sketch-extruder.js';
let code = fs.readFileSync(filePath, 'utf8');

const startStr = 'const code = `<!DOCTYPE html>';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf('</html>`;', startIdx) + 9;

let segment = code.substring(startIdx, endIdx);
let idx = 0;
let newSegment = '';
let lastIdx = 0;
let count = 0;

while (true) {
    idx = segment.indexOf("\\'", idx);
    if (idx === -1) break;
    
    // Check if it is preceded by another backslash
    let bsCount = 0;
    let p = idx;
    while (p >= 0 && segment[p] === '\\') {
        bsCount++;
        p--;
    }
    
    if (bsCount === 1) {
        // Only one backslash: we escape it to double backslash!
        // We replace \\' with \\\\'
        newSegment += segment.substring(lastIdx, idx) + "\\\\'";
        lastIdx = idx + 2;
        count++;
    }
    
    idx += 2;
}
newSegment += segment.substring(lastIdx);

code = code.substring(0, startIdx) + newSegment + code.substring(endIdx);
fs.writeFileSync(filePath, code, 'utf8');
console.log(`Successfully fixed ${count} escaped quotes to double backslashes in js/sketch-extruder.js!`);
