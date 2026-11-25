/**
 * Studio 3D/4D Pro v2.0 — Procedural PBR Material & HDRI Lighting Studio (24 Materials + 8 Studio Lighting Presets)
 * Generates crisp procedural Canvas PBR textures (albedo + bump + roughness) 100% client-side with zero external assets!
 */
(function () {
  'use strict';

  let drawer = null;
  let currentLighting = 'studio';
  let currentExposure = 1.12;

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  const PBR_MATERIALS = [
    { id: 'gold', name: 'Brushed Gold', fr: 'Or Brossé', swatch: 'linear-gradient(135deg,#f59e0b,#fef08a,#b45309)', cfg: { color: 0xf5b942, metalness: 0.96, roughness: 0.22, tex: 'brushed' } },
    { id: 'chrome', name: 'Liquid Chrome', fr: 'Chrome Liquide', swatch: 'linear-gradient(135deg,#e2e8f0,#ffffff,#64748b)', cfg: { color: 0xf1f5f9, metalness: 1.0, roughness: 0.06 } },
    { id: 'titanium', name: 'Titanium', fr: 'Titane', swatch: 'linear-gradient(135deg,#64748b,#cbd5e1,#334155)', cfg: { color: 0x94a3b8, metalness: 0.88, roughness: 0.3, tex: 'brushed' } },
    { id: 'copper', name: 'Aged Copper', fr: 'Cuivre Vieilli', swatch: 'linear-gradient(135deg,#c2410c,#fb923c,#7c2d12)', cfg: { color: 0xd97746, metalness: 0.9, roughness: 0.34, tex: 'noise' } },
    { id: 'rosegold', name: 'Rose Gold', fr: 'Or Rose', swatch: 'linear-gradient(135deg,#fda4af,#fb7185,#be123c)', cfg: { color: 0xf4a3b4, metalness: 0.92, roughness: 0.18 } },
    { id: 'cobalt', name: 'Anodized Blue', fr: 'Bleu Anodisé', swatch: 'linear-gradient(135deg,#1d4ed8,#38bdf8,#1e3a8a)', cfg: { color: 0x2563eb, metalness: 0.85, roughness: 0.22 } },
    { id: 'carbon', name: 'Carbon Fiber', fr: 'Fibre Carbone', swatch: 'repeating-linear-gradient(45deg,#111827 0 4px,#1f2937 4px 8px)', cfg: { color: 0x1e293b, metalness: 0.55, roughness: 0.32, tex: 'carbon' } },
    { id: 'marble', name: 'Carrara Marble', fr: 'Marbre Blanc', swatch: 'linear-gradient(135deg,#f8fafc,#cbd5e1,#f1f5f9)', cfg: { color: 0xf8fafc, metalness: 0.08, roughness: 0.18, tex: 'marble' } },
    { id: 'wood', name: 'Walnut Wood', fr: 'Bois Noyer', swatch: 'linear-gradient(135deg,#78350f,#b45309,#451a03)', cfg: { color: 0x92400e, metalness: 0.05, roughness: 0.65, tex: 'wood' } },
    { id: 'glass', name: 'Crystal Glass', fr: 'Verre Cristal', swatch: 'linear-gradient(135deg,rgba(186,230,253,0.9),rgba(255,255,255,0.4))', cfg: { color: 0xbae6fd, metalness: 0.1, roughness: 0.04, transparent: true, opacity: 0.42 } },
    { id: 'holo', name: 'Hologram Cyan', fr: 'Hologramme', swatch: 'linear-gradient(135deg,#06b6d4,#8b5cf6,#ec4899)', cfg: { color: 0x22d3ee, emissive: 0x06b6d4, emissiveIntensity: 0.75, metalness: 0.4, roughness: 0.15, transparent: true, opacity: 0.75, tex: 'grid' } },
    { id: 'plasma', name: 'Neon Plasma', fr: 'Plasma Néon', swatch: 'linear-gradient(135deg,#a855f7,#ec4899,#6366f1)', cfg: { color: 0xc084fc, emissive: 0x9333ea, emissiveIntensity: 1.0, metalness: 0.25, roughness: 0.2 } },
    { id: 'lava', name: 'Molten Lava', fr: 'Lave En Fusion', swatch: 'linear-gradient(135deg,#ef4444,#f97316,#1c1917)', cfg: { color: 0x292524, emissive: 0xf97316, emissiveIntensity: 0.9, metalness: 0.2, roughness: 0.75, tex: 'lava' } },
    { id: 'ice', name: 'Frosted Ice', fr: 'Glace Givrée', swatch: 'linear-gradient(135deg,#e0f2fe,#7dd3fc,#0284c7)', cfg: { color: 0x7dd3fc, emissive: 0x0369a1, emissiveIntensity: 0.25, metalness: 0.15, roughness: 0.22, transparent: true, opacity: 0.72, tex: 'noise' } },
    { id: 'obsidian', name: 'Obsidian', fr: 'Obsidienne', swatch: 'linear-gradient(135deg,#09090b,#312e81,#020617)', cfg: { color: 0x0f172a, metalness: 0.9, roughness: 0.08 } },
    { id: 'jade', name: 'Emerald Jade', fr: 'Jade Émeraude', swatch: 'linear-gradient(135deg,#10b981,#047857,#34d399)', cfg: { color: 0x10b981, emissive: 0x064e3b, emissiveIntensity: 0.25, metalness: 0.2, roughness: 0.14 } },
    { id: 'ruby', name: 'Velvet Ruby', fr: 'Rubis Velours', swatch: 'linear-gradient(135deg,#e11d48,#881337,#fb7185)', cfg: { color: 0xe11d48, emissive: 0x881337, emissiveIntensity: 0.25, metalness: 0.35, roughness: 0.16 } },
    { id: 'ceramic', name: 'Matte Ceramic', fr: 'Céramique Mate', swatch: 'linear-gradient(135deg,#f1f5f9,#e2e8f0,#cbd5e1)', cfg: { color: 0xe2e8f0, metalness: 0.02, roughness: 0.85 } },
    { id: 'hex', name: 'Sci-Fi Hex', fr: 'Armure Hexa', swatch: 'linear-gradient(135deg,#0ea5e9,#1e293b,#38bdf8)', cfg: { color: 0x334155, emissive: 0x0ea5e9, emissiveIntensity: 0.35, metalness: 0.8, roughness: 0.28, tex: 'grid' } },
    { id: 'circuit', name: 'Cyber Circuit', fr: 'Circuit Cyber', swatch: 'linear-gradient(135deg,#059669,#064e3b,#34d399)', cfg: { color: 0x064e3b, emissive: 0x10b981, emissiveIntensity: 0.55, metalness: 0.65, roughness: 0.3, tex: 'circuit' } },
    { id: 'concrete', name: 'Concrete', fr: 'Béton Brut', swatch: 'linear-gradient(135deg,#64748b,#94a3b8,#475569)', cfg: { color: 0x94a3b8, metalness: 0.05, roughness: 0.92, tex: 'noise' } },
    { id: 'neonpink', name: 'Synthwave Pink', fr: 'Rose Synthwave', swatch: 'linear-gradient(135deg,#ec4899,#f43f5e,#f472b6)', cfg: { color: 0xec4899, emissive: 0xdb2777, emissiveIntensity: 0.85, metalness: 0.4, roughness: 0.2 } },
    { id: 'solar', name: 'Solar Foil', fr: 'Feuille Solaire', swatch: 'linear-gradient(135deg,#fbbf24,#f59e0b,#d97706)', cfg: { color: 0xfbbf24, metalness: 0.98, roughness: 0.16, tex: 'noise' } },
    { id: 'wire', name: 'Blueprint Wire', fr: 'Filaire Plan', swatch: 'linear-gradient(135deg,#0284c7,#0f172a)', cfg: { color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6, wireframe: true } }
  ];

  const LIGHT_PRESETS = [
    { id: 'studio', icon: '💡', en: 'Studio Pro', fr: 'Studio Pro' },
    { id: 'cyberpunk', icon: '🌆', en: 'Cyberpunk Neon', fr: 'Néon Cyber' },
    { id: 'sunset', icon: '🌅', en: 'Golden Hour', fr: 'Coucher Soleil' },
    { id: 'softbox', icon: '📷', en: 'Photo Softbox', fr: 'Softbox Photo' },
    { id: 'rim', icon: '✨', en: 'Sci-Fi Rim', fr: 'Contour Sci-Fi' },
    { id: 'emerald', icon: '🧪', en: 'Emerald Lab', fr: 'Labo Émeraude' },
    { id: 'noir', icon: '🎬', en: 'Film Noir', fr: 'Film Noir' },
    { id: 'daylight', icon: '☀️', en: 'Daylight Sky', fr: 'Plein Jour' }
  ];

  function createProceduralTexture(kind) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    if (kind === 'carbon') {
      ctx.fillStyle = '#181e2a'; ctx.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 16) {
        for (let x = 0; x < 256; x += 16) {
          ctx.fillStyle = ((x + y) / 16) % 2 === 0 ? '#2d3748' : '#0f172a';
          ctx.fillRect(x, y, 14, 7);
          ctx.fillStyle = ((x + y) / 16) % 2 === 0 ? '#111827' : '#334155';
          ctx.fillRect(x, y + 8, 14, 7);
        }
      }
    } else if (kind === 'marble') {
      ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = 'rgba(100,116,139,0.28)'; ctx.lineWidth = 2;
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        let x = Math.random() * 256, y = 0;
        ctx.moveTo(x, y);
        for (let step = 0; step < 16; step++) {
          x += (Math.random() - 0.5) * 32; y += 16;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else if (kind === 'wood') {
      ctx.fillStyle = '#7c3f1d'; ctx.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 3) {
        ctx.fillStyle = y % 6 === 0 ? 'rgba(45,18,6,0.35)' : 'rgba(180,100,45,0.2)';
        ctx.fillRect(0, y, 256, 2);
      }
    } else if (kind === 'brushed') {
      ctx.fillStyle = '#d4d4d8'; ctx.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y++) {
        const v = 190 + Math.floor(Math.random() * 55);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.fillRect(0, y, 256, 1);
      }
    } else if (kind === 'grid') {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
      for (let i = 0; i <= 256; i += 32) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
      }
    } else if (kind === 'circuit') {
      ctx.fillStyle = '#052e2b'; ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3;
      for (let i = 0; i < 24; i++) {
        const x = Math.floor(Math.random() * 16) * 16;
        const y = Math.floor(Math.random() * 16) * 16;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 32, y); ctx.lineTo(x + 32, y + 32); ctx.stroke();
        ctx.fillStyle = '#6ee7b7'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
      }
    } else if (kind === 'lava') {
      ctx.fillStyle = '#1c1917'; ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#f97316'; ctx.lineWidth = 6;
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 256, Math.random() * 256);
        ctx.lineTo(Math.random() * 256, Math.random() * 256);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1800; i++) {
        const g = 140 + Math.floor(Math.random() * 90);
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }

  function applyPBRMaterial(matDef) {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) {
      if (window.toast) window.toast(isFR() ? '⚠️ Sélectionnez un objet 3D d’abord' : '⚠️ Select a 3D object first');
      return;
    }
    if (window.pushUndo) window.pushUndo();
    const cfg = Object.assign({}, matDef.cfg);
    const tex = cfg.tex ? createProceduralTexture(cfg.tex) : null;
    delete cfg.tex;
    if (tex) {
      cfg.map = tex;
      cfg.bumpMap = tex;
      cfg.bumpScale = 0.6;
    }
    const newMat = new THREE.MeshStandardMaterial(cfg);
    act.meshGroup.traverse(child => {
      if (child.isMesh) {
        if (child.material && child.material.dispose) { try { child.material.dispose(); } catch (e) {} }
        child.material = newMat;
      }
    });
    if (typeof cfg.metalness === 'number') act.metalness = cfg.metalness;
    if (typeof cfg.roughness === 'number') act.roughness = cfg.roughness;
    if (typeof cfg.color === 'number') act.colorHex = '#' + cfg.color.toString(16).padStart(6, '0');
    if (window.toast) window.toast(`🎨 ${isFR() ? matDef.fr : matDef.name} ${isFR() ? 'appliqué !' : 'applied!'}`);
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🎨', fr ? 'Studio Matériaux PBR & HDRI' : 'PBR Material & HDRI Studio')}
      <div style="font-size:10px;font-weight:800;color:#fbbf24;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">✨ ${fr ? '24 Matériaux PBR Procéduraux' : '24 Procedural PBR Materials'}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px;">
        ${PBR_MATERIALS.map(m => `
          <button class="pbr-swatch-btn" data-id="${m.id}" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 4px;background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:9px;cursor:pointer;color:#e2e8f0;transition:0.15s;">
            <span style="width:28px;height:28px;border-radius:50%;background:${m.swatch};box-shadow:inset 0 2px 6px rgba(255,255,255,0.35),0 2px 8px rgba(0,0,0,0.6);display:block;"></span>
            <span style="font-size:9px;font-weight:700;text-align:center;line-height:1.2;">${fr ? m.fr : m.name}</span>
          </button>
        `).join('')}
      </div>
      <div style="font-size:10px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;">🌅 ${fr ? 'Éclairage Studio HDRI (8 Presets)' : 'HDRI Studio Lighting (8 Presets)'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:12px;">
        ${LIGHT_PRESETS.map(l => `
          <button class="pbr-light-btn" data-id="${l.id}" style="padding:7px 8px;border-radius:8px;border:1px solid ${currentLighting === l.id ? '#38bdf8' : '#334155'};background:${currentLighting === l.id ? 'rgba(56,189,248,0.2)' : '#1e293b'};color:#f1f5f9;font-size:10.5px;font-weight:700;cursor:pointer;text-align:left;">${l.icon} ${fr ? l.fr : l.en}</button>
        `).join('')}
      </div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:8px;padding:9px;">
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:4px;">
          <span>${fr ? 'Exposition ACES Filmic' : 'ACES Filmic Exposure'}</span>
          <b id="pbr-exp-val" style="color:#fbbf24;">${currentExposure.toFixed(2)}</b>
        </div>
        <input type="range" id="pbr-exp-rng" min="0.4" max="2.2" step="0.05" value="${currentExposure}" style="width:100%;accent-color:#f59e0b;">
      </div>
    `;

    drawer.panel.querySelectorAll('.pbr-swatch-btn').forEach(b => {
      b.onclick = () => {
        const def = PBR_MATERIALS.find(x => x.id === b.dataset.id);
        if (def) applyPBRMaterial(def);
      };
    });
    drawer.panel.querySelectorAll('.pbr-light-btn').forEach(b => {
      b.onclick = () => {
        currentLighting = b.dataset.id;
        if (window.SketchExtruder && window.SketchExtruder.setLightingPreset) {
          window.SketchExtruder.setLightingPreset(currentLighting);
        }
        renderDrawer();
      };
    });
    drawer.panel.querySelector('#pbr-exp-rng').oninput = (e) => {
      currentExposure = parseFloat(e.target.value);
      drawer.panel.querySelector('#pbr-exp-val').textContent = currentExposure.toFixed(2);
      if (window.SketchExtruder && window.SketchExtruder.setToneExposure) {
        window.SketchExtruder.setToneExposure(currentExposure);
      }
    };
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioPBRLab = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-pbr-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    },
    applyPresetMaterial: (id) => {
      const def = PBR_MATERIALS.find(x => x.id === id);
      if (def) applyPBRMaterial(def);
    }
  };
})();
