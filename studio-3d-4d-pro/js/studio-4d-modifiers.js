/**
 * Studio 3D/4D Pro v2.0 — True 4D Hyper-Polytopes & Non-Destructive 4D Modifiers
 * Real 4D (x,y,z,w) stereographic projection (Tesseract, 16-Cell, 24-Cell, 5-Cell, Clifford Torus)
 * + Live 4D Modifiers applicable to ANY scene object (Time-Morph, Glitch Slice, Liquid Pulse, Particle Dissolve, Audio Pulse)
 */
(function () {
  'use strict';

  let drawer = null;
  const active4DObjects = [];
  const state = {
    xwSpeed: 0.9, ywSpeed: 0.55, zwSpeed: 0.35, wDist: 2.8,
    activeModifier: 'none', modStrength: 1.0, modSpeed: 1.5
  };

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  // ── 4D Geometry Generators ─────────────────────────────────────────────
  function makeTesseract() {
    const verts = [];
    for (let i = 0; i < 16; i++) {
      verts.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
    }
    const edges = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff && (diff & (diff - 1)) === 0) edges.push([i, j]);
      }
    }
    return { verts, edges, scale: 36, name: '4D Tesseract (8-Cell)' };
  }

  function make16Cell() {
    const verts = [
      [1,0,0,0], [-1,0,0,0], [0,1,0,0], [0,-1,0,0],
      [0,0,1,0], [0,0,-1,0], [0,0,0,1], [0,0,0,-1]
    ];
    const edges = [];
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        // Connect all pairs except antipodes (0-1, 2-3, 4-5, 6-7)
        if ((i ^ 1) !== j) edges.push([i, j]);
      }
    }
    return { verts, edges, scale: 48, name: '4D Orthoplex (16-Cell)' };
  }

  function make24Cell() {
    const verts = [];
    for (let a = 0; a < 4; a++) {
      for (let b = a + 1; b < 4; b++) {
        for (const sa of [-1, 1]) {
          for (const sb of [-1, 1]) {
            const v = [0, 0, 0, 0];
            v[a] = sa; v[b] = sb;
            verts.push(v);
          }
        }
      }
    }
    const edges = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        let d2 = 0;
        for (let k = 0; k < 4; k++) d2 += (verts[i][k] - verts[j][k]) ** 2;
        if (Math.abs(d2 - 2) < 0.01) edges.push([i, j]);
      }
    }
    return { verts, edges, scale: 38, name: '4D Icositetrachoron (24-Cell)' };
  }

  function make5Cell() {
    const s = 1 / Math.sqrt(5);
    const verts = [
      [1, 1, 1, -s], [1, -1, -1, -s], [-1, 1, -1, -s], [-1, -1, 1, -s], [0, 0, 0, Math.sqrt(5) - s]
    ];
    const edges = [];
    for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) edges.push([i, j]);
    return { verts, edges, scale: 40, name: '4D Simplex (5-Cell)' };
  }

  function makeCliffordTorus() {
    const verts = [], edges = [];
    const nu = 18, nv = 12;
    for (let iu = 0; iu < nu; iu++) {
      const u = (iu / nu) * Math.PI * 2;
      for (let iv = 0; iv < nv; iv++) {
        const v = (iv / nv) * Math.PI * 2;
        verts.push([Math.cos(u), Math.sin(u), Math.cos(v), Math.sin(v)]);
        const idx = iu * nv + iv;
        edges.push([idx, ((iu + 1) % nu) * nv + iv]);
        edges.push([idx, iu * nv + ((iv + 1) % nv)]);
      }
    }
    return { verts, edges, scale: 34, name: '4D Clifford Torus' };
  }

  function project4D(v, t) {
    let [x, y, z, w] = v;
    const axw = t * state.xwSpeed, ayw = t * state.ywSpeed, azw = t * state.zwSpeed;
    // Rotate XW
    let cx = Math.cos(axw), sx = Math.sin(axw);
    let nx = x * cx - w * sx, nw = x * sx + w * cx; x = nx; w = nw;
    // Rotate YW
    let cy = Math.cos(ayw), sy = Math.sin(ayw);
    let ny = y * cy - w * sy; nw = y * sy + w * cy; y = ny; w = nw;
    // Rotate ZW
    let cz = Math.cos(azw), sz = Math.sin(azw);
    let nz = z * cz - w * sz; nw = z * sz + w * cz; z = nz; w = nw;

    const p = state.wDist / Math.max(0.55, state.wDist - w);
    return [x * p, y * p, z * p, w];
  }

  function spawn4DPolytope(kind, colorHex) {
    if (!window.SketchExtruder || !window.SketchExtruder.addMeshToScene) return;
    const gens = { tesseract: makeTesseract, cell16: make16Cell, cell24: make24Cell, cell5: make5Cell, clifford: makeCliffordTorus };
    const data = (gens[kind] || makeTesseract)();
    const group = new THREE.Group();
    const col = new THREE.Color(colorHex || '#38bdf8');

    // LineSegments for 4D edges
    const posArr = new Float32Array(data.edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.92 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Glowing vertex spheres (for <= 32 verts, Points for Clifford)
    let nodeMeshes = null, pointCloud = null;
    if (data.verts.length <= 32) {
      const nodeGeo = new THREE.SphereGeometry(2.6, 12, 12);
      const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: col, emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.2 });
      nodeMeshes = data.verts.map(() => {
        const m = new THREE.Mesh(nodeGeo, nodeMat);
        group.add(m);
        return m;
      });
    } else {
      const pArr = new Float32Array(data.verts.length * 3);
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
      pointCloud = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf472b6, size: 3.2 }));
      group.add(pointCloud);
    }

    const entry = { data, group, lineGeo, nodeMeshes, pointCloud };
    updateSingle4D(entry, 0);
    active4DObjects.push(entry);
    window.SketchExtruder.addMeshToScene(group, data.name);
    ensureAnimLoop();
    if (window.toast) window.toast(`🌀 ${data.name} ${isFR() ? 'ajouté !' : 'spawned!'}`);
  }

  function updateSingle4D(entry, t) {
    const { data, lineGeo, nodeMeshes, pointCloud } = entry;
    const proj = data.verts.map(v => project4D(v, t));
    const arr = lineGeo.attributes.position.array;
    const sc = data.scale;
    for (let i = 0; i < data.edges.length; i++) {
      const [a, b] = data.edges[i];
      const pa = proj[a], pb = proj[b];
      arr[i * 6]     = pa[0] * sc; arr[i * 6 + 1] = pa[1] * sc; arr[i * 6 + 2] = pa[2] * sc;
      arr[i * 6 + 3] = pb[0] * sc; arr[i * 6 + 4] = pb[1] * sc; arr[i * 6 + 5] = pb[2] * sc;
    }
    lineGeo.attributes.position.needsUpdate = true;
    if (nodeMeshes) {
      for (let i = 0; i < nodeMeshes.length; i++) {
        const p = proj[i];
        nodeMeshes[i].position.set(p[0] * sc, p[1] * sc, p[2] * sc);
        const s = Math.max(0.55, 0.8 + p[3] * 0.35);
        nodeMeshes[i].scale.setScalar(s);
      }
    }
    if (pointCloud) {
      const pa = pointCloud.geometry.attributes.position.array;
      for (let i = 0; i < proj.length; i++) {
        pa[i * 3] = proj[i][0] * sc; pa[i * 3 + 1] = proj[i][1] * sc; pa[i * 3 + 2] = proj[i][2] * sc;
      }
      pointCloud.geometry.attributes.position.needsUpdate = true;
    }
  }

  // ── Non-Destructive 4D Modifiers on Active Model ────────────────────────
  function applyActive4DModifier(t) {
    if (state.activeModifier === 'none') return;
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) return;
    const speed = state.modSpeed, str = state.modStrength;

    act.meshGroup.traverse(child => {
      if (!child.isMesh || !child.geometry || !child.geometry.attributes.position) return;
      const pos = child.geometry.attributes.position;
      if (!child.userData._origPos4D) {
        child.userData._origPos4D = new Float32Array(pos.array);
      }
      const orig = child.userData._origPos4D;
      const arr = pos.array;
      const mode = state.activeModifier;

      if (mode === 'morph') {
        for (let i = 0; i < arr.length; i += 3) {
          const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2];
          const w = 1 + Math.sin(t * speed + (ox + oy + oz) * 0.08) * 0.14 * str;
          arr[i] = ox * w; arr[i + 1] = oy * w; arr[i + 2] = oz * w;
        }
      } else if (mode === 'glitch') {
        const burst = Math.sin(t * speed * 4) > 0.7 ? 1 : 0.15;
        for (let i = 0; i < arr.length; i += 3) {
          const oy = orig[i + 1];
          const band = Math.sin(oy * 0.45 + t * speed * 6);
          arr[i] = orig[i] + (band > 0.8 ? Math.sin(t * 25 + oy) * 6 * str * burst : 0);
          arr[i + 1] = oy; arr[i + 2] = orig[i + 2];
        }
      } else if (mode === 'liquid') {
        for (let i = 0; i < arr.length; i += 3) {
          const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2];
          const r = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
          const d = Math.sin(r * 0.22 - t * speed * 2.5) * 3.5 * str;
          arr[i] = ox + (ox / r) * d; arr[i + 1] = oy + (oy / r) * d; arr[i + 2] = oz + (oz / r) * d;
        }
      } else if (mode === 'dissolve') {
        const f = (Math.sin(t * speed * 0.9) * 0.5 + 0.5) * 28 * str;
        for (let i = 0; i < arr.length; i += 3) {
          const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2];
          const seed = Math.sin(i * 12.9898) * 43758.5453;
          const frac = seed - Math.floor(seed);
          arr[i] = ox + (frac - 0.5) * f;
          arr[i + 1] = oy + Math.abs(Math.cos(i)) * f * 0.9;
          arr[i + 2] = oz + (Math.sin(i * 3.1) * 0.5) * f;
        }
      } else if (mode === 'audio') {
        const beat = Math.pow(Math.sin(t * speed * 3.2) * 0.5 + 0.5, 3);
        const sc = 1 + beat * 0.35 * str;
        for (let i = 0; i < arr.length; i += 3) {
          arr[i] = orig[i] * sc; arr[i + 1] = orig[i + 1] * (1 + beat * 0.5 * str); arr[i + 2] = orig[i + 2] * sc;
        }
      }
      pos.needsUpdate = true;
    });
  }

  function resetActive4DModifier() {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) return;
    act.meshGroup.traverse(child => {
      if (child.isMesh && child.userData._origPos4D && child.geometry && child.geometry.attributes.position) {
        child.geometry.attributes.position.array.set(child.userData._origPos4D);
        child.geometry.attributes.position.needsUpdate = true;
        child.geometry.computeVertexNormals();
      }
    });
  }

  function ensureAnimLoop() {
    if (!window.SketchExtruder || !window.SketchExtruder.registerAnimHook) return;
    window.SketchExtruder.registerAnimHook('studio-4d-engine', (t) => {
      for (let i = active4DObjects.length - 1; i >= 0; i--) {
        if (!active4DObjects[i].group.parent) { active4DObjects.splice(i, 1); continue; }
        updateSingle4D(active4DObjects[i], t);
      }
      applyActive4DModifier(t);
    });
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🌀', fr ? 'Labo 4D & Hyper-Modificateurs' : '4D Hyper-Polytopes & Modifiers')}
      <div style="font-size:10px;font-weight:800;color:#f472b6;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">🔷 ${fr ? 'Polytopes 4D (Projection W→3D)' : 'True 4D Polytopes (W→3D Projection)'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
        <button class="studio-btn-sec m4d-spawn" data-k="tesseract">🧊 Tesseract (8-Cell)</button>
        <button class="studio-btn-sec m4d-spawn" data-k="cell16">💎 16-Cell Orthoplex</button>
        <button class="studio-btn-sec m4d-spawn" data-k="cell24">🌟 24-Cell Hyper</button>
        <button class="studio-btn-sec m4d-spawn" data-k="cell5">🔺 5-Cell Simplex</button>
        <button class="studio-btn-sec m4d-spawn" data-k="clifford" style="grid-column:span 2;">🍩 Clifford 4D Hypersphere Torus</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px;font-size:10px;color:#94a3b8;">
        <div>XW <b id="v4-xw">${state.xwSpeed.toFixed(1)}</b><input type="range" id="r4-xw" min="0" max="3" step="0.1" value="${state.xwSpeed}" style="width:100%;accent-color:#ec4899;"></div>
        <div>YW <b id="v4-yw">${state.ywSpeed.toFixed(1)}</b><input type="range" id="r4-yw" min="0" max="3" step="0.1" value="${state.ywSpeed}" style="width:100%;accent-color:#a855f7;"></div>
        <div>ZW <b id="v4-zw">${state.zwSpeed.toFixed(1)}</b><input type="range" id="r4-zw" min="0" max="3" step="0.1" value="${state.zwSpeed}" style="width:100%;accent-color:#38bdf8;"></div>
      </div>

      <div style="font-size:10px;font-weight:800;color:#22d3ee;text-transform:uppercase;letter-spacing:0.6px;margin:10px 0 6px;border-top:1px solid #1e293b;padding-top:10px;">⚡ ${fr ? 'Modificateurs 4D Live (sur objet actif)' : 'Live 4D Modifiers (Active Object)'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:10px;">
        ${[
          ['none', '⏹ Off', '⏹ Désactivé'],
          ['morph', '🌊 Time Morph', '🌊 Morph Temps'],
          ['glitch', '⚡ Holo Glitch', '⚡ Glitch Holo'],
          ['liquid', '💧 Liquid Pulse', '💧 Métal Liquide'],
          ['dissolve', '✨ Dissolve 4D', '✨ Dissolution 4D'],
          ['audio', '🎵 Beat Pulse', '🎵 Impulsion Audio']
        ].map(([id, en, fl]) => `
          <button class="studio-btn-sec m4d-mod" data-m="${id}" style="border-color:${state.activeModifier === id ? '#ec4899' : '#334155'};background:${state.activeModifier === id ? 'rgba(236,72,153,0.22)' : '#1e293b'};">${fr ? fl : en}</button>
        `).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:10px;color:#94a3b8;">
        <div>${fr ? 'Intensité' : 'Strength'} <b id="v4-str">${state.modStrength.toFixed(1)}</b><input type="range" id="r4-str" min="0.2" max="2.5" step="0.1" value="${state.modStrength}" style="width:100%;accent-color:#22d3ee;"></div>
        <div>${fr ? 'Vitesse' : 'Speed'} <b id="v4-spd">${state.modSpeed.toFixed(1)}</b><input type="range" id="r4-spd" min="0.3" max="4" step="0.1" value="${state.modSpeed}" style="width:100%;accent-color:#22d3ee;"></div>
      </div>
    `;

    drawer.panel.querySelectorAll('.m4d-spawn').forEach(b => {
      b.onclick = () => spawn4DPolytope(b.dataset.k, b.dataset.k === 'cell24' ? '#f472b6' : '#38bdf8');
    });
    const bindR = (id, vid, key) => {
      drawer.panel.querySelector(id).oninput = e => {
        state[key] = parseFloat(e.target.value);
        drawer.panel.querySelector(vid).textContent = state[key].toFixed(1);
      };
    };
    bindR('#r4-xw', '#v4-xw', 'xwSpeed');
    bindR('#r4-yw', '#v4-yw', 'ywSpeed');
    bindR('#r4-zw', '#v4-zw', 'zwSpeed');
    bindR('#r4-str', '#v4-str', 'modStrength');
    bindR('#r4-spd', '#v4-spd', 'modSpeed');

    drawer.panel.querySelectorAll('.m4d-mod').forEach(b => {
      b.onclick = () => {
        if (b.dataset.m === 'none') resetActive4DModifier();
        state.activeModifier = b.dataset.m;
        ensureAnimLoop();
        renderDrawer();
      };
    });
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.Studio4DModifiers = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-4d-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    },
    spawn4DPolytope
  };
})();
