const fs = require('fs');

const file1 = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const file2 = 'js/sketch-extruder.js';

const code1 = fs.readFileSync(file1, 'utf8');
const code2 = fs.readFileSync(file2, 'utf8');

const lines1 = code1.split('\n');
const lines2 = code2.split('\n');

const max = Math.max(lines1.length, lines2.length);

let inDiff = false;
let diffStart = 0;
let diffs = [];

for (let i = 0; i < max; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];
    if (l1 !== l2) {
        if (!inDiff) {
            inDiff = true;
            diffStart = i + 1;
        }
    } else {
        if (inDiff) {
            diffs.push({ start: diffStart, end: i });
            inDiff = false;
        }
    }
}
if (inDiff) {
    diffs.push({ start: diffStart, end: max });
}

console.log(`Total difference blocks: ${diffs.length}`);
diffs.forEach((d, idx) => {
    console.log(`Diff ${idx + 1}: Lines ${d.start} to ${d.end}`);
    // Print a brief snippet of active file
    const activeSnippet = lines2.slice(d.start - 1, d.start + 2).join(' | ').trim();
    const backupSnippet = lines1.slice(d.start - 1, d.start + 2).join(' | ').trim();
    console.log(`   Backup: ${backupSnippet.substring(0, 100)}`);
    console.log(`   Active: ${activeSnippet.substring(0, 100)}`);
});
