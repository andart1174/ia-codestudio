const simulateInjection = (currentCode, cursorPoint, modelCode) => {
    let newCode = currentCode;
    
    // 1) Alias conversion
    const aliasMatch = newCode.match(/const App\s*=\s*([A-Z][A-Za-z0-9]+)\s*;/);
    if (aliasMatch) {
         const aliasTarget = aliasMatch[1];
         newCode = newCode.replace(`const App = ${aliasTarget};`, `const App = () => (\n  <div style={{ display: 'flex' }}>\n    <${aliasTarget} />\n  </div>\n);`);
    }
    
    // 2) Define component before App
    const appIdx = newCode.indexOf('const App');
    const block = "// Model Code";
    const defText = block + '\n\n';
    let shift = 0;
    if (appIdx !== -1) {
        newCode = newCode.slice(0, appIdx) + defText + newCode.slice(appIdx);
        shift = defText.length;
    }
    
    // 3) Insert tag at cursor (simulated offset)
    const jsxTag = "<Model />";
    const adjustedOffset = cursorPoint + (cursorPoint >= (appIdx !== -1 ? appIdx : 0) ? shift : 0);
    newCode = newCode.slice(0, adjustedOffset) + jsxTag + newCode.slice(adjustedOffset);
    
    return newCode;
};

const app = `const App = () => {\n  return (\n    <div>[CURSOR_HERE]</div>\n  );\n};`;
const cursorLoc = app.indexOf('[CURSOR_HERE]');
const cleanedApp = app.replace('[CURSOR_HERE]', '');

const result = simulateInjection(cleanedApp, cursorLoc, "const Model = () => {};");
console.log(result);

if (result.includes("<div><Model /></div>")) {
    console.log("PASS: Cursor injection successful!");
} else {
    console.error("FAIL: Tag not at cursor.");
}
