/**
 * Studio 3D/4D Pro — Live 2D to 3D Composer (Ultimate Edition)
 */
'use strict';

const SketchExtruder = (() => {
  let container = null;
  let canvas = null, ctx = null;
  let isDrawing = false, currentPoints = [];
  let canvasWidth = 0, canvasHeight = 0;
  
  let models = [];
  let activeModelId = null;
  let modelCount = 0;
  let currentMode = '3d'; // '3d' or 'draw'
  let currentEnv = 'studio';
  let customMediaDataUrl = '';
  let customMediaType = ''; // 'image' or 'video'

  // Three.js variables
  let scene, camera, renderer, controls, transformControl, globalGroup, bgGroup = null;
  let mainPane;
  let loadedFont = null;
  let currentLang = 'fr';
  let currentBgEffect = 'none';
  let mainAmbientLight, mainHemiLight, mainDirLight;
  let cuParallaxX = 0, cuParallaxY = 0;
  let targetCuParallaxX = 0, targetCuParallaxY = 0;
  window._cuGlowIntensity = 1.0;
  window._clockBatteryLevel = 1.0;
  if (navigator.getBattery) {
      try {
          navigator.getBattery().then(battery => {
              window._clockBatteryLevel = battery.level;
              battery.addEventListener('levelchange', () => {
                  window._clockBatteryLevel = battery.level;
              });
          }).catch(err => {
              console.warn("Battery status API promise rejected:", err);
          });
      } catch (err) {
          console.warn("Battery status API access error:", err);
      }
  }

  function getConvexHull(points) {
      if (points.length <= 3) return points.slice();
      points.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y);
      const lower = [];
      for (let i = 0; i < points.length; i++) {
          while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
              lower.pop();
          }
          lower.push(points[i]);
      }
      const upper = [];
      for (let i = points.length - 1; i >= 0; i--) {
          while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
              upper.pop();
          }
          upper.push(points[i]);
      }
      upper.pop();
      lower.pop();
      return lower.concat(upper);
  }
  function crossProduct(o, a, b) {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }
  function getRayHullIntersection(angle, hull) {
      const rx = Math.sin(angle);
      const ry = Math.cos(angle);
      let closestIntersect = null;
      for (let k = 0; k < hull.length; k++) {
          const p1 = hull[k];
          const p2 = hull[(k + 1) % hull.length];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const denom = rx * dy - ry * dx;
          if (Math.abs(denom) < 0.0001) continue;
          const t = (p1.x * dy - p1.y * dx) / denom;
          if (t <= 0) continue;
          let u;
          if (Math.abs(dx) > 0.0001) {
              u = (t * rx - p1.x) / dx;
          } else {
              u = (t * ry - p1.y) / dy;
          }
          if (u >= 0 && u <= 1.0001) {
              if (closestIntersect === null || t < closestIntersect.t) {
                  closestIntersect = { x: t * rx, y: t * ry, t: t, edgeNormal: { x: -dy, y: dx } };
              }
          }
      }
      return closestIntersect;
  }

  function getSilhouetteContour(alphaGrid, w, h) {
      let startX = -1, startY = -1;
      for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
              if (alphaGrid[y][x]) {
                  if (x === 0 || !alphaGrid[y][x-1]) {
                      startX = x;
                      startY = y;
                      break;
                  }
              }
          }
          if (startX !== -1) break;
      }
      if (startX === -1) return [];

      const path = [];
      let cx = startX;
      let cy = startY;
      
      const dirs = [
          {dx: -1, dy: 0},
          {dx: -1, dy: -1},
          {dx: 0, dy: -1},
          {dx: 1, dy: -1},
          {dx: 1, dy: 0},
          {dx: 1, dy: 1},
          {dx: 0, dy: 1},
          {dx: -1, dy: 1}
      ];

      let backtrackDir = 0;
      let sX = startX, sY = startY;
      let currX = startX, currY = startY;
      let visited = new Set();
      let maxSteps = w * h * 2;
      let step = 0;
      
      while (step < maxSteps) {
          path.push({ x: currX, y: currY });
          const key = `${currX},${currY}`;
          visited.add(key);

          let found = false;
          for (let i = 0; i < 8; i++) {
              const dIdx = (backtrackDir + i) % 8;
              const nx = currX + dirs[dIdx].dx;
              const ny = currY + dirs[dIdx].dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                  if (alphaGrid[ny][nx]) {
                      currX = nx;
                      currY = ny;
                      backtrackDir = (dIdx + 5) % 8;
                      found = true;
                      break;
                  }
              }
          }
          if (!found) break;
          if (currX === sX && currY === sY) break;
          step++;
      }
      return path;
  }

  function getDxfSilhouette(segments, w = 128, h = 128) {
      const grid = [];
      for (let y = 0; y < h; y++) {
          grid.push(new Array(w).fill(false));
      }
      
      function drawLineOnGrid(x0, y0, x1, y1) {
          const dx = Math.abs(x1 - x0);
          const dy = Math.abs(y1 - y0);
          const sx = (x0 < x1) ? 1 : -1;
          const sy = (y0 < y1) ? 1 : -1;
          let err = dx - dy;
          
          while (true) {
              for (let dyb = -1; dyb <= 1; dyb++) {
                  for (let dxb = -1; dxb <= 1; dxb++) {
                      const px = x0 + dxb;
                      const py = y0 + dyb;
                      if (px >= 0 && px < w && py >= 0 && py < h) {
                          grid[py][px] = true;
                      }
                  }
              }
              
              if (x0 === x1 && y0 === y1) break;
              const e2 = 2 * err;
              if (e2 > -dy) {
                  err -= dy;
                  x0 += sx;
              }
              if (e2 < dx) {
                  err += dx;
                  y0 += sy;
              }
          }
      }

      segments.forEach(s => {
          const gx1 = Math.round(w / 2 + s.p1.x * 1.6);
          const gy1 = Math.round(h / 2 - s.p1.y * 1.6);
          const gx2 = Math.round(w / 2 + s.p2.x * 1.6);
          const gy2 = Math.round(h / 2 - s.p2.y * 1.6);
          drawLineOnGrid(gx1, gy1, gx2, gy2);
      });

      const filled = [];
      for (let y = 0; y < h; y++) {
          filled.push(new Array(w).fill(false));
      }

      const queue = [];
      for (let x = 0; x < w; x++) {
          if (!grid[0][x]) { filled[0][x] = true; queue.push({ x, y: 0 }); }
          if (!grid[h-1][x]) { filled[h-1][x] = true; queue.push({ x, y: h - 1 }); }
      }
      for (let y = 1; y < h - 1; y++) {
          if (!grid[y][0]) { filled[y][0] = true; queue.push({ x: 0, y }); }
          if (!grid[y][w-1]) { filled[y][w-1] = true; queue.push({ x: w - 1, y }); }
      }

      let head = 0;
      const dirs = [
          {dx: -1, dy: 0},
          {dx: 1, dy: 0},
          {dx: 0, dy: -1},
          {dx: 0, dy: 1}
      ];

      while (head < queue.length) {
          const curr = queue[head++];
          for (let i = 0; i < 4; i++) {
              const nx = curr.x + dirs[i].dx;
              const ny = curr.y + dirs[i].dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                  if (!filled[ny][nx] && !grid[ny][nx]) {
                      filled[ny][nx] = true;
                      queue.push({ x: nx, y: ny });
                  }
              }
          }
      }

      const interior = [];
      for (let y = 0; y < h; y++) {
          const row = [];
          for (let x = 0; x < w; x++) {
              row.push(!filled[y][x]);
          }
          interior.push(row);
      }

      const contourPts = getSilhouetteContour(interior, w, h);

      return contourPts.map(p => ({
          x: (p.x - w / 2) / 1.6,
          y: (h / 2 - p.y) / 1.6
      }));
  }


  function pointInPoly(pt, poly) {
      let x = pt.x, y = pt.y, inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          let xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
          let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      return inside;
  }

  const presets = {
      custom: {},
      glass: { metal: 0.1, rough: 0.0, opacity: 0.3, color: '#e0f2fe', emissive: '#000000' },
      gold: { metal: 1.0, rough: 0.2, opacity: 1.0, color: '#fbbf24', emissive: '#000000' },
      neon: { metal: 0.0, rough: 1.0, opacity: 1.0, color: '#f87171', emissive: '#ef4444' },
      plastic: { metal: 0.0, rough: 0.7, opacity: 1.0, color: '#3b82f6', emissive: '#000000' },
      chrome: { metal: 1.0, rough: 0.0, opacity: 1.0, color: '#ffffff', emissive: '#000000' },
      clay: { metal: 0.0, rough: 0.9, opacity: 1.0, color: '#d4c5b0', emissive: '#000000' },
      obsidian: { metal: 0.8, rough: 0.1, opacity: 0.9, color: '#111111', emissive: '#000000' }
  };

  function init(wrapElement, toggleBtn) {
    container = document.createElement('div');
    container.style = `position:absolute; inset:0; background:#050815; z-index:55; display:none; flex-direction:row; font-family:sans-serif;`;
    
    mainPane = document.createElement('div');
    mainPane.style = `flex:1; position:relative; width:100%; height:100%;`;
    container.appendChild(mainPane);

    canvas = document.createElement('canvas');
    canvas.style = `position:absolute; inset:0; width:100%; height:100%; z-index:10; cursor:crosshair; touch-action:none; pointer-events:none; transition: background 0.3s;`;
    mainPane.appendChild(canvas);

    const tools = document.createElement('div');
    tools.id = 'se-tools-sidebar';
    tools.style = `position:absolute; top:20px; left:20px; width:260px; background:rgba(15,23,42,0.95); border:1px solid #334155; border-radius:8px; padding:15px; z-index:20; box-shadow:0 10px 30px rgba(0,0,0,0.5); max-height:calc(100% - 40px); overflow-y:auto; color:#cbd5e1; scrollbar-width:thin;`;
    mainPane.appendChild(tools);

    const style = document.createElement('style');
    style.innerHTML = `
      .se-btn { width:100%; padding:8px; margin-top:8px; font-size:11px; font-weight:bold; border-radius:4px; cursor:pointer; border:none; transition:0.2s; }
      .se-btn:hover { filter:brightness(1.2); }
      .se-lbl { font-size:10px; color:#94a3b8; margin-top:10px; margin-bottom:4px; display:block; text-transform:uppercase; font-weight:bold; }
      .se-val { float:right; color:#10b981; }
      .se-range { width:100%; cursor:pointer; }
      .se-sec { border-top:1px solid #334155; margin-top:15px; padding-top:5px; }
      .se-mode { width:32%; display:inline-block; background:#334155; color:white; padding:6px 0; text-align:center; cursor:pointer; font-size:10px; border-radius:4px; margin-right:1%; }
      .se-mode.active { background:#10b981; }
      .se-main-mode { flex:1; padding:10px 0; font-size:12px; font-weight:bold; border:none; border-radius:4px; cursor:pointer; transition:0.2s; }
    `;
    document.head.appendChild(style);

    const isEN = window.currentLang !== 'fr';
    
    tools.innerHTML = `
      <div style="font-size:14px;font-weight:bold;color:#10b981;margin-bottom:15px;text-align:center;">🌟 3D Scene Composer</div>
      
      <div style="display:flex; gap:6px; background:#0f172a; padding:6px; border-radius:6px; margin-bottom:15px; border:1px solid #1e293b;">
         <button class="se-main-mode" id="btn-mode-3d" style="background:#10b981; color:white;">✋ 3D Edit</button>
         <button class="se-main-mode" id="btn-mode-draw" style="background:transparent; color:#94a3b8;">✏️ Draw</button>
      </div>

      <div class="se-sec" id="sec-draw-tools" style="display:none; margin-top:0;">
          <label class="se-lbl">${isEN ? 'Draw Shape Tool' : 'Outil de Forme'}</label>
          <select id="se-draw-shape" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="freehand">${isEN ? '✏️ Freehand' : '✏️ Main libre'}</option>
              <option value="circle">⭕ ${isEN ? 'Circle' : 'Cercle'}</option>
              <option value="square">⬜ ${isEN ? 'Square' : 'Carré'}</option>
              <option value="star">⭐ ${isEN ? 'Star' : 'Étoile'}</option>
              <option value="hexagon">💠 Hexagon</option>
              <option value="heart">❤️ Heart</option>
              <option value="gear">⚙️ Gear (Cogwheel)</option>
          </select>

          <label class="se-lbl">${isEN ? 'Symmetry' : 'Symétrie'}</label>
          <select id="se-draw-symmetry" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="none">${isEN ? 'None' : 'Aucune'}</option>
              <option value="mirror">🪞 ${isEN ? 'Mirror (L/R)' : 'Miroir (G/D)'}</option>
              <option value="radial4">❄️ Radial x4</option>
              <option value="radial6">❄️ Radial x6</option>
              <option value="radial8">❄️ Radial x8</option>
          </select>

          <label class="se-lbl">${isEN ? 'Extrusion Style' : "Style d'Extrusion"}</label>
          <select id="se-draw-style" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="solid">${isEN ? '🧱 Solid Block' : '🧱 Bloc Plein'}</option>
              <option value="tube">${isEN ? '🧪 Neon Tube' : '🧪 Tube Néon'}</option>
          </select>

          <div style="display:flex;gap:8px;margin-bottom:8px;">
              <label class="se-btn" style="background:rgba(234,179,8,0.2);color:#facc15;border:1px solid #eab308;text-align:center;margin-top:0;">
                  🖼️ ${isEN ? 'Trace Image' : 'Calque Image'}
                  <input type="file" id="se-draw-bg-file" accept="image/*" style="display:none;"/>
              </label>
              <label class="se-btn" style="background:rgba(167,139,250,0.2);color:#a78bfa;border:1px solid #a78bfa;text-align:center;margin-top:0;">
                  ✨ ${isEN ? 'Auto-Trace 3D' : 'Auto-Trace 3D'}
                  <input type="file" id="se-draw-auto-file" accept="image/*" style="display:none;"/>
              </label>
          </div>
          <div id="se-draw-bg-clear" style="display:none;font-size:10px;color:#ef4444;text-align:center;cursor:pointer;margin-bottom:8px;">❌ ${isEN ? 'Clear Trace Layer' : 'Effacer Calque'}</div>
      </div>

      <div id="sec-import-tools">
          <input type="file" id="se-file" accept=".svg,.dxf" style="display:none;"/>
          <input type="file" id="se-file-3d" accept=".glb,.gltf,.obj,.stl" style="display:none;"/>
          <div style="display:flex;gap:8px;margin-bottom:8px;">
             <button class="se-btn" id="btn-text" style="background:rgba(59,130,246,0.2);color:#60a5fa;border:1px solid #3b82f6;margin-top:0;">🔠 ${isEN ? 'Add 3D Text' : 'Texte 3D'}</button>
             <button class="se-btn" id="btn-qrcode" style="background:rgba(167,139,250,0.2);color:#a78bfa;border:1px solid #a78bfa;margin-top:0;">📱 ${isEN ? 'Add QR Code' : 'QR Code'}</button>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:8px;">
             <button class="se-btn" id="btn-svg" style="background:rgba(234,179,8,0.2);color:#facc15;border:1px solid #eab308;margin-top:0;">🖼️ SVG Import</button>
             <button class="se-btn" id="btn-dxf" style="background:rgba(239,68,68,0.2);color:#f87171;border:1px solid #ef4444;margin-top:0;">📐 DXF Import</button>
          </div>
          <button class="se-btn" id="btn-3d-import" style="background:rgba(16,185,129,0.2);color:#10b981;border:1px solid #10b981;margin-top:0;">📦 ${isEN ? '3D Model Import (.glb, .obj, .stl)' : 'Import Modèle 3D (.glb, .obj, .stl)'}</button>
          <div style="border-top:1px solid #1e293b;margin-top:10px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── Media & Effects ──</span>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:8px;margin-top:6px;">
             <button class="se-btn" id="btn-img3d-scene" style="background:rgba(99,102,241,0.2);color:#a5b4fc;border:1px solid #6366f1;margin-top:0;">🖼️ Image→3D</button>
             <button class="se-btn" id="btn-audio-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;margin-top:0;">🎵 Audio 3D</button>
          </div>
          <button class="se-btn" id="btn-video-scene" style="background:rgba(139,92,246,0.2);color:#c4b5fd;border:1px solid #8b5cf6;margin-top:0;">🎥 Video→3D (Effet)</button>
          <input type="file" id="se-img-file" accept="image/*" style="display:none;"/>
          <input type="file" id="se-audio-file" accept="audio/*" style="display:none;"/>
          <input type="file" id="se-video-file" accept="video/*" style="display:none;"/>
          <!-- Image→3D mini panel -->
          <div id="se-img3d-cfg" style="display:none;background:#0f172a;border:1px solid rgba(99,102,241,0.3);border-radius:8px;padding:10px;margin-top:6px;">
            <div style="font-size:10px;color:#a5b4fc;font-weight:700;margin-bottom:8px;">⚙️ ${isEN ? 'Image Config→3D' : 'Config Image→3D'}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><label style="font-size:10px;color:#94a3b8;min-width:90px;">${isEN ? 'Resolution' : 'Résolution'} <b id="se-i3d-rv">60</b></label><input type="range" id="se-i3d-res" min="20" max="100" value="60" style="flex:1;accent-color:#6366f1;"></div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><label style="font-size:10px;color:#94a3b8;min-width:90px;">${isEN ? 'Height' : 'Hauteur'} <b id="se-i3d-hv">20</b></label><input type="range" id="se-i3d-hs" min="2" max="60" value="20" style="flex:1;accent-color:#6366f1;"></div>
            <select id="se-i3d-cm" style="width:100%;padding:5px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:5px;font-size:10px;margin-bottom:6px;"><option value="gradient">Gradient</option><option value="neon">Neon</option><option value="thermal">Thermal</option><option value="texture">Texture</option><option value="mono">Monochrome</option></select>
            <button id="se-i3d-add" style="width:100%;padding:6px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">➕ ${isEN ? 'Add to Scene' : 'Ajouter à la scène'}</button>
          </div>
          <!-- Audio 3D mini panel -->
          <div id="se-audio-cfg" style="display:none;background:#0f172a;border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:10px;margin-top:6px;">
            <div style="font-size:10px;color:#34d399;font-weight:700;margin-bottom:8px;">⚙️ Audio Visualizer Config</div>
            <div style="display:flex;gap:6px;margin-bottom:6px;">
              <button id="se-mic-btn" style="flex:1;padding:6px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">🎤 Mic</button>
              <label style="flex:1;padding:6px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#94a3b8;font-size:10px;font-weight:700;cursor:pointer;text-align:center;position:relative;">📁 MP3<input type="file" id="se-audio-file2" accept="audio/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;"/></label>
            </div>
            <div id="se-audio-status" style="font-size:9px;color:#64748b;text-align:center;margin-bottom:6px;">${isEN ? 'No Source' : 'Aucune source'}</div>
            <select id="se-audio-style" style="width:100%;padding:5px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:5px;font-size:10px;margin-bottom:6px;"><option value="box">${isEN ? 'Cubes' : 'Cubes'}</option><option value="cylinder">${isEN ? 'Cylinders' : 'Cylindres'}</option><option value="cone">${isEN ? 'Cones' : 'Cônes'}</option></select>
            <select id="se-audio-color" style="width:100%;padding:5px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:5px;font-size:10px;margin-bottom:6px;"><option value="spectrum">Spectrum</option><option value="fire">${isEN ? 'Fire' : 'Feu'}</option><option value="ocean">Ocean</option><option value="neon">Neon</option></select>
            <button id="se-audio-add" style="width:100%;padding:6px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">➕ ${isEN ? 'Add to Scene' : 'Ajouter à la scène'}</button>
          </div>
          <!-- Video→3D mini panel -->
          <div id="se-v3d-cfg" style="display:none;background:#0f172a;border:1px solid rgba(139,92,246,0.3);border-radius:8px;padding:10px;margin-top:6px;">
            <div style="font-size:10px;color:#c4b5fd;font-weight:700;margin-bottom:8px;">⚙️ Video Config→3D</div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:70px;">Shape</label>
                <select id="se-v3d-shape" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="plane">Plane</option><option value="curved">Curved</option><option value="sphere">Sphere</option><option value="cube">Cube</option>
                </select>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:70px;">Chroma</label>
                <input type="checkbox" id="se-v3d-chroma" style="accent-color:#8b5cf6;">
                <input type="color" id="se-v3d-chroma-col" value="#00ff00" style="width:30px;height:20px;border:none;background:none;cursor:pointer;">
            </div>
            <button id="se-v3d-add" style="width:100%;padding:6px;background:linear-gradient(135deg,#8b5cf6,#fb7185);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">➕ ${isEN ? 'Add Video Object' : 'Ajouter Objet Vidéo'}</button>
          </div>
          <!-- QR Code 3D mini panel -->
          <div id="se-qr-cfg" style="display:none;background:#0f172a;border:1px solid rgba(167,139,250,0.3);border-radius:8px;padding:10px;margin-top:6px;">
            <div style="font-size:10px;color:#a78bfa;font-weight:700;margin-bottom:8px;">⚙️ ${isEN ? 'QR Code Config' : 'Config. Code QR'}</div>
            <input type="text" id="se-qr-text" value="https://" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #334155;border-radius:4px;font-size:10px;margin-bottom:6px;" placeholder="${isEN ? 'Enter Text/URL' : 'Entrez Texte/URL'}">
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Shape' : 'Forme'}</label>
                <select id="se-qr-shape" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="square">${isEN ? 'Square' : 'Carré'}</option>
                    <option value="circle">${isEN ? 'Circle' : 'Cercle'}</option>
                    <option value="diamond">${isEN ? 'Diamond' : 'Losange'}</option>
                </select>
            </div>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Color' : 'Couleur'}</label>
                <input type="color" id="se-qr-color" value="#000000" style="width:25px;height:20px;border:none;background:none;cursor:pointer;" title="Foreground (Dark recommended)">
                <label style="font-size:10px;color:#94a3b8;margin-left:4px;">${isEN ? 'Base' : 'Base'}</label>
                <input type="color" id="se-qr-base-color" value="#ffffff" style="width:25px;height:20px;border:none;background:none;cursor:pointer;" title="Background (Light recommended)">
            </div>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Material' : 'Matière'}</label>
                <select id="se-qr-mat" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="standard">Standard</option>
                    <option value="glass">${isEN ? 'Glass / Crystal' : 'Verre / Cristal'}</option>
                    <option value="gold">${isEN ? 'Luxury Gold' : 'Or / Luxe'}</option>
                    <option value="holo">${isEN ? 'Hologram' : 'Hologramme'}</option>
                </select>
            </div>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Base' : 'Socle'}</label>
                <select id="se-qr-baseshape" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="square">${isEN ? 'Square' : 'Carré'}</option>
                    <option value="pedestal">${isEN ? 'Pedestal' : 'Piédestal'}</option>
                    <option value="beveled">${isEN ? 'Beveled' : 'Arrondi'}</option>
                </select>
            </div>
            
            <div style="font-size:8px;color:#fbbf24;margin-bottom:8px;text-align:center;">
                ⚠️ ${isEN ? 'For best scanning, use Dark QR on Light Base.' : 'Utilisez un QR Foncé sur une Base Claire pour le scan.'}
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Height' : 'Hauteur'}</label>
                <input type="range" id="se-qr-depth" min="1" max="20" value="5" style="flex:1;accent-color:#a78bfa;">
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="flex:1;padding:4px;background:#1e293b;border:1px solid #334155;border-radius:4px;color:#94a3b8;font-size:10px;cursor:pointer;text-align:center;position:relative;">
                    ${isEN ? '📁 Center Logo' : '📁 Logo Central'}
                    <input type="file" id="se-qr-logo-file" accept="image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;"/>
                </label>
                <div id="se-qr-logo-status" style="font-size:9px;color:#10b981;display:none;">✔️ OK</div>
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                <label style="font-size:10px;color:#94a3b8;"><input type="checkbox" id="se-qr-neon" style="accent-color:#a78bfa;vertical-align:middle;"> Neon FX</label>
                <label style="font-size:10px;color:#94a3b8;"><input type="checkbox" id="se-qr-anim" style="accent-color:#a78bfa;vertical-align:middle;"> ${isEN ? 'Anim' : 'Anim'}</label>
                <label style="font-size:10px;color:#94a3b8;"><input type="checkbox" id="se-qr-particles" style="accent-color:#a78bfa;vertical-align:middle;"> ${isEN ? 'Particles' : 'Particules'}</label>
                <label style="font-size:10px;color:#94a3b8;"><input type="checkbox" id="se-qr-city" style="accent-color:#a78bfa;vertical-align:middle;"> Cityscape</label>
            </div>

            <button id="se-qr-add" style="width:100%;padding:6px;background:linear-gradient(135deg,#a78bfa,#8b5cf6);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">➕ ${isEN ? 'Add QR to Scene' : 'Ajouter QR'}</button>
          </div>

          <!-- Text 3D mini panel -->
          <div id="se-text-cfg" style="display:none;background:#0f172a;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px;margin-top:6px;">
            <div style="font-size:10px;color:#60a5fa;font-weight:700;margin-bottom:8px;">⚙️ ${isEN ? '3D Text Config' : 'Config. Texte 3D'}</div>
            <textarea id="se-txt-content" rows="2" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #334155;border-radius:4px;font-size:10px;margin-bottom:6px;resize:vertical;" placeholder="${isEN ? 'Enter Text' : 'Entrez le texte'}">3D Text</textarea>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Font' : 'Police'}</label>
                <select id="se-txt-font" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="helvetiker">Helvetiker (Classique)</option>
                    <option value="optimer">Optimer (Moderne)</option>
                    <option value="gentilis">Gentilis (Sérif)</option>
                    <option value="droid">Droid Sans (Technique)</option>
                </select>
            </div>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Layout' : 'Forme'}</label>
                <select id="se-txt-layout" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="straight">${isEN ? 'Straight' : 'Droit'}</option>
                    <option value="curved">${isEN ? 'Curved / Arch' : 'Courbé / Arc'}</option>
                    <option value="vertical">${isEN ? 'Vertical' : 'Vertical'}</option>
                </select>
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Material' : 'Matière'}</label>
                <select id="se-txt-mat" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="standard">Standard / Matte</option>
                    <option value="gold">${isEN ? 'Luxury Gold' : 'Or / Luxe'}</option>
                    <option value="glass">${isEN ? 'Crystal Glass' : 'Cristal / Verre'}</option>
                    <option value="neon">${isEN ? 'Neon Glow' : 'Néon Lumineux'}</option>
                </select>
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Anim' : 'Anim'}</label>
                <select id="se-txt-anim" style="flex:1;padding:4px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:4px;font-size:10px;">
                    <option value="none">${isEN ? 'None' : 'Aucune'}</option>
                    <option value="float">${isEN ? 'Float' : 'Flottaison'}</option>
                    <option value="wave">${isEN ? 'Wave' : 'Vague'}</option>
                    <option value="spin">${isEN ? 'Spin' : 'Rotation'}</option>
                    <option value="typewriter">${isEN ? 'Typewriter' : 'Machine à écrire'}</option>
                </select>
            </div>
            
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                <label style="font-size:10px;color:#94a3b8;min-width:55px;">${isEN ? 'Color' : 'Couleur'}</label>
                <input type="color" id="se-txt-color" value="#3b82f6" style="width:100%;height:20px;border:none;background:none;cursor:pointer;">
            </div>

            <button id="se-txt-add" style="width:100%;padding:6px;background:linear-gradient(135deg,#3b82f6,#2dd4bf);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer;">➕ ${isEN ? 'Add Text to Scene' : 'Ajouter Texte'}</button>
          </div>
          <div style="border-top:1px solid #1e293b;margin-top:10px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── ${isEN ? 'Extra 3D Modules' : 'Modules 3D Extra'} ──</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;margin-top:6px;">
             <button class="se-btn" id="btn-math-scene" style="background:rgba(99,102,241,0.15);color:#a5b4fc;border:1px solid #6366f1;flex:1;margin-top:0;">📐 Math</button>
             <button class="se-btn" id="btn-chart-scene" style="background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">📊 Data</button>
             <button class="se-btn" id="btn-webcam-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">👤 Cam</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-shader-scene" style="background:rgba(217,70,239,0.15);color:#f472b6;border:1px solid #d946ef;flex:1;margin-top:0;">🎨 Shader</button>
             <button class="se-btn" id="btn-star-scene" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid #3b82f6;flex:1;margin-top:0;">🌌 Stars</button>
             <button class="se-btn" id="btn-kf-scene" style="background:rgba(236,72,153,0.15);color:#f472b6;border:1px solid #ec4899;flex:1;margin-top:0;">🎬 Anim</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-voice-scene" style="background:rgba(244,63,94,0.15);color:#fb7185;border:1px solid #f43f5e;flex:1;margin-top:0;">🎙️ Voice</button>
             <button class="se-btn" id="btn-qr-labyrinth-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">🧩 Maze</button>
             <button class="se-btn" id="btn-terrain-scene" style="background:rgba(14,165,233,0.15);color:#38bdf8;border:1px solid #0ea5e9;flex:1;margin-top:0;">⛰️ Terrain</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-gallery-scene" style="background:rgba(139,92,246,0.15);color:#a78bfa;border:1px solid #8b5cf6;flex:1;margin-top:0;">🖼️ Doc</button>
             <button class="se-btn" id="btn-pdf-scene" style="background:rgba(244,63,94,0.15);color:#fb923c;border:1px solid #f43f5e;flex:1;margin-top:0;">📄 PDF</button>
             <button class="se-btn" id="btn-tree-scene" style="background:rgba(20,184,166,0.15);color:#2dd4bf;border:1px solid #14b8a6;flex:1;margin-top:0;">🌳 Logic</button>
             <button class="se-btn" id="btn-neon-scene" style="background:rgba(244,63,94,0.15);color:#fb7185;border:1px solid #f43f5e;flex:1;margin-top:0;">✍️ Neon</button>
          </div>
          <div style="border-top:1px solid #1e293b;margin-top:6px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── ${isEN ? 'Advanced Modules' : 'Modules Avancés'} ──</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;margin-top:6px;">
             <button class="se-btn" id="btn-csv-scene" style="background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">📊 CSV</button>
             <button class="se-btn" id="btn-webnet-scene" style="background:rgba(6,182,212,0.15);color:#22d3ee;border:1px solid #06b6d4;flex:1;margin-top:0;">🌐 Net</button>
             <button class="se-btn" id="btn-pixel-scene" style="background:rgba(139,92,246,0.15);color:#c084fc;border:1px solid #8b5cf6;flex:1;margin-top:0;">🎮 Pixel</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
             <button class="se-btn" id="btn-jsonlive-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">🌡️ JSON</button>
             <button class="se-btn" id="btn-dna-scene" style="background:rgba(52,211,153,0.15);color:#6ee7b7;border:1px solid #34d399;flex:1;margin-top:0;">🧬 DNA</button>
             <button class="se-btn" id="btn-geo-scene" style="background:rgba(14,165,233,0.15);color:#38bdf8;border:1px solid #0ea5e9;flex:1;margin-top:0;">🗺️ Geo</button>
             <button class="se-btn" id="btn-palette-scene" style="background:rgba(244,114,182,0.15);color:#f9a8d4;border:1px solid #f472b6;flex:1;margin-top:0;">🎨 Pal</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
             <button class="se-btn" id="btn-sentiment-scene" style="background:rgba(139,92,246,0.2);color:#c084fc;border:1px solid #8b5cf6;flex:1;margin-top:0;">🧠 Emotion</button>
             <button class="se-btn" id="btn-fractal-scene" style="background:rgba(6,182,212,0.2);color:#67e8f9;border:1px solid #06b6d4;flex:1;margin-top:0;">🌀 Fractal</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-midi-scene" style="background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">🎼 MIDI</button>
             <button class="se-btn" id="btn-neural-scene" style="background:rgba(6,182,212,0.2);color:#22d3ee;border:1px solid #06b6d4;flex:1;margin-top:0;">🕸️ Neural</button>
             <button class="se-btn" id="btn-timeline-scene" style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">⏳ Time</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-chess-scene" style="background:rgba(248,250,252,0.15);color:#e2e8f0;border:1px solid #94a3b8;flex:1;margin-top:0;">♟ Chess</button>
             <button class="se-btn" id="btn-bio-scene" style="background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid #ef4444;flex:1;margin-top:0;">🌡️ Bio</button>
             <button class="se-btn" id="btn-mood-scene" style="background:rgba(244,114,182,0.2);color:#f9a8d4;border:1px solid #f472b6;flex:1;margin-top:0;">🎭 Mood</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-molecule-scene" style="background:rgba(6,182,212,0.2);color:#67e8f9;border:1px solid #06b6d4;flex:1;margin-top:0;">🧬 Mol</button>
             <button class="se-btn" id="btn-wslive-scene" style="background:rgba(16,185,129,0.2);color:#6ee7b7;border:1px solid #10b981;flex:1;margin-top:0;">📡 Live</button>
             <button class="se-btn" id="btn-story-scene" style="background:rgba(139,92,246,0.2);color:#c084fc;border:1px solid #8b5cf6;flex:1;margin-top:0;">🗣️ Story</button>
             <button class="se-btn" id="btn-crystal-scene" style="background:rgba(168,85,247,0.2);color:#d8b4fe;border:1px solid #a855f7;flex:1;margin-top:0;">🔮 Crystal</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-botany-scene" style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">🌿 Flora</button>
             <button class="se-btn" id="btn-automata-scene" style="background:rgba(244,63,94,0.2);color:#fb7185;border:1px solid #f43f5e;flex:1;margin-top:0;">🧬 Life</button>
             <button class="se-btn" id="btn-kintypo-scene" style="background:rgba(234,179,8,0.2);color:#fde047;border:1px solid #eab308;flex:1;margin-top:0;">🔠 Typo</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-galaxy-scene" style="background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid #3b82f6;flex:1;margin-top:0;">🌌 Galaxy</button>
             <button class="se-btn" id="btn-spaceship-scene" style="background:rgba(148,163,184,0.2);color:#cbd5e1;border:1px solid #94a3b8;flex:1;margin-top:0;">🚀 Ship</button>
             <button class="se-btn" id="btn-dungeon-scene" style="background:rgba(180,83,9,0.2);color:#fcd34d;border:1px solid #b45309;flex:1;margin-top:0;">🏰 Dngn</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-weather-scene" style="background:rgba(14,165,233,0.2);color:#7dd3fc;border:1px solid #0ea5e9;flex:1;margin-top:0;">🌪️ Wthr</button>
             <button class="se-btn" id="btn-impossible-scene" style="background:rgba(192,132,252,0.2);color:#e879f9;border:1px solid #c084fc;flex:1;margin-top:0;">👁️ Illus</button>
             <button class="se-btn" id="btn-papercraft-scene" style="background:rgba(251,146,60,0.2);color:#fdba74;border:1px solid #fb923c;flex:1;margin-top:0;">📄 Paper</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
             <button class="se-btn" id="btn-shield-scene" style="background:rgba(56,189,248,0.2);color:#bae6fd;border:1px solid #38bdf8;flex:1;margin-top:0;">🛡️ Shield</button>
          </div>
          <div style="border-top:1px solid #1e293b;margin-top:6px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── Mega Modules Pro ──</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;margin-top:6px;">
             <button class="se-btn" id="btn-cybercity-scene" style="background:rgba(14,165,233,0.15);color:#38bdf8;border:1px solid #0ea5e9;flex:1;margin-top:0;">🏙️ City</button>
             <button class="se-btn" id="btn-fluid-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">🌊 Fluids</button>
             <button class="se-btn" id="btn-timelapse-scene" style="background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">⏳ 4D</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-product-scene" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid #3b82f6;flex:1;margin-top:0;">🛒 E-Com</button>
             <button class="se-btn" id="btn-social-scene" style="background:rgba(239,68,68,0.15);color:#f87171;border:1px solid #ef4444;flex:1;margin-top:0;">💬 Social</button>
             <button class="se-btn" id="btn-gitrepo-scene" style="background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid #a855f7;flex:1;margin-top:0;">📂 Git 3D</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
             <button class="se-btn" id="btn-webar-scene" style="background:rgba(20,184,166,0.15);color:#2dd4bf;border:1px solid #14b8a6;flex:1;margin-top:0;">👁️ AR</button>
             <button class="se-btn" id="btn-text2scene-scene" style="background:rgba(217,70,239,0.15);color:#e879f9;border:1px solid #d946ef;flex:1;margin-top:0;">🪄 Txt->3D</button>
          </div>
          <div style="border-top:1px solid #1e293b;margin-top:6px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── Ultra Modules ──</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;margin-top:6px;">
             <button class="se-btn" id="btn-iceterrain-scene" style="background:rgba(125,211,252,0.15);color:#7dd3fc;border:1px solid #38bdf8;flex:1;margin-top:0;">🧊 Ice</button>
             <button class="se-btn" id="btn-lavaworld-scene" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid #ef4444;flex:1;margin-top:0;">🌋 Lava</button>
             <button class="se-btn" id="btn-oceanwave-scene" style="background:rgba(14,165,233,0.15);color:#38bdf8;border:1px solid #0ea5e9;flex:1;margin-top:0;">🌊 Ocean</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-mechrobot-scene" style="background:rgba(100,116,139,0.15);color:#94a3b8;border:1px solid #64748b;flex:1;margin-top:0;">🤖 Mech</button>
             <button class="se-btn" id="btn-ancientarch-scene" style="background:rgba(217,119,6,0.15);color:#fbbf24;border:1px solid #d97706;flex:1;margin-top:0;">🏛️ Arch</button>
             <button class="se-btn" id="btn-legocity-scene" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid #ef4444;flex:1;margin-top:0;">🧱 Lego</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
             <button class="se-btn" id="btn-dataglobe-scene" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid #3b82f6;flex:1;margin-top:0;">🌐 Globe</button>
             <button class="se-btn" id="btn-holohud-scene" style="background:rgba(6,182,212,0.15);color:#22d3ee;border:1px solid #06b6d4;flex:1;margin-top:0;">🌈 HUD</button>
             <button class="se-btn" id="btn-masksculptor-scene" style="background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid #a855f7;flex:1;margin-top:0;">🎭 Mask</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
             <button class="se-btn" id="btn-instrument-scene" style="background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">🎸 Music</button>
             <button class="se-btn" id="btn-chemreaction-scene" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">⚗️ Chem</button>
             <button class="se-btn" id="btn-anatomy-scene" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid #ef4444;flex:1;margin-top:0;">🦴 Body</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;flex-direction:column;">
             <div style="display:flex;gap:6px;">
                <button class="se-btn" id="btn-heroforge-scene" style="background:rgba(234,179,8,0.2);color:#facc15;border:1px solid #eab308;flex:1;margin-top:0;">🦸‍♂️ Hero Forge</button>
                <button class="se-btn" id="btn-steampunk-scene" style="background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">⚙️ Steampunk</button>
             </div>
             <div style="display:flex;gap:6px;">
                <button class="se-btn" id="btn-steampunk-pro-scene" style="background:linear-gradient(135deg,rgba(217,119,6,0.3),rgba(239,68,68,0.3));color:#fb923c;border:1px solid #f97316;margin-top:0;flex:1;font-weight:700;font-size:10px;">⚙️👑 Steampunk Pro</button>
                <button class="se-btn" id="btn-clockultra-scene" style="background:linear-gradient(135deg,rgba(168,85,247,0.3),rgba(6,182,212,0.3));color:#22d3ee;border:1px solid #06b6d4;margin-top:0;flex:1;font-weight:700;font-size:10px;">🕒💎 CLOCK ULTRA</button>
             </div>
          </div>
          <div style="border-top:1px solid #1e293b;margin-top:6px;padding-top:8px;">
            <span style="font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;">── Scene Tools ──</span>
          </div>
          <div style="display:flex;gap:6px;margin-top:6px;margin-bottom:4px;">
             <button class="se-btn" id="btn-snapshot" style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid #10b981;flex:1;margin-top:0;">📸 Snapshot</button>
             <button class="se-btn" id="btn-scene-record" style="background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid #ef4444;flex:1;margin-top:0;">🎞️ Record</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:4px;">
             <button class="se-btn" id="btn-clone-obj" style="background:rgba(99,102,241,0.2);color:#a5b4fc;border:1px solid #6366f1;flex:1;margin-top:0;">🔵 Clone</button>
             <button class="se-btn" id="btn-lighting" style="background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid #f59e0b;flex:1;margin-top:0;">💡 Lights</button>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;margin-top:4px;">
             <span style="font-size:10px;color:#94a3b8;min-width:68px;">🎨 Mood Tint</span>
             <input type="color" id="se-mood-tint" value="#ffffff" style="width:30px;height:22px;border:none;cursor:pointer;background:none;">
             <input type="range" id="se-mood-intensity" min="0" max="2" step="0.1" value="0.5" style="flex:1;accent-color:#a5b4fc;">
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;margin-top:4px;">
             <span style="font-size:10px;color:#94a3b8;min-width:68px;">☀️ ${isEN ? 'Light / Lum.' : 'Lumière'}</span>
             <input type="range" id="se-scene-brightness" min="0.2" max="3.0" step="0.1" value="1.0" style="flex:1;accent-color:#facc15;">
             <span id="se-brightness-val" style="font-size:10px;color:#10b981;min-width:20px;text-align:right;">1.0x</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;margin-top:4px;">
             <span style="font-size:10px;color:#94a3b8;min-width:68px;">✨ ${isEN ? 'Glow / Lume' : 'Luminescence'}</span>
             <input type="range" id="se-glow-intensity" min="0.0" max="10.0" step="0.2" value="1.0" style="flex:1;accent-color:#38bdf8;">
             <span id="se-glow-val" style="font-size:10px;color:#10b981;min-width:20px;text-align:right;">1.0x</span>
          </div>
      </div>

      <div class="se-sec" id="sec-env" style="border-top:none;">
          <label class="se-lbl" style="color:#38bdf8;">🌌 ${isEN ? 'Scene Environment' : 'Environnement'}</label>
          <select id="se-env" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="studio">🎥 Studio (Default)</option>
              <option value="bright_studio">🎨 ${isEN ? 'Premium White Studio (Brilliant)' : 'Studio Blanc Premium (Brillant)'}</option>
              <option value="cherry_blossom">🌸 ${isEN ? 'Sakura Spring Garden (Romantic)' : 'Jardin de Cerisiers (Romantique)'}</option>
              <option value="crystal_oasis">💎 ${isEN ? 'Magic Crystal Oasis (Luminous)' : 'Oasis de Cristal Magique (Lumineux)'}</option>
              <option value="aurora">🌌 ${isEN ? 'Aurora Borealis (Magical Glow)' : 'Aurore Boréale (Éclat Magique)'}</option>
              <option value="heaven">🏛️ ${isEN ? 'Golden Palace / Heaven (Celestial)' : 'Palais Doré / Paradis (Céleste)'}</option>
              <option value="cosmos">🌠 Cosmos (Stars)</option>
              <option value="solar">🪐 Solar System</option>
              <option value="storm">⛈️ Storm (Rain & Lightning)</option>
              <option value="ocean">🌊 Deep Ocean</option>
              <option value="cyber">🟢 Cyber Matrix</option>
              <option value="sunset">🌅 Synthwave Sunset</option>
              <option value="hologram">🧊 Hologram Grid</option>
              <option value="forest">🌲 Enchanted Forest</option>
              <option value="mars">🏜️ Martian Desert</option>
              <option value="tokyo">🌃 Neon Tokyo Night</option>
              <option value="blackhole">🕳️ Black Hole</option>
              <option value="custom_photo">🖼️ ${isEN ? 'Custom Photo' : 'Photo Personnalisée'}</option>
              <option value="custom_video">🎥 ${isEN ? 'Custom Video' : 'Vidéo Personnalisée'}</option>
              <option value="preset_fireplace">🔥 ${isEN ? 'Cozy Fireplace' : 'Cheminée Chaleureuse'}</option>
              <option value="preset_river">🏞️ ${isEN ? 'Peaceful River' : 'Rivière Paisible'}</option>
              <option value="preset_ocean">🌊 ${isEN ? 'Ocean Waves' : 'Vagues de la Mer'}</option>
          </select>

          <div id="se-custom-media-container" style="display:none;background:#0f172a;border:1px solid rgba(56,189,248,0.3);border-radius:8px;padding:8px;margin-bottom:8px;">
             <label class="se-btn" style="background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid #38bdf8;text-align:center;margin-top:0;width:100%;display:block;cursor:pointer;">
                 <span id="se-custom-media-btn-text">📁 ${isEN ? 'Upload Photo' : 'Télécharger Photo'}</span>
                 <input type="file" id="se-custom-media-file" style="display:none;"/>
             </label>
             <div id="se-custom-media-status" style="font-size:10px;color:#10b981;margin-top:5px;text-align:center;display:none;"></div>
          </div>

          <label class="se-lbl" id="lbl-bg-effect" style="color:#8b5cf6;">✨ ${isEN ? 'Scene Background' : 'Fond de Scène'}</label>
          <select id="se-bg-effect" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="none">None</option>
              <option value="stars">🌠 Starfield</option>
              <option value="rain">👾 Digital Rain</option>
              <option value="dust">✨ Floating Dust</option>
          </select>
      </div>

      <div class="se-sec" id="sec-list" style="display:none;">
          <label class="se-lbl">${isEN ? 'Active Model' : 'Modèle Actif'}</label>
          <select id="se-select" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;"></select>
          <button class="se-btn" id="btn-delete" style="background:#ef4444;color:white;margin-top:0;">🗑️ ${isEN ? 'Delete Selected' : 'Supprimer'}</button>
      </div>

      <div class="se-sec" id="sec-transform" style="display:none;">
          <label class="se-lbl">${isEN ? 'Transform Mode' : 'Mode de Transf.'}</label>
          <div class="se-mode active" id="mode-translate">${isEN ? 'Move' : 'Déplacer'}</div>
          <div class="se-mode" id="mode-rotate">${isEN ? 'Rotate' : 'Pivoter'}</div>
          <div class="se-mode" id="mode-scale" style="margin-right:0;">${isEN ? 'Scale' : 'Échelle'}</div>
      </div>

      <div class="se-sec" id="sec-props" style="display:none;">
          <label class="se-lbl" style="color:#facc15;">✨ ${isEN ? 'Material Preset' : 'Style de Matériau'}</label>
          <select id="se-preset" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;margin-bottom:8px;">
              <option value="custom">${isEN ? 'Custom' : 'Personnalisé'}</option>
              <option value="glass">🧊 ${isEN ? 'Glass' : 'Verre'}</option>
              <option value="gold">🥇 ${isEN ? 'Gold' : 'Or'}</option>
              <option value="neon">🟢 ${isEN ? 'Neon' : 'Néon'}</option>
              <option value="plastic">🎈 ${isEN ? 'Plastic' : 'Plastique'}</option>
              <option value="chrome">🛸 Chrome</option>
              <option value="clay">🏺 Clay / Matte</option>
              <option value="obsidian">🪨 Obsidian</option>
          </select>

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
              <label style="display:flex;align-items:center;cursor:pointer;font-size:11px;color:#facc15;font-weight:bold;">
                <input type="checkbox" id="param-spin" style="width:auto;margin-right:8px;"> 🌀 ${isEN ? 'Spin' : 'Rotation'}
              </label>
              <label style="display:flex;align-items:center;cursor:pointer;font-size:11px;color:#60a5fa;font-weight:bold;" id="lbl-levitate">
                <input type="checkbox" id="param-levitate" style="width:auto;margin-right:8px;"> 🛸 ${isEN ? 'Levitate' : 'Lévitation'}
              </label>
          </div>

          <div id="qr-extra-tools" style="display:none; border:1px solid #4c1d95; background:rgba(76,29,149,0.2); padding:8px; border-radius:6px; margin-bottom:10px;">
              <label style="display:flex;align-items:center;cursor:pointer;font-size:11px;color:#a78bfa;font-weight:bold;margin-bottom:6px;" id="lbl-voxel-qr">
                <input type="checkbox" id="param-voxel" style="width:auto;margin-right:8px;"> 🧊 ${isEN ? '3D Voxel Mode' : 'Mode Voxel 3D'}
              </label>
              <label style="display:flex;align-items:center;cursor:pointer;font-size:11px;color:#a78bfa;font-weight:bold;" id="lbl-qr-frame">
                <input type="checkbox" id="param-frame" style="width:auto;margin-right:8px;"> 🖼️ ${isEN ? 'Add 3D Frame' : 'Ajouter Cadre 3D'}
              </label>
          </div>

          <label class="se-lbl" style="color:#c084fc;margin-top:10px;">🌪️ ${isEN ? 'Twist Modifier' : 'Modificateur Torsion'} <span class="se-val" id="val-twist">0</span></label>
          <input type="range" class="se-range" id="param-twist" min="-360" max="360" step="1" value="0">

          <label class="se-lbl" style="color:#f472b6;">📐 ${isEN ? 'Bend Modifier' : 'Modificateur Pliage'} <span class="se-val" id="val-bend">0</span></label>
          <input type="range" class="se-range" id="param-bend" min="-180" max="180" step="1" value="0">

          <label class="se-lbl" style="color:#60a5fa;">🗼 ${isEN ? 'Taper Modifier' : 'Modificateur Effilage'} <span class="se-val" id="val-taper">1.0</span></label>
          <input type="range" class="se-range" id="param-taper" min="0.1" max="3.0" step="0.1" value="1.0">

          <label class="se-lbl">${isEN ? 'Thickness' : 'Épaisseur'} <span class="se-val" id="val-depth">10</span></label>
          <input type="range" class="se-range" id="param-depth" min="1" max="100" value="10">
          
          <label class="se-lbl">${isEN ? 'Roundness (Bevel)' : 'Arrondi (Bevel)'} <span class="se-val" id="val-bevel">0.1</span></label>
          <input type="range" class="se-range" id="param-bevel" min="0" max="5" step="0.1" value="0.1">

          <label class="se-lbl">${isEN ? 'Base Scale' : 'Échelle de base'} <span class="se-val" id="val-scale">1.0</span></label>
          <input type="range" class="se-range" id="param-scale" min="0.1" max="10" step="0.1" value="1.0">

          <label class="se-lbl">${isEN ? 'Metalness' : 'Métallique'} <span class="se-val" id="val-metal">0.2</span></label>
          <input type="range" class="se-range" id="param-metal" min="0" max="1" step="0.1" value="0.2">

          <label class="se-lbl">${isEN ? 'Roughness' : 'Rugosité'} <span class="se-val" id="val-rough">0.3</span></label>
          <input type="range" class="se-range" id="param-rough" min="0" max="1" step="0.1" value="0.3">

          <label class="se-lbl">${isEN ? 'Opacity' : 'Opacité'} <span class="se-val" id="val-opacity">1.0</span></label>
          <input type="range" class="se-range" id="param-opacity" min="0.1" max="1.0" step="0.1" value="1.0">

          <div style="display:flex;gap:10px;margin-top:10px;">
              <div style="flex:1;">
                  <label class="se-lbl">${isEN ? 'Model Color' : 'Couleur'}</label>
                  <input type="color" id="param-color" value="#10b981" style="width:100%;height:30px;border:none;cursor:pointer;background:none;">
              </div>
              <div style="flex:1;">
                  <label class="se-lbl">${isEN ? 'Glow Color' : 'Lueur (Glow)'}</label>
                  <input type="color" id="param-emissive" value="#000000" style="width:100%;height:30px;border:none;cursor:pointer;background:none;">
              </div>
          </div>
          
          <label class="se-lbl" style="color:#6ee7b7;margin-top:10px;">🎨 ${isEN ? 'Render Style' : 'Style de Rendu'}</label>
          <select id="param-render-style" style="width:100%;padding:6px;background:#1e293b;color:white;border:1px solid #475569;border-radius:4px;">
              <option value="solid">Solid Mesh</option>
              <option value="wireframe">Wireframe</option>
              <option value="blueprint">Blueprint (Lines)</option>
              <option value="points">Point Cloud</option>
          </select>
      </div>

      <div class="se-sec">
          <button class="se-btn" id="btn-export" style="background:linear-gradient(135deg,#10b981,#059669);color:white;font-size:13px;padding:12px;box-shadow:0 4px 12px rgba(16,185,129,0.3);">⚡ ${isEN ? 'Generate 3D Scene' : 'Générer Scène 3D'}</button>
      </div>
    `;

    wrapElement.appendChild(container);

    const scriptsToLoad = [
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/TransformControls.js",
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js",
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js"
    ];
    let loadedScripts = 0;
    const checkStart = () => {
        loadedScripts++;
        if(loadedScripts === scriptsToLoad.length) { 
            init3D(); setupEvents(); 
            // Initialize extra modules
            const sidebar = document.getElementById('se-tools-sidebar');
            if(window.MathSurface3D) MathSurface3D.init(sidebar, document.getElementById('btn-math-scene'));
            if(window.DataChart3D) DataChart3D.init(sidebar, document.getElementById('btn-chart-scene'));
            if(window.WebcamAvatar3D) WebcamAvatar3D.init(sidebar, document.getElementById('btn-webcam-scene'));
            if(window.ShaderEditor3D) ShaderEditor3D.init(sidebar, document.getElementById('btn-shader-scene'));
            if(window.Starmap3D) Starmap3D.init(sidebar, document.getElementById('btn-star-scene'));
            if(window.KeyframeAnimator3D) KeyframeAnimator3D.init(sidebar, document.getElementById('btn-kf-scene'));
            if(window.VoiceSculpture3D) VoiceSculpture3D.init(sidebar, document.getElementById('btn-voice-scene'));
            if(window.QRLabyrinth3D) QRLabyrinth3D.init(sidebar, document.getElementById('btn-qr-labyrinth-scene'));
            if(window.LocationTerrain3D) LocationTerrain3D.init(sidebar, document.getElementById('btn-terrain-scene'));
            if(window.DocGallery3D) DocGallery3D.init(sidebar, document.getElementById('btn-gallery-scene'));
            if(window.PdfGallery3D) PdfGallery3D.init(sidebar, document.getElementById('btn-pdf-scene'));
            if(window.LogicTree3D) LogicTree3D.init(sidebar, document.getElementById('btn-tree-scene'));
            if(window.NeonHandwriting3D) NeonHandwriting3D.init(sidebar, document.getElementById('btn-neon-scene'));
            if(window.CsvChart3D) CsvChart3D.init(sidebar, document.getElementById('btn-csv-scene'));
            if(window.WebNetwork3D) WebNetwork3D.init(sidebar, document.getElementById('btn-webnet-scene'));
            if(window.PixelArtVoxel3D) PixelArtVoxel3D.init(sidebar, document.getElementById('btn-pixel-scene'));
            if(window.JsonDashboard3D) JsonDashboard3D.init(sidebar, document.getElementById('btn-jsonlive-scene'));
            if(window.DnaHelix3D) DnaHelix3D.init(sidebar, document.getElementById('btn-dna-scene'));
            if(window.GeoGlobe3D) GeoGlobe3D.init(sidebar, document.getElementById('btn-geo-scene'));
            if(window.PaletteWorld3D) PaletteWorld3D.init(sidebar, document.getElementById('btn-palette-scene'));
            if(window.SentimentLandscape3D) SentimentLandscape3D.init(sidebar, document.getElementById('btn-sentiment-scene'));
            if(window.FractalGenerator3D) FractalGenerator3D.init(sidebar, document.getElementById('btn-fractal-scene'));
            if(window.MidiArch3D) MidiArch3D.init(sidebar, document.getElementById('btn-midi-scene'));
            if(window.NeuralNet3D) NeuralNet3D.init(sidebar, document.getElementById('btn-neural-scene'));
            if(window.TimelineRiver3D) TimelineRiver3D.init(sidebar, document.getElementById('btn-timeline-scene'));
            if(window.ChessBoard3D) ChessBoard3D.init(sidebar, document.getElementById('btn-chess-scene'));
            if(window.BiometricAvatar3D) BiometricAvatar3D.init(sidebar, document.getElementById('btn-bio-scene'));
            if(window.MoodboardWorld3D) MoodboardWorld3D.init(sidebar, document.getElementById('btn-mood-scene'));
            if(window.Molecule3D) Molecule3D.init(sidebar, document.getElementById('btn-molecule-scene'));
            if(window.WebSocketLive3D) WebSocketLive3D.init(sidebar, document.getElementById('btn-wslive-scene'));
            if(window.Story3D) Story3D.init(sidebar, document.getElementById('btn-story-scene'));
            if(window.CrystalGen3D) CrystalGen3D.init(sidebar, document.getElementById('btn-crystal-scene'));
            if(window.BotanyLSystem3D) BotanyLSystem3D.init(sidebar, document.getElementById('btn-botany-scene'));
            if(window.CellularAutomata3D) CellularAutomata3D.init(sidebar, document.getElementById('btn-automata-scene'));
            if(window.KineticTypography3D) KineticTypography3D.init(sidebar, document.getElementById('btn-kintypo-scene'));
            if(window.GalaxyBuilder3D) GalaxyBuilder3D.init(sidebar, document.getElementById('btn-galaxy-scene'));
            if(window.SciFiSpaceship3D) SciFiSpaceship3D.init(sidebar, document.getElementById('btn-spaceship-scene'));
            if(window.RpgDungeon3D) RpgDungeon3D.init(sidebar, document.getElementById('btn-dungeon-scene'));
            if(window.WeatherEvent3D) WeatherEvent3D.init(sidebar, document.getElementById('btn-weather-scene'));
            if(window.ImpossibleGeometry3D) ImpossibleGeometry3D.init(sidebar, document.getElementById('btn-impossible-scene'));
            if(window.PapercraftWorld3D) PapercraftWorld3D.init(sidebar, document.getElementById('btn-papercraft-scene'));
            if(window.ForceShield3D) ForceShield3D.init(sidebar, document.getElementById('btn-shield-scene'));
            if(window.CyberCity3D) CyberCity3D.init(sidebar, document.getElementById('btn-cybercity-scene'));
            if(window.QuantumFluids3D) QuantumFluids3D.init(sidebar, document.getElementById('btn-fluid-scene'));
            if(window.TimeLapse4D) TimeLapse4D.init(sidebar, document.getElementById('btn-timelapse-scene'));
            if(window.ProductShowcase3D) ProductShowcase3D.init(sidebar, document.getElementById('btn-product-scene'));
            if(window.SocialMediaRoom3D) SocialMediaRoom3D.init(sidebar, document.getElementById('btn-social-scene'));
            if(window.GitRepoCity3D) GitRepoCity3D.init(sidebar, document.getElementById('btn-gitrepo-scene'));
            if(window.WebARPortal3D) WebARPortal3D.init(sidebar, document.getElementById('btn-webar-scene'));
            if(window.TextToScene3D) TextToScene3D.init(sidebar, document.getElementById('btn-text2scene-scene'));
            
            // Ultra Modules
            if(window.IceTerrain3D) IceTerrain3D.init(sidebar, document.getElementById('btn-iceterrain-scene'));
            if(window.LavaWorld3D) LavaWorld3D.init(sidebar, document.getElementById('btn-lavaworld-scene'));
            if(window.OceanWave3D) OceanWave3D.init(sidebar, document.getElementById('btn-oceanwave-scene'));
            if(window.MechRobot3D) MechRobot3D.init(sidebar, document.getElementById('btn-mechrobot-scene'));
            if(window.AncientArch3D) AncientArch3D.init(sidebar, document.getElementById('btn-ancientarch-scene'));
            if(window.LegoCity3D) LegoCity3D.init(sidebar, document.getElementById('btn-legocity-scene'));
            if(window.DataGlobe3D) DataGlobe3D.init(sidebar, document.getElementById('btn-dataglobe-scene'));
            if(window.HoloHUD3D) HoloHUD3D.init(sidebar, document.getElementById('btn-holohud-scene'));
            if(window.MaskSculptor3D) MaskSculptor3D.init(sidebar, document.getElementById('btn-masksculptor-scene'));
            if(window.Instrument3D) Instrument3D.init(sidebar, document.getElementById('btn-instrument-scene'));
            if(window.ChemReaction3D) ChemReaction3D.init(sidebar, document.getElementById('btn-chemreaction-scene'));
            if(window.Anatomy3D) Anatomy3D.init(sidebar, document.getElementById('btn-anatomy-scene'));
            if(window.HeroForge3D) HeroForge3D.init(sidebar, document.getElementById('btn-heroforge-scene'));
            if(window.SteampunkChrono3D) SteampunkChrono3D.init(sidebar, document.getElementById('btn-steampunk-scene'));
            if(window.SteampunkChronoPro3D) SteampunkChronoPro3D.init(sidebar, document.getElementById('btn-steampunk-pro-scene'));
            if(window.ClockUltra3D) ClockUltra3D.init(sidebar, document.getElementById('btn-clockultra-scene'));
        }
    };
    if(!window.THREE || !window.THREE.TransformControls || !window.THREE.GLTFLoader) {
        const loadScript = (url, cb) => { const s = document.createElement('script'); s.src = url; s.onload = cb; document.head.appendChild(s); };
        scriptsToLoad.forEach(src => loadScript(src, checkStart));
    } else {
        init3D(); setupEvents();
        const sidebar = document.getElementById('se-tools-sidebar');
        if(window.MathSurface3D) MathSurface3D.init(sidebar, document.getElementById('btn-math-scene'));
        if(window.DataChart3D) DataChart3D.init(sidebar, document.getElementById('btn-chart-scene'));
        if(window.WebcamAvatar3D) WebcamAvatar3D.init(sidebar, document.getElementById('btn-webcam-scene'));
        if(window.ShaderEditor3D) ShaderEditor3D.init(sidebar, document.getElementById('btn-shader-scene'));
        if(window.Starmap3D) Starmap3D.init(sidebar, document.getElementById('btn-star-scene'));
        if(window.KeyframeAnimator3D) KeyframeAnimator3D.init(sidebar, document.getElementById('btn-kf-scene'));
        if(window.VoiceSculpture3D) VoiceSculpture3D.init(sidebar, document.getElementById('btn-voice-scene'));
        if(window.QRLabyrinth3D) QRLabyrinth3D.init(sidebar, document.getElementById('btn-qr-labyrinth-scene'));
        if(window.LocationTerrain3D) LocationTerrain3D.init(sidebar, document.getElementById('btn-terrain-scene'));
        if(window.DocGallery3D) DocGallery3D.init(sidebar, document.getElementById('btn-gallery-scene'));
        if(window.PdfGallery3D) PdfGallery3D.init(sidebar, document.getElementById('btn-pdf-scene'));
        if(window.LogicTree3D) LogicTree3D.init(sidebar, document.getElementById('btn-tree-scene'));
        if(window.NeonHandwriting3D) NeonHandwriting3D.init(sidebar, document.getElementById('btn-neon-scene'));
        if(window.CsvChart3D) CsvChart3D.init(sidebar, document.getElementById('btn-csv-scene'));
        if(window.WebNetwork3D) WebNetwork3D.init(sidebar, document.getElementById('btn-webnet-scene'));
        if(window.PixelArtVoxel3D) PixelArtVoxel3D.init(sidebar, document.getElementById('btn-pixel-scene'));
        if(window.JsonDashboard3D) JsonDashboard3D.init(sidebar, document.getElementById('btn-jsonlive-scene'));
        if(window.DnaHelix3D) DnaHelix3D.init(sidebar, document.getElementById('btn-dna-scene'));
        if(window.GeoGlobe3D) GeoGlobe3D.init(sidebar, document.getElementById('btn-geo-scene'));
        if(window.PaletteWorld3D) PaletteWorld3D.init(sidebar, document.getElementById('btn-palette-scene'));
        if(window.SentimentLandscape3D) SentimentLandscape3D.init(sidebar, document.getElementById('btn-sentiment-scene'));
        if(window.FractalGenerator3D) FractalGenerator3D.init(sidebar, document.getElementById('btn-fractal-scene'));
        if(window.MidiArch3D) MidiArch3D.init(sidebar, document.getElementById('btn-midi-scene'));
        if(window.NeuralNet3D) NeuralNet3D.init(sidebar, document.getElementById('btn-neural-scene'));
        if(window.TimelineRiver3D) TimelineRiver3D.init(sidebar, document.getElementById('btn-timeline-scene'));
        if(window.ChessBoard3D) ChessBoard3D.init(sidebar, document.getElementById('btn-chess-scene'));
        if(window.BiometricAvatar3D) BiometricAvatar3D.init(sidebar, document.getElementById('btn-bio-scene'));
        if(window.MoodboardWorld3D) MoodboardWorld3D.init(sidebar, document.getElementById('btn-mood-scene'));
        if(window.Molecule3D) Molecule3D.init(sidebar, document.getElementById('btn-molecule-scene'));
        if(window.WebSocketLive3D) WebSocketLive3D.init(sidebar, document.getElementById('btn-wslive-scene'));
        if(window.Story3D) Story3D.init(sidebar, document.getElementById('btn-story-scene'));
        if(window.CrystalGen3D) CrystalGen3D.init(sidebar, document.getElementById('btn-crystal-scene'));
        if(window.BotanyLSystem3D) BotanyLSystem3D.init(sidebar, document.getElementById('btn-botany-scene'));
        if(window.CellularAutomata3D) CellularAutomata3D.init(sidebar, document.getElementById('btn-automata-scene'));
        if(window.KineticTypography3D) KineticTypography3D.init(sidebar, document.getElementById('btn-kintypo-scene'));
        if(window.GalaxyBuilder3D) GalaxyBuilder3D.init(sidebar, document.getElementById('btn-galaxy-scene'));
        if(window.SciFiSpaceship3D) SciFiSpaceship3D.init(sidebar, document.getElementById('btn-spaceship-scene'));
        if(window.RpgDungeon3D) RpgDungeon3D.init(sidebar, document.getElementById('btn-dungeon-scene'));
        if(window.WeatherEvent3D) WeatherEvent3D.init(sidebar, document.getElementById('btn-weather-scene'));
        if(window.ImpossibleGeometry3D) ImpossibleGeometry3D.init(sidebar, document.getElementById('btn-impossible-scene'));
        if(window.PapercraftWorld3D) PapercraftWorld3D.init(sidebar, document.getElementById('btn-papercraft-scene'));
        if(window.ForceShield3D) ForceShield3D.init(sidebar, document.getElementById('btn-shield-scene'));
        if(window.CyberCity3D) CyberCity3D.init(sidebar, document.getElementById('btn-cybercity-scene'));
        if(window.QuantumFluids3D) QuantumFluids3D.init(sidebar, document.getElementById('btn-fluid-scene'));
        if(window.TimeLapse4D) TimeLapse4D.init(sidebar, document.getElementById('btn-timelapse-scene'));
        if(window.ProductShowcase3D) ProductShowcase3D.init(sidebar, document.getElementById('btn-product-scene'));
        if(window.SocialMediaRoom3D) SocialMediaRoom3D.init(sidebar, document.getElementById('btn-social-scene'));
        if(window.GitRepoCity3D) GitRepoCity3D.init(sidebar, document.getElementById('btn-gitrepo-scene'));
        if(window.WebARPortal3D) WebARPortal3D.init(sidebar, document.getElementById('btn-webar-scene'));
        if(window.TextToScene3D) TextToScene3D.init(sidebar, document.getElementById('btn-text2scene-scene'));
        
        // Ultra Modules
        if(window.IceTerrain3D) IceTerrain3D.init(sidebar, document.getElementById('btn-iceterrain-scene'));
        if(window.LavaWorld3D) LavaWorld3D.init(sidebar, document.getElementById('btn-lavaworld-scene'));
        if(window.OceanWave3D) OceanWave3D.init(sidebar, document.getElementById('btn-oceanwave-scene'));
        if(window.MechRobot3D) MechRobot3D.init(sidebar, document.getElementById('btn-mechrobot-scene'));
        if(window.AncientArch3D) AncientArch3D.init(sidebar, document.getElementById('btn-ancientarch-scene'));
        if(window.LegoCity3D) LegoCity3D.init(sidebar, document.getElementById('btn-legocity-scene'));
        if(window.DataGlobe3D) DataGlobe3D.init(sidebar, document.getElementById('btn-dataglobe-scene'));
        if(window.HoloHUD3D) HoloHUD3D.init(sidebar, document.getElementById('btn-holohud-scene'));
        if(window.MaskSculptor3D) MaskSculptor3D.init(sidebar, document.getElementById('btn-masksculptor-scene'));
        if(window.Instrument3D) Instrument3D.init(sidebar, document.getElementById('btn-instrument-scene'));
        if(window.ChemReaction3D) ChemReaction3D.init(sidebar, document.getElementById('btn-chemreaction-scene'));
        if(window.Anatomy3D) Anatomy3D.init(sidebar, document.getElementById('btn-anatomy-scene'));
        if(window.HeroForge3D) HeroForge3D.init(sidebar, document.getElementById('btn-heroforge-scene'));
        if(window.SteampunkChrono3D) SteampunkChrono3D.init(sidebar, document.getElementById('btn-steampunk-scene'));
        if(window.SteampunkChronoPro3D) SteampunkChronoPro3D.init(sidebar, document.getElementById('btn-steampunk-pro-scene'));
        if(window.ClockUltra3D) ClockUltra3D.init(sidebar, document.getElementById('btn-clockultra-scene'));
    }

    const resize = () => {
        canvasWidth = canvas.clientWidth;
        canvasHeight = canvas.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        if(camera && renderer) {
            camera.aspect = mainPane.clientWidth / mainPane.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mainPane.clientWidth, mainPane.clientHeight);
        }
    };
    
    const resizeObserver = new ResizeObserver(() => { if (container.style.display === 'flex') resize(); });
    resizeObserver.observe(container);

    toggleBtn.onclick = () => {
      const isVisible = container.style.display === 'flex';
      container.style.display = isVisible ? 'none' : 'flex';
      toggleBtn.style.background = isVisible ? '' : 'var(--bg-deep)';
      if (!isVisible) { resize(); }
    };

    container.addEventListener('hide', () => {
        container.style.display = 'none';
        toggleBtn.style.background = '';
        resize();
    });
  }

  function buildEnv(type, scn) {
      if(!scn) return;
      
      function drawProceduralBg(canvas, bgType, time) {
          const ctx = canvas.getContext('2d');
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);
          
          if (bgType === 'preset_fireplace') {
              // Dark background with warm glow
              const grad = ctx.createRadialGradient(w/2, h, 10, w/2, h, w);
              grad.addColorStop(0, '#4a1500');
              grad.addColorStop(0.5, '#1e0500');
              grad.addColorStop(1, '#050200');
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, w, h);
              
              if (!canvas._fireParticles) {
                  canvas._fireParticles = [];
                  for (let i = 0; i < 50; i++) {
                      canvas._fireParticles.push({
                          x: w/2 + (Math.random() - 0.5) * w * 0.5,
                          y: h + Math.random() * h * 0.5,
                          r: 6 + Math.random() * 12,
                          vy: 1.5 + Math.random() * 2.5,
                          vx: (Math.random() - 0.5) * 0.8,
                          life: Math.random()
                      });
                  }
              }
              
              canvas._fireParticles.forEach(p => {
                  p.y -= p.vy;
                  p.x += p.vx;
                  p.life -= 0.012;
                  
                  if (p.life <= 0 || p.y < -20) {
                      p.x = w/2 + (Math.random() - 0.5) * w * 0.5;
                      p.y = h + 10;
                      p.r = 6 + Math.random() * 12;
                      p.vy = 1.5 + Math.random() * 2.5;
                      p.life = 1.0;
                  }
                  
                  const r = p.r * p.life;
                  if (r > 0) {
                      ctx.beginPath();
                      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                      
                      const alpha = p.life * 0.7;
                      let color = 'rgba(255, 215, 0, ' + alpha + ')'; // gold/yellow
                      if (p.life < 0.35) {
                          color = 'rgba(220, 38, 38, ' + alpha + ')'; // red
                      } else if (p.life < 0.65) {
                          color = 'rgba(249, 115, 22, ' + alpha + ')'; // orange
                      }
                      ctx.fillStyle = color;
                      ctx.fill();
                  }
              });
              
          } else if (bgType === 'preset_river') {
              // Flowing river background
              ctx.fillStyle = '#061a23';
              ctx.fillRect(0, 0, w, h);
              
              // Draw animated wave lines
              ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
              ctx.lineWidth = 3;
              for (let i = 0; i < 8; i++) {
                  ctx.beginPath();
                  const yOffset = i * (h / 8) + 20;
                  for (let x = 0; x <= w; x += 15) {
                      const angle = (x * 0.015) + (time * 0.0035) + i * 1.5;
                      const y = yOffset + Math.sin(angle) * 15;
                      if (x === 0) ctx.moveTo(x, y);
                      else ctx.lineTo(x, y);
                  }
                  ctx.stroke();
              }
              
              // Sparkles
              if (!canvas._sparkles) {
                  canvas._sparkles = [];
                  for (let i = 0; i < 25; i++) {
                      canvas._sparkles.push({
                          x: Math.random() * w,
                          y: Math.random() * h,
                          size: 1.5 + Math.random() * 2.5,
                          speed: 0.015 + Math.random() * 0.02,
                          phase: Math.random() * Math.PI
                      });
                  }
              }
              
              canvas._sparkles.forEach(s => {
                  s.phase += s.speed;
                  const alpha = Math.abs(Math.sin(s.phase)) * 0.5;
                  ctx.fillStyle = 'rgba(224, 242, 254, ' + alpha + ')';
                  ctx.beginPath();
                  ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                  ctx.fill();
                  
                  s.x -= 0.8;
                  if (s.x < 0) s.x = w;
              });
              
          } else if (bgType === 'preset_ocean') {
              // Deep blue ocean gradient
              const grad = ctx.createLinearGradient(0, 0, 0, h);
              grad.addColorStop(0, '#001a33');
              grad.addColorStop(0.5, '#00264d');
              grad.addColorStop(1, '#000f1f');
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, w, h);
              
              // Draw wave tides
              ctx.fillStyle = 'rgba(14, 165, 233, 0.06)';
              for (let i = 0; i < 4; i++) {
                  ctx.beginPath();
                  ctx.moveTo(0, h);
                  const yBase = h * 0.5 + i * 25;
                  for (let x = 0; x <= w; x += 15) {
                      const angle = (x * 0.01) + (time * 0.0012) + i * 2.5;
                      const y = yBase + Math.sin(angle) * 25;
                      ctx.lineTo(x, y);
                  }
                  ctx.lineTo(w, h);
                  ctx.closePath();
                  ctx.fill();
              }
              
              // Bubbles
              if (!canvas._bubbles) {
                  canvas._bubbles = [];
                  for (let i = 0; i < 30; i++) {
                      canvas._bubbles.push({
                          x: Math.random() * w,
                          y: h + Math.random() * 50,
                          r: 3 + Math.random() * 5,
                          vy: 0.6 + Math.random() * 1.0,
                          vx: (Math.random() - 0.5) * 0.3
                      });
                  }
              }
              
              canvas._bubbles.forEach(b => {
                  b.y -= b.vy;
                  b.x += b.vx;
                  if (b.y < -10) {
                      b.y = h + 10;
                      b.x = Math.random() * w;
                  }
                  ctx.strokeStyle = 'rgba(186, 230, 253, 0.25)';
                  ctx.lineWidth = 1.5;
                  ctx.beginPath();
                  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                  ctx.stroke();
              });
          }
      }

      if (scn._bgVideo) {
          try {
              scn._bgVideo.pause();
              scn._bgVideo.src = "";
              scn._bgVideo.load();
          } catch(e) {}
          scn._bgVideo = null;
      }
      if (scn.bgPlane) {
          try {
              if (scn.bgPlane.parent) {
                  scn.bgPlane.parent.remove(scn.bgPlane);
              } else {
                  scn.remove(scn.bgPlane);
              }
          } catch(e) {}
          scn.bgPlane = null;
      }
      if(scn.envGroup) { scn.remove(scn.envGroup); }
      if(bgGroup) { bgGroup = null; } // Reference cleanup
      scn.fog = null;
      scn.background = null;
      const grp = new THREE.Group();
      scn.envGroup = grp;
      scn.add(grp);
      if(!scn.animCbs) scn.animCbs = [];
      // Only remove environment-specific callbacks, preserve audio/user callbacks
      else scn.animCbs = scn.animCbs.filter(cb => !cb._isEnv);
      // Helper: add an env-tagged callback
      const _addEnvCb = (fn) => { fn._isEnv = true; scn.animCbs.push(fn); };

      if (type === 'custom_photo' || type === 'custom_video' || type.startsWith('preset_')) {
          let mediaUrl = '';
          let mediaType = '';
          
          if (type === 'custom_photo') {
              mediaUrl = typeof customMediaDataUrl !== 'undefined' ? customMediaDataUrl : '';
              mediaType = 'image';
          } else if (type === 'custom_video') {
              mediaUrl = typeof customMediaDataUrl !== 'undefined' ? customMediaDataUrl : '';
              mediaType = 'video';
          } else {
              mediaUrl = 'procedural';
              mediaType = 'procedural';
          }
          
          if (mediaUrl) {
              const bgGeo = new THREE.PlaneGeometry(1, 1);
              let bgMat;
              let bgTex;
              let videoEl = null;
              let offCanvas = null;
              let mediaAspect = 16/9; // default fallback
              
              const adjustFit = () => {
                  const cam = typeof camera !== 'undefined' ? camera : null;
                  if (!cam || !bgTex) return;
                  const aspectScreen = cam.aspect;
                  bgTex.matrixAutoUpdate = true;
                  if (aspectScreen > mediaAspect) {
                      bgTex.repeat.set(1, mediaAspect / aspectScreen);
                      bgTex.offset.set(0, (1 - bgTex.repeat.y) / 2);
                  } else {
                      bgTex.repeat.set(aspectScreen / mediaAspect, 1);
                      bgTex.offset.set((1 - bgTex.repeat.x) / 2, 0);
                  }
              };
              
              if (mediaType === 'procedural') {
                  offCanvas = document.createElement('canvas');
                  offCanvas.width = 512;
                  offCanvas.height = 512;
                  bgTex = new THREE.CanvasTexture(offCanvas);
                  bgTex.minFilter = THREE.LinearFilter;
                  bgTex.magFilter = THREE.LinearFilter;
                  mediaAspect = 1.0;
              } else if (mediaType === 'video') {
                  videoEl = document.createElement('video');
                  videoEl.src = mediaUrl;
                  if (!mediaUrl.startsWith('data:')) {
                      videoEl.crossOrigin = 'anonymous';
                  }
                  videoEl.loop = true;
                  videoEl.muted = true;
                  videoEl.playsInline = true;
                  videoEl.autoplay = true;
                  scn._bgVideo = videoEl;
                  
                  videoEl.addEventListener('loadedmetadata', () => {
                      mediaAspect = videoEl.videoWidth / videoEl.videoHeight;
                      adjustFit();
                  });
                  
                  videoEl.play().catch(err => {
                      console.warn("Autoplay blocked, waiting for interaction", err);
                      const playOnInteract = () => {
                          videoEl.play().catch(() => {});
                          document.removeEventListener('click', playOnInteract);
                      };
                      document.addEventListener('click', playOnInteract);
                  });
                  
                  bgTex = new THREE.VideoTexture(videoEl);
                  bgTex.minFilter = THREE.LinearFilter;
                  bgTex.magFilter = THREE.LinearFilter;
              } else {
                  const loader = new THREE.TextureLoader();
                  bgTex = loader.load(mediaUrl, (texture) => {
                      if (texture.image) {
                          mediaAspect = texture.image.width / texture.image.height;
                          adjustFit();
                      }
                  });
              }
              
              bgMat = new THREE.MeshBasicMaterial({
                  map: bgTex,
                  depthWrite: false,
                  depthTest: false,
                  transparent: false
              });
              
              const mesh = new THREE.Mesh(bgGeo, bgMat);
              mesh.renderOrder = -99999;
              mesh.frustumCulled = false;
              grp.add(mesh);
              scn.bgPlane = mesh;
              
              let currentBrightness = 1.0;
              const brightInput = document.getElementById('se-scene-brightness');
              if (brightInput) {
                  currentBrightness = parseFloat(brightInput.value);
              }
              bgMat.color.setScalar(currentBrightness);
              
              const updateBg = () => {
                  const cam = typeof camera !== 'undefined' ? camera : null;
                  if (!cam || !mesh) return;
                  
                  const dist = 3000; 
                  const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
                  mesh.position.copy(cam.position).addScaledVector(dir, dist);
                  mesh.quaternion.copy(cam.quaternion);
                  
                  const height = 2 * Math.tan(cam.fov * Math.PI / 360) * dist;
                  const width = height * cam.aspect;
                  mesh.scale.set(width, height, 1);
                  
                  if (mediaType === 'procedural' && offCanvas) {
                      drawProceduralBg(offCanvas, type, Date.now());
                      bgTex.needsUpdate = true;
                  }
                  
                  adjustFit();
              };
              
              updateBg._isEnv = true;
              _addEnvCb(updateBg);
          }
      } else if(type === 'studio') {
          const grid = new THREE.GridHelper(1000, 100, 0x334155, 0x0f172a);
          grid.position.y = -20; grp.add(grid);
      } else if(type === 'cosmos') {
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<4000; i++) pos.push((Math.random()-0.5)*2000, (Math.random()-0.5)*2000, (Math.random()-0.5)*2000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const mat = new THREE.PointsMaterial({color: 0xffffff, size: 1.5, transparent: true, opacity: 0.8});
          const stars = new THREE.Points(geo, mat); grp.add(stars);
          const envCb = (w) => { stars.rotation.y += 0.0002*w; stars.rotation.x += 0.0001*w; };
          envCb._isEnv = true;
          _addEnvCb(envCb);
      } else if(type === 'solar') {
          const starsGeo = new THREE.BufferGeometry(); const starsPos = [];
          for(let i=0; i<2000; i++) starsPos.push((Math.random()-0.5)*2000, (Math.random()-0.5)*2000, (Math.random()-0.5)*2000);
          starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starsPos, 3));
          grp.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({color: 0xffffff, size: 1})));
          
          const sun = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 32), new THREE.MeshBasicMaterial({color: 0xffaa00}));
          sun.position.set(-200, 100, -400); grp.add(sun);
          const sunLight = new THREE.PointLight(0xffaa00, 2, 2000);
          sun.add(sunLight);
          
          const colors = [0x888888, 0xe5e595, 0x4b90e2, 0xdd4422, 0xdbca9b];
          for(let i=0; i<5; i++) {
              const p = new THREE.Mesh(new THREE.SphereGeometry(10+Math.random()*15, 32, 32), new THREE.MeshStandardMaterial({color: colors[i], roughness:0.7}));
              const orbit = new THREE.Group(); orbit.position.copy(sun.position);
              p.position.x = 120 + i*100; orbit.add(p); grp.add(orbit);
              const speed = 0.005 / (i+1);
              _addEnvCb((w) => { orbit.rotation.y += speed*w; p.rotation.y += 0.02*w; });
          }
      } else if(type === 'storm') {
          scn.fog = new THREE.FogExp2(0x111111, 0.002);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<3000; i++) pos.push((Math.random()-0.5)*1000, Math.random()*1000, (Math.random()-0.5)*1000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const rain = new THREE.Points(geo, new THREE.PointsMaterial({color: 0x88aaff, size: 2, transparent:true, opacity:0.6}));
          grp.add(rain);
          const flash = new THREE.DirectionalLight(0xffffff, 0); flash.position.set(0,500,0); grp.add(flash);
          _addEnvCb((w) => {
              const p = rain.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { p[i] -= 25*w; if(p[i]< -100) p[i]=1000; }
              rain.geometry.attributes.position.needsUpdate = true;
              flash.intensity = Math.random() > 0.98 ? 4 : 0;
          });
      } else if(type === 'ocean') {
          scn.fog = new THREE.FogExp2(0x023e8a, 0.0015);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<1500; i++) pos.push((Math.random()-0.5)*800, (Math.random()-0.5)*800, (Math.random()-0.5)*800);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const bubbles = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xffffff, size: 3, transparent:true, opacity:0.4}));
          grp.add(bubbles);
          _addEnvCb((w) => {
              const p = bubbles.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { 
                  p[i] += 1.5*w; if(p[i]>400) p[i]=-400; 
                  p[i-1] += Math.sin(Date.now()*0.002 + i)*0.3*w; 
              }
              bubbles.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'matrix') {
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*1000, (Math.random()-0.5)*1000, (Math.random()-0.5)*1000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const data = new THREE.Points(geo, new THREE.PointsMaterial({color: 0x00ff00, size: 4}));
          grp.add(data);
          const grid = new THREE.GridHelper(2000, 40, 0x00ff00, 0x003300); grid.position.y = -100; grp.add(grid);
          _addEnvCb((w) => {
              const p = data.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { p[i] -= 10*w; if(p[i]< -300) p[i]=700; }
              data.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'sunset') {
          const grid = new THREE.GridHelper(2000, 40, 0xff00ff, 0xff00ff);
          grid.position.y = -50; grp.add(grid);
          scn.fog = new THREE.FogExp2(0x2a0845, 0.002);
          const sun = new THREE.Mesh(new THREE.CircleGeometry(400, 64), new THREE.MeshBasicMaterial({color: 0xff5e62, fog: false}));
          sun.position.set(0, 50, -1000); grp.add(sun);
          const sLight = new THREE.DirectionalLight(0xff5e62, 2); sLight.position.set(0, 50, -100); grp.add(sLight);
          _addEnvCb((w) => {
              grid.position.z += 5*w; if(grid.position.z > 50) grid.position.z = 0;
          });
      } else if(type === 'hologram') {
          const gridXZ = new THREE.GridHelper(1000, 50, 0x00ffff, 0x003333); gridXZ.position.y = -50; grp.add(gridXZ);
          const gridXY = new THREE.GridHelper(1000, 50, 0x00ffff, 0x003333); gridXY.rotation.x = Math.PI/2; gridXY.position.z = -500; grp.add(gridXY);
          const gridYZ = new THREE.GridHelper(1000, 50, 0x00ffff, 0x003333); gridYZ.rotation.z = Math.PI/2; gridYZ.position.x = -500; grp.add(gridYZ);
          const lLight = new THREE.PointLight(0x00ffff, 2, 800); lLight.position.set(0, 100, 0); grp.add(lLight);
      } else if(type === 'forest') {
          scn.fog = new THREE.FogExp2(0x0a1c11, 0.003);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<1000; i++) pos.push((Math.random()-0.5)*800, (Math.random())*400, (Math.random()-0.5)*800);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const fireflies = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xaaff00, size: 3, transparent: true, opacity: 0.8}));
          grp.add(fireflies);
          const mLight = new THREE.HemisphereLight(0x1a3322, 0x0a1c11, 1); grp.add(mLight);
          _addEnvCb((w) => {
              const p = fireflies.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { 
                  p[i] += Math.sin(Date.now()*0.001 + i)*0.5*w;
                  p[i-1] += Math.cos(Date.now()*0.001 + i)*0.5*w;
              }
              fireflies.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'mars') {
          scn.fog = new THREE.FogExp2(0x8b3a3a, 0.002);
          const grid = new THREE.GridHelper(2000, 40, 0x552222, 0x331111); grid.position.y = -50; grp.add(grid);
          const sun = new THREE.DirectionalLight(0xffaa88, 1.5); sun.position.set(500, 300, -500); grp.add(sun);
          const sLight = new THREE.AmbientLight(0x442222); grp.add(sLight);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*1500, Math.random()*500, (Math.random()-0.5)*1500);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const dust = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xcc7744, size: 2, transparent: true, opacity: 0.5}));
          grp.add(dust);
          _addEnvCb((w) => {
              const p = dust.geometry.attributes.position.array;
              for(let i=0; i<p.length; i+=3) { p[i] -= 2*w; if(p[i]< -750) p[i]=750; }
              dust.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'tokyo') {
          scn.fog = new THREE.FogExp2(0x050510, 0.003);
          const grid = new THREE.GridHelper(2000, 50, 0xff00aa, 0x00aaff); grid.position.y = -50; grp.add(grid);
          const pl1 = new THREE.PointLight(0xff00aa, 2, 800); pl1.position.set(-200, 100, -200); grp.add(pl1);
          const pl2 = new THREE.PointLight(0x00aaff, 2, 800); pl2.position.set(200, 100, 200); grp.add(pl2);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*1000, Math.random()*1000, (Math.random()-0.5)*1000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const rain = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xffffff, size: 2, transparent: true, opacity: 0.4}));
          grp.add(rain);
          _addEnvCb((w) => {
              const p = rain.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { p[i] -= 20*w; if(p[i]< -50) p[i]=950; }
              rain.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'blackhole') {
          const bhGrp = new THREE.Group(); bhGrp.position.set(0, 50, -600); grp.add(bhGrp);
          const hole = new THREE.Mesh(new THREE.SphereGeometry(80, 32, 32), new THREE.MeshBasicMaterial({color: 0x000000}));
          bhGrp.add(hole);
          const disk = new THREE.Mesh(new THREE.RingGeometry(100, 300, 64), new THREE.MeshBasicMaterial({color: 0xffaa00, side: THREE.DoubleSide, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending}));
          disk.rotation.x = Math.PI/2 - 0.2; bhGrp.add(disk);
          const pl = new THREE.PointLight(0xffcc88, 3, 2000); bhGrp.add(pl);
          _addEnvCb((w) => { disk.rotation.z -= 0.01*w; });
      } else if(type === 'bright_studio') {
          scn.background = new THREE.Color(0xf1f5f9);
          // Grid helper removed to prevent clock intersection on zoom
          const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
          light1.position.set(-150, 300, 150);
          grp.add(light1);
          const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
          light2.position.set(150, 300, -150);
          grp.add(light2);
          const light3 = new THREE.AmbientLight(0xffffff, 0.8);
          grp.add(light3);
      } else if(type === 'cherry_blossom') {
          scn.background = new THREE.Color(0xfff0f6);
          scn.fog = new THREE.FogExp2(0xfff0f6, 0.0012);
          const light1 = new THREE.DirectionalLight(0xffb7c5, 1.8);
          light1.position.set(200, 400, 200);
          grp.add(light1);
          const light2 = new THREE.AmbientLight(0xffe3e8, 1.0);
          grp.add(light2);

          const geo = new THREE.BufferGeometry();
          const pos = [];
          const data = [];
          for (let i = 0; i < 150; i++) {
              pos.push((Math.random() - 0.5) * 800, Math.random() * 400, (Math.random() - 0.5) * 800);
              data.push({
                  speedY: 0.5 + Math.random() * 0.8,
                  speedX: -0.2 + Math.random() * 0.4,
                  phase: Math.random() * Math.PI * 2
              });
          }
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          
          const petalCanvas = document.createElement('canvas');
          petalCanvas.width = 16;
          petalCanvas.height = 16;
          const pCtx = petalCanvas.getContext('2d');
          pCtx.fillStyle = '#ffb7c5';
          pCtx.beginPath();
          pCtx.arc(8, 8, 6, 0, Math.PI * 2);
          pCtx.fill();
          const petalTex = new THREE.CanvasTexture(petalCanvas);
          const mat = new THREE.PointsMaterial({
              size: 5,
              map: petalTex,
              transparent: true,
              opacity: 0.85,
              depthWrite: false
          });
          const petals = new THREE.Points(geo, mat);
          grp.add(petals);

          _addEnvCb((w) => {
              const p = petals.geometry.attributes.position.array;
              for (let i = 0; i < p.length; i += 3) {
                  const idx = i / 3;
                  const item = data[idx];
                  p[i + 1] -= item.speedY * w;
                  item.phase += 0.02 * w;
                  p[i] += (Math.sin(item.phase) * 0.2 + item.speedX) * w;
                  if (p[i + 1] < -50) {
                      p[i + 1] = 350;
                      p[i] = (Math.random() - 0.5) * 800;
                  }
              }
              petals.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'crystal_oasis') {
          scn.background = new THREE.Color(0xe0f7fa);
          scn.fog = new THREE.FogExp2(0xe0f7fa, 0.001);
          const light1 = new THREE.DirectionalLight(0x80deea, 2.0);
          light1.position.set(-200, 300, 100);
          grp.add(light1);
          const light2 = new THREE.AmbientLight(0xffffff, 1.2);
          grp.add(light2);

          const crystals = [];
          const cryMat = new THREE.MeshPhysicalMaterial({
              color: 0x26c6da,
              emissive: 0x006064,
              roughness: 0.1,
              metalness: 0.1,
              transmission: 0.6,
              thickness: 2.0,
              transparent: true,
              opacity: 0.7,
              side: THREE.DoubleSide
          });
          const cryGeo = new THREE.OctahedronGeometry(12, 0);

          for (let i = 0; i < 6; i++) {
              const mesh = new THREE.Mesh(cryGeo, cryMat);
              const angle = (i / 6) * Math.PI * 2;
              const r = 180 + Math.random() * 80;
              mesh.position.set(Math.cos(angle) * r, 20 + Math.random() * 60, Math.sin(angle) * r - 200);
              mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
              grp.add(mesh);
              crystals.push({
                  mesh: mesh,
                  rotSpeed: 0.005 + Math.random() * 0.01,
                  floatSpeed: 0.001 + Math.random() * 0.0015,
                  phase: Math.random() * Math.PI * 2,
                  baseY: mesh.position.y
              });
          }

          const sparklesGeo = new THREE.BufferGeometry();
          const sparklesPos = [];
          for (let i = 0; i < 300; i++) {
              sparklesPos.push((Math.random() - 0.5) * 1000, Math.random() * 400 - 50, (Math.random() - 0.5) * 1000);
          }
          sparklesGeo.setAttribute('position', new THREE.Float32BufferAttribute(sparklesPos, 3));
          const sparklesMat = new THREE.PointsMaterial({color: 0xe0f7fa, size: 2.5, transparent: true, opacity: 0.9});
          const sparkles = new THREE.Points(sparklesGeo, sparklesMat);
          grp.add(sparkles);

          _addEnvCb((w) => {
              crystals.forEach(c => {
                  c.mesh.rotation.y += c.rotSpeed * w;
                  c.mesh.rotation.x += c.rotSpeed * 0.5 * w;
                  c.phase += c.floatSpeed * w;
                  c.mesh.position.y = c.baseY + Math.sin(c.phase) * 15;
              });
              const p = sparkles.geometry.attributes.position.array;
              for (let i = 1; i < p.length; i += 3) {
                  p[i] += 0.8 * w;
                  if (p[i] > 350) p[i] = -50;
              }
              sparkles.geometry.attributes.position.needsUpdate = true;
          });
      } else if(type === 'aurora') {
          scn.background = new THREE.Color(0x030712);
          // Grid helper removed to prevent clock intersection on zoom
          const geo = new THREE.BufferGeometry(); const pos = []; const colors = [];
          for(let i=0; i<800; i++) {
              pos.push((Math.random()-0.5)*1200, Math.random()*400, (Math.random()-0.5)*1200);
              if(Math.random() > 0.5) { colors.push(0, 0.8, 1); } else { colors.push(0.1, 1, 0.5); }
          }
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
          const mat = new THREE.PointsMaterial({size: 4, vertexColors: true, transparent: true, opacity: 0.8});
          const auroraParticles = new THREE.Points(geo, mat); grp.add(auroraParticles);
          _addEnvCb((w) => {
              const p = auroraParticles.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) {
                  p[i] += Math.sin(Date.now()*0.001 + p[i-1])*0.2*w;
                  if(p[i] > 400) p[i] = 0;
              }
              auroraParticles.geometry.attributes.position.needsUpdate = true;
              auroraParticles.rotation.y += 0.0005*w;
          });
      } else if(type === 'heaven') {
          scn.background = new THREE.Color(0xfffbeb);
          // Grid helper removed to prevent clock intersection on zoom
          const gLight1 = new THREE.DirectionalLight(0xfff7ed, 1.8);
          gLight1.position.set(100, 300, 200);
          grp.add(gLight1);
          const gLight2 = new THREE.AmbientLight(0xffedd5, 1.0);
          grp.add(gLight2);
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<600; i++) {
              pos.push((Math.random()-0.5)*1000, Math.random()*500 - 100, (Math.random()-0.5)*1000);
          }
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const sparkles = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xfbbf24, size: 3, transparent: true, opacity: 0.9}));
          grp.add(sparkles);
          _addEnvCb((w) => {
              const p = sparkles.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) {
                  p[i] += 1.2*w;
                  if(p[i] > 400) p[i] = -100;
                  p[i-1] += Math.sin(Date.now()*0.002 + i)*0.3*w;
              }
              sparkles.geometry.attributes.position.needsUpdate = true;
              sparkles.rotation.y += 0.001*w;
          });
      }
      
      // BACKGROUND EFFECTS (Particles)
      if (currentBgEffect !== 'none') {
          const bGrp = new THREE.Group();
          if (currentBgEffect === 'stars') {
              const geo = new THREE.BufferGeometry(); const pos = [];
              for(let i=0; i<3000; i++) pos.push((Math.random()-0.5)*3000, (Math.random()-0.5)*3000, (Math.random()-0.5)*3000);
              geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
              const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, opacity: 0.8 });
              const stars = new THREE.Points(geo, mat); bGrp.add(stars);
              _addEnvCb((w) => { stars.rotation.y += 0.0005 * w; stars.rotation.z += 0.0002 * w; });
          } else if (currentBgEffect === 'rain') {
              const geo = new THREE.BufferGeometry(); const pos = [];
              for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*1500, Math.random()*1000, (Math.random()-0.5)*1500);
              geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
              const rain = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00ff00, size: 5, transparent: true, opacity: 0.5 }));
              bGrp.add(rain);
              _addEnvCb((w) => {
                  const p = rain.geometry.attributes.position.array;
                  for(let i=1; i<p.length; i+=3) { p[i] -= 15*w; if(p[i] < -500) p[i] = 1000; }
                  rain.geometry.attributes.position.needsUpdate = true;
              });
          } else if (currentBgEffect === 'dust') {
              const geo = new THREE.BufferGeometry(); const pos = [];
              for(let i=0; i<1000; i++) pos.push((Math.random()-0.5)*1000, (Math.random()-0.5)*1000, (Math.random()-0.5)*1000);
              geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
              const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xfacc15, size: 2, transparent: true, opacity: 0.4 }));
              bGrp.add(dust);
              _addEnvCb((w) => {
                  const p = dust.geometry.attributes.position.array;
                  for(let i=0; i<p.length; i+=3) { 
                      p[i] += Math.sin(Date.now()*0.001 + i)*0.2*w; 
                      p[i+1] += Math.cos(Date.now()*0.001 + i)*0.2*w; 
                  }
                  dust.geometry.attributes.position.needsUpdate = true;
              });
          }
          bgGroup = bGrp;
          grp.add(bGrp);
      }
  }

  function init3D() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, mainPane.clientWidth/mainPane.clientHeight || 1, 0.1, 5000);
      camera.position.set(0, 50, 200);
      renderer = new THREE.WebGLRenderer({antialias:true, alpha: false, preserveDrawingBuffer: true});
      renderer.setSize(mainPane.clientWidth || 500, mainPane.clientHeight || 500);
      renderer.setClearColor(0x050815, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '5';
      mainPane.appendChild(renderer.domElement);
      
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      
      transformControl = new THREE.TransformControls(camera, renderer.domElement);
      globalGroup = new THREE.Group();
      scene.add(globalGroup);

      window.addEventListener('mousemove', (e) => {
          const nx = (e.clientX / window.innerWidth) - 0.5;
          const ny = (e.clientY / window.innerHeight) - 0.5;
          targetCuParallaxY = nx * 0.4;
          targetCuParallaxX = ny * 0.4;
      });
      transformControl.addEventListener('dragging-changed', (e) => { controls.enabled = !e.value; });
      scene.add(transformControl);

      mainAmbientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(mainAmbientLight);
      mainHemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
      scene.add(mainHemiLight);
      
      mainDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainDirLight.position.set(100, 200, 200);
      mainDirLight.castShadow = true;
      mainDirLight.shadow.mapSize.width = 2048;
      mainDirLight.shadow.mapSize.height = 2048;
      scene.add(mainDirLight);
      
      buildEnv(currentEnv, scene);

      if(THREE.FontLoader) {
          new THREE.FontLoader().load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', 
              (font) => { loadedFont = font; },
              undefined,
              (err) => { console.warn("Failed to load editor default font from CDN:", err); }
          );
      }

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      let draggedHandName = null;
      let draggedModel = null;
      const dragPlane = new THREE.Plane();
      const worldPivot = new THREE.Vector3();
      const worldNormal = new THREE.Vector3();
      
      let isTimeTraveling = false;
      let timeTravelStartX = 0;
      
      renderer.domElement.addEventListener('pointerdown', (e) => {
          if(currentMode === 'draw') return;
          if(transformControl.dragging) return;
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          window._cuMouseNDC = { x: mouse.x, y: mouse.y };
          const intersects = raycaster.intersectObjects(globalGroup.children, true);
          if (intersects.length > 0) {
              let obj = intersects[0].object;
              if (obj.name === 'audioVizDecal') {
                  const model = models.find(m => m.format === 'clock-ultra');
                  const sp = model ? model.clockParts[0] : null;
                  if (sp && sp.radioEnabled) {
                      const uv = intersects[0].uv;
                      if (uv) {
                          const canvasX = uv.x * 256;
                          const canvasY = (1.0 - uv.y) * 256;
                          if (canvasX >= 78 && canvasX <= 178 && canvasY >= 52 && canvasY <= 82) {
                              if (canvasX <= 95) {
                                  sp.radioFrequency = Math.max(87.5, parseFloat((sp.radioFrequency - 0.1).toFixed(1)));
                              } else if (canvasX >= 161) {
                                  sp.radioFrequency = Math.min(108.0, parseFloat((sp.radioFrequency + 0.1).toFixed(1)));
                              } else {
                                  const fraction = (canvasX - 95) / (161 - 95);
                                  sp.radioFrequency = parseFloat((87.5 + fraction * (108.0 - 87.5)).toFixed(1));
                              }
                              if (window.ClockUltra3D && typeof window.ClockUltra3D.syncRadioFromModel === 'function') {
                                  window.ClockUltra3D.syncRadioFromModel(sp.radioFrequency);
                              }
                              return;
                          }
                      }
                  }
              }
              let handObj = null;
              let pusherName = null;
              let tempObj = obj;
              while(tempObj) {
                  if (tempObj.name === 'pusher_start_stop' || tempObj.name === 'pusher_reset') {
                      pusherName = tempObj.name;
                      break;
                  }
                  if (tempObj.name === 'hand_h' || tempObj.name === 'hand_m' || tempObj.name === 'hand_alarm') {
                      handObj = tempObj;
                      break;
                  }
                  tempObj = tempObj.parent;
              }
              if (pusherName) {
                  const model = models.find(m => m.format === 'clock-ultra');
                  if (model) {
                      if (pusherName === 'pusher_start_stop') {
                          model.chronoRunning = !model.chronoRunning;
                          model.pusherStartAnim = 1.0;
                      } else if (pusherName === 'pusher_reset') {
                          model.chronoRunning = false;
                          model.chronoTime = 0;
                          model.pusherResetAnim = 1.0;
                      }
                      if (window.ClockUltra3D && typeof window.ClockUltra3D.updateChronoUI === 'function') {
                          window.ClockUltra3D.updateChronoUI(model.chronoRunning);
                      }
                      return;
                  }
              }
              if (handObj) {
                  const model = models.find(m => m.format === 'clock-ultra');
                  if (model && model.importedMesh) {
                      const p0 = model.clockParts && model.clockParts[0];
                      if (p0 && (p0.timeTravelEnabled || handObj.name === 'hand_alarm')) {
                          draggedHandName = handObj.name;
                          draggedModel = model;
                          if (draggedHandName !== 'hand_alarm') {
                              draggedModel._isTimeTraveling = true;
                          }
                          controls.enabled = false;
                          
                          const handsGroup = model.importedMesh.getObjectByName('handsGroup');
                          if (handsGroup) {
                              handsGroup.getWorldPosition(worldPivot);
                          } else {
                              model.importedMesh.getWorldPosition(worldPivot);
                          }
                          
                          worldNormal.set(0, 0, 1).applyQuaternion(model.importedMesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
                          dragPlane.setFromNormalAndCoplanarPoint(worldNormal, worldPivot);
                          if (draggedHandName === 'hand_alarm') {
                              model._alarmHandDragging = true;
                          }
                          return;
                      }
                  }
              }

              const model = models.find(m => m.format === 'clock-ultra');
              const p0 = model && model.clockParts && model.clockParts[0];
              if (model && p0 && p0.timeTravelEnabled) {
                  let hitClock = false;
                  if (intersects.length > 0) {
                      let temp = intersects[0].object;
                      while (temp) {
                          if (temp === model.meshGroup || temp === model.importedMesh) {
                              hitClock = true;
                              break;
                          }
                          temp = temp.parent;
                      }
                  }
                  if (hitClock) {
                      isTimeTraveling = true;
                      draggedModel = model;
                      draggedModel._isTimeTraveling = true;
                      timeTravelStartX = e.clientX;
                      controls.enabled = false;
                      return;
                  }
              }
          }
      });

      window.addEventListener('pointermove', (e) => {
          const rect = renderer.domElement.getBoundingClientRect();
          window._cuMouseNDC = {
              x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
              y: -((e.clientY - rect.top) / rect.height) * 2 + 1
          };

          if (isTimeTraveling && draggedModel) {
              const dx = e.clientX - timeTravelStartX;
              timeTravelStartX = e.clientX;
              draggedModel._timeOffsetMinutes = (draggedModel._timeOffsetMinutes || 0) + dx * 0.5;
              return;
          }
          if (!draggedHandName || !draggedModel) return;
          
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          
          const intersection = new THREE.Vector3();
          if (raycaster.ray.intersectPlane(dragPlane, intersection)) {
              const clockWorldInv = new THREE.Matrix4().copy(draggedModel.importedMesh.matrixWorld).invert();
              const localPos = intersection.clone().applyMatrix4(clockWorldInv);
              
              let angle = Math.atan2(localPos.x, localPos.y);
              let normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
              
              const handMesh = draggedModel.importedMesh.getObjectByName(draggedHandName);
              if (handMesh) {
                  handMesh.rotation.z = -normalizedAngle;
              }
              
              if (draggedHandName === 'hand_alarm') {
                  const hrFrac = (normalizedAngle / (2 * Math.PI)) * 12;
                  const totalMinutes = Math.round(hrFrac * 60);
                  let alarmH = Math.floor(totalMinutes / 60);
                  let alarmM = totalMinutes % 60;
                  if (alarmH === 12) alarmH = 0;
                  
                  const p0 = draggedModel.clockParts[0];
                  const currentAlarmParts = (p0.alarmTime || '12:00').split(':');
                  const wasPM = parseInt(currentAlarmParts[0] || 0) >= 12;
                  let newHour = alarmH + (wasPM ? 12 : 0);
                  if (newHour === 24) newHour = 12;
                  
                  const newAlarmTime = String(newHour).padStart(2, '0') + ':' + String(alarmM).padStart(2, '0');
                  if (window.ClockUltra3D && typeof window.ClockUltra3D.updateAlarmFromDrag === 'function') {
                      window.ClockUltra3D.updateAlarmFromDrag(newAlarmTime);
                  }
              } else if (draggedHandName === 'hand_m') {
                  const minFrac = (normalizedAngle / (2 * Math.PI)) * 60;
                  const now = new Date();
                  const sysMinFrac = now.getMinutes() + now.getSeconds() / 60;
                  let diffMin = minFrac - sysMinFrac;
                  if (diffMin < -30) diffMin += 60;
                  if (diffMin > 30) diffMin -= 60;
                  draggedModel._timeOffsetMinutes = (draggedModel._timeOffsetMinutes || 0) + diffMin;
              } else if (draggedHandName === 'hand_h') {
                  const hrFrac = (normalizedAngle / (2 * Math.PI)) * 12;
                  const now = new Date();
                  const sysHrFrac = (now.getHours() % 12) + now.getMinutes() / 60;
                  let diffHr = hrFrac - sysHrFrac;
                  if (diffHr < -6) diffHr += 12;
                  if (diffHr > 6) diffHr -= 12;
                  draggedModel._timeOffsetMinutes = (draggedModel._timeOffsetMinutes || 0) + diffHr * 60;
              }
          }
      });
      
      window.addEventListener('pointerup', () => {
          if (isTimeTraveling) {
              isTimeTraveling = false;
              if (draggedModel) {
                  draggedModel._isTimeTraveling = false;
              }
              draggedModel = null;
              controls.enabled = true;
          }
          if (draggedHandName) {
              if (draggedModel) {
                  draggedModel._alarmHandDragging = false;
                  draggedModel._isTimeTraveling = false;
              }
              draggedHandName = null;
              draggedModel = null;
              controls.enabled = true;
          }
      });

      window.addEventListener('wheel', (e) => {
          const model = models.find(m => m.format === 'clock-ultra');
          const sp = model ? model.clockParts[0] : null;
          if (sp && sp.radioEnabled) {
              const rect = renderer.domElement.getBoundingClientRect();
              if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                  // Raycast to check if mouse is over the LCD screen area on the clock dial
                  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  raycaster.setFromCamera(mouse, camera);
                  const intersects = raycaster.intersectObjects(globalGroup.children, true);
                  if (intersects.length > 0) {
                      const hit = intersects[0];
                      if (hit.object.name === 'audioVizDecal') {
                          const uv = hit.uv;
                          if (uv) {
                              const canvasX = uv.x * 256;
                              const canvasY = (1.0 - uv.y) * 256;
                              // Check if coordinates fall inside the LCD bounding box
                              if (canvasX >= 78 && canvasX <= 178 && canvasY >= 52 && canvasY <= 82) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const delta = e.deltaY < 0 ? 0.1 : -0.1;
                                  sp.radioFrequency = Math.max(87.5, Math.min(108.0, parseFloat((sp.radioFrequency + delta).toFixed(1))));
                                  if (window.ClockUltra3D && typeof window.ClockUltra3D.syncRadioFromModel === 'function') {
                                      window.ClockUltra3D.syncRadioFromModel(sp.radioFrequency);
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }, { passive: false });

      function animate() {
          requestAnimationFrame(animate);
          controls.update();
          
          let w = window.__SPEED__ || 1;
          
          cuParallaxX += (targetCuParallaxX - cuParallaxX) * 0.05;
          cuParallaxY += (targetCuParallaxY - cuParallaxY) * 0.05;
          window._cuParallaxX = cuParallaxX;
          window._cuParallaxY = cuParallaxY;
          
          let hasSweep = false;
          models.forEach(m => {
              if(m.meshGroup && m.meshGroup.children.length > 0) {
                  const target = m.meshGroup.children[0];
                  if(m.spin) {
                      target.rotation.y += 0.01 * w;
                  }
                  if(m.levitate) {
                      target.position.y = Math.sin(Date.now() * 0.002) * 10;
                  } else {
                      target.position.y = 0;
                  }
                  
                  if(m.format === 'clock-ultra') {
                      const p0 = m.clockParts && m.clockParts[0];
                      if(p0) {
                          if(p0.parallaxEnabled) {
                              target.rotation.x = cuParallaxX;
                              target.rotation.y = cuParallaxY;
                          } else {
                              target.rotation.x = 0;
                              target.rotation.y = 0;
                          }
                          if(p0.glareSweepEnabled) {
                              hasSweep = true;
                          }
                      }
                  }
              }
          });
          
          if (mainDirLight) {
              if (hasSweep) {
                  mainDirLight.position.x = 100 + Math.sin(Date.now() * 0.001) * 150;
              } else {
                  mainDirLight.position.set(100, 200, 200);
              }
          }
          
          if(scene.animCbs) scene.animCbs.forEach(cb => cb(w));

          renderer.render(scene, camera);
      }
      animate();
  }

  function generateShapePoints(type, p1, p2) {
      const points = [];
      const cx = p1.x, cy = p1.y;
      const r = Math.hypot(p2.x - cx, p2.y - cy);
      if(r < 2) return [p1, p2];

      if(type === 'circle') {
          for(let i=0; i<=32; i++) {
              points.push({x: cx + Math.cos(i/32*Math.PI*2)*r, y: cy + Math.sin(i/32*Math.PI*2)*r});
          }
      } else if(type === 'square') {
          const dx = Math.abs(p2.x - cx), dy = Math.abs(p2.y - cy);
          points.push({x: cx-dx, y: cy-dy});
          points.push({x: cx+dx, y: cy-dy});
          points.push({x: cx+dx, y: cy+dy});
          points.push({x: cx-dx, y: cy+dy});
          points.push({x: cx-dx, y: cy-dy});
      } else if(type === 'star') {
          const spikes = 5;
          const r0 = r / 2.5;
          for(let i=0; i<=spikes*2; i++) {
              const rad = i%2===0 ? r : r0;
              const a = (i/(spikes*2)) * Math.PI*2 - Math.PI/2;
              points.push({x: cx + Math.cos(a)*rad, y: cy + Math.sin(a)*rad});
          }
      } else if(type === 'hexagon') {
          for(let i=0; i<=6; i++) {
              points.push({x: cx + Math.cos(i/6*Math.PI*2)*r, y: cy + Math.sin(i/6*Math.PI*2)*r});
          }
      } else if(type === 'heart') {
          for(let i=0; i<=32; i++) {
              const t = i/32 * Math.PI * 2;
              const hx = 16 * Math.pow(Math.sin(t), 3);
              const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
              points.push({x: cx + hx*(r/16), y: cy + hy*(r/16)});
          }
      } else if(type === 'gear') {
          const teeth = 12;
          const innerR = r * 0.7;
          for(let i=0; i<=teeth*4; i++) {
              const angle = (i / (teeth*4)) * Math.PI * 2;
              const step = i % 4;
              const rad = (step === 1 || step === 2) ? r : innerR;
              points.push({x: cx + Math.cos(angle)*rad, y: cy + Math.sin(angle)*rad});
          }
      }
      return points;
  }

  function setupEvents() {
      const isEN = window.currentLang !== 'fr';
      // Environment
      const mediaInput = document.getElementById('se-custom-media-file');
      const mediaContainer = document.getElementById('se-custom-media-container');
      const mediaBtnText = document.getElementById('se-custom-media-btn-text');
      const mediaStatus = document.getElementById('se-custom-media-status');

      document.getElementById('se-env').addEventListener('change', (e) => {
          currentEnv = e.target.value;
          const isEN = window.currentLang !== 'fr';
          
          if (currentEnv === 'custom_photo' || currentEnv === 'custom_video') {
              mediaContainer.style.display = 'block';
              if (currentEnv === 'custom_photo') {
                  mediaInput.accept = "image/*";
                  mediaBtnText.innerHTML = `📁 ${isEN ? 'Upload Photo' : 'Télécharger Photo'}`;
              } else {
                  mediaInput.accept = "video/*";
                  mediaBtnText.innerHTML = `📁 ${isEN ? 'Upload Video' : 'Télécharger Vidéo'}`;
              }
              mediaStatus.style.display = 'none';
              mediaInput.value = '';
          } else {
              mediaContainer.style.display = 'none';
          }
          
          buildEnv(currentEnv, scene);
      });

      if (mediaInput) {
          mediaInput.addEventListener('change', (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const isEN = window.currentLang !== 'fr';
              
              mediaStatus.style.display = 'block';
              mediaStatus.style.color = '#38bdf8';
              mediaStatus.innerText = isEN ? 'Processing...' : 'Traitement...';
              
              const reader = new FileReader();
              reader.onload = (event) => {
                  const isEN = window.currentLang !== 'fr';
                  customMediaDataUrl = event.target.result;
                  customMediaType = file.type.startsWith('image/') ? 'image' : 'video';
                  
                  mediaStatus.style.color = '#10b981';
                  mediaStatus.innerText = isEN ? '✔️ Loaded successfully!' : '✔️ Chargé avec succès !';
                  
                  buildEnv(currentEnv, scene);
              };
              reader.onerror = () => {
                  const isEN = window.currentLang !== 'fr';
                  mediaStatus.style.color = '#ef4444';
                  mediaStatus.innerText = isEN ? '❌ Error loading file' : '❌ Erreur de chargement';
              };
              reader.readAsDataURL(file);
          });
      }

      // Mode Toggles
      document.getElementById('btn-mode-3d').addEventListener('click', () => {
          currentMode = '3d';
          document.getElementById('btn-mode-draw').style.background = 'transparent';
          document.getElementById('btn-mode-draw').style.color = '#94a3b8';
          document.getElementById('btn-mode-3d').style.background = '#10b981';
          document.getElementById('btn-mode-3d').style.color = 'white';
          
          document.getElementById('sec-draw-tools').style.display = 'none';

          canvas.style.pointerEvents = 'none';
          canvas.style.background = 'transparent';
          if(ctx) ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          controls.enabled = true;
          if(activeModelId) syncUI();
      });

      document.getElementById('btn-mode-draw').addEventListener('click', () => {
          currentMode = 'draw';
          document.getElementById('btn-mode-3d').style.background = 'transparent';
          document.getElementById('btn-mode-3d').style.color = '#94a3b8';
          document.getElementById('btn-mode-draw').style.background = '#10b981';
          document.getElementById('btn-mode-draw').style.color = 'white';
          
          document.getElementById('sec-draw-tools').style.display = 'block';

          canvas.style.pointerEvents = 'auto';
          canvas.style.background = 'rgba(15,23,42,0.8)';
          if(transformControl) transformControl.detach();
          controls.enabled = false;
      });

      document.getElementById('se-draw-bg-file').addEventListener('change', (e) => {
          const f = e.target.files[0]; if(!f) return;
          const reader = new FileReader();
          reader.onload = ev => {
              canvas.style.backgroundImage = `url(${ev.target.result})`;
              canvas.style.backgroundSize = 'contain';
              canvas.style.backgroundPosition = 'center';
              canvas.style.backgroundRepeat = 'no-repeat';
              document.getElementById('se-draw-bg-clear').style.display = 'block';
          };
          reader.readAsDataURL(f); e.target.value = '';
      });

      document.getElementById('se-draw-bg-clear').addEventListener('click', () => {
          canvas.style.backgroundImage = '';
          document.getElementById('se-draw-bg-clear').style.display = 'none';
      });

      document.getElementById('se-draw-auto-file').addEventListener('change', (e) => {
          const f = e.target.files[0]; if(!f) return;
          const reader = new FileReader();
          reader.onload = ev => {
              const img = new Image();
              img.onload = () => {
                  const cvs = document.createElement('canvas');
                  const w = 150; const h = Math.floor(img.height * (150 / img.width));
                  cvs.width = w; cvs.height = h;
                  const ctxT = cvs.getContext('2d', { willReadFrequently: true });
                  ctxT.drawImage(img, 0, 0, w, h);
                  const imgData = ctxT.getImageData(0,0,w,h).data;
                  
                  const isBlack = (x, y) => {
                      if(x<0||x>=w||y<0||y>=h) return false;
                      const i = (y*w+x)*4;
                      return (imgData[i]*0.3 + imgData[i+1]*0.59 + imgData[i+2]*0.11) < 128 && imgData[i+3] > 128; 
                  };
                  
                  let startX = -1, startY = -1;
                  for(let y=0; y<h && startX===-1; y++){
                      for(let x=0; x<w; x++){
                          if(isBlack(x,y)){ startX = x; startY = y; break; }
                      }
                  }
                  
                  if(startX === -1) { if(window.toast) toast("No shape found!"); return; }
                  
                  const path = [];
                  const dirs = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]];
                  let currX = startX, currY = startY;
                  let currDir = 7; 
                  path.push({x: currX, y: currY});
                  
                  let count = 0;
                  while(count < 8000) {
                      let found = false;
                      for(let i=0; i<8; i++) {
                          let nd = (currDir + i) % 8;
                          let nx = currX + dirs[nd][0];
                          let ny = currY + dirs[nd][1];
                          if(isBlack(nx, ny)) {
                              if(nx === startX && ny === startY && count > 1) { count=9999; break; }
                              currX = nx; currY = ny;
                              path.push({x: currX, y: currY});
                              currDir = (nd + 5) % 8;
                              found = true;
                              break;
                          }
                      }
                      if(!found) break;
                      count++;
                  }
                  
                  const scaleX = canvasWidth / w;
                  const scaleY = canvasHeight / h;
                  // Filter path to reduce point density and smooth
                  const finalPts = path.filter((p, i) => i%3===0).map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));
                  
                  if(finalPts.length > 5) {
                      modelCount++;
                      const newModel = {
                          id: Date.now(), name: `Auto-Trace ${modelCount}`, type: 'draw',
                          points: finalPts, canvasW: canvasWidth, canvasH: canvasHeight,
                          depth: 10, scale: 1.0, bevelVal: 0.2, colorHex: '#10b981', emissiveHex: '#000000',
                          metalness: 0.2, roughness: 0.3, opacity: 1.0, wireframe: false,
                          preset: 'custom', spin: false, mirror: document.getElementById('se-draw-symmetry').value,
                          drawStyle: document.getElementById('se-draw-style').value,
                          position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
                          meshGroup: null
                      };
                      models.push(newModel); activeModelId = newModel.id; buildModels();
                      document.getElementById('btn-mode-3d').click();
                      if(window.toast) toast("✨ Auto-Trace Complete!");
                  }
              };
              img.src = ev.target.result;
          };
          reader.readAsDataURL(f); e.target.value = '';
      });

      // Import
      const fileInput = document.getElementById('se-file');
      const fileInput3D = document.getElementById('se-file-3d');
      document.getElementById('btn-svg').onclick = () => { fileInput.accept = '.svg'; fileInput.click(); };
      document.getElementById('btn-dxf').onclick = () => { fileInput.accept = '.dxf'; fileInput.click(); };
      document.getElementById('btn-3d-import').onclick = () => { fileInput3D.click(); };

      // ── Image→3D in Scene ──
      let _sceneImgData = null, _sceneImgB64 = null;
      document.getElementById('btn-img3d-scene').onclick = () => {
        const p = document.getElementById('se-img3d-cfg');
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
        document.getElementById('se-audio-cfg').style.display = 'none';
        if (p.style.display === 'block') document.getElementById('se-img-file').click();
      };
      document.getElementById('se-img-file').onchange = (e) => {
        const f = e.target.files[0]; if(!f) return;
        const reader = new FileReader();
        reader.onload = ev => {
          _sceneImgB64 = ev.target.result;
          const img = new Image();
          img.onload = () => { _sceneImgData = img; document.getElementById('se-img3d-cfg').style.display = 'block'; };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(f); e.target.value = '';
      };
      document.getElementById('se-i3d-res').addEventListener('input', e => { document.getElementById('se-i3d-rv').textContent = e.target.value; });
      document.getElementById('se-i3d-hs').addEventListener('input', e => { document.getElementById('se-i3d-hv').textContent = e.target.value; });
      document.getElementById('se-i3d-add').onclick = () => {
        if (!_sceneImgData) { if(window.toast) toast('Choose an image first'); return; }
        const res = +document.getElementById('se-i3d-res').value;
        const hs  = +document.getElementById('se-i3d-hs').value;
        const cm  = document.getElementById('se-i3d-cm').value;
        // Sample heightmap
        const c = document.createElement('canvas'); c.width = res; c.height = res;
        const ctx2 = c.getContext('2d'); ctx2.drawImage(_sceneImgData, 0, 0, res, res);
        const px = ctx2.getImageData(0, 0, res, res).data;
        const heights = new Float32Array(res*res);
        for(let i=0;i<res*res;i++) heights[i]=(0.299*px[i*4]+0.587*px[i*4+1]+0.114*px[i*4+2])/255;
        // Build PlaneGeometry in scene
        const geo = new THREE.PlaneGeometry(res*0.8, res*0.8, res-1, res-1);
        geo.rotateX(-Math.PI/2);
        const pos = geo.attributes.position;
        for(let i=0;i<pos.count;i++) pos.setY(i, heights[i]*hs);
        pos.needsUpdate = true; geo.computeVertexNormals();
        let mat;
        if(cm === 'Texture' && _sceneImgB64) {
          const tex = new THREE.TextureLoader().load(_sceneImgB64);
          mat = new THREE.MeshPhongMaterial({map:tex,shininess:40});
        } else {
          const colorFns = {
            gradient: h => new THREE.Color().setHSL(0.67-h*0.67,1,0.45+h*0.1),
            neon:     h => { if(h<0.5) return new THREE.Color(0,h*2,1); return new THREE.Color((h-0.5)*2,1,0); },
            thermal:  h => { if(h<0.33) return new THREE.Color(0,0,h*3); if(h<0.66) return new THREE.Color(0,(h-0.33)*3,1); return new THREE.Color((h-0.66)*3,1,0); },
            mono:     h => new THREE.Color(h,h,h),
          };
          const fn = colorFns[cm] || colorFns.gradient;
          const cols = [];
          for(let i=0;i<pos.count;i++){const col=fn(heights[i]);cols.push(col.r,col.g,col.b);}
          geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));
          mat = new THREE.MeshPhongMaterial({vertexColors:true,shininess:60});
        }
        const mesh = new THREE.Mesh(geo, mat);
        const grp = new THREE.Group(); grp.add(mesh);
        // Store serialisable data for export
        const heightArr = Array.from(heights).map(h => Math.round(h*1000)/1000);
        modelCount++;
        const newModel = {
          id: Date.now(), name: 'Heightmap '+modelCount, type: '3d-model', format: 'heightmap',
          rawText: '', depth:hs, scale:1.0, bevelVal:0, colorHex:'#6366f1', emissiveHex:'#000000',
          metalness:0.1, roughness:0.5, opacity:1.0, wireframe:false, preset:'custom', spin:false, mirror:false,
          position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
          meshGroup: null, importedMesh: grp,
          // Extra: heightmap data for export
          heightData: heightArr, heightRes: res, heightScale: hs, colorMode: cm,
          imgB64: cm === 'Texture' ? _sceneImgB64 : null
        };
        models.push(newModel); activeModelId = newModel.id; buildModels();
        document.getElementById('btn-mode-3d').click();
        document.getElementById('se-img3d-cfg').style.display = 'none';
        if(window.toast) toast(isEN ? '🌟 Heightmap added to scene!' : '🌟 Carte de hauteur ajoutée !');
      };

      // ── Audio Visualizer in Scene ──
      let _sceneAudioCtx=null, _sceneAnalyser=null, _sceneAudioSrc=null, _sceneMicStream=null;
      let _sceneAudioBars=[], _sceneAudioActive=false;
      document.getElementById('btn-audio-scene').onclick = () => {
        const p = document.getElementById('se-audio-cfg');
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
        document.getElementById('se-img3d-cfg').style.display = 'none';
      };
      const _initSceneAudio = () => {
        if(!_sceneAudioCtx){
          _sceneAudioCtx=new(window.AudioContext||window.webkitAudioContext)();
          _sceneAnalyser=_sceneAudioCtx.createAnalyser();
          _sceneAnalyser.fftSize=256;
          _sceneAnalyser.connect(_sceneAudioCtx.destination); // so audio plays
        }
        // Resume suspended context (browser autoplay policy)
        if(_sceneAudioCtx.state==='suspended') _sceneAudioCtx.resume();
      };
      document.getElementById('se-mic-btn').onclick = async () => {
        _initSceneAudio();
        if(_sceneAudioSrc){try{_sceneAudioSrc.disconnect();}catch(e){}}
        if(_sceneMicStream){_sceneMicStream.getTracks().forEach(t=>t.stop());}
        _sceneMicStream = await navigator.mediaDevices.getUserMedia({audio:true}).catch(()=>null);
        if(!_sceneMicStream){if(window.toast)toast(isEN ? '❌ Microphone denied' : '❌ Microphone refusé');return;}
        _sceneAudioSrc = _sceneAudioCtx.createMediaStreamSource(_sceneMicStream);
        _sceneAudioSrc.connect(_sceneAnalyser);
        document.getElementById('se-audio-status').textContent = isEN ? '🔴 Microphone active' : '🔴 Microphone actif';
        document.getElementById('se-audio-status').style.color = '#10b981';
      };
      document.getElementById('se-audio-file2').onchange = (e) => {
        const f=e.target.files[0]; if(!f)return; _initSceneAudio();
        if(_sceneAudioSrc){try{_sceneAudioSrc.disconnect();if(_sceneAudioSrc.stop)_sceneAudioSrc.stop();}catch(ex){}}
        const r=new FileReader();
        r.onload=ev=>{_sceneAudioCtx.decodeAudioData(ev.target.result).then(buf=>{_sceneAudioSrc=_sceneAudioCtx.createBufferSource();_sceneAudioSrc.buffer=buf;_sceneAudioSrc.connect(_sceneAnalyser);_sceneAudioSrc.loop=true;_sceneAudioSrc.start();document.getElementById('se-audio-status').textContent='🎵 '+f.name;document.getElementById('se-audio-status').style.color='#10b981';});};
        r.readAsArrayBuffer(f); e.target.value='';
      };
      document.getElementById('se-audio-add').onclick = () => {
        if(!_sceneAnalyser){
          if(window.toast) toast(isEN ? '⚠️ Activate Microphone or MP3 first' : '⚠️ Activez d\'abord le Micro ou le MP3');
          return;
        }
        const BARS=32, barStyle=document.getElementById('se-audio-style').value, colorScheme=document.getElementById('se-audio-color').value;
        const barW=40/BARS;
        const colorFns={spectrum:i=>new THREE.Color().setHSL(i/BARS*0.78,1,0.55),fire:i=>new THREE.Color().setHSL((i/BARS)*0.12,1,0.5),ocean:i=>new THREE.Color().setHSL(0.55+i/BARS*0.08,0.9,0.55),neon:i=>i%2===0?new THREE.Color(0,1,0.5):new THREE.Color(1,0,0.8)};
        const getColor=colorFns[colorScheme]||colorFns.spectrum;
        const audioGroup=new THREE.Group();
        _sceneAudioBars=[];
        for(let i=0;i<BARS;i++){
          let geo2;
          if(barStyle==='cylinder') geo2=new THREE.CylinderGeometry(barW*0.4,barW*0.4,1,8);
          else if(barStyle==='cone') geo2=new THREE.ConeGeometry(barW*0.45,1,8);
          else geo2=new THREE.BoxGeometry(barW*0.8,1,barW*0.8);
          const col=getColor(i);
          const mat2=new THREE.MeshPhongMaterial({color:col,emissive:col,emissiveIntensity:0.3});
          const bar=new THREE.Mesh(geo2,mat2);
          bar.position.x=(i-BARS/2+0.5)*barW*1.3;
          audioGroup.add(bar);
        }
        modelCount++;
        const newModel={
          id:Date.now(),name:'AudioViz '+modelCount,type:'3d-model',format:'audio-viz',
          rawText:'',depth:1,scale:1.0,bevelVal:0,colorHex:'#10b981',emissiveHex:'#000000',
          metalness:0.1,roughness:0.5,opacity:1.0,wireframe:false,preset:'custom',spin:false,mirror:false,
          position:new THREE.Vector3(0,0,0),rotation:new THREE.Euler(0,0,0),groupScale:new THREE.Vector3(1,1,1),
          meshGroup:null,importedMesh:audioGroup,
          avBars: BARS, avBarStyle: barStyle, avColorScheme: colorScheme
        };
        models.push(newModel); activeModelId=newModel.id; buildModels();
        // buildModels() now adds importedMesh directly for audio-viz (no clone)
        // so _sceneAudioBars can safely reference audioGroup children
        _sceneAudioBars = [];
        audioGroup.traverse(c => { if(c.isMesh) _sceneAudioBars.push(c); });
        document.getElementById('btn-mode-3d').click();
        document.getElementById('se-audio-cfg').style.display='none';
        _sceneAudioActive=true;
        if(window.toast) toast('🎵 Visualizer added to scene!');
      };
      // Animate audio bars — uses models[] refs (not clones) for accuracy
      if(!scene.animCbs) scene.animCbs=[];
      scene.animCbs.push(() => {
        if(!_sceneAudioActive||!_sceneAnalyser) return;
        if(_sceneAudioCtx && _sceneAudioCtx.state==='suspended') _sceneAudioCtx.resume();
        const data=new Uint8Array(_sceneAnalyser.frequencyBinCount);
        _sceneAnalyser.getByteFrequencyData(data);
        _sceneAudioBars.forEach((bar,i)=>{
          const v=(data[i]||0)/255;
          const h=Math.max(0.5,v*30);
          bar.scale.y=h; bar.position.y=h/2;
        });
      });

      // ── Video→3D in Scene ──
      let _sceneVideoB64 = null;
      document.getElementById('btn-video-scene').onclick = () => {
        const p = document.getElementById('se-v3d-cfg');
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
        document.getElementById('se-img3d-cfg').style.display = 'none';
        document.getElementById('se-audio-cfg').style.display = 'none';
        if (p.style.display === 'block') document.getElementById('se-video-file').click();
      };
      document.getElementById('se-video-file').onchange = (e) => {
        const f = e.target.files[0]; if(!f) return;
        const reader = new FileReader();
        reader.onload = ev => {
          _sceneVideoB64 = ev.target.result;
          document.getElementById('se-v3d-cfg').style.display = 'block';
          if(window.toast) toast(isEN ? '✅ Video loaded' : '✅ Vidéo chargée');
        };
        reader.readAsDataURL(f); e.target.value = '';
      };
      document.getElementById('se-v3d-add').onclick = () => {
        if (!_sceneVideoB64) { if(window.toast) toast('Choose a video first'); return; }
        const shp = document.getElementById('se-v3d-shape').value;
        const chroma = document.getElementById('se-v3d-chroma').checked;
        const chromaCol = document.getElementById('se-v3d-chroma-col').value;
        
        // Create video element
        const v = document.createElement('video'); v.src = _sceneVideoB64;
        v.loop = true; v.muted = true; v.playsInline = true; v.play();
        const tex = new THREE.VideoTexture(v);
        
        let geo;
        if(shp==='curved') geo = new THREE.CylinderGeometry(100, 100, 60, 32, 1, true, -Math.PI/4, Math.PI/2);
        else if(shp==='sphere') geo = new THREE.SphereGeometry(40, 32, 32);
        else if(shp==='cube') geo = new THREE.BoxGeometry(60, 60, 60);
        else geo = new THREE.PlaneGeometry(100, 56);

        let mat;
        if(chroma) {
          mat = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: { tex: { value: tex }, keyColor: { value: new THREE.Color(chromaCol) }, similarity: { value: 0.15 }, smoothness: { value: 0.05 } },
            vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
            fragmentShader: `uniform sampler2D tex; uniform vec3 keyColor; uniform float similarity; uniform float smoothness; varying vec2 vUv; void main(){ vec4 rgba=texture2D(tex,vUv); float d=distance(rgba.rgb, keyColor); float alpha=smoothstep(similarity, similarity+smoothness, d); gl_FragColor=vec4(rgba.rgb, alpha); }`,
            side: THREE.DoubleSide
          });
        } else {
          mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
        }
        
        const mesh = new THREE.Mesh(geo, mat);
        const grp = new THREE.Group(); grp.add(mesh);
        
        modelCount++;
        const newModel = {
          id: Date.now(), name: 'VideoObj '+modelCount, type: '3d-model', format: 'video-mesh',
          rawText: _sceneVideoB64, depth:10, scale:1.0, bevelVal:0, colorHex:'#6366f1', emissiveHex:'#000000',
          metalness:0.1, roughness:0.5, opacity:1.0, wireframe:false, preset:'custom', spin:false, mirror:false,
          position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
          meshGroup: null, importedMesh: grp,
          videoShape: shp, videoChroma: chroma, videoChromaCol: chromaCol
        };
        models.push(newModel); activeModelId = newModel.id; buildModels();
        document.getElementById('btn-mode-3d').click();
        document.getElementById('se-v3d-cfg').style.display = 'none';
        if(window.toast) toast('🎥 Video added to scene!');
      };

      fileInput3D.onchange = (e) => {
          const file = e.target.files[0];
          if(!file) return;
          const ext = file.name.split('.').pop().toLowerCase();
          const isBinary = ext === 'glb' || ext === 'stl';
          const reader = new FileReader();
          reader.onload = (ev) => {
              let result = ev.target.result;
              const addModel = (importedObject) => {
                  modelCount++;
                  let rawTextData = result;
                  if (isBinary) {
                      let bin = '';
                      const bytes = new Uint8Array(result);
                      const len = bytes.byteLength;
                      for (let i = 0; i < len; i += 32000) {
                          bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 32000));
                      }
                      rawTextData = btoa(bin);
                  }
                  const newModel = {
                      id: Date.now(), name: file.name, type: '3d-model', format: ext,
                      rawText: rawTextData,
                      depth: 10, scale: 1.0, bevelVal: 0.1, colorHex: '#10b981', emissiveHex: '#000000',
                      metalness: 0.2, roughness: 0.3, opacity: 1.0, wireframe: false,
                      preset: 'custom', spin: false, mirror: false,
                      position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
                      meshGroup: null, importedMesh: importedObject
                  };
                  models.push(newModel); activeModelId = newModel.id; buildModels();
                  document.getElementById('btn-mode-3d').click();
              };
              try {
                  if (ext === 'glb' || ext === 'gltf') {
                      new THREE.GLTFLoader().parse(result, '', (gltf) => addModel(gltf.scene));
                  } else if (ext === 'obj') {
                      addModel(new THREE.OBJLoader().parse(result));
                  } else if (ext === 'stl') {
                      const geo = new THREE.STLLoader().parse(result);
                      const mesh = new THREE.Mesh(geo);
                      const group = new THREE.Group(); group.add(mesh);
                      addModel(group);
                  }
              } catch (err) { console.error("3D Load Error", err); }
          };
          if(isBinary) reader.readAsArrayBuffer(file);
          else reader.readAsText(file);
          e.target.value = '';
      };

      fileInput.onchange = (e) => {
          const file = e.target.files[0];
          if(!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
              modelCount++;
              const newModel = {
                  id: Date.now(), name: file.name,
                  type: file.name.toLowerCase().endsWith('.svg') ? 'svg' : 'dxf',
                  rawText: ev.target.result,
                  depth: 10, scale: 1.0, bevelVal: 0.1, colorHex: '#10b981', emissiveHex: '#000000',
                  metalness: 0.2, roughness: 0.3, opacity: 1.0, wireframe: false,
                  preset: 'custom', spin: false, mirror: false,
                  position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
                  meshGroup: null
              };
              models.push(newModel); activeModelId = newModel.id; buildModels();
              document.getElementById('btn-mode-3d').click();
          };
          reader.readAsText(file); e.target.value = '';
      };

      // Text 3D
      let loadedFontsCache = {};
      
      document.getElementById('btn-text').onclick = () => {
          const p = document.getElementById('se-text-cfg');
          p.style.display = p.style.display === 'block' ? 'none' : 'block';
          if(document.getElementById('se-qr-cfg')) document.getElementById('se-qr-cfg').style.display = 'none';
          if(document.getElementById('se-img3d-cfg')) document.getElementById('se-img3d-cfg').style.display = 'none';
          if(document.getElementById('se-audio-cfg')) document.getElementById('se-audio-cfg').style.display = 'none';
          if(document.getElementById('se-v3d-cfg')) document.getElementById('se-v3d-cfg').style.display = 'none';
      };

      document.getElementById('se-txt-add').onclick = () => {
          const txt = document.getElementById('se-txt-content').value || "3D Text";
          const fontName = document.getElementById('se-txt-font').value;
          const layout = document.getElementById('se-txt-layout').value;
          const matStyle = document.getElementById('se-txt-mat').value;
          const animStyle = document.getElementById('se-txt-anim').value;
          const colHex = document.getElementById('se-txt-color').value;

          const addTextModel = (fontObj) => {
              modelCount++;
              let emissive = '#000000';
              let metal = 0.2;
              let rough = 0.3;
              let opac = 1.0;
              
              if(matStyle === 'gold') { metal = 1.0; rough = 0.15; }
              else if(matStyle === 'glass') { metal = 0.8; rough = 0.05; opac = 0.6; }
              else if(matStyle === 'neon') { metal = 0.0; rough = 0.8; emissive = colHex; }

              const newModel = {
                  id: Date.now(), name: `Text: ${txt.substring(0,6)}`, type: 'text', rawText: txt,
                  depth: 10, scale: 1.0, bevelVal: 0.1, colorHex: colHex, emissiveHex: emissive,
                  metalness: metal, roughness: rough, opacity: opac, wireframe: false,
                  preset: 'custom', spin: false, mirror: false,
                  position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
                  meshGroup: null,
                  txtFont: fontName, txtLayout: layout, txtMat: matStyle, txtAnim: animStyle, _fontObj: fontObj
              };
              models.push(newModel); activeModelId = newModel.id; buildModels();
              document.getElementById('btn-mode-3d').click();
              document.getElementById('se-text-cfg').style.display = 'none';
              if(window.toast) toast('🔠 Text 3D Added!');
          };

          if(loadedFontsCache[fontName]) {
              addTextModel(loadedFontsCache[fontName]);
          } else {
              const loader = new THREE.FontLoader();
              let fontUrl = '';
              if(fontName === 'helvetiker') fontUrl = 'https://unpkg.com/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json';
              else if(fontName === 'optimer') fontUrl = 'https://unpkg.com/three@0.128.0/examples/fonts/optimer_regular.typeface.json';
              else if(fontName === 'gentilis') fontUrl = 'https://unpkg.com/three@0.128.0/examples/fonts/gentilis_regular.typeface.json';
              else if(fontName === 'droid') fontUrl = 'https://unpkg.com/three@0.128.0/examples/fonts/droid/droid_sans_bold.typeface.json';
              
              if(window.toast) toast('Loading font...');
              loader.load(fontUrl, (font) => {
                  loadedFontsCache[fontName] = font;
                  addTextModel(font);
              });
          }
      };

      // QR Code 3D
      let _sceneQrLogoB64 = null;
      document.getElementById('btn-qrcode').onclick = () => {
          if(!window.QRious) { alert("QR Library still loading..."); return; }
          const p = document.getElementById('se-qr-cfg');
          p.style.display = p.style.display === 'block' ? 'none' : 'block';
          document.getElementById('se-img3d-cfg').style.display = 'none';
          document.getElementById('se-audio-cfg').style.display = 'none';
          if(document.getElementById('se-v3d-cfg')) document.getElementById('se-v3d-cfg').style.display = 'none';
      };

      document.getElementById('se-qr-logo-file').onchange = (e) => {
          const f = e.target.files[0]; if(!f) return;
          const reader = new FileReader();
          reader.onload = ev => {
              _sceneQrLogoB64 = ev.target.result;
              document.getElementById('se-qr-logo-status').style.display = 'block';
          };
          reader.readAsDataURL(f); e.target.value = '';
      };

      document.getElementById('se-qr-add').onclick = () => {
          const txt = document.getElementById('se-qr-text').value || "https://";
          const shape = document.getElementById('se-qr-shape').value;
          const fgCol = document.getElementById('se-qr-color').value;
          const bgCol = document.getElementById('se-qr-base-color').value;
          const depth = parseFloat(document.getElementById('se-qr-depth').value);
          const isNeon = document.getElementById('se-qr-neon').checked;
          const isAnim = document.getElementById('se-qr-anim').checked;
          const hasParticles = document.getElementById('se-qr-particles').checked;
          const isCityscape = document.getElementById('se-qr-city') ? document.getElementById('se-qr-city').checked : false;
          const matStyle = document.getElementById('se-qr-mat').value;
          const baseShape = document.getElementById('se-qr-baseshape').value;

          modelCount++;
          const newModel = {
              id: Date.now(), name: `QR: ${txt.substring(0,10)}`, type: 'qrcode', rawText: txt,
              depth: depth, scale: 1.0, bevelVal: 0.0, colorHex: fgCol, emissiveHex: isNeon ? fgCol : '#000000',
              metalness: isNeon ? 0.0 : 0.2, roughness: isNeon ? 1.0 : 0.4, opacity: 1.0, wireframe: false,
              preset: 'custom', spin: false, mirror: false,
              position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
              meshGroup: null,
              qrShape: shape, qrBgCol: bgCol, qrLogoB64: _sceneQrLogoB64, qrNeon: isNeon, qrAnim: isAnim, 
              qrMat: matStyle, qrBase: baseShape, qrParticles: hasParticles, qrCityscape: isCityscape, isVoxel: true // force voxel rendering
          };
          models.push(newModel); activeModelId = newModel.id; buildModels();
          document.getElementById('btn-mode-3d').click();
          document.getElementById('se-qr-cfg').style.display = 'none';
          
          if(window.toast) toast(isEN ? '📱 QR Code added to scene!' : '📱 QR Code ajouté à la scène !');
      };

      // 2D Drawing
      const getPos = (e) => {
          const rect = canvas.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          return { x: clientX - rect.left, y: clientY - rect.top };
      };

      canvas.addEventListener('pointerdown', (e) => {
          if (currentMode !== 'draw' || e.target !== canvas) return;
          e.preventDefault();
          isDrawing = true;
          currentPoints = [getPos(e)];
          draw2D();
      });

      canvas.addEventListener('pointermove', (e) => {
          if (!isDrawing) return;
          e.preventDefault();
          currentPoints.push(getPos(e));
          draw2D();
      });

      window.addEventListener('pointerup', () => {
          if (!isDrawing) return;
          isDrawing = false;
          if (currentPoints.length > 2) {
              modelCount++;
              const drawShape = document.getElementById('se-draw-shape').value;
              let finalPoints = currentPoints;
              if(drawShape !== 'freehand') finalPoints = generateShapePoints(drawShape, currentPoints[0], currentPoints[currentPoints.length-1]);
              
              const symmetryMode = document.getElementById('se-draw-symmetry').value;
              const newModel = {
                  id: Date.now(), name: `Sketch ${modelCount}`, type: 'draw',
                  points: [...finalPoints], canvasW: canvasWidth, canvasH: canvasHeight,
                  depth: 10, scale: 1.0, bevelVal: 0.2, colorHex: '#10b981', emissiveHex: '#000000',
                  metalness: 0.2, roughness: 0.3, opacity: 1.0, wireframe: false,
                  preset: 'custom', spin: false, mirror: symmetryMode, drawStyle: document.getElementById('se-draw-style').value,
                  position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
                  meshGroup: null
              };
              models.push(newModel); activeModelId = newModel.id; buildModels();
              document.getElementById('btn-mode-3d').click();
          }
          currentPoints = [];
          if(ctx) ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      });

      // UI Sync
      document.getElementById('se-select').addEventListener('change', (e) => { activeModelId = parseInt(e.target.value); syncUI(); });

      document.getElementById('btn-delete').addEventListener('click', () => {
          const act = getActiveModel();
          if(act && act.meshGroup) { globalGroup.remove(act.meshGroup); }
          models = models.filter(m => m.id !== activeModelId);
          activeModelId = models.length > 0 ? models[0].id : null;
          syncUI();
      });

      ['translate', 'rotate', 'scale'].forEach(mode => {
          document.getElementById(`mode-${mode}`).addEventListener('click', () => {
              if(transformControl) transformControl.setMode(mode);
              document.querySelectorAll('.se-mode').forEach(b => b.classList.remove('active'));
              document.getElementById(`mode-${mode}`).classList.add('active');
          });
      });

      if(transformControl) {
          const syncTransform = () => {
              const act = getActiveModel();
              if(act && act.meshGroup) {
                  // Force uniform scale for QR codes to keep them readable
                  if (act.type === 'qrcode' && transformControl.getMode() === 'scale') {
                      let s = act.meshGroup.scale.x;
                      if (act.meshGroup.scale.y !== act.groupScale.y) s = act.meshGroup.scale.y;
                      if (act.meshGroup.scale.z !== act.groupScale.z) s = act.meshGroup.scale.z;
                      act.meshGroup.scale.set(s, s, s);
                  }
                  act.position.copy(act.meshGroup.position);
                  act.rotation.copy(act.meshGroup.rotation);
                  act.groupScale.copy(act.meshGroup.scale);
              }
          };
          transformControl.addEventListener('change', syncTransform);
          transformControl.addEventListener('objectChange', syncTransform);
      }

      document.getElementById('se-preset').addEventListener('change', (e) => {
          const act = getActiveModel();
          if(!act) return;
          act.preset = e.target.value;
          const p = presets[act.preset];
          if(p && act.preset !== 'custom') {
              if(p.metal !== undefined) { act.metalness = p.metal; document.getElementById('param-metal').value = p.metal; document.getElementById('val-metal').innerText = p.metal; }
              if(p.rough !== undefined) { act.roughness = p.rough; document.getElementById('param-rough').value = p.rough; document.getElementById('val-rough').innerText = p.rough; }
              if(p.opacity !== undefined) { act.opacity = p.opacity; document.getElementById('param-opacity').value = p.opacity; document.getElementById('val-opacity').innerText = p.opacity; }
              if(p.color) { act.colorHex = p.color; document.getElementById('param-color').value = p.color; }
              if(p.emissive) { act.emissiveHex = p.emissive; document.getElementById('param-emissive').value = p.emissive; }
          }
          buildModels();
      });

      document.getElementById('param-spin').addEventListener('change', (e) => {
          const act = getActiveModel(); if(act) act.spin = e.target.checked;
      });

      document.getElementById('param-twist').addEventListener('input', (e) => {
          const act = getActiveModel(); if(act) { 
              act.twistVal = parseFloat(e.target.value); 
              document.getElementById('val-twist').innerText = act.twistVal;
              buildModels(); 
          }
      });

      document.getElementById('param-bend').addEventListener('input', (e) => {
          const act = getActiveModel(); if(act) { 
              act.bendVal = parseFloat(e.target.value); 
              document.getElementById('val-bend').innerText = act.bendVal;
              buildModels(); 
          }
      });

      document.getElementById('param-taper').addEventListener('input', (e) => {
          const act = getActiveModel(); if(act) { 
              act.taperVal = parseFloat(e.target.value); 
              document.getElementById('val-taper').innerText = act.taperVal.toFixed(1);
              buildModels(); 
          }
      });

      const pIDs = ['param-depth', 'param-scale', 'param-bevel', 'param-metal', 'param-rough', 'param-opacity'];
      pIDs.forEach(id => {
          document.getElementById(id).addEventListener('input', (e) => {
              const act = getActiveModel(); if(!act) return;
              act.preset = 'custom'; document.getElementById('se-preset').value = 'custom';
              const val = parseFloat(e.target.value);
              if(id === 'param-depth') act.depth = val;
              if(id === 'param-scale') act.scale = val;
              if(id === 'param-bevel') act.bevelVal = val;
              if(id === 'param-metal') act.metalness = val;
              if(id === 'param-rough') act.roughness = val;
              if(id === 'param-opacity') act.opacity = val;
              document.getElementById(id.replace('param', 'val')).innerText = (id==='param-depth'||id==='param-scale'||id==='param-bevel') ? val : val.toFixed(1);
              buildModels();
          });
      });

      ['param-color', 'param-emissive'].forEach(id => {
          document.getElementById(id).addEventListener('input', (e) => {
              const act = getActiveModel(); if(!act) return;
              act.preset = 'custom'; document.getElementById('se-preset').value = 'custom';
              if(id === 'param-color') act.colorHex = e.target.value;
              if(id === 'param-emissive') act.emissiveHex = e.target.value;
              buildModels();
          });
      });

      document.getElementById('param-render-style').addEventListener('change', (e) => {
          const act = getActiveModel(); if(act) { act.renderStyle = e.target.value; buildModels(); }
      });

      document.getElementById('param-levitate').addEventListener('change', (e) => {
          const act = getActiveModel(); if(act) act.levitate = e.target.checked;
      });

      document.getElementById('param-voxel').addEventListener('change', (e) => {
          const act = getActiveModel(); if(act) { act.isVoxel = e.target.checked; buildModels(); }
      });

      document.getElementById('param-frame').addEventListener('change', (e) => {
          const act = getActiveModel(); if(act) { act.hasFrame = e.target.checked; buildModels(); }
      });

      document.getElementById('se-bg-effect').addEventListener('change', (e) => {
          currentBgEffect = e.target.value;
          buildEnv(currentEnv, scene);
      });
      
      // --- Scene Tools ---
      document.getElementById('btn-snapshot').addEventListener('click', () => {
          if(!renderer) return;
          renderer.render(scene, camera);
          const url = renderer.domElement.toDataURL('image/png');
          const a = document.createElement('a'); a.href = url; a.download = 'scene-snapshot.png'; a.click();
          if(window.toast) window.toast('📸 Snapshot saved!');
      });
      
      let mediaRecorder = null;
      let recordedChunks = [];
      document.getElementById('btn-scene-record').addEventListener('click', (e) => {
          if(!mediaRecorder) {
              const stream = renderer.domElement.captureStream(30);
              mediaRecorder = new MediaRecorder(stream, {mimeType: 'video/webm'});
              mediaRecorder.ondataavailable = ev => { if(ev.data.size > 0) recordedChunks.push(ev.data); };
              mediaRecorder.onstop = () => {
                  const blob = new Blob(recordedChunks, {type: 'video/webm'});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = 'scene-recording.webm'; a.click();
                  if(window.toast) window.toast('🎞️ Recording saved!');
                  recordedChunks = [];
                  e.target.innerHTML = '🎞️ Record';
                  e.target.style.background = 'rgba(239,68,68,0.2)';
              };
              mediaRecorder.start();
              e.target.innerHTML = '⏹️ Stop';
              e.target.style.background = '#ef4444';
              if(window.toast) window.toast('🔴 Recording started...');
          } else {
              mediaRecorder.stop();
              mediaRecorder = null;
          }
      });
      
      document.getElementById('btn-clone-obj').addEventListener('click', () => {
          const act = getActiveModel(); if(!act) return;
          const clone = JSON.parse(JSON.stringify(act));
          clone.id = Date.now(); clone.name = clone.name + ' (Copy)';
          clone.meshGroup = null; clone.position.x += 20;
          if(act.importedMesh) clone.importedMesh = act.importedMesh.clone(true);
          models.push(clone); activeModelId = clone.id; buildModels(); syncUI();
          if(window.toast) window.toast('🔵 Object cloned!');
      });
      
      let extraLights = null;
      document.getElementById('btn-lighting').addEventListener('click', () => {
          if(!extraLights) {
              extraLights = new THREE.Group();
              const l1 = new THREE.DirectionalLight(0xff00aa, 1.5); l1.position.set(-100,200,-100); extraLights.add(l1);
              const l2 = new THREE.DirectionalLight(0x00aaff, 1.5); l2.position.set(100,-50,100); extraLights.add(l2);
              scene.add(extraLights);
              if(window.toast) window.toast('💡 Cinematic Lights ON');
          } else {
              scene.remove(extraLights); extraLights = null;
              if(window.toast) window.toast('💡 Cinematic Lights OFF');
          }
      });
      
      let moodLight = null;
      const updateMood = () => {
          if(!moodLight) { moodLight = new THREE.AmbientLight(0xffffff, 0); scene.add(moodLight); }
          moodLight.color.setHex(document.getElementById('se-mood-tint').value.replace('#','0x'));
          moodLight.intensity = parseFloat(document.getElementById('se-mood-intensity').value);
      };
      document.getElementById('se-mood-tint').addEventListener('input', updateMood);
      document.getElementById('se-mood-intensity').addEventListener('input', updateMood);

      const updateSceneBrightness = () => {
          const mult = parseFloat(document.getElementById('se-scene-brightness').value);
          document.getElementById('se-brightness-val').innerText = mult.toFixed(1) + 'x';
          if(mainAmbientLight) mainAmbientLight.intensity = 0.6 * mult;
          if(mainHemiLight) mainHemiLight.intensity = 0.8 * mult;
          if(mainDirLight) mainDirLight.intensity = 1.2 * mult;
          if(scene && scene.bgPlane && scene.bgPlane.material) {
              scene.bgPlane.material.color.setScalar(mult);
          }
      };
      document.getElementById('se-scene-brightness').addEventListener('input', updateSceneBrightness);

      const updateGlowIntensity = () => {
          const mult = parseFloat(document.getElementById('se-glow-intensity').value);
          const glowValText = document.getElementById('se-glow-val');
          if (glowValText) glowValText.innerText = mult.toFixed(1) + 'x';
          window._cuGlowIntensity = mult;
      };
      const glowSlider = document.getElementById('se-glow-intensity');
      if (glowSlider) {
          glowSlider.addEventListener('input', updateGlowIntensity);
          updateGlowIntensity();
      }

      document.getElementById('btn-export').addEventListener('click', exportScene);
  }

  function draw2D() {
      if(!ctx) ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if (currentPoints.length > 0) {
          ctx.beginPath();
          let renderPts = currentPoints;
          const drawShape = document.getElementById('se-draw-shape').value;
          if(drawShape !== 'freehand' && currentPoints.length > 1) {
              renderPts = generateShapePoints(drawShape, currentPoints[0], currentPoints[currentPoints.length-1]);
          }
          const symEl = document.getElementById('se-draw-symmetry');
          const symVal = symEl ? symEl.value : 'none';
          
          function drawPath(pts, transformFn) {
              if(!pts || pts.length === 0) return;
              const start = transformFn(pts[0]);
              ctx.moveTo(start.x, start.y);
              for(let i=1; i<pts.length; i++) {
                  const pt = transformFn(pts[i]);
                  ctx.lineTo(pt.x, pt.y);
              }
          }

          drawPath(renderPts, p => p);
          
          if (symVal === 'mirror') {
              drawPath(renderPts, p => ({ x: canvasWidth - p.x, y: p.y }));
          } else if (symVal.startsWith('radial')) {
              const count = parseInt(symVal.replace('radial', ''));
              const cx = canvasWidth / 2;
              const cy = canvasHeight / 2;
              for (let i = 1; i < count; i++) {
                  const angle = (Math.PI * 2 * i) / count;
                  const cosA = Math.cos(angle);
                  const sinA = Math.sin(angle);
                  drawPath(renderPts, p => {
                      const dx = p.x - cx;
                      const dy = p.y - cy;
                      return {
                          x: cx + dx * cosA - dy * sinA,
                          y: cy + dx * sinA + dy * cosA
                      };
                  });
              }
          }

          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 4;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.stroke();
      }
  }

  function getActiveModel() { return models.find(m => m.id === activeModelId); }

  function syncUI() {
      const select = document.getElementById('se-select');
      select.innerHTML = '';
      models.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.id; opt.innerText = m.name;
          if(m.id === activeModelId) opt.selected = true;
          select.appendChild(opt);
      });

      if(models.length > 0) {
          document.getElementById('sec-list').style.display = 'block';
          document.getElementById('sec-transform').style.display = 'block';
          document.getElementById('sec-props').style.display = 'block';

          const act = getActiveModel();
          if(act) {
              document.getElementById('se-preset').value = act.preset;
              document.getElementById('param-spin').checked = act.spin;
              document.getElementById('param-twist').value = act.twistVal || 0;
              document.getElementById('val-twist').innerText = act.twistVal || 0;
              document.getElementById('param-bend').value = act.bendVal || 0;
              document.getElementById('val-bend').innerText = act.bendVal || 0;
              document.getElementById('param-taper').value = act.taperVal || 1.0;
              document.getElementById('val-taper').innerText = act.taperVal ? act.taperVal.toFixed(1) : "1.0";
              document.getElementById('param-depth').value = act.depth; document.getElementById('val-depth').innerText = act.depth;
              document.getElementById('param-scale').value = act.scale; document.getElementById('val-scale').innerText = act.scale;
              document.getElementById('param-bevel').value = act.bevelVal; document.getElementById('val-bevel').innerText = act.bevelVal;
              document.getElementById('param-metal').value = act.metalness; document.getElementById('val-metal').innerText = act.metalness.toFixed(1);
              document.getElementById('param-rough').value = act.roughness; document.getElementById('val-rough').innerText = act.roughness.toFixed(1);
              document.getElementById('param-opacity').value = act.opacity; document.getElementById('val-opacity').innerText = act.opacity.toFixed(1);
              document.getElementById('param-color').value = act.colorHex; document.getElementById('param-emissive').value = act.emissiveHex;
              document.getElementById('param-render-style').value = act.renderStyle || (act.wireframe ? 'wireframe' : 'solid');
              
              if(transformControl && currentMode === '3d') transformControl.attach(act.meshGroup);

              // QR specific tools
              document.getElementById('qr-extra-tools').style.display = act.type === 'qrcode' ? 'block' : 'none';
              document.getElementById('param-levitate').checked = act.levitate || false;
              document.getElementById('param-voxel').checked = act.isVoxel || false;
              document.getElementById('param-frame').checked = act.hasFrame || false;
          }
      } else {
          document.getElementById('sec-list').style.display = 'none';
          document.getElementById('sec-transform').style.display = 'none';
          document.getElementById('sec-props').style.display = 'none';
          if(transformControl) transformControl.detach();
      }
  }

  function createGeometryFromModel(m) {
      const meshGroup = new THREE.Group();
      let shapes = [];
      let lines = [];
      let rawMax = 100;
      let isText = false;
      let textGeo = null;

      if(m.type === 'draw') {
          const scaleF = 15 / Math.min(m.canvasW, m.canvasH);
          
          const processPoints = (points) => {
              if (m.drawStyle === 'tube') {
                  const pts3D = points.map(p => new THREE.Vector3((p.x - m.canvasW/2)*scaleF, -(p.y - m.canvasH/2)*scaleF, 0));
                  if (pts3D.length < 2) return;
                  const curve = new THREE.CatmullRomCurve3(pts3D, false, 'catmullrom', 0.5);
                  const geo = new THREE.TubeGeometry(curve, Math.max(20, pts3D.length), Math.max(0.5, m.depth * 0.1), 8, false);
                  
                  const tMat = new THREE.MeshStandardMaterial({
                      color: m.colorHex, emissive: m.emissiveHex !== '#000000' ? m.emissiveHex : m.colorHex, emissiveIntensity: 0.8,
                      roughness: m.roughness, metalness: m.metalness, side: THREE.DoubleSide,
                      transparent: m.opacity < 1.0, opacity: m.opacity
                  });
                  const mesh = new THREE.Mesh(geo, tMat);
                  mesh.castShadow = true; mesh.receiveShadow = true;
                  meshGroup.add(mesh);
              } else {
                  const shape = new THREE.Shape();
                  let lastAdded = null;
                  points.forEach((p, idx) => {
                      if(!lastAdded || Math.hypot(p.x - lastAdded.x, p.y - lastAdded.y) > 2 || idx === points.length - 1) {
                          const nx = (p.x - m.canvasW/2)*scaleF;
                          const ny = -(p.y - m.canvasH/2)*scaleF;
                          if(!lastAdded) shape.moveTo(nx, ny); else shape.lineTo(nx, ny);
                          lastAdded = p;
                      }
                  });
                  const sP = points[0], eP = points[points.length-1];
                  if(Math.hypot(sP.x-eP.x, sP.y-eP.y) < 20) shape.lineTo((sP.x - m.canvasW/2)*scaleF, -(sP.y - m.canvasH/2)*scaleF);
                  shapes.push(shape);
              }
          };

          const sym = m.mirror || 'none';
          let paths = [m.points];
          
          if (sym === 'mirror' || sym === true) {
              paths.push(m.points.map(p => ({ x: m.canvasW - p.x, y: p.y })));
          } else if (typeof sym === 'string' && sym.startsWith('radial')) {
              const count = parseInt(sym.replace('radial', ''));
              const cx = m.canvasW / 2;
              const cy = m.canvasH / 2;
              
              for (let i = 1; i < count; i++) {
                  const angle = (Math.PI * 2 * i) / count;
                  const cosA = Math.cos(angle);
                  const sinA = Math.sin(angle);
                  
                  const rotatedPath = m.points.map(p => {
                      const dx = p.x - cx;
                      const dy = p.y - cy;
                      return {
                          x: cx + dx * cosA - dy * sinA,
                          y: cy + dx * sinA + dy * cosA
                      };
                  });
                  paths.push(rotatedPath);
              }
          }
          
          paths.forEach(processPoints);
      } 
      else if(m.type === 'svg') {
          const loader = new THREE.SVGLoader();
          const data = loader.parse(m.rawText);
          data.paths.forEach(path => {
              const svgs = THREE.SVGLoader.createShapes(path);
              svgs.forEach(s => shapes.push(s));
          });
      }
      else if(m.type === 'dxf') {
          const parser = new window.DxfParser();
          const dxf = parser.parseSync(m.rawText);
          const allSegments = [];
          function parseEntities(entities, offsetX = 0, offsetY = 0, scaleX = 1, scaleY = 1) {
             entities.forEach(e => {
               if(e.type === 'INSERT') {
                  const block = dxf.blocks[e.name];
                  if(block && block.entities) {
                     const bx = (e.position ? e.position.x : 0) + offsetX; const by = (e.position ? e.position.y : 0) + offsetY;
                     const sx = (e.scale ? e.scale.x : 1) * scaleX; const sy = (e.scale ? e.scale.y : 1) * scaleY;
                     parseEntities(block.entities, bx, by, sx, sy);
                  }
               } else if(e.type === 'CIRCLE') {
                  const cx = e.center.x * scaleX + offsetX, cy = e.center.y * scaleY + offsetY, r = e.radius * scaleX; const pts = [];
                  for(let i=0; i<=32; i++) pts.push({x: cx + Math.cos(i/32*Math.PI*2)*r, y: cy + Math.sin(i/32*Math.PI*2)*r});
                  for(let i=0; i<32; i++) allSegments.push({p1: pts[i], p2: pts[i+1]});
               } else if(e.type === 'ARC') {
                  const cx = e.center.x * scaleX + offsetX, cy = e.center.y * scaleY + offsetY, r = e.radius * scaleX;
                  let sa = e.startAngle, ea = e.endAngle; if(ea < sa) ea += Math.PI * 2;
                  const pts = []; const steps = Math.max(8, Math.ceil((ea-sa)/0.1));
                  for(let i=0; i<=steps; i++) { const a = sa + (ea-sa)*(i/steps); pts.push({x: cx + Math.cos(a)*r, y: cy + Math.sin(a)*r}); }
                  for(let i=0; i<steps; i++) allSegments.push({p1: pts[i], p2: pts[i+1]});
               } else if(e.type === 'SPLINE' && e.controlPoints && e.controlPoints.length > 0) {
                  for(let i=0; i<e.controlPoints.length-1; i++) allSegments.push({p1: {x: e.controlPoints[i].x * scaleX + offsetX, y: e.controlPoints[i].y * scaleY + offsetY}, p2: {x: e.controlPoints[i+1].x * scaleX + offsetX, y: e.controlPoints[i+1].y * scaleY + offsetY}});
                  if((e.shape || e.closed) && e.controlPoints.length > 2) allSegments.push({p1: {x: e.controlPoints[e.controlPoints.length-1].x * scaleX + offsetX, y: e.controlPoints[e.controlPoints.length-1].y * scaleY + offsetY}, p2: {x: e.controlPoints[0].x * scaleX + offsetX, y: e.controlPoints[0].y * scaleY + offsetY}});
               } else if(e.vertices && e.vertices.length > 0) {
                  for(let i=0; i<e.vertices.length-1; i++) allSegments.push({p1: {x: e.vertices[i].x * scaleX + offsetX, y: e.vertices[i].y * scaleY + offsetY}, p2: {x: e.vertices[i+1].x * scaleX + offsetX, y: e.vertices[i+1].y * scaleY + offsetY}});
                  if((e.shape || e.closed) && e.vertices.length > 2) allSegments.push({p1: {x: e.vertices[e.vertices.length-1].x * scaleX + offsetX, y: e.vertices[e.vertices.length-1].y * scaleY + offsetY}, p2: {x: e.vertices[0].x * scaleX + offsetX, y: e.vertices[0].y * scaleY + offsetY}});
               } else if(e.type === 'LINE') {
                  allSegments.push({p1: {x: e.vertices[0].x * scaleX + offsetX, y: e.vertices[0].y * scaleY + offsetY}, p2: {x: e.vertices[1].x * scaleX + offsetX, y: e.vertices[1].y * scaleY + offsetY}});
               }
             });
          }
          if(dxf && dxf.entities) parseEntities(dxf.entities);
          
          const paths = [];
          if(allSegments.length > 0) {
              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
              allSegments.forEach(s => { [s.p1, s.p2].forEach(p => { if(p.x < minX) minX = p.x; if(p.x > maxX) maxX = p.x; if(p.y < minY) minY = p.y; if(p.y > maxY) maxY = p.y; }); });
              rawMax = Math.max(maxX - minX, maxY - minY);
              if(rawMax === -Infinity || rawMax === 0 || isNaN(rawMax)) rawMax = 100;
              
              const tol = rawMax * 0.0001;
              while(allSegments.length > 0) {
                  let path = [allSegments[0].p1, allSegments[0].p2]; allSegments.splice(0, 1);
                  let added = true;
                  while(added) {
                      added = false; let sP = path[0], eP = path[path.length - 1];
                      for(let i=0; i<allSegments.length; i++) {
                          let seg = allSegments[i];
                          if(Math.abs(seg.p1.x - eP.x) < tol && Math.abs(seg.p1.y - eP.y) < tol) { path.push(seg.p2); allSegments.splice(i,1); added = true; break; }
                          else if(Math.abs(seg.p2.x - eP.x) < tol && Math.abs(seg.p2.y - eP.y) < tol) { path.push(seg.p1); allSegments.splice(i,1); added = true; break; }
                          else if(Math.abs(seg.p1.x - sP.x) < tol && Math.abs(seg.p1.y - sP.y) < tol) { path.unshift(seg.p2); allSegments.splice(i,1); added = true; break; }
                          else if(Math.abs(seg.p2.x - sP.x) < tol && Math.abs(seg.p2.y - sP.y) < tol) { path.unshift(seg.p1); allSegments.splice(i,1); added = true; break; }
                      }
                  }
                  paths.push(path);
              }
          }

          const polygons = [];
          paths.forEach(path => {
              if(path.length < 2) return;
              const isClosed = Math.hypot(path[0].x - path[path.length-1].x, path[0].y - path[path.length-1].y) < rawMax * 0.0001;
              if(isClosed) {
                  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                  path.forEach(p => { if(p.x < minX) minX = p.x; if(p.x > maxX) maxX = p.x; if(p.y < minY) minY = p.y; if(p.y > maxY) maxY = p.y; });
                  polygons.push({ path, area: (maxX-minX)*(maxY-minY), isHole: false, minX, maxX, minY, maxY });
              } else { lines.push(path); }
          });
          polygons.sort((a, b) => b.area - a.area);
          
          for(let i=0; i<polygons.length; i++) {
              if(polygons[i].isHole) continue;
              for(let j=0; j<i; j++) {
                  let parent = polygons[j];
                  if(!parent.isHole && polygons[i].minX >= parent.minX && polygons[i].maxX <= parent.maxX && polygons[i].minY >= parent.minY && polygons[i].maxY <= parent.maxY) {
                      if(pointInPoly(polygons[i].path[0], parent.path)) {
                          if(!parent.holes) parent.holes = [];
                          parent.holes.push(polygons[i].path); polygons[i].isHole = true; break;
                      }
                  }
              }
          }
          polygons.filter(p => !p.isHole).forEach(poly => {
              const shape = new THREE.Shape();
              shape.moveTo(poly.path[0].x, poly.path[0].y);
              for(let i=1; i<poly.path.length; i++) shape.lineTo(poly.path[i].x, poly.path[i].y);
              if(poly.holes) {
                  poly.holes.forEach(holePath => {
                      const h = new THREE.Path(); h.moveTo(holePath[0].x, holePath[0].y);
                      for(let i=1; i<holePath.length; i++) h.lineTo(holePath[i].x, holePath[i].y);
                      shape.holes.push(h);
                  });
              }
              shapes.push(shape);
          });
          
          const openLines = [];
          lines.forEach(path => {
              const shape = new THREE.Shape(); shape.moveTo(path[0].x, path[0].y);
              for(let i=1; i<path.length; i++) shape.lineTo(path[i].x, path[i].y);
              openLines.push(shape);
          });
          lines = openLines;
      }
      else if(m.type === 'text' && loadedFont) {
          isText = true;
      }
      else if(m.type === 'qrcode') {
          const doBuild = () => {
              try {
                  const hasLogo = !!m.qrLogoB64;
                  const qr = new window.QRious({
                      value: m.rawText || " ",
                      size: 512, // High res for clean logical sampling
                      level: hasLogo ? 'H' : 'M',
                      padding: 0, // Force 0 padding for exact calculation
                      foreground: '#000000',
                      background: '#ffffff'
                  });
                  
                  const isAdvanced = !!m.qrShape; 
                  
                  if (m.isVoxel || isAdvanced) {
                      const ctxTemp = qr.canvas.getContext('2d', { willReadFrequently: true });
                      const imgData = ctxTemp.getImageData(0, 0, 512, 512).data;
                      const getPixel = (x, y) => {
                          if(x<0 || x>=512 || y<0 || y>=512) return 255;
                          return imgData[(Math.floor(y)*512 + Math.floor(x))*4];
                      };

                      // Detect logical grid exactly (padding is 0, so first pixel is black)
                      let endX = 0;
                      while(endX < 512 && getPixel(endX, 0) < 128) endX++;
                      
                      let M = endX / 7.0; // Exact module size in pixels
                      if (M <= 0) M = 512 / 21.0;
                      let S = Math.round(512 / M); // Exact grid size
                      if (S < 21) S = 21;
                      let start = 0;
                      
                      const shape = m.qrShape || 'square';
                      const size = 64 / S; // target 3D width ~64
                      const dep = m.depth || 5;
                      
                      // Create geometries
                      const squareGeo = new THREE.BoxGeometry(size * 1.05, size * 1.05, dep);
                      let customGeo;
                      if (shape === 'circle') {
                          customGeo = new THREE.CylinderGeometry(size*0.45, size*0.45, dep, 16);
                          customGeo.rotateX(Math.PI/2);
                      } else if (shape === 'diamond') {
                          customGeo = new THREE.BoxGeometry(size*0.75, size*0.75, dep);
                      } else {
                          customGeo = squareGeo;
                      }
                      
                      const fgCol = m.colorHex || '#000000';
                      const bgCol = m.qrBgCol || '#ffffff';
                      const emi = m.qrNeon ? fgCol : '#000000';
                      
                      let fgMat, bgMat;
                      if (m.qrMat === 'glass') {
                          fgMat = new THREE.MeshStandardMaterial({ color: fgCol, roughness: 0.2, metalness: 0.8, emissive: emi, emissiveIntensity: m.qrNeon ? 0.8 : 0 });
                          bgMat = new THREE.MeshPhysicalMaterial({ color: bgCol, transmission: 1.0, roughness: 0.05, thickness: Math.max(2, dep), ior: 1.5, transparent: true });
                      } else if (m.qrMat === 'gold') {
                          const goldColor = '#ffd700';
                          fgMat = new THREE.MeshStandardMaterial({ color: goldColor, roughness: 0.15, metalness: 1.0, emissive: m.qrNeon ? goldColor : '#000000', emissiveIntensity: m.qrNeon ? 0.5 : 0 });
                          bgMat = new THREE.MeshStandardMaterial({ color: bgCol, roughness: 0.9, metalness: 0.1 });
                      } else if (m.qrMat === 'holo') {
                          const holoColor = fgCol;
                          fgMat = new THREE.MeshStandardMaterial({ color: holoColor, wireframe: true, emissive: holoColor, emissiveIntensity: 1.0, transparent: true, opacity: 0.8 });
                          bgMat = new THREE.MeshStandardMaterial({ color: bgCol, roughness: 0.8, metalness: 0.1, transparent: true, opacity: 0.2 });
                      } else {
                          fgMat = new THREE.MeshStandardMaterial({ color: fgCol, roughness: 0.4, metalness: 0.2, emissive: emi, emissiveIntensity: m.qrNeon ? 0.8 : 0 });
                          bgMat = new THREE.MeshStandardMaterial({ color: bgCol, roughness: 0.8, metalness: 0.1 });
                      }
                      
                      const qrGroup = new THREE.Group();
                      
                      // Dynamic Logo Cutout (20% of size)
                      const cutoutSize = Math.floor(S * 0.20);
                      const cutoutStart = Math.floor((S - cutoutSize) / 2);
                      const cutoutEnd = cutoutStart + cutoutSize;
                      
                      // Base plate with 4-module quiet zone (standard requirement)
                      const borderSize = 4 * size;
                      const baseWidth = S*size + borderSize*2;
                      const baseDepth = Math.max(1, dep*0.2);
                      let baseGeo;
                      
                      if (m.qrBase === 'pedestal') {
                          baseGeo = new THREE.CylinderGeometry(baseWidth*0.55, baseWidth*0.6, baseDepth, 32);
                          baseGeo.rotateX(Math.PI/2);
                      } else if (m.qrBase === 'beveled') {
                          const shape = new THREE.Shape();
                          const w = baseWidth; const r = size * 3;
                          shape.moveTo(-w/2 + r, -w/2);
                          shape.lineTo(w/2 - r, -w/2);
                          shape.quadraticCurveTo(w/2, -w/2, w/2, -w/2 + r);
                          shape.lineTo(w/2, w/2 - r);
                          shape.quadraticCurveTo(w/2, w/2, w/2 - r, w/2);
                          shape.lineTo(-w/2 + r, w/2);
                          shape.quadraticCurveTo(-w/2, w/2, -w/2, w/2 - r);
                          shape.lineTo(-w/2, -w/2 + r);
                          shape.quadraticCurveTo(-w/2, -w/2, -w/2 + r, -w/2);
                          const extrudeSettings = { depth: baseDepth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: size, bevelThickness: size };
                          baseGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                      } else {
                          baseGeo = new THREE.BoxGeometry(baseWidth, baseWidth, baseDepth);
                      }
                      
                      const baseMesh = new THREE.Mesh(baseGeo, bgMat);
                      if (m.qrBase === 'beveled') {
                          baseMesh.position.z = -dep*0.1 - baseDepth - size; // offset for ExtrudeGeo start position
                      } else {
                          baseMesh.position.z = -dep*0.1;
                      }
                      
                      baseMesh.castShadow = true; baseMesh.receiveShadow = true;
                      qrGroup.add(baseMesh);

                      const isFinderPattern = (c, r) => {
                          if (c < 7 && r < 7) return true;
                          if (c >= S - 7 && r < 7) return true;
                          if (c < 7 && r >= S - 7) return true;
                          return false;
                      };

                      for (let row = 0; row < S; row++) {
                          for (let col = 0; col < S; col++) {
                              // Cutout logic: We skip modules in the center to make room for a clean logo area.
                              // This is much better for scannability than just overlaying the logo.
                              if (hasLogo && col >= cutoutStart && col <= cutoutEnd && row >= cutoutStart && row <= cutoutEnd) {
                                  continue; 
                              }
                              
                              const px = Math.floor(start + (col + 0.5) * M);
                              const py = Math.floor(start + (row + 0.5) * M);
                              
                              if (getPixel(px, py) < 128) {
                                  // Force solid squares for finder patterns to ensure scannability
                                  const useSquare = isFinderPattern(col, row);
                                  const geo = useSquare ? squareGeo : customGeo;
                                  
                                  const mod = new THREE.Mesh(geo, fgMat);
                                  
                                  let moduleDep = dep;
                                  if (m.qrCityscape && !useSquare) {
                                      // Skyline effect: random height but keep it substantial for 3D feel
                                      moduleDep = dep * (0.5 + Math.random() * 0.5);
                                      mod.scale.z = moduleDep / dep;
                                  }
                                  
                                  mod.position.set((col - S/2 + 0.5) * size, -((row - S/2 + 0.5) * size), moduleDep*0.5);
                                  if (shape === 'diamond' && !useSquare) mod.rotation.z = Math.PI/4;
                                  
                                  mod.castShadow = true; mod.receiveShadow = true;
                                  qrGroup.add(mod);
                              }
                          }
                      }
                      
                      if (hasLogo) {
                          const texLoader = new THREE.TextureLoader();
                          texLoader.load(m.qrLogoB64, (tex) => {
                              const logoAreaSize = (cutoutSize + 1) * size;
                              const logoSize = cutoutSize * size;
                              
                              // White background for the logo to ensure high contrast and clear boundaries for the scanner
                              const bgGeo = new THREE.PlaneGeometry(logoAreaSize, logoAreaSize);
                              const bgMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
                              const bgMesh = new THREE.Mesh(bgGeo, bgMat);
                              bgMesh.position.z = dep + 0.01;
                              qrGroup.add(bgMesh);

                              const logoGeo = new THREE.PlaneGeometry(logoSize, logoSize);
                              const logoMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
                              const logoMesh = new THREE.Mesh(logoGeo, logoMat);
                              logoMesh.position.z = dep + 0.05;
                              qrGroup.add(logoMesh);
                          });
                      }

                      // High-tech Laser Sweep Effect
                      const laserGeo = new THREE.PlaneGeometry(baseWidth * 1.05, size * 0.3);
                      const laserMat = new THREE.MeshBasicMaterial({ 
                          color: '#10b981', transparent: true, opacity: 0.6, side: THREE.DoubleSide,
                          blending: THREE.AdditiveBlending
                      });
                      const laser = new THREE.Mesh(laserGeo, laserMat);
                      laser.position.z = dep + 0.1;
                      qrGroup.add(laser);

                      scene.animCbs = scene.animCbs || [];
                      scene.animCbs.push(() => {
                          const t = Date.now() * 0.0015;
                          laser.position.y = Math.sin(t) * (baseWidth * 0.45);
                          laser.material.opacity = 0.4 + Math.sin(t * 10) * 0.2; // flicker
                      });
                      
                      meshGroup.add(qrGroup);
                      
                      if(m.qrAnim) {
                          scene.animCbs = scene.animCbs || [];
                          scene.animCbs.push((w) => {
                              qrGroup.position.z = Math.sin(Date.now() * 0.003) * 2;
                              const s = 1.0 + Math.sin(Date.now() * 0.002) * 0.02;
                              qrGroup.scale.set(s, s, s);
                          });
                      }
                      
                      if (m.qrParticles) {
                          const ptGeo = new THREE.BufferGeometry();
                          const ptCount = 200;
                          const posArray = new Float32Array(ptCount * 3);
                          const velArray = [];
                          for(let i=0; i<ptCount; i++) {
                              posArray[i*3] = (Math.random() - 0.5) * baseWidth * 0.8;
                              posArray[i*3+1] = (Math.random() - 0.5) * baseWidth * 0.8;
                              posArray[i*3+2] = Math.random() * 30;
                              velArray.push(0.05 + Math.random() * 0.15);
                          }
                          ptGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                          const pColor = (m.qrMat === 'gold') ? '#ffd700' : fgCol;
                          const ptMat = new THREE.PointsMaterial({
                              size: 0.8, color: pColor, transparent: true, opacity: 0.8,
                              blending: THREE.AdditiveBlending, depthWrite: false
                          });
                          const points = new THREE.Points(ptGeo, ptMat);
                          points.position.z = dep;
                          qrGroup.add(points);
                          
                          scene.animCbs = scene.animCbs || [];
                          scene.animCbs.push((w) => {
                              const pos = ptGeo.attributes.position.array;
                              for(let i=0; i<ptCount; i++) {
                                  pos[i*3+2] += velArray[i];
                                  if (pos[i*3+2] > 40) {
                                      pos[i*3+2] = 0;
                                      pos[i*3] = (Math.random() - 0.5) * baseWidth * 0.8;
                                      pos[i*3+1] = (Math.random() - 0.5) * baseWidth * 0.8;
                                  }
                              }
                              ptGeo.attributes.position.needsUpdate = true;
                          });
                      }
                      
                  } else {
                      qr.size = 1024; // High res for Texture
                      const Texture = new THREE.CanvasTexture(qr.canvas);
                      Texture.magFilter = THREE.NearestFilter;
                      const plateGeo = new THREE.BoxGeometry(100, 100, m.depth || 2);
                      const plateMats = [
                          new THREE.MeshStandardMaterial({ color: 0xffffff }), 
                          new THREE.MeshStandardMaterial({ color: 0xffffff }), 
                          new THREE.MeshStandardMaterial({ color: 0xffffff }), 
                          new THREE.MeshStandardMaterial({ color: 0xffffff }), 
                          new THREE.MeshStandardMaterial({ map: Texture, roughness: 1.0, metalness: 0.0 }),
                          new THREE.MeshStandardMaterial({ color: 0xffffff })
                      ];
                      const mesh = new THREE.Mesh(plateGeo, plateMats);
                      mesh.castShadow = true; mesh.receiveShadow = true;
                      meshGroup.add(mesh);
                  }

                  if (m.hasFrame && !isAdvanced) {
                      const frameGeo = new THREE.BoxGeometry(110, 110, (m.depth || 2) + 2);
                      const frameMat = new THREE.MeshStandardMaterial({ 
                          color: 0xcccccc, metalness: 1.0, roughness: 0.1, transparent: true, opacity: 0.5 
                      });
                      const frame = new THREE.Mesh(frameGeo, frameMat);
                      frame.position.z = -1;
                      meshGroup.add(frame);
                  }
              } catch(e) { console.error("QR Error", e); }
          };

          if(window.QRious) {
              doBuild();
          } else {
              const waitQR = () => {
                  if(window.QRious) doBuild();
                  else setTimeout(waitQR, 50);
              };
              waitQR();
          }
      }

      const bevel = m.bevelVal > 0;
      const dRawMax = m.type === 'dxf' ? rawMax : 100;
      const wallThickness = dRawMax * (bevel ? (0.005 + m.bevelVal * 0.001) : 0.002); 
      const wallDepth = (m.depth / 100) * dRawMax * 0.5;

      const extrudeSettings = { depth: wallDepth, bevelEnabled: bevel, bevelThickness: dRawMax * (m.bevelVal * 0.001), bevelSize: dRawMax * (m.bevelVal * 0.0005), bevelSegments: 4, curveSegments: 16 };
      if(m.type !== 'dxf') {
          extrudeSettings.depth = m.depth;
          extrudeSettings.bevelThickness = m.bevelVal;
          extrudeSettings.bevelSize = m.bevelVal;
      }

      const renderStyle = m.renderStyle || (m.wireframe ? 'wireframe' : 'solid');

      let material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(m.colorHex), emissive: new THREE.Color(m.emissiveHex),
          roughness: m.roughness, metalness: m.metalness,
          transparent: m.opacity < 1.0, opacity: m.opacity, wireframe: renderStyle === 'wireframe', side: THREE.DoubleSide
      });

      if (renderStyle === 'blueprint') {
          material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2 });
      } else if (renderStyle === 'points') {
          material = new THREE.PointsMaterial({ color: new THREE.Color(m.colorHex), size: 2, sizeAttenuation: false });
      }

      function processMesh(geo, addFunc) {
          if (renderStyle === 'points') {
              const pts = new THREE.Points(geo, material);
              addFunc(pts);
          } else {
              const mesh = new THREE.Mesh(geo, material);
              mesh.castShadow = true; mesh.receiveShadow = true;
              addFunc(mesh);
              if (renderStyle === 'blueprint') {
                  const edges = new THREE.EdgesGeometry(geo);
                  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: new THREE.Color(m.colorHex) }));
                  addFunc(line);
              }
          }
      }

      if(isText) {
          try {
              const fontToUse = m._fontObj || loadedFont;
              const textGroup = new THREE.Group();
              meshGroup.add(textGroup);
              
              const txtLayout = m.txtLayout || 'straight';
              const txtAnim = m.txtAnim || 'none';
              
              let currentX = 0;
              let currentY = 0;
              const letters = [];
              
              // We need to split text if it's animated per letter or uses special layout
              const needsSplit = txtLayout === 'curved' || txtLayout === 'vertical' || txtAnim === 'wave' || txtAnim === 'typewriter';
              
              if (!needsSplit) {
                  // Standard fast render
                  const tg = new THREE.TextGeometry(m.rawText, {
                      font: fontToUse, size: 50, height: extrudeSettings.depth, curveSegments: 12,
                      bevelEnabled: true, bevelThickness: 2, bevelSize: 1, bevelSegments: 3
                  });
                  tg.center(); // Center geometry
                  processMesh(tg, (obj) => textGroup.add(obj));
              } else {
                  // Split into individual letters
                  const chars = m.rawText.split('');
                  const radius = Math.max(100, chars.length * 15);
                  const angleStep = (Math.PI) / Math.max(1, chars.length);
                  let startAngle = Math.PI / 2 + (chars.length * angleStep) / 2;
                  
                  chars.forEach((char, idx) => {
                      if (char === ' ') {
                          if (txtLayout === 'straight' || txtAnim !== 'none') currentX += 20;
                          if (txtLayout === 'vertical') currentY -= 50;
                          return;
                      }
                      
                      const tGeo = new THREE.TextGeometry(char, {
                          font: fontToUse, size: 50, height: extrudeSettings.depth, curveSegments: 12,
                          bevelEnabled: true, bevelThickness: 2, bevelSize: 1, bevelSegments: 3
                      });
                      tGeo.computeBoundingBox();
                      const width = tGeo.boundingBox.max.x - tGeo.boundingBox.min.x;
                      
                      const lMesh = new THREE.Mesh(tGeo, material);
                      lMesh.castShadow = true; lMesh.receiveShadow = true;
                      
                      if (txtLayout === 'curved') {
                          const a = startAngle - (idx * angleStep);
                          lMesh.position.x = Math.cos(a) * radius;
                          lMesh.position.z = Math.sin(a) * radius - radius;
                          lMesh.rotation.y = -(a - Math.PI/2);
                      } else if (txtLayout === 'vertical') {
                          lMesh.position.y = currentY;
                          lMesh.position.x = -width / 2; // center align
                          currentY -= 60;
                      } else {
                          // Straight but split
                          lMesh.position.x = currentX;
                          currentX += width + 5;
                      }
                      
                      textGroup.add(lMesh);
                      letters.push({ mesh: lMesh, origY: lMesh.position.y, delay: idx * 100 });
                  });
                  
                  // Center the group if it's straight
                  if (txtLayout === 'straight' && txtAnim !== 'none') {
                      textGroup.position.x = -currentX / 2;
                  }
              }
              
              // Animations
              if (txtAnim !== 'none') {
                  scene.animCbs = scene.animCbs || [];
                  const startTime = Date.now();
                  
                  scene.animCbs.push((w) => {
                      const now = Date.now();
                      const t = now * 0.002;
                      
                      if (txtAnim === 'float') {
                          textGroup.position.y = Math.sin(t) * 15;
                      } else if (txtAnim === 'spin') {
                          textGroup.rotation.y += 0.02 * w;
                      } else if (txtAnim === 'wave' && needsSplit) {
                          letters.forEach((l, i) => {
                              l.mesh.position.y = l.origY + Math.sin(t * 2 + i * 0.5) * 20;
                          });
                      } else if (txtAnim === 'typewriter' && needsSplit) {
                          const elapsed = now - startTime;
                          letters.forEach(l => {
                              if (elapsed > l.delay) {
                                  l.mesh.scale.setScalar(THREE.MathUtils.lerp(l.mesh.scale.x, 1, 0.2));
                                  l.mesh.visible = true;
                              } else {
                                  l.mesh.scale.setScalar(0.001);
                                  l.mesh.visible = false;
                              }
                          });
                      }
                  });
              }

          } catch(e) { console.error("Text3D Error:", e); }
      } else if(m.format === 'math-surface') {
          const R = m.surfaceRange || 8, N = m.surfaceRes || 40;
          const geo = new THREE.PlaneGeometry(R*2, R*2, N, N); geo.rotateX(-Math.PI/2);
          const pos = geo.attributes.position;
          const ef = (f,x,y,t) => { try{ return new Function('x','y','t','sin','cos','tan','sqrt','abs','pow','exp','log','PI','atan2','floor','ceil','return ('+f+')')(x,y,t,Math.sin,Math.cos,Math.tan,Math.sqrt,Math.abs,Math.pow,Math.exp,Math.log,Math.PI,Math.atan2,Math.floor,Math.ceil)||0; } catch(e){return 0;} };
          let mn=1e9, mx=-1e9; const hs=new Float32Array(pos.count);
          for(let i=0;i<pos.count;i++){ 
            const v=ef(m.formula, pos.getX(i), pos.getZ(i), 0); hs[i]=isFinite(v)?v:0;
            if(hs[i]<mn)mn=hs[i]; if(hs[i]>mx)mx=hs[i];
          }
          const range = mx-mn||1; const cols=[];
          const gc = n => { 
            if(m.colorMode==='neon') return n<0.5?new THREE.Color(0,n*2,1):new THREE.Color((n-0.5)*2,1,0);
            if(m.colorMode==='thermal') { if(n<0.33)return new THREE.Color(0,0,n*3); if(n<0.66)return new THREE.Color(0,(n-0.33)*3,1); return new THREE.Color((n-0.66)*3,1,0); }
            return new THREE.Color().setHSL(0.67-n*0.67, 1, 0.45+n*0.1);
          };
          for(let i=0;i<pos.count;i++){ pos.setY(i, hs[i]); const c=gc((hs[i]-mn)/range); cols.push(c.r,c.g,c.b); }
          geo.setAttribute('color', new THREE.Float32BufferAttribute(cols,3));
          geo.computeVertexNormals();
          const mat = new THREE.MeshPhongMaterial({ vertexColors:true, wireframe:m.doWire, side:THREE.DoubleSide, shininess:80 });
          const mesh = new THREE.Mesh(geo, mat); meshGroup.add(mesh);
          if(m.doAnimate) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => {
              const t = Date.now()*0.001;
              for(let i=0;i<pos.count;i++){ 
                const v=ef(m.formula, pos.getX(i), pos.getZ(i), t); pos.setY(i, isFinite(v)?v:0);
              }
              pos.needsUpdate = true; geo.computeVertexNormals();
            });
          }
      } else if(m.format === 'data-chart') {
          const bars = m.chartData.rows; const maxV = Math.max(...bars.map(b=>+b[m.valueKey]||0))||1;
          bars.forEach((b,i) => {
            const val = +b[m.valueKey]||0, h = Math.max(0.5, (val/maxV)*30);
            const col = new THREE.Color().setHSL(i/bars.length*0.7, 1, 0.5);
            const geo = new THREE.BoxGeometry(4, h, 4);
            const mat = new THREE.MeshPhongMaterial({ color:col, emissive:col, emissiveIntensity:0.2 });
            const mesh = new THREE.Mesh(geo, mat); mesh.position.set((i-bars.length/2)*5.5, h/2, 0);
            meshGroup.add(mesh);
          });
      } else if(m.format === 'webcam-avatar') {
          const res = m.camRes || 64, depth = m.camDepth || 20;
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(res*res*3); const col = new Float32Array(res*res*3);
          for(let i=0;i<res*res;i++){
            pos[i*3]=(i%res)-res/2; pos[i*3+1]=-(Math.floor(i/res)-res/2); pos[i*3+2]=0;
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
          const mat = new THREE.PointsMaterial({ size: 0.8, vertexColors: true });
          const points = new THREE.Points(geo, mat); meshGroup.add(points);
          
          // Use a shared video element if possible, or create one
          let video = document.getElementById('_shared_webcam_v');
          if(!video) {
            video = document.createElement('video'); video.id = '_shared_webcam_v';
            video.autoplay = true; video.playsinline = true; video.style.display = 'none';
            document.body.appendChild(video);
            navigator.mediaDevices.getUserMedia({video:{width:res,height:res}}).then(s => video.srcObject = s);
          }
          const canvas = document.createElement('canvas'); canvas.width = res; canvas.height = res;
          const ctx = canvas.getContext('2d');

          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push(() => {
            if(video.readyState === video.HAVE_ENOUGH_DATA){
              ctx.drawImage(video, 0, 0, res, res);
              const img = ctx.getImageData(0,0,res,res).data;
              const pArr = geo.attributes.position.array; const cArr = geo.attributes.color.array;
              for(let i=0;i<res*res;i++){
                const r=img[i*4], g=img[i*4+1], b=img[i*4+2];
                pArr[i*3+2] = (r+g+b)/3 / 255 * depth;
                cArr[i*3] = r/255; cArr[i*3+1] = g/255; cArr[i*3+2] = b/255;
              }
              geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
            }
          });
      } else if(m.format === 'shader-mesh') {
          const mat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
            fragmentShader: m.shaderCode, side: THREE.DoubleSide
          });
          const geo = new THREE.SphereGeometry(20, 64, 64);
          const mesh = new THREE.Mesh(geo, mat); meshGroup.add(mesh);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push(() => { mat.uniforms.time.value = Date.now()*0.001; });
      } else if(m.format === 'starmap') {
          const count = m.starCount || 5000, size = m.starSize || 1.5;
          const geo = new THREE.BufferGeometry(); const pos = new Float32Array(count*3);
          for(let i=0;i<count;i++){
            const theta = Math.random()*Math.PI*2, phi = Math.acos(Math.random()*2-1), dist = 800+Math.random()*200;
            pos[i*3]=dist*Math.sin(phi)*Math.cos(theta); pos[i*3+1]=dist*Math.sin(phi)*Math.sin(theta); pos[i*3+2]=dist*Math.cos(phi);
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          const mat = new THREE.PointsMaterial({ size: size, color: 0xffffff, transparent: true, opacity: 0.8 });
          const pts = new THREE.Points(geo, mat); meshGroup.add(pts);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push(() => { pts.rotation.y += 0.0001; });
      } else if(m.format === 'keyframe-anim') {
          const geo = new THREE.BoxGeometry(10, 10, 10);
          const mat = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.3 });
          const mesh = new THREE.Mesh(geo, mat); meshGroup.add(mesh);
          const kf = m.keyframes;
          if(kf && kf.length > 1) {
              let currentKf = 0, t = 0;
              scene.animCbs = scene.animCbs || [];
              scene.animCbs.push((w) => {
                  t += 0.01 * w; if(t >= 1){ t=0; currentKf=(currentKf+1)%kf.length; }
                  const nextKf = (currentKf+1)%kf.length;
                  const k1 = kf[currentKf], k2 = kf[nextKf];
                  mesh.position.lerpVectors(new THREE.Vector3(k1.x, k1.y, k1.z), new THREE.Vector3(k2.x, k2.y, k2.z), t);
                  mesh.rotation.set(k1.rx+(k2.rx-k1.rx)*t, k1.ry+(k2.ry-k1.ry)*t, k1.rz+(k2.rz-k1.rz)*t);
              });
          }
      } else if(m.format === 'voice-sculpture') {
          const pts = []; m.samples.forEach((v,i) => pts.push(new THREE.Vector2(v*20 + 2, (i-64)*0.8)));
          const geo = new THREE.LatheGeometry(pts, 32);
          const mat = new THREE.MeshPhongMaterial({ color: m.sculptColor, emissive: m.sculptColor, emissiveIntensity: 0.2, side: THREE.DoubleSide, shininess: 80 });
          const mesh = new THREE.Mesh(geo, mat); meshGroup.add(mesh);
          if(m.sculptStyle === 'vortex') {
              scene.animCbs = scene.animCbs || [];
              scene.animCbs.push(() => { mesh.rotation.y += 0.02; mesh.rotation.z = Math.sin(Date.now()*0.001)*0.2; });
          }
      } else if(m.format === 'qr-labyrinth') {
          const res = m.qrRes, h = m.qrHeight, col = m.qrColor;
          const boxGeo = new THREE.BoxGeometry(1, 1, 1);
          const mat = new THREE.MeshPhongMaterial({ color: col });
          m.qrGrid.forEach((v, i) => {
              if(v === 1) {
                  const mesh = new THREE.Mesh(boxGeo, mat);
                  mesh.scale.set(4, h, 4);
                  mesh.position.set((i%res - res/2)*4, h/2, (Math.floor(i/res) - res/2)*4);
                  meshGroup.add(mesh);
              }
          });
      } else if(m.format === 'location-terrain') {
          const res = m.terrainRes, scale = m.terrainScale;
          const geo = new THREE.PlaneGeometry(200, 200, res-1, res-1); geo.rotateX(-Math.PI/2);
          const pos = geo.attributes.position;
          for(let i=0; i<pos.count; i++) pos.setY(i, m.terrainData[i] * scale);
          pos.needsUpdate = true; geo.computeVertexNormals();
          const mat = new THREE.MeshPhongMaterial({ color: m.terrainType==='islands'?0x0ea5e9:0x10b981, wireframe: false, shininess: 40 });
          const mesh = new THREE.Mesh(geo, mat); meshGroup.add(mesh);
      } else if(m.format === 'doc-gallery') {
          m.docItems.forEach((txt, i) => {
              const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
              const ctx = canvas.getContext('2d'); ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,512,128);
              ctx.fillStyle = m.docColor; ctx.font = 'bold 24px Inter'; ctx.textAlign = 'center';
              ctx.fillText(txt, 256, 70);
              const tex = new THREE.CanvasTexture(canvas);
              const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
              const mesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 10), mat);
              if(m.docLayout === 'spiral') {
                  const ang = i * 0.5; mesh.position.set(Math.cos(ang)*60, i*12, Math.sin(ang)*60); mesh.lookAt(0, i*12, 0);
              } else {
                  mesh.position.set(0, i*12, -100);
              }
              meshGroup.add(mesh);
          });
      } else if(m.format === 'pdf-gallery') {
          m.pdfImages.forEach((imgB64, i) => {
              const tex = new THREE.TextureLoader().load(imgB64);
              const geo = new THREE.PlaneGeometry(30, 40);
              const mat = new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, metalness: 0.1, roughness: 0.8 });
              const mesh = new THREE.Mesh(geo, mat);
              mesh.castShadow = true;
              if(m.pdfLayout === 'spiral') {
                  const ang = i * 0.8; 
                  mesh.position.set(Math.cos(ang)*50, i*10, Math.sin(ang)*50); 
                  mesh.lookAt(0, i*10, 0);
              } else if(m.pdfLayout === 'orbit') {
                  const ang = (i / m.pdfImages.length) * Math.PI * 2;
                  mesh.position.set(Math.cos(ang)*60, 0, Math.sin(ang)*60);
                  mesh.lookAt(0, 0, 0);
              } else {
                  mesh.position.set((i%4)*35 - 50, -Math.floor(i/4)*45, 0);
              }
              meshGroup.add(mesh);
          });
      } else if(m.format === 'csv-chart') {
          const rows = m.csvData.rows; const maxV = Math.max(...rows.map(r => +r[m.csvValueKey]||0))||1;
          const colorFns = {
            spectrum: (i,n) => new THREE.Color().setHSL(i/n*0.8, 1, 0.5),
            neon: (i,n) => new THREE.Color().setHSL(i/n*0.4+0.5, 1, 0.6),
            fire: (i,n) => new THREE.Color().setHSL(i/n*0.1, 1, 0.5),
            ocean: (i,n) => new THREE.Color().setHSL(0.55+i/n*0.1, 1, 0.5)
          };
          const cfn = colorFns[m.csvColorTheme] || colorFns.spectrum;
          rows.forEach((r, i) => {
            const val = +r[m.csvValueKey]||0, h = Math.max(0.5, (val/maxV)*40);
            const col = cfn(i, rows.length);
            let geo, mat = new THREE.MeshPhongMaterial({ color:col, emissive:col, emissiveIntensity:0.2 });
            if(m.csvChartType === 'bubbles') {
              geo = new THREE.SphereGeometry(h/5, 16, 16);
              const mesh = new THREE.Mesh(geo, mat);
              const ang = (i/rows.length)*Math.PI*2;
              mesh.position.set(Math.cos(ang)*50, 0, Math.sin(ang)*50);
              meshGroup.add(mesh);
            } else if(m.csvChartType === 'spiral') {
              geo = new THREE.BoxGeometry(4, h, 4);
              const mesh = new THREE.Mesh(geo, mat);
              const ang = i * 0.7;
              mesh.position.set(Math.cos(ang)*(20+i*3), h/2, Math.sin(ang)*(20+i*3));
              meshGroup.add(mesh);
            } else {
              geo = new THREE.BoxGeometry(4, h, 4);
              const mesh = new THREE.Mesh(geo, mat);
              mesh.position.set((i - rows.length/2)*5.5, h/2, 0);
              meshGroup.add(mesh);
            }
          });
      } else if(m.format === 'web-network') {
          const nodes = m.netNodes, links = m.netLinks || [], nSize = m.netNodeSize || 4;
          const nodeMat = new THREE.MeshPhongMaterial({ color: m.netNodeColor || '#06b6d4', emissive: m.netNodeColor||'#06b6d4', emissiveIntensity:0.3 });
          const linkMat = new THREE.LineBasicMaterial({ color: m.netLinkColor || '#3b82f6', transparent: true, opacity: 0.6 });
          const positions = {};
          nodes.forEach((n, i) => {
            let pos;
            if(m.netLayout === 'sphere') {
              const phi = Math.acos(1 - 2*(i+0.5)/nodes.length), theta = Math.PI*(1+Math.sqrt(5))*i;
              pos = new THREE.Vector3(Math.sin(phi)*Math.cos(theta)*60, Math.sin(phi)*Math.sin(theta)*60, Math.cos(phi)*60);
            } else if(m.netLayout === 'tree') {
              pos = new THREE.Vector3((i%5-2)*25, -Math.floor(i/5)*20, 0);
            } else {
              pos = new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100);
            }
            positions[n] = pos;
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(nSize, 12, 12), nodeMat.clone());
            sphere.position.copy(pos); meshGroup.add(sphere);
          });
          links.forEach(lk => {
            const p1 = positions[lk.from], p2 = positions[lk.to];
            if(!p1 || !p2) return;
            const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            meshGroup.add(new THREE.Line(geo, linkMat));
          });
      } else if(m.format === 'pixel-voxel') {
          const { pixels, width, height } = m.pxImgData;
          const vSize = m.pxVoxelSize || 3, hScale = m.pxHeightScale || 1;
          for(let y=0; y<height; y++) {
            for(let x=0; x<width; x++) {
              const idx=(y*width+x)*4;
              const a=pixels[idx+3];
              if(m.pxSkipAlpha && a<128) continue;
              const r=pixels[idx]/255, g=pixels[idx+1]/255, b=pixels[idx+2]/255;
              const brightness=(r+g+b)/3;
              const boxH=vSize*hScale*(0.5+brightness);
              const mat=new THREE.MeshPhongMaterial({color:new THREE.Color(r,g,b)});
              const mesh=new THREE.Mesh(new THREE.BoxGeometry(vSize,boxH,vSize),mat);
              mesh.position.set((x-width/2)*vSize, boxH/2, (y-height/2)*vSize);
              meshGroup.add(mesh);
            }
          }
      } else if(m.format === 'json-dashboard') {
          const entries = Object.entries(m.jsnData).filter(([k,v]) => typeof v === 'number');
          const maxV = Math.max(...entries.map(([,v])=>v))||1;
          const themes = { neon:'#10b981', cyber:'#06b6d4', fire:'#ef4444', spectrum:null };
          entries.forEach(([key,val], i) => {
            const norm = val/maxV;
            const hue = themes.spectrum ? null : null;
            const col = themes[m.jsnColorTheme] ? new THREE.Color(themes[m.jsnColorTheme]) : new THREE.Color().setHSL(i/entries.length*0.7,1,0.5);
            const mat = new THREE.MeshPhongMaterial({ color:col, emissive:col, emissiveIntensity:0.4, transparent:true, opacity:0.85 });
            const ang = (i/entries.length)*Math.PI*2;
            const r = 40;
            if(m.jsnStyle === 'gauges') {
              const h = norm*30+2;
              const mesh = new THREE.Mesh(new THREE.CylinderGeometry(2,3,h,16), mat);
              mesh.position.set(Math.cos(ang)*r, h/2, Math.sin(ang)*r);
              meshGroup.add(mesh);
            } else if(m.jsnStyle === 'spheres') {
              const sr = norm*10+2;
              const mesh = new THREE.Mesh(new THREE.SphereGeometry(sr,16,16), mat);
              mesh.position.set(Math.cos(ang)*r, 0, Math.sin(ang)*r);
              meshGroup.add(mesh);
              scene.animCbs = scene.animCbs||[];
              scene.animCbs.push((w)=>{ mesh.scale.setScalar(1+Math.sin(Date.now()*0.002+i)*0.1); });
            } else if(m.jsnStyle === 'rings') {
              const mesh = new THREE.Mesh(new THREE.TorusGeometry(norm*15+5,1.5,8,32), mat);
              mesh.position.set((i-entries.length/2)*20, 0, 0);
              meshGroup.add(mesh);
            } else {
              const h = norm*35+2;
              const mesh = new THREE.Mesh(new THREE.BoxGeometry(5,h,5), mat);
              mesh.position.set((i-entries.length/2)*7, h/2, 0);
              meshGroup.add(mesh);
            }
          });
      } else if(m.format === 'dna-helix') {
          const seq = m.dnaSequence || 'ATCGATCG';
          const twist = m.dnaTwist || 1.0, rad = m.dnaRadius || 15;
          const strands = m.dnaStyle === 'triple' ? 3 : m.dnaStyle === 'single' ? 1 : 2;
          const colorMap = { A:'#ef4444', T:'#3b82f6', C:'#10b981', G:'#f59e0b' };
          const neonMap = ['#f472b6','#22d3ee','#4ade80','#fb923c'];
          for(let s=0; s<strands; s++) {
            const angleOffset = (s/strands)*Math.PI*2;
            seq.split('').forEach((ch, i) => {
              let col;
              if(m.dnaColorMode === 'dna') col = new THREE.Color(colorMap[ch.toUpperCase()]||'#a78bfa');
              else if(m.dnaColorMode === 'rainbow') col = new THREE.Color().setHSL(i/seq.length,1,0.6);
              else if(m.dnaColorMode === 'fire') col = new THREE.Color().setHSL(i/seq.length*0.15,1,0.55);
              else col = new THREE.Color(neonMap[i%neonMap.length]);
              const ang = (i/seq.length)*Math.PI*2*twist*3 + angleOffset;
              const y = (i/seq.length)*80 - 40;
              const mat = new THREE.MeshPhongMaterial({ color:col, emissive:col, emissiveIntensity:0.5 });
              const ball = new THREE.Mesh(new THREE.SphereGeometry(2,8,8), mat);
              ball.position.set(Math.cos(ang)*rad, y, Math.sin(ang)*rad);
              meshGroup.add(ball);
              if(i>0 && strands===2 && s===0 && i%3===0) {
                const p1 = ball.position.clone();
                const ang2 = ang + Math.PI;
                const p2 = new THREE.Vector3(Math.cos(ang2)*rad, y, Math.sin(ang2)*rad);
                const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
                meshGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color:0xffffff, transparent:true, opacity:0.3 })));
              }
            });
          }
          scene.animCbs = scene.animCbs||[];
          scene.animCbs.push((w) => { meshGroup.rotation.y += 0.003*w; });
      } else if(m.format === 'geo-globe') {
          const R = m.geoRadius || 50;
          let globeMat;
          if(m.geoStyle==='wire') globeMat = new THREE.MeshBasicMaterial({ color: m.geoColor||'#0ea5e9', wireframe:true });
          else if(m.geoStyle==='dots') globeMat = new THREE.PointsMaterial({ color: m.geoColor||'#0ea5e9', size:1.5 });
          else if(m.geoStyle==='hologram') globeMat = new THREE.MeshBasicMaterial({ color: m.geoColor||'#00ffff', wireframe:true, transparent:true, opacity:0.3 });
          else globeMat = new THREE.MeshPhongMaterial({ color: m.geoColor||'#0ea5e9', transparent:true, opacity:0.7, wireframe:false });
          const globeGeo = new THREE.SphereGeometry(R, 32, 32);
          const globe = m.geoStyle==='dots' ? new THREE.Points(globeGeo, globeMat) : new THREE.Mesh(globeGeo, globeMat);
          meshGroup.add(globe);
          (m.geoMarkers||[]).forEach(mk => {
            const lat = mk.lat*Math.PI/180, lon = mk.lon*Math.PI/180;
            const x = R*Math.cos(lat)*Math.cos(lon), y = R*Math.sin(lat), z = R*Math.cos(lat)*Math.sin(lon);
            const mh = m.geoMarkerH || 8;
            const mMat = new THREE.MeshPhongMaterial({ color:'#ef4444', emissive:'#ef4444', emissiveIntensity:0.8 });
            const marker = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, mh, 8), mMat);
            marker.position.set(x, y, z);
            marker.lookAt(0, 0, 0); marker.rotateX(Math.PI/2);
            meshGroup.add(marker);
          });
          scene.animCbs = scene.animCbs||[];
          scene.animCbs.push((w) => { globe.rotation.y += 0.002*w; });
      } else if(m.format === 'palette-world') {
          const colors = m.palColors || ['#ff6b6b','#feca57','#48dbfb'];
          const density = m.palDensity || 8;
          colors.forEach((hex, ci) => {
            const col = new THREE.Color(hex);
            const mat = new THREE.MeshPhongMaterial({ color:col, emissive:col, emissiveIntensity:0.2 });
            for(let d=0; d<density; d++) {
              const ang = (d/density)*Math.PI*2 + (ci/colors.length)*Math.PI*2;
              const orb = (ci+1)*20;
              const x = Math.cos(ang)*orb, z = Math.sin(ang)*orb;
              let mesh;
              if(m.palStyle === 'city') {
                const h = 10+Math.random()*30;
                mesh = new THREE.Mesh(new THREE.BoxGeometry(5,h,5), mat);
                mesh.position.set(x, h/2, z);
              } else if(m.palStyle === 'landscape') {
                const h = 5+Math.random()*15;
                mesh = new THREE.Mesh(new THREE.ConeGeometry(4,h,6), mat);
                mesh.position.set(x, h/2, z);
              } else if(m.palStyle === 'galaxy') {
                const r = Math.random()*3+1;
                mesh = new THREE.Mesh(new THREE.SphereGeometry(r,8,8), mat);
                mesh.position.set(x, (Math.random()-0.5)*50, z);
              } else {
                const r = 3+Math.random()*5;
                mesh = new THREE.Mesh(new THREE.SphereGeometry(r,12,12), mat);
                mesh.position.set(x, Math.sin(ang+ci)*20, z);
              }
              meshGroup.add(mesh);
            }
          });
          scene.animCbs = scene.animCbs||[];
          scene.animCbs.push((w) => { meshGroup.rotation.y += 0.001*w; });
      } else if(m.format === 'sentiment-landscape') {
          const EMOTION_CFG = {
            positive: { peakH:40, valleyH:5, colA:'#10b981', colB:'#34d399' },
            negative:  { peakH:8,  valleyH:-30, colA:'#334155', colB:'#1e3a5f' },
            angry:    { peakH:50, valleyH:-10, colA:'#ef4444', colB:'#f97316' },
            fear:     { peakH:25, valleyH:-25, colA:'#7c3aed', colB:'#1e1b4b' },
            energy:   { peakH:60, valleyH:10,  colA:'#facc15', colB:'#f59e0b' }
          };
          const dom = (m.sentAnalysis && m.sentAnalysis.dominant) || 'positive';
          const cfg = EMOTION_CFG[dom] || EMOTION_CFG.positive;
          const N = m.sentRes || 40, amp = m.sentAmp || 1.0;
          const words = (m.sentAnalysis && m.sentAnalysis.words) || [];
          const geo = new THREE.PlaneGeometry(120, 120, N-1, N-1);
          geo.rotateX(-Math.PI/2);
          const pos = geo.attributes.position;
          const cols = [];
          // Seed heights from word scores
          const rng = (i) => Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5;
          const wScore = (w) => { const code = w.split('').reduce((a,c) => a + c.charCodeAt(0), 0); return code; };
          for (let i = 0; i < pos.count; i++) {
            const xi = i % N, zi = Math.floor(i / N);
            const wordIdx = (xi + zi * N) % Math.max(words.length, 1);
            const seed = words.length > 0 ? (wScore(words[wordIdx % words.length]) % 100) / 100 : rng(i);
            let h;
            const style = m.sentTerrainStyle || 'smooth';
            if (style === 'sharp') h = seed > 0.5 ? cfg.peakH * (seed - 0.5) * 2 * amp : cfg.valleyH * (0.5 - seed) * 2 * amp;
            else if (style === 'waves') h = Math.sin(xi * 0.4) * Math.cos(zi * 0.4) * (cfg.peakH / 2) * amp * seed;
            else if (style === 'crystal') h = Math.floor(seed * 5) / 5 * cfg.peakH * amp;
            else h = (Math.sin(xi * 0.3) * Math.cos(zi * 0.3) * 0.5 + seed * 0.5) * cfg.peakH * amp;
            pos.setY(i, h);
            const t = (h - cfg.valleyH) / ((cfg.peakH - cfg.valleyH) || 1);
            const colLow = new THREE.Color(cfg.colB), colHigh = new THREE.Color(cfg.colA);
            const c = colLow.lerp(colHigh, Math.max(0, Math.min(1, t)));
            cols.push(c.r, c.g, c.b);
          }
          geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
          geo.computeVertexNormals();
          const mat = new THREE.MeshPhongMaterial({ vertexColors: true, wireframe: false, side: THREE.DoubleSide, shininess: 60 });
          const mesh = new THREE.Mesh(geo, mat);
          meshGroup.add(mesh);
          if (m.sentAnimMode && m.sentAnimMode !== 'none') {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => {
              const t = Date.now() * 0.001;
              for (let i = 0; i < pos.count; i++) {
                const xi = i % N, zi = Math.floor(i / N);
                const base = pos.getY(i);
                if (m.sentAnimMode === 'breathe') pos.setY(i, base + Math.sin(t * 0.8) * 2);
                else pos.setY(i, base + Math.sin(t + xi * 0.3) * Math.cos(t * 0.5 + zi * 0.3) * 3 * amp);
              }
              pos.needsUpdate = true; geo.computeVertexNormals();
            });
          }
      } else if(m.format === 'fractal-3d') {
          const fType = m.fractalType || 'mandelbrot';
          const N = m.fractalRes || 60, maxIter = m.fractalIter || 32;
          const zoom = m.fractalZoom || 1.0, hScale = m.fractalHeightScale || 1.0;
          const cx = m.fractalCX || -0.5, cy = m.fractalCY || 0.0;
          const colorMode = m.fractalColorMode || 'psychedelic';
          const renderMode = m.fractalRenderMode || 'solid';

          const PALETTE = {
            psychedelic: (t) => new THREE.Color().setHSL(t * 0.8, 1, 0.5),
            fire:  (t) => new THREE.Color().setHSL(t * 0.15, 1, 0.4 + t * 0.3),
            ocean: (t) => new THREE.Color().setHSL(0.55 + t * 0.1, 1, 0.3 + t * 0.4),
            neon:  (t) => new THREE.Color().setHSL(t * 0.5 + 0.5, 1, 0.6),
            gold:  (t) => new THREE.Color().setHSL(0.12, 1, 0.3 + t * 0.4),
            ice:   (t) => new THREE.Color().setHSL(0.58 + t * 0.04, 0.8, 0.6 + t * 0.2)
          };
          const getCol = PALETTE[colorMode] || PALETTE.psychedelic;

          if (fType === 'mandelbrot' || fType === 'julia') {
            const geo = new THREE.PlaneGeometry(100, 100, N-1, N-1);
            geo.rotateX(-Math.PI/2);
            const pos = geo.attributes.position;
            const cols = [];
            for (let i = 0; i < pos.count; i++) {
              const xi = i % N, zi = Math.floor(i / N);
              const x0 = ((xi / N) * 3.5 - 2.5) / zoom + cx;
              const y0 = ((zi / N) * 2.0 - 1.0) / zoom + cy;
              let x = fType === 'julia' ? x0 : 0, y = fType === 'julia' ? y0 : 0;
              const jcr = m.fractalJR || -0.7, jci = m.fractalJI || 0.27;
              let iter = 0;
              while (iter < maxIter && x*x + y*y < 4) {
                const xn = x*x - y*y + (fType === 'julia' ? jcr : x0);
                const yn = 2*x*y + (fType === 'julia' ? jci : y0);
                x = xn; y = yn; iter++;
              }
              const t = iter / maxIter;
              const h = t * 30 * hScale;
              pos.setY(i, h);
              const c = getCol(t);
              cols.push(c.r, c.g, c.b);
            }
            geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
            geo.computeVertexNormals();
            let mat;
            if (renderMode === 'wireframe') mat = new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true });
            else if (renderMode === 'points') mat = new THREE.PointsMaterial({ vertexColors: true, size: 1.5 });
            else mat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 80, side: THREE.DoubleSide });
            const mesh = renderMode === 'points' ? new THREE.Points(geo, mat) : new THREE.Mesh(geo, mat);
            meshGroup.add(mesh);
          } else if (fType === 'sierpinski') {
            const depth = m.fractalDepth || 3;
            function addTetra(p0, p1, p2, p3, d) {
              if (d === 0) {
                const geo = new THREE.BufferGeometry();
                const verts = new Float32Array([
                  p0.x,p0.y,p0.z, p1.x,p1.y,p1.z, p2.x,p2.y,p2.z,
                  p0.x,p0.y,p0.z, p1.x,p1.y,p1.z, p3.x,p3.y,p3.z,
                  p0.x,p0.y,p0.z, p2.x,p2.y,p2.z, p3.x,p3.y,p3.z,
                  p1.x,p1.y,p1.z, p2.x,p2.y,p2.z, p3.x,p3.y,p3.z
                ]);
                geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
                geo.computeVertexNormals();
                const t = (p0.y + 30) / 60;
                const col = getCol(Math.max(0, Math.min(1, t)));
                meshGroup.add(new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: col, side: THREE.DoubleSide, shininess: 80 })));
                return;
              }
              const mid = (a, b) => new THREE.Vector3((a.x+b.x)/2, (a.y+b.y)/2, (a.z+b.z)/2);
              const m01=mid(p0,p1), m02=mid(p0,p2), m03=mid(p0,p3), m12=mid(p1,p2), m13=mid(p1,p3), m23=mid(p2,p3);
              addTetra(p0,m01,m02,m03,d-1); addTetra(m01,p1,m12,m13,d-1);
              addTetra(m02,m12,p2,m23,d-1); addTetra(m03,m13,m23,p3,d-1);
            }
            const s = 50;
            addTetra(
              new THREE.Vector3(0, s, 0),
              new THREE.Vector3(-s, -s*0.5, s),
              new THREE.Vector3(s, -s*0.5, s),
              new THREE.Vector3(0, -s*0.5, -s),
              Math.min(depth, 4)
            );
          } else if (fType === 'menger') {
            const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
            const size = 60; const step = size / (N > 30 ? 9 : 3);
            for (let x = -size/2; x < size/2; x += step) {
              for (let y = -size/2; y < size/2; y += step) {
                for (let z = -size/2; z < size/2; z += step) {
                  const nx = Math.abs(Math.round(x/step)) % 3;
                  const ny = Math.abs(Math.round(y/step)) % 3;
                  const nz = Math.abs(Math.round(z/step)) % 3;
                  if ((nx===1 && ny===1) || (nx===1 && nz===1) || (ny===1 && nz===1)) continue;
                  const t = (x + size/2) / size;
                  const col = getCol(t);
                  const mesh = new THREE.Mesh(cubeGeo, new THREE.MeshPhongMaterial({ color: col, shininess: 80 }));
                  mesh.position.set(x + step/2, y + step/2, z + step/2);
                  mesh.scale.setScalar(step * 0.95);
                  meshGroup.add(mesh);
                }
              }
            }
          } else if (fType === 'dragon') {
            let pts = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)];
            const iters = Math.min(maxIter, 12);
            for (let i = 0; i < iters; i++) {
              const last = pts[pts.length - 1];
              const newPts = [];
              for (let j = pts.length - 2; j >= 0; j--) {
                const p = pts[j]; const n = new THREE.Vector2(last.x + (p.y - last.y), last.y - (p.x - last.x));
                newPts.push(n);
              }
              pts = pts.concat(newPts);
            }
            const geo = new THREE.BufferGeometry();
            const verts = [];
            pts.forEach((p, i) => {
              const h = Math.sin(i / pts.length * Math.PI * 4) * 20 * hScale;
              verts.push(p.x * 40, h, p.y * 40);
            });
            geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
            const t = 0.6;
            meshGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: getCol(t) })));
          } else if (fType === 'snowflake') {
            function kochPts(pts, depth) {
              if (depth === 0) return pts;
              const next = [];
              for (let i = 0; i < pts.length - 1; i++) {
                const a = pts[i], b = pts[i+1];
                const d = new THREE.Vector2(b.x-a.x, b.y-a.y);
                const p1 = new THREE.Vector2(a.x + d.x/3, a.y + d.y/3);
                const p2 = new THREE.Vector2(a.x + d.x/2 - d.y*Math.sqrt(3)/6, a.y + d.y/2 + d.x*Math.sqrt(3)/6);
                const p3 = new THREE.Vector2(a.x + d.x*2/3, a.y + d.y*2/3);
                next.push(a, p1, p2, p3);
              }
              next.push(pts[pts.length-1]);
              return kochPts(next, depth-1);
            }
            const sides = 3, R = 40, dep = Math.min(m.fractalDepth || 3, 5);
            const initPts = [];
            for (let i = 0; i <= sides; i++) {
              const ang = (i/sides)*Math.PI*2 - Math.PI/2;
              initPts.push(new THREE.Vector2(Math.cos(ang)*R, Math.sin(ang)*R));
            }
            const flakePts = kochPts(initPts, dep);
            const geo = new THREE.BufferGeometry();
            const verts = flakePts.map((p, i) => [p.x, Math.sin(i/flakePts.length*Math.PI*6)*5*hScale, p.y]).flat();
            geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
            meshGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: getCol(0.5) })));
          }

          if (m.fractalAnimate) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => { meshGroup.rotation.y += 0.005*w; meshGroup.rotation.x = Math.sin(Date.now()*0.0005)*0.1; });
          }
      } else if (m.format === 'midi-arch') {
          const themes = {
            spectrum: (i,n) => new THREE.Color().setHSL(i/n,1,0.5),
            gold: (i,n) => new THREE.Color().setHSL(0.12,1,0.4+0.4*(i/n)),
            neon: (i,n) => new THREE.Color().setHSL((i/n)*0.5+0.5,1,0.6),
            crystal: (i,n) => new THREE.Color().setHSL(0.6,0.8,0.5+0.3*(i/n))
          };
          const getCol = themes[m.colorTheme] || themes.spectrum;
          const trks = m.tracks || [];
          trks.forEach((trk, i) => {
            const h = trk.notes * 1.5;
            const col = getCol(i, Math.max(trks.length,1));
            const mat = new THREE.MeshPhongMaterial({color:col, emissive:col, emissiveIntensity:0.3, transparent:true, opacity:0.9});
            let geo, mesh;
            if (m.buildStyle === 'concert') {
              const ang = (i/trks.length) * Math.PI;
              geo = new THREE.CylinderGeometry(5,5,h,16);
              mesh = new THREE.Mesh(geo, mat);
              mesh.position.set(Math.cos(ang)*40, h/2, Math.sin(ang)*-20);
            } else if (m.buildStyle === 'organic') {
              geo = new THREE.SphereGeometry(trk.notes/4+2, 16, 16);
              mesh = new THREE.Mesh(geo, mat);
              mesh.position.set((i - trks.length/2)*15, h/2, Math.sin(i)*10);
              mesh.scale.set(1, h/10, 1);
            } else {
              geo = new THREE.BoxGeometry(10, h, 10);
              mesh = new THREE.Mesh(geo, mat);
              mesh.position.set((i%5 - 2)*15, h/2, Math.floor(i/5)*15);
            }
            meshGroup.add(mesh);
            if (m.doAnimate) {
              scene.animCbs = scene.animCbs || [];
              scene.animCbs.push((w) => { mesh.scale.y = 1 + Math.sin(Date.now()*0.005 + i)*0.2; });
            }
          });
      } else if (m.format === 'neural-net') {
          const ns = m.neuronSize || 3;
          const layout = m.netLayout || 'cortex';
          const density = m.detail !== undefined ? m.detail : 100;
          const lyrs = m.layers || [3, 128, 64, 10];
          
          const themes = { 
            cyber: { node: '#06b6d4', line: '#00d2ff', impulse: '#e0f7fa' }, 
            neon: { node: '#f472b6', line: '#ff73e6', impulse: '#fdf2f8' }, 
            matrix: { node: '#10b981', line: '#34d399', impulse: '#ecfdf5' }, 
            fire: { node: '#ef4444', line: '#facc15', impulse: '#fffde7' } 
          };
          const theme = themes[m.colorMode] || themes.cyber;
          const colNode = new THREE.Color(theme.node);
          const colLine = new THREE.Color(theme.line);
          const colImpulse = new THREE.Color(theme.impulse);
          
          const nodes = [];
          const synapses = [];
          const adjList = {};
          
          function createNeuronGeo() {
            if (m.neuronStyle === 'cube') return new THREE.BoxGeometry(ns*1.6, ns*1.6, ns*1.6);
            else if (m.neuronStyle === 'torus') return new THREE.TorusGeometry(ns*0.8, ns*0.25, 8, 16);
            else return new THREE.SphereGeometry(ns*0.8, 16, 16);
          }

          if (layout === 'cortex') {
              const N = density;
              const N_hemi = Math.floor(N * 0.8);
              const N_cere = Math.floor(N * 0.12);
              const N_stem = N - N_hemi - N_cere;
              
              for (let i = 0; i < N_hemi; i++) {
                  const theta = Math.acos(2 * Math.random() - 1);
                  const phi = Math.random() * Math.PI * 2;
                  const folds = 1 + 0.12 * Math.sin(7 * theta) * Math.sin(7 * phi);
                  
                  let x = 24 * folds * Math.sin(theta) * Math.cos(phi);
                  let y = 18 * folds * Math.cos(theta);
                  let z = 32 * folds * Math.sin(theta) * Math.sin(phi);
                  
                  const scaleZ = 1 - 0.2 * (z / 32);
                  x *= scaleZ;
                  y *= (1 - 0.08 * (z / 32));
                  
                  if (x >= 0) x += 2.2;
                  else x -= 2.2;
                  
                  nodes.push({ pos: new THREE.Vector3(x, y, z), type: 'cortex' });
              }
              
              for (let i = 0; i < N_cere; i++) {
                  const theta = Math.acos(2 * Math.random() - 1);
                  const phi = Math.random() * Math.PI * 2;
                  const folds = 1 + 0.08 * Math.sin(15 * theta);
                  
                  let x = 11 * folds * Math.sin(theta) * Math.cos(phi) + (Math.random() - 0.5) * 5;
                  let y = 7 * folds * Math.cos(theta) - 16;
                  let z = 11 * folds * Math.sin(theta) * Math.sin(phi) - 18;
                  
                  nodes.push({ pos: new THREE.Vector3(x, y, z), type: 'cerebellum' });
              }
              
              for (let i = 0; i < N_stem; i++) {
                  const t = i / Math.max(1, N_stem - 1);
                  const y = -16 - t * 22;
                  const x = (Math.random() - 0.5) * 4.5;
                  const z = -6 + (Math.random() - 0.5) * 4.5;
                  
                  nodes.push({ pos: new THREE.Vector3(x, y, z), type: 'stem' });
              }
              
              for (let i = 0; i < nodes.length; i++) {
                  const p1 = nodes[i].pos;
                  const dists = [];
                  for (let j = 0; j < nodes.length; j++) {
                      if (i === j) continue;
                      const p2 = nodes[j].pos;
                      const d = p1.distanceTo(p2);
                      dists.push({ index: j, d: d });
                  }
                  dists.sort((a, b) => a.d - b.d);
                  
                  const k = 3;
                  for (let n = 0; n < Math.min(k, dists.length); n++) {
                      const neighIdx = dists[n].index;
                      adjList[i] = adjList[i] || [];
                      if (!adjList[i].includes(neighIdx)) adjList[i].push(neighIdx);
                      adjList[neighIdx] = adjList[neighIdx] || [];
                      if (!adjList[neighIdx].includes(i)) adjList[neighIdx].push(i);
                      
                      if (i < neighIdx) {
                          synapses.push({ p1: p1, p2: nodes[neighIdx].pos });
                      }
                  }
              }
          } else if (layout === 'grid') {
              const nx = 5;
              const ny = 5;
              const nz = Math.max(1, Math.round(density / 25));
              const step = 15;
              const startX = -(nx - 1) * step / 2;
              const startY = -(ny - 1) * step / 2;
              const startZ = -(nz - 1) * step / 2;
              
              const gridMap = {};
              let idx = 0;
              for (let xi = 0; xi < nx; xi++) {
                  for (let yi = 0; yi < ny; yi++) {
                      for (let zi = 0; zi < nz; zi++) {
                          const pos = new THREE.Vector3(
                              startX + xi * step,
                              startY + yi * step,
                              startZ + zi * step
                          );
                          nodes.push({ pos: pos, grid: [xi, yi, zi] });
                          gridMap[`${xi},${yi},${zi}`] = idx;
                          idx++;
                      }
                  }
              }
              
              for (let xi = 0; xi < nx; xi++) {
                  for (let yi = 0; yi < ny; yi++) {
                      for (let zi = 0; zi < nz; zi++) {
                          const curIdx = gridMap[`${xi},${yi},${zi}`];
                          const neighbors = [
                              [xi + 1, yi, zi],
                              [xi, yi + 1, zi],
                              [xi, yi, zi + 1]
                          ];
                          neighbors.forEach(([nx, ny, nz]) => {
                              const nIdx = gridMap[`${nx},${ny},${nz}`];
                              if (nIdx !== undefined) {
                                  adjList[curIdx] = adjList[curIdx] || [];
                                  adjList[curIdx].push(nIdx);
                                  adjList[nIdx] = adjList[nIdx] || [];
                                  adjList[nIdx].push(curIdx);
                                  
                                  synapses.push({ p1: nodes[curIdx].pos, p2: nodes[nIdx].pos });
                              }
                          });
                      }
                  }
              }
          } else {
              const lyrsParsed = lyrs.length > 1 ? lyrs : [8, 16, 16, 8];
              const positions = [];
              let curIdx = 0;
              
              lyrsParsed.forEach((count, li) => {
                  const x = (li - (lyrsParsed.length - 1) / 2) * 35;
                  const pts = [];
                  for (let i = 0; i < count; i++) {
                      const y = (i - (count - 1) / 2) * (140 / Math.max(count, 1));
                      const z = Math.sin(i) * 8;
                      const pos = new THREE.Vector3(x, y, z);
                      nodes.push({ pos: pos, layer: li, nodeIdx: i });
                      pts.push(curIdx);
                      curIdx++;
                  }
                  positions.push(pts);
              });
              
              for (let li = 0; li < positions.length - 1; li++) {
                  const l1 = positions[li], l2 = positions[li+1];
                  l1.forEach(i1 => {
                      l2.forEach(i2 => {
                          const prob = l2.length > 10 ? 0.35 : 0.75;
                          if (Math.random() < prob) {
                              adjList[i1] = adjList[i1] || [];
                              adjList[i1].push(i2);
                              adjList[i2] = adjList[i2] || [];
                              adjList[i2].push(i1);
                              
                              synapses.push({ p1: nodes[i1].pos, p2: nodes[i2].pos });
                          }
                      });
                  });
              }
          }

          const nodeMeshes = [];
          const linkMat = new THREE.LineBasicMaterial({ color: colLine, transparent: true, opacity: 0.22 });
          
          nodes.forEach((n, idx) => {
              const geo = createNeuronGeo();
              const mat = new THREE.MeshPhongMaterial({
                  color: colNode,
                  emissive: colNode,
                  emissiveIntensity: 0.6,
                  shininess: 70
              });
              const mesh = new THREE.Mesh(geo, mat);
              mesh.position.copy(n.pos);
              meshGroup.add(mesh);
              
              mesh._index = idx;
              mesh._baseScale = 1.0;
              mesh._wasHovered = false;
              nodeMeshes.push(mesh);
          });

          synapses.forEach(syn => {
              const geo = new THREE.BufferGeometry().setFromPoints([syn.p1, syn.p2]);
              const line = new THREE.Line(geo, linkMat);
              meshGroup.add(line);
          });

          const impulses = [];
          const numRegularImpulses = Math.max(5, Math.floor(nodes.length * 0.35));
          const impGeo = new THREE.SphereGeometry(ns * 0.35, 8, 8);
          const impMat = new THREE.MeshBasicMaterial({ color: colImpulse });
          
          if (m.doAnimate && synapses.length > 0) {
              for (let i = 0; i < numRegularImpulses; i++) {
                  const syn = synapses[Math.floor(Math.random() * synapses.length)];
                  const mesh = new THREE.Mesh(impGeo, impMat);
                  meshGroup.add(mesh);
                  
                  impulses.push({
                      mesh: mesh,
                      p1: syn.p1,
                      p2: syn.p2,
                      progress: Math.random(),
                      speed: 0.015 + Math.random() * 0.02,
                      isTemp: false
                  });
              }
          }

          if (!window._seMouseListenerAdded) {
              window._seMouseListenerAdded = true;
              window._seMouse = new THREE.Vector2(-9999, -9999);
              window.addEventListener('pointermove', (e) => {
                  const canvas = document.querySelector('canvas');
                  if (canvas) {
                      const rect = canvas.getBoundingClientRect();
                      window._seMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                      window._seMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  }
              });
          }
          
          if (m.doAnimate) {
              scene.animCbs = scene.animCbs || [];
              const raycaster = new THREE.Raycaster();
              
              const animCb = (w) => {
                  meshGroup.rotation.y += 0.002 * w;
                  
                  if (window._seMouse && camera) {
                      raycaster.setFromCamera(window._seMouse, camera);
                  }
                  
                  const tempPos = new THREE.Vector3();
                  
                  nodeMeshes.forEach(node => {
                      node.getWorldPosition(tempPos);
                      const dist = raycaster.ray.distanceToPoint(tempPos);
                      
                      if (dist < 18) {
                          node.scale.setScalar(THREE.MathUtils.lerp(node.scale.x, 1.5, 0.2));
                          node.material.emissiveIntensity = THREE.MathUtils.lerp(node.material.emissiveIntensity, 2.5, 0.2);
                          
                          if (!node._wasHovered) {
                              node._wasHovered = true;
                              const connections = adjList[node._index] || [];
                              connections.forEach(neighIdx => {
                                  const neighNode = nodeMeshes[neighIdx];
                                  if (neighNode) {
                                      const mesh = new THREE.Mesh(impGeo, impMat);
                                      meshGroup.add(mesh);
                                      mesh.position.copy(node.position);
                                      
                                      impulses.push({
                                          mesh: mesh,
                                          p1: node.position,
                                          p2: neighNode.position,
                                          progress: 0,
                                          speed: 0.06 + Math.random() * 0.03,
                                          isTemp: true
                                      });
                                  }
                              });
                          }
                      } else {
                          node._wasHovered = false;
                          node.scale.setScalar(THREE.MathUtils.lerp(node.scale.x, 1.0, 0.1));
                          node.material.emissiveIntensity = THREE.MathUtils.lerp(node.material.emissiveIntensity, 0.6, 0.1);
                      }
                  });
                  
                  for (let i = impulses.length - 1; i >= 0; i--) {
                      const imp = impulses[i];
                      imp.progress += imp.speed * w;
                      
                      if (imp.progress >= 1.0) {
                          if (imp.isTemp) {
                              meshGroup.remove(imp.mesh);
                              if (imp.mesh.geometry) imp.mesh.geometry.dispose();
                              impulses.splice(i, 1);
                              continue;
                          } else {
                              imp.progress = 0;
                              if (synapses.length > 0) {
                                  const syn = synapses[Math.floor(Math.random() * synapses.length)];
                                  imp.p1 = syn.p1;
                                  imp.p2 = syn.p2;
                              }
                              imp.speed = 0.015 + Math.random() * 0.02;
                          }
                      }
                      imp.mesh.position.lerpVectors(imp.p1, imp.p2, imp.progress);
                  }
              };
              
              animCb._modelId = m.id;
              scene.animCbs = scene.animCbs.filter(cb => cb._modelId !== m.id);
              scene.animCbs.push(animCb);
          }
      } else if (m.format === 'timeline-river') {
          const evs = m.events || [];
          const themes = { golden:'#f59e0b', neon:'#06b6d4', stone:'#94a3b8' };
          const col = new THREE.Color(themes[m.colorTheme] || '#f59e0b');
          const mat = new THREE.MeshPhongMaterial({color:col, emissive:col, emissiveIntensity:0.2});
          const loader = new THREE.FontLoader();
          loader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            evs.forEach((ev, i) => {
              const textGeo = new THREE.TextGeometry(ev.year + ': ' + ev.label, { font: font, size: 4, height: 1 });
              const tMesh = new THREE.Mesh(textGeo, mat);
              let x, y, z;
              if (m.riverStyle === 'pillars') { x = (i-evs.length/2)*15; y = i*5; z = 0; }
              else if (m.riverStyle === 'spiral') { const ang = i*0.8; x = Math.cos(ang)*(10+i*3); y = i*5; z = Math.sin(ang)*(10+i*3); }
              else { x = (i-evs.length/2)*20; y = Math.sin(i)*10; z = (i%2===0?10:-10); }
              tMesh.position.set(x, y+5, z);
              meshGroup.add(tMesh);
              const pGeo = new THREE.CylinderGeometry(5, 5, 2, 16);
              const pMesh = new THREE.Mesh(pGeo, mat);
              pMesh.position.set(x + 10, y, z);
              meshGroup.add(pMesh);
            });
          });
          if (m.doAnimate) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => { meshGroup.position.x = Math.sin(Date.now()*0.001)*10; });
          }
      } else if (m.format === 'chess-board') {
          const bmats = {
            classic: {w:'#fcd34d', b:'#78350f'},
            marble:  {w:'#f8fafc', b:'#334155'},
            crystal: {w:'#e0f2fe', b:'#1e3a8a'},
            neon:    {w:'#06b6d4', b:'#ec4899'}
          };
          const cols = bmats[m.boardMat] || bmats.classic;
          const wMat = new THREE.MeshPhongMaterial({color:cols.w, shininess:80, transparent:m.boardMat==='crystal', opacity:m.boardMat==='crystal'?0.7:1});
          const bMat = new THREE.MeshPhongMaterial({color:cols.b, shininess:80, transparent:m.boardMat==='crystal', opacity:m.boardMat==='crystal'?0.7:1});
          const bwMat = new THREE.MeshPhongMaterial({color:'#ffffff'});
          const bbMat = new THREE.MeshPhongMaterial({color:'#000000'});
          
          if (m.mode === 'sudoku') {
            const grid = m.sudoku || ''.padStart(81, '0');
            for (let i = 0; i < 81; i++) {
              const val = grid[i];
              const r = Math.floor(i/9), c = i%9;
              const x = (c - 4)*10, z = (r - 4)*10;
              const cell = new THREE.Mesh(new THREE.BoxGeometry(9.5,2,9.5), ((Math.floor(r/3)+Math.floor(c/3))%2===0) ? wMat : bMat);
              cell.position.set(x, -1, z);
              meshGroup.add(cell);
              if (val !== '0') {
                const geo = new THREE.BoxGeometry(6,6,6);
                const mesh = new THREE.Mesh(geo, bwMat);
                mesh.position.set(x, 3, z);
                meshGroup.add(mesh);
              }
            }
          } else {
            for (let r=0; r<8; r++) {
              for (let c=0; c<8; c++) {
                const x = (c - 3.5)*10, z = (r - 3.5)*10;
                const cell = new THREE.Mesh(new THREE.BoxGeometry(9.5,2,9.5), (r+c)%2===0 ? wMat : bMat);
                cell.position.set(x, -1, z);
                meshGroup.add(cell);
              }
            }
            const fen = m.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
            const rows = fen.split(' ')[0].split('/');
            rows.forEach((row, r) => {
              let c = 0;
              for (let i=0; i<row.length; i++) {
                const ch = row[i];
                if (/[1-8]/.test(ch)) { c += parseInt(ch); continue; }
                const isWhite = ch === ch.toUpperCase();
                const x = (c - 3.5)*10, z = (r - 3.5)*10;
                let h = 8;
                if (ch.toLowerCase()==='k') h=16; else if (ch.toLowerCase()==='q') h=14;
                const pMat = isWhite ? bwMat : bbMat;
                let geo;
                if (m.pieceStyle === 'ancient') geo = new THREE.CylinderGeometry(2, 4, h, 16);
                else if (m.pieceStyle === 'robot') geo = new THREE.BoxGeometry(5, h, 5);
                else geo = new THREE.ConeGeometry(4, h, 16);
                const piece = new THREE.Mesh(geo, pMat);
                piece.position.set(x, h/2, z);
                meshGroup.add(piece);
                c++;
              }
            });
          }
      } else if (m.format === 'biometric-avatar') {
          const aura = new THREE.Color(m.auraColor || '#ef4444');
          const mat = new THREE.MeshPhongMaterial({color:aura, emissive:aura, emissiveIntensity:0.4, transparent:true, opacity:0.8, wireframe:m.avatarForm==='orb'});
          let geo;
          if (m.avatarForm === 'human') geo = new THREE.CylinderGeometry(10, 10, 40, 16);
          else if (m.avatarForm === 'crystal') geo = new THREE.OctahedronGeometry(20, 1);
          else geo = new THREE.SphereGeometry(20, 32, 32);
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.y = 20;
          meshGroup.add(mesh);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
            const hr = (m.vitals.heartRate || 72) / 60;
            const br = (m.vitals.breathRate || 15) / 60;
            const en = (m.vitals.energy || 80) / 100;
            const t = Date.now() * 0.001;
            const pulse = 1 + Math.sin(t * hr * Math.PI * 2) * 0.1 * en;
            const breathe = 1 + Math.sin(t * br * Math.PI * 2) * 0.05;
            mesh.scale.set(pulse * breathe, breathe, pulse * breathe);
            mesh.rotation.y += 0.01 * en;
          });
      } else if (m.format === 'moodboard-world') {
          const themes = {
            cyberpunk:   {col:'#06b6d4', geo:'box'},
            renaissance: {col:'#d97706', geo:'cyl'},
            pastel:      {col:'#f9a8d4', geo:'sph'},
            darkfantasy: {col:'#4c1d95', geo:'cone'},
            space:       {col:'#1e40af', geo:'sph'},
            jungle:      {col:'#10b981', geo:'cyl'},
            underwater:  {col:'#0ea5e9', geo:'torus'},
            minimal:     {col:'#e2e8f0', geo:'box'}
          };
          const t = themes[m.mood] || themes.cyberpunk;
          const mat = new THREE.MeshPhongMaterial({color:t.col, emissive:t.col, emissiveIntensity:0.2});
          const comp = m.complexity || 5;
          for (let i=0; i<comp*10; i++) {
            let geo;
            const s = Math.random()*10+5;
            if (t.geo==='box') geo = new THREE.BoxGeometry(s,s*Math.random()*3,s);
            else if (t.geo==='cyl') geo = new THREE.CylinderGeometry(s/2,s/2,s*2,16);
            else if (t.geo==='cone') geo = new THREE.ConeGeometry(s/2,s*3,16);
            else if (t.geo==='torus') geo = new THREE.TorusGeometry(s,s/4,8,16);
            else geo = new THREE.SphereGeometry(s, 16, 16);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((Math.random()-0.5)*100, Math.random()*50, (Math.random()-0.5)*100);
            mesh.rotation.set(Math.random(), Math.random(), Math.random());
            meshGroup.add(mesh);
          }
          if (m.doAnimate) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => { meshGroup.rotation.y += 0.001*w; });
          }
      } else if (m.format === 'molecule-3d') {
          const asc = m.atomScale || 1.0, bsc = m.bondThick || 1.0;
          const ATOM_PROPS = {
            H:['#ffffff',0.4], C:['#404040',0.7], N:['#3b82f6',0.7], O:['#ef4444',0.65],
            F:['#10b981',0.55], P:['#f97316',0.8], S:['#facc15',0.9], Cl:['#22c55e',0.8]
          };
          const pts = [];
          (m.atoms || []).forEach(a => {
            const p = ATOM_PROPS[a.symbol] || ['#a855f7', 0.6];
            const mat = new THREE.MeshPhongMaterial({color:p[0], shininess:100});
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(p[1]*10*asc, 32, 32), mat);
            mesh.position.set(a.x*10, a.y*10, a.z*10);
            meshGroup.add(mesh);
            pts.push(mesh.position);
          });
          const bMat = new THREE.MeshPhongMaterial({color:'#cccccc'});
          (m.bonds || []).forEach(b => {
            const p1 = pts[b[0]], p2 = pts[b[1]];
            if (p1 && p2) {
              const dist = p1.distanceTo(p2);
              const cyl = new THREE.Mesh(new THREE.CylinderGeometry(2*bsc, 2*bsc, dist, 8), bMat);
              const mid = new THREE.Vector3().addVectors(p1,p2).multiplyScalar(0.5);
              cyl.position.copy(mid);
              cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), new THREE.Vector3().subVectors(p2,p1).normalize());
              meshGroup.add(cyl);
            }
          });
          if (m.doAnimate) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => { meshGroup.rotation.y += 0.005*w; meshGroup.rotation.z += 0.002*w; });
          }
      } else if (m.format === 'websocket-live') {
          const themes = { neon:'#10b981', cyber:'#06b6d4', fire:'#ef4444', matrix:'#22c55e' };
          const col = new THREE.Color(themes[m.colorTheme] || '#10b981');
          const mat = new THREE.MeshPhongMaterial({color:col, emissive:col, emissiveIntensity:0.4, wireframe:m.vizType==='terrain'});
          const hist = m.historyBuffer || 32;
          const meshes = [];
          for (let i=0; i<hist; i++) {
            let geo;
            if (m.vizType==='bars') geo = new THREE.BoxGeometry(4,4,4);
            else if (m.vizType==='orbs') geo = new THREE.SphereGeometry(4,16,16);
            else geo = new THREE.BoxGeometry(4,4,4);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((i-hist/2)*6, 0, 0);
            meshGroup.add(mesh);
            meshes.push(mesh);
          }
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
            const t = Date.now()*0.005;
            meshes.forEach((mesh, i) => {
              const val = Math.sin(t + i*0.2)*10 + 10;
              if (m.vizType==='bars') { mesh.scale.y = val/4; mesh.position.y = val/2; }
              else if (m.vizType==='orbs') { mesh.position.y = val; mesh.scale.setScalar(val/5); }
              else { mesh.position.y = val; }
            });
          });
      } else if (m.format === 'story-3d') {
          const sStyle = m.sceneStyle || 'fantasy';
          const scenes = m.scenes || [];
          const loader = new THREE.FontLoader();
          loader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            scenes.forEach((txt, i) => {
              const base = new THREE.Mesh(new THREE.BoxGeometry(80, 2, 80), new THREE.MeshPhongMaterial({color:'#334155'}));
              base.position.set(0, 0, -i*150);
              meshGroup.add(base);
              const tg = new THREE.TextGeometry("Scene " + (i+1), {font:font, size:5, height:1});
              const tm = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({color:'#ffffff'}));
              tm.position.set(-20, 10, -i*150 + 20);
              meshGroup.add(tm);
            });
          });
      } else if (m.format === 'crystal-gen') {
          const col = new THREE.Color(m.crystalColor || '#a855f7');
          const mat = new THREE.MeshPhysicalMaterial({color:col, metalness:m.metalness||0.5, roughness:0.1, transmission:m.transparency||0.6, transparent:true});
          const spk = m.spikes || 7;
          const h = (m.heightScale || 1.0) * 30;
          for (let i=0; i<spk; i++) {
            const geo = new THREE.ConeGeometry(5 + Math.random()*5, h + Math.random()*10, 6);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.set((Math.random()-0.5)*0.5, Math.random()*Math.PI, (Math.random()-0.5)*0.5);
            mesh.position.set((Math.random()-0.5)*10, h/2, (Math.random()-0.5)*10);
            meshGroup.add(mesh);
          }
          if (m.doGlow) {
            const glow = new THREE.Mesh(new THREE.SphereGeometry(10,16,16), new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.5}));
            glow.position.y = 10;
            meshGroup.add(glow);
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => { meshGroup.rotation.y += 0.005*w; });
          }
      } else if (m.format === 'botany-lsystem') {
          const rules = m.rules || {'F':'FF-[-F+F+F]+[+F-F-F]'};
          let seq = m.axiom || 'F';
          const iters = Math.min(m.iter || 4, 6);
          for(let i=0; i<iters; i++) {
            let nSeq = '';
            for(let j=0; j<seq.length; j++) nSeq += rules[seq[j]] || seq[j];
            seq = nSeq;
          }
          const ang = (m.angle || 22.5) * Math.PI / 180;
          const trunkMat = new THREE.MeshPhongMaterial({color:m.cTrunk||'#78350f', flatShading:true});
          const leafMat = new THREE.MeshPhongMaterial({color:m.cLeaf||'#10b981', flatShading:true, side:THREE.DoubleSide});
          const tGeo = new THREE.CylinderGeometry(0.5, 0.5, 4, 5); tGeo.translate(0,2,0);
          const lGeo = new THREE.ConeGeometry(2, 6, 4); lGeo.translate(0,3,0);
          const instT = new THREE.InstancedMesh(tGeo, trunkMat, 15000);
          const instL = new THREE.InstancedMesh(lGeo, leafMat, 15000);
          let tIdx = 0, lIdx = 0;
          let state = { p:new THREE.Vector3(0,0,0), d:new THREE.Vector3(0,1,0), q:new THREE.Quaternion() };
          const stack = [];
          const dummy = new THREE.Object3D();
          for(let i=0; i<seq.length; i++) {
            const c = seq[i];
            if(c==='F' || c==='X' || c==='Y') {
              dummy.position.copy(state.p); dummy.quaternion.copy(state.q);
              dummy.updateMatrix();
              if(i > seq.length*0.7 && Math.random()>0.5) instL.setMatrixAt(lIdx++, dummy.matrix);
              else instT.setMatrixAt(tIdx++, dummy.matrix);
              state.p.add(state.d.clone().multiplyScalar(4));
            } else if(c==='+') {
              const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), ang);
              state.q.multiply(q); state.d.applyQuaternion(q);
            } else if(c==='-') {
              const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), -ang);
              state.q.multiply(q); state.d.applyQuaternion(q);
            } else if(c==='&') {
              const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), ang);
              state.q.multiply(q); state.d.applyQuaternion(q);
            } else if(c==='^') {
              const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), -ang);
              state.q.multiply(q); state.d.applyQuaternion(q);
            } else if(c==='[') {
              stack.push({ p:state.p.clone(), d:state.d.clone(), q:state.q.clone() });
            } else if(c===']') {
              if(stack.length>0) state = stack.pop();
            }
          }
          instT.count = tIdx; instL.count = lIdx;
          meshGroup.add(instT); meshGroup.add(instL);
      } else if (m.format === 'cellular-automata') {
          const size = m.gridSize || 20;
          const gens = m.generations || 15;
          let grid = new Array(size*size).fill(0).map(() => Math.random() < (m.density||0.3) ? 1 : 0);
          const getI = (x,y) => (y+size)%size * size + (x+size)%size;
          let geo;
          if(m.voxelStyle==='cylinder') geo = new THREE.CylinderGeometry(0.4,0.4,1,8);
          else if(m.voxelStyle==='sphere') geo = new THREE.SphereGeometry(0.5,8,8);
          else geo = new THREE.BoxGeometry(0.9,0.9,0.9);
          const mat = new THREE.MeshPhongMaterial({wireframe:m.isWire});
          const inst = new THREE.InstancedMesh(geo, mat, size*size*gens);
          let idx = 0;
          const dummy = new THREE.Object3D();
          for(let g=0; g<gens; g++) {
            const next = new Array(size*size).fill(0);
            for(let y=0; y<size; y++) {
              for(let x=0; x<size; x++) {
                if(grid[getI(x,y)]) {
                  dummy.position.set(x-size/2, g, y-size/2);
                  dummy.updateMatrix();
                  const c = new THREE.Color();
                  if(m.colorMap==='heat') c.setHSL(1.0 - (g/gens)*0.8, 1, 0.5);
                  else if(m.colorMap==='cyber') c.setHSL((x/size)*0.3+0.5, 1, 0.6);
                  else c.setHex(0xaaaaaa);
                  inst.setMatrixAt(idx, dummy.matrix);
                  inst.setColorAt(idx, c);
                  idx++;
                }
                let n = 0;
                for(let dy=-1; dy<=1; dy++) for(let dx=-1; dx<=1; dx++) {
                  if(dx===0 && dy===0) continue;
                  n += grid[getI(x+dx,y+dy)];
                }
                next[getI(x,y)] = (grid[getI(x,y)] && (n===2||n===3)) || (!grid[getI(x,y)] && n===3) ? 1 : 0;
              }
            }
            grid = next;
          }
          inst.count = idx;
          meshGroup.add(inst);
      } else if (m.format === 'kinetic-typo') {
          const txt = m.text || 'FUTURE';
          const rad = m.radius || 50;
          const ts = m.tSize || 10;
          const mat = new THREE.MeshPhongMaterial({color:m.colorTheme==='gold'?'#eab308':m.colorTheme==='cyber'?'#ec4899':'#ffffff'});
          const loader = new THREE.FontLoader();
          loader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const letters = [];
            for(let i=0; i<txt.length; i++) {
              if(txt[i]===' ') continue;
              const g = new THREE.TextGeometry(txt[i], {font:font, size:ts, height:ts*0.2});
              g.center();
              const mesh = new THREE.Mesh(g, mat);
              meshGroup.add(mesh);
              letters.push({m:mesh, idx:i, tott:txt.length});
            }
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => {
              const t = Date.now()*0.001;
              letters.forEach(l => {
                const p = l.idx/l.tott;
                if(m.shape==='sphere') {
                  const phi = Math.acos(1 - 2*p);
                  const theta = Math.PI * (1 + Math.sqrt(5)) * l.idx;
                  l.m.position.setFromSphericalCoords(rad, phi, theta + (m.animStyle==='orbit'?t:0));
                  l.m.lookAt(0,0,0);
                } else if(m.shape==='wave') {
                  l.m.position.set((p-0.5)*rad*3, Math.sin(t*2 + p*Math.PI*4)*15, 0);
                } else {
                  l.m.position.set(Math.cos(p*Math.PI*2 + t)*rad, (p-0.5)*rad*2, Math.sin(p*Math.PI*2 + t)*rad);
                  l.m.lookAt(0, l.m.position.y, 0);
                }
                if(m.animStyle==='pulse') {
                  const s = 1 + Math.sin(t*5 + l.idx)*0.5;
                  l.m.scale.set(s,s,s);
                }
              });
            });
          });
      } else if (m.format === 'galaxy-builder') {
          const np = m.numPlanets || 8;
          const sType = m.starType || 'yellow';
          const starCol = sType==='yellow'?'#fde047':sType==='red'?'#ef4444':sType==='blue'?'#60a5fa':'#000000';
          const starMat = new THREE.MeshBasicMaterial({color:starCol});
          const star = new THREE.Mesh(new THREE.SphereGeometry(15,32,32), starMat);
          meshGroup.add(star);
          const planets = [];
          for(let i=0; i<np; i++) {
            const dist = 25 + i*15 + Math.random()*5;
            const size = 1 + Math.random()*4;
            const pMat = new THREE.MeshPhongMaterial({color:new THREE.Color().setHSL(Math.random(),0.8,0.5)});
            const pMesh = new THREE.Mesh(new THREE.SphereGeometry(size,16,16), pMat);
            const pObj = new THREE.Object3D();
            pObj.add(pMesh); pMesh.position.x = dist;
            meshGroup.add(pObj);
            planets.push({o:pObj, speed:(1/(dist))*20});
            if(m.showOrbits) {
              const oGeo = new THREE.TorusGeometry(dist,0.1,4,64);
              const oMat = new THREE.MeshBasicMaterial({color:'#ffffff', transparent:true, opacity:0.1});
              const oMesh = new THREE.Mesh(oGeo, oMat); oMesh.rotation.x = Math.PI/2;
              meshGroup.add(oMesh);
            }
          }
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
            star.rotation.y += 0.005;
            planets.forEach(p => p.o.rotation.y += p.speed*0.01*w);
          });
      } else if (m.format === 'sci-fi-spaceship') {
          const comp = m.complexity || 5;
          const mat = new THREE.MeshPhongMaterial({color:m.colorPalette==='empire'?'#94a3b8':m.colorPalette==='neon'?'#3b82f6':'#f8fafc'});
          const eMat = new THREE.MeshBasicMaterial({color:'#38bdf8'});
          const addSym = (geo, x,y,z, isEng) => {
            const m1 = new THREE.Mesh(geo, isEng?eMat:mat); m1.position.set(x,y,z); meshGroup.add(m1);
            if(x !== 0) { const m2 = new THREE.Mesh(geo, isEng?eMat:mat); m2.position.set(-x,y,z); meshGroup.add(m2); }
          };
          addSym(new THREE.BoxGeometry(10,10,40), 0,0,0, false);
          for(let i=0; i<comp; i++) {
            const sx = 2+Math.random()*15, sy = 2+Math.random()*8, sz = 5+Math.random()*30;
            const px = 5+Math.random()*20, py = (Math.random()-0.5)*10, pz = (Math.random()-0.5)*20;
            addSym(new THREE.BoxGeometry(sx,sy,sz), px,py,pz, false);
          }
          if(m.glowEngines) {
            addSym(new THREE.CylinderGeometry(3,3,10,16), 8, 0, -20, true);
          }
      } else if (m.format === 'rpg-dungeon') {
          const w = m.gridW || 15, h = m.gridH || 15;
          const fGeo = new THREE.BoxGeometry(10,2,10);
          const fMat = new THREE.MeshPhongMaterial({color:m.theme==='fire'?'#451a03':m.theme==='ice'?'#bae6fd':'#334155'});
          const wGeo = new THREE.BoxGeometry(10, m.wallHeight==='high'?20:10, 10);
          const wMat = new THREE.MeshPhongMaterial({color:m.theme==='fire'?'#78350f':m.theme==='ice'?'#7dd3fc':'#1e293b'});
          const instF = new THREE.InstancedMesh(fGeo, fMat, w*h);
          const instW = new THREE.InstancedMesh(wGeo, wMat, w*h);
          let fIdx = 0, wIdx = 0;
          const dummy = new THREE.Object3D();
          for(let y=0; y<h; y++) {
            for(let x=0; x<w; x++) {
              const isWall = Math.random() < 0.3 || x===0 || y===0 || x===w-1 || y===h-1;
              const px = (x - w/2)*10, pz = (y - h/2)*10;
              dummy.position.set(px, 0, pz); dummy.updateMatrix();
              if(isWall) { dummy.position.y=m.wallHeight==='high'?10:5; dummy.updateMatrix(); instW.setMatrixAt(wIdx++, dummy.matrix); }
              else instF.setMatrixAt(fIdx++, dummy.matrix);
            }
          }
          instF.count = fIdx; instW.count = wIdx;
          meshGroup.add(instF); meshGroup.add(instW);
      } else if (m.format === 'weather-event') {
          const dens = m.density || 2000;
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(dens*3);
          const cols = new Float32Array(dens*3);
          const cTheme = new THREE.Color(m.colorTheme==='fire'?'#ef4444':m.colorTheme==='water'?'#38bdf8':'#94a3b8');
          for(let i=0; i<dens; i++) {
            pos[i*3] = (Math.random()-0.5)*m.scaleSize;
            pos[i*3+1] = Math.random()*m.scaleSize;
            pos[i*3+2] = (Math.random()-0.5)*m.scaleSize;
            cTheme.toArray(cols, i*3);
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
          const mat = new THREE.PointsMaterial({size:1.5, vertexColors:true, transparent:true, opacity:0.8});
          const pts = new THREE.Points(geo, mat);
          meshGroup.add(pts);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
            pts.rotation.y += m.speed * 0.02 * w;
            const p = pts.geometry.attributes.position.array;
            for(let i=0; i<dens; i++) {
              p[i*3+1] += (m.evType==='tornado'?1:0.2);
              if(p[i*3+1] > m.scaleSize) p[i*3+1] = 0;
            }
            pts.geometry.attributes.position.needsUpdate = true;
          });
      } else if (m.format === 'impossible-geometry') {
          const mat = new THREE.MeshPhongMaterial({color:m.baseColor||'#e2e8f0', flatShading:true});
          if(m.illusionType==='penrose') {
             const g1 = new THREE.BoxGeometry(10,50,10); const m1 = new THREE.Mesh(g1, mat); m1.position.set(-20,0,0);
             const g2 = new THREE.BoxGeometry(50,10,10); const m2 = new THREE.Mesh(g2, mat); m2.position.set(0,-20,0);
             const g3 = new THREE.BoxGeometry(10,10,50); const m3 = new THREE.Mesh(g3, mat); m3.position.set(20,0,-20);
             meshGroup.add(m1); meshGroup.add(m2); meshGroup.add(m3);
             meshGroup.rotation.set(Math.PI/4, -Math.PI/4, 0); // specific view angle
          } else {
             const geo = new THREE.TorusKnotGeometry(20, 5, 100, 16);
             meshGroup.add(new THREE.Mesh(geo, mat));
          }
      } else if (m.format === 'papercraft-world') {
          const mat = new THREE.MeshPhongMaterial({color:m.colorTheme==='pastel'?'#fbcfe8':'#ffffff', flatShading:true});
          for(let i=0; i<m.complexity*5; i++) {
            const geo = new THREE.ConeGeometry(5+Math.random()*10, 10+Math.random()*20, 3);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((Math.random()-0.5)*m.spread, 0, (Math.random()-0.5)*m.spread);
            meshGroup.add(mesh);
          }
      } else if (m.format === 'force-shield') {
          let geo;
          if(m.shieldShape==='sphere') geo = new THREE.SphereGeometry(m.shieldSize||50, 32, 32);
          else if(m.shieldShape==='wall') geo = new THREE.PlaneGeometry(m.shieldSize*2, m.shieldSize, 32, 32);
          else geo = new THREE.SphereGeometry(m.shieldSize||50, 32, 16, 0, Math.PI*2, 0, Math.PI/2);
          const mat = new THREE.MeshPhongMaterial({color:m.energyColor||'#38bdf8', transparent:true, opacity:0.3, wireframe:m.shieldShape==='hex'});
          const mesh = new THREE.Mesh(geo, mat);
          meshGroup.add(mesh);
          if(m.simImpact) {
            scene.animCbs = scene.animCbs || [];
            scene.animCbs.push((w) => {
               const pos = mesh.geometry.attributes.position;
               const t = Date.now()*0.005 * m.pulseSpeed;
               for(let i=0; i<pos.count; i++) {
                 pos.setY(i, pos.getY(i) + Math.sin(t + pos.getX(i)*0.1)*0.1);
               }
               pos.needsUpdate = true;
            });
          }
      } else if(m.format === 'video-mesh') {
          const v = document.createElement('video'); v.src = m.rawText;
          v.loop = true; v.muted = true; v.playsInline = true; v.play();
          const tex = new THREE.VideoTexture(v);
          let geo;
          if(m.videoShape === 'curved') geo = new THREE.CylinderGeometry(100, 100, 60, 32, 1, true, -Math.PI/4, Math.PI/2);
          else if(m.videoShape === 'sphere') geo = new THREE.SphereGeometry(40, 32, 32);
          else if(m.videoShape === 'cube') geo = new THREE.BoxGeometry(60, 60, 60);
          else geo = new THREE.PlaneGeometry(100, 56);
          let mat;
          if(m.videoChroma) {
            mat = new THREE.ShaderMaterial({
              transparent: true,
              uniforms: { tex: { value: tex }, keyColor: { value: new THREE.Color(m.videoChromaCol || '#00ff00') }, similarity: { value: 0.15 }, smoothness: { value: 0.05 } },
              vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
              fragmentShader: `uniform sampler2D tex; uniform vec3 keyColor; uniform float similarity; uniform float smoothness; varying vec2 vUv; void main(){ vec4 rgba=texture2D(tex,vUv); float d=distance(rgba.rgb, keyColor); float alpha=smoothstep(similarity, similarity+smoothness, d); gl_FragColor=vec4(rgba.rgb, alpha); }`,
              side: THREE.DoubleSide
            });
          } else {
            mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
          }
          meshGroup.add(new THREE.Mesh(geo, mat));
      } else if(m.format === 'logic-tree') {
          const matNode = new THREE.MeshPhongMaterial({ color: m.treeColor });
          const matLink = new THREE.MeshPhongMaterial({ color: m.treeColor, transparent: true, opacity: 0.4 });
          m.treeNodes.forEach((n, i) => {
              const node = new THREE.Mesh(new THREE.SphereGeometry(m.nodeSize), matNode);
              node.position.set(n.level * 20, -i * 15, 0);
              meshGroup.add(node);
              if(i > 0) {
                  // Find parent (last node with level < current)
                  for(let j=i-1; j>=0; j--) {
                      if(m.treeNodes[j].level < n.level) {
                          const pPos = new THREE.Vector3(m.treeNodes[j].level * 20, -j * 15, 0);
                          const cPos = node.position.clone();
                          const dist = pPos.distanceTo(cPos);
                          const link = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, dist), matLink);
                          link.position.copy(pPos).add(cPos).multiplyScalar(0.5);
                          link.lookAt(cPos); link.rotateX(Math.PI/2);
                          meshGroup.add(link); break;
                      }
                  }
              }
          });
      } else if(m.format === 'neon-handwriting') {
          const mat = new THREE.MeshPhongMaterial({ color: m.neonColor, emissive: m.neonColor, emissiveIntensity: 1 });
          m.neonPaths.forEach(p => {
              if(p.length < 2) return;
              const pts = p.map(pt => new THREE.Vector3(pt.x, pt.y, pt.z));
              const curve = new THREE.CatmullRomCurve3(pts);
              const geo = new THREE.TubeGeometry(curve, p.length, m.neonThick, 8, false);
              meshGroup.add(new THREE.Mesh(geo, mat));
          });
      } else if(m.format === 'cyber-city') {
          const dens = m.ccDens || 800;
          const maxH = m.ccHeight || 300;
          const style = m.ccStyle || 'cyber';
          const colorMap = {cyber:0x223344, glass:0x88ccff, retro:0xff00ff, neon:0x111111};
          const emissMap = {cyber:0x00ffcc, glass:0x88ccff, retro:0xff00ff, neon:0x00ff88};
          const baseColor = colorMap[style] || 0x223344;
          const emColor = emissMap[style] || 0x00ffcc;
          
          // Base platform
          meshGroup.add(new THREE.Mesh(new THREE.BoxGeometry(dens*2.2, 2, dens*2.2), new THREE.MeshStandardMaterial({color: 0x050510, roughness: 0.9})));
          
          const geo = new THREE.BoxGeometry(1, 1, 1);
          geo.translate(0, 0.5, 0);
          const gridStep = 40;
          for(let x=-dens; x<=dens; x+=gridStep) {
            for(let z=-dens; z<=dens; z+=gridStep) {
              if(Math.abs(x)<50 && Math.abs(z)<50) continue; // Central plaza
              if(Math.random()>0.8) continue;
              const dist=Math.sqrt(x*x+z*z);
              let h=Math.random()*maxH*0.4+30;
              if(dist<dens*0.4 && Math.random()>0.4) h+=Math.random()*maxH*0.8;
              
              const isNeon = Math.random() > 0.85;
              const mat = new THREE.MeshStandardMaterial({
                  color: baseColor, metalness: 0.8, roughness: 0.2,
                  emissive: emColor, emissiveIntensity: isNeon ? 0.6 : 0.0,
                  wireframe: m.ccWire || false
              });
              const bld = new THREE.Mesh(geo, mat);
              const w=gridStep*(0.6+Math.random()*0.3), d=gridStep*(0.6+Math.random()*0.3);
              bld.scale.set(w, h, d);
              bld.position.set(x+(Math.random()*10-5), 0, z+(Math.random()*10-5));
              meshGroup.add(bld);
              
              // Add glowing edge/antenna
              if(h > 100 && Math.random() > 0.5) {
                  const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 20), new THREE.MeshBasicMaterial({color: emColor}));
                  ant.position.set(bld.position.x, h+10, bld.position.z);
                  meshGroup.add(ant);
              }
            }
          }
          // Flying cars
          const cGeo=new THREE.BoxGeometry(3,1,1);
          const cars = [];
          for(let i=0;i<100;i++){
            const cMat=new THREE.MeshBasicMaterial({color: style==='retro'?0x00ffff:0xffaa00});
            const car=new THREE.Mesh(cGeo,cMat);
            car.position.set((Math.random()-0.5)*dens*2, 20+Math.random()*(maxH*0.8), (Math.random()-0.5)*dens*2);
            car.userData = { speed: 2 + Math.random()*3, dir: Math.random()>0.5 ? 1 : -1, axis: Math.random()>0.5 ? 'x' : 'z' };
            if(car.userData.axis === 'z') car.rotation.y = Math.PI/2;
            meshGroup.add(car);
            cars.push(car);
          }
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
              if(m.ccAnim) meshGroup.rotation.y += 0.001 * w;
              cars.forEach(c => {
                  c.position[c.userData.axis] += c.userData.speed * c.userData.dir * w;
                  if(Math.abs(c.position[c.userData.axis]) > dens) c.position[c.userData.axis] = -dens * c.userData.dir;
              });
          });

      } else if(m.format === 'quantum-fluids') {
          const pCount = Math.min(m.qfCount || 30000, 80000);
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(pCount * 3);
          const colors = new Float32Array(pCount * 3);
          const initial = new Float32Array(pCount * 3);
          const colorMap = {quantum:[0,0.5,1], plasma:[0.8,0.1,1], fire:[1,0.5,0], toxic:[0.2,1,0.1]};
          const baseCol = colorMap[m.qfColor||'quantum'];
          
          for(let i=0;i<pCount;i++){
            const r=Math.random()*80, theta=Math.random()*Math.PI*2, phi=Math.acos(Math.random()*2-1);
            const x=r*Math.sin(phi)*Math.cos(theta), y=r*Math.sin(phi)*Math.sin(theta), z=r*Math.cos(phi);
            pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z;
            initial[i*3]=x; initial[i*3+1]=y; initial[i*3+2]=z;
            colors[i*3]=baseCol[0]*(0.5+Math.random()*0.5);
            colors[i*3+1]=baseCol[1]*(0.5+Math.random()*0.5);
            colors[i*3+2]=baseCol[2]*(0.5+Math.random()*0.5);
          }
          geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
          geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
          geo.setAttribute('initial',new THREE.BufferAttribute(initial,3));
          
          const mat=new THREE.PointsMaterial({size:1.5,vertexColors:true,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending});
          const pts=new THREE.Points(geo,mat);
          meshGroup.add(pts);
          
          if(m.qfWire){
            const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(90, 3),new THREE.MeshBasicMaterial({color:0x334455,wireframe:true,transparent:true,opacity:0.1}));
            meshGroup.add(shell);
          }
          
          const speed=m.qfSpeed||1;
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
              pts.rotation.y += 0.002 * speed * w;
              pts.rotation.x += 0.001 * speed * w;
              const time = Date.now() * 0.001 * speed;
              const positions = pts.geometry.attributes.position.array;
              const inits = pts.geometry.attributes.initial.array;
              for(let i=0; i<pCount; i++) {
                  const ix=inits[i*3], iy=inits[i*3+1], iz=inits[i*3+2];
                  // Mathematical turbulence (sine wave interference)
                  const dx = Math.sin(iy*0.05 + time) * 10;
                  const dy = Math.cos(ix*0.05 + time) * 10;
                  const dz = Math.sin(iz*0.05 + time) * 10;
                  positions[i*3] = ix + dx;
                  positions[i*3+1] = iy + dy;
                  positions[i*3+2] = iz + dz;
              }
              pts.geometry.attributes.position.needsUpdate = true;
          });

      } else if(m.format === 'time-lapse') {
          const floors=Math.max(1,Math.floor((m.tlComp||50)/10));
          const colMap={modern:0xe2e8f0, blueprint:0x60a5fa, gold:0xfbbf24};
          const col=colMap[m.tlStyle||'modern']||0xe2e8f0;
          const mat=new THREE.MeshStandardMaterial({color:col,metalness:m.tlStyle==='gold'?1:0.1,roughness:0.3,wireframe:m.tlStyle==='blueprint'});
          
          const building = new THREE.Group();
          meshGroup.add(building);
          
          // Foundation
          building.add(new THREE.Mesh(new THREE.BoxGeometry(80,2,80),mat));
          
          const floorGroups = [];
          for(let f=0;f<floors;f++){
            const fg = new THREE.Group();
            const yBase=2+f*20;
            // Core
            const core = new THREE.Mesh(new THREE.BoxGeometry(30,20,30), new THREE.MeshStandardMaterial({color:0x334455}));
            core.position.y = yBase+10; fg.add(core);
            // Columns
            for(let cx=-3;cx<=3;cx+=3){for(let cz=-3;cz<=3;cz+=3){
              if(Math.abs(cx)<2 && Math.abs(cz)<2) continue; // skip inside core
              const col2=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,20,8),mat);
              col2.position.set(cx*11,yBase+10,cz*11); fg.add(col2);
            }}
            // Slab
            const slab=new THREE.Mesh(new THREE.BoxGeometry(76,2,76),mat);
            slab.position.y=yBase+20; fg.add(slab);
            fg.scale.y = 0.001; // start invisible
            building.add(fg);
            floorGroups.push(fg);
          }
          
          // Crane
          const crane = new THREE.Group();
          const mast = new THREE.Mesh(new THREE.BoxGeometry(4, floors*20+30, 4), new THREE.MeshStandardMaterial({color:0xffaa00, wireframe:true}));
          mast.position.set(45, (floors*20+30)/2, 45); crane.add(mast);
          const jib = new THREE.Mesh(new THREE.BoxGeometry(90, 4, 4), new THREE.MeshStandardMaterial({color:0xffaa00, wireframe:true}));
          jib.position.set(15, floors*20+30, 45); crane.add(jib);
          meshGroup.add(crane);

          scene.animCbs=scene.animCbs||[];
          const speed = m.tlSpeed || 0.2;
          scene.animCbs.push((w)=>{
              meshGroup.rotation.y += 0.005 * speed * w;
              jib.rotation.y = Math.sin(Date.now()*0.001*speed) * Math.PI/2;
              const time = Date.now()*0.0005*speed;
              floorGroups.forEach((fg, i) => {
                  const targetScale = Math.max(0.001, Math.min(1.0, time - i*0.5));
                  fg.scale.set(1, targetScale, 1);
              });
          });

      } else if(m.format === 'product-showcase') {
          // Premium showroom pedestal
          const pedMat=new THREE.MeshStandardMaterial({color:0x111111,roughness:0.05,metalness:0.8});
          const pedGeo = new THREE.CylinderGeometry(35, 40, 10, 64);
          pedGeo.translate(0, -5, 0);
          meshGroup.add(new THREE.Mesh(pedGeo, pedMat));
          
          // Outer glow ring
          const ring = new THREE.Mesh(new THREE.RingGeometry(36, 38, 64), new THREE.MeshBasicMaterial({color: 0x3b82f6, side: THREE.DoubleSide}));
          ring.rotation.x = -Math.PI/2; ring.position.y = -0.5; meshGroup.add(ring);
          
          // Abstract premium product
          const bodyMat=new THREE.MeshPhysicalMaterial({color:0x1e293b,metalness:0.6,roughness:0.2,clearcoat:1.0,clearcoatRoughness:0.1});
          const body=new THREE.Mesh(new THREE.BoxGeometry(25,40,12, 8,8,8),bodyMat);
          body.position.y=20; meshGroup.add(body);
          const screen = new THREE.Mesh(new THREE.PlaneGeometry(22, 34), new THREE.MeshBasicMaterial({color: 0x000000}));
          screen.position.set(0, 20, 6.1); meshGroup.add(screen);
          
          // Spotlights
          const s1 = new THREE.SpotLight(0xffffff, 2); s1.position.set(50, 80, 50); s1.target = body; meshGroup.add(s1);
          const s2 = new THREE.SpotLight(0x3b82f6, 1.5); s2.position.set(-50, 40, -50); s2.target = body; meshGroup.add(s2);
          
          // Hotspots
          const hGrp = new THREE.Group(); meshGroup.add(hGrp);
          if(m.psHotspots) m.psHotspots.forEach(h=>{
            const hs=new THREE.Mesh(new THREE.SphereGeometry(2,16,16),new THREE.MeshBasicMaterial({color:0x60a5fa}));
            hs.position.set(h.x*0.6,h.y*0.6,h.z*0.6); hGrp.add(hs);
            const hl=new THREE.Mesh(new THREE.RingGeometry(3, 4, 32), new THREE.MeshBasicMaterial({color:0xffffff, side:THREE.DoubleSide}));
            hl.position.copy(hs.position); hGrp.add(hl);
            hl.userData.isHalo = true;
          });
          
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
              if(m.psAnim) meshGroup.rotation.y += 0.005 * w;
              body.position.y = 20 + Math.sin(Date.now()*0.002)*2;
              screen.position.y = body.position.y;
              hGrp.children.forEach(c => {
                  if(c.userData.isHalo) {
                      c.scale.setScalar(1 + Math.sin(Date.now()*0.005)*0.2);
                      c.lookAt(camera.position);
                  }
              });
          });

      } else if(m.format === 'social-room') {
          // Studio Stand
          const standMat=new THREE.MeshStandardMaterial({color:0x1e293b,roughness:0.8});
          meshGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(15,20,3,64),standMat));
          
          // Holographic Curved Screen
          const caseMat=new THREE.MeshPhysicalMaterial({color:0x1e293b,transmission:0.9,transparent:true,roughness:0.1,side:THREE.DoubleSide});
          const screenGeo = new THREE.CylinderGeometry(40, 40, 60, 32, 1, true, -Math.PI/4, Math.PI/2);
          const displayCase = new THREE.Mesh(screenGeo, caseMat);
          displayCase.position.y = 30; meshGroup.add(displayCase);
          
          // Screen Grid/UI
          const uiGrid = new THREE.Mesh(screenGeo.clone(), new THREE.MeshBasicMaterial({color:0x3b82f6, wireframe:true, transparent:true, opacity:0.15}));
          uiGrid.position.y = 30; uiGrid.scale.setScalar(0.99); meshGroup.add(uiGrid);
          
          // Parabolic floating likes
          const lMat=new THREE.MeshBasicMaterial({color:0xef4444});
          const hearts = [];
          for(let i=0;i<Math.min(m.smLikes||50,150);i++){
            // Create a 3D heart shape
            const x = 0, y = 0; const heartShape = new THREE.Shape();
            heartShape.moveTo( x + 2.5, y + 2.5 ); heartShape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
            heartShape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0, y + 3.5 );
            heartShape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
            heartShape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
            heartShape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
            heartShape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
            const hGeo = new THREE.ExtrudeGeometry(heartShape, {depth: 1, bevelEnabled:true, bevelSegments:2, steps:1, bevelSize:0.5, bevelThickness:0.5});
            hGeo.center(); hGeo.scale(0.3, 0.3, 0.3);
            
            const p = new THREE.Mesh(hGeo, lMat);
            p.userData = { t: Math.random()*Math.PI*2, speed: 0.01+Math.random()*0.02, radius: 10+Math.random()*20, hScale: 0.5+Math.random() };
            p.scale.setScalar(p.userData.hScale);
            p.rotation.z = Math.PI; // Invert heart to point down naturally
            meshGroup.add(p); hearts.push(p);
          }
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
            hearts.forEach(c=>{
               c.userData.t += c.userData.speed * w;
               if(c.userData.t > Math.PI) c.userData.t = 0; // reset
               // Parabolic upward arc
               const a = c.userData.t;
               c.position.x = Math.sin(a*3) * c.userData.radius;
               c.position.y = 5 + a * 20; // rises up
               c.position.z = Math.cos(a*3) * c.userData.radius;
               c.rotation.y += 0.05 * w;
               // Fade scale at ends
               const scl = Math.sin(a) * c.userData.hScale;
               c.scale.setScalar(scl > 0 ? scl : 0.001);
            });
            if(m.smAnim) meshGroup.rotation.y += 0.005 * w;
          });

      } else if(m.format === 'git-repo') {
          let files=[];
          try {
            const obj=JSON.parse(m.grJson||'{}');
            (function traverse(node,path,depth){
                if(typeof node==='number') files.push({path, size:node, depth});
                else if(typeof node==='object'&&node!==null){
                    for(let k in node) traverse(node[k], path?path+'/'+k:k, depth+1);
                }
            })(obj,'',0);
          }catch(e){}
          if(!files.length) {
              files=[{path:'src/App.js',size:300,depth:1},{path:'package.json',size:50,depth:0},{path:'README.md',size:100,depth:0},{path:'src/components/Btn.jsx',size:120,depth:2}];
          }
          
          // Data Tree Visualization
          const ext2col={js:0xfacc15,ts:0x38bdf8,jsx:0x38bdf8,tsx:0x38bdf8,css:0xf472b6,html:0xfb923c,json:0xa3e635,md:0xf8fafc};
          const matCore = new THREE.MeshStandardMaterial({color: 0x334155, metalness: 0.8, roughness: 0.2});
          const base = new THREE.Mesh(new THREE.CylinderGeometry(15, 20, 5, 32), matCore);
          meshGroup.add(base);
          
          const maxDepth = Math.max(...files.map(f=>f.depth));
          let fileMeshes = [];
          
          files.forEach((f, i) => {
            const ext = f.path.split('.').pop();
            const col = ext2col[ext] || 0x94a3b8;
            const mat = new THREE.MeshStandardMaterial({color: col, emissive: col, emissiveIntensity: 0.2});
            
            // Files are floating hex prisms
            const geo = new THREE.CylinderGeometry(2, 2, Math.max(2, Math.min(f.size/10, 20)), 6);
            const mesh = new THREE.Mesh(geo, mat);
            
            // Position based on depth (orbit rings)
            const radius = 25 + f.depth * 15;
            const angle = (i / files.length) * Math.PI * 2 + (f.depth * 0.5);
            mesh.position.set(Math.cos(angle)*radius, 10 + (f.depth*10) + Math.random()*20, Math.sin(angle)*radius);
            meshGroup.add(mesh);
            fileMeshes.push(mesh);
            
            // Fiber optic link to center
            const linkGeo = new THREE.BufferGeometry();
            linkGeo.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, mesh.position.x, mesh.position.y, mesh.position.z], 3));
            const link = new THREE.Line(linkGeo, new THREE.LineBasicMaterial({color: col, transparent: true, opacity: 0.3}));
            meshGroup.add(link);
          });
          
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
              meshGroup.rotation.y -= 0.002 * w;
              fileMeshes.forEach((m, i) => {
                  m.rotation.y += 0.01 * w;
                  m.rotation.x += 0.005 * w;
                  m.position.y += Math.sin(Date.now()*0.002 + i)*0.05*w;
              });
          });

      } else if(m.format === 'webar-portal') {
          // Parse color safely
          const portalCol = new THREE.Color(m.arColor || '#8b5cf6');
          
          // Stargate Frame
          const frameMat = new THREE.MeshStandardMaterial({color: 0x222222, metalness: 0.9, roughness: 0.1});
          const ringGeo = new THREE.TorusGeometry(30, 4, 32, 64);
          const ring = new THREE.Mesh(ringGeo, frameMat);
          ring.position.y = 35; meshGroup.add(ring);
          
          const base = new THREE.Mesh(new THREE.BoxGeometry(70, 5, 20), frameMat);
          meshGroup.add(base);
          
          // Portal Vortex (Membrane)
          const pMat = new THREE.MeshBasicMaterial({color: portalCol, transparent: true, opacity: 0.6, side: THREE.DoubleSide});
          const vortex = new THREE.Mesh(new THREE.CircleGeometry(29, 64), pMat);
          vortex.position.y = 35; meshGroup.add(vortex);
          
          // Inner energy rings
          const innerRing1 = new THREE.Mesh(new THREE.TorusGeometry(25, 0.5, 16, 64), new THREE.MeshBasicMaterial({color: 0xffffff}));
          innerRing1.position.y = 35; meshGroup.add(innerRing1);
          const innerRing2 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.5, 16, 64), new THREE.MeshBasicMaterial({color: portalCol}));
          innerRing2.position.y = 35; meshGroup.add(innerRing2);
          
          // Swirling particles
          const parts = [];
          if(m.arParticles !== false) {
            const pMat2 = new THREE.MeshBasicMaterial({color: 0xffffff});
            for(let i=0; i<60; i++){
              const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), pMat2);
              p.userData = { angle: Math.random()*Math.PI*2, radius: 5+Math.random()*24, speed: 0.02+Math.random()*0.03 };
              meshGroup.add(p); parts.push(p);
            }
          }
          
          scene.animCbs=scene.animCbs||[];
          scene.animCbs.push((w)=>{
            vortex.rotation.z -= 0.005 * w;
            innerRing1.rotation.y += 0.02 * w;
            innerRing1.rotation.x += 0.01 * w;
            innerRing2.rotation.y -= 0.03 * w;
            
            parts.forEach(p => {
                p.userData.angle += p.userData.speed * w;
                p.position.x = Math.cos(p.userData.angle) * p.userData.radius;
                p.position.y = 35 + Math.sin(p.userData.angle) * p.userData.radius;
                p.position.z = Math.sin(p.userData.angle*5) * 5; // wave on z axis
            });
          });

      } else if(m.format === 'text-to-scene') {
          const p=(m.tsPrompt||'').toLowerCase();
          const hasWater=p.includes('water')||p.includes('ocean')||p.includes('sea')||p.includes('beach');
          const hasSpace=p.includes('space')||p.includes('star')||p.includes('galaxy')||p.includes('moon');
          const hasForest=p.includes('forest')||p.includes('tree')||p.includes('wood')||p.includes('nature');
          const hasCity=p.includes('city')||p.includes('urban')||p.includes('building')||p.includes('town');
          
          // Build a Diorama
          const baseMat = new THREE.MeshStandardMaterial({color: hasSpace?0x111122:hasWater?0xdeb887:hasForest?0x2d4c1e:0x444444, roughness: 0.9});
          const base = new THREE.Mesh(new THREE.CylinderGeometry(40, 40, 5, 64), baseMat);
          meshGroup.add(base);
          
          if(hasSpace){
            const planet = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 32), new THREE.MeshStandardMaterial({color:0x4b90e2, roughness:0.6}));
            planet.position.y = 20; meshGroup.add(planet);
            const rings = new THREE.Mesh(new THREE.RingGeometry(18, 25, 64), new THREE.MeshStandardMaterial({color:0xffaa00, side:THREE.DoubleSide, transparent:true, opacity:0.8}));
            rings.rotation.x = -Math.PI/3; rings.position.y = 20; meshGroup.add(rings);
            
            // Satellites
            for(let i=0;i<3;i++) {
                const sat = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshStandardMaterial({color:0xdddddd}));
                sat.position.set((Math.random()-0.5)*60, 10+Math.random()*20, (Math.random()-0.5)*60);
                meshGroup.add(sat);
            }
          } else if(hasWater){
            const wGeo = new THREE.CylinderGeometry(38, 38, 4, 64);
            const water = new THREE.Mesh(wGeo, new THREE.MeshPhysicalMaterial({color:0x0077be, transparent:true, opacity:0.8, transmission:0.9}));
            water.position.y = 2; meshGroup.add(water);
            
            const boat = new THREE.Mesh(new THREE.BoxGeometry(6,2,12), new THREE.MeshStandardMaterial({color:0x8b4513}));
            boat.position.set(15, 4, 15); boat.rotation.y = Math.PI/4; meshGroup.add(boat);
            const sail = new THREE.Mesh(new THREE.ConeGeometry(4, 10, 3), new THREE.MeshStandardMaterial({color:0xffffff}));
            sail.position.set(15, 10, 15); sail.rotation.y = Math.PI/4; meshGroup.add(sail);
          } else if(hasForest){
            const gMat = new THREE.MeshStandardMaterial({color:0x228b22, roughness:1.0});
            const wMat = new THREE.MeshStandardMaterial({color:0x8b4513, roughness:0.9});
            for(let i=0;i<15;i++) {
                const tx = (Math.random()-0.5)*60, tz = (Math.random()-0.5)*60;
                if(Math.hypot(tx, tz) > 35) continue;
                const th = 5+Math.random()*10;
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.5, th), wMat);
                trunk.position.set(tx, th/2 + 2.5, tz); meshGroup.add(trunk);
                const leaves = new THREE.Mesh(new THREE.ConeGeometry(4+Math.random()*3, 10+Math.random()*5, 5), gMat);
                leaves.position.set(tx, th + 5, tz); meshGroup.add(leaves);
            }
          } else if(hasCity){
            const cMat = new THREE.MeshStandardMaterial({color:0x8899aa, roughness:0.2, metalness:0.3});
            for(let i=0;i<12;i++) {
                const tx = (Math.random()-0.5)*50, tz = (Math.random()-0.5)*50;
                if(Math.hypot(tx, tz) > 30) continue;
                const w = 6+Math.random()*6, d = 6+Math.random()*6, h = 10+Math.random()*30;
                const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cMat);
                bld.position.set(tx, h/2 + 2.5, tz); meshGroup.add(bld);
            }
          } else {
            // Abstract default
            const geo=new THREE.IcosahedronGeometry(15,1);
            const mesh = new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0xfacc15, wireframe:true}));
            mesh.position.y = 20; meshGroup.add(mesh);
            scene.animCbs=scene.animCbs||[]; scene.animCbs.push(w=>mesh.rotation.y+=0.01*w);
          }

      } else if(m.format === 'ice-terrain') {
          const dens = m.dens || 60, height = m.height || 40;
          // Displaced plane
          const geo = new THREE.PlaneGeometry(300, 300, 60, 60);
          const pos = geo.attributes.position;
          for(let i=0; i<pos.count; i++) {
              const x = pos.getX(i), y = pos.getY(i);
              const z = (Math.sin(x*0.05)*Math.cos(y*0.05) * height*0.3) + (Math.sin(x*0.1)*Math.cos(y*0.1) * height*0.2) + (Math.abs(Math.sin(x*0.02 + y*0.02))*height*0.5);
              pos.setZ(i, z);
          }
          geo.computeVertexNormals();
          const mat = new THREE.MeshPhysicalMaterial({color: 0xe0f7fa, metalness: 0.1, roughness: 0.1, transmission: 0.9, transparent: true, clearcoat: 1.0});
          const mesh = new THREE.Mesh(geo, mat); mesh.rotation.x = -Math.PI/2; mesh.position.y = -height/2;
          meshGroup.add(mesh);
          // Add some distinct crystal spikes
          const sm = new THREE.MeshPhysicalMaterial({color: 0xa0e0ff, transmission: 0.9, transparent: true, roughness: 0.05});
          for(let i=0; i<dens; i++){
              const h = height*(0.5+Math.random()*1.0), r = 4+Math.random()*6;
              const spike = new THREE.Mesh(new THREE.ConeGeometry(r, h, 6), sm);
              spike.position.set((Math.random()-0.5)*250, h/2 - height/2, (Math.random()-0.5)*250);
              spike.rotation.set((Math.random()-0.5)*0.4, Math.random()*Math.PI, (Math.random()-0.5)*0.4);
              meshGroup.add(spike);
          }
          if(m.snow !== false) {
             const sGeo = new THREE.BufferGeometry(); const sPos = [];
             for(let i=0; i<1000; i++) sPos.push((Math.random()-0.5)*300, Math.random()*200, (Math.random()-0.5)*300);
             sGeo.setAttribute('position', new THREE.Float32BufferAttribute(sPos, 3));
             const snow = new THREE.Points(sGeo, new THREE.PointsMaterial({color: 0xffffff, size: 1.5, transparent: true, opacity: 0.8}));
             meshGroup.add(snow);
             scene.animCbs = scene.animCbs || [];
             scene.animCbs.push((w) => {
                const p = snow.geometry.attributes.position.array;
                for(let i=1; i<p.length; i+=3) { p[i] -= 0.5*w; if(p[i]<0) p[i]=200; }
                snow.geometry.attributes.position.needsUpdate = true;
             });
          }
      } else if(m.format === 'lava-world') {
          const size = m.size || 80, h = size*1.5;
          meshGroup.add(new THREE.Mesh(new THREE.PlaneGeometry(size*4, size*4), new THREE.MeshStandardMaterial({color: 0x111111, roughness: 0.9})));
          const vGeo = new THREE.ConeGeometry(size, h, 32, 16, false, 0, Math.PI*2);
          const vPos = vGeo.attributes.position;
          for(let i=0; i<vPos.count; i++) {
              if(vPos.getY(i) > h/2 - 5) { vPos.setY(i, h/2 - 10 - Math.random()*5); }
              else { vPos.setX(i, vPos.getX(i) + (Math.random()-0.5)*size*0.1); vPos.setZ(i, vPos.getZ(i) + (Math.random()-0.5)*size*0.1); }
          }
          vGeo.computeVertexNormals();
          const volc = new THREE.Mesh(vGeo, new THREE.MeshStandardMaterial({color: 0x1a100c, roughness: 1.0}));
          volc.position.y = h/2; meshGroup.add(volc);
          const lavaGeo = new THREE.CylinderGeometry(size*0.18, size*0.15, 2, 32);
          const lavaMat = new THREE.MeshBasicMaterial({color: 0xff4400});
          const lava = new THREE.Mesh(lavaGeo, lavaMat);
          lava.position.y = h - 11; meshGroup.add(lava);
          const light = new THREE.PointLight(0xff3300, 2, size*3); light.position.set(0, h+10, 0); meshGroup.add(light);
          if(m.smoke !== false) {
             const eGeo = new THREE.BufferGeometry(); const ePos = [];
             for(let i=0; i<300; i++) ePos.push((Math.random()-0.5)*size*0.3, h-10+Math.random()*size, (Math.random()-0.5)*size*0.3);
             eGeo.setAttribute('position', new THREE.Float32BufferAttribute(ePos, 3));
             const embers = new THREE.Points(eGeo, new THREE.PointsMaterial({color: 0xffaa00, size: 2, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending}));
             meshGroup.add(embers);
             scene.animCbs = scene.animCbs || [];
             scene.animCbs.push((w) => {
                const p = embers.geometry.attributes.position.array;
                for(let i=1; i<p.length; i+=3) { 
                    p[i] += (0.5+Math.random()*0.5)*w; p[i-1] += (Math.random()-0.5)*0.5*w; p[i+1] += (Math.random()-0.5)*0.5*w;
                    if(p[i] > h+size*1.5) { p[i] = h-10; p[i-1] = (Math.random()-0.5)*size*0.3; p[i+1] = (Math.random()-0.5)*size*0.3; }
                }
                embers.geometry.attributes.position.needsUpdate = true;
             });
          }
      } else if(m.format === 'ocean-wave') {
          const wHeight = m.wHeight || 10, wSpeed = m.wSpeed || 1.0;
          const wGeo = new THREE.PlaneGeometry(300, 300, 64, 64);
          const wMat = new THREE.MeshPhysicalMaterial({color: 0x006699, metalness: 0.1, roughness: 0.1, transmission: 0.8, transparent: true, wireframe: m.wire});
          const water = new THREE.Mesh(wGeo, wMat); water.rotation.x = -Math.PI/2;
          meshGroup.add(water);
          let foamPts = null;
          if(m.foam !== false) {
             const fGeo = new THREE.BufferGeometry(); const fPos = new Float32Array(1000*3);
             fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
             foamPts = new THREE.Points(fGeo, new THREE.PointsMaterial({color: 0xffffff, size: 2, transparent: true, opacity: 0.6}));
             meshGroup.add(foamPts);
          }
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
              const t = Date.now() * 0.001 * wSpeed;
              const pos = water.geometry.attributes.position;
              for(let i=0; i<pos.count; i++) {
                  const x = pos.getX(i), y = pos.getY(i);
                  const z = Math.sin(x*0.05 + t) * Math.cos(y*0.05 + t*0.8) * wHeight + Math.sin(x*0.1 - t) * (wHeight*0.3);
                  pos.setZ(i, z);
              }
              water.geometry.computeVertexNormals();
              pos.needsUpdate = true;
              if(foamPts) {
                  const fP = foamPts.geometry.attributes.position;
                  for(let i=0; i<1000; i++) {
                      const idx = Math.floor(Math.random() * pos.count);
                      fP.setXYZ(i, pos.getX(idx), pos.getZ(idx) + 0.5, -pos.getY(idx));
                  }
                  fP.needsUpdate = true;
              }
          });
      } else if(m.format === 'mech-robot') {
          const cols = { gunmetal: 0x4a5568, red: 0xb91c1c, cyber: 0x1d4ed8, gold: 0xd97706 };
          const gc = cols[m.color] || 0x4a5568;
          const mat = new THREE.MeshStandardMaterial({color: gc, metalness: 0.8, roughness: 0.2});
          const torso = new THREE.Mesh(new THREE.BoxGeometry(30,35,18), mat); torso.position.y = 25; meshGroup.add(torso);
          [-12,12].forEach(x=>{
            const leg = new THREE.Group(); leg.position.set(x,0,0);
            const thigh = new THREE.Mesh(new THREE.BoxGeometry(10,30,12), mat); thigh.position.y = 5; leg.add(thigh);
            const foot = new THREE.Mesh(new THREE.BoxGeometry(12,6,18), mat); foot.position.set(0,-13,3); leg.add(foot);
            meshGroup.add(leg);
          });
          const headGeo = m.head === 'cube' ? new THREE.BoxGeometry(20,18,16) : m.head === 'sphere' ? new THREE.SphereGeometry(11,16,16) : new THREE.BoxGeometry(22,16,16);
          const headMesh = new THREE.Mesh(headGeo, mat); headMesh.position.y = 55; meshGroup.add(headMesh);
          if(m.glow !== false) {
             const eyeMat = new THREE.MeshBasicMaterial({color: 0x00ffff});
             [-5,5].forEach(x=>{ const eye = new THREE.Mesh(new THREE.SphereGeometry(2,8,8), eyeMat); eye.position.set(x, 57, 8); meshGroup.add(eye); });
             const reactor = new THREE.Mesh(new THREE.CylinderGeometry(4,4,3,16), eyeMat); reactor.position.set(0,28,10); reactor.rotation.x = Math.PI/2; meshGroup.add(reactor);
             const pl = new THREE.PointLight(0x00ffff, 1, 60); pl.position.set(0, 57, 10); meshGroup.add(pl);
          }
          [-20,20].forEach((x,i)=>{
            const arm = new THREE.Group(); arm.position.set(x,35,0);
            const shoulder = new THREE.Mesh(new THREE.BoxGeometry(8,25,8), mat); shoulder.position.y = -12; arm.add(shoulder);
            if(m.arm === 'cannon'){ const wp = new THREE.Mesh(new THREE.CylinderGeometry(3,3,20,12), mat); wp.position.y = -25; arm.add(wp); }
            else if(m.arm === 'claw'){ [-3,3].forEach(cx=>{ const cl = new THREE.Mesh(new THREE.ConeGeometry(2,10,6), mat); cl.position.set(cx,-30,0); cl.rotation.x = Math.PI; arm.add(cl); }); }
            else{ const sh = new THREE.Mesh(new THREE.BoxGeometry(14,3,18), mat); sh.position.y = -28; arm.add(sh); }
            meshGroup.add(arm);
          });
      } else if(m.format === 'ancient-arch') {
          const s = m.scale || 1.0;
          const mat = new THREE.MeshStandardMaterial({color: 0xe2e2d9, roughness: 0.9, metalness: 0.1});
          for(let i=0; i<3; i++) {
              const step = new THREE.Mesh(new THREE.BoxGeometry(200*s - i*10*s, 4*s, 140*s - i*10*s), mat);
              step.position.y = i*4*s; meshGroup.add(step);
          }
          const colGeo = new THREE.CylinderGeometry(4*s, 4*s, 60*s, 16);
          const brokenGeo = new THREE.CylinderGeometry(4*s, 4*s, 20*s, 16);
          for(let x=-80*s; x<=80*s; x+=32*s){
              for(const z of [-50*s,50*s]){
                  if(Math.random() > 0.2) {
                      const cyl = new THREE.Mesh(colGeo, mat); cyl.position.set(x, 42*s, z); meshGroup.add(cyl);
                      const cap = new THREE.Mesh(new THREE.BoxGeometry(12*s, 4*s, 12*s), mat); cap.position.set(x, 74*s, z); meshGroup.add(cap);
                  } else {
                      const broke = new THREE.Mesh(brokenGeo, mat); broke.position.set(x, 22*s, z); meshGroup.add(broke);
                      const debris = new THREE.Mesh(new THREE.BoxGeometry(8*s, 15*s, 8*s), mat); debris.position.set(x+(Math.random()-0.5)*20*s, 12*s, z+(Math.random()-0.5)*20*s); debris.rotation.z = Math.PI/2; meshGroup.add(debris);
                  }
              }
          }
          const roof = new THREE.Mesh(new THREE.BoxGeometry(190*s, 6*s, 60*s), mat); roof.position.set(-10*s, 78*s, -50*s); meshGroup.add(roof);
          if(m.style === 'magic') {
              const orb = new THREE.Mesh(new THREE.SphereGeometry(10*s, 32, 32), new THREE.MeshBasicMaterial({color: 0x8b5cf6}));
              orb.position.set(0, 30*s, 0); meshGroup.add(orb);
              const pl = new THREE.PointLight(0x8b5cf6, 2, 200*s); pl.position.copy(orb.position); meshGroup.add(pl);
              scene.animCbs = scene.animCbs || [];
              scene.animCbs.push((w) => { orb.position.y = 30*s + Math.sin(Date.now()*0.002)*5*s; });
          }
      } else if(m.format === 'lego-city') {
          let gMap = new Map(); try { gMap = new Map(Object.entries(JSON.parse(m.grid || '{}'))); } catch(e){}
          const gw = m.gw || 10, gh = m.gh || 10;
          gMap.forEach((col, k) => {
              const [r, c] = k.split('_').map(Number);
              const mesh = new THREE.Mesh(new THREE.BoxGeometry(9,10,9), new THREE.MeshStandardMaterial({color: col}));
              mesh.position.set(c*10-(gw*5)+5, 5, r*10-(gh*5)+5);
              meshGroup.add(mesh);
          });
      } else if(m.format === 'data-globe') {
          const gColor = parseInt(m.color?.replace('#','0x') || '0x1d4ed8');
          const globe = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 32), new THREE.MeshPhysicalMaterial({color: gColor, transparent: true, opacity: 0.2, wireframe: true}));
          meshGroup.add(globe);
          const core = new THREE.Mesh(new THREE.SphereGeometry(58, 32, 32), new THREE.MeshPhysicalMaterial({color: gColor, transparent: true, opacity: 0.8, transmission: 0.5}));
          meshGroup.add(core);
          const nMat = new THREE.MeshBasicMaterial({color: 0xffffff});
          for(let i=0; i<150; i++) {
              const phi = Math.acos(-1 + (2*i)/150); const theta = Math.sqrt(150*Math.PI) * phi;
              const x = 60 * Math.cos(theta) * Math.sin(phi); const y = 60 * Math.sin(theta) * Math.sin(phi); const z = 60 * Math.cos(phi);
              const node = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), nMat);
              node.position.set(x,y,z); node.lookAt(0,0,0);
              const h = Math.random()*15;
              if(h > 10) { const bar = new THREE.Mesh(new THREE.BoxGeometry(1,1,h), new THREE.MeshBasicMaterial({color: 0x38bdf8})); bar.position.set(x,y,z); bar.lookAt(0,0,0); meshGroup.add(bar); }
              meshGroup.add(node);
          }
          const ring = new THREE.Mesh(new THREE.TorusGeometry(80, 0.5, 16, 100), new THREE.MeshBasicMaterial({color: gColor}));
          ring.rotation.x = Math.PI/2; meshGroup.add(ring);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => { globe.rotation.y += 0.005*w; core.rotation.y += 0.005*w; ring.rotation.z -= 0.01*w; ring.rotation.x = Math.PI/2 + Math.sin(Date.now()*0.001)*0.2; });
      } else if(m.format === 'holo-hud') {
          const hCol = parseInt(m.color?.replace('#','0x') || '0x00d4ff');
          const mat = new THREE.MeshBasicMaterial({color: hCol, transparent: true, opacity: 0.8, side: THREE.DoubleSide});
          const matDim = new THREE.MeshBasicMaterial({color: hCol, transparent: true, opacity: 0.3, side: THREE.DoubleSide});
          const r1 = new THREE.Mesh(new THREE.RingGeometry(59,61,64), mat); meshGroup.add(r1);
          const r2 = new THREE.Mesh(new THREE.RingGeometry(69,71,64,8,0,Math.PI*1.5), mat); meshGroup.add(r2);
          const r3 = new THREE.Mesh(new THREE.RingGeometry(75,80,64,8,0,Math.PI*0.8), matDim); meshGroup.add(r3);
          const r4 = new THREE.Mesh(new THREE.RingGeometry(85,86,64,8,0,Math.PI*1.2), mat); meshGroup.add(r4);
          const cross = new THREE.Group();
          cross.add(new THREE.Mesh(new THREE.PlaneGeometry(120,1), mat));
          cross.add(new THREE.Mesh(new THREE.PlaneGeometry(1,120), mat));
          meshGroup.add(cross);
          for(let i=0; i<12; i++) {
              const b = new THREE.Mesh(new THREE.PlaneGeometry(5+Math.random()*15, 2), mat);
              b.position.set(40, -40 - i*4, 0); meshGroup.add(b);
          }
          if(m.scan !== false) {
              const scan = new THREE.Mesh(new THREE.PlaneGeometry(160, 2), new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5}));
              meshGroup.add(scan);
              scene.animCbs = scene.animCbs || [];
              scene.animCbs.push((w) => {
                  r2.rotation.z -= 0.01*w; r3.rotation.z += 0.005*w; r4.rotation.z -= 0.008*w;
                  scan.position.y = 80 - (Date.now()*0.05)%160;
              });
          }
      } else if(m.format === 'mask-sculptor') {
          const m1 = new THREE.MeshStandardMaterial({color: m.col1 || '#1e293b', roughness: 0.2, metalness: 0.8, wireframe: m.wire});
          const m2 = new THREE.MeshStandardMaterial({color: m.col2 || '#38bdf8', roughness: 0.5});
          const baseGeo = new THREE.BoxGeometry(40, 60, 10);
          const pos = baseGeo.attributes.position;
          for(let i=0; i<pos.count; i++) {
              if(pos.getY(i) < -15) pos.setX(i, pos.getX(i)*0.4);
              if(pos.getY(i) > 15) pos.setX(i, pos.getX(i)*1.2);
          }
          baseGeo.computeVertexNormals();
          const face = new THREE.Mesh(baseGeo, m1); meshGroup.add(face);
          const nose = new THREE.Mesh(new THREE.ConeGeometry(4, 25, 4), m2); nose.position.set(0, 0, 8); nose.rotation.x = -Math.PI/8; meshGroup.add(nose);
          const eyeMat = m.glow !== false ? new THREE.MeshBasicMaterial({color: 0x00ffff}) : m2;
          [-10,10].forEach(x=>{
              const eye = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 4), eyeMat);
              eye.position.set(x, 10, 6); eye.rotation.z = x>0 ? Math.PI/12 : -Math.PI/12;
              meshGroup.add(eye);
          });
          if(m.style === 'cyber' || m.style === 'tribal') {
             [-18,18].forEach(x=>{
                 const horn = new THREE.Mesh(new THREE.CylinderGeometry(1, 4, 30, 4), m2);
                 horn.position.set(x, 25, -2); horn.rotation.z = x>0 ? -Math.PI/6 : Math.PI/6;
                 meshGroup.add(horn);
             });
          }
      } else if(m.format === 'instrument-3d' || m.format === 'instrument') {
          const bMat = new THREE.MeshStandardMaterial({color: m.col || '#8b1a1a', roughness: 0.3, metalness: 0.2});
          const sMat = new THREE.MeshStandardMaterial({color: 0xaaaaaa, roughness: 0.1, metalness: 0.9});
          const wMat = new THREE.MeshStandardMaterial({color: 0x3d1c02, roughness: 0.8});
          if(m.type === 'guitar' || !m.type) {
              const body = new THREE.Mesh(new THREE.CylinderGeometry(22,22,8,32), bMat); body.rotation.x = Math.PI/2; meshGroup.add(body);
              const waist = new THREE.Mesh(new THREE.CylinderGeometry(14,14,8,32), bMat); waist.position.y = 30; waist.rotation.x = Math.PI/2; meshGroup.add(waist);
              const neck = new THREE.Mesh(new THREE.BoxGeometry(6,70,5), wMat); neck.position.y = 65; meshGroup.add(neck);
              const head = new THREE.Mesh(new THREE.BoxGeometry(10,15,4), wMat); head.position.y = 105; meshGroup.add(head);
              for(let i=-2; i<=2; i++) { const str = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,90,4), sMat); str.position.set(i*1.2, 55, 3); meshGroup.add(str); }
          } else if(m.type === 'piano') {
              const body = new THREE.Mesh(new THREE.BoxGeometry(80,15,60), bMat); meshGroup.add(body);
              const keys = new THREE.Group(); keys.position.set(0, 8, 30);
              for(let i=0; i<30; i++) {
                  const k = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2, 10), new THREE.MeshStandardMaterial({color: i%7===2||i%7===5 ? 0x111111 : 0xffffff}));
                  k.position.set(-38 + i*2.6, 0, 0); keys.add(k);
              }
              meshGroup.add(keys);
              [[-35,-20,-25], [35,-20,-25], [-35,-20,20], [35,-20,20]].forEach(p=>{
                  const leg = new THREE.Mesh(new THREE.CylinderGeometry(2,2,30,8), wMat);
                  leg.position.set(p[0], p[1], p[2]); meshGroup.add(leg);
              });
          } else if(m.type === 'drums') {
              const kick = new THREE.Mesh(new THREE.CylinderGeometry(20,20,15,32), bMat); kick.rotation.x = Math.PI/2; meshGroup.add(kick);
              const snare = new THREE.Mesh(new THREE.CylinderGeometry(10,10,6,32), bMat); snare.position.set(-25, 10, 10); meshGroup.add(snare);
              const hat = new THREE.Mesh(new THREE.CylinderGeometry(10,10,0.5,32), sMat); hat.position.set(-35, 25, 10); meshGroup.add(hat);
              const tom = new THREE.Mesh(new THREE.CylinderGeometry(8,8,8,32), bMat); tom.position.set(0, 25, -10); meshGroup.add(tom);
              const cymbal = new THREE.Mesh(new THREE.CylinderGeometry(14,14,0.5,32), sMat); cymbal.position.set(25, 30, -5); meshGroup.add(cymbal);
          } else if(m.type === 'violin') {
              const body = new THREE.Mesh(new THREE.CylinderGeometry(12,12,5,32), bMat); body.rotation.x = Math.PI/2; meshGroup.add(body);
              const neck = new THREE.Mesh(new THREE.BoxGeometry(3,40,3), wMat); neck.position.y = 25; meshGroup.add(neck);
              const bow = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,60,8), wMat); bow.position.set(10, 10, 5); bow.rotation.z = Math.PI/4; meshGroup.add(bow);
          } else if(m.type === 'trumpet') {
              const bell = new THREE.Mesh(new THREE.CylinderGeometry(12, 3, 30, 32, 1, true), sMat); bell.rotation.z = Math.PI/2; meshGroup.add(bell);
              const pipe = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40, 16), sMat); pipe.position.x = -35; pipe.rotation.z = Math.PI/2; meshGroup.add(pipe);
              [-5, 0, 5].forEach(x=>{ const v = new THREE.Mesh(new THREE.CylinderGeometry(2,2,10,16), sMat); v.position.set(x-20, 5, 0); meshGroup.add(v); });
          }
      } else if(m.format === 'chem-reaction') {
          const glassMat = new THREE.MeshPhysicalMaterial({color: 0xffffff, transmission: 0.9, transparent: true, roughness: 0.05, clearcoat: 1.0});
          const liqCol = parseInt(m.style === 'toxic' ? '0x22c55e' : m.style === 'plasma' ? '0xa855f7' : '0x3b82f6');
          const liqMat = new THREE.MeshPhysicalMaterial({color: liqCol, transmission: 0.5, transparent: true, roughness: 0.1, emissive: m.glow ? liqCol : 0x000000, emissiveIntensity: 0.5});
          const flask = new THREE.Group();
          const base = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32, 0, Math.PI*2, 0, Math.PI*0.75), glassMat);
          base.rotation.x = Math.PI; base.position.y = 15; flask.add(base);
          const neck = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 20, 32), glassMat);
          neck.position.y = 35; flask.add(neck);
          const rim = new THREE.Mesh(new THREE.TorusGeometry(7, 1, 16, 32), glassMat);
          rim.position.y = 45; rim.rotation.x = Math.PI/2; flask.add(rim);
          meshGroup.add(flask);
          const liquid = new THREE.Mesh(new THREE.SphereGeometry(18, 32, 32, 0, Math.PI*2, 0, Math.PI*0.6), liqMat);
          liquid.rotation.x = Math.PI; liquid.position.y = 15; meshGroup.add(liquid);
          const liqTop = new THREE.Mesh(new THREE.CircleGeometry(17.1, 32), liqMat);
          liqTop.rotation.x = -Math.PI/2; liqTop.position.y = 10; meshGroup.add(liqTop);
          const bGeo = new THREE.BufferGeometry(); const bPos = new Float32Array(50*3);
          for(let i=0; i<150; i++) { bPos[i] = (Math.random()-0.5)*20; }
          bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
          const bubbles = new THREE.Points(bGeo, new THREE.PointsMaterial({color: 0xffffff, size: 2, transparent: true, opacity: 0.8}));
          meshGroup.add(bubbles);
          const vGeo = new THREE.BufferGeometry(); const vPos = new Float32Array(200*3);
          for(let i=0; i<600; i++) { vPos[i] = (Math.random()-0.5)*10; }
          vGeo.setAttribute('position', new THREE.BufferAttribute(vPos, 3));
          const vapor = new THREE.Points(vGeo, new THREE.PointsMaterial({color: liqCol, size: 4, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending}));
          vapor.position.y = 45; meshGroup.add(vapor);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
              const p = bubbles.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { p[i] += 0.2*w; if(p[i] > 10) { p[i] = -5; p[i-1] = (Math.random()-0.5)*20; p[i+1] = (Math.random()-0.5)*20; } }
              bubbles.geometry.attributes.position.needsUpdate = true;
              const vp = vapor.geometry.attributes.position.array;
              for(let i=1; i<vp.length; i+=3) { vp[i] += 0.5*w; vp[i-1] += Math.sin(Date.now()*0.002 + i)*0.1*w; if(vp[i] > 40) { vp[i] = 0; vp[i-1] = (Math.random()-0.5)*10; vp[i+1] = (Math.random()-0.5)*10; } }
              vapor.geometry.attributes.position.needsUpdate = true;
          });
      } else if(m.format === 'anatomy-3d' || m.format === 'anatomy') {
          const sysColors = { skeleton: 0xe2e8f0, muscle: 0xdc2626, brain: 0xfbbf24, heart: 0xef4444, dna: 0x22d3ee };
          const col = sysColors[m.sys] || 0xe2e8f0;
          const isWire = m.view === 'wireframe';
          const mat = new THREE.MeshStandardMaterial({color: col, roughness: 0.4, metalness: 0.1, transparent: m.view==='xray', opacity: m.view==='xray'?0.3:1.0, wireframe: isWire});
          const head = new THREE.Mesh(new THREE.SphereGeometry(15,16,16), mat); head.position.y = 105; meshGroup.add(head);
          const jaw = new THREE.Mesh(new THREE.BoxGeometry(20,8,15), mat); jaw.position.set(0,88,2); meshGroup.add(jaw);
          for(let i=0;i<7;i++){
              const w = 12+i*2; const closed = i<5;
              const rib = new THREE.Mesh(new THREE.TorusGeometry(w, 2, 6, 18, closed?Math.PI*1.8:Math.PI*1.4), mat);
              rib.position.y = 65-i*6; rib.rotation.x = Math.PI/2; meshGroup.add(rib);
          }
          for(let i=0;i<12;i++){ const s = new THREE.Mesh(new THREE.BoxGeometry(6,6,8), mat); s.position.set(0,80-i*7,-4); meshGroup.add(s); }
          const pelvis = new THREE.Mesh(new THREE.TorusGeometry(18,5,8,24,Math.PI), mat); pelvis.position.y = 10; pelvis.rotation.x = -Math.PI/6; meshGroup.add(pelvis);
          let heart = null;
          if(m.sys === 'heart') {
             heart = new THREE.Mesh(new THREE.SphereGeometry(8,16,16), new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0xaa0000}));
             heart.position.set(3, 55, 0); meshGroup.add(heart);
          }
          if(m.sys === 'brain') {
             const brain = new THREE.Mesh(new THREE.SphereGeometry(12,16,16), new THREE.MeshStandardMaterial({color: 0xfbbf24, wireframe: true}));
             brain.position.y = 105; meshGroup.add(brain);
          }
          if(m.glow) {
             const pl = new THREE.PointLight(col, 2, 150); pl.position.set(0, 50, 20); meshGroup.add(pl);
          }
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
              if(heart && m.pulse) { const scale = 1 + Math.sin(Date.now()*0.005)*0.1; heart.scale.set(scale,scale,scale); }
          });
      } else if(m.type === '3d-model') {
          if (m.importedMesh) {
              const clone = m.importedMesh.clone(true);
              const toAdd = [];
              clone.traverse((child) => {
                  if (child.isMesh) {
                      if (renderStyle === 'points') {
                          const pts = new THREE.Points(child.geometry, material);
                          pts.position.copy(child.position); pts.rotation.copy(child.rotation); pts.scale.copy(child.scale);
                          toAdd.push(pts);
                          child.visible = false;
                      } else {
                          // Only override material if not a special format that requires custom material
                          const skipOverride = ['heightmap','audio-viz','math-surface','shader-mesh','webcam-avatar','starmap','doc-gallery','neon-handwriting','voice-sculpture','logic-tree','location-terrain','qr-labyrinth','video-mesh'].includes(m.format);
                          if (!skipOverride) {
                              child.material = material;
                          }
                          child.castShadow = true; child.receiveShadow = true;
                          if (renderStyle === 'blueprint') {
                              const edges = new THREE.EdgesGeometry(child.geometry);
                              const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: new THREE.Color(m.colorHex) }));
                              child.add(line);
                          }
                      }
                  }
              });
              toAdd.forEach(p => clone.add(p));
              meshGroup.add(clone);
          }
      } else {
          shapes.forEach(shape => {
              try {
                 const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                 processMesh(geo, (obj) => meshGroup.add(obj));
              } catch(e) { lines.push(shape); }
          });
          
          if(lines.length > 0) {
              const positions = []; const normals = []; const indices = []; let vIdx = 0;
              function addQuad(pA, pB, pC, pD, nX, nY, nZ) {
                  positions.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z, pC.x, pC.y, pC.z, pD.x, pD.y, pD.z);
                  for(let i=0; i<4; i++) normals.push(nX, nY, nZ);
                  indices.push(vIdx, vIdx+1, vIdx+2, vIdx, vIdx+2, vIdx+3);
                  vIdx += 4;
              }
              lines.forEach(shape => {
                  try {
                     const pts = shape.getPoints();
                     if(pts.length < 2) return;
                     for(let i=0; i<pts.length-1; i++) {
                        const p1 = pts[i]; const p2 = pts[i+1];
                        const dx = p2.x - p1.x; const dy = p2.y - p1.y;
                        const len = Math.hypot(dx, dy); if(len < dRawMax * 0.0001) continue;
                        const nx = (-dy / len) * (wallThickness / 2); const ny = (dx / len) * (wallThickness / 2);
                        const c1 = {x: p1.x + nx, y: p1.y + ny, z: 0}; const c2 = {x: p1.x - nx, y: p1.y - ny, z: 0};
                        const c3 = {x: p2.x + nx, y: p2.y + ny, z: 0}; const c4 = {x: p2.x - nx, y: p2.y - ny, z: 0};
                        const t1 = {x: c1.x, y: c1.y, z: wallDepth}; const t2 = {x: c2.x, y: c2.y, z: wallDepth};
                        const t3 = {x: c3.x, y: c3.y, z: wallDepth}; const t4 = {x: c4.x, y: c4.y, z: wallDepth};
                        addQuad(t1, t2, t4, t3, 0, 0, 1); addQuad(c2, c1, c3, c4, 0, 0, -1);
                        addQuad(c1, t1, t3, c3, nx, ny, 0); addQuad(c4, t4, t2, c2, -nx, -ny, 0);
                        addQuad(c2, t2, t1, c1, -dx, -dy, 0); addQuad(c3, t3, t4, c4, dx, dy, 0);
                     }
                  } catch(err){}
              });
              if(positions.length > 0) {
                  const geo = new THREE.BufferGeometry();
                  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
                  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
                  geo.setIndex(indices);
                  processMesh(geo, (obj) => meshGroup.add(obj));
              }
          } else if(m.type === 'svg') {
              meshGroup.scale.y = -1;
          }
      }

      // Redundant mirror group removed. Symmetry is already handled at the 2D path level.

      if (m.twistVal && m.twistVal !== 0) {
          const twistAngle = m.twistVal * (Math.PI / 180);
          meshGroup.traverse(child => {
              if (child.isMesh && child.geometry && child.geometry.attributes.position) {
                  const geo = child.geometry;
                  geo.computeBoundingBox();
                  const minZ = geo.boundingBox.min.z;
                  const maxZ = geo.boundingBox.max.z;
                  const rangeZ = maxZ - minZ;
                  if (rangeZ > 0) {
                      const pos = geo.attributes.position;
                      for (let i = 0; i < pos.count; i++) {
                          const x = pos.getX(i);
                          const y = pos.getY(i);
                          const z = pos.getZ(i);
                          const nz = (z - minZ) / rangeZ;
                          const angle = nz * twistAngle;
                          const cosA = Math.cos(angle);
                          const sinA = Math.sin(angle);
                          pos.setXY(i, x * cosA - y * sinA, x * sinA + y * cosA);
                      }
                      geo.computeVertexNormals();
                      pos.needsUpdate = true;
                  }
              }
          });
      }

      if (m.bendVal && m.bendVal !== 0) {
          meshGroup.traverse(child => {
              if (child.isMesh && child.geometry && child.geometry.attributes.position) {
                  const geo = child.geometry;
                  geo.computeBoundingBox();
                  const minX = geo.boundingBox.min.x;
                  const maxX = geo.boundingBox.max.x;
                  const rangeX = maxX - minX;
                  if (rangeX > 0) {
                      const pos = geo.attributes.position;
                      for (let i = 0; i < pos.count; i++) {
                          const x = pos.getX(i);
                          const y = pos.getY(i);
                          const z = pos.getZ(i);
                          const nx = (x - minX) / rangeX - 0.5; 
                          const curveZ = (1 - Math.cos(nx * Math.PI)) * m.bendVal;
                          pos.setXYZ(i, x, y, z - curveZ);
                      }
                      geo.computeVertexNormals();
                      pos.needsUpdate = true;
                  }
              }
          });
      }

      if (m.taperVal && m.taperVal !== 1.0) {
          const taper = m.taperVal;
          meshGroup.traverse(child => {
              if (child.isMesh && child.geometry && child.geometry.attributes.position) {
                  const geo = child.geometry;
                  geo.computeBoundingBox();
                  const minY = geo.boundingBox.min.y;
                  const maxY = geo.boundingBox.max.y;
                  const rangeY = maxY - minY;
                  if (rangeY > 0) {
                      const pos = geo.attributes.position;
                      for (let i = 0; i < pos.count; i++) {
                          const x = pos.getX(i);
                          const y = pos.getY(i);
                          const z = pos.getZ(i);
                          const ny = (y - minY) / rangeY;
                          const scale = 1.0 + (taper - 1.0) * ny;
                          pos.setXYZ(i, x * scale, y, z * scale);
                      }
                      geo.computeVertexNormals();
                      pos.needsUpdate = true;
                  }
              }
          });
      }

      // ── Hero Forge format ────────────────────────────────────────────────
      if (m.format === 'hero-forge') {
          return buildHeroForgeGeo(m);
      }
      if (m.format === 'steampunk-chrono') {
          return buildSteampunkChronoGeo(m);
      }
      if (m.format === 'steampunk-chrono-pro') {
          return buildSteampunkChronoProGeo(m);
      }
      if (m.format === 'clock-ultra') {
          return buildClockUltraGeo(m);
      }

      const box = new THREE.Box3().setFromObject(meshGroup);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if(maxDim > 0 && maxDim !== Infinity) {
          const normalizeScale = 100 / maxDim;
          meshGroup.scale.set(normalizeScale * m.scale, normalizeScale * m.scale * (m.type==='svg'?-1:1), normalizeScale * m.scale);
      }
      const box2 = new THREE.Box3().setFromObject(meshGroup);
      const center = box2.getCenter(new THREE.Vector3());
      meshGroup.position.sub(center);

      return meshGroup;
  }

  function buildModels() {
      if(!globalGroup) return;
      const activeModel = getActiveModel();
      const hasSteampunkActive = activeModel && (activeModel.format === 'steampunk-chrono' || activeModel.format === 'steampunk-chrono-pro' || activeModel.format === 'clock-ultra');
      
      models.forEach(m => {
          if(!m.meshGroup) {
              m.meshGroup = new THREE.Group();
              globalGroup.add(m.meshGroup);
              m.meshGroup.position.copy(m.position);
              m.meshGroup.rotation.copy(m.rotation);
              m.meshGroup.scale.copy(m.groupScale);
          }
          while(m.meshGroup.children.length > 0){ m.meshGroup.remove(m.meshGroup.children[0]); }
          // Audio-viz / imported-mesh / hero-forge (live): add directly
          if((m.format === 'audio-viz' || m.format === 'imported-mesh' || m.format === 'hero-forge' || m.format === 'steampunk-chrono' || m.format === 'steampunk-chrono-pro' || m.format === 'clock-ultra') && m.importedMesh) {
              m.meshGroup.add(m.importedMesh);
              if (m.format === 'hero-forge') {
                  const partsMap = {};
                  m.importedMesh.children.forEach(c => {
                      if (c.name.startsWith('HFP_')) partsMap[c.name.substring(4)] = c;
                  });
                  addHeroAnimCb(m, partsMap);
              }
          } else {
              const geoGroup = createGeometryFromModel(m);
              m.meshGroup.add(geoGroup);
          }
          
          if (m.type === 'draw' && hasSteampunkActive) {
              m.meshGroup.visible = false;
          } else {
              m.meshGroup.visible = true;
          }
      });
      syncUI();
  }

  // ── Hero Forge geometry builder (used by createGeometryFromModel) ─────────
  function buildHeroForgeGeo(m) {
      const meshGroup = new THREE.Group();
      if (!m.heroparts || !m.heroparts.length) return meshGroup;
      const style = m.herostyle || 'cyber';
      const partsMap = {};
      
      m.heroparts.forEach(p => {
          const b = style==='blocky', o = style==='organic';
          let geo;
          switch(p.name) {
              case 'torso': geo=(b||!o)?new THREE.BoxGeometry(18,26,12):new THREE.CylinderGeometry(10,12,26,12); break;
              case 'head':  geo=b?new THREE.BoxGeometry(12,13,12):new THREE.SphereGeometry(8,24,24); break;
              case 'armL': case 'armR': geo=(b||!o)?new THREE.BoxGeometry(5,22,5):new THREE.CylinderGeometry(2.5,2,22,10); break;
              case 'legL': case 'legR': geo=(b||!o)?new THREE.BoxGeometry(6,26,6):new THREE.CylinderGeometry(3.5,2.5,26,10); break;
              case 'weapon': geo=new THREE.BoxGeometry(3,28,3); break;
              case 'cape':   geo=new THREE.ConeGeometry(14,30,8); break;
              case 'drone':  geo=new THREE.IcosahedronGeometry(4, 0); break;
              case 'hoverboard': geo=new THREE.BoxGeometry(20, 2, 34); break;
              case 'shield': geo=new THREE.CylinderGeometry(12, 12, 2, 16); break;
              default: geo=new THREE.BoxGeometry(10,10,10);
          }
          const mat = new THREE.MeshPhysicalMaterial({
              color: p.colorHex||'#334155', emissive: p.emissiveHex||'#000000',
              metalness: p.metalness||0, roughness: p.roughness||0.5,
              clearcoat: style==='cyber'||style==='crystal'||p.name==='shield'?1.0:0.0,
              clearcoatRoughness: 0.1,
              transmission: style==='crystal'||p.name==='shield'?0.6:0.0,
              thickness: style==='crystal'||p.name==='shield'?2.0:0.0,
              flatShading: style==='blocky',
              side: THREE.DoubleSide
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.castShadow = true; mesh.receiveShadow = true;
          mesh.position.set(p.px||0, p.py||0, p.pz||0);
          meshGroup.add(mesh);
          partsMap[p.name] = mesh;
      });

      addHeroAnimCb(m, partsMap);
      return meshGroup;
  }

  function addHeroAnimCb(m, partsMap) {
      if (typeof scene === 'undefined' || !scene) return;
      const animState = m.heroAnim || 'idle';
      const sceneCbs = scene.animCbs = scene.animCbs || [];
      // Remove any existing callback for this specific model to prevent duplicates
      m._hfAnimCb = (w) => {
          const t = Date.now() * 0.001 * (animState === 'fly' ? 2 : animState === 'walk' ? 1.5 : 1);
          if (partsMap.torso) {
              partsMap.torso.position.y = (m.heroparts.find(p=>p.name==='torso')?.py || 15) + (animState === 'fly' ? Math.sin(t)*3 : Math.abs(Math.sin(t*2))*1);
              if (animState === 'walk') partsMap.torso.rotation.y = Math.sin(t)*0.1;
          }
          if (partsMap.head) partsMap.head.position.y = (m.heroparts.find(p=>p.name==='head')?.py || 37) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
          if (partsMap.armL) {
              partsMap.armL.position.y = (m.heroparts.find(p=>p.name==='armL')?.py || 17) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
              if (animState === 'walk') partsMap.armL.rotation.x = Math.sin(t)*0.8;
              else if (animState === 'fly') partsMap.armL.rotation.x = -0.5;
              else if (animState === 'combat') { partsMap.armL.rotation.x = -1.0; partsMap.armL.rotation.z = -0.2; }
              else { partsMap.armL.rotation.x = 0; partsMap.armL.rotation.z=-0.15+Math.sin(t*0.8)*0.09; }
          }
          if (partsMap.armR) {
              partsMap.armR.position.y = (m.heroparts.find(p=>p.name==='armR')?.py || 17) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
              if (animState === 'walk') partsMap.armR.rotation.x = -Math.sin(t)*0.8;
              else if (animState === 'fly') partsMap.armR.rotation.x = -0.5;
              else if (animState === 'combat') { partsMap.armR.rotation.x = -1.2; partsMap.armR.rotation.z = 0.2; }
              else { partsMap.armR.rotation.x = 0; partsMap.armR.rotation.z= 0.15-Math.sin(t*0.8)*0.09; }
          }
          if (partsMap.legL) {
              partsMap.legL.position.y = (m.heroparts.find(p=>p.name==='legL')?.py || -11) + (animState==='fly' ? (partsMap.torso ? partsMap.torso.position.y - 15 : 0) : 0);
              if (animState === 'walk') partsMap.legL.rotation.x = -Math.sin(t)*0.6;
              else if (animState === 'fly') partsMap.legL.rotation.x = 0.3;
              else if (animState === 'combat') { partsMap.legL.rotation.x = -0.2; partsMap.legL.position.y -= 1; }
              else partsMap.legL.rotation.x= Math.sin(t*0.6)*0.05;
          }
          if (partsMap.legR) {
              partsMap.legR.position.y = (m.heroparts.find(p=>p.name==='legR')?.py || -11) + (animState==='fly' ? (partsMap.torso ? partsMap.torso.position.y - 15 : 0) : 0);
              if (animState === 'walk') partsMap.legR.rotation.x = Math.sin(t)*0.6;
              else if (animState === 'fly') partsMap.legR.rotation.x = 0.5;
              else if (animState === 'combat') { partsMap.legR.rotation.x = 0.2; partsMap.legR.position.y -= 1; }
              else partsMap.legR.rotation.x=-Math.sin(t*0.6)*0.05;
          }
          if (partsMap.weapon) {
              partsMap.weapon.position.y = (m.heroparts.find(p=>p.name==='weapon')?.py || 15) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
              if (animState === 'combat') { partsMap.weapon.rotation.x = -1.0; partsMap.weapon.position.z = 10; }
              else { partsMap.weapon.rotation.x = 0; partsMap.weapon.position.z = 0; }
          }
          if (partsMap.cape) {
              partsMap.cape.position.y = (m.heroparts.find(p=>p.name==='cape')?.py || 10) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
              if (animState === 'fly') partsMap.cape.rotation.x = -0.8 + Math.sin(t*3)*0.1;
              else if (animState === 'walk') partsMap.cape.rotation.x = -0.3 + Math.sin(t*2)*0.1;
              else partsMap.cape.rotation.x = 0;
              partsMap.cape.rotation.z= Math.sin(t)*0.12;
          }
          if (partsMap.drone) {
              const dx = m.heroparts.find(p=>p.name==='torso')?.px || 0;
              const dy = m.heroparts.find(p=>p.name==='torso')?.py || 15;
              const dz = m.heroparts.find(p=>p.name==='torso')?.pz || 0;
              partsMap.drone.position.x = dx + Math.cos(t*1.5) * 20;
              partsMap.drone.position.z = dz + Math.sin(t*1.5) * 20;
              partsMap.drone.position.y = dy + 15 + Math.sin(t*3) * 5;
              partsMap.drone.rotation.y += 0.05;
              partsMap.drone.rotation.x += 0.02;
          }
          if (partsMap.hoverboard) {
              partsMap.hoverboard.position.y = (m.heroparts.find(p=>p.name==='hoverboard')?.py || -25) + (animState === 'fly' ? Math.sin(t)*3 : Math.abs(Math.sin(t*2))*1);
              if (animState === 'fly') partsMap.hoverboard.rotation.x = 0.3;
              else partsMap.hoverboard.rotation.x = 0;
              partsMap.hoverboard.rotation.y = Math.sin(t*0.5)*0.1;
          }
          if (partsMap.shield) {
              partsMap.shield.position.y = (m.heroparts.find(p=>p.name==='shield')?.py || 17) + (partsMap.torso ? partsMap.torso.position.y - 15 : 0);
              partsMap.shield.rotation.y += 0.02;
              partsMap.shield.rotation.z = Math.PI / 2;
              if (animState === 'combat') {
                  partsMap.shield.rotation.x = -1.0;
                  partsMap.shield.position.z = 15;
                  partsMap.shield.position.x = -22;
              } else {
                  partsMap.shield.rotation.x = 0;
                  partsMap.shield.position.z = 4;
              }
          }
      };
      // To avoid massive duplicates, clear old cb for this model ID
      scene.animCbs = sceneCbs.filter(cb => cb._modelId !== m.id);
      m._hfAnimCb._modelId = m.id;
      scene.animCbs.push(m._hfAnimCb);
  }

  // ── Steampunk Chrono geometry builder & animation callback ──────────────
  function buildSteampunkChronoGeo(m) {
      const meshGroup = new THREE.Group();
      if (!m.clockParts || !m.clockParts.length) return meshGroup;
      const style = m.clockStyle || 'brass';
      const partsMap = {};

      function makeMat(partName, style) {
          const C = {
              brass: { color: 0xd4af37, metalness: 0.95, roughness: 0.15 },
              copper: { color: 0xc87533, metalness: 0.90, roughness: 0.25 },
              iron: { color: 0x3a3d40, metalness: 0.75, roughness: 0.45 },
              gold: { color: 0xffd700, metalness: 0.98, roughness: 0.10 }
          };
          const s = C[style] || C.brass;
          const col = s.color;
          let emi = 0x000000, emInt = 0;
          if (partName.startsWith('hand')) {
              emi = 0xc87533; emInt = 0.3;
          }
          return new THREE.MeshPhysicalMaterial({ 
              color: col, emissive: emi, emissiveIntensity: emInt,
              metalness: s.metalness, roughness: s.roughness,
              clearcoat: style === 'gold' || style === 'brass' ? 1.0 : 0.2,
              clearcoatRoughness: 0.1, flatShading: style === 'iron', side: THREE.DoubleSide
          });
      }

      function makeGearGeometry(teeth, thickness, scaleRadius) {
          const baseRadius = teeth * 0.4 * scaleRadius;
          const gearGeom = new THREE.CylinderGeometry(baseRadius, baseRadius, thickness, teeth * 2);
          return { geom: gearGeom, baseRadius };
      }

      function addGearTeeth(mesh, teeth, thickness, baseRadius, style) {
          const toothCount = teeth;
          const angleStep = (Math.PI * 2) / toothCount;
          const toothW = baseRadius * Math.sin(angleStep / 2) * 1.1;
          const toothD = baseRadius * 0.15;
          const toothH = thickness;
          const toothGeom = new THREE.BoxGeometry(toothW, toothH, toothD);
          const toothMat = makeMat('gear_tooth', style);
          for (let i = 0; i < toothCount; i++) {
              const angle = i * angleStep;
              const toothMesh = new THREE.Mesh(toothGeom, toothMat);
              toothMesh.position.set(Math.cos(angle) * (baseRadius + toothD / 4), 0, Math.sin(angle) * (baseRadius + toothD / 4));
              toothMesh.rotation.y = -angle;
              toothMesh.castShadow = true; toothMesh.receiveShadow = true;
              toothMesh.name = 'gear_tooth_' + i;
              mesh.add(toothMesh);
          }
      }

      m.clockParts.forEach(p => {
          let partMesh;
          const mat = makeMat(p.name, style);

          if (p.name === 'dial') {
              const dialGroup = new THREE.Group();
              const outerRing = new THREE.Mesh(new THREE.TorusGeometry(36, 1.2, 8, 32), mat);
              dialGroup.add(outerRing);
              const innerRing = new THREE.Mesh(new THREE.TorusGeometry(28, 0.8, 8, 32), mat);
              dialGroup.add(innerRing);
              const backPlate = new THREE.Mesh(
                  new THREE.CylinderGeometry(35.5, 35.5, 0.6, 32), 
                  new THREE.MeshPhysicalMaterial({ color: 0x110a02, roughness: 0.6, transmission: 0.6, thickness: 1.0 })
              );
              backPlate.rotation.x = Math.PI / 2; backPlate.position.z = -0.6;
              dialGroup.add(backPlate);
              const markerGeom = new THREE.BoxGeometry(0.8, 4.0, 0.8);
              for (let i = 0; i < 12; i++) {
                  const marker = new THREE.Mesh(markerGeom, makeMat('marker', 'gold'));
                  const ang = (i / 12) * Math.PI * 2;
                  marker.position.set(Math.cos(ang) * 31.5, Math.sin(ang) * 31.5, 0.4);
                  marker.rotation.z = ang - Math.PI / 2;
                  dialGroup.add(marker);
              }
              partMesh = dialGroup;
              partMesh.name = 'SCP_dial';
          }
          else if (p.name.startsWith('gear')) {
              const teeth = parseInt(p.name.substring(4));
              const { geom, baseRadius } = makeGearGeometry(teeth, 2.5, 1.0);
              const gearMesh = new THREE.Mesh(geom, mat);
              gearMesh.rotation.x = Math.PI / 2;
              gearMesh.castShadow = true; gearMesh.receiveShadow = true;
              addGearTeeth(gearMesh, teeth, 2.5, baseRadius, style);
              const axle = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius * 0.25, baseRadius * 0.25, 3.0, 8), makeMat('axle', 'iron'));
              gearMesh.add(axle);
              const spokeGeom = new THREE.BoxGeometry(baseRadius * 1.8, 1.5, 1.2);
              for(let i=0; i<3; i++) {
                  const spoke = new THREE.Mesh(spokeGeom, mat);
                  spoke.rotation.y = (i * Math.PI) / 3;
                  gearMesh.add(spoke);
              }
              partMesh = gearMesh;
              partMesh.name = 'SCP_' + p.name;
          }
          else if (p.name.startsWith('hand')) {
              const handGroup = new THREE.Group();
              let len = 12;
              if (p.name === 'handH') len = 14;
              if (p.name === 'handM') len = 24;
              if (p.name === 'handS') len = 28;
              const rodMat = p.name === 'handS' ? makeMat('second_hand', 'gold') : mat;
              const rod = new THREE.Mesh(new THREE.BoxGeometry(0.8, len, 0.8), rodMat);
              rod.position.y = len / 2 - 2;
              handGroup.add(rod);
              const tip = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4, 4), rodMat);
              tip.position.y = len - 2;
              handGroup.add(tip);
              const cap = new THREE.Mesh(new THREE.SphereGeometry(2.2, 8, 8), makeMat('hand_cap', 'gold'));
              cap.position.z = 0.6;
              handGroup.add(cap);
              partMesh = handGroup;
              partMesh.name = 'SCP_' + p.name;
          }
          else if (p.name === 'escapement') {
              const escapeGroup = new THREE.Group();
              const escWheel = new THREE.Mesh(new THREE.TorusGeometry(8, 0.8, 6, 24), mat);
              escapeGroup.add(escWheel);
              const crossG = new THREE.BoxGeometry(15.5, 0.6, 0.6);
              const cross1 = new THREE.Mesh(crossG, mat);
              const cross2 = new THREE.Mesh(crossG, mat);
              cross2.rotation.z = Math.PI / 2;
              escapeGroup.add(cross1, cross2);
              const anchorFork = new THREE.Group();
              anchorFork.name = 'escapement_anchor'; anchorFork.position.y = 8;
              const anchorBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 8.0, 1.2), makeMat('anchor', 'iron'));
              anchorFork.add(anchorBody);
              const prongs = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.6, 6, 12, Math.PI), makeMat('anchor', 'iron'));
              prongs.rotation.x = Math.PI/2; prongs.position.y = -4;
              anchorFork.add(prongs);
              escapeGroup.add(anchorFork);
              partMesh = escapeGroup;
              partMesh.name = 'SCP_escapement';
          }
          else if (p.name === 'pendulum') {
              const pendGroup = new THREE.Group();
              const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 45, 8), mat);
              rod.position.y = -22.5; pendGroup.add(rod);
              const bob = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 2, 16), makeMat('bob', 'gold'));
              bob.position.y = -45; bob.rotation.x = Math.PI/2;
              pendGroup.add(bob);
              partMesh = pendGroup;
              partMesh.name = 'SCP_pendulum';
          }
          else if (p.name === 'piston') {
              const pistonGroup = new THREE.Group();
              const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 5, 15, 12), makeMat('cylinder', 'iron'));
              pistonGroup.add(cylinder);
              const rod = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 18, 8), makeMat('piston_rod', 'copper'));
              rod.name = 'piston_rod'; rod.position.y = 5;
              pistonGroup.add(rod);
              const bracket = new THREE.Mesh(new THREE.BoxGeometry(11, 2, 4), makeMat('bracket', 'brass'));
              pistonGroup.add(bracket);
              partMesh = pistonGroup;
              partMesh.name = 'SCP_piston';
          }
          else if (p.name === 'pipe') {
              const pipeGroup = new THREE.Group();
              [-1, 1].forEach(s => {
                  const vent = new THREE.Group();
                  vent.position.x = s * 45; vent.position.y = 20;
                  const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.5, 15, 8), mat);
                  vent.add(pipe1);
                  const cap = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.8, 8, 16), makeMat('pipe_cap', 'gold'));
                  cap.rotation.x = Math.PI / 2; cap.position.y = 7.5;
                  vent.add(cap);
                  const mount = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 3), makeMat('mount', 'iron'));
                  mount.position.set(-s * 5, -3, 0);
                  vent.add(mount);
                  pipeGroup.add(vent);
              });
              partMesh = pipeGroup;
              partMesh.name = 'SCP_pipe';
          }

          if (partMesh) {
              partMesh.position.set(p.px||0, p.py||0, p.pz||0);
              meshGroup.add(partMesh);
              partsMap[p.name] = partMesh;

              if (p.colorHex) {
                  const customCol = new THREE.Color(p.colorHex);
                  partMesh.traverse(child => {
                      if (child.material) {
                          if (Array.isArray(child.material)) {
                              child.material.forEach(m2 => { if (m2.color) m2.color.copy(customCol); });
                          } else {
                              if (child.material.color) child.material.color.copy(customCol);
                          }
                      }
                  });
              }
          }
      });

      addSteampunkAnimCb(m, partsMap);
      return meshGroup;
  }

  function addSteampunkAnimCb(m, partsMap) {
      if (typeof scene === 'undefined' || !scene) return;
      const sceneCbs = scene.animCbs = scene.animCbs || [];
      m._scAnimCb = (w) => {
          const speed = w || 1;
          const now = new Date();
          const ms = now.getMilliseconds();
          const sec = now.getSeconds() + ms / 1000;
          const min = now.getMinutes() + sec / 60;
          const hr = (now.getHours() % 12) + min / 60;

          const angleS = - (sec / 60) * Math.PI * 2;
          const angleM = - (min / 60) * Math.PI * 2;
          const angleH = - (hr / 12) * Math.PI * 2;

          if (partsMap.gear64) partsMap.gear64.rotation.y = angleS;
          if (partsMap.handS) partsMap.handS.rotation.z = angleS;
          if (partsMap.gear32) partsMap.gear32.rotation.y = angleM;
          if (partsMap.handM) partsMap.handM.rotation.z = angleM;
          if (partsMap.gear16) partsMap.gear16.rotation.y = angleH;
          if (partsMap.handH) partsMap.handH.rotation.z = angleH;
          if (partsMap.gear8) partsMap.gear8.rotation.y = -angleS * 8;

          if (partsMap.escapement) {
              const clockTick = sec * Math.PI * 4;
              partsMap.escapement.rotation.y = Math.sin(clockTick) * 0.7;
              const anchor = partsMap.escapement.getObjectByName('escapement_anchor');
              if (anchor) anchor.rotation.z = Math.cos(clockTick) * 0.14;
          }
          if (partsMap.pendulum) {
              const swingTime = sec * Math.PI * 2;
              partsMap.pendulum.rotation.z = Math.sin(swingTime) * 0.16;
          }
          if (partsMap.piston) {
              const pistonTime = sec * Math.PI * 3;
              const rod = partsMap.piston.getObjectByName('piston_rod');
              if (rod) rod.position.y = 5 + Math.sin(pistonTime) * 4.5;
          }
      };
      scene.animCbs = sceneCbs.filter(cb => cb._modelId !== m.id);
      m._scAnimCb._modelId = m.id;
      scene.animCbs.push(m._scAnimCb);
  }

  function buildSteampunkChronoProGeo(m) {
      const meshGroup = new THREE.Group();
      if (!m.clockParts || !m.clockParts.length) return meshGroup;
      const style = m.clockStyle || 'brass';
      const clockType = (m.clockParts && m.clockParts[0] && m.clockParts[0].clockType) || 'chrono';
      const accentHex = (m.clockParts && m.clockParts[0] && m.clockParts[0].accentColor) || '#ff5500';
      const partsMap = {};

      function makeMat(partName, style, isGlowing = false, glowColor = 0xff5500) {
          const C = {
              brass: { color: 0xd4af37, metalness: 0.95, roughness: 0.15 },
              copper: { color: 0xc87533, metalness: 0.90, roughness: 0.25 },
              iron: { color: 0x2b2d30, metalness: 0.80, roughness: 0.40 },
              gold: { color: 0xffd700, metalness: 0.98, roughness: 0.10 }
          };
          const s = C[style] || C.brass;
          let col = s.color;
          let emi = 0x000000;
          let emInt = 0;

          if (isGlowing) {
              emi = new THREE.Color(glowColor);
              emInt = 0.8;
              col = glowColor;
          } else if (partName.startsWith('hand') || partName.includes('indicator')) {
              emi = 0xc87533;
              emInt = 0.3;
          }

          return new THREE.MeshPhysicalMaterial({
              color: col,
              emissive: emi,
              emissiveIntensity: emInt,
              metalness: s.metalness,
              roughness: s.roughness,
              clearcoat: style === 'gold' || style === 'brass' ? 1.0 : 0.2,
              clearcoatRoughness: 0.1,
              flatShading: style === 'iron',
              side: THREE.DoubleSide
          });
      }

      // Premium Steampunk Gear Builder
      function makeGear(teeth, thickness, scaleRadius, mat, gearStyle) {
          const baseRadius = teeth * 0.4 * scaleRadius;
          const gearGeom = new THREE.CylinderGeometry(baseRadius, baseRadius, thickness, teeth * 2);
          const gearMesh = new THREE.Mesh(gearGeom, mat);
          gearMesh.rotation.x = Math.PI / 2;
          gearMesh.castShadow = true; 
          gearMesh.receiveShadow = true;
          
          addGearTeeth(gearMesh, teeth, thickness, baseRadius, gearStyle);
          
          const axle = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius * 0.25, baseRadius * 0.25, thickness + 1.2, 8), makeMat('axle', 'iron'));
          gearMesh.add(axle);
          
          const spokeGeom = new THREE.BoxGeometry(baseRadius * 1.8, thickness - 0.5, thickness - 0.5);
          for(let i = 0; i < 3; i++) {
              const spoke = new THREE.Mesh(spokeGeom, mat);
              spoke.rotation.y = (i * Math.PI) / 3;
              gearMesh.add(spoke);
          }
          return gearMesh;
      }

      function addGearTeeth(mesh, teeth, thickness, baseRadius, gearStyle) {
          const toothCount = teeth;
          const angleStep = (Math.PI * 2) / toothCount;
          const toothW = baseRadius * Math.sin(angleStep / 2) * 1.1;
          const toothD = baseRadius * 0.15;
          const toothH = thickness;
          const toothGeom = new THREE.BoxGeometry(toothW, toothH, toothD);
          const toothMat = makeMat('gear_tooth', gearStyle);
          for (let i = 0; i < toothCount; i++) {
              const angle = i * angleStep;
              const toothMesh = new THREE.Mesh(toothGeom, toothMat);
              toothMesh.position.set(Math.cos(angle) * (baseRadius + toothD / 4), 0, Math.sin(angle) * (baseRadius + toothD / 4));
              toothMesh.rotation.y = -angle;
              toothMesh.castShadow = true;
              toothMesh.receiveShadow = true;
              mesh.add(toothMesh);
          }
      }

      // Premium Steampunk Hand Builder
      function buildSteampunkHand(partName, len, handStyle, hasGlow = false, glowColor = '#ff5500') {
          const handGroup = new THREE.Group();
          handGroup.name = partName;
          
          const rodMat = hasGlow ? makeMat(partName, handStyle, true, glowColor) : makeMat(partName, handStyle);
          
          // Main rod lying in XY plane, sweeping around Z axis
          const rod = new THREE.Mesh(new THREE.BoxGeometry(0.8, len, 0.8), rodMat);
          rod.position.y = len / 2 - 2; 
          rod.castShadow = true;
          handGroup.add(rod);

          // Elegant spear cone tip
          const tip = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4, 4), rodMat);
          tip.position.y = len - 2;
          tip.rotation.y = Math.PI / 4;
          tip.castShadow = true;
          handGroup.add(tip);

          // Ornate mechanical ring
          const decorRing = new THREE.Mesh(new THREE.TorusGeometry(2, 0.4, 6, 12), rodMat);
          decorRing.position.y = len * 0.4;
          decorRing.rotation.x = Math.PI / 2;
          handGroup.add(decorRing);

          // Central golden cap boss
          const cap = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 12), makeMat('hand_cap', 'gold'));
          cap.position.z = 0.6;
          cap.castShadow = true;
          handGroup.add(cap);

          return handGroup;
      }

      // --- PREMIUM 3D DIAL BASE PLATE & ZODIAC astrolabe ---
      const dialGroup = new THREE.Group();
      
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(38, 2.0, 10, 48), makeMat('outer_ring', style));
      dialGroup.add(outerRing);
      
      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(30, 0.8, 8, 36), makeMat('inner_ring', style));
      innerRing.position.z = 1.0;
      dialGroup.add(innerRing);
      
      // Gorgeous glass dial plate so internal gears spin visibly behind it!
      const backPlate = new THREE.Mesh(
          new THREE.CylinderGeometry(37, 37, 1.2, 32),
          new THREE.MeshPhysicalMaterial({ 
              color: 0x140d06, 
              roughness: 0.15, 
              metalness: 0.1,
              transmission: 0.75,
              thickness: 2.0,
              transparent: true,
              opacity: 0.88
          })
      );
      backPlate.rotation.x = Math.PI / 2;
      backPlate.position.z = -1.0;
      dialGroup.add(backPlate);
      
      const p0 = m.clockParts && m.clockParts[0] ? m.clockParts[0] : {};

      if (p0.customLogo) {
          const tex = new THREE.TextureLoader().load(p0.customLogo);
          tex.encoding = THREE.sRGBEncoding;
          tex.center.set(0.5, 0.5);
          const logoMat = new THREE.MeshBasicMaterial({
              map: tex,
              transparent: true,
              side: THREE.DoubleSide
          });
          // Perfectly round geometry, radius 28 to fit inside the inner ring
          const logoPlane = new THREE.Mesh(new THREE.CircleGeometry(28, 64), logoMat);
          logoPlane.position.set(0, 0, 0.5); // Place behind the hands (hands start at z > 1.0)
          logoPlane.name = 'customLogoPlane';
          dialGroup.add(logoPlane);
      }

      // Dial hour markers
      const markerGeom = new THREE.BoxGeometry(0.8, 4.0, 1.0);
      for (let i = 0; i < 12; i++) {
          const marker = new THREE.Mesh(markerGeom, makeMat('marker', 'gold'));
          const ang = (i / 12) * Math.PI * 2;
          marker.position.set(Math.cos(ang) * 34, Math.sin(ang) * 34, 0.6);
          marker.rotation.z = ang - Math.PI / 2;
          dialGroup.add(marker);
      }
      meshGroup.add(dialGroup);

      if (clockType === 'chrono') {
          // --- CHRONO STOPWATCH ---
          
          // Sub-dial 1 (Top)
          const subDial1 = new THREE.Mesh(new THREE.TorusGeometry(8, 0.6, 6, 24), makeMat('subdial1', style));
          subDial1.position.set(0, 15, 1.0);
          meshGroup.add(subDial1);

          const handMs = buildSteampunkHand('hand_ms', 8, style, true, accentHex);
          handMs.position.set(0, 15, 1.8);
          meshGroup.add(handMs);
          partsMap.handMs = handMs;

          // Sub-dial 2 (Bottom)
          const subDial2 = new THREE.Mesh(new THREE.TorusGeometry(8, 0.6, 6, 24), makeMat('subdial2', style));
          subDial2.position.set(0, -15, 1.0);
          meshGroup.add(subDial2);

          const handMin = buildSteampunkHand('hand_min', 8, style, false);
          handMin.position.set(0, -15, 1.8);
          meshGroup.add(handMin);
          partsMap.handMin = handMin;

          // Main Center Second Hand (High-speed sweeping)
          const handSec = buildSteampunkHand('hand_sec', 30, style, true, accentHex);
          handSec.position.set(0, 0, 2.5);
          meshGroup.add(handSec);
          partsMap.handSec = handSec;

          // Standard real-time hour and minute hands stack (tells real time behind stopwatch hand)
          const handH = buildSteampunkHand('hand_h', 16, style, false);
          handH.position.set(0, 0, 1.2);
          meshGroup.add(handH);
          partsMap.handH = handH;

          const handM = buildSteampunkHand('hand_m', 24, style, false);
          handM.position.set(0, 0, 1.9);
          meshGroup.add(handM);
          partsMap.handM = handM;

          // Side Steam Exhaust Pipe
          const pipeG = new THREE.Group();
          pipeG.position.set(-26, 20, -3.0);
          const pipe = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 3.5, 28, 12), makeMat('pipe', style));
          pipe.rotation.z = -0.15;
          pipeG.add(pipe);
          const pipeHead = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 2.5, 6, 12), makeMat('pipeHead', style));
          pipeHead.position.set(-2, 14, 0);
          pipeG.add(pipeHead);
          meshGroup.add(pipeG);

          // Steam Piston Chamber & Exhaust Rod
          const pistonG = new THREE.Group();
          pistonG.position.set(26, 0, -3.0);
          const pCyl = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 18, 16), makeMat('piston_cyl', 'iron'));
          pistonG.add(pCyl);
          const pRod = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 22, 8), makeMat('piston_rod', style));
          pRod.position.y = 10;
          pRod.name = 'piston_rod';
          pistonG.add(pRod);
          meshGroup.add(pistonG);
          partsMap.pistonRod = pRod;

          // Interlocking gears behind the glass face
          const gearA = makeGear(32, 2.5, 1.0, makeMat('gearA', style), style);
          gearA.position.set(-14, 0, -4.5);
          gearA.name = 'gearA';
          meshGroup.add(gearA);
          partsMap.gearA = gearA;

          const gearB = makeGear(16, 2.5, 1.0, makeMat('gearB', 'iron'), 'iron');
          gearB.position.set(10, 0, -4.5);
          gearB.name = 'gearB';
          meshGroup.add(gearB);
          partsMap.gearB = gearB;

      } else if (clockType === 'orrery') {
          // --- ASTRO ORRERY ---
          
          const sun = new THREE.Mesh(new THREE.SphereGeometry(6.5, 32, 32), makeMat('sun', 'gold', true, '#ffaa00'));
          sun.position.set(0, 0, 3.5);
          sun.name = 'sun';
          meshGroup.add(sun);
          partsMap.sun = sun;

          // Earth mechanical orbiting arm
          const earthArm = new THREE.Group();
          earthArm.position.set(0, 0, 1.5);
          earthArm.name = 'earthArm';
          
          const arm1 = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 0.8), makeMat('arm1', style));
          arm1.position.x = 11;
          earthArm.add(arm1);
          
          const earth = new THREE.Mesh(new THREE.SphereGeometry(3.5, 16, 16), makeMat('earth', 'copper', true, '#00aaff'));
          earth.position.x = 22;
          earthArm.add(earth);
          meshGroup.add(earthArm);
          partsMap.earthArm = earthArm;

          // Moon arm orbiting around Earth
          const moonArm = new THREE.Group();
          moonArm.position.set(22, 0, 0.8);
          moonArm.name = 'moonArm';
          
          const arm2 = new THREE.Mesh(new THREE.BoxGeometry(7, 0.6, 0.6), makeMat('arm2', 'iron'));
          arm2.position.x = 3.5;
          moonArm.add(arm2);
          
          const moon = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), makeMat('moon', 'gold', false));
          moon.position.x = 7;
          moonArm.add(moon);
          earthArm.add(moonArm);
          partsMap.moonArm = moonArm;

          // Zodiac astrolabe ring with 12 vector stars
          const zodiac = new THREE.Mesh(new THREE.TorusGeometry(32, 1.2, 6, 48), makeMat('zodiac', style));
          zodiac.position.set(0, 0, 1.5);
          zodiac.name = 'zodiac';
          meshGroup.add(zodiac);
          partsMap.zodiacRing = zodiac;

          const starsG = new THREE.Group();
          starsG.position.set(0, 0, 1.5);
          for(let i = 0; i < 12; i++) {
              const angle = (i / 12) * Math.PI * 2;
              const star = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), makeMat('star', style, true, accentHex));
              star.position.set(Math.cos(angle) * 32, Math.sin(angle) * 32, 0.4);
              starsG.add(star);
          }
          meshGroup.add(starsG);
          partsMap.starsG = starsG;

          // COMPLETE FUNCTIONAL CLOCKWORK ORRERY HANDS
          // Spawns elegant central hands so it functions completely as a clock!
          const handH = buildSteampunkHand('hand_h', 16, style, false);
          handH.position.set(0, 0, 4.5);
          meshGroup.add(handH);
          partsMap.handH = handH;

          const handM = buildSteampunkHand('hand_m', 25, style, false);
          handM.position.set(0, 0, 5.3);
          meshGroup.add(handM);
          partsMap.handM = handM;

          const handS = buildSteampunkHand('hand_s', 29, style, true, accentHex);
          handS.position.set(0, 0, 6.1);
          meshGroup.add(handS);
          partsMap.handS = handS;

      } else if (clockType === 'alarm') {
          // --- PISTON ALARM ---

          // Real-time hour, minute, and second hands (Correctly sweeping in XY plane)
          const handH = buildSteampunkHand('hand_h', 16, style, false);
          handH.position.set(0, 0, 2.0);
          meshGroup.add(handH);
          partsMap.handH = handH;

          const handM = buildSteampunkHand('hand_m', 26, style, false);
          handM.position.set(0, 0, 2.8);
          meshGroup.add(handM);
          partsMap.handM = handM;

          const handS = buildSteampunkHand('hand_s', 30, style, true, accentHex);
          handS.position.set(0, 0, 3.6);
          meshGroup.add(handS);
          partsMap.handS = handS;

          const handAlarm = buildSteampunkHand('hand_alarm', 22, style, true, '#ef4444');
          handAlarm.position.set(0, 0, 1.2);
          meshGroup.add(handAlarm);
          partsMap.handAlarm = handAlarm;

          // Double alarm bells on top
          const bellL = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 4.5, 18), makeMat('bellL', style));
          bellL.position.set(-22, 38, -1.0);
          bellL.rotation.x = Math.PI / 2;
          meshGroup.add(bellL);

          const bellR = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 4.5, 18), makeMat('bellR', style));
          bellR.position.set(22, 38, -1.0);
          bellR.rotation.x = Math.PI / 2;
          meshGroup.add(bellR);

          // Oscillating alarm striker hammer
          const hammer = new THREE.Group();
          hammer.position.set(0, 26, -1.0);
          hammer.name = 'hammer';
          
          const stem = new THREE.Mesh(new THREE.BoxGeometry(1.2, 13, 1.2), makeMat('stem', 'iron'));
          stem.position.y = 6.5;
          hammer.add(stem);
          
          const ball = new THREE.Mesh(new THREE.SphereGeometry(2.8, 12, 12), makeMat('ball', 'copper'));
          ball.position.y = 13.0;
          hammer.add(ball);
          meshGroup.add(hammer);
          partsMap.hammer = hammer;

          // Gears spinning behind the glass face
          const gearA = makeGear(32, 2.5, 1.0, makeMat('gearA', style), style);
          gearA.position.set(-11, -8, -4.5);
          gearA.name = 'gearA';
          meshGroup.add(gearA);
          partsMap.gearA = gearA;

          const gearB = makeGear(16, 2.5, 1.0, makeMat('gearB', 'iron'), 'iron');
          gearB.position.set(11, -8, -4.5);
          gearB.name = 'gearB';
          meshGroup.add(gearB);
          partsMap.gearB = gearB;

      } else if (clockType === 'quantum') {
          // --- QUANTUM PORTAL ---
          
          // Intertwined gyroscope rings
          const ring1 = new THREE.Mesh(new THREE.TorusGeometry(32, 1.2, 8, 48), makeMat('ring1', style));
          ring1.position.set(0, 0, 1.5);
          ring1.name = 'ring1';
          meshGroup.add(ring1);
          partsMap.ring1 = ring1;

          const ring2 = new THREE.Mesh(new THREE.TorusGeometry(24, 1.0, 8, 36), makeMat('ring2', 'copper'));
          ring2.position.set(0, 0, 2.0);
          ring2.name = 'ring2';
          meshGroup.add(ring2);
          partsMap.ring2 = ring2;

          const ring3 = new THREE.Mesh(new THREE.TorusGeometry(16, 0.8, 8, 24), makeMat('ring3', 'iron'));
          ring3.position.set(0, 0, 2.5);
          ring3.name = 'ring3';
          meshGroup.add(ring3);
          partsMap.ring3 = ring3;

          // swirl of neon temporal vortex particles
          const pCount = 200;
          const pGeom = new THREE.BufferGeometry();
          const pPos = new Float32Array(pCount * 3);
          const pSpeeds = [];
          const pAngles = [];
          const pRadii = [];

          for(let i = 0; i < pCount; i++) {
              const r = 1 + Math.random() * 12;
              const theta = Math.random() * Math.PI * 2;
              pPos[i * 3] = Math.cos(theta) * r;
              pPos[i * 3 + 1] = Math.sin(theta) * r;
              pPos[i * 3 + 2] = 2.5 + (Math.random() - 0.5) * 1.5;

              pRadii.push(r);
              pAngles.push(theta);
              pSpeeds.push(0.02 + Math.random() * 0.05);
          }
          pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
          const pMat = new THREE.PointsMaterial({
              color: new THREE.Color(accentHex),
              size: 1.5,
              transparent: true,
              opacity: 0.85,
              blending: THREE.AdditiveBlending
          });
          const vortex = new THREE.Points(pGeom, pMat);
          vortex.name = 'quantum_vortex';
          meshGroup.add(vortex);
          partsMap.vortex = vortex;
          vortex.userData = { pos: pPos, radii: pRadii, angles: pAngles, speeds: pSpeeds, count: pCount };

          // Glowing neon futuristic hands
          const handH = buildSteampunkHand('hand_h', 16, style, true, accentHex);
          handH.position.set(0, 0, 3.2);
          meshGroup.add(handH);
          partsMap.handH = handH;

          const handM = buildSteampunkHand('hand_m', 26, style, true, accentHex);
          handM.position.set(0, 0, 4.0);
          meshGroup.add(handM);
          partsMap.handM = handM;

          const handS = buildSteampunkHand('hand_s', 30, style, true, accentHex);
          handS.position.set(0, 0, 4.8);
          meshGroup.add(handS);
          partsMap.handS = handS;
      } else if (clockType === 'tourbillon') {
          // --- TOURBILLON ESCAPEMENT ---
          const tourbBase = new THREE.Mesh(new THREE.CylinderGeometry(32, 32, 2, 32), makeMat('tbase', style));
          tourbBase.rotation.x = Math.PI / 2; tourbBase.position.z = 0;
          meshGroup.add(tourbBase); partsMap.tourbBase = tourbBase;

          const cage = new THREE.Mesh(new THREE.TorusGeometry(12, 1.5, 8, 24), makeMat('tcage', 'gold'));
          cage.position.set(0, 12, 2); cage.name = 'tourbCage';
          meshGroup.add(cage); partsMap.tourbCage = cage;

          const bal = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 0.5, 16), makeMat('tbal', 'brass'));
          bal.rotation.x = Math.PI / 2; bal.position.set(0, 12, 2); bal.name = 'tourbBal';
          meshGroup.add(bal); partsMap.tourbBal = bal;

          const esc = makeGear(12, 3, 0.8, makeMat('tesc', 'iron'), 'iron');
          esc.position.set(0, 12, 1.5); esc.name = 'tourbEsc';
          meshGroup.add(esc); partsMap.tourbEsc = esc;

          // Hands
          const handH = buildSteampunkHand('hand_h', 16, 'gold', false);
          handH.position.set(0, 0, 3); meshGroup.add(handH); partsMap.handH = handH;
          const handM = buildSteampunkHand('hand_m', 26, 'copper', false);
          handM.position.set(0, 0, 4); meshGroup.add(handM); partsMap.handM = handM;
          const handS = buildSteampunkHand('hand_s', 30, 'iron', false);
          handS.position.set(0, 0, 5); meshGroup.add(handS); partsMap.handS = handS;

          // Decorative gears
          for(let i=1; i<=6; i++) {
              const g = makeGear(10, 2, 1, makeMat('tg'+i, i%2?'brass':'copper'), i%2?'brass':'copper');
              g.position.set(Math.cos(i)*18, Math.sin(i)*18 - 5, 1.5);
              g.name = 'tourbG' + i;
              meshGroup.add(g); partsMap['tourbG'+i] = g;
          }
      } else if (clockType === 'neon') {
          // --- NEON LED ---
          const ring1 = new THREE.Mesh(new THREE.RingGeometry(28, 30, 64), makeMat('nr1', 'iron'));
          ring1.position.z = 1; ring1.name = 'neonRing1'; meshGroup.add(ring1); partsMap.neonRing1 = ring1;
          const ring2 = new THREE.Mesh(new THREE.RingGeometry(24, 26, 64), makeMat('nr2', 'iron'));
          ring2.position.z = 2; ring2.name = 'neonRing2'; meshGroup.add(ring2); partsMap.neonRing2 = ring2;

          const rMat1 = new THREE.MeshBasicMaterial({color: new THREE.Color(accentHex), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
          const rMat2 = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
          
          const glow1 = new THREE.Mesh(new THREE.TorusGeometry(29, 0.8, 8, 64), rMat1); glow1.position.z = 1.5; meshGroup.add(glow1);
          const glow2 = new THREE.Mesh(new THREE.TorusGeometry(25, 0.8, 8, 64), rMat2); glow2.position.z = 2.5; meshGroup.add(glow2);

          const handH = buildSteampunkHand('hand_h', 16, style, true, accentHex);
          handH.position.set(0, 0, 3.2); meshGroup.add(handH); partsMap.handH = handH;
          const handM = buildSteampunkHand('hand_m', 26, style, true, accentHex);
          handM.position.set(0, 0, 4.0); meshGroup.add(handM); partsMap.handM = handM;
          const handS = buildSteampunkHand('hand_s', 30, style, true, accentHex);
          handS.position.set(0, 0, 4.8); meshGroup.add(handS); partsMap.handS = handS;
      } else if (clockType === 'binary') {
          // --- BINARY MATRIX ---
          const base = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 2), makeMat('binbase', 'iron'));
          base.position.z = 0; meshGroup.add(base); partsMap.binBase = base;
          
          for(let c=0; c<4; c++) {
              for(let r=0; r<4; r++) {
                  const ledMat = new THREE.MeshPhongMaterial({color: 0x001400, emissive: 0x001400, emissiveIntensity: 0});
                  const led = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 1, 16), ledMat);
                  led.rotation.x = Math.PI/2;
                  led.position.set((c - 1.5) * 8, (r - 1.5) * 8, 1.5);
                  led.name = 'bin_r'+r+'_c'+c;
                  meshGroup.add(led); partsMap[led.name] = led;
              }
          }
      } else if (clockType === 'holo') {
          // --- HOLO-PROJECTOR ---
          const pBase = new THREE.Mesh(new THREE.CylinderGeometry(8, 12, 4, 16), makeMat('hbase', style));
          pBase.rotation.x = Math.PI/2;
          pBase.position.z = 2;
          meshGroup.add(pBase);
          
          const lens = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16, 0, Math.PI*2, 0, Math.PI/2), new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending}));
          lens.rotation.x = Math.PI/2;
          lens.position.z = 4;
          meshGroup.add(lens);
          
          // The projected numbers will be handled in animCb using dynamic sprites or text
          // We'll create 3 floating rings for H, M, S
          for(let i=0; i<3; i++) {
              const r = new THREE.Mesh(new THREE.TorusGeometry(15 + i*6, 0.2, 4, 32), new THREE.MeshBasicMaterial({color: accentHex, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending}));
              r.position.z = 8 + i*2;
              r.name = 'holoRing'+i;
              meshGroup.add(r); partsMap[r.name] = r;
              
              const dot = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8), new THREE.MeshBasicMaterial({color: 0xffffff}));
              dot.position.y = 15 + i*6;
              r.add(dot);
          }
      } else if (clockType === 'nixie') {
          // --- NIXIE TUBES ---
          const base = new THREE.Mesh(new THREE.BoxGeometry(36, 16, 4), makeMat('nxbase', style));
          base.position.z = 0;
          meshGroup.add(base);
          
          const nixieTex = [];
          for(let d=0; d<=9; d++) {
             const c = document.createElement('canvas'); c.width=128; c.height=256;
             const ctx = c.getContext('2d');
             ctx.fillStyle = '#ff5500'; ctx.font = 'bold 160px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
             ctx.shadowColor = '#ff5500'; ctx.shadowBlur = 20;
             ctx.fillText(d.toString(), 64, 128);
             nixieTex.push(new THREE.CanvasTexture(c));
          }
          partsMap.nixieTex = nixieTex;

          const glassMat = new THREE.MeshPhysicalMaterial({color:0xffffff, transmission:0.9, opacity:1, transparent:true, roughness:0.1});
          for(let i=0; i<6; i++) {
              // 6 tubes for HH:MM:SS
              const tube = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 10, 16), glassMat);
              tube.rotation.x = Math.PI/2;
              const xPos = (i - 2.5) * 6;
              if (i===2 || i===4) tube.position.x = xPos + 1; // gap for colons
              else tube.position.x = xPos;
              tube.position.z = 5;
              meshGroup.add(tube);
              
              // Internal glowing plane for digits
              const fil = new THREE.Mesh(new THREE.PlaneGeometry(4, 8), new THREE.MeshBasicMaterial({map: nixieTex[0], transparent:true, blending: THREE.AdditiveBlending}));
              fil.position.copy(tube.position);
              fil.position.z += 0.5; // push slightly forward so it doesn't z-fight with center
              meshGroup.add(fil);
              fil.name = 'nixieFil'+i;
              partsMap[fil.name] = fil;
          }
      } else if (clockType === 'astrolabe') {
          // --- ASTROLABE ---
          const rete = new THREE.Mesh(new THREE.TorusGeometry(32, 2, 4, 6), makeMat('rete', 'brass'));
          rete.position.z = 1.5;
          meshGroup.add(rete); partsMap.rete = rete;
          
          const tympan = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 0.5, 32), makeMat('tympan', 'copper'));
          tympan.rotation.x = Math.PI/2;
          tympan.position.z = 1;
          meshGroup.add(tympan);
          
          const handH = buildSteampunkHand('hand_h', 20, 'gold', false);
          handH.position.set(0, 0, 2); meshGroup.add(handH); partsMap.handH = handH;
          const handM = buildSteampunkHand('hand_m', 30, 'iron', false);
          handM.position.set(0, 0, 3); meshGroup.add(handM); partsMap.handM = handM;
          
          // Sun on hour hand, Moon on minute hand
          const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 8), makeMat('asun', 'gold', true, '#fbbf24'));
          sun.position.y = 15; handH.add(sun);
          const moon = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 8), makeMat('amoon', 'iron', true, '#cbd5e1'));
          moon.position.y = 25; handM.add(moon);
      }

      // Customize neon colors dynamically based on user selections
      m.clockParts.forEach(p => {
          const partMesh = partsMap[p.name];
          if (partMesh && p.colorHex) {
              const customCol = new THREE.Color(p.colorHex);
              partMesh.traverse(child => {
                  if (child.material) {
                      if (Array.isArray(child.material)) {
                          child.material.forEach(m2 => { if (m2.color) m2.color.copy(customCol); });
                      } else {
                          if (child.material.color) child.material.color.copy(customCol);
                      }
                  }
              });
          }
      });

      addSteampunkProAnimCb(m, partsMap);
      return meshGroup;
  }

  function addSteampunkProAnimCb(m, partsMap) {
      if (typeof scene === 'undefined' || !scene) return;
      const sceneCbs = scene.animCbs = scene.animCbs || [];
      m._scProAnimCb = (w) => {
          const speed = w || 1;
          const mult = (m.clockParts && m.clockParts[0] && m.clockParts[0].speedMultiplier) !== undefined ? m.clockParts[0].speedMultiplier : 1;
          
          const now = new Date();
          const ms = now.getMilliseconds();
          const sec = now.getSeconds() + ms / 1000;
          const min = now.getMinutes() + sec / 60;
          const hr = (now.getHours() % 12) + min / 60;

          const clockType = (m.clockParts && m.clockParts[0] && m.clockParts[0].clockType) || 'chrono';
          const alarmTime = (m.clockParts && m.clockParts[0] && m.clockParts[0].alarmTime) || '12:00';

          const angleS = - (sec / 60) * Math.PI * 2 * mult;
          const angleM = - (min / 60) * Math.PI * 2 * mult;
          const angleH = - (hr / 12) * Math.PI * 2 * mult;

          if (clockType === 'chrono') {
              const isRunning = (m.clockParts && m.clockParts[0] && m.clockParts[0].chronoRunning);
              const elapsed = (m.clockParts && m.clockParts[0] && m.clockParts[0].chronoElapsed) || 0;
              let currentElapsed = elapsed;
              if (isRunning) {
                  const startTime = (m.clockParts && m.clockParts[0] && m.clockParts[0].chronoStartTime) || Date.now();
                  currentElapsed = elapsed + (Date.now() - startTime);
              }
              
              const elapsedMs = currentElapsed % 1000;
              const elapsedSec = Math.floor(currentElapsed / 1000) % 60 + elapsedMs / 1000;
              const elapsedMin = Math.floor(currentElapsed / 60000) % 60 + elapsedSec / 60;

              const angleMs = - (elapsedMs / 1000) * Math.PI * 2;
              const angleSec = - (elapsedSec / 60) * Math.PI * 2;
              const angleMin = - (elapsedMin / 60) * Math.PI * 2;

              if (partsMap.handMs) partsMap.handMs.rotation.z = angleMs;
              if (partsMap.handSec) partsMap.handSec.rotation.z = angleSec;
              if (partsMap.handMin) partsMap.handMin.rotation.z = angleMin;

              // Chrono standard telling-time hands (runs behind the stopwatch hands)
              const angleH_real = - (hr / 12) * Math.PI * 2;
              const angleM_real = - (min / 60) * Math.PI * 2;
              if (partsMap.handH) partsMap.handH.rotation.z = angleH_real;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM_real;

              const gearSpin = - (elapsedSec / 10) * Math.PI * 2;
              if (partsMap.gearA) partsMap.gearA.rotation.y = gearSpin;
              if (partsMap.gearB) partsMap.gearB.rotation.y = -gearSpin * 2;

              if (partsMap.pistonRod) {
                  const pVal = Math.sin(sec * Math.PI * 3) * 4.5;
                  partsMap.pistonRod.position.y = 10 + pVal;
              }
          }

          if (clockType === 'orrery') {
              const orbitSpeed = sec * 0.05 * mult;
              if (partsMap.earthArm) partsMap.earthArm.rotation.z = orbitSpeed;
              if (partsMap.moonArm) partsMap.moonArm.rotation.z = orbitSpeed * 12;
              if (partsMap.sun) partsMap.sun.rotation.y += 0.01 * speed;
              if (partsMap.zodiacRing) partsMap.zodiacRing.rotation.z -= 0.001 * speed;

              // Animate standard hands in Orrery mode (scaled by mult)
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.handS) partsMap.handS.rotation.z = angleS;
          }

          if (clockType === 'alarm') {
              // Real-time hour, minute, second hands scaled by mult
              if (partsMap.handS) partsMap.handS.rotation.z = angleS;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;

              // Rotate alarm gears as well!
              if (partsMap.gearA) partsMap.gearA.rotation.y = angleS;
              if (partsMap.gearB) partsMap.gearB.rotation.y = -angleS * 2;

              const timeParts = alarmTime.split(':');
              const alH = parseInt(timeParts[0] || 12) % 12;
              const alM = parseInt(timeParts[1] || 0);
              const alHrVal = alH + alM / 60;
              const angleAlarm = - (alHrVal / 12) * Math.PI * 2;
              if (partsMap.handAlarm) partsMap.handAlarm.rotation.z = angleAlarm;

              const currentH = now.getHours();
              const currentM = now.getMinutes();
              const isAlarmTriggered = (currentH === parseInt(timeParts[0] || 12) && currentM === alM);
              const isTestAlarm = (m.clockParts && m.clockParts[0] && m.clockParts[0].testAlarmActive);

              if (isAlarmTriggered || isTestAlarm) {
                  if (partsMap.hammer) {
                      partsMap.hammer.rotation.z = Math.sin(Date.now() * 0.08) * 0.25;
                  }
              } else {
                  if (partsMap.hammer) partsMap.hammer.rotation.z = 0;
              }
          }

          if (clockType === 'quantum') {
              const qMult = mult;
              if (partsMap.ring1) partsMap.ring1.rotation.z += 0.01 * speed * qMult;
              if (partsMap.ring1) partsMap.ring1.rotation.x += 0.003 * speed * qMult;
              if (partsMap.ring2) partsMap.ring2.rotation.z -= 0.015 * speed * qMult;
              if (partsMap.ring2) partsMap.ring2.rotation.y += 0.002 * speed * qMult;
              if (partsMap.ring3) partsMap.ring3.rotation.z += 0.02 * speed * qMult;

              // Animate standard hands in Quantum mode (scaled by mult)
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.handS) partsMap.handS.rotation.z = angleS;

              const vortex = partsMap.vortex;
              if (vortex) {
                  const uData = vortex.userData;
                  const pos = uData.pos;
                  const count = uData.count;
                  const radii = uData.radii;
                  const angles = uData.angles;
                  const speeds = uData.speeds;

                  for(let i=0; i<count; i++) {
                      angles[i] += speeds[i] * speed * qMult;
                      const currentRadius = radii[i] + Math.sin(Date.now()*0.002 + i)*0.5;
                      pos[i*3] = Math.cos(angles[i]) * currentRadius;
                      pos[i*3+1] = Math.sin(angles[i]) * currentRadius;
                  }
                  vortex.geometry.attributes.position.needsUpdate = true;
              }
          }

          // Iris Blades Animation
          if (partsMap.irisBlades) {
              const isOpen = (m.clockParts && m.clockParts[0] && m.clockParts[0].irisOpen);
              // Calculate target based on state
              const targetZ = isOpen ? 0.05 : -0.2; // Slide down slightly when closing
              const targetScaleX = isOpen ? 0.2 : 1.0;
              
              partsMap.irisBlades.forEach((blade, i) => {
                  // Smoothly interpolate scale and rotation/position
                  blade.scale.x += (targetScaleX - blade.scale.x) * 0.1;
                  
                  // if closed, we can angle them slightly inwards to overlap nicely
                  const targetRotX = isOpen ? Math.PI/2 : Math.PI/2 + 0.1;
                  blade.rotation.x += (targetRotX - blade.rotation.x) * 0.1;

                  // move towards center when closing
                  const cx = blade.userData.homeX;
                  const cy = blade.userData.homeY;
                  const tX = isOpen ? cx : cx * 0.3;
                  const tY = isOpen ? cy : cy * 0.3;
                  
                  blade.position.x += (tX - blade.position.x) * 0.1;
                  blade.position.y += (tY - blade.position.y) * 0.1;
              });
          }
          
          if (clockType === 'tourbillon') {
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.handS) partsMap.handS.rotation.z = angleS;
              if (partsMap.tourbCage) partsMap.tourbCage.rotation.z += 0.007 * mult * speed;
              if (partsMap.tourbEsc) partsMap.tourbEsc.rotation.y += 0.045 * mult * speed;
              if (partsMap.tourbBal) partsMap.tourbBal.rotation.z = Math.sin(Date.now() * 0.012) * 0.7;
              for (let i = 1; i <= 6; i++) {
                  const g = partsMap['tourbG'+i];
                  if (g) g.rotation.y = (i%2===0?1:-1) * (angleS + i * 0.5) * mult;
              }
          }

          if (clockType === 'neon') {
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.handS) partsMap.handS.rotation.z = angleS;
              if (partsMap.neonRing1) partsMap.neonRing1.rotation.z += 0.002 * mult * speed;
              if (partsMap.neonRing2) partsMap.neonRing2.rotation.z -= 0.003 * mult * speed;
          }

          if (clockType === 'binary') {
              const h2 = now.getHours(), mn2 = now.getMinutes();
              const cols = [Math.floor(h2/10), h2%10, Math.floor(mn2/10), mn2%10];
              const glow = 2.5 + Math.sin(Date.now()*0.004)*0.4;
              for (let c = 0; c < 4; c++) {
                  for (let r = 0; r < 4; r++) {
                      const led = partsMap['bin_r'+r+'_c'+c];
                      if (!led || !led.material) continue;
                      const bit = (cols[c] >> r) & 1;
                      led.material.emissiveIntensity = bit ? glow : 0.05;
                      if (led.material.color) led.material.color.setHex(bit ? 0x00ff44 : 0x001400);
                      if (led.material.emissive) led.material.emissive.setHex(bit ? 0x00ff44 : 0x001400);
                  }
              }
          }

          if (clockType === 'holo') {
              if (partsMap.holoRing0) partsMap.holoRing0.rotation.z = angleH;
              if (partsMap.holoRing1) partsMap.holoRing1.rotation.z = angleM;
              if (partsMap.holoRing2) partsMap.holoRing2.rotation.z = angleS;
          }
          
          if (clockType === 'nixie') {
              const hStr = String(now.getHours()).padStart(2,'0');
              const mStr = String(now.getMinutes()).padStart(2,'0');
              const sStr = String(Math.floor(sec)).padStart(2,'0');
              const timeStr = hStr + mStr + sStr;
              for(let i=0; i<6; i++) {
                  const fil = partsMap['nixieFil'+i];
                  if (fil && partsMap.nixieTex) {
                      const digit = parseInt(timeStr[i]);
                      fil.material.map = partsMap.nixieTex[digit];
                      fil.material.needsUpdate = true;
                      fil.material.opacity = 0.7 + Math.random()*0.3;
                  }
              }
          }

          if (clockType === 'astrolabe') {
              if (partsMap.handH) partsMap.handH.rotation.z = angleH;
              if (partsMap.handM) partsMap.handM.rotation.z = angleM;
              if (partsMap.rete) partsMap.rete.rotation.z += 0.001 * mult * speed;
          }
      };
      scene.animCbs = sceneCbs.filter(cb => cb._modelId !== m.id);
      m._scProAnimCb._modelId = m.id;
      scene.animCbs.push(m._scProAnimCb);
  }

  function createProceduralDialTexture(type, baseColorHex) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = baseColorHex || '#0a0f1d';
      ctx.fillRect(0, 0, 512, 512);

      if (type === 'carbon') {
          ctx.fillStyle = '#050505';
          for (let y = 0; y < 512; y += 8) {
              for (let x = 0; x < 512; x += 8) {
                  if ((x + y) % 16 === 0) {
                      ctx.fillRect(x, y, 8, 8);
                  }
              }
          }
          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          for (let i = -512; i < 512; i += 8) {
              ctx.moveTo(i, 0);
              ctx.lineTo(i + 512, 512);
          }
          ctx.stroke();
      } else if (type === 'sunburst') {
          ctx.translate(256, 256);
          for (let i = 0; i < 360; i += 0.5) {
              const rad = (i * Math.PI) / 180;
              ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.abs(Math.sin(rad * 4)) * 0.05})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(Math.cos(rad) * 256, Math.sin(rad) * 256);
              ctx.stroke();
          }
          ctx.translate(-256, -256);
      } else if (type === 'marble') {
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(0, 0, 512, 512);
          ctx.strokeStyle = 'rgba(100,116,139,0.2)';
          ctx.lineWidth = 2.0;
          for (let i = 0; i < 6; i++) {
              ctx.beginPath();
              let cx = Math.random() * 512;
              let cy = 0;
              ctx.moveTo(cx, cy);
              while (cy < 512) {
                  cx += -8 + Math.random() * 16;
                  cy += 5 + Math.random() * 15;
                  ctx.lineTo(cx, cy);
              }
              ctx.stroke();
          }
      } else if (type === 'wood') {
          ctx.fillStyle = '#5c4033';
          ctx.fillRect(0, 0, 512, 512);
          ctx.strokeStyle = '#3d2b1f';
          ctx.lineWidth = 3.0;
          ctx.translate(256, 256);
          for (let r = 10; r < 360; r += 12) {
              ctx.beginPath();
              for (let a = 0; a <= 360; a += 5) {
                  const rad = (a * Math.PI) / 180;
                  const wave = Math.sin(rad * 4) * 5 + Math.cos(rad * 8) * 2;
                  const px = Math.cos(rad) * (r + wave);
                  const py = Math.sin(rad) * (r + wave);
                  if (a === 0) ctx.moveTo(px, py);
                  else ctx.lineTo(px, py);
              }
              ctx.stroke();
          }
          ctx.translate(-256, -256);
      } else if (type === 'sidef') {
          ctx.fillStyle = '#f3f4f6';
          ctx.fillRect(0, 0, 512, 512);
          const colors = [
              'rgba(244,63,94,0.15)',
              'rgba(56,189,248,0.15)',
              'rgba(168,85,247,0.12)',
              'rgba(52,211,153,0.10)'
          ];
          ctx.translate(256, 256);
          colors.forEach((col, idx) => {
              const grad = ctx.createRadialGradient(
                  -100 + Math.sin(idx) * 100, 
                  -100 + Math.cos(idx) * 100, 
                  10, 0, 0, 250
              );
              grad.addColorStop(0, col);
              grad.addColorStop(1, 'rgba(255,255,255,0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(0, 0, 256, 0, Math.PI * 2);
              ctx.fill();
          });
          ctx.translate(-256, -256);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
  }

  function buildClockUltraGeo(m) {
      const meshGroup = new THREE.Group();
      if (!m.clockParts || !m.clockParts.length) return meshGroup;
      const p0 = m.clockParts[0];

      const shape = p0.faceShape || 'circle';
      const isExtruded = (shape === 'custom' || shape === 'silhouette');
      const faceFrontZ = isExtruded ? 0.6 : -0.2;
      const markerZ = faceFrontZ + 0.4;

      const handsGroup = new THREE.Group();
      handsGroup.name = 'handsGroup';
      handsGroup.position.set(p0.pivotX || 0, p0.pivotY || 0, 0.5); 
      meshGroup.add(handsGroup);

      function makeMetalMat(style) {
          const C = {
              gold: { color: 0xffd700, metalness: 0.98, roughness: 0.10 },
              brass: { color: 0xd4af37, metalness: 0.95, roughness: 0.15 },
              copper: { color: 0xc87533, metalness: 0.90, roughness: 0.25 },
              steel: { color: 0xa0a0a0, metalness: 0.90, roughness: 0.20 }
          };
          const s = C[style] || C.steel;
          return new THREE.MeshPhysicalMaterial({
              color: s.color,
              metalness: s.metalness,
              roughness: s.roughness,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1,
              side: THREE.DoubleSide
          });
      }

      const mStyle = p0.metalStyle || 'steel';
      const bezelMat = makeMetalMat(mStyle);
      
      const faceColorHex = p0.faceColor || '#0a0f1d';
      const faceMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(faceColorHex),
          roughness: 0.4,
          metalness: 0.1,
          side: THREE.DoubleSide
      });

      let faceMesh;
      let bezelMesh;

      // Resolve custom outline hull if shape is 'custom' or markers/glass need it
      let customHull = null;
      if (p0.customOutlinePoints && p0.customOutlinePoints.length > 0) {
          customHull = p0.customOutlinePoints;
      } else if (p0.dxfText || p0.dxfData) {
          try {
              let textContent = p0.dxfText;
              if (!textContent && p0.dxfData) {
                  textContent = decodeURIComponent(escape(atob(p0.dxfData)));
              }
              if (textContent && window.DxfParser) {
                  const parser = new window.DxfParser();
                  const dxf = parser.parseSync(textContent);
                  if (dxf && dxf.entities) {
                      const allPts = [];
                      function collectPts(entities, offsetX = 0, offsetY = 0, sx = 1, sy = 1) {
                          entities.forEach(e => {
                              if (e.type === 'INSERT') {
                                  const block = dxf.blocks[e.name];
                                  if (block && block.entities) {
                                      const bx = (e.position ? e.position.x : 0) + offsetX;
                                      const by = (e.position ? e.position.y : 0) + offsetY;
                                      const sxx = (e.scale ? e.scale.x : 1) * sx;
                                      const syy = (e.scale ? e.scale.y : 1) * sy;
                                      collectPts(block.entities, bx, by, sxx, syy);
                                  }
                              } else if (e.type === 'CIRCLE') {
                                  const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                  for (let i = 0; i < 32; i++) allPts.push({ x: cx + Math.cos(i / 32 * Math.PI * 2) * r, y: cy + Math.sin(i / 32 * Math.PI * 2) * r });
                              } else if (e.type === 'ARC') {
                                  const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                  let sa = e.startAngle, ea = e.endAngle;
                                  if (ea < sa) ea += Math.PI * 2;
                                  const steps = Math.max(8, Math.ceil((ea - sa) / 0.1));
                                  for (let i = 0; i <= steps; i++) {
                                      const a = sa + (ea - sa) * (i / steps);
                                      allPts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
                                  }
                              } else if (e.type === 'SPLINE' && e.controlPoints) {
                                  e.controlPoints.forEach(pt => allPts.push({ x: pt.x * sx + offsetX, y: pt.y * sy + offsetY }));
                              } else if (e.vertices) {
                                  e.vertices.forEach(pt => allPts.push({ x: pt.x * sx + offsetX, y: pt.y * sy + offsetY }));
                              }
                          });
                      }
                      collectPts(dxf.entities);
                      if (allPts.length > 0) {
                          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                          allPts.forEach(p => {
                              if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                              if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
                          });
                          const dx = maxX - minX, dy = maxY - minY;
                          const dxfCenter = { x: minX + dx / 2, y: minY + dy / 2 };
                          const maxDim = Math.max(dx, dy) || 1;
                          const finalScale = 60 / maxDim;
                          
                          const scaledPts = allPts.map(p => ({
                              x: (p.x - dxfCenter.x) * finalScale,
                              y: (p.y - dxfCenter.y) * finalScale
                          }));
                          customHull = getConvexHull(scaledPts);
                      }
                  }
              }
          } catch(err) {
              console.error("Error generating custom DXF hull:", err);
          }
      }

      if (!customHull) {
          customHull = [];
          for (let i = 0; i < 32; i++) {
              const a = (i / 32) * Math.PI * 2;
              customHull.push({ x: Math.sin(a) * 36, y: Math.cos(a) * 36 });
          }
      }

      // Resolve exact silhouette contour if shape is 'silhouette'
      let silhouetteHull = null;
      if (shape === 'silhouette') {
          if (p0.customSilhouettePoints && p0.customSilhouettePoints.length > 0) {
              silhouetteHull = p0.customSilhouettePoints;
          } else if (p0.dxfText || p0.dxfData) {
              try {
                  let textContent = p0.dxfText;
                  if (!textContent && p0.dxfData) {
                      textContent = decodeURIComponent(escape(atob(p0.dxfData)));
                  }
                  if (textContent && window.DxfParser) {
                      const parser = new window.DxfParser();
                      const dxf = parser.parseSync(textContent);
                      if (dxf && dxf.entities) {
                          const allSegments = [];
                          function parseEntities(entities, offsetX = 0, offsetY = 0, sx = 1, sy = 1) {
                              entities.forEach(e => {
                                  if (e.type === 'INSERT') {
                                      const block = dxf.blocks[e.name];
                                      if (block && block.entities) {
                                          const bx = (e.position ? e.position.x : 0) + offsetX;
                                          const by = (e.position ? e.position.y : 0) + offsetY;
                                          const sxx = (e.scale ? e.scale.x : 1) * sx;
                                          const syy = (e.scale ? e.scale.y : 1) * sy;
                                          parseEntities(block.entities, bx, by, sxx, syy);
                                      }
                                  } else if (e.type === 'CIRCLE') {
                                      const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                      const pts = [];
                                      for (let i = 0; i <= 32; i++) pts.push({ x: cx + Math.cos(i / 32 * Math.PI * 2) * r, y: cy + Math.sin(i / 32 * Math.PI * 2) * r });
                                      for (let i = 0; i < 32; i++) allSegments.push({ p1: pts[i], p2: pts[i + 1] });
                                  } else if (e.type === 'ARC') {
                                      const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                      let sa = e.startAngle, ea = e.endAngle;
                                      if (ea < sa) ea += Math.PI * 2;
                                      const pts = [];
                                      const steps = Math.max(8, Math.ceil((ea - sa) / 0.1));
                                      for (let i = 0; i <= steps; i++) {
                                          const a = sa + (ea - sa) * (i / steps);
                                          pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
                                      }
                                      for (let i = 0; i < steps; i++) allSegments.push({ p1: pts[i], p2: pts[i + 1] });
                                  } else if (e.type === 'SPLINE' && e.controlPoints && e.controlPoints.length > 0) {
                                      for (let i = 0; i < e.controlPoints.length - 1; i++) {
                                          allSegments.push({ p1: { x: e.controlPoints[i].x * sx + offsetX, y: e.controlPoints[i].y * sy + offsetY }, p2: { x: e.controlPoints[i + 1].x * sx + offsetX, y: e.controlPoints[i + 1].y * sy + offsetY } });
                                      }
                                      if ((e.shape || e.closed) && e.controlPoints.length > 2) {
                                          allSegments.push({ p1: { x: e.controlPoints[e.controlPoints.length - 1].x * sx + offsetX, y: e.controlPoints[e.controlPoints.length - 1].y * sy + offsetY }, p2: { x: e.controlPoints[0].x * sx + offsetX, y: e.controlPoints[0].y * sy + offsetY } });
                                      }
                                  } else if (e.vertices && e.vertices.length > 0) {
                                      for (let i = 0; i < e.vertices.length - 1; i++) {
                                          allSegments.push({ p1: { x: e.vertices[i].x * sx + offsetX, y: e.vertices[i].y * sy + offsetY }, p2: { x: e.vertices[i + 1].x * sx + offsetX, y: e.vertices[i + 1].y * sy + offsetY } });
                                      }
                                      if ((e.shape || e.closed) && e.vertices.length > 2) {
                                          allSegments.push({ p1: { x: e.vertices[e.vertices.length - 1].x * sx + offsetX, y: e.vertices[e.vertices.length - 1].y * sy + offsetY }, p2: { x: e.vertices[0].x * sx + offsetX, y: e.vertices[0].y * sy + offsetY } });
                                      }
                                  } else if (e.type === 'LINE') {
                                      allSegments.push({ p1: { x: e.vertices[0].x * sx + offsetX, y: e.vertices[0].y * sy + offsetY }, p2: { x: e.vertices[1].x * sx + offsetX, y: e.vertices[1].y * sy + offsetY } });
                                  }
                              });
                          }
                          parseEntities(dxf.entities);

                          if (allSegments.length > 0) {
                              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                              allSegments.forEach(s => {
                                  [s.p1, s.p2].forEach(p => {
                                      if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                                      if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
                                  });
                              });
                              const dx = maxX - minX;
                              const dy = maxY - minY;
                              const dxfCenter = { x: minX + dx / 2, y: minY + dy / 2 };
                              const maxDim = Math.max(dx, dy) || 1;
                              const finalScale = 60 / maxDim;

                              const scaledSegments = allSegments.map(s => ({
                                  p1: {
                                      x: (s.p1.x - dxfCenter.x) * finalScale,
                                      y: (s.p1.y - dxfCenter.y) * finalScale
                                  },
                                  p2: {
                                      x: (s.p2.x - dxfCenter.x) * finalScale,
                                      y: (s.p2.y - dxfCenter.y) * finalScale
                                  }
                              }));
                              
                              silhouetteHull = getDxfSilhouette(scaledSegments);
                          }
                      }
                  }
              } catch (err) {
                  console.error("Error generating DXF silhouette:", err);
              }
          }
      }

      if (shape === 'circle') {
          faceMesh = new THREE.Mesh(new THREE.CircleGeometry(36, 64), faceMat);
          bezelMesh = new THREE.Mesh(new THREE.TorusGeometry(36, 1.8, 12, 64), bezelMat);
      } else if (shape === 'square') {
          faceMesh = new THREE.Mesh(new THREE.PlaneGeometry(72, 72), faceMat);
          bezelMesh = new THREE.Group();
          const borderW = 72;
          const borderT = 1.8;
          const topBorder = new THREE.Mesh(new THREE.BoxGeometry(borderW + borderT*2, borderT*2, borderT*2), bezelMat);
          topBorder.position.y = 36 + borderT/2;
          const bottomBorder = topBorder.clone();
          bottomBorder.position.y = -36 - borderT/2;
          const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(borderT*2, borderW, borderT*2), bezelMat);
          leftBorder.position.x = -36 - borderT/2;
          const rightBorder = leftBorder.clone();
          rightBorder.position.x = 36 + borderT/2;
          bezelMesh.add(topBorder, bottomBorder, leftBorder, rightBorder);
      } else if (shape === 'custom' && customHull) {
          const outerShape = new THREE.Shape();
          outerShape.moveTo(customHull[0].x, customHull[0].y);
          for(let i=1; i<customHull.length; i++) {
              outerShape.lineTo(customHull[i].x, customHull[i].y);
          }
          outerShape.closePath();
          
          const innerHole = new THREE.Path();
          const scaleFactor = 0.95; // 5% border width
          innerHole.moveTo(customHull[0].x * scaleFactor, customHull[0].y * scaleFactor);
          for(let i=1; i<customHull.length; i++) {
              innerHole.lineTo(customHull[i].x * scaleFactor, customHull[i].y * scaleFactor);
          }
          innerHole.closePath();
          outerShape.holes.push(innerHole);
          
          const extrudeSettings = {
              depth: 2,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.5,
              bevelThickness: 0.5
          };
          bezelMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(outerShape, extrudeSettings), bezelMat);
          
          const faceShapeGeo = new THREE.Shape();
          faceShapeGeo.moveTo(customHull[0].x, customHull[0].y);
          for(let i=1; i<customHull.length; i++) {
              faceShapeGeo.lineTo(customHull[i].x, customHull[i].y);
          }
          faceShapeGeo.closePath();
          faceMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(faceShapeGeo, { depth: 0.8, bevelEnabled: false }), faceMat);
      } else if (shape === 'silhouette' && silhouetteHull && silhouetteHull.length > 0) {
          const outerShape = new THREE.Shape();
          outerShape.moveTo(silhouetteHull[0].x, silhouetteHull[0].y);
          for (let i = 1; i < silhouetteHull.length; i++) {
              outerShape.lineTo(silhouetteHull[i].x, silhouetteHull[i].y);
          }
          outerShape.closePath();
          
          const innerHole = new THREE.Path();
          const scaleFactor = 0.95; // 5% border width
          innerHole.moveTo(silhouetteHull[0].x * scaleFactor, silhouetteHull[0].y * scaleFactor);
          for (let i = 1; i < silhouetteHull.length; i++) {
              innerHole.lineTo(silhouetteHull[i].x * scaleFactor, silhouetteHull[i].y * scaleFactor);
          }
          innerHole.closePath();
          outerShape.holes.push(innerHole);
          
          const extrudeSettings = {
              depth: 2,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.5,
              bevelThickness: 0.5
          };
          bezelMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(outerShape, extrudeSettings), bezelMat);
          
          const faceShapeGeo = new THREE.Shape();
          faceShapeGeo.moveTo(silhouetteHull[0].x, silhouetteHull[0].y);
          for (let i = 1; i < silhouetteHull.length; i++) {
              faceShapeGeo.lineTo(silhouetteHull[i].x, silhouetteHull[i].y);
          }
          faceShapeGeo.closePath();
          faceMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(faceShapeGeo, { depth: 0.8, bevelEnabled: false }), faceMat);
      }

      if (faceMesh) {
          faceMesh.position.z = -0.2;
          faceMesh.name = 'faceMesh';
          if (p0.dialTexturePreset && p0.dialTexturePreset !== 'none') {
              faceMesh.material = faceMesh.material.clone();
              faceMesh.material.map = createProceduralDialTexture(p0.dialTexturePreset, faceColorHex);
              faceMesh.material.needsUpdate = true;
          }
          meshGroup.add(faceMesh);
      }
      if (bezelMesh && mStyle !== 'none') {
          bezelMesh.position.z = 0.5;
          meshGroup.add(bezelMesh);
      }

      // Ambient Backlight Glow
      if (p0.glowEnabled) {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          const colorStr = p0.glowColor || '#6366f1';
          let r = 99, g = 102, b = 241;
          if (colorStr.startsWith('#')) {
              const hex = colorStr.replace('#', '');
              r = parseInt(hex.substring(0, 2), 16);
              g = parseInt(hex.substring(2, 4), 16);
              b = parseInt(hex.substring(4, 6), 16);
          }
          const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.85)`);
          grad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, 0.6)`);
          grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, 0.25)`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 256, 256);
          const glowTex = new THREE.CanvasTexture(canvas);
          const glowGeo = new THREE.PlaneGeometry(120, 120);
          const glowMat = new THREE.MeshBasicMaterial({
              map: glowTex,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              side: THREE.DoubleSide
          });
          const glowMesh = new THREE.Mesh(glowGeo, glowMat);
          glowMesh.position.z = -1.5;
          glowMesh.name = 'backlightGlow';
          meshGroup.add(glowMesh);
      }

      if (p0.customLogo) {
          const tex = new THREE.TextureLoader().load(p0.customLogo);
          tex.encoding = THREE.sRGBEncoding;
          tex.center.set(0.5, 0.5);
          const logoMat = new THREE.MeshBasicMaterial({
              map: tex,
              transparent: true,
              side: THREE.DoubleSide,
              color: new THREE.Color(p0.modelColor || '#ffffff')
          });
          let logoMesh;
          if (shape === 'circle') {
              logoMesh = new THREE.Mesh(new THREE.CircleGeometry(35.5, 64), logoMat);
          } else {
              logoMesh = new THREE.Mesh(new THREE.PlaneGeometry(71, 71), logoMat);
          }
          logoMesh.position.z = faceFrontZ + 0.05;
          meshGroup.add(logoMesh);
      }

      if (p0.dxfText || p0.dxfData) {
          try {
              let textContent = p0.dxfText;
              if (!textContent && p0.dxfData) {
                  textContent = decodeURIComponent(escape(atob(p0.dxfData)));
              }
              if (textContent && window.DxfParser) {
                  const parser = new window.DxfParser();
                  const dxf = parser.parseSync(textContent);
                  if (dxf && dxf.entities) {
                      const allSegments = [];
                      
                      function parseEntities(entities, offsetX = 0, offsetY = 0, sx = 1, sy = 1) {
                          entities.forEach(e => {
                              if (e.type === 'INSERT') {
                                  const block = dxf.blocks[e.name];
                                  if (block && block.entities) {
                                      const bx = (e.position ? e.position.x : 0) + offsetX;
                                      const by = (e.position ? e.position.y : 0) + offsetY;
                                      const sxx = (e.scale ? e.scale.x : 1) * sx;
                                      const syy = (e.scale ? e.scale.y : 1) * sy;
                                      parseEntities(block.entities, bx, by, sxx, syy);
                                  }
                              } else if (e.type === 'CIRCLE') {
                                  const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                  const pts = [];
                                  for (let i = 0; i <= 32; i++) pts.push({ x: cx + Math.cos(i / 32 * Math.PI * 2) * r, y: cy + Math.sin(i / 32 * Math.PI * 2) * r });
                                  for (let i = 0; i < 32; i++) allSegments.push({ p1: pts[i], p2: pts[i + 1] });
                              } else if (e.type === 'ARC') {
                                  const cx = e.center.x * sx + offsetX, cy = e.center.y * sy + offsetY, r = e.radius * sx;
                                  let sa = e.startAngle, ea = e.endAngle;
                                  if (ea < sa) ea += Math.PI * 2;
                                  const pts = [];
                                  const steps = Math.max(8, Math.ceil((ea - sa) / 0.1));
                                  for (let i = 0; i <= steps; i++) {
                                      const a = sa + (ea - sa) * (i / steps);
                                      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
                                  }
                                  for (let i = 0; i < steps; i++) allSegments.push({ p1: pts[i], p2: pts[i + 1] });
                              } else if (e.type === 'SPLINE' && e.controlPoints && e.controlPoints.length > 0) {
                                  for (let i = 0; i < e.controlPoints.length - 1; i++) {
                                      allSegments.push({ p1: { x: e.controlPoints[i].x * sx + offsetX, y: e.controlPoints[i].y * sy + offsetY }, p2: { x: e.controlPoints[i + 1].x * sx + offsetX, y: e.controlPoints[i + 1].y * sy + offsetY } });
                                  }
                                  if ((e.shape || e.closed) && e.controlPoints.length > 2) {
                                      allSegments.push({ p1: { x: e.controlPoints[e.controlPoints.length - 1].x * sx + offsetX, y: e.controlPoints[e.controlPoints.length - 1].y * sy + offsetY }, p2: { x: e.controlPoints[0].x * sx + offsetX, y: e.controlPoints[0].y * sy + offsetY } });
                                  }
                              } else if (e.vertices && e.vertices.length > 0) {
                                  for (let i = 0; i < e.vertices.length - 1; i++) {
                                      allSegments.push({ p1: { x: e.vertices[i].x * sx + offsetX, y: e.vertices[i].y * sy + offsetY }, p2: { x: e.vertices[i + 1].x * sx + offsetX, y: e.vertices[i + 1].y * sy + offsetY } });
                                  }
                                  if ((e.shape || e.closed) && e.vertices.length > 2) {
                                      allSegments.push({ p1: { x: e.vertices[e.vertices.length - 1].x * sx + offsetX, y: e.vertices[e.vertices.length - 1].y * sy + offsetY }, p2: { x: e.vertices[0].x * sx + offsetX, y: e.vertices[0].y * sy + offsetY } });
                                  }
                              } else if (e.type === 'LINE') {
                                  allSegments.push({ p1: { x: e.vertices[0].x * sx + offsetX, y: e.vertices[0].y * sy + offsetY }, p2: { x: e.vertices[1].x * sx + offsetX, y: e.vertices[1].y * sy + offsetY } });
                              }
                          });
                      }
                      parseEntities(dxf.entities);

                      if (allSegments.length > 0) {
                          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                          allSegments.forEach(s => {
                              [s.p1, s.p2].forEach(p => {
                                  if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                                  if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
                              });
                          });
                          const dx = maxX - minX;
                          const dy = maxY - minY;
                          const dxfCenter = { x: minX + dx / 2, y: minY + dy / 2 };
                          const maxDim = Math.max(dx, dy) || 1;
                          const finalScale = 60 / maxDim;

                          const dxfMat = new THREE.MeshStandardMaterial({
                              color: new THREE.Color(p0.modelColor || p0.markerColor || '#06b6d4'),
                              roughness: 0.3,
                              metalness: 0.8,
                              side: THREE.DoubleSide
                          });

                          const dxfGroup = new THREE.Group();
                          dxfGroup.name = 'dxfGroup';
                          dxfGroup.position.z = faceFrontZ + 0.05;

                          allSegments.forEach(s => {
                              const x1 = (s.p1.x - dxfCenter.x) * finalScale;
                              const y1 = (s.p1.y - dxfCenter.y) * finalScale;
                              const x2 = (s.p2.x - dxfCenter.x) * finalScale;
                              const y2 = (s.p2.y - dxfCenter.y) * finalScale;
                              
                              const length = Math.hypot(x2 - x1, y2 - y1);
                              if (length < 0.01) return;
                              const angle = Math.atan2(y2 - y1, x2 - x1);

                              const bar = new THREE.Mesh(new THREE.BoxGeometry(length, 0.4, 0.8), dxfMat);
                              bar.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.1);
                              bar.rotation.z = angle;
                              dxfGroup.add(bar);
                          });
                          meshGroup.add(dxfGroup);
                      }
                  }
              }
          } catch (e) {
              console.error("DXF render error:", e);
          }
      }

      // Neon Silhouette Edge Outline
      if (p0.neonBorderEnabled) {
          let neonPts = [];
          if (shape === 'silhouette' && silhouetteHull && silhouetteHull.length > 0) {
              silhouetteHull.forEach(p => neonPts.push(new THREE.Vector3(p.x, p.y, 0)));
              neonPts.push(new THREE.Vector3(silhouetteHull[0].x, silhouetteHull[0].y, 0));
          } else if (shape === 'custom' && customHull && customHull.length > 0) {
              customHull.forEach(p => neonPts.push(new THREE.Vector3(p.x, p.y, 0)));
              neonPts.push(new THREE.Vector3(customHull[0].x, customHull[0].y, 0));
          } else if (shape === 'circle') {
              for (let i = 0; i <= 64; i++) {
                  const a = (i / 64) * Math.PI * 2;
                  neonPts.push(new THREE.Vector3(Math.cos(a) * 36, Math.sin(a) * 36, 0));
              }
          } else if (shape === 'square') {
              const half = 36;
              neonPts = [
                  new THREE.Vector3(-half, -half, 0),
                  new THREE.Vector3(half, -half, 0),
                  new THREE.Vector3(half, half, 0),
                  new THREE.Vector3(-half, half, 0),
                  new THREE.Vector3(-half, -half, 0)
              ];
          }
          
          if (neonPts.length > 0) {
              const neonCurve = new THREE.CatmullRomCurve3(neonPts);
              const neonGeo = new THREE.TubeGeometry(neonCurve, neonPts.length * 2, 0.8, 8, true);
              const neonColorHex = p0.neonBorderColor || '#06b6d4';
              const neonMat = new THREE.MeshStandardMaterial({
                  color: 0x000000,
                  emissive: new THREE.Color(neonColorHex),
                  emissiveIntensity: 1.5,
                  roughness: 0.2,
                  metalness: 0.1,
                  side: THREE.DoubleSide
              });
              const neonBorderMesh = new THREE.Mesh(neonGeo, neonMat);
              neonBorderMesh.name = 'neonBorder';
              neonBorderMesh.position.z = 0.6;
              meshGroup.add(neonBorderMesh);
          }
      }

      // Skeletal mechanical gears helper
      function buildGear(radius, toothCount, thickness, material) {
          const gearGroup = new THREE.Group();
          const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.3, radius * 0.3, thickness, 16), material);
          hub.rotation.x = Math.PI / 2;
          gearGroup.add(hub);
          
          const rim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.85, radius * 0.1, 8, 32), material);
          gearGroup.add(rim);

          const spokeGeom = new THREE.BoxGeometry(radius * 1.7, radius * 0.15, thickness * 0.8);
          for (let i = 0; i < 3; i++) {
              const spoke = new THREE.Mesh(spokeGeom, material);
              spoke.rotation.z = (i / 3) * Math.PI;
              gearGroup.add(spoke);
          }

          const toothW = radius * 0.18;
          const toothH = radius * 0.25;
          const toothGeom = new THREE.BoxGeometry(toothW, toothH, thickness);
          for (let i = 0; i < toothCount; i++) {
              const angle = (i / toothCount) * Math.PI * 2;
              const tooth = new THREE.Mesh(toothGeom, material);
              tooth.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
              tooth.rotation.z = angle + Math.PI / 2;
              gearGroup.add(tooth);
          }
          return gearGroup;
      }

      if (p0.gearsEnabled) {
          const gearsGroup = new THREE.Group();
          gearsGroup.name = 'gearsGroup';
          gearsGroup.position.set(p0.pivotX || 0, p0.pivotY || 0, faceFrontZ + 0.4);

          const brassMat = makeMetalMat('brass');
          const steelMat = makeMetalMat('steel');
          const copperMat = makeMetalMat('copper');

          const gearH = buildGear(7, 12, 1.2, brassMat);
          gearH.name = 'gear_h';
          gearsGroup.add(gearH);

          const gearM = buildGear(8, 16, 1.0, steelMat);
          gearM.name = 'gear_m';
          gearM.position.set(15, 0, 0);
          gearsGroup.add(gearM);

          const gearS = buildGear(7, 14, 0.8, copperMat);
          gearS.name = 'gear_s';
          gearS.position.set(7.5, 13, 0);
          gearsGroup.add(gearS);

          meshGroup.add(gearsGroup);
      }

      const mStyleOpt = p0.markerStyle || 'lines';
      if (mStyleOpt !== 'none') {
          const mColor = new THREE.Color(p0.markerColor || '#06b6d4');
          const mSizeVal = p0.markerSize !== undefined ? p0.markerSize : 1.0;
          const mRadius = p0.markerRadius !== undefined ? p0.markerRadius : 30;
          const markerMat = new THREE.MeshStandardMaterial({
              color: mColor,
              roughness: 0.3,
              metalness: 0.7,
              side: THREE.DoubleSide
          });

          if (mStyleOpt === 'lines') {
              const geomMajor = new THREE.BoxGeometry(0.8 * mSizeVal, 3.5 * mSizeVal, 0.8);
              const geomMinor = new THREE.BoxGeometry(0.4 * mSizeVal, 1.8 * mSizeVal, 0.6);
              for (let i = 0; i < 60; i++) {
                  const isMajor = (i % 5 === 0);
                  const ang = (i / 60) * Math.PI * 2;
                  const marker = new THREE.Mesh(isMajor ? geomMajor : geomMinor, markerMat);
                  
                  if ((shape === 'custom' && customHull) || (shape === 'silhouette' && silhouetteHull)) {
                      const activeHull = (shape === 'silhouette') ? silhouetteHull : customHull;
                      const intersect = getRayHullIntersection(ang, activeHull);
                      if (intersect) {
                          const factor = 0.92;
                          marker.position.set(intersect.x * factor, intersect.y * factor, markerZ);
                          const normAngle = Math.atan2(intersect.edgeNormal.y, intersect.edgeNormal.x);
                          marker.rotation.z = normAngle - Math.PI / 2;
                      } else {
                          marker.position.set(Math.cos(ang) * mRadius, Math.sin(ang) * mRadius, markerZ);
                          marker.rotation.z = ang - Math.PI / 2;
                      }
                  } else {
                      marker.position.set(Math.cos(ang) * mRadius, Math.sin(ang) * mRadius, markerZ);
                      marker.rotation.z = ang - Math.PI / 2;
                  }
                  meshGroup.add(marker);
              }
          } else if (mStyleOpt === 'dots') {
              const geomMajor = new THREE.SphereGeometry(0.8 * mSizeVal, 12, 12);
              const geomMinor = new THREE.SphereGeometry(0.4 * mSizeVal, 8, 8);
              for (let i = 0; i < 60; i++) {
                  const isMajor = (i % 5 === 0);
                  if (!isMajor) continue;
                  const marker = new THREE.Mesh(isMajor ? geomMajor : geomMinor, markerMat);
                  const ang = (i / 60) * Math.PI * 2;
                  
                  if ((shape === 'custom' && customHull) || (shape === 'silhouette' && silhouetteHull)) {
                      const activeHull = (shape === 'silhouette') ? silhouetteHull : customHull;
                      const intersect = getRayHullIntersection(ang, activeHull);
                      if (intersect) {
                          const factor = 0.92;
                          marker.position.set(intersect.x * factor, intersect.y * factor, markerZ);
                      } else {
                          marker.position.set(Math.cos(ang) * mRadius, Math.sin(ang) * mRadius, markerZ);
                      }
                  } else {
                      marker.position.set(Math.cos(ang) * mRadius, Math.sin(ang) * mRadius, markerZ);
                  }
                  meshGroup.add(marker);
              }
          } else if (mStyleOpt === 'roman' || mStyleOpt === 'arabic') {
              const canvas = document.createElement('canvas');
              canvas.width = 512;
              canvas.height = 512;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, 512, 512);
              ctx.fillStyle = '#' + mColor.getHexString();
              ctx.font = 'bold ' + Math.round(36 * mSizeVal) + 'px "Inter", sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              const numerals = mStyleOpt === 'roman' 
                  ? ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"]
                  : ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

              for (let i = 0; i < 12; i++) {
                  const ang = (i / 12) * Math.PI * 2;
                  let cx, cy;
                  if ((shape === 'custom' && customHull) || (shape === 'silhouette' && silhouetteHull)) {
                      const activeHull = (shape === 'silhouette') ? silhouetteHull : customHull;
                      const intersect = getRayHullIntersection(ang, activeHull);
                      if (intersect) {
                          const factor = 0.82;
                          cx = 256 + intersect.x * factor * 5.55;
                          cy = 256 - intersect.y * factor * 5.55;
                      } else {
                          cx = 256 + Math.sin(ang) * 200;
                          cy = 256 - Math.cos(ang) * 200;
                      }
                  } else {
                      cx = 256 + Math.sin(ang) * 200;
                      cy = 256 - Math.cos(ang) * 200;
                  }
                  ctx.fillText(numerals[i], cx, cy);
              }
              const texture = new THREE.CanvasTexture(canvas);
              texture.encoding = THREE.sRGBEncoding;
              const textMat = new THREE.MeshBasicMaterial({
                  map: texture,
                  transparent: true,
                  side: THREE.DoubleSide
              });
              const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(mRadius * 2, mRadius * 2), textMat);
              textMesh.position.z = markerZ;
              meshGroup.add(textMesh);
          }
      }

      // Custom Dial Text Overlay (Multi-Text support)
      let activeTexts = [];
      if (p0.dialTexts && p0.dialTexts.length > 0) {
          activeTexts = p0.dialTexts;
      } else if (p0.dialText && p0.dialText.trim() !== '') {
          activeTexts = [{
              text: p0.dialText,
              color: p0.dialTextColor,
              size: p0.dialTextSize,
              font: p0.dialTextFont,
              x: p0.dialTextX,
              y: p0.dialTextY,
              rotation: p0.dialTextRotation,
              orientation: p0.dialTextOrientation,
              preset: p0.dialTextPreset,
              warp: p0.dialTextWarp,
              warpRadius: p0.dialTextWarpRadius,
              pulseWithTick: p0.dialTextPulseWithTick || false
          }];
      }

      activeTexts.forEach((textObj, idx) => {
          if (!textObj.text || textObj.text.trim() === '') return;

          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, 512, 512);

          const txt = textObj.text;
          const fontSize = (textObj.size !== undefined) ? textObj.size : 14;
          const fontSizePx = fontSize * 2.8;
          const fontName = textObj.font || 'Inter';
          ctx.font = 'bold ' + Math.round(fontSizePx) + 'px "' + fontName + '", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const textX = (textObj.x !== undefined) ? textObj.x : 0;
          const textY = (textObj.y !== undefined) ? textObj.y : 0;
          const textRot = (textObj.rotation !== undefined) ? textObj.rotation : 0;
          const textOrient = textObj.orientation || 'horizontal';
          const textPreset = textObj.preset || 'flat';
          const textWarp = textObj.warp || false;
          const textWarpRad = (textObj.warpRadius !== undefined) ? textObj.warpRadius : 25;

          const cx = 256 + textX * 7.11;
          const cy = 256 - textY * 7.11;

          function drawText(context, dx = 0, dy = 0) {
              if (textWarp) {
                  const warpRadPx = textWarpRad * 7.11;
                  const chars = txt.split('');
                  const spacingFactor = 1.1;
                  const widths = chars.map(c => context.measureText(c).width);
                  const totalWidth = widths.reduce((a, b) => a + b, 0);
                  const totalAngle = (totalWidth * spacingFactor) / warpRadPx;
                  
                  const centerAngle = -Math.PI / 2 + (textRot * Math.PI / 180);
                  const startAngle = centerAngle - totalAngle / 2;

                  let accumAngle = 0;
                  chars.forEach((char, idxC) => {
                      const charW = widths[idxC];
                      const charAngle = (charW * spacingFactor) / warpRadPx;
                      const a = startAngle + accumAngle + charAngle / 2;
                      accumAngle += charAngle;

                      const px = cx + dx + Math.cos(a) * warpRadPx;
                      const py = cy + dy + Math.sin(a) * warpRadPx;

                      context.save();
                      context.translate(px, py);
                      context.rotate(a + Math.PI / 2);
                      context.fillText(char, 0, 0);
                      context.restore();
                  });
              } else {
                  context.save();
                  context.translate(cx + dx, cy + dy);
                  if (textRot !== 0) {
                      context.rotate(textRot * Math.PI / 180);
                  }

                  if (textOrient === 'vertical') {
                      const chars = txt.split('');
                      const charSpacing = fontSizePx * 1.0;
                      const startY = -((chars.length - 1) * charSpacing) / 2;
                      chars.forEach((char, idxC) => {
                          context.fillText(char, 0, startY + idxC * charSpacing);
                      });
                  } else {
                      context.fillText(txt, 0, 0);
                  }
                  context.restore();
              }
          }

          if (textPreset === 'glow') {
              ctx.shadowColor = textObj.color || '#ffffff';
              ctx.shadowBlur = 15;
              ctx.fillStyle = textObj.color || '#ffffff';
              drawText(ctx);
              ctx.shadowBlur = 4;
              ctx.fillStyle = '#ffffff';
              drawText(ctx);
          } else if (textPreset === 'metallic') {
              ctx.fillStyle = 'rgba(255,255,255,0.45)';
              drawText(ctx, 1.2, 1.2);
              ctx.fillStyle = 'rgba(0,0,0,0.85)';
              drawText(ctx, -1.2, -1.2);
              ctx.fillStyle = textObj.color || '#ffffff';
              drawText(ctx, 0, 0);
          } else if (textPreset === 'holographic') {
              ctx.fillStyle = textObj.color || '#06b6d4';
              ctx.globalAlpha = 0.85;
              ctx.shadowColor = textObj.color || '#06b6d4';
              ctx.shadowBlur = 8;
              drawText(ctx);

              ctx.globalAlpha = 0.25;
              ctx.strokeStyle = '#050815';
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              for (let i = 0; i < 512; i += 3) {
                  ctx.moveTo(0, i);
                  ctx.lineTo(512, i);
              }
              ctx.stroke();
              ctx.globalAlpha = 1.0;
          } else {
              ctx.fillStyle = textObj.color || '#ffffff';
              drawText(ctx);
          }

          const texture = new THREE.CanvasTexture(canvas);
          texture.encoding = THREE.sRGBEncoding;
          const textMat = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              side: THREE.DoubleSide
          });
          const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(72, 72), textMat);
          textMesh.position.z = faceFrontZ + 0.15 + idx * 0.01;
          textMesh.name = (idx === 0) ? 'dialTextDecal' : 'dialTextDecal_' + idx;
          textMesh.userData = { pulseWithTick: textObj.pulseWithTick || false };
          meshGroup.add(textMesh);
      });

      // 1. Tourbillon Escapement Osc.
      if (p0.tourbillonEnabled) {
          const tourbillonGroup = new THREE.Group();
          tourbillonGroup.name = 'tourbillonGroup';
          tourbillonGroup.position.set(0, 14, faceFrontZ + 0.1);

          const brassMat = makeMetalMat('brass');
          const steelMat = makeMetalMat('steel');
          const copperMat = makeMetalMat('copper');

          // Lower support bridge
          const bridge = new THREE.Mesh(new THREE.BoxGeometry(10, 1.2, 0.4), brassMat);
          bridge.position.z = -0.1;
          tourbillonGroup.add(bridge);

          // Balance Wheel rotating group
          const balanceWheel = new THREE.Group();
          balanceWheel.name = 'balanceWheel';

          const hub = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.6, 12), brassMat);
          hub.rotation.x = Math.PI / 2;
          balanceWheel.add(hub);

          const ring = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.4, 8, 32), brassMat);
          balanceWheel.add(ring);

          for (let i = 0; i < 3; i++) {
              const spoke = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 0.2), brassMat);
              spoke.rotation.z = (i * Math.PI) / 3;
              balanceWheel.add(spoke);
          }

          for (let i = 0; i < 4; i++) {
              const angle = (i * Math.PI) / 2;
              const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 8), steelMat);
              screw.rotation.x = Math.PI / 2;
              screw.position.set(Math.cos(angle) * 4.2, Math.sin(angle) * 4.2, 0);
              balanceWheel.add(screw);
          }

          const hairspring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.15, 6, 24), copperMat);
          hairspring.position.z = 0.25;
          balanceWheel.add(hairspring);

          tourbillonGroup.add(balanceWheel);

          // Top bridge/cage
          const topBridge = new THREE.Mesh(new THREE.BoxGeometry(11, 1.0, 0.3), steelMat);
          topBridge.position.z = 0.5;
          tourbillonGroup.add(topBridge);

          // Ruby pivot
          const rubyMat = new THREE.MeshStandardMaterial({
              color: 0xe11d48,
              roughness: 0.1,
              metalness: 0.9
          });
          const ruby = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.5, 8), rubyMat);
          ruby.rotation.x = Math.PI / 2;
          ruby.position.z = 0.55;
          tourbillonGroup.add(ruby);

          meshGroup.add(tourbillonGroup);
      }

      // 2. Astrolabe Moon Phase
      if (p0.moonPhaseEnabled) {
          const moonPhaseGroup = new THREE.Group();
          moonPhaseGroup.name = 'moonPhaseGroup';
          moonPhaseGroup.position.set(0, -14, faceFrontZ + 0.1);

          const brassMat = makeMetalMat('brass');
          const steelMat = makeMetalMat('steel');

          // Engraved outer ring
          const ring = new THREE.Mesh(new THREE.RingGeometry(5.0, 6.2, 32), brassMat);
          moonPhaseGroup.add(ring);

          for (let i = 0; i < 8; i++) {
              const angle = (i * Math.PI) / 4;
              const dot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), steelMat);
              dot.position.set(Math.cos(angle) * 5.6, Math.sin(angle) * 5.6, 0.1);
              moonPhaseGroup.add(dot);
          }

          // Rotating moon globe
          const moonGlobe = new THREE.Group();
          moonGlobe.name = 'moonGlobe';

          const goldMoon = new THREE.Mesh(new THREE.SphereGeometry(4.0, 16, 16, 0, Math.PI), makeMetalMat('gold'));
          goldMoon.rotation.y = Math.PI / 2;
          moonGlobe.add(goldMoon);

          const shadowMoon = new THREE.Mesh(new THREE.SphereGeometry(4.0, 16, 16, Math.PI, Math.PI), new THREE.MeshStandardMaterial({
              color: 0x1e293b,
              roughness: 0.8,
              metalness: 0.2
          }));
          shadowMoon.rotation.y = Math.PI / 2;
          moonGlobe.add(shadowMoon);

          moonPhaseGroup.add(moonGlobe);
          meshGroup.add(moonPhaseGroup);
      }

      // 3. Liquid Neon Indicators
      if (p0.liquidNeonEnabled) {
          const liquidNeonGroup = new THREE.Group();
          liquidNeonGroup.name = 'liquidNeonGroup';
          liquidNeonGroup.position.set(0, 0, faceFrontZ + 0.1);

          const channelMat = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.15,
              transmission: 0.8,
              roughness: 0.1,
              side: THREE.DoubleSide
          });

          const channel1 = new THREE.Mesh(new THREE.TorusGeometry(20, 0.35, 8, 48), channelMat);
          const channel2 = new THREE.Mesh(new THREE.TorusGeometry(24, 0.35, 8, 48), channelMat);
          const channel3 = new THREE.Mesh(new THREE.TorusGeometry(28, 0.35, 8, 48), channelMat);
          liquidNeonGroup.add(channel1, channel2, channel3);

          const beadH = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 12), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
          beadH.name = 'liquidBeadH';
          
          const beadM = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 12), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
          beadM.name = 'liquidBeadM';
          
          const beadS = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 12), new THREE.MeshBasicMaterial({ color: 0xeab308 }));
          beadS.name = 'liquidBeadS';

          liquidNeonGroup.add(beadH, beadM, beadS);
          meshGroup.add(liquidNeonGroup);
      }

      // 4. Pistons & Steam Pipes
      if (p0.steamPipesEnabled) {
          const steamPipesGroup = new THREE.Group();
          steamPipesGroup.name = 'steamPipesGroup';
          steamPipesGroup.position.set(0, 0, faceFrontZ + 0.1);

          const copperMat = makeMetalMat('copper');
          const brassMat = makeMetalMat('brass');

          // Left pipe & nozzle
          const leftPipe = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 5, 12), copperMat);
          leftPipe.position.set(-35.5, 12, 0);
          leftPipe.rotation.z = Math.PI / 4;
          
          const leftNozzle = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.2, 1.5, 12), brassMat);
          leftNozzle.position.set(-37.2, 13.7, 0);
          leftNozzle.rotation.z = Math.PI / 4;
          steamPipesGroup.add(leftPipe, leftNozzle);

          // Right pipe & nozzle
          const rightPipe = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 5, 12), copperMat);
          rightPipe.position.set(35.5, 12, 0);
          rightPipe.rotation.z = -Math.PI / 4;
          
          const rightNozzle = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.2, 1.5, 12), brassMat);
          rightNozzle.position.set(37.2, 13.7, 0);
          rightNozzle.rotation.z = -Math.PI / 4;
          steamPipesGroup.add(rightPipe, rightNozzle);

          // Steam particles group
          const steamParticles = new THREE.Group();
          steamParticles.name = 'steamParticles';

          for (let i = 0; i < 8; i++) {
              const p = new THREE.Mesh(
                  new THREE.SphereGeometry(0.5 + Math.random() * 0.8, 8, 8),
                  new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.0, depthWrite: false })
              );
              p.userData = {
                  age: Math.random(),
                  side: i % 2 === 0 ? 'left' : 'right',
                  baseZ: faceFrontZ + 0.1
              };
              steamParticles.add(p);
          }
          steamPipesGroup.add(steamParticles);
          meshGroup.add(steamPipesGroup);
      }

      // 5. Cyber Holographic HUD
      if (p0.holoHudEnabled) {
          const holoHudGroup = new THREE.Group();
          holoHudGroup.name = 'holoHudGroup';
          holoHudGroup.position.set(0, 0, faceFrontZ + 3.8);
          holoHudGroup.userData = { baseZ: faceFrontZ + 3.8 };

          const hudMat = new THREE.MeshBasicMaterial({
              color: 0x06b6d4,
              transparent: true,
              opacity: 0.45,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide
          });

          const outerRing = new THREE.Mesh(new THREE.RingGeometry(31.5, 32.0, 48), hudMat);
          outerRing.name = 'hudOuterRing';
          holoHudGroup.add(outerRing);

          const innerRing = new THREE.Mesh(new THREE.RingGeometry(23.5, 24.0, 48), hudMat);
          innerRing.name = 'hudInnerRing';
          holoHudGroup.add(innerRing);

          const hudCenterDot = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.5, 16), hudMat);
          holoHudGroup.add(hudCenterDot);

          const linesGroup = new THREE.Group();
          linesGroup.name = 'hudLines';
          for (let i = 0; i < 4; i++) {
              const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5, 0.05), hudMat);
              spoke.position.y = 28;
              const spokeGroup = new THREE.Group();
              spokeGroup.rotation.z = (i / 4) * Math.PI * 2;
              spokeGroup.add(spoke);
              linesGroup.add(spokeGroup);
          }
          holoHudGroup.add(linesGroup);
          meshGroup.add(holoHudGroup);
      }

      // Chronograph Sub-dials and pushers creation
      if (p0.chronoEnabled || (p0.subDialMode && p0.subDialMode !== 'chrono')) {
          const chronoDialColor = new THREE.Color(p0.chronoColor || p0.markerColor || '#06b6d4');
          const chronoNeedleColor = new THREE.Color(p0.chronoNeedleColor || p0.handSColor || '#ff2a5f');
          const subDialMat = new THREE.MeshStandardMaterial({
              color: chronoDialColor,
              roughness: 0.3,
              metalness: 0.7,
              side: THREE.DoubleSide
          });
          const needleMat = new THREE.MeshStandardMaterial({
              color: chronoNeedleColor,
              roughness: 0.2,
              metalness: 0.8
          });

          function buildMiniRegister(name, cx, cy, numTicks) {
              const regGroup = new THREE.Group();
              regGroup.name = name + '_group';
              regGroup.position.set(cx, cy, faceFrontZ + 0.05);

              // Filled sub-dial background
              const dialBg = new THREE.Mesh(new THREE.CircleGeometry(4.5, 32), new THREE.MeshStandardMaterial({
                  color: new THREE.Color(0x080c1c),
                  roughness: 0.8, metalness: 0.1, side: THREE.DoubleSide
              }));
              dialBg.position.z = -0.05;
              regGroup.add(dialBg);

              const ring = new THREE.Mesh(new THREE.RingGeometry(4.5, 5.0, 32), subDialMat);
              regGroup.add(ring);

              // Tick marks around the sub-dial
              const ticks = numTicks || 12;
              for (let i = 0; i < ticks; i++) {
                  const isMajor = (i % (ticks / 4) === 0);
                  const tickLen = isMajor ? 1.1 : 0.6;
                  const tickW = isMajor ? 0.25 : 0.15;
                  const ang = (i / ticks) * Math.PI * 2;
                  const r = 4.1;
                  const tick = new THREE.Mesh(new THREE.BoxGeometry(tickW, tickLen, 0.1), subDialMat);
                  tick.position.set(Math.sin(ang) * r, Math.cos(ang) * r, 0.05);
                  tick.rotation.z = -ang;
                  regGroup.add(tick);
              }

              const handGrp = new THREE.Group();
              handGrp.name = name;
              handGrp.position.z = 0.15;

              // Main needle (forward)
              const needle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 0.18), needleMat);
              needle.position.y = 1.5;
              handGrp.add(needle);

              // Needle tip
              const tip = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.7, 4), needleMat);
              tip.rotation.y = Math.PI / 4;
              tip.position.y = 3.25;
              handGrp.add(tip);

              // Counterweight (tail)
              const tail = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.22), needleMat);
              tail.position.y = -0.65;
              handGrp.add(tail);

              // Center cap
              const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.28, 16), subDialMat);
              cap.rotation.x = Math.PI / 2;
              handGrp.add(cap);

              regGroup.add(handGrp);
              return regGroup;
          }

          // Left sub-dial: Elapsed Minutes (0-30 min full rotation)
          const regMin = buildMiniRegister('hand_chrono_min', -14, 0, 12);
          // Right sub-dial: Elapsed 1/10 seconds (0-60s full rotation = like a fast seconds)
          const regTenth = buildMiniRegister('hand_chrono_tenth', 14, 0, 60);
          // Bottom sub-dial: Real-time seconds (0-60s)
          const regSec = buildMiniRegister('hand_chrono_sec', 0, -14, 60);

          meshGroup.add(regMin, regTenth, regSec);

          // 3D Pushers on the case bezel
          const pusherMat = (mStyle === 'none') ? makeMetalMat('steel') : bezelMat;
          const startAngle = Math.PI / 6; // 30 deg (2 o'clock)
          const resetAngle = -Math.PI / 6; // -30 deg (4 o'clock)
          
          let baseRadiusStart = 36.5;
          let baseRadiusReset = 36.5;
          
          if ((shape === 'custom' && customHull) || (shape === 'silhouette' && silhouetteHull)) {
              const activeHull = (shape === 'silhouette') ? silhouetteHull : customHull;
              const intersectStart = getRayHullIntersection(Math.PI / 3, activeHull); // 2 o'clock (60 deg from 12)
              if (intersectStart) {
                  baseRadiusStart = intersectStart.t + 1.2; // project outward slightly to be clickable
              }
              const intersectReset = getRayHullIntersection(2 * Math.PI / 3, activeHull); // 4 o'clock (120 deg from 12)
              if (intersectReset) {
                  baseRadiusReset = intersectReset.t + 1.2; // project outward slightly to be clickable
              }
          }
          
          m.pusherStartRadius = baseRadiusStart;
          m.pusherResetRadius = baseRadiusReset;

          const pusherZ = isExtruded ? 1.5 : 0.5;

          const pusherStart = new THREE.Group();
          pusherStart.name = 'pusher_start_stop';
          const bodyStart = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 3.5, 16), pusherMat);
          bodyStart.rotation.z = startAngle - Math.PI / 2;
          bodyStart.position.set(baseRadiusStart * Math.cos(startAngle), baseRadiusStart * Math.sin(startAngle), pusherZ);
          pusherStart.add(bodyStart);

          const pusherReset = new THREE.Group();
          pusherReset.name = 'pusher_reset';
          const bodyReset = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 3.5, 16), pusherMat);
          bodyReset.rotation.z = resetAngle - Math.PI / 2;
          bodyReset.position.set(baseRadiusReset * Math.cos(resetAngle), baseRadiusReset * Math.sin(resetAngle), pusherZ);
          pusherReset.add(bodyReset);

          meshGroup.add(pusherStart, pusherReset);
      }

      const hStyle = p0.handStyle || 'modern';
      const hColor = new THREE.Color(p0.handHColor || '#ffffff');
      const mColor = new THREE.Color(p0.handMColor || '#ffffff');
      const sColor = new THREE.Color(p0.handSColor || '#ff2a5f');

      const hLen = p0.handHLength || 18;
      const mLen = p0.handMLength || 27;
      const sLen = p0.handSLength || 34;

      const hWid = p0.handHWidth || 1.6;
      const mWid = p0.handMWidth || 1.0;
      const sWid = p0.handSWidth || 0.5;

      function makeHandMat(color, isNeon = false) {
          if (isNeon) {
              return new THREE.MeshBasicMaterial({
                  color: color,
                  transparent: true,
                  opacity: 0.95,
                  blending: THREE.AdditiveBlending
              });
          }
          return new THREE.MeshStandardMaterial({
              color: color,
              roughness: 0.2,
              metalness: 0.8,
              side: THREE.DoubleSide
          });
      }

      function buildStyledHand(partName, len, width, color) {
          const hand = new THREE.Group();
          hand.name = partName;
          if (hStyle === 'none') {
              return hand;
          }

          const isNeon = (hStyle === 'neon');
          const mat = makeHandMat(color, isNeon);

          const hub = new THREE.Mesh(new THREE.CylinderGeometry(width * 1.5, width * 1.5, 0.8, 16), makeHandMat(color, false));
          hub.rotation.x = Math.PI / 2;
          hub.position.z = 0.2;
          hand.add(hub);

          if (hStyle === 'modern') {
              const rod = new THREE.Mesh(new THREE.BoxGeometry(width, len, 0.4), mat);
              rod.position.y = len / 2;
              hand.add(rod);
          } else if (hStyle === 'classic') {
              const stem = new THREE.Mesh(new THREE.BoxGeometry(width * 0.6, len * 0.7, 0.4), mat);
              stem.position.y = len * 0.35;
              hand.add(stem);

              const headGroup = new THREE.Group();
              headGroup.position.y = len * 0.85;

              const circL = new THREE.Mesh(new THREE.CylinderGeometry(width, width, 0.4, 16), mat);
              circL.rotation.x = Math.PI / 2;
              circL.position.x = -width * 0.7;
              
              const circR = circL.clone();
              circR.position.x = width * 0.7;

              const tip = new THREE.Mesh(new THREE.ConeGeometry(width * 1.5, len * 0.3, 4), mat);
              tip.position.y = len * 0.12;
              tip.rotation.y = Math.PI / 4;

              headGroup.add(circL, circR, tip);
              hand.add(headGroup);
          } else if (hStyle === 'diamond') {
              const stem = new THREE.Mesh(new THREE.BoxGeometry(width * 0.5, len * 0.6, 0.4), mat);
              stem.position.y = len * 0.3;
              hand.add(stem);

              const dGeom = new THREE.ConeGeometry(width * 1.8, len * 0.4, 4);
              const dMesh1 = new THREE.Mesh(dGeom, mat);
              dMesh1.position.y = len * 0.7;
              dMesh1.rotation.y = Math.PI / 4;

              const dMesh2 = new THREE.Mesh(dGeom, mat);
              dMesh2.position.y = len * 0.7;
              dMesh2.rotation.y = Math.PI / 4;
              dMesh2.rotation.x = Math.PI;

              hand.add(dMesh1, dMesh2);
          } else if (hStyle === 'neon') {
              const outerTube = new THREE.Mesh(new THREE.BoxGeometry(width * 1.8, len, 0.8), makeHandMat(color, true));
              outerTube.position.y = len / 2;
              hand.add(outerTube);

              const innerCore = new THREE.Mesh(new THREE.BoxGeometry(width * 0.6, len * 0.9, 0.4), makeHandMat('#ffffff', false));
              innerCore.position.y = len / 2;
              hand.add(innerCore);
          } else if (hStyle === 'arrow') {
              if (partName === 'hand_s') {
                  const rod = new THREE.Mesh(new THREE.BoxGeometry(width, len, 0.4), mat);
                  rod.position.y = len / 2;
                  hand.add(rod);
              } else {
                  const stem = new THREE.Mesh(new THREE.BoxGeometry(width * 0.7, len * 0.75, 0.4), mat);
                  stem.position.y = len * 0.375;
                  hand.add(stem);

                  const arrowHead = new THREE.Mesh(new THREE.ConeGeometry(width * 2.2, len * 0.35, 4), mat);
                  arrowHead.position.y = len * 0.85;
                  arrowHead.rotation.y = Math.PI / 4;
                  hand.add(arrowHead);
              }
          }

          return hand;
      }

      const handH = buildStyledHand('hand_h', hLen, hWid, hColor);
      handH.position.z = 1.0;
      handsGroup.add(handH);

      const handM = buildStyledHand('hand_m', mLen, mWid, mColor);
      handM.position.z = 1.8;
      handsGroup.add(handM);

      const handS = buildStyledHand('hand_s', sLen, sWid, sColor);
      handS.position.z = 2.6;
      handsGroup.add(handS);

      if (p0.alarmEnabled) {
          const alarmHandColor = '#fbbf24';
          const handAlarm = buildStyledHand('hand_alarm', 14, 0.8, alarmHandColor);
          handAlarm.position.z = 0.8;
          
          const timeParts = (p0.alarmTime || '12:00').split(':');
          const alH = parseInt(timeParts[0] || 12);
          const alM = parseInt(timeParts[1] || 0);
          const alarmHrFrac = (alH % 12) + alM / 60;
          handAlarm.rotation.z = - (alarmHrFrac / 12) * Math.PI * 2;
          
          handsGroup.add(handAlarm);
      }

      if (hStyle !== 'none') {
          const capPinion = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), makeHandMat(hColor, false));
          capPinion.position.set(0, 0, 3.2);
          handsGroup.add(capPinion);
      }

      if (p0.glassCover && shape !== 'none') {
          const glassMat = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              transmission: 0.95,
              opacity: 0.18,
              transparent: true,
              roughness: 0.05,
              metalness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.02,
              side: THREE.DoubleSide
          });
          
          let glassMesh;
          if (shape === 'circle') {
              glassMesh = new THREE.Mesh(new THREE.SphereGeometry(37, 32, 16, 0, Math.PI * 2, 0, 0.35), glassMat);
              glassMesh.rotation.x = Math.PI / 2;
              glassMesh.position.z = 1.0;
          } else if (shape === 'silhouette' && silhouetteHull && silhouetteHull.length > 0) {
              const glassShape = new THREE.Shape();
              glassShape.moveTo(silhouetteHull[0].x, silhouetteHull[0].y);
              for(let i=1; i<silhouetteHull.length; i++) {
                  glassShape.lineTo(silhouetteHull[i].x, silhouetteHull[i].y);
              }
              glassShape.closePath();
              glassMesh = new THREE.Mesh(new THREE.ShapeGeometry(glassShape), glassMat);
              glassMesh.position.z = 3.6;
          } else if (shape === 'custom' && customHull) {
              const glassShape = new THREE.Shape();
              glassShape.moveTo(customHull[0].x, customHull[0].y);
              for(let i=1; i<customHull.length; i++) {
                  glassShape.lineTo(customHull[i].x, customHull[i].y);
              }
              glassShape.closePath();
              glassMesh = new THREE.Mesh(new THREE.ShapeGeometry(glassShape), glassMat);
              glassMesh.position.z = 3.6;
          } else {
              glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(71, 71), glassMat);
              glassMesh.position.z = 3.6;
          }
          if (glassMesh) {
              glassMesh.name = 'glassCover';
              meshGroup.add(glassMesh);
          }
      }

      // Weather Overlays
      if (p0.weatherOverlay === 'rain' || p0.weatherWeatherSyncEnabled) {
          const rainGroup = new THREE.Group();
          rainGroup.name = 'rainGroup';
          const rainMat = new THREE.MeshBasicMaterial({
              color: 0x38bdf8,
              transparent: true,
              opacity: 0.6
          });
          const rainGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 4);
          for (let i = 0; i < 40; i++) {
              const p = new THREE.Mesh(rainGeo, rainMat);
              const ang = Math.random() * Math.PI * 2;
              const r = Math.random() * 34;
              p.position.set(Math.cos(ang) * r, Math.sin(ang) * r, faceFrontZ + 0.8 + Math.random() * 0.4);
              p.rotation.z = -0.1;
              p.userData = { speed: 1.5 + Math.random() * 1.5, angle: ang, r: r };
              rainGroup.add(p);
          }
          meshGroup.add(rainGroup);
      }
      if (p0.weatherOverlay === 'snow' || p0.weatherWeatherSyncEnabled) {
          const snowGroup = new THREE.Group();
          snowGroup.name = 'snowGroup';
          const snowMat = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.8
          });
          const snowGeo = new THREE.SphereGeometry(0.35, 6, 6);
          for (let i = 0; i < 45; i++) {
              const p = new THREE.Mesh(snowGeo, snowMat);
              const ang = Math.random() * Math.PI * 2;
              const r = Math.random() * 34;
              p.position.set(Math.cos(ang) * r, Math.sin(ang) * r, faceFrontZ + 0.8 + Math.random() * 0.4);
              p.userData = { speed: 0.3 + Math.random() * 0.5, drift: -0.1 + Math.random() * 0.2 };
              snowGroup.add(p);
          }
          meshGroup.add(snowGroup);
      }
      if (p0.weatherOverlay === 'mist' || p0.weatherWeatherSyncEnabled) {
          const mistGroup = new THREE.Group();
          mistGroup.name = 'mistGroup';
          const mistMat = new THREE.MeshBasicMaterial({
              color: 0x94a3b8,
              transparent: true,
              opacity: 0.15,
              depthWrite: false
          });
          const mistGeo = new THREE.PlaneGeometry(16, 16);
          for (let i = 0; i < 4; i++) {
              const p = new THREE.Mesh(mistGeo, mistMat);
              p.position.set(-20 + Math.random() * 40, -20 + Math.random() * 40, faceFrontZ + 0.8 + i * 0.1);
              p.userData = { speedX: -0.05 + Math.random() * 0.1, speedY: -0.05 + Math.random() * 0.1 };
              mistGroup.add(p);
          }
          meshGroup.add(mistGroup);
      }

      // Audio visualizer overlay
      if (p0.audioReactive || p0.radioEnabled) {
          const vizCanvas = document.createElement('canvas');
          vizCanvas.width = 256;
          vizCanvas.height = 256;
          const vizTex = new THREE.CanvasTexture(vizCanvas);
          const vizMat = new THREE.MeshBasicMaterial({
              map: vizTex,
              transparent: true,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide
          });
          const vizMesh = new THREE.Mesh(new THREE.PlaneGeometry(71.5, 71.5), vizMat);
          vizMesh.position.z = faceFrontZ + 0.12;
          vizMesh.name = 'audioVizDecal';
          vizMesh.userData = {
              ctx: vizCanvas.getContext('2d'),
              tex: vizTex
          };
          meshGroup.add(vizMesh);
      }

      const partsMap = {
          hand_h: handH,
          hand_m: handM,
          hand_s: handS,
          hand_alarm: meshGroup.getObjectByName('hand_alarm'),
          faceMesh: faceMesh || meshGroup.getObjectByName('faceMesh'),
          weatherRain: meshGroup.getObjectByName('rainGroup'),
          weatherSnow: meshGroup.getObjectByName('snowGroup'),
          weatherMist: meshGroup.getObjectByName('mistGroup'),
          audioVisualizerDecal: meshGroup.getObjectByName('audioVizDecal'),
          gear_h: meshGroup.getObjectByName('gear_h'),
          gear_m: meshGroup.getObjectByName('gear_m'),
          gear_s: meshGroup.getObjectByName('gear_s'),
          neonBorder: meshGroup.getObjectByName('neonBorder'),
          backlightGlow: meshGroup.getObjectByName('backlightGlow'),
          hand_chrono_min: meshGroup.getObjectByName('hand_chrono_min'),
          hand_chrono_tenth: meshGroup.getObjectByName('hand_chrono_tenth'),
          hand_chrono_sec: meshGroup.getObjectByName('hand_chrono_sec'),
          pusher_start_stop: meshGroup.getObjectByName('pusher_start_stop'),
          pusher_reset: meshGroup.getObjectByName('pusher_reset'),
          balanceWheel: meshGroup.getObjectByName('balanceWheel'),
          moonGlobe: meshGroup.getObjectByName('moonGlobe'),
          liquidBeadH: meshGroup.getObjectByName('liquidBeadH'),
          liquidBeadM: meshGroup.getObjectByName('liquidBeadM'),
          liquidBeadS: meshGroup.getObjectByName('liquidBeadS'),
          steamParticles: meshGroup.getObjectByName('steamParticles'),
          hudOuterRing: meshGroup.getObjectByName('hudOuterRing'),
          hudInnerRing: meshGroup.getObjectByName('hudInnerRing'),
          hudLines: meshGroup.getObjectByName('hudLines'),
          hudGroup: meshGroup.getObjectByName('holoHudGroup'),
          dialTextDecal: meshGroup.getObjectByName('dialTextDecal'),
          dialTextDecal_1: meshGroup.getObjectByName('dialTextDecal_1'),
          dialTextDecal_2: meshGroup.getObjectByName('dialTextDecal_2')
      };
      addClockUltraAnimCb(m, partsMap);

      return meshGroup;
  }

  function addClockUltraAnimCb(m, partsMap) {
      if (typeof scene === 'undefined' || !scene) return;
      if (!m.id) return;
      const sceneCbs = scene.animCbs = scene.animCbs || [];
      
      function getDynamicTimeColor(hr) {
          const nightCol = new THREE.Color('#030712');
          const sunriseCol = new THREE.Color('#ea580c');
          const dayCol = new THREE.Color('#1e1b4b');
          const sunsetCol = new THREE.Color('#701a75');
          
          if (hr >= 5 && hr < 8) {
              const t = (hr - 5) / 3;
              return nightCol.clone().lerp(sunriseCol, t);
          } else if (hr >= 8 && hr < 17) {
              const t = (hr - 8) / 9;
              return sunriseCol.clone().lerp(dayCol, t);
          } else if (hr >= 17 && hr < 20) {
              const t = (hr - 17) / 3;
              return dayCol.clone().lerp(sunsetCol, t);
          } else {
              let t = 0;
              if (hr >= 20) {
                  t = (hr - 20) / 9;
              } else {
                  t = (hr + 4) / 9;
              }
              return sunsetCol.clone().lerp(nightCol, Math.min(1, t));
          }
      }

      m._scUltraAnimCb = (w) => {
          const now = new Date();
          const p0 = m.clockParts && m.clockParts[0];

          const nowMs = performance.now();
          if (!m._lastTimeMs) m._lastTimeMs = nowMs;
          const dt = Math.min(100, nowMs - m._lastTimeMs);
          m._lastTimeMs = nowMs;

          // 1. Time Travel Damping Decay
          const timeTravelEnabled = p0 && p0.timeTravelEnabled;
          const timeTravelAutoReturn = p0 && p0.timeTravelAutoReturn;
          if (timeTravelEnabled && timeTravelAutoReturn && !m._isTimeTraveling) {
              m._timeOffsetMinutes = (m._timeOffsetMinutes || 0) * 0.92;
              if (Math.abs(m._timeOffsetMinutes) < 0.01) {
                  m._timeOffsetMinutes = 0;
              }
          }

          if (m._timeOffsetMinutes) {
              now.setMinutes(now.getMinutes() + m._timeOffsetMinutes);
          }
          const ms = now.getMilliseconds();
          const sec = now.getSeconds() + ms / 1000;
          const min = now.getMinutes() + sec / 60;
          const hr = (now.getHours() % 12) + min / 60;

          const angleM_real = - (min / 60) * Math.PI * 2;
          const angleH_real = - (hr / 12) * Math.PI * 2;
          const angleS_real = - (sec / 60) * Math.PI * 2;
          const angleH = angleH_real;
          const angleM = angleM_real;

          // Pomodoro Countdown Timer
          if (p0 && p0.pomodoroTimerEnabled && p0.pomodoroRunning) {
              p0.pomodoroTimeRemaining -= dt / 1000;
              if (p0.pomodoroTimeRemaining <= 0) {
                  p0.pomodoroTimeRemaining = 0;
                  p0.pomodoroRunning = false;
                  
                  try {
                      const ctx = window.getCuPlaybackContext ? window.getCuPlaybackContext() : (typeof getCuPlaybackContext === 'function' ? getCuPlaybackContext() : null);
                      if (ctx) {
                          const playT = window.playTone || (typeof playTone === 'function' ? playTone : null);
                          if (playT) {
                              const nowTime = ctx.currentTime;
                              playT(261.63, nowTime, 0.4);
                              playT(329.63, nowTime + 0.3, 0.4);
                              playT(392.00, nowTime + 0.6, 0.8);
                          }
                      }
                  } catch(e) {}

                  window.dispatchEvent(new CustomEvent('clock-pomodoro-complete', { detail: { duration: p0.pomodoroDuration } }));
                  if (window.parent) {
                      window.parent.postMessage({ type: 'clock-pomodoro-complete', duration: p0.pomodoroDuration }, '*');
                  }
                  
                  if (window.toast) {
                      window.toast("🍅 Pomodoro focus session completed! Take a break!");
                  } else {
                      alert("Pomodoro focus session completed! Take a break!");
                  }
              }
              
              const timerDisplay = document.getElementById('cu3-pomodoro-time-display') || document.getElementById('cu-pomodoro-time-display');
              if (timerDisplay) {
                  const displayM = Math.floor(p0.pomodoroTimeRemaining / 60);
                  const displayS = Math.floor(p0.pomodoroTimeRemaining % 60);
                  timerDisplay.innerText = displayM + ':' + String(displayS).padStart(2, '0');
              }
          }

          // Interactive Website Menu Hand Overrides
          let overrideHands = false;
          let angleH_nav, angleM_nav, angleS_nav;
          if (window._cuNavTargetTime && (Date.now() - window._cuNavTargetTime < 2000)) {
              overrideHands = true;
              const elapsed = (Date.now() - window._cuNavTargetTime) / 2000;
              const targetAngle = - (window._cuNavTargetHour / 12) * Math.PI * 2;
              if (elapsed < 0.25) {
                  const t = elapsed / 0.25;
                  angleH_nav = t * Math.PI * 4 + (1 - t) * angleH_real;
                  angleM_nav = t * Math.PI * 8 + (1 - t) * angleM_real;
                  angleS_nav = t * Math.PI * 12 + (1 - t) * angleS_real;
              } else {
                  angleH_nav = targetAngle;
                  angleM_nav = targetAngle;
                  angleS_nav = targetAngle;
              }
          }

          if (partsMap.hand_h) partsMap.hand_h.rotation.z = overrideHands ? angleH_nav : angleH_real;
          if (partsMap.hand_m) partsMap.hand_m.rotation.z = overrideHands ? angleM_nav : angleM_real;


          const chronoEnabled = p0 && p0.chronoEnabled;
          const subDialMode = p0 && p0.subDialMode ? p0.subDialMode : 'chrono';
          const analyticsDisplayEnabled = p0 && p0.analyticsDisplayEnabled;

          let chronoSec = 0;
          
          if (analyticsDisplayEnabled) {
              const t = Date.now() / 1000;
              const visitors = 85 + Math.sin(t * 0.05) * 50 + Math.cos(t * 0.12) * 15;
              const convRate = 2.75 + Math.sin(t * 0.08) * 1.75 + Math.cos(t * 0.17) * 0.5;
              
              if (!m._lastEventTime) m._lastEventTime = 0;
              const nowMs_event = Date.now();
              if (nowMs_event - m._lastEventTime > 6000 + Math.sin(t) * 2000) {
                  m._lastEventTime = nowMs_event;
                  m._eventPulse = 1.0;
              }
              if (m._eventPulse > 0) {
                  m._eventPulse -= dt / 1000;
                  if (m._eventPulse < 0) m._eventPulse = 0;
              }
              const twitchAngle = (m._eventPulse || 0) * Math.PI * 0.25;

              if (partsMap.hand_chrono_min) {
                  partsMap.hand_chrono_min.rotation.z = - (visitors / 200) * Math.PI * 2;
              }
              if (partsMap.hand_chrono_tenth) {
                  partsMap.hand_chrono_tenth.rotation.z = - (convRate / 10) * Math.PI * 2;
              }
              if (partsMap.hand_chrono_sec) {
                  partsMap.hand_chrono_sec.rotation.z = overrideHands ? angleS_nav : (twitchAngle - (sec / 60) * Math.PI * 2);
              }
              if (partsMap.hand_s) {
                  partsMap.hand_s.rotation.z = overrideHands ? angleS_nav : angleS_real;
              }
          } else if (subDialMode === 'chrono' && chronoEnabled) {
              if (m.chronoRunning) {
                  m.chronoTime = (m.chronoTime || 0) + dt;
              }
              chronoSec = (m.chronoTime || 0) / 1000;
              if (partsMap.hand_s) {
                  partsMap.hand_s.rotation.z = overrideHands ? angleS_nav : (- (chronoSec / 60) * Math.PI * 2);
              }
              if (partsMap.hand_chrono_min) {
                  const chronoMin = chronoSec / 60;
                  partsMap.hand_chrono_min.rotation.z = - (chronoMin / 30) * Math.PI * 2;
              }
              if (partsMap.hand_chrono_tenth) {
                  const chronoSubSec = (m.chronoTime / 1000) % 60;
                  partsMap.hand_chrono_tenth.rotation.z = - (chronoSubSec / 60) * Math.PI * 2;
              }
              if (partsMap.hand_chrono_sec) {
                  partsMap.hand_chrono_sec.rotation.z = - (sec / 60) * Math.PI * 2;
              }
          } else {
              if (subDialMode === 'battery') {
                  const bat = window._clockBatteryLevel !== undefined ? window._clockBatteryLevel : 1.0;
                  if (partsMap.hand_chrono_min) {
                      // Sweep from 8 o'clock (0%) to 4 o'clock (100%)
                      partsMap.hand_chrono_min.rotation.z = (2 * Math.PI / 3) - bat * (4 * Math.PI / 3);
                  }
                  if (partsMap.hand_chrono_tenth) {
                      partsMap.hand_chrono_tenth.rotation.z = 0;
                  }
                  if (partsMap.hand_chrono_sec) {
                      partsMap.hand_chrono_sec.rotation.z = - (sec / 60) * Math.PI * 2;
                  }
              } else if (subDialMode === 'gmt') {
                  if (partsMap.hand_chrono_min) {
                      const gmtHr = (now.getUTCHours() % 12) + now.getUTCMinutes() / 60;
                      partsMap.hand_chrono_min.rotation.z = - (gmtHr / 12) * Math.PI * 2;
                  }
                  if (partsMap.hand_chrono_tenth) {
                      const gmtMin = now.getUTCMinutes() + now.getUTCSeconds() / 60;
                      partsMap.hand_chrono_tenth.rotation.z = - (gmtMin / 60) * Math.PI * 2;
                  }
                  if (partsMap.hand_chrono_sec) {
                      partsMap.hand_chrono_sec.rotation.z = - (now.getUTCSeconds() / 60) * Math.PI * 2;
                  }
              } else if (subDialMode === 'performance') {
                  const nowTime = performance.now();
                  if (!m._fpsLastTime) {
                      m._fpsLastTime = nowTime;
                      m._fpsFrames = 0;
                      m._fpsValue = 60;
                  }
                  m._fpsFrames++;
                  if (nowTime > m._fpsLastTime + 1000) {
                      m._fpsValue = Math.round((m._fpsFrames * 1000) / (nowTime - m._fpsLastTime));
                      m._fpsLastTime = nowTime;
                      m._fpsFrames = 0;
                  }
                  
                  if (partsMap.hand_chrono_min) {
                      const fpsVal = Math.min(60, m._fpsValue);
                      // Sweep from 8 o'clock (0 FPS) to 4 o'clock (60 FPS)
                      partsMap.hand_chrono_min.rotation.z = (2 * Math.PI / 3) - (fpsVal / 60) * (4 * Math.PI / 3);
                  }
                  if (partsMap.hand_chrono_tenth) {
                      const frameTimeVal = Math.min(50, dt);
                      // Sweep from 8 o'clock (0 ms) to 4 o'clock (50 ms)
                      partsMap.hand_chrono_tenth.rotation.z = (2 * Math.PI / 3) - (frameTimeVal / 50) * (4 * Math.PI / 3);
                  }
                  if (partsMap.hand_chrono_sec) {
                      partsMap.hand_chrono_sec.rotation.z = - (sec / 60) * Math.PI * 2;
                  }
              } else if (subDialMode === 'countdown') {
                  let diffMs = 0;
                  if (p0 && p0.countdownTarget) {
                      const targetDate = new Date(p0.countdownTarget);
                      diffMs = targetDate - now;
                  }
                  if (diffMs > 0) {
                      const diffSec = diffMs / 1000;
                      const diffMin = diffSec / 60;
                      const diffHr = diffMin / 60;
                      const diffDays = diffHr / 24;

                      if (partsMap.hand_chrono_min) {
                          partsMap.hand_chrono_min.rotation.z = - (diffDays / 30) * Math.PI * 2;
                      }
                      if (partsMap.hand_chrono_tenth) {
                          partsMap.hand_chrono_tenth.rotation.z = - ((diffHr % 24) / 24) * Math.PI * 2;
                      }
                      if (partsMap.hand_chrono_sec) {
                          partsMap.hand_chrono_sec.rotation.z = - ((diffSec % 60) / 60) * Math.PI * 2;
                      }
                  } else {
                      if (partsMap.hand_chrono_min) partsMap.hand_chrono_min.rotation.z = 0;
                      if (partsMap.hand_chrono_tenth) partsMap.hand_chrono_tenth.rotation.z = 0;
                      if (partsMap.hand_chrono_sec) partsMap.hand_chrono_sec.rotation.z = 0;
                  }
              }
          }

          // 2. Cursor Magnetism Logic for Seconds Hand
          let mousePos2D = null;
          let dist = 9999;
          let cursorAngle = 0;
          const clockGroup = m.runtimeGroup || m.importedMesh || (partsMap.hand_s ? partsMap.hand_s.parent.parent : (partsMap.liquidBeadS ? partsMap.liquidBeadS.parent : null));
          if (p0 && p0.cursorMagnetismEnabled && window._cuMouseNDC && camera && clockGroup) {
              const rayc = new THREE.Raycaster();
              rayc.setFromCamera(window._cuMouseNDC, camera);
              const intersection = new THREE.Vector3();
              const worldPivot = new THREE.Vector3();
              clockGroup.getWorldPosition(worldPivot);
              const worldNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(clockGroup.getWorldQuaternion(new THREE.Quaternion())).normalize();
              const clockPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(worldNormal, worldPivot);
              if (rayc.ray.intersectPlane(clockPlane, intersection)) {
                  const clockWorldInv = new THREE.Matrix4().copy(clockGroup.matrixWorld).invert();
                  const localPos = intersection.applyMatrix4(clockWorldInv);
                  mousePos2D = { x: localPos.x - (p0.pivotX || 0), y: localPos.y - (p0.pivotY || 0) };
                  dist = Math.sqrt(mousePos2D.x * mousePos2D.x + mousePos2D.y * mousePos2D.y);
                  if (dist > 0) {
                      cursorAngle = Math.atan2(mousePos2D.x, mousePos2D.y);
                  }
              }
          }

          const angleS = - (sec / 60) * Math.PI * 2;
          let targetAngleS = angleS;
          if (subDialMode === 'chrono' && chronoEnabled) {
              targetAngleS = - (chronoSec / 60) * Math.PI * 2;
          }
          
          let finalAngleS = targetAngleS;
          if (p0 && p0.cursorMagnetismEnabled && mousePos2D && dist < 50) {
              const strength = (1.0 - (dist / 50)) * 0.45;
              const targetX = Math.sin(-targetAngleS);
              const targetY = Math.cos(-targetAngleS);
              const cursorX = Math.sin(cursorAngle);
              const cursorY = Math.cos(cursorAngle);
              const blendedX = targetX * (1 - strength) + cursorX * strength;
              const blendedY = targetY * (1 - strength) + cursorY * strength;
              finalAngleS = -Math.atan2(blendedX, blendedY);
          }
          if (partsMap.hand_s) partsMap.hand_s.rotation.z = finalAngleS;

          if (partsMap.hand_alarm && !m._alarmHandDragging && p0) {
              const timeParts = (p0.alarmTime || '12:00').split(':');
              const alH = parseInt(timeParts[0] || 12);
              const alM = parseInt(timeParts[1] || 0);
              const alarmHrFrac = (alH % 12) + alM / 60;
              partsMap.hand_alarm.rotation.z = - (alarmHrFrac / 12) * Math.PI * 2;
          }

          const pusherStart = partsMap.pusher_start_stop;
          const pusherReset = partsMap.pusher_reset;
          const shape = (p0 && p0.faceShape) || 'circle';
          const isExtruded = (shape === 'custom' || shape === 'silhouette');
          const pusherZ = isExtruded ? 1.5 : 0.5;
          const baseRadiusStart = m.pusherStartRadius || 36.5;
          const baseRadiusReset = m.pusherResetRadius || 36.5;
          const startAngle = Math.PI / 6;
          const resetAngle = -Math.PI / 6;

          if (pusherStart) {
              m.pusherStartAnim = m.pusherStartAnim || 0;
              if (m.pusherStartAnim > 0) {
                  m.pusherStartAnim = Math.max(0, m.pusherStartAnim - dt * 0.007);
              }
              const pushDist = 0.8 * m.pusherStartAnim;
              const body = pusherStart.children[0];
              if (body) {
                  body.position.set((baseRadiusStart - pushDist) * Math.cos(startAngle), (baseRadiusStart - pushDist) * Math.sin(startAngle), pusherZ);
              }
          }
          if (pusherReset) {
              m.pusherResetAnim = m.pusherResetAnim || 0;
              if (m.pusherResetAnim > 0) {
                  m.pusherResetAnim = Math.max(0, m.pusherResetAnim - dt * 0.007);
              }
              const pushDist = 0.8 * m.pusherResetAnim;
              const body = pusherReset.children[0];
              if (body) {
                  body.position.set((baseRadiusReset - pushDist) * Math.cos(resetAngle), (baseRadiusReset - pushDist) * Math.sin(resetAngle), pusherZ);
              }
          }

          if (partsMap.gear_h) partsMap.gear_h.rotation.z = angleH;
          if (partsMap.gear_m) partsMap.gear_m.rotation.z = -angleM;
          if (partsMap.gear_s) partsMap.gear_s.rotation.z = (subDialMode === 'chrono' && chronoEnabled) ? (m.chronoRunning ? - (chronoSec / 60) * Math.PI * 2 : partsMap.gear_s.rotation.z) : angleM * 5;

          const secFrac = sec % 1;
          const tickPulse = Math.max(0, 1 - secFrac * 5);

          if (partsMap.neonBorder && partsMap.neonBorder.material) {
              partsMap.neonBorder.material.emissiveIntensity = 1.0 + tickPulse * 1.5;
              if (p0 && p0.pomodoroTimerEnabled && p0.pomodoroRunning) {
                  partsMap.neonBorder.material.emissive.set('#f97316');
              } else if (p0 && p0.blueLightFilterEnabled && (now.getHours() >= 18 || now.getHours() < 6)) {
                  partsMap.neonBorder.material.emissive.set('#d97706');
              } else {
                  partsMap.neonBorder.material.emissive.set(p0.neonBorderColor || '#06b6d4');
              }
          }
          if (partsMap.backlightGlow && partsMap.backlightGlow.material) {
              partsMap.backlightGlow.material.opacity = 0.55 + Math.sin(Date.now() * 0.0025) * 0.15 + tickPulse * 0.3;
              if (p0 && p0.pomodoroTimerEnabled && p0.pomodoroRunning) {
                  partsMap.backlightGlow.material.color.set('#f97316');
              } else if (p0 && p0.blueLightFilterEnabled && (now.getHours() >= 18 || now.getHours() < 6)) {
                  partsMap.backlightGlow.material.color.set('#d97706');
              } else {
                  partsMap.backlightGlow.material.color.set(p0.glowColor || '#6366f1');
              }
          }

          if (p0 && p0.dynamicTimeColor && partsMap.faceMesh && partsMap.faceMesh.material) {
              const hour24 = now.getHours() + now.getMinutes() / 60;
              partsMap.faceMesh.material.color.copy(getDynamicTimeColor(hour24));
          } else if (p0 && partsMap.faceMesh && partsMap.faceMesh.material) {
              partsMap.faceMesh.material.color.setStyle(p0.faceColor || '#0a0f1d');
          }

          // Determine active weather type (supporting auto-cycling weather sync)
          let activeWeather = p0 ? p0.weatherOverlay : 'none';
          if (p0 && p0.weatherWeatherSyncEnabled) {
              const cycleSec = 15;
              const cycleIdx = Math.floor((Date.now() / 1000) / cycleSec) % 3;
              const cycleTypes = ['rain', 'snow', 'mist'];
              activeWeather = cycleTypes[cycleIdx];
          }

          if (partsMap.weatherRain) {
              partsMap.weatherRain.visible = (activeWeather === 'rain');
              if (partsMap.weatherRain.visible) {
                  partsMap.weatherRain.children.forEach(drop => {
                      drop.position.y -= drop.userData.speed;
                      drop.position.x -= drop.userData.speed * 0.08;
                      if (drop.position.y < -36) {
                          drop.position.y = 36;
                          drop.position.x = (Math.random() - 0.5) * 64;
                      }
                  });
              }
          }
          if (partsMap.weatherSnow) {
              partsMap.weatherSnow.visible = (activeWeather === 'snow');
              if (partsMap.weatherSnow.visible) {
                  partsMap.weatherSnow.children.forEach(flake => {
                      flake.position.y -= flake.userData.speedY;
                      flake.userData.phase += 0.02;
                      flake.position.x += Math.sin(flake.userData.phase) * 0.08 + flake.userData.speedX;
                      if (flake.position.y < -36) {
                          flake.position.y = 36;
                          flake.position.x = (Math.random() - 0.5) * 64;
                      }
                  });
              }
          }
          if (partsMap.weatherMist) {
              partsMap.weatherMist.visible = (activeWeather === 'mist');
              if (partsMap.weatherMist.visible) {
                  partsMap.weatherMist.children.forEach(plane => {
                      plane.position.x += plane.userData.speedX;
                      plane.position.y += plane.userData.speedY;
                      plane.rotation.z += plane.userData.rotSpeed;
                      if (plane.position.x > 40) {
                          plane.position.x = -40;
                          plane.position.y = (Math.random() - 0.5) * 20;
                      }
                  });
              }
          }

          if (partsMap.audioVisualizerDecal && p0 && (p0.audioReactive || p0.radioEnabled)) {
              partsMap.audioVisualizerDecal.visible = true;
              const canvas = partsMap.audioVisualizerDecal.material.map.image;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, 256, 256);
              
              const isAlarming = !!window._cuAlarmActive;
              const now = performance.now() / 1000;

              if (p0.audioReactive) {
                  ctx.save();
                  ctx.strokeStyle = isAlarming ? '#ef4444' : (p0.glowColor || '#06b6d4');
                  ctx.lineWidth = 2.0;
                  ctx.shadowBlur = 8;
                  ctx.shadowColor = isAlarming ? '#ef4444' : (p0.glowColor || '#06b6d4');
                  ctx.beginPath();
                  
                  let data = [];
                  const scanAngle = (now % 1) * Math.PI * 2;
                  
                  function getEKGValue(t, isAlarming) {
                      const period = isAlarming ? 0.45 : 1.0;
                      const secFrac = (t % period);
                      const pt = secFrac / period; // 0 to 1
                      let h = 0;
                      if (pt < 0.65) {
                          const nt = pt / 0.65; // normalize active part
                          if (nt < 0.15) {
                              h = 0.15 * Math.sin((nt / 0.15) * Math.PI);
                          } else if (nt < 0.3) {
                              h = 0;
                          } else if (nt < 0.35) {
                              h = -0.2 * Math.sin(((nt - 0.3) / 0.05) * Math.PI);
                          } else if (nt < 0.45) {
                              h = 1.0 * Math.sin(((nt - 0.35) / 0.1) * Math.PI);
                          } else if (nt < 0.5) {
                              h = -0.3 * Math.sin(((nt - 0.45) / 0.05) * Math.PI);
                          } else if (nt < 0.7) {
                              h = 0.35 * Math.sin(((nt - 0.5) / 0.2) * Math.PI);
                          }
                      }
                      // Add high frequency telemetry-like ripple
                      h += (Math.sin(t * 120) * 0.03 + Math.cos(t * 260) * 0.015);
                      return h;
                  }

                  const numPoints = 128;
                  for (let i = 0; i < numPoints; i++) {
                      const angle = (i / numPoints) * Math.PI * 2;
                      let diff = scanAngle - angle;
                      if (diff < 0) diff += Math.PI * 2;
                      const timeAgo = diff / (Math.PI * 2); // 0 to 1
                      const val = getEKGValue(now - timeAgo, isAlarming);
                      const fade = 1.0 - timeAgo; // phosphor fade
                      data.push(val * fade);
                  }
                  
                  const numPointsData = data.length;
                  const centerX = 128;
                  const centerY = 128;
                  const baseRadius = 80;
                  
                  for (let i = 0; i <= numPointsData; i++) {
                      const index = i % numPointsData;
                      const angle = (i / numPointsData) * Math.PI * 2 - Math.PI / 2;
                      const amp = data[index] * 20;
                      const r = baseRadius + amp;
                      const x = centerX + Math.cos(angle) * r;
                      const y = centerY + Math.sin(angle) * r;
                      if (i === 0) ctx.moveTo(x, y);
                      else ctx.lineTo(x, y);
                  }
                  ctx.closePath();
                  ctx.stroke();
                  ctx.restore();
              }

              if (p0.radioEnabled) {
                  // Draw LCD Digital Tuner Display
                  ctx.save();
                  ctx.shadowBlur = 6;
                  ctx.shadowColor = isAlarming ? '#ef4444' : (p0.glowColor || '#06b6d4');

                  // 1. Draw glowing background container
                  ctx.fillStyle = 'rgba(6, 12, 28, 0.88)';
                  ctx.strokeStyle = isAlarming ? '#ef4444' : (p0.glowColor || '#06b6d4');
                  ctx.lineWidth = 1.5;
                  
                  // Draw rounded rectangle for LCD
                  const rx = 78, ry = 52, rw = 100, rh = 32, radius = 4;
                  ctx.beginPath();
                  ctx.moveTo(rx + radius, ry);
                  ctx.lineTo(rx + rw - radius, ry);
                  ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
                  ctx.lineTo(rx + rw, ry + rh - radius);
                  ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
                  ctx.lineTo(rx + radius, ry + rh);
                  ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
                  ctx.lineTo(rx, ry + radius);
                  ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
                  ctx.closePath();
                  ctx.fill();
                  ctx.stroke();

                  // 2. Draw Freq Text in glowing digital font
                  const freq = p0.radioFrequency !== undefined ? p0.radioFrequency : 90.0;
                  ctx.font = 'bold 12px "Courier New", monospace';
                  ctx.fillStyle = isAlarming ? '#f87171' : (p0.glowColor || '#22d3ee');
                  ctx.textAlign = 'center';
                  ctx.fillText(freq.toFixed(1) + ' MHz', 128, 69);

                  // 3. Draw Tuning Arrow Indicators
                  ctx.font = '9px Arial, sans-serif';
                  ctx.fillText('◀', 86, 68);
                  ctx.fillText('▶', 170, 68);

                  // 4. Draw Signal Strength Bars
                  const stations = [
                      { freq: 90.2 }, { freq: 94.5 }, { freq: 98.8 }, { freq: 102.4 }, { freq: 106.8 }
                  ];
                  let nearestSt = null;
                  let minDist = 999;
                  for (const st of stations) {
                      const dist = Math.abs(freq - st.freq);
                      if (dist < minDist) {
                          minDist = dist;
                          nearestSt = st;
                      }
                  }
                  let sigBars = 0;
                  if (minDist <= 0.05) sigBars = 5;
                  else if (minDist <= 0.1) sigBars = 4;
                  else if (minDist <= 0.15) sigBars = 3;
                  else if (minDist <= 0.2) sigBars = 2;
                  else if (minDist <= 0.3) sigBars = 1;

                  ctx.font = '7px "Courier New", monospace';
                  let sigText = 'SIG ';
                  for (let b = 1; b <= 5; b++) {
                      sigText += (b <= sigBars) ? '█' : '░';
                  }
                  ctx.fillText(sigText, 128, 79);
                  ctx.restore();
              }

              // Sweeping diagonal holographic reflection
              const sweepPeriod = 6.0; // 6 seconds per sweep
              const sweepFrac = (now % sweepPeriod) / sweepPeriod;
              const sweepX = -150 + sweepFrac * 550;
              ctx.save();
              ctx.beginPath();
              ctx.arc(128, 128, 85, 0, Math.PI * 2);
              ctx.clip();
              const grad = ctx.createLinearGradient(sweepX, 0, sweepX + 80, 256);
              grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
              grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.04)');
              grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)'); // Glare shine
              grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.04)');
              grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, 256, 256);
              ctx.restore();

              partsMap.audioVisualizerDecal.material.map.needsUpdate = true;
          } else if (partsMap.audioVisualizerDecal) {
              partsMap.audioVisualizerDecal.visible = false;
          }

          const textDecals = [partsMap.dialTextDecal, partsMap.dialTextDecal_1, partsMap.dialTextDecal_2];
          textDecals.forEach(textMesh => {
              if (textMesh && textMesh.userData && textMesh.userData.pulseWithTick) {
                  textMesh.material.opacity = 0.45 + tickPulse * 0.55;
              } else if (textMesh) {
                  textMesh.material.opacity = 1.0;
              }
          });

          if (partsMap.balanceWheel) {
              partsMap.balanceWheel.rotation.z = Math.sin(Date.now() * 0.015) * 1.2;
          }
          if (partsMap.moonGlobe) {
              partsMap.moonGlobe.rotation.y = (Date.now() * 0.0001) % (Math.PI * 2);
          }

          const activeSec = (subDialMode === 'chrono' && chronoEnabled) ? chronoSec : sec;
          const thetaS = Math.PI / 2 + finalAngleS;
          const thetaM = Math.PI / 2 - (min / 60) * Math.PI * 2;
          const thetaH = Math.PI / 2 - (hr / 12) * Math.PI * 2;

          if (partsMap.liquidBeadS) partsMap.liquidBeadS.position.set(Math.cos(thetaS) * 28, Math.sin(thetaS) * 28, 0);
          if (partsMap.liquidBeadM) partsMap.liquidBeadM.position.set(Math.cos(thetaM) * 24, Math.sin(thetaM) * 24, 0);
          if (partsMap.liquidBeadH) partsMap.liquidBeadH.position.set(Math.cos(thetaH) * 20, Math.sin(thetaH) * 20, 0);

          if (partsMap.steamParticles) {
              const fShape = (p0 && p0.faceShape) || 'circle';
              const fExtruded = (fShape === 'custom' || fShape === 'silhouette');
              const baseFaceFrontZ = fExtruded ? 0.6 : -0.2;
              partsMap.steamParticles.children.forEach((p, idx) => {
                  p.userData.age = (p.userData.age || 0) + 0.008 * w;
                  if (p.userData.age > 1.0) p.userData.age = 0;
                  const t = p.userData.age;
                  const isLeft = p.userData.side === 'left';
                  const nozzleX = isLeft ? -37.2 : 37.2;
                  const nozzleY = 13.7;
                  const dx = isLeft ? -0.707 : 0.707;
                  const dy = 0.707;

                  p.position.x = nozzleX + dx * t * 15 + Math.sin(t * 10 + idx) * 1.5;
                  p.position.y = nozzleY + dy * t * 15 + (t * t) * 5;
                  p.position.z = baseFaceFrontZ + 0.1 + t * 4;

                  if (p.material) p.material.opacity = Math.sin(t * Math.PI) * 0.55;
                  const s = 0.5 + t * 1.5;
                  p.scale.set(s, s, s);
              });
          }

          if (partsMap.hudGroup) {
              const baseHUDZ = partsMap.hudGroup.userData.baseZ || 3.8;
              partsMap.hudGroup.position.z = baseHUDZ + Math.sin(Date.now() * 0.0015) * 0.5;

              partsMap.hudGroup.rotation.x = -cuParallaxX * 0.45;
              partsMap.hudGroup.rotation.y = -cuParallaxY * 0.45;

              if (partsMap.hudOuterRing) partsMap.hudOuterRing.rotation.z = Date.now() * 0.0005;
              if (partsMap.hudInnerRing) partsMap.hudInnerRing.rotation.z = -Date.now() * 0.0008;
              if (partsMap.hudLines) partsMap.hudLines.rotation.z = Date.now() * 0.0002;
          }
      };
      scene.animCbs = sceneCbs.filter(cb => cb._modelId !== m.id);
      m._scUltraAnimCb._modelId = m.id;
      scene.animCbs.push(m._scUltraAnimCb);
  }

  function exportScene() {
      if(models.length === 0) { alert("Please create or load at least one model."); return; }
      const btn = document.getElementById('btn-export'); btn.innerHTML = '✅ Exporting...';
      
      const exportedData = models.map(m => {
          let rText = m.rawText;
          if (m.type === 'svg' || m.type === 'dxf') rText = btoa(unescape(encodeURIComponent(m.rawText)));
          
          if (typeof rText === 'string' && rText.length > 50000) {
              const chunks = [];
              for (let i = 0; i < rText.length; i += 50000) {
                  chunks.push(rText.substring(i, i + 50000));
              }
              rText = chunks;
          }
          
          return {
              id: m.id,
              type: m.type, format: m.format, points: m.points, canvasW: m.canvasW, canvasH: m.canvasH,
              rawText: rText, twistVal: m.twistVal, bendVal: m.bendVal, taperVal: m.taperVal,
              depth: m.depth, scale: m.scale, bevelVal: m.bevelVal, mirror: m.mirror, spin: m.spin, preset: m.preset,
              metalness: m.metalness, roughness: m.roughness, colorHex: m.colorHex, emissiveHex: m.emissiveHex,
              opacity: m.opacity, renderStyle: m.renderStyle || (m.wireframe ? 'wireframe' : 'solid'),
              levitate: m.levitate, isVoxel: m.isVoxel, hasFrame: m.hasFrame,
              pos: m.meshGroup ? {x: m.meshGroup.position.x, y: m.meshGroup.position.y, z: m.meshGroup.position.z} : {x: m.position.x, y: m.position.y, z: m.position.z},
              rot: m.meshGroup ? {x: m.meshGroup.rotation.x, y: m.meshGroup.rotation.y, z: m.meshGroup.rotation.z} : {x: m.rotation.x, y: m.rotation.y, z: m.rotation.z},
              scl: m.meshGroup ? {x: m.meshGroup.scale.x, y: m.meshGroup.scale.y, z: m.meshGroup.scale.z} : {x: m.groupScale.x, y: m.groupScale.y, z: m.groupScale.z},
              // Extra fields for modular integration
              heightData: m.heightData, heightRes: m.heightRes, heightScale: m.heightScale, colorMode: m.colorMode, imgB64: m.imgB64,
              avBars: m.avBars, avBarStyle: m.avBarStyle, avColorScheme: m.avColorScheme,
              formula: m.formula, surfaceRes: m.surfaceRes, surfaceRange: m.surfaceRange, doAnimate: m.doAnimate, doWire: m.doWire,
              chartData: m.chartData, labelKey: m.labelKey, valueKey: m.valueKey, colorTheme: m.colorTheme,
              camRes: m.camRes, camDepth: m.camDepth,
              shaderCode: m.shaderCode,
              starCount: m.starCount, starSize: m.starSize,
              keyframes: m.keyframes,
              samples: m.samples, sculptStyle: m.sculptStyle, sculptColor: m.sculptColor,
              qrGrid: m.qrGrid, qrRes: m.qrRes, qrHeight: m.qrHeight, qrColor: m.qrColor,
              terrainData: m.terrainData, terrainRes: m.terrainRes, terrainScale: m.terrainScale, terrainType: m.terrainType, terrainSeed: m.terrainSeed,
              docItems: m.docItems, docLayout: m.docLayout, docColor: m.docColor,
              pdfImages: m.pdfImages, pdfLayout: m.pdfLayout,
              treeNodes: m.treeNodes, nodeSize: m.nodeSize, treeColor: m.treeColor,
              neonPaths: m.neonPaths, neonColor: m.neonColor, neonThick: m.neonThick,
              videoShape: m.videoShape, videoChroma: m.videoChroma, videoChromaCol: m.videoChromaCol,
              // New advanced modules
              csvData: m.csvData, csvLabelKey: m.csvLabelKey, csvValueKey: m.csvValueKey, csvChartType: m.csvChartType, csvColorTheme: m.csvColorTheme,
              netNodes: m.netNodes, netLinks: m.netLinks, netLayout: m.netLayout, netNodeColor: m.netNodeColor, netLinkColor: m.netLinkColor, netNodeSize: m.netNodeSize,
              pxImgData: m.pxImgData, pxVoxelSize: m.pxVoxelSize, pxHeightScale: m.pxHeightScale, pxSkipAlpha: m.pxSkipAlpha,
              jsnData: m.jsnData, jsnStyle: m.jsnStyle, jsnColorTheme: m.jsnColorTheme,
              dnaSequence: m.dnaSequence, dnaStyle: m.dnaStyle, dnaColorMode: m.dnaColorMode, dnaTwist: m.dnaTwist, dnaRadius: m.dnaRadius,
              geoMarkers: m.geoMarkers, geoStyle: m.geoStyle, geoColor: m.geoColor, geoRadius: m.geoRadius, geoMarkerH: m.geoMarkerH,
              palColors: m.palColors, palStyle: m.palStyle, palDensity: m.palDensity,
              // Sentiment & Fractal
              sentAnalysis: m.sentAnalysis, sentRes: m.sentRes, sentAmp: m.sentAmp, sentTerrainStyle: m.sentTerrainStyle, sentAnimMode: m.sentAnimMode,
              fractalType: m.fractalType, fractalRes: m.fractalRes, fractalIter: m.fractalIter, fractalZoom: m.fractalZoom,
              fractalHeightScale: m.fractalHeightScale, fractalCX: m.fractalCX, fractalCY: m.fractalCY,
              fractalJR: m.fractalJR, fractalJI: m.fractalJI, fractalDepth: m.fractalDepth,
              fractalColorMode: m.fractalColorMode, fractalRenderMode: m.fractalRenderMode, fractalAnimate: m.fractalAnimate,
              // 8 New Modules
              tracks: m.tracks, buildStyle: m.buildStyle,
              layers: m.layers, neuronStyle: m.neuronStyle, neuronSize: m.neuronSize, netLayout: m.netLayout, detail: m.detail,
              events: m.events, riverStyle: m.riverStyle,
              mode: m.mode, fen: m.fen, sudoku: m.sudoku, boardMat: m.boardMat, pieceStyle: m.pieceStyle,
              vitals: m.vitals, avatarForm: m.avatarForm, auraColor: m.auraColor,
              mood: m.mood, complexity: m.complexity,
              atoms: m.atoms, bonds: m.bonds, atomScale: m.atomScale, bondThick: m.bondThick,
              wsUrl: m.wsUrl, dataField: m.dataField, vizType: m.vizType, historyBuffer: m.historyBuffer,
              scenes: m.scenes, sceneStyle: m.sceneStyle, charStyle: m.charStyle, animCamera: m.animCamera,
              keyword: m.keyword, crystalType: m.crystalType, crystalColor: m.crystalColor, spikes: m.spikes, metalness: m.metalness, transparency: m.transparency, doGlow: m.doGlow,
              // 10 Ultra-Premium Modules
              axiom: m.axiom, rules: m.rules, iter: m.iter, angle: m.angle, cTrunk: m.cTrunk, cLeaf: m.cLeaf,
              gridSize: m.gridSize, generations: m.generations, density: m.density, voxelStyle: m.voxelStyle, colorMap: m.colorMap,
              text: m.text, shape: m.shape, animStyle: m.animStyle, tSize: m.tSize, radius: m.radius,
              seed: m.seed, starType: m.starType, sysType: m.sysType, numPlanets: m.numPlanets, numBelts: m.numBelts, showOrbits: m.showOrbits,
              shipClass: m.shipClass, colorPalette: m.colorPalette, detail: m.detail, glowEngines: m.glowEngines,
              gridW: m.gridW, gridH: m.gridH, theme: m.theme, wallHeight: m.wallHeight, hasTorches: m.hasTorches,
              evType: m.evType, speed: m.speed, scaleSize: m.scaleSize, turbulence: m.turbulence,
              illusionType: m.illusionType, matStyle: m.matStyle, baseColor: m.baseColor,
              spread: m.spread,
              shieldShape: m.shieldShape, energyColor: m.energyColor, shieldSize: m.shieldSize, pulseSpeed: m.pulseSpeed, simImpact: m.simImpact,
              // QR Code Advanced Fields
              qrShape: m.qrShape, qrBgCol: m.qrBgCol, qrLogoB64: m.qrLogoB64, qrNeon: m.qrNeon, qrAnim: m.qrAnim, 
              qrMat: m.qrMat, qrBase: m.qrBase, qrParticles: m.qrParticles, qrCityscape: m.qrCityscape,
              grid: m.grid, gw: m.gw, gh: m.gh,
              // Ultra Modules
              wHeight: m.wHeight, wSpeed: m.wSpeed, wType: m.wType, foam: m.foam, wire: m.wire,
              head: m.head, arm: m.arm, color: m.color, glow: m.glow,
              style: m.style, col1: m.col1, col2: m.col2,
              size: m.size, rivers: m.rivers, smoke: m.smoke,
              dens: m.dens, height: m.height, aurora: m.aurora, snow: m.snow,
              scan: m.scan, data: m.data,
              mol: m.mol, anim: m.anim,
              scale: m.scale, mat: m.mat,
              type: m.type, col: m.col, stage: m.stage, spot: m.spot,
              sys: m.sys, view: m.view, pulse: m.pulse,
              ultraConfig: m.ultraConfig,
              // Hero Forge
              heroparts: m.heroparts, herostyle: m.herostyle,
              // Steampunk Chrono-Engine
              clockParts: m.clockParts, clockStyle: m.clockStyle
          };
      });

      const configJSON = JSON.stringify(exportedData, null, 2);
      
      const code = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><title>3D Composer Scene</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FontLoader.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/TextGeometry.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/SVGLoader.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/dxf-parser@1.1.2/dist/dxf-parser.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js"></${'script'}>
<script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></${'script'}>
<style>body{margin:0;overflow:hidden;background:#050815;}</style>
</head><body><script>
  let w = window.__SPEED__ || 1;
  window._clockBatteryLevel = 1.0;
  if (navigator.getBattery) {
      try {
          navigator.getBattery().then(battery => {
              window._clockBatteryLevel = battery.level;
              battery.addEventListener('levelchange', () => {
                  window._clockBatteryLevel = battery.level;
              });
          }).catch(err => {
              console.warn("Battery status API promise rejected in export:", err);
          });
      } catch (err) {
          console.warn("Battery status API access error in export:", err);
      }
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 5000);
  camera.position.set(0, 50, 200);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false, preserveDrawingBuffer:true});
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x050815, 1);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = false;
  
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const hLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); scene.add(hLight);
  const l1 = new THREE.DirectionalLight(0xffffff, 1.0);
  l1.position.set(100,200,200); l1.castShadow = true;
  l1.shadow.mapSize.width = 2048; l1.shadow.mapSize.height = 2048; scene.add(l1);

  const globalGroup = new THREE.Group(); scene.add(globalGroup);

  const config = ${configJSON};
  const envType = "${currentEnv}";
  const customMediaDataUrl = "${customMediaDataUrl || ''}";
  const customMediaType = "${customMediaType || ''}";
  const currentBgEffect = "${currentBgEffect}";
  window._cuGlowIntensity = ${window._cuGlowIntensity || 1.0};
  let loadedFont = null;
  let bgGroup = null;
  ${pointInPoly.toString()}
  ${getConvexHull.toString()}
  ${crossProduct.toString()}
  ${getSilhouetteContour.toString()}
  ${getDxfSilhouette.toString()}
  ${getRayHullIntersection.toString()}
  ${buildEnv.toString()}
  ${buildHeroForgeGeo.toString()}
  ${addHeroAnimCb.toString()}
  ${buildSteampunkChronoGeo.toString()}
  ${addSteampunkAnimCb.toString()}
  ${buildSteampunkChronoProGeo.toString()}
  ${addSteampunkProAnimCb.toString()}
  ${createProceduralDialTexture.toString()}
  ${buildClockUltraGeo.toString()}
  ${addClockUltraAnimCb.toString()}
  ${createGeometryFromModel.toString()}

  buildEnv(envType, scene);
  
  if (currentBgEffect !== 'none') {
      const bGrp = new THREE.Group();
      if (currentBgEffect === 'stars') {
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<3000; i++) pos.push((Math.random()-0.5)*3000, (Math.random()-0.5)*3000, (Math.random()-0.5)*3000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, opacity: 0.8 });
          const stars = new THREE.Points(geo, mat); bGrp.add(stars);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => { stars.rotation.y += 0.0005 * w; stars.rotation.z += 0.0002 * w; });
      } else if (currentBgEffect === 'rain') {
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*1500, Math.random()*1000, (Math.random()-0.5)*1500);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const rain = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00ff00, size: 5, transparent: true, opacity: 0.5 }));
          bGrp.add(rain);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
              const p = rain.geometry.attributes.position.array;
              for(let i=1; i<p.length; i+=3) { p[i] -= 15*w; if(p[i] < -500) p[i] = 1000; }
              rain.geometry.attributes.position.needsUpdate = true;
          });
      } else if (currentBgEffect === 'dust') {
          const geo = new THREE.BufferGeometry(); const pos = [];
          for(let i=0; i<1000; i++) pos.push((Math.random()-0.5)*1000, (Math.random()-0.5)*1000, (Math.random()-0.5)*1000);
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xfacc15, size: 2, transparent: true, opacity: 0.4 }));
          bGrp.add(dust);
          scene.animCbs = scene.animCbs || [];
          scene.animCbs.push((w) => {
              const p = dust.geometry.attributes.position.array;
              for(let i=0; i<p.length; i+=3) { 
                  p[i] += Math.sin(Date.now()*0.001 + i)*0.2*w; 
                  p[i+1] += Math.cos(Date.now()*0.001 + i)*0.2*w; 
              }
              dust.geometry.attributes.position.needsUpdate = true;
          });
      }
      scene.add(bGrp);
  }

  function initModels() {
      const hasSteampunkActive = config.some(x => x.format === 'steampunk-chrono' || x.format === 'steampunk-chrono-pro' || x.format === 'clock-ultra');
      config.forEach(m => {
          try {
              let rStr = Array.isArray(m.rawText) ? m.rawText.join('') : m.rawText;
              if(m.type === 'svg' || m.type === 'dxf') m.rawText = decodeURIComponent(escape(atob(rStr)));
              else m.rawText = rStr;
              
              const proceedWithBuild = () => {
                  const group = new THREE.Group();
                  group.position.set(m.pos.x, m.pos.y, m.pos.z);
                  group.rotation.set(m.rot.x, m.rot.y, m.rot.z);
                  group.scale.set(m.scl.x, m.scl.y, m.scl.z);
                  const meshGroup = createGeometryFromModel(m);
                  group.add(meshGroup);
                  m.runtimeGroup = group;
                  if (m.type === 'draw' && hasSteampunkActive) {
                      group.visible = false;
                  }
                  globalGroup.add(group);
              };

              if (m.type === '3d-model') {
                  // ── Heightmap rebuild ──
                  if (m.format === 'heightmap' && m.heightData) {
                      const res = m.heightRes, hs = m.heightScale, cm = m.colorMode;
                      const hd = m.heightData;
                      const geo = new THREE.PlaneGeometry(res*0.8, res*0.8, res-1, res-1);
                      geo.rotateX(-Math.PI/2);
                      const pos2 = geo.attributes.position;
                      for(let i=0;i<pos2.count;i++) pos2.setY(i, hd[i]*hs);
                      pos2.needsUpdate = true; geo.computeVertexNormals();
                      let mat2;
                      if(cm === 'Texture' && m.imgB64) {
                          const tex = new THREE.TextureLoader().load(m.imgB64);
                          mat2 = new THREE.MeshPhongMaterial({map:tex,shininess:40});
                      } else {
                          const cfn={gradient:h=>new THREE.Color().setHSL(0.67-h*0.67,1,0.45+h*0.1),neon:h=>{if(h<0.5)return new THREE.Color(0,h*2,1);return new THREE.Color((h-0.5)*2,1,0);},thermal:h=>{if(h<0.33)return new THREE.Color(0,0,h*3);if(h<0.66)return new THREE.Color(0,(h-0.33)*3,1);return new THREE.Color((h-0.66)*3,1,0);},mono:h=>new THREE.Color(h,h,h)};
                          const fn=cfn[cm]||cfn.gradient;
                          const cols=[];
                          for(let i=0;i<pos2.count;i++){const col=fn(hd[i]);cols.push(col.r,col.g,col.b);}
                          geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));
                          mat2=new THREE.MeshPhongMaterial({vertexColors:true,shininess:60});
                      }
                      const hmesh=new THREE.Mesh(geo,mat2);
                      const hgrp=new THREE.Group(); hgrp.add(hmesh);
                      m.importedMesh=hgrp; proceedWithBuild();
                  }
                  // ── Audio-viz rebuild ──
                  else if (m.format === 'audio-viz') {
                      const BARS=m.avBars||32, barStyle=m.avBarStyle||'box', cs=m.avColorScheme||'spectrum';
                      const barW=40/BARS;
                      const cfn={spectrum:i=>new THREE.Color().setHSL(i/BARS*0.78,1,0.55),fire:i=>new THREE.Color().setHSL((i/BARS)*0.12,1,0.5),ocean:i=>new THREE.Color().setHSL(0.55+i/BARS*0.08,0.9,0.55),neon:i=>i%2===0?new THREE.Color(0,1,0.5):new THREE.Color(1,0,0.8)};
                      const gc=cfn[cs]||cfn.spectrum;
                      const avGroup=new THREE.Group();
                      const avBars=[]; // bars referenced directly — no clone
                      for(let i=0;i<BARS;i++){
                          let g2;
                          if(barStyle==='cylinder') g2=new THREE.CylinderGeometry(barW*0.4,barW*0.4,1,8);
                          else if(barStyle==='cone') g2=new THREE.ConeGeometry(barW*0.45,1,8);
                          else g2=new THREE.BoxGeometry(barW*0.8,1,barW*0.8);
                          const col=gc(i);
                          const bmat=new THREE.MeshPhongMaterial({color:col,emissive:col,emissiveIntensity:0.4});
                          const bar=new THREE.Mesh(g2,bmat);
                          bar.position.x=(i-BARS/2+0.5)*barW*1.3;
                          avGroup.add(bar); avBars.push(bar); // push original refs
                      }
                      m.importedMesh=avGroup;
                      // Wire up mic/audio in exported HTML
                      let avCtx=null,avAn=null,avSrc=null,avMic=null;
                      const initAV=()=>{
                        if(!avCtx){
                          avCtx=new(window.AudioContext||window.webkitAudioContext)();
                          avAn=avCtx.createAnalyser(); avAn.fftSize=256;
                          avAn.connect(avCtx.destination);
                        }
                        if(avCtx.state==='suspended') avCtx.resume();
                      };
                      // Add UI overlay
                      const avUI=document.createElement('div');
                      avUI.style='position:fixed;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:9;';
                      avUI.innerHTML='<button id="av-mic" style="padding:7px 14px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:20px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;">🎤 Microphone</button><label style="padding:7px 14px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:20px;color:#34d399;font-size:12px;font-weight:700;cursor:pointer;position:relative;">📁 MP3 File<input type="file" accept="audio/*" id="av-file" style="position:absolute;inset:0;opacity:0;cursor:pointer;"/></label><span id="av-status" style="padding:7px 10px;background:rgba(0,0,0,0.4);border-radius:20px;color:#64748b;font-size:11px;align-self:center;">No source</span>';
                      document.body.appendChild(avUI);
                      document.getElementById('av-mic').onclick=async()=>{
                        initAV();
                        if(avSrc){try{avSrc.disconnect();}catch(e){}}
                        if(avMic){avMic.getTracks().forEach(t=>t.stop());}
                        avMic=await navigator.mediaDevices.getUserMedia({audio:true}).catch(()=>null);
                        if(!avMic){document.getElementById('av-status').textContent='Mic denied';return;}
                        avSrc=avCtx.createMediaStreamSource(avMic);
                        avSrc.connect(avAn);
                        document.getElementById('av-status').textContent='🔴 Mic active';
                        document.getElementById('av-status').style.color='#10b981';
                      };
                      document.getElementById('av-file').onchange=e=>{
                        const f=e.target.files[0];if(!f)return; initAV();
                        if(avSrc){try{avSrc.disconnect();if(avSrc.stop)avSrc.stop();}catch(ex){}}
                        const r=new FileReader();
                        r.onload=ev=>{
                          avCtx.decodeAudioData(ev.target.result).then(buf=>{
                            avSrc=avCtx.createBufferSource();
                            avSrc.buffer=buf;
                            avSrc.connect(avAn);
                            avSrc.loop=true; avSrc.start();
                            document.getElementById('av-status').textContent='🎵 '+f.name;
                            document.getElementById('av-status').style.color='#10b981';
                          });
                        };
                        r.readAsArrayBuffer(f);
                      };
                      // Add avGroup DIRECTLY to scene (no clone) so avBars refs stay valid
                      const avRtGroup = new THREE.Group();
                      avRtGroup.position.set(m.pos.x, m.pos.y, m.pos.z);
                      avRtGroup.rotation.set(m.rot.x, m.rot.y, m.rot.z);
                      avRtGroup.scale.set(m.scl.x, m.scl.y, m.scl.z);
                      avRtGroup.add(avGroup);
                      m.runtimeGroup = avRtGroup;
                      globalGroup.add(avRtGroup);
                      // avBars references children of avGroup directly — no clone needed
                      scene.animCbs=scene.animCbs||[];
                      scene.animCbs.push(()=>{
                        if(!avAn) return;
                        if(avCtx && avCtx.state==='suspended') avCtx.resume();
                        const d=new Uint8Array(avAn.frequencyBinCount);
                        avAn.getByteFrequencyData(d);
                        avBars.forEach((b,i)=>{
                          const v=(d[i]||0)/255;
                          const h=Math.max(0.5,v*30);
                          b.scale.y=h; b.position.y=h/2;
                        });
                      });
                  }
                  // ── Standard 3D model formats ──
                  else {
                  const isBinary = m.format === 'glb' || m.format === 'stl';
                  let data = m.rawText;
                  if (isBinary) {
                      const binaryStr = atob(m.rawText);
                      const len = binaryStr.length;
                      const bytes = new Uint8Array(len);
                      for (let i = 0; i < len; i++) bytes[i] = binaryStr.charCodeAt(i);
                      data = bytes.buffer;
                  }
                  if (m.format === 'glb' || m.format === 'gltf') {
                      new THREE.GLTFLoader().parse(data, '', (gltf) => { m.importedMesh = gltf.scene; proceedWithBuild(); });
                  } else if (m.format === 'obj') {
                      m.importedMesh = new THREE.OBJLoader().parse(data); proceedWithBuild();
                  } else if (m.format === 'stl') {
                      const geo = new THREE.STLLoader().parse(data);
                      const mesh = new THREE.Mesh(geo);
                      const group = new THREE.Group(); group.add(mesh);
                      m.importedMesh = group; proceedWithBuild();
                  } else proceedWithBuild();
                  }
              } else {
                  proceedWithBuild();
              }
          } catch(e) { console.error(e); }
      });
  }

  if(THREE.FontLoader) {
      new THREE.FontLoader().load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => { 
          loadedFont = font; initModels(); 
      }, undefined, (err) => {
          console.warn("Font loading failed, falling back to initializing models without font", err);
          initModels();
      });
  } else { initModels(); }

  const hasSteampunkPro = config.find(x => x.format === 'steampunk-chrono-pro');
  if (hasSteampunkPro) {
      const sp = hasSteampunkPro.clockParts[0];
      const lang = "${window.currentLang || 'en'}";
      
      let stAudioCtx = null, stOsc = null, stGain = null;
      let stAlarmActive = false, stAlarmInt = null;

      const translations = {
          en: { title: "⚙️ Steampunk Pro (Standalone)", chrono_label: "⏱️ Chrono:", start_stop: "Start/Stop", reset: "Reset", alarm: "⏰ Alarm Time:", test_alarm: "Test Alarm Sound", silence: "🔕 Silence", status: "Standalone Mode Active", chrono_running: "Chrono Running...", chrono_stopped: "Chrono Stopped", chrono_reset: "Chrono Reset", adjust_hint: "✨ Click on the clock to adjust settings" },
          fr: { title: "⚙️ Steampunk Pro (Autonome)", chrono_label: "⏱️ Chrono:", start_stop: "Démarrer/Stop", reset: "Reset", alarm: "⏰ Alarme:", test_alarm: "Tester Alarme", silence: "🔕 Silencer", status: "Mode Autonome Actif", chrono_running: "Chrono Actif...", chrono_stopped: "Chrono Arrêté", chrono_reset: "Chrono Réinitialisé", adjust_hint: "✨ Cliquez sur l'horloge pour régler" },
          ro: { title: "⚙️ Steampunk Pro (Autonom)", chrono_label: "⏱️ Cronometru:", start_stop: "Pornește/Oprește", reset: "Reset", alarm: "⏰ Alarmă:", test_alarm: "Testează Alarma", silence: "🔕 Silențios", status: "Mod Autonom Activ", chrono_running: "Cronometru în desfășurare...", chrono_stopped: "Cronometru oprit", chrono_reset: "Cronometru resetat", adjust_hint: "✨ Faceți click pe ceas pentru a configura" },
          de: { title: "⚙️ Steampunk Pro (Eigenständig)", chrono_label: "⏱️ Chrono:", start_stop: "Start/Stopp", reset: "Reset", alarm: "⏰ Alarmzeit:", test_alarm: "Alarmton testen", silence: "🔕 Stummschalten", status: "Eigenständiger Modus Aktiv", chrono_running: "Chrono läuft...", chrono_stopped: "Chrono angehalten", chrono_reset: "Chrono zurückgesetzt", adjust_hint: "Anklicken zum Einstellen" },
          es: { title: "⚙️ Steampunk Pro (Autónomo)", chrono_label: "⏱️ Crono:", start_stop: "Iniciar/Detener", reset: "Reset", alarm: "⏰ Alarma:", test_alarm: "Probar Alarma", silence: "🔕 Silenciar", status: "Modo Autónomo Activo", chrono_running: "Cronómetro en marcha...", chrono_stopped: "Cronómetro detenido", chrono_reset: "Cronómetro restablecido", adjust_hint: "✨ Clic en el reloj para configurar" },
          it: { title: "⚙️ Steampunk Pro (Autonomo)", chrono_label: "⏱️ Cronometro:", start_stop: "Avvia/Arresta", reset: "Reset", alarm: "⏰ Sveglia:", test_alarm: "Prova Suono Sveglia", silence: "🔕 Silenzia", status: "Modalità Autonoma Attiva", chrono_running: "Cronometro in funzione...", chrono_stopped: "Cronometro arrestato", chrono_reset: "Cronometro ripristinato", adjust_hint: "✨ Clicca sul quadrante per impostare" }
      };

      const ui = document.createElement('div');
      ui.id = 'st-control-panel';
      ui.style = 'position:fixed;top:20px;right:20px;background:rgba(10,15,30,0.85);backdrop-filter:blur(10px);border:1px solid #d4af37;border-radius:12px;padding:15px;color:#d4af37;font-family:sans-serif;width:240px;box-shadow:0 10px 30px rgba(0,0,0,0.5);z-index:99;display:block;opacity:1;transition:opacity 0.3s ease-in-out;';
      ui.innerHTML = \`
          <!-- LANGUAGE SELECTOR -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:bold;">🌐 Language:</label>
              <select id="st-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ro">Română</option>
                  <option value="de">Deutsch</option>
                  <option value="es">Español</option>
                  <option value="it">Italiano</option>
              </select>
          </div>

          <div id="st-title-container" style="position:relative;font-weight:bold;text-align:center;margin-bottom:15px;font-size:16px;padding-right:20px;">
              <span data-key="title"></span>
              <span id="st-ui-close" style="position:absolute;top:-2px;right:-2px;cursor:pointer;font-size:16px;color:#aaa;transition:color 0.2s;">✕</span>
          </div>
          
          <div style="margin-bottom:15px;display:\${sp.clockType === 'chrono' ? 'block' : 'none'};">
              <label id="st-lbl-chrono" style="font-size:12px;color:#ccc;" data-key="chrono_label"></label>
              <div style="display:flex;gap:5px;margin-top:5px;">
                  <button id="st-btn-c-start" style="flex:1;background:#d4af37;color:#000;border:none;border-radius:4px;padding:6px;cursor:pointer;font-weight:bold;" data-key="start_stop"></button>
                  <button id="st-btn-c-reset" style="flex:1;background:#444;color:#fff;border:1px solid #d4af37;border-radius:4px;padding:6px;cursor:pointer;" data-key="reset"></button>
              </div>
          </div>
          
          <div style="margin-bottom:10px;display:\${sp.clockType === 'alarm' ? 'block' : 'none'};">
              <label id="st-lbl-alarm" style="font-size:12px;color:#ccc;" data-key="alarm"></label>
              <div style="display:flex;gap:5px;margin-top:5px;">
                  <input type="time" id="st-in-alarm" value="\${sp.alarmTime || '12:00'}" style="flex:1;background:#111;color:#d4af37;border:1px solid #d4af37;border-radius:4px;padding:5px;outline:none;" />
              </div>
              <button id="st-btn-a-test" style="width:100%;margin-top:8px;background:rgba(212,175,55,0.2);color:#d4af37;border:1px solid #d4af37;border-radius:4px;padding:6px;cursor:pointer;" data-key="test_alarm"></button>
          </div>
          <div id="st-status" style="font-size:11px;color:#a855f7;text-align:center;margin-top:10px;" data-key="status"></div>
      \`;
      document.body.appendChild(ui);

      const stLangSelect = ui.querySelector('#st-lang-select');
      const getStText = (key) => {
          const l = (stLangSelect && stLangSelect.value) || lang || 'en';
          return (translations[l] && translations[l][key]) || translations['en'][key];
      };

      const applyStLanguage = (langVal) => {
          const elements = ui.querySelectorAll('[data-key]');
          elements.forEach(el => {
              const key = el.getAttribute('data-key');
              if (translations[langVal] && translations[langVal][key]) {
                  if (el.id === 'st-btn-a-test') {
                      el.innerText = stAlarmActive ? translations[langVal]['silence'] : translations[langVal]['test_alarm'];
                  } else if (el.id === 'st-status') {
                      if (sp.chronoRunning) {
                          el.innerText = translations[langVal]['chrono_running'];
                      } else if (sp.chronoElapsed === 0) {
                          el.innerText = translations[langVal]['chrono_reset'] || translations[langVal]['status'];
                      } else {
                          el.innerText = translations[langVal]['chrono_stopped'];
                      }
                  } else {
                      el.innerHTML = translations[langVal][key];
                  }
              }
          });
      };

      if (stLangSelect) {
          stLangSelect.value = lang;
          stLangSelect.onchange = (e) => {
              applyStLanguage(e.target.value);
          };
      }

      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'st-ui-toggle-btn';
      toggleBtn.innerHTML = '⚙️';
      toggleBtn.style = 'position:fixed;top:20px;right:20px;width:44px;height:44px;background:rgba(10,15,30,0.85);backdrop-filter:blur(10px);border:1px solid #d4af37;border-radius:50%;color:#d4af37;font-size:20px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.4);z-index:98;display:none;align-items:center;justify-content:center;transition:all 0.3s;outline:none;';
      document.body.appendChild(toggleBtn);

      toggleBtn.onmouseover = () => { toggleBtn.style.transform = 'scale(1.1)'; toggleBtn.style.borderColor = '#fff'; };
      toggleBtn.onmouseout = () => { toggleBtn.style.transform = 'scale(1.0)'; toggleBtn.style.borderColor = '#d4af37'; };
      
      toggleBtn.onclick = () => {
          ui.style.display = 'block';
          toggleBtn.style.display = 'none';
          setTimeout(() => { ui.style.opacity = '1'; }, 10);
      };

      const styleTag = document.createElement('style');
      styleTag.innerHTML = \`
          @media (max-width: 600px) {
              #st-control-panel {
                  top: auto !important;
                  bottom: 12px !important;
                  right: 12px !important;
                  left: 12px !important;
                  width: auto !important;
                  max-height: 50vh !important;
                  overflow-y: auto !important;
              }
              #st-ui-toggle-btn {
                  top: auto !important;
                  bottom: 12px !important;
                  right: 12px !important;
              }
          }
      \`;
      document.head.appendChild(styleTag);
      
      const playBeep = () => {
          if (!stAudioCtx) stAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
          if (stAudioCtx.state === 'suspended') stAudioCtx.resume();
          stOsc = stAudioCtx.createOscillator();
          stGain = stAudioCtx.createGain();
          stOsc.type = 'triangle';
          stOsc.frequency.setValueAtTime(880, stAudioCtx.currentTime);
          stGain.gain.setValueAtTime(0.5, stAudioCtx.currentTime);
          stGain.gain.exponentialRampToValueAtTime(0.01, stAudioCtx.currentTime + 1.5);
          stOsc.connect(stGain);
          stGain.connect(stAudioCtx.destination);
          stOsc.start();
          stOsc.stop(stAudioCtx.currentTime + 1.5);
      };

      const btnStart = document.getElementById('st-btn-c-start');
      const btnReset = document.getElementById('st-btn-c-reset');
      if (btnStart) {
          btnStart.onclick = () => {
              sp.chronoRunning = !sp.chronoRunning;
              if (sp.chronoRunning) sp.chronoStartTime = Date.now() - (sp.chronoElapsed || 0);
              document.getElementById('st-status').innerText = sp.chronoRunning ? getStText('chrono_running') : getStText('chrono_stopped');
          };
          btnReset.onclick = () => {
              sp.chronoRunning = false; sp.chronoElapsed = 0;
              document.getElementById('st-status').innerText = getStText('chrono_reset');
          };
      }
      
      const btnTest = document.getElementById('st-btn-a-test');
      const inAlarm = document.getElementById('st-in-alarm');
      if (btnTest) {
          btnTest.onclick = () => {
              stAlarmActive = !stAlarmActive;
              if(stAlarmActive) {
                  btnTest.style.background = '#ef4444'; btnTest.style.color = '#fff'; btnTest.innerText = getStText('silence');
                  stAlarmInt = setInterval(playBeep, 500);
              } else {
                  btnTest.style.background = 'rgba(212,175,55,0.2)'; btnTest.style.color = '#d4af37'; btnTest.innerText = getStText('test_alarm');
                  clearInterval(stAlarmInt);
              }
          };
          inAlarm.onchange = (e) => { sp.alarmTime = e.target.value; };
      }

      scene.animCbs = scene.animCbs || [];
      scene.animCbs.push(() => {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          if (hh + ':' + mm === sp.alarmTime && now.getSeconds() === 0 && !stAlarmActive) {
              if (btnTest) btnTest.click();
          }
      });

      // Close button functionality
      const closeBtn = document.getElementById('st-ui-close');
      if (closeBtn) {
          closeBtn.onclick = () => {
              ui.style.opacity = '0';
              setTimeout(() => { 
                  ui.style.display = 'none'; 
                  if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'flex';
              }, 300);
          };
      }

      // Bilingual floating hint at the bottom-center
      const hint = document.createElement('div');
      hint.style = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(10,15,30,0.85);backdrop-filter:blur(8px);border:1px solid #d4af37;border-radius:20px;padding:10px 20px;color:#d4af37;font-family:sans-serif;font-size:13px;font-weight:bold;box-shadow:0 6px 20px rgba(0,0,0,0.4);z-index:98;opacity:1;transition:opacity 0.8s ease-in-out;pointer-events:none;white-space:nowrap;';
      hint.innerHTML = getStText('adjust_hint');
      document.body.appendChild(hint);
      
      setTimeout(() => {
          hint.style.opacity = '0';
          setTimeout(() => hint.remove(), 800);
      }, 6000);

      // Raycaster for click-to-show
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      window.addEventListener('click', (event) => {
          if (ui.contains(event.target) || (typeof toggleBtn !== 'undefined' && toggleBtn.contains(event.target))) return;
          
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(globalGroup.children, true);
          
          if (intersects.length > 0) {
              if (ui.style.display === 'none') {
                  ui.style.display = 'block';
                  if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'none';
                  setTimeout(() => { ui.style.opacity = '1'; }, 10);
              } else {
                  ui.style.opacity = '0';
                  setTimeout(() => { 
                      ui.style.display = 'none'; 
                      if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'flex';
                  }, 300);
              }
          }
      });

      applyStLanguage(lang);
  }


  const hasClockUltra = config.find(x => x.format === 'clock-ultra');
  if (hasClockUltra) {
      const sp = hasClockUltra.clockParts[0];
      const lang = "${window.currentLang || 'en'}";
      let isFR = lang === 'fr';
      let isRO = lang === 'ro';
      let isDE = lang === 'de';
      let isES = lang === 'es';
      let isIT = lang === 'it';
      let isEN = !isFR && !isRO && !isDE && !isES && !isIT;

      window.isFR = isFR;
      window.isRO = isRO;
      window.isDE = isDE;
      window.isES = isES;
      window.isIT = isIT;
      window.isEN = isEN;
      
      const translations = {
          en: {
              theme_preset: "Theme Preset",
              time_travel: "Time Travel",
              auto_return: "Auto Return",
              cursor_magnetism: "Cursor Magnetism",
              subdial_mode: "Sub-Dial Mode",
              chrono: "Chronograph",
              battery: "Battery Gauge",
              gmt: "GMT Dual Time",
              fps: "Rendering FPS",
              countdown: "Event Countdown",
              target_datetime: "Target Date/Time",
              stopwatch: "Chronograph Stopwatch",
              start: "Start",
              pause: "Pause",
              reset: "Reset",
              alarm: "Alarm (HH:MM)",
              test_alarm: "Test Alarm Sound",
              silence: "Silence",
              radio: "Live Internet Radio",
              frequency: "Frequency",
              volume: "Volume",
              tick: "Ambient Tick-Tock",
              chime: "Westminster Chimes",
              test_chime: "Test Westminster Chime",
              extras: "Ultra-Premium Extras",
              navmenu: "3D Website Menu Navigation",
              analytics: "Live Web Analytics Simulation",
              bluelight: "Night Blue-Light Filter",
              weathersync: "Cyclic Weather Sync",
              pomodoro: "Pomodoro Focus Timer",
              focus_min: "Focus Minutes",
              asmr: "ASMR Ambient Mixer",
              rain: "Rain",
              wind: "Wind",
              beats: "Beats",
              ekg: "EKG Waveform Pulse",
              status_active: "Ultra Mode Active",
              click_hint: "✨ Click on the clock to configure"
          },
          fr: {
              theme_preset: "Thème Prédéfini",
              time_travel: "Voyage dans le Temps",
              auto_return: "Retour Auto",
              cursor_magnetism: "Magnetisme du Curseur",
              subdial_mode: "Mode Sous-Cadran",
              chrono: "Chronographe",
              battery: "Niveau Batterie",
              gmt: "Second Fuseau GMT",
              fps: "FPS / Performance",
              countdown: "Compte à Rebours",
              target_datetime: "Cible (Date/Heure)",
              stopwatch: "Chronographe",
              start: "Démarrer",
              pause: "Pause",
              reset: "Réinit.",
              alarm: "Alarme",
              test_alarm: "Tester Alarme",
              silence: "Silencer",
              radio: "Radio Internet Live",
              frequency: "Fréquence",
              volume: "Volume",
              tick: "Tic-Tac Ambiant",
              chime: "Carillon Westminster",
              test_chime: "Tester le Carillon",
              extras: "Extras Ultra-Premium",
              navmenu: "Menu Redirection Site 3D",
              analytics: "Simulation Analytique Web",
              bluelight: "Filtre Lumière Bleue Nuit",
              weathersync: "Synchro Météo Cyclique",
              pomodoro: "Minuteur Pomodoro Focus",
              focus_min: "Minutes Focus",
              asmr: "Mixeur ASMR Ambiant",
              rain: "Pluie",
              wind: "Vent",
              beats: "Ondes",
              ekg: "Onde d'Impulsion EKG",
              status_active: "Mode Ultra Actif",
              click_hint: "✨ Cliquez sur le cadran pour configurer"
          },
          ro: {
              theme_preset: "Temă Predefinită",
              time_travel: "Călătorie în Timp",
              auto_return: "Revenire Auto",
              cursor_magnetism: "Magnetism Cursor",
              subdial_mode: "Mod Cadran Secundar",
              chrono: "Cronograf",
              battery: "Nivel Baterie",
              gmt: "Fus Orar GMT",
              fps: "FPS / Performanță",
              countdown: "Numărătoare Inversă",
              target_datetime: "Dată/Oră Țintă",
              stopwatch: "Cronometru Cronograf",
              start: "Pornește",
              pause: "Pauză",
              reset: "Resetează",
              alarm: "Alarmă",
              test_alarm: "Testează Alarma",
              silence: "Silențios",
              radio: "Radio Internet Live",
              frequency: "Frecvență",
              volume: "Volum",
              tick: "Tic-Tac Ambient",
              chime: "Clopote Westminster",
              test_chime: "Testează Clopotele",
              extras: "Funcții Extra Ultra-Premium",
              navmenu: "Navigare Meniu Site 3D",
              analytics: "Simulare Analize Live",
              bluelight: "Filtru Lumière Bleue Nuit",
              weathersync: "Sincronizare Meteo",
              pomodoro: "Temporizator Pomodoro",
              focus_min: "Minute Focus",
              asmr: "Mixer Ambiental ASMR",
              rain: "Ploaie",
              wind: "Vânt",
              beats: "Bătăi",
              ekg: "Impuls EKG",
              status_active: "Mod Ultra Activ",
              click_hint: "💬 Faceți click pe ceas pentru a configura"
          },
          de: {
              theme_preset: "Design-Vorlage",
              time_travel: "Zeitreise-Modus",
              auto_return: "Auto-Rückkehr",
              cursor_magnetism: "Zeigermagnetismus",
              subdial_mode: "Hilfszifferblatt",
              chrono: "Chronograph",
              battery: "Batterieanzeige",
              gmt: "GMT Zweite Zeitzone",
              fps: "FPS-Leistung",
              countdown: "Countdown-Timer",
              target_datetime: "Zielzeitpunkt",
              stopwatch: "Stoppuhr-Chronograph",
              start: "Starten",
              pause: "Pause",
              reset: "Zurücksetzen",
              alarm: "Wecker (HH:MM)",
              test_alarm: "Alarmton testen",
              silence: "Stummschalten",
              radio: "Live-Internetradio",
              frequency: "Frequenz",
              volume: "Lautstärke",
              tick: "Umgebungs-Ticken",
              chime: "Westminster-Glockenspiel",
              test_chime: "Glockenspiel testen",
              extras: "Premium-Zusatzfunktionen",
              navmenu: "3D-Webseitenmenü-Navigation",
              analytics: "Live-Webanalysen-Simulation",
              bluelight: "Nacht-Blaulichtfilter",
              weathersync: "Zyklischer Wettersync",
              pomodoro: "Pomodoro-Fokus-Timer",
              focus_min: "Fokus-Minuten",
              asmr: "ASMR-Umgebungs-Mixer",
              rain: "Regen",
              wind: "Wind",
              beats: "Schläge",
              ekg: "EKG-Wellenimpuls",
              status_active: "Ultra-Modus Aktiv",
              click_hint: "💬 Klicken Sie auf die Uhr zum Konfigurieren"
          },
          es: {
              theme_preset: "Diseño Predeterminado",
              time_travel: "Viaje en el Tiempo",
              auto_return: "Retorno Automático",
              cursor_magnetism: "Magnetismo del Cursor",
              subdial_mode: "Esfera Secundaria",
              chrono: "Cronógrafo",
              battery: "Nivel de Batería",
              gmt: "GMT Doble Hora",
              fps: "FPS de Renderizado",
              countdown: "Cuenta Regresiva",
              target_datetime: "Fecha/Hora Objetivo",
              stopwatch: "Cronómetro del Cronógrafo",
              start: "Iniciar",
              pause: "Pausa",
              reset: "Restablecer",
              alarm: "Alarma (HH:MM)",
              test_alarm: "Probar Alarma",
              silence: "Silenciar",
              radio: "Radio por Internet en Vivo",
              frequency: "Frecuencia",
              volume: "Volumen",
              tick: "Tic-Tac Ambiental",
              chime: "Campanas de Westminster",
              test_chime: "Probar Campanas",
              extras: "Extras Ultra-Premium",
              navmenu: "Conexión Menú Sitio 3D",
              analytics: "Simulación de Analíticas Web",
              bluelight: "Filtro de Luz Azul Nocturna",
              weathersync: "Sincronización de Clima",
              pomodoro: "Temporizador Pomodoro Focus",
              focus_min: "Minutos de Enfoque",
              asmr: "Mezclador ASMR Ambiental",
              rain: "Lluvia",
              wind: "Viento",
              beats: "Pulsos",
              ekg: "Pulso EKG",
              status_active: "Modo Ultra Activo",
              click_hint: "💬 Haga clic en el reloj para configurar"
          },
          it: {
              theme_preset: "Temi Predefiniti",
              time_travel: "Viaggio nel Tempo",
              auto_return: "Ritorno Automatico",
              cursor_magnetism: "Magnetismo del Cursore",
              subdial_mode: "Quadrante Secondario",
              chrono: "Cronografo",
              battery: "Livello Batteria",
              gmt: "GMT Doppio Fuso Orario",
              fps: "FPS di Rendering",
              countdown: "Conto alla Rovescia",
              target_datetime: "Data/Ora Obiettivo",
              stopwatch: "Cronometro Cronografo",
              start: "Avvia",
              pause: "Pausa",
              reset: "Ripristina",
              alarm: "Sveglia (HH:MM)",
              test_alarm: "Prova Suono Sveglia",
              silence: "Silenzia",
              radio: "Radio Internet in Diretta",
              frequency: "Frequenza",
              volume: "Volume",
              tick: "Tic-Tac Ambientale",
              chime: "Campane di Westminster",
              test_chime: "Prova Campane",
              extras: "Extra Ultra-Premium",
              navmenu: "Navigazione Menu Sito 3D",
              analytics: "Simulazione Analitica Live",
              bluelight: "Filtro Luce Blu Notte",
              weathersync: "Sincronizzazione Meteo",
              pomodoro: "Timer Pomodoro Focus",
              focus_min: "Minuti di Messa a Fuoco",
              asmr: "Mixer Ambientale ASMR",
              rain: "Pioggia",
              wind: "Vento",
              beats: "Battiti",
              ekg: "Impulso EKG",
              status_active: "Modalità Ultra Attiva",
              click_hint: "💬 Clicca sul quadrante per configurare"
          }
      };

      let sectionsData = [];

      // Standalone Toast function
      const toastContainer = document.createElement('div');
      toastContainer.style = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(8,12,28,0.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid #06b6d4;border-radius:12px;padding:12px 24px;color:#22d3ee;font-family:sans-serif;font-size:14px;font-weight:bold;box-shadow:0 10px 40px rgba(0,0,0,0.6),0 0 20px rgba(6,182,212,0.3);z-index:99999;opacity:0;transition:opacity 0.4s ease-in-out, transform 0.4s ease-in-out;transform:translate(-50%, 20px);pointer-events:none;white-space:nowrap;';
      document.body.appendChild(toastContainer);
      
      let toastTimeout = null;
      window.toast = (msg) => {
          if (toastTimeout) clearTimeout(toastTimeout);
          toastContainer.textContent = msg;
          toastContainer.style.display = 'block';
          toastContainer.offsetHeight; // Force reflow
          toastContainer.style.opacity = '1';
          toastContainer.style.transform = 'translate(-50%, 0)';
          
          toastTimeout = setTimeout(() => {
              toastContainer.style.opacity = '0';
              toastContainer.style.transform = 'translate(-50%, 20px)';
          }, 3500);
      };

      if (sp.navigatorMenuEnabled) {
          const customStyle = document.createElement('style');
          customStyle.innerHTML = \`
              body {
                  margin: 0 !important;
                  padding: 0 !important;
                  overflow-y: auto !important;
                  overflow-x: hidden !important;
                  height: auto !important;
                  background: #050815 !important;
                  scroll-behavior: smooth !important;
              }
              canvas {
                  position: fixed !important;
                  top: 0 !important;
                  left: 0 !important;
                  width: 100vw !important;
                  height: 100vh !important;
                  z-index: -1 !important;
                  pointer-events: auto !important;
              }
              .mock-section {
                  width: 100%;
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding: 40px 20px;
                  box-sizing: border-box;
                  position: relative;
                  z-index: 10;
                  pointer-events: none;
              }
              .mock-card {
                  max-width: 600px;
                  width: 90%;
                  background: rgba(8, 12, 28, 0.75);
                  backdrop-filter: blur(12px);
                  -webkit-backdrop-filter: blur(12px);
                  border: 1px solid rgba(6, 182, 212, 0.3);
                  border-radius: 16px;
                  padding: 30px;
                  color: #cbd5e1;
                  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.15);
                  pointer-events: auto;
                  transition: transform 0.4s ease, border-color 0.4s ease;
                  font-family: sans-serif;
              }
              .mock-card:hover {
                  transform: translateY(-5px);
                  border-color: rgba(6, 182, 212, 0.6);
              }
              .mock-card h2 {
                  margin-top: 0;
                  font-size: 28px;
                  background: linear-gradient(90deg, #22d3ee, #818cf8);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  letter-spacing: -0.5px;
                  display: flex;
                  align-items: center;
                  gap: 10px;
              }
              .mock-card p {
                  font-size: 14px;
                  line-height: 1.6;
                  color: #94a3b8;
              }
              .mock-card .meta-tag {
                  display: inline-block;
                  padding: 4px 8px;
                  background: rgba(6, 182, 212, 0.15);
                  color: #22d3ee;
                  border-radius: 6px;
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 12px;
              }
          \`;
          document.head.appendChild(customStyle);
          
          const sectionsData = [
              {
                  id: 'home',
                  title: {
                      en: '🏠 Welcome Home',
                      fr: '🏠 Bienvenue à la Maison',
                      ro: '🏠 Bun Venit Acasă',
                      de: '🏠 Willkommen',
                      es: '🏠 Bienvenido a Inicio',
                      it: '🏠 Benvenuto a Casa'
                  },
                  desc: {
                      en: 'Click hours on the 3D clock dial to navigate smooth-scrolling sections! You can also drag the clock to see it in full interactive 3D.',
                      fr: 'Cliquez sur les heures du cadran 3D pour naviguer de manière fluide ! Vous pouvez également faire tourner le cadran en 3D.',
                      ro: 'Faceți click pe orele de pe cadranul 3D pentru a naviga prin secțiuni cu derulare lină! De asemenea, puteți trage ceasul pentru a-l vedea în 3D interactiv.',
                      de: 'Klicken Sie auf die Stunden des 3D-Zifferblatts, um durch die Abschnitte zu scrollen! Sie können die Uhr auch ziehen, um sie in 3D zu betrachten.',
                      es: '¡Haga clic en las horas del reloj 3D para navegar por las secciones! También puede arrastrar el reloj para verlo en 3D interactivo.',
                      it: 'Fai clic sulle ore del quadrante 3D per navigare nelle sezioni! Puoi anche trascinare l\'orologio per vederlo in 3D interattivo.'
                  }
              },
              {
                  id: 'features',
                  title: {
                      en: '✨ Core Features',
                      fr: '✨ Fonctionnalités Clés',
                      ro: '✨ Caracteristici Principale',
                      de: '✨ Kernfunktionen',
                      es: '✨ Características Clave',
                      it: '✨ Caratteristiche Principali'
                  },
                  desc: {
                      en: 'Experience the next generation of modular 3D widgets. Seamlessly integrated into host websites with beautiful neon lighting, glassmorphic panels, and offline support.',
                      fr: 'Découvrez la nouvelle génération de widgets 3D modulaires. Parfaitement intégrés avec des effets néon, des panneaux glassmorphes et un fonctionnement hors ligne.',
                      ro: 'Experimentați următoarea generație de widget-uri 3D modulare. Integrate perfect în site-urile gazdă, cu iluminare neon superbă, panouri glassmorfice și suport offline.',
                      de: 'Erleben Sie die nächste Generation modularer 3D-Widgets. Nahtlos in Host-Websites integriert, mit Neonbeleuchtung, Glassmorphismus-Panels und Offline-Support.',
                      es: 'Experimente la próxima generación de widgets 3D modulares. Integrados sin problemas en sitios web con iluminación de neón y paneles de vidrio.',
                      it: 'Sperimenta la prossima generazione di widget 3D moduli. Integrati perfettamente nei siti web con illuminazione al neon e pannelli in vetro.'
                  }
              },
              {
                  id: 'about',
                  title: {
                      en: '🧭 About Our Tech',
                      fr: '🧭 À propos de notre Technologie',
                      ro: '🧭 Despre Tehnologia Noastră',
                      de: '🧭 Über unsere Technologie',
                      es: '🧭 Sobre Nuestra Tecnología',
                      it: '🧭 Informazioni sulla Tecnologia'
                  },
                  desc: {
                      en: 'Synthesizing Audio-ASMR waves, real-time battery monitoring, custom DXF rendering, and Orbit controls directly within an optimized WebGL context.',
                      fr: 'Synthèse d\'ondes Audio-ASMR, surveillance de batterie en temps réel, rendu de fichiers DXF personnalisés et contrôles Orbit dans un contexte WebGL optimisé.',
                      ro: 'Sinteză de unde Audio-ASMR, monitorizarea bateriei în timp real, redare DXF personalizată și controale Orbit direct într-un context WebGL optimizat.',
                      de: 'Synthese von Audio-ASMR-Wellen, Echtzeit-Batterieüberwachung, benutzerdefiniertes DXF-Rendering und Orbit-Steuerung in einem optimierten WebGL-Kontext.',
                      es: 'Síntesis de ondas de Audio-ASMR, monitoreo de batería en tiempo real, renderizado de archivos DXF y controles Orbit en un contexto WebGL optimizado.',
                      it: 'Sintesi di onde Audio-ASMR, monitoraggio della batteria in tempo reale, rendering di file DXF e controlli Orbit in un contesto WebGL ottimizzato.'
                  }
              },
              {
                  id: 'services',
                  title: {
                      en: '💼 Professional Services',
                      fr: '💼 Services Professionnels',
                      ro: '💼 Servicii Profesionale',
                      de: '💼 Professionelle Dienstleistungen',
                      es: '💼 Servicios Profesionales',
                      it: '💼 Servizi Professionali'
                  },
                  desc: {
                      en: 'We provide state-of-the-art 3D visualizations, interactive interfaces, responsive design tools, and custom branding integrations for premium web apps.',
                      fr: 'Nous fournissons des visualisations 3D de pointe, des interfaces interactives, des outils de design réactifs et des intégrations de marque personnalisées.',
                      ro: 'Oferim vizualizări 3D de ultimă generație, interfețe interactive, instrumente de design adaptiv și integrări de brand personalizate pentru aplicații web premium.',
                      de: 'Wir bieten modernste 3D-Visualisierungen, interaktive Schnittstellen, reaktionsschnelle Design-Tools und kundenspezifische Markenintegrationen für Premium-Web-Apps.',
                      es: 'Ofrecemos visualizaciones 3D de última generación, interfaces interactivas, herramientas de diseño adaptativo e integración de marca para aplicaciones web premium.',
                      it: 'Offriamo visualizzazioni 3D all\'avanguardia, interfacce interattive, strumenti di design reattivo e integrazioni di branding personalizzate per app web premium.'
                  }
              },
              {
                  id: 'pricing',
                  title: {
                      en: '💳 Flexible Pricing Plans',
                      fr: '💳 Formules de Tarification',
                      ro: '💳 Planuri de Tarife Flexibile',
                      de: '💳 Flexible Preispläne',
                      es: '💳 Planes de Precios Flexibles',
                      it: '💳 Piani de Tariffe Flessibili'
                  },
                  desc: {
                      en: 'Select the tier that fits your workspace. Enjoy full access to advanced simulation dashboards, collaboration networks, and custom silhouette shapes.',
                      fr: 'Choisissez la formule adaptée à votre espace. Bénéficiez d\'un accès complet aux tableaux de bord de simulation avancés et aux silhouettes personnalisées.',
                      ro: 'Selectați nivelul care se potrivește spațiului dvs. de lucru. Bucurați-vă de acces complet la panouri de simulare avansate, rețele de colaborare și forme personalizate.',
                      de: 'Wählen Sie die Stufe, die zu Ihrem Arbeitsbereich passt. Genießen Sie vollen Zugriff auf erweiterte Simulations-Dashboards und benutzerdefinierte Formen.',
                      es: 'Seleccione el nivel que se adapte a su espacio de trabajo. Disfrute de acceso completo a paneles de simulación avanzados y formas personalizadas.',
                      it: 'Seleziona il livello adatto al tuo spazio di lavoro. Goditi l\'accesso completo a dashboard di simulazione avanzate e forme personalizzate.'
                  }
              },
              {
                  id: 'portfolio',
                  title: {
                      en: '🎨 Creative Portfolio',
                      fr: '🎨 Portfolio Créatif',
                      ro: '🎨 Portofoliu Creativ',
                      de: '🎨 Kreatives Portfolio',
                      es: '🎨 Portafolio Creativo',
                      it: '🎨 Portfolio Creativo'
                  },
                  desc: {
                      en: 'A curated gallery of responsive holographic models, parametric mathematical surfaces, timeline rivers, and procedural landscape simulations.',
                      fr: 'Une galerie de modèles holographiques réactifs, de surfaces mathématiques paramétriques et de simulations de paysages provoquées.',
                      ro: 'O galerie selectată de modele holografice adaptive, suprafețe matematice parametrice, râuri cronologice și simulări procedurale de peisaje.',
                      de: 'Eine kuratierte Galerie reaktionsschneller holografischer Modelle, parametrischer mathematischer Oberflächen und prozeduraler Landschaftssimulationen.',
                      es: 'Una galería seleccionada de modelos holográficos adaptativos, superficies matemáticas paramétricas y simulaciones de paisajes procedimentales.',
                      it: 'Una galleria curata di modelli olografici reattivi, superfici matematiche parametriche e simulazioni di paesaggi procedurali.'
                  }
              },
              {
                  id: 'testimonials',
                  title: {
                      en: '💬 Client Feedback',
                      fr: '💬 Témoignages Clients',
                      ro: '💬 Feedback-ul Clienților',
                      de: '💬 Kundenfeedback',
                      es: '💬 Testimonios de Clientes',
                      it: '💬 Opinioni dei Clienti'
                  },
                  desc: {
                      en: '"The integration of the 3D Clock Ultra on our homepage has increased visitor engagement time significantly. The ASMR ambient background is unique!"',
                      fr: '"L\'intégration de la Clock Ultra 3D sur notre page d\'accueil a augmenté le temps d\'engagement des visiteurs de manière significative. L\'ASMR ambiant est unique !"',
                      ro: '"Integrarea ceasului 3D Clock Ultra pe pagina noastră de pornire a crescut semnificativ timpul de implicare a vizitatorilor. Fundalul ambiental ASMR este unic!"',
                      de: '"Die Integration der 3D Clock Ultra auf unserer Homepage hat die Verweildauer der Besucher deutlich erhöht. Der ASMR-Hintergrund ist einzigartig!"',
                      es: '"La integración de 3D Clock Ultra en nuestra página de inicio ha aumentado significativamente el tiempo de participación de los visitantes. ¡El ASMR ambiental es único!"',
                      it: '"L\'integrazione del 3D Clock Ultra sulla nostra homepage ha aumentato notevolmente il tempo di permanenza dei visitatori. Il sottofondo ASMR è unico!"'
                  }
              },
              {
                  id: 'faq',
                  title: {
                      en: '❓ Frequent Questions',
                      fr: '❓ Questions Fréquentes',
                      ro: '❓ Întrebări Frecvente',
                      de: '❓ Häufige Fragen',
                      es: '❓ Preguntas Frecuentes',
                      it: '❓ Domande Frequenti'
                  },
                  desc: {
                      en: 'Does it work offline? Yes. Are assets loaded from external CDN? Only library dependencies. Can I change colors? Yes, fully customizable in the control panel.',
                      fr: 'Fonctionne-t-il hors ligne ? Oui. Les ressources sont-elles chargées depuis un CDN externe ? Uniquement les bibliothèques. Puis-je changer les couleurs ? Oui, via le panneau.',
                      ro: 'Funcționează offline? Da. Sunt resursele încărcate de pe un CDN extern? Doar bibliotecile necesare. Pot schimba culorile? Da, complet personalizabile în panou.',
                      de: 'Funktioniert es offline? Ja. Werden Ressourcen von externen CDNs geladen? Nur Bibliotheken. Kann ich die Farben ändern? Ja, im Bedienfeld anpassbar.',
                      es: '¿Funciona sin conexión? Sí. ¿Se cargan los recursos desde un CDN externo? Solo las bibliotecas. ¿Puedo cambiar los colores? Sí, en el panel.',
                      it: 'Funziona offline? Sì. Le risorse sono caricate da CDN esterni? Solo le librerie. Posso cambiare i colori? Sì, nel pannello di controllo.'
                  }
              },
              {
                  id: 'contact',
                  title: {
                      en: '✉️ Contact & Support',
                      fr: '✉️ Contact & Support',
                      ro: '✉️ Contact și Suport',
                      de: '✉️ Kontakt & Support',
                      es: '✉️ Contacto y Soporte',
                      it: '✉️ Contatti e Supporto'
                  },
                  desc: {
                      en: 'Get in touch for custom 3D integrations or licensing queries. Our development team is ready to assist you in launching interactive landing pages.',
                      fr: 'Contactez-nous pour des intégrations 3D sur mesure ou des demandes de licence. Notre équipe de développement est prête à vous aider.',
                      ro: 'Contactați-ne pentru integrări 3D personalizate sau întrebări privind licențierea. Echipa noastră este gata să vă ajute să lansați pagini interactive.',
                      de: 'Kontaktieren Sie uns für kundenspezifische 3D-Integrationen oder Lizenzanfragen. Unser Entwicklerteam steht Ihnen gerne zur Verfügung.',
                      es: 'Contáctenos para integraciones 3D personalizadas o consultas de licencia. Nuestro equipo de desarrollo está listo para ayudarle.',
                      it: 'Contattaci per integrazioni 3D personalizzate o domande sulle licenze. Il nostro team di sviluppo è pronto ad aiutarti.'
                  }
              },
              {
                  id: 'footer',
                  title: {
                      en: '⚓ Footer & Copyright',
                      fr: '⚓ Pied de page',
                      ro: '⚓ Footer și Drepturi de Autor',
                      de: '⚓ Fußzeile & Urheberrecht',
                      es: '⚓ Pie de Página y Derechos de Autor',
                      it: '⚓ Piè di Pagina e Copyright'
                  },
                  desc: {
                      en: 'Clock Ultra Standalone Widget © 2026. All rights reserved. Powered by Three.js WebGL Engine.',
                      fr: 'Widget Autonome Clock Ultra © 2026. Tous droits réservés. Motorisé par le moteur WebGL Three.js.',
                      ro: 'Widget autonom Clock Ultra © 2026. Toate drepturile rezervate. Creat cu motorul WebGL Three.js.',
                      de: 'Clock Ultra Eigenständiges Widget © 2026. Alle Rechte vorbehalten. Unterstützt von der Three.js WebGL Engine.',
                      es: 'Widget Autónomo Clock Ultra © 2026. Todos los derechos reservados. Desarrollado con el motor WebGL Three.js.',
                      it: 'Widget autonomo Clock Ultra © 2026. Tutti i diritti riservati. Sviluppato con il motore WebGL Three.js.'
                  }
              }
          ];
          
          sectionsData.forEach(sec => {
              const secEl = document.createElement('div');
              secEl.id = sec.id;
              secEl.className = 'mock-section';
              
              const cardEl = document.createElement('div');
              cardEl.className = 'mock-card';
              
              const tagEl = document.createElement('div');
              tagEl.className = 'meta-tag';
              tagEl.textContent = 'SECTION: #' + sec.id.toUpperCase();
              cardEl.appendChild(tagEl);
              
              const titleEl = document.createElement('h2');
              titleEl.innerHTML = sec.title[lang] || sec.title.en;
              cardEl.appendChild(titleEl);
              
              const descEl = document.createElement('p');
              descEl.innerHTML = sec.desc[lang] || sec.desc.en;
              cardEl.appendChild(descEl);
              
              secEl.appendChild(cardEl);
              document.body.appendChild(secEl);
          });

      }

      function makeElementDraggable(elmnt, dragHandle) {
          let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          if (dragHandle) {
              dragHandle.style.cursor = 'move';
              dragHandle.onpointerdown = dragMouseDown;
          } else {
              elmnt.onpointerdown = dragMouseDown;
          }

          function dragMouseDown(e) {
              const tag = e.target.tagName.toLowerCase();
              if (tag === 'input' || tag === 'button' || tag === 'select' || tag === 'textarea' || e.target.closest('button') || e.target.closest('input') || e.target.closest('#cu-ui-close')) {
                  return;
              }
              e = e || window.event;
              e.preventDefault();
              pos3 = e.clientX;
              pos4 = e.clientY;
              
              const rect = elmnt.getBoundingClientRect();
              elmnt.style.left = rect.left + 'px';
              elmnt.style.top = rect.top + 'px';
              elmnt.style.right = 'auto';
              elmnt.style.bottom = 'auto';

              document.onpointermove = elementDrag;
              document.onpointerup = closeDragElement;
          }

          function elementDrag(e) {
              e = e || window.event;
              e.preventDefault();
              pos1 = pos3 - e.clientX;
              pos2 = pos4 - e.clientY;
              pos3 = e.clientX;
              pos4 = e.clientY;
              
              let newTop = elmnt.offsetTop - pos2;
              let newLeft = elmnt.offsetLeft - pos1;
              
              const rect = elmnt.getBoundingClientRect();
              const minLeft = 0;
              const maxLeft = window.innerWidth - rect.width;
              const minTop = 0;
              const maxTop = window.innerHeight - rect.height;
              
              if (newLeft < minLeft) newLeft = minLeft;
              if (newLeft > maxLeft) newLeft = maxLeft;
              if (newTop < minTop) newTop = minTop;
              if (newTop > maxTop) newTop = maxTop;

              elmnt.style.top = newTop + "px";
              elmnt.style.left = newLeft + "px";
          }

          function closeDragElement() {
              document.onpointermove = null;
              document.onpointerup = null;
          }
      }
      
      let cuPlaybackCtx = null;
      let cuAlarmActive = false, cuAlarmInt = null;
      let lastTickedSecond = -1;

      // Radio state variables
      let radioAudio = null;
      let radioStaticNode = null;
      let radioStaticGain = null;

      // ASMR Soundscape state variables
      let soundscapeRainGain = null, soundscapeRainSource = null;
      let soundscapeWindGain = null, soundscapeWindSource = null, soundscapeWindFilter = null, soundscapeWindLFO = null;
      let soundscapeBinauralGain = null, soundscapeBinauralSourceL = null, soundscapeBinauralSourceR = null;

      const radioStations = [
          { freq: 90.2, name: 'Lofi Cafe', url: 'https://ice1.somafm.com/groovesalad-128-mp3' },
          { freq: 94.5, name: 'Jazz Classics', url: 'https://jazz.streamr.ru/jazz-128.mp3' },
          { freq: 98.8, name: 'Cyber Synth', url: 'https://ice1.somafm.com/defcon-128-mp3' },
          { freq: 102.4, name: 'Deep Chill', url: 'https://ice1.somafm.com/lush-128-mp3' },
          { freq: 106.8, name: 'Electro Dance', url: 'https://ice1.somafm.com/beatblender-128-mp3' }
      ];

      const getCuPlaybackContext = () => {
          if (!cuPlaybackCtx) {
              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
              cuPlaybackCtx = new AudioContextClass();
          }
          if (cuPlaybackCtx && cuPlaybackCtx.state === 'suspended') {
              cuPlaybackCtx.resume().catch(() => {});
          }
          return cuPlaybackCtx;
      };
      window.getCuPlaybackContext = getCuPlaybackContext;

      const ensureRadioStatic = () => {
          try {
              const ctx = getCuPlaybackContext();
              if (!ctx) return;
              if (!radioStaticGain) {
                  radioStaticGain = ctx.createGain();
                  radioStaticGain.gain.setValueAtTime(0, ctx.currentTime);
                  radioStaticGain.connect(ctx.destination);
              }
              if (!radioStaticNode) {
                  const bufferSize = 2 * ctx.sampleRate;
                  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                  const output = noiseBuffer.getChannelData(0);
                  for (let i = 0; i < bufferSize; i++) {
                      output[i] = Math.random() * 2 - 1;
                  }
                  radioStaticNode = ctx.createBufferSource();
                  radioStaticNode.buffer = noiseBuffer;
                  radioStaticNode.loop = true;
                  radioStaticNode.connect(radioStaticGain);
                  radioStaticNode.start(0);
              }
          } catch(e) {}
      };

      const playRadioStation = (url) => {
          if (!radioAudio) {
              radioAudio = new Audio();
          }
          if (radioAudio.src !== url) {
              radioAudio.src = url;
              radioAudio.load();
          }
          if (radioAudio.paused) {
              radioAudio.play().catch(() => {});
          }
      };

      const pauseRadioStation = () => {
          if (radioAudio && !radioAudio.paused) {
              radioAudio.pause();
          }
      };

      const stopRadioAudio = () => {
          pauseRadioStation();
          if (radioStaticNode) {
              try { radioStaticNode.stop(); } catch(e) {}
              radioStaticNode = null;
          }
          if (radioStaticGain) {
              try { radioStaticGain.disconnect(); } catch(e) {}
              radioStaticGain = null;
          }
      };

      const tuneRadio = () => {
          if (!sp.radioEnabled) {
              stopRadioAudio();
              return;
          }
          let nearest = null;
          let minDist = 999;
          for (const st of radioStations) {
              const dist = Math.abs(sp.radioFrequency - st.freq);
              if (dist < minDist) {
                  minDist = dist;
                  nearest = st;
              }
          }
          ensureRadioStatic();
          let staticVol = 0;
          let stationVol = 0;
          if (minDist <= 0.201) {
              const strength = 1.0 - (minDist / 0.2);
              stationVol = strength * sp.radioVolume;
              staticVol = (1.0 - strength) * 0.45 * sp.radioVolume;
              playRadioStation(nearest.url);
          } else {
              staticVol = 0.45 * sp.radioVolume;
              stationVol = 0;
              pauseRadioStation();
          }
          if (radioStaticGain && cuPlaybackCtx) {
              const now = cuPlaybackCtx.currentTime;
              radioStaticGain.gain.setValueAtTime(staticVol, now);
          }
          if (radioAudio) {
              radioAudio.volume = stationVol;
          }
      };

      const playTone = (freq, startTime, duration) => {
          try {
              const ctx = getCuPlaybackContext();
              const osc1 = ctx.createOscillator();
              const gain1 = ctx.createGain();
              osc1.type = 'sine';
              osc1.frequency.setValueAtTime(freq, startTime);
              gain1.gain.setValueAtTime(0, startTime);
              gain1.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
              gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.01);
              osc1.connect(gain1);
              gain1.connect(ctx.destination);
              osc1.start(startTime);
              osc1.stop(startTime + duration);

              const osc2 = ctx.createOscillator();
              const gain2 = ctx.createGain();
              osc2.type = 'sine';
              osc2.frequency.setValueAtTime(freq * 2, startTime);
              gain2.gain.setValueAtTime(0, startTime);
              gain2.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
              gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.01);
              osc2.connect(gain2);
              gain2.connect(ctx.destination);
              osc2.start(startTime);
              osc2.stop(startTime + duration);
          } catch(e) {}
      };
      window.playTone = playTone;

      const playWestminsterChime = (hours) => {
          try {
              const ctx = getCuPlaybackContext();
              const now = ctx.currentTime;
              const notes = {
                  'G3': 196.00,
                  'C4': 261.63,
                  'D4': 293.66,
                  'E4': 329.63
              };
              const melody = [
                  'E4', 'C4', 'D4', 'G3',
                  'C4', 'E4', 'D4', 'G3',
                  'G3', 'D4', 'E4', 'C4',
                  'C4', 'G3', 'D4', 'E4'
              ];
              let time = now + 0.1;
              const noteDuration = 0.5;
              const noteGap = 0.6;

              melody.forEach(noteName => {
                  playTone(notes[noteName], time, noteDuration);
                  time += noteGap;
              });

              time += 0.8;
              const strikeCount = hours % 12 === 0 ? 12 : hours % 12;
              for (let i = 0; i < strikeCount; i++) {
                  playTone(notes['C4'], time, 1.2);
                  time += 1.5;
              }
          } catch(e) {}
      };
      window.playWestminsterChime = playWestminsterChime;
 
      const initSoundscapeSynth = () => {
          if (!sp.soundscapeMixerEnabled) {
              stopSoundscapeSynth();
              return;
          }
          try {
              const ctx = getCuPlaybackContext();
              if (!ctx) return;

              const bufferSize = 2 * ctx.sampleRate;
              const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
              const output = noiseBuffer.getChannelData(0);
              for (let i = 0; i < bufferSize; i++) {
                  output[i] = Math.random() * 2 - 1;
              }

              // RAIN
              if (!soundscapeRainGain) {
                  soundscapeRainGain = ctx.createGain();
                  soundscapeRainGain.gain.setValueAtTime((sp.soundscapeRainVol !== undefined ? sp.soundscapeRainVol : 30) / 100, ctx.currentTime);
                  soundscapeRainGain.connect(ctx.destination);

                  const rainFilter = ctx.createBiquadFilter();
                  rainFilter.type = 'bandpass';
                  rainFilter.frequency.setValueAtTime(1000, ctx.currentTime);
                  rainFilter.Q.setValueAtTime(1.0, ctx.currentTime);
                  rainFilter.connect(soundscapeRainGain);

                  soundscapeRainSource = ctx.createBufferSource();
                  soundscapeRainSource.buffer = noiseBuffer;
                  soundscapeRainSource.loop = true;
                  soundscapeRainSource.connect(rainFilter);
                  soundscapeRainSource.start(0);
              }

              // WIND
              if (!soundscapeWindGain) {
                  soundscapeWindGain = ctx.createGain();
                  soundscapeWindGain.gain.setValueAtTime((sp.soundscapeWindVol !== undefined ? sp.soundscapeWindVol : 20) / 100, ctx.currentTime);
                  soundscapeWindGain.connect(ctx.destination);

                  soundscapeWindFilter = ctx.createBiquadFilter();
                  soundscapeWindFilter.type = 'lowpass';
                  soundscapeWindFilter.frequency.setValueAtTime(400, ctx.currentTime);
                  soundscapeWindFilter.Q.setValueAtTime(2.5, ctx.currentTime);
                  soundscapeWindFilter.connect(soundscapeWindGain);

                  soundscapeWindLFO = ctx.createOscillator();
                  soundscapeWindLFO.frequency.setValueAtTime(0.1, ctx.currentTime);
                  const windLFOGain = ctx.createGain();
                  windLFOGain.gain.setValueAtTime(200, ctx.currentTime);
                  soundscapeWindLFO.connect(windLFOGain);
                  windLFOGain.connect(soundscapeWindFilter.frequency);
                  soundscapeWindLFO.start(0);

                  soundscapeWindSource = ctx.createBufferSource();
                  soundscapeWindSource.buffer = noiseBuffer;
                  soundscapeWindSource.loop = true;
                  soundscapeWindSource.connect(soundscapeWindFilter);
                  soundscapeWindSource.start(0);
              }

              // BINAURAL BEATS
              if (!soundscapeBinauralGain) {
                  soundscapeBinauralGain = ctx.createGain();
                  soundscapeBinauralGain.gain.setValueAtTime((sp.soundscapeBinauralVol !== undefined ? sp.soundscapeBinauralVol : 15) / 100, ctx.currentTime);
                  soundscapeBinauralGain.connect(ctx.destination);

                  const merger = ctx.createChannelMerger(2);
                  merger.connect(soundscapeBinauralGain);

                  soundscapeBinauralSourceL = ctx.createOscillator();
                  soundscapeBinauralSourceL.type = 'sine';
                  soundscapeBinauralSourceL.frequency.setValueAtTime(100, ctx.currentTime);
                  soundscapeBinauralSourceL.connect(merger, 0, 0);
                  soundscapeBinauralSourceL.start(0);

                  soundscapeBinauralSourceR = ctx.createOscillator();
                  soundscapeBinauralSourceR.type = 'sine';
                  soundscapeBinauralSourceR.frequency.setValueAtTime(104, ctx.currentTime);
                  soundscapeBinauralSourceR.connect(merger, 0, 1);
                  soundscapeBinauralSourceR.start(0);
              }
          } catch (e) {
              console.warn("Failed to initialize ASMR soundscapes:", e);
          }
      };

      const updateSoundscapeVolumes = () => {
          try {
              const ctx = getCuPlaybackContext();
              if (!ctx) return;
              const now = ctx.currentTime;
              if (soundscapeRainGain) soundscapeRainGain.gain.setValueAtTime((sp.soundscapeRainVol !== undefined ? sp.soundscapeRainVol : 30) / 100, now);
              if (soundscapeWindGain) soundscapeWindGain.gain.setValueAtTime((sp.soundscapeWindVol !== undefined ? sp.soundscapeWindVol : 20) / 100, now);
              if (soundscapeBinauralGain) soundscapeBinauralGain.gain.setValueAtTime((sp.soundscapeBinauralVol !== undefined ? sp.soundscapeBinauralVol : 15) / 100, now);
          } catch(e) {}
      };

      const stopSoundscapeSynth = () => {
          if (soundscapeRainSource) {
              try { soundscapeRainSource.stop(); } catch(e) {}
              soundscapeRainSource = null;
          }
          if (soundscapeRainGain) {
              try { soundscapeRainGain.disconnect(); } catch(e) {}
              soundscapeRainGain = null;
          }
          if (soundscapeWindSource) {
              try { soundscapeWindSource.stop(); } catch(e) {}
              soundscapeWindSource = null;
          }
          if (soundscapeWindLFO) {
              try { soundscapeWindLFO.stop(); } catch(e) {}
              soundscapeWindLFO = null;
          }
          if (soundscapeWindGain) {
              try { soundscapeWindGain.disconnect(); } catch(e) {}
              soundscapeWindGain = null;
          }
          if (soundscapeBinauralSourceL) {
              try { soundscapeBinauralSourceL.stop(); } catch(e) {}
              soundscapeBinauralSourceL = null;
          }
          if (soundscapeBinauralSourceR) {
              try { soundscapeBinauralSourceR.stop(); } catch(e) {}
              soundscapeBinauralSourceR = null;
          }
          if (soundscapeBinauralGain) {
              try { soundscapeBinauralGain.disconnect(); } catch(e) {}
              soundscapeBinauralGain = null;
          }
      };

      const rebuildClockUltraGeo = () => {
          const m = config.find(x => x.format === 'clock-ultra');
          if (m && m.runtimeGroup) {
              const toRemove = [];
              m.runtimeGroup.children.forEach(c => toRemove.push(c));
              toRemove.forEach(c => m.runtimeGroup.remove(c));
              
              const newGeo = buildClockUltraGeo(m);
              m.runtimeGroup.add(newGeo);
              
              const partsMap = {
                  hand_h: newGeo.getObjectByName('hand_h'),
                  hand_m: newGeo.getObjectByName('hand_m'),
                  hand_s: newGeo.getObjectByName('hand_s'),
                  hand_alarm: newGeo.getObjectByName('hand_alarm'),
                  hand_chrono_min: newGeo.getObjectByName('hand_chrono_min'),
                  hand_chrono_tenth: newGeo.getObjectByName('hand_chrono_tenth'),
                  hand_chrono_sec: newGeo.getObjectByName('hand_chrono_sec'),
                  pusher_start_stop: newGeo.getObjectByName('pusher_start_stop'),
                  pusher_reset: newGeo.getObjectByName('pusher_reset'),
                  gear_h: newGeo.getObjectByName('gear_h'),
                  gear_m: newGeo.getObjectByName('gear_m'),
                  gear_s: newGeo.getObjectByName('gear_s'),
                  neonBorder: newGeo.getObjectByName('neonBorder'),
                  backlightGlow: newGeo.getObjectByName('backlightGlow'),
                  faceMesh: newGeo.getObjectByName('faceMesh'),
                  weatherRain: newGeo.getObjectByName('rainGroup'),
                  weatherSnow: newGeo.getObjectByName('snowGroup'),
                  weatherMist: newGeo.getObjectByName('mistGroup'),
                  audioVisualizerDecal: newGeo.getObjectByName('audioVizDecal'),
                  balanceWheel: newGeo.getObjectByName('balanceWheel'),
                  moonGlobe: newGeo.getObjectByName('moonGlobe'),
                  liquidBeadS: newGeo.getObjectByName('liquidBeadS'),
                  liquidBeadM: newGeo.getObjectByName('liquidBeadM'),
                  liquidBeadH: newGeo.getObjectByName('liquidBeadH'),
                  steamParticles: newGeo.getObjectByName('steamParticles'),
                  hudGroup: newGeo.getObjectByName('holoHudGroup'),
                  hudOuterRing: newGeo.getObjectByName('hudOuterRing'),
                  hudInnerRing: newGeo.getObjectByName('hudInnerRing'),
                  hudLines: newGeo.getObjectByName('hudLines'),
                  dialTextDecal: newGeo.getObjectByName('dialTextDecal'),
                  dialTextDecal_1: newGeo.getObjectByName('dialTextDecal_1'),
                  dialTextDecal_2: newGeo.getObjectByName('dialTextDecal_2')
              };
              addClockUltraAnimCb(m, partsMap);
          }
      };

      const updateControlPanelUI = () => {
          const themePresetEl = document.getElementById('cu-theme-preset');
          if (themePresetEl) themePresetEl.value = sp.themePreset || 'custom';
          
          const cbTimeTravel = document.getElementById('cu-cb-timetravel');
          if (cbTimeTravel) cbTimeTravel.checked = !!sp.timeTravelEnabled;
          
          const rowAutoReturn = document.getElementById('cu-timetravel-autoreturn-row');
          if (rowAutoReturn) rowAutoReturn.style.display = sp.timeTravelEnabled ? 'flex' : 'none';
          
          const cbAutoReturn = document.getElementById('cu-cb-timetravel-autoreturn');
          if (cbAutoReturn) cbAutoReturn.checked = !!sp.timeTravelAutoReturn;
          
          const cbCursorMagnetism = document.getElementById('cu-cb-cursormagnetism');
          if (cbCursorMagnetism) cbCursorMagnetism.checked = !!sp.cursorMagnetismEnabled;
          
          const cbTick = document.getElementById('cu-cb-tick');
          if (cbTick) cbTick.checked = !!(sp.soundEnabled || sp.ambientTickEnabled);
          
          const cbHourlyChime = document.getElementById('cu-cb-hourlychime');
          if (cbHourlyChime) cbHourlyChime.checked = !!sp.hourlyChimeEnabled;
          
          const subDialEl = document.getElementById('cu-subdial-mode');
          if (subDialEl) subDialEl.value = sp.subDialMode || 'chrono';
          
          const configCountdown = document.getElementById('cu-countdown-config');
          if (configCountdown) configCountdown.style.display = sp.subDialMode === 'countdown' ? 'block' : 'none';
          
          const inputCountdown = document.getElementById('cu-countdown-target');
          if (inputCountdown) inputCountdown.value = sp.countdownTarget || '';

          // Sync the 5 new premium focus/utility features
          const cbNavMenu = document.getElementById('cu-cb-navmenu');
          if (cbNavMenu) cbNavMenu.checked = !!sp.navigatorMenuEnabled;

          const cbAnalytics = document.getElementById('cu-cb-analytics');
          if (cbAnalytics) cbAnalytics.checked = !!sp.analyticsDisplayEnabled;

          const cbBlueLight = document.getElementById('cu-cb-bluelight');
          if (cbBlueLight) cbBlueLight.checked = !!sp.blueLightFilterEnabled;

          const cbWeatherSync = document.getElementById('cu-cb-weathersync');
          if (cbWeatherSync) cbWeatherSync.checked = !!sp.weatherWeatherSyncEnabled;

          const cbPomodoro = document.getElementById('cu-cb-pomodoro');
          if (cbPomodoro) cbPomodoro.checked = !!sp.pomodoroTimerEnabled;

          const divPomodoro = document.getElementById('cu-pomodoro-controls');
          if (divPomodoro) divPomodoro.style.display = sp.pomodoroTimerEnabled ? 'block' : 'none';

          const inPomodoroDur = document.getElementById('cu-pomodoro-dur');
          if (inPomodoroDur) inPomodoroDur.value = sp.pomodoroDuration || 25;

          const cbSoundscape = document.getElementById('cu-cb-soundscape');
          if (cbSoundscape) cbSoundscape.checked = !!sp.soundscapeMixerEnabled;

          const divSoundscape = document.getElementById('cu-soundscape-controls');
          if (divSoundscape) divSoundscape.style.display = sp.soundscapeMixerEnabled ? 'block' : 'none';

          const sldRain = document.getElementById('cu-soundscape-rain');
          if (sldRain) sldRain.value = sp.soundscapeRainVol !== undefined ? sp.soundscapeRainVol : 30;

          const sldWind = document.getElementById('cu-soundscape-wind');
          if (sldWind) sldWind.value = sp.soundscapeWindVol !== undefined ? sp.soundscapeWindVol : 20;

          const sldBinaural = document.getElementById('cu-soundscape-binaural');
          if (sldBinaural) sldBinaural.value = sp.soundscapeBinauralVol !== undefined ? sp.soundscapeBinauralVol : 15;
      };

      const applyThemePreset = (presetName) => {
          sp.themePreset = presetName;
          if (presetName === 'rolex_ocean') {
              sp.faceShape = 'circle';
              sp.faceColor = '#0d2240';
              sp.metalStyle = 'gold';
              sp.handStyle = 'arrow';
              sp.handHColor = '#ffd700';
              sp.handMColor = '#ffd700';
              sp.handSColor = '#ff4500';
              sp.markerStyle = 'roman';
              sp.markerColor = '#ffd700';
              sp.moonPhaseEnabled = true;
              sp.subDialMode = 'battery';
              sp.glassCover = true;
              sp.gearsEnabled = false;
              sp.neonBorderEnabled = false;
              sp.liquidNeonEnabled = false;
              sp.steamPipesEnabled = false;
              sp.holoHudEnabled = false;
              sp.weatherOverlay = 'none';
              sp.dialTexturePreset = 'sidef';
              sp.glowEnabled = false;
          } else if (presetName === 'cyber_hud') {
              sp.faceShape = 'circle';
              sp.faceColor = '#050814';
              sp.metalStyle = 'steel';
              sp.handStyle = 'neon';
              sp.handHColor = '#00ffff';
              sp.handMColor = '#00ffff';
              sp.handSColor = '#ff007f';
              sp.markerStyle = 'dots';
              sp.markerColor = '#00ffff';
              sp.holoHudEnabled = true;
              sp.parallaxEnabled = true;
              sp.audioReactive = true;
              sp.gearsEnabled = false;
              sp.neonBorderEnabled = true;
              sp.neonBorderColor = '#ff007f';
              sp.glowEnabled = true;
              sp.glowColor = '#00ffff';
              sp.subDialMode = 'performance';
              sp.liquidNeonEnabled = false;
              sp.steamPipesEnabled = false;
              sp.moonPhaseEnabled = false;
              sp.weatherOverlay = 'none';
              sp.dialTexturePreset = 'carbon';
          } else if (presetName === 'steampunk_oracle') {
              sp.faceShape = 'none';
              sp.metalStyle = 'copper';
              sp.handStyle = 'classic';
              sp.handHColor = '#ffb380';
              sp.handMColor = '#ffb380';
              sp.handSColor = '#ffb380';
              sp.markerStyle = 'lines';
              sp.markerColor = '#ffb380';
              sp.gearsEnabled = true;
              sp.tourbillonEnabled = true;
              sp.steamPipesEnabled = true;
              sp.faceColor = '#000000';
              sp.glassCover = false;
              sp.neonBorderEnabled = false;
              sp.liquidNeonEnabled = false;
              sp.moonPhaseEnabled = false;
              sp.holoHudEnabled = false;
              sp.weatherOverlay = 'none';
              sp.dialTexturePreset = 'none';
              sp.glowEnabled = false;
          } else if (presetName === 'zen_liquid') {
              sp.faceShape = 'circle';
              sp.faceColor = '#020205';
              sp.metalStyle = 'brass';
              sp.handStyle = 'none';
              sp.liquidNeonEnabled = true;
              sp.gearsEnabled = false;
              sp.neonBorderEnabled = true;
              sp.neonBorderColor = '#39ff14';
              sp.glowEnabled = true;
              sp.glowColor = '#39ff14';
              sp.markerStyle = 'none';
              sp.tourbillonEnabled = false;
              sp.moonPhaseEnabled = false;
              sp.holoHudEnabled = false;
              sp.steamPipesEnabled = false;
              sp.weatherOverlay = 'none';
              sp.dialTexturePreset = 'none';
              sp.glowEnabled = true;
          }
          rebuildClockUltraGeo();
          updateControlPanelUI();
      };

      const playTick = () => {
          try {
              const ctx = getCuPlaybackContext();
              const now = ctx.currentTime;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              const isTick = (lastTickedSecond % 2 === 0);
              osc.frequency.setValueAtTime(isTick ? 850 : 650, now);
              osc.type = 'triangle';
              gain.gain.setValueAtTime(0, now);
              gain.gain.linearRampToValueAtTime(0.12, now + 0.002);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now);
              osc.stop(now + 0.05);
          } catch(e) {}
      };
      window.playTick = playTick;

      const playBeep = () => {
          try {
              const ctx = getCuPlaybackContext();
              const now = ctx.currentTime;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(1000, now);
              gain.gain.setValueAtTime(0, now);
              gain.gain.linearRampToValueAtTime(0.25, now + 0.03);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now);
              osc.stop(now + 0.35);
          } catch(e) {}
      };

      const ui = document.createElement('div');
      ui.id = 'cu-control-panel';
      ui.style = 'position:fixed;top:20px;right:20px;background:rgba(8,12,28,0.92);backdrop-filter:blur(10px);border:1px solid #06b6d4;border-radius:12px;padding:15px;color:#cbd5e1;font-family:sans-serif;width:240px;box-shadow:0 10px 30px rgba(0,0,0,0.5);z-index:99;display:block;opacity:1;transition:opacity 0.3s ease-in-out;max-height:calc(100vh - 40px);overflow-y:auto;scrollbar-width:thin;';
      const showChrono = sp.chronoEnabled;
      ui.innerHTML = \`
          <div id="cu-hdr" style="position:relative;font-weight:bold;text-align:center;margin-bottom:15px;font-size:14px;padding-right:20px;color:#22d3ee;cursor:move;user-select:none;">
              🕒💎 Clock Ultra
              <span id="cu-ui-close" style="position:absolute;top:-2px;right:-2px;cursor:pointer;font-size:16px;color:#aaa;transition:color 0.2s;">✕</span>
          </div>

          <!-- LANGUAGE SELECTOR -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:bold;">🌐 Language / Limbă:</label>
              <select id="cu-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ro">Română</option>
                  <option value="de">Deutsch</option>
                  <option value="es">Español</option>
                  <option value="it">Italiano</option>
              </select>
          </div>

          <!-- PREMIUM DESIGN PRESETS -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:bold;" data-key="theme_preset"></label>
              <select id="cu-theme-preset" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">
                  <option value="custom" \${sp.themePreset==='custom'?'selected':''}>Custom</option>
                  <option value="rolex_ocean" \${sp.themePreset==='rolex_ocean'?'selected':''}>Rolex Ocean</option>
                  <option value="cyber_hud" \${sp.themePreset==='cyber_hud'?'selected':''}>Cyber HUD</option>
                  <option value="steampunk_oracle" \${sp.themePreset==='steampunk_oracle'?'selected':''}>Steampunk Oracle</option>
                  <option value="zen_liquid" \${sp.themePreset==='zen_liquid'?'selected':''}>Zen Liquid</option>
              </select>
          </div>

          <!-- TIME TRAVEL & CURSOR MAGNETISM -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;font-weight:bold;">
                  <input type="checkbox" id="cu-cb-timetravel" \${sp.timeTravelEnabled ? 'checked' : ''} />
                  <span data-key="time_travel"></span>
              </label>
              <div id="cu-timetravel-autoreturn-row" style="display: \${sp.timeTravelEnabled ? 'flex' : 'none'}; align-items:center; gap:6px; margin-left: 18px; margin-bottom: 8px;">
                  <input type="checkbox" id="cu-cb-timetravel-autoreturn" \${sp.timeTravelAutoReturn ? 'checked' : ''} />
                  <span style="font-size:10px;color:#94a3b8;" data-key="auto_return"></span>
              </div>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;font-weight:bold;">
                  <input type="checkbox" id="cu-cb-cursormagnetism" \${sp.cursorMagnetismEnabled ? 'checked' : ''} />
                  <span data-key="cursor_magnetism"></span>
              </label>
          </div>

          <!-- SUBDIAL MODE & COUNTDOWN -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;font-weight:bold;" data-key="subdial_mode"></label>
              <select id="cu-subdial-mode" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;margin-bottom:6px;">
                  <option value="chrono" \${sp.subDialMode==='chrono'?'selected':''} data-key="chrono"></option>
                  <option value="battery" \${sp.subDialMode==='battery'?'selected':''} data-key="battery"></option>
                  <option value="gmt" \${sp.subDialMode==='gmt'?'selected':''} data-key="gmt"></option>
                  <option value="performance" \${sp.subDialMode==='performance'?'selected':''} data-key="fps"></option>
                  <option value="countdown" \${sp.subDialMode==='countdown'?'selected':''} data-key="countdown"></option>
              </select>
              <div id="cu-countdown-config" style="display: \${sp.subDialMode==='countdown' ? 'block' : 'none'}; margin-left: 10px; border-left: 2px solid #a855f7; padding-left: 8px;">
                  <label style="font-size:9.5px;color:#cbd5e1;display:block;margin-bottom:2px;" data-key="target_datetime"></label>
                  <input type="datetime-local" id="cu-countdown-target" value="\${sp.countdownTarget || ''}" style="width:calc(100% - 10px);background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:4px;font-size:10px;outline:none;" />
              </div>
          </div>
          
          \${showChrono ? `
          <div style="margin-bottom:15px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:6px;font-weight:bold;" data-key="stopwatch"></label>
              <div style="display:flex;gap:6px;margin-bottom:6px;">
                  <button id="cu-btn-chrono-start" style="flex:1;background:#0d1225;color:#818cf8;border:1px solid rgba(129,140,248,0.3);border-radius:6px;padding:6px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="start"></button>
                  <button id="cu-btn-chrono-reset" style="background:#18122b;color:#d8b4fe;border:1px solid #443c68;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="reset"></button>
              </div>
          </div>
          ` : ''}


          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="font-size:11px;color:#94a3b8;display:block;margin-bottom:4px;" data-key="alarm"></label>
              <div style="display:flex;align-items:center;gap:6px;">
                  <input type="checkbox" id="cu-cb-alarm" \${sp.alarmEnabled ? 'checked' : ''} />
                  <input type="time" id="cu-in-alarm" value="\${sp.alarmTime || '12:00'}" style="flex:1;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;outline:none;font-size:11px;" />
              </div>
              <button id="cu-btn-a-test" style="width:100%;margin-top:8px;background:#18122b;color:#d8b4fe;border:1px solid #443c68;border-radius:6px;padding:6px;cursor:pointer;font-size:11px;font-weight:bold;" data-key="test_alarm"></button>
          </div>

          <!-- RADIO TUNER SECTION -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#94a3b8;font-weight:bold;">
                  <input type="checkbox" id="cu-cb-radio-enabled" \${sp.radioEnabled ? 'checked' : ''} />
                  <span data-key="radio"></span>
              </label>
              <div id="cu-radio-controls" style="display: \${sp.radioEnabled ? 'block' : 'none'}; margin-top:8px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                      <span style="font-size:10px;color:#94a3b8;" data-key="frequency"></span>
                      <span id="cu-radio-freq-val" style="font-size:10px;color:#22d3ee;font-weight:bold;">\${(sp.radioFrequency || 90.0).toFixed(1)} MHz</span>
                  </div>
                  <input type="range" id="cu-radio-freq-slider" min="87.5" max="108.0" step="0.1" value="\${sp.radioFrequency || 90.0}" style="width:100%;accent-color:#22d3ee;cursor:pointer;margin-bottom:8px;" />
                  
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                      <span style="font-size:10px;color:#94a3b8;" data-key="volume"></span>
                      <span id="cu-radio-vol-val" style="font-size:10px;color:#22d3ee;font-weight:bold;">\${Math.round((sp.radioVolume !== undefined ? sp.radioVolume : 0.5) * 100)}%</span>
                  </div>
                  <input type="range" id="cu-radio-vol-slider" min="0" max="1" step="0.05" value="\${sp.radioVolume !== undefined ? sp.radioVolume : 0.5}" style="width:100%;accent-color:#22d3ee;cursor:pointer;" />
              </div>
          </div>

          <!-- AUDIO & CHIMES -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;font-weight:bold;">
                  <input type="checkbox" id="cu-cb-tick" \${sp.soundEnabled || sp.ambientTickEnabled ? 'checked' : ''} />
                  <span data-key="tick"></span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;font-weight:bold;">
                  <input type="checkbox" id="cu-cb-hourlychime" \${sp.hourlyChimeEnabled ? 'checked' : ''} />
                  <span data-key="chime"></span>
              </label>
              <button id="cu-btn-chime-test" style="width:100%;background:#18122b;color:#d8b4fe;border:1px solid #443c68;border-radius:6px;padding:6px;cursor:pointer;font-size:11px;font-weight:bold;margin-top:4px;" data-key="test_chime"></button>
          </div>

          <!-- EXTRA OPTIONS -->
          <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <span style="font-size:11px;color:#cbd5e1;display:block;margin-bottom:6px;font-weight:bold;" data-key="extras"></span>
              
              <!-- Navigation Menu -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-navmenu" \${sp.navigatorMenuEnabled ? 'checked' : ''} />
                  <span data-key="navmenu"></span>
              </label>

              <!-- Real-Time Web Analytics Simulation -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-analytics" \${sp.analyticsDisplayEnabled ? 'checked' : ''} />
                  <span data-key="analytics"></span>
              </label>

              <!-- Night Blue-Light Filter -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-bluelight" \${sp.blueLightFilterEnabled ? 'checked' : ''} />
                  <span data-key="bluelight"></span>
              </label>

              <!-- Weather Cycle Sync -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-weathersync" \${sp.weatherWeatherSyncEnabled ? 'checked' : ''} />
                  <span data-key="weathersync"></span>
              </label>

              <!-- Pomodoro Timer -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;">
                  <input type="checkbox" id="cu-cb-pomodoro" \${sp.pomodoroTimerEnabled ? 'checked' : ''} />
                  <span data-key="pomodoro"></span>
              </label>
              <div id="cu-pomodoro-controls" style="display: \${sp.pomodoroTimerEnabled ? 'block' : 'none'}; margin-left:14px; padding: 4px; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:6px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                      <span style="font-size:9.5px;color:#cbd5e1;" data-key="focus_min"></span>
                      <input type="number" id="cu-pomodoro-dur" min="1" max="120" value="\${sp.pomodoroDuration || 25}" style="width:40px;background:#070a13;color:#fff;border:1px solid #1e293b;border-radius:4px;font-size:10px;padding:2px;outline:none;" />
                  </div>
                  <div style="display:flex;gap:4px;">
                      <button id="cu-btn-pomodoro-start" style="flex:1;background:#0d1225;color:#f97316;border:1px solid rgba(249,115,22,0.3);border-radius:4px;padding:4px;cursor:pointer;font-size:10px;font-weight:bold;" data-key="start">
                      </button>
                      <span id="cu-pomodoro-time-display" style="font-family:monospace;font-size:11px;color:#ef4444;align-self:center;margin-right:2px;">
                          \${sp.pomodoroRunning ? Math.floor(sp.pomodoroTimeRemaining / 60) + ':' + String(sp.pomodoroTimeRemaining % 60).padStart(2, '0') : ''}
                      </span>
                  </div>
              </div>

              <!-- ASMR Soundscape Mixer -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;">
                  <input type="checkbox" id="cu-cb-soundscape" \${sp.soundscapeMixerEnabled ? 'checked' : ''} />
                  <span data-key="asmr"></span>
              </label>
              <div id="cu-soundscape-controls" style="display: \${sp.soundscapeMixerEnabled ? 'block' : 'none'}; margin-left:14px; padding: 4px; background:rgba(0,0,0,0.2); border-radius:4px;">
                  <!-- Rain -->
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                      <span style="font-size:9.5px;color:#94a3b8;width:50px;" data-key="rain"></span>
                      <input type="range" id="cu-soundscape-rain" min="0" max="100" value="\${sp.soundscapeRainVol !== undefined ? sp.soundscapeRainVol : 30}" style="flex:1;height:4px;accent-color:#38bdf8;" />
                  </div>
                  <!-- Wind -->
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                      <span style="font-size:9.5px;color:#94a3b8;width:50px;" data-key="wind"></span>
                      <input type="range" id="cu-soundscape-wind" min="0" max="100" value="\${sp.soundscapeWindVol !== undefined ? sp.soundscapeWindVol : 20}" style="flex:1;height:4px;accent-color:#38bdf8;" />
                  </div>
                  <!-- Binaural Beats -->
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:9.5px;color:#94a3b8;width:50px;" data-key="beats"></span>
                      <input type="range" id="cu-soundscape-binaural" min="0" max="100" value="\${sp.soundscapeBinauralVol !== undefined ? sp.soundscapeBinauralVol : 15}" style="flex:1;height:4px;accent-color:#38bdf8;" />
                  </div>
              </div>
          </div>

          <div style="margin-bottom:8px;">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#94a3b8;">
                  <input type="checkbox" id="cu-cb-audioreactive" \${sp.audioReactive ? 'checked' : ''} />
                  <span data-key="ekg"></span>
              </label>
          </div>

          <div id="cu-status" style="font-size:10px;color:#10b981;text-align:center;margin-top:8px;font-weight:bold;" data-key="status_active"></div>
      \`;
      document.body.appendChild(ui);

      const cuLangSelect = ui.querySelector('#cu-lang-select');
      const getCuText = (key) => {
          const l = (cuLangSelect && cuLangSelect.value) || lang || 'en';
          return (translations[l] && translations[l][key]) || translations['en'][key];
      };

      const applyLanguage = (langVal) => {
          isFR = langVal === 'fr';
          isRO = langVal === 'ro';
          isDE = langVal === 'de';
          isES = langVal === 'es';
          isIT = langVal === 'it';
          isEN = !isFR && !isRO && !isDE && !isES && !isIT;

          window.isFR = isFR;
          window.isRO = isRO;
          window.isDE = isDE;
          window.isES = isES;
          window.isIT = isIT;
          window.isEN = isEN;

          const elements = ui.querySelectorAll('[data-key]');
          elements.forEach(el => {
              const key = el.getAttribute('data-key');
              if (translations[langVal] && translations[langVal][key]) {
                  let prefix = '';
                  if (key === 'theme_preset') prefix = '💎 ';
                  if (key === 'time_travel') prefix = '⏳ ';
                  if (key === 'cursor_magnetism') prefix = '🧲 ';
                  if (key === 'subdial_mode') prefix = '📊 ';
                  if (key === 'stopwatch') prefix = '⏱️ ';
                  if (key === 'start' && el.id === 'cu-btn-chrono-start') prefix = '▶️ ';
                  if (key === 'reset') prefix = '🔁 ';
                  if (key === 'alarm') prefix = '⏰ ';
                  if (key === 'radio') prefix = '📻 ';
                  if (key === 'tick') prefix = '🔊 ';
                  if (key === 'chime') prefix = '🔔 ';
                  if (key === 'extras') prefix = '';
                  if (key === 'navmenu') prefix = '🧭 ';
                  if (key === 'analytics') prefix = '📊 ';
                  if (key === 'bluelight') prefix = '🌙 ';
                  if (key === 'weathersync') prefix = '☁️ ';
                  if (key === 'pomodoro') prefix = '🍅 ';
                  if (key === 'asmr') prefix = '🌧️ ';
                  
                  if (el.id === 'cu-btn-chrono-start') {
                      const isChronoRunning = hasClockUltra && hasClockUltra.chronoRunning;
                      el.innerHTML = isChronoRunning ? '⏸️ Pause' : (prefix + translations[langVal]['start']);
                  } else if (el.id === 'cu-btn-pomodoro-start') {
                      const isPomodoroRunning = sp && sp.pomodoroRunning;
                      el.innerHTML = isPomodoroRunning ? (isFR ? 'Arrêter' : isRO ? 'Oprește' : isDE ? 'Stoppen' : isES ? 'Detener' : isIT ? 'Arresta' : 'Stop') : (isFR ? 'Démarrer' : isRO ? 'Pornește' : isDE ? 'Starten' : isES ? 'Iniciar' : isIT ? 'Avvia' : 'Start');
                  } else if (el.id === 'cu-btn-a-test') {
                      const isAlarmActive = !!window._cuAlarmActive;
                      el.innerText = isAlarmActive ? (isFR ? '🔕 Silencer' : isRO ? '🔕 Silențios' : isDE ? '🔕 Stumm' : isES ? '🔕 Silenciar' : isIT ? '🔕 Silenzia' : '🔕 Silence') : (translations[langVal]['test_alarm']);
                  } else {
                      el.innerHTML = prefix + translations[langVal][key];
                  }
              }
          });

          // Update mock sections if they exist
          sectionsData.forEach(sec => {
              const secEl = document.getElementById(sec.id);
              if (secEl) {
                  const cardEl = secEl.querySelector('.mock-card');
                  if (cardEl) {
                      const titleEl = cardEl.querySelector('h2');
                      if (titleEl) titleEl.innerHTML = sec.title[langVal] || sec.title.en;
                      const descEl = cardEl.querySelector('p');
                      if (descEl) descEl.innerHTML = sec.desc[langVal] || sec.desc.en;
                  }
              }
          });
      };

      if (cuLangSelect) {
          cuLangSelect.value = lang;
          cuLangSelect.onchange = (e) => {
              applyLanguage(e.target.value);
          };
      }

      makeElementDraggable(ui, document.getElementById('cu-hdr'));

      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'cu-ui-toggle-btn';
      toggleBtn.innerHTML = '⚙️';
      toggleBtn.style = 'position:fixed;top:20px;right:20px;width:44px;height:44px;background:rgba(8,12,28,0.92);backdrop-filter:blur(10px);border:1px solid #06b6d4;border-radius:50%;color:#22d3ee;font-size:20px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.4);z-index:98;display:none;align-items:center;justify-content:center;transition:all 0.3s;outline:none;';
      document.body.appendChild(toggleBtn);

      toggleBtn.onmouseover = () => { toggleBtn.style.transform = 'scale(1.1)'; toggleBtn.style.borderColor = '#22d3ee'; };
      toggleBtn.onmouseout = () => { toggleBtn.style.transform = 'scale(1.0)'; toggleBtn.style.borderColor = '#06b6d4'; };
      
      toggleBtn.onclick = () => {
          ui.style.display = 'block';
          toggleBtn.style.display = 'none';
          setTimeout(() => { ui.style.opacity = '1'; }, 10);
      };

      const styleTag = document.createElement('style');
      styleTag.innerHTML = \`
          #cu-control-panel::-webkit-scrollbar {
              width: 4px;
          }
          #cu-control-panel::-webkit-scrollbar-thumb {
              background: rgba(6, 182, 212, 0.4);
              border-radius: 2px;
          }
          @media (max-width: 600px) {
              #cu-control-panel {
                  top: auto !important;
                  bottom: 12px !important;
                  right: 12px !important;
                  left: 12px !important;
                  width: auto !important;
                  max-height: 50vh !important;
                  overflow-y: auto !important;
              }
              #cu-ui-toggle-btn {
                  top: auto !important;
                  bottom: 12px !important;
                  right: 12px !important;
              }
          }
      \`;
      document.head.appendChild(styleTag);

      const btnTest = document.getElementById('cu-btn-a-test');
      const inAlarm = document.getElementById('cu-in-alarm');
      const cbAlarm = document.getElementById('cu-cb-alarm');
      const cbTick = document.getElementById('cu-cb-tick');
      const cbAudio = document.getElementById('cu-cb-audioreactive');

      const cbRadioEnabled = document.getElementById('cu-cb-radio-enabled');
      const divRadioControls = document.getElementById('cu-radio-controls');
      const sldRadioFreq = document.getElementById('cu-radio-freq-slider');
      const lblRadioFreq = document.getElementById('cu-radio-freq-val');
      const sldRadioVol = document.getElementById('cu-radio-vol-slider');
      const lblRadioVol = document.getElementById('cu-radio-vol-val');

      if (cbRadioEnabled) {
          cbRadioEnabled.onchange = (e) => {
              sp.radioEnabled = e.target.checked;
              divRadioControls.style.display = sp.radioEnabled ? 'block' : 'none';
              getCuPlaybackContext();
              tuneRadio();
          };
      }
      if (sldRadioFreq) {
          sldRadioFreq.oninput = (e) => {
              sp.radioFrequency = parseFloat(e.target.value);
              lblRadioFreq.textContent = sp.radioFrequency.toFixed(1) + ' MHz';
              getCuPlaybackContext();
              tuneRadio();
          };
      }
      if (sldRadioVol) {
          sldRadioVol.oninput = (e) => {
              sp.radioVolume = parseFloat(e.target.value);
              lblRadioVol.textContent = Math.round(sp.radioVolume * 100) + '%';
              getCuPlaybackContext();
              tuneRadio();
          };
      }

      if (btnTest) {
          btnTest.onclick = () => {
              cuAlarmActive = !cuAlarmActive;
              window._cuAlarmActive = cuAlarmActive;
              if (cuAlarmActive) {
                  btnTest.style.background = '#ef4444'; btnTest.style.color = '#fff'; btnTest.innerText = getCuText('silence');
                  cuAlarmInt = setInterval(playBeep, 400);
              } else {
                  btnTest.style.background = '#18122b'; btnTest.style.color = '#d8b4fe'; btnTest.innerText = getCuText('test_alarm');
                  clearInterval(cuAlarmInt);
              }
          };
          inAlarm.onchange = (e) => { sp.alarmTime = e.target.value; };
          cbAlarm.onchange = (e) => { sp.alarmEnabled = e.target.checked; };
          cbTick.onchange = (e) => { sp.soundEnabled = e.target.checked; sp.ambientTickEnabled = e.target.checked; };
          if (cbAudio) {
              cbAudio.onchange = (e) => {
                  sp.audioReactive = e.target.checked;
              };
          }
      }

      // Bind new premium controls in exported HTML
      const selThemePreset = document.getElementById('cu-theme-preset');
      if (selThemePreset) {
          selThemePreset.onchange = (e) => {
              applyThemePreset(e.target.value);
          };
      }

      const cbTimeTravel = document.getElementById('cu-cb-timetravel');
      const divAutoReturn = document.getElementById('cu-timetravel-autoreturn-row');
      if (cbTimeTravel) {
          cbTimeTravel.onchange = (e) => {
              sp.timeTravelEnabled = e.target.checked;
              if (divAutoReturn) divAutoReturn.style.display = sp.timeTravelEnabled ? 'flex' : 'none';
          };
      }

      const cbAutoReturn = document.getElementById('cu-cb-timetravel-autoreturn');
      if (cbAutoReturn) {
          cbAutoReturn.onchange = (e) => {
              sp.timeTravelAutoReturn = e.target.checked;
          };
      }

      const cbCursorMagnetism = document.getElementById('cu-cb-cursormagnetism');
      if (cbCursorMagnetism) {
          cbCursorMagnetism.onchange = (e) => {
              sp.cursorMagnetismEnabled = e.target.checked;
          };
      }

      const selSubDial = document.getElementById('cu-subdial-mode');
      const divCountdownConfig = document.getElementById('cu-countdown-config');
      if (selSubDial) {
          selSubDial.onchange = (e) => {
              sp.subDialMode = e.target.value;
              if (divCountdownConfig) divCountdownConfig.style.display = sp.subDialMode === 'countdown' ? 'block' : 'none';
              rebuildClockUltraGeo();
          };
      }

      const inCountdownTarget = document.getElementById('cu-countdown-target');
      if (inCountdownTarget) {
          inCountdownTarget.onchange = (e) => {
              sp.countdownTarget = e.target.value;
          };
      }

      const cbHourlyChime = document.getElementById('cu-cb-hourlychime');
      if (cbHourlyChime) {
          cbHourlyChime.onchange = (e) => {
              sp.hourlyChimeEnabled = e.target.checked;
          };
      }

      const btnChimeTest = document.getElementById('cu-btn-chime-test');
      if (btnChimeTest) {
          btnChimeTest.onclick = () => {
              getCuPlaybackContext();
              const now = new Date();
              playWestminsterChime(now.getHours());
          };
      }

      // Bind new premium extras in exported HTML
      const cbNavMenu = document.getElementById('cu-cb-navmenu');
      if (cbNavMenu) {
          cbNavMenu.onchange = (e) => {
              sp.navigatorMenuEnabled = e.target.checked;
          };
      }

      const cbAnalytics = document.getElementById('cu-cb-analytics');
      if (cbAnalytics) {
          cbAnalytics.onchange = (e) => {
              sp.analyticsDisplayEnabled = e.target.checked;
          };
      }

      const cbBlueLight = document.getElementById('cu-cb-bluelight');
      if (cbBlueLight) {
          cbBlueLight.onchange = (e) => {
              sp.blueLightFilterEnabled = e.target.checked;
          };
      }

      const cbWeatherSync = document.getElementById('cu-cb-weathersync');
      if (cbWeatherSync) {
          cbWeatherSync.onchange = (e) => {
              sp.weatherWeatherSyncEnabled = e.target.checked;
              rebuildClockUltraGeo();
          };
      }

      const cbPomodoro = document.getElementById('cu-cb-pomodoro');
      const divPomodoro = document.getElementById('cu-pomodoro-controls');
      if (cbPomodoro) {
          cbPomodoro.onchange = (e) => {
              sp.pomodoroTimerEnabled = e.target.checked;
              if (divPomodoro) divPomodoro.style.display = sp.pomodoroTimerEnabled ? 'block' : 'none';
              if (!sp.pomodoroTimerEnabled && sp.pomodoroRunning) {
                  sp.pomodoroRunning = false;
                  const startBtn = document.getElementById('cu-btn-pomodoro-start');
                  if (startBtn) startBtn.innerText = getCuText('start');
              }
          };
      }

      const inPomodoroDur = document.getElementById('cu-pomodoro-dur');
      if (inPomodoroDur) {
          inPomodoroDur.onchange = (e) => {
              sp.pomodoroDuration = Math.max(1, parseInt(e.target.value) || 25);
          };
      }

      const btnPomodoroStart = document.getElementById('cu-btn-pomodoro-start');
      if (btnPomodoroStart) {
          btnPomodoroStart.onclick = () => {
              sp.pomodoroRunning = !sp.pomodoroRunning;
              if (sp.pomodoroRunning) {
                  sp.pomodoroTimeRemaining = (sp.pomodoroDuration || 25) * 60;
                  btnPomodoroStart.innerText = getCuText('stop');
              } else {
                  btnPomodoroStart.innerText = getCuText('start');
              }
          };
      }

      const cbSoundscape = document.getElementById('cu-cb-soundscape');
      const divSoundscape = document.getElementById('cu-soundscape-controls');
      if (cbSoundscape) {
          cbSoundscape.onchange = (e) => {
              sp.soundscapeMixerEnabled = e.target.checked;
              if (divSoundscape) divSoundscape.style.display = sp.soundscapeMixerEnabled ? 'block' : 'none';
              if (sp.soundscapeMixerEnabled) {
                  initSoundscapeSynth();
              } else {
                  stopSoundscapeSynth();
              }
          };
      }

      const sldRain = document.getElementById('cu-soundscape-rain');
      if (sldRain) {
          sldRain.oninput = (e) => {
              sp.soundscapeRainVol = parseInt(e.target.value);
              updateSoundscapeVolumes();
          };
      }

      const sldWind = document.getElementById('cu-soundscape-wind');
      if (sldWind) {
          sldWind.oninput = (e) => {
              sp.soundscapeWindVol = parseInt(e.target.value);
              updateSoundscapeVolumes();
          };
      }

      const sldBinaural = document.getElementById('cu-soundscape-binaural');
      if (sldBinaural) {
          sldBinaural.oninput = (e) => {
              sp.soundscapeBinauralVol = parseInt(e.target.value);
              updateSoundscapeVolumes();
          };
      }

      if (showChrono) {
          const btnStart = document.getElementById('cu-btn-chrono-start');
          const btnReset = document.getElementById('cu-btn-chrono-reset');
          if (btnStart) {
              btnStart.onclick = () => {
                  hasClockUltra.chronoRunning = !hasClockUltra.chronoRunning;
                  hasClockUltra.pusherStartAnim = 1.0;
                  btnStart.innerText = hasClockUltra.chronoRunning ? '⏸️ ' + getCuText('pause') : '▶️ ' + getCuText('start');
              };
          }
          if (btnReset) {
              btnReset.onclick = () => {
                  hasClockUltra.chronoRunning = false;
                  hasClockUltra.chronoTime = 0;
                  hasClockUltra.pusherResetAnim = 1.0;
                  if (btnStart) btnStart.innerText = '▶️ ' + getCuText('start');
              };
          }
      }

      scene.animCbs = scene.animCbs || [];
      scene.animCbs.push(() => {
          const now = new Date();
          
          if (sp.timeTravelEnabled && sp.timeTravelAutoReturn && !isTimeTraveling) {
              hasClockUltra._timeOffsetMinutes = (hasClockUltra._timeOffsetMinutes || 0) * 0.92;
              if (Math.abs(hasClockUltra._timeOffsetMinutes) < 0.01) {
                  hasClockUltra._timeOffsetMinutes = 0;
              }
          }

          if (hasClockUltra._timeOffsetMinutes) {
              now.setMinutes(now.getMinutes() + hasClockUltra._timeOffsetMinutes);
          }

          const ms = now.getMilliseconds();
          const sec = now.getSeconds() + ms / 1000;
          
          if (sp.soundEnabled || sp.ambientTickEnabled) {
              const currentSec = Math.floor(sec);
              if (currentSec !== lastTickedSecond) {
                  lastTickedSecond = currentSec;
                  const tickFn = window.playTick || (typeof playTick === 'function' ? playTick : null);
                  if (tickFn) {
                      tickFn();
                  }
              }
          }

          if (sp.hourlyChimeEnabled) {
              const currentMin = now.getMinutes();
              const currentSec = now.getSeconds();
              if (currentMin === 0 && Math.floor(currentSec) === 0 && window._lastChimeHour !== now.getHours()) {
                  window._lastChimeHour = now.getHours();
                  const chimeFn = window.playWestminsterChime || (typeof playWestminsterChime === 'function' ? playWestminsterChime : null);
                  if (chimeFn) {
                      chimeFn(now.getHours());
                  }
              }
          }

          if (sp.alarmEnabled) {
              const hh = String(now.getHours()).padStart(2, '0');
              const mm = String(now.getMinutes()).padStart(2, '0');
              if (hh + ':' + mm === sp.alarmTime && now.getSeconds() === 0 && !cuAlarmActive) {
                  if (btnTest) btnTest.click();
              }
          }
      });

      const closeBtn = document.getElementById('cu-ui-close');
      if (closeBtn) {
          closeBtn.onclick = () => {
              ui.style.opacity = '0';
              setTimeout(() => { 
                  ui.style.display = 'none'; 
                  if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'flex';
              }, 300);
          };
      }

      const hint = document.createElement('div');
      hint.style = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(8,12,28,0.92);backdrop-filter:blur(8px);border:1px solid #06b6d4;border-radius:20px;padding:10px 20px;color:#22d3ee;font-family:sans-serif;font-size:13px;font-weight:bold;box-shadow:0 6px 20px rgba(0,0,0,0.4);z-index:98;opacity:1;transition:opacity 0.8s ease-in-out;pointer-events:none;white-space:nowrap;';
      hint.innerHTML = getCuText('click_hint');
      document.body.appendChild(hint);
      
      setTimeout(() => {
          hint.style.opacity = '0';
          setTimeout(() => hint.remove(), 800);
      }, 6000);

      let isTimeTraveling = false;
      let timeTravelStartX = 0;
      let clickStartX = 0;
      let clickStartY = 0;
      let clickStartTime = 0;

      window.addEventListener('pointerdown', (e) => {
          if (e.target !== renderer.domElement) return;
          clickStartX = e.clientX;
          clickStartY = e.clientY;
          clickStartTime = Date.now();

          if (!sp.timeTravelEnabled) return;
          
          const rayc = new THREE.Raycaster();
          const mouse2d = new THREE.Vector2();
          const rect = renderer.domElement.getBoundingClientRect();
          mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          rayc.setFromCamera(mouse2d, camera);
          const intersects = rayc.intersectObjects([hasClockUltra.runtimeGroup], true);
          if (intersects.length === 0) return;
          
          isTimeTraveling = true;
          timeTravelStartX = e.clientX;
          controls.enabled = false;
      });

      window.addEventListener('pointermove', (e) => {
          if (isTimeTraveling && hasClockUltra) {
              const dx = e.clientX - timeTravelStartX;
              timeTravelStartX = e.clientX;
              hasClockUltra._timeOffsetMinutes = (hasClockUltra._timeOffsetMinutes || 0) + dx * 0.5;
          }
      });

      window.addEventListener('pointerup', (e) => {
          if (isTimeTraveling) {
              isTimeTraveling = false;
              controls.enabled = true;
          }

          if (sp.navigatorMenuEnabled && e.target === renderer.domElement) {
              const dt = Date.now() - clickStartTime;
              const dist = Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY);
              if (dt < 350 && dist < 8) {
                  const rayc = new THREE.Raycaster();
                  const mouse2d = new THREE.Vector2();
                  const rect = renderer.domElement.getBoundingClientRect();
                  mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  rayc.setFromCamera(mouse2d, camera);
                  
                  const faceMesh = hasClockUltra.runtimeGroup.getObjectByName('faceMesh');
                  if (faceMesh) {
                      const intersects = rayc.intersectObject(faceMesh);
                      if (intersects.length > 0) {
                          const localPt = faceMesh.worldToLocal(intersects[0].point.clone());
                          const angle = Math.atan2(localPt.x, localPt.y);
                          let deg = angle * (180 / Math.PI);
                          if (deg < 0) deg += 360;
                          let hour = Math.round(deg / 30);
                          if (hour === 0) hour = 12;
                          
                          window._cuNavTargetHour = hour;
                          window._cuNavTargetTime = Date.now();
                          
                          const anchorMap = {
                              12: 'home',
                              1: 'features',
                              2: 'about',
                              3: 'about',
                              4: 'services',
                              5: 'pricing',
                              6: 'portfolio',
                              7: 'testimonials',
                              8: 'faq',
                              9: 'contact',
                              10: 'contact',
                              11: 'footer'
                          };
                          const anchor = anchorMap[hour];
                          const el = document.getElementById(anchor);
                          if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              if (window.toast) {
                                  window.toast(getCuText('section_toast') + anchor.toUpperCase() + ' (#' + anchor + ')');
                              }
                          } else {
                              if (window.toast) {
                                  window.toast(getCuText('dial_click_toast').replace('{hour}', hour));
                              }
                          }
                          
                          window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                          if (window.parent) {
                              window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                          }
                      }
                  }
              }
          }
      });

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const unlockAudio = () => {
          const ctx = getCuPlaybackContext();
          if (ctx && ctx.state === 'suspended') {
              ctx.resume().catch(() => {});
          }
          if (sp.radioEnabled) {
              ensureRadioStatic();
              tuneRadio();
              if (radioAudio && radioAudio.paused) {
                  radioAudio.play().then(() => {
                      window.removeEventListener('click', unlockAudio);
                      window.removeEventListener('touchend', unlockAudio);
                  }).catch(() => {});
              }
          } else {
              window.removeEventListener('click', unlockAudio);
              window.removeEventListener('touchend', unlockAudio);
          }
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchend', unlockAudio);

      window.addEventListener('wheel', (e) => {
          if (sp && sp.radioEnabled) {
              const rect = renderer.domElement.getBoundingClientRect();
              if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                  // Raycast to check if mouse is over the LCD screen area on the clock dial
                  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  raycaster.setFromCamera(mouse, camera);
                  const intersects = raycaster.intersectObjects(globalGroup.children, true);
                  if (intersects.length > 0) {
                      const hit = intersects[0];
                      if (hit.object.name === 'audioVizDecal') {
                          const uv = hit.uv;
                          if (uv) {
                              const canvasX = uv.x * 256;
                              const canvasY = (1.0 - uv.y) * 256;
                              // Check if coordinates fall inside the LCD bounding box
                              if (canvasX >= 78 && canvasX <= 178 && canvasY >= 52 && canvasY <= 82) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  getCuPlaybackContext();
                                  const delta = e.deltaY < 0 ? 0.1 : -0.1;
                                  sp.radioFrequency = Math.max(87.5, Math.min(108.0, parseFloat((sp.radioFrequency + delta).toFixed(1))));
                                  
                                  const sldFreq = document.getElementById('cu-radio-freq-slider');
                                  const lblFreq = document.getElementById('cu-radio-freq-val');
                                  if (sldFreq) sldFreq.value = sp.radioFrequency;
                                  if (lblFreq) lblFreq.textContent = sp.radioFrequency.toFixed(1) + ' MHz';
                                  
                                  tuneRadio();
                              }
                          }
                      }
                  }
              }
          }
      }, { passive: false });

      window.addEventListener('click', (event) => {
          if (ui.contains(event.target) || (typeof toggleBtn !== 'undefined' && toggleBtn.contains(event.target))) return;
          
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(globalGroup.children, true);
          
          if (intersects.length > 0) {
              let obj = intersects[0].object;
              
              if (obj.name === 'audioVizDecal' && sp.radioEnabled) {
                  const uv = intersects[0].uv;
                  if (uv) {
                      const canvasX = uv.x * 256;
                      const canvasY = (1.0 - uv.y) * 256;
                      if (canvasX >= 78 && canvasX <= 178 && canvasY >= 52 && canvasY <= 82) {
                          getCuPlaybackContext();
                          if (canvasX <= 95) {
                              sp.radioFrequency = Math.max(87.5, parseFloat((sp.radioFrequency - 0.1).toFixed(1)));
                          } else if (canvasX >= 161) {
                              sp.radioFrequency = Math.min(108.0, parseFloat((sp.radioFrequency + 0.1).toFixed(1)));
                          } else {
                              const fraction = (canvasX - 95) / (161 - 95);
                              sp.radioFrequency = parseFloat((87.5 + fraction * (108.0 - 87.5)).toFixed(1));
                          }
                          
                          const sldFreq = document.getElementById('cu-radio-freq-slider');
                          const lblFreq = document.getElementById('cu-radio-freq-val');
                          if (sldFreq) sldFreq.value = sp.radioFrequency;
                          if (lblFreq) lblFreq.textContent = sp.radioFrequency.toFixed(1) + ' MHz';
                          
                          tuneRadio();
                          return;
                      }
                  }
              }

              let pusherName = null;
              let tempObj = obj;
              while(tempObj) {
                  if (tempObj.name === 'pusher_start_stop' || tempObj.name === 'pusher_reset') {
                      pusherName = tempObj.name;
                      break;
                  }
                  tempObj = tempObj.parent;
              }
              if (pusherName) {
                  if (pusherName === 'pusher_start_stop') {
                      hasClockUltra.chronoRunning = !hasClockUltra.chronoRunning;
                      hasClockUltra.pusherStartAnim = 1.0;
                      const btnStart = document.getElementById('cu-btn-chrono-start');
                      if (btnStart) btnStart.innerText = hasClockUltra.chronoRunning ? (isFR ? '⏸️ Pause' : '⏸️ Pause') : (isFR ? '▶️ Démarrer' : '▶️ Start');
                  } else if (pusherName === 'pusher_reset') {
                      hasClockUltra.chronoRunning = false;
                      hasClockUltra.chronoTime = 0;
                      hasClockUltra.pusherResetAnim = 1.0;
                      const btnStart = document.getElementById('cu-btn-chrono-start');
                      if (btnStart) btnStart.innerText = isFR ? '▶️ Démarrer' : '▶️ Start';
                  }
                  return;
              }
              
              if (ui.style.display === 'none') {
                  ui.style.display = 'block';
                  if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'none';
                  setTimeout(() => { ui.style.opacity = '1'; }, 10);
              } else {
                  ui.style.opacity = '0';
                  setTimeout(() => { 
                      ui.style.display = 'none'; 
                      if (typeof toggleBtn !== 'undefined') toggleBtn.style.display = 'flex';
                  }, 300);
              }
          }
      });

      if (sp.radioEnabled) {
          setTimeout(() => { tuneRadio(); }, 100);
      }
  }

  let cuParallaxX = 0, cuParallaxY = 0;
  let targetCuParallaxX = 0, targetCuParallaxY = 0;
  
  const cuParallaxM = config.find(x => x.format === 'clock-ultra');
  if (cuParallaxM) {
      window.addEventListener('mousemove', (e) => {
          const nx = (e.clientX / window.innerWidth) - 0.5;
          const ny = (e.clientY / window.innerHeight) - 0.5;
          targetCuParallaxY = nx * 0.4;
          targetCuParallaxX = ny * 0.4;
          window._cuMouseNDC = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 };
      });
  }

  function anim() {
    requestAnimationFrame(anim);
    controls.update();
    
    cuParallaxX += (targetCuParallaxX - cuParallaxX) * 0.05;
    cuParallaxY += (targetCuParallaxY - cuParallaxY) * 0.05;
    window._cuParallaxX = cuParallaxX;
    window._cuParallaxY = cuParallaxY;
    
    let hasSweep = false;
    config.forEach(m => {
        if(m.spin && m.runtimeGroup) { m.runtimeGroup.rotation.y += 0.01 * w; }
        if(m.levitate && m.runtimeGroup) { m.runtimeGroup.position.y = m.pos.y + Math.sin(Date.now() * 0.002) * 10; }
        if(m.format === 'clock-ultra' && m.runtimeGroup) {
            const p0 = m.clockParts && m.clockParts[0];
            if (p0) {
                if (p0.parallaxEnabled) {
                    m.runtimeGroup.rotation.x = m.rot.x + cuParallaxX;
                    m.runtimeGroup.rotation.y = m.rot.y + cuParallaxY;
                }
                if (p0.glareSweepEnabled) {
                    hasSweep = true;
                }
            }
        }
    });
    
    if (l1) {
        if (hasSweep) {
            l1.position.x = 100 + Math.sin(Date.now() * 0.001) * 150;
        } else {
            l1.position.set(100, 200, 200);
        }
    }
    
    if(scene.animCbs) scene.animCbs.forEach(cb => cb(w));
    renderer.render(scene, camera);
  }
  anim();
  window.addEventListener('resize', () => {
    camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
</${'script'}></body></html>`;

      const editor = document.getElementById('code-editor');
      if (editor) {
          if(window.pushUndo) window.pushUndo();
          editor.value = code.trim(); editor.dispatchEvent(new Event('input', { bubbles: true }));
          container.dispatchEvent(new Event('hide'));
          setTimeout(() => { btn.innerHTML = '⚡ Generate 3D Scene'; }, 1000);
          if(window.toast) window.toast('ðŸŒŸ Ultimate 3D Scene Generated!');
      }
  }

  function addExtraModule(type, config) {
      let newModel = {
        id: Date.now(), name: type + ' ' + (models.length+1), type: '3d-model', format: type,
        rawText: '', depth:10, scale:1.0, bevelVal:0, colorHex:'#6366f1', emissiveHex:'#000000',
        metalness:0.1, roughness:0.5, opacity:1.0, wireframe:false, preset:'custom', spin:false, mirror:false,
        position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
        meshGroup: null, importedMesh: null
      };

      if(type === 'math-surface') {
        newModel.formula = config.formula; newModel.surfaceRes = config.res; newModel.surfaceRange = config.range;
        newModel.colorMode = config.colorMode; newModel.doAnimate = config.doAnimate; newModel.doWire = config.doWire;
      } else if(type === 'data-chart') {
        newModel.chartData = config.data; newModel.labelKey = config.labelKey; newModel.valueKey = config.valueKey; newModel.colorTheme = config.colorTheme;
      } else if(type === 'webcam-avatar') {
        newModel.camRes = config.res; newModel.camDepth = config.depth;
      } else if(type === 'shader-mesh') {
        newModel.shaderCode = config.shaderCode;
      } else if(type === 'starmap') {
        newModel.starCount = config.count; newModel.starSize = config.size;
      } else if(type === 'keyframe-anim') {
        newModel.keyframes = config.keyframes;
      } else if(type === 'voice-sculpture') {
        newModel.samples = config.samples; newModel.sculptStyle = config.style; newModel.sculptColor = config.color;
      } else if(type === 'qr-labyrinth') {
        newModel.qrGrid = config.grid; newModel.qrRes = config.res; newModel.qrHeight = config.height; newModel.qrColor = config.color;
      } else if(type === 'location-terrain') {
        newModel.terrainData = Array.from(config.data); newModel.terrainRes = config.res; newModel.terrainScale = config.scale; newModel.terrainType = config.type; newModel.terrainSeed = config.seed;
      } else if(type === 'doc-gallery') {
        newModel.docItems = config.items; newModel.docLayout = config.layout; newModel.docColor = config.color;
      } else if(type === 'pdf-gallery') {
        newModel.pdfImages = config.images; newModel.pdfLayout = config.layout;
      } else if(type === 'logic-tree') {
        newModel.treeNodes = config.nodes; newModel.nodeSize = config.size; newModel.treeColor = config.color;
      } else if(type === 'neon-handwriting') {
        newModel.neonPaths = config.paths; newModel.neonColor = config.color; newModel.neonThick = config.thick;
      } else if(type === 'csv-chart') {
        newModel.csvData = config.data; newModel.csvLabelKey = config.labelKey; newModel.csvValueKey = config.valueKey;
        newModel.csvChartType = config.chartType; newModel.csvColorTheme = config.colorTheme;
      } else if(type === 'web-network') {
        newModel.netNodes = config.nodes; newModel.netLinks = config.links; newModel.netLayout = config.layout;
        newModel.netNodeColor = config.nodeColor; newModel.netLinkColor = config.linkColor; newModel.netNodeSize = config.nodeSize;
      } else if(type === 'pixel-voxel') {
        newModel.pxImgData = config.imgData; newModel.pxVoxelSize = config.voxelSize;
        newModel.pxHeightScale = config.heightScale; newModel.pxSkipAlpha = config.skipAlpha;
      } else if(type === 'json-dashboard') {
        newModel.jsnData = config.jsonData; newModel.jsnStyle = config.dashStyle; newModel.jsnColorTheme = config.colorTheme;
      } else if(type === 'dna-helix') {
        newModel.dnaSequence = config.sequence; newModel.dnaStyle = config.helixStyle; newModel.dnaColorMode = config.colorMode;
        newModel.dnaTwist = config.twistFactor; newModel.dnaRadius = config.helixRadius;
      } else if(type === 'geo-globe') {
        newModel.geoMarkers = config.markers; newModel.geoStyle = config.globeStyle; newModel.geoColor = config.globeColor;
        newModel.geoRadius = config.globeRadius; newModel.geoMarkerH = config.markerHeight;
      } else if(type === 'palette-world') {
        newModel.palColors = config.colors; newModel.palStyle = config.worldStyle; newModel.palDensity = config.density;
      } else if(type === 'sentiment-landscape') {
        newModel.sentAnalysis = config.analysis; newModel.sentRes = config.res; newModel.sentAmp = config.amp;
        newModel.sentTerrainStyle = config.terrainStyle; newModel.sentAnimMode = config.animMode;
      } else if(type === 'fractal-3d') {
        newModel.fractalType = config.fractalType; newModel.fractalRes = config.res; newModel.fractalIter = config.iterations;
        newModel.fractalZoom = config.zoom; newModel.fractalHeightScale = config.heightScale;
        newModel.fractalCX = config.centerX; newModel.fractalCY = config.centerY;
        newModel.fractalJR = config.juliaR; newModel.fractalJI = config.juliaI;
        newModel.fractalDepth = config.depth; newModel.fractalColorMode = config.colorMode;
        newModel.fractalRenderMode = config.renderMode; newModel.fractalAnimate = config.doAnimate;
      } else if(type === 'midi-arch') {
        newModel.tracks = config.tracks; newModel.buildStyle = config.buildStyle; newModel.colorTheme = config.colorTheme; newModel.doAnimate = config.doAnimate;
      } else if(type === 'neural-net') {
        newModel.layers = config.layers; newModel.neuronStyle = config.neuronStyle; newModel.colorMode = config.colorMode; newModel.neuronSize = config.neuronSize; newModel.doAnimate = config.doAnimate; newModel.netLayout = config.netLayout || 'cortex'; newModel.detail = config.detail !== undefined ? config.detail : 100;
      } else if(type === 'timeline-river') {
        newModel.events = config.events; newModel.riverStyle = config.riverStyle; newModel.colorTheme = config.colorTheme; newModel.doAnimate = config.doAnimate;
      } else if(type === 'chess-board') {
        newModel.mode = config.mode; newModel.fen = config.fen; newModel.sudoku = config.sudoku; newModel.boardMat = config.boardMat; newModel.pieceStyle = config.pieceStyle;
      } else if(type === 'biometric-avatar') {
        newModel.vitals = config.vitals; newModel.avatarForm = config.avatarForm; newModel.auraColor = config.auraColor;
      } else if(type === 'moodboard-world') {
        newModel.mood = config.mood; newModel.complexity = config.complexity; newModel.doAnimate = config.doAnimate;
      } else if(type === 'molecule-3d') {
        newModel.atoms = config.atoms; newModel.bonds = config.bonds; newModel.atomScale = config.atomScale; newModel.bondThick = config.bondThick; newModel.doAnimate = config.doAnimate;
      } else if(type === 'websocket-live') {
        newModel.wsUrl = config.wsUrl; newModel.dataField = config.dataField; newModel.vizType = config.vizType; newModel.colorTheme = config.colorTheme; newModel.historyBuffer = config.historyBuffer;
      } else if(type === 'story-3d') {
        newModel.scenes = config.scenes; newModel.sceneStyle = config.sceneStyle; newModel.charStyle = config.charStyle; newModel.animCamera = config.animCamera;
      } else if(type === 'crystal-gen') {
        newModel.keyword = config.keyword; newModel.crystalType = config.crystalType; newModel.crystalColor = config.crystalColor; newModel.spikes = config.spikes; newModel.heightScale = config.heightScale; newModel.metalness = config.metalness; newModel.transparency = config.transparency; newModel.doGlow = config.doGlow;
      } else if(type === 'botany-lsystem') {
        newModel.axiom = config.axiom; newModel.rules = config.rules; newModel.iter = config.iter; newModel.angle = config.angle; newModel.cTrunk = config.cTrunk; newModel.cLeaf = config.cLeaf;
      } else if(type === 'cellular-automata') {
        newModel.gridSize = config.gridSize; newModel.generations = config.generations; newModel.density = config.density; newModel.voxelStyle = config.voxelStyle; newModel.colorMap = config.colorMap; newModel.isWire = config.isWire;
      } else if(type === 'kinetic-typo') {
        newModel.text = config.text; newModel.shape = config.shape; newModel.animStyle = config.animStyle; newModel.tSize = config.tSize; newModel.radius = config.radius; newModel.colorTheme = config.colorTheme;
      } else if(type === 'galaxy-builder') {
        newModel.seed = config.seed; newModel.starType = config.starType; newModel.sysType = config.sysType; newModel.numPlanets = config.numPlanets; newModel.numBelts = config.numBelts; newModel.showOrbits = config.showOrbits;
      } else if(type === 'sci-fi-spaceship') {
        newModel.seed = config.seed; newModel.shipClass = config.shipClass; newModel.colorPalette = config.colorPalette; newModel.complexity = config.complexity; newModel.detail = config.detail; newModel.glowEngines = config.glowEngines;
      } else if(type === 'rpg-dungeon') {
        newModel.seed = config.seed; newModel.gridW = config.gridW; newModel.gridH = config.gridH; newModel.theme = config.theme; newModel.wallHeight = config.wallHeight; newModel.hasTorches = config.hasTorches;
      } else if(type === 'weather-event') {
        newModel.evType = config.evType; newModel.colorTheme = config.colorTheme; newModel.density = config.density; newModel.speed = config.speed; newModel.scaleSize = config.scaleSize; newModel.turbulence = config.turbulence;
      } else if(type === 'impossible-geometry') {
        newModel.illusionType = config.illusionType; newModel.matStyle = config.matStyle; newModel.baseColor = config.baseColor;
      } else if(type === 'papercraft-world') {
        newModel.theme = config.theme; newModel.colorTheme = config.colorTheme; newModel.complexity = config.complexity; newModel.spread = config.spread;
      } else if(type === 'force-shield') {
        newModel.shieldShape = config.shieldShape; newModel.energyColor = config.energyColor; newModel.shieldSize = config.shieldSize; newModel.pulseSpeed = config.pulseSpeed; newModel.simImpact = config.simImpact;
      } else if(type === 'cyber-city') {
        newModel.ccDens = config.dens; newModel.ccHeight = config.h; newModel.ccStyle = config.st; newModel.ccWire = config.wf; newModel.ccAnim = config.anim;
      } else if(type === 'quantum-fluids') {
        newModel.qfCount = config.pc; newModel.qfSpeed = config.sp; newModel.qfColor = config.col; newModel.qfWire = config.wf;
      } else if(type === 'time-lapse') {
        newModel.tlComp = config.comp; newModel.tlSpeed = config.sp; newModel.tlStyle = config.st;
      } else if(type === 'product-showcase') {
        newModel.psHotspots = config.hs; newModel.psAnim = config.anim;
      } else if(type === 'social-room') {
        newModel.smUser = config.user; newModel.smText = config.text; newModel.smLikes = config.likes; newModel.smAnim = config.anim;
      } else if(type === 'git-repo') {
        newModel.grJson = config.json; newModel.grTheme = config.theme;
      } else if(type === 'webar-portal') {
        newModel.arColor = config.col; newModel.arParticles = config.parts;
      } else if(type === 'text-to-scene') {
        newModel.tsPrompt = config.prompt;
      } else if(type === 'lego-city') {
        newModel.grid = config.grid; newModel.gw = config.gw; newModel.gh = config.gh;
      } else if(type === 'ice-terrain') {
        newModel.dens = config.dens; newModel.height = config.height; newModel.aurora = config.aurora; newModel.snow = config.snow;
      } else if(type === 'lava-world') {
        newModel.size = config.size; newModel.rivers = config.rivers; newModel.style = config.style; newModel.smoke = config.smoke;
      } else if(type === 'ocean-wave') {
        newModel.wHeight = config.wHeight; newModel.wSpeed = config.wSpeed; newModel.wType = config.wType; newModel.foam = config.foam; newModel.wire = config.wire;
      } else if(type === 'mech-robot') {
        newModel.head = config.head; newModel.arm = config.arm; newModel.color = config.color; newModel.glow = config.glow;
      } else if(type === 'ancient-arch') {
        newModel.style = config.style; newModel.scale = config.scale; newModel.mat = config.mat;
      } else if(type === 'data-globe') {
        newModel.data = config.data; newModel.color = config.color;
      } else if(type === 'holo-hud') {
        newModel.style = config.style; newModel.color = config.color; newModel.scan = config.scan;
      } else if(type === 'mask-sculptor') {
        newModel.style = config.style; newModel.col1 = config.col1; newModel.col2 = config.col2; newModel.glow = config.glow; newModel.wire = config.wire;
      } else if(type === 'instrument-3d') {
        newModel.type = config.type; newModel.col = config.col; newModel.stage = config.stage; newModel.spot = config.spot; newModel.anim = config.anim;
      } else if(type === 'chem-reaction') {
        newModel.mol = config.mol; newModel.style = config.style; newModel.glow = config.glow; newModel.anim = config.anim;
      } else if(type === 'anatomy-3d') {
        newModel.sys = config.sys; newModel.view = config.view; newModel.pulse = config.pulse; newModel.glow = config.glow;
      } else if(type === 'hero-forge') {
        newModel.heroparts = config.heroparts;
        newModel.herostyle = config.herostyle;
        newModel.importedMesh = config.importedMesh;
      } else if(type === 'steampunk-chrono') {
        newModel.clockParts = config.clockParts;
        newModel.clockStyle = config.clockStyle;
        newModel.importedMesh = config.importedMesh;
      } else if(type === 'steampunk-chrono-pro') {
        newModel.clockParts = config.clockParts;
        newModel.clockStyle = config.clockStyle;
        newModel.importedMesh = config.importedMesh;
      } else if(type === 'clock-ultra') {
        newModel.clockParts = config.clockParts;
        newModel.clockStyle = config.clockStyle;
        newModel.importedMesh = config.importedMesh;
      } else {
        newModel.ultraConfig = Object.assign({}, config);
      }
      
      models.push(newModel); activeModelId = newModel.id; buildModels();
      if(window.toast) toast('✨ ' + (currentLang === 'fr' ? 'Module ajouté !' : 'Module added!'));
      return newModel.id;
  }

  function addMeshToScene(threeObject) {
      if (!scene || !threeObject) return;
      modelCount++;
      const newModel = {
        id: Date.now(), name: 'HeroForge ' + modelCount, type: '3d-model', format: 'imported-mesh',
        rawText: '', depth:10, scale:1.0, bevelVal:0, colorHex:'#6366f1', emissiveHex:'#000000',
        metalness:0.1, roughness:0.5, opacity:1.0, wireframe:false, preset:'custom', spin:false, mirror:false,
        position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,0,0), groupScale: new THREE.Vector3(1,1,1),
        meshGroup: null, importedMesh: threeObject
      };
      models.push(newModel); activeModelId = newModel.id; buildModels();
  }

  function updateHeroForgeModel(modelId, heroparts, herostyle, importedMesh, heroAnim) {
      const m = models.find(x => x.id === modelId);
      if (!m) return;
      if (m.format === 'steampunk-chrono' || m.format === 'steampunk-chrono-pro' || m.format === 'clock-ultra') {
          m.clockParts = heroparts;
          m.clockStyle = herostyle;
      }
      m.heroparts = heroparts;
      m.herostyle = herostyle;
      m.heroAnim = heroAnim || 'idle';
      if (importedMesh) m.importedMesh = importedMesh;
      buildModels();
  }
  window._hf3UpdateModel = updateHeroForgeModel;

  function removeHeroForgeModel(modelId) {
      const idx = models.findIndex(x => x.id === modelId);
      if (idx === -1) return;
      const m = models[idx];
      if (m.meshGroup && globalGroup) globalGroup.remove(m.meshGroup);
      models.splice(idx, 1);
      if (activeModelId === m.id) activeModelId = models.length ? models[models.length-1].id : null;
      syncUI();
  }
  window._hf3RemoveModel = removeHeroForgeModel;

  function updateNeuralNetModel(modelId, config) {
      const m = models.find(x => x.id === modelId);
      if (!m || m.format !== 'neural-net') return;
      if (config.layers !== undefined) m.layers = config.layers;
      if (config.neuronStyle !== undefined) m.neuronStyle = config.neuronStyle;
      if (config.colorMode !== undefined) m.colorMode = config.colorMode;
      if (config.neuronSize !== undefined) m.neuronSize = config.neuronSize;
      if (config.doAnimate !== undefined) m.doAnimate = config.doAnimate;
      if (config.netLayout !== undefined) m.netLayout = config.netLayout;
      if (config.detail !== undefined) m.detail = config.detail;
      buildModels();
  }
  window._nn3UpdateModel = updateNeuralNetModel;

  return { init, addExtraModule, getScene: () => scene, getGroup: () => globalGroup, addMeshToScene, getActiveModel: () => getActiveModel(), getModels: () => models, buildSteampunkChronoProGeo, buildClockUltraGeo, exportScene };
})();

window.SketchExtruder = SketchExtruder;

