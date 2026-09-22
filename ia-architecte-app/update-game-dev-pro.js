const fs = require('fs');

let fileContent = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', 'utf8');

const TX_EN_APPEND = `      pathfindingai: 'Pathfinding AI',
      inversekinematics: 'IK Rigging',
      parallaxengine: 'Parallax Engine',
      spriteanimator: 'Sprite Player',
      spatialaudio: '3D Audio'`;
const TX_EN_TITLES_APPEND = `      pathfindingai: '🧠 A* Pathfinding AI',
      inversekinematics: '🦾 Inverse Kinematics Rigging',
      parallaxengine: '🌄 Parallax Scrolling Engine',
      spriteanimator: '🏃‍♂️ Sprite Animation Player',
      spatialaudio: '🔊 3D Spatial Audio Engine'`;
const TX_EN_SUBS_APPEND = `      pathfindingai: 'Grid-based intelligent routing.',
      inversekinematics: 'Procedural limb animation.',
      parallaxengine: 'Multi-layer 2D depth simulation.',
      spriteanimator: 'Frame-by-frame animation viewer.',
      spatialaudio: 'Positional Web Audio API simulation.'`;
const TX_EN_DESCS_APPEND = `      pathfindingai: 'Visualize the A* pathfinding algorithm finding the shortest path around obstacles.',
      inversekinematics: 'Interactive robotic arm demonstrating mathematical procedural animation (IK).',
      parallaxengine: 'Move your mouse to shift background layers at different speeds for 3D depth.',
      spriteanimator: 'Interactive sprite sheet viewer. Control playback speed and animation states.',
      spatialaudio: 'Simulates 3D sound. Move the listener around the audio source to hear dynamic panning.'`;

const TX_FR_APPEND = `      pathfindingai: 'IA Navigation',
      inversekinematics: 'Cinématique Inverse',
      parallaxengine: 'Moteur Parallaxe',
      spriteanimator: 'Lecteur Sprite',
      spatialaudio: 'Audio 3D'`;
const TX_FR_TITLES_APPEND = `      pathfindingai: '🧠 IA de Recherche de Chemin A*',
      inversekinematics: '🦾 Animation Cinématique Inverse',
      parallaxengine: '🌄 Moteur de Défilement Parallaxe',
      spriteanimator: '🏃‍♂️ Lecteur d\\'Animation Sprite',
      spatialaudio: '🔊 Moteur Audio Spatial 3D'`;
const TX_FR_SUBS_APPEND = `      pathfindingai: 'Routage intelligent sur grille.',
      inversekinematics: 'Animation procédurale de membres.',
      parallaxengine: 'Simulation de profondeur 2D multi-couches.',
      spriteanimator: 'Visionneuse d\\'animation image par image.',
      spatialaudio: 'Simulation positionnelle Web Audio API.'`;
const TX_FR_DESCS_APPEND = `      pathfindingai: 'Visualisez l\\'algorithme de recherche de chemin A* trouvant le chemin le plus court.',
      inversekinematics: 'Bras robotique interactif démontrant l\\'animation procédurale mathématique (IK).',
      parallaxengine: 'Déplacez votre souris pour décaler les calques d\\'arrière-plan pour une profondeur 3D.',
      spriteanimator: 'Visionneuse de feuille de sprites interactive. Contrôlez la vitesse de lecture et les états.',
      spatialaudio: 'Simule un son 3D. Déplacez l\\'auditeur autour de la source audio.'`;

