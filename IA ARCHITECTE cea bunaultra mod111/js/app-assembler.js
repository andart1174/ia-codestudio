/**
 * App Assembler Pro v2.0 — EN/FR
 */
(function() {
'use strict';
var TX = {
  en: {
    tab: 'App Assembler', title: '🏗️ App Assembler', sub: '10 Full Functional Bases',
    desc: 'Inject a 100% complete, functional application skeleton. WARNING: This will overwrite your current code.',
    ecom: '🛍️ E-Commerce', ecomDesc: 'Store layout with products and cart logic.',
    social: '📱 Social Feed', socialDesc: 'Instagram-like feed with functional like buttons.',
    dash: '📊 Admin Dashboard', dashDesc: 'Admin panel with sidebar and stats cards.',
    chat: '💬 Messenger Chat', chatDesc: 'WhatsApp clone with functional message sending.',
    music: '🎵 Music Player', musicDesc: 'Spotify-like player with animated play buttons.',
    kanban: '📋 Kanban Board', kanbanDesc: 'Trello clone with drag-and-drop tasks.',
    link: '🔗 Link-in-Bio', linkDesc: 'Linktree clone for social media profiles.',
    realestate: '🏠 Real Estate', realestateDesc: 'Zillow-like property listing with filters.',
    weather: '⛅ Weather App', weatherDesc: 'Clean iOS-style weather forecast layout.',
    calc: '🧮 Smart Calculator', calcDesc: 'Fully functional grid-based calculator.',
    inject: '⚠️ Overwrite Code',
    injected: '✅ Full application base injected!'
  },
  fr: {
    tab: 'Assembleur App', title: '🏗️ Assembleur d\'App', sub: '10 Bases Complètes',
    desc: 'Injectez un squelette d\'application 100% fonctionnel. ATTENTION : Cela écrasera votre code actuel.',
    ecom: '🛍️ E-Commerce', ecomDesc: 'Boutique avec produits et logique de panier.',
    social: '📱 Réseau Social', socialDesc: 'Flux style Instagram avec boutons j\'aime.',
    dash: '📊 Dashboard Admin', dashDesc: 'Panneau avec barre latérale et cartes de stats.',
    chat: '💬 Chat Messenger', chatDesc: 'Clone WhatsApp avec envoi de messages.',
    music: '🎵 Lecteur Musical', musicDesc: 'Lecteur style Spotify avec animations.',
    kanban: '📋 Tableau Kanban', kanbanDesc: 'Clone Trello avec tâches glisser-déposer.',
    link: '🔗 Liens Profil', linkDesc: 'Clone Linktree pour les réseaux sociaux.',
    realestate: '🏠 Immobilier', realestateDesc: 'Annonces immobilières avec filtres.',
    weather: '⛅ App Météo', weatherDesc: 'Interface météo propre style iOS.',
    calc: '🧮 Calculatrice', calcDesc: 'Calculatrice fonctionnelle sur grille.',
    inject: '⚠️ Écraser le Code',
    injected: '✅ Base d\'application injectée !'
  }
};

function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var BASES = {
  ecom: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
    header { background: #fff; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    .brand { font-size: 24px; font-weight: 900; color: #3b82f6; }
    .cart-btn { background: #3b82f6; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .hero { text-align: center; padding: 80px 20px; background: #1e293b; color: #fff; }
    .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 40px; }
    .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.2s; }
    .card:hover { transform: translateY(-5px); }
    .card img { width: 100%; height: 200px; object-fit: cover; }
    .p-info { padding: 20px; }
    .p-title { font-size: 18px; margin: 0 0 10px; }
    .p-price { font-size: 22px; font-weight: bold; color: #10b981; margin-bottom: 15px; }
    .add-btn { width: 100%; background: #0f172a; color: #fff; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
<header>
  <div class="brand">ShopBase.</div>
  <button class="cart-btn">Cart (<span id="cart-count">0</span>)</button>
</header>
<div class="hero"><h1>Summer Collection 2026</h1><p>Next-day delivery.</p></div>
<div class="products">
  <div class="card"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"><div class="p-info"><h3 class="p-title">Smart Watch Pro</h3><div class="p-price">$299</div><button class="add-btn">Add to Cart</button></div></div>
  <div class="card"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"><div class="p-info"><h3 class="p-title">Noise Cancelling Bass</h3><div class="p-price">$199</div><button class="add-btn">Add to Cart</button></div></div>
</div>
<script>
  let cartCount = 0; const countEl = document.getElementById('cart-count');
  document.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', function() {
    countEl.textContent = ++cartCount; this.textContent = 'Added!'; this.style.background = '#10b981';
    setTimeout(() => { this.textContent = 'Add to Cart'; this.style.background = '#0f172a'; }, 1000);
  }));
</script>
</body></html>`,

  social: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #fafafa; color: #262626; }
    header { background: #fff; padding: 15px; border-bottom: 1px solid #dbdbdb; position: sticky; top: 0; text-align: center; font-size: 24px; font-weight: bold; }
    .feed { max-width: 470px; margin: 30px auto; display: flex; flex-direction: column; gap: 20px; }
    .post { background: #fff; border: 1px solid #dbdbdb; border-radius: 8px; }
    .post-header { padding: 14px; display: flex; align-items: center; gap: 10px; }
    .post-header img { width: 32px; height: 32px; border-radius: 50%; }
    .post-image { width: 100%; aspect-ratio: 1/1; object-fit: cover; }
    .post-actions { padding: 10px 14px; display: flex; gap: 15px; }
    .btn { background: none; border: none; font-size: 24px; cursor: pointer; transition: transform 0.1s; }
    .btn:active { transform: scale(1.2); }
    .likes { padding: 0 14px; font-weight: bold; }
    .caption { padding: 10px 14px; }
    .liked { color: #ed4956; }
  </style>
</head>
<body>
<header>SocialGram</header>
<div class="feed">
  <div class="post">
    <div class="post-header"><img src="https://i.pravatar.cc/150?img=32"><strong>jane_doe</strong></div>
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80" class="post-image">
    <div class="post-actions"><button class="btn like-btn">♡</button><button class="btn">💬</button></div>
    <div class="likes"><span class="num">1245</span> likes</div>
    <div class="caption"><strong>jane_doe</strong> Perfect day at the beach! 🌊</div>
  </div>
</div>
<script>
  document.querySelectorAll('.like-btn').forEach(btn => btn.addEventListener('click', function() {
    const span = this.parentElement.nextElementSibling.querySelector('.num');
    let l = parseInt(span.textContent);
    if(this.classList.contains('liked')) { this.classList.remove('liked'); this.innerHTML = '♡'; span.textContent = l-1; }
    else { this.classList.add('liked'); this.innerHTML = '❤️'; span.textContent = l+1; }
  }));
</script>
</body></html>`,

  dash: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #f1f5f9; display: flex; height: 100vh; }
    .sidebar { width: 250px; background: #1e293b; color: #fff; padding: 20px; }
    .sidebar h2 { color: #38bdf8; margin-top: 0; }
    .menu a { display: block; padding: 10px; color: #cbd5e1; text-decoration: none; border-radius: 6px; margin-bottom: 5px; }
    .menu a:hover, .menu a.active { background: #334155; color: #fff; }
    .main { flex: 1; padding: 30px; overflow-y: auto; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .card { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .val { font-size: 32px; font-weight: bold; color: #0f172a; }
    .chart { background: #fff; height: 300px; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; align-items: flex-end; gap: 10px; }
    .bar { flex: 1; background: #38bdf8; border-radius: 4px 4px 0 0; transition: height 1s; }
  </style>
</head>
<body>
<div class="sidebar"><h2>AdminOS</h2><div class="menu"><a href="#" class="active">📊 Dashboard</a><a href="#">👥 Users</a><a href="#">⚙️ Settings</a></div></div>
<div class="main">
  <h1>Overview</h1>
  <div class="grid">
    <div class="card">Total Revenue<div class="val">$45,231</div></div>
    <div class="card">Active Users<div class="val">2,405</div></div>
    <div class="card">New Orders<div class="val">342</div></div>
  </div>
  <div class="chart" id="chart"></div>
</div>
<script>
  const chart = document.getElementById('chart');
  for(let i=0; i<15; i++) {
    let bar = document.createElement('div'); bar.className = 'bar'; bar.style.height = '0%';
    chart.appendChild(bar);
    setTimeout(() => { bar.style.height = (Math.random() * 80 + 20) + '%'; }, 100);
  }
</script>
</body></html>`,

  chat: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #e2e8f0; height: 100vh; display: flex; justify-content: center; align-items: center; }
    .chat-app { width: 100%; max-width: 800px; height: 90vh; background: #fff; border-radius: 12px; display: flex; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .sidebar { width: 300px; background: #f8fafc; border-right: 1px solid #e2e8f0; }
    .contact { padding: 15px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 15px; align-items: center; cursor: pointer; }
    .contact:hover { background: #f1f5f9; }
    .contact img { width: 40px; height: 40px; border-radius: 50%; }
    .main { flex: 1; display: flex; flex-direction: column; background: #f1f5f9; }
    .chat-head { padding: 15px; background: #fff; border-bottom: 1px solid #e2e8f0; font-weight: bold; }
    .messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .msg { max-width: 70%; padding: 12px 16px; border-radius: 16px; font-size: 14px; }
    .msg.in { background: #fff; align-self: flex-start; border-bottom-left-radius: 4px; }
    .msg.out { background: #3b82f6; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
    .input-area { padding: 15px; background: #fff; display: flex; gap: 10px; }
    input { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 20px; outline: none; }
    button { background: #3b82f6; color: #fff; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }
  </style>
</head>
<body>
<div class="chat-app">
  <div class="sidebar">
    <div class="contact"><img src="https://i.pravatar.cc/150?u=1"><div><b>Sarah</b><br><small>Hey, are we still on?</small></div></div>
  </div>
  <div class="main">
    <div class="chat-head">Sarah</div>
    <div class="messages" id="msgs">
      <div class="msg in">Hey, are we still on for tonight?</div>
    </div>
    <div class="input-area">
      <input type="text" id="txt" placeholder="Type a message..." autofocus>
      <button id="send">Send</button>
    </div>
  </div>
</div>
<script>
  const msgs = document.getElementById('msgs'), txt = document.getElementById('txt');
  function send() {
    if(!txt.value.trim()) return;
    msgs.innerHTML += '<div class="msg out">' + txt.value + '</div>';
    txt.value = ''; msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { msgs.innerHTML += '<div class="msg in">Ok sounds good! 👍</div>'; msgs.scrollTop = msgs.scrollHeight; }, 1000);
  }
  document.getElementById('send').onclick = send;
  txt.onkeypress = e => { if(e.key === 'Enter') send(); };
</script>
</body></html>`,

  music: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #000; color: #fff; height: 100vh; display: flex; align-items: center; justify-content: center; }
    .player { width: 350px; background: #121212; padding: 30px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center; }
    .art { width: 100%; aspect-ratio: 1; border-radius: 12px; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.3); margin-bottom: 20px; }
    h2 { margin: 0 0 5px; font-size: 24px; }
    p { margin: 0 0 30px; color: #a3a3a3; }
    .progress-bar { width: 100%; height: 6px; background: #333; border-radius: 3px; margin-bottom: 30px; cursor: pointer; position: relative; }
    .progress { height: 100%; background: #1db954; width: 0%; border-radius: 3px; transition: width 0.1s linear; }
    .controls { display: flex; justify-content: center; align-items: center; gap: 30px; }
    .btn { background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; }
    .play { width: 60px; height: 60px; background: #1db954; border-radius: 50%; font-size: 24px; color: #000; display: flex; align-items: center; justify-content: center; transition: transform 0.1s; }
    .play:active { transform: scale(0.9); }
  </style>
</head>
<body>
<div class="player">
  <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80" class="art" id="art">
  <h2>Midnight City</h2><p>Synthwave Artist</p>
  <div class="progress-bar"><div class="progress" id="prog"></div></div>
  <div class="controls">
    <button class="btn">⏮</button>
    <button class="btn play" id="play">▶</button>
    <button class="btn">⏭</button>
  </div>
</div>
<script>
  let playing = false, p = 0, intv;
  const playBtn = document.getElementById('play'), prog = document.getElementById('prog'), art = document.getElementById('art');
  playBtn.onclick = () => {
    playing = !playing; playBtn.textContent = playing ? '⏸' : '▶';
    if(playing) {
      intv = setInterval(() => { p += 0.5; if(p>100) p=0; prog.style.width = p+'%'; }, 100);
      art.style.animation = 'pulse 2s infinite';
    } else { clearInterval(intv); art.style.animation = 'none'; }
  };
</script>
</body></html>`,

  kanban: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #0079bf; height: 100vh; padding: 20px; box-sizing: border-box; }
    h1 { color: #fff; margin-top: 0; }
    .board { display: flex; gap: 20px; height: calc(100% - 60px); align-items: flex-start; }
    .col { background: #ebecf0; width: 300px; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; max-height: 100%; }
    .col h3 { margin: 0 0 10px; padding: 5px; color: #172b4d; font-size: 16px; }
    .cards { flex: 1; overflow-y: auto; min-height: 50px; }
    .card { background: #fff; padding: 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); margin-bottom: 10px; cursor: grab; font-size: 14px; color: #172b4d; }
    .card:active { cursor: grabbing; opacity: 0.8; }
    .add { background: none; border: none; color: #5e6c84; padding: 8px; text-align: left; cursor: pointer; border-radius: 4px; }
    .add:hover { background: rgba(9,30,66,0.08); color: #172b4d; }
  </style>
</head>
<body>
<h1>Kanban Board</h1>
<div class="board">
  <div class="col" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>To Do</h3>
    <div class="cards" id="c1">
      <div class="card" draggable="true" ondragstart="drag(event)" id="t1">Design homepage</div>
      <div class="card" draggable="true" ondragstart="drag(event)" id="t2">Write documentation</div>
    </div>
    <button class="add">+ Add a card</button>
  </div>
  <div class="col" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Doing</h3>
    <div class="cards" id="c2">
      <div class="card" draggable="true" ondragstart="drag(event)" id="t3">Setup database</div>
    </div>
    <button class="add">+ Add a card</button>
  </div>
  <div class="col" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Done</h3>
    <div class="cards" id="c3"></div>
    <button class="add">+ Add a card</button>
  </div>
</div>
<script>
  function allowDrop(e) { e.preventDefault(); }
  function drag(e) { e.dataTransfer.setData("text", e.target.id); }
  function drop(e) { 
    e.preventDefault(); 
    var data = e.dataTransfer.getData("text");
    const dropTarget = e.target.classList.contains('cards') ? e.target : e.target.closest('.col').querySelector('.cards');
    dropTarget.appendChild(document.getElementById(data)); 
  }
  document.querySelectorAll('.add').forEach(b => b.onclick = () => {
    let t = prompt('Task name:');
    if(t) {
      let d = document.createElement('div');
      d.className = 'card'; d.draggable = true; d.id = 't' + Date.now();
      d.ondragstart = drag; d.textContent = t;
      b.previousElementSibling.appendChild(d);
    }
  });
</script>
</body></html>`,

  link: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: linear-gradient(135deg, #1e3a8a, #9333ea); min-height: 100vh; display: flex; justify-content: center; padding: 40px 20px; box-sizing: border-box; }
    .tree { width: 100%; max-width: 400px; text-align: center; }
    .avatar { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); margin-bottom: 20px; }
    h1 { color: #fff; margin: 0 0 10px; font-size: 24px; }
    p { color: #e9d5ff; margin: 0 0 30px; font-size: 16px; }
    .links { display: flex; flex-direction: column; gap: 15px; }
    .link { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.2); color: #fff; padding: 18px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 16px; transition: all 0.3s; }
    .link:hover { background: #fff; color: #9333ea; transform: scale(1.05); }
  </style>
</head>
<body>
<div class="tree">
  <img src="https://i.pravatar.cc/150?u=12" class="avatar">
  <h1>Alex Developer</h1>
  <p>Software Engineer & Creator</p>
  <div class="links">
    <a href="#" class="link">💻 My Portfolio</a>
    <a href="#" class="link">🎥 YouTube Channel</a>
    <a href="#" class="link">🐦 Twitter / X</a>
    <a href="#" class="link">🐙 GitHub Projects</a>
  </div>
</div>
</body></html>`,

  realestate: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #f3f4f6; color: #1f2937; }
    header { background: #fff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-bottom: 1px solid #e5e7eb; }
    .search { background: #2563eb; padding: 40px 20px; text-align: center; }
    .search input { padding: 15px; width: 80%; max-width: 500px; border: none; border-radius: 8px; font-size: 16px; outline: none; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 20px; max-width: 1200px; margin: 0 auto; }
    .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .card img { width: 100%; height: 200px; object-fit: cover; }
    .info { padding: 20px; }
    .price { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
    .details { display: flex; gap: 15px; color: #6b7280; font-size: 14px; margin-bottom: 10px; }
    .address { font-size: 16px; }
  </style>
</head>
<body>
<header>EstateFinder</header>
<div class="search"><input type="text" placeholder="Search by city, neighborhood, or zip..."></div>
<div class="grid">
  <div class="card"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80"><div class="info"><div class="price">$1,250,000</div><div class="details"><span>🛏️ 4 Beds</span><span>🛁 3 Baths</span><span>📐 2,500 sqft</span></div><div class="address">123 Luxury Ln, Beverly Hills</div></div></div>
  <div class="card"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80"><div class="info"><div class="price">$850,000</div><div class="details"><span>🛏️ 3 Beds</span><span>🛁 2 Baths</span><span>📐 1,800 sqft</span></div><div class="address">456 Suburbia Dr, Austin</div></div></div>
</div>
</body></html>`,

  weather: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%); color: #fff; height: 100vh; display: flex; align-items: center; justify-content: center; }
    .app { width: 350px; background: rgba(255,255,255,0.2); backdrop-filter: blur(20px); border-radius: 30px; padding: 40px 20px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .city { font-size: 32px; font-weight: bold; margin: 0; }
    .desc { font-size: 18px; opacity: 0.9; margin: 5px 0 20px; }
    .temp { font-size: 80px; font-weight: 200; margin: 0; }
    .forecast { margin-top: 40px; display: flex; justify-content: space-between; padding: 0 10px; }
    .day { display: flex; flex-direction: column; gap: 10px; font-size: 16px; }
  </style>
</head>
<body>
<div class="app">
  <h1 class="city">New York</h1>
  <p class="desc">Mostly Clear</p>
  <h2 class="temp">72°</h2>
  <div class="forecast">
    <div class="day"><span>Mon</span><span>☀️</span><span>75°</span></div>
    <div class="day"><span>Tue</span><span>⛅</span><span>71°</span></div>
    <div class="day"><span>Wed</span><span>🌧️</span><span>65°</span></div>
    <div class="day"><span>Thu</span><span>☀️</span><span>78°</span></div>
  </div>
</div>
</body></html>`,

  calc: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; margin: 0; background: #121212; height: 100vh; display: flex; justify-content: center; align-items: center; }
    .calc { width: 320px; background: #000; border-radius: 30px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .screen { background: #000; color: #fff; text-align: right; font-size: 60px; font-weight: 300; padding: 20px 10px; word-break: break-all; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .btn { background: #333; color: #fff; border: none; border-radius: 50%; aspect-ratio: 1; font-size: 24px; cursor: pointer; transition: filter 0.1s; }
    .btn:active { filter: brightness(1.5); }
    .op { background: #ff9f0a; }
    .func { background: #a5a5a5; color: #000; }
    .zero { grid-column: span 2; border-radius: 40px; aspect-ratio: auto; text-align: left; padding-left: 30px; }
  </style>
</head>
<body>
<div class="calc">
  <div class="screen" id="res">0</div>
  <div class="grid">
    <button class="btn func" onclick="res.textContent='0'">AC</button>
    <button class="btn func">+/-</button>
    <button class="btn func">%</button>
    <button class="btn op" onclick="res.textContent+='/'">÷</button>
    
    <button class="btn" onclick="add('7')">7</button><button class="btn" onclick="add('8')">8</button><button class="btn" onclick="add('9')">9</button>
    <button class="btn op" onclick="add('*')">×</button>
    
    <button class="btn" onclick="add('4')">4</button><button class="btn" onclick="add('5')">5</button><button class="btn" onclick="add('6')">6</button>
    <button class="btn op" onclick="add('-')">−</button>
    
    <button class="btn" onclick="add('1')">1</button><button class="btn" onclick="add('2')">2</button><button class="btn" onclick="add('3')">3</button>
    <button class="btn op" onclick="add('+')">+</button>
    
    <button class="btn zero" onclick="add('0')">0</button><button class="btn" onclick="add('.')">.</button>
    <button class="btn op" onclick="calc()">=</button>
  </div>
</div>
<script>
  const res = document.getElementById('res');
  function add(v) { if(res.textContent === '0') res.textContent = v; else res.textContent += v; }
  function calc() { try { res.textContent = eval(res.textContent); } catch(e) { res.textContent = 'Error'; } }
</script>
</body></html>`
};

function injectBase(id) {
  if(!window.editor) return;
  var code = BASES[id];
  if(!code) return;
  if(confirm(t('desc'))) {
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('injected'));
  }
}

function renderAssemblerTab() {
  var parent = document.getElementById('left-body');
  if(!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';

  var hdr = document.createElement('div');
  hdr.style = 'padding:12px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#fca5a5;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
  wrap.appendChild(hdr);

  var body = document.createElement('div');
  body.style = 'flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:15px;';

  var desc = document.createElement('div');
  desc.style = 'font-size:11px;color:#94a3b8;line-height:1.5;margin-bottom:5px;';
  desc.textContent = t('desc');
  body.appendChild(desc);

  function createBlock(id, icon, titleKey, descKey) {
    var sec = document.createElement('div');
    sec.style = 'background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);border-radius:8px;padding:12px;';
    var h = document.createElement('div');
    h.style = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
    h.innerHTML = '<span style="font-size:16px;">' + icon + '</span><span style="font-size:12px;font-weight:bold;color:#fecaca;">' + t(titleKey) + '</span>';
    sec.appendChild(h);
    var d = document.createElement('div');
    d.style = 'font-size:10px;color:#94a3b8;margin-bottom:10px;line-height:1.4;';
    d.textContent = t(descKey);
    sec.appendChild(d);
    var btn = document.createElement('button');
    btn.textContent = t('inject');
    btn.style = 'width:100%;background:linear-gradient(135deg,#ef4444,#b91c1c);border:none;border-radius:6px;padding:8px;color:#fff;font-weight:bold;font-size:10px;cursor:pointer;';
    btn.onclick = function() { injectBase(id); };
    sec.appendChild(btn);
    return sec;
  }

  body.appendChild(createBlock('ecom', '🛍️', 'ecom', 'ecomDesc'));
  body.appendChild(createBlock('social', '📱', 'social', 'socialDesc'));
  body.appendChild(createBlock('dash', '📊', 'dash', 'dashDesc'));
  body.appendChild(createBlock('chat', '💬', 'chat', 'chatDesc'));
  body.appendChild(createBlock('music', '🎵', 'music', 'musicDesc'));
  body.appendChild(createBlock('kanban', '📋', 'kanban', 'kanbanDesc'));
  body.appendChild(createBlock('link', '🔗', 'link', 'linkDesc'));
  body.appendChild(createBlock('realestate', '🏠', 'realestate', 'realestateDesc'));
  body.appendChild(createBlock('weather', '⛅', 'weather', 'weatherDesc'));
  body.appendChild(createBlock('calc', '🧮', 'calc', 'calcDesc'));

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(typeof oAL==='function') oAL();
    var el = document.getElementById('lbl-tab-appassembler');
    if(el) el.textContent = t('tab');
    if(window.activeTab==='appassembler') renderAssemblerTab();
  };

  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab==='appassembler') {
      window.activeTab = 'appassembler';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var btn = document.getElementById('tab-appassembler');
      if(btn) btn.classList.add('active');
      renderAssemblerTab();
      return;
    }
    if(typeof oRT==='function') oRT(tab);
  };
});
})();
