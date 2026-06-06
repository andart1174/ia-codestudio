const fs = require('fs');
const f = fs.readFileSync('scratch/step_1452_raw_chunks.txt', 'utf8');
const pos = 2048;
const start = Math.max(0, pos - 40);
const end = Math.min(f.length, pos + 40);
console.log("Substring:");
console.log(JSON.stringify(f.substring(start, end)));
console.log("Char codes:");
for (let i = start; i < end; i++) {
    console.log(`i=${i}: char=${JSON.stringify(f[i])} code=${f.charCodeAt(i)}`);
}
