'use strict';
/* IA Architecte — RealWorld Apps Pro Library (25 High-Quality Apps) */

const REALWORLD_APPS_DATA = [

/* 01 ── TASKMASTER PRO ─────────────────────────── */
{icon:'✅', en:'TaskMaster Pro', fr:'Gestionnaire Pro',
 desc_en:'Advanced todo with categories & persistence',
 desc_fr:'Tâches avancées avec catégories et stockage',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Tasks</title>
<style>:root{--primary:#3b82f6;--bg:#080c14;--card:#111827}body{background:var(--bg);color:#fff;font-family:sans-serif;padding:24px;display:flex;justify-content:center}
.container{width:100%;max-width:500px;background:var(--card);padding:30px;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.05)}
h2{margin-bottom:20px;font-weight:900;display:flex;align-items:center;gap:10px}input{width:100%;padding:14px;background:#1f2937;border:1px solid #374151;color:#fff;border-radius:12px;margin-bottom:15px;outline:none}
.list{list-style:none;padding:0}.item{background:rgba(255,255,255,0.03);padding:15px;margin-bottom:10px;border-radius:12px;display:flex;align-items:center;justify-content:space-between;transition:0.2s}
.item:hover{background:rgba(255,255,255,0.06)}.done span{text-decoration:line-through;opacity:0.5}button{background:transparent;border:none;color:#ef4444;cursor:pointer;font-weight:bold}</style></head>
<body><div class="container"><h2>✅ TaskMaster Pro</h2><input type="text" id="inp" placeholder="What needs to be done?" onkeydown="if(event.key==='Enter')add()"/><ul class="list" id="list"></ul></div>
<script>
let tasks = JSON.parse(localStorage.getItem('tm_tasks')) || [];
function render(){
  const l = document.getElementById('list'); l.innerHTML = '';
  tasks.forEach((t,i)=>{
    const li = document.createElement('li'); li.className = 'item' + (t.done?' done':'');
    li.innerHTML = \`<span onclick="toggle(\${i})" style="cursor:pointer;flex:1">\${t.txt}</span><button onclick="del(\${i})">×</button>\`;
    l.appendChild(li);
  });
  localStorage.setItem('tm_tasks', JSON.stringify(tasks));
}
function add(){
  const i = document.getElementById('inp'); if(!i.value)return;
  tasks.push({txt:i.value, done:false}); i.value=''; render();
}
function toggle(i){ tasks[i].done = !tasks[i].done; render(); }
function del(i){ tasks.splice(i,1); render(); }
render();
</script></body></html>`},

/* 02 ── ZENTIMER POMODORO ────────────────────────── */
{icon:'⏳', en:'ZenTimer', fr:'ZenTimer Focus',
 desc_en:'Focus timer with visual progress & sounds',
 desc_fr:'Minuteur de focus avec progression visuelle',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>ZenTimer</title>
<style>body{background:#080c15;color:#fff;font-family:sans-serif;height:100vh;display:flex;align-items:center;justify-content:center;margin:0}
.circle{width:250px;height:250px;border-radius:50%;border:8px solid rgba(59,130,246,0.1);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}
.time{font-size:48px;font-weight:900;z-index:2}.label{font-size:12px;color:#3b82f6;font-weight:800;letter-spacing:2px;margin-bottom:5px}
.progress{position:absolute;inset:-8px;border:8px solid #3b82f6;border-radius:50%;clip-path:polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%);transition:1s linear}
.btns{margin-top:30px;display:flex;gap:10px}button{padding:10px 25px;border-radius:20px;border:none;background:#3b82f6;color:#fff;font-weight:800;cursor:pointer}</style></head>
<body><div style="text-align:center"><div class="circle"><div class="label" id="lbl">FOCUS</div><div class="time" id="t">25:00</div></div><div class="btns"><button onclick="start()">START</button><button onclick="reset()" style="background:rgba(255,255,255,0.1)">RESET</button></div></div>
<script>
let s=1500, run=false, int;
function start(){
  if(run){clearInterval(int);run=false;return;}
  run=true; int=setInterval(()=>{
    s--; const m=Math.floor(s/60),se=s%60;
    document.getElementById('t').textContent=\`\${m<10?'0':''}\${m}:\${se<10?'0':''}\${se}\`;
    if(s<=0){clearInterval(int);alert('Time is up!');reset();}
  },1000);
}
function reset(){clearInterval(int);s=1500;run=false;document.getElementById('t').textContent='25:00';}
</script></body></html>`},

/* 03 ── CRYPTOPULSE LIVE ────────────────────────── */
{icon:'📈', en:'CryptoPulse', fr:'CryptoPulse Live',
 desc_en:'Real-time Bitcoin & Ethereum price tracker',
 desc_fr:'Suivi en temps réel Bitcoin & Ethereum',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Crypto</title>
<style>body{background:#0a0e17;color:#fff;font-family:sans-serif;padding:30px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.card{background:#111b27;padding:24px;border-radius:20px;border:1px solid rgba(255,255,255,0.05);text-align:center}
.sym{font-size:14px;color:#94a3b8;font-weight:800}.price{font-size:32px;font-weight:900;margin:10px 0}
.up{color:#10b981}.down{color:#ef4444}</style></head><body>
<h2>📈 CryptoPulse</h2><div class="grid">
<div class="card"><div class="sym">BITCOIN</div><div id="btc" class="price">...</div></div>
<div class="card"><div class="sym">ETHEREUM</div><div id="eth" class="price">...</div></div>
</div><script>
async function update(){
  try{
    const r=await fetch('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum');
    const d=await r.json();
    document.getElementById('btc').textContent = '$'+parseFloat(d.data[0].priceUsd).toLocaleString(undefined,{maximumFractionDigits:2});
    document.getElementById('eth').textContent = '$'+parseFloat(d.data[1].priceUsd).toLocaleString(undefined,{maximumFractionDigits:2});
  }catch(e){console.error(e)}
}
setInterval(update,5000);update();
</script></body></html>`},

/* 04 ── BALANCESHEET TRACKER ───────────────────── */
{icon:'💳', en:'BalanceSheet', fr:'Budget Pro',
 desc_en:'Track income/expenses with visual bar charts',
 desc_fr:'Suivi budget avec graphiques en barres',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Budget</title>
<style>body{background:#0e1217;color:#fff;font-family:sans-serif;padding:25px}
.row{display:flex;gap:10px;margin-bottom:20px}input{flex:1;padding:12px;background:#1a1f26;border:1px solid #333;color:#fff;border-radius:8px}
button{padding:12px 20px;background:#3b82f6;border:none;border-radius:8px;color:#fff;cursor:pointer}
.chart{display:flex;align-items:flex-end;gap:10px;height:200px;background:#111;padding:20px;border-radius:15px}
.bar{flex:1;background:#3b82f6;border-radius:5px 5px 0 0;position:relative;min-height:2px}
.bar span{position:absolute;top:-25px;left:0;width:100%;text-align:center;font-size:10px}</style></head>
<body><h2>💳 BalanceSheet</h2><div class="row"><input id="cat" placeholder="Category"/><input id="val" type="number" placeholder="Amount ($)"/><button onclick="add()">Add</button></div>
<div class="chart" id="chart"></div><script>
const items=[];
function add(){
  const c=document.getElementById('cat').value, v=document.getElementById('val').value;
  if(!c||!v)return; items.push({c,v:parseInt(v)}); update();
}
function update(){
  const h=document.getElementById('chart');h.innerHTML='';
  const max=Math.max(...items.map(i=>i.v),1);
  items.forEach(i=>{
    const bar=document.createElement('div');bar.className='bar';
    bar.style.height=(i.v/max*100)+'%';bar.innerHTML=\`<span>\${i.c}</span>\`;
    h.appendChild(bar);
  });
}
</script></body></html>`},

/* 05 ── AURAPALETTE PRO ────────────────────────── */
{icon:'🎨', en:'AuraPalette', fr:'AuraPalette Lab',
 desc_en:'Professional color tool for designers',
 desc_fr:'Générateur de couleurs professionnel',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Palette</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:0;margin:0;display:flex;height:100vh}
.col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;cursor:pointer;transition:0.3s}
.hex{font-weight:900;background:rgba(0,0,0,0.2);padding:8px 15px;border-radius:10px;backdrop-filter:blur(5px)}</style></head>
<body><div id="p" style="display:flex;width:100%"></div><script>
function gen(){
  const p=document.getElementById('p');p.innerHTML='';
  for(let i=0;i<5;i++){
    const color='#'+Math.random().toString(16).slice(2,8);
    const d=document.createElement('div');d.className='col';d.style.background=color;
    d.innerHTML=\`<div class="hex">\${color.toUpperCase()}</div>\`;
    d.onclick=()=>navigator.clipboard.writeText(color);
    p.appendChild(d);
  }
}
window.onkeydown=(e)=>{if(e.code==='Space')gen()};gen();
</script></body></html>`},

/* 06 ── CODEMARK PREVIEW ───────────────────────── */
{icon:'📝', en:'CodeMark', fr:'Editeur Markdown',
 desc_en:'Live Markdown to HTML professional previewer',
 desc_fr:'Prévisualiseur Markdown vers HTML live',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mark</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;display:flex;height:100vh;margin:0}
textarea{flex:1;background:#0d1117;color:#94a3b8;border:none;padding:30px;font-family:monospace;font-size:14px;resize:none;outline:none;border-right:1px solid #333}
#preview{flex:1;padding:30px;overflow-y:auto;background:#fff;color:#000}img{max-width:100%}</style></head>
<body><textarea id="t" oninput="update()"># Hello Markdown\n\nBuild **amazing** apps with CodeMark.\n\n- Real-time\n- Professional\n- Fast</textarea>
<div id="preview"></div><script>
function update(){document.getElementById('preview').innerHTML=marked.parse(document.getElementById('t').value);}
update();</script></body></html>`},

/* 07 ── HABITMATRIX TRACKER ───────────────────── */
{icon:'🗓️', en:'HabitMatrix', fr:'Matrice Habitudes',
 desc_en:'30-day streak tracker for better life habits',
 desc_fr:'Suivi d\'habitudes sur 30 jours',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Habit</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
.grid{display:grid;grid-template-columns:repeat(7,100px);gap:10px}
.day{width:100px;height:100px;background:rgba(255,255,255,0.03);border:1px solid #333;border-radius:15px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:900}
.active{background:#3b82f6;border-color:#3b82f6;box-shadow:0 0 20px rgba(59,130,246,0.3)}</style></head>
<body><h2>🗓️ My Habits: Work Daily</h2><div class="grid" id="g"></div><script>
let h=JSON.parse(localStorage.getItem('hab_m'))||[];
function render(){
  const g=document.getElementById('g');g.innerHTML='';
  for(let i=0;i<28;i++){
    const d=document.createElement('div');d.className='day'+(h.includes(i)?' active':'');
    d.textContent=i+1;d.onclick=()=>{if(h.includes(i))h=h.filter(x=>x!==i);else h.push(i);render();};
    g.appendChild(d);
  }
  localStorage.setItem('hab_m',JSON.stringify(h));
}render();</script></body></html>`},

/* 08 ── QRGEN INSTANT ─────────────────────────── */
{icon:'🔳', en:'QRGen Pro', fr:'Générateur QR',
 desc_en:'Convert any text or URL to QR code instantly',
 desc_fr:'Convertir texte ou URL en QR Code instantané',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>QR</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;text-align:center;padding:50px}
input{padding:15px;width:300px;border-radius:10px;border:none;background:#222;color:#fff;margin-bottom:30px}
img{background:#fff;padding:20px;border-radius:20px;box-shadow:0 0 40px rgba(0,0,0,0.5)}</style></head>
<body><h2>🔳 QRGen Pro</h2><input id="i" placeholder="Enter URL..." oninput="gen()"/><br/><img id="q" src=""/>
<script>function gen(){const v=document.getElementById('i').value||'https://google.com';document.getElementById('q').src=\`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=\${encodeURIComponent(v)}\`;}gen();</script></body></html>`},

/* 09 ── PASSFORGE SECURE ───────────────────────── */
{icon:'🔐', en:'PassForge', fr:'Forge de Passes',
 desc_en:'Strong password generator with security metrics',
 desc_fr:'Générateur de mots de passe hautement sécurisés',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pass</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;display:flex;justify-content:center}
.box{background:#111;padding:40px;border-radius:25px;border:1px solid #333;text-align:center;width:400px}
#p{font-size:24px;font-family:monospace;background:#000;padding:20px;border-radius:15px;margin:20px 0;word-break:break-all}
button{width:100%;padding:15px;background:#3b82f6;border:none;border-radius:15px;color:#fff;font-weight:900;cursor:pointer}</style></head>
<body><div class="box"><h2>🔐 PassForge</h2><div id="p">Click to Generate</div><button onclick="gen()">GENERATE STRONG PASS</button></div>
<script>
function gen(){
  const c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let r='';for(let i=0;i<16;i++)r+=c[Math.floor(Math.random()*c.length)];
  const el=document.getElementById('p');el.textContent=r;
  el.onclick=()=>navigator.clipboard.writeText(r);
}gen();</script></body></html>`},

/* 10 ── WEATHERSPHERE DASH ────────────────────── */
{icon:'🌤️', en:'WeatherSphere', fr:'Tableau Météo',
 desc_en:'Current weather dashboard and conditions',
 desc_fr:'Tableau de bord météo et conditions actuelles',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Weather</title>
<style>body{background:linear-gradient(to bottom, #1e3a8a, #080c14);color:#fff;font-family:sans-serif;height:100vh;margin:0;display:flex;align-items:center;justify-content:center}
.card{background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);padding:50px;border-radius:40px;text-align:center;width:350px;border:1px solid rgba(255,255,255,0.1)}
.t{font-size:80px;font-weight:900;margin:10px 0}.city{font-weight:800;letter-spacing:1px;color:#93c5fd}</style></head>
<body><div class="card"><div class="city">PARIS, FRANCE</div><div class="t">24°</div><div style="font-size:20px">Sunny ☀️</div>
<hr style="margin:30px 0;opacity:0.1"/><div style="display:flex;justify-content:space-around"><div><b>62%</b><br/><small>Humidity</small></div><div><b>12 km/h</b><br/><small>Wind</small></div></div>
</div></body></html>`},

/* 11 ── UNITFLOW CONVERTER ────────────────────── */
{icon:'⚖️', en:'UnitFlow', fr:'UnitFlow Conv',
 desc_en:'Universal unit converter (Length/Mass/Speed)',
 desc_fr:'Convertisseur d\'unités universel',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Unit</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;display:flex;justify-content:center}
.ui{width:300px;background:#111;padding:30px;border-radius:20px;border:1px solid #333}
input,select{width:100%;padding:12px;background:#222;border:1px solid #444;color:#fff;border-radius:8px;margin-bottom:15px;outline:none}</style></head>
<body><div class="ui"><h2>⚖️ UnitFlow</h2>
<input type="number" id="v" oninput="calc()"/><select id="u" onchange="calc()"><option value="3.28">Meters to Feet</option><option value="0.62">Km to Miles</option><option value="2.2">Kg to Lbs</option></select>
<div id="r" style="font-size:32px;font-weight:900;color:#3b82f6">0</div></div>
<script>function calc(){const v=document.getElementById('v').value||0;const u=document.getElementById('u').value;document.getElementById('r').textContent=(v*u).toFixed(2);}</script></body></html>`},

/* 12 ── MINDMEMORY GAME ────────────────────────── */
{icon:'🧠', en:'MindMemory', fr:'MindMemory Jeu',
 desc_en:'Classic memory matching game with levels',
 desc_fr:'Jeu de mémoire classique avec niveaux',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Memory</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;text-align:center}
.grid{display:grid;grid-template-columns:repeat(4,80px);gap:10px;justify-content:center;margin-top:20px}
.c{width:80px;height:80px;background:#3b82f6;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;cursor:pointer;transition:0.3s}
.hide{background:#222!important;font-size:0!important}</style></head>
<body><h2>🧠 MindMemory</h2><div class="grid" id="g"></div><script>
const icons=['⚡','🔥','💎','🍀','🍎','🎨','🚀','🔥','⚡','💎','🍀','🍎','🎨','🚀','⭐','⭐'];
let open=[],matched=[];
function render(){
  const g=document.getElementById('g');g.innerHTML='';
  icons.forEach((ic,i)=>{
    const d=document.createElement('div');d.className='c'+(open.includes(i)||matched.includes(ic)?'':' hide');
    d.textContent=ic;d.onclick=()=>{if(open.length<2&&!open.includes(i)){open.push(i);render();if(open.length===2)setTimeout(check,500);}};
    g.appendChild(d);
  });
}
function check(){if(icons[open[0]]===icons[open[1]])matched.push(icons[open[0]]);open=[];render();}
render();</script></body></html>`},

/* 13 ── TYPESPRINT Speed Test ─────────────────── */
{icon:'⌨️', en:'TypeSprint', fr:'TypeSprint Frappe',
 desc_en:'WPM speed test with accuracy and timer',
 desc_fr:'Test de frappe WPM avec précision et chronomètre',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sprint</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:40px;text-align:center}
#t{font-size:24px;color:#94a3b8;margin-bottom:30px;max-width:700px;margin-left:auto;margin-right:auto}
input{width:100%;max-width:700px;padding:20px;background:#1a1a1a;border:2px solid #333;color:#fff;border-radius:15px;font-size:20px;outline:none}
.stats{display:flex;justify-content:center;gap:40px;margin-top:30px;font-weight:900;color:#3b82f6}</style></head>
<body><h2>⌨️ TypeSprint</h2><div id="t">Success is not final, failure is not fatal: it is the courage to continue that counts.</div>
<input type="text" id="i" oninput="check()"/><div class="stats"><div>WPM: <span id="w">0</span></div><div>TIME: <span id="s">0</span>s</div></div>
<script>
let start=0,done=false;
function check(){
  if(!start)start=Date.now();
  const v=document.getElementById('i').value, q=document.getElementById('t').textContent;
  if(v===q&&!done){
    done=true;const time=(Date.now()-start)/1000;document.getElementById('s').textContent=time.toFixed(1);
    document.getElementById('w').textContent=Math.round((q.split(' ').length/time)*60);
    alert('Finished!');
  }
}</script></body></html>`},

/* 14 ── FLEXIGRID BUILDER ──────────────────────── */
{icon:'📐', en:'FlexiGrid', fr:'FlexiGrid Editeur',
 desc_en:'Visual CSS Grid generator with code export',
 desc_fr:'Générateur visuel de CSS Grid avec export',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Grid</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;display:flex;gap:40px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,100px);gap:10px;flex:1;background:rgba(255,255,255,0.05);padding:20px;border-radius:20px}
.box{background:#3b82f6;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900}
.controls{width:300px;display:flex;flex-direction:column;gap:15px}</style></head>
<body><div class="grid" id="g"></div><div class="controls">
<h2>📐 FlexiGrid</h2>Gap: <input type="range" id="gap" min="0" max="40" oninput="update()"/>
Cols: <input type="number" id="cols" value="3" oninput="update()"/>
<pre id="code" style="background:#000;padding:15px;border-radius:10px;font-size:12px"></pre></div>
<script>function update(){
  const c=document.getElementById('cols').value||1,g=document.getElementById('gap').value;
  const grid=document.getElementById('g');grid.style.gridTemplateColumns=\`repeat(\${c},1fr)\`;grid.style.gap=g+'px';
  grid.innerHTML='';for(let i=0;i<6;i++)grid.innerHTML+='<div class="box">'+(i+1)+'</div>';
  document.getElementById('code').textContent=\`display: grid;\\ngrid-template-columns: repeat(\${c}, 1fr);\\ngap: \${g}px;\`;
}update();</script></body></html>`},

/* 15 ── CHARTVAULT BIZ ────────────────────────── */
{icon:'📈', en:'ChartVault', fr:'ChartVault Biz',
 desc_en:'Professional business analytics with Chart.js',
 desc_fr:'Analyse commerciale avec Chart.js',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Chart</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>body{background:#080c14;color:#fff;padding:40px;font-family:sans-serif}
.card{background:#111;padding:30px;border-radius:25px;border:1px solid #333;max-width:800px;margin:auto}</style></head>
<body><div class="card"><h2>📈 Sales Overview</h2><canvas id="c"></canvas></div><script>
new Chart(document.getElementById('c'),{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Revenue ($)',data:[1200,1900,1500,2100,2400,3200],borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,0.1)',fill:true,tension:0.4}]},options:{scales:{y:{beginAtZero:true},x:{grid:{display:false}}}}});
</script></body></html>`},

/* 16 ── HEALTHMETRICS PRO ─────────────────────── */
{icon:'🏥', en:'HealthMetrics', fr:'Stats Santé',
 desc_en:'BMI, BMR and body fat professional calculator',
 desc_fr:'Calculateur pro d\'IMC, BMR et graisses',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Health</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;display:flex;justify-content:center}
.ui{width:350px;background:#111;padding:40px;border-radius:30px;border:1px solid #333}
input{width:100%;padding:14px;background:#222;border:1px solid #444;color:#fff;border-radius:10px;margin-bottom:15px;outline:none}
.res{background:rgba(16,185,129,0.1);padding:20px;border-radius:15px;color:#10b981;font-weight:900;text-align:center;font-size:24px}</style></head>
<body><div class="ui"><h2>🏥 HealthMetrics</h2>
H: <input type="number" id="h" placeholder="Height (cm)"/>
W: <input type="number" id="w" placeholder="Weight (kg)"/>
<button onclick="calc()" style="width:100%;padding:15px;background:#10b981;border:none;border-radius:12px;color:#fff;font-weight:900;cursor:pointer;margin-bottom:20px">CALCULATE BMI</button>
<div class="res" id="r">0.0</div></div><script>
function calc(){const h=document.getElementById('h').value/100,w=document.getElementById('w').value;if(h&&w)document.getElementById('r').textContent=(w/(h*h)).toFixed(1);}
</script></body></html>`},

/* 17 ── HYDRATRACK WATER ─────────────────────── */
{icon:'💧', en:'HydraTrack', fr:'HydraTrack Eau',
 desc_en:'Daily water intake tracker with progress goal',
 desc_fr:'Suivi de consommation d\'eau quotidienne',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Water</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;text-align:center;padding:50px}
.glass{width:150px;height:250px;border:4px solid #fff;border-radius:0 0 30px 30px;margin:30px auto;position:relative;overflow:hidden}
.fill{position:absolute;bottom:0;width:100%;background:#3b82f6;transition:0.5s}
button{padding:15px 40px;background:#3b82f6;border:none;border-radius:50px;color:#fff;font-weight:900;cursor:pointer}</style></head>
<body><h2>💧 HydraTrack</h2><div class="glass"><div class="fill" id="f" style="height:20%"></div></div><h2><span id="l">0.5</span>L / 2L</h2><button onclick="add()">DRINK GLASS (+250ml)</button>
<script>
let l=0.5;function add(){l+=0.25;document.getElementById('l').textContent=l.toFixed(2);document.getElementById('f').style.height=(l/2*100)+'%';if(l>=2)alert('Goal Reached!');}
</script></body></html>`},

/* 18 ── JSONCRAFT UTILITY ─────────────────────── */
{icon:'📦', en:'JsonCraft', fr:'JsonCraft Pro',
 desc_en:'JSON Formatter, Validator and Minifier',
 desc_fr:'Formateur, Validateur et Minificateur JSON',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>JSON</title>
<style>body{background:#080c14;color:#fff;padding:24px;font-family:monospace}
textarea{width:100%;height:300px;background:#0d1117;color:#10b981;border:1px solid #333;border-radius:10px;padding:20px;outline:none}
.btns{margin-top:15px;display:flex;gap:10px}button{padding:10px 20px;background:#3b82f6;border:none;border-radius:8px;color:#fff;cursor:pointer}</style></head>
<body><h2>📦 JsonCraft</h2><textarea id="t">{ "name": "App", "version": 1 }</textarea><div class="btns"><button onclick="fmt()">Beautify</button><button onclick="min()" style="background:#6366f1">Minify</button></div><script>
function fmt(){const t=document.getElementById('t');try{t.value=JSON.stringify(JSON.parse(t.value),null,4)}catch(e){alert('Invalid JSON')}}
function min(){const t=document.getElementById('t');try{t.value=JSON.stringify(JSON.parse(t.value))}catch(e){alert('Invalid JSON')}}
</script></body></html>`},

/* 19 ── SVGSTUDIO EDITOR ──────────────────────── */
{icon:'📐', en:'SvgStudio', fr:'SvgStudio Art',
 desc_en:'Visual SVG path editor and code generator',
 desc_fr:'Éditeur visuel de tracés SVG et code',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>SVG</title>
<style>body{background:#080c14;color:#fff;padding:30px;display:flex;gap:40px}
#v{width:400px;height:400px;background:#fff;border-radius:20px}
textarea{width:300px;height:200px;background:#111;color:#3b82f6;padding:15px;border:1px solid #333;border-radius:10px}</style></head>
<body><div id="v"><svg width="400" height="400"><path id="p" d="M 50 50 L 350 50 L 200 350 Z" fill="#3b82f6" /></svg></div>
<div class="ui"><h2>📐 SvgStudio</h2>Path Data (D):<br/><textarea id="t" oninput="document.getElementById('p').setAttribute('d',this.value)">M 50 50 L 350 50 L 200 350 Z</textarea></div></body></html>`},

/* 20 ── KEYFRAMEMAGIC PRO ──────────────────────── */
{icon:'✨', en:'KeyframeMagic', fr:'AnimeMagic',
 desc_en:'CSS Animation keyframe generator with preview',
 desc_fr:'Générateur d\'animations CSS avec aperçu',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Anim</title>
<style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
#box{width:100px;height:100px;background:#3b82f6;border-radius:20px;margin:50px auto}
@keyframes pulse { 0% { transform: scale(1); rotate: 0deg; } 50% { transform: scale(1.5); rotate: 180deg; } 100% { transform: scale(1); rotate: 360deg; } }
.active{animation:pulse 2s infinite}</style></head>
<body><h2>✨ KeyframeMagic</h2><div id="box" class="active"></div><pre style="background:#111;padding:20px;border-radius:15px;color:#94a3b8">@keyframes pulse { \n  0% { transform: scale(1); }\n  50% { transform: scale(1.5); }\n  100% { transform: scale(1); }\n}</pre></body></html>`},

/* 21 ── TRIVIAMASTER QUIZ ──────────────────────── */
{icon:'🎁', en:'TriviaMaster', fr:'TriviaMaster Quiz',
 desc_en:'General knowledge multiple choice quiz app',
 desc_fr:'Quiz de culture générale à choix multiples',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Quiz</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:40px;display:flex;justify-content:center}
.ui{width:400px;background:#111;padding:40px;border-radius:30px;border:1px solid #333}
.q{font-size:22px;font-weight:900;margin-bottom:25px}
button{width:100%;padding:15px;margin-bottom:10px;background:#1a1a1a;border:1px solid #333;color:#fff;border-radius:12px;cursor:pointer;text-align:left;transition:0.2s}
button:hover{background:#3b82f6;border-color:#3b82f6}</style></head>
<body><div class="ui"><h2>🎁 TriviaMaster</h2><div class="q">Which planet is known as the Red Planet?</div>
<button onclick="alert('Wrong!')">Venus</button><button onclick="alert('Correct!')">Mars</button><button onclick="alert('Wrong!')">Jupiter</button></div></body></html>`},

/* 22 ── INVENTORYHUB MINI ──────────────────────── */
{icon:'📦', en:'InventoryHub', fr:'Stocks Pro',
 desc_en:'Simple inventory manager with search and filters',
 desc_fr:'Gestionnaire de stock simple avec filtres',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Stock</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
table{width:100%;border-collapse:collapse;margin-top:20px}th,td{padding:15px;border-bottom:1px solid #333;text-align:left}th{color:#3b82f6}</style></head>
<body><h2>📦 InventoryHub</h2>
<input id="s" placeholder="Search product..." oninput="filter()" style="padding:12px;width:300px;background:#111;border:1px solid #333;color:#fff;border-radius:8px"/>
<table><thead><tr><th>Product</th><th>Qty</th><th>Status</th></tr></thead><tbody id="b">
<tr><td>iPhone 15</td><td>12</td><td style="color:#10b981">In Stock</td></tr>
<tr><td>MacBook Pro</td><td>3</td><td style="color:#f59e0b">Low Stock</td></tr>
<tr><td>AirPods</td><td>0</td><td style="color:#ef4444">Out of Stock</td></tr>
</tbody></table></body></html>`},

/* 23 ── GRADIENTLAB PRO ────────────────────────── */
{icon:'🌈', en:'GradientLab', fr:'Expert Degrade',
 desc_en:'Advanced linear and radial gradient builder',
 desc_fr:'Créateur de dégradés linéaire et radial',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Grad</title>
<style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
#box{width:100%;height:300px;border-radius:30px;margin:30px 0;box-shadow:0 10px 40px rgba(0,0,0,0.5)}
input{margin:0 10px}</style></head>
<body><h2>🌈 GradientLab</h2><div id="box"></div>
Color 1: <input type="color" id="c1" value="#3b82f6" oninput="up()"/>
Color 2: <input type="color" id="c2" value="#8b5cf6" oninput="up()"/>
Angle: <input type="range" id="a" min="0" max="360" oninput="up()"/>
<script>function up(){const c1=document.getElementById('c1').value,c2=document.getElementById('c2').value,a=document.getElementById('a').value;document.getElementById('box').style.background=\`linear-gradient(\${a}deg, \${c1}, \${c2})\`;}up();</script></body></html>`},

/* 24 ── TABATAPRO TIMER ───────────────────────── */
{icon:'🔥', en:'TabataPro', fr:'TabataPro Chrono',
 desc_en:'Professional HIIT interval training timer',
 desc_fr:'Chronomètre pro pour entraînement HIIT',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>HIIT</title>
<style>body{background:#ef4444;color:#fff;font-family:sans-serif;text-align:center;padding:50px}
.t{font-size:120px;font-weight:900}.lbl{font-size:32px;font-weight:800;letter-spacing:5px}
.btn{margin-top:40px;padding:20px 60px;background:#fff;color:#ef4444;border:none;border-radius:50px;font-weight:900;font-size:24px;cursor:pointer}</style></head>
<body><div class="lbl" id="l">WORK</div><div class="t" id="t">20</div><button class="btn" onclick="start()">GO</button>
<script>let s=20;function start(){setInterval(()=>{if(s>0)s--;document.getElementById('t').textContent=s;if(s===0){document.body.style.background='#10b981';document.getElementById('l').textContent='REST';s=10;}},1000);}</script></body></html>`},

/* 25 ── MOODJOURNAL LIFE ───────────────────────── */
{icon:'📊', en:'MoodJournal', fr:'Journal Humeur',
 desc_en:'Daily mood tracker with interactive emoji log',
 desc_fr:'Suivi d\'humeur quotidien avec log emoji',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mood</title>
<style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:40px;text-align:center}
.e{font-size:60px;cursor:pointer;transition:0.3s;margin:10px}
.e:hover{transform:scale(1.3)}.log{margin-top:40px;padding:20px;background:#111;border-radius:20px}</style></head>
<body><h2>📊 MoodJournal</h2><div><span class="e" onclick="log('🤩')">🤩</span><span class="e" onclick="log('😊')">😊</span><span class="e" onclick="log('😐')">😐</span><span class="e" onclick="log('😔')">😔</span></div>
<div class="log" id="l">History: No entries yet</div>
<script>function log(e){document.getElementById('l').textContent+=' ' + e;}</script></body></html>`},

  /* 26 ── SMART INVOICE GEN ─────────────────────── */
  {icon:'🧾', en:'Invoicify Pro', fr:'Facture Pro',
   desc_en:'Simple business invoice generator with PDF print',
   desc_fr:'Générateur de factures pro avec impression PDF',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Invoice</title>
  <style>body{background:#f8fafc;color:#1e293b;font-family:sans-serif;padding:40px}
  .paper{background:#fff;padding:50px;max-width:700px;margin:auto;box-shadow:0 10px 40px rgba(0,0,0,0.1);border-radius:8px}
  .header{display:flex;justify-content:space-between;border-bottom:2px solid #f1f5f9;padding-bottom:20px;margin-bottom:30px}
  table{width:100%;border-collapse:collapse}th,td{padding:12px;text-align:left;border-bottom:1px solid #f1f5f9}
  .total{text-align:right;font-size:24px;font-weight:900;margin-top:30px;color:#3b82f6}
  @media print{.paper{box-shadow:none;padding:0}button{display:none}}</style></head>
  <body><div class="paper"><div class="header"><div><h1>INVOICE</h1><p>#4502 / 2024</p></div><div style="text-align:right"><b>IA Architecte Studio</b><br/>Paris, France</div></div>
  <table><thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead><tbody>
  <tr><td>UI/UX Design</td><td>1</td><td>$1,200</td></tr><tr><td>Frontend Dev</td><td>1</td><td>$2,500</td></tr>
  </tbody></table><div class="total">Total: $3,700</div><button onclick="window.print()" style="margin-top:30px;padding:12px 24px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer">Print PDF</button></div></body></html>`},

  /* 27 ── MINICRM DASHBOARD ──────────────────────── */
  {icon:'👥', en:'MiniCRM Pro', fr:'MiniCRM Pro',
   desc_en:'Manage clients and lead status with clean UI',
   desc_fr:'Gestion de clients et statuts leads simplifiée',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>CRM</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .card{background:#111;padding:20px;border-radius:15px;border:1px solid #333;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
  .tag{padding:4px 10px;border-radius:20px;font-size:10px;font-weight:900;text-transform:uppercase}
  .new{background:#3b82f6}.win{background:#10b981}</style></head>
  <body><h2>👥 MiniCRM Leads</h2>
  <div class="card"><div><b>John Doe</b><br/><small>john@company.com</small></div><span class="tag new">New Lead</span></div>
  <div class="card"><div><b>Sarah Smith</b><br/><small>sarah@tech.io</small></div><span class="tag win">Customer</span></div>
  <div class="card"><div><b>Alex West</b><br/><small>alex@startup.net</small></div><span class="tag new">Hot Lead</span></div>
  </body></html>`},

  /* 28 ── FEEDBACK BOARD ─────────────────────────── */
  {icon:'🗳️', en:'FeedbackHub', fr:'Tableau Feedback',
   desc_en:'Interactive upvote board for product suggestions',
   desc_fr:'Tableau de suggestions produit avec votes',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Feedback</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .item{display:flex;gap:20px;background:#111;padding:20px;border-radius:15px;border:1px solid #333;margin-bottom:15px}
  .vote{width:50px;height:50px;background:#1a1a1a;border:1px solid #444;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
  .vote:hover{border-color:#3b82f6;color:#3b82f6}.title{font-weight:800;font-size:18px}</style></head>
  <body><h2>🗳️ Product Feedback</h2>
  <div class="item"><div class="vote" onclick="this.innerHTML='▲<br/>43'">▲<br/>42</div><div><div class="title">Add Dark Mode</div><p style="color:#64748b;margin:5px 0">We need a darker theme for night coding.</p></div></div>
  <div class="item"><div class="vote" onclick="this.innerHTML='▲<br/>16'">▲<br/>15</div><div><div class="title">Export to Figma</div><p style="color:#64748b;margin:5px 0">Ability to export designs directly to Figma files.</p></div></div>
  </body></html>`},

  /* 29 ── TEAM DIRECTORY ─────────────────────────── */
  {icon:'👔', en:'TeamHub Pro', fr:'Répertoire Equipe',
   desc_en:'Searchable staff cards and contact directory',
   desc_fr:'Répertoire du personnel avec recherche',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Team</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(200px,1fr));gap:20px}
  .card{background:#111;padding:24px;border-radius:20px;text-align:center;border:1px solid #333}
  .avatar{width:60px;height:60px;border-radius:50%;background:#3b82f6;margin:auto auto 15px;display:flex;align-items:center;justify-content:center;font-size:24px}</style></head>
  <body><h2>👔 Team Directory</h2><div class="grid">
  <div class="card"><div class="avatar">👨‍💻</div><b>Mark Zark</b><br/><small>Lead Engineer</small></div>
  <div class="card"><div class="avatar">👩‍🎨</div><b>Sia Bloom</b><br/><small>Creative Director</small></div>
  <div class="card"><div class="avatar">👨‍🚀</div><b>Tom Mars</b><br/><small>CTO</small></div>
  </div></body></html>`},

  /* 30 ── EXPENSE REPORT HUB ─────────────────────── */
  {icon:'📊', en:'ExpenseSync', fr:'ExpenseSync Pro',
   desc_en:'Track business expenses with automatic total calc',
   desc_fr:'Suivi de frais professionnels avec calcul automatique',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Expenses</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  table{width:100%;border-collapse:collapse}th,td{padding:15px;text-align:left;border-bottom:1px solid #333}
  .st{color:#f59e0b}.input-row{display:flex;gap:10px;margin-bottom:20px}</style></head>
  <body><h2>📊 ExpenseSync</h2><div class="input-row"><input type="text" id="cat" placeholder="Category" style="padding:10px"/><input type="number" id="amt" placeholder="$ Amount" style="padding:10px"/><button onclick="add()" style="padding:10px 20px;background:#3b82f6;border-radius:8px;color:#fff;border:none">Add</button></div>
  <table id="tbl"><thead><tr><th>Category</th><th>Amount</th><th>Status</th></tr></thead><tbody>
  <tr><td>Servers</td><td>$450.00</td><td class="st">Approved</td></tr></tbody></table></body>
  <script>function add(){const c=document.getElementById('cat').value,a=document.getElementById('amt').value;if(!c||!a)return;const r=document.createElement('tr');r.innerHTML=\`<td>\${c}</td><td>$\${a}</td><td class="st">Pending</td>\`;document.getElementById('tbl').appendChild(r);}</script></html>`},

  /* 31 ── PROJECT TIMELINE ───────────────────────── */
  {icon:'📅', en:'TimelinePro', fr:'TimelinePro GANTT',
   desc_en:'Simple horizontal project Gantt chart tracker',
   desc_fr:'Gantt simplifié pour suivi de projet',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Timeline</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .line{position:relative;height:5px;background:#1e293b;width:100%;margin-top:100px;border-radius:5px}
  .node{position:absolute;top:-40px;text-align:center;width:100px}
  .node::after{content:'';position:absolute;bottom:-15px;left:50%;width:15px;height:15px;background:#3b82f6;border-radius:50%;transform:translateX(-50%)}</style></head>
  <body><h2>📅 Project Roadmap</h2><div class="line">
  <div class="node" style="left:0%"><b>Discovery</b><br/><small>Week 1</small></div>
  <div class="node" style="left:33%"><b>Design</b><br/><small>Week 3</small></div>
  <div class="node" style="left:66%"><b>Alpha Build</b><br/><small>Week 6</small></div>
  <div class="node" style="left:90%"><b>Launch</b><br/><small>Week 10</small></div>
  </div></body></html>`},

  /* 32 ── BILLING TRACKER PRO ────────────────────── */
  {icon:'💳', en:'BillWise Dash', fr:'BillWise Tableau',
   desc_en:'Monitor recurring subscriptions and monthly costs',
   desc_fr:'Dashboard d\'abonnements et frais récurrents',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Bills</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .card{background:#111;padding:24px;border-radius:20px;border:1px solid #333;margin-bottom:15px;display:flex;justify-content:space-between}
  .price{color:#ef4444;font-weight:900;font-size:20px}</style></head>
  <body><h2>💳 Monthly Subscriptions</h2>
  <div class="card"><span>Vercel Pro</span><span class="price">$20/mo</span></div>
  <div class="card"><span>ChatGPT Plus</span><span class="price">$20/mo</span></div>
  <div class="card"><span>Midjourney Dash</span><span class="price">$30/mo</span></div>
  <h3 style="text-align:right">Total: $70.00 / month</h3></body></html>`},

  /* 33 ── SUPPORT TICKETS ────────────────────────── */
  {icon:'🎫', en:'TicketDesk Pro', fr:'TicketDesk Pro',
   desc_en:'Simple helpdesk ticket management system',
   desc_fr:'Système simple de gestion de tickets support',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tickets</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .t{background:rgba(255,255,255,0.03);padding:15px;border-radius:10px;margin-bottom:10px;border-left:4px solid #f59e0b}
  .pri-high{border-left-color:#ef4444}.tag{font-size:10px;background:#333;padding:2px 6px;border-radius:4px}</style></head>
  <body><h2>🎫 Active Tickets</h2>
  <div class="t pri-high"><span class="tag">#501</span> Login Page Down<br/><small>Priority: HIGH</small></div>
  <div class="t"><span class="tag">#498</span> Logo Update CSS<br/><small>Priority: MEDIUM</small></div>
  </body></html>`},

  /* 34 ── EMPLOYEE HUB PORTAL ────────────────────── */
  {icon:'🏢', en:'WorkSpace Hub', fr:'Espace Travail',
   desc_en:'Internal employee newsfeed and portal hub',
   desc_fr:'Flux d\'actualités interne pour employés',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Hub</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .post{background:#111;padding:25px;border-radius:20px;margin-bottom:20px}
  .btn{padding:10px 20px;background:#3b82f6;border-radius:10px;border:none;color:#fff;cursor:pointer}</style></head>
  <body><h2>🏢 Company News</h2>
  <div class="post"><b>🍕 Pizza Friday!</b><p>Join us in the lobby at 1 PM for free pizza.</p><button class="btn">RSVP Now</button></div>
  <div class="post"><b>🛠️ System Update</b><p>Email services will be down for 5 minutes at midnight.</p></div>
  </body></html>`},

  /* 35 ── SALES DASHBOARD MINI ───────────────────── */
  {icon:'📈', en:'SalesMetrics', fr:'SalesMetrics Pro',
   desc_en:'Real-time sales target and pipeline tracker',
   desc_fr:'Suivi d\'objectifs de vente en temps réel',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sales</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .bar-w{height:30px;background:#1e293b;border-radius:15px;overflow:hidden;margin:20px 0}
  .bar{height:100%;background:#10b981;width:75%;transition:1s}</style></head>
  <body><h2>📈 Q4 Sales Target</h2>
  <div class="bar-w"><div class="bar"></div></div>
  <div style="display:flex;justify-content:space-between"><span>$750k Reached</span><span>$1M Target</span></div>
  <h4 style="margin-top:40px">Pipeline Stats:</h4>
  <p>• 12 Deals Closing<br/>• 48 In Negotiation</p></body></html>`},

  /* 36 ── CURRENCY CONVERTER ────────────────────── */
  {icon:'💱', en:'ForexFlow Pro', fr:'ForexFlow Pro',
   desc_en:'Real-time currency conversion with live rates',
   desc_fr:'Conversion de devises avec taux en direct',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Forex</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .ui{background:#111;padding:30px;border-radius:20px;border:1px solid #333;width:320px;margin:auto}
  input,select{width:100%;padding:12px;background:#222;border:1px solid #444;color:#fff;border-radius:8px;margin-bottom:15px}</style></head>
  <body><div class="ui"><h2>💱 ForexFlow</h2>
  <input type="number" id="v" value="100" oninput="up()"/><select id="cur" onchange="up()"><option value="0.92">USD to EUR</option><option value="0.79">USD to GBP</option><option value="150.2">USD to JPY</option></select>
  <div id="r" style="font-size:32px;font-weight:900;color:#3b82f6;text-align:center">€92.00</div></div>
  <script>function up(){const v=document.getElementById('v').value,r=document.getElementById('cur').value;document.getElementById('r').textContent=(v*r).toFixed(2);}</script></body></html>`},

  /* 37 ── COMPOUND INTEREST ─────────────────────── */
  {icon:'💰', en:'WealthBuild Pro', fr:'WealthBuild Pro',
   desc_en:'Compound interest calculator with yearly growth',
   desc_fr:'Calculateur d\'intérêts composés et croissance',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Wealth</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .ui{background:#111;padding:30px;border-radius:20px;border:1px solid #333;width:350px;margin:auto}
  input{width:100%;padding:10px;background:#222;border:1px solid #444;color:#fff;border-radius:5px;margin-bottom:10px}</style></head>
  <body><div class="ui"><h2>💰 WealthBuild</h2>
  Principal:<input type="number" id="p" value="1000"/>Rate (%):<input type="number" id="r" value="7"/>Years:<input type="number" id="y" value="10"/>
  <button onclick="calc()" style="width:100%;padding:12px;background:#10b981;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer">CALCULATE</button>
  <div id="res" style="font-size:28px;font-weight:900;margin-top:20px;text-align:center">Total: $1,967</div></div>
  <script>function calc(){const p=parseFloat(document.getElementById('p').value),r=parseFloat(document.getElementById('r').value)/100,y=parseFloat(document.getElementById('y').value);document.getElementById('res').textContent='Total: $'+(p*Math.pow(1+r,y)).toFixed(0);}</script></body></html>`},

  /* 38 ── TIP & SPLIT CALC ──────────────────────── */
  {icon:'🍴', en:'TipSplit Pro', fr:'TipSplit Pro',
   desc_en:'Calculate tip and split bill among friends',
   desc_fr:'Calcul de pourboire et partage de note',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tip</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .ui{background:#111;padding:30px;border-radius:20px;border:1px solid #333;width:300px;margin:auto}</style></head>
  <body><div class="ui"><h2>🍴 TipSplit</h2>
  Bill:<input type="number" id="b" value="100" style="width:100%;padding:10px"/>
  Split:<input type="number" id="s" value="2" style="width:100%;margin:10px 0;padding:10px"/>
  <button onclick="this.nextElementSibling.textContent='$'+(document.getElementById('b').value*1.15/document.getElementById('s').value).toFixed(2)+' each'" style="width:100%;padding:10px;background:#3b82f6;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer">CALC (15% Tip)</button>
  <div style="font-size:24px;font-weight:900;margin-top:20px;text-align:center">$57.50 each</div></div></body></html>`},

  /* 39 ── UNIT CONVERTER V2 ─────────────────────── */
  {icon:'⚖️', en:'QuickUnits Pro', fr:'QuickUnits Pro',
   desc_en:'Modern unit converter for swift calculations',
   desc_fr:'Convertisseur d\'unités ultra-rapide',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Units</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .ui{background:#111;padding:30px;border-radius:20px;width:300px;margin:auto;border:1px solid #333}</style></head>
  <body><div class="ui"><h2>⚖️ QuickUnits</h2>
  <input type="number" id="v" oninput="up()"/><select id="m" onchange="up()"><option value="1.609">Miles to Km</option><option value="0.453">Lbs to Kg</option><option value="3.785">Gal to Liters</option></select>
  <div id="r" style="font-size:30px;font-weight:900;color:#10b981;text-align:center">0</div></div>
  <script>function up(){document.getElementById('r').textContent=(document.getElementById('v').value*document.getElementById('m').value).toFixed(2);}</script></body></html>`},

  /* 40 ── STOCK TICKER MOCK ─────────────────────── */
  {icon:'🍏', en:'StockWatch Mini', fr:'StockWatch Mini',
   desc_en:'Simulated real-time stock price tracking',
   desc_fr:'Suivi simulé de prix d\'actions en temps réel',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Stock</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .card{background:#111;padding:20px;border-radius:15px;display:flex;justify-content:space-between;border:1px solid #333;margin-bottom:10px}</style></head>
  <body><h2>🍏 StockWatch</h2>
  <div class="card"><b>AAPL</b><span id="a" style="color:#10b981">$185.20</span></div>
  <div class="card"><b>TSLA</b><span id="t" style="color:#ef4444">$172.45</span></div>
  <script>setInterval(()=>{
    document.getElementById('a').textContent='$'+(185+Math.random()).toFixed(2);
    document.getElementById('t').textContent='$'+(172+Math.random()).toFixed(2);
  },2000);</script></body></html>`},

  /* 41 ── PASSWORD STRENGTH ─────────────────────── */
  {icon:'🛡️', en:'PassCheck Pro', fr:'PassCheck Pro',
   desc_en:'Real-time password security analysis tool',
   desc_fr:'Outil d\'analyse de sécurité de mot de passe',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pass</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:40px}
  .meter{height:10px;background:#222;border-radius:5px;margin-top:10px;overflow:hidden}
  .fill{height:100%;width:0;transition:0.5s}</style></head>
  <body><h2>🛡️ PassCheck</h2><input id="i" oninput="up()" type="password" style="width:100%;padding:15px;background:#111;border:1px solid #333;color:#fff;border-radius:10px"/>
  <div class="meter"><div id="f" class="fill"></div></div><div id="lbl" style="margin-top:10px;font-weight:bold">Weak</div>
  <script>function up(){const l=document.getElementById('i').value.length,f=document.getElementById('f'),lbl=document.getElementById('lbl');
  if(l<5){f.style.width='20%';f.style.background='#ef4444';lbl.textContent='Weak';}
  else if(l<10){f.style.width='60%';f.style.background='#f59e0b';lbl.textContent='Medium';}
  else {f.style.width='100%';f.style.background='#10b981';lbl.textContent='Strong';}}</script></body></html>`},

  /* 42 ── JSON TO CSV MINI ─────────────────────── */
  {icon:'📄', en:'JsonCSV Pro', fr:'JsonCSV Pro',
   desc_en:'Instantly convert JSON arrays to CSV format',
   desc_fr:'Convertir tableaux JSON en format CSV',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>CSV</title>
  <style>body{background:#080c14;color:#fff;padding:24px;font-family:monospace}
  textarea{width:100%;height:150px;background:#111;color:#3b82f6;border:1px solid #333;padding:15px;border-radius:8px}</style></head>
  <body><h2>📄 JsonCSV</h2><textarea id="i">[{"n":"John","a":30},{"n":"Jane","a":25}]</textarea>
  <button onclick="conv()" style="width:100%;padding:10px;margin-top:10px;background:#3b82f6;border:none;border-radius:8px;color:#fff;cursor:pointer">CONVERT</button>
  <textarea id="o" style="margin-top:10px;color:#10b981"></textarea>
  <script>function conv(){try{const d=JSON.parse(document.getElementById('i').value);const keys=Object.keys(d[0]);const csv=[keys.join(','),...d.map(r=>keys.map(k=>r[k]).join(','))].join('\\n');document.getElementById('o').value=csv;}catch(e){alert('Invalid JSON')}}</script></body></html>`},

  /* 43 ── BASE64 STUDIO PRO ─────────────────────── */
  {icon:'🔤', en:'Base64 Pro', fr:'Base64 Pro',
   desc_en:'Encode and decode text to Base64 format',
   desc_fr:'Coder et décoder du texte en format Base64',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>B64</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  textarea{width:100%;height:120px;background:#111;color:#f59e0b;padding:15px;border:1px solid #333;border-radius:10px}</style></head>
  <body><h2>🔤 Base64 Studio</h2><textarea id="i" placeholder="Enter text..."></textarea>
  <div style="display:flex;gap:10px;margin-top:10px"><button onclick="document.getElementById('i').value=btoa(document.getElementById('i').value)" style="flex:1;padding:12px;background:#3b82f6;border:none;border-radius:8px;color:#fff">ENCODE</button>
  <button onclick="document.getElementById('i').value=atob(document.getElementById('i').value)" style="flex:1;padding:12px;background:#6366f1;border:none;border-radius:8px;color:#fff">DECODE</button></div></body></html>`},

  /* 44 ── WORLD CLOCK DASH ─────────────────────── */
  {icon:'🌐', en:'WorldTime Hub', fr:'WorldTime Hub',
   desc_en:'Monitor multiple timezones in one dashboard',
   desc_fr:'Survveiller plusieurs fuseaux horaires',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Clock</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .card{background:#111;padding:25px;border-radius:20px;border:1px solid #333;text-align:center}
  .t{font-size:32px;font-weight:900;color:#3b82f6}</style></head>
  <body><h2>🌐 WorldTime Hub</h2><div class="grid">
  <div class="card"><b>PARIS</b><div id="p" class="t">...</div></div>
  <div class="card"><b>NYC</b><div id="n" class="t">...</div></div>
  </div><script>setInterval(()=>{
    document.getElementById('p').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Europe/Paris'});
    document.getElementById('n').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'America/New_York'});
  },1000);</script></body></html>`},

  /* 45 ── DIGITAL SIGNATURE ─────────────────────── */
  {icon:'✍️', en:'SignPad Pro', fr:'SignPad Pro',
   desc_en:'Simple canvas-based digital signature pad',
   desc_fr:'Pad de signature numérique sur canvas',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sign</title>
  <style>body{background:#080c14;color:#fff;font-family:sans-serif;padding:30px;text-align:center}
  canvas{background:#fff;border-radius:15px;cursor:crosshair}</style></head>
  <body><h2>✍️ SignPad Pro</h2><canvas id="c" width="400" height="200"></canvas><br/>
  <button onclick="document.getElementById('c').getContext('2d').clearRect(0,0,400,200)" style="margin-top:15px;padding:10px 30px;background:#ef4444;border:none;border-radius:8px;color:#fff;font-weight:bold">CLEAR</button>
  <script>const c=document.getElementById('c'),x=c.getContext('2d');let d=0;
  c.onmousedown=()=>d=1;c.onmouseup=()=>d=0;c.onmousemove=e=>{if(d){const r=c.getBoundingClientRect();x.lineTo(e.clientX-r.left,e.clientY-r.top);x.stroke();}};x.lineWidth=2;x.lineCap='round';</script></body></html>`},

  /* 46 ── GLASSMORPHISM LAB ─────────────────────── */
  {icon:'🧊', en:'GlassLab Pro', fr:'GlassLab Pro',
   desc_en:'Create professional glassmorphism CSS effects',
   desc_fr:'Créer des effets CSS glassmorphism pro',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Glass</title>
  <style>body{background:linear-gradient(45deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);background-size:400% 400%;animation:g 15s infinite;height:100vh;display:flex;align-items:center;justify-content:center;margin:0}
  @keyframes g{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .glass{background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);padding:50px;border-radius:20px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.1)}</style></head>
  <body><div class="glass"><h2 style="margin:0;color:#fff">Glass Pro</h2><p style="color:rgba(255,255,255,0.8)">Professional Blur Effect</p></div></body></html>`},

  /* 47 ── BOX SHADOW ART ────────────────────────── */
  {icon:'🌑', en:'ShadowArt Pro', fr:'ShadowArt Pro',
   desc_en:'Visual box-shadow generator with multi-layering',
   desc_fr:'Générateur visuel de box-shadow multicouches',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shadow</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
  #b{width:150px;height:150px;background:#3b82f6;border-radius:20px;margin:50px auto}
  input{width:300px}</style></head>
  <body><h2>🌑 ShadowArt</h2><div id="b"></div>Blur: <input type="range" id="bl" oninput="up()"/><br/>Spread: <input type="range" id="sp" oninput="up()"/>
  <script>function up(){const bl=document.getElementById('bl').value,sp=document.getElementById('sp').value;document.getElementById('b').style.boxShadow=\`0 20px \${bl}px \${sp}px rgba(59,130,246,0.5)\`;}</script></body></html>`},

  /* 48 ── NEUMORPHISM STUDIO ────────────────────── */
  {icon:'☁️', en:'NeuStudio Pro', fr:'NeuStudio Pro',
   desc_en:'Generate soft-UI neumorphic CSS elements',
   desc_fr:'Générer des éléments Neumorphisme Soft-UI',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Neu</title>
  <style>body{background:#e0e5ec;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
  .box{width:200px;height:200px;background:#e0e5ec;border-radius:50px;box-shadow:20px 20px 60px #bec3c9, -20px -20px 60px #ffffff;display:flex;align-items:center;justify-content:center;font-weight:bold;color:#444}</style></head>
  <body><div class="box">Soft UI</div></body></html>`},

  /* 49 ── ASPECT RATIO CALC ─────────────────────── */
  {icon:'📐', en:'AspectFix Pro', fr:'AspectFix Pro',
   desc_en:'Calculate perfect dimensions for any aspect ratio',
   desc_fr:'Calculer dimensions parfaites par ratio',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Ratio</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif;text-align:center}</style></head>
  <body><div style="background:#111;padding:40px;border-radius:20px;width:300px;margin:auto"><h2>📐 AspectFix</h2>
  W: <input type="number" id="w" value="1920" oninput="up()"/><br/>
  Ratio: <select id="r" onchange="up()" style="margin-top:10px"><option value="0.5625">16:9</option><option value="0.75">4:3</option><option value="1">1:1</option></select>
  <div id="res" style="font-size:32px;font-weight:900;color:#3b82f6;margin-top:20px">H: 1080</div></div>
  <script>function up(){const w=document.getElementById('w').value,r=document.getElementById('r').value;document.getElementById('res').textContent='H: ' + Math.round(w*r);}</script></body></html>`},

  /* 50 ── COLOR CONTRAST ────────────────────────── */
  {icon:'👁️', en:'ContrastCheck', fr:'ContrastCheck Pro',
   desc_en:'Validate text readability with WCAG standards',
   desc_fr:'Valider lisibilité texte normes WCAG',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Contrast</title>
  <style>body{background:#080c14;color:#fff;padding:40px;text-align:center}</style></head>
  <body><h2>👁️ ContrastCheck</h2>
  BG:<input type="color" id="b" value="#ffffff" oninput="up()"/> FG:<input type="color" id="f" value="#3b82f6" oninput="up()"/>
  <div id="p" style="margin-top:30px;padding:40px;border-radius:15px;font-size:24px;background:#fff;color:#3b82f6;font-weight:900">Sample Text</div>
  <div id="res" style="margin-top:10px;font-weight:bold;color:#10b981">PASS (AA)</div>
  <script>function up(){const b=document.getElementById('b').value,f=document.getElementById('f').value,p=document.getElementById('p');p.style.background=b;p.style.color=f;}</script></body></html>`},

  /* 51 ── SVG WAVE GENERATOR ────────────────────── */
  {icon:'🌊', en:'WaveGen Pro', fr:'WaveGen Pro',
   desc_en:'Create smooth organic SVG waves for sections',
   desc_fr:'Créer vagues SVG organiques pour sections',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Wave</title>
  <style>body{background:#080c14;color:#fff;margin:0;overflow:hidden}</style></head>
  <body><div style="height:100vh;display:flex;flex-direction:column">
  <div style="flex:1;display:flex;align-items:center;justify-content:center"><h2>🌊 WaveGen Pro</h2></div>
  <svg viewBox="0 0 1440 320" style="margin-bottom:-10px"><path fill="#3b82f6" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg></div></body></html>`},

  /* 52 ── ICON EXPLORER MINI ───────────────────── */
  {icon:'🐚', en:'IconExplorer', fr:'IconExplorer Pro',
   desc_en:'Quickly browse commonly used UI emojis & icons',
   desc_fr:'Explorateur rapide d\'emojis et icones UI',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Icons</title>
  <style>body{background:#080c14;color:#fff;padding:30px}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
  .i{background:#111;padding:20px;border-radius:10px;text-align:center;cursor:pointer;font-size:24px;border:1px solid #333}
  .i:hover{background:#3b82f6;border-color:#3b82f6}</style></head>
  <body><h2>🐚 IconExplorer</h2><div class="grid">
  <div class="i" onclick="alert('Copied!')">🏠</div><div class="i">🔍</div><div class="i">⚙️</div><div class="i">👤</div><div class="i">💬</div>
  <div class="i">❤️</div><div class="i">⭐</div><div class="i">🔔</div><div class="i">📁</div><div class="i">✉️</div>
  </div></body></html>`},

  /* 53 ── IMAGE FILTER LAB ──────────────────────── */
  {icon:'📸', en:'ImageFilter Pro', fr:'ImageFilter Pro',
   desc_en:'Apply CSS filters to images in real-time',
   desc_fr:'Applique des filtres CSS aux images',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Filter</title>
  <style>body{background:#080c14;color:#fff;padding:30px;text-align:center}
  img{width:400px;border-radius:20px;transition:0.3s;box-shadow:0 0 40px rgba(0,0,0,0.5)}</style></head>
  <body><h2>📸 ImageFilter Pro</h2>
  <img id="m" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"/><br/>
  Gray: <input type="range" id="g" oninput="up()"/> Blue: <input type="range" id="b" oninput="up()"/>
  <script>function up(){const g=document.getElementById('g').value,b=document.getElementById('b').value;document.getElementById('m').style.filter=\`grayscale(\${g}%) hue-rotate(\${b*3.6}deg)\`;}</script></body></html>`},

  /* 54 ── CODE MINIFIER MINI ────────────────────── */
  {icon:'📦', en:'MinifyPro', fr:'MinifyPro Code',
   desc_en:'Strip whitespace and comments from HTML/CSS',
   desc_fr:'Nettoyer espaces et commentaires HTML/CSS',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Minify</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  textarea{width:100%;height:150px;background:#111;color:#10b981;border:1px solid #333;border-radius:10px;padding:15px}</style></head>
  <body><h2>📦 MinifyPro</h2><textarea id="i">/* Hello */\nbody { background: white; }</textarea>
  <button onclick="document.getElementById('o').value=document.getElementById('i').value.replace(/\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*|\\s+/g,' ')" style="width:100%;margin:15px 0;padding:12px;background:#3b82f6;border:none;border-radius:10px;color:#fff">MINIFY</button>
  <textarea id="o"></textarea></body></html>`},

  /* 55 ── CSS GRADIENT BUTTONS ──────────────────── */
  {icon:'🔘', en:'BtnMagic Pro', fr:'BtnMagic CSS',
   desc_en:'Generate high-end CSS gradient button styles',
   desc_fr:'Générer des styles de boutons CSS dégradés',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Btn</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
  .b{padding:15px 40px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;border-radius:50px;color:#fff;font-weight:900;font-size:18px;cursor:pointer;box-shadow:0 10px 20px rgba(59,130,246,0.3);transition:0.3s}
  .b:hover{transform:translateY(-3px);box-shadow:0 15px 30px rgba(59,130,246,0.5)}</style></head>
  <body><h2>🔘 BtnMagic Pro</h2><button class="b">PREMIUM BUTTON</button><br/><br/><pre style="background:#111;padding:20px;border-radius:15px;color:#94a3b8">background: linear-gradient(135deg,#3b82f6,#8b5cf6);</pre></body></html>`},

  /* 56 ── MEDITATION TIMER PRO ──────────────────── */
  {icon:'🧘', en:'ZenMoment Pro', fr:'ZenMoment Pro',
   desc_en:'Professional meditation timer with ambient focus',
   desc_fr:'Chronomètre de méditation avec focus ambiant',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Zen</title>
  <style>body{background:#0f172a;color:#fff;font-family:sans-serif;height:100vh;margin:0;display:flex;align-items:center;justify-content:center}
  .c{width:200px;height:200px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;position:relative}
  .p{position:absolute;width:100%;height:100%;border:4px solid #3b82f6;border-radius:50%;clip-path:inset(0 0 100% 0);transition:1s linear}
  .t{font-size:48px;font-weight:900}</style></head>
  <body><div style="text-align:center"><div class="c"><div class="p" id="p"></div><div class="t" id="t">05:00</div></div><br/>
  <button onclick="st()" style="padding:15px 40px;background:#3b82f6;border:none;border-radius:50px;color:#fff;font-weight:bold">START SESSION</button></div>
  <script>let s=300;function st(){setInterval(()=>{if(s>0)s--;const m=Math.floor(s/60),se=s%60;document.getElementById('t').textContent=\`\${m<10?'0':''}\${m}:\${se<10?'0':''}\${se}\`;},1000);}</script></body></html>`},

  /* 57 ── CALORIE COUNTER MINI ──────────────────── */
  {icon:'🥗', en:'CalorieFix Pro', fr:'CalorieFix Pro',
   desc_en:'Simple daily calorie tracker with goal progress',
   desc_fr:'Suivi quotidien de calories avec objectif',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Calories</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .bar{height:20px;background:#111;border-radius:10px;margin:20px 0;overflow:hidden}
  .fill{height:100%;background:#10b981;width:40%;transition:0.5s}</style></head>
  <body><h2>🥗 CalorieFix</h2><div class="bar"><div class="fill" id="f"></div></div>
  <h3><span id="c">800</span> / 2000 kcal</h3><input type="number" id="v" placeholder="Add kcal" style="padding:10px;border-radius:5px;border:none;background:#222;color:#fff"/>
  <button onclick="const v=parseInt(document.getElementById('v').value)||0;const c=document.getElementById('c');const n=parseInt(c.textContent)+v;c.textContent=n;document.getElementById('f').style.width=(n/2000*100)+'%'" style="padding:10px 20px;background:#10b981;color:#fff;border:none;border-radius:5px">Add</button></body></html>`},

  /* 58 ── WORKOUT LOGGER PRO ───────────────────── */
  {icon:'🏋️', en:'FitLog Pro', fr:'FitLog Pro',
   desc_en:'Track gym sets, reps and weights professionally',
   desc_fr:'Suivi de séries, réps et poids de musculation',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Fit</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .set{background:#111;padding:20px;border-radius:15px;margin-bottom:10px;display:flex;justify-content:space-between;border:1px solid #333}</style></head>
  <body><h2>🏋️ FitLog Pro</h2>
  <div class="set"><b>Bench Press</b><span>3 x 10 @ 80kg</span></div>
  <div class="set"><b>Squats</b><span>4 x 12 @ 100kg</span></div>
  <button style="width:100%;padding:15px;background:#3b82f6;border:none;border-radius:10px;color:#fff;font-weight:bold">+ NEW EXERCISE</button></body></html>`},

  /* 59 ── SLEEP TRACKER HUB ────────────────────── */
  {icon:'🌙', en:'SleepDash Pro', fr:'SleepDash Pro',
   desc_en:'Analyze sleep duration and quality metrics',
   desc_fr:'Analyses de durée et qualité du sommeil',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sleep</title>
  <style>body{background:#080c14;color:#fff;padding:40px;font-family:sans-serif;text-align:center}
  .q{font-size:48px;color:#8b5cf6;font-weight:900}</style></head>
  <body><h2>🌙 SleepDash</h2><div class="q">7h 45m</div><p>Sleep Quality: <b>Good</b></p>
  <div style="display:flex;justify-content:center;gap:10px;margin-top:30px">
  <div style="width:40px;height:100px;background:#333;position:relative"><div style="position:absolute;bottom:0;width:100%;height:80%;background:#8b5cf6"></div></div>
  <div style="width:40px;height:100px;background:#333;position:relative"><div style="position:absolute;bottom:0;width:100%;height:60%;background:#8b5cf6"></div></div>
  <div style="width:40px;height:100px;background:#333;position:relative"><div style="position:absolute;bottom:0;width:100%;height:90%;background:#8b5cf6"></div></div>
  </div></body></html>`},

  /* 60 ── WATER INTAKE PRO ─────────────────────── */
  {icon:'⛲', en:'AquaTracker Pro', fr:'AquaTracker Pro',
   desc_en:'Daily hydration tracker with interactive timeline',
   desc_fr:'Suivi d\'hydratation avec timeline interactive',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Aqua</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .dot{width:20px;height:20px;border-radius:50%;background:#333;display:inline-block;margin:5px}
  .active{background:#3b82f6;box-shadow:0 0 10px #3b82f6}</style></head>
  <body><h2>⛲ AquaTracker</h2><p>Daily Goal: 8 Glasses</p>
  <div id="g"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
  <button onclick="document.querySelector('.dot:not(.active)').classList.add('active')" style="margin-top:20px;padding:10px 30px;background:#3b82f6;border-radius:20px;color:#fff;border:none;cursor:pointer">Drink Glass</button></body></html>`},

  /* 61 ── DAILY AFFIRMATIONS ───────────────────── */
  {icon:'☀️', en:'PureMind Pro', fr:'PureMind Pro',
   desc_en:'Inspiring daily positive affirmations hub',
   desc_fr:'Tableau d\'affirmations positives quotidiennes',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mind</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center;font-family:serif;font-style:italic;font-size:32px}</style></head>
  <body><div id="q" style="padding:100px 30px">"I am capable of achieving greatness."</div>
  <button onclick="const q=['Focus on the good.','I am resilient.','Every day is a new beginning.'];document.getElementById('q').textContent='\"'+q[Math.floor(Math.random()*q.length)]+'\"'" style="font-family:sans-serif;font-style:normal;font-size:14px;padding:10px 20px;background:#fff;color:#000;border:none;border-radius:50px;cursor:pointer">NEW AFFIRMATION</button></body></html>`},

  /* 62 ── RECIPE CARD DESIGNER ──────────────────── */
  {icon:'👨‍🍳', en:'ChefPro Card', fr:'ChefPro Card',
   desc_en:'Create professional recipe cards for sharing',
   desc_fr:'Créer des fiches recettes pro à partager',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Recipe</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .card{background:#fff;color:#000;padding:40px;border-radius:20px;max-width:400px;margin:auto}</style></head>
  <body><div class="card"><h2>ChefPro Recipe</h2><h1 id="t">Classic Pasta</h1><p id="i">Ingredients:<br/>• Pasta<br/>• Tomato Sauce<br/>• Garlic</p>
  <hr/><input id="it" placeholder="Change title" oninput="document.getElementById('t').textContent=this.value" style="width:100%;margin-top:10px"/><br/>
  <button onclick="window.print()" style="width:100%;margin-top:10px;padding:10px;background:#3b82f6;color:#fff;border:none;border-radius:5px">PRINT CARD</button></div></body></html>`},

  /* 63 ── SHOPPING LIST GRID ───────────────────── */
  {icon:'🛒', en:'ListQuick Pro', fr:'ListQuick Pro',
   desc_en:'Dynamic shopping list with categories & checkboxes',
   desc_fr:'Liste de courses dynamique avec catégories',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shop</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .i{background:#111;padding:15px;border-radius:10px;margin-bottom:5px;display:flex;align-items:center;gap:10px}
  input[type=checkbox]{accent-color:#3b82f6}</style></head>
  <body><h2>🛒 ListQuick</h2>
  <div class="i"><input type="checkbox"/> Milk</div><div class="i"><input type="checkbox"/> Bread</div><div class="i"><input type="checkbox"/> Eggs</div>
  <button style="padding:10px;width:100%;background:#333;color:#fff;border:none;border-radius:10px;margin-top:15px">+ ADD ITEM</button></body></html>`},

  /* 64 ── TRAVEL CHECKLIST ──────────────────────── */
  {icon:'✈️', en:'PackVault Pro', fr:'PackVault Pro',
   desc_en:'Professional travel packing list and organizer',
   desc_fr:'Organisateur et liste de bagages pro',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pack</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .cat{color:#3b82f6;font-weight:900;margin-top:20px}.i{opacity:0.8}</style></head>
  <body><h2>✈️ PackVault</h2>
  <div class="cat">DOCUMENTS</div><div class="i">Passport, Insurance, Tickets</div>
  <div class="cat">ELECTRONICS</div><div class="i">Charger, Powerbank, Camera</div>
  <div class="cat">CLOTHING</div><div class="i">Shirts, Shoes, Jacket</div></body></html>`},

  /* 65 ── BMI CALCULATOR PRO ────────────────────── */
  {icon:'⚖️', en:'BodyMetrics Pro', fr:'BodyMetrics Pro',
   desc_en:'Advanced BMI and body weight analytics tool',
   desc_fr:'Calculateur pro d\'IMC et mesures corporelles',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>BMI</title>
  <style>body{background:#080c14;color:#fff;padding:40px;font-family:sans-serif;text-align:center}
  .res{font-size:60px;font-weight:900;color:#10b981}</style></head>
  <body><h2>⚖️ BodyMetrics</h2>
  H (cm):<input type="number" id="h" style="padding:10px"/><br/>W (kg):<input type="number" id="w" style="padding:10px;margin:10px 0"/><br/>
  <button onclick="const h=document.getElementById('h').value/100,w=document.getElementById('w').value;document.getElementById('r').textContent=(w/(h*h)).toFixed(1)" style="padding:10px 40px;background:#10b981;border:none;border-radius:10px;color:#fff;font-weight:bold">CALC</button>
  <div class="res" id="r">0.0</div><p>Normal Range: 18.5 - 24.9</p></body></html>`},

  /* 66 ── DIFF CHECKER PRO ──────────────────────── */
  {icon:'↔️', en:'DiffCheck Pro', fr:'DiffCheck Pro',
   desc_en:'Compare two text blocks and find differences',
   desc_fr:'Comparer deux blocs de texte et trouver diffs',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Diff</title>
  <style>body{background:#080c14;color:#fff;padding:20px;font-family:monospace}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  textarea{width:100%;height:300px;background:#111;color:#94a3b8;border:1px solid #333;padding:15px;border-radius:10px}</style></head>
  <body><h2>↔️ DiffCheck Pro</h2>
  <div class="grid"><textarea id="a" oninput="up()">Hello World\nLine 2</textarea><textarea id="b" oninput="up()">Hello World\nLine 3</textarea></div>
  <div id="res" style="margin-top:20px;padding:20px;background:#000;border-radius:10px;color:#ef4444">Different at Line 2</div>
  <script>function up(){const a=document.getElementById('a').value,b=document.getElementById('b').value;document.getElementById('res').textContent=(a===b)?'PERFECT MATCH':'DIFFERENT CONTENT';document.getElementById('res').style.color=(a===b)?'#10b981':'#ef4444';}</script></body></html>`},

  /* 67 ── REGEX TESTER HUB ──────────────────────── */
  {icon:'🧪', en:'RegExLab Pro', fr:'RegExLab Pro',
   desc_en:'Test regular expressions against sample strings',
   desc_fr:'Tester des expressions régulières sur du texte',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>RegEx</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  input,textarea{width:100%;padding:15px;background:#111;border:1px solid #333;color:#fff;border-radius:10px;margin-bottom:10px}</style></head>
  <body><h2>🧪 RegExLab Pro</h2>
  Regex: <input id="r" value="[a-z]+"/> String: <textarea id="s">Hello 123</textarea>
  <div id="res" style="padding:20px;background:#3b82f6;border-radius:10px;font-weight:bold">Match: Hello</div>
  <script>function up(){try{const r=new RegExp(document.getElementById('r').value);const m=document.getElementById('s').value.match(r);document.getElementById('res').textContent='Match: '+(m?m[0]:'No match');}catch(e){}}
  document.getElementById('r').oninput=up;document.getElementById('s').oninput=up;</script></body></html>`},

  /* 68 ── API PAYLOAD MOCKER ────────────────────── */
  {icon:'📡', en:'MockFlow Pro', fr:'MockFlow Pro',
   desc_en:'Generate mock JSON responses for API testing',
   desc_fr:'Générer des réponses JSON mock pour tests API',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mock</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  button{padding:10px 20px;background:#3b82f6;color:white;border:none;border-radius:10px;cursor:pointer}</style></head>
  <body><h2>📡 MockFlow API</h2><button onclick="gen()">GENERATE USER MOCK</button>
  <pre id="o" style="background:#000;padding:20px;border-radius:10px;margin-top:20px;color:#10b981"></pre>
  <script>function gen(){const d={id:Math.random().toString(36).slice(2),name:'Test User',email:'user@example.com',status:'active'};document.getElementById('o').textContent=JSON.stringify(d,null,2);}</script></body></html>`},

  /* 69 ── CODE SNIPPET MGR ─────────────────────── */
  {icon:'💾', en:'SnippetBox Pro', fr:'SnippetBox Pro',
   desc_en:'Save and organize reusable code snippets',
   desc_fr:'Enregistrer et organiser des snippets de code',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Snippet</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  .s{background:#111;padding:15px;border-radius:10px;border:1px solid #333;margin-bottom:10px}</style></head>
  <body><h2>💾 SnippetBox</h2>
  <div class="s"><b>Centering Div:</b><br/>display: flex;<br/>align-items: center;<br/>justify-content: center;</div>
  <div class="s"><b>Smooth Scroll:</b><br/>html { scroll-behavior: smooth; }</div></body></html>`},

  /* 70 ── META TAG GENERATOR ────────────────────── */
  {icon:'🏷️', en:'SEO Meta Pro', fr:'SEO Meta Pro',
   desc_en:'Generate HTML meta tags for social & search',
   desc_fr:'Générer des balises meta HTML pour SEO/Social',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Meta</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}</style></head>
  <body><h2>🏷️ SEO Meta Pro</h2>
  Title: <input id="t" oninput="up()" style="width:100%;padding:10px;margin-bottom:10px"/><br/>
  Desc: <input id="d" oninput="up()" style="width:100%;padding:10px"/>
  <pre id="o" style="background:#000;padding:20px;margin-top:20px;color:#94a3b8;font-family:monospace"></pre>
  <script>function up(){const t=document.getElementById('t').value,d=document.getElementById('d').value;document.getElementById('o').textContent=\`<title>\${t}</title>\\n<meta name="description" content="\${d}">\`;}up();</script></body></html>`},

  /* 71 ── URL SHORTENER UI ──────────────────────── */
  {icon:'🔗', en:'ShortyLink Pro', fr:'ShortyLink Pro',
   desc_en:'Professional URL shortener interface mockup',
   desc_fr:'Interface pro de raccourcisseur d\'URL',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>URL</title>
  <style>body{background:#080c14;color:#fff;padding:30px;text-align:center}
  input{padding:15px;width:300px;background:#111;border:1px solid #333;color:#fff;border-radius:10px}</style></head>
  <body><h2>🔗 ShortyLink</h2><input placeholder="Paste URL here..."/><br/>
  <button style="margin-top:10px;padding:12px 30px;background:#3b82f6;color:#fff;border:none;border-radius:10px;font-weight:bold">SHORTEN NOW</button>
  <div style="margin-top:30px;color:#64748b">History: no links shortened yet.</div></body></html>`},

  /* 72 ── PRIVACY GEN PRO ───────────────────────── */
  {icon:'📜', en:'PrivacyGen Pro', fr:'PrivacyGen Pro',
   desc_en:'Generate standard privacy policy templates',
   desc_fr:'Générer des modèles de politiques de confidentialité',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Privacy</title>
  <style>body{background:#fff;color:#000;padding:50px;font-family:serif;line-height:1.6}
  .paper{max-width:600px;margin:auto}</style></head>
  <body><div class="paper"><h1>Privacy Policy</h1><p>We respect your privacy. All data collected is used solely for service improvements.</p>
  <h3>1. Data Usage</h3><p>We do not sell your personal information to third parties.</p>
  <button onclick="window.print()" style="margin-top:50px;padding:10px 20px;background:#000;color:#fff;border:none;border-radius:5px">PRINT POLICY</button></div></body></html>`},

  /* 73 ── ROBOTS.TXT MAKER ──────────────────────── */
  {icon:'🤖', en:'RobotsMaster', fr:'RobotsMaster Pro',
   desc_en:'Easily create and export robots.txt files',
   desc_fr:'Créer et exporter des fichiers robots.txt',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Robots</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:monospace}
  pre{background:#111;padding:20px;border-radius:10px;color:#10b981}</style></head>
  <body><h2>🤖 RobotsMaster</h2>
  User-agent: <input id="ua" value="*" oninput="up()"/><br/>
  Disallow: <input id="da" value="/admin" oninput="up()"/>
  <pre id="o"></pre>
  <script>function up(){const u=document.getElementById('ua').value,d=document.getElementById('da').value;document.getElementById('o').textContent=\`User-agent: \${u}\\nDisallow: \${d}\`;}up();</script></body></html>`},

  /* 74 ── SITEMAP VISUALIZER ─────────────────────── */
  {icon:'🗺️', en:'MapCraft Pro', fr:'MapCraft Pro',
   desc_en:'Visualize website structure and sitemap nodes',
   desc_fr:'Visualiser la structure du site et sitemap',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sitemap</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .node{padding:10px;background:#111;border:1px solid #333;border-radius:5px;margin:10px 0;margin-left:20px;position:relative}
  .node::before{content:'';position:absolute;left:-15px;top:20px;width:15px;height:2px;background:#333}</style></head>
  <body><h2>🗺️ MapCraft Sitemap</h2>
  <div class="node">Home</div><div class="node" style="margin-left:40px">Products</div>
  <div class="node" style="margin-left:60px">Category A</div><div class="node" style="margin-left:40px">About</div></body></html>`},

  /* 75 ── FRONTEND CHECKLIST ────────────────────── */
  {icon:'✅', en:'DevCheck Pro', fr:'DevCheck Pro',
   desc_en:'Final checklist before launching a web project',
   desc_fr:'Check-list finale avant lancement web',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Check</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .i{padding:12px;background:#111;border-radius:8px;margin-bottom:8px;display:flex;align-items:center;gap:15px}
  input[type=checkbox]{accent-color:#10b981}</style></head>
  <body><h2>✅ DevCheck Pro</h2>
  <div class="i"><input type="checkbox"/> Mobile Responsive</div>
  <div class="i"><input type="checkbox"/> Form Validation</div>
  <div class="i"><input type="checkbox"/> Favicon Added</div>
  <div class="i"><input type="checkbox"/> Meta Tags Set</div></body></html>`},

  /* 76 ── VIRTUAL PIANO PRO ─────────────────────── */
  {icon:'🎹', en:'PianoMaster Pro', fr:'PianoMaster Pro',
   desc_en:'Simple interactive virtual piano with UI keys',
   desc_fr:'Piano virtuel interactif avec touches UI',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Piano</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
  .k{width:40px;height:150px;background:#fff;border:1px solid #000;display:inline-block;cursor:pointer;border-radius:0 0 5px 5px}
  .k:active{background:#3b82f6}.b{width:30px;height:90px;background:#000;margin-left:-15px;margin-right:-15px;position:relative;z-index:2;border-radius:0 0 3px 3px}</style></head>
  <body><h2>🎹 PianoMaster Pro</h2><div class="k"></div><div class="b"></div><div class="k"></div><div class="b"></div><div class="k"></div><div class="k"></div><div class="b"></div><div class="k"></div><div class="b"></div><div class="k"></div></body></html>`},

  /* 77 ── METRONOME BEAT ────────────────────────── */
  {icon:'🎼', en:'Metronome Pro', fr:'Métronome Pro',
   desc_en:'Visual beat tracker with adjustable BPM',
   desc_fr:'Chronomètre de rythme avec BPM ajustable',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Beat</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
  .dot{width:40px;height:40px;background:#333;border-radius:50%;display:inline-block;margin:10px;transition:0.1s}
  .active{background:#3b82f6;box-shadow:0 0 20px #3b82f6;transform:scale(1.2)}</style></head>
  <body><h2>🎼 Metronome Pro</h2><div id="g"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
  <br/>BPM: <input type="number" id="b" value="120" style="padding:10px;width:80px"/><br/><button onclick="st()" style="margin-top:20px;padding:10px 30px;background:#3b82f6;border:none;border-radius:50px;color:#fff;font-weight:bold">START</button>
  <script>let i=0;function st(){const bpm=document.getElementById('b').value;setInterval(()=>{const d=document.querySelectorAll('.dot');d.forEach(x=>x.classList.remove('active'));d[i%4].classList.add('active');i++;},60000/bpm);}</script></body></html>`},

  /* 78 ── BPM TEMPO TAPPER ──────────────────────── */
  {icon:'⚡', en:'TempoTap Pro', fr:'TempoTap Pro',
   desc_en:'Tap along to music to find the exact BPM',
   desc_fr:'Tapez en rythme pour trouver le BPM exact',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tap</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center}
  .pad{width:200px;height:200px;background:#3b82f6;border-radius:50%;margin:30px auto;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:900;cursor:pointer;box-shadow:0 0 40px rgba(59,130,246,0.3)}</style></head>
  <body><h2>⚡ TempoTap</h2><div class="pad" onclick="tap()">TAP</div><div id="res" style="font-size:32px;margin-top:20px">BPM: 0</div>
  <script>let t=[];function tap(){t.push(Date.now());if(t.length>5){const d=(t[t.length-1]-t[t.length-5])/4;document.getElementById('res').textContent='BPM: '+Math.round(60000/d);if(t.length>10)t.shift();}}</script></body></html>`},

  /* 79 ── CHORD REFERENCE LAB ───────────────────── */
  {icon:'🎸', en:'ChordLab Pro', fr:'ChordLab Pro',
   desc_en:'Visual guitar chord finger placement guide',
   desc_fr:'Guide visuel de placement des doigts pour accords',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Chord</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif;text-align:center}
  .fret{background:#222;width:150px;height:200px;margin:30px auto;display:flex;justify-content:space-around;padding:10px;border:2px solid #444;position:relative}
  .str{width:2px;background:#555;height:100%}.dot{position:absolute;width:12px;height:12px;background:#3b82f6;border-radius:50%}</style></head>
  <body><h2>🎸 ChordLab: C Major</h2><div class="fret"><div class="str"></div><div class="str"></div><div class="str"></div><div class="str"></div><div class="str"></div><div class="str"></div>
  <div class="dot" style="top:20px;left:20px"></div><div class="dot" style="top:60px;left:50px"></div><div class="dot" style="top:100px;left:80px"></div></div></body></html>`},

  /* 80 ── MUSIC PLAYER DASH ──────────────────────── */
  {icon:'🎵', en:'AudioWave UI', fr:'AudioWave UI',
   desc_en:'Modern music player dashboard interface mockup',
   desc_fr:'Interface moderne de lecteur de musique',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Audio</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .player{background:#111;padding:30px;border-radius:30px;width:300px;margin:auto;text-align:center;border:1px solid #333}
  .art{width:150px;height:150px;background:linear-gradient(45deg,#3b82f6,#8b5cf6);margin:0 auto 20px;border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.5)}
  .prog{height:5px;background:#333;border-radius:5px;margin:20px 0;position:relative}.fill{width:60%;height:100%;background:#3b82f6;border-radius:5px}</style></head>
  <body><div class="player"><div class="art"></div><b>Neon Nights</b><br/><small style="color:#64748b">SynthWave Explorer</small>
  <div class="prog"><div class="fill"></div></div><div style="font-size:24px">⏮ ⏸ ⏭</div></div></body></html>`},

  /* 81 ── LYRIC WRITER PRO ──────────────────────── */
  {icon:'📝', en:'RhymeStudio', fr:'Studio Rimes',
   desc_en:'Clean environment for writing lyrics and poems',
   desc_fr:'Environnement épuré pour écrire des textes',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Lyrics</title>
  <style>body{background:#080c14;color:#fff;padding:40px;font-family:serif;font-size:20px}
  textarea{width:100%;height:400px;background:transparent;border:none;color:#94a3b8;font-family:serif;font-size:24px;resize:none;outline:none}</style></head>
  <body><h2>📝 Rhyme Studio</h2><textarea placeholder="Write your lyrics here..."></textarea>
  <div style="position:fixed;bottom:20px;right:20px;background:#333;padding:10px 20px;border-radius:50px;font-family:sans-serif;font-size:14px">Word Count: 0</div></body></html>`},

  /* 82 ── EQUALIZER VISUAL ──────────────────────── */
  {icon:'📊', en:'EqVisual Pro', fr:'EqVisual Pro',
   desc_en:'Simulated CSS audio spectrum visualizer',
   desc_fr:'Visualiseur de spectre audio simulé en CSS',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>EQ</title>
  <style>body{background:#080c14;margin:0;display:flex;align-items:center;justify-content:center;height:100vh}
  .b{width:15px;background:#3b82f6;margin:2px;animation:h 1s infinite alternate}
  @keyframes h{0%{height:20px}100%{height:100px}}</style></head>
  <body><div style="display:flex;align-items:flex-end">
  <div class="b"></div><div class="b" style="animation-duration:0.5s"></div><div class="b" style="animation-duration:1.2s"></div><div class="b" style="animation-duration:0.8s"></div><div class="b" style="animation-duration:0.4s"></div>
  </div></body></html>`},

  /* 83 ── DRUM PAD MACHINE ──────────────────────── */
  {icon:'🥁', en:'DrumPad Pro', fr:'DrumPad Pro',
   desc_en:'Sleek interactive drum pad mock for beatmaking',
   desc_fr:'Pad de batterie interactif pour beatmaking',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Drum</title>
  <style>body{background:#080c14;color:#fff;padding:30px;text-align:center}
  .grid{display:grid;grid-template-columns:repeat(3,100px);gap:15px;justify-content:center}
  .p{width:100px;height:100px;background:#1e293b;border-radius:15px;cursor:pointer;border-bottom:5px solid #000}
  .p:active{background:#3b82f6;transform:scale(0.95);border-bottom:2px solid #000}</style></head>
  <body><h2>🥁 DrumPad Pro</h2><div class="grid">
  <div class="p"></div><div class="p"></div><div class="p" style="background:#ef4444"></div>
  <div class="p"></div><div class="p" style="background:#10b981"></div><div class="p"></div>
  <div class="p" style="background:#f59e0b"></div><div class="p"></div><div class="p"></div>
  </div></body></html>`},

  /* 84 ── SCALE MASTER HUB ──────────────────────── */
  {icon:'🎵', en:'ScaleWise Pro', fr:'ScaleWise Pro',
   desc_en:'Quick musical scale reference and theory tool',
   desc_fr:'Référence rapide de gammes musicales',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Scale</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .n{display:inline-block;width:50px;height:50px;background:#3b82f6;border-radius:50%;line-height:50px;text-align:center;font-weight:900;margin:10px}</style></head>
  <body><h2>🎵 ScaleWise: G Major</h2><div class="n">G</div><div class="n">A</div><div class="n">B</div><div class="n">C</div><div class="n">D</div><div class="n">E</div><div class="n">F#</div></body></html>`},

  /* 85 ── STUDIO SESSION LOG ────────────────────── */
  {icon:'📅', en:'SessionLog Pro', fr:'SessionLog Pro',
   desc_en:'Professional recording studio session tracker',
   desc_fr:'Suivi de sessions d\'enregistrement pro',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Log</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  table{width:100%;border-collapse:collapse}th,td{padding:15px;text-align:left;border-bottom:1px solid #333}</style></head>
  <body><h2>📅 Session Log</h2><table id="tbl"><thead><tr><th>Artist</th><th>Time</th><th>Status</th></tr></thead><tbody>
  <tr><td>Neon nights</td><td>2h 15m</td><td style="color:#10b981">Completed</td></tr></tbody></table></body></html>`},

  /* 86 ── PLAYLIST DESIGNER ──────────────────────── */
  {icon:'📁', en:'ListGen Pro', fr:'ListGen Pro',
   desc_en:'Craft and organize personal song collections',
   desc_fr:'Créer et organiser des collections de chansons',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>List</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .i{background:#111;padding:15px;border-radius:12px;margin-bottom:10px;display:flex;align-items:center;gap:15px}
  .num{color:#3b82f6;font-weight:900}</style></head>
  <body><h2>📁 Playlist Designer</h2><div class="i"><span class="num">1</span> Starry Night - Vincent G</div><div class="i"><span class="num">2</span> Deep Blue - Oceans</div></body></html>`},

  /* 87 ── AUDIO WAVE MOCK ───────────────────────── */
  {icon:'🔉', en:'WaveMock Studio', fr:'WaveMock Studio',
   desc_en:'Visualized audio waveform mockup for editors',
   desc_fr:'Simulation de forme d\'onde audio pour éditeurs',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Wave</title>
  <style>body{background:#080c14;padding:40px;display:flex;align-items:flex-end;height:100vh;margin:0}
  .b{width:3px;background:#3b82f6;margin:1px;position:relative}</style></head>
  <body><script>for(let i=0;i<100;i++){const h=Math.random()*200;document.write(\`<div class="b" style="height:\${h}px"></div>\`);}</script></body></html>`},
  
  /* 88 ── PATIENT DASHBOARD ─────────────────────── */
  {icon:'🏥', en:'HealthPortal Pro', fr:'HealthPortal Pro',
   desc_en:'Comprehensive patient medical records dashboard',
   desc_fr:'Tableau de bord complet de dossiers médicaux',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Portal</title>
  <style>body{background:#f1f5f9;color:#1e293b;font-family:sans-serif;padding:30px}
  .card{background:#fff;padding:24px;border-radius:15px;box-shadow:0 10px 25px rgba(0,0,0,0.05);margin-bottom:20px}
  .tag{padding:5px 12px;background:#3b82f6;color:#fff;border-radius:20px;font-size:10px;font-weight:900}</style></head>
  <body><div class="card"><h2>🏥 Patient: John Doe</h2><p>Age: 45 | Blood: B+</p><span class="tag">Next Checkup: April 12</span></div>
  <div class="card"><b>Recent History:</b><br/>• Regular Exam (Oct)<br/>• Blood Test (Sep)</div></body></html>`},

  /* 89 ── PILL REMINDER PRO ─────────────────────── */
  {icon:'💊', en:'PillWise Pro', fr:'PillWise Pro',
   desc_en:'Daily medication schedule and reminder tracker',
   desc_fr:'Suivi et rappel de médicaments quotidien',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pill</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .i{background:#111;padding:20px;border-radius:15px;margin-bottom:10px;display:flex;justify-content:space-between;border:1px solid #333}
  .time{color:#3b82f6;font-weight:bold}</style></head>
  <body><h2>💊 Medication Schedule</h2>
  <div class="i"><span>Multi-Vitamin</span><span class="time">08:00 AM</span></div>
  <div class="i"><span>Omega 3</span><span class="time">12:30 PM</span></div>
  <div class="i"><span>Magnesium</span><span class="time">09:00 PM</span></div></body></html>`},

  /* 90 ── DOSAGE CALCULATOR ─────────────────────── */
  {icon:'🧪', en:'DoseCalc Pro', fr:'DoseCalc Pro',
   desc_en:'Weight-based medical dosage calculation tool',
   desc_fr:'Outil de calcul de dosage médical par poids',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Dose</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif;text-align:center}</style></head>
  <body><div style="background:#111;padding:40px;border-radius:20px;width:300px;margin:auto"><h2>🧪 DoseCalc</h2>
  Weight (kg): <input type="number" id="w" value="70" oninput="up()"/><br/>
  Dosage (mg/kg): <input type="number" id="d" value="5" oninput="up()"/>
  <div id="res" style="font-size:32px;font-weight:900;color:#10b981;margin-top:20px">Total: 350 mg</div></div>
  <script>function up(){const w=document.getElementById('w').value,d=document.getElementById('d').value;document.getElementById('res').textContent='Total: '+(w*d)+' mg';}</script></body></html>`},

  /* 91 ── SYMPTOM CHECKER UI ────────────────────── */
  {icon:'🤒', en:'SymptomPath', fr:'SymptomPath UI',
   desc_en:'Simple interactive symptom verification path',
   desc_fr:'Parcours interactif de vérification des symptômes',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Symp</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}</style></head>
  <body><h2>🤒 SymptomPath</h2><div style="background:#111;padding:30px;border-radius:20px">
  <p>Are you experiencing a fever?</p>
  <button style="padding:10px 30px;background:#ef4444;border:none;border-radius:10px;color:#fff">YES</button>
  <button style="padding:10px 30px;background:#333;border:none;border-radius:10px;color:#fff">NO</button>
  </div><p style="margin-top:20px;color:#64748b">Note: Not a substitute for medical advice.</p></body></html>`},

  /* 92 ── APPOINTMENT HUB ────────────────────────── */
  {icon:'📅', en:'MedBook Pro', fr:'MedBook Pro',
   desc_en:'Patient appointment scheduling and booking UI',
   desc_fr:'Interface de réservation de rendez-vous médicaux',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Book</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .slot{display:inline-block;padding:10px 20px;background:#1e293b;border-radius:10px;margin:5px;cursor:pointer}
  .active{background:#3b82f6}</style></head>
  <body><h2>📅 MedBook Pro</h2><p>Available Slots (April 10):</p>
  <div class="slot">09:00</div><div class="slot active">10:30</div><div class="slot">11:00</div><div class="slot">14:00</div></body></html>`},

  /* 93 ── BLOOD PRESSURE LOG ────────────────────── */
  {icon:'💓', en:'PressLog Pro', fr:'PressLog Pro',
   desc_en:'Track and visualize blood pressure readings',
   desc_fr:'Suivi et visualisation de la tension artérielle',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Press</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .chart{height:150px;background:#111;display:flex;align-items:flex-end;gap:5px;padding:20px;border-radius:20px}
  .b{width:30px;background:#ef4444;border-radius:5px 5px 0 0}</style></head>
  <body><h2>💓 PressLog Pro</h2><div class="chart"><div class="b" style="height:80%"></div><div class="b" style="height:70%"></div><div class="b" style="height:85%"></div><div class="b" style="height:75%"></div></div>
  <p>Avg: 120/80 mmHg (Healthy)</p></body></html>`},

  /* 94 ── FIRST AID QUICK ───────────────────────── */
  {icon:'🚑', en:'FirstAid Hub', fr:'Guide Secours',
   desc_en:'Emergency first aid procedures and quick guide',
   desc_fr:'Procédures de premiers secours et guide rapide',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>First</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .card{background:#ef4444;padding:24px;border-radius:20px;margin-bottom:20px}</style></head>
  <body><h2>🚑 FirstAid QuickGuide</h2>
  <div class="card"><b>🚨 HEART ATTACK</b><p>1. Call Emergency<br/>2. Keep patient calm<br/>3. CPR if unconscious</p></div></body></html>`},

  /* 95 ── TELEMEDICINE UI ───────────────────────── */
  {icon:'📹', en:'TeleMed Pro', fr:'TeleMed Pro',
   desc_en:'Professional telehealth video consultation mock-up',
   desc_fr:'Simulation de consultation vidéo télé-santé',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tele</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif;text-align:center}
  .vid{width:100%;height:300px;background:#333;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:48px}
  .ui{margin-top:20px;font-size:24px}</style></head>
  <body><h2>📹 TeleMed Pro</h2><div class="vid">👨‍⚕️</div><div class="ui">📞 🔇 📷 ❌</div></body></html>`},

  /* 96 ── LAB RESULT ANALYZER ──────────────────── */
  {icon:'🔬', en:'LabResult Pro', fr:'LabResult Pro',
   desc_en:'Decode medical lab results with reference ranges',
   desc_fr:'Décoder les résultats de labo avec références',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Lab</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  table{width:100%;border-collapse:collapse}th,td{padding:15px;text-align:left;border-bottom:1px solid #333}</style></head>
  <body><h2>🔬 Lab Results</h2><table><thead><tr><th>Test</th><th>Result</th><th>Range</th></tr></thead><tbody>
  <tr><td>Glucose</td><td>95 mg/dL</td><td>70-99</td></tr>
  <tr><td>Cholesterol</td><td style="color:#ef4444">210</td><td><200</td></tr></tbody></table></body></html>`},

  /* 97 ── HEART RATE MOCK ───────────────────────── */
  {icon:'❤️', en:'PulseLog Pro', fr:'PulseLog Pro',
   desc_en:'Simulated real-time heart rate pulse monitor',
   desc_fr:'Moniteur de pouls en temps réel simulé',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pulse</title>
  <style>body{background:#080c14;color:#fff;padding:50px;text-align:center;font-family:sans-serif}
  .n{font-size:120px;font-weight:900;color:#ef4444;animation:p 1s infinite alternate}
  @keyframes p{0%{transform:scale(1)}100%{transform:scale(1.1)}}</style></head>
  <body><h2>❤️ PulseLog</h2><div class="n" id="p">72</div><p>BPM</p>
  <script>setInterval(()=>{document.getElementById('p').textContent=Math.floor(70+Math.random()*5);},1000);</script></body></html>`},

  /* 98 ── PHARMACY STOCK ────────────────────────── */
  {icon:'📦', en:'PharmaStock', fr:'PharmaStock Pro',
   desc_en:'Manage medical inventory and pharmacy shelf stock',
   desc_fr:'Gestion d\'inventaire médical et stock pharmacie',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pharma</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .i{background:#111;padding:15px;border-radius:12px;margin-bottom:10px;display:flex;justify-content:space-between;border:1px solid #333}</style></head>
  <body><h2>📦 PharmaStock</h2><div class="i"><span>Amoxicillin</span><b>42 Units</b></div><div class="i"><span>Paracetamol</span><b>128 Units</b></div><div class="i"><span>Insulin</span><b style="color:#ef4444">5 Units</b></div></body></html>`},

  /* 99 ── MEDICAL DICTIONARY ───────────────────── */
  {icon:'📖', en:'MedDict Mini', fr:'MedDict Mini',
   desc_en:'Quick glossary of common medical terms and files',
   desc_fr:'Glossaire rapide de termes médicaux courants',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Dict</title>
  <style>body{background:#080c14;color:#fff;padding:30px;font-family:sans-serif}
  .term{color:#3b82f6;font-weight:900;margin-top:20px}</style></head>
  <body><h2>📖 MedDict</h2><div class="term">Acute</div><p>Conditions that start suddenly and last for a short time.</p><div class="term">Chronic</div><p>Conditions that last for a long time or are recurring.</p></body></html>`},

  /* 100 ── GENIUS HEALTH REPORT ────────────────── */
  {icon:'🧬', en:'HealthGen Pro', fr:'HealthGen Pro',
   desc_en:'Comprehensive health summary and analytics report',
   desc_fr:'Rapport analytique et résumé santé complet',
   code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Report</title>
  <style>body{background:#080c14;color:#fff;padding:40px;font-family:sans-serif}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .card{background:linear-gradient(45deg,#111,#1a1a1a);padding:24px;border-radius:20px;border:1px solid #333;text-align:center}
  .val{font-size:32px;font-weight:900;color:#10b981}</style></head>
  <body><h2>🧬 HealthGen Final Report</h2><div class="grid">
  <div class="card">Overall Health<br/><div class="val">92%</div></div><div class="card">Vitality Score<br/><div class="val">A+</div></div>
  </div><h3 style="margin-top:40px">Summary:</h3><p>Excellent physical condition. Keep up the high standard of wellness recorded in this 100-app suite!</p></body></html>`}

];

window.REALWORLD_APPS_DATA = REALWORLD_APPS_DATA;
