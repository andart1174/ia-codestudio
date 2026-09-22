/**
 * Complete App Store v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'App Store', title: '🏪 Complete App Store', sub: 'Generate fully functional apps',
    desc: 'Select an app and generate full HTML, CSS, and JS logic instantly.',
    generate: '⚡ Generate App',
    category: 'Category: ',
    injected: '✅ App generated!',
    apps: {
      todo: 'To-Do List', todoDesc: 'Add, edit, delete, and filter tasks with LocalStorage',
      calc: 'Calculator', calcDesc: 'Standard calculator with history and keyboard support',
      pomodoro: 'Pomodoro Timer', pomodoroDesc: 'Work/Break timer with circular progress and sound',
      notes: 'Notes App', notesDesc: 'Create and save text notes with color coding',
      pwd: 'Password Gen', pwdDesc: 'Generate strong passwords with custom settings',
      bmi: 'BMI Calculator', bmiDesc: 'Calculate Body Mass Index with visual scale',
      weather: 'Weather App', weatherDesc: 'UI for weather with animated icons (mock data)',
      budget: 'Budget Tracker', budgetDesc: 'Track income and expenses with chart visualization',
      kanban: 'Kanban Board', kanbanDesc: 'Drag and drop task board (To Do, In Progress, Done)',
      stopwatch: 'Stopwatch', stopwatchDesc: 'Accurate stopwatch with lap functionality',
      admin: 'Admin Dashboard', adminDesc: 'Complete admin panel with sidebar and canvas charts',
      shop: 'Mini-Shop', shopDesc: 'E-commerce UI with a working shopping cart',
      social: 'Social Feed', socialDesc: 'Interactive feed with posts, likes, and comments',
      piano: 'Web Piano', pianoDesc: 'Playable synthesizer keyboard using Web Audio API',
      resume: 'Interactive Resume', resumeDesc: 'Modern CV with animated skills and timeline',
      draw: 'Whiteboard', drawDesc: 'Canvas-based drawing app with colors and brush sizes',
      chat: 'Smart Chatbot', chatDesc: 'Messaging UI with auto-replying bot logic',
      quiz: 'Trivia Quiz', quizDesc: 'Interactive multiple-choice quiz with scoring',
      calendar: 'Event Calendar', calendarDesc: 'Dynamic monthly calendar with event adding',
      media: 'Custom Player', mediaDesc: 'Custom styled video/audio player controls',
      unit: 'Unit Converter', unitDesc: 'Convert length, weight, and temperature instantly',
      chart: 'Chart Builder', chartDesc: 'Generate bar and pie charts from data input',
      habit: 'Habit Tracker', habitDesc: 'Track daily habits with streaks and visual progress',
      flashcard: 'Flashcards', flashcardDesc: 'Create study cards with 3D flip animation',
      memory: 'Memory Game', memoryDesc: 'Classic card matching game with timer and score'
    }
  },
  fr: {
    tab: 'App Store', title: '🏪 App Store Complet', sub: 'Generez des applications fonctionnelles',
    desc: 'Selectionnez une app et generez le HTML, CSS et JS complet instantanement.',
    generate: '⚡ Generer l App',
    category: 'Categorie: ',
    injected: '✅ App generee !',
    apps: {
      todo: 'Liste de Taches', todoDesc: 'Ajoutez, editez, supprimez et filtrez avec LocalStorage',
      calc: 'Calculatrice', calcDesc: 'Calculatrice standard avec historique et clavier',
      pomodoro: 'Minuteur Pomodoro', pomodoroDesc: 'Minuteur Travail/Pause avec progression et son',
      notes: 'Bloc-notes', notesDesc: 'Creez et sauvegardez des notes avec des couleurs',
      pwd: 'Gen. Mots de Passe', pwdDesc: 'Generez des mots de passe avec parametres',
      bmi: 'Calculateur IMC', bmiDesc: 'Calculez l Indice de Masse Corporelle',
      weather: 'App Meteo', weatherDesc: 'UI meteo avec icones animees (donnees simulees)',
      budget: 'Suivi Budget', budgetDesc: 'Suivez les revenus et depenses',
      kanban: 'Tableau Kanban', kanbanDesc: 'Tableau de taches glisser-deposer',
      stopwatch: 'Chronomètre', stopwatchDesc: 'Chronomètre précis avec fonction tour',
      admin: 'Tableau de Bord', adminDesc: 'Panneau admin complet avec sidebar et graphiques',
      shop: 'Mini-Boutique', shopDesc: 'UI e-commerce avec un panier fonctionnel',
      social: 'Flux Social', socialDesc: 'Flux interactif avec posts, j aimes et commentaires',
      piano: 'Piano Web', pianoDesc: 'Clavier synthetiseur jouable via Web Audio API',
      resume: 'CV Interactif', resumeDesc: 'CV moderne avec competences animees et chronologie',
      draw: 'Tableau Blanc', drawDesc: 'App de dessin sur Canvas avec couleurs et tailles',
      chat: 'Chatbot Smart', chatDesc: 'UI de messagerie avec bot a reponse automatique',
      quiz: 'Quiz Trivia', quizDesc: 'Quiz interactif a choix multiples avec score',
      calendar: 'Calendrier', calendarDesc: 'Calendrier mensuel dynamique avec evenements',
      media: 'Lecteur Custom', mediaDesc: 'Controles personnalises pour lecteur video/audio',
      unit: 'Convertisseur', unitDesc: 'Convertissez longueurs, poids et temperatures instantanement',
      chart: 'Créateur de Graphique', chartDesc: 'Generez des graphiques barres et camembert',
      habit: 'Suivi Habitudes', habitDesc: 'Suivez vos habitudes quotidiennes avec progression',
      flashcard: 'Cartes Memoire', flashcardDesc: 'Creez des cartes de revision avec animation 3D',
      memory: 'Jeu de Memoire', memoryDesc: 'Jeu classique de paires de cartes avec chrono et score'
    }
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }
function ta(k) { return ((TX[gl()] || TX.en).apps || TX.en.apps)[k] || k; }

var APPS = [
  {
    id: 'todo', nameKey: 'todo', descKey: 'todoDesc', icon: '📋',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>To-Do List</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; padding: 2rem; }
  .app { background: #1e293b; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 100%; max-width: 400px; }
  h1 { text-align: center; color: #38bdf8; margin-top: 0; }
  form { display: flex; gap: 10px; margin-bottom: 20px; }
  input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff; }
  button { padding: 10px 15px; border: none; border-radius: 6px; background: #38bdf8; color: #0f172a; font-weight: bold; cursor: pointer; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #334155; margin-bottom: 8px; border-radius: 6px; }
  li.done span { text-decoration: line-through; color: #94a3b8; }
  li span { flex: 1; cursor: pointer; }
  .delete { background: #ef4444; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
</style>
</head>
<body>
<div class="app">
  <h1>To-Do List</h1>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new task..." required>
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list"></ul>
</div>
<script>
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  let tasks = JSON.parse(localStorage.getItem('todos')) || [];

  function render() {
    list.innerHTML = '';
    tasks.forEach((task, i) => {
      const li = document.createElement('li');
      if(task.done) li.classList.add('done');
      
      const span = document.createElement('span');
      span.textContent = task.text;
      span.onclick = () => { tasks[i].done = !tasks[i].done; save(); };
      
      const del = document.createElement('button');
      del.textContent = '✖';
      del.className = 'delete';
      del.onclick = () => { tasks.splice(i, 1); save(); };
      
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  function save() {
    localStorage.setItem('todos', JSON.stringify(tasks));
    render();
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    if(!input.value.trim()) return;
    tasks.push({ text: input.value.trim(), done: false });
    input.value = '';
    save();
  };

  render();
</script>
</body>
</html>`
  },
  {
    id: 'calc', nameKey: 'calc', descKey: 'calcDesc', icon: '🧮',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Calculator</title>
<style>
  body { font-family: sans-serif; background: #1e1e1e; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .calc { background: #333; padding: 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  #display { width: 100%; height: 60px; background: #222; color: #fff; text-align: right; font-size: 2rem; padding: 10px; box-sizing: border-box; border: none; border-radius: 5px; margin-bottom: 10px; }
  .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  button { padding: 15px; font-size: 1.5rem; border: none; border-radius: 5px; cursor: pointer; background: #555; color: white; transition: 0.1s; }
  button:active { transform: scale(0.95); }
  .op { background: #f39c12; }
  .clear { background: #e74c3c; grid-column: span 2; }
  .zero { grid-column: span 2; }
</style>
</head>
<body>
<div class="calc">
  <input type="text" id="display" disabled value="0">
  <div class="buttons">
    <button class="clear" onclick="clearDisplay()">C</button>
    <button class="op" onclick="append('/')">/</button>
    <button class="op" onclick="append('*')">×</button>
    <button onclick="append('7')">7</button>
    <button onclick="append('8')">8</button>
    <button onclick="append('9')">9</button>
    <button class="op" onclick="append('-')">-</button>
    <button onclick="append('4')">4</button>
    <button onclick="append('5')">5</button>
    <button onclick="append('6')">6</button>
    <button class="op" onclick="append('+')">+</button>
    <button onclick="append('1')">1</button>
    <button onclick="append('2')">2</button>
    <button onclick="append('3')">3</button>
    <button class="op" onclick="calculate()" style="grid-row: span 2;">=</button>
    <button class="zero" onclick="append('0')">0</button>
    <button onclick="append('.')">.</button>
  </div>
</div>
<script>
  const display = document.getElementById('display');
  let current = '';
  
  function append(val) {
    if(current === '0' && val !== '.') current = '';
    current += val;
    display.value = current;
  }
  
  function clearDisplay() {
    current = '';
    display.value = '0';
  }
  
  function calculate() {
    try {
      current = eval(current).toString();
      display.value = current;
    } catch(e) {
      display.value = 'Error';
      current = '';
    }
  }
</script>
</body>
</html>`
  },
  {
    id: 'pomodoro', nameKey: 'pomodoro', descKey: 'pomodoroDesc', icon: '🍅',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pomodoro Timer</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #e11d48; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; transition: background 0.5s; }
  h1 { font-size: 3rem; margin: 0; }
  .timer { font-size: 8rem; font-weight: 900; line-height: 1; margin: 20px 0; font-variant-numeric: tabular-nums; }
  .controls { display: flex; gap: 10px; }
  button { padding: 15px 30px; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; background: white; color: #e11d48; transition: transform 0.1s; }
  button:active { transform: scale(0.95); }
  .modes { display: flex; gap: 10px; margin-bottom: 20px; }
  .mode-btn { background: rgba(255,255,255,0.2); color: white; padding: 5px 15px; border-radius: 20px; }
  .mode-btn.active { background: white; color: #e11d48; }
</style>
</head>
<body>
  <div class="modes">
    <button class="mode-btn active" onclick="setMode('work', 25)">Work</button>
    <button class="mode-btn" onclick="setMode('break', 5)">Break</button>
  </div>
  <div class="timer" id="time">25:00</div>
  <div class="controls">
    <button id="startBtn" onclick="toggle()">Start</button>
    <button onclick="reset()">Reset</button>
  </div>

<script>
  let time = 25 * 60;
  let timerId = null;
  let isRunning = false;
  let currentMode = 'work';
  let defaultTime = 25 * 60;

  const display = document.getElementById('time');
  const startBtn = document.getElementById('startBtn');

  function updateDisplay() {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    display.textContent = \`\${m}:\${s}\`;
  }

  function setMode(mode, mins) {
    currentMode = mode;
    defaultTime = mins * 60;
    time = defaultTime;
    document.body.style.background = mode === 'work' ? '#e11d48' : '#0ea5e9';
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    updateDisplay();
    if(isRunning) toggle();
  }

  function toggle() {
    if (isRunning) {
      clearInterval(timerId);
      startBtn.textContent = 'Start';
    } else {
      timerId = setInterval(() => {
        if (time > 0) { time--; updateDisplay(); }
        else { toggle(); alert('Time is up!'); }
      }, 1000);
      startBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
  }

  function reset() {
    if (isRunning) toggle();
    time = defaultTime;
    updateDisplay();
  }

  updateDisplay();
</script>
</body>
</html>`
  },
  {
    id: 'notes', nameKey: 'notes', descKey: 'notesDesc', icon: '📝',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notes App</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 2rem; }
  h1 { color: #0f172a; }
  .toolbar { display: flex; gap: 10px; margin-bottom: 20px; }
  button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  .note { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
  .note textarea { border: none; resize: none; width: 100%; height: 150px; font-family: inherit; font-size: 1rem; outline: none; background: transparent; }
  .note-footer { display: flex; justify-content: flex-end; margin-top: 10px; }
  .delete { background: #ef4444; padding: 5px 10px; font-size: 0.8rem; }
</style>
</head>
<body>
  <h1>My Notes</h1>
  <div class="toolbar">
    <button onclick="addNote()">+ New Note</button>
  </div>
  <div class="grid" id="notes-grid"></div>

<script>
  const grid = document.getElementById('notes-grid');
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function save() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function render() {
    grid.innerHTML = '';
    notes.forEach((note, i) => {
      const el = document.createElement('div');
      el.className = 'note';
      el.style.backgroundColor = note.color || '#ffffff';
      
      const ta = document.createElement('textarea');
      ta.value = note.text;
      ta.oninput = (e) => { notes[i].text = e.target.value; save(); };
      
      const footer = document.createElement('div');
      footer.className = 'note-footer';
      
      const del = document.createElement('button');
      del.className = 'delete';
      del.textContent = 'Delete';
      del.onclick = () => { notes.splice(i, 1); save(); render(); };
      
      footer.appendChild(del);
      el.appendChild(ta);
      el.appendChild(footer);
      grid.appendChild(el);
    });
  }

  function addNote() {
    const colors = ['#ffffff', '#fef08a', '#bbf7d0', '#bfdbfe', '#fecdd3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    notes.unshift({ text: '', color: randomColor });
    save();
    render();
  }

  render();
</script>
</body>
</html>`
  },
  {
    id: 'pwd', nameKey: 'pwd', descKey: 'pwdDesc', icon: '🔑',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Generator</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .box { background: #1e293b; padding: 2rem; border-radius: 12px; width: 100%; max-width: 350px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .result { display: flex; margin-bottom: 20px; }
  #pwd { flex: 1; padding: 15px; font-size: 1.2rem; font-family: monospace; background: #0f172a; border: 1px solid #334155; color: #10b981; border-radius: 6px 0 0 6px; }
  #copy { background: #3b82f6; border: none; padding: 0 20px; color: white; font-weight: bold; cursor: pointer; border-radius: 0 6px 6px 0; }
  .row { display: flex; justify-content: space-between; margin-bottom: 15px; align-items: center; }
  input[type="range"] { width: 100%; }
  button.gen { width: 100%; padding: 15px; background: #10b981; color: #0f172a; font-weight: bold; font-size: 1.1rem; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px; }
</style>
</head>
<body>
<div class="box">
  <h2 style="margin-top:0;text-align:center;">Password Gen</h2>
  <div class="result">
    <input type="text" id="pwd" readonly>
    <button id="copy" onclick="copy()">Copy</button>
  </div>
  
  <div class="row">
    <label>Length: <span id="len-val">12</span></label>
    <input type="range" id="len" min="6" max="32" value="12" oninput="document.getElementById('len-val').textContent=this.value">
  </div>
  
  <div class="row"><label>Uppercase</label><input type="checkbox" id="up" checked></div>
  <div class="row"><label>Lowercase</label><input type="checkbox" id="low" checked></div>
  <div class="row"><label>Numbers</label><input type="checkbox" id="num" checked></div>
  <div class="row"><label>Symbols</label><input type="checkbox" id="sym" checked></div>
  
  <button class="gen" onclick="generate()">Generate Password</button>
</div>

<script>
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const L = 'abcdefghijklmnopqrstuvwxyz';
  const N = '0123456789';
  const S = '!@#$%^&*()_+~|}{[]:;?><,./-=';

  function generate() {
    let chars = '';
    if(document.getElementById('up').checked) chars += U;
    if(document.getElementById('low').checked) chars += L;
    if(document.getElementById('num').checked) chars += N;
    if(document.getElementById('sym').checked) chars += S;
    
    if(!chars) { alert('Select at least one option!'); return; }
    
    let pwd = '';
    const len = document.getElementById('len').value;
    for(let i=0; i<len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('pwd').value = pwd;
  }

  function copy() {
    const el = document.getElementById('pwd');
    el.select();
    document.execCommand('copy');
    const btn = document.getElementById('copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  }
  
  generate();
</script>
</body>
</html>`
  },
  {
    id: 'admin', nameKey: 'admin', descKey: 'adminDesc', icon: '📈',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard</title>
<style>
  :root { --bg: #f1f5f9; --surface: #ffffff; --text: #0f172a; --primary: #3b82f6; }
  .dark { --bg: #0f172a; --surface: #1e293b; --text: #f8fafc; }
  body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); display: flex; height: 100vh; transition: background 0.3s; }
  .sidebar { width: 250px; background: var(--surface); padding: 20px; box-shadow: 2px 0 5px rgba(0,0,0,0.05); }
  .sidebar h2 { color: var(--primary); margin-top: 0; }
  .nav-item { padding: 12px 15px; margin-bottom: 5px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
  .nav-item:hover, .nav-item.active { background: var(--primary); color: white; }
  .main { flex: 1; padding: 20px; overflow-y: auto; }
  .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
  .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
  .card { background: var(--surface); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .card h3 { margin: 0 0 10px 0; font-size: 14px; color: #64748b; }
  .card .val { font-size: 24px; font-weight: bold; }
  canvas { width: 100%; height: 200px; background: var(--surface); border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); box-sizing: border-box; }
  button { padding: 8px 15px; border-radius: 6px; border: none; background: var(--surface); color: var(--text); cursor: pointer; border: 1px solid #cbd5e1; }
</style>
</head>
<body>
  <div class="sidebar">
    <h2>AdminPro</h2>
    <div class="nav-item active">Dashboard</div>
    <div class="nav-item">Users</div>
    <div class="nav-item">Analytics</div>
    <div class="nav-item">Settings</div>
  </div>
  <div class="main">
    <div class="topbar">
      <h1>Overview</h1>
      <button onclick="document.documentElement.classList.toggle('dark')">🌓 Toggle Dark Mode</button>
    </div>
    <div class="card-grid">
      <div class="card"><h3>Total Revenue</h3><div class="val">$45,231</div></div>
      <div class="card"><h3>Active Users</h3><div class="val">2,405</div></div>
      <div class="card"><h3>New Signups</h3><div class="val">143</div></div>
      <div class="card"><h3>Conversion</h3><div class="val">4.2%</div></div>
    </div>
    <canvas id="chart"></canvas>
  </div>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  const points = [20, 50, 30, 80, 40, 100, 70];
  function draw() {
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;
    const w = ctx.canvas.width, h = ctx.canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    ctx.moveTo(0, h - (points[0]/100)*h);
    points.forEach((p, i) => ctx.lineTo((i/(points.length-1))*w, h - (p/100)*h));
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    const grad = ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0, 'rgba(59,130,246,0.3)');
    grad.addColorStop(1, 'rgba(59,130,246,0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }
  draw();
  window.addEventListener('resize', draw);
</script>
</body>
</html>`
  },
  {
    id: 'shop', nameKey: 'shop', descKey: 'shopDesc', icon: '🛒',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mini Shop</title>
<style>
  body { margin:0; font-family:'Inter',sans-serif; background:#f8fafc; color:#0f172a; }
  nav { background:#ffffff; padding:15px 30px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 10px rgba(0,0,0,0.05); position:sticky; top:0; z-index:10; }
  .logo { font-size:1.5rem; font-weight:900; color:#4f46e5; }
  .cart-btn { background:#4f46e5; color:white; padding:10px 20px; border-radius:30px; border:none; cursor:pointer; font-weight:bold; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:30px; padding:40px; }
  .prod { background:white; border-radius:12px; padding:20px; text-align:center; box-shadow:0 4px 6px rgba(0,0,0,0.05); }
  .img { height:150px; background:#e2e8f0; border-radius:8px; margin-bottom:15px; display:flex; align-items:center; justify-content:center; font-size:3rem; }
  .prod button { background:#0f172a; color:white; border:none; padding:10px 15px; border-radius:6px; cursor:pointer; width:100%; margin-top:10px; font-weight:bold; }
  
  .modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:20; align-items:center; justify-content:center; }
  .modal-content { background:white; width:400px; max-width:90%; border-radius:12px; padding:30px; }
  .cart-item { display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; }
  .del { color:#ef4444; cursor:pointer; font-weight:bold; }
  .total { font-size:1.5rem; font-weight:bold; text-align:right; margin-top:20px; }
  .close { float:right; cursor:pointer; font-size:1.5rem; }
</style>
</head>
<body>
  <nav>
    <div class="logo">MiniShop</div>
    <button class="cart-btn" onclick="toggleCart()">🛒 Cart (<span id="count">0</span>)</button>
  </nav>
  <div class="grid" id="products"></div>
  
  <div class="modal" id="cart-modal">
    <div class="modal-content">
      <span class="close" onclick="toggleCart()">×</span>
      <h2>Your Cart</h2>
      <div id="cart-items"></div>
      <div class="total">Total: $<span id="total">0</span></div>
      <button style="width:100%;padding:15px;background:#4f46e5;color:white;border:none;border-radius:8px;font-weight:bold;margin-top:20px;cursor:pointer;">Checkout</button>
    </div>
  </div>

<script>
  const prods = [
    {id:1, name:'Wireless Headphones', price:99, icon:'🎧'},
    {id:2, name:'Smart Watch', price:149, icon:'⌚'},
    {id:3, name:'Camera Lens', price:299, icon:'📷'},
    {id:4, name:'Gaming Mouse', price:49, icon:'🖱️'},
    {id:5, name:'Mechanical Keyboard', price:129, icon:'⌨️'},
    {id:6, name:'Laptop Stand', price:39, icon:'💻'}
  ];
  let cart = [];
  
  const grid = document.getElementById('products');
  prods.forEach(p => {
    grid.innerHTML += \`<div class="prod">
      <div class="img">\${p.icon}</div>
      <h3>\${p.name}</h3>
      <p style="color:#4f46e5;font-weight:bold;">$\${p.price}</p>
      <button onclick="add(\${p.id})">Add to Cart</button>
    </div>\`;
  });

  function add(id) {
    const item = prods.find(p => p.id === id);
    cart.push(item);
    update();
  }
  function remove(i) {
    cart.splice(i, 1);
    update();
  }
  function update() {
    document.getElementById('count').textContent = cart.length;
    let html = ''; let total = 0;
    cart.forEach((c, i) => {
      html += \`<div class="cart-item"><span>\${c.icon} \${c.name}</span> <span>$\${c.price} <span class="del" onclick="remove(\${i})">×</span></span></div>\`;
      total += c.price;
    });
    if(!cart.length) html = '<p>Cart is empty</p>';
    document.getElementById('cart-items').innerHTML = html;
    document.getElementById('total').textContent = total;
  }
  function toggleCart() {
    const m = document.getElementById('cart-modal');
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
  }
</script>
</body>
</html>`
  },
  {
    id: 'social', nameKey: 'social', descKey: 'socialDesc', icon: '📱',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Social Feed</title>
<style>
  body { margin:0; font-family:'Inter',sans-serif; background:#f0f2f5; color:#1c1e21; display:flex; justify-content:center; }
  .container { width:100%; max-width:600px; padding:20px; }
  .card { background:white; border-radius:8px; padding:15px; margin-bottom:20px; box-shadow:0 1px 2px rgba(0,0,0,0.1); }
  .composer textarea { width:100%; border:none; resize:none; font-family:inherit; font-size:1.1rem; outline:none; height:60px; }
  .composer button { background:#1877f2; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:bold; float:right; }
  .clearfix::after { content:""; display:table; clear:both; }
  
  .post-header { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .avatar { width:40px; height:40px; border-radius:50%; background:#e4e6eb; display:flex; align-items:center; justify-content:center; font-weight:bold; }
  .author { font-weight:bold; }
  .time { font-size:0.8rem; color:#65676b; }
  
  .actions { display:flex; gap:10px; margin-top:15px; border-top:1px solid #e4e6eb; padding-top:10px; }
  .btn { flex:1; background:none; border:none; padding:10px; border-radius:6px; cursor:pointer; color:#65676b; font-weight:bold; transition:0.2s; }
  .btn:hover { background:#f0f2f5; }
  .btn.liked { color:#e41e3f; }
  
  @keyframes pop { 0% {transform:scale(1);} 50% {transform:scale(1.3);} 100% {transform:scale(1);} }
  .pop { animation:pop 0.3s ease; }
</style>
</head>
<body>
  <div class="container">
    <div class="card composer clearfix">
      <textarea id="postText" placeholder="What's on your mind?"></textarea>
      <button onclick="createPost()">Post</button>
    </div>
    <div id="feed"></div>
  </div>

<script>
  let posts = [
    { id:1, author:'Alex', text:'Just launched my new web app! 🚀', likes:5, liked:false }
  ];
  
  function render() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    posts.forEach((p, i) => {
      feed.innerHTML += \`
        <div class="card">
          <div class="post-header">
            <div class="avatar">\${p.author[0]}</div>
            <div>
              <div class="author">\${p.author}</div>
              <div class="time">Just now</div>
            </div>
          </div>
          <div class="content">\${p.text}</div>
          <div class="actions">
            <button class="btn \${p.liked ? 'liked pop' : ''}" onclick="toggleLike(\${i})">
              \${p.liked ? '❤️' : '🤍'} Like (\${p.likes})
            </button>
            <button class="btn">💬 Comment</button>
          </div>
        </div>
      \`;
    });
  }

  function createPost() {
    const txt = document.getElementById('postText').value;
    if(!txt.trim()) return;
    posts.unshift({ id:Date.now(), author:'You', text:txt, likes:0, liked:false });
    document.getElementById('postText').value = '';
    render();
  }

  function toggleLike(i) {
    if(posts[i].liked) { posts[i].likes--; posts[i].liked = false; }
    else { posts[i].likes++; posts[i].liked = true; }
    render();
  }

  render();
</script>
</body>
</html>`
  },
  {
    id: 'piano', nameKey: 'piano', descKey: 'pianoDesc', icon: '🎶',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Web Piano</title>
<style>
  body { background: #121212; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; color: white; flex-direction: column; }
  .piano { display: flex; position: relative; background: #333; padding: 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
  .key { width: 60px; height: 250px; background: white; border: 1px solid #ccc; border-radius: 0 0 5px 5px; cursor: pointer; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 20px; color: #333; font-weight: bold; position: relative; z-index: 1; transition: background 0.1s; }
  .key:active, .key.active { background: #e0e0e0; height: 245px; margin-top: 5px; }
  .black { width: 40px; height: 150px; background: black; border-radius: 0 0 5px 5px; position: absolute; top: 20px; z-index: 2; color: white; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 20px; margin-left: -20px; cursor: pointer; }
  .black:active, .black.active { background: #333; height: 145px; }
</style>
</head>
<body>
  <h1 style="color:#a855f7">Web Audio Piano</h1>
  <p>Click keys or use your keyboard (A, W, S, E, D, F, T, G...)</p>
  <div class="piano" id="piano"></div>

<script>
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let ctx = null;

  const notes = [
    { note: 'C4', freq: 261.63, key: 'a', type: 'white' },
    { note: 'C#4', freq: 277.18, key: 'w', type: 'black', offset: 1 },
    { note: 'D4', freq: 293.66, key: 's', type: 'white' },
    { note: 'D#4', freq: 311.13, key: 'e', type: 'black', offset: 2 },
    { note: 'E4', freq: 329.63, key: 'd', type: 'white' },
    { note: 'F4', freq: 349.23, key: 'f', type: 'white' },
    { note: 'F#4', freq: 369.99, key: 't', type: 'black', offset: 4 },
    { note: 'G4', freq: 392.00, key: 'g', type: 'white' },
    { note: 'G#4', freq: 415.30, key: 'y', type: 'black', offset: 5 },
    { note: 'A4', freq: 440.00, key: 'h', type: 'white' },
    { note: 'A#4', freq: 466.16, key: 'u', type: 'black', offset: 6 },
    { note: 'B4', freq: 493.88, key: 'j', type: 'white' }
  ];

  const piano = document.getElementById('piano');
  const domKeys = {};

  notes.forEach((n, i) => {
    const el = document.createElement('div');
    el.className = n.type === 'white' ? 'key' : 'black';
    if(n.type === 'black') el.style.left = (n.offset * 60) + 20 + 'px';
    el.textContent = n.key.toUpperCase();
    
    el.onmousedown = () => playNote(n.freq, el);
    el.onmouseup = () => el.classList.remove('active');
    el.onmouseleave = () => el.classList.remove('active');
    
    domKeys[n.key] = { freq: n.freq, el: el };
    piano.appendChild(el);
  });

  function playNote(freq, el) {
    if(!ctx) ctx = new AudioContext();
    el.classList.add('active');
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.5);
    osc.stop(ctx.currentTime + 1.5);
  }

  document.addEventListener('keydown', e => {
    if(e.repeat) return;
    const k = domKeys[e.key.toLowerCase()];
    if(k) playNote(k.freq, k.el);
  });
  document.addEventListener('keyup', e => {
    const k = domKeys[e.key.toLowerCase()];
    if(k) k.el.classList.remove('active');
  });
</script>
</body>
</html>`
  },
  {
    id: 'resume', nameKey: 'resume', descKey: 'resumeDesc', icon: '📄',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Resume</title>
<style>
  :root { --bg: #0f172a; --card: #1e293b; --accent: #14b8a6; --txt: #f8fafc; }
  body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--txt); padding: 40px 20px; }
  .container { max-width: 800px; margin: 0 auto; }
  .header { display: flex; align-items: center; gap: 30px; margin-bottom: 50px; background: var(--card); padding: 30px; border-radius: 16px; }
  .avatar { width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
  h1 { margin: 0 0 5px 0; font-size: 2.5rem; }
  .role { color: var(--accent); font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; }
  .social { display: flex; gap: 10px; }
  .tag { background: rgba(20,184,166,0.1); color: var(--accent); padding: 5px 12px; border-radius: 20px; font-size: 0.9rem; text-decoration: none; }
  
  h2 { border-bottom: 2px solid var(--card); padding-bottom: 10px; margin-top: 40px; }
  .timeline-item { position: relative; padding-left: 30px; margin-bottom: 30px; border-left: 2px solid var(--card); }
  .timeline-item::before { content: ""; position: absolute; left: -8px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); }
  .date { color: #94a3b8; font-size: 0.9rem; font-weight: bold; }
  .title { font-size: 1.2rem; font-weight: bold; margin: 5px 0; }
  .company { color: var(--accent); margin-bottom: 10px; }
  
  .skill { margin-bottom: 15px; }
  .skill-name { display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: bold; }
  .bar-bg { width: 100%; height: 8px; background: var(--card); border-radius: 4px; overflow: hidden; }
  .bar { height: 100%; background: var(--accent); width: 0%; transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="avatar">💻</div>
      <div>
        <h1>Alex Developer</h1>
        <div class="role">Full-Stack Engineer</div>
        <div class="social">
          <a href="#" class="tag">Email</a>
          <a href="#" class="tag">GitHub</a>
          <a href="#" class="tag">LinkedIn</a>
        </div>
      </div>
    </div>
    
    <h2>Experience</h2>
    <div class="timeline-item">
      <div class="date">2021 - Present</div>
      <div class="title">Senior Software Engineer</div>
      <div class="company">Tech Nova Inc.</div>
      <p>Led the frontend team to rebuild the core SaaS product using modern frameworks, improving performance by 40%.</p>
    </div>
    <div class="timeline-item">
      <div class="date">2018 - 2021</div>
      <div class="title">Web Developer</div>
      <div class="company">Creative Digital Agency</div>
      <p>Developed high-conversion landing pages and interactive web applications for diverse clients.</p>
    </div>

    <h2>Skills</h2>
    <div class="skill"><div class="skill-name"><span>JavaScript / TS</span><span>95%</span></div><div class="bar-bg"><div class="bar" data-width="95%"></div></div></div>
    <div class="skill"><div class="skill-name"><span>React / Next.js</span><span>90%</span></div><div class="bar-bg"><div class="bar" data-width="90%"></div></div></div>
    <div class="skill"><div class="skill-name"><span>CSS / Tailwind</span><span>85%</span></div><div class="bar-bg"><div class="bar" data-width="85%"></div></div></div>
    <div class="skill"><div class="skill-name"><span>Node.js / Express</span><span>80%</span></div><div class="bar-bg"><div class="bar" data-width="80%"></div></div></div>
  </div>

<script>
  window.onload = () => {
    setTimeout(() => {
      document.querySelectorAll('.bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }, 300);
  };
</script>
</body>
</html>`
  },
  {
    id: 'draw', nameKey: 'draw', descKey: 'drawDesc', icon: '🎨',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Whiteboard</title>
<style>
  body { margin: 0; font-family: sans-serif; background: #e2e8f0; display: flex; flex-direction: column; align-items: center; padding: 20px; height: 100vh; box-sizing: border-box; }
  .toolbar { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; display: flex; gap: 15px; align-items: center; width: 100%; max-width: 800px; }
  canvas { background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: crosshair; }
  button { padding: 8px 15px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  input[type="color"] { border: none; padding: 0; width: 30px; height: 30px; border-radius: 5px; cursor: pointer; }
</style>
</head>
<body>
  <div class="toolbar">
    <input type="color" id="color" value="#000000">
    <input type="range" id="size" min="1" max="20" value="5">
    <button onclick="clearCanvas()">Clear</button>
  </div>
  <canvas id="board" width="800" height="500"></canvas>

<script>
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const colorInp = document.getElementById('color');
  const sizeInp = document.getElementById('size');
  let drawing = false;

  function startPos(e) {
    drawing = true;
    draw(e);
  }
  function endPos() {
    drawing = false;
    ctx.beginPath();
  }
  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = sizeInp.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorInp.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPos);
  canvas.addEventListener('mouseup', endPos);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', endPos);

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
</script>
</body>
</html>`
  },
  {
    id: 'chat', nameKey: 'chat', descKey: 'chatDesc', icon: '💬',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smart Chat</title>
<style>
  body { margin: 0; font-family: 'Inter', sans-serif; background: #f1f5f9; display: flex; justify-content: center; align-items: center; height: 100vh; }
  .chat-app { width: 100%; max-width: 400px; height: 600px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; }
  .header { background: #3b82f6; color: white; padding: 20px; font-weight: bold; font-size: 1.2rem; text-align: center; }
  .messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f8fafc; }
  .msg { max-width: 75%; padding: 12px 16px; border-radius: 20px; font-size: 0.95rem; line-height: 1.4; animation: pop 0.3s ease; }
  .bot { background: #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 5px; }
  .user { background: #3b82f6; color: white; align-self: flex-end; border-bottom-right-radius: 5px; }
  .input-area { padding: 15px; background: white; display: flex; gap: 10px; border-top: 1px solid #e2e8f0; }
  input { flex: 1; padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 30px; outline: none; }
  button { background: #3b82f6; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-weight: bold; }
  @keyframes pop { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .typing { font-size: 0.8rem; color: #94a3b8; margin-left: 10px; display: none; }
</style>
</head>
<body>
<div class="chat-app">
  <div class="header">Support Bot</div>
  <div class="messages" id="msgs">
    <div class="msg bot">Hello! How can I help you today?</div>
  </div>
  <div class="typing" id="typing">Bot is typing...</div>
  <div class="input-area">
    <input type="text" id="input" placeholder="Type a message..." onkeypress="if(event.key==='Enter') send()">
    <button onclick="send()">➤</button>
  </div>
</div>

<script>
  const msgs = document.getElementById('msgs');
  const input = document.getElementById('input');
  const typing = document.getElementById('typing');
  
  const replies = [
    "That's interesting! Tell me more.",
    "I completely understand.",
    "Could you clarify that?",
    "Haha, good one!",
    "I'm just a simple bot, but I agree."
  ];

  function send() {
    const text = input.value.trim();
    if (!text) return;
    
    appendMsg(text, 'user');
    input.value = '';
    
    typing.style.display = 'block';
    msgs.scrollTop = msgs.scrollHeight;
    
    setTimeout(() => {
      typing.style.display = 'none';
      const reply = replies[Math.floor(Math.random() * replies.length)];
      appendMsg(reply, 'bot');
    }, 1500);
  }

  function appendMsg(text, sender) {
    const div = document.createElement('div');
    div.className = 'msg ' + sender;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
</script>
</body>
</html>`
  },
  {
    id: 'quiz', nameKey: 'quiz', descKey: 'quizDesc', icon: '🧠',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trivia Quiz</title>
<style>
  body { margin: 0; font-family: 'Inter', sans-serif; background: #6366f1; display: flex; justify-content: center; align-items: center; height: 100vh; }
  .quiz-box { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); width: 100%; max-width: 450px; text-align: center; }
  h2 { color: #1e293b; margin-top: 0; }
  .options { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
  .opt-btn { padding: 15px; border: 2px solid #e2e8f0; background: white; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: 0.2s; font-weight: bold; color: #475569; }
  .opt-btn:hover { background: #f8fafc; border-color: #6366f1; color: #6366f1; }
  .opt-btn.correct { background: #22c55e; border-color: #22c55e; color: white; }
  .opt-btn.wrong { background: #ef4444; border-color: #ef4444; color: white; }
  .progress { height: 8px; background: #e2e8f0; border-radius: 4px; margin-bottom: 20px; overflow: hidden; }
  .fill { height: 100%; background: #6366f1; width: 0%; transition: 0.3s; }
  .hidden { display: none; }
  #next { margin-top: 20px; padding: 12px 30px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
</style>
</head>
<body>
<div class="quiz-box">
  <div id="quiz-screen">
    <div class="progress"><div class="fill" id="fill"></div></div>
    <h2 id="question">Question goes here</h2>
    <div class="options" id="options"></div>
    <button id="next" class="hidden" onclick="nextQ()">Next Question</button>
  </div>
  <div id="result-screen" class="hidden">
    <h2>Quiz Completed! 🎉</h2>
    <p style="font-size:1.2rem;">Your score: <strong id="score">0</strong> / 3</p>
    <button onclick="location.reload()" style="padding:12px 30px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;margin-top:20px;">Restart</button>
  </div>
</div>

<script>
  const qData = [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Language"], a: 0 },
    { q: "What is the primary color of the sky?", options: ["Green", "Blue", "Red", "Yellow"], a: 1 },
    { q: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], a: 3 }
  ];
  let cur = 0, score = 0;
  
  function loadQ() {
    document.getElementById('next').classList.add('hidden');
    document.getElementById('fill').style.width = ((cur) / qData.length) * 100 + '%';
    const q = qData[cur];
    document.getElementById('question').textContent = q.q;
    const opts = document.getElementById('options');
    opts.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = opt;
      btn.onclick = () => checkAns(i, btn);
      opts.appendChild(btn);
    });
  }

  function checkAns(idx, btn) {
    const opts = document.querySelectorAll('.opt-btn');
    opts.forEach(b => b.disabled = true);
    if (idx === qData[cur].a) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      opts[qData[cur].a].classList.add('correct');
    }
    document.getElementById('next').classList.remove('hidden');
  }

  function nextQ() {
    cur++;
    if (cur < qData.length) loadQ();
    else showRes();
  }

  function showRes() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score').textContent = score;
  }

  loadQ();
</script>
</body>
</html>`
  },
  {
    id: 'calendar', nameKey: 'calendar', descKey: 'calendarDesc', icon: '📅',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dynamic Calendar</title>
<style>
  body { margin: 0; font-family: 'Inter', sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; }
  .calendar { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .header h2 { margin: 0; color: #1e293b; }
  .btn { background: #e2e8f0; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: bold; }
  .days { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; color: #94a3b8; margin-bottom: 10px; font-size: 0.9rem; }
  .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
  .day { height: 45px; display: flex; justify-content: center; align-items: center; border-radius: 8px; cursor: pointer; position: relative; color: #334155; font-weight: 500; transition: 0.2s; }
  .day:hover { background: #f1f5f9; }
  .day.today { background: #3b82f6; color: white; }
  .day.empty { visibility: hidden; }
  .event-dot { width: 6px; height: 6px; background: #ef4444; border-radius: 50%; position: absolute; bottom: 5px; }
</style>
</head>
<body>
<div class="calendar">
  <div class="header">
    <button class="btn" onclick="ch(-1)">&lt;</button>
    <h2 id="month">Month Year</h2>
    <button class="btn" onclick="ch(1)">&gt;</button>
  </div>
  <div class="days">
    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
  </div>
  <div class="grid" id="grid"></div>
</div>

<script>
  let date = new Date();
  const events = {};

  function render() {
    date.setDate(1);
    const m = date.getMonth();
    const y = date.getFullYear();
    document.getElementById('month').textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const lastDay = new Date(y, m + 1, 0).getDate();
    const firstDayIndex = date.getDay();
    
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    for(let x=1; x<=firstDayIndex; x++) {
      grid.innerHTML += \`<div class="day empty"></div>\`;
    }
    
    const today = new Date();
    for(let i=1; i<=lastDay; i++) {
      const isToday = i === today.getDate() && m === today.getMonth() && y === today.getFullYear() ? 'today' : '';
      const key = \`\${y}-\${m}-\${i}\`;
      const hasEvent = events[key] ? '<div class="event-dot"></div>' : '';
      
      grid.innerHTML += \`<div class="day \${isToday}" onclick="addEv('\${key}')">\${i}\${hasEvent}</div>\`;
    }
  }

  function ch(dir) {
    date.setMonth(date.getMonth() + dir);
    render();
  }

  function addEv(key) {
    if(events[key]) {
      alert('Event: ' + events[key]);
      if(confirm('Delete event?')) { delete events[key]; render(); }
    } else {
      const title = prompt('Enter event title:');
      if(title) { events[key] = title; render(); }
    }
  }

  render();
</script>
</body>
</html>`
  },
  {
    id: 'media', nameKey: 'media', descKey: 'mediaDesc', icon: '🎵',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Custom Media Player</title>
<style>
  body { margin: 0; background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Inter', sans-serif; color: white; }
  .player { background: #1e293b; padding: 20px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); width: 100%; max-width: 600px; }
  video { width: 100%; border-radius: 10px; background: #000; }
  .controls { display: flex; align-items: center; gap: 15px; margin-top: 15px; }
  .play-btn { background: #38bdf8; color: #0f172a; border: none; width: 45px; height: 45px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1.2rem; }
  .bar-container { flex: 1; display: flex; align-items: center; gap: 10px; }
  input[type="range"] { -webkit-appearance: none; width: 100%; height: 6px; background: #334155; border-radius: 3px; outline: none; cursor: pointer; }
  input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; background: #38bdf8; border-radius: 50%; }
  .time { font-size: 0.85rem; color: #94a3b8; font-variant-numeric: tabular-nums; }
</style>
</head>
<body>
<div class="player">
  <video id="vid" src="https://www.w3schools.com/html/mov_bbb.mp4" onclick="toggle()"></video>
  
  <div class="controls">
    <button class="play-btn" id="playBtn" onclick="toggle()">▶</button>
    
    <div class="bar-container">
      <span class="time" id="cur">0:00</span>
      <input type="range" id="progress" value="0" min="0" max="100">
      <span class="time" id="dur">0:10</span>
    </div>
    
    <span style="font-size:1.2rem">🔊</span>
    <input type="range" id="vol" value="100" min="0" max="100" style="width:80px">
  </div>
</div>

<script>
  const vid = document.getElementById('vid');
  const playBtn = document.getElementById('playBtn');
  const progress = document.getElementById('progress');
  const cur = document.getElementById('cur');
  const dur = document.getElementById('dur');
  const vol = document.getElementById('vol');

  function toggle() {
    if (vid.paused) { vid.play(); playBtn.textContent = '⏸'; }
    else { vid.pause(); playBtn.textContent = '▶'; }
  }

  vid.addEventListener('timeupdate', () => {
    const p = (vid.currentTime / vid.duration) * 100;
    progress.value = p || 0;
    cur.textContent = format(vid.currentTime);
  });

  vid.addEventListener('loadedmetadata', () => {
    dur.textContent = format(vid.duration);
  });

  progress.addEventListener('input', (e) => {
    vid.currentTime = (e.target.value / 100) * vid.duration;
  });

  vol.addEventListener('input', (e) => {
    vid.volume = e.target.value / 100;
  });

  function format(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
</script>
</body>
</html>`
  },
  {
    id: 'unit', nameKey: 'unit', descKey: 'unitDesc', icon: '🔄',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Unit Converter</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .box { background: #1e293b; padding: 2rem; border-radius: 12px; width: 100%; max-width: 350px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  h2 { margin-top: 0; text-align: center; color: #38bdf8; }
  .form-group { margin-bottom: 15px; }
  label { display: block; font-size: 0.9rem; color: #94a3b8; margin-bottom: 5px; }
  select, input { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; box-sizing: border-box; font-size: 1rem; }
  select:focus, input:focus { outline: none; border-color: #38bdf8; }
  .result { text-align: center; font-size: 1.5rem; font-weight: bold; margin-top: 20px; color: #10b981; }
</style>
</head>
<body>
<div class="box">
  <h2>Unit Converter</h2>
  <div class="form-group">
    <label>Type</label>
    <select id="type" onchange="updateOptions()">
      <option value="length">Length</option>
      <option value="weight">Weight</option>
      <option value="temp">Temperature</option>
    </select>
  </div>
  <div class="form-group">
    <label>From</label>
    <select id="from" onchange="convert()"></select>
  </div>
  <div class="form-group">
    <label>To</label>
    <select id="to" onchange="convert()"></select>
  </div>
  <div class="form-group">
    <label>Value</label>
    <input type="number" id="val" value="1" oninput="convert()">
  </div>
  <div class="result" id="res">1</div>
</div>
<script>
  const units = {
    length: [{n:'Meters', f:1}, {n:'Kilometers', f:1000}, {n:'Centimeters', f:0.01}, {n:'Miles', f:1609.34}, {n:'Feet', f:0.3048}],
    weight: [{n:'Kilograms', f:1}, {n:'Grams', f:0.001}, {n:'Pounds', f:0.453592}, {n:'Ounces', f:0.0283495}],
    temp: [{n:'Celsius', c:'c'}, {n:'Fahrenheit', c:'f'}, {n:'Kelvin', c:'k'}]
  };
  const fromEl = document.getElementById('from'), toEl = document.getElementById('to'), valEl = document.getElementById('val'), resEl = document.getElementById('res'), typeEl = document.getElementById('type');
  function updateOptions() {
    const t = typeEl.value;
    fromEl.innerHTML = ''; toEl.innerHTML = '';
    units[t].forEach(u => {
      fromEl.add(new Option(u.n, u.n));
      toEl.add(new Option(u.n, u.n));
    });
    toEl.selectedIndex = 1 < units[t].length ? 1 : 0;
    convert();
  }
  function convert() {
    const t = typeEl.value, v = parseFloat(valEl.value) || 0, from = fromEl.value, to = toEl.value;
    if (t === 'temp') {
      let c = 0;
      if (from === 'Celsius') c = v;
      else if (from === 'Fahrenheit') c = (v - 32) * 5/9;
      else if (from === 'Kelvin') c = v - 273.15;
      let res = 0;
      if (to === 'Celsius') res = c;
      else if (to === 'Fahrenheit') res = (c * 9/5) + 32;
      else if (to === 'Kelvin') res = c + 273.15;
      resEl.textContent = res.toFixed(2) + ' ' + (to.charAt(0)==='K' ? 'K' : '°'+to.charAt(0));
    } else {
      const uArr = units[t];
      const fromF = uArr.find(x => x.n === from).f;
      const toF = uArr.find(x => x.n === to).f;
      const base = v * fromF;
      const res = base / toF;
      resEl.textContent = res.toFixed(4).replace(/\.?0+$/, '') + ' ' + to;
    }
  }
  updateOptions();
</script>
</body>
</html>`
  },
  {
    id: 'chart', nameKey: 'chart', descKey: 'chartDesc', icon: '📊',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chart Builder</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 2rem; display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
  .panel { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); width: 300px; }
  .canvas-container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); flex: 1; min-width: 300px; display: flex; flex-direction: column; align-items: center; }
  h2 { margin-top: 0; color: #3b82f6; }
  input, select, button { width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #cbd5e1; box-sizing: border-box; }
  button { background: #3b82f6; color: white; border: none; font-weight: bold; cursor: pointer; transition: 0.2s; }
  button:hover { background: #2563eb; }
  .item { display: flex; gap: 10px; margin-bottom: 10px; }
  .item input { margin-bottom: 0; }
  .item button { width: auto; background: #ef4444; }
  canvas { max-width: 100%; }
</style>
</head>
<body>
<div class="panel">
  <h2>Data Input</h2>
  <div id="items"></div>
  <button onclick="addItem()">+ Add Item</button>
  <h3 style="font-size:1rem;margin-top:20px;">Chart Type</h3>
  <select id="type" onchange="draw()">
    <option value="bar">Bar Chart</option>
    <option value="pie">Pie Chart</option>
  </select>
</div>
<div class="canvas-container">
  <canvas id="chart" width="400" height="400"></canvas>
</div>
<script>
  let data = [{l: 'A', v: 30}, {l: 'B', v: 50}, {l: 'C', v: 20}];
  const itemsEl = document.getElementById('items'), ctx = document.getElementById('chart').getContext('2d');
  const colors = ['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6','#ec4899','#14b8a6'];
  function renderItems() {
    itemsEl.innerHTML = '';
    data.forEach((d, i) => {
      itemsEl.innerHTML += '<div class="item">' +
        '<input type="text" value="' + d.l + '" onchange="data['+i+'].l=this.value;draw()">' +
        '<input type="number" value="' + d.v + '" onchange="data['+i+'].v=parseFloat(this.value)||0;draw()">' +
        '<button onclick="data.splice('+i+',1);renderItems();draw()">×</button>' +
      '</div>';
    });
  }
  function addItem() { data.push({l: 'New', v: 10}); renderItems(); draw(); }
  function draw() {
    const type = document.getElementById('type').value;
    const w = ctx.canvas.width, h = ctx.canvas.height;
    ctx.clearRect(0,0,w,h);
    if(data.length === 0) return;
    const max = Math.max(...data.map(d=>d.v));
    if(type === 'bar') {
      const barW = (w - 40) / data.length;
      data.forEach((d, i) => {
        const barH = (d.v / max) * (h - 60);
        ctx.fillStyle = colors[i%colors.length];
        ctx.fillRect(20 + i*barW + 10, h - 30 - barH, barW - 20, barH);
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(d.l, 20 + i*barW + barW/2, h - 10);
        ctx.fillText(d.v, 20 + i*barW + barW/2, h - 35 - barH);
      });
    } else {
      const total = data.reduce((s,d)=>s+d.v, 0);
      let start = 0;
      const cx = w/2, cy = h/2, r = Math.min(w,h)/2 - 40;
      data.forEach((d, i) => {
        const slice = (d.v/total) * 2 * Math.PI;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, start + slice);
        ctx.fillStyle = colors[i%colors.length]; ctx.fill();
        const mid = start + slice/2;
        const lx = cx + Math.cos(mid)*(r+20), ly = cy + Math.sin(mid)*(r+20);
        ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(d.l + ' (' + Math.round((d.v/total)*100) + '%)', lx, ly);
        start += slice;
      });
    }
  }
  renderItems(); draw();
</script>
</body>
</html>`
  },
  {
    id: 'habit', nameKey: 'habit', descKey: 'habitDesc', icon: '🎯',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Habit Tracker</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #e0e7ff; color: #312e81; margin: 0; padding: 2rem; display: flex; justify-content: center; }
  .app { background: white; padding: 2rem; border-radius: 16px; width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(67,56,202,0.1); }
  h1 { margin-top: 0; color: #4338ca; text-align: center; }
  .form { display: flex; gap: 10px; margin-bottom: 20px; }
  input { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #c7d2fe; box-sizing: border-box; outline: none; }
  input:focus { border-color: #6366f1; }
  button { padding: 12px 20px; border-radius: 8px; border: none; background: #6366f1; color: white; font-weight: bold; cursor: pointer; }
  .habit { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 15px; margin-bottom: 15px; }
  .h-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .h-title { font-weight: bold; font-size: 1.1rem; }
  .h-streak { background: #4f46e5; color: white; padding: 4px 8px; border-radius: 20px; font-size: 0.8rem; }
  .days { display: flex; justify-content: space-between; }
  .day { width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center; background: white; border: 1px solid #c7d2fe; cursor: pointer; user-select: none; font-size: 0.8rem; font-weight: bold; color: #818cf8; transition: 0.2s; }
  .day.done { background: #10b981; color: white; border-color: #10b981; transform: scale(1.1); }
</style>
</head>
<body>
<div class="app">
  <h1>Habit Tracker</h1>
  <div class="form">
    <input type="text" id="habit-in" placeholder="New habit (e.g. Read 10 pages)">
    <button onclick="add()">Add</button>
  </div>
  <div id="list"></div>
</div>
<script>
  let habits = JSON.parse(localStorage.getItem('habits')) || [];
  const daysArr = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  
  function render() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    habits.forEach((h, i) => {
      let streak = h.days.filter(Boolean).length;
      let daysHtml = daysArr.map((d, j) => 
        '<div class="day ' + (h.days[j] ? 'done' : '') + '" onclick="toggle(' + i + ',' + j + ')">' + d[0] + '</div>'
      ).join('');
      
      list.innerHTML += '<div class="habit">' +
        '<div class="h-head">' +
          '<div class="h-title">' + h.name + '</div>' +
          '<div style="display:flex; gap:10px; align-items:center;">' +
            '<div class="h-streak">🔥 ' + streak + '</div>' +
            '<button style="background:transparent; color:#ef4444; padding:0; font-size:1.2rem;" onclick="remove(' + i + ')">×</button>' +
          '</div>' +
        '</div>' +
        '<div class="days">' + daysHtml + '</div>' +
      '</div>';
    });
    localStorage.setItem('habits', JSON.stringify(habits));
  }
  
  function add() {
    const val = document.getElementById('habit-in').value.trim();
    if(val) {
      habits.push({name: val, days: [false,false,false,false,false,false,false]});
      document.getElementById('habit-in').value = '';
      render();
    }
  }
  
  function toggle(i, j) {
    habits[i].days[j] = !habits[i].days[j];
    render();
  }
  
  function remove(i) {
    habits.splice(i, 1);
    render();
  }
  
  render();
</script>
</body>
</html>`
  },
  {
    id: 'flashcard', nameKey: 'flashcard', descKey: 'flashcardDesc', icon: '🃏',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flashcards</title>
<style>
  body { font-family: 'Inter', sans-serif; background: #fdf4ff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: #4a044e; flex-direction: column; }
  h1 { color: #c026d3; }
  .scene { width: 350px; height: 250px; perspective: 1000px; cursor: pointer; margin-bottom: 20px; }
  .card { width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d; }
  .card.is-flipped { transform: rotateY(180deg); }
  .face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; font-weight: bold; border-radius: 16px; padding: 20px; box-sizing: border-box; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
  .front { background: white; color: #c026d3; border: 2px solid #f0abfc; }
  .back { background: #c026d3; color: white; transform: rotateY(180deg); }
  .controls { display: flex; gap: 10px; }
  button { padding: 12px 20px; border-radius: 8px; border: none; background: #e879f9; color: white; font-weight: bold; cursor: pointer; font-size: 1.1rem; }
  button:hover { background: #d946ef; }
  .form { display: flex; gap: 10px; margin-bottom: 20px; width: 350px; }
  input { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #f0abfc; outline: none; }
</style>
</head>
<body>
  <h1>Flashcards</h1>
  <div class="form">
    <input type="text" id="q" placeholder="Question">
    <input type="text" id="a" placeholder="Answer">
    <button onclick="add()">Add</button>
  </div>
  <div class="scene" onclick="document.getElementById('crd').classList.toggle('is-flipped')">
    <div class="card" id="crd">
      <div class="face front" id="front">No cards yet</div>
      <div class="face back" id="back">Add some above!</div>
    </div>
  </div>
  <div class="controls">
    <button onclick="prev()">← Prev</button>
    <div style="padding:12px;font-weight:bold;color:#c026d3;" id="idx">0/0</div>
    <button onclick="next()">Next →</button>
  </div>
<script>
  let cards = JSON.parse(localStorage.getItem('flashcards')) || [
    {q: 'What is HTML?', a: 'HyperText Markup Language'},
    {q: 'What does CSS do?', a: 'Styles web pages'}
  ];
  let cur = 0;
  function update() {
    const c = document.getElementById('crd');
    c.classList.remove('is-flipped');
    setTimeout(() => {
      if(cards.length === 0) {
        document.getElementById('front').textContent = 'No cards';
        document.getElementById('back').textContent = '';
        document.getElementById('idx').textContent = '0/0';
        return;
      }
      document.getElementById('front').textContent = cards[cur].q;
      document.getElementById('back').textContent = cards[cur].a;
      document.getElementById('idx').textContent = (cur+1) + '/' + cards.length;
    }, 150);
  }
  function next() { if(cur < cards.length-1) { cur++; update(); } }
  function prev() { if(cur > 0) { cur--; update(); } }
  function add() {
    const q = document.getElementById('q').value, a = document.getElementById('a').value;
    if(q && a) {
      cards.push({q,a});
      localStorage.setItem('flashcards', JSON.stringify(cards));
      document.getElementById('q').value = ''; document.getElementById('a').value = '';
      cur = cards.length - 1; update();
    }
  }
  update();
</script>
</body>
</html>`
  },
  {
    id: 'memory', nameKey: 'memory', descKey: 'memoryDesc', icon: '🧠',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Memory Game</title>
<style>
  body { font-family: sans-serif; background: #1e1e2f; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
  h1 { margin-top: 0; color: #ffeb3b; }
  .stats { display: flex; gap: 30px; margin-bottom: 20px; font-size: 1.2rem; }
  .grid { display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; perspective: 1000px; }
  .card { width: 80px; height: 80px; position: relative; transition: transform 0.5s; transform-style: preserve-3d; cursor: pointer; }
  .card.flipped { transform: rotateY(180deg); }
  .face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; justify-content: center; align-items: center; font-size: 2rem; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); }
  .front { background: #3f51b5; background-image: radial-gradient(#5c6bc0 15%, transparent 16%), radial-gradient(#5c6bc0 15%, transparent 16%); background-size: 20px 20px; background-position: 0 0, 10px 10px; }
  .back { background: #fff; transform: rotateY(180deg); }
  button { margin-top: 30px; padding: 10px 20px; border-radius: 6px; border: none; background: #ffeb3b; color: #000; font-weight: bold; font-size: 1.1rem; cursor: pointer; }
</style>
</head>
<body>
  <h1>Memory Game</h1>
  <div class="stats">
    <div>Time: <span id="time">0</span>s</div>
    <div>Flips: <span id="flips">0</span></div>
  </div>
  <div class="grid" id="grid"></div>
  <button onclick="init()">Restart</button>

<script>
  const emojis = ['🚀','👽','👾','🤖','💀','👻','🎃','🌟'];
  let cards = [], flipped = [], matched = 0, flips = 0, time = 0, timerId;
  const grid = document.getElementById('grid'), timeEl = document.getElementById('time'), flipsEl = document.getElementById('flips');
  
  function init() {
    clearInterval(timerId); time = 0; flips = 0; matched = 0;
    timeEl.textContent = '0'; flipsEl.textContent = '0';
    flipped = []; grid.innerHTML = '';
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    cards.forEach((emoji, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<div class="face front"></div><div class="face back">' + emoji + '</div>';
      card.onclick = () => flip(card, i);
      grid.appendChild(card);
    });
    timerId = setInterval(() => { time++; timeEl.textContent = time; }, 1000);
  }
  
  function flip(card, i) {
    if(flipped.length === 2 || card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    flipped.push({card, val: cards[i]});
    flips++; flipsEl.textContent = flips;
    
    if(flipped.length === 2) {
      setTimeout(() => {
        if(flipped[0].val === flipped[1].val) {
          matched += 2;
          if(matched === cards.length) { clearInterval(timerId); setTimeout(() => alert('You win in ' + time + 's!'), 300); }
        } else {
          flipped[0].card.classList.remove('flipped');
          flipped[1].card.classList.remove('flipped');
        }
        flipped = [];
      }, 1000);
    }
  }
  init();
</script>
</body>
</html>`
  }
];

function injectApp(code, statusEl) {
  if (!window.editor) return;
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  statusEl.textContent = t('injected');
  setTimeout(function() { statusEl.textContent = ''; }, 2000);
}

let isAppTyping = false;
function typeAppCode(code, statusEl) {
  if (!window.editor || isAppTyping) return;
  isAppTyping = true;
  var lines = code.split('\n');
  var currentCode = '';
  var index = 0;
  
  statusEl.textContent = '🤖 AI is writing code...';
  
  function typeNextLine() {
    if (index < lines.length) {
      currentCode += lines[index] + (index === lines.length - 1 ? '' : '\n');
      window.editor.setValue(currentCode);
      
      try {
         var lineCount = window.editor.getModel().getLineCount();
         window.editor.revealLine(lineCount);
      } catch(e){}
      
      index++;
      var delay = 80;
      if (lines[index-1]) {
         if (lines[index-1].length > 40) delay = 150;
         if (lines[index-1].trim() === '') delay = 20;
      }
      
      setTimeout(typeNextLine, delay);
    } else {
      if (window.runPreview) window.runPreview();
      statusEl.textContent = '✅ App Generated!';
      isAppTyping = false;
      setTimeout(function() { statusEl.textContent = ''; }, 2000);
    }
  }
  
  typeNextLine();
}

function renderAppStoreTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(139,92,246,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#a855f7;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);
  
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var desc = document.createElement('div');
  desc.style.cssText = 'font-size:10px;color:#94a3b8;line-height:1.5;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  var statusEl = document.createElement('div');
  statusEl.style.cssText = 'font-size:11px;color:#4ade80;min-height:14px;text-align:center;font-weight:bold;';
  body.appendChild(statusEl);

  APPS.forEach(function (app) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:10px;padding:12px;display:flex;align-items:center;gap:12px;transition:all 0.2s;';
    card.onmouseenter = function() { card.style.borderColor = '#a855f7'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseleave = function() { card.style.borderColor = '#334155'; card.style.transform = 'translateY(0)'; };

    var iconBox = document.createElement('div');
    iconBox.style.cssText = 'font-size:24px;width:40px;height:40px;background:rgba(168,85,247,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
    iconBox.textContent = app.icon;
    
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    
    var nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:12px;font-weight:800;color:#e2e8f0;margin-bottom:3px;';
    nameEl.textContent = ta(app.nameKey);
    
    var descEl = document.createElement('div');
    descEl.style.cssText = 'font-size:9px;color:#94a3b8;line-height:1.3;';
    descEl.textContent = ta(app.descKey);
    
    info.appendChild(nameEl);
    info.appendChild(descEl);

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:5px;flex-shrink:0;';

    var btnType = document.createElement('button');
    btnType.innerHTML = '🎬';
    btnType.title = "Cinematic Generate (For Video)";
    btnType.style.cssText = 'background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;';
    btnType.onclick = function() { typeAppCode(app.code, statusEl); };

    var btn = document.createElement('button');
    btn.textContent = '⚡';
    btn.title = t('generate');
    btn.style.cssText = 'background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;';
    btn.onclick = function() { injectApp(app.code, statusEl); };

    actions.appendChild(btnType);
    actions.appendChild(btn);

    card.appendChild(iconBox);
    card.appendChild(info);
    card.appendChild(actions);
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-appstore');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'appstore') renderAppStoreTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'appstore') {
      window.activeTab = 'appstore';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-appstore');
      if (btn) btn.classList.add('active');
      renderAppStoreTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
