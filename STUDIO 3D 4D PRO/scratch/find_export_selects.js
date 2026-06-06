const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 9846 && index + 1 <= 10600) {
        if (line.includes('<select') || line.includes('lang-select') || line.includes('option value=')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
