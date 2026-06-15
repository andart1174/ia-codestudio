const fs = require('fs');
const content = fs.readFileSync('js/clock-ultra-3d.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('pointerdown') || line.includes('clickStartTime') || line.includes('Raycaster')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
