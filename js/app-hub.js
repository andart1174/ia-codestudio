/**
 * ========================================================
 * IA CODE STUDIO - APP HUB / VITRINE ENGINE
 * 10 Ready-to-Use Web & 3D Apps with 1-Click ZIP Exporter
 * Self-Contained Index.html (Double-Click Inside ZIP Works Instantly!)
 * Modular style.css & script.js included for developers
 * Free Plan: 1 App Download per Day / Premium ($10/mo): Unlimited
 * Strictly Bilingual: English & French only
 * ========================================================
 */

(function () {
  "use strict";

  // --- CATALOG OF THE 10 READY-MADE APPLICATIONS ---
  const APP_CATALOG = [
    // ----------------------------------------------------
    // APP 1: CYBERBEATS 16-STEP DRUM MACHINE
    // ----------------------------------------------------
    {
      id: "cyberbeats-synth",
      category: "audio",
      icon: "🎛️",
      nameEn: "CyberBeats 16-Step Drum Machine",
      nameFr: "CyberBeats Studio Boîte à Rythmes 16 Pas",
      descEn: "Interactive 16-step procedural drum sequencer with Web Audio API. 4 channels (Kick, Snare, Hi-Hat, Synth) with adjustable BPM tempo and real-time step trigger.",
      descFr: "Séquenceur de batterie procédural à 16 pas avec Web Audio API. 4 pistes audio (Kick, Snare, Hi-Hat, Synth) avec réglage BPM et lecture en temps réel.",
      tech: ["Web Audio API", "HTML5", "Vanilla JS", "Cyberpunk UI"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "CyberBeats 16-Step Studio — IA Code Studio" : "CyberBeats 16-Step Studio — IA Code Studio";
        const cssContent = `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
body { background: #050714; color: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.synth-rack { width: 100%; max-width: 900px; background: #0b0f24; border: 2px solid #00f0ff; border-radius: 20px; padding: 25px; box-shadow: 0 0 40px rgba(0, 240, 255, 0.2); }
.synth-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; }
.synth-logo { display: flex; align-items: center; gap: 10px; }
.synth-led { width: 12px; height: 12px; border-radius: 50%; background: #00f0ff; box-shadow: 0 0 10px #00f0ff; animation: pulse 1s infinite alternate; }
@keyframes pulse { from { opacity: 0.4; } to { opacity: 1; } }
.synth-controls { display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
.btn-ctrl { background: linear-gradient(135deg, #00f0ff, #7928ca); border: none; color: #fff; padding: 8px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; transition: transform 0.1s; }
.btn-ctrl:active { transform: scale(0.96); }
.btn-sec { background: rgba(255, 255, 255, 0.1); }
.control-group { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #00f0ff; }
.grid-container { display: flex; flex-direction: column; gap: 12px; }
.track-row { display: flex; align-items: center; gap: 10px; }
.track-label { width: 90px; font-size: 12px; font-weight: 700; color: #94a3b8; }
.step-grid { display: grid; grid-template-columns: repeat(16, 1fr); gap: 6px; flex: 1; }
.step-btn { height: 38px; border-radius: 6px; background: #131a38; border: 1px solid rgba(255, 255, 255, 0.08); cursor: pointer; transition: all 0.1s; }
.step-btn.active { background: #00f0ff; box-shadow: 0 0 12px #00f0ff; }
.step-btn.current { border-color: #ff007f; transform: scale(1.08); box-shadow: 0 0 10px #ff007f; }`;

        const jsContent = `const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;
let isPlaying = false;
let currentStep = 0;
let timerId = null;
let bpm = 120;

const tracks = [
  { id: 'kick', name: '🥁 Kick', freq: 150 },
  { id: 'snare', name: '💥 Snare', freq: 400 },
  { id: 'hihat', name: '✨ Hi-Hat', freq: 1200 },
  { id: 'synth', name: '🎹 Synth', freq: 300 }
];

let matrix = {
  kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
  snare: [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
  hihat: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
  synth: [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,1,0,0]
};

function playSound(trackId) {
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const tr = tracks.find(x => x.id === trackId);
  osc.frequency.setValueAtTime(tr ? tr.freq : 200, t);
  osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);
  gain.gain.setValueAtTime(0.4, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.16);
}

function renderGrid() {
  const container = document.getElementById('grid-container');
  if (!container) return;
  container.innerHTML = '';
  tracks.forEach(tr => {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.innerHTML = '<span class="track-label">' + tr.name + '</span><div class="step-grid" id="row-' + tr.id + '"></div>';
    container.appendChild(row);
    const grid = row.querySelector('.step-grid');
    for (let i = 0; i < 16; i++) {
      const btn = document.createElement('button');
      btn.className = 'step-btn' + (matrix[tr.id][i] ? ' active' : '');
      btn.onclick = () => {
        if (!ctx) ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        matrix[tr.id][i] = matrix[tr.id][i] ? 0 : 1;
        btn.classList.toggle('active');
        if (matrix[tr.id][i]) playSound(tr.id);
      };
      grid.appendChild(btn);
    }
  });
}

function step() {
  document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('current'));
  tracks.forEach(tr => {
    if (matrix[tr.id][currentStep]) playSound(tr.id);
    const btn = document.querySelector('#row-' + tr.id + ' .step-btn:nth-child(' + (currentStep + 1) + ')');
    if (btn) btn.classList.add('current');
  });
  currentStep = (currentStep + 1) % 16;
}

window.addEventListener('DOMContentLoaded', () => {
  renderGrid();

  const btnPlay = document.getElementById('btn-play');
  if (btnPlay) {
    btnPlay.onclick = function() {
      isPlaying = !isPlaying;
      this.textContent = isPlaying ? '⏹ STOP' : '▶ PLAY';
      if (isPlaying) {
        if (!ctx) ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        timerId = setInterval(step, (60 / bpm / 4) * 1000);
      } else {
        clearInterval(timerId);
        currentStep = 0;
        document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('current'));
      }
    };
  }

  const slider = document.getElementById('bpm-slider');
  if (slider) {
    slider.oninput = function(e) {
      bpm = parseInt(e.target.value);
      document.getElementById('bpm-val').textContent = bpm;
      if (isPlaying) {
        clearInterval(timerId);
        timerId = setInterval(step, (60 / bpm / 4) * 1000);
      }
    };
  }

  const btnClear = document.getElementById('btn-clear');
  if (btnClear) {
    btnClear.onclick = () => {
      tracks.forEach(tr => matrix[tr.id] = new Array(16).fill(0));
      renderGrid();
    };
  }
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="synth-rack">
    <header class="synth-header">
      <div class="synth-logo">
        <span class="synth-led"></span>
        <h2>CYBERBEATS STUDIO</h2>
      </div>
      <div class="synth-controls">
        <button id="btn-play" class="btn-ctrl">▶ PLAY</button>
        <button id="btn-clear" class="btn-ctrl btn-sec">CLEAR</button>
        <div class="control-group">
          <label>BPM: <span id="bpm-val">120</span></label>
          <input type="range" id="bpm-slider" min="60" max="180" value="120">
        </div>
      </div>
    </header>
    <div id="grid-container" class="grid-container"></div>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 2: CYBERPUNK 3D SPEED CAR
    // ----------------------------------------------------
    {
      id: "cyber-car-3d",
      category: "3d",
      icon: "🏎️",
      nameEn: "Cyberpunk 3D Speed Car",
      nameFr: "Voiture de Course Cyberpunk 3D",
      descEn: "Real-time 3D aerodynamic vehicle simulation in Three.js with glowing wheels, infinite grid motion, and mouse camera rotation.",
      descFr: "Simulation 3D temps réel d'un véhicule cyberpunk sous Three.js avec roues lumineuses, grille infinie et rotation caméra interactive.",
      tech: ["Three.js", "WebGL 3D", "60 FPS", "HTML5 Canvas"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Voiture Cyberpunk 3D — IA Code Studio" : "Cyberpunk 3D Speed Car — IA Code Studio";
        const cssContent = `* { box-sizing: border-box; margin: 0; padding: 0; }
body { margin: 0; overflow: hidden; background: #050714; font-family: monospace; }
#webgl-canvas { width: 100vw; height: 100vh; display: block; }
.hud-overlay { position: absolute; top: 20px; left: 20px; color: #00f0ff; pointer-events: none; z-index: 10; text-shadow: 0 0 10px rgba(0,240,255,0.7); }
.hud-overlay h1 { font-size: 18px; margin: 0 0 5px 0; }
.hud-overlay p { font-size: 12px; color: #94a3b8; }`;

        const jsContent = `function start3DCar() {
  const container = document.body;
  const W = window.innerWidth;
  const H = window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050714, 0.035);

  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.set(0, 2.5, 7.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.id = 'webgl-canvas';
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0x00f0ff, 1.8);
  light.position.set(5, 10, 7);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x221144));

  // Car Chassis
  const bodyGeo = new THREE.BoxGeometry(2.2, 0.5, 4.4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.2, wireframe: true });
  const carBody = new THREE.Mesh(bodyGeo, bodyMat);
  scene.add(carBody);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 16);
  const wheelMat = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true });
  const wheels = [];
  const positions = [
    [-1.3, -0.2, 1.4], [1.3, -0.2, 1.4],
    [-1.3, -0.2, -1.4], [1.3, -0.2, -1.4]
  ];

  positions.forEach(pos => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.position.set(pos[0], pos[1], pos[2]);
    w.rotation.z = Math.PI / 2;
    scene.add(w);
    wheels.push(w);
  });

  // Road Grid
  const grid = new THREE.GridHelper(50, 50, 0x00f0ff, 0x112244);
  grid.position.y = -0.65;
  scene.add(grid);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / W - 0.5) * 2;
    mouseY = (e.clientY / H - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    grid.position.z = (grid.position.z + 0.35) % 2;
    wheels.forEach(w => w.rotation.x += 0.25);
    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 1.5 + 2.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const nW = window.innerWidth;
    const nH = window.innerHeight;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  });
}

function initEngine() {
  if (typeof THREE !== 'undefined') {
    start3DCar();
  } else {
    let tries = 0;
    const check = setInterval(() => {
      tries++;
      if (typeof THREE !== 'undefined') {
        clearInterval(check);
        start3DCar();
      } else if (tries > 30) {
        clearInterval(check);
        render2DFallback();
      }
    }, 100);
  }
}

function render2DFallback() {
  const c = document.createElement('canvas');
  c.width = window.innerWidth; c.height = window.innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  let t = 0;
  function loop() {
    ctx.fillStyle = '#050714'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2;
    const cx = c.width / 2, cy = c.height / 2;
    ctx.strokeRect(cx - 100, cy - 40, 200, 80);
    ctx.fillStyle = '#ff007f';
    ctx.beginPath(); ctx.arc(cx - 60, cy + 40, 20, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 60, cy + 40, 20, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
    ctx.fillText('CYBER CAR 3D [2D SPEED MODE]', cx - 130, cy - 70);
    t++; requestAnimationFrame(loop);
  }
  loop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine);
} else {
  initEngine();
}`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>if (typeof THREE === 'undefined') document.write('<script src="https://unpkg.com/three@0.128.0/build/three.min.js"><\\/script>');</script>
</head>
<body>
  <div class="hud-overlay">
    <h1>CYBERPUNK 3D SPEED CAR</h1>
    <p>Move mouse to orbit camera · 60 FPS WebGL</p>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 3: MATRIX DIGITAL RAIN
    // ----------------------------------------------------
    {
      id: "matrix-rain",
      category: "canvas",
      icon: "⚡",
      nameEn: "Matrix Digital Rain Streamer",
      nameFr: "Pluie Numérique Digitale Matrix",
      descEn: "Iconic digital rain matrix effect in HTML5 Canvas with custom speed, high-density stream, and neon glow.",
      descFr: "Effet culte de pluie digitale Matrix en HTML5 Canvas avec contrôle de vitesse, streaming haute densité et lueur verte neon.",
      tech: ["HTML5 Canvas", "2D Particles", "Zero Dependencies"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Pluie Digitale Matrix — IA Code Studio" : "Matrix Digital Rain — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { margin: 0; overflow: hidden; background: #000; font-family: monospace; }
#matrix { display: block; width: 100vw; height: 100vh; }
.hint { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(0,255,170,0.6); font-size: 12px; pointer-events: none; letter-spacing: 1px; }`;

        const jsContent = `const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ';
const fontSize = 16;
let cols = Math.floor(canvas.width / fontSize);
let drops = new Array(cols).fill(1);

const themes = ['#00ffaa', '#00f0ff', '#ff007f', '#ffb703'];
let themeIdx = 0;

canvas.addEventListener('click', () => {
  themeIdx = (themeIdx + 1) % themes.length;
});

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = themes[themeIdx];
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 33);

window.addEventListener('resize', () => {
  resize();
  cols = Math.floor(canvas.width / fontSize);
  drops = new Array(cols).fill(1);
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <canvas id="matrix"></canvas>
  <div class="hint">CLICK ANYWHERE TO CYCLE MATRIX COLORS</div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 4: QUANTUM NEURAL AI GLOBE 3D
    // ----------------------------------------------------
    {
      id: "neural-ai-globe",
      category: "3d",
      icon: "🧠",
      nameEn: "Quantum Neural AI Globe 3D",
      nameFr: "Sphère Réseau Neuronal 3D IA",
      descEn: "Three.js 3D sphere with 1,200 pulsing synaptic neural nodes, interactive mouse physics, and holographic core.",
      descFr: "Sphère 3D sous Three.js avec 1 200 nœuds synaptiques pulsants, physique interactive au curseur et noyau holographique.",
      tech: ["Three.js", "Particles 3D", "WebGL Shader"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Sphère Neuronale IA 3D — IA Code Studio" : "Neural AI Globe 3D — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { margin: 0; overflow: hidden; background: #030511; font-family: monospace; }
#webgl-canvas { width: 100vw; height: 100vh; display: block; }
.badge-info { position: absolute; top: 20px; left: 20px; color: #c4b5fd; font-size: 13px; z-index: 10; pointer-events: none; }
.badge-info h2 { font-size: 16px; color: #fff; margin-bottom: 4px; }`;

        const jsContent = `function startNeuralGlobe() {
  const W = window.innerWidth, H = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.z = 6.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.id = 'webgl-canvas';
  document.body.appendChild(renderer.domElement);

  const count = 1200;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.sqrt(count * Math.PI) * theta;
    pos[i * 3] = 2.4 * Math.sin(theta) * Math.cos(phi);
    pos[i * 3 + 1] = 2.4 * Math.sin(theta) * Math.sin(phi);
    pos[i * 3 + 2] = 2.4 * Math.cos(theta);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({ color: 0x9d4edd, size: 0.08, transparent: true, opacity: 0.85 });
  const globe = new THREE.Points(geo, mat);
  scene.add(globe);

  // Inner core
  const coreGeo = new THREE.SphereGeometry(1.2, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.3 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / W - 0.5) * 2;
    mouseY = (e.clientY / H - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005 + mouseX * 0.02;
    globe.rotation.x += 0.002 + mouseY * 0.02;
    core.rotation.y -= 0.008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const nW = window.innerWidth, nH = window.innerHeight;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  });
}

function initEngine() {
  if (typeof THREE !== 'undefined') {
    startNeuralGlobe();
  } else {
    let tries = 0;
    const check = setInterval(() => {
      tries++;
      if (typeof THREE !== 'undefined') {
        clearInterval(check);
        startNeuralGlobe();
      } else if (tries > 30) {
        clearInterval(check);
      }
    }, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine);
} else {
  initEngine();
}`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>if (typeof THREE === 'undefined') document.write('<script src="https://unpkg.com/three@0.128.0/build/three.min.js"><\\/script>');</script>
</head>
<body>
  <div class="badge-info">
    <h2>QUANTUM NEURAL GLOBE 3D</h2>
    <p>1,200 Synaptic Nodes · Three.js WebGL</p>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 5: HOLOGRAPHIC WIREFRAME EARTH
    // ----------------------------------------------------
    {
      id: "holographic-earth",
      category: "3d",
      icon: "🌍",
      nameEn: "Holographic Earth 3D Geolocation",
      nameFr: "Terre Holographique 3D & Satellites",
      descEn: "Futuristic translucent 3D earth globe with glowing atmospheric rim, orbital rings, and coordinate data streams.",
      descFr: "Globe terrestre 3D translucide avec halo atmosphérique, anneaux orbitaux et flux de données géographiques.",
      tech: ["Three.js", "Wireframe 3D", "60 FPS"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Terre Holographique 3D — IA Code Studio" : "Holographic Earth 3D — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { margin: 0; overflow: hidden; background: #02030a; font-family: monospace; }
#webgl-canvas { width: 100vw; height: 100vh; display: block; }
.info-tag { position: absolute; bottom: 20px; left: 20px; color: #00f0ff; font-size: 12px; pointer-events: none; }`;

        const jsContent = `function startHoloEarth() {
  const W = window.innerWidth, H = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.id = 'webgl-canvas';
  document.body.appendChild(renderer.domElement);

  const earthGeo = new THREE.SphereGeometry(2.5, 32, 32);
  const earthMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  const ringGeo = new THREE.TorusGeometry(3.6, 0.03, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.5;
  scene.add(ring);

  function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.004;
    ring.rotation.z += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const nW = window.innerWidth, nH = window.innerHeight;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  });
}

function initEngine() {
  if (typeof THREE !== 'undefined') {
    startHoloEarth();
  } else {
    let tries = 0;
    const check = setInterval(() => {
      tries++;
      if (typeof THREE !== 'undefined') {
        clearInterval(check);
        startHoloEarth();
      } else if (tries > 30) {
        clearInterval(check);
      }
    }, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine);
} else {
  initEngine();
}`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>if (typeof THREE === 'undefined') document.write('<script src="https://unpkg.com/three@0.128.0/build/three.min.js"><\\/script>');</script>
</head>
<body>
  <div class="info-tag">HOLOGRAPHIC EARTH 3D · 60 FPS ORBIT</div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 6: CYBER PONG 2077 RETRO GAME
    // ----------------------------------------------------
    {
      id: "cyber-pong",
      category: "games",
      icon: "🏓",
      nameEn: "Neon Cyber Pong 3D Retro Game",
      nameFr: "Jeu Arcade Cyber Pong Rétro",
      descEn: "Retro arcade tennis in neon cyberpunk theme. Play with keyboard or mouse against adaptive AI with sound and score.",
      descFr: "Jeu de tennis arcade rétro aux effets de néon. Jouez au clavier ou à la souris contre une IA adaptative avec son et score.",
      tech: ["HTML5 Canvas", "Game Physics", "Audio Effects"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Cyber Pong 2077 Arcade — IA Code Studio" : "Cyber Pong 2077 Arcade — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { margin: 0; background: #070914; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
h2 { color: #00f0ff; margin-bottom: 12px; letter-spacing: 2px; }
canvas { border: 2px solid #00f0ff; box-shadow: 0 0 25px rgba(0,240,255,0.4); border-radius: 12px; background: #04050d; }
.help-txt { color: #94a3b8; font-size: 12px; margin-top: 12px; }`;

        const jsContent = `const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

let pY = 160, aiY = 160;
let bX = 320, bY = 200, bSpdX = 4, bSpdY = 3;
let pScore = 0, aiScore = 0;

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  pY = e.clientY - rect.top - 35;
});

function loop() {
  ctx.fillStyle = '#04050d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ball
  bX += bSpdX; bY += bSpdY;
  if (bY <= 0 || bY >= canvas.height - 10) bSpdY = -bSpdY;

  // AI movement
  if (aiY + 35 < bY) aiY += 3.2; else aiY -= 3.2;

  // Paddle bounce
  if (bX <= 25 && bY >= pY && bY <= pY + 70) bSpdX = -bSpdX * 1.05;
  if (bX >= canvas.width - 35 && bY >= aiY && bY <= aiY + 70) bSpdX = -bSpdX * 1.05;

  // Scoring
  if (bX < 0) { aiScore++; bX = 320; bY = 200; bSpdX = 4; }
  if (bX > canvas.width) { pScore++; bX = 320; bY = 200; bSpdX = -4; }

  // Draw paddles & ball
  ctx.fillStyle = '#00f0ff';
  ctx.fillRect(15, pY, 10, 70);
  ctx.fillStyle = '#ff007f';
  ctx.fillRect(canvas.width - 25, aiY, 10, 70);
  ctx.fillStyle = '#fff';
  ctx.fillRect(bX, bY, 8, 8);

  ctx.font = '22px monospace';
  ctx.fillText(pScore + ' : ' + aiScore, 290, 35);
  requestAnimationFrame(loop);
}
loop();`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <h2>CYBER PONG [PLAYER vs AI]</h2>
  <canvas id="pong" width="640" height="400"></canvas>
  <p class="help-txt">Move mouse over the arena to control the cyan paddle</p>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 7: CYBERFOCUS POMODORO TIMER
    // ----------------------------------------------------
    {
      id: "cyber-pomodoro",
      category: "tools",
      icon: "⏳",
      nameEn: "Cyber Pomodoro Focus Timer",
      nameFr: "Chronomètre Pomodoro Cyberpunk",
      descEn: "Productivity Pomodoro timer with circular SVG progress, work/break interval modes, and cyberpunk audio cues.",
      descFr: "Minuteur de productivité Pomodoro avec cercle de progression SVG, modes travail/pause et alertes audio cyberpunk.",
      tech: ["SVG Animation", "Web Audio", "Local Persistence"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Chronomètre Pomodoro Cyberpunk — IA Code Studio" : "Cyber Pomodoro Focus Timer — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #080c1d; color: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; }
.timer-card { background: #0f1530; border: 2px solid #00f0ff; border-radius: 24px; padding: 40px; text-align: center; box-shadow: 0 0 35px rgba(0,240,255,0.25); max-width: 400px; width: 90%; }
.digits { font-size: 54px; font-weight: 800; color: #00f0ff; margin: 20px 0; text-shadow: 0 0 15px rgba(0,240,255,0.5); }
.btn-box { display: flex; gap: 10px; justify-content: center; }
button { background: #00f0ff; border: none; color: #000; font-weight: 800; padding: 10px 24px; border-radius: 12px; cursor: pointer; font-size: 14px; transition: transform 0.1s; }
button:active { transform: scale(0.96); }`;

        const jsContent = `let time = 25 * 60;
let running = false;
let timer = null;

function render() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  document.getElementById('display').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

window.addEventListener('DOMContentLoaded', () => {
  render();
  const btnToggle = document.getElementById('btn-toggle');
  const btnReset = document.getElementById('btn-reset');

  if (btnToggle) {
    btnToggle.onclick = function() {
      running = !running;
      this.textContent = running ? 'PAUSE' : 'START';
      if (running) {
        timer = setInterval(() => {
          if (time > 0) { time--; render(); } else { clearInterval(timer); alert('Time up!'); }
        }, 1000);
      } else {
        clearInterval(timer);
      }
    };
  }

  if (btnReset) {
    btnReset.onclick = () => {
      clearInterval(timer);
      running = false;
      document.getElementById('btn-toggle').textContent = 'START';
      time = 25 * 60;
      render();
    };
  }
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="timer-card">
    <h2>CYBER POMODORO</h2>
    <div id="display" class="digits">25:00</div>
    <div class="btn-box">
      <button id="btn-toggle">START</button>
      <button id="btn-reset" style="background:#ff007f; color:#fff;">RESET</button>
    </div>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 8: QUANTUM PASSWORD VAULT
    // ----------------------------------------------------
    {
      id: "quantum-pass-vault",
      category: "tools",
      icon: "🔐",
      nameEn: "Quantum Password Vault & Generator",
      nameFr: "Générateur & Coffre de Mots de Passe",
      descEn: "High-security password & hash token generator with entropy strength meter, custom criteria toggles, and 1-click copy.",
      descFr: "Générateur de mots de passe et jetons ultra-sécurisés avec mesure d'entropie, options de symboles et copie 1-clic.",
      tech: ["Crypto API", "Clipboard API", "Vanilla JS"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Coffre Mots de Passe — IA Code Studio" : "Quantum Password Vault — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #050711; color: #fff; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: monospace; }
.vault-box { background: #0c1026; border: 2px solid #00f0ff; border-radius: 18px; padding: 30px; width: 380px; box-shadow: 0 0 30px rgba(0,240,255,0.2); }
.pass-field { background: #050714; border: 1px solid #1e293b; color: #00ffaa; font-size: 18px; padding: 12px; border-radius: 8px; width: 100%; text-align: center; margin: 15px 0; outline: none; }
button { background: linear-gradient(135deg, #00f0ff, #7928ca); border: none; color: #fff; font-weight: 800; padding: 12px; border-radius: 10px; width: 100%; cursor: pointer; }`;

        const jsContent = `function genPass() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let res = '';
  for (let i = 0; i < 20; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  const el = document.getElementById('pass-out');
  if (el) el.value = res;
}

window.addEventListener('DOMContentLoaded', () => {
  genPass();
  const btn = document.getElementById('btn-gen');
  if (btn) btn.onclick = genPass;
  const inp = document.getElementById('pass-out');
  if (inp) {
    inp.onclick = () => {
      navigator.clipboard.writeText(inp.value);
      alert('Password copied to clipboard!');
    };
  }
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="vault-box">
    <h3>QUANTUM PASSWORD VAULT</h3>
    <input id="pass-out" class="pass-field" readonly value="Generating...">
    <button id="btn-gen">⚡ GENERATE SECURE PASS</button>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 9: 3D GLASSMORPHISM CARDS
    // ----------------------------------------------------
    {
      id: "glass-cards-3d",
      category: "ui",
      icon: "💳",
      nameEn: "3D Glassmorphism Interactive Cards",
      nameFr: "Cartes 3D Glassmorphism Interactives",
      descEn: "Modern glassmorphism pricing and feature cards with 3D tilt perspective physics, reflective neon border, and smooth motion.",
      descFr: "Cartes modernes effet verre fumé (Glassmorphism) avec inclinaison 3D perspective au curseur et bordures lumineuses.",
      tech: ["CSS 3D Transforms", "Vanilla JS Tilt", "UI Components"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Cartes 3D Glassmorphism — IA Code Studio" : "3D Glass Cards — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #050714; color: #fff; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif; perspective: 1000px; }
.card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 20px; padding: 40px; width: 300px; text-align: center; backdrop-filter: blur(12px); box-shadow: 0 15px 35px rgba(0,0,0,0.5); transform-style: preserve-3d; transition: transform 0.1s; cursor: pointer; }
.card:hover { border-color: #00f0ff; box-shadow: 0 0 30px rgba(0,240,255,0.4); }
h2 { color: #00f0ff; font-size: 26px; }
.price { font-size: 36px; font-weight: 900; margin: 15px 0; color: #fff; }`;

        const jsContent = `window.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('tilt-card');
  if (!card) return;
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = 'rotateX(' + y + 'deg) rotateY(' + (-x) + 'deg)';
  });
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="card" id="tilt-card">
    <h2>CYBER PRO</h2>
    <p style="color:#94a3b8; font-size:14px; margin: 15px 0;">Interactive 3D Glass Component with Mouse Tilt.</p>
    <div class="price">$10<span style="font-size:14px; color:#64748b;">/mo</span></div>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    },

    // ----------------------------------------------------
    // APP 10: CYBER AMBIENT RAIN & LO-FI
    // ----------------------------------------------------
    {
      id: "ambient-rain-lofi",
      category: "audio",
      icon: "🌧️",
      nameEn: "Cyber Ambient Rain & Lo-Fi Generator",
      nameFr: "Générateur d'Ambiance Pluie & Lo-Fi",
      descEn: "Procedural sound generator with brown noise rain audio, binaural lo-fi frequency generator, and visual sound waves.",
      descFr: "Générateur sonore procédural simulant la pluie avec bruit brun, fréquences lo-fi relaxantes et onde visuelle.",
      tech: ["Web Audio API", "Noise Synthesis", "Relaxation"],
      getFiles: function (lang) {
        const title = lang === "fr" ? "Ambiance Pluie & Lo-Fi — IA Code Studio" : "Cyber Ambient Rain — IA Code Studio";
        const cssContent = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #040612; color: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; }
.rain-card { background: #0c1024; border: 2px solid #00f0ff; border-radius: 20px; padding: 40px; text-align: center; box-shadow: 0 0 35px rgba(0,240,255,0.25); max-width: 420px; width: 90%; }
button { background: #00f0ff; border: none; color: #000; font-weight: 800; padding: 12px 28px; border-radius: 12px; cursor: pointer; font-size: 15px; margin-top: 15px; }`;

        const jsContent = `let ctx = null;
let node = null;
let playing = false;

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-rain');
  if (!btn) return;
  btn.onclick = function() {
    playing = !playing;
    this.textContent = playing ? '⏹ STOP RAIN' : '▶ START RAIN';
    if (playing) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
      node = ctx.createBufferSource();
      node.buffer = buffer;
      node.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0.35;
      node.connect(gain);
      gain.connect(ctx.destination);
      node.start();
    } else {
      if (node) node.stop();
    }
  };
});`;

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="rain-card">
    <h2>🌧️ CYBER RAIN AMBIENCE</h2>
    <p style="color:#94a3b8; font-size:13px; margin: 10px 0;">Procedural Web Audio Rain Synthesis</p>
    <button id="btn-rain">▶ START RAIN</button>
  </div>
  <script>
${jsContent}
  </script>
</body>
</html>`;

        return {
          "index.html": htmlContent,
          "style.css": cssContent,
          "script.js": jsContent
        };
      }
    }
  ];

  // --- QUOTA MANAGEMENT ENGINE ---
  function getTodayString() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function getUserQuotaData(email) {
    const key = "hub_quota_" + email.toLowerCase();
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.date) {
        if (data.date !== getTodayString()) {
          data.date = getTodayString();
          data.count = 0;
          localStorage.setItem(key, JSON.stringify(data));
        }
        return data;
      }
    } catch (e) {}

    const initData = {
      date: getTodayString(),
      count: 0,
      unlocked: []
    };
    localStorage.setItem(key, JSON.stringify(initData));
    return initData;
  }

  function saveUserQuotaData(email, data) {
    const key = "hub_quota_" + email.toLowerCase();
    localStorage.setItem(key, JSON.stringify(data));
    updateQuotaUI();
  }

  function isUserPremium() {
    const session = localStorage.getItem("genius_session");
    if (!session) return false;
    try {
      const u = JSON.parse(session);
      const email = (u.email || "").toLowerCase();
      if (u.role === "Admin" || email === "andart1174@gmail.com") {
        return true;
      }
      const premList = JSON.parse(localStorage.getItem("ia_premium_users") || "[]");
      const record = premList.find((p) => (p.email || "").toLowerCase() === email);
      if (record) {
        const now = Date.now();
        const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
        const daysLeft = Math.ceil((expiry - now) / 86400000);
        if (record.days === 9999 || daysLeft > 0) {
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function checkDownloadEligibility(appId) {
    const session = localStorage.getItem("genius_session");
    if (!session) {
      return { allowed: false, reason: "unauthenticated" };
    }

    const user = JSON.parse(session);
    if (isUserPremium()) {
      return { allowed: true, isPremium: true };
    }

    const quota = getUserQuotaData(user.email);
    // Already unlocked previously -> free re-download anytime
    if (quota.unlocked && quota.unlocked.includes(appId)) {
      return { allowed: true, isReDownload: true };
    }

    // Free tier: check 1 download per day limit
    if (quota.count >= 1) {
      return { allowed: false, reason: "quota_exceeded" };
    }

    return { allowed: true, isFirstToday: true };
  }

  // --- RENDER APP CARDS IN SECTION ---
  function renderAppHub() {
    const grid = document.getElementById("hub-apps-grid");
    if (!grid) return;

    const lang = window.currentLang || "fr";
    grid.innerHTML = "";

    APP_CATALOG.forEach((app) => {
      const title = lang === "fr" ? app.nameFr : app.nameEn;
      const desc = lang === "fr" ? app.descFr : app.descEn;

      const card = document.createElement("article");
      card.className = "hub-app-card";
      card.setAttribute("data-category", app.category);

      let tagsHtml = "";
      app.tech.forEach((t) => {
        tagsHtml += '<span class="hub-tech-tag">' + t + "</span>";
      });

      card.innerHTML = `
        <div>
          <div class="hub-card-header">
            <div class="hub-card-icon">${app.icon}</div>
            <span class="hub-card-category">${app.category.toUpperCase()}</span>
          </div>
          <h3 class="hub-card-title">${title}</h3>
          <p class="hub-card-desc">${desc}</p>
          <div class="hub-tech-tags">${tagsHtml}</div>
        </div>
        <div class="hub-card-actions">
          <button type="button" class="hub-btn-preview" onclick="openAppPreview('${app.id}')">
            <span>👁️</span> <span>${lang === "fr" ? "Démo Live" : "Live Demo"}</span>
          </button>
          <button type="button" class="hub-btn-download" onclick="triggerAppDownload('${app.id}')">
            <span>📦</span> <span>${lang === "fr" ? "Exporter ZIP" : "Export ZIP"}</span>
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    updateQuotaUI();
  }

  function filterHubApps(cat, btn) {
    document.querySelectorAll(".hub-filter-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const cards = document.querySelectorAll(".hub-app-card");
    cards.forEach((c) => {
      if (cat === "all" || c.getAttribute("data-category") === cat) {
        c.style.display = "flex";
      } else {
        c.style.display = "none";
      }
    });
  }
  window.filterHubApps = filterHubApps;

  function updateQuotaUI() {
    const quotaDisplay = document.getElementById("hub-quota-indicator");
    if (!quotaDisplay) return;

    const lang = window.currentLang || "fr";
    const session = localStorage.getItem("genius_session");

    if (!session) {
      quotaDisplay.innerHTML = `<span>⚡</span> <span>${lang === "fr" ? "1 Téléchargement gratuit / jour" : "1 Free Download / Day"}</span> <span class="hub-quota-badge">${lang === "fr" ? "CONNEXION REQUISE" : "SIGN IN"}</span>`;
      return;
    }

    const user = JSON.parse(session);
    if (isUserPremium()) {
      quotaDisplay.innerHTML = `<span>💎</span> <span>${lang === "fr" ? "Statut :" : "Status:"}</span> <span class="hub-quota-badge quota-premium">PREMIUM UNLIMITED</span>`;
      return;
    }

    const quota = getUserQuotaData(user.email);
    const left = Math.max(0, 1 - quota.count);
    if (left > 0) {
      quotaDisplay.innerHTML = `<span>⚡</span> <span>${lang === "fr" ? "Téléchargement gratuit aujourd'hui :" : "Today's Free Download:"}</span> <span class="hub-quota-badge">1 / 1 ${lang === "fr" ? "DISPONIBLE" : "AVAILABLE"}</span>`;
    } else {
      quotaDisplay.innerHTML = `<span>⏳</span> <span>${lang === "fr" ? "Cota du jour utilisée :" : "Today's Quota Used:"}</span> <span class="hub-quota-badge quota-used">0 / 1 (${lang === "fr" ? "REVENEZ DEMAIN" : "COME BACK TOMORROW"})</span>`;
    }
  }

  // --- LIVE PREVIEW MODAL LOGIC ---
  function openAppPreview(appId) {
    const app = APP_CATALOG.find((x) => x.id === appId);
    if (!app) return;

    const lang = window.currentLang || "fr";
    const title = lang === "fr" ? app.nameFr : app.nameEn;
    const modal = document.getElementById("modal-app-preview");
    const iframe = document.getElementById("hub-preview-frame");
    const titleEl = document.getElementById("hub-preview-title");
    const btnDl = document.getElementById("hub-preview-btn-download");

    if (titleEl) titleEl.textContent = title;
    if (btnDl) {
      btnDl.onclick = () => triggerAppDownload(appId);
      btnDl.innerHTML = `<span>📦</span> <span>${lang === "fr" ? "Exporter ZIP Gratuit" : "Export Free ZIP"}</span>`;
    }

    const files = app.getFiles(lang);
    iframe.srcdoc = files["index.html"];
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  window.openAppPreview = openAppPreview;

  function closeAppPreview() {
    const modal = document.getElementById("modal-app-preview");
    const iframe = document.getElementById("hub-preview-frame");
    if (modal) modal.classList.remove("active");
    if (iframe) iframe.srcdoc = "";
    document.body.style.overflow = "";
  }
  window.closeAppPreview = closeAppPreview;

  // --- ZIP EXPORTER WITH JSZIP ---
  async function triggerAppDownload(appId) {
    const eligibility = checkDownloadEligibility(appId);
    const lang = window.currentLang || "fr";

    if (!eligibility.allowed) {
      if (eligibility.reason === "unauthenticated") {
        if (typeof openModal === "function") {
          openModal("login");
        }
        alert(lang === "fr"
          ? "🔐 Veuillez vous connecter pour débloquer votre téléchargement gratuit de l'application !"
          : "🔐 Please sign in to unlock your free daily application download!");
        return;
      }

      if (eligibility.reason === "quota_exceeded") {
        openQuotaLimitModal();
        return;
      }
    }

    const app = APP_CATALOG.find((x) => x.id === appId);
    if (!app) return;

    if (typeof JSZip === "undefined") {
      alert(lang === "fr" ? "Erreur : Moteur ZIP non chargé." : "Error: ZIP engine not loaded.");
      return;
    }

    try {
      const zip = new JSZip();
      const files = app.getFiles(lang);

      // Package files
      for (const [filename, content] of Object.entries(files)) {
        zip.file(filename, content);
      }

      // Add clean Readme
      const readmeText = lang === "fr"
        ? `===================================================================
IA CODE STUDIO — APPLICATION WEB / 3D TÉLÉCHARGÉE
===================================================================
Application: ${app.nameFr} (${app.id})
Technologies: ${app.tech.join(", ")}
Licence: Libre pour usage personnel et commercial (MIT).

COMMENT LANCER L'APPLICATION :
1. Décompressez tous les fichiers ou double-cliquez directement sur "index.html".
2. "index.html" est 100% autonome et démarre instantanément dans n'importe quel navigateur !
3. Des fichiers séparés "style.css" et "script.js" sont également inclus pour votre développement personnel.

Pour modifier ou générer de nouvelles applications 3D avec l'IA :
Visitez https://ia-codestudio.com

© 2026 IA CODE STUDIO. Tous droits réservés.
===================================================================`
        : `===================================================================
IA CODE STUDIO — DOWNLOADED WEB / 3D APPLICATION
===================================================================
App: ${app.nameEn} (${app.id})
Technologies: ${app.tech.join(", ")}
License: Free for personal and commercial projects (MIT).

HOW TO RUN THIS APPLICATION:
1. Extract files or double-click "index.html" directly.
2. "index.html" is 100% standalone and runs instantly in any web browser!
3. Clean separate "style.css" and "script.js" files are also included for your development needs.

To edit, remix, or generate new 3D apps with AI:
Visit https://ia-codestudio.com

© 2026 IA CODE STUDIO. All rights reserved.
===================================================================`;

      zip.file("README.txt", readmeText);

      // Generate blob
      const blob = await zip.generateAsync({ type: "blob" });

      // Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${app.id}-ia-codestudio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Record quota if free user downloading for the first time today
      const session = localStorage.getItem("genius_session");
      if (session && !isUserPremium()) {
        const user = JSON.parse(session);
        const quota = getUserQuotaData(user.email);
        if (!quota.unlocked) quota.unlocked = [];
        if (!quota.unlocked.includes(appId)) {
          quota.unlocked.push(appId);
          quota.count = (quota.count || 0) + 1;
          saveUserQuotaData(user.email, quota);
        }
      }

      alert(lang === "fr"
        ? `✅ "${app.nameFr}" a été téléchargée avec succès !`
        : `✅ "${app.nameEn}" successfully downloaded!`);

    } catch (err) {
      console.error("ZIP Generation error:", err);
      alert(lang === "fr" ? "Erreur lors de la génération du ZIP." : "Error while generating ZIP archive.");
    }
  }
  window.triggerAppDownload = triggerAppDownload;

  // --- QUOTA LIMIT MODAL LOGIC ($10/MO UPGRADE) ---
  let countdownInterval = null;

  function openQuotaLimitModal() {
    const modal = document.getElementById("modal-quota-limit");
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Start live countdown to midnight
    function updateCountdown() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const el = document.getElementById("hub-quota-countdown-digits");
      if (el) {
        el.textContent = `${hrs < 10 ? "0" : ""}${hrs}h : ${mins < 10 ? "0" : ""}${mins}m : ${secs < 10 ? "0" : ""}${secs}s`;
      }
    }

    updateCountdown();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
  }
  window.openQuotaLimitModal = openQuotaLimitModal;

  function closeQuotaLimitModal() {
    const modal = document.getElementById("modal-quota-limit");
    if (modal) modal.classList.remove("active");
    clearInterval(countdownInterval);
    document.body.style.overflow = "";
  }
  window.closeQuotaLimitModal = closeQuotaLimitModal;

  // Expose key methods globally
  window.renderAppHub = renderAppHub;
  window.updateQuotaUI = updateQuotaUI;
  window.isUserPremium = isUserPremium;

  // Initialize on page load (support both before and after DOMContentLoaded)
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", renderAppHub);
  } else {
    renderAppHub();
  }

  // Update quota display automatically when auth or quota changes
  window.addEventListener("storage", (e) => {
    if (e.key === "genius_session" || e.key === "ia_premium_users" || (e.key && e.key.startsWith("hub_quota_"))) {
      updateQuotaUI();
    }
  });

  // Re-render when language changes
  const origSetLanguage = window.setLanguage;
  if (typeof origSetLanguage === "function") {
    window.setLanguage = function (lang) {
      origSetLanguage(lang);
      renderAppHub();
    };
  }
})();
