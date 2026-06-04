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
</script></body></html>`},

/* 11 ── VISUAL NODE ENGINE ──────────────────────────── */
{icon:'🔀', en:'Node Engine', fr:'Moteur de Nœuds',
 desc_en:'Visual node-based logic builder with drag-and-drop connections',
 desc_fr:'Créateur de logique visuelle basé sur des nœuds avec connexions',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Node Engine</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#0f172a;color:#f8fafc;display:flex;height:100vh;overflow:hidden}
.sidebar{width:250px;background:#1e293b;padding:20px;border-right:1px solid #334155;z-index:10}
.canvas{flex:1;position:relative;background:radial-gradient(#334155 1px, transparent 1px);background-size:20px 20px}
.node{position:absolute;width:200px;background:#1e293b;border:1px solid #475569;border-radius:12px;padding:15px;box-shadow:0 10px 25px rgba(0,0,0,0.5);cursor:move;user-select:none}
.node-title{font-size:13px;font-weight:800;color:#38bdf8;margin-bottom:10px;display:flex;justify-content:space-between}
.port{width:12px;height:12px;background:#f8fafc;border-radius:50%;border:3px solid #38bdf8;cursor:crosshair;position:absolute;top:50%;transform:translateY(-50%)}
.port-in{left:-6px} .port-out{right:-6px;background:#38bdf8}
#svg-layer{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0}
path{fill:none;stroke:#38bdf8;stroke-width:3;stroke-dasharray:5;animation:dash 30s linear infinite}
@keyframes dash{to{stroke-dashoffset:1000}}
</style></head><body>
<div class="sidebar"><h3>🧱 Logic Blocks</h3><br><div style="padding:10px;background:#334155;border-radius:8px;margin-bottom:10px;cursor:pointer">Database Query</div><div style="padding:10px;background:#334155;border-radius:8px;margin-bottom:10px;cursor:pointer">HTTP Request</div></div>
<div class="canvas" id="c">
  <svg id="svg-layer"><path d="M 194 150 C 300 150, 200 250, 406 250" /></svg>
  <div class="node" style="left:50px;top:100px"><div class="port port-out"></div><div class="node-title">Search Bar <span>●</span></div><div style="font-size:11px;color:#94a3b8">On Input -> Trigger</div></div>
  <div class="node" style="left:400px;top:200px"><div class="port port-in"></div><div class="port port-out"></div><div class="node-title">Supabase Data <span>●</span></div><div style="font-size:11px;color:#94a3b8">Fetch Record</div></div>
</div>
<script>
let dragging=null,offX=0,offY=0;
document.querySelectorAll('.node').forEach(n=>{
  n.addEventListener('mousedown', e=>{dragging=n;offX=e.clientX-n.offsetLeft;offY=e.clientY-n.offsetTop;n.style.zIndex=5;});
});
window.addEventListener('mousemove', e=>{
  if(dragging){dragging.style.left=(e.clientX-offX)+'px';dragging.style.top=(e.clientY-offY)+'px'; updateLine();}
});
window.addEventListener('mouseup', ()=>{if(dragging){dragging.style.zIndex=1;dragging=null;}});
function updateLine(){
  const nodes = document.querySelectorAll('.node');
  if(nodes.length >= 2) {
    const n1 = nodes[0], n2 = nodes[1];
    document.querySelector('path').setAttribute('d',\`M \${n1.offsetLeft+200} \${n1.offsetTop+50} C \${n1.offsetLeft+300} \${n1.offsetTop+50}, \${n2.offsetLeft-100} \${n2.offsetTop+50}, \${n2.offsetLeft} \${n2.offsetTop+50}\`);
  }
}
updateLine();
</script></body></html>`},

