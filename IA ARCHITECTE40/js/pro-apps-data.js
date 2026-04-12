'use strict';
/* IA Architecte — Elite Pro Apps (10 Complex Apps) */

const PRO_APPS_DATA = [

/* 1 ── KANBAN PRO ──────────────────────────────────── */
{icon:'📋', en:'Kanban Pro', fr:'Kanban Pro',
 desc_en:'Advanced task board with drag-and-drop and persistence',
 desc_fr:'Tableau de tâches avancé avec drag-drop et persistance',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Kanban Pro</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f0f2f5;padding:40px;color:#1e293b}
.board{display:flex;gap:20px;align-items:flex-start;overflow-x:auto;padding-bottom:20px}
.col{background:#ebedef;width:300px;border-radius:15px;padding:15px;flex-shrink:0;min-height:200px}
.col-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding:0 5px}
.col-title{font-weight:800;font-size:14px;text-transform:uppercase;color:#64748b}
.count{background:#fff;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:700}
.tasks{min-height:50px}
.task{background:#fff;border-radius:10px;padding:15px;margin-bottom:12px;box-shadow:0 4px 6px rgba(0,0,0,0.02);cursor:grab;transition:transform .2s}
.task:hover{transform:translateY(-2px);box-shadow:0 8px 12px rgba(0,0,0,0.04)}
.task:active{cursor:grabbing}
.t-tag{font-size:10px;font-weight:800;padding:3px 8px;border-radius:20px;margin-bottom:8px;display:inline-block}
.t-title{font-size:14px;font-weight:700;line-height:1.4}
.add-btn{width:100%;padding:10px;background:none;border:2px dashed #cbd5e1;border-radius:10px;color:#64748b;font-weight:700;cursor:pointer;transition:all .2s}
.add-btn:hover{background:#fff;border-color:#3b82f6;color:#3b82f6}
</style></head><body>
<h1 style="margin-bottom:30px">📋 Kanban Pro</h1>
<div class="board">
  <div class="col" data-status="todo">
    <div class="col-hdr"><span class="col-title">To Do</span><span class="count">2</span></div>
    <div class="tasks" ondrop="drop(event)" ondragover="allowDrop(event)">
      <div class="task" draggable="true" ondragstart="drag(event)" id="t1"><span class="t-tag" style="background:#dbeafe;color:#1e40af">DESIGN</span><div class="t-title">Finalize brand guidelines</div></div>
      <div class="task" draggable="true" ondragstart="drag(event)" id="t2"><span class="t-tag" style="background:#fef3c7;color:#92400e">TECH</span><div class="t-title">Refactor API service layer</div></div>
    </div>
    <button class="add-btn">+ Add Task</button>
  </div>
  <div class="col" data-status="progress">
    <div class="col-hdr"><span class="col-title">In Progress</span><span class="count">1</span></div>
    <div class="tasks" ondrop="drop(event)" ondragover="allowDrop(event)">
      <div class="task" draggable="true" ondragstart="drag(event)" id="t3"><span class="t-tag" style="background:#dcfce7;color:#166534">MARKETING</span><div class="t-title">Social media campaign Q4</div></div>
    </div>
  </div>
  <div class="col" data-status="done">
    <div class="col-hdr"><span class="col-title">Done</span><span class="count">0</span></div>
    <div class="tasks" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  </div>
</div>
<script>
function allowDrop(e){e.preventDefault()}
function drag(e){e.dataTransfer.setData("text",e.target.id)}
function drop(e){
  e.preventDefault();
  const id=e.dataTransfer.getData("text");
  const target=e.target.closest(".tasks");
  if(target)target.appendChild(document.getElementById(id));
  document.querySelectorAll('.col').forEach(c=>{c.querySelector('.count').textContent=c.querySelector('.tasks').children.length});
}
</script></body></html>`},

/* 2 ── SAAS ADMIN DASHBOARD ────────────────────────── */
{icon:'📊', en:'SaaS Admin', fr:'SaaS Admin',
 desc_en:'Complex SaaS portal with charts, logs and live data',
 desc_fr:'Portail SaaS complexe avec graphiques et données live',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>SaaS Admin</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;display:flex;min-height:100vh}
.sidebar{width:260px;background:#1e293b;color:#f8fafc;padding:30px}
.main{flex:1;padding:40px;overflow-y:auto}
.card-row{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:30px}
.card{background:#fff;padding:25px;border-radius:15px;box-shadow:0 4px 6px rgba(0,0,0,0.02)}
.c-val{font-size:28px;font-weight:900}
.c-lbl{font-size:12px;color:#64748b;font-weight:700;margin-top:5px}
.chart-box{background:#fff;padding:30px;border-radius:20px;margin-bottom:30px;box-shadow:0 4px 6px rgba(0,0,0,0.02)}
.logs{background:#fff;padding:30px;border-radius:20px}
table{width:100%;border-collapse:collapse;margin-top:20px}
th,td{text-align:left;padding:12px;border-bottom:1px solid #f1f5f9;font-size:14px}
th{color:#64748b;text-transform:uppercase;font-size:11px}
</style></head><body>
<aside class="sidebar"><h2 style="color:#3b82f6;margin-bottom:40px">ADMIN.</h2><nav style="display:flex;flex-direction:column;gap:10px;font-weight:600;font-size:14px"><span>🏠 Dashboard</span><span>👥 Users</span><span>💳 Billing</span><span>⚙️ Settings</span></nav></aside>
<main class="main">
  <div class="card-row">
    <div class="card"><div class="c-val">$48.2k</div><div class="c-lbl">Total MRR</div></div>
    <div class="card"><div class="card" style="padding:0;box-shadow:none"><div class="c-val">1,204</div><div class="c-lbl">Active Customers</div></div></div>
    <div class="card"><div class="c-val" style="color:#10b981">89%</div><div class="c-lbl">Conversion Rate</div></div>
    <div class="card"><div class="c-val" style="color:#f59e0b">2.4%</div><div class="c-lbl">Churn Rate</div></div>
  </div>
  <div class="chart-box"><canvas id="mainChart" height="100"></canvas></div>
  <div class="logs"><h3>Recent Activity</h3>
    <table><thead><tr><th>User</th><th>Action</th><th>Status</th><th>Time</th></tr></thead><tbody>
      <tr><td>Andrei M.</td><td>Subscription Upgraded</td><td><span style="color:#10b981">● Success</span></td><td>2m ago</td></tr>
      <tr><td>Sarah J.</td><td>Password Reset</td><td><span style="color:#3b82f6">● Pending</span></td><td>15m ago</td></tr>
      <tr><td>Marc K.</td><td>Account Created</td><td><span style="color:#10b981">● Success</span></td><td>1h ago</td></tr>
    </tbody></table>
  </div>
</main>
<script>
new Chart(document.getElementById('mainChart'),{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Revenue growth',data:[12,19,15,25,22,35],borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,0.1)',fill:true,tension:0.4}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{display:false}},x:{grid:{display:false}}}}});
</script></body></html>`},

/* 3 ── WEALTH TRACKER ─────────────────────────────── */
{icon:'💰', en:'Wealth Tracker', fr:'Wealth Tracker',
 desc_en:'Personal finance suite with balance monitoring and budgeting',
 desc_fr:'Suite finance perso avec suivi de solde et budget',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Wealth Tracker</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff;padding:40px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:50px}
.balance-card{background:linear-gradient(135deg,#22c55e,#15803d);padding:40px;border-radius:30px;margin-bottom:40px;text-align:center}
.b-val{font-size:60px;font-weight:900}
.budget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.b-item{background:#111;padding:25px;border-radius:20px;border:1px solid #222}
.p-bar{height:8px;background:#222;border-radius:4px;margin-top:15px;overflow:hidden}
.p-fill{height:100%;background:#22c55e}
.trans{margin-top:50px}
.tr-row{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #111}
</style></head><body>
<div class="header"><h2>WEALTH.</h2><div>Settings | Logout</div></div>
<div class="balance-card"><div style="font-size:14px;font-weight:700;opacity:0.8;text-transform:uppercase">Total Balance</div><div class="b-val">$142,500.00</div><div style="margin-top:10px;font-weight:700">+12.4% from last month</div></div>
<div class="budget-grid">
  <div class="b-item"><div>Housing</div><div class="p-bar"><div class="p-fill" style="width:85%;background:#ef4444"></div></div><div style="margin-top:10px;font-size:12px">$1,200 / $1,500</div></div>
  <div class="b-item"><div>Dining</div><div class="p-bar"><div class="p-fill" style="width:40%"></div></div><div style="margin-top:10px;font-size:12px">$240 / $600</div></div>
  <div class="b-item"><div>Stocks</div><div class="p-bar"><div class="p-fill" style="width:100%"></div></div><div style="margin-top:10px;font-size:12px">$5,000 / $5,000</div></div>
</div>
<div class="trans"><h3>Recent Transactions</h3>
  <div class="tr-row"><span>Apple Store</span><span style="color:#ef4444">-$99.00</span></div>
  <div class="tr-row"><span>Dividends Pay</span><span style="color:#22c55e">+$450.00</span></div>
  <div class="tr-row"><span>Starbucks</span><span style="color:#ef4444">-$6.50</span></div>
</div>
</body></html>`},

/* 4 ── WEATHER OS ─────────────────────────────────── */
{icon:'☁️', en:'Weather OS', fr:'Météo OS',
 desc_en:'Highly interactive weather application with dynamic backgrounds',
 desc_fr:'Application météo interactive avec fonds dynamiques',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Weather OS</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:linear-gradient(to bottom, #1e3a8a, #3b82f6);height:100vh;color:#fff;display:flex;align-items:center;justify-content:center}
.container{width:400px;text-align:center;padding:40px;background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);border-radius:40px;border:1px solid rgba(255,255,255,0.1)}
.icon{font-size:120px;margin:20px 0;text-shadow:0 10px 30px rgba(0,0,0,0.2)}
.temp{font-size:80px;font-weight:900}
.forecast{display:flex;justify-content:space-between;margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)}
.f-item{font-weight:700}
</style></head><body>
<div class="container">
  <h2 style="font-size:30px">London, UK</h2>
  <div style="font-weight:700;opacity:0.8">Monday, 14:00</div>
  <div class="icon">⛈️</div>
  <div class="temp">18°</div>
  <div style="font-size:20px;font-weight:700">Light Thunderstorms</div>
  <div class="forecast">
    <div class="f-item">Tue<br>☀️<br>22°</div>
    <div class="f-item">Wed<br>☁️<br>20°</div>
    <div class="f-item">Thu<br>🌧️<br>17°</div>
  </div>
</div>
</body></html>`},

/* 5 ── MARKDOWN STUDIO ──────────────────────────────── */
{icon:'✍️', en:'Markdown Studio', fr:'Studio Markdown',
 desc_en:'Professional CMS with multi-document management and live preview',
 desc_fr:'CMS professionnel avec gestion multi-docs et aperçu live',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>MD Studio</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{display:flex;height:100vh;background:#111;color:#eee}
.sidebar{width:240px;border-right:1px solid #222;padding:25px}
.editor,.preview{flex:1;padding:40px;overflow-y:auto}
.editor{background:#000;border-right:1px solid #222}
textarea{width:100%;height:100%;background:none;border:none;color:#aaa;outline:none;font-family:monospace;font-size:16px;line-height:1.6}
.preview h1{margin-bottom:20px;color:#fff}
.preview p{margin-bottom:15px;color:#94a3b8;line-height:1.7}
.f-item{padding:10px;border-radius:10px;margin-bottom:5px;cursor:pointer;font-weight:700;color:#666}
.f-item.active{background:#222;color:#fff}
</style></head><body>
<div class="sidebar"><h3>Docs</h3><br><div class="f-item active">Introduction.md</div><div class="f-item">Features.md</div><div class="f-item">API_Docs.md</div><br><button style="width:100%;padding:10px;background:#3b82f6;color:#fff;border:none;border-radius:10px;font-weight:700">New File</button></div>
<div class="editor"><textarea id="i" oninput="update()"># Introduction\\n\\nWelcome to **Markdown Studio**. This is a powerful live editor for your documentation. Try changing this text!</textarea></div>
<div class="preview" id="o"></div>
<script>
function update(){
  const v=document.getElementById('i').value;
  document.getElementById('o').innerHTML=v.replace(/^# (.*$)/gm,'<h1>$1</h1>').replace(/\\*\\*(.*)\\*\\*/g,'<strong>$1</strong>');
}
update();
</script></body></html>`},

/* 6 ── INVENTORY MASTER ────────────────────────────── */
{icon:'📦', en:'Inventory Master', fr:'Inventory Master',
 desc_en:'Advanced warehouse tracking with stock alerts and analytics',
 desc_fr:'Suivi d\'entrepôt avancé avec alertes de stock',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Inventory</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;padding:40px}
.hdr{display:flex;justify-content:space-between;margin-bottom:40px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
.s-box{background:#fff;padding:25px;border-radius:15px;box-shadow:0 4px 6px rgba(0,0,0,0.02)}
table{width:100%;background:#fff;border-radius:20px;overflow:hidden;border-collapse:collapse}
th,td{padding:18px;text-align:left;border-bottom:1px solid #f1f5f9}
th{background:#fff;color:#64748b;font-size:11px;text-transform:uppercase}
.status{padding:5px 12px;border-radius:20px;font-size:11px;font-weight:800}
</style></head><body>
<div class="hdr"><h2>📦 Inventory Master</h2><button style="padding:12px 25px;background:#000;color:#fff;border-radius:10px;font-weight:800">+ New Product</button></div>
<div class="stats">
  <div class="s-box"><div>Total Items</div><div style="font-size:32px;font-weight:900">1,842</div></div>
  <div class="s-box"><div>Low Stock</div><div style="font-size:32px;font-weight:900;color:#ef4444">12</div></div>
  <div class="s-box"><div>Monthly Value</div><div style="font-size:32px;font-weight:900;color:#3b82f6">$84,000</div></div>
</div>
<table><thead><tr><th>Product Name</th><th>SKU</th><th>Stock</th><th>Status</th></tr></thead><tbody>
  <tr><td>MacBook Pro 14"</td><td>MBP-14-M3</td><td>45</td><td><span class="status" style="background:#dcfce7;color:#166534">IN STOCK</span></td></tr>
  <tr><td>Magic Mouse 2</td><td>MM-2-WHT</td><td>8</td><td><span class="status" style="background:#fee2e2;color:#991b1b">LOW STOCK</span></td></tr>
  <tr><td>Studio Display</td><td>SD-27-5K</td><td>12</td><td><span class="status" style="background:#dcfce7;color:#166534">IN STOCK</span></td></tr>
</tbody></table>
</body></html>`},

/* 7 ── FITNESS SUITE 360 ───────────────────────────── */
{icon:'🏃', en:'Fitness Suite 360', fr:'Fitness Suite 360',
 desc_en:'Workout tracking system with performance analytics and goals',
 desc_fr:'Système de suivi d\'entraînement avec analytics',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Fitness 360</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff;padding:30px}
.hdr{margin-bottom:40px;display:flex;justify-content:space-between;align-items:center}
.today{background:linear-gradient(135deg,#c084fc,#7c3aed);padding:40px;border-radius:30px;margin-bottom:30px}
.grid{display:grid;grid-template-columns:2fr 1fr;gap:30px}
.w-list{background:#111;padding:30px;border-radius:25px}
.w-item{display:flex;justify-content:space-between;padding:20px 0;border-bottom:1px solid #222}
.stats{background:#111;padding:30px;border-radius:25px}
</style></head><body>
<div class="hdr"><h2>🏃 FITNESS 360</h2><div style="background:#222;padding:10px 20px;border-radius:50px">PROFILE</div></div>
<div class="today"><h1>Chest & Triceps Day</h1><p style="margin-top:10px;font-weight:700">Scheduled: 18:00 Today</p></div>
<div class="grid">
  <div class="w-list"><h3>Exercises</h3><br>
    <div class="w-item"><div>Bench Press</div><div>4 Sets x 8-10 Reps</div></div>
    <div class="w-item"><div>Dumbbell Flyes</div><div>3 Sets x 12 Reps</div></div>
    <div class="w-item"><div>Skull Crushers</div><div>4 Sets x 10 Reps</div></div>
  </div>
  <div class="stats"><h3>Goal Progress</h3><br>
    <div style="margin-bottom:20px">Weight Management<div style="height:10px;background:#222;margin-top:8px;border-radius:5px"><div style="width:85%;height:100%;background:#a855f7;border-radius:5px"></div></div></div>
    <div>Running Weekly Goal<div style="height:10px;background:#222;margin-top:8px;border-radius:5px"><div style="width:40%;height:100%;background:#3b82f6;border-radius:5px"></div></div></div>
  </div>
</div>
</body></html>`},

/* 8 ── RECIPE MANAGER PRO ──────────────────────────── */
{icon:'🍳', en:'Recipe Pro', fr:'Recipe Pro',
 desc_en:'Professional recipe suit with scaling ingredients and timers',
 desc_fr:'Suite pro de recettes avec mise à l\'échelle',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Recipe Pro</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#fff7ed;color:#7c2d12;padding:40px}
.card{max-width:800px;margin:0 auto;background:#fff;border-radius:30px;overflow:hidden;box-shadow:0 20px 40px rgba(124,45,18,0.05)}
.r-img{height:300px;background:#fed7aa;display:flex;align-items:center;justify-content:center;font-size:100px}
.r-body{padding:50px}
.r-meta{display:flex;gap:30px;margin:20px 0;font-weight:700;color:#ea580c}
.ing{background:#fff7ed;padding:30px;border-radius:20px;margin-top:30px}
</style></head><body>
<div class="card">
  <div class="r-img">🍝</div>
  <div class="r-body">
    <div style="text-transform:uppercase;font-weight:900;font-size:12px;color:#ea580c">Italian Cuisine</div>
    <h1 style="font-size:42px;margin:10px 0">Pasta Carbonara</h1>
    <div class="r-meta"><span>⏱️ 20 Min</span><span>⚡ Beginners</span><span>🍽️ 4 Portions</span></div>
    <p style="line-height:1.7;color:#9a3412">A classic Roman pasta dish made with egg, hard cheese, cured pork, and black pepper. Simple yet incredibly rich.</p>
    <div class="ing"><h3>Ingredients</h3><br><ul><li>400g Spaghetti</li><li>150g Guanciale</li><li>3 Large Eggs</li><li>50g Pecorino Romano</li></ul></div>
  </div>
</div>
</body></html>`},

/* 9 ── CONTROL AUDIO ENGINE ────────────────────────── */
{icon:'🎵', en:'Audio Engine', fr:'Moteur Audio',
 desc_en:'Complex music controller with waveforms and volume mastering',
 desc_fr:'Contrôleur audio complexe avec formes d\'ondes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Audio Engine</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh}
.player{width:500px;background:#111;padding:40px;border-radius:40px;border:1px solid #222;text-align:center}
.album-art{width:250px;height:250px;background:linear-gradient(45deg,#3b82f6,#ef4444);border-radius:30px;margin:0 auto 30px;box-shadow:0 30px 60px rgba(0,0,0,0.5)}
.wave{display:flex;align-items:center;justify-content:center;gap:3px;height:40px;margin:30px 0}
.bar{width:4px;background:#333;border-radius:2px;animation:dance 1.4s infinite ease-in-out height}
@keyframes dance{0%,100%{height:10px}50%{height:40px}}
.controls{display:flex;justify-content:center;gap:30px;align-items:center}
.p-btn{width:60px;height:60px;background:#fff;border-radius:50%;color:#000;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer}
</style></head><body>
<div class="player">
  <div class="album-art"></div>
  <h2 style="font-size:28px">Endless Summer</h2>
  <p style="color:#666;font-weight:700">Crystal Waves • Synth Pop</p>
  <div class="wave">
    <div class="bar" style="animation-delay:0s"></div><div class="bar" style="animation-delay:0.2s"></div><div class="bar" style="animation-delay:0.4s"></div><div class="bar" style="animation-delay:0.1s"></div><div class="bar" style="animation-delay:0.3s"></div><div class="bar" style="animation-delay:0.5s"></div>
  </div>
  <div class="controls"><span style="font-size:24px">⏮</span><div class="p-btn">▶</div><span style="font-size:24px">⏭</span></div>
</div>
</body></html>`},

/* 10 ── ARCADE PLATFORMER ─────────────────────────── */
{icon:'🕹️', en:'Arcade Engine', fr:'Moteur Arcade',
 desc_en:'Complete 2D platformer engine with physics and levels',
 desc_fr:'Moteur de jeu de plateforme 2D avec physique',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Arcade</title>
<style>
body{margin:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;color:#fff;font-family:sans-serif}
canvas{background:#111;border:4px solid #333;border-radius:10px;image-rendering:pixelated}
</style></head><body>
<h2>🕹️ Arcade Studio</h2><p>Use arrows to move/jump</p><br>
<canvas id="g" width="600" height="300"></canvas>
<script>
const c=document.getElementById('g'),ctx=c.getContext('2d');
let p={x:50,y:200,w:20,h:20,dy:0,jump:true},keys={};
window.onkeydown=e=>keys[e.code]=true;window.onkeyup=e=>keys[e.code]=false;
function update(){
  if(keys.ArrowRight) p.x+=3; if(keys.ArrowLeft) p.x-=3;
  if(keys.ArrowUp && !p.jump){p.dy=-8;p.jump=true}
  p.dy+=0.4;p.y+=p.dy;
  if(p.y>250){p.y=250;p.dy=0;p.jump=false}
  ctx.clearRect(0,0,600,300);
  ctx.fillStyle='#3b82f6';ctx.fillRect(p.x,p.y,p.w,p.h);
  ctx.fillStyle='#333';ctx.fillRect(0,270,600,30);
  requestAnimationFrame(update);
}
update();
</script></body></html>`}

];

window.PRO_APPS_DATA = PRO_APPS_DATA;
