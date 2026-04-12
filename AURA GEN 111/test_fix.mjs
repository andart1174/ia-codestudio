import fs from 'fs';

const handleInject3D_Sim = (modelCode, currentCode) => {
    const origName = 'ExtraterrestreVivant';
    const embedName = 'ExtraterrestreVivantEmbed';
    const figEn = 'Living Alien';

    let componentDef = modelCode
        .replace(`const ${origName}`, `const ${embedName}`)
        .replace(/\bminHeight\s*:\s*['"]100vh['"]/g, "minHeight: '400px'")
        .replace(new RegExp(`\\nconst App\\s*=\\s*${origName};`), '');

    const block = `// -- 3D Embed: ${figEn} ------------------\n${componentDef}\n// ------------------------------------------`;
    const jsxTag = `<${embedName} />`;

    let newCode = currentCode;

    const appIdx = newCode.indexOf('const App');
    if (appIdx !== -1) {
        newCode = newCode.slice(0, appIdx) + block + '\n\n' + newCode.slice(appIdx);
    }

    const insertAt3DInApp = (code, tag) => {
        const appStart = code.lastIndexOf('const App');
        const appSlice = code.slice(appStart);

        const retInApp = appSlice.search(/return\s*\(|=>\s*\(/);
        const parenOpen = code.indexOf('(', appStart + retInApp);
        let depth = 0;
        let parenClose = -1;
        for (let i = parenOpen; i < code.length; i++) {
            if (code[i] === '(') depth++;
            else if (code[i] === ')') {
                depth--;
                if (depth === 0) { parenClose = i; break; }
            }
        }
        const innerJSX = code.slice(parenOpen + 1, parenClose).trim();
        const newReturn = `(\n    <>\n      ${innerJSX}\n      ${tag}\n    </>\n  )`;
        return code.slice(0, parenOpen) + newReturn + code.slice(parenClose + 1);
    };

    return insertAt3DInApp(newCode, jsxTag);
};

const modelCode = `const ExtraterrestreVivant=()=>{React.useEffect(()=>{},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'radial-gradient(ellipse,#0d2818,#0f172a)'}}>alien</div>);};`;
const appCode = `const App = () => {\n  return (\n    <div style={{ padding: "40px" }}>Hello</div>\n  );\n};`;

const result = handleInject3D_Sim(modelCode, appCode);
console.log(result);

// Check for the specific syntax error we found earlier
if (result.includes("center'background")) {
    console.error("FAIL: Syntax error found!");
} else {
    console.log("PASS: No syntax error detected in style object.");
}
