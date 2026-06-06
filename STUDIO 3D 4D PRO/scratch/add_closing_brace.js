// scratch/add_closing_brace.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let src = fs.readFileSync(filePath, 'utf8');

const lines = src.split(/\r?\n/);
// Let's find the line with resize listener close and </${'script'}>
let targetIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes("renderer.setSize(innerWidth,innerHeight);") &&
        lines[i + 1].includes("});") &&
        lines[i + 2].includes("</${'script'}></body></html>`;")) {
        targetIdx = i + 1; // the index of "});"
        break;
    }
}

if (targetIdx !== -1) {
    console.log(`Found target at line ${targetIdx + 1}: ${lines[targetIdx]}`);
    console.log("Inserting closing brace for hasClockUltra...");
    lines.splice(targetIdx + 1, 0, "  }"); // insert "  }" on the line after "});"
    
    const hasCRLF = src.includes('\r\n');
    const newSrc = lines.join(hasCRLF ? '\r\n' : '\n');
    fs.writeFileSync(filePath, newSrc, 'utf8');
    console.log("Successfully inserted the closing brace!");
} else {
    console.log("Error: could not find the target lines!");
    // Print the last 20 lines to inspect
    for (let i = lines.length - 20; i < lines.length; i++) {
        console.log(`L${i+1}: ${JSON.stringify(lines[i])}`);
    }
}
