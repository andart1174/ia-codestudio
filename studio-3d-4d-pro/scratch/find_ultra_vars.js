const fs = require('fs');
const lines = fs.readFileSync('js/clock-ultra-3d.js', 'utf8').split('\n');
lines.forEach((l, i) => {
    if (l.includes('Enabled =') || l.includes('resetExclusives') || l.includes('syncProModel')) {
        console.log(`${i + 1}: ${l.trim()}`);
    }
});
