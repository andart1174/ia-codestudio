// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — QUANTUM MULTIVERSE & SYNTHETIC USER SIMULATOR (v1.0)
// UltraMultiverseStudio (modal-multiverse-studio)
// 100% Client-Side Parallel Realities · 500 AI Synthetic Bots Swarm Simulation
// Real-Time Conversion Telemetry · Dynamic Heatmap · 1-Click Design System Adoption
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
      console.log('[UltraMultiverse]', msg);
    }
  }

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && UltraSoundFX.play) {
      try { UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _confetti() {
    if (typeof UltraConfetti !== 'undefined' && UltraConfetti.fire) {
      try { UltraConfetti.fire(50); } catch(e){}
    }
  }

  function _injectCodeToActiveApp(snippet, markerRegex, label) {
    const isFr = _isFr();
    const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);

    if (targetApp && targetApp.html !== undefined) {
      if (markerRegex) {
        targetApp.html = targetApp.html.replace(markerRegex, '');
      }
      targetApp.html = targetApp.html.trim() + '\n\n' + snippet;

      if (targetApp.editor) {
        try {
          if (targetApp.currentTab === 'html' || !targetApp.currentTab) {
            targetApp.editor.setValue(targetApp.html);
          }
        } catch(e){}
      }

      if (typeof window.refreshPreview === 'function') {
        window.refreshPreview();
      } else if (typeof refreshPreview === 'function') {
        refreshPreview();
      }

      _sound('celebrate');
      _confetti();
      _toast(isFr ? ('✨ ' + label + ' injecté avec succès dans votre application !') : ('✨ ' + label + ' injected successfully into your application!'), 'success');
      return true;
    } else {
      _toast(isFr ? 'Aucune application active chargée.' : 'No active application loaded.', 'warning');
      return false;
    }
  }

  async function _copyCode(text, label) {
    const isFr = _isFr();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      _sound('click');
      _toast(isFr ? ('📋 ' + label + ' copié dans le presse-papiers !') : ('📋 ' + label + ' copied to clipboard!'), 'success');
    } catch(err) {
      _toast(isFr ? 'Impossible de copier le code.' : 'Unable to copy code.', 'error');
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // UNIVERSES CONFIGURATIONS
  // ══════════════════════════════════════════════════════════════════════════════
  const UNIVERSES = {
    alpha: {
      id: 'alpha',
      name: 'Cyberpunk Neon Void',
      badge: '🌌 Universe α',
      tagline: 'High-contrast neon cyan & magenta with cyber scanlines',
      primary: '#00f3ff',
      secondary: '#ff007f',
      bgDark: '#050814',
      cardBg: 'rgba(13, 19, 39, 0.88)',
      borderColor: 'rgba(0, 243, 255, 0.45)',
      glowColor: 'rgba(0, 243, 255, 0.35)',
      fontFamily: "'Orbitron', 'Courier New', monospace",
      radius: '4px',
      baseConversion: 16.8,
      baseDwell: 48,
      cssOverrides: `
/* ═══ ULTRA QUANTUM MULTIVERSE: CYBERPUNK NEON ═══ */
:root {
  --primary: #00f3ff !important;
  --secondary: #ff007f !important;
  --bg-main: #050814 !important;
  --bg-card: rgba(13, 19, 39, 0.9) !important;
  --border-neon: 1px solid rgba(0, 243, 255, 0.5) !important;
  --font-cyber: 'Courier New', monospace !important;
}
body {
  background: #050814 !important;
  color: #e0f2fe !important;
  font-family: 'Courier New', monospace !important;
}
button, .btn, .btn-primary {
  background: linear-gradient(135deg, #00f3ff, #ff007f) !important;
  color: #000 !important;
  font-weight: 800 !important;
  border-radius: 4px !important;
  box-shadow: 0 0 18px rgba(0, 243, 255, 0.45) !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  border: none !important;
}
.card, .box, [class*="card"] {
  background: rgba(13, 19, 39, 0.9) !important;
  border: 1px solid rgba(0, 243, 255, 0.35) !important;
  border-radius: 4px !important;
  box-shadow: 0 0 25px rgba(0, 243, 255, 0.15), inset 0 0 15px rgba(255, 0, 127, 0.08) !important;
}
h1, h2, h3 {
  color: #00f3ff !important;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5) !important;
}
`
    },
    beta: {
      id: 'beta',
      name: 'Cupertino Frosted Clean',
      badge: '🍎 Universe β',
      tagline: 'Apple-grade frosted glass, ultra-clean typography & pill curves',
      primary: '#0071e3',
      secondary: '#34c759',
      bgDark: '#0f172a',
      cardBg: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.16)',
      glowColor: 'rgba(0, 113, 227, 0.25)',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      radius: '22px',
      baseConversion: 22.4,
      baseDwell: 54,
      cssOverrides: `
/* ═══ ULTRA QUANTUM MULTIVERSE: CUPERTINO FROSTED CLEAN ═══ */
:root {
  --primary: #0071e3 !important;
  --secondary: #34c759 !important;
  --bg-main: #0b0f19 !important;
  --bg-card: rgba(255, 255, 255, 0.06) !important;
  --font-cupertino: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif !important;
}
body {
  background: #0b0f19 !important;
  color: #f8fafc !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif !important;
  letter-spacing: -0.015em !important;
}
button, .btn, .btn-primary {
  background: #0071e3 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  border-radius: 9999px !important;
  box-shadow: 0 4px 20px rgba(0, 113, 227, 0.35) !important;
  border: none !important;
  padding: 10px 24px !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.card, .box, [class*="card"] {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(30px) !important;
  -webkit-backdrop-filter: blur(30px) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
}
h1, h2, h3 {
  color: #ffffff !important;
  font-weight: 700 !important;
}
`
    },
    gamma: {
      id: 'gamma',
      name: 'Swiss Neo-Brutalist',
      badge: '📐 Universe γ',
      tagline: 'High-contrast solid borders, offset drop shadows & tactile boldness',
      primary: '#facc15',
      secondary: '#2563eb',
      bgDark: '#121212',
      cardBg: '#1e1e1e',
      borderColor: '#facc15',
      glowColor: 'rgba(250, 204, 21, 0.35)',
      fontFamily: "'Arial Black', 'Impact', sans-serif",
      radius: '0px',
      baseConversion: 19.5,
      baseDwell: 42,
      cssOverrides: `
/* ═══ ULTRA QUANTUM MULTIVERSE: SWISS NEO-BRUTALIST ═══ */
:root {
  --primary: #facc15 !important;
  --secondary: #2563eb !important;
  --bg-main: #121212 !important;
  --bg-card: #1c1c1c !important;
  --font-brutal: 'Arial Black', sans-serif !important;
}
body {
  background: #121212 !important;
  color: #ffffff !important;
  font-family: 'Arial Black', sans-serif !important;
}
button, .btn, .btn-primary {
  background: #facc15 !important;
  color: #000000 !important;
  font-weight: 900 !important;
  border-radius: 0px !important;
  border: 3px solid #ffffff !important;
  box-shadow: 5px 5px 0px #2563eb !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}
button:hover, .btn:hover {
  transform: translate(-2px, -2px) !important;
  box-shadow: 7px 7px 0px #2563eb !important;
}
.card, .box, [class*="card"] {
  background: #1c1c1c !important;
  border: 3px solid #ffffff !important;
  border-radius: 0px !important;
  box-shadow: 6px 6px 0px #facc15 !important;
}
h1, h2, h3 {
  color: #facc15 !important;
  text-transform: uppercase !important;
}
`
    },
    delta: {
      id: 'delta',
      name: 'Bionic Aurora Glass',
      badge: '✨ Universe δ',
      tagline: 'Iridescent emerald & violet fluid gradients with breathing aura',
      primary: '#10b981',
      secondary: '#8b5cf6',
      bgDark: '#030712',
      cardBg: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(139,92,246,0.08) 100%)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      glowColor: 'rgba(16, 185, 129, 0.35)',
      fontFamily: "'Inter', system-ui, sans-serif",
      radius: '28px',
      baseConversion: 25.2,
      baseDwell: 62,
      cssOverrides: `
/* ═══ ULTRA QUANTUM MULTIVERSE: BIONIC AURORA GLASS ═══ */
:root {
  --primary: #10b981 !important;
  --secondary: #8b5cf6 !important;
  --bg-main: #030712 !important;
  --bg-card: rgba(16, 185, 129, 0.06) !important;
  --font-aurora: 'Inter', system-ui, sans-serif !important;
}
body {
  background: radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #030712 75%) !important;
  color: #f1f5f9 !important;
  font-family: 'Inter', system-ui, sans-serif !important;
}
button, .btn, .btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #8b5cf6 100%) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  border-radius: 18px !important;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4) !important;
  border: none !important;
  padding: 11px 26px !important;
}
.card, .box, [class*="card"] {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%) !important;
  backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(16, 185, 129, 0.35) !important;
  border-radius: 28px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.12) !important;
}
h1, h2, h3 {
  background: linear-gradient(135deg, #34d399, #a78bfa) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
`
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // SYNTHETIC 500-BOT AGENT SWARM SIMULATOR
  // ══════════════════════════════════════════════════════════════════════════════
  class BotSwarmEngine {
    constructor() {
      this.totalBots = 500;
      this.bots = [];
      this.running = false;
      this.speedMultiplier = 1.0;
      this.showHeatmap = false;
      this.personaFilter = 'all'; // all | buyers | researchers | skeptics | mobile
      this.stats = {
        alpha: { clicks: 0, conversions: 0, bounces: 0, dwellTotal: 0, count: 0 },
        beta:  { clicks: 0, conversions: 0, bounces: 0, dwellTotal: 0, count: 0 },
        gamma: { clicks: 0, conversions: 0, bounces: 0, dwellTotal: 0, count: 0 },
        delta: { clicks: 0, conversions: 0, bounces: 0, dwellTotal: 0, count: 0 },
      };
      this.heatmaps = {
        alpha: new Float32Array(40 * 25),
        beta:  new Float32Array(40 * 25),
        gamma: new Float32Array(40 * 25),
        delta: new Float32Array(40 * 25),
      };
      this.lastTick = performance.now();
      this.animId = null;
      this._initBots();
    }

    _initBots() {
      const uKeys = ['alpha', 'beta', 'gamma', 'delta'];
      const personas = [
        { type: 'buyers', weight: 0.35, color: '#10b981', clickRate: 0.045 },
        { type: 'researchers', weight: 0.30, color: '#38bdf8', clickRate: 0.02 },
        { type: 'skeptics', weight: 0.20, color: '#f59e0b', clickRate: 0.01 },
        { type: 'mobile', weight: 0.15, color: '#a855f7', clickRate: 0.035 }
      ];

      this.bots = [];
      for (let i = 0; i < this.totalBots; i++) {
        // Pick universe evenly
        const uId = uKeys[i % 4];

        // Pick persona based on distribution
        const r = Math.random();
        let cum = 0;
        let p = personas[0];
        for (const cand of personas) {
          cum += cand.weight;
          if (r <= cum) { p = cand; break; }
        }

        this.bots.push({
          id: i,
          universeId: uId,
          persona: p.type,
          color: p.color,
          clickRate: p.clickRate,
          x: 0.1 + Math.random() * 0.8,
          y: 0.1 + Math.random() * 0.8,
          targetX: 0.1 + Math.random() * 0.8,
          targetY: 0.1 + Math.random() * 0.8,
          vx: 0,
          vy: 0,
          state: 'exploring', // exploring | hovering_cta | converting | bouncing
          dwell: Math.random() * 10,
          clickCountdown: Math.floor(30 + Math.random() * 120),
          trail: []
        });
      }
    }

    reset() {
      const uKeys = ['alpha', 'beta', 'gamma', 'delta'];
      for (const u of uKeys) {
        this.stats[u] = { clicks: 0, conversions: 0, bounces: 0, dwellTotal: 0, count: 0 };
        this.heatmaps[u].fill(0);
      }
      this._initBots();
    }

    setSpeed(mult) {
      this.speedMultiplier = parseFloat(mult) || 1.0;
    }

    setHeatmap(enabled) {
      this.showHeatmap = !!enabled;
    }

    setPersona(filter) {
      this.personaFilter = filter || 'all';
    }

    update(deltaSec) {
      const speed = this.speedMultiplier;
      const step = Math.min(deltaSec, 0.1) * speed;

      // CTA hotspot definitions in normalized coords (0..1)
      const ctaHotspots = [
        { x: 0.5, y: 0.35, radius: 0.12, isCta: true },
        { x: 0.5, y: 0.82, radius: 0.10, isCta: true },
        { x: 0.25, y: 0.60, radius: 0.08, isCta: false },
        { x: 0.75, y: 0.60, radius: 0.08, isCta: false },
      ];

      for (const bot of this.bots) {
        bot.dwell += step;
        const uStat = this.stats[bot.universeId];
        uStat.dwellTotal += step;

        // Steering towards target
        const dx = bot.targetX - bot.x;
        const dy = bot.targetY - bot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.04) {
          // Reached waypoint: pick new target or click
          if (Math.random() < 0.35) {
            // Pick CTA hotspot
            const spot = ctaHotspots[Math.floor(Math.random() * ctaHotspots.length)];
            bot.targetX = spot.x + (Math.random() - 0.5) * spot.radius;
            bot.targetY = spot.y + (Math.random() - 0.5) * spot.radius;
          } else {
            bot.targetX = 0.08 + Math.random() * 0.84;
            bot.targetY = 0.08 + Math.random() * 0.84;
          }
        }

        // Add smooth physics acceleration & slight noise
        const moveSpeed = (bot.persona === 'buyers' ? 0.38 : bot.persona === 'skeptics' ? 0.45 : 0.25);
        bot.vx += (dx * moveSpeed + (Math.random() - 0.5) * 0.05) * step * 10;
        bot.vy += (dy * moveSpeed + (Math.random() - 0.5) * 0.05) * step * 10;
        bot.vx *= 0.88;
        bot.vy *= 0.88;

        bot.x += bot.vx * step;
        bot.y += bot.vy * step;

        // Clamp inside universe bounds
        bot.x = Math.max(0.04, Math.min(0.96, bot.x));
        bot.y = Math.max(0.04, Math.min(0.96, bot.y));

        // Update trail
        bot.trail.push({ x: bot.x, y: bot.y });
        if (bot.trail.length > 5) bot.trail.shift();

        // Accumulate Heatmap
        const gx = Math.min(39, Math.max(0, Math.floor(bot.x * 40)));
        const gy = Math.min(24, Math.max(0, Math.floor(bot.y * 25)));
        const idx = gy * 40 + gx;
        this.heatmaps[bot.universeId][idx] += 0.015 * step;

        // Click / Conversion simulation
        bot.clickCountdown -= 1 * speed;
        if (bot.clickCountdown <= 0) {
          bot.clickCountdown = Math.floor(40 + Math.random() * 140);
          uStat.clicks++;

          // Check if clicked near CTA
          const isNearCta = (bot.y > 0.30 && bot.y < 0.42) || (bot.y > 0.76 && bot.y < 0.90);
          const uCfg = UNIVERSES[bot.universeId];
          const convChance = (uCfg.baseConversion / 100) * (isNearCta ? 1.8 : 0.5) * (bot.persona === 'buyers' ? 1.5 : 0.8);

          if (Math.random() < convChance) {
            uStat.conversions++;
            bot.state = 'converting';
            // Spawn ripple in state
            bot.ripple = { x: bot.x, y: bot.y, radius: 0.02, maxRadius: 0.12, alpha: 1.0 };
          }
        }

        // Ripple decay
        if (bot.ripple) {
          bot.ripple.radius += step * 0.25;
          bot.ripple.alpha -= step * 1.5;
          if (bot.ripple.alpha <= 0) bot.ripple = null;
        }
      }
    }

    getMetrics() {
      const results = {};
      const uKeys = ['alpha', 'beta', 'gamma', 'delta'];
      let topUniverse = 'delta';
      let maxRate = -1;

      for (const u of uKeys) {
        const s = this.stats[u];
        const base = UNIVERSES[u].baseConversion;
        // Dynamic conversion calculation
        const calculatedRate = s.clicks > 0
          ? ((s.conversions / Math.max(1, s.clicks)) * 100 * 0.85 + base * 0.15)
          : base;
        const dwellAvg = Math.max(12, Math.round(s.dwellTotal / 125 + UNIVERSES[u].baseDwell * 0.4));
        const bounceRate = Math.max(15, Math.min(75, Math.round(100 - calculatedRate * 2.2)));

        results[u] = {
          clicks: s.clicks,
          conversions: s.conversions,
          conversionRate: calculatedRate.toFixed(1),
          dwellAvg: dwellAvg,
          bounceRate: bounceRate,
        };

        if (calculatedRate > maxRate) {
          maxRate = calculatedRate;
          topUniverse = u;
        }
      }

      results.winner = topUniverse;
      return results;
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // UI CONTROLLER & RENDERING
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraMultiverseStudio = {
    swarm: new BotSwarmEngine(),
    activeUniverse: 'delta',
    canvas: null,
    ctx: null,
    isOpen: false,
    hudTimer: null,

    open() {
      const modal = document.getElementById('modal-multiverse-studio');
      if (!modal) return;
      modal.classList.add('show', 'active');
      this.isOpen = true;
      _sound('open');

      setTimeout(() => {
        this.initCanvas();
        this.swarm.reset();
        this.startLoop();
        this.updateHud();
      }, 50);

      // Start periodic HUD telemetry update
      if (this.hudTimer) clearInterval(this.hudTimer);
      this.hudTimer = setInterval(() => {
        if (this.isOpen) this.updateHud();
      }, 400);

      _toast(_isFr() ? '🔮 Multivers Quantique & 500 Bots IA activés !' : '🔮 Quantum Multiverse & 500 AI Bots activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-multiverse-studio');
      if (modal) modal.classList.remove('show', 'active');
      this.isOpen = false;
      this.stopLoop();
      if (this.hudTimer) {
        clearInterval(this.hudTimer);
        this.hudTimer = null;
      }
      _sound('close');
    },

    initCanvas() {
      this.canvas = document.getElementById('multiverse-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    },

    resizeCanvas() {
      if (!this.canvas || !this.canvas.parentElement) return;
      const parent = this.canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      const w = Math.floor(rect.width || parent.clientWidth || 800);
      const h = Math.floor(rect.height || parent.clientHeight || 380);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.floor(w * dpr);
      this.canvas.height = Math.floor(h * dpr);
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';

      if (this.ctx) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
      }
    },

    startLoop() {
      this.stopLoop();
      let lastTime = performance.now();

      const loop = (now) => {
        if (!this.isOpen) return;
        const deltaSec = (now - lastTime) / 1000;
        lastTime = now;

        this.swarm.update(deltaSec);
        this.render();

        this.animId = requestAnimationFrame(loop);
      };

      this.animId = requestAnimationFrame(loop);
    },

    stopLoop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    },

    setSpeed(speedVal) {
      this.swarm.setSpeed(speedVal);
      const valDisplay = document.getElementById('mv-speed-val');
      if (valDisplay) valDisplay.textContent = speedVal + 'x';
    },

    toggleHeatmap() {
      this.swarm.setHeatmap(!this.swarm.showHeatmap);
      const btn = document.getElementById('mv-btn-heatmap');
      if (btn) {
        if (this.swarm.showHeatmap) {
          btn.style.background = 'rgba(239, 68, 68, 0.25)';
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#fca5a5';
        } else {
          btn.style.background = 'rgba(255, 255, 255, 0.05)';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          btn.style.color = '#cbd5e1';
        }
      }
      _sound('click');
    },

    setPersona(filter) {
      this.swarm.setPersona(filter);
      document.querySelectorAll('.mv-persona-pill').forEach(btn => {
        if (btn.getAttribute('data-persona') === filter) {
          btn.style.borderColor = '#8b5cf6';
          btn.style.background = 'rgba(139, 92, 246, 0.25)';
          btn.style.color = '#fff';
        } else {
          btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          btn.style.background = 'transparent';
          btn.style.color = '#94a3b8';
        }
      });
      _sound('click');
    },

    resimulate() {
      this.swarm.reset();
      _sound('laser');
      _toast(_isFr() ? '🔄 Simulation quantique réinitialisée avec 500 nouveaux bots !' : '🔄 Quantum simulation reset with 500 fresh bots!', 'info');
    },

    selectUniverse(uId) {
      this.activeUniverse = uId;
      document.querySelectorAll('.mv-card-select').forEach(card => {
        if (card.getAttribute('data-universe') === uId) {
          card.style.boxShadow = '0 0 0 2px #8b5cf6, 0 10px 30px rgba(139, 92, 246, 0.35)';
        } else {
          card.style.boxShadow = 'none';
        }
      });
      _sound('click');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // CANVAS RENDERING (4 UNIVERSES + BOTS + HEATMAPS)
    // ══════════════════════════════════════════════════════════════════════════
    render() {
      if (!this.canvas || !this.ctx) return;
      const ctx = this.ctx;
      const w = parseFloat(this.canvas.style.width) || this.canvas.width;
      const h = parseFloat(this.canvas.style.height) || this.canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 4 Quads layout:
      // [alpha] [beta]
      // [gamma] [delta]
      const gap = 12;
      const cardW = (w - gap * 3) / 2;
      const cardH = (h - gap * 3) / 2;

      const quads = {
        alpha: { x: gap, y: gap, w: cardW, h: cardH, u: UNIVERSES.alpha },
        beta:  { x: gap * 2 + cardW, y: gap, w: cardW, h: cardH, u: UNIVERSES.beta },
        gamma: { x: gap, y: gap * 2 + cardH, w: cardW, h: cardH, u: UNIVERSES.gamma },
        delta: { x: gap * 2 + cardW, y: gap * 2 + cardH, w: cardW, h: cardH, u: UNIVERSES.delta },
      };

      // Draw each universe quad wireframe mockup
      for (const key of ['alpha', 'beta', 'gamma', 'delta']) {
        const q = quads[key];
        this._drawUniverseCard(ctx, q, key === this.activeUniverse);
      }

      // Draw Heatmap Overlay if enabled
      if (this.swarm.showHeatmap) {
        for (const key of ['alpha', 'beta', 'gamma', 'delta']) {
          const q = quads[key];
          this._drawHeatmap(ctx, q, this.swarm.heatmaps[key]);
        }
      }

      // Draw 500 AI Bots & Trails
      const filter = this.swarm.personaFilter;
      for (const bot of this.swarm.bots) {
        if (filter !== 'all' && bot.persona !== filter) continue;
        const q = quads[bot.universeId];
        if (!q) continue;

        const bx = q.x + bot.x * q.w;
        const by = q.y + bot.y * q.h;

        // Draw trail
        if (bot.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(q.x + bot.trail[0].x * q.w, q.y + bot.trail[0].y * q.h);
          for (let t = 1; t < bot.trail.length; t++) {
            ctx.lineTo(q.x + bot.trail[t].x * q.w, q.y + bot.trail[t].y * q.h);
          }
          ctx.strokeStyle = bot.color + '44';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Draw bot dot
        ctx.beginPath();
        ctx.arc(bx, by, bot.persona === 'buyers' ? 3.2 : 2.4, 0, Math.PI * 2);
        ctx.fillStyle = bot.color;
        ctx.shadowColor = bot.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw ripple if converted
        if (bot.ripple) {
          ctx.beginPath();
          ctx.arc(q.x + bot.ripple.x * q.w, q.y + bot.ripple.y * q.h, bot.ripple.radius * q.w, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${bot.ripple.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    },

    _drawUniverseCard(ctx, q, isSelected) {
      const u = q.u;

      // Card Background
      ctx.save();
      ctx.fillStyle = u.bgDark;
      ctx.fillRect(q.x, q.y, q.w, q.h);

      // Inner Card Box
      ctx.fillStyle = u.cardBg;
      ctx.strokeStyle = isSelected ? '#a855f7' : u.borderColor;
      ctx.lineWidth = isSelected ? 2.5 : 1;
      ctx.strokeRect(q.x, q.y, q.w, q.h);

      // Title Bar
      ctx.fillStyle = isSelected ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.04)';
      ctx.fillRect(q.x, q.y, q.w, 28);

      // Header Text
      ctx.fillStyle = u.primary;
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(u.badge + ' · ' + u.name, q.x + 10, q.y + 18);

      // Mini Simulated App Mockup
      // 1. App Top Nav Wireframe
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(q.x + 10, q.y + 36, q.w - 20, 18);

      // 2. Hero Section
      ctx.fillStyle = u.primary;
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('ULTRA NEXT-GEN APP ARCHITECTURE', q.x + 16, q.y + 78);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '9px system-ui, sans-serif';
      ctx.fillText('Autonomous AI synthesis & ultra reactive micro-interactions', q.x + 16, q.y + 92);

      // 3. CTA Button (Hotspot 1)
      const btnW = 100;
      const btnH = 24;
      const btnX = q.x + (q.w - btnW) / 2;
      const btnY = q.y + q.h * 0.35 - btnH / 2;

      ctx.fillStyle = u.primary;
      ctx.shadowColor = u.glowColor;
      ctx.shadowBlur = 10;
      ctx.fillRect(btnX, btnY, btnW, btnH);
      ctx.shadowBlur = 0;

      ctx.fillStyle = (u.id === 'gamma' || u.id === 'alpha') ? '#000' : '#fff';
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ GET STARTED NOW', btnX + btnW / 2, btnY + 15);
      ctx.textAlign = 'left';

      // 4. Feature Cards Wireframes
      const featW = (q.w - 32) / 2;
      const featH = q.h * 0.26;
      const featY = q.y + q.h * 0.48;

      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.strokeStyle = u.borderColor;
      ctx.lineWidth = 0.8;

      ctx.fillRect(q.x + 10, featY, featW, featH);
      ctx.strokeRect(q.x + 10, featY, featW, featH);

      ctx.fillRect(q.x + 22 + featW, featY, featW, featH);
      ctx.strokeRect(q.x + 22 + featW, featY, featW, featH);

      ctx.fillStyle = u.secondary;
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.fillText('✦ Feature Engine α', q.x + 16, featY + 18);
      ctx.fillText('✦ Neural Stream β', q.x + 28 + featW, featY + 18);

      // 5. Bottom Secondary CTA (Hotspot 2)
      const btmW = 130;
      const btmH = 22;
      const btmX = q.x + (q.w - btmW) / 2;
      const btmY = q.y + q.h * 0.82 - btmH / 2;

      ctx.fillStyle = u.secondary;
      ctx.fillRect(btmX, btmY, btmW, btmH);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 8px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🚀 EXPLORE QUANTUM DOCS', btmX + btmW / 2, btmY + 14);
      ctx.textAlign = 'left';

      ctx.restore();
    },

    _drawHeatmap(ctx, q, heatArray) {
      const cols = 40;
      const rows = 25;
      const cellW = q.w / cols;
      const cellH = q.h / rows;

      ctx.save();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = heatArray[r * cols + c];
          if (val > 0.05) {
            const intensity = Math.min(1.0, val * 0.4);
            const cx = q.x + (c + 0.5) * cellW;
            const cy = q.y + (r + 0.5) * cellH;
            const rad = cellW * 2.2;

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
            if (intensity > 0.7) {
              grad.addColorStop(0, 'rgba(239, 68, 68, 0.65)'); // Red Hot
              grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
              grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
            } else if (intensity > 0.4) {
              grad.addColorStop(0, 'rgba(245, 158, 11, 0.55)'); // Yellow Warm
              grad.addColorStop(0.6, 'rgba(16, 185, 129, 0.3)');
              grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
            } else {
              grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)'); // Blue Cool
              grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
            }

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    },

    updateHud() {
      const metrics = this.swarm.getMetrics();
      const uKeys = ['alpha', 'beta', 'gamma', 'delta'];

      for (const u of uKeys) {
        const m = metrics[u];
        const elRate = document.getElementById(`mv-rate-${u}`);
        const elDwell = document.getElementById(`mv-dwell-${u}`);
        const elBounce = document.getElementById(`mv-bounce-${u}`);

        if (elRate) elRate.textContent = m.conversionRate + '%';
        if (elDwell) elDwell.textContent = m.dwellAvg + 's';
        if (elBounce) elBounce.textContent = m.bounceRate + '%';
      }

      // Highlight Top Winner Badge
      const winner = metrics.winner;
      const winnerName = UNIVERSES[winner].name;
      const winnerRate = metrics[winner].conversionRate;
      const banner = document.getElementById('mv-winner-banner');
      if (banner) {
        banner.innerHTML = `🏆 <strong>${_isFr() ? 'Univers Gagnant' : 'Leading Reality'} :</strong> ${UNIVERSES[winner].badge} ${winnerName} <span style="color:#10b981;font-weight:900">(+${winnerRate}% ${_isFr() ? 'conversion prédite' : 'predicted conv.'})</span>`;
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK ADOPTION, QUANTUM BLEND & EXPORTS
    // ══════════════════════════════════════════════════════════════════════════
    getMultiverseSnippet(uId, isBlend = false) {
      const activeKey = isBlend ? 'blend' : (uId || this.activeUniverse || 'alpha');

      const blendCss = `/* ═══ ULTRA QUANTUM MULTIVERSE: QUANTUM BLEND HYBRID ═══ */
:root {
  --primary: #00f3ff !important;
  --secondary: #8b5cf6 !important;
  --accent: #10b981 !important;
  --bg-main: #050814 !important;
  --bg-card: rgba(15, 23, 42, 0.75) !important;
  --font-hybrid: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif !important;
}
body {
  background: radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #050814 80%) !important;
  color: #f8fafc !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif !important;
}
button, .btn, .btn-primary {
  background: linear-gradient(135deg, #00f3ff 0%, #8b5cf6 50%, #ec4899 100%) !important;
  color: #ffffff !important;
  font-weight: 800 !important;
  border-radius: 9999px !important;
  box-shadow: 0 8px 30px rgba(0, 243, 255, 0.35) !important;
  border: none !important;
  padding: 10px 24px !important;
}
.card, .box, [class*="card"] {
  background: rgba(15, 23, 42, 0.7) !important;
  backdrop-filter: blur(25px) !important;
  border: 1px solid rgba(0, 243, 255, 0.3) !important;
  border-radius: 20px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.15) !important;
}`;

      const allData = {
        alpha: {
          id: 'alpha',
          name: UNIVERSES.alpha.name,
          badge: UNIVERSES.alpha.badge,
          primary: UNIVERSES.alpha.primary,
          secondary: UNIVERSES.alpha.secondary,
          conversion: UNIVERSES.alpha.baseConversion,
          dwell: UNIVERSES.alpha.baseDwell,
          css: UNIVERSES.alpha.cssOverrides.trim()
        },
        beta: {
          id: 'beta',
          name: UNIVERSES.beta.name,
          badge: UNIVERSES.beta.badge,
          primary: UNIVERSES.beta.primary,
          secondary: UNIVERSES.beta.secondary,
          conversion: UNIVERSES.beta.baseConversion,
          dwell: UNIVERSES.beta.baseDwell,
          css: UNIVERSES.beta.cssOverrides.trim()
        },
        gamma: {
          id: 'gamma',
          name: UNIVERSES.gamma.name,
          badge: UNIVERSES.gamma.badge,
          primary: UNIVERSES.gamma.primary,
          secondary: UNIVERSES.gamma.secondary,
          conversion: UNIVERSES.gamma.baseConversion,
          dwell: UNIVERSES.gamma.baseDwell,
          css: UNIVERSES.gamma.cssOverrides.trim()
        },
        delta: {
          id: 'delta',
          name: UNIVERSES.delta.name,
          badge: UNIVERSES.delta.badge,
          primary: UNIVERSES.delta.primary,
          secondary: UNIVERSES.delta.secondary,
          conversion: UNIVERSES.delta.baseConversion,
          dwell: UNIVERSES.delta.baseDwell,
          css: UNIVERSES.delta.cssOverrides.trim()
        },
        blend: {
          id: 'blend',
          name: 'Quantum Blend (Hybrid Design System)',
          badge: '🔮 Quantum Blend',
          primary: '#00f3ff',
          secondary: '#8b5cf6',
          conversion: 28.6,
          dwell: 68,
          css: blendCss.trim()
        }
      };

      const activeObj = allData[activeKey] || allData.alpha;
      const initialCss = activeObj.css;
      const serializedData = JSON.stringify(allData);

      return `
<!-- ═══ ULTRA QUANTUM MULTIVERSE SHOWCASE ═══ -->
<style id="ultra-multiverse-style">
${initialCss}
</style>

<div id="ultra-multiverse-showcase-card" style="margin:28px auto;max-width:1040px;width:calc(100% - 32px);box-sizing:border-box;position:relative;z-index:90;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif;">
  <div style="background:linear-gradient(145deg,rgba(15,23,42,0.88),rgba(5,8,20,0.95));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(0,243,255,0.35);border-radius:24px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.6),0 0 35px rgba(0,243,255,0.12);color:#f8fafc;">
    
    <!-- Top Header Bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#00f3ff 0%,#8b5cf6 50%,#ec4899 100%);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 0 24px rgba(0,243,255,0.45);flex-shrink:0;">
          🌌
        </div>
        <div>
          <div style="font-size:1.15rem;font-weight:800;letter-spacing:-0.01em;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span>Quantum Multiverse Engine</span>
            <span style="font-size:0.68rem;padding:3px 10px;border-radius:9999px;background:rgba(16,185,129,0.18);color:#10b981;border:1px solid rgba(16,185,129,0.45);font-weight:800;letter-spacing:0.5px;">🟢 QUANTUM ENTANGLED</span>
          </div>
          <div style="font-size:0.82rem;color:#94a3b8;margin-top:3px;">
            Parallel Reality Testing & Autonomous UI Superposition Engine
          </div>
        </div>
      </div>
      <div id="qm-current-badge" style="font-size:0.82rem;font-weight:800;padding:7px 16px;border-radius:9999px;background:rgba(0,243,255,0.12);border:1px solid rgba(0,243,255,0.4);color:#00f3ff;box-shadow:0 0 16px rgba(0,243,255,0.2);">
        ${activeObj.badge} ${activeObj.name}
      </div>
    </div>

    <!-- Live Reality Switcher Buttons -->
    <div style="margin-bottom:20px;">
      <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;font-weight:800;margin-bottom:10px;">
        ⚡ Switch Parallel Universe (Instant Live Morph)
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;" id="qm-switcher-buttons">
        <button type="button" onclick="QuantumEngine.switchUniverse('alpha')" class="qm-u-btn" data-u="alpha" style="padding:9px 16px;border-radius:10px;font-size:0.8rem;font-weight:800;cursor:pointer;border:1px solid rgba(0,243,255,0.4);background:rgba(0,243,255,0.12);color:#00f3ff;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);">
          🌌 α Cyberpunk
        </button>
        <button type="button" onclick="QuantumEngine.switchUniverse('beta')" class="qm-u-btn" data-u="beta" style="padding:9px 16px;border-radius:10px;font-size:0.8rem;font-weight:800;cursor:pointer;border:1px solid rgba(56,189,248,0.3);background:rgba(255,255,255,0.04);color:#94a3b8;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);">
          🍎 β Cupertino
        </button>
        <button type="button" onclick="QuantumEngine.switchUniverse('gamma')" class="qm-u-btn" data-u="gamma" style="padding:9px 16px;border-radius:10px;font-size:0.8rem;font-weight:800;cursor:pointer;border:1px solid rgba(250,204,21,0.3);background:rgba(255,255,255,0.04);color:#94a3b8;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);">
          📐 γ Brutalist
        </button>
        <button type="button" onclick="QuantumEngine.switchUniverse('delta')" class="qm-u-btn" data-u="delta" style="padding:9px 16px;border-radius:10px;font-size:0.8rem;font-weight:800;cursor:pointer;border:1px solid rgba(16,185,129,0.3);background:rgba(255,255,255,0.04);color:#94a3b8;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);">
          ✨ δ Aurora
        </button>
        <button type="button" onclick="QuantumEngine.switchUniverse('blend')" class="qm-u-btn" data-u="blend" style="padding:9px 16px;border-radius:10px;font-size:0.8rem;font-weight:800;cursor:pointer;border:1px solid rgba(139,92,246,0.4);background:rgba(139,92,246,0.12);color:#c084fc;transition:all 0.2s cubic-bezier(0.16,1,0.3,1);">
          🔮 Quantum Blend
        </button>
      </div>
    </div>

    <!-- AI Telemetry Grid -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:20px;">
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;">
        <div style="font-size:0.72rem;color:#94a3b8;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Predicted Conversion</div>
        <div id="qm-stat-conv" style="font-size:1.45rem;font-weight:900;color:#10b981;margin-top:4px;">+${activeObj.conversion}%</div>
        <div style="font-size:0.72rem;color:#64748b;margin-top:2px;">Neural Bayesian Uplift</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;">
        <div style="font-size:0.72rem;color:#94a3b8;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Avg Dwell Time</div>
        <div id="qm-stat-dwell" style="font-size:1.45rem;font-weight:900;color:#38bdf8;margin-top:4px;">${activeObj.dwell}s</div>
        <div style="font-size:0.72rem;color:#64748b;margin-top:2px;">Engagement Horizon</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;">
        <div style="font-size:0.72rem;color:#94a3b8;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Synthetic Swarm</div>
        <div id="qm-stat-agents" style="font-size:1.45rem;font-weight:900;color:#ec4899;margin-top:4px;">50 Observers</div>
        <div style="font-size:0.72rem;color:#64748b;margin-top:2px;">Autonomous Explorers</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;">
        <div style="font-size:0.72rem;color:#94a3b8;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">Quantum Coherence</div>
        <div id="qm-stat-coherence" style="font-size:1.45rem;font-weight:900;color:#facc15;margin-top:4px;">99.8%</div>
        <div style="font-size:0.72rem;color:#64748b;margin-top:2px;">Zero Visual Artifacts</div>
      </div>
    </div>

    <!-- Live 60fps Swarm Simulation Canvas -->
    <div style="position:relative;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:rgba(2,6,23,0.7);">
      <canvas id="ultra-quantum-swarm-canvas" style="width:100%;height:115px;display:block;"></canvas>
      <div style="position:absolute;bottom:8px;right:12px;font-size:0.68rem;color:#64748b;pointer-events:none;font-weight:600;">
        ⚡ 50 Autonomous Virtual AI Agents · Live Superposition Tracking
      </div>
    </div>

  </div>
</div>

<script>
(function() {
  const UNIVERSES_DATA = ${serializedData};

  window.QuantumEngine = {
    current: '${activeKey}',
    switchUniverse: function(key) {
      const u = UNIVERSES_DATA[key];
      if (!u) return;
      this.current = key;

      const styleEl = document.getElementById('ultra-multiverse-style');
      if (styleEl) {
        styleEl.textContent = u.css;
      }

      const badge = document.getElementById('qm-current-badge');
      if (badge) {
        badge.innerHTML = u.badge + ' ' + u.name;
        badge.style.color = u.primary;
        badge.style.borderColor = u.primary + '66';
        badge.style.boxShadow = '0 0 16px ' + u.primary + '33';
      }

      const conv = document.getElementById('qm-stat-conv');
      if (conv) conv.textContent = '+' + u.conversion + '%';
      const dwell = document.getElementById('qm-stat-dwell');
      if (dwell) dwell.textContent = u.dwell + 's';

      const btns = document.querySelectorAll('#qm-switcher-buttons .qm-u-btn');
      btns.forEach(b => {
        if (b.getAttribute('data-u') === key) {
          b.style.borderColor = u.primary;
          b.style.background = u.primary + '22';
          b.style.color = u.primary;
          b.style.boxShadow = '0 0 12px ' + u.primary + '44';
        } else {
          b.style.borderColor = 'rgba(255,255,255,0.12)';
          b.style.background = 'rgba(255,255,255,0.04)';
          b.style.color = '#94a3b8';
          b.style.boxShadow = 'none';
        }
      });

      if (window._qmUpdateSwarmColors) {
        window._qmUpdateSwarmColors(u.primary, u.secondary);
      }
    }
  };

  // Swarm Canvas Simulation
  const canvas = document.getElementById('ultra-quantum-swarm-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = (canvas.parentElement ? canvas.parentElement.clientWidth : 800) || 800;
    let h = canvas.height = 115;
    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        w = canvas.width = canvas.parentElement.clientWidth || 800;
        h = canvas.height = 115;
      }
    });

    let colPrimary = '${activeObj.primary}';
    let colSecondary = '${activeObj.secondary}';
    window._qmUpdateSwarmColors = function(p, s) {
      colPrimary = p;
      colSecondary = s;
    };

    const count = 50;
    const agents = [];
    for (let i = 0; i < count; i++) {
      agents.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2
      });
    }

    function animateSwarm() {
      requestAnimationFrame(animateSwarm);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = agents[i].x - agents[j].x;
          const dy = agents[i].y - agents[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            ctx.strokeStyle = colPrimary;
            ctx.globalAlpha = (1 - dist / 65) * 0.25;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(agents[i].x, agents[i].y);
            ctx.lineTo(agents[j].x, agents[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < count; i++) {
        const a = agents[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += 0.05;

        if (a.x < 0) a.x = w;
        if (a.x > w) a.x = 0;
        if (a.y < 0) a.y = h;
        if (a.y > h) a.y = 0;

        ctx.globalAlpha = 0.8 + Math.sin(a.pulse) * 0.2;
        ctx.fillStyle = (i % 2 === 0) ? colPrimary : colSecondary;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    animateSwarm();
  }

  // Trigger initial styling
  setTimeout(() => {
    if (window.QuantumEngine && window.QuantumEngine.switchUniverse) {
      window.QuantumEngine.switchUniverse('${activeKey}');
    }
  }, 40);
})();
<\/script>
<!-- ═══ END ULTRA QUANTUM MULTIVERSE SHOWCASE ═══ -->
`;
    },

    adoptUniverse(uId) {
      const targetId = uId || this.activeUniverse || 'alpha';
      const cfg = UNIVERSES[targetId];
      if (!cfg) return;

      const markerRegex = /(?:<!-- ═══ ULTRA QUANTUM MULTIVERSE SHOWCASE[\s\S]*?<!-- ═══ END ULTRA QUANTUM MULTIVERSE SHOWCASE[\s\S]*?-->|<style id="ultra-multiverse-style">[\s\S]*?<\/style>|\/\* ═══ ULTRA QUANTUM MULTIVERSE[\s\S]*?\*\/[\s\S]*?(?=(\/\* ═══|$)))/gi;
      const snippet = this.getMultiverseSnippet(targetId, false);

      const ok = _injectCodeToActiveApp(snippet.trim(), markerRegex, `${cfg.badge} ${cfg.name}`);
      if (ok) {
        this.selectUniverse(targetId);
      }
    },

    quantumBlend() {
      const markerRegex = /(?:<!-- ═══ ULTRA QUANTUM MULTIVERSE SHOWCASE[\s\S]*?<!-- ═══ END ULTRA QUANTUM MULTIVERSE SHOWCASE[\s\S]*?-->|<style id="ultra-multiverse-style">[\s\S]*?<\/style>|\/\* ═══ ULTRA QUANTUM MULTIVERSE[\s\S]*?\*\/[\s\S]*?(?=(\/\* ═══|$)))/gi;
      const snippet = this.getMultiverseSnippet('blend', true);

      _injectCodeToActiveApp(snippet.trim(), markerRegex, '🔮 Quantum Blend (Hybrid Design System)');
    },

    copyTokens(uId) {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy Design Tokens')) return;
      const cfg = UNIVERSES[uId || this.activeUniverse];
      if (!cfg) return;
      _copyCode(cfg.cssOverrides.trim(), `${cfg.badge} CSS Design Tokens`);
    },

    exportABPackage() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export A/B Testing Package')) return;
      const isFr = _isFr();
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autonomous Quantum A/B Split Test Router</title>
  <style>
    body { margin: 0; padding: 20px; background: #0b0f19; color: #fff; font-family: system-ui, sans-serif; }
    .ab-hud { position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.85); border: 1px solid #38bdf8; border-radius: 12px; padding: 12px 18px; z-index: 999999; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
    .ab-hud button { background: #38bdf8; color: #000; border: none; padding: 6px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="ab-hud">
    <div style="font-size:0.75rem; color:#94a3b8; font-weight:bold;">QUANTUM MULTIVERSE A/B ROUTER</div>
    <div id="ab-status" style="margin: 6px 0; color:#38bdf8; font-weight:800;">Assigned: Loading...</div>
    <button onclick="QuantumSplit.toggle()">Toggle Universe</button>
  </div>
  <div id="app-root">
    <h1>Autonomous Quantum Multiverse A/B Testing Active</h1>
    <p>50% of traffic receives Universe α (Cyberpunk Neon), 50% receives Universe δ (Bionic Aurora).</p>
  </div>
  <script>
    const QuantumSplit = {
      variants: ['alpha', 'delta'],
      assigned: null,
      init() {
        this.assigned = localStorage.getItem('ultra_quantum_ab') || this.variants[Math.random() < 0.5 ? 0 : 1];
        localStorage.setItem('ultra_quantum_ab', this.assigned);
        document.getElementById('ab-status').textContent = 'Assigned: ' + this.assigned.toUpperCase();
      },
      toggle() {
        this.assigned = this.assigned === 'alpha' ? 'delta' : 'alpha';
        localStorage.setItem('ultra_quantum_ab', this.assigned);
        document.getElementById('ab-status').textContent = 'Assigned: ' + this.assigned.toUpperCase();
      }
    };
    QuantumSplit.init();
  </script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'quantum-multiverse-ab-router.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _sound('celebrate');
      _toast(isFr ? '💾 Package A/B Testing autonome téléchargé !' : '💾 Autonomous A/B Testing package downloaded!', 'success');
    }
  };

  // Expose globally
  window.UltraMultiverseStudio = UltraMultiverseStudio;
})();
