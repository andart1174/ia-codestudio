// Test the injection logic
const robotAlias = `const RobotDansant = () => {
  return (<div style={{background:"#000",minHeight:"100vh"}}><div className="robot"></div></div>);
};
const App = RobotDansant;`;

// Simulate: convert alias -> proper App
let newCode = robotAlias;
const aliasMatch = newCode.match(/const App\s*=\s*([A-Z][A-Za-z0-9]+)\s*;/);
if (aliasMatch) {
    const aliasTarget = aliasMatch[1];
    newCode = newCode.replace(
        `const App = ${aliasTarget};`,
        `const App = () => (\n  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>\n    <${aliasTarget} />\n  </div>\n);`
    );
}

// Insert block before const App
const block = `// -- 3D Embed: Alien --\nconst ExtraterrestreVivantEmbed = () => (<div>Alien</div>);\n// ------------`;
const appIdx = newCode.indexOf('const App');
newCode = newCode.slice(0, appIdx) + block + '\n\n' + newCode.slice(appIdx);

console.log("--- After block insertion ---");
console.log(newCode);
console.log("\n--- Now running insertAt3DInApp ---");

// insertAt3DInApp logic
const jsxTag = '<ExtraterrestreVivantEmbed />';
const code = newCode;

const appStart = code.lastIndexOf('const App');
console.log('appStart:', appStart);
const appSlice = code.slice(appStart);
console.log('appSlice first 100 chars:', appSlice.slice(0, 100));

const alreadyWrapped = appSlice.includes('<React.Fragment>');
console.log('alreadyWrapped:', alreadyWrapped);

const retInApp = appSlice.search(/return\s*\(|=>\s*\(/);
console.log('retInApp offset:', retInApp);

const retStartGlobal = appStart + retInApp;
const parenOpen = code.indexOf('(', retStartGlobal);
console.log('parenOpen:', parenOpen, 'char:', code[parenOpen]);

// Count parens
let depth = 0;
let parenClose = -1;
for (let i = parenOpen; i < code.length; i++) {
    if (code[i] === '(') depth++;
    else if (code[i] === ')') {
        depth--;
        if (depth === 0) { parenClose = i; break; }
    }
}
console.log('parenClose:', parenClose);

const innerJSX = code.slice(parenOpen + 1, parenClose);
console.log('innerJSX:', innerJSX);

const newReturn = `(\n  <React.Fragment>\n${innerJSX}\n    ${jsxTag}\n  </React.Fragment>\n)`;
const result = code.slice(0, parenOpen) + newReturn + code.slice(parenClose + 1);

console.log('\n--- RESULT const App section ---');
console.log(result.slice(result.lastIndexOf('const App')));
