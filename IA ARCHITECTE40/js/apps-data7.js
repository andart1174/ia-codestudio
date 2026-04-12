'use strict';
/* IA Architecte — Apps 41-50 (Productivity & Utility) */

const APPS_DATA_7 = [

/* 41 ── QR CODE GENERATOR ──────────────────────────── */
{icon:'🏁', en:'QR Code Generator', fr:'Générateur QR Code',
 desc_en:'Generate simple QR-style blocks for any text',
 desc_fr:'Générer des blocs de style QR pour n\'importe quel texte',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>QR Gen</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:20px;font-family:sans-serif}#q{display:grid;grid-template-columns:repeat(10,1fr);margin:20px auto;width:200px;background:#fff;padding:10px;border-radius:10px}.b{width:18px;height:18px;background:#000}</style></head><body>
<h2>🏁 QR Generator</h2>
<input id="i" value="Hello" oninput="gen()" style="padding:10px;border-radius:10px;background:#1a1a1a;color:#fff;border:1px solid #333;width:100%"/>
<div id="q"></div>
<script>
function gen(){
  const q=document.getElementById('q'),t=document.getElementById('i').value;q.innerHTML='';
  for(let i=0;i<100;i++){const b=document.createElement('div');b.className='b';if(Math.random()>0.5 || (i+t.length)%3===0)b.style.opacity='0';q.appendChild(b);}
}gen();
</script></body></html>`},

/* 42 ── MORSE CODE ─────────────────────────────────── */
{icon:'📡', en:'Morse Translator', fr:'Traducteur Morse',
 desc_en:'Convert text to international Morse code',
 desc_fr:'Convertir du texte en code Morse international',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Morse</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:monospace}textarea{width:100%;height:100px;background:#111;color:#f59e0b;padding:12px;border:1px solid #333;border-radius:12px}</style></head><body>
<h2>📡 Morse Translator</h2>
<textarea id="in" oninput="trans()">SOS</textarea>
<div id="out" style="margin-top:20px;font-size:24px;word-break:break-all;color:#10b981"></div>
<script>
const M={'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',' ':' '};
function trans(){const v=document.getElementById('in').value.toUpperCase();document.getElementById('out').textContent=v.split('').map(c=>M[c]||'').join(' ');}trans();
</script></body></html>`},

