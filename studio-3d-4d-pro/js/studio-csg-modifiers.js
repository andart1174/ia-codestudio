/**
 * Studio 3D/4D Pro v2.0 — Boolean CSG Sculpting (SDF Union / Subtract / Intersect) + Radial/Grid Array & Mirror Modifiers
 * 100% pure client-side Three.js geometry math — builds clean watertight meshes ready for STL 3D printing!
 */
(function () {
  'use strict';

  let drawer = null;
  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  // ── Signed Distance Functions for Exact Watertight Boolean CSG Sculptures ──
  const SDF = {
    box: (x, y, z, r) => Math.max(Math.abs(x) - r, Math.abs(y) - r, Math.abs(z) - r),
    sphere: (x, y, z, r) => Math.sqrt(x * x + y * y + z * z) - r,
    cylinder: (x, y, z, r) => Math.max(Math.sqrt(x * x + z * z) - r * 0.72, Math.abs(y) - r * 1.15),
    torus: (x, y, z, r) => {
      const qx = Math.sqrt(x * x + z * z) - r * 0.72;
      return Math.sqrt(qx * qx + y * y) - r * 0.32;
    }
  };

  function generateCSGSculpture(shapeA, shapeB, op, offsetX, res, colorHex) {
    const fnA = SDF[shapeA] || SDF.box;
    const fnB = SDF[shapeB] || SDF.sphere;
    const R = 18;
    const N = Math.max(12, Math.min(28, res || 18));
    const bound = R * 1.85;
    const step = (bound * 2) / N;

    // Evaluate voxel SDF grid and emit exposed boundary faces only (clean watertight BufferGeometry!)
    const solid = new Uint8Array(N * N * N);
    const idx = (ix, iy, iz) => ix + N * (iy + N * iz);

    for (let iz = 0; iz < N; iz++) {
      const z = -bound + (iz + 0.5) * step;
      for (let iy = 0; iy < N; iy++) {
        const y = -bound + (iy + 0.5) * step;
        for (let ix = 0; ix < N; ix++) {
          const x = -bound + (ix + 0.5) * step;
          const dA = fnA(x, y, z, R);
          const dB = fnB(x - offsetX, y, z, R * 0.85);
          let d;
          if (op === 'union') d = Math.min(dA, dB);
          else if (op === 'subtract') d = Math.max(dA, -dB);
          else d = Math.max(dA, dB); // intersect
          if (d <= 0) solid[idx(ix, iy, iz)] = 1;
        }
      }
    }

    const pos = [], norm = [];
    const h = step * 0.5;
    const faces = [
      { dir: [1,0,0],  v: [[h,-h,-h],[h,h,-h],[h,h,h],[h,-h,h]] },
      { dir: [-1,0,0], v: [[-h,-h,h],[-h,h,h],[-h,h,-h],[-h,-h,-h]] },
      { dir: [0,1,0],  v: [[-h,h,-h],[-h,h,h],[h,h,h],[h,h,-h]] },
      { dir: [0,-1,0], v: [[-h,-h,h],[-h,-h,-h],[h,-h,-h],[h,-h,h]] },
      { dir: [0,0,1],  v: [[-h,-h,h],[h,-h,h],[h,h,h],[-h,h,h]] },
      { dir: [0,0,-1], v: [[h,-h,-h],[-h,-h,-h],[-h,h,-h],[h,h,-h]] }
    ];

    for (let iz = 0; iz < N; iz++) {
      const cz = -bound + (iz + 0.5) * step;
      for (let iy = 0; iy < N; iy++) {
        const cy = -bound + (iy + 0.5) * step;
        for (let ix = 0; ix < N; ix++) {
          if (!solid[idx(ix, iy, iz)]) continue;
          const cx = -bound + (ix + 0.5) * step;
          for (const f of faces) {
            const nx = ix + f.dir[0], ny = iy + f.dir[1], nz = iz + f.dir[2];
            const neighborSolid = (nx >= 0 && nx < N && ny >= 0 && ny < N && nz >= 0 && nz < N) ? solid[idx(nx, ny, nz)] : 0;
            if (!neighborSolid) {
              const p0 = f.v[0], p1 = f.v[1], p2 = f.v[2], p3 = f.v[3];
              const tri = [p0, p1, p2, p0, p2, p3];
              for (const p of tri) {
                pos.push(cx + p[0], cy + p[1], cz + p[2]);
                norm.push(f.dir[0], f.dir[1], f.dir[2]);
              }
            }
          }
        }
      }
    }

    if (pos.length === 0) {
      if (window.toast) window.toast(isFR() ? '⚠️ Intersection vide — ajustez le décalage' : '⚠️ Empty CSG result — adjust offset');
      return;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
    const mat = new THREE.MeshStandardMaterial({ color: colorHex || '#6366f1', metalness: 0.45, roughness: 0.28 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true; mesh.receiveShadow = true;
    const label = `CSG ${op.toUpperCase()} (${shapeA}/${shapeB})`;
    window.SketchExtruder.addMeshToScene(mesh, label);
    if (window.toast) window.toast(`🧩 ${label} (${Math.floor(pos.length / 9)} tris)`);
  }

  // ── Non-Destructive Array & Mirror Modifiers on Active Object ───────────
  function applyRadialArray(count, radius, tiltDeg) {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) {
      if (window.toast) window.toast(isFR() ? '⚠️ Sélectionnez un objet d’abord' : '⚠️ Select an object first');
      return;
    }
    const group = new THREE.Group();
    const tiltRad = (tiltDeg || 0) * Math.PI / 180;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const clone = act.meshGroup.clone(true);
      clone.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      clone.rotation.set(tiltRad, -a, 0);
      clone.scale.multiplyScalar(0.45);
      group.add(clone);
    }
    window.SketchExtruder.addMeshToScene(group, `Radial Array ×${count}`, { spin: true });
    if (window.toast) window.toast(`❄️ Radial Array ×${count} created!`);
  }

  function applyGridArray(nx, ny, nz, spacing) {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) {
      if (window.toast) window.toast(isFR() ? '⚠️ Sélectionnez un objet d’abord' : '⚠️ Select an object first');
      return;
    }
    const group = new THREE.Group();
    for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
        for (let iz = 0; iz < nz; iz++) {
          const c = act.meshGroup.clone(true);
          c.position.set((ix - (nx - 1) / 2) * spacing, (iy - (ny - 1) / 2) * spacing, (iz - (nz - 1) / 2) * spacing);
          c.scale.multiplyScalar(0.35);
          group.add(c);
        }
      }
    }
    window.SketchExtruder.addMeshToScene(group, `Grid Array ${nx}×${ny}×${nz}`);
    if (window.toast) window.toast(`🧊 Grid Array ${nx}×${ny}×${nz} created!`);
  }

  function applyMirror(axis, offset) {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) {
      if (window.toast) window.toast(isFR() ? '⚠️ Sélectionnez un objet d’abord' : '⚠️ Select an object first');
      return;
    }
    const clone = act.meshGroup.clone(true);
    if (axis === 'x') { clone.scale.x *= -1; clone.position.x = -clone.position.x + offset; }
    else if (axis === 'y') { clone.scale.y *= -1; clone.position.y = -clone.position.y + offset; }
    else { clone.scale.z *= -1; clone.position.z = -clone.position.z + offset; }
    window.SketchExtruder.addMeshToScene(clone, `${act.name} (Mirror ${axis.toUpperCase()})`);
    if (window.toast) window.toast(`🪞 Mirrored along ${axis.toUpperCase()}-axis!`);
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🧩', fr ? 'Sculpture CSG & Modificateurs' : 'Boolean CSG & Array Modifiers')}
      <div style="font-size:10px;font-weight:800;color:#818cf8;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">✂️ ${fr ? 'Opérations Booléennes CSG (Watertight STL)' : 'Boolean CSG Sculpting (Watertight STL)'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
        <div>
          <label style="font-size:9.5px;color:#94a3b8;">Shape A</label>
          <select id="csg-a" style="width:100%;padding:6px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#fff;font-size:11px;">
            <option value="box">Cube</option><option value="sphere">Sphere</option><option value="cylinder">Cylinder</option><option value="torus">Torus</option>
          </select>
        </div>
        <div>
          <label style="font-size:9.5px;color:#94a3b8;">Shape B (Cutter)</label>
          <select id="csg-b" style="width:100%;padding:6px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#fff;font-size:11px;">
            <option value="sphere" selected>Sphere</option><option value="cylinder">Cylinder</option><option value="box">Cube</option><option value="torus">Torus</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 56px;gap:6px;align-items:end;margin-bottom:8px;font-size:10px;color:#94a3b8;">
        <div>Offset X <b id="csg-off-v">10</b><input type="range" id="csg-off" min="0" max="24" value="10" style="width:100%;accent-color:#6366f1;"></div>
        <div>Res <b id="csg-res-v">20</b><input type="range" id="csg-res" min="12" max="26" value="20" style="width:100%;accent-color:#6366f1;"></div>
        <input type="color" id="csg-col" value="#6366f1" style="width:100%;height:26px;border:none;background:none;cursor:pointer;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:14px;">
        <button id="csg-union" class="studio-btn-primary" style="padding:7px 4px;font-size:10.5px;">∪ Union</button>
        <button id="csg-sub" class="studio-btn-primary" style="padding:7px 4px;font-size:10.5px;background:linear-gradient(135deg,#ef4444,#f97316);">− Subtract</button>
        <button id="csg-int" class="studio-btn-primary" style="padding:7px 4px;font-size:10.5px;background:linear-gradient(135deg,#10b981,#06b6d4);">∩ Intersect</button>
      </div>

      <div style="font-size:10px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;border-top:1px solid #1e293b;padding-top:10px;">❄️ ${fr ? 'Matrice Radiale & Grille (Objet actif)' : 'Radial & Grid Array (Active Object)'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px;color:#94a3b8;margin-bottom:6px;">
        <div>Count <b id="arr-cnt-v">8</b><input type="range" id="arr-cnt" min="3" max="20" value="8" style="width:100%;accent-color:#38bdf8;"></div>
        <div>Radius <b id="arr-rad-v">65</b><input type="range" id="arr-rad" min="25" max="120" value="65" style="width:100%;accent-color:#38bdf8;"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
        <button id="arr-radial" class="studio-btn-sec">❄️ ${fr ? 'Anneau Radial' : 'Radial Array'}</button>
        <button id="arr-grid" class="studio-btn-sec">🧊 ${fr ? 'Grille 3×2×3' : 'Grid 3×2×3'}</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;">
        <button class="studio-btn-sec mir-btn" data-ax="x">🪞 Mirror X</button>
        <button class="studio-btn-sec mir-btn" data-ax="y">🪞 Mirror Y</button>
        <button class="studio-btn-sec mir-btn" data-ax="z">🪞 Mirror Z</button>
      </div>
    `;

    drawer.panel.querySelector('#csg-off').oninput = e => drawer.panel.querySelector('#csg-off-v').textContent = e.target.value;
    drawer.panel.querySelector('#csg-res').oninput = e => drawer.panel.querySelector('#csg-res-v').textContent = e.target.value;
    drawer.panel.querySelector('#arr-cnt').oninput = e => drawer.panel.querySelector('#arr-cnt-v').textContent = e.target.value;
    drawer.panel.querySelector('#arr-rad').oninput = e => drawer.panel.querySelector('#arr-rad-v').textContent = e.target.value;

    const runCsg = (op) => generateCSGSculpture(
      drawer.panel.querySelector('#csg-a').value,
      drawer.panel.querySelector('#csg-b').value,
      op,
      +drawer.panel.querySelector('#csg-off').value,
      +drawer.panel.querySelector('#csg-res').value,
      drawer.panel.querySelector('#csg-col').value
    );
    drawer.panel.querySelector('#csg-union').onclick = () => runCsg('union');
    drawer.panel.querySelector('#csg-sub').onclick = () => runCsg('subtract');
    drawer.panel.querySelector('#csg-int').onclick = () => runCsg('intersect');

    drawer.panel.querySelector('#arr-radial').onclick = () => applyRadialArray(+drawer.panel.querySelector('#arr-cnt').value, +drawer.panel.querySelector('#arr-rad').value, 0);
    drawer.panel.querySelector('#arr-grid').onclick = () => applyGridArray(3, 2, 3, 45);
    drawer.panel.querySelectorAll('.mir-btn').forEach(b => {
      b.onclick = () => applyMirror(b.dataset.ax, 60);
    });
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioCSG = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-csg-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    },
    generateCSGSculpture
  };
})();
