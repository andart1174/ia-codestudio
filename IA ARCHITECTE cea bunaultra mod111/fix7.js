const fs = require('fs');
const filePath = 'js/ia-ultra-engine.js';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

for (let i = 2169; i < 2175; i++) {
    if (lines[i] && lines[i].includes('podcast') && lines[i+1].includes('bodyHTML')) {
        lines[i+1] = `              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83C\\uDF99\\uFE0F ' + brand + '</div></div><button onclick="showToast(\\'\\' + this.getL(\\'Subscribed!\\',\\'Abonn\u00e9!\\') + \\'\\')">' + this.getL('+ Subscribe','+ S\\u2019abonner') + '</button></header>'`;
        console.log('Fixed podcast bodyHTML toast issue at line', i+2);
    }
}

// 2211: renderEvList in calendar
for (let i = 2200; i < 2220; i++) {
    if (lines[i] && lines[i].includes('renderEvList') && lines[i].includes('ev-list')) {
        lines[i] = `                + 'function renderEvList(){ var lst=document.getElementById("ev-list"); lst.innerHTML=""; if(_calEvs.length){ _calEvs.forEach(function(e){ var d=document.createElement("div"); d.style.cssText="display:flex;justify-content:space-between;align-items:center;padding:8px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid #8b5cf6;"; var d1=document.createElement("div"); d1.innerHTML="<div style=\\'font-weight:700;font-size:12px;\\'>" +e.t+"</div><div style=\\'font-size:10px;opacity:0.5;\\'>" +e.date+"</div>"; var btn=document.createElement("button"); btn.style.cssText="background:#ef4444;padding:4px 8px;font-size:10px;"; btn.textContent="Del"; btn.onclick=(function(eid){ return function(){ window.delEv(eid); }; })(e.id); d.appendChild(d1); d.appendChild(btn); lst.appendChild(d); }); } else { lst.innerHTML="<p style=\\'text-align:center;opacity:0.4;font-size:12px;\\'>No events</p>"; } }'`;
        console.log('Fixed calendar renderEvList at line', i+1);
    }
}

// 2248: showQ in quiz
for (let i = 2240; i < 2260; i++) {
    if (lines[i] && lines[i].includes('showQ') && lines[i].includes('answerQ')) {
        lines[i] = `                + 'function showQ(){ if(_qi>=_Qs.length){ endQuiz(); return; } clearInterval(_qtimer); _qtv=15; var q=_Qs[_qi]; document.getElementById("q-num").innerText=(_qi+1)+"/10"; document.getElementById("q-text").innerText=q.q; document.getElementById("q-score").innerText="Score: "+_score; var qo=document.getElementById("q-opts"); qo.innerHTML=""; q.opts.forEach(function(o,i){ var b=document.createElement("button"); b.style.cssText="padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:var(--text);cursor:pointer;font-size:14px;transition:0.2s;"; b.textContent=o; b.onclick=(function(idx){ return function(){ window.answerQ(idx); }; })(i); qo.appendChild(b); }); var bar=document.getElementById("timer-bar"); bar.style.transition="none"; bar.style.width="100%"; setTimeout(function(){ bar.style.transition="width 15s linear"; bar.style.width="0%"; },50); _qtimer=setInterval(function(){ _qtv--; document.getElementById("q-timer").innerText=_qtv; if(_qtv<=0){ clearInterval(_qtimer); document.querySelectorAll("#q-opts button").forEach(function(b){ b.disabled=true; }); setTimeout(function(){ _qi++; showQ(); },1000); } },1000); }'`;
        console.log('Fixed quiz showQ at line', i+1);
    }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

const { execSync } = require('child_process');
try {
    execSync('node --check "js/ia-ultra-engine.js"');
    console.log('SYNTAX OK!');
} catch(e) {
    const out = (e.stderr||Buffer.alloc(0)).toString() + (e.stdout||Buffer.alloc(0)).toString();
    const m = out.match(/:(\d+)\n/);
    if (m) {
        console.log('ERROR at line', m[1]);
        const lns = lines;
        const ln = parseInt(m[1]);
        for (let i = Math.max(0,ln-3); i < Math.min(lns.length,ln+2); i++) {
            console.log((i+1)+':', lns[i].substring(0,180));
        }
    } else {
        const m2 = out.match(/engine\.js:(\d+)/);
        if (m2) {
            console.log('ERROR at line', m2[1]);
            const lns = lines;
            const ln = parseInt(m2[1]);
            for (let i = Math.max(0,ln-3); i < Math.min(lns.length,ln+2); i++) {
                console.log((i+1)+':', lns[i].substring(0,180));
            }
        }
    }
    console.log("\nFull Error:\n", out.substring(0, 400));
}
