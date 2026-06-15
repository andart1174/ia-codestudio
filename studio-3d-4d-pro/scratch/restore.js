const fs = require('fs');

const filePath = 'js/sketch-extruder.js';
let content = fs.readFileSync(filePath, 'utf8');

// The split index between inside-template and outside-template (editor) code is 814924
const splitIdx = 814924;
let inside = content.substring(0, splitIdx);
let outside = content.substring(splitIdx);

console.log("Splitting at index:", splitIdx);

// --- INSIDE CODE CORRECTIONS ---
// 1. Escape starts of ui.innerHTML (ST and CU)
inside = inside.replace(/(?<!\\)ui\.innerHTML\s*=\s*`/g, 'ui.innerHTML = \\`');
// 2. Escape starts of styleTag.innerHTML (ST and CU)
inside = inside.replace(/(?<!\\)styleTag\.innerHTML\s*=\s*`/g, 'styleTag.innerHTML = \\`');
// 3. Escape starts of customStyle.innerHTML (ST and CU)
inside = inside.replace(/(?<!\\)customStyle\.innerHTML\s*=\s*`/g, 'customStyle.innerHTML = \\`');
// 4. Escape starts of _teamOverlay.innerHTML
inside = inside.replace(/(?<!\\)_teamOverlay\.innerHTML\s*=\s*`/g, '_teamOverlay.innerHTML = \\`');

// Escape ends in inside code:
inside = inside.replace(/(?<!\\)`\s*;\s*document\.body\.appendChild\(ui\);/g, '\\`;\r\n      document.body.appendChild(ui);');
inside = inside.replace(/(?<!\\)`\s*;\s*document\.head\.appendChild\(styleTag\);/g, '\\`;\r\n      document.head.appendChild(styleTag);');
inside = inside.replace(/(?<!\\)`\s*;\s*document\.head\.appendChild\(customStyle\);/g, '\\`;\r\n          document.head.appendChild(customStyle);');
inside = inside.replace(/(?<!\\)`\s*;\s*document\.body\.appendChild\(customStyle\);/g, '\\`;\r\n          document.body.appendChild(customStyle);');
inside = inside.replace(/(?<!\\)`\s*;\s*document\.body\.appendChild\(_teamOverlay\);/g, '\\`;\r\n          document.body.appendChild(_teamOverlay);');

// Escape all ${} in the inside CU ui.innerHTML block
const startKey = 'ui.innerHTML = \\`';
// Find the second occurrence of startKey in inside
let occurrences = [];
let idx = -1;
while ((idx = inside.indexOf(startKey, idx + 1)) !== -1) {
    occurrences.push(idx);
}
if (occurrences.length >= 2) {
    const cuStartIdx = occurrences[1];
    const rest = inside.substring(cuStartIdx);
    const endMatch = rest.match(/\\`;\s*document\.body\.appendChild\(ui\);/);
    if (endMatch) {
        const cuEndIdx = cuStartIdx + endMatch.index;
        const header = inside.substring(0, cuStartIdx + startKey.length);
        const middle = inside.substring(cuStartIdx + startKey.length, cuEndIdx);
        const footer = inside.substring(cuEndIdx);
        
        // Escape all unescaped ${ in middle
        const escapedMiddle = middle.replace(/(?<!\\)\$\{/g, '\\${');
        inside = header + escapedMiddle + footer;
        console.log("Successfully escaped variables in inside CU ui.innerHTML!");
    }
}


// --- OUTSIDE CODE CORRECTIONS ---
// Remove all backslashes before backticks and ${} in outside code:
// customStyle.innerHTML = \` -> customStyle.innerHTML = `
outside = outside.replace(/customStyle\.innerHTML\s*=\s*\\`/g, 'customStyle.innerHTML = `');
outside = outside.replace(/\\`;\s*document\.head\.appendChild\(customStyle\);/g, '`;\r\n          document.head.appendChild(customStyle);');
outside = outside.replace(/\\`;\s*document\.body\.appendChild\(customStyle\);/g, '`;\r\n          document.body.appendChild(customStyle);');

// _bookOverlay.innerHTML = \` -> _bookOverlay.innerHTML = `
outside = outside.replace(/_bookOverlay\.innerHTML\s*=\s*\\`/g, '_bookOverlay.innerHTML = `');
outside = outside.replace(/\\`;\s*document\.body\.appendChild\(_bookOverlay\);/g, '`;\r\n    document.body.appendChild(_bookOverlay);');

// Re-assemble and write
fs.writeFileSync(filePath, inside + outside, 'utf8');
console.log("Successfully restored escaping split boundaries!");
