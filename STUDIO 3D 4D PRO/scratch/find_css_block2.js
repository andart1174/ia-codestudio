const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find customStyle block
const idx1 = code.indexOf('customStyle.innerHTML');
console.log('customStyle.innerHTML at:', idx1);
if (idx1 !== -1) {
    const lineNum = code.substring(0, idx1).split('\n').length;
    console.log('Line:', lineNum);
    const blockStart = idx1;
    const blockEnd = idx1 + 3000;
    const chunk = code.substring(blockStart, blockEnd);
    console.log('CHUNK (first 500):', JSON.stringify(chunk.substring(0, 500)));
}
