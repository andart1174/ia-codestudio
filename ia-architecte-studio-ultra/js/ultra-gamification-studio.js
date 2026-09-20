// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — MICRO-PLAYGROUND & WEB GAME ENGINE (v1.0)
// UltraGameEngineStudio (modal-game-studio)
// 100% Client-Side Interactive Web Games · Zero External Libraries · 60fps Canvas
// 4 Turnkey Mini-Games · LocalStorage Leaderboard · Gamified Coupon / Lead Rewards
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
      console.log('[UltraGameEngine]', msg);
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
  // CORE GAME ENGINE OBJECT
  // ══════════════════════════════════════════════════════════════════════════════
  window.UltraGameEngineStudio = {
    state: {
      activeGame: 'tunnel_runner', // tunnel_runner, gravity_pinball, neon_asteroids, memory_matrix
      score: 0,
      highScore: 0,
      isGameOver: false,
      isRunning: false,
      couponCode: 'ULTRA-WIN-2026',
      soundEnabled: true
    },

    engineData: {
      canvas: null,
      ctx: null,
      animId: null,
      keys: {},
      gameState: null
    },

    gamesMeta: {
      tunnel_runner: {
        nameEn: 'Cyberpunk 3D Tunnel Runner',
        nameFr: 'Course 3D Tunnel Cyberpunk',
        icon: '🚀',
        descEn: 'High-speed 60fps 3D perspective runner avoiding laser obstacles and collecting quantum energy cells.',
        descFr: 'Course en perspective 3D à 60fps évitant les barrières laser et récoltant les cellules d\'énergie.'
      },
      gravity_pinball: {
        nameEn: 'Gravity Physics Pinball & Pachinko',
        nameFr: 'Flipper & Pachinko Physique Gravitationnelle',
        icon: '🎰',
        descEn: 'Drop kinetic spheres through peg field with realistic restitution physics and unlockable discount bins.',
        descFr: 'Lâchez des billes à travers un champ d\'obstacles physiques pour débloquer des coupons promotionnels.'
      },
      neon_asteroids: {
        nameEn: 'Retro 80s Neon Asteroid Smasher',
        nameFr: 'Exploseur d\'Astéroïdes Rétro 80s',
        icon: '☄️',
        descEn: 'Vector space combat with inertia thrust, dual laser blasters, splitting asteroids, and particle shields.',
        descFr: 'Combat spatial vectoriel avec inertie de poussée, lasers doubles, astéroïdes et explosions de particules.'
      },
      memory_matrix: {
        nameEn: 'Cyber Hologram Memory Matrix',
        nameFr: 'Matrice de Mémoire Holographique',
        icon: '🧠',
        descEn: 'Audiovisual pattern memorization puzzle with reactive frequencies and increasing combo multipliers.',
        descFr: 'Puzzle de mémorisation audiovisuelle avec fréquences réactives et multiplicateurs de score en série.'
      }
    },

    open: function() {
      const modal = document.getElementById('modal-game-studio');
      if (modal) {
        modal.classList.add('show', 'active');
        _sound('click');
        setTimeout(() => {
          this.initCanvas();
          this.resizeCanvas();
          this.loadHighScore();
          this.resetGame();
          this.updateUi();
        }, 60);
      }
    },

    close: function() {
      const modal = document.getElementById('modal-game-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        this.pauseGame();
      }
    },

    initCanvas: function() {
      const container = document.getElementById('game-canvas-container');
      if (!container) return;

      if (!this.engineData.canvas) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(canvas);

        this.engineData.canvas = canvas;
        this.engineData.ctx = canvas.getContext('2d');

        // Input Listeners
        window.addEventListener('keydown', e => {
          this.engineData.keys[e.key] = true;
          if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
            // Prevent page scroll when modal is open
            const modal = document.getElementById('modal-game-studio');
            if (modal && modal.classList.contains('show')) e.preventDefault();
          }
        });

        window.addEventListener('keyup', e => {
          this.engineData.keys[e.key] = false;
        });

        canvas.addEventListener('click', e => {
          const rect = canvas.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          this.handleCanvasClick(clickX, clickY);
        });

        // Touch controls
        canvas.addEventListener('touchstart', e => {
          if (e.touches && e.touches[0]) {
            const rect = canvas.getBoundingClientRect();
            const tx = e.touches[0].clientX - rect.left;
            if (tx < rect.width * 0.5) this.engineData.keys['ArrowLeft'] = true;
            else this.engineData.keys['ArrowRight'] = true;
          }
        }, { passive: true });

        canvas.addEventListener('touchend', () => {
          this.engineData.keys['ArrowLeft'] = false;
          this.engineData.keys['ArrowRight'] = false;
        });

        window.addEventListener('resize', () => this.resizeCanvas());
      }
    },

    resizeCanvas: function() {
      const container = document.getElementById('game-canvas-container');
      const canvas = this.engineData.canvas;
      if (!container || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(container.clientWidth * dpr);
      canvas.height = Math.floor(container.clientHeight * dpr);
      const ctx = this.engineData.ctx;
      if (ctx) ctx.scale(dpr, dpr);
    },

    loadHighScore: function() {
      const key = 'ultra_high_' + this.state.activeGame;
      this.state.highScore = parseInt(localStorage.getItem(key) || '0', 10);
    },

    saveHighScore: function() {
      if (this.state.score > this.state.highScore) {
        this.state.highScore = this.state.score;
        localStorage.setItem('ultra_high_' + this.state.activeGame, this.state.highScore.toString());
      }
    },

    setGame: function(name) {
      if (!this.gamesMeta[name]) return;
      this.state.activeGame = name;
      _sound('click');
      this.loadHighScore();
      this.resetGame();
      this.updateUi();
    },

    resetGame: function() {
      this.state.score = 0;
      this.state.isGameOver = false;
      this.state.isRunning = true;

      const canvas = this.engineData.canvas;
      const w = canvas ? canvas.clientWidth : 600;
      const h = canvas ? canvas.clientHeight : 400;

      const g = this.state.activeGame;
      if (g === 'tunnel_runner') {
        this.engineData.gameState = {
          playerX: w / 2,
          speed: 4,
          obstacles: [],
          coins: [],
          distance: 0,
          lastSpawn: 0
        };
      } else if (g === 'gravity_pinball') {
        const pegs = [];
        for (let r = 0; r < 5; r++) {
          const count = 7 + (r % 2);
          for (let c = 0; c < count; c++) {
            pegs.push({
              x: (w / (count + 1)) * (c + 1),
              y: 100 + r * 50,
              radius: 6,
              hitTime: 0
            });
          }
        }
        this.engineData.gameState = {
          pegs: pegs,
          balls: [],
          bins: [
            { x: w * 0.1, label: '100', val: 100 },
            { x: w * 0.35, label: '500', val: 500 },
            { x: w * 0.65, label: '1000 ★', val: 1000 },
            { x: w * 0.9, label: '250', val: 250 }
          ]
        };
      } else if (g === 'neon_asteroids') {
        this.engineData.gameState = {
          ship: { x: w / 2, y: h / 2, angle: -Math.PI / 2, vx: 0, vy: 0, radius: 14 },
          bullets: [],
          asteroids: [],
          particles: []
        };
        // Spawn 4 initial asteroids
        for (let i = 0; i < 4; i++) {
          this.spawnAsteroid(w, h, 3);
        }
      } else {
        // memory_matrix
        this.engineData.gameState = {
          sequence: [],
          userStep: 0,
          isShowing: false,
          activeNode: -1,
          round: 1
        };
        this.nextMemoryRound();
      }

      this.startLoop();
      this.updateScoreDisplay();
    },

    spawnAsteroid: function(w, h, size) {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (edge === 0) { x = Math.random() * w; y = 0; }
      else if (edge === 1) { x = w; y = Math.random() * h; }
      else if (edge === 2) { x = Math.random() * w; y = h; }
      else { x = 0; y = Math.random() * h; }

      const speed = 1.0 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      this.engineData.gameState.asteroids.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: size * 12,
        size: size
      });
    },

    nextMemoryRound: function() {
      const gs = this.engineData.gameState;
      gs.sequence.push(Math.floor(Math.random() * 4));
      gs.userStep = 0;
      gs.isShowing = true;

      let step = 0;
      const interval = setInterval(() => {
        if (step < gs.sequence.length) {
          gs.activeNode = gs.sequence[step];
          _sound('click');
          setTimeout(() => { gs.activeNode = -1; }, 350);
          step++;
        } else {
          clearInterval(interval);
          gs.isShowing = false;
        }
      }, 600);
    },

    handleCanvasClick: function(x, y) {
      const g = this.state.activeGame;
      const gs = this.engineData.gameState;
      if (!gs || this.state.isGameOver) return;

      if (g === 'gravity_pinball') {
        // Drop ball
        gs.balls.push({
          x: x,
          y: 40,
          vx: (Math.random() - 0.5) * 2,
          vy: 1,
          radius: 7
        });
        _sound('click');
      } else if (g === 'memory_matrix' && !gs.isShowing) {
        const w = this.engineData.canvas.clientWidth;
        const h = this.engineData.canvas.clientHeight;
        const cx = w / 2, cy = h / 2;
        const gap = 12, size = 70;

        const nodes = [
          { id: 0, x: cx - size - gap/2, y: cy - size - gap/2 },
          { id: 1, x: cx + gap/2, y: cy - size - gap/2 },
          { id: 2, x: cx - size - gap/2, y: cy + gap/2 },
          { id: 3, x: cx + gap/2, y: cy + gap/2 }
        ];

        for (const n of nodes) {
          if (x >= n.x && x <= n.x + size && y >= n.y && y <= n.y + size) {
            this.handleMemoryClick(n.id);
            break;
          }
        }
      }
    },

    handleMemoryClick: function(id) {
      const gs = this.engineData.gameState;
      if (gs.sequence[gs.userStep] === id) {
        _sound('click');
        gs.userStep++;
        if (gs.userStep >= gs.sequence.length) {
          this.state.score += gs.sequence.length * 100;
          this.saveHighScore();
          this.updateScoreDisplay();
          _sound('celebrate');
          setTimeout(() => { this.nextMemoryRound(); }, 700);
        }
      } else {
        this.triggerGameOver();
      }
    },

    startLoop: function() {
      if (this.engineData.animId) cancelAnimationFrame(this.engineData.animId);

      const loop = () => {
        if (!this.state.isRunning) return;
        this.engineData.animId = requestAnimationFrame(loop);
        this.updateGameLogic();
        this.renderGame();
      };
      loop();
    },

    pauseGame: function() {
      this.state.isRunning = false;
      if (this.engineData.animId) {
        cancelAnimationFrame(this.engineData.animId);
        this.engineData.animId = null;
      }
    },

    updateGameLogic: function() {
      if (this.state.isGameOver) return;

      const g = this.state.activeGame;
      const gs = this.engineData.gameState;
      const keys = this.engineData.keys;
      const canvas = this.engineData.canvas;
      if (!canvas || !gs) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (g === 'tunnel_runner') {
        if (keys['ArrowLeft'] || keys['a']) gs.playerX = Math.max(40, gs.playerX - 6);
        if (keys['ArrowRight'] || keys['d']) gs.playerX = Math.min(w - 40, gs.playerX + 6);

        gs.distance += gs.speed * 0.1;
        this.state.score = Math.floor(gs.distance * 10);
        this.updateScoreDisplay();

        // Spawn obstacles
        if (performance.now() - gs.lastSpawn > 1100) {
          gs.lastSpawn = performance.now();
          gs.obstacles.push({
            x: 60 + Math.random() * (w - 120),
            y: 0,
            z: 0.1,
            width: 80,
            height: 18
          });
        }

        // Update obstacles
        for (let i = gs.obstacles.length - 1; i >= 0; i--) {
          const obs = gs.obstacles[i];
          obs.z += 0.018;
          obs.y = (h * 0.4) + obs.z * (h * 0.6);
          const currentW = obs.width * (0.3 + obs.z * 1.4);

          // Collision detection near screen bottom
          if (obs.z > 0.88 && obs.z < 1.05) {
            if (Math.abs(gs.playerX - obs.x) < currentW * 0.6) {
              this.triggerGameOver();
              return;
            }
          }
          if (obs.z > 1.2) gs.obstacles.splice(i, 1);
        }
      } else if (g === 'neon_asteroids') {
        const s = gs.ship;
        if (keys['ArrowLeft'] || keys['a']) s.angle -= 0.07;
        if (keys['ArrowRight'] || keys['d']) s.angle += 0.07;
        if (keys['ArrowUp'] || keys['w']) {
          s.vx += Math.cos(s.angle) * 0.22;
          s.vy += Math.sin(s.angle) * 0.22;
        }

        s.vx *= 0.985;
        s.vy *= 0.985;
        s.x = (s.x + s.vx + w) % w;
        s.y = (s.y + s.vy + h) % h;

        // Shoot bullets
        if (keys[' '] && (!gs.lastShot || performance.now() - gs.lastShot > 220)) {
          gs.lastShot = performance.now();
          gs.bullets.push({
            x: s.x + Math.cos(s.angle) * s.radius,
            y: s.y + Math.sin(s.angle) * s.radius,
            vx: Math.cos(s.angle) * 8,
            vy: Math.sin(s.angle) * 8,
            life: 60
          });
          _sound('click');
        }

        // Bullets
        for (let i = gs.bullets.length - 1; i >= 0; i--) {
          const b = gs.bullets[i];
          b.x = (b.x + b.vx + w) % w;
          b.y = (b.y + b.vy + h) % h;
          b.life--;
          if (b.life <= 0) gs.bullets.splice(i, 1);
        }

        // Asteroids
        for (let i = gs.asteroids.length - 1; i >= 0; i--) {
          const a = gs.asteroids[i];
          a.x = (a.x + a.vx + w) % w;
          a.y = (a.y + a.vy + h) % h;

          // Ship collision
          if (Math.hypot(s.x - a.x, s.y - a.y) < s.radius + a.radius) {
            this.triggerGameOver();
            return;
          }

          // Bullet collision
          for (let j = gs.bullets.length - 1; j >= 0; j--) {
            const b = gs.bullets[j];
            if (Math.hypot(b.x - a.x, b.y - a.y) < a.radius) {
              gs.bullets.splice(j, 1);
              this.state.score += 50 * (4 - a.size);
              this.updateScoreDisplay();

              if (a.size > 1) {
                this.spawnAsteroid(w, h, a.size - 1);
                this.spawnAsteroid(w, h, a.size - 1);
              }
              gs.asteroids.splice(i, 1);
              break;
            }
          }
        }

        if (gs.asteroids.length === 0) {
          for (let i = 0; i < 4; i++) this.spawnAsteroid(w, h, 3);
        }
      } else if (g === 'gravity_pinball') {
        // Physics update
        for (let i = gs.balls.length - 1; i >= 0; i--) {
          const b = gs.balls[i];
          b.vy += 0.25; // gravity
          b.x += b.vx;
          b.y += b.vy;

          // Wall bounce
          if (b.x < b.radius) { b.x = b.radius; b.vx *= -0.8; }
          if (b.x > w - b.radius) { b.x = w - b.radius; b.vx *= -0.8; }

          // Peg collisions
          for (const peg of gs.pegs) {
            const dx = b.x - peg.x;
            const dy = b.y - peg.y;
            const dist = Math.hypot(dx, dy);
            if (dist < b.radius + peg.radius) {
              const angle = Math.atan2(dy, dx);
              b.vx = Math.cos(angle) * 3.5 + (Math.random() - 0.5);
              b.vy = Math.sin(angle) * 3.5;
              peg.hitTime = performance.now();
              this.state.score += 15;
              this.updateScoreDisplay();
            }
          }

          // Bottom bins
          if (b.y > h - 35) {
            for (const bin of gs.bins) {
              if (Math.abs(b.x - bin.x) < 35) {
                this.state.score += bin.val;
                this.updateScoreDisplay();
                if (bin.val >= 1000) _confetti();
              }
            }
            gs.balls.splice(i, 1);
          }
        }
      }
    },

    triggerGameOver: function() {
      this.state.isGameOver = true;
      this.saveHighScore();
      _sound('warning');
      _toast(_isFr() ? `💥 Fin de partie ! Score: ${this.state.score}` : `💥 Game Over! Final Score: ${this.state.score}`, 'info');

      // Check if unlocked reward
      const rwEl = document.getElementById('game-reward-banner');
      if (rwEl && this.state.score >= 200) {
        rwEl.style.display = 'block';
        _confetti();
      }
    },

    renderGame: function() {
      const ctx = this.engineData.ctx;
      const canvas = this.engineData.canvas;
      if (!ctx || !canvas) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const g = this.state.activeGame;
      const gs = this.engineData.gameState;

      ctx.clearRect(0, 0, w, h);

      // Cyber background
      ctx.fillStyle = '#050814';
      ctx.fillRect(0, 0, w, h);

      if (g === 'tunnel_runner') {
        // Perspective Tunnel lines
        ctx.strokeStyle = 'rgba(56,189,248,0.2)';
        ctx.lineWidth = 1.5;
        const vpX = w / 2, vpY = h * 0.35;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY); ctx.lineTo(0, h);
        ctx.moveTo(vpX, vpY); ctx.lineTo(w, h);
        ctx.moveTo(vpX, vpY); ctx.lineTo(w * 0.2, h);
        ctx.moveTo(vpX, vpY); ctx.lineTo(w * 0.8, h);
        ctx.stroke();

        // Obstacles
        for (const obs of gs.obstacles) {
          const curW = obs.width * (0.3 + obs.z * 1.4);
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 15;
          ctx.fillRect(obs.x - curW/2, obs.y, curW, obs.height * (0.4 + obs.z));
          ctx.shadowBlur = 0;
        }

        // Player Ship
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(gs.playerX, h - 35);
        ctx.lineTo(gs.playerX - 18, h - 12);
        ctx.lineTo(gs.playerX + 18, h - 12);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (g === 'neon_asteroids') {
        const s = gs.ship;
        // Ship
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(s.angle) * s.radius, s.y + Math.sin(s.angle) * s.radius);
        ctx.lineTo(s.x + Math.cos(s.angle + 2.5) * s.radius, s.y + Math.sin(s.angle + 2.5) * s.radius);
        ctx.lineTo(s.x + Math.cos(s.angle - 2.5) * s.radius, s.y + Math.sin(s.angle - 2.5) * s.radius);
        ctx.closePath();
        ctx.stroke();

        // Bullets
        ctx.fillStyle = '#f59e0b';
        for (const b of gs.bullets) {
          ctx.fillRect(b.x - 2, b.y - 2, 4, 4);
        }

        // Asteroids
        ctx.strokeStyle = '#ec4899';
        for (const a of gs.asteroids) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      } else if (g === 'gravity_pinball') {
        // Pegs
        for (const peg of gs.pegs) {
          const isHit = performance.now() - peg.hitTime < 180;
          ctx.fillStyle = isHit ? '#f59e0b' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Balls
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
        for (const b of gs.balls) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Bins
        for (const bin of gs.bins) {
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.strokeRect(bin.x - 30, h - 30, 60, 30);
          ctx.fillStyle = '#a855f7';
          ctx.font = '700 11px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(bin.label, bin.x, h - 12);
        }
      } else {
        // memory_matrix
        const cx = w / 2, cy = h / 2;
        const gap = 12, size = 70;
        const colors = ['#38bdf8', '#ec4899', '#10b981', '#f59e0b'];
        const nodes = [
          { id: 0, x: cx - size - gap/2, y: cy - size - gap/2 },
          { id: 1, x: cx + gap/2, y: cy - size - gap/2 },
          { id: 2, x: cx - size - gap/2, y: cy + gap/2 },
          { id: 3, x: cx + gap/2, y: cy + gap/2 }
        ];

        for (const n of nodes) {
          const isActive = gs.activeNode === n.id;
          ctx.fillStyle = isActive ? colors[n.id] : 'rgba(255,255,255,0.06)';
          ctx.strokeStyle = colors[n.id];
          ctx.lineWidth = isActive ? 3 : 1;
          ctx.beginPath();
          ctx.roundRect(n.x, n.y, size, size, 12);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Game Over Overlay
      if (this.state.isGameOver) {
        ctx.fillStyle = 'rgba(3,7,18,0.8)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = '900 24px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', w / 2, h / 2 - 10);
        ctx.font = '600 13px system-ui';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Click [Restart Game] to Try Again', w / 2, h / 2 + 18);
      }
    },

    updateScoreDisplay: function() {
      const sEl = document.getElementById('game-val-score');
      if (sEl) sEl.textContent = this.state.score;
      const hEl = document.getElementById('game-val-high');
      if (hEl) hEl.textContent = this.state.highScore;
    },

    updateUi: function() {
      const isFr = _isFr();
      const meta = this.gamesMeta[this.state.activeGame];

      document.querySelectorAll('.game-selector-btn').forEach(btn => {
        const g = btn.getAttribute('data-game');
        if (g === this.state.activeGame) {
          btn.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(168,85,247,0.25))';
          btn.style.borderColor = '#38bdf8';
          btn.style.color = '#fff';
        } else {
          btn.style.background = 'rgba(255,255,255,0.04)';
          btn.style.borderColor = 'rgba(255,255,255,0.08)';
          btn.style.color = '#94a3b8';
        }
      });

      const titleEl = document.getElementById('game-name-display');
      if (titleEl && meta) titleEl.textContent = (meta.icon || '🎮') + ' ' + (isFr ? meta.nameFr : meta.nameEn);

      const descEl = document.getElementById('game-desc-display');
      if (descEl && meta) descEl.textContent = isFr ? meta.descFr : meta.descEn;

      const rwEl = document.getElementById('game-reward-banner');
      if (rwEl) rwEl.style.display = 'none';

      this.updateScoreDisplay();
    },

    // ══════════════════════════════════════════════════════════════════════════════
    // CODE GENERATION & INJECTION
    // ══════════════════════════════════════════════════════════════════════════════
    getStandaloneSnippet: function() {
      const g = this.state.activeGame;
      const uid = 'game_' + Math.random().toString(36).substr(2, 6);
      const gameTitle = (this.gamesMeta[g] && this.gamesMeta[g].nameEn) || 'Retro Arcade Game';

      if (g === 'neon_asteroids') {
        return `<!-- Ultra Gamification Interactive Widget (Retro Neon Asteroids) -->
<div id="${uid}_card" style="width:100%;max-width:620px;margin:20px auto;background:#050814;border:1px solid rgba(56,189,248,0.3);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.7);font-family:system-ui,sans-serif;user-select:none">
  <div style="padding:10px 16px;background:rgba(15,23,42,0.8);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:0.85rem;font-weight:800;color:#38bdf8">🚀 ${gameTitle}</span>
    <div style="display:flex;gap:12px;font-size:0.8rem;font-weight:700">
      <span style="color:#ef4444">Lives: <span id="${uid}_lives">❤❤❤</span></span>
      <span style="color:#f59e0b">Score: <span id="${uid}_score">0</span></span>
    </div>
  </div>
  <div id="${uid}_reward" style="display:none;background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(56,189,248,0.25));border:1px solid #10b981;border-radius:8px;padding:10px 14px;margin:10px;text-align:center;color:#fff;font-size:0.8rem">
    🎉 <strong>REWARD UNLOCKED!</strong> Use coupon code: <span style="background:rgba(0,0,0,0.5);color:#f59e0b;font-family:monospace;font-weight:800;padding:2px 8px;border-radius:4px;border:1px dashed #f59e0b">ULTRA-VIP-2026</span> for 20% OFF!
  </div>
  <div style="position:relative;width:100%;height:320px;background:#020617">
    <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block;cursor:crosshair"></canvas>
  </div>
  <!-- Mobile & Desktop On-Screen Controls -->
  <div style="padding:8px 12px;background:#090e1c;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
    <div style="display:flex;gap:6px">
      <button id="${uid}_btn_left" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:6px 12px;border-radius:6px;font-size:0.8rem;cursor:pointer">◀ Turn</button>
      <button id="${uid}_btn_thrust" style="background:rgba(56,189,248,0.15);border:1px solid #38bdf8;color:#38bdf8;padding:6px 12px;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer">▲ Thrust</button>
      <button id="${uid}_btn_right" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:6px 12px;border-radius:6px;font-size:0.8rem;cursor:pointer">▶ Turn</button>
      <button id="${uid}_btn_fire" style="background:linear-gradient(135deg,#ec4899,#ef4444);border:none;color:#fff;padding:6px 14px;border-radius:6px;font-size:0.8rem;font-weight:800;cursor:pointer">🔴 FIRE</button>
    </div>
    <button onclick="window['${uid}_reset']()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;font-size:0.75rem;padding:5px 10px;border-radius:4px;cursor:pointer">Restart</button>
  </div>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 320; }
  window.addEventListener('resize', rz); rz();

  let ship, bullets, asteroids, particles, score, lives, gameOver;
  const keys = {};

  function spawnAsteroid(size, x, y) {
    const edge = Math.floor(Math.random() * 4);
    let ax = x !== undefined ? x : (edge % 2 === 0 ? Math.random() * cv.width : (edge === 1 ? cv.width : 0));
    let ay = y !== undefined ? y : (edge % 2 !== 0 ? Math.random() * cv.height : (edge === 0 ? 0 : cv.height));
    const spd = (0.8 + Math.random() * 1.2) * (4 - size) * 0.7;
    const ang = Math.random() * Math.PI * 2;
    const verts = [];
    const num = 8;
    for (let i = 0; i < num; i++) verts.push(0.8 + Math.random() * 0.4);
    asteroids.push({ x: ax, y: ay, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd, r: size * 12, size: size, verts: verts });
  }

  function resetGame() {
    rz();
    ship = { x: cv.width/2, y: cv.height/2, a: -Math.PI/2, vx: 0, vy: 0, r: 12 };
    bullets = [];
    asteroids = [];
    particles = [];
    score = 0;
    lives = 3;
    gameOver = false;
    document.getElementById('${uid}_score').textContent = '0';
    document.getElementById('${uid}_lives').textContent = '❤❤❤';
    for (let i = 0; i < 4; i++) spawnAsteroid(3);
  }
  window['${uid}_reset'] = resetGame;

  window.addEventListener('keydown', e => { keys[e.key] = true; if (e.key === ' ' && !gameOver) fireBullet(); });
  window.addEventListener('keyup', e => { keys[e.key] = false; });

  function fireBullet() {
    if (gameOver) { resetGame(); return; }
    bullets.push({
      x: ship.x + Math.cos(ship.a) * 14,
      y: ship.y + Math.sin(ship.a) * 14,
      vx: Math.cos(ship.a) * 7 + ship.vx * 0.5,
      vy: Math.sin(ship.a) * 7 + ship.vy * 0.5,
      life: 50
    });
  }

  function bindTouch(btnId, downKey, upKey) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const onD = e => { e.preventDefault(); keys[downKey] = true; if (downKey === 'fire') fireBullet(); };
    const onU = e => { e.preventDefault(); keys[downKey] = false; };
    btn.addEventListener('mousedown', onD); btn.addEventListener('mouseup', onU);
    btn.addEventListener('touchstart', onD, { passive: false }); btn.addEventListener('touchend', onU);
  }
  bindTouch('${uid}_btn_left', 'ArrowLeft');
  bindTouch('${uid}_btn_right', 'ArrowRight');
  bindTouch('${uid}_btn_thrust', 'ArrowUp');
  bindTouch('${uid}_btn_fire', 'fire');
  cv.addEventListener('click', fireBullet);

  resetGame();

  function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, cv.width, cv.height);

    if (!gameOver) {
      // Ship controls
      if (keys['ArrowLeft'] || keys['a']) ship.a -= 0.07;
      if (keys['ArrowRight'] || keys['d']) ship.a += 0.07;
      const thrusting = keys['ArrowUp'] || keys['w'];
      if (thrusting) {
        ship.vx += Math.cos(ship.a) * 0.18;
        ship.vy += Math.sin(ship.a) * 0.18;
        // Flame particles
        particles.push({
          x: ship.x - Math.cos(ship.a) * 12,
          y: ship.y - Math.sin(ship.a) * 12,
          vx: -Math.cos(ship.a) * 2 + (Math.random()-0.5)*1,
          vy: -Math.sin(ship.a) * 2 + (Math.random()-0.5)*1,
          c: '#f59e0b', life: 15
        });
      }
      ship.vx *= 0.985; ship.vy *= 0.985;
      ship.x += ship.vx; ship.y += ship.vy;
      if (ship.x < 0) ship.x = cv.width; if (ship.x > cv.width) ship.x = 0;
      if (ship.y < 0) ship.y = cv.height; if (ship.y > cv.height) ship.y = 0;

      // Update bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx; b.y += b.vy;
        b.life--;
        if (b.life <= 0) { bullets.splice(i, 1); continue; }
        // Check collision with asteroids
        for (let j = asteroids.length - 1; j >= 0; j--) {
          const a = asteroids[j];
          if (Math.hypot(b.x - a.x, b.y - a.y) < a.r) {
            bullets.splice(i, 1);
            score += a.size * 50;
            document.getElementById('${uid}_score').textContent = score;
            if (score >= 100) {
              const rw = document.getElementById('${uid}_reward');
              if (rw) rw.style.display = 'block';
            }
            // Debris sparks
            for (let k = 0; k < 12; k++) {
              particles.push({
                x: a.x, y: a.y,
                vx: (Math.random()-0.5)*5, vy: (Math.random()-0.5)*5,
                c: '#ec4899', life: 25
              });
            }
            if (a.size > 1) {
              spawnAsteroid(a.size - 1, a.x, a.y);
              spawnAsteroid(a.size - 1, a.x, a.y);
            }
            asteroids.splice(j, 1);
            if (asteroids.length < 3) spawnAsteroid(3);
            break;
          }
        }
      }

      // Update asteroids & check ship hit
      for (let i = 0; i < asteroids.length; i++) {
        const a = asteroids[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -a.r) a.x = cv.width + a.r; if (a.x > cv.width + a.r) a.x = -a.r;
        if (a.y < -a.r) a.y = cv.height + a.r; if (a.y > cv.height + a.r) a.y = -a.r;

        // Ship collision
        if (Math.hypot(ship.x - a.x, ship.y - a.y) < a.r + ship.r) {
          lives--;
          document.getElementById('${uid}_lives').textContent = '❤'.repeat(Math.max(0, lives));
          for (let k = 0; k < 20; k++) {
            particles.push({ x: ship.x, y: ship.y, vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6, c: '#ef4444', life: 30 });
          }
          ship.x = cv.width / 2; ship.y = cv.height / 2; ship.vx = 0; ship.vy = 0;
          if (lives <= 0) gameOver = true;
          break;
        }
      }
    }

    // Render asteroids
    for (let a of asteroids) {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.strokeStyle = '#ec4899';
      ctx.shadowColor = '#ec4899'; ctx.shadowBlur = 10;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      const num = a.verts.length;
      for (let i = 0; i < num; i++) {
        const angle = (i / num) * Math.PI * 2;
        const rad = a.r * a.verts[i];
        const px = Math.cos(angle) * rad, py = Math.sin(angle) * rad;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.stroke();
      ctx.restore();
    }

    // Render bullets
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 12;
    for (let b of bullets) {
      ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2); ctx.fill();
    }

    // Render particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.fillStyle = p.c;
      ctx.shadowColor = p.c; ctx.shadowBlur = 6;
      ctx.fillRect(p.x, p.y, 2, 2);
    }

    // Render ship
    if (!gameOver) {
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.a);
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 15;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(15, 0); ctx.lineTo(-12, -10); ctx.lineTo(-7, 0); ctx.lineTo(-12, 10); ctx.closePath();
      ctx.stroke();
      if (keys['ArrowUp'] || keys['w']) {
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath(); ctx.moveTo(-9, -4); ctx.lineTo(-18, 0); ctx.lineTo(-9, 4); ctx.stroke();
      }
      ctx.restore();
    } else {
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'center'; ctx.fillText('GAME OVER', cv.width/2, cv.height/2 - 12);
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Final Score: ' + score + '  (Click or Restart to Replay)', cv.width/2, cv.height/2 + 16);
    }
  }
  loop();
})();
<\/script>`;
      } else if (g === 'memory_matrix') {
        return `<!-- Ultra Gamification Interactive Widget (Cyber Hologram Memory Matrix) -->
<div id="${uid}_card" style="width:100%;max-width:620px;margin:20px auto;background:#050814;border:1px solid rgba(56,189,248,0.3);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.7);font-family:system-ui,sans-serif;user-select:none">
  <div style="padding:10px 16px;background:rgba(15,23,42,0.8);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:0.85rem;font-weight:800;color:#38bdf8">🧠 Cyber Hologram Memory Matrix</span>
    <div style="display:flex;gap:12px;font-size:0.8rem;font-weight:700">
      <span style="color:#a855f7">Round: <span id="${uid}_round">1</span></span>
      <span style="color:#f59e0b">Score: <span id="${uid}_score">0</span></span>
    </div>
  </div>
  <div id="${uid}_reward" style="display:none;background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(56,189,248,0.25));border:1px solid #10b981;border-radius:8px;padding:10px 14px;margin:10px;text-align:center;color:#fff;font-size:0.8rem">
    🎉 <strong>REWARD UNLOCKED!</strong> Coupon code: <span style="background:rgba(0,0,0,0.5);color:#f59e0b;font-family:monospace;font-weight:800;padding:2px 8px;border-radius:4px">ULTRA-VIP-2026</span>
  </div>
  <div style="position:relative;width:100%;height:320px;background:#020617">
    <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block;cursor:pointer"></canvas>
  </div>
  <div style="padding:8px 12px;background:#090e1c;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center">
    <span id="${uid}_status" style="font-size:0.75rem;color:#38bdf8;font-weight:700">Watch the pattern...</span>
    <button onclick="window['${uid}_reset']()" style="background:rgba(56,189,248,0.15);border:1px solid #38bdf8;color:#38bdf8;font-size:0.75rem;padding:5px 12px;border-radius:4px;cursor:pointer">Restart Game</button>
  </div>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 320; }
  window.addEventListener('resize', rz); rz();

  const colors = ['#38bdf8', '#ec4899', '#10b981', '#f59e0b'];
  const freqs = [261.63, 329.63, 392.00, 523.25];
  let sequence = [], userStep = 0, isShowing = false, activeNode = -1, round = 1, score = 0, gameOver = false;

  const AC = window.AudioContext || window.webkitAudioContext;
  let actx = null;
  function tone(f) {
    try {
      if (!actx && AC) actx = new AC();
      if (actx && actx.state === 'suspended') actx.resume();
      if (!actx) return;
      const now = actx.currentTime;
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain); gain.connect(actx.destination);
      osc.start(now); osc.stop(now + 0.3);
    } catch(e){}
  }

  function nextRound() {
    sequence.push(Math.floor(Math.random() * 4));
    userStep = 0;
    isShowing = true;
    document.getElementById('${uid}_status').textContent = 'Watch the pattern... (' + sequence.length + ' steps)';
    let step = 0;
    const timer = setInterval(() => {
      if (step < sequence.length) {
        activeNode = sequence[step];
        tone(freqs[activeNode]);
        setTimeout(() => { activeNode = -1; }, 320);
        step++;
      } else {
        clearInterval(timer);
        isShowing = false;
        document.getElementById('${uid}_status').textContent = 'Your turn! Click the glowing pads.';
      }
    }, 550);
  }

  function resetGame() {
    rz(); sequence = []; userStep = 0; isShowing = false; activeNode = -1; round = 1; score = 0; gameOver = false;
    document.getElementById('${uid}_score').textContent = '0';
    document.getElementById('${uid}_round').textContent = '1';
    nextRound();
  }
  window['${uid}_reset'] = resetGame;

  function getNodeBoxes() {
    const cx = cv.width / 2, cy = cv.height / 2;
    const sz = Math.min(80, Math.floor(cv.height * 0.32));
    const gp = 14;
    return [
      { id: 0, x: cx - sz - gp/2, y: cy - sz - gp/2, sz: sz },
      { id: 1, x: cx + gp/2,      y: cy - sz - gp/2, sz: sz },
      { id: 2, x: cx - sz - gp/2, y: cy + gp/2,      sz: sz },
      { id: 3, x: cx + gp/2,      y: cy + gp/2,      sz: sz }
    ];
  }

  function handleClick(e) {
    if (gameOver) { resetGame(); return; }
    if (isShowing) return;
    const r = cv.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    const nodes = getNodeBoxes();
    for (let n of nodes) {
      if (cx >= n.x && cx <= n.x + n.sz && cy >= n.y && cy <= n.y + n.sz) {
        activeNode = n.id;
        tone(freqs[n.id]);
        setTimeout(() => { activeNode = -1; }, 200);
        if (sequence[userStep] === n.id) {
          userStep++;
          if (userStep >= sequence.length) {
            score += sequence.length * 100;
            round++;
            document.getElementById('${uid}_score').textContent = score;
            document.getElementById('${uid}_round').textContent = round;
            if (score >= 100) {
              const rw = document.getElementById('${uid}_reward');
              if (rw) rw.style.display = 'block';
            }
            document.getElementById('${uid}_status').textContent = '🎉 Perfect! Next round loading...';
            setTimeout(nextRound, 700);
          }
        } else {
          gameOver = true;
          tone(130);
          document.getElementById('${uid}_status').textContent = '❌ Wrong pad! Game Over.';
        }
        break;
      }
    }
  }

  cv.addEventListener('click', handleClick);
  resetGame();

  function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, cv.width, cv.height);

    const nodes = getNodeBoxes();
    for (let n of nodes) {
      const isLit = (activeNode === n.id);
      const col = colors[n.id];
      ctx.save();
      ctx.fillStyle = isLit ? col : 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = col;
      ctx.lineWidth = isLit ? 4 : 2;
      ctx.shadowColor = col;
      ctx.shadowBlur = isLit ? 25 : 8;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(n.x, n.y, n.sz, n.sz, 14); else ctx.rect(n.x, n.y, n.sz, n.sz);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'center'; ctx.fillText('GAME OVER', cv.width/2, cv.height/2 - 12);
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Final Score: ' + score + '  (Click to Try Again)', cv.width/2, cv.height/2 + 16);
    }
  }
  loop();
})();
<\/script>`;
      } else if (g === 'gravity_pinball') {
        return `<!-- Ultra Gamification Interactive Widget (Neon Gravity Pinball) -->
<div id="${uid}_card" style="width:100%;max-width:620px;margin:20px auto;background:#050814;border:1px solid rgba(56,189,248,0.3);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.7);font-family:system-ui,sans-serif;user-select:none">
  <div style="padding:10px 16px;background:rgba(15,23,42,0.8);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:0.85rem;font-weight:800;color:#38bdf8">🎱 Neon Gravity Pachinko Pinball</span>
    <div style="display:flex;gap:12px;font-size:0.8rem;font-weight:700">
      <span style="color:#38bdf8">Balls: <span id="${uid}_balls">5</span></span>
      <span style="color:#f59e0b">Score: <span id="${uid}_score">0</span></span>
    </div>
  </div>
  <div id="${uid}_reward" style="display:none;background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(56,189,248,0.25));border:1px solid #10b981;border-radius:8px;padding:10px 14px;margin:10px;text-align:center;color:#fff;font-size:0.8rem">
    🎉 <strong>REWARD UNLOCKED!</strong> Coupon code: <span style="background:rgba(0,0,0,0.5);color:#f59e0b;font-family:monospace;font-weight:800;padding:2px 8px;border-radius:4px">ULTRA-VIP-2026</span>
  </div>
  <div style="position:relative;width:100%;height:320px;background:#020617">
    <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block;cursor:pointer"></canvas>
  </div>
  <div style="padding:8px 12px;background:#090e1c;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center">
    <button id="${uid}_btn_drop" style="background:linear-gradient(135deg,#38bdf8,#a855f7);border:none;color:#fff;font-weight:800;font-size:0.78rem;padding:6px 14px;border-radius:6px;cursor:pointer">🚀 Drop Ball</button>
    <button onclick="window['${uid}_reset']()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;font-size:0.75rem;padding:5px 12px;border-radius:4px;cursor:pointer">Restart</button>
  </div>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 320; }
  window.addEventListener('resize', rz); rz();

  let balls = [], pegs = [], bins = [], score = 0, ballsLeft = 5, gameOver = false, sparks = [];

  function initPegs() {
    pegs = [];
    const rows = 5;
    for (let r = 0; r < rows; r++) {
      const count = 7 + (r % 2);
      for (let c = 0; c < count; c++) {
        pegs.push({
          x: (cv.width / (count + 1)) * (c + 1),
          y: 70 + r * 42,
          r: 6, hit: 0
        });
      }
    }
    bins = [
      { x: cv.width * 0.12, w: cv.width * 0.2, val: 100, label: '100', c: '#38bdf8' },
      { x: cv.width * 0.37, w: cv.width * 0.22, val: 500, label: '500', c: '#a855f7' },
      { x: cv.width * 0.63, w: cv.width * 0.22, val: 1000, label: '1000 ★', c: '#f59e0b' },
      { x: cv.width * 0.88, w: cv.width * 0.2, val: 250, label: '250', c: '#10b981' }
    ];
  }

  function dropBall(dropX) {
    if (gameOver) { resetGame(); return; }
    if (ballsLeft <= 0 && balls.length === 0) return;
    if (ballsLeft > 0) {
      ballsLeft--;
      document.getElementById('${uid}_balls').textContent = ballsLeft;
      const x = dropX !== undefined ? dropX : cv.width * (0.25 + Math.random() * 0.5);
      balls.push({ x: x, y: 20, vx: (Math.random() - 0.5) * 2, vy: 1.5, r: 7 });
    }
  }

  function resetGame() {
    rz(); initPegs(); balls = []; sparks = []; score = 0; ballsLeft = 5; gameOver = false;
    document.getElementById('${uid}_score').textContent = '0';
    document.getElementById('${uid}_balls').textContent = '5';
  }
  window['${uid}_reset'] = resetGame;

  document.getElementById('${uid}_btn_drop').addEventListener('click', () => dropBall());
  cv.addEventListener('click', e => {
    const r = cv.getBoundingClientRect();
    dropBall(e.clientX - r.left);
  });

  resetGame();

  function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, cv.width, cv.height);

    // Draw bins
    for (let b of bins) {
      ctx.fillStyle = 'rgba(15,23,42,0.6)';
      ctx.strokeStyle = b.c;
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x - b.w/2, cv.height - 35, b.w, 35);
      ctx.fillRect(b.x - b.w/2, cv.height - 35, b.w, 35);
      ctx.fillStyle = b.c;
      ctx.font = '800 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x, cv.height - 12);
    }

    // Draw pegs
    for (let p of pegs) {
      const isLit = (performance.now() - p.hit < 200);
      ctx.fillStyle = isLit ? '#f59e0b' : '#38bdf8';
      ctx.shadowColor = isLit ? '#f59e0b' : '#38bdf8';
      ctx.shadowBlur = isLit ? 16 : 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Update & draw balls
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      b.vy += 0.22; // gravity
      b.x += b.vx;
      b.y += b.vy;

      // Walls
      if (b.x < b.r) { b.x = b.r; b.vx *= -0.7; }
      if (b.x > cv.width - b.r) { b.x = cv.width - b.r; b.vx *= -0.7; }

      // Peg collisions
      for (let p of pegs) {
        const dx = b.x - p.x, dy = b.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < b.r + p.r) {
          const ang = Math.atan2(dy, dx);
          b.vx = Math.cos(ang) * 3.2 + (Math.random() - 0.5) * 1.5;
          b.vy = Math.sin(ang) * 3.2;
          p.hit = performance.now();
          score += 15;
          document.getElementById('${uid}_score').textContent = score;
          for (let s = 0; s < 4; s++) {
            sparks.push({ x: p.x, y: p.y, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 15, c: '#f59e0b' });
          }
        }
      }

      // Check bottom bins
      if (b.y > cv.height - 35) {
        for (let bin of bins) {
          if (Math.abs(b.x - bin.x) < bin.w / 2) {
            score += bin.val;
            document.getElementById('${uid}_score').textContent = score;
            if (score >= 100) {
              const rw = document.getElementById('${uid}_reward');
              if (rw) rw.style.display = 'block';
            }
            break;
          }
        }
        balls.splice(i, 1);
        if (ballsLeft === 0 && balls.length === 0) gameOver = true;
        continue;
      }

      // Draw ball
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.life--;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.fillStyle = s.c;
      ctx.fillRect(s.x, s.y, 2, 2);
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.textAlign = 'center'; ctx.fillText('PACHINKO FINISHED!', cv.width/2, cv.height/2 - 12);
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Final Score: ' + score + '  (Click to Play Again)', cv.width/2, cv.height/2 + 16);
    }
  }
  loop();
})();
<\/script>`;
      } else {
        // 3D Infinite Tunnel Runner (for 'tunnel_runner')
        return `<!-- Ultra Gamification Interactive Widget (3D Infinite Tunnel Runner) -->
<div id="${uid}_card" style="width:100%;max-width:620px;margin:20px auto;background:#050814;border:1px solid rgba(56,189,248,0.3);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.7);font-family:system-ui,sans-serif;user-select:none">
  <div style="padding:10px 16px;background:rgba(15,23,42,0.8);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:0.85rem;font-weight:800;color:#38bdf8">🛸 3D Infinite Tunnel Runner</span>
    <span style="font-size:0.8rem;font-weight:700;color:#f59e0b">Score: <span id="${uid}_score">0</span></span>
  </div>
  <div id="${uid}_reward" style="display:none;background:linear-gradient(135deg,rgba(16,185,129,0.25),rgba(56,189,248,0.25));border:1px solid #10b981;border-radius:8px;padding:10px 14px;margin:10px;text-align:center;color:#fff;font-size:0.8rem">
    🎉 <strong>REWARD UNLOCKED!</strong> Coupon code: <span style="background:rgba(0,0,0,0.5);color:#f59e0b;font-family:monospace;font-weight:800;padding:2px 8px;border-radius:4px">ULTRA-VIP-2026</span>
  </div>
  <div style="position:relative;width:100%;height:320px;background:#020617">
    <canvas id="${uid}_canvas" style="width:100%;height:100%;display:block;cursor:pointer"></canvas>
  </div>
  <div style="padding:8px 12px;background:#090e1c;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:0.75rem;color:#64748b">Controls: Arrows / WASD / Drag mouse or Touch</span>
    <button onclick="window['${uid}_reset']()" style="background:rgba(56,189,248,0.15);border:1px solid #38bdf8;color:#38bdf8;font-size:0.75rem;padding:5px 12px;border-radius:4px;cursor:pointer">Restart</button>
  </div>
</div>
<script>
(function() {
  const cv = document.getElementById('${uid}_canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  function rz() { cv.width = cv.clientWidth || 600; cv.height = cv.clientHeight || 320; }
  window.addEventListener('resize', rz); rz();

  let px = cv.width / 2;
  let score = 0;
  let obstacles = [];
  let coins = [];
  let gameOver = false;
  const keys = {};

  function reset() {
    rz(); px = cv.width / 2; score = 0; obstacles = []; coins = []; gameOver = false;
    document.getElementById('${uid}_score').textContent = '0';
  }
  window['${uid}_reset'] = reset;

  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);

  cv.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    px = Math.max(30, Math.min(cv.width - 30, e.clientX - r.left));
  });
  cv.addEventListener('click', () => { if (gameOver) reset(); });

  let tick = 0;
  function loop() {
    requestAnimationFrame(loop);
    tick++;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, cv.width, cv.height);

    // Grid perspective
    ctx.strokeStyle = 'rgba(56,189,248,0.15)';
    for (let i = 0; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(cv.width / 2 + (i - 3) * 30, 80);
      ctx.lineTo((i / 6) * cv.width, cv.height);
      ctx.stroke();
    }

    if (!gameOver) {
      if (keys['ArrowLeft'] || keys['a']) px = Math.max(30, px - 6);
      if (keys['ArrowRight'] || keys['d']) px = Math.min(cv.width - 30, px + 6);
      score++;
      if (tick % 10 === 0) document.getElementById('${uid}_score').textContent = score;
      if (score >= 100) {
        const rw = document.getElementById('${uid}_reward');
        if (rw) rw.style.display = 'block';
      }

      if (tick % 60 === 0) {
        obstacles.push({ x: cv.width * (0.2 + Math.random() * 0.6), y: 80, w: 50, h: 18, vy: 3 });
      }
      if (tick % 85 === 0) {
        coins.push({ x: cv.width * (0.2 + Math.random() * 0.6), y: 80, r: 8, vy: 3 });
      }

      // Update obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.y += ob.vy;
        const prog = (ob.y - 80) / (cv.height - 80);
        const curW = ob.w * (0.4 + prog * 1.2);
        if (ob.y > cv.height - 35 && Math.abs(px - ob.x) < curW / 2 + 15) {
          gameOver = true;
        }
        if (ob.y > cv.height) { obstacles.splice(i, 1); continue; }
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444'; ctx.shadowBlur = 10;
        ctx.fillRect(ob.x - curW / 2, ob.y, curW, ob.h);
      }

      // Update coins
      for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        c.y += c.vy;
        if (c.y > cv.height - 35 && Math.abs(px - c.x) < 25) {
          score += 150;
          coins.splice(i, 1);
          continue;
        }
        if (c.y > cv.height) { coins.splice(i, 1); continue; }
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Ship
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(px, cv.height - 40);
    ctx.lineTo(px - 18, cv.height - 15);
    ctx.lineTo(px, cv.height - 22);
    ctx.lineTo(px + 18, cv.height - 15);
    ctx.closePath(); ctx.fill();

    if (gameOver) {
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = '900 24px system-ui';
      ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', cv.width / 2, cv.height / 2 - 10);
      ctx.font = '600 13px system-ui'; ctx.fillStyle = '#38bdf8';
      ctx.fillText('Click to Restart', cv.width / 2, cv.height / 2 + 16);
    }
  }
  loop();
})();
<\/script>`;
      }
    },

    inject: function(type) {
      const snippet = this.getStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Gamification Interactive Widget[\s\S]*?<\/script>/g, 'Interactive Mini-Game');
    },

    copySnippet: function() {
      const code = this.getStandaloneSnippet();
      _copyCode(code, 'Web Mini-Game');
    }
  };

  console.log('🎮 Ultra Micro-Playground & Web Game Engine v1.0 initialized.');
})();
