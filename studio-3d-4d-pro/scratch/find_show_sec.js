const fs = require('fs');
const content = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('_showNavSection') || line.includes('_showBookSection')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
