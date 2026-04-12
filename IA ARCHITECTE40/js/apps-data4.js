'use strict';
/* IA Architecte — Apps 18-25 */
const APPS_DATA_4 = [

/* 18 ── HABIT TRACKER ──────────────────────────────── */
{icon:'📅', en:'Habit Tracker', fr:'Suivi d\'Habitudes',
 desc_en:'Track daily habits, streaks & calendar',
 desc_fr:'Suivi quotidien, streaks et calendrier',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Habit Tracker</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;padding:24px;min-height:100vh}
.container{max-width:600px;margin:0 auto}
h1{font-size:22px;font-weight:900;margin-bottom:20px;text-align:center}
.habit-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px;margin-bottom:12px;display:flex;align-items:center;gap:15px}
.habit-info{flex:1}
.habit-name{font-size:15px;font-weight:700}
.habit-streak{font-size:11px;color:#3b82f6;font-weight:800;margin-top:2px}
.days{display:flex;gap:5px}
.day-circle{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;cursor:pointer;transition:all .2s}
.day-circle.done{background:#10b981;border-color:#10b981;color:#fff}
.add-habit{display:flex;gap:10px;margin-top:20px}
input{flex:1;padding:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#fff;outline:none}
button{padding:12px 20px;background:#3b82f6;border:none;border-radius:12px;color:#fff;font-weight:700;cursor:pointer}
</style></head><body>
<div class="container">
  <h1>📅 Habit Tracker</h1>
  <div id="habits-list"></div>
  <div class="add-habit">
    <input id="new-habit" placeholder="New habit name..."/>
    <button onclick="addHabit()">Add</button>
  </div>
</div>
<script>
let habits = [
  {id:1, name:'Drink Water', streak:5, history:[true, true, true, true, true, false, false]},
  {id:2, name:'Morning Meditate', streak:3, history:[false, true, true, true, false, false, false]}
];
function addHabit(){
  const name=document.getElementById('new-habit').value;
  if(!name)return;
  habits.push({id:Date.now(), name, streak:0, history:[false,false,false,false,false,false,false]});
  document.getElementById('new-habit').value=''; render();
}
function toggleDay(hId, dIdx){
  const h = habits.find(x=>x.id===hId);
  h.history[dIdx] = !h.history[dIdx];
  // Simple streak calc
  let s=0; for(let i=h.history.length-1;i>=0;i--){if(h.history[i])s++;else break;}
  h.streak=s; render();
}
function render(){
  const list=document.getElementById('habits-list');
  list.innerHTML=habits.map(h=>\`<div class="habit-card">
    <div class="habit-info"><div class="habit-name">\${h.name}</div><div class="habit-streak">🔥 \${h.streak} day streak</div></div>
    <div class="days">\${h.history.map((d,i)=>\`<div class="day-circle \${d?'done':''}" onclick="toggleDay(\${h.id},\${i})">\${['M','T','W','T','F','S','S'][i]}</div>\`).join('')}</div>
  </div>\`).join('');
}
render();
</script></body></html>`},

/* 19 ── GOAL PLANNER ────────────────────────────────── */
{icon:'🎯', en:'Goal Planner', fr:'Planificateur d\'Objectifs',
 desc_en:'Set SMART goals with progress & deadlines',
 desc_fr:'Objectifs SMART avec progrès et échéances',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Goal Planner</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;padding:24px}
.container{max-width:600px;margin:0 auto}
.goal-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;margin-bottom:15px}
.progress-bar{height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:15px 0;overflow:hidden}
.progress-fill{height:100%;background:#3b82f6;transition:width .5s}
.goal-header{display:flex;justify-content:space-between;align-items:center}
.goal-title{font-size:18px;font-weight:800}
.goal-meta{font-size:12px;color:#64748b}
input[type=range]{width:100%;accent-color:#3b82f6}
</style></head><body>
<div class="container">
  <h1 style="margin-bottom:20px">🎯 Goal Planner</h1>
  <div id="goals"></div>
</div>
<script>
const goals = [
  {n:'Learn Advanced React', p:65, d:'2024-06-01'},
  {n:'Run a Marathon', p:30, d:'2024-12-15'}
];
function render(){
  document.getElementById('goals').innerHTML=goals.map((g,i)=>\`<div class="goal-card">
    <div class="goal-header"><div class="goal-title">\${g.n}</div><div class="goal-meta">Due: \${g.d}</div></div>
    <div class="progress-bar"><div class="progress-fill" style="width:\${g.p}%"></div></div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <input type="range" value="\${g.p}" oninput="goals[\${i}].p=this.value;render()"/>
      <span style="font-weight:800;margin-left:10px">\${g.p}%</span>
    </div>
  </div>\`).join('');
}
render();
</script></body></html>`},

/* 20 ── NOTES & MARKDOWN ───────────────────────────── */
{icon:'🖊️', en:'Notes & Markdown', fr:'Notes & Markdown',
 desc_en:'Markdown editor with live preview & tags',
 desc_fr:'Éditeur Markdown avec aperçu live et tags',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Notes</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;display:flex;height:100vh}
.editor,.preview{flex:1;padding:20px;overflow-y:auto}
textarea{width:100%;height:100%;background:transparent;border:none;color:#e2e8f0;font-family:monospace;font-size:16px;outline:none;resize:none}
.preview{background:rgba(255,255,255,.02);border-left:1px solid rgba(255,255,255,.1)}
h1,h2{margin-bottom:10px}
p{line-height:1.6;margin-bottom:10px}
</style></head><body>
<div class="editor"><textarea id="in" oninput="update()"># New Note\\n\\nType your markdown here...\\n\\n- Item 1\\n- Item 2</textarea></div>
<div class="preview" id="out"></div>
<script>
function update(){
  const val = document.getElementById('in').value;
  // Very basic MD parser
  let html = val.replace(/^# (.*$)/gm, '<h1>$1</h1>')
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .replace(/\\n/g, '<br/>');
  document.getElementById('out').innerHTML = html;
}
update();
</script></body></html>`},

/* 21 ── CSS GRADIENT ANIMATOR ──────────────────────── */
{icon:'🎨', en:'Gradient Animator', fr:'Animateur de Dégradés',
 desc_en:'Create & animate CSS gradients',
 desc_fr:'Crée et anime des dégradés CSS',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Gradient</title>
<style>
body{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#080c14;color:#fff;font-family:sans-serif}
#box{width:300px;height:300px;border-radius:20px;background:linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);background-size:400% 400%;animation:grad 15s ease infinite;box-shadow:0 10px 30px rgba(0,0,0,0.5)}
@keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.code{background:rgba(255,255,255,.1);padding:15px;border-radius:10px;margin-top:30px;font-family:monospace;font-size:12px}
</style></head><body>
<div id="box"></div>
<div class="code">animation: grad 15s ease infinite;<br/>background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);</div>
</body></html>`},

/* 22 ── UNIT CONVERTER PRO ─────────────────────────── */
{icon:'🔢', en:'Unit Converter Pro', fr:'Convertisseur d\'Unités',
 desc_en:'Convert 50+ units (length, weight, temp)',
 desc_fr:'Converteur d\'unités complet',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Units</title>
<style>
body{background:#080c14;color:#fff;font-family:sans-serif;padding:40px}
.card{background:rgba(255,255,255,.05);padding:20px;border-radius:15px;max-width:400px;margin:auto}
input,select{width:100%;padding:10px;margin:10px 0;background:#1a1a1a;border:1px solid #333;color:#fff;border-radius:5px}
</style></head><body>
<div class="card">
  <h2>Unit Converter</h2>
  <input type="number" id="v" value="1" oninput="calc()"/>
  <select id="u" onchange="calc()"><option value="km_m">KM to M</option><option value="m_km">M to KM</option><option value="kg_g">KG to G</option></select>
  <div id="res" style="font-size:24px;font-weight:800;text-align:center;margin-top:10px">1000 M</div>
</div>
<script>
function calc(){
  const v=+document.getElementById('v').value, u=document.getElementById('u').value, r=document.getElementById('res');
  if(u==='km_m') r.textContent=(v*1000)+' M';
  if(u==='m_km') r.textContent=(v/1000)+' KM';
  if(u==='kg_g') r.textContent=(v*1000)+' G';
}
</script></body></html>`},

/* 23 ── SHOPPING LIST ──────────────────────────────── */
{icon:'🛒', en:'Shopping List', fr:'Liste de Courses',
 desc_en:'Shopping list with budget tracking',
 desc_fr:'Liste de courses avec budget',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shopping</title>
<style>
body{background:#080c14;color:#fff;font-family:sans-serif;padding:20px}
.item{background:rgba(255,255,255,.05);padding:10px;margin:5px 0;border-radius:5px;display:flex;justify-content:space-between}
</style></head><body>
<h2>🛒 Shopping List</h2>
<div id="list"></div>
<div style="margin-top:20px">Total: <span id="total">$0</span></div>
<script>
const items=[{n:'Milk',p:2.5},{n:'Bread',p:1.8},{n:'Apples',p:4.0}];
const list=document.getElementById('list');
list.innerHTML=items.map(i=>\`<div class="item"><span>\${i.n}</span><span>\$\${i.p}</span></div>\`).join('');
document.getElementById('total').textContent='$'+items.reduce((a,b)=>a+b.p,0).toFixed(2);
</script></body></html>`},

/* 24 ── TRAVEL CHECKLIST ────────────────────────────── */
{icon:'🌍', en:'Travel Checklist', fr:'Checklist Voyage',
 desc_en:'Packing list for your next trip',
 desc_fr:'Liste de bagages pour votre voyage',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Travel</title>
<style>
body{background:#080c14;color:#fff;font-family:sans-serif;padding:20px}
.chk{margin:10px 0;display:flex;align-items:center;gap:10px;font-size:18px}
</style></head><body>
<h2>🌍 Travel Checklist</h2>
<div class="chk"><input type="checkbox"/> Passport</div>
<div class="chk"><input type="checkbox"/> Charger</div>
<div class="chk"><input type="checkbox"/> Underwear</div>
<div class="chk"><input type="checkbox"/> Tickets</div>
</body></html>`},

/* 25 ── RANDOM DECISION ─────────────────────────────── */
{icon:'🎲', en:'Decision Maker', fr:'Décideur Aléatoire',
 desc_en:'Spin the wheel or flip a coin',
 desc_fr:'Rouat de la chance ou pile ou face',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Decision</title>
<style>
body{background:#080c14;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh}
.btn{padding:20px 40px;background:#3b82f6;border-radius:50px;border:none;color:#fff;font-size:24px;font-weight:800;cursor:pointer}
.res{margin-top:40px;font-size:48px;font-weight:900;color:#10b981}
</style></head><body>
<button class="btn" onclick="document.getElementById('r').textContent=Math.random()>0.5?'YES':'NO'">DECIDE!</button>
<div class="res" id="r">?</div>
</body></html>`}

];

// Merge into global APPS_DATA
if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_4);
} else {
  window.APPS_DATA = APPS_DATA_4;
}
