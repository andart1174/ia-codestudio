(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🚀 GAME DEV STUDIO ULTIMATE — BILINGUAL MASTERPIECE
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'GAME DEV ULTIMATE',
      sub: 'The Apex Game Development Suite',
      back: '← Back',
      inject: '➕ Inject Code to Editor',
      injected: '✅ Code Injected!',
      runMsg: 'Code injected! Click RUN to execute in the preview panel.',
      tools: {
        blueprints: {
          name: 'Visual Node Scripter',
          desc: 'Blueprint-style visual logic builder.',
          addEvent: '➕ Add Event Node',
          addAction: '➕ Add Action Node',
          injectBtn: 'Inject Visual Script Engine'
        },
        voxel3d: {
          name: 'Voxel World Builder',
          desc: 'Isometric 3D block environment architect.',
          addCube: '🧱 Place Voxel',
          removeCube: '🗑️ Remove Voxel',
          color: 'Voxel Color',
          injectBtn: 'Inject Voxel 3D Engine Code'
        },
        economy: {
          name: 'Economy & IAP Simulator',
          desc: 'Monetization modeling and retention charts.',
          itemCost: 'Average Item Cost ($)',
          conversion: 'Conversion Rate (%)',
          traffic: 'Daily Active Users',
          simulate: '📊 Run Simulation',
          injectBtn: 'Inject Economy Logic Code'
        }
      }
    },
    fr: {
      title: 'GAME DEV ULTIMATE',
      sub: 'La Suite Apex de Développement de Jeux',
      back: '← Retour',
      inject: '➕ Injecter le Code dans l\'Éditeur',
      injected: '✅ Code Injecté!',
      runMsg: 'Code injecté! Cliquez sur RUN pour l\'exécuter.',
      tools: {
        blueprints: {
          name: 'Scripteur Visuel de Nœuds',
          desc: 'Constructeur de logique visuelle style Blueprint.',
          addEvent: '➕ Ajouter un Nœud d\'Événement',
          addAction: '➕ Ajouter un Nœud d\'Action',
          injectBtn: 'Injecter le Moteur de Script Visuel'
        },
        voxel3d: {
          name: 'Constructeur de Monde Voxel',
          desc: 'Architecte d\'environnement 3D isométrique.',
          addCube: '🧱 Placer un Voxel',
          removeCube: '🗑️ Retirer un Voxel',
          color: 'Couleur du Voxel',
          injectBtn: 'Injecter le Code du Moteur Voxel 3D'
        },
        economy: {
          name: 'Simulateur d\'Économie & IAP',
          desc: 'Modélisation de monétisation et graphiques de rétention.',
          itemCost: 'Coût Moyen de l\'Objet ($)',
          conversion: 'Taux de Conversion (%)',
          traffic: 'Utilisateurs Actifs Quotidiens',
          simulate: '📊 Lancer la Simulation',
          injectBtn: 'Injecter le Code de Logique Économique'
        }
      }
    }
  };

  function gl() {
    return window.appLang || 'en';
  }

  function getTranslation(tool, key) {
    const lang = gl();
    return TX[lang] && TX[lang].tools[tool] && TX[lang].tools[tool][key]
      ? TX[lang].tools[tool][key]
      : (TX['en'].tools[tool] ? TX['en'].tools[tool][key] : key);
  }

  // Helper function to show notifications
  function showBannerToast(msg) {
    if (window.showToast) {
      window.showToast(msg);
    } else {
      console.log('[GDS ULTIMATE Toast]:', msg);
    }
  }

  window._injectGDSUltimateCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      showBannerToast(TX[lang].injected);
    }
  };

  // ─── Tab registration ──────────────────────────────────────────
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'gamedevstudioultimate') {
      window.activeTab = 'gamedevstudioultimate';
      document.querySelectorAll('.ltab').forEach(function(b) {
        b.classList.remove('active');
      });
      const btn = document.getElementById('tab-gamedevstudioultimate');
      if (btn) btn.classList.add('active');
      window.initGDSUltimate(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') {
      originalRenderTab(tab);
    }
  };

  // ─── Main Menu ──────────────────────────────────────────────────
  window.initGDSUltimate = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#040814; color:#f8fafc;">
        <!-- Title Badge -->
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border-radius:14px; padding:16px; border:1px solid rgba(16,185,129,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.4);">
          <span style="font-size:32px; filter:drop-shadow(0 0 8px #34d399);">🚀</span>
          <div>
            <h2 style="margin:0; color:#34d399; font-size:17px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(52,211,153,0.3);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <!-- Selection Grid -->
        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          <!-- 1. Blueprint Node Scripter -->
          <div onclick="window.handleGDSUltimateTool('blueprints')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(168, 85, 247, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#a855f7'; this.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.25)';" onmouseout="this.style.borderColor='rgba(168, 85, 247, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(168, 85, 247, 0.1); border-radius:10px; color:#a855f7;">🧠</div>
            <div style="flex:1;">
              <div style="color:#a855f7; font-weight:800; font-size:13px;">${getTranslation('blueprints', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('blueprints', 'desc')}</div>
            </div>
          </div>

          <!-- 2. Voxel 3D World Builder -->
          <div onclick="window.handleGDSUltimateTool('voxel3d')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(6, 182, 212, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#06b6d4'; this.style.boxShadow='0 0 15px rgba(6, 182, 212, 0.25)';" onmouseout="this.style.borderColor='rgba(6, 182, 212, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(6, 182, 212, 0.1); border-radius:10px; color:#06b6d4;">🧊</div>
            <div style="flex:1;">
              <div style="color:#06b6d4; font-weight:800; font-size:13px;">${getTranslation('voxel3d', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('voxel3d', 'desc')}</div>
            </div>
          </div>

          <!-- 3. Economy Simulator -->
          <div onclick="window.handleGDSUltimateTool('economy')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(245, 158, 11, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 15px rgba(245, 158, 11, 0.25)';" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(245, 158, 11, 0.1); border-radius:10px; color:#f59e0b;">🛍️</div>
            <div style="flex:1;">
              <div style="color:#f59e0b; font-weight:800; font-size:13px;">${getTranslation('economy', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('economy', 'desc')}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.handleGDSUltimateTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initGDSUltimate('${lang}')" style="background:rgba(255,255,255,0.08); color:#e2e8f0; border:1px solid rgba(255,255,255,0.15); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.12)';" onmouseout="this.style.background='rgba(255,255,255,0.08)';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'blueprints') renderBlueprints(el, backBtn, lang);
    else if (toolId === 'voxel3d') renderVoxel3D(el, backBtn, lang);
    else if (toolId === 'economy') renderEconomy(el, backBtn, lang);
  };

  // ═══════════════════════════════════════════
  // 🧠 1. NODE-BASED VISUAL SCRIPTER
  // ═══════════════════════════════════════════
  let blueprintNodes = [
    { id: 1, type: 'event', label: 'On Game Start', x: 20, y: 30 },
    { id: 2, type: 'action', label: 'Spawn Player', x: 20, y: 100 }
  ];

  function renderBlueprints(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.blueprints;

    function buildNodeHTML() {
      return blueprintNodes.map((node, index) => {
        const color = node.type === 'event' ? '#ef4444' : '#3b82f6';
        const bg = node.type === 'event' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)';
        
        let connector = '';
        if (index < blueprintNodes.length - 1) {
          connector = `<div style="position:absolute; width:2px; height:20px; background:${color}; left:50%; bottom:-20px; transform:translateX(-50%);"></div>`;
        }

        return `
          <div style="position:relative; left:${node.x}px; margin-top:${index === 0 ? node.y : 20}px; background:${bg}; border:2px solid ${color}; border-radius:8px; padding:10px; width:160px; box-shadow:0 4px 15px rgba(0,0,0,0.5); font-size:11px; font-weight:800; color:#fff; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="background:${color}; width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
              ${node.label}
            </div>
            <button onclick="window._gdsDeleteBlueprintNode(${index})" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:12px;">✕</button>
            ${connector}
          </div>
        `;
      }).join('');
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#040814;">
        ${backBtn}
        <h3 style="color:#a855f7; margin:0 0 5px; font-size:15px; font-weight:800;">🧠 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Canvas Area -->
        <div id="bpCanvas" style="background:linear-gradient(90deg, #0f172a 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(180deg, #0f172a 1px, transparent 1px) 0 0 / 20px 20px; background-color:#020617; border:2px solid #a855f7; border-radius:12px; height:260px; overflow-y:auto; position:relative; margin-bottom:15px; box-shadow:inset 0 0 20px rgba(0,0,0,0.8);">
          <div id="bpNodesContainer" style="padding-bottom:20px;">
            ${buildNodeHTML()}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:15px;">
          <button id="btnEventNode" style="background:rgba(239, 68, 68, 0.15); border:1px solid #ef4444; color:#ef4444; padding:8px; border-radius:6px; font-size:10px; font-weight:800; cursor:pointer;">
            ${tx.addEvent}
          </button>
          <button id="btnActionNode" style="background:rgba(59, 130, 246, 0.15); border:1px solid #3b82f6; color:#3b82f6; padding:8px; border-radius:6px; font-size:10px; font-weight:800; cursor:pointer;">
            ${tx.addAction}
          </button>
        </div>

        <button id="btnInjectBP" style="width:100%; padding:11px; border-radius:8px; background:#a855f7; border:none; color:#fff; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(168, 85, 247, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    document.getElementById('btnEventNode').addEventListener('click', () => {
      const events = ['On Player Hit', 'On Item Pickup', 'On Timer End', 'On Key Press'];
      const r = events[Math.floor(Math.random() * events.length)];
      blueprintNodes.push({ id: Date.now(), type: 'event', label: r, x: 20, y: 0 });
      document.getElementById('bpNodesContainer').innerHTML = buildNodeHTML();
    });

    document.getElementById('btnActionNode').addEventListener('click', () => {
      const actions = ['Screen Shake', 'Play Sound', 'Add Score +10', 'Spawn Particles'];
      const r = actions[Math.floor(Math.random() * actions.length)];
      blueprintNodes.push({ id: Date.now(), type: 'action', label: r, x: 20, y: 0 });
      document.getElementById('bpNodesContainer').innerHTML = buildNodeHTML();
    });

    window._gdsDeleteBlueprintNode = function(idx) {
      blueprintNodes.splice(idx, 1);
      document.getElementById('bpNodesContainer').innerHTML = buildNodeHTML();
    };

    document.getElementById('btnInjectBP').addEventListener('click', () => {
      // Generate code reflecting the logic tree!
      let logicCode = '';
      blueprintNodes.forEach(n => {
        if (n.type === 'event') {
          logicCode += `\n// Event Triggered: ${n.label}\ndocument.addEventListener('${n.label.replace(/ /g, '').toLowerCase()}', function() {\n`;
        } else {
          logicCode += `  console.log('Action Executed: ${n.label}');\n  // TODO: Implement ${n.label}\n`;
        }
      });
      // Close all blocks for simplicity
      blueprintNodes.filter(n => n.type === 'event').forEach(() => logicCode += `});\n`);

      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Moteur de Scripts Visuels' : 'Visual Blueprint Engine'}</title>
  <style>
    body { background: #020617; color: #a855f7; font-family: monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; }
    .box { border: 2px solid #a855f7; padding: 20px; border-radius: 12px; background: #0f172a; text-align:center; box-shadow: 0 0 30px rgba(168, 85, 247, 0.3); }
    button { margin-top: 20px; background: #a855f7; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🧠 Visual Script Engine Active</h2>
    <p>Check console output for logic execution.</p>
    <button onclick="triggerLogic()">Trigger Sequence</button>
  </div>

  <script>
    console.log("Visual Script Engine Initialized.");
    ${logicCode}

    function triggerLogic() {
      // Fire the first event to trigger cascade
      console.log('--- Executing Visual Sequence ---');
      ${blueprintNodes.filter(n => n.type === 'action').map(n => `console.log('Action Executed: ${n.label}');`).join('\n      ')}
    }
  </script>
</body>
</html>`;
      window._injectGDSUltimateCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🧊 2. VOXEL WORLD BUILDER
  // ═══════════════════════════════════════════
  let voxelGrid = {}; // key: "x_y_z", val: color
  let vColor = '#3b82f6';
  const V_SIZE = 5; 

  function renderVoxel3D(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.voxel3d;

    // Initialize floor if empty
    if (Object.keys(voxelGrid).length === 0) {
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          voxelGrid[`${x}_${y}_0`] = '#10b981'; // green floor
        }
      }
    }

    function drawVoxels() {
      const container = document.getElementById('isometricContainer');
      if (!container) return;
      container.innerHTML = '';

      // Sort by Z index to draw back-to-front
      const keys = Object.keys(voxelGrid).sort((a,b) => {
        const [ax, ay, az] = a.split('_').map(Number);
        const [bx, by, bz] = b.split('_').map(Number);
        return (ax + ay + az) - (bx + by + bz);
      });

      keys.forEach(k => {
        const [x, y, z] = k.split('_').map(Number);
        const color = voxelGrid[k];
        
        // Isometric Math
        const isoX = (x - y) * 16;
        const isoY = (x + y) * 8 - (z * 16);

        const cube = document.createElement('div');
        cube.style.position = 'absolute';
        cube.style.left = `calc(50% + ${isoX}px)`;
        cube.style.top = `calc(50% + ${isoY}px)`;
        cube.style.width = '32px';
        cube.style.height = '32px';

        cube.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 32 32">
            <!-- Top Face -->
            <polygon points="16,0 32,8 16,16 0,8" fill="${color}" opacity="0.9" stroke="rgba(0,0,0,0.2)"/>
            <!-- Left Face -->
            <polygon points="0,8 16,16 16,32 0,24" fill="${color}" opacity="0.7" stroke="rgba(0,0,0,0.2)"/>
            <!-- Right Face -->
            <polygon points="16,16 32,8 32,24 16,32" fill="${color}" opacity="0.5" stroke="rgba(0,0,0,0.2)"/>
          </svg>
        `;
        container.appendChild(cube);
      });
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#040814;">
        ${backBtn}
        <h3 style="color:#06b6d4; margin:0 0 5px; font-size:15px; font-weight:800;">🧊 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- CSS Isometric Canvas -->
        <div style="background:#020617; border:2px solid #06b6d4; border-radius:12px; height:220px; position:relative; overflow:hidden; margin-bottom:15px; display:flex; justify-content:center; align-items:center; box-shadow:inset 0 0 30px rgba(0,0,0,0.8);">
          <div id="isometricContainer" style="position:relative; width:100%; height:100%;"></div>
        </div>

        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(6,182,212,0.25); border-radius:10px; padding:12px; margin-bottom:15px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <label style="font-size:10px; color:#94a3b8; font-weight:800;">${tx.color}</label>
            <input type="color" id="voxColor" value="#3b82f6" style="background:none; border:none; cursor:pointer;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button id="btnAddVoxel" style="background:rgba(6, 182, 212, 0.15); border:1px solid #06b6d4; color:#06b6d4; padding:8px; border-radius:6px; font-size:10px; font-weight:800; cursor:pointer;">
              ${tx.addCube}
            </button>
            <button id="btnClearVoxels" style="background:rgba(239, 68, 68, 0.15); border:1px solid #ef4444; color:#ef4444; padding:8px; border-radius:6px; font-size:10px; font-weight:800; cursor:pointer;">
              ${tx.removeCube}
            </button>
          </div>
        </div>

        <button id="btnInjectVoxel" style="width:100%; padding:11px; border-radius:8px; background:#06b6d4; border:none; color:#040814; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(6, 182, 212, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Draw initially
    setTimeout(drawVoxels, 10);

    let nextZ = 1;
    document.getElementById('voxColor').addEventListener('input', (e) => vColor = e.target.value);
    
    document.getElementById('btnAddVoxel').addEventListener('click', () => {
      // Just stack random voxels for visualization
      const rx = Math.floor(Math.random() * 5) - 2;
      const ry = Math.floor(Math.random() * 5) - 2;
      voxelGrid[`${rx}_${ry}_${nextZ}`] = vColor;
      nextZ++;
      if (nextZ > 4) nextZ = 1; // reset height
      drawVoxels();
    });

    document.getElementById('btnClearVoxels').addEventListener('click', () => {
      voxelGrid = {};
      nextZ = 1;
      drawVoxels();
    });

    document.getElementById('btnInjectVoxel').addEventListener('click', () => {
      // We will inject a pure Three.js Voxel environment since we are making pro code!
      const voxelDataJson = JSON.stringify(voxelGrid);
      
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Moteur 3D Voxel' : '3D Voxel Engine'}</title>
  <style>
    body { margin: 0; padding: 0; background: #000; overflow: hidden; font-family:sans-serif;}
    #info { position: absolute; top: 10px; left: 10px; color: #06b6d4; font-weight: bold; background:rgba(0,0,0,0.5); padding:10px; border-radius:8px; }
  </style>
</head>
<body>
  <div id="info">🧊 Voxel 3D Engine (Three.js)<br><span style="font-size:12px;color:#fff;">Drag to Rotate</span></div>
  <!-- Loading Three.js via CDN for sandboxed execution -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  
  <script>
    const voxels = ${voxelDataJson};
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edgesGeo = new THREE.EdgesGeometry(geometry);

    // Build the grid
    Object.keys(voxels).forEach(key => {
      const [x, y, z] = key.split('_').map(Number);
      const color = voxels[key];
      
      const material = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, z, y); // z is up in ThreeJS usually but here we map it to Y
      scene.add(cube);

      // Add cool edges
      const edgeLines = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({ color: 0x000000, transparent:true, opacity:0.2 }));
      cube.add(edgeLines);
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>`;
      window._injectGDSUltimateCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🛍️ 3. ECONOMY & IAP SIMULATOR
  // ═══════════════════════════════════════════
  function renderEconomy(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.economy;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#040814;">
        ${backBtn}
        <h3 style="color:#f59e0b; margin:0 0 5px; font-size:15px; font-weight:800;">🛍️ ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <div style="background:#020617; border:2px solid #f59e0b; border-radius:12px; padding:15px; margin-bottom:15px; box-shadow:0 0 20px rgba(245,158,11,0.2);">
          
          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.itemCost}</span>
              <span id="lblItemCost" style="color:#f59e0b; font-weight:800;">$4.99</span>
            </div>
            <input type="range" id="simItemCost" min="0.99" max="49.99" step="1" value="4.99" style="width:100%; accent-color:#f59e0b;" />
          </div>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.conversion}</span>
              <span id="lblConversion" style="color:#f59e0b; font-weight:800;">2%</span>
            </div>
            <input type="range" id="simConversion" min="0.1" max="10" step="0.1" value="2" style="width:100%; accent-color:#f59e0b;" />
          </div>

          <div style="margin-bottom:15px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.traffic} (DAU)</span>
              <span id="lblTraffic" style="color:#f59e0b; font-weight:800;">5,000</span>
            </div>
            <input type="range" id="simTraffic" min="100" max="100000" step="100" value="5000" style="width:100%; accent-color:#f59e0b;" />
          </div>

          <div style="background:rgba(245, 158, 11, 0.1); border:1px solid rgba(245, 158, 11, 0.3); border-radius:8px; padding:12px; text-align:center;">
            <div style="font-size:10px; color:#94a3b8; text-transform:uppercase;">${fr ? 'Revenu Mensuel Estimé' : 'Est. Monthly Revenue'}</div>
            <div id="estRevenue" style="font-size:24px; font-weight:900; color:#10b981; margin-top:4px;">$14,970</div>
          </div>
        </div>

        <button id="btnInjectEconomy" style="width:100%; padding:11px; border-radius:8px; background:#f59e0b; border:none; color:#040814; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(245, 158, 11, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const sCost = document.getElementById('simItemCost');
    const sConv = document.getElementById('simConversion');
    const sTraf = document.getElementById('simTraffic');
    const rCost = document.getElementById('lblItemCost');
    const rConv = document.getElementById('lblConversion');
    const rTraf = document.getElementById('lblTraffic');
    const revOut = document.getElementById('estRevenue');

    function calcRev() {
      const c = parseFloat(sCost.value);
      const cv = parseFloat(sConv.value) / 100;
      const t = parseInt(sTraf.value);
      
      rCost.innerText = '$' + c;
      rConv.innerText = sConv.value + '%';
      rTraf.innerText = t.toLocaleString();

      const monthlyBuyers = t * 30 * cv;
      const revenue = Math.floor(monthlyBuyers * c);
      revOut.innerText = '$' + revenue.toLocaleString();
    }

    sCost.addEventListener('input', calcRev);
    sConv.addEventListener('input', calcRev);
    sTraf.addEventListener('input', calcRev);

    document.getElementById('btnInjectEconomy').addEventListener('click', () => {
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Moteur Économique IAP' : 'IAP Economy Engine'}</title>
  <style>
    body { background: #0f172a; color: #fff; font-family: sans-serif; padding: 40px; }
    .card { background: #1e293b; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 10px 30px rgba(245,158,11,0.2); }
    .btn { background: #f59e0b; color: #000; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; width: 100%; font-size: 16px; }
    .log { background: #020617; padding: 10px; font-family: monospace; border-radius: 8px; margin-top: 20px; height: 150px; overflow-y: auto; color: #34d399; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color:#f59e0b; margin-top:0;">💎 Loot Box Store</h2>
    <p>Simulate an In-App Purchase logic transaction.</p>
    <button class="btn" onclick="buyItem()">Buy Epic Chest ($${sCost.value})</button>
    <div class="log" id="storeLog">Store initialized...</div>
  </div>

  <script>
    class StoreSystem {
      constructor() {
        this.revenue = 0;
        this.logEl = document.getElementById('storeLog');
      }
      log(msg) {
        this.logEl.innerHTML += '<div>> ' + msg + '</div>';
        this.logEl.scrollTop = this.logEl.scrollHeight;
      }
      purchase(itemName, price) {
        this.log('Processing transaction for ' + itemName + '...');
        setTimeout(() => {
          this.revenue += price;
          this.log('✅ Purchase successful! Revenue: $' + this.revenue.toFixed(2));
          
          // Random loot drop logic
          const items = ['Gold Sword', 'Health Potion', 'Magic Shield', 'Trash'];
          const drop = items[Math.floor(Math.random() * items.length)];
          this.log('🎁 Unlocked: <span style="color:#f59e0b;">' + drop + '</span>');
        }, 800);
      }
    }
    const myStore = new StoreSystem();
    function buyItem() {
      myStore.purchase("Epic Chest", ${sCost.value});
    }
  </script>
</body>
</html>`;
      window._injectGDSUltimateCode(codeToInject);
    });
  }

  // Hook localization switcher for GDS Ultimate
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') {
      originalApplyLang();
    }
    const currentLang = gl();
    
    // Update button text in the sidebar if available
    const sideLbl = document.getElementById('lbl-tab-gamedevstudioultimate');
    if (sideLbl) {
      sideLbl.textContent = currentLang === 'fr' ? 'Game Dev Ultimate' : 'Game Dev Ultimate';
    }

    if (window.activeTab === 'gamedevstudioultimate') {
      window.initGDSUltimate(currentLang);
    }
  };

  console.log('🚀 Game Dev Studio ULTIMATE loaded successfully!');
})();
