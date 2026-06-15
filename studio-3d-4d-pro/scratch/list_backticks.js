const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve('js/sketch-extruder.js'), 'utf8');
const lines = content.split('\n');

for (let i = 9670; i < 11380; i++) {
    const line = lines[i];
    if (line && line.includes('`')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
}
