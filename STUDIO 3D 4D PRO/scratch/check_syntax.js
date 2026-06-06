const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Let's find where the syntax error is by parsing or using a parser if available,
// or we can test sub-sections of the code.
// Since new Function(code) failed, we can write a simple tool to locate it.
try {
    new Function(code);
    console.log("No syntax error found in sketch-extruder.js");
} catch (e) {
    console.error("Syntax Error Message:", e.message);
    // Let's print the stack trace
    console.error(e.stack);
}
