// scratch/fix_second_brace_error.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let src = fs.readFileSync(filePath, 'utf8');

const lines = src.split(/\r?\n/);
console.log("Original line 13512:", JSON.stringify(lines[13511])); // index 13511
console.log("Original line 13513:", JSON.stringify(lines[13512])); // index 13512

if (lines[13512].trim() === '}') {
    console.log("Found the second extra closing brace! Removing it...");
    lines.splice(13512, 1); // remove line 13513
    
    const hasCRLF = src.includes('\r\n');
    const newSrc = lines.join(hasCRLF ? '\r\n' : '\n');
    fs.writeFileSync(filePath, newSrc, 'utf8');
    console.log("Successfully removed the second extra brace!");
} else {
    console.log("Error: brace was not at the expected index!");
}
