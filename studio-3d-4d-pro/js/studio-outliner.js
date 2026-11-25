/**
 * Studio 3D/4D Pro v2.0 — Scene Outliner, Properties Inspector, Perf HUD & Interactive 3D ViewCube Gizmo
 */
(function () {
  'use strict';

  let drawer = null;
  let viewCubeEl = null;
  let fpsVal = 60, frameCount = 0, lastFpsTime = performance.now();

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  function getStats() {
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    const rend = window.SketchExtruder && window.SketchExtruder.getRenderer ? window.SketchExtruder.getRenderer() : null;
    let meshes = 0, tris = 0;
    if (grp) {
      grp.traverse(o => {
        if (o.isMesh && o.geometry) {
          meshes++;
          const g = o.geometry;
          if (g.index) tris += Math.floor(g.index.count / 3);
          else if (g.attributes && g.attributes.position) tris += Math.floor(g.attributes.position.count / 3);
        }
      });
    }
    const calls = rend && rend.info && rend.info.render ? rend.info.render.calls : 0;
    return { meshes, tris, calls };
  }

  function setCameraView(view) {
    const cam = window.SketchExtruder && window.SketchExtruder.getCamera ? window.SketchExtruder.getCamera() : null;
    const ctrl = window.SketchExtruder && window.SketchExtruder.getControls ? window.SketchExtruder.getControls() : null;
    if (!cam) return;
    const d = Math.max(120, cam.position.length() || 210);
    const map = {
      front: [0, 0, d],
      back:  [0, 0, -d],
      right: [d, 0, 0],
      left:  [-d, 0, 0],
      top:   [0, d, 0.01],
      iso:   [d * 0.62, d * 0.45, d * 0.72],
      reset: [0, 50, 200]
    };
    const p = map[view] || map.reset;
    cam.position.set(p[0], p[1], p[2]);
    if (ctrl) {
      ctrl.target.set(0, 0, 0);
      ctrl.update();
    } else {
      cam.lookAt(0, 0, 0);
    }
    if (window.toast) window.toast('🎥 Camera: ' + view.toUpperCase());
  }

  function buildViewCube() {
    const mainPane = window.SketchExtruder && window.SketchExtruder.getMainPane ? window.SketchExtruder.getMainPane() : null;
    if (!mainPane || document.getElementById('studio-viewcube')) return;
    viewCubeEl = document.createElement('div');
    viewCubeEl.id = 'studio-viewcube';
    viewCubeEl.style.cssText = 'position:absolute;bottom:14px;right:14px;z-index:22;background:rgba(11,16,34,0.86);backdrop-filter:blur(10px);border:1px solid rgba(99,102,241,0.35);border-radius:12px;padding:7px 9px;color:#cbd5e1;font-family:Inter,sans-serif;font-size:10px;box-shadow:0 8px 25px rgba(0,0,0,0.5);user-select:none;';
    viewCubeEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:5px;border-bottom:1px solid #1e293b;padding-bottom:4px;">
        <span style="font-weight:800;color:#818cf8;letter-spacing:0.5px;">🧭 VIEWCUBE</span>
        <span id="vc-perf-badge" style="color:#34d399;font-family:monospace;font-weight:700;">60 FPS</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;">
        <button data-v="top" class="vc-btn">TOP</button>
        <button data-v="front" class="vc-btn">FRONT</button>
        <button data-v="iso" class="vc-btn">ISO</button>
        <button data-v="left" class="vc-btn">LEFT</button>
        <button data-v="right" class="vc-btn">RIGHT</button>
        <button data-v="back" class="vc-btn">BACK</button>
      </div>
      <div id="vc-tri-badge" style="margin-top:5px;font-size:9px;color:#64748b;text-align:center;font-family:monospace;">0 tris · 0 obj</div>
    `;
    const style = document.createElement('style');
    style.textContent = `.vc-btn{background:#1e293b;border:1px solid #334155;border-radius:5px;color:#e2e8f0;font-size:9px;font-weight:700;padding:4px 6px;cursor:pointer;transition:0.15s;}.vc-btn:hover{background:#6366f1;border-color:#818cf8;color:#fff;}`;
    document.head.appendChild(style);
    mainPane.appendChild(viewCubeEl);
    viewCubeEl.querySelectorAll('.vc-btn').forEach(b => {
      b.onclick = () => setCameraView(b.dataset.v);
    });

    // Lightweight FPS & triangles counter
    if (window.SketchExtruder && window.SketchExtruder.registerAnimHook) {
      window.SketchExtruder.registerAnimHook('viewcube-fps', () => {
        frameCount++;
        const now = performance.now();
        if (now - lastFpsTime >= 600) {
          fpsVal = Math.round((frameCount * 1000) / (now - lastFpsTime));
          frameCount = 0;
          lastFpsTime = now;
          const fb = document.getElementById('vc-perf-badge');
          if (fb) {
            fb.textContent = fpsVal + ' FPS';
            fb.style.color = fpsVal >= 45 ? '#34d399' : (fpsVal >= 25 ? '#fbbf24' : '#f87171');
          }
          const tb = document.getElementById('vc-tri-badge');
          if (tb) {
            const st = getStats();
            const cnt = window.SketchExtruder.getModels ? window.SketchExtruder.getModels().length : 0;
            tb.textContent = `${st.tris.toLocaleString()} tris · ${cnt} obj`;
          }
        }
      });
    }
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    const models = (window.SketchExtruder && window.SketchExtruder.getModels) ? window.SketchExtruder.getModels() : [];
    const active = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    const stats = getStats();

    const rowsHtml = models.length === 0
      ? `<div style="padding:18px;text-align:center;color:#64748b;font-size:11px;">${fr ? 'Scène vide. Ajoutez un module ou un modèle.' : 'Empty scene. Add a module or template.'}</div>`
      : models.map(m => {
          const isAct = active && active.id === m.id;
          return `
            <div class="outliner-row" data-id="${m.id}" style="display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:8px;margin-bottom:4px;cursor:pointer;background:${isAct ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.03)'};border:1px solid ${isAct ? 'rgba(99,102,241,0.55)' : 'rgba(255,255,255,0.05)'};">
              <span style="font-size:12px;">${m.hidden ? '🙈' : '🧊'}</span>
              <span class="ol-name" title="${fr ? 'Double-clic pour renommer' : 'Double-click to rename'}" style="flex:1;font-size:11px;font-weight:${isAct ? '800' : '600'};color:${m.hidden ? '#64748b' : '#f1f5f9'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${String(m.name || m.format || 'Object').replace(/</g, '&lt;')}</span>
              <button class="ol-vis" title="${fr ? 'Afficher/Masquer' : 'Show/Hide'}" style="background:none;border:none;cursor:pointer;font-size:11px;opacity:${m.hidden ? '0.45' : '1'};">👁️</button>
              <button class="ol-lock" title="${fr ? 'Verrouiller' : 'Lock'}" style="background:none;border:none;cursor:pointer;font-size:11px;opacity:${m.locked ? '1' : '0.4'};">🔒</button>
              <button class="ol-dup" title="${fr ? 'Dupliquer' : 'Duplicate'}" style="background:none;border:none;cursor:pointer;font-size:11px;">📋</button>
              <button class="ol-del" title="${fr ? 'Supprimer' : 'Delete'}" style="background:none;border:none;cursor:pointer;font-size:11px;color:#f87171;">🗑️</button>
            </div>
          `;
        }).join('');

    let inspectorHtml = '';
    if (active) {
      const p = active.meshGroup ? active.meshGroup.position : active.position;
      const r = active.meshGroup ? active.meshGroup.rotation : active.rotation;
      const s = active.meshGroup ? active.meshGroup.scale : active.groupScale;
      const r2d = v => Math.round((v || 0) * 180 / Math.PI);
      inspectorHtml = `
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid #1e293b;">
          <div style="font-size:10px;font-weight:800;color:#818cf8;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:8px;">⚙️ ${fr ? 'Inspecteur Transform' : 'Transform Inspector'}</div>
          <div style="display:grid;grid-template-columns:46px 1fr 1fr 1fr;gap:4px;align-items:center;font-size:10px;margin-bottom:5px;">
            <span style="color:#94a3b8;">Pos</span>
            <input type="number" step="5" id="ol-px" value="${Math.round(p.x)}" class="ol-num">
            <input type="number" step="5" id="ol-py" value="${Math.round(p.y)}" class="ol-num">
            <input type="number" step="5" id="ol-pz" value="${Math.round(p.z)}" class="ol-num">
          </div>
          <div style="display:grid;grid-template-columns:46px 1fr 1fr 1fr;gap:4px;align-items:center;font-size:10px;margin-bottom:5px;">
            <span style="color:#94a3b8;">Rot°</span>
            <input type="number" step="15" id="ol-rx" value="${r2d(r.x)}" class="ol-num">
            <input type="number" step="15" id="ol-ry" value="${r2d(r.y)}" class="ol-num">
            <input type="number" step="15" id="ol-rz" value="${r2d(r.z)}" class="ol-num">
          </div>
          <div style="display:grid;grid-template-columns:46px 1fr 1fr 1fr;gap:4px;align-items:center;font-size:10px;margin-bottom:10px;">
            <span style="color:#94a3b8;">Scale</span>
            <input type="number" step="0.1" id="ol-sx" value="${(s.x || 1).toFixed(2)}" class="ol-num">
            <input type="number" step="0.1" id="ol-sy" value="${(s.y || 1).toFixed(2)}" class="ol-num">
            <input type="number" step="0.1" id="ol-sz" value="${(s.z || 1).toFixed(2)}" class="ol-num">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button id="ol-center" class="studio-btn-sec">🎯 ${fr ? 'Centrer (0,0,0)' : 'Center (0,0,0)'}</button>
            <button id="ol-snap" class="studio-btn-sec">🧲 ${fr ? 'Snap Grille' : 'Snap to Grid'}</button>
          </div>
        </div>
      `;
    }

    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🌳', fr ? 'Hiérarchie & Inspecteur' : 'Scene Outliner & Inspector')}
      <style>.ol-num{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;border-radius:5px;color:#e2e8f0;padding:4px 5px;font-size:10px;font-family:monospace;}</style>
      <div style="display:flex;justify-content:space-between;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;padding:7px 10px;margin-bottom:10px;font-size:10px;font-family:monospace;">
        <span>📦 ${models.length} obj</span>
        <span>🔺 ${stats.tris.toLocaleString()}</span>
        <span>⚡ ${fpsVal} fps</span>
      </div>
      <div style="max-height:200px;overflow-y:auto;">${rowsHtml}</div>
      ${inspectorHtml}
      <div style="display:flex;gap:6px;margin-top:12px;">
        <button id="ol-add-cube" class="studio-btn-sec" style="flex:1;">+ 🧊 Cube</button>
        <button id="ol-add-sphere" class="studio-btn-sec" style="flex:1;">+ 🔮 Sphere</button>
        <button id="ol-clear-all" class="studio-btn-sec" style="color:#f87171;border-color:rgba(239,68,68,0.35);">🗑️ ${fr ? 'Vider' : 'Clear'}</button>
      </div>
    `;

    // Bind row events
    drawer.panel.querySelectorAll('.outliner-row').forEach(row => {
      const id = Number(row.dataset.id);
      row.onclick = (e) => {
        if (e.target.closest('button')) return;
        window.SketchExtruder.setActiveModel(id);
      };
      row.querySelector('.ol-name').ondblclick = () => {
        const m = models.find(x => x.id === id);
        if (!m) return;
        const next = prompt(fr ? 'Nouveau nom :' : 'Rename object:', m.name || '');
        if (next && next.trim()) { m.name = next.trim(); renderDrawer(); }
      };
      row.querySelector('.ol-vis').onclick = () => {
        const m = models.find(x => x.id === id);
        if (!m) return;
        m.hidden = !m.hidden;
        if (m.meshGroup) m.meshGroup.visible = !m.hidden;
        renderDrawer();
      };
      row.querySelector('.ol-lock').onclick = () => {
        const m = models.find(x => x.id === id);
        if (!m) return;
        m.locked = !m.locked;
        const tc = window.SketchExtruder.getTransformControl && window.SketchExtruder.getTransformControl();
        if (m.locked && tc && tc.object === m.meshGroup) tc.detach();
        renderDrawer();
      };
      row.querySelector('.ol-dup').onclick = () => window.SketchExtruder.duplicateModel(id);
      row.querySelector('.ol-del').onclick = () => window.SketchExtruder.removeModel(id);
    });

    if (active) {
      const applyTransform = () => {
        const px = parseFloat(drawer.panel.querySelector('#ol-px').value) || 0;
        const py = parseFloat(drawer.panel.querySelector('#ol-py').value) || 0;
        const pz = parseFloat(drawer.panel.querySelector('#ol-pz').value) || 0;
        const rx = (parseFloat(drawer.panel.querySelector('#ol-rx').value) || 0) * Math.PI / 180;
        const ry = (parseFloat(drawer.panel.querySelector('#ol-ry').value) || 0) * Math.PI / 180;
        const rz = (parseFloat(drawer.panel.querySelector('#ol-rz').value) || 0) * Math.PI / 180;
        const sx = Math.max(0.05, parseFloat(drawer.panel.querySelector('#ol-sx').value) || 1);
        const sy = Math.max(0.05, parseFloat(drawer.panel.querySelector('#ol-sy').value) || 1);
        const sz = Math.max(0.05, parseFloat(drawer.panel.querySelector('#ol-sz').value) || 1);
        active.position.set(px, py, pz);
        active.rotation.set(rx, ry, rz);
        active.groupScale.set(sx, sy, sz);
        if (active.meshGroup) {
          active.meshGroup.position.set(px, py, pz);
          active.meshGroup.rotation.set(rx, ry, rz);
          active.meshGroup.scale.set(sx, sy, sz);
        }
      };
      drawer.panel.querySelectorAll('.ol-num').forEach(inp => inp.addEventListener('input', applyTransform));
      drawer.panel.querySelector('#ol-center').onclick = () => {
        active.position.set(0, 0, 0);
        if (active.meshGroup) active.meshGroup.position.set(0, 0, 0);
        renderDrawer();
      };
      drawer.panel.querySelector('#ol-snap').onclick = () => {
        const p = active.meshGroup ? active.meshGroup.position : active.position;
        const sx = Math.round(p.x / 10) * 10, sy = Math.round(p.y / 10) * 10, sz = Math.round(p.z / 10) * 10;
        active.position.set(sx, sy, sz);
        if (active.meshGroup) active.meshGroup.position.set(sx, sy, sz);
        renderDrawer();
      };
    }

    drawer.panel.querySelector('#ol-add-cube').onclick = () => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(36, 36, 36), new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.4, roughness: 0.25 }));
      m.castShadow = true; m.receiveShadow = true;
      window.SketchExtruder.addMeshToScene(m, 'PBR Cube');
    };
    drawer.panel.querySelector('#ol-add-sphere').onclick = () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(24, 40, 32), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7, roughness: 0.15 }));
      m.castShadow = true; m.receiveShadow = true;
      window.SketchExtruder.addMeshToScene(m, 'PBR Sphere');
    };
    drawer.panel.querySelector('#ol-clear-all').onclick = () => {
      if (confirm(fr ? 'Supprimer tous les objets de la scène ?' : 'Clear all objects from the scene?')) {
        window.SketchExtruder.clearScene();
      }
    };
  }

  function ensureInit() {
    if (!drawer && window.StudioShellUI) {
      drawer = window.StudioShellUI.createToolDrawer('studio-outliner-drawer');
    }
    buildViewCube();
  }

  window.addEventListener('studio:composerready', () => setTimeout(ensureInit, 100));
  window.addEventListener('studio:scenechange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });
  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioOutliner = {
    toggle() { ensureInit(); if (!drawer) return; drawer.toggle(); if (drawer.panel.classList.contains('open')) renderDrawer(); },
    setCameraView
  };
})();
