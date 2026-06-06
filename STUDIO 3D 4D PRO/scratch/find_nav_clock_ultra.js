const fs = require('fs');
const content = fs.readFileSync('js/clock-ultra-3d.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('navigatorMenuEnabled') || line.includes('anchorMap') || line.includes('showNavSection')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
