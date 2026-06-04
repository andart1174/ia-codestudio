(function() {
'use strict';

const TX = {
  en: { 
    apply: '➕ Inject Module', applied: '✅ Module Injected!',
    tabs: {
      crisprsplicer: 'CRISPR Splicer',
      dysonsphere: 'Dyson Architect',
      microbotswarm: 'Bot Swarm',
      antimattertrap: 'Antimatter Trap',
      acousticcymatics: 'Acoustic Cymatics'
    },
    titles: {
      crisprsplicer: '🧬 CRISPR Gene Splicer',
      dysonsphere: '☀️ Dyson Sphere Architect',
      microbotswarm: '🐜 Microbot Swarm Intelligence',
      antimattertrap: '🧲 Antimatter Penning Trap',
      acousticcymatics: '🎶 Acoustic Cymatics'
    },
    subs: {
      crisprsplicer: 'Synthetic Biology Simulator',
      dysonsphere: 'Stellar Megastructure Engine',
      microbotswarm: 'Emergent Behavior Algorithm',
      antimattertrap: 'Magnetic Confinement Physics',
      acousticcymatics: 'Sonic Resonance Geometry'
    },
    descs: {
      crisprsplicer: 'A tool to visually edit a DNA sequence and see the resulting splicing animation in real-time.',
      dysonsphere: 'A 3D simulation for managing solar collection nodes around a central glowing star.',
      microbotswarm: 'Boids algorithm simulator. Hundreds of tiny bots forming intelligent emergent behaviors.',
      antimattertrap: 'Magnetic confinement simulation where users must adjust sliders to stabilize antimatter.',
      acousticcymatics: 'Simulates Chladni plates where sound frequencies create complex geometric patterns.'
    }
  },
  fr: { 
    apply: '➕ Injecter Module', applied: '✅ Module Injecté!',
    tabs: {
      crisprsplicer: 'CRISPR Splicer',
      dysonsphere: 'Dyson Architect',
      microbotswarm: 'Bot Swarm',
      antimattertrap: 'Antimatter Trap',
      acousticcymatics: 'Acoustic Cymatics'
    },
    titles: {
      crisprsplicer: '🧬 Éditeur Génétique CRISPR',
      dysonsphere: '☀️ Sphère de Dyson',
      microbotswarm: '🐜 Intelligence en Essaim',
      antimattertrap: '🧲 Piège d\'Antimatière',
      acousticcymatics: '🎶 Cymatique Acoustique'
    },
    subs: {
      crisprsplicer: 'Simulateur de Biologie Synthétique',
      dysonsphere: 'Moteur de Mégastructure Stellaire',
      microbotswarm: 'Algorithme de Comportement Émergent',
      antimattertrap: 'Physique de Confinement Magnétique',
      acousticcymatics: 'Géométrie de Résonance Sonore'
    },
    descs: {
      crisprsplicer: 'Un outil pour éditer visuellement une séquence d\'ADN et voir l\'animation d\'épissage en temps réel.',
      dysonsphere: 'Une simulation 3D pour gérer les nœuds de collecte solaire autour d\'une étoile.',
      microbotswarm: 'Simulateur de boids. Des centaines de minuscules robots formant des comportements intelligents.',
      antimattertrap: 'Simulation de confinement magnétique pour stabiliser l\'antimatière instable.',
      acousticcymatics: 'Simule les plaques de Chladni où les fréquences sonores créent des motifs géométriques.'
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
  crisprsplicer: `<!-- CRISPR ENGINE START -->
<style>
  .crispr-container { background:#0f172a; color:#10b981; font-family:monospace; padding:40px 20px; border-radius:12px; text-align:center; box-shadow:inset 0 0 50px rgba(0,0,0,0.8); width:100%; min-width:300px; margin-top:20px; overflow:hidden; }
  .dna-string { font-size: 24px; letter-spacing: 10px; margin: 20px 0; white-space: nowrap; font-weight: bold; }
  .target { color:#ef4444; background:rgba(239,68,68,0.2); padding:2px 5px; border-radius:6px; animation: pulse-red 1s infinite alternate; }
  .replaced { color:#3b82f6; background:rgba(59,130,246,0.2); padding:2px 5px; border-radius:6px; animation: glow-blue 2s forwards; }
  @keyframes pulse-red { to { box-shadow: 0 0 15px #ef4444; } }
  @keyframes glow-blue { 0% { box-shadow: 0 0 25px #3b82f6; } 100% { box-shadow: 0 0 10px #3b82f6; } }
  .crispr-btn { background:#10b981; color:#0f172a; border:none; padding:12px 24px; font-weight:bold; cursor:pointer; border-radius:8px; transition: 0.3s; margin-top: 10px; }
  .crispr-btn:hover { transform: scale(1.05); }
</style>
<div class="crispr-container" id="crispr-app">
  <h2>🧬 CRISPR Cas-9 Simulator</h2>
  <div class="dna-string" id="dna-view">ACTGGTA<span class="target">TACG</span>ATTGC</div>
  <p style="color:#64748b; font-size:14px; margin-bottom: 20px;">Target sequence identified: TACG (Defective Gene)</p>
  <button class="crispr-btn" onclick="executeSplicing()">Execute RNA Splicing</button>
</div>
<script>
  function executeSplicing() {
    const view = document.getElementById('dna-view');
    view.innerHTML = 'ACTGGTA<span class="replaced">GGCC</span>ATTGC';
    const btn = document.querySelector('.crispr-btn');
    btn.innerText = 'Genetic Sequence Patched ✅';
    btn.style.background = '#3b82f6';
    btn.style.color = '#fff';
  }
</script>
<!-- CRISPR ENGINE END -->`,

  dysonsphere: `<!-- DYSON SPHERE ENGINE START -->
<style>
  .dyson-wrapper { background:#000; height:400px; display:flex; justify-content:center; align-items:center; perspective:1000px; overflow:hidden; position:relative; width:100%; min-width:300px; margin-top:20px; border-radius:12px; }
  .star { width:100px; height:100px; background:radial-gradient(circle, #fff, #facc15, #ea580c); border-radius:50%; box-shadow:0 0 100px #ea580c, 0 0 200px #facc15; position:absolute; z-index:1; }
  .orbit { position:absolute; width:300px; height:300px; border:1px dashed rgba(255,255,255,0.2); border-radius:50%; transform-style:preserve-3d; animation:spin 10s linear infinite; }
  .orbit-2 { width:400px; height:400px; animation:spin 15s linear infinite reverse; }
  .panel { position:absolute; width:30px; height:20px; background:rgba(56,189,248,0.5); border:1px solid #38bdf8; box-shadow:0 0 10px #38bdf8; }
  .p1 { top:0; left:50%; transform:translateX(-50%) rotateX(90deg); }
  .p2 { bottom:0; left:50%; transform:translateX(-50%) rotateX(90deg); }
  .p3 { left:0; top:50%; transform:translateY(-50%) rotateY(90deg); }
  .p4 { right:0; top:50%; transform:translateY(-50%) rotateY(90deg); }
  @keyframes spin { 100% { transform:rotateX(60deg) rotateZ(360deg); } }
  .hud { position:absolute; top:20px; left:20px; color:#38bdf8; font-family:monospace; z-index:10; }
</style>
<div class="dyson-wrapper">
  <div class="hud">
    <h3>☀️ DYSON SWARM STATUS</h3>
    <p>Energy Output: <span id="exo">0.00</span> ExaWatts</p>
  </div>
  <div class="star"></div>
  <div class="orbit">
    <div class="panel p1"></div><div class="panel p2"></div>
    <div class="panel p3"></div><div class="panel p4"></div>
  </div>
  <div class="orbit orbit-2">
    <div class="panel p1"></div><div class="panel p2"></div>
    <div class="panel p3"></div><div class="panel p4"></div>
  </div>
</div>
<script>
  let energy = 0;
  setInterval(() => {
    energy += Math.random() * 0.5;
    const exo = document.getElementById('exo');
    if(exo) exo.innerText = energy.toFixed(2);
  }, 100);
</script>
<!-- DYSON SPHERE ENGINE END -->`,

  microbotswarm: `<!-- MICROBOT SWARM ENGINE START -->
<div style="background:#0f172a; position:relative; width:100%; min-width:300px; height:400px; overflow:hidden; margin-top:20px; border-radius:12px;">
  <canvas id="swarmCanvas" style="width:100%; height:100%;"></canvas>
  <div style="position:absolute; top:20px; left:20px; color:#38bdf8; font-family:monospace; pointer-events:none;">
    <h3>🐜 SWARM INTELLIGENCE</h3>
    <p>Move mouse to attract microbots.</p>
  </div>
</div>
<script>
(function(){
  const canvas = document.getElementById('swarmCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let bots = [];
  let mouse = {x: w/2, y: h/2};
  
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  for(let i=0; i<200; i++) {
    bots.push({ x:Math.random()*w, y:Math.random()*h, vx:Math.random()*4-2, vy:Math.random()*4-2 });
  }

  function loop() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
    ctx.fillRect(0,0,w,h);
    
    ctx.fillStyle = '#38bdf8';
    bots.forEach(b => {
      // Move towards mouse
      let dx = mouse.x - b.x;
      let dy = mouse.y - b.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist > 0) {
        b.vx += (dx/dist) * 0.2;
        b.vy += (dy/dist) * 0.2;
      }
      // Friction / speed limit
      b.vx *= 0.95; b.vy *= 0.95;
      b.x += b.vx; b.y += b.vy;
      
      ctx.beginPath();
      ctx.arc(b.x, b.y, 2, 0, Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- MICROBOT SWARM ENGINE END -->`,

  antimattertrap: `<!-- ANTIMATTER TRAP ENGINE START -->
<style>
  .trap-wrap { background:#000; height:400px; display:flex; flex-direction:column; justify-content:center; align-items:center; color:#c084fc; font-family:monospace; position:relative; overflow:hidden; width:100%; min-width:300px; margin-top:20px; border-radius:12px;}
  .trap-core { width:300px; height:300px; border:2px dashed rgba(192,132,252,0.3); border-radius:50%; position:relative; display:flex; justify-content:center; align-items:center; }
  .particle { width:20px; height:20px; background:#fff; box-shadow:0 0 20px #fff, 0 0 40px #c084fc, 0 0 80px #c084fc; border-radius:50%; position:absolute; transition: transform 0.1s; }
  .controls { margin-top:20px; z-index:10; }
  input[type="range"] { accent-color:#c084fc; }
</style>
<div class="trap-wrap" id="trap-bg">
  <h3>🧲 ANTIMATTER PENNING TRAP</h3>
  <div class="trap-core">
    <div class="particle" id="am-particle"></div>
  </div>
  <div class="controls">
    <label>Magnetic Field Strength: <input type="range" id="mag-field" min="1" max="100" value="50"></label>
  </div>
</div>
<script>
(function(){
  const p = document.getElementById('am-particle');
  const mag = document.getElementById('mag-field');
  const bg = document.getElementById('trap-bg');
  let x=0, y=0, vx=0, vy=0;
  
  function update() {
    let instability = (100 - mag.value) / 10;
    vx += (Math.random()-0.5) * instability;
    vy += (Math.random()-0.5) * instability;
    
    // Magnetic pull to center
    let pull = mag.value / 500;
    vx -= x * pull; vy -= y * pull;
    
    x += vx; y += vy;
    p.style.transform = \`translate(\${x}px, \${y}px)\`;
    
    // Annihilation check
    let dist = Math.sqrt(x*x + y*y);
    if(dist > 140) {
      bg.style.background = '#fff';
      setTimeout(() => { bg.style.background = '#000'; x=0; y=0; vx=0; vy=0; }, 200);
    }
    requestAnimationFrame(update);
  }
  update();
})();
</script>
<!-- ANTIMATTER TRAP ENGINE END -->`,

  acousticcymatics: `<!-- ACOUSTIC CYMATICS ENGINE START -->
<div style="background:#1e293b; color:#f472b6; font-family:monospace; padding:20px; text-align:center; width:100%; min-width:300px; margin-top:20px; border-radius:12px;">
  <h3>🎶 CHLADNI RESONANCE PATTERNS</h3>
  <p>Frequency: <span id="freq-val">4</span> Hz</p>
  <input type="range" id="freq-slider" min="1" max="10" value="4" style="accent-color:#f472b6; width:200px; margin-bottom:20px;"><br>
  <canvas id="cymaticsCanvas" width="300" height="300" style="background:#0f172a; border-radius:50%; box-shadow:0 0 30px rgba(244,114,182,0.2);"></canvas>
</div>
<script>
(function(){
  const canvas = document.getElementById('cymaticsCanvas');
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('freq-slider');
  const valDisplay = document.getElementById('freq-val');
  
  function draw() {
    const freq = parseInt(slider.value);
    valDisplay.innerText = freq;
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = '#f472b6';
    
    // Chladni 2D wave equation simulation points
    for(let i=0; i<3000; i++) {
      let x = Math.random() * 300;
      let y = Math.random() * 300;
      let nx = (x/300) * Math.PI * freq;
      let ny = (y/300) * Math.PI * freq;
      
      let chladni = Math.cos(nx)*Math.cos(ny) - Math.sin(nx)*Math.sin(ny);
      // Particles gather where amplitude is near zero (nodes)
      if(Math.abs(chladni) < 0.1) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }
  slider.addEventListener('input', draw);
  draw();
})();
</script>
<!-- ACOUSTIC CYMATICS ENGINE END -->`
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
    ['crisprsplicer','dysonsphere','microbotswarm','antimattertrap','acousticcymatics'].forEach(id => {
      var el = document.getElementById('lbl-tab-'+id);
      if(el) el.textContent = t('tabs', id);
    });
    if(['crisprsplicer','dysonsphere','microbotswarm','antimattertrap','acousticcymatics'].includes(window.activeTab)) {
      renderPanel(window.activeTab);
    }
  };
  
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(['crisprsplicer','dysonsphere','microbotswarm','antimattertrap','acousticcymatics'].includes(tab)) {
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
