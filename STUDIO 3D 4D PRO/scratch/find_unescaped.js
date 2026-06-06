const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8').split('\n');
code.forEach((l, i) => {
    // Look for ${sp.
    let idx = l.indexOf('${sp.');
    while (idx !== -1) {
        if (idx === 0 || l[idx - 1] !== '\\') {
            console.log(`${i + 1}: ${l.trim()}`);
        }
        idx = l.indexOf('${sp.', idx + 1);
    }
});
