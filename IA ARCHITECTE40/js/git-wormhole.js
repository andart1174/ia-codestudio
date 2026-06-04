(function(){
'use strict';

const TX = {
  en: {
    title: 'GIT TIME-WORMHOLE',
    sub: 'Non-Linear Spacetime Commit Visualizer',
    desc: 'Visualize your git branch history as gravitational orbits warping space-time. High-complexity commits collapse into visual "Black Holes," physically bending adjacent branch trajectories. Scrub the timeline to locate branch anomalies and execute a predictive quantum merge.',
    warpLabel: 'Spacetime Time-Warp (Dilation)',
    resolveBtn: '⚡ Resolve Temporal Merge Paradox',
    injectBtn: 'Infect Monaco with Temporal Git Console',
    copyBtn: 'Copy Quantum Git Config',
    logTitle: '⏳ Chronological Telemetry Terminal',
    status_idle: 'Space-time branch stable. Zero paradoxes detected.',
    status_resolving: 'Collapsing dimensional branch lines into singularity...',
    status_merged: 'Paradox solved! Unified timeline synthesized.',
    copied: 'Temporal Git Config copied to clipboard!',
    injected: 'Temporal Git Console injected into Monaco Editor!',
    lbl_files: 'files',
    lbl_loc: 'LOC',
    presets: {
      kerr: '🌀 Kerr Singularity Branch',
      schwar: '⚫ Schwarzschild Static Branch',
      einstein: '🌌 Einstein-Rosen Bridge',
      paradox: '⚠️ High Entropy Paradox State'
    }
  },
  fr: {
    title: 'GIT TIME-WORMHOLE',
    sub: 'Visualisateur de Commit en Espace-Temps Non-Linéaire',
    desc: 'Visualisez l\'historique de vos branches git sous forme d\'orbites gravitationnelles courbant l\'espace-temps. Les commits complexes s\'effondrent en "trous noirs" visuels, déviant les trajectoires adjacentes. Manipulez le curseur temporel pour résoudre les paradoxes.',
    warpLabel: 'Dilatation Temporelle (Warp Spatiotemporel)',
    resolveBtn: '⚡ Résoudre le Paradoxe de Fusion Temporelle',
    injectBtn: 'Infecter Monaco avec la Console Git',
    copyBtn: 'Copier le Code de Configuration Quantum',
    logTitle: '⏳ Terminal de Télémétrie Chronologique',
    status_idle: 'Branche spatio-temporelle stable. Aucun paradoxe.',
    status_resolving: 'Effondrement des lignes temporelles dans la singularité...',
    status_merged: 'Paradoxe résolu ! Ligne temporelle unifiée synthétisée.',
    copied: 'Configuration Git Temporelle copiée !',
    injected: 'Console Temporelle Git injectée dans Monaco Editor !',
    lbl_files: 'fichiers',
    lbl_loc: 'lignes',
    presets: {
      kerr: '🌀 Branche de Singularité Kerr',
      schwar: '⚫ Branche Statique Schwarzschild',
      einstein: '🌌 Pont Einstein-Rosen',
      paradox: '⚠️ État de Paradoxe à Haute Entropie'
    }
  }
};

function gl() { return window.appLang || 'en'; }

const commitsPreset = [
  { hash: 'cf72b6', msg: 'Initial singularity launch & core init', files: 12, loc: 150, author: 'Dr. Quantum', radius: 45, speed: 0.02, angle: 0, isSingularity: false },
  { hash: 'e82a14', msg: 'Implement spatial metric tensor equations', files: 45, loc: 1200, author: 'AI Architect', radius: 80, speed: 0.012, angle: 1.2, isSingularity: true },
  { hash: 'a38bdf', msg: 'Fix time-dilation boundary overflow glitch', files: 8, loc: 95, author: 'Time Traveler', radius: 110, speed: 0.015, angle: 2.5, isSingularity: false },
  { hash: 'd92c55', msg: 'Merge branch "alternate-future-404" with main', files: 135, loc: 5400, author: 'AI Architect', radius: 145, speed: 0.007, angle: 3.8, isSingularity: true },
  { hash: 'f472b6', msg: 'Establish sub-atomic protective wormhole shields', files: 19, loc: 310, author: 'Dr. Quantum', radius: 180, speed: 0.009, angle: 5.1, isSingularity: false }
];

window._wormholeState = {
  commits: JSON.parse(JSON.stringify(commitsPreset)),
  warp: 20,
  resolving: false,
  soundActive: false,
  osc: null,
  gain: null,
  ctx: null
};

const _o = window.renderTab;
window.renderTab = function(tab) {
  if (tab === 'timewormhole') {
    window.activeTab = 'timewormhole';
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    const b = document.getElementById('tab-timewormhole');
    if (b) b.classList.add('active');
    window.initGitWormhole(gl());
    return;
  }
  if (typeof _o === 'function') _o(tab);
};

window.initGitWormhole = function(lang) {
  const el = document.getElementById('left-body');
  if (!el) return;
  const t = TX[lang] || TX.en;

  el.innerHTML = `
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;display:flex;flex-direction:column;gap:12px;position:relative;">
  
  <!-- Header Card -->
  <div style="background:linear-gradient(135deg,rgba(244,63,94,0.12),rgba(251,113,133,0.08));border-radius:14px;padding:16px;border:1px solid rgba(244,63,94,0.35);display:flex;align-items:center;gap:12px;position:relative;z-index:2;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #fb7185);">⏳</span>
    <div>
      <h2 style="margin:0;color:#fb7185;font-size:14px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  <p style="color:#64748b;font-size:10px;margin:0;line-height:1.5;position:relative;z-index:2;">${t.desc}</p>

  <!-- Sound and Presets Grid -->
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px;position:relative;z-index:2;">
    <!-- Presets Quick selectors -->
    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.03);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:4px;">
      <span style="font-size:8px;color:#fb7185;font-weight:800;text-transform:uppercase;margin-bottom:3px;">Select Space Metric</span>
      <select id="wormhole-preset" onchange="window.setWormholePreset(this.value)" style="background:#020617;border:1px solid rgba(244,63,94,0.3);color:#e2e8f0;font-size:9.5px;padding:4px;border-radius:6px;outline:none;cursor:pointer;width:100%;">
        <option value="kerr">${t.presets.kerr}</option>
        <option value="schwar">${t.presets.schwar}</option>
        <option value="einstein">${t.presets.einstein}</option>
        <option value="paradox">${t.presets.paradox}</option>
      </select>
    </div>

    <!-- Web Audio Controls -->
    <button onclick="window.toggleWormholeSound()" id="btn-wormhole-sound" style="background:#0f172a;border:1px solid rgba(244,63,94,0.3);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all 0.3s;color:#e2e8f0;font-weight:800;font-size:9.5px;">
      <span style="font-size:14px;" id="sound-wormhole-icon">🔇</span>
      <span id="sound-wormhole-txt">Sound Off</span>
    </button>
  </div>

  <!-- Dynamic Time-Warp Control -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#64748b;font-size:9.5px;font-weight:800;text-transform:uppercase;">${t.warpLabel}</span>
      <span id="wormhole-warp-val" style="color:#fb7185;font-size:11px;font-weight:800;">${window._wormholeState.warp}x</span>
    </div>
    <input type="range" id="wormhole-warp-slider" min="-100" max="100" value="${window._wormholeState.warp}" oninput="window.setWormholeWarp(parseInt(this.value))" style="width:100%;accent-color:#fb7185;cursor:pointer;" />
  </div>

  <!-- Gravitational Space-Time Wormhole Visualizer Panel -->
  <div style="background:#020617;border:1px solid rgba(244,63,94,0.25);border-radius:12px;height:240px;position:relative;overflow:hidden;box-shadow:0 0 20px rgba(244,63,94,0.05);z-index:2;">
    <canvas id="git-wormhole-canvas" style="display:block;width:100%;height:100%;"></canvas>
    <!-- Hover Card Tooltip -->
    <div id="wormhole-tooltip" style="position:absolute;background:rgba(2,6,23,0.92);border:1px solid #fb7185;border-radius:6px;padding:6px;font-size:9px;color:#e2e8f0;display:none;pointer-events:none;z-index:5;max-width:160px;box-shadow:0 4px 12px rgba(0,0,0,0.5);"></div>
  </div>

  <!-- Action Trigger Button -->
  <button onclick="window.resolveGitParadox()" id="wormhole-trigger" style="position:relative;z-index:2;width:100%;padding:12px;border-radius:10px;background:linear-gradient(135deg,#f43f5e,#fb7185);border:none;color:#fff;font-weight:900;font-size:11.5px;cursor:pointer;box-shadow:0 0 15px rgba(244,63,94,0.35);transition:all 0.2s;">${t.resolveBtn}</button>

  <!-- Chronological Telemetry Terminal -->
  <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.04);border-radius:10px;padding:12px;height:110px;display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
    <div style="font-size:9.5px;color:#fb7185;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">${t.logTitle}</div>
    <div id="wormhole-log" style="flex:1;overflow-y:auto;font-family:JetBrains Mono,monospace;font-size:9.5px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;scrollbar-width:none;">
      <div style="color:#334155;text-align:center;padding-top:20px;">— Terminal listening to space-time events —</div>
    </div>
  </div>

  <!-- Monaco Actions -->
  <div style="display:flex;gap:6px;position:relative;z-index:2;">
    <button onclick="window.wormholeInject()" style="flex:1.2;padding:11px;border-radius:8px;background:#fb7185;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 10px rgba(244,63,94,0.25);" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.injectBtn}</button>
    <button onclick="window.wormholeCopy()" style="flex:1;padding:11px;border-radius:8px;background:#4c0519;border:none;color:#fecdd3;font-weight:800;font-size:11px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">${t.copyBtn}</button>
  </div>
</div>`;

  // Initialize Canvas Visualizer
  window.initWormholeCanvas();
};

window.initWormholeCanvas = function() {
  const canvas = document.getElementById('git-wormhole-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  let frameId;
  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2;

  // Space-time backdrop starfield particles
  const stars = [];
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * w / 2,
      a: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.003
    });
  }

  // Hover detection
  const tooltip = document.getElementById('wormhole-tooltip');
  let hoverIdx = -1;

  canvas.onmousemove = function(e) {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    let found = -1;
    window._wormholeState.commits.forEach((c, idx) => {
      // Calculate coordinates dynamically matching orbit drawing
      const warpMult = window._wormholeState.warp / 10;
      const angle = c.angle;
      let rx = cx + Math.cos(angle) * c.radius;
      let ry = cy + Math.sin(angle) * c.radius;

      // Apply gravitation bend from singularity elements
      window._wormholeState.commits.forEach(oth => {
        if (oth.isSingularity && oth !== c) {
          const oAngle = oth.angle;
          const sx = cx + Math.cos(oAngle) * oth.radius;
          const sy = cy + Math.sin(oAngle) * oth.radius;
          const dx = sx - rx;
          const dy = sy - ry;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > 15 && dist < 120) {
            const pull = (oth.loc / 8) / (dist + 20);
            rx += (dx / dist) * pull;
            ry += (dy / dist) * pull;
          }
        }
      });

      const d = Math.sqrt((mx - rx)*(mx - rx) + (my - ry)*(my - ry));
      if (d < 8) {
        found = idx;
      }
    });

    if (found !== -1) {
      const c = window._wormholeState.commits[found];
      hoverIdx = found;
      tooltip.style.display = 'block';
      tooltip.style.left = (mx + 10) + 'px';
      tooltip.style.top = (my + 10) + 'px';
      tooltip.innerHTML = `
        <div style="font-weight:800;color:#fb7185;font-family:monospace;font-size:10px;">commit 0x${c.hash}</div>
        <div style="font-weight:700;color:#fff;margin-top:2px;">${c.msg}</div>
        <div style="color:#64748b;font-size:8px;margin-top:3px;display:flex;gap:6px;">
          <span>📄 ${c.files} ${TX[gl()].lbl_files}</span>
          <span>⚡ ${c.loc} ${TX[gl()].lbl_loc}</span>
        </div>
      `;
    } else {
      hoverIdx = -1;
      tooltip.style.display = 'none';
    }
  };

  function animate() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Draw central gravitational wormhole vortex background
    const warpMult = Math.abs(window._wormholeState.warp) / 10;
    const timeVal = Date.now() * 0.001;

    // Draw spiral distortion lines
    ctx.lineWidth = 0.8;
    for (let j = 0; j < 4; j++) {
      ctx.strokeStyle = `rgba(244,63,94,${0.05 + 0.03 * j})`;
      ctx.beginPath();
      for (let r = 5; r < 200; r += 3) {
        const theta = r * (0.04 + 0.01 * j) * (window._wormholeState.warp / 10) + timeVal * 0.5;
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;
        if (r === 5) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Draw Schwarzschild central horizon
    const singRadius = window._wormholeState.resolving ? 40 : 15;
    const gradient = ctx.createRadialGradient(cx, cy, singRadius * 0.1, cx, cy, singRadius * 1.5);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.3, '#020617');
    gradient.addColorStop(0.7, 'rgba(244, 63, 94, 0.45)');
    gradient.addColorStop(1, 'rgba(244, 63, 94, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, singRadius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Singularity center
    ctx.fillStyle = '#fb7185';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#f43f5e';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(2, 6 - singRadius / 10), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    // Draw space backdrop particles
    ctx.fillStyle = 'rgba(251, 113, 133, 0.25)';
    stars.forEach(s => {
      // Warp stars coordinates programmatically
      s.a += s.speed * (window._wormholeState.warp / 10);
      const sx = cx + Math.cos(s.a) * s.r;
      const sy = cy + Math.sin(s.a) * s.r;
      ctx.beginPath();
      ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw orbital lines & commit nodes
    window._wormholeState.commits.forEach((c, idx) => {
      // Advance coordinates
      if (!window._wormholeState.resolving) {
        c.angle += c.speed * (window._wormholeState.warp / 10);
      } else {
        // Spiral collapse animation when resolving
        c.radius = Math.max(0, c.radius - 1.8);
        c.angle += 0.08;
      }

      // Base coordinate mapping
      let rx = cx + Math.cos(c.angle) * c.radius;
      let ry = cy + Math.sin(c.angle) * c.radius;

      // Gravitational warp calculation
      window._wormholeState.commits.forEach(oth => {
        if (oth.isSingularity && oth !== c) {
          const oAngle = oth.angle;
          const sx = cx + Math.cos(oAngle) * oth.radius;
          const sy = cy + Math.sin(oAngle) * oth.radius;
          const dx = sx - rx;
          const dy = sy - ry;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > 15 && dist < 120) {
            const pull = (oth.loc / 8) / (dist + 20);
            rx += (dx / dist) * pull;
            ry += (dy / dist) * pull;
          }
        }
      });

      // Draw commit orbit paths
      ctx.strokeStyle = c.isSingularity ? 'rgba(244,63,94,0.06)' : 'rgba(255,255,255,0.02)';
      ctx.lineWidth = c.isSingularity ? 1 : 0.6;
      ctx.beginPath();
      ctx.arc(cx, cy, c.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Render glowing node circle
      const sizeVal = c.isSingularity ? 7 : 4;
      ctx.fillStyle = c.isSingularity ? '#f43f5e' : '#e2e8f0';
      if (idx === hoverIdx) {
        ctx.fillStyle = '#fb7185';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#fb7185';
      } else if (c.isSingularity) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f43f5e';
      }

      ctx.beginPath();
      ctx.arc(rx, ry, sizeVal, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Singularity accretion visual disk
      if (c.isSingularity) {
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(rx, ry, sizeVal + 4, timeVal, timeVal + Math.PI * 1.5);
        ctx.stroke();
      }

      // Draw thin connectors to the wormhole center
      ctx.strokeStyle = 'rgba(244,63,94,0.02)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    });

    frameId = requestAnimationFrame(animate);
  }

  animate();

  // Handle clean garbage collection
  window.addEventListener('hashchange', () => {
    cancelAnimationFrame(frameId);
  }, { once: true });
};

window.setWormholeWarp = function(val) {
  window._wormholeState.warp = val;
  const valEl = document.getElementById('wormhole-warp-val');
  if (valEl) valEl.textContent = val + 'x';

  // Reactively modulate sound synth frequency
  if (window._wormholeState.soundActive && window._wormholeState.osc) {
    const baseFreq = 50 + Math.abs(val) * 1.5;
    window._wormholeState.osc.frequency.setValueAtTime(baseFreq, window._wormholeState.ctx.currentTime);
  }
};

window.toggleWormholeSound = function() {
  const icon = document.getElementById('sound-wormhole-icon');
  const txt = document.getElementById('sound-wormhole-txt');

  if (!window._wormholeState.soundActive) {
    // Initialize Web Audio Engine
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(50 + Math.abs(window._wormholeState.warp) * 1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      // Low pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      window._wormholeState.ctx = ctx;
      window._wormholeState.osc = osc;
      window._wormholeState.gain = gain;
      window._wormholeState.soundActive = true;

      if (icon) icon.textContent = '🔊';
      if (txt) txt.textContent = 'Sound On';
    } catch(e) {
      console.warn('Audio Context block:', e);
    }
  } else {
    // Silence audio
    if (window._wormholeState.osc) {
      try {
        window._wormholeState.osc.stop();
      } catch(e) {}
      window._wormholeState.osc = null;
    }
    window._wormholeState.soundActive = false;
    if (icon) icon.textContent = '🔇';
    if (txt) txt.textContent = 'Sound Off';
  }
};

window.setWormholePreset = function(preset) {
  const log = document.getElementById('wormhole-log');
  const lang = gl();

  const presetsMap = {
    kerr: { warp: 60, commits: [
      { hash: 'cf72b6', msg: 'Initial singularity launch', files: 12, loc: 150, radius: 40, speed: 0.02, angle: 0, isSingularity: false },
      { hash: 'e82a14', msg: 'Apply spacetime curvature calculations', files: 89, loc: 4200, radius: 75, speed: 0.015, angle: 1, isSingularity: true },
      { hash: 'd92c55', msg: 'Quantum matrix gateway bridge', files: 15, loc: 390, radius: 130, speed: 0.009, angle: 3, isSingularity: false }
    ]},
    schwar: { warp: 10, commits: [
      { hash: 'e01a14', msg: 'Calculate Schwarzschild static limits', files: 4, loc: 40, radius: 60, speed: 0.005, angle: 1, isSingularity: true },
      { hash: 'f502b6', msg: 'Refactored static metric engine', files: 18, loc: 410, radius: 120, speed: 0.008, angle: 4, isSingularity: false }
    ]},
    einstein: { warp: -40, commits: [
      { hash: 'eb22a4', msg: 'Connect timelines through wormhole corridor', files: 56, loc: 1980, radius: 50, speed: 0.012, angle: 0.5, isSingularity: true },
      { hash: 'da9c51', msg: 'Verify mirror-universe synchronizations', files: 25, loc: 520, radius: 100, speed: 0.01, angle: 2.2, isSingularity: false },
      { hash: 'a11bdf', msg: 'Deploy anti-gravity warp shields', files: 7, loc: 110, radius: 160, speed: 0.016, angle: 4.8, isSingularity: false }
    ]},
    paradox: { warp: 95, commits: [
      { hash: 'da8c11', msg: 'Branch timeline anomaly A active', files: 142, loc: 6800, radius: 65, speed: 0.025, angle: 1, isSingularity: true },
      { hash: 'fb92cc', msg: 'Branch timeline anomaly B active', files: 98, loc: 4300, radius: 115, speed: 0.03, angle: 3.5, isSingularity: true }
    ]}
  };

  const selected = presetsMap[preset];
  if (!selected) return;

  window._wormholeState.warp = selected.warp;
  window._wormholeState.commits = JSON.parse(JSON.stringify(selected.commits));

  // Update slider UI
  const slider = document.getElementById('wormhole-warp-slider');
  if (slider) slider.value = selected.warp;
  const valEl = document.getElementById('wormhole-warp-val');
  if (valEl) valEl.textContent = selected.warp + 'x';

  // Reactively modulate sound
  if (window._wormholeState.soundActive && window._wormholeState.osc) {
    window._wormholeState.osc.frequency.setValueAtTime(50 + Math.abs(selected.warp) * 1.5, window._wormholeState.ctx.currentTime);
  }

  // Refresh visual canvas orbits
  window.initWormholeCanvas();

  if (log) {
    log.innerHTML = '';
    const row = document.createElement('div');
    row.style.color = '#fb7185';
    row.textContent = lang === 'fr' ? `▶ Espace métrique chargé: ${preset.toUpperCase()}` : `▶ Metric space loaded: ${preset.toUpperCase()}`;
    log.appendChild(row);
  }
};

window.resolveGitParadox = function() {
  if (window._wormholeState.resolving) return;
  window._wormholeState.resolving = true;

  const lang = gl();
  const t = TX[lang] || TX.en;
  const log = document.getElementById('wormhole-log');
  const trigger = document.getElementById('wormhole-trigger');

  if (trigger) {
    trigger.textContent = t.status_resolving;
    trigger.style.pointerEvents = 'none';
  }

  if (log) log.innerHTML = '';

  const logs = [
    { en: 'Calculating branch entropy vectors...', fr: 'Calcul des vecteurs d\'entropie de branche...' },
    { en: 'Locating temporal conflict singularities...', fr: 'Localisation des singularités de conflit...' },
    { en: 'Compressing spacetime manifolds to unified commit locus...', fr: 'Compression de l\'espace-temps en un point de commit unifié...' },
    { en: 'Solving non-linear merge conflict branches...', fr: 'Résolution des conflits de fusion non-linéaires...' },
    { en: 'Unified chronological trajectory established!', fr: 'Trajectoire chronologique unifiée établie !' }
  ];

  let logIdx = 0;
  function step() {
    if (logIdx >= logs.length) {
      window._wormholeState.resolving = false;
      if (trigger) {
        trigger.textContent = t.resolveBtn;
        trigger.style.pointerEvents = 'all';
      }

      // Reset orbits coordinates smoothly
      window._wormholeState.commits = JSON.parse(JSON.stringify(commitsPreset));
      window.initWormholeCanvas();
      return;
    }

    const row = document.createElement('div');
    row.style.padding = '1px 0';
    row.style.borderBottom = '1px solid rgba(255,255,255,0.01)';
    row.textContent = `▶ ${logs[logIdx][lang]}`;
    if (logIdx === 4) {
      row.style.color = '#4ade80';
    } else if (logIdx === 2) {
      row.style.color = '#f43f5e';
    }

    if (log) {
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    }
    logIdx++;
    setTimeout(step, 400);
  }

  step();
};

window.wormholeInject = function() {
  const t = TX[gl()] || TX.en;

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quantum Temporal Git Predictor Console</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700;800&family=Inter:wght@400;900&display=swap" rel="stylesheet">
  <style>
    body {
      background: #020617;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .header {
      border: 1px solid rgba(244, 63, 94, 0.4);
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(2, 6, 23, 0.8));
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badge {
      background: rgba(244, 63, 94, 0.15);
      border: 1px solid #fb7185;
      color: #fb7185;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 15px;
    }

    .card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
      padding: 6px 0;
      font-size: 11px;
    }

    .btn {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #fb7185;
      background: transparent;
      color: #fb7185;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }

    .btn:hover {
      background: #fb7185;
      color: #000;
      box-shadow: 0 0 15px rgba(251, 113, 133, 0.4);
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span style="font-family:'Inter', sans-serif; font-size:16px; font-weight:900; color:#fb7185;">🌌 QUANTUM GIT PREDICTOR V4</span>
      <div style="font-size:10px; color:#64748b; margin-top:3px;">Non-Linear Metric Branch Sync Engine</div>
    </div>
    <span class="badge">CHRONO-LOCK: ACTIVE</span>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0; font-size: 12px; color: #fb7185;">GRAVITY SINGULARITY MATRIX</h3>
      <div style="margin-top: 5px;">
        <div class="metric-row"><span>Active Wormhole Coordinates</span><span style="color:#fff;">[0.45X, -1.22Y]</span></div>
        <div class="metric-row"><span>Branch Metric Warp Dilation</span><span style="color:#4ade80;">1.4504 ms/s</span></div>
        <div class="metric-row"><span>Commit Horizon Mass</span><span style="color:#fb7185;">12.44 GW</span></div>
        <div class="metric-row"><span>Entropy Variance Index</span><span style="color:#fb7185;">4.22%</span></div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin: 0; font-size: 12px; color: #fb7185;">CONFLICT TELEMETRY OUTPUT</h3>
      <div style="flex:1; overflow-y:auto; font-size:10px; display:flex; flex-direction:column; gap:4px; color:#94a3b8;">
        <div>[01:14:15] ▶ Scanning alternative commit futures...</div>
        <div style="color:#4ade80;">[01:14:16] ▶ Paradox resolved between 0xcf72b6 and 0xd92c55.</div>
        <div>[01:14:17] ▶ Matrix branch unifications synchronized in 4D.</div>
      </div>
    </div>
  </div>

  <button class="btn" onclick="alert('Timeline coordinates synchronized!')">
    EXECUTE SUB-ATOMIC CHRONOLOGY RE-INDEX
  </button>
</body>
</html>`;

  if (window.editor) {
    window.editor.setValue(htmlTemplate);
    if (window.runPreview) window.runPreview();
  }
  if (window.showToast) window.showToast(t.injected);
};

window.wormholeCopy = function() {
  const t = TX[gl()] || TX.en;
  const config = `
/* Quantum Temporal Git System Config */
[core]
  chronology = "non-linear"
  spacetimeCurvature = true
  dimension = 4
[wormhole]
  singularityMassFactor = 12.44
  timeDilationLimit = 1.4504
  entropyEntropyTolerance = 0.05
[merge "paradox"]
  driver = "predictive-neural-crossover"
  autoResolveAlternates = true
`;

  navigator.clipboard.writeText(config.trim()).then(() => {
    if (window.showToast) window.showToast(t.copied);
  });
};

const _oa = window.applyLang;
window.applyLang = function() {
  if (typeof _oa === 'function') _oa();
  const l = document.getElementById('lbl-tab-timewormhole');
  if (l) l.textContent = gl() === 'fr' ? 'Trou de Ver Git' : 'Time Wormhole';
  if (window.activeTab === 'timewormhole') window.initGitWormhole(gl());
};

console.log('⏳ Git Time-Wormhole loaded!');
})();
