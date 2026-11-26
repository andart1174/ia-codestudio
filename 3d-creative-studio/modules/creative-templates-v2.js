/* ============================================================================
   3D CREATIVE STUDIO v2.0 — MODULE 1: 6 FLAGSHIP NEW 3D COMPONENTS (Total: 72!)
   1. globe_3d_widget (Interactive Spinning Dotted 3D Canvas Globe in data_viz)
   2. ai_stream_card_3d (3D Holographic AI Streaming Prompt Terminal in widgets)
   3. pricing_flip_toggle (3D Flip Billing Switch Monthly/Annual in toggles)
   4. bento_grid_3d (Apple-Style 3D Bento Parallax Spotlight Grid in sections)
   5. flip_countdown_3d (3D Mechanical Flip Countdown Banner in ads_promo)
   6. synth_piano_3d (Interactive 3D Polyphonic Web Audio Mini Piano in audio_fx)
   ============================================================================ */
(function () {
  'use strict';
  window.uiTemplates = window.uiTemplates || {};

  // 1. 3D Canvas Spinning Dot-Matrix Globe & Flight Arcs
  window.uiTemplates.globe_3d_widget = {
    category: 'data_viz',
    name: { fr: 'Globe Spatial 3D Interactif', en: 'Interactive 3D Canvas Globe' },
    inputs: ['text'],
    defaultText: { fr: 'RÉSEAU MONDIAL 3D - 142 Nœuds Actifs', en: 'GLOBAL 3D NETWORK - 142 Active Nodes' },
    html: (text, cPrim, cSec) => `
<div class="globe-card" id="globe-card" style="--c1: ${cPrim}; --c2: ${cSec};">
  <canvas id="globe-canvas" width="260" height="260"></canvas>
  <div class="globe-meta">
    <span class="globe-pill">● LIVE TELEMETRY</span>
    <h3>${text}</h3>
  </div>
</div>`,
    css: () => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 1000px; }
.globe-card {
  width: 320px; padding: 22px; border-radius: 24px; text-align: center;
  background: rgba(15, 23, 42, 0.7); border: 1px solid color-mix(in srgb, var(--c1) 45%, transparent);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 28px color-mix(in srgb, var(--c1) 25%, transparent);
  transform-style: preserve-3d; transition: transform 0.1s ease; cursor: grab;
}
#globe-canvas { display: block; margin: 0 auto; filter: drop-shadow(0 0 12px color-mix(in srgb, var(--c1) 40%, transparent)); }
.globe-pill { display: inline-block; margin-top: 8px; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: var(--c2); }
.globe-meta h3 { margin: 6px 0 0; font-size: 14px; color: #f8fafc; }`,
    js: (text, cPrim, cSec) => `
const canvas = document.getElementById('globe-canvas');
const ctx = canvas.getContext('2d');
const card = document.getElementById('globe-card');
const pts = [];
for (let i = 0; i < 160; i++) {
  const phi = Math.acos(1 - 2 * (i + 0.5) / 160);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  pts.push({ phi, theta, hub: i % 16 === 0 });
}
let rotY = 0, vel = 0.012, dragging = false, lastX = 0;
canvas.addEventListener('mousedown', (e) => { dragging = true; lastX = e.clientX; });
document.addEventListener('mouseup', () => dragging = false);
document.addEventListener('mousemove', (e) => {
  if (dragging) { vel = (e.clientX - lastX) * 0.004; lastX = e.clientX; }
  const r = card.getBoundingClientRect();
  const rx = (0.5 - (e.clientY - r.top) / r.height) * 14;
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});
function draw() {
  ctx.clearRect(0, 0, 260, 260);
  rotY += vel;
  vel += (0.01 - vel) * 0.03;
  const cx = 130, cy = 130, R = 96;
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  const proj = pts.map(p => {
    const t = p.theta + rotY;
    const x = Math.sin(p.phi) * Math.cos(t);
    const y = Math.cos(p.phi);
    const z = Math.sin(p.phi) * Math.sin(t);
    return { sx: cx + x * R, sy: cy + y * R, z, hub: p.hub };
  }).sort((a, b) => a.z - b.z);
  proj.forEach(p => {
    const a = Math.max(0.15, (p.z + 1) * 0.5);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.hub ? '${cSec}' : '${cPrim}';
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, p.hub ? 3.8 : 1.9, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();`
  };

  // 2. AI Streaming Terminal Card 3D
  window.uiTemplates.ai_stream_card_3d = {
    category: 'widgets',
    name: { fr: 'Carte Terminal Streaming IA 3D', en: '3D AI Streaming Terminal Card' },
    inputs: ['text'],
    defaultText: { fr: 'Génère un shader quantique 60 FPS en WebGL avec reflets néon...', en: 'Generate a 60 FPS quantum WebGL shader with neon fresnel reflections...' },
    html: (text, cPrim, cSec) => `
<div class="ai-term-card" id="ai-term-card" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="ai-term-top">
    <span class="ai-chip">✨ AI ENGINE v2</span>
    <button type="button" class="ai-replay" id="ai-replay">▶ STREAM</button>
  </div>
  <div class="ai-prompt-box">&gt; ${text}</div>
  <div class="ai-stream-out" id="ai-stream-out"></div>
</div>`,
    css: () => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 1000px; }
.ai-term-card {
  width: 360px; max-width: 92vw; padding: 22px; border-radius: 22px;
  background: rgba(15, 23, 42, 0.78); border: 1px solid var(--c1);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 24px color-mix(in srgb, var(--c1) 30%, transparent);
  transform-style: preserve-3d; transition: transform 0.12s ease;
}
.ai-term-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; transform: translateZ(20px); }
.ai-chip { font-size: 10px; font-weight: 800; color: var(--c1); letter-spacing: 1.5px; }
.ai-replay { background: linear-gradient(135deg, var(--c1), var(--c2)); border: none; color: #fff; font-weight: 800; font-size: 11px; padding: 6px 12px; border-radius: 10px; cursor: pointer; }
.ai-prompt-box { background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 12px; font-size: 12px; color: var(--c2); margin-bottom: 12px; transform: translateZ(14px); }
.ai-stream-out { background: #020617; border-radius: 10px; padding: 12px; min-height: 86px; font-family: monospace; font-size: 11px; line-height: 1.55; color: #cbd5e1; border-left: 3px solid var(--c1); transform: translateZ(18px); white-space: pre-wrap; }`,
    js: () => `
const card = document.getElementById('ai-term-card');
const out = document.getElementById('ai-stream-out');
const btn = document.getElementById('ai-replay');
const sample = "Compiling GLSL vertex & fresnel fragments...\\n[OK] 60 FPS lock verified\\n[OK] Specular reflections calibrated\\n[DONE] Ready for 1-click export ⚡";
let timer = null;
function stream() {
  if (timer) clearInterval(timer);
  let i = 0;
  out.textContent = '';
  timer = setInterval(() => {
    out.textContent = sample.slice(0, ++i) + (i < sample.length ? '▌' : '');
    if (i >= sample.length) clearInterval(timer);
  }, 22);
}
stream();
btn.addEventListener('click', stream);
document.addEventListener('mousemove', (e) => {
  const r = card.getBoundingClientRect();
  const rx = (0.5 - (e.clientY - r.top) / r.height) * 18;
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 18;
  card.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg)\`;
});`
  };

  // 3. 3D Billing Flip Pricing Switch (Monthly <-> Yearly -30%)
  window.uiTemplates.pricing_flip_toggle = {
    category: 'toggles',
    name: { fr: 'Switch Tarifs 3D Flip (-30%)', en: '3D Flip Pricing Switch (-30%)' },
    inputs: ['text'],
    defaultText: { fr: 'PRO STUDIO - $19/mo - $12/mo', en: 'PRO STUDIO - $19/mo - $12/mo' },
    html: (text, cPrim, cSec) => {
      const parts = text.split('-').map(s => s.trim());
      const plan = parts[0] || 'PRO STUDIO';
      const pMon = parts[1] || '$19/mo';
      const pYr = parts[2] || '$12/mo';
      return `
<div class="pf-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
  <button type="button" class="pf-toggle-btn" id="pf-toggle">
    <span class="pf-opt active" data-mode="m">MONTHLY</span>
    <span class="pf-opt" data-mode="y">ANNUAL (-30%)</span>
  </button>
  <div class="pf-card" id="pf-card">
    <div class="pf-face pf-front">
      <div class="pf-plan">${plan}</div>
      <div class="pf-price">${pMon}</div>
      <div class="pf-sub">Flexible monthly access</div>
    </div>
    <div class="pf-face pf-back">
      <div class="pf-plan">${plan} ★</div>
      <div class="pf-price">${pYr}</div>
      <div class="pf-sub">Save 30% billed yearly</div>
    </div>
  </div>
</div>`;
    },
    css: () => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 1000px; }
.pf-wrap { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.pf-toggle-btn { display: flex; gap: 4px; padding: 4px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; cursor: pointer; }
.pf-opt { padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; color: #94a3b8; transition: all 0.25s; }
.pf-opt.active { background: linear-gradient(135deg, var(--c1), var(--c2)); color: #fff; }
.pf-card { position: relative; width: 280px; height: 180px; transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pf-card.annual { transform: rotateX(180deg); }
.pf-face {
  position: absolute; inset: 0; backface-visibility: hidden; border-radius: 22px; padding: 24px;
  display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
  background: rgba(15,23,42,0.78); border: 2px solid var(--c1);
  box-shadow: 0 20px 40px color-mix(in srgb, var(--c1) 25%, transparent);
}
.pf-back { transform: rotateX(180deg); border-color: var(--c2); box-shadow: 0 20px 40px color-mix(in srgb, var(--c2) 30%, transparent); }
.pf-plan { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: var(--c1); }
.pf-back .pf-plan { color: var(--c2); }
.pf-price { font-size: 40px; font-weight: 900; margin: 8px 0 4px; }
.pf-sub { font-size: 12px; color: #94a3b8; }`,
    js: () => `
const btn = document.getElementById('pf-toggle');
const card = document.getElementById('pf-card');
const opts = btn.querySelectorAll('.pf-opt');
let isAnnual = false;
btn.addEventListener('click', () => {
  isAnnual = !isAnnual;
  card.classList.toggle('annual', isAnnual);
  opts[0].classList.toggle('active', !isAnnual);
  opts[1].classList.toggle('active', isAnnual);
});`
  };

  // 4. Apple-Style 3D Bento Grid Showcase with Mouse Spotlight
  window.uiTemplates.bento_grid_3d = {
    category: 'sections',
    name: { fr: 'Grille Bento Spot 3D Apple-Style', en: '3D Apple-Style Bento Spotlight Grid' },
    inputs: ['text'],
    defaultText: { fr: '60FPS WebGL, Audio Reactive, Export Pro, AI Stylist', en: '60FPS WebGL, Audio Reactive, Pro Export, AI Stylist' },
    html: (text, cPrim, cSec) => `
<div class="bento-grid" id="bento-grid" style="--c1: ${cPrim}; --c2: ${cSec};"></div>`,
    css: () => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 1100px; }
.bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; width: 92%; max-width: 720px; }
.bento-cell {
  position: relative; overflow: hidden; border-radius: 20px; padding: 22px; min-height: 130px;
  background: rgba(15,23,42,0.72); border: 1px solid rgba(255,255,255,0.09);
  display: flex; flex-direction: column; justify-content: space-between;
  transform-style: preserve-3d; transition: transform 0.2s ease, border-color 0.25s; cursor: pointer;
}
.bento-cell.wide { grid-column: span 2; }
.bento-cell::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.25s;
  background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--c1) 26%, transparent), transparent 70%);
}
.bento-cell:hover { border-color: var(--c1); transform: translateY(-4px) rotateX(6deg); }
.bento-cell:hover::before { opacity: 1; }
.bento-ico { font-size: 24px; transform: translateZ(20px); }
.bento-cell h3 { margin: 8px 0 4px; font-size: 16px; color: #fff; }
.bento-cell p { margin: 0; font-size: 12px; color: #94a3b8; }
@media (max-width: 640px) { .bento-grid { grid-template-columns: 1fr; } .bento-cell.wide { grid-column: span 1; } }`,
    js: (text) => `
const grid = document.getElementById('bento-grid');
const raw = "${text}";
let items = raw.split(',').map(s => s.trim()).filter(Boolean);
if (items.length < 4) items = ['60FPS WebGL', 'Audio Reactive', 'Pro Export', 'AI Stylist'];
const icons = ['⚡', '🔊', '💎', '✨'];
const descs = ['Hardware-accelerated CSS & Canvas', 'Synchronized Web Audio synth cues', 'Ready for HTML, React & Vue 3', 'Instant palette & layout synthesis'];
grid.innerHTML = '';
items.slice(0, 4).forEach((lbl, idx) => {
  const cell = document.createElement('div');
  cell.className = 'bento-cell' + (idx === 0 || idx === 3 ? ' wide' : '');
  const ic = document.createElement('div'); ic.className = 'bento-ico'; ic.textContent = icons[idx % icons.length];
  const h = document.createElement('h3'); h.textContent = lbl;
  const p = document.createElement('p'); p.textContent = descs[idx % descs.length];
  cell.append(ic, h, p);
  cell.addEventListener('mousemove', (e) => {
    const r = cell.getBoundingClientRect();
    cell.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    cell.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  grid.appendChild(cell);
});`
  };

  // 5. Mechanical 3D Flip Countdown Promo Banner
  window.uiTemplates.flip_countdown_3d = {
    category: 'ads_promo',
    name: { fr: 'Compte à Rebours Flip 3D', en: '3D Mechanical Flip Countdown' },
    inputs: ['text'],
    defaultText: { fr: 'OFFRE LIMITÉE -50%', en: 'FLASH LAUNCH -50% OFF' },
    html: (text, cPrim, cSec) => `
<div class="fc-wrap" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="fc-tag">${text}</div>
  <div class="fc-digits">
    <div class="fc-unit"><div class="fc-tile" id="fc-h">04</div><span>HRS</span></div>
    <div class="fc-unit"><div class="fc-tile" id="fc-m">29</div><span>MIN</span></div>
    <div class="fc-unit"><div class="fc-tile" id="fc-s">59</div><span>SEC</span></div>
  </div>
</div>`,
    css: () => `
body { background: #030712; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 900px; }
.fc-wrap { text-align: center; padding: 26px 30px; border-radius: 22px; background: rgba(15,23,42,0.75); border: 1px solid var(--c1); box-shadow: 0 25px 50px color-mix(in srgb, var(--c1) 25%, transparent); }
.fc-tag { font-size: 12px; font-weight: 800; letter-spacing: 2px; color: var(--c2); margin-bottom: 16px; }
.fc-digits { display: flex; gap: 14px; justify-content: center; }
.fc-unit { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.fc-tile {
  width: 68px; height: 74px; border-radius: 14px; background: linear-gradient(180deg, #1e293b 49%, #0f172a 51%);
  border: 2px solid var(--c1); display: flex; align-items: center; justify-content: center;
  font-size: 30px; font-weight: 900; box-shadow: 0 12px 24px rgba(0,0,0,0.5); transition: transform 0.3s ease;
}
.fc-tile.tick { transform: rotateX(-28deg) scale(1.06); border-color: var(--c2); }
.fc-unit span { font-size: 10px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; }`,
    js: () => `
let total = 4 * 3600 + 29 * 60 + 59;
const hEl = document.getElementById('fc-h');
const mEl = document.getElementById('fc-m');
const sEl = document.getElementById('fc-s');
setInterval(() => {
  if (total > 0) total--;
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  if (hEl) hEl.textContent = h;
  if (mEl) mEl.textContent = m;
  if (sEl) {
    sEl.textContent = s;
    sEl.classList.add('tick');
    setTimeout(() => sEl.classList.remove('tick'), 260);
  }
}, 1000);`
  };

  // 6. Interactive 3D Polyphonic Web Audio Mini Piano Synth
  window.uiTemplates.synth_piano_3d = {
    category: 'audio_fx',
    name: { fr: 'Synthétiseur Piano 3D Polyphonique', en: '3D Polyphonic Web Audio Piano' },
    inputs: ['text'],
    defaultText: { fr: 'CLAVIER SYNTHÉ 3D - Cliquez ou tapez A S D F G H J', en: '3D SYNTH KEYBOARD - Click keys or press A S D F G H J' },
    html: (text, cPrim, cSec) => `
<div class="piano-scene" id="piano-scene" style="--c1: ${cPrim}; --c2: ${cSec};">
  <div class="piano-deck" id="piano-deck">
    <button type="button" class="piano-key" data-note="261.63" data-key="a"><span>C4</span></button>
    <button type="button" class="piano-key" data-note="293.66" data-key="s"><span>D4</span></button>
    <button type="button" class="piano-key" data-note="329.63" data-key="d"><span>E4</span></button>
    <button type="button" class="piano-key" data-note="349.23" data-key="f"><span>F4</span></button>
    <button type="button" class="piano-key" data-note="392.00" data-key="g"><span>G4</span></button>
    <button type="button" class="piano-key" data-note="440.00" data-key="h"><span>A4</span></button>
    <button type="button" class="piano-key" data-note="493.88" data-key="j"><span>B4</span></button>
  </div>
  <div class="piano-lbl">${text}</div>
</div>`,
    css: () => `
body { background: #02040a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Space Grotesk', sans-serif; color: #fff; perspective: 1000px; user-select: none; }
.piano-scene { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.piano-deck {
  display: flex; gap: 6px; padding: 14px; border-radius: 18px;
  background: rgba(15,23,42,0.85); border: 2px solid var(--c1);
  transform: rotateX(28deg); transform-style: preserve-3d;
  box-shadow: 0 24px 45px rgba(0,0,0,0.7), 0 0 25px color-mix(in srgb, var(--c1) 30%, transparent);
}
.piano-key {
  width: 36px; height: 118px; border-radius: 0 0 10px 10px; border: 1px solid rgba(255,255,255,0.2);
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5e1 100%); color: #0f172a;
  font-weight: 800; font-size: 10px; display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 10px; cursor: pointer; transition: transform 0.08s ease, box-shadow 0.08s ease;
  box-shadow: 0 8px 0 #475569;
}
.piano-key.pressed, .piano-key:active {
  transform: translateY(6px); box-shadow: 0 2px 0 var(--c2), 0 0 18px var(--c1);
  background: linear-gradient(180deg, var(--c1), var(--c2)); color: #fff;
}
.piano-lbl { font-size: 11px; color: #94a3b8; font-weight: 700; letter-spacing: 1px; text-align: center; }`,
    js: () => `
let pCtx = null;
const keys = Array.from(document.querySelectorAll('.piano-key'));
function playNote(btn) {
  const freq = parseFloat(btn.dataset.note);
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 180);
  try {
    if (!pCtx) pCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (pCtx.state === 'suspended') pCtx.resume();
    const now = pCtx.currentTime;
    const o = pCtx.createOscillator(), g = pCtx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.14, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    o.connect(g); g.connect(pCtx.destination);
    o.start(now); o.stop(now + 0.45);
  } catch (e) {}
}
keys.forEach(k => k.addEventListener('click', () => playNote(k)));
window.addEventListener('keydown', (e) => {
  const match = keys.find(k => k.dataset.key === e.key.toLowerCase());
  if (match) playNote(match);
});`
  };
})();
