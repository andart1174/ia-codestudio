(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // 🌌 GAME DEV STUDIO ULTRA — APEX MULTI-TOOL
  // ═══════════════════════════════════════════

  const TX = {
    en: {
      title: 'GAME DEV ULTRA',
      sub: 'Apex Chiptune, Shaders & Effects Studio',
      back: '← Back',
      inject: '➕ Inject Code to Monaco',
      injected: '✅ Code Injected into Monaco!',
      tools: {
        particle: {
          name: 'Particle FX Forge',
          desc: 'Design real-time physics particle systems.',
          count: 'Particle Count',
          speed: 'Emission Speed',
          life: 'Particle Lifespan',
          gravity: 'Gravity Force',
          color: 'Particle Hue',
          size: 'Particle Radius',
          injectBtn: 'Inject Particle FX Engine'
        },
        shader: {
          name: 'Retro Shader & Glitch Lab',
          desc: 'CRT scanline, curvature, and VHS noise post-processing.',
          curvature: 'CRT Curvature',
          scanlines: 'Scanline Density',
          noise: 'VHS Noise Grain',
          glitch: 'Glitch Intensity',
          injectBtn: 'Inject CRT retro wrapper CSS/HTML'
        },
        quest: {
          name: 'Quest Narrative Flow Editor',
          desc: 'Visual node tree for branching quest lines and dialogues.',
          addDialogue: '＋ Dialogue Node',
          addChoice: '＋ Choice Node',
          addEnd: '＋ End Node',
          nodeName: 'Node Title',
          nodeText: 'Dialogue Text',
          nodeNext: 'Next Node ID',
          injectBtn: 'Inject Branching Dialogue Quest Engine'
        },
        synth: {
          name: '8-Bit Step Sequencer',
          desc: 'Matrice Step tracker chiptune composer loop.',
          bpm: 'BPM Tempo Speed',
          instrument: 'Waveform Instrument Synth',
          play: '▶️ Play Loop',
          stop: '⏹️ Stop Playback',
          injectBtn: 'Inject Web Audio API Chiptune Music Loop'
        },
        raycaster: {
          name: '3D Raycaster Engine',
          desc: 'Real-time pseudo-3D raycasting map sandbox.',
          fov: 'Field of View (FOV)',
          hue: 'Wall Color Hue',
          controls: 'Movement Controls',
          injectBtn: 'Inject 3D Raycaster Engine'
        },
        spriteanim: {
          name: 'CSS Pixel Art Animator',
          desc: 'Design pixel sprite sheets animated via pure CSS box-shadows.',
          frame: 'Frame',
          add: '＋ Add Frame',
          delete: '✕ Delete Frame',
          clear: '🧹 Clear Frame',
          speed: 'Animation Speed (FPS)',
          play: '▶️ Play Animation',
          stop: '⏹️ Stop Playback',
          injectBtn: 'Inject Pure CSS Animated Sprite'
        },
        sfxr: {
          name: 'Procedural Sound FX Studio',
          desc: 'Synthesize chiptune sound effects procedurally.',
          wave: 'Synth Waveform',
          freq: 'Start Frequency (Hz)',
          decay: 'Decay Envelope (s)',
          slide: 'Frequency Slide Pitch',
          noise: 'Noise Generator Mix',
          play: '🔊 Play Sound',
          injectBtn: 'Inject Web Audio API sound FX'
        },
        rigidbody: {
          name: 'Rigidbody Physics Maker',
          desc: 'Design 2D physics environments with dynamic rigid bodies.',
          spawnType: 'Spawn Object Shape',
          ball: '🟢 Dynamic Ball',
          box: '🟧 Static Platform',
          gravity: 'Gravity Force',
          elastic: 'Bounciness Restitution',
          clear: '🧹 Clear Sandbox',
          play: '▶️ Start Physics',
          stop: '⏹️ Pause Simulation',
          injectBtn: 'Inject 2D Physics Engine'
        }
      }
    },
    fr: {
      title: 'GAME DEV ULTRA',
      sub: 'Studio Apex Chiptune, Shaders & Effets',
      back: '← Retour',
      inject: '➕ Injecter le Code dans Monaco',
      injected: '✅ Code Injecté dans Monaco !',
      tools: {
        particle: {
          name: 'Forge d\'Effets Particules',
          desc: 'Créez des systèmes de particules physiques en temps réel.',
          count: 'Nombre de Particules',
          speed: 'Vitesse de Lancement',
          life: 'Durée de Vie',
          gravity: 'Force de Gravité',
          color: 'Teinte (Hue)',
          size: 'Rayon des Particules',
          injectBtn: 'Injecter le Moteur de Particules'
        },
        shader: {
          name: 'Retro Shader & Lab Glitch',
          desc: 'Effet CRT courbé, scanlines et grain de bruit VHS.',
          curvature: 'Courbure CRT',
          scanlines: 'Opacité Scanlines',
          noise: 'Bruit VHS / Grain',
          glitch: 'Intensité de Glitch',
          injectBtn: 'Injecter Style CRT Retro'
        },
        quest: {
          name: 'Éditeur Narration & Quêtes',
          desc: 'Arbre de nœuds pour dialogues ramifiés et quêtes.',
          addDialogue: '＋ Nœud Dialogue',
          addChoice: '＋ Nœud Choix',
          addEnd: '＋ Nœud Fin',
          nodeName: 'Titre Nœud',
          nodeText: 'Texte Dialogue',
          nodeNext: 'ID Nœud Suivant',
          injectBtn: 'Injecter Moteur Narration Quêtes'
        },
        synth: {
          name: 'Séquenceur Step 8-Bit',
          desc: 'Compositeur step tracker chiptune 8x16 notes.',
          bpm: 'Tempo BPM',
          instrument: 'Forme d\'Onde Synth',
          play: '▶️ Lancer la Boucle',
          stop: '⏹️ Arrêter',
          injectBtn: 'Injecter Boucle Web Audio API Chiptune'
        },
        raycaster: {
          name: 'Moteur Raycaster 3D',
          desc: 'Sandbox de carte 3D interactive style rétro.',
          fov: 'Champ Visuel (FOV)',
          hue: 'Teinte de Mur (HSL)',
          controls: 'Contrôles de Mouvement',
          injectBtn: 'Injecter le Moteur Raycaster 3D'
        },
        spriteanim: {
          name: 'Animateur Sprite Pixel Art',
          desc: 'Créez des sprites pixel animés via CSS box-shadow.',
          frame: 'Cadre',
          add: '＋ Ajouter Cadre',
          delete: '✕ Supprimer Cadre',
          clear: '🧹 Effacer Cadre',
          speed: 'Vitesse d\'Animation (FPS)',
          play: '▶️ Lancer l\'Animation',
          stop: '⏹️ Arrêter',
          injectBtn: 'Injecter le Sprite Animé CSS Pur'
        },
        sfxr: {
          name: 'Studio Son FX Procédural',
          desc: 'Synthétisez des effets sonores chiptune de manière procédurale.',
          wave: 'Forme d\'Onde',
          freq: 'Fréquence de Départ (Hz)',
          decay: 'Enveloppe de Déclin (s)',
          slide: 'Glissement de Fréquence',
          noise: 'Mélange Générateur Bruit',
          play: '🔊 Jouer le Son',
          injectBtn: 'Injecter Son Procédural Web Audio'
        },
        rigidbody: {
          name: 'Simulateur Physique 2D',
          desc: 'Créez des environnements physiques 2D avec corps rigides.',
          spawnType: 'Objet à Créer',
          ball: '🟢 Balle Dynamique',
          box: '🟧 Plateforme Statique',
          gravity: 'Gravité Terrestre',
          elastic: 'Rebondissement (Restitution)',
          clear: '🧹 Réinitialiser',
          play: '▶️ Lancer Physique',
          stop: '⏹️ Suspendre',
          injectBtn: 'Injecter le Moteur Physique 2D'
        }
      }
    }
  };

  function gl() {
    return window.appLang || 'en';
  }

  function t(tool, key) {
    const lang = gl();
    return TX[lang] && TX[lang].tools[tool] && TX[lang].tools[tool][key]
      ? TX[lang].tools[tool][key]
      : (TX['en'].tools[tool] ? TX['en'].tools[tool][key] : key);
  }

  function showBannerToast(msg) {
    if (window.showToast) window.showToast(msg);
  }

  window._injectGDSUltraCode = function(code) {
    if (window.editor) {
      window.editor.setValue(code);
      if (window.runPreview) window.runPreview();
      showBannerToast(TX[gl()].injected);
    }
  };

  // ─── Tab Registration ──────────────────────────────────────────
  const originalRenderTab = window.renderTab;
  window.renderTab = function(tab) {
    if (tab === 'gamedevstudioultra') {
      window.activeTab = 'gamedevstudioultra';
      document.querySelectorAll('.ltab').forEach(function(b) {
        b.classList.remove('active');
      });
      const btn = document.getElementById('tab-gamedevstudioultra');
      if (btn) btn.classList.add('active');
      window.initGDSUltra(gl());
      return;
    }
    if (typeof originalRenderTab === 'function') {
      originalRenderTab(tab);
    }
  };

  // ─── Language Sync Switcher ────────────────────────────────────
  const originalApplyLang = window.applyLang;
  window.applyLang = function() {
    if (typeof originalApplyLang === 'function') originalApplyLang();
    const currentLang = gl();
    const sideLbl = document.getElementById('lbl-tab-gamedevstudioultra');
    if (sideLbl) sideLbl.textContent = currentLang === 'fr' ? 'Game Dev Ultra' : 'Game Dev Ultra';
    if (window.activeTab === 'gamedevstudioultra') window.initGDSUltra(currentLang);
  };

  // ─── Main Menu ──────────────────────────────────────────────────
  window.initGDSUltra = function(lang) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const activeTx = TX[lang] || TX['en'];

    // Clean any running local sequencers if switching tab view
    if (window._ultraSequencerTimer) {
      clearInterval(window._ultraSequencerTimer);
      window._ultraSequencerTimer = null;
    }

    el.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; overflow-y:auto; height:100%; box-sizing:border-box; background:#05070c; color:#f8fafc;">
        <!-- Title Banner -->
        <div style="background:linear-gradient(135deg, rgba(168,85,247,0.18), rgba(244,63,94,0.18)); border-radius:14px; padding:16px; border:1px solid rgba(168,85,247,0.35); margin-bottom:20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.55);">
          <span style="font-size:32px; filter:drop-shadow(0 0 8px #c084fc);">🌌</span>
          <div>
            <h2 style="margin:0; color:#c084fc; font-size:16px; font-weight:900; letter-spacing:0.5px; text-shadow:0 0 10px rgba(168,85,247,0.3);">${activeTx.title}</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:11px; font-weight:500;">${activeTx.sub}</p>
          </div>
        </div>

        <!-- Selection List -->
        <div style="display:grid; grid-template-columns:1fr; gap:10px;">
          <!-- 1. Particle FX Forge -->
          <div onclick="window.handleGDSUltraTool('particle')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(251, 146, 60, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 15px rgba(251, 146, 60, 0.25)';" onmouseout="this.style.borderColor='rgba(251, 146, 60, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(251, 146, 60, 0.1); border-radius:10px; color:#f97316;">🎇</div>
            <div style="flex:1;">
              <div style="color:#f97316; font-weight:800; font-size:13px;">${t('particle', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('particle', 'desc')}</div>
            </div>
          </div>

          <!-- 2. Retro Shader Lab -->
          <div onclick="window.handleGDSUltraTool('shader')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(244, 63, 94, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#f43f5e'; this.style.boxShadow='0 0 15px rgba(244, 63, 94, 0.25)';" onmouseout="this.style.borderColor='rgba(244, 63, 94, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(244, 63, 94, 0.1); border-radius:10px; color:#f43f5e;">📺</div>
            <div style="flex:1;">
              <div style="color:#f43f5e; font-weight:800; font-size:13px;">${t('shader', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('shader', 'desc')}</div>
            </div>
          </div>

          <!-- 3. Quest Dialogue Flow Editor -->
          <div onclick="window.handleGDSUltraTool('quest')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(168, 85, 247, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#a855f7'; this.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.25)';" onmouseout="this.style.borderColor='rgba(168, 85, 247, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(168, 85, 247, 0.1); border-radius:10px; color:#a855f7;">🗺️</div>
            <div style="flex:1;">
              <div style="color:#a855f7; font-weight:800; font-size:13px;">${t('quest', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('quest', 'desc')}</div>
            </div>
          </div>

          <!-- 4. 8-Bit Step Sequencer -->
          <div onclick="window.handleGDSUltraTool('synth')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(16, 185, 129, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.25)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">🎵</div>
            <div style="flex:1;">
              <div style="color:#10b981; font-weight:800; font-size:13px;">${t('synth', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('synth', 'desc')}</div>
            </div>
          </div>

          <!-- 5. 3D Raycaster Engine -->
          <div onclick="window.handleGDSUltraTool('raycaster')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(6, 182, 212, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#06b6d4'; this.style.boxShadow='0 0 15px rgba(6, 182, 212, 0.25)';" onmouseout="this.style.borderColor='rgba(6, 182, 212, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(6, 182, 212, 0.1); border-radius:10px; color:#06b6d4;">🔦</div>
            <div style="flex:1;">
              <div style="color:#06b6d4; font-weight:800; font-size:13px;">${t('raycaster', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('raycaster', 'desc')}</div>
            </div>
          </div>

          <!-- 6. Pixel Art CSS Animator -->
          <div onclick="window.handleGDSUltraTool('spriteanim')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(236, 72, 153, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#ec4899'; this.style.boxShadow='0 0 15px rgba(236, 72, 153, 0.25)';" onmouseout="this.style.borderColor='rgba(236, 72, 153, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(236, 72, 153, 0.1); border-radius:10px; color:#ec4899;">🎨</div>
            <div style="flex:1;">
              <div style="color:#ec4899; font-weight:800; font-size:13px;">${t('spriteanim', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('spriteanim', 'desc')}</div>
            </div>
          </div>

          <!-- 7. Procedural Sound FX Studio -->
          <div onclick="window.handleGDSUltraTool('sfxr')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(234, 179, 8, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#eab308'; this.style.boxShadow='0 0 15px rgba(234, 179, 8, 0.25)';" onmouseout="this.style.borderColor='rgba(234, 179, 8, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(234, 179, 8, 0.1); border-radius:10px; color:#eab308;">🔊</div>
            <div style="flex:1;">
              <div style="color:#eab308; font-weight:800; font-size:13px;">${t('sfxr', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('sfxr', 'desc')}</div>
            </div>
          </div>

          <!-- 8. Rigidbody Physics Maker -->
          <div onclick="window.handleGDSUltraTool('rigidbody')" style="background:rgba(15, 23, 42, 0.65); border:1px solid rgba(16, 185, 129, 0.25); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;" onmouseover="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 15px rgba(16, 185, 129, 0.25)';" onmouseout="this.style.borderColor='rgba(16, 185, 129, 0.25)'; this.style.boxShadow='none';">
            <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(16, 185, 129, 0.1); border-radius:10px; color:#10b981;">🕹️</div>
            <div style="flex:1;">
              <div style="color:#10b981; font-weight:800; font-size:13px;">${t('rigidbody', 'name')}</div>
              <div style="color:#64748b; font-size:10px; margin-top:3px;">${t('rigidbody', 'desc')}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ─── Router Sub-Tools ──────────────────────────────────────────
  window.handleGDSUltraTool = function(toolId) {
    const el = document.getElementById('left-body');
    if (!el) return;
    const lang = gl();
    const activeTx = TX[lang] || TX['en'];

    const backBtn = `
      <button onclick="window.initGDSUltra('${lang}')" style="background:rgba(255,255,255,0.08); color:#e2e8f0; border:1px solid rgba(255,255,255,0.15); padding:8px 14px; border-radius:8px; cursor:pointer; margin-bottom:15px; font-size:11px; font-weight:700; transition:all 0.2s; display:flex; align-items:center; gap:6px;" onmouseover="this.style.background='rgba(255,255,255,0.12)';" onmouseout="this.style.background='rgba(255,255,255,0.08)';">
        ${activeTx.back}
      </button>
    `;

    if (toolId === 'particle') renderParticleForge(el, backBtn, lang);
    else if (toolId === 'shader') renderRetroShaderLab(el, backBtn, lang);
    else if (toolId === 'quest') renderQuestEditor(el, backBtn, lang);
    else if (toolId === 'synth') renderStepSequencer(el, backBtn, lang);
    else if (toolId === 'raycaster') renderRaycaster(el, backBtn, lang);
    else if (toolId === 'spriteanim') renderSpriteAnimator(el, backBtn, lang);
    else if (toolId === 'sfxr') renderSfxrStudio(el, backBtn, lang);
    else if (toolId === 'rigidbody') renderRigidbody(el, backBtn, lang);
  };

  // ═══════════════════════════════════════════
  // 🎇 1. PARTICLE FX FORGE
  // ═══════════════════════════════════════════
  function renderParticleForge(parent, backBtn, lang) {
    const tx = TX[lang].tools.particle;
    
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#f97316; margin:0 0 5px; font-size:15px; font-weight:800;">🎇 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Live Visualizing Canvas Panel -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(251, 146, 60, 0.25); display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:15px;">
          <canvas id="pfxPreview" width="280" height="150" style="background:#000; border-radius:8px; border:2px solid #1e293b; cursor:crosshair; width:100%; max-width:280px;"></canvas>
          
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.count}</span>
              <span id="lblPfxCount" style="color:#f97316; font-weight:bold;">100</span>
            </div>
            <input type="range" id="valPfxCount" min="20" max="250" value="100" style="width:100%; accent-color:#f97316;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.speed}</span>
              <span id="lblPfxSpeed" style="color:#f97316; font-weight:bold;">4</span>
            </div>
            <input type="range" id="valPfxSpeed" min="1" max="10" value="4" style="width:100%; accent-color:#f97316;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.life} (ms)</span>
              <span id="lblPfxLife" style="color:#f97316; font-weight:bold;">1200</span>
            </div>
            <input type="range" id="valPfxLife" min="300" max="2000" step="50" value="1200" style="width:100%; accent-color:#f97316;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.gravity}</span>
              <span id="lblPfxGravity" style="color:#f97316; font-weight:bold;">0.1</span>
            </div>
            <input type="range" id="valPfxGravity" min="-0.3" max="0.5" step="0.05" value="0.1" style="width:100%; accent-color:#f97316;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.color} (Hue)</span>
              <span id="lblPfxColor" style="color:#f97316; font-weight:bold;">30°</span>
            </div>
            <input type="range" id="valPfxColor" min="0" max="360" value="30" style="width:100%; accent-color:#f97316;" />
          </div>
        </div>

        <button id="btnInjectPfx" style="width:100%; padding:11px; border-radius:8px; background:#f97316; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(249, 115, 22, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Local physics simulation
    const canvas = document.getElementById('pfxPreview');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let emitX = canvas.width / 2;
    let emitY = canvas.height / 2;
    
    // Sliders elements
    const sCount = document.getElementById('valPfxCount');
    const sSpeed = document.getElementById('valPfxSpeed');
    const sLife = document.getElementById('valPfxLife');
    const sGravity = document.getElementById('valPfxGravity');
    const sColor = document.getElementById('valPfxColor');

    canvas.addEventListener('mousedown', (e) => {
      const r = canvas.getBoundingClientRect();
      emitX = e.clientX - r.left;
      emitY = e.clientY - r.top;
    });

    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * parseFloat(sSpeed.value);
      particles.push({
        x: emitX,
        y: emitY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // slight up bias
        hue: parseInt(sColor.value) + (Math.random() * 30 - 15),
        life: 0,
        maxLife: parseInt(sLife.value) / 16.6 // convert ms to frames
      });
    }

    let active = true;
    function loop() {
      if (!active) return;
      requestAnimationFrame(loop);
      
      // Update labels
      document.getElementById('lblPfxCount').innerText = sCount.value;
      document.getElementById('lblPfxSpeed').innerText = sSpeed.value;
      document.getElementById('lblPfxLife').innerText = sLife.value;
      document.getElementById('lblPfxGravity').innerText = sGravity.value;
      document.getElementById('lblPfxColor').innerText = sColor.value + '°';

      // Clear & Draw background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Emit continuous particles
      if (particles.length < parseInt(sCount.value)) {
        spawnParticle();
      }

      // Update & render particles
      const gravity = parseFloat(sGravity.value);
      particles.forEach((p, idx) => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - (p.life / p.maxLife);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 4 * alpha), 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.x < 0 || p.x > canvas.width || p.y > canvas.height) {
          particles.splice(idx, 1);
        }
      });
    }
    
    // Start local loop
    loop();

    // Clean loop on navigation or tab exit
    const originalInitGDSUltra = window.initGDSUltra;
    window.initGDSUltra = function(lang) {
      active = false;
      originalInitGDSUltra(lang);
    };

    document.getElementById('btnInjectPfx').addEventListener('click', () => {
      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Real-time Particle Sandbox</title>
  <style>
    body { margin: 0; background: #08070d; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; font-family: sans-serif; box-sizing: border-box; padding: 10px; }
    canvas { background: #000; border: 3px solid #f97316; border-radius: 12px; box-shadow: 0 0 40px rgba(249, 115, 22, 0.4); max-width: 100%; max-height: calc(100vh - 80px); height: auto; width: auto; aspect-ratio: 4/3; }
    .hud { position: absolute; top: 15px; color: #94a3b8; font-family: monospace; font-size: 13px; text-align:center; pointer-events: none;}
  </style>
</head>
<body>
  <div class="hud">🎇 Particle FX Engine Active<br><span style="color:#f97316;">Click screen to position Emitter</span></div>
  <canvas id="pfxCanvas" width="800" height="600"></canvas>

  <script>
    (function() {
      const canvas = document.getElementById('pfxCanvas');
      const ctx = canvas.getContext('2d');

      let particles = [];
      let emitX = canvas.width / 2;
      let emitY = canvas.height / 2;

      // Injected static configurations
      const maxCount = ${sCount.value};
      const speedParam = ${sSpeed.value};
      const maxLifeParam = ${sLife.value};
      const gravityVal = ${sGravity.value};
      const baseHue = ${sColor.value};

      canvas.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        emitX = ((e.clientX - r.left) / r.width) * canvas.width;
        emitY = ((e.clientY - r.top) / r.height) * canvas.height;
      });

      function spawn() {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * speedParam;
        particles.push({
          x: emitX,
          y: emitY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.5,
          hue: baseHue + (Math.random() * 40 - 20),
          life: 0,
          maxLife: maxLifeParam / 16.6
        });
      }

      function update() {
        if (particles.length < maxCount) spawn();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Trail effect!
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, idx) => {
          p.vy += gravityVal;
          p.x += p.vx;
          p.y += p.vy;
          p.life++;

          const ageRatio = 1 - (p.life / p.maxLife);
          ctx.fillStyle = "hsla(" + p.hue + ", 100%, 60%, " + ageRatio + ")";
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, 5 * ageRatio), 0, Math.PI * 2);
          ctx.fill();

          if (p.life >= p.maxLife) {
            particles.splice(idx, 1);
          }
        });
      }

      function loop() {
        update();
        requestAnimationFrame(loop);
      }
      loop();
    })();
  </script>
</body>
</html>`;
      window._injectGDSUltraCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // 📺 2. RETRO SHADER & GLITCH LAB
  // ═══════════════════════════════════════════
  function renderRetroShaderLab(parent, backBtn, lang) {
    const tx = TX[lang].tools.shader;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#f43f5e; margin:0 0 5px; font-size:15px; font-weight:800;">📺 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Simulated CRT Preview Sandbox Screen -->
        <div style="background:#020204; border-radius:12px; padding:15px; border:1px solid rgba(244, 63, 94, 0.25); display:flex; flex-direction:column; align-items:center; margin-bottom:15px; box-shadow:0 0 20px rgba(244, 63, 94, 0.15);">
          <!-- CRT Screen Frame -->
          <div id="crtScreen" style="position:relative; width:220px; height:140px; background:#0a192f; border:6px solid #1e293b; border-radius:12px; overflow:hidden; display:flex; align-items:center; justify-content:center; text-shadow: 0 0 8px rgba(244,63,94,0.8); transition:all 0.2s;">
            <!-- Scanlines Layer overlay -->
            <div id="crtScanlines" style="position:absolute; inset:0; background:linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%); background-size:100% 4px; pointer-events:none; z-index:2;"></div>
            
            <!-- Noise grain overlay -->
            <div id="crtNoise" style="position:absolute; inset:0; pointer-events:none; opacity:0.1; background-image:url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E'); z-index:3;"></div>
            
            <!-- Text display inside CRT -->
            <div id="crtScreenText" style="font-family:'Courier New', monospace; font-size:16px; font-weight:bold; color:#fda4af; text-align:center; z-index:1; line-height:1.4;">
              RETRO SYS v5.0<br/>
              ONLINE RUNNING
            </div>
          </div>

          <div style="width:100%; margin-top:15px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.curvature}</span>
              <span id="lblCrtCurv" style="color:#f43f5e; font-weight:bold;">1.05</span>
            </div>
            <input type="range" id="valCrtCurv" min="1.00" max="1.15" step="0.01" value="1.05" style="width:100%; accent-color:#f43f5e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.scanlines}</span>
              <span id="lblCrtScan" style="color:#f43f5e; font-weight:bold;">35%</span>
            </div>
            <input type="range" id="valCrtScan" min="0" max="80" value="35" style="width:100%; accent-color:#f43f5e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.noise}</span>
              <span id="lblCrtNoise" style="color:#f43f5e; font-weight:bold;">15%</span>
            </div>
            <input type="range" id="valCrtNoise" min="0" max="60" value="15" style="width:100%; accent-color:#f43f5e;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.glitch}</span>
              <span id="lblCrtGlitch" style="color:#f43f5e; font-weight:bold;">5px</span>
            </div>
            <input type="range" id="valCrtGlitch" min="0" max="20" value="5" style="width:100%; accent-color:#f43f5e;" />
          </div>
        </div>

        <button id="btnInjectShader" style="width:100%; padding:11px; border-radius:8px; background:#f43f5e; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(244, 63, 148, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const crtScreen = document.getElementById('crtScreen');
    const crtScanlines = document.getElementById('crtScanlines');
    const crtNoise = document.getElementById('crtNoise');
    const textEl = document.getElementById('crtScreenText');

    const sCurv = document.getElementById('valCrtCurv');
    const sScan = document.getElementById('valCrtScan');
    const sNoise = document.getElementById('valCrtNoise');
    const sGlitch = document.getElementById('valCrtGlitch');

    let glitchInterval = setInterval(() => {
      // Simulate random retro sync text glitch
      const glitchVal = parseFloat(sGlitch.value);
      if (glitchVal > 0 && Math.random() < 0.35) {
        const offset = (Math.random() * glitchVal - (glitchVal/2));
        textEl.style.transform = `skewX(${offset}deg) translateX(${offset}px)`;
        crtScreen.style.filter = `hue-rotate(${Math.random()*45}deg) brightness(${1 + Math.random()*0.3})`;
        setTimeout(() => {
          textEl.style.transform = 'none';
          crtScreen.style.filter = 'none';
        }, 100);
      }
    }, 400);

    function updateCRTStyle() {
      // Manage Curvature
      const c = sCurv.value;
      crtScreen.style.transform = `scale(${c})`;
      
      // Manage Scanline density
      const scanOpacity = sScan.value / 100;
      crtScanlines.style.background = `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, ${scanOpacity}) 50%)`;
      crtScanlines.style.backgroundSize = `100% 4px`;

      // Manage Noise grain opacity
      crtNoise.style.opacity = sNoise.value / 100;

      // Labels
      document.getElementById('lblCrtCurv').innerText = c;
      document.getElementById('lblCrtScan').innerText = sScan.value + '%';
      document.getElementById('lblCrtNoise').innerText = sNoise.value + '%';
      document.getElementById('lblCrtGlitch').innerText = sGlitch.value + 'px';
    }

    sCurv.addEventListener('input', updateCRTStyle);
    sScan.addEventListener('input', updateCRTStyle);
    sNoise.addEventListener('input', updateCRTStyle);
    sGlitch.addEventListener('input', updateCRTStyle);

    updateCRTStyle();

    // Clean interval
    const originalInitGDSUltra = window.initGDSUltra;
    window.initGDSUltra = function(lang) {
      clearInterval(glitchInterval);
      originalInitGDSUltra(lang);
    };

    document.getElementById('btnInjectShader').addEventListener('click', () => {
      const scanOpacity = sScan.value / 100;
      const noiseOpacity = sNoise.value / 100;
      const warpVal = sCurv.value;
      const glitchPower = sGlitch.value;

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Arcade Game Screen Filter</title>
  <style>
    body { margin: 0; background: #020205; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; font-family: monospace; box-sizing: border-box; padding: 20px; }
    
    /* CRT Glass screen wrapper container */
    .crt-wrapper {
      position: relative;
      width: 640px;
      height: 420px;
      max-width: 85vw;
      max-height: 75vh;
      border: 12px solid #1e293b;
      border-radius: 24px;
      overflow: hidden;
      background: #000;
      transform: scale(${warpVal});
      box-shadow: 0 0 40px rgba(244, 63, 94, 0.25), inset 0 0 60px rgba(0,0,0,0.9);
      animation: crtPowerOn 0.5s ease-out;
    }

    /* Scanline screen grid */
    .scanlines {
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, ${scanOpacity}) 50%);
      background-size: 100% 5px;
      pointer-events: none;
      z-index: 10;
    }

    /* Noise overlay filter */
    .noise {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: ${noiseOpacity};
      background-image: url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E');
      z-index: 11;
    }

    /* Screen warp / fish-eye distortion simulator */
    .screen-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(#15312c, #0a100d);
      color: #34d399;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 0 0 10px #34d399;
      animation: textGlitch 4s infinite;
      z-index: 1;
    }

    /* CRT Animations */
    @keyframes crtPowerOn {
      0% { transform: scaleY(0.01) scaleX(0); filter: brightness(3); }
      50% { transform: scaleY(0.01) scaleX(${warpVal}); }
      100% { transform: scale(${warpVal}); }
    }

    @keyframes textGlitch {
      0%, 95%, 100% { transform: none; filter: none; }
      96% { transform: skewX(${glitchPower}deg) translateX(${glitchPower / 2}px); filter: hue-rotate(90deg) contrast(1.5); }
      98% { transform: skewX(-${glitchPower}deg) translateX(-${glitchPower / 2}px); filter: brightness(2); }
    }
  </style>
</head>
<body>

  <div class="crt-wrapper">
    <div class="scanlines"></div>
    <div class="noise"></div>
    
    <div class="screen-content">
      <div>INSERT COIN</div>
      <div style="font-size: 14px; color: #fb7185; text-shadow: 0 0 8px #fb7185; margin-top: 15px;">PLAY SYSTEM v5.0 ACTIVE</div>
    </div>
  </div>

</body>
</html>`;
      window._injectGDSUltraCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // 🗺️ 3. QUEST NARRATIVE EDITOR
  // ═══════════════════════════════════════════
  let questNodes = [
    { id: 'start', type: 'dialogue', speaker: 'Villager', text: 'Please adventurer, save our farm!', next: 'choice_1' },
    { id: 'choice_1', type: 'choice', speaker: 'You', options: [
      { text: 'Sure, I will help!', next: 'help_accepted' },
      { text: 'No time, sorry.', next: 'help_denied' }
    ]},
    { id: 'help_accepted', type: 'dialogue', speaker: 'Villager', text: 'Thank you! Find the sword in the woods.', next: 'end' },
    { id: 'help_denied', type: 'end', speaker: 'You', text: 'You walk away cold.', next: '' }
  ];

  function renderQuestEditor(parent, backBtn, lang) {
    const tx = TX[lang].tools.quest;

    function buildQuestNodeListHTML() {
      return questNodes.map((n, idx) => {
        let optionsHTML = '';
        if (n.type === 'choice' && n.options) {
          optionsHTML = n.options.map((opt, oIdx) => `
            <div style="display:flex; gap:4px; margin-top:4px;">
              <input type="text" value="${opt.text}" style="background:#0f172a; color:#fff; border:1px solid #334155; border-radius:4px; font-size:10px; flex:1; padding:3px;" onchange="window._updateQuestChoiceText(${idx}, ${oIdx}, this.value)"/>
              <input type="text" value="${opt.next}" placeholder="Next ID" style="background:#0f172a; color:#a855f7; border:1px solid #334155; border-radius:4px; font-size:10px; width:65px; padding:3px;" onchange="window._updateQuestChoiceNext(${idx}, ${oIdx}, this.value)"/>
            </div>
          `).join('');
        }

        return `
          <div style="background:rgba(15, 23, 42, 0.7); border:1px solid rgba(168, 85, 247, 0.25); border-radius:10px; padding:12px; margin-bottom:10px; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-family:monospace; font-size:10px; color:#a855f7; font-weight:bold;">ID: ${n.id} [${n.type.toUpperCase()}]</span>
              <button onclick="window._deleteQuestNode('${n.id}')" style="background:none; border:none; color:#ef4444; font-size:12px; cursor:pointer;">✕</button>
            </div>

            <div style="display:flex; flex-direction:column; gap:6px;">
              <div>
                <label style="font-size:9px; color:#64748b; text-transform:uppercase;">${tx.nodeName}</label>
                <input type="text" value="${n.speaker}" style="width:100%; background:#0f172a; color:#fff; border:1px solid #334155; border-radius:6px; font-size:11px; padding:5px; box-sizing:border-box;" onchange="window._updateQuestSpeaker('${n.id}', this.value)"/>
              </div>

              ${n.type !== 'choice' ? `
                <div>
                  <label style="font-size:9px; color:#64748b; text-transform:uppercase;">${tx.nodeText}</label>
                  <textarea style="width:100%; height:40px; background:#0f172a; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; padding:5px; box-sizing:border-box; resize:none;" onchange="window._updateQuestText('${n.id}', this.value)">${n.text}</textarea>
                </div>
              ` : ''}

              ${n.type === 'dialogue' ? `
                <div>
                  <label style="font-size:9px; color:#64748b; text-transform:uppercase;">${tx.nodeNext}</label>
                  <input type="text" value="${n.next}" style="width:100%; background:#0f172a; color:#a855f7; border:1px solid #334155; border-radius:6px; font-size:11px; padding:5px; box-sizing:border-box;" onchange="window._updateQuestNext('${n.id}', this.value)"/>
                </div>
              ` : ''}

              ${n.type === 'choice' ? `
                <div style="margin-top:4px;">
                  <label style="font-size:9px; color:#64748b; text-transform:uppercase; display:block;">Options & Targets</label>
                  ${optionsHTML}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#a855f7; margin:0 0 5px; font-size:15px; font-weight:800;">🗺️ ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Node Creator Buttons -->
        <div style="display:flex; gap:6px; margin-bottom:12px; flex-wrap:wrap;">
          <button id="addDiagNode" style="background:rgba(168,85,247,0.15); border:1px solid #a855f7; border-radius:6px; color:#c084fc; font-size:10px; font-weight:bold; padding:6px 10px; cursor:pointer;">${tx.addDialogue}</button>
          <button id="addChoiceNode" style="background:rgba(59,130,246,0.15); border:1px solid #3b82f6; border-radius:6px; color:#60a5fa; font-size:10px; font-weight:bold; padding:6px 10px; cursor:pointer;">${tx.addChoice}</button>
          <button id="addEndNode" style="background:rgba(244,63,94,0.15); border:1px solid #f43f5e; border-radius:6px; color:#f43f5e; font-size:10px; font-weight:bold; padding:6px 10px; cursor:pointer;">${tx.addEnd}</button>
        </div>

        <!-- Node timeline flow -->
        <div id="questNodesContainer" style="max-height:360px; overflow-y:auto; padding-right:4px; margin-bottom:15px;">
          ${buildQuestNodeListHTML()}
        </div>

        <button id="btnInjectQuest" style="width:100%; padding:11px; border-radius:8px; background:#a855f7; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(168, 85, 247, 0.35);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Dynamic state modifiers hooked globally
    window._updateQuestSpeaker = (id, val) => {
      const n = questNodes.find(q => q.id === id);
      if (n) n.speaker = val;
    };
    window._updateQuestText = (id, val) => {
      const n = questNodes.find(q => q.id === id);
      if (n) n.text = val;
    };
    window._updateQuestNext = (id, val) => {
      const n = questNodes.find(q => q.id === id);
      if (n) n.next = val;
    };
    window._updateQuestChoiceText = (idx, oIdx, val) => {
      if (questNodes[idx] && questNodes[idx].options[oIdx]) {
        questNodes[idx].options[oIdx].text = val;
      }
    };
    window._updateQuestChoiceNext = (idx, oIdx, val) => {
      if (questNodes[idx] && questNodes[idx].options[oIdx]) {
        questNodes[idx].options[oIdx].next = val;
      }
    };
    window._deleteQuestNode = (id) => {
      questNodes = questNodes.filter(q => q.id !== id);
      document.getElementById('questNodesContainer').innerHTML = buildQuestNodeListHTML();
    };

    // Node creators
    document.getElementById('addDiagNode').addEventListener('click', () => {
      const id = 'dialogue_' + Date.now().toString().slice(-4);
      questNodes.push({ id, type: 'dialogue', speaker: 'NPC', text: 'Wait a second...', next: 'end' });
      document.getElementById('questNodesContainer').innerHTML = buildQuestNodeListHTML();
    });

    document.getElementById('addChoiceNode').addEventListener('click', () => {
      const id = 'choice_' + Date.now().toString().slice(-4);
      questNodes.push({ id, type: 'choice', speaker: 'You', options: [
        { text: 'Say Yes', next: 'end' },
        { text: 'Say No', next: 'end' }
      ]});
      document.getElementById('questNodesContainer').innerHTML = buildQuestNodeListHTML();
    });

    document.getElementById('addEndNode').addEventListener('click', () => {
      const id = 'end_' + Date.now().toString().slice(-4);
      questNodes.push({ id, type: 'end', speaker: 'NPC', text: 'Quest Finished.', next: '' });
      document.getElementById('questNodesContainer').innerHTML = buildQuestNodeListHTML();
    });

    // Code Injection logic
    document.getElementById('btnInjectQuest').addEventListener('click', () => {
      const dialogueTreeJson = JSON.stringify(questNodes, null, 2);

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Branching Dialogue Quest Engine</title>
  <style>
    body { margin: 0; background: #030712; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'Segoe UI', sans-serif; color: #fff; box-sizing: border-box; padding: 15px; }
    
    .dialogue-box {
      width: 500px;
      max-width: 100%;
      box-sizing: border-box;
      background: #111827;
      border: 2px solid #a855f7;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 40px rgba(168, 85, 247, 0.25);
    }
    
    .speaker-name {
      font-size: 14px;
      font-weight: 800;
      color: #c084fc;
      text-transform: uppercase;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    
    .dialogue-text {
      font-size: 16px;
      line-height: 1.6;
      min-height: 60px;
      margin-bottom: 20px;
    }
    
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .option-btn {
      background: #1f2937;
      border: 1px solid rgba(255,255,255,0.08);
      color: #cbd5e1;
      padding: 12px 18px;
      border-radius: 10px;
      text-align: left;
      font-size: 14px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .option-btn:hover {
      background: #a855f7;
      color: #000;
      border-color: #a855f7;
    }
  </style>
</head>
<body>

  <div class="dialogue-box">
    <div class="speaker-name" id="speaker">---</div>
    <div class="dialogue-text" id="text">Loading Quest...</div>
    <div class="options-container" id="options"></div>
  </div>

  <script>
    (function() {
      // Injected static branching nodes tree
      const questNodes = ${dialogueTreeJson};
      
      let currentNodeId = 'start';

      function showNode(id) {
        currentNodeId = id;
        const node = questNodes.find(n => n.id === id);
        if (!node) {
          document.getElementById('speaker').innerText = 'Game Over';
          document.getElementById('text').innerText = 'The conversation ended abruptly.';
          document.getElementById('options').innerHTML = '';
          return;
        }

        // Set Speaker & Text
        document.getElementById('speaker').innerText = node.speaker || 'System';
        document.getElementById('text').innerText = node.text || '';

        const optContainer = document.getElementById('options');
        optContainer.innerHTML = '';

        if (node.type === 'dialogue') {
          // Add default single advance button
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.innerText = 'Continue →';
          btn.onclick = () => showNode(node.next);
          optContainer.appendChild(btn);
        } else if (node.type === 'choice' && node.options) {
          // Render multiple choice branch buttons
          node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => showNode(opt.next);
            optContainer.appendChild(btn);
          });
        } else if (node.type === 'end') {
          // Add Restart button
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#ef4444';
          btn.innerText = 'Restart Conversation';
          btn.onclick = () => showNode('start');
          optContainer.appendChild(btn);
        }
      }

      // Initial run
      showNode('start');
    })();
  </script>
</body>
</html>`;
      window._injectGDSUltraCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // 🎵 4. 8-BIT STEP SEQUENCER
  // ═══════════════════════════════════════════
  let activeSeqCols = new Array(16).fill(null).map(() => new Array(8).fill(false));
  let isPlayingSeq = false;
  let seqAudioCtx = null;
  
  function renderStepSequencer(parent, backBtn, lang) {
    const tx = TX[lang].tools.synth;
    
    // Notes list mapping index to pitch frequency
    const notes = [
      { name: 'C5', freq: 523.25 },
      { name: 'B4', freq: 493.88 },
      { name: 'A4', freq: 440.00 },
      { name: 'G4', freq: 392.00 },
      { name: 'F4', freq: 349.23 },
      { name: 'E4', freq: 329.63 },
      { name: 'D4', freq: 293.66 },
      { name: 'C4', freq: 261.63 }
    ];

    function buildSequencerGridHTML() {
      let html = '<div style="display:grid; grid-template-columns: 35px repeat(16, 1fr); gap:3px;">';
      
      // Top header step numbers
      html += '<div></div>';
      for (let c = 0; c < 16; c++) {
        html += `<div style="font-size:8px; text-align:center; color:#64748b; font-weight:bold;">${c+1}</div>`;
      }

      // Grid Rows (from high pitch C5 to low pitch C4)
      for (let r = 0; r < 8; r++) {
        html += `<div style="font-size:9px; font-weight:bold; color:#10b981; display:flex; align-items:center; justify-content:center;">${notes[r].name}</div>`;
        for (let c = 0; c < 16; c++) {
          const active = activeSeqCols[c][r];
          const bg = active ? '#10b981' : 'rgba(255,255,255,0.04)';
          const border = active ? '#10b981' : 'rgba(255,255,255,0.08)';
          html += `<div id="grid-cell-${c}-${r}" onclick="window._toggleSeqCell(${c}, ${r})" style="aspect-ratio:1; background:${bg}; border:1px solid ${border}; border-radius:4px; cursor:pointer; transition:background-color 0.1s;"></div>`;
        }
      }
      html += '</div>';
      return html;
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#10b981; margin:0 0 5px; font-size:15px; font-weight:800;">🎵 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Dynamic Sequencer Matrix -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(16, 185, 129, 0.25); margin-bottom:15px; box-shadow:0 0 20px rgba(16, 185, 129, 0.15);">
          
          <div id="sequencerGridBox" style="margin-bottom:15px;">
            ${buildSequencerGridHTML()}
          </div>

          <div style="width:100%; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.bpm}</span>
              <span id="lblSeqBPM" style="color:#10b981; font-weight:bold;">120</span>
            </div>
            <input type="range" id="valSeqBPM" min="80" max="220" value="120" style="width:100%; accent-color:#10b981;" />
          </div>

          <div style="width:100%; margin-bottom:15px;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.instrument}</span>
            </div>
            <select id="valSeqSynth" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="square" selected>🤖 Square (Classic 8-bit)</option>
              <option value="triangle">🎸 Triangle (Soft Bass)</option>
              <option value="sine">🔔 Sine (Pure Bell)</option>
              <option value="sawtooth">⚡ Sawtooth (Aggressive Synth)</option>
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button id="btnPlaySeq" style="padding:9px; border-radius:6px; background:#10b981; border:none; color:#05070c; font-weight:800; font-size:11px; cursor:pointer;">
              ${tx.play}
            </button>
            <button id="btnStopSeq" style="padding:9px; border-radius:6px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; font-weight:800; font-size:11px; cursor:pointer;">
              ${tx.stop}
            </button>
          </div>
        </div>

        <button id="btnInjectSeq" style="width:100%; padding:11px; border-radius:8px; background:#10b981; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(16, 185, 129, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Global cell toggler
    window._toggleSeqCell = (c, r) => {
      const active = !activeSeqCols[c][r];
      activeSeqCols[c][r] = active;
      const cell = document.getElementById(`grid-cell-${c}-${r}`);
      if (cell) {
        cell.style.background = active ? '#10b981' : 'rgba(255,255,255,0.04)';
        cell.style.borderColor = active ? '#10b981' : 'rgba(255,255,255,0.08)';
      }
      
      // Pre-play single tone on activation
      if (active) playLocalTone(notes[r].freq);
    };

    function playLocalTone(freq) {
      if (!seqAudioCtx) seqAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (seqAudioCtx.state === 'suspended') seqAudioCtx.resume();
      
      const type = document.getElementById('valSeqSynth').value;
      const osc = seqAudioCtx.createOscillator();
      const gain = seqAudioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, seqAudioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, seqAudioCtx.currentTime); // keep volume low
      gain.gain.exponentialRampToValueAtTime(0.001, seqAudioCtx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(seqAudioCtx.destination);
      osc.start();
      osc.stop(seqAudioCtx.currentTime + 0.25);
    }

    const sBpm = document.getElementById('valSeqBPM');
    sBpm.addEventListener('input', () => {
      document.getElementById('lblSeqBPM').innerText = sBpm.value;
      if (isPlayingSeq) {
        // Restart loop to apply new BPM tempo instantly
        stopLoop();
        startLoop();
      }
    });

    let currentStep = 0;
    function startLoop() {
      if (isPlayingSeq) return;
      isPlayingSeq = true;
      document.getElementById('btnPlaySeq').style.background = '#059669';
      
      const bpm = parseInt(sBpm.value);
      const stepDurationMs = (60 / bpm / 4) * 1000; // 16th notes loop

      window._ultraSequencerTimer = setInterval(() => {
        // Remove highlighters on all columns
        for (let col = 0; col < 16; col++) {
          for (let r = 0; r < 8; r++) {
            const cell = document.getElementById(`grid-cell-${col}-${r}`);
            if (cell) cell.style.opacity = '1';
          }
        }

        // Highlight current column
        for (let r = 0; r < 8; r++) {
          const cell = document.getElementById(`grid-cell-${currentStep}-${r}`);
          if (cell) cell.style.opacity = '0.6';

          // Play active notes in this step
          if (activeSeqCols[currentStep][r]) {
            playLocalTone(notes[r].freq);
          }
        }

        currentStep = (currentStep + 1) % 16;
      }, stepDurationMs);
    }

    function stopLoop() {
      isPlayingSeq = false;
      document.getElementById('btnPlaySeq').style.background = '#10b981';
      if (window._ultraSequencerTimer) {
        clearInterval(window._ultraSequencerTimer);
        window._ultraSequencerTimer = null;
      }
      
      // Reset opacity highlights
      for (let col = 0; col < 16; col++) {
        for (let r = 0; r < 8; r++) {
          const cell = document.getElementById(`grid-cell-${col}-${r}`);
          if (cell) cell.style.opacity = '1';
        }
      }
      currentStep = 0;
    }

    document.getElementById('btnPlaySeq').addEventListener('click', startLoop);
    document.getElementById('btnStopSeq').addEventListener('click', stopLoop);

    // Dynamic local sequencer clean triggers
    const originalInitGDSUltra = window.initGDSUltra;
    window.initGDSUltra = function(lang) {
      stopLoop();
      originalInitGDSUltra(lang);
    };

    // Inject step sequencer Web Audio code
    document.getElementById('btnInjectSeq').addEventListener('click', () => {
      const type = document.getElementById('valSeqSynth').value;
      const bpmVal = sBpm.value;
      const notesJson = JSON.stringify(notes);
      const activeGridJson = JSON.stringify(activeSeqCols);

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>8-Bit Chiptune Step Sequencer</title>
  <style>
    body { margin:0; background:#05070c; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; box-sizing:border-box; padding:15px; }
    .sequencer-box { background:#0a0e17; border:3px solid #10b981; border-radius:16px; padding:24px; box-shadow:0 0 35px rgba(16, 185, 129, 0.3); max-width:100%; box-sizing:border-box; }
    .grid-wrapper { width:100%; overflow-x:auto; margin-bottom:20px; }
    .grid { display:grid; grid-template-columns: 40px repeat(16, 24px); gap:4px; width:max-content; }
    .cell { width:24px; height:24px; border-radius:4px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); cursor:pointer; }
    .cell.active { background:#10b981; border-color:#10b981; }
    .row-name { display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; color:#10b981; }
    .btn { background:#10b981; color:#000; border:none; padding:10px 24px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:14px; margin-right:8px;}
    .btn:hover { opacity:0.9; }
    .controls { display:flex; align-items:center; gap:15px; }
  </style>
</head>
<body>

  <div class="sequencer-box">
    <h2 style="color:#10b981; margin-top:0; margin-bottom:20px;">🎵 8-Bit Step Sequencer Engine</h2>
    
    <div class="grid-wrapper">
      <div class="grid" id="noteGrid"></div>
    </div>

    <div class="controls">
      <button class="btn" onclick="togglePlay()" id="playBtn">Play loop</button>
      <span>BPM: ${bpmVal} | Instrument: ${type.toUpperCase()}</span>
    </div>
  </div>

  <script>
    (function() {
      const notes = ${notesJson};
      const activeGrid = ${activeGridJson};

      let audioCtx = null;
      let isPlaying = false;
      let timer = null;
      let currentStep = 0;
      const bpm = ${bpmVal};
      const synthType = '${type}';

      // Build grid visual layout on load
      const gridContainer = document.getElementById('noteGrid');
      
      // Header steps line
      gridContainer.appendChild(document.createElement('div'));
      for(let c=0; c<16; c++) {
        const stepNum = document.createElement('div');
        stepNum.style.textAlign = 'center';
        stepNum.style.fontSize = '10px';
        stepNum.style.color = '#64748b';
        stepNum.innerText = c+1;
        gridContainer.appendChild(stepNum);
      }

      // Draw rows
      for(let r=0; r<8; r++) {
        const lbl = document.createElement('div');
        lbl.className = 'row-name';
        lbl.innerText = notes[r].name;
        gridContainer.appendChild(lbl);

        for(let c=0; c<16; c++) {
          const cell = document.createElement('div');
          cell.className = 'cell' + (activeGrid[c][r] ? ' active' : '');
          cell.id = 'c-' + c + '-' + r;
          
          // Toggle function in client
          cell.onclick = () => {
            activeGrid[c][r] = !activeGrid[c][r];
            cell.classList.toggle('active');
          };

          gridContainer.appendChild(cell);
        }
      }

      function playTone(freq) {
        if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if(audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = synthType;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.28);
      }

      window.togglePlay = function() {
        const playBtn = document.getElementById('playBtn');
        if (isPlaying) {
          clearInterval(timer);
          isPlaying = false;
          playBtn.innerText = 'Play loop';
          playBtn.style.background = '#10b981';
          
          // Clear activeHighlights
          for(let c=0; c<16; c++) {
            for(let r=0; r<8; r++) {
              document.getElementById('c-'+c+'-'+r).style.opacity = '1';
            }
          }
          currentStep = 0;
        } else {
          isPlaying = true;
          playBtn.innerText = 'Stop';
          playBtn.style.background = '#ef4444';
          const stepTimeMs = (60 / bpm / 4) * 1000;

          timer = setInterval(() => {
            // Restore highlights
            for(let c=0; c<16; c++) {
              for(let r=0; r<8; r++) {
                document.getElementById('c-'+c+'-'+r).style.opacity = '1';
              }
            }
            // Add highlight & play
            for(let r=0; r<8; r++) {
              document.getElementById('c-'+currentStep+'-'+r).style.opacity = '0.55';
              if(activeGrid[currentStep][r]) {
                playTone(notes[r].freq);
              }
            }
            currentStep = (currentStep + 1) % 16;
          }, stepTimeMs);
        }
      };
    })();
  </script>
</body>
</html>`;
      window._injectGDSUltraCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // 🔦 5. 3D RAYCASTER ENGINE
  // ═══════════════════════════════════════════
  function renderRaycaster(parent, backBtn, lang) {
    const tx = TX[lang].tools.raycaster;

    // Default map
    if (!window._raycasterMap) {
      window._raycasterMap = [
        [1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,1],
        [1,0,1,0,0,1,0,1],
        [1,0,1,0,0,1,0,1],
        [1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1]
      ];
    }
    
    let map = window._raycasterMap;
    let px = 1.5, py = 1.5; // Player position (cells)
    let pa = 0; // Player angle
    let fov = 60 * Math.PI / 180; // FOV in radians
    
    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#06b6d4; margin:0 0 5px; font-size:15px; font-weight:800;">🔦 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Raycasting Lab Panels -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(6, 182, 212, 0.25); display:flex; flex-direction:column; gap:12px; margin-bottom:15px; box-shadow:0 0 20px rgba(6, 182, 212, 0.15);">
          <!-- 3D Canvas Preview -->
          <canvas id="ray3DCanvas" width="240" height="130" style="background:#020617; border-radius:8px; border:2px solid #1e293b; width:100%; max-width:240px; aspect-ratio:24/13; margin:0 auto; display:block;"></canvas>

          <!-- Interactive 2D Map Grid (8x8) -->
          <div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap; margin-top:5px;">
            <div>
              <div style="font-size:10px; color:#64748b; margin-bottom:4px; font-weight:bold; text-align:center;">Harta 2D Map (Click Wall)</div>
              <div id="rayMapGrid" style="display:grid; grid-template-columns:repeat(8, 16px); gap:2px; background:#111; padding:4px; border-radius:6px; border:1px solid #334155;">
              </div>
            </div>
            
            <!-- Controls & Directions -->
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
              <div style="font-size:10px; color:#64748b; font-weight:bold;">${tx.controls}</div>
              <div style="display:grid; grid-template-columns: 35px 35px 35px; gap:4px;">
                <div></div>
                <button id="btnRayUp" style="background:#06b6d4; color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; cursor:pointer;">▲</button>
                <div></div>
                <button id="btnRayLeft" style="background:#06b6d4; color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; cursor:pointer;">◀</button>
                <button id="btnRayDown" style="background:#06b6d4; color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; cursor:pointer;">▼</button>
                <button id="btnRayRight" style="background:#06b6d4; color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; cursor:pointer;">▶</button>
              </div>
            </div>
          </div>

          <!-- Configuration Sliders -->
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.fov}</span>
              <span id="lblRayFov" style="color:#06b6d4; font-weight:bold;">60°</span>
            </div>
            <input type="range" id="valRayFov" min="40" max="90" value="60" style="width:100%; accent-color:#06b6d4;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.hue}</span>
              <span id="lblRayHue" style="color:#06b6d4; font-weight:bold;">190°</span>
            </div>
            <input type="range" id="valRayHue" min="0" max="360" value="190" style="width:100%; accent-color:#06b6d4;" />
          </div>
        </div>

        <button id="btnInjectRaycaster" style="width:100%; padding:11px; border-radius:8px; background:#06b6d4; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(6, 182, 212, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const canvas = document.getElementById('ray3DCanvas');
    const ctx = canvas.getContext('2d');
    const sFov = document.getElementById('valRayFov');
    const sHue = document.getElementById('valRayHue');

    function drawGridEditor() {
      const box = document.getElementById('rayMapGrid');
      if (!box) return;
      box.innerHTML = '';
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const isPlayer = Math.floor(px) === c && Math.floor(py) === r;
          const isWall = map[r][c] === 1;
          const bg = isPlayer ? '#ef4444' : (isWall ? '#06b6d4' : '#1e293b');
          const cell = document.createElement('div');
          cell.style.cssText = `width:16px; height:16px; background:${bg}; cursor:pointer; border-radius:2px; transition:background 0.1s;`;
          cell.onclick = () => {
            // Cannot toggle player border/spawn cell directly
            if (c === 0 || c === 7 || r === 0 || r === 7) return; // outer boundary locked
            if (isPlayer) return;
            map[r][c] = map[r][c] === 1 ? 0 : 1;
            drawGridEditor();
            render3D();
          };
          box.appendChild(cell);
        }
      }
    }

    function render3D() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#0b0f19'; // Ceil
      ctx.fillRect(0, 0, w, h/2);
      ctx.fillStyle = '#020617'; // Floor
      ctx.fillRect(0, h/2, w, h/2);

      const fovVal = parseInt(sFov.value) * Math.PI / 180;
      const hue = parseInt(sHue.value);
      const halfFov = fovVal / 2;

      for (let x = 0; x < w; x++) {
        const rayAngle = pa - halfFov + (x / w) * fovVal;
        let distance = 0;
        let hitWall = false;

        const sin = Math.sin(rayAngle);
        const cos = Math.cos(rayAngle);

        while (!hitWall && distance < 16) {
          distance += 0.05;
          const checkX = Math.floor(px + cos * distance);
          const checkY = Math.floor(py + sin * distance);

          if (checkX < 0 || checkX >= 8 || checkY < 0 || checkY >= 8) {
            hitWall = true;
            distance = 16;
          } else if (map[checkY][checkX] === 1) {
            hitWall = true;
          }
        }

        // Correct fish-eye distortion
        const correctedDist = distance * Math.cos(rayAngle - pa);
        const wallHeight = Math.min(h, Math.floor(h / (correctedDist + 0.0001)));

        // Draw vertical strip
        const brightness = Math.max(10, Math.floor(65 - correctedDist * 4.5));
        ctx.fillStyle = `hsl(${hue}, 80%, ${brightness}%)`;
        ctx.fillRect(x, (h - wallHeight) / 2, 1, wallHeight);
      }
    }

    // Direction triggers
    const moveStep = 0.2;
    const rotateStep = 10 * Math.PI / 180;

    function move(dir) {
      const newX = px + Math.cos(pa) * moveStep * dir;
      const newY = py + Math.sin(pa) * moveStep * dir;
      if (map[Math.floor(newY)][Math.floor(newX)] === 0) {
        px = newX;
        py = newY;
      }
      drawGridEditor();
      render3D();
    }

    function rotate(dir) {
      pa += rotateStep * dir;
      render3D();
    }

    document.getElementById('btnRayUp').onclick = () => move(1);
    document.getElementById('btnRayDown').onclick = () => move(-1);
    document.getElementById('btnRayLeft').onclick = () => rotate(-1);
    document.getElementById('btnRayRight').onclick = () => rotate(1);

    sFov.oninput = () => {
      document.getElementById('lblRayFov').innerText = sFov.value + '°';
      render3D();
    };
    sHue.oninput = () => {
      document.getElementById('lblRayHue').innerText = sHue.value + '°';
      render3D();
    };

    // Initial render
    drawGridEditor();
    render3D();

    // Inject Monaco Logic
    document.getElementById('btnInjectRaycaster').addEventListener('click', () => {
      const mapJson = JSON.stringify(map);
      const baseHue = sHue.value;
      const baseFov = sFov.value;

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Pure JS pseudo-3D Raycaster</title>
  <style>
    body { margin: 0; background: #020205; color: #fff; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; box-sizing: border-box; padding: 15px; }
    .screen-container { position: relative; width: 640px; height: 400px; border: 4px solid #06b6d4; border-radius: 16px; overflow: hidden; box-shadow: 0 0 45px rgba(6, 182, 212, 0.35); max-width: 100%; max-height: calc(100vh - 80px); }
    canvas { display: block; width: 100%; height: 100%; background: #000; }
    .overlay { position: absolute; top: 15px; left: 15px; font-size: 13px; color: #06b6d4; background: rgba(0,0,0,0.65); padding: 12px; border-radius: 8px; pointer-events: none; border: 1px solid rgba(6,182,212,0.2); }
  </style>
</head>
<body>

  <div class="screen-container">
    <div class="overlay">
      🔦 Raycast 3D Active<br>
      <span style="color:#fff;">[W/S] Move | [A/D] Rotate</span>
    </div>
    <canvas id="rayCanvas" width="320" height="200"></canvas>
  </div>

  <script>
    (function() {
      const canvas = document.getElementById('rayCanvas');
      const ctx = canvas.getContext('2d');

      const map = ${mapJson};
      let px = 1.5;
      let py = 1.5;
      let pa = 0;

      const fov = ${baseFov} * Math.PI / 180;
      const wallHue = ${baseHue};
      const moveSpeed = 0.08;
      const rotSpeed = 0.05;

      const keys = {};
      window.addEventListener('keydown', e => keys[e.code] = true);
      window.addEventListener('keyup', e => keys[e.code] = false);

      function update() {
        // Rotation
        if (keys['KeyA'] || keys['ArrowLeft']) pa -= rotSpeed;
        if (keys['KeyD'] || keys['ArrowRight']) pa += rotSpeed;

        // Translation
        let nextX = px;
        let nextY = py;
        if (keys['KeyW'] || keys['ArrowUp']) {
          nextX += Math.cos(pa) * moveSpeed;
          nextY += Math.sin(pa) * moveSpeed;
        }
        if (keys['KeyS'] || keys['ArrowDown']) {
          nextX -= Math.cos(pa) * moveSpeed;
          nextY -= Math.sin(pa) * moveSpeed;
        }

        // Collision Check
        if (map[Math.floor(nextY)][Math.floor(nextX)] === 0) {
          px = nextX;
          py = nextY;
        } else if (map[Math.floor(py)][Math.floor(nextX)] === 0) {
          px = nextX;
        } else if (map[Math.floor(nextY)][Math.floor(px)] === 0) {
          py = nextY;
        }
      }

      function draw() {
        const w = canvas.width;
        const h = canvas.height;

        // Draw Ceiling
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, w, h/2);

        // Draw Floor
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, h/2, w, h/2);

        // Cast Rays
        const halfFov = fov / 2;
        for (let x = 0; x < w; x++) {
          const rayAngle = pa - halfFov + (x / w) * fov;
          let dist = 0;
          let hit = false;

          const sin = Math.sin(rayAngle);
          const cos = Math.cos(rayAngle);

          while (!hit && dist < 12) {
            dist += 0.04;
            const cx = Math.floor(px + cos * dist);
            const cy = Math.floor(py + sin * dist);

            if (cx < 0 || cx >= 8 || cy < 0 || cy >= 8) {
              hit = true;
              dist = 12;
            } else if (map[cy][cx] === 1) {
              hit = true;
            }
          }

          // Correct Fish-Eye
          const correctedDist = dist * Math.cos(rayAngle - pa);
          const wallHeight = Math.min(h, Math.floor(h / (correctedDist + 0.0001)));

          const brightness = Math.max(8, Math.floor(70 - correctedDist * 5.5));
          ctx.fillStyle = "hsl(" + wallHue + ", 85%, " + brightness + "%)";
          ctx.fillRect(x, (h - wallHeight)/2, 1, wallHeight);
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
      window._injectGDSUltraCode(code);
    });
  }

  // ═══════════════════════════════════════════
  // 🎨 6. PIXEL ART SPRITE & CSS BOX-SHADOW ANIMATOR
  // ═══════════════════════════════════════════
  let spriteFrames = [new Array(256).fill('transparent')];
  let activeFrameIdx = 0;
  let activeColor = '#ef4444';
  let isPlayingAnim = false;
  let animTimer = null;

  function renderSpriteAnimator(parent, backBtn, lang) {
    const tx = TX[lang].tools.spriteanim;
    const colors = ['transparent', '#000000', '#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#f97316'];

    function buildGridHTML() {
      let gridHTML = '';
      const currentFrame = spriteFrames[activeFrameIdx];
      for (let i = 0; i < 256; i++) {
        const c = currentFrame[i] || 'transparent';
        const displayBg = c === 'transparent' ? 'repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, rgba(0,0,0,0.15) 0% 50%) 50% / 8px 8px' : c;
        gridHTML += `<div class="sprite-cell" onclick="window._paintSpriteCell(${i})" style="aspect-ratio:1; background:${displayBg}; border:1px solid rgba(255,255,255,0.03); cursor:crosshair;"></div>`;
      }
      return gridHTML;
    }

    function buildPaletteHTML() {
      return colors.map(c => {
        const border = activeColor === c ? '2px solid #fff' : '1px solid rgba(255,255,255,0.15)';
        const displayBg = c === 'transparent' ? 'repeating-conic-gradient(rgba(255,255,255,0.07) 0% 25%, rgba(0,0,0,0.2) 0% 50%) 50% / 6px 6px' : c;
        return `<div onclick="window._setSpriteColor('${c}')" style="width:20px; height:20px; background:${displayBg}; border:${border}; border-radius:4px; cursor:pointer;"></div>`;
      }).join('');
    }

    function updateTimeline() {
      const lbl = document.getElementById('spriteFrameLbl');
      if (lbl) lbl.innerText = `${tx.frame} ${activeFrameIdx + 1} / ${spriteFrames.length}`;
    }

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#ec4899; margin:0 0 5px; font-size:15px; font-weight:800;">🎨 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Stilizat Grila Sandbox -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(236, 72, 153, 0.25); display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:15px; box-shadow:0 0 20px rgba(236, 72, 153, 0.15);">
          <!-- 16x16 Grid box -->
          <div id="spriteDrawGrid" style="display:grid; grid-template-columns:repeat(16, 1fr); gap:1px; background:#0c0d12; border:2px solid #1e293b; border-radius:8px; width:100%; max-width:220px; aspect-ratio:1;">
            ${buildGridHTML()}
          </div>

          <!-- Color palette picker row -->
          <div style="display:flex; gap:6px; background:#0c0d12; padding:6px; border-radius:8px; border:1px solid #1e293b;">
            ${buildPaletteHTML()}
          </div>

          <!-- Frame and timeline manager -->
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:8px;">
            <button id="btnSpritePrev" style="background:#1e293b; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:10px; cursor:pointer;">◀</button>
            <span id="spriteFrameLbl" style="font-size:11px; color:#fff; font-weight:bold;">${tx.frame} 1 / 1</span>
            <button id="btnSpriteNext" style="background:#1e293b; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:10px; cursor:pointer;">▶</button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; width:100%;">
            <button id="btnSpriteAdd" style="background:rgba(236, 72, 153, 0.15); border:1px solid #ec4899; color:#f472b6; font-size:10px; padding:6px; border-radius:6px; cursor:pointer; font-weight:bold;">${tx.add}</button>
            <button id="btnSpriteDelete" style="background:rgba(239, 68, 68, 0.15); border:1px solid #ef4444; color:#f87171; font-size:10px; padding:6px; border-radius:6px; cursor:pointer; font-weight:bold;">${tx.delete}</button>
            <button id="btnSpriteClear" style="background:#1e293b; color:#94a3b8; font-size:10px; padding:6px; border-radius:6px; cursor:pointer; border:1px solid #334155;">${tx.clear}</button>
          </div>

          <!-- Playback animations speed -->
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.speed}</span>
              <span id="lblSpriteFps" style="color:#ec4899; font-weight:bold;">6 FPS</span>
            </div>
            <input type="range" id="valSpriteFps" min="1" max="18" value="6" style="width:100%; accent-color:#ec4899;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; width:100%;">
            <button id="btnPlaySprite" style="background:#ec4899; border:none; color:#000; font-weight:bold; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${tx.play}</button>
            <button id="btnStopSprite" style="background:#1e293b; border:1px solid #334155; color:#fff; font-weight:bold; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${tx.stop}</button>
          </div>
        </div>

        <button id="btnInjectSprite" style="width:100%; padding:11px; border-radius:8px; background:#ec4899; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(236, 72, 153, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    // Dynamic state connectors
    window._paintSpriteCell = (idx) => {
      spriteFrames[activeFrameIdx][idx] = activeColor;
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    window._setSpriteColor = (c) => {
      activeColor = c;
      window.handleGDSUltraTool('spriteanim');
    };

    const sFps = document.getElementById('valSpriteFps');
    sFps.oninput = () => {
      document.getElementById('lblSpriteFps').innerText = sFps.value + ' FPS';
      if (isPlayingAnim) {
        stopPlayback();
        startPlayback();
      }
    };

    function startPlayback() {
      if (isPlayingAnim) return;
      isPlayingAnim = true;
      document.getElementById('btnPlaySprite').style.background = '#be185d';
      
      const fps = parseInt(sFps.value);
      const delay = 1000 / fps;

      animTimer = setInterval(() => {
        activeFrameIdx = (activeFrameIdx + 1) % spriteFrames.length;
        updateTimeline();
        document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
      }, delay);
    }

    function stopPlayback() {
      isPlayingAnim = false;
      const playBtn = document.getElementById('btnPlaySprite');
      if (playBtn) playBtn.style.background = '#ec4899';
      if (animTimer) {
        clearInterval(animTimer);
        animTimer = null;
      }
    }

    document.getElementById('btnPlaySprite').onclick = startPlayback;
    document.getElementById('btnStopSprite').onclick = stopPlayback;

    document.getElementById('btnSpritePrev').onclick = () => {
      stopPlayback();
      activeFrameIdx = (activeFrameIdx - 1 + spriteFrames.length) % spriteFrames.length;
      updateTimeline();
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    document.getElementById('btnSpriteNext').onclick = () => {
      stopPlayback();
      activeFrameIdx = (activeFrameIdx + 1) % spriteFrames.length;
      updateTimeline();
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    document.getElementById('btnSpriteAdd').onclick = () => {
      stopPlayback();
      spriteFrames.push(new Array(256).fill('transparent'));
      activeFrameIdx = spriteFrames.length - 1;
      updateTimeline();
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    document.getElementById('btnSpriteDelete').onclick = () => {
      if (spriteFrames.length <= 1) return;
      stopPlayback();
      spriteFrames.splice(activeFrameIdx, 1);
      activeFrameIdx = Math.max(0, activeFrameIdx - 1);
      updateTimeline();
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    document.getElementById('btnSpriteClear').onclick = () => {
      stopPlayback();
      spriteFrames[activeFrameIdx] = new Array(256).fill('transparent');
      document.getElementById('spriteDrawGrid').innerHTML = buildGridHTML();
    };

    // Clean timer on menu navigation
    const originalInitGDSUltra = window.initGDSUltra;
    window.initGDSUltra = function(lang) {
      stopPlayback();
      originalInitGDSUltra(lang);
    };

    // Monaco Code Injector
    document.getElementById('btnInjectSprite').onclick = () => {
      const fps = sFps.value;
      
      // Build Keyframes
      let keyframesCSS = '';
      const totalFrames = spriteFrames.length;
      
      spriteFrames.forEach((frame, fIdx) => {
        const percent = Math.floor((fIdx / totalFrames) * 100);
        const percentNext = Math.floor(((fIdx + 0.99) / totalFrames) * 100); // stay on frame until next tick
        
        let shadowList = [];
        for (let r = 0; r < 16; r++) {
          for (let c = 0; c < 16; c++) {
            const color = frame[r * 16 + c];
            if (color && color !== 'transparent') {
              shadowList.push(`${c * 20}px ${r * 20}px 0 ${color}`);
            }
          }
        }
        const shadowStr = shadowList.join(',\n      ') || 'none';
        
        keyframesCSS += `  ${percent}%, ${percentNext}% {\n    box-shadow: ${shadowStr};\n  }\n`;
      });
      
      // Ensure 100% matches frame 0 for clean loops
      let finalShadows = [];
      const firstFrame = spriteFrames[0];
      for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 16; c++) {
          const color = firstFrame[r * 16 + c];
          if (color && color !== 'transparent') {
            finalShadows.push(`${c * 20}px ${r * 20}px 0 ${color}`);
          }
        }
      }
      keyframesCSS += `  100% {\n    box-shadow: ${finalShadows.join(',\n      ') || 'none'};\n  }\n`;

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Pure CSS Sprite Animation</title>
  <style>
    body { margin: 0; background: #0b0f19; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; font-family: sans-serif; box-sizing: border-box; padding: 20px; }
    .screen { display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 100%; box-sizing: border-box; }
    
    .sprite-container {
      width: 320px;
      height: 320px;
      background: #020617;
      border: 3px solid #ec4899;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 35px rgba(236, 72, 153, 0.3);
      box-sizing: border-box;
      max-width: 100%;
      aspect-ratio: 1;
      position: relative;
    }
    
    .sprite-pixels {
      width: 20px;
      height: 20px;
      background: transparent;
      animation: playSprite ${totalFrames / fps}s steps(1) infinite;
      position: absolute;
      top: 10px;
      left: 10px;
    }

    @keyframes playSprite {
${keyframesCSS}    }
  </style>
</head>
<body>

  <div class="screen">
    <div class="sprite-container">
      <div class="sprite-pixels"></div>
    </div>
    <div style="color: #94a3b8; font-family: monospace; font-size:12px;">🎨 Pure CSS animated pixel-art (box-shadow)</div>
  </div>

</body>
</html>`;
      window._injectGDSUltraCode(code);
    };
  }

  // ═══════════════════════════════════════════
  // 🔊 7. PROCEDURAL SOUND FX STUDIO
  // ═══════════════════════════════════════════
  function renderSfxrStudio(parent, backBtn, lang) {
    const tx = TX[lang].tools.sfxr;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#eab308; margin:0 0 5px; font-size:15px; font-weight:800;">🔊 ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Stilizat Sound Lab -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(234, 179, 8, 0.25); display:flex; flex-direction:column; gap:12px; margin-bottom:15px; box-shadow:0 0 20px rgba(234, 179, 8, 0.15);">
          
          <!-- Preset buttons row -->
          <div style="display:flex; flex-wrap:wrap; gap:5px; justify-content:center; width:100%;">
            <button id="btnSfxLaser" style="background:#1e293b; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; font-weight:bold; padding:6px 9px; cursor:pointer;">⚡ Laser</button>
            <button id="btnSfxJump" style="background:#1e293b; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; font-weight:bold; padding:6px 9px; cursor:pointer;">👟 Jump</button>
            <button id="btnSfxExplosion" style="background:#1e293b; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; font-weight:bold; padding:6px 9px; cursor:pointer;">💥 Explosion</button>
            <button id="btnSfxCoin" style="background:#1e293b; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; font-weight:bold; padding:6px 9px; cursor:pointer;">🪙 Coin</button>
            <button id="btnSfxPowerup" style="background:#1e293b; color:#fff; border:1px solid #334155; border-radius:6px; font-size:10px; font-weight:bold; padding:6px 9px; cursor:pointer;">⭐ PowerUp</button>
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.wave}</span>
            </div>
            <select id="valSfxWave" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="square" selected>🤖 Square (Classic 8-bit)</option>
              <option value="sawtooth">⚡ Sawtooth (Aggressive)</option>
              <option value="triangle">🎸 Triangle (Soft Bass)</option>
              <option value="sine">🔔 Sine (Pure Tone)</option>
            </select>
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.freq}</span>
              <span id="lblSfxFreq" style="color:#eab308; font-weight:bold;">600 Hz</span>
            </div>
            <input type="range" id="valSfxFreq" min="100" max="2200" step="20" value="600" style="width:100%; accent-color:#eab308;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.decay} (seconds)</span>
              <span id="lblSfxDecay" style="color:#eab308; font-weight:bold;">0.2s</span>
            </div>
            <input type="range" id="valSfxDecay" min="0.05" max="1.2" step="0.05" value="0.20" style="width:100%; accent-color:#eab308;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.slide} (Pitch)</span>
              <span id="lblSfxSlide" style="color:#eab308; font-weight:bold;">-400 Hz</span>
            </div>
            <input type="range" id="valSfxSlide" min="-1500" max="1500" step="50" value="-400" style="width:100%; accent-color:#eab308;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.noise} (Burst)</span>
              <span id="lblSfxNoise" style="color:#eab308; font-weight:bold;">0.00</span>
            </div>
            <input type="range" id="valSfxNoise" min="0" max="1" step="0.05" value="0.00" style="width:100%; accent-color:#eab308;" />
          </div>

          <button id="btnPlaySfx" style="width:100%; padding:9px; border-radius:6px; background:#eab308; border:none; color:#05070c; font-weight:800; font-size:11px; cursor:pointer;">
            ${tx.play}
          </button>
        </div>

        <button id="btnInjectSfxr" style="width:100%; padding:11px; border-radius:8px; background:#eab308; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(234, 179, 8, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const sWave = document.getElementById('valSfxWave');
    const sFreq = document.getElementById('valSfxFreq');
    const sDecay = document.getElementById('valSfxDecay');
    const sSlide = document.getElementById('valSfxSlide');
    const sNoise = document.getElementById('valSfxNoise');

    function syncLabels() {
      document.getElementById('lblSfxFreq').innerText = sFreq.value + ' Hz';
      document.getElementById('lblSfxDecay').innerText = sDecay.value + 's';
      document.getElementById('lblSfxSlide').innerText = sSlide.value + ' Hz';
      document.getElementById('lblSfxNoise').innerText = parseFloat(sNoise.value).toFixed(2);
    }

    sFreq.oninput = sDecay.oninput = sSlide.oninput = sNoise.oninput = syncLabels;

    function applyPreset(wave, freq, decay, slide, noise) {
      sWave.value = wave;
      sFreq.value = freq;
      sDecay.value = decay;
      sSlide.value = slide;
      sNoise.value = noise;
      syncLabels();
      triggerSound();
    }

    document.getElementById('btnSfxLaser').onclick = () => applyPreset('sawtooth', 900, 0.15, -800, 0.1);
    document.getElementById('btnSfxJump').onclick = () => applyPreset('triangle', 200, 0.18, 500, 0);
    document.getElementById('btnSfxExplosion').onclick = () => applyPreset('square', 100, 0.5, -90, 0.85);
    document.getElementById('btnSfxCoin').onclick = () => applyPreset('sine', 1100, 0.08, 0, 0);
    document.getElementById('btnSfxPowerup').onclick = () => applyPreset('sine', 350, 0.35, 1000, 0);

    function triggerSound() {
      const wave = sWave.value;
      const freq = parseFloat(sFreq.value);
      const decay = parseFloat(sDecay.value);
      const slide = parseFloat(sSlide.value);
      const noise = parseFloat(sNoise.value);

      if (!window._sfxAudioCtx) {
        window._sfxAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = window._sfxAudioCtx;
      if (ctx.state === 'suspended') ctx.resume();

      const time = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = wave;
      osc.frequency.setValueAtTime(freq, time);
      if (slide !== 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, freq + slide), time + decay);
      }

      gainNode.gain.setValueAtTime(0.12, time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + decay);

      // Play Noise
      if (noise > 0) {
        const noiseLength = ctx.sampleRate * decay;
        const buffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < noiseLength; i++) {
          data[i] = (Math.random() * 2 - 1) * noise * 0.12;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.12, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + decay);

        noiseNode.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseNode.start(time);
        noiseNode.stop(time + decay);
      }
    }

    document.getElementById('btnPlaySfx').onclick = triggerSound;

    // Inject code
    document.getElementById('btnInjectSfxr').onclick = () => {
      const wave = sWave.value;
      const freq = sFreq.value;
      const decay = sDecay.value;
      const slide = sSlide.value;
      const noise = sNoise.value;

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Procedural Sound FX Engine</title>
  <style>
    body { margin: 0; background: #05070c; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; box-sizing: border-box; padding: 20px; }
    .sfx-box { background: #0c0e17; border: 3px solid #eab308; border-radius: 20px; padding: 30px; text-align: center; box-shadow: 0 0 35px rgba(234, 179, 8, 0.35); max-width: 100%; box-sizing: border-box; width: 380px; }
    .btn { background: #eab308; color: #000; font-weight: bold; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; margin-top: 15px; width: 100%; transition: opacity 0.2s; }
    .btn:hover { opacity: 0.9; }
  </style>
</head>
<body>

  <div class="sfx-box">
    <h2 style="color:#eab308; margin-top:0; margin-bottom:15px;">🔊 Procedural Synth</h2>
    <p style="color:#94a3b8; font-size:13px; line-height:1.6;">Generates chiptune retro sounds on the fly using native Web Audio API oscillators.</p>
    <button class="btn" onclick="playEffect()">🔊 Play Sound Effect</button>
  </div>

  <script>
    (function() {
      let audioCtx = null;

      window.playEffect = function() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const time = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Waveform configuration
        osc.type = '${wave}';
        osc.frequency.setValueAtTime(${freq}, time);
        
        // Slide configuration
        const slideVal = ${slide};
        if (slideVal !== 0) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(10, ${freq} + slideVal), time + ${decay});
        }

        // Gain Envelope
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + ${decay});

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + ${decay});

        // Noise Burst generator
        const noiseMix = ${noise};
        if (noiseMix > 0) {
          const sampleRate = audioCtx.sampleRate;
          const noiseLength = sampleRate * ${decay};
          const buffer = audioCtx.createBuffer(1, noiseLength, sampleRate);
          const data = buffer.getChannelData(0);
          
          for (let i = 0; i < noiseLength; i++) {
            data[i] = (Math.random() * 2 - 1) * noiseMix * 0.15;
          }

          const noiseNode = audioCtx.createBufferSource();
          noiseNode.buffer = buffer;

          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(0.15, time);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, time + ${decay});

          noiseNode.connect(noiseGain);
          noiseGain.connect(audioCtx.destination);
          noiseNode.start(time);
          noiseNode.stop(time + ${decay});
        }
      };
    })();
  </script>
</body>
</html>`;
      window._injectGDSUltraCode(code);
    };
  }

  // ═══════════════════════════════════════════
  // 🕹️ 8. RIGIDBODY PHYSICS MAKER
  // ═══════════════════════════════════════════
  let physicsObjects = [];
  let isPlayingPhysics = false;
  let physicsTimer = null;
  let activeSpawnType = 'ball'; // 'ball' or 'box'

  function renderRigidbody(parent, backBtn, lang) {
    const tx = TX[lang].tools.rigidbody;

    parent.innerHTML = `
      <div style="padding:15px; font-family:'Inter', sans-serif; height:100%; overflow-y:auto; box-sizing:border-box; background:#05070c;">
        ${backBtn}
        <h3 style="color:#10b981; margin:0 0 5px; font-size:15px; font-weight:800;">🕹️ ${tx.name}</h3>
        <p style="color:#64748b; font-size:11px; margin:0 0 15px;">${tx.desc}</p>

        <!-- Physics Sandbox panels -->
        <div style="background:#020204; border-radius:12px; padding:12px; border:1px solid rgba(16, 185, 129, 0.25); display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:15px; box-shadow:0 0 20px rgba(16, 185, 129, 0.15);">
          <!-- Physics Canvas screen -->
          <canvas id="physicsCanvas" width="260" height="170" style="background:#020617; border-radius:8px; border:2px solid #1e293b; width:100%; max-width:260px; aspect-ratio:26/17; display:block; cursor:crosshair;"></canvas>

          <!-- Spawn Selector -->
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.spawnType}</span>
            </div>
            <select id="valPhysSpawn" style="width:100%; background:#1e293b; color:#fff; border:1px solid #334155; padding:6px; border-radius:6px; font-size:11px;">
              <option value="ball" selected>${tx.ball}</option>
              <option value="box">${tx.box}</option>
            </select>
          </div>

          <!-- Configuration Sliders -->
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.gravity}</span>
              <span id="lblPhysGravity" style="color:#10b981; font-weight:bold;">0.2</span>
            </div>
            <input type="range" id="valPhysGravity" min="0" max="0.8" step="0.05" value="0.2" style="width:100%; accent-color:#10b981;" />
          </div>

          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; margin-bottom:4px;">
              <span>${tx.elastic}</span>
              <span id="lblPhysElastic" style="color:#10b981; font-weight:bold;">0.7</span>
            </div>
            <input type="range" id="valPhysElastic" min="0" max="1" step="0.05" value="0.7" style="width:100%; accent-color:#10b981;" />
          </div>

          <!-- Control buttons -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; width:100%;">
            <button id="btnPlayPhys" style="background:#10b981; border:none; color:#000; font-weight:bold; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${tx.play}</button>
            <button id="btnStopPhys" style="background:#1e293b; border:1px solid #334155; color:#fff; font-weight:bold; padding:8px; border-radius:6px; cursor:pointer; font-size:11px;">${tx.stop}</button>
          </div>

          <button id="btnPhysClear" style="width:100%; padding:8px; border-radius:6px; background:rgba(239, 68, 68, 0.1); border:1px solid #ef4444; color:#f87171; font-weight:bold; font-size:10px; cursor:pointer;">
            ${tx.clear}
          </button>
        </div>

        <button id="btnInjectPhysics" style="width:100%; padding:11px; border-radius:8px; background:#10b981; border:none; color:#05070c; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 15px rgba(16, 185, 129, 0.3);">
          ${tx.injectBtn}
        </button>
      </div>
    `;

    const canvas = document.getElementById('physicsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const sSpawn = document.getElementById('valPhysSpawn');
    const sGravity = document.getElementById('valPhysGravity');
    const sElastic = document.getElementById('valPhysElastic');

    function syncLabels() {
      document.getElementById('lblPhysGravity').innerText = sGravity.value;
      document.getElementById('lblPhysElastic').innerText = sElastic.value;
    }

    sGravity.oninput = sElastic.oninput = syncLabels;

    function updatePhysics() {
      const g = parseFloat(sGravity.value);
      const e = parseFloat(sElastic.value);
      const w = canvas.width;
      const h = canvas.height;

      // 1. Apply Gravity and Translate
      physicsObjects.forEach(obj => {
        if (!obj.static) {
          obj.vy += g;
          obj.x += obj.vx;
          obj.y += obj.vy;
          
          if (obj.y > h - obj.r) {
            obj.y = h - obj.r;
            obj.vy = -obj.vy * e;
          }
          if (obj.y < obj.r) {
            obj.y = obj.r;
            obj.vy = -obj.vy * e;
          }
          if (obj.x > w - obj.r) {
            obj.x = w - obj.r;
            obj.vx = -obj.vx * e;
          }
          if (obj.x < obj.r) {
            obj.x = obj.r;
            obj.vx = -obj.vx * e;
          }
        }
      });

      // 2. Resolve Ball-to-Ball
      for (let i = 0; i < physicsObjects.length; i++) {
        for (let j = i + 1; j < physicsObjects.length; j++) {
          const o1 = physicsObjects[i];
          const o2 = physicsObjects[j];

          if (o1.type === 'ball' && o2.type === 'ball') {
            const dx = o2.x - o1.x;
            const dy = o2.y - o1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = o1.r + o2.r;

            if (dist < minDist) {
              const overlap = minDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              if (!o1.static) { o1.x -= nx * overlap * 0.5; o1.y -= ny * overlap * 0.5; }
              if (!o2.static) { o2.x += nx * overlap * 0.5; o2.y += ny * overlap * 0.5; }

              const kx = o1.vx - o2.vx;
              const ky = o1.vy - o2.vy;
              const vn = kx * nx + ky * ny;
              if (vn > 0) {
                const impulse = (2 * vn) / (o1.mass + o2.mass);
                const ix = nx * impulse * e;
                const iy = ny * impulse * e;
                if (!o1.static) { o1.vx -= ix * o2.mass; o1.vy -= iy * o2.mass; }
                if (!o2.static) { o2.vx += ix * o1.mass; o2.vy += iy * o1.mass; }
              }
            }
          }
        }
      }

      // 3. Resolve Ball-to-Box
      physicsObjects.forEach(ball => {
        if (ball.type !== 'ball' || ball.static) return;

        physicsObjects.forEach(box => {
          if (box.type !== 'box') return;

          const cx = Math.max(box.x, Math.min(ball.x, box.x + box.w));
          const cy = Math.max(box.y, Math.min(ball.y, box.y + box.h));

          const dx = ball.x - cx;
          const dy = ball.y - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < ball.r) {
            const nx = dist > 0 ? dx / dist : 0;
            const ny = dist > 0 ? dy / dist : -1;
            const overlap = ball.r - dist;

            ball.x += nx * overlap;
            ball.y += ny * overlap;

            const vn = ball.vx * nx + ball.vy * ny;
            if (vn < 0) {
              ball.vx -= (1 + e) * vn * nx;
              ball.vy -= (1 + e) * vn * ny;
            }
          }
        });
      });
    }

    function draw() {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      physicsObjects.forEach(obj => {
        ctx.fillStyle = obj.color;
        if (obj.type === 'ball') {
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (obj.type === 'box') {
          ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
      });
    }

    canvas.onclick = (e) => {
      const r = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - r.left) / r.width) * canvas.width;
      const clickY = ((e.clientY - r.top) / r.height) * canvas.height;

      const type = sSpawn.value;
      if (type === 'ball') {
        physicsObjects.push({
          type: 'ball',
          x: clickX,
          y: clickY,
          r: 8,
          vx: (Math.random() * 2 - 1) * 2,
          vy: -2,
          mass: 1,
          color: '#10b981',
          static: false
        });
      } else if (type === 'box') {
        physicsObjects.push({
          type: 'box',
          x: clickX - 25,
          y: clickY - 6,
          w: 50,
          h: 12,
          color: '#eab308',
          static: true
        });
      }
      draw();
    };

    let localLoopActive = true;
    function loop() {
      if (!localLoopActive) return;
      requestAnimationFrame(loop);
      if (isPlayingPhysics) {
        updatePhysics();
      }
      draw();
    }

    loop();

    function startPhysics() {
      isPlayingPhysics = true;
      const playBtn = document.getElementById('btnPlayPhys');
      if (playBtn) playBtn.style.background = '#059669';
    }

    function stopPhysics() {
      isPlayingPhysics = false;
      const playBtn = document.getElementById('btnPlayPhys');
      if (playBtn) playBtn.style.background = '#10b981';
    }

    document.getElementById('btnPlayPhys').onclick = startPhysics;
    document.getElementById('btnStopPhys').onclick = stopPhysics;

    document.getElementById('btnPhysClear').onclick = () => {
      physicsObjects = [];
      draw();
    };

    const originalInitGDSUltra = window.initGDSUltra;
    window.initGDSUltra = function(lang) {
      localLoopActive = false;
      originalInitGDSUltra(lang);
    };

    document.getElementById('btnInjectPhysics').onclick = () => {
      const objectsJson = JSON.stringify(physicsObjects);
      const gravityVal = sGravity.value;
      const elasticVal = sElastic.value;

      const code = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>2D Rigidbody Physics Engine</title>
  <style>
    body { margin: 0; background: #05070c; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; font-family: sans-serif; box-sizing: border-box; padding: 15px; }
    .sandbox-container { display: flex; flex-direction: column; align-items: center; gap: 15px; max-width: 100%; box-sizing: border-box; }
    
    .screen {
      width: 640px;
      height: 400px;
      background: #020617;
      border: 3px solid #10b981;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 35px rgba(16, 185, 129, 0.3);
      position: relative;
      max-width: 100%;
      max-height: calc(100vh - 120px);
    }
    
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .controls-hud {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(0,0,0,0.7);
      border: 1px solid rgba(16,185,129,0.3);
      padding: 10px 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      pointer-events: none;
      color: #10b981;
    }

    .toolbar {
      display: flex;
      gap: 10px;
    }

    .btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #fff;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
    }

    .btn.active {
      background: #10b981;
      color: #000;
      border-color: #10b981;
    }
  </style>
</head>
<body>

  <div class="sandbox-container">
    <div class="screen">
      <div class="controls-hud">
        🕹️ Physics Sandbox<br>
        <span style="color:#fff;">Click Screen to Spawn Object</span>
      </div>
      <canvas id="physCanvas" width="640" height="400"></canvas>
    </div>

    <div class="toolbar">
      <button class="btn active" id="toolBall" onclick="setTool('ball')">🟢 Dynamic Ball</button>
      <button class="btn" id="toolBox" onclick="setTool('box')">🟧 Static Platform</button>
      <button class="btn" style="border-color:#ef4444; color:#ef4444;" onclick="clearSandbox()">🧹 Clear</button>
    </div>
  </div>

  <script>
    (function() {
      const canvas = document.getElementById('physCanvas');
      const ctx = canvas.getContext('2d');

      let objects = ${objectsJson};
      const gravity = ${gravityVal};
      const restitution = ${elasticVal};
      let spawnType = 'ball';

      window.setTool = function(type) {
        spawnType = type;
        document.getElementById('toolBall').classList.toggle('active', type === 'ball');
        document.getElementById('toolBox').classList.toggle('active', type === 'box');
      };

      window.clearSandbox = function() {
        objects = [];
      };

      canvas.addEventListener('click', e => {
        const r = canvas.getBoundingClientRect();
        const clickX = ((e.clientX - r.left) / r.width) * canvas.width;
        const clickY = ((e.clientY - r.top) / r.height) * canvas.height;

        if (spawnType === 'ball') {
          objects.push({
            type: 'ball',
            x: clickX,
            y: clickY,
            r: 15,
            vx: (Math.random() * 4 - 2),
            vy: -4,
            mass: 1,
            color: '#10b981',
            static: false
          });
        } else {
          objects.push({
            type: 'box',
            x: clickX - 60,
            y: clickY - 12,
            w: 120,
            h: 24,
            color: '#eab308',
            static: true
          });
        }
      });

      function update() {
        const w = canvas.width;
        const h = canvas.height;

        // Apply Forces
        objects.forEach(obj => {
          if (!obj.static) {
            obj.vy += gravity;
            obj.x += obj.vx;
            obj.y += obj.vy;

            // Boundaries
            if (obj.y > h - obj.r) { obj.y = h - obj.r; obj.vy = -obj.vy * restitution; }
            if (obj.y < obj.r) { obj.y = obj.r; obj.vy = -obj.vy * restitution; }
            if (obj.x > w - obj.r) { obj.x = w - obj.r; obj.vx = -obj.vx * restitution; }
            if (obj.x < obj.r) { obj.x = obj.r; obj.vx = -obj.vx * restitution; }
          }
        });

        // Resolve Ball-to-Ball
        for (let i = 0; i < objects.length; i++) {
          for (let j = i + 1; j < objects.length; j++) {
            const o1 = objects[i];
            const o2 = objects[j];

            if (o1.type === 'ball' && o2.type === 'ball') {
              const dx = o2.x - o1.x;
              const dy = o2.y - o1.y;
              const dist = Math.hypot(dx, dy);
              const minDist = o1.r + o2.r;

              if (dist < minDist) {
                const overlap = minDist - dist;
                const nx = dx / (dist || 1);
                const ny = dy / (dist || 1);

                if (!o1.static) { o1.x -= nx * overlap * 0.5; o1.y -= ny * overlap * 0.5; }
                if (!o2.static) { o2.x += nx * overlap * 0.5; o2.y += ny * overlap * 0.5; }

                const kx = o1.vx - o2.vx;
                const ky = o1.vy - o2.vy;
                const vn = kx * nx + ky * ny;
                if (vn > 0) {
                  const impulse = (2 * vn) / (o1.mass + o2.mass);
                  const ix = nx * impulse * restitution;
                  const iy = ny * impulse * restitution;
                  if (!o1.static) { o1.vx -= ix * o2.mass; o1.vy -= iy * o2.mass; }
                  if (!o2.static) { o2.vx += ix * o1.mass; o2.vy += iy * o1.mass; }
                }
              }
            }
          }
        }

        // Resolve Ball-to-Box
        objects.forEach(ball => {
          if (ball.type !== 'ball' || ball.static) return;

          objects.forEach(box => {
            if (box.type !== 'box') return;

            const cx = Math.max(box.x, Math.min(ball.x, box.x + box.w));
            const cy = Math.max(box.y, Math.min(ball.y, box.y + box.h));

            const dx = ball.x - cx;
            const dy = ball.y - cy;
            const dist = Math.hypot(dx, dy);

            if (dist < ball.r) {
              const nx = dist > 0 ? dx / dist : 0;
              const ny = dist > 0 ? dy / dist : -1;
              const overlap = ball.r - dist;

              ball.x += nx * overlap;
              ball.y += ny * overlap;

              const vn = ball.vx * nx + ball.vy * ny;
              if (vn < 0) {
                ball.vx -= (1 + restitution) * vn * nx;
                ball.vy -= (1 + restitution) * vn * ny;
              }
            }
          });
        });
      }

      function draw() {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        objects.forEach(obj => {
          ctx.fillStyle = obj.color;
          if (obj.type === 'ball') {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
          }
        });
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
      window._injectGDSUltraCode(code);
    };
  }

  console.log('🌌 Game Dev Studio ULTRA loaded successfully!');
})();