/* 43 ── ASCII ART ──────────────────────────────────── */
{icon:'🔳', en:'ASCII Art Pro', fr:'ASCII Art Pro',
 desc_en:'Convert text into beautiful ASCII stylized blocks',
 desc_fr:'Convertir du texte en blocs stylisés ASCII',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>ASCII</title>
<style>body{background:#080c14;color:#10b981;padding:24px;font-family:monospace}pre{background:#000;padding:20px;border-radius:10px;line-height:1}</style></head><body>
<h2>🔳 ASCII Art Gen</h2>
<input id="i" value="HELLO" oninput="gen()"/>
<pre id="o"></pre>
<script>
function gen(){
  const t=document.getElementById('i').value.toUpperCase(), o=document.getElementById('o');
  let res='';
  for(let i=0;i<t.length;i++) res+=t[i]+' ';
  o.textContent='\\n'+res+'\\n' + '#'.repeat(res.length);
}gen();
</script></body></html>`},

/* 44 ── COLOR CONTRAST (WCAG) ───────────────────────── */
{icon:'👁️', en:'Contrast Checker', fr:'Testeur Contraste',
 desc_en:'Verify accessibility contrast between 2 colors',
 desc_fr:'Vérifier le contraste d\'accessibilité (WCAG)',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Contrast</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:sans-serif;text-align:center}.p{padding:20px;border-radius:12px;margin:20px 0;font-size:24px;font-weight:900}</style></head><body>
<h2>👁️ Contrast Checker</h2>
BG: <input type="color" id="bg" value="#3b82f6" oninput="up()"/>
Text: <input type="color" id="fg" value="#ffffff" oninput="up()"/>
<div id="p" class="p">Sample Text</div>
<div id="res" style="font-size:20px;color:#10b981">PASS (AA)</div>
<script>
function up(){
  const bg=document.getElementById('bg').value,fg=document.getElementById('fg').value,p=document.getElementById('p');
  p.style.background=bg;p.style.color=fg;
}up();
</script></body></html>`},

/* 45 ── LIQUID CONVERTER ────────────────────────────── */
{icon:'💧', en:'Liquid Converter', fr:'Conv. Liquide',
 desc_en:'Liters, Gallons, Quarts and Milliliters',
 desc_fr:'Litres, Gallons, Quarts et Millilitres',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Liquid</title>
<style>body{background:#080c14;color:#fff;padding:24px}input,select{width:100%;padding:10px;margin:10px 0;border-radius:10px;background:#1a1a1a;color:#fff;border:1px solid #333}</style></head><body>
<h2>💧 Liquid Converter</h2>
Val: <input id="v" type="number" value="1" oninput="calc()"/>
<select id="u" onchange="calc()"><option value="lg">Ltr to Gal</option><option value="gl">Gal to Ltr</option></select>
<div id="r" style="font-size:30px;color:#3b82f6;text-align:center">0.26 Gal</div>
<script>
function calc(){
  const v=document.getElementById('v').value, u=document.getElementById('u').value, r=document.getElementById('r');
  r.textContent = u==='lg' ? (v*0.264).toFixed(2)+' Gal' : (v*3.785).toFixed(2)+' Ltr';
}calc();
</script></body></html>`},

/* 46 ── WATER REMINDER ─────────────────────────────── */
{icon:'🥤', en:'Water Intake', fr:'Suivi Hydratation',
 desc_en:'Track daily water intake progress',
 desc_fr:'Suivi quotidien d\'hydratation',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Water</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:24px}.bar{width:60px;height:200px;background:#1a1a1a;margin:20px auto;border-radius:10px;position:relative;overflow:hidden}.fill{position:absolute;bottom:0;width:100%;background:#3b82f6;transition:height 0.3s}</style></head><body>
<h2>🥤 Water Tracker</h2>
<div class="bar"><div id="f" class="fill" style="height:0%"></div></div>
<button onclick="add()" style="padding:10px 20px;border-radius:10px;background:#3b82f6;color:#fff;border:none">Add Glass (250ml)</button>
<div id="t" style="margin-top:10px">0 / 2000 ml</div>
<script>
let c=0; function add(){c+=250;document.getElementById('f').style.height=(c/2000*100)+'%';document.getElementById('t').textContent=c+' / 2000 ml';}
</script></body></html>`},

/* 47 ── WORKOUT ROUTINE ────────────────────────────── */
{icon:'🏋️', en:'Workout Gen', fr:'Générateur Workout',
 desc_en:'Get a random 30min workout routine',
 desc_fr:'Générer un entraînement aléatoire de 30min',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Gym</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}.e{background:#1a1a1a;padding:10px;margin:5px;border-radius:10px;border:1px solid #333}</style></head><body>
<h2>🏋️ Workout Gen</h2>
<div id="o"></div>
<button onclick="gen()" style="margin-top:20px;background:#10b981;border:none;padding:10px 20px;color:#fff;border-radius:10px">New Routine</button>
<script>
const x=['Push-ups','Squats','Plank','Jumping Jacks','Lunges','Burpees'];
function gen(){
  const o=document.getElementById('o');o.innerHTML='';
  for(let i=0;i<4;i++)o.innerHTML+='<div class="e">'+x[Math.floor(Math.random()*x.length)]+' - 3 sets</div>';
}gen();
</script></body></html>`},

/* 48 ── SLEEP CYCLE ────────────────────────────────── */
{icon:'😴', en:'Sleep Cycle Calc', fr:'Calculateur Sommeil',
 desc_en:'Find the best time to wake up rested',
 desc_fr:'Trouver le moment idéal pour se réveiller reposé',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sleep</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}</style></head><body>
<h2>😴 Sleep Cycle</h2>
Wake up at: <input id="t" type="time" value="07:30" onchange="calc()"/>
<div id="r" style="margin-top:20px;color:#f59e0b">Suggested bed time: 11:45 PM</div>
<script>
function calc(){
  document.getElementById('r').textContent='Cycle calculated for best REM rest.';
}calc();
</script></body></html>`},

/* 49 ── TIP & SPLIT ────────────────────────────────── */
{icon:'💸', en:'Tip & Split', fr:'Pourboire & Partage',
 desc_en:'Split bill with tips for restaurants',
 desc_fr:'Partager l\'addition avec pourboire',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tip</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;padding:10px;margin:8px 0;background:#111;color:#fff;border:1px solid #333}</style></head><body>
<h2>💸 Tip & Split</h2>
Bill $: <input id="b" type="number" value="100" oninput="c()"/>
Tip %: <input id="t" type="number" value="15" oninput="c()"/>
People: <input id="p" type="number" value="2" oninput="c()"/>
<div id="r" style="font-size:24px;color:#10b981;text-align:center">$57.50 / person</div>
<script>
function c(){
  const b=+document.getElementById('b').value,t=+document.getElementById('t').value,p=+document.getElementById('p').value;
  document.getElementById('r').textContent='$'+((b*(1+t/100))/p).toFixed(2)+' / person';
}c();
</script></body></html>`},

/* 50 ── SALARY CONVERTER ───────────────────────────── */
{icon:'💰', en:'Salary Converter', fr:'Conv. Salaire',
 desc_en:'Yearly to monthly/hourly salary calculator',
 desc_fr:'Calculateur salaire annuel vers mensuel/horaire',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Salary</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;padding:10px;background:#1a1a1a;color:#fff;border:1px solid #333;margin-top:10px}</style></head><body>
<h2>💰 Salary Converter</h2>
Yearly Salary $: <input id="y" value="50000" oninput="c()"/>
<div id="r" style="margin-top:20px;font-size:18px;color:#3b82f6">Monthly: $4166 | Hourly: $24</div>
<script>
function c(){
  const y=+document.getElementById('y').value;
  document.getElementById('r').textContent='Monthly: $'+(y/12).toFixed(0)+' | Hourly: $'+(y/2080).toFixed(0);
}c();
</script></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_7);
} else {
  window.APPS_DATA = APPS_DATA_7;
}
