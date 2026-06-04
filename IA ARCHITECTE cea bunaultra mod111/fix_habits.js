const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// We need to fix lines that have unbalanced quotes in string concatenations
// Find all lines in the habit_tracker and translator blocks

// Strategy: Find the habit_tracker block and replace the renderH function with a DOM-based version
let habitStart = -1, habitEnd = -1;
for (let i = 2090; i < 2200; i++) {
    if (!lines[i]) continue;
    if (lines[i].includes("'function renderH(){") || (lines[i].includes('renderH') && lines[i].includes('habits-grid'))) {
        habitStart = i;
    }
    if (habitStart > -1 && lines[i].includes("'renderH();'")) {
        habitEnd = i;
        break;
    }
}

console.log('habitStart:', habitStart, 'habitEnd:', habitEnd);

if (habitStart > -1 && habitEnd > -1) {
    // Replace the entire renderH and related JS with DOM-based construction
    const safeRenderH = `                + 'function renderH(){ var g=document.getElementById("habits-grid"); g.innerHTML=""; var total=0; _hdb.forEach(function(h,hi){ var done=h.log.filter(Boolean).length; total+=done; var card=document.createElement("div"); card.className="card"; card.style="display:flex;align-items:center;gap:15px;flex-wrap:wrap;"; var info=document.createElement("div"); info.style="flex:1;"; info.innerHTML="<div style=\\'font-weight:900;\\'>" +h.name+"</div><div style=\\'font-size:12px;opacity:0.5;\\'>" +done+"/7</div>"; var days=document.createElement("div"); days.style="display:flex;gap:6px;flex-wrap:wrap;"; _htDays.forEach(function(d,di){ var box=document.createElement("div"); box.style="width:36px;height:36px;border-radius:8px;background:" +(h.log[di]?"var(--primary)":"rgba(255,255,255,0.08)")+";display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;font-weight:700;transition:0.2s;"; box.textContent=d; box.onclick=(function(hhi,ddi){ return function(){ window.toggleD(hhi,ddi); }; })(hi,di); days.appendChild(box); }); var delBtn=document.createElement("button"); delBtn.style="background:#ef4444;padding:4px 10px;font-size:11px;"; delBtn.textContent="Del"; delBtn.onclick=(function(hhi){ return function(){ window.delH(hhi); }; })(hi); card.appendChild(info); card.appendChild(days); card.appendChild(delBtn); g.appendChild(card); }); document.getElementById("total-ct").innerText=total; document.getElementById("streak-ct").innerText=_hdb.length?Math.max.apply(null,_hdb.map(function(h){ return h.log.filter(Boolean).length; })):0; }'`;
    
    // Find the renderH line(s) and replace
    for (let i = habitStart; i <= habitEnd; i++) {
        if (lines[i] && (lines[i].includes("'function renderH(){") || lines[i].includes('habits-grid').innerHTML)) {
            // Find end of this function string
            let j = i;
            while (j <= habitEnd && !lines[j].includes("}).join(\"\"); document.getElementById('streak-ct')") && !lines[j].includes('):0; }\\'')) {
                j++;
            }
            // Replace lines i through j with our safe version
            lines.splice(i, j - i + 1, safeRenderH);
            console.log('Fixed renderH from line', i+1, 'to', j+1);
            break;
        }
    }
}

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Checking syntax...');

// Now run node --check
const { execSync } = require('child_process');
try {
    execSync('node --check "js/ia-ultra-engine.js"', { stdio: 'pipe' });
    console.log('✅ SYNTAX OK');
} catch(e) {
    const out = e.stderr ? e.stderr.toString() : e.stdout ? e.stdout.toString() : e.message;
    const lineMatch = out.match(/:(\d+)/);
    if (lineMatch) {
        const ln = parseInt(lineMatch[1]);
        console.log('❌ SYNTAX ERROR at line', ln);
        // Show context
        const lines2 = content.split('\n');
        for (let i = Math.max(0, ln-3); i < Math.min(lines2.length, ln+2); i++) {
            console.log((i+1) + ':', lines2[i].substring(0, 120));
        }
    } else {
        console.log('❌ SYNTAX ERROR:', out.substring(0, 500));
    }
}
