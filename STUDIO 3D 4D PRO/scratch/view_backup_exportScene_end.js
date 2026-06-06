const fs = require('fs');
const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(backupPath, 'utf8');

const query = 'function exportScene';
const idx = code.indexOf(query);
if (idx !== -1) {
    // Find where the next function starts or the closing brace of exportScene
    // Since exportScene is the last function in SketchExtruder before the return,
    // let's look for "return {" which is at the end of the IIFE
    const endQuery = 'return { init,';
    const endIdx = code.indexOf(endQuery);
    if (endIdx !== -1) {
        console.log(`exportScene starts at ${idx} and ends around ${endIdx}.`);
        console.log("Snippet at the end of exportScene:");
        console.log(code.substring(endIdx - 400, endIdx));
    }
}
