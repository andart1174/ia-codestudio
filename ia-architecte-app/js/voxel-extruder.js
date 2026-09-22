(function() {
  'use strict';

  const T = {
    en: {
      title: "🎴 Voxel 3D Asset Forge",
      desc: "Draw 2D pixel art and see it extruded instantly into a rotating 3D voxel model.",
      palette: "Colors",
      eraser: "Eraser",
      clear: "Clear Grid",
      depth: "Extrusion Depth",
      autoRotate: "Auto-Rotate",
      presets: "Asset Templates",
      injectThree: "💉 Inject Three.js Voxel Mesh",
      injectCanvas: "🧬 Inject Pure Canvas 3D Engine",
      presCoin: "🪙 Gold Coin",
      presSword: "🗡️ Retro Sword",
      presMonster: "👾 Alien Sprite",
      presHeart: "💖 Pixel Heart",
      toastInjected: "Voxel 3D asset code injected successfully!"
    },
    fr: {
      title: "🎴 Forge Voxel 3D",
      desc: "Dessinez en pixel art 2D et voyez-le extrudé instantanément en modèle voxel 3D rotatif.",
      palette: "Couleurs",
      eraser: "Gomme",
      clear: "Effacer la Grille",
      depth: "Épaisseur Voxel",
      autoRotate: "Auto-Rotation",
      presets: "Gabarits d'Assets",
      injectThree: "💉 Injecter le Code Three.js",
      injectCanvas: "🧬 Injecter le Canvas 3D Pur",
      presCoin: "🪙 Pièce d'Or",
      presSword: "🗡️ Épée Rétro",
      presMonster: "👾 Monstre Alien",
      presHeart: "💖 Cœur Pixel",
      toastInjected: "Code de l'asset voxel 3D injecté !"
    }
  };

  function gl() {
    return window.lang || window.appLang || 'en';
  }

  function t(key) {
    const lang = gl();
    return T[lang] && T[lang][key] ? T[lang][key] : (T['en'][key] || key);
  }

  // Grid State (16x16)
  const grid = Array(256).fill(null);
  let activeColor = '#f59e0b'; // Gold default
  let isDrawing = false;
  let voxelDepth = 4;
  let yaw = -0.5;
  let pitch = 0.4;
  let autoRotate = true;
  let animFrameId = null;

  // Preset Colors & Data
  const PALETTE = [
    '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', 
    '#3b82f6', '#6366f1', '#a78bfa', '#cbd5e1', '#0f172a'
  ];

  const PRESETS = {
    heart: {
      grid: [
        "0000000000000000",
        "0011000000001100",
        "0111100000011110",
        "0111110000111110",
        "0111111001111110",
        "0011111111111100",
        "0001111111111000",
        "0000111111110000",
        "0000011111100000",
        "0000001111000000",
        "0000000110000000",
        "0000000000000000"
      ],
      colors: { "1": "#ef4444" }
    },
    coin: {
      grid: [
        "0000001111000000",
        "0000111111110000",
        "0001111111111000",
        "0011112222111100",
        "0011122222211100",
        "0111122112211110",
        "0111122111111110",
        "0111122112211110",
        "0011122222211100",
        "0011112222111100",
        "0001111111111000",
        "0000111111110000",
        "0000001111000000"
      ],
      colors: { "1": "#d97706", "2": "#f59e0b" }
    },
    sword: {
      grid: [
        "0000000000000010",
        "0000000000000110",
        "0000000000001100",
        "0000000000011000",
        "0000000000110000",
        "0000000001100000",
        "0000000011000000",
        "0000000110000000",
        "0000001100000000",
        "0000011000000000",
        "0000310000000000",
        "0003300000000000",
        "0044000000000000",
        "0440000000000000",
        "4000000000000000"
      ],
      colors: { "1": "#cbd5e1", "2": "#64748b", "3": "#b45309", "4": "#eab308" }
    },
    monster: {
      grid: [
        "0001000000001000",
        "0000100110010000",
        "0001111111111000",
        "0011011111011000",
        "0111111111111100",
        "0101111111110100",
        "0101000000010100",
        "0000110001100000"
      ],
      colors: { "1": "#10b981" }
    }
  };

  function loadPreset(name) {
    grid.fill(null);
    const p = PRESETS[name];
    if (!p) return;
    const startRow = Math.floor((16 - p.grid.length) / 2);
    p.grid.forEach((rowStr, rIdx) => {
      const actualRow = startRow + rIdx;
      for (let c = 0; c < 16; c++) {
        const char = rowStr[c];
        if (char !== '0') {
          grid[actualRow * 16 + c] = p.colors[char] || p.color || '#ef4444';
        }
      }
    });
    updateGridUI();
  }

  function updateGridUI() {
    for (let i = 0; i < 256; i++) {
      const cell = document.getElementById(`vx-cell-${i}`);
      if (cell) {
        cell.style.background = grid[i] || 'transparent';
      }
    }
  }

  // --- Voxel 3D Math Engine ---
  // Cube definitions relative to center
  const CUBE_VERTICES = [
    {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
    {x: -1, y: -1, z: 1},  {x: 1, y: -1, z: 1},  {x: 1, y: 1, z: 1},  {x: -1, y: 1, z: 1}
  ];

  const CUBE_FACES = [
    { indices: [0, 1, 2, 3], normal: {x: 0, y: 0, z: -1}, light: 0.8 }, // Front
    { indices: [1, 5, 6, 2], normal: {x: 1, y: 0, z: 0},  light: 0.65 }, // Right
    { indices: [4, 0, 3, 7], normal: {x: -1, y: 0, z: 0},  light: 0.65 }, // Left
    { indices: [3, 2, 6, 7], normal: {x: 0, y: 1, z: 0},  light: 1.0 }, // Top
    { indices: [1, 0, 4, 5], normal: {x: 0, y: -1, z: 0}, light: 0.5 }, // Bottom
    { indices: [5, 4, 7, 6], normal: {x: 0, y: 0, z: 1},  light: 0.8 }  // Back
  ];

  function getShadedColor(hex, factor) {
    // Convert hex to rgb, apply factor, return hex
    let r = parseInt(hex.slice(1,3), 16);
    let g = parseInt(hex.slice(3,5), 16);
    let b = parseInt(hex.slice(5,7), 16);
    r = Math.min(255, Math.max(0, Math.round(r * factor)));
    g = Math.min(255, Math.max(0, Math.round(g * factor)));
    b = Math.min(255, Math.max(0, Math.round(b * factor)));
    return `rgb(${r},${g},${b})`;
  }

  function start3DRenderer() {
    const canvas = document.getElementById('voxel-3d-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      if (autoRotate) {
        yaw += 0.015;
      }

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      // Collect all cubes
      const cubes = [];
      const scale = 7.5; // Visual cube scale

      for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 16; c++) {
          const color = grid[r * 16 + c];
          if (color) {
            // Coordinate mapping (Z coordinate represents layers)
            const cx = c - 8;
            const cy = 8 - r;

            for (let zIdx = 0; zIdx < voxelDepth; zIdx++) {
              const cz = zIdx - voxelDepth / 2;

              // Rotate center coordinates
              const x1 = cx * cosY - cz * sinY;
              const z1 = cx * sinY + cz * cosY;
              const y2 = cy * cosX - z1 * sinX;
              const z2 = cy * sinX + z1 * cosX;

              cubes.push({
                cx: cx, cy: cy, cz: cz,
                rx: x1, ry: y2, rz: z2,
                color: color
              });
            }
          }
        }
      }

      // Sort cubes from back to front (Painters Algorithm)
      cubes.sort((a, b) => b.rz - a.rz);

      // Draw cubes
      cubes.forEach(cube => {
        // Draw individual cube faces
        CUBE_FACES.forEach(face => {
          // Check normal visibility in rotated space
          // Face normal in local space
          const n = face.normal;
          // Rotate normal Y
          const nx1 = n.x * cosY - n.z * sinY;
          const nz1 = n.x * sinY + n.z * cosY;
          // Rotate normal X
          const ny2 = n.y * cosX - nz1 * sinX;
          const nz2 = n.y * sinX + nz1 * cosX;

          // If face points towards screen (nz2 < 0 because of perspective/Z coordinate)
          if (nz2 < 0) {
            // Draw face polygon
            ctx.beginPath();
            face.indices.forEach((vIdx, i) => {
              const v = CUBE_VERTICES[vIdx];
              // Offset vertex from center, rotate, project
              const vx = cube.cx + v.x * 0.45; // size adjustment
              const vy = cube.cy + v.y * 0.45;
              const vz = cube.cz + v.z * 0.45;

              // Apply 3D rotation to vertex
              const rx1 = vx * cosY - vz * sinY;
              const rz1 = vx * sinY + vz * cosY;
              const ry2 = vy * cosX - rz1 * sinX;

              const screenX = w/2 + rx1 * scale;
              const screenY = h/2 - ry2 * scale;

              if (i === 0) ctx.moveTo(screenX, screenY);
              else ctx.lineTo(screenX, screenY);
            });
            ctx.closePath();
            ctx.fillStyle = getShadedColor(cube.color, face.light);
            ctx.fill();
            // Tiny stroke to prevent wire gap glitches
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  // --- Monaco Injection Code Generation ---
  function getVoxelDataJSON() {
    const list = [];
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const color = grid[r * 16 + c];
        if (color) {
          list.push({x: c - 8, y: 8 - r, color: color});
        }
      }
    }
    return JSON.stringify(list);
  }

  function injectThreeJs() {
    const data = getVoxelDataJSON();
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Three.js Voxel Render · IA Architecte</title>
  <style>
    body { margin: 0; background: #0b0f19; overflow: hidden; }
    #canvas-container { width: 100vw; height: 100vh; }
  </style>
  <!-- Load Three.js dynamically -->
  <script src="https://unpkg.com/three@0.128.0/build/three.min.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <script>
    const voxelData = ${data};
    const depth = ${voxelDepth};

    // 1. Scene, Camera, Renderer Setup
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f19);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 35);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 3. Construct Voxel Mesh
    const voxelGroup = new THREE.Group();
    const boxGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

    voxelData.forEach(v => {
      const material = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(v.color),
        roughness: 0.4,
        metalness: 0.1
      });

      // Extrude layers
      for (let z = 0; z < depth; z++) {
        const mesh = new THREE.Mesh(boxGeometry, material);
        mesh.position.set(v.x, v.y, z - depth / 2);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        voxelGroup.add(mesh);
      }
    });

    scene.add(voxelGroup);

    // Add visual grid plane
    const gridHelper = new THREE.GridHelper(30, 30, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // 4. Animation loop
    function animate() {
      requestAnimationFrame(animate);
      voxelGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>`;
    
    if (window.editor) {
      window.editor.setValue(code);
      window.editor.pushUndoStop();
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(t('toastInjected'));
    }
  }

  function injectCanvas3D() {
    const data = getVoxelDataJSON();
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Canvas Voxel Engine · IA Architecte</title>
  <style>
    body { margin: 0; background: #070a13; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; font-family: sans-serif; }
    canvas { background: #0b0f19; border: 2px solid #3b82f6; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); max-width: 100%; aspect-ratio: 1; }
  </style>
</head>
<body>
  <canvas id="view" width="500" height="500"></canvas>
  <script>
    const canvas = document.getElementById('view');
    const ctx = canvas.getContext('2d');
    const voxelData = ${data};
    const depth = ${voxelDepth};

    let angle = 0;
    const CUBE_VERTICES = [
      {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
      {x: -1, y: -1, z: 1},  {x: 1, y: -1, z: 1},  {x: 1, y: 1, z: 1},  {x: -1, y: 1, z: 1}
    ];
    const CUBE_FACES = [
      { indices: [0, 1, 2, 3], normal: {x: 0, y: 0, z: -1}, light: 0.8 },
      { indices: [1, 5, 6, 2], normal: {x: 1, y: 0, z: 0},  light: 0.65 },
      { indices: [4, 0, 3, 7], normal: {x: -1, y: 0, z: 0},  light: 0.65 },
      { indices: [3, 2, 6, 7], normal: {x: 0, y: 1, z: 0},  light: 1.0 },
      { indices: [1, 0, 4, 5], normal: {x: 0, y: -1, z: 0}, light: 0.5 },
      { indices: [5, 4, 7, 6], normal: {x: 0, y: 0, z: 1},  light: 0.8 }
    ];

    function getShadedColor(hex, factor) {
      let r = parseInt(hex.slice(1,3), 16);
      let g = parseInt(hex.slice(3,5), 16);
      let b = parseInt(hex.slice(5,7), 16);
      return 'rgb(' + Math.round(r*factor) + ',' + Math.round(g*factor) + ',' + Math.round(b*factor) + ')';
    }

    function render() {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      angle += 0.015;
      const cosY = Math.cos(angle), sinY = Math.sin(angle);
      const cosX = Math.cos(0.4), sinX = Math.sin(0.4);

      const cubes = [];
      const scale = 16.0;

      voxelData.forEach(v => {
        for (let z = 0; z < depth; z++) {
          const cz = z - depth / 2;
          const x1 = v.x * cosY - cz * sinY;
          const z1 = v.x * sinY + cz * cosY;
          const y2 = v.y * cosX - z1 * sinX;
          const z2 = v.y * sinX + z1 * cosX;
          cubes.push({ cx: v.x, cy: v.y, cz: cz, rx: x1, ry: y2, rz: z2, color: v.color });
        }
      });

      cubes.sort((a, b) => b.rz - a.rz);

      cubes.forEach(cube => {
        CUBE_FACES.forEach(face => {
          const n = face.normal;
          const nx1 = n.x * cosY - n.z * sinY;
          const nz1 = n.x * sinY + n.z * cosY;
          const ny2 = n.y * cosX - nz1 * sinX;
          const nz2 = n.y * sinX + nz1 * cosX;

          if (nz2 < 0) {
            ctx.beginPath();
            face.indices.forEach((vIdx, i) => {
              const v = CUBE_VERTICES[vIdx];
              const vx = cube.cx + v.x * 0.45;
              const vy = cube.cy + v.y * 0.45;
              const vz = cube.cz + v.z * 0.45;
              const rx1 = vx * cosY - vz * sinY;
              const rz1 = vx * sinY + vz * cosY;
              const ry2 = vy * cosX - rz1 * sinX;
              const screenX = w/2 + rx1 * scale;
              const screenY = h/2 - ry2 * scale;
              if (i === 0) ctx.moveTo(screenX, screenY);
              else ctx.lineTo(screenX, screenY);
            });
            ctx.closePath();
            ctx.fillStyle = getShadedColor(cube.color, face.light);
            ctx.fill();
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(render);
    }
    render();
  </script>
</body>
</html>`;

    if (window.editor) {
      window.editor.setValue(code);
      window.editor.pushUndoStop();
      if (window.runPreview) window.runPreview();
      if (window.showToast) window.showToast(t('toastInjected'));
    }
  }

  // Render UI
  window.renderVoxelExtruder = function(container) {
    if (!container) return;

    container.innerHTML = `
      <style>
        .vx-container {
          padding: 10px 4px;
          font-family: 'Inter', sans-serif;
          color: #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .vx-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          height: auto;
          box-sizing: border-box;
        }
        .vx-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
        .vx-btn.blue {
          background: rgba(59, 130, 246, 0.07);
          border-color: rgba(59, 130, 246, 0.28);
          color: #38bdf8;
        }
        .vx-btn.blue:hover {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.4);
          color: #fff;
        }
        .vx-btn.green {
          background: rgba(16, 185, 129, 0.07);
          border-color: rgba(16, 185, 129, 0.28);
          color: #34d399;
        }
        .vx-btn.green:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.4);
          color: #fff;
        }
        .vx-btn.red {
          background: rgba(239, 68, 68, 0.07);
          border-color: rgba(239, 68, 68, 0.28);
          color: #f87171;
        }
        .vx-btn.red:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.4);
          color: #fff;
        }
        .vx-preset-btn-custom {
          padding: 6px 4px;
          font-size: 10px;
          font-weight: 700;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.03);
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .vx-preset-btn-custom:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.10);
          color: #fff;
        }
        #left-body {
          overflow-y: auto !important;
        }
        #left-body::-webkit-scrollbar {
          width: 6px !important;
        }
        #left-body::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3) !important;
          border-radius: 3px !important;
        }
        #left-body::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5) !important;
        }
      </style>

      <div class="vx-container">
        <div>
          <h2 style="font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #f59e0b, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px 0; display: flex; align-items: center; gap: 10px;">
            ${t('title')}
          </h2>
          <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; margin: 0;">
            ${t('desc')}
          </p>
        </div>

        <!-- 3D Voxel Canvas Visualizer -->
        <div style="background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; overflow: hidden; padding: 6px; display: flex; flex-direction: column;">
          <canvas id="voxel-3d-canvas" width="340" height="150" style="width: 100%; height: auto; aspect-ratio: 340 / 150; display: block; border-radius: 8px;"></canvas>
        </div>

        <!-- Palette & Controls -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Palette Swatches -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b;">
              🎨 ${t('palette')}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
              ${PALETTE.map(c => `
                <button class="vx-color-swatch" data-color="${c}" style="width: 22px; height: 22px; border-radius: 6px; background: ${c}; border: 1px solid ${c === activeColor ? '#fff' : 'rgba(255,255,255,0.1)'}; cursor: pointer; transition: transform 0.1s;"></button>
              `).join('')}
              <button id="vx-eraser" class="vx-preset-btn-custom" style="padding: 2px 8px; font-size: 9px; font-weight: 800; border-radius: 6px; height: 22px; line-height: 18px; margin: 0;">
                🧹 ${t('eraser')}
              </button>
            </div>
          </div>

          <!-- Depth Slider -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
              <span>${t('depth')}</span>
              <span id="vx-depth-val" style="color: #f59e0b;">${voxelDepth}</span>
            </div>
            <input type="range" id="vx-depth" min="1" max="12" value="${voxelDepth}" style="width: 100%; accent-color: #f59e0b;" />
          </div>

          <!-- Settings Toggle -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; font-weight: 700; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.05);">
            <span>${t('autoRotate')}</span>
            <input type="checkbox" id="vx-rotate-toggle" ${autoRotate ? 'checked' : ''} style="width: 14px; height: 14px; accent-color: #f59e0b; cursor: pointer;" />
          </div>
        </div>

        <!-- 2D Drawing Grid -->
        <div style="background: rgba(0, 0, 0, 0.15); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 10px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <!-- Grid wrapper -->
          <div id="voxel-draw-grid" style="display: grid; grid-template-columns: repeat(16, 1fr); gap: 1px; width: 100%; max-width: 220px; aspect-ratio: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden; cursor: crosshair; user-select: none;">
            ${Array(256).fill(null).map((_, i) => `
              <div id="vx-cell-${i}" data-index="${i}" style="background: transparent; border-right: 1px solid rgba(255,255,255,0.01); border-bottom: 1px solid rgba(255,255,255,0.01); transition: background 0.05s;"></div>
            `).join('')}
          </div>
          
          <button id="vx-clear-btn" class="vx-btn red" style="font-size: 10px; padding: 6px;">
            🗑️ ${t('clear')}
          </button>
        </div>

        <!-- 👾 Presets Section -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b;">
            👾 ${t('presets')}
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <button class="vx-preset-btn vx-preset-btn-custom" data-preset="coin">${t('presCoin')}</button>
            <button class="vx-preset-btn vx-preset-btn-custom" data-preset="sword">${t('presSword')}</button>
            <button class="vx-preset-btn vx-preset-btn-custom" data-preset="monster">${t('presMonster')}</button>
            <button class="vx-preset-btn vx-preset-btn-custom" data-preset="heart">${t('presHeart')}</button>
          </div>
        </div>

        <!-- 💉 Monaco Injection Buttons -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button id="vx-inject-three" class="vx-btn blue" style="padding: 12px; font-size: 11px;">
            ${t('injectThree')}
          </button>
          <button id="vx-inject-canvas" class="vx-btn green" style="padding: 12px; font-size: 11px;">
            ${t('injectCanvas')}
          </button>
        </div>
      </div>
    `;

    // Hook Color Selection
    container.querySelectorAll('.vx-color-swatch').forEach(sw => {
      sw.onclick = function() {
        activeColor = this.getAttribute('data-color');
        container.querySelectorAll('.vx-color-swatch').forEach(s => {
          s.style.border = `1px solid rgba(255,255,255,0.1)`;
        });
        document.getElementById('vx-eraser').style.borderColor = 'rgba(255,255,255,0.05)';
        document.getElementById('vx-eraser').style.background = 'rgba(255,255,255,0.03)';
        this.style.border = '1px solid #fff';
      };
    });

    document.getElementById('vx-eraser').onclick = function() {
      activeColor = null;
      container.querySelectorAll('.vx-color-swatch').forEach(s => {
        s.style.border = `1px solid rgba(255,255,255,0.1)`;
      });
      this.style.borderColor = '#3b82f6';
      this.style.background = 'rgba(59, 130, 246, 0.15)';
    };

    // Hook Draw Actions (Click-and-Drag Painting)
    const gridDiv = document.getElementById('voxel-draw-grid');
    const paintCell = (cell) => {
      const idx = parseInt(cell.getAttribute('data-index'));
      grid[idx] = activeColor;
      cell.style.background = activeColor || 'transparent';
    };

    gridDiv.onmousedown = function(e) {
      if (e.target.id.startsWith('vx-cell-')) {
        isDrawing = true;
        paintCell(e.target);
      }
    };
    gridDiv.onmouseover = function(e) {
      if (isDrawing && e.target.id.startsWith('vx-cell-')) {
        paintCell(e.target);
      }
    };
    window.onmouseup = function() {
      isDrawing = false;
    };

    // Hook sliders & buttons
    document.getElementById('vx-depth').oninput = function(e) {
      voxelDepth = parseInt(e.target.value);
      document.getElementById('vx-depth-val').textContent = voxelDepth;
    };

    document.getElementById('vx-rotate-toggle').onchange = function(e) {
      autoRotate = e.target.checked;
    };

    document.getElementById('vx-clear-btn').onclick = function() {
      grid.fill(null);
      updateGridUI();
    };

    // Hook Presets
    container.querySelectorAll('.vx-preset-btn').forEach(btn => {
      btn.onclick = function() {
        const presName = this.getAttribute('data-preset');
        loadPreset(presName);
      };
    });

    // Injections
    document.getElementById('vx-inject-three').onclick = injectThreeJs;
    document.getElementById('vx-inject-canvas').onclick = injectCanvas3D;

    // Start 3D Voxel Canvas Loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    setTimeout(start3DRenderer, 100);

    // Initial load Coin
    loadPreset('coin');
  };

  // Tab Decorator
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'voxelextruder') {
      window.renderVoxelExtruder(document.getElementById('left-body'));
    } else {
      if (originalRenderTab) originalRenderTab(tab);
    }
  };

})();
