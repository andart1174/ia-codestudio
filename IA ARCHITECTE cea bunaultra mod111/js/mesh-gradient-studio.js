(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 🌈 DYNAMIC MESH GRADIENT FORGE — Fluid Interactive Blurs
  // ═══════════════════════════════════════════════════════════

  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aesthetic Mesh Gradient Forge</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --card-bg: #0b1329;
      --card-border: #1e293b;
      --accent: #10b981;
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
      overflow-x: hidden;
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
      aspect-ratio: 1.1/1;
      box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.9);
      cursor: crosshair;
    }
    canvas {
      width: 100%;
      height: 100%;
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
    select, input[type="range"] {
      background: #020617;
      border: 1px solid var(--card-border);
      color: var(--text);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: inherit;
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
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
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #020617;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 12px;
    }
    input[type="color"] {
      border: none;
      background: none;
      width: 28px;
      height: 28px;
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
      box-shadow: 0 4px 15px rgba(16,185,129,0.25);
    }
    button.btn-primary:hover {
      transform: translateY(-1px);
    }
    button.btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      color: var(--text);
    }
    button.btn-secondary:hover {
      background: #334155;
    }
    .export-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
    }
    .nodes-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      max-height: 140px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .node-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #020617;
      border: 1px solid var(--card-border);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 11px;
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
      box-shadow: 0 10px 25px rgba(16,185,129,0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌈 Aesthetic Mesh Gradient Forge</h1>
    <p class="sub">Interactive multi-nodal fluid vector colors & vector displacement canvas</p>

    <div class="grid">
      <div class="preview-card" id="canvasWrapper">
        <canvas id="meshCanvas"></canvas>
      </div>

      <div class="panel">
        <h3>⚙️ Controller & Settings</h3>

        <div class="form-group">
          <label>🎨 Preset Palettes</label>
          <select id="presetSelect">
            <option value="cyber">Cyberpunk Sunrise</option>
            <option value="ocean">Deep Ocean Neon</option>
            <option value="neural">Sentient Neural Glare</option>
            <option value="toxic">Toxic Acid Slime</option>
          </select>
        </div>

        <div class="form-group">
          <label><span>Animation Velocity</span><span id="speedVal">1.2</span></label>
          <input type="range" id="speedSlider" min="0.1" max="4.0" step="0.1" value="1.2">
        </div>

        <div class="form-group">
          <label><span>Nodal Blur Radius</span><span id="blurVal">140px</span></label>
          <input type="range" id="blurSlider" min="60" max="300" step="10" value="140">
        </div>

        <h3>📍 Active Color Nodes</h3>
        <div class="nodes-list" id="nodesContainer"></div>

        <div class="btn-group" style="margin-top:10px;">
          <button class="btn-primary" id="playBtn">⏸️ Pause Motion</button>
          <button class="btn-secondary" id="addNodeBtn">➕ Add Random Node</button>
        </div>
      </div>
    </div>

    <div class="export-card">
      <h3>📦 Standalone Export</h3>
      <p style="font-size:11px;color:var(--text-muted);margin:4px 0 12px 0;">Export this interactive Mesh gradient with zero external dependencies, perfect for full screen layouts.</p>
      <button class="btn-secondary" id="copyCodeBtn" style="width:100%;">📋 Copy Self-Contained Web Component</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const canvas = document.getElementById('meshCanvas');
    const ctx = canvas.getContext('2d');
    const presetSelect = document.getElementById('presetSelect');
    const speedSlider = document.getElementById('speedSlider');
    const blurSlider = document.getElementById('blurSlider');
    const speedVal = document.getElementById('speedVal');
    const blurVal = document.getElementById('blurVal');
    const nodesContainer = document.getElementById('nodesContainer');
    const playBtn = document.getElementById('playBtn');
    const addNodeBtn = document.getElementById('addNodeBtn');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const toast = document.getElementById('toast');

    let nodes = [];
    let isPlaying = true;
    let time = 0;
    let selectedNode = null;
    let isDragging = false;

    const PRESETS = {
      cyber: ['#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6'],
      ocean: ['#06b6d4', '#3b82f6', '#1d4ed8', '#0f172a'],
      neural: ['#ec4899', '#ef4444', '#7c3aed', '#1e1b4b'],
      toxic: ['#10b981', '#84cc16', '#06b6d4', '#022c22']
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function initNodes(colors) {
      nodes = [];
      colors.forEach((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2;
        nodes.push({
          x: canvas.width / 2 + Math.cos(angle) * (canvas.width * 0.25),
          y: canvas.height / 2 + Math.sin(angle) * (canvas.height * 0.25),
          color: color,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          baseRadius: 1.0
        });
      });
      renderNodeControls();
    }

    function renderNodeControls() {
      nodesContainer.innerHTML = '';
      nodes.forEach((node, i) => {
        const item = document.createElement('div');
        item.className = 'node-item';
        item.innerHTML = \`
          <div style="display:flex;align-items:center;gap:8px;">
            <input type="color" value="\${node.color}" data-idx="\${i}">
            <span style="font-family:monospace;font-weight:700;">Node #\${i + 1}</span>
          </div>
          <button style="padding:2px 8px;font-size:9px;background:#ef4444;color:#fff;border-radius:4px;cursor:pointer;" data-del="\${i}">Delete</button>
        \`;
        nodesContainer.appendChild(item);
      });

      // Bind dynamic change
      nodesContainer.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener('input', (e) => {
          const idx = parseInt(e.target.getAttribute('data-idx'));
          nodes[idx].color = e.target.value;
        });
      });

      nodesContainer.querySelectorAll('button[data-del]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.getAttribute('data-del'));
          if (nodes.length <= 2) {
            showToast("⚠️ Minimal 2 nodes required!");
            return;
          }
          nodes.splice(idx, 1);
          renderNodeControls();
        });
      });
    }

    function draw() {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const blurRadius = parseFloat(blurSlider.value);
      const speed = parseFloat(speedSlider.value);

      if (isPlaying) {
        time += 0.005 * speed;
      }

      nodes.forEach((node, i) => {
        if (isPlaying && !isDragging) {
          // Add organic trigonometric movement
          node.x += node.vx * speed + Math.sin(time + i) * 0.2;
          node.y += node.vy * speed + Math.cos(time + i) * 0.2;

          // Wall bounce
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Keep in bounds
          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Draw node blur circle
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, blurRadius);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, blurRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw helper anchor dots for visualization
      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      requestAnimationFrame(draw);
    }

    // Preset select listener
    presetSelect.addEventListener('change', () => {
      initNodes(PRESETS[presetSelect.value]);
    });

    speedSlider.addEventListener('input', () => {
      speedVal.textContent = speedSlider.value;
    });

    blurSlider.addEventListener('input', () => {
      blurVal.textContent = blurSlider.value + 'px';
    });

    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸️ Pause Motion' : '▶️ Resume Motion';
    });

    addNodeBtn.addEventListener('click', () => {
      if (nodes.length >= 10) {
        showToast("⚠️ Maximum 10 nodes reached!");
        return;
      }
      const randomColors = ['#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#3b82f6', '#ef4444', '#06b6d4'];
      const color = randomColors[Math.floor(Math.random() * randomColors.length)];
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: color,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        baseRadius: 1.0
      });
      renderNodeControls();
      showToast("➕ Node added successfully!");
    });

    // Drag and Drop Node Handler
    function getMousePos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function checkNodeClick(pos) {
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - pos.x;
        const dy = nodes[i].y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 25) {
          return i;
        }
      }
      return null;
    }

    function handleStart(e) {
      const pos = getMousePos(e);
      const clicked = checkNodeClick(pos);
      if (clicked !== null) {
        selectedNode = clicked;
        isDragging = true;
      }
    }

    function handleMove(e) {
      if (isDragging && selectedNode !== null) {
        const pos = getMousePos(e);
        nodes[selectedNode].x = Math.max(0, Math.min(canvas.width, pos.x));
        nodes[selectedNode].y = Math.max(0, Math.min(canvas.height, pos.y));
      }
    }

    function handleEnd() {
      isDragging = false;
      selectedNode = null;
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    // Initial setup
    initNodes(PRESETS.cyber);
    requestAnimationFrame(draw);

    // Copy standalone code component
    copyCodeBtn.addEventListener('click', () => {
      const nodeData = nodes.map(n => ({ xPercent: parseFloat((n.x / canvas.width).toFixed(3)), yPercent: parseFloat((n.y / canvas.height).toFixed(3)), color: n.color }));
      const blurRad = parseFloat(blurSlider.value);
      const speed = parseFloat(speedSlider.value);

      const componentCode = [
        '<!-- Standalone Aesthetic Mesh Gradient Dynamic Canvas -->',
        '<div class="mesh-container" style="width: 100vw; height: 100vh; position: relative; background: #020617; overflow: hidden; margin: 0; padding: 0;">',
        '  <canvas id="standaloneMeshCanvas" style="width: 100%; height: 100%; display: block;"></canvas>',
        '</div>',
        '',
        '<' + 'script>',
        '(function() {',
        '  const canvas = document.getElementById("standaloneMeshCanvas");',
        '  const ctx = canvas.getContext("2d");',
        '  let nodes = ' + JSON.stringify(nodeData) + ';',
        '  let blurRadius = ' + blurRad + ';',
        '  let speed = ' + speed + ';',
        '  let time = 0;',
        '',
        '  function resize() {',
        '    canvas.width = window.innerWidth;',
        '    canvas.height = window.innerHeight;',
        '    nodes.forEach(n => {',
        '      n.x = n.xPercent * canvas.width;',
        '      n.y = n.yPercent * canvas.height;',
        '      n.vx = (Math.random() - 0.5) * 1.5;',
        '      n.vy = (Math.random() - 0.5) * 1.5;',
        '    });',
        '  }',
        '  window.addEventListener("resize", resize);',
        '  resize();',
        '',
        '  function draw() {',
        '    ctx.fillStyle = "#020617";',
        '    ctx.fillRect(0, 0, canvas.width, canvas.height);',
        '    ctx.save();',
        '    ctx.globalCompositeOperation = "screen";',
        '    time += 0.005 * speed;',
        '',
        '    nodes.forEach((node, i) => {',
        '      node.x += node.vx * speed + Math.sin(time + i) * 0.2;',
        '      node.y += node.vy * speed + Math.cos(time + i) * 0.2;',
        '      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;',
        '      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;',
        '      node.x = Math.max(0, Math.min(canvas.width, node.x));',
        '      node.y = Math.max(0, Math.min(canvas.height, node.y));',
        '',
        '      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, blurRadius);',
        '      grad.addColorStop(0, node.color);',
        '      grad.addColorStop(1, "transparent");',
        '      ctx.fillStyle = grad;',
        '      ctx.beginPath();',
        '      ctx.arc(node.x, node.y, blurRadius, 0, Math.PI * 2);',
        '      ctx.fill();',
        '    });',
        '    ctx.restore();',
        '    requestAnimationFrame(draw);',
        '  }',
        '  requestAnimationFrame(draw);',
        '})();',
        '</' + 'script>'
      ].join('\\n');

      navigator.clipboard.writeText(componentCode).then(() => {
        showToast("📋 Code Copied to Clipboard!");
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = componentCode;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast("📋 Code Copied! (Fallback)");
      });
    });
  </script>
</body>
</html>`;

  const TX = {
    en: {
      title: '🌈 DYNAMIC CSS MESH GRADIENT FORGE',
      sub: 'Fluid color vector space & dynamic nodal displacement canvas',
      loadFullApp: '🚀 Load Full Standalone App',
      loadSuccess: '🚀 Mesh Gradient Forge loaded into editor!',
      settingsHdr: '⚙️ Controller & Settings',
      presetsLbl: '🎨 Preset Palettes',
      speedLbl: 'Animation Velocity',
      blurLbl: 'Nodal Blur Radius',
      nodesHdr: '📍 Active Color Nodes',
      pauseMotion: '⏸️ Pause Motion',
      resumeMotion: '▶️ Resume Motion',
      addNode: '➕ Add Random Node',
      exportHdr: '📦 Standalone Export',
      exportDesc: 'Export this interactive Mesh gradient with zero external dependencies, perfect for full screen layouts.',
      exportBtn: '📋 Copy Self-Contained Web Component',
      copied: '📋 Component code copied to clipboard!',
      optCyber: 'Cyberpunk Sunrise',
      optOcean: 'Deep Ocean Neon',
      optNeural: 'Sentient Neural Glare',
      optToxic: 'Toxic Acid Slime',
      errMinNodes: '⚠️ Minimal 2 nodes required!',
      errMaxNodes: '⚠️ Maximum 10 nodes reached!',
      nodeSuccess: '➕ Node added successfully!'
    },
    fr: {
      title: '🌈 FORGE DE DÉGRADÉ MESH DYNAMIQUE',
      sub: 'Espace vectoriel de couleurs fluides & canvas de déplacement nodal',
      loadFullApp: '🚀 Charger l\'appli complète',
      loadSuccess: '🚀 Forge de dégradé Mesh chargée dans l\'éditeur !',
      settingsHdr: '⚙️ Contrôleur & Paramètres',
      presetsLbl: '🎨 Palettes Prédéfinies',
      speedLbl: 'Vitesse de l\'Anima',
      blurLbl: 'Rayon de Flou Nodal',
      nodesHdr: '📍 Nœuds de Couleur Actifs',
      pauseMotion: '⏸️ Interrompre le mouvement',
      resumeMotion: '▶️ Relancer le mouvement',
      addNode: '➕ Ajouter un Nœud Aléatoire',
      exportHdr: '📦 Exportation Standalone',
      exportDesc: 'Exportez ce dégradé Mesh interactif sans aucune dépendance externe, parfait pentru fundal complet.',
      exportBtn: '📋 Copier le Composant Web Autonome',
      copied: '📋 Code du composant copié dans le presse-papiers !',
      optCyber: 'Aurore Cyberpunk',
      optOcean: 'Océan Néon Profond',
      optNeural: 'Éclat Neural Conscient',
      optToxic: 'Limon Acide Toxique',
      errMinNodes: '⚠️ Minimum de 2 nœuds requis !',
      errMaxNodes: '⚠️ Limite de 10 nœuds atteinte !',
      nodeSuccess: '➕ Nœud ajouté avec succès !'
    }
  };

  const PRESETS = {
    cyber: ['#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6'],
    ocean: ['#06b6d4', '#3b82f6', '#1d4ed8', '#0f172a'],
    neural: ['#ec4899', '#ef4444', '#7c3aed', '#1e1b4b'],
    toxic: ['#10b981', '#84cc16', '#06b6d4', '#022c22']
  };

  function gl() { return window.appLang || 'en'; }

  const _origRenderTab = window.renderTab;
  window.renderTab = function (tab) {
    if (tab === 'meshgradient') {
      window.activeTab = 'meshgradient';
      document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('tab-meshgradient');
      if (btn) btn.classList.add('active');
      initMeshGradient(gl());
      return;
    }
    if (typeof _origRenderTab === 'function') _origRenderTab(tab);
  };

  function initMeshGradient(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const T = TX[lang] || TX.en;

    el.innerHTML = `
      <div id="mesh-root" style="padding:14px;font-family:'Inter',sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;color:#f8fafc;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(236,72,153,0.1));border-radius:14px;padding:14px;border:1px solid rgba(16,185,129,0.35);margin-bottom:12px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:28px;filter:drop-shadow(0 0 10px #10b981);">🌈</span>
          <div>
            <h2 style="margin:0;color:#34d399;font-size:15px;font-weight:900;letter-spacing:0.4px;">${T.title}</h2>
            <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${T.sub}</p>
          </div>
        </div>

        <!-- Load Standalone App -->
        <button id="mesh-load-full-app" style="width:100%;background:linear-gradient(90deg,#10b981,#ec4899);border:none;color:#000;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;margin-bottom:14px;box-shadow:0 0 15px rgba(16,185,129,0.25);transition:transform 0.1s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">${T.loadFullApp}</button>

        <!-- Preview canvas -->
        <div id="mesh-preview-wrap" style="background:#000;border:1px solid #1e293b;border-radius:12px;overflow:hidden;position:relative;aspect-ratio:1.1/1;margin-bottom:14px;box-shadow:inset 0 4px 10px rgba(0,0,0,0.8);cursor:crosshair;">
          <canvas id="mesh-preview-canvas" style="width:100%;height:100%;display:block;"></canvas>
        </div>

        <!-- Controls panel -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:14px;display:flex;flex-direction:column;gap:12px;">
          <h3 style="margin:0;font-size:11px;color:#34d399;text-transform:uppercase;">${T.settingsHdr}</h3>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <label style="font-size:9px;color:#94a3b8;font-weight:700;">${T.presetsLbl}</label>
            <select id="mesh-preset-select" style="background:#020617;border:1px solid #1e293b;color:#fff;font-size:11px;padding:6px;border-radius:6px;outline:none;">
              <option value="cyber">${T.optCyber}</option>
              <option value="ocean">${T.optOcean}</option>
              <option value="neural">${T.optNeural}</option>
              <option value="toxic">${T.optToxic}</option>
            </select>
          </div>

          <!-- Speed Slider -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.speedLbl}</span>
              <span id="mesh-speed-val">1.2</span>
            </div>
            <input type="range" id="mesh-speed-slider" min="0.1" max="4.0" step="0.1" value="1.2" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <!-- Blur Radius -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:between;font-size:9px;color:#94a3b8;font-weight:700;">
              <span>${T.blurLbl}</span>
              <span id="mesh-blur-val">140px</span>
            </div>
            <input type="range" id="mesh-blur-slider" min="60" max="300" step="10" value="140" style="width:100%;height:4px;background:#334155;border-radius:2px;-webkit-appearance:none;cursor:pointer;">
          </div>

          <h3 style="margin:6px 0 0 0;font-size:11px;color:#34d399;text-transform:uppercase;">${T.nodesHdr}</h3>
          <div id="mesh-nodes-list" style="display:flex;flex-direction:column;gap:6px;max-height:120px;overflow-y:auto;padding-right:4px;"></div>

          <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:10px;margin-top:4px;">
            <button id="mesh-play-btn" style="background:linear-gradient(90deg,#10b981,#ec4899);border:none;color:#000;padding:8px;border-radius:6px;font-size:10px;font-weight:900;cursor:pointer;">${T.pauseMotion}</button>
            <button id="mesh-add-btn" style="background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;">${T.addNode}</button>
          </div>
        </div>

        <!-- Copy component -->
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;">
          <h3 style="margin:0 0 4px 0;font-size:11px;color:#34d399;text-transform:uppercase;">${T.exportHdr}</h3>
          <p style="font-size:9px;color:#94a3b8;margin:0 0 10px 0;">${T.exportDesc}</p>
          <button id="mesh-copy-code" style="width:100%;background:#1e293b;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;">${T.exportBtn}</button>
        </div>

        <div id="mesh-toast" style="display:none;text-align:center;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:8px;padding:8px;margin-top:10px;color:#34d399;font-size:11px;font-weight:700;"></div>
      </div>
    `;

    // Cache elements
    const canvas = document.getElementById('mesh-preview-canvas');
    const ctx = canvas.getContext('2d');
    const wrap = document.getElementById('mesh-preview-wrap');
    const presetSelect = document.getElementById('mesh-preset-select');
    const speedSlider = document.getElementById('mesh-speed-slider');
    const blurSlider = document.getElementById('mesh-blur-slider');
    const speedVal = document.getElementById('mesh-speed-val');
    const blurVal = document.getElementById('mesh-blur-val');
    const nodesList = document.getElementById('mesh-nodes-list');
    const playBtn = document.getElementById('mesh-play-btn');
    const addBtn = document.getElementById('mesh-add-btn');
    const copyBtn = document.getElementById('mesh-copy-code');
    const toast = document.getElementById('mesh-toast');

    let nodes = [];
    let isPlaying = true;
    let time = 0;
    let selectedNode = null;
    let isDragging = false;
    let animId = null;

    function resize() {
      if (!canvas) return;
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resize();
    setTimeout(resize, 100);

    function showToast(msg) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2200);
    }

    function initNodes(colors) {
      nodes = [];
      colors.forEach((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2;
        nodes.push({
          x: canvas.width / 2 + Math.cos(angle) * (canvas.width * 0.25),
          y: canvas.height / 2 + Math.sin(angle) * (canvas.height * 0.25),
          color: color,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5
        });
      });
      renderControls();
    }

    function renderControls() {
      nodesList.innerHTML = '';
      nodes.forEach((node, i) => {
        const item = document.createElement('div');
        item.style.cssText = 'display:flex;justify-content:space-between;align-items:center;background:#020617;border:1px solid #1e293b;padding:4px 8px;border-radius:6px;font-size:10px;';
        item.innerHTML = `
          <div style="display:flex;align-items:center;gap:6px;">
            <input type="color" value="${node.color}" data-idx="${i}" style="border:none;background:none;width:20px;height:20px;cursor:pointer;padding:0;">
            <span style="font-family:monospace;font-weight:700;color:#94a3b8;">N#${i + 1}</span>
          </div>
          <button data-del="${i}" style="padding:2px 6px;font-size:8px;background:#ef4444;border:none;color:#fff;border-radius:4px;cursor:pointer;">🗑️</button>
        `;
        nodesList.appendChild(item);
      });

      nodesList.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.addEventListener('input', (e) => {
          const idx = parseInt(picker.getAttribute('data-idx'));
          nodes[idx].color = e.target.value;
        });
      });

      nodesList.querySelectorAll('button[data-del]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-del'));
          if (nodes.length <= 2) {
            showToast(T.errMinNodes);
            return;
          }
          nodes.splice(idx, 1);
          renderControls();
        });
      });
    }

    function loop() {
      if (!canvas) return;
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const blurRadius = parseFloat(blurSlider.value);
      const speed = parseFloat(speedSlider.value);

      if (isPlaying) {
        time += 0.005 * speed;
      }

      nodes.forEach((node, i) => {
        if (isPlaying && !isDragging) {
          node.x += node.vx * speed + Math.sin(time + i) * 0.2;
          node.y += node.vy * speed + Math.cos(time + i) * 0.2;

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, blurRadius);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, blurRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Anchor markers
      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      animId = requestAnimationFrame(loop);
    }

    presetSelect.addEventListener('change', () => {
      initNodes(PRESETS[presetSelect.value]);
    });

    speedSlider.addEventListener('input', () => {
      speedVal.textContent = speedSlider.value;
    });

    blurSlider.addEventListener('input', () => {
      blurVal.textContent = blurSlider.value + 'px';
    });

    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? T.pauseMotion : T.resumeMotion;
    });

    addBtn.addEventListener('click', () => {
      if (nodes.length >= 10) {
        showToast(T.errMaxNodes);
        return;
      }
      const pool = ['#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#3b82f6', '#ef4444', '#06b6d4'];
      const c = pool[Math.floor(Math.random() * pool.length)];
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: c,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
      renderControls();
      showToast(T.nodeSuccess);
    });

    // Drag support
    function getMouse(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    }

    function handleStart(e) {
      const pos = getMouse(e);
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - pos.x;
        const dy = nodes[i].y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 22) {
          selectedNode = i;
          isDragging = true;
          break;
        }
      }
    }

    function handleMove(e) {
      if (isDragging && selectedNode !== null) {
        const pos = getMouse(e);
        nodes[selectedNode].x = Math.max(0, Math.min(canvas.width, pos.x));
        nodes[selectedNode].y = Math.max(0, Math.min(canvas.height, pos.y));
      }
    }

    function handleEnd() {
      isDragging = false;
      selectedNode = null;
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    initNodes(PRESETS.cyber);
    loop();

    copyBtn.addEventListener('click', () => {
      const nodeData = nodes.map(n => ({ xPercent: parseFloat((n.x / canvas.width).toFixed(3)), yPercent: parseFloat((n.y / canvas.height).toFixed(3)), color: n.color }));
      const blurRad = parseFloat(blurSlider.value);
      const speed = parseFloat(speedSlider.value);

      const compCode = `<!-- Standalone Aesthetic Mesh Gradient Dynamic Canvas -->
<div class="mesh-container" style="width: 100vw; height: 100vh; position: relative; background: #020617; overflow: hidden; margin: 0; padding: 0;">
  <canvas id="standaloneMeshCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
</div>
<script>
(function() {
  const canvas = document.getElementById("standaloneMeshCanvas");
  const ctx = canvas.getContext("2d");
  let nodes = ${JSON.stringify(nodeData)};
  let blurRadius = ${blurRad};
  let speed = ${speed};
  let time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nodes.forEach(n => {
      n.x = n.xPercent * canvas.width;
      n.y = n.yPercent * canvas.height;
      n.vx = (Math.random() - 0.5) * 1.5;
      n.vy = (Math.random() - 0.5) * 1.5;
    });
  }
  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    time += 0.005 * speed;

    nodes.forEach((node, i) => {
      node.x += node.vx * speed + Math.sin(time + i) * 0.2;
      node.y += node.vy * speed + Math.cos(time + i) * 0.2;
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));

      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, blurRadius);
      grad.addColorStop(0, node.color);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, blurRadius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
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

    document.getElementById('mesh-load-full-app').addEventListener('click', () => {
      if (window.editor) {
        window.editor.setValue(STANDALONE_TEMPLATE);
        if (window.runPreview) window.runPreview();
        showToast(T.loadSuccess);
      }
    });

    if (window.showToast) window.showToast('✅ Mesh Gradient initialized.');
  }
})();
