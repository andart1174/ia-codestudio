// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — CODE & DESIGN GENETIC EVOLUTION LAB (v1.0)
// UltraCodeEvolutionLab (modal-code-evolution-lab)
// 100% Client-Side Genetic Algorithm & Generative UI Phenotype Mutator
// 4-Specimen Breeding Grid, Cross-Over, Chromosome Mutator & Fitness Scoring
// ══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function _isFr() {
    return (typeof currentLang !== 'undefined' && currentLang === 'fr');
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg);
    } else if (typeof window.showToast === 'function') {
      window.showToast(msg);
    } else {
      console.log('[UltraCodeEvolutionLab]', msg);
    }
  }

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && UltraSoundFX.play) {
      try { UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _confetti() {
    if (typeof UltraConfetti !== 'undefined' && UltraConfetti.fire) {
      try { UltraConfetti.fire(60); } catch(e){}
    }
  }

  function _injectCodeToActiveApp(snippet, markerRegex, label) {
    const isFr = _isFr();
    const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

    if (targetApp) {
      // 1. Update HTML tab code
      if (targetApp.html !== undefined) {
        if (markerRegex) {
          targetApp.html = targetApp.html.replace(markerRegex, '');
        }
        targetApp.html = targetApp.html.trim() + '\n\n' + snippet;
      }

      // 2. Update Full HTML document if present or if in full mode
      if (targetApp.full !== undefined && targetApp.full) {
        if (markerRegex) {
          targetApp.full = targetApp.full.replace(markerRegex, '');
        }
        if (targetApp.full.includes('</body>')) {
          targetApp.full = targetApp.full.replace('</body>', snippet + '\n</body>');
        } else {
          targetApp.full = targetApp.full.trim() + '\n\n' + snippet;
        }
      }

      // 3. Update editor value matching the currently active tab
      if (targetApp.editor) {
        try {
          if (targetApp.currentTab === 'full') {
            targetApp.editor.setValue(targetApp.full || targetApp.html);
          } else if (targetApp.currentTab === 'html' || !targetApp.currentTab) {
            targetApp.editor.setValue(targetApp.html);
          }
        } catch(e){}
      }

      if (typeof window.refreshPreview === 'function') {
        window.refreshPreview();
      } else if (typeof refreshPreview === 'function') {
        refreshPreview();
      }

      _sound('sparkle');
      _confetti();
      _toast(
        isFr
          ? `✨ ${label || 'Génome Évolutif'} injecté dans votre projet avec succès !`
          : `✨ ${label || 'Evolutionary Genome'} successfully injected into your project!`,
        'success'
      );
    } else {
      _toast(
        isFr
          ? '⚠️ Aucun projet actif trouvé dans l\'éditeur pour l\'injection.'
          : '⚠️ No active project found in editor to inject into.',
        'warning'
      );
    }
  }

  const UltraCodeEvolutionLab = {
    isOpen: false,
    generation: 1,
    mutationRate: 0.15, // 15% cosmic mutation

    specimens: [
      {
        id: 'alpha',
        name: 'Specimen Alpha (Cyber Neon)',
        fitness: 94,
        genome: {
          bg: '#050a18',
          cardBg: 'rgba(11,20,44,0.85)',
          primary: '#00f3ff',
          accent: '#8b5cf6',
          radius: 10,
          blur: 16,
          font: "'Outfit', sans-serif",
          glow: '0 0 20px rgba(0,243,255,0.45)'
        }
      },
      {
        id: 'beta',
        name: 'Specimen Beta (Silicon Clean)',
        fitness: 97,
        genome: {
          bg: '#0a0f1d',
          cardBg: 'rgba(15,23,42,0.9)',
          primary: '#38bdf8',
          accent: '#10b981',
          radius: 16,
          blur: 12,
          font: "system-ui, -apple-system, sans-serif",
          glow: '0 8px 24px rgba(56,189,248,0.25)'
        }
      },
      {
        id: 'gamma',
        name: 'Specimen Gamma (Fintech Emerald)',
        fitness: 91,
        genome: {
          bg: '#04130f',
          cardBg: 'rgba(6,28,22,0.88)',
          primary: '#10b981',
          accent: '#f59e0b',
          radius: 14,
          blur: 14,
          font: "'Outfit', sans-serif",
          glow: '0 0 22px rgba(16,185,129,0.35)'
        }
      },
      {
        id: 'delta',
        name: 'Specimen Delta (Cosmic Violet)',
        fitness: 95,
        genome: {
          bg: '#12071a',
          cardBg: 'rgba(28,11,40,0.88)',
          primary: '#c084fc',
          accent: '#ec4899',
          radius: 20,
          blur: 20,
          font: "system-ui, sans-serif",
          glow: '0 0 24px rgba(192,132,252,0.4)'
        }
      }
    ],

    open() {
      const modal = document.getElementById('modal-code-evolution-lab');
      if (!modal) {
        console.error('[UltraCodeEvolutionLab] modal-code-evolution-lab not found');
        return;
      }
      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      this.renderSpecimens();
      _toast(_isFr() ? '🧬 Laboratoire d\'Évolution Génétique UI activé !' : '🧬 UI Code Genetic Evolution Lab activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-code-evolution-lab');
      if (modal) {
        modal.classList.remove('show', 'active');
        modal.style.display = 'none';
      }
      this.isOpen = false;
      _sound('close');
    },

    renderSpecimens() {
      const grid = document.getElementById('evolution-specimens-grid');
      if (!grid) return;

      const genEl = document.getElementById('evolution-gen-badge');
      if (genEl) genEl.textContent = 'GEN ' + this.generation;

      const isFr = _isFr();
      grid.innerHTML = this.specimens.map(s => {
        const g = s.genome;
        return '<div style="background:' + g.cardBg + ';border:1px solid ' + g.primary + '88;box-shadow:' + g.glow + ';border-radius:' + g.radius + 'px;backdrop-filter:blur(' + g.blur + 'px);padding:14px;display:flex;flex-direction:column;gap:10px;font-family:' + g.font + ';color:#fff;transition:transform 0.2s">\n' +
'  <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'    <strong style="font-size:0.85rem;color:' + g.primary + '">' + s.name + '</strong>\n' +
'    <span style="font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:10px;background:' + g.primary + '25;color:' + g.primary + '">FITNESS: ' + s.fitness + '%</span>\n' +
'  </div>\n' +
'  <div style="padding:10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px dashed rgba(255,255,255,0.1)">\n' +
'    <div style="font-size:0.75rem;font-weight:700;margin-bottom:4px">Phenotype Preview</div>\n' +
'    <div style="display:flex;gap:6px;margin-bottom:6px">\n' +
'      <button style="background:' + g.primary + ';border:none;color:#000;font-weight:800;padding:4px 10px;border-radius:' + Math.round(g.radius*0.6) + 'px;font-size:0.7rem;cursor:pointer">Action</button>\n' +
'      <button style="background:transparent;border:1px solid ' + g.accent + ';color:' + g.accent + ';font-weight:700;padding:4px 8px;border-radius:' + Math.round(g.radius*0.6) + 'px;font-size:0.7rem;cursor:pointer">Secondary</button>\n' +
'    </div>\n' +
'    <div style="font-size:0.68rem;color:#94a3b8">Radius: ' + g.radius + 'px · Blur: ' + g.blur + 'px · Font: ' + g.font.split(',')[0].replace(/['"]/g, '') + '</div>\n' +
'  </div>\n' +
'  <div style="display:flex;gap:5px;margin-top:auto">\n' +
'    <button class="tb-btn" onclick="UltraCodeEvolutionLab.mutate(\'' + s.id + '\')" style="flex:1;font-size:0.68rem;padding:4px" title="Apply random mutation">🧬 ' + (isFr ? 'Muter' : 'Mutate') + '</button>\n' +
'    <button class="tb-btn" onclick="UltraCodeEvolutionLab.applyToProject(\'' + s.id + '\')" style="flex:1;font-size:0.68rem;padding:4px;border-color:' + g.primary + ';color:' + g.primary + '" title="Apply genome to editor">⚡ ' + (isFr ? 'Adopter' : 'Adopt') + '</button>\n' +
'  </div>\n' +
'</div>';
      }).join('');
    },

    mutate(id) {
      _sound('sparkle');
      const s = this.specimens.find(x => x.id === id);
      if (!s) return;

      const colors = ['#00f3ff', '#38bdf8', '#8b5cf6', '#a855f7', '#10b981', '#34d399', '#f59e0b', '#ec4899'];
      s.genome.primary = colors[Math.floor(Math.random() * colors.length)];
      s.genome.accent = colors[Math.floor(Math.random() * colors.length)];
      s.genome.radius = Math.floor(Math.random() * 22) + 4;
      s.genome.blur = Math.floor(Math.random() * 18) + 6;
      s.genome.glow = '0 0 ' + (Math.floor(Math.random() * 20) + 10) + 'px ' + s.genome.primary + '55';
      s.fitness = Math.floor(Math.random() * 10) + 90;

      this.renderSpecimens();
      _toast(_isFr() ? `Mutation génétique appliquée sur ${s.name} !` : `Genetic mutation applied to ${s.name}!`, 'info');
    },

    evolveGeneration() {
      _sound('build');
      this.generation++;
      const pA = this.specimens[0];
      const pB = this.specimens[1];

      // Cross-over traits
      this.specimens[2].genome.primary = pA.genome.primary;
      this.specimens[2].genome.radius = pB.genome.radius;
      this.specimens[2].genome.blur = pA.genome.blur;
      this.specimens[2].fitness = Math.min(99, Math.max(90, Math.floor((pA.fitness + pB.fitness) / 2) + 2));

      this.specimens[3].genome.accent = pB.genome.accent;
      this.specimens[3].genome.cardBg = pA.genome.cardBg;
      this.specimens[3].fitness = Math.min(99, Math.max(90, Math.floor((pA.fitness + pB.fitness) / 2) + 1));

      this.renderSpecimens();
      _confetti();
      _toast(
        _isFr()
          ? `🧬 Génération ${this.generation} sélectionnée et hybridée avec succès !`
          : `🧬 Generation ${this.generation} evolved and cross-bred successfully!`,
        'success'
      );
    },

    evolveNextGen() {
      return this.evolveGeneration();
    },

    crossOver() {
      if (this.specimens && this.specimens.length >= 2) {
        _sound('sparkle');
        const p1 = this.specimens[0];
        const p2 = this.specimens[1];
        const hybrid = {
          id: 'hybrid_' + (this.generation + 1),
          name: 'Specimen Hybrid-Ω' + (this.generation + 1),
          fitness: Math.min(99, Math.round((p1.fitness + p2.fitness) / 2 + 5)),
          genome: {
            bg: p1.genome.bg,
            cardBg: p2.genome.cardBg,
            primary: p1.genome.primary,
            accent: p2.genome.accent,
            radius: Math.round((p1.genome.radius + p2.genome.radius) / 2),
            blur: Math.round((p1.genome.blur + p2.genome.blur) / 2),
            font: p1.genome.font,
            glow: '0 0 20px ' + p1.genome.primary + '55'
          }
        };
        this.specimens[3] = hybrid;
        this.renderSpecimens();
        _confetti();
        _toast(_isFr() ? '⚡ Croisement chromosomique synthétisé !' : '⚡ Chromosome cross-over synthesized!', 'success');
      }
    },

    resetPool() {
      _sound('click');
      this.generation = 1;
      this.specimens = [
        {
          id: 'alpha',
          name: 'Specimen Alpha (Cyber Neon)',
          fitness: 94,
          genome: {
            bg: '#050a18',
            cardBg: 'rgba(11,20,44,0.85)',
            primary: '#00f3ff',
            accent: '#8b5cf6',
            radius: 10,
            blur: 16,
            font: "'Outfit', sans-serif",
            glow: '0 0 20px rgba(0,243,255,0.45)'
          }
        },
        {
          id: 'beta',
          name: 'Specimen Beta (Silicon Clean)',
          fitness: 97,
          genome: {
            bg: '#0a0f1d',
            cardBg: 'rgba(15,23,42,0.9)',
            primary: '#38bdf8',
            accent: '#10b981',
            radius: 16,
            blur: 12,
            font: "system-ui, -apple-system, sans-serif",
            glow: '0 8px 24px rgba(56,189,248,0.25)'
          }
        },
        {
          id: 'gamma',
          name: 'Specimen Gamma (Fintech Emerald)',
          fitness: 91,
          genome: {
            bg: '#04130f',
            cardBg: 'rgba(6,28,22,0.88)',
            primary: '#10b981',
            accent: '#f59e0b',
            radius: 14,
            blur: 14,
            font: "'Outfit', sans-serif",
            glow: '0 0 22px rgba(16,185,129,0.35)'
          }
        },
        {
          id: 'delta',
          name: 'Specimen Delta (Cosmic Violet)',
          fitness: 95,
          genome: {
            bg: '#12071a',
            cardBg: 'rgba(28,11,40,0.88)',
            primary: '#c084fc',
            accent: '#ec4899',
            radius: 20,
            blur: 20,
            font: "system-ui, sans-serif",
            glow: '0 0 24px rgba(192,132,252,0.4)'
          }
        }
      ];
      this.renderSpecimens();
      _toast(_isFr() ? '↺ Bassin génétique réinitialisé à la Génération 1' : '↺ Gene pool reset to Generation 1', 'info');
    },

    applyToProject(id) {
      _sound('sparkle');
      let s;
      if (!id) {
        const sorted = [...this.specimens].sort((a, b) => b.fitness - a.fitness);
        s = sorted[0];
      } else {
        s = this.specimens.find(x => x.id === id) || this.specimens[0];
      }
      if (!s) return;
      const g = s.genome;

      const styleSnippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA GENETIC EVOLUTION DESIGN TOKENS (Gen ' + this.generation + ' · ' + s.name + ')              -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-genetic-active-banner" style="position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:99998;background:' + g.cardBg + ';border:2px solid ' + g.primary + ';box-shadow:' + g.glow + ';border-radius:24px;padding:6px 20px;font-family:' + g.font + ';color:#fff;display:flex;align-items:center;gap:10px;backdrop-filter:blur(' + g.blur + 'px);pointer-events:none">\n' +
'  <span style="font-size:1.1rem">🧬</span>\n' +
'  <span style="font-size:0.78rem;font-weight:800;color:' + g.primary + '">Genome Active: ' + s.name + ' (' + s.fitness + '% Fitness)</span>\n' +
'</div>\n' +
'<style id="ultra-genetic-tokens">\n' +
'  :root {\n' +
'    --evolve-primary: ' + g.primary + ';\n' +
'    --evolve-accent: ' + g.accent + ';\n' +
'    --evolve-radius: ' + g.radius + 'px;\n' +
'    --evolve-blur: ' + g.blur + 'px;\n' +
'    --evolve-glow: ' + g.glow + ';\n' +
'  }\n' +
'  body { background: ' + g.bg + ' !important; font-family: ' + g.font + ' !important; }\n' +
'  .card, .panel, .modal-box, section, .hud-card { border-radius: var(--evolve-radius) !important; border-color: var(--evolve-primary) !important; backdrop-filter: blur(var(--evolve-blur)) !important; }\n' +
'  .btn-primary, button.primary, .btn-action { background: var(--evolve-primary) !important; color: #000 !important; font-weight: 800 !important; box-shadow: var(--evolve-glow) !important; border-radius: calc(var(--evolve-radius) * 0.7) !important; }\n' +
'</style>';

      _injectCodeToActiveApp(styleSnippet, /<!-- ULTRA GENETIC EVOLUTION DESIGN TOKENS[\s\S]*?<\/style>/g, 'Design Genome (' + s.name + ')');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECT (INTERACTIVE LAB CARD IN APPLICATION)
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      _sound('sparkle');
      const curGen = this.generation;

      const labSnippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA GENETIC EVOLUTION LAB WIDGET (100% Client-Side Algorithm)   -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-genetic-lab-widget" style="margin:24px 0;background:linear-gradient(135deg,rgba(9,14,28,0.96) 0%,rgba(6,10,23,0.98) 100%);border:1.5px solid rgba(245,158,11,0.5);border-radius:20px;padding:20px;box-shadow:0 16px 48px rgba(0,0,0,0.6),0 0 24px rgba(245,158,11,0.25);font-family:system-ui,-apple-system,sans-serif;color:#fff;position:relative;overflow:hidden">\n' +
'  <!-- Header Bar -->\n' +
'  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:14px">\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <span style="font-size:1.5rem">🧬</span>\n' +
'      <div>\n' +
'        <h4 style="margin:0;font-size:1.1rem;font-weight:900;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent">UI Code &amp; Design Genetic Evolution Lab</h4>\n' +
'        <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8">Darwinian Genetic Algorithm for UI/UX Chromosomes · In-App Breeding Grid</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <!-- Controls Toolbar -->\n' +
'    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">\n' +
'      <span id="widget-gen-badge" style="font-size:0.75rem;padding:4px 12px;border-radius:12px;background:rgba(245,158,11,0.15);color:#fbbf24;font-weight:800;border:1px solid rgba(245,158,11,0.3)">GEN ' + curGen + '</span>\n' +
'      <button id="widget-breed-btn" style="background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;border:none;font-weight:800;font-size:0.75rem;padding:6px 14px;border-radius:10px;cursor:pointer;transition:all 0.2s">🧬 Breed Next Gen</button>\n' +
'      <button id="widget-cross-btn" style="background:rgba(139,92,246,0.2);border:1px solid #8b5cf6;color:#c084fc;font-weight:800;font-size:0.75rem;padding:6px 12px;border-radius:10px;cursor:pointer;transition:all 0.2s">⚡ Cross-Over</button>\n' +
'      <button id="widget-reset-btn" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#94a3b8;font-weight:700;font-size:0.75rem;padding:6px 12px;border-radius:10px;cursor:pointer;transition:all 0.2s">↺ Reset Pool</button>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <!-- Specimens Grid -->\n' +
'  <div id="widget-specimens-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px"></div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var gen = ' + curGen + ';\n' +
'  var colors = ["#00f3ff", "#38bdf8", "#8b5cf6", "#a855f7", "#10b981", "#34d399", "#f59e0b", "#ec4899"];\n' +
'  var specimens = [\n' +
'    {\n' +
'      id: "alpha",\n' +
'      name: "Specimen Alpha (Cyber Neon)",\n' +
'      fitness: 94,\n' +
'      genome: { bg: "#050a18", cardBg: "rgba(11,20,44,0.88)", primary: "#00f3ff", accent: "#8b5cf6", radius: 10, blur: 16, font: "\'Outfit\', sans-serif", glow: "0 0 20px rgba(0,243,255,0.45)" }\n' +
'    },\n' +
'    {\n' +
'      id: "beta",\n' +
'      name: "Specimen Beta (Silicon Clean)",\n' +
'      fitness: 97,\n' +
'      genome: { bg: "#0a0f1d", cardBg: "rgba(15,23,42,0.92)", primary: "#38bdf8", accent: "#10b981", radius: 16, blur: 12, font: "system-ui, -apple-system, sans-serif", glow: "0 8px 24px rgba(56,189,248,0.25)" }\n' +
'    },\n' +
'    {\n' +
'      id: "gamma",\n' +
'      name: "Specimen Gamma (Fintech Emerald)",\n' +
'      fitness: 91,\n' +
'      genome: { bg: "#04130f", cardBg: "rgba(6,28,22,0.9)", primary: "#10b981", accent: "#f59e0b", radius: 14, blur: 14, font: "\'Outfit\', sans-serif", glow: "0 0 22px rgba(16,185,129,0.35)" }\n' +
'    },\n' +
'    {\n' +
'      id: "delta",\n' +
'      name: "Specimen Delta (Cosmic Violet)",\n' +
'      fitness: 95,\n' +
'      genome: { bg: "#12071a", cardBg: "rgba(28,11,40,0.9)", primary: "#c084fc", accent: "#ec4899", radius: 20, blur: 20, font: "system-ui, sans-serif", glow: "0 0 24px rgba(192,132,252,0.4)" }\n' +
'    }\n' +
'  ];\n' +
'\n' +
'  function playAudio(freq) {\n' +
'    try {\n' +
'      var ctx = new (window.AudioContext || window.webkitAudioContext)();\n' +
'      var osc = ctx.createOscillator();\n' +
'      var g = ctx.createGain();\n' +
'      osc.type = "sine";\n' +
'      osc.frequency.setValueAtTime(freq || 660, ctx.currentTime);\n' +
'      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.12);\n' +
'      g.gain.setValueAtTime(0.15, ctx.currentTime);\n' +
'      g.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);\n' +
'      osc.connect(g); g.connect(ctx.destination);\n' +
'      osc.start(); osc.stop(ctx.currentTime + 0.13);\n' +
'    } catch(e){}\n' +
'  }\n' +
'\n' +
'  function renderWidget() {\n' +
'    var grid = document.getElementById("widget-specimens-grid");\n' +
'    var badge = document.getElementById("widget-gen-badge");\n' +
'    if (badge) badge.textContent = "GEN " + gen;\n' +
'    if (!grid) return;\n' +
'\n' +
'    grid.innerHTML = specimens.map(function(s, idx) {\n' +
'      var g = s.genome;\n' +
'      var fontClean = g.font.split(",")[0].replace(/[\'\\"]/g, "");\n' +
'      return \'<\' + \'div class="injected-specimen-card" style="background:\' + g.cardBg + \';border:1.5px solid \' + g.primary + \'88;box-shadow:\' + g.glow + \';border-radius:\' + g.radius + \'px;backdrop-filter:blur(\' + g.blur + \'px);padding:14px;display:flex;flex-direction:column;gap:10px;font-family:\' + g.font + \';color:#fff;transition:transform 0.2s">\'+' +
'\'<\' + \'div style="display:flex;justify-content:space-between;align-items:center">\'+' +
'\'<\' + \'strong style="font-size:0.84rem;color:\' + g.primary + \'">\' + s.name + \'<\' + \'/strong>\'+' +
'\'<\' + \'span style="font-size:0.68rem;font-weight:800;padding:2px 8px;border-radius:10px;background:\' + g.primary + \'25;color:\' + g.primary + \'">FITNESS: \' + s.fitness + \'%<\' + \'/span>\'+' +
'\'<\' + \'/div>\'+' +
'\'<\' + \'div style="padding:10px;background:rgba(0,0,0,0.35);border-radius:8px;border:1px dashed rgba(255,255,255,0.1)">\'+' +
'\'<\' + \'div style="font-size:0.72rem;font-weight:700;margin-bottom:6px;color:#94a3b8">Phenotype Preview<\' + \'/div>\'+' +
'\'<\' + \'div style="display:flex;gap:6px;margin-bottom:6px">\'+' +
'\'<\' + \'button style="flex:1;background:\' + g.primary + \';border:none;color:#000;font-weight:800;padding:5px 10px;border-radius:\' + Math.round(g.radius * 0.6) + \'px;font-size:0.72rem;cursor:pointer">Action<\' + \'/button>\'+' +
'\'<\' + \'button style="flex:1;background:transparent;border:1px solid \' + g.accent + \';color:\' + g.accent + \';font-weight:700;padding:5px 8px;border-radius:\' + Math.round(g.radius * 0.6) + \'px;font-size:0.72rem;cursor:pointer">Secondary<\' + \'/button>\'+' +
'\'<\' + \'/div>\'+' +
'\'<\' + \'div style="font-size:0.68rem;color:#94a3b8">Radius: \' + g.radius + \'px · Blur: \' + g.blur + \'px · Font: \' + fontClean + \'<\' + \'/div>\'+' +
'\'<\' + \'/div>\'+' +
'\'<\' + \'div style="display:flex;gap:6px;margin-top:auto">\'+' +
'\'<\' + \'button onclick="window.__mutateInjectedSpecimen(\' + idx + \')" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;font-size:0.7rem;font-weight:700;padding:6px;border-radius:8px;cursor:pointer" title="Mutate specimen">🧬 Mutate<\' + \'/button>\'+' +
'\'<\' + \'button onclick="window.__adoptInjectedSpecimen(\' + idx + \')" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid \' + g.primary + \';color:\' + g.primary + \';font-size:0.7rem;font-weight:800;padding:6px;border-radius:8px;cursor:pointer" title="Adopt into application">⚡ Adopt<\' + \'/button>\'+' +
'\'<\' + \'/div>\'+' +
'\'<\' + \'/div>\';' +
'    }).join("");\n' +
'  }\n' +
'\n' +
'  window.__evolveLabWidget = function() {\n' +
'    playAudio(880);\n' +
'    gen++;\n' +
'    var pA = specimens[0], pB = specimens[1];\n' +
'    specimens[2].genome.primary = pA.genome.primary;\n' +
'    specimens[2].genome.radius = pB.genome.radius;\n' +
'    specimens[2].genome.blur = pA.genome.blur;\n' +
'    specimens[2].fitness = Math.min(99, Math.max(90, Math.floor((pA.fitness + pB.fitness) / 2) + 2));\n' +
'    specimens[3].genome.accent = pB.genome.accent;\n' +
'    specimens[3].genome.radius = Math.floor((pA.genome.radius + pB.genome.radius) / 2);\n' +
'    specimens[3].fitness = Math.min(99, Math.max(90, Math.floor((pA.fitness + pB.fitness) / 2) + 1));\n' +
'    renderWidget();\n' +
'  };\n' +
'\n' +
'  window.__crossOverInjected = function() {\n' +
'    playAudio(1040);\n' +
'    var p1 = specimens[0], p2 = specimens[1];\n' +
'    var hybrid = {\n' +
'      id: "hybrid_" + (gen + 1),\n' +
'      name: "Specimen Hybrid-Ω" + (gen + 1),\n' +
'      fitness: Math.min(99, Math.round((p1.fitness + p2.fitness) / 2 + 4)),\n' +
'      genome: {\n' +
'        bg: p1.genome.bg,\n' +
'        cardBg: p2.genome.cardBg,\n' +
'        primary: p1.genome.primary,\n' +
'        accent: p2.genome.accent,\n' +
'        radius: Math.round((p1.genome.radius + p2.genome.radius) / 2),\n' +
'        blur: Math.round((p1.genome.blur + p2.genome.blur) / 2),\n' +
'        font: p1.genome.font,\n' +
'        glow: "0 0 22px " + p1.genome.primary + "55"\n' +
'      }\n' +
'    };\n' +
'    specimens.pop();\n' +
'    specimens.unshift(hybrid);\n' +
'    renderWidget();\n' +
'  };\n' +
'\n' +
'  window.__mutateInjectedSpecimen = function(idx) {\n' +
'    playAudio(720);\n' +
'    var s = specimens[idx];\n' +
'    if (!s) return;\n' +
'    s.genome.primary = colors[Math.floor(Math.random() * colors.length)];\n' +
'    s.genome.accent = colors[Math.floor(Math.random() * colors.length)];\n' +
'    s.genome.radius = Math.floor(Math.random() * 20) + 6;\n' +
'    s.genome.blur = Math.floor(Math.random() * 16) + 6;\n' +
'    s.genome.glow = "0 0 " + (Math.floor(Math.random() * 18) + 12) + "px " + s.genome.primary + "55";\n' +
'    s.fitness = Math.min(99, Math.floor(Math.random() * 10) + 90);\n' +
'    renderWidget();\n' +
'  };\n' +
'\n' +
'  window.__resetInjectedPool = function() {\n' +
'    playAudio(520);\n' +
'    gen = 1;\n' +
'    specimens = [\n' +
'      {\n' +
'        id: "alpha",\n' +
'        name: "Specimen Alpha (Cyber Neon)",\n' +
'        fitness: 94,\n' +
'        genome: { bg: "#050a18", cardBg: "rgba(11,20,44,0.88)", primary: "#00f3ff", accent: "#8b5cf6", radius: 10, blur: 16, font: "\'Outfit\', sans-serif", glow: "0 0 20px rgba(0,243,255,0.45)" }\n' +
'      },\n' +
'      {\n' +
'        id: "beta",\n' +
'        name: "Specimen Beta (Silicon Clean)",\n' +
'        fitness: 97,\n' +
'        genome: { bg: "#0a0f1d", cardBg: "rgba(15,23,42,0.92)", primary: "#38bdf8", accent: "#10b981", radius: 16, blur: 12, font: "system-ui, -apple-system, sans-serif", glow: "0 8px 24px rgba(56,189,248,0.25)" }\n' +
'      },\n' +
'      {\n' +
'        id: "gamma",\n' +
'        name: "Specimen Gamma (Fintech Emerald)",\n' +
'        fitness: 91,\n' +
'        genome: { bg: "#04130f", cardBg: "rgba(6,28,22,0.9)", primary: "#10b981", accent: "#f59e0b", radius: 14, blur: 14, font: "\'Outfit\', sans-serif", glow: "0 0 22px rgba(16,185,129,0.35)" }\n' +
'      },\n' +
'      {\n' +
'        id: "delta",\n' +
'        name: "Specimen Delta (Cosmic Violet)",\n' +
'        fitness: 95,\n' +
'        genome: { bg: "#12071a", cardBg: "rgba(28,11,40,0.9)", primary: "#c084fc", accent: "#ec4899", radius: 20, blur: 20, font: "system-ui, sans-serif", glow: "0 0 24px rgba(192,132,252,0.4)" }\n' +
'      }\n' +
'    ];\n' +
'    renderWidget();\n' +
'  };\n' +
'\n' +
'  window.__adoptInjectedSpecimen = function(idx) {\n' +
'    playAudio(990);\n' +
'    var s = specimens[idx];\n' +
'    if (!s) return;\n' +
'    var g = s.genome;\n' +
'    var st = document.getElementById("ultra-genetic-tokens");\n' +
'    if (!st) {\n' +
'      st = document.createElement("style");\n' +
'      st.id = "ultra-genetic-tokens";\n' +
'      document.head.appendChild(st);\n' +
'    }\n' +
'    st.textContent = ":root { --evolve-primary: " + g.primary + "; --evolve-accent: " + g.accent + "; --evolve-radius: " + g.radius + "px; --evolve-blur: " + g.blur + "px; --evolve-glow: " + g.glow + "; } body { background: " + g.bg + " !important; font-family: " + g.font + " !important; } .card, .panel, .modal-box { border-radius: var(--evolve-radius) !important; border-color: var(--evolve-primary) !important; } button.btn-primary { background: var(--evolve-primary) !important; color: #000 !important; }";\n' +
'    var banner = document.getElementById("ultra-genetic-active-banner");\n' +
'    if (!banner) {\n' +
'      banner = document.createElement("div");\n' +
'      banner.id = "ultra-genetic-active-banner";\n' +
'      banner.style.cssText = "position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:99998;border-radius:24px;padding:6px 20px;display:flex;align-items:center;gap:10px;pointer-events:none;transition:all 0.3s";\n' +
'      document.body.appendChild(banner);\n' +
'    }\n' +
'    banner.style.background = g.cardBg;\n' +
'    banner.style.border = "2px solid " + g.primary;\n' +
'    banner.style.boxShadow = g.glow;\n' +
'    banner.style.fontFamily = g.font;\n' +
'    banner.innerHTML = \'<span style="font-size:1.1rem">🧬</span><span style="font-size:0.78rem;font-weight:800;color:\' + g.primary + \'">Genome Active: \' + s.name + \' (\' + s.fitness + \'% Fitness)</span>\';\n' +
'  };\n' +
'\n' +
'  var bBtn = document.getElementById("widget-breed-btn");\n' +
'  var cBtn = document.getElementById("widget-cross-btn");\n' +
'  var rBtn = document.getElementById("widget-reset-btn");\n' +
'  if (bBtn) bBtn.addEventListener("click", window.__evolveLabWidget);\n' +
'  if (cBtn) cBtn.addEventListener("click", window.__crossOverInjected);\n' +
'  if (rBtn) rBtn.addEventListener("click", window.__resetInjectedPool);\n' +
'\n' +
'  renderWidget();\n' +
'})();\n' +
'<' + '/script>';

      _injectCodeToActiveApp(labSnippet, /<!-- ═══════════════════════════════════════════════════════════════[\s\S]*?<!-- ULTRA GENETIC EVOLUTION LAB WIDGET[\s\S]*?<\/script>/g, 'Genetic Evolution Lab');
    },

    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Genetic Evolution Lab')) return;
      _sound('download');
      const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>UI Code & Design Genetic Evolution Lab</title>\n' +
'  <style>\n' +
'    * { margin:0; padding:0; box-sizing:border-box; }\n' +
'    body { background:#03050c; color:#fff; font-family:system-ui,-apple-system,sans-serif; min-height:100vh; padding:24px; display:flex; flex-direction:column; }\n' +
'    .hud-header { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.1); }\n' +
'    .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; flex:1; }\n' +
'    .specimen-card { background:rgba(15,23,42,0.88); border:1.5px solid #38bdf888; box-shadow:0 0 24px rgba(56,189,248,0.25); border-radius:16px; padding:18px; display:flex; flex-direction:column; gap:12px; transition:transform 0.2s; }\n' +
'    .specimen-card:hover { transform: translateY(-4px); }\n' +
'    .btn { background:linear-gradient(135deg,#f59e0b,#ef4444); border:none; color:#fff; font-weight:800; padding:8px 16px; border-radius:10px; cursor:pointer; font-size:0.8rem; transition:opacity 0.2s; }\n' +
'    .btn:hover { opacity:0.9; }\n' +
'    .btn-secondary { background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; color:#c084fc; font-weight:800; padding:8px 14px; border-radius:10px; cursor:pointer; font-size:0.8rem; }\n' +
'    .btn-neutral { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#94a3b8; font-weight:700; padding:8px 14px; border-radius:10px; cursor:pointer; font-size:0.8rem; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="active-banner" style="display:none;position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:999;border-radius:24px;padding:6px 20px;display:none;align-items:center;gap:10px"></div>\n' +
'  <div class="hud-header">\n' +
'    <div>\n' +
'      <h2 style="font-size:1.4rem;font-weight:900;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent">🧬 UI Code &amp; Design Genetic Evolution Lab</h2>\n' +
'      <p style="font-size:0.8rem;color:#94a3b8">Generative UI Evolution · Multi-Specimen Breeding Grid</p>\n' +
'    </div>\n' +
'    <div style="display:flex;gap:8px;align-items:center">\n' +
'      <span id="gen-badge" style="font-size:0.8rem;padding:4px 12px;border-radius:12px;background:rgba(245,158,11,0.15);color:#fbbf24;font-weight:800;border:1px solid rgba(245,158,11,0.3)">GEN 1</span>\n' +
'      <button class="btn" onclick="evolve()">🧬 Breed Next Gen</button>\n' +
'      <button class="btn-secondary" onclick="crossOver()">⚡ Cross-Over</button>\n' +
'      <button class="btn-neutral" onclick="resetPool()">↺ Reset</button>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div class="grid" id="specimens-container"></div>\n' +
'  <script>\n' +
'    let gen = 1;\n' +
'    const colors = ["#00f3ff","#38bdf8","#8b5cf6","#a855f7","#10b981","#34d399","#f59e0b","#ec4899"];\n' +
'    let specimens = [\n' +
'      { id: "alpha", name: "Specimen Alpha (Cyber Neon)", fitness: 94, genome: { bg: "#050a18", cardBg: "rgba(11,20,44,0.88)", primary: "#00f3ff", accent: "#8b5cf6", radius: 10, blur: 16, font: "system-ui, sans-serif", glow: "0 0 20px rgba(0,243,255,0.45)" } },\n' +
'      { id: "beta", name: "Specimen Beta (Silicon Clean)", fitness: 97, genome: { bg: "#0a0f1d", cardBg: "rgba(15,23,42,0.92)", primary: "#38bdf8", accent: "#10b981", radius: 16, blur: 12, font: "system-ui, sans-serif", glow: "0 8px 24px rgba(56,189,248,0.25)" } },\n' +
'      { id: "gamma", name: "Specimen Gamma (Fintech Emerald)", fitness: 91, genome: { bg: "#04130f", cardBg: "rgba(6,28,22,0.9)", primary: "#10b981", accent: "#f59e0b", radius: 14, blur: 14, font: "system-ui, sans-serif", glow: "0 0 22px rgba(16,185,129,0.35)" } },\n' +
'      { id: "delta", name: "Specimen Delta (Cosmic Violet)", fitness: 95, genome: { bg: "#12071a", cardBg: "rgba(28,11,40,0.9)", primary: "#c084fc", accent: "#ec4899", radius: 20, blur: 20, font: "system-ui, sans-serif", glow: "0 0 24px rgba(192,132,252,0.4)" } }\n' +
'    ];\n' +
'\n' +
'    function render() {\n' +
'      const box = document.getElementById("specimens-container");\n' +
'      document.getElementById("gen-badge").textContent = "GEN " + gen;\n' +
'      box.innerHTML = specimens.map((s, idx) => {\n' +
'        const g = s.genome;\n' +
'        return `\n' +
'          <div class="specimen-card" style="border-color:${g.primary}88;box-shadow:${g.glow};border-radius:${g.radius}px;background:${g.cardBg}">\n' +
'            <div style="display:flex;justify-content:space-between;align-items:center">\n' +
'              <strong style="color:${g.primary};font-size:0.9rem">${s.name}</strong>\n' +
'              <span style="font-size:0.75rem;color:${g.primary};font-weight:800;background:${g.primary}25;padding:2px 8px;border-radius:10px">FITNESS: ${s.fitness}%</span>\n' +
'            </div>\n' +
'            <div style="padding:10px;background:rgba(0,0,0,0.3);border-radius:8px;border:1px dashed rgba(255,255,255,0.1)">\n' +
'              <div style="font-size:0.75rem;color:#94a3b8;margin-bottom:6px">Phenotype Preview</div>\n' +
'              <div style="display:flex;gap:8px;margin-bottom:6px">\n' +
'                <button style="flex:1;background:${g.primary};color:#000;font-weight:800;border:none;padding:6px;border-radius:${Math.round(g.radius*0.6)}px;cursor:pointer">Action</button>\n' +
'                <button style="flex:1;background:transparent;border:1px solid ${g.accent};color:${g.accent};font-weight:700;padding:6px;border-radius:${Math.round(g.radius*0.6)}px;cursor:pointer">Secondary</button>\n' +
'              </div>\n' +
'              <div style="font-size:0.7rem;color:#94a3b8">Radius: ${g.radius}px · Blur: ${g.blur}px</div>\n' +
'            </div>\n' +
'            <div style="display:flex;gap:6px;margin-top:auto">\n' +
'              <button onclick="mutate(${idx})" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;font-size:0.75rem;font-weight:700;padding:6px;border-radius:8px;cursor:pointer">🧬 Mutate</button>\n' +
'              <button onclick="adopt(${idx})" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid ${g.primary};color:${g.primary};font-size:0.75rem;font-weight:800;padding:6px;border-radius:8px;cursor:pointer">⚡ Adopt</button>\n' +
'            </div>\n' +
'          </div>\n' +
'        `;\n' +
'      }).join("");\n' +
'    }\n' +
'    render();\n' +
'\n' +
'    window.evolve = () => {\n' +
'      gen++;\n' +
'      const pA = specimens[0], pB = specimens[1];\n' +
'      specimens[2].genome.primary = pA.genome.primary;\n' +
'      specimens[2].genome.radius = pB.genome.radius;\n' +
'      specimens[2].fitness = Math.min(99, Math.round((pA.fitness + pB.fitness)/2) + 2);\n' +
'      specimens[3].genome.accent = pB.genome.accent;\n' +
'      specimens[3].fitness = Math.min(99, Math.round((pA.fitness + pB.fitness)/2) + 1);\n' +
'      render();\n' +
'    };\n' +
'    window.crossOver = () => {\n' +
'      const p1 = specimens[0], p2 = specimens[1];\n' +
'      specimens.pop();\n' +
'      specimens.unshift({\n' +
'        id: "hybrid_" + (gen+1),\n' +
'        name: "Specimen Hybrid-Ω" + (gen+1),\n' +
'        fitness: Math.min(99, Math.round((p1.fitness+p2.fitness)/2 + 4)),\n' +
'        genome: { bg: p1.genome.bg, cardBg: p2.genome.cardBg, primary: p1.genome.primary, accent: p2.genome.accent, radius: Math.round((p1.genome.radius+p2.genome.radius)/2), blur: Math.round((p1.genome.blur+p2.genome.blur)/2), font: p1.genome.font, glow: "0 0 20px " + p1.genome.primary + "55" }\n' +
'      });\n' +
'      render();\n' +
'    };\n' +
'    window.mutate = (idx) => {\n' +
'      const s = specimens[idx];\n' +
'      if (!s) return;\n' +
'      s.genome.primary = colors[Math.floor(Math.random()*colors.length)];\n' +
'      s.genome.accent = colors[Math.floor(Math.random()*colors.length)];\n' +
'      s.genome.radius = Math.floor(Math.random()*20)+6;\n' +
'      s.genome.glow = "0 0 20px " + s.genome.primary + "55";\n' +
'      s.fitness = Math.min(99, Math.floor(Math.random()*10)+90);\n' +
'      render();\n' +
'    };\n' +
'    window.resetPool = () => {\n' +
'      gen = 1;\n' +
'      specimens = [\n' +
'        { id: "alpha", name: "Specimen Alpha (Cyber Neon)", fitness: 94, genome: { bg: "#050a18", cardBg: "rgba(11,20,44,0.88)", primary: "#00f3ff", accent: "#8b5cf6", radius: 10, blur: 16, font: "system-ui, sans-serif", glow: "0 0 20px rgba(0,243,255,0.45)" } },\n' +
'        { id: "beta", name: "Specimen Beta (Silicon Clean)", fitness: 97, genome: { bg: "#0a0f1d", cardBg: "rgba(15,23,42,0.92)", primary: "#38bdf8", accent: "#10b981", radius: 16, blur: 12, font: "system-ui, sans-serif", glow: "0 8px 24px rgba(56,189,248,0.25)" } },\n' +
'        { id: "gamma", name: "Specimen Gamma (Fintech Emerald)", fitness: 91, genome: { bg: "#04130f", cardBg: "rgba(6,28,22,0.9)", primary: "#10b981", accent: "#f59e0b", radius: 14, blur: 14, font: "system-ui, sans-serif", glow: "0 0 22px rgba(16,185,129,0.35)" } },\n' +
'        { id: "delta", name: "Specimen Delta (Cosmic Violet)", fitness: 95, genome: { bg: "#12071a", cardBg: "rgba(28,11,40,0.9)", primary: "#c084fc", accent: "#ec4899", radius: 20, blur: 20, font: "system-ui, sans-serif", glow: "0 0 24px rgba(192,132,252,0.4)" } }\n' +
'      ];\n' +
'      render();\n' +
'    };\n' +
'    window.adopt = (idx) => {\n' +
'      const s = specimens[idx];\n' +
'      const g = s.genome;\n' +
'      document.body.style.background = g.bg;\n' +
'      const b = document.getElementById("active-banner");\n' +
'      b.style.display = "flex";\n' +
'      b.style.background = g.cardBg;\n' +
'      b.style.border = "2px solid " + g.primary;\n' +
'      b.style.boxShadow = g.glow;\n' +
'      b.innerHTML = `<span style=\"font-size:1.1rem\">🧬</span><span style=\"font-size:0.8rem;font-weight:800;color:${g.primary}\">Genome Active: ${s.name} (${s.fitness}% Fitness)</span>`;\n' +
'    };\n' +
'  <' + '/script>\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ultra-code-evolution-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _toast(_isFr() ? '💾 Export HTML Évolution téléchargé !' : '💾 Standalone Genetic Evolution HTML exported!', 'success');
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraCodeEvolutionLab = UltraCodeEvolutionLab;
  }
})();
