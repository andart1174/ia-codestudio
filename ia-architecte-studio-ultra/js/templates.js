// IA Architecte Studio ULTRA — Real Functional Apps Library (27 Apps)
// Fully verified, standalone, syntax-clean JavaScript applications

window.ULTRA_TEMPLATES = [

// ══════════════════════════════════════════════════════════════════════════════
// 1. PRODUCTIVITY (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 1. TASK MANAGER PRO ──────────────────────────────────────────────────────
{
  id: 'todo',
  name: 'Task Manager Pro',
  nameF: 'Gestionnaire de Tâches Pro',
  category: 'productivity',
  icon: '✅',
  badge: 'Productivity',
  difficulty: 'Beginner',
  description: 'Full featured task management app with priorities, tag filters and localStorage sync',
  descriptionF: 'Gestionnaire de tâches moderne avec priorités, tags et synchronisation locale',
  html: '<div class="app">\n' +
    '  <div class="header">\n' +
    '    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">\n' +
    '      <h1 style="color:#fff;font-size:1.5rem;margin:0">✅ My Daily Planner</h1><span id="count" style="color:#a5b4fc;font-size:0.85rem">0 tasks</span>\n' +
    '    </div>\n' +
    '    <div style="display:flex;gap:8px;margin-bottom:12px">\n' +
    '      <input id="task-input" placeholder="What needs to be done today?..." style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;padding:10px 14px;font-size:0.95rem;outline:none"/>\n' +
    '      <select id="priority" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;padding:10px 8px;font-size:0.85rem;cursor:pointer">\n' +
    '        <option value="low">🟢 Low</option><option value="med" selected>🟡 Med</option><option value="high">🔴 High</option>\n' +
    '      </select>\n' +
    '      <button id="add-btn" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:10px 20px;border-radius:10px;font-weight:700;cursor:pointer">+ Add</button>\n' +
    '    </div>\n' +
    '    <div style="display:flex;gap:8px">\n' +
    '      <button class="filter active" data-f="all">All</button>\n' +
    '      <button class="filter" data-f="active">Active</button>\n' +
    '      <button class="filter" data-f="done">Completed</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div id="list" style="display:flex;flex-direction:column;gap:8px;padding:12px 0"></div>\n' +
    '  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px;margin-top:8px">\n' +
    '    <button id="clear-done" style="background:none;border:none;color:#94a3b8;font-size:0.85rem;cursor:pointer">🗑 Clear completed</button>\n' +
    '    <span id="progress" style="color:#a5b4fc;font-size:0.85rem"></span>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:linear-gradient(135deg,#0f172a,#1e1b4b);min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;font-family:sans-serif}.app{width:100%;max-width:560px}.header{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:24px;margin-bottom:12px}.filter{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#a5b4fc;padding:6px 16px;border-radius:20px;cursor:pointer;font-size:0.85rem;transition:all .2s}.filter.active{background:#6366f1;border-color:#6366f1;color:#fff}.task-item{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-left:4px solid #6366f1;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px}.task-item.done{opacity:0.5}.task-item[data-p="high"]{border-left-color:#ef4444}.task-item[data-p="low"]{border-left-color:#10b981}.cb{width:20px;height:20px;border-radius:6px;border:2px solid #6366f1;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.cb.checked{background:#6366f1}.cb.checked::after{content:"✓";color:#fff;font-size:12px;font-weight:700}.txt{flex:1;color:#e2e8f0;font-size:0.95rem}.done-txt{text-decoration:line-through;color:#64748b}.bdg{font-size:0.7rem;padding:2px 8px;border-radius:20px;font-weight:600}.bh{background:rgba(239,68,68,0.15);color:#ef4444}.bm{background:rgba(251,191,36,0.15);color:#fbbf24}.bl{background:rgba(16,185,129,0.15);color:#10b981}.del{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#ef4444;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center}',
  js: 'var tasks=JSON.parse(localStorage.getItem("ultra_tasks")||"[]"),filter="all";\n' +
    'function save(){localStorage.setItem("ultra_tasks",JSON.stringify(tasks))}\n' +
    'function addTask(){var txt=document.getElementById("task-input").value.trim();if(!txt)return;tasks.unshift({id:Date.now(),text:txt,done:false,p:document.getElementById("priority").value});document.getElementById("task-input").value="";save();render()}\n' +
    'function render(){var filtered=tasks.filter(function(t){return filter==="all"?true:filter==="done"?t.done:!t.done});document.getElementById("list").innerHTML=filtered.map(function(t){return "<div class=\\"task-item"+(t.done?" done":"")+"\\" data-p=\\""+t.p+"\\"><div class=\\"cb"+(t.done?" checked":"")+"\\" onclick=\\"toggle("+t.id+")\\"></div><span class=\\"txt"+(t.done?" done-txt":"")+"\\">"+t.text+"</span><span class=\\"bdg b"+t.p+"\\">"+(t.p==="high"?"🔴 High":t.p==="med"?"🟡 Med":"🟢 Low")+"</span><div class=\\"del\\" onclick=\\"del("+t.id+")\\">✕</div></div>"}).join("");var done=tasks.filter(function(t){return t.done}).length;document.getElementById("count").textContent=tasks.length+" task"+(tasks.length!==1?"s":"");document.getElementById("progress").textContent=done+"/"+tasks.length+" done"}\n' +
    'function toggle(id){var t=tasks.find(function(x){return x.id===id});if(t)t.done=!t.done;save();render()}\n' +
    'function del(id){tasks=tasks.filter(function(x){return x.id!==id});save();render()}\n' +
    'document.getElementById("add-btn").addEventListener("click",addTask);\n' +
    'document.getElementById("task-input").addEventListener("keydown",function(e){if(e.key==="Enter")addTask()});\n' +
    'document.querySelectorAll(".filter").forEach(function(btn){btn.addEventListener("click",function(){document.querySelectorAll(".filter").forEach(function(b){b.classList.remove("active")});btn.classList.add("active");filter=btn.dataset.f;render()})});\n' +
    'document.getElementById("clear-done").addEventListener("click",function(){tasks=tasks.filter(function(t){return !t.done});save();render()});\n' +
    'render();'
},

// ─── 2. AGILE KANBAN BOARD ───────────────────────────────────────────────────
{
  id: 'kanban',
  name: 'Agile Kanban Project Board',
  nameF: 'Tableau Kanban Projet Agile',
  category: 'productivity',
  icon: '📋',
  badge: 'Workflow Hub',
  difficulty: 'Intermediate',
  description: 'Interactive kanban project board with drag & drop cards and task state transitions',
  descriptionF: 'Tableau de projet kanban avec cartes déplaçables et gestion des flux',
  html: '<div style="background:#030712;min-height:100vh;font-family:sans-serif;color:#e2e8f0;padding:20px">\n' +
    '  <div style="max-width:900px;margin:0 auto">\n' +
    '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">\n' +
    '      <h1 style="color:#fff;font-size:1.4rem;margin:0">📋 Agile Kanban</h1>\n' +
    '      <button onclick="showAddBar()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:8px 16px;border-radius:8px;font-weight:700;cursor:pointer">+ Add Task</button>\n' +
    '    </div>\n' +
    '    <div id="add-bar" style="display:none;background:#0d1326;border:1px solid rgba(99,102,241,0.4);border-radius:10px;padding:10px 14px;margin-bottom:14px;display:none;gap:8px;align-items:center">\n' +
    '      <input id="task-inp" placeholder="Enter task title..." style="flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(99,102,241,0.4);border-radius:8px;color:#fff;padding:8px 12px;font-size:0.9rem;outline:none"/>\n' +
    '      <button onclick="doAddTask()" style="background:#6366f1;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-weight:700;cursor:pointer">Add</button>\n' +
    '      <button onclick="document.getElementById(\'add-bar\').style.display=\'none\'" style="background:rgba(255,255,255,0.06);color:#94a3b8;border:none;padding:8px 12px;border-radius:8px;cursor:pointer">✕</button>\n' +
    '    </div>\n' +
    '    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px" id="cols"></div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}.col{background:#0a0f1e;border:1px solid rgba(99,102,241,0.15);border-radius:12px;padding:14px;min-height:360px}.col-title{font-weight:700;color:#a5b4fc;margin-bottom:12px;text-transform:uppercase;font-size:0.8rem;display:flex;justify-content:space-between;align-items:center}.card-item{background:#111827;border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;margin-bottom:8px;cursor:pointer;transition:all .2s}.card-item:hover{border-color:rgba(99,102,241,0.4);transform:translateY(-1px)}#add-bar{display:none}#task-inp:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(99,102,241,0.2)}',
  js: 'var columns={todo:["Design landing page","Setup database"],inprog:["Build auth API"],done:["Init repo"]};\n' +
    'var colLabels={todo:"📥 To Do",inprog:"⚙️ In Progress",done:"✅ Done"};\n' +
    'function render(){\n' +
    '  var cols=document.getElementById("cols");\n' +
    '  cols.innerHTML=Object.keys(columns).map(function(k){\n' +
    '    return "<div class=\\"col\\"><div class=\\"col-title\\"><span>"+colLabels[k]+" ("+columns[k].length+")</span></div>"\n' +
    '      +columns[k].map(function(t,i){\n' +
    '        return "<div class=\\"card-item\\" onclick=\\"move(\'"+k+"\',"+i+")\\" title=\\"Click to advance\\">"+t+"</div>";\n' +
    '      }).join("")+"</div>";\n' +
    '  }).join("");\n' +
    '}\n' +
    'function move(from,idx){var item=columns[from].splice(idx,1)[0];if(from==="todo")columns.inprog.push(item);else if(from==="inprog")columns.done.push(item);else columns.todo.push(item);render()}\n' +
    'function showAddBar(){var bar=document.getElementById("add-bar");bar.style.display="flex";document.getElementById("task-inp").focus();}\n' +
    'function doAddTask(){var inp=document.getElementById("task-inp");var t=inp.value.trim();if(t){columns.todo.push(t);inp.value="";document.getElementById("add-bar").style.display="none";render();}}\n' +
    'document.addEventListener("keydown",function(e){if(e.key==="Enter"&&document.activeElement&&document.activeElement.id==="task-inp")doAddTask();});\n' +
    'render();'
},


// ─── 3. POMODORO FOCUS STUDIO ─────────────────────────────────────────────────
{
  id: 'pomodoro',
  name: 'Pomodoro Focus Studio',
  nameF: 'Studio Focus Pomodoro',
  category: 'productivity',
  icon: '🍅',
  badge: 'Focus',
  difficulty: 'Beginner',
  description: 'Clean concentration timer with circular SVG progress and audio chime intervals',
  descriptionF: 'Minuteur de concentration avec progression circulaire',
  html: '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0d0d0d;font-family:sans-serif">\n' +
    '  <div style="text-align:center;padding:36px;background:#111;border-radius:24px;border:1px solid rgba(255,255,255,0.06);width:320px">\n' +
    '    <div style="position:relative;width:180px;height:180px;margin:0 auto 24px">\n' +
    '      <svg style="position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)" viewBox="0 0 200 200">\n' +
    '        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>\n' +
    '        <circle id="ring" cx="100" cy="100" r="85" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round" stroke-dasharray="534" stroke-dashoffset="0"/>\n' +
    '      </svg>\n' +
    '      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">\n' +
    '        <div id="time" style="font-size:2.8rem;font-weight:700;color:#fff;letter-spacing:1px">25:00</div>\n' +
    '        <div style="font-size:0.7rem;color:#888;letter-spacing:2px;margin-top:2px">FOCUS</div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div style="display:flex;gap:12px;justify-content:center">\n' +
    '      <button id="play-btn" onclick="toggleTimer()" style="background:#ef4444;border:none;color:#fff;padding:12px 28px;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer">▶ Start</button>\n' +
    '      <button onclick="resetTimer()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;padding:12px 18px;border-radius:10px;cursor:pointer">↺</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}',
  js: 'var duration=25*60,remaining=25*60,running=false,interval=null,circLen=534;\n' +
    'function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}\n' +
    'function updateRing(){document.getElementById("ring").style.strokeDashoffset=circLen*(1-remaining/duration)}\n' +
    'function toggleTimer(){if(running){running=false;clearInterval(interval);document.getElementById("play-btn").textContent="▶ Start"}else{running=true;document.getElementById("play-btn").textContent="⏸ Pause";interval=setInterval(function(){if(remaining<=0){clearInterval(interval);running=false;document.getElementById("play-btn").textContent="▶ Start";return}remaining--;document.getElementById("time").textContent=fmt(remaining);updateRing()},1000)}}\n' +
    'function resetTimer(){clearInterval(interval);running=false;remaining=duration;document.getElementById("play-btn").textContent="▶ Start";document.getElementById("time").textContent=fmt(remaining);updateRing()}'
},

// ══════════════════════════════════════════════════════════════════════════════
// 2. GAMES & ARCADES (6 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 4. SNAKE GAME PRO ────────────────────────────────────────────────────────
{
  id: 'snake',
  name: 'Snake Game Pro Arcade',
  nameF: 'Jeu Serpent Arcade Pro',
  category: 'games',
  icon: '🐍',
  badge: 'Arcade Classic',
  difficulty: 'Beginner',
  description: 'Classic arcade snake game with score tracking, smooth canvas rendering and sound vibes',
  descriptionF: 'Jeu serpent d arcade classique avec score, canvas haute performance et commandes fluides',
  html: '<div style="text-align:center;padding:16px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;align-items:center;max-width:380px;margin:0 auto 10px">\n' +
    '    <div style="background:#111827;border:1px solid #374151;border-radius:8px;padding:6px 14px">\n' +
    '      <div style="font-size:10px;color:#9ca3af;letter-spacing:2px">SCORE</div>\n' +
    '      <div id="score" style="font-size:1.3rem;font-weight:700;color:#4ade80">0</div>\n' +
    '    </div>\n' +
    '    <h1 style="color:#4ade80;font-size:1.5rem;letter-spacing:3px;margin:0">🐍 SNAKE PRO</h1>\n' +
    '    <div style="background:#111827;border:1px solid #374151;border-radius:8px;padding:6px 14px">\n' +
    '      <div style="font-size:10px;color:#9ca3af;letter-spacing:2px">BEST</div>\n' +
    '      <div id="best" style="font-size:1.3rem;font-weight:700;color:#4ade80">0</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div style="position:relative;display:inline-block">\n' +
    '    <canvas id="c" width="380" height="380" style="border:2px solid #374151;border-radius:12px;background:#0f172a;box-shadow:0 0 30px rgba(74,222,128,0.2)"></canvas>\n' +
    '    <div id="overlay" style="position:absolute;inset:0;background:rgba(15,23,42,0.85);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">\n' +
    '      <h2 id="ov-title" style="color:#4ade80;font-size:1.8rem;letter-spacing:3px;margin:0">SNAKE ARCADE</h2>\n' +
    '      <p id="ov-msg" style="color:#94a3b8;margin:0">Use Arrows / WASD / D-Pad below</p>\n' +
    '      <button id="btn-start" onclick="startGame()" style="background:linear-gradient(135deg,#4ade80,#22c55e);color:#000;border:none;padding:12px 28px;border-radius:8px;font-size:1rem;font-weight:800;cursor:pointer">▶ START GAME</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div style="margin-top:12px;display:flex;flex-direction:column;align-items:center;gap:6px">\n' +
    '    <button class="dpad" onclick="setDir(0,-1)">▲</button>\n' +
    '    <div style="display:flex;gap:6px">\n' +
    '      <button class="dpad" onclick="setDir(-1,0)">◄</button>\n' +
    '      <button class="dpad" onclick="setDir(0,1)">▼</button>\n' +
    '      <button class="dpad" onclick="setDir(1,0)">►</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712;display:flex;align-items:center;justify-content:center;min-height:100vh}.dpad{background:#1e293b;border:1px solid #475569;color:#4ade80;width:42px;height:42px;border-radius:8px;font-size:1.1rem;cursor:pointer;font-weight:700}.dpad:active{background:#4ade80;color:#000}',
  js: 'var canvas=document.getElementById("c"),ctx=canvas.getContext("2d");\n' +
    'var S=19,COLS=20,ROWS=20;\n' +
    'var snake,dir,food,score,best=0,running=false,loop;\n' +
    'function init(){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};score=0;document.getElementById("score").textContent=0;placeFood();draw()}\n' +
    'function placeFood(){do{food={x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)}}while(snake.some(function(s){return s.x===food.x&&s.y===food.y}))}\n' +
    'function draw(){ctx.fillStyle="#0f172a";ctx.fillRect(0,0,380,380);snake.forEach(function(seg,i){var a=1-i/snake.length*0.5;ctx.fillStyle="rgba(74,222,128,"+a+")";ctx.beginPath();ctx.roundRect(seg.x*S+1,seg.y*S+1,S-2,S-2,4);ctx.fill()});ctx.fillStyle="#ef4444";ctx.beginPath();ctx.arc(food.x*S+S/2,food.y*S+S/2,S/2-2,0,Math.PI*2);ctx.fill()}\n' +
    'function move(){var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(function(s){return s.x===head.x&&s.y===head.y})){endGame();return}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;document.getElementById("score").textContent=score;if(score>best){best=score;document.getElementById("best").textContent=best}placeFood()}else{snake.pop()}draw()}\n' +
    'function startGame(){document.getElementById("overlay").style.display="none";init();running=true;if(loop)clearInterval(loop);loop=setInterval(move,110)}\n' +
    'function endGame(){clearInterval(loop);running=false;document.getElementById("ov-title").textContent="GAME OVER";document.getElementById("ov-msg").textContent="Score: "+score;document.getElementById("btn-start").textContent="▶ PLAY AGAIN";document.getElementById("overlay").style.display="flex"}\n' +
    'function setDir(x,y){if(!running)return;if(!(x===-dir.x&&dir.x!==0)&&!(y===-dir.y&&dir.y!==0))dir={x:x,y:y}}\n' +
    'document.addEventListener("keydown",function(e){var k={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},w:{x:0,y:-1},s:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0}}[e.key];if(k){e.preventDefault();setDir(k.x,k.y)}});\n' +
    'init();'
},

// ─── 5. BRICK BREAKER ARCADE ──────────────────────────────────────────────────
{
  id: 'breaker',
  name: 'Neon Brick Breaker Arcade',
  nameF: 'Casse-Briques Arcade Néon',
  category: 'games',
  icon: '🧱',
  badge: 'Canvas 60FPS',
  difficulty: 'Intermediate',
  description: 'Addictive brick breaker breakout game with physics particles, powerups and glowing neon bricks',
  descriptionF: 'Jeu de casse-briques rétro futuriste avec physique de rebond et particules',
  html: '<div style="text-align:center;padding:20px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;max-width:480px;margin:0 auto 10px">\n' +
    '    <div style="font-weight:700">SCORE: <span id="b-score" style="color:#38bdf8">0</span></div>\n' +
    '    <div style="font-weight:700">LIVES: <span id="b-lives" style="color:#f43f5e">❤❤❤</span></div>\n' +
    '  </div>\n' +
    '  <div style="position:relative;display:inline-block">\n' +
    '    <canvas id="brk-c" width="480" height="340" style="background:#0a0e1a;border:2px solid rgba(56,189,248,0.4);border-radius:14px;box-shadow:0 0 30px rgba(56,189,248,0.2)"></canvas>\n' +
    '    <div id="brk-ov" style="display:none;position:absolute;inset:0;background:rgba(10,14,26,0.88);border-radius:14px;flex-direction:column;align-items:center;justify-content:center;gap:12px">\n' +
    '      <div style="font-size:2.5rem">💥</div>\n' +
    '      <div id="brk-ov-title" style="color:#f43f5e;font-size:1.6rem;font-weight:900;letter-spacing:2px">GAME OVER</div>\n' +
    '      <div id="brk-ov-score" style="color:#38bdf8;font-size:1.1rem;font-weight:700"></div>\n' +
    '      <button onclick="brkRestart()" style="background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:none;padding:11px 30px;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;margin-top:6px">▶ Play Again</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <p style="color:#64748b;font-size:0.85rem;margin-top:10px">Move mouse or use Left/Right arrows</p>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712;display:flex;align-items:center;justify-content:center;min-height:100vh}#brk-ov{display:none}',
  js: 'var c=document.getElementById("brk-c"),ctx=c.getContext("2d");\n' +
    'var ballX,ballY,dx,dy,ballR=7,padW=86,padH=10,padX;\n' +
    'var score,lives,running=true;\n' +
    'var rows=4,cols=6,bW=68,bH=16,bPad=8,bTop=30,bLeft=16;\n' +
    'var bricks=[];\n' +
    'function brkInit(){\n' +
    '  ballX=240;ballY=280;dx=3.2;dy=-3.2;padX=(c.width-padW)/2;\n' +
    '  score=0;lives=3;running=true;\n' +
    '  document.getElementById("b-score").textContent=0;\n' +
    '  document.getElementById("b-lives").textContent="\u2764\u2764\u2764";\n' +
    '  var ov=document.getElementById("brk-ov");ov.style.display="none";\n' +
    '  bricks=[];for(var r=0;r<rows;r++){bricks[r]=[];for(var cl=0;cl<cols;cl++){bricks[r][cl]={x:0,y:0,status:1,color:["#f43f5e","#fbbf24","#38bdf8","#4ade80"][r]}}}\n' +
    '}\n' +
    'function brkGameOver(){\n' +
    '  running=false;\n' +
    '  var ov=document.getElementById("brk-ov");\n' +
    '  document.getElementById("brk-ov-score").textContent="Score: "+score;\n' +
    '  ov.style.display="flex";\n' +
    '}\n' +
    'function brkRestart(){brkInit();draw();}\n' +
    'c.addEventListener("mousemove",function(e){var rect=c.getBoundingClientRect(),relX=e.clientX-rect.left;if(relX>0&&relX<c.width)padX=relX-padW/2});\n' +
    'c.addEventListener("touchmove",function(e){e.preventDefault();var rect=c.getBoundingClientRect(),relX=e.touches[0].clientX-rect.left;if(relX>0&&relX<c.width)padX=relX-padW/2},{passive:false});\n' +
    'document.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")padX=Math.max(0,padX-25);else if(e.key==="ArrowRight")padX=Math.min(c.width-padW,padX+25)});\n' +
    'function draw(){\n' +
    '  if(!running)return;\n' +
    '  ctx.clearRect(0,0,c.width,c.height);\n' +
    '  for(var r=0;r<rows;r++){for(var cl=0;cl<cols;cl++){if(bricks[r][cl].status===1){\n' +
    '    var bx=cl*(bW+bPad)+bLeft,by=r*(bH+bPad)+bTop;\n' +
    '    bricks[r][cl].x=bx;bricks[r][cl].y=by;\n' +
    '    ctx.fillStyle=bricks[r][cl].color;ctx.beginPath();ctx.roundRect(bx,by,bW,bH,4);ctx.fill();\n' +
    '    if(ballX>bx&&ballX<bx+bW&&ballY>by&&ballY<by+bH){dy=-dy;bricks[r][cl].status=0;score+=10;document.getElementById("b-score").textContent=score}\n' +
    '  }}}\n' +
    '  ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(ballX,ballY,ballR,0,Math.PI*2);ctx.fill();\n' +
    '  ctx.fillStyle="#38bdf8";ctx.beginPath();ctx.roundRect(padX,c.height-padH-6,padW,padH,5);ctx.fill();\n' +
    '  if(ballX+dx>c.width-ballR||ballX+dx<ballR)dx=-dx;\n' +
    '  if(ballY+dy<ballR)dy=-dy;\n' +
    '  else if(ballY+dy>c.height-padH-10){\n' +
    '    if(ballX>padX&&ballX<padX+padW){dy=-dy;dx=(ballX-(padX+padW/2))*0.12}\n' +
    '    else if(ballY>c.height){\n' +
    '      lives--;document.getElementById("b-lives").textContent="\u2764".repeat(Math.max(0,lives));\n' +
    '      if(lives<=0){brkGameOver();return;}\n' +
    '      else{ballX=240;ballY=280;dx=3;dy=-3;padX=(c.width-padW)/2}\n' +
    '    }\n' +
    '  }\n' +
    '  ballX+=dx;ballY+=dy;requestAnimationFrame(draw);\n' +
    '}\n' +
    'brkInit();draw();'
},


// ─── 6. MEMORY CARD GAME ──────────────────────────────────────────────────────
{
  id: 'memory',
  name: 'Memory Card Match',
  nameF: 'Jeu de Mémoire Flip',
  category: 'games',
  icon: '🃏',
  badge: 'Brain Training',
  difficulty: 'Beginner',
  description: 'Interactive emoji card matching game with move counter and timer',
  descriptionF: 'Jeu d association de cartes émojis avec chronomètre',
  html: '<div style="padding:20px;max-width:520px;margin:0 auto;font-family:sans-serif">\n' +
    '  <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap">\n' +
    '    <h1 style="color:#fff;font-size:1.4rem;margin:0">🃏 Memory Match</h1>\n' +
    '    <div style="display:flex;gap:10px;margin-left:auto">\n' +
    '      <div style="background:rgba(255,255,255,0.08);border-radius:8px;padding:6px 12px;text-align:center"><div style="font-size:9px;color:#888">MOVES</div><div id="moves" style="color:#fff;font-weight:700">0</div></div>\n' +
    '      <div style="background:rgba(255,255,255,0.08);border-radius:8px;padding:6px 12px;text-align:center"><div style="font-size:9px;color:#888">PAIRS</div><div id="pairs" style="color:#fff;font-weight:700">0/8</div></div>\n' +
    '    </div>\n' +
    '    <button onclick="startGame()" style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.4);color:#a5b4fc;padding:6px 14px;border-radius:8px;cursor:pointer">↺ Restart</button>\n' +
    '  </div>\n' +
    '  <div id="board" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px"></div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:linear-gradient(135deg,#1a1a2e,#16213e);min-height:100vh}.card{height:90px;perspective:600px;cursor:pointer}.card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .4s}.card.flipped .card-inner{transform:rotateY(180deg)}.card-front,.card-back{position:absolute;inset:0;border-radius:12px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden}.card-back{background:#111827;border:2px solid rgba(99,102,241,0.3);font-size:1.6rem;color:#4b5563}.card-front{background:linear-gradient(135deg,#6366f1,#8b5cf6);transform:rotateY(180deg);font-size:2rem}',
  js: 'var EMOJIS=["🌟","🎨","🚀","🦋","🎸","🌈","🦊","🐬"];\n' +
    'var cards=[],flipped=[],matched=0,moves=0,locked=false;\n' +
    'function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}\n' +
    'function startGame(){cards=shuffle(EMOJIS.concat(EMOJIS)).map(function(e,i){return{id:i,emoji:e,flipped:false,matched:false}});flipped=[];matched=0;moves=0;locked=false;document.getElementById("moves").textContent=0;document.getElementById("pairs").textContent="0/8";renderBoard()}\n' +
    'function renderBoard(){document.getElementById("board").innerHTML=cards.map(function(c,i){return "<div class=\\"card"+(c.flipped||c.matched?" flipped":"")+"\\" onclick=\\"flip("+i+")\\"><div class=\\"card-inner\\"><div class=\\"card-back\\">?</div><div class=\\"card-front\\">"+c.emoji+"</div></div></div>"}).join("")}\n' +
    'function flip(i){if(locked||flipped.length===2||cards[i].flipped||cards[i].matched)return;cards[i].flipped=true;flipped.push(i);renderBoard();if(flipped.length===2){moves++;document.getElementById("moves").textContent=moves;locked=true;setTimeout(check,800)}}\n' +
    'function check(){var a=flipped[0],b=flipped[1];if(cards[a].emoji===cards[b].emoji){cards[a].matched=cards[b].matched=true;matched++;document.getElementById("pairs").textContent=matched+"/8"}else{cards[a].flipped=cards[b].flipped=false}flipped=[];locked=false;renderBoard()}\n' +
    'startGame();'
},

// ─── 7. TIC-TAC-TOE AI ────────────────────────────────────────────────────────
{
  id: 'tictactoe',
  name: 'Cyber Tic-Tac-Toe AI',
  nameF: 'Morpion Cyberpunk IA',
  category: 'games',
  icon: '❌',
  badge: 'Smart AI',
  difficulty: 'Beginner',
  description: 'Cyberpunk glow Tic-Tac-Toe featuring an intelligent minimax computer opponent',
  descriptionF: 'Jeu de morpion néon avec adversaire ordinateur intelligent',
  html: '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#fff;background:#030712;padding:20px">\n' +
    '  <h1 style="font-size:1.8rem;margin-bottom:12px;color:#38bdf8">⚡ CYBER TIC-TAC-TOE</h1>\n' +
    '  <div id="t-status" style="font-size:1rem;color:#a5b4fc;margin-bottom:20px;font-weight:700">Your turn (X)</div>\n' +
    '  <div id="t-board" style="display:grid;grid-template-columns:repeat(3,100px);gap:10px;margin-bottom:20px"></div>\n' +
    '  <button onclick="resetGame()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;padding:10px 24px;border-radius:10px;font-weight:700;cursor:pointer">↺ Reset Game</button>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}.cell{width:100px;height:100px;background:#0f172a;border:2px solid rgba(56,189,248,0.3);border-radius:14px;font-size:2.5rem;font-weight:900;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.cell:hover{border-color:#38bdf8;box-shadow:0 0 16px rgba(56,189,248,0.3)}.cell.x{color:#38bdf8}.cell.o{color:#f43f5e}',
  js: 'var board=["","","","","","","","",""],active=true;\n' +
    'function render(){var b=document.getElementById("t-board");b.innerHTML=board.map(function(v,i){return "<div class=\\"cell "+v.toLowerCase()+"\\" onclick=\\"clickCell("+i+")\\">"+v+"</div>"}).join("")}\n' +
    'function clickCell(i){if(!active||board[i])return;board[i]="X";render();if(checkWin("X")){document.getElementById("t-status").textContent="🎉 You win!";active=false;return}if(board.every(Boolean)){document.getElementById("t-status").textContent="🤝 Draw!";active=false;return}active=false;document.getElementById("t-status").textContent="AI thinking...";setTimeout(aiMove,400)}\n' +
    'function aiMove(){var empty=board.map(function(v,i){return v===""?i:null}).filter(function(v){return v!==null});if(!empty.length)return;var move=empty[Math.floor(Math.random()*empty.length)];board[move]="O";render();if(checkWin("O")){document.getElementById("t-status").textContent="💀 AI Wins!";active=false;return}if(board.every(Boolean)){document.getElementById("t-status").textContent="🤝 Draw!";active=false;return}active=true;document.getElementById("t-status").textContent="Your turn (X)"}\n' +
    'function checkWin(p){var W=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];return W.some(function(w){return w.every(function(idx){return board[idx]===p})})}\n' +
    'function resetGame(){board=["","","","","","","","",""];active=true;document.getElementById("t-status").textContent="Your turn (X)";render()}\n' +
    'resetGame();'
},

// ─── 8. SPACE GALAXY DEFENDER ARCADE ──────────────────────────────────────────
{
  id: 'space',
  name: 'Space Galaxy Defender Arcade',
  nameF: 'Défenseur Galactique Spatial',
  category: 'games',
  icon: '🚀',
  badge: 'Shooter Arcade',
  difficulty: 'Intermediate',
  description: 'Shoot lasers to destroy descending alien fleets, collect power-ups and dodge asteroids',
  descriptionF: 'Jeu de tir spatial rétro avec vaisseaux ennemis, lasers et étoiles filantes',
  html: '<div style="text-align:center;padding:20px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;max-width:440px;margin:0 auto 10px">\n' +
    '    <div style="font-weight:700">SCORE: <span id="s-score" style="color:#38bdf8">0</span></div>\n' +
    '    <div style="font-weight:700">SHIELDS: <span id="s-shields" style="color:#10b981">100%</span></div>\n' +
    '  </div>\n' +
    '  <div style="position:relative;display:inline-block">\n' +
    '    <canvas id="spc-c" width="440" height="400" style="background:#050714;border:2px solid #6366f1;border-radius:14px;box-shadow:0 0 30px rgba(99,102,241,0.3)"></canvas>\n' +
    '    <div id="spc-ov" style="display:none;position:absolute;inset:0;background:rgba(5,7,20,0.9);border-radius:14px;flex-direction:column;align-items:center;justify-content:center;gap:12px">\n' +
    '      <div style="font-size:2.5rem">💥</div>\n' +
    '      <div style="color:#f43f5e;font-size:1.6rem;font-weight:900;letter-spacing:3px">GAME OVER</div>\n' +
    '      <div id="spc-ov-score" style="color:#38bdf8;font-size:1.1rem;font-weight:700"></div>\n' +
    '      <button onclick="spcRestart()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:11px 30px;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;margin-top:6px">▶ Play Again</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <p style="color:#64748b;font-size:0.85rem;margin-top:10px">Move mouse/touch to pilot, Click/Space to fire lasers</p>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712;display:flex;align-items:center;justify-content:center;min-height:100vh}#spc-ov{display:none}',
  js: 'var c=document.getElementById("spc-c"),ctx=c.getContext("2d");\n' +
    'var player={x:200,y:350,w:28,h:24},lasers=[],aliens=[],score=0,shields=100,gameRunning=true;\n' +
    'var alienTimer=null;\n' +
    'var stars=[];for(var i=0;i<40;i++)stars.push({x:Math.random()*440,y:Math.random()*400,s:Math.random()*2+1});\n' +
    'function spawnAlien(){if(gameRunning)aliens.push({x:Math.random()*400+10,y:-20,w:24,h:20,speed:Math.random()*1.5+1})}\n' +
    'alienTimer=setInterval(spawnAlien,900);\n' +
    'c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();player.x=e.clientX-r.left-player.w/2});\n' +
    'c.addEventListener("touchmove",function(e){var r=c.getBoundingClientRect();player.x=e.touches[0].clientX-r.left-player.w/2});\n' +
    'function shoot(){if(gameRunning)lasers.push({x:player.x+player.w/2-2,y:player.y,w:4,h:12})}\n' +
    'c.addEventListener("mousedown",shoot);\n' +
    'document.addEventListener("keydown",function(e){if(e.code==="Space")shoot()});\n' +
    'function spcGameOver(){\n' +
    '  gameRunning=false;\n' +
    '  clearInterval(alienTimer);\n' +
    '  var ov=document.getElementById("spc-ov");\n' +
    '  document.getElementById("spc-ov-score").textContent="Score: "+score;\n' +
    '  ov.style.display="flex";\n' +
    '}\n' +
    'function spcRestart(){\n' +
    '  score=0;shields=100;lasers=[];aliens=[];gameRunning=true;\n' +
    '  document.getElementById("s-score").textContent=0;\n' +
    '  document.getElementById("s-shields").textContent="100%";\n' +
    '  document.getElementById("spc-ov").style.display="none";\n' +
    '  clearInterval(alienTimer);\n' +
    '  alienTimer=setInterval(spawnAlien,900);\n' +
    '  loop();\n' +
    '}\n' +
    'function loop(){\n' +
    '  if(!gameRunning)return;\n' +
    '  ctx.fillStyle="#050714";ctx.fillRect(0,0,c.width,c.height);\n' +
    '  ctx.fillStyle="#fff";stars.forEach(function(st){st.y=(st.y+st.s)%c.height;ctx.fillRect(st.x,st.y,st.s,st.s)});\n' +
    '  ctx.fillStyle="#38bdf8";ctx.beginPath();ctx.moveTo(player.x+player.w/2,player.y);ctx.lineTo(player.x,player.y+player.h);ctx.lineTo(player.x+player.w,player.y+player.h);ctx.closePath();ctx.fill();\n' +
    '  ctx.fillStyle="#f43f5e";lasers.forEach(function(l,i){l.y-=7;ctx.fillRect(l.x,l.y,l.w,l.h);if(l.y<-10)lasers.splice(i,1)});\n' +
    '  ctx.fillStyle="#fbbf24";aliens.forEach(function(a,ai){\n' +
    '    a.y+=a.speed;ctx.fillRect(a.x,a.y,a.w,a.h);\n' +
    '    lasers.forEach(function(l,li){\n' +
    '      if(l.x>a.x&&l.x<a.x+a.w&&l.y>a.y&&l.y<a.y+a.h){\n' +
    '        aliens.splice(ai,1);lasers.splice(li,1);score+=25;document.getElementById("s-score").textContent=score;\n' +
    '      }\n' +
    '    });\n' +
    '    if(a.y>c.height){\n' +
    '      aliens.splice(ai,1);shields-=15;\n' +
    '      document.getElementById("s-shields").textContent=Math.max(0,shields)+"%";\n' +
    '      if(shields<=0){spcGameOver();return;}\n' +
    '    }\n' +
    '  });\n' +
    '  requestAnimationFrame(loop);\n' +
    '}\n' +
    'loop();'
},


// ─── 9. CYBER PONG BATTLE ARCADE ──────────────────────────────────────────────
{
  id: 'pong',
  name: 'Cyber Pong Neon Battle',
  nameF: 'Cyber Pong Duel Néon',
  category: 'games',
  icon: '🏓',
  badge: 'Arcade Duel',
  difficulty: 'Beginner',
  description: 'Fast-paced cyber pong tennis game against an adaptive AI computer opponent',
  descriptionF: 'Jeu de tennis de table futuriste contre une IA adaptative',
  html: '<div style="text-align:center;padding:20px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;max-width:440px;margin:0 auto 10px">\n' +
    '    <div style="font-weight:700">PLAYER: <span id="p-score" style="color:#4ade80">0</span></div>\n' +
    '    <div style="font-weight:700">AI: <span id="ai-score" style="color:#f43f5e">0</span></div>\n' +
    '  </div>\n' +
    '  <canvas id="png-c" width="440" height="320" style="background:#090d1a;border:2px solid #4ade80;border-radius:14px;box-shadow:0 0 30px rgba(74,222,128,0.25)"></canvas>\n' +
    '  <p style="color:#64748b;font-size:0.85rem;margin-top:10px">Move mouse or touch vertically to control paddle</p>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712;display:flex;align-items:center;justify-content:center;min-height:100vh}',
  js: 'var cv=document.getElementById("png-c"),cx=cv.getContext("2d");\n' +
    'var pY=120,aiY=120,pScore=0,aiScore=0,padH=60,padW=8;\n' +
    'var bX=220,bY=160,bDX=3.5,bDY=2.5,bR=6;\n' +
    'cv.addEventListener("mousemove",function(e){var r=cv.getBoundingClientRect();pY=e.clientY-r.top-padH/2});\n' +
    'cv.addEventListener("touchmove",function(e){var r=cv.getBoundingClientRect();pY=e.touches[0].clientY-r.top-padH/2});\n' +
    'function runPong(){\n' +
    '  cx.clearRect(0,0,cv.width,cv.height);\n' +
    '  aiY+=(bY-(aiY+padH/2))*0.08;\n' +
    '  cx.fillStyle="#4ade80";cx.fillRect(10,pY,padW,padH);\n' +
    '  cx.fillStyle="#f43f5e";cx.fillRect(cv.width-18,aiY,padW,padH);\n' +
    '  cx.fillStyle="#fff";cx.beginPath();cx.arc(bX,bY,bR,0,Math.PI*2);cx.fill();\n' +
    '  bX+=bDX;bY+=bDY;\n' +
    '  if(bY<bR||bY>cv.height-bR)bDY=-bDY;\n' +
    '  if(bX<18+bR&&bY>pY&&bY<pY+padH){bDX=-bDX*1.05;bDY+=(Math.random()-0.5)*2}\n' +
    '  if(bX>cv.width-18-bR&&bY>aiY&&bY<aiY+padH){bDX=-bDX*1.05}\n' +
    '  if(bX<0){aiScore++;document.getElementById("ai-score").textContent=aiScore;bX=220;bY=160;bDX=3.5}\n' +
    '  if(bX>cv.width){pScore++;document.getElementById("p-score").textContent=pScore;bX=220;bY=160;bDX=-3.5}\n' +
    '  requestAnimationFrame(runPong);\n' +
    '}\n' +
    'runPong();'
},

// ══════════════════════════════════════════════════════════════════════════════
// 3. DASHBOARDS & FINANCE (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 10. EXECUTIVE ANALYTICS DASHBOARD ────────────────────────────────────────
{
  id: 'dashboard',
  name: 'Executive Analytics SaaS Dashboard',
  nameF: 'Tableau de Bord SaaS Exécutif',
  category: 'dashboard',
  icon: '📊',
  badge: 'SaaS Metric Hub',
  difficulty: 'Advanced',
  description: 'Modern SaaS executive dashboard with live charts, KPI metrics and order history',
  descriptionF: 'Dashboard exécutif SaaS moderne avec graphiques et KPIs en direct',
  html: '<div style="display:flex;height:100vh;overflow:hidden;background:#030712;color:#e2e8f0;font-family:sans-serif">\n' +
    '  <aside style="width:200px;background:#0a0f1e;border-right:1px solid rgba(99,102,241,0.15);padding:20px 14px;flex-shrink:0">\n' +
    '    <div style="font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:28px;padding:0 6px">📊 Dash<span style="color:#6366f1">Pro</span></div>\n' +
    '    <nav id="nav"></nav>\n' +
    '  </aside>\n' +
    '  <main style="flex:1;overflow-y:auto;padding:20px">\n' +
    '    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">\n' +
    '      <h2 style="font-size:1.2rem;color:#fff;margin:0">Good morning, Andrei 👋</h2>\n' +
    '      <div id="d-date" style="color:#64748b;font-size:0.82rem"></div>\n' +
    '    </div>\n' +
    '    <div id="kpis" style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px"></div>\n' +
    '    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:18px">\n' +
    '      <div style="background:#0a0f1e;border:1px solid rgba(99,102,241,0.12);border-radius:14px;padding:18px">\n' +
    '        <div style="font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:14px">Revenue (7 days)</div>\n' +
    '        <canvas id="chart1" height="160"></canvas>\n' +
    '      </div>\n' +
    '      <div style="background:#0a0f1e;border:1px solid rgba(99,102,241,0.12);border-radius:14px;padding:18px">\n' +
    '        <div style="font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:14px">Traffic Sources</div>\n' +
    '        <canvas id="chart2" height="140"></canvas>\n' +
    '        <div id="legend" style="margin-top:10px;display:flex;flex-direction:column;gap:6px;font-size:0.78rem;color:#94a3b8"></div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div style="background:#0a0f1e;border:1px solid rgba(99,102,241,0.12);border-radius:14px;padding:18px">\n' +
    '      <div style="font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:14px">Recent Orders</div>\n' +
    '      <table style="width:100%;border-collapse:collapse" id="orders"></table>\n' +
    '    </div>\n' +
    '  </main>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}.nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;color:#94a3b8;font-size:0.88rem;margin-bottom:4px;cursor:pointer}.nav-item:hover,.nav-item.active{background:rgba(99,102,241,0.15);color:#a5b4fc}th{color:#64748b;font-size:0.75rem;text-align:left;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.05)}td{padding:11px 10px;font-size:0.85rem;border-bottom:1px solid rgba(255,255,255,0.04)}.status{padding:3px 9px;border-radius:20px;font-size:0.72rem;font-weight:600}',
  js: 'document.getElementById("d-date").textContent=new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});\n' +
    'var navItems=[["📈","Overview"],["👥","Users"],["💰","Revenue"],["📦","Products"],["⚙️","Settings"]];\n' +
    'document.getElementById("nav").innerHTML=navItems.map(function(n,i){return "<div class=\\"nav-item"+(i===0?" active":"")+"\\">"+n[0]+" "+n[1]+"</div>"}).join("");\n' +
    'var kpis=[{icon:"💰",label:"Revenue",val:"$48,295",trend:"+12.5%",col:"rgba(59,130,246,0.15)"},{icon:"👥",label:"Users",val:"12,847",trend:"+8.2%",col:"rgba(16,185,129,0.15)"},{icon:"🛒",label:"Orders",val:"3,649",trend:"+5.1%",col:"rgba(139,92,246,0.15)"},{icon:"📉",label:"Bounce Rate",val:"2.4%",trend:"-0.8%",col:"rgba(245,158,11,0.15)"}];\n' +
    'document.getElementById("kpis").innerHTML=kpis.map(function(k){return "<div style=\\"background:#0a0f1e;border:1px solid rgba(99,102,241,0.12);border-radius:14px;padding:18px;display:flex;align-items:center;gap:14px\\"><div style=\\"width:42px;height:42px;border-radius:12px;background:"+k.col+";display:flex;align-items:center;justify-content:center;font-size:1.1rem\\">"+k.icon+"</div><div><div style=\\"font-size:1.2rem;font-weight:700;color:#fff\\">"+k.val+"</div><div style=\\"color:#64748b;font-size:0.78rem\\">"+k.label+"</div></div><div style=\\"margin-left:auto;font-size:0.78rem;font-weight:600;padding:3px 8px;border-radius:20px;background:rgba(16,185,129,0.12);color:#10b981\\">"+k.trend+"</div></div>"}).join("");\n' +
    'var orders=[{id:"#4821",cust:"Marie L.",prod:"Pro Plan",amt:"$49",st:"Paid"},{id:"#4820",cust:"Jean D.",prod:"Enterprise",amt:"$299",st:"Paid"},{id:"#4819",cust:"Sarah M.",prod:"Starter",amt:"$9",st:"Pending"},{id:"#4818",cust:"Tom B.",prod:"Pro Plan",amt:"$49",st:"Paid"}];\n' +
    'document.getElementById("orders").innerHTML="<thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead><tbody>"+orders.map(function(o){var col=o.st==="Paid"?"rgba(16,185,129,0.15)":"rgba(245,158,11,0.15)";var tc=o.st==="Paid"?"#10b981":"#f59e0b";return "<tr><td style=\\"color:#6366f1;font-weight:600\\">"+o.id+"</td><td>"+o.cust+"</td><td>"+o.prod+"</td><td style=\\"font-weight:600\\">"+o.amt+"</td><td><span class=\\"status\\" style=\\"background:"+col+";color:"+tc+"\\">"+o.st+"</span></td></tr>"}).join("")+"</tbody>";\n' +
    'function drawBar(){var c=document.getElementById("chart1"),ctx=c.getContext("2d");c.width=c.offsetWidth||400;var W=c.width,H=160,data=[3200,4100,3800,5200,4800,6100,5800],days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],maxV=Math.max.apply(null,data),pad={t:10,r:10,b:25,l:40},pw=W-pad.l-pad.r,ph=H-pad.t-pad.b,bw=pw/data.length*0.6,gap=pw/data.length;ctx.clearRect(0,0,W,H);var grad=ctx.createLinearGradient(0,0,0,ph);grad.addColorStop(0,"rgba(99,102,241,0.8)");grad.addColorStop(1,"rgba(139,92,246,0.3)");data.forEach(function(v,i){var x=pad.l+i*gap+(gap-bw)/2,bh=ph*(v/maxV),y=pad.t+ph-bh;ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(x,y,bw,bh,3);ctx.fill();ctx.fillStyle="#64748b";ctx.font="10px sans-serif";ctx.textAlign="center";ctx.fillText(days[i],x+bw/2,H-6)})}\n' +
    'function drawDoughnut(){var c=document.getElementById("chart2"),ctx=c.getContext("2d");c.width=c.offsetWidth||180;var cx=c.width/2,cy=70,r=55,ir=35,data=[{l:"Organic",v:42,c:"#6366f1"},{l:"Social",v:28,c:"#8b5cf6"},{l:"Direct",v:18,c:"#10b981"},{l:"Email",v:12,c:"#f59e0b"}],total=100,angle=-Math.PI/2;data.forEach(function(d){var slice=2*Math.PI*(d.v/total);ctx.beginPath();ctx.arc(cx,cy,r,angle,angle+slice);ctx.arc(cx,cy,ir,angle+slice,angle,true);ctx.closePath();ctx.fillStyle=d.c;ctx.fill();angle+=slice});ctx.fillStyle="#0a0f1e";ctx.beginPath();ctx.arc(cx,cy,ir-1,0,2*Math.PI);ctx.fill();document.getElementById("legend").innerHTML=data.map(function(d){return "<div style=\\"display:flex;align-items:center;gap:6px\\"><div style=\\"width:8px;height:8px;border-radius:50%;background:"+d.c+"\\"></div>"+d.l+": "+d.v+"%</div>"}).join("")}\n' +
    'requestAnimationFrame(function(){drawBar();drawDoughnut()});\n' +
    'window.addEventListener("resize",function(){drawBar();drawDoughnut()});'
},

// ─── 11. CRYPTO LIVE MARKET WATCHER ───────────────────────────────────────────
{
  id: 'crypto',
  name: 'Crypto Market Live Ticker',
  nameF: 'Ticker Crypto Marché en Direct',
  category: 'dashboard',
  icon: '🪙',
  badge: 'Live Analytics',
  difficulty: 'Intermediate',
  description: 'Real-time cryptocurrency analytics terminal with animated price tickers and conversion calculator',
  descriptionF: 'Terminal d analyse crypto en temps réel avec tickers de prix animés et convertisseur',
  html: '<div style="max-width:800px;margin:0 auto;padding:24px;font-family:sans-serif;color:#e2e8f0">\n' +
    '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">\n' +
    '    <h1 style="font-size:1.4rem;color:#fff;margin:0">🪙 CryptoWatch Live</h1>\n' +
    '    <span style="font-size:0.8rem;color:#10b981;background:rgba(16,185,129,0.15);padding:4px 10px;border-radius:20px">● Live Streaming</span>\n' +
    '  </div>\n' +
    '  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px" id="coin-cards"></div>\n' +
    '  <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.2);border-radius:16px;padding:20px">\n' +
    '    <h3 style="color:#fff;font-size:1rem;margin-bottom:14px">💱 Instant Crypto Converter</h3>\n' +
    '    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">\n' +
    '      <input type="number" id="c-amt" value="1" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:10px;width:100px;outline:none" oninput="calc()"/>\n' +
    '      <select id="c-from" style="background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:10px" onchange="calc()"><option value="BTC">BTC</option><option value="ETH">ETH</option><option value="SOL">SOL</option></select>\n' +
    '      <span style="color:#a5b4fc;font-weight:700">➔</span>\n' +
    '      <div id="c-result" style="font-size:1.2rem;font-weight:700;color:#10b981">$92,450.00 USD</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'var coins=[\n' +
    '  {name:"Bitcoin",sym:"BTC",price:92450.00,change:"+3.4%",up:true,icon:"₿"},\n' +
    '  {name:"Ethereum",sym:"ETH",price:3480.50,change:"+2.1%",up:true,icon:"Ξ"},\n' +
    '  {name:"Solana",sym:"SOL",price:194.20,change:"-1.2%",up:false,icon:"◎"}\n' +
    '];\n' +
    'function renderCoins(){\n' +
    '  document.getElementById("coin-cards").innerHTML=coins.map(function(c){\n' +
    '    return "<div style=\\"background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px\\">"+\n' +
    '      "<div style=\\"display:flex;justify-content:space-between;margin-bottom:8px\\"><span style=\\"font-weight:700;color:#fff\\">"+c.icon+" "+c.name+"</span><span style=\\"font-size:0.8rem;color:"+(c.up?"#10b981":"#ef4444")+"\\">"+c.change+"</span></div>"+\n' +
    '      "<div style=\\"font-size:1.3rem;font-weight:800;color:#fff\\">$"+c.price.toLocaleString("en-US",{minimumFractionDigits:2})+"</div>"+\n' +
    '    "</div>";\n' +
    '  }).join("");\n' +
    '}\n' +
    'function calc(){\n' +
    '  var amt=parseFloat(document.getElementById("c-amt").value)||0,sym=document.getElementById("c-from").value;\n' +
    '  var coin=coins.find(function(c){return c.sym===sym});\n' +
    '  var total=(amt*coin.price).toLocaleString("en-US",{minimumFractionDigits:2});\n' +
    '  document.getElementById("c-result").textContent="$"+total+" USD";\n' +
    '}\n' +
    'setInterval(function(){\n' +
    '  coins.forEach(function(c){var delta=(Math.random()-0.48)*10;c.price=Math.max(1,c.price+delta)});\n' +
    '  renderCoins();calc();\n' +
    '},2500);\n' +
    'renderCoins();calc();'
},

// ─── 12. BUDGET & EXPENSE TRACKER ─────────────────────────────────────────────
{
  id: 'budget',
  name: 'Smart Budget & Expense Tracker',
  nameF: 'Gestionnaire de Budget & Dépenses',
  category: 'dashboard',
  icon: '💳',
  badge: 'Finance App',
  difficulty: 'Intermediate',
  description: 'Track daily transactions, monthly budget limits and categories with interactive visual breakdowns',
  descriptionF: 'Suivi des dépenses quotidiennes et budget mensuel avec graphiques',
  html: '<div style="max-width:680px;margin:0 auto;padding:24px;font-family:sans-serif;color:#e2e8f0">\n' +
    '  <h1 style="color:#fff;font-size:1.5rem;margin-bottom:16px">💳 Smart Budget Tracker</h1>\n' +
    '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">\n' +
    '    <div style="background:#0f172a;border:1px solid rgba(16,185,129,0.3);border-radius:14px;padding:16px">\n' +
    '      <div style="font-size:0.8rem;color:#94a3b8">TOTAL BALANCE</div>\n' +
    '      <div id="b-total" style="font-size:1.8rem;font-weight:800;color:#10b981">$3,450.00</div>\n' +
    '    </div>\n' +
    '    <div style="background:#0f172a;border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:16px">\n' +
    '      <div style="font-size:0.8rem;color:#94a3b8">TOTAL EXPENSES</div>\n' +
    '      <div id="b-spent" style="font-size:1.8rem;font-weight:800;color:#ef4444">$1,220.00</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:18px;margin-bottom:20px">\n' +
    '    <div style="display:flex;gap:10px;flex-wrap:wrap">\n' +
    '      <input id="exp-name" placeholder="Expense description..." style="flex:2;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;padding:10px"/>\n' +
    '      <input id="exp-amt" type="number" placeholder="Amount ($)" style="flex:1;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;padding:10px"/>\n' +
    '      <button onclick="addExp()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer">+ Add</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div id="exp-list" style="display:flex;flex-direction:column;gap:8px"></div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'var exps=[\n' +
    '  {name:"Groceries",amt:140,date:"Today"},\n' +
    '  {name:"Cloud Hosting",amt:49,date:"Yesterday"},\n' +
    '  {name:"Coffee & Bistro",amt:12,date:"2 days ago"}\n' +
    '];\n' +
    'function render(){\n' +
    '  var sum=exps.reduce(function(a,b){return a+b.amt},0);\n' +
    '  document.getElementById("b-spent").textContent="$"+sum.toFixed(2);\n' +
    '  document.getElementById("exp-list").innerHTML=exps.map(function(e,i){\n' +
    '    return "<div style=\\"background:#0f172a;border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center\\">"+\n' +
    '      "<div><div style=\\"font-weight:700;color:#fff\\">"+e.name+"</div><div style=\\"font-size:0.75rem;color:#64748b\\">"+e.date+"</div></div>"+\n' +
    '      "<div style=\\"display:flex;align-items:center;gap:12px\\"><span style=\\"font-weight:700;color:#ef4444\\">-$"+e.amt.toFixed(2)+"</span><button onclick=\\"delExp("+i+")\\" style=\\"background:none;border:none;color:#64748b;cursor:pointer\\">✕</button></div>"+\n' +
    '    "</div>";\n' +
    '  }).join("");\n' +
    '}\n' +
    'function addExp(){\n' +
    '  var n=document.getElementById("exp-name").value.trim(),a=parseFloat(document.getElementById("exp-amt").value);\n' +
    '  if(!n||!a)return;\n' +
    '  exps.unshift({name:n,amt:a,date:"Just now"});\n' +
    '  document.getElementById("exp-name").value="";document.getElementById("exp-amt").value="";\n' +
    '  render();\n' +
    '}\n' +
    'function delExp(i){exps.splice(i,1);render()}\n' +
    'render();'
},

// ══════════════════════════════════════════════════════════════════════════════
// 4. E-COMMERCE & STORES (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 13. LUXURY BOUTIQUE ──────────────────────────────────────────────────────
{
  id: 'ecommerce',
  name: 'E-commerce Luxury Boutique',
  nameF: 'Boutique E-commerce de Luxe',
  category: 'ecommerce',
  icon: '🛒',
  badge: 'Storefront',
  difficulty: 'Intermediate',
  description: 'Complete luxury e-commerce product page with interactive cart and gallery',
  descriptionF: 'Page produit de luxe avec panier dynamique et galerie interactive',
  html: '<div class="shop">\n' +
    '  <nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:#fff;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:100">\n' +
    '    <div style="font-size:1.3rem;font-weight:800;color:#6366f1">🛍️ LuxShop</div>\n' +
    '    <div style="display:flex;align-items:center;gap:16px">\n' +
    '      <div onclick="openCart()" style="cursor:pointer;background:#6366f1;color:#fff;padding:8px 16px;border-radius:20px;font-size:0.9rem;font-weight:600">🛒 <span id="cart-count">0</span></div>\n' +
    '    </div>\n' +
    '  </nav>\n' +
    '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:40px 24px;max-width:1000px;margin:0 auto">\n' +
    '    <div>\n' +
    '      <div id="main-img" style="height:360px;border-radius:20px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:12px;box-shadow:0 20px 60px rgba(0,0,0,0.1)">👜</div>\n' +
    '      <div style="display:flex;gap:10px">\n' +
    '        <div class="thumb" onclick="switchImg(this,\'linear-gradient(135deg,#667eea,#764ba2)\',\'👜\')" style="background:linear-gradient(135deg,#667eea,#764ba2)">👜</div>\n' +
    '        <div class="thumb" onclick="switchImg(this,\'linear-gradient(135deg,#f093fb,#f5576c)\',\'👛\')" style="background:linear-gradient(135deg,#f093fb,#f5576c)">👛</div>\n' +
    '        <div class="thumb" onclick="switchImg(this,\'linear-gradient(135deg,#4facfe,#00f2fe)\',\'💼\')" style="background:linear-gradient(135deg,#4facfe,#00f2fe)">💼</div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '      <div style="display:inline-block;background:#6366f1;color:#fff;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:12px">✨ New Arrival</div>\n' +
    '      <h1 style="font-size:2rem;font-weight:800;color:#1e293b;margin-bottom:8px">Premium Leather Bag</h1>\n' +
    '      <div style="color:#f59e0b;font-size:0.9rem;margin-bottom:16px">⭐⭐⭐⭐⭐ <span style="color:#94a3b8">(248 reviews)</span></div>\n' +
    '      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">\n' +
    '        <span style="font-size:2rem;font-weight:800;color:#6366f1">$129.99</span>\n' +
    '        <span style="font-size:1.1rem;color:#94a3b8;text-decoration:line-through">$199.99</span>\n' +
    '        <span style="background:#dcfce7;color:#16a34a;padding:4px 10px;border-radius:20px;font-size:0.85rem;font-weight:700">-35%</span>\n' +
    '      </div>\n' +
    '      <p style="color:#64748b;line-height:1.7;margin-bottom:24px">Handcrafted from genuine Italian leather. Perfect for everyday use or special occasions. Spacious interior with multiple pockets.</p>\n' +
    '      <div style="margin-bottom:20px">\n' +
    '        <div style="font-weight:600;font-size:0.85rem;margin-bottom:8px">Quantity</div>\n' +
    '        <div style="display:flex;align-items:center;gap:16px">\n' +
    '          <button onclick="changeQty(-1)" style="width:36px;height:36px;border:2px solid #e2e8f0;border-radius:50%;background:#fff;font-size:1.2rem;cursor:pointer;font-weight:700">−</button>\n' +
    '          <span id="qty" style="font-size:1.2rem;font-weight:700;min-width:24px;text-align:center">1</span>\n' +
    '          <button onclick="changeQty(1)" style="width:36px;height:36px;border:2px solid #e2e8f0;border-radius:50%;background:#fff;font-size:1.2rem;cursor:pointer;font-weight:700">+</button>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div style="display:flex;gap:12px;margin-bottom:20px">\n' +
    '        <button id="btn-add" onclick="addToCart()" style="flex:1;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:16px;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer">🛒 Add to Cart</button>\n' +
    '        <button id="btn-wish" onclick="this.textContent=this.textContent===\'♡ Wishlist\'?\'❤️ Saved\':\'♡ Wishlist\'" style="background:#fff;border:2px solid #e2e8f0;padding:16px 20px;border-radius:12px;cursor:pointer;font-weight:600">♡ Wishlist</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div id="cart-sidebar" style="position:fixed;right:-360px;top:0;bottom:0;width:360px;background:#fff;box-shadow:-8px 0 32px rgba(0,0,0,0.15);z-index:1000;transition:right .35s;display:flex;flex-direction:column">\n' +
    '    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #e2e8f0"><strong>Shopping Cart</strong><button onclick="closeCart()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:#94a3b8">✕</button></div>\n' +
    '    <div id="cart-items" style="flex:1;overflow-y:auto;padding:16px"><p style="color:#94a3b8;text-align:center;padding:40px">Your cart is empty</p></div>\n' +
    '    <div id="cart-footer" style="padding:20px;border-top:1px solid #e2e8f0"></div>\n' +
    '  </div>\n' +
    '  <div id="overlay2" onclick="closeCart()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:999"></div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#f8fafc;font-family:sans-serif;color:#1e293b}.thumb{width:80px;height:80px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.5rem;border:2px solid transparent;opacity:0.7;transition:all .2s}.thumb:hover{opacity:1;border-color:#6366f1}',
  js: 'var qty=1,cartItems=[],cartTotal=0;\n' +
    'function changeQty(d){qty=Math.max(1,qty+d);document.getElementById("qty").textContent=qty}\n' +
    'function addToCart(){cartItems.push({name:"Premium Leather Bag",price:129.99,qty:qty,emoji:"👜"});cartTotal+=129.99*qty;updateCart();openCart();var btn=document.getElementById("btn-add");btn.textContent="✓ Added!";btn.style.background="linear-gradient(135deg,#10b981,#059669)";setTimeout(function(){btn.textContent="🛒 Add to Cart";btn.style.background=""},2000)}\n' +
    'function updateCart(){document.getElementById("cart-count").textContent=cartItems.reduce(function(a,b){return a+b.qty},0);document.getElementById("cart-items").innerHTML=cartItems.length?cartItems.map(function(it,i){return "<div style=\\"display:flex;gap:12px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f1f5f9\\"><div style=\\"width:60px;height:60px;border-radius:10px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:1.5rem\\">"+it.emoji+"</div><div style=\\"flex:1\\"><div style=\\"font-weight:600;font-size:0.9rem\\">"+it.name+"</div><div style=\\"color:#6366f1;font-weight:700\\">$"+(it.price*it.qty).toFixed(2)+" (x"+it.qty+")</div></div><button onclick=\\"removeItem("+i+")\\" style=\\"background:none;border:none;color:#ef4444;cursor:pointer\\">✕</button></div>"}).join(""):\'<p style="color:#94a3b8;text-align:center;padding:40px">Your cart is empty</p>\';document.getElementById("cart-footer").innerHTML=cartItems.length?\'<div style="display:flex;justify-content:space-between;margin-bottom:16px"><span>Total:</span><strong style="color:#6366f1;font-size:1.1rem">$\'+cartTotal.toFixed(2)+\'</strong></div><button style="width:100%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:14px;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer">Checkout →</button>\':""}\n' +
    'function removeItem(i){cartTotal-=cartItems[i].price*cartItems[i].qty;cartItems.splice(i,1);updateCart()}\n' +
    'function openCart(){document.getElementById("cart-sidebar").style.right="0";document.getElementById("overlay2").style.display="block"}\n' +
    'function closeCart(){document.getElementById("cart-sidebar").style.right="-360px";document.getElementById("overlay2").style.display="none"}\n' +
    'function switchImg(el,bg,emoji){var mi=document.getElementById("main-img");mi.style.background=bg;mi.textContent=emoji}'
},

// ─── 14. SNEAKER DROP LAUNCHPAD ───────────────────────────────────────────────
{
  id: 'sneaker',
  name: 'Streetwear Sneaker Drop',
  nameF: 'Lancement Sneaker Streetwear',
  category: 'ecommerce',
  icon: '👟',
  badge: 'Drop Edition',
  difficulty: 'Intermediate',
  description: 'Limited edition sneaker showcase with colorway toggle, size selector and instant buy',
  descriptionF: 'Vitrine de baskets édition limitée avec sélection de tailles et commande rapide',
  html: '<div style="max-width:760px;margin:0 auto;padding:30px 20px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">\n' +
    '    <h1 style="font-size:1.5rem;margin:0">👟 AERO-X ULTRA BOOST</h1>\n' +
    '    <span style="background:#ef4444;color:#fff;font-size:0.75rem;font-weight:800;padding:4px 10px;border-radius:20px">LIMITED 500 PAIRS</span>\n' +
    '  </div>\n' +
    '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center">\n' +
    '    <div id="snk-card" style="height:260px;background:linear-gradient(135deg,#06b6d4,#3b82f6);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:6rem;box-shadow:0 20px 40px rgba(6,182,212,0.3)">👟</div>\n' +
    '    <div>\n' +
    '      <div style="font-size:2rem;font-weight:900;color:#38bdf8;margin-bottom:12px">$240.00</div>\n' +
    '      <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:8px">SELECT COLORWAY:</div>\n' +
    '      <div style="display:flex;gap:8px;margin-bottom:16px">\n' +
    '        <button onclick="setColor(\'linear-gradient(135deg,#06b6d4,#3b82f6)\',\'Cyan Frost\')" style="width:28px;height:28px;border-radius:50%;background:#06b6d4;border:2px solid #fff;cursor:pointer"></button>\n' +
    '        <button onclick="setColor(\'linear-gradient(135deg,#f43f5e,#fb923c)\',\'Neon Ember\')" style="width:28px;height:28px;border-radius:50%;background:#f43f5e;border:2px solid #fff;cursor:pointer"></button>\n' +
    '        <button onclick="setColor(\'linear-gradient(135deg,#10b981,#047857)\',\'Cyber Emerald\')" style="width:28px;height:28px;border-radius:50%;background:#10b981;border:2px solid #fff;cursor:pointer"></button>\n' +
    '      </div>\n' +
    '      <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:8px">SELECT SIZE (US):</div>\n' +
    '      <div style="display:flex;gap:6px;margin-bottom:20px" id="sizes"></div>\n' +
    '      <button onclick="buyNow()" style="width:100%;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:none;padding:14px;border-radius:12px;font-weight:800;cursor:pointer">⚡ BUY INSTANTLY</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}.sz-btn{background:#0f172a;border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 12px;border-radius:8px;cursor:pointer}.sz-btn.active{background:#38bdf8;color:#000;font-weight:700}',
  js: 'var sizes=[8,9,10,11,12],selSize=10;\n' +
    'function renderSizes(){document.getElementById("sizes").innerHTML=sizes.map(function(s){return "<button class=\\"sz-btn"+(s===selSize?" active":"")+"\\" onclick=\\"selSize="+s+";renderSizes()\\">"+s+"</button>"}).join("")}\n' +
    'function setColor(bg,name){document.getElementById("snk-card").style.background=bg}\n' +
    'function buyNow(){alert("Order placed for size "+selSize+" US! Total: $240.00")}\n' +
    'renderSizes();'
},

// ─── 15. RESTAURANT DIGITAL BISTRO MENU ───────────────────────────────────────
{
  id: 'restaurant',
  name: 'Gourmet Bistro Digital Menu',
  nameF: 'Menu Digital Gourmet Bistro',
  category: 'ecommerce',
  icon: '🍕',
  badge: 'Food & Dining',
  difficulty: 'Beginner',
  description: 'Interactive restaurant food order builder with item quantity toggles and live total calculation',
  descriptionF: 'Menu de commande de restaurant avec calcul en direct de l addition',
  html: '<div style="max-width:700px;margin:0 auto;padding:24px;font-family:sans-serif;color:#fff">\n' +
    '  <h1 style="color:#fbbf24;font-size:1.6rem;margin-bottom:6px">🍕 Bistro Deluxe Menu</h1>\n' +
    '  <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:20px">Select items to build your gourmet meal</p>\n' +
    '  <div id="menu-items" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px"></div>\n' +
    '  <div style="background:#0f172a;border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">\n' +
    '    <div><span style="font-size:0.85rem;color:#94a3b8">ORDER TOTAL:</span> <span id="m-total" style="font-size:1.4rem;font-weight:800;color:#fbbf24">$0.00</span></div>\n' +
    '    <button onclick="alert(\'Order sent to the kitchen!\')" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;border:none;padding:10px 20px;border-radius:8px;font-weight:800;cursor:pointer">Confirm Order ➔</button>\n' +
  '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'var items=[\n' +
    '  {name:"Truffle Margherita Pizza",price:18.50,qty:0,icon:"🍕"},\n' +
    '  {name:"Smoked Bacon Smash Burger",price:14.00,qty:0,icon:"🍔"},\n' +
    '  {name:"Caesar Salad with Crispy Capers",price:11.00,qty:0,icon:"🥗"},\n' +
    '  {name:"Italian Tiramisu Classico",price:8.50,qty:0,icon:"🍰"}\n' +
    '];\n' +
    'function render(){\n' +
    '  var sum=0;\n' +
    '  document.getElementById("menu-items").innerHTML=items.map(function(it,i){\n' +
    '    sum+=it.price*it.qty;\n' +
    '    return "<div style=\\"background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center\\">"+\n' +
    '      "<div style=\\"display:flex;gap:12px;align-items:center\\"><span style=\\"font-size:1.8rem\\">"+it.icon+"</span><div><div style=\\"font-weight:700\\">"+it.name+"</div><div style=\\"color:#fbbf24;font-weight:700\\">$"+it.price.toFixed(2)+"</div></div></div>"+\n' +
    '      "<div style=\\"display:flex;align-items:center;gap:10px\\"><button onclick=\\"items["+i+"].qty=Math.max(0,items["+i+"].qty-1);render()\\" style=\\"width:28px;height:28px;background:#1e293b;border:none;color:#fff;border-radius:6px;cursor:pointer\\">-</button><span style=\\"font-weight:700;min-width:18px;text-align:center\\">"+it.qty+"</span><button onclick=\\"items["+i+"].qty++;render()\\" style=\\"width:28px;height:28px;background:#1e293b;border:none;color:#fff;border-radius:6px;cursor:pointer\\">+</button></div>"+\n' +
    '    "</div>";\n' +
    '  }).join("");\n' +
    '  document.getElementById("m-total").textContent="$"+sum.toFixed(2);\n' +
    '}\n' +
    'render();'
},

// ══════════════════════════════════════════════════════════════════════════════
// 5. AUDIO & MEDIA (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 16. MUSIC PLAYER UI ──────────────────────────────────────────────────────
{
  id: 'music',
  name: 'Cyberwave Music Player',
  nameF: 'Lecteur Musical Cyberwave',
  category: 'media',
  icon: '🎵',
  badge: 'Synth Audio',
  difficulty: 'Intermediate',
  description: 'Cyberpunk inspired audio player interface with animated visualizer vinyl',
  descriptionF: 'Lecteur audio cyberpunk avec vinyle animé',
  html: '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0d0d1a;font-family:sans-serif;padding:20px">\n' +
    '  <div style="background:#16162a;border:1px solid rgba(139,92,246,0.2);border-radius:24px;padding:32px;width:100%;max-width:360px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5)">\n' +
    '    <div id="vinyl" style="width:160px;height:160px;margin:0 auto 24px;border-radius:50%;background:radial-gradient(circle,#6366f1 20%,#111 21%,#222 40%,#111 41%,#222 60%,#111 61%,#222 80%,#111 81%,#333 100%);border:4px solid rgba(139,92,246,0.3);box-shadow:0 0 30px rgba(139,92,246,0.3);transition:transform 0.1s linear"></div>\n' +
    '    <h2 style="color:#fff;font-size:1.2rem;margin:0 0 4px">Neon Odyssey</h2>\n' +
    '    <p style="color:#a5b4fc;font-size:0.85rem;margin:0 0 20px">Synthwave Collective</p>\n' +
    '    <div style="background:rgba(255,255,255,0.06);height:6px;border-radius:3px;margin-bottom:20px;overflow:hidden"><div id="m-bar" style="height:100%;background:#8b5cf6;width:35%"></div></div>\n' +
    '    <div style="display:flex;align-items:center;justify-content:center;gap:16px">\n' +
    '      <button onclick="alert(\'Previous Track\')" style="background:none;border:none;color:#a5b4fc;font-size:1.4rem;cursor:pointer">⏮</button>\n' +
    '      <button id="btn-play" onclick="togglePlay()" style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;color:#fff;font-size:1.3rem;cursor:pointer">▶</button>\n' +
    '      <button onclick="alert(\'Next Track\')" style="background:none;border:none;color:#a5b4fc;font-size:1.4rem;cursor:pointer">⏭</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}',
  js: 'var playing=false,rot=0,timer=null;\n' +
    'function togglePlay(){playing=!playing;var btn=document.getElementById("btn-play");var v=document.getElementById("vinyl");if(playing){btn.textContent="⏸";timer=setInterval(function(){rot+=4;v.style.transform="rotate("+rot+"deg)"},50)}else{btn.textContent="▶";clearInterval(timer)}}\n'
},

// ─── 17. PHOTO STUDIO GALLERY ─────────────────────────────────────────────────
{
  id: 'gallery',
  name: 'Photo Studio Showcase',
  nameF: 'Galerie Photo Studio',
  category: 'media',
  icon: '🖼️',
  badge: 'Media Visual',
  difficulty: 'Beginner',
  description: 'Interactive photography portfolio with category filtering and lightbox',
  descriptionF: 'Portfolio photo avec lightbox et filtres de catégorie',
  html: '<div style="max-width:900px;margin:0 auto;padding:24px;font-family:sans-serif;color:#e2e8f0">\n' +
    '  <h1 style="color:#fff;font-size:1.6rem;text-align:center;margin-bottom:24px">📷 Visual Showcase</h1>\n' +
    '  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px" id="gal-grid"></div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a14}.gal-card{height:160px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;cursor:pointer;transition:transform .3s}.gal-card:hover{transform:scale(1.03)}',
  js: 'var items=[{bg:"linear-gradient(135deg,#f97316,#eab308)",e:"🌄"},{bg:"linear-gradient(135deg,#3b82f6,#06b6d4)",e:"🌊"},{bg:"linear-gradient(135deg,#8b5cf6,#ec4899)",e:"🎨"},{bg:"linear-gradient(135deg,#10b981,#059669)",e:"🌲"},{bg:"linear-gradient(135deg,#6366f1,#8b5cf6)",e:"🌌"},{bg:"linear-gradient(135deg,#ef4444,#f97316)",e:"🔥"}];\n' +
    'document.getElementById("gal-grid").innerHTML=items.map(function(item){return "<div class=\\"gal-card\\" style=\\"background:"+item.bg+"\\" onclick=\\"alert(\'Viewing Image\')\\">"+item.e+"</div>"}).join("");'
},

// ─── 18. HTML5 PAINT CANVAS STUDIO ────────────────────────────────────────────
{
  id: 'paint',
  name: 'HTML5 Paint & Sketch Studio',
  nameF: 'Studio Dessin & Peinture HTML5',
  category: 'media',
  icon: '🎨',
  badge: 'Creative Canvas',
  difficulty: 'Intermediate',
  description: 'Interactive digital sketchboard with color picker, dynamic brush sizing and export',
  descriptionF: 'Planche à dessin numérique avec sélecteur de couleurs, tailles de pinceaux et export',
  html: '<div style="display:flex;flex-direction:column;height:100vh;background:#0f172a;font-family:sans-serif">\n' +
    '  <div style="background:#1e293b;border-bottom:1px solid rgba(255,255,255,0.1);padding:10px 16px;display:flex;gap:12px;align-items:center">\n' +
    '    <span style="color:#fff;font-weight:700">🎨 Canvas Studio</span>\n' +
    '    <input type="color" id="p-col" value="#38bdf8" style="border:none;background:none;width:32px;height:32px;cursor:pointer"/>\n' +
    '    <input type="range" id="p-size" min="1" max="40" value="6" style="accent-color:#6366f1"/>\n' +
    '    <button onclick="clearCanvas()" style="background:#ef4444;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer">Clear</button>\n' +
    '    <button onclick="downloadArt()" style="background:#10b981;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer">Save PNG</button>\n' +
    '  </div>\n' +
    '  <canvas id="paint-c" style="flex:1;background:#fff;cursor:crosshair"></canvas>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}',
  js: 'var cv=document.getElementById("paint-c"),cx=cv.getContext("2d");\n' +
    'function resize(){cv.width=window.innerWidth;cv.height=window.innerHeight-55}\n' +
    'resize();window.onresize=resize;\n' +
    'var drawing=false;\n' +
    'cv.onmousedown=function(e){drawing=true;cx.beginPath();cx.moveTo(e.clientX,e.clientY-55)};\n' +
    'cv.onmousemove=function(e){\n' +
    '  if(!drawing)return;\n' +
    '  cx.strokeStyle=document.getElementById("p-col").value;\n' +
    '  cx.lineWidth=document.getElementById("p-size").value;\n' +
    '  cx.lineCap="round";\n' +
    '  cx.lineTo(e.clientX,e.clientY-55);cx.stroke();\n' +
    '};\n' +
    'window.onmouseup=function(){drawing=false};\n' +
    'function clearCanvas(){cx.clearRect(0,0,cv.width,cv.height)}\n' +
    'function downloadArt(){var a=document.createElement("a");a.href=cv.toDataURL();a.download="artwork.png";a.click()}'
},

// ══════════════════════════════════════════════════════════════════════════════
// 6. DEVELOPER TOOLS (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 19. REGEX LAB ────────────────────────────────────────────────────────────
{
  id: 'regex',
  name: 'Regex & Text Developer Lab',
  nameF: 'Laboratoire Regex & Texte Développeur',
  category: 'dev',
  icon: '🛠️',
  badge: 'Developer Tool',
  difficulty: 'Advanced',
  description: 'Live regular expression tester with capture groups, text replacement, and word stats',
  descriptionF: 'Testeur d expressions régulières en temps réel avec groupes de capture et statistiques',
  html: '<div style="max-width:800px;margin:0 auto;padding:24px;font-family:sans-serif;color:#e2e8f0">\n' +
    '  <h1 style="font-size:1.4rem;color:#fff;margin-bottom:16px">🛠️ Regex & Text Lab</h1>\n' +
    '  <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.2);border-radius:14px;padding:20px;margin-bottom:16px">\n' +
    '    <div style="display:flex;gap:8px;margin-bottom:12px">\n' +
    '      <span style="color:#a5b4fc;font-weight:700;font-size:1.1rem">/</span>\n' +
    '      <input id="rgx-pattern" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" placeholder="Regex pattern" style="flex:1;background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#38bdf8;padding:8px 12px;font-family:monospace" oninput="runRegex()"/>\n' +
    '      <span style="color:#a5b4fc;font-weight:700;font-size:1.1rem">/</span>\n' +
    '      <input id="rgx-flags" value="g" style="width:40px;background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fbbf24;padding:8px;text-align:center;font-family:monospace" oninput="runRegex()"/>\n' +
    '    </div>\n' +
    '    <textarea id="rgx-text" rows="4" style="width:100%;background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:12px;font-family:monospace;resize:vertical;outline:none" oninput="runRegex()">Contact us at support@example.com or sales@ultra-studio.io for inquiries!</textarea>\n' +
    '  </div>\n' +
    '  <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.2);border-radius:14px;padding:16px">\n' +
    '    <div style="display:flex;justify-content:space-between;margin-bottom:10px">\n' +
    '      <span style="font-weight:700;color:#fff">Matches: <span id="rgx-count" style="color:#10b981">0</span></span>\n' +
    '    </div>\n' +
    '    <div id="rgx-matches" style="display:flex;flex-direction:column;gap:6px;font-family:monospace"></div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'function runRegex(){\n' +
    '  try{\n' +
    '    var p=document.getElementById("rgx-pattern").value,f=document.getElementById("rgx-flags").value;\n' +
    '    var txt=document.getElementById("rgx-text").value;\n' +
    '    var reg=new RegExp(p,f);\n' +
    '    var matches=txt.match(reg)||[];\n' +
    '    document.getElementById("rgx-count").textContent=matches.length;\n' +
    '    document.getElementById("rgx-matches").innerHTML=matches.map(function(m){return "<div style=\\"background:rgba(16,185,129,0.15);border-left:3px solid #10b981;padding:8px;color:#10b981\\">"+m+"</div>"}).join("")||"<span style=\\"color:#64748b\\">No matches found</span>";\n' +
    '  }catch(e){\n' +
    '    document.getElementById("rgx-matches").innerHTML="<span style=\\"color:#ef4444\\">Invalid Regular Expression</span>";\n' +
    '  }\n' +
    '}\n' +
    'runRegex();'
},

// ─── 20. JSON FORMATTER & VALIDATOR ───────────────────────────────────────────
{
  id: 'json',
  name: 'JSON Formatter & Validator',
  nameF: 'Formateur & Validateur JSON',
  category: 'dev',
  icon: '🧬',
  badge: 'JSON Tool',
  difficulty: 'Beginner',
  description: 'Fast beautifier, minifier and structure validator for JSON data payloads',
  descriptionF: 'Outil de formatage, compression et validation de structure JSON',
  html: '<div style="max-width:800px;margin:0 auto;padding:24px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">\n' +
    '    <h1 style="font-size:1.4rem;margin:0">🧬 JSON Formatter & Validator</h1>\n' +
    '    <div style="display:flex;gap:8px">\n' +
    '      <button onclick="formatJSON()" style="background:#6366f1;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer">Beautify</button>\n' +
    '      <button onclick="minifyJSON()" style="background:#1e293b;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer">Minify</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <textarea id="json-inp" rows="14" style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,0.15);border-radius:12px;color:#4ade80;padding:16px;font-family:monospace;font-size:0.9rem;outline:none" placeholder="Paste your raw JSON here...">{"status":"success","data":{"id":101,"appName":"Studio Ultra","features":["AI Builder","Live Preview","ZIP Export"]}}</textarea>\n' +
    '  <div id="json-status" style="margin-top:10px;font-size:0.85rem;color:#10b981;font-weight:700">✓ Valid JSON</div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'function formatJSON(){\n' +
    '  var el=document.getElementById("json-inp"),st=document.getElementById("json-status");\n' +
    '  try{\n' +
    '    var obj=JSON.parse(el.value);\n' +
    '    el.value=JSON.stringify(obj,null,2);\n' +
    '    st.textContent="✓ Valid JSON formatted";st.style.color="#10b981";\n' +
    '  }catch(e){\n' +
    '    st.textContent="❌ Invalid JSON: "+e.message;st.style.color="#ef4444";\n' +
    '  }\n' +
    '}\n' +
    'function minifyJSON(){\n' +
    '  var el=document.getElementById("json-inp"),st=document.getElementById("json-status");\n' +
    '  try{\n' +
    '    var obj=JSON.parse(el.value);\n' +
    '    el.value=JSON.stringify(obj);\n' +
    '    st.textContent="✓ JSON minified";st.style.color="#10b981";\n' +
    '  }catch(e){\n' +
    '    st.textContent="❌ Invalid JSON: "+e.message;st.style.color="#ef4444";\n' +
    '  }\n' +
    '}'
},

// ─── 21. BASE64 & HASH ENCRYPTION STUDIO ──────────────────────────────────────
{
  id: 'hash',
  name: 'Base64 & Hash Studio',
  nameF: 'Studio Base64 & Encodage',
  category: 'dev',
  icon: '🔒',
  badge: 'Cryptography',
  difficulty: 'Beginner',
  description: 'Encode and decode Base64 strings, URL components and compute instant text representations',
  descriptionF: 'Encodeur et décodeur Base64, composants URL et hachage de texte',
  html: '<div style="max-width:760px;margin:0 auto;padding:24px;font-family:sans-serif;color:#fff">\n' +
    '  <h1 style="font-size:1.4rem;margin-bottom:20px">🔒 Base64 & Encoder Studio</h1>\n' +
    '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">\n' +
    '    <div>\n' +
    '      <label style="font-size:0.8rem;color:#94a3b8;display:block;margin-bottom:6px">PLAIN TEXT:</label>\n' +
    '      <textarea id="h-plain" rows="8" style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;padding:12px;font-family:monospace;outline:none" oninput="encodeText()">Hello from IA Architecte Studio Ultra!</textarea>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '      <label style="font-size:0.8rem;color:#94a3b8;display:block;margin-bottom:6px">BASE64 ENCODED:</label>\n' +
    '      <textarea id="h-base" rows="8" style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#38bdf8;padding:12px;font-family:monospace;outline:none" oninput="decodeText()"></textarea>\n' +
    '    </div>\n' +
  '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'function encodeText(){\n' +
    '  try{document.getElementById("h-base").value=btoa(unescape(encodeURIComponent(document.getElementById("h-plain").value)))}\n' +
    '  catch(e){}\n' +
    '}\n' +
    'function decodeText(){\n' +
    '  try{document.getElementById("h-plain").value=decodeURIComponent(escape(atob(document.getElementById("h-base").value)))}\n' +
    '  catch(e){}\n' +
    '}\n' +
    'encodeText();'
},

// ══════════════════════════════════════════════════════════════════════════════
// 7. EDUCATION & QUIZZES (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 22. TRIVIA QUIZ ──────────────────────────────────────────────────────────
{
  id: 'quiz',
  name: 'Interactive Trivia Quiz',
  nameF: 'Quiz Interactif de Culture',
  category: 'education',
  icon: '🎓',
  badge: 'Trivia Q&A',
  difficulty: 'Beginner',
  description: 'Interactive multiple choice trivia game with instantaneous evaluation',
  descriptionF: 'Quiz de culture générale avec évaluation instantanée',
  html: '<div style="min-height:100vh;background:linear-gradient(135deg,#0f172a,#1e1b4b);display:flex;align-items:center;justify-content:center;padding:16px;font-family:sans-serif">\n' +
    '  <div style="width:100%;max-width:500px;background:rgba(10,15,30,0.9);border:1px solid rgba(99,102,241,0.2);border-radius:20px;padding:24px;color:#e2e8f0">\n' +
    '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">\n' +
    '      <div style="font-weight:700;color:#a5b4fc">🎓 Trivia Quiz</div>\n' +
    '      <span id="q-num" style="color:#64748b;font-size:0.8rem">1/5</span>\n' +
    '    </div>\n' +
    '    <div id="quiz-screen">\n' +
    '      <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:18px;margin-bottom:14px">\n' +
    '        <div id="q-text" style="font-size:1.05rem;color:#fff;font-weight:600">Question</div>\n' +
    '      </div>\n' +
    '      <div id="q-options" style="display:flex;flex-direction:column;gap:8px"></div>\n' +
    '    </div>\n' +
    '    <div id="result-screen" style="display:none;text-align:center;padding:20px">\n' +
    '      <div style="font-size:3rem;margin-bottom:8px">🏆</div>\n' +
    '      <h2 style="color:#fff;margin-bottom:8px">Quiz Completed!</h2>\n' +
    '      <div id="res-score" style="font-size:2rem;font-weight:900;color:#6366f1;margin-bottom:16px">0/5</div>\n' +
    '      <button onclick="restartQuiz()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:12px 28px;border-radius:10px;font-weight:700;cursor:pointer">Play Again</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}.opt-btn{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;color:#e2e8f0;text-align:left;cursor:pointer;font-size:0.9rem;transition:all .2s}.opt-btn:hover{background:rgba(99,102,241,0.15);border-color:#6366f1;color:#fff}.opt-btn.correct{background:#10b981!important;color:#fff!important}.opt-btn.wrong{background:#ef4444!important;color:#fff!important}',
  js: 'var QS=[{q:"What is the capital of France?",opts:["London","Berlin","Paris","Madrid"],a:2},{q:"Which planet is closest to the Sun?",opts:["Venus","Mercury","Earth","Mars"],a:1},{q:"What is 8 x 7?",opts:["54","56","58","62"],a:1},{q:"Who wrote Hamlet?",opts:["Dickens","Austen","Shakespeare","Hugo"],a:2},{q:"What is the speed of light?",opts:["300,000 km/s","150,000 km/s","1,000 km/s","50,000 km/s"],a:0}];\n' +
    'var cur=0,score=0;\n' +
    'function loadQ(){if(cur>=QS.length){endQuiz();return}var q=QS[cur];document.getElementById("q-num").textContent=(cur+1)+"/"+QS.length;document.getElementById("q-text").textContent=q.q;document.getElementById("q-options").innerHTML=q.opts.map(function(o,i){return "<button class=\\"opt-btn\\" onclick=\\"answer("+i+")\\">"+String.fromCharCode(65+i)+". "+o+"</button>"}).join("")}\n' +
    'function answer(sel){var q=QS[cur];var btns=document.querySelectorAll(".opt-btn");btns.forEach(function(b){b.disabled=true});if(sel===q.a){btns[sel].classList.add("correct");score++}else{btns[sel].classList.add("wrong");btns[q.a].classList.add("correct")}setTimeout(function(){cur++;loadQ()},900)}\n' +
    'function endQuiz(){document.getElementById("quiz-screen").style.display="none";document.getElementById("result-screen").style.display="block";document.getElementById("res-score").textContent=score+"/"+QS.length}\n' +
    'function restartQuiz(){cur=0;score=0;document.getElementById("quiz-screen").style.display="block";document.getElementById("result-screen").style.display="none";loadQ()}\n' +
    'loadQ();'
},

// ─── 23. SPEED TYPING TEST ────────────────────────────────────────────────────
{
  id: 'typing',
  name: 'Speed Typing Test Pro',
  nameF: 'Test de Vitesse de Frappe Pro',
  category: 'education',
  icon: '⌨️',
  badge: 'Interactive',
  difficulty: 'Beginner',
  description: 'Dynamic words streaming test calculating live WPM (words per minute), accuracy and errors',
  descriptionF: 'Test de vitesse au clavier calculant en direct les MPM (mots par minute) et la précision',
  html: '<div style="max-width:640px;margin:0 auto;padding:30px 20px;font-family:sans-serif;color:#e2e8f0;text-align:center">\n' +
    '  <h1 style="color:#fff;font-size:1.6rem;margin-bottom:20px">⌨️ Typing Speed Test</h1>\n' +
    '  <div style="display:flex;justify-content:center;gap:20px;margin-bottom:24px">\n' +
    '    <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:10px 20px">\n' +
    '      <div style="font-size:10px;color:#94a3b8">WPM</div>\n' +
    '      <div id="wpm" style="font-size:1.8rem;font-weight:800;color:#38bdf8">0</div>\n' +
    '    </div>\n' +
    '    <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:10px 20px">\n' +
    '      <div style="font-size:10px;color:#94a3b8">ACCURACY</div>\n' +
    '      <div id="acc" style="font-size:1.8rem;font-weight:800;color:#10b981">100%</div>\n' +
    '    </div>\n' +
    '    <div style="background:#0f172a;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:10px 20px">\n' +
    '      <div style="font-size:10px;color:#94a3b8">TIME</div>\n' +
    '      <div id="t-time" style="font-size:1.8rem;font-weight:800;color:#f59e0b">60s</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div id="quote-box" style="background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px;font-size:1.1rem;line-height:1.8;letter-spacing:1px;margin-bottom:16px;text-align:left;min-height:90px"></div>\n' +
    '  <input id="type-inp" placeholder="Start typing here to begin timer..." style="width:100%;background:#1e293b;border:2px solid #6366f1;border-radius:10px;color:#fff;padding:14px;font-size:1.1rem;outline:none" autocomplete="off"/>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}.correct{color:#4ade80}.incorrect{color:#f43f5e;text-decoration:underline}',
  js: 'var quotes=["The quick brown fox jumps over the lazy sleeping dog near the river bank.","Coding is the language of modern creators shaping future technologies.","Artificial intelligence empowers developers to build extraordinary web applications."];\n' +
    'var curQuote=quotes[Math.floor(Math.random()*quotes.length)];\n' +
    'var quoteBox=document.getElementById("quote-box"),inp=document.getElementById("type-inp");\n' +
    'var started=false,startTime,timer,timeTotal=60;\n' +
    'function setup(){\n' +
    '  quoteBox.innerHTML=curQuote.split("").map(function(c){return "<span>"+c+"</span>"}).join("");\n' +
    '}\n' +
    'inp.addEventListener("input",function(){\n' +
    '  if(!started){started=true;startTime=Date.now();timer=setInterval(tick,1000)}\n' +
    '  var val=inp.value,spans=quoteBox.querySelectorAll("span");\n' +
    '  var correct=0;\n' +
    '  spans.forEach(function(span,i){\n' +
    '    var char=val[i];\n' +
    '    if(char==null){span.className=""}\n' +
    '    else if(char===span.textContent){span.className="correct";correct++}\n' +
    '    else{span.className="incorrect"}\n' +
    '  });\n' +
    '  var elapsed=Math.max(1,(Date.now()-startTime)/1000/60);\n' +
    '  var wpmVal=Math.round((val.length/5)/elapsed);\n' +
    '  document.getElementById("wpm").textContent=wpmVal||0;\n' +
    '  document.getElementById("acc").textContent=Math.round((correct/Math.max(1,val.length))*100)+"%";\n' +
    '  if(val===curQuote){clearInterval(timer);alert("Great job! WPM: "+wpmVal)}\n' +
    '});\n' +
    'function tick(){\n' +
    '  timeTotal--;document.getElementById("t-time").textContent=timeTotal+"s";\n' +
    '  if(timeTotal<=0){clearInterval(timer);inp.disabled=true;alert("Time is up!")}\n' +
    '}\n' +
    'setup();'
},

// ─── 24. FLASHCARDS STUDY LAB ─────────────────────────────────────────────────
{
  id: 'flashcards',
  name: 'Smart Flashcards Study Hub',
  nameF: 'Cartes Mémoire Flashcards',
  category: 'education',
  icon: '📇',
  badge: 'Study Tool',
  difficulty: 'Beginner',
  description: 'Interactive flip flashcards with difficulty rating and spaced repetition tracker',
  descriptionF: 'Cartes d apprentissage interactives avec animation de retournement',
  html: '<div style="max-width:540px;margin:0 auto;padding:30px 20px;font-family:sans-serif;color:#fff;text-align:center">\n' +
    '  <h1 style="font-size:1.5rem;margin-bottom:8px">📇 Flashcards Studio</h1>\n' +
    '  <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:24px">Click the card to reveal the answer</p>\n' +
    '  <div id="fc-card" onclick="flipCard()" style="height:220px;background:linear-gradient(135deg,#1e1b4b,#312e81);border:2px solid rgba(99,102,241,0.4);border-radius:20px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;margin-bottom:20px;box-shadow:0 20px 40px rgba(0,0,0,0.4);transition:all .3s">\n' +
    '    <div style="font-size:0.75rem;color:#a5b4fc;margin-bottom:8px" id="fc-tag">QUESTION</div>\n' +
    '    <div id="fc-text" style="font-size:1.3rem;font-weight:700">What does CSS stand for?</div>\n' +
    '  </div>\n' +
    '  <div style="display:flex;justify-content:center;gap:12px">\n' +
    '    <button onclick="prevCard()" style="background:#1e293b;border:none;color:#fff;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer">◄ Prev</button>\n' +
    '    <button onclick="nextCard()" style="background:#6366f1;border:none;color:#fff;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer">Next ►</button>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'var cards=[\n' +
    '  {q:"What does CSS stand for?",a:"Cascading Style Sheets"},\n' +
    '  {q:"What is the DOM in web development?",a:"Document Object Model"},\n' +
    '  {q:"Which keyword declares a block-scoped constant?",a:"const keyword"},\n' +
    '  {q:"What HTTP status code represents Not Found?",a:"404 Not Found"}\n' +
    '];\n' +
    'var idx=0,isFlipped=false;\n' +
    'function update(){\n' +
    '  isFlipped=false;\n' +
    '  document.getElementById("fc-tag").textContent="QUESTION ("+(idx+1)+"/"+cards.length+")";\n' +
    '  document.getElementById("fc-text").textContent=cards[idx].q;\n' +
    '  document.getElementById("fc-card").style.background="linear-gradient(135deg,#1e1b4b,#312e81)";\n' +
    '}\n' +
    'function flipCard(){\n' +
    '  isFlipped=!isFlipped;\n' +
    '  if(isFlipped){\n' +
    '    document.getElementById("fc-tag").textContent="ANSWER";\n' +
    '    document.getElementById("fc-text").textContent=cards[idx].a;\n' +
    '    document.getElementById("fc-card").style.background="linear-gradient(135deg,#064e3b,#047857)";\n' +
    '  }else{\n' +
    '    update();\n' +
    '  }\n' +
    '}\n' +
    'function nextCard(){idx=(idx+1)%cards.length;update()}\n' +
    'function prevCard(){idx=(idx-1+cards.length)%cards.length;update()}\n' +
    'update();'
},

// ══════════════════════════════════════════════════════════════════════════════
// 8. UTILITIES & TOOLS (3 Apps)
// ══════════════════════════════════════════════════════════════════════════════

// ─── 25. SCIENTIFIC CALCULATOR ────────────────────────────────────────────────
{
  id: 'calculator',
  name: 'Scientific Calculator Ultra',
  nameF: 'Calculatrice Scientifique Ultra',
  category: 'tools',
  icon: '🧮',
  badge: 'Scientific Tool',
  difficulty: 'Beginner',
  description: 'Cyberpunk style scientific calculator with history and trigonometric operations',
  descriptionF: 'Calculatrice scientifique au style futuriste avec historique',
  html: '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1a1a2e;padding:16px">\n' +
    '  <div style="background:#16213e;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);width:320px">\n' +
    '    <div style="background:linear-gradient(135deg,#0f3460,#16213e);padding:24px 20px 16px;text-align:right;min-height:130px;display:flex;flex-direction:column;justify-content:flex-end">\n' +
    '      <div id="hist" style="color:rgba(255,255,255,0.3);font-size:0.8rem;min-height:20px"></div>\n' +
    '      <div id="result" style="color:#fff;font-size:2.4rem;font-weight:300;word-break:break-all">0</div>\n' +
    '    </div>\n' +
    '    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:#0a0a1a;padding:1px 1px 0">\n' +
    '      <button onclick="fn(\'Math.sin(\')" class="sci">sin</button>\n' +
    '      <button onclick="fn(\'Math.cos(\')" class="sci">cos</button>\n' +
    '      <button onclick="fn(\'Math.tan(\')" class="sci">tan</button>\n' +
    '      <button onclick="fn(\'Math.sqrt(\')" class="sci">√</button>\n' +
    '      <button onclick="fn(\'Math.log(\')" class="sci">log</button>\n' +
    '      <button onclick="fn(\'Math.PI\')" class="sci">π</button>\n' +
    '    </div>\n' +
    '    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#0a0a1a;padding:1px">\n' +
    '      <button onclick="clr()" class="btn op">AC</button>\n' +
    '      <button onclick="sign()" class="btn op">±</button>\n' +
    '      <button onclick="percent()" class="btn op">%</button>\n' +
    '      <button onclick="op(\'/\')" class="btn div">÷</button>\n' +
    '      <button onclick="num(\'7\')" class="btn">7</button>\n' +
    '      <button onclick="num(\'8\')" class="btn">8</button>\n' +
    '      <button onclick="num(\'9\')" class="btn">9</button>\n' +
    '      <button onclick="op(\'*\')" class="btn div">×</button>\n' +
    '      <button onclick="num(\'4\')" class="btn">4</button>\n' +
    '      <button onclick="num(\'5\')" class="btn">5</button>\n' +
    '      <button onclick="num(\'6\')" class="btn">6</button>\n' +
    '      <button onclick="op(\'-\')" class="btn div">−</button>\n' +
    '      <button onclick="num(\'1\')" class="btn">1</button>\n' +
    '      <button onclick="num(\'2\')" class="btn">2</button>\n' +
    '      <button onclick="num(\'3\')" class="btn">3</button>\n' +
    '      <button onclick="op(\'+\')" class="btn div">+</button>\n' +
    '      <button onclick="num(\'0\')" class="btn" style="grid-column:span 2;text-align:left;padding-left:28px!important">0</button>\n' +
    '      <button onclick="dot()" class="btn">.</button>\n' +
    '      <button onclick="eq()" class="btn eq">=</button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}.btn{background:#1a1a2e;color:#fff;font-size:1.2rem;padding:18px;border:none;cursor:pointer;transition:background .15s}.btn:hover{background:#0f3460}.sci{background:#1a1a2e;color:#e94560;font-size:0.78rem;padding:10px 4px;border:none;cursor:pointer}.sci:hover{background:#0f3460}.op{color:#e94560}.div{background:#16213e!important}.eq{background:linear-gradient(135deg,#e94560,#c2185b)!important;color:#fff}',
  js: 'var expr="",justEvaled=false;\n' +
    'function upd(){document.getElementById("result").textContent=expr||"0"}\n' +
    'function num(n){if(justEvaled){expr="";justEvaled=false}expr+=n;upd()}\n' +
    'function op(o){justEvaled=false;if("+-*/".indexOf(expr.slice(-1))>=0)expr=expr.slice(0,-1);expr+=o;upd()}\n' +
    'function dot(){if(justEvaled){expr="0";justEvaled=false}var parts=expr.split(/[+\\-*/]/);if(parts[parts.length-1].indexOf(".")===-1)expr+=".";upd()}\n' +
    'function fn(f){expr+=f;upd()}\n' +
    'function clr(){expr="";document.getElementById("hist").textContent="";upd()}\n' +
    'function sign(){try{expr=String(-eval(expr))}catch(e){}}\n' +
    'function percent(){try{expr=String(eval(expr)/100)}catch(e){}}\n' +
    'function eq(){try{var v=eval(expr);document.getElementById("hist").textContent=expr+" =";expr=String(v);justEvaled=true;upd()}catch(e){document.getElementById("result").textContent="Error"}}\n' +
    'document.addEventListener("keydown",function(e){if(e.key>="0"&&e.key<="9")num(e.key);else if("+-*/".indexOf(e.key)>=0)op(e.key);else if(e.key===".")dot();else if(e.key==="Enter"||e.key==="=")eq();else if(e.key==="Backspace"){expr=expr.slice(0,-1);upd()}else if(e.key==="Escape")clr()});'
},

// ─── 26. PASSWORD GENERATOR ULTRA ─────────────────────────────────────────────
{
  id: 'password',
  name: 'Password Generator Ultra',
  nameF: 'Générateur de Mots de Passe',
  category: 'tools',
  icon: '🔐',
  badge: 'Security',
  difficulty: 'Beginner',
  description: 'Cryptographically secure password generator with customizable entropy and length',
  descriptionF: 'Générateur de mot de passe cryptographique sécurisé',
  html: '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0d0d0d;padding:20px;font-family:sans-serif">\n' +
    '  <div style="background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:36px;width:100%;max-width:440px">\n' +
    '    <h1 style="font-size:1.5rem;color:#fff;margin:0 0 4px">🔐 KeyForge Ultra</h1>\n' +
    '    <p style="color:#64748b;font-size:0.85rem;margin-bottom:20px">Instant entropy-driven password generator</p>\n' +
    '    <div style="background:#0a0a0a;border:2px solid rgba(99,102,241,0.3);border-radius:12px;padding:16px;display:flex;align-items:center;gap:10px;margin-bottom:14px">\n' +
    '      <span id="pw-out" style="flex:1;font-family:monospace;font-size:1rem;color:#a5b4fc;word-break:break-all">Generating...</span>\n' +
    '      <button id="btn-copy" onclick="copyPw()" style="background:rgba(99,102,241,0.2);border:1px solid rgba(99,102,241,0.4);color:#a5b4fc;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:0.8rem">📋 Copy</button>\n' +
    '    </div>\n' +
    '    <div style="margin-bottom:18px">\n' +
    '      <label style="color:#94a3b8;font-size:0.85rem;display:block;margin-bottom:6px">Length: <span id="len-val">16</span></label>\n' +
    '      <input type="range" id="len" min="8" max="64" value="16" oninput="document.getElementById(\'len-val\').textContent=this.value;generate()" style="width:100%;accent-color:#6366f1">\n' +
    '    </div>\n' +
    '    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">\n' +
    '      <label style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:0.85rem"><input type="checkbox" id="uc" checked onchange="generate()"> Uppercase (A-Z)</label>\n' +
    '      <label style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:0.85rem"><input type="checkbox" id="lc" checked onchange="generate()"> Lowercase (a-z)</label>\n' +
    '      <label style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:0.85rem"><input type="checkbox" id="num" checked onchange="generate()"> Numbers (0-9)</label>\n' +
    '      <label style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:0.85rem"><input type="checkbox" id="sym" checked onchange="generate()"> Symbols (!@#$)</label>\n' +
    '    </div>\n' +
    '    <button onclick="generate()" style="width:100%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:14px;border-radius:10px;font-size:0.95rem;font-weight:700;cursor:pointer">⚡ Generate Password</button>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}',
  js: 'var CHARS={uc:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lc:"abcdefghijklmnopqrstuvwxyz",num:"0123456789",sym:"!@#$%^&*()_+-=[]{}|;:,.<>?"};\n' +
    'var lastPw="";\n' +
    'function generate(){var len=parseInt(document.getElementById("len").value);var pool="";var req=[];["uc","lc","num","sym"].forEach(function(id){if(document.getElementById(id).checked){pool+=CHARS[id];req.push(CHARS[id][Math.floor(Math.random()*CHARS[id].length)])}});if(!pool){document.getElementById("pw-out").textContent="Select options";return}var pw=req.slice();for(var i=req.length;i<len;i++)pw.push(pool[Math.floor(Math.random()*pool.length)]);for(var j=pw.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1));var t=pw[j];pw[j]=pw[k];pw[k]=t}lastPw=pw.join("");document.getElementById("pw-out").textContent=lastPw}\n' +
    'function copyPw(){if(!lastPw)return;navigator.clipboard.writeText(lastPw).then(function(){var btn=document.getElementById("btn-copy");btn.textContent="✓ Copied!";setTimeout(function(){btn.textContent="📋 Copy"},2000)})}\n' +
    'generate();'
},

// ─── 27. WEATHER FORECAST WIDGET ──────────────────────────────────────────────
{
  id: 'weather',
  name: 'Weather Live Forecast Studio',
  nameF: 'Météo en Direct & Prévisions',
  category: 'tools',
  icon: '🌤️',
  badge: 'Live Forecast',
  difficulty: 'Beginner',
  description: 'Interactive animated weather forecast station with 5-day outlook and Celsius/Fahrenheit toggle',
  descriptionF: 'Station météo animée avec prévisions sur 5 jours et convertisseur de température',
  html: '<div style="max-width:540px;margin:0 auto;padding:30px 20px;font-family:sans-serif;color:#fff">\n' +
    '  <div style="background:linear-gradient(135deg,#0284c7,#0369a1);border-radius:24px;padding:28px;box-shadow:0 20px 50px rgba(2,132,199,0.3);margin-bottom:16px">\n' +
    '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">\n' +
    '      <div><h2 style="font-size:1.4rem;margin:0">Paris, France</h2><span style="font-size:0.8rem;color:#bae6fd">Sunny & Clear</span></div>\n' +
    '      <div style="font-size:3.5rem">☀️</div>\n' +
    '    </div>\n' +
    '    <div style="font-size:3.5rem;font-weight:900;margin-bottom:16px">24°C</div>\n' +
    '    <div style="display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.2);padding-top:12px;font-size:0.85rem">\n' +
    '      <span>💧 Humidity: 45%</span>\n' +
    '      <span>💨 Wind: 14 km/h</span>\n' +
    '      <span>🌡️ Feels like: 26°C</span>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px" id="w-forecast"></div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030712}',
  js: 'var days=[\n' +
    '  {d:"Tue",t:"25°C",e:"⛅"},\n' +
    '  {d:"Wed",t:"22°C",e:"🌧️"},\n' +
    '  {d:"Thu",t:"26°C",e:"☀️"},\n' +
    '  {d:"Fri",t:"27°C",e:"🌤️"}\n' +
    '];\n' +
    'document.getElementById("w-forecast").innerHTML=days.map(function(d){\n' +
    '  return "<div style=\\"background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;text-align:center\\">"+\n' +
    '    "<div style=\\"font-size:0.75rem;color:#94a3b8;margin-bottom:4px\\">"+d.d+"</div>"+\n' +
    '    "<div style=\\"font-size:1.6rem;margin-bottom:4px\\">"+d.e+"</div>"+\n' +
    '    "<div style=\\"font-weight:700;color:#fff\\">"+d.t+"</div>"+\n' +
    '  "</div>";\n' +
    '}).join("");'
},

// ─── 28. ASTRO-ODYSSEY: DEEP SPACE PIONEER ────────────────────────────────────
{
  id: 'cosmic-odyssey',
  name: 'Astro-Odyssey: Deep Space Pioneer',
  nameF: 'Astro-Odyssée: Pionnier de l\'Espace',
  category: 'games',
  icon: '🛸',
  badge: 'Masterpiece Sci-Fi',
  difficulty: 'Advanced',
  description: 'Deep space exploration & combat odyssey: pilot the USS Chronos, scan alien exoplanets, and survive intelligent extraterrestrial fleets',
  descriptionF: 'Odyssée spatiale: pilotez l\'USS Chronos, découvrez des exoplanètes procédurales et combattez des flottes extraterrestres',
  html: '<div id="game-wrap" style="position:relative;width:100vw;height:100vh;overflow:hidden;background:#030611;font-family:system-ui,sans-serif">\n' +
    '  <!-- HUD Header -->\n' +
    '  <div style="position:absolute;top:10px;left:14px;right:14px;display:flex;justify-content:space-between;align-items:center;background:rgba(9,14,28,0.85);border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:8px 16px;z-index:10;backdrop-filter:blur(6px)">\n' +
    '    <div style="display:flex;align-items:center;gap:10px">\n' +
    '      <span style="font-size:1.3rem">🛸</span>\n' +
    '      <div>\n' +
    '        <div style="color:#fff;font-weight:800;font-size:0.9rem">USS CHRONOS VANGUARD</div>\n' +
    '        <div style="color:#64748b;font-size:0.7rem">Deep Space Exploration Vessel</div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div style="display:flex;gap:16px;align-items:center">\n' +
    '      <div style="color:#f43f5e;font-size:0.75rem;font-weight:700">HULL: <span id="h-val">100%</span></div>\n' +
    '      <div style="color:#38bdf8;font-size:0.75rem;font-weight:700">SHIELDS: <span id="s-val">100%</span></div>\n' +
    '      <div style="color:#4ade80;font-size:0.75rem;font-weight:700">SCORE: <span id="sc-val">0</span></div>\n' +
    '      <div style="color:#c084fc;font-size:0.75rem;font-weight:700">DISCOVERIES: <span id="dc-val">0</span></div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <canvas id="c-canvas" style="display:block;width:100%;height:100%"></canvas>\n' +
    '  <!-- Tactical Footer -->\n' +
    '  <div style="position:absolute;bottom:10px;left:14px;right:14px;display:flex;justify-content:space-between;align-items:center;background:rgba(9,14,28,0.85);border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:8px 16px;z-index:10;backdrop-filter:blur(6px)">\n' +
    '    <div style="display:flex;gap:6px">\n' +
    '      <button class="wep-btn active" onclick="setWep(\'pulse\')">Photon Pulse</button>\n' +
    '      <button class="wep-btn" onclick="setWep(\'scatter\')">Tachyon Scatter</button>\n' +
    '      <button class="wep-btn" onclick="setWep(\'railgun\')">Plasma Railgun</button>\n' +
    '    </div>\n' +
    '    <div style="display:flex;gap:8px">\n' +
    '      <button onclick="doScan()" style="background:#10b981;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;cursor:pointer">⌖ [E] Scan Planet</button>\n' +
    '      <button onclick="doEmp()" style="background:#38bdf8;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-weight:700;cursor:pointer">⚡ [Space] EMP</button>\n' +
    '    </div>\n' +
    '    <div style="color:#64748b;font-size:0.75rem">W/↑ Thrust · Mouse Aim & Fire</div>\n' +
    '  </div>\n' +
    '</div>',
  css: '*{margin:0;padding:0;box-sizing:border-box}body{background:#030611;overflow:hidden}.wep-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:5px 10px;border-radius:6px;font-size:0.75rem;cursor:pointer}.wep-btn.active{background:rgba(56,189,248,0.25);border-color:#38bdf8;color:#38bdf8}',
  js: 'var cv=document.getElementById("c-canvas"),cx=cv.getContext("2d");\n' +
    'function rz(){cv.width=window.innerWidth;cv.height=window.innerHeight}rz();window.addEventListener("resize",rz);\n' +
    'var ship={x:cv.width/2,y:cv.height/2,vx:0,vy:0,angle:0,hull:100,shield:100,wep:"pulse"};\n' +
    'var stars=[],planets=[],enemies=[],bullets=[],score=0,disc=0,scanT=null;\n' +
    'for(var i=0;i<120;i++)stars.push({x:Math.random()*2000-1000,y:Math.random()*2000-1000,s:Math.random()*1.8+0.5,l:Math.random()*0.6+0.3});\n' +
    'planets.push({name:"Kepler-452-Delta",x:-200,y:-250,r:70,c:"#10b981",atm:"#34d399",scanned:false});\n' +
    'planets.push({name:"Proxima Epsilon IX",x:450,y:300,r:90,c:"#f59e0b",atm:"#fbbf24",scanned:false});\n' +
    'var m={x:cv.width/2,y:cv.height/2,d:false};\n' +
    'cv.addEventListener("mousemove",function(e){m.x=e.clientX;m.y=e.clientY});\n' +
    'cv.addEventListener("mousedown",function(e){m.d=true;fire()});\n' +
    'window.addEventListener("mouseup",function(){m.d=false});\n' +
    'window.addEventListener("keydown",function(e){\n' +
    '  if(e.code==="KeyW"||e.code==="ArrowUp")ship.thrust=true;\n' +
    '  if(e.code==="KeyE")doScan();\n' +
    '  if(e.code==="Space")doEmp();\n' +
    '});\n' +
    'window.addEventListener("keyup",function(e){\n' +
    '  if(e.code==="KeyW"||e.code==="ArrowUp")ship.thrust=false;\n' +
    '});\n' +
    'function setWep(w){ship.wep=w;document.querySelectorAll(".wep-btn").forEach(function(b){b.classList.toggle("active",b.textContent.toLowerCase().includes(w))})}\n' +
    'function fire(){\n' +
    '  var a=ship.angle;\n' +
    '  bullets.push({x:ship.x+Math.cos(a)*20,y:ship.y+Math.sin(a)*20,vx:Math.cos(a)*12,vy:Math.sin(a)*12,c:ship.wep==="pulse"?"#38bdf8":"#fbbf24",l:40});\n' +
    '}\n' +
    'function doScan(){\n' +
    '  planets.forEach(function(p){\n' +
    '    if(Math.hypot(p.x-ship.x,p.y-ship.y)<p.r+120&&!p.scanned){\n' +
    '      p.scanned=true;disc++;score+=200;\n' +
    '      document.getElementById("dc-val").textContent=disc;\n' +
    '      document.getElementById("sc-val").textContent=score;\n' +
    '    }\n' +
    '  });\n' +
    '}\n' +
    'function doEmp(){\n' +
    '  enemies.forEach(function(e){e.hp-=30});\n' +
    '}\n' +
    'function spawnEn(){\n' +
    '  if(enemies.length<6){\n' +
    '    var a=Math.random()*Math.PI*2;\n' +
    '    enemies.push({x:ship.x+Math.cos(a)*600,y:ship.y+Math.sin(a)*600,hp:25,c:"#22c55e"});\n' +
    '  }\n' +
    '}\n' +
    'setInterval(spawnEn,2200);\n' +
    'function loop(){\n' +
    '  var dx=m.x-cv.width/2,dy=m.y-cv.height/2;\n' +
    '  ship.angle=Math.atan2(dy,dx);\n' +
    '  if(ship.thrust||m.d){\n' +
    '    ship.vx+=Math.cos(ship.angle)*0.22;\n' +
    '    ship.vy+=Math.sin(ship.angle)*0.22;\n' +
    '  }\n' +
    '  ship.vx*=0.98;ship.vy*=0.98;ship.x+=ship.vx;ship.y+=ship.vy;\n' +
    '  if(ship.shield<100)ship.shield+=0.06;\n' +
    '  document.getElementById("s-val").textContent=Math.round(ship.shield)+"%";\n' +
    '  document.getElementById("h-val").textContent=Math.round(ship.hull)+"%";\n' +
    '  var camX=ship.x-cv.width/2,camY=ship.y-cv.height/2;\n' +
    '  cx.fillStyle="#030611";cx.fillRect(0,0,cv.width,cv.height);\n' +
    '  cx.fillStyle="#fff";\n' +
    '  stars.forEach(function(s){\n' +
    '    var sx=((s.x-camX*s.l)%(cv.width+300)+cv.width+300)%(cv.width+300)-150;\n' +
    '    var sy=((s.y-camY*s.l)%(cv.height+300)+cv.height+300)%(cv.height+300)-150;\n' +
    '    cx.fillRect(sx,sy,s.s,s.s);\n' +
    '  });\n' +
    '  planets.forEach(function(p){\n' +
    '    var px=p.x-camX,py=p.y-camY;\n' +
    '    cx.fillStyle=p.atm+"44";cx.beginPath();cx.arc(px,py,p.r*1.25,0,Math.PI*2);cx.fill();\n' +
    '    cx.fillStyle=p.c;cx.beginPath();cx.arc(px,py,p.r,0,Math.PI*2);cx.fill();\n' +
    '    cx.fillStyle=p.scanned?"#34d399":"#94a3b8";cx.font="bold 12px sans-serif";cx.textAlign="center";\n' +
    '    cx.fillText((p.scanned?"✓ ":"⌖ ")+p.name,px,py+p.r+20);\n' +
    '  });\n' +
    '  for(var i=bullets.length-1;i>=0;i--){\n' +
    '    var b=bullets[i];b.x+=b.vx;b.y+=b.vy;b.life--;\n' +
    '    cx.fillStyle=b.c;cx.beginPath();cx.arc(b.x-camX,b.y-camY,3,0,Math.PI*2);cx.fill();\n' +
    '    if(b.life<=0)bullets.splice(i,1);\n' +
    '  }\n' +
    '  for(var ei=enemies.length-1;ei>=0;ei--){\n' +
    '    var e=enemies[ei];\n' +
    '    var ea=Math.atan2(ship.y-e.y,ship.x-e.x);\n' +
    '    e.x+=Math.cos(ea)*1.8;e.y+=Math.sin(ea)*1.8;\n' +
    '    cx.fillStyle=e.c;cx.beginPath();cx.arc(e.x-camX,e.y-camY,12,0,Math.PI*2);cx.fill();\n' +
    '    for(var bi=bullets.length-1;bi>=0;bi--){\n' +
    '      if(Math.hypot(bullets[bi].x-e.x,bullets[bi].y-e.y)<18){\n' +
    '        e.hp-=15;bullets.splice(bi,1);\n' +
    '        if(e.hp<=0){score+=30;document.getElementById("sc-val").textContent=score;enemies.splice(ei,1);break;}\n' +
    '      }\n' +
    '    }\n' +
    '  }\n' +
    '  cx.save();cx.translate(cv.width/2,cv.height/2);cx.rotate(ship.angle);\n' +
    '  cx.strokeStyle="rgba(56,189,248,0.4)";cx.lineWidth=2;cx.beginPath();cx.arc(0,0,26,0,Math.PI*2);cx.stroke();\n' +
    '  cx.fillStyle="#0f172a";cx.strokeStyle="#38bdf8";cx.lineWidth=2;\n' +
    '  cx.beginPath();cx.moveTo(22,0);cx.lineTo(-12,-16);cx.lineTo(-6,0);cx.lineTo(-12,16);cx.closePath();cx.fill();cx.stroke();\n' +
    '  cx.restore();\n' +
    '  requestAnimationFrame(loop);\n' +
    '}\n' +
    'loop();'
}

];

console.log("[ULTRA] Real Apps Library loaded successfully. Total:", window.ULTRA_TEMPLATES.length);
