const fs = require('fs');
const activePath = 'js/sketch-extruder.js';
const code = fs.readFileSync(activePath, 'utf8');
const lines = code.split('\n');

console.log("Lines 10380 to 10550 of active file:");
for (let i = 10380; i <= 10550; i++) {
    if (lines[i - 1] !== undefined) {
        console.log(`${i}: ${lines[i - 1]}`);
    }
}