const SNIPPETS_APPEND = `
  pathfindingai: \`<!-- PATHFINDING AI ENGINE START -->
<div style="background:#0f172a; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px; display:flex; flex-direction:column; align-items:center;">
  <div style="color:#5eead4; font-family:monospace; margin-top:10px;"><h3>🧠 A* PATHFINDING ALGORITHM</h3><p style="font-size:12px;">Click to set target</p></div>
  <canvas id="pfCanvas" style="width:300px; height:300px; background:#1e293b; border:2px solid #334155; margin-top:10px; cursor:crosshair;"></canvas>
</div>
<script>
(function(){
  const canvas = document.getElementById('pfCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300; canvas.height = 300;
  const cols = 20; const rows = 20;
  const w = canvas.width / cols; const h = canvas.height / rows;
  let grid = []; let path = [];
  let start = {x:0, y:0}; let end = {x:19, y:19};
  
  for(let i=0; i<cols; i++){
    grid[i] = [];
    for(let j=0; j<rows; j++){
      grid[i][j] = {x:i, y:j, wall: Math.random() < 0.3};
    }
  }
  grid[start.x][start.y].wall = false; grid[end.x][end.y].wall = false;

  function heuristic(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }
  
  function findPath() {
    let openSet = [grid[start.x][start.y]];
    let closedSet = [];
    for(let i=0; i<cols; i++) for(let j=0; j<rows; j++) {
      grid[i][j].f = 0; grid[i][j].g = 0; grid[i][j].h = 0; grid[i][j].previous = undefined;
    }
    
    while(openSet.length > 0) {
      let winner = 0;
      for(let i=0; i<openSet.length; i++) if(openSet[i].f < openSet[winner].f) winner = i;
      let current = openSet[winner];
      
      if(current === grid[end.x][end.y]) {
        path = [];
        let temp = current;
        path.push(temp);
        while(temp.previous) { path.push(temp.previous); temp = temp.previous; }
        return;
      }
      
      openSet = openSet.filter(n => n !== current);
      closedSet.push(current);
      
      let neighbors = [];
      let x = current.x, y = current.y;
      if(x < cols-1) neighbors.push(grid[x+1][y]);
      if(x > 0) neighbors.push(grid[x-1][y]);
      if(y < rows-1) neighbors.push(grid[x][y+1]);
      if(y > 0) neighbors.push(grid[x][y-1]);
      
      for(let i=0; i<neighbors.length; i++){
        let neighbor = neighbors[i];
        if(!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + 1;
          let newPath = false;
          if(openSet.includes(neighbor)) {
            if(tempG < neighbor.g) { neighbor.g = tempG; newPath = true; }
          } else {
            neighbor.g = tempG; newPath = true; openSet.push(neighbor);
          }
          if(newPath) {
            neighbor.h = heuristic(neighbor, grid[end.x][end.y]);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
    }
    path = []; // no path
  }

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left)/w);
    const y = Math.floor((e.clientY - rect.top)/h);
    if(x>=0 && x<cols && y>=0 && y<rows && !grid[x][y].wall) {
      end = {x, y}; findPath(); draw();
    }
  });

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<cols; i++) {
      for(let j=0; j<rows; j++) {
        ctx.fillStyle = grid[i][j].wall ? '#334155' : '#1e293b';
        ctx.fillRect(i*w, j*h, w-1, h-1);
      }
    }
    ctx.fillStyle = '#ef4444'; ctx.fillRect(end.x*w, end.y*h, w-1, h-1);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(start.x*w, start.y*h, w-1, h-1);
    
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let i=0; i<path.length; i++) {
      ctx.lineTo(path[i].x*w + w/2, path[i].y*h + h/2);
    }
    ctx.stroke();
  }
  findPath(); draw();
})();
</script>
<!-- PATHFINDING AI ENGINE END -->\`,

  inversekinematics: \`<!-- INVERSE KINEMATICS ENGINE START -->
<div style="background:#1e1b4b; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <canvas id="ikCanvas" style="width:100%; height:100%; cursor:crosshair;"></canvas>
  <div style="position:absolute; top:20px; left:20px; color:#f472b6; font-family:monospace; pointer-events:none;">
    <h3>🦾 INVERSE KINEMATICS</h3>
    <p>Move mouse to control the robotic arm.</p>
  </div>
</div>
<script>
(function(){
  const canvas = document.getElementById('ikCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let mouse = {x: w/2, y: h/2};
  
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  const base = {x: w/2, y: h};
  const len1 = 120, len2 = 120;
  let angle1 = 0, angle2 = 0;

  function loop() {
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0,0,w,h);
    
    // Math for 2-segment IK
    const dx = mouse.x - base.x;
    const dy = mouse.y - base.y;
    const dist = Math.min(Math.sqrt(dx*dx + dy*dy), len1+len2 - 0.1);
    
    const cosAngle2 = (dist*dist - len1*len1 - len2*len2) / (2*len1*len2);
    angle2 = Math.acos(cosAngle2);
    
    const k1 = len1 + len2*Math.cos(angle2);
    const k2 = len2*Math.sin(angle2);
    angle1 = Math.atan2(dy, dx) - Math.atan2(k2, k1);
    
    const jointX = base.x + len1*Math.cos(angle1);
    const jointY = base.y + len1*Math.sin(angle1);
    const endX = jointX + len2*Math.cos(angle1+angle2);
    const endY = jointY + len2*Math.sin(angle1+angle2);

    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw segments
    ctx.strokeStyle = '#4c1d95';
    ctx.beginPath(); ctx.moveTo(base.x, base.y); ctx.lineTo(jointX, jointY); ctx.stroke();
    ctx.strokeStyle = '#c084fc';
    ctx.beginPath(); ctx.moveTo(jointX, jointY); ctx.lineTo(endX, endY); ctx.stroke();
    
    // Draw joints
    ctx.fillStyle = '#f472b6';
    ctx.beginPath(); ctx.arc(base.x, base.y, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(jointX, jointY, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(endX, endY, 6, 0, Math.PI*2); ctx.fill();
    
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- INVERSE KINEMATICS ENGINE END -->\`,

  parallaxengine: \`<!-- PARALLAX ENGINE START -->
<div id="parallax-wrap" style="background:linear-gradient(#0284c7, #38bdf8); width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <div style="position:absolute; top:20px; left:20px; color:#fff; font-family:monospace; z-index:10; pointer-events:none;">
    <h3>🌄 PARALLAX SCROLLING</h3>
    <p>Move mouse horizontally to shift layers.</p>
  </div>
  <!-- Sun -->
  <div style="position:absolute; width:80px; height:80px; background:#fef08a; border-radius:50%; top:50px; left:50%; transform:translateX(-50%); box-shadow:0 0 50px #fef08a;"></div>
  <!-- Layers -->
  <div id="layer-back" style="position:absolute; bottom:0; width:200%; height:200px; background:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 1000 200\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 200 L0 100 Q100 50 200 150 T400 100 T600 180 T800 120 T1000 150 L1000 200 Z\" fill=\"%23334155\"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-mid" style="position:absolute; bottom:0; width:200%; height:150px; background:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 1000 150\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 150 L0 50 Q100 100 200 30 T400 80 T600 40 T800 100 T1000 60 L1000 150 Z\" fill=\"%23475569\"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-front" style="position:absolute; bottom:0; width:200%; height:100px; background:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 1000 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 100 L0 50 Q100 80 200 20 T400 50 T600 10 T800 60 T1000 40 L1000 100 Z\" fill=\"%231e293b\"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
</div>
<script>
  const wrap = document.getElementById('parallax-wrap');
  const lb = document.getElementById('layer-back');
  const lm = document.getElementById('layer-mid');
  const lf = document.getElementById('layer-front');
  
  wrap.addEventListener('mousemove', e => {
    const percent = e.clientX / window.innerWidth - 0.5;
    lb.style.transform = \`translateX(\${-percent * 20}px)\`;
    lm.style.transform = \`translateX(\${-percent * 60}px)\`;
    lf.style.transform = \`translateX(\${-percent * 150}px)\`;
  });
</script>
<!-- PARALLAX ENGINE END -->\`,

  spriteanimator: \`<!-- SPRITE ANIMATOR ENGINE START -->
<style>
  .sprite-wrap { background:#0f172a; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px; display:flex; flex-direction:column; align-items:center; color:#fff; font-family:monospace; }
  .sprite-box { width:64px; height:64px; background:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 256 64\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"16\" y=\"32\" width=\"32\" height=\"32\" fill=\"%23ef4444\"/><rect x=\"80\" y=\"20\" width=\"32\" height=\"44\" fill=\"%23ef4444\"/><rect x=\"144\" y=\"10\" width=\"32\" height=\"54\" fill=\"%23ef4444\"/><rect x=\"208\" y=\"32\" width=\"32\" height=\"32\" fill=\"%23ef4444\"/></svg>') left center; transform:scale(3); margin-top:100px; image-rendering:pixelated; }
  .controls { margin-top:100px; display:flex; gap:20px; }
  .btn-anim { background:#3b82f6; color:#fff; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:bold; }
  @keyframes run { 100% { background-position: -256px center; } }
  .anim-running { animation: run 0.6s steps(4) infinite; }
</style>
<div class="sprite-wrap">
  <div style="position:absolute; top:20px; left:20px; color:#fda4af;"><h3>🏃‍♂️ SPRITE ANIMATOR</h3><p>Frame-by-frame animation test.</p></div>
  <div class="sprite-box anim-running" id="sprite"></div>
  <div class="controls">
    <button class="btn-anim" onclick="document.getElementById('sprite').style.animationDuration='1.2s'">Slow Walk</button>
    <button class="btn-anim" onclick="document.getElementById('sprite').style.animationDuration='0.6s'">Normal Run</button>
    <button class="btn-anim" onclick="document.getElementById('sprite').style.animationDuration='0.3s'">Sprint</button>
  </div>
</div>
<!-- SPRITE ANIMATOR ENGINE END -->\`,

  spatialaudio: \`<!-- SPATIAL AUDIO ENGINE START -->
<div style="background:#111827; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px; display:flex; justify-content:center; align-items:center;">
  <div style="position:absolute; top:20px; left:20px; color:#bef264; font-family:monospace; pointer-events:none;">
    <h3>🔊 3D SPATIAL AUDIO</h3>
    <p>Move the listener (Blue) around the Sound Source (Green).</p>
  </div>
  <div id="audio-arena" style="width:300px; height:300px; border:2px solid #374151; border-radius:50%; position:relative;">
    <div style="width:40px; height:40px; background:#84cc16; border-radius:50%; position:absolute; top:130px; left:130px; display:flex; justify-content:center; align-items:center; box-shadow:0 0 30px #84cc16;">📻</div>
    <div id="listener" style="width:30px; height:30px; background:#3b82f6; border-radius:50%; position:absolute; top:250px; left:135px; cursor:grab; box-shadow:0 0 15px #3b82f6;"></div>
  </div>
  <button id="startAudioBtn" style="position:absolute; bottom:20px; background:#84cc16; color:#000; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">Start Audio Engine</button>
</div>
<script>
(function(){
  const listenerEl = document.getElementById('listener');
  const arena = document.getElementById('audio-arena');
  const btn = document.getElementById('startAudioBtn');
  let audioCtx, panner, osc;
  let isDragging = false;
  
  listenerEl.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', e => {
    if(!isDragging) return;
    const rect = arena.getBoundingClientRect();
    let x = e.clientX - rect.left - 15;
    let y = e.clientY - rect.top - 15;
    x = Math.max(0, Math.min(x, 270));
    y = Math.max(0, Math.min(y, 270));
    listenerEl.style.left = x + 'px';
    listenerEl.style.top = y + 'px';
    
    if(panner && audioCtx) {
      // Map pixel position to 3D space (-1 to 1)
      const px = (x - 135) / 135;
      const pz = (y - 135) / 135;
      audioCtx.listener.setPosition(px, 0, pz);
    }
  });

  btn.addEventListener('click', () => {
    if(audioCtx) return;
    btn.innerText = 'Engine Running... Move listener!';
    btn.style.background = '#4b5563'; btn.style.color = '#9ca3af';
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    osc = audioCtx.createOscillator();
    panner = audioCtx.createPanner();
    
    osc.type = 'sawtooth';
    osc.frequency.value = 150;
    
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 0.1;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1;
    panner.setPosition(0, 0, 0); // Sound is in center
    
    osc.connect(panner);
    panner.connect(audioCtx.destination);
    osc.start();
    
    // Add LFO for a "radar beep" effect
    const lfo = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    lfo.frequency.value = 2;
    lfo.connect(gain.gain);
    osc.disconnect();
    osc.connect(gain);
    gain.connect(panner);
    lfo.start();
  });
})();
</script>
<!-- SPATIAL AUDIO ENGINE END -->\`
`;

