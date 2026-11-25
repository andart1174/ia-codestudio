/**
 * Studio 3D/4D Pro v2.0 — Interactive 3D Physics Sandbox Mode
 * Real-time Gravity, Floor Bounce, Object-Object Collisions, Shockwave Explosion, Domino Spawn & Clean Transform Restore!
 */
(function () {
  'use strict';

  let drawer = null;
  let running = false;
  const bodies = new Map();
  const cfg = { gravity: -120, bounce: 0.68, floorY: -45, drag: 0.994 };

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  function initBodies() {
    const models = (window.SketchExtruder && window.SketchExtruder.getModels) ? window.SketchExtruder.getModels() : [];
    models.forEach(m => {
      if (!m.meshGroup) return;
      if (!bodies.has(m.id)) {
        const box = new THREE.Box3().setFromObject(m.meshGroup);
        const size = box.getSize(new THREE.Vector3());
        const radius = Math.max(10, Math.min(48, Math.max(size.x, size.y, size.z) * 0.45 || 20));
        bodies.set(m.id, {
          model: m,
          origPos: m.meshGroup.position.clone(),
          origRot: m.meshGroup.rotation.clone(),
          vel: new THREE.Vector3((Math.random() - 0.5) * 18, 0, (Math.random() - 0.5) * 18),
          angVel: new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5),
          radius
        });
      }
    });
  }

  function stepPhysics() {
    if (!running) return;
    const dt = 0.016;
    const list = Array.from(bodies.values()).filter(b => b.model && b.model.meshGroup && b.model.meshGroup.parent);

    // Integrate velocity & floor collision
    for (const b of list) {
      const g = b.model.meshGroup;
      b.vel.y += cfg.gravity * dt;
      b.vel.multiplyScalar(cfg.drag);
      g.position.addScaledVector(b.vel, dt);
      g.rotation.x += b.angVel.x * dt;
      g.rotation.y += b.angVel.y * dt;
      g.rotation.z += b.angVel.z * dt;
      b.angVel.multiplyScalar(0.988);

      const minY = cfg.floorY + b.radius * 0.65;
      if (g.position.y < minY) {
        g.position.y = minY;
        if (Math.abs(b.vel.y) > 8) {
          b.vel.y = -b.vel.y * cfg.bounce;
          b.vel.x *= 0.92; b.vel.z *= 0.92;
        } else {
          b.vel.y = 0; b.vel.x *= 0.85; b.vel.z *= 0.85;
          b.angVel.multiplyScalar(0.8);
        }
      }
      // Keep inside invisible studio arena bounds
      const arena = 220;
      if (Math.abs(g.position.x) > arena) { g.position.x = Math.sign(g.position.x) * arena; b.vel.x *= -0.7; }
      if (Math.abs(g.position.z) > arena) { g.position.z = Math.sign(g.position.z) * arena; b.vel.z *= -0.7; }
    }

    // Sphere-sphere elastic collisions between scene objects
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i], b = list[j];
        const pa = a.model.meshGroup.position, pb = b.model.meshGroup.position;
        const delta = new THREE.Vector3().subVectors(pb, pa);
        const dist = delta.length() || 0.001;
        const minDist = (a.radius + b.radius) * 0.72;
        if (dist < minDist) {
          const n = delta.divideScalar(dist);
          const overlap = (minDist - dist) * 0.5;
          pa.addScaledVector(n, -overlap);
          pb.addScaledVector(n, overlap);
          const relVel = new THREE.Vector3().subVectors(b.vel, a.vel);
          const vn = relVel.dot(n);
          if (vn < 0) {
            const imp = -(1 + cfg.bounce) * vn * 0.5;
            a.vel.addScaledVector(n, -imp);
            b.vel.addScaledVector(n, imp);
          }
        }
      }
    }
  }

  function startPhysics() {
    initBodies();
    running = true;
    if (window.SketchExtruder && window.SketchExtruder.registerAnimHook) {
      window.SketchExtruder.registerAnimHook('studio-physics-sim', stepPhysics);
    }
    if (window.toast) window.toast(isFR() ? '⚛️ Simulation Physique ACTIVE !' : '⚛️ 3D Physics Simulation ACTIVE!');
    renderDrawer();
  }

  function stopPhysics(restore) {
    running = false;
    if (window.SketchExtruder && window.SketchExtruder.unregisterAnimHook) {
      window.SketchExtruder.unregisterAnimHook('studio-physics-sim');
    }
    if (restore) {
      bodies.forEach(b => {
        if (b.model && b.model.meshGroup) {
          b.model.meshGroup.position.copy(b.origPos);
          b.model.meshGroup.rotation.copy(b.origRot);
          b.model.position.copy(b.origPos);
          b.model.rotation.copy(b.origRot);
        }
      });
      bodies.clear();
      if (window.toast) window.toast(isFR() ? '↩️ Positions d’origine restaurées' : '↩️ Original positions restored');
    }
    renderDrawer();
  }

  function triggerShockwave() {
    if (!running) startPhysics();
    bodies.forEach(b => {
      const p = b.model.meshGroup.position;
      const dir = p.length() > 1 ? p.clone().normalize() : new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5).normalize();
      b.vel.addScaledVector(dir, 120);
      b.vel.y += 95;
      b.angVel.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
    });
    if (window.toast) window.toast('💥 Shockwave Impulse!');
  }

  function spawnPhysicsBlocks() {
    if (!window.SketchExtruder) return;
    const cols = [0xef4444, 0xf59e0b, 0x10b981, 0x38bdf8, 0x8b5cf6, 0xec4899];
    for (let i = 0; i < 6; i++) {
      const geo = i % 2 === 0 ? new THREE.BoxGeometry(20, 20, 20) : new THREE.SphereGeometry(12, 24, 20);
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: cols[i], metalness: 0.4, roughness: 0.25 }));
      mesh.castShadow = true;
      window.SketchExtruder.addMeshToScene(mesh, 'Physics Body #' + (i + 1), {
        position: new THREE.Vector3((i - 2.5) * 24, 70 + i * 18, (Math.random() - 0.5) * 30)
      });
    }
    initBodies();
    if (!running) startPhysics();
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('⚛️', fr ? 'Bac à Sable Physique 3D' : '3D Physics Playground')}
      <button id="phy-toggle" class="studio-btn-primary" style="margin-bottom:10px;background:${running ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#10b981,#059669)'};">
        ${running ? (fr ? '⏹ ARRÊTER LA PHYSIQUE' : '⏹ STOP SIMULATION') : (fr ? '⚡ LANCER LA PHYSIQUE' : '⚡ SIMULATE PHYSICS')}
      </button>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">
        <button id="phy-shock" class="studio-btn-sec">💥 ${fr ? 'Onde de Choc' : 'Shockwave'}</button>
        <button id="phy-drop" class="studio-btn-sec">🎲 ${fr ? 'Lâcher Blocs' : 'Drop 6 Bodies'}</button>
        <button id="phy-zerog" class="studio-btn-sec">🪐 Zero-G</button>
        <button id="phy-reset" class="studio-btn-sec" style="color:#fbbf24;">↩️ ${fr ? 'Restaurer' : 'Reset Pos'}</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:10px;color:#94a3b8;">
        <div>${fr ? 'Gravité' : 'Gravity'} <b id="phy-gv">${cfg.gravity}</b><input type="range" id="phy-g" min="-240" max="60" value="${cfg.gravity}" style="width:100%;accent-color:#ef4444;"></div>
        <div>${fr ? 'Rebond' : 'Bounciness'} <b id="phy-bv">${cfg.bounce.toFixed(2)}</b><input type="range" id="phy-b" min="0.1" max="0.98" step="0.02" value="${cfg.bounce}" style="width:100%;accent-color:#f59e0b;"></div>
      </div>
    `;

    drawer.panel.querySelector('#phy-toggle').onclick = () => running ? stopPhysics(false) : startPhysics();
    drawer.panel.querySelector('#phy-shock').onclick = triggerShockwave;
    drawer.panel.querySelector('#phy-drop').onclick = spawnPhysicsBlocks;
    drawer.panel.querySelector('#phy-zerog').onclick = () => {
      cfg.gravity = cfg.gravity === 0 ? -120 : 0;
      renderDrawer();
      if (!running) startPhysics();
    };
    drawer.panel.querySelector('#phy-reset').onclick = () => stopPhysics(true);
    drawer.panel.querySelector('#phy-g').oninput = e => { cfg.gravity = +e.target.value; drawer.panel.querySelector('#phy-gv').textContent = cfg.gravity; };
    drawer.panel.querySelector('#phy-b').oninput = e => { cfg.bounce = +e.target.value; drawer.panel.querySelector('#phy-bv').textContent = cfg.bounce.toFixed(2); };
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioPhysics = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-physics-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    }
  };
})();
