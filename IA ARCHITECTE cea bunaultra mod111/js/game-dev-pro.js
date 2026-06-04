(function() {
'use strict';

const TX = {
  en: { 
    apply: '➕ Inject Module', applied: '✅ Module Injected!',
    tabs: {
      particleemitter: 'Particle FX',
      proceduralmap: 'Procedural Map',
      rigidbodyphysics: 'Physics Sandbox',
      dialoguetree: 'RPG Dialogue',
      raycastingfov: '2D Raycasting',
      pathfindingai: 'Pathfinding AI',
      inversekinematics: 'IK Rigging',
      parallaxengine: 'Parallax Engine',
      spriteanimator: 'Sprite Player',
      spatialaudio: '3D Audio'
    },
    titles: {
      particleemitter: '🌋 Particle FX Emitter',
      proceduralmap: '🌍 Procedural Terrain Generator',
      rigidbodyphysics: '💥 Rigid Body Physics Sandbox',
      dialoguetree: '💬 RPG Dialogue Tree Builder',
      raycastingfov: '🔦 2D Stealth Raycasting',
      pathfindingai: '🧠 A* Pathfinding AI',
      inversekinematics: '🦾 Inverse Kinematics Rigging',
      parallaxengine: '🌄 Parallax Scrolling Engine',
      spriteanimator: '🏃‍♂️ Sprite Animation Player',
      spatialaudio: '🔊 3D Spatial Audio Engine'
    },
    subs: {
      particleemitter: 'Create dynamic explosions and fire.',
      proceduralmap: 'Infinite 2D terrain generation.',
      rigidbodyphysics: 'Real-time 2D gravity and collisions.',
      dialoguetree: 'Node-based conversation logic.',
      raycastingfov: 'Dynamic lighting and field of view.',
      pathfindingai: 'Grid-based intelligent routing.',
      inversekinematics: 'Procedural limb animation.',
      parallaxengine: 'Multi-layer 2D depth simulation.',
      spriteanimator: 'Frame-by-frame animation viewer.',
      spatialaudio: 'Positional Web Audio API simulation.'
    },
    descs: {
      particleemitter: 'Generates a highly optimized Canvas particle system for games. Move your mouse over the canvas to emit fire/magic particles.',
      proceduralmap: 'Generates a tilemap using noise algorithms. Creates oceans, beaches, forests, and mountains automatically.',
      rigidbodyphysics: 'A mini 2D physics engine. Click on the canvas to spawn boxes that interact with gravity and boundaries.',
      dialoguetree: 'A visual representation of an RPG conversation flow, allowing branching dialogue options.',
      raycastingfov: 'Simulates 2D line-of-sight and dynamic shadows. Move your mouse to cast light rays against walls.',
      pathfindingai: 'Visualize the A* pathfinding algorithm finding the shortest path around obstacles.',
      inversekinematics: 'Interactive robotic arm demonstrating mathematical procedural animation (IK).',
      parallaxengine: 'Move your mouse to shift background layers at different speeds for 3D depth.',
      spriteanimator: 'Interactive sprite sheet viewer. Control playback speed and animation states.',
      spatialaudio: 'Simulates 3D sound. Move the listener around the audio source to hear dynamic panning.'
    }
  },
  fr: { 
    apply: '➕ Injecter Module', applied: '✅ Module Injecté!',
    tabs: {
      particleemitter: 'Particules FX',
      proceduralmap: 'Carte Procédurale',
      rigidbodyphysics: 'Physique 2D',
      dialoguetree: 'Dialogue RPG',
      raycastingfov: 'Raycasting 2D',
      pathfindingai: 'IA Navigation',
      inversekinematics: 'Cinématique Inverse',
      parallaxengine: 'Moteur Parallaxe',
      spriteanimator: 'Lecteur Sprite',
      spatialaudio: 'Audio 3D'
    },
    titles: {
      particleemitter: '🌋 Émetteur de Particules FX',
      proceduralmap: '🌍 Générateur de Terrain Procédural',
      rigidbodyphysics: '💥 Bac à Sable Physique 2D',
      dialoguetree: '💬 Arbre de Dialogue RPG',
      raycastingfov: '🔦 Raycasting furtif 2D',
      pathfindingai: '🧠 IA de Recherche de Chemin A*',
      inversekinematics: '🦾 Animation Cinématique Inverse',
      parallaxengine: '🌄 Moteur de Défilement Parallaxe',
      spriteanimator: '🏃‍♂️ Lecteur d\'Animation Sprite',
      spatialaudio: '🔊 Moteur Audio Spatial 3D'
    },
    subs: {
      particleemitter: 'Créez des explosions et du feu dynamiques.',
      proceduralmap: 'Génération de terrain 2D infini.',
      rigidbodyphysics: 'Gravité et collisions 2D en temps réel.',
      dialoguetree: 'Logique de conversation nodale.',
      raycastingfov: 'Éclairage dynamique et champ de vision.',
      pathfindingai: 'Routage intelligent sur grille.',
      inversekinematics: 'Animation procédurale de membres.',
      parallaxengine: 'Simulation de profondeur 2D multi-couches.',
      spriteanimator: 'Visionneuse d\'animation image par image.',
      spatialaudio: 'Simulation positionnelle Web Audio API.'
    },
    descs: {
      particleemitter: 'Génère un système de particules Canvas optimisé. Déplacez votre souris pour émettre des particules de feu/magie.',
      proceduralmap: 'Génère une carte tuilée en utilisant des algorithmes de bruit (océans, plages, forêts, montagnes).',
      rigidbodyphysics: 'Un mini moteur physique 2D. Cliquez sur le canvas pour faire apparaître des boîtes avec de la gravité.',
      dialoguetree: 'Une représentation visuelle d\'un flux de conversation RPG avec des options de dialogue ramifiées.',
      raycastingfov: 'Simule la ligne de mire 2D et les ombres dynamiques. Déplacez votre souris pour éclairer les murs.',
      pathfindingai: 'Visualisez l\'algorithme de recherche de chemin A* trouvant le chemin le plus court.',
      inversekinematics: 'Bras robotique interactif démontrant l\'animation procédurale mathématique (IK).',
      parallaxengine: 'Déplacez votre souris pour décaler les calques d\'arrière-plan pour une profondeur 3D.',
      spriteanimator: 'Visionneuse de feuille de sprites interactive. Contrôlez la vitesse de lecture et les états.',
      spatialaudio: 'Simule un son 3D. Déplacez l\'auditeur autour de la source audio.'
    }
  }
};

function gl() { return window.lang || 'en'; }
function t(type, key) { 
  if(!TX[gl()]) return key;
  if(type === 'apply') return TX[gl()].apply;
  if(type === 'applied') return TX[gl()].applied;
  return TX[gl()][type][key] || key; 
}

const SNIPPETS = {
  particleemitter: `<!-- PARTICLE FX ENGINE START -->
<div style="background:#000; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <canvas id="fxCanvas" style="width:100%; height:100%;"></canvas>
  <div style="position:absolute; top:20px; left:20px; color:#fdba74; font-family:monospace; pointer-events:none;">
    <h3>🌋 PARTICLE EMITTER</h3>
    <p>Move mouse to spawn particles.</p>
  </div>
</div>
<script>
(function(){
  const canvas = document.getElementById('fxCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let particles = [];
  let mouse = {x: w/2, y: h/2};
  
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    for(let i=0; i<3; i++) {
      particles.push({
        x: mouse.x, y: mouse.y,
        vx: (Math.random()-0.5)*4,
        vy: (Math.random()-0.5)*4 - 2, // slightly upwards
        life: 1.0,
        size: Math.random()*15 + 5,
        color: \`hsl(\${Math.random()*40 + 10}, 100%, 50%)\` // fire colors
      });
    }
  });

  function loop() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0,0,w,h);
    
    ctx.globalCompositeOperation = 'lighter';
    for(let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.02;
      p.size *= 0.95;
      
      if(p.life <= 0) { particles.splice(i, 1); continue; }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- PARTICLE FX ENGINE END -->`,

  proceduralmap: `<!-- PROCEDURAL MAP ENGINE START -->
<style>
  .map-wrap { background:#1e293b; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px; display:flex; justify-content:center; align-items:center; flex-direction:column; }
  .grid-container { display: grid; grid-template-columns: repeat(20, 15px); grid-template-rows: repeat(15, 15px); gap: 0; border: 2px solid #334155; }
  .tile { width:15px; height:15px; }
  .btn-regen { margin-top:20px; background:#22c55e; color:#fff; border:none; padding:10px 20px; border-radius:8px; cursor:pointer; font-weight:bold; }
  .btn-regen:hover { background:#16a34a; }
</style>
<div class="map-wrap">
  <div style="color:#86efac; font-family:monospace; margin-bottom:15px;"><h3>🌍 PROCEDURAL GENERATION</h3></div>
  <div class="grid-container" id="tileGrid"></div>
  <button class="btn-regen" onclick="generateMap()">Regenerate World</button>
</div>
<script>
  function generateMap() {
    const grid = document.getElementById('tileGrid');
    if(!grid) return;
    grid.innerHTML = '';
    // Very simple noise approximation for demo
    for(let y=0; y<15; y++){
      for(let x=0; x<20; x++){
        let div = document.createElement('div');
        div.className = 'tile';
        // Random value biased slightly by coordinates to create "blobs"
        let val = Math.sin(x*0.5) * Math.cos(y*0.5) + (Math.random()*1.5 - 0.75);
        
        let color = '#3b82f6'; // deep water
        if(val > -0.2) color = '#60a5fa'; // shallow water
        if(val > 0.1) color = '#fde047'; // sand
        if(val > 0.3) color = '#22c55e'; // grass
        if(val > 0.8) color = '#15803d'; // deep forest
        if(val > 1.2) color = '#78716c'; // mountain
        if(val > 1.5) color = '#f8fafc'; // snow
        
        div.style.background = color;
        grid.appendChild(div);
      }
    }
  }
  generateMap();
</script>
<!-- PROCEDURAL MAP ENGINE END -->`,

  rigidbodyphysics: `<!-- RIGID BODY PHYSICS ENGINE START -->
<div style="background:#0f172a; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <canvas id="physicsCanvas" style="width:100%; height:100%;"></canvas>
  <div style="position:absolute; top:20px; left:20px; color:#fde047; font-family:monospace; pointer-events:none;">
    <h3>💥 2D PHYSICS SANDBOX</h3>
    <p>Click anywhere to spawn boxes.</p>
  </div>
</div>
<script>
(function(){
  const canvas = document.getElementById('physicsCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let boxes = [];
  
  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    boxes.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      vx: (Math.random()-0.5)*10,
      vy: 0,
      size: 20 + Math.random()*20,
      color: \`hsl(\${Math.random()*360}, 80%, 60%)\`
    });
  });

  const gravity = 0.5;
  const bounce = 0.7;
  const friction = 0.99;

  function loop() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0,0,w,h);
    
    boxes.forEach(b => {
      b.vy += gravity;
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= friction;
      
      // Floor collision
      if(b.y + b.size > h) { b.y = h - b.size; b.vy *= -bounce; b.vx *= 0.9; }
      // Wall collision
      if(b.x < 0) { b.x = 0; b.vx *= -bounce; }
      if(b.x + b.size > w) { b.x = w - b.size; b.vx *= -bounce; }
      
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.size, b.size);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(b.x, b.y, b.size, b.size);
    });
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- RIGID BODY PHYSICS ENGINE END -->`,

  dialoguetree: `<!-- RPG DIALOGUE TREE ENGINE START -->
<style>
  .rpg-dialogue { background:#1e293b; color:#fff; width:100%; min-width:300px; padding:30px; border-radius:12px; margin-top:20px; font-family:sans-serif; box-sizing:border-box; border:2px solid #334155; }
  .npc-box { background:#0f172a; padding:20px; border-radius:8px; border-left:4px solid #3b82f6; margin-bottom:20px; }
  .npc-name { color:#3b82f6; font-weight:bold; font-size:12px; text-transform:uppercase; margin-bottom:5px; letter-spacing:1px; }
  .npc-text { font-size:18px; line-height:1.5; }
  .choices { display:flex; flex-direction:column; gap:10px; }
  .choice-btn { background:#334155; color:#cbd5e1; border:none; padding:15px; border-radius:8px; text-align:left; cursor:pointer; font-size:16px; transition:0.2s; }
  .choice-btn:hover { background:#475569; color:#fff; transform:translateX(5px); }
</style>
<div class="rpg-dialogue" id="rpg-app">
  <div class="npc-box">
    <div class="npc-name">Guard Captain</div>
    <div class="npc-text" id="npc-text">"Halt! Who goes there? The city gates are closed until dawn."</div>
  </div>
  <div class="choices" id="choices-box">
    <button class="choice-btn" onclick="rpgAnswer(1)">[Persuasion] I'm on official business for the King.</button>
    <button class="choice-btn" onclick="rpgAnswer(2)">[Bribe 50 Gold] Maybe this will open the gates?</button>
    <button class="choice-btn" onclick="rpgAnswer(3)">[Attack] Step aside or die!</button>
  </div>
</div>
<script>
  function rpgAnswer(id) {
    const npc = document.getElementById('npc-text');
    const box = document.getElementById('choices-box');
    if(id === 1) {
      npc.innerText = "The King? Hmm... I haven't heard of any envoys. But I won't risk his wrath. Pass quickly.";
      box.innerHTML = '<button class="choice-btn" onclick="rpgAnswer(0)">[Leave] Enter the city.</button>';
    } else if(id === 2) {
      npc.innerText = "Gold? Are you trying to insult me? Guards, arrest this scoundrel!";
      box.innerHTML = '<button class="choice-btn" onclick="rpgAnswer(0)">[Combat Initiated...]</button>';
    } else if(id === 3) {
      npc.innerText = "To arms! We are under attack!";
      box.innerHTML = '<button class="choice-btn" onclick="rpgAnswer(0)">[Draw Weapon]</button>';
    } else {
      npc.innerText = "Dialogue Ended.";
      box.innerHTML = '';
    }
  }
</script>
<!-- RPG DIALOGUE TREE ENGINE END -->`,

  raycastingfov: `<!-- 2D RAYCASTING ENGINE START -->
<div style="background:#000; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <canvas id="rayCanvas" style="width:100%; height:100%;"></canvas>
  <div style="position:absolute; top:20px; left:20px; color:#c4b5fd; font-family:monospace; pointer-events:none; text-shadow:0 0 5px #000;">
    <h3>🔦 2D STEALTH RAYCASTING</h3>
    <p>Move mouse to cast light.</p>
  </div>
</div>
<script>
(function(){
  const canvas = document.getElementById('rayCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let mouse = {x: w/2, y: h/2};
  
  // Create some random walls
  let walls = [];
  walls.push({x1:0, y1:0, x2:w, y2:0});
  walls.push({x1:w, y1:0, x2:w, y2:h});
  walls.push({x1:w, y1:h, x2:0, y2:h});
  walls.push({x1:0, y1:h, x2:0, y2:0});
  
  for(let i=0; i<5; i++){
    walls.push({
      x1: Math.random()*w, y1: Math.random()*h,
      x2: Math.random()*w, y2: Math.random()*h
    });
  }
  
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function getIntersection(ray, segment){
    const r_px = ray.a.x; const r_py = ray.a.y;
    const r_dx = ray.b.x-ray.a.x; const r_dy = ray.b.y-ray.a.y;
    const s_px = segment.x1; const s_py = segment.y1;
    const s_dx = segment.x2-segment.x1; const s_dy = segment.y2-segment.y1;
    const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
    if(r_dx/r_mag===s_dx/Math.sqrt(s_dx*s_dx+s_dy*s_dy) && r_dy/r_mag===s_dy/Math.sqrt(s_dx*s_dx+s_dy*s_dy)) return null;
    const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
    const T1 = (s_px+s_dx*T2-r_px)/r_dx;
    if(T1<0 || T2<0 || T2>1) return null;
    return { x: r_px+r_dx*T1, y: r_py+r_dy*T1, param: T1 };
  }

  function loop(){
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0,0,w,h);
    
    // Draw walls
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    walls.forEach(wll => {
      ctx.beginPath(); ctx.moveTo(wll.x1, wll.y1); ctx.lineTo(wll.x2, wll.y2); ctx.stroke();
    });
    
    // Cast rays
    ctx.fillStyle = 'rgba(255, 255, 200, 0.4)';
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    for(let a=0; a<Math.PI*2; a+=0.05){
      const ray = {a: mouse, b: {x: mouse.x+Math.cos(a)*1000, y: mouse.y+Math.sin(a)*1000}};
      let closestIntersect = null;
      walls.forEach(wll => {
        const intersect = getIntersection(ray, wll);
        if(!intersect) return;
        if(!closestIntersect || intersect.param < closestIntersect.param){
          closestIntersect = intersect;
        }
      });
      if(closestIntersect){
        ctx.lineTo(closestIntersect.x, closestIntersect.y);
      }
    }
    ctx.fill();
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- 2D RAYCASTING ENGINE END -->`,

  pathfindingai: `<!-- PATHFINDING AI ENGINE START -->
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
<!-- PATHFINDING AI ENGINE END -->`,

  inversekinematics: `<!-- INVERSE KINEMATICS ENGINE START -->
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
<!-- INVERSE KINEMATICS ENGINE END -->`,

  parallaxengine: `<!-- PARALLAX ENGINE START -->
<div id="parallax-wrap" style="background:linear-gradient(#0284c7, #38bdf8); width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <div style="position:absolute; top:20px; left:20px; color:#fff; font-family:monospace; z-index:10; pointer-events:none;">
    <h3>🌄 PARALLAX SCROLLING</h3>
    <p>Move mouse horizontally to shift layers.</p>
  </div>
  <!-- Sun -->
  <div style="position:absolute; width:80px; height:80px; background:#fef08a; border-radius:50%; top:50px; left:50%; transform:translateX(-50%); box-shadow:0 0 50px #fef08a;"></div>
  <!-- Layers -->
  <div id="layer-back" style="position:absolute; bottom:0; width:200%; height:200px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg"><path d="M0 200 L0 100 Q100 50 200 150 T400 100 T600 180 T800 120 T1000 150 L1000 200 Z" fill="%23334155"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-mid" style="position:absolute; bottom:0; width:200%; height:150px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg"><path d="M0 150 L0 50 Q100 100 200 30 T400 80 T600 40 T800 100 T1000 60 L1000 150 Z" fill="%23475569"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-front" style="position:absolute; bottom:0; width:200%; height:100px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 100 L0 50 Q100 80 200 20 T400 50 T600 10 T800 60 T1000 40 L1000 100 Z" fill="%231e293b"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
</div>
<script>
  const wrap = document.getElementById('parallax-wrap');
  const lb = document.getElementById('layer-back');
  const lm = document.getElementById('layer-mid');
  const lf = document.getElementById('layer-front');
  
  wrap.addEventListener('mousemove', e => {
    const percent = e.clientX / window.innerWidth - 0.5;
    lb.style.transform = 'translateX(' + (-percent * 20) + 'px)';
    lm.style.transform = 'translateX(' + (-percent * 60) + 'px)';
    lf.style.transform = 'translateX(' + (-percent * 150) + 'px)';
  });
</script>
<!-- PARALLAX ENGINE END -->`,

  spriteanimator: `<!-- SPRITE ANIMATOR ENGINE START -->
<style>
  .sprite-wrap { background:#0f172a; width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px; display:flex; flex-direction:column; align-items:center; color:#fff; font-family:monospace; }
  .sprite-box { width:64px; height:64px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 256 64" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="32" width="32" height="32" fill="%23ef4444"/><rect x="80" y="20" width="32" height="44" fill="%23ef4444"/><rect x="144" y="10" width="32" height="54" fill="%23ef4444"/><rect x="208" y="32" width="32" height="32" fill="%23ef4444"/></svg>') left center; background-size: 256px 64px; transform:scale(3); margin-top:100px; image-rendering:pixelated; }
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
<!-- SPRITE ANIMATOR ENGINE END -->`,

  spatialaudio: `<!-- SPATIAL AUDIO ENGINE START -->
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
<!-- SPATIAL AUDIO ENGINE END -->`

};

function renderPanel(tabId) {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#fff;font-size:16px;">'+t('titles', tabId)+'</h2>'+
                '<p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('subs', tabId)+'</p>'+
                '<p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('descs', tabId)+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:#3b82f6;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(59,130,246,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    var snippet = SNIPPETS[tabId];
    if(code.indexOf(tabId.toUpperCase() + ' ENGINE') !== -1) { 
      if(window.showToast) window.showToast('Already injected!'); 
      return; 
    }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  w.appendChild(btn);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    ['particleemitter','proceduralmap','rigidbodyphysics','dialoguetree','raycastingfov','pathfindingai','inversekinematics','parallaxengine','spriteanimator','spatialaudio'].forEach(id => {
      var el = document.getElementById('lbl-tab-'+id);
      if(el) el.textContent = t('tabs', id);
    });
    if(['particleemitter','proceduralmap','rigidbodyphysics','dialoguetree','raycastingfov','pathfindingai','inversekinematics','parallaxengine','spriteanimator','spatialaudio'].includes(window.activeTab)) {
      renderPanel(window.activeTab);
    }
  };
  
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(['particleemitter','proceduralmap','rigidbodyphysics','dialoguetree','raycastingfov','pathfindingai','inversekinematics','parallaxengine','spriteanimator','spatialaudio'].includes(tab)) {
      window.activeTab = tab;
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-'+tab);
      if(b) b.classList.add('active');
      renderPanel(tab);
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
