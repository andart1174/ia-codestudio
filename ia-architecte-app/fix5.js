const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let content = fs.readFileSync(filePath, 'utf8');

// Target: line 2168 - the phrase-btns translator issue
// Replace with DOM-based version
const lines = content.split('\n');
for (let i = 2160; i < 2175; i++) {
    if (lines[i] && lines[i].includes('phrase-btns') && lines[i].includes('onclick') && lines[i].includes('tr-input')) {
        console.log('Found translator phrase-btns at line', i+1);
        lines[i] = `                + 'var _phrases=["Hello","Thank you","Please","Yes","No","Good morning"]; var pbCont=document.getElementById("phrase-btns"); pbCont.innerHTML=""; _phrases.forEach(function(ph){ var btn=document.createElement("button"); btn.style.cssText="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;"; btn.textContent=ph; btn.onclick=function(){ document.getElementById("tr-input").value=ph; doTranslate(); }; pbCont.appendChild(btn); });'`;
        console.log('Fixed translator phrase-btns at line', i+1);
        break;
    }
}

// Also check for and fix any remaining lines with )' style=\' patterns  
let anyFixed = true;
let iterations = 0;
while (anyFixed && iterations < 20) {
    anyFixed = false;
    iterations++;
    
    const { execSync } = require('child_process');
    let errorLine = -1;
    try {
        execSync('node --check "js/ia-ultra-engine.js"');
        break; // success!
    } catch(e) {
        const out = (e.stderr||Buffer.alloc(0)).toString() + (e.stdout||Buffer.alloc(0)).toString();
        const m = out.match(/:(\d+)/);
        if (!m) break;
        errorLine = parseInt(m[1]) - 1; // 0-indexed
        
        const lines2 = content.split('\n');  
        const badLine = lines2[errorLine];
        console.log('Error at line', errorLine+1, ':', badLine ? badLine.substring(0, 120) : 'MISSING');
        
        if (!badLine) break;
        
        // Try to auto-fix by detecting the pattern and replacing with DOM construction
        // The issue is always 'inner content with onclick=\'X(y)\' style=\'' closing the JS string
        if (badLine.includes("onclick=\\'") && badLine.includes("' style=")) {
            // This is a complex innerHTML build. Replace the whole line with a placeholder comment
            // and note which lines need manual fixing
            console.log('Cannot auto-fix complex innerHTML line. Need manual DOM refactor.');
            break;
        }
        break;
    }
}

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved.');

const { execSync } = require('child_process');
try {
    execSync('node --check "js/ia-ultra-engine.js"');
    console.log('SYNTAX OK!');
} catch(e) {
    const out = (e.stderr||Buffer.alloc(0)).toString() + (e.stdout||Buffer.alloc(0)).toString();
    const m = out.match(/:(\d+)/);
    if (m) {
        const ln = parseInt(m[1]);
        console.log('STILL ERROR at line', ln);
        const lns = content.split('\n');
        for (let i2 = Math.max(0,ln-2); i2 < Math.min(lns.length,ln+1); i2++) {
            console.log((i2+1)+':', lns[i2].substring(0,250));
        }
    }
}
