const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('translations =') || line.includes('const translations')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
