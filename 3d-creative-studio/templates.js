// 3D Creative Suite - Full Expanded Templates Database (FR/EN Clean Translations)
window.uiTemplates = {
  // --- BUTTONS ---
  liquid: {
    category: "buttons",
    name: { fr: "Bouton Fluide Liquide", en: "Liquid Gooey Button" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="liquid-button-wrapper">
  <button class="liquid-btn" id="sound-btn">
    <span class="btn-text">${text}</span>
    <span class="bubble"></span>
    <span class="bubble"></span>
    <span class="bubble"></span>
    <span class="bubble"></span>
  </button>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="liquid-gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.liquid-button-wrapper { filter: url('#liquid-gooey'); }
.liquid-btn {
  position: relative; padding: 18px 40px; font-size: 16px; font-weight: 700; color: #fff; background: ${cPrim};
  border: none; border-radius: 30px; cursor: pointer; outline: none; transition: transform 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.liquid-btn:active { transform: scale(0.96); }
.bubble { position: absolute; background: ${cSec}; border-radius: 50%; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); z-index: -1; pointer-events: none; }
.bubble:nth-child(2) { top: -20px; left: 20px; width: 40px; height: 40px; transform: scale(0); }
.bubble:nth-child(3) { top: 20px; right: -20px; width: 30px; height: 30px; transform: scale(0); }
.bubble:nth-child(4) { bottom: -20px; left: 50px; width: 35px; height: 35px; transform: scale(0); }
.bubble:nth-child(5) { bottom: 10px; right: 20px; width: 45px; height: 45px; transform: scale(0); }
.liquid-btn:hover .bubble { transform: scale(1.6) translate(0, 0); }
.liquid-btn:hover .bubble:nth-child(2) { transform: scale(1.6) translate(-10px, -15px); }
.liquid-btn:hover .bubble:nth-child(3) { transform: scale(1.8) translate(15px, 5px); }
.liquid-btn:hover .bubble:nth-child(4) { transform: scale(1.5) translate(-5px, 15px); }
.liquid-btn:hover .bubble:nth-child(5) { transform: scale(1.7) translate(10px, 10px); }
.btn-text { position: relative; z-index: 2; letter-spacing: 0.5px; }
`,
    js: () => ``
  },

  particles: {
    category: "buttons",
    name: { fr: "Bouton Étincelles Particules", en: "Particle Spark Button" },
    inputs: ["text", "density"],
    html: (text, cPrim, cSec) => `
<div class="particle-container">
  <canvas id="particle-canvas"></canvas>
  <button id="spark-btn">${text}</button>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; }
.particle-container { position: relative; display: inline-block; }
#particle-canvas { position: absolute; top: -100px; left: -100px; width: calc(100% + 200px); height: calc(100% + 200px); pointer-events: none; z-index: 1; }
#spark-btn {
  position: relative; padding: 16px 36px; font-size: 16px; font-weight: 700; color: #fff; background: rgba(15, 23, 42, 0.8);
  border: 1px solid ${cPrim}; border-radius: 12px; cursor: pointer; outline: none; z-index: 2; letter-spacing: 0.5px;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
#spark-btn:hover { border-color: ${cSec}; box-shadow: 0 0 25px ${cPrim}50; transform: translateY(-2px); }
#spark-btn:active { transform: translateY(0); }
`,
    js: (text, cPrim, cSec, density) => `
const btn = document.getElementById('spark-btn');
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  const r = canvas.getBoundingClientRect();
  w = canvas.width = r.width; h = canvas.height = r.height;
}
resize();
const particles = [];
class Particle {
  constructor(x, y) {
    this.x = x; this.y = y; this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 4; this.speedY = (Math.random() - 0.5) * 4 - 1;
    this.life = 1; this.decay = Math.random() * 0.02 + 0.015;
    this.color = Math.random() > 0.5 ? '${cPrim}' : '${cSec}';
  }
  update() { this.x += this.speedX; this.y += this.speedY; this.life -= this.decay; }
  draw() {
    ctx.fillStyle = this.color; ctx.globalAlpha = this.life;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
  }
}
function spawn() {
  const r = btn.getBoundingClientRect();
  const pr = btn.parentElement.getBoundingClientRect();
  const rx = r.left - pr.left + 100; const ry = r.top - pr.top + 100;
  for (let i = 0; i < ${Math.max(1, Math.round(density / 2))}; i++) {
    particles.push(new Particle(rx + Math.random() * r.width, ry + Math.random() * r.height));
  }
}
let isH = false;
btn.addEventListener('mouseenter', () => isH = true);
btn.addEventListener('mouseleave', () => isH = false);
btn.addEventListener('click', () => {
  const r = btn.getBoundingClientRect();
  const pr = btn.parentElement.getBoundingClientRect();
  for (let i = 0; i < 40; i++) {
    const p = new Particle(r.left - pr.left + 100 + r.width/2, r.top - pr.top + 100 + r.height/2);
    p.speedX *= 2.5; p.speedY *= 2.5; particles.push(p);
  }
});
function animate() {
  ctx.clearRect(0, 0, w, h);
  if (isH) spawn();
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) particles.splice(i, 1);
    else particles[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();
`
  },

  matrix: {
    category: "buttons",
    name: { fr: "Bouton Rétro Matrix", en: "Retro Matrix Button" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<button class="matrix-btn" id="sound-btn">
  <span class="matrix-bg"></span>
  <span class="btn-lbl">${text}</span>
</button>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; }
.matrix-btn {
  position: relative; padding: 16px 36px; font-size: 16px; font-weight: 700; color: ${cPrim};
  background: #000; border: 2px solid ${cPrim}; border-radius: 6px; overflow: hidden; cursor: pointer;
  box-shadow: 0 0 15px ${cPrim}50; transition: all 0.3s ease; letter-spacing: 2px;
}
.matrix-btn:hover { color: #fff; border-color: ${cSec}; box-shadow: 0 0 25px ${cSec}; text-shadow: 0 0 5px ${cSec}; }
.btn-lbl { position: relative; z-index: 2; }
.matrix-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0;
  background: linear-gradient(180deg, transparent, ${cPrim}40); transition: opacity 0.3s ease;
}
.matrix-btn:hover .matrix-bg { opacity: 1; }
`,
    js: () => ``
  },

  glitch: {
    category: "buttons",
    name: { fr: "Bouton Cyber Glitch 3D", en: "Cyberpunk Glitch Button" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<button class="glitch-btn" style="--c-prim: ${cPrim}; --c-sec: ${cSec};">
  <span class="glitch-text">${text}</span>
  <span class="glitch-layer"></span>
</button>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; }
.glitch-btn {
  position: relative; padding: 18px 40px; font-size: 16px; font-weight: 800; color: #fff;
  background: transparent; border: 2px solid var(--c-prim); letter-spacing: 3px; cursor: pointer;
  text-transform: uppercase; outline: none; box-shadow: 0 0 15px var(--c-prim)40;
}
.glitch-btn:hover {
  border-color: var(--c-sec);
  box-shadow: 0 0 25px var(--c-sec);
}
.glitch-text { position: relative; z-index: 2; }
.glitch-btn:hover .glitch-text {
  animation: glitch-anim 0.4s infinite;
}
@keyframes glitch-anim {
  0% { text-shadow: 2px -2px var(--c-prim), -2px 2px var(--c-sec); transform: translate(0); }
  25% { text-shadow: -2px 2px var(--c-prim), 2px -2px var(--c-sec); transform: translate(-2px, 2px); }
  50% { text-shadow: 2px 2px var(--c-prim), -2px -2px var(--c-sec); transform: translate(2px, -2px); }
  75% { text-shadow: -2px -2px var(--c-prim), 2px 2px var(--c-sec); transform: translate(-2px, -2px); }
  100% { text-shadow: 2px -2px var(--c-prim), -2px 2px var(--c-sec); transform: translate(0); }
}
`,
    js: () => ``
  },

  confetti_btn: {
    category: "buttons",
    name: { fr: "Bouton Confettis Physique", en: "Physics Confetti Button" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="confetti-wrap">
  <canvas id="confetti-canvas"></canvas>
  <button id="confetti-btn" style="--c1: ${cPrim}; --c2: ${cSec};">${text}</button>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; }
.confetti-wrap { position: relative; display: inline-block; }
#confetti-canvas { position: absolute; top: -300px; left: -300px; width: calc(100% + 600px); height: calc(100% + 600px); pointer-events: none; z-index: 1; }
#confetti-btn {
  position: relative; padding: 18px 42px; font-size: 16px; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, var(--c1), var(--c2)); border: none; border-radius: 30px;
  cursor: pointer; outline: none; z-index: 2; letter-spacing: 0.5px;
  box-shadow: 0 10px 25px rgba(0, 240, 255, 0.25);
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
#confetti-btn:active { transform: scale(0.9); }
`,
    js: (text, cPrim, cSec) => `
const btn = document.getElementById('confetti-btn');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  const r = canvas.getBoundingClientRect();
  w = canvas.width = r.width; h = canvas.height = r.height;
}
resize();
const confettis = [];
class Confetti {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.size = Math.random() * 8 + 4;
    this.color = Math.random() > 0.5 ? '${cPrim}' : '${cSec}';
    this.vx = (Math.random() - 0.5) * 15;
    this.vy = (Math.random() - 1) * 15;
    this.gravity = 0.4;
    this.rot = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 10;
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.01;
  }
  update() {
    this.vy += this.gravity;
    this.x += this.vx; this.y += this.vy;
    this.rot += this.rotSpeed;
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size/2);
    ctx.restore();
  }
}
btn.addEventListener('click', () => {
  const r = btn.getBoundingClientRect();
  const pr = btn.parentElement.getBoundingClientRect();
  const rx = r.left - pr.left + 300 + r.width/2;
  const ry = r.top - pr.top + 300 + r.height/2;
  for(let i=0; i<80; i++) {
    confettis.push(new Confetti(rx, ry));
  }
});
function animate() {
  ctx.clearRect(0,0,w,h);
  for (let i = confettis.length - 1; i >= 0; i--) {
    confettis[i].update();
    if (confettis[i].life <= 0) confettis.splice(i, 1);
    else confettis[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();
`
  },

  magnetic: {
    category: "buttons",
    name: { fr: "Bouton Magnétique 3D", en: "Magnetic Gravity Button" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="magnetic-wrap" id="mag-wrap">
  <button class="mag-btn" id="mag-btn" style="--c1: ${cPrim}; --c2: ${cSec};">${text}</button>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.magnetic-wrap { padding: 40px; display: flex; justify-content: center; align-items: center; }
.mag-btn {
  padding: 16px 38px; font-size: 16px; font-weight: 700; color: #fff;
  background: linear-gradient(135deg, var(--c1), var(--c2)); border: none; border-radius: 30px;
  cursor: pointer; outline: none; transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 10px 25px rgba(0, 240, 255, 0.25);
}
`,
    js: () => `
const wrap = document.getElementById('mag-wrap');
const btn = document.getElementById('mag-btn');
wrap.addEventListener('mousemove', (e) => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - (r.left + r.width/2);
  const y = e.clientY - (r.top + r.height/2);
  btn.style.transform = \`translate(\${x * 0.35}px, \${y * 0.35}px) scale(1.05)\`;
});
wrap.addEventListener('mouseleave', () => {
  btn.style.transform = 'translate(0px, 0px) scale(1)';
});
`
  },

  // --- BUSINESS CARDS ---
  holographic_card: {
    category: "business_cards",
    name: { fr: "Carte Holographique Verre", en: "Holographic Glassmorphic Card" },
    inputs: ["name", "role", "contact"],
    html: (name, role, contact, cPrim, cSec) => `
<div class="card-3d-wrap">
  <div class="holo-card" id="card-3d">
    <div class="card-shine" id="card-shine"></div>
    <div class="card-front">
      <div class="card-chip">⚡</div>
      <div class="card-user">
        <h2>${name}</h2>
        <p>${role}</p>
      </div>
      <div class="card-info">${contact}</div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.holo-card {
  position: relative; width: 350px; height: 210px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transform-style: preserve-3d;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5); transition: transform 0.1s ease;
}
.card-shine {
  position: absolute; inset: 0; border-radius: 16px; pointer-events: none; z-index: 3;
  background: linear-gradient(135deg, transparent 30%, ${cPrim}20 50%, ${cSec}20 70%, transparent 100%);
  background-size: 200% 200%; background-position: 0% 0%;
}
.card-front { display: flex; flex-direction: column; height: 100%; justify-content: space-between; transform: translateZ(40px); }
.card-chip { font-size: 32px; color: ${cPrim}; filter: drop-shadow(0 0 10px ${cPrim}); }
.card-user h2 { margin: 0; color: #fff; font-size: 20px; font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.5px; }
.card-user p { margin: 4px 0 0 0; color: ${cSec}; font-size: 13px; font-weight: 600; text-transform: uppercase; }
.card-info { color: #94a3b8; font-size: 12px; letter-spacing: 0.5px; }
`,
    js: () => `
const card = document.getElementById('card-3d');
const shine = document.getElementById('card-shine');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  shine.style.backgroundPosition = \`\${(x/r.width)*100}% \${(y/r.height)*100}%\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  credit_card: {
    category: "business_cards",
    name: { fr: "Carte de Crédit Holographique 3D", en: "3D Specular Credit Card" },
    inputs: ["name", "role", "contact"],
    html: (name, role, contact, cPrim, cSec) => `
<div class="card-scene">
  <div class="credit-card-3d" id="credit-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="cc-face cc-front">
      <div class="cc-header">
        <span class="cc-logo">VISA</span>
        <div class="cc-chip"></div>
      </div>
      <div class="cc-number">${contact}</div>
      <div class="cc-footer">
        <div class="cc-holder">
          <label>CARDHOLDER</label>
          <div>${name}</div>
        </div>
        <div class="cc-expiry">
          <label>EXPIRES</label>
          <div>${role}</div>
        </div>
      </div>
      <div class="cc-shine" id="cc-shine"></div>
    </div>
    <div class="cc-face cc-back">
      <div class="cc-strip"></div>
      <div class="cc-signature">
        <div class="cc-cvv">742</div>
      </div>
      <div class="cc-logo-back">VISA</div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; user-select: none; }
.card-scene { perspective: 1000px; }
.credit-card-3d {
  position: relative; width: 340px; height: 210px; transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer;
}
.credit-card-3d.flipped { transform: rotateY(180deg); }
.cc-face {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
  border-radius: 16px; padding: 24px; box-sizing: border-box; display: flex;
  flex-direction: column; justify-content: space-between;
}
.cc-front {
  background: linear-gradient(135deg, #0d0d1e 0%, #030209 100%);
  border: 1px solid rgba(255,255,255,0.08); color: #fff;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.cc-back {
  background: #090911; color: #fff; border: 1px solid rgba(255,255,255,0.08);
  transform: rotateY(180deg); padding: 0;
}
.cc-header { display: flex; justify-content: space-between; align-items: center; }
.cc-logo { font-size: 24px; font-weight: 900; font-style: italic; color: #fff; }
.cc-chip {
  width: 42px; height: 32px; background: linear-gradient(135deg, #fcd34d 0%, #b45309 100%);
  border-radius: 6px; box-shadow: inset 0 0 5px rgba(255,255,255,0.3);
}
.cc-number { font-size: 20px; letter-spacing: 2px; font-family: monospace; color: #fff; text-shadow: 0 1px 1px rgba(255,255,255,0.2); }
.cc-footer { display: flex; justify-content: space-between; align-items: flex-end; }
.cc-holder label, .cc-expiry label { font-size: 8px; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
.cc-holder div, .cc-expiry div { font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; }
.cc-shine {
  position: absolute; inset: 0; border-radius: 16px; pointer-events: none; z-index: 3;
  background: linear-gradient(135deg, transparent 40%, var(--c1)20 50%, var(--c2)20 60%, transparent 100%);
  background-size: 200% 200%; background-position: 0% 0%; opacity: 0.4;
}
.cc-strip { background: #000; height: 45px; width: 100%; margin-top: 25px; }
.cc-signature {
  background: #fff; width: 80%; height: 35px; margin: 15px auto 0 auto;
  display: flex; justify-content: flex-end; align-items: center; padding-right: 15px; box-sizing: border-box;
}
.cc-cvv { color: #000; font-family: monospace; font-size: 14px; font-weight: 700; font-style: italic; }
.cc-logo-back { margin: auto 25px 20px auto; font-size: 22px; font-weight: 900; font-style: italic; opacity: 0.2; }
`,
    js: () => `
const card = document.getElementById('credit-card');
const shine = document.getElementById('cc-shine');
card.addEventListener('click', (e) => {
  card.classList.toggle('flipped');
});
document.addEventListener('mousemove', (e) => {
  if (card.classList.contains('flipped')) return;
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  shine.style.backgroundPosition = \`\${(x/r.width)*100}% \${(y/r.height)*100}%\`;
});
document.addEventListener('mouseleave', () => {
  if (card.classList.contains('flipped')) return;
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  metal_card: {
    category: "business_cards",
    name: { fr: "Carte Métal Brossé Or", en: "Brushed Gold Metal Business Card" },
    inputs: ["name", "role", "contact"],
    html: (name, role, contact, cPrim, cSec) => `
<div class="metal-card" id="metal-card" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="metal-shine" id="metal-shine"></div>
  <div class="metal-details">
    <div class="metal-icon">⚡</div>
    <h2>${name}</h2>
    <h3>${role}</h3>
    <p>${contact}</p>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; }
.metal-card {
  position: relative; width: 350px; height: 210px;
  background: linear-gradient(135deg, #1e1b4b 0%, #030712 100%);
  border: 2px solid var(--c1); border-radius: 12px; padding: 26px; box-sizing: border-box;
  box-shadow: 0 25px 50px rgba(0,0,0,0.6), inset 0 0 15px var(--c2)40;
  transform-style: preserve-3d; transition: transform 0.1s ease; overflow: hidden;
}
.metal-shine {
  position: absolute; inset: -100%; pointer-events: none; z-index: 1;
  background: linear-gradient(45deg, transparent 35%, var(--c1)40, #fff 50%, var(--c2)60, transparent 65%);
  background-size: 200% 200%; opacity: 0.25;
}
.metal-details { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; transform: translateZ(40px); }
.metal-icon { font-size: 36px; color: var(--c1); filter: drop-shadow(0 0 8px var(--c1)); }
.metal-details h2 { margin: 10px 0 2px 0; color: #fff; font-size: 22px; }
.metal-details h3 { margin: 0; color: var(--c2); font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.metal-details p { margin: auto 0 0 0; color: #94a3b8; font-size: 11px; font-family: monospace; }
`,
    js: () => `
const card = document.getElementById('metal-card');
const shine = document.getElementById('metal-shine');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  shine.style.transform = \`translate(\${(x/r.width)*40 - 20}px, \${(y/r.height)*40 - 20}px)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  retro_grid_card: {
    category: "business_cards",
    name: { fr: "Carte Synthwave Retro Grid", en: "Retro Grid Business Card" },
    inputs: ["name", "role", "contact"],
    html: (name, role, contact, cPrim, cSec) => `
<div class="retro-card">
  <div class="grid-animation"></div>
  <div class="card-interior">
    <div class="retro-logo">▲</div>
    <div>
      <h2 class="neon-title">${name}</h2>
      <p class="neon-subtitle">${role}</p>
    </div>
    <div class="retro-footer">${contact}</div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #0a0518; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; }
.retro-card {
  position: relative; width: 350px; height: 210px; background: #0d0624; border: 2px solid ${cSec};
  border-radius: 12px; padding: 24px; box-sizing: border-box; overflow: hidden;
  box-shadow: 0 0 25px ${cSec}50, inset 0 0 15px ${cPrim}20; cursor: pointer;
}
.grid-animation {
  position: absolute; bottom: 0; left: -50%; width: 200%; height: 50%;
  background-image: 
    linear-gradient(90deg, rgba(255, 0, 127, 0.15) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 0, 127, 0.15) 1px, transparent 1px);
  background-size: 20px 20px; transform: perspective(100px) rotateX(60deg);
  animation: grid-move 2s linear infinite;
}
@keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }
.card-interior { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; justify-content: space-between; }
.retro-logo { font-size: 28px; color: ${cPrim}; text-shadow: 0 0 8px ${cPrim}; }
.neon-title { margin: 0; color: #fff; font-size: 22px; text-shadow: 0 0 10px ${cPrim}; }
.neon-subtitle { margin: 4px 0 0 0; color: ${cSec}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
.retro-footer { color: #f8fafc; font-size: 11px; letter-spacing: 0.5px; font-family: monospace; }
`,
    js: () => ``
  },

  // --- GIFT CARDS ---
  flip_gift: {
    category: "gift_cards",
    name: { fr: "Carte Cadeau Pivotante 3D", en: "3D Flip Gift Card" },
    inputs: ["gift_title", "gift_code", "gift_value"],
    html: (title, code, value, cPrim, cSec) => `
<div class="gift-scene">
  <div class="gift-card-3d" id="gift-card">
    <div class="face front">
      <div class="val-badge">${value}</div>
      <h3>${title}</h3>
      <p class="click-lbl">CLICK TO FLIP ⚡</p>
    </div>
    <div class="face back">
      <h4>PROMO CODE</h4>
      <div class="promo-box">${code}</div>
      <p>Redeem at checkout</p>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.gift-scene { perspective: 800px; }
.gift-card-3d {
  width: 320px; height: 190px; position: relative; transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer;
}
.gift-card-3d.flipped { transform: rotateY(180deg); }
.face {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
  border-radius: 16px; padding: 24px; box-sizing: border-box; display: flex;
  flex-direction: column; justify-content: space-between;
}
.front {
  background: linear-gradient(135deg, ${cPrim}, ${cSec}); color: #fff;
  box-shadow: 0 15px 35px ${cPrim}40;
}
.back {
  background: #0f172a; color: #fff; border: 2px solid ${cPrim};
  transform: rotateY(180deg); align-items: center; justify-content: center; gap: 15px;
}
.val-badge { align-self: flex-start; background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 18px; }
.front h3 { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 22px; }
.click-lbl { margin: 0; font-size: 10px; opacity: 0.8; font-weight: 700; letter-spacing: 1px; }
.back h4 { margin: 0; font-size: 12px; color: #64748b; letter-spacing: 1.5px; }
.promo-box { background: rgba(255,255,255,0.05); border: 1px dashed ${cSec}; padding: 10px 20px; border-radius: 8px; font-family: monospace; font-size: 18px; font-weight: 700; color: ${cSec}; text-shadow: 0 0 8px ${cSec}50; }
.back p { margin: 0; font-size: 11px; color: #94a3b8; }
`,
    js: () => `
const card = document.getElementById('gift-card');
card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});
`
  },

  gold_gift: {
    category: "gift_cards",
    name: { fr: "Carte Cadeau Or Premium", en: "Reflective Gold Metal Gift Card" },
    inputs: ["gift_title", "gift_code", "gift_value"],
    html: (title, code, value, cPrim, cSec) => `
<div class="gold-card-wrap">
  <div class="gold-card" id="gold-card">
    <div class="reflection"></div>
    <div class="gold-content">
      <div class="gold-val">${value}</div>
      <div class="gold-title">${title}</div>
      <div class="gold-code">${code}</div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.gold-card {
  position: relative; width: 340px; height: 200px;
  background: linear-gradient(135deg, #fcd34d 0%, #b45309 50%, #fef3c7 100%);
  border-radius: 16px; padding: 24px; box-sizing: border-box; overflow: hidden;
  box-shadow: 0 20px 45px rgba(217, 119, 6, 0.25), inset 0 0 10px rgba(255,255,255,0.4);
  transform-style: preserve-3d; transition: transform 0.1s ease; cursor: pointer;
}
.reflection {
  position: absolute; inset: -50%; pointer-events: none; z-index: 1;
  background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 55%, transparent 70%);
  transform: rotate(30deg);
}
.gold-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; justify-content: space-between; transform: translateZ(30px); }
.gold-val { align-self: flex-end; font-size: 26px; font-weight: 900; color: #1e1b4b; text-shadow: 0 1px 2px rgba(255,255,255,0.5); }
.gold-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #1e1b4b; }
.gold-code { align-self: flex-start; background: #1e1b4b; color: #fcd34d; padding: 6px 14px; border-radius: 6px; font-family: monospace; font-size: 14px; font-weight: 700; }
`,
    js: () => `
const card = document.getElementById('gold-card');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  // --- SURPRISE CARDS ---
  envelope: {
    category: "surprise_cards",
    name: { fr: "Enveloppe 3D Interactive", en: "3D Envelope Opener" },
    inputs: ["secret_message"],
    html: (secret, cPrim, cSec) => `
<div class="env-scene">
  <div class="envelope-3d" id="envelope">
    <div class="flap-top"></div>
    <div class="envelope-body"></div>
    <div class="letter-slip" id="letter">
      <p>${secret}</p>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.env-scene { width: 300px; height: 200px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
.envelope-3d {
  position: relative; width: 280px; height: 180px; background: ${cPrim};
  border-radius: 8px; box-shadow: 0 15px 30px rgba(0,0,0,0.4);
}
.envelope-body {
  position: absolute; inset: 0; background: ${cPrim}; border-radius: 8px; z-index: 3;
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 55%);
  border-top: 1px solid rgba(255,255,255,0.1);
}
.flap-top {
  position: absolute; top: 0; left: 0; width: 100%; height: 100px; background: ${cSec};
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%); z-index: 4; transform-origin: top;
  transition: transform 0.4s ease;
}
.letter-slip {
  position: absolute; top: 10px; left: 15px; width: 250px; height: 150px;
  background: #ffffff; border-radius: 6px; z-index: 2; padding: 15px; box-sizing: border-box;
  transition: transform 0.4s ease 0.2s; box-shadow: 0 0 10px rgba(0,0,0,0.15);
}
.letter-slip p { margin: 0; color: #1e293b; font-size: 14px; font-weight: 600; line-height: 1.5; text-align: center; }
.envelope-3d.open .flap-top { transform: rotateX(180deg); z-index: 1; }
.envelope-3d.open .letter-slip { transform: translateY(-90px); z-index: 5; }
`,
    js: () => `
const env = document.getElementById('envelope');
env.addEventListener('click', () => {
  env.classList.toggle('open');
});
`
  },

  scratch: {
    category: "surprise_cards",
    name: { fr: "Carte à Gratter Interactive", en: "Scratch Surprise Card" },
    inputs: ["secret_message"],
    html: (secret, cPrim, cSec) => `
<div class="scratch-card">
  <div class="secret-reveal">${secret}</div>
  <canvas id="scratch-canvas"></canvas>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.scratch-card {
  position: relative; width: 300px; height: 160px; background: #0f172a;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
}
.secret-reveal {
  color: #fff; font-size: 20px; font-weight: 700; text-align: center;
  font-family: 'Space Grotesk', sans-serif; padding: 20px;
}
#scratch-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: crosshair; }
`,
    js: (secret, cPrim, cSec) => `
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = 300; let h = canvas.height = 160;
ctx.fillStyle = '${cPrim}';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#fff';
ctx.font = '700 16px Outfit';
ctx.textAlign = 'center';
ctx.fillText('SCRATCH TO REVEAL ⚡', w/2, h/2 + 5);
let isD = false;
function scratch(e) {
  if(!isD) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left; const y = e.clientY - rect.top;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI*2); ctx.fill();
}
canvas.addEventListener('mousedown', () => isD = true);
canvas.addEventListener('mouseup', () => isD = false);
canvas.addEventListener('mousemove', scratch);
`
  },

  gift_box: {
    category: "surprise_cards",
    name: { fr: "Boîte Surprise 3D", en: "3D Surprise Gift Box" },
    inputs: ["secret_message"],
    html: (secret, cPrim, cSec) => `
<div class="box-scene" id="box-scene">
  <div class="gift-box-3d" id="gift-box" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="box-lid"></div>
    <div class="box-body"></div>
    <div class="box-secret" id="box-secret">${secret}</div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 800px; }
.box-scene { width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.gift-box-3d {
  position: relative; width: 100px; height: 100px; transform-style: preserve-3d;
  transition: transform 0.5s ease;
}
.box-body {
  position: absolute; inset: 0; background: var(--c1); border: 2px solid rgba(255,255,255,0.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3); border-radius: 8px; z-index: 2;
}
.box-lid {
  position: absolute; top: -14px; left: -5px; width: 110px; height: 20px;
  background: var(--c2); border-radius: 4px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  z-index: 3; transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.box-secret {
  position: absolute; top: 15px; left: 10px; width: 80px; text-align: center;
  color: #fff; font-size: 11px; font-weight: 700; z-index: 1; opacity: 0;
  transition: transform 0.5s ease 0.1s, opacity 0.5s ease 0.1s;
}
.gift-box-3d.open .box-lid { transform: translateY(-40px) rotate(-15deg); opacity: 0; }
.gift-box-3d.open .box-secret { opacity: 1; transform: translateY(-55px) scale(1.4); }
`,
    js: () => `
const box = document.getElementById('gift-box');
box.addEventListener('click', () => {
  box.classList.toggle('open');
});
`
  },

  // --- TOGGLES & SWITCHES ---
  toggle_holographic: {
    category: "toggles",
    name: { fr: "Interrupteur 3D Holographique", en: "Holographic 3D Toggle" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="toggle-container">
  <span class="toggle-label">${text}</span>
  <label class="switch-3d" id="sound-btn">
    <input type="checkbox" id="chk-3d">
    <div class="slider-3d">
      <div class="front-face">OFF</div>
      <div class="back-face">ON</div>
      <div class="depth-side"></div>
    </div>
  </label>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.toggle-container { display: flex; flex-direction: column; align-items: center; gap: 15px; }
.toggle-label { color: #94a3b8; font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
.switch-3d { position: relative; display: inline-block; width: 90px; height: 44px; perspective: 300px; cursor: pointer; }
.switch-3d input { opacity: 0; width: 0; height: 0; }
.slider-3d { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 25px rgba(0,0,0,0.5); border-radius: 12px; }
.front-face, .back-face, .depth-side { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; letter-spacing: 1px; }
.front-face { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); color: #64748b; transform: rotateX(0deg) translateZ(10px); }
.back-face { background: linear-gradient(135deg, ${cPrim}, ${cSec}); color: #fff; transform: rotateX(180deg) translateZ(10px); box-shadow: 0 0 20px ${cPrim}60; }
.depth-side { background: #0f172a; height: 20px; top: 12px; transform: rotateX(90deg) translateZ(12px); border-radius: 0; border: 1px solid rgba(255,255,255,0.15); }
.switch-3d input:checked + .slider-3d { transform: rotateX(180deg); }
`,
    js: () => ``
  },

  toggle_mercury: {
    category: "toggles",
    name: { fr: "Interrupteur Mercure Liquide", en: "Liquid Mercury Switch" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="merc-toggle">
  <span class="merc-lbl">${text}</span>
  <label class="merc-sw" id="sound-btn">
    <input type="checkbox">
    <span class="merc-slider"></span>
  </label>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="merc-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.merc-toggle { display: flex; align-items: center; gap: 20px; filter: url('#merc-goo'); }
.merc-lbl { color: #fff; font-weight: 700; font-size: 14px; }
.merc-sw { position: relative; display: inline-block; width: 68px; height: 34px; }
.merc-sw input { opacity: 0; width: 0; height: 0; }
.merc-slider { position: absolute; inset: 0; background: rgba(255,255,255,0.05); border: 2px solid ${cPrim}; border-radius: 34px; cursor: pointer; transition: 0.4s; }
.merc-slider:before {
  position: absolute; content: ""; height: 24px; width: 24px; left: 3px; bottom: 3px;
  background: ${cSec}; border-radius: 50%; transition: 0.4s; box-shadow: 0 0 10px ${cSec};
}
.merc-sw input:checked + .merc-slider { border-color: ${cSec}; }
.merc-sw input:checked + .merc-slider:before { transform: translateX(34px); background: ${cPrim}; box-shadow: 0 0 10px ${cPrim}; }
`,
    js: () => ``
  },

  toggle_spring: {
    category: "toggles",
    name: { fr: "Interrupteur Physique à Ressort", en: "3D Spring Physics Switch" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="spring-wrap">
  <span class="spring-lbl">${text}</span>
  <div class="spring-sw-box" id="sw-box" style="--c-base: ${cPrim}; --c-handle: ${cSec};">
    <div class="spring-lever" id="lever"></div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; user-select: none; }
.spring-wrap { display: flex; flex-direction: column; align-items: center; gap: 15px; }
.spring-lbl { color: #94a3b8; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
.spring-sw-box {
  position: relative; width: 44px; height: 90px; background: #0f172a; border-radius: 22px;
  border: 3px solid var(--c-base); box-shadow: 0 10px 25px rgba(0,0,0,0.5); cursor: pointer;
}
.spring-lever {
  position: absolute; top: 12px; left: 7px; width: 24px; height: 24px;
  background: radial-gradient(circle at 8px 8px, #fff, var(--c-handle));
  border-radius: 50%; box-shadow: 0 8px 15px rgba(0,0,0,0.4);
  transition: transform 0.05s linear;
}
`,
    js: () => `
const box = document.getElementById('sw-box');
const lever = document.getElementById('lever');

// Physics parameters
let y = 0; // Current position (0 is OFF, 54 is ON)
let targetY = 0;
let vy = 0; // Velocity
const k = 0.18; // Stiffness
const damping = 0.72; // Damping/friction

let state = false;
box.addEventListener('click', () => {
  state = !state;
  targetY = state ? 50 : 0;
});

function animate() {
  // Spring math: Acceleration = force - damping
  const force = (targetY - y) * k;
  vy += force;
  vy *= damping;
  y += vy;

  lever.style.transform = \`translateY(\${y}px)\`;
  requestAnimationFrame(animate);
}
animate();
`
  },

  // --- PARALLAX CARDS ---
  parallax_specular: {
    category: "parallax_cards",
    name: { fr: "Carte Spéculaire Parallaxe", en: "3D Specular Parallax Card" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="parallax-card" id="card-para">
  <div class="card-glow" id="card-glow"></div>
  <div class="card-content">
    <div class="card-icon">💎</div>
    <h3>${text}</h3>
    <p>Explore high-fidelity 3D UI states on hover. Refraction, depth, and specular shines combined.</p>
    <div class="card-action">Inspect ⚡</div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.parallax-card {
  position: relative; width: 300px; height: 380px; background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 30px; box-sizing: border-box;
  transform-style: preserve-3d; transition: transform 0.1s ease, border-color 0.3s ease;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4); cursor: pointer;
}
.parallax-card:hover { border-color: ${cPrim}60; }
.card-glow {
  position: absolute; inset: 0; border-radius: 24px; pointer-events: none; z-index: 1;
  background: radial-gradient(circle 120px at var(--mx, 50%) var(--my, 50%), ${cSec}25, transparent 80%);
}
.card-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; transform: translateZ(50px); }
.card-icon { font-size: 40px; margin-bottom: 20px; filter: drop-shadow(0 0 10px ${cPrim}40); }
.card-content h3 { color: #fff; font-size: 22px; margin: 0 0 12px 0; font-family: 'Space Grotesk', sans-serif; }
.card-content p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0; }
.card-action { margin-top: auto; align-self: flex-start; padding: 10px 22px; background: linear-gradient(135deg, ${cPrim}, ${cSec}); color: #fff; font-weight: 700; font-size: 13px; border-radius: 12px; box-shadow: 0 8px 20px ${cPrim}40; }
`,
    js: () => `
const card = document.getElementById('card-para');
card.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
  const ry = ((x / r.width) - 0.5) * 25; const rx = (0.5 - (y / r.height)) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  space_portal: {
    category: "parallax_cards",
    name: { fr: "Carte Portail Spatial", en: "Space Portal Card" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="portal-card" id="sound-btn">
  <div class="portal-scene">
    <div class="space-ring" style="--c: ${cPrim}"></div>
    <div class="space-ring-inner" style="--c: ${cSec}"></div>
  </div>
  <div class="portal-content">
    <h3>${text}</h3>
    <p>A window looking directly into a rotating hyper-space canvas portal.</p>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; }
.portal-card {
  position: relative; width: 300px; height: 380px; background: rgba(15,23,42,0.4);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 24px; box-sizing: border-box;
  overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5); cursor: pointer;
}
.portal-scene {
  position: absolute; inset: 0; z-index: 1; display: flex; justify-content: center; align-items: center;
  background: radial-gradient(circle, #1e1b4b 0%, #030712 100%);
}
.space-ring, .space-ring-inner {
  position: absolute; width: 180px; height: 180px; border: 2px dashed var(--c);
  border-radius: 50%; animation: spin-r 12s linear infinite; filter: drop-shadow(0 0 10px var(--c));
}
.space-ring-inner { width: 140px; height: 140px; animation: spin-r-rev 8s linear infinite; }
@keyframes spin-r { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes spin-r-rev { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
.portal-content { position: relative; z-index: 2; background: rgba(3,7,18,0.85); padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); }
.portal-content h3 { margin: 0 0 8px 0; color: #fff; font-size: 18px; font-family: 'Space Grotesk', sans-serif; }
.portal-content p { margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5; }
`,
    js: () => ``
  },

  // --- CURSORS ---
  cursor_neon: {
    category: "cursors",
    name: { fr: "Curseur: Traînée Néon", en: "Cursor: Neon Spark Trail" },
    inputs: [],
    html: () => `<canvas id="cursor-canvas"></canvas><div class="helper-msg">Move your mouse to draw neon trails ⚡</div>`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; }
#cursor-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 9999; }
.helper-msg { color: #475569; font-weight: 600; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase; text-shadow: 0 0 8px rgba(0,0,0,0.5); }
`,
    js: (cPrim, cSec) => `
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
const points = [];
window.addEventListener('mousemove', (e) => {
  points.push({ x: e.clientX, y: e.clientY, alpha: 1.0 });
});
function draw() {
  ctx.clearRect(0, 0, w, h);
  for (let i = points.length - 1; i >= 0; i--) {
    const pt = points[i];
    pt.alpha -= 0.03;
    if (pt.alpha <= 0) {
      points.splice(i, 1);
    } else {
      ctx.globalAlpha = pt.alpha;
      ctx.fillStyle = i % 2 === 0 ? '${cPrim}' : '${cSec}';
      ctx.shadowBlur = 15;
      ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6 + (1 - pt.alpha) * 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.shadowBlur = 0;
  requestAnimationFrame(draw);
}
draw();
`
  },

  cursor_gooey: {
    category: "cursors",
    name: { fr: "Curseur: Liquide Gooey", en: "Cursor: Gooey Liquid Orb" },
    inputs: [],
    html: () => `
<div class="cursor-goo-wrap">
  <div class="cursor-dot" id="cursor-dot"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="cursor-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
<div class="helper-msg">Gooey liquid cursor active 💧</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; cursor: none; }
.cursor-goo-wrap { position: fixed; inset: 0; pointer-events: none; filter: url('#cursor-goo'); z-index: 9999; }
.cursor-dot {
  position: absolute; width: 26px; height: 26px; background: ${cPrim}; border-radius: 50%;
  transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background 0.3s;
  box-shadow: 0 0 10px ${cPrim};
}
.helper-msg { color: #475569; font-weight: 600; font-size: 15px; text-transform: uppercase; }
`,
    js: (cPrim, cSec) => `
const dot = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;
let velX = 0, velY = 0, lastX = 0, lastY = 0;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  velX = Math.abs(e.clientX - lastX);
  velY = Math.abs(e.clientY - lastY);
  lastX = e.clientX;
  lastY = e.clientY;
});
function animate() {
  const speed = Math.sqrt(velX * velX + velY * velY);
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  dot.style.left = cx + 'px';
  dot.style.top = cy + 'px';
  if (speed > 5) {
    const scaleX = 1 + Math.min(speed * 0.015, 0.6);
    const scaleY = 1 - Math.min(speed * 0.01, 0.4);
    dot.style.width = (26 * scaleX) + 'px';
    dot.style.height = (26 * scaleY) + 'px';
    dot.style.background = '${cSec}';
  } else {
    dot.style.width = '26px';
    dot.style.height = '26px';
    dot.style.background = '${cPrim}';
  }
  velX *= 0.9;
  velY *= 0.9;
  requestAnimationFrame(animate);
}
animate();
`
  },

  // --- TYPOGRAPHY (Interactive drag and rotate enabled) ---
  text_glass: {
    category: "typography",
    name: { fr: "Typographie: Verre Glissant 3D", en: "Typography: Draggable Glass 3D" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="glass-text-container">
  <h1 class="glass-text" id="drag-text" data-text="${text}">${text}</h1>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020617; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; user-select: none; }
.glass-text-container { perspective: 800px; }
.glass-text {
  font-size: 64px; font-weight: 900; color: rgba(255,255,255,0.85); position: relative;
  text-transform: uppercase; letter-spacing: 4px; transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-10deg); cursor: grab;
  text-shadow: 
    0 1px 0 rgba(255,255,255,0.4), 
    0 2px 0 rgba(255,255,255,0.3),
    0 15px 30px rgba(0, 240, 255, 0.2);
  transition: transform 0.1s ease;
}
.glass-text:active { cursor: grabbing; }
.glass-text:before {
  content: attr(data-text); position: absolute; inset: 0; color: transparent;
  -webkit-text-stroke: 2px ${cPrim}; transform: translateZ(-25px); opacity: 0.5;
  filter: blur(2px);
}
`,
    js: () => `
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 15, y: -10 };
const text = document.getElementById('drag-text');
document.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.6;
  rot.x -= dy * 0.6;
  text.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  text_chrome: {
    category: "typography",
    name: { fr: "Typographie: Chrome Glissant 3D", en: "Typography: Draggable Chrome 3D" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="chrome-wrap">
  <h1 class="chrome-txt" id="drag-text">${text}</h1>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; user-select: none; }
.chrome-wrap { perspective: 800px; }
.chrome-txt {
  font-size: 70px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;
  background: linear-gradient(180deg, #fff 0%, ${cPrim} 35%, #000 50%, ${cSec} 65%, #fff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.15)) drop-shadow(0 5px 15px ${cPrim}50);
  transform: rotateX(15deg) rotateY(-10deg); cursor: grab; transition: transform 0.1s ease;
}
.chrome-txt:active { cursor: grabbing; }
`,
    js: () => `
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 15, y: -10 };
const text = document.getElementById('drag-text');
document.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.6;
  rot.x -= dy * 0.6;
  text.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  text_neon: {
    category: "typography",
    name: { fr: "Typographie: Néon Pulsant 3D", en: "Typography: Draggable Neon 3D" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="neon-wrap">
  <h1 class="neon-txt" id="drag-text" style="--c1: ${cPrim}; --c2: ${cSec};">${text}</h1>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; user-select: none; }
.neon-wrap { perspective: 800px; }
.neon-txt {
  font-size: 64px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase;
  color: #fff; text-shadow: 0 0 10px var(--c1), 0 0 30px var(--c2);
  transform: rotateX(15deg) rotateY(-10deg); cursor: grab; transition: transform 0.1s ease;
}
.neon-txt:active { cursor: grabbing; }
`,
    js: () => `
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 15, y: -10 };
const text = document.getElementById('drag-text');
document.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.6;
  rot.x -= dy * 0.6;
  text.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  console_crt: {
    category: "typography",
    name: { fr: "Console Rétro CRT 3D", en: "3D Retro CRT Console" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="crt-case" id="crt-monitor">
  <div class="crt-bezel">
    <div class="crt-screen">
      <div class="scanlines"></div>
      <div class="crt-glow-overlay"></div>
      <div class="terminal-body" id="term-body">
        <div style="color: ${cPrim}; font-weight: 700; text-shadow: 0 0 5px ${cPrim};">> BOOTING IA CORE...</div>
        <div style="color: ${cPrim}; font-weight: 700; text-shadow: 0 0 5px ${cPrim};">> SYS_VAL: ${text}</div>
        <div style="color: ${cSec}; margin-top: 8px; font-family: monospace;" id="typed-text">> _</div>
      </div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: monospace; overflow: hidden; perspective: 1000px; user-select: none; }
.crt-case {
  position: relative; width: 340px; height: 260px; background: #1e293b; border-radius: 20px;
  border: 6px solid #0f172a; box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  transform-style: preserve-3d; transform: rotateX(15deg) rotateY(-10deg);
  transition: transform 0.1s ease; cursor: grab;
}
.crt-case:active { cursor: grabbing; }
.crt-bezel { position: absolute; inset: 12px; background: #0f172a; border-radius: 12px; padding: 10px; }
.crt-screen {
  position: relative; width: 100%; height: 100%; background: #022c22; border-radius: 8px;
  overflow-y: auto; padding: 14px; box-sizing: border-box; border: 2px solid #064e3b;
}
.scanlines {
  position: absolute; inset: 0; pointer-events: none; z-index: 5;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 4px, 6px 100%;
}
.crt-glow-overlay {
  position: absolute; inset: 0; pointer-events: none; z-index: 4;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 80%);
}
.terminal-body { 
  font-size: 12px; 
  line-height: 1.5; 
  color: #10b981; 
  word-wrap: break-word; 
  word-break: break-all; 
  white-space: pre-wrap;
}
`,
    js: () => `
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 15, y: -10 };
const monitor = document.getElementById('crt-monitor');

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.5;
  rot.x -= dy * 0.5;
  monitor.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });

// Interactive Key stroke listening in console
const typed = document.getElementById('typed-text');
let currentInput = "";
window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key.length === 1) {
    currentInput += e.key;
  }
  typed.textContent = "> " + currentInput + "_";
});
`
  },

  // --- BACKGROUND ASSETS ---
  floating_bg: {
    category: "background_assets",
    name: { fr: "Arrière-plan: Lettres Flottantes", en: "Background: Floating 3D Text Particles" },
    inputs: ["text"],
    html: () => `<canvas id="bg-canvas"></canvas><div class="bg-help">Move mouse to repel floating elements 🎈</div>`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; }
#bg-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.bg-help { position: relative; z-index: 2; color: #475569; font-weight: 700; font-size: 14px; text-transform: uppercase; }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
const items = [];
const word = "${text}" || "3D";
const letters = word.split('');
class FloatingItem {
  constructor(char) {
    this.char = char;
    this.x = Math.random() * w; this.y = Math.random() * h;
    this.size = Math.random() * 24 + 16;
    this.speedX = (Math.random() - 0.5) * 1.5; this.speedY = (Math.random() - 0.5) * 1.5;
    this.baseSpeedX = this.speedX; this.baseSpeedY = this.speedY;
    this.color = Math.random() > 0.5 ? '${cPrim}' : '${cSec}';
    this.rot = Math.random() * Math.PI; this.rotSpeed = (Math.random() - 0.5) * 0.02;
  }
  update(mx, my) {
    const dx = this.x - mx; const dy = this.y - my;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) {
      const force = (120 - dist) / 120;
      this.speedX += (dx / dist) * force * 4;
      this.speedY += (dy / dist) * force * 4;
    }
    this.x += this.speedX; this.y += this.speedY;
    this.speedX *= 0.92; this.speedY *= 0.92; // high friction
    this.x += this.baseSpeedX; this.y += this.baseSpeedY; // continuous drift
    this.rot += this.rotSpeed;
    if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
  }
  draw() {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rot);
    ctx.fillStyle = this.color; ctx.globalAlpha = 0.25;
    ctx.font = '700 ' + this.size + 'px Space Grotesk';
    ctx.fillText(this.char, 0, 0); ctx.restore();
  }
}
for(let i=0; i<40; i++) {
  items.push(new FloatingItem(letters[i % letters.length]));
}
let mx = -9999, my = -9999;
window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
function animate() {
  ctx.clearRect(0,0,w,h);
  items.forEach(it => {
    it.update(mx, my); it.draw();
  });
  requestAnimationFrame(animate);
}
animate();
`
  },

  floating_spheres: {
    category: "background_assets",
    name: { fr: "Arrière-plan: Sphères 3D Interactives", en: "Background: Interactive 3D Spheres" },
    inputs: [],
    html: () => `<canvas id="spheres-canvas"></canvas><div class="bg-help">Move mouse to disturb floating 3D spheres 🔮</div>`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; overflow: hidden; }
#spheres-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.bg-help { position: relative; z-index: 2; color: #475569; font-weight: 700; font-size: 14px; text-transform: uppercase; }
`,
    js: (cPrim, cSec) => `
const canvas = document.getElementById('spheres-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
const spheres = [];
class Sphere {
  constructor() {
    this.x = Math.random() * w; this.y = Math.random() * h;
    this.r = Math.random() * 30 + 15;
    this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2;
    this.c1 = '${cPrim}'; this.c2 = '${cSec}';
  }
  update(mx, my) {
    const dx = this.x - mx; const dy = this.y - my;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.vx += (dx / dist) * force * 1.5;
      this.vy += (dy / dist) * force * 1.5;
    }
    this.x += this.vx; this.y += this.vy;
    this.vx *= 0.95; this.vy *= 0.95; // friction
    if (this.x - this.r < 0 || this.x + this.r > w) this.vx *= -1;
    if (this.y - this.r < 0 || this.y + this.r > h) this.vy *= -1;
  }
  draw() {
    const grad = ctx.createRadialGradient(this.x - this.r/3, this.y - this.r/3, this.r/10, this.x, this.y, this.r);
    grad.addColorStop(0, '#fff'); grad.addColorStop(0.3, this.c1); grad.addColorStop(1, this.c2);
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); ctx.fill();
  }
}
for (let i=0; i<30; i++) spheres.push(new Sphere());
let mx = -9999, my = -9999;
window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
function animate() {
  ctx.clearRect(0,0,w,h);
  spheres.forEach(s => {
    s.update(mx, my); s.draw();
  });
  requestAnimationFrame(animate);
}
animate();
`
  },

  // --- CORNER BADGES ---
  badge_specular: {
    category: "corner_badges",
    name: { fr: "Ruban: Spéculaire 3D", en: "Ribbon: 3D Specular Ribbon" },
    inputs: ["text"],
    html: (text, cPrim, cSec) => `
<div class="corner-ribbon-wrap">
  <div class="ribbon-3d" style="--c1: ${cPrim}; --c2: ${cSec};">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
.corner-ribbon-wrap {
  position: absolute; top: 0; right: 0; width: 150px; height: 150px; overflow: hidden;
}
.ribbon-3d {
  position: absolute; top: 30px; right: -40px; width: 180px; padding: 10px 0;
  text-align: center; color: #fff; font-weight: 700; font-size: 13px; letter-spacing: 1px;
  background: linear-gradient(135deg, var(--c1), var(--c2)); transform: rotate(45deg);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15);
  animation: shine-sweep 3s infinite linear; background-size: 200% auto;
}
@keyframes shine-sweep {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
`,
    js: () => ``
  },

  // --- DATA VIZ ---
  bar_chart_3d: {
    category: "data_viz",
    name: { fr: "Graphique en Barres 3D", en: "3D Bar Chart" },
    inputs: ["text"],
    defaultText: { fr: "50, 85, 60, 95, 70", en: "50, 85, 60, 95, 70" },
    html: (text, cPrim, cSec) => `
<div class="chart-scene" id="chart-scene">
  <div class="chart-container" id="chart-container" style="--c1: ${cPrim}; --c2: ${cSec};">
    <!-- Dynamic bars injected here -->
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; user-select: none; }
.chart-scene { width: 450px; height: 350px; display: flex; justify-content: center; align-items: center; cursor: grab; }
.chart-scene:active { cursor: grabbing; }
.chart-container {
  position: relative; width: 320px; height: 200px; transform-style: preserve-3d;
  transform: rotateX(25deg) rotateY(-35deg); transition: transform 0.1s ease;
  border-bottom: 4px solid #475569; border-left: 4px solid #475569;
  display: flex; justify-content: space-around; align-items: flex-end; padding: 0 10px;
}
.bar-3d {
  position: relative; width: 32px; height: var(--h, 10px);
  background: var(--c1); transform-style: preserve-3d;
  transition: transform 0.3s ease, height 0.5s ease;
  box-shadow: 0 0 15px var(--c1)30;
}
.bar-3d:hover { transform: translateZ(15px); background: var(--c2); }
.bar-face { position: absolute; background: inherit; }
/* 3D Sides */
.bar-top {
  top: 0; left: 0; width: 32px; height: 32px; background: rgba(255,255,255,0.25);
  transform: rotateX(90deg) translateZ(16px);
}
.bar-right {
  top: 0; right: 0; width: 32px; height: 100%;
  transform: rotateY(90deg) translateZ(16px); background: rgba(0,0,0,0.3);
}
.bar-lbl {
  position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%) rotateX(-15deg);
  color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase;
}
.bar-val {
  position: absolute; top: -35px; left: 50%; transform: translateX(-50%) translateZ(10px);
  color: #fff; font-size: 12px; font-weight: 700; opacity: 0; transition: opacity 0.2s ease;
  background: #0f172a; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);
}
.bar-3d:hover .bar-val { opacity: 1; }
`,
    js: (text) => `
const container = document.getElementById('chart-container');
const scene = document.getElementById('chart-scene');
const rawData = "${text}";
let values = rawData.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));

// Safety fallback if no comma-separated numbers are entered
if (values.length < 3) {
  values = [50, 85, 60, 95, 70];
}

const labels = ["A", "B", "C", "D", "E", "F", "G"];

// Inject 3D bars
container.innerHTML = '';
values.forEach((val, i) => {
  const bar = document.createElement('div');
  bar.className = 'bar-3d';
  bar.style.setProperty('--h', Math.min(200, val * 1.8) + 'px');
  bar.innerHTML = \`
    <div class="bar-face bar-top"></div>
    <div class="bar-face bar-right"></div>
    <div class="bar-lbl">\${labels[i % labels.length]}</div>
    <div class="bar-val">\${val}%</div>
  \`;
  container.appendChild(bar);
});

// Drag to rotate chart
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 25, y: -35 };
scene.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.5;
  rot.x -= dy * 0.5;
  container.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  vinyl_player_3d: {
    category: "audio_players",
    name: { fr: "Lecteur Vinyle Glassmorphic 3D", en: "3D Glassmorphic Vinyl Player" },
    inputs: ["text"],
    defaultText: { fr: "Midnight City - M83", en: "Midnight City - M83" },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : [text, "Retro Synth"];
      const song = parts[0] ? parts[0].trim() : "Music Track";
      const artist = parts[1] ? parts[1].trim() : "Retro Synth";
      return `
<div class="player-card" id="player-card" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="player-interior">
    <div class="vinyl-deck">
      <div class="vinyl-disc-wrap">
        <div class="vinyl-disc" id="vinyl">
          <div class="vinyl-groove"></div>
          <div class="vinyl-center"></div>
        </div>
      </div>
      <div class="tonearm" id="tonearm">
        <div class="tonearm-pivot"></div>
        <div class="tonearm-shaft"></div>
        <div class="tonearm-head"></div>
      </div>
    </div>
    <div class="track-details">
      <h3>${song}</h3>
      <p>${artist}</p>
    </div>
    <div class="visualizer-container">
      <canvas id="vis-canvas"></canvas>
    </div>
    <div class="controls">
      <button class="ctrl-btn" id="play-btn">▶</button>
    </div>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.player-card {
  position: relative; width: 300px; height: 410px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 24px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transform-style: preserve-3d;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5); transition: transform 0.1s ease;
}
.player-interior { display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; transform: translateZ(40px); }
.vinyl-deck { position: relative; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; }
.vinyl-disc-wrap {
  width: 170px; height: 170px; display: flex; align-items: center; justify-content: center;
  background: #09090b; border-radius: 50%; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  border: 2px solid #1e293b;
}
.vinyl-disc {
  position: relative; width: 155px; height: 155px; background: repeating-radial-gradient(circle, #18181b, #09090b 4px, #020617 8px);
  border-radius: 50%; border: 3px solid #18181b; box-shadow: 0 0 10px rgba(0,0,0,0.7);
}
.vinyl-disc.playing { animation: spin-vinyl 3s linear infinite; }
@keyframes spin-vinyl { 100% { transform: rotate(360deg); } }
.vinyl-groove { position: absolute; inset: 15px; border: 1px solid rgba(255,255,255,0.03); border-radius: 50%; }
.vinyl-center {
  position: absolute; inset: 52px; background: var(--c1); border-radius: 50%;
  border: 3px solid #000; box-shadow: inset 0 0 5px rgba(255,255,255,0.4);
}
/* Tonearm Needle styling */
.tonearm {
  position: absolute; top: 10px; right: 10px; width: 60px; height: 100px;
  pointer-events: none; transform-origin: 30px 10px; transition: transform 0.5s ease;
  transform: rotate(-30deg); z-index: 10;
}
.tonearm.playing { transform: rotate(2deg); }
.tonearm-pivot { width: 20px; height: 20px; background: #64748b; border-radius: 50%; border: 2px solid #334155; position: absolute; top: 0; right: 10px; }
.tonearm-shaft { width: 4px; height: 80px; background: #94a3b8; position: absolute; top: 10px; right: 18px; transform: rotate(-5deg); transform-origin: top; }
.tonearm-head { width: 10px; height: 16px; background: #475569; position: absolute; bottom: 8px; right: 20px; border-radius: 2px; }

.track-details { text-align: center; margin-top: 10px; }
.track-details h3 { margin: 0; color: #fff; font-size: 16px; font-family: 'Space Grotesk', sans-serif; }
.track-details p { margin: 4px 0 0 0; color: var(--c2); font-size: 12px; font-weight: 600; text-transform: uppercase; }
.visualizer-container { width: 100%; height: 40px; background: rgba(0,0,0,0.25); border-radius: 12px; margin: 10px 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
#vis-canvas { width: 100%; height: 100%; }
.controls { display: flex; justify-content: center; }
.ctrl-btn {
  width: 46px; height: 46px; border-radius: 50%; border: none;
  background: var(--c1); color: #fff; font-size: 18px; font-weight: 700; cursor: pointer;
  box-shadow: 0 8px 20px var(--c1)40; transition: transform 0.2s, background 0.3s;
}
.ctrl-btn:hover { background: var(--c2); transform: scale(1.05); }
`,
    js: () => `
const card = document.getElementById('player-card');
const vinyl = document.getElementById('vinyl');
const tonearm = document.getElementById('tonearm');
const playBtn = document.getElementById('play-btn');
const canvas = document.getElementById('vis-canvas');
const ctx = canvas.getContext('2d');

let isPlaying = false;
playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  vinyl.classList.toggle('playing', isPlaying);
  tonearm.classList.toggle('playing', isPlaying);
  playBtn.textContent = isPlaying ? "‖" : "▶";
});

// Card Parallax
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Mock visualizer
let w = canvas.width = 250;
let h = canvas.height = 40;
let angle = 0;
function drawVisualizer() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = isPlaying ? '#10b981' : '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const y = h/2 + Math.sin(x * 0.07 + angle) * (isPlaying ? 12 : 1.5);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  angle += 0.18;
  requestAnimationFrame(drawVisualizer);
}
drawVisualizer();
`
  },

  dna_helix_3d: {
    category: "loaders",
    name: { fr: "Spirale ADN Holographique 3D", en: "3D Holographic DNA Helix" },
    inputs: ["text"],
    defaultText: { fr: "CHARGEMENT...", en: "LOADING..." },
    html: (text) => `
<div class="loader-wrap">
  <div class="grid-bg"></div>
  <canvas id="dna-canvas"></canvas>
  <div class="loader-lbl">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
.loader-wrap { position: relative; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.grid-bg {
  position: absolute; inset: -40px; pointer-events: none; z-index: 1; opacity: 0.15;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
#dna-canvas { position: relative; z-index: 2; width: 280px; height: 180px; }
.loader-lbl { color: #fff; font-size: 15px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; animation: pulse-lbl 1.5s infinite ease-in-out; }
@keyframes pulse-lbl { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = 280;
let h = canvas.height = 180;
let angle = 0;

function drawDNA() {
  ctx.clearRect(0, 0, w, h);
  const numNodes = 20;
  const spacing = w / (numNodes + 1);

  for (let i = 0; i < numNodes; i++) {
    const x = (i + 1) * spacing;
    const a = angle + i * 0.35;
    const y1 = h/2 + Math.sin(a) * 40;
    const y2 = h/2 + Math.sin(a + Math.PI) * 40;
    const size1 = 5 + Math.cos(a) * 3;
    const size2 = 5 + Math.cos(a + Math.PI) * 3;

    // Draw connector line
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();

    // Node 1
    ctx.fillStyle = Math.sin(a) > 0 ? '${cPrim}' : '${cSec}';
    ctx.shadowBlur = 8;
    ctx.shadowColor = ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(x, y1, size1, 0, Math.PI * 2);
    ctx.fill();

    // Node 2
    ctx.fillStyle = Math.sin(a + Math.PI) > 0 ? '${cPrim}' : '${cSec}';
    ctx.shadowBlur = 8;
    ctx.shadowColor = ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(x, y2, size2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  angle += 0.04;
  requestAnimationFrame(drawDNA);
}
drawDNA();
`
  },

  coverflow_3d: {
    category: "carousels",
    name: { fr: "Carrousel Coverflow 3D", en: "3D Product Coverflow" },
    inputs: ["text"],
    defaultText: { fr: "Ordinateur, Smartphone, Montre Connectée", en: "MacBook, iPhone, Smartwatch" },
    html: (text, cPrim, cSec) => `
<div class="cover-scene" id="cover-scene">
  <div class="cover-container" id="cover-container" style="--c1: ${cPrim}; --c2: ${cSec};">
    <!-- Dynamic cards injected here -->
  </div>
  <div class="nav-arrows">
    <button id="prev-arrow" class="arrow-btn">◀</button>
    <button id="next-arrow" class="arrow-btn">▶</button>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; user-select: none; }
.cover-scene { position: relative; width: 500px; height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: grab; }
.cover-scene:active { cursor: grabbing; }
.cover-container {
  position: relative; width: 200px; height: 260px; transform-style: preserve-3d;
  transition: transform 0.5s ease;
}
.cover-card {
  position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 24px; box-sizing: border-box;
  display: flex; flex-direction: column; justify-content: space-between;
  backface-visibility: hidden; transform-style: preserve-3d;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.cover-card.active { border-color: var(--c1); box-shadow: 0 0 25px var(--c1)30; opacity: 1; }
.cover-card:not(.active) { opacity: 0.5; }
.cover-title { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 18px; font-weight: 700; }
.cover-icon { font-size: 40px; color: var(--c2); filter: drop-shadow(0 0 10px var(--c2)); }

.nav-arrows { display: flex; gap: 20px; margin-top: 25px; z-index: 100; }
.arrow-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: #fff; width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: 14px;
  transition: all 0.2s ease;
}
.arrow-btn:hover { background: var(--c1); border-color: var(--c1); transform: scale(1.1); }
`,
    js: (text) => `
const container = document.getElementById('cover-container');
const scene = document.getElementById('cover-scene');
const prevBtn = document.getElementById('prev-arrow');
const nextBtn = document.getElementById('next-arrow');

const raw = "${text}";
let items = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);

// Fallback to beautiful default set if user inputs basic text
if (items.length < 2) {
  items = ["Laptop", "Smartphone", "Smartwatch", "Headphones"];
}

const icons = ["💻", "📱", "⌚", "🎧", "📺"];

container.innerHTML = '';
items.forEach((name, i) => {
  const card = document.createElement('div');
  card.className = \`cover-card \${i === 0 ? 'active' : ''}\`;
  card.innerHTML = \`
    <div class="cover-icon">\${icons[i % icons.length]}</div>
    <div class="cover-title">\${name}</div>
  \`;
  container.appendChild(card);
});

const cards = Array.from(container.children);
let activeIndex = 0;

function updateLayout() {
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === activeIndex);
    const offset = i - activeIndex;
    if (offset === 0) {
      card.style.transform = 'translateZ(0px) rotateY(0deg)';
      card.style.zIndex = 10;
    } else if (offset === 1) {
      card.style.transform = 'translateX(130px) translateZ(-80px) rotateY(-35deg)';
      card.style.zIndex = 5;
    } else if (offset === -1) {
      card.style.transform = 'translateX(-130px) translateZ(-80px) rotateY(35deg)';
      card.style.zIndex = 5;
    } else {
      card.style.transform = \`translateX(\${offset * 160}px) translateZ(-150px) rotateY(-\${offset * 15}deg)\`;
      card.style.zIndex = 1;
    }
  });
}
updateLayout();

prevBtn.addEventListener('click', () => {
  if (activeIndex > 0) activeIndex--;
  updateLayout();
});
nextBtn.addEventListener('click', () => {
  if (activeIndex < cards.length - 1) activeIndex++;
  updateLayout();
});

// Drag support
let startX = 0;
let isDragging = false;
scene.addEventListener('mousedown', (e) => {
  startX = e.clientX; isDragging = true;
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 50) {
    if (dx > 0 && activeIndex > 0) activeIndex--;
    else if (dx < 0 && activeIndex < cards.length - 1) activeIndex++;
    updateLayout();
    startX = e.clientX;
  }
});
document.addEventListener('mouseup', () => isDragging = false);
`
  },

  phone_mockup_3d: {
    category: "parallax_cards",
    name: { fr: "Mockup Smartphone 3D", en: "3D Smartphone Mockup" },
    inputs: ["text"],
    defaultText: { fr: "IA STUDIO 3D", en: "IA STUDIO 3D" },
    html: (text, cPrim, cSec) => `
<div class="phone-scene" id="phone-scene">
  <div class="phone-wrapper" id="phone-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="phone-body" id="phone-body">
      <!-- FRONT FACE -->
      <div class="phone-front">
        <div class="phone-bezel">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="phone-status">
              <span>12:30</span>
              <span>🔋 100%</span>
            </div>
            <div class="phone-content-glow">
              <span class="phone-icon">⚡</span>
              <h1 class="phone-txt">${text}</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- BACK FACE -->
      <div class="phone-back">
        <div class="camera-bump">
          <div class="lens"></div>
          <div class="lens"></div>
          <div class="lens"></div>
          <div class="flash"></div>
        </div>
        <div class="brand-logo">⚡</div>
      </div>
    </div>
  </div>
  <button class="rotate-btn" id="rotate-phone-btn">⇄ ROTATE 3D</button>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; user-select: none; }
.phone-scene { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.phone-wrapper {
  width: 200px; height: 380px; position: relative; transform-style: preserve-3d;
  transition: transform 0.1s ease;
}
.phone-body {
  position: absolute; inset: 0; transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.phone-body.flipped { transform: rotateY(180deg); }
.phone-front, .phone-back {
  position: absolute; inset: 0; backface-visibility: hidden;
  border-radius: 32px; border: 4px solid #1e293b; box-shadow: 0 25px 50px rgba(0,0,0,0.6);
}
/* Front styling */
.phone-front {
  background: #020205; display: flex; align-items: center; justify-content: center; padding: 6px; box-sizing: border-box;
}
.phone-bezel {
  position: relative; width: 100%; height: 100%; background: #000; border-radius: 26px; overflow: hidden;
  display: flex; flex-direction: column; justify-content: space-between; padding: 12px; box-sizing: border-box;
}
.phone-notch {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 90px; height: 20px; background: #000; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; z-index: 10;
}
.phone-screen {
  position: relative; width: 100%; height: 100%; background: radial-gradient(circle, #0f172a, #030712);
  border-radius: 18px; display: flex; flex-direction: column; justify-content: space-between; padding-top: 15px; box-sizing: border-box;
}
.phone-status { display: flex; justify-content: space-between; font-size: 8px; color: #64748b; font-weight: 700; }
.phone-content-glow { margin: auto; text-align: center; display: flex; flex-direction: column; gap: 10px; }
.phone-icon { font-size: 36px; color: var(--c1); filter: drop-shadow(0 0 10px var(--c1)); }
.phone-txt { margin: 0; font-size: 14px; font-weight: 700; color: #fff; text-shadow: 0 0 8px var(--c1)60; }
/* Back styling */
.phone-back {
  background: linear-gradient(135deg, #1e1b4b 0%, #020205 100%);
  transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: space-between;
  padding: 24px; box-sizing: border-box; border-color: var(--c1);
}
.camera-bump {
  width: 70px; height: 70px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; box-sizing: border-box;
}
.lens { background: #000; border-radius: 50%; border: 2px solid #334155; }
.lens:nth-child(3) { grid-column: span 1; }
.flash { width: 10px; height: 10px; background: #fcd34d; border-radius: 50%; margin: auto; }
.brand-logo { margin: auto auto 20px auto; font-size: 24px; color: var(--c2); opacity: 0.8; }
.rotate-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: #fff; padding: 10px 22px; border-radius: 20px; font-weight: 700; font-size: 12px;
  cursor: pointer; transition: all 0.2s ease;
}
.rotate-btn:hover { background: var(--c1); border-color: var(--c1); transform: translateY(-2px); }
`,
    js: () => `
const wrap = document.getElementById('phone-wrap');
const body = document.getElementById('phone-body');
const rotBtn = document.getElementById('rotate-phone-btn');

rotBtn.addEventListener('click', () => {
  body.classList.toggle('flipped');
});

document.addEventListener('mousemove', (e) => {
  if (body.classList.contains('flipped')) return;
  const r = wrap.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  wrap.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  if (body.classList.contains('flipped')) return;
  wrap.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  pricing_card_3d: {
    category: "parallax_cards",
    name: { fr: "Carte Tarifs Parallaxe 3D", en: "3D Parallax Pricing Card" },
    inputs: ["text"],
    defaultText: { fr: "PRO PLAN - 29€", en: "PRO PLAN - $29" },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : [text, "$29"];
      const title = parts[0] ? parts[0].trim() : "Plan Name";
      const cost = parts[1] ? parts[1].trim() : "$29";
      return `
<div class="price-scene" id="price-scene">
  <div class="pricing-card-3d" id="price-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="pricing-badge">POPULAR</div>
    <h2 class="pricing-title">${title}</h2>
    <div class="pricing-cost">${cost}</div>
    <ul class="pricing-features">
      <li>⚡ Unlimited 3D Exports</li>
      <li>🎨 Custom Specular Shaders</li>
      <li>🎧 Web Audio Soundpacks</li>
    </ul>
    <button class="pricing-btn">Get Started</button>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.price-scene { width: 360px; height: 420px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
.pricing-card-3d {
  position: relative; width: 300px; height: 380px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 32px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transform-style: preserve-3d;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5); transition: transform 0.1s ease;
  display: flex; flex-direction: column; justify-content: space-between;
}
.pricing-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%) translateZ(30px);
  background: linear-gradient(135deg, var(--c1), var(--c2)); color: #fff; font-size: 10px;
  font-weight: 800; padding: 6px 16px; border-radius: 20px; letter-spacing: 1px;
}
.pricing-title { color: #94a3b8; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; transform: translateZ(20px); }
.pricing-cost { color: #fff; font-size: 36px; font-weight: 900; font-family: 'Space Grotesk', sans-serif; transform: translateZ(50px); text-shadow: 0 0 15px var(--c1)40; }
.pricing-features { list-style: none; padding: 0; margin: 15px 0; display: flex; flex-direction: column; gap: 10px; transform: translateZ(25px); }
.pricing-features li { color: #cbd5e1; font-size: 13px; font-weight: 500; }
.pricing-btn {
  background: #fff; color: #000; border: none; padding: 14px; border-radius: 12px;
  font-weight: 700; font-size: 13px; cursor: pointer; transform: translateZ(35px);
  transition: all 0.2s ease;
}
.pricing-btn:hover { background: var(--c1); color: #fff; box-shadow: 0 5px 15px var(--c1)50; }
`,
    js: () => `
const card = document.getElementById('price-card');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  holo_portal_3d: {
    category: "background_assets",
    name: { fr: "Portail Holographique 3D", en: "3D Holographic Portal" },
    inputs: ["text"],
    defaultText: { fr: "PORTAIL 3D", en: "3D PORTAL" },
    html: (text, cPrim, cSec) => `
<div class="portal-scene">
  <canvas id="portal-canvas"></canvas>
  <div class="portal-core" style="--c1: ${cPrim}; --c2: ${cSec};">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
.portal-scene { position: relative; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
#portal-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
.portal-core {
  position: relative; z-index: 2; color: #fff; font-size: 26px; font-weight: 900;
  letter-spacing: 4px; text-transform: uppercase; text-shadow: 0 0 20px var(--c1);
  padding: 40px; border-radius: 50%; border: 2px dashed var(--c2);
  background: rgba(3,7,18,0.8); box-shadow: 0 0 50px var(--c1)30, inset 0 0 30px var(--c1)30;
}
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('portal-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

const rings = [];
const numRings = 6;
for (let i = 0; i < numRings; i++) {
  rings.push({
    r: 100 + i * 40,
    angle: i * (Math.PI / 3),
    speed: (0.01 + i * 0.005) * (i % 2 === 0 ? 1 : -1)
  });
}

let mx = w/2, my = h/2;
window.addEventListener('mousemove', (e) => {
  mx += (e.clientX - mx) * 0.1;
  my += (e.clientY - my) * 0.1;
});

function drawPortal() {
  ctx.clearRect(0,0,w,h);
  ctx.shadowBlur = 15;

  rings.forEach((ring, i) => {
    ring.angle += ring.speed;
    ctx.strokeStyle = i % 2 === 0 ? '${cPrim}' : '${cSec}';
    ctx.shadowColor = ctx.strokeStyle;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.translate(w/2 + (mx - w/2) * (0.05 * i), h/2 + (my - h/2) * (0.05 * i));
    ctx.rotate(ring.angle);
    ctx.beginPath();
    ctx.arc(0, 0, ring.r, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.restore();
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(drawPortal);
}
drawPortal();
`
  },

  isometric_stack_menu: {
    category: "menus",
    name: { fr: "Ménu en Pile Isométrique 3D", en: "3D Isometric Stack Menu" },
    inputs: ["text"],
    defaultText: { fr: "Sign In, Contact, Tutorials, FAQ", en: "Sign In, Contact, Tutorials, FAQ" },
    html: (text, cPrim, cSec) => `
<div class="menu-layout">
  <div class="stack-scene" id="stack-scene">
    <div class="stack-container" id="stack-container" style="--c1: ${cPrim}; --c2: ${cSec};">
      <!-- Dynamic buttons injected here -->
    </div>
  </div>
  
  <div class="display-panel-wrap">
    <div class="display-panel" id="display-panel">
      <div class="panel-placeholder">Select a menu option to load panel...</div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; user-select: none; }
.menu-layout { display: flex; align-items: center; gap: 40px; width: 90%; max-width: 750px; }
.stack-scene { width: 300px; height: 350px; display: flex; justify-content: center; align-items: center; cursor: grab; }
.stack-scene:active { cursor: grabbing; }
.stack-container {
  display: flex; flex-direction: column; gap: 15px;
  transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d;
  transition: transform 0.1s ease;
}
.stack-item {
  position: relative; width: 180px; padding: 14px 20px; background: #1e293b;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #fff;
  font-weight: 700; font-size: 15px; cursor: pointer; text-align: left;
  transform-style: preserve-3d; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: -5px 5px 0px rgba(0,0,0,0.15);
}
.stack-item.active {
  transform: translateZ(25px); background: var(--c1);
  border-color: var(--c2); box-shadow: -15px 15px 25px rgba(0,0,0,0.35), 0 0 15px var(--c1)50;
}
.stack-item:hover:not(.active) {
  transform: translateZ(15px); background: #334155;
}
.stack-lbl { display: flex; align-items: center; gap: 10px; transform: translateZ(10px); }
.stack-icon { font-size: 16px; }

/* Display Panel */
.display-panel-wrap { flex-grow: 1; perspective: 1000px; }
.display-panel {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; min-height: 280px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4); color: #fff;
  display: flex; flex-direction: column; justify-content: center;
  transform: rotateY(5deg); transform-style: preserve-3d;
}
.panel-placeholder { text-align: center; color: #64748b; font-size: 14px; font-weight: 600; }
.fade-in { animation: fadeIn 0.4s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Dynamic Form styling */
.display-panel h3 { margin: 0 0 15px 0; font-size: 20px; font-family: 'Space Grotesk', sans-serif; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
.display-panel input, .display-panel textarea {
  width: 100%; padding: 10px; margin-bottom: 12px; background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; box-sizing: border-box;
  font-family: inherit; font-size: 13px; outline: none;
}
.display-panel input:focus, .display-panel textarea:focus { border-color: var(--c1); }
.panel-btn {
  width: 100%; padding: 12px; border: none; border-radius: 8px; background: var(--c1);
  color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 5px 15px var(--c1)40;
  transition: background 0.3s;
}
.panel-btn:hover { background: var(--c2); }

/* Accordions */
.item-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 8px; margin-bottom: 8px; font-size: 13px; }
`,
    js: (text) => `
const container = document.getElementById('stack-container');
const scene = document.getElementById('stack-scene');
const panel = document.getElementById('display-panel');

const raw = "${text}";
let items = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);
if (items.length < 2) {
  items = ["Sign In", "Contact", "Tutorials", "FAQ"];
}
const icons = ["🔐", "💬", "📖", "❓", "⚙️"];

// Panels library
const panelsContent = {
  "Sign In": \`
    <div class="fade-in">
      <h3>Sign In</h3>
      <input type="email" placeholder="Email Address">
      <input type="password" placeholder="Password">
      <button class="panel-btn">Login</button>
    </div>
  \`,
  "Se connecter": \`
    <div class="fade-in">
      <h3>Se connecter</h3>
      <input type="email" placeholder="Adresse Email">
      <input type="password" placeholder="Mot de passe">
      <button class="panel-btn">Connexion</button>
    </div>
  \`,
  "Contact": \`
    <div class="fade-in">
      <h3>Contact Us</h3>
      <input type="text" placeholder="Your Name">
      <input type="email" placeholder="Email Address">
      <textarea placeholder="Your Message" rows="3"></textarea>
      <button class="panel-btn">Send Message</button>
    </div>
  \`,
  "Tutorials": \`
    <div class="fade-in">
      <h3>Video Tutorials</h3>
      <div class="item-card">🎥 <strong>3D Specular Shaders</strong> (10 mins)</div>
      <div class="item-card">🎥 <strong>Web Audio Integration</strong> (14 mins)</div>
    </div>
  \`,
  "Tutoriels": \`
    <div class="fade-in">
      <h3>Tutoriels Vidéo</h3>
      <div class="item-card">🎥 <strong>Shaders Spéculaires 3D</strong> (10 mins)</div>
      <div class="item-card">🎥 <strong>Intégration Web Audio</strong> (14 mins)</div>
    </div>
  \`,
  "FAQ": \`
    <div class="fade-in">
      <h3>FAQ Accordion</h3>
      <div class="item-card"><strong>Q: Is this modular?</strong><br>A: Yes, copy individual component HTML directly!</div>
    </div>
  \`
};

function renderPanel(key) {
  const normKey = Object.keys(panelsContent).find(k => k.toLowerCase().includes(key.toLowerCase()));
  if (normKey && panelsContent[normKey]) {
    panel.innerHTML = panelsContent[normKey];
  } else {
    // Default fallback contact card
    panel.innerHTML = \`
      <div class="fade-in">
        <h3>\${key}</h3>
        <p style="color: #94a3b8; font-size: 13px;">Interface panel loaded dynamically for item: \${key}.</p>
        <button class="panel-btn">Proceed</button>
      </div>
    \`;
  }
}

container.innerHTML = '';
items.forEach((name, i) => {
  const btn = document.createElement('div');
  btn.className = 'stack-item';
  btn.innerHTML = \`
    <div class="stack-lbl">
      <span class="stack-icon">\${icons[i % icons.length]}</span>
      <span>\${name}</span>
    </div>
  \`;
  btn.addEventListener('click', () => {
    container.querySelectorAll('.stack-item').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    renderPanel(name);
  });
  container.appendChild(btn);
});

// Drag to rotate and straighten isometric stack menu
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 60, y: 0, z: -45 };
scene.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.z += dx * 0.5;
  rot.x -= dy * 0.5;
  container.style.transform = \`rotateX(\${rot.x}deg) rotateZ(\${rot.z}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  macos_dock_menu: {
    category: "menus",
    name: { fr: "Dock de Navigation 3D macOS", en: "3D macOS Dock Navigation" },
    inputs: ["text"],
    defaultText: { fr: "Sign In, Contact, Tutorials, FAQ", en: "Sign In, Contact, Tutorials, FAQ" },
    html: (text, cPrim, cSec) => `
<div class="dock-layout">
  <div class="display-panel-wrap">
    <div class="display-panel" id="display-panel">
      <div class="panel-placeholder">Select a dock item to launch...</div>
    </div>
  </div>

  <div class="dock-scene" id="dock-scene">
    <div class="dock-wrap" id="dock-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
      <!-- Dock items here -->
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Outfit', sans-serif; perspective: 1000px; }
.dock-layout { display: flex; flex-direction: column; align-items: center; gap: 30px; width: 90%; max-width: 500px; }
.display-panel-wrap { width: 100%; }
.display-panel {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; min-height: 200px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4); color: #fff;
  display: flex; flex-direction: column; justify-content: center;
}
.panel-placeholder { text-align: center; color: #64748b; font-size: 13px; font-weight: 600; }
.fade-in { animation: fadeIn 0.4s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Dynamic form style */
.display-panel h3 { margin: 0 0 12px 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
.display-panel input, .display-panel textarea {
  width: 100%; padding: 8px; margin-bottom: 10px; background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; box-sizing: border-box;
  font-family: inherit; font-size: 13px; outline: none;
}
.panel-btn {
  width: 100%; padding: 10px; border: none; border-radius: 8px; background: var(--c1);
  color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 5px 15px var(--c1)40;
}
.item-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; }

.dock-scene { display: flex; justify-content: center; }
.dock-wrap {
  display: flex; align-items: flex-end; gap: 15px; padding: 10px 20px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5); transform-style: preserve-3d;
  transform: rotateX(15deg); transition: transform 0.1s ease;
}
.dock-item {
  position: relative; display: flex; flex-direction: column; align-items: center;
  justify-content: center; width: 44px; height: 44px; background: rgba(255,255,255,0.05);
  border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
  transition: width 0.1s ease, height 0.1s ease, transform 0.1s ease;
}
.dock-item.active { background: var(--c1); border-color: var(--c2); }
.dock-icon { font-size: 18px; transition: font-size 0.1s ease; }
.dock-lbl {
  position: absolute; top: -35px; background: #0f172a; border: 1px solid rgba(255,255,255,0.1);
  color: #fff; font-size: 9px; font-weight: 700; padding: 4px 8px; border-radius: 6px;
  white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
}
.dock-item:hover .dock-lbl { opacity: 1; }
`,
    js: (text) => `
const wrap = document.getElementById('dock-wrap');
const panel = document.getElementById('display-panel');
const raw = "${text}";
let items = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);

if (items.length < 2) {
  items = ["Sign In", "Contact", "Tutorials", "FAQ"];
}
const icons = ["🔐", "💬", "📖", "❓", "⚙️"];

const panelsContent = {
  "Sign In": \`<div class="fade-in"><h3>Sign In</h3><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button class="panel-btn">Login</button></div>\`,
  "Se connecter": \`<div class="fade-in"><h3>Se connecter</h3><input type="email" placeholder="Email"><input type="password" placeholder="Mot de passe"><button class="panel-btn">Connexion</button></div>\`,
  "Contact": \`<div class="fade-in"><h3>Contact Us</h3><input type="text" placeholder="Name"><input type="email" placeholder="Email"><textarea placeholder="Message" rows="2"></textarea><button class="panel-btn">Send</button></div>\`,
  "Tutorials": \`<div class="fade-in"><h3>Tutorials</h3><div class="item-card">🎥 Specular Shaders</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "Tutoriels": \`<div class="fade-in"><h3>Tutoriels</h3><div class="item-card">🎥 Shaders Speculaires</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "FAQ": \`<div class="fade-in"><h3>FAQ</h3><div class="item-card"><strong>Q: Modular?</strong><br>A: Yes!</div></div>\`
};

function renderPanel(key) {
  const normKey = Object.keys(panelsContent).find(k => k.toLowerCase().includes(key.toLowerCase()));
  if (normKey && panelsContent[normKey]) {
    panel.innerHTML = panelsContent[normKey];
  } else {
    panel.innerHTML = \`<div class="fade-in"><h3>\${key}</h3><p style="color: #94a3b8; font-size:12px;">Dynamic panel for \${key}</p></div>\`;
  }
}

wrap.innerHTML = '';
items.forEach((name, i) => {
  const item = document.createElement('div');
  item.className = 'dock-item';
  item.innerHTML = \`
    <span class="dock-icon">\${icons[i % icons.length]}</span>
    <div class="dock-lbl">\${name}</div>
  \`;
  item.addEventListener('click', () => {
    wrap.querySelectorAll('.dock-item').forEach(x => x.classList.remove('active'));
    item.classList.add('active');
    renderPanel(name);
  });
  wrap.appendChild(item);
});

// Magnification simulation
const dockItems = Array.from(wrap.children);
document.addEventListener('mousemove', (e) => {
  const r = wrap.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 12; const ry = ((x / r.width) - 0.5) * 12;
  wrap.style.transform = \`rotateX(\${15 + rx}deg) rotateY(\${ry}deg)\`;

  dockItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const dist = Math.abs(e.clientX - itemCenter);
    if (dist < 120) {
      const factor = (120 - dist) / 120;
      const size = 44 + factor * 20;
      item.style.width = size + 'px';
      item.style.height = size + 'px';
      item.querySelector('.dock-icon').style.fontSize = (18 + factor * 6) + 'px';
    } else {
      item.style.width = '44px';
      item.style.height = '44px';
      item.querySelector('.dock-icon').style.fontSize = '18px';
    }
  });
});
wrap.addEventListener('mouseleave', () => {
  wrap.style.transform = 'rotateX(15deg) rotateY(0deg)';
  dockItems.forEach(item => {
    item.style.width = '44px';
    item.style.height = '44px';
    item.querySelector('.dock-icon').style.fontSize = '18px';
  });
});
`
  },

  fluid_tab_menu: {
    category: "menus",
    name: { fr: "Menu Onglets à Fluide Liquide", en: "3D Fluid Tab Menu" },
    inputs: ["text"],
    defaultText: { fr: "Sign In, Contact, Tutorials, FAQ", en: "Sign In, Contact, Tutorials, FAQ" },
    html: (text, cPrim, cSec) => `
<div class="tab-layout">
  <div class="tab-scene">
    <div class="tab-wrap">
      <!-- GOOEY BG TRACKER (Only this is filtered to protect text sharpness) -->
      <div class="gooey-container" style="--c1: ${cPrim}; --c2: ${cSec};">
        <div class="fluid-blob" id="fluid-blob"></div>
        <div class="gooey-track"></div>
      </div>
      
      <!-- FOREGROUND LABELS LAYER (Crisp render!) -->
      <div class="tab-items-container" id="tab-container">
        <!-- Tabs injected here -->
      </div>
    </div>
  </div>

  <div class="display-panel-wrap">
    <div class="display-panel" id="display-panel">
      <div class="panel-placeholder">Select a tab button...</div>
    </div>
  </div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="fluid-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; }
.tab-layout { display: flex; flex-direction: column; align-items: center; gap: 30px; width: 90%; max-width: 500px; }
.tab-scene { display: flex; justify-content: center; width: 100%; }
.tab-wrap { position: relative; display: inline-block; padding: 6px; }

/* Gooey background layer */
.gooey-container {
  position: absolute; inset: 0; filter: url('#fluid-goo'); pointer-events: none; z-index: 1;
}
.gooey-track {
  position: absolute; inset: 6px; background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 30px;
}
.fluid-blob {
  position: absolute; top: 6px; left: 6px; height: calc(100% - 12px); width: 100px;
  background: linear-gradient(135deg, var(--c1), var(--c2)); border-radius: 24px;
  transition: all 0.45s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Foreground labels layer */
.tab-items-container {
  position: relative; z-index: 2; display: flex; align-items: center;
}
.tab-item {
  padding: 12px 28px; color: #64748b; font-weight: 700; font-size: 14px;
  cursor: pointer; border-radius: 24px; text-align: center;
  display: flex; align-items: center; gap: 8px; transition: color 0.4s ease;
}
.tab-item.active { color: #fff; }

/* Display Panel style */
.display-panel-wrap { width: 100%; }
.display-panel {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; min-height: 200px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4); color: #fff;
  display: flex; flex-direction: column; justify-content: center;
}
.panel-placeholder { text-align: center; color: #64748b; font-size: 13px; font-weight: 600; }
.fade-in { animation: fadeIn 0.4s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Form styles */
.display-panel h3 { margin: 0 0 12px 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
.display-panel input, .display-panel textarea {
  width: 100%; padding: 8px; margin-bottom: 10px; background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; box-sizing: border-box;
  font-family: inherit; font-size: 13px; outline: none;
}
.panel-btn {
  width: 100%; padding: 10px; border: none; border-radius: 8px; background: var(--c1);
  color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 5px 15px var(--c1)40;
}
.item-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; }
`,
    js: (text) => `
const container = document.getElementById('tab-container');
const blob = document.getElementById('fluid-blob');
const panel = document.getElementById('display-panel');

const raw = "${text}";
let items = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);
if (items.length < 2) {
  items = ["Sign In", "Contact", "Tutorials", "FAQ"];
}
const icons = ["🔐", "💬", "📖", "❓", "⚙️"];

const panelsContent = {
  "Sign In": \`<div class="fade-in"><h3>Sign In</h3><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button class="panel-btn">Login</button></div>\`,
  "Se connecter": \`<div class="fade-in"><h3>Se connecter</h3><input type="email" placeholder="Email"><input type="password" placeholder="Mot de passe"><button class="panel-btn">Connexion</button></div>\`,
  "Contact": \`<div class="fade-in"><h3>Contact Us</h3><input type="text" placeholder="Name"><input type="email" placeholder="Email"><textarea placeholder="Message" rows="2"></textarea><button class="panel-btn">Send</button></div>\`,
  "Tutorials": \`<div class="fade-in"><h3>Tutorials</h3><div class="item-card">🎥 Specular Shaders</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "Tutoriels": \`<div class="fade-in"><h3>Tutoriels</h3><div class="item-card">🎥 Shaders Speculaires</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "FAQ": \`<div class="fade-in"><h3>FAQ</h3><div class="item-card"><strong>Q: Modular?</strong><br>A: Yes!</div></div>\`
};

function renderPanel(key) {
  const normKey = Object.keys(panelsContent).find(k => k.toLowerCase().includes(key.toLowerCase()));
  if (normKey && panelsContent[normKey]) {
    panel.innerHTML = panelsContent[normKey];
  } else {
    panel.innerHTML = \`<div class="fade-in"><h3>\${key}</h3><p style="color: #94a3b8; font-size:12px;">Dynamic panel for \${key}</p></div>\`;
  }
}

container.innerHTML = '';
items.forEach((name, i) => {
  const tab = document.createElement('div');
  tab.className = \`tab-item \${i === 0 ? 'active' : ''}\`;
  tab.innerHTML = \`
    <span>\${icons[i % icons.length]}</span>
    <span>\${name}</span>
  \`;
  tab.addEventListener('click', () => {
    container.querySelectorAll('.tab-item').forEach(x => x.classList.remove('active'));
    tab.classList.add('active');
    alignBlob(tab);
    renderPanel(name);
  });
  container.appendChild(tab);
});

const tabs = Array.from(container.querySelectorAll('.tab-item'));
function alignBlob(el) {
  blob.style.left = el.offsetLeft + 'px';
  blob.style.width = el.offsetWidth + 'px';
}

// Initial align
setTimeout(() => alignBlob(tabs[0]), 150);
`
  },

  radial_orbit_menu: {
    category: "menus",
    name: { fr: "Ménu Radial Flottant Orbit 3D", en: "3D Radial Orbit Floating Menu" },
    inputs: ["text"],
    defaultText: { fr: "Menu, Sign In, Contact, Tutorials, FAQ", en: "Menu, Sign In, Contact, Tutorials, FAQ" },
    html: (text, cPrim, cSec) => `
<div class="radial-layout">
  <div class="radial-scene">
    <div class="radial-wrap" id="radial-wrap" style="--c-prim: ${cPrim}; --c-sec: ${cSec};">
      <div class="center-btn" id="center-trigger">Menu</div>
      <!-- Orbital items injected here -->
    </div>
  </div>

  <!-- Dynamic overlay modal -->
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal-card">
      <button class="close-btn" id="close-modal">✕</button>
      <div class="modal-body" id="modal-body"></div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
.radial-layout { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
.radial-scene { position: relative; width: 350px; height: 350px; display: flex; justify-content: center; align-items: center; }
.radial-wrap { position: relative; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; }
.center-btn {
  position: relative; z-index: 10; width: 68px; height: 68px; background: linear-gradient(135deg, var(--c-prim), var(--c-sec));
  border-radius: 50%; color: #fff; font-weight: 700; font-size: 13px; text-transform: uppercase;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,240,255,0.3); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.center-btn:hover { transform: scale(1.06); }
.radial-item {
  position: absolute; width: 46px; height: 46px; background: #1e293b; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 5; font-size: 18px;
  transform: translate(0, 0) scale(0); opacity: 0;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
.radial-item:hover { background: var(--c-prim); border-color: var(--c-sec); box-shadow: 0 0 15px var(--c-prim)50; }
.radial-wrap.open .radial-item { opacity: 1; }

/* Modal overlay styling */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: none;
  justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(8px);
}
.modal-overlay.open { display: flex; }
.modal-card {
  position: relative; width: 300px; background: rgba(15,23,42,0.85);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px 24px 24px 24px;
  color: #fff; box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes modalPop { from { transform: scale(0.8) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
.close-btn {
  position: absolute; top: 12px; right: 12px; background: transparent; border: none;
  color: #64748b; font-size: 16px; cursor: pointer;
}
.close-btn:hover { color: #fff; }

/* Dynamic form elements inside modal */
.modal-card h3 { margin: 0 0 12px 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
.modal-card input, .modal-card textarea {
  width: 100%; padding: 8px; margin-bottom: 10px; background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; box-sizing: border-box;
  font-family: inherit; font-size: 13px; outline: none;
}
.panel-btn {
  width: 100%; padding: 10px; border: none; border-radius: 8px; background: var(--c-prim);
  color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 5px 15px var(--c-prim)40;
}
.item-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 12px; }
`,
    js: (text) => `
const wrap = document.getElementById('radial-wrap');
const trigger = document.getElementById('center-trigger');
const modal = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

const raw = "${text}";
let items = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);

let centerLabel = "Menu";
if (items.length > 0) {
  centerLabel = items.shift();
}
trigger.textContent = centerLabel;

if (items.length < 2) {
  items = ["Sign In", "Contact", "Tutorials", "FAQ"];
}
const icons = ["🔐", "💬", "📖", "❓", "⚙️"];

const panelsContent = {
  "Sign In": \`<div><h3>Sign In</h3><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button class="panel-btn">Login</button></div>\`,
  "Se connecter": \`<div><h3>Se connecter</h3><input type="email" placeholder="Email"><input type="password" placeholder="Mot de passe"><button class="panel-btn">Connexion</button></div>\`,
  "Contact": \`<div><h3>Contact Us</h3><input type="text" placeholder="Name"><input type="email" placeholder="Email"><textarea placeholder="Message" rows="2"></textarea><button class="panel-btn">Send</button></div>\`,
  "Tutorials": \`<div><h3>Tutorials</h3><div class="item-card">🎥 Specular Shaders</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "Tutoriels": \`<div><h3>Tutoriels</h3><div class="item-card">🎥 Shaders Speculaires</div><div class="item-card">🎥 Web Audio API</div></div>\`,
  "FAQ": \`<div><h3>FAQ</h3><div class="item-card"><strong>Q: Modular?</strong><br>A: Yes!</div></div>\`
};

function openPanel(key) {
  const normKey = Object.keys(panelsContent).find(k => k.toLowerCase().includes(key.toLowerCase()));
  if (normKey && panelsContent[normKey]) {
    modalBody.innerHTML = panelsContent[normKey];
  } else {
    modalBody.innerHTML = \`<div><h3>\${key}</h3><p style="color: #94a3b8; font-size:12px;">Dynamic orbital data for \${key}</p></div>\`;
  }
  modal.classList.add('open');
}

closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

wrap.querySelectorAll('.radial-item').forEach(el => el.remove());

items.forEach((name, i) => {
  const item = document.createElement('div');
  item.className = 'radial-item';
  item.innerHTML = icons[i % icons.length];
  item.addEventListener('click', () => {
    openPanel(name);
  });
  wrap.appendChild(item);
});

const orbitItems = Array.from(wrap.querySelectorAll('.radial-item'));
let isOpen = false;

trigger.addEventListener('click', () => {
  isOpen = !isOpen;
  wrap.classList.toggle('open', isOpen);

  orbitItems.forEach((item, i) => {
    if (isOpen) {
      const angle = (i * (360 / orbitItems.length)) * Math.PI / 180;
      const radius = 100;
      const x = Math.round(Math.cos(angle) * radius);
      const y = Math.round(Math.sin(angle) * radius);
      item.style.transform = \`translate(\${x}px, \${y}px) scale(1)\`;
    } else {
      item.style.transform = 'translate(0px, 0px) scale(0)';
    }
  });
});
`
  },

  testimonial_deck_3d: {
    category: "carousels",
    name: { fr: "Piles Témoignages 3D Parallaxe", en: "3D Testimonial Parallax Deck" },
    inputs: ["text"],
    defaultText: { fr: "Alice - Design génial!, Marc - Code très propre, Sophie - Support rapide", en: "Alice - Awesome Design!, Marc - Clean Code, Sophie - Fast Support" },
    html: (text, cPrim, cSec) => `
<div class="test-scene" id="test-scene">
  <div class="test-deck" id="test-deck" style="--c1: ${cPrim}; --c2: ${cSec};">
    <!-- Testimonial cards are injected here -->
  </div>
  <button class="test-nav" id="test-next-btn">Next Review ➔</button>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; }
.test-scene { display: flex; flex-direction: column; align-items: center; gap: 30px; }
.test-deck { position: relative; width: 320px; height: 220px; transform-style: preserve-3d; }
.test-card {
  position: absolute; inset: 0; background: rgba(30,41,59,0.7);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px;
  box-sizing: border-box; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.4); display: flex; flex-direction: column;
  justify-content: space-between; transform-origin: bottom center;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
  cursor: grab;
}
.test-card:active { cursor: grabbing; }
.test-card .stars { color: #f59e0b; font-size: 16px; margin-bottom: 10px; }
.test-card .quote { color: #cbd5e1; font-size: 14px; font-style: italic; line-height: 1.5; flex-grow: 1; }
.test-card .author { color: #fff; font-size: 13px; font-weight: 700; margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; }
.test-nav {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: #fff; padding: 10px 24px; border-radius: 20px; font-weight: 700; font-size: 12px;
  cursor: pointer; transition: all 0.2s ease;
}
.test-nav:hover { background: var(--c1); border-color: var(--c1); transform: translateY(-2px); }
`,
    js: (text) => `
const deck = document.getElementById('test-deck');
const nextBtn = document.getElementById('test-next-btn');

const raw = "${text}";
let reviews = raw.split(',').map(item => item.trim()).filter(item => item.length > 0);
if (reviews.length < 2) {
  reviews = ["Alice - Design génial!", "Marc - Code très propre", "Sophie - Support rapide"];
}

deck.innerHTML = '';
reviews.forEach((rev, i) => {
  const parts = rev.split('-');
  const author = parts[0] ? parts[0].trim() : "Client";
  const quote = parts[1] ? parts[1].trim() : "Very satisfied!";
  
  const card = document.createElement('div');
  card.className = 'test-card';
  card.innerHTML = \`
    <div>
      <div class="stars">⭐⭐⭐⭐⭐</div>
      <div class="quote">"\${quote}"</div>
    </div>
    <div class="author">👤 \${author}</div>
  \`;
  deck.appendChild(card);
});

const cards = Array.from(deck.children);
let activeIndex = 0;

function updateDeck() {
  cards.forEach((card, i) => {
    let offset = i - activeIndex;
    // circular offset wrap-around
    if (offset < 0) offset += cards.length;
    
    if (offset === 0) {
      card.style.transform = 'translateZ(0px) translateY(0px) rotateX(0deg)';
      card.style.zIndex = 10;
      card.style.opacity = 1;
      card.style.pointerEvents = 'auto';
    } else if (offset === 1) {
      card.style.transform = 'translateZ(-40px) translateY(15px) scale(0.95) rotateX(-5deg)';
      card.style.zIndex = 5;
      card.style.opacity = 0.8;
      card.style.pointerEvents = 'none';
    } else {
      card.style.transform = 'translateZ(-80px) translateY(30px) scale(0.9) rotateX(-10deg)';
      card.style.zIndex = 1;
      card.style.opacity = 0.4;
      card.style.pointerEvents = 'none';
    }
  });
}
updateDeck();

// Next slide fly-out animation
nextBtn.addEventListener('click', () => {
  const topCard = cards[activeIndex];
  topCard.style.transform = 'translateX(180px) rotateZ(20deg) scale(0.8)';
  topCard.style.opacity = 0;
  
  setTimeout(() => {
    activeIndex = (activeIndex + 1) % cards.length;
    updateDeck();
  }, 300);
});

// Top card mouse move parallax tilt
let activeDrag = false;
let startX = 0;
document.addEventListener('mousemove', (e) => {
  const topCard = cards[activeIndex];
  if (!topCard) return;
  const r = topCard.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  topCard.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg) translateZ(10px)\`;
});
document.addEventListener('mouseleave', () => {
  const topCard = cards[activeIndex];
  if (topCard) topCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
});
`
  },

  cyber_calendar_3d: {
    category: "widgets",
    name: { fr: "Calendar Holographique 3D", en: "3D Holographic Calendar" },
    inputs: ["text"],
    defaultText: { fr: "Juillet, Plan 3D - 12h, Code Fix - 15h", en: "July, 3D Plan - 12pm, Code Fix - 3pm" },
    html: (text, cPrim, cSec) => `
<div class="cal-scene" id="cal-scene">
  <div class="cal-card" id="cal-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="cal-header">
      <h3 id="cal-month-title">Month</h3>
    </div>
    <div class="cal-grid" id="cal-grid">
      <!-- Calendar dates injected here -->
    </div>
  </div>
  
  <div class="cal-drawer" id="cal-drawer">
    <h4 id="cal-event-title">Event Detail</h4>
    <p id="cal-event-desc">Click an highlighted date to view details</p>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; }
.cal-scene { display: flex; gap: 30px; align-items: center; width: 90%; max-width: 650px; cursor: grab; }
.cal-scene:active { cursor: grabbing; }
.cal-card {
  width: 280px; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5); transform-style: preserve-3d;
  transition: transform 0.1s ease;
}
.cal-header h3 { margin: 0 0 15px 0; color: #fff; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
.cal-day {
  aspect-ratio: 1; border-radius: 6px; background: rgba(255,255,255,0.03);
  display: flex; align-items: center; justify-content: center; font-size: 11px;
  font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s ease;
}
.cal-day:hover { background: rgba(255,255,255,0.08); color: #fff; }
.cal-day.has-event {
  background: var(--c1)20; border: 1px solid var(--c1); color: #fff;
  box-shadow: 0 0 10px var(--c1)50; position: relative;
}
.cal-day.has-event::after {
  content: ''; position: absolute; bottom: 3px; right: 3px; width: 4px; height: 4px;
  background: var(--c2); border-radius: 50%;
}
.cal-day.active { background: var(--c1); border-color: var(--c2); color: #fff; }

.cal-drawer {
  flex-grow: 1; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; min-height: 180px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  color: #fff; display: flex; flex-direction: column; justify-content: center;
}
.cal-drawer h4 { margin: 0 0 10px 0; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
.cal-drawer p { margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5; }
`,
    js: (text) => `
const grid = document.getElementById('cal-grid');
const mTitle = document.getElementById('cal-month-title');
const card = document.getElementById('cal-card');
const scene = document.getElementById('cal-scene');
const dTitle = document.getElementById('cal-event-title');
const dDesc = document.getElementById('cal-event-desc');

const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

let month = "July";
if (parts.length > 0) {
  month = parts.shift();
}
mTitle.textContent = month;

const events = {};
// Map remaining inputs to days 5 and 15
if (parts.length > 0) events[5] = parts[0];
if (parts.length > 1) events[15] = parts[1];
if (parts.length === 0) {
  events[5] = "3D Plan - 12h";
  events[15] = "Code Fix - 15h";
}

grid.innerHTML = '';
// Add weekdays header
const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
weekdays.forEach(day => {
  const cell = document.createElement('div');
  cell.className = 'cal-day';
  cell.style.color = 'var(--c1)';
  cell.style.border = 'none';
  cell.style.background = 'transparent';
  cell.textContent = day;
  grid.appendChild(cell);
});

// Render 30 days
for (let i = 1; i <= 30; i++) {
  const day = document.createElement('div');
  day.className = 'cal-day';
  day.textContent = i;
  if (events[i]) {
    day.classList.add('has-event');
  }
  day.addEventListener('click', () => {
    grid.querySelectorAll('.cal-day').forEach(d => d.classList.remove('active'));
    day.classList.add('active');
    if (events[i]) {
      dTitle.textContent = \`Day \${i} - Active Event\`;
      dDesc.textContent = events[i];
    } else {
      dTitle.textContent = \`Day \${i}\`;
      dDesc.textContent = "No schedules recorded for this day.";
    }
  });
  grid.appendChild(day);
}

// Drag rotation calendar
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rot = { x: 15, y: -15 };
scene.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rot.y += dx * 0.5;
  rot.x -= dy * 0.5;
  card.style.transform = \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
`
  },

  product_hotspots_3d: {
    category: "parallax_cards",
    name: { fr: "Vitrine Produit & Hotspots 3D", en: "3D Product Showcase & Hotspots" },
    inputs: ["text"],
    defaultText: { fr: "Smartwatch Ultra, OLED Display - Matrice Active, Coque Titane - Cyber Grade, Batterie - Autonomie 72h", en: "Smartwatch Ultra, OLED Display - Active Matrix, Titanium Shell - Cyber Grade, Battery - 72 Hours" },
    html: (text, cPrim, cSec) => `
<div class="showcase-scene" id="showcase-scene">
  <div class="product-3d" id="product-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="device-body">
      <div class="device-screen">⚡</div>
    </div>
    <!-- Interactive Hotspots -->
    <div class="hotspot" style="top: 25%; left: 35%;" data-idx="0"></div>
    <div class="hotspot" style="top: 55%; left: 65%;" data-idx="1"></div>
    <div class="hotspot" style="top: 80%; left: 45%;" data-idx="2"></div>
  </div>

  <div class="detail-card" id="detail-card">
    <h3 id="detail-title">Smartwatch Ultra</h3>
    <p id="detail-desc">Hover or click a glowing hotspot on the product to view specifications.</p>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; }
.showcase-scene { display: flex; gap: 40px; align-items: center; width: 90%; max-width: 650px; }
.product-3d {
  position: relative; width: 220px; height: 280px; background: radial-gradient(circle, #1e293b, #0f172a);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; display: flex; justify-content: center;
  align-items: center; transform-style: preserve-3d; transition: transform 0.1s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.device-body {
  width: 90px; height: 120px; background: #334155; border: 4px solid var(--c1); border-radius: 20px;
  display: flex; align-items: center; justify-content: center; transform: translateZ(20px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}
.device-screen {
  width: 76px; height: 106px; background: #020205; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--c2);
  filter: drop-shadow(0 0 8px var(--c2));
}
.hotspot {
  position: absolute; width: 14px; height: 14px; background: var(--c1); border-radius: 50%;
  cursor: pointer; z-index: 10; transform: translateZ(40px);
  box-shadow: 0 0 10px var(--c1); transition: transform 0.2s;
}
.hotspot::after {
  content: ''; position: absolute; inset: -6px; border: 2px dashed var(--c2); border-radius: 50%;
  animation: pulse-spin 2s linear infinite;
}
@keyframes pulse-spin { 0% { transform: rotate(0deg) scale(0.8); opacity: 1; } 100% { transform: rotate(360deg) scale(1.4); opacity: 0; } }
.hotspot:hover { transform: translateZ(45px) scale(1.2); }

.detail-card {
  flex-grow: 1; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px; min-height: 180px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  color: #fff; display: flex; flex-direction: column; justify-content: center;
}
.detail-card h3 { margin: 0 0 10px 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; color: var(--c1); }
.detail-card p { margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.5; }
`,
    js: (text) => `
const card = document.getElementById('product-card');
const dTitle = document.getElementById('detail-title');
const dDesc = document.getElementById('detail-desc');
const hotspots = Array.from(document.querySelectorAll('.hotspot'));

const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

let pName = "Smartwatch Ultra";
if (parts.length > 0) {
  pName = parts.shift();
}
dTitle.textContent = pName;

const specs = [];
parts.forEach(part => {
  const sides = part.split('-');
  const title = sides[0] ? sides[0].trim() : "Feature";
  const desc = sides[1] ? sides[1].trim() : "Activated";
  specs.push({ title, desc });
});

// Fallback spec data
while (specs.length < 3) {
  specs.push({ title: "OLED Display", desc: "Active Matrix" });
  specs.push({ title: "Coque Titane", desc: "Cyber Grade" });
  specs.push({ title: "Batterie", desc: "Autonomie 72h" });
}

hotspots.forEach((spot, idx) => {
  const spec = specs[idx % specs.length];
  const trigger = () => {
    dTitle.textContent = spec.title;
    dDesc.textContent = spec.desc;
  };
  spot.addEventListener('mouseenter', trigger);
  spot.addEventListener('click', trigger);
});

document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  cyber_auth_shield_3d: {
    category: "widgets",
    name: { fr: "Scaner Biométrique 3D", en: "3D Cyber Auth Shield" },
    inputs: ["text"],
    defaultText: { fr: "ACCÈS AUTORISÉ", en: "ACCESS GRANTED" },
    html: (text, cPrim, cSec) => `
<div class="auth-scene" id="auth-scene">
  <div class="auth-card" id="auth-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="auth-header">SECURITY ACCESS</div>
    
    <div class="scan-area" id="scan-trigger">
      <div class="scanner-laser" id="scanner-laser"></div>
      <div class="fingerprint">🖐️</div>
      <div class="scan-glow"></div>
    </div>
    
    <div class="auth-status" id="auth-status">HOLD TO SCAN RETINA / PRINT</div>
    <div class="auth-result" id="auth-result">${text}</div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; user-select: none; }
.auth-scene { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
.auth-card {
  position: relative; width: 280px; padding: 30px 24px; background: rgba(15,23,42,0.85);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; text-align: center;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.02);
  transform-style: preserve-3d; transition: transform 0.1s ease;
}
.auth-header { color: #64748b; font-size: 11px; font-weight: 800; letter-spacing: 2px; margin-bottom: 25px; transform: translateZ(15px); }

.scan-area {
  position: relative; width: 120px; height: 120px; margin: 0 auto 25px auto;
  background: rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.05); border-radius: 50%;
  cursor: pointer; overflow: hidden; display: flex; align-items: center; justify-content: center;
  transform: translateZ(30px); transition: all 0.3s;
}
.scan-area:hover { border-color: var(--c1); box-shadow: 0 0 20px var(--c1)40; }
.fingerprint { font-size: 48px; filter: grayscale(1) opacity(0.3); transition: all 0.3s; }
.scan-area.scanning .fingerprint { filter: grayscale(0) opacity(1); color: var(--c1); transform: scale(1.1); }

.scanner-laser {
  position: absolute; left: 0; right: 0; height: 4px; background: var(--c1);
  box-shadow: 0 0 15px var(--c1); opacity: 0; pointer-events: none;
}
.scan-area.scanning .scanner-laser {
  opacity: 1; animation: laserSwipe 1.8s ease-in-out infinite;
}
@keyframes laserSwipe {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}

.scan-glow {
  position: absolute; inset: 0; background: radial-gradient(circle, var(--c1) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.scan-area.scanning .scan-glow { opacity: 0.15; }

.auth-status { color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1px; transform: translateZ(10px); }
.auth-result {
  margin-top: 15px; font-size: 18px; font-weight: 900; color: #fff;
  letter-spacing: 2px; text-shadow: 0 0 10px var(--c1);
  opacity: 0; transform: translateZ(10px) scale(0.9); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.auth-result.verified { opacity: 1; transform: translateZ(10px) scale(1); }
`,
    js: () => `
const card = document.getElementById('auth-card');
const trigger = document.getElementById('scan-trigger');
const status = document.getElementById('auth-status');
const result = document.getElementById('auth-result');

let scanTimer = null;

trigger.addEventListener('mousedown', () => {
  trigger.classList.add('scanning');
  status.textContent = "SCANNING SYSTEM...";
  status.style.color = "var(--c1)";
  result.classList.remove('verified');
  
  scanTimer = setTimeout(() => {
    trigger.classList.remove('scanning');
    status.textContent = "IDENTITY CONFIRMED";
    status.style.color = "#10b981";
    result.classList.add('verified');
  }, 1800);
});

const endScan = () => {
  if (scanTimer) {
    clearTimeout(scanTimer);
    scanTimer = null;
  }
  if (!result.classList.contains('verified')) {
    trigger.classList.remove('scanning');
    status.textContent = "HOLD TO SCAN RETINA / PRINT";
    status.style.color = "#94a3b8";
  }
};

trigger.addEventListener('mouseup', endScan);
trigger.addEventListener('mouseleave', endScan);

// Tilt effect
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  holo_ai_assistant: {
    category: "widgets",
    name: { fr: "Assistant IA Holographique", en: "3D Holographic AI Assistant" },
    inputs: ["text"],
    defaultText: { fr: "SYSTÈME OPTIMISÉ", en: "SYSTEM OPTIMIZED" },
    html: (text, cPrim, cSec) => `
<div class="ai-scene">
  <canvas id="ai-sphere-canvas"></canvas>
  <div class="ai-overlay">
    <div class="ai-glow-ball" id="ai-glow-ball" style="--c1: ${cPrim}; --c2: ${cSec};"></div>
    <div class="ai-caption" id="ai-caption">${text}</div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
.ai-scene { position: relative; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
#ai-sphere-canvas { position: absolute; inset: 0; z-index: 1; }
.ai-overlay { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 25px; pointer-events: none; }
.ai-glow-ball {
  width: 90px; height: 90px; border-radius: 50%;
  background: radial-gradient(circle, var(--c1) 0%, transparent 70%);
  filter: blur(10px); opacity: 0.8; animation: pulseBall 3s infinite ease-in-out;
  pointer-events: auto; cursor: pointer;
}
@keyframes pulseBall { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 0.9; } }
.ai-caption {
  color: #fff; font-size: 14px; font-weight: 800; letter-spacing: 3px;
  text-transform: uppercase; text-shadow: 0 0 10px var(--c1); opacity: 0.8;
}
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('ai-sphere-canvas');
const ctx = canvas.getContext('2d');
const glowBall = document.getElementById('ai-glow-ball');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];
const count = 120;
for (let i = 0; i < count; i++) {
  particles.push({
    angle: Math.random() * Math.PI * 2,
    pitch: (Math.random() - 0.5) * Math.PI,
    speed: 0.005 + Math.random() * 0.005,
    size: 1 + Math.random() * 2,
    baseRadius: 110 + Math.random() * 40
  });
}

let time = 0;
let mouse = { x: w/2, y: h/2 };
let isHovered = false;

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

glowBall.addEventListener('mouseenter', () => { isHovered = true; glowBall.style.filter = "blur(5px)"; });
glowBall.addEventListener('mouseleave', () => { isHovered = false; glowBall.style.filter = "blur(10px)"; });

function draw() {
  ctx.clearRect(0,0,w,h);
  time += 0.02;

  particles.forEach(p => {
    p.angle += p.speed;
    
    // Wave oscillation
    const noise = Math.sin(p.angle * 3 + time) * 15;
    const r = p.baseRadius + noise + (isHovered ? 25 : 0);

    // 3D coordinates projection
    const x3d = r * Math.cos(p.angle) * Math.cos(p.pitch);
    const y3d = r * Math.sin(p.pitch);
    const z3d = r * Math.sin(p.angle) * Math.cos(p.pitch);

    // Dynamic camera angle rotation
    const rotY_X = x3d * Math.cos(time * 0.2) - z3d * Math.sin(time * 0.2);
    const rotY_Z = x3d * Math.sin(time * 0.2) + z3d * Math.cos(time * 0.2);

    // Perspective factor
    const scale = 250 / (250 + rotY_Z);
    const projX = w/2 + rotY_X * scale;
    const projY = h/2 + y3d * scale;

    ctx.fillStyle = rotY_Z > 0 ? '${cSec}' : '${cPrim}';
    ctx.shadowBlur = 5;
    ctx.shadowColor = ctx.fillStyle;

    ctx.beginPath();
    ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(draw);
}
draw();
`
  },

  retro_gameboy_3d: {
    category: "widgets",
    name: { fr: "Mini-Console de Jeu Retro 3D", en: "3D Playable Retro Micro-Console" },
    inputs: ["text"],
    defaultText: { fr: "GAME START", en: "GAME START" },
    html: (text, cPrim, cSec) => `
<div class="gb-scene" id="gb-scene">
  <div class="gb-console" id="gb-console" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="gb-screen-bezel">
      <div class="battery-indicator active"></div>
      <canvas class="gb-screen" id="game-canvas" width="160" height="120"></canvas>
    </div>
    
    <div class="gb-controls">
      <div class="gb-dpad">
        <button class="d-btn d-up" id="btn-up"></button>
        <button class="d-btn d-left" id="btn-left"></button>
        <div class="d-center"></div>
        <button class="d-btn d-right" id="btn-right"></button>
        <button class="d-btn d-down" id="btn-down"></button>
      </div>
      
      <div class="gb-action-btns">
        <button class="a-btn" id="btn-b">B</button>
        <button class="a-btn" id="btn-a">A</button>
      </div>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; }
.gb-scene { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
.gb-console {
  width: 240px; height: 380px; background: #e2e8f0; border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,255,255,0.6);
  border: 4px solid #94a3b8; padding: 24px; box-sizing: border-box;
  display: flex; flex-direction: column; justify-content: space-between;
  transform-style: preserve-3d; transition: transform 0.1s ease;
}
.gb-screen-bezel {
  position: relative; width: 100%; height: 150px; background: #334155;
  border-radius: 12px; border: 4px solid #1e293b; padding: 15px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: center; transform: translateZ(15px);
}
.battery-indicator {
  position: absolute; left: 6px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; background: #ef4444; border-radius: 50%;
}
.battery-indicator.active { background: #10b981; box-shadow: 0 0 8px #10b981; }
.gb-screen {
  background: #8b5cf610; width: 100%; height: 100%; border-radius: 4px; border: 2px solid #0f172a;
  image-rendering: pixelated;
}

.gb-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; transform: translateZ(20px); }
.gb-dpad {
  position: relative; width: 72px; height: 72px;
}
.d-btn {
  position: absolute; background: #475569; border: none; cursor: pointer;
  box-shadow: -2px 2px 0px rgba(0,0,0,0.4);
}
.d-btn:active { background: #1e293b; }
.d-up { top: 0; left: 24px; width: 24px; height: 26px; border-radius: 4px 4px 0 0; }
.d-down { bottom: 0; left: 24px; width: 24px; height: 26px; border-radius: 0 0 4px 4px; }
.d-left { left: 0; top: 24px; width: 26px; height: 24px; border-radius: 4px 0 0 4px; }
.d-right { right: 0; top: 24px; width: 26px; height: 24px; border-radius: 0 4px 4px 0; }
.d-center { position: absolute; left: 24px; top: 24px; width: 24px; height: 24px; background: #475569; }

.gb-action-btns { display: flex; gap: 12px; transform: rotate(-25deg); }
.a-btn {
  width: 32px; height: 32px; background: #ef4444; border: none; border-radius: 50%;
  color: rgba(0,0,0,0.4); font-weight: 900; font-size: 11px; cursor: pointer;
  box-shadow: -3px 3px 0 rgba(0,0,0,0.4); transition: transform 0.1s;
}
.a-btn:active { transform: translate(-2px, 2px); box-shadow: -1px 1px 0 rgba(0,0,0,0.4); }
`,
    js: (text) => `
const consoleEl = document.getElementById('gb-console');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Tilt controls
document.addEventListener('mousemove', (e) => {
  const r = consoleEl.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  consoleEl.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  consoleEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Retro Snake Game Implementation
let snake = [{x: 4, y: 5}];
let dir = {x: 1, y: 0};
let apple = {x: 8, y: 8};
let score = 0;
let isGameOver = false;

function generateApple() {
  apple.x = Math.floor(Math.random() * 20);
  apple.y = Math.floor(Math.random() * 15);
}

function updateGame() {
  if (isGameOver) return;

  // Move snake
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  
  // Boundary check
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 15) {
    isGameOver = true;
    return;
  }
  
  // Self collision check
  if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    isGameOver = true;
    return;
  }

  snake.unshift(head);

  // Apple check
  if (head.x === apple.x && head.y === apple.y) {
    score += 10;
    generateApple();
  } else {
    snake.pop();
  }
}

function drawGame() {
  // Clear
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 160, 120);

  if (isGameOver) {
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px monospace';
    ctx.fillText('GAME OVER', 50, 50);
    ctx.fillText('SCORE: ' + score, 50, 70);
    ctx.font = '8px monospace';
    ctx.fillText('PRESS A TO RESTART', 30, 90);
    return;
  }

  // Draw Apple
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(apple.x * 8, apple.y * 8, 8, 8);

  // Draw Snake
  ctx.fillStyle = '#10b981';
  snake.forEach(seg => {
    ctx.fillRect(seg.x * 8, seg.y * 8, 8, 8);
  });
}

function loop() {
  updateGame();
  drawGame();
  setTimeout(loop, 200);
}
loop();

// Control bindings
document.getElementById('btn-up').addEventListener('click', () => { if(dir.y !== 1) dir = {x: 0, y: -1}; });
document.getElementById('btn-down').addEventListener('click', () => { if(dir.y !== -1) dir = {x: 0, y: 1}; });
document.getElementById('btn-left').addEventListener('click', () => { if(dir.x !== 1) dir = {x: -1, y: 0}; });
document.getElementById('btn-right').addEventListener('click', () => { if(dir.x !== -1) dir = {x: 1, y: 0}; });

const restartGame = () => {
  if (isGameOver) {
    snake = [{x: 4, y: 5}];
    dir = {x: 1, y: 0};
    score = 0;
    isGameOver = false;
    generateApple();
  }
};
document.getElementById('btn-a').addEventListener('click', restartGame);
document.getElementById('btn-b').addEventListener('click', restartGame);

// Add keyboard listeners too
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && dir.y !== 1) dir = {x: 0, y: -1};
  if (e.key === 'ArrowDown' && dir.y !== -1) dir = {x: 0, y: 1};
  if (e.key === 'ArrowLeft' && dir.x !== 1) dir = {x: -1, y: 0};
  if (e.key === 'ArrowRight' && dir.x !== -1) dir = {x: 1, y: 0};
  if (e.key === 'Enter' || e.key === 'a' || e.key === 'A') restartGame();
});
`
  },

  hero_banner_3d: {
    category: "sections",
    name: { fr: "Bannière Hero 3D Pro", en: "3D Pro Hero Banner" },
    inputs: ["text"],
    defaultText: { fr: "FUTURE OF DESIGN - Transformez vos sites web avec des composants 3D interactifs de haute performance.", en: "FUTURE OF DESIGN - Transform your web apps with high-performance interactive 3D components." },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["FUTURE OF DESIGN", text];
      const title = parts[0] ? parts[0].trim() : "FUTURE OF DESIGN";
      const desc = parts[1] ? parts[1].trim() : text;
      return `
<div class="hero-section" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="hero-content">
    <div class="hero-badge">✨ NEXT-GEN WEB 3D</div>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-desc">${desc}</p>
    <div class="hero-actions">
      <button class="btn-primary-3d">Get Started Free</button>
      <button class="btn-secondary-3d">Explore Docs</button>
    </div>
  </div>

  <div class="hero-graphic" id="hero-card">
    <div class="hero-glass-core">
      <div class="glass-ring"></div>
      <div class="glass-logo">⚡</div>
    </div>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; overflow-x: hidden; }
.hero-section {
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
  width: 90%; max-width: 900px; padding: 40px; box-sizing: border-box;
}
.hero-content { max-width: 480px; }
.hero-badge {
  display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; color: var(--c1);
  letter-spacing: 1.5px; margin-bottom: 20px;
}
.hero-title {
  font-size: 42px; font-weight: 900; line-height: 1.1; margin: 0 0 16px 0;
  background: linear-gradient(135deg, #fff 30%, var(--c1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-desc { color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0; }
.hero-actions { display: flex; gap: 15px; }
.btn-primary-3d {
  background: linear-gradient(135deg, var(--c1), var(--c2)); border: none; padding: 14px 28px;
  border-radius: 12px; color: #fff; font-weight: 800; font-size: 13px; cursor: pointer;
  box-shadow: 0 10px 25px var(--c1)40; transition: transform 0.2s ease;
}
.btn-primary-3d:hover { transform: translateY(-3px); }
.btn-secondary-3d {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 14px 28px;
  border-radius: 12px; color: #fff; font-weight: 800; font-size: 13px; cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary-3d:hover { background: rgba(255,255,255,0.08); }

/* Hero Graphic */
.hero-graphic {
  position: relative; width: 280px; height: 280px; display: flex; justify-content: center;
  align-items: center; transform-style: preserve-3d; transition: transform 0.1s ease;
}
.hero-glass-core {
  position: relative; width: 200px; height: 200px; background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; backdrop-filter: blur(20px);
  display: flex; justify-content: center; align-items: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5); transform: rotateX(15deg) rotateY(-15deg);
  transform-style: preserve-3d;
}
.glass-ring {
  position: absolute; inset: -20px; border: 2px dashed var(--c1); border-radius: 50%;
  animation: rotateRing 12s linear infinite; opacity: 0.6;
}
@keyframes rotateRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.glass-logo { font-size: 60px; color: var(--c2); filter: drop-shadow(0 0 20px var(--c2)); transform: translateZ(30px); }
`,
    js: () => `
const card = document.getElementById('hero-card');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 30; const ry = ((x / r.width) - 0.5) * 30;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  features_grid_3d: {
    category: "sections",
    name: { fr: "Grille de Fonctionnalités 3D", en: "3D Feature Cards Grid" },
    inputs: ["text"],
    defaultText: { fr: "Performance 60FPS - Vitesse maximale, Shaders Sur-Mesure - Rendu d'exception, Zéro Dépendance - Nul besoin de bibliothèque externe", en: "60FPS Performance - Ultra smooth, Custom Shaders - Stunning rendering, Zero Dependency - Pure JS and CSS" },
    html: (text, cPrim, cSec) => `
<div class="features-section" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="features-header">
    <h2>WHY CHOOSE US</h2>
    <p>Empower your application with next-gen 3D visual modules.</p>
  </div>

  <div class="features-grid" id="feat-grid">
    <!-- Feature cards injected dynamically -->
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.features-section { width: 90%; max-width: 850px; text-align: center; }
.features-header h2 { font-size: 12px; letter-spacing: 3px; color: var(--c1); margin: 0 0 10px 0; }
.features-header p { font-size: 22px; font-weight: 800; margin: 0 0 40px 0; color: #f8fafc; }

.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feat-card {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 28px 20px; box-sizing: border-box; text-align: left;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3); cursor: pointer;
}
.feat-card:hover {
  transform: translateY(-8px) rotateX(8deg); border-color: var(--c1);
  box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 20px var(--c1)30;
}
.feat-icon {
  width: 44px; height: 44px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px;
  color: var(--c1); margin-bottom: 20px; transform: translateZ(20px);
}
.feat-card h3 { font-size: 16px; font-weight: 800; margin: 0 0 10px 0; color: #fff; transform: translateZ(15px); }
.feat-card p { font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0; transform: translateZ(10px); }
`,
    js: (text) => `
const grid = document.getElementById('feat-grid');
const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

if (parts.length < 3) {
  parts = [
    "60FPS Performance - Ultra smooth rendering",
    "Custom Shaders - Premium lighting effects",
    "Zero Dependency - Standalone code"
  ];
}

const icons = ["⚡", "🎨", "🚀"];
grid.innerHTML = '';

parts.forEach((part, i) => {
  const sides = part.split('-');
  const title = sides[0] ? sides[0].trim() : "Feature " + (i + 1);
  const desc = sides[1] ? sides[1].trim() : "High performance 3D capability";

  const card = document.createElement('div');
  card.className = 'feat-card';
  card.innerHTML = \`
    <div class="feat-icon">\${icons[i % icons.length]}</div>
    <h3>\${title}</h3>
    <p>\${desc}</p>
  \`;
  grid.appendChild(card);
});
`
  },

  stats_counter_3d: {
    category: "sections",
    name: { fr: "Compteurs Statistiques 3D", en: "3D Live Stats Counter" },
    inputs: ["text"],
    defaultText: { fr: "10K+ Clients - satisfaction, 99.9% Uptime - reliabilité, 500+ Composants - bibliothèque 3D, 24/7 Support - disponibilité", en: "10K+ Clients - Satisfied users, 99.9% Uptime - Reliable servers, 500+ Components - 3D Library, 24/7 Support - Always online" },
    html: (text, cPrim, cSec) => `
<div class="stats-section" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="stats-grid" id="stats-grid">
    <!-- Stat items injected here -->
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.stats-section { width: 90%; max-width: 850px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-box {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 24px 16px; text-align: center; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transition: transform 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}
.stat-box:hover { transform: translateZ(20px) scale(1.04); border-color: var(--c1); box-shadow: 0 0 25px var(--c1)40; }
.stat-num {
  font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 6px;
  background: linear-gradient(135deg, #fff, var(--c1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  transform: translateZ(25px);
}
.stat-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; transform: translateZ(10px); }
`,
    js: (text) => `
const grid = document.getElementById('stats-grid');
const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

if (parts.length < 4) {
  parts = [
    "10K+ - Active Users",
    "99.9% - High Uptime",
    "500+ - 3D Assets",
    "24/7 - Live Support"
  ];
}

grid.innerHTML = '';
parts.forEach(part => {
  const sides = part.split('-');
  const num = sides[0] ? sides[0].trim() : "100+";
  const lbl = sides[1] ? sides[1].trim() : "Metric";

  const box = document.createElement('div');
  box.className = 'stat-box';
  box.innerHTML = \`
    <div class="stat-num">\${num}</div>
    <div class="stat-label">\${lbl}</div>
  \`;
  grid.appendChild(box);
});
`
  },

  footer_newsletter_3d: {
    category: "sections",
    name: { fr: "Pied de Page Cybernétique 3D", en: "3D Cybernetic Footer & Newsletter" },
    inputs: ["text"],
    defaultText: { fr: "REJOIGNEZ LA RÉVOLUTION 3D - Abonnez-vous pour recevoir nos derniers modèles et composants 3D.", en: "JOIN THE 3D REVOLUTION - Subscribe to get our latest high-performance 3D UI templates." },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["JOIN THE 3D REVOLUTION", text];
      const title = parts[0] ? parts[0].trim() : "JOIN THE 3D REVOLUTION";
      const desc = parts[1] ? parts[1].trim() : text;
      return `
<div class="footer-section" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="footer-card" id="footer-card">
    <div class="footer-badge">NEWSLETTER</div>
    <h2>${title}</h2>
    <p>${desc}</p>
    
    <form class="subscribe-form" onsubmit="event.preventDefault();">
      <input type="email" placeholder="Enter your email address..." required>
      <button type="submit" class="sub-btn">Subscribe ➔</button>
    </form>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.footer-section { width: 90%; max-width: 650px; text-align: center; }
.footer-card {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px; padding: 40px 30px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transition: transform 0.1s ease;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}
.footer-badge {
  display: inline-block; background: var(--c1)20; border: 1px solid var(--c1);
  color: var(--c1); font-size: 10px; font-weight: 800; padding: 4px 14px;
  border-radius: 20px; letter-spacing: 2px; margin-bottom: 15px; transform: translateZ(15px);
}
.footer-card h2 { font-size: 26px; font-weight: 900; margin: 0 0 12px 0; transform: translateZ(20px); }
.footer-card p { font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 30px 0; transform: translateZ(15px); }

.subscribe-form { display: flex; gap: 10px; max-width: 440px; margin: 0 auto; transform: translateZ(25px); }
.subscribe-form input {
  flex-grow: 1; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 12px 16px; color: #fff; font-family: inherit; font-size: 13px; outline: none;
}
.subscribe-form input:focus { border-color: var(--c1); }
.sub-btn {
  background: var(--c1); border: none; padding: 12px 24px; border-radius: 12px;
  color: #fff; font-weight: 800; font-size: 13px; cursor: pointer;
  box-shadow: 0 5px 15px var(--c1)40; transition: all 0.2s ease;
}
.sub-btn:hover { background: var(--c2); transform: translateY(-2px); }
`,
    js: () => `
const card = document.getElementById('footer-card');
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 15; const ry = ((x / r.width) - 0.5) * 15;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  pricing_section_3d: {
    category: "sections",
    name: { fr: "Tarifs 3D Comparatifs", en: "3D Pricing Showcase" },
    inputs: ["text"],
    defaultText: { fr: "Basic - 9€, Pro - 29€, Enterprise - 99€", en: "Basic - $9, Pro - $29, Enterprise - $99" },
    html: (text, cPrim, cSec) => `
<div class="pricing-sec-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="pricing-sec-header">
    <h2>FLEXIBLE PRICING</h2>
    <p>Choose the right plan for your 3D workflow.</p>
  </div>
  <div class="pricing-grid-3d">
    <div class="plan-card-3d">
      <div class="plan-type">BASIC</div>
      <div class="plan-price">$9<span>/mo</span></div>
      <ul class="plan-list">
        <li>✓ 10 3D Models</li>
        <li>✓ Standard Shaders</li>
        <li>✓ Community Support</li>
      </ul>
      <button class="plan-btn-sub">Choose Basic</button>
    </div>

    <div class="plan-card-3d popular">
      <div class="plan-badge-pop">POPULAR</div>
      <div class="plan-type">PRO</div>
      <div class="plan-price">$29<span>/mo</span></div>
      <ul class="plan-list">
        <li>✓ Unlimited 3D Exports</li>
        <li>✓ Custom Specular FX</li>
        <li>✓ Web Audio SFX</li>
      </ul>
      <button class="plan-btn-sub active">Get Started Pro</button>
    </div>

    <div class="plan-card-3d">
      <div class="plan-type">ENTERPRISE</div>
      <div class="plan-price">$99<span>/mo</span></div>
      <ul class="plan-list">
        <li>✓ Full Source Access</li>
        <li>✓ Custom 3D Shaders</li>
        <li>✓ 24/7 Priority Support</li>
      </ul>
      <button class="plan-btn-sub">Contact Sales</button>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; }
.pricing-sec-wrap { width: 90%; max-width: 850px; text-align: center; }
.pricing-sec-header h2 { font-size: 12px; letter-spacing: 3px; color: var(--c1); margin: 0 0 10px 0; }
.pricing-sec-header p { font-size: 22px; font-weight: 800; margin: 0 0 40px 0; color: #f8fafc; }

.pricing-grid-3d { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: center; }
.plan-card-3d {
  position: relative; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px; padding: 32px 24px; box-sizing: border-box; text-align: left;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}
.plan-card-3d:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.2); }
.plan-card-3d.popular {
  transform: translateZ(30px) scale(1.05); border-color: var(--c1);
  box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 25px var(--c1)30; background: rgba(15,23,42,0.85);
}
.plan-badge-pop {
  position: absolute; top: -12px; right: 24px; background: linear-gradient(135deg, var(--c1), var(--c2));
  color: #fff; font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 12px; letter-spacing: 1px;
}
.plan-type { font-size: 12px; font-weight: 800; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 12px; }
.plan-price { font-size: 38px; font-weight: 900; color: #fff; margin-bottom: 20px; }
.plan-price span { font-size: 14px; color: #64748b; font-weight: 600; }
.plan-list { list-style: none; padding: 0; margin: 0 0 25px 0; display: flex; flex-direction: column; gap: 10px; }
.plan-list li { font-size: 12px; color: #cbd5e1; }
.plan-btn-sub {
  width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; color: #fff; font-weight: 800; font-size: 12px; cursor: pointer; transition: all 0.2s ease;
}
.plan-btn-sub:hover { background: rgba(255,255,255,0.1); }
.plan-btn-sub.active { background: var(--c1); border-color: var(--c1); box-shadow: 0 5px 15px var(--c1)40; }
.plan-btn-sub.active:hover { background: var(--c2); }
`,
    js: (text) => `
const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);
if (parts.length >= 3) {
  const cards = document.querySelectorAll('.plan-card-3d');
  parts.forEach((part, i) => {
    if (cards[i]) {
      const sides = part.split('-');
      const name = sides[0] ? sides[0].trim() : "";
      const cost = sides[1] ? sides[1].trim() : "";
      if (name) cards[i].querySelector('.plan-type').textContent = name;
      if (cost) cards[i].querySelector('.plan-price').childNodes[0].textContent = cost;
    }
  });
}
`
  },

  how_it_works_3d: {
    category: "sections",
    name: { fr: "Flux de Travail 3D Step-by-Step", en: "3D How It Works Steps" },
    inputs: ["text"],
    defaultText: { fr: "1. Select Model - Choisissez votre composant, 2. Customize - Adaptez couleurs & textes, 3. Export Code - Copiez le code natif", en: "1. Select Model - Choose your component, 2. Customize - Tweak colors & text, 3. Export Code - Copy clean native code" },
    html: (text, cPrim, cSec) => `
<div class="steps-section" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="steps-header">
    <h2>SIMPLE WORKFLOW</h2>
    <p>How to integrate 3D elements into your website in 3 simple steps.</p>
  </div>

  <div class="steps-grid" id="steps-grid">
    <!-- Steps injected dynamically -->
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.steps-section { width: 90%; max-width: 850px; text-align: center; }
.steps-header h2 { font-size: 12px; letter-spacing: 3px; color: var(--c1); margin: 0 0 10px 0; }
.steps-header p { font-size: 22px; font-weight: 800; margin: 0 0 40px 0; color: #f8fafc; }

.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; position: relative; }
.step-card {
  position: relative; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px; padding: 32px 20px; box-sizing: border-box; text-align: center;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}
.step-card:hover { transform: translateY(-8px) rotateX(6deg); border-color: var(--c1); box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 20px var(--c1)30; }
.step-num {
  width: 44px; height: 44px; background: linear-gradient(135deg, var(--c1), var(--c2));
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 16px; margin: 0 auto 20px auto; color: #fff;
  box-shadow: 0 5px 15px var(--c1)40; transform: translateZ(20px);
}
.step-card h3 { font-size: 16px; font-weight: 800; margin: 0 0 10px 0; color: #fff; transform: translateZ(15px); }
.step-card p { font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0; transform: translateZ(10px); }
`,
    js: (text) => `
const grid = document.getElementById('steps-grid');
const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

if (parts.length < 3) {
  parts = [
    "1. Select Model - Pick a component",
    "2. Customize - Edit colors and parameters",
    "3. Export Code - Drop into your web project"
  ];
}

grid.innerHTML = '';
parts.forEach((part, i) => {
  const sides = part.split('-');
  const title = sides[0] ? sides[0].trim() : "Step " + (i + 1);
  const desc = sides[1] ? sides[1].trim() : "Integration step";

  const card = document.createElement('div');
  card.className = 'step-card';
  card.innerHTML = \`
    <div class="step-num">\${i + 1}</div>
    <h3>\${title}</h3>
    <p>\${desc}</p>
  \`;
  grid.appendChild(card);
});
`
  },

  partner_logos_3d: {
    category: "sections",
    name: { fr: "Mur Parallaxe Logos Partenaires 3D", en: "3D Parallax Partner Logo Wall" },
    inputs: ["text"],
    defaultText: { fr: "React, WebGL, Stripe, Vercel, Tailwind, Next.js", en: "React, WebGL, Stripe, Vercel, Tailwind, Next.js" },
    html: (text, cPrim, cSec) => `
<div class="logos-section" id="logos-scene" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="logos-header">
    <h2>POWERED BY NEXT-GEN TECH</h2>
  </div>
  <div class="logos-grid-3d" id="logos-grid">
    <!-- Logos injected dynamically -->
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; }
.logos-section { width: 90%; max-width: 750px; text-align: center; }
.logos-header h2 { font-size: 12px; letter-spacing: 3px; color: var(--c1); margin: 0 0 30px 0; }

.logos-grid-3d {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  transform-style: preserve-3d; transition: transform 0.1s ease;
}
.logo-box-3d {
  background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px; padding: 20px; text-align: center;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  font-weight: 800; font-size: 15px; color: #cbd5e1; letter-spacing: 1px;
  transform-style: preserve-3d; transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}
.logo-box-3d:hover {
  color: #fff; border-color: var(--c1); box-shadow: 0 0 20px var(--c1)40;
}
`,
    js: (text) => `
const grid = document.getElementById('logos-grid');
const scene = document.getElementById('logos-scene');
const raw = "${text}";
let parts = raw.split(',').map(x => x.trim()).filter(x => x.length > 0);

if (parts.length < 3) {
  parts = ["React", "WebGL", "Stripe", "Vercel", "Tailwind", "Next.js"];
}

grid.innerHTML = '';
parts.forEach((name, i) => {
  const box = document.createElement('div');
  box.className = 'logo-box-3d';
  box.textContent = name;
  
  // Assign different initial Z depths for parallax layered effect
  const depth = (i % 3 + 1) * 15;
  box.style.transform = \`translateZ(\${depth}px)\`;
  grid.appendChild(box);
});

// Parallax tilt on mouse movement
document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  grid.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  grid.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  unboxing_gift_3d: {
    category: "ads_promo",
    name: { fr: "Boîte Cadeau Promo 3D Real", en: "3D Realistic Unboxing Gift Box" },
    inputs: ["text"],
    defaultText: { fr: "OFFRE SPÉCIALE - -50% CODE: PROMO50", en: "SPECIAL OFFER - -50% CODE: PROMO50" },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["SPECIAL OFFER", text];
      const title = parts[0] ? parts[0].trim() : "SPECIAL OFFER";
      const code = parts[1] ? parts[1].trim() : text;
      return `
<div class="gift-container" id="gift-container">
  <div class="cube-scene">
    <!-- REAL 3D GIFT BOX CUBE -->
    <div class="gift-cube-3d" id="gift-cube" style="--c1: ${cPrim}; --c2: ${cSec};">
      <!-- CUBE BODY -->
      <div class="cube-face face-front"><div class="ribbon-v"></div></div>
      <div class="cube-face face-back"><div class="ribbon-v"></div></div>
      <div class="cube-face face-left"><div class="ribbon-h"></div></div>
      <div class="cube-face face-right"><div class="ribbon-h"></div></div>
      <div class="cube-face face-bottom"></div>
      
      <!-- CUBE LID (DETACHABLE 3D CAP) -->
      <div class="gift-lid-3d" id="gift-lid-3d">
        <div class="lid-face lid-top">
          <div class="ribbon-v"></div><div class="ribbon-h"></div>
          <div class="bow-3d">🎀</div>
        </div>
        <div class="lid-face lid-front"></div>
        <div class="lid-face lid-back"></div>
        <div class="lid-face lid-left"></div>
        <div class="lid-face lid-right"></div>
      </div>
      
      <!-- POP-UP VOUCHER CARD INSIDE -->
      <div class="gift-voucher-3d" id="gift-voucher-3d">
        <div class="v-tag">${title}</div>
        <div class="v-code">${code}</div>
        <button class="v-btn" id="v-copy-btn">Claim Coupon</button>
      </div>
    </div>
  </div>
  <div class="gift-hint">Click the gift box to open!</div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; user-select: none; }
.gift-container { display: flex; flex-direction: column; align-items: center; gap: 35px; cursor: pointer; }
.cube-scene { width: 220px; height: 220px; display: flex; justify-content: center; align-items: center; perspective: 1000px; }
.gift-cube-3d {
  position: relative; width: 140px; height: 140px; transform-style: preserve-3d;
  transform: rotateX(-22deg) rotateY(32deg); transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 3D Faces of Body */
.cube-face {
  position: absolute; width: 140px; height: 140px; background: linear-gradient(135deg, #1e1b4b 0%, #030712 100%);
  border: 1px solid var(--c1); box-shadow: inset 0 0 15px var(--c1)30; display: flex; justify-content: center; align-items: center;
}
.face-front  { transform: translateZ(70px); }
.face-back   { transform: rotateY(180deg) translateZ(70px); }
.face-left   { transform: rotateY(-90deg) translateZ(70px); }
.face-right  { transform: rotateY(90deg) translateZ(70px); }
.face-bottom { transform: rotateX(-90deg) translateZ(70px); background: #000; box-shadow: 0 30px 50px rgba(0,0,0,0.8); }

/* Golden Ribbons */
.ribbon-v { position: absolute; width: 26px; height: 100%; background: linear-gradient(90deg, #f59e0b, #fef08a, #d97706); box-shadow: 0 0 10px rgba(245,158,11,0.5); }
.ribbon-h { position: absolute; height: 26px; width: 100%; background: linear-gradient(180deg, #f59e0b, #fef08a, #d97706); box-shadow: 0 0 10px rgba(245,158,11,0.5); }

/* 3D Lid */
.gift-lid-3d {
  position: absolute; top: -10px; left: -8px; width: 156px; height: 156px; transform-style: preserve-3d;
  transform: translateZ(0); transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 10;
}
.lid-face { position: absolute; background: linear-gradient(135deg, var(--c1), #1e1b4b); border: 1px solid rgba(255,255,255,0.2); }
.lid-top { width: 156px; height: 156px; transform: rotateX(90deg) translateZ(78px); display: flex; justify-content: center; align-items: center; }
.lid-front { width: 156px; height: 24px; transform: translateZ(78px) translateY(66px); }
.lid-back { width: 156px; height: 24px; transform: rotateY(180deg) translateZ(78px) translateY(66px); }
.lid-left { width: 156px; height: 24px; transform: rotateY(-90deg) translateZ(78px) translateY(66px); }
.lid-right { width: 156px; height: 24px; transform: rotateY(90deg) translateZ(78px) translateY(66px); }
.bow-3d { font-size: 42px; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5)); transform: translateZ(10px); }

/* OPEN STATE ANIMATION */
.gift-cube-3d.open .gift-lid-3d {
  transform: translateY(-160px) rotateX(-50deg) rotateZ(20deg);
}

/* POP-UP VOUCHER */
.gift-voucher-3d {
  position: absolute; top: 10px; left: 10px; width: 120px; padding: 15px 12px;
  background: rgba(15,23,42,0.95); border: 2px dashed #f59e0b; border-radius: 16px;
  box-sizing: border-box; text-align: center; backdrop-filter: blur(10px);
  transform: translateZ(20px) scale(0.6); opacity: 0; pointer-events: none;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 20px #f59e0b50;
}
.gift-cube-3d.open .gift-voucher-3d {
  transform: translateZ(90px) translateY(-70px) scale(1.15); opacity: 1; pointer-events: auto;
}
.v-tag { font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; margin-bottom: 4px; }
.v-code { font-size: 14px; font-weight: 900; color: #fef08a; text-shadow: 0 0 8px #f59e0b; margin-bottom: 10px; }
.v-btn { background: #f59e0b; border: none; padding: 6px 12px; border-radius: 8px; color: #000; font-weight: 800; font-size: 10px; cursor: pointer; }

.gift-hint { color: #94a3b8; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
`,
    js: () => `
const container = document.getElementById('gift-container');
const cube = document.getElementById('gift-cube');

let isOpen = false;
container.addEventListener('click', () => {
  isOpen = !isOpen;
  cube.classList.toggle('open', isOpen);
});

document.addEventListener('mousemove', (e) => {
  if (isOpen) return;
  const r = cube.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = -22 + (0.5 - (y / r.height)) * 25;
  const ry = 32 + ((x / r.width) - 0.5) * 25;
  cube.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  holographic_sticker_3d: {
    category: "ads_promo",
    name: { fr: "Sticker Promo Holographique 3D", en: "3D Holographic Promo Sticker" },
    inputs: ["text"],
    defaultText: { fr: "BLACK FRIDAY - -70% SUR TOUT", en: "BLACK FRIDAY - -70% OFF SITEWIDE" },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["BLACK FRIDAY", text];
      const title = parts[0] ? parts[0].trim() : "BLACK FRIDAY";
      const offer = parts[1] ? parts[1].trim() : text;
      return `
<div class="sticker-scene">
  <div class="holo-sticker-3d" id="holo-sticker" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="holo-glare" id="holo-glare"></div>
    <div class="sticker-content">
      <div class="sticker-tag">🔥 LIMITED OFFER</div>
      <h2 class="sticker-title">${title}</h2>
      <div class="sticker-offer">${offer}</div>
      <div class="timer-row">
        <span id="t-hours">04</span>h : <span id="t-mins">29</span>m : <span id="t-secs">59</span>s
      </div>
    </div>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.sticker-scene { width: 340px; height: 240px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
.holo-sticker-3d {
  position: relative; width: 300px; padding: 30px 24px;
  background: linear-gradient(135deg, rgba(255,0,128,0.12), rgba(0,255,240,0.12), rgba(255,215,0,0.12)), #0f172a;
  border: 2px solid var(--c1); border-radius: 24px; box-sizing: border-box; text-align: center;
  transform-style: preserve-3d; transition: transform 0.1s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 25px var(--c1)40, inset 0 0 15px var(--c2)30;
  overflow: hidden;
}
.holo-glare {
  position: absolute; inset: -100%;
  background: linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%);
  pointer-events: none; transform: rotate(30deg); transition: transform 0.1s ease;
}
.sticker-tag { font-size: 11px; font-weight: 900; letter-spacing: 2px; color: #fcd34d; margin-bottom: 10px; transform: translateZ(20px); text-shadow: 0 0 8px #fcd34d; }
.sticker-title { font-size: 24px; font-weight: 900; margin: 0 0 8px 0; color: #fff; transform: translateZ(30px); text-shadow: 0 0 12px var(--c1); }
.sticker-offer { font-size: 15px; font-weight: 800; color: var(--c1); margin-bottom: 20px; transform: translateZ(25px); }
.timer-row { font-family: monospace; font-size: 15px; font-weight: 900; color: #fff; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 12px; display: inline-block; transform: translateZ(20px); box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
`,
    js: () => `
const sticker = document.getElementById('holo-sticker');
const glare = document.getElementById('holo-glare');

// Live Countdown Timer logic
let totalSecs = 4 * 3600 + 29 * 60 + 59;
setInterval(() => {
  if (totalSecs > 0) totalSecs--;
  const h = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
  const s = String(totalSecs % 60).padStart(2, '0');
  const hEl = document.getElementById('t-hours');
  const mEl = document.getElementById('t-mins');
  const sEl = document.getElementById('t-secs');
  if (hEl) hEl.textContent = h;
  if (mEl) mEl.textContent = m;
  if (sEl) sEl.textContent = s;
}, 1000);

document.addEventListener('mousemove', (e) => {
  const r = sticker.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  sticker.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  glare.style.transform = \`translate(\${x * 0.4}px, \${y * 0.4}px) rotate(30deg)\`;
});
document.addEventListener('mouseleave', () => {
  sticker.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
`
  },

  announcement_toast_3d: {
    category: "ads_promo",
    name: { fr: "Barre d'Annonce Pop-up 3D", en: "3D Announcement Toast Bar" },
    inputs: ["text"],
    defaultText: { fr: "⚡ VENTE FLASH - Jusqu'à -60% sur tous les modules 3D cet été!", en: "⚡ FLASH SALE - Up to 60% off all 3D UI templates this summer!" },
    html: (text, cPrim, cSec) => `
<div class="toast-scene">
  <div class="toast-bar-3d" id="toast-bar" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="toast-speaker">📢</div>
    <div class="toast-msg">${text}</div>
    <button class="toast-cta-btn">Claim Now</button>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.toast-scene { width: 90%; max-width: 550px; display: flex; justify-content: center; }
.toast-bar-3d {
  display: flex; align-items: center; gap: 16px; width: 100%; padding: 14px 20px;
  background: rgba(15,23,42,0.85); border: 1px solid var(--c1); border-radius: 20px; box-sizing: border-box;
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d; transform: rotateX(10deg); transition: transform 0.1s ease;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 20px var(--c1)30;
}
.toast-speaker { font-size: 26px; animation: bounceSpeaker 2s infinite ease-in-out; transform: translateZ(20px); }
@keyframes bounceSpeaker { 0%, 100% { transform: translateZ(20px) rotate(0deg); } 50% { transform: translateZ(25px) rotate(-15deg); } }
.toast-msg { flex-grow: 1; font-size: 13px; font-weight: 700; color: #f8fafc; line-height: 1.4; transform: translateZ(15px); }
.toast-cta-btn {
  background: var(--c1); border: none; padding: 10px 18px; border-radius: 12px;
  color: #fff; font-weight: 800; font-size: 12px; cursor: pointer; white-space: nowrap;
  box-shadow: 0 5px 15px var(--c1)40; transition: transform 0.2s ease; transform: translateZ(20px);
}
.toast-cta-btn:hover { background: var(--c2); transform: translateZ(25px) scale(1.05); }
`,
    js: () => `
const toast = document.getElementById('toast-bar');
document.addEventListener('mousemove', (e) => {
  const r = toast.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 15; const ry = ((x / r.width) - 0.5) * 15;
  toast.style.transform = \`rotateX(\${10 + rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  toast.style.transform = 'rotateX(10deg) rotateY(0deg)';
});
`
  },

  spin_wheel_3d: {
    category: "ads_promo",
    name: { fr: "Roue de la Fortune Promo 3D", en: "3D Spin & Win Lucky Wheel" },
    inputs: ["text"],
    defaultText: { fr: "TOURNER & GAGNER", en: "SPIN & WIN" },
    html: (text, cPrim, cSec) => `
<div class="wheel-scene">
  <div class="wheel-wrap" id="wheel-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="wheel-pointer">▼</div>
    <canvas id="wheel-canvas" width="240" height="240"></canvas>
    <button class="wheel-spin-btn" id="spin-btn">${text}</button>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.wheel-scene { width: 300px; height: 300px; display: flex; justify-content: center; align-items: center; }
.wheel-wrap { position: relative; width: 240px; height: 240px; display: flex; justify-content: center; align-items: center; transform-style: preserve-3d; transform: rotateX(20deg); transition: transform 0.1s ease; }
.wheel-pointer { position: absolute; top: -15px; z-index: 20; font-size: 22px; color: var(--c2); text-shadow: 0 0 10px var(--c2); }
#wheel-canvas { position: absolute; inset: 0; border-radius: 50%; box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px var(--c1)40; }
.wheel-spin-btn {
  position: absolute; z-index: 10; width: 70px; height: 70px; border-radius: 50%;
  background: linear-gradient(135deg, var(--c1), var(--c2)); border: 3px solid #fff;
  color: #fff; font-weight: 900; font-size: 10px; cursor: pointer; text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5); transition: transform 0.2s ease;
}
.wheel-spin-btn:hover { transform: scale(1.08); }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const wrap = document.getElementById('wheel-wrap');

const prizes = ["-10%", "-20%", "FREE GIFT", "-50%", "VIP PASS", "-30%"];
const numPrizes = prizes.length;
const arc = (Math.PI * 2) / numPrizes;
let currentAngle = 0;
let isSpinning = false;

function drawWheel() {
  ctx.clearRect(0,0,240,240);
  const cx = 120, cy = 120, r = 110;

  for (let i = 0; i < numPrizes; i++) {
    const angle = currentAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? '${cPrim}' : '#1e293b';
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + arc);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.stroke();

    // Prize text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 11px Space Grotesk";
    ctx.fillText(prizes[i], r - 15, 4);
    ctx.restore();
  }
}
drawWheel();

spinBtn.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;

  const spins = 5 + Math.random() * 5;
  const targetAngle = currentAngle + spins * Math.PI * 2 + Math.random() * Math.PI * 2;
  const duration = 4000;
  const startTime = performance.now();

  function animateSpin(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    currentAngle = targetAngle * easeOut;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
    }
  }
  requestAnimationFrame(animateSpin);
});

document.addEventListener('mousemove', (e) => {
  const r = wrap.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  wrap.style.transform = 'rotateX(' + (20 + rx) + 'deg) rotateY(' + ry + 'deg)';
});
document.addEventListener('mouseleave', () => {
  wrap.style.transform = 'rotateX(20deg) rotateY(0deg)';
});
`
  },

  achievement_trophy_3d: {
    category: "gamification",
    name: { fr: "Troféu 3D Déblocage Réussite", en: "3D Achievement Unlocked Trophy" },
    inputs: ["text"],
    defaultText: { fr: "NIVEAU SUPÉRIEUR - Trophée Légendaire Débloqué!", en: "LEVEL UP - Legendary Trophy Unlocked!" },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["LEVEL UP", text];
      const title = parts[0] ? parts[0].trim() : "LEVEL UP";
      const desc = parts[1] ? parts[1].trim() : text;
      return `
<div class="trophy-scene" id="trophy-scene">
  <div class="trophy-wrap-3d" id="trophy-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="trophy-star">⭐</div>
    <div class="trophy-cup">🏆</div>
    <div class="trophy-pedestal">
      <div class="pedestal-top"></div>
      <div class="pedestal-base"></div>
    </div>
  </div>

  <div class="achievement-badge-3d" id="achievement-badge">
    <div class="badge-header">🏆 ACHIEVEMENT UNLOCKED</div>
    <div class="badge-title">${title}</div>
    <div class="badge-desc">${desc}</div>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #030712; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; user-select: none; }
.trophy-scene { display: flex; flex-direction: column; align-items: center; gap: 30px; cursor: pointer; }
.trophy-wrap-3d {
  position: relative; width: 140px; height: 180px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; transform-style: preserve-3d;
  transform: rotateX(10deg); transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.trophy-star {
  font-size: 32px; filter: drop-shadow(0 0 15px #fcd34d); animation: floatStar 2s infinite ease-in-out;
  transform: translateZ(30px); margin-bottom: -15px; z-index: 10;
}
@keyframes floatStar { 0%, 100% { transform: translateZ(30px) translateY(0); } 50% { transform: translateZ(40px) translateY(-8px); } }
.trophy-cup {
  font-size: 80px; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6)); transform: translateZ(20px);
  transition: transform 0.5s;
}
.trophy-pedestal { position: relative; width: 100px; height: 24px; margin-top: -10px; transform-style: preserve-3d; }
.pedestal-top { width: 100px; height: 12px; background: linear-gradient(135deg, var(--c1), #1e293b); border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); }
.pedestal-base { width: 120px; height: 12px; background: #0f172a; margin: 2px -10px 0 -10px; border-radius: 6px; border: 1px solid var(--c1); box-shadow: 0 10px 20px rgba(0,0,0,0.6); }

/* Spin spin unlock animation */
.trophy-wrap-3d.unlocked {
  transform: rotateY(720deg) rotateX(15deg) scale(1.1);
}

.achievement-badge-3d {
  background: rgba(15,23,42,0.9); border: 2px solid #fcd34d; border-radius: 20px;
  padding: 18px 28px; text-align: center; backdrop-filter: blur(20px);
  opacity: 0; transform: scale(0.7) translateY(20px); transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 25px #fcd34d40; pointer-events: none;
}
.achievement-badge-3d.show { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
.badge-header { font-size: 10px; font-weight: 900; letter-spacing: 2px; color: #fcd34d; margin-bottom: 6px; }
.badge-title { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 4px; }
.badge-desc { font-size: 12px; color: #94a3b8; font-weight: 600; }
`,
    js: () => `
const scene = document.getElementById('trophy-scene');
const trophy = document.getElementById('trophy-wrap');
const badge = document.getElementById('achievement-badge');

let isUnlocked = false;
scene.addEventListener('click', () => {
  isUnlocked = !isUnlocked;
  trophy.classList.toggle('unlocked', isUnlocked);
  badge.classList.toggle('show', isUnlocked);
});

document.addEventListener('mousemove', (e) => {
  if (isUnlocked) return;
  const r = trophy.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = 10 + (0.5 - (y / r.height)) * 20;
  const ry = ((x / r.width) - 0.5) * 20;
  trophy.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  crystal_ball_3d: {
    category: "gamification",
    name: { fr: "Boule de Cristal 3D Décisions", en: "3D Magic Decision Crystal Ball" },
    inputs: ["text"],
    defaultText: { fr: "RÉPONSE: SUCCÈS GARANTI", en: "ANSWER: GUARANTEED SUCCESS" },
    html: (text, cPrim, cSec) => `
<div class="crystal-scene" id="crystal-scene">
  <div class="ball-wrapper" id="ball-wrapper" style="--c1: ${cPrim}; --c2: ${cSec};">
    <canvas id="nebula-canvas" width="220" height="220"></canvas>
    <div class="glass-sphere-reflection"></div>
    <div class="crystal-answer" id="crystal-answer">❓</div>
  </div>
  <div class="crystal-stand">
    <div class="stand-ring"></div>
  </div>
  <div class="ball-hint">Click the crystal ball to consult destiny!</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.crystal-scene { display: flex; flex-direction: column; align-items: center; gap: 20px; cursor: pointer; }
.ball-wrapper {
  position: relative; width: 220px; height: 220px; border-radius: 50%;
  transform-style: preserve-3d; transition: transform 0.1s ease;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 35px var(--c1)40, inset 0 0 25px rgba(255,255,255,0.2);
}
#nebula-canvas { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, #1e1b4b, #020205); }
.glass-sphere-reflection {
  position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15);
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3) 0%, transparent 60%);
  pointer-events: none; z-index: 10;
}
.crystal-answer {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  z-index: 15; font-size: 16px; font-weight: 900; color: #fff; text-shadow: 0 0 12px var(--c1);
  text-align: center; padding: 25px; box-sizing: border-box; letter-spacing: 1px;
  opacity: 0; transform: scale(0.5); transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.crystal-answer.revealed { opacity: 1; transform: scale(1); }

.crystal-stand { width: 140px; height: 24px; display: flex; justify-content: center; margin-top: -15px; }
.stand-ring { width: 120px; height: 20px; background: linear-gradient(135deg, #334155, #0f172a); border: 2px solid var(--c1); border-radius: 50%; box-shadow: 0 10px 20px rgba(0,0,0,0.6); }
.ball-hint { color: #94a3b8; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');
const answerEl = document.getElementById('crystal-answer');
const scene = document.getElementById('crystal-scene');
const ballWrap = document.getElementById('ball-wrapper');

const userText = "${text}";
const answers = [
  userText || "YES - ABSOLUTELY",
  "DISCOUNT: -30% OFF",
  "DESTINY CONFIRMED",
  "FUTURE IS BRIGHT",
  "TRY AGAIN LATER"
];

// Canvas particle nebula
const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: 110 + (Math.random() - 0.5) * 140,
    y: 110 + (Math.random() - 0.5) * 140,
    r: 2 + Math.random() * 4,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    color: Math.random() > 0.5 ? '${cPrim}' : '${cSec}'
  });
}

let isSwirling = false;
function drawNebula() {
  ctx.fillStyle = 'rgba(2, 2, 5, 0.2)';
  ctx.fillRect(0, 0, 220, 220);

  particles.forEach(p => {
    p.x += p.vx * (isSwirling ? 4 : 1);
    p.y += p.vy * (isSwirling ? 4 : 1);

    const dist = Math.hypot(p.x - 110, p.y - 110);
    if (dist > 95) {
      p.x = 110; p.y = 110;
    }

    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawNebula);
}
drawNebula();

scene.addEventListener('click', () => {
  isSwirling = true;
  answerEl.classList.remove('revealed');

  setTimeout(() => {
    isSwirling = false;
    const picked = answers[Math.floor(Math.random() * answers.length)];
    answerEl.textContent = picked;
    answerEl.classList.add('revealed');
  }, 1200);
});

document.addEventListener('mousemove', (e) => {
  const r = ballWrap.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  ballWrap.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  mystic_tarot_3d: {
    category: "gamification",
    name: { fr: "Carte de Tarot Mistique 3D", en: "3D Mystic Tarot Card Flip" },
    inputs: ["text"],
    defaultText: { fr: "LE MAGICIEN - Le pouvoir de créer votre propre destinée est entre vos mains.", en: "THE MAGICIAN - The power to shape your destiny lies within your hands." },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["THE MAGICIAN", text];
      const title = parts[0] ? parts[0].trim() : "THE MAGICIAN";
      const desc = parts[1] ? parts[1].trim() : text;
      return `
<div class="tarot-scene" id="tarot-scene">
  <div class="tarot-card-3d" id="tarot-card" style="--c1: ${cPrim}; --c2: ${cSec};">
    <!-- BACK FACE -->
    <div class="tarot-face tarot-back">
      <div class="tarot-border-pattern">
        <div class="mystic-symbol">🔮</div>
        <div class="mystic-sub">CLICK TO REVEAL</div>
      </div>
    </div>
    
    <!-- FRONT FACE -->
    <div class="tarot-face tarot-front">
      <div class="tarot-inner-border">
        <div class="tarot-icon">🌙</div>
        <h3 class="tarot-title">${title}</h3>
        <p class="tarot-desc">${desc}</p>
      </div>
    </div>
  </div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; user-select: none; }
.tarot-scene { width: 300px; height: 420px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
.tarot-card-3d {
  position: relative; width: 220px; height: 350px; transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 25px 50px rgba(0,0,0,0.8); border-radius: 18px;
}
.tarot-card-3d.flipped { transform: rotateY(180deg); }

.tarot-face {
  position: absolute; inset: 0; backface-visibility: hidden; border-radius: 18px;
  border: 3px solid #fcd34d; padding: 12px; box-sizing: border-box; transform-style: preserve-3d;
}
.tarot-back {
  background: radial-gradient(circle, #1e1b4b 0%, #030712 100%);
  display: flex; align-items: center; justify-content: center;
}
.tarot-border-pattern {
  width: 100%; height: 100%; border: 1px dashed rgba(252,211,77,0.4); border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;
}
.mystic-symbol { font-size: 50px; filter: drop-shadow(0 0 15px var(--c1)); transform: translateZ(20px); }
.mystic-sub { font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #fcd34d; transform: translateZ(15px); }

.tarot-front {
  background: linear-gradient(135deg, #0f172a 0%, #020205 100%);
  transform: rotateY(180deg); display: flex; align-items: center; justify-content: center;
}
.tarot-inner-border {
  width: 100%; height: 100%; border: 1px solid var(--c1); border-radius: 12px;
  padding: 20px 15px; box-sizing: border-box; display: flex; flex-direction: column;
  align-items: center; justify-content: space-between; text-align: center;
}
.tarot-icon { font-size: 40px; color: var(--c1); filter: drop-shadow(0 0 12px var(--c1)); transform: translateZ(25px); }
.tarot-title { font-size: 18px; font-weight: 900; color: #fcd34d; letter-spacing: 1.5px; margin: 0; transform: translateZ(30px); }
.tarot-desc { font-size: 12px; color: #cbd5e1; line-height: 1.5; margin: 0; transform: translateZ(20px); }
`,
    js: () => `
const scene = document.getElementById('tarot-scene');
const card = document.getElementById('tarot-card');

let isFlipped = false;
scene.addEventListener('click', () => {
  isFlipped = !isFlipped;
  card.classList.toggle('flipped', isFlipped);
});

document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 25;
  const ry = (isFlipped ? 180 : 0) + ((x / r.width) - 0.5) * 25;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  holographic_hourglass_3d: {
    category: "gamification",
    name: { fr: "Clepsydre Holographique 3D Real", en: "3D Realistic Holographic Hourglass" },
    inputs: ["text"],
    defaultText: { fr: "TEMPS ÉCOULÉ - Cliquez pour retourner la clepsydre et relancer le temps", en: "TIME ELAPSED - Click to flip the hourglass and reset time" },
    html: (text, cPrim, cSec) => `
<div class="hg-scene" id="hg-scene">
  <div class="hg-wrapper" id="hg-wrapper" style="--c1: ${cPrim}; --c2: ${cSec};">
    <!-- TOP & BOTTOM CAP PEDESTALS -->
    <div class="hg-cap top-cap"></div>
    
    <!-- GLASS BODY WITH SVG HOURGLASS WAIST & CANVAS -->
    <div class="hg-glass-body">
      <canvas id="sand-canvas" width="140" height="220"></canvas>
      
      <!-- SVG GLASS REFLECTION OVERLAY -->
      <svg class="hg-glass-svg" viewBox="0 0 140 220">
        <path class="glass-outline" d="M 15 10 C 15 70 60 100 66 110 C 60 120 15 150 15 210 L 125 210 C 125 150 80 120 74 110 C 80 100 125 70 125 10 Z" fill="none" stroke="${cPrim}" stroke-width="2.5" opacity="0.6"/>
        <path class="glass-sheen" d="M 22 15 C 22 65 58 95 64 105" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      </svg>
    </div>

    <div class="hg-cap bottom-cap"></div>
  </div>
  <div class="hg-caption" id="hg-caption">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1200px; color: #fff; user-select: none; }
.hg-scene { display: flex; flex-direction: column; align-items: center; gap: 30px; cursor: pointer; }
.hg-wrapper {
  position: relative; width: 140px; height: 250px; display: flex; flex-direction: column;
  align-items: center; justify-content: space-between; transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.hg-cap {
  width: 140px; height: 16px; background: linear-gradient(135deg, #334155, #0f172a);
  border: 2px solid var(--c1); border-radius: 10px; box-shadow: 0 0 15px var(--c1)50, 0 10px 20px rgba(0,0,0,0.6); z-index: 10;
}
.hg-glass-body {
  position: relative; width: 140px; height: 220px; display: flex; justify-content: center; align-items: center;
}
#sand-canvas { position: absolute; inset: 0; z-index: 2; }
.hg-glass-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none; filter: drop-shadow(0 0 10px var(--c1)); }

.hg-wrapper.flipped { transform: rotateZ(180deg); }
.hg-caption { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; text-align: center; max-width: 280px; }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('sand-canvas');
const ctx = canvas.getContext('2d');
const hgWrap = document.getElementById('hg-wrapper');
const scene = document.getElementById('hg-scene');

let currentAngle = 0;
let sandTopLevel = 50; // top sand height
let sandBottomLevel = 0; // bottom sand accumulation pile

// Glowing particles
const particles = [];
for (let i = 0; i < 120; i++) {
  particles.push({
    x: 70 + (Math.random() - 0.5) * 60,
    y: 15 + Math.random() * 60,
    r: 1.2 + Math.random() * 2,
    vy: 1.2 + Math.random() * 2.5
  });
}

function drawHourglass() {
  ctx.clearRect(0,0,140,220);

  // Hourglass clip path (2 curved bulbs + narrow waist)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(15, 10);
  ctx.bezierCurveTo(15, 70, 60, 100, 66, 110);
  ctx.bezierCurveTo(60, 120, 15, 150, 15, 210);
  ctx.lineTo(125, 210);
  ctx.bezierCurveTo(125, 150, 80, 120, 74, 110);
  ctx.bezierCurveTo(80, 100, 125, 70, 125, 10);
  ctx.closePath();
  ctx.clip();

  // Top Sand Pool (Draining)
  if (sandTopLevel > 0) {
    ctx.fillStyle = '${cPrim}';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '${cPrim}';
    ctx.beginPath();
    ctx.rect(15, 110 - sandTopLevel * 1.5, 110, sandTopLevel * 1.5);
    ctx.fill();
    sandTopLevel -= 0.03;
    if (sandBottomLevel < 50) sandBottomLevel += 0.03;
  }

  // Falling Sand Jet (Stream at waist)
  ctx.fillStyle = '#ffffff';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '${cPrim}';
  particles.forEach(p => {
    p.y += p.vy;
    if (p.y > 200 - sandBottomLevel * 1.2) {
      p.y = 15 + Math.random() * 30;
      p.x = 70 + (Math.random() - 0.5) * 50;
    }

    // Funnel squeeze toward waist (Y: 110)
    if (p.y > 60 && p.y < 150) {
      p.x += (70 - p.x) * 0.15;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Bottom Sand Accumulation Hill
  ctx.fillStyle = '${cPrim}';
  ctx.beginPath();
  ctx.moveTo(15, 210);
  ctx.lineTo(125, 210);
  ctx.lineTo(70, 210 - sandBottomLevel * 1.3);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawHourglass);
}
drawHourglass();

let isFlipped = false;
scene.addEventListener('click', () => {
  isFlipped = !isFlipped;
  currentAngle += 180;
  hgWrap.style.transform = \`rotateZ(\${currentAngle}deg)\`;
  
  // Reset sand pools
  sandTopLevel = 50;
  sandBottomLevel = 0;
  particles.forEach(p => {
    p.y = 15 + Math.random() * 40;
    p.x = 70 + (Math.random() - 0.5) * 50;
  });
});

document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20;
  const ry = ((x / r.width) - 0.5) * 20;
  hgWrap.style.transform = \`rotateZ(\${currentAngle}deg) rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  ancient_scroll_3d: {
    category: "gamification",
    name: { fr: "Parchemin Ancien 3D à Sceau", en: "3D Ancient Scroll with Wax Seal" },
    inputs: ["text"],
    defaultText: { fr: "DECRET IMPÉRIAL - Le savoir est la seule clé de la souveraineté.", en: "ROYAL DECREE - Knowledge is the ultimate key to sovereignty." },
    html: (text, cPrim, cSec) => {
      const parts = text.includes('-') ? text.split('-') : ["ROYAL DECREE", text];
      const title = parts[0] ? parts[0].trim() : "ROYAL DECREE";
      const msg = parts[1] ? parts[1].trim() : text;
      return `
<div class="scroll-scene" id="scroll-scene">
  <div class="scroll-wrap-3d" id="scroll-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="scroll-roll roll-top"></div>
    <div class="scroll-body" id="scroll-body">
      <div class="scroll-content" id="scroll-content">
        <h3 class="scroll-title">${title}</h3>
        <p class="scroll-msg">${msg}</p>
      </div>
      <div class="wax-seal" id="wax-seal">📌</div>
    </div>
    <div class="scroll-roll roll-bottom"></div>
  </div>
  <div class="scroll-hint">Click the wax seal to unroll secret decree!</div>
</div>
`;
    },
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.scroll-scene { display: flex; flex-direction: column; align-items: center; gap: 30px; cursor: pointer; }
.scroll-wrap-3d {
  position: relative; width: 240px; display: flex; flex-direction: column;
  align-items: center; transform-style: preserve-3d; transition: transform 0.1s ease;
}
.scroll-roll {
  width: 260px; height: 20px; background: linear-gradient(90deg, #d97706, #fef08a, #d97706);
  border-radius: 10px; border: 2px solid #78350f; box-shadow: 0 5px 15px rgba(0,0,0,0.6); z-index: 10;
}
.scroll-body {
  position: relative; width: 220px; height: 70px; background: #fef3c7; color: #451a03;
  border-left: 2px solid #d97706; border-right: 2px solid #d97706; box-shadow: inset 0 0 20px rgba(180,83,9,0.3);
  overflow: hidden; transition: height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; align-items: center; justify-content: center;
}
.scroll-wrap-3d.open .scroll-body { height: 220px; }

.scroll-content { padding: 20px; text-align: center; opacity: 0; transition: opacity 0.5s ease 0.3s; }
.scroll-wrap-3d.open .scroll-content { opacity: 1; }
.scroll-title { font-size: 16px; font-weight: 900; letter-spacing: 1px; margin: 0 0 10px 0; color: #78350f; border-bottom: 1px solid #d97706; padding-bottom: 6px; }
.scroll-msg { font-size: 12px; font-weight: 700; line-height: 1.5; margin: 0; color: #451a03; }

.wax-seal {
  position: absolute; width: 44px; height: 44px; background: #dc2626; border: 2px dashed #fef08a;
  border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5); z-index: 15; transition: transform 0.5s, opacity 0.5s;
}
.scroll-wrap-3d.open .wax-seal { transform: scale(0.5) rotate(180deg); opacity: 0; pointer-events: none; }
.scroll-hint { color: #94a3b8; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
`,
    js: () => `
const scene = document.getElementById('scroll-scene');
const scroll = document.getElementById('scroll-wrap');

let isOpen = false;
scene.addEventListener('click', () => {
  isOpen = !isOpen;
  scroll.classList.toggle('open', isOpen);
});

document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  scroll.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  },

  orbital_equalizer_3d: {
    category: "audio_fx",
    name: { fr: "Égaliseur Orbital 3D Synth", en: "3D Orbital Frequency Rings" },
    inputs: ["text"],
    defaultText: { fr: "SPECTRUM AUDIO 3D - Cliquez pour démarrer la synthèse sonore", en: "3D AUDIO SPECTRUM - Click to start audio beat synthesis" },
    html: (text, cPrim, cSec) => `
<div class="eq-scene" id="eq-scene">
  <div class="eq-wrap-3d" id="eq-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <canvas id="eq-canvas" width="260" height="260"></canvas>
    <button class="eq-play-btn" id="eq-play-btn">▶ PLAY BEAT</button>
  </div>
  <div class="eq-caption">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.eq-scene { display: flex; flex-direction: column; align-items: center; gap: 24px; cursor: pointer; }
.eq-wrap-3d {
  position: relative; width: 260px; height: 260px; display: flex; justify-content: center;
  align-items: center; transform-style: preserve-3d; transform: rotateX(30deg); transition: transform 0.1s ease;
}
#eq-canvas { position: absolute; inset: 0; filter: drop-shadow(0 0 15px var(--c1)); }
.eq-play-btn {
  position: absolute; z-index: 10; padding: 12px 24px; background: linear-gradient(135deg, var(--c1), var(--c2));
  border: none; border-radius: 20px; color: #fff; font-weight: 900; font-size: 11px; letter-spacing: 1px;
  cursor: pointer; box-shadow: 0 10px 25px var(--c1)40; transition: transform 0.2s;
}
.eq-play-btn:hover { transform: scale(1.08); }
.eq-caption { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; text-align: center; }
`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('eq-canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('eq-play-btn');
const wrap = document.getElementById('eq-wrap');
const scene = document.getElementById('eq-scene');

let isPlaying = false;
let audioCtx = null;
let osc = null;

const numBars = 32;
const radius = 90;

function drawEqualizer() {
  ctx.clearRect(0,0,260,260);
  const cx = 130, cy = 130;

  for (let i = 0; i < numBars; i++) {
    const angle = (i / numBars) * Math.PI * 2;
    const barLength = isPlaying ? (15 + Math.sin(Date.now() * 0.01 + i * 0.5) * 25 + Math.random() * 10) : 10;

    const x1 = cx + Math.cos(angle) * radius;
    const y1 = cy + Math.sin(angle) * radius;
    const x2 = cx + Math.cos(angle) * (radius + barLength);
    const y2 = cy + Math.sin(angle) * (radius + barLength);

    ctx.strokeStyle = i % 2 === 0 ? '${cPrim}' : '${cSec}';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  requestAnimationFrame(drawEqualizer);
}
drawEqualizer();

btn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  btn.textContent = isPlaying ? '⏸ PAUSE BEAT' : '▶ PLAY BEAT';

  if (isPlaying) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
  } else if (osc) {
    osc.stop();
  }
});

document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = 30 + (0.5 - (y / r.height)) * 25; const ry = ((x / r.width) - 0.5) * 25;
  wrap.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  wrap.style.transform = 'rotateX(30deg) rotateY(0deg)';
});
`
  },

  metallic_knob_3d: {
    category: "audio_fx",
    name: { fr: "Potentiomètre DJ Métallique 3D", en: "3D Metallic DJ Rotary Knob" },
    inputs: ["text"],
    defaultText: { fr: "VOLUME DJ 3D - Faite tourner le bouton métallique pour ajuster le son", en: "VOLUME DJ 3D - Rotate the metallic dial to modulate audio synth" },
    html: (text, cPrim, cSec) => `
<div class="knob-scene" id="knob-scene">
  <div class="knob-wrap-3d" id="knob-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="knob-ring"></div>
    <div class="knob-dial-3d" id="knob-dial">
      <div class="knob-notch"></div>
    </div>
    <div class="knob-value" id="knob-val">50%</div>
  </div>
  <div class="knob-caption">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.knob-scene { display: flex; flex-direction: column; align-items: center; gap: 24px; cursor: pointer; }
.knob-wrap-3d {
  position: relative; width: 180px; height: 180px; display: flex; justify-content: center;
  align-items: center; transform-style: preserve-3d; transform: rotateX(20deg); transition: transform 0.1s ease;
}
.knob-ring {
  position: absolute; inset: -10px; border-radius: 50%; border: 3px dashed var(--c1);
  box-shadow: 0 0 20px var(--c1)50; opacity: 0.8;
}
.knob-dial-3d {
  position: relative; width: 140px; height: 140px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #475569 0%, #0f172a 100%);
  border: 4px solid #334155; box-shadow: 0 15px 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.2);
  display: flex; justify-content: center; transform-style: preserve-3d; transition: transform 0.1s ease;
}
.knob-notch {
  position: absolute; top: 12px; width: 6px; height: 24px; background: var(--c1);
  border-radius: 3px; box-shadow: 0 0 10px var(--c1);
}
.knob-value {
  position: absolute; font-size: 20px; font-weight: 900; color: #fff;
  text-shadow: 0 0 10px var(--c1); transform: translateZ(30px); pointer-events: none;
}
.knob-caption { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; text-align: center; max-width: 280px; }
`,
    js: () => `
const dial = document.getElementById('knob-dial');
const valEl = document.getElementById('knob-val');
const wrap = document.getElementById('knob-wrap');
const scene = document.getElementById('knob-scene');

let rotation = 0;
let isDragging = false;
let startAngle = 0;

scene.addEventListener('mousedown', (e) => {
  isDragging = true;
});
document.addEventListener('mouseup', () => isDragging = false);

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    rotation += e.movementX * 1.5;
    rotation = Math.max(-135, Math.min(135, rotation));
    dial.style.transform = \`rotate(\${rotation}deg)\`;
    const percent = Math.round(((rotation + 135) / 270) * 100);
    valEl.textContent = \`\${percent}%\`;
  } else {
    const r = scene.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    const rx = 20 + (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
    wrap.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
  }
});
`
  },

  cyber_radio_3d: {
    category: "audio_fx",
    name: { fr: "Radio Cyberpunk Rétro 3D", en: "3D Cyberpunk Vacuum Radio" },
    inputs: ["text"],
    defaultText: { fr: "STATION 108.5 FM - Radio Synthwave Cyberpunk", en: "STATION 108.5 FM - Cyberpunk Synthwave Radio" },
    html: (text, cPrim, cSec) => `
<div class="radio-scene" id="radio-scene">
  <div class="radio-box-3d" id="radio-box" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="tubes-row">
      <div class="tube">⚡</div>
      <div class="tube">⚡</div>
      <div class="tube">⚡</div>
    </div>
    <div class="radio-screen">${text}</div>
    <div class="radio-controls">
      <button class="radio-btn" id="r-prev">◄ PREV</button>
      <button class="radio-btn active" id="r-next">NEXT ►</button>
    </div>
  </div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; }
.radio-scene { width: 340px; height: 260px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
.radio-box-3d {
  position: relative; width: 300px; padding: 24px; background: linear-gradient(135deg, #1e1b4b, #0f172a);
  border: 2px solid var(--c1); border-radius: 24px; box-sizing: border-box; text-align: center;
  transform-style: preserve-3d; transform: rotateX(15deg); transition: transform 0.1s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 25px var(--c1)30;
}
.tubes-row { display: flex; justify-content: center; gap: 20px; margin-bottom: 16px; transform: translateZ(20px); }
.tube {
  width: 36px; height: 50px; background: rgba(255,255,255,0.05); border: 1px solid var(--c1);
  border-radius: 18px 18px 6px 6px; display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--c1); box-shadow: 0 0 12px var(--c1)50; animation: tubeGlow 1.5s infinite alternate;
}
@keyframes tubeGlow { from { opacity: 0.6; } to { opacity: 1; } }
.radio-screen {
  background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 12px; font-family: monospace; font-size: 12px; font-weight: 800; color: #fef08a;
  margin-bottom: 20px; transform: translateZ(25px); text-shadow: 0 0 8px #f59e0b;
}
.radio-controls { display: flex; gap: 12px; justify-content: center; transform: translateZ(20px); }
.radio-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px;
  border-radius: 10px; color: #fff; font-weight: 800; font-size: 11px; cursor: pointer; transition: all 0.2s;
}
.radio-btn:hover, .radio-btn.active { background: var(--c1); border-color: var(--c1); box-shadow: 0 5px 15px var(--c1)40; }
`,
    js: () => `
const box = document.getElementById('radio-box');
document.addEventListener('mousemove', (e) => {
  const r = box.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = 15 + (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  box.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
document.addEventListener('mouseleave', () => {
  box.style.transform = 'rotateX(15deg) rotateY(0deg)';
});
`
  },

  pulsating_subwoofer_3d: {
    category: "audio_fx",
    name: { fr: "Caisson de Basse Neon 3D", en: "3D Pulsating Bass Subwoofer" },
    inputs: ["text"],
    defaultText: { fr: "BASS BOOST 3D - Cliquez pour déclencher les pulsations de basse", en: "BASS BOOST 3D - Click to trigger bass pulse wave" },
    html: (text, cPrim, cSec) => `
<div class="sub-scene" id="sub-scene">
  <div class="sub-box-3d" id="sub-box" style="--c1: ${cPrim}; --c2: ${cSec};">
    <div class="sub-outer-ring">
      <div class="sub-cone" id="sub-cone">
        <div class="sub-dust-cap">🔊</div>
      </div>
    </div>
  </div>
  <div class="sub-caption">${text}</div>
</div>
`,
    css: (cPrim, cSec) => `
body { background: #020205; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; perspective: 1000px; color: #fff; user-select: none; }
.sub-scene { display: flex; flex-direction: column; align-items: center; gap: 24px; cursor: pointer; }
.sub-box-3d {
  position: relative; width: 220px; height: 220px; background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 3px solid var(--c1); border-radius: 30px; box-sizing: border-box; display: flex;
  justify-content: center; align-items: center; transform-style: preserve-3d;
  transform: rotateX(20deg); transition: transform 0.1s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 25px var(--c1)40;
}
.sub-outer-ring {
  width: 170px; height: 170px; border-radius: 50%; background: #0f172a;
  border: 4px solid #334155; display: flex; justify-content: center; align-items: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.8); transform-style: preserve-3d;
}
.sub-cone {
  width: 130px; height: 130px; border-radius: 50%; background: radial-gradient(circle, #334155 0%, #030712 100%);
  border: 2px solid var(--c1); display: flex; justify-content: center; align-items: center;
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d;
}
.sub-cone.pulse { transform: translateZ(40px) scale(1.15); filter: drop-shadow(0 0 20px var(--c1)); }
.sub-dust-cap { font-size: 38px; transform: translateZ(15px); }
.sub-caption { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; text-align: center; }
`,
    js: () => `
const scene = document.getElementById('sub-scene');
const box = document.getElementById('sub-box');
const cone = document.getElementById('sub-cone');

scene.addEventListener('click', () => {
  cone.classList.add('pulse');
  setTimeout(() => cone.classList.remove('pulse'), 300);
});

document.addEventListener('mousemove', (e) => {
  const r = scene.getBoundingClientRect();
  const x = e.clientX - r.left; const y = e.clientY - r.top;
  const rx = 20 + (0.5 - (y / r.height)) * 20; const ry = ((x / r.width) - 0.5) * 20;
  box.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
`
  }
};












