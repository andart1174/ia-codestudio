const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 11300 && index + 1 <= 12930) {
        if (line.includes('navigatorMenuEnabled')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
