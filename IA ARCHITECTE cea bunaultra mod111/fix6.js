const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

const FIXES = {
    // Key: partial unique content to identify the line
    // Value: full replacement line
};

// Fix 1: Translator phrase-btns (line ~2168) - old innerHTML version still there
for (let i = 2160; i < 2175; i++) {
    if (lines[i] && lines[i].includes('phrase-btns') && lines[i].includes('doTranslate') && lines[i].includes("onclick=\\'document")) {
        lines[i] = `                + 'var pb=document.getElementById("phrase-btns"); pb.innerHTML=""; ["Hello","Thank you","Please","Yes","No","Good morning"].forEach(function(ph){ var b=document.createElement("button"); b.style.cssText="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;transition:0.2s;"; b.textContent=ph; b.onclick=function(){ document.getElementById("tr-input").value=ph; doTranslate(); }; pb.appendChild(b); });';`;
        console.log('Fixed phrase-btns at line', i+1);
        break;
    }
}

// Fix 2: Podcast bodyHTML - S'abonner has unescaped apostrophe (line ~2170)
for (let i = 2165; i < 2180; i++) {
    if (lines[i] && lines[i].includes("podcast") && lines[i].includes("bodyHTML") && lines[i].includes("S'abonner")) {
        lines[i] = lines[i].replace(/S'abonner/g, "S\\u2019abonner");
        console.log('Fixed podcast S apostrophe at line', i+1);
    }
    if (lines[i] && lines[i].includes("S'abonner")) {
        lines[i] = lines[i].replace(/S'abonner/g, "S\\u2019abonner");
        console.log('Fixed S apostrophe at line', i+1);
    }
}

// Fix 3: Any remaining onclick=\\'...()' style= patterns -- replace with data attribute approach
// These happen when innerHTML strings have onclick with args that contain closing ')
for (let i = 2069; i < lines.length - 50; i++) {
    const l = lines[i];
    if (!l) continue;
    
    // Pattern: "+ 'function ...innerHTML=...map(function...onClick=\\'funcname("+var+")' style=" 
    // The ")' style=" is the bug - the ' closes the outer JS string
    // We already fixed renderGal and renderCal - check for others
    
    if (l.includes("onclick=\\'") && (l.includes(")\\\\' style=") || l.includes(")' style="))) {
        // Check which function this is
        if (!l.includes('renderGal') && !l.includes('renderCal') && !l.includes('renderH')) {
            console.log('Still broken onclick at line', i+1, ':', l.substring(0, 120));
        }
    }
}

const content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved. Checking...');

const { execSync } = require('child_process');
try {
    execSync('node --check "js/ia-ultra-engine.js"');
    console.log('SYNTAX OK!');
} catch(e) {
    const out = (e.stderr||Buffer.alloc(0)).toString() + (e.stdout||Buffer.alloc(0)).toString();
    const m = out.match(/:(\d+)\n/);
    if (m) {
        const ln = parseInt(m[1]);
        console.log('ERROR at line', ln);
        const lns = content.split('\n');
        for (let i2 = Math.max(0,ln-2); i2 < Math.min(lns.length,ln+2); i2++) {
            console.log((i2+1)+':', lns[i2].substring(0,250));
        }
    } else {
        // Try another pattern
        const m2 = out.match(/engine\.js:(\d+)/);
        if (m2) {
            const ln = parseInt(m2[1]);
            console.log('ERROR at line', ln);
            const lns = content.split('\n');
            for (let i2 = Math.max(0,ln-2); i2 < Math.min(lns.length,ln+2); i2++) {
                console.log((i2+1)+':', lns[i2].substring(0,250));
            }
        } else {
            console.log('Raw error:', out.substring(0, 400));
        }
    }
}
