const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// The whole exported script is one giant script tag
// getCuText is defined inside the exported <script> block
// The click handler is also inside the same <script> block
// But the click handler is in a mouseup event listener which runs LATER
// getCuText should be in scope because JS closures capture the outer scope

// Let's check the actual structure: are they in the same function/block?
// Find where the exported script starts (in the template string)
const scriptTagIdx = code.indexOf('<script>');
const allScriptTags = [];
let idx = 0;
while (true) {
    idx = code.indexOf('<script>', idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    allScriptTags.push({ idx, lineNum });
    idx += 8;
}
console.log(`Found ${allScriptTags.length} <script> tags at lines:`);
allScriptTags.forEach(t => console.log(`  Line ${t.lineNum}: char ${t.idx}`));

// Find the getCuText def line
const getCuTextIdx = code.indexOf('const getCuText = (key) =>');
const getCuTextLine = code.substring(0, getCuTextIdx).split('\n').length;
console.log(`\ngetCuText at line ${getCuTextLine} (char ${getCuTextIdx})`);

// Find which script tag getCuText is in
const getCuTextScript = allScriptTags.filter(t => t.idx < getCuTextIdx).pop();
console.log(`getCuText is in script starting at line ${getCuTextScript?.lineNum}`);

// Find the click handler line
const clickIdx = code.indexOf("if (sp.navigatorMenuEnabled && e.target === renderer.domElement)");
const clickLine = code.substring(0, clickIdx).split('\n').length;
console.log(`\nClick handler at line ${clickLine} (char ${clickIdx})`);
const clickScript = allScriptTags.filter(t => t.idx < clickIdx).pop();
console.log(`Click handler is in script starting at line ${clickScript?.lineNum}`);

console.log(`\nSame script block: ${getCuTextScript?.lineNum === clickScript?.lineNum}`);
