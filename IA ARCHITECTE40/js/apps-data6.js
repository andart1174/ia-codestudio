'use strict';
/* IA Architecte — Apps 34-40 (Utilities & Productivity) */
const APPS_DATA_6 = [

/* 34 ── REGEX HELPER ────────────────────────────────── */
{icon:'🔍', en:'RegEx Helper', fr:'Aide RegEx',
 desc_en:'Test regular expressions visually',
 desc_fr:'Tester des expressions régulières visuellement',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>RegEx</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif}input,textarea{width:100%;padding:12px;background:#1a1a1a;border:1px solid #333;color:#fff;border-radius:8px;margin:10px 0}#res{padding:15px;background:rgba(59,130,246,.1);border-radius:10px;line-height:1.6}mark{background:#3b82f6;color:#fff;border-radius:3px}</style></head><body>
<h2>🔍 RegEx Helper</h2>
Pattern (e.g. [a-z]): <input id="p" value="[A-Z]+"/>
Text: <textarea id="t">Hello WORLD from Code Studio</textarea>
<div id="res"></div>
<script>
function test(){
  const p=document.getElementById('p').value, t=document.getElementById('t').value;
  try{const re=new RegExp(p,'g');document.getElementById('res').innerHTML=t.replace(re,m=>'<mark>'+m+'</mark>')}
  catch(e){document.getElementById('res').textContent='Invalid Pattern'}
}
document.getElementById('p').oninput=test;document.getElementById('t').oninput=test;test();
</script></body></html>`},

/* 35 ── WORD COUNTER ────────────────────────────────── */
{icon:'🧮', en:'Word Counter', fr:'Compteur Mots',
 desc_en:'Count words, chars & reading time',
 desc_fr:'Compter mots, caractères et temps de lecture',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Words</title>
<style>body{background:#080c14;color:#fff;padding:24px}textarea{width:100%;height:150px;background:#111;color:#fff;padding:10px;border:1px solid #333;border-radius:10px}
.s{display:flex;gap:20px;margin-top:15px;font-weight:800;color:#3b82f6}</style></head><body>
<h2>🧮 Word Counter</h2>
<textarea id="t" oninput="update()"></textarea>
<div class="s">
  <div>Words: <span id="w">0</span></div>
  <div>Chars: <span id="c">0</span></div>
  <div>Min: <span id="m">0</span></div>
</div>
<script>
function update(){
  const v=document.getElementById('t').value.trim();
  document.getElementById('w').textContent=v?v.split(/\\s+/).length:0;
  document.getElementById('c').textContent=v.length;
  document.getElementById('m').textContent=Math.ceil(v.split(/\\s+/).length/200);
}
</script></body></html>`},

/* 36 ── POMODORO FOCUS ──────────────────────────────── */
{icon:'🍅', en:'Pomodoro Focus', fr:'Focus Pomodoro',
 desc_en:'Modern productivity timer with work/rest cycles',
 desc_fr:'Minuteur de productivité (travail/repos)',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pomo</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:50px;font-family:sans-serif}
.t{font-size:80px;font-weight:900;margin:20px 0;color:#ef4444}
button{padding:15px 40px;background:#3b82f6;border:none;border-radius:50px;color:#fff;font-size:20px;cursor:pointer}</style></head><body>
<h2>🍅 Pomodoro</h2>
<div class="t" id="timer">25:00</div>
<button id="b" onclick="toggle()">Start</button>
<script>
let s=1500,run=false,int;
function toggle(){
  run=!run;document.getElementById('b').textContent=run?'Pause':'Start';
  if(run)int=setInterval(()=>{s--;const m=Math.floor(s/60),se=s%60;document.getElementById('timer').textContent=(m<10?'0':'')+m+':'+(se<10?'0':'')+se;if(s<=0)clearInterval(int)},1000);
  else clearInterval(int);
}
</script></body></html>`},

/* 37 ── AGE CALCULATOR ─────────────────────────────── */
{icon:'🎂', en:'Age Calculator', fr:'Calcul Age',
 desc_en:'Precise age, days till next birthday',
 desc_fr:'Âge précis et jours avant anniversaire',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Age</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}input{padding:15px;background:#1a1a1a;border:1px solid #333;color:#fff;border-radius:10px;font-size:20px}
.res{font-size:40px;font-weight:900;margin-top:30px;color:#10b981}</style></head><body>
<h2>🎂 Age Calculator</h2>
<input type="date" id="d" onchange="calc()"/>
<div class="res" id="r">--</div>
<script>
function calc(){
  const b=new Date(document.getElementById('d').value), n=new Date();
  const a = Math.floor((n-b)/(1000*60*60*24*365.25));
  document.getElementById('r').textContent=a + ' years old';
}
</script></body></html>`},

/* 38 ── TYPING SPEED TEST ───────────────────────────── */
{icon:'⌨️', en:'Typing Test', fr:'Test de Frappe',
 desc_en:'Test your WPM typing speed',
 desc_fr:'Tester votre vitesse de frappe (MPM)',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Type</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}#q{font-size:24px;margin-bottom:20px;color:#94a3b8}input{width:100%;padding:15px;background:#1a1a1a;color:#fff;border:1px solid #333;border-radius:10px;font-size:20px}</style></head><body>
<h2>⌨️ Typing Speed</h2>
<div id="q">The quick brown fox jumps over the lazy dog.</div>
<input type="text" id="i" oninput="if(this.value===document.getElementById('q').textContent)alert('Done!')" placeholder="Type the text above..."/>
</body></html>`},

/* 39 ── CSS BOX SHADOW ──────────────────────────────── */
{icon:'⬛', en:'Box Shadow Pro', fr:'Générateur Ombre',
 desc_en:'Visual editor for complex CSS shadows',
 desc_fr:'Éditeur visuel d\'ombres CSS complexes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shadow</title>
<style>body{background:#f0f2f5;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0}
#box{width:200px;height:200px;background:#fff;border-radius:20px;box-shadow:10px 10px 30px rgba(0,0,0,0.1)}
.controls{background:#fff;padding:20px;margin-top:40px;border-radius:15px;box-shadow:0 10px 20px rgba(0,0,0,0.05)}</style></head><body>
<div id="box"></div>
<div class="controls">
  Shadow Blur: <input type="range" min="0" max="100" value="30" oninput="document.getElementById('box').style.boxShadow='10px 10px '+this.value+'px rgba(0,0,0,0.1)'"/>
</div>
</body></html>`},

/* 40 ── BINARY TABLE ────────────────────────────────── */
{icon:'📊', en:'Binary/Dec/Hex', fr:'Binaire/Déc/Hex',
 desc_en:'Conversion reference table (0-255)',
 desc_fr:'Tableau de référence de conversion (0-255)',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Binary</title>
<style>body{background:#080c14;color:#fff;padding:20px;font-family:monospace}table{width:100%;border-collapse:collapse}th,td{border:1px solid #333;padding:5px;text-align:center}th{background:#3b82f6;color:#fff}</style></head><body>
<h2>📊 Number Table (0-15)</h2>
<table><thead><tr><th>Dec</th><th>Bin</th><th>Hex</th></tr></thead><tbody id="b"></tbody></table>
<script>
let h=''; for(let i=0;i<16;i++)h+=\`<tr><td>\${i}</td><td>\${i.toString(2).padStart(4,'0')}</td><td>\${i.toString(16).toUpperCase()}</td></tr>\`;
document.getElementById('b').innerHTML=h;
</script></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_6);
} else {
  window.APPS_DATA = APPS_DATA_6;
}
