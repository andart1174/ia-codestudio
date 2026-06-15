const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (index + 1 >= 7561 && index + 1 <= 9074) {
        if (line.includes('RingGeometry') || line.includes('CircleGeometry') || line.includes('TorusGeometry') || line.includes('bezelMesh')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    }
});
