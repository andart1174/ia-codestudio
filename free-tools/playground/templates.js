// Predefined presets (8 templates) for Live Sandbox Playground v2.0

window.playgroundTemplates = {
  cube: {
    html: `<!-- 3D Rotating Cube Preset -->
<div id="app-container">
  <div class="content-overlay">
    <h2>THREE.JS 3D CUBE</h2>
    <p>Drag to rotate &amp; scroll to zoom</p>
  </div>
  <div id="canvas-container"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #05050a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; height: 100vh; }
#app-container, #canvas-container { position: relative; width: 100%; height: 100%; }
.content-overlay { position: absolute; top: 24px; left: 24px; z-index: 10; pointer-events: none; }
.content-overlay h2 { font-size: 1.4rem; letter-spacing: 2px; color: #00f0ff; text-shadow: 0 0 12px rgba(0,240,255,0.5); }
.content-overlay p { font-size: 0.85rem; color: #94a3b8; margin-top: 4px; }`,
    js: `const container = document.getElementById('canvas-container');
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.14);
const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const pt = new THREE.PointLight(0x00f0ff, 2, 40);
pt.position.set(4, 4, 4);
scene.add(pt);
const geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
const cube = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.7 }));
cube.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x00f0ff })));
scene.add(cube);
const clock = new THREE.Clock();
console.log('Three.js 3D Cube ready!');
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  cube.rotation.set(t * 0.35, t * 0.5, 0);
  const s = 1 + Math.sin(t * 2) * 0.05;
  cube.scale.set(s, s, s);
  controls.update();
  renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});`
  },
  shader: {
    html: `<canvas id="plasma"></canvas>
<div class="hud"><h1>PLASMA WAVE</h1><p>Real-Time Canvas Field</p></div>`,
    css: `* { margin:0; padding:0; box-sizing:border-box; }
body { background:#04050c; overflow:hidden; height:100vh; font-family:system-ui,sans-serif; }
canvas { display:block; width:100vw; height:100vh; }
.hud { position:fixed; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; pointer-events:none; text-align:center; }
.hud h1 { font-size:clamp(2rem,6vw,4rem); font-weight:900; letter-spacing:4px; color:#fff; text-shadow:0 0 30px rgba(0,240,255,0.6); }
.hud p { color:#93c5fd; letter-spacing:2px; font-size:0.85rem; margin-top:8px; }`,
    js: `const c = document.getElementById('plasma');
const ctx = c.getContext('2d');
let w, h, t = 0;
function resize() { w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
console.log('Plasma Wave active');
function loop() {
  requestAnimationFrame(loop);
  t += 0.025;
  ctx.fillStyle = 'rgba(4,5,12,0.18)';
  ctx.fillRect(0, 0, w, h);
  for (let k = 0; k < 5; k++) {
    ctx.beginPath();
    ctx.strokeStyle = k % 2 ? 'rgba(0,240,255,0.65)' : 'rgba(236,72,153,0.55)';
    ctx.lineWidth = 2.2;
    for (let x = 0; x <= w; x += 12) {
      const y = h / 2 + Math.sin(x * 0.008 + t + k * 0.8) * (45 + k * 16) + Math.cos(x * 0.003 - t * 1.4) * 30;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
loop();`
  },
  particles: {
    html: `<canvas id="net"></canvas>`,
    css: `* { margin:0; padding:0; } body { background:#060812; overflow:hidden; height:100vh; }`,
    js: `const c = document.getElementById('net');
const ctx = c.getContext('2d');
let w = c.width = innerWidth, h = c.height = innerHeight;
const mouse = { x: w/2, y: h/2 };
addEventListener('resize', () => { w = c.width = innerWidth; h = c.height = innerHeight; });
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
const pts = Array.from({ length: 65 }, () => ({
  x: Math.random() * w, y: Math.random() * h,
  vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4
}));
console.log('Particle Network initialized:', pts.length, 'nodes');
function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = '#060812'; ctx.fillRect(0, 0, w, h);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 140) { p.x += (p.x - mouse.x) * 0.015; p.y += (p.y - mouse.y) * 0.015; }
    ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 120) {
        ctx.strokeStyle = 'rgba(0,240,255,' + (1 - d / 120) * 0.35 + ')';
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
    }
  }
}
draw();`
  },
  bento: {
    html: `<section class="bento">
  <div class="tile hero"><span>⚡ AI ENGINE</span><h2>Ship UI 10× Faster</h2><p>Responsive Bento grid built with pure CSS Grid &amp; glassmorphism.</p></div>
  <div class="tile stat"><strong>99.9%</strong><span>Uptime SLA</span></div>
  <div class="tile stat accent"><strong>60 FPS</strong><span>WebGL Engine</span></div>
  <div class="tile wide"><h3>Instant Code Export</h3><p>Copy clean, zero-dependency HTML &amp; CSS directly into your production app.</p></div>
</section>`,
    css: `* { box-sizing:border-box; margin:0; padding:0; }
body { background:#070913; color:#fff; font-family:system-ui,sans-serif; min-height:100vh; display:grid; place-items:center; padding:24px; }
.bento { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; max-width:760px; width:100%; }
.tile { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:24px; transition:transform .25s,border-color .25s; }
.tile:hover { transform:translateY(-4px); border-color:#00f0ff; }
.hero { grid-column:span 2; grid-row:span 2; background:linear-gradient(135deg,rgba(0,240,255,0.14),rgba(139,92,246,0.16)); display:flex; flex-direction:column; justify-content:flex-end; }
.hero span { font-size:11px; font-weight:800; color:#00f0ff; letter-spacing:1.5px; }
.hero h2 { font-size:2rem; margin:8px 0; }
.hero p, .wide p { color:#94a3b8; font-size:0.9rem; line-height:1.5; }
.stat { display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
.stat strong { font-size:2rem; color:#00f0ff; }
.stat.accent strong { color:#f472b6; }
.stat span { color:#94a3b8; font-size:0.8rem; margin-top:4px; }
.wide { grid-column:span 3; }
@media (max-width:600px) { .bento { grid-template-columns:1fr; } .hero, .wide { grid-column:span 1; } }`,
    js: `console.log('Bento SaaS layout rendered');`
  },
  matrix: {
    html: `<div class="matrix-overlay">
  <h1>SYSTEM STATUS: SECURE</h1>
  <p>Matrix Digital Rain Canvas Effect</p>
</div>
<canvas id="matrix-canvas"></canvas>`,
    css: `* { margin:0; padding:0; box-sizing:border-box; }
body { background:#000; overflow:hidden; color:#0f0; font-family:monospace; }
#matrix-canvas { position:absolute; inset:0; width:100vw; height:100vh; z-index:1; }
.matrix-overlay { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10; pointer-events:none; background:rgba(0,0,0,0.65); padding:2rem 2.5rem; border-radius:12px; border:1px solid rgba(0,255,0,0.25); backdrop-filter:blur(4px); }
.matrix-overlay h1 { font-size:1.6rem; letter-spacing:3px; text-shadow:0 0 10px #0f0; }
.matrix-overlay p { font-size:0.85rem; color:#88ff88; margin-top:6px; }`,
    js: `const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF'.split('');
const fontSize = 16;
let drops = Array(Math.ceil(width / fontSize)).fill(1);
let last = 0;
function draw(ts) {
  requestAnimationFrame(draw);
  if (ts - last < 38) return;
  last = ts;
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
requestAnimationFrame(draw);
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  drops = Array(Math.ceil(width / fontSize)).fill(1);
});`
  },
  neon: {
    html: `<div class="neon-wrapper">
  <h1 class="neon-text glow-blue">CYBER</h1>
  <h1 class="neon-text glow-pink">PULSE</h1>
  <div class="interactive-circle"></div>
</div>`,
    css: `* { margin:0; padding:0; box-sizing:border-box; }
body { background:#08080f; height:100vh; display:flex; justify-content:center; align-items:center; font-family:system-ui,sans-serif; overflow:hidden; }
.neon-wrapper { text-align:center; position:relative; }
.neon-text { font-size:clamp(3rem,9vw,5.5rem); font-weight:900; letter-spacing:8px; line-height:0.95; }
.glow-blue { color:#fff; text-shadow:0 0 8px #fff,0 0 22px #00d2ff,0 0 55px #00d2ff; animation:flicker 3s infinite alternate; }
.glow-pink { color:#fff; text-shadow:0 0 8px #fff,0 0 22px #ff007f,0 0 55px #ff007f; }
.interactive-circle { width:220px; height:220px; border-radius:50%; position:fixed; transform:translate(-50%,-50%); background:radial-gradient(circle,rgba(0,240,255,0.22),transparent 70%); filter:blur(28px); pointer-events:none; z-index:-1; }
@keyframes flicker { 0%,19%,21%,55%,100% { opacity:1; } 20%,54% { opacity:0.6; } }`,
    js: `const circle = document.querySelector('.interactive-circle');
window.addEventListener('mousemove', e => {
  circle.style.left = e.clientX + 'px';
  circle.style.top = e.clientY + 'px';
});`
  },
  glass: {
    html: `<div class="glass-bg">
  <div class="shape shape-1"></div>
  <div class="shape shape-2"></div>
  <form class="glass-form" id="login-form">
    <h3>GET STARTED</h3>
    <div class="input-group"><label for="username">Username</label><input type="text" id="username" placeholder="cyber_builder" required></div>
    <div class="input-group"><label for="password">Password</label><input type="password" id="password" placeholder="••••••••" required></div>
    <button type="submit" class="submit-btn">ACCESS CHANNEL</button>
    <div id="status-msg" class="status-msg"></div>
  </form>
</div>`,
    css: `* { margin:0; padding:0; box-sizing:border-box; }
body { background:#0c0f1d; height:100vh; display:flex; justify-content:center; align-items:center; font-family:system-ui,sans-serif; overflow:hidden; }
.glass-bg { position:relative; width:360px; padding:20px; display:flex; justify-content:center; align-items:center; }
.shape { height:120px; width:120px; border-radius:50%; position:absolute; z-index:1; }
.shape-1 { background:linear-gradient(135deg,#ff007f,#8a2be2); top:-15px; left:-10px; }
.shape-2 { background:linear-gradient(135deg,#00f0ff,#0072ff); bottom:-15px; right:-10px; }
.glass-form { width:100%; padding:2.4rem 2rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); border-radius:20px; backdrop-filter:blur(16px); z-index:10; display:flex; flex-direction:column; gap:1.2rem; }
.glass-form h3 { color:#fff; text-align:center; letter-spacing:2px; }
.input-group { display:flex; flex-direction:column; gap:0.4rem; }
.input-group label { color:#94a3b8; font-size:0.75rem; font-weight:700; text-transform:uppercase; }
.input-group input { padding:0.75rem 1rem; border-radius:8px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#fff; outline:none; }
.submit-btn { background:#00f0ff; color:#020617; border:none; padding:0.8rem; border-radius:8px; font-weight:800; cursor:pointer; }
.status-msg { min-height:18px; font-size:0.82rem; color:#34d399; text-align:center; font-weight:600; }`,
    js: `document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  document.getElementById('status-msg').textContent = '✅ Connected as ' + user;
  console.log('Agent connected:', user);
});`
  },
  pricing: {
    html: `<article class="plan-card">
  <span class="pill">MOST POPULAR</span>
  <h2>Pro Creator</h2>
  <div class="price">$10<span>/mo</span></div>
  <ul><li>✓ Unlimited 3D &amp; WebGL Exports</li><li>✓ Zero Watermark White-Label</li><li>✓ Offline PWA &amp; Priority Templates</li></ul>
  <button id="buy-btn">Start Building →</button>
</article>`,
    css: `* { box-sizing:border-box; margin:0; padding:0; }
body { background:#06070f; color:#fff; font-family:system-ui,sans-serif; min-height:100vh; display:grid; place-items:center; padding:24px; }
.plan-card { width:320px; padding:32px 26px; border-radius:22px; background:linear-gradient(160deg,rgba(15,23,42,0.95),rgba(0,240,255,0.08)); border:1px solid rgba(0,240,255,0.4); box-shadow:0 24px 60px rgba(0,0,0,0.6); }
.pill { display:inline-block; font-size:10px; font-weight:800; letter-spacing:1px; padding:4px 10px; border-radius:999px; background:rgba(0,240,255,0.16); color:#00f0ff; margin-bottom:14px; }
.price { font-size:3rem; font-weight:900; margin:12px 0 20px; }
.price span { font-size:1rem; color:#94a3b8; font-weight:500; }
ul { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:24px; color:#cbd5e1; font-size:0.9rem; }
button { width:100%; padding:12px; border:none; border-radius:10px; background:linear-gradient(135deg,#00f0ff,#6366f1); color:#020617; font-weight:800; cursor:pointer; }`,
    js: `document.getElementById('buy-btn').addEventListener('click', function() {
  this.textContent = '⚡ Plan Selected!';
  console.log('Pricing CTA clicked');
});`
  }
};
