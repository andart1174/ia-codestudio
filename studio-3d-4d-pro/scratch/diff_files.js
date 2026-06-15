const fs = require('fs');

const file1 = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const file2 = 'js/sketch-extruder.js';

const lines1 = fs.readFileSync(file1, 'utf8').split('\n');
const lines2 = fs.readFileSync(file2, 'utf8').split('\n');

console.log(`File 1 (Backup) lines: ${lines1.length}`);
console.log(`File 2 (Active) lines: ${lines2.length}`);

// Compare line by line and find contiguous blocks of differences
let i = 0;
let diffBlocks = [];
let currentBlock = null;

const maxLines = Math.max(lines1.length, lines2.length);
for (let lineNum = 1; lineNum <= maxLines; lineNum++) {
    const l1 = lines1[lineNum - 1];
    const l2 = lines2[lineNum - 1];
    
    if (l1 !== l2) {
        if (!currentBlock) {
            currentBlock = { start: lineNum, lines1: [], lines2: [] };
        }
        if (l1 !== undefined) currentBlock.lines1.push(l1);
        if (l2 !== undefined) currentBlock.lines2.push(l2);
    } else {
        if (currentBlock) {
            diffBlocks.push(currentBlock);
            currentBlock = null;
        }
    }
}
if (currentBlock) diffBlocks.push(currentBlock);

console.log(`Found ${diffBlocks.length} difference blocks:`);
diffBlocks.forEach((block, idx) => {
    console.log(`\n------------------------------------------------------`);
    console.log(`BLOCK ${idx + 1}: Line ${block.start} (Backup lines: ${block.lines1.length}, Active lines: ${block.lines2.length})`);
    console.log(`------------------------------------------------------`);
    console.log(`--- Backup ---`);
    console.log(block.lines1.slice(0, 10).join('\n'));
    if (block.lines1.length > 10) console.log(`... and ${block.lines1.length - 10} more lines`);
    console.log(`--- Active ---`);
    console.log(block.lines2.slice(0, 10).join('\n'));
    if (block.lines2.length > 10) console.log(`... and ${block.lines2.length - 10} more lines`);
});
