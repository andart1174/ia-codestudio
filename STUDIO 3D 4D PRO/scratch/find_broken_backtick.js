const fs = require('fs');
const code = fs.readFileSync('scratch/sketch-extruder-fixed.js', 'utf8');
const lines = code.split('\n');

// Print line 11658 to 11668 with character representation
for (let i = 11658; i <= 11668; i++) {
    const line = lines[i - 1];
    console.log(`\nLine ${i}: length ${line.length}`);
    console.log(`Text: ${line}`);
    let representation = '';
    for (let j = 0; j < line.length; j++) {
        representation += `${line[j]}[${line.charCodeAt(j)}] `;
    }
    console.log(`Chars: ${representation}`);
}
