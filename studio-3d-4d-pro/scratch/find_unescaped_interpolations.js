const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find all occurrences of ${ in the code
let idx = 0;
let count = 0;
while (true) {
    idx = code.indexOf('${', idx);
    if (idx === -1) break;
    
    // Check if it is escaped (i.e. preceded by a backslash)
    let isEscaped = false;
    if (idx > 0 && code[idx - 1] === '\\') {
        // Count consecutive backslashes to see if it is truly escaped
        let bsCount = 0;
        let p = idx - 1;
        while (p >= 0 && code[p] === '\\') {
            bsCount++;
            p--;
        }
        if (bsCount % 2 === 1) {
            isEscaped = true;
        }
    }
    
    // Let's print the line and whether it is escaped
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineEnd = code.indexOf('\n', idx);
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineText = code.substring(lineStart, lineEnd).trim();
    
    console.log(`Line ${lineNum}: ${isEscaped ? 'ESCAPED' : 'UNESCAPED'} | ${lineText}`);
    count++;
    idx += 2;
}
console.log(`Total ${count} occurrences of \${`);