/* 12 ── INFINITE GENERATIVE CANVAS ────────────────── */
{icon:'🌠', en:'Gen Canvas', fr:'Toile Générative',
 desc_en:'Infinite panning workspace for AI prompt-to-app real-time generation',
 desc_fr:'Espace de travail infini pour la génération IA d\'applications',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Gen Canvas</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;color:#fff;overflow:hidden;height:100vh}
.viewport{width:100%;height:100%;position:relative;cursor:grab}
.viewport:active{cursor:grabbing}
.canvas{position:absolute;width:5000px;height:5000px;left:-2000px;top:-2000px;background:radial-gradient(circle, #222 2px, transparent 2px);background-size:40px 40px;transform-origin:center center}
.comp{position:absolute;background:#111;border:1px solid #333;border-radius:15px;box-shadow:0 20px 50px rgba(0,0,0,0.8);overflow:hidden;width:300px}
.c-hdr{background:#222;padding:10px;font-size:11px;font-weight:800;color:#888;display:flex;justify-content:space-between}
.c-body{padding:20px}
.prompt-box{position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);padding:15px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);display:flex;gap:10px;width:600px;box-shadow:0 30px 60px rgba(0,0,0,0.5);z-index:100}
input{flex:1;background:transparent;border:none;color:#fff;font-size:16px;outline:none}
button{background:#fff;color:#000;border:none;padding:10px 20px;border-radius:10px;font-weight:800;cursor:pointer}
</style></head><body>
<div class="viewport" id="v">
  <div class="canvas" id="cv">
    <div class="comp" style="left:2050px;top:2050px">
      <div class="c-hdr"><span>Auth Widget</span><span>⚙️</span></div>
      <div class="c-body"><h3 style="margin-bottom:10px">Sign In</h3><input type="text" placeholder="Email" style="width:100%;background:#000;padding:10px;border:1px solid #333;margin-bottom:10px;border-radius:5px"/><button style="width:100%">Submit</button></div>
    </div>
    <div class="comp" style="left:2400px;top:2100px;width:350px">
      <div class="c-hdr"><span>Chart Dashboard</span><span>⚙️</span></div>
      <div class="c-body"><div style="height:150px;background:linear-gradient(to top, #3b82f6 0%, transparent 100%);border-bottom:2px solid #3b82f6;display:flex;align-items:flex-end;gap:5px"><div style="width:15px;height:40%;background:#3b82f6"></div><div style="width:15px;height:70%;background:#3b82f6"></div><div style="width:15px;height:30%;background:#3b82f6"></div></div></div>
    </div>
  </div>
</div>
<div class="prompt-box"><span style="font-size:24px">✨</span><input type="text" placeholder="Prompt a new feature component..." /><button>Generate</button></div>
<script>
let v=document.getElementById('v'), cv=document.getElementById('cv');
let isDown=false, startX, startY, currentX=0, currentY=0, initX=0, initY=0;
v.addEventListener('mousedown', e=>{isDown=true;startX=e.pageX;startY=e.pageY;initX=currentX;initY=currentY;v.style.cursor='grabbing';});
window.addEventListener('mouseup', ()=>{isDown=false;v.style.cursor='grab';});
window.addEventListener('mousemove', e=>{
  if(!isDown)return; e.preventDefault();
  currentX = initX + (e.pageX-startX)*1.5;
  currentY = initY + (e.pageY-startY)*1.5;
  cv.style.transform=\`translate(\${currentX}px, \${currentY}px)\`;
});
</script></body></html>`},

/* 13 ── API & DB MOCK SERVER ──────────────────────── */
{icon:'🗄️', en:'API Simulator', fr:'Simulateur API',
 desc_en:'Simulate dynamic backend database JSON returns for your UI',
 desc_fr:'Simule des retours JSON dynamiques pour votre interface',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>API Mock Server</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;color:#1e293b;padding:40px;display:flex;gap:30px;height:100vh}
.panel{background:#fff;padding:30px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.05);flex:1;display:flex;flex-direction:column}
.btn{background:#10b981;color:#fff;border:none;padding:12px 20px;border-radius:10px;font-weight:800;cursor:pointer;margin-top:20px}
.schema-row{display:flex;gap:10px;margin-bottom:10px}
.schema-row input, .schema-row select{padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;outline:none}
.json-out{background:#0f172a;color:#38bdf8;border-radius:10px;padding:20px;font-family:'JetBrains Mono',monospace;font-size:13px;overflow-y:auto;flex:1;white-space:pre-wrap}
</style></head><body>
<div class="panel">
  <h2>🗄️ Schema Builder</h2><p style="color:#64748b;margin:10px 0 30px;font-size:14px">Define your table columns and types.</p>
  <div id="sch"><div class="schema-row"><input type="text" value="id"/><select><option>UUID</option><option>Number</option></select></div><div class="schema-row"><input type="text" value="name"/><select><option>Full Name</option><option>Company</option></select></div><div class="schema-row"><input type="text" value="balance"/><select><option>Currency</option><option>Number</option></select></div></div>
  <button class="btn" style="background:#f1f5f9;color:#64748b">+ Add Field</button>
  <div style="margin-top:auto"><label style="font-size:12px;font-weight:800">ROWS TO GENERATE</label><br><input type="range" min="1" max="100" value="5" style="width:100%;margin-top:10px" oninput="document.getElementById('rv').textContent=this.value"/><span id="rv" style="font-weight:800">5</span></div>
  <button class="btn" onclick="generate()">⚡ Start Mock Server</button>
</div>
<div class="panel">
  <h2>Live Endpoint: <span style="color:#10b981">GET /api/v1/mock</span></h2>
  <div class="json-out" id="out">// Click "Start Mock Server" to preview JSON data...</div>
</div>
<script>
function generate(){
  const rows = parseInt(document.querySelector('input[type="range"]').value);
  const data = [];
  for(let i=0; i<rows; i++){
    data.push({
      id: 'usr_'+Math.random().toString(36).substring(2,9),
      name: ['John Doe','Sarah Smith','Mike Johnson','Emma Watson'][Math.floor(Math.random()*4)],
      balance: '$'+(Math.random()*10000).toFixed(2)
    });
  }
  document.getElementById('out').textContent = JSON.stringify({status:200, data: data}, null, 2);
}
generate();
</script></body></html>`},

/* 14 ── GSAP ANIMATOR STUDIO ──────────────────────── */
{icon:'🎬', en:'Animator Studio', fr:'Studio GSAP',
 desc_en:'Visual timeline editor to apply GSAP animations to UI elements',
 desc_fr:'Éditeur de timeline pour appliquer des animations GSAP',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Animator Studio</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#111;color:#eee;display:flex;flex-direction:column;height:100vh}
.preview-area{flex:1;display:flex;align-items:center;justify-content:center;background:linear-gradient(45deg,#1a1a2e,#16213e)}
.demo-box{width:200px;height:200px;background:linear-gradient(135deg,#f43f5e,#fb923c);border-radius:30px;box-shadow:0 30px 60px rgba(0,0,0,0.5)}
.timeline{height:300px;background:#0f0f15;border-top:1px solid #333;padding:20px;overflow-y:auto}
.tl-track{display:flex;align-items:center;margin-bottom:15px;background:#1a1a20;border-radius:10px;padding:10px}
.tl-label{width:120px;font-size:12px;font-weight:800;color:#a1a1aa}
.tl-bar-container{flex:1;height:30px;background:#272730;border-radius:5px;position:relative}
.tl-bar{position:absolute;height:100%;background:#3b82f6;border-radius:5px;cursor:pointer;opacity:0.8;display:flex;align-items:center;padding-left:10px;font-size:11px;font-weight:800}
.controls{display:flex;gap:15px;margin-bottom:20px}
.btn{background:#fff;color:#000;border:none;padding:8px 15px;border-radius:5px;font-weight:800;cursor:pointer}
</style></head><body>
<div class="preview-area"><div class="demo-box" id="box"></div></div>
<div class="timeline">
  <div class="controls"><button class="btn" onclick="play()">▶ Play Timeline</button><span style="font-family:monospace;align-self:center;color:#6b7280">GSAP 3.12.2 Loaded</span></div>
  <div class="tl-track"><div class="tl-label">RotZ (deg)</div><div class="tl-bar-container"><div class="tl-bar" style="left:10%;width:40%;background:#a855f7">0 → 360</div></div></div>
  <div class="tl-track"><div class="tl-label">Scale</div><div class="tl-bar-container"><div class="tl-bar" style="left:30%;width:60%;background:#10b981">1 → 1.5 → 1</div></div></div>
  <div class="tl-track"><div class="tl-label">Border Radius</div><div class="tl-bar-container"><div class="tl-bar" style="left:0%;width:80%;background:#f59e0b">30px → 50%</div></div></div>
</div>
<script>
function play(){
  const b=document.getElementById('box');
  b.style.transition='none';
  b.style.transform='rotate(0deg) scale(1)';
  b.style.borderRadius='30px';
  setTimeout(()=>{
    b.style.transition='all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    b.style.transform='rotate(360deg) scale(1.5)';
    b.style.borderRadius='50%';
    setTimeout(()=>{b.style.transform='rotate(360deg) scale(1)'},2000);
  },50);
}
</script></body></html>`},

/* 15 ── RESPONSIVE MATRIX ─────────────────────────── */
{icon:'📱', en:'Responsive Grid', fr:'Matrice Responsive',
 desc_en:'Simultaneous live preview of apps on iPhone, iPad, and Desktop',
 desc_fr:'Prévisualisation simultanée sur iPhone, iPad et Desktop',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Responsive Matrix</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#cbd5e1;padding:40px;display:flex;gap:40px;justify-content:flex-start;align-items:center;min-height:100vh;overflow-x:auto}
.device{flex-shrink:0;background:#fff;border-radius:24px;box-shadow:0 25px 50px rgba(0,0,0,0.15);overflow:hidden;border:8px solid #1e293b;position:relative}
.d-title{position:absolute;top:0;left:0;width:100%;text-align:center;font-weight:800;background:#1e293b;color:#f8fafc;font-size:10px;text-transform:uppercase;padding:5px 0;z-index:10}
.mobile{width:320px;height:650px;border-radius:40px;border-width:14px}
.tablet{width:500px;height:700px;border-radius:30px}
.desktop{width:800px;height:500px;border-radius:20px}
.preview-content{width:100%;height:100%;background:#f8fafc;padding:40px 20px 20px;overflow-y:auto}
.skeleton-hdr{height:60px;background:#e2e8f0;border-radius:10px;margin-bottom:20px}
.skeleton-card{height:120px;background:#fff;border-radius:12px;margin-bottom:15px;box-shadow:0 4px 6px rgba(0,0,0,0.05)}
</style></head><body>
<div class="device mobile"><div class="d-title">iPhone 15 Pro</div><div class="preview-content" onscroll="syncScroll(this)"><div class="skeleton-hdr"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div></div>
<div class="device tablet"><div class="d-title">iPad Pro</div><div class="preview-content" onscroll="syncScroll(this)"><div class="skeleton-hdr"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div></div></div>
<div class="device desktop"><div class="d-title">Desktop 4K</div><div class="preview-content" onscroll="syncScroll(this)"><div class="skeleton-hdr"></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div></div></div>
<script>
let isSyncing = false;
function syncScroll(source) {
  if (isSyncing) return;
  isSyncing = true;
  document.querySelectorAll('.preview-content').forEach(el => {
    if (el !== source) el.scrollTop = source.scrollTop;
  });
  requestAnimationFrame(() => { isSyncing = false; });
}
</script></body></html>`},

/* 16 ── HOLO-UI 3D COMPONENTS ─────────────────────── */
{icon:'🧊', en:'Holo-UI 3D', fr:'Web 3D Holo',
 desc_en:'Next-gen 3D DOM components with interactive tracking and reflections',
 desc_fr:'Composants DOM 3D de nouvelle génération avec reflets',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Holo UI</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;perspective:1000px;overflow:hidden}
.card{width:350px;height:500px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:30px;position:relative;transform-style:preserve-3d;transition:transform 0.1s ease-out;box-shadow:0 30px 60px rgba(0,0,0,0.8);backdrop-filter:blur(10px)}
.glow{position:absolute;width:100%;height:100%;border-radius:30px;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 60%);opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:2}
.content{position:absolute;inset:0;padding:40px;transform:translateZ(60px);color:#fff;text-align:center;display:flex;flex-direction:column;justify-content:center;pointer-events:none}
h2{font-size:32px;margin-bottom:10px;text-shadow:0 10px 20px rgba(0,0,0,0.5)}
p{color:#94a3b8;font-size:14px;line-height:1.6}
.btn{margin-top:40px;padding:15px;background:#3b82f6;color:#fff;border-radius:15px;font-weight:800;border:none;transform:translateZ(90px);box-shadow:0 20px 40px rgba(59,130,246,0.4);pointer-events:auto;cursor:pointer}
</style></head><body>
<div class="card" id="c">
  <div class="glow" id="g"></div>
  <div class="content">
    <h2>Holographic UI</h2>
    <p>Move your mouse over the screen to interact with the 3D depth map and dynamic reflections.</p>
    <button class="btn">Explore 3D Web</button>
  </div>
</div>
<script>
const card=document.getElementById('c'), glow=document.getElementById('g');
document.addEventListener('mousemove', e=>{
  const xAxis = (window.innerWidth/2 - e.pageX)/20;
  const yAxis = (window.innerHeight/2 - e.pageY)/20;
  card.style.transform = \`rotateY(\${xAxis}deg) rotateX(\${yAxis}deg)\`;
  glow.style.opacity = 1;
  glow.style.background = \`radial-gradient(circle at \${e.pageX-card.offsetLeft}px \${e.pageY-card.offsetTop}px, rgba(255,255,255,0.15), transparent 50%)\`;
});
document.addEventListener('mouseleave',()=>{
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  glow.style.opacity = 0;
});
</script></body></html>`},

/* 17 ── CODE-HEALTH ANALYZER ──────────────────────── */
{icon:'🩺', en:'Health Analyzer', fr:'Analyseur Code',
 desc_en:'Real-time deep analysis of DOM size, SEO, and Accessibility',
 desc_fr:'Analyse en temps réel du DOM, du SEO et de l\'accessibilité',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Health Analyzer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#f8fafc;padding:50px;color:#1e293b}
.hdr{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px;border-bottom:2px solid #e2e8f0;padding-bottom:20px}
.scores{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;margin-bottom:50px}
.score-box{background:#fff;padding:30px;border-radius:24px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.02)}
.circle{width:100px;height:100px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:900;border:8px solid #22c55e;color:#22c55e}
.console{background:#0f172a;color:#f8fafc;padding:30px;border-radius:20px;font-family:monospace;font-size:14px;line-height:1.6}
.err{color:#ef4444} .warn{color:#f59e0b} .ok{color:#10b981}
</style></head><body>
<div class="hdr">
  <div><h1 style="font-size:36px;font-weight:900;color:#0f172a">🩺 Code Health</h1><div style="font-weight:700;color:#64748b;margin-top:10px">Target: /generated-app/index.html</div></div>
  <button style="background:#3b82f6;color:#fff;border:none;padding:15px 30px;border-radius:12px;font-weight:800;cursor:pointer">Re-Analyze</button>
</div>
<div class="scores">
  <div class="score-box"><div class="circle" style="border-color:#22c55e;color:#22c55e">98</div><h3 style="font-size:14px;text-transform:uppercase;color:#64748b">Performance</h3></div>
  <div class="score-box"><div class="circle" style="border-color:#22c55e;color:#22c55e">100</div><h3 style="font-size:14px;text-transform:uppercase;color:#64748b">Accessibility</h3></div>
  <div class="score-box"><div class="circle" style="border-color:#f59e0b;color:#f59e0b">85</div><h3 style="font-size:14px;text-transform:uppercase;color:#64748b">Best Practices</h3></div>
  <div class="score-box"><div class="circle" style="border-color:#22c55e;color:#22c55e">100</div><h3 style="font-size:14px;text-transform:uppercase;color:#64748b">SEO</h3></div>
</div>
<div class="console">
  <div>> Running DOM tree analysis... <span class="ok">[OK]</span></div>
  <div>> Checking ARIA labels... <span class="ok">[OK]</span></div>
  <div>> Validating semantic HTML... <span class="warn">[WARNING]</span> Missing main landmark.</div>
  <div>> Testing image alt attributes... <span class="err">[ERROR]</span> 2 images missing alt text.</div>
  <div style="margin-top:20px;color:#38bdf8">> 🚀 Analysis complete. Fix 1 Warning and 1 Error to achieve 100/100 globally.</div>
</div>
</body></html>`}

];

window.PRO_APPS_DATA = PRO_APPS_DATA;

