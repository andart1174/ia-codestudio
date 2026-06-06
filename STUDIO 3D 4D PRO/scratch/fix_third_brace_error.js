// scratch/fix_third_brace_error.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let src = fs.readFileSync(filePath, 'utf8');

const lines = src.split(/\r?\n/);
console.log("Original line 11496:", JSON.stringify(lines[11495])); // index 11495
console.log("Original line 11497:", JSON.stringify(lines[11496])); // index 11496

if (lines[11496].trim() === '}') {
    console.log("Found the third extra closing brace! Removing it...");
    lines.splice(11496, 1); // remove line 11497
    
    const hasCRLF = src.includes('\r\n');
    const newSrc = lines.join(hasCRLF ? '\r\n' : '\n');
    fs.writeFileSync(filePath, newSrc, 'utf8');
    console.log("Successfully removed the third extra brace!");
} else {
    console.log("Error: brace was not at the expected index!");
}
