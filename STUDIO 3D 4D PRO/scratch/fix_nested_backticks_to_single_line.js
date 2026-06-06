const fs = require('fs');

const filePath = 'js/sketch-extruder.js';
let code = fs.readFileSync(filePath, 'utf8');

// Find the target block using a regex
const targetRegex = /\\?\$\{showChrono\s*\?\s*`[\s\S]*?`\s*:\s*''\}/;
const match = code.match(targetRegex);

if (match) {
    console.log("Found match in file!");
    console.log(match[0]);
    
    // Replace with single line single quoted string
    const replacement = `\\\${showChrono ? '<div style="margin-bottom:15px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);"><label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:6px;font-weight:bold;" data-key="stopwatch"></label><div style="display:flex;gap:6px;margin-bottom:6px;"><button id="cu-btn-chrono-start" style="flex:1;background:#0d1225;color:#818cf8;border:1px solid rgba(129,140,248,0.3);border-radius:6px;padding:6px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="start"></button><button id="cu-btn-chrono-reset" style="background:#18122b;color:#d8b4fe;border:1px solid #443c68;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="reset"></button></div></div>' : ''}`;
    
    code = code.replace(match[0], replacement);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log("Successfully replaced nested backticks block with a single-line single-quoted string!");
} else {
    console.log("Target block not found using regex. Trying literal search...");
    
    // Let's print around line 11659
    const lines = code.split('\n');
    let startIdx = -1;
    let endIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('showChrono ?')) {
            startIdx = i;
        }
        if (startIdx !== -1 && lines[i].includes(": ''}")) {
            endIdx = i;
            break;
        }
    }
    
    if (startIdx !== -1 && endIdx !== -1) {
        console.log(`Found lines ${startIdx + 1} to ${endIdx + 1}:`);
        const block = lines.slice(startIdx, endIdx + 1).join('\n');
        console.log(block);
        
        const replacement = `          \\\${showChrono ? '<div style="margin-bottom:15px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);"><label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:6px;font-weight:bold;" data-key="stopwatch"></label><div style="display:flex;gap:6px;margin-bottom:6px;"><button id="cu-btn-chrono-start" style="flex:1;background:#0d1225;color:#818cf8;border:1px solid rgba(129,140,248,0.3);border-radius:6px;padding:6px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="start"></button><button id="cu-btn-chrono-reset" style="background:#18122b;color:#d8b4fe;border:1px solid #443c68;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="reset"></button></div></div>' : ''}`;
        
        lines.splice(startIdx, endIdx - startIdx + 1, replacement);
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log("Successfully replaced literal block!");
    } else {
        console.log("Literal block not found.");
    }
}
