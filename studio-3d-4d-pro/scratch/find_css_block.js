const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find the exact CSS block
const start = code.indexOf('body {\n                   margin: 0 !important;');
const end = code.indexOf("               }\\`;\n           document.head.appendChild(customStyle);");
console.log(`CSS block found: start=${start}, end=${end}`);
if (start !== -1 && end !== -1) {
    const block = code.substring(start, end + 3);
    console.log("BLOCK LENGTH:", block.length);
    console.log("FIRST 200 CHARS:", JSON.stringify(block.substring(0, 200)));
    console.log("LAST 200 CHARS:", JSON.stringify(block.substring(block.length - 200)));
}
