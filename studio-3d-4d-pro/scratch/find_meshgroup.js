const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 7800 && index + 1 <= 8000) {
        if (line.includes('meshGroup.add') || line.includes('return meshGroup')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
