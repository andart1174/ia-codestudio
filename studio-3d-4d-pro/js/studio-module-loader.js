/**
 * Studio 3D/4D Pro v2.0 — Dynamic On-Demand Module Loader, Unified Panel Close Wrapper & Undo/Redo History
 * Cuts initial blocking JS payload from 2.17 MB (77 scripts) down to core-only lazy loading!
 */
(function () {
  'use strict';

  const MODULE_CATALOG = [
    // Extra 3D Modules
    { btn: 'btn-math-scene', global: 'MathSurface3D', file: 'js/math-surface-3d.js', cat: 'science', icon: '📐', en: 'Math Surface', fr: 'Surface Math' },
    { btn: 'btn-chart-scene', global: 'DataChart3D', file: 'js/data-chart-3d.js', cat: 'science', icon: '📊', en: 'Data Chart 3D', fr: 'Graphique 3D' },
    { btn: 'btn-webcam-scene', global: 'WebcamAvatar3D', file: 'js/webcam-avatar-3d.js', cat: 'media', icon: '👤', en: 'Webcam Avatar', fr: 'Avatar Webcam' },
    { btn: 'btn-shader-scene', global: 'ShaderEditor3D', file: 'js/shader-editor-3d.js', cat: 'creative', icon: '🎨', en: 'GLSL Shader Lab', fr: 'Éditeur Shader' },
    { btn: 'btn-star-scene', global: 'Starmap3D', file: 'js/starmap-3d.js', cat: 'science', icon: '🌌', en: 'Starmap 3D', fr: 'Carte Stellaire' },
    { btn: 'btn-kf-scene', global: 'KeyframeAnimator3D', file: 'js/keyframe-animator-3d.js', cat: 'creative', icon: '🎬', en: 'Keyframe Anim', fr: 'Anim Keyframe' },
    { btn: 'btn-voice-scene', global: 'VoiceSculpture3D', file: 'js/voice-sculpture-3d.js', cat: 'media', icon: '🎙️', en: 'Voice Sculpture', fr: 'Sculpture Vocale' },
    { btn: 'btn-qr-labyrinth-scene', global: 'QRLabyrinth3D', file: 'js/qr-labyrinth-3d.js', cat: 'creative', icon: '🧩', en: 'QR Labyrinth', fr: 'Labyrinthe QR' },
    { btn: 'btn-terrain-scene', global: 'LocationTerrain3D', file: 'js/location-terrain-3d.js', cat: 'science', icon: '⛰️', en: 'Terrain Map', fr: 'Relief Terrain' },
    { btn: 'btn-gallery-scene', global: 'DocGallery3D', file: 'js/doc-gallery-3d.js', cat: 'creative', icon: '🖼️', en: 'Doc Gallery', fr: 'Galerie Docs' },
    { btn: 'btn-pdf-scene', global: 'PdfGallery3D', file: 'js/pdf-gallery-3d.js', cat: 'creative', icon: '📄', en: 'PDF 3D Booklet', fr: 'Livre PDF 3D', deps: ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js'] },
    { btn: 'btn-tree-scene', global: 'LogicTree3D', file: 'js/logic-tree-3d.js', cat: 'science', icon: '🌳', en: 'Logic Tree', fr: 'Arbre Logique' },
    { btn: 'btn-neon-scene', global: 'NeonHandwriting3D', file: 'js/neon-handwriting-3d.js', cat: 'creative', icon: '✍️', en: 'Neon Writing', fr: 'Écriture Néon' },

    // Advanced Modules
    { btn: 'btn-csv-scene', global: 'CsvChart3D', file: 'js/csv-chart-3d.js', cat: 'science', icon: '📊', en: 'CSV 3D Chart', fr: 'Graphique CSV' },
    { btn: 'btn-webnet-scene', global: 'WebNetwork3D', file: 'js/web-network-3d.js', cat: 'science', icon: '🌐', en: 'Web Network', fr: 'Réseau Web' },
    { btn: 'btn-pixel-scene', global: 'PixelArtVoxel3D', file: 'js/pixelart-voxel-3d.js', cat: 'creative', icon: '🎮', en: 'Pixel Voxel', fr: 'Voxel PixelArt' },
    { btn: 'btn-jsonlive-scene', global: 'JsonDashboard3D', file: 'js/json-dashboard-3d.js', cat: 'science', icon: '🌡️', en: 'JSON Dashboard', fr: 'Tableau JSON' },
    { btn: 'btn-dna-scene', global: 'DnaHelix3D', file: 'js/dna-helix-3d.js', cat: 'science', icon: '🧬', en: 'DNA Helix', fr: 'Hélice ADN' },
    { btn: 'btn-geo-scene', global: 'GeoGlobe3D', file: 'js/geo-globe-3d.js', cat: 'science', icon: '🗺️', en: 'Geo Globe', fr: 'Globe Géo' },
    { btn: 'btn-palette-scene', global: 'PaletteWorld3D', file: 'js/palette-world-3d.js', cat: 'creative', icon: '🎨', en: 'Palette World', fr: 'Monde Palette' },
    { btn: 'btn-sentiment-scene', global: 'SentimentLandscape3D', file: 'js/sentiment-landscape-3d.js', cat: 'science', icon: '🧠', en: 'Emotion Terrain', fr: 'Relief Émotion' },
    { btn: 'btn-fractal-scene', global: 'FractalGenerator3D', file: 'js/fractal-generator-3d.js', cat: 'science', icon: '🌀', en: '3D Fractals', fr: 'Fractales 3D' },
    { btn: 'btn-midi-scene', global: 'MidiArch3D', file: 'js/midi-arch-3d.js', cat: 'media', icon: '🎼', en: 'MIDI Arch', fr: 'Architecture MIDI' },
    { btn: 'btn-neural-scene', global: 'NeuralNet3D', file: 'js/neural-net-3d.js', cat: 'science', icon: '🕸️', en: 'Neural Brain', fr: 'Cerveau Neural' },
    { btn: 'btn-timeline-scene', global: 'TimelineRiver3D', file: 'js/timeline-river-3d.js', cat: 'creative', icon: '⏳', en: 'Timeline River', fr: 'Frise Temporelle' },
    { btn: 'btn-chess-scene', global: 'ChessBoard3D', file: 'js/chess-board-3d.js', cat: 'creative', icon: '♟', en: '3D Chess / Sudoku', fr: 'Échecs / Sudoku' },
    { btn: 'btn-bio-scene', global: 'BiometricAvatar3D', file: 'js/biometric-avatar-3d.js', cat: 'science', icon: '🌡️', en: 'Biometric Avatar', fr: 'Avatar Biométrique' },
    { btn: 'btn-mood-scene', global: 'MoodboardWorld3D', file: 'js/moodboard-world-3d.js', cat: 'creative', icon: '🎭', en: 'Moodboard World', fr: 'Monde Humeurs' },
    { btn: 'btn-molecule-scene', global: 'Molecule3D', file: 'js/molecule-3d.js', cat: 'science', icon: '🧬', en: '3D Molecules', fr: 'Molécules 3D' },
    { btn: 'btn-wslive-scene', global: 'WebSocketLive3D', file: 'js/websocket-live-3d.js', cat: 'science', icon: '📡', en: 'WebSocket Live', fr: 'Flux WebSocket' },
    { btn: 'btn-story-scene', global: 'Story3D', file: 'js/story-3d.js', cat: 'creative', icon: '🗣️', en: '3D Story Book', fr: 'Livre Histoire 3D' },
    { btn: 'btn-crystal-scene', global: 'CrystalGen3D', file: 'js/crystal-gen-3d.js', cat: 'creative', icon: '🔮', en: 'Crystal Gen', fr: 'Générateur Cristal' },
    { btn: 'btn-botany-scene', global: 'BotanyLSystem3D', file: 'js/botany-lsystem-3d.js', cat: 'science', icon: '🌿', en: 'Botany L-System', fr: 'Flore L-System' },
    { btn: 'btn-automata-scene', global: 'CellularAutomata3D', file: 'js/cellular-automata-3d.js', cat: 'science', icon: '🧬', en: 'Cellular Automata', fr: 'Automates Cellulaires' },
    { btn: 'btn-kintypo-scene', global: 'KineticTypography3D', file: 'js/kinetic-typography-3d.js', cat: 'creative', icon: '🔠', en: 'Kinetic Typo', fr: 'Typo Cinétique' },
    { btn: 'btn-galaxy-scene', global: 'GalaxyBuilder3D', file: 'js/galaxy-builder-3d.js', cat: 'creative', icon: '🌌', en: 'Galaxy Builder', fr: 'Créateur Galaxie' },
    { btn: 'btn-spaceship-scene', global: 'SciFiSpaceship3D', file: 'js/sci-fi-spaceship-3d.js', cat: 'creative', icon: '🚀', en: 'Sci-Fi Spaceship', fr: 'Vaisseau Sci-Fi' },
    { btn: 'btn-dungeon-scene', global: 'RpgDungeon3D', file: 'js/rpg-dungeon-3d.js', cat: 'creative', icon: '🏰', en: 'RPG Dungeon', fr: 'Donjon RPG' },
    { btn: 'btn-weather-scene', global: 'WeatherEvent3D', file: 'js/weather-event-3d.js', cat: 'science', icon: '🌪️', en: 'Weather FX', fr: 'Météo 3D' },
    { btn: 'btn-impossible-scene', global: 'ImpossibleGeometry3D', file: 'js/impossible-geometry-3d.js', cat: 'creative', icon: '👁️', en: 'Impossible Geo', fr: 'Géométrie Impossible' },
    { btn: 'btn-papercraft-scene', global: 'PapercraftWorld3D', file: 'js/papercraft-world-3d.js', cat: 'creative', icon: '📄', en: 'Papercraft World', fr: 'Monde Origami' },
    { btn: 'btn-shield-scene', global: 'ForceShield3D', file: 'js/force-shield-3d.js', cat: 'creative', icon: '🛡️', en: 'Force Shield', fr: 'Bouclier Énergie' },

    // Mega Modules Pro (Premium Studios)
    { btn: 'btn-cybercity-scene', global: 'CyberCity3D', file: 'js/cyber-city-3d.js', cat: 'studios', icon: '🏙️', en: 'Cyber City', fr: 'Cyber Cité' },
    { btn: 'btn-fluid-scene', global: 'QuantumFluids3D', file: 'js/quantum-fluids-3d.js', cat: 'studios', icon: '🌊', en: 'Quantum Fluids', fr: 'Fluides Quantiques' },
    { btn: 'btn-timelapse-scene', global: 'TimeLapse4D', file: 'js/time-lapse-4d.js', cat: 'studios', icon: '⏳', en: 'Time Lapse 4D', fr: 'Time Lapse 4D' },
    { btn: 'btn-product-scene', global: 'ProductShowcase3D', file: 'js/product-showcase-3d.js', cat: 'studios', icon: '🛒', en: 'Product Showcase', fr: 'Vitrine Produit' },
    { btn: 'btn-social-scene', global: 'SocialMediaRoom3D', file: 'js/social-media-room-3d.js', cat: 'studios', icon: '💬', en: 'Social Room', fr: 'Salon Social' },
    { btn: 'btn-gitrepo-scene', global: 'GitRepoCity3D', file: 'js/git-repo-city-3d.js', cat: 'studios', icon: '📂', en: 'Git Repo City', fr: 'Cité Git 3D' },
    { btn: 'btn-webar-scene', global: 'WebARPortal3D', file: 'js/web-ar-portal-3d.js', cat: 'studios', icon: '👁️', en: 'WebAR Portal', fr: 'Portail WebAR' },
    { btn: 'btn-text2scene-scene', global: 'TextToScene3D', file: 'js/text-to-scene-3d.js', cat: 'studios', icon: '🪄', en: 'Text → Scene', fr: 'Texte → Scène' },

    // Ultra Modules
    { btn: 'btn-iceterrain-scene', global: 'IceTerrain3D', file: 'js/ice-terrain-3d.js', cat: 'ultra', icon: '🧊', en: 'Ice Terrain', fr: 'Terrain Glaciaire' },
    { btn: 'btn-lavaworld-scene', global: 'LavaWorld3D', file: 'js/lava-world-3d.js', cat: 'ultra', icon: '🌋', en: 'Lava World', fr: 'Monde de Lave' },
    { btn: 'btn-oceanwave-scene', global: 'OceanWave3D', file: 'js/ocean-wave-3d.js', cat: 'ultra', icon: '🌊', en: 'Ocean Wave', fr: 'Vagues Océan' },
    { btn: 'btn-mechrobot-scene', global: 'MechRobot3D', file: 'js/mech-robot-3d.js', cat: 'ultra', icon: '🤖', en: 'Mech Robot', fr: 'Robot Mech' },
    { btn: 'btn-ancientarch-scene', global: 'AncientArch3D', file: 'js/ancient-arch-3d.js', cat: 'ultra', icon: '🏛️', en: 'Ancient Arch', fr: 'Arche Ancienne' },
    { btn: 'btn-legocity-scene', global: 'LegoCity3D', file: 'js/lego-city-3d.js', cat: 'ultra', icon: '🧱', en: 'Lego City', fr: 'Ville Lego' },
    { btn: 'btn-dataglobe-scene', global: 'DataGlobe3D', file: 'js/data-globe-3d.js', cat: 'ultra', icon: '🌐', en: 'Data Globe 3D', fr: 'Globe Données' },
    { btn: 'btn-holohud-scene', global: 'HoloHUD3D', file: 'js/holo-hud-3d.js', cat: 'ultra', icon: '🌈', en: 'Holo HUD', fr: 'HUD Holographique' },
    { btn: 'btn-masksculptor-scene', global: 'MaskSculptor3D', file: 'js/mask-sculptor-3d.js', cat: 'ultra', icon: '🎭', en: 'Mask Sculptor', fr: 'Sculpteur Masques' },
    { btn: 'btn-instrument-scene', global: 'Instrument3D', file: 'js/instrument-3d.js', cat: 'ultra', icon: '🎸', en: '3D Instruments', fr: 'Instruments 3D' },
    { btn: 'btn-chemreaction-scene', global: 'ChemReaction3D', file: 'js/chem-reaction-3d.js', cat: 'ultra', icon: '⚗️', en: 'Chem Reaction', fr: 'Réaction Chimique' },
    { btn: 'btn-anatomy-scene', global: 'Anatomy3D', file: 'js/anatomy-3d.js', cat: 'ultra', icon: '🦴', en: 'Body Anatomy', fr: 'Anatomie 3D' },
    { btn: 'btn-heroforge-scene', global: 'HeroForge3D', file: 'js/hero-forge-3d.js', cat: 'ultra', icon: '🦸‍♂️', en: 'Hero Forge', fr: 'Hero Forge' },
    { btn: 'btn-steampunk-scene', global: 'SteampunkChrono3D', file: 'js/steampunk-chrono-3d.js', cat: 'ultra', icon: '⚙️', en: 'Steampunk Chrono', fr: 'Steampunk Chrono' },
    { btn: 'btn-steampunk-pro-scene', global: 'SteampunkChronoPro3D', file: 'js/steampunk-chrono-pro-3d.js', cat: 'ultra', icon: '⚙️👑', en: 'Steampunk Pro', fr: 'Steampunk Pro' },
    { btn: 'btn-clockultra-scene', global: 'ClockUltra3D', file: 'js/clock-ultra-3d.js', cat: 'ultra', icon: '🕒💎', en: 'CLOCK ULTRA', fr: 'HORLOGE ULTRA' }
  ];

  const loadedScripts = new Map();
  let _sidebar = null;

  function loadScriptOnce(src) {
    if (loadedScripts.has(src)) return loadedScripts.get(src);
    const p = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src + (src.includes('?') ? '' : '?v=200');
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
    loadedScripts.set(src, p);
    return p;
  }

  // Ensures EVERY module panel has a visible Close (✕) button & clean scroll layout!
  function ensurePanelCloseButton(panel) {
    if (!panel || panel.dataset.closeEnhanced === '1') return;
    panel.dataset.closeEnhanced = '1';
    // Check if panel already has its own explicit close button
    const hasOwnClose = panel.querySelector('[id*="close"], [class*="close"], .cu-close-btn, .hf-close-btn');
    if (hasOwnClose) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'studio-auto-close-btn';
    btn.title = (window.currentLang === 'fr') ? 'Fermer (Échap)' : 'Close (Esc)';
    btn.textContent = '✕';
    btn.style.cssText = 'position:sticky;top:0;float:right;z-index:200;width:28px;height:28px;border-radius:7px;background:rgba(239,68,68,0.18);border:1px solid rgba(239,68,68,0.45);color:#fca5a5;font-size:13px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;margin-left:8px;transition:0.15s;';
    btn.onmouseenter = () => { btn.style.background = 'rgba(239,68,68,0.4)'; btn.style.color = '#fff'; };
    btn.onmouseleave = () => { btn.style.background = 'rgba(239,68,68,0.18)'; btn.style.color = '#fca5a5'; };
    btn.onclick = (e) => {
      e.stopPropagation();
      panel.style.display = 'none';
    };
    panel.insertBefore(btn, panel.firstChild);
  }

  function enhanceAllPanels(root) {
    if (!root) return;
    root.querySelectorAll('[id$="-panel"]').forEach(ensurePanelCloseButton);
  }

  async function ensureModuleLoaded(entry) {
    if (!entry) return false;
    if (window[entry.global] && typeof window[entry.global].init === 'function') return true;
    const isFR = (window.currentLang || 'en') === 'fr';
    if (window.toast) window.toast(`⏳ ${isFR ? 'Chargement' : 'Loading'} ${entry.icon} ${isFR ? entry.fr : entry.en}...`);
    if (entry.deps && entry.deps.length) {
      for (const dep of entry.deps) {
        await loadScriptOnce(dep);
      }
    }
    await loadScriptOnce(entry.file);
    return !!(window[entry.global] && typeof window[entry.global].init === 'function');
  }

  function recordRecent(btnId) {
    try {
      const list = JSON.parse(localStorage.getItem('studio3d_recents') || '[]').filter(x => x !== btnId);
      list.unshift(btnId);
      localStorage.setItem('studio3d_recents', JSON.stringify(list.slice(0, 8)));
    } catch (e) {}
  }

  async function openModuleByBtnId(btnId) {
    const entry = MODULE_CATALOG.find(m => m.btn === btnId);
    const btnEl = document.getElementById(btnId);
    if (!entry || !btnEl || !_sidebar) return;

    // Make sure we are in 3D Design view
    const designBtn = document.getElementById('btn-design-mode');
    if (designBtn && !designBtn.classList.contains('active')) designBtn.click();

    recordRecent(btnId);

    if (btnEl.dataset.modInited === '1') {
      enhanceAllPanels(_sidebar);
      return; // Existing click listener handles toggle
    }

    try {
      btnEl.disabled = true;
      const ok = await ensureModuleLoaded(entry);
      btnEl.disabled = false;
      if (ok) {
        btnEl.dataset.modInited = '1';
        window[entry.global].init(_sidebar, btnEl);
        enhanceAllPanels(_sidebar);
        // Trigger the newly attached click listener to open the panel immediately!
        btnEl.click();
      }
    } catch (err) {
      btnEl.disabled = false;
      console.error('[StudioLoader]', err);
      if (window.toast) window.toast('❌ Module load error: ' + entry.en);
    }
  }

  function attach(sidebar) {
    _sidebar = sidebar;
    if (!sidebar) return;

    // Observe newly appended module panels to guarantee a Close (✕) button on every single one!
    const mo = new MutationObserver(() => enhanceAllPanels(sidebar));
    mo.observe(sidebar, { childList: true });
    enhanceAllPanels(sidebar);

    // Attach lazy-load interceptor to every catalog button not yet initialized
    MODULE_CATALOG.forEach(entry => {
      const btnEl = document.getElementById(entry.btn);
      if (!btnEl || btnEl.dataset.lazyHooked === '1') return;
      btnEl.dataset.lazyHooked = '1';
      btnEl.addEventListener('click', (e) => {
        if (btnEl.dataset.modInited !== '1') {
          e.stopImmediatePropagation();
          openModuleByBtnId(entry.btn);
        } else {
          recordRecent(entry.btn);
        }
      }, true);
    });

    // Global Escape key closes any open sidebar module panel
    if (!window._studioEscBound) {
      window._studioEscBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('[id$="-panel"]').forEach(p => {
            if (p.id !== 'ia-guide-panel' && p.style.display && p.style.display !== 'none') {
              p.style.display = 'none';
            }
          });
        }
      });
    }

    // On language switch, re-init already loaded modules whose UI supports refreshLang or rebuild panels cleanly
    window.addEventListener('studio:langchange', () => {
      MODULE_CATALOG.forEach(entry => {
        const mod = window[entry.global];
        if (mod && typeof mod.refreshLang === 'function') {
          try { mod.refreshLang(); } catch (e) {}
        }
      });
    });
  }

  // ── Real Undo / Redo History & Autosave (Ctrl+Z / Ctrl+Y) ───────────────
  const UNDO_STACK = [];
  const REDO_STACK = [];
  const MAX_HISTORY = 40;
  let _autosaveTimer = null;

  function captureSnapshot() {
    const ed = document.getElementById('code-editor');
    const models = (window.SketchExtruder && window.SketchExtruder.getModels) ? window.SketchExtruder.getModels() : [];
    return {
      ts: Date.now(),
      code: ed ? ed.value : '',
      transforms: models.map(m => ({
        id: m.id, name: m.name, hidden: !!m.hidden, spin: !!m.spin, levitate: !!m.levitate,
        pos: m.meshGroup ? [m.meshGroup.position.x, m.meshGroup.position.y, m.meshGroup.position.z] : [m.position.x, m.position.y, m.position.z],
        rot: m.meshGroup ? [m.meshGroup.rotation.x, m.meshGroup.rotation.y, m.meshGroup.rotation.z] : [m.rotation.x, m.rotation.y, m.rotation.z],
        scl: m.meshGroup ? [m.meshGroup.scale.x, m.meshGroup.scale.y, m.meshGroup.scale.z] : [m.groupScale.x, m.groupScale.y, m.groupScale.z]
      }))
    };
  }

  function applySnapshot(snap) {
    if (!snap) return;
    const ed = document.getElementById('code-editor');
    if (ed && typeof snap.code === 'string' && snap.code !== ed.value) {
      ed.value = snap.code;
      if (typeof window.runPreview === 'function') window.runPreview();
    }
    if (snap.transforms && window.SketchExtruder && window.SketchExtruder.getModels) {
      const models = window.SketchExtruder.getModels();
      snap.transforms.forEach(tr => {
        const m = models.find(x => x.id === tr.id);
        if (!m) return;
        m.name = tr.name; m.hidden = tr.hidden; m.spin = tr.spin; m.levitate = tr.levitate;
        if (m.meshGroup) {
          m.meshGroup.position.set(tr.pos[0], tr.pos[1], tr.pos[2]);
          m.meshGroup.rotation.set(tr.rot[0], tr.rot[1], tr.rot[2]);
          m.meshGroup.scale.set(tr.scl[0], tr.scl[1], tr.scl[2]);
          m.meshGroup.visible = !tr.hidden;
        }
        m.position.set(tr.pos[0], tr.pos[1], tr.pos[2]);
        m.rotation.set(tr.rot[0], tr.rot[1], tr.rot[2]);
        m.groupScale.set(tr.scl[0], tr.scl[1], tr.scl[2]);
      });
      if (window.SketchExtruder.notifySceneChange) window.SketchExtruder.notifySceneChange();
    }
  }

  window.pushUndo = function () {
    const snap = captureSnapshot();
    UNDO_STACK.push(snap);
    if (UNDO_STACK.length > MAX_HISTORY) UNDO_STACK.shift();
    REDO_STACK.length = 0;
    // Debounced local autosave
    clearTimeout(_autosaveTimer);
    _autosaveTimer = setTimeout(() => {
      try {
        if (snap.code && snap.code.length < 350000) {
          localStorage.setItem('studio3d_autosave_code', snap.code);
          localStorage.setItem('studio3d_autosave_ts', String(Date.now()));
        }
      } catch (e) {}
    }, 1200);
  };

  function undo() {
    if (UNDO_STACK.length === 0) {
      if (window.toast) window.toast(window.currentLang === 'fr' ? 'Rien à annuler' : 'Nothing to undo');
      return;
    }
    REDO_STACK.push(captureSnapshot());
    applySnapshot(UNDO_STACK.pop());
    if (window.toast) window.toast(window.currentLang === 'fr' ? '↩️ Annulé' : '↩️ Undone');
  }

  function redo() {
    if (REDO_STACK.length === 0) {
      if (window.toast) window.toast(window.currentLang === 'fr' ? 'Rien à rétablir' : 'Nothing to redo');
      return;
    }
    UNDO_STACK.push(captureSnapshot());
    applySnapshot(REDO_STACK.pop());
    if (window.toast) window.toast(window.currentLang === 'fr' ? '↪️ Rétabli' : '↪️ Redone');
  }

  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault(); undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
      e.preventDefault(); redo();
    }
  });

  window.StudioHistory = { push: window.pushUndo, undo, redo, getCounts: () => ({ undo: UNDO_STACK.length, redo: REDO_STACK.length }) };
  window.StudioModuleLoader = {
    catalog: MODULE_CATALOG,
    attach,
    openModule: openModuleByBtnId,
    loadScriptOnce,
    enhanceAllPanels
  };
})();
