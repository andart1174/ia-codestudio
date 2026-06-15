const fs = require('fs');

const path = 'js/sketch-extruder.js';
const lines = fs.readFileSync(path, 'utf8').split('\n');

// Line 10261 is index 10260 (0-indexed)
console.log('Original line 10261:', lines[10260]);
if (lines[10260].includes('`')) {
    lines[10260] = lines[10260].replace('`', '\\`');
    console.log('Updated line 10261:', lines[10260]);
}

// Line 11596 is index 11595 (0-indexed)
console.log('Original line 11596:', lines[11595]);
if (lines[11595].includes('`')) {
    lines[11595] = lines[11595].replace('`', '\\`');
    console.log('Updated line 11596:', lines[11595]);
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Line-based replacements completed.');