fileContent = fileContent.replace(
  /raycastingfov: '2D Raycasting'/g,
  "raycastingfov: '2D Raycasting',\n" + TX_EN_APPEND
).replace(
  /raycastingfov: '🔦 2D Stealth Raycasting'/g,
  "raycastingfov: '🔦 2D Stealth Raycasting',\n" + TX_EN_TITLES_APPEND
).replace(
  /raycastingfov: 'Dynamic lighting and field of view.'/g,
  "raycastingfov: 'Dynamic lighting and field of view.',\n" + TX_EN_SUBS_APPEND
).replace(
  /raycastingfov: 'Simulates 2D line-of-sight and dynamic shadows. Move your mouse to cast light rays against walls.'/g,
  "raycastingfov: 'Simulates 2D line-of-sight and dynamic shadows. Move your mouse to cast light rays against walls.',\n" + TX_EN_DESCS_APPEND
);

fileContent = fileContent.replace(
  /raycastingfov: 'Raycasting 2D'/g,
  "raycastingfov: 'Raycasting 2D',\n" + TX_FR_APPEND
).replace(
  /raycastingfov: '🔦 Raycasting furtif 2D'/g,
  "raycastingfov: '🔦 Raycasting furtif 2D',\n" + TX_FR_TITLES_APPEND
).replace(
  /raycastingfov: 'Éclairage dynamique et champ de vision.'/g,
  "raycastingfov: 'Éclairage dynamique et champ de vision.',\n" + TX_FR_SUBS_APPEND
).replace(
  /raycastingfov: 'Simule la ligne de mire 2D et les ombres dynamiques. Déplacez votre souris pour éclairer les murs.'/g,
  "raycastingfov: 'Simule la ligne de mire 2D et les ombres dynamiques. Déplacez votre souris pour éclairer les murs.',\n" + TX_FR_DESCS_APPEND
);

fileContent = fileContent.replace(
  /RAYCASTING ENGINE END -->`/g,
  "RAYCASTING ENGINE END -->`,\n" + SNIPPETS_APPEND
);

fileContent = fileContent.replace(
  /\['particleemitter','proceduralmap','rigidbodyphysics','dialoguetree','raycastingfov'\]/g,
  "['particleemitter','proceduralmap','rigidbodyphysics','dialoguetree','raycastingfov','pathfindingai','inversekinematics','parallaxengine','spriteanimator','spatialaudio']"
);

fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', fileContent);
