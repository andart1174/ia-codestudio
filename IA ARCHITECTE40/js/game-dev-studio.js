(function() {
  'use strict';

  // Include game logic
  window._gdsGetGameCode = function(type, title) { return getGameCode(type, title); };
  function getGameCode(type, title) {
    var t = type.toLowerCase();
    
    if (t.includes('snake')) {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #10b981; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | Score: <span id="score">0</span></div>
<canvas id="gameCanvas" width="400" height="400"></canvas>
  \${is3D ? '<div style="position:absolute; top:50%; left:50%; width:8px; height:8px; background:white; transform:translate(-50%,-50%); border-radius:50%; pointer-events:none; border:2px solid black;"></div>' : ''}
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let grid = 20, count = 0, score = 0;
  let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
  let apple = { x: 320, y: 320 };

  function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

  function loop() {
    requestAnimationFrame(loop);
    if (++count < 6) return;
    count = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx; snake.y += snake.dy;
    if (snake.x < 0) snake.x = canvas.width - grid; else if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = canvas.height - grid; else if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    ctx.fillStyle = '#10b981';
    snake.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++; score += 10;
        document.getElementById('score').innerText = score;
        apple.x = getRandomInt(0, 20) * grid; apple.y = getRandomInt(0, 20) * grid;
      }
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160; snake.y = 160; snake.cells = []; snake.maxCells = 4; snake.dx = grid; snake.dy = 0; score = 0;
          document.getElementById('score').innerText = score;
        }
      }
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.which === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    else if (e.which === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
    else if (e.which === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    else if (e.which === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
  });
  requestAnimationFrame(loop);
<\/script>
</body>
</html>`;
    }
    
    if (t.includes('pong')) {
      return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #3b82f6; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | <span id="score">0 - 0</span></div>
<canvas id="gameCanvas" width="800" height="500"></canvas>
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  const paddleWidth = 10, paddleHeight = 100;
  const player = { x: 20, y: canvas.height/2 - 50, w: paddleWidth, h: paddleHeight, dy: 0, score: 0 };
  const ai = { x: canvas.width - 30, y: canvas.height/2 - 50, w: paddleWidth, h: paddleHeight, dy: 4, score: 0 };
  const ball = { x: canvas.width/2, y: canvas.height/2, r: 8, dx: 5, dy: 5 };

  function drawRect(x, y, w, h, color) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }
  function drawCircle(x, y, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill(); }
  function resetBall() { ball.x = canvas.width/2; ball.y = canvas.height/2; ball.dx *= -1; }

  function update() {
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;

    // AI logic
    if (ai.y + ai.h/2 < ball.y) ai.y += ai.dy; else ai.y -= ai.dy;
    if (ai.y < 0) ai.y = 0; if (ai.y + ai.h > canvas.height) ai.y = canvas.height - ai.h;

    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.dy *= -1;

    let p = (ball.x < canvas.width/2) ? player : ai;
    if (ball.x - ball.r < p.x + p.w && ball.x + ball.r > p.x && ball.y > p.y && ball.y < p.y + p.h) {
      ball.dx *= -1.1; // speed up
    }

    if (ball.x - ball.r < 0) { ai.score++; document.getElementById('score').innerText = player.score + " - " + ai.score; resetBall(); }
    else if (ball.x + ball.r > canvas.width) { player.score++; document.getElementById('score').innerText = player.score + " - " + ai.score; resetBall(); }
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawRect(player.x, player.y, player.w, player.h, '#fff');
    drawRect(ai.x, ai.y, ai.w, ai.h, '#fff');
    drawCircle(ball.x, ball.y, ball.r, '#3b82f6');
    for(let i=0; i<canvas.height; i+=30) drawRect(canvas.width/2 - 1, i, 2, 15, '#fff'); // net
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener('keydown', e => { if(e.key === 'ArrowUp') player.dy = -8; else if(e.key === 'ArrowDown') player.dy = 8; });
  window.addEventListener('keyup', e => { player.dy = 0; });

  loop();
<\/script>
</body>
</html>`;
    }

    // Default: Platformer (Flappy)
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; font-family:sans-serif;}
  canvas { background:#0f172a; border:4px solid #f472b6; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5); }
  .ui { position:absolute; top:20px; color:white; font-size:24px; font-weight:bold; }
</style>
</head>
<body>
<div class="ui">${title} | Score: <span id="score">0</span></div>
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let score = 0, frameCount = 0, isGameOver = false;

  const player = { x: 100, y: 300, width: 40, height: 40, dy: 0, gravity: 0.5, jumpPower: -10, color: '#f43f5e' };
  const obstacles = [];

  window.addEventListener('keydown', (e) => { if (e.code === 'Space') { player.dy = player.jumpPower; if(isGameOver) reset(); }});
  window.addEventListener('touchstart', (e) => { player.dy = player.jumpPower; if(isGameOver) reset(); });

  function reset() { player.y = 300; player.dy = 0; obstacles.length = 0; score = 0; frameCount = 0; isGameOver = false; document.getElementById('score').innerText = score; loop(); }

  function handleObstacles() {
    if (frameCount % 90 === 0) { let h = Math.random() * 200 + 50; obstacles.push({ x: canvas.width, y: canvas.height - h, width: 50, height: h }); }
    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i]; obs.x -= 5;
      ctx.fillStyle = '#10b981'; ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      if (player.x < obs.x + obs.width && player.x + player.width > obs.x && player.y < obs.y + obs.height && player.y + player.height > obs.y) isGameOver = true;
    }
    if (obstacles.length > 0 && obstacles[0].x < -50) { obstacles.shift(); score += 10; document.getElementById('score').innerText = score; }
  }

  function loop() {
    if (isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = 'white'; ctx.font = '40px sans-serif'; ctx.fillText('GAME OVER', canvas.width/2 - 120, canvas.height/2);
      ctx.font = '20px sans-serif'; ctx.fillText('Press SPACE to Restart', canvas.width/2 - 110, canvas.height/2 + 40);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.dy += player.gravity; player.y += player.dy;
    if (player.y + player.height > canvas.height) { player.y = canvas.height - player.height; player.dy = 0; }
    
    ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height);
    handleObstacles();
    frameCount++; requestAnimationFrame(loop);
  }
  loop();
