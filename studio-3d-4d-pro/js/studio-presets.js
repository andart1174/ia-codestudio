/**
 * Studio 3D/4D Pro v2.0 — Visual Preset Gallery (12 Curated 1-Click Pro Scene Templates)
 */
(function () {
  'use strict';

  let drawer = null;
  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  const TEMPLATES = [
    { id: 'holo-prism', icon: '💎', en: '4D Holo Prism', fr: 'Prisme Holo 4D', tag: 'Starter', grad: 'linear-gradient(135deg,#6366f1,#22d3ee)', run: () => { window.SketchExtruder.clearScene(); window.SketchExtruder.setLightingPreset('studio'); window.SketchExtruder.loadStarterDemoScene(); } },
    { id: 'cyber-city', icon: '🏙️', en: 'Cyberpunk City', fr: 'Cité Cyberpunk', tag: 'AI Scene', grad: 'linear-gradient(135deg,#ec4899,#06b6d4)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Cyberpunk neon city with floating crystal and orbital rings', true) },
    { id: 'tesseract', icon: '🌀', en: '4D Hypercube', fr: 'Hypercube 4D', tag: '4D Math', grad: 'linear-gradient(135deg,#a855f7,#ec4899)', run: () => { window.SketchExtruder.clearScene(); window.SketchExtruder.setLightingPreset('rim'); if (window.Studio4DModifiers) { window.Studio4DModifiers.spawn4DPolytope('tesseract', '#38bdf8'); window.Studio4DModifiers.spawn4DPolytope('cell24', '#f472b6'); } window.SketchExtruder.exportScene({ silent: true }); } },
    { id: 'gold-showcase', icon: '🏆', en: 'Luxury Showcase', fr: 'Vitrine Luxe Or', tag: 'E-Com', grad: 'linear-gradient(135deg,#f59e0b,#fef08a)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Golden luxury marble product showcase with torus knot', true) },
    { id: 'quantum-planet', icon: '🪐', en: 'Quantum Cosmos', fr: 'Cosmos Quantique', tag: 'Space', grad: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Deep space quantum planet with orbital rings and satellites', true) },
    { id: 'bio-dna', icon: '🧬', en: 'Emerald Bio-DNA', fr: 'ADN Émeraude', tag: 'Science', grad: 'linear-gradient(135deg,#10b981,#14b8a6)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Emerald sci-fi laboratory with glowing DNA helix', true) },
    { id: 'sunset-temple', icon: '🏛️', en: 'Golden Temple', fr: 'Temple Doré', tag: 'Arch', grad: 'linear-gradient(135deg,#f97316,#b45309)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Golden sunset temple arch with floating crystal', true) },
    { id: 'lava-fortress', icon: '🌋', en: 'Obsidian Fortress', fr: 'Forteresse Lave', tag: 'Fantasy', grad: 'linear-gradient(135deg,#ef4444,#7f1d1d)', run: () => window.StudioAIDirector && window.StudioAIDirector.directScene('Volcanic molten lava fortress with obsidian pyramid and crimson shield', true) },
    { id: 'csg-carve', icon: '🧩', en: 'CSG Carved Cube', fr: 'Cube Sculpté CSG', tag: '3D Print', grad: 'linear-gradient(135deg,#6366f1,#10b981)', run: () => { window.SketchExtruder.clearScene(); window.SketchExtruder.setLightingPreset('softbox'); if (window.StudioCSG) window.StudioCSG.generateCSGSculpture('box', 'sphere', 'subtract', 8, 22, '#38bdf8'); window.SketchExtruder.exportScene({ silent: true }); } },
    { id: 'clifford-4d', icon: '🍩', en: '4D Clifford Torus', fr: 'Tore Clifford 4D', tag: '4D Math', grad: 'linear-gradient(135deg,#ec4899,#8b5cf6)', run: () => { window.SketchExtruder.clearScene(); window.SketchExtruder.setLightingPreset('cyberpunk'); if (window.Studio4DModifiers) window.Studio4DModifiers.spawn4DPolytope('clifford', '#22d3ee'); window.SketchExtruder.exportScene({ silent: true }); } },
    { id: 'clock-ultra', icon: '🕒', en: 'Clock Ultra 3D', fr: 'Horloge Ultra 3D', tag: 'Ultra', grad: 'linear-gradient(135deg,#d97706,#1e293b)', run: () => window.StudioModuleLoader && window.StudioModuleLoader.openModule('btn-clockultra-scene') },
    { id: 'hero-forge', icon: '🦸', en: 'Hero Forge 3D', fr: 'Hero Forge 3D', tag: 'Ultra', grad: 'linear-gradient(135deg,#dc2626,#7c3aed)', run: () => window.StudioModuleLoader && window.StudioModuleLoader.openModule('btn-heroforge-scene') }
  ];

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🖼️', fr ? 'Galerie de Modèles 3D/4D' : 'Visual Preset Gallery')}
      <p style="font-size:10.5px;color:#94a3b8;margin:0 0 10px;">${fr ? 'Chargez instantanément une scène professionnelle prête à éditer et exporter :' : 'Load a ready-to-edit pro 3D/4D scene in one click:'}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${TEMPLATES.map(t => `
          <button class="tpl-card" data-id="${t.id}" style="padding:0;border:1px solid rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;background:#0f172a;cursor:pointer;text-align:left;transition:transform 0.15s;">
            <div style="height:52px;background:${t.grad};display:flex;align-items:center;justify-content:center;font-size:24px;position:relative;">
              <span>${t.icon}</span>
              <span style="position:absolute;top:5px;right:5px;font-size:8.5px;font-weight:800;background:rgba(0,0,0,0.55);color:#fff;padding:2px 6px;border-radius:999px;">${t.tag}</span>
            </div>
            <div style="padding:7px 8px;font-size:11px;font-weight:700;color:#f1f5f9;">${fr ? t.fr : t.en}</div>
          </button>
        `).join('')}
      </div>
    `;

    drawer.panel.querySelectorAll('.tpl-card').forEach(card => {
      card.onclick = () => {
        const tpl = TEMPLATES.find(x => x.id === card.dataset.id);
        if (tpl) {
          tpl.run();
          drawer.close();
        }
      };
    });
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioPresets = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-presets-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) renderDrawer();
    }
  };
})();
