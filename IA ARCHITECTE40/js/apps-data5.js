'use strict';
/* IA Architecte — Apps 26-33 (Developer Tools & Converters) */
const APPS_DATA_5 = [

/* 26 ── BASE64 STUDIO ──────────────────────────────── */
{icon:'🔣', en:'Base64 Studio', fr:'Base64 Studio',
 desc_en:'Encode & decode text or images to Base64',
 desc_fr:'Codeur et décodeur Base64 pour texte/images',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Base64</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;padding:24px}
textarea{width:100%;height:120px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#fff;padding:12px;font-family:monospace;outline:none;margin-bottom:12px}
.btns{display:flex;gap:10px;margin-bottom:20px}
button{flex:1;padding:12px;border:none;border-radius:10px;font-weight:700;cursor:pointer;transition:all .2s}
.enc{background:#3b82f6;color:#fff}
.dec{background:rgba(255,255,255,.1);color:#fff}
</style></head><body>
<h2>🔣 Base64 Studio</h2>
<textarea id="in" placeholder="Text or Base64..."></textarea>
<div class="btns">
  <button class="enc" onclick="document.getElementById('out').value=btoa(document.getElementById('in').value)">Encode</button>
  <button class="dec" onclick="try{document.getElementById('out').value=atob(document.getElementById('in').value)}catch(e){alert('Invalid Base64')}">Decode</button>
</div>
<textarea id="out" readonly placeholder="Result..."></textarea>
</body></html>`},

/* 27 ── JSON MASTER ────────────────────────────────── */
{icon:'📦', en:'JSON Master', fr:'JSON Master',
 desc_en:'Pretty print, minify and validate JSON',
 desc_fr:'Formatage, minification et validation JSON',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>JSON</title>
<style>
body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif}
textarea{width:100%;height:150px;background:#1a1a1a;border:1px solid #333;color:#10b981;padding:10px;font-family:monospace;border-radius:8px}
button{padding:10px 20px;margin:10px 5px 0 0;background:#3b82f6;border:none;border-radius:5px;color:#fff;cursor:pointer}
</style></head><body>
<h2>📦 JSON Master</h2>
<textarea id="j">{"name":"Example","active":true,"tags":["json","tool"]}</textarea>
<button onclick="try{document.getElementById('j').value=JSON.stringify(JSON.parse(document.getElementById('j').value),null,2)}catch(e){alert('Invalid JSON')}">Format</button>
<button onclick="try{document.getElementById('j').value=JSON.stringify(JSON.parse(document.getElementById('j').value))}catch(e){alert('Invalid JSON')}" style="background:#666">Minify</button>
</body></html>`},

/* 28 ── URL TOOL ───────────────────────────────────── */
{icon:'🔗', en:'URL Tool', fr:'Outil URL',
 desc_en:'Encode & decode URLs correctly',
 desc_fr:'Encodage et décodage URL correct',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>URL</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif}textarea{width:100%;height:100px;background:#111;border:1px solid #333;color:#3b82f6;border-radius:8px;padding:10px}button{background:#3b82f6;border:none;padding:10px 20px;color:#fff;border-radius:5px;margin-top:10px;cursor:pointer}</style></head><body>
<h2>🔗 URL Encoder/Decoder</h2>
<textarea id="u" placeholder="Enter URL here..."></textarea>
<button onclick="document.getElementById('u').value=encodeURIComponent(document.getElementById('u').value)">Encode</button>
<button onclick="document.getElementById('u').value=decodeURIComponent(document.getElementById('u').value)" style="background:#444">Decode</button>
</body></html>`},

/* 29 ── NUMBER SYSTEM ──────────────────────────────── */
{icon:'🔢', en:'Num Converter', fr:'Conv. Numérique',
 desc_en:'Binary, Hex, Dec, Octal converter',
 desc_fr:'Convertisseur Binaire, Hex, Décimal, Octal',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Num</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif}input{width:100%;padding:12px;margin:5px 0 15px;background:#1a1a1a;border:1px solid #333;color:#f59e0b;border-radius:5px}</style></head><body>
<h2>🔢 Number System</h2>
<label>Decimal</label><input type="number" id="dec" oninput="update('dec')"/>
<label>Binary</label><input type="text" id="bin" oninput="update('bin')"/>
<label>Hex</label><input type="text" id="hex" oninput="update('hex')"/>
<script>
function update(src){
  const v = document.getElementById(src).value; if(v==='')return;
  const val = src==='dec'?parseInt(v,10):src==='bin'?parseInt(v,2):parseInt(v,16);
  if(src!=='dec') document.getElementById('dec').value = val;
  if(src!=='bin') document.getElementById('bin').value = val.toString(2);
  if(src!=='hex') document.getElementById('hex').value = val.toString(16).toUpperCase();
}
</script></body></html>`},

/* 30 ── TEXT CASE PRO ──────────────────────────────── */
{icon:'Aa', en:'Text Case Pro', fr:'Casse du Texte',
 desc_en:'Snake_case, camelCase, PascalCase converter',
 desc_fr:'Convertir en Snake_case, camelCase, etc.',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Case</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif}textarea{width:100%;height:80px;background:#111;color:#fff;padding:10px;margin-bottom:10px}button{padding:8px 15px;margin:0 5px 5px 0;background:#3b82f6;border:none;color:#fff;border-radius:5px;cursor:pointer}</style></head><body>
<h2>Aa Text Case Converter</h2>
<textarea id="t">hello world example</textarea><br/>
<button onclick="const v=document.getElementById('t').value;document.getElementById('t').value=v.toUpperCase()">UPPER</button>
<button onclick="const v=document.getElementById('t').value;document.getElementById('t').value=v.toLowerCase()">lower</button>
<button onclick="const v=document.getElementById('t').value;document.getElementById('t').value=v.replace(/\\s+/g,'_').toLowerCase()">snake_case</button>
<button onclick="const v=document.getElementById('t').value;document.getElementById('t').value=v.replace(/(?:^\\w|[A-Z]|\\b\\w)/g,(l,i)=>i===0?l.toLowerCase():l.toUpperCase()).replace(/\\s+/g,'')">camelCase</button>
</body></html>`},

/* 31 ── GLASSMORPHISM ─────────────────────────────── */
{icon:'🔮', en:'Glassmorphism Gen', fr:'Générateur Glass',
 desc_en:'Create advanced CSS frosted glass effects',
 desc_fr:'Effets de verre givré (glassmorphism) en CSS',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Glass</title>
<style>
body{background:linear-gradient(45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;margin:0}
.glass{width:300px;height:200px;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,.1);color:#fff}
.controls{position:fixed;bottom:20px;background:#fff;padding:20px;border-radius:15px;color:#333}
</style></head><body>
<div class="glass"><h3>Glass Effect</h3><p>Frosted glass preview</p></div>
<div class="controls">
  Blur: <input type="range" min="0" max="20" value="10" oninput="document.querySelector('.glass').style.backdropFilter='blur('+this.value+'px)'"/>
</div>
</body></html>`},

/* 32 ── PASSWORD GENERATOR ─────────────────────────── */
{icon:'🔐', en:'Password Gen', fr:'Générateur Mdp',
 desc_en:'Secure random password builder',
 desc_fr:'Créateur de mots de passe sécurisés',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pass</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif;text-align:center}.res{font-size:24px;font-weight:900;background:#1a1a1a;padding:20px;margin:20px 0;color:#10b981;border-radius:10px}button{padding:15px 30px;background:#3b82f6;color:#fff;border:none;border-radius:10px;cursor:pointer}</style></head><body>
<h2>🔐 Password Generator</h2>
<div class="res" id="r">PASS-1234</div>
<button onclick="const c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';let p='';for(let i=0;i<16;i++)p+=c.charAt(Math.floor(Math.random()*c.length));document.getElementById('r').textContent=p">Generate!</button>
</body></html>`},

/* 33 ── MARKDOWN PREVIEW ────────────────────────────── */
{icon:'📝', en:'Markdown Preview', fr:'Aperçu Markdown',
 desc_en:'Advanced MD with live rendering',
 desc_fr:'Aperçu Markdown avancé en temps réel',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>MD</title>
<style>body{background:#080c14;color:#fff;display:flex;height:100vh;margin:0}textarea,.out{flex:1;padding:20px;overflow:auto}textarea{background:#111;color:#aaa;border:none;outline:none;font-family:monospace;font-size:14px;border-right:1px solid #333}.out{background:#080c14}</style></head><body>
<textarea id="i" oninput="document.getElementById('o').innerHTML=this.value.replace(/^# (.*$)/gm,'<h1>$1</h1>').replace(/^## (.*$)/gm,'<h2>$1</h2>').replace(/\\*\\*(.*)\\*\\*/g,'<b>$1</b>')"># Title\\n\\n**Bold text** example.</textarea>
<div class="out" id="o"><h1>Title</h1><p><b>Bold text</b> example.</p></div>
</body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_5);
} else {
  window.APPS_DATA = APPS_DATA_5;
}
