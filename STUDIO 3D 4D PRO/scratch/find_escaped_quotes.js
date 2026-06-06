const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

const startStr = 'const code = `<!DOCTYPE html>';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf('</html>`;', startIdx) + 9;

const segment = code.substring(startIdx, endIdx);
let idx = 0;
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
    
    const lineNum = code.substring(0, startIdx + idx).split('\n').length;
    console.log(`Line ${lineNum}: Escaped quote \\' at index ${startIdx + idx} (backslash count: ${bsCount})`);
    count++;
    idx += 2;
}
console.log(`Total ${count} occurrences of \\'`);
