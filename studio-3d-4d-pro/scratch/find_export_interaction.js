const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 9850 && index + 1 <= 10660) {
        if (line.includes('navigatorMenuEnabled') || line.includes('Raycaster') || line.includes('pointerup')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