<\/script>
</body>
</html>`;
  }

  var oRT=window.renderTab; window.renderTab=function(tab){if(tab==='gamedevstudio'){window.activeTab='gamedevstudio';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-gamedevstudio');if(btn)btn.classList.add('active');window.initGameDevStudio(window.appLang||'en');return;}if(typeof oRT==='function')oRT(tab);};
  window.initGameDevStudio = function(lang) {
    var el = document.getElementById('left-body');
    if (!el) return;
    
    var text = {
      en: { title: 'Game Dev Studio', sub: '10 professional game creation tools' },
      fr: { title: 'Studio Jeux', sub: '10 outils professionnels de création' }
    };
    var t = text[lang] || text.en;
    
    el.innerHTML = `
      <div style="padding:10px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;">
        <div style="background:linear-gradient(135deg,#1a0a2e,#16213e);border-radius:12px;padding:12px;border:1px solid rgba(244,63,94,0.3);margin-bottom:10px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:28px">🎮</span>
          <div>
            <h2 style="margin:0;color:#f43f5e;font-size:16px;font-weight:800">${t.title}</h2>
            <p style="margin:0;color:#94a3b8;font-size:11px">${t.sub}</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;">
          ${getTools(lang).map(tool => `
            <div onclick="window.handleGDSTool('${tool.id}', '${lang}')" style="background:rgba(30,20,50,0.8);border:1px solid ${tool.color}44;border-radius:10px;padding:10px;cursor:pointer;transition:all 0.2s;min-width:0;" onmouseover="this.style.borderColor='${tool.color}'" onmouseout="this.style.borderColor='${tool.color}44'">
              <div style="font-size:22px;margin-bottom:4px">${tool.icon}</div>
              <div style="color:${tool.color};font-weight:700;font-size:11px;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tool.name}</div>
              <div style="color:#64748b;font-size:10px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${tool.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  function getTools(lang) {
    var fr = lang === 'fr';
    return [
      {id:'mapbuilder', icon:'🗺️', name:fr?'Éditeur de Niveaux':'Map Builder', desc:fr?'Créer des niveaux visuellement':'Build game levels visually', color:'#06b6d4'},
      {id:'logicfsm', icon:'🧩', name:fr?'Designer Logique':'Logic Designer', desc:fr?'Machines à états finis':'Finite state machines', color:'#8b5cf6'},
      {id:'rpgforge', icon:'⚔️', name:fr?'Forge RPG':'RPG Forge', desc:fr?'Personnages et stats':'Characters & stats', color:'#f59e0b'},
      {id:'audiocomp', icon:'🎵', name:fr?'Compositeur Audio':'Audio Composer', desc:fr?'Sons 8-bit procéduraux':'Procedural 8-bit SFX', color:'#10b981'},
      {id:'spritestudio', icon:'🎨', name:fr?'Studio Pixel Art':'Sprite Studio', desc:fr?'Éditeur pixel art':'Pixel art editor', color:'#f43f5e'},
      {id:'multiarch', icon:'🌐', name:fr?'Archi Multijoueur':'Multiplayer Arch', desc:fr?'WebSocket/WebRTC':'WebSocket/WebRTC code', color:'#3b82f6'},
      {id:'mathkit', icon:'🔢', name:fr?'Boîte Math':'Math Toolkit', desc:fr?'Physique & vecteurs':'Physics & vectors', color:'#ec4899'},
      {id:'leaderboard', icon:'🏆', name:fr?'Classement':'Leaderboard', desc:fr?'Scores & badges':'Scores & achievements', color:'#f59e0b'},
      {id:'assetlib', icon:'📦', name:fr?'Bibliothèque Assets':'Asset Library', desc:fr?'Sprites & sons prêts':'Ready sprites & sounds', color:'#34d399'},
      {id:'architect', icon:'👑', name:fr?'Auto Arhitect':'Auto Architect', desc:fr?'Jeu complet 1-clic':'1-click full game', color:'#fbbf24'},
      {id:'publisher', icon:'🚀', name:fr?'Publier Jeu':'Game Publisher', desc:fr?'Export HTML/PWA':'Export as HTML/PWA', color:'#a78bfa'}
    ];
  }

  window.handleGDSTool = function(id, lang) {
    var e = document.getElementById('left-body');
    if (!e) return;
    
    var code = '';
    if (id === 'mapbuilder') code = getMapBuilderUI(lang);
    else if (id === 'spritestudio') code = getSpriteUI(lang);
    else if (id === 'rpgforge') code = getRPGUI(lang);
    else if (id === 'leaderboard') code = getLeaderboardUI(lang);
    else if (id === 'architect') code = getArchitectUI(lang);
    else if (id === 'publisher') code = getPublisherUI(lang);
    else if (id === 'logicfsm') code = getLogicUI(lang);
    else if (id === 'audiocomp') code = getAudioUI(lang);
    else if (id === 'multiarch') code = getMultiplayerUI(lang);
    else if (id === 'mathkit') code = getMathUI(lang);
    else if (id === 'assetlib') code = getAssetUI(lang);
    else code = getGenericTool(id, lang);
    
    e.innerHTML = code;
  };

  function getMapBuilderUI(lang) {
    var fr = lang === 'fr';
    var grid = [];
    for(var i=0; i<100; i++) {
      grid.push(`<td id="cell${i}" onclick="toggleCell(${i})" style="width:32px;height:32px;background:#0f172a;border:1px solid #1e293b;cursor:pointer"></td>`);
    }
    var rows = '';
    for(var r=0; r<10; r++) rows += '<tr>' + grid.slice(r*10, (r+1)*10).join('') + '</tr>';
    
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#06b6d4;margin-bottom:12px">🗺️ ${fr?'Éditeur de Niveaux':'Map Builder'}</h3>
        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
          <button onclick="window._gCell=1" style="background:#10b981;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;color:white">🟩 ${fr?'Mur':'Wall'}</button>
          <button onclick="window._gCell=2" style="background:#3b82f6;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;color:white">💧 ${fr?'Eau':'Water'}</button>
          <button onclick="window._gCell=3" style="background:#f59e0b;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;color:white">⭐ ${fr?'Bonus':'Item'}</button>
          <button onclick="window._gCell=0" style="background:#334155;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;color:white">🗑️ ${fr?'Effacer':'Erase'}</button>
        </div>
        <table style="border-collapse:collapse;margin-bottom:12px">${rows}</table>
        <div style="display:flex;margin-top:8px"><button onclick="exportMap(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="exportMap(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
        <pre id="map-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:11px;margin-top:8px;max-height:100px;overflow:auto"></pre>
      </div>
      <script>
        window._gCell=1;
        window._gMap=new Array(100).fill(0);
        function toggleCell(i){
          var c=["#0f172a","#10b981","#3b82f6","#f59e0b"];
          window._gMap[i]=window._gCell;
          document.getElementById("cell"+i).style.background=c[window._gCell];
        }
        function exportMap(){
          var m=[];
          for(var r=0;r<10;r++)m.push(window._gMap.slice(r*10,(r+1)*10).join(","));
          var code="const MAP = [\\n  "+m.map(r=>"["+r+"]").join(",\\n  ")+"\\n];";
          document.getElementById("map-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getSpriteUI(lang) {
    var fr = lang === 'fr';
    var cells = '';
    for(var i=0; i<64; i++) {
      cells += `<td id="px${i}" onclick="paintPx(${i})" style="width:20px;height:20px;background:#0f172a;border:1px solid #1e293b;cursor:crosshair"></td>`;
    }
    var rows = '';
    for(var r=0; r<8; r++) rows += '<tr>' + cells.split('</td>').slice(r*8, (r+1)*8).join('</td>') + '</td></tr>';
    
    var colors = ['#f43f5e','#f97316','#eab308','#22c55e','#06b6d4','#6366f1','#ec4899','#ffffff','#000000'];
    
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#f43f5e;margin-bottom:12px">🎨 ${fr?'Studio Pixel Art':'Sprite Studio'}</h3>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${colors.map(c => `<div onclick="window._pColor='${c}'" style="width:24px;height:24px;background:${c};border-radius:4px;cursor:pointer;border:2px solid transparent" onmouseover="this.style.borderColor='white'" onmouseout="this.style.borderColor='transparent'"></div>`).join('')}
          <div onclick="window._pColor='#0f172a'" style="width:24px;height:24px;background:#0f172a;border-radius:4px;cursor:pointer;border:2px solid #334155;display:flex;align-items:center;justify-content:center;font-size:12px">🗑️</div>
        </div>
        <table style="border-collapse:collapse;margin-bottom:16px;background:#0f172a">${rows}</table>
        <div style="display:flex;margin-top:8px"><button onclick="exportSprite(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="exportSprite(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
        <pre id="spr-out" style="background:#0f172a;color:#f472b6;padding:8px;border-radius:6px;font-size:11px;margin-top:8px;max-height:100px;overflow:auto"></pre>
      </div>
      <script>
        window._pColor="#f43f5e";
        function paintPx(i){
          document.getElementById("px"+i).style.background=window._pColor;
        }
        function exportSprite(){
          var bs=[];
          for(var i=0;i<64;i++){
            var bg=document.getElementById("px"+i).style.background;
            if(bg && bg!=='rgb(15, 23, 42)' && bg!=='#0f172a'){
               var x=(i%8)*20; var y=Math.floor(i/8)*20;
               bs.push(x+"px "+y+"px 0 "+bg);
            }
          }
          var code=".sprite {\\n  width: 20px;\\n  height: 20px;\\n  background: transparent;\\n  box-shadow: " + (bs.join(",\\n    ")||"none") + ";\\n}";
          document.getElementById("spr-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getRPGUI(lang) {
    var fr = lang === 'fr';
    var stats = ['HP','MP','STR','DEF','SPD','LCK'];
    
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#f59e0b;margin-bottom:12px">⚔️ ${fr?'Forge RPG':'RPG Forge'}</h3>
        <div style="display:grid;gap:10px">
          <div style="background:#1e293b;padding:12px;border-radius:8px">
            <label style="color:#94a3b8;font-size:12px">${fr?'Nom du personnage':'Character Name'}</label>
            <input id="rpg-name" value="Hero" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:6px;margin-top:4px">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
            ${stats.map(s => `
              <div style="background:#1e293b;padding:10px;border-radius:8px;text-align:center">
                <div style="color:#94a3b8;font-size:11px">${s}</div>
                <input type="number" id="rpg-${s.toLowerCase()}" value="${Math.floor(Math.random()*50+10)}" style="width:60px;background:#0f172a;color:#f59e0b;border:1px solid #f59e0b44;border-radius:4px;padding:4px;text-align:center;font-weight:bold">
              </div>
            `).join('')}
          </div>
          <div style="display:flex;margin-top:8px"><button onclick="generateRPGCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="generateRPGCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="rpg-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:150px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function generateRPGCode(){
          var n=document.getElementById("rpg-name").value;
          var stats={
            HP:parseInt(document.getElementById("rpg-hp").value),
            MP:parseInt(document.getElementById("rpg-mp").value),
            STR:parseInt(document.getElementById("rpg-str").value),
            DEF:parseInt(document.getElementById("rpg-def").value),
            SPD:parseInt(document.getElementById("rpg-spd").value),
            LCK:parseInt(document.getElementById("rpg-lck").value)
          };
          var code="const character = {\\n  name: '"+ n +"',\\n  level: 1,\\n  exp: 0,\\n  stats: "+JSON.stringify(stats,null,2)+"\\n};";
          document.getElementById("rpg-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getLeaderboardUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#f59e0b;margin-bottom:12px">🏆 ${fr?'Générateur de Classement':'Leaderboard Generator'}</h3>
        <div style="display:grid;gap:8px">
          <select id="lb-type" style="background:#1e293b;color:white;border:1px solid #334155;border-radius:6px;padding:8px">
            <option value="basic">${fr?'Classement Simple':'Basic Leaderboard'}</option>
            <option value="badges">${fr?'Avec Badges':'With Badges'}</option>
            <option value="realtime">${fr?'Temps Réel':'Realtime'}</option>
          </select>
          <div style="display:flex;margin-top:8px"><button onclick="genLeaderboard(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="genLeaderboard(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="lb-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:200px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function genLeaderboard(){
          var code = "// Leaderboard System\\nconst leaderboard = {\\n  scores: [],\\n  add(name, score) {\\n    this.scores.push({name, score, date: new Date().toISOString()});\\n    this.scores.sort((a,b)=>b.score-a.score);\\n    if(this.scores.length>10) this.scores=this.scores.slice(0,10);\\n  },\\n  render(el) {\\n    var html = '';\\n    for(var i=0; i<this.scores.length; i++) {\\n      var s = this.scores[i];\\n      var badge = i<3 ? ['🥇','🥈','🥉'][i] : ('#'+(i+1));\\n      html += '<div class=\"lb-row\"><span>'+badge+'</span> <span>'+s.name+'</span> <span>'+s.score+'</span></div>';\\n    }\\n    el.innerHTML = html;\\n  }\\n};\\n\\nleaderboard.add('Player1', 1250);\\nleaderboard.add('Player2', 980);";
          document.getElementById("lb-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  
  
  
  function getArchitectUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:10px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:10px;font-size:12px">← ${fr?'Retour':'Back'}</button>
        <div style="background:linear-gradient(135deg,#fbbf24,#d97706);border-radius:10px;padding:12px;margin-bottom:10px;box-shadow:0 8px 16px rgba(217,119,6,0.3)">
          <h3 style="color:white;margin:0 0 4px 0;font-size:15px;font-weight:800">👑 ${fr?'Arhitect Automat Suprem':'Supreme Game Architect'}</h3>
          <p style="color:rgba(255,255,255,0.9);font-size:11px;margin:0">${fr?'Générez des jeux complexes avec de multiples styles et effets avancés.':'Generate complex games with multiple styles and advanced effects.'}</p>
        </div>
        
        <div style="display:grid;gap:10px;">
          
          <!-- GAME STYLES -->
          <div style="background:#1e293b;padding:10px;border-radius:8px;border-left:4px solid #3b82f6">
            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:6px;font-weight:bold">🎮 ${fr?'Style de Jeu':'Game Style'}</label>
            <select id="arch-type" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:7px;font-size:12px">
              <option value="topdown">🗺️ ${fr?'Aventure 2D (Top-Down)':'2D Adventure (Top-Down)'}</option>
              <option value="platformer">🏃 ${fr?'Plateforme (Sauts)':'Platformer (Jumps)'}</option>
              <option value="shooter">🚀 ${fr?'Shooter Spatial (Galaga)':'Space Shooter (Galaga)'}</option>
              <option value="flappy">🐦 ${fr?'Flappy Clone (Zbor)':'Flappy Clone (Flying)'}</option>
              <option value="breakout">🧱 ${fr?'Breakout (Cărămizi)':'Breakout (Bricks)'}</option>
              <option disabled>────────── 🌌 3D INFINITY ENGINE ──────────</option>
              <option value="3d_forest">🌲 ${fr?'Forêt 3D (First-Person)':'3D Forest (First-Person)'}</option>
              <option value="3d_voxel">🧱 ${fr?'Voxel Builder (Minecraft)':'Voxel Builder (Minecraft)'}</option>
            </select>
          </div>
          
          <!-- CORE MODULES -->
          <div style="background:#1e293b;padding:10px;border-radius:8px;border-left:4px solid #10b981">
            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:8px;font-weight:bold">⚙️ ${fr?'Modules de Base':'Core Modules'}</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-map" checked> 🗺️ Map</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-fsm" checked> 🧩 Logic FSM</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-rpg" checked> ⚔️ RPG Stats</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-audio" checked> 🎵 Audio</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-sprite"> 🎨 Sprite CSS</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-multi"> 🌐 Net (WS)</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-math" checked> 🔢 Physics</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-leaderboard" checked> 🏆 Board</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-assets" checked> 📦 Assets</label>
            </div>
          </div>

          <!-- ADVANCED FX -->
          <div style="background:#1e293b;padding:10px;border-radius:8px;border-left:4px solid #f43f5e">
            <label style="color:#94a3b8;font-size:11px;display:block;margin-bottom:8px;font-weight:bold">✨ ${fr?'Effets Avancés (Noi)':'Advanced FX (New)'}</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-particles" checked> 🎇 Particles</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-mobile" checked> 📱 Touch UI</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-weather"> ☁️ Weather</label>
              <label style="display:flex;align-items:center;gap:5px;color:white;font-size:11px"><input type="checkbox" id="arch-save" checked> 💾 Auto-Save</label>
            </div>
          </div>
        </div>

        <div style="display:flex;margin-top:12px;margin-bottom:8px;">
          <button onclick="window.buildAutoGame(false)" style="flex:1;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:13px">➕ Inject</button>
          <button onclick="window.buildAutoGame(true)" style="flex:1;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;font-weight:bold;font-size:13px">🚀 Build & Play</button>
        </div>
      </div>
    `;
  }
function getPublisherUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#a78bfa;margin-bottom:12px">🚀 ${fr?'Publier le Jeu':'Game Publisher'}</h3>
        <div style="display:grid;gap:10px">
          <div style="background:#1e293b;padding:12px;border-radius:8px">
            <label style="color:#94a3b8;font-size:12px">${fr?'Type de jeu':'Game Type'}</label>
            <select id="pub-type" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:8px;margin-top:4px">
              <option value="snake">🐍 Snake</option>
              <option value="pong">🏓 Pong</option>
              <option value="platformer">🏃 Platformer</option>
            </select>
          </div>
          <div style="background:#1e293b;padding:12px;border-radius:8px">
            <label style="color:#94a3b8;font-size:12px">${fr?'Titre du jeu':'Game Title'}</label>
            <input id="pub-title" value="My Awesome Game" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:6px;margin-top:4px">
          </div>
          <div style="display:flex;margin-top:8px"><button onclick="publishGame(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="publishGame(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
        </div>
      </div>
      <script>
        function publishGame(){
          var type=document.getElementById("pub-type").value;
          var title=document.getElementById("pub-title").value;
          var code=getGameCode(type,title);
          if(window.setEditorValue) window.setEditorValue(code);
          var blob=new Blob([code],{type:"text/html"});
          var a=document.createElement("a");
          a.href=URL.createObjectURL(blob);
          a.download=title.replace(/ /g,"_")+".html";
          a.click();
        }
      <\/script>
    `;
  }

  function getLogicUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#8b5cf6;margin-bottom:12px">🧩 ${fr?'Designer Logique (FSM)':'Logic Designer (FSM)'}</h3>
        <div style="display:grid;gap:10px">
          <div style="background:#1e293b;padding:12px;border-radius:8px">
            <label style="color:#94a3b8;font-size:12px">${fr?"Nom de l'Entité":"Entity Name"}</label>
            <input id="fsm-name" value="Enemy" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:6px;margin-top:4px">
          </div>
          <div style="background:#1e293b;padding:12px;border-radius:8px">
            <label style="color:#94a3b8;font-size:12px">${fr?'États (séparés par des virgules)':'States (comma separated)'}</label>
            <input id="fsm-states" value="IDLE, PATROL, CHASE, ATTACK" style="width:100%;background:#0f172a;color:white;border:1px solid #334155;border-radius:6px;padding:6px;margin-top:4px">
          </div>
          <div style="display:flex;margin-top:8px"><button onclick="generateFSMCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="generateFSMCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="fsm-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:150px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function generateFSMCode(){
          var n=document.getElementById("fsm-name").value;
          var states=document.getElementById("fsm-states").value.split(',').map(s=>s.trim()).filter(s=>s);
          var code="class "+n+"FSM {\\n  constructor() {\\n    this.states = "+JSON.stringify(states)+";\\n    this.currentState = '"+(states[0]||'IDLE')+"';\\n  }\\n  update() {\\n    switch(this.currentState) {\\n";
          states.forEach(s => { code += "      case '"+s+"':\\n        this.update"+s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()+"();\\n        break;\\n"; });
          code += "    }\\n  }\\n";
          states.forEach(s => { code += "  update"+s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()+"() {\\n    // Logic for "+s+"\\n  }\\n"; });
          code += "}";
          document.getElementById("fsm-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getAudioUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#10b981;margin-bottom:12px">🎵 ${fr?'Compositeur Audio':'Audio Composer'}</h3>
        <div style="display:grid;gap:10px">
          <button onclick="playTone('jump')" style="background:#1e293b;border:1px solid #10b981;color:white;padding:10px;border-radius:8px;cursor:pointer">⬆️ ${fr?'Son de Saut':'Jump Sound'}</button>
          <button onclick="playTone('shoot')" style="background:#1e293b;border:1px solid #ef4444;color:white;padding:10px;border-radius:8px;cursor:pointer">💥 ${fr?'Son de Tir':'Shoot Sound'}</button>
          <button onclick="playTone('coin')" style="background:#1e293b;border:1px solid #f59e0b;color:white;padding:10px;border-radius:8px;cursor:pointer">🪙 ${fr?'Son de Pièce':'Coin Sound'}</button>
          <div style="display:flex;margin-top:8px"><button onclick="genAudioCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="genAudioCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="audio-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:150px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        var _audioCtx = null;
        function playTone(type) {
          if(!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          var osc = _audioCtx.createOscillator();
          var gain = _audioCtx.createGain();
          osc.connect(gain); gain.connect(_audioCtx.destination);
          var now = _audioCtx.currentTime;
          if(type==='jump') {
            osc.type = 'square'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
            gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
          } else if(type==='shoot') {
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now); osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now); osc.stop(now + 0.15);
          } else if(type==='coin') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(1000, now); osc.frequency.setValueAtTime(1500, now + 0.1);
            gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
          }
        }
        function genAudioCode(){
          var code = "const AudioFX = {\\n  ctx: new (window.AudioContext || window.webkitAudioContext)(),\\n  play(type) {\\n    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();\\n    osc.connect(gain); gain.connect(this.ctx.destination);\\n    const now = this.ctx.currentTime;\\n    if(type==='jump'){\\n      osc.type='square'; osc.frequency.setValueAtTime(150,now); osc.frequency.exponentialRampToValueAtTime(300,now+0.2);\\n      gain.gain.setValueAtTime(0.2,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.2);\\n      osc.start(now); osc.stop(now+0.2);\\n    } else if(type==='shoot'){\\n      osc.type='sawtooth'; osc.frequency.setValueAtTime(300,now); osc.frequency.exponentialRampToValueAtTime(50,now+0.15);\\n      gain.gain.setValueAtTime(0.2,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.15);\\n      osc.start(now); osc.stop(now+0.15);\\n    }\\n  }\\n};";
          document.getElementById("audio-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getMultiplayerUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#3b82f6;margin-bottom:12px">🌐 ${fr?'Archi Multijoueur':'Multiplayer Arch'}</h3>
        <div style="display:grid;gap:10px">
          <select id="multi-type" style="background:#1e293b;color:white;border:1px solid #334155;border-radius:6px;padding:8px">
            <option value="ws_server">WebSocket Node.js Server</option>
            <option value="ws_client">WebSocket HTML5 Client</option>
          </select>
          <div style="display:flex;margin-top:8px"><button onclick="genMultiCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="genMultiCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="multi-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:200px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function genMultiCode(){
          var type = document.getElementById('multi-type').value;
          var code = '';
          if(type === 'ws_server') {
            code = "const WebSocket = require('ws');\\nconst wss = new WebSocket.Server({ port: 8080 });\\nlet players = {};\\n\\nwss.on('connection', function connection(ws) {\\n  ws.id = Math.random().toString(36).substr(2, 9);\\n  players[ws.id] = { x: 0, y: 0 };\\n\\n  ws.on('message', function incoming(message) {\\n    const data = JSON.parse(message);\\n    if(data.type === 'move') {\\n      players[ws.id].x = data.x;\\n      players[ws.id].y = data.y;\\n      wss.clients.forEach(client => {\\n        if (client.readyState === WebSocket.OPEN) {\\n          client.send(JSON.stringify({ type: 'state', players }));\\n        }\\n      });\\n    }\\n  });\\n\\n  ws.on('close', () => {\\n    delete players[ws.id];\\n  });\\n});";
          } else {
            code = "const ws = new WebSocket('ws://localhost:8080');\\nlet players = {};\\n\\nws.onopen = () => {\\n  console.log('Connected to server');\\n  setInterval(() => {\\n    ws.send(JSON.stringify({ type: 'move', x: Math.random()*100, y: Math.random()*100 }));\\n  }, 100);\\n};\\n\\nws.onmessage = (event) => {\\n  const data = JSON.parse(event.data);\\n  if(data.type === 'state') {\\n    players = data.players;\\n  }\\n};";
          }
          document.getElementById("multi-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getMathUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#ec4899;margin-bottom:12px">🔢 ${fr?'Boîte à Outils Math':'Math Toolkit'}</h3>
        <div style="display:grid;gap:10px">
          <select id="math-type" style="background:#1e293b;color:white;border:1px solid #334155;border-radius:6px;padding:8px">
            <option value="vector">Vector 2D Class</option>
            <option value="aabb">AABB Collision (Box)</option>
            <option value="circle">Circle Collision</option>
          </select>
          <div style="display:flex;margin-top:8px"><button onclick="genMathCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="genMathCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="math-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:150px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function genMathCode(){
          var type = document.getElementById('math-type').value;
          var code = '';
          if(type==='vector') code = "class Vector2D {\\n  constructor(x=0,y=0){ this.x=x; this.y=y; }\\n  add(v){ return new Vector2D(this.x+v.x, this.y+v.y); }\\n  sub(v){ return new Vector2D(this.x-v.x, this.y-v.y); }\\n  mult(n){ return new Vector2D(this.x*n, this.y*n); }\\n  mag(){ return Math.sqrt(this.x*this.x + this.y*this.y); }\\n  normalize(){ let m=this.mag(); return m!==0 ? this.mult(1/m) : new Vector2D(); }\\n}";
          else if(type==='aabb') code = "function checkCollisionAABB(rect1, rect2) {\\n  return (rect1.x < rect2.x + rect2.width &&\\n          rect1.x + rect1.width > rect2.x &&\\n          rect1.y < rect2.y + rect2.height &&\\n          rect1.y + rect1.height > rect2.y);\\n}";
          else code = "function checkCollisionCircle(circle1, circle2) {\\n  let dx = circle1.x - circle2.x;\\n  let dy = circle1.y - circle2.y;\\n  let distance = Math.sqrt(dx * dx + dy * dy);\\n  return distance < circle1.radius + circle2.radius;\\n}";
          document.getElementById("math-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getAssetUI(lang) {
    var fr = lang === 'fr';
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <h3 style="color:#34d399;margin-bottom:12px">📦 ${fr?"Bibliothèque d'Assets":"Asset Library"}</h3>
        <div style="display:grid;gap:10px">
          <select id="asset-type" style="background:#1e293b;color:white;border:1px solid #334155;border-radius:6px;padding:8px">
            <option value="player">Player Sprite (Base64)</option>
            <option value="enemy">Enemy Sprite (Base64)</option>
            <option value="coin">Coin Sprite (Base64)</option>
          </select>
          <div style="display:flex;margin-top:8px"><button onclick="genAssetCode(false)" style="background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;margin-right:8px;font-size:12px">➕ Inject to code</button><button onclick="genAssetCode(true)" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px">🚀 Inject</button></div>
          <pre id="asset-out" style="background:#0f172a;color:#34d399;padding:8px;border-radius:6px;font-size:10px;max-height:100px;overflow:auto"></pre>
        </div>
      </div>
      <script>
        function genAssetCode(){
          var type = document.getElementById('asset-type').value;
          var b64 = '';
          if(type === 'player') b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHklEQVQYV2NkYGD4z0ABYBw1gGEWDBBhMopwGEQFAwCrBwX5+Wc3NAAAAABJRU5ErkJggg==';
          else if(type === 'enemy') b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhmOAwBVEBANIHBfmoQ2PNAAAAAElFTkSuQmCC';
          else b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhEodBjKICAMtJBfmkqM9jAAAAAElFTkSuQmCC';
          var code = "const "+type+"Image = new Image();\\n"+type+"Image.src = '"+b64+"';";
          document.getElementById("asset-out").innerText=code;
          if(window.setEditorValue) window.setEditorValue(code);
        }
      <\/script>
    `;
  }

  function getGenericTool(id, lang) {
    var fr = lang === 'fr';
    var tools = {
      logicfsm: { icon:'🧩', color:'#8b5cf6', desc:fr?'Conception visuelle des comportements de jeu':'Visual game behavior design'},
      audiocomp: { icon:'🎵', color:'#10b981', desc:fr?'Créez des sons 8-bit procéduraux':'Create procedural 8-bit sounds'},
      multiarch: { icon:'🌐', color:'#3b82f6', desc:fr?'Architecture multijoueur WebSocket':'WebSocket multiplayer architecture'},
      mathkit: { icon:'🔢', color:'#ec4899', desc:fr?'Physique de jeu et mathématiques':'Game physics and mathematics'},
      assetlib: { icon:'📦', color:'#34d399', desc:fr?"Bibliothèque d'assets prêts à l'emploi":'Ready-to-use game assets'}
    };
    var t = tools[id] || { icon:'🔧', color:'#94a3b8', desc:'Coming soon...' };
    
    return `
      <div style="padding:16px">
        <button onclick="window.initGameDevStudio('${lang}')" style="background:#1e293b;color:#94a3b8;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:12px">← ${fr?'Retour':'Back'}</button>
        <div style="text-align:center;padding:40px">
          <div style="font-size:64px;margin-bottom:16px">${t.icon}</div>
          <h3 style="color:${t.color}">${id.toUpperCase()}</h3>
          <p style="color:#64748b">${t.desc}</p>
          <div style="margin-top:24px;background:#1e293b;padding:16px;border-radius:8px;border:1px solid ${t.color}44">
            <p style="color:#94a3b8;font-size:13px">${fr?'🚧 Outil en cours de développement — disponible dans la prochaine mise à jour.':'🚧 Tool under development — available in the next update.'}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Global functions for Game Dev Studio

  window._injectGDSCode = function(code, overwrite) {
    if (overwrite) {
      if (window.setEditorValue) window.setEditorValue(code);
      else if (window.editor) window.editor.setValue(code);
    } else {
      if (window.editor) {
        window.editor.setValue(window.editor.getValue() + '\n\n' + code);
      } else {
        if (window.setEditorValue) window.setEditorValue(code);
      }
    }
  };

  
  
  
  
  window.buildAutoGame = function(overwrite) {
    var type = document.getElementById('arch-type').value;
    
    // Core
    var uMap = document.getElementById('arch-map').checked;
    var uFSM = document.getElementById('arch-fsm').checked;
    var uRPG = document.getElementById('arch-rpg').checked;
    var uAudio = document.getElementById('arch-audio').checked;
    var uSprite = document.getElementById('arch-sprite').checked;
    var uMulti = document.getElementById('arch-multi').checked;
    var uMath = document.getElementById('arch-math').checked;
    var uLead = document.getElementById('arch-leaderboard').checked;
    var uAssets = document.getElementById('arch-assets').checked;
    
    // Advanced
    var uParticles = document.getElementById('arch-particles').checked;
    var uMobile = document.getElementById('arch-mobile').checked;
    var uWeather = document.getElementById('arch-weather').checked;
    var uSave = document.getElementById('arch-save').checked;

    var badges = [];
    if(uMap) badges.push('🗺️ Map'); if(uFSM) badges.push('🧩 AI'); if(uRPG) badges.push('⚔️ RPG');
    if(uAudio) badges.push('🎵 Audio'); if(uSprite) badges.push('🎨 Sprite'); if(uMulti) badges.push('🌐 Net');
    if(uMath) badges.push('🔢 Physics'); if(uLead) badges.push('🏆 Board'); if(uAssets) badges.push('📦 Assets');
    if(uParticles) badges.push('🎇 FX'); if(uMobile) badges.push('📱 Touch'); if(uWeather) badges.push('☁️ Weather');
    if(uSave) badges.push('💾 Save');

    // Snippets
    var snMap = uMap ? "const MAP = [[1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1],[1,0,2,2,0,0,3,3,0,1],[1,0,2,2,0,0,3,3,0,1],[1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1]];" : "const MAP = [];";
    var snFSM = uFSM ? "class EnemyFSM { constructor() { this.state='IDLE'; this.timer=0; } update(dist) { this.timer++; if(dist<150) this.state='CHASE'; else if(this.timer>50) { this.state=(this.state==='IDLE')?'PATROL':'IDLE'; this.timer=0; } } }" : "class EnemyFSM { update(){} }";
    var snRPG = uRPG ? "const heroStats = { hp: 100, str: 15, def: 10, spd: 5 }; function drawRPG(ctx, x, y) { ctx.fillStyle='lime'; ctx.font='10px sans-serif'; ctx.fillText('HP:'+heroStats.hp, x, y-15); }" : "const heroStats = { hp: 100 }; function drawRPG(){}";
    var snAudio = uAudio ? "const AudioFX = { ctx: new (window.AudioContext || window.webkitAudioContext)(), play(type) { const osc = this.ctx.createOscillator(), gain = this.ctx.createGain(); osc.connect(gain); gain.connect(this.ctx.destination); const now = this.ctx.currentTime; if(type==='jump'){ osc.type='square'; osc.frequency.setValueAtTime(150,now); osc.frequency.exponentialRampToValueAtTime(300,now+0.2); gain.gain.setValueAtTime(0.2,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.2); osc.start(now); osc.stop(now+0.2); } else if(type==='coin'){ osc.type='sine'; osc.frequency.setValueAtTime(1000,now); osc.frequency.setValueAtTime(1500,now+0.1); gain.gain.setValueAtTime(0.2,now); gain.gain.linearRampToValueAtTime(0,now+0.3); osc.start(now); osc.stop(now+0.3); } else if(type==='boom'){ osc.type='sawtooth'; osc.frequency.setValueAtTime(100,now); osc.frequency.exponentialRampToValueAtTime(10,now+0.3); gain.gain.setValueAtTime(0.3,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.3); osc.start(now); osc.stop(now+0.3); } } };" : "const AudioFX = { play() {} };";
    var snSprite = uSprite ? ".css-sprite { width:20px; height:20px; background:transparent; box-shadow: 2px 2px 0 #fff, 4px 4px 0 #fff; }" : "";
    var snMulti = uMulti ? "const ws = { connected: false }; /* Mock Multiplayer */ function drawNet(ctx) { if(ws.connected) { ctx.fillStyle='cyan'; ctx.fillText('🌐 Online 2/10', 10, 20); } }" : "function drawNet(){}";
    var snMath = uMath ? "function checkCollision(r1, r2) { return (r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y); }" : "function checkCollision(r1,r2){return false;}";
    var snLead = uLead ? "const leaderboard = { scores: [{name:'AI King', score:9999}], add(n,s) { this.scores.push({name:n,score:s}); this.scores.sort((a,b)=>b.score-a.score); } };" : "";
    var snAssets = uAssets ? "const playerImg = new Image(); playerImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHklEQVQYV2NkYGD4z0ABYBw1gGEWDBBhMopwGEQFAwCrBwX5+Wc3NAAAAABJRU5ErkJggg=='; const coinImg = new Image(); coinImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhEodBjKICAMtJBfmkqM9jAAAAAElFTkSuQmCC'; const enemyImg = new Image(); enemyImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhmOAwBVEBANIHBfmoQ2PNAAAAAElFTkSuQmCC';" : "const playerImg=null; const coinImg=null; const enemyImg=null;";
    var snParticles = uParticles ? "let particles = []; function spawnParticles(x,y,c){ for(let i=0;i<10;i++) particles.push({x:x, y:y, vx:(Math.random()-0.5)*10, vy:(Math.random()-0.5)*10, life:1, color:c}); } function updateParticles(){ for(let i=particles.length-1; i>=0; i--){ let p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.life-=0.05; if(p.life<=0) particles.splice(i,1); } } function drawParticles(ctx){ particles.forEach(p=>{ ctx.globalAlpha=p.life; ctx.fillStyle=p.color; ctx.fillRect(p.x,p.y,4,4); }); ctx.globalAlpha=1; }" : "function spawnParticles(){} function updateParticles(){} function drawParticles(){}";
    var snWeather = uWeather ? "let drops = []; for(let i=0;i<100;i++) drops.push({x:Math.random()*600, y:Math.random()*400, s:Math.random()*5+2}); function drawWeather(ctx){ ctx.fillStyle='rgba(255,255,255,0.5)'; drops.forEach(d=>{ d.y+=d.s; if(d.y>400) d.y=0; ctx.fillRect(d.x,d.y,2,10); }); }" : "function drawWeather(){}";
    var snSave = uSave ? "let highScore = localStorage.getItem('auto_hs') || 0; function saveScore(s){ if(s>highScore){ highScore=s; localStorage.setItem('auto_hs', highScore); } }" : "let highScore=0; function saveScore(){}";
    var snMobile = uMobile ? `<div class="controls" id="dpad">
      <div class="dbtn" onpointerdown="keys['ArrowUp']=true" onpointerup="keys['ArrowUp']=false" onpointerleave="keys['ArrowUp']=false" style="grid-column:2;grid-row:1">▲</div>
      <div class="dbtn" onpointerdown="keys['ArrowLeft']=true" onpointerup="keys['ArrowLeft']=false" onpointerleave="keys['ArrowLeft']=false" style="grid-column:1;grid-row:2">◀</div>
      <div class="dbtn" onpointerdown="keys['ArrowRight']=true" onpointerup="keys['ArrowRight']=false" onpointerleave="keys['ArrowRight']=false" style="grid-column:3;grid-row:2">▶</div>
      <div class="dbtn" onpointerdown="keys['ArrowDown']=true" onpointerup="keys['ArrowDown']=false" onpointerleave="keys['ArrowDown']=false" style="grid-column:2;grid-row:3">▼</div>
      <div class="dbtn action" onpointerdown="keys[' ']=true" onpointerup="keys[' ']=false" onpointerleave="keys[' ']=false" style="position:absolute;right:-120px;top:20px;width:60px;height:60px;border-radius:50%;background:#f43f5e">🔥</div>
    </div>` : "";

    var gameLogic = `
      const canvas = document.getElementById('gameCanvas');
      const ctx = canvas.getContext('2d');
      let score = 0;
      window.keys = window.keys || {};
      window.addEventListener('keydown', e => keys[e.key] = true);
      window.addEventListener('keyup', e => keys[e.key] = false);
    `;

    
    // INJECTING LOGIC BASED ON TYPE, MAKING SURE ALL FEATURES ARE VISIBLE
    if (type === 'shooter') {
      gameLogic += `
        let player = { x: 290, y: 350, w: 20, h: 20, speed: 6 };
        let bullets = []; let enemies = []; let timer = 0;
        if(typeof ws !== 'undefined') ws.connected = true; // Trigger multi UI
        
        function update() {
          if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
          if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
          if (player.x<0) player.x=0; if (player.x>580) player.x=580;
          
          timer++;
          if(timer % 15 === 0 && (keys[' '] || keys['ArrowUp'])) {
             bullets.push({x: player.x+8, y: player.y, w:4, h:10}); AudioFX.play('jump');
          }
          if(timer % 60 === 0) {
             enemies.push({x: Math.random()*560, y: -20, w:20, h:20, ai: new EnemyFSM()});
          }
          
          bullets.forEach(b => b.y -= 10);
          bullets = bullets.filter(b => b.y > -20);
          
          enemies.forEach(e => {
             e.y += 2;
             if(e.ai) {
                let dist = Math.abs(player.x - e.x);
                e.ai.update(dist);
                if(e.ai.state === 'CHASE') {
                   if(e.x < player.x) e.x += 1; else e.x -= 1;
                }
             }
          });
          
          for(let i=enemies.length-1; i>=0; i--) {
             let e = enemies[i];
             for(let j=bullets.length-1; j>=0; j--) {
                let b = bullets[j];
                if(checkCollision(e, b)) {
                   spawnParticles(e.x+10, e.y+10, '#f59e0b'); AudioFX.play('boom');
                   enemies.splice(i,1); bullets.splice(j,1);
                   score+=100; saveScore(score); document.getElementById('score').innerText = score;
                   break;
                }
             }
          }
          updateParticles();
        }
        function draw() {
          ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,canvas.width,canvas.height);
          
          if(MAP && MAP.length>0) {
             ctx.fillStyle='white';
             for(let r=0;r<MAP.length;r++) for(let c=0;c<MAP[r].length;c++) {
                if(MAP[r][c]===1) { ctx.globalAlpha=0.1; ctx.fillRect(c*60, (r*60 + timer)%400, 2, 2); ctx.globalAlpha=1; }
             }
          }
          
          if(playerImg && playerImg.complete) ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
          else { ctx.fillStyle = '#3b82f6'; ctx.fillRect(player.x, player.y, player.w, player.h); }
          
          ctx.fillStyle = '#fbbf24'; bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
          
          enemies.forEach(e => {
            if(enemyImg && enemyImg.complete) ctx.drawImage(enemyImg, e.x, e.y, e.w, e.h);
            else { ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x, e.y, e.w, e.h); }
            if(e.ai && e.ai.state==='CHASE') { ctx.fillStyle='red'; ctx.font='10px Arial'; ctx.fillText('!', e.x+5, e.y-5); }
          });
          
          drawRPG(ctx, player.x, player.y); drawNet(ctx); drawParticles(ctx); drawWeather(ctx);
        }
      `;
    } else if (type === 'platformer') {
      gameLogic += `
        let player = { x: 50, y: 200, w: 20, h: 20, dx: 0, dy: 0, speed: 4, jump: -12, grounded: false };
        let platforms = [{x:0, y:350, w:600, h:50}, {x:200, y:250, w:100, h:20}, {x:400, y:150, w:100, h:20}];
        let enemies = [{x:250, y:230, w:20, h:20, ai: new EnemyFSM()}];
        if(typeof ws !== 'undefined') ws.connected = true;
        
        function update() {
          if (keys['ArrowLeft'] || keys['a']) player.dx = -player.speed;
          else if (keys['ArrowRight'] || keys['d']) player.dx = player.speed;
          else player.dx = 0;
          
          if ((keys['ArrowUp'] || keys['w'] || keys[' ']) && player.grounded) {
            player.dy = player.jump; player.grounded = false; AudioFX.play('jump'); spawnParticles(player.x, player.y+20, '#fff');
          }
          
          player.dy += 0.6; player.x += player.dx; player.y += player.dy;
          player.grounded = false;
          platforms.forEach(p => {
             if(checkCollision(player, p)) {
                if(player.dy > 0 && player.y + player.h - player.dy <= p.y) {
                   player.grounded = true; player.dy = 0; player.y = p.y - player.h;
                }
             }
          });
          
          enemies.forEach(e => {
             let dist = Math.abs(player.x - e.x); e.ai.update(dist);
             if(e.ai.state==='CHASE') { e.x += (player.x > e.x ? 1 : -1); }
             if(checkCollision(player, e)) { AudioFX.play('boom'); score=0; player.x=50; player.y=200; spawnParticles(player.x, player.y, 'red'); }
          });
          
          if(player.y > canvas.height) { player.y = 50; player.dy = 0; score=0; AudioFX.play('boom'); }
          updateParticles();
        }
        function draw() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          if(MAP && MAP.length>0) { ctx.fillStyle='#1e293b'; for(let r=0;r<MAP.length;r++) for(let c=0;c<MAP[r].length;c++) if(MAP[r][c]===1) ctx.fillRect(c*60, r*60, 60, 60); }
          ctx.fillStyle = '#10b981'; platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));
          
          enemies.forEach(e => {
             if(enemyImg && enemyImg.complete) ctx.drawImage(enemyImg, e.x, e.y, e.w, e.h);
             else { ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x, e.y, e.w, e.h); }
          });
          
          if(playerImg && playerImg.complete) ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
          else { ctx.fillStyle = '#f43f5e'; ctx.fillRect(player.x, player.y, player.w, player.h); }
          
          drawRPG(ctx, player.x, player.y); drawNet(ctx); drawParticles(ctx); drawWeather(ctx);
        }
      `;
    } else if (type === 'flappy') {
       gameLogic += `
        let player = { x: 50, y: 200, w: 20, h: 20, dy: 0 };
        let pipes = []; let timer = 0; let gameOver = false;
        if(typeof ws !== 'undefined') ws.connected = true;
        
        function flap() { if(!gameOver) { player.dy = -8; AudioFX.play('jump'); spawnParticles(player.x, player.y+20, 'white'); } }
        window.addEventListener('keydown', e => { if(e.key===' ') flap(); });
        
        // Mobile tap fix
        if(typeof keys !== 'undefined') {
           const origTap = window.onpointerdown;
           window.onpointerdown = (e) => { if(origTap) origTap(e); flap(); keys[' ']=true; };
        }

        function update() {
          if(gameOver) return;
          player.dy += 0.5; player.y += player.dy;
          timer++;
          if(timer % 90 === 0) {
             let gapY = Math.random()*200 + 50;
             pipes.push({x: 600, top: gapY, bottom: gapY+100, w: 40, passed: false});
          }
          
          pipes.forEach(p => {
             p.x -= 3;
             if(!p.passed && p.x < player.x) { p.passed = true; score++; saveScore(score); document.getElementById('score').innerText = score; AudioFX.play('coin'); spawnParticles(player.x, player.y, 'gold'); }
             if(player.x < p.x+p.w && player.x+player.w > p.x) {
                if(player.y < p.top || player.y+player.h > p.bottom) { gameOver=true; AudioFX.play('boom'); spawnParticles(player.x, player.y, 'red'); }
             }
          });
          if(player.y > 400 || player.y < 0) { gameOver=true; AudioFX.play('boom'); spawnParticles(player.x, player.y, 'red'); }
          updateParticles();
        }
        function draw() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          if(MAP && MAP.length>0) { ctx.fillStyle='#1e293b'; for(let r=0;r<MAP.length;r++) for(let c=0;c<MAP[r].length;c++) if(MAP[r][c]===1) ctx.fillRect(c*60 - (timer*2)%60, r*60, 60, 60); }
          
          ctx.fillStyle = '#10b981';
          pipes.forEach(p => { ctx.fillRect(p.x, 0, p.w, p.top); ctx.fillRect(p.x, p.bottom, p.w, 400-p.bottom); });
          
          if(playerImg && playerImg.complete) ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
          else { ctx.fillStyle = '#fbbf24'; ctx.fillRect(player.x, player.y, player.w, player.h); }
          
          if(gameOver) { ctx.fillStyle='white'; ctx.font='40px sans-serif'; ctx.fillText('GAME OVER', 180, 200); }
          drawRPG(ctx, player.x, player.y); drawNet(ctx); drawParticles(ctx); drawWeather(ctx);
        }
       `;
    } else if (type === 'breakout') {
       gameLogic += `
        let paddle = { x: 250, y: 380, w: 100, h: 10, speed: 7 };
        let ball = { x: 300, y: 200, r: 8, dx: 4, dy: -4 };
        let bricks = [];
        if(typeof ws !== 'undefined') ws.connected = true;
        for(let r=0; r<5; r++) { for(let c=0; c<8; c++) { bricks.push({x: c*70 + 25, y: r*25 + 30, w: 60, h: 15}); } }
        
        function update() {
          if (keys['ArrowLeft'] || keys['a']) paddle.x -= paddle.speed;
          if (keys['ArrowRight'] || keys['d']) paddle.x += paddle.speed;
          if (paddle.x<0) paddle.x=0; if (paddle.x>500) paddle.x=500;
          
          ball.x += ball.dx; ball.y += ball.dy;
          if(ball.x < 0 || ball.x > 600) ball.dx *= -1;
          if(ball.y < 0) ball.dy *= -1;
          if(ball.y > 400) { ball.x=300; ball.y=200; score=0; AudioFX.play('boom'); spawnParticles(300,380,'red'); }
          
          if(ball.y+ball.r > paddle.y && ball.x > paddle.x && ball.x < paddle.x+paddle.w) {
             ball.dy = -Math.abs(ball.dy); AudioFX.play('jump'); spawnParticles(ball.x, ball.y, 'white');
          }
          
          for(let i=bricks.length-1; i>=0; i--) {
             let b = bricks[i];
             if(ball.x > b.x && ball.x < b.x+b.w && ball.y > b.y && ball.y < b.y+b.h) {
                ball.dy *= -1; bricks.splice(i,1); score+=10; saveScore(score); document.getElementById('score').innerText = score;
                spawnParticles(b.x+30, b.y+10, '#ec4899'); AudioFX.play('coin');
             }
          }
          updateParticles();
        }
        function draw() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          if(MAP && MAP.length>0) { ctx.fillStyle='#1e293b'; for(let r=0;r<MAP.length;r++) for(let c=0;c<MAP[r].length;c++) if(MAP[r][c]===1) ctx.fillRect(c*60, r*60, 60, 60); }
          
          ctx.fillStyle = '#3b82f6'; ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
          ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); 
          if(coinImg && coinImg.complete) ctx.drawImage(coinImg, ball.x-ball.r, ball.y-ball.r, ball.r*2, ball.r*2);
          else { ctx.fillStyle='white'; ctx.fill(); }
          
          bricks.forEach(b => {
             if(enemyImg && enemyImg.complete) ctx.drawImage(enemyImg, b.x, b.y, b.w, b.h);
             else { ctx.fillStyle = '#ec4899'; ctx.fillRect(b.x, b.y, b.w, b.h); }
          });
          drawRPG(ctx, paddle.x, paddle.y); drawNet(ctx); drawParticles(ctx); drawWeather(ctx);
        }
       `;
    } else {
       // fallback topdown using all
       gameLogic += `
        let player = { x: 300, y: 200, w: 20, h: 20, speed: 5 };
        let coins = []; let timer = 0; let enemies = [{x: 50, y: 50, w: 20, h: 20, ai: new EnemyFSM()}];
        setInterval(() => coins.push({x: Math.random()*580, y: Math.random()*380, w:15, h:15}), 2000);
        if(typeof ws !== 'undefined') ws.connected = true;

        function update() {
          timer++;
          if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
          if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
          if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
          if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
          
          if(player.x<0) player.x=0; if(player.y<0) player.y=0;
          if(player.x>canvas.width-player.w) player.x=canvas.width-player.w;
          if(player.y>canvas.height-player.h) player.y=canvas.height-player.h;

          for(let i=coins.length-1; i>=0; i--) {
            if (checkCollision(player, coins[i])) {
              coins.splice(i, 1); score += 10; saveScore(score); document.getElementById('score').innerText = score;
              AudioFX.play('coin'); spawnParticles(player.x, player.y, '#f59e0b');
              if(typeof heroStats !== 'undefined') heroStats.hp += 5; // Heal on coin
            }
          }
          
          enemies.forEach(e => {
             let dist = Math.sqrt(Math.pow(player.x - e.x, 2) + Math.pow(player.y - e.y, 2));
             e.ai.update(dist);
             if(e.ai.state === 'CHASE') {
                e.x += (player.x - e.x) * 0.02; e.y += (player.y - e.y) * 0.02;
             }
             if(checkCollision(player, e)) { AudioFX.play('boom'); spawnParticles(player.x, player.y, 'red'); player.x=300; player.y=200; score=0; }
          });
          updateParticles();
        }

        function draw() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          
          if(MAP && MAP.length>0) {
             ctx.fillStyle='#1e293b';
             for(let r=0;r<MAP.length;r++) for(let c=0;c<MAP[r].length;c++) {
                if(MAP[r][c]===1) ctx.fillRect(c*60, r*60, 60, 60);
             }
          }

          coins.forEach(c => {
             if(coinImg && coinImg.complete) ctx.drawImage(coinImg, c.x, c.y, c.w, c.h);
             else { ctx.fillStyle = '#f59e0b'; ctx.fillRect(c.x, c.y, c.w, c.h); }
          });
          
          enemies.forEach(e => {
             if(enemyImg && enemyImg.complete) ctx.drawImage(enemyImg, e.x, e.y, e.w, e.h);
             else { ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x, e.y, e.w, e.h); }
             if(e.ai && e.ai.state==='CHASE') { ctx.fillStyle='red'; ctx.fillText('!', e.x+5, e.y-5); }
          });
          
          if(playerImg && playerImg.complete) ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
          else { ctx.fillStyle = '#3b82f6'; ctx.fillRect(player.x, player.y, player.w, player.h); }
          
          drawRPG(ctx, player.x, player.y); drawNet(ctx); drawParticles(ctx); drawWeather(ctx);
        }
      `;
    }

    gameLogic += `
      function loop() { update(); draw(); requestAnimationFrame(loop); }
      document.getElementById('gameCanvas').addEventListener('click', () => {
        if(!window.gameStarted) { window.gameStarted=true; loop(); document.getElementById('startMsg').style.display='none'; }
      });
    `;

    
    var titleStr = {topdown:'Epic Dungeon', platformer:'Jump Quest', shooter:'Space Defender', flappy:'Flappy Clone', breakout:'Brick Breaker', '3d_forest':'Mystic 3D Forest', '3d_voxel':'3D Voxel World'}[type] || 'Game';
    
    var is3D = type.startsWith('3d_');
    var extraHead = is3D ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>' : '';
    
    if (is3D) {
       snSprite = ''; snMap = ''; snAudio = ''; 
       
       var threeLogic = "";
       if (type === '3d_forest') {
          threeLogic = `
            const canvas = document.getElementById('gameCanvas');
            const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
            renderer.setSize(600, 400);
            
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB);
            scene.fog = new THREE.Fog(0x87CEEB, 10, 80);
            
            const camera = new THREE.PerspectiveCamera(75, 600/400, 0.1, 1000);
            camera.position.set(0, 2, 0);
            
            // Lighting
            scene.add(new THREE.AmbientLight(0x404040));
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dirLight.position.set(10, 20, 10);
            scene.add(dirLight);
            
            // Ground
            const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({color: 0x228B22}));
            plane.rotation.x = -Math.PI / 2;
            scene.add(plane);
            
            // Procedural Trees
            const trunkGeom = new THREE.CylinderGeometry(0.2, 0.3, 2);
            const leavesGeom = new THREE.ConeGeometry(1.5, 4);
            const trunkMat = new THREE.MeshLambertMaterial({color: 0x5c4033});
            const leavesMat = new THREE.MeshLambertMaterial({color: 0x228b22});
            
            for(let i=0; i<150; i++) {
               const tree = new THREE.Group();
               const trunk = new THREE.Mesh(trunkGeom, trunkMat); trunk.position.y = 1;
               const leaves = new THREE.Mesh(leavesGeom, leavesMat); leaves.position.y = 3;
               tree.add(trunk); tree.add(leaves);
               tree.position.set((Math.random()-0.5)*150, 0, (Math.random()-0.5)*150);
               scene.add(tree);
            }
            
            let pitch = 0, yaw = 0;
            let isLocked = false;
            const overlay = document.getElementById('startMsg');
            canvas.oncontextmenu = e => e.preventDefault();
            canvas.setAttribute('tabindex', '0');
            canvas.onclick = () => { 
               window.focus();
               canvas.focus();
               isLocked = true;
               if(overlay) overlay.style.display = 'none';
               try { canvas.requestPointerLock(); } catch(e) {} 
            };
            document.addEventListener('pointerlockchange', () => {
               if(document.pointerLockElement !== canvas) {
                  isLocked = false;
                  if(overlay) overlay.style.display = 'block';
               }
            });
            document.addEventListener('mousemove', e => {
               if(isLocked) {
                  yaw -= (e.movementX || 0) * 0.002;
                  pitch -= (e.movementY || 0) * 0.002;
                  pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
               }
            });
            
            window.keys = window.keys || {};
            document.addEventListener('keydown', e => { if(e.key) keys[e.key.toLowerCase()] = true; });
            document.addEventListener('keyup', e => { if(e.key) keys[e.key.toLowerCase()] = false; });
            
            function loop() {
               requestAnimationFrame(loop);
               try {
                  let speed = keys['shift'] ? 0.4 : 0.2;
               let dir = new THREE.Vector3();
               if(keys['w'] || keys['z'] || keys['arrowup'])    dir.z = -1;
               if(keys['s'] || keys['arrowdown'])               dir.z =  1;
               if(keys['a'] || keys['q'] || keys['arrowleft'])  dir.x = -1;
               if(keys['d'] || keys['arrowright'])              dir.x =  1;
               
               if(dir.lengthSq() > 0) {
                  dir.applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
                  dir.normalize().multiplyScalar(speed);
                  camera.position.add(dir);
                  camera.position.y = 2; // lock height
               }
               
               if(isNaN(yaw)) yaw = 0;
               if(isNaN(pitch)) pitch = 0;
               
               camera.rotation.set(0,0,0);
               camera.rotateY(yaw);
               camera.rotateX(pitch);
               
               renderer.render(scene, camera);
               } catch(err) {
                  if(!window.loggedErr) { window.loggedErr = true; document.body.innerHTML += '<div style="position:fixed;top:10px;left:10px;background:red;color:white;padding:10px;z-index:9999;font-size:14px;">Loop Error: ' + err.message + '</div>'; }
               }
            }
            loop();
          `;
       } else if (type === '3d_voxel') {
          threeLogic = `
            const canvas = document.getElementById('gameCanvas');
            const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
            renderer.setSize(600, 400);
            renderer.shadowMap.enabled = true;
            
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87ceeb);
            scene.fog = new THREE.Fog(0x87ceeb, 20, 60);
            
            const camera = new THREE.PerspectiveCamera(75, 600/400, 0.1, 1000);
            camera.position.set(0, 8, 0);
            
            scene.add(new THREE.AmbientLight(0xffffff, 0.6));
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dirLight.position.set(10, 20, 10);
            scene.add(dirLight);
            
            // Block materials palette
            const blockMats = {
              grass: new THREE.MeshLambertMaterial({color: 0x4caf50}),
              dirt:  new THREE.MeshLambertMaterial({color: 0x795548}),
              stone: new THREE.MeshLambertMaterial({color: 0x9e9e9e}),
              wood:  new THREE.MeshLambertMaterial({color: 0x8d6e63}),
              sand:  new THREE.MeshLambertMaterial({color: 0xfdd835}),
              water: new THREE.MeshLambertMaterial({color: 0x1e88e5, transparent:true, opacity:0.7}),
              lava:  new THREE.MeshLambertMaterial({color: 0xff5722}),
              glass: new THREE.MeshLambertMaterial({color: 0xe3f2fd, transparent:true, opacity:0.4})
            };
            const cubeGeom = new THREE.BoxGeometry(1,1,1);
            
            let selectedBlock = 'grass';
            window._voxelBlock = 'grass';
            
            // Selector buttons
            const selDiv = document.getElementById('blockSelector');
            if(selDiv) {
              const types = Object.keys(blockMats);
              const colors = {grass:'#4caf50',dirt:'#795548',stone:'#9e9e9e',wood:'#8d6e63',sand:'#fdd835',water:'#1e88e5',lava:'#ff5722',glass:'#b3e5fc'};
              types.forEach(t => {
                const b = document.createElement('button');
                b.textContent = t.toUpperCase();
                b.style.cssText = 'padding:4px 8px;border:2px solid '+(t===selectedBlock?'white':'transparent')+';border-radius:6px;background:'+colors[t]+';color:white;font-size:10px;font-weight:900;cursor:pointer;text-shadow:0 1px 2px #000;';
                b.title = t;
                b.onclick = () => {
                  selectedBlock = t; window._voxelBlock = t;
                  selDiv.querySelectorAll('button, label').forEach(x => x.style.border='2px solid transparent');
                  b.style.border = '2px solid white';
                };
                selDiv.appendChild(b);
              });
              
              const uBtn = document.createElement('label');
              uBtn.innerHTML = '📷 UPLOAD / IMPORTER <input type="file" style="display:none" accept="image/*">';
              uBtn.style.cssText = 'padding:4px 8px;border:2px solid transparent;border-radius:6px;background:#9c27b0;color:white;font-size:10px;font-weight:900;cursor:pointer;text-shadow:0 1px 2px #000;';
              uBtn.querySelector('input').onchange = (e) => {
                const file = e.target.files[0];
                if(file) {
                  const reader = new FileReader();
                  reader.onload = (re) => {
                    localStorage.setItem('voxelCustomTex', re.target.result);
                    const tex = new THREE.TextureLoader().load(re.target.result);
                    blockMats['custom'] = new THREE.MeshLambertMaterial({map: tex});
                    selectedBlock = 'custom'; window._voxelBlock = 'custom';
                    selDiv.querySelectorAll('button, label').forEach(x => x.style.border='2px solid transparent');
                    uBtn.style.border = '2px solid white';
                  };
                  reader.readAsDataURL(file);
                }
              };
              selDiv.appendChild(uBtn);
              
              const rBtn = document.createElement('button');
              rBtn.innerHTML = '🧹 RESET / EFFACER';
              rBtn.style.cssText = 'padding:4px 8px;border:2px solid transparent;border-radius:6px;background:#ef4444;color:white;font-size:10px;font-weight:900;cursor:pointer;text-shadow:0 1px 2px #000;margin-left:auto;';
              rBtn.onclick = () => {
                if(confirm('Are you sure you want to reset the world? / Êtes-vous sûr de vouloir réinitialiser le monde ?')) {
                   localStorage.removeItem('voxelWorldSave');
                   localStorage.removeItem('voxelCustomTex');
                   location.reload();
                }
              };
              selDiv.appendChild(rBtn);
            }
            
            // Map of placed blocks: "x,y,z" -> mesh
            const voxelMap = {};
            
            function saveMap() {
              const data = [];
              Object.keys(voxelMap).forEach(k => {
                data.push({k: k, t: voxelMap[k].userData.type});
              });
              localStorage.setItem('voxelWorldSave', JSON.stringify(data));
            }

            function placeVoxel(x, y, z, type, skipSave) {
              const key = x+','+y+','+z;
              if(voxelMap[key]) return;
              const m = new THREE.Mesh(cubeGeom, blockMats[type] || blockMats.grass);
              m.position.set(x+0.5, y+0.5, z+0.5);
              m.userData.voxel = true;
              m.userData.type = type;
              scene.add(m);
              voxelMap[key] = m;
              document.getElementById('score').innerText = Object.keys(voxelMap).length;
              if(!skipSave) saveMap();
            }
            
            function removeVoxel(mesh) {
              const key = (mesh.position.x-0.5)+','+(mesh.position.y-0.5)+','+(mesh.position.z-0.5);
              scene.remove(mesh);
              delete voxelMap[key];
              document.getElementById('score').innerText = Object.keys(voxelMap).length;
              saveMap();
            }
            
            // Load Custom Texture
            const savedTex = localStorage.getItem('voxelCustomTex');
            if (savedTex) {
               const tex = new THREE.TextureLoader().load(savedTex);
               blockMats['custom'] = new THREE.MeshLambertMaterial({map: tex});
            }
            
            // Generate or Load terrain
            const savedData = localStorage.getItem('voxelWorldSave');
            if (savedData) {
              try {
                const parsed = JSON.parse(savedData);
                parsed.forEach(b => {
                  const pts = b.k.split(',');
                  placeVoxel(parseInt(pts[0]), parseInt(pts[1]), parseInt(pts[2]), b.t, true);
                });
              } catch(e) { console.error('Save corrupted'); }
            } else {
              for(let x=-10; x<10; x++) {
                for(let z=-10; z<10; z++) {
                  const h = Math.floor(Math.sin(x/4)*2 + Math.cos(z/4)*2);
                  for(let y=-3; y<=h; y++) {
                    const type = y===h ? 'grass' : (y>h-2 ? 'dirt' : 'stone');
                    placeVoxel(x, y, z, type, true);
                  }
                }
              }
            }
            
            // Controls
            let pitch = 0, yaw = 0;
            let isLocked = false;
            
            const overlay = document.getElementById('startMsg');
            
            canvas.setAttribute('tabindex', '0');
            canvas.onclick = () => {
              window.focus();
              canvas.focus();
              isLocked = true;
              if(overlay) overlay.style.display = 'none';
              try { canvas.requestPointerLock(); } catch(e) {}
            };
            
            document.addEventListener('pointerlockchange', () => {
              if (document.pointerLockElement !== canvas) {
                 isLocked = false;
                 if(overlay) overlay.style.display = 'flex';
              }
            });
            
            document.addEventListener('mousemove', e => {
              if(!isLocked) return;
              yaw   -= (e.movementX || 0) * 0.002;
              pitch -= (e.movementY || 0) * 0.002;
              pitch = Math.max(-Math.PI/2+0.01, Math.min(Math.PI/2-0.01, pitch));
            });
            
            const raycaster = new THREE.Raycaster();
            raycaster.far = 8;
            
            document.addEventListener('mousedown', e => {
              if(!isLocked) return;
              raycaster.setFromCamera(new THREE.Vector2(0,0), camera);
              const hits = raycaster.intersectObjects(scene.children.filter(o=>o.isMesh));
              if(hits.length === 0) return;
              const hit = hits[0];
              
              if(e.button === 0) { // LEFT = PLACE block
                const p = hit.point.clone().add(hit.face.normal.clone().multiplyScalar(0.51));
                placeVoxel(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z), selectedBlock);
              } else if(e.button === 2) { // RIGHT = REMOVE block
                if(hit.object.userData.voxel) removeVoxel(hit.object);
              }
            });
            
            document.addEventListener('contextmenu', e => e.preventDefault());
            
            window.keys = window.keys || {};
            document.addEventListener('keydown', e => { if(e.key) keys[e.key.toLowerCase()] = true; });
            document.addEventListener('keyup',   e => { if(e.key) keys[e.key.toLowerCase()] = false; });
            
            let vy = 0;
            function loop() {
              requestAnimationFrame(loop);
              try {
                 const speed = keys['shift'] ? 0.25 : 0.12;
              const dir = new THREE.Vector3();
              if(keys['w'] || keys['z'] || keys['arrowup'])    dir.z = -1;
              if(keys['s'] || keys['arrowdown'])               dir.z =  1;
              if(keys['a'] || keys['q'] || keys['arrowleft'])  dir.x = -1;
              if(keys['d'] || keys['arrowright'])              dir.x =  1;
              
              if(dir.lengthSq() > 0) {
                 dir.applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
                 dir.normalize().multiplyScalar(speed);
                 camera.position.x += dir.x;
                 camera.position.z += dir.z;
              }
              
              // Jump & gravity
              if((keys[' '] || keys['e']) && vy <= 0.01) vy = 0.28;
              vy -= 0.018;
              camera.position.y += vy;
              if(camera.position.y < 7) { camera.position.y = 7; vy = 0; }
              if(camera.position.y > 30) camera.position.y = 30;
              
              if(isNaN(yaw)) yaw = 0;
              if(isNaN(pitch)) pitch = 0;
              
              camera.rotation.set(0,0,0,'YXZ');
              camera.rotateY(yaw);
              camera.rotateX(pitch);
              
              renderer.render(scene, camera);
              } catch(err) {
                 if(!window.loggedErr) { window.loggedErr = true; document.body.innerHTML += '<div style="position:fixed;top:10px;left:10px;background:red;color:white;padding:10px;z-index:9999;font-size:14px;">Loop Error: ' + err.message + '</div>'; }
              }
            }
            loop();
          `;
       }
       gameLogic = threeLogic;
    }
  

    var fullCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Auto Generated Game</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  ${extraHead}
<style>
  body { margin:0; padding:20px; background:#0f172a; color:white; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display:flex; flex-direction:column; align-items:center; touch-action:none; }
  .header { display:flex; justify-content:space-between; width:100%; max-width:600px; margin-bottom:10px; font-size:20px; font-weight:bold; }
  canvas { background:#1e293b; border:4px solid #3b82f6; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5); cursor:pointer; max-width:100%; object-fit:contain; }
  .instructions { margin-top:15px; color:#94a3b8; font-size:14px; text-align:center; line-height:1.6; }
  .badge { background:#3b82f6; padding:4px 8px; border-radius:4px; font-size:12px; margin:4px; display:inline-block; }
  .controls { display:grid; grid-template-columns:50px 50px 50px; grid-template-rows:50px 50px 50px; gap:5px; margin-top:20px; position:relative; }
  .dbtn { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); border-radius:8px; display:flex; justify-content:center; align-items:center; font-size:20px; user-select:none; }
  .dbtn:active { background:rgba(255,255,255,0.3); }
  ${snSprite}
</style>
</head>
<body>

<div class="header">
  <div>${titleStr} ${uSave ? '<span style="font-size:12px;color:#f59e0b">(HS: <span id="hs">0</span>)</span>' : ''}</div>
  <div>${type==='3d_voxel'?'Blocks:':'Score:'} <span id="score">0</span></div>
</div>

<div style="position:relative;">
  <canvas id="gameCanvas" width="600" height="400"></canvas>
  ${is3D ? '<div id="crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:100;"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="1.5" fill="white"/><line x1="10" y1="3" x2="10" y2="7" stroke="white" stroke-width="1.5"/><line x1="10" y1="13" x2="10" y2="17" stroke="white" stroke-width="1.5"/><line x1="3" y1="10" x2="7" y2="10" stroke="white" stroke-width="1.5"/><line x1="13" y1="10" x2="17" y2="10" stroke="white" stroke-width="1.5"/></svg></div>' : ''}
  <div id="startMsg" style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.65);border-radius:8px;pointer-events:none;">
    ${type==='3d_voxel' ? '<h2 style="color:#4caf50;margin:0 0 10px">🧱 3D Voxel Builder</h2><p style="color:white;font-size:14px;margin:0 0 8px">👆 Click to start / Cliquez pour commencer</p><p style="color:#94a3b8;font-size:12px;margin:0">WASD/ZQSD = Move/Bouger | 🖱️ L-Click = Place | R-Click = Remove</p>' : (is3D ? '<h2 style="color:#3b82f6;margin:0 0 10px">🌲 Mystic 3D Forest</h2><p style="color:white;font-size:14px;margin:0 0 8px">👆 Click to start / Cliquez pour commencer</p><p style="color:#94a3b8;font-size:12px;margin:0">WASD/ZQSD = Move/Bouger | Shift = Sprint</p>' : '<span style="font-size:28px">▶ Click to Start / Commencer!</span>')}
  </div>
</div>
${type==='3d_voxel' ? '<div id="blockSelector" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:10px;padding:8px;background:rgba(0,0,0,0.5);border-radius:10px;max-width:620px;"><span style="color:#94a3b8;font-size:11px;font-weight:700;align-self:center;margin-right:4px;">🧱 BLOCK / BLOC:</span></div>' : ''}

${snMobile}

<div class="instructions">
  ${type==='3d_voxel' ? '🖱️ <b>L-Click</b> = Place | <b>R-Click</b> = Remove/Effacer | <b>WASD/ZQSD</b> = Move/Bouger | <b>Space</b> = Jump/Sauter<br>' : (is3D ? '🖱️ <b>Mouse/Souris</b> = Look/Regarder | <b>WASD/ZQSD/Arrows</b> = Move/Bouger | <b>Shift</b> = Sprint<br>' : '🕹️ <b>Controls/Contrôles:</b> WASD / ZQSD / Arrows / Touch to play.<br>')}
  Active Modules: <br> ${badges.map(b => '<span class="badge">'+b+'</span>').join('')}
  ${uLead ? '<br><br>🏆 <b>Leaderboard:</b> AI King (9999)' : ''}
</div>

<script>
  window.onerror = function(msg, url, line, col, err) {
     if(!window.loggedErrGlobal) {
        window.loggedErrGlobal = true;
        document.body.innerHTML += '<div style="position:fixed;top:50px;left:10px;background:darkred;color:white;padding:10px;z-index:9999;font-size:14px;border-radius:4px;">Global Error: ' + msg + ' (Line: ' + line + ')</div>';
     }
  };
  
  window.keys = window.keys || {};
// --- CORE MODULES ---
${snMap}
${snFSM}
${snRPG}
${snAudio}
${snMulti}
${snMath}
${snLead}
${snAssets}

// --- ADVANCED FX ---
${snParticles}
${snWeather}
${snSave}

if(document.getElementById('hs')) document.getElementById('hs').innerText = highScore;

${gameLogic}
</script>
</body>
</html>`;

    if (typeof overwrite !== 'undefined') window._injectGDSCode(fullCode, overwrite);
  };

  window._gCell = 1;
  window._gMap = new Array(100).fill(0);
  window.toggleCell = function(i){
    var c=["#0f172a","#10b981","#3b82f6","#f59e0b"];
    window._gMap[i]=window._gCell;
    var el = document.getElementById("cell"+i);
    if(el) el.style.background=c[window._gCell];
  };
  window.exportMap = function(overwrite){
    var m=[];
    for(var r=0;r<10;r++)m.push(window._gMap.slice(r*10,(r+1)*10).join(","));
    var code="const MAP = [\n  "+m.map(r=>"["+r+"]").join(",\n  ")+"\n];";
    var out = document.getElementById("map-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window._pColor = "#f43f5e";
  window.paintPx = function(i){
    var el = document.getElementById("px"+i);
    if(el) el.style.background=window._pColor;
  };
  window.exportSprite = function(overwrite){
    var bs=[];
    for(var i=0;i<64;i++){
      var px = document.getElementById("px"+i);
      if(!px) continue;
      var bg=px.style.background;
      if(bg && bg!=='rgb(15, 23, 42)' && bg!=='#0f172a'){
         var x=(i%8)*20; var y=Math.floor(i/8)*20;
         bs.push(x+"px "+y+"px 0 "+bg);
      }
    }
    var code=".sprite {\n  width: 20px;\n  height: 20px;\n  background: transparent;\n  box-shadow: " + (bs.join(",\n    ")||"none") + ";\n}";
    var out = document.getElementById("spr-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.generateRPGCode = function(overwrite){
    var n=document.getElementById("rpg-name").value;
    var stats={
      HP:parseInt(document.getElementById("rpg-hp").value),
      MP:parseInt(document.getElementById("rpg-mp").value),
      STR:parseInt(document.getElementById("rpg-str").value),
      DEF:parseInt(document.getElementById("rpg-def").value),
      SPD:parseInt(document.getElementById("rpg-spd").value),
      LCK:parseInt(document.getElementById("rpg-lck").value)
    };
    var code="const character = {\n  name: '"+ n +"',\n  level: 1,\n  exp: 0,\n  stats: "+JSON.stringify(stats,null,2)+"\n};";
    var out = document.getElementById("rpg-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.genLeaderboard = function(overwrite){
    var code = "// Leaderboard System\nconst leaderboard = {\n  scores: [],\n  add(name, score) {\n    this.scores.push({name, score, date: new Date().toISOString()});\n    this.scores.sort((a,b)=>b.score-a.score);\n    if(this.scores.length>10) this.scores=this.scores.slice(0,10);\n  },\n  render(el) {\n    var html = '';\n    for(var i=0; i<this.scores.length; i++) {\n      var s = this.scores[i];\n      var badge = i<3 ? ['🥇','🥈','🥉'][i] : ('#'+(i+1));\n      html += '<div class=\"lb-row\"><span>'+badge+'</span> <span>'+s.name+'</span> <span>'+s.score+'</span></div>';\n    }\n    el.innerHTML = html;\n  }\n};\n\nleaderboard.add('Player1', 1250);\nleaderboard.add('Player2', 980);";
    var out = document.getElementById("lb-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.publishGame = function(overwrite){
    var type=document.getElementById("pub-type").value;
    var title=document.getElementById("pub-title").value;
    if(typeof window._gdsGetGameCode === 'function') {
        var code = window._gdsGetGameCode(type,title);
        var blob=new Blob([code],{type:"text/html"});
        var a=document.createElement("a");
        a.href=URL.createObjectURL(blob);
        a.download=title.replace(/ /g,"_")+".html";
        a.click();
        if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
    }
  };

  window.generateFSMCode = function(overwrite){
    var n=document.getElementById("fsm-name").value;
    var states=document.getElementById("fsm-states").value.split(',').map(s=>s.trim()).filter(s=>s);
    var code="class "+n+"FSM {\n  constructor() {\n    this.states = "+JSON.stringify(states)+";\n    this.currentState = '"+(states[0]||'IDLE')+"';\n  }\n  update() {\n    switch(this.currentState) {\n";
    states.forEach(s => { code += "      case '"+s+"':\n        this.update"+s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()+"();\n        break;\n"; });
    code += "    }\n  }\n";
    states.forEach(s => { code += "  update"+s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()+"() {\n    // Logic for "+s+"\n  }\n"; });
    code += "}";
    var out = document.getElementById("fsm-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window._audioCtx = null;
  window.playTone = function(type) {
    if(!window._audioCtx) window._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = window._audioCtx.createOscillator();
    var gain = window._audioCtx.createGain();
    osc.connect(gain); gain.connect(window._audioCtx.destination);
    var now = window._audioCtx.currentTime;
    if(type==='jump') {
      osc.type = 'square'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
      gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
    } else if(type==='shoot') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, now); osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
      gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } else if(type==='coin') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(1000, now); osc.frequency.setValueAtTime(1500, now + 0.1);
      gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    }
  };
  window.genAudioCode = function(overwrite){
    var code = "const AudioFX = {\n  ctx: new (window.AudioContext || window.webkitAudioContext)(),\n  play(type) {\n    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();\n    osc.connect(gain); gain.connect(this.ctx.destination);\n    const now = this.ctx.currentTime;\n    if(type==='jump'){\n      osc.type='square'; osc.frequency.setValueAtTime(150,now); osc.frequency.exponentialRampToValueAtTime(300,now+0.2);\n      gain.gain.setValueAtTime(0.2,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.2);\n      osc.start(now); osc.stop(now+0.2);\n    } else if(type==='shoot'){\n      osc.type='sawtooth'; osc.frequency.setValueAtTime(300,now); osc.frequency.exponentialRampToValueAtTime(50,now+0.15);\n      gain.gain.setValueAtTime(0.2,now); gain.gain.exponentialRampToValueAtTime(0.01,now+0.15);\n      osc.start(now); osc.stop(now+0.15);\n    }\n  }\n};";
    var out = document.getElementById("audio-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.genMultiCode = function(overwrite){
    var type = document.getElementById('multi-type').value;
    var code = '';
    if(type === 'ws_server') {
      code = "const WebSocket = require('ws');\nconst wss = new WebSocket.Server({ port: 8080 });\nlet players = {};\n\nwss.on('connection', function connection(ws) {\n  ws.id = Math.random().toString(36).substr(2, 9);\n  players[ws.id] = { x: 0, y: 0 };\n\n  ws.on('message', function incoming(message) {\n    const data = JSON.parse(message);\n    if(data.type === 'move') {\n      players[ws.id].x = data.x;\n      players[ws.id].y = data.y;\n      wss.clients.forEach(client => {\n        if (client.readyState === WebSocket.OPEN) {\n          client.send(JSON.stringify({ type: 'state', players }));\n        }\n      });\n    }\n  });\n\n  ws.on('close', () => {\n    delete players[ws.id];\n  });\n});";
    } else {
      code = "const ws = new WebSocket('ws://localhost:8080');\nlet players = {};\n\nws.onopen = () => {\n  console.log('Connected to server');\n  setInterval(() => {\n    ws.send(JSON.stringify({ type: 'move', x: Math.random()*100, y: Math.random()*100 }));\n  }, 100);\n};\n\nws.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  if(data.type === 'state') {\n    players = data.players;\n  }\n};";
    }
    var out = document.getElementById("multi-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.genMathCode = function(overwrite){
    var type = document.getElementById('math-type').value;
    var code = '';
    if(type==='vector') code = "class Vector2D {\n  constructor(x=0,y=0){ this.x=x; this.y=y; }\n  add(v){ return new Vector2D(this.x+v.x, this.y+v.y); }\n  sub(v){ return new Vector2D(this.x-v.x, this.y-v.y); }\n  mult(n){ return new Vector2D(this.x*n, this.y*n); }\n  mag(){ return Math.sqrt(this.x*this.x + this.y*this.y); }\n  normalize(){ let m=this.mag(); return m!==0 ? this.mult(1/m) : new Vector2D(); }\n}";
    else if(type==='aabb') code = "function checkCollisionAABB(rect1, rect2) {\n  return (rect1.x < rect2.x + rect2.width &&\n          rect1.x + rect1.width > rect2.x &&\n          rect1.y < rect2.y + rect2.height &&\n          rect1.y + rect1.height > rect2.y);\n}";
    else code = "function checkCollisionCircle(circle1, circle2) {\n  let dx = circle1.x - circle2.x;\n  let dy = circle1.y - circle2.y;\n  let distance = Math.sqrt(dx * dx + dy * dy);\n  return distance < circle1.radius + circle2.radius;\n}";
    var out = document.getElementById("math-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };

  window.genAssetCode = function(overwrite){
    var type = document.getElementById('asset-type').value;
    var b64 = '';
    if(type === 'player') b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHklEQVQYV2NkYGD4z0ABYBw1gGEWDBBhMopwGEQFAwCrBwX5+Wc3NAAAAABJRU5ErkJggg==';
    else if(type === 'enemy') b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhmOAwBVEBANIHBfmoQ2PNAAAAAElFTkSuQmCC';
    else b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHUlEQVQYV2NkYGD4z0ABYBw1gGEWDBBhEodBjKICAMtJBfmkqM9jAAAAAElFTkSuQmCC';
    var code = "const "+type+"Image = new Image();\n"+type+"Image.src = '"+b64+"';";
    var out = document.getElementById("asset-out");
    if(out) out.innerText=code;
    if(typeof overwrite !== 'undefined') window._injectGDSCode(code, overwrite);
  };
})();
