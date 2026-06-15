const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find the raycaster click handler for navigation menu
const query = 'navigatorMenuEnabled';
let idx = 0;
while (true) {
    idx = code.indexOf(query, idx);
    if (idx === -1) break;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    console.log(`Line ${lineNum}: ${lineText}`);
    idx += query.length;
}
