(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🌌 COMMUNITY SHOWROOM HUB — MAIN LOGIC
  // ═══════════════════════════════════════════

  const STORAGE_KEY = 'ia_showroom_apps';
  const VOTE_KEY = 'ia_showroom_votes';

  const TX = {
    en: {
      tab: 'Showroom',
      title: '🌌 Community Showroom Hub',
      sub: 'Browse, run, clone, and publish developer creations',
      searchPlaceholder: 'Search creations...',
      all: 'All Categories',
      games: '🕹️ Games',
      shaders: '📺 Shaders & FX',
      apps: '📱 Web Apps',
      music: '🎵 Music & Synth',
      publishBtn: '🚀 Publish Current Code',
      emptyState: 'No creations found. Be the first to publish one!',
      run: '▶️ Run App',
      edit: '🛠️ Clone & Edit',
      author: 'By',
      likes: 'Likes',
      activeCreators: 'Active Creators',
      modalTitle: '🚀 Share Your Creation',
      modalTitleLabel: 'Application Name',
      modalDescLabel: 'Short Description',
      modalAuthorLabel: 'Author Name',
      modalCatLabel: 'Category',
      modalSubmit: 'Publish to Showroom',
      modalCancel: 'Cancel',
      successToast: '🎉 App published to Showroom feed!',
      errorEmpty: 'Please fill in all fields!',
      errorNoCode: 'Monaco editor is empty! Write some code first.',
      upvoteToast: '👍 Upvoted!',
      statsPopular: '🔥 High Rated',
      statsTemplates: '⭐ Templates'
    },
    fr: {
      tab: 'Showroom',
      title: '🌌 Showroom Communautaire',
      sub: 'Explorez, lancez, clonez et publiez des créations',
      searchPlaceholder: 'Rechercher des créations...',
      all: 'Toutes les Catégories',
      games: '🕹️ Jeux',
      shaders: '📺 Shaders & FX',
      apps: '📱 Apps Web',
      music: '🎵 Musique & Synth',
      publishBtn: '🚀 Publier le Code Actuel',
      emptyState: 'Aucune création trouvée. Soyez le premier à publier !',
      run: '▶️ Lancer l\'App',
      edit: '🛠️ Cloner & Éditer',
      author: 'Par',
      likes: 'J\'aimes',
      activeCreators: 'Créateurs Actifs',
      modalTitle: '🚀 Partager votre Création',
      modalTitleLabel: 'Nom de l\'Application',
      modalDescLabel: 'Brève Description',
      modalAuthorLabel: 'Nom de l\'Auteur',
      modalCatLabel: 'Catégorie',
      modalSubmit: 'Publier sur le Showroom',
      modalCancel: 'Annuler',
      successToast: '🎉 App publiée sur le Showroom !',
      errorEmpty: 'Veuillez remplir tous les champs !',
      errorNoCode: 'L\'éditeur Monaco est vide ! Écrivez du code d\'abord.',
      upvoteToast: '👍 J\'aime ajouté !',
      statsPopular: '🔥 Mieux Notés',
      statsTemplates: '⭐ Modèles'
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return TX[lang] && TX[lang][key] ? TX[lang][key] : (TX['en'][key] || key);
  }

  // ─── Default Showcase Applications ───────────────────────────
  const DEFAULT_SHOWROOM_APPS = [
    {
      id: 'def_brick_breaker',
      title: '🕹️ Neon Brick Breaker Game',
      desc: 'An interactive neon arcade game with smooth mouse controls, particles, and scoring.',
      category: 'games',
      author: 'AlexDev',
      likes: 42,
      code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Neon Brick Breaker</title>
  <style>
    body { margin: 0; background: #070913; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    canvas { background: #0e1124; border: 3px solid #10b981; border-radius: 12px; box-shadow: 0 0 25px rgba(16,185,129,0.3); display: block; max-width: 100%; aspect-ratio: 4/3; }
    h3 { margin: 0 0 10px; color: #10b981; text-shadow: 0 0 8px rgba(16,185,129,0.4); }
  </style>
</head>
<body>
  <h3>🕹️ NEON BRICK BREAKER</h3>
  <canvas id="gameCanvas" width="480" height="320"></canvas>
  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    let x = canvas.width / 2, y = canvas.height - 30;
    let dx = 3, dy = -3;
    const ballRadius = 8;
    const paddleHeight = 10, paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let score = 0;
    
    const brickRowCount = 3, brickColumnCount = 5;
    const brickWidth = 75, brickHeight = 20, brickPadding = 10;
    const brickOffsetTop = 30, brickOffsetLeft = 30;
    
    let bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    
    document.addEventListener("mousemove", e => {
      const r = canvas.getBoundingClientRect();
      paddleX = e.clientX - r.left - paddleWidth / 2;
      if (paddleX < 0) paddleX = 0;
      if (paddleX > canvas.width - paddleWidth) paddleX = canvas.width - paddleWidth;
    });

    function collisionDetection() {
      for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
          let b = bricks[c][r];
          if(b.status === 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
              dy = -dy;
              b.status = 0;
              score += 10;
              if(score === brickRowCount * brickColumnCount * 10) {
                alert("CONGRATULATIONS, YOU WIN!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw Bricks
      for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status === 1) {
            let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.fillStyle = "#3b82f6";
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          }
        }
      }
      // Draw Ball
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.closePath();
      // Draw Paddle
      ctx.fillStyle = "#eab308";
      ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      
      collisionDetection();
      
      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) dx = -dx;
      if(y + dy < ballRadius) dy = -dy;
      else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) dy = -dy;
        else {
          score = 0;
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 3;
          dy = -3;
        }
      }
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
    },
    {
      id: 'def_matrix_rain',
      title: '📺 CRT Matrix Rain Scanner',
      desc: 'Digital rain effect with authentic CRT curvature and scanline overlay shaders.',
      category: 'shaders',
      author: 'CyberCoder',
      likes: 35,
      code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CRT Matrix Rain</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 100vh; }
    canvas { display: block; position: absolute; top: 0; left: 0; }
    /* CRT Effects */
    .crt::after {
      content: " ";
      display: block;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 4px, 6px 100%;
      z-index: 2;
      pointer-events: none;
    }
  </style>
</head>
<body class="crt">
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById("c");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+";
    const alphabet = matrix.split("");
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    for(let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
    
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      
      for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }
    
    setInterval(draw, 30);
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>`
    },
    {
      id: 'def_chiptune_synth',
      title: '🎵 Chiptune Rhythm Generator',
      desc: 'Interactive step grid matrix synthesizing retro chiptune sounds procedurally.',
      category: 'music',
      author: '8BitSymphony',
      likes: 29,
      code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Chiptune Beat Generator</title>
  <style>
    body { background: #0b0f19; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(8, 40px); gap: 6px; margin: 20px; }
    .cell { width: 40px; height: 40px; background: #1e293b; border-radius: 6px; border: 1px solid #334155; cursor: pointer; transition: 0.1s; }
    .cell.active { background: #eab308; box-shadow: 0 0 10px #eab308; }
    .btn { background: #eab308; border: none; padding: 10px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; color: #000; }
  </style>
</head>
<body>
  <h2>🎵 CHIPTUNE DRUM STEPPERS</h2>
  <div class="grid" id="seq"></div>
  <button class="btn" id="playBtn" onclick="toggle()">▶️ Play Loop</button>
  
  <script>
    const seq = document.getElementById("seq");
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    const cells = [];
    let isPlaying = false;
    let currentStep = 0;
    let timer = null;
    let audioCtx = null;
    
    for(let r=0; r<8; r++) {
      for(let c=0; c<8; c++) {
        const div = document.createElement("div");
        div.className = "cell";
        div.onclick = () => div.classList.toggle("active");
        seq.appendChild(div);
        cells.push(div);
      }
    }
    
    function playStep() {
      if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      for(let r=0; r<8; r++) {
        const cell = cells[r * 8 + currentStep];
        if(cell.classList.contains("active")) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(notes[7 - r], audioCtx.currentTime);
          
          gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
          
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.2);
        }
      }
      currentStep = (currentStep + 1) % 8;
    }
    
    function toggle() {
      if(isPlaying) {
        clearInterval(timer);
        document.getElementById("playBtn").innerText = "▶️ Play Loop";
      } else {
        timer = setInterval(playStep, 250);
        document.getElementById("playBtn").innerText = "⏹️ Stop";
      }
      isPlaying = !isPlaying;
    }
  </script>
</body>
</html>`
    },
    {
      id: 'def_neumorphic_calc',
      title: '📱 Glassmorphism Habit Counter',
      desc: 'Elegant habit streak tracking board using premium glassmorphism styling parameters.',
      category: 'apps',
      author: 'UIDesigner',
      likes: 18,
      code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Neumorphic Habit Counter</title>
  <style>
    body { background: #0f172a; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #fff; }
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.5);
      width: 250px;
    }
    h2 { margin-top: 0; color: #38bdf8; font-size: 18px; }
    .counter { font-size: 48px; font-weight: 800; margin: 20px 0; color: #38bdf8; text-shadow: 0 0 10px rgba(56, 189, 248, 0.5); }
    .btn {
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      border: none; color: #000; font-weight: bold;
      padding: 10px 20px; border-radius: 10px; cursor: pointer; width: 100%; transition: all 0.2s;
    }
    .btn:active { transform: scale(0.97); }
  </style>
</head>
<body>
  <div class="glass-card">
    <h2>🔥 Habit Streak</h2>
    <div class="counter" id="countVal">0</div>
    <button class="btn" onclick="increment()">Count Day</button>
  </div>
  <script>
    let c = 0;
    function increment() {
      c++;
      document.getElementById('countVal').innerText = c;
    }
  </script>
</body>
</html>`
    }
  ];

  // ─── Local Database Methods ──────────────────────────────────
  function getShowroomApps() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Set defaults if first load
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SHOWROOM_APPS));
        return DEFAULT_SHOWROOM_APPS;
      }
      return JSON.parse(stored);
    } catch(e) {
      return DEFAULT_SHOWROOM_APPS;
    }
  }

  function saveApp(app) {
    const list = getShowroomApps();
    list.unshift(app);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getUpvotedList() {
    try {
      return JSON.parse(localStorage.getItem(VOTE_KEY) || '[]');
    } catch(e) {
      return [];
    }
  }

  function toggleVote(appId) {
    const list = getUpvotedList();
    const idx = list.indexOf(appId);
    const apps = getShowroomApps();
    const app = apps.find(a => a.id === appId);
    if (!app) return false;

    if (idx === -1) {
      // Add vote
      list.push(appId);
      app.likes = (app.likes || 0) + 1;
      localStorage.setItem(VOTE_KEY, JSON.stringify(list));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      return true;
    } else {
      // Remove vote
      list.splice(idx, 1);
      app.likes = Math.max(0, (app.likes || 0) - 1);
      localStorage.setItem(VOTE_KEY, JSON.stringify(list));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      return false;
    }
  }

  // ─── Render View Component ───────────────────────────────────
  let activeFilter = 'all';
  let searchQuery = '';

  function renderShowroomTab() {
    const parent = document.getElementById('left-body');
    if (!parent) return;

    parent.innerHTML = '';
    const apps = getShowroomApps();
    const upvoted = getUpvotedList();

    // Filtering logic
    const filteredApps = apps.filter(app => {
      const matchesFilter = activeFilter === 'all' || app.category === activeFilter;
      const matchesSearch = searchQuery === '' || 
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const wrap = document.createElement('div');
    wrap.style = 'display:flex; flex-direction:column; height:100%; overflow:hidden; background:#05070c; font-family:\'Inter\', sans-serif; box-sizing:border-box;';

    // Header Panel
    const hdr = document.createElement('div');
    hdr.style = 'padding:14px; border-bottom:1px solid rgba(16, 185, 129, 0.2); background:linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(0,0,0,0) 100%); flex-shrink:0;';
    hdr.innerHTML = `
      <style>
        #showroomTabsRow::-webkit-scrollbar { display: none; }
      </style>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="margin:0; font-size:14px; font-weight:900; color:#10b981; text-shadow:0 0 10px rgba(16, 185, 129, 0.35);">${t('title')}</h2>
          <p style="margin:2px 0 0; font-size:10px; color:#64748b;">${t('sub')}</p>
        </div>
      </div>
    `;
    wrap.appendChild(hdr);

    // Controls Row (Vertical layout for narrow sidebar)
    const controls = document.createElement('div');
    controls.style = 'padding:10px 14px; display:flex; flex-direction:column; gap:8px; border-bottom:1px solid #1e293b; background:#070912; flex-shrink:0;';
    
    // Search + Publish Row
    const searchRow = document.createElement('div');
    searchRow.style = 'display:flex; flex-direction:column; gap:6px; width:100%;';
    searchRow.innerHTML = `
      <input type="text" id="showroomSearch" placeholder="${t('searchPlaceholder')}" value="${searchQuery}" style="width:100%; box-sizing:border-box; background:#0f172a; border:1px solid #334155; color:#fff; font-size:11px; padding:8px 12px; border-radius:8px; outline:none; transition:all 0.2s;" />
      <button id="showroomPublishBtn" style="width:100%; box-sizing:border-box; background:linear-gradient(135deg, #10b981, #06b6d4); color:#000; border:none; padding:8px 10px; border-radius:8px; font-size:11px; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; box-shadow:0 0 15px rgba(16, 185, 129, 0.2); transition:transform 0.2s;">
        ${t('publishBtn')}
      </button>
    `;
    controls.appendChild(searchRow);

    // Category Tabs Row
    const tabsRow = document.createElement('div');
    tabsRow.id = 'showroomTabsRow';
    tabsRow.style = 'display:flex; gap:6px; overflow-x:auto; width:100%; padding-bottom:2px; scrollbar-width:none; -ms-overflow-style:none;';
    
    const categories = ['all', 'games', 'shaders', 'apps', 'music'];
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.style = `
        background: ${activeFilter === cat ? 'rgba(16, 185, 129, 0.15)' : '#0f172a'};
        border: 1px solid ${activeFilter === cat ? '#10b981' : '#1e293b'};
        color: ${activeFilter === cat ? '#10b981' : '#94a3b8'};
        padding: 5px 10px; font-size: 10px; font-weight: 800; border-radius: 6px; cursor: pointer; white-space: nowrap; transition: all 0.2s;
      `;
      btn.textContent = cat === 'all' ? t('all') : t(cat);
      btn.onclick = () => {
        activeFilter = cat;
        renderShowroomTab();
      };
      tabsRow.appendChild(btn);
    });
    controls.appendChild(tabsRow);
    wrap.appendChild(controls);

    // Stats bar overview
    const statsBar = document.createElement('div');
    statsBar.style = 'padding:6px 14px; background:#020204; border-bottom:1px solid #111; display:flex; gap:15px; font-size:9px; color:#64748b; font-weight:700; flex-shrink:0;';
    statsBar.innerHTML = `
      <span>⭐ ${apps.length} ${t('statsTemplates')}</span>
      <span>${t('statsPopular')}: ${apps.filter(a => a.likes > 25).length}</span>
    `;
    wrap.appendChild(statsBar);

    // Feed Area
    const feed = document.createElement('div');
    feed.style = 'flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:12px;';

    if (filteredApps.length === 0) {
      const empty = document.createElement('div');
      empty.style = 'padding:40px 20px; text-align:center; color:#475569; font-size:11px;';
      empty.innerHTML = `
        <div style="font-size:32px; margin-bottom:10px;">🌌</div>
        <div>${t('emptyState')}</div>
      `;
      feed.appendChild(empty);
    } else {
      filteredApps.forEach(app => {
        const card = document.createElement('div');
        const isUpvoted = upvoted.includes(app.id);
        
        card.style = `
          background: rgba(15, 23, 42, 0.45);
          border: 1px solid ${isUpvoted ? 'rgba(16, 185, 129, 0.35)' : 'rgba(30, 41, 59, 0.5)'};
          border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; transition: all 0.2s;
          box-shadow: ${isUpvoted ? '0 0 15px rgba(16, 185, 129, 0.05)' : 'none'};
        `;
        
        // Render Category Tag without emoji to save horizontal space inside the small card
        const catCleanLabel = t(app.category).split(' ').slice(1).join(' ') || app.category;
        
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:4px;">
            <div style="flex:1; min-width:0;">
              <h4 style="margin:0; font-size:11px; font-weight:800; color:#f8fafc; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${app.title}">${app.title}</h4>
              <div style="font-size:8.5px; color:#64748b; margin-top:2px;">
                ${t('author')}: <span style="color:#10b981; font-weight:700;">${app.author}</span>
              </div>
            </div>
            
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0;">
              <span style="font-size:8px; background:rgba(30,41,59,0.7); border:1px solid #334155; color:#94a3b8; padding:2px 4px; border-radius:4px; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px;">
                ${catCleanLabel}
              </span>
              <button class="like-btn" data-id="${app.id}" style="background:none; border:none; padding:0; display:flex; align-items:center; gap:3px; color:${isUpvoted ? '#10b981' : '#64748b'}; font-weight:bold; font-size:9.5px; cursor:pointer; transition:transform 0.1s;">
                <span>${isUpvoted ? '❤️' : '🤍'}</span>
                <span>${app.likes || 0}</span>
              </button>
            </div>
          </div>

          <p style="margin:2px 0 6px; font-size:10px; color:#94a3b8; line-height:1.4; word-wrap:break-word;">${app.desc}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:4px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.05);">
            <button class="run-btn" data-id="${app.id}" style="width:100%; background:#10b981; color:#000; border:none; padding:6px; border-radius:6px; font-size:9.5px; font-weight:800; cursor:pointer; transition:opacity 0.2s; text-align:center;">
              ${t('run')}
            </button>
            <button class="clone-btn" data-id="${app.id}" style="width:100%; background:#0f172a; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:9.5px; font-weight:800; cursor:pointer; transition:background 0.2s; text-align:center;">
              ${t('edit')}
            </button>
          </div>
        `;
        feed.appendChild(card);
      });
    }
    wrap.appendChild(feed);
    parent.appendChild(wrap);

    // Attach search events
    const sInput = document.getElementById('showroomSearch');
    if (sInput) {
      sInput.oninput = (e) => {
        searchQuery = e.target.value;
        // Debounce or immediate re-render (since layout is lightweight, immediate is fine)
        renderShowroomTab();
        // Keep focus
        document.getElementById('showroomSearch').focus();
      };
    }

    // Attach publish trigger
    const pBtn = document.getElementById('showroomPublishBtn');
    if (pBtn) pBtn.onclick = openPublishModal;

    // Attach feed card actions
    document.querySelectorAll('.run-btn').forEach(btn => {
      btn.onclick = () => {
        const app = apps.find(a => a.id === btn.getAttribute('data-id'));
        if (app && window.editor) {
          // Temporarily set value and run preview, without overriding current active buffer if cloning is not clicked
          // Or we can save current code locally, let them test, or clone. 
          // Best practice is to set value so preview plays it, but we notify user.
          window.editor.setValue(app.code);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast(`Previewing: ${app.title}`);
        }
      };
    });

    document.querySelectorAll('.clone-btn').forEach(btn => {
      btn.onclick = () => {
        const app = apps.find(a => a.id === btn.getAttribute('data-id'));
        if (app && window.editor) {
          window.editor.setValue(app.code);
          if (window.runPreview) window.runPreview();
          if (window.showToast) window.showToast(`Cloned to editor!`);
          // Unlock Badge if present
          if (window.unlockAchievement) window.unlockAchievement('first_gen');
        }
      };
    });

    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.onclick = () => {
        const appId = btn.getAttribute('data-id');
        const added = toggleVote(appId);
        if (added && window.showToast) {
          window.showToast(t('upvoteToast'));
        }
        renderShowroomTab();
      };
    });
  }

  // ─── Modal Publish Window ────────────────────────────────────
  function openPublishModal() {
    // Validate that editor has some code to publish
    if (!window.editor || !window.editor.getValue().trim()) {
      if (window.showToast) window.showToast(t('errorNoCode'));
      return;
    }

    // Check if modal already exists, remove it
    const existing = document.getElementById('showroomPublishModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'showroomPublishModal';
    modal.style = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); backdrop-filter:blur(5px); z-index:999999; display:flex; align-items:center; justify-content:center; box-sizing:border-box; padding:15px;';
    
    modal.innerHTML = `
      <div style="background:#0c0f1d; border:1px solid rgba(16, 185, 129, 0.3); border-radius:16px; padding:20px; width:100%; max-width:380px; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2); box-sizing:border-box; color:#fff;">
        <h3 style="margin:0 0 15px; font-size:14px; font-weight:800; color:#10b981; display:flex; align-items:center; gap:6px;">
          ${t('modalTitle')}
        </h3>
        
        <div style="display:flex; flex-direction:column; gap:12px; font-size:11px;">
          <!-- Title -->
          <div style="display:flex; flex-direction:column; gap:4px;">
            <label style="color:#94a3b8; font-weight:600;">${t('modalTitleLabel')}</label>
            <input type="text" id="mPubTitle" placeholder="e.g. My Flappy Bird Clone" style="background:#0f172a; border:1px solid #334155; color:#fff; padding:8px; border-radius:6px; outline:none; font-size:11px;" />
          </div>

          <!-- Description -->
          <div style="display:flex; flex-direction:column; gap:4px;">
            <label style="color:#94a3b8; font-weight:600;">${t('modalDescLabel')}</label>
            <textarea id="mPubDesc" placeholder="Describe how your app works..." style="background:#0f172a; border:1px solid #334155; color:#fff; padding:8px; border-radius:6px; outline:none; height:60px; font-size:11px; resize:none; font-family:sans-serif;"></textarea>
          </div>

          <!-- Author -->
          <div style="display:flex; flex-direction:column; gap:4px;">
            <label style="color:#94a3b8; font-weight:600;">${t('modalAuthorLabel')}</label>
            <input type="text" id="mPubAuthor" placeholder="e.g. DeveloperX" style="background:#0f172a; border:1px solid #334155; color:#fff; padding:8px; border-radius:6px; outline:none; font-size:11px;" />
          </div>

          <!-- Category Selector -->
          <div style="display:flex; flex-direction:column; gap:4px;">
            <label style="color:#94a3b8; font-weight:600;">${t('modalCatLabel')}</label>
            <select id="mPubCat" style="background:#0f172a; border:1px solid #334155; color:#fff; padding:8px; border-radius:6px; outline:none; font-size:11px; font-weight:bold;">
              <option value="games">${t('games')}</option>
              <option value="shaders">${t('shaders')}</option>
              <option value="apps">${t('apps')}</option>
              <option value="music">${t('music')}</option>
            </select>
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-top:20px; justify-content:flex-end;">
          <button id="mPubCancel" style="background:none; border:1px solid #334155; color:#94a3b8; padding:8px 14px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:bold;">
            ${t('modalCancel')}
          </button>
          <button id="mPubSubmit" style="background:linear-gradient(135deg, #10b981, #06b6d4); color:#000; border:none; padding:8px 14px; border-radius:6px; font-size:11px; cursor:pointer; font-weight:800;">
            ${t('modalSubmit')}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('mPubCancel').onclick = () => modal.remove();

    document.getElementById('mPubSubmit').onclick = () => {
      const title = document.getElementById('mPubTitle').value.trim();
      const desc = document.getElementById('mPubDesc').value.trim();
      const author = document.getElementById('mPubAuthor').value.trim();
      const category = document.getElementById('mPubCat').value;

      if (!title || !desc || !author) {
        if (window.showToast) window.showToast(t('errorEmpty'));
        return;
      }

      // Add to showroom local database list
      const newApp = {
        id: 'user_' + Date.now(),
        title: title,
        desc: desc,
        category: category,
        author: author,
        likes: 0,
        code: window.editor.getValue()
      };

      saveApp(newApp);
      modal.remove();

      if (window.showToast) window.showToast(t('successToast'));
      renderShowroomTab();
      
      // Unlock badge exporter since they shared/published their app
      if (window.unlockAchievement) window.unlockAchievement('export_app');
    };
  }

  // ─── Tab & Languages Integration Hooks ────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    const originalApplyLang = window.applyLang;
    window.applyLang = function() {
      if (typeof originalApplyLang === 'function') originalApplyLang();
      
      const currentLang = gl();
      const sideLbl = document.getElementById('lbl-tab-showroom');
      if (sideLbl) {
        sideLbl.textContent = t('tab');
      }
      const topLbl = document.getElementById('lbl-top-showroom');
      if (topLbl) {
        topLbl.textContent = t('tab');
      }
      if (window.activeTab === 'showroom') renderShowroomTab();
    };

    const originalRenderTab = window.renderTab;
    window.renderTab = function(tab) {
      if (tab === 'showroom') {
        window.activeTab = 'showroom';
        document.querySelectorAll('.ltab').forEach(function(b) {
          b.classList.remove('active');
        });
        const btn = document.getElementById('tab-showroom');
        if (btn) btn.classList.add('active');
        
        // Update topbar active class
        const topShowroom = document.getElementById('topbar-showroom');
        const topCollab = document.getElementById('topbar-collab');
        if (topShowroom) topShowroom.classList.add('active');
        if (topCollab) topCollab.classList.remove('active');
        
        renderShowroomTab();
        return;
      } else {
        // Remove active class from topbar Showroom button if switching to another tab
        const topShowroom = document.getElementById('topbar-showroom');
        if (topShowroom) topShowroom.classList.remove('active');
      }
      if (typeof originalRenderTab === 'function') {
        originalRenderTab(tab);
      }
    };

    // Attach topbar click listener
    const topBtn = document.getElementById('topbar-showroom');
    if (topBtn) {
      topBtn.onclick = function() {
        const p = document.getElementById('left-panel');
        if (p && p.classList.contains('collapsed')) {
          const toggleL = document.getElementById('toggle-left');
          if (toggleL) toggleL.click();
        }
        if (window.renderTab) window.renderTab('showroom');
      };
    }
  });
})();
