(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🎨 SVG SPRING MORPHING STUDIO — Real Physics Vector Morpher
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aesthetic SVG Spring Morphing Playground</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0b1329;
      --card-border: #1e293b;
      --accent: #f59e0b;
      --accent-secondary: #ec4899;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 900px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
    }
    h1 {
      margin: 0 0 6px 0;
      font-size: 26px;
      font-weight: 900;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    p.sub {
      margin: 0 0 28px 0;
      font-size: 14px;
      color: var(--text-muted);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 1.1fr 0.9fr;
      }
    }
    .preview-card {
      background: #000;
      border: 1px solid var(--card-border);
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.9);
    }
    svg {
      width: 85%;
      height: 85%;
      display: block;
    }
    .panel {
      background: rgba(255,255,255,0.01);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    h3 {
      margin: 0;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--accent);
      letter-spacing: 0.8px;
      font-weight: 800;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label {
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    select, input[type="range"], textarea {
      background: #020617;
      border: 1px solid var(--card-border);
      color: var(--text);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: inherit;
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    select:focus, textarea:focus {
      border-color: var(--accent);
    }
    input[type="range"] {
      padding: 0;
      height: 6px;
      -webkit-appearance: none;
      background: #1e293b;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-secondary);
      transition: transform 0.1s;
    }
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
    .color-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .color-picker-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #020617;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 10px;
    }
    input[type="color"] {
      border: none;
      background: none;
      width: 24px;
      height: 24px;
      cursor: pointer;
      padding: 0;
    }
    .btn-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    button {
      font-family: inherit;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      padding: 12px;
      outline: none;
      border: none;
    }
    button.btn-primary {
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000;
      font-weight: 900;
      box-shadow: 0 4px 15px rgba(245,158,11,0.25);
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(245,158,11,0.35);
    }
    button.btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      color: var(--text);
    }
    button.btn-secondary:hover {
      background: #334155;
    }
    textarea {
      height: 60px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      resize: none;
    }
    .export-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
    }
    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-muted);
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      color: #000;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 800;
      display: none;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(245,158,11,0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Elastic SVG Spring Morphing Playground</h1>
    <p class="sub">Dynamic coordinate interpolation with staggered spring physics propagation</p>

    <div class="grid">
      <!-- Left side: SVG Live Preview -->
      <div class="preview-card">
        <svg viewBox="0 0 300 300" id="previewSvg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            </pattern>
            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" id="stopStart" stop-color="#f59e0b"/>
              <stop offset="100%" id="stopEnd" stop-color="#ec4899"/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <!-- Animated Path -->
          <path id="morphPath" fill="url(#morphGrad)" stroke="url(#morphGrad)" stroke-width="2" filter="url(#glow)" opacity="0.85" />
          <!-- Optional Vector point markers -->
          <g id="pointsContainer"></g>
        </svg>
      </div>

      <!-- Right side: Controls -->
      <div class="panel">
        <h3>⚙️ Shape Configuration</h3>
        
        <div class="form-group">
          <label>🟢 Source Preset</label>
          <select id="sourceSelect">
            <option value="circle">Circle / Cercle</option>
            <option value="star" selected>Star / Étoile</option>
            <option value="heart">Heart / Cœur</option>
            <option value="hexagon">Hexagon / Hexagone</option>
            <option value="cloud">Cloud / Nuage</option>
            <option value="lightning">Lightning / Éclair</option>
            <option value="gear">Industrial Gear / Engrenage</option>
          </select>
        </div>

        <div class="form-group">
          <label>🔴 Target Preset</label>
          <select id="targetSelect">
            <option value="circle">Circle / Cercle</option>
            <option value="star">Star / Étoile</option>
            <option value="heart" selected>Heart / Cœur</option>
            <option value="hexagon">Hexagon / Hexagone</option>
            <option value="cloud">Cloud / Nuage</option>
            <option value="lightning">Lightning / Éclair</option>
            <option value="gear">Industrial Gear / Engrenage</option>
          </select>
        </div>

        <h3>🌀 Physics Parameters</h3>
        
        <div class="form-group">
          <label><span>Stiffness (Tension)</span><span id="stiffnessVal">0.12</span></label>
          <input type="range" id="stiffnessSlider" min="0.02" max="0.4" step="0.01" value="0.12">
        </div>

        <div class="form-group">
          <label><span>Damping (Friction)</span><span id="dampingVal">0.08</span></label>
          <input type="range" id="dampingSlider" min="0.01" max="0.3" step="0.01" value="0.08">
        </div>

        <div class="form-group">
          <label><span>Jelly Wave Delay</span><span id="jellyVal">0.02</span></label>
          <input type="range" id="jellySlider" min="0" max="0.1" step="0.005" value="0.02">
        </div>

        <div class="form-group">
          <label><span>Points Count (Resolution)</span><span id="pointsVal">80</span></label>
          <input type="range" id="pointsSlider" min="20" max="150" step="5" value="80">
        </div>

        <div class="color-grid">
          <div class="color-picker-wrap">
            <input type="color" id="startColorPicker" value="#f59e0b">
            <span style="font-size:10px;font-weight:700;">Gradient Start</span>
          </div>
          <div class="color-picker-wrap">
            <input type="color" id="endColorPicker" value="#ec4899">
            <span style="font-size:10px;font-weight:700;">Gradient End</span>
          </div>
        </div>

        <div class="checkbox-wrap">
          <input type="checkbox" id="showPointsCheck" checked>
          <span>Render Coordinate Vertices / Afficher les points</span>
        </div>

        <div class="checkbox-wrap">
          <input type="checkbox" id="autoplayCheck" checked>
          <span>Auto-loop Morph / Boucle automatique</span>
        </div>

        <div class="btn-group">
          <button class="btn-primary" id="morphBtn">⚡ Trigger Morph</button>
          <button class="btn-secondary" id="reverseBtn">🔄 Swap Shapes</button>
        </div>
      </div>
    </div>

    <!-- Custom Path input block -->
    <div class="export-card" style="margin-bottom:20px;">
      <h3>✒️ Custom SVG Path Overrides</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;">
        <div class="form-group">
          <label>Custom Source Path (d)</label>
          <textarea id="customSourceText" placeholder="Paste custom d='...' path here to override source shape"></textarea>
        </div>
        <div class="form-group">
          <label>Custom Target Path (d)</label>
          <textarea id="customTargetText" placeholder="Paste custom d='...' path here to override target shape"></textarea>
        </div>
      </div>
    </div>

    <!-- Export area -->
    <div class="export-card">
      <h3>📦 Export & Generated Code</h3>
      <p style="font-size:11px;color:var(--text-muted);margin:4px 0 12px 0;">Use this pure JS/SVG spring morphing snippet in your websites with zero third party library dependencies!</p>
      <button class="btn-secondary" id="copyCodeBtn" style="width:100%;">📋 Copy Self-Contained Morphing Component</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    // Predefined paths
    const SHAPES = {
      circle: "M 150,50 A 100,100 0 1,1 149.9,50 Z",
      star: "M 150,50 L 179,110 L 245,119 L 197,166 L 209,231 L 150,200 L 91,231 L 103,166 L 55,119 L 121,110 Z",
      heart: "M 150,90 C 150,90 120,40 70,40 C 20,40 10,90 10,120 C 10,170 80,220 150,270 C 220,220 290,170 290,120 C 290,90 280,40 230,40 C 180,40 150,90 150,90 Z",
      hexagon: "M 150,50 L 236.6,100 L 236.6,200 L 150,250 L 63.4,200 L 63.4,100 Z",
      cloud: "M 80,180 A 40,40 0 0,1 100,100 A 50,50 0 0,1 200,100 A 40,40 0 0,1 220,180 A 30,30 0 0,1 200,220 L 100,220 A 30,30 0 0,1 80,180 Z",
      lightning: "M 170,30 L 70,160 L 140,160 L 110,270 L 230,120 L 150,120 Z",
      gear: "M 150,70 L 160,50 L 180,50 L 175,75 A 100,100 0 0,1 205,87 L 225,72 L 239,86 L 224,106 A 100,100 0 0,1 236,136 L 261,141 L 261,161 L 236,166 A 100,100 0 0,1 224,196 L 239,216 L 225,230 L 205,215 A 100,100 0 0,1 175,227 L 180,252 L 160,252 L 150,230 A 100,100 0 0,1 125,227 L 120,252 L 100,252 L 105,227 A 100,100 0 0,1 75,215 L 55,230 L 41,216 L 56,196 A 100,100 0 0,1 56,106 L 41,86 L 55,72 L 75,87 A 100,100 0 0,1 105,75 L 100,50 L 120,50 L 130,70 A 100,100 0 0,1 150,70 Z"
    };

    // DOM Elements
    const previewSvg = document.getElementById('previewSvg');
    const morphPath = document.getElementById('morphPath');
    const pointsContainer = document.getElementById('pointsContainer');
    const sourceSelect = document.getElementById('sourceSelect');
    const targetSelect = document.getElementById('targetSelect');
    const stiffnessSlider = document.getElementById('stiffnessSlider');
    const dampingSlider = document.getElementById('dampingSlider');
    const jellySlider = document.getElementById('jellySlider');
    const pointsSlider = document.getElementById('pointsSlider');
    const stiffnessVal = document.getElementById('stiffnessVal');
    const dampingVal = document.getElementById('dampingVal');
    const jellyVal = document.getElementById('jellyVal');
    const pointsVal = document.getElementById('pointsVal');
    const startColorPicker = document.getElementById('startColorPicker');
    const endColorPicker = document.getElementById('endColorPicker');
    const stopStart = document.getElementById('stopStart');
    const stopEnd = document.getElementById('stopEnd');
    const showPointsCheck = document.getElementById('showPointsCheck');
    const autoplayCheck = document.getElementById('autoplayCheck');
    const customSourceText = document.getElementById('customSourceText');
    const customTargetText = document.getElementById('customTargetText');
    const morphBtn = document.getElementById('morphBtn');
    const reverseBtn = document.getElementById('reverseBtn');
    const toast = document.getElementById('toast');
    const copyCodeBtn = document.getElementById('copyCodeBtn');

    // Simulation State variables
    let numPoints = 80;
    let stiffness = 0.12;
    let damping = 0.08;
    let jellyWave = 0.02;

    let sourcePoints = [];
    let targetPoints = [];
    let currentPoints = [];
    let velocities = [];
    let localTargets = [];

    let morphDirection = 0; // 0 = source, 1 = target
    let activeProgress = 0; // target global progress (0 or 1)
    let autoTimer = null;

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    // Mathematical SVG Path sampling helper
    function samplePath(pathData, count) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      svg.style.top = "-9999px";
      
      const pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathNode.setAttribute("d", pathData);
      svg.appendChild(pathNode);
      document.body.appendChild(svg);

      const pts = [];
      try {
        const totalLen = pathNode.getTotalLength() || 100;
        for (let i = 0; i < count; i++) {
          const dist = (i / count) * totalLen;
          const pt = pathNode.getPointAtLength(dist);
          pts.push({ x: pt.x, y: pt.y });
        }
      } catch (err) {
        console.error("Sampling error, generating fallback ellipse", err);
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          pts.push({ x: 150 + 100 * Math.cos(angle), y: 150 + 100 * Math.sin(angle) });
        }
      } finally {
        document.body.removeChild(svg);
      }
      return pts;
    }

    // Synchronize slider text and state
    function syncParams() {
      stiffness = parseFloat(stiffnessSlider.value);
      damping = parseFloat(dampingSlider.value);
      jellyWave = parseFloat(jellySlider.value);
      numPoints = parseInt(pointsSlider.value);

      stiffnessVal.textContent = stiffness.toFixed(2);
      dampingVal.textContent = damping.toFixed(2);
      jellyVal.textContent = jellyWave.toFixed(2);
      pointsVal.textContent = numPoints;
    }

    // Recompute source & target coordinates
    function rebuildPoints() {
      syncParams();

      const srcPath = customSourceText.value.trim() || SHAPES[sourceSelect.value];
      const tgtPath = customTargetText.value.trim() || SHAPES[targetSelect.value];

      sourcePoints = samplePath(srcPath, numPoints);
      targetPoints = samplePath(tgtPath, numPoints);

      // Initialize active variables if array size changed
      if (currentPoints.length !== numPoints) {
        currentPoints = [];
        velocities = [];
        localTargets = [];
        for (let i = 0; i < numPoints; i++) {
          const initialP = morphDirection === 0 ? sourcePoints[i] : targetPoints[i];
          currentPoints.push({ x: initialP.x, y: initialP.y });
          velocities.push({ x: 0, y: 0 });
          localTargets.push(morphDirection === 0 ? 0 : 1);
        }
      }

      // Re-render markers if checkbox checked
      renderDots();
    }

    function renderDots() {
      pointsContainer.innerHTML = '';
      if (!showPointsCheck.checked) return;

      for (let i = 0; i < numPoints; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "2.5");
        circle.setAttribute("fill", "#fff");
        circle.setAttribute("opacity", "0.8");
        circle.setAttribute("style", "filter: drop-shadow(0 0 2px #ec4899);");
        circle.id = "vertex-" + i;
        pointsContainer.appendChild(circle);
      }
      updateDots();
    }

    function updateDots() {
      if (!showPointsCheck.checked) return;
      for (let i = 0; i < numPoints; i++) {
        const circle = document.getElementById("vertex-" + i);
        if (circle) {
          circle.setAttribute("cx", currentPoints[i].x);
          circle.setAttribute("cy", currentPoints[i].y);
        }
      }
    }

    function buildPathString(points) {
      if (points.length === 0) return "";
      let d = "M " + points[0].x.toFixed(2) + "," + points[0].y.toFixed(2);
      for (let i = 1; i < points.length; i++) {
        d += " L " + points[i].x.toFixed(2) + "," + points[i].y.toFixed(2);
      }
      d += " Z";
      return d;
    }

    // Main animation step (Spring Physics solver + Jelly Wave Chain Easing)
    function tick() {
      // Chain follow logic: point 0 chases global target progress
      localTargets[0] += (activeProgress - localTargets[0]) * 0.15;
      
      // Points follow in a chain to propagate the wave
      const waveFactor = jellyWave === 0 ? 1 : Math.max(0.01, 1 - jellyWave * 20);
      for (let i = 1; i < numPoints; i++) {
        localTargets[i] += (localTargets[i - 1] - localTargets[i]) * waveFactor;
      }

      // Physics coordinate solver
      for (let i = 0; i < numPoints; i++) {
        const p = localTargets[i];
        // Perfect coordinate interpolation target
        const tx = sourcePoints[i].x + (targetPoints[i].x - sourcePoints[i].x) * p;
        const ty = sourcePoints[i].y + (targetPoints[i].y - sourcePoints[i].y) * p;

        // Force calculations
        const fx = tx - currentPoints[i].x;
        const fy = ty - currentPoints[i].y;

        const ax = fx * stiffness - velocities[i].x * (damping * 10);
        const ay = fy * stiffness - velocities[i].y * (damping * 10);

        velocities[i].x += ax;
        velocities[i].y += ay;

        currentPoints[i].x += velocities[i].x;
        currentPoints[i].y += velocities[i].y;
      }

      // Draw active path
      morphPath.setAttribute("d", buildPathString(currentPoints));
      updateDots();

      requestAnimationFrame(tick);
    }

    // UI Trigger morphing
    function triggerMorph() {
      morphDirection = morphDirection === 0 ? 1 : 0;
      activeProgress = morphDirection;
    }

    function resetAutoplay() {
      if (autoTimer) clearInterval(autoTimer);
      if (autoplayCheck.checked) {
        autoTimer = setInterval(() => {
          triggerMorph();
        }, 2200);
      }
    }

    // Event Listeners
    [sourceSelect, targetSelect, pointsSlider].forEach(el => {
      el.addEventListener('change', () => {
        rebuildPoints();
      });
    });

    [stiffnessSlider, dampingSlider, jellySlider].forEach(slider => {
      slider.addEventListener('input', () => {
        syncParams();
      });
    });

    showPointsCheck.addEventListener('change', () => {
      renderDots();
    });

    autoplayCheck.addEventListener('change', () => {
      resetAutoplay();
    });

    [customSourceText, customTargetText].forEach(txt => {
      txt.addEventListener('input', () => {
        rebuildPoints();
      });
    });

    startColorPicker.addEventListener('input', (e) => {
      stopStart.setAttribute('stop-color', e.target.value);
    });

    endColorPicker.addEventListener('input', (e) => {
      stopEnd.setAttribute('stop-color', e.target.value);
    });

    morphBtn.addEventListener('click', () => {
      triggerMorph();
      resetAutoplay();
    });

    reverseBtn.addEventListener('click', () => {
      // Swap selectors
      const tmp = sourceSelect.value;
      sourceSelect.value = targetSelect.value;
      targetSelect.value = tmp;

      // Swap custom fields
      const tmpText = customSourceText.value;
      customSourceText.value = customTargetText.value;
      customTargetText.value = tmpText;

      rebuildPoints();
      triggerMorph();
      resetAutoplay();
    });

    // Copy Self-Contained component logic
    copyCodeBtn.addEventListener('click', () => {
      const srcText = customSourceText.value.trim() || SHAPES[sourceSelect.value];
      const tgtText = customTargetText.value.trim() || SHAPES[targetSelect.value];
      
      const componentCode = [
        '<!-- Pure HTML/JS Spring Morphing Component -->',
        '<div class="morph-wrapper" style="width:300px; height:300px; position:relative; background:#020617; border-radius:20px; overflow:hidden; display:flex; justify-content:center; align-items:center;">',
        '  <svg viewBox="0 0 300 300" style="width:90%; height:90%;" id="embedSvg">',
        '    <defs>',
        '      <linearGradient id="embedGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
        '        <stop offset="0%" stop-color="' + startColorPicker.value + '" />',
        '        <stop offset="100%" stop-color="' + endColorPicker.value + '" />',
        '      </linearGradient>',
        '      <filter id="embedGlow">',
        '        <feGaussianBlur stdDeviation="6" result="blur"/>',
        '        <feComposite in="SourceGraphic" in2="blur" operator="over"/>',
        '      </filter>',
        '    </defs>',
        '    <path id="embedPath" fill="url(#embedGrad)" stroke="url(#embedGrad)" stroke-width="2" filter="url(#embedGlow)" opacity="0.95" />',
        '  </svg>',
        '</div>',
        '',
        '<' + 'script>',
        '(function() {',
        '  const srcD = "' + srcText + '";',
        '  const tgtD = "' + tgtText + '";',
        '  const numPts = ' + numPoints + ';',
        '  const stiff = ' + stiffness + ';',
        '  const damp = ' + damping + ';',
        '  const wave = ' + jellyWave + ';',
        '',
        '  function sample(d, count) {',
        '    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");',
        '    svg.setAttribute("width","0"); svg.setAttribute("height","0"); svg.style.position="absolute";',
        '    const pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");',
        '    pathNode.setAttribute("d", d);',
        '    svg.appendChild(pathNode);',
        '    document.body.appendChild(svg);',
        '    const pts = [];',
        '    try {',
        '      const totalLen = pathNode.getTotalLength() || 100;',
        '      for (let i = 0; i < count; i++) {',
        '        const pt = pathNode.getPointAtLength((i / count) * totalLen);',
        '        pts.push({ x: pt.x, y: pt.y });',
        '      }',
        '    } catch(e) {',
        '      for(let i=0; i<count; i++) {',
        '        let a = (i/count)*Math.PI*2;',
        '        pts.push({ x: 150+100*Math.cos(a), y: 150+100*Math.sin(a) });',
        '      }',
        '    } finally {',
        '      document.body.removeChild(svg);',
        '    }',
        '    return pts;',
        '  }',
        '',
        '  const srcPts = sample(srcD, numPts);',
        '  const tgtPts = sample(tgtD, numPts);',
        '  const currPts = srcPts.map(p => ({ x: p.x, y: p.y }));',
        '  const vels = srcPts.map(() => ({ x: 0, y: 0 }));',
        '  const locals = srcPts.map(() => 0);',
        '',
        '  let targetP = 0;',
        '  ',
        '  const wrap = document.getElementById("embedSvg").parentElement;',
        '  wrap.style.cursor = "pointer";',
        '  wrap.addEventListener("click", () => {',
        '    targetP = targetP === 0 ? 1 : 0;',
        '  });',
        '',
        '  setInterval(() => {',
        '    targetP = targetP === 0 ? 1 : 0;',
        '  }, 2500);',
        '',
        '  const pathEl = document.getElementById("embedPath");',
        '',
        '  function step() {',
        '    locals[0] += (targetP - locals[0]) * 0.15;',
        '    const wf = wave === 0 ? 1 : Math.max(0.01, 1 - wave * 20);',
        '    for (let i = 1; i < numPts; i++) {',
        '      locals[i] += (locals[i - 1] - locals[i]) * wf;',
        '    }',
        '',
        '    for (let i = 0; i < numPts; i++) {',
        '      const p = locals[i];',
        '      const tx = srcPts[i].x + (tgtPts[i].x - srcPts[i].x) * p;',
        '      const ty = srcPts[i].y + (tgtPts[i].y - srcPts[i].y) * p;',
        '',
        '      const ax = (tx - currPts[i].x) * stiff - vels[i].x * (damp * 10);',
        '      const ay = (ty - currPts[i].y) * stiff - vels[i].y * (damp * 10);',
        '',
        '      vels[i].x += ax; vels[i].y += ay;',
        '      currPts[i].x += vels[i].x; currPts[i].y += vels[i].y;',
        '    }',
        '',
        '    let d = "M " + currPts[0].x.toFixed(1) + "," + currPts[0].y.toFixed(1);',
        '    for (let i = 1; i < numPts; i++) {',
        '      d += " L " + currPts[i].x.toFixed(1) + "," + currPts[i].y.toFixed(1);',
        '    }',
        '    d += " Z";',
        '    pathEl.setAttribute("d", d);',
        '    requestAnimationFrame(step);',
        '  }',
        '  step();',
        '})();',
        '</' + 'script>'
      ].join('\\n');

      navigator.clipboard.writeText(componentCode).then(() => {
        showToast("📋 Code Copied to Clipboard!");
      }).catch(err => {
        // Fallback textarea creation
        const ta = document.createElement('textarea');
        ta.value = componentCode;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast("📋 Code Copied! (Fallback)");
      });
    });

    // Start everything
    rebuildPoints();
    resetAutoplay();
    requestAnimationFrame(tick);
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: '🎨 SVG SPRING MORPHING STUDIO',
      sub: 'Real Client-side Vector Path Interpolation & Jelly Spring Physics',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 SVG Morphing Playground loaded into editor!',
      settingsHdr: '⚙️ Shape Configuration',
      sourcePreset: '🟢 Source Preset',
      targetPreset: '🔴 Target Preset',
      stiffness: '🌀 Stiffness (Tension)',
      damping: '🛡️ Damping (Friction)',
      jelly: '🍮 Jelly Wave Propagation',
      points: '🔢 Resolution (Points)',
      palette: '🌈 Gradient Accent Palette',
      startColor: 'Gradient Start',
      endColor: 'Gradient End',
      showPoints: 'Render Coordinate Vertices',
      autoplay: 'Auto-loop Morph Simulation',
      customSvgHdr: '✒️ Custom SVG Paths Override',
      srcPathLbl: 'Custom Source Path (d)',
      tgtPathLbl: 'Custom Target Path (d)',
      triggerBtn: '⚡ Trigger Morph',
      swapBtn: '🔄 Swap Preset Roles',
      exportHdr: '📦 Export & Pure JS Code Generator',
      exportBtn: '📋 Copy Self-Contained Component Code',
      copied: '📋 Component code copied to clipboard!',
      optCircle: 'Perfect Circle',
      optStar: 'Cosmic 5-Star',
      optHeart: 'Symmetrical Heart',
      optHexagon: 'Geometric Hexagon',
      optCloud: 'Fluffy Cloud Shape',
      optLightning: 'Dynamic Lightning Bolt',
      optGear: 'Industrial Cog Gear'
    },
    fr: {
      title: '🎨 STUDIO DE MORPHING DE VECTEURS SVG',
      sub: 'Interpolation vectorielle réelle & Physique de ressort (Spring Physics)',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Studio de morphing de formes chargé dans l\'éditeur !',
      settingsHdr: '⚙️ Configuration des Formes',
      sourcePreset: '🟢 Forme Source Prédéfinie',
      targetPreset: '🔴 Forme Cible Prédéfinie',
      stiffness: '🌀 Rigidité (Tension de l\'arc)',
      damping: '🛡️ Amortissement (Friction)',
      jelly: '🍮 Effet Ondulation Gelée',
      points: '🔢 Résolution (Nombre de points)',
      palette: '🌈 Palette du Dégradé Actif',
      startColor: 'Début du dégradé',
      endColor: 'Fin du dégradé',
      showPoints: 'Afficher les sommets vectoriels',
      autoplay: 'Lancer en boucle automatique',
      customSvgHdr: '✒️ Forcer des chemins SVG personnalisés',
      srcPathLbl: 'Chemin SVG Source (d)',
      tgtPathLbl: 'Chemin SVG Cible (d)',
      triggerBtn: '⚡ Déclencher le Morphing',
      swapBtn: '🔄 Inverser les Rôles des Formes',
      exportHdr: '📦 Exportation & Composant JS Pur',
      exportBtn: '📋 Copier le Composant Complet Autonome',
      copied: '📋 Code du composant copié dans le presse-papiers !',
      optCircle: 'Cercle Parfait',
      optStar: 'Étoile à 5 branches',
      optHeart: 'Cœur Symétrique',
      optHexagon: 'Hexagone Régulier',
      optCloud: 'Nuage Céleste',
      optLightning: 'Éclair Dynamique',
      optGear: 'Engrenage Industriel'
    }
  };

  const SHAPES = {
    circle: "M 150,50 A 100,100 0 1,1 149.9,50 Z",
    star: "M 150,50 L 179,110 L 245,119 L 197,166 L 209,231 L 150,200 L 91,231 L 103,166 L 55,119 L 121,110 Z",
    heart: "M 150,90 C 150,90 120,40 70,40 C 20,40 10,90 10,120 C 10,170 80,220 150,270 C 220,220 290,170 290,120 C 290,90 280,40 230,40 C 180,40 150,90 150,90 Z",
    hexagon: "M 150,50 L 236.6,100 L 236.6,200 L 150,250 L 63.4,200 L 63.4,100 Z",
    cloud: "M 80,180 A 40,40 0 0,1 100,100 A 50,50 0 0,1 200,100 A 40,40 0 0,1 220,180 A 30,30 0 0,1 200,220 L 100,220 A 30,30 0 0,1 80,180 Z",
    lightning: "M 170,30 L 70,160 L 140,160 L 110,270 L 230,120 L 150,120 Z",
    gear: "M 150,70 L 160,50 L 180,50 L 175,75 A 100,100 0 0,1 205,87 L 225,72 L 239,86 L 224,106 A 100,100 0 0,1 236,136 L 261,141 L 261,161 L 236,166 A 100,100 0 0,1 224,196 L 239,216 L 225,230 L 205,215 A 100,100 0 0,1 175,227 L 180,252 L 160,252 L 150,230 A 100,100 0 0,1 125,227 L 120,252 L 100,252 L 105,227 A 100,100 0 0,1 75,215 L 55,230 L 41,216 L 56,196 A 100,100 0 0,1 56,106 L 41,86 L 55,72 L 75,87 A 100,100 0 0,1 105,75 L 100,50 L 120,50 L 130,70 A 100,100 0 0,1 150,70 Z"
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'svgmorphing') {
      window.activeTab = 'svgmorphing';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-svgmorphing');
      if (btn) btn.classList.add('active');
      initSVGMorphing(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initSVGMorphing(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="svgmorph-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        
        <!-- Header banner -->
        <div style="background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.1));border-radius:14px;padding:14px;border:1px solid rgba(245,158,11,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #f59e0b);">🎨</span>
          <div>
            <h2 style="margin:0;color:#fbbf24;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Full App Button -->
        <button id="svgmorph-load-full-app" style="width:100%;background:linear-gradient(90deg,#fbbf24,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(245,158,11,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Preview viewport -->
        <div style="background:#000;border:1px solid #1e293b;border-radius:12px;overflow:hidden;position:relative;aspect-ratio:1/1;margin-bottom:14px;display:flex;justify-content:center;align-items:center;box-shadow:inset 0 4px 10px rgba(0,0,0,0.8);">
          <svg viewBox="0 0 300 300" style="width:85%;height:85%;" id="svgmorph-preview-svg">
            <defs>
              <pattern id="svgmorph-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              </pattern>
              <linearGradient id="svgmorph-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" id="svgmorph-stopStart" stop-color="#f59e0b"/>
                <stop offset="100%" id="svgmorph-stopEnd" stop-color="#ec4899"/>
              </linearGradient>
              <filter id="svgmorph-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#svgmorph-grid)" />
            <path id="svgmorph-path" fill="url(#svgmorph-grad)" stroke="url(#svgmorph-grad)" stroke-width="2" filter="url(#svgmorph-glow)" opacity="0.9" />
            <g id="svgmorph-dots"></g>
          </svg>
        </div>

        <!-- Controls panel -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;display:flex;flex-direction:column;gap:12px;">
          <h3 style="margin:0;font-size:11px;color:#fbbf24;text-transform:uppercase;">${T.settingsHdr}</h3>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.sourcePreset}</label>
              <select id="svgmorph-source" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:6px;border-radius:6px;outline:none;">
                <option value="circle">${T.optCircle}</option>
                <option value="star" selected>${T.optStar}</option>
                <option value="heart">${T.optHeart}</option>
                <option value="hexagon">${T.optHexagon}</option>
                <option value="cloud">${T.optCloud}</option>
                <option value="lightning">${T.optLightning}</option>
                <option value="gear">${T.optGear}</option>
              </select>
            </div>
            
            <div style="display:flex;flex-direction:column;gap:4px;">
              <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.targetPreset}</label>
              <select id="svgmorph-target" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:6px;border-radius:6px;outline:none;">
                <option value="circle">${T.optCircle}</option>
                <option value="star">${T.optStar}</option>
                <option value="heart" selected>${T.optHeart}</option>
                <option value="hexagon">${T.optHexagon}</option>
                <option value="cloud">${T.optCloud}</option>
                <option value="lightning">${T.optLightning}</option>
                <option value="gear">${T.optGear}</option>
              </select>
            </div>
          </div>

          <!-- Spring tension -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.stiffness}</span>
              <span id="svgmorph-stiff-val">0.12</span>
            </div>
            <input type="range" id="svgmorph-stiff-slider" min="0.02" max="0.4" step="0.01" value="0.12" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Friction -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.damping}</span>
              <span id="svgmorph-damp-val">0.08</span>
            </div>
            <input type="range" id="svgmorph-damp-slider" min="0.01" max="0.3" step="0.01" value="0.08" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Jelly wave factor -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.jelly}</span>
              <span id="svgmorph-jelly-val">0.02</span>
            </div>
            <input type="range" id="svgmorph-jelly-slider" min="0" max="0.1" step="0.005" value="0.02" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Point Resolution -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.points}</span>
              <span id="svgmorph-points-val">80</span>
            </div>
            <input type="range" id="svgmorph-points-slider" min="20" max="150" step="5" value="80" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Color palettes -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="display:flex;align-items:center;gap:6px;background:#020617;border:1px solid #1e293b;border-radius:6px;padding:4px 8px;">
              <input type="color" id="svgmorph-c1" value="#f59e0b" style="border:none;background:none;width:18px;height:18px;cursor:pointer;padding:0;">
              <span style="font-size:8px;font-weight:800;color:#94a3b8;">${T.startColor}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;background:#020617;border:1px solid #1e293b;border-radius:6px;padding:4px 8px;">
              <input type="color" id="svgmorph-c2" value="#ec4899" style="border:none;background:none;width:18px;height:18px;cursor:pointer;padding:0;">
              <span style="font-size:8px;font-weight:800;color:#94a3b8;">${T.endColor}</span>
            </div>
          </div>

          <!-- Toggles -->
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:10px;cursor:pointer;color:#94a3b8;">
              <input type="checkbox" id="svgmorph-showdots" checked>
              <span>${T.showPoints}</span>
            </label>
            <label style="display:flex;align-items:center;gap:8px;font-size:10px;cursor:pointer;color:#94a3b8;">
              <input type="checkbox" id="svgmorph-autoplay" checked>
              <span>${T.autoplay}</span>
            </label>
          </div>

          <!-- Actions -->
          <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:10px;">
            <button id="svgmorph-trigger" style="background:linear-gradient(90deg,#f59e0b,#ec4899);border:none;color:#000;padding:10px;border-radius:6px;font-size:11px;font-weight:900;cursor:pointer;">${T.triggerBtn}</button>
            <button id="svgmorph-swap" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">${T.swapBtn}</button>
          </div>
        </div>

        <!-- Custom Svg Paste Area -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;">
          <h3 style="margin:0 0 10px 0;font-size:11px;color:#fbbf24;text-transform:uppercase;">${T.customSvgHdr}</h3>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <label style="font-size:9px;color:#94a3b8;">${T.srcPathLbl}</label>
              <textarea id="svgmorph-src-text" placeholder="Paste custom d='...' path here..." style="width:100%;height:35px;background:#000;border:1px solid #1e293b;color:#fbbf24;padding:6px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
            </div>
            <div style="display:flex;flex-direction:column;gap:2px;">
              <label style="font-size:9px;color:#94a3b8;">${T.tgtPathLbl}</label>
              <textarea id="svgmorph-tgt-text" placeholder="Paste custom d='...' path here..." style="width:100%;height:35px;background:#000;border:1px solid #1e293b;color:#ec4899;padding:6px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:9px;resize:none;box-sizing:border-box;outline:none;"></textarea>
            </div>
          </div>
        </div>

        <!-- Copy component code -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 8px 0;font-size:11px;color:#fbbf24;text-transform:uppercase;">${T.exportHdr}</h3>
          <button id="svgmorph-copycode" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;">${T.exportBtn}</button>
        </div>

        <div id="svgmorph-toast" style="display:none;text-align:center;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#fbbf24;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    // Cache elements
    const svgEl = document.getElementById('svgmorph-preview-svg');
    const pathEl = document.getElementById('svgmorph-path');
    const dotsEl = document.getElementById('svgmorph-dots');
    const sourceSel = document.getElementById('svgmorph-source');
    const targetSel = document.getElementById('svgmorph-target');
    const stiffSl = document.getElementById('svgmorph-stiff-slider');
    const dampSl = document.getElementById('svgmorph-damp-slider');
    const jellySl = document.getElementById('svgmorph-jelly-slider');
    const pointsSl = document.getElementById('svgmorph-points-slider');
    const stiffVal = document.getElementById('svgmorph-stiff-val');
    const dampVal = document.getElementById('svgmorph-damp-val');
    const jellyVal = document.getElementById('svgmorph-jelly-val');
    const pointsVal = document.getElementById('svgmorph-points-val');
    const c1Picker = document.getElementById('svgmorph-c1');
    const c2Picker = document.getElementById('svgmorph-c2');
    const stop1 = document.getElementById('svgmorph-stopStart');
    const stop2 = document.getElementById('svgmorph-stopEnd');
    const dotsCheck = document.getElementById('svgmorph-showdots');
    const autoCheck = document.getElementById('svgmorph-autoplay');
    const srcText = document.getElementById('svgmorph-src-text');
    const tgtText = document.getElementById('svgmorph-tgt-text');
    const triggerB = document.getElementById('svgmorph-trigger');
    const swapB = document.getElementById('svgmorph-swap');
    const copyB = document.getElementById('svgmorph-copycode');
    const toast = document.getElementById('svgmorph-toast');

    let numPoints = 80;
    let stiffness = 0.12;
    let damping = 0.08;
    let jellyWave = 0.02;

    let sourcePoints = [];
    let targetPoints = [];
    let currentPoints = [];
    let velocities = [];
    let localTargets = [];

    let morphDirection = 0;
    let activeProgress = 0;
    let loopTimer = null;
    let animId = null;

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function samplePath(pathData, count) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      svg.style.top = "-9999px";
      
      const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
      node.setAttribute("d", pathData);
      svg.appendChild(node);
      document.body.appendChild(svg);

      const pts = [];
      try {
        const total = node.getTotalLength() || 100;
        for (let i = 0; i < count; i++) {
          const pt = node.getPointAtLength((i / count) * total);
          pts.push({ x: pt.x, y: pt.y });
        }
      } catch (err) {
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          pts.push({ x: 150 + 100 * Math.cos(a), y: 150 + 100 * Math.sin(a) });
        }
      } finally {
        document.body.removeChild(svg);
      }
      return pts;
    }

    function sync() {
      stiffness = parseFloat(stiffSl.value);
      damping = parseFloat(dampSl.value);
      jellyWave = parseFloat(jellySl.value);
      numPoints = parseInt(pointsSl.value);

      stiffVal.textContent = stiffness.toFixed(2);
      dampVal.textContent = damping.toFixed(2);
      jellyVal.textContent = jellyWave.toFixed(2);
      pointsVal.textContent = numPoints;
    }

    function rebuild() {
      sync();

      const sd = srcText.value.trim() || SHAPES[sourceSel.value];
      const td = tgtText.value.trim() || SHAPES[targetSel.value];

      sourcePoints = samplePath(sd, numPoints);
      targetPoints = samplePath(td, numPoints);

      if (currentPoints.length !== numPoints) {
        currentPoints = [];
        velocities = [];
        localTargets = [];
        for (let i = 0; i < numPoints; i++) {
          const initialP = morphDirection === 0 ? sourcePoints[i] : targetPoints[i];
          currentPoints.push({ x: initialP.x, y: initialP.y });
          velocities.push({ x: 0, y: 0 });
          localTargets.push(morphDirection === 0 ? 0 : 1);
        }
      }
      renderVertices();
    }

    function renderVertices() {
      dotsEl.innerHTML = '';
      if (!dotsCheck.checked) return;

      for (let i = 0; i < numPoints; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "2.5");
        circle.setAttribute("fill", "#fff");
        circle.setAttribute("opacity", "0.85");
        circle.id = "svgmorph-vertex-" + i;
        dotsEl.appendChild(circle);
      }
      updateVertices();
    }

    function updateVertices() {
      if (!dotsCheck.checked) return;
      for (let i = 0; i < numPoints; i++) {
        const circle = document.getElementById("svgmorph-vertex-" + i);
        if (circle) {
          circle.setAttribute("cx", currentPoints[i].x);
          circle.setAttribute("cy", currentPoints[i].y);
        }
      }
    }

    function buildPathString(points) {
      if (points.length === 0) return "";
      let d = "M " + points[0].x.toFixed(2) + "," + points[0].y.toFixed(2);
      for (let i = 1; i < points.length; i++) {
        d += " L " + points[i].x.toFixed(2) + "," + points[i].y.toFixed(2);
      }
      d += " Z";
      return d;
    }

    function loop() {
      // propagation
      localTargets[0] += (activeProgress - localTargets[0]) * 0.15;
      const wf = jellyWave === 0 ? 1 : Math.max(0.01, 1 - jellyWave * 20);
      for (let i = 1; i < numPoints; i++) {
        localTargets[i] += (localTargets[i - 1] - localTargets[i]) * wf;
      }

      // physics
      for (let i = 0; i < numPoints; i++) {
        const p = localTargets[i];
        const tx = sourcePoints[i].x + (targetPoints[i].x - sourcePoints[i].x) * p;
        const ty = sourcePoints[i].y + (targetPoints[i].y - sourcePoints[i].y) * p;

        const fx = tx - currentPoints[i].x;
        const fy = ty - currentPoints[i].y;

        const ax = fx * stiffness - velocities[i].x * (damping * 10);
        const ay = fy * stiffness - velocities[i].y * (damping * 10);

        velocities[i].x += ax;
        velocities[i].y += ay;

        currentPoints[i].x += velocities[i].x;
        currentPoints[i].y += velocities[i].y;
      }

      pathEl.setAttribute("d", buildPathString(currentPoints));
      updateVertices();

      animId = requestAnimationFrame(loop);
    }

    function trigger() {
      morphDirection = morphDirection === 0 ? 1 : 0;
      activeProgress = morphDirection;
    }

    function resetAutoplay() {
      if (loopTimer) clearInterval(loopTimer);
      if (autoCheck.checked) {
        loopTimer = setInterval(() => {
          trigger();
        }, 2200);
      }
    }

    // Bind UI
    [sourceSel, targetSel, pointsSl].forEach(el => el.addEventListener('change', rebuild));
    [stiffSl, dampSl, jellySl].forEach(el => el.addEventListener('input', sync));

    dotsCheck.addEventListener('change', renderVertices);
    autoCheck.addEventListener('change', resetAutoplay);
    [srcText, tgtText].forEach(el => el.addEventListener('input', rebuild));

    c1Picker.addEventListener('input', (e) => stop1.setAttribute('stop-color', e.target.value));
    c2Picker.addEventListener('input', (e) => stop2.setAttribute('stop-color', e.target.value));

    triggerB.addEventListener('click', () => { trigger(); resetAutoplay(); });

    swapB.addEventListener('click', () => {
      const t = sourceSel.value; sourceSel.value = targetSel.value; targetSel.value = t;
      const tt = srcText.value; srcText.value = tgtText.value; tgtText.value = tt;
      rebuild(); trigger(); resetAutoplay();
    });

    copyB.addEventListener('click', () => {
      const sd = srcText.value.trim() || SHAPES[sourceSel.value];
      const td = tgtText.value.trim() || SHAPES[targetSel.value];

      const compCode = `<!-- SVG Spring Morph Component -->
<div class="morph-container" style="width:300px;height:300px;position:relative;background:#020617;border-radius:16px;display:flex;justify-content:center;align-items:center;">
  <svg viewBox="0 0 300 300" style="width:90%;height:90%;" id="embed-svg-node">
    <defs>
      <linearGradient id="embed-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1Picker.value}"/>
        <stop offset="100%" stop-color="${c2Picker.value}"/>
      </linearGradient>
    </defs>
    <path id="embed-path-node" fill="url(#embed-grad)" opacity="0.95"/>
  </svg>
</div>
<script>
(function() {
  const srcD = "${sd}"; const tgtD = "${td}";
  const nPoints = ${numPoints}; const s = ${stiffness}; const d = ${damping}; const j = ${jellyWave};
  function sample(pathD, count) {
    const sNode = document.createElementNS("http://www.w3.org/2000/svg","svg");
    const pNode = document.createElementNS("http://www.w3.org/2000/svg","path");
    pNode.setAttribute("d", pathD); sNode.appendChild(pNode); document.body.appendChild(sNode);
    const pts = [];
    try {
      const len = pNode.getTotalLength() || 100;
      for (let i = 0; i < count; i++) {
        const pt = pNode.getPointAtLength((i/count)*len);
        pts.push({ x: pt.x, y: pt.y });
      }
    } catch(err) {
      for(let i=0; i<count; i++) {
        let a = (i/count)*Math.PI*2;
        pts.push({ x: 150+100*Math.cos(a), y: 150+100*Math.sin(a) });
      }
    } finally { document.body.removeChild(sNode); }
    return pts;
  }
  const sPts = sample(srcD, nPoints); const tPts = sample(tgtD, nPoints);
  const cPts = sPts.map(p => ({ x: p.x, y: p.y }));
  const vels = sPts.map(() => ({ x: 0, y: 0 }));
  const lTargets = sPts.map(() => 0);
  let activeP = 0;

  setInterval(() => { activeP = activeP === 0 ? 1 : 0; }, 2300);

  const pathElement = document.getElementById("embed-path-node");
  function run() {
    lTargets[0] += (activeP - lTargets[0]) * 0.15;
    const wf = j === 0 ? 1 : Math.max(0.01, 1 - j*20);
    for(let i=1; i<nPoints; i++) lTargets[i] += (lTargets[i-1]-lTargets[i])*wf;
    for(let i=0; i<nPoints; i++) {
      const tx = sPts[i].x + (tPts[i].x - sPts[i].x) * lTargets[i];
      const ty = sPts[i].y + (tPts[i].y - sPts[i].y) * lTargets[i];
      const ax = (tx - cPts[i].x)*s - vels[i].x*(d*10);
      const ay = (ty - cPts[i].y)*s - vels[i].y*(d*10);
      vels[i].x += ax; vels[i].y += ay;
      cPts[i].x += vels[i].x; cPts[i].y += vels[i].y;
    }
    let dStr = "M " + cPts[0].x.toFixed(1) + "," + cPts[0].y.toFixed(1);
    for(let i=1; i<nPoints; i++) dStr += " L "+cPts[i].x.toFixed(1)+","+cPts[i].y.toFixed(1);
    pathElement.setAttribute("d", dStr + " Z");
    requestAnimationFrame(run);
  }
  run();
})();
<\/script>`;

      navigator.clipboard.writeText(compCode).then(() => {
        showToast(T.copied);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = compCode; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        showToast(T.copied);
      });
    });

    document.getElementById('svgmorph-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    // Start
    rebuild();
    resetAutoplay();
    loop();

    if (window.showToast) window.showToast('✅ SVG Morphing initialized.');
  }
})();
