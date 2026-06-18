// Predefined presets for the Live Sandbox Playground

window.playgroundTemplates = {
  cube: {
    html: `<!-- 3D Rotating Cube Preset -->
<div id="app-container">
  <div class="content-overlay">
    <h2>THREE.JS 3D CUBE</h2>
    <p>Drag to rotate & scroll to zoom</p>
  </div>
  <div id="canvas-container"></div>
</div>

<!-- Load Three.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>`,
    css: `/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #05050a;
  color: #fff;
  font-family: 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
  height: 100vh;
}

#app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

#canvas-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.content-overlay {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
  pointer-events: none;
}

.content-overlay h2 {
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: #00f0ff;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  margin-bottom: 5px;
}

.content-overlay p {
  font-size: 0.85rem;
  color: #888;
}`,
    js: `// Three.js 3D Cube Initialization
const container = document.getElementById('canvas-container');
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.15);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Orbit Controls for zoom & rotation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Light Source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00f0ff, 1.5, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create Cube with multiple Materials (Wireframe + Solid Glow)
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

// Solid inner material
const innerMaterial = new THREE.MeshBasicMaterial({
  color: 0x0f111a,
  transparent: true,
  opacity: 0.8
});
const cubeMesh = new THREE.Mesh(geometry, innerMaterial);

// Luminous outer wireframe
const wireframeGeom = new THREE.EdgesGeometry(geometry);
const lineMat = new THREE.LineBasicMaterial({ 
  color: 0x00f0ff, 
  linewidth: 2 
});
const wireframe = new THREE.LineSegments(wireframeGeom, lineMat);
cubeMesh.add(wireframe);

scene.add(cubeMesh);

// Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();
  
  // Rotate Cube autonomously
  cubeMesh.rotation.x = elapsedTime * 0.3;
  cubeMesh.rotation.y = elapsedTime * 0.4;
  
  // Pulsing scale animation
  const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
  cubeMesh.scale.set(scale, scale, scale);
  
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener('resize', () => {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});`
  },
  matrix: {
    html: `<!-- Digital Matrix Rain Preset -->
<div class="matrix-overlay">
  <h1>SYSTEM STATUS: SECURE</h1>
  <p>Matrix Digital Rain Canvas Effect</p>
</div>
<canvas id="matrix-canvas"></canvas>`,
    css: `/* Matrix CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #000;
  overflow: hidden;
  color: #0f0;
  font-family: 'Courier New', Courier, monospace;
}

#matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.matrix-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem 3rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(4px);
}

.matrix-overlay h1 {
  font-size: 1.8rem;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #0f0;
}

.matrix-overlay p {
  font-size: 0.9rem;
  color: #88ff88;
}`,
    js: `// Matrix Digital Rain Logic
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Katakana characters
const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArr = chars.split('');

const fontSize = 16;
const columns = width / fontSize;

// Track drop y position for each column
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  // Translucent background to create trail fade
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = charArr[Math.floor(Math.random() * charArr.length)];
    
    // Draw character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop to top once it hits bottom, or randomly
    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// Tick loop
setInterval(draw, 33);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  const newCols = width / fontSize;
  for (let i = drops.length; i < newCols; i++) {
    drops[i] = 1;
  }
});`
  },
  neon: {
    html: `<!-- Luminous Neon sign -->
<div class="neon-wrapper">
  <h1 class="neon-text glow-blue">CYBER</h1>
  <h1 class="neon-text glow-pink">PULSE</h1>
  <div class="interactive-circle"></div>
</div>`,
    css: `/* Cyber Neon Glow */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #08080f;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}

.neon-wrapper {
  text-align: center;
  position: relative;
}

.neon-text {
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 8px;
  line-height: 0.95;
  margin: 0.5rem 0;
}

/* Cyber glows using text shadow */
.glow-blue {
  color: #fff;
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #00d2ff,
    0 0 40px #00d2ff,
    0 0 80px #00d2ff;
  animation: flicker-blue 3s infinite alternate;
}

.glow-pink {
  color: #fff;
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #ff007f,
    0 0 40px #ff007f,
    0 0 80px #ff007f;
  animation: flicker-pink 2s infinite alternate;
}

.interactive-circle {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%);
  filter: blur(30px);
  z-index: -1;
  pointer-events: none;
}

/* Realistic neon flicker animations */
@keyframes flicker-blue {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00d2ff, 0 0 40px #00d2ff, 0 0 80px #00d2ff;
  }
  20%, 24%, 55% {        
    text-shadow: none;
    color: #4a5568;
  }
}

@keyframes flicker-pink {
  0%, 89%, 91%, 93%, 95%, 100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff007f, 0 0 40px #ff007f, 0 0 80px #ff007f;
  }
  90%, 94% {        
    text-shadow: none;
    color: #4a5568;
  }
}`,
    js: `// Track cursor position to warp glowing circle
const circle = document.querySelector('.interactive-circle');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Smoothly center the blur behind cursor
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
});`
  },
  glass: {
    html: `<!-- Floating Glassmorphism UI Form -->
<div class="glass-bg">
  <div class="shape shape-1"></div>
  <div class="shape shape-2"></div>
  
  <form class="glass-form" onsubmit="event.preventDefault(); handleLogin();">
    <h3>GET STARTED</h3>
    
    <div class="input-group">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="cyber_builder" required>
    </div>
    
    <div class="input-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="••••••••" required>
    </div>
    
    <button type="submit" class="submit-btn">ACCESS CHANNEL</button>
  </form>
</div>`,
    css: `/* Glassmorphism System */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0c0f1d;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}

.glass-bg {
  position: relative;
  width: 400px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Background floating shapes */
.shape {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
}

.shape-1 {
  background: linear-gradient(135deg, #ff007f, #8a2be2);
  top: 0;
  left: 0;
  animation: float-shape 6s infinite alternate;
}

.shape-2 {
  background: linear-gradient(135deg, #00f0ff, #0072ff);
  bottom: 0;
  right: 0;
  animation: float-shape 8s infinite alternate-reverse;
}

/* The Glass Card */
.glass-form {
  width: 330px;
  padding: 3rem 2.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.glass-form h3 {
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  color: #a0aec0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.input-group input {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.25);
}

.submit-btn {
  background: #fff;
  color: #0c0f1d;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #00f0ff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  transform: translateY(-1px);
}

@keyframes float-shape {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-20px) rotate(360deg); }
}`,
    js: `// Interaction Demo Alert
function handleLogin() {
  const user = document.getElementById('username').value;
  alert('Welcome Agent: ' + user + '\\nChannel Connection Successful!');
}`
  }
};
