/**
 * ══════════════════════════════════════════════════════════════════════════════
 * IA ARCHITECTE STUDIO ULTRA v2.0 — NEXT-GEN SUITE
 * 1. UltraSoundFX (Pure Web Audio API Synthesizers)
 * 2. UltraConfetti (Pure Canvas 2D Particle Explosion)
 * 3. UltraMagicStyler (AI 1-Click Aesthetic Overhaul: Glass, Cyber, Stripe, Synth, Editorial)
 * 4. UltraAutomations (Visual Trigger-Action Mini-Zapier)
 * 5. UltraDeviceSimulator (iPhone 16 Pro Frame, MacBook Chrome, Dual Live Matrix)
 * 6. UltraPwaPackager (Production PWA Package with Service Worker & Canvas Icons)
 * ══════════════════════════════════════════════════════════════════════════════
 */

// Helper translation accessor
function _at(key, def) {
  if (typeof t === 'function') return t(key) || def;
  return def;
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. ULTRA SOUND FX — PURE WEB AUDIO API (ZERO EXTERNAL FILES)
// ══════════════════════════════════════════════════════════════════════════════
const UltraSoundFX = {
  ctx: null,
  isMuted: localStorage.getItem('ultra_sound_muted') === 'true',

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('ultra_sound_muted', this.isMuted);
    this.updateToggleBtn();
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    if (typeof showToast === 'function') {
      showToast(this.isMuted ? (isFr ? '🔇 Audio Désactivé' : '🔇 Audio Muted') : (isFr ? '🔊 Audio Activé' : '🔊 Audio Enabled'), 'info');
    }
    if (!this.isMuted) this.play('click');
  },

  updateToggleBtn() {
    const btn = document.getElementById('tb-sound-toggle');
    if (btn) {
      btn.innerHTML = this.isMuted ? '🔇 <span class="hide-sm">Mute</span>' : '🔊 <span class="hide-sm">Audio</span>';
      btn.classList.toggle('muted', this.isMuted);
    }
  },

  play(type) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'success') {
        // Melodic two-tone chord
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'spark') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (type === 'celebrate') {
        // Grand arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          o.connect(g);
          g.connect(this.ctx.destination);
          const t = now + i * 0.07;
          g.gain.setValueAtTime(0.09, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          o.start(t);
          o.stop(t + 0.32);
        });
      }
    } catch(e) {
      // Ignore audio glitches safely
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. ULTRA CONFETTI — PURE HTML5 CANVAS 2D PARTICLE EXPLOSION
// ══════════════════════════════════════════════════════════════════════════════
const UltraConfetti = {
  particles: [],
  animId: null,

  burst(count = 90) {
    let canvas = document.getElementById('ultra-confetti-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    UltraSoundFX.play('celebrate');

    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#38bdf8', '#ffffff'];
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: canvas.width * (0.3 + Math.random() * 0.4),
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 5,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 1
      });
    }

    if (this.animId) cancelAnimationFrame(this.animId);
    const start = performance.now();

    const loop = (now) => {
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.vx *= 0.98; // Air drag
        p.rotation += p.rSpeed;
        p.opacity = Math.max(0, 1 - (elapsed / 2.2));

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          alive++;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive > 0 && elapsed < 2.5) {
        this.animId = requestAnimationFrame(loop);
      } else {
        canvas.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    this.animId = requestAnimationFrame(loop);
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. ULTRA MAGIC STYLER — 1-CLICK AESTHETIC OVERHAUL
// ══════════════════════════════════════════════════════════════════════════════
const UltraMagicStyler = {
  presets: {
    glass: {
      name: 'Glassmorphism Luxe',
      icon: '💎',
      descEn: 'Frosted glass translucency, Apple macOS aesthetics, backdrop blur',
      descFr: 'Verre poli translucide, esthétique Apple macOS, flou d\'arrière-plan',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(139,92,246,0.3))',
      css: `
/* --- Glassmorphism Luxe Preset --- */
:root {
  --bg: #070b16 !important;
  --card: rgba(255, 255, 255, 0.05) !important;
  --border: rgba(255, 255, 255, 0.16) !important;
  --accent: #8b5cf6 !important;
  --accent2: #06b6d4 !important;
  --text: #f8fafc !important;
}
body {
  background: radial-gradient(circle at 10% 20%, #1e1b4b 0%, #070b16 70%) !important;
  color: #f8fafc !important;
}
.card, .stat-card, .kpi-card, .lead-card, .book-card, .setting-item, .table-card, .column, .box, header, .navbar, .app-global-header {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.45) !important;
}
button, .btn-primary, .btn-cta {
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255,255,255,0.25) !important;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35) !important;
}
`
    },
    cyberpunk: {
      name: 'Cyberpunk Neon',
      icon: '⚡',
      descEn: 'Obsidian black, high-contrast cyan & magenta neon glows, laser borders',
      descFr: 'Noir obsidienne, néons cyan & magenta contrastés, bordures laser',
      gradient: 'linear-gradient(135deg, #06b6d4, #ec4899)',
      css: `
/* --- Cyberpunk Neon Preset --- */
:root {
  --bg: #03050a !important;
  --card: #080c18 !important;
  --border: rgba(6, 182, 212, 0.4) !important;
  --accent: #06b6d4 !important;
  --accent2: #ec4899 !important;
  --text: #f0fdf4 !important;
}
body {
  background: #03050a !important;
  color: #f0fdf4 !important;
}
.card, .stat-card, .kpi-card, .lead-card, .book-card, .setting-item, .table-card, .column, header, .navbar, .app-global-header {
  background: #080c18 !important;
  border: 1px solid rgba(6, 182, 212, 0.45) !important;
  box-shadow: 0 0 16px rgba(6, 182, 212, 0.25), inset 0 0 8px rgba(236, 72, 153, 0.1) !important;
}
button, .btn-primary, .btn-cta {
  background: linear-gradient(135deg, #06b6d4, #ec4899) !important;
  color: #fff !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5) !important;
  border: none !important;
}
`
    },
    saas: {
      name: 'Stripe SaaS Minimalist',
      icon: '👔',
      descEn: 'Linear/Stripe executive modernism, crisp indigo, slate typography',
      descFr: 'Modernisme Stripe/Linear épuré, indigo précis, typographie soignée',
      gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      css: `
/* --- Stripe SaaS Minimalist Preset --- */
:root {
  --bg: #090e1a !important;
  --card: #0f172a !important;
  --border: rgba(255, 255, 255, 0.08) !important;
  --accent: #6366f1 !important;
  --accent2: #3b82f6 !important;
  --text: #f8fafc !important;
}
body {
  background: #090e1a !important;
  color: #f8fafc !important;
}
.card, .stat-card, .kpi-card, .lead-card, .book-card, .setting-item, .table-card, .column, header, .navbar, .app-global-header {
  background: #0f172a !important;
  border: 1px solid rgba(255, 255, 255, 0.09) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35) !important;
}
button, .btn-primary, .btn-cta {
  background: #6366f1 !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.35) !important;
}
`
    },
    synthwave: {
      name: 'Retro Synthwave 80s',
      icon: '🕹️',
      descEn: 'Sunset purple to neon orange, vintage arcade feel, glowing horizon',
      descFr: 'Coucher de soleil violet à orange fluo, esprit arcade vintage 80s',
      gradient: 'linear-gradient(135deg, #a855f7, #f97316)',
      css: `
/* --- Retro Synthwave 80s Preset --- */
:root {
  --bg: #140826 !important;
  --card: #1f0d3d !important;
  --border: rgba(249, 115, 22, 0.35) !important;
  --accent: #f97316 !important;
  --accent2: #a855f7 !important;
  --text: #fef08a !important;
}
body {
  background: radial-gradient(circle at 50% 10%, #3b0764 0%, #140826 80%) !important;
  color: #fff !important;
}
.card, .stat-card, .kpi-card, .lead-card, .book-card, .setting-item, .table-card, .column, header, .navbar, .app-global-header {
  background: #1f0d3d !important;
  border: 1px solid rgba(249, 115, 22, 0.4) !important;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.3) !important;
}
button, .btn-primary, .btn-cta {
  background: linear-gradient(135deg, #f97316, #a855f7) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.6) !important;
  font-weight: 800 !important;
}
`
    },
    editorial: {
      name: 'Warm Editorial Notion',
      icon: '📜',
      descEn: 'Warm paper ivory, elegant dark slate typography, minimalist poise',
      descFr: 'Papier ivoire chaleureux, typographie ardoise noble, style épuré',
      gradient: 'linear-gradient(135deg, #f5efe6, #e6ded3)',
      css: `
/* --- Warm Editorial Preset --- */
:root {
  --bg: #faf7f2 !important;
  --card: #ffffff !important;
  --border: #e7e0d6 !important;
  --accent: #2d3748 !important;
  --accent2: #4a5568 !important;
  --text: #1a202c !important;
}
body {
  background: #faf7f2 !important;
  color: #1a202c !important;
}
.card, .stat-card, .kpi-card, .lead-card, .book-card, .setting-item, .table-card, .column, header, .navbar, .app-global-header {
  background: #ffffff !important;
  border: 1px solid #e7e0d6 !important;
  color: #1a202c !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
}
h1, h2, h3, h4, strong, .brand-title {
  color: #0f172a !important;
}
p, span, .stat-lbl, .kpi-label {
  color: #64748b !important;
}
button, .btn-primary, .btn-cta {
  background: #1e293b !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
}
`
    }
  },

  open() {
    try { UltraSoundFX.play('click'); } catch(e){}
    this.render();
    const modal = document.getElementById('modal-magic-styler');
    if (modal) modal.classList.add('show');
  },

  close() {
    try { UltraSoundFX.play('click'); } catch(e){}
    const modal = document.getElementById('modal-magic-styler');
    if (modal) modal.classList.remove('show');
  },

  render() {
    const grid = document.getElementById('magic-styler-grid');
    if (!grid) return;
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

    grid.innerHTML = Object.keys(this.presets).map(k => {
      const p = this.presets[k];
      return `
        <div class="styler-card" onclick="UltraMagicStyler.applyTheme('${k}')">
          <div class="styler-preview-swatch" style="background:${p.gradient}">
            <span>${p.icon}</span>
          </div>
          <div>
            <h4 class="styler-title">${p.name}</h4>
            <p class="styler-desc">${isFr ? p.descFr : p.descEn}</p>
          </div>
          <div class="styler-tags">
            <span class="styler-tag">${isFr ? '1-Click Appliquer' : '1-Click Apply'}</span>
            <span class="styler-tag">CSS Pro</span>
          </div>
        </div>
      `;
    }).join('');
  },

  applyTheme(presetKey) {
    const p = this.presets[presetKey];
    if (!p) return;

    UltraSoundFX.play('spark');

    // 1. Inject into live preview document
    const doc = UltraVisualInspector.getIframeDoc();
    if (doc) {
      let styleTag = doc.getElementById('ultra-magic-style');
      if (!styleTag) {
        styleTag = doc.createElement('style');
        styleTag.id = 'ultra-magic-style';
        doc.head.appendChild(styleTag);
      }
      styleTag.innerHTML = p.css;
    }

    // 2. Append or merge into APP.css
    if (window.APP) {
      const cleanCss = APP.css ? APP.css.replace(/\/\* --- (Glassmorphism|Cyberpunk|Stripe|Retro|Warm) Preset --- \*\/[\s\S]*?(?=\/\*|$)/g, '') : '';
      APP.css = cleanCss + '\n' + p.css;
      if (APP.editor && APP.currentTab === 'css') {
        APP.editor.setValue(APP.css);
      }
    }

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    if (typeof showToast === 'function') {
      showToast(isFr ? `✨ Thème [${p.name}] appliqué avec succès !` : `✨ Applied [${p.name}] theme live!`, 'success');
    }
    this.close();
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. ULTRA AUTOMATIONS — NO-CODE TRIGGER-ACTION MINI-ZAPIER
// ══════════════════════════════════════════════════════════════════════════════
const UltraAutomations = {
  rules: [
    {
      id: 'rule_1',
      trigger: 'button_click',
      targetLabel: 'All Action Buttons',
      actions: ['confetti', 'sound_success', 'toast']
    }
  ],

  open() {
    try { UltraSoundFX.play('click'); } catch(e){}
    this.render();
    this.switchView(this.activeView || 'list');
    const modal = document.getElementById('modal-automations');
    if (modal) modal.classList.add('show');
  },

  close() {
    try { UltraSoundFX.play('click'); } catch(e){}
    const modal = document.getElementById('modal-automations');
    if (modal) modal.classList.remove('show');
  },

  render() {
    const list = document.getElementById('automations-rules-list');
    if (!list) return;
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

    list.innerHTML = this.rules.map((r, idx) => `
      <div class="rule-card">
        <div class="rule-flow">
          <span class="rule-pill trigger">⚡ WHEN: ${r.targetLabel || 'Click Button'}</span>
          <span class="rule-arrow">➔</span>
          ${r.actions.map(act => {
            if (act === 'confetti') return `<span class="rule-pill action">🎉 Confetti Burst</span>`;
            if (act === 'sound_success') return `<span class="rule-pill action">🔊 Cyber Chime</span>`;
            if (act === 'save_data') return `<span class="rule-pill action">💾 Sync Data Engine</span>`;
            if (act === 'switch_screen') return `<span class="rule-pill screen">📱 Go to Dashboard</span>`;
            return `<span class="rule-pill action">🔔 Toast Alert</span>`;
          }).join(' ')}
        </div>
        <button class="rule-btn-del" onclick="UltraAutomations.deleteRule(${idx})" title="Delete rule">🗑️</button>
      </div>
    `).join('');

    this.wireAutomationsToIframe();
  },

  addRule() {
    UltraSoundFX.play('spark');
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    this.rules.push({
      id: 'rule_' + Date.now(),
      trigger: 'button_click',
      targetLabel: isFr ? 'Bouton Nouveau Prospect / Achat' : 'New Lead / Checkout Button',
      actions: ['confetti', 'sound_success', 'save_data', 'switch_screen']
    });
    this.render();
    if (typeof showToast === 'function') {
      showToast(isFr ? '⚡ Automatisation créée & active !' : '⚡ Automation active & wired live!', 'success');
    }
  },

  deleteRule(idx) {
    UltraSoundFX.play('click');
    this.rules.splice(idx, 1);
    this.render();
  },

  switchView(view) {
    this.activeView = view;
    const list = document.getElementById('automations-rules-list');
    const graph = document.getElementById('automations-graph-view');
    const btnList = document.getElementById('btn-auto-view-list');
    const btnGraph = document.getElementById('btn-auto-view-graph');
    if (btnList) {
      btnList.style.background = view === 'list' ? '#8b5cf6' : 'transparent';
      btnList.style.color = view === 'list' ? '#fff' : '#94a3b8';
    }
    if (btnGraph) {
      btnGraph.style.background = view === 'graph' ? '#8b5cf6' : 'transparent';
      btnGraph.style.color = view === 'graph' ? '#fff' : '#94a3b8';
    }
    if (list) list.style.display = view === 'list' ? 'flex' : 'none';
    if (graph) {
      graph.style.display = view === 'graph' ? 'block' : 'none';
      if (view === 'graph') this.renderNodeGraph();
    }
  },

  testFlowLive() {
    try { if (window.UltraSoundFX) UltraSoundFX.play('success'); } catch(e){}
    if (window.UltraConfetti) UltraConfetti.burst(75);
    if (window.UltraDataEngine) UltraDataEngine.addRow();
    
    // Animate graph SVG wires if visible
    const wires = document.querySelectorAll('.flow-wire');
    wires.forEach(w => {
      w.style.stroke = '#38bdf8';
      w.style.strokeWidth = '4';
      setTimeout(() => {
        w.style.stroke = 'url(#wire-grad)';
        w.style.strokeWidth = '2.5';
      }, 700);
    });

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    if (typeof showToast === 'function') {
      showToast(isFr ? '⚡ Flux exécuté en direct : Son, Confetti & Données synchronisées !' : '⚡ Flow executed live: Sound, Confetti & Data synced!', 'success');
    }
  },

  renderNodeGraph() {
    const wrap = document.getElementById('automations-graph-view');
    if (!wrap) return;

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    const rule = this.rules[0] || {
      targetLabel: 'All Buttons',
      actions: ['confetti', 'sound_success', 'save_data', 'switch_screen']
    };

    wrap.innerHTML = `
      <div style="position:absolute;top:12px;left:14px;z-index:2;display:flex;align-items:center;gap:8px">
        <span style="font-size:0.75rem;background:rgba(56,189,248,0.2);color:#38bdf8;padding:3px 10px;border-radius:20px;font-weight:700">🕸️ LIVE NODE GRAPH</span>
        <span style="font-size:0.7rem;color:#94a3b8">Interactive logic flow</span>
      </div>
      <svg width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none;z-index:1">
        <defs>
          <linearGradient id="wire-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <!-- Wire 1: Trigger to Condition -->
        <path class="flow-wire" d="M 180 180 C 240 180, 240 180, 300 180" fill="none" stroke="url(#wire-grad)" stroke-width="2.5" stroke-dasharray="6,4" />
        <!-- Wire 2: Condition to Actions -->
        <path class="flow-wire" d="M 440 180 C 500 180, 500 80, 560 80" fill="none" stroke="url(#wire-grad)" stroke-width="2.5" />
        <path class="flow-wire" d="M 440 180 C 500 180, 500 150, 560 150" fill="none" stroke="url(#wire-grad)" stroke-width="2.5" />
        <path class="flow-wire" d="M 440 180 C 500 180, 500 220, 560 220" fill="none" stroke="url(#wire-grad)" stroke-width="2.5" />
        <path class="flow-wire" d="M 440 180 C 500 180, 500 290, 560 290" fill="none" stroke="url(#wire-grad)" stroke-width="2.5" />
      </svg>
      <div style="position:relative;z-index:2;width:100%;height:100%;display:flex;align-items:center;justify-content:space-between;padding:40px 30px;box-sizing:border-box">
        <!-- Node 1: Trigger -->
        <div style="width:160px;background:#0d152b;border:2px solid #38bdf8;border-radius:12px;padding:14px;box-shadow:0 0 20px rgba(56,189,248,0.25)">
          <div style="font-size:0.68rem;font-weight:800;color:#38bdf8;margin-bottom:6px">⚡ TRIGGER</div>
          <div style="font-weight:700;color:#fff;font-size:0.85rem">${rule.targetLabel || 'Button Click'}</div>
          <div style="font-size:0.7rem;color:#94a3b8;margin-top:4px">Event: click</div>
        </div>

        <!-- Node 2: Condition -->
        <div style="width:150px;background:#0d152b;border:2px solid #8b5cf6;border-radius:12px;padding:14px;box-shadow:0 0 20px rgba(139,92,246,0.25)">
          <div style="font-size:0.68rem;font-weight:800;color:#c084fc;margin-bottom:6px">❓ CONDITION</div>
          <div style="font-weight:700;color:#fff;font-size:0.85rem">IF: User Active</div>
          <div style="font-size:0.7rem;color:#94a3b8;margin-top:4px">Pass rate: 100%</div>
        </div>

        <!-- Node 3: Actions Column -->
        <div style="display:flex;flex-direction:column;gap:10px;width:170px">
          <div style="background:#0d152b;border:1px solid #10b981;border-radius:10px;padding:8px 12px;font-size:0.78rem;color:#fff;font-weight:700;display:flex;align-items:center;gap:8px">
            <span>🎉</span> <span>Confetti Burst</span>
          </div>
          <div style="background:#0d152b;border:1px solid #10b981;border-radius:10px;padding:8px 12px;font-size:0.78rem;color:#fff;font-weight:700;display:flex;align-items:center;gap:8px">
            <span>🔊</span> <span>Cyber Chime</span>
          </div>
          <div style="background:#0d152b;border:1px solid #10b981;border-radius:10px;padding:8px 12px;font-size:0.78rem;color:#fff;font-weight:700;display:flex;align-items:center;gap:8px">
            <span>💾</span> <span>Sync Data Engine</span>
          </div>
          <div style="background:#0d152b;border:1px solid #10b981;border-radius:10px;padding:8px 12px;font-size:0.78rem;color:#fff;font-weight:700;display:flex;align-items:center;gap:8px">
            <span>📱</span> <span>Switch Screen</span>
          </div>
        </div>
      </div>
    `;
  },

  wireAutomationsToIframe() {
    try {
      const doc = (window.UltraVisualInspector && typeof UltraVisualInspector.getIframeDoc === 'function')
        ? UltraVisualInspector.getIframeDoc()
        : null;
      if (!doc) return;

      doc.querySelectorAll('button, .btn-primary, .btn-cta').forEach(btn => {
        if (btn.getAttribute('data-ultra-auto-wired')) return;
        btn.setAttribute('data-ultra-auto-wired', 'true');

        btn.addEventListener('click', () => {
          this.rules.forEach(r => {
            if (r.actions.includes('confetti') && window.UltraConfetti) {
              UltraConfetti.burst(60);
            }
            if (r.actions.includes('sound_success') && window.UltraSoundFX) {
              UltraSoundFX.play('success');
            }
            if (r.actions.includes('save_data') && window.UltraDataEngine) {
              UltraDataEngine.addRow();
            }
            if (r.actions.includes('switch_screen') && window.UltraScreenManager) {
              setTimeout(() => {
                UltraScreenManager.switchScreen('Dashboard');
              }, 400);
            }
          });
        });
      });
    } catch(e) {}
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. ULTRA DEVICE SIMULATOR — IPHONE 16 PRO, MACBOOK & DUAL-VIEW MATRIX
// ══════════════════════════════════════════════════════════════════════════════
const UltraDeviceSimulator = {
  currentMode: 'desktop', // 'desktop', 'iphone', 'macbook', 'dual'

  setMode(mode) {
    UltraSoundFX.play('click');
    this.currentMode = mode;

    const container = document.getElementById('iframe-container');
    const outer = document.getElementById('iframe-outer');
    if (!container || !outer) return;

    // Reset styles
    container.className = 'iframe-container';
    container.style.width = '';
    container.style.height = '';
    container.style.maxWidth = '';
    container.style.maxHeight = '';
    container.style.borderRadius = '';
    container.style.boxShadow = '';

    // Remove any previous hardware frame elements
    outer.querySelectorAll('.iphone-dynamic-island, .iphone-speaker, .iphone-home-bar, .macbook-titlebar').forEach(el => el.remove());

    // Update active toolbar button
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));

    if (mode === 'iphone') {
      const btn = document.getElementById('btn-sim-iphone');
      if (btn) btn.classList.add('active');

      container.classList.add('device-frame-iphone');
      
      // Inject Dynamic Island
      const island = document.createElement('div');
      island.className = 'iphone-dynamic-island';
      island.innerHTML = `
        <div class="dynamic-island-sensor"></div>
        <div style="font-size:0.65rem;color:#94a3b8;font-weight:700">Studio 2.0</div>
        <div class="dynamic-island-cam"></div>
      `;
      container.appendChild(island);

      // Inject Speaker
      const speaker = document.createElement('div');
      speaker.className = 'iphone-speaker';
      container.appendChild(speaker);

      // Inject Home Bar
      const homeBar = document.createElement('div');
      homeBar.className = 'iphone-home-bar';
      container.appendChild(homeBar);

    } else if (mode === 'macbook') {
      const btn = document.getElementById('btn-sim-macbook');
      if (btn) btn.classList.add('active');

      container.classList.add('device-frame-macbook');

      // Inject MacBook Titlebar
      const bar = document.createElement('div');
      bar.className = 'macbook-titlebar';
      bar.innerHTML = `
        <div class="macbook-dots">
          <div class="mac-dot close"></div>
          <div class="mac-dot min"></div>
          <div class="mac-dot max"></div>
        </div>
        <div class="macbook-address-bar">🔒 https://studio.ultra.local/preview/app</div>
      `;
      container.insertBefore(bar, container.firstChild);

    } else if (mode === 'dual') {
      const btn = document.getElementById('btn-sim-dual');
      if (btn) btn.classList.add('active');
      if (typeof UltraDualPreview !== 'undefined' && UltraDualPreview.toggle) {
        UltraDualPreview.toggle();
      }
      return;
    } else {
      // Standard Desktop
      const btn = document.getElementById('btn-sim-desktop');
      if (btn) btn.classList.add('active');
      container.style.width = '100%';
      container.style.height = '100%';
    }

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    if (typeof showToast === 'function') {
      showToast(`📱 View: ${mode.toUpperCase()}`, 'info');
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 6. ULTRA PWA PACKAGER — PRODUCTION-READY PWA BUNDLE
// ══════════════════════════════════════════════════════════════════════════════
const UltraPwaPackager = {
  generateIcon(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#8b5cf6');
    grad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.22);
    ctx.fill();

    // Emoji icon
    ctx.font = `${Math.floor(size * 0.52)}px 'Segoe UI Emoji', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', size / 2, size / 2 + size * 0.04);

    return canvas.toDataURL('image/png');
  },

  export() {
    UltraSoundFX.play('celebrate');
    UltraConfetti.burst(80);

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    const appTitle = (window.APP && APP.currentAppName) || (isFr ? 'Application Ultra' : 'Ultra Studio App');

    // 1. Manifest
    const manifest = {
      name: appTitle,
      short_name: appTitle.slice(0, 12),
      start_url: './index.html',
      display: 'standalone',
      background_color: '#070b16',
      theme_color: '#8b5cf6',
      orientation: 'portrait-primary',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    };

    // 2. Service Worker
    const sw = `// Progressive Web App Offline Cache Service Worker
const CACHE_NAME = 'ultra-app-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
`;

    // 3. Full Standalone HTML with PWA meta tags
    const htmlCode = (window.APP && (APP.full || APP.html)) || '<h1>Ultra PWA App</h1>';
    const cssCode = (window.APP && APP.css) || '';
    const jsCode = (window.APP && APP.js) || '';

    const pwaIndex = `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${appTitle}</title>
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#8b5cf6">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="apple-touch-icon" href="icon-192.png">
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(console.error);
    });
  }
  </script>
</body>
</html>`;

    // 4. Download Standalone PWA HTML
    const blob = new Blob([pwaIndex], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${appTitle.toLowerCase().replace(/\\s+/g, '-')}-pwa.html`;
    a.click();

    // 5. Download Manifest
    setTimeout(() => {
      const mblob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
      const ma = document.createElement('a');
      ma.href = URL.createObjectURL(mblob);
      ma.download = 'manifest.json';
      ma.click();
    }, 400);

    // 6. Download SW
    setTimeout(() => {
      const sblob = new Blob([sw], { type: 'application/javascript' });
      const sa = document.createElement('a');
      sa.href = URL.createObjectURL(sblob);
      sa.download = 'sw.js';
      sa.click();
    }, 800);

    if (typeof showToast === 'function') {
      showToast(isFr ? '📦 PWA Généré avec succès (HTML + Manifest + SW) !' : '📦 PWA Package exported (HTML + Manifest + SW)!', 'success');
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// EXPOSE ALL MODULES GLOBALLY
// ══════════════════════════════════════════════════════════════════════════════
window.UltraSoundFX = UltraSoundFX;
window.UltraConfetti = UltraConfetti;
window.UltraMagicStyler = UltraMagicStyler;
window.UltraAutomations = UltraAutomations;
window.UltraDeviceSimulator = UltraDeviceSimulator;
window.UltraPwaPackager = UltraPwaPackager;

// Auto-wire preview events on iframe loads
window.addEventListener('load', () => {
  UltraSoundFX.updateToggleBtn();
  const frame = document.getElementById('preview-frame');
  if (frame) {
    frame.addEventListener('load', () => {
      UltraAutomations.wireAutomationsToIframe();
    });
  }
});
