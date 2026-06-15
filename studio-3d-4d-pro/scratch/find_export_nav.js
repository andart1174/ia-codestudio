const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('navigatorMenuEnabled') && index + 1 >= 9700 && index + 1 <= 11200) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
