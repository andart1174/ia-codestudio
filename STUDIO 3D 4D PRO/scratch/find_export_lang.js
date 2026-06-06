const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 9800 && index + 1 <= 11200) {
        if (line.includes('cu-lang-select') || line.includes('lang-select') || line.includes('select id=')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
