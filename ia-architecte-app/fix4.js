const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// We'll fix ALL problematic lines in the new app types (lines 2069+)
// by replacing any line that has onclick=\\'...()' style= pattern
// with a DOM-based version.
//
// Strategy: build a complete replacement for each affected scriptJS line

function fixLine(line) {
    if (!line.includes("onclick=\\'") && !line.includes(")\\\\' style")) return line;
    
    // Check if this line contains the renderGal function
    if (line.includes('renderGal') && line.includes('gallery-grid')) {
        return `                + 'function renderGal(){ var g=document.getElementById("gallery-grid"); g.innerHTML=""; var items=(_gcat==="All"?_gdata:_gdata.filter(function(x){ return x.c===_gcat; })); items.forEach(function(x,i){ var d=document.createElement("div"); d.style.cssText="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;cursor:pointer;transition:0.3s;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:80px;"; d.textContent=x.e; d.onclick=(function(ii){ return function(){ window.openLB(ii); }; })(i); g.appendChild(d); }); window._filtered=items; }'`;
    }
    
    // Check if this line contains the renderCal function with quickAdd onclick
    if (line.includes('quickAdd') && line.includes('onclick') && line.includes("cal-grid")) {
        return `                + 'function renderCal(){ var y=_calDate.getFullYear(),m=_calDate.getMonth(); document.getElementById("cal-title").innerText=_calMonths[m]+" "+y; var first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(); var g=document.getElementById("cal-grid"); g.innerHTML=""; for(var i=0;i<first;i++){ g.appendChild(document.createElement("div")); } for(var d2=1;d2<=days;d2++){ var ds=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d2).padStart(2,"0"); var evs=_calEvs.filter(function(e){ return e.date===ds; }); var cell=document.createElement("div"); cell.style.cssText="border-radius:8px;background:rgba(255,255,255,0.04);padding:6px;min-height:50px;cursor:pointer;border:1px solid rgba(255,255,255,0.05);transition:0.2s;"; cell.innerHTML="<div style,font-size:12px;font-weight:700;margin-bottom:3px>" +d2+"</div>" +evs.map(function(e){ return "<div style,font-size:9px;background:#8b5cf622;color:#a78bfa;padding:2px 4px;border-radius:3px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap>" +e.t+"</div>"; }).join(""); cell.onclick=(function(dds){ return function(){ window.quickAdd(dds); }; })(ds); g.appendChild(cell); } renderEvList(); }'`;
    }
    
    return line;
}

let fixes = 0;
for (let i = 2068; i < lines.length - 50; i++) {
    const fixed = fixLine(lines[i]);
    if (fixed !== lines[i]) {
        console.log('Fixed line', i+1);
        lines[i] = fixed;
        fixes++;
    }
}

console.log(fixes, 'lines fixed');

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');

const { execSync } = require('child_process');
try {
    execSync('node --check "js/ia-ultra-engine.js"');
    console.log('SYNTAX OK');
} catch(e) {
    const out = (e.stderr||Buffer.alloc(0)).toString() + (e.stdout||Buffer.alloc(0)).toString();
    const m = out.match(/:(\d+)/);
    if (m) {
        const ln = parseInt(m[1]);
        console.log('ERROR at line', ln);
        const lns = content.split('\n');
        for (let i2 = Math.max(0,ln-2); i2 < Math.min(lns.length,ln+1); i2++) {
            console.log((i2+1)+':', lns[i2].substring(0,200));
        }
    }
}
