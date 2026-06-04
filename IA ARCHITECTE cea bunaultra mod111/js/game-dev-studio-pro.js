(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🎮 GAME DEV STUDIO PRO — BILINGUAL MASTERPIECE
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'GAME DEV STUDIO PRO',
      sub: 'Professional Game Development Suite',
      back: '← Back',
      inject: '➕ Inject Code to Editor',
      injected: '✅ Code Injected!',
      runMsg: 'Code injected! Click RUN to execute in the preview panel.',
      tools: {
        worldgen: {
          name: 'Procedural World Generator',
          desc: 'Real-time multi-octave 2D terrain noise sandbox.',
          seed: 'Seed',
          scale: 'Noise Scale',
          water: 'Water Level',
          octaves: 'Octaves Detail',
          gridSize: 'Map Dimensions',
          randomize: 'Randomize Seed',
          injectBtn: 'Inject Procedural Map Code'
        },
        cutscene: {
          name: 'Cutscene Studio',
          desc: 'Visual timeline sequence editor and previewer.',
          addAction: '➕ Add Action',
          playSeq: '▶️ Play Sequence',
          clear: '🗑️ Clear Timeline',
          dialogue: 'Dialogue Subtitle',
          shake: 'Screen Shake FX',
          fade: 'Fade Screen Overlay',
          speaker: 'Speaker/Actor',
          duration: 'Duration (ms)',
          intensity: 'Intensity',
          color: 'Fade Color',
          injectBtn: 'Inject Cutscene Engine Code'
        },
        cardengine: {
          name: 'Card Game Engine',
          desc: 'Deck logic, dynamic hands, and turn simulator.',
          cardConfig: 'Card Configurator',
          cardName: 'Card Name',
          manaCost: 'Mana Cost',
          attack: 'Attack Power',
          health: 'Health / Defense',
          element: 'Card Element',
          drawBtn: '🃏 Draw Card',
          playBtn: '⚔️ Attack Sandbox',
          injectBtn: 'Inject Card Framework Code'
        },
        spriteani: {
          name: 'Sprite Studio Pro',
          desc: 'Advanced 16x16 grid with multi-frame animation loops.',
          frames: 'Animation Frames',
          addFrame: '➕ New Frame',
          delFrame: '🗑️ Delete Frame',
          fps: 'Playback Speed (FPS)',
          onion: 'Show Onion Skinning',
          presets: 'Animation Presets',
          injectBtn: 'Inject Animated Sprite CSS/JS'
        },
        gamepreview: {
          name: 'Integrated Preview Iframe',
          desc: 'Run templates in a isolated sandboxed preview.',
          selectTemplate: 'Select Active Template',
          terminal: 'Interactive Developer Log Monitor',
          clearLog: 'Clear Logs',
          runBtn: '⚡ Run Active Sandbox'
        }
      }
    },
    fr: {
      title: 'GAME DEV STUDIO PRO',
      sub: 'Suite de Développement de Jeux Professionnels',
      back: '← Retour',
      inject: '➕ Injecter le Code dans l\'Éditeur',
      injected: '✅ Code Injecté!',
      runMsg: 'Code injecté! Cliquez sur RUN pour l\'exécuter dans le panneau de droite.',
      tools: {
        worldgen: {
          name: 'Générateur de Monde Procédural',
          desc: 'Bruit 2D multi-octaves temps réel pour terrains.',
          seed: 'Graine (Seed)',
          scale: 'Échelle du Bruit',
          water: 'Niveau de l\'Eau',
          octaves: 'Détail d\'Octaves',
          gridSize: 'Dimensions de Carte',
          randomize: 'Aléatoire',
          injectBtn: 'Injecter Code Carte Procédurale'
        },
        cutscene: {
          name: 'Studio de Cutscène',
          desc: 'Éditeur visuel de séquence chronologique et aperçu.',
          addAction: '➕ Ajouter une Action',
          playSeq: '▶️ Lancer la Séquence',
          clear: '🗑️ Effacer la Chronologie',
          dialogue: 'Dialogue & Sous-titres',
          shake: 'Effet de Secousse (Shake)',
          fade: 'Fondu d\'Écran (Fade)',
          speaker: 'Orateur / Acteur',
          duration: 'Durée (ms)',
          intensity: 'Intensité',
          color: 'Couleur du Fondu',
          injectBtn: 'Injecter le Code du Moteur Cinématique'
        },
        cardengine: {
          name: 'Moteur de Jeu de Cartes',
          desc: 'Logique de deck, pioche et simulateur de combat.',
          cardConfig: 'Configurateur de Carte',
          cardName: 'Nom de la Carte',
          manaCost: 'Coût en Mana',
          attack: 'Puissance d\'Attaque',
          health: 'Points de Vie',
          element: 'Élément de la Carte',
          drawBtn: '🃏 Tirer une Carte',
          playBtn: '⚔️ Bac à Sable Combat',
          injectBtn: 'Injecter Code Cadre Jeu de Cartes'
        },
        spriteani: {
          name: 'Sprite Studio Pro',
          desc: 'Grille 16x16 avancée avec boucles d\'animations multi-trames.',
          frames: 'Trames d\'Animation (Frames)',
          addFrame: '➕ Nouvelle Trame',
          delFrame: 'Supprimer la Trame',
          fps: 'Vitesse de Lecture (FPS)',
          onion: 'Afficher la Pelure d\'Oignon',
          presets: 'Préréglages d\'Animation',
          injectBtn: 'Injecter CSS/JS de Sprite Animé'
        },
        gamepreview: {
          name: 'Aperçu de Jeu & Console',
          desc: 'Exécutez des modèles dans un bac à sable isolé.',
          selectTemplate: 'Choisir le Modèle de Jeu',
          terminal: 'Moniteur Interactif de Logs Console',
          clearLog: 'Effacer les Logs',
          runBtn: 'Lancer le Bac à Sable'
        }
      }
    }
  };

  function gl() {
    return window.appLang || 'en';
  }

  function getTranslation(tool, key) {
    const lang = gl();
    return TX[lang] && TX[lang].tools[tool] && TX[lang].tools[tool][key]
      ? TX[lang].tools[tool][key]
      : (TX['en'].tools[tool] ? TX['en'].tools[tool][key] : key);
  }

  // ─── Procedural Noise Generator Algorithm ──────────────────────
  function createProceduralNoiseMap(width, height, scale, octaves, seed, waterLevel) {
    const map = [];
    const rnd = Math.sin(seed || 42) * 10000;
    
    function noise2D(x, y) {
      let nx = x * scale;
      let ny = y * scale;
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxVal = 0;

      for (let i = 0; i < octaves; i++) {
        const v = Math.sin(nx * frequency + rnd) * Math.cos(ny * frequency - rnd);
        value += v * amplitude;
        maxVal += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return (value / maxVal + 1) / 2; // Normalize to [0, 1]
    }

    for (let y = 0; y < height; y++) {
      map[y] = [];
      for (let x = 0; x < width; x++) {
        map[y][x] = noise2D(x, y);
      }
    }
    return map;
  }

  // ─── Tab registration ──────────────────────────────────────────
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'gamedevstudiopro') {
      window.activeTab = 'gamedevstudiopro';
      document.querySelectorAll('.ltab').forEach(function(b) {
        b.classList.remove('active');
      });
      const btn = document.getElementById('tab-gamedevstudiopro');
      if (btn) btn.classList.add('active');
      window.initGDSPro(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') {
      originalRenderTab(tab);
    }
  };

  // ─── Module entry point ───────────────────────────────────────
  window.initGDSPro = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const fr = lang === 'fr';
    const activeTx = TX[lang] || TX['en'];

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#0b0f19; color:#f8fafc;">
        <!-- Title Badge -->
        <div style="background:linear-gradient(135deg, rgba(236,72,153,0.15), rgba(99,102,241,0.15)); border-radius:14px; padding:16px; border:1px solid rgba(236,72,153,0.3); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.4);">
          <span style="font-size:32px; filter:drop-shadow(0 0 8px #f472b6);">💎</span>
          <div>
            <h2 style="margin:0; color:#f472b6; font-size:17px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(244,114,182,0.3);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <!-- Selection Grid -->
        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          <!-- 1. Procedural World Generator -->
          <div onclick="window.handleGDSProTool('worldgen')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(34, 197, 94, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#22c55e'; this.style.boxShadow='0 0 15px rgba(34, 197, 94, 0.25)';" onmouseout="this.style.borderColor='rgba(34, 197, 94, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(34, 197, 94, 0.1); border-radius:10px; color:#22c55e;">🌍</div>
            <div style="flex:1;">
              <div style="color:#22c55e; font-weight:800; font-size:13px;">${getTranslation('worldgen', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('worldgen', 'desc')}</div>
            </div>
          </div>

          <!-- 2. Cutscene Studio -->
          <div onclick="window.handleGDSProTool('cutscene')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(167, 139, 250, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#a78bfa'; this.style.boxShadow='0 0 15px rgba(167, 139, 250, 0.25)';" onmouseout="this.style.borderColor='rgba(167, 139, 250, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(167, 139, 250, 0.1); border-radius:10px; color:#a78bfa;">🎬</div>
            <div style="flex:1;">
              <div style="color:#a78bfa; font-weight:800; font-size:13px;">${getTranslation('cutscene', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('cutscene', 'desc')}</div>
            </div>
          </div>

          <!-- 3. Card Game Engine -->
          <div onclick="window.handleGDSProTool('cardengine')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(245, 158, 11, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#f59e0b'; this.style.boxShadow='0 0 15px rgba(245, 158, 11, 0.25)';" onmouseout="this.style.borderColor='rgba(245, 158, 11, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(245, 158, 11, 0.1); border-radius:10px; color:#f59e0b;">🃏</div>
            <div style="flex:1;">
              <div style="color:#f59e0b; font-weight:800; font-size:13px;">${getTranslation('cardengine', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('cardengine', 'desc')}</div>
            </div>
          </div>

          <!-- 4. Sprite Studio Pro -->
          <div onclick="window.handleGDSProTool('spriteani')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(244, 63, 94, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#f43f5e'; this.style.boxShadow='0 0 15px rgba(244, 63, 94, 0.25)';" onmouseout="this.style.borderColor='rgba(244, 63, 94, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(244, 63, 94, 0.1); border-radius:10px; color:#f43f5e;">🎨</div>
            <div style="flex:1;">
              <div style="color:#f43f5e; font-weight:800; font-size:13px;">${getTranslation('spriteani', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('spriteani', 'desc')}</div>
            </div>
          </div>

          <!-- 5. Integrated Preview Iframe -->
          <div onclick="window.handleGDSProTool('gamepreview')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(6, 182, 212, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:12px; backdrop-filter:blur(10px);" onmouseover="this.style.borderColor='#06b6d4'; this.style.boxShadow='0 0 15px rgba(6, 182, 212, 0.25)';" onmouseout="this.style.borderColor='rgba(6, 182, 212, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(6, 182, 212, 0.1); border-radius:10px; color:#06b6d4;">▶️</div>
            <div style="flex:1;">
              <div style="color:#06b6d4; font-weight:800; font-size:13px;">${getTranslation('gamepreview', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${getTranslation('gamepreview', 'desc')}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ─── Handle individual Pro sub-tools ──────────────────────────
  window.handleGDSProTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const fr = lang === 'fr';
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initGDSPro('${lang}')" style="background:rgba(255,255,255,0.08); color:#e2e8f0; border:1px solid rgba(255,255,255,0.15); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.12)';" onmouseout="this.style.background='rgba(255,255,255,0.08)';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'worldgen') {
      renderWorldGenerator(el, backBtn, lang);
    } else if (toolId === 'cutscene') {
      renderCutsceneStudio(el, backBtn, lang);
    } else if (toolId === 'cardengine') {
      renderCardEngine(el, backBtn, lang);
    } else if (toolId === 'spriteani') {
      renderSpriteStudio(el, backBtn, lang);
    } else if (toolId === 'gamepreview') {
      renderGamePreviewIframe(el, backBtn, lang);
    }
  };

  // Helper function to show notifications in main UI
  function showBannerToast(msg) {
    if (window.showToast) {
      window.showToast(msg);
    } else {
      console.log('[GDS PRO Toast]:', msg);
    }
  }

  // Inject helper function
  window._injectGDSProCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      const lang = gl();
      showBannerToast(TX[lang].injected);
    }
  };

  // ═══════════════════════════════════════════
  // 🌍 1. PROCEDURAL WORLD GENERATOR
  // ═══════════════════════════════════════════
  function renderWorldGenerator(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.worldgen;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#0b0f19;">
        ${backBtn}
        
        <h3 style="color:#22c55e; margin:0 0 5px; font-size:15px; font-weight:800;">🌍 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Dynamic Live Canvas Sandbox -->
        <div style="background:#0f172a; border-radius:12px; padding:15px; border:1px solid rgba(34, 197, 94, 0.2); margin-bottom:15px; display:flex; flex-direction:column; align-items:center; gap:12px;">
          <canvas id="proMapCanvas" width="160" height="160" style="border-radius:10px; background:#020617; border:3px solid #1e293b; image-rendering:pixelated; width:160px; height:160px;"></canvas>
          
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#94a3b8;">
              <span>${tx.seed}</span>
              <span id="seedVal" style="font-weight:700; color:#22c55e;">42</span>
            </div>
            <div style="display:flex; gap:6px;">
              <input type="number" id="worldSeed" value="42" style="background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; flex:1;" />
              <button id="btnRandomizeSeed" style="background:#22c55e; color:#0b0f19; border:none; padding:0 12px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">${tx.randomize}</button>
            </div>
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#94a3b8;">
              <span>${tx.scale}</span>
              <span id="scaleVal" style="font-weight:700; color:#22c55e;">0.1</span>
            </div>
            <input type="range" id="worldScale" min="0.02" max="0.3" step="0.01" value="0.1" style="width:100%; accent-color:#22c55e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#94a3b8;">
              <span>${tx.water}</span>
              <span id="waterVal" style="font-weight:700; color:#22c55e;">0.35</span>
            </div>
            <input type="range" id="worldWater" min="0.1" max="0.7" step="0.05" value="0.35" style="width:100%; accent-color:#22c55e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#94a3b8;">
              <span>${tx.octaves}</span>
              <span id="octaveVal" style="font-weight:700; color:#22c55e;">3</span>
            </div>
            <input type="range" id="worldOctaves" min="1" max="4" step="1" value="3" style="width:100%; accent-color:#22c55e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#94a3b8;">
              <span>${tx.gridSize}</span>
            </div>
            <select id="worldGridSize" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="32">32 x 32</option>
              <option value="64" selected>64 x 64</option>
              <option value="128">128 x 128</option>
            </select>
          </div>
        </div>

        <button id="btnInjectWorld" style="width:100%; padding:11px; border-radius:8px; background:#22c55e; border:none; color:#0b0f19; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(34, 197, 94, 0.3); transition:all 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const canvas = document.getElementById('proMapCanvas');
    const worldSeed = document.getElementById('worldSeed');
    const btnRandomize = document.getElementById('btnRandomizeSeed');
    const worldScale = document.getElementById('worldScale');
    const worldWater = document.getElementById('worldWater');
    const worldOctaves = document.getElementById('worldOctaves');
    const worldGridSize = document.getElementById('worldGridSize');
    const btnInject = document.getElementById('btnInjectWorld');

    function updateMap() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const seed = parseInt(worldSeed.value) || 42;
      const scale = parseFloat(worldScale.value);
      const water = parseFloat(worldWater.value);
      const octaves = parseInt(worldOctaves.value);
      const size = parseInt(worldGridSize.value);

      document.getElementById('seedVal').innerText = seed;
      document.getElementById('scaleVal').innerText = scale.toFixed(2);
      document.getElementById('waterVal').innerText = water.toFixed(2);
      document.getElementById('octaveVal').innerText = octaves;

      const noiseMap = createProceduralNoiseMap(size, size, scale, octaves, seed, water);
      
      const pxWidth = canvas.width / size;
      const pxHeight = canvas.height / size;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const val = noiseMap[y][x];
          let color = '#0f172a'; // Deep Water

          if (val < water) {
            color = '#1e3a8a'; // Deep water
          } else if (val < water + 0.05) {
            color = '#3b82f6'; // Shallow water
          } else if (val < water + 0.1) {
            color = '#fef08a'; // Sand beach
          } else if (val < water + 0.3) {
            color = '#22c55e'; // Grasslands
          } else if (val < water + 0.45) {
            color = '#15803d'; // Deep forest
          } else if (val < water + 0.6) {
            color = '#78716c'; // Mountain rock
          } else {
            color = '#f8fafc'; // Snowy peaks
          }

          ctx.fillStyle = color;
          ctx.fillRect(x * pxWidth, y * pxHeight, pxWidth + 0.5, pxHeight + 0.5);
        }
      }
    }

    worldSeed.addEventListener('input', updateMap);
    worldScale.addEventListener('input', updateMap);
    worldWater.addEventListener('input', updateMap);
    worldOctaves.addEventListener('input', updateMap);
    worldGridSize.addEventListener('change', updateMap);

    btnRandomize.addEventListener('click', () => {
      worldSeed.value = Math.floor(Math.random() * 1000);
      updateMap();
    });

    btnInject.addEventListener('click', () => {
      const seed = worldSeed.value;
      const scale = worldScale.value;
      const water = worldWater.value;
      const octaves = worldOctaves.value;
      const size = worldGridSize.value;

      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Générateur de Monde Procédural' : 'Procedural Noise World Generator'}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #090d16;
      color: #e2e8f0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    #gameContainer {
      position: relative;
      background: #020617;
      border: 3px solid #3b82f6;
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
      border-radius: 12px;
      overflow: hidden;
    }
    canvas {
      display: block;
      image-rendering: pixelated;
    }
    .hud {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 12px;
      border-radius: 8px;
      font-size: 12px;
      pointer-events: none;
      font-family: monospace;
    }
  </style>
</head>
<body>

  <div id="gameContainer">
    <canvas id="worldCanvas" width="600" height="450"></canvas>
    <div class="hud">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 5px;">🌍 WORLD ENGINE PRO</div>
      <div>Seed: ${seed} | Octaves: ${octaves}</div>
      <div>[WASD / Arrow Keys] Scroll Camera</div>
      <div style="margin-top: 5px; color: #10b981;">Cam X: <span id="cx">0</span> | Y: <span id="cy">0</span></div>
    </div>
  </div>

  <script>
    (function() {
      const canvas = document.getElementById('worldCanvas');
      const ctx = canvas.getContext('2d');

      const MAP_SIZE = 128; 
      const TILE_SIZE = 32; 
      const scale = ${scale};
      const octaves = ${octaves};
      const seed = ${seed};
      const waterLevel = ${water};

      let camX = 64 * TILE_SIZE - canvas.width / 2;
      let camY = 64 * TILE_SIZE - canvas.height / 2;
      const speed = 8;
      const keys = {};

      const map = [];
      const rndVal = Math.sin(seed) * 10000;

      function getNoise(x, y) {
        let nx = x * scale;
        let ny = y * scale;
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxVal = 0;
        for (let i = 0; i < octaves; i++) {
          const v = Math.sin(nx * frequency + rndVal) * Math.cos(ny * frequency - rndVal);
          value += v * amplitude;
          maxVal += amplitude;
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        return (value / maxVal + 1) / 2;
      }

      // Generate base map grid
      for (let y = 0; y < MAP_SIZE; y++) {
        map[y] = [];
        for (let x = 0; x < MAP_SIZE; x++) {
          map[y][x] = getNoise(x, y);
        }
      }

      function getTileColor(val) {
        if (val < waterLevel) return '#1d4ed8'; // Deep ocean
        if (val < waterLevel + 0.05) return '#3b82f6'; // Shallow sea
        if (val < waterLevel + 0.09) return '#fef08a'; // Coast sand
        if (val < waterLevel + 0.28) return '#22c55e'; // Plains grass
        if (val < waterLevel + 0.45) return '#16a34a'; // Dense forest
        if (val < waterLevel + 0.6) return '#78716c'; // Stone hills
        return '#ffffff'; // Snowy mountains
      }

      window.addEventListener('keydown', e => keys[e.code] = true);
      window.addEventListener('keyup', e => keys[e.code] = false);

      function update() {
        if (keys['ArrowLeft'] || keys['KeyA']) camX -= speed;
        if (keys['ArrowRight'] || keys['KeyD']) camX += speed;
        if (keys['ArrowUp'] || keys['KeyW']) camY -= speed;
        if (keys['ArrowDown'] || keys['KeyS']) camY += speed;

        // Clamp camera boundaries
        camX = Math.max(0, Math.min(camX, MAP_SIZE * TILE_SIZE - canvas.width));
        camY = Math.max(0, Math.min(camY, MAP_SIZE * TILE_SIZE - canvas.height));

        document.getElementById('cx').innerText = Math.round(camX);
        document.getElementById('cy').innerText = Math.round(camY);
      }

      function draw() {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startCol = Math.floor(camX / TILE_SIZE);
        const endCol = Math.floor((camX + canvas.width) / TILE_SIZE) + 1;
        const startRow = Math.floor(camY / TILE_SIZE);
        const endRow = Math.floor((camY + canvas.height) / TILE_SIZE) + 1;

        const offsetX = -camX % TILE_SIZE;
        const offsetY = -camY % TILE_SIZE;

        for (let r = startRow; r < endRow; r++) {
          for (let c = startCol; c < endCol; c++) {
            if (r >= 0 && r < MAP_SIZE && c >= 0 && c < MAP_SIZE) {
              const val = map[r][c];
              ctx.fillStyle = getTileColor(val);
              ctx.fillRect(
                (c - startCol) * TILE_SIZE + offsetX,
                (r - startRow) * TILE_SIZE + offsetY,
                TILE_SIZE,
                TILE_SIZE
              );
            }
          }
        }
      }

      function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
      }

      loop();
    })();
  </script>
</body>
</html>`;
      window._injectGDSProCode(codeToInject);
    });

    updateMap();
  }

  // ═══════════════════════════════════════════
  // 🎬 2. CUTSCENE STUDIO
  // ═══════════════════════════════════════════
  let cutsceneActions = [
    { type: 'dialogue', speaker: 'Hero', text: 'Where am I? This noise is loud...', duration: 2500 },
    { type: 'shake', intensity: 15, duration: 800 },
    { type: 'dialogue', speaker: 'Unknown Spirit', text: 'You have entered the Procedural Dimension!', duration: 3000 },
    { type: 'fade', color: '#000000', duration: 1000 }
  ];

  function renderCutsceneStudio(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.cutscene;

    function buildTimelineListHTML() {
      return cutsceneActions.map((action, index) => {
        let details = '';
        if (action.type === 'dialogue') {
          details = `<span style="color:#60a5fa; font-weight:bold;">${action.speaker}:</span> "${action.text}" (${action.duration}ms)`;
        } else if (action.type === 'shake') {
          details = `<span style="color:#f59e0b; font-weight:bold;">SHAKE FX:</span> Int: ${action.intensity} (${action.duration}ms)`;
        } else if (action.type === 'fade') {
          details = `<span style="color:#ef4444; font-weight:bold;">FADE:</span> Color: ${action.color} (${action.duration}ms)`;
        }

        return `
          <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px; margin-bottom:6px; display:flex; align-items:center; justify-content:space-between; font-size:11px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#4f46e5; color:#fff; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700;">${index+1}</span>
              <div>${details}</div>
            </div>
            <button onclick="window._gdsDeleteCutsceneAction(${index})" style="background:none; border:none; color:#f43f5e; font-size:13px; cursor:pointer; padding:2px 6px;">✕</button>
          </div>
        `;
      }).join('');
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#0b0f19;">
        ${backBtn}
        
        <h3 style="color:#a78bfa; margin:0 0 5px; font-size:15px; font-weight:800;">🎬 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Visual Cinematic Preview Sandbox Screen -->
        <div id="cutscenePreviewBox" style="background:#020617; border:2px solid #a78bfa; border-radius:12px; height:180px; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; padding:15px; margin-bottom:15px; box-shadow:0 0 20px rgba(167, 139, 250, 0.2); transition:transform 0.1s;">
          <!-- Actor placeholder in 2D preview -->
          <div id="actorAvatar" style="font-size:36px; margin-bottom:15px; display:none; transition:all 0.2s;">🤖</div>
          
          <!-- Dialogue box -->
          <div id="dialogueSubtitleBox" style="background:rgba(15, 23, 42, 0.85); border:1px solid rgba(167,139,250,0.4); border-radius:8px; padding:10px 14px; width:100%; box-sizing:border-box; min-height:55px; text-align:center; color:#fff; font-size:11px; font-family:monospace; display:none;">
            <div id="subSpeaker" style="font-weight:800; color:#a78bfa; margin-bottom:4px;"></div>
            <div id="subText"></div>
          </div>

          <!-- Color screen overlay for Fades -->
          <div id="fadeOverlay" style="position:absolute; inset:0; background:transparent; pointer-events:none; transition:background-color 0.3s;"></div>
          
          <div id="playHelpText" style="position:absolute; top:45%; color:#64748b; font-size:11px; pointer-events:none; font-weight:700;">
            ${fr ? 'Cliquez sur Lancer pour tester' : 'Click Play Sequence to Preview'}
          </div>
        </div>

        <!-- Action Creator Form -->
        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(167,139,250,0.25); border-radius:10px; padding:12px; margin-bottom:15px;">
          <h4 style="margin:0 0 10px; font-size:11px; text-transform:uppercase; color:#a78bfa; letter-spacing:0.5px;">${fr ? 'Ajouter une Action' : 'Create New Scene Action'}</h4>
          
          <div style="margin-bottom:8px;">
            <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">Action Type</label>
            <select id="actionType" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="dialogue" selected>${tx.dialogue}</option>
              <option value="shake">${tx.shake}</option>
              <option value="fade">${tx.fade}</option>
            </select>
          </div>

          <!-- Dialogue Sub-Fields -->
          <div id="field-dialogue" style="display:block;">
            <div style="margin-bottom:8px;">
              <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.speaker}</label>
              <input type="text" id="diagSpeaker" value="Hero" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:8px;">
              <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">Dialogue Text</label>
              <textarea id="diagText" style="width:100%; height:45px; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box; resize:none;">Hello world!</textarea>
            </div>
          </div>

          <!-- Shake Sub-Fields -->
          <div id="field-shake" style="display:none;">
            <div style="margin-bottom:8px;">
              <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.intensity}</label>
              <input type="range" id="shakeIntensity" min="5" max="30" value="15" style="width:100%; accent-color:#a78bfa;" />
            </div>
          </div>

          <!-- Fade Sub-Fields -->
          <div id="field-fade" style="display:none;">
            <div style="margin-bottom:8px;">
              <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.color}</label>
              <input type="color" id="fadeColor" value="#000000" style="width:100%; background:none; border:none; height:30px; cursor:pointer;" />
            </div>
          </div>

          <!-- Generic Fields -->
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.duration}</label>
            <input type="number" id="actionDuration" value="2000" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
          </div>

          <button id="btnAddAction" style="width:100%; padding:8px; border-radius:6px; background:#a78bfa; border:none; color:#0b0f19; font-weight:800; font-size:11px; cursor:pointer; transition:all 0.2s;">
            ${tx.addAction}
          </button>
        </div>

        <!-- Sequence Timeline -->
        <h4 style="margin:0 0 10px; font-size:11px; text-transform:uppercase; color:#a78bfa; letter-spacing:0.5px;">Chronologie Sequence</h4>
        <div id="timelineContainer" style="max-height:160px; overflow-y:auto; margin-bottom:15px; border-radius:8px; background:rgba(0,0,0,0.2); padding:6px; border:1px solid rgba(255,255,255,0.05);">
          ${buildTimelineListHTML()}
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
          <button id="btnPlaySequence" style="padding:9px; border-radius:6px; background:#4f46e5; border:none; color:#fff; font-weight:800; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;">
            ${tx.playSeq}
          </button>
          <button id="btnClearTimeline" style="padding:9px; border-radius:6px; background:rgba(244,63,94,0.15); border:1px solid rgba(244,63,94,0.3); color:#f43f5e; font-weight:800; font-size:11px; cursor:pointer;">
            ${tx.clear}
          </button>
        </div>

        <button id="btnInjectCutscene" style="width:100%; padding:11px; border-radius:8px; background:#a78bfa; border:none; color:#0b0f19; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(167, 139, 250, 0.3); transition:all 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Dynamic field toggle
    const selectType = document.getElementById('actionType');
    selectType.addEventListener('change', () => {
      document.getElementById('field-dialogue').style.display = selectType.value === 'dialogue' ? 'block' : 'none';
      document.getElementById('field-shake').style.display = selectType.value === 'shake' ? 'block' : 'none';
      document.getElementById('field-fade').style.display = selectType.value === 'fade' ? 'block' : 'none';
    });

    // Add action trigger
    document.getElementById('btnAddAction').addEventListener('click', () => {
      const type = selectType.value;
      const duration = parseInt(document.getElementById('actionDuration').value) || 1000;
      
      const newAction = { type, duration };

      if (type === 'dialogue') {
        newAction.speaker = document.getElementById('diagSpeaker').value;
        newAction.text = document.getElementById('diagText').value;
      } else if (type === 'shake') {
        newAction.intensity = parseInt(document.getElementById('shakeIntensity').value);
      } else if (type === 'fade') {
        newAction.color = document.getElementById('fadeColor').value;
      }

      cutsceneActions.push(newAction);
      document.getElementById('timelineContainer').innerHTML = buildTimelineListHTML();
      showBannerToast(fr ? 'Action ajoutée !' : 'Action added!');
    });

    // Delete action global helper
    window._gdsDeleteCutsceneAction = function(idx) {
      cutsceneActions.splice(idx, 1);
      document.getElementById('timelineContainer').innerHTML = buildTimelineListHTML();
    };

    // Clear timeline
    document.getElementById('btnClearTimeline').addEventListener('click', () => {
      cutsceneActions = [];
      document.getElementById('timelineContainer').innerHTML = buildTimelineListHTML();
    });

    // Play visual sequencer simulator
    const previewBox = document.getElementById('cutscenePreviewBox');
    const dialogueBox = document.getElementById('dialogueSubtitleBox');
    const speakerText = document.getElementById('subSpeaker');
    const subtitleText = document.getElementById('subText');
    const fadeOverlay = document.getElementById('fadeOverlay');
    const helpText = document.getElementById('playHelpText');
    const avatar = document.getElementById('actorAvatar');

    document.getElementById('btnPlaySequence').addEventListener('click', () => {
      if (cutsceneActions.length === 0) return;
      
      helpText.style.display = 'none';
      dialogueBox.style.display = 'none';
      avatar.style.display = 'none';
      fadeOverlay.style.background = 'transparent';

      let currentActionIndex = 0;

      function executeNext() {
        if (currentActionIndex >= cutsceneActions.length) {
          helpText.style.display = 'block';
          dialogueBox.style.display = 'none';
          avatar.style.display = 'none';
          fadeOverlay.style.background = 'transparent';
          return;
        }

        const action = cutsceneActions[currentActionIndex];
        
        if (action.type === 'dialogue') {
          avatar.style.display = 'block';
          dialogueBox.style.display = 'block';
          speakerText.innerText = action.speaker;
          
          // Letter by letter type animation simulator
          let charIndex = 0;
          subtitleText.innerText = '';
          const typingSpeed = 30;
          
          function typeLetter() {
            if (charIndex < action.text.length) {
              subtitleText.innerText += action.text[charIndex];
              charIndex++;
              setTimeout(typeLetter, typingSpeed);
            }
          }
          typeLetter();
          
          setTimeout(() => {
            currentActionIndex++;
            executeNext();
          }, action.duration);

        } else if (action.type === 'shake') {
          dialogueBox.style.display = 'none';
          avatar.style.display = 'none';
          
          // Screen shake animation simulator
          let startTime = Date.now();
          const shakeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= action.duration) {
              clearInterval(shakeInterval);
              previewBox.style.transform = 'none';
              currentActionIndex++;
              executeNext();
            } else {
              const dx = (Math.random() - 0.5) * action.intensity;
              const dy = (Math.random() - 0.5) * action.intensity;
              previewBox.style.transform = `translate(${dx}px, ${dy}px)`;
            }
          }, 30);

        } else if (action.type === 'fade') {
          dialogueBox.style.display = 'none';
          avatar.style.display = 'none';
          
          // Fade overlay color simulation
          fadeOverlay.style.transition = `background-color ${action.duration/1000}s ease-in-out`;
          fadeOverlay.style.backgroundColor = action.color;
          
          setTimeout(() => {
            currentActionIndex++;
            executeNext();
          }, action.duration);
        }
      }

      executeNext();
    });

    // Inject engine template
    document.getElementById('btnInjectCutscene').addEventListener('click', () => {
      const actionsJson = JSON.stringify(cutsceneActions, null, 2);

      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Studio Cinématique Pro' : 'Cinematic Cutscene Studio Pro'}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #060913;
      color: #fff;
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    #viewport {
      width: 640px;
      height: 360px;
      background: #020617;
      border: 3px solid #a78bfa;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(167, 139, 250, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }
    #character {
      font-size: 64px;
      margin-bottom: 20px;
      transition: transform 0.2s;
    }
    .textbox {
      background: rgba(15, 23, 42, 0.9);
      border: 2px solid #a78bfa;
      border-radius: 10px;
      padding: 15px 20px;
      width: 100%;
      box-sizing: border-box;
      min-height: 80px;
      color: #fff;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
    }
    .speaker {
      color: #a78bfa;
      font-weight: bold;
      margin-bottom: 6px;
      font-size: 16px;
    }
    #fadeScreen {
      position: absolute;
      inset: 0;
      background: transparent;
      pointer-events: none;
      transition: background-color 0.5s ease;
    }
    .btn-play {
      margin-top: 20px;
      background: #a78bfa;
      color: #0b0f19;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(167, 139, 250, 0.3);
    }
  </style>
</head>
<body>

  <div id="viewport">
    <div id="character">🤖</div>
    <div class="textbox" id="textbox" style="display: none;">
      <div class="speaker" id="speaker">Hero</div>
      <div id="subtitles">...</div>
    </div>
    <div id="fadeScreen"></div>
  </div>

  <button class="btn-play" onclick="startCutscene()">${fr ? 'Lancer la Cinématique' : 'Play Cutscene Sequence'}</button>

  <script>
    const sequence = ${actionsJson};

    const viewport = document.getElementById('viewport');
    const character = document.getElementById('character');
    const textbox = document.getElementById('textbox');
    const speaker = document.getElementById('speaker');
    const subtitles = document.getElementById('subtitles');
    const fadeScreen = document.getElementById('fadeScreen');

    let currentStep = 0;

    function startCutscene() {
      currentStep = 0;
      textbox.style.display = 'none';
      character.style.transform = 'scale(1)';
      fadeScreen.style.backgroundColor = 'transparent';
      executeNextAction();
    }

    function executeNextAction() {
      if (currentStep >= sequence.length) {
        textbox.style.display = 'block';
        speaker.innerText = 'System';
        subtitles.innerText = '${fr ? 'Cinématique terminée.' : 'Cinematic finished.'}';
        return;
      }

      const action = sequence[currentStep];

      if (action.type === 'dialogue') {
        textbox.style.display = 'block';
        speaker.innerText = action.speaker;
        
        let charIndex = 0;
        subtitles.innerText = '';
        function type() {
          if (charIndex < action.text.length) {
            subtitles.innerText += action.text[charIndex];
            charIndex++;
            setTimeout(type, 30);
          }
        }
        type();

        setTimeout(() => {
          currentStep++;
          executeNextAction();
        }, action.duration);

      } else if (action.type === 'shake') {
        textbox.style.display = 'none';
        let start = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - start;
          if (elapsed >= action.duration) {
            clearInterval(interval);
            viewport.style.transform = 'none';
            currentStep++;
            executeNextAction();
          } else {
            const dx = (Math.random() - 0.5) * action.intensity;
            const dy = (Math.random() - 0.5) * action.intensity;
            viewport.style.transform = \`translate(\${dx}px, \${dy}px)\`;
          }
        }, 30);

      } else if (action.type === 'fade') {
        textbox.style.display = 'none';
        fadeScreen.style.transition = \`background-color \${action.duration/1000}s ease\`;
        fadeScreen.style.backgroundColor = action.color;
        
        setTimeout(() => {
          currentStep++;
          executeNextAction();
        }, action.duration);
      }
    }
  </script>
</body>
</html>`;
      window._injectGDSProCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🃏 3. CARD GAME ENGINE
  // ═══════════════════════════════════════════
  let battleLog = [];

  function renderCardEngine(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.cardengine;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#0b0f19;">
        ${backBtn}
        
        <h3 style="color:#f59e0b; margin:0 0 5px; font-size:15px; font-weight:800;">🃏 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Visual Arena Sandbox -->
        <div style="background:#020617; border:2px solid #f59e0b; border-radius:12px; padding:15px; margin-bottom:15px; display:flex; flex-direction:column; gap:12px;">
          <!-- Battle logs -->
          <div id="cardArenaLog" style="height:55px; background:rgba(0,0,0,0.4); border-radius:8px; border:1px solid rgba(255,255,255,0.05); padding:8px; font-size:10px; font-family:monospace; color:#a3e635; overflow-y:auto; box-sizing:border-box;">
            <div>Deck initialized with 15 cards. Draw one to start.</div>
          </div>

          <!-- Table layout -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <!-- Deck pile -->
            <div id="deckPile" style="width:50px; height:70px; background:linear-gradient(135deg, #b45309, #d97706); border-radius:6px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:2px solid #fff; box-shadow:0 4px 10px rgba(0,0,0,0.5); font-size:10px; font-weight:900;">
              <div>🎴</div>
              <div id="deckCount" style="margin-top:4px;">15</div>
            </div>

            <!-- Main active played card -->
            <div id="playedCardSlot" style="flex:1; display:flex; justify-content:center;">
              <div style="border:1px dashed rgba(245,158,11,0.3); border-radius:8px; width:70px; height:100px; display:flex; align-items:center; justify-content:center; color:#475569; font-size:10px; text-transform:uppercase; font-weight:700;">
                Field
              </div>
            </div>
          </div>

          <!-- Dynamic Active Hand Row -->
          <div id="cardsHandRow" style="display:flex; justify-content:center; gap:8px; height:110px; overflow-x:auto; padding-top:10px; overflow-y:hidden; box-sizing:border-box;"></div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button id="btnDrawCard" style="background:#f59e0b; color:#0b0f19; border:none; padding:10px; border-radius:6px; font-weight:800; font-size:11px; cursor:pointer;">
              ${tx.drawBtn}
            </button>
            <button id="btnAttackArena" style="background:#ef4444; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:800; font-size:11px; cursor:pointer;">
              ${tx.playBtn}
            </button>
          </div>
        </div>

        <!-- Custom Card Creator form -->
        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(245,158,11,0.25); border-radius:10px; padding:12px; margin-bottom:15px;">
          <h4 style="margin:0 0 10px; font-size:11px; text-transform:uppercase; color:#f59e0b; letter-spacing:0.5px;">${tx.cardConfig}</h4>
          
          <div style="margin-bottom:8px;">
            <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.cardName}</label>
            <input type="text" id="cardNameInput" value="Mage Pro" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:8px;">
            <div>
              <label style="display:block; font-size:9px; color:#94a3b8; margin-bottom:3px;">${tx.manaCost}</label>
              <input type="number" id="cardManaInput" value="3" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
            </div>
            <div>
              <label style="display:block; font-size:9px; color:#94a3b8; margin-bottom:3px;">${tx.attack}</label>
              <input type="number" id="cardAttackInput" value="4" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
            </div>
            <div>
              <label style="display:block; font-size:9px; color:#94a3b8; margin-bottom:3px;">${tx.health}</label>
              <input type="number" id="cardDefInput" value="5" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px; box-sizing:border-box;" />
            </div>
          </div>

          <div style="margin-bottom:8px;">
            <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:3px;">${tx.element}</label>
            <select id="cardElementInput" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="fire" selected>${fr ? 'Feu' : 'Fire'}</option>
              <option value="water">${fr ? 'Eau' : 'Water'}</option>
              <option value="earth">${fr ? 'Terre' : 'Earth'}</option>
              <option value="wind">${fr ? 'Vent' : 'Wind'}</option>
            </select>
          </div>
        </div>

        <button id="btnInjectCardEngine" style="width:100%; padding:11px; border-radius:8px; background:#f59e0b; border:none; color:#0b0f19; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(245, 158, 11, 0.3); transition:all 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    let hand = [];
    let deckCount = 15;

    function renderHand() {
      const row = document.getElementById('cardsHandRow');
      if (!row) return;
      
      row.innerHTML = hand.map((card, idx) => {
        let grad = 'linear-gradient(135deg, #ef4444, #b91c1c)';
        if (card.element === 'water') grad = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
        if (card.element === 'earth') grad = 'linear-gradient(135deg, #10b981, #065f46)';
        if (card.element === 'wind') grad = 'linear-gradient(135deg, #a78bfa, #6d28d9)';

        return `
          <div onclick="window._gdsPlayCard(${idx})" style="background:${grad}; border:1px solid rgba(255,255,255,0.4); border-radius:8px; width:65px; height:90px; flex-shrink:0; display:flex; flex-direction:column; justify-content:space-between; padding:6px; box-sizing:border-box; color:#fff; cursor:pointer; box-shadow:0 4px 8px rgba(0,0,0,0.3); transition:all 0.25s; transform:perspective(500px) rotateY(0deg) translateY(0px);" onmouseover="this.style.transform='perspective(500px) rotateY(15deg) translateY(-8px)';" onmouseout="this.style.transform='perspective(500px) rotateY(0deg) translateY(0px)';">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:8px;">
              <span style="font-weight:900; background:rgba(0,0,0,0.3); border-radius:50%; width:12px; height:12px; display:flex; align-items:center; justify-content:center;">${card.cost}</span>
              <span style="font-size:9px;">${card.element === 'fire' ? '🔥' : card.element === 'water' ? '💧' : card.element === 'earth' ? '🌱' : '🌀'}</span>
            </div>
            <div style="font-size:8px; font-weight:800; text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin:3px 0;">${card.name}</div>
            <div style="display:flex; justify-content:space-between; font-size:8px; font-weight:900; background:rgba(0,0,0,0.2); padding:2px; border-radius:4px;">
              <span style="color:#facc15;">⚔️${card.atk}</span>
              <span style="color:#fb7185;">❤️${card.hp}</span>
            </div>
          </div>
        `;
      }).join('');
      document.getElementById('deckCount').innerText = deckCount;
    }

    // Draw card
    document.getElementById('btnDrawCard').addEventListener('click', () => {
      if (deckCount <= 0) {
        showBannerToast(fr ? 'Deck vide !' : 'Deck is empty!');
        return;
      }
      if (hand.length >= 5) {
        showBannerToast(fr ? 'Main pleine (max 5) !' : 'Hand is full (max 5)!');
        return;
      }

      const names = ['Fire Giant', 'Aqua Spirit', 'Golem Master', 'Zephyr Elf', 'Phoenix Pro', 'Titan GGD'];
      const elements = ['fire', 'water', 'earth', 'wind'];

      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomEl = elements[Math.floor(Math.random() * elements.length)];
      
      const newCard = {
        name: randomName,
        cost: Math.floor(Math.random() * 5) + 1,
        atk: Math.floor(Math.random() * 6) + 1,
        hp: Math.floor(Math.random() * 8) + 1,
        element: randomEl
      };

      hand.push(newCard);
      deckCount--;
      
      const arenaLog = document.getElementById('cardArenaLog');
      arenaLog.innerHTML += `<div>Drew: ${newCard.name} (${newCard.element.toUpperCase()})</div>`;
      arenaLog.scrollTop = arenaLog.scrollHeight;
      
      if (window.playTone) window.playTone('coin');
      renderHand();
    });

    // Play card handler
    window._gdsPlayCard = function(idx) {
      const card = hand[idx];
      hand.splice(idx, 1);

      let grad = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      if (card.element === 'water') grad = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
      if (card.element === 'earth') grad = 'linear-gradient(135deg, #10b981, #065f46)';
      if (card.element === 'wind') grad = 'linear-gradient(135deg, #a78bfa, #6d28d9)';

      const slot = document.getElementById('playedCardSlot');
      slot.innerHTML = `
        <div style="background:${grad}; border:2px solid #fff; border-radius:8px; width:70px; height:100px; display:flex; flex-direction:column; justify-content:space-between; padding:6px; box-sizing:border-box; color:#fff; box-shadow:0 8px 16px rgba(0,0,0,0.5); animation: playCardAnim 0.3s ease-out;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:9px;">
            <span style="font-weight:900; background:rgba(0,0,0,0.3); border-radius:50%; width:14px; height:14px; display:flex; align-items:center; justify-content:center;">${card.cost}</span>
            <span style="font-size:10px;">${card.element === 'fire' ? '🔥' : card.element === 'water' ? '💧' : card.element === 'earth' ? '🌱' : '🌀'}</span>
          </div>
          <div style="font-size:9px; font-weight:800; text-align:center;">${card.name}</div>
          <div style="display:flex; justify-content:space-between; font-size:9px; font-weight:900; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px;">
            <span style="color:#facc15;">⚔️${card.atk}</span>
            <span style="color:#fb7185;">❤️${card.hp}</span>
          </div>
        </div>
      `;

      const arenaLog = document.getElementById('cardArenaLog');
      arenaLog.innerHTML += `<div>Played: ${card.name} to Field!</div>`;
      arenaLog.scrollTop = arenaLog.scrollHeight;
      
      if (window.playTone) window.playTone('shoot');
      renderHand();
    };

    // Attack simulation
    document.getElementById('btnAttackArena').addEventListener('click', () => {
      const arenaLog = document.getElementById('cardArenaLog');
      const dmg = Math.floor(Math.random() * 8) + 1;
      
      arenaLog.innerHTML += `<div style="color:#fb7185;">⚔️ Arena Battle: dealt ${dmg} dmg to enemy!</div>`;
      arenaLog.scrollTop = arenaLog.scrollHeight;
      
      if (window.playTone) window.playTone('jump');
    });

    // Inject engine template
    document.getElementById('btnInjectCardEngine').addEventListener('click', () => {
      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Moteur de Jeu de Cartes Pro' : 'Professional Card Engine Pro'}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #090e1a;
      color: #fff;
      font-family: 'Segoe UI', system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .board {
      width: 700px;
      height: 480px;
      background: linear-gradient(135deg, #0f172a, #1e1b4b);
      border: 3px solid #f59e0b;
      border-radius: 16px;
      box-shadow: 0 0 40px rgba(245, 158, 11, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
    }
    .combat-zone {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex: 1;
      align-items: center;
    }
    .slot {
      width: 100px;
      height: 140px;
      border: 2px dashed rgba(245, 158, 11, 0.25);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #475569;
      font-weight: 800;
      font-size: 12px;
    }
    .hand-row {
      display: flex;
      justify-content: center;
      gap: 12px;
      height: 130px;
    }
    .game-card {
      width: 90px;
      height: 125px;
      border-radius: 10px;
      border: 2px solid #fff;
      padding: 8px;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      box-shadow: 0 8px 16px rgba(0,0,0,0.4);
      transition: all 0.2s ease;
    }
    .game-card:hover {
      transform: translateY(-15px) scale(1.05);
      box-shadow: 0 15px 25px rgba(245, 158, 11, 0.3);
    }
    .action-bar {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
    .btn-act {
      background: #f59e0b;
      color: #0b0f19;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
  </style>
</head>
<body>

  <div class="board">
    <!-- Opponent Area -->
    <div style="display: flex; justify-content: space-between; align-items: center; color: #fb7185;">
      <div>💀 Opponent HP: <span id="oppHp">30</span></div>
      <div>Cards in hand: 4</div>
    </div>

    <!-- Active Field Battle Zone -->
    <div class="combat-zone">
      <div id="oppSlot" class="slot">${fr ? 'ADV' : 'OPP'}</div>
      <div id="playerSlot" class="slot">${fr ? 'JOUEUR' : 'PLAYER'}</div>
    </div>

    <!-- Player Deck & Hand Row -->
    <div class="hand-row" id="playerHand"></div>

    <!-- Player HUD -->
    <div style="display: flex; justify-content: space-between; align-items: center; color: #a3e635;">
      <div>💖 Player HP: <span id="pHP">30</span></div>
      <div>Mana: 5/5</div>
    </div>
  </div>

  <div class="action-bar">
    <button class="btn-act" onclick="drawCard()">${fr ? '🃏 Tirer' : '🃏 Draw Card'}</button>
    <button class="btn-act" style="background:#ef4444; color:#fff;" onclick="simulateAttack()">${fr ? '⚔️ Attaquer' : '⚔️ Fight!'}</button>
  </div>

  <script>
    let pHP = 30;
    let oppHP = 30;
    const hand = [];
    const elements = {
      fire: 'linear-gradient(135deg, #ef4444, #b91c1c)',
      water: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      earth: 'linear-gradient(135deg, #10b981, #065f46)'
    };

    function drawCard() {
      if(hand.length >= 6) return;
      const elKeys = Object.keys(elements);
      const randomEl = elKeys[Math.floor(Math.random()*elKeys.length)];
      const names = ['Ignis', 'Aquarius', 'Terra Golem'];
      const card = {
        name: names[Math.floor(Math.random()*names.length)],
        cost: Math.floor(Math.random()*4)+1,
        atk: Math.floor(Math.random()*5)+1,
        hp: Math.floor(Math.random()*6)+1,
        element: randomEl
      };
      hand.push(card);
      renderHand();
    }

    function renderHand() {
      const container = document.getElementById('playerHand');
      container.innerHTML = hand.map((c, i) => \`
        <div class="game-card" style="background:\${elements[c.element]}" onclick="playCard(\${i})">
          <div style="display:flex; justify-content:space-between; font-size:10px;">
            <span>\${c.cost}</span>
            <span>\${c.element === 'fire' ? '🔥' : c.element === 'water' ? '💧' : '🌱'}</span>
          </div>
          <div style="font-size:10px; font-weight:bold; text-align:center;">\${c.name}</div>
          <div style="display:flex; justify-content:space-between; font-size:10px; font-weight:bold;">
            <span>⚔️\${c.atk}</span>
            <span>❤️\${c.hp}</span>
          </div>
        </div>
      \`).join('');
    }

    function playCard(index) {
      const card = hand[index];
      hand.splice(index, 1);
      renderHand();

      document.getElementById('playerSlot').innerHTML = \`
        <div class="game-card" style="background:\${elements[card.element]}; width:100%; height:100%; border:none; margin:0;">
          <div style="font-size:9px;">\${card.element.toUpperCase()}</div>
          <div style="font-size:11px; font-weight:bold; text-align:center;">\${card.name}</div>
          <div style="display:flex; justify-content:space-between; font-size:10px;">
            <span>⚔️\${card.atk}</span>
            <span>❤️\${card.hp}</span>
          </div>
        </div>
      \`;
      document.getElementById('playerSlot').setAttribute('data-atk', card.atk);
    }

    function simulateAttack() {
      const playerSlot = document.getElementById('playerSlot');
      const atk = parseInt(playerSlot.getAttribute('data-atk')) || 0;
      if (atk === 0) {
        alert('${fr ? 'Jouez une carte d\'abord !' : 'Play a card first!'}');
        return;
      }
      oppHP -= atk;
      document.getElementById('oppHp').innerText = oppHP;
      if(oppHP <= 0) {
        alert('${fr ? 'Victoire !' : 'Victory!'}');
        oppHP = 30;
        document.getElementById('oppHp').innerText = oppHP;
      }
    }

    // Start with 3 cards
    drawCard(); drawCard(); drawCard();
  </script>
</body>
</html>`;
      window._injectGDSProCode(codeToInject);
    });
  }

  // ═══════════════════════════════════════════
  // 🎨 4. SPRITE STUDIO PRO (16x16)
  // ═══════════════════════════════════════════
  let activeFrame = 0;
  let spriteFrames = [
    new Array(256).fill('transparent'),
    new Array(256).fill('transparent')
  ];
  let curColor = '#ef4444';
  let isPlaying = false;
  let playInterval = null;
  let showOnion = true;

  function renderSpriteStudio(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.spriteani;

    function buildFrameTabs() {
      return spriteFrames.map((f, index) => {
        const border = index === activeFrame ? '2px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)';
        const bg = index === activeFrame ? 'rgba(244,63,94,0.15)' : 'rgba(0,0,0,0.2)';
        return `
          <button onclick="window._gdsSelectSpriteFrame(${index})" style="border:${border}; background:${bg}; color:#fff; border-radius:6px; padding:6px 12px; cursor:pointer; font-size:10px; font-weight:700;">
            ${fr ? 'Trame' : 'Frame'} ${index+1}
          </button>
        `;
      }).join('') + `
        <button onclick="window._gdsAddSpriteFrame()" style="background:rgba(255,255,255,0.08); color:#f43f5e; border:1px dashed #f43f5e; border-radius:6px; padding:6px 12px; cursor:pointer; font-size:10px; font-weight:700;">
          ${tx.addFrame}
        </button>
      `;
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#0b0f19;">
        ${backBtn}
        
        <h3 style="color:#f43f5e; margin:0 0 5px; font-size:15px; font-weight:800;">🎨 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- 16x16 interactive grid canvas wrapper -->
        <div style="background:#020617; border:2px solid #f43f5e; border-radius:12px; padding:15px; margin-bottom:15px; display:flex; flex-direction:column; align-items:center; gap:12px;">
          <!-- Animation playback small thumbnail -->
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center; background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:8px;">
            <div style="font-size:11px; font-weight:700; color:#94a3b8;">${fr ? 'Aperçu Direct' : 'Live Loop Preview'}</div>
            <div id="spritePreviewThumb" style="width:32px; height:32px; background:transparent; border:1px solid rgba(255,255,255,0.1); border-radius:4px; image-rendering:pixelated; overflow:hidden;"></div>
          </div>

          <!-- Onion / Grid wrapper -->
          <div style="position:relative; width:224px; height:224px; background:#0f172a; border-radius:8px; border:2px solid #334155; display:grid; grid-template-columns:repeat(16, 1fr); grid-template-rows:repeat(16, 1fr); overflow:hidden;" id="spriteGridContainer">
            <!-- Grid pixels dynamically filled here -->
          </div>

          <!-- Color palette picker -->
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; width:100%;">
            ${['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a78bfa', '#f43f5e', '#ffffff', '#000000', 'transparent'].map(color => {
              const border = color === curColor ? '2px solid #fff' : '1px solid rgba(0,0,0,0.5)';
              const txt = color === 'transparent' ? '❌' : '';
              return `
                <div onclick="window._gdsSelectSpriteColor('${color}')" style="background:${color === 'transparent' ? '#334155' : color}; border:${border}; width:20px; height:20px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:900;">${txt}</div>
              `;
            }).join('')}
            <input type="color" id="spriteCustomColor" value="#ff0000" style="width:24px; height:22px; padding:0; background:none; border:none; cursor:pointer;" />
          </div>
        </div>

        <!-- Frame Manager tabs -->
        <h4 style="margin:0 0 8px; font-size:11px; text-transform:uppercase; color:#f43f5e; letter-spacing:0.5px;">${tx.frames}</h4>
        <div id="frameTabsContainer" style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:15px;">
          ${buildFrameTabs()}
        </div>

        <!-- Playback controllers -->
        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(244,63,94,0.25); border-radius:10px; padding:12px; margin-bottom:15px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; align-items:center;">
            <button id="btnPlaySprite" style="background:#f43f5e; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">
              ▶️ Play Loop
            </button>
            <button onclick="window._gdsDeleteSpriteFrameTab()" style="background:rgba(244,63,94,0.15); border:1px solid rgba(244,63,94,0.3); color:#f43f5e; border-radius:6px; padding:6px 12px; cursor:pointer; font-size:11px;">
              ${tx.delFrame}
            </button>
          </div>

          <div style="margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:3px;">
              <span>${tx.fps}</span>
              <span id="fpsVal" style="font-weight:700; color:#f43f5e;">6</span>
            </div>
            <input type="range" id="spriteFPS" min="1" max="20" value="6" style="width:100%; accent-color:#f43f5e;" />
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="spriteOnionCheck" checked style="accent-color:#f43f5e;" />
            <label style="font-size:11px; color:#94a3b8; cursor:pointer;" for="spriteOnionCheck">${tx.onion}</label>
          </div>
        </div>

        <!-- Predefined Animation Presets -->
        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(244,63,94,0.25); border-radius:10px; padding:12px; margin-bottom:15px;">
          <h4 style="margin:0 0 8px; font-size:11px; text-transform:uppercase; color:#f43f5e; letter-spacing:0.5px;">${tx.presets}</h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <button onclick="window._gdsApplySpritePreset('heart')" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; padding:6px; cursor:pointer; font-size:10px;">❤️ Pulsing Heart</button>
            <button onclick="window._gdsApplySpritePreset('alien')" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; padding:6px; cursor:pointer; font-size:10px;">👾 Alien Invader</button>
          </div>
        </div>

        <button id="btnInjectSprite" style="width:100%; padding:11px; border-radius:8px; background:#f43f5e; border:none; color:#ffffff; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(244, 63, 94, 0.3); transition:all 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const gridContainer = document.getElementById('spriteGridContainer');
    const onionCheck = document.getElementById('spriteOnionCheck');
    const customColor = document.getElementById('spriteCustomColor');
    const playBtn = document.getElementById('btnPlaySprite');
    const fpsInput = document.getElementById('spriteFPS');
    const fpsVal = document.getElementById('fpsVal');

    // Select color
    window._gdsSelectSpriteColor = function(color) {
      curColor = color;
      window.handleGDSProTool('spriteani');
    };

    // Handle custom color
    customColor.addEventListener('input', () => {
      curColor = customColor.value;
    });

    // Select Frame
    window._gdsSelectSpriteFrame = function(idx) {
      activeFrame = idx;
      window.handleGDSProTool('spriteani');
    };

    // Add Frame
    window._gdsAddSpriteFrame = function() {
      spriteFrames.push(new Array(256).fill('transparent'));
      activeFrame = spriteFrames.length - 1;
      window.handleGDSProTool('spriteani');
    };

    // Delete Frame
    window._gdsDeleteSpriteFrameTab = function() {
      if (spriteFrames.length <= 1) return;
      spriteFrames.splice(activeFrame, 1);
      activeFrame = Math.max(0, activeFrame - 1);
      window.handleGDSProTool('spriteani');
    };

    // Render interactive grid pixels
    function buildGridPixels() {
      if (!gridContainer) return;
      gridContainer.innerHTML = '';

      const currentFramePixels = spriteFrames[activeFrame];
      const previousFramePixels = activeFrame > 0 ? spriteFrames[activeFrame - 1] : null;

      for (let i = 0; i < 256; i++) {
        const pixel = document.createElement('div');
        pixel.style.width = '100%';
        pixel.style.height = '100%';
        pixel.style.border = '1px solid rgba(255,255,255,0.03)';
        pixel.style.boxSizing = 'border-box';
        pixel.style.cursor = 'pointer';

        // Draw current pixel color
        const color = currentFramePixels[i];
        pixel.style.background = color === 'transparent' ? 'transparent' : color;

        // Draw onion skin overlay if transparent
        if (color === 'transparent' && showOnion && previousFramePixels && previousFramePixels[i] !== 'transparent') {
          pixel.style.background = previousFramePixels[i];
          pixel.style.opacity = '0.3';
        }

        // Draw action on click or drag
        pixel.addEventListener('mousedown', () => {
          currentFramePixels[i] = curColor;
          pixel.style.background = curColor === 'transparent' ? 'transparent' : curColor;
          pixel.style.opacity = '1';
          updatePreviewThumb();
        });

        // Mouse over painting while holding click simulator
        pixel.addEventListener('mouseenter', (e) => {
          if (e.buttons === 1) {
            currentFramePixels[i] = curColor;
            pixel.style.background = curColor === 'transparent' ? 'transparent' : curColor;
            pixel.style.opacity = '1';
            updatePreviewThumb();
          }
        });

        gridContainer.appendChild(pixel);
      }
    }

    // Render loop preview thumbnail
    let thumbLoopIndex = 0;
    function updatePreviewThumb() {
      const thumb = document.getElementById('spritePreviewThumb');
      if (!thumb) return;

      const scale = 2; // scale for thumbnail shadow rendering
      const bs = [];

      const framePixels = spriteFrames[isPlaying ? thumbLoopIndex : activeFrame];

      for (let i = 0; i < 256; i++) {
        const color = framePixels[i];
        if (color && color !== 'transparent') {
          const x = (i % 16) * scale;
          const y = Math.floor(i / 16) * scale;
          bs.push(`${x}px ${y}px 0 ${color}`);
        }
      }

      thumb.innerHTML = `<div style="width:${scale}px; height:${scale}px; background:transparent; box-shadow:${bs.join(',') || 'none'};"></div>`;
    }

    // Animation presets
    window._gdsApplySpritePreset = function(type) {
      if (type === 'heart') {
        spriteFrames = [
          new Array(256).fill('transparent'),
          new Array(256).fill('transparent')
        ];
        
        // Frame 1 (Small Heart)
        const f1 = spriteFrames[0];
        const heartSmallIdxs = [53, 54, 57, 58, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 101, 102, 103, 104, 105, 106, 118, 119, 120, 121, 135, 136];
        heartSmallIdxs.forEach(i => f1[i] = '#f43f5e');

        // Frame 2 (Large Heart)
        const f2 = spriteFrames[1];
        const heartLargeIdxs = [36, 37, 38, 41, 42, 43, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 132, 133, 134, 135, 136, 137, 138, 139, 140, 149, 150, 151, 152, 153, 154, 155, 166, 167, 168, 169, 183, 184];
        heartLargeIdxs.forEach(i => f2[i] = '#ef4444');

      } else if (type === 'alien') {
        spriteFrames = [
          new Array(256).fill('transparent'),
          new Array(256).fill('transparent')
        ];

        // Frame 1
        const f1 = spriteFrames[0];
        const alien1 = [36, 43, 53, 58, 68, 69, 70, 71, 72, 73, 74, 75, 83, 84, 86, 87, 88, 89, 91, 92, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 116, 118, 119, 120, 121, 123, 131, 133, 135, 136, 138, 140, 147, 149, 154, 156];
        alien1.forEach(i => f1[i] = '#10b981');

        // Frame 2
        const f2 = spriteFrames[1];
        const alien2 = [36, 43, 53, 58, 68, 69, 70, 71, 72, 73, 74, 75, 83, 84, 86, 87, 88, 89, 91, 92, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 117, 118, 119, 120, 121, 122, 132, 133, 134, 135, 136, 137, 138, 139, 148, 155];
        alien2.forEach(i => f2[i] = '#10b981');
      }

      window.handleGDSProTool('spriteani');
    };

    // Playing Animation loop
    function startPlayback() {
      if (isPlaying) {
        clearInterval(playInterval);
        isPlaying = false;
        playBtn.innerText = '▶️ Play Loop';
        updatePreviewThumb();
      } else {
        isPlaying = true;
        playBtn.innerText = '⏸️ Pause';
        const fps = parseInt(fpsInput.value) || 6;
        thumbLoopIndex = 0;
        
        playInterval = setInterval(() => {
          thumbLoopIndex = (thumbLoopIndex + 1) % spriteFrames.length;
          updatePreviewThumb();
        }, 1000 / fps);
      }
    }

    playBtn.addEventListener('click', startPlayback);
    
    fpsInput.addEventListener('input', () => {
      fpsVal.innerText = fpsInput.value;
      if (isPlaying) {
        // Restart loop with new interval
        clearInterval(playInterval);
        isPlaying = false;
        startPlayback();
      }
    });

    onionCheck.addEventListener('change', () => {
      showOnion = onionCheck.checked;
      buildGridPixels();
    });

    // Inject Sprite Code generator
    document.getElementById('btnInjectSprite').addEventListener('click', () => {
      const framesShadowArray = [];
      const scale = 2; // scale for exported css shadow

      spriteFrames.forEach((frame, fIdx) => {
        const bs = [];
        for (let i = 0; i < 256; i++) {
          const color = frame[i];
          if (color && color !== 'transparent') {
            const x = (i % 16) * scale;
            const y = Math.floor(i / 16) * scale;
            bs.push(`${x}px ${y}px 0 ${color}`);
          }
        }
        framesShadowArray.push(bs.join(',\n      ') || 'none');
      });

      const framePercent = Math.floor(100 / spriteFrames.length);
      let keyframes = `@keyframes playSpriteLoop {\n`;
      framesShadowArray.forEach((shadow, idx) => {
        const start = idx * framePercent;
        const end = (idx + 1) * framePercent - 0.01;
        keyframes += `  ${start}%, ${end}% {\n    box-shadow: \n      ${shadow};\n  }\n`;
      });
      keyframes += `  100% {\n    box-shadow: \n      ${framesShadowArray[0]};\n  }\n}`;

      const codeToInject = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${fr ? 'Sprite Animé CSS Pur' : 'Pure CSS Sprite Animation'}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #0b0f19;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: sans-serif;
    }
    .preview-box {
      width: 320px;
      height: 320px;
      background: #020617;
      border: 3px solid #f43f5e;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 35px rgba(244, 63, 94, 0.4);
    }
    
    /* Dynamic 16x16 Pixel Sprite Rendering via single CSS Box-Shadow! */
    .sprite-pro {
      width: ${scale}px;
      height: ${scale}px;
      background: transparent;
      image-rendering: pixelated;
      transform: scale(8); /* scale sprite easily! */
      animation: playSpriteLoop ${spriteFrames.length * 0.15}s steps(1) infinite;
    }

    ${keyframes}
  </style>
</head>
<body>

  <div class="preview-box">
    <div class="sprite-pro"></div>
  </div>

</body>
</html>`;
      window._injectGDSProCode(codeToInject);
    });

    buildGridPixels();
    updatePreviewThumb();
  }

  // ═══════════════════════════════════════════
  // ▶️ 5. INTEGRATED PREVIEW IFRAME & CONSOLE MONITOR
  // ═══════════════════════════════════════════
  const TEMPLATES = {
    platformer: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; background: #0b0f19; overflow: hidden; display:flex; justify-content:center; align-items:center; height:100vh; font-family:monospace;}
    canvas { background: #020617; border: 3px solid #00f0ff; border-radius: 8px; box-shadow: 0 0 20px #00f0ff88; }
  </style>
</head>
<body>
  <canvas id="game" width="300" height="200"></canvas>
  <script>
    console.log("🎮 Game initialized: Pro Platformer!");
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    const player = { x: 50, y: 120, vx: 0, vy: 0, size: 12, grounded: false };
    const gravity = 0.4;
    const speed = 2.5;
    const keys = {};

    const platforms = [
      { x: 0, y: 180, w: 300, h: 20 },
      { x: 80, y: 140, w: 60, h: 10 },
      { x: 170, y: 110, w: 60, h: 10 },
      { x: 30, y: 80, w: 60, h: 10 }
    ];

    window.addEventListener('keydown', e => { keys[e.code] = true; });
    window.addEventListener('keyup', e => { keys[e.code] = false; });

    function loop() {
      // Input
      if (keys['ArrowRight'] || keys['KeyD']) player.vx = speed;
      else if (keys['ArrowLeft'] || keys['KeyA']) player.vx = -speed;
      else player.vx = 0;

      if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && player.grounded) {
        player.vy = -6.5;
        player.grounded = false;
        console.log("🔊 Played Jump sound tone!");
      }

      // Physics
      player.vy += gravity;
      player.x += player.vx;
      player.y += player.vy;

      // Platform Collisions
      player.grounded = false;
      platforms.forEach(p => {
        if (player.x < p.x + p.w && player.x + player.size > p.x &&
            player.y + player.size > p.y && player.y + player.size - player.vy <= p.y) {
          player.y = p.y - player.size;
          player.vy = 0;
          player.grounded = true;
        }
      });

      // Clamp limits
      if(player.x < 0) player.x = 0;
      if(player.x > 300 - player.size) player.x = 300 - player.size;

      // Render
      ctx.fillStyle = '#020617';
      ctx.fillRect(0,0,300,200);

      // Draw Platforms
      ctx.fillStyle = '#1e293b';
      platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

      // Draw Player
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(player.x, player.y, player.size, player.size);

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`,

    space: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; background: #05050e; overflow: hidden; display:flex; justify-content:center; align-items:center; height:100vh; font-family:monospace; }
    canvas { background: #000; border: 3px solid #ff007f; border-radius: 8px; }
  </style>
</head>
<body>
  <canvas id="game" width="300" height="200"></canvas>
  <script>
    console.log("🚀 Space Shooter initialized!");
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    const player = { x: 140, y: 170, w: 20, h: 15 };
    const bullets = [];
    const enemies = [];
    let score = 0;

    window.addEventListener('keydown', e => {
      if(e.code === 'ArrowLeft' && player.x > 0) player.x -= 15;
      if(e.code === 'ArrowRight' && player.x < 280) player.x += 15;
      if(e.code === 'Space') {
        bullets.push({ x: player.x + 8, y: player.y, speed: -4 });
        console.log("💥 Laser Beam shoot triggered!");
      }
    });

    function spawnEnemy() {
      if(Math.random() < 0.05 && enemies.length < 5) {
        enemies.push({ x: Math.random() * 280, y: 0, speed: 1.2 });
      }
    }

    function loop() {
      spawnEnemy();

      // Update bullets
      for(let i=bullets.length-1; i>=0; i--) {
        bullets[i].y += bullets[i].speed;
        if(bullets[i].y < 0) bullets.splice(i, 1);
      }

      // Update enemies & collision
      for(let i=enemies.length-1; i>=0; i--) {
        const e = enemies[i];
        e.y += e.speed;
        if(e.y > 200) { enemies.splice(i, 1); continue; }

        // Bullet intersection
        bullets.forEach((b, bIdx) => {
          if(b.x > e.x && b.x < e.x + 20 && b.y > e.y && b.y < e.y + 15) {
            enemies.splice(i, 1);
            bullets.splice(bIdx, 1);
            score += 10;
            console.log("🎯 Asteroid destroyed! Score: " + score);
          }
        });
      }

      // Draw
      ctx.fillStyle = '#000';
      ctx.fillRect(0,0,300,200);

      // Player
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(player.x, player.y, player.w, player.h);

      // Bullets
      ctx.fillStyle = '#fef08a';
      bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 8));

      // Enemies
      ctx.fillStyle = '#38bdf8';
      enemies.forEach(e => ctx.fillRect(e.x, e.y, 20, 15));

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
  };

  function renderGamePreviewIframe(parent, backBtn, lang) {
    const fr = lang === 'fr';
    const tx = TX[lang].tools.gamepreview;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#0b0f19;">
        ${backBtn}
        
        <h3 style="color:#06b6d4; margin:0 0 5px; font-size:15px; font-weight:800;">▶️ ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Dynamic Live nested sandbox container -->
        <div style="background:#020617; border:2px solid #06b6d4; border-radius:12px; padding:15px; margin-bottom:15px; display:flex; flex-direction:column; gap:12px; box-shadow:0 0 20px rgba(6,182,212,0.25);">
          <div>
            <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:4px;">${tx.selectTemplate}</label>
            <select id="previewTemplateSelect" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="platformer" selected>Pro Platformer (Mini)</option>
              <option value="space">Retro Space Shooter (Mini)</option>
            </select>
          </div>

          <!-- Sandbox Iframe viewer -->
          <iframe id="gdsSandboxIframe" style="width:100%; height:160px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:#000;" srcdoc="" sandbox="allow-scripts allow-same-origin"></iframe>

          <button id="btnRunSandbox" style="width:100%; padding:9px; border-radius:6px; background:#06b6d4; border:none; color:#0b0f19; font-weight:800; font-size:11px; cursor:pointer;">
            ${tx.runBtn}
          </button>
        </div>

        <!-- Integrated Terminal Log monitor -->
        <h4 style="margin:0 0 8px; font-size:11px; text-transform:uppercase; color:#06b6d4; letter-spacing:0.5px;">${tx.terminal}</h4>
        <div style="background:#020617; border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px; margin-bottom:12px;">
          <div id="sandboxTerminalOutput" style="height:100px; overflow-y:auto; font-family:'JetBrains Mono', monospace; font-size:9px; color:#38bdf8; display:flex; flex-direction:column; gap:4px;">
            <div style="color:#64748b;">Terminal ready. Click Run to listen to console logs.</div>
          </div>
          <button id="btnClearSandboxLogs" style="margin-top:8px; background:rgba(255,255,255,0.05); color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px; font-size:9px; cursor:pointer; font-weight:bold;">
            ${tx.clearLog}
          </button>
        </div>
      </div>
    `;

    const select = document.getElementById('previewTemplateSelect');
    const iframe = document.getElementById('gdsSandboxIframe');
    const term = document.getElementById('sandboxTerminalOutput');
    const runBtn = document.getElementById('btnRunSandbox');
    const clearBtn = document.getElementById('btnClearSandboxLogs');

    function runActiveTemplate() {
      if (!iframe) return;
      term.innerHTML = `<div style="color:#64748b;">[System]: Sandbox context started.</div>`;
      
      const key = select.value;
      let rawHTML = TEMPLATES[key];

      // Insert custom console bridge scripting inside the sandboxed iframe so we can catch console.log outputs directly!
      const consoleOverrideScript = `
        <script>
          (function() {
            const orgLog = console.log;
            console.log = function(...args) {
              orgLog.apply(console, args);
              window.parent.postMessage({ type: 'gds_sandbox_log', msg: args.join(' ') }, '*');
            };
          })();
        <\/script>
      `;

      // Inject script inside <head> or <body>
      rawHTML = rawHTML.replace('<head>', '<head>' + consoleOverrideScript);
      
      iframe.srcdoc = rawHTML;
    }

    runBtn.addEventListener('click', runActiveTemplate);
    clearBtn.addEventListener('click', () => {
      term.innerHTML = `<div style="color:#64748b;">Terminal cleared.</div>`;
    });

    // Listen to messages from sandbox iframe
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'gds_sandbox_log') {
        const row = document.createElement('div');
        row.style.color = '#34d399'; // green for log lines
        
        // Highlight specific words
        const msg = e.data.msg;
        if (msg.includes('destroyed') || msg.includes('destroyed') || msg.includes('destroyed')) {
          row.style.color = '#f59e0b'; // warning orange
        }
        
        row.innerText = `> ${msg}`;
        term.appendChild(row);
        term.scrollTop = term.scrollHeight;
      }
    });

    // Run initially
    runActiveTemplate();
  }

  // Inject initial CSS animations for Card Battles
  const cardAnimStyle = document.createElement('style');
  cardAnimStyle.innerHTML = `
    @keyframes playCardAnim {
      from { transform: translateY(30px) scale(0.8); opacity: 0; }
      to { transform: translateY(0px) scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(cardAnimStyle);

  // Hook localization switcher for GDS Pro in the ecosystem
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') {
      originalApplyLang();
    }
    const currentLang = gl();
    
    // Update button text in the sidebar if available
    const sideLbl = document.getElementById('lbl-tab-gamedevstudiopro');
    if (sideLbl) {
      sideLbl.textContent = currentLang === 'fr' ? 'Game Dev Pro' : 'Game Dev Pro';
    }

    if (window.activeTab === 'gamedevstudiopro') {
      window.initGDSPro(currentLang);
    }
  };

  console.log('🎮 Game Dev Studio PRO loaded successfully!');
})();
