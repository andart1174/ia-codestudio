/**
 * Studio 3D/4D Pro v2.0 — AI Scene Director (Natural-Language Multi-Object Prompt-to-3D Composer EN/FR)
 * Interprets mood, lighting, colors, PBR materials, motion & multiple 3D/4D entities to compose full editable scenes!
 */
(function () {
  'use strict';

  let drawer = null;

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  const SAMPLE_PROMPTS = [
    {
      en: 'Cyberpunk neon city with floating holographic crystal, cyan rim lighting and orbital rings',
      fr: 'Ville cyberpunk néon avec cristal holographique flottant, éclairage cyan et anneaux orbitaux'
    },
    {
      en: 'Golden luxury temple arch on sunset island with spinning crystal spheres and pillars',
      fr: 'Temple antique doré au coucher de soleil avec colonnes et sphères de cristal rotatives'
    },
    {
      en: 'Deep space quantum portal with 4D tesseract, glowing planet and orbiting satellites',
      fr: 'Portail quantique spatial avec tesseract 4D, planète lumineuse et satellites en orbite'
    },
    {
      en: 'Emerald sci-fi laboratory with glowing DNA helix, glass core and floating cubes',
      fr: 'Laboratoire sci-fi émeraude avec hélice ADN lumineuse, noyau de verre et cubes flottants'
    },
    {
      en: 'Volcanic molten lava fortress with obsidian pyramid and crimson energy shield',
      fr: 'Forteresse volcanique de lave en fusion avec pyramide obsidienne et bouclier rouge'
    },
    {
      en: 'Minimalist chrome & white marble product showcase with floating gold torus',
      fr: 'Vitrine produit minimaliste chrome et marbre blanc avec tore doré flottant'
    }
  ];

  function detectPalette(q) {
    if (/gold|or\b|dor[eé]|luxury|luxe|sun|soleil/.test(q)) return { main: 0xf5b942, accent: 0xfde047, metal: 0.94, rough: 0.18, light: 'sunset' };
    if (/cyber|neon|n[eé]on|synth|vapor|matrix/.test(q)) return { main: 0x22d3ee, accent: 0xec4899, metal: 0.7, rough: 0.2, light: 'cyberpunk' };
    if (/lava|lave|fire|feu|volcan|crimson|rouge|red/.test(q)) return { main: 0xef4444, accent: 0xf97316, metal: 0.45, rough: 0.4, light: 'sunset' };
    if (/emerald|[eé]meraude|green|vert|forest|for[eê]t|nature|bio|lab/.test(q)) return { main: 0x10b981, accent: 0x34d399, metal: 0.55, rough: 0.25, light: 'emerald' };
    if (/ice|glace|snow|neige|crystal|cristal|glass|verre|chrome|marble|marbre/.test(q)) return { main: 0x7dd3fc, accent: 0xe2e8f0, metal: 0.85, rough: 0.1, light: 'softbox' };
    if (/noir|dark|shadow|obsidian|obsidienne|night|nuit/.test(q)) return { main: 0x6366f1, accent: 0xa855f7, metal: 0.85, rough: 0.16, light: 'noir' };
    return { main: 0x6366f1, accent: 0x38bdf8, metal: 0.72, rough: 0.22, light: 'rim' };
  }

  function makeMat(hex, pal, opts) {
    const o = opts || {};
    return new THREE.MeshStandardMaterial({
      color: hex,
      emissive: o.emissive !== undefined ? o.emissive : hex,
      emissiveIntensity: o.emissiveIntensity !== undefined ? o.emissiveIntensity : 0.28,
      metalness: o.metalness !== undefined ? o.metalness : pal.metal,
      roughness: o.roughness !== undefined ? o.roughness : pal.rough,
      transparent: !!o.transparent,
      opacity: o.opacity !== undefined ? o.opacity : 1.0,
      wireframe: !!o.wireframe
    });
  }

  function buildCityCluster(pal) {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(130, 4, 130), makeMat(0x0f172a, pal, { emissiveIntensity: 0.05, roughness: 0.6 }));
    base.position.y = -32; g.add(base);
    for (let i = 0; i < 24; i++) {
      const w = 7 + Math.random() * 11, h = 18 + Math.random() * 68, d = 7 + Math.random() * 11;
      const col = i % 3 === 0 ? pal.accent : (i % 2 === 0 ? pal.main : 0x1e293b);
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), makeMat(col, pal, { emissiveIntensity: i % 3 === 0 ? 0.55 : 0.15 }));
      const a = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
      const r = 24 + Math.random() * 34;
      b.position.set(Math.cos(a) * r, -30 + h / 2, Math.sin(a) * r);
      b.castShadow = true; g.add(b);
    }
    return g;
  }

  function buildCrystalCluster(pal) {
    const g = new THREE.Group();
    const mainC = new THREE.Mesh(new THREE.OctahedronGeometry(24, 0), makeMat(pal.main, pal, { emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.1 }));
    mainC.scale.set(0.85, 1.55, 0.85); g.add(mainC);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(9, 0), makeMat(pal.accent, pal, { emissiveIntensity: 0.65 }));
      shard.scale.set(0.7, 1.8, 0.7);
      shard.position.set(Math.cos(a) * 20, -10, Math.sin(a) * 20);
      shard.rotation.z = Math.cos(a) * 0.45; shard.rotation.x = Math.sin(a) * 0.45;
      g.add(shard);
    }
    return g;
  }

  function buildTempleArch(pal) {
    const g = new THREE.Group();
    const stone = makeMat(pal.main, pal, { emissiveIntensity: 0.12 });
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(110, 8, 60), stone); plinth.position.y = -32; g.add(plinth);
    [-36, -12, 12, 36].forEach(x => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 5.2, 58, 16), stone);
      col.position.set(x, 1, 0); g.add(col);
    });
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(102, 10, 22), makeMat(pal.accent, pal, { emissiveIntensity: 0.35 }));
    lintel.position.y = 34; g.add(lintel);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(62, 24, 4), stone);
    roof.rotation.y = Math.PI / 4; roof.scale.set(1.25, 1, 0.45); roof.position.y = 51; g.add(roof);
    return g;
  }

  function buildPlanetSystem(pal) {
    const g = new THREE.Group();
    const planet = new THREE.Mesh(new THREE.SphereGeometry(24, 36, 32), makeMat(pal.main, pal, { emissiveIntensity: 0.35 }));
    g.add(planet);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(42, 3.2, 8, 72), makeMat(pal.accent, pal, { emissiveIntensity: 0.6, transparent: true, opacity: 0.85 }));
    ring.rotation.x = Math.PI / 2.4; ring.scale.set(1, 1, 0.18); g.add(ring);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const moon = new THREE.Mesh(new THREE.SphereGeometry(3.8, 16, 16), makeMat(0xffffff, pal, { emissiveIntensity: 0.6 }));
      moon.position.set(Math.cos(a) * 56, Math.sin(a * 2) * 14, Math.sin(a) * 56);
      g.add(moon);
    }
    return g;
  }

  function buildDNAHelix(pal) {
    const g = new THREE.Group();
    const m1 = makeMat(pal.main, pal, { emissiveIntensity: 0.65 });
    const m2 = makeMat(pal.accent, pal, { emissiveIntensity: 0.65 });
    const rungMat = makeMat(0xe2e8f0, pal, { emissiveIntensity: 0.3 });
    for (let i = 0; i < 22; i++) {
      const t = i * 0.48, y = (i - 10.5) * 4.2, r = 16;
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(2.6, 14, 14), m1);
      s1.position.set(Math.cos(t) * r, y, Math.sin(t) * r); g.add(s1);
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(2.6, 14, 14), m2);
      s2.position.set(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r); g.add(s2);
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, r * 2, 8), rungMat);
      rung.position.y = y; rung.rotation.z = Math.PI / 2; rung.rotation.y = -t; g.add(rung);
    }
    return g;
  }

  function buildPyramidFortress(pal) {
    const g = new THREE.Group();
    const pyr = new THREE.Mesh(new THREE.ConeGeometry(42, 62, 4), makeMat(pal.main, pal, { emissiveIntensity: 0.3 }));
    pyr.rotation.y = Math.PI / 4; g.add(pyr);
    const shield = new THREE.Mesh(new THREE.IcosahedronGeometry(52, 1), makeMat(pal.accent, pal, { wireframe: true, emissiveIntensity: 0.85, transparent: true, opacity: 0.5 }));
    g.add(shield);
    return g;
  }

  function buildShowcasePedestal(pal) {
    const g = new THREE.Group();
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(36, 42, 14, 48), makeMat(0xf1f5f9, pal, { emissiveIntensity: 0.05, metalness: 0.2, roughness: 0.15 }));
    ped.position.y = -28; g.add(ped);
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(18, 5.2, 110, 18), makeMat(pal.main, pal, { emissiveIntensity: 0.35, metalness: 0.96, roughness: 0.1 }));
    knot.position.y = 10; g.add(knot);
    return g;
  }

  function buildOrbitalRings(pal) {
    const g = new THREE.Group();
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(58, 1.4, 12, 80), makeMat(pal.accent, pal, { emissiveIntensity: 0.8 }));
    r1.rotation.x = Math.PI / 3; g.add(r1);
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(68, 1.1, 12, 80), makeMat(pal.main, pal, { emissiveIntensity: 0.7 }));
    r2.rotation.y = Math.PI / 4; r2.rotation.x = -Math.PI / 3; g.add(r2);
    return g;
  }

  function directScene(promptText, replaceScene) {
    if (!window.SketchExtruder) return;
    const raw = (promptText || '').trim();
    if (!raw) return;
    const q = raw.toLowerCase();
    const pal = detectPalette(q);

    if (replaceScene && window.SketchExtruder.clearScene) {
      window.SketchExtruder.clearScene();
    }
    if (window.SketchExtruder.setLightingPreset) {
      window.SketchExtruder.setLightingPreset(pal.light);
    }

    const doSpin = /spin|rotat|tourn|orbit|dynam/.test(q) || true;
    const doFloat = /float|flott|levit|l[eé]vit|hover/.test(q);
    let spawned = 0;

    if (/city|ville|cyber|tower|tour|metropol/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildCityCluster(pal), 'AI Cyber City', { spin: false });
      spawned++;
    }
    if (/temple|arch|arche|pillar|colonn|ruin/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildTempleArch(pal), 'AI Temple Arch', { spin: false });
      spawned++;
    }
    if (/planet|plan[eè]t|space|espace|galax|cosmos|portal|portail|satellit/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildPlanetSystem(pal), 'AI Quantum Planet', { spin: true, levitate: doFloat });
      spawned++;
    }
    if (/dna|adn|helix|h[eé]lice|lab|bio|molec/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildDNAHelix(pal), 'AI Bio-DNA Helix', { spin: true, levitate: doFloat });
      spawned++;
    }
    if (/pyramid|pyramide|fortress|forteresse|volcan|lava|lave|shield|bouclier/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildPyramidFortress(pal), 'AI Obsidian Fortress', { spin: doSpin });
      spawned++;
    }
    if (/showcase|vitrine|product|produit|torus|tore|knot|minimal|marble|marbre/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildShowcasePedestal(pal), 'AI Luxury Showcase', { spin: true, levitate: false });
      spawned++;
    }
    if (/crystal|cristal|diamond|diamant|gem|core|noyau/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildCrystalCluster(pal), 'AI Holo Crystal', {
        spin: true, levitate: true, position: new THREE.Vector3(0, spawned > 0 ? 18 : 0, 0)
      });
      spawned++;
    }
    if (/tesseract|4d|hypercube|hyper/.test(q) && window.Studio4DModifiers) {
      window.Studio4DModifiers.spawn4DPolytope('tesseract', '#' + pal.accent.toString(16).padStart(6, '0'));
      spawned++;
    }
    if (/ring|anneau|halo|orbit/.test(q)) {
      window.SketchExtruder.addMeshToScene(buildOrbitalRings(pal), 'AI Orbital Halo', { spin: true });
      spawned++;
    }

    // Fallback centerpiece if prompt was abstract
    if (spawned === 0) {
      window.SketchExtruder.addMeshToScene(buildCrystalCluster(pal), 'AI Sculpted Core', { spin: true, levitate: true });
      window.SketchExtruder.addMeshToScene(buildOrbitalRings(pal), 'AI Energy Halo', { spin: true });
      spawned = 2;
    }

    // Silently sync Live Preview immediately!
    try { window.SketchExtruder.exportScene({ silent: true }); } catch (e) {}

    if (window.toast) {
      window.toast(isFR()
        ? `🤖 Directeur IA : ${spawned} objets composés (${pal.light.toUpperCase()}) !`
        : `🤖 AI Director composed ${spawned} objects (${pal.light.toUpperCase()})!`);
    }
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🤖', fr ? 'Directeur de Scène IA' : 'AI Scene Director')}
      <p style="font-size:11px;color:#94a3b8;margin:0 0 10px;line-height:1.45;">
        ${fr
          ? 'Décrivez votre scène 3D/4D en langage naturel (ambiance, objets, matériaux, mouvements) — le moteur la compose automatiquement en objets éditables !'
          : 'Describe your 3D/4D scene in plain English or French (mood, objects, materials, motion) — the engine composes editable 3D objects automatically!'}
      </p>
      <textarea id="aid-prompt" rows="3" placeholder="${fr ? 'Ex: Ville cyberpunk néon avec cristal doré flottant et tesseract 4D...' : 'Ex: Cyberpunk neon city with floating gold crystal and 4D tesseract...'}" style="width:100%;box-sizing:border-box;background:#0f172a;border:1px solid rgba(168,85,247,0.45);border-radius:9px;padding:9px;color:#f8fafc;font-size:11.5px;resize:vertical;outline:none;margin-bottom:8px;"></textarea>
      <label style="display:flex;align-items:center;gap:7px;font-size:11px;color:#cbd5e1;margin-bottom:10px;cursor:pointer;">
        <input type="checkbox" id="aid-replace" checked style="accent-color:#a855f7;"> ${fr ? 'Remplacer la scène actuelle' : 'Replace current scene'}
      </label>
      <button id="aid-run" class="studio-btn-primary" style="background:linear-gradient(135deg,#a855f7,#6366f1);margin-bottom:12px;">✨ ${fr ? 'COMPOSER LA SCÈNE 3D/4D' : 'DIRECT & COMPOSE SCENE'}</button>
      <div style="font-size:10px;font-weight:800;color:#c084fc;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">💡 ${fr ? 'Prompts d’inspiration (1 clic)' : '1-Click Inspiration Prompts'}</div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${SAMPLE_PROMPTS.map((p, idx) => `
          <button class="aid-sample" data-i="${idx}" style="text-align:left;padding:7px 9px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.22);border-radius:8px;color:#e2e8f0;font-size:10.5px;line-height:1.35;cursor:pointer;">🪄 ${fr ? p.fr : p.en}</button>
        `).join('')}
      </div>
    `;

    const promptInp = drawer.panel.querySelector('#aid-prompt');
    drawer.panel.querySelector('#aid-run').onclick = () => {
      directScene(promptInp.value, drawer.panel.querySelector('#aid-replace').checked);
    };
    drawer.panel.querySelectorAll('.aid-sample').forEach(b => {
      b.onclick = () => {
        const p = SAMPLE_PROMPTS[+b.dataset.i];
        promptInp.value = fr ? p.fr : p.en;
        directScene(promptInp.value, drawer.panel.querySelector('#aid-replace').checked);
      };
    });
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioAIDirector = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-ai-director-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    },
    directScene
  };
})();
