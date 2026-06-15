const fs = require('fs');
const code = fs.readFileSync('scratch/sketch-extruder-fixed.js', 'utf8');
const lines = code.split('\n');
for (let i = 11650; i <= 11675; i++) {
    if (lines[i - 1] !== undefined) {
        console.log(`${i}: ${lines[i - 1]}`);
    }
}
