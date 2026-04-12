'use strict';
/* IA Architecte — Games Library (AuraGen Arcade) | EN/FR */

window.GAMES_DATA = [
  {
    icon: '🐍',
    en: 'Retro Snake',
    fr: 'Le Serpent Rétro',
    desc_en: 'Classic arcade snake with adjustable difficulty.',
    desc_fr: 'Le classique serpent d\'arcade avec difficulté ajustable.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AuraGen Arcade — Retro Snake</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    #game-canvas { border: 4px solid #3b82f6; border-radius: 12px; background: #000; box-shadow: 0 0 30px rgba(59,130,246,0.3); }
    .hud { margin-bottom: 20px; text-align: center; }
    .score { font-size: 24px; font-weight: 800; color: #3b82f6; }
    .controls-hint { margin-top: 15px; font-size: 13px; color: #64748b; }
    .game-over { position: absolute; background: rgba(15, 23, 42, 0.95); padding: 30px; border-radius: 16px; border: 1px solid rgba(59,130,246,0.2); text-align: center; display: none; }
    .game-over h2 { color: #ef4444; margin-top: 0; }
    .btn { background: #3b82f6; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="hud"><div class="score">Score: <span id="score-val">0</span></div></div>
  <canvas id="game-canvas" width="400" height="400"></canvas>
  <div class="controls-hint">Use Arrow Keys to Move (W,A,S,D also work)</div>
  <div class="game-over" id="game-over">
    <h2>GAME OVER</h2>
    <p>Final Score: <span id="final-score">0</span></p>
    <button class="btn" onclick="resetGame()">Play Again</button>
  </div>
  <script>
    const canvas = document.getElementById('game-canvas'), ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score-val'), gameOverEl = document.getElementById('game-over'), finalScoreEl = document.getElementById('final-score');
    const gridSize = 20, tileCount = 20;
    let snake = [{x: 10, y: 10}], food = {x: 15, y: 15}, dx = 0, dy = 0, nextDx = 0, nextDy = 0, score = 0, gameActive = true;

    document.addEventListener('keydown', e => {
      const key = e.key.toLowerCase();
      if ((key === 'arrowup' || key === 'w') && dy === 0) { nextDx = 0; nextDy = -1; }
      if ((key === 'arrowdown' || key === 's') && dy === 0) { nextDx = 0; nextDy = 1; }
      if ((key === 'arrowleft' || key === 'a') && dx === 0) { nextDx = -1; nextDy = 0; }
      if ((key === 'arrowright' || key === 'd') && dx === 0) { nextDx = 1; nextDy = 0; }
    });

    function draw() {
      if (!gameActive) return;
      dx = nextDx; dy = nextDy;
      if (dx === 0 && dy === 0) { render(); return; }

      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.some(s => s.x === head.x && s.y === head.y)) {
        gameActive = false; finalScoreEl.textContent = score; gameOverEl.style.display = 'block'; return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10; scoreEl.textContent = score; spawnFood();
      } else { snake.pop(); }
      render();
    }

    function render() {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1e293b';
      for(let i=0; i<tileCount; i++) {
        ctx.beginPath(); ctx.moveTo(i*gridSize, 0); ctx.lineTo(i*gridSize, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i*gridSize); ctx.lineTo(canvas.width, i*gridSize); ctx.stroke();
      }
      ctx.fillStyle = '#3b82f6';
      snake.forEach((p, i) => {
        ctx.fillStyle = i === 0 ? '#60a5fa' : '#3b82f6';
        ctx.fillRect(p.x * gridSize + 1, p.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI*2); ctx.fill();
    }

    function spawnFood() {
      food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      if (snake.some(s => s.x === food.x && s.y === food.y)) spawnFood();
    }

    function resetGame() {
      snake = [{x: 10, y: 10}]; dx = 0; dy = 0; nextDx = 0; nextDy = 0; score = 0;
      scoreEl.textContent = score; gameActive = true; gameOverEl.style.display = 'none'; spawnFood();
    }
    setInterval(draw, 100);
  </script>
</body>
</html>`
  },
  {
    icon: '🏓',
    en: 'Cyber Pong',
    fr: 'Cyber Pong',
    desc_en: 'Minimalist neon pong vs AI. First to 11 wins.',
    desc_fr: 'Le pong néon minimaliste vs IA. Premier à 11 gagne.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyber Pong</title>
  <style>
    body { background: #020617; color: #fff; font-family: 'Inter', sans-serif; height: 100vh; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
    #pong { background: #000; border: 2px solid #10b981; border-radius: 10px; box-shadow: 0 0 40px rgba(16,185,129,0.25); }
    .score-board { display: flex; gap: 80px; font-size: 48px; font-weight: 900; color: #10b981; margin-bottom: 20px; }
    .hint { margin-top: 20px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="score-board">
    <div id="p1-score">0</div>
    <div id="p2-score">0</div>
  </div>
  <canvas id="pong" width="600" height="400"></canvas>
  <div class="hint">Move Cursor to Control your Paddle</div>

  <script>
    const canvas = document.getElementById('pong');
    const ctx = canvas.getContext('2d');
    const p1s = document.getElementById('p1-score');
    const p2s = document.getElementById('p2-score');

    const ball = { x: 300, y: 200, radius: 7, speed: 5, dx: 5, dy: 5, color: "#fff" };
    const user = { x: 10, y: 150, width: 10, height: 100, score: 0, color: "#10b981" };
    const ai = { x: 580, y: 150, width: 10, height: 100, score: 0, color: "#10b981" };

    function drawRect(x, y, w, h, color) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }
    function drawCircle(x, y, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill(); }
    function drawNet() { for(let i=0; i<canvas.height; i+=30) drawRect(298, i, 4, 15, "#1e293b"); }

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      user.y = (e.clientY - rect.top) * (canvas.height / rect.height) - user.height / 2;
    });

    function collision(b, p) {
      return b.x + b.radius > p.x && b.x - b.radius < p.x + p.width &&
             b.y + b.radius > p.y && b.y - b.radius < p.y + p.height;
    }

    function resetBall() {
      ball.x = canvas.width / 2; ball.y = canvas.height / 2;
      ball.speed = 5; ball.dx = -ball.dx;
    }

    function update() {
      ball.x += ball.dx; ball.y += ball.dy;
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy = -ball.dy;

      const player = (ball.x < canvas.width / 2) ? user : ai;
      if (collision(ball, player)) {
        let collidePoint = (ball.y - (player.y + player.height/2)) / (player.height/2);
        let angle = (Math.PI/4) * collidePoint;
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.dx = direction * ball.speed * Math.cos(angle);
        ball.dy = ball.speed * Math.sin(angle);
        ball.speed += 0.2;
      }

      if (ball.x - ball.radius < 0) { ai.score++; p2s.textContent = ai.score; resetBall(); }
      else if (ball.x + ball.radius > canvas.width) { user.score++; p1s.textContent = user.score; resetBall(); }

      ai.y += (ball.y - (ai.y + ai.height/2)) * 0.1;
    }

    function render() {
      drawRect(0, 0, canvas.width, canvas.height, "#000");
      drawNet();
      drawRect(user.x, user.y, user.width, user.height, user.color);
      drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
      drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    function game() { update(); render(); }
    setInterval(game, 1000/60);
  </script>
</body>
</html>`
  },
  {
    icon: '🧱',
    en: 'Block Breaker',
    fr: 'Casse Briques',
    desc_en: 'Smooth arcade breakout with colorful levels.',
    desc_fr: 'Casse-briques arcade fluide avec des niveaux colorés.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #131b28; color: #fff; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow:hidden; font-family: sans-serif; }
    #canvas { background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: none; }
    .info { position: absolute; top: 30px; display: flex; gap: 40px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
    strong { color: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="info">Score: <strong id="score">0</strong> | Lives: <strong id="lives">3</strong></div>
  <canvas id="canvas" width="480" height="320"></canvas>
  <div id="msg"><h1 id="txt" style="color:#ef4444">GAME OVER</h1><button class="btn" onclick="location.reload()">REPLAY</button></div>

  <script>
    const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
    const scoreVal = document.getElementById("score"), livesVal = document.getElementById("lives");
    let score = 0, lives = 3, ballRadius = 8, x = canvas.width/2, y = canvas.height-30;
    let dx = 3, dy = -3, paddleHeight = 10, paddleWidth = 75, paddleX = (canvas.width-paddleWidth)/2;
    let rowCount = 3, colCount = 5, bWidth = 75, bHeight = 20, bPadding = 10, bOffTop = 30, bOffLeft = 30, active = true;

    let bricks = [];
    for(let c=0; c<colCount; c++) {
      bricks[c] = [];
      for(let r=0; r<rowCount; r++) bricks[c][r] = { x: 0, y: 0, status: 1 };
    }

    canvas.addEventListener("mousemove", e => {
      paddleX = e.offsetX - paddleWidth/2;
      if(paddleX < 0) paddleX = 0; if(paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    });

    function draw() {
      if(!active) return;
      ctx.clearRect(0,0, canvas.width, canvas.height);
      for(let c=0; c<colCount; c++) {
        for(let r=0; r<rowCount; r++) {
          let b = bricks[c][r];
          if(b.status === 1) {
            let bX = (c*(bWidth+bPadding))+bOffLeft, bY = (r*(bHeight+bPadding))+bOffTop;
            b.x = bX; b.y = bY;
            ctx.fillStyle = r===0?'#3b82f6':r===1?'#8b5cf6':'#ec4899';
            ctx.fillRect(bX, bY, bWidth, bHeight);
            if(x > bX && x < bX+bWidth && y > bY && y < bY+bHeight) { dy = -dy; b.status = 0; score++; scoreVal.textContent = score; }
          }
        }
      }
      if(score === rowCount*colCount) { active = false; document.getElementById('msg').style.display='flex'; document.getElementById('txt').textContent='YOU WIN!'; document.getElementById('txt').style.color='#10b981'; }

      ctx.beginPath(); ctx.arc(x, y, ballRadius, 0, Math.PI*2); ctx.fillStyle = "#fff"; ctx.fill(); ctx.closePath();
      ctx.fillStyle = "#3b82f6"; ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);

      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) dx = -dx;
      if(y + dy < ballRadius) dy = -dy;
      else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) dy = -dy;
        else {
          lives--; livesVal.textContent = lives;
          if(!lives) { active = false; document.getElementById('msg').style.display='flex'; }
          else { x = canvas.width/2; y = canvas.height-30; dx = 3; dy = -3; }
        }
      }
      x += dx; y += dy; requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '🐦',
    en: 'Sky Bird',
    fr: 'L\'Oiseau du Ciel',
    desc_en: 'Flappy-style arcade game with physics and scoring.',
    desc_fr: 'Jeu type "Flappy Bird" avec physique et scores.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sky Bird</title>
  <style>
    body { background: #0c0f16; color: #fff; margin:0; overflow:hidden; font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; }
    #canvas { background: linear-gradient(180deg, #1e293b, #0f172a); border: 2px solid #3b82f6; border-radius: 12px; cursor: pointer; }
    .ui { position:absolute; top:40px; font-size:32px; font-weight:900; color:#3b82f6; }
    .hint { position:absolute; bottom:40px; color:#64748b; font-size:14px; }
  </style>
</head>
<body>
  <div class="ui" id="score">0</div>
  <canvas id="canvas" width="360" height="580"></canvas>
  <div class="hint">Click or Space to Flap</div>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const scoreUI = document.getElementById('score');

    let bird = { x: 50, y: 150, w: 30, h: 24, velocity: 0, gravity: 0.25, jump: 4.6 };
    let pipes = [];
    let score = 0;
    let gameStarted = false;
    let gameOver = false;

    function addPipe() {
      let gap = 150;
      let pos = Math.random() * (canvas.height - gap - 100) + 50;
      pipes.push({ x: canvas.width, y: pos, gap: gap, w: 50, passed: false });
    }

    function jump() {
      if(gameOver) { reset(); return; }
      if(!gameStarted) gameStarted = true;
      bird.velocity = -bird.jump;
    }

    function reset() {
      bird.y = 150; bird.velocity = 0; pipes = []; score = 0; scoreUI.textContent = 0;
      gameStarted = false; gameOver = false;
    }

    document.addEventListener('keydown', e => { if(e.code==='Space') jump(); });
    canvas.addEventListener('mousedown', jump);

    function update() {
      if(!gameStarted || gameOver) return;

      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      if(bird.y > canvas.height || bird.y < 0) gameOver = true;

      if(frameCount % 100 === 0) addPipe();

      pipes.forEach((p, i) => {
        p.x -= 3;
        if(!p.passed && bird.x > p.x + p.w) { score++; scoreUI.textContent = score; p.passed = true; }
        if(bird.x + bird.w - 5 > p.x && bird.x + 5 < p.x + p.w) {
          if(bird.y + 5 < p.y || bird.y + bird.h - 5 > p.y + p.gap) gameOver = true;
        }
      });
      pipes = pipes.filter(p => p.x > -p.w);
    }

    let frameCount = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Bird
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
      // Pipes
      ctx.fillStyle = "#10b981";
      pipes.forEach(p => {
        ctx.fillRect(p.x, 0, p.w, p.y);
        ctx.fillRect(p.x, p.y + p.gap, p.w, canvas.height);
      });
      if(!gameStarted && !gameOver) {
        ctx.fillStyle = "#fff"; ctx.textAlign="center";
        ctx.font = "20px sans-serif"; ctx.fillText("CLICK TO START", canvas.width/2, canvas.height/2);
      }
      if(gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "#ef4444"; ctx.font = "30px sans-serif"; ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
      }
      frameCount++; update(); requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '🚀',
    en: 'Star Defender',
    fr: 'Star Defender',
    desc_en: 'Space invaders classic shooter with powerups.',
    desc_fr: 'Shooter d\'arcade classique avec améliorations.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; color: #fff; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; overflow:hidden; font-family: sans-serif; }
    #canvas { background: #000; border: 2px solid #3b82f6; border-radius: 8px; cursor: crosshair; }
    .score { position:absolute; top:20px; font-size:24px; color:#3b82f6; font-weight:800; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="score" id="score">SCORE: 0</div>
  <canvas id="canvas" width="600" height="500"></canvas>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>

  <script>
    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d'), scoreUI = document.getElementById('score');
    let ship = { x: 275, y: 440, w: 50, h: 30 }, bullets = [], enemies = [], score = 0, frame = 0, active = true;

    canvas.addEventListener('mousemove', e => { ship.x = e.offsetX - ship.w/2; });
    canvas.addEventListener('mousedown', () => { if(active) bullets.push({ x: ship.x + ship.w/2 - 2, y: ship.y, w: 4, h: 12 }); });

    function spawn() { enemies.push({ x: Math.random()*(canvas.width-40), y: -40, w: 40, h: 30, s: 2 + Math.random()*3 }); }

    function draw() {
      if(!active) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6"; ctx.beginPath(); ctx.moveTo(ship.x, ship.y+ship.h); ctx.lineTo(ship.x+ship.w/2, ship.y); ctx.lineTo(ship.x+ship.w, ship.y+ship.h); ctx.fill();
      
      bullets.forEach((b,i) => { b.y -= 10; ctx.fillStyle = "#f59e0b"; ctx.fillRect(b.x, b.y, b.w, b.h); if(b.y < 0) bullets.splice(i,1); });
      
      enemies.forEach((e,i) => {
        e.y += e.s; ctx.fillStyle = "#ef4444"; ctx.fillRect(e.x, e.y, e.w, e.h);
        if(e.y > canvas.height) { enemies.splice(i,1); score = Math.max(0, score-5); scoreUI.textContent = 'SCORE: '+score; }
        if(ship.x < e.x+e.w && ship.x+ship.w > e.x && ship.y < e.y+e.h && ship.y+ship.h > e.y) { 
          active = false; document.getElementById('msg').style.display='flex'; document.getElementById('fs').textContent = 'Final Score: ' + score; 
        }
        bullets.forEach((b,bi) => {
          if(b.x < e.x+e.w && b.x+b.w > e.x && b.y < e.y+e.h && b.y+b.h > e.y) { enemies.splice(i,1); bullets.splice(bi,1); score+=10; scoreUI.textContent = 'SCORE: '+score; }
        });
      });

      if(frame % 30 === 0) spawn();
      frame++; requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '🦒',
    en: 'Desert Dino',
    fr: 'Dino du Désert',
    desc_en: 'Infinite desert jump game (Dino-style).',
    desc_fr: 'Jeu de saut infini dans le désert (style Dino).',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Desert Dino</title>
  <style>
    body { background: #18181b; color: #fff; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; font-family:sans-serif; }
    #canvas { background: #fafaf9; border-bottom: 4px solid #444; }
    .score { font-size: 24px; font-weight: 800; color: #444; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="score" id="score">00000</div>
  <canvas id="canvas" width="800" height="200"></canvas>
  <p style="color:#64748b; margin-top:15px">Press SPACE or Click to JUMP</p>

  <script>
    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d'), scoreUI = document.getElementById('score');
    let dino = { x: 50, y: 150, w: 40, h: 40, velocity: 0, gravity: 1, jump: -15, isGrounded: true };
    let obstacles = [], score = 0, gameSpeed = 5, frame = 0;

    function reset() { obstacles = []; score = 0; gameSpeed = 5; dino.y = 150; }
    function jump() { if(dino.isGrounded) { dino.velocity = dino.jump; dino.isGrounded = false; } }
    document.addEventListener('keydown', e => { if(e.code==='Space') jump(); });
    canvas.addEventListener('mousedown', jump);

    function update() {
      dino.velocity += dino.gravity; dino.y += dino.velocity;
      if(dino.y > 150) { dino.y = 150; dino.velocity = 0; dino.isGrounded = true; }

      if(frame % Math.floor(100 / (gameSpeed/5)) === 0) obstacles.push({ x: canvas.width, w: 20 + Math.random()*30, h: 30 + Math.random()*40 });

      obstacles.forEach((o, i) => {
        o.x -= gameSpeed;
        if(o.x + o.w < 0) { obstacles.splice(i, 1); score++; scoreUI.textContent = score.toString().padStart(5, '0'); gameSpeed += 0.05; }
        if(dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y + dino.h > 200 - o.h) { reset(); }
      });
    }

    function draw() {
      ctx.clearRect(0,0,canvas.width, canvas.height); ctx.fillStyle = "#555";
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h); // Dino
      ctx.fillStyle = "#ef4444";
      obstacles.forEach(o => ctx.fillRect(o.x, 200-o.h, o.w, o.h)); // Obstacles
      ctx.strokeStyle = "#444"; ctx.beginPath(); ctx.moveTo(0,190); ctx.lineTo(canvas.width,190); ctx.stroke();
      frame++; update(); requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '📊',
    en: 'Grid Defense',
    fr: 'Grid Defense',
    desc_en: 'Strategy grid defense against falling items.',
    desc_fr: 'Défense de grille stratégique contre les objets qui tombent.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; color: #fff; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; font-family:sans-serif; }
    .grid { display:grid; grid-template-columns: repeat(5, 60px); gap:10px; background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; border:1px solid rgba(255,255,255,0.1); }
    .cell { width: 60px; height: 60px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; }
    .cell:hover { background: rgba(59,130,246,0.1); }
    .enemy { color: #ef4444; animation: drop 0.5s ease; }
    @keyframes drop { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .score { font-size:32px; font-weight:800; color:#3b82f6; margin-bottom:20px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="score" id="score">0</div>
  <div class="grid" id="grid"></div>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">TRY AGAIN</button></div>

  <script>
    const grid = document.getElementById('grid'), scoreUI = document.getElementById('score');
    let cells = [], score = 0, enemies = 0, active = true;
    for(let i=0; i<25; i++) {
      let c = document.createElement('div'); c.className = 'cell';
      c.onclick = () => { if(active && c.innerHTML !== '') { c.innerHTML = ''; score += 10; enemies--; scoreUI.textContent = score; } };
      grid.appendChild(c); cells.push(c);
    }
    function spawn() {
      if(!active) return;
      let empty = cells.filter(c => c.innerHTML === '');
      if(empty.length === 0) { 
        active = false; document.getElementById('msg').style.display='flex'; 
        document.getElementById('fs').textContent = 'Score: ' + score; return; 
      }
      let target = empty[Math.floor(Math.random()*empty.length)];
      target.innerHTML = '<span class="enemy">👾</span>'; enemies++;
      setTimeout(spawn, Math.max(200, 1000 - score/10));
    }
    spawn();
  </script>
</body>
</html>`
  },
  {
    icon: '🧶',
    en: 'Simon Logic',
    fr: 'Simon Logique',
    desc_en: 'Classic color sequence memory game.',
    desc_fr: 'Le classique jeu de mémoire visuelle.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; color: #fff; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; font-family:sans-serif; }
    .board { display:grid; grid-template-columns: 1fr 1fr; gap:15px; }
    .pad { width:120px; height:120px; border-radius:15px; cursor:pointer; opacity:0.4; transition:0.2s; }
    .pad.active { opacity:1; transform:scale(1.05); }
    #green { background:#10b981; } #red { background:#ef4444; } #yellow { background:#f59e0b; } #blue { background:#3b82f6; }
    .score { font-size:32px; font-weight:800; margin-bottom:30px; }
    .btn { padding:10px 30px; background:#3b82f6; border:none; border-radius:8px; color:#fff; font-weight:700; cursor:pointer; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
  </style>
</head>
<body>
  <div class="score" id="level">Level: 1</div>
  <div class="board">
    <div class="pad" id="green" onclick="tap('green')"></div>
    <div class="pad" id="red" onclick="tap('red')"></div>
    <div class="pad" id="yellow" onclick="tap('yellow')"></div>
    <div class="pad" id="blue" onclick="tap('blue')"></div>
  </div>
  <button class="btn" id="start" style="margin-top:30px">START GAME</button>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>

  <script>
    let sequence = [], userSequence = [], level = 1, active = false;
    const colors = ['green', 'red', 'yellow', 'blue'];
    const startBtn = document.getElementById('start');

    function nextLevel() {
      userSequence = []; level++; document.getElementById('level').textContent = 'Level: ' + level;
      sequence.push(colors[Math.floor(Math.random()*4)]); playSequence();
    }
    function playSequence() {
      active = false;
      sequence.forEach((c, i) => {
        setTimeout(() => { flash(c); if(i === sequence.length - 1) active = true; }, (i + 1) * 600);
      });
    }
    function flash(c) {
      const el = document.getElementById(c); el.classList.add('active');
      setTimeout(() => el.classList.remove('active'), 300);
    }
    function tap(c) {
      if(!active) return;
      flash(c); userSequence.push(c);
      if(userSequence[userSequence.length-1] !== sequence[userSequence.length-1]) {
        active = false; document.getElementById('msg').style.display='flex'; document.getElementById('fs').textContent = 'Reached Level: ' + level;
      } else if(userSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
      }
    }
    startBtn.onclick = () => {
      startBtn.style.display = 'none';
      sequence = [colors[Math.floor(Math.random()*4)]]; playSequence();
    };
  </script>`
  },
  {
    icon: '🧱',
    en: 'Tetra Stack',
    fr: 'Tetra Stack',
    desc_en: 'Falling block stacker game.',
    desc_fr: 'Jeu d\'empilement de blocs tombants.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tetra Stack</title>
  <style>
    body { background: #020617; color: #fff; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; overflow:hidden; }
    #canvas { background:#000; border:2px solid #3b82f6; border-radius:8px; }
    .ui { position:absolute; left:20px; top:20px; }
    .score { font-size:32px; font-weight:800; color:#3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="ui"><div class="score" id="score">0</div><p>Arrows to Move & Rotate</p></div>
  <canvas id="canvas" width="240" height="400"></canvas>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>

  <script>
    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d'), scoreUI = document.getElementById('score');
    const cols = 10, rows = 20, size = 20;
    let board = Array.from({length: rows}, () => Array(cols).fill(0)), score = 0, active = true;

    const shapes = [
      [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,1,0],[0,1,1]], [[0,1,1],[1,1,0]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]]
    ];

    let piece = { pos: {x: 3, y: 0}, shape: shapes[Math.floor(Math.random()*shapes.length)], color: '#3b82f6' };

    function collide() {
      for(let y=0; y<piece.shape.length; y++) {
        for(let x=0; x<piece.shape[y].length; x++) {
          if(piece.shape[y][x] && (board[piece.pos.y + y]?.[piece.pos.x + x] !== 0)) return true;
        }
      }
      return false;
    }

    function merge() {
      piece.shape.forEach((row, y) => row.forEach((val, x) => { if(val) board[piece.pos.y + y][piece.pos.x + x] = piece.color; }));
      clearRows();
      piece = { pos: {x: 3, y: 0}, shape: shapes[Math.floor(Math.random()*shapes.length)], color: '#3b82f6' };
      if(collide()) { 
        active = false; document.getElementById('msg').style.display='flex'; 
        document.getElementById('fs').textContent = 'Final Score: ' + score;
      }
    }

    function clearRows() {
      for(let y=rows-1; y>=0; y--) {
        if(board[y].every(v => v !== 0)) {
          board.splice(y, 1); board.unshift(Array(cols).fill(0));
          score += 100; scoreUI.textContent = score; y++;
        }
      }
    }

    function draw() {
      if(!active) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      board.forEach((row,y) => row.forEach((val,x) => { if(val) { ctx.fillStyle = val; ctx.fillRect(x*size, y*size, size-1, size-1); } }));
      piece.shape.forEach((row,y) => row.forEach((val,x) => { if(val) { ctx.fillStyle = piece.color; ctx.fillRect((piece.pos.x+x)*size, (piece.pos.y+y)*size, size-1, size-1); } }));
    }

    document.addEventListener('keydown', e => {
      if(!active) return;
      if(e.key === 'ArrowLeft') { piece.pos.x--; if(collide()) piece.pos.x++; }
      if(e.key === 'ArrowRight') { piece.pos.x++; if(collide()) piece.pos.x--; }
      if(e.key === 'ArrowDown') { piece.pos.y++; if(collide()) { piece.pos.y--; merge(); } }
      if(e.key === 'ArrowUp') { 
        const old = piece.shape; piece.shape = piece.shape[0].map((_, i) => piece.shape.map(row => row[i]).reverse());
        if(collide()) piece.shape = old;
      }
      draw();
    });

    setInterval(() => { if(active) { piece.pos.y++; if(collide()) { piece.pos.y--; merge(); } draw(); } }, 500);
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '🏗️',
    en: 'Skyline Stack',
    fr: 'Skyline Stack',
    desc_en: 'Timing-based tower construction game.',
    desc_fr: 'Jeu de construction de tour basé sur le timing.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skyline Stack</title>
  <style>
    body { background: #0c0f16; color: #fff; margin:0; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; }
    #canvas { background: linear-gradient(180deg, #1e293b, #0f172a); border: 2px solid #3b82f6; border-radius: 12px; }
    .score { font-size:40px; font-weight:900; color:#3b82f6; margin-bottom:10px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="score" id="score">0</div>
  <canvas id="canvas" width="400" height="500"></canvas>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <p id="hint" style="color:#64748b; margin-top:20px">Click to stack the block!</p>

  <script>
    const canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d'), scoreUI = document.getElementById('score');
    let score = 0, speed = 2, blocks = [], current = { x: 0, y: 460, w: 150, h: 40, dir: 1 }, active = true;
    
    function reset() { score = 0; scoreUI.textContent = score; blocks = [{x: 100, y: 460, w: 200, h: 40}]; speed = 2; active = true; document.getElementById('msg').style.display='none'; nextBlock(); }
    function nextBlock() {
      current = { x: 0, y: 460 - (blocks.length * 40), w: blocks[blocks.length-1].w, h: 40, dir: 1 };
      if(current.y < 100) { blocks.forEach(b => b.y += 40); current.y += 40; }
    }

    canvas.addEventListener('mousedown', () => {
      if(!active) return;
      let last = blocks[blocks.length-1];
      if(current.x + current.w < last.x || current.x > last.x + last.w) { 
        active = false; document.getElementById('msg').style.display='flex'; 
        document.getElementById('fs').textContent = 'Final Score: ' + score; 
        return; 
      }
      
      let x1 = Math.max(current.x, last.x), x2 = Math.min(current.x + current.w, last.x + last.w);
      current.x = x1; current.w = x2 - x1;
      blocks.push({...current}); score++; scoreUI.textContent = score; speed += 0.2;
      nextBlock();
    });

    function update() {
      if(!active) return;
      current.x += current.dir * speed;
      if(current.x < 0 || current.x + current.w > canvas.width) current.dir *= -1;
    }

    function draw() {
      ctx.clearRect(0,0,canvas.width, canvas.height);
      blocks.forEach((b, i) => { ctx.fillStyle = 'hsl(' + (210 + i * 10) + ', 70%, 50%)'; ctx.fillRect(b.x, b.y, b.w, b.h); });
      ctx.fillStyle = "#fff"; ctx.fillRect(current.x, current.y, current.w, current.h);
      update(); requestAnimationFrame(draw);
    }
    reset(); draw();
  </script>
</body>
</html>`
  },
  {
    icon: '🔢',
    en: '2048 Fusion',
    fr: 'Fusion 2048',
    desc_en: 'Slide tiles and merge numbers to reach 2048.',
    desc_fr: 'Faites glisser les tuiles et fusionnez pour atteindre 2048.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>2048 Fusion</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { background: #1e293b; padding: 12px; border-radius: 12px; display: grid; grid-template-columns: repeat(4, 90px); grid-template-rows: repeat(4, 90px); gap: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
    .tile { width: 90px; height: 90px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); }
    .t-2 { background: #eee4da; color: #776e65; } .t-4 { background: #ede0c8; color: #776e65; }
    .t-8 { background: #f2b179; color: #fff; } .t-16 { background: #f59563; color: #fff; }
    .t-32 { background: #f67c5f; color: #fff; } .t-64 { background: #f65e3b; color: #fff; }
    .t-128 { background: #edcf72; color: #fff; font-size: 28px; }
    .t-256 { background: #edcc61; color: #fff; font-size: 28px; }
    .t-512 { background: #edc850; color: #fff; font-size: 28px; }
    .t-1024 { background: #edc53f; color: #fff; font-size: 22px; }
    .t-2048 { background: #edc22e; color: #fff; font-size: 22px; }
    h1 { color: #3b82f6; margin-bottom: 20px; font-size: 42px; text-shadow: 0 4px 10px rgba(59,130,246,0.3); }
    .score-container { margin-bottom: 20px; font-size: 24px; font-weight: 700; color: #64748b; }
    #score { color: #3b82f6; font-size: 32px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>2048 Fusion</h1>
  <div class="score-container">Score: <span id="score">0</span></div>
  <div class="grid" id="grid"></div>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <p style="margin-top:20px; color:#64748b">Use Arrow Keys to Slide Tiles</p>

  <script>
    const gridEl = document.getElementById('grid'), scoreEl = document.getElementById('score');
    let board = Array(16).fill(0), score = 0, active = true;

    function spawn() {
      let empty = board.map((v, i) => v === 0 ? i : null).filter(v => v !== null);
      if (empty.length) {
        board[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.9 ? 2 : 4;
      }
    }

    function draw() {
      gridEl.innerHTML = '';
      board.forEach(v => {
        let d = document.createElement('div');
        d.className = 'tile' + (v ? ' t-' + v : '');
        d.textContent = v || '';
        gridEl.appendChild(d);
      });
      scoreEl.textContent = score;
    }

    function slide(row) {
      let r = row.filter(v => v !== 0);
      for (let i = 0; i < r.length - 1; i++) {
        if (r[i] === r[i + 1]) {
          r[i] *= 2; score += r[i]; r[i + 1] = 0;
        }
      }
      r = r.filter(v => v !== 0);
      while (r.length < 4) r.push(0);
      return r;
    }

    function move(dir) {
      if(!active) return;
      let old = JSON.stringify(board);
      for (let i = 0; i < 4; i++) {
        let r = [];
        if (dir === 'L' || dir === 'R') {
          for (let j = 0; j < 4; j++) r.push(board[i * 4 + j]);
          if (dir === 'R') r.reverse();
          r = slide(r);
          if (dir === 'R') r.reverse();
          for (let j = 0; j < 4; j++) board[i * 4 + j] = r[j];
        } else {
          for (let j = 0; j < 4; j++) r.push(board[j * 4 + i]);
          if (dir === 'D') r.reverse();
          r = slide(r);
          if (dir === 'D') r.reverse();
          for (let j = 0; j < 4; j++) board[j * 4 + i] = r[j];
        }
      }
      if (old !== JSON.stringify(board)) {
        spawn(); draw();
        if (board.every(v => v !== 0)) {
          let canMove = false;
          for(let i=0; i<16; i++) {
            if((i%4 < 3 && board[i] === board[i+1]) || (i < 12 && board[i] === board[i+4])) canMove = true;
          }
          if(!canMove) { 
            active = false; document.getElementById('msg').style.display='flex'; 
            document.getElementById('fs').textContent = 'Score: ' + score; 
          }
        }
      }
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') move('L');
      if (e.key === 'ArrowRight') move('R');
      if (e.key === 'ArrowUp') move('U');
      if (e.key === 'ArrowDown') move('D');
    });

    spawn(); spawn(); draw();
  </script>
</body>
</html>`
  },
  {
    icon: '💣',
    en: 'Minesweeper Pro',
    fr: 'Démineur Pro',
    desc_en: 'Classic logic mine-clearing game.',
    desc_fr: 'Le classique jeu de logique et déminage.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Minesweeper Pro</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(10, 35px); gap: 2px; background: #1e293b; padding: 10px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .cell { width: 35px; height: 35px; background: #334155; display: flex; align-items: center; justify-content: center; font-weight: 800; cursor: pointer; user-select: none; border-radius: 4px; transition: 0.1s; }
    .cell:hover { background: #475569; }
    .cell.open { background: #cbd5e1; color: #0f172a; }
    .cell.mine { background: #ef4444; }
    h1 { color: #ef4444; margin-bottom: 20px; text-shadow: 0 0 15px rgba(239,68,68,0.3); }
    .info { margin-top: 20px; color: #64748b; font-size: 14px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Minesweeper Pro</h1>
  <div class="grid" id="grid"></div>
  <div id="msg"><h1 id="txt">GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <div class="info">Left Click to Open | Right Click to Flag</div>
  
  <script>
    const width = 10, minesCount = 15, gridEl = document.getElementById('grid');
    let cells = [], gameOver = false;

    function init() {
      gridEl.innerHTML = ''; cells = []; gameOver = false;
      let minePositions = [];
      while(minePositions.length < minesCount) {
        let r = Math.floor(Math.random() * width * width);
        if(!minePositions.includes(r)) minePositions.push(r);
      }

      for(let i=0; i < width * width; i++) {
        let el = document.createElement('div');
        el.className = 'cell';
        el.onclick = () => click(i);
        el.oncontextmenu = (e) => {
          e.preventDefault();
          if(!gameOver && !cells[i].open) {
            cells[i].flagged = !cells[i].flagged;
            el.textContent = cells[i].flagged ? '🚩' : '';
          }
        };
        gridEl.appendChild(el);
        cells.push({ el, mine: minePositions.includes(i), open: false, flagged: false });
      }
    }

    function getAdj(i) {
      let x = i % width, y = Math.floor(i / width), adj = [];
      for(let dy=-1; dy<=1; dy++) {
        for(let dx=-1; dx<=1; dx++) {
          let nx = x + dx, ny = y + dy;
          if(nx>=0 && nx<width && ny>=0 && ny<width && (dx!==0 || dy!==0)) adj.push(ny*width + nx);
        }
      }
      return adj;
    }

    function click(i) {
      if(gameOver || cells[i].open || cells[i].flagged) return;
      cells[i].open = true;
      cells[i].el.classList.add('open');
      
      if(cells[i].mine) {
        cells[i].el.classList.add('mine');
        cells[i].el.textContent = '💣';
        gameOver = true;
        document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = 'BOOM!';
        document.getElementById('fs').textContent = 'You hit a mine.';
        return;
      }

      let adj = getAdj(i), mines = adj.filter(a => cells[a].mine).length;
      if(mines > 0) {
        cells[i].el.textContent = mines;
        const colors = ['', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#06b6d4', '#000', '#444'];
        cells[i].el.style.color = colors[mines];
      } else {
        adj.forEach(a => click(a));
      }

      if(cells.filter(c => !c.mine && !c.open).length === 0) {
        gameOver = true;
        document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = 'VICTORY!';
        document.getElementById('txt').style.color = '#10b981';
        document.getElementById('fs').textContent = 'Area Cleared.';
      }
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🧩',
    en: '15-Puzzle',
    fr: 'Taquin 15',
    desc_en: 'Slide pieces to order numbers 1-15.',
    desc_fr: 'Glissez les pièces pour ordonner les nombres 1 à 15.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>15-Puzzle</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    .grid { display: grid; grid-template-columns: repeat(4, 75px); gap: 10px; background: #1e293b; padding: 15px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(59,130,246,0.2); }
    .tile { width: 75px; height: 75px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 0 #1d4ed8; }
    .tile:active { transform: translateY(2px); box-shadow: 0 2px 0 #1d4ed8; }
    .tile.empty { background: transparent; cursor: default; border: 2px dashed rgba(255,255,255,0.05); box-shadow: none; }
    h1 { color: #3b82f6; margin-bottom: 20px; font-weight: 900; letter-spacing: -1px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>15 PUZZLE</h1>
  <div class="grid" id="pg"></div>
  <div id="msg"><h1 style="color:#10b981">SOLVED!</h1><button class="btn" onclick="location.reload()">PLAY AGAIN</button></div>
  <button id="shuffle" onclick="init()" style="margin-top:25px; padding:12px 25px; background:#334155; border:none; color:#fff; border-radius:12px; cursor:pointer; font-weight:700;">SHUFFLE BOARD</button>
  
  <script>
    let board = [], active = true;
    const gridEl = document.getElementById('pg');

    function init() {
      board = [...Array(15).keys()].map(x => x + 1);
      board.push(null);
      for(let i=0; i<300; i++) {
        let empty = board.indexOf(null);
        let adj = getAdj(empty);
        let m = adj[Math.floor(Math.random()*adj.length)];
        [board[empty], board[m]] = [board[m], board[empty]];
      }
      active = true; document.getElementById('msg').style.display='none';
      draw();
    }

    function getAdj(i) {
      let x = i % 4, y = Math.floor(i / 4), adj = [];
      if(x > 0) adj.push(i - 1);
      if(x < 3) adj.push(i + 1);
      if(y > 0) adj.push(i - 4);
      if(y < 3) adj.push(i + 4);
      return adj;
    }

    function draw() {
      gridEl.innerHTML = '';
      board.forEach((v, i) => {
        let d = document.createElement('div');
        d.className = 'tile' + (v ? '' : ' empty');
        d.textContent = v || '';
        d.onclick = () => move(i);
        gridEl.appendChild(d);
      });
    }

    function move(i) {
      if(!active) return;
      let empty = board.indexOf(null), x = i % 4, y = Math.floor(i / 4), ex = empty % 4, ey = Math.floor(empty / 4);
      if(Math.abs(x - ex) + Math.abs(y - ey) === 1) {
        [board[i], board[empty]] = [board[empty], board[i]];
        draw();
        if(board.slice(0, 15).every((v, j) => v === j + 1)) {
           active = false; document.getElementById('msg').style.display='flex';
        }
      }
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🎴',
    en: 'Memory Match Pro',
    fr: 'Memory Match Pro',
    desc_en: 'Flip cards and find pairs in record time.',
    desc_fr: 'Retournez les cartes et trouvez les paires.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Memory Match Pro</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(4, 90px); gap: 12px; }
    .card { width: 90px; height: 120px; background: #1e293b; border: 2px solid #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 48px; cursor: pointer; transition: transform 0.4s; transform-style: preserve-3d; position: relative; }
    .card.flipped { transform: rotateY(180deg); }
    .card-front, .card-back { position: absolute; width:100%; height:100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
    .card-front { background: #fff; color: #000; transform: rotateY(180deg); }
    .card-back { background: #1e293b; }
    h1 { color: #3b82f6; margin-bottom: 30px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Memory Pro</h1>
  <div class="grid" id="grid"></div>
  <div id="msg"><h1 style="color:#10b981">VICTORY!</h1><h2>Perfect Memory.</h2><button class="btn" onclick="location.reload()">PLAY AGAIN</button></div>
  <script>
    const symbols = ['🍎','🍌','🍇','🍓','🥝','🍒','🍍','🥥'], cards = [...symbols, ...symbols];
    let flipped = [], matched = [], locks = false;
    const gridEl = document.getElementById('grid');

    function init() {
      gridEl.innerHTML = ''; flipped = []; matched = [];
      cards.sort(() => Math.random() - 0.5);
      cards.forEach((v, i) => {
        let d = document.createElement('div'); d.className = 'card';
        d.innerHTML = '<div class="card-front">'+v+'</div><div class="card-back"></div>';
        d.onclick = () => {
          if(locks || flipped.includes(i) || matched.includes(i)) return;
          d.classList.add('flipped');
          flipped.push(i);
          if(flipped.length === 2) {
            locks = true;
            let [a, b] = flipped;
            if(cards[a] === cards[b]) {
              matched.push(a, b); flipped = []; locks = false;
              if(matched.length === cards.length) {
                setTimeout(() => { document.getElementById('msg').style.display='flex'; }, 500);
              }
            } else {
              setTimeout(() => {
                gridEl.children[a].classList.remove('flipped');
                gridEl.children[b].classList.remove('flipped');
                flipped = []; locks = false;
              }, 1000);
            }
          }
        };
        gridEl.appendChild(d);
      });
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🖊️',
    en: 'Sudoku Simple',
    fr: 'Sudoku Simple',
    desc_en: '9x9 mini-grid sudoku challenge.',
    desc_fr: 'Défi sudoku sur mini-grille 9x9.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sudoku Simple</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
    .grid { display: grid; grid-template-columns: repeat(9, 35px); gap: 1px; background: #1e293b; padding: 5px; border: 2px solid #3b82f6; }
    .cell { width: 35px; height: 35px; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; font-size: 18px; }
    .cell input { width: 100%; height: 100%; border: none; text-align: center; font-size: 18px; outline: none; }
    button { margin-top: 20px; padding: 10px 20px; background: #3b82f6; color: #fff; border: none; border-radius: 5px; cursor: pointer; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Sudoku Simple</h1>
  <div class="grid" id="grid"></div>
  <div id="msg"><h1 id="txt">CHECK</h1><h2 id="fs"></h2><button class="btn" onclick="document.getElementById('msg').style.display='none'">CONTINUE</button></div>
  <button onclick="verify()">Verify Solution</button>
  <script>
    const g = document.getElementById('grid');
    for(let i=0; i<81; i++) {
      let c = document.createElement('div'); c.className = 'cell';
      let inp = document.createElement('input'); inp.maxLength = 1;
      inp.oninput = () => inp.value = inp.value.replace(/[^1-9]/g, '');
      if(Math.random() < 0.3) inp.value = Math.floor(Math.random() * 9) + 1;
      c.appendChild(inp); g.appendChild(c);
    }
    function verify() {
      let inputs = document.querySelectorAll('input'), valid = true;
      inputs.forEach(i => { if(!i.value) valid = false; });
      document.getElementById('msg').style.display='flex';
      document.getElementById('txt').textContent = valid ? 'GOOD PROGRESS!' : 'INCOMPLETE';
      document.getElementById('fs').textContent = valid ? 'Looks complete! (Basic check)' : 'Please fill all cells.';
    }
  </script>
</body>
</html>`
  },
  {
    icon: '⚡',
    en: 'Math Master',
    fr: 'Maître des Maths',
    desc_en: 'How many equations can you solve in 60s?',
    desc_fr: 'Combien d\'équations pouvez-vous résoudre en 60s ?',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Math Master</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .eq { font-size: 56px; font-weight: 900; margin-bottom: 25px; color: #3b82f6; }
    input { background: #1e293b; border: 3px solid #3b82f6; color: #fff; padding: 15px; font-size: 32px; width: 140px; text-align: center; border-radius: 15px; outline: none; }
    .stats { width: 100%; max-width: 400px; display: flex; justify-content: space-between; margin-bottom: 40px; font-size: 24px; font-weight: 700; color: #64748b; }
    #time { color: #ef4444; }
    #score { color: #10b981; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="stats">
    <div>Time: <span id="time">60</span>s</div>
    <div>Score: <span id="score">0</span></div>
  </div>
  <div class="eq" id="eq"></div>
  <input type="number" id="ans" autofocus placeholder="?" />
  <div id="msg"><h1>TIME'S UP!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  
  <script>
    let score = 0, time = 60, answer, active = true;
    const eqEl = document.getElementById('eq'), ansEl = document.getElementById('ans');
    const timeEl = document.getElementById('time'), scoreEl = document.getElementById('score');

    function gen() {
      let x = Math.floor(Math.random() * 15) + 1, y = Math.floor(Math.random() * 15) + 1;
      let op = Math.random() > 0.5 ? '+' : '-';
      if(op === '-' && x < y) [x, y] = [y, x];
      answer = op === '+' ? x + y : x - y;
      eqEl.textContent = x + ' ' + op + ' ' + y + ' = ?';
      ansEl.value = '';
    }

    ansEl.oninput = () => {
      if(!active) return;
      if (parseInt(ansEl.value) === answer) {
        score++; scoreEl.textContent = score; gen();
      }
    };

    const timer = setInterval(() => {
      if(!active) return;
      time--; timeEl.textContent = time;
      if (time === 0) {
        active = false; clearInterval(timer);
        document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Your score: ' + score;
      }
    }, 1000);

    gen();
  </script>
</body>
</html>`
  },
  {
    icon: '🔤',
    en: 'Word Genius',
    fr: 'Génie des Mots',
    desc_en: 'Wordle-style daily word challenge.',
    desc_fr: 'Défi de mots quotidien (style Wordle).',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Word Genius</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .row { display: flex; gap: 8px; margin-bottom: 8px; }
    .tile { width: 62px; height: 62px; border: 2px solid #334155; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 900; text-transform: uppercase; transition: all 0.3s; }
    .green { background: #10b981; border-color: #10b981; }
    .yellow { background: #f59e0b; border-color: #f59e0b; }
    .gray { background: #475569; border-color: #475569; }
    h1 { color: #3b82f6; margin-bottom: 30px; letter-spacing: 2px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Word Genius</h1>
  <div id="board"></div>
  <div id="msg"><h1 style="color:#10b981">WINNER!</h1><h2>Master Architect.</h2><button class="btn" onclick="location.reload()">PLAY AGAIN</button></div>
  <p style="margin-top: 30px; color: #64748b;">Type to Guess the 4-Letter Word</p>

  <script>
    const target = "CODE", board = document.getElementById('board');
    let currentTile = 0, active = true;

    for (let i = 0; i < 6; i++) {
      let r = document.createElement('div');
      r.className = 'row';
      for (let j = 0; j < 4; j++) {
        let t = document.createElement('div');
        t.className = 'tile';
        r.appendChild(t);
      }
      board.appendChild(r);
    }

    document.onkeydown = e => {
      if (!active || currentTile >= 24) return;
      let r = Math.floor(currentTile / 4), c = currentTile % 4, t = board.children[r].children[c];
      
      if (e.key === 'Backspace' && currentTile > r * 4) {
        currentTile--; 
        board.children[r].children[currentTile % 4].textContent = '';
        return;
      }

      if (e.key.length === 1 && /^[a-z]$/i.test(e.key)) {
        t.textContent = e.key;
        currentTile++;
        if (currentTile % 4 === 0) checkRow(r);
      }
    };

    function checkRow(r) {
      let row = board.children[r].children, guess = "";
      for (let i = 0; i < 4; i++) guess += row[i].textContent.toUpperCase();
      
      let tArr = target.split('');
      for (let i = 0; i < 4; i++) {
        if (guess[i] === target[i]) {
          row[i].classList.add('green');
          tArr[i] = null;
        }
      }
      for (let i = 0; i < 4; i++) {
        if (!row[i].classList.contains('green') && tArr.includes(guess[i])) {
          row[i].classList.add('yellow');
          tArr[tArr.indexOf(guess[i])] = null;
        } else if (!row[i].classList.contains('green')) {
          row[i].classList.add('gray');
        }
      }
      if (guess === target) {
        active = false;
        setTimeout(() => { document.getElementById('msg').style.display='flex'; }, 200);
      }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎨',
    en: 'Color Match',
    fr: 'Match de Couleurs',
    desc_en: 'Match the target color mix by adjusting RGB.',
    desc_fr: 'Reproduisez la couleur cible en ajustant le RGB.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Color Match</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .boxes { display: flex; gap: 30px; margin-bottom: 40px; }
    .box { width: 160px; height: 160px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.4); border: 4px solid #1e293b; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; }
    .label { position: absolute; bottom: -30px; color: #64748b; text-transform: uppercase; }
    .controls { display: flex; flex-direction: column; gap: 20px; width: 300px; padding: 20px; background: #1e293b; border-radius: 12px; }
    .slider-group { display: flex; align-items: center; gap: 15px; }
    .slider-group label { width: 20px; font-weight: 900; }
    input[type=range] { flex: 1; accent-color: #3b82f6; }
    #acc { margin-top: 30px; font-size: 32px; font-weight: 900; color: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Color Match</h1>
  <div class="boxes">
    <div class="box" id="target" style="position:relative"><span class="label">Target</span></div>
    <div class="box" id="user" style="position:relative"><span class="label">Your Mix</span></div>
  </div>
  <div class="controls">
    <div class="slider-group"><label style="color:#ef4444">R</label><input type="range" id="r" value="127" max="255"/></div>
    <div class="slider-group"><label style="color:#10b981">G</label><input type="range" id="g" value="127" max="255"/></div>
    <div class="slider-group"><label style="color:#3b82f6">B</label><input type="range" id="b" value="127" max="255"/></div>
  </div>
  <div id="acc">Match: 0%</div>
  <div id="msg"><h1 style="color:#10b981">PERFECT MATCH!</h1><h2>Color Insight Unlocked.</h2><button class="btn" onclick="location.reload()">TRY AGAIN</button></div>
  
  <script>
    const tr = Math.floor(Math.random()*256), tg = Math.floor(Math.random()*256), tb = Math.floor(Math.random()*256);
    document.getElementById('target').style.background = 'rgb(' + tr + ',' + tg + ',' + tb + ')';

    function upd() {
      let ur = document.getElementById('r').value, ug = document.getElementById('g').value, ub = document.getElementById('b').value;
      document.getElementById('user').style.background = 'rgb(' + ur + ',' + ug + ',' + ub + ')';
      let diff = Math.abs(tr-ur) + Math.abs(tg-ug) + Math.abs(tb-ub);
      let acc = Math.max(0, 100 - (diff / 7.65));
      document.getElementById('acc').textContent = 'Match: ' + Math.round(acc) + '%';
      if(acc > 98) {
        document.getElementById('acc').style.color = '#10b981';
        if(acc === 100) setTimeout(() => { document.getElementById('msg').style.display='flex'; }, 100);
      } else {
        document.getElementById('acc').style.color = '#3b82f6';
      }
    }
    document.querySelectorAll('input').forEach(i => i.oninput = upd);
    upd();
  </script>
</body>
</html>`
  },
  {
    icon: '🌀',
    en: 'Maze Escape',
    fr: 'Évasion Labyrinthe',
    desc_en: 'Find the exit in a procedurally generated maze.',
    desc_fr: 'Trouvez la sortie dans un labyrinthe aléatoire.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maze Escape</title>
  <style>
    body { background: #0f172a; margin:0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: #fff; font-family: sans-serif; }
    canvas { background: #000; border: 5px solid #3b82f6; border-radius: 12px; box-shadow: 0 0 30px rgba(59,130,246,0.3); }
    h1 { margin-bottom: 20px; color: #3b82f6; font-size: 32px; }
    .hint { margin-top: 20px; color: #64748b; font-size: 14px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Maze Escape</h1>
  <canvas id="m" width="400" height="400"></canvas>
  <div id="msg"><h1 style="color:#10b981">YOU ESCAPED!</h1><button class="btn" onclick="location.reload()">PLAY AGAIN</button></div>
  <div class="hint">Use Arrows to reach the RED Exit</div>

  <script>
    const canvas = document.getElementById('m'), ctx = canvas.getContext('2d');
    const cols = 20, size = 20;
    let grid = [], px = 0, py = 0, active = true;

    function init() {
      grid = Array(cols * cols).fill(0);
      for(let i=0; i<grid.length; i++) {
        if(Math.random() < 0.25) grid[i] = 1;
      }
      grid[0] = 0; grid[cols*cols-1] = 0;
      px = 0; py = 0; active = true;
      draw();
    }

    function draw() {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 400, 400);
      for(let i=0; i<grid.length; i++) {
        if(grid[i]) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect((i % cols) * size, Math.floor(i / cols) * size, size, size);
        }
      }
      ctx.fillStyle = '#ef4444';
      ctx.fillRect((cols - 1) * size, (cols - 1) * size, size, size);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(px * size, py * size, size, size);
    }

    document.addEventListener('keydown', e => {
      if(!active) return;
      let nx = px, ny = py;
      if (e.key === 'ArrowUp') ny--;
      if (e.key === 'ArrowDown') ny++;
      if (e.key === 'ArrowLeft') nx--;
      if (e.key === 'ArrowRight') nx++;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < cols && !grid[ny * cols + nx]) {
        px = nx; py = ny; draw();
        if (px === cols - 1 && py === cols - 1) {
          active = false; document.getElementById('msg').style.display='flex';
        }
      }
    });
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '💀',
    en: 'Super Hangman',
    fr: 'Super Pendu',
    desc_en: 'Classic vocabulary survival challenge.',
    desc_fr: 'Survie classique par le vocabulaire.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Super Hangman</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .word { font-size: 42px; letter-spacing: 12px; margin: 30px; font-weight: 900; color: #3b82f6; text-transform: uppercase; }
    .keyboard { display: grid; grid-template-columns: repeat(9, 45px); gap: 8px; }
    .key { width: 45px; height: 45px; background: #1e293b; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px; font-weight: 700; transition: 0.2s; border: 1px solid rgba(255,255,255,0.1); }
    .key:hover { background: #3b82f6; }
    .key.used { opacity: 0.2; cursor: default; background: #334155; }
    .lives { font-size: 24px; color: #ef4444; font-weight: 800; margin-top: 30px; letter-spacing: 2px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Super Hangman</h1>
  <div class="word" id="word"></div>
  <div class="keyboard" id="keyboard"></div>
  <div class="lives" id="lives">❤ ❤ ❤ ❤ ❤ ❤</div>
  <div id="msg"><h1 id="txt">GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">PLAY AGAIN</button></div>

  <script>
    const pool = ["ARCHITECT", "GAMES", "STUDIO", "LOGIC", "WEBSITE", "RENDER", "AURA", "SYSTEM"];
    const target = pool[Math.floor(Math.random() * pool.length)], kEl = document.getElementById('keyboard');
    const wEl = document.getElementById('word'), lEl = document.getElementById('lives');
    let lives = 6, guess = Array(target.length).fill('_'), active = true;

    function render() {
      wEl.textContent = guess.join(' ');
      lEl.textContent = "❤ ".repeat(lives);
    }

    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i);
      let d = document.createElement('div');
      d.className = 'key'; d.textContent = char;
      d.onclick = () => {
        if(!active || lives <= 0 || d.classList.contains('used')) return;
        d.classList.add('used');
        if(target.includes(char)) {
          for(let j=0; j<target.length; j++) if(target[j] === char) guess[j] = char;
          if(!guess.includes('_')) {
            active = false; document.getElementById('msg').style.display='flex';
            document.getElementById('txt').textContent = "SURVIVOR!";
            document.getElementById('txt').style.color = "#10b981";
            document.getElementById('fs').textContent = "Word was: " + target;
          }
        } else {
          lives--;
          if(lives === 0) {
            active = false; document.getElementById('msg').style.display='flex';
            document.getElementById('fs').textContent = "The word was: " + target;
          }
        }
        render();
      };
      kEl.appendChild(d);
    }
    render();
  </script>
</body>
</html>`
  },
  {
    icon: '🏗️',
    en: 'Skyline Builder',
    fr: 'Skyline Builder',
    desc_en: 'Stack floors to build the tallest skyscraper.',
    desc_fr: 'Empilez les étages pour construire le plus haut gratte-ciel.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skyline Builder</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    canvas { background: #1e293b; border: 4px solid #3b82f6; border-radius: 12px; box-shadow: 0 0 40px rgba(0,0,0,0.5); cursor: pointer; }
    #score { font-size: 48px; font-weight: 900; color: #3b82f6; margin-bottom: 10px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="score">0</div>
  <canvas id="c" width="300" height="500"></canvas>
  <div id="msg"><h1>COLLAPSED!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <p style="margin-top: 15px; color: #64748b;">Click to Stack the Next Floor</p>

  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), scoreEl = document.getElementById('score');
    let score = 0, speed = 3, gameOver = false;
    let blocks = [{ x: 50, y: 460, w: 200 }];
    let cur = { x: 0, y: 420, w: 200, dir: 1 };

    function draw() {
      if(gameOver) return;
      ctx.clearRect(0, 0, 300, 500);
      blocks.forEach((b, i) => {
        ctx.fillStyle = i === 0 ? '#10b981' : '#3b82f6';
        ctx.fillRect(b.x, b.y, b.w, 40);
        ctx.strokeStyle = '#1e293b'; ctx.strokeRect(b.x, b.y, b.w, 40);
      });
      ctx.fillStyle = '#fff'; ctx.fillRect(cur.x, cur.y, cur.w, 40);
      
      cur.x += cur.dir * speed;
      if(cur.x < 0 || cur.x + cur.w > 300) cur.dir *= -1;
      requestAnimationFrame(draw);
    }

    canvas.onclick = () => {
      if(gameOver) return;
      let last = blocks[blocks.length - 1];
      if (cur.x > last.x + last.w || cur.x + cur.w < last.x) {
        gameOver = true; document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Final Floors: ' + score;
      } else {
        let x1 = Math.max(cur.x, last.x), x2 = Math.min(cur.x + cur.w, last.x + last.w);
        cur.w = x2 - x1; cur.x = x1;
        blocks.push({ ...cur });
        score++; scoreEl.textContent = score; speed += 0.2;
        if (blocks.length > 8) blocks.forEach(b => b.y += 40); else cur.y -= 40;
      }
    };
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '⏱️',
    en: 'Reaction Test',
    fr: 'Test de Réaction',
    desc_en: 'Click when the screen turns GREEN!',
    desc_fr: 'Cliquez quand l\'écran devient VERT !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reaction Test</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; cursor: pointer; user-select: none; }
    #b { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: background 0.1s; }
    .msg { font-size: 42px; font-weight: 900; text-align: center; }
    .sub { font-size: 20px; color: rgba(255,255,255,0.6); margin-top: 15px; }
  </style>
</head>
<body>
  <div id="b">
    <div class="msg" id="m">CLICK TO START</div>
    <div class="sub" id="s">Test your architect reflexes</div>
  </div>

  <script>
    const box = document.getElementById('b'), msg = document.getElementById('m'), sub = document.getElementById('s');
    let state = 0, startTime; // 0: Start, 1: Waiting, 2: Green

    function reset() {
      state = 0; box.style.background = '#0f172a';
      msg.textContent = 'CLICK TO START'; sub.textContent = 'Test your reflexes';
    }

    document.body.onmousedown = () => {
      if (state === 0) {
        state = 1; box.style.background = '#ef4444'; 
        msg.textContent = 'WAIT FOR GREEN...'; sub.textContent = '';
        setTimeout(() => {
          if (state === 1) {
            state = 2; box.style.background = '#10b981';
            msg.textContent = 'CLICK NOW!'; startTime = Date.now();
          }
        }, 1500 + Math.random() * 3500);
      } else if (state === 1) {
        state = 0; box.style.background = '#0f172a';
        msg.textContent = 'TOO EARLY!'; sub.textContent = 'Click to try again';
      } else if (state === 2) {
        let reactionTime = Date.now() - startTime;
        state = 0; box.style.background = '#0f172a';
        msg.textContent = reactionTime + ' ms'; sub.textContent = 'Impressive! Click to retry';
      }
    };
  </script>
</body>
</html>`
  },
  {
    icon: '🍪',
    en: 'Cookie Architect',
    fr: 'Cookie Architecte',
    desc_en: 'Build your cookie empire by clicking!',
    desc_fr: 'Construisez votre empire du cookie !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cookie Architect</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .cookie { font-size: 140px; cursor: pointer; user-select: none; transition: transform 0.1s; }
    .cookie:active { transform: scale(0.9); }
    #score { font-size: 38px; font-weight: 900; margin: 20px; color: #f59e0b; text-shadow: 0 4px 15px rgba(245,158,11,0.2); }
    .upgrades { display: flex; flex-direction: column; gap: 10px; width: 300px; }
    .btn { background: #1e293b; color: #fff; border: 1px solid #3b82f6; padding: 15px; border-radius: 12px; cursor: pointer; transition: 0.2s; font-weight: 700; text-align: left; }
    .btn:hover { background: #334155; }
    .btn span { float: right; color: #3b82f6; }
  </style>
</head>
<body>
  <div id="score">0 Cookies</div>
  <div class="cookie" id="c">🍪</div>
  <div class="upgrades">
    <button class="btn" id="u1">Architect Tools <span>Cost: 15</span></button>
    <button class="btn" id="u2">Auto-Builders <span>Cost: 100</span></button>
  </div>

  <script>
    let cookies = 0, power = 1, auto = 0, cost1 = 15, cost2 = 100;
    const sEl = document.getElementById('score'), cEl = document.getElementById('c');
    const u1Btn = document.getElementById('u1'), u2Btn = document.getElementById('u2');

    function update() {
      sEl.textContent = Math.floor(cookies) + " Cookies";
      u1Btn.querySelector('span').textContent = 'Cost: ' + cost1;
      u2Btn.querySelector('span').textContent = 'Cost: ' + cost2;
    }

    cEl.onclick = () => { cookies += power; update(); };

    u1Btn.onclick = () => {
      if(cookies >= cost1) { cookies -= cost1; power += 1; cost1 = Math.floor(cost1 * 1.5); update(); }
    };

    u2Btn.onclick = () => {
      if(cookies >= cost2) { cookies -= cost2; auto += 2; cost2 = Math.floor(cost2 * 1.8); update(); }
    };

    setInterval(() => { if(auto > 0) { cookies += auto/10; update(); } }, 100);
  </script>
</body>
</html>`
  },
  {
    icon: '🦇',
    en: 'Cave Escape',
    fr: 'Évasion Caverne',
    desc_en: 'Fly through the cave without hitting walls.',
    desc_fr: 'Volez dans la grotte sans toucher les murs.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cave Escape</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    canvas { background: #1e293b; border: 4px solid #3b82f6; border-radius: 12px; box-shadow: 0 0 30px rgba(59,130,246,0.3); }
    #score { font-size: 32px; font-weight: 900; color: #3b82f6; margin-bottom: 10px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="score">0</div>
  <canvas id="c" width="300" height="500"></canvas>
  <div id="msg"><h1>CRASHED!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), sEl = document.getElementById('score');
    let x = 125, obstacles = [], score = 0, speed = 5, gameOver = false;

    document.onkeydown = e => {
      if(gameOver) return;
      if(e.key === 'ArrowLeft') x = Math.max(25, x - 50);
      if(e.key === 'ArrowRight') x = Math.min(225, x + 50);
    };

    function spawn() { if(!gameOver) { obstacles.push({ x: [25, 75, 125, 175, 225][Math.floor(Math.random()*5)], y: -50 }); } }
    setInterval(spawn, 1000);

    function loop() {
      if(gameOver) return;
      ctx.clearRect(0,0,300,500);
      ctx.strokeStyle = 'rgba(59,130,246,0.2)'; ctx.lineWidth = 2;
      for(let i=1; i<6; i++) { ctx.beginPath(); ctx.moveTo(i*50, 0); ctx.lineTo(i*50, 500); ctx.stroke(); }
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(x, 420, 40, 60);
      ctx.fillStyle = '#fff'; ctx.fillRect(x+5, 425, 30, 15);
      obstacles.forEach((o, i) => {
        o.y += speed;
        ctx.fillStyle = '#ef4444'; ctx.fillRect(o.x, o.y, 40, 60);
        if(o.y > 500) { obstacles.splice(i, 1); score++; sEl.textContent = score; speed += 0.1; }
        if(o.y > 360 && o.y < 480 && o.x === x) { 
           gameOver = true; document.getElementById('msg').style.display='flex';
           document.getElementById('fs').textContent = 'Score: ' + score;
        }
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🍎',
    en: 'Fruity Slasher',
    fr: 'Fruity Slasher',
    desc_en: 'Slice fruits with your mouse rapidly!',
    desc_fr: 'Tranchez les fruits avec votre souris !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fruity Slasher</title>
  <style>
    body { background: #0c0a09; margin: 0; overflow: hidden; font-family: sans-serif; cursor: crosshair; }
    #score { position: absolute; top: 20px; left: 20px; color: #fbbf24; font-size: 36px; font-weight: 900; text-shadow: 0 0 10px rgba(251,191,36,0.3); }
    canvas { display: block; }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <canvas id="c"></canvas>

  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    let fruits = [], score = 0;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    class Fruit {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = -16 - Math.random() * 8;
        this.emoji = ['🍎','🍌','🍇','🍒','🥝','🍍'][Math.floor(Math.random()*6)];
        this.radius = 40;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.vy += 0.25;
      }
      draw() {
        ctx.font = '60px serif'; ctx.fillText(this.emoji, this.x - 30, this.y + 20);
      }
    }

    function spawn() { if(fruits.length < 5) fruits.push(new Fruit()); }
    setInterval(spawn, 800);

    function loop() {
      ctx.fillStyle = 'rgba(12, 10, 9, 0.3)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      fruits.forEach((f, i) => {
        f.update(); f.draw();
        if(f.y > canvas.height + 100) fruits.splice(i, 1);
      });
      requestAnimationFrame(loop);
    }

    canvas.onmousemove = (e) => {
      fruits.forEach((f, i) => {
        let dist = Math.hypot(e.clientX - f.x, e.clientY - f.y);
        if(dist < 50) {
          fruits.splice(i, 1); score += 10; scoreEl.textContent = 'Score: ' + score;
        }
      });
    };
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🫧',
    en: 'Bubble Pop',
    fr: 'Bubble Pop',
    desc_en: 'Pop bubbles of the same color.',
    desc_fr: 'Éclatez les bulles de la même couleur.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bubble Pop</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; height: 100vh; margin: 0; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    #score { font-size: 42px; font-weight: 900; color: #3b82f6; margin-bottom: 20px; }
    .bubble { position: absolute; border-radius: 50%; cursor: pointer; transition: transform 0.1s; border: 2px solid rgba(255,255,255,0.2); }
    .bubble:hover { transform: scale(1.1); }
    .bubble:active { transform: scale(0.8); }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <script>
    let score = 0;
    const scoreEl = document.getElementById('score');

    function spawn() {
      const b = document.createElement('div');
      const size = 30 + Math.random() * 60;
      b.className = 'bubble';
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * (window.innerWidth - size) + 'px';
      b.style.top = window.innerHeight + 'px';
      b.style.background = 'hsla(' + (Math.random() * 360) + ', 70%, 60%, 0.6)';
      
      let speed = 2 + Math.random() * 3;
      b.onclick = () => { b.remove(); score += 5; scoreEl.textContent = 'Score: ' + score; spawn(); };
      document.body.appendChild(b);

      let pos = window.innerHeight;
      function move() {
        pos -= speed; b.style.top = pos + 'px';
        if(pos < -size) { b.remove(); spawn(); } else requestAnimationFrame(move);
      }
      move();
    }
    for(let i=0; i<15; i++) setTimeout(spawn, i * 300);
  </script>
</body>
</html>`
  },
  {
    icon: '🧨',
    en: 'Bomb Defuser',
    fr: 'Démineur Express',
    desc_en: 'Cut the wires in the correct order!',
    desc_fr: 'Coupez les fils dans le bon ordre !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bomb Defuser</title>
  <style>
    body { background: #0c0a09; color: #fff; font-family: 'JetBrains Mono', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .bomb-case { background: #1c1917; padding: 40px; border: 4px solid #444; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
    .timer { font-size: 64px; color: #ef4444; text-align: center; margin-bottom: 30px; letter-spacing: 4px; }
    .wire-container { display: flex; flex-direction: column; gap: 15px; }
    .wire { width: 250px; height: 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; position: relative; }
    .wire::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.1); }
    .wire.cut { opacity: 0.1; cursor: default; }
    .hint { margin-top: 30px; color: #78716c; font-size: 14px; text-transform: uppercase; }
    #msg { position:fixed;inset:0;background:rgba(12,10,9,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#ef4444; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="bomb-case">
    <div class="timer" id="t">00:10</div>
    <div class="wire-container" id="w"></div>
    <div class="hint" id="h">Cut in Order: RED, BLUE, YELLOW, GREEN</div>
  </div>
  <div id="msg"><h1 id="txt">BOOM!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>

  <script>
    const wires = ['red', 'blue', 'yellow', 'green'];
    let current = 0, time = 10, over = false;
    const wEl = document.getElementById('w'), tEl = document.getElementById('t');

    function init() {
      wEl.innerHTML = '';
      wires.forEach(c => {
        let d = document.createElement('div');
        d.className = 'wire'; d.style.background = c;
        d.onclick = () => {
          if(over || d.classList.contains('cut')) return;
          if(c === wires[current]) {
            d.classList.add('cut'); current++;
            if(current === wires.length) { 
              over = true; document.getElementById('msg').style.display='flex';
              document.getElementById('txt').textContent = 'BOMB DEFUSED!';
              document.getElementById('txt').style.color = '#10b981';
              document.getElementById('fs').textContent = 'Great work, Architect.';
            }
          } else { 
            over = true; document.getElementById('msg').style.display='flex';
            document.getElementById('fs').textContent = 'Incorrect wire.';
          }
        };
        wEl.appendChild(d);
      });
    }

    const timer = setInterval(() => {
      if(over) return;
      time -= 0.01; if(time <= 0 && !over) { 
        over = true; document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Time ran out.';
      }
      tEl.textContent = '00:' + Math.max(0, time).toFixed(2).padStart(5, '0');
    }, 10);

    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🎨',
    en: 'Pattern Mimic',
    fr: 'Mime de Pattern',
    desc_en: 'Repeat the visual pattern shown.',
    desc_fr: 'Répétez le motif visuel affiché.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pattern Mimic</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 90px); gap: 15px; }
    .btn { width: 90px; height: 90px; background: #1e293b; border-radius: 12px; cursor: pointer; border: 2px solid rgba(59,130,246,0.1); transition: 0.2s; }
    .btn.active { background: #3b82f6; box-shadow: 0 0 20px #3b82f6; transform: scale(0.95); }
    h1 { color: #3b82f6; margin-bottom: 20px; letter-spacing: 2px; }
    #level { font-size: 24px; color: #64748b; margin-top: 20px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .retry-btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Pattern Mimic</h1>
  <div class="grid" id="g"></div>
  <div id="level">Level: 1</div>
  <div id="msg"><h1>WRONG PATTERN</h1><h2 id="fs"></h2><button class="retry-btn" onclick="location.reload()">RETRY</button></div>

  <script>
    const grid = document.getElementById('g');
    let sequence = [], userSequence = [], level = 1, isShowing = false, active = true;
    
    for(let i=0; i<9; i++) {
      let b = document.createElement('div'); b.className = 'btn';
      b.onclick = () => handleTap(i); grid.appendChild(b);
    }

    function handleTap(i) {
      if(!active || isShowing) return;
      flash(i); userSequence.push(i);
      if(userSequence[userSequence.length-1] !== sequence[userSequence.length-1]) {
        active = false; document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Final Level: ' + (level - 1);
      }
      if(active && userSequence.length === sequence.length) {
        level++; document.getElementById('level').textContent = 'Level: ' + level;
        setTimeout(nextLevel, 800);
      }
    }

    function flash(i) {
      grid.children[i].classList.add('active');
      setTimeout(() => grid.children[i].classList.remove('active'), 300);
    }

    function nextLevel() {
      if(!active) return;
      userSequence = []; isShowing = true;
      sequence.push(Math.floor(Math.random() * 9));
      sequence.forEach((val, i) => {
        setTimeout(() => {
          if(!active) return;
          flash(val); if(i === sequence.length - 1) isShowing = false;
        }, 600 * (i + 1));
      });
    }
    setTimeout(nextLevel, 500);
  </script>
</body>
</html>`
  },
  {
    icon: '⌨️',
    en: 'Type Speed Pro',
    fr: 'Type Speed Pro',
    desc_en: 'Type the words as fast as you can!',
    desc_fr: 'Tapez les mots le plus vite possible !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Type Speed Pro</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: 'JetBrains Mono', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    #target-word { font-size: 64px; font-weight: 900; color: #3b82f6; margin-bottom: 40px; letter-spacing: 4px; text-shadow: 0 0 20px rgba(59,130,246,0.2); }
    input { background: #1e293b; border: 4px solid #3b82f6; color: #fff; padding: 20px; font-size: 32px; border-radius: 12px; outline: none; width: 400px; text-align: center; }
    .stats { display: flex; gap: 50px; margin-bottom: 20px; font-size: 24px; color: #64748b; font-weight: 700; }
    span { color: #10b981; }
  </style>
</head>
<body>
  <div class="stats"><div>Score: <span id="s">0</span></div><div>WPM: <span id="w">0</span></div></div>
  <div id="target-word">READY</div>
  <input type="text" id="input-field" autofocus spellcheck="false"/>
  
  <script>
    const WORDS = ['ARCHITECT', 'DESIGN', 'CODING', 'INTERFACE', 'PREVIEW', 'SYSTEM', 'REACT', 'STYLE', 'LOGIC', 'STUDIO'];
    let score = 0, target = '', startTime = Date.now();
    const wEl = document.getElementById('target-word'), iEl = document.getElementById('input-field');
    const sEl = document.getElementById('s'), wpmEl = document.getElementById('w');

    function next() {
      target = WORDS[Math.floor(Math.random() * WORDS.length)];
      wEl.textContent = target; iEl.value = '';
    }

    iEl.oninput = () => {
      if(iEl.value.toUpperCase() === target) {
        score++; sEl.textContent = score;
        let timeElapsed = (Date.now() - startTime) / 60000;
        wpmEl.textContent = Math.round(score / timeElapsed);
        next();
      }
    };
    next();
  </script>
</body>
</html>`
  },
  {
    icon: '🏰',
    en: 'Pet Architect',
    fr: 'Petit Architecte',
    desc_en: 'Feed and grow your digital architect pet.',
    desc_fr: 'Nourrissez et faites grandir votre avatar.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pet Architect</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    #pet { font-size: 140px; margin-bottom: 20px; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .meter-container { width: 300px; height: 25px; background: #334155; border-radius: 12px; margin: 10px 0; overflow: hidden; border: 2px solid #1e293b; }
    #health { height: 100%; background: linear-gradient(90deg, #ef4444, #10b981); width: 100%; transition: width 0.3s; }
    .controls { display: flex; gap: 15px; margin-top: 20px; }
    .btn { background: #3b82f6; color: #fff; border: none; padding: 12px 25px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .btn:hover { background: #60a5fa; transform: translateY(-3px); }
    .status { font-size: 20px; font-weight: 700; color: #64748b; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Pet Architect</h1>
  <div id="pet">👷</div>
  <div class="meter-container"><div id="health"></div></div>
  <div class="status" id="stat">HAPPY</div>
  <div class="controls">
    <button class="btn" onclick="feed()">Feed 🍩</button>
    <button class="btn" onclick="work()">Code 💻</button>
  </div>

  <script>
    let health = 100;
    const pEl = document.getElementById('pet'), hEl = document.getElementById('health'), sEl = document.getElementById('stat');

    function update() {
      hEl.style.width = health + '%';
      if(health > 70) { pEl.textContent = '👷'; sEl.textContent = 'PRODUCTIVE'; }
      else if(health > 30) { pEl.textContent = '😐'; sEl.textContent = 'TIRED'; }
      else if(health > 0) { pEl.textContent = '😫'; sEl.textContent = 'STARVING'; }
      else { pEl.textContent = '🪦'; sEl.textContent = 'GAME OVER'; pEl.style.transform = 'rotate(90deg)'; }
    }

    function feed() { if(health > 0) { health = Math.min(100, health + 15); update(); pEl.style.transform = 'scale(1.2)'; setTimeout(()=>pEl.style.transform='scale(1)', 200); } }
    function work() { if(health > 0) { health = Math.max(0, health - 5); update(); } }

    setInterval(() => { if(health > 0) { health = Math.max(0, health - 2); update(); } }, 1500);
    update();
  </script>
</body>
</html>`
  },
  {
    icon: '❌',
    en: 'Tic-Tac-Toe AI',
    fr: 'Morpion IA',
    desc_en: 'Can you beat our "unbeatable" AI?',
    desc_fr: 'Pouvez-vous battre notre IA "imbattable" ?',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tic-Tac-Toe AI</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; }
    .cell { width: 100px; height: 100px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 56px; font-weight: 900; cursor: pointer; transition: 0.2s; border: 2px solid rgba(59,130,246,0.1); }
    .cell:hover { background: #2d3748; }
    .cell.x { color: #3b82f6; }
    .cell.o { color: #ef4444; }
    h1 { color: #3b82f6; margin-bottom: 20px; }
    #status { font-size: 24px; color: #64748b; margin-top: 20px; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Tic-Tac-Toe</h1>
  <div class="grid" id="g"></div>
  <div id="status">Your Turn (X)</div>
  <button onclick="init()" style="margin-top:30px; padding:10px 20px; background:#3b82f6; border:none; color:#fff; border-radius:8px; cursor:pointer">Restart</button>

  <script>
    const grid = document.getElementById('g'), stat = document.getElementById('status');
    let board = Array(9).fill(null), gameOver = false;

    function init() {
      grid.innerHTML = ''; board = Array(9).fill(null); gameOver = false;
      stat.textContent = 'Your Turn (X)';
      for(let i=0; i<9; i++) {
        let d = document.createElement('div'); d.className = 'cell';
        d.onclick = () => tap(i, d); grid.appendChild(d);
      }
    }

    function tap(i, el) {
      if(board[i] || gameOver) return;
      board[i] = 'X'; el.textContent = 'X'; el.classList.add('x');
      if(!checkWin()) {
        stat.textContent = "AI's Thinking...";
        setTimeout(aiMove, 500);
      }
    }

    function aiMove() {
      if(gameOver) return;
      let empty = board.map((v, j) => v === null ? j : null).filter(v => v !== null);
      if(empty.length) {
        let move = empty[Math.floor(Math.random() * empty.length)];
        board[move] = 'O';
        let cell = grid.children[move];
        cell.textContent = 'O'; cell.classList.add('o');
        if(!checkWin()) stat.textContent = 'Your Turn (X)';
      }
    }

    function checkWin() {
      const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(let p of wins) {
        if(board[p[0]] && board[p[0]] === board[p[1]] && board[p[0]] === board[p[2]]) {
          gameOver = true; stat.textContent = board[p[0]] + ' Wins!'; return true;
        }
      }
      if(!board.includes(null)) { gameOver = true; stat.textContent = "It's a Draw!"; return true; }
      return false;
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🔴',
    en: 'Connect Four',
    fr: 'Puissance 4',
    desc_en: 'Drop discs to connect four in a row.',
    desc_fr: 'Alignez quatre jetons pour gagner.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Connect Four Pro</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .board { background: #1e40af; padding: 15px; border-radius: 15px; display: grid; grid-template-columns: repeat(7, 60px); gap: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .cell { width: 60px; height: 60px; background: #0f172a; border-radius: 50%; cursor: pointer; transition: 0.2s; border: 2px solid rgba(255,255,255,0.1); }
    .cell.p1 { background: #ef4444; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
    .cell.p2 { background: #fbbf24; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
    h1 { color: #3b82f6; margin-bottom: 20px; font-weight: 900; }
    #status { font-size: 20px; color: #94a3b8; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Connect Four</h1>
  <div class="board" id="board"></div>
  <div id="status">Red's Turn</div>
  <button onclick="init()" style="margin-top:20px; padding:8px 16px; background:#334155; border:none; color:#fff; border-radius:8px; cursor:pointer">Restart</button>

  <script>
    const boardEl = document.getElementById('board'), statusEl = document.getElementById('status');
    let board = [], turn = 1, gameOver = false;

    function init() {
      boardEl.innerHTML = ''; board = Array(42).fill(0); turn = 1; gameOver = false;
      statusEl.textContent = "Red's Turn";
      for(let i=0; i<42; i++) {
        let c = document.createElement('div'); c.className = 'cell';
        c.onclick = () => drop(i % 7); boardEl.appendChild(c);
      }
    }

    function drop(col) {
      if(gameOver) return;
      for(let r=5; r>=0; r--) {
        let idx = r * 7 + col;
        if(board[idx] === 0) {
          board[idx] = turn;
          let cell = boardEl.children[idx];
          cell.classList.add(turn === 1 ? 'p1' : 'p2');
          if(checkWin(idx)) {
            gameOver = true; statusEl.textContent = (turn === 1 ? "RED" : "YELLOW") + " WINS!";
            return;
          }
          turn = 3 - turn;
          statusEl.textContent = (turn === 1 ? "Red's" : "Yellow's") + " Turn";
          return;
        }
      }
    }

    function checkWin(i) {
      const dirs = [[1,0],[0,1],[1,1],[1,-1]];
      let r = Math.floor(i/7), c = i%7;
      for(let [dr, dc] of dirs) {
        let count = 1;
        for(let s of [1, -1]) {
          let currR = r + dr*s, currC = c + dc*s;
          while(currR>=0 && currR<6 && currC>=0 && currC<7 && board[currR*7+currC] === turn) {
            count++; currR += dr*s; currC += dc*s;
          }
        }
        if(count >= 4) return true;
      }
      return false;
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '🏁',
    en: 'Neon Checkers',
    fr: 'Dames Néon',
    desc_en: 'Classic board game with a neon touch.',
    desc_fr: 'Le jeu de dames classique version néon.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neon Checkers</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .board-container { border: 8px solid #3b82f6; border-radius: 12px; background: #1e293b; box-shadow: 0 0 50px rgba(59,130,246,0.25); padding: 5px; }
    .b { display: grid; grid-template-columns: repeat(8, 55px); grid-template-rows: repeat(8, 55px); gap: 2px; }
    .s { width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .dark { background: #0f172a; } .light { background: #1e293b; }
    .p { width: 45px; height: 45px; border-radius: 50%; box-shadow: 0 0 15px rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
    .red { background: linear-gradient(135deg, #ef4444, #991b1b); border: 2px solid rgba(255,255,255,0.2); }
    .green { background: linear-gradient(135deg, #10b981, #065f46); border: 2px solid rgba(255,255,255,0.2); }
    .p.sel { transform: scale(1.15); border: 3px solid #fff; box-shadow: 0 0 20px #fff; }
    .p.king::after { content: '👑'; font-size: 20px; }
    #msg { margin-bottom: 20px; font-size: 28px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 2px; }
    .controls { margin-top: 30px; }
    .btn { background: #3b82f6; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <div id="msg">Green's Turn</div>
  <div class="board-container"><div class="b" id="b"></div></div>
  <div class="controls"><button class="btn" onclick="init()">Restart Game</button></div>

  <script>
    const bE = document.getElementById('b'), mE = document.getElementById('msg');
    let board = [], turn = 'green', sel = null;

    function init() {
      board = Array(64).fill(null);
      for (let i = 0; i < 64; i++) {
        let r = Math.floor(i / 8), c = i % 8;
        if ((r + c) % 2 !== 0) {
          if (r < 3) board[i] = { type: 'red', king: false };
          if (r > 4) board[i] = { type: 'green', king: false };
        }
      }
      turn = 'green'; sel = null; updateMsg(); draw();
    }

    function draw() {
      bE.innerHTML = '';
      board.forEach((p, i) => {
        let r = Math.floor(i / 8), c = i % 8;
        let s = document.createElement('div');
        s.className = 's ' + ((r + c) % 2 === 0 ? 'light' : 'dark');
        if (p) {
          let d = document.createElement('div');
          d.className = 'p ' + p.type + (p.king ? ' king' : '') + (sel === i ? ' sel' : '');
          d.onclick = (e) => {
            e.stopPropagation();
            if (p.type === turn) { sel = i; draw(); }
            else if (sel !== null) move(sel, i);
          };
          s.appendChild(d);
        }
        s.onclick = () => { if(sel !== null) move(sel, i); };
        bE.appendChild(s);
      });
    }

    function move(f, t) {
      if (f === null || board[t] !== null) return;
      let fr = Math.floor(f/8), fc = f%8, tr = Math.floor(t/8), tc = t%8;
      let dr = tr - fr, dc = tc - fc, p = board[f];
      
      if ((tr + tc) % 2 === 0) return; // Must move to dark squares
      if (!p.king && ((p.type === 'green' && dr > 0) || (p.type === 'red' && dr < 0))) return;

      if (Math.abs(dr) === 1 && Math.abs(dc) === 1) {
        board[t] = p; board[f] = null;
        if ((p.type === 'green' && tr === 0) || (p.type === 'red' && tr === 7)) p.king = true;
        endTurn();
      } else if (Math.abs(dr) === 2 && Math.abs(dc) === 2) {
        let mr = fr + dr/2, mc = fc + dc/2, m = mr * 8 + mc;
        if (board[m] && board[m].type !== p.type) {
          board[t] = p; board[f] = null; board[m] = null;
          if ((p.type === 'green' && tr === 0) || (p.type === 'red' && tr === 7)) p.king = true;
          endTurn();
        }
      }
      draw();
    }

    function endTurn() {
      turn = turn === 'green' ? 'red' : 'green';
      updateMsg(); sel = null;
    }

    function updateMsg() {
      mE.textContent = turn.charAt(0).toUpperCase() + turn.slice(1) + "'s Turn";
      mE.style.color = turn === 'green' ? '#10b981' : '#ef4444';
    }

    init();
  </script>
</body>
</html>`
  },
  {
    icon: '✊',
    en: 'RPS Ultra',
    fr: 'Chifoumi Ultra',
    desc_en: 'Rock-Paper-Scissors with animations.',
    desc_fr: 'Pierre-Feuille-Ciseaux animé.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RPS Ultra</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; text-align: center; padding: 50px; margin:0; }
    .display { display: flex; justify-content: center; gap: 50px; font-size: 100px; margin: 40px 0; }
    .choice-btn { font-size: 50px; background: #1e293b; border: 3px solid #3b82f6; border-radius: 20px; cursor: pointer; padding: 20px; transition: 0.3s; color:#fff; }
    .choice-btn:hover { background: #3b82f6; transform: scale(1.1); }
    h1 { color: #3b82f6; font-size: 42px; text-transform: uppercase; }
    #result { font-size: 32px; font-weight: 900; margin-top: 30px; letter-spacing: 2px; }
  </style>
</head>
<body>
  <h1>RPS Ultra</h1>
  <div class="display">
    <div id="u" style="transition:0.3s">❔</div>
    <div style="font-size:40px; align-self:center; color:#64748b">VS</div>
    <div id="a" style="transition:0.3s">❔</div>
  </div>
  <div class="display">
    <button class="choice-btn" onclick="play('✊')">✊</button>
    <button class="choice-btn" onclick="play('✋')">✋</button>
    <button class="choice-btn" onclick="play('✌️')">✌️</button>
  </div>
  <h2 id="result" style="color: #64748b">CHOOSE YOUR WEAPON</h2>

  <script>
    const opts = ['✊', '✋', '✌️'], resEl = document.getElementById('result');
    function play(u) {
      let ai = opts[Math.floor(Math.random() * 3)];
      document.getElementById('u').textContent = u;
      document.getElementById('a').textContent = ai;
      if(u === ai) { resEl.textContent = "IT'S A DRAW!"; resEl.style.color = '#f59e0b'; }
      else if((u==='✊'&&ai==='✌️') || (u==='✋'&&ai==='✊') || (u==='✌️'&&ai==='✋')) {
        resEl.textContent = "VICTORY!"; resEl.style.color = '#10b981';
      } else {
        resEl.textContent = "AI WINS!"; resEl.style.color = '#ef4444';
      }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🧠',
    en: 'Master Code',
    fr: 'Maître du Code',
    desc_en: 'Guess the secret sequence of 4 colors.',
    desc_fr: 'Devinez la séquence secrète de 4 couleurs.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Master Code</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: 'JetBrains Mono', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .board { background: #1e293b; padding: 25px; border-radius: 16px; border: 2px solid #3b82f6; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .row { display: flex; gap: 15px; margin-bottom: 12px; align-items: center; }
    .peg { width: 35px; height: 35px; border-radius: 50%; background: #334155; cursor: pointer; border: 2px solid rgba(255,255,255,0.1); transition: 0.2s; }
    .peg:hover { transform: scale(1.1); }
    .hints { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; width: 40px; }
    .hint { width: 12px; height: 12px; border-radius: 50%; background: #0f172a; border: 1px solid rgba(255,255,255,0.1); }
    .hint.black { background: #000; }
    .hint.white { background: #fff; }
    .palette { display: flex; gap: 10px; margin-top: 30px; background: #1e293b; padding: 15px; border-radius: 12px; }
    .swatch { width: 40px; height: 40px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; }
    .swatch.active { border-color: #fff; transform: scale(1.2); }
    h1 { margin-bottom: 20px; color: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>Master Code</h1>
  <div class="board" id="board"></div>
  <div class="palette" id="palette"></div>
  <div id="msg"><h1 id="txt">CRACKED!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">TRY AGAIN</button></div>
  <button onclick="checkRow()" style="margin-top:20px; padding:12px 24px; background:#3b82f6; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:700">SUBMIT GUESS</button>

  <script>
    const COLORS = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];
    let target = Array.from({length: 4}, () => COLORS[Math.floor(Math.random()*6)]);
    let currentGuess = Array(4).fill(null), currentRow = 0, selectedColor = COLORS[0], active = true;

    const boardEl = document.getElementById('board'), palEl = document.getElementById('palette');

    function init() {
      boardEl.innerHTML = '';
      for(let i=0; i<8; i++) {
        let r = document.createElement('div'); r.className = 'row';
        for(let j=0; j<4; j++) {
          let p = document.createElement('div'); p.className = 'peg';
          p.onclick = () => { if(active && currentRow === i) { p.style.background = selectedColor; currentGuess[j] = selectedColor; } };
          r.appendChild(p);
        }
        let h = document.createElement('div'); h.className = 'hints';
        for(let k=0; k<4; k++) h.appendChild(document.createElement('div')).className = 'hint';
        r.appendChild(h); boardEl.appendChild(r);
      }
      COLORS.forEach(c => {
        let s = document.createElement('div'); s.className = 'swatch'; s.style.background = c;
        if(c === selectedColor) s.classList.add('active');
        s.onclick = () => { document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active')); s.classList.add('active'); selectedColor = c; };
        palEl.appendChild(s);
      });
    }

    function checkRow() {
      if(!active) return;
      if(currentGuess.includes(null)) {
        document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = 'HINT';
        document.getElementById('fs').textContent = 'Finish your guess before submitting!';
        document.querySelector('.btn').onclick = () => document.getElementById('msg').style.display='none';
        return;
      }
      let hints = [], tCopy = [...target], gCopy = [...currentGuess];
      for(let i=0; i<4; i++) if(gCopy[i] === tCopy[i]) { hints.push('black'); tCopy[i] = gCopy[i] = null; }
      for(let i=0; i<4; i++) if(gCopy[i] && tCopy.includes(gCopy[i])) { hints.push('white'); tCopy[tCopy.indexOf(gCopy[i])] = null; }
      
      let hEls = boardEl.children[currentRow].lastChild.children;
      hints.forEach((h, i) => hEls[i].classList.add(h));
      
      if(hints.filter(h=>h==='black').length === 4) { 
        active = false; document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = 'CRACKED!';
        document.getElementById('fs').textContent = 'Master Mind Unlocked.';
        document.querySelector('.btn').onclick = () => location.reload();
      }
      else if(currentRow === 7) { 
        active = false; document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = 'FAILED';
        document.getElementById('fs').textContent = 'Target was correctly identified in another reality.';
        document.querySelector('.btn').onclick = () => location.reload();
      }
      else { currentRow++; currentGuess = Array(4).fill(null); }
    }
    init();
  </script>
</body>
</html>`
  },
  {
    icon: '⚓',
    en: 'Sea Radar',
    fr: 'Radar Maritime',
    desc_en: 'Find hidden ships on the grid.',
    desc_fr: 'Trouvez les navires cachés sur la grille.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sea Radar</title>
  <style>
    body { background: #011627; color: #fff; text-align: center; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(5, 70px); gap: 8px; background: rgba(59,130,246,0.1); padding: 15px; border-radius: 12px; border: 2px solid #3b82f6; }
    .cell { width: 70px; height: 70px; background: #1e293b; border: 1px solid rgba(59,130,246,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 32px; border-radius: 8px; transition: 0.2s; }
    .cell:hover { background: #2d3748; transform: scale(0.95); }
    h1 { color: #3b82f6; margin-bottom: 20px; letter-spacing: 2px; }
    #stat { margin-top: 20px; font-weight: 700; color: #64748b; }
  </style>
</head>
<body>
  <h1>Sea Radar</h1>
  <div class="grid" id="g"></div>
  <div id="stat">Find 4 Hidden Ships</div>

  <script>
    const grid = document.getElementById('g'), stat = document.getElementById('stat');
    let ships = [], found = 0;
    while(ships.length < 4) {
      let r = Math.floor(Math.random() * 25);
      if(!ships.includes(r)) ships.push(r);
    }

    for(let i=0; i<25; i++) {
      let c = document.createElement('div'); c.className = 'cell';
      c.onclick = () => {
        if(c.classList.contains('hit')) return;
        c.classList.add('hit');
        if(ships.includes(i)) {
          c.textContent = '🚢'; c.style.background = '#ef4444'; found++;
          stat.textContent = 'Ships Found: ' + found + '/4';
          if(found === 4) { stat.textContent = 'VICTORY! ALL SHIPS SUNK'; stat.style.color = '#10b981'; }
        } else {
          c.textContent = '🌊'; c.style.background = '#0d1b2a';
        }
      };
      grid.appendChild(c);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '⚔️',
    en: 'Aura Rogue',
    fr: 'Aura Rogue',
    desc_en: 'Minimal rogue-lite RPG adventure.',
    desc_fr: 'Aventure RPG rogue-lite minimale.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aura Rogue</title>
  <style>
    body { background: #020617; color: #fff; font-family: 'JetBrains Mono', monospace; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .game-console { width: 500px; background: #0f172a; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .stats { display: flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1e293b; color: #10b981; }
    .log { height: 200px; overflow-y: auto; background: #020617; border-radius: 8px; padding: 15px; font-size: 14px; color: #94a3b8; line-height: 1.8; margin-bottom: 20px; }
    .actions { display: flex; gap: 10px; }
    .btn { flex: 1; background: #3b82f6; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 700; transition: 0.2s; }
    .btn:hover { background: #60a5fa; transform: translateY(-2px); }
    .btn.rest { background: #1e293b; border: 1px solid #3b82f6; }
  </style>
</head>
<body>
  <div class="game-console">
    <div class="stats"><span>HP: <b id="hp">100</b></span><span>Gold: <b id="g">0</b></span></div>
    <div class="log" id="l">You step into the Aura Abyss...<br></div>
    <div class="actions">
      <button class="btn" onclick="act('explore')">EXPLORE</button>
      <button class="btn rest" onclick="act('rest')">REST</button>
    </div>
  </div>

  <script>
    let hp = 100, gold = 0;
    const lEl = document.getElementById('l'), hEl = document.getElementById('hp'), gEl = document.getElementById('g');

    function log(msg, type='') {
      const color = type === 'win' ? '#10b981' : (type === 'dmg' ? '#ef4444' : '#94a3b8');
      lEl.innerHTML += '<span style="color:' + color + '">> ' + msg + '</span><br>';
      lEl.scrollTop = lEl.scrollHeight;
    }

    function act(a) {
      if(a === 'explore') {
        let r = Math.random();
        if(r > 0.6) {
          let found = Math.floor(Math.random() * 20) + 5;
          gold += found; log(\`Defeated a shadow! Found \${found} gold.\`, 'win');
        } else if(r > 0.2) {
          let dmg = Math.floor(Math.random() * 15) + 5;
          hp -= dmg; log(\`Ambushed! You took \${dmg} damage.\`, 'dmg');
        } else {
          log("The hallway is empty. Silence fills the room.");
        }
      } else {
        hp = Math.min(100, hp + 20); log("You found a safe corner and rested. +20 HP", 'win');
      }
      hEl.textContent = hp; gEl.textContent = gold;
      if(hp <= 0) { alert('Your journey ends here. Score: ' + gold); location.reload(); }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎰',
    en: 'Vegas Slots',
    fr: 'Slots Vegas',
    desc_en: 'Try your luck with the Aura Slots.',
    desc_fr: 'Tentez votre chance aux Slots Aura.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lucky Slots</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .machine { background: #1e293b; padding: 40px; border: 6px solid #fbbf24; border-radius: 24px; box-shadow: 0 0 50px rgba(251,191,36,0.2); }
    .reels { display: flex; gap: 20px; font-size: 80px; margin-bottom: 30px; background: #0f172a; padding: 20px; border-radius: 12px; }
    .reel { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border: 2px solid #334155; border-radius: 8px; }
    #status { font-size: 24px; font-weight: 900; color: #fbbf24; margin-top: 20px; min-height: 30px; }
    .btn { background: #ef4444; color: #fff; border: none; padding: 15px 40px; font-size: 24px; font-weight: 900; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 0 #991b1b; transition: 0.1s; }
    .btn:active { transform: translateY(4px); box-shadow: 0 0 0; }
  </style>
</head>
<body>
  <div class="machine">
    <div class="reels">
      <div class="reel" id="r1">🍒</div>
      <div class="reel" id="r2">🍒</div>
      <div class="reel" id="r3">🍒</div>
    </div>
    <button class="btn" onclick="spin()">SPIN</button>
  </div>
  <div id="status"></div>

  <script>
    const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];
    let spinning = false;

    function spin() {
      if(spinning) return;
      spinning = true; document.getElementById('status').textContent = 'SPINNING...';
      let iters = 0;
      const interval = setInterval(() => {
        document.getElementById('r1').textContent = symbols[Math.floor(Math.random()*5)];
        document.getElementById('r2').textContent = symbols[Math.floor(Math.random()*5)];
        document.getElementById('r3').textContent = symbols[Math.floor(Math.random()*5)];
        iters++;
        if(iters > 20) {
          clearInterval(interval); spinning = false;
          check();
        }
      }, 50);
    }

    function check() {
      let r1 = document.getElementById('r1').textContent;
      let r2 = document.getElementById('r2').textContent;
      let r3 = document.getElementById('r3').textContent;
      const sEl = document.getElementById('status');
      if(r1 === r2 && r2 === r3) {
        sEl.textContent = 'JACKPOT! 🎉'; sEl.style.color = '#10b981';
      } else if(r1 === r2 || r2 === r3 || r1 === r3) {
        sEl.textContent = 'YOU WIN! 💰'; sEl.style.color = '#3b82f6';
      } else {
        sEl.textContent = 'TRY AGAIN'; sEl.style.color = '#64748b';
      }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎵',
    en: 'Mini Piano',
    fr: 'Mini Piano',
    desc_en: 'Play simple tunes on this virtual piano.',
    desc_fr: 'Jouez des mélodies sur ce piano virtuel.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mini Piano</title>
  <style>
    body { background: #0f172a; display: flex; padding: 50px; gap: 5px; justify-content: center; }
    .k { width: 40px; height: 120px; background: #fff; border: 1px solid #ccc; cursor: pointer; border-radius: 0 0 5px 5px; }
    .k:active { background: #ddd; }
  </style>
</head>
<body>
  <script>
    const n = [261, 293, 329, 349, 392, 440, 493, 523];
    n.forEach(f => {
      let k = document.createElement('div'); k.className = 'k';
      k.onmousedown = () => {
        const a = new AudioContext(), o = a.createOscillator(), g = a.createGain();
        o.frequency.value = f; o.connect(g); g.connect(a.destination); o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.5);
        setTimeout(() => a.close(), 500);
      };
      document.body.appendChild(k);
    });
  </script>
</body>
</html>`
  },
  {
    icon: '🚀',
    en: 'Space Shooter',
    fr: 'Space Shooter',
    desc_en: 'Defend the galaxy from invaders.',
    desc_fr: 'Défendez la galaxie des envahisseurs.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Deep Space Shooter</title>
  <style>
    body { background: #020617; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    canvas { background: #000 url('https://www.transparenttextures.com/patterns/stardust.png'); border: 2px solid #3b82f6; border-radius: 8px; }
    #ui { position: absolute; top: 20px; font-size: 24px; font-weight: 800; color: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(2,6,23,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="ui">SCORE: 0</div>
  <canvas id="c" width="400" height="600"></canvas>
  <div id="msg"><h1>MISSIONS ENDED</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let ship = { x: 180, y: 540, w: 40, h: 40 }, bullets = [], enemies = [], score = 0, active = true;
    
    document.onmousemove = e => {
      if(!active) return;
      let rect = canvas.getBoundingClientRect();
      ship.x = (e.clientX - rect.left) - 20;
    };

    function spawn() { if(active) enemies.push({ x: Math.random()*360, y: -40, speed: 2 + Math.random()*3 }); }
    setInterval(spawn, 800);
    setInterval(() => { if(active) bullets.push({ x: ship.x + 18, y: ship.y }); }, 200);

    function loop() {
      if(!active) return;
      ctx.clearRect(0,0,400,600);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(ship.x, ship.y, 40, 40);
      
      bullets.forEach((b, bi) => {
        b.y -= 10; ctx.fillStyle = '#fbbf24'; ctx.fillRect(b.x, b.y, 4, 10);
        if(b.y < 0) bullets.splice(bi, 1);
      });

      enemies.forEach((e, ei) => {
        e.y += e.speed; ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x, e.y, 40, 40);
        if(e.y > 600) { enemies.splice(ei, 1); score = Math.max(0, score-10); }
        
        bullets.forEach((b, bi) => {
          if(b.x > e.x && b.x < e.x+40 && b.y > e.y && b.y < e.y+40) {
            enemies.splice(ei, 1); bullets.splice(bi, 1);
            score += 20; document.getElementById('ui').textContent = 'SCORE: ' + score;
          }
        });
        if(ship.x < e.x+40 && ship.x+40 > e.x && ship.y < e.y+40 && ship.y+40 > e.y) {
           active = false; document.getElementById('msg').style.display='flex';
           document.getElementById('fs').textContent = 'Score: ' + score;
        }
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🌀',
    en: 'Plinko Lab',
    fr: 'Labo Plinko',
    desc_en: 'Watch the balls fall and win points.',
    desc_fr: 'Regardez les billes tomber et gagnez.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Plinko Lab</title>
  <style>
    body { background: #0f172a; margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let balls = [];
    function loop() {
      x.fillStyle = 'rgba(15,23,42,0.2)'; x.fillRect(0, 0, c.width, c.height);
      balls.forEach((b, i) => {
        b.y += 5; b.x += (Math.random() - 0.5) * 10;
        x.fillStyle = '#3b82f6'; x.beginPath(); x.arc(b.x, b.y, 5, 0, Math.PI * 2); x.fill();
      });
      balls = balls.filter(b => b.y < c.height);
      requestAnimationFrame(loop);
    }
    document.onclick = e => balls.push({ x: e.clientX, y: 0 });
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🚦',
    en: 'Traffic Control',
    fr: 'Contrôle du Trafic',
    desc_en: 'Click on cars to stop or start them.',
    desc_fr: 'Cliquez sur les voitures pour les arrêter.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Traffic Control</title>
  <style>
    body { background: #0f172a; margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let cars = [];
    function spawn() { cars.push({ x: -50, y: c.height/2 - 25, w: 50, h: 30, s: 3, stop: false }); }
    setInterval(spawn, 2000);
    function loop() {
      x.fillStyle = '#1e293b'; x.fillRect(0, 0, c.width, c.height);
      x.fillStyle = '#475569'; x.fillRect(0, c.height/2 - 40, c.width, 80);
      cars.forEach(car => {
        if(!car.stop) car.x += car.s;
        x.fillStyle = car.stop ? '#ef4444' : '#10b981';
        x.fillRect(car.x, car.y, car.w, car.h);
      });
      requestAnimationFrame(loop);
    }
    c.onclick = e => {
      cars.forEach(car => { if(e.clientX > car.x && e.clientX < car.x + car.w) car.stop = !car.stop; });
    };
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🐜',
    en: 'Ant Colony',
    fr: 'Colonie de Fourmis',
    desc_en: 'Watch the ants gather food blocks.',
    desc_fr: 'Observez les fourmis récolter la nourriture.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ant Colony</title>
  <style>
    body { background: #000; margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let ants = [];
    for(let i=0; i<50; i++) ants.push({ x: c.width/2, y: c.height/2, a: Math.random()*Math.PI*2 });
    function loop() {
      x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(0, 0, c.width, c.height);
      ants.forEach(a => {
        a.x += Math.cos(a.a) * 2; a.y += Math.sin(a.a) * 2;
        a.a += (Math.random() - 0.5) * 0.2;
        if(a.x < 0 || a.x > c.width || a.y < 0 || a.y > c.height) a.a += Math.PI;
        x.fillStyle = '#fff'; x.fillRect(a.x, a.y, 2, 2);
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '⏳',
    en: 'Sand Box',
    fr: 'Bac à Sable',
    desc_en: 'Falling sand physics simulator.',
    desc_fr: 'Simulateur physique de sable.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sand Box</title>
  <style>
    body { background: #000; margin: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 100vh; }
    canvas { background: #000; border: 4px solid #3b82f6; border-radius: 8px; image-rendering: pixelated; }
  </style>
</head>
<body>
  <canvas id="c" width="200" height="200" style="width: 400px; height: 400px;"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let grid = Array(200 * 200).fill(0);
    let isDrawing = false;

    function loop() {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 200, 200);
      
      // Update grid from bottom up
      for (let i = 200 * 199 - 1; i >= 0; i--) {
        if (grid[i] === 1) {
          if (grid[i + 200] === 0) {
            grid[i] = 0; grid[i + 200] = 1;
          } else if (grid[i + 199] === 0 && (i % 200 !== 0)) {
            grid[i] = 0; grid[i + 199] = 1;
          } else if (grid[i + 201] === 0 && (i % 200 !== 199)) {
            grid[i] = 0; grid[i + 201] = 1;
          }
        }
      }

      // Draw pixels
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < grid.length; i++) {
        if (grid[i]) {
          ctx.fillRect(i % 200, Math.floor(i / 200), 1, 1);
        }
      }
      requestAnimationFrame(loop);
    }

    canvas.onmousedown = () => isDrawing = true;
    canvas.onmouseup = () => isDrawing = false;
    canvas.onmousemove = (e) => {
      if (isDrawing) {
        let rx = Math.floor(e.offsetX / 2);
        let ry = Math.floor(e.offsetY / 2);
        if (rx >= 0 && rx < 200 && ry >= 0 && ry < 200) {
          grid[ry * 200 + rx] = 1;
        }
      }
    };
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '💎',
    en: 'Match-3 Emoji',
    fr: 'Match-3 Emoji',
    desc_en: 'Simple match-3 logic game.',
    desc_fr: 'Jeu de logique match-3 simple.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Match-3 Emoji</title>
  <style>
    body { background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .g { display: grid; grid-template-columns: repeat(5, 60px); gap: 5px; }
    .c { width: 60px; height: 60px; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 32px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="g" id="g"></div>
  <script>
    const e = ['🍎','🍌','🍇','🍒','🥝'];
    for(let i=0; i<25; i++) {
      let d = document.createElement('div'); d.className = 'c';
      d.textContent = e[Math.floor(Math.random()*5)];
      d.onclick = () => d.textContent = e[Math.floor(Math.random()*5)];
      document.getElementById('g').appendChild(d);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '📐',
    en: 'Shape Memory',
    fr: 'Mémoire de Formes',
    desc_en: 'Remember the sequence of symbols.',
    desc_fr: 'Retenez la séquence de symboles.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shape Memory</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    #display { font-size: 120px; min-height: 150px; margin-bottom: 40px; text-shadow: 0 0 30px rgba(59,130,246,0.3); transition: 0.3s; }
    .controls { display: grid; grid-template-columns: repeat(2, 120px); gap: 20px; }
    .btn-shape { width: 120px; height: 120px; background: #1e293b; border: 3px solid #3b82f6; border-radius: 16px; cursor: pointer; color: #fff; font-size: 40px; transition: 0.2s; }
    .btn-shape:hover { transform: scale(1.05); background: #3b82f6; }
    .btn-shape:active { transform: scale(0.95); }
    h1 { color: #3b82f6; margin-bottom: 20px; font-weight: 900; letter-spacing: 2px; }
    #msg { font-size: 24px; color: #64748b; margin-top: 30px; min-height: 30px; }
    #start { margin-top: 30px; padding: 15px 40px; background: #10b981; color: #fff; border: none; border-radius: 50px; font-size: 20px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 0 #065f46; }
    #start:active { transform: translateY(4px); box-shadow: none; }
  </style>
</head>
<body>
  <h1>Shape Memory</h1>
  <div id="display">?</div>
  <div class="controls" id="cnt">
    <button class="btn-shape" onclick="tap('▲')">▲</button>
    <button class="btn-shape" onclick="tap('●')">●</button>
    <button class="btn-shape" onclick="tap('■')">■</button>
    <button class="btn-shape" onclick="tap('★')">★</button>
  </div>
  <div id="msg">Press Start to Play</div>
  <button id="start" onclick="play()">START SEQUENCE</button>

  <script>
    const syms = ['▲', '●', '■', '★'], dEl = document.getElementById('display'), mEl = document.getElementById('msg'), sBtn = document.getElementById('start');
    let seq = [], userIndex = 0, active = false;

    function play() {
      sBtn.style.display = 'none'; seq = []; nextLevel();
    }

    function nextLevel() {
      seq.push(syms[Math.floor(Math.random() * 4)]);
      userIndex = 0; active = false;
      mEl.textContent = 'WATCH...';
      let i = 0;
      const interval = setInterval(() => {
        dEl.textContent = seq[i]; dEl.style.transform = 'scale(1.2)';
        setTimeout(() => { dEl.style.transform = 'scale(1)'; }, 300);
        i++;
        if (i >= seq.length) {
          clearInterval(interval);
          setTimeout(() => { dEl.textContent = '?'; mEl.textContent = 'YOUR TURN!'; active = true; }, 800);
        }
      }, 1000);
    }

    function tap(s) {
      if (!active) return;
      if (s === seq[userIndex]) {
        userIndex++;
        if (userIndex === seq.length) {
          active = false; mEl.textContent = 'CORRECT! NEXT LEVEL...';
          setTimeout(nextLevel, 1000);
        }
      } else {
        active = false; mEl.textContent = 'FAILED! Score: ' + (seq.length - 1);
        mEl.style.color = '#ef4444'; sBtn.style.display = 'block'; sBtn.textContent = 'RETRY';
      }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🥁',
    en: 'Drum Machine',
    fr: 'Boîte à Rythmes',
    desc_en: 'Make some noise with digital drums.',
    desc_fr: 'Faites du bruit avec cette batterie.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Drum Machine Pro</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(4, 100px); gap: 15px; }
    .pad { width: 100px; height: 100px; background: #1e293b; border: 3px solid #3b82f6; border-radius: 12px; cursor: pointer; transition: 0.1s; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; }
    .pad:hover { background: #2d3748; }
    .pad:active { background: #3b82f6; transform: scale(0.95); box-shadow: 0 0 20px rgba(59,130,246,0.5); }
    h1 { color: #3b82f6; margin-bottom: 30px; letter-spacing: 3px; font-weight: 900; }
    .hint { margin-top: 30px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <h1>DRUM MACHINE</h1>
  <div class="grid" id="g"></div>
  <div class="hint">Click the pads to synthesize sounds</div>

  <script>
    const gEl = document.getElementById('g');
    const labels = ['KICK', 'SNARE', 'HIHAT', 'CLAP', 'TOM', 'RIM', 'COW', 'UP'];
    for (let i = 0; i < 16; i++) {
      let p = document.createElement('div'); p.className = 'pad';
      p.textContent = labels[i % labels.length] || 'HIT';
      p.onmousedown = () => {
        const a = new AudioContext(), o = a.createOscillator(), g = a.createGain();
        o.type = i % 2 === 0 ? 'sine' : 'square';
        o.frequency.setValueAtTime(50 + i * 40, a.currentTime);
        o.frequency.exponentialRampToValueAtTime(0.01, a.currentTime + 0.3);
        o.connect(g); g.connect(a.destination);
        o.start();
        g.gain.setValueAtTime(1, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.3);
        setTimeout(() => a.close(), 400);
      };
      gEl.appendChild(p);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🌋',
    en: 'Lava Jump',
    fr: 'Saut de Lave',
    desc_en: 'Don\'t touch the rising lava!',
    desc_fr: 'Ne touchez pas la lave qui monte !',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lava Jump</title>
  <style>
    body { background: #0c0f16; color: #fff; margin: 0; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    canvas { background: #181c24; border: 4px solid #ef4444; border-radius: 12px; box-shadow: 0 0 50px rgba(239, 68, 68, 0.3); }
    #score { font-size: 48px; font-weight: 900; color: #ef4444; margin-bottom: 20px; }
    #msg { position:fixed;inset:0;background:rgba(12,15,22,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#ef4444; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="score">0</div>
  <canvas id="c" width="400" height="500"></canvas>
  <div id="msg"><h1>CRITICAL HEAT</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), sEl = document.getElementById('score');
    let x = 185, py = 400, vy = 0, score = 0, lavaY = 500, gameActive = true;
    let platforms = [{ x: 150, y: 450, w: 100 }];

    for(let i=0; i<10; i++) platforms.push({ x: Math.random()*300, y: 450 - i*80, w: 100 });

    canvas.onclick = () => { if(gameActive) vy = -12; };

    function loop() {
      if(!gameActive) return;
      ctx.clearRect(0,0,400,500);
      
      vy += 0.5; py += vy;
      lavaY -= 0.5;
      if(py > lavaY) { 
        gameActive = false; document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Score: ' + score;
      }

      ctx.fillStyle = '#3b82f6';
      platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.w, 15);
        if(vy > 0 && py + 30 > p.y && py + 30 < p.y + 15 && x+15 > p.x && x+15 < p.x + p.w) { vy = -12; score++; sEl.textContent = score; }
      });

      ctx.fillStyle = '#fff'; ctx.fillRect(x, py, 30, 30);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(0, lavaY, 400, 500-lavaY);

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🏙️',
    en: 'Aura City',
    fr: 'Aura City',
    desc_en: 'Click to build your miniature city.',
    desc_fr: 'Cliquez pour construire votre ville.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aura City Architect</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(10, 45px); gap: 2px; background: #1e293b; padding: 10px; border-radius: 12px; border: 2px solid #3b82f6; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .cell { width: 45px; height: 45px; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: 0.2s; border-radius: 4px; }
    .cell:hover { background: rgba(59,130,246,0.15); transform: scale(1.05); }
    h1 { color: #3b82f6; margin-bottom: 25px; letter-spacing: 1px; font-weight: 900; }
    .palette { display: flex; gap: 10px; margin-top: 30px; }
    .tool { font-size: 30px; background: #1e293b; border: 2px solid transparent; padding: 10px; border-radius: 10px; cursor: pointer; transition: 0.2s; }
    .tool.active { border-color: #3b82f6; background: rgba(59,130,246,0.2); }
  </style>
</head>
<body>
  <h1>Aura City</h1>
  <div class="grid" id="g"></div>
  <div class="palette" id="p"></div>

  <script>
    const items = ['🏠','🏢','🏦','🌳','⛲','🗼','🚗','🚀'], gEl = document.getElementById('g'), pEl = document.getElementById('p');
    let selected = items[0];

    items.forEach(item => {
      let b = document.createElement('div'); b.className = 'tool'; b.textContent = item;
      if(item === selected) b.classList.add('active');
      b.onclick = () => { document.querySelectorAll('.tool').forEach(t=>t.classList.remove('active')); b.classList.add('active'); selected = item; };
      pEl.appendChild(b);
    });

    for(let i=0; i<100; i++) {
      let c = document.createElement('div'); c.className = 'cell';
      c.onclick = () => { c.textContent = selected; c.style.background = 'rgba(59,130,246,0.1)'; };
      gEl.appendChild(c);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🏃',
    en: 'Cyber Runner',
    fr: 'Cyber Runner',
    desc_en: 'Endless neon jumping game with increasing speed.',
    desc_fr: 'Jeu de saut néon infini avec vitesse croissante.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyber Runner</title>
  <style>
    body { background: #0c0a09; color: #fff; margin:0; overflow:hidden; font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; }
    canvas { background: #1c1917; border: 4px solid #3b82f6; border-radius: 12px; box-shadow: 0 0 40px rgba(59,130,246,0.3); cursor: pointer; }
    #score { position:absolute; top:40px; font-size:48px; font-weight:900; color:#3b82f6; text-shadow: 0 0 10px rgba(59,130,246,0.5); }
  </style>
</head>
<body>
  <div id="score">0</div>
  <canvas id="c" width="800" height="400"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), sEl = document.getElementById('score');
    let player = { x: 50, y: 300, w: 40, h: 40, vy: 0, grounded: true }, obstacles = [], score = 0, speed = 6, frame = 0;
    
    function jump() { if(player.grounded) { player.vy = -12; player.grounded = false; } }
    canvas.onclick = jump; document.onkeydown = e => { if(e.code==='Space') jump(); };

    function loop() {
      ctx.clearRect(0,0,800,400); player.vy += 0.6; player.y += player.vy;
      if(player.y > 300) { player.y = 300; player.vy = 0; player.grounded = true; }
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(player.x, player.y, player.w, player.h);
      
      if(frame % 70 === 0) obstacles.push({ x: 800, w: 30+Math.random()*40, h: 40+Math.random()*60 });
      obstacles.forEach((o, i) => {
        o.x -= speed; ctx.fillStyle = '#ef4444'; ctx.fillRect(o.x, 340-o.h, o.w, o.h);
        if(o.x+o.w < 0) { obstacles.splice(i, 1); score++; sEl.textContent = score; speed += 0.1; }
        if(player.x < o.x+o.w && player.x+player.w > o.x && player.y+player.h > 340-o.h) { location.reload(); }
      });
      ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(0,340); ctx.lineTo(800,340); ctx.stroke();
      frame++; requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '👾',
    en: 'Bit Invaders',
    fr: 'Bit Invaders',
    desc_en: 'Classic retro space invaders remake.',
    desc_fr: 'Remake classique de space invaders.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bit Invaders</title>
  <style>
    body { background: #000; color: #0f0; font-family: 'Courier New', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    canvas { border: 2px solid #0f0; box-shadow: 0 0 20px #0f0; cursor: crosshair; }
    #msg { position:fixed;inset:0;background:rgba(0,0,0,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#0f0; color:#000; border:none; padding:12px 30px; border-radius:4px; font-weight:800; cursor:pointer; margin-top:20px; font-family:monospace; }
  </style>
</head>
<body>
  <canvas id="c" width="600" height="500"></canvas>
  <div id="msg"><h1 id="txt">MISSION END</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">SYSTEM REBOOT</button></div>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let ship = { x: 280, y: 450 }, bullets = [], enemies = [], dir = 1, frame = 0, score = 0, active = true;
    for(let i=0; i<30; i++) enemies.push({ x: (i%10)*50 + 50, y: Math.floor(i/10)*40 + 50 });

    document.onmousemove = e => {
      if(!active) return;
      let rect = c.getBoundingClientRect();
      ship.x = (e.clientX - rect.left) - 20;
    };
    document.onclick = () => { if(active) bullets.push({ x: ship.x + 18, y: ship.y }); };

    function loop() {
      if(!active) return;
      x.fillStyle = '#000'; x.fillRect(0, 0, 600, 500);
      x.fillStyle = '#0f0'; x.fillRect(ship.x, ship.y, 40, 20);
      
      bullets.forEach((b, bi) => {
        b.y -= 8; x.fillRect(b.x, b.y, 4, 10);
        enemies.forEach((e, ei) => {
          if(b.x > e.x && b.x < e.x+30 && b.y > e.y && b.y < e.y+20) {
            enemies.splice(ei, 1); bullets.splice(bi, 1); score += 100;
          }
        });
      });

      let edge = false;
      enemies.forEach(e => {
        e.x += dir * 2; if(e.x > 560 || e.x < 10) edge = true;
        x.fillText('M', e.x, e.y);
      });
      if(edge) { dir *= -1; enemies.forEach(e => e.y += 20); }
      if(enemies.length === 0) { 
        active = false; document.getElementById('msg').style.display = 'flex';
        document.getElementById('txt').textContent = "YOU WIN!";
        document.getElementById('fs').textContent = "Final Score: " + score;
      }
      if(enemies.some(e => e.y > 430)) { 
        active = false; document.getElementById('msg').style.display = 'flex';
        document.getElementById('txt').textContent = "GAME OVER";
        document.getElementById('fs').textContent = "Score: " + score;
      }
      requestAnimationFrame(loop);
    }
    x.font = '24px monospace'; loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🏎️',
    en: 'Neon Racer Pro',
    fr: 'Neon Racer Pro',
    desc_en: 'Navigate traffic in a high-speed neon city.',
    desc_fr: 'Naviguez dans le trafic d\'une ville néon à haute vitesse.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neon Racer</title>
  <style>
    body { background: #020617; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; font-family: sans-serif; }
    canvas { background: #0f172a; border-left: 4px dashed #3b82f6; border-right: 4px dashed #3b82f6; cursor: pointer; }
    #msg { position:fixed;inset:0;background:rgba(2,6,23,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
    #score-ui { position: absolute; top: 40px; font-size: 32px; font-weight: 900; color: #3b82f6; }
  </style>
</head>
<body>
  <div id="score-ui">0</div>
  <canvas id="c" width="400" height="600"></canvas>
  <div id="msg"><h1>CRASHED!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d'), sUi = document.getElementById('score-ui');
    let px = 180, cars = [], score = 0, speed = 7, active = true;
    document.onkeydown = e => {
      if(!active) return;
      if(e.key === 'ArrowLeft') px = Math.max(20, px - 60);
      if(e.key === 'ArrowRight') px = Math.min(340, px + 60);
    };

    function loop() {
      if(!active) return;
      x.fillStyle = '#0f172a'; x.fillRect(0, 0, 400, 600);
      x.fillStyle = '#3b82f6'; x.fillRect(px, 500, 40, 70);
      
      if(Math.random() < 0.03) cars.push({ x: [20, 80, 140, 200, 260, 320][Math.floor(Math.random()*6)], y: -100 });
      cars.forEach((car, i) => {
        car.y += speed; x.fillStyle = '#ef4444'; x.fillRect(car.x, car.y, 40, 70);
        if(car.y > 600) { cars.splice(i, 1); score++; sUi.textContent = score; speed += 0.05; }
        if(car.y > 430 && car.y < 570 && car.x === px) { 
           active = false; document.getElementById('msg').style.display = 'flex';
           document.getElementById('fs').textContent = 'Score: ' + score;
        }
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '☄️',
    en: 'Asteroid Crusher',
    fr: 'Broyeur d\'Astéroïdes',
    desc_en: 'Classic vector asteroids with physics.',
    desc_fr: 'Classique astéroïdes vectoriels avec physique.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Asteroid Crusher</title>
  <style>
    body { background: #000; color: #fff; margin:0; overflow:hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let ship = { x: c.width/2, y: c.height/2, a: 0, vx: 0, vy: 0 }, asters = [], bullets = [], keys = {};
    for(let i=0; i<8; i++) asters.push({ x: Math.random()*c.width, y: Math.random()*c.height, r: 40, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4 });

    document.onkeydown = e => keys[e.code] = true;
    document.onkeyup = e => keys[e.code] = false;

    function loop() {
      x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
      if(keys['ArrowLeft']) ship.a -= 0.1; if(keys['ArrowRight']) ship.a += 0.1;
      if(keys['ArrowUp']) { ship.vx += Math.cos(ship.a)*0.2; ship.vy += Math.sin(ship.a)*0.2; }
      if(keys['Space'] && frame % 10 === 0) bullets.push({ x: ship.x, y: ship.y, vx: Math.cos(ship.a)*10, vy: Math.sin(ship.a)*10 });

      ship.x = (ship.x + ship.vx + c.width) % c.width;
      ship.y = (ship.y + ship.vy + c.height) % c.height;

      x.strokeStyle = '#fff'; x.beginPath();
      x.moveTo(ship.x + Math.cos(ship.a)*20, ship.y + Math.sin(ship.a)*20);
      x.lineTo(ship.x + Math.cos(ship.a+2.5)*15, ship.y + Math.sin(ship.a+2.5)*15);
      x.lineTo(ship.x + Math.cos(ship.a-2.5)*15, ship.y + Math.sin(ship.a-2.5)*15);
      x.closePath(); x.stroke();

      asters.forEach((a, ai) => {
        a.x = (a.x + a.vx + c.width) % c.width; a.y = (a.y + a.vy + c.height) % c.height;
        x.beginPath(); x.arc(a.x, a.y, a.r, 0, Math.PI*2); x.stroke();
        bullets.forEach((b, bi) => {
          if(Math.hypot(b.x-a.x, b.y-a.y) < a.r) {
            if(a.r > 20) { 
              asters.push({ x: a.x, y: a.y, r: a.r/2, vx: -a.vx, vy: a.vy });
              a.r /= 2; a.vx = -a.vx;
            } else asters.splice(ai, 1);
            bullets.splice(bi, 1);
          }
        });
      });
      bullets.forEach(b => { b.x += b.vx; b.y += b.vy; x.fillRect(b.x, b.y, 2, 2); });
      frame++; requestAnimationFrame(loop);
    }
    let frame = 0; loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🏰',
    en: 'Dungeon Escape',
    fr: 'Évasion du Donjon',
    desc_en: 'Navigate a deadly grid-based dungeon.',
    desc_fr: 'Naviguez dans un donjon mortel en grille.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dungeon Escape</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin:0; }
    .grid { display: grid; grid-template-columns: repeat(10, 40px); gap: 2px; background: #1e293b; padding: 10px; border-radius: 8px; border: 2px solid #3b82f6; }
    .cell { width: 40px; height: 40px; background: #0f172a; display: flex; align-items: center; justify-content: center; font-size: 24px; }
    .wall { background: #334155; }
    #msg-ui { margin-bottom: 20px; font-weight: 800; color: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="msg-ui">FIND THE EXIT (🗝️ -> 🚪)</div>
  <div class="grid" id="g"></div>
  <div id="msg"><h1>ESCAPED!</h1><h2 id="fs">The dungeon is empty now.</h2><button class="btn" onclick="location.reload()">NEXT MISSION</button></div>
  <script>
    const map = [
      1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,1,0,0,0,0,1,
      1,0,1,0,1,0,1,1,0,1,
      1,0,1,0,0,0,0,1,0,1,
      1,0,1,1,1,1,0,1,0,1,
      1,0,0,0,0,0,0,0,0,1,
      1,1,1,1,0,1,1,1,1,1,
      1,0,0,0,0,1,0,0,0,1,
      1,0,1,1,0,0,0,1,0,1,
      1,1,1,1,1,1,1,1,1,1
    ];
    let pos = 11, hasKey = false, exit = 88, key = 18, active = true;
    const g = document.getElementById('g');
    function draw() {
      g.innerHTML = '';
      map.forEach((t, i) => {
        let c = document.createElement('div'); c.className = 'cell' + (t?' wall':'');
        if(i === pos) c.textContent = '👤';
        if(i === exit) c.textContent = hasKey ? '🚪' : '🔒';
        if(i === key && !hasKey) c.textContent = '🗝️';
        g.appendChild(c);
      });
    }
    document.onkeydown = e => {
      if(!active) return;
      let next = pos;
      if(e.key === 'ArrowUp') next -= 10; if(e.key === 'ArrowDown') next += 10;
      if(e.key === 'ArrowLeft') next -= 1; if(e.key === 'ArrowRight') next += 1;
      if(!map[next]) {
        pos = next;
        if(pos === key) hasKey = true;
        if(pos === exit && hasKey) { 
           active = false; document.getElementById('msg').style.display = 'flex';
        }
        draw();
      }
    };
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '⚡',
    en: 'Glitch Jump',
    fr: 'Glitch Jump',
    desc_en: 'Wall-jump your way up to the top.',
    desc_fr: 'Sautez contre les murs pour grimper au sommet.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Glitch Jump</title>
  <style>
    body { background: #0c0a09; color: #fff; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
    canvas { background: #1c1917; border: 3px solid #8b5cf6; }
  </style>
</head>
<body>
  <canvas id="c" width="300" height="500"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let p = { x: 140, y: 400, vx: 0, vy: 0 }, walls = [], score = 0;
    for(let i=0; i<20; i++) walls.push({ y: 400-i*60, x: i%2===0 ? 0 : 250, w: 50, h: 10 });

    document.onkeydown = e => {
      if(e.key === 'ArrowLeft') p.vx = -5; if(e.key === 'ArrowRight') p.vx = 5;
      if(e.key === 'ArrowUp') p.vy = -10;
    };
    document.onkeyup = () => p.vx = 0;

    function loop() {
      x.fillStyle = '#1c1917'; x.fillRect(0,0,300,500);
      p.vy += 0.5; p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = 0; if(p.x > 280) p.x = 280;
      
      x.fillStyle = '#8b5cf6'; x.fillRect(p.x, p.y, 20, 20);
      walls.forEach(w => {
        x.fillStyle = '#444'; x.fillRect(w.x, w.y, w.w, w.h);
        if(p.vy > 0 && p.x < w.x+w.w && p.x+20 > w.x && p.y+20 > w.y && p.y+10 < w.y) { p.vy = -12; score++; }
      });
      if(p.y > 500) { location.reload(); }
      if(p.y < 100) { walls.forEach(w => w.y += 5); p.y += 5; }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🎯',
    en: 'Laser Dodge',
    fr: 'Laser Dodge',
    desc_en: 'Bullet hell reflex game. Stay alive as long as possible.',
    desc_fr: 'Jeu de réflexes bullet hell. Restez en vie le plus longtemps possible.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Laser Dodge</title>
  <style>
    body { background: #020617; margin:0; overflow:hidden; display:flex; align-items:center; justify-content:center; height:100vh; }
    canvas { background: #000; border: 2px solid #ef4444; border-radius: 50%; }
  </style>
</head>
<body>
  <canvas id="c" width="400" height="400"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let px = 200, py = 200, lasers = [], frame = 0;
    document.onmousemove = e => {
      let r = c.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
    };

    function loop() {
      x.fillStyle = 'rgba(0,0,0,0.1)'; x.fillRect(0, 0, 400, 400);
      if(frame % 10 === 0) {
        let side = Math.floor(Math.random()*4);
        let l = { x: 0, y: 0, vx: 0, vy: 0 };
        if(side===0) { l.x=Math.random()*400; l.y=0; l.vy=3; }
        if(side===1) { l.x=Math.random()*400; l.y=400; l.vy=-3; }
        if(side===2) { l.x=0; l.y=Math.random()*400; l.vx=3; }
        if(side===3) { l.x=400; l.y=Math.random()*400; l.vx=-3; }
        lasers.push(l);
      }
      x.fillStyle = '#3b82f6'; x.beginPath(); x.arc(px, py, 5, 0, Math.PI*2); x.fill();
      lasers.forEach((l, i) => {
        l.x += l.vx; l.y += l.vy; x.fillStyle = '#ef4444'; x.fillRect(l.x, l.y, 4, 4);
        if(Math.hypot(l.x-px, l.y-py) < 8) { location.reload(); }
      });
      frame++; requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🥊',
    en: 'Pulse Strike',
    fr: 'Pulse Strike',
    desc_en: 'Timing-based hit game. Click when pulses overlap.',
    desc_fr: 'Jeu de frappe basé sur le timing. Cliquez quand les cercles se touchent.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pulse Strike</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin:0; }
    canvas { background: #1e293b; border-radius: 50%; border: 4px solid #3b82f6; }
    #score { font-size: 32px; font-weight: 900; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div id="score">0</div>
  <canvas id="c" width="300" height="300"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let r = 150, score = 0;
    canvas.onclick = () => {
      if(r < 60 && r > 40) { score++; document.getElementById('score').textContent = score; r = 150; }
      else { location.reload(); }
    };

    function loop() {
      x.clearRect(0,0,300,300);
      x.strokeStyle = '#3b82f6'; x.lineWidth = 5;
      x.beginPath(); x.arc(150, 150, 50, 0, Math.PI*2); x.stroke();
      x.strokeStyle = '#ef4444'; x.beginPath(); x.arc(150, 150, r, 0, Math.PI*2); x.stroke();
      r -= 2; if(r < 0) { location.reload(); }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🚜',
    en: 'Pixel Tank',
    fr: 'Pixel Tank',
    desc_en: 'Retro arena tank battle vs drones.',
    desc_fr: 'Bataille de chars rétro contre des drones.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pixel Tank</title>
  <style>
    body { background: #1c1917; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    canvas { background: #292524; border: 2px solid #f59e0b; }
  </style>
</head>
<body>
  <canvas id="c" width="500" height="400"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let p = { x: 250, y: 200, a: 0 }, bullets = [], enemies = [];
    document.onkeydown = e => {
      if(e.key === 'ArrowLeft') p.a -= 0.1; if(e.key === 'ArrowRight') p.a += 0.1;
      if(e.key === 'ArrowUp') { p.x += Math.cos(p.a)*4; p.y += Math.sin(p.a)*4; }
      if(e.key === 'Space') bullets.push({ x: p.x, y: p.y, a: p.a });
    };

    function loop() {
      x.clearRect(0,0,500,400); x.save(); x.translate(p.x, p.y); x.rotate(p.a);
      x.fillStyle = '#f59e0b'; x.fillRect(-15, -10, 30, 20); x.fillRect(0, -2, 20, 4);
      x.restore();

      if(Math.random() < 0.02) enemies.push({ x: Math.random()*500, y: Math.random()*400 });
      enemies.forEach((e, ei) => {
        x.fillStyle = '#ef4444'; x.fillRect(e.x-10, e.y-10, 20, 20);
        bullets.forEach((b, bi) => {
          if(Math.hypot(b.x-e.x, b.y-e.y) < 15) { enemies.splice(ei, 1); bullets.splice(bi, 1); }
        });
        if(Math.hypot(p.x-e.x, p.y-e.y) < 20) { location.reload(); }
      });
      bullets.forEach(b => { b.x += Math.cos(b.a)*6; b.y += Math.sin(b.a)*6; x.fillStyle='#fff'; x.fillRect(b.x, b.y, 4, 4); });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🥷',
    en: 'Shadow Ninja',
    fr: 'Shadow Ninja',
    desc_en: 'Minimal stealth movement game.',
    desc_fr: 'Jeu de mouvement furtif minimaliste.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shadow Ninja</title>
  <style>
    body { background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    canvas { background: #111; border: 2px solid #ef4444; cursor: pointer; }
    #msg { position:fixed;inset:0;background:rgba(0,0,0,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#ef4444; color:#fff; border:none; padding:12px 30px; border-radius:4px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <canvas id="c" width="400" height="400"></canvas>
  <div id="msg"><h1>MISSION COMPLETE</h1><h2 id="fs">Silent and deadly.</h2><button class="btn" onclick="location.reload()">NEXT CONTRACT</button></div>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    let px = 20, py = 20, guards = [{x: 200, y: 200, vx: 2, r: 100}], active = true;
    document.onmousemove = e => { 
      if(!active) return;
      let r=c.getBoundingClientRect(); 
      px=e.clientX-r.left; py=e.clientY-r.top; 
    };

    function loop() {
      if(!active) return;
      x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(0,0,400,400);
      guards.forEach(g => {
        g.x += g.vx; if(g.x > 350 || g.x < 50) g.vx *= -1;
        x.fillStyle = 'rgba(255, 0, 0, 0.2)'; x.beginPath(); x.arc(g.x, g.y, g.r, 0, Math.PI*2); x.fill();
        x.fillStyle = '#f00'; x.fillRect(g.x-5, g.y-5, 10, 10);
        if(Math.hypot(px-g.x, py-g.y) < g.r) { x.fillStyle='#f00'; x.font='20px sans-serif'; x.fillText('CAUGHT!', 150, 200); }
      });
      x.fillStyle = '#fff'; x.fillRect(px-5, py-5, 10, 10);
      if(px > 380 && py > 380) { 
        active = false; document.getElementById('msg').style.display = 'flex';
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🔳',
    en: 'Memory Matrix',
    fr: 'Memory Matrix',
    desc_en: 'Remember and click the highlighted tiles.',
    desc_fr: 'Mémorisez et cliquez sur les tuiles surlignées.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Memory Matrix</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(4, 70px); gap: 10px; }
    .cell { width: 70px; height: 70px; background: #1e293b; border-radius: 8px; cursor: pointer; transition: 0.3s; }
    .cell.active { background: #3b82f6; box-shadow: 0 0 20px #3b82f6; }
    #status { margin-top: 20px; font-weight: 700; color: #64748b; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="grid" id="g"></div>
  <div id="status">WATCH THE PATTERN...</div>
  <div id="msg"><h1>PATTERN BROKEN</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const g = document.getElementById('g'), m = document.getElementById('status');
    let pattern = [], user = [], level = 1, active = true;
    for(let i=0; i<16; i++) {
        let d = document.createElement('div'); d.className = 'cell';
        d.onclick = () => tap(i); g.appendChild(d);
    }
    function start() {
      if(!active) return;
      pattern = []; user = []; m.textContent = 'WATCH...';
      while(pattern.length < 2 + level) {
        let r = Math.floor(Math.random()*16);
        if(!pattern.includes(r)) pattern.push(r);
      }
      pattern.forEach((p, i) => {
        setTimeout(() => { if(active) { g.children[p].classList.add('active'); setTimeout(()=>g.children[p].classList.remove('active'), 600); } }, i*800);
      });
      setTimeout(() => { if(active) m.textContent = 'YOUR TURN'; }, pattern.length * 850);
    }
    function tap(i) {
      if(!active || m.textContent !== 'YOUR TURN') return;
      if(pattern.includes(i)) {
        g.children[i].classList.add('active'); user.push(i);
        if(user.length === pattern.length) { level++; setTimeout(() => { reset(); start(); }, 500); }
      } else { 
        active = false; document.getElementById('msg').style.display = 'flex';
        document.getElementById('fs').textContent = 'Level reached: ' + level;
      }
    }
    function reset() { Array.from(g.children).forEach(c => c.classList.remove('active')); }
    setTimeout(start, 1000);
  </script>
</body>
</html>`
  },
  {
    icon: '⬢',
    en: 'Hex Match',
    fr: 'Hex Match',
    desc_en: 'Hexagonal match-3 logic challenge.',
    desc_fr: 'Défi logiques match-3 hexagonal.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hex Match</title>
  <style>
    body { background: #0c0a09; color: #fff; margin:0; display:flex; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; }
    .g { display: grid; grid-template-columns: repeat(5, 60px); gap: 5px; }
    .h { width: 60px; height: 60px; background: #1e293b; display: flex; align-items: center; justify-content: center; clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); cursor: pointer; font-size: 24px; transition: 0.2s; }
    .h:hover { transform: scale(1.1); background: #3b82f6; }
  </style>
</head>
<body>
  <div class="g" id="g"></div>
  <script>
    const e = ['💎','🌀','🔥','❄️','🍀'];
    const g = document.getElementById('g');
    for(let i=0; i<30; i++) {
        let d = document.createElement('div'); d.className = 'h';
        d.textContent = e[Math.floor(Math.random()*5)];
        d.onclick = () => d.textContent = e[Math.floor(Math.random()*5)];
        g.appendChild(d);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🔡',
    en: 'Word Scramble',
    fr: 'Mots Mêlés',
    desc_en: 'Unscramble the coding keyword.',
    desc_fr: 'Déchiffrez le mot-clé de code.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Word Scramble</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;}
    #scrambled { font-size: 48px; color: #3b82f6; margin-bottom: 20px; letter-spacing: 5px; text-transform: uppercase; }
    input { background: #1e293b; border: 2px solid #3b82f6; color: #fff; padding: 10px; font-size: 24px; border-radius: 8px; width: 300px; text-align: center; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; font-family:sans-serif;}
  </style>
</head>
<body>
  <div id="scrambled"></div>
  <input type="text" id="target" placeholder="TYPE HERE..." autocomplete="off" />
  <div id="msg"><h1>CORRECT!</h1><h2 id="fs">Word decoded successfully.</h2><button class="btn" onclick="location.reload()">NEXT WORD</button></div>
  <script>
    const words = ['JAVASCRIPT', 'INTERFACE', 'COMPONENT', 'VARIABLE', 'FUNCTION'];
    let word = words[Math.floor(Math.random()*words.length)];
    let scrambled = word.split('').sort(()=>Math.random()-0.5).join('');
    document.getElementById('scrambled').textContent = scrambled;
    document.getElementById('target').oninput = (e) => {
      if(e.target.value.toUpperCase() === word) { 
        document.getElementById('msg').style.display = 'flex';
      }
    };
  </script>
</body>
</html>`
  },
  {
    icon: '⚡',
    en: 'Math Sprint',
    fr: 'Math Sprint',
    desc_en: 'Answer math problems fast before time runs out.',
    desc_fr: 'Répondez aux calculs avant la fin du temps.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Math Sprint</title>
  <style>
    body { background: #020617; color: #fff; font-family: sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;}
    #q { font-size: 64px; font-weight: 900; color: #10b981; }
    .btns { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
    .btn-opt { padding: 20px 40px; background: #1e293b; border: 2px solid #3b82f6; color: #fff; font-size: 32px; border-radius: 12px; cursor: pointer; transition: 0.2s; }
    .btn-opt:hover { background: #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(2,6,23,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .retry-btn { background:#10b981; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="q"></div>
  <div class="btns" id="b"></div>
  <div id="msg"><h1 id="txt">RESULT</h1><h2 id="fs"></h2><button class="retry-btn" onclick="location.reload()">NEXT</button></div>
  <script>
    let a=Math.ceil(Math.random()*10), b=Math.ceil(Math.random()*10), res=a+b, active=true;
    document.getElementById('q').textContent = a + ' + ' + b + ' = ?';
    let opts = [res, res+Math.ceil(Math.random()*5), res-Math.ceil(Math.random()*3)].sort(()=>Math.random()-0.5);
    opts.forEach(o => {
        let btn = document.createElement('button'); btn.className='btn-opt'; btn.textContent=o;
        btn.onclick = () => { 
          if(!active) return;
          active = false; document.getElementById('msg').style.display='flex';
          if(o === res) { document.getElementById('txt').textContent = 'GOOD!'; } 
          else { document.getElementById('txt').textContent = 'WRONG!'; document.getElementById('txt').style.color = '#ef4444'; }
          document.getElementById('fs').textContent = 'The answer was ' + res;
        };
        document.getElementById('b').appendChild(btn);
    });
  </script>
</body>
</html>`
  },
  {
    icon: '🌊',
    en: 'Color Flow',
    fr: 'Color Flow',
    desc_en: 'Connect matching colors on the grid.',
    desc_fr: 'Connectez les couleurs sur la grille.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Color Flow</title>
  <style>
    body { background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .g { display: grid; grid-template-columns: repeat(5, 50px); gap: 10px; background: #1e293b; padding: 10px; border-radius: 12px; }
    .c { width: 50px; height: 50px; background: #334155; border-radius: 50%; cursor: pointer; }
    .c.active { background: #3b82f6; box-shadow: 0 0 15px #3b82f6; }
  </style>
</head>
<body>
  <div class="g" id="g"></div>
  <script>
    for(let i=0; i<25; i++) {
        let d = document.createElement('div'); d.className = 'c';
        d.onclick = () => d.classList.toggle('active');
        document.getElementById('g').appendChild(d);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🔌',
    en: 'Logic Gates',
    fr: 'Logic Gates',
    desc_en: 'Simulate basic logic gates for educational fun.',
    desc_fr: 'Simulez des portes logiques pour le plaisir.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Logic Gates</title>
  <style>
    body { background: #0c0f16; color: #fff; font-family: monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
    .gate { border: 2px solid #3b82f6; padding: 20px; border-radius: 12px; display: flex; gap: 20px; align-items: center; }
    .in { width: 30px; height: 30px; background: #444; border-radius: 4px; cursor: pointer; }
    .in.on { background: #10b981; }
    .out { width: 40px; height: 40px; background: #444; border-radius: 50%; transition: 0.3s; }
    .out.on { background: #ef4444; box-shadow: 0 0 20px #ef4444; }
  </style>
</head>
<body>
  <h1>AND GATE SIMULATOR</h1>
  <div class="gate">
    <div id="i1" class="in"></div>
    <span>AND</span>
    <div id="i2" class="in"></div>
    <span>=</span>
    <div id="out" class="out"></div>
  </div>
  <script>
    let a=0, b=0;
    const i1=document.getElementById('i1'), i2=document.getElementById('i2'), o=document.getElementById('out');
    i1.onclick = () => { a=!a; i1.classList.toggle('on'); update(); };
    i2.onclick = () => { b=!b; i2.classList.toggle('on'); update(); };
    function update() { if(a && b) o.classList.add('on'); else o.classList.remove('on'); }
  </script>
</body>
</html>`
  },
  {
    icon: '🧱',
    en: 'Sliding Block',
    fr: 'Sliding Block',
    desc_en: 'Slide pieces to free the main block.',
    desc_fr: 'Glissez les pièces pour libérer le bloc principal.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sliding Block</title>
  <style>
    body { background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .board { width: 200px; height: 200px; background: #1e293b; border: 4px solid #3b82f6; display: grid; grid-template-columns: repeat(4, 1fr); }
    .b { border: 1px solid #334155; display: flex; align-items: center; justify-content: center; cursor: pointer; color:#fff; }
    .red { background: #ef4444; }
  </style>
</head>
<body>
  <div class="board">
    <div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div>
    <div class="b red">FREE</div><div class="b"></div><div class="b"></div><div class="b"></div>
    <div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div>
    <div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div>
  </div>
  <script>
    document.querySelectorAll('.b').forEach(b => b.onclick = () => b.style.transform = 'translateX(50px)');
  </script>
</body>
</html>`
  },
  {
    icon: '🤖',
    en: 'Pattern Bot',
    fr: 'Pattern Bot',
    desc_en: 'Use simple arrows to program the bot.',
    desc_fr: 'Utilisez des flèches pour programmer le bot.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pattern Bot</title>
  <style>
    body { background: #020617; color: #fff; font-family: sans-serif; text-align: center; padding: 50px; margin: 0; overflow: hidden; }
    .grid { display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center; margin-top: 20px; }
    .c { width: 50px; height: 50px; background: #1e293b; border: 1px solid rgba(59,130,246,0.3); border-radius: 4px; }
    .bot { background: #10b981; box-shadow: 0 0 15px #10b981; }
    .target { background: #ef4444; border-color: #ef4444; opacity: 0.5; }
    #msg { position:fixed;inset:0;background:rgba(2,6,23,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h2>REACH THE RED SQUARE</h2>
  <div class="grid" id="gb"></div>
  <div style="margin-top:20px"><button class="btn" onclick="move()">MOVE FORWARD</button></div>
  <div id="msg"><h1>PATTERN MATCHED</h1><h2>The Bot reached the core.</h2><button class="btn" onclick="location.reload()">NEXT LEVEL</button></div>
  <script>
    let pos = 0, target = 24, active = true;
    function draw() {
        const g = document.getElementById('gb'); g.innerHTML = '';
        for(let i=0; i<25; i++) {
            let d = document.createElement('div');
            d.className = 'c' + (i===pos?' bot':'') + (i===target?' target':'');
            g.appendChild(d);
        }
    }
    function move() {
        if(!active) return;
        pos = (pos+1)%25; draw();
        if(pos === target) { active = false; document.getElementById('msg').style.display='flex'; }
    }
    draw();
  </script>
</body>
</html>`
  },
  {
    icon: '0️⃣',
    en: 'Binary King',
    fr: 'Le Roi Binaire',
    desc_en: 'Answer decimal to binary questions.',
    desc_fr: 'Répondez aux questions décimal vers binaire.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Binary King</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;}
    h1 { color: #3b82f6; font-size: 32px; margin-bottom: 20px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; font-family:sans-serif;}
    input { padding:15px; font-size:32px; text-align:center; background:#1e293b; border:2px solid #3b82f6; color:#fff; border-radius:12px; width: 200px; outline: none; }
  </style>
</head>
<body>
  <h1 id="q">? in BINARY?</h1>
  <input type="text" id="ans" placeholder="0000" autocomplete="off" />
  <div id="msg"><h1>MASTER!</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">NEXT CHALLENGE</button></div>
  <script>
    const n = Math.floor(Math.random() * 15) + 1;
    const target = n.toString(2);
    document.getElementById('q').textContent = n + ' in BINARY?';
    document.getElementById('ans').oninput = e => {
        if(e.target.value === target) {
            document.getElementById('msg').style.display='flex';
            document.getElementById('fs').textContent = n + ' is ' + target;
        }
    };
  </script>
</body>
</html>`
  },
  {
    icon: '🔗',
    en: 'Number Link',
    fr: 'Number Link',
    desc_en: 'Link numbers in order to win.',
    desc_fr: 'Liez les chiffres dans l\'ordre pour gagner.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Number Link</title>
  <style>
    body { background: #020617; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; font-family: sans-serif; overflow: hidden; }
    .g { display: grid; grid-template-columns: repeat(3, 80px); gap: 15px; }
    .c { width: 80px; height: 80px; background: #1e293b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 32px; cursor: pointer; border-radius: 50%; border: 3px solid #3b82f6; transition: 0.3s; }
    .active { background: #10b981; border-color: #059669; transform: scale(0.9); }
    #msg { position:fixed;inset:0;background:rgba(2,6,23,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color:#fff;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div class="g" id="nl-grid"></div>
  <div id="msg"><h1>WINNER!</h1><h2>All numbers linked in sequence.</h2><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    let next = 1, active = true;
    for(let i=1; i<10; i++) {
        let d = document.createElement('div'); d.className = 'c'; d.textContent = i;
        d.onclick = () => { 
          if(!active) return;
          if(i === next) { 
            d.classList.add('active'); next++; 
            if(next===10) { active = false; document.getElementById('msg').style.display = 'flex'; } 
          } 
        };
        document.getElementById('nl-grid').appendChild(d);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🌑',
    en: 'Gravity Ball',
    fr: 'Gravity Ball',
    desc_en: 'Navigate a gravity-shifting ball through obstacles.',
    desc_fr: 'Naviguez une balle à gravitation variable.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gravity Ball</title>
  <style>
    body { background: #0f172a; margin: 0; overflow: hidden; display:flex; flex-direction: column; align-items:center; justify-content:center; height:100vh; font-family: sans-serif; cursor: pointer; }
    canvas { background: #1e293b; border: 4px solid #3b82f6; border-radius: 12px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color:#fff;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h2 style="color:#3b82f6; margin-bottom: 10px;">CLICK TO SHIFT GRAVITY</h2>
  <canvas id="c" width="400" height="400"></canvas>
  <div id="msg"><h1>OUT OF BOUNDS</h1><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const cn = document.getElementById('c'), x = cn.getContext('2d');
    let p = { x: 200, y: 200, r: 15, vy: 0, gravity: 0.4 }, active = true;
    window.onclick = () => { if(active) p.gravity *= -1; };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,400,400); p.vy += p.gravity; p.y += p.vy;
      if(p.y < 15 || p.y > 385) { 
         active = false; document.getElementById('msg').style.display='flex';
      }
      x.fillStyle = '#3b82f6'; x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI*2); x.fill();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '⛳',
    en: 'Pixel Golf',
    fr: 'Pixel Golf',
    desc_en: 'Mini-golf challenge with physics and power.',
    desc_fr: 'Défi mini-golf avec physique et puissance.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pixel Golf</title>
  <style>
    body { background: #065f46; color: #fff; text-align: center; font-family: sans-serif; padding: 20px; margin:0; overflow: hidden; }
    canvas { background: #10b981; border: 10px solid #064e3b; border-radius: 20px; cursor: crosshair; }
    #msg { position:fixed;inset:0;background:rgba(6,95,70,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#064e3b; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>PIXEL GOLF</h1>
  <canvas id="gc" width="600" height="400"></canvas>
  <div id="msg"><h1>HOLE IN ONE!</h1><button class="btn" onclick="location.reload()">NEXT HOLE</button></div>
  <script>
    const c = document.getElementById('gc'), x = c.getContext('2d');
    let b = { x: 100, y: 200, vx: 0, vy: 0, r: 8 }, hole = { x: 500, y: 200, r: 15 }, active = true;
    c.onmousedown = e => {
      if(!active || Math.hypot(b.vx, b.vy) > 0.1) return;
      let r = c.getBoundingClientRect();
      b.vx = (b.x - (e.clientX-r.left))/8; b.vy = (b.y - (e.clientY-r.top))/8;
    };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,600,400);
      x.fillStyle='#064e3b'; x.beginPath(); x.arc(hole.x, hole.y, hole.r, 0, Math.PI*2); x.fill();
      b.x += b.vx; b.y += b.vy; b.vx *= 0.98; b.vy *= 0.98;
      if(b.x < b.r || b.x > 600-b.r) b.vx *= -1; if(b.y < b.r || b.y > 400-b.r) b.vy *= -1;
      x.fillStyle='#fff'; x.beginPath(); x.arc(b.x, b.y, b.r, 0, Math.PI*2); x.fill();
      if(Math.hypot(b.x-hole.x, b.y-hole.y) < hole.r) { 
        active = false; document.getElementById('msg').style.display = 'flex';
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🎳',
    en: 'Neon Lanes',
    fr: 'Neon Lanes',
    desc_en: 'Bowling physics simulator with neon style.',
    desc_fr: 'Simulateur de bowling style néon.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neon Lanes</title>
  <style>
    body { background: #0f172a; display: flex; flex-direction:column; align-items: center; justify-content: center; height: 100vh; margin:0; font-family: sans-serif; color: #fff; cursor: pointer; }
    canvas { background: #1e293b; border-radius: 12px; border: 4px solid #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>NEON LANES</h1>
  <canvas id="lc" width="300" height="500"></canvas>
  <div id="msg"><h1>STRIKE!</h1><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    const c = document.getElementById('lc'), x = c.getContext('2d');
    let b = { x: 150, y: 450, vy: 0, r: 15 }, pins = [], active = true;
    for(let i=0; i<6; i++) pins.push({ x: 75 + i*30, y: 100, active: true });
    window.onclick = () => { if(active) b.vy = -12; };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,300,500); b.y += b.vy;
      let allDown = true;
      pins.forEach(p => {
        if(p.active) {
            allDown = false;
            x.fillStyle = '#ef4444'; x.fillRect(p.x, p.y, 15, 25);
            if(Math.hypot(b.x-p.x-7.5, b.y-p.y-12.5) < 25) p.active = false;
        }
      });
      if(allDown || b.y < 0) { 
        active = false; document.getElementById('msg').style.display = 'flex';
      }
      x.fillStyle = '#3b82f6'; x.beginPath(); x.arc(b.x, b.y, b.r, 0, Math.PI*2); x.fill();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '⚽',
    en: 'Soccer Kick',
    fr: 'Soccer Kick',
    desc_en: 'Timing-based penalty shootout game.',
    desc_fr: 'Jeu de tirs au but basé sur le timing.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Soccer Kick</title>
  <style>
    body { background: #10b981; color: #fff; font-family: sans-serif; text-align: center; padding: 50px; margin:0; overflow: hidden; }
    .goal { width: 300px; height: 150px; border: 8px solid #fff; margin: 0 auto; position: relative; background: rgba(0,0,0,0.1); }
    .ball { font-size: 50px; cursor: pointer; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: inline-block; margin-top: 50px; }
    #msg { position:fixed;inset:0;background:rgba(16,185,129,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#fff; color:#10b981; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
    #gk { width: 60px; height: 60px; background: #ef4444; position: absolute; top: 40px; left: 120px; border-radius: 8px; transition: 0.1s; }
  </style>
</head>
<body>
  <div class="goal"><div id="gk"></div></div>
  <div class="ball" id="sb" onclick="kick()">⚽</div>
  <div id="msg"><h1 id="txt">GOOOAL!</h1><button class="btn" onclick="location.reload()">NEXT MATCH</button></div>
  <script>
    let active = true, gkx = 120, gkv = 4;
    function moveGK() {
        if(!active) return;
        gkx += gkv; if(gkx < 0 || gkx > 240) gkv *= -1;
        document.getElementById('gk').style.left = gkx + 'px';
        requestAnimationFrame(moveGK);
    }
    moveGK();
    function kick() {
        if(!active) return;
        active = false;
        let b = document.getElementById('sb'); b.style.transform = 'translateY(-220px) scale(0.4)';
        setTimeout(() => {
            let win = Math.abs(gkx + 30 - 150) > 40; // Simple goalie check
            document.getElementById('msg').style.display='flex';
            document.getElementById('txt').textContent = win ? 'GOOOAL!' : 'SAVED!';
        }, 500);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '⛵',
    en: 'Wind Sailor',
    fr: 'Wind Sailor',
    desc_en: 'Navigate the boat using wind direction.',
    desc_fr: 'Naviguez avec le bateau selon le vent.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Wind Sailor</title>
  <style>
    body { background: #0ea5e9; margin: 0; overflow: hidden; font-family: sans-serif; cursor: crosshair; }
    canvas { display: block; }
    #msg { position:fixed;inset:0;background:rgba(14,165,233,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color: #fff;}
    .btn { background:#fff; color:#0ea5e9; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <canvas id="sc"></canvas>
  <div id="msg"><h1>DESTINATION REACHED</h1><button class="btn" onclick="location.reload()">NEXT VOYAGE</button></div>
  <script>
    const c = document.getElementById('sc'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let p = { x: 100, y: 100, a: 0 }, island = { x: c.width-150, y: c.height-150, r: 60 }, active = true;
    window.onmousemove = e => { if(active) p.a = Math.atan2(e.clientY - p.y, e.clientX - p.x); };
    function loop() {
      if(!active) return;
      x.fillStyle = '#0ea5e9'; x.fillRect(0,0,c.width,c.height);
      // Island
      x.fillStyle = '#fef08a'; x.beginPath(); x.arc(island.x, island.y, island.r, 0, Math.PI*2); x.fill();
      // Boat movement
      p.x += Math.cos(p.a) * 3; p.y += Math.sin(p.a) * 3;
      x.save(); x.translate(p.x, p.y); x.rotate(p.a);
      x.fillStyle = '#fff'; x.fillRect(-20, -10, 40, 20); x.fillStyle = '#334155'; x.fillRect(0, -2, 15, 4); x.restore();
      if(Math.hypot(p.x - island.x, p.y - island.y) < island.r) {
        active = false; document.getElementById('msg').style.display = 'flex';
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🏀',
    en: 'Basket Hoop',
    fr: 'Basket Hoop',
    desc_en: 'Score as many hoops as you can.',
    desc_fr: 'Marquez autant de paniers que possible.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basket Hoop</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; flex-direction:column; align-items: center; justify-content: center; height: 100vh; margin:0; font-family: sans-serif; overflow: hidden; }
    canvas { background: #1e293b; border-bottom: 5px solid #fff; cursor: pointer; border-radius: 8px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div style="font-size: 24px; margin-bottom: 10px; font-weight: 800; color: #3b82f6;">SCORE: <span id="s">0</span></div>
  <canvas id="bc" width="400" height="400"></canvas>
  <div id="msg"><h1>SWISH!</h1><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    const c = document.getElementById('bc'), x = c.getContext('2d');
    let b = { x: 50, y: 350, vx: 0, vy: 0, r: 15 }, score = 0, active = true, shot = false;
    c.onmousedown = () => { if(active && !shot) { b.vx = 7.5; b.vy = -16; shot = true; } };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,400,400); 
      if(shot) { b.vy += 0.5; b.x += b.vx; b.y += b.vy; }
      // Backboard & Rim
      x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(340, 100, 10, 80);
      x.strokeStyle = '#ef4444'; x.strokeRect(300, 150, 45, 5); 
      // Ball
      x.fillStyle = '#f59e0b'; x.beginPath(); x.arc(b.x, b.y, b.r, 0, Math.PI*2); x.fill();
      // Win check
      if(b.x > 300 && b.x < 345 && Math.abs(b.y-150) < 15 && b.vy > 0) { 
        score++; document.getElementById('s').textContent = score;
        active = false; document.getElementById('msg').style.display='flex';
      }
      // Out of bounds
      if(b.x > 400 || b.y > 400) { b.x = 50; b.y = 350; b.vx = 0; b.vy = 0; shot = false; }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🎱',
    en: 'Pool Pro Lite',
    fr: 'Pool Pro Lite',
    desc_en: 'Simple 2D billiards physics.',
    desc_fr: 'Physique billard 2D simple.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pool Pro</title>
  <style>
    body { background: #064e3b; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
    canvas { background: #065f46; border: 12px solid #78350f; border-radius: 12px; cursor: crosshair; }
    #msg { position:fixed;inset:0;background:rgba(6,78,59,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color: #fff;}
    .btn { background:#fff; color:#064e3b; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <canvas id="pc" width="600" height="350"></canvas>
  <div id="msg"><h1>TABLE CLEARED</h1><button class="btn" onclick="location.reload()">NEXT RACK</button></div>
  <script>
    const c = document.getElementById('pc'), x = c.getContext('2d');
    let balls = [{x: 150, y: 175, vx: 0, vy: 0, c: '#fff'}, {x: 450, y: 175, vx: 0, vy: 0, c: '#ef4444'}], active = true, dragging = false;
    c.onmousedown = e => { if(active) dragging = true; };
    c.onmouseup = e => {
      if(!active || !dragging) return; dragging = false;
      let r = c.getBoundingClientRect();
      balls[0].vx = (balls[0].x - (e.clientX-r.left))/10; balls[0].vy = (balls[0].y - (e.clientY-r.top))/10;
    };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,600,350);
      balls.forEach((b, i) => {
        b.x += b.vx; b.y += b.vy; b.vx *= 0.985; b.vy *= 0.985;
        if(b.x < 15 || b.x > 585) b.vx *= -1; if(b.y < 15 || b.y > 335) b.vy *= -1;
        x.fillStyle = b.c; x.beginPath(); x.arc(b.x, b.y, 15, 0, Math.PI*2); x.fill();
        balls.forEach((b2, j) => {
            if(i !== j && Math.hypot(b.x-b2.x, b.y-b2.y) < 30) { 
              let dx = b2.x-b.x, dy = b2.y-b.y, a = Math.atan2(dy, dx), s = Math.hypot(b.vx, b.vy);
              b2.vx = Math.cos(a)*s; b2.vy = Math.sin(a)*s; b.vx *= -0.5; b.vy *= -0.5;
              if(j === 1 && Math.hypot(b2.vx, b2.vy) > 0.5) setTimeout(() => { active=false; document.getElementById('msg').style.display='flex'; }, 500);
            }
        });
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '❄️',
    en: 'Air Hockey',
    fr: 'Air Hockey',
    desc_en: 'Fast-paced paddle action vs AI.',
    desc_fr: 'Action rapide de palets contre l\'IA.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Air Hockey</title>
  <style>
    body { background: #0f172a; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; font-family: sans-serif; }
    canvas { background: #1e293b; border: 5px solid #3b82f6; border-radius: 10px; cursor: none; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <canvas id="hc" width="400" height="600"></canvas>
  <div id="msg"><h1 id="txt">GOAL!</h1><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    const c = document.getElementById('hc'), x = c.getContext('2d');
    let p = { x: 200, y: 530, r: 35 }, puck = { x: 200, y: 300, vx: 4, vy: 4, r: 18 }, active = true;
    c.onmousemove = e => { 
      if(!active) return;
      let r = c.getBoundingClientRect(); 
      p.x = e.clientX - r.left; p.y = Math.max(300, e.clientY - r.top); 
    };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,400,600);
      // Divider
      x.strokeStyle = 'rgba(59,130,246,0.3)'; x.beginPath(); x.moveTo(0,300); x.lineTo(400,300); x.stroke();
      puck.x += puck.x + puck.vx > 400 - puck.r || puck.x + puck.vx < puck.r ? (puck.vx *= -1, puck.vx) : puck.vx;
      puck.y += puck.y + puck.vy > 600 - puck.r || puck.y + puck.vy < puck.r ? (puck.vy *= -1, puck.vy) : puck.vy;
      if(Math.hypot(p.x-puck.x, p.y-puck.y) < p.r + puck.r) { 
        let a = Math.atan2(puck.y-p.y, puck.x-p.x);
        puck.vx = Math.cos(a) * 8; puck.vy = Math.sin(a) * 8;
      }
      if(puck.y < 20 && Math.abs(puck.x-200) < 60) { active=false; document.getElementById('msg').style.display='flex'; }
      x.fillStyle = '#3b82f6'; x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI*2); x.fill();
      x.fillStyle = '#fff'; x.beginPath(); x.arc(puck.x, puck.y, puck.r, 0, Math.PI*2); x.fill();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🧗',
    en: 'Mountain Climber',
    fr: 'Escaladeur Pro',
    desc_en: 'Grapple your way up the mountain.',
    desc_fr: 'Accrochez-vous pour grimper la montagne.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mountain Climber</title>
  <style>
    body { background: #0c0a09; color: #fff; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; font-family: sans-serif; cursor: pointer; }
    canvas { background: #1c1917; border: 4px solid #8b5cf6; border-radius: 12px; }
    #msg { position:fixed;inset:0;background:rgba(12,10,9,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#8b5cf6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div style="font-size:20px; margin-bottom:10px; font-weight:800; color:#8b5cf6;">ALTITUDE: <span id="alt">0</span>m</div>
  <canvas id="mc" width="400" height="400"></canvas>
  <div id="msg"><h1>SUMMIT REACHED!</h1><button class="btn" onclick="location.reload()">NEXT PEAK</button></div>
  <script>
    const c = document.getElementById('mc'), x = c.getContext('2d');
    let p = { x: 200, y: 350, r: 12 }, targetAlt = 0, active = true;
    window.onmousedown = () => { if(active) { targetAlt += 40; } };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,400,400); 
      let alt = Math.floor(targetAlt/10); document.getElementById('alt').textContent = alt;
      // Stars background
      x.fillStyle = '#fff'; for(let i=0; i<30; i++) x.fillRect((i*1532)%400, (i*749)%400, 1, 1);
      // Climber
      p.y = 350 - (targetAlt % 350);
      x.fillStyle = '#8b5cf6'; x.shadowBlur = 10; x.shadowColor = '#8b5cf6'; x.fillRect(p.x-p.r, p.y-p.r, p.r*2, p.r*2); x.shadowBlur = 0;
      if(alt > 500) { active = false; document.getElementById('msg').style.display='flex'; }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🎾',
    en: 'Neon Tennis',
    fr: 'Tennis Néon',
    desc_en: 'Top-down arcade tennis vs AI.',
    desc_fr: 'Tennis d\'arcade contre l\'IA.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neon Tennis</title>
  <style>
    body { background: #065f46; display: flex; align-items: center; justify-content: center; height: 100vh; margin:0; overflow: hidden; font-family: sans-serif; }
    canvas { background: #10b981; border: 5px solid #fff; border-radius: 10px; cursor: none; }
    #msg { position:fixed;inset:0;background:rgba(6,95,70,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color: #fff;}
    .btn { background:#fff; color:#065f46; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <canvas id="tc" width="400" height="300"></canvas>
  <div id="msg"><h1>GAME OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    const c = document.getElementById('tc'), x = c.getContext('2d');
    let px = 150, bx = 200, by = 150, bvx = 3, bvy = 3, active = true, score = 0;
    c.onmousemove = e => { 
      if(!active) return;
      let r = c.getBoundingClientRect();
      px = e.clientX - r.left - 50; 
    };
    function loop() {
      if(!active) return;
      x.clearRect(0,0,400,300);
      bx += bvx; by += bvy;
      if(bx < 10 || bx > 390) bvx *= -1;
      if(by < 10) bvy *= -1;
      if(by > 270 && bx > px && bx < px+100) { bvy *= -1.05; bvx += (Math.random()-0.5)*2; score++; }
      if(by > 310) { 
        active = false; document.getElementById('msg').style.display='flex';
        document.getElementById('fs').textContent = 'Score: ' + score;
      }
      x.fillStyle = '#fff'; x.fillRect(px, 280, 100, 10);
      x.beginPath(); x.arc(bx, by, 8, 0, Math.PI*2); x.fill();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🏰',
    en: 'Dungeon Crawler Lite',
    fr: 'Mini Donjon',
    desc_en: 'Procedural room exploration RPG.',
    desc_fr: 'RPG d\'exploration de salles procédurales.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dungeon Crawler</title>
  <style>
    body { background: #020617; color: #fff; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .log { width: 300px; height: 100px; background: #000; padding: 10px; border: 1px solid #3b82f6; overflow: auto; margin-bottom: 20px; }
    .btn { background: #3b82f6; border: none; color: #fff; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="log" id="l">Entering the dungeon...</div>
  <button class="btn" onclick="act()">GO DEEPER</button>
  <script>
    let depth = 0;
    function act() {
        depth++; let r = Math.random();
        const l = document.getElementById('l');
        if(r > 0.8) l.innerHTML += '<br>Found a chest! +10 Gold';
        else if(r > 0.5) l.innerHTML += '<br>Fought a slime. -5 HP';
        else l.innerHTML += '<br>The corridor is quiet.';
        l.scrollTop = l.scrollHeight;
    }
  </script>
</body>
</html>`
  },
  {
    icon: '⚔️',
    en: 'Clicker Hero',
    fr: 'Clicker Héros',
    desc_en: 'Defeat monsters by clicking rapidly.',
    desc_fr: 'Battez des monstres en cliquant vite.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Clicker Hero</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; text-align: center; padding: 50px; margin:0; }
    .mob { font-size: 100px; cursor: pointer; user-select: none; transition: 0.1s; }
    .mob:active { transform: scale(0.9); }
    .hp { font-size: 24px; color: #ef4444; font-weight: 900; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#ef4444; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="mob" class="mob">👹</div>
  <div class="hp" id="hp">HP: 100</div>
  <div id="msg"><h1>SLAIN!</h1><h2>The village is safe.</h2><button class="btn" onclick="location.reload()">NEXT QUEST</button></div>
  <script>
    let hp = 100, active = true;
    document.getElementById('mob').onclick = () => {
        if(!active) return;
        hp -= 10; document.getElementById('hp').textContent = 'HP: ' + hp;
        if(hp <= 0) { 
          active = false; document.getElementById('msg').style.display='flex';
        }
    };
  </script>
</body>
</html>`
  },
  {
    icon: '🌿',
    en: 'Zen Garden',
    fr: 'Jardin Zen',
    desc_en: 'Grow and maintain your virtual digital garden.',
    desc_fr: 'Cultivez votre jardin numérique zen.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #134e4a; color: #fff; font-family: sans-serif; text-align: center; padding: 100px; margin:0; }
    #msg { position:fixed;inset:0;background:rgba(19,78,74,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#fff; color:#134e4a; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div id="g" style="font-size: 80px;">🌱</div>
  <button onclick="water()" style="margin-top: 20px; padding: 10px 20px; background:#fff; color:#134e4a; border:none; border-radius:8px; cursor:pointer; font-weight:700;">WATER PLANT</button>
  <div id="msg"><h1>BLOOMED!</h1><h2>Nature is wonderful.</h2><button class="btn" onclick="location.reload()">RESTART GARDEN</button></div>
  <script>
    let state = 0;
    function water() {
        state++; const g = document.getElementById('g');
        if(state===1) g.textContent = '🌿';
        if(state===2) g.textContent = '🌳';
        if(state===3) { g.textContent = '🌸'; document.getElementById('msg').style.display='flex'; }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🏙️',
    en: 'City Builder Mini',
    fr: 'Mini City Builder',
    desc_en: 'Strategically place buildings to grow.',
    desc_fr: 'Placez des bâtiments stratégiquement.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; display: grid; grid-template-columns: repeat(5, 60px); gap: 5px; padding: 50px; justify-content: center; }
    .c { width: 60px; height: 60px; background: #1e293b; border: 1px solid #3b82f6; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 30px; }
  </style>
</head>
<body>
  <script>
    for(let i=0; i<25; i++) {
        let d = document.createElement('div'); d.className = 'c';
        d.onclick = () => d.textContent = ['🏠','🏢','🏥','🌳'][Math.floor(Math.random()*4)];
        document.body.appendChild(d);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🚜',
    en: 'Farm Sim',
    fr: 'Ferme Sim',
    desc_en: 'Plant, wait, and harvest your crops.',
    desc_fr: 'Plantez, attendez et récoltez.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>body { background: #78350f; color: #fff; text-align: center; padding: 50px; }</style>
</head>
<body>
  <div id="f" style="font-size: 80px; cursor: pointer;">🟫</div>
  <p id="t">CLICK TO PLANT</p>
  <script>
    let state = 0; const f = document.getElementById('f'), t = document.getElementById('t');
    f.onclick = () => {
        if(state===0) { state=1; f.textContent='🌱'; t.textContent='GROWING...'; setTimeout(()=>{ state=2; f.textContent='🌽'; t.textContent='READY!'; }, 3000); }
        else if(state===2) { state=0; f.textContent='🟫'; t.textContent='HARVESTED! CLICK TO PLANT AGAIN'; }
    };
  </script>
</body>
</html>`
  },
  {
    icon: '🐶',
    en: 'Pet Architect Pro',
    fr: 'Pet Architect Pro',
    desc_en: 'An advanced pet simulator with needs.',
    desc_fr: 'Simulateur d\'animal de compagnie avancé.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pet Architect Pro</title>
  <style>
    body { background: #0f172a; color: #fff; text-align: center; padding: 20px; font-family: sans-serif; overflow: hidden; }
    .bar { width: 200px; height: 12px; background: #1e293b; margin: 8px auto; border-radius: 10px; overflow: hidden; border: 1px solid #3b82f6; }
    .lvl { height: 100%; background: linear-gradient(to right, #ef4444, #10b981); transition: 0.3s; }
    .btn { background: #3b82f6; border: none; color: #fff; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 800; margin: 5px; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
  </style>
</head>
<body>
  <div style="font-size: 80px; margin-top: 20px;" id="p">🐶</div>
  <div style="margin-top: 20px;">
    <div>HUNGER</div><div class="bar"><div id="h" class="lvl" style="width: 100%;"></div></div>
    <div>ENERGY</div><div class="bar"><div id="e" class="lvl" style="width: 100%; background: #f59e0b;"></div></div>
  </div>
  <div style="margin-top: 20px;">
    <button class="btn" onclick="feed()">FEED 🍖</button>
    <button class="btn" onclick="play()">PLAY ⚾</button>
    <button class="btn" onclick="sleep()">SLEEP 💤</button>
  </div>
  <div id="msg"><h1>PET IS TIRED</h1><button class="btn" onclick="location.reload()">RESTART</button></div>
  <script>
    let hunger = 100, energy = 100, active = true;
    setInterval(() => {
      if(!active) return;
      hunger = Math.max(0, hunger - 0.5);
      energy = Math.max(0, energy - 0.3);
      document.getElementById('h').style.width = hunger + '%';
      document.getElementById('e').style.width = energy + '%';
      if(hunger <= 0 || energy <= 0) { active = false; document.getElementById('msg').style.display='flex'; }
    }, 500);
    function feed() { if(active) hunger = Math.min(100, hunger + 20); }
    function play() { if(active && energy > 20) { energy -= 20; hunger -= 5; document.getElementById('p').textContent = '🎾'; setTimeout(()=>document.getElementById('p').textContent='🐶', 1000); } }
    function sleep() { if(active) { energy = 100; document.getElementById('p').textContent = '😴'; setTimeout(()=>document.getElementById('p').textContent='🐶', 2000); } }
  </script>
</body>
</html>`
  },
  {
    icon: '🛒',
    en: 'Shop Keeper',
    fr: 'Marchand Pro',
    desc_en: 'Manage stock and sell to customers.',
    desc_fr: 'Gérez le stock et vendez aux clients.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; color: #fff; text-align: center; padding: 50px; margin:0; font-family: sans-serif;}
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>CASH: $<span id="c">0</span></h1>
  <div style="font-size: 50px;">🍎 (Stock: <span id="s">10</span>)</div>
  <button onclick="sell()" style="padding:10px 20px; background:#3b82f6; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:700;">SELL APPLE</button>
  <div id="msg"><h1>STOCK DEPLETED</h1><h2 id="fs">Wait for restocking...</h2><button class="btn" onclick="location.reload()">RESTOCK</button></div>
  <script>
    let cash = 0, stock = 10;
    function sell() {
        if(stock > 0) { stock--; cash += 5; document.getElementById('c').textContent = cash; document.getElementById('s').textContent = stock; }
        else document.getElementById('msg').style.display='flex';
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🌍',
    en: 'Space Explorer',
    fr: 'Space Explorer',
    desc_en: 'Explore various planets in the galaxy.',
    desc_fr: 'Explorez diverses planètes dans la galaxie.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Space Explorer</title>
  <style>
    body { background: #000; color: #fff; margin: 0; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    #msg { position:fixed;inset:0;background:rgba(0,0,0,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
    #ship { position: absolute; font-size: 40px; transition: 0.1s; }
    .star { position: absolute; background: #fff; border-radius: 50%; opacity: 0.5; }
    #planet { position: absolute; font-size: 120px; transition: 0.5s; top: 100px; right: 100px; }
  </style>
</head>
<body>
  <h2>REACH THE PLANET</h2>
  <div id="planet">🪐</div>
  <div id="ship" style="left: 50px; top: 300px;">🚀</div>
  <div id="msg"><h1>PLANET REACHED</h1><h2>Mission accomplished.</h2><button class="btn" onclick="location.reload()">NEXT SYSTEM</button></div>
  <script>
    let sx = 50, sy = 300, active = true;
    for(let i=0; i<50; i++) {
        let s = document.createElement('div'); s.className = 'star';
        s.style.width = '2px'; s.style.height = '2px';
        s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
        document.body.appendChild(s);
    }
    window.addEventListener('keydown', e => {
        if(!active) return;
        if(e.key === 'ArrowUp') sy -= 15;
        if(e.key === 'ArrowDown') sy += 15;
        if(e.key === 'ArrowLeft') sx -= 15;
        if(e.key === 'ArrowRight') sx += 15;
        let s = document.getElementById('ship');
        s.style.left = sx + 'px'; s.style.top = sy + 'px';
        if(sx > window.innerWidth-200 && sy < 200) { active=false; document.getElementById('msg').style.display='flex'; }
    });
  </script>
</body>
</html>`
  },
  {
    icon: '🐜',
    en: 'Bug Colony',
    fr: 'Colonie d\'Insectes',
    desc_en: 'Watch bugs roam and gather food.',
    desc_fr: 'Observez les insectes récolter de la nourriture.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>body { background: #1e293b; margin: 0; overflow: hidden; }</style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    let bugs = Array.from({length: 20}, () => ({x: Math.random()*c.width, y: Math.random()*c.height}));
    function loop() {
        x.fillStyle='rgba(30,41,59,0.1)'; x.fillRect(0,0,c.width,c.height);
        bugs.forEach(b => {
            b.x += Math.random()*10-5; b.y += Math.random()*10-5;
            x.fillStyle='#10b981'; x.fillRect(b.x, b.y, 4, 4);
        });
        requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '💰',
    en: 'Aura Tycoon',
    fr: 'Aura Tycoon',
    desc_en: 'Build and upgrade resource extractors.',
    desc_fr: 'Construisez et améliorez des extracteurs.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aura Tycoon</title>
  <style>
    body { background: #0f172a; color: #fff; text-align: center; padding: 20px; font-family: sans-serif; overflow: hidden; }
    .res { font-size: 48px; font-weight: 900; color: #10b981; text-shadow: 0 0 20px rgba(16,185,129,0.3); }
    .btn { background: #3b82f6; border: none; color: #fff; padding: 15px 30px; border-radius: 12px; cursor: pointer; font-weight: 800; font-size: 18px; transition: 0.2s; }
    .btn:hover { background: #2563eb; transform: translateY(-2px); }
    .btn:disabled { background: #334155; cursor: not-allowed; transform: none; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
  </style>
</head>
<body>
  <div class="res" id="r">0</div>
  <div style="color: #64748b; font-size: 14px; margin-bottom: 30px;">TOTAL RESOURCES</div>
  <button class="btn" id="b" onclick="buy()">BUY EXTRACTOR (Cost: 10)</button>
  <div id="st" style="margin-top: 20px; color: #3b82f6;">Production: 0/sec</div>
  <div id="msg"><h1>TYCOON STATUS</h1><h2>You reached 1000 resources!</h2><button class="btn" onclick="location.reload()">KEEP BUILDING</button></div>
  <script>
    let res = 0, rate = 0, cost = 10, active = true;
    function buy() { 
      if(res >= cost) { 
        res -= cost; rate++; cost = Math.floor(cost * 1.5);
        document.getElementById('b').textContent = 'BUY EXTRACTOR (Cost: ' + cost + ')';
        document.getElementById('st').textContent = 'Production: ' + rate + '/sec';
      } 
    }
    setInterval(() => { 
      if(!active) return;
      res += rate; document.getElementById('r').textContent = res;
      document.getElementById('b').disabled = (res < cost);
      if(res >= 1000) { active = false; document.getElementById('msg').style.display='flex'; }
    }, 1000);
  </script>
</body>
</html>`
  },
  {
    icon: '🎹',
    en: 'Synth Key',
    fr: 'Synth Touche',
    desc_en: 'A virtual synthesizer keyboard with oscillator sound.',
    desc_fr: 'Clavier synthétiseur virtuel avec oscillateur.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .k { width: 40px; height: 150px; background: #fff; border: 1px solid #000; cursor: pointer; }
    .k:active { background: #3b82f6; }
  </style>
</head>
<body>
  <div style="display:flex;">
    <div class="k" onmousedown="play(261)"></div>
    <div class="k" onmousedown="play(293)"></div>
    <div class="k" onmousedown="play(329)"></div>
    <div class="k" onmousedown="play(349)"></div>
    <div class="k" onmousedown="play(392)"></div>
  </div>
  <script>
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    function play(f) {
        const o = ctx.createOscillator(); o.type = 'square';
        o.frequency.setValueAtTime(f, ctx.currentTime);
        o.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.1);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎵',
    en: 'Beat Dropper',
    fr: 'Beat Dropper',
    desc_en: 'Catch notes as they fall to the beat.',
    desc_fr: 'Attrapez les notes qui tombent en rythme.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Beat Dropper</title>
  <style>
    body { background: #0c0a09; margin: 0; overflow: hidden; font-family: sans-serif; cursor: crosshair; }
    canvas { display: block; border-left: 2px solid #3b82f6; border-right: 2px solid #3b82f6; }
    #msg { position:fixed;inset:0;background:rgba(12,10,9,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99; color: #fff;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <div style="position:fixed; top:20px; left:20px; color:#3b82f6; font-size:24px; font-weight:900;">SCORE: <span id="sc">0</span></div>
  <canvas id="bdc"></canvas>
  <div id="msg"><h1>CONCERT OVER</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">RETRY</button></div>
  <script>
    const c = document.getElementById('bdc'), x = c.getContext('2d');
    let cw = c.width = 400; let ch = c.height = window.innerHeight;
    let notes = [], score = 0, missed = 0, active = true;
    
    window.onclick = e => {
      if(!active) return;
      let r = c.getBoundingClientRect();
      let mx = e.clientX - r.left; let my = e.clientY - r.top;
      notes = notes.filter(n => {
        if(Math.hypot(n.x - mx, n.y - my) < 30) { score += 10; document.getElementById('sc').textContent = score; return false; }
        return true;
      });
    };

    setInterval(() => { if(active) notes.push({x: Math.random()*cw, y: -20}); }, 600);
    function loop() {
      if(!active) return;
      x.fillStyle='rgba(12,10,9,0.3)'; x.fillRect(0,0,cw,ch);
      notes.forEach((n, i) => { 
        n.y += 6; 
        x.fillStyle='#3b82f6'; x.beginPath(); x.arc(n.x, n.y, 15, 0, Math.PI*2); x.fill();
        if(n.y > ch) { missed++; notes.splice(i, 1); }
      });
      if(missed >= 5) { active = false; document.getElementById('msg').style.display='flex'; document.getElementById('fs').textContent = 'Score: ' + score; }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '💡',
    en: 'Color Flash',
    fr: 'Color Flash',
    desc_en: 'A Simon-style memory reflex challenge.',
    desc_fr: 'Défi de mémoire simon et réflexes.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 50px; height: 100vh; box-sizing: border-box; }
    .b { border-radius: 10px; cursor: pointer; transition: 0.2s; opacity: 0.3; }
    .on { opacity: 1; transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="b" id="0" style="background:red;"></div>
  <div class="b" id="1" style="background:blue;"></div>
  <div class="b" id="2" style="background:green;"></div>
  <div class="b" id="3" style="background:yellow;"></div>
  <script>
    function flash(i) {
        const e = document.getElementById(i); e.classList.add('on');
        setTimeout(() => e.classList.remove('on'), 300);
    }
    setInterval(() => flash(Math.floor(Math.random()*4)), 1000);
  </script>
</body>
</html>`
  },
  {
    icon: '🥁',
    en: 'Aura Percussion',
    fr: 'Aura Percussion',
    desc_en: 'Virtual drum pads with synthesized hits.',
    desc_fr: 'Pads de batterie virtuels synthétisés.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; display: flex; gap: 20px; align-items: center; justify-content: center; height: 100vh; }
    .pad { width: 100px; height: 100px; background: #334155; border-radius: 50%; cursor: pointer; border: 4px solid #3b82f6; }
    .pad:active { transform: scale(0.9); background: #3b82f6; }
  </style>
</head>
<body>
  <div class="pad" onmousedown="hit(100)"></div>
  <div class="pad" onmousedown="hit(200)"></div>
  <script>
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    function hit(f) {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.frequency.setValueAtTime(f, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        g.gain.setValueAtTime(1, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.1);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🕒',
    en: 'Reflex Master',
    fr: 'Reflex Master',
    desc_en: 'Test your reaction time in milliseconds.',
    desc_fr: 'Testez votre temps de réaction en ms.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; color: #fff; text-align: center; padding: 100px; font-family: sans-serif; cursor: pointer; margin:0; }
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body id="b" onclick="tap()">
  <h1>WAIT FOR GREEN...</h1>
  <div id="msg"><h1 id="txt">RESULT</h1><h2 id="fs"></h2><button class="btn" onclick="location.reload()">TRY AGAIN</button></div>
  <script>
    let start = 0, state = 'wait';
    setTimeout(() => { document.body.style.background = '#10b981'; start = Date.now(); state = 'go'; }, Math.random()*3000 + 1000);
    function tap() {
        document.getElementById('msg').style.display='flex';
        if(state === 'go') { 
          document.getElementById('txt').textContent = 'YOUR TIME';
          document.getElementById('fs').textContent = (Date.now()-start) + 'ms'; 
        }
        else { 
          document.getElementById('txt').textContent = 'FAILED';
          document.getElementById('fs').textContent = 'TOO EARLY!';
        }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🥁',
    en: 'Tempo Tapper',
    fr: 'Tempo Tapper',
    desc_en: 'Tap along to find the BPM of your beat.',
    desc_fr: 'Tapez pour trouver le BPM de votre rythme.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>body { background: #020617; color: #fff; text-align: center; padding: 100px; font-family: monospace; }</style>
</head>
<body onclick="tap()">
  <h1>TAP ANYHERE</h1>
  <h2 id="bpm">BPM: --</h2>
  <script>
    let taps = [];
    function tap() {
        const now = Date.now(); taps.push(now);
        if(taps.length > 5) taps.shift();
        if(taps.length > 1) {
            let diff = (taps[taps.length-1] - taps[0]) / (taps.length-1);
            document.getElementById('bpm').textContent = 'BPM: ' + Math.round(60000/diff);
        }
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎹',
    en: 'Tone Match',
    fr: 'Tone Match',
    desc_en: 'Identify the musical tone challenge.',
    desc_fr: 'Identifiez le défi de ton musical.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #0f172a; color: #fff; text-align: center; padding: 100px; margin:0; font-family: sans-serif;}
    #msg { position:fixed;inset:0;background:rgba(15,23,42,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#3b82f6; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <button onclick="play()" style="padding:15px 40px; background:#fff; color:#0f172a; border:none; border-radius:12px; cursor:pointer; font-weight:800; font-size:18px;">PLAY TONE</button>
  <div style="margin-top: 20px; display:flex; gap:10px; justify-content:center;">
    <button onclick="guess(261)" style="padding:10px 30px; background:#3b82f6; color:#fff; border:none; border-radius:8px; cursor:pointer;">LOW</button>
    <button onclick="guess(522)" style="padding:10px 30px; background:#3b82f6; color:#fff; border:none; border-radius:8px; cursor:pointer;">HIGH</button>
  </div>
  <div id="msg"><h1 id="txt">RESULT</h1><button class="btn" onclick="location.reload()">NEXT</button></div>
  <script>
    let target = Math.random() > 0.5 ? 261 : 522;
    const ctx = new AudioContext();
    function play() {
        const o = ctx.createOscillator(); o.frequency.value = target;
        o.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.5);
    }
    function guess(f) { 
        document.getElementById('msg').style.display='flex';
        document.getElementById('txt').textContent = (f === target) ? 'CORRECT!' : 'WRONG!';
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🎼',
    en: 'Chord Builder',
    fr: 'Chord Builder',
    desc_en: 'Logic-based musical chord builder.',
    desc_fr: 'Constructeur d\'accords musicaux logiques.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; color: #fff; text-align: center; padding: 50px; margin:0; font-family: sans-serif;}
    #msg { position:fixed;inset:0;background:rgba(2,6,15,0.9);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:99;}
    .btn { background:#1e293b; color:#fff; border:1px solid #3b82f6; padding:12px 30px; border-radius:10px; font-weight:800; cursor:pointer; margin-top:20px; }
  </style>
</head>
<body>
  <h1>BUILD C MAJOR</h1>
  <div style="display:flex; gap:10px; justify-content:center;">
    <button onclick="add('C')" class="btn">C</button>
    <button onclick="add('E')" class="btn">E</button>
    <button onclick="add('G')" class="btn">G</button>
  </div>
  <p id="curr" style="font-size:32px; letter-spacing:5px; margin-top:20px;"></p>
  <div id="msg"><h1>COMPLETE!</h1><h2>Perfect Harmony.</h2><button class="btn" onclick="location.reload()">REPLAY</button></div>
  <script>
    let chord = '';
    function add(n) { 
      chord += n; document.getElementById('curr').textContent = chord; 
      if(chord === 'CEG') document.getElementById('msg').style.display='flex'; 
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🌈',
    en: 'Echo Wave',
    fr: 'Echo Wave',
    desc_en: 'A visual-reflex audio visualizer game.',
    desc_fr: 'Jeu de réflexe et visualiseur audio.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>body { background: #000; margin: 0; overflow: hidden; }</style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const c = document.getElementById('c'), x = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    function loop() {
        x.fillStyle = 'rgba(0,0,0,0.05)'; x.fillRect(0,0,c.width,c.height);
        x.strokeStyle = 'hsl('+(Date.now()/10 % 360)+', 100%, 50%)';
        x.beginPath(); x.arc(c.width/2, c.height/2, Math.abs(Math.sin(Date.now()/500)*200), 0, Math.PI*2);
        x.stroke(); requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  },
  {
    icon: '🌠',
    en: 'Aura Finale',
    fr: 'Aura Finale',
    desc_en: 'A special visual experience to end the arcade.',
    desc_fr: 'Expérience visuelle de fin d\'arcade.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { background: #020617; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #fff; font-family: serif; font-size: 40px; overflow: hidden; }
    .star { position: absolute; background: #fff; border-radius: 50%; opacity: 0; animation: star 3s infinite; }
    @keyframes star { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(5); opacity: 0; } }
  </style>
</head>
<body>
  THANK YOU FOR PLAYING
  <script>
    for(let i=0; i<50; i++) {
        let s = document.createElement('div'); s.className = 'star';
        s.style.width = '2px'; s.style.height = '2px';
        s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
        s.style.animationDelay = Math.random()*3+'s';
        document.body.appendChild(s);
    }
  </script>
</body>
</html>`
  },
  {
    icon: '🏁',
    en: 'The End?',
    fr: 'La Fin ?',
    desc_en: 'You reached the end of the arcade.',
    desc_fr: 'Vous avez atteint la fin de l\'arcade.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aura Arcade Excellence</title>
  <style>
    body { background: #020617; color: #fff; font-family: 'Outfit', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; overflow: hidden; }
    .hero { background: linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.8) 100%); padding: 60px; border-radius: 40px; border: 1px solid rgba(59,130,246,0.3); backdrop-filter: blur(10px); position: relative; }
    h1 { font-size: 64px; font-weight: 900; margin-bottom: 10px; background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: flow 5s infinite alternate; }
    @keyframes flow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(90deg); } }
    p { color: #94a3b8; font-size: 22px; max-width: 500px; margin-bottom: 40px; line-height: 1.6; }
    .medal { font-size: 120px; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(251,191,36,0.4)); animation: float 3s infinite ease-in-out; }
    @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0); } }
    .btn-finish { background: #3b82f6; color: #fff; border: none; padding: 20px 50px; border-radius: 100px; font-size: 20px; font-weight: 800; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(59,130,246,0.4); text-transform: uppercase; letter-spacing: 1px; }
    .btn-finish:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 40px rgba(59,130,246,0.6); background: #60a5fa; }
  </style>
</head>
<body>
  <div class="hero">
    <div class="medal">🏆</div>
    <h1>CONGRATULATIONS</h1>
    <p>You have unlocked the complete Aura Arcade Library. 100+ Games regulated and functional.</p>
    <button class="btn-finish" onclick="location.reload()">Return to Menu</button>
  </div>
</body>
</html>`
  }
]
