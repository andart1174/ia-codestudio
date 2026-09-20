// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — KINETIC TYPOGRAPHY & MOTION FX STUDIO (v1.0)
// UltraKineticStudio (modal-kinetic-studio)
// 100% Client-Side Procedural Motion Graphics · Zero External Libraries
// 6 Kinetic Typography Engines · Physics Particles · 3D Extruded · 1-Click Injection
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
      console.log('[UltraKineticStudio]', msg);
    }
  }

  function _sound(type) {
    if (typeof UltraSoundFX !== 'undefined' && UltraSoundFX.play) {
      try { UltraSoundFX.play(type); } catch(e){}
    }
  }

  function _confetti() {
    if (typeof UltraConfetti !== 'undefined' && UltraConfetti.fire) {
      try { UltraConfetti.fire(40); } catch(e){}
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
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Copy ' + (label || 'Code'))) return;
    const isFr = _isFr();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
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
      _toast(isFr ? ('📋 Code ' + label + ' copié dans le presse-papiers !') : ('📋 ' + label + ' code copied to clipboard!'), 'success');
    } catch(err) {
      _toast(isFr ? 'Erreur lors de la copie.' : 'Failed to copy code.', 'error');
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CORE KINETIC STUDIO OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraKineticStudio = {
    state: {
      activeEngine: 'magnetic_shatter',
      text: 'ARCHITECTE STUDIO ULTRA',
      font: 'Outfit',
      speed: 1.0,
      tension: 0.08,
      color: '#38bdf8',
      secondaryColor: '#a855f7',
      fontSize: 48,
      animating: false
    },

    canvasData: {
      canvas: null,
      ctx: null,
      animId: null,
      particles: [],
      mouse: { x: -9999, y: -9999, radius: 120 },
      startTime: 0,
      scrambleData: null,
      marqueeOffset: 0
    },

    enginesMeta: {
      magnetic_shatter: {
        nameEn: 'Magnetic Particle Letter Shatter',
        nameFr: 'Désassemblage Magnétique en Particules',
        icon: '💥',
        descEn: 'Typography rasterized into physical particle spring grid that violently disperses on cursor entry and snaps back.',
        descFr: 'Typographie matricée en grille de particules physiques qui se disperse au curseur et se recompose par élasticité.'
      },
      liquid_3d: {
        nameEn: 'WebGL 3D Extruded Liquid Wave Text',
        nameFr: 'Texte 3D Extrudé Onde Liquide',
        icon: '🌊',
        descEn: 'Extruded multi-layered perspective typography undulating with fluid sinusoidal waves and neon specular flares.',
        descFr: 'Typographie multicouche en perspective ondulant comme un fluide avec reflets spéculaires et caustiques.'
      },
      svg_autodraw: {
        nameEn: 'Procedural SVG Path Autodraw & Morph',
        nameFr: 'Tracé Vectoriel SVG Autonome & Morphing',
        icon: '📐',
        descEn: 'Continuous parametric stroke drawing animation using mathematical stroke-dashoffset interpolation.',
        descFr: 'Animation continue de dessin de contours vectoriels par interpolation du décalage de tiret.'
      },
      marquee_wave: {
        nameEn: 'Infinite Kinetic Marquee Velocity Wave',
        nameFr: 'Bannière Défilante Cinétique à Vitesse d\'Onde',
        icon: '⚡',
        descEn: 'Dual counter-scrolling infinite kinetic typography ribbons distorted with dynamic sinusoidal amplitudes.',
        descFr: 'Double ruban typographique à défilement infini distordu par des ondes sinusoïdales dynamiques.'
      },
      elastic_split: {
        nameEn: 'Quantum Elastic Split-Word Reveal',
        nameFr: 'Révélation Élastique Mot-par-Mot',
        icon: '🎭',
        descEn: 'Staggered word-by-word entrance animation with spring recoil physics, scale overshoot, and trailing blur.',
        descFr: 'Animation d\'apparition mot-par-mot avec physique d\'amortissement élastique et flou cinétique.'
      },
      glitch_decode: {
        nameEn: 'Cyber Matrix Cipher Scramble Decode',
        nameFr: 'Décodage Cyphéré Glitch Matrix',
        icon: '👾',
        descEn: 'High-frequency alphanumeric glyph permutation resolving character by character into final typography.',
        descFr: 'Permutation de glyphes hexadécimaux et katakana se stabilisant caractère par caractère vers le texte final.'
      }
    },

    open: function() {
      const modal = document.getElementById('modal-kinetic-studio');
      if (modal) {
        modal.classList.add('show', 'active');
        _sound('click');
        setTimeout(() => {
          this.initCanvas();
          this.resizeCanvas();
          this.initEngineState();
          this.updateUi();
        }, 60);
      }
    },

    close: function() {
      const modal = document.getElementById('modal-kinetic-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        this.pauseLoop();
      }
    },

    initCanvas: function() {
      const container = document.getElementById('kinetic-canvas-container');
      if (!container) return;

      if (!this.canvasData.canvas) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(canvas);

        this.canvasData.canvas = canvas;
        this.canvasData.ctx = canvas.getContext('2d');

        container.addEventListener('mousemove', e => {
          const rect = container.getBoundingClientRect();
          this.canvasData.mouse.x = e.clientX - rect.left;
          this.canvasData.mouse.y = e.clientY - rect.top;
        });

        container.addEventListener('mouseleave', () => {
          this.canvasData.mouse.x = -9999;
          this.canvasData.mouse.y = -9999;
        });

        window.addEventListener('resize', () => {
          this.resizeCanvas();
          this.initEngineState();
        });
      }

      this.startLoop();
    },

    resizeCanvas: function() {
      const container = document.getElementById('kinetic-canvas-container');
      const canvas = this.canvasData.canvas;
      if (!container || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(container.clientWidth * dpr);
      canvas.height = Math.floor(container.clientHeight * dpr);
      const ctx = this.canvasData.ctx;
      if (ctx) ctx.scale(dpr, dpr);
    },

    initEngineState: function() {
      const e = this.state.activeEngine;
      const canvas = this.canvasData.canvas;
      if (!canvas) return;

      const w = canvas.clientWidth || 600;
      const h = canvas.clientHeight || 350;

      // Responsive font sizing based on container width and text length
      const maxFontSize = 42;
      const textLen = Math.max(1, this.state.text.length);
      const fitFontSize = Math.floor((w * 0.88) / (textLen * 0.58));
      this.state.fontSize = Math.max(16, Math.min(maxFontSize, fitFontSize));

      if (e === 'magnetic_shatter') {
        this.initMagneticParticles(w, h);
      } else if (e === 'glitch_decode') {
        const text = this.state.text;
        const chars = '0123456789ABCDEF$#@%&*!~?';
        this.canvasData.scrambleData = {
          current: text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]),
          resolved: 0,
          lastTick: performance.now()
        };
      }
      this.canvasData.startTime = performance.now();
    },

    initMagneticParticles: function(w, h) {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d');

      offCtx.fillStyle = '#ffffff';
      offCtx.font = `900 ${this.state.fontSize}px ${this.state.font}, system-ui, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(this.state.text, w / 2, h / 2);

      const imgData = offCtx.getImageData(0, 0, w, h).data;
      const particles = [];
      const step = 4; // grid density

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          if (imgData[idx + 3] > 128) {
            particles.push({
              originX: x,
              originY: y,
              x: x + (Math.random() - 0.5) * 40,
              y: y + (Math.random() - 0.5) * 40,
              vx: 0,
              vy: 0,
              size: 2.2,
              color: (x / w > 0.5) ? this.state.secondaryColor : this.state.color
            });
          }
        }
      }
      this.canvasData.particles = particles;
    },

    startLoop: function() {
      if (this.state.animating) return;
      this.state.animating = true;

      const render = () => {
        if (!this.state.animating) return;
        this.canvasData.animId = requestAnimationFrame(render);
        this.renderFrame();
      };
      render();
    },

    pauseLoop: function() {
      this.state.animating = false;
      if (this.canvasData.animId) {
        cancelAnimationFrame(this.canvasData.animId);
        this.canvasData.animId = null;
      }
    },

    renderFrame: function() {
      const ctx = this.canvasData.ctx;
      const canvas = this.canvasData.canvas;
      if (!ctx || !canvas) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const time = (performance.now() - this.canvasData.startTime) * 0.001 * this.state.speed;
      const engine = this.state.activeEngine;

      ctx.clearRect(0, 0, w, h);

      // Dark background gradient
      const bgGrad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, w);
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      if (engine === 'magnetic_shatter') {
        this.renderMagneticParticles(ctx);
      } else if (engine === 'liquid_3d') {
        this.renderLiquid3D(ctx, w, h, time);
      } else if (engine === 'svg_autodraw') {
        this.renderSvgAutodraw(ctx, w, h, time);
      } else if (engine === 'marquee_wave') {
        this.renderMarqueeWave(ctx, w, h, time);
      } else if (engine === 'elastic_split') {
        this.renderElasticSplit(ctx, w, h, time);
      } else {
        this.renderGlitchDecode(ctx, w, h);
      }
    },

    renderMagneticParticles: function(ctx) {
      const pts = this.canvasData.particles;
      const mouse = this.canvasData.mouse;
      const tension = this.state.tension;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 16.0;
          p.vy -= Math.sin(angle) * force * 16.0;
        }

        // Return to origin with spring tension
        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx += ox * tension;
        p.vy += oy * tension;

        // Friction damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    },

    renderLiquid3D: function(ctx, w, h, time) {
      const text = this.state.text;
      ctx.font = `900 ${this.state.fontSize}px ${this.state.font}, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const layers = 14;
      for (let i = layers; i >= 0; i--) {
        const depthRatio = i / layers;
        const waveX = Math.sin(time * 3.0 + i * 0.25) * 12.0;
        const waveY = Math.cos(time * 2.5 + i * 0.25) * 8.0;

        ctx.save();
        ctx.translate(w / 2 + waveX, h / 2 + waveY + (layers - i) * 3);

        if (i === 0) {
          // Front face glow
          const grad = ctx.createLinearGradient(-w/4, 0, w/4, 0);
          grad.addColorStop(0, this.state.color);
          grad.addColorStop(1, this.state.secondaryColor);
          ctx.fillStyle = grad;
          ctx.shadowColor = this.state.color;
          ctx.shadowBlur = 24;
          ctx.fillText(text, 0, 0);
        } else {
          // Extruded dark bevel
          ctx.fillStyle = `rgba(15, 23, 42, ${0.4 + depthRatio * 0.4})`;
          ctx.fillText(text, 0, 0);
        }
        ctx.restore();
      }
    },

    renderSvgAutodraw: function(ctx, w, h, time) {
      const text = this.state.text;
      ctx.font = `900 ${this.state.fontSize * 1.1}px ${this.state.font}, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const progress = (Math.sin(time * 2.0) + 1.0) * 0.5;
      const dash = 200 * progress;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.setLineDash([dash, 200 - dash]);
      ctx.strokeStyle = this.state.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = this.state.color;
      ctx.shadowBlur = 15;
      ctx.strokeText(text, 0, 0);

      // Subtle filled core
      ctx.fillStyle = `rgba(168, 85, 247, ${progress * 0.35})`;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    },

    renderMarqueeWave: function(ctx, w, h, time) {
      const text = (this.state.text + '  ★  ').repeat(6);
      ctx.font = `900 ${this.state.fontSize * 0.7}px ${this.state.font}, system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const speed = 120 * this.state.speed;
      const offset1 = (time * speed) % (w * 1.5);
      const offset2 = (-time * speed) % (w * 1.5);

      // Ribbon 1
      ctx.save();
      ctx.translate(-offset1, h / 2 - 40);
      const g1 = ctx.createLinearGradient(0, 0, w, 0);
      g1.addColorStop(0, this.state.color);
      g1.addColorStop(1, this.state.secondaryColor);
      ctx.fillStyle = g1;
      ctx.fillText(text, 0, Math.sin(time * 3) * 15);
      ctx.restore();

      // Ribbon 2 (Opposing)
      ctx.save();
      ctx.translate(offset2 - w, h / 2 + 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.strokeText(text, 0, Math.cos(time * 3) * 15);
      ctx.restore();
    },

    renderElasticSplit: function(ctx, w, h, time) {
      const words = this.state.text.split(' ');
      ctx.font = `900 ${this.state.fontSize}px ${this.state.font}, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const spacing = 50;
      const totalH = words.length * spacing;
      const startY = (h - totalH) / 2 + spacing / 2;

      for (let i = 0; i < words.length; i++) {
        const delay = i * 0.35;
        const localTime = Math.max(0, time - delay);
        const cycle = localTime % 3.0;

        let scale = 1.0;
        let yOffset = 0;
        let alpha = 1.0;

        if (cycle < 1.0) {
          // Elastic entrance with spring overshoot
          const t = cycle;
          scale = 1.0 + Math.sin(t * Math.PI * 4) * Math.exp(-t * 4.0) * 0.8;
          yOffset = (1.0 - Math.min(1.0, t * 2.0)) * 60;
          alpha = Math.min(1.0, t * 3.0);
        }

        ctx.save();
        ctx.translate(w / 2, startY + i * spacing + yOffset);
        ctx.scale(scale, scale);
        ctx.fillStyle = (i % 2 === 0) ? this.state.color : this.state.secondaryColor;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 18;
        ctx.fillText(words[i], 0, 0);
        ctx.restore();
      }
    },

    renderGlitchDecode: function(ctx, w, h) {
      const sc = this.canvasData.scrambleData;
      if (!sc) return;

      const target = this.state.text;
      const chars = '0123456789ABCDEF$#@%&*!~?';

      if (performance.now() - sc.lastTick > 45) {
        sc.lastTick = performance.now();
        for (let i = sc.resolved; i < target.length; i++) {
          sc.current[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        if (Math.random() > 0.4 && sc.resolved < target.length) {
          sc.current[sc.resolved] = target[sc.resolved];
          sc.resolved++;
        } else if (sc.resolved >= target.length && Math.random() > 0.96) {
          // Reset loop
          sc.resolved = 0;
        }
      }

      ctx.font = `900 ${this.state.fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const dispText = sc.current.join('');
      ctx.fillStyle = this.state.color;
      ctx.shadowColor = this.state.color;
      ctx.shadowBlur = 20;
      ctx.fillText(dispText, w / 2, h / 2);

      // Random cyber glitch offset
      if (Math.random() > 0.88) {
        ctx.fillStyle = this.state.secondaryColor;
        ctx.fillText(dispText, w / 2 + (Math.random() - 0.5) * 8, h / 2 + (Math.random() - 0.5) * 4);
      }
    },

    setEngine: function(name) {
      if (!this.enginesMeta[name]) return;
      this.state.activeEngine = name;
      _sound('click');
      this.initEngineState();
      this.updateUi();
    },

    setText: function(val) {
      this.state.text = val || 'STUDIO ULTRA';
      this.initEngineState();
    },

    setFont: function(font) {
      this.state.font = font;
      _sound('click');
      this.initEngineState();
      this.updateUi();
    },

    setSpeed: function(val) {
      this.state.speed = parseFloat(val);
      const lbl = document.getElementById('kinetic-val-speed');
      if (lbl) lbl.textContent = parseFloat(val).toFixed(1) + 'x';
    },

    setTension: function(val) {
      this.state.tension = parseFloat(val);
      const lbl = document.getElementById('kinetic-val-tension');
      if (lbl) lbl.textContent = Math.round(parseFloat(val) * 1000);
    },

    setColor: function(c) {
      this.state.color = c;
      this.initEngineState();
    },

    setSecondaryColor: function(c) {
      this.state.secondaryColor = c;
      this.initEngineState();
    },

    updateUi: function() {
      const isFr = _isFr();
      const meta = this.enginesMeta[this.state.activeEngine];

      document.querySelectorAll('.kinetic-engine-btn').forEach(btn => {
        const e = btn.getAttribute('data-engine');
        if (e === this.state.activeEngine) {
          btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(168,85,247,0.25))';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#fff';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.08)';
          btn.style.color = '#94a3b8';
        }
      });

      const titleEl = document.getElementById('kinetic-name-display');
      if (titleEl && meta) titleEl.textContent = (meta.icon || '✨') + ' ' + (isFr ? meta.nameFr : meta.nameEn);

      const descEl = document.getElementById('kinetic-desc-display');
      if (descEl && meta) descEl.textContent = isFr ? meta.descFr : meta.descEn;
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // CODE GENERATION & INJECTION
    // ══════════════════════════════════════════════════════════════════════════════
    getStandaloneSnippet: function() {
      const text = this.state.text.replace(/"/g, '\\"');
      const font = this.state.font;
      const color = this.state.color;
      const sColor = this.state.secondaryColor;
      const engine = this.state.activeEngine;
      const uid = 'kinetic_' + Math.random().toString(36).substr(2, 6);

      if (engine === 'glitch_decode') {
        return `<!-- Ultra Kinetic Scramble Heading -->
<div id="${uid}_wrap" style="position:relative;width:100%;padding:30px 20px;text-align:center;background:#030712;border-radius:14px;overflow:hidden;border:1px solid rgba(56,189,248,0.2);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <h1 id="${uid}_text" style="font-family:'${font}', monospace, sans-serif;font-size:clamp(1.4rem, 4vw, 2.8rem);font-weight:900;color:${color};text-shadow:0 0 25px ${color};letter-spacing:2px;margin:0">${text}</h1>
</div>
<script>
(function() {
  const el = document.getElementById('${uid}_text');
  if (!el) return;
  const target = "${text}";
  const chars = '0123456789ABCDEF$#@%&*!~?';
  let resolved = 0;
  let current = target.split('').map(() => chars[Math.floor(Math.random() * chars.length)]);
  const timer = setInterval(() => {
    for (let i = resolved; i < target.length; i++) current[i] = chars[Math.floor(Math.random() * chars.length)];
    if (Math.random() > 0.35 && resolved < target.length) { current[resolved] = target[resolved]; resolved++; }
    el.textContent = current.join('');
    if (resolved >= target.length) clearInterval(timer);
  }, 40);
})();
<\/script>`;
      } else if (engine === 'magnetic_shatter') {
        return `<!-- Ultra Kinetic Typography Canvas (Magnetic Particle Shatter) -->
<div id="${uid}_wrap" style="position:relative;width:100%;height:280px;overflow:hidden;border-radius:14px;background:#030712;border:1px solid rgba(56,189,248,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <canvas id="${uid}_cv" style="width:100%;height:100%;display:block;cursor:crosshair"></canvas>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const text = "${text}";
  let pts = [];
  let mx = -9999, my = -9999;

  function initParticles() {
    cv.width = cv.clientWidth || 600;
    cv.height = cv.clientHeight || 280;
    const off = document.createElement('canvas');
    off.width = cv.width; off.height = cv.height;
    const octx = off.getContext('2d');
    const fSize = Math.max(16, Math.min(38, Math.floor((cv.width * 0.86) / (Math.max(1, text.length) * 0.58))));
    octx.fillStyle = '#ffffff';
    octx.font = '900 ' + fSize + 'px "${font}", system-ui, sans-serif';
    octx.textAlign = 'center'; octx.textBaseline = 'middle';
    octx.fillText(text, cv.width / 2, cv.height / 2);
    const img = octx.getImageData(0, 0, cv.width, cv.height).data;
    pts = [];
    const step = 4;
    for (let y = 0; y < cv.height; y += step) {
      for (let x = 0; x < cv.width; x += step) {
        if (img[(y * cv.width + x) * 4 + 3] > 128) {
          pts.push({
            ox: x, oy: y,
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            vx: 0, vy: 0,
            c: (x / cv.width > 0.5) ? '${sColor}' : '${color}'
          });
        }
      }
    }
  }

  function setM(e) {
    const r = cv.getBoundingClientRect();
    const cl = e.touches ? e.touches[0] : e;
    if (cl) { mx = cl.clientX - r.left; my = cl.clientY - r.top; }
  }
  cv.addEventListener('mousemove', setM);
  cv.addEventListener('touchmove', setM, { passive: true });
  cv.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
  cv.addEventListener('touchend', () => { mx = -9999; my = -9999; });
  window.addEventListener('resize', initParticles);
  initParticles();

  function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const dx = mx - p.x, dy = my - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 95) {
        const force = (95 - d) / 95;
        const ang = Math.atan2(dy, dx);
        p.vx -= Math.cos(ang) * force * 15;
        p.vy -= Math.sin(ang) * force * 15;
      }
      p.vx += (p.ox - p.x) * 0.08;
      p.vy += (p.oy - p.y) * 0.08;
      p.vx *= 0.88; p.vy *= 0.88;
      p.x += p.vx; p.y += p.vy;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, 2.3, 2.3);
    }
  }
  loop();
})();
<\/script>`;
      } else if (engine === 'liquid_3d') {
        return `<!-- Ultra Kinetic Typography Canvas (3D Liquid Wave) -->
<div id="${uid}_wrap" style="position:relative;width:100%;height:280px;overflow:hidden;border-radius:14px;background:#030712;border:1px solid rgba(56,189,248,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <canvas id="${uid}_cv" style="width:100%;height:100%;display:block"></canvas>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const text = "${text}";
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 280; }
  window.addEventListener('resize', rz); rz();
  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.018;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const fSize = Math.max(16, Math.min(42, Math.floor((cv.width * 0.86) / (Math.max(1, text.length) * 0.58))));
    ctx.font = '900 ' + fSize + 'px "${font}", system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const layers = 10;
    for (let i = layers; i >= 0; i--) {
      const wx = Math.sin(t * 3.0 + i * 0.25) * 12.0;
      const wy = Math.cos(t * 2.5 + i * 0.25) * 8.0;
      ctx.save();
      ctx.translate(cv.width / 2 + wx, cv.height / 2 + wy + (layers - i) * 3);
      if (i === 0) {
        ctx.fillStyle = '${color}';
        ctx.shadowColor = '${color}'; ctx.shadowBlur = 24;
        ctx.fillText(text, 0, 0);
      } else {
        ctx.fillStyle = 'rgba(15, 23, 42, ' + (0.3 + (i/layers)*0.4) + ')';
        ctx.fillText(text, 0, 0);
      }
      ctx.restore();
    }
  }
  loop();
})();
<\/script>`;
      } else if (engine === 'svg_autodraw') {
        return `<!-- Ultra Kinetic Typography Canvas (SVG Autodraw) -->
<div id="${uid}_wrap" style="position:relative;width:100%;height:280px;overflow:hidden;border-radius:14px;background:#030712;border:1px solid rgba(56,189,248,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <canvas id="${uid}_cv" style="width:100%;height:100%;display:block"></canvas>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const text = "${text}";
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 280; }
  window.addEventListener('resize', rz); rz();
  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.02;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const fSize = Math.max(16, Math.min(44, Math.floor((cv.width * 0.86) / (Math.max(1, text.length) * 0.58))));
    ctx.font = '900 ' + fSize + 'px "${font}", system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const progress = (Math.sin(t * 2.0) + 1.0) * 0.5;
    const dash = 220 * progress;
    ctx.save();
    ctx.translate(cv.width / 2, cv.height / 2);
    ctx.setLineDash([dash, 220 - dash]);
    ctx.strokeStyle = '${color}';
    ctx.lineWidth = 3;
    ctx.shadowColor = '${color}'; ctx.shadowBlur = 18;
    ctx.strokeText(text, 0, 0);
    ctx.fillStyle = 'rgba(168, 85, 247, ' + (progress * 0.4) + ')';
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  loop();
})();
<\/script>`;
      } else if (engine === 'marquee_wave') {
        return `<!-- Ultra Kinetic Typography Canvas (Marquee Wave) -->
<div id="${uid}_wrap" style="position:relative;width:100%;height:280px;overflow:hidden;border-radius:14px;background:#030712;border:1px solid rgba(56,189,248,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <canvas id="${uid}_cv" style="width:100%;height:100%;display:block"></canvas>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const baseText = "${text}  ★  ";
  const text = baseText.repeat(6);
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 280; }
  window.addEventListener('resize', rz); rz();
  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.016;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const fSize = Math.max(16, Math.min(32, Math.floor(cv.height * 0.14)));
    ctx.font = '900 ' + fSize + 'px "${font}", system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    const offset = (t * 100) % (cv.width * 1.5);
    ctx.save();
    ctx.translate(-offset, cv.height / 2 - 35);
    ctx.fillStyle = '${color}';
    ctx.shadowColor = '${color}'; ctx.shadowBlur = 12;
    ctx.fillText(text, 0, Math.sin(t * 3) * 14);
    ctx.restore();
    ctx.save();
    ctx.translate((t * 80) % (cv.width * 1.5) - cv.width, cv.height / 2 + 35);
    ctx.strokeStyle = '${sColor}';
    ctx.lineWidth = 2;
    ctx.strokeText(text, 0, Math.cos(t * 3) * 14);
    ctx.restore();
  }
  loop();
})();
<\/script>`;
      } else {
        // elastic_split
        return `<!-- Ultra Kinetic Typography Canvas (Elastic Split) -->
<div id="${uid}_wrap" style="position:relative;width:100%;height:280px;overflow:hidden;border-radius:14px;background:#030712;border:1px solid rgba(56,189,248,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.7);margin:20px 0">
  <canvas id="${uid}_cv" style="width:100%;height:100%;display:block"></canvas>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const words = "${text}".split(' ');
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 280; }
  window.addEventListener('resize', rz); rz();
  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.016;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, cv.width, cv.height);
    const fSize = Math.max(16, Math.min(36, Math.floor((cv.width * 0.8) / (Math.max(1, words.join(' ').length) * 0.5))));
    ctx.font = '900 ' + fSize + 'px "${font}", system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const spacing = 45;
    const startY = (cv.height - words.length * spacing) / 2 + spacing / 2;
    for (let i = 0; i < words.length; i++) {
      const delay = i * 0.3;
      const cycle = Math.max(0, t - delay) % 3.0;
      let sc = 1.0;
      if (cycle < 1.0) {
        sc = 1.0 + Math.sin(cycle * Math.PI * 4) * Math.exp(-cycle * 4.0) * 0.8;
      }
      ctx.save();
      ctx.translate(cv.width / 2, startY + i * spacing);
      ctx.scale(sc, sc);
      ctx.fillStyle = (i % 2 === 0) ? '${color}' : '${sColor}';
      ctx.shadowColor = (i % 2 === 0) ? '${color}' : '${sColor}';
      ctx.shadowBlur = 18;
      ctx.fillText(words[i], 0, 0);
      ctx.restore();
    }
  }
  loop();
})();
<\/script>`;
      }
    },

    inject: function(type) {
      const snippet = this.getStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Kinetic (?:Typography|Scramble)[\s\S]*?<\/script>/g, 'Kinetic Typography');
    },

    copySnippet: function() {
      const code = this.getStandaloneSnippet();
      _copyCode(code, 'Kinetic Typography');
    }
  };

  console.log('✨ Ultra Kinetic Typography & Motion FX Studio v1.0 initialized.');
})();
