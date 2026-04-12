const code = `const appStart = 1;`;
const insertAt3DInApp = (code, jsxTag) => {
    const appStart = code.lastIndexOf('const App');
    if (appStart === -1) return code + '\n' + jsxTag;

    const appSlice = code.slice(appStart);

    // Detect if App's return is already wrapped in Fragment
    const alreadyWrappedFragment = appSlice.includes('<React.Fragment>');
    const alreadyWrappedShorthand = appSlice.includes('<>');

    if (alreadyWrappedFragment) {
        // Just append before </React.Fragment>
        const fragCloseIdx = code.lastIndexOf('</React.Fragment>');
        if (fragCloseIdx === -1) return code + '\n' + jsxTag;
        return (
            code.slice(0, fragCloseIdx) +
            `    ${jsxTag}\n  ` +
            code.slice(fragCloseIdx)
        );
    }

    if (alreadyWrappedShorthand) {
        // Just append before </>
        const fragCloseIdx = code.lastIndexOf('</>');
        if (fragCloseIdx === -1) return code + '\n' + jsxTag;
        return (
            code.slice(0, fragCloseIdx) +
            `    ${jsxTag}\n  ` +
            code.slice(fragCloseIdx)
        );
    }

    // Not yet wrapped — find the return ( or => ( and wrap with Fragment
    const retInApp = appSlice.search(/return\s*\(|=>\s*\(/);
    if (retInApp === -1) return code + '\n' + jsxTag;

    const retStartGlobal = appStart + retInApp;
    // Find the opening ( after return or =>
    const parenOpen = code.indexOf('(', retStartGlobal);
    if (parenOpen === -1) return code + '\n' + jsxTag;

    // Find matching closing ) by counting parens from parenOpen
    let depth = 0;
    let parenClose = -1;
    for (let i = parenOpen; i < code.length; i++) {
        if (code[i] === '(') depth++;
        else if (code[i] === ')') {
            depth--;
            if (depth === 0) { parenClose = i; break; }
        }
    }
    if (parenClose === -1) return code + '\n' + jsxTag;

    // Extract the inner JSX of App's return
    const innerJSX = code.slice(parenOpen + 1, parenClose);

    // Build replacement: wrap in Fragment shorthand and append our tag
    const newReturn = `(\n  <>\n${innerJSX}\n    ${jsxTag}\n  </>\n)`;

    return (
        code.slice(0, parenOpen) +
        newReturn +
        code.slice(parenClose + 1)
    );
};

const defaultApp = `const App = () => {
    return (
        <div>
            Hello
        </div>
    );
};`;

console.log(insertAt3DInApp(defaultApp, '<Test />'));
