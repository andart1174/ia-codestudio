const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Check how hasClockUltra is used in the exported script
const query = 'hasClockUltra';
let idx = 0;
const hits = [];
while (true) {
    idx = code.indexOf(query, idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    hits.push({ lineNum, lineText });
    idx += query.length;
}

console.log(`Found ${hits.length} occurrences of hasClockUltra:`);
hits.forEach(h => console.log(`  Line ${h.lineNum}: ${h.lineText}`));

// Also check how runtimeGroup is assigned
console.log('\n--- runtimeGroup assignments ---');
const rg = 'runtimeGroup';
idx = 0;
while (true) {
    idx = code.indexOf(rg, idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    console.log(`  Line ${lineNum}: ${lineText}`);
    idx += rg.length;
}
