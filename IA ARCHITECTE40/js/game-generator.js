/**
 * Game Generator v1.0 — EN/FR
 */
(function () {
'use strict';
var TX = {
  en: {
    tab: 'Games', title: '🎮 Game Generator', sub: 'Generate fully playable games',
    desc: 'Select a game and generate full HTML, CSS, and JS logic instantly.',
    generate: '⚡ Play Now',
    injected: '✅ Game generated!',
    games: {
      snake: 'Classic Snake', snakeDesc: 'Eat food, grow longer, do not hit the walls!',
      tictactoe: 'Tic-Tac-Toe', tictactoeDesc: 'Play against a smart AI opponent.',
      memory: 'Memory Cards', memoryDesc: 'Find all matching pairs of emojis.',
      pong: 'Retro Pong', pongDesc: 'Classic ping pong against the computer.',
      reaction: 'Reaction Test', reactionDesc: 'Click as fast as you can when it turns green!',
      flappy: 'Flappy Block', flappyDesc: 'Tap to fly, avoid the moving pipes!',
      invaders: 'Space Invaders', invadersDesc: 'Shoot down the alien armada!',
      puzzle2048: '2048 Puzzle', puzzle2048Desc: 'Slide and combine tiles to reach 2048.',
      dino: 'Dino Runner', dinoDesc: 'Jump over obstacles in this endless runner.',
      breakout: 'Breakout', breakoutDesc: 'Destroy all the bricks with the bouncing ball.',
      mines: 'Minesweeper', minesDesc: 'Find all the hidden mines without clicking them.',
      asteroids: 'Asteroids', asteroidsDesc: 'Fly in space and shoot the asteroids.',
      tetris: 'Tetris Clone', tetrisDesc: 'Drop and arrange blocks to clear lines.'
    }
  },
  fr: {
    tab: 'Jeux', title: '🎮 Generateur de Jeux', sub: 'Generez des jeux jouables',
    desc: 'Selectionnez un jeu et generez le HTML, CSS et JS complet instantanement.',
    generate: '⚡ Jouer',
    injected: '✅ Jeu genere !',
    games: {
      snake: 'Snake Classique', snakeDesc: 'Mangez, grandissez, evitez les murs !',
      tictactoe: 'Morpion', tictactoeDesc: 'Jouez contre une IA intelligente.',
      memory: 'Jeu de Memoire', memoryDesc: 'Trouvez toutes les paires d emojis.',
      pong: 'Pong Retro', pongDesc: 'Ping pong classique contre l ordinateur.',
      reaction: 'Test de Reaction', reactionDesc: 'Cliquez le plus vite possible au vert !',
      flappy: 'Flappy Cube', flappyDesc: 'Appuyez pour voler, evitez les tuyaux !',
      invaders: 'Space Invaders', invadersDesc: 'Tirez sur l armada extraterrestre !',
      puzzle2048: 'Puzzle 2048', puzzle2048Desc: 'Glissez et combinez pour atteindre 2048.',
      dino: 'Dino Runner', dinoDesc: 'Sautez par-dessus les obstacles (endless runner).',
      breakout: 'Casse-Briques', breakoutDesc: 'Detruisez toutes les briques avec la balle.',
      mines: 'Demineur', minesDesc: 'Trouvez les mines cachees sans cliquer dessus.',
      asteroids: 'Asteroides', asteroidsDesc: 'Volez dans l espace et tirez sur les asteroides.',
      tetris: 'Clone Tetris', tetrisDesc: 'Empilez les blocs pour effacer les lignes.'
    }
  }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }
function tg(k) { return ((TX[gl()] || TX.en).games || TX.en.games)[k] || k; }

var GAMES = [
  {
    id: 'snake', nameKey: 'snake', descKey: 'snakeDesc', icon: '🐍',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Snake</title>
<style>
  body { background: #222; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; flex-direction: column; color: white; font-family: sans-serif; }
  canvas { background: #000; border: 4px solid #4ade80; box-shadow: 0 0 20px rgba(74,222,128,0.5); }
  h1 { margin: 0 0 10px 0; color: #4ade80; }
  p { margin: 5px 0 15px 0; color: #94a3b8; }
</style>
</head>
<body>
  <h1>Snake</h1>
  <p>Score: <span id="score">0</span> | Use Arrow Keys</p>
  <canvas id="game" width="400" height="400"></canvas>
<script>
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  
  const grid = 20;
  let count = 0;
  let score = 0;
  
  let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
  let apple = { x: 320, y: 320 };

  function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

  function loop() {
    requestAnimationFrame(loop);
    if (++count < 6) return;
    count = 0;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    snake.x += snake.dx;
    snake.y += snake.dy;
    
    if (snake.x < 0) snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width) snake.x = 0;
    
    if (snake.y < 0) snake.y = canvas.height - grid;
    else if (snake.y >= canvas.height) snake.y = 0;
    
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);
    
    ctx.fillStyle = '#4ade80';
    snake.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
      
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        score += 10;
        scoreEl.textContent = score;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
      }
      
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160; snake.y = 160; snake.cells = []; snake.maxCells = 4;
          snake.dx = grid; snake.dy = 0; score = 0; scoreEl.textContent = score;
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
</script>
</body>
</html>`
  },
  {
    id: 'tictactoe', nameKey: 'tictactoe', descKey: 'tictactoeDesc', icon: '❌',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Tic-Tac-Toe</title>
<style>
  body { background: #1e293b; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
  .board { display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; margin: 20px 0; }
  .cell { width: 100px; height: 100px; background: #334155; display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: bold; cursor: pointer; border-radius: 10px; transition: background 0.2s; }
  .cell:hover { background: #475569; }
  .cell.x { color: #38bdf8; }
  .cell.o { color: #f43f5e; }
  button { padding: 10px 20px; font-size: 1.2rem; background: #38bdf8; border: none; border-radius: 6px; color: #0f172a; font-weight: bold; cursor: pointer; }
  #msg { font-size: 1.5rem; height: 30px; font-weight: bold; }
</style>
</head>
<body>
  <h1>Tic-Tac-Toe</h1>
  <div id="msg">Your turn (X)</div>
  <div class="board" id="board">
    <div class="cell" onclick="play(0)"></div><div class="cell" onclick="play(1)"></div><div class="cell" onclick="play(2)"></div>
    <div class="cell" onclick="play(3)"></div><div class="cell" onclick="play(4)"></div><div class="cell" onclick="play(5)"></div>
    <div class="cell" onclick="play(6)"></div><div class="cell" onclick="play(7)"></div><div class="cell" onclick="play(8)"></div>
  </div>
  <button onclick="reset()">Restart Game</button>
<script>
  let board = ['', '', '', '', '', '', '', '', ''];
  let active = true;
  const cells = document.querySelectorAll('.cell');
  const msg = document.getElementById('msg');
  const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  function play(i) {
    if (!active || board[i] !== '') return;
    makeMove(i, 'X', 'x');
    if (checkWin('X')) return endGame('You Win!');
    if (!board.includes('')) return endGame('Draw!');
    
    active = false; msg.textContent = 'AI is thinking...';
    setTimeout(aiPlay, 500);
  }

  function aiPlay() {
    let empty = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    let i = empty[Math.floor(Math.random() * empty.length)];
    makeMove(i, 'O', 'o');
    if (checkWin('O')) return endGame('AI Wins!');
    if (!board.includes('')) return endGame('Draw!');
    active = true; msg.textContent = 'Your turn (X)';
  }

  function makeMove(i, val, cls) {
    board[i] = val;
    cells[i].textContent = val;
    cells[i].classList.add(cls);
  }

  function checkWin(player) {
    return winCombos.some(c => board[c[0]]===player && board[c[1]]===player && board[c[2]]===player);
  }

  function endGame(text) {
    active = false;
    msg.textContent = text;
  }

  function reset() {
    board = ['', '', '', '', '', '', '', '', ''];
    active = true;
    msg.textContent = 'Your turn (X)';
    cells.forEach(c => { c.textContent = ''; c.className = 'cell'; });
  }
</script>
</body>
</html>`
  },
  {
    id: 'memory', nameKey: 'memory', descKey: 'memoryDesc', icon: '🧠',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Memory Cards</title>
<style>
  body { background: #0f172a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
  .grid { display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; perspective: 1000px; }
  .card { width: 80px; height: 80px; background: #334155; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; transition: transform 0.4s; transform-style: preserve-3d; }
  .card.flip { transform: rotateY(180deg); background: #fff; }
  .card span { opacity: 0; transform: rotateY(180deg); transition: opacity 0.2s; }
  .card.flip span { opacity: 1; }
  .card.match { background: #4ade80; cursor: default; }
  h1 { margin-top: 0; color: #fbbf24; }
  button { margin-top: 20px; padding: 10px 20px; background: #fbbf24; color: #000; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
</style>
</head>
<body>
  <h1>Memory Match</h1>
  <div class="grid" id="grid"></div>
  <button onclick="init()">Restart</button>
<script>
  const emojis = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
  let cards = [], first = null, second = null, lock = false, matches = 0;
  const grid = document.getElementById('grid');

  function init() {
    grid.innerHTML = '';
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    matches = 0; first = null; second = null; lock = false;
    
    cards.forEach((e, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = \`<span>\${e}</span>\`;
      card.onclick = () => flip(card, e);
      grid.appendChild(card);
    });
  }

  function flip(card, val) {
    if (lock || card === first || card.classList.contains('match')) return;
    card.classList.add('flip');
    
    if (!first) { first = { card, val }; return; }
    
    second = { card, val };
    lock = true;
    
    if (first.val === second.val) {
      setTimeout(() => {
        first.card.classList.add('match'); second.card.classList.add('match');
        reset(); matches++;
        if(matches === emojis.length) setTimeout(() => alert('You Win!'), 300);
      }, 500);
    } else {
      setTimeout(() => {
        first.card.classList.remove('flip'); second.card.classList.remove('flip');
        reset();
      }, 1000);
    }
  }

  function reset() { first = null; second = null; lock = false; }
  init();
</script>
</body>
</html>`
  },
  {
    id: 'flappy', nameKey: 'flappy', descKey: 'flappyDesc', icon: '🐦',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Flappy Block</title>
<style>
  body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#38bdf8; font-family:sans-serif; overflow:hidden; }
  canvas { background:#0ea5e9; border:4px solid white; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.3); }
  #ui { position:absolute; top:20px; color:white; text-align:center; text-shadow:2px 2px 0 #000; }
  h1 { margin:0; font-size:2rem; }
  p { margin:5px 0 0; font-size:1.2rem; font-weight:bold; }
</style>
</head>
<body>
  <div id="ui"><h1>Flappy Block</h1><p>Score: <span id="sc">0</span></p><p style="font-size:0.8rem">Click or Space to jump</p></div>
  <canvas id="c" width="400" height="500"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  const scEl = document.getElementById('sc');
  let bird = {x:50, y:200, v:0, size:20};
  let pipes = [];
  let score = 0, frame = 0, over = false;

  function jump() { if(over){ reset(); } else { bird.v = -6; } }
  document.onkeydown = e => { if(e.code === 'Space') jump(); };
  document.onmousedown = jump;

  function reset() {
    bird = {x:50, y:200, v:0, size:20};
    pipes = [];
    score = 0; frame = 0; over = false;
    scEl.textContent = 0;
    loop();
  }

  function loop() {
    if(over) return;
    requestAnimationFrame(loop);
    frame++;
    ctx.clearRect(0,0,400,500);

    bird.v += 0.3; // gravity
    bird.y += bird.v;
    
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);

    if(frame % 100 === 0) {
      let h = Math.random() * 200 + 50;
      pipes.push({x:400, top:h, bottom:500-h-130, w:50}); // 130 gap
    }

    ctx.fillStyle = '#22c55e';
    for(let i=0; i<pipes.length; i++) {
      let p = pipes[i];
      p.x -= 3;
      ctx.fillRect(p.x, 0, p.w, p.top);
      ctx.fillRect(p.x, 500-p.bottom, p.w, p.bottom);
      
      if(p.x === bird.x) { score++; scEl.textContent = score; }
      
      if(bird.x < p.x+p.w && bird.x+bird.size > p.x && 
        (bird.y < p.top || bird.y+bird.size > 500-p.bottom)) {
        over = true;
      }
    }
    
    if(bird.y > 500 || bird.y < 0) over = true;
    if(pipes.length && pipes[0].x < -50) pipes.shift();
    
    if(over) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0,0,400,500);
      ctx.fillStyle = 'white';
      ctx.font = '30px sans-serif';
      ctx.fillText('Game Over', 120, 250);
    }
  }
  loop();
</script>
</body>
</html>`
  },
  {
    id: 'invaders', nameKey: 'invaders', descKey: 'invadersDesc', icon: '👾',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Space Invaders</title>
<style>
  body { background:#0f172a; margin:0; display:flex; justify-content:center; align-items:center; height:100vh; color:white; font-family:sans-serif; }
  canvas { background:#000; border:2px solid #334155; }
  #ui { position:absolute; top:20px; font-weight:bold; }
</style>
</head>
<body>
  <div id="ui">Score: <span id="s">0</span> | Left/Right & Space</div>
  <canvas id="c" width="400" height="500"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  let p = {x:180, y:460, w:40, h:20, dx:0};
  let bullets = [], enemies = [];
  let score = 0, dir = 1;
  
  for(let i=0; i<5; i++) {
    for(let j=0; j<8; j++) {
      enemies.push({x:j*40+20, y:i*30+30, w:25, h:20, alive:true});
    }
  }

  document.onkeydown = e => {
    if(e.code==='ArrowLeft') p.dx=-4;
    if(e.code==='ArrowRight') p.dx=4;
    if(e.code==='Space') bullets.push({x:p.x+18, y:p.y, w:4, h:10});
  };
  document.onkeyup = e => { if(e.code.includes('Arrow')) p.dx=0; };

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0,0,400,500);
    
    p.x += p.dx;
    if(p.x<0) p.x=0; if(p.x>360) p.x=360;
    
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    
    ctx.fillStyle = '#fcd34d';
    for(let i=0; i<bullets.length; i++) {
      let b = bullets[i]; b.y -= 7;
      ctx.fillRect(b.x, b.y, b.w, b.h);
    }
    
    let moveDown = false;
    enemies.forEach(e => {
      if(!e.alive) return;
      e.x += dir * 0.5;
      if(e.x > 370 || e.x < 5) moveDown = true;
    });
    
    if(moveDown) {
      dir *= -1;
      enemies.forEach(e => { if(e.alive) e.y += 15; });
    }
    
    ctx.fillStyle = '#f43f5e';
    enemies.forEach(e => {
      if(!e.alive) return;
      ctx.fillRect(e.x, e.y, e.w, e.h);
      bullets.forEach(b => {
        if(b.x < e.x+e.w && b.x+b.w > e.x && b.y < e.y+e.h && b.y+b.h > e.y) {
          e.alive = false; b.y = -100; score+=10;
          document.getElementById('s').textContent = score;
        }
      });
    });
  }
  loop();
</script>
</body>
</html>`
  },
  {
    id: 'puzzle2048', nameKey: 'puzzle2048', descKey: 'puzzle2048Desc', icon: '🧩',
    code: `<!DOCTYPE html>
<html>
<head>
<title>2048 Puzzle</title>
<style>
  body { background:#faf8ef; display:flex; flex-direction:column; align-items:center; font-family:sans-serif; margin:0; padding-top:40px; color:#776e65; }
  h1 { margin:0 0 10px; font-size:3rem; }
  .grid { background:#bbada0; padding:10px; border-radius:10px; display:grid; grid-template-columns:repeat(4, 80px); gap:10px; }
  .cell { width:80px; height:80px; background:#cdc1b4; border-radius:5px; display:flex; justify-content:center; align-items:center; font-size:2rem; font-weight:bold; color:#776e65; }
  [data-v="2"]{background:#eee4da;} [data-v="4"]{background:#ede0c8;} [data-v="8"]{background:#f2b179;color:#f9f6f2;}
  [data-v="16"]{background:#f59563;color:#f9f6f2;} [data-v="32"]{background:#f67c5f;color:#f9f6f2;}
  [data-v="64"]{background:#f65e3b;color:#f9f6f2;} [data-v="128"]{background:#edcf72;color:#f9f6f2;font-size:1.5rem;}
</style>
</head>
<body>
  <h1>2048</h1>
  <div class="grid" id="g"></div>
<script>
  let b = Array(16).fill(0);
  const g = document.getElementById('g');
  
  function init() { add(); add(); draw(); }
  function add() {
    let empty = [];
    b.forEach((v,i)=> {if(!v) empty.push(i)});
    if(!empty.length) return;
    b[empty[Math.floor(Math.random()*empty.length)]] = Math.random()<0.9?2:4;
  }
  function draw() {
    g.innerHTML = '';
    b.forEach(v => {
      let div = document.createElement('div');
      div.className = 'cell';
      if(v) { div.textContent = v; div.setAttribute('data-v', v); }
      g.appendChild(div);
    });
  }
  
  document.onkeydown = e => {
    let old = [...b];
    if(e.key==='ArrowRight') slide(1);
    if(e.key==='ArrowLeft') slide(-1);
    if(e.key==='ArrowUp') slide(-4);
    if(e.key==='ArrowDown') slide(4);
    if(old.some((v,i) => v!==b[i])) { add(); draw(); }
  };

  function slide(d) {
    let moved = false;
    for(let i=0; i<4; i++) {
      let line = [];
      for(let j=0; j<4; j++) {
        let idx = Math.abs(d)===1 ? i*4+j : j*4+i;
        if(d===1||d===4) idx = Math.abs(d)===1 ? i*4+(3-j) : (3-j)*4+i;
        if(b[idx]) line.push({v:b[idx], idx:idx});
      }
      for(let k=0; k<line.length-1; k++) {
        if(line[k].v === line[k+1].v) {
          line[k].v *= 2; line[k+1].v = 0;
        }
      }
      line = line.filter(x => x.v);
      for(let j=0; j<4; j++) {
        let idx = Math.abs(d)===1 ? i*4+j : j*4+i;
        if(d===1||d===4) idx = Math.abs(d)===1 ? i*4+(3-j) : (3-j)*4+i;
        b[idx] = line[j] ? line[j].v : 0;
      }
    }
  }
  init();
</script>
</body>
</html>`
  },
  {
    id: 'dino', nameKey: 'dino', descKey: 'dinoDesc', icon: '🦖',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Dino Runner</title>
<style>
  body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#f1f5f9; font-family:sans-serif; overflow:hidden; }
  canvas { background:#fff; border-bottom:4px solid #1e293b; max-width: 100%; }
  #ui { position:absolute; top:20px; font-weight:bold; font-size:1.5rem; color:#1e293b; text-align:center; }
  .hint { font-size: 0.8rem; color: #64748b; display: block; margin-top: 5px; }
</style>
</head>
<body>
  <div id="ui">Score: <span id="s">0</span><span class="hint">Click or Space to Jump</span></div>
  <canvas id="c" width="600" height="200"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  let dino = {x:50, y:150, w:30, h:40, dy:0, jump:false};
  let obs = [], score = 0, frame = 0, over = false;
  
  function jump() {
    if(over) { obs=[]; score=0; frame=0; over=false; loop(); }
    else if(!dino.jump) { dino.dy = -12; dino.jump = true; }
  }
  
  document.addEventListener('keydown', e => { if(e.code==='Space' || e.key===' ') jump(); });
  document.addEventListener('mousedown', jump);
  document.addEventListener('touchstart', jump);

  function loop() {
    if(over) return;
    requestAnimationFrame(loop);
    ctx.clearRect(0,0,600,200);
    frame++;
    
    dino.dy += 0.6; // gravity
    dino.y += dino.dy;
    if(dino.y >= 160) { dino.y = 160; dino.jump = false; dino.dy = 0; }
    
    ctx.fillStyle = '#475569';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    
    if(frame % 90 === 0) obs.push({x:600, y:170, w:20, h:30});
    
    ctx.fillStyle = '#ef4444';
    for(let i=0; i<obs.length; i++) {
      let o = obs[i]; o.x -= 6;
      ctx.fillRect(o.x, o.y, o.w, o.h);
      if(dino.x < o.x+o.w && dino.x+dino.w > o.x && dino.y < o.y+o.h && dino.y+dino.h > o.y) over = true;
    }
    
    if(obs.length && obs[0].x < -30) { obs.shift(); score++; document.getElementById('s').textContent = score; }
    
    if(over) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0,0,600,200);
      ctx.fillStyle = 'white'; ctx.font = '30px Arial'; ctx.fillText('Game Over', 220, 100);
    }
  }
  loop();
</script>
</body>
</html>`
  },
  {
    id: 'breakout', nameKey: 'breakout', descKey: 'breakoutDesc', icon: '🧱',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Breakout</title>
<style>
  body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#1e293b; color:white; font-family:sans-serif; }
  canvas { background:#0f172a; border:2px solid #475569; border-radius:8px; box-shadow:0 0 20px rgba(0,0,0,0.5); }
  #ui { position:absolute; top:20px; font-weight:bold; font-size:1.2rem; }
</style>
</head>
<body>
  <div id="ui">Score: <span id="s">0</span> | Lives: <span id="l">3</span></div>
  <canvas id="c" width="480" height="320"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  let score = 0, lives = 3;
  let ball = {x:240, y:300, dx:3, dy:-3, r:5};
  let paddle = {h:10, w:75, x:200};
  let bricks = [];
  const r=3, c=5, bw=75, bh=20, p=10, offT=30, offL=30;
  
  let right = false, left = false;
  document.onkeydown = e => { if(e.key==='ArrowRight') right=true; if(e.key==='ArrowLeft') left=true; };
  document.onkeyup = e => { if(e.key==='ArrowRight') right=false; if(e.key==='ArrowLeft') left=false; };

  for(let i=0; i<c; i++) {
    bricks[i] = [];
    for(let j=0; j<r; j++) bricks[i][j] = {x:0, y:0, status:1};
  }

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0,0,480,320);
    
    // Draw Bricks
    for(let i=0; i<c; i++) {
      for(let j=0; j<r; j++) {
        if(bricks[i][j].status === 1) {
          let bx = (i*(bw+p))+offL;
          let by = (j*(bh+p))+offT;
          bricks[i][j].x = bx; bricks[i][j].y = by;
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(bx, by, bw, bh);
          
          if(ball.x > bx && ball.x < bx+bw && ball.y > by && ball.y < by+bh) {
            ball.dy = -ball.dy;
            bricks[i][j].status = 0;
            score++; document.getElementById('s').textContent = score;
            if(score === r*c) alert("YOU WIN!");
          }
        }
      }
    }
    
    // Draw Ball & Paddle
    ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fillStyle = '#fcd34d'; ctx.fill(); ctx.closePath();
    ctx.fillStyle = '#f43f5e'; ctx.fillRect(paddle.x, 320-paddle.h, paddle.w, paddle.h);
    
    ball.x += ball.dx; ball.y += ball.dy;
    
    if(ball.x+ball.dx > 480-ball.r || ball.x+ball.dx < ball.r) ball.dx = -ball.dx;
    if(ball.y+ball.dy < ball.r) ball.dy = -ball.dy;
    else if(ball.y+ball.dy > 320-ball.r) {
      if(ball.x > paddle.x && ball.x < paddle.x+paddle.w) ball.dy = -ball.dy;
      else {
        lives--; document.getElementById('l').textContent = lives;
        if(!lives) { alert("GAME OVER"); document.location.reload(); }
        else { ball.x=240; ball.y=300; ball.dx=3; ball.dy=-3; paddle.x=200; }
      }
    }
    
    if(right && paddle.x < 480-paddle.w) paddle.x += 7;
    else if(left && paddle.x > 0) paddle.x -= 7;
  }
  loop();
</script>
</body>
</html>`
  },
  {
    id: 'mines', nameKey: 'mines', descKey: 'minesDesc', icon: '💣',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Minesweeper</title>
<style>
  body { background:#94a3b8; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; font-family:sans-serif; }
  h1 { color:#0f172a; margin:0 0 10px; }
  .grid { display:grid; grid-template-columns:repeat(10, 30px); gap:2px; background:#475569; padding:10px; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.3); }
  .cell { width:30px; height:30px; background:#cbd5e1; display:flex; align-items:center; justify-content:center; font-weight:bold; cursor:pointer; font-size:1.2rem; user-select:none; }
  .cell:hover { background:#e2e8f0; }
  .cell.open { background:#f8fafc; cursor:default; }
  .cell.mine { background:#ef4444; color:white; }
  .n1{color:#2563eb;} .n2{color:#16a34a;} .n3{color:#dc2626;} .n4{color:#9333ea;}
</style>
</head>
<body>
  <h1>Minesweeper</h1>
  <div class="grid" id="grid"></div>
<script>
  const w=10, h=10, mines=15;
  let grid = document.getElementById('grid'), b=[], over=false, revealed=0;
  
  function init() {
    for(let i=0; i<w*h; i++) {
      let div = document.createElement('div');
      div.className = 'cell';
      div.onclick = () => click(i);
      div.oncontextmenu = e => { e.preventDefault(); if(!b[i].open) div.textContent='🚩'; };
      grid.appendChild(div);
      b.push({mine:false, open:false, el:div, val:0});
    }
    
    let m = 0;
    while(m < mines) {
      let r = Math.floor(Math.random()*(w*h));
      if(!b[r].mine) { b[r].mine = true; m++; }
    }
    
    for(let i=0; i<w*h; i++) {
      if(b[i].mine) continue;
      let count = 0, x=i%w, y=Math.floor(i/w);
      for(let dx=-1; dx<=1; dx++) {
        for(let dy=-1; dy<=1; dy++) {
          let nx=x+dx, ny=y+dy;
          if(nx>=0&&nx<w&&ny>=0&&ny<h && b[ny*w+nx].mine) count++;
        }
      }
      b[i].val = count;
    }
  }

  function click(i) {
    if(over || b[i].open) return;
    b[i].open = true; revealed++;
    let el = b[i].el; el.classList.add('open');
    
    if(b[i].mine) {
      el.classList.add('mine'); el.textContent = '💣'; over = true;
      setTimeout(()=>alert('Game Over!'), 100);
      b.forEach(c => { if(c.mine) {c.el.classList.add('open','mine'); c.el.textContent='💣'} });
      return;
    }
    
    if(b[i].val > 0) {
      el.textContent = b[i].val; el.classList.add('n'+b[i].val);
    } else {
      let x=i%w, y=Math.floor(i/w);
      for(let dx=-1; dx<=1; dx++) {
        for(let dy=-1; dy<=1; dy++) {
          let nx=x+dx, ny=y+dy;
          if(nx>=0&&nx<w&&ny>=0&&ny<h) click(ny*w+nx);
        }
      }
    }
    if(revealed === w*h-mines) { over=true; setTimeout(()=>alert('You Win!'), 100); }
  }
  init();
</script>
</body>
</html>`
  },
  {
    id: 'asteroids', nameKey: 'asteroids', descKey: 'asteroidsDesc', icon: '🚀',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Asteroids</title>
<style>
  body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#000; color:white; font-family:sans-serif; overflow:hidden; }
  canvas { border:1px solid #333; }
</style>
</head>
<body>
  <div style="position:absolute;top:20px;">Score: <span id="s">0</span> | Arrow Keys to move, Space to shoot</div>
  <canvas id="c" width="600" height="600"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  let ship = {x:300, y:300, a:0, dx:0, dy:0, r:15};
  let keys={}, bullets=[], ast=[], score=0;
  
  for(let i=0; i<6; i++) spawn();
  function spawn() {
    let x, y;
    do { x=Math.random()*600; y=Math.random()*600; } while(Math.hypot(ship.x-x, ship.y-y)<100);
    ast.push({x:x, y:y, dx:Math.random()*4-2, dy:Math.random()*4-2, r:Math.random()*20+20});
  }

  document.onkeydown = e => { keys[e.code]=true; if(e.code==='Space') bullets.push({x:ship.x, y:ship.y, dx:Math.cos(ship.a)*7, dy:Math.sin(ship.a)*7}); };
  document.onkeyup = e => keys[e.code]=false;

  function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.fillRect(0,0,600,600);
    
    if(keys['ArrowLeft']) ship.a -= 0.1;
    if(keys['ArrowRight']) ship.a += 0.1;
    if(keys['ArrowUp']) { ship.dx += Math.cos(ship.a)*0.1; ship.dy += Math.sin(ship.a)*0.1; }
    
    ship.x += ship.dx; ship.y += ship.dy;
    if(ship.x<0) ship.x=600; if(ship.x>600) ship.x=0;
    if(ship.y<0) ship.y=600; if(ship.y>600) ship.y=0;
    
    ctx.save(); ctx.translate(ship.x, ship.y); ctx.rotate(ship.a);
    ctx.strokeStyle='white'; ctx.beginPath(); ctx.moveTo(15,0); ctx.lineTo(-10,-10); ctx.lineTo(-10,10); ctx.closePath(); ctx.stroke();
    ctx.restore();
    
    ctx.fillStyle='white';
    bullets.forEach((b,i) => {
      b.x+=b.dx; b.y+=b.dy; ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, 7); ctx.fill();
      if(b.x<0||b.x>600||b.y<0||b.y>600) bullets.splice(i,1);
    });
    
    ctx.strokeStyle='#94a3b8';
    ast.forEach((a, i) => {
      a.x+=a.dx; a.y+=a.dy;
      if(a.x<0) a.x=600; if(a.x>600) a.x=0; if(a.y<0) a.y=600; if(a.y>600) a.y=0;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.stroke();
      
      bullets.forEach((b, j) => {
        if(Math.hypot(b.x-a.x, b.y-a.y) < a.r) {
          bullets.splice(j,1); ast.splice(i,1); score+=10; document.getElementById('s').textContent=score;
          spawn(); if(Math.random()>0.5) spawn();
        }
      });
      
      if(Math.hypot(ship.x-a.x, ship.y-a.y) < a.r+ship.r) {
        ast=[]; score=0; document.getElementById('s').textContent=score; ship={x:300,y:300,a:0,dx:0,dy:0,r:15};
        for(let i=0; i<6; i++) spawn();
      }
    });
  }
  loop();
</script>
</body>
</html>`
  },
  {
    id: 'tetris', nameKey: 'tetris', descKey: 'tetrisDesc', icon: '🧱',
    code: `<!DOCTYPE html>
<html>
<head>
<title>Tetris</title>
<style>
  body { background:#0f172a; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; font-family:sans-serif; color:white;}
  canvas { background:#1e293b; border:2px solid #334155; }
</style>
</head>
<body>
  <div style="margin-right:20px; text-align:right;"><h1>Tetris</h1><p>Score: <span id="s">0</span></p><p style="font-size:0.8rem">Arrow keys to move/rotate<br>Down arrow to drop</p></div>
  <canvas id="c" width="240" height="400"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  const cols = 12, rows = 20, bs = 20;
  let board = Array.from({length:rows}, () => Array(cols).fill(0));
  const pieces = [
    [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]], [[1,1,0],[0,1,1]], [[0,1,1],[1,1,0]]
  ];
  const colors = [null, '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#06b6d4', '#f97316'];
  let p, score=0;

  function newPiece() {
    let type = Math.floor(Math.random()*7);
    p = { m: pieces[type], x:4, y:0, c: type+1 };
    if(collide(p)) { board = Array.from({length:rows}, () => Array(cols).fill(0)); score=0; document.getElementById('s').textContent=0; }
  }
  
  function draw() {
    ctx.clearRect(0,0,240,400);
    for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
        if(board[r][c]) { ctx.fillStyle=colors[board[r][c]]; ctx.fillRect(c*bs, r*bs, bs-1, bs-1); }
      }
    }
    if(p) {
      for(let r=0; r<p.m.length; r++) {
        for(let c=0; c<p.m[r].length; c++) {
          if(p.m[r][c]) { ctx.fillStyle=colors[p.c]; ctx.fillRect((p.x+c)*bs, (p.y+r)*bs, bs-1, bs-1); }
        }
      }
    }
  }

  function collide(p2) {
    for(let r=0; r<p2.m.length; r++) {
      for(let c=0; c<p2.m[r].length; c++) {
        if(p2.m[r][c] && (board[p2.y+r] && board[p2.y+r][p2.x+c]) !== 0) return true;
      }
    }
    return false;
  }

  function rotate(matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  }

  document.onkeydown = e => {
    if(!p) return;
    if(e.code==='ArrowLeft') { p.x--; if(collide(p)) p.x++; }
    if(e.code==='ArrowRight') { p.x++; if(collide(p)) p.x--; }
    if(e.code==='ArrowUp') { let old=p.m; p.m=rotate(p.m); if(collide(p)) p.m=old; }
    if(e.code==='ArrowDown') { p.y++; if(collide(p)){ p.y--; merge(); } }
    draw();
  };

  function merge() {
    for(let r=0; r<p.m.length; r++) {
      for(let c=0; c<p.m[r].length; c++) {
        if(p.m[r][c]) board[p.y+r][p.x+c] = p.c;
      }
    }
    for(let r=rows-1; r>=0; r--) {
      if(board[r].every(v => v!==0)) {
        board.splice(r, 1);
        board.unshift(Array(cols).fill(0));
        score+=10; document.getElementById('s').textContent=score; r++;
      }
    }
    newPiece();
  }

  setInterval(() => {
    if(!p) newPiece();
    p.y++; if(collide(p)){ p.y--; merge(); }
    draw();
  }, 500);
</script>
</body>
</html>`
  }
];

function injectGame(code, statusEl) {
  if (!window.editor) return;
  window.editor.setValue(code);
  if (window.runPreview) window.runPreview();
  statusEl.textContent = t('injected');
  setTimeout(function() { statusEl.textContent = ''; }, 2000);
}

let isTyping = false;
function typeGameCode(code, statusEl) {
  if (!window.editor || isTyping) return;
  isTyping = true;
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
      var delay = 80; // Slower base delay for better video recording (~10-15s total)
      if (lines[index-1]) {
         if (lines[index-1].length > 40) delay = 150; // Pause longer for heavy lines
         if (lines[index-1].trim() === '') delay = 20; // Still skip empty lines quickly
      }
      
      setTimeout(typeNextLine, delay);
    } else {
      if (window.runPreview) window.runPreview();
      statusEl.textContent = '✅ Game Generated!';
      isTyping = false;
      setTimeout(function() { statusEl.textContent = ''; }, 2000);
    }
  }
  
  typeNextLine();
}

function renderGamesTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;';
  
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:12px 14px 8px;border-bottom:1px solid rgba(244,63,94,0.25);flex-shrink:0;';
  hdr.innerHTML = '<div style="font-size:13px;font-weight:900;color:#f43f5e;">' + t('title') + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px;">' + t('sub') + '</div>';
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

  GAMES.forEach(function (game) {
    var card = document.createElement('div');
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:10px;padding:12px;display:flex;align-items:center;gap:12px;transition:all 0.2s;';
    card.onmouseenter = function() { card.style.borderColor = '#f43f5e'; card.style.transform = 'translateY(-2px)'; };
    card.onmouseleave = function() { card.style.borderColor = '#334155'; card.style.transform = 'translateY(0)'; };

    var iconBox = document.createElement('div');
    iconBox.style.cssText = 'font-size:24px;width:40px;height:40px;background:rgba(244,63,94,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
    iconBox.textContent = game.icon;
    
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    var nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:12px;font-weight:800;color:#e2e8f0;margin-bottom:3px;';
    nameEl.textContent = tg(game.nameKey);
    var descEl = document.createElement('div');
    descEl.style.cssText = 'font-size:9px;color:#94a3b8;line-height:1.3;';
    descEl.textContent = tg(game.descKey);
    info.appendChild(nameEl); info.appendChild(descEl);

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:5px;flex-shrink:0;';

    var btnType = document.createElement('button');
    btnType.innerHTML = '🎬';
    btnType.title = "Cinematic Generate (For Video)";
    btnType.style.cssText = 'background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;';
    btnType.onclick = function() { typeGameCode(game.code, statusEl); };

    var btn = document.createElement('button');
    btn.textContent = '▶';
    btn.title = t('generate');
    btn.style.cssText = 'background:linear-gradient(135deg,#f43f5e,#e11d48);border:none;width:32px;height:32px;border-radius:6px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;';
    btn.onclick = function() { injectGame(game.code, statusEl); };

    actions.appendChild(btnType);
    actions.appendChild(btn);

    card.appendChild(iconBox); card.appendChild(info); card.appendChild(actions);
    body.appendChild(card);
  });

  wrap.appendChild(body);
  parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', function () {
  var oAL = window.applyLang;
  window.applyLang = function () {
    if (typeof oAL === 'function') oAL();
    var el = document.getElementById('lbl-tab-games');
    if (el) el.textContent = t('tab');
    if (window.activeTab === 'games') renderGamesTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'games') {
      window.activeTab = 'games';
      document.querySelectorAll('.ltab').forEach(function (b) { b.classList.remove('active'); });
      var btn = document.getElementById('tab-games');
      if (btn) btn.classList.add('active');
      renderGamesTab();
      return;
    }
    if (typeof oRT === 'function') oRT(tab);
  };
});
})();
