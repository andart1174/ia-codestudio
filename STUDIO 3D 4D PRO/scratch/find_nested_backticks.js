const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

const startStr = 'const code = `<!DOCTYPE html>';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf('</html>`;', startIdx) + 9;

const segment = code.substring(startIdx, endIdx);
let idx = 0;
while (true) {
    idx = segment.indexOf('${', idx);
    if (idx === -1) break;
    const endIdxOfInterp = segment.indexOf('}', idx);
    if (endIdxOfInterp === -1) {
        idx += 2;
        continue;
    }
    const content = segment.substring(idx + 2, endIdxOfInterp);
    if (content.includes('`')) {
        const lineNum = code.substring(0, startIdx + idx).split('\n').length;
        console.log(`Line ${lineNum}: Interpolation has nested backticks!`);
        console.log(`Content: ${content}`);
    }
    idx = endIdxOfInterp + 1;
}
