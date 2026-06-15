const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Find the click handler block
const clickHandlerIdx = code.indexOf("if (sp.navigatorMenuEnabled && e.target === renderer.domElement)");
if (clickHandlerIdx === -1) {
    console.log("Click handler block not found");
    process.exit(1);
}

// Find getCuText definition
const getCuTextDefIdx = code.indexOf('const getCuText = (key) =>');
console.log(`getCuText defined at char: ${getCuTextDefIdx}`);
console.log(`Click handler at char: ${clickHandlerIdx}`);
console.log(`getCuText is BEFORE click handler: ${getCuTextDefIdx < clickHandlerIdx}`);

// Check if getCuText is in the same function scope (between the same enclosing braces)
// The click handler is inside addEventListener('mouseup', ...) => { ... }
// getCuText is defined inside the cuPanel setup block
// Find the outer function that contains both

// Find where the exported script's outer IIFE starts
const iifeStart = code.lastIndexOf('(function() {', clickHandlerIdx);
const iifeStart2 = code.lastIndexOf('(() => {', clickHandlerIdx);
const iifeActual = Math.max(iifeStart, iifeStart2);
console.log(`\nNearest IIFE before click handler: ${iifeActual}`);
console.log(`getCuText is inside same IIFE: ${getCuTextDefIdx > iifeActual}`);

// Check if getCuText is exposed on window somewhere
const windowGetCuText = code.indexOf('window.getCuText');
console.log(`\nwindow.getCuText exposed: ${windowGetCuText !== -1} (at ${windowGetCuText})`);
