const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.toLowerCase().includes('export') && (line.includes('navigatorMenuEnabled') || line.includes('function') || line.includes('zip') || line.includes('download') || line.includes('html'))) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
