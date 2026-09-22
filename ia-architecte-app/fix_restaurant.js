const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: The restaurant renderMenu function has problematic d.n.replace(/\"/g,'')
// Replace the entire restaurant scriptJS with a simpler, safe version
const badRenderMenu = `'function renderMenu(cat){ document.getElementById("menu-grid").innerHTML=_dishesData[cat].map(function(d){ return "<div class=\\'card\\' style=\\'text-align:center;\\'><div style=\\'font-size:60px;margin-bottom:15px;\\'>" + d.e + "</div><h3 style=\\'margin:0 0 5px;\\'>" + d.n + "</h3><p style=\\'color:var(--primary);font-weight:900;font-size:22px;margin:10px 0;\\'>" + d.p + "</p><button onclick=\\'addCart(\\\\\\\"" + d.n.replace(/\\"/g,'') + "\\\\\\",\\\\\\"" + d.p + "\\\\\\")\\' style=\\'width:100%;\\'>Add</button></div>"; }).join(""); }'`;

const goodRenderMenu = `'function renderMenu(cat){ var g=document.getElementById("menu-grid"); g.innerHTML=""; _dishesData[cat].forEach(function(d){ var el=document.createElement("div"); el.className="card"; el.style.textAlign="center"; el.innerHTML="<div style=\\'font-size:60px;margin-bottom:15px;\\'>" +d.e+"</div><h3 style=\\'margin:0 0 5px;\\'>" +d.n+"</h3><p style=\\'color:var(--primary);font-weight:900;font-size:22px;margin:10px 0;\\'>" +d.p+"</p>"; var btn=document.createElement("button"); btn.style.width="100%"; btn.innerHTML="Add"; btn.onclick=function(){ addCart(d.n,d.p); }; el.appendChild(btn); g.appendChild(el); }); }'`;

if (content.includes(badRenderMenu)) {
    content = content.replace(badRenderMenu, goodRenderMenu);
    console.log('Fix 1: renderMenu replaced successfully');
} else {
    // Try a pattern match approach
    const re = /('function renderMenu\(cat\)\{[^']*d\.n\.replace[^']*'\n?\s*)/;
    if (re.test(content)) {
        content = content.replace(re, goodRenderMenu + '\n                ');
        console.log('Fix 1: renderMenu replaced via regex');
    } else {
        console.error('Fix 1: Could not find renderMenu pattern. Trying line-by-line...');
        const lines = content.split('\n');
        for (let i = 2080; i < 2100; i++) {
            if (lines[i] && lines[i].includes('renderMenu') && lines[i].includes('d.n.replace')) {
                console.log('Found at line', i+1, ':', lines[i].substring(0, 100));
                lines[i] = "                + 'function renderMenu(cat){ var g=document.getElementById(\"menu-grid\"); g.innerHTML=\"\"; _dishesData[cat].forEach(function(d){ var el=document.createElement(\"div\"); el.className=\"card\"; el.style.textAlign=\"center\"; el.innerHTML=\"<div style=\\'font-size:60px;margin-bottom:15px;\\'>\"+d.e+\"</div><h3>\"+d.n+\"</h3><p style=\\'color:var(--primary);font-weight:900;font-size:22px;\\'>\"+d.p+\"</p>\"; var b=document.createElement(\"button\"); b.style.width=\"100%\"; b.textContent=\"Add\"; b.onclick=(function(dn,dp){ return function(){ addCart(dn,dp); }; })(d.n,d.p); el.appendChild(b); g.appendChild(el); }); }'";
                content = lines.join('\n');
                console.log('Fix 1: renderMenu replaced at line', i+1);
                break;
            }
        }
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Running syntax check...');
