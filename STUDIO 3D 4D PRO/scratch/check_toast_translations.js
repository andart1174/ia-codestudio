const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find getCuText function
const query = 'const getCuText';
let idx = code.indexOf(query);
if (idx !== -1) {
    console.log("getCuText function:");
    console.log(code.substring(idx - 50, idx + 400));
}

// Find section_toast and dial_click_toast in translations
const q2 = 'section_toast';
idx = 0;
console.log('\n---All occurrences of section_toast---');
while (true) {
    idx = code.indexOf(q2, idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    console.log(`Line ${lineNum}: ${lineText}`);
    idx += q2.length;
}

const q3 = 'dial_click_toast';
idx = 0;
console.log('\n---All occurrences of dial_click_toast---');
while (true) {
    idx = code.indexOf(q3, idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    console.log(`Line ${lineNum}: ${lineText}`);
    idx += q3.length;
}
