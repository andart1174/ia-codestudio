/**
 * ══════════════════════════════════════════════════════════════════════════════
 * IA ARCHITECTE STUDIO ULTRA — WELCOME & ENGAGEMENT FX STUDIO (16 MODELS)
 * Module: js/ultra-welcome-fx.js
 * 
 * Injects autonomous, animated, interactive micro-experiences into any web app:
 * 
 * [REALISTIC 3D & PHYSICS (9)]:
 * 1. Holo Badge 3D      — 3D holographic tilt pass with iridescent sheen & 180° flip card
 * 2. Physics Gift 3D    — Isometric gift box with unwrap ribbon, popping lid & 3D confetti
 * 3. Cyber Butterfly 3D — Origami butterfly with Bézier flight, 3D wings & unfurling note
 * 4. Liquid Mercury     — Fluid metal drop with surface tension, ripples & chrome puddle
 * 5. Cyber Vinyl        — Realistic turntable with spinning grooved vinyl & lo-fi synth
 * 6. Neural Nexus       — 3D interactive particle constellation with gravitational lensing
 * 7. Hologram Terminal  — Sci-fi volumetric cone emitter with CRT scanlines & typewriter beeps
 * 8. 3D Gold Coin Toss  — Parabolic gravity coin toss with 3D spin & VIP reward reveal
 * 9. Lucky Wheel 3D     — Physics spinning wheel with inertia, peg flapper ticks & prize reveal
 * 
 * [CLASSIC & ONBOARDING (7)]:
 * 10. Spotlight Tour    — 3-step interactive onboarding guide with dynamic spotlight cutout
 * 11. Holo-Orb          — 3D fluid gradient concierge with particles & time greeting
 * 12. Dynamic Island    — Apple-style loyalty pill with bounce & visitor return tracker
 * 13. Scratch & Reveal  — Interactive HTML5 canvas scratch-off coupon & golden sparks
 * 14. Exit-Intent Portal — Smooth velvet magnetic wave capturing exit intent
 * 15. Corner Buddy      — Interactive avatar whose pupils track mouse coordinates
 * 16. Fortune Cookie    — 3D CSS fortune cookie cracking open with synthetic chimes
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  function _sound(type) {
    if (window.UltraSoundFX && typeof window.UltraSoundFX.play === 'function') {
      try { window.UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') {
      showToast(msg, type || 'info');
    } else {
      console.log(`[Toast ${type}]: ${msg}`);
    }
  }

  // Pure Web Audio procedural sound synthesizer (0 external files)
  function _synthSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      if (type === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1480, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.35);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'peg') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'gift') {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, now + i * 0.08);
          g.gain.setValueAtTime(0.2, now + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.45);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + i * 0.08);
          o.stop(now + i * 0.08 + 0.45);
        });
      } else if (type === 'type') {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(800 + Math.random() * 400, now);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now);
        o.stop(now + 0.03);
      } else if (type === 'vinyl_ambient') {
        [220, 277.18, 329.63, 415.3].forEach(f => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(0.03, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now);
          o.stop(now + 2.2);
        });
      }
    } catch(e){}
  }

  const UltraWelcomeStudio = {
    activeCategory: 'all',
    activeStyle: 'holo_badge_3d',
    activeTheme: 'cyber',
    activePosition: 'bottom-right',
    activeTrigger: 'immediate',
    customTitle: '',
    customSubtitle: '',
    simCleanupFn: null,

    styles: {
      // ═══════════════════════ REALISTIC 3D & PHYSICS (9) ═══════════════════════
      holo_badge_3d: {
        id: 'holo_badge_3d',
        category: 'realistic',
        nameEn: '🪪 3D Holographic VIP Pass',
        nameFr: '🪪 Badge Holographique 3D',
        descEn: '3D perspective card with dynamic iridescent rainbow sheen, metallic clip, and 180° flip card on click.',
        descFr: "Badge 3D avec reflet irisé spéculaire dynamique, attache métallique et retournement 3D à 180°.",
        defaultTitle: 'VIP Access Pass #9942 🪪',
        defaultSub: 'Interactive 3D credentials. Tilt with mouse or click to flip.',
        badge: '3D TILT'
      },
      physics_gift_3d: {
        id: 'physics_gift_3d',
        category: 'realistic',
        nameEn: '🎁 3D Physics Unboxing',
        nameFr: '🎁 Déballage Cadeau 3D',
        descEn: 'Isometric gift box with ribbon that unwinds on drag, popping lid, 3D confetti explosion and crystal chime.',
        descFr: "Boîte cadeau 3D isométrique avec ruban à délier, couvercle éjecté, confettis 3D et carillon cristal.",
        defaultTitle: 'Exclusive Welcome Gift 🎁',
        defaultSub: 'Pull the golden ribbon to unbox your secret reward!',
        badge: 'PHYSICS'
      },
      lucky_wheel_3d: {
        id: 'lucky_wheel_3d',
        category: 'realistic',
        nameEn: '🎡 3D Spinning Lucky Wheel',
        nameFr: '🎡 Roue de la Fortune 3D',
        descEn: 'Realistic spinning wheel with inertia damping, mechanical flapper audio clicks, and instant VIP prize reveal.',
        descFr: "Roue de la fortune avec physique d'inertie, cliquetis mécanique audio et bonus VIP révélé.",
        defaultTitle: 'Spin to Claim VIP Fortune 🎡',
        defaultSub: 'Spin the wheel with mouse to win exclusive platform perks!',
        badge: 'PHYSICS'
      },
      cyber_butterfly_3d: {
        id: 'cyber_butterfly_3d',
        category: 'realistic',
        nameEn: '🦋 Origami Cyber-Butterfly',
        nameFr: '🦋 Papillon Origami 3D',
        descEn: '3D CSS flapping wings with specular facet lighting, Bézier curved flight, and click-to-unfurl welcome letter.',
        descFr: "Ailes 3D animées avec reflets spéculaires, vol en courbe de Bézier et déploiement en lettre au clic.",
        defaultTitle: 'A Message from Beyond 🦋',
        defaultSub: "Click the butterfly to unfurl today's architectural greeting.",
        badge: 'FLIGHT 3D'
      },
      liquid_mercury_drop: {
        id: 'liquid_mercury_drop',
        category: 'realistic',
        nameEn: '💧 Liquid Mercury Metal Drop',
        nameFr: '💧 Goutte Mercure Liquide',
        descEn: 'Canvas 2D fluid simulation: chrome drop falls, impacts with surface tension, ripples on cursor drag.',
        descFr: 'Fluide Canvas 2D : goutte de chrome liquide avec tension superficielle et ondulations au curseur.',
        defaultTitle: 'Pure Fluid Innovation 💧',
        defaultSub: 'Drag cursor through the liquid metal to create real-time ripples.',
        badge: 'FLUID 2D'
      },
      cyber_vinyl_turntable: {
        id: 'cyber_vinyl_turntable',
        category: 'realistic',
        nameEn: '📻 Cyber Vinyl Turntable',
        nameFr: '📻 Platine Vinyle Cyber',
        descEn: 'Spinning 33 RPM grooved vinyl with light sheen, pivoting tonearm, procedural Web Audio lo-fi chords & DJ scratch.',
        descFr: 'Disque vinyle 33 tours tournant avec sillons irisés, bras mécanique, musique lo-fi et scratch.',
        defaultTitle: 'Architectural Lounge Lo-Fi 📻',
        defaultSub: 'Tone-arm locked at 33 RPM. Drag record to scratch or adjust sound.',
        badge: 'AUDIO SYNTH'
      },
      neural_constellation: {
        id: 'neural_constellation',
        category: 'realistic',
        nameEn: '🌌 Neural Constellation Nexus',
        nameFr: '🌌 Constellation Neurale 3D',
        descEn: '150 3D particle nodes with gravitational lensing towards cursor and 360° drag-to-orbit controls.',
        descFr: '150 nœuds 3D en orbite avec attraction gravitationnelle vers la souris et rotation 360°.',
        defaultTitle: 'Neural Nexus Connected 🌌',
        defaultSub: '150 intelligent nodes synchronized. Drag to orbit the 3D galaxy.',
        badge: '3D CANVAS'
      },
      hologram_terminal: {
        id: 'hologram_terminal',
        category: 'realistic',
        nameEn: '📟 Sci-Fi Hologram Cyber-Deck',
        nameFr: '📟 Terminal Holographique Sci-Fi',
        descEn: 'Volumetric light cone emitter, CRT scanlines, live oscillating voice waveform & typewriter audio clicks.',
        descFr: 'Émetteur à cône volumétrique, lignes CRT, onde vocale oscillante et frappe mécanique audio.',
        defaultTitle: 'AI Protocol Terminal [ONLINE] 📟',
        defaultSub: 'Direct transmission established. Explore next-generation features.',
        badge: 'SCI-FI'
      },
      coin_toss_3d: {
        id: 'coin_toss_3d',
        category: 'realistic',
        nameEn: '🪙 3D Commemorative Coin Toss',
        nameFr: '🪙 Lancer de Pièce 3D Or',
        descEn: 'Heavy gold coin with embossed relief, vertical parabolic flight physics, 3D spin & VIP reward reveal.',
        descFr: "Pièce d'or en relief avec lancer parabolique gravitationnel, rotation 3D et bonus VIP révélé.",
        defaultTitle: 'Toss to Unlock Fortune 🪙',
        defaultSub: 'Fling or click coin to flip in 3D and reveal your instant reward.',
        badge: 'PARABOLIC'
      },

      // ═══════════════════════ CLASSIC & ONBOARDING (7) ═══════════════════════
      spotlight_tour: {
        id: 'spotlight_tour',
        category: 'classic',
        nameEn: '🔦 Spotlight Onboarding Guide',
        nameFr: "🔦 Guide d'Intégration Spotlight",
        descEn: 'Interactive 3-step onboarding walkthrough with luminous circular spotlight mask and pulsating beacon ring.',
        descFr: "Visite guidée interactive en 3 étapes avec masque de projecteur circulaire et balise pulsante.",
        defaultTitle: 'Welcome Tour & Guide 🔦',
        defaultSub: 'Step-by-step interactive onboarding highlighting key features.',
        badge: 'TOUR'
      },
      holo_orb: {
        id: 'holo_orb',
        category: 'classic',
        nameEn: '🔮 Holo-Orb Concierge',
        nameFr: '🔮 Holo-Orbe Concierge',
        descEn: 'Floating 3D fluid gradient orb with particle sparks and personalized time-of-day greeting.',
        descFr: "Orbe holographique fluide 3D avec particules et salutation adaptée à l'heure.",
        defaultTitle: 'Welcome, Explorer! ✨',
        defaultSub: 'Experience next-gen architecture with ultra-low latency.',
        badge: 'HOLO'
      },
      dynamic_island: {
        id: 'dynamic_island',
        category: 'classic',
        nameEn: '🏝️ Dynamic Island Loyalty',
        nameFr: '🏝️ Dynamic Island Fidélité',
        descEn: 'Sleek iOS-style spring pill with visitor return tracker (Visit #1, #2, #3+) & celebration badge.',
        descFr: 'Pilule élastique style iOS avec compteur de visites de fidélité et badge festif.',
        defaultTitle: 'Welcome Back! 🚀',
        defaultSub: 'Loyal Visitor Streak active. Enjoy all VIP features.',
        badge: 'APPLE'
      },
      scratch_card: {
        id: 'scratch_card',
        category: 'classic',
        nameEn: '🎫 Scratch & Reveal Coupon',
        nameFr: '🎫 Carte à Gratter Mystère',
        descEn: 'Interactive HTML5 canvas card; scratch with mouse/finger to reveal a secret gift with golden sparkles.',
        descFr: 'Carte interactive à gratter au curseur/doigt pour révéler un cadeau secret et étincelles dorées.',
        defaultTitle: 'Secret Welcome Gift 🎁',
        defaultSub: 'Scratch above to reveal your VIP 25% promo code!',
        badge: 'CANVAS'
      },
      exit_intent: {
        id: 'exit_intent',
        category: 'classic',
        nameEn: '🌀 Magnetic Exit-Intent Portal',
        nameFr: "🌀 Portail d'Intention de Sortie",
        descEn: 'Detects cursor leaving the viewport and displays a friendly velvet retention wave with 1-click bookmark.',
        descFr: 'Détecte la sortie du curseur et affiche une vague magnétique chaleureuse de rétention.',
        defaultTitle: "Wait! Don't Leave Yet... ⭐",
        defaultSub: 'Bookmark this application or share it with your team before you go!',
        badge: 'RETENTION'
      },
      corner_buddy: {
        id: 'corner_buddy',
        category: 'classic',
        nameEn: '🤖 Corner Interactive Buddy',
        nameFr: '🤖 Compagnon Interactif de Coin',
        descEn: 'Animated geometric avatar whose pupils track the mouse in real-time, waves, and talks when idle.',
        descFr: 'Avatar géométrique animé dont les pupilles suivent la souris en direct et salue au survol.',
        defaultTitle: "Hello! I'm your Guide 🤖",
        defaultSub: 'Need any assistance? Click me anytime for quick tips!',
        badge: 'TRACKER'
      },
      fortune_cookie: {
        id: 'fortune_cookie',
        category: 'classic',
        nameEn: '🥠 Daily Fortune Cookie',
        nameFr: '🥠 Biscuit de Fortune Quotidien',
        descEn: '3D CSS fortune cookie that cracks open on click with sound synthesis, revealing daily tech inspiration.',
        descFr: "Biscuit 3D qui s'ouvre au clic avec son synthétisé, dévoilant une maxime inspirante du jour.",
        defaultTitle: 'Daily Tech Fortune 🥠',
        defaultSub: "Click the fortune cookie to reveal today's architectural wisdom.",
        badge: '3D CSS'
      }
    },

    themes: {
      cyber: {
        name: 'Cyber Neon',
        primary: '#38bdf8',
        secondary: '#818cf8',
        accent: '#06b6d4',
        bg: 'rgba(15,23,42,0.92)',
        border: 'rgba(56,189,248,0.4)',
        glow: 'rgba(56,189,248,0.25)'
      },
      gold: {
        name: 'Gold Luxury',
        primary: '#f59e0b',
        secondary: '#fbbf24',
        accent: '#d97706',
        bg: 'rgba(24,18,10,0.94)',
        border: 'rgba(245,158,11,0.5)',
        glow: 'rgba(245,158,11,0.3)'
      },
      emerald: {
        name: 'Emerald Glass',
        primary: '#10b981',
        secondary: '#34d399',
        accent: '#059669',
        bg: 'rgba(6,28,20,0.92)',
        border: 'rgba(16,185,129,0.45)',
        glow: 'rgba(16,185,129,0.25)'
      },
      velvet: {
        name: 'Velvet Rose',
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#a855f7',
        bg: 'rgba(24,10,32,0.94)',
        border: 'rgba(139,92,246,0.45)',
        glow: 'rgba(236,72,153,0.25)'
      }
    },

    open() {
      _sound('click');
      const modal = document.getElementById('modal-welcome-studio');
      if (!modal) return;
      if (typeof applyI18n === 'function') applyI18n();

      const def = this.styles[this.activeStyle] || this.styles.holo_badge_3d;
      if (!this.customTitle) this.customTitle = def.defaultTitle;
      if (!this.customSubtitle) this.customSubtitle = def.defaultSub;

      const titleInput = document.getElementById('welcome-input-title');
      const subInput = document.getElementById('welcome-input-sub');
      if (titleInput) titleInput.value = this.customTitle;
      if (subInput) subInput.value = this.customSubtitle;

      const trigSelect = document.getElementById('welcome-select-trigger');
      if (trigSelect) trigSelect.value = this.activeTrigger;

      this.updateAnalyticsDisplay();
      this.renderStyleList();
      this.renderSimulator();
      modal.classList.add('show');
    },

    close() {
      _sound('click');
      if (typeof this.simCleanupFn === 'function') {
        try { this.simCleanupFn(); } catch(e){}
        this.simCleanupFn = null;
      }
      const modal = document.getElementById('modal-welcome-studio');
      if (modal) modal.classList.remove('show');
    },

    filterCategory(cat) {
      _sound('click');
      this.activeCategory = cat;

      ['all', 'realistic', 'classic'].forEach(c => {
        const btn = document.getElementById('welcome-tab-' + c);
        if (btn) {
          if (c === cat) {
            btn.style.background = 'rgba(245,158,11,0.18)';
            btn.style.borderColor = '#f59e0b';
            btn.style.color = '#fbbf24';
          } else {
            btn.style.background = 'transparent';
            btn.style.borderColor = 'rgba(255,255,255,0.12)';
            btn.style.color = '#94a3b8';
          }
        }
      });

      this.renderStyleList();
    },

    selectStyle(styleId) {
      if (!this.styles[styleId]) return;
      _sound('click');
      this.activeStyle = styleId;
      const def = this.styles[styleId];
      this.customTitle = def.defaultTitle;
      this.customSubtitle = def.defaultSub;

      const titleInput = document.getElementById('welcome-input-title');
      const subInput = document.getElementById('welcome-input-sub');
      if (titleInput) titleInput.value = this.customTitle;
      if (subInput) subInput.value = this.customSubtitle;

      this.renderStyleList();
      this.renderSimulator();
    },

    selectTheme(themeId) {
      if (!this.themes[themeId]) return;
      _sound('click');
      this.activeTheme = themeId;
      this.renderSimulator();
    },

    selectPosition(posId) {
      _sound('click');
      this.activePosition = posId;
      this.renderSimulator();
    },

    selectTrigger(trig) {
      _sound('click');
      this.activeTrigger = trig;
    },

    onTitleChange(val) {
      this.customTitle = val;
      this.renderSimulator();
    },

    onSubChange(val) {
      this.customSubtitle = val;
      this.renderSimulator();
    },

    updateAnalyticsDisplay() {
      try {
        let imp = 0, clk = 0;
        if (typeof localStorage !== 'undefined') {
          imp = parseInt(localStorage.getItem('__uw_impressions') || '0', 10);
          clk = parseInt(localStorage.getItem('__uw_clicks') || '0', 10);
        }
        const rate = (imp > 0) ? ((clk / imp) * 100).toFixed(1) + '%' : '0.0%';

        const elImp = document.getElementById('welcome-kpi-imp');
        const elClk = document.getElementById('welcome-kpi-clk');
        const elRate = document.getElementById('welcome-kpi-rate');
        if (elImp) elImp.textContent = String(imp);
        if (elClk) elClk.textContent = String(clk);
        if (elRate) elRate.textContent = rate;
      } catch(e){}
    },

    getStats() {
      try {
        let imp = 0, clk = 0;
        if (typeof localStorage !== 'undefined') {
          imp = parseInt(localStorage.getItem('__uw_impressions') || '0', 10);
          clk = parseInt(localStorage.getItem('__uw_clicks') || '0', 10);
        }
        const rate = (imp > 0) ? ((clk / imp) * 100).toFixed(1) + '%' : '0.0%';
        return { impressions: imp, clicks: clk, rate: rate };
      } catch(e) {
        return { impressions: 0, clicks: 0, rate: '0.0%' };
      }
    },

    trackImpression() {
      try {
        if (typeof localStorage !== 'undefined') {
          const imp = parseInt(localStorage.getItem('__uw_impressions') || '0', 10) + 1;
          localStorage.setItem('__uw_impressions', String(imp));
        }
        this.updateAnalyticsDisplay();
      } catch(e){}
    },

    trackClick() {
      try {
        if (typeof localStorage !== 'undefined') {
          const clk = parseInt(localStorage.getItem('__uw_clicks') || '0', 10) + 1;
          localStorage.setItem('__uw_clicks', String(clk));
        }
        this.updateAnalyticsDisplay();
      } catch(e){}
    },

    resetStats() {
      this.resetAnalytics();
    },

    resetAnalytics() {
      _sound('click');
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('__uw_impressions', '0');
          localStorage.setItem('__uw_clicks', '0');
        }
        this.updateAnalyticsDisplay();
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        _toast(isFr ? 'Statistiques réinitialisées avec succès.' : 'Analytics statistics reset successfully.', 'info');
      } catch(e){}
    },

    renderStyleList() {
      const container = document.getElementById('welcome-style-list');
      if (!container) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      const filtered = Object.values(this.styles).filter(st => {
        if (this.activeCategory === 'all') return true;
        return st.category === this.activeCategory;
      });

      container.innerHTML = filtered.map(st => {
        const isSel = (st.id === this.activeStyle);
        return `
          <div onclick="UltraWelcomeStudio.selectStyle('${st.id}')" style="padding:10px 12px;border-radius:10px;cursor:pointer;transition:all 0.2s ease;background:${isSel ? 'rgba(245,158,11,0.14)' : 'rgba(255,255,255,0.03)'};border:1px solid ${isSel ? '#f59e0b' : 'rgba(255,255,255,0.08)'};display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div style="flex:1;min-width:0">
              <div style="font-weight:700;font-size:0.84rem;color:${isSel ? '#fbbf24' : '#f1f5f9'};display:flex;align-items:center;gap:6px">
                ${isFr ? st.nameFr : st.nameEn}
                <span style="font-size:0.62rem;padding:2px 5px;border-radius:4px;background:${st.category==='realistic'?'rgba(245,158,11,0.15)':'rgba(255,255,255,0.08)'};color:${st.category==='realistic'?'#fbbf24':'#94a3b8'};font-weight:800">${st.badge}</span>
              </div>
              <div style="font-size:0.7rem;color:#94a3b8;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                ${isFr ? st.descFr : st.descEn}
              </div>
            </div>
            ${isSel ? '<span style="color:#f59e0b;font-weight:900;font-size:1.05rem">✓</span>' : ''}
          </div>
        `;
      }).join('');
    },

    renderSimulator() {
      if (typeof this.simCleanupFn === 'function') {
        try { this.simCleanupFn(); } catch(e){}
        this.simCleanupFn = null;
      }

      const sim = document.getElementById('welcome-simulator-container');
      if (!sim) return;
      sim.innerHTML = '';

      const th = this.themes[this.activeTheme] || this.themes.cyber;
      const title = this.customTitle || this.styles[this.activeStyle].defaultTitle;
      const sub = this.customSubtitle || this.styles[this.activeStyle].defaultSub;
      const pos = this.activePosition;

      switch(this.activeStyle) {
        case 'holo_badge_3d':
          this._mountHoloBadgeSim(sim, th, title, sub, pos);
          break;
        case 'physics_gift_3d':
          this._mountPhysicsGiftSim(sim, th, title, sub, pos);
          break;
        case 'lucky_wheel_3d':
          this._mountLuckyWheelSim(sim, th, title, sub, pos);
          break;
        case 'spotlight_tour':
          this._mountSpotlightTourSim(sim, th, title, sub, pos);
          break;
        case 'cyber_butterfly_3d':
          this._mountCyberButterflySim(sim, th, title, sub, pos);
          break;
        case 'liquid_mercury_drop':
          this._mountLiquidMercurySim(sim, th, title, sub, pos);
          break;
        case 'cyber_vinyl_turntable':
          this._mountCyberVinylSim(sim, th, title, sub, pos);
          break;
        case 'neural_constellation':
          this._mountNeuralConstellationSim(sim, th, title, sub, pos);
          break;
        case 'hologram_terminal':
          this._mountHologramTerminalSim(sim, th, title, sub, pos);
          break;
        case 'coin_toss_3d':
          this._mountCoinTossSim(sim, th, title, sub, pos);
          break;
        case 'holo_orb':
          this._mountHoloOrbSim(sim, th, title, sub, pos);
          break;
        case 'dynamic_island':
          this._mountDynamicIslandSim(sim, th, title, sub, pos);
          break;
        case 'scratch_card':
          this._mountScratchCardSim(sim, th, title, sub, pos);
          break;
        case 'exit_intent':
          this._mountExitIntentSim(sim, th, title, sub, pos);
          break;
        case 'corner_buddy':
          this._mountCornerBuddySim(sim, th, title, sub, pos);
          break;
        case 'fortune_cookie':
          this._mountFortuneCookieSim(sim, th, title, sub, pos);
          break;
        default:
          this._mountHoloBadgeSim(sim, th, title, sub, pos);
      }
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 1. 🪪 3D HOLOGRAPHIC VIP PASS SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountHoloBadgeSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;perspective:1000px;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:28px;height:12px;background:linear-gradient(180deg,#94a3b8,#475569);border-radius:4px 4px 0 0;box-shadow:0 2px 4px rgba(0,0,0,0.5);margin-bottom:-2px;z-index:2"></div>
          <div id="sim-badge-card" style="width:260px;height:150px;border-radius:16px;background:${th.bg};border:1px solid ${th.border};box-shadow:0 20px 45px rgba(0,0,0,0.7),0 0 25px ${th.glow};position:relative;cursor:pointer;transform-style:preserve-3d;transition:transform 0.1s ease-out;overflow:hidden">
            <div id="sim-badge-front" style="position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;backface-visibility:hidden;color:#fff">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-weight:900;font-size:0.75rem;letter-spacing:1px;color:${th.primary};background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:6px">VIP ACCESS</span>
                <span style="font-family:monospace;font-size:0.7rem;color:#94a3b8">#VIP-9942</span>
              </div>
              <div>
                <div style="font-weight:800;font-size:0.95rem;color:#fff;margin-bottom:4px">${title}</div>
                <div style="font-size:0.72rem;color:#cbd5e1;line-height:1.3">${sub}</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.65rem;color:#64748b">
                <span>✦ ULTRA VERIFIED</span>
                <span style="color:${th.primary}">Click to flip 3D ↺</span>
              </div>
            </div>
            <div id="sim-badge-back" style="position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;backface-visibility:hidden;transform:rotateY(180deg);background:#090d16;color:#fff">
              <div style="font-size:0.72rem;font-weight:800;color:${th.primary};margin-bottom:6px">AUTHORIZATION GRANTED</div>
              <div style="width:70px;height:70px;background:#fff;border-radius:8px;padding:5px;display:flex;align-items:center;justify-content:center">
                <div style="width:100%;height:100%;background:repeating-linear-gradient(45deg,#000,#000 6px,#fff 6px,#fff 12px);border-radius:4px"></div>
              </div>
              <div style="font-size:0.62rem;color:#94a3b8;margin-top:6px;font-family:monospace">ACCESS TOKEN: 8F2A-99B1</div>
            </div>
            <div id="sim-badge-sheen" style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,0.2) 40%,rgba(56,189,248,0.25) 50%,transparent 70%);opacity:0.6;mix-blend-mode:color-dodge;transition:opacity 0.2s"></div>
          </div>
        </div>
      `;
      container.appendChild(el);

      const card = el.querySelector('#sim-badge-card');
      const sheen = el.querySelector('#sim-badge-sheen');
      let isFlipped = false;

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotY = (isFlipped ? 180 : 0) + dx * 16;
        const rotX = -dy * 16;
        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        const sheenAngle = 115 + dx * 35;
        sheen.style.background = `linear-gradient(${sheenAngle}deg,transparent 20%,rgba(255,255,255,0.3) ${40 + dy * 20}%,rgba(56,189,248,0.3) ${50 + dx * 20}%,transparent 75%)`;
      };

      card.onclick = () => {
        isFlipped = !isFlipped;
        _sound('click');
        card.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1)';
        card.style.transform = isFlipped ? 'rotateX(0deg) rotateY(180deg)' : 'rotateX(0deg) rotateY(0deg)';
        setTimeout(() => card.style.transition = 'transform 0.1s ease-out', 450);
      };

      window.addEventListener('mousemove', onMouseMove);
      this.simCleanupFn = () => {
        window.removeEventListener('mousemove', onMouseMove);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 2. 🎁 3D PHYSICS UNBOXING SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountPhysicsGiftSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};width:270px;text-align:center;backdrop-filter:blur(14px);color:#fff">
          <div style="font-weight:800;font-size:0.92rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div id="sim-gift-sub" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:14px">${sub}</div>
          <div id="sim-gift-stage" style="width:140px;height:120px;margin:0 auto;position:relative;cursor:pointer;perspective:600px">
            <div id="sim-gift-lid" style="width:110px;height:32px;background:linear-gradient(135deg,${th.primary},${th.secondary});border-radius:10px 10px 4px 4px;margin:0 auto;position:relative;z-index:3;box-shadow:0 4px 15px rgba(0,0,0,0.4);transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)">
              <div style="width:24px;height:100%;background:rgba(255,255,255,0.3);margin:0 auto"></div>
              <div id="sim-gift-bow" style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:1.6rem;line-height:1">🎀</div>
            </div>
            <div id="sim-gift-box" style="width:96px;height:70px;background:linear-gradient(180deg,#1e1b4b,#0f172a);border:1px solid ${th.border};margin:0 auto;border-radius:0 0 10px 10px;position:relative;overflow:hidden;box-shadow:0 12px 25px rgba(0,0,0,0.6)">
              <div style="width:24px;height:100%;background:linear-gradient(180deg,${th.primary},${th.secondary});margin:0 auto"></div>
            </div>
            <canvas id="sim-gift-canvas" width="220" height="150" style="position:absolute;top:-40px;left:-40px;pointer-events:none;display:none"></canvas>
          </div>
          <div id="sim-gift-status" style="font-size:0.68rem;color:#94a3b8;margin-top:10px">Click or drag ribbon to open</div>
        </div>
      `;
      container.appendChild(el);

      const stage = el.querySelector('#sim-gift-stage');
      const lid = el.querySelector('#sim-gift-lid');
      const subEl = el.querySelector('#sim-gift-sub');
      const status = el.querySelector('#sim-gift-status');
      const cvs = el.querySelector('#sim-gift-canvas');
      let opened = false;

      stage.onclick = () => {
        if (opened) return;
        opened = true;
        _synthSound('gift');
        _sound('celebrate');
        lid.style.transform = 'translateY(-48px) rotate(-18deg) scale(1.1)';
        status.innerHTML = '<span style="color:#fbbf24;font-weight:800">🎉 VIP REWARD: 25% DISCOUNT ACTIVATED!</span>';
        subEl.innerHTML = '<span style="color:#10b981;font-weight:700">Code VIP-ULTRA-25 applied to session.</span>';

        cvs.style.display = 'block';
        const ctx = cvs.getContext('2d');
        const particles = Array.from({ length: 45 }, () => ({
          x: 110, y: 75,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 8 - 2,
          color: ['#fbbf24', '#38bdf8', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)],
          size: Math.random() * 4 + 2,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.2
        }));

        let frame = 0;
        const anim = () => {
          if (frame++ > 60) return;
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.25;
            p.rot += p.vrot;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
          });
          requestAnimationFrame(anim);
        };
        anim();
      };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 3. 🎡 3D SPINNING LUCKY WHEEL SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountLuckyWheelSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:16px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.88rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div id="sim-wheel-sub" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:10px">${sub}</div>
          <div style="width:140px;height:140px;margin:0 auto;position:relative">
            <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:14px solid #fbbf24;z-index:5;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.8))"></div>
            <canvas id="sim-wheel-canvas" width="140" height="140" style="border-radius:50%;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.6)"></canvas>
            <div id="sim-wheel-btn" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;color:#000;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.6);user-select:none">SPIN</div>
          </div>
          <div id="sim-wheel-status" style="font-size:0.68rem;color:#94a3b8;margin-top:8px">Click SPIN or drag wheel</div>
        </div>
      `;
      container.appendChild(el);

      const cvs = el.querySelector('#sim-wheel-canvas');
      const spinBtn = el.querySelector('#sim-wheel-btn');
      const status = el.querySelector('#sim-wheel-status');
      const ctx = cvs.getContext('2d');
      const prizes = ['25% OFF', 'VIP PASS', 'TURBO', 'DIAMOND', 'GIFT 🎁', 'PRO', '+500', 'SUPREME'];
      const colors = ['#f59e0b', '#0284c7', '#10b981', '#8b5cf6', '#ec4899', '#38bdf8', '#eab308', '#6366f1'];
      let angle = 0;
      let velocity = 0;
      let spinning = false;
      let lastPeg = -1;

      const drawWheel = () => {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        const cx = 70, cy = 70, r = 68;
        const arc = (Math.PI * 2) / prizes.length;

        for (let i = 0; i < prizes.length; i++) {
          const a = angle + i * arc;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, r, a, a + arc);
          ctx.fillStyle = colors[i % colors.length];
          ctx.fill();
          ctx.stroke();

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(a + arc / 2);
          ctx.textAlign = 'right';
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 8px sans-serif';
          ctx.fillText(prizes[i], r - 10, 3);
          ctx.restore();
        }
      };
      drawWheel();

      let animId;
      const spinLoop = () => {
        if (velocity > 0.005) {
          angle += velocity;
          velocity *= 0.985;

          const pegIdx = Math.floor((angle % (Math.PI * 2)) / ((Math.PI * 2) / prizes.length));
          if (pegIdx !== lastPeg) {
            lastPeg = pegIdx;
            _synthSound('peg');
          }

          drawWheel();
          animId = requestAnimationFrame(spinLoop);
        } else if (spinning) {
          spinning = false;
          _sound('celebrate');
          const finalIdx = Math.floor(((Math.PI * 2 - (angle % (Math.PI * 2))) % (Math.PI * 2)) / ((Math.PI * 2) / prizes.length));
          status.innerHTML = `<span style="color:#fbbf24;font-weight:800">🎉 WON: ${prizes[finalIdx]}!</span>`;
        }
      };

      const startSpin = () => {
        if (spinning) return;
        spinning = true;
        velocity = 0.35 + Math.random() * 0.25;
        status.textContent = 'Wheel spinning with physics... 🎡';
        spinLoop();
      };

      spinBtn.onclick = startSpin;
      cvs.onclick = startSpin;

      this.simCleanupFn = () => {
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 4. 🔦 SPOTLIGHT ONBOARDING GUIDE SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountSpotlightTourSim(container, th, title, sub, pos) {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;inset:0;z-index:99;font-family:system-ui,-apple-system,sans-serif;pointer-events:auto';
      el.innerHTML = `
        <div id="sim-spot-backdrop" style="position:absolute;inset:0;background:rgba(2,6,23,0.78);backdrop-filter:blur(3px)">
          <!-- Luminous Beacon Ring -->
          <div id="sim-spot-ring" style="position:absolute;top:60px;left:70px;width:75px;height:75px;border-radius:50%;border:2px solid ${th.primary};box-shadow:0 0 25px ${th.glow};animation:__sim_pulse 1.5s infinite"></div>
        </div>
        <!-- Floating Guide Tooltip Card -->
        <div id="sim-spot-card" style="position:absolute;top:150px;left:40px;background:${th.bg};border:1px solid ${th.border};border-radius:16px;padding:16px;width:260px;box-shadow:0 20px 50px rgba(0,0,0,0.9),0 0 25px ${th.glow};color:#fff;z-index:10">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span id="sim-spot-step" style="font-size:0.65rem;font-weight:900;letter-spacing:0.5px;color:${th.primary};background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:6px">STEP 1 OF 3</span>
            <span onclick="this.closest('#sim-spot-card').remove()" style="cursor:pointer;color:#94a3b8;font-size:0.75rem">✕</span>
          </div>
          <div id="sim-spot-title" style="font-weight:800;font-size:0.88rem;color:#fff;margin-bottom:4px">${title}</div>
          <div id="sim-spot-sub" style="font-size:0.72rem;color:#cbd5e1;line-height:1.4;margin-bottom:12px">${sub}</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <button id="sim-spot-skip" style="background:none;border:none;color:#94a3b8;font-size:0.7rem;cursor:pointer">Skip</button>
            <button id="sim-spot-next" style="background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-weight:800;font-size:0.72rem;padding:6px 14px;border-radius:8px;cursor:pointer">Next Step ➔</button>
          </div>
        </div>
      `;
      container.appendChild(el);

      const steps = [
        { title: 'Welcome to the Platform ✦', sub: 'Experience high-performance autonomous client-side tools with 0ms latency.', pos: { top: '50px', left: '60px' } },
        { title: 'Full Design Customization 🎨', sub: 'Morph themes, font pairings and responsive breakpoints with a single click.', pos: { top: '70px', left: '160px' } },
        { title: 'Instant Production Export 🚀', sub: 'Generate clean standalone HTML, PWA offline packages or direct deployment.', pos: { top: '100px', left: '110px' } }
      ];

      let curStep = 0;
      const stepEl = el.querySelector('#sim-spot-step');
      const titleEl = el.querySelector('#sim-spot-title');
      const subEl = el.querySelector('#sim-spot-sub');
      const nextBtn = el.querySelector('#sim-spot-next');
      const skipBtn = el.querySelector('#sim-spot-skip');
      const ring = el.querySelector('#sim-spot-ring');

      nextBtn.onclick = () => {
        curStep++;
        if (curStep < steps.length) {
          _synthSound('type');
          stepEl.textContent = `STEP ${curStep + 1} OF 3`;
          titleEl.textContent = steps[curStep].title;
          subEl.textContent = steps[curStep].sub;
          ring.style.top = steps[curStep].pos.top;
          ring.style.left = steps[curStep].pos.left;
          if (curStep === steps.length - 1) nextBtn.textContent = 'Finish Tour ✦';
        } else {
          _sound('celebrate');
          el.remove();
        }
      };

      skipBtn.onclick = () => el.remove();
      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 5. 🦋 ORIGAMI CYBER-BUTTERFLY SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountCyberButterflySim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div id="sim-bfly-wrap" style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
          <div id="sim-bfly-letter" style="background:${th.bg};border:1px solid ${th.border};border-radius:16px;padding:14px 18px;width:250px;box-shadow:0 15px 40px rgba(0,0,0,0.7),0 0 20px ${th.glow};margin-bottom:12px;backdrop-filter:blur(14px);color:#fff;text-align:center;display:none">
            <div style="font-weight:800;font-size:0.86rem;color:${th.primary};margin-bottom:4px">${title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;line-height:1.3;margin-bottom:8px">${sub}</div>
            <button onclick="this.closest('#sim-bfly-letter').style.display='none'" style="background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-weight:800;font-size:0.7rem;padding:5px 12px;border-radius:8px;cursor:pointer">✦ Begin Experience</button>
          </div>
          <div id="sim-bfly-body" style="width:60px;height:50px;position:relative;perspective:400px">
            <div id="sim-bfly-lw" style="position:absolute;top:0;left:6px;width:24px;height:45px;background:linear-gradient(135deg,${th.primary},${th.secondary});border-radius:24px 4px 20px 4px;transform-origin:right center;box-shadow:0 4px 12px ${th.glow};opacity:0.9"></div>
            <div style="position:absolute;top:10px;left:28px;width:4px;height:30px;background:#fff;border-radius:4px;box-shadow:0 0 8px #fff"></div>
            <div id="sim-bfly-rw" style="position:absolute;top:0;right:6px;width:24px;height:45px;background:linear-gradient(225deg,${th.primary},${th.secondary});border-radius:4px 24px 4px 20px;transform-origin:left center;box-shadow:0 4px 12px ${th.glow};opacity:0.9"></div>
          </div>
          <div style="font-size:0.65rem;color:#94a3b8;margin-top:6px">Click butterfly to open message</div>
        </div>
      `;
      container.appendChild(el);

      const wrap = el.querySelector('#sim-bfly-wrap');
      const letter = el.querySelector('#sim-bfly-letter');
      const lw = el.querySelector('#sim-bfly-lw');
      const rw = el.querySelector('#sim-bfly-rw');

      let flapSpeed = 0.08;
      let angle = 0;
      let animId;

      const flap = () => {
        angle += flapSpeed;
        const deg = Math.sin(angle) * 45;
        lw.style.transform = `rotateY(${deg}deg)`;
        rw.style.transform = `rotateY(${-deg}deg)`;
        animId = requestAnimationFrame(flap);
      };
      flap();

      wrap.onmouseenter = () => { flapSpeed = 0.25; };
      wrap.onmouseleave = () => { flapSpeed = 0.08; };

      wrap.onclick = () => {
        _sound('click');
        letter.style.display = (letter.style.display === 'none' ? 'block' : 'none');
      };

      this.simCleanupFn = () => {
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 6. 💧 LIQUID MERCURY DROP SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountLiquidMercurySim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:16px;width:280px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.88rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:8px">${sub}</div>
          <canvas id="sim-mercury-canvas" width="248" height="110" style="border-radius:10px;background:#020617;cursor:pointer;touch-action:none"></canvas>
          <div style="font-size:0.65rem;color:#64748b;margin-top:6px">Drag cursor over liquid to ripple</div>
        </div>
      `;
      container.appendChild(el);

      const cvs = el.querySelector('#sim-mercury-canvas');
      const ctx = cvs.getContext('2d');
      let ripples = [];
      let animId;
      let dropY = 0;
      let dropVy = 3;
      let landed = false;

      cvs.onmousemove = (e) => {
        const r = cvs.getBoundingClientRect();
        ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 2, maxR: 35, alpha: 0.8 });
      };

      const loop = () => {
        ctx.fillStyle = '#050b14';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        if (!landed) {
          dropY += dropVy;
          dropVy += 0.4;
          if (dropY >= 65) {
            landed = true;
            ripples.push({ x: cvs.width / 2, y: 70, r: 4, maxR: 50, alpha: 1.0 });
          }
        }

        const cx = cvs.width / 2;
        const cy = 70;
        const grad = ctx.createRadialGradient(cx - 15, cy - 10, 5, cx, cy, 75);
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(0.3, '#cbd5e1');
        grad.addColorStop(0.7, th.primary);
        grad.addColorStop(1, '#0f172a');

        ctx.beginPath();
        ctx.ellipse(cx, cy, 80 + Math.sin(Date.now() * 0.005) * 4, 25 + Math.cos(Date.now() * 0.005) * 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = th.glow;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ripples.forEach((rp, idx) => {
          rp.r += 1.2;
          rp.alpha *= 0.95;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${rp.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          if (rp.alpha < 0.05) ripples.splice(idx, 1);
        });

        ctx.beginPath();
        ctx.ellipse(cx - 20, cy - 8, 28, 6, -0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();

        animId = requestAnimationFrame(loop);
      };
      loop();

      this.simCleanupFn = () => {
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 7. 📻 RETRO CYBER-VINYL TURNTABLE SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountCyberVinylSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:18px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.88rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px">${sub}</div>
          <div style="width:130px;height:130px;margin:0 auto;position:relative;cursor:grab">
            <div id="sim-vinyl-disc" style="width:130px;height:130px;border-radius:50%;background:repeating-radial-gradient(#050505,#050505 2px,#1e293b 3px,#050505 4px);box-shadow:0 8px 25px rgba(0,0,0,0.8),0 0 15px ${th.glow};position:relative;overflow:hidden">
              <div style="position:absolute;inset:0;background:conic-gradient(from 0deg,transparent 0deg,rgba(255,255,255,0.15) 60deg,transparent 120deg,rgba(56,189,248,0.15) 240deg,transparent 300deg);pointer-events:none"></div>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,${th.primary},${th.secondary});display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;color:#000">33 RPM</div>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:8px;height:8px;border-radius:50%;background:#fff"></div>
            </div>
            <div id="sim-vinyl-arm" style="position:absolute;top:-10px;right:-10px;width:18px;height:65px;transform-origin:top right;transform:rotate(-15deg);transition:transform 0.4s;pointer-events:none">
              <div style="width:4px;height:55px;background:#94a3b8;margin-left:8px;border-radius:2px"></div>
              <div style="width:12px;height:16px;background:${th.primary};border-radius:2px"></div>
            </div>
          </div>
          <div style="display:flex;justify-content:center;gap:8px;margin-top:12px">
            <button id="sim-vinyl-btn" style="background:rgba(255,255,255,0.08);border:1px solid ${th.border};color:#fff;border-radius:6px;font-size:0.72rem;padding:4px 10px;cursor:pointer">🎵 Play Lo-Fi Synth</button>
          </div>
        </div>
      `;
      container.appendChild(el);

      const disc = el.querySelector('#sim-vinyl-disc');
      const arm = el.querySelector('#sim-vinyl-arm');
      const btn = el.querySelector('#sim-vinyl-btn');
      let rot = 0;
      let playing = false;
      let animId;

      const spin = () => {
        if (playing) {
          rot += 1.8;
          disc.style.transform = `rotate(${rot}deg)`;
        }
        animId = requestAnimationFrame(spin);
      };
      spin();

      btn.onclick = () => {
        playing = !playing;
        if (playing) {
          arm.style.transform = 'rotate(18deg)';
          btn.textContent = '⏸ Pause Audio';
          _synthSound('vinyl_ambient');
        } else {
          arm.style.transform = 'rotate(-15deg)';
          btn.textContent = '🎵 Play Lo-Fi Synth';
        }
      };

      let isDragging = false;
      disc.onmousedown = () => { isDragging = true; };
      window.addEventListener('mouseup', () => { isDragging = false; });
      disc.onmousemove = (e) => {
        if (isDragging) {
          rot += e.movementX * 3;
          disc.style.transform = `rotate(${rot}deg)`;
        }
      };

      this.simCleanupFn = () => {
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 8. 🌌 NEURAL CONSTELLATION NEXUS SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountNeuralConstellationSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:16px;width:280px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.88rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:8px">${sub}</div>
          <canvas id="sim-constel-canvas" width="248" height="130" style="border-radius:10px;background:#030712;cursor:grab"></canvas>
          <div style="font-size:0.65rem;color:#64748b;margin-top:6px">Drag to rotate 3D constellation</div>
        </div>
      `;
      container.appendChild(el);

      const cvs = el.querySelector('#sim-constel-canvas');
      const ctx = cvs.getContext('2d');
      const numStars = 60;
      const stars = Array.from({ length: numStars }, () => ({
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 180,
        z: (Math.random() - 0.5) * 180
      }));

      let rotX = 0, rotY = 0;
      let isDragging = false;
      let lastMx = 0, lastMy = 0;

      cvs.onmousedown = (e) => { isDragging = true; lastMx = e.clientX; lastMy = e.clientY; cvs.style.cursor = 'grabbing'; };
      window.addEventListener('mouseup', () => { isDragging = false; if(cvs) cvs.style.cursor = 'grab'; });
      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          rotY += (e.clientX - lastMx) * 0.01;
          rotX += (e.clientY - lastMy) * 0.01;
          lastMx = e.clientX;
          lastMy = e.clientY;
        }
      });

      let animId;
      const render = () => {
        rotY += 0.005;
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        const cx = cvs.width / 2;
        const cy = 70;
        const projected = [];

        stars.forEach(s => {
          let x1 = s.x * Math.cos(rotY) - s.z * Math.sin(rotY);
          let z1 = s.x * Math.sin(rotY) + s.z * Math.cos(rotY);
          let y2 = s.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = s.y * Math.sin(rotX) + z1 * Math.cos(rotX);

          const fov = 160;
          const scale = fov / (fov + z2);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;
          projected.push({ x: px, y: py, scale, z: z2 });
        });

        ctx.lineWidth = 0.8;
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const d = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y);
            if (d < 36) {
              const alpha = (1 - d / 36) * 0.4;
              ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(projected[i].x, projected[i].y);
              ctx.lineTo(projected[j].x, projected[j].y);
              ctx.stroke();
            }
          }
        }

        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, p.scale * 2.5), 0, Math.PI * 2);
          ctx.fillStyle = th.primary;
          ctx.fill();
        });

        animId = requestAnimationFrame(render);
      };
      render();

      this.simCleanupFn = () => {
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 9. 📟 SCI-FI HOLOGRAM CYBER-DECK SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountHologramTerminalSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:monospace`;
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="background:rgba(6,182,212,0.08);border:1px solid ${th.primary};border-radius:12px;padding:16px;width:280px;box-shadow:0 0 35px ${th.glow},inset 0 0 15px rgba(6,182,212,0.2);backdrop-filter:blur(10px);color:#38bdf8;position:relative;overflow:hidden">
            <div style="position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent,transparent 2px,rgba(0,0,0,0.25) 3px);pointer-events:none"></div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.65rem;border-bottom:1px solid rgba(56,189,248,0.3);padding-bottom:4px;margin-bottom:8px">
              <span style="color:${th.primary}">● TRANSMISSION LIVE</span>
              <span style="color:#94a3b8">FREQ: 142.8 GHz</span>
            </div>
            <canvas id="sim-holo-wave" width="248" height="28" style="margin-bottom:8px;background:rgba(0,0,0,0.3);border-radius:4px"></canvas>
            <div id="sim-holo-text" style="font-size:0.75rem;line-height:1.4;min-height:45px;color:#f8fafc"></div>
            <div style="margin-top:10px;display:flex;gap:6px">
              <button onclick="_sound('click');this.textContent='✓ INITIALIZED'" style="background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-weight:900;font-size:0.65rem;padding:6px 12px;border-radius:4px;cursor:pointer">CONNECT</button>
            </div>
          </div>
          <div style="width:0;height:0;border-left:40px solid transparent;border-right:40px solid transparent;border-top:25px solid ${th.border};opacity:0.6;filter:blur(2px)"></div>
          <div style="width:90px;height:8px;background:linear-gradient(90deg,${th.primary},${th.secondary});border-radius:4px;box-shadow:0 0 15px ${th.glow}"></div>
        </div>
      `;
      container.appendChild(el);

      const textEl = el.querySelector('#sim-holo-text');
      const waveCvs = el.querySelector('#sim-holo-wave');
      const ctx = waveCvs.getContext('2d');
      const fullText = `> ${title}\n> ${sub}`;
      let charIdx = 0;
      let textTimer;

      const type = () => {
        if (charIdx < fullText.length) {
          textEl.textContent = fullText.slice(0, ++charIdx);
          _synthSound('type');
          textTimer = setTimeout(type, 35);
        }
      };
      type();

      let phase = 0;
      let animId;
      const drawWave = () => {
        phase += 0.15;
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, waveCvs.width, waveCvs.height);
        ctx.beginPath();
        ctx.strokeStyle = th.primary;
        ctx.lineWidth = 1.5;
        for (let x = 0; x < waveCvs.width; x++) {
          const y = waveCvs.height / 2 + Math.sin(x * 0.08 + phase) * 8 * Math.cos(x * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        animId = requestAnimationFrame(drawWave);
      };
      drawWave();

      this.simCleanupFn = () => {
        clearTimeout(textTimer);
        cancelAnimationFrame(animId);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 10. 🪙 3D GOLD COMMEMORATIVE COIN TOSS SIMULATOR
    // ──────────────────────────────────────────────────────────────────────────
    _mountCoinTossSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:18px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.88rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div id="sim-coin-sub" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:14px">${sub}</div>
          <div id="sim-coin-stage" style="height:110px;position:relative;cursor:pointer;perspective:600px;display:flex;align-items:center;justify-content:center">
            <div id="sim-coin-body" style="width:75px;height:75px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#fbbf24 40%,#d97706);border:3px solid #fef08a;box-shadow:0 8px 25px rgba(245,158,11,0.5);display:flex;align-items:center;justify-content:center;font-size:1.8rem;user-select:none;transform-style:preserve-3d;transition:transform 0.1s">
              👑
            </div>
          </div>
          <div id="sim-coin-result" style="font-size:0.68rem;color:#94a3b8;margin-top:8px">Click coin to toss & reveal bonus</div>
        </div>
      `;
      container.appendChild(el);

      const stage = el.querySelector('#sim-coin-stage');
      const coin = el.querySelector('#sim-coin-body');
      const result = el.querySelector('#sim-coin-result');
      let flipping = false;

      stage.onclick = () => {
        if (flipping) return;
        flipping = true;
        _synthSound('coin');
        result.textContent = 'Flipping through 3D space... 🪙';

        let t = 0;
        const duration = 40;
        const flipInterval = setInterval(() => {
          t++;
          const y = -Math.sin((t / duration) * Math.PI) * 45;
          const rot = t * 36;
          coin.style.transform = `translateY(${y}px) rotateY(${rot}deg) rotateX(${t * 12}deg)`;

          if (t >= duration) {
            clearInterval(flipInterval);
            coin.style.transform = 'translateY(0px) rotateY(0deg) rotateX(0deg)';
            _sound('celebrate');
            result.innerHTML = '<span style="color:#fbbf24;font-weight:800">⭐ HEADS! VIP BONUS UNLOCKED: 25% OFF</span>';
            flipping = false;
          }
        }, 20);
      };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 11. 🔮 HOLO-ORB SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountHoloOrbSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="display:flex;align-items:flex-end;gap:12px">
          <div id="sim-orb-card" style="background:${th.bg};border:1px solid ${th.border};border-radius:16px;padding:14px 18px;box-shadow:0 15px 40px rgba(0,0,0,0.6),0 0 20px ${th.glow};max-width:260px;backdrop-filter:blur(12px);color:#fff">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-weight:800;font-size:0.86rem;color:${th.primary}">${title}</span>
              <span onclick="this.closest('#sim-orb-card').style.display='none'" style="cursor:pointer;font-size:0.75rem;color:#94a3b8;padding:2px 5px">✕</span>
            </div>
            <div style="font-size:0.75rem;color:#cbd5e1;line-height:1.4;margin-bottom:10px">${sub}</div>
            <button onclick="_sound('celebrate');_toast('Welcome to next-gen experience!','success')" style="background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-weight:800;font-size:0.72rem;padding:6px 14px;border-radius:20px;cursor:pointer;box-shadow:0 4px 12px ${th.glow}">Explore Guide ✦</button>
          </div>
          <div id="sim-orb-ball" style="width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 35% 35%,${th.primary},${th.secondary} 70%,#030712);box-shadow:0 0 25px ${th.glow};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.3rem;user-select:none;transition:transform 0.2s">✨</div>
        </div>
      `;
      container.appendChild(el);

      const orbBall = el.querySelector('#sim-orb-ball');
      const orbCard = el.querySelector('#sim-orb-card');
      orbBall.onclick = () => {
        orbCard.style.display = (orbCard.style.display === 'none' ? 'block' : 'none');
        _sound('click');
      };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 12. 🏝️ DYNAMIC ISLAND SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountDynamicIslandSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div id="sim-island-pill" style="background:#000;border:1px solid ${th.border};border-radius:28px;padding:8px 18px;min-width:220px;box-shadow:0 15px 35px rgba(0,0,0,0.8),0 0 20px ${th.glow};color:#fff;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)">
          <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${th.primary},${th.secondary});display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">🏝️</div>
          <div>
            <div style="font-weight:800;font-size:0.84rem;color:${th.primary};display:flex;align-items:center;gap:6px">
              ${title}
              <span style="font-size:0.62rem;padding:2px 6px;border-radius:10px;background:${th.primary};color:#000;font-weight:900">VISIT #3</span>
            </div>
            <div style="font-size:0.72rem;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div>
          </div>
        </div>
      `;
      container.appendChild(el);

      const pill = el.querySelector('#sim-island-pill');
      pill.onclick = () => {
        _sound('celebrate');
        pill.style.transform = 'scale(1.08)';
        setTimeout(() => pill.style.transform = 'scale(1)', 200);
      };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 13. 🎫 SCRATCH CARD SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountScratchCardSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:18px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};width:260px;backdrop-filter:blur(14px);color:#fff">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="font-weight:800;font-size:0.86rem;color:${th.primary}">${title}</span>
            <span onclick="this.closest('.__sim_root')?.remove()" style="cursor:pointer;font-size:0.75rem;color:#94a3b8">✕</span>
          </div>
          <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:10px">${sub}</div>
          <div style="position:relative;width:226px;height:70px;border-radius:10px;overflow:hidden;background:#020617;border:1px dashed ${th.border};display:flex;align-items:center;justify-content:center;flex-direction:column">
            <span style="font-weight:900;font-size:1.1rem;color:#fbbf24;font-family:monospace">VIP-ULTRA-25</span>
            <span style="font-size:0.65rem;color:#10b981;font-weight:700">✓ 25% DISCOUNT UNLOCKED</span>
            <canvas id="sim-scratch-canvas" width="226" height="70" style="position:absolute;top:0;left:0;cursor:crosshair;touch-action:none"></canvas>
          </div>
          <div style="font-size:0.65rem;color:#64748b;margin-top:6px;text-align:center">Scratch silver foil with mouse/finger</div>
        </div>
      `;
      container.appendChild(el);

      const cvs = el.querySelector('#sim-scratch-canvas');
      const ctx = cvs.getContext('2d');
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ RUB TO SCRATCH FOIL ✨', 113, 40);

      let isScratching = false;
      const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
      };

      const getPos = (e) => {
        const r = cvs.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };

      cvs.onmousedown = (e) => { isScratching = true; const p = getPos(e); scratch(p.x, p.y); };
      window.addEventListener('mouseup', () => { isScratching = false; });
      cvs.onmousemove = (e) => { if (isScratching) { const p = getPos(e); scratch(p.x, p.y); } };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 14. 🌀 EXIT-INTENT SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountExitIntentSim(container, th, title, sub, pos) {
      const el = document.createElement('div');
      el.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;font-family:system-ui,-apple-system,sans-serif';
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:20px;padding:24px;width:320px;box-shadow:0 25px 60px rgba(0,0,0,0.85),0 0 35px ${th.glow};backdrop-filter:blur(16px);color:#fff;text-align:center">
          <div style="font-size:2rem;margin-bottom:8px">⭐</div>
          <div style="font-weight:800;font-size:1.05rem;color:${th.primary};margin-bottom:6px">${title}</div>
          <div style="font-size:0.78rem;color:#cbd5e1;line-height:1.4;margin-bottom:16px">${sub}</div>
          <button onclick="_sound('celebrate');_toast('Saved to VIP bookmarks!','success')" style="background:linear-gradient(135deg,${th.primary},${th.secondary});border:none;color:#000;font-weight:800;font-size:0.78rem;padding:9px 18px;border-radius:10px;cursor:pointer;box-shadow:0 4px 15px ${th.glow}">⭐ Bookmark & Return</button>
        </div>
      `;
      container.appendChild(el);
      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 15. 🤖 CORNER BUDDY SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountCornerBuddySim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
          <div id="sim-buddy-bubble" style="background:${th.bg};border:1px solid ${th.border};border-radius:14px;padding:8px 14px;color:#fff;font-size:0.75rem;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.6);margin-bottom:8px">${title}</div>
          <div id="sim-buddy-body" style="width:60px;height:52px;background:linear-gradient(135deg,${th.primary},${th.secondary});border-radius:30px 30px 14px 14px;box-shadow:0 10px 25px ${th.glow};display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.2s">
            <div style="width:14px;height:14px;background:#fff;border-radius:50%;position:relative;overflow:hidden"><div id="sim-pupil-l" style="width:7px;height:7px;background:#0f172a;border-radius:50%;position:absolute;top:3.5px;left:3.5px"></div></div>
            <div style="width:14px;height:14px;background:#fff;border-radius:50%;position:relative;overflow:hidden"><div id="sim-pupil-r" style="width:7px;height:7px;background:#0f172a;border-radius:50%;position:absolute;top:3.5px;left:3.5px"></div></div>
          </div>
        </div>
      `;
      container.appendChild(el);

      const pl = el.querySelector('#sim-pupil-l');
      const pr = el.querySelector('#sim-pupil-r');
      const onMouseMove = (e) => {
        const r = el.getBoundingClientRect();
        const a = Math.atan2(e.clientY - r.top, e.clientX - r.left);
        const d = Math.min(3, Math.hypot(e.clientX - r.left, e.clientY - r.top) / 50);
        if (pl) pl.style.transform = `translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`;
        if (pr) pr.style.transform = `translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`;
      };
      window.addEventListener('mousemove', onMouseMove);

      this.simCleanupFn = () => {
        window.removeEventListener('mousemove', onMouseMove);
        el.remove();
      };
    },

    // ──────────────────────────────────────────────────────────────────────────
    // 16. 🥠 FORTUNE COOKIE SIMULATOR (CLASSIC)
    // ──────────────────────────────────────────────────────────────────────────
    _mountFortuneCookieSim(container, th, title, sub, pos) {
      const posCss = (pos === 'bottom-left') ? 'bottom:20px;left:20px;' : (pos === 'top-center' ? 'top:20px;left:50%;transform:translateX(-50%);' : 'bottom:20px;right:20px;');
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;${posCss};z-index:99;font-family:system-ui,-apple-system,sans-serif`;
      el.innerHTML = `
        <div style="background:${th.bg};border:1px solid ${th.border};border-radius:18px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px ${th.glow};width:260px;backdrop-filter:blur(14px);color:#fff;text-align:center">
          <div style="font-weight:800;font-size:0.86rem;color:${th.primary};margin-bottom:4px">${title}</div>
          <div id="sim-cookie-msg" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px;line-height:1.3">${sub}</div>
          <div id="sim-cookie-wrap" style="display:inline-block;cursor:pointer;font-size:3rem;transition:transform 0.3s;user-select:none">🥠</div>
          <div id="sim-cookie-hint" style="font-size:0.65rem;color:#64748b;margin-top:8px">Click cookie to crack open</div>
        </div>
      `;
      container.appendChild(el);

      const cookieWrap = el.querySelector('#sim-cookie-wrap');
      const cookieMsg = el.querySelector('#sim-cookie-msg');
      const cookieHint = el.querySelector('#sim-cookie-hint');
      let cracked = false;

      cookieWrap.onclick = () => {
        if (cracked) return;
        cracked = true;
        _sound('celebrate');
        cookieWrap.innerHTML = '✨📜✨';
        cookieWrap.style.transform = 'scale(1.2)';
        cookieMsg.innerHTML = '<span style="color:#fbbf24;font-weight:700;font-style:italic">"Great software is built one elegant abstraction at a time."</span>';
        cookieHint.textContent = '✓ Fortune unlocked! Visit daily for new insights.';
      };

      this.simCleanupFn = () => el.remove();
    },

    // ──────────────────────────────────────────────────────────────────────────
    // STANDALONE SNIPPET GENERATOR FOR ALL 16 STYLES WITH SMART TRIGGERS & ANALYTICS
    // ──────────────────────────────────────────────────────────────────────────
    generateStandaloneSnippet() {
      const st = this.activeStyle;
      const th = this.themes[this.activeTheme] || this.themes.cyber;
      const titleStr = this.customTitle || this.styles[st].defaultTitle;
      const subStr = this.customSubtitle || this.styles[st].defaultSub;
      const pos = this.activePosition;
      const trig = this.activeTrigger || 'immediate';

      const configJson = JSON.stringify({
        style: st,
        theme: {
          primary: th.primary,
          secondary: th.secondary,
          bg: th.bg,
          border: th.border,
          glow: th.glow
        },
        title: titleStr,
        sub: subStr,
        position: pos,
        trigger: trig
      }, null, 2);

      return `<!-- Ultra Welcome & Engagement FX — Autonomous Injectable Engine -->
<script>
(function() {
  const config = ${configJson};

  function __uw_track(type) {
    try {
      if (typeof localStorage === 'undefined') return;
      if (type === 'impression') {
        var imp = parseInt(localStorage.getItem('__uw_impressions') || '0', 10) + 1;
        localStorage.setItem('__uw_impressions', String(imp));
      } else if (type === 'click') {
        var clk = parseInt(localStorage.getItem('__uw_clicks') || '0', 10) + 1;
        localStorage.setItem('__uw_clicks', String(clk));
      }
    } catch(e){}
  }

  function __uw_mount() {
    var target = document.body || document.documentElement;
    if (!target) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', __uw_mount);
      } else {
        setTimeout(__uw_mount, 50);
      }
      return;
    }

    function __uw_render() {
      var existing = document.getElementById('__uw_root');
      if (existing) existing.remove();
      var existingStyle = document.getElementById('__uw_style');
      if (existingStyle) existingStyle.remove();

      var styleEl = document.createElement('style');
      styleEl.id = '__uw_style';
      styleEl.textContent = \`
        .__uw_container { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; pointer-events: auto; }
        .__uw_fade_in { animation: __uw_anim 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes __uw_anim {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes __uw_pulse_ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
      \`;
      var head = document.head || document.getElementsByTagName('head')[0] || target;
      head.appendChild(styleEl);

      var root = document.createElement('div');
      root.id = '__uw_root';
      root.className = '__uw_container';
      var posStyle = (config.position === 'bottom-left') 
        ? 'bottom:24px;left:24px;' 
        : (config.position === 'top-center' ? 'top:24px;left:50%;transform:translateX(-50%);' : 'bottom:24px;right:24px;');
      root.style.cssText = 'position:fixed;' + posStyle + 'z-index:9999999;';
      target.appendChild(root);

      __uw_track('impression');

      function __synth(type) {
        try {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          var c = new AC();
          if (c.state === 'suspended') c.resume();
          var now = c.currentTime;
          if (type === 'coin') {
            var o = c.createOscillator(); var g = c.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(1480, now);
            o.frequency.exponentialRampToValueAtTime(740, now + 0.35);
            g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            o.connect(g); g.connect(c.destination); o.start(now); o.stop(now + 0.35);
          } else if (type === 'peg') {
            var o = c.createOscillator(); var g = c.createGain();
            o.type = 'triangle'; o.frequency.setValueAtTime(1200 + Math.random() * 400, now);
            g.gain.setValueAtTime(0.12, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            o.connect(g); g.connect(c.destination); o.start(now); o.stop(now + 0.04);
          } else if (type === 'gift') {
            [523.25, 659.25, 783.99, 1046.5].forEach(function(f, i) {
              var o = c.createOscillator(); var g = c.createGain();
              o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.08);
              g.gain.setValueAtTime(0.15, now + i * 0.08);
              g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
              o.connect(g); g.connect(c.destination); o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.4);
            });
          }
        } catch(e){}
      }

      if (config.style === 'lucky_wheel_3d') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:16px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8);backdrop-filter:blur(14px);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.88rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:10px">\${config.sub}</div>
            <div style="width:140px;height:140px;margin:0 auto;position:relative">
              <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:14px solid #fbbf24;z-index:5"></div>
              <canvas id="__uw_wheel_cvs" width="140" height="140" style="border-radius:50%;cursor:pointer"></canvas>
              <div id="__uw_wheel_spin" onclick="__uw_track('click')" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;color:#000;cursor:pointer">SPIN</div>
            </div>
            <div id="__uw_wheel_stat" style="font-size:0.68rem;color:#94a3b8;margin-top:8px">Click SPIN to play</div>
          </div>
        \`;
        var wcvs = root.querySelector('#__uw_wheel_cvs');
        var wbtn = root.querySelector('#__uw_wheel_spin');
        var wstat = root.querySelector('#__uw_wheel_stat');
        if (wcvs && wcvs.getContext) {
          var wctx = wcvs.getContext('2d');
          var prizes = ['25% OFF', 'VIP PASS', 'TURBO', 'DIAMOND', 'GIFT 🎁', 'PRO', '+500', 'SUPREME'];
          var colors = ['#f59e0b', '#0284c7', '#10b981', '#8b5cf6', '#ec4899', '#38bdf8', '#eab308', '#6366f1'];
          var wangle = 0, wvel = 0, wspinning = false, wlastPeg = -1;
          var drawW = function() {
            wctx.clearRect(0,0,140,140);
            var arc = (Math.PI*2)/prizes.length;
            for(var i=0;i<prizes.length;i++){
              var a = wangle + i*arc;
              wctx.beginPath(); wctx.moveTo(70,70); wctx.arc(70,70,68,a,a+arc);
              wctx.fillStyle = colors[i%colors.length]; wctx.fill(); wctx.stroke();
              wctx.save(); wctx.translate(70,70); wctx.rotate(a+arc/2);
              wctx.textAlign='right'; wctx.fillStyle='#fff'; wctx.font='bold 8px sans-serif';
              wctx.fillText(prizes[i], 58, 3); wctx.restore();
            }
          };
          drawW();
          var wloop = function() {
            if (wvel > 0.005) {
              wangle += wvel; wvel *= 0.985;
              var curPeg = Math.floor((wangle % (Math.PI*2)) / ((Math.PI*2)/prizes.length));
              if (curPeg !== wlastPeg) { wlastPeg = curPeg; __synth('peg'); }
              drawW(); requestAnimationFrame(wloop);
            } else if (wspinning) {
              wspinning = false;
              var winIdx = Math.floor(((Math.PI*2 - (wangle % (Math.PI*2))) % (Math.PI*2)) / ((Math.PI*2)/prizes.length));
              wstat.innerHTML = '<span style="color:#fbbf24;font-weight:800">🎉 WON: ' + prizes[winIdx] + '!</span>';
            }
          };
          var doSpin = function() {
            if (wspinning) return;
            wspinning = true; wvel = 0.35 + Math.random()*0.25;
            wstat.textContent = 'Spinning... 🎡'; wloop();
          };
          wbtn.onclick = function(){ __uw_track('click'); doSpin(); };
          wcvs.onclick = function(){ __uw_track('click'); doSpin(); };
        }
      } else if (config.style === 'spotlight_tour') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:18px;padding:18px;width:280px;box-shadow:0 20px 50px rgba(0,0,0,0.85);backdrop-filter:blur(14px);color:#fff">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span id="__uw_sp_step" style="font-size:0.65rem;font-weight:900;color:\${config.theme.primary};background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:6px">STEP 1 OF 3</span>
              <span onclick="this.closest('.__uw_container').remove()" style="cursor:pointer;color:#94a3b8;font-size:0.75rem">✕</span>
            </div>
            <div id="__uw_sp_title" style="font-weight:800;font-size:0.9rem;color:#fff;margin-bottom:4px">\${config.title}</div>
            <div id="__uw_sp_sub" style="font-size:0.72rem;color:#cbd5e1;line-height:1.4;margin-bottom:12px">\${config.sub}</div>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <button onclick="this.closest('.__uw_container').remove()" style="background:none;border:none;color:#94a3b8;font-size:0.7rem;cursor:pointer">Skip</button>
              <button id="__uw_sp_next" style="background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border:none;color:#000;font-weight:800;font-size:0.72rem;padding:6px 14px;border-radius:8px;cursor:pointer">Next Step ➔</button>
            </div>
          </div>
        \`;
        var spSteps = [
          { t: config.title, s: config.sub },
          { t: 'Customization Engine 🎨', s: 'Tailor color themes, positioning and triggers effortlessly.' },
          { t: 'Instant Launch Ready 🚀', s: 'Export and deploy across all web targets.' }
        ];
        var spCur = 0;
        var spStep = root.querySelector('#__uw_sp_step');
        var spTitle = root.querySelector('#__uw_sp_title');
        var spSub = root.querySelector('#__uw_sp_sub');
        var spNext = root.querySelector('#__uw_sp_next');
        spNext.onclick = function() {
          __uw_track('click');
          spCur++;
          if (spCur < spSteps.length) {
            spStep.textContent = 'STEP ' + (spCur+1) + ' OF 3';
            spTitle.textContent = spSteps[spCur].t;
            spSub.textContent = spSteps[spCur].s;
            if (spCur === spSteps.length - 1) spNext.textContent = 'Finish Tour ✦';
          } else {
            root.remove();
          }
        };
      } else if (config.style === 'holo_badge_3d') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="perspective:1000px">
            <div style="width:28px;height:12px;background:linear-gradient(180deg,#94a3b8,#475569);border-radius:4px 4px 0 0;margin:0 auto -2px;box-shadow:0 2px 4px rgba(0,0,0,0.5)"></div>
            <div id="__uw_badge" onclick="__uw_track('click')" style="width:270px;height:155px;border-radius:16px;background:\${config.theme.bg};border:1px solid \${config.theme.border};box-shadow:0 20px 45px rgba(0,0,0,0.7),0 0 25px \${config.theme.glow};position:relative;cursor:pointer;transform-style:preserve-3d;transition:transform 0.1s ease-out;overflow:hidden">
              <div style="position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;justify-content:space-between;backface-visibility:hidden;color:#fff">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-weight:900;font-size:0.75rem;letter-spacing:1px;color:\${config.theme.primary}">VIP ACCESS</span>
                  <span style="font-family:monospace;font-size:0.7rem;color:#94a3b8">#VIP-9942</span>
                </div>
                <div>
                  <div style="font-weight:800;font-size:0.95rem;color:#fff;margin-bottom:4px">\${config.title}</div>
                  <div style="font-size:0.72rem;color:#cbd5e1;line-height:1.3">\${config.sub}</div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.65rem;color:#64748b">
                  <span>✦ ULTRA VERIFIED</span>
                  <span style="color:\${config.theme.primary}">Click to flip ↺</span>
                </div>
              </div>
              <div style="position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;backface-visibility:hidden;transform:rotateY(180deg);background:#090d16;color:#fff">
                <div style="font-size:0.72rem;font-weight:800;color:\${config.theme.primary};margin-bottom:6px">AUTHORIZATION GRANTED</div>
                <div style="width:70px;height:70px;background:#fff;border-radius:8px;padding:5px;display:flex;align-items:center;justify-content:center">
                  <div style="width:100%;height:100%;background:repeating-linear-gradient(45deg,#000,#000 6px,#fff 6px,#fff 12px);border-radius:4px"></div>
                </div>
                <div style="font-size:0.62rem;color:#94a3b8;margin-top:6px;font-family:monospace">TOKEN: 8F2A-99B1</div>
              </div>
              <div id="__uw_sheen" style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,0.2) 40%,rgba(56,189,248,0.25) 50%,transparent 70%);opacity:0.6;mix-blend-mode:color-dodge"></div>
            </div>
          </div>
        \`;
        var card = root.querySelector('#__uw_badge');
        var flipped = false;
        window.addEventListener('mousemove', function(e) {
          if (!card) return;
          var r = card.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
          var dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
          card.style.transform = 'rotateX(' + (-dy * 16) + 'deg) rotateY(' + ((flipped ? 180 : 0) + dx * 16) + 'deg)';
        });
        card.onclick = function() {
          __uw_track('click');
          flipped = !flipped;
          card.style.transition = 'transform 0.4s';
          card.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
          setTimeout(function(){ card.style.transition = 'transform 0.1s ease-out'; }, 400);
        };
      } else if (config.style === 'physics_gift_3d') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 25px \${config.theme.glow};width:270px;text-align:center;backdrop-filter:blur(14px);color:#fff">
            <div style="font-weight:800;font-size:0.92rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div id="__uw_gsub" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:14px">\${config.sub}</div>
            <div id="__uw_gstage" style="width:140px;height:110px;margin:0 auto;position:relative;cursor:pointer">
              <div id="__uw_glid" style="width:110px;height:32px;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border-radius:10px 10px 4px 4px;margin:0 auto;position:relative;z-index:3;transition:all 0.4s">
                <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:1.6rem">🎀</div>
              </div>
              <div style="width:96px;height:65px;background:linear-gradient(180deg,#1e1b4b,#0f172a);border:1px solid \${config.theme.border};margin:0 auto;border-radius:0 0 10px 10px;overflow:hidden">
                <div style="width:24px;height:100%;background:linear-gradient(180deg,\\\${config.theme.primary},\\\${config.theme.secondary});margin:0 auto"></div>
              </div>
            </div>
            <div id="__uw_gstat" style="font-size:0.68rem;color:#94a3b8;margin-top:10px">Click to unbox gift</div>
          </div>
        \`;
        var stage = root.querySelector('#__uw_gstage');
        var lid = root.querySelector('#__uw_glid');
        var gstat = root.querySelector('#__uw_gstat');
        var gsub = root.querySelector('#__uw_gsub');
        var opened = false;
        stage.onclick = function() {
          if (opened) return;
          opened = true;
          __uw_track('click');
          __synth('gift');
          lid.style.transform = 'translateY(-48px) rotate(-18deg) scale(1.1)';
          gstat.innerHTML = '<span style="color:#fbbf24;font-weight:800">🎉 VIP REWARD UNLOCKED: 25% OFF</span>';
          gsub.innerHTML = '<span style="color:#10b981;font-weight:700">Promo code VIP-ULTRA-25 activated!</span>';
        };
      } else if (config.style === 'cyber_butterfly_3d') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
            <div id="__uw_bfly_msg" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:16px;padding:14px 18px;width:250px;box-shadow:0 15px 40px rgba(0,0,0,0.7);margin-bottom:12px;color:#fff;text-align:center;display:none">
              <div style="font-weight:800;font-size:0.86rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
              <div style="font-size:0.72rem;color:#cbd5e1;line-height:1.3;margin-bottom:8px">\${config.sub}</div>
              <button onclick="__uw_track('click');this.closest('#__uw_bfly_msg').style.display='none'" style="background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border:none;color:#000;font-weight:800;font-size:0.7rem;padding:5px 12px;border-radius:8px;cursor:pointer">✦ Welcome ✦</button>
            </div>
            <div id="__uw_bfly_body" style="width:60px;height:50px;position:relative;perspective:400px">
              <div id="__uw_bfly_lw" style="position:absolute;top:0;left:6px;width:24px;height:45px;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border-radius:24px 4px 20px 4px;transform-origin:right center"></div>
              <div style="position:absolute;top:10px;left:28px;width:4px;height:30px;background:#fff;border-radius:4px"></div>
              <div id="__uw_bfly_rw" style="position:absolute;top:0;right:6px;width:24px;height:45px;background:linear-gradient(225deg,\${config.theme.primary},\${config.theme.secondary});border-radius:4px 24px 4px 20px;transform-origin:left center"></div>
            </div>
          </div>
        \`;
        var bfly = root.querySelector('#__uw_bfly_body');
        var bmsg = root.querySelector('#__uw_bfly_msg');
        var lw = root.querySelector('#__uw_bfly_lw');
        var rw = root.querySelector('#__uw_bfly_rw');
        var angle = 0;
        setInterval(function() {
          angle += 0.1;
          var deg = Math.sin(angle) * 45;
          if (lw) lw.style.transform = 'rotateY(' + deg + 'deg)';
          if (rw) rw.style.transform = 'rotateY(' + (-deg) + 'deg)';
        }, 16);
        bfly.onclick = function() {
          __uw_track('click');
          bmsg.style.display = (bmsg.style.display === 'none' ? 'block' : 'none');
        };
      } else if (config.style === 'liquid_mercury_drop') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:16px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8);backdrop-filter:blur(14px);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.88rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:8px">\${config.sub}</div>
            <canvas id="__uw_mcvs" width="238" height="100" style="border-radius:10px;background:#020617;cursor:pointer"></canvas>
          </div>
        \`;
        var mcvs = root.querySelector('#__uw_mcvs');
        if (mcvs && mcvs.getContext) {
          var mctx = mcvs.getContext('2d');
          var ripples = [];
          mcvs.onmousemove = function(e) {
            __uw_track('click');
            var r = mcvs.getBoundingClientRect();
            ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 2, alpha: 0.8 });
          };
          setInterval(function() {
            mctx.fillStyle = '#050b14'; mctx.fillRect(0,0,mcvs.width,mcvs.height);
            var cx = mcvs.width/2; var cy = 60;
            var g = mctx.createRadialGradient(cx-15, cy-10, 5, cx, cy, 70);
            g.addColorStop(0, '#f8fafc'); g.addColorStop(0.5, config.theme.primary); g.addColorStop(1, '#0f172a');
            mctx.beginPath(); mctx.ellipse(cx, cy, 75 + Math.sin(Date.now()*0.005)*3, 22, 0, 0, Math.PI*2);
            mctx.fillStyle = g; mctx.fill();
            ripples.forEach(function(rp, i) {
              rp.r += 1.2; rp.alpha *= 0.94;
              mctx.beginPath(); mctx.arc(rp.x, rp.y, rp.r, 0, Math.PI*2);
              mctx.strokeStyle = 'rgba(255,255,255,' + rp.alpha + ')'; mctx.stroke();
              if (rp.alpha < 0.05) ripples.splice(i, 1);
            });
          }, 30);
        }
      } else if (config.style === 'cyber_vinyl_turntable') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:18px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8);backdrop-filter:blur(14px);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.88rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px">\${config.sub}</div>
            <div style="width:120px;height:120px;margin:0 auto;position:relative">
              <div id="__uw_vdisc" onclick="__uw_track('click')" style="width:120px;height:120px;border-radius:50%;background:repeating-radial-gradient(#050505,#050505 2px,#1e293b 3px,#050505 4px);box-shadow:0 8px 25px rgba(0,0,0,0.8);position:relative">
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:900;color:#000">33 RPM</div>
              </div>
              <div style="position:absolute;top:-8px;right:-8px;width:14px;height:60px;transform:rotate(15deg)">
                <div style="width:3px;height:50px;background:#94a3b8;margin-left:6px"></div>
                <div style="width:10px;height:14px;background:\${config.theme.primary}"></div>
              </div>
            </div>
          </div>
        \`;
        var vdisc = root.querySelector('#__uw_vdisc');
        var vrot = 0;
        setInterval(function() {
          vrot += 1.8;
          if (vdisc) vdisc.style.transform = 'rotate(' + vrot + 'deg)';
        }, 30);
      } else if (config.style === 'neural_constellation') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:16px;width:270px;box-shadow:0 20px 50px rgba(0,0,0,0.8);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.88rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:8px">\${config.sub}</div>
            <canvas id="__uw_ncvs" width="238" height="110" style="border-radius:10px;background:#030712"></canvas>
          </div>
        \`;
        var ncvs = root.querySelector('#__uw_ncvs');
        if (ncvs && ncvs.getContext) {
          var nctx = ncvs.getContext('2d');
          var stars = Array.from({length: 45}, function(){ return { x: (Math.random()-0.5)*160, y: (Math.random()-0.5)*160, z: (Math.random()-0.5)*160 }; });
          var nrot = 0;
          setInterval(function() {
            nrot += 0.01;
            nctx.fillStyle = '#020617'; nctx.fillRect(0,0,ncvs.width,ncvs.height);
            var cx = ncvs.width/2; var cy = ncvs.height/2;
            var proj = stars.map(function(s){
              var x1 = s.x*Math.cos(nrot) - s.z*Math.sin(nrot);
              var z1 = s.x*Math.sin(nrot) + s.z*Math.cos(nrot);
              var sc = 140 / (140 + z1);
              return { x: cx + x1*sc, y: cy + s.y*sc, sc: sc };
            });
            for(var i=0;i<proj.length;i++){
              for(var j=i+1;j<proj.length;j++){
                var d = Math.hypot(proj[i].x - proj[j].x, proj[i].y - proj[j].y);
                if (d < 30) {
                  nctx.strokeStyle = 'rgba(56,189,248,' + ((1-d/30)*0.35) + ')';
                  nctx.beginPath(); nctx.moveTo(proj[i].x, proj[i].y); nctx.lineTo(proj[j].x, proj[j].y); nctx.stroke();
                }
              }
            }
            proj.forEach(function(p){
              nctx.beginPath(); nctx.arc(p.x, p.y, Math.max(1, p.sc*2), 0, Math.PI*2);
              nctx.fillStyle = config.theme.primary; nctx.fill();
            });
          }, 30);
        }
      } else if (config.style === 'hologram_terminal') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:rgba(6,182,212,0.08);border:1px solid \${config.theme.primary};border-radius:12px;padding:16px;width:270px;box-shadow:0 0 35px \${config.theme.glow};color:#38bdf8;font-family:monospace">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.65rem;border-bottom:1px solid rgba(56,189,248,0.3);padding-bottom:4px;margin-bottom:8px">
              <span>● TRANSMISSION LIVE</span>
              <span>142.8 GHz</span>
            </div>
            <div style="font-size:0.82rem;font-weight:900;color:#fff;margin-bottom:4px">> \${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;line-height:1.3">> \${config.sub}</div>
          </div>
        \`;
      } else if (config.style === 'coin_toss_3d') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:18px;width:260px;box-shadow:0 20px 50px rgba(0,0,0,0.8);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.88rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px">\${config.sub}</div>
            <div id="__uw_cstage" style="height:90px;display:flex;align-items:center;justify-content:center;cursor:pointer">
              <div id="__uw_cbody" style="width:65px;height:65px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#fbbf24,#d97706);border:3px solid #fef08a;box-shadow:0 8px 25px rgba(245,158,11,0.5);display:flex;align-items:center;justify-content:center;font-size:1.6rem">👑</div>
            </div>
            <div id="__uw_cres" style="font-size:0.68rem;color:#94a3b8;margin-top:6px">Click to flip coin</div>
          </div>
        \`;
        var cstage = root.querySelector('#__uw_cstage');
        var cbody = root.querySelector('#__uw_cbody');
        var cres = root.querySelector('#__uw_cres');
        var cflipping = false;
        cstage.onclick = function() {
          if (cflipping) return;
          cflipping = true;
          __uw_track('click');
          __synth('coin');
          var ct = 0;
          var ci = setInterval(function() {
            ct++;
            var cy = -Math.sin((ct / 30) * Math.PI) * 40;
            cbody.style.transform = 'translateY(' + cy + 'px) rotateY(' + (ct * 36) + 'deg)';
            if (ct >= 30) {
              clearInterval(ci);
              cbody.style.transform = 'translateY(0) rotateY(0deg)';
              cres.innerHTML = '<span style="color:#fbbf24;font-weight:800">⭐ 25% VIP BONUS UNLOCKED!</span>';
              cflipping = false;
            }
          }, 20);
        };
      } else if (config.style === 'holo_orb') {
        root.innerHTML = \`
          <div style="display:flex;align-items:flex-end;gap:12px">
            <div id="__uw_card" class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:16px;padding:14px 18px;box-shadow:0 15px 40px rgba(0,0,0,0.6),0 0 20px \${config.theme.glow};max-width:280px;backdrop-filter:blur(12px);color:#fff">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <span style="font-weight:800;font-size:0.86rem;color:\${config.theme.primary}">\${config.title}</span>
                <span onclick="this.closest('#__uw_card').remove()" style="cursor:pointer;font-size:0.75rem;color:#94a3b8;padding:2px 5px">✕</span>
              </div>
              <div style="font-size:0.75rem;color:#cbd5e1;line-height:1.4;margin-bottom:10px">\${config.sub}</div>
              <button onclick="__uw_track('click');this.closest('#__uw_card').remove()" style="background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border:none;color:#000;font-weight:800;font-size:0.72rem;padding:6px 14px;border-radius:20px;cursor:pointer;box-shadow:0 4px 12px \${config.theme.glow}">Explore Guide ✦</button>
            </div>
            <div onclick="__uw_track('click');const c=document.getElementById('__uw_card');if(c)c.style.display=(c.style.display==='none'?'block':'none')" style="width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 35% 35%,\${config.theme.primary},\${config.theme.secondary} 70%,#030712);box-shadow:0 0 25px \${config.theme.glow};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.4rem;user-select:none">✨</div>
          </div>
        \`;
      } else if (config.style === 'dynamic_island') {
        var visits = 1;
        try {
          visits = parseInt(localStorage.getItem('__uw_visits') || '0', 10) + 1;
          localStorage.setItem('__uw_visits', visits);
        } catch(e){}
        root.innerHTML = \`
          <div class="__uw_fade_in" onclick="__uw_track('click')" style="background:#000;border:1px solid \${config.theme.border};border-radius:28px;padding:8px 18px;min-width:220px;box-shadow:0 15px 35px rgba(0,0,0,0.8),0 0 20px \${config.theme.glow};color:#fff;display:flex;align-items:center;gap:12px;cursor:pointer">
            <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">🏝️</div>
            <div>
              <div style="font-weight:800;font-size:0.84rem;color:\${config.theme.primary};display:flex;align-items:center;gap:6px">
                \${config.title}
                <span style="font-size:0.62rem;padding:2px 6px;border-radius:10px;background:\${config.theme.primary};color:#000;font-weight:900">VISIT #\${visits}</span>
              </div>
              <div style="font-size:0.72rem;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${config.sub}</div>
            </div>
          </div>
        \`;
      } else if (config.style === 'scratch_card') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:18px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.8);width:260px;backdrop-filter:blur(14px);color:#fff">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-weight:800;font-size:0.86rem;color:\${config.theme.primary}">\${config.title}</span>
              <span onclick="this.closest('.__uw_container').remove()" style="cursor:pointer;font-size:0.75rem;color:#94a3b8">✕</span>
            </div>
            <div style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px">\${config.sub}</div>
            <div style="position:relative;width:226px;height:70px;border-radius:10px;overflow:hidden;background:#020617;border:1px dashed \${config.theme.border};display:flex;align-items:center;justify-content:center;flex-direction:column">
              <span style="font-weight:900;font-size:1.1rem;color:#fbbf24;font-family:monospace">VIP-ULTRA-25</span>
              <span style="font-size:0.65rem;color:#10b981;font-weight:700">✓ 25% DISCOUNT UNLOCKED</span>
              <canvas id="__uw_scratch" width="226" height="70" style="position:absolute;top:0;left:0;cursor:crosshair;touch-action:none"></canvas>
            </div>
          </div>
        \`;
        var c = root.querySelector('#__uw_scratch');
        if (c && c.getContext) {
          var ctx = c.getContext('2d');
          ctx.fillStyle = '#94a3b8'; ctx.fillRect(0,0,226,70);
          ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px system-ui, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('✨ RUB TO SCRATCH FOIL ✨', 113, 40);
          var down = false;
          var scratch = function(x, y) {
            ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
          };
          var getPos = function(e) {
            var r = c.getBoundingClientRect();
            return { x: (e.touches ? e.touches[0].clientX : e.clientX) - r.left, y: (e.touches ? e.touches[0].clientY : e.clientY) - r.top };
          };
          c.onmousedown = function(e) { __uw_track('click'); down = true; var p = getPos(e); scratch(p.x, p.y); };
          window.addEventListener('mouseup', function() { down = false; });
          c.onmousemove = function(e) { if (down) { var p = getPos(e); scratch(p.x, p.y); } };
        }
      } else if (config.style === 'exit_intent') {
        var triggered = false;
        document.addEventListener('mouseleave', function(e) {
          if (e.clientY <= 10 && !triggered) {
            triggered = true;
            root.innerHTML = \`
              <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:20px;padding:22px;width:320px;box-shadow:0 25px 60px rgba(0,0,0,0.85);backdrop-filter:blur(16px);color:#fff;text-align:center">
                <div style="font-weight:800;font-size:1.05rem;color:\${config.theme.primary};margin-bottom:6px">\${config.title}</div>
                <div style="font-size:0.78rem;color:#cbd5e1;line-height:1.4;margin-bottom:16px">\${config.sub}</div>
                <button onclick="__uw_track('click');this.closest('.__uw_container').remove()" style="background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border:none;color:#000;font-weight:800;font-size:0.78rem;padding:9px 18px;border-radius:10px;cursor:pointer">⭐ Bookmark &amp; Return</button>
              </div>
            \`;
          }
        });
      } else if (config.style === 'corner_buddy') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="display:flex;flex-direction:column;align-items:center">
            <div style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:14px;padding:8px 14px;color:#fff;font-size:0.75rem;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.6);margin-bottom:8px">\${config.title}</div>
            <div onclick="__uw_track('click')" style="width:60px;height:52px;background:linear-gradient(135deg,\${config.theme.primary},\${config.theme.secondary});border-radius:30px 30px 14px 14px;box-shadow:0 10px 25px \${config.theme.glow};display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer">
              <div style="width:14px;height:14px;background:#fff;border-radius:50%;position:relative;overflow:hidden"><div id="__uw_pl" style="width:7px;height:7px;background:#0f172a;border-radius:50%;position:absolute;top:3.5px;left:3.5px"></div></div>
              <div style="width:14px;height:14px;background:#fff;border-radius:50%;position:relative;overflow:hidden"><div id="__uw_pr" style="width:7px;height:7px;background:#0f172a;border-radius:50%;position:absolute;top:3.5px;left:3.5px"></div></div>
            </div>
          </div>
        \`;
        var pl = root.querySelector('#__uw_pl'); var pr = root.querySelector('#__uw_pr');
        window.addEventListener('mousemove', function(e) {
          var r = root.getBoundingClientRect();
          var a = Math.atan2(e.clientY - r.top, e.clientX - r.left);
          var d = Math.min(3, Math.hypot(e.clientX - r.left, e.clientY - r.top) / 50);
          if (pl) pl.style.transform = 'translate(' + (Math.cos(a)*d) + 'px,' + (Math.sin(a)*d) + 'px)';
          if (pr) pr.style.transform = 'translate(' + (Math.cos(a)*d) + 'px,' + (Math.sin(a)*d) + 'px)';
        });
      } else if (config.style === 'fortune_cookie') {
        root.innerHTML = \`
          <div class="__uw_fade_in" style="background:\${config.theme.bg};border:1px solid \${config.theme.border};border-radius:18px;padding:18px;box-shadow:0 20px 50px rgba(0,0,0,0.8);width:260px;backdrop-filter:blur(14px);color:#fff;text-align:center">
            <div style="font-weight:800;font-size:0.86rem;color:\${config.theme.primary};margin-bottom:4px">\${config.title}</div>
            <div id="__uw_fmsg" style="font-size:0.72rem;color:#cbd5e1;margin-bottom:12px">\${config.sub}</div>
            <div id="__uw_fc" style="font-size:3rem;cursor:pointer;user-select:none;transition:transform 0.3s">🥠</div>
          </div>
        \`;
        var fc = root.querySelector('#__uw_fc');
        var fm = root.querySelector('#__uw_fmsg');
        if (fc) fc.onclick = function() {
          __uw_track('click');
          fc.innerHTML = '✨📜✨'; fc.style.transform = 'scale(1.2)';
          fm.innerHTML = '<span style="color:#fbbf24;font-weight:700">"Great code is built one elegant abstraction at a time."</span>';
        };
      }
    }

    // Smart Trigger Activation
    if (config.trigger === 'scroll') {
      var onScroll = function() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0 && (window.scrollY / h) >= 0.35) {
          window.removeEventListener('scroll', onScroll);
          __uw_render();
        }
      };
      window.addEventListener('scroll', onScroll);
    } else if (config.trigger === 'idle') {
      var idleTimer;
      var resetTimer = function() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function() {
          window.removeEventListener('mousemove', resetTimer);
          window.removeEventListener('keydown', resetTimer);
          __uw_render();
        }, 10000);
      };
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      resetTimer();
    } else if (config.trigger === 'first_time') {
      try {
        if (!localStorage.getItem('__uw_first_seen')) {
          localStorage.setItem('__uw_first_seen', '1');
          __uw_render();
        }
      } catch(e) {
        __uw_render();
      }
    } else if (config.trigger === 'exit') {
      var onMouseLeave = function(e) {
        if (e.clientY <= 10) {
          document.removeEventListener('mouseleave', onMouseLeave);
          __uw_render();
        }
      };
      document.addEventListener('mouseleave', onMouseLeave);
    } else {
      __uw_render();
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    __uw_mount();
  } else {
    document.addEventListener('DOMContentLoaded', __uw_mount);
    window.addEventListener('load', __uw_mount);
  }
})();
` + '</' + 'script>';
    },

    injectIntoApp() {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const snippet = this.generateStandaloneSnippet();
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

      if (targetApp && targetApp.html !== undefined) {
        targetApp.html = targetApp.html.replace(/<!-- Ultra Welcome & Engagement FX[\s\S]*?<\/script>/gi, '');
        targetApp.html = targetApp.html.trim() + '\n\n' + snippet;

        if (targetApp.editor && targetApp.currentTab === 'html') {
          try { targetApp.editor.setValue(targetApp.html); } catch(e){}
        }

        if (typeof window.refreshPreview === 'function') {
          window.refreshPreview();
        } else if (typeof refreshPreview === 'function') {
          refreshPreview();
        }

        try {
          const previewFrame = document.getElementById('preview-frame');
          const pDoc = previewFrame ? (previewFrame.contentDocument || previewFrame.contentWindow?.document) : null;
          if (pDoc) {
            const oldRoot = pDoc.getElementById('__uw_root');
            if (oldRoot) oldRoot.remove();
            const s = pDoc.createElement('script');
            const jsCode = snippet.replace(/<script>([\s\S]*?)<\/script>/i, '$1').replace(/<!--[\s\S]*?-->/g, '');
            s.textContent = jsCode;
            (pDoc.body || pDoc.documentElement).appendChild(s);
          }
        } catch(e) {
          console.warn('Live iframe injection fallback:', e);
        }

        this.close();

        _sound('celebrate');
        if (window.UltraConfetti && typeof window.UltraConfetti.fire === 'function') {
          window.UltraConfetti.fire(50);
        }
        _toast(isFr ? "🌟 Effet d'accueil injecté avec succès dans l'application !" : "🌟 Welcome FX injected into active application!", "success");
      } else {
        _toast(isFr ? "Aucune application active chargée." : "No active application loaded.", "warning");
      }
    },

    async copyEmbedCode() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Welcome FX Code')) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const snippet = this.generateStandaloneSnippet();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(snippet);
        } else {
          const ta = document.createElement('textarea');
          ta.value = snippet;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        _sound('celebrate');
        _toast(isFr ? "📋 Code d'intégration autonome copié dans le presse-papier !" : "📋 Standalone embed code copied to clipboard!", "success");
      } catch(e) {
        _toast(isFr ? "Erreur de copie." : "Clipboard error.", "warning");
      }
    }
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('modal-welcome-studio');
        if (modal && modal.classList.contains('show')) {
          UltraWelcomeStudio.close();
        }
      }
    });
  }

  window.UltraWelcomeStudio = UltraWelcomeStudio;
  console.log('[ULTRA] Welcome & Engagement FX Studio (16 Models) initialized.');
})();
