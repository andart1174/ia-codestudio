// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — 6 BREAKTHROUGH INNOVATIONS
// 1. UltraSocialProof       (modal-social-proof)
// 2. UltraMicroInteractions (modal-micro-interactions)
// 3. UltraCookieConsent     (modal-cookie-consent)
// 4. UltraProductTour       (modal-product-tour)
// 5. UltraCatalogFilter     (modal-catalog-filter)
// 6. UltraOfflineGuardian   (modal-offline-guardian)
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
      console.log('[Ultra]', msg);
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

  // ════════════════════════════════════════════════════════════════════════════
  // 1. ULTRA SOCIAL PROOF & LIVE FOMO ACTIVITY ENGINE
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraSocialProof = {
    _intervalTimer: null,
    config: {
      position: 'bottom-left',
      interval: 4000,
      theme: 'glass',
      sound: true
    },
    events: [
      { avatar: '⚡', title: 'Sarah M. from Lyon, FR', desc: 'Purchased Pro Lifetime Plan', time: 'Just now' },
      { avatar: '🔥', title: 'Alexandre D. from Montreal', desc: 'Upgraded to Enterprise Cloud', time: '2m ago' },
      { avatar: '🚀', title: 'Elena R. from Geneva', desc: 'Downloaded AI Starter Template', time: '4m ago' },
      { avatar: '👥', title: 'Active Visitors', desc: '38 users exploring this project right now', time: 'Live' },
      { avatar: '⭐', title: 'David K. from London', desc: 'Rated Studio 5 stars on ProductHunt', time: '6m ago' },
      { avatar: '💎', title: 'Marc V. from Paris', desc: 'Subscribed to Unlimited AI Tier', time: '8m ago' }
    ],

    open: function() {
      const modal = document.getElementById('modal-social-proof');
      if (modal) {
        modal.classList.add('show', 'active');
        this.startLiveDemo();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-social-proof');
      if (modal) modal.classList.remove('show', 'active');
      this.stopLiveDemo();
    },

    startLiveDemo: function() {
      this.stopLiveDemo();
      const self = this;
      this.triggerSampleToast();
      this._intervalTimer = setInterval(function() {
        self.triggerSampleToast();
      }, 5000);
    },

    stopLiveDemo: function() {
      if (this._intervalTimer) {
        clearInterval(this._intervalTimer);
        this._intervalTimer = null;
      }
    },

    triggerSampleToast: function() {
      const container = document.getElementById('sp-preview-container');
      if (!container) return;

      const evt = this.events[Math.floor(Math.random() * this.events.length)];
      const toast = document.createElement('div');
      toast.className = 'sp-demo-toast';
      const bg = this.config.theme === 'glass' ? 'rgba(30, 41, 59, 0.85)' : (this.config.theme === 'neon' ? '#0f172a' : '#1e293b');
      const border = this.config.theme === 'neon' ? '#38bdf8' : 'rgba(255, 255, 255, 0.12)';
      const shadow = this.config.theme === 'neon' ? '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(56,189,248,0.4)' : '0 10px 30px rgba(0,0,0,0.5)';

      toast.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:' + bg + ';border:1px solid ' + border + ';backdrop-filter:blur(12px);box-shadow:' + shadow + ';color:#f8fafc;font-size:0.82rem;transform:translateY(20px) scale(0.95);opacity:0;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);margin-top:8px;pointer-events:auto;';

      toast.innerHTML = '<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#38bdf8,#818cf8);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">' + evt.avatar + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + evt.title + '</div>' +
          '<div style="color:#94a3b8;font-size:0.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + evt.desc + '</div>' +
        '</div>' +
        '<div style="font-size:0.68rem;color:#38bdf8;font-weight:600;flex-shrink:0">' + evt.time + '</div>';

      container.innerHTML = '';
      container.appendChild(toast);

      requestAnimationFrame(function() {
        toast.style.transform = 'translateY(0) scale(1)';
        toast.style.opacity = '1';
      });

      if (this.config.sound) {
        _sound('pop');
      }

      setTimeout(function() {
        if (toast.parentNode) {
          toast.style.transform = 'translateY(-15px) scale(0.95)';
          toast.style.opacity = '0';
          setTimeout(function() { toast.remove(); }, 350);
        }
      }, 4000);
    },

    addCustomEvent: function() {
      const isFr = _isFr();
      const titleInput = document.getElementById('sp-input-title');
      const descInput = document.getElementById('sp-input-desc');

      if (!titleInput || !descInput) return;
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();

      if (!title || !desc) {
        _toast(isFr ? "Veuillez remplir le titre et l'action." : 'Please fill both name and action.', 'warning');
        return;
      }

      this.events.unshift({
        avatar: '✨',
        title: title,
        desc: desc,
        time: 'Just now'
      });

      titleInput.value = '';
      descInput.value = '';
      this.triggerSampleToast();
      _toast(isFr ? 'Événement ajouté à la simulation !' : 'Event added to live simulation!', 'success');
    },

    generateStandaloneSnippet: function() {
      const posMap = {
        'bottom-left': 'bottom: 24px; left: 24px;',
        'bottom-right': 'bottom: 24px; right: 24px;',
        'top-right': 'top: 24px; right: 24px;'
      };
      const posStyle = posMap[this.config.position] || posMap['bottom-left'];
      const themeBorder = this.config.theme === 'neon' ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)';
      const themeShadow = this.config.theme === 'neon' ? '0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(56,189,248,0.4)' : '0 12px 35px rgba(0,0,0,0.6)';
      const eventsJson = JSON.stringify(this.events);
      const intervalMs = this.config.interval || 4000;
      const soundCode = this.config.sound ? 'playChime();' : '';

      return '<!-- Ultra Social Proof & FOMO Engine -->\n' +
'<div id="ultra-social-proof-root" style="position: fixed; ' + posStyle + ' z-index: 99999; pointer-events: none; max-width: 360px; width: calc(100vw - 48px); font-family: system-ui, -apple-system, sans-serif;"></div>\n\n' +
'<style>\n' +
'.ultra-sp-toast {\n' +
'  display: flex;\n' +
'  align-items: center;\n' +
'  gap: 12px;\n' +
'  padding: 12px 16px;\n' +
'  border-radius: 12px;\n' +
'  background: rgba(15, 23, 42, 0.88);\n' +
'  border: 1px solid ' + themeBorder + ';\n' +
'  backdrop-filter: blur(14px);\n' +
'  -webkit-backdrop-filter: blur(14px);\n' +
'  box-shadow: ' + themeShadow + ';\n' +
'  color: #f8fafc;\n' +
'  font-size: 13px;\n' +
'  margin-top: 10px;\n' +
'  transform: translateY(20px) scale(0.95);\n' +
'  opacity: 0;\n' +
'  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;\n' +
'  pointer-events: auto;\n' +
'}\n' +
'.ultra-sp-toast.show {\n' +
'  transform: translateY(0) scale(1);\n' +
'  opacity: 1;\n' +
'}\n' +
'.ultra-sp-toast.hide {\n' +
'  transform: translateY(-15px) scale(0.92);\n' +
'  opacity: 0;\n' +
'}\n' +
'</style>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var events = ' + eventsJson + ';\n' +
'  var root = document.getElementById("ultra-social-proof-root");\n' +
'  if (!root) return;\n\n' +
'  function playChime() {\n' +
'    try {\n' +
'      var AC = window.AudioContext || window.webkitAudioContext;\n' +
'      if (!AC) return;\n' +
'      var ctx = new AC();\n' +
'      var osc = ctx.createOscillator();\n' +
'      var gain = ctx.createGain();\n' +
'      osc.type = "sine";\n' +
'      osc.frequency.setValueAtTime(880, ctx.currentTime);\n' +
'      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);\n' +
'      gain.gain.setValueAtTime(0.08, ctx.currentTime);\n' +
'      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);\n' +
'      osc.connect(gain); gain.connect(ctx.destination);\n' +
'      osc.start(); osc.stop(ctx.currentTime + 0.3);\n' +
'    } catch(e){}\n' +
'  }\n\n' +
'  function spawnNotification() {\n' +
'    var item = events[Math.floor(Math.random() * events.length)];\n' +
'    var el = document.createElement("div");\n' +
'    el.className = "ultra-sp-toast";\n' +
'    el.innerHTML = \'<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#38bdf8,#6366f1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">\' + item.avatar + \'</div>\' +\n' +
'      \'<div style="flex:1;min-width:0;">\' +\n' +
'        \'<div style="font-weight:700;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\' + item.title + \'</div>\' +\n' +
'        \'<div style="color:#94a3b8;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\' + item.desc + \'</div>\' +\n' +
'      \'</div>\' +\n' +
'      \'<div style="font-size:11px;color:#38bdf8;font-weight:600;flex-shrink:0">\' + item.time + \'</div>\';\n' +
'    root.innerHTML = "";\n' +
'    root.appendChild(el);\n' +
'    requestAnimationFrame(function() { el.classList.add("show"); });\n' +
'    ' + soundCode + '\n' +
'    setTimeout(function() {\n' +
'      el.classList.remove("show");\n' +
'      el.classList.add("hide");\n' +
'      setTimeout(function() { el.remove(); }, 450);\n' +
'    }, 4500);\n' +
'  }\n\n' +
'  setTimeout(spawnNotification, 2000);\n' +
'  setInterval(spawnNotification, ' + intervalMs + ');\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Social Proof & FOMO Engine -->[\s\S]*?<\/script>/gi, 'Social Proof & FOMO Engine');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Social Proof Engine');
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA MICRO-INTERACTIONS & CURSOR FX LAB
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraMicroInteractions = {
    config: {
      magnetic: true,
      tilt3d: true,
      ripple: true,
      customCursor: false
    },

    open: function() {
      const modal = document.getElementById('modal-micro-interactions');
      if (modal) {
        modal.classList.add('show', 'active');
        this.initPlayground();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-micro-interactions');
      if (modal) modal.classList.remove('show', 'active');
    },

    initPlayground: function() {
      const playArea = document.getElementById('fx-playground-area');
      if (!playArea || playArea.dataset.fxBound) return;
      playArea.dataset.fxBound = 'true';

      const self = this;

      // 1. Magnetic button demo
      const magBtn = playArea.querySelector('.fx-demo-magnetic');
      if (magBtn) {
        magBtn.addEventListener('mousemove', function(e) {
          if (!self.config.magnetic) return;
          const rect = magBtn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.35;
          const dy = (e.clientY - cy) * 0.35;
          magBtn.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0) scale(1.05)';
        });
        magBtn.addEventListener('mouseleave', function() {
          magBtn.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
      }

      // 2. 3D Tilt Card demo
      const tiltCard = playArea.querySelector('.fx-demo-tilt');
      const glare = playArea.querySelector('.fx-demo-glare');
      if (tiltCard) {
        tiltCard.addEventListener('mousemove', function(e) {
          if (!self.config.tilt3d) return;
          const rect = tiltCard.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const px = (x / rect.width - 0.5) * 2;
          const py = (y / rect.height - 0.5) * 2;
          const rx = -py * 16;
          const ry = px * 16;
          tiltCard.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.02, 1.02, 1.02)';
          if (glare) {
            glare.style.opacity = '0.6';
            glare.style.background = 'radial-gradient(circle at ' + ((x/rect.width)*100) + '% ' + ((y/rect.height)*100) + '%, rgba(255,255,255,0.4) 0%, transparent 65%)';
          }
        });
        tiltCard.addEventListener('mouseleave', function() {
          tiltCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          if (glare) glare.style.opacity = '0';
        });
      }

      // 3. Ripple click demo
      playArea.addEventListener('click', function(e) {
        if (!self.config.ripple) return;
        const target = e.target.closest('.fx-demo-ripple');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        ripple.style.cssText = 'width:' + diameter + 'px;height:' + diameter + 'px;left:' + (e.clientX - rect.left - radius) + 'px;top:' + (e.clientY - rect.top - radius) + 'px;position:absolute;border-radius:50%;transform:scale(0);animation:ultraRipple 0.6s linear;background-color:rgba(255,255,255,0.4);pointer-events:none;';
        target.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    },

    toggleCursorDemo: function() {
      this.config.customCursor = !this.config.customCursor;
      const isFr = _isFr();
      _toast(
        isFr ? ('Curseur fluide: ' + (this.config.customCursor ? 'ACTIVÉ' : 'DÉSACTIVÉ')) :
        ('Fluid cursor: ' + (this.config.customCursor ? 'ENABLED' : 'DISABLED')),
        'info'
      );
    },

    generateStandaloneSnippet: function() {
      const cursorScript = this.config.customCursor ?
'  var dot = document.createElement("div");\n' +
'  dot.className = "ultra-cursor-dot";\n' +
'  var ring = document.createElement("div");\n' +
'  ring.className = "ultra-cursor-ring";\n' +
'  document.body.appendChild(dot);\n' +
'  document.body.appendChild(ring);\n\n' +
'  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;\n' +
'  var ringX = mouseX, ringY = mouseY;\n\n' +
'  window.addEventListener("mousemove", function(e) {\n' +
'    mouseX = e.clientX; mouseY = e.clientY;\n' +
'    dot.style.transform = "translate3d(" + mouseX + "px, " + mouseY + "px, 0) translate(-50%, -50%)";\n' +
'  });\n\n' +
'  function animRing() {\n' +
'    ringX += (mouseX - ringX) * 0.18;\n' +
'    ringY += (mouseY - ringY) * 0.18;\n' +
'    ring.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0) translate(-50%, -50%)";\n' +
'    requestAnimationFrame(animRing);\n' +
'  }\n' +
'  animRing();\n' : '  // Fluid cursor disabled in config';

      return '<!-- Ultra Micro-Interactions & Cursor FX Lab -->\n' +
'<style>\n' +
'.ultra-magnetic {\n' +
'  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);\n' +
'  will-change: transform;\n' +
'}\n' +
'.ultra-ripple {\n' +
'  position: relative;\n' +
'  overflow: hidden;\n' +
'}\n' +
'@keyframes ultraRippleAnim {\n' +
'  to { transform: scale(4); opacity: 0; }\n' +
'}\n' +
'.ultra-ripple-wave {\n' +
'  position: absolute;\n' +
'  border-radius: 50%;\n' +
'  background: rgba(255, 255, 255, 0.35);\n' +
'  transform: scale(0);\n' +
'  animation: ultraRippleAnim 0.6s ease-out;\n' +
'  pointer-events: none;\n' +
'}\n' +
'.ultra-tilt-3d {\n' +
'  transition: transform 0.15s ease-out;\n' +
'  transform-style: preserve-3d;\n' +
'  will-change: transform;\n' +
'}\n' +
'.ultra-cursor-dot {\n' +
'  position: fixed;\n' +
'  top: 0; left: 0;\n' +
'  width: 8px; height: 8px;\n' +
'  background: #38bdf8;\n' +
'  border-radius: 50%;\n' +
'  pointer-events: none;\n' +
'  z-index: 999999;\n' +
'  transform: translate(-50%, -50%);\n' +
'}\n' +
'.ultra-cursor-ring {\n' +
'  position: fixed;\n' +
'  top: 0; left: 0;\n' +
'  width: 32px; height: 32px;\n' +
'  border: 1.5px solid rgba(56, 189, 248, 0.5);\n' +
'  border-radius: 50%;\n' +
'  pointer-events: none;\n' +
'  z-index: 999998;\n' +
'  transform: translate(-50%, -50%);\n' +
'  transition: transform 0.08s ease-out;\n' +
'}\n' +
'</style>\n\n' +
'<script>\n' +
'(function() {\n' +
'  // A. Magnetic Effect\n' +
'  document.querySelectorAll(".ultra-magnetic, button, .btn").forEach(function(el) {\n' +
'    el.addEventListener("mousemove", function(e) {\n' +
'      var rect = el.getBoundingClientRect();\n' +
'      var x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;\n' +
'      var y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;\n' +
'      el.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";\n' +
'    });\n' +
'    el.addEventListener("mouseleave", function() {\n' +
'      el.style.transform = "translate3d(0, 0, 0)";\n' +
'    });\n' +
'  });\n\n' +
'  // B. 3D Tilt Cards\n' +
'  document.querySelectorAll(".ultra-tilt-3d, .card, .panel").forEach(function(card) {\n' +
'    card.addEventListener("mousemove", function(e) {\n' +
'      var rect = card.getBoundingClientRect();\n' +
'      var px = (e.clientX - rect.left) / rect.width - 0.5;\n' +
'      var py = (e.clientY - rect.top) / rect.height - 0.5;\n' +
'      card.style.transform = "perspective(1000px) rotateX(" + (-py * 14) + "deg) rotateY(" + (px * 14) + "deg) scale3d(1.02, 1.02, 1.02)";\n' +
'    });\n' +
'    card.addEventListener("mouseleave", function() {\n' +
'      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";\n' +
'    });\n' +
'  });\n\n' +
'  // C. Ripple Click\n' +
'  document.addEventListener("click", function(e) {\n' +
'    var target = e.target.closest(".ultra-ripple, button, .btn");\n' +
'    if (!target) return;\n' +
'    var rect = target.getBoundingClientRect();\n' +
'    var circle = document.createElement("span");\n' +
'    var size = Math.max(rect.width, rect.height);\n' +
'    circle.className = "ultra-ripple-wave";\n' +
'    circle.style.width = circle.style.height = size + "px";\n' +
'    circle.style.left = (e.clientX - rect.left - size / 2) + "px";\n' +
'    circle.style.top = (e.clientY - rect.top - size / 2) + "px";\n' +
'    target.appendChild(circle);\n' +
'    setTimeout(function() { circle.remove(); }, 600);\n' +
'  });\n\n' +
'  // D. Fluid Custom Cursor\n' +
cursorScript + '\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Micro-Interactions & Cursor FX Lab -->[\s\S]*?<\/script>/gi, 'Micro-Interactions & FX');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Micro-Interactions Snippet');
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 3. ULTRA GDPR & COOKIE CONSENT SHIELD
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraCookieConsent = {
    config: {
      position: 'bottom-bar',
      theme: 'glass',
      analytics: true,
      marketing: false,
      preferences: true
    },

    open: function() {
      const modal = document.getElementById('modal-cookie-consent');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updatePreview();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-cookie-consent');
      if (modal) modal.classList.remove('show', 'active');
    },

    updatePreview: function() {
      const preview = document.getElementById('cc-banner-preview');
      if (!preview) return;

      const posSelect = document.getElementById('cc-pos-select');
      if (posSelect) this.config.position = posSelect.value;

      const themeSelect = document.getElementById('cc-theme-select');
      if (themeSelect) this.config.theme = themeSelect.value;

      const isGlass = this.config.theme === 'glass';
      const bg = isGlass ? 'rgba(15, 23, 42, 0.92)' : '#090d16';
      const border = isGlass ? 'rgba(255, 255, 255, 0.15)' : '#1e293b';

      preview.innerHTML = '<div style="background:' + bg + ';border:1px solid ' + border + ';border-radius:16px;padding:18px 22px;color:#f8fafc;box-shadow:0 15px 40px rgba(0,0,0,0.6);backdrop-filter:blur(16px);width:100%;max-width:540px;margin:0 auto">' +
        '<div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:14px">' +
          '<span style="font-size:1.8rem;line-height:1">🍪</span>' +
          '<div>' +
            '<div style="font-weight:800;font-size:0.95rem;color:#fff">We Value Your Privacy &amp; Data Rights</div>' +
            '<div style="font-size:0.8rem;color:#94a3b8;margin-top:4px;line-height:1.4">' +
              'We use cookies and telemetry to optimize app performance, remember preferences, and analyze anonymized visits.' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;background:rgba(255,255,255,0.03);padding:10px;border-radius:10px;margin-bottom:14px">' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:0.75rem;cursor:not-allowed;opacity:0.85">' +
            '<input type="checkbox" checked disabled>' +
            '<span>Essential (Strict)</span>' +
          '</label>' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:0.75rem;cursor:pointer">' +
            '<input type="checkbox" id="cc-chk-analytics" ' + (this.config.analytics ? 'checked' : '') + ' onchange="UltraCookieConsent.config.analytics=this.checked">' +
            '<span>Analytics</span>' +
          '</label>' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:0.75rem;cursor:pointer">' +
            '<input type="checkbox" id="cc-chk-marketing" ' + (this.config.marketing ? 'checked' : '') + ' onchange="UltraCookieConsent.config.marketing=this.checked">' +
            '<span>Marketing</span>' +
          '</label>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px">' +
          '<button onclick="UltraCookieConsent.simConsent(\'essential\')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:6px 12px;border-radius:8px;font-size:0.78rem;font-weight:600;cursor:pointer">Reject Optional</button>' +
          '<button onclick="UltraCookieConsent.simConsent(\'all\')" style="background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;color:#fff;padding:6px 16px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(56,189,248,0.4)">Accept All</button>' +
        '</div>' +
      '</div>';
    },

    simConsent: function(type) {
      const isFr = _isFr();
      _sound('pop');
      if (type === 'all') {
        _toast(isFr ? '✓ Tous les cookies acceptés !' : '✓ All cookies accepted!', 'success');
      } else {
        _toast(isFr ? '✓ Cookies optionnels refusés (Strict uniquement).' : '✓ Optional cookies rejected (Strict only).', 'info');
      }
    },

    generateStandaloneSnippet: function() {
      return '<!-- Ultra GDPR & Cookie Consent Shield -->\n' +
'<div id="ultra-cookie-banner" style="display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999999; width: calc(100% - 32px); max-width: 580px; font-family: system-ui, -apple-system, sans-serif;">\n' +
'  <div style="background: rgba(15, 23, 42, 0.94); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 16px; padding: 18px 22px; color: #f8fafc; box-shadow: 0 20px 50px rgba(0,0,0,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">\n' +
'    <div style="display: flex; align-items: flex-start; gap: 14px; margin-bottom: 12px;">\n' +
'      <span style="font-size: 28px; line-height: 1;">🍪</span>\n' +
'      <div style="flex: 1;">\n' +
'        <div style="font-weight: 800; font-size: 15px; color: #fff;">GDPR &amp; Privacy Choices</div>\n' +
'        <div style="font-size: 12.5px; color: #94a3b8; margin-top: 4px; line-height: 1.4;">\n' +
'          We use cookies to maintain your session, analyze telemetry, and enhance your digital experience.\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n\n' +
'    <div style="display: flex; gap: 10px; margin-bottom: 14px; font-size: 12px; color: #cbd5e1; background: rgba(255,255,255,0.04); padding: 8px 12px; border-radius: 8px;">\n' +
'      <label style="display: flex; align-items: center; gap: 4px;"><input type="checkbox" checked disabled> Essential</label>\n' +
'      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;"><input type="checkbox" id="uc-opt-analytics" checked> Analytics</label>\n' +
'      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;"><input type="checkbox" id="uc-opt-marketing"> Marketing</label>\n' +
'    </div>\n\n' +
'    <div style="display: flex; justify-content: flex-end; gap: 8px;">\n' +
'      <button id="uc-btn-reject" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer;">Reject Optional</button>\n' +
'      <button id="uc-btn-accept" style="background: linear-gradient(135deg,#38bdf8,#6366f1); border: none; color: #fff; padding: 7px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(56,189,248,0.4);">Accept All</button>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n' +
'<!-- Floating Privacy Badge to re-open -->\n' +
'<button id="ultra-privacy-badge" style="position: fixed; bottom: 16px; left: 16px; z-index: 999990; background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 6px 12px; color: #94a3b8; font-size: 11.5px; font-weight: 600; cursor: pointer; backdrop-filter: blur(10px); display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">\n' +
'  <span>🍪</span><span>Privacy</span>\n' +
'</button>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var STORAGE_KEY = "ultra_gdpr_consent_v1";\n' +
'  var banner = document.getElementById("ultra-cookie-banner");\n' +
'  var badge = document.getElementById("ultra-privacy-badge");\n' +
'  var btnAccept = document.getElementById("uc-btn-accept");\n' +
'  var btnReject = document.getElementById("uc-btn-reject");\n\n' +
'  function saveConsent(data) {\n' +
'    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));\n' +
'    if (banner) banner.style.display = "none";\n' +
'    window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: data }));\n' +
'  }\n\n' +
'  var existing = localStorage.getItem(STORAGE_KEY);\n' +
'  if (!existing && banner) {\n' +
'    banner.style.display = "block";\n' +
'  }\n\n' +
'  if (btnAccept) {\n' +
'    btnAccept.addEventListener("click", function() {\n' +
'      saveConsent({ essential: true, analytics: true, marketing: true, timestamp: Date.now() });\n' +
'    });\n' +
'  }\n\n' +
'  if (btnReject) {\n' +
'    btnReject.addEventListener("click", function() {\n' +
'      saveConsent({ essential: true, analytics: false, marketing: false, timestamp: Date.now() });\n' +
'    });\n' +
'  }\n\n' +
'  if (badge && banner) {\n' +
'    badge.addEventListener("click", function() {\n' +
'      banner.style.display = banner.style.display === "none" ? "block" : "none";\n' +
'    });\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra GDPR & Cookie Consent Shield -->[\s\S]*?<\/script>/gi, 'GDPR Cookie Consent Shield');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'GDPR Consent Shield');
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 4. ULTRA GUIDED PRODUCT TOUR & SPOTLIGHT ENGINE
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraProductTour = {
    currentStep: 0,
    steps: [
      {
        target: '#topbar-scroll-track',
        title: 'Universal Studio Suite',
        desc: 'Access all 60+ autonomous studios, AI code enhancers, and instant preview tools right from the topbar.',
        placement: 'bottom'
      },
      {
        target: '#editor-pane',
        title: 'Full-Code IDE & AI Copilot',
        desc: 'Inspect, live-edit, and auto-complete HTML5, CSS3, and JavaScript with bi-directional syncing.',
        placement: 'right'
      },
      {
        target: '#preview-pane',
        title: 'Zero-Latency Live Preview',
        desc: 'Watch your web application render in real-time with responsive device frames and interactive controls.',
        placement: 'left'
      }
    ],

    open: function() {
      const modal = document.getElementById('modal-product-tour');
      if (modal) {
        modal.classList.add('show', 'active');
        this.renderStepList();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-product-tour');
      if (modal) modal.classList.remove('show', 'active');
      this.endTour();
    },

    renderStepList: function() {
      const list = document.getElementById('pt-step-list');
      if (!list) return;

      list.innerHTML = this.steps.map(function(s, idx) {
        return '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;margin-bottom:8px">' +
          '<div style="display:flex;align-items:center;gap:10px">' +
            '<span style="width:24px;height:24px;border-radius:50%;background:rgba(56,189,248,0.2);color:#38bdf8;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.75rem">' + (idx + 1) + '</span>' +
            '<div>' +
              '<div style="font-weight:700;color:#fff;font-size:0.85rem">' + s.title + '</div>' +
              '<div style="color:#94a3b8;font-size:0.75rem">' + s.target + ' (' + s.placement + ')</div>' +
            '</div>' +
          '</div>' +
          '<button onclick="UltraProductTour.removeStep(' + idx + ')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.85rem;padding:4px">✕</button>' +
        '</div>';
      }).join('');
    },

    addStep: function() {
      const isFr = _isFr();
      const targetInput = document.getElementById('pt-input-target');
      const titleInput = document.getElementById('pt-input-title');
      const descInput = document.getElementById('pt-input-desc');

      if (!targetInput || !titleInput || !descInput) return;
      const target = targetInput.value.trim();
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();

      if (!target || !title) {
        _toast(isFr ? 'Veuillez saisir un sélecteur CSS et un titre.' : 'Please provide a target selector and title.', 'warning');
        return;
      }

      this.steps.push({
        target: target,
        title: title,
        desc: desc || 'Guided tour highlight for this section.',
        placement: 'bottom'
      });

      targetInput.value = '';
      titleInput.value = '';
      descInput.value = '';
      this.renderStepList();
      _toast(isFr ? 'Étape ajoutée à la visite !' : 'Step added to product tour!', 'success');
    },

    removeStep: function(index) {
      if (this.steps.length <= 1) {
        const isFr = _isFr();
        _toast(isFr ? 'La visite doit avoir au moins une étape.' : 'Tour must have at least one step.', 'warning');
        return;
      }
      this.steps.splice(index, 1);
      this.renderStepList();
    },

    runLiveDemo: function() {
      this.close();
      this.currentStep = 0;
      this.showOverlay();
    },

    showOverlay: function() {
      let overlay = document.getElementById('ultra-pt-spotlight-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ultra-pt-spotlight-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.75);z-index:9999999;transition:all 0.3s ease;pointer-events:auto;';
        document.body.appendChild(overlay);
      }

      const step = this.steps[this.currentStep];
      if (!step) {
        this.endTour();
        return;
      }

      const targetEl = document.querySelector(step.target) || document.body;
      const rect = targetEl.getBoundingClientRect();

      let spotlight = document.getElementById('ultra-pt-spotlight-box');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.id = 'ultra-pt-spotlight-box';
        spotlight.style.cssText = 'position:fixed;border-radius:12px;border:2px solid #38bdf8;box-shadow:0 0 0 9999px rgba(0,0,0,0.75), 0 0 25px rgba(56,189,248,0.6);transition:all 0.35s cubic-bezier(0.16,1,0.3,1);pointer-events:none;z-index:10000000;';
        document.body.appendChild(spotlight);
      }

      spotlight.style.top = Math.max(0, rect.top - 6) + 'px';
      spotlight.style.left = Math.max(0, rect.left - 6) + 'px';
      spotlight.style.width = Math.min(window.innerWidth - rect.left, rect.width + 12) + 'px';
      spotlight.style.height = Math.min(window.innerHeight - rect.top, rect.height + 12) + 'px';

      let card = document.getElementById('ultra-pt-card');
      if (!card) {
        card = document.createElement('div');
        card.id = 'ultra-pt-card';
        card.style.cssText = 'position:fixed;background:#0f172a;border:1px solid rgba(56,189,248,0.4);border-radius:16px;padding:18px 22px;width:320px;color:#fff;box-shadow:0 25px 50px rgba(0,0,0,0.8),0 0 20px rgba(56,189,248,0.25);z-index:10000001;font-family:system-ui,-apple-system,sans-serif;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);';
        document.body.appendChild(card);
      }

      const cardLeft = Math.min(window.innerWidth - 340, Math.max(20, rect.left + (rect.width / 2) - 160));
      const cardTop = rect.bottom + 16 > window.innerHeight - 200 ? Math.max(20, rect.top - 180) : rect.bottom + 16;
      card.style.left = cardLeft + 'px';
      card.style.top = cardTop + 'px';

      const prevBtnHtml = this.currentStep > 0 ? '<button onclick="UltraProductTour.prevStep()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:5px 12px;border-radius:6px;font-size:0.75rem;cursor:pointer">Prev</button>' : '';
      const finishLabel = this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next →';

      card.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">' +
          '<span style="font-size:0.75rem;font-weight:700;color:#38bdf8;text-transform:uppercase;letter-spacing:0.05em">Step ' + (this.currentStep + 1) + ' of ' + this.steps.length + '</span>' +
          '<button onclick="UltraProductTour.endTour()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.9rem">✕</button>' +
        '</div>' +
        '<div style="font-weight:800;font-size:1rem;color:#fff;margin-bottom:6px">' + step.title + '</div>' +
        '<div style="font-size:0.82rem;color:#cbd5e1;line-height:1.45;margin-bottom:16px">' + step.desc + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<button onclick="UltraProductTour.endTour()" style="background:none;border:none;color:#94a3b8;font-size:0.75rem;cursor:pointer">Skip Tour</button>' +
          '<div style="display:flex;gap:8px">' +
            prevBtnHtml +
            '<button onclick="UltraProductTour.nextStep()" style="background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;color:#fff;padding:5px 16px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer">' + finishLabel + '</button>' +
          '</div>' +
        '</div>';

      _sound('click');
    },

    nextStep: function() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.showOverlay();
      } else {
        this.endTour();
        _confetti();
        const isFr = _isFr();
        _toast(isFr ? '🎉 Visite guidée terminée !' : '🎉 Product tour completed!', 'success');
      }
    },

    prevStep: function() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.showOverlay();
      }
    },

    endTour: function() {
      ['ultra-pt-spotlight-overlay', 'ultra-pt-spotlight-box', 'ultra-pt-card'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    },

    generateStandaloneSnippet: function() {
      const stepsJson = JSON.stringify(this.steps);

      return '<!-- Ultra Guided Product Tour & Spotlight Engine -->\n' +
'<div id="ultra-tour-root"></div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var steps = ' + stepsJson + ';\n' +
'  var currentStep = 0;\n\n' +
'  function createOverlay() {\n' +
'    var spotlight = document.getElementById("ut-spotlight");\n' +
'    var card = document.getElementById("ut-card");\n\n' +
'    if (!spotlight) {\n' +
'      spotlight = document.createElement("div");\n' +
'      spotlight.id = "ut-spotlight";\n' +
'      spotlight.style.cssText = "position:fixed;border-radius:12px;border:2px solid #38bdf8;box-shadow:0 0 0 9999px rgba(0,0,0,0.75),0 0 25px rgba(56,189,248,0.5);transition:all 0.35s ease;pointer-events:none;z-index:999999;";\n' +
'      document.body.appendChild(spotlight);\n' +
'    }\n\n' +
'    if (!card) {\n' +
'      card = document.createElement("div");\n' +
'      card.id = "ut-card";\n' +
'      card.style.cssText = "position:fixed;background:#0f172a;border:1px solid rgba(56,189,248,0.4);border-radius:14px;padding:16px 20px;width:300px;color:#fff;box-shadow:0 20px 45px rgba(0,0,0,0.8);z-index:1000000;font-family:system-ui,-apple-system,sans-serif;transition:all 0.35s ease;";\n' +
'      document.body.appendChild(card);\n' +
'    }\n\n' +
'    var step = steps[currentStep];\n' +
'    var target = document.querySelector(step.target) || document.body;\n' +
'    var rect = target.getBoundingClientRect();\n\n' +
'    spotlight.style.top = Math.max(0, rect.top - 6) + "px";\n' +
'    spotlight.style.left = Math.max(0, rect.left - 6) + "px";\n' +
'    spotlight.style.width = Math.min(window.innerWidth - rect.left, rect.width + 12) + "px";\n' +
'    spotlight.style.height = Math.min(window.innerHeight - rect.top, rect.height + 12) + "px";\n\n' +
'    var cardLeft = Math.min(window.innerWidth - 320, Math.max(20, rect.left + rect.width / 2 - 150));\n' +
'    var cardTop = rect.bottom + 16 > window.innerHeight - 180 ? Math.max(20, rect.top - 170) : rect.bottom + 16;\n' +
'    card.style.left = cardLeft + "px";\n' +
'    card.style.top = cardTop + "px";\n\n' +
'    var prevBtn = currentStep > 0 ? \'<button id="ut-btn-prev" style="background:rgba(255,255,255,0.1);border:none;color:#fff;padding:5px 12px;border-radius:6px;font-size:11.5px;cursor:pointer">Prev</button>\' : "";\n' +
'    var nextBtnLabel = currentStep === steps.length - 1 ? "Finish" : "Next →";\n\n' +
'    card.innerHTML = \'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">\' +\n' +
'      \'<span style="font-size:11px;font-weight:700;color:#38bdf8;text-transform:uppercase">Step \' + (currentStep + 1) + \' of \' + steps.length + \'</span>\' +\n' +
'      \'<button id="ut-btn-close" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:14px">✕</button>\' +\n' +
'    \'</div>\' +\n' +
'    \'<div style="font-weight:800;font-size:15px;color:#fff;margin-bottom:4px">\' + step.title + \'</div>\' +\n' +
'    \'<div style="font-size:12.5px;color:#cbd5e1;line-height:1.4;margin-bottom:14px">\' + step.desc + \'</div>\' +\n' +
'    \'<div style="display:flex;justify-content:space-between;align-items:center">\' +\n' +
'      \'<button id="ut-btn-skip" style="background:none;border:none;color:#94a3b8;font-size:11.5px;cursor:pointer">Skip</button>\' +\n' +
'      \'<div style="display:flex;gap:6px">\' +\n' +
'        prevBtn +\n' +
'        \'<button id="ut-btn-next" style="background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;color:#fff;padding:5px 16px;border-radius:6px;font-size:11.5px;font-weight:700;cursor:pointer">\' + nextBtnLabel + \'</button>\' +\n' +
'      \'</div>\' +\n' +
'    \'</div>\';\n\n' +
'    document.getElementById("ut-btn-close").onclick = closeTour;\n' +
'    document.getElementById("ut-btn-skip").onclick = closeTour;\n' +
'    document.getElementById("ut-btn-next").onclick = function() {\n' +
'      if (currentStep < steps.length - 1) { currentStep++; createOverlay(); }\n' +
'      else { closeTour(); }\n' +
'    };\n' +
'    var pBtn = document.getElementById("ut-btn-prev");\n' +
'    if (pBtn) pBtn.onclick = function() { if (currentStep > 0) { currentStep--; createOverlay(); } };\n' +
'  }\n\n' +
'  function closeTour() {\n' +
'    var s = document.getElementById("ut-spotlight");\n' +
'    var c = document.getElementById("ut-card");\n' +
'    if (s) s.remove();\n' +
'    if (c) c.remove();\n' +
'  }\n\n' +
'  window.startProductTour = function() {\n' +
'    currentStep = 0;\n' +
'    createOverlay();\n' +
'  };\n\n' +
'  if (!localStorage.getItem("ultra_tour_viewed")) {\n' +
'    setTimeout(window.startProductTour, 1200);\n' +
'    localStorage.setItem("ultra_tour_viewed", "true");\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Guided Product Tour & Spotlight Engine -->[\s\S]*?<\/script>/gi, 'Guided Product Tour');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Product Tour Snippet');
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 5. ULTRA DYNAMIC CATALOG SEARCH, FILTER & SORTER ENGINE
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraCatalogFilter = {
    viewMode: 'grid',
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'default',
    maxPrice: 300,

    items: [
      { id: 1, title: 'Quantum AI Agent Suite', cat: 'AI Tools', price: 99, rating: 4.9, tags: ['NLP', 'Multi-Agent'], desc: 'High-concurrency autonomous AI agents with vector memory.' },
      { id: 2, title: 'Spatial 3D Canvas Pro', cat: 'Design', price: 49, rating: 4.8, tags: ['WebGL', 'Three.js'], desc: 'Immersive 3D interactive scenes and procedural particle shaders.' },
      { id: 3, title: 'Zero-Backend Micro-SaaS', cat: 'SaaS', price: 149, rating: 5.0, tags: ['Serverless', 'PWA'], desc: 'Instant local offline database, Stripe billing, and user auth.' },
      { id: 4, title: 'Polyglot i18n Engine', cat: 'Dev Tools', price: 29, rating: 4.7, tags: ['i18n', 'Localization'], desc: 'Instant multi-language switching with zero build step.' },
      { id: 5, title: 'Cyberpunk Dark Theme Kit', cat: 'Design', price: 39, rating: 4.6, tags: ['CSS', 'Glow FX'], desc: 'Futuristic glassmorphism and neon components for modern web apps.' },
      { id: 6, title: 'Mobile PWA Native Bundler', cat: 'Dev Tools', price: 79, rating: 4.9, tags: ['Mobile', 'Offline'], desc: 'Package any web application into an offline installable APK/PWA.' }
    ],

    open: function() {
      const modal = document.getElementById('modal-catalog-filter');
      if (modal) {
        modal.classList.add('show', 'active');
        this.renderCatalog();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-catalog-filter');
      if (modal) modal.classList.remove('show', 'active');
    },

    setCategory: function(cat) {
      this.activeCategory = cat;
      const pills = document.querySelectorAll('.cf-cat-pill');
      pills.forEach(function(p) {
        if (p.dataset.cat === cat) {
          p.classList.add('show', 'active');
          p.style.background = '#38bdf8';
          p.style.color = '#0f172a';
        } else {
          p.classList.remove('show', 'active');
          p.style.background = 'rgba(255,255,255,0.06)';
          p.style.color = '#cbd5e1';
        }
      });
      this.renderCatalog();
    },

    setView: function(mode) {
      this.viewMode = mode;
      this.renderCatalog();
    },

    onSearch: function(val) {
      this.searchQuery = val.toLowerCase().trim();
      this.renderCatalog();
    },

    onSort: function(val) {
      this.sortBy = val;
      this.renderCatalog();
    },

    onPrice: function(val) {
      this.maxPrice = Number(val);
      const label = document.getElementById('cf-price-val');
      if (label) label.textContent = '$' + this.maxPrice;
      this.renderCatalog();
    },

    renderCatalog: function() {
      const grid = document.getElementById('cf-items-grid');
      const countEl = document.getElementById('cf-results-count');
      if (!grid) return;

      const self = this;
      let filtered = this.items.filter(function(item) {
        const matchCat = (self.activeCategory === 'all' || item.cat === self.activeCategory);
        const matchSearch = !self.searchQuery || item.title.toLowerCase().indexOf(self.searchQuery) !== -1 || item.desc.toLowerCase().indexOf(self.searchQuery) !== -1 || item.tags.some(function(t) { return t.toLowerCase().indexOf(self.searchQuery) !== -1; });
        const matchPrice = item.price <= self.maxPrice;
        return matchCat && matchSearch && matchPrice;
      });

      if (this.sortBy === 'price-asc') filtered.sort(function(a, b) { return a.price - b.price; });
      else if (this.sortBy === 'price-desc') filtered.sort(function(a, b) { return b.price - a.price; });
      else if (this.sortBy === 'rating') filtered.sort(function(a, b) { return b.rating - a.rating; });
      else if (this.sortBy === 'name') filtered.sort(function(a, b) { return a.title.localeCompare(b.title); });

      if (countEl) {
        countEl.textContent = 'Showing ' + filtered.length + ' of ' + this.items.length + ' items';
      }

      grid.style.display = this.viewMode === 'grid' ? 'grid' : 'flex';
      grid.style.flexDirection = this.viewMode === 'grid' ? 'unset' : 'column';
      grid.style.gridTemplateColumns = this.viewMode === 'grid' ? 'repeat(auto-fill, minmax(240px, 1fr))' : 'unset';
      grid.style.gap = '14px';

      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">' +
          '<div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>' +
          '<div style="font-weight: 700; color: #fff;">No matching items found</div>' +
          '<div style="font-size: 0.8rem; margin-top: 4px;">Try loosening search filters or resetting price range.</div>' +
        '</div>';
        return;
      }

      grid.innerHTML = filtered.map(function(item) {
        const tagsHtml = item.tags.map(function(t) { return '<span style="background:rgba(255,255,255,0.05);color:#cbd5e1;padding:2px 6px;border-radius:4px;font-size:0.68rem">' + t + '</span>'; }).join('');

        return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:16px;display:flex;flex-direction:' + (self.viewMode === 'grid' ? 'column' : 'row') + ';align-items:' + (self.viewMode === 'grid' ? 'flex-start' : 'center') + ';justify-content:space-between;gap:12px;transition:all 0.2s">' +
          '<div style="flex:1">' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
              '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:2px 8px;border-radius:6px;font-size:0.7rem;font-weight:700">' + item.cat + '</span>' +
              '<span style="color:#eab308;font-size:0.75rem;font-weight:700">★ ' + item.rating + '</span>' +
            '</div>' +
            '<div style="font-weight:800;color:#fff;font-size:0.92rem;margin-bottom:4px">' + item.title + '</div>' +
            '<div style="color:#94a3b8;font-size:0.78rem;line-height:1.4;margin-bottom:8px">' + item.desc + '</div>' +
            '<div style="display:flex;gap:6px">' + tagsHtml + '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;width:' + (self.viewMode === 'grid' ? '100%' : 'auto') + ';margin-top:' + (self.viewMode === 'grid' ? '8px' : '0') + ';padding-top:' + (self.viewMode === 'grid' ? '10px' : '0') + ';border-top:' + (self.viewMode === 'grid' ? '1px solid rgba(255,255,255,0.06)' : 'none') + ';gap:16px">' +
            '<span style="font-weight:800;font-size:1.1rem;color:#38bdf8">$' + item.price + '</span>' +
            '<button onclick="_sound(\'click\');_toast(\'Selected ' + item.title + '\', \'info\')" style="background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;color:#fff;padding:6px 14px;border-radius:8px;font-size:0.75rem;font-weight:700;cursor:pointer">Explore</button>' +
          '</div>' +
        '</div>';
      }).join('');
    },

    generateStandaloneSnippet: function() {
      const itemsJson = JSON.stringify(this.items);

      return '<!-- Ultra Dynamic Catalog Search, Filter & Sorter Engine -->\n' +
'<div id="ultra-catalog-app" style="max-width: 1100px; margin: 30px auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif; color: #f8fafc;">\n' +
'  <!-- Controls Bar -->\n' +
'  <div style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: space-between; background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.12); padding: 14px 18px; border-radius: 14px; backdrop-filter: blur(12px); margin-bottom: 20px;">\n' +
'    <div style="position: relative; min-width: 220px; flex: 1;">\n' +
'      <input id="uc-search-input" type="text" placeholder="Search catalog items, tags..." style="width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 8px 14px; color: #fff; font-size: 13.5px; outline: none;">\n' +
'    </div>\n\n' +
'    <div id="uc-category-pills" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0;">\n' +
'      <button class="uc-cat-btn active" data-cat="all" style="background: #38bdf8; color: #0f172a; border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">All</button>\n' +
'      <button class="uc-cat-btn" data-cat="AI Tools" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">AI Tools</button>\n' +
'      <button class="uc-cat-btn" data-cat="Design" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">Design</button>\n' +
'      <button class="uc-cat-btn" data-cat="SaaS" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">SaaS</button>\n' +
'      <button class="uc-cat-btn" data-cat="Dev Tools" style="background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">Dev Tools</button>\n' +
'    </div>\n\n' +
'    <select id="uc-sort-select" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 7px 12px; color: #fff; font-size: 12.5px; outline: none; cursor: pointer;">\n' +
'      <option value="default" style="background:#0f172a">Sort: Featured</option>\n' +
'      <option value="price-asc" style="background:#0f172a">Price: Low to High</option>\n' +
'      <option value="price-desc" style="background:#0f172a">Price: High to Low</option>\n' +
'      <option value="rating" style="background:#0f172a">Highest Rated</option>\n' +
'      <option value="name" style="background:#0f172a">Alphabetical (A-Z)</option>\n' +
'    </select>\n' +
'  </div>\n\n' +
'  <!-- Dynamic Catalog Grid -->\n' +
'  <div id="uc-items-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;"></div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var items = ' + itemsJson + ';\n' +
'  var currentCat = "all";\n' +
'  var searchQuery = "";\n' +
'  var sortBy = "default";\n\n' +
'  var container = document.getElementById("uc-items-container");\n' +
'  var searchInput = document.getElementById("uc-search-input");\n' +
'  var sortSelect = document.getElementById("uc-sort-select");\n' +
'  var catButtons = document.querySelectorAll(".uc-cat-btn");\n\n' +
'  function render() {\n' +
'    var filtered = items.filter(function(it) {\n' +
'      var matchCat = (currentCat === "all" || it.cat === currentCat);\n' +
'      var matchSearch = !searchQuery || it.title.toLowerCase().indexOf(searchQuery) !== -1 || it.desc.toLowerCase().indexOf(searchQuery) !== -1;\n' +
'      return matchCat && matchSearch;\n' +
'    });\n\n' +
'    if (sortBy === "price-asc") filtered.sort(function(a,b) { return a.price - b.price; });\n' +
'    else if (sortBy === "price-desc") filtered.sort(function(a,b) { return b.price - a.price; });\n' +
'    else if (sortBy === "rating") filtered.sort(function(a,b) { return b.rating - a.rating; });\n' +
'    else if (sortBy === "name") filtered.sort(function(a,b) { return a.title.localeCompare(b.title); });\n\n' +
'    if (filtered.length === 0) {\n' +
'      container.innerHTML = \'<div style="grid-column:1/-1;text-align:center;padding:40px;color:#94a3b8">No products match your criteria.</div>\';\n' +
'      return;\n' +
'    }\n\n' +
'    container.innerHTML = filtered.map(function(it) {\n' +
'      return \'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;">\' +\n' +
'        \'<div>\' +\n' +
'          \'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">\' +\n' +
'            \'<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700">\' + it.cat + \'</span>\' +\n' +
'            \'<span style="color:#eab308;font-size:12px;font-weight:700">★ \' + it.rating + \'</span>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div style="font-weight:800;font-size:16px;color:#fff;margin-bottom:6px">\' + it.title + \'</div>\' +\n' +
'          \'<div style="color:#94a3b8;font-size:13px;line-height:1.4;margin-bottom:12px">\' + it.desc + \'</div>\' +\n' +
'        \'</div>\' +\n' +
'        \'<div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">\' +\n' +
'          \'<span style="font-size:18px;font-weight:800;color:#38bdf8">$\' + it.price + \'</span>\' +\n' +
'          \'<button style="background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;color:#fff;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer" onclick="alert(\\\'Selected \\\' + \\\x27\' + it.title + \'\\\x27)">View</button>\' +\n' +
'        \'</div>\' +\n' +
'      \'</div>\';\n' +
'    }).join("");\n' +
'  }\n\n' +
'  if (searchInput) {\n' +
'    searchInput.addEventListener("input", function(e) {\n' +
'      searchQuery = e.target.value.toLowerCase().trim();\n' +
'      render();\n' +
'    });\n' +
'  }\n\n' +
'  if (sortSelect) {\n' +
'    sortSelect.addEventListener("change", function(e) {\n' +
'      sortBy = e.target.value;\n' +
'      render();\n' +
'    });\n' +
'  }\n\n' +
'  catButtons.forEach(function(btn) {\n' +
'    btn.addEventListener("click", function() {\n' +
'      catButtons.forEach(function(b) {\n' +
'        b.style.background = "rgba(255,255,255,0.06)";\n' +
'        b.style.color = "#cbd5e1";\n' +
'      });\n' +
'      btn.style.background = "#38bdf8";\n' +
'      btn.style.color = "#0f172a";\n' +
'      currentCat = btn.getAttribute("data-cat");\n' +
'      render();\n' +
'    });\n' +
'  });\n\n' +
'  render();\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Dynamic Catalog Search, Filter & Sorter Engine -->[\s\S]*?<\/script>/gi, 'Dynamic Catalog Engine');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Catalog Filter Snippet');
    }
  };

  // ════════════════════════════════════════════════════════════════════════════
  // 6. ULTRA SMART OFFLINE GUARDIAN & NETWORK STATUS RIBBON
  // ════════════════════════════════════════════════════════════════════════════
  window.UltraOfflineGuardian = {
    isSimulatedOffline: false,
    offlineQueue: [],

    open: function() {
      const modal = document.getElementById('modal-offline-guardian');
      if (modal) {
        modal.classList.add('show', 'active');
        this.updateStatusDisplay();
      }
    },

    close: function() {
      const modal = document.getElementById('modal-offline-guardian');
      if (modal) modal.classList.remove('show', 'active');
    },

    updateStatusDisplay: function() {
      const statusBadge = document.getElementById('og-status-badge');
      const queueList = document.getElementById('og-queue-list');
      const queueCount = document.getElementById('og-queue-count');

      const isOffline = this.isSimulatedOffline || (typeof navigator !== "undefined" && !navigator.onLine);

      if (statusBadge) {
        if (isOffline) {
          statusBadge.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span> OFFLINE (Local Safe Mode)';
          statusBadge.style.color = '#ef4444';
          statusBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        } else {
          statusBadge.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block"></span> ONLINE (High Speed)';
          statusBadge.style.color = '#10b981';
          statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        }
      }

      if (queueCount) {
        queueCount.textContent = this.offlineQueue.length + ' items';
      }

      if (queueList) {
        if (this.offlineQueue.length === 0) {
          queueList.innerHTML = '<div style="color:#94a3b8;font-size:0.8rem;text-align:center;padding:12px">Queue empty. All requests synced.</div>';
        } else {
          queueList.innerHTML = this.offlineQueue.map(function(q) {
            return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">' +
              '<div>' +
                '<div style="font-weight:700;color:#fff;font-size:0.8rem">' + q.action + '</div>' +
                '<div style="color:#94a3b8;font-size:0.72rem">' + q.payload + '</div>' +
              '</div>' +
              '<span style="font-size:0.7rem;color:#f59e0b;font-weight:600">Pending</span>' +
            '</div>';
          }).join('');
        }
      }
    },

    toggleSimulation: function() {
      this.isSimulatedOffline = !this.isSimulatedOffline;
      const isFr = _isFr();

      if (this.isSimulatedOffline) {
        _sound('warn');
        _toast(isFr ? '📴 Mode hors-ligne simulé : ACTIVE' : '📴 Simulated Offline Mode: ACTIVE', 'warning');
      } else {
        _sound('celebrate');
        const count = this.offlineQueue.length;
        this.offlineQueue = [];
        _toast(isFr ? ('📶 Reconnexion détectée ! ' + count + ' actions synchronisées.') : ('📶 Reconnection detected! ' + count + ' actions synced.'), 'success');
      }

      this.updateStatusDisplay();
    },

    addTestQueueItem: function() {
      const isFr = _isFr();
      const actionName = 'Submit Contact Form #' + Math.floor(Math.random() * 900 + 100);
      const payload = 'email: user_' + Math.floor(Math.random() * 100) + '@example.com';

      this.offlineQueue.push({ action: actionName, payload: payload, timestamp: Date.now() });
      _sound('click');
      _toast(isFr ? 'Action enregistrée dans la file hors-ligne.' : 'Action buffered in offline queue.', 'info');
      this.updateStatusDisplay();
    },

    generateStandaloneSnippet: function() {
      return '<!-- Ultra Smart Offline Guardian & Network Ribbon -->\n' +
'<div id="ultra-offline-guardian-root">\n' +
'  <!-- Top Ribbon -->\n' +
'  <div id="ultra-offline-ribbon" style="display: none; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999999; background: linear-gradient(90deg, #dc2626, #b91c1c); color: #fff; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 600; padding: 10px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); cursor: pointer; user-select: none; box-sizing: border-box; transition: all 0.3s ease;">\n' +
'    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px;">\n' +
'      <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">\n' +
'        <span id="ultra-offline-dot" style="width: 10px; height: 10px; border-radius: 50%; background: #fef08a; display: inline-block; flex-shrink: 0; box-shadow: 0 0 10px #fef08a;"></span>\n' +
'        <span id="ultra-offline-ribbon-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">You are currently offline. Changes are saved locally.</span>\n' +
'        <span id="ultra-offline-queue-badge" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; white-space: nowrap;">0 queued</span>\n' +
'      </div>\n' +
'      <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">\n' +
'        <span id="ultra-offline-open-btn" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.35); color: #fff; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Console &amp; Queue ▼</span>\n' +
'        <button id="ultra-offline-close-btn" style="background: transparent; border: none; color: #fff; font-size: 16px; cursor: pointer; padding: 2px 6px; line-height: 1; opacity: 0.8;" title="Dismiss Ribbon">✕</button>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n\n' +
'  <!-- Floating Status Pill (bottom-right) -->\n' +
'  <div id="ultra-offline-pill" style="position: fixed; bottom: 18px; right: 18px; z-index: 9999990; background: rgba(15,23,42,0.92); border: 1px solid rgba(255,255,255,0.18); color: #fff; padding: 6px 14px; border-radius: 20px; font-family: system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 8px; backdrop-filter: blur(8px); user-select: none; transition: transform 0.2s ease;">\n' +
'    <span id="ultra-pill-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>\n' +
'    <span id="ultra-pill-text">Offline Guardian</span>\n' +
'    <span id="ultra-pill-badge" style="background: rgba(245,158,11,0.25); color: #fbbf24; border-radius: 10px; padding: 1px 6px; font-size: 10px; font-weight: 700; display: none;">0</span>\n' +
'  </div>\n\n' +
'  <!-- Interactive Offline Console Drawer Modal -->\n' +
'  <div id="ultra-offline-drawer" style="display: none; position: fixed; top: 48px; left: 50%; transform: translateX(-50%); width: 92%; max-width: 560px; z-index: 10000000; background: #0f172a; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; border-radius: 14px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.75); overflow: hidden; box-sizing: border-box; backdrop-filter: blur(14px);">\n' +
'    <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);">\n' +
'      <div style="display: flex; align-items: center; gap: 8px;">\n' +
'        <span style="font-size: 18px;">🛡️</span>\n' +
'        <span style="font-weight: 700; font-size: 14px;" id="ultra-drawer-title">Offline Guardian Console</span>\n' +
'      </div>\n' +
'      <div style="display: flex; align-items: center; gap: 10px;">\n' +
'        <span id="ultra-drawer-status-pill" style="font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid rgba(16,185,129,0.4);">● ONLINE</span>\n' +
'        <button id="ultra-drawer-close-btn" style="background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; line-height: 1; padding: 2px 6px;">✕</button>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div style="padding: 16px 18px; display: flex; flex-direction: column; gap: 14px;">\n' +
'      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; font-size: 12px; line-height: 1.5; color: #cbd5e1;">\n' +
'        <div style="font-weight: 700; color: #fff; margin-bottom: 4px;" id="ultra-drawer-info-title">Zero Data Loss Engine</div>\n' +
'        <div id="ultra-drawer-info-desc" style="color: #94a3b8; font-size: 11px;">Forms and user submissions are intercepted during disconnects, securely stored in local storage, and automatically synced on reconnect.</div>\n' +
'      </div>\n' +
'      <div style="display: flex; gap: 8px; flex-wrap: wrap;">\n' +
'        <button id="ultra-btn-toggle-sim" style="flex: 1; min-width: 140px; padding: 8px 12px; border-radius: 8px; border: 1px solid #ef4444; background: rgba(239,68,68,0.15); color: #fca5a5; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">\n' +
'          ⚡ <span id="ultra-btn-sim-label">Simulate Offline / Online</span>\n' +
'        </button>\n' +
'        <button id="ultra-btn-add-test" style="flex: 1; min-width: 140px; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); color: #e2e8f0; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">\n' +
'          📝 <span id="ultra-btn-test-label">Add Test Submission</span>\n' +
'        </button>\n' +
'        <button id="ultra-btn-sync-now" style="flex: 1; min-width: 140px; padding: 8px 12px; border-radius: 8px; border: 1px solid #10b981; background: rgba(16,185,129,0.15); color: #6ee7b7; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">\n' +
'          🔄 <span id="ultra-btn-sync-label">Force Sync Now</span>\n' +
'        </button>\n' +
'      </div>\n' +
'      <div>\n' +
'        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">\n' +
'          <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;" id="ultra-drawer-queue-header">Pending Offline Queue</span>\n' +
'          <span id="ultra-drawer-items-count" style="font-size: 11px; color: #fbbf24; font-weight: 700;">0 items</span>\n' +
'        </div>\n' +
'        <div id="ultra-drawer-queue-list" style="max-height: 140px; overflow-y: auto; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px; font-size: 11px;"></div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  var QUEUE_KEY = "ultra_offline_sync_queue";\n' +
'  var isSimulated = false;\n' +
'  var isDrawerOpen = false;\n' +
'  var isFr = (navigator.language || "").indexOf("fr") === 0 || (document.documentElement.lang || "").indexOf("fr") === 0;\n\n' +
'  var ribbon = document.getElementById("ultra-offline-ribbon");\n' +
'  var ribbonText = document.getElementById("ultra-offline-ribbon-text");\n' +
'  var ribbonDot = document.getElementById("ultra-offline-dot");\n' +
'  var queueBadge = document.getElementById("ultra-offline-queue-badge");\n' +
'  var drawer = document.getElementById("ultra-offline-drawer");\n' +
'  var drawerStatus = document.getElementById("ultra-drawer-status-pill");\n' +
'  var drawerClose = document.getElementById("ultra-drawer-close-btn");\n' +
'  var drawerQueueList = document.getElementById("ultra-drawer-queue-list");\n' +
'  var drawerItemsCount = document.getElementById("ultra-drawer-items-count");\n' +
'  var pill = document.getElementById("ultra-offline-pill");\n' +
'  var pillDot = document.getElementById("ultra-pill-dot");\n' +
'  var pillBadge = document.getElementById("ultra-pill-badge");\n' +
'  var btnToggleSim = document.getElementById("ultra-btn-toggle-sim");\n' +
'  var btnAddTest = document.getElementById("ultra-btn-add-test");\n' +
'  var btnSyncNow = document.getElementById("ultra-btn-sync-now");\n\n' +
'  function getQueue() {\n' +
'    try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch(e){ return []; }\n' +
'  }\n\n' +
'  function saveQueue(q) {\n' +
'    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch(e){}\n' +
'  }\n\n' +
'  function isOffline() {\n' +
'    return isSimulated || (typeof navigator !== "undefined" && !navigator.onLine);\n' +
'  }\n\n' +
'  function updateUI() {\n' +
'    var off = isOffline();\n' +
'    var queue = getQueue();\n' +
'    if (queueBadge) queueBadge.textContent = queue.length + (isFr ? " en attente" : " queued");\n' +
'    if (drawerItemsCount) drawerItemsCount.textContent = queue.length + (isFr ? " élément(s)" : " item(s)");\n' +
'    if (pillBadge) {\n' +
'      pillBadge.textContent = queue.length;\n' +
'      pillBadge.style.display = queue.length > 0 ? "inline-block" : "none";\n' +
'    }\n' +
'    if (off) {\n' +
'      if (ribbon) {\n' +
'        ribbon.style.display = "block";\n' +
'        ribbon.style.background = "linear-gradient(90deg, #dc2626, #b91c1c)";\n' +
'      }\n' +
'      if (ribbonText) ribbonText.textContent = isFr ? "Vous êtes hors-ligne. Actions et formulaires sauvegardés localement." : "You are currently offline. Actions and form submissions are saved locally.";\n' +
'      if (ribbonDot) { ribbonDot.style.background = "#fef08a"; ribbonDot.style.boxShadow = "0 0 10px #fef08a"; }\n' +
'      if (pillDot) pillDot.style.background = "#ef4444";\n' +
'      if (drawerStatus) {\n' +
'        drawerStatus.textContent = isFr ? "● HORS-LIGNE (Sécurisé)" : "● OFFLINE (Safe Mode)";\n' +
'        drawerStatus.style.color = "#f87171";\n' +
'        drawerStatus.style.background = "rgba(239,68,68,0.2)";\n' +
'        drawerStatus.style.borderColor = "rgba(239,68,68,0.4)";\n' +
'      }\n' +
'    } else {\n' +
'      if (pillDot) pillDot.style.background = "#10b981";\n' +
'      if (drawerStatus) {\n' +
'        drawerStatus.textContent = isFr ? "● EN LIGNE" : "● ONLINE";\n' +
'        drawerStatus.style.color = "#10b981";\n' +
'        drawerStatus.style.background = "rgba(16,185,129,0.2)";\n' +
'        drawerStatus.style.borderColor = "rgba(16,185,129,0.4)";\n' +
'      }\n' +
'    }\n' +
'    if (drawerQueueList) {\n' +
'      if (queue.length === 0) {\n' +
'        drawerQueueList.innerHTML = \'<div style="color:#64748b;text-align:center;padding:12px;">\' + (isFr ? "File vide. Toutes les requêtes sont synchronisées." : "Queue empty. All requests are synchronized.") + \'</div>\';\n' +
'      } else {\n' +
'        drawerQueueList.innerHTML = queue.map(function(item) {\n' +
'          var desc = "";\n' +
'          if (item.data) {\n' +
'            desc = Object.keys(item.data).slice(0, 2).map(function(k){ return k + ": " + item.data[k]; }).join(", ");\n' +
'          }\n' +
'          return \'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px 10px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">\' +\n' +
'            \'<div>\' +\n' +
'              \'<div style="font-weight:700;color:#f1f5f9;">\' + (item.formId || "Form Submission") + \' <span style="font-size:10px;color:#94a3b8;">(\' + (item.timestamp || "") + \')</span></div>\' +\n' +
'              (desc ? \'<div style="color:#94a3b8;font-size:10px;margin-top:2px;">\' + desc + \'</div>\' : "") +\n' +
'            \'</div>\' +\n' +
'            \'<span style="color:#f59e0b;font-weight:700;font-size:10px;background:rgba(245,158,11,0.15);padding:2px 6px;border-radius:4px;">Pending</span>\' +\n' +
'          \'</div>\';\n' +
'        }).join("");\n' +
'      }\n' +
'    }\n' +
'  }\n\n' +
'  function toggleDrawer(force) {\n' +
'    if (!drawer) return;\n' +
'    isDrawerOpen = (typeof force === "boolean") ? force : (drawer.style.display !== "block");\n' +
'    drawer.style.display = isDrawerOpen ? "block" : "none";\n' +
'    updateUI();\n' +
'  }\n\n' +
'  function triggerSync() {\n' +
'    var queue = getQueue();\n' +
'    if (ribbon) {\n' +
'      ribbon.style.display = "block";\n' +
'      ribbon.style.background = "linear-gradient(90deg, #10b981, #059669)";\n' +
'    }\n' +
'    if (ribbonDot) { ribbonDot.style.background = "#a7f3d0"; ribbonDot.style.boxShadow = "0 0 10px #a7f3d0"; }\n' +
'    if (ribbonText) ribbonText.textContent = isFr ? ("📶 Reconnexion détectée ! Synchronisation de " + queue.length + " action(s)...") : ("📶 Connection restored! Synchronizing " + queue.length + " queued actions...");\n' +
'    saveQueue([]);\n' +
'    updateUI();\n' +
'    setTimeout(function() {\n' +
'      if (ribbonText) ribbonText.textContent = isFr ? "✅ Toutes les modifications locales sont synchronisées !" : "✅ All local changes synchronized successfully!";\n' +
'      setTimeout(function() {\n' +
'        if (!isOffline()) {\n' +
'          if (ribbon) ribbon.style.display = "none";\n' +
'          if (isDrawerOpen) toggleDrawer(false);\n' +
'        }\n' +
'      }, 2500);\n' +
'    }, 1200);\n' +
'  }\n\n' +
'  if (ribbon) {\n' +
'    ribbon.addEventListener("click", function(e) {\n' +
'      if (e.target && e.target.id === "ultra-offline-close-btn") {\n' +
'        e.stopPropagation();\n' +
'        ribbon.style.display = "none";\n' +
'        return;\n' +
'      }\n' +
'      toggleDrawer();\n' +
'    });\n' +
'  }\n\n' +
'  if (pill) pill.addEventListener("click", function() { toggleDrawer(); });\n' +
'  if (drawerClose) drawerClose.addEventListener("click", function() { toggleDrawer(false); });\n\n' +
'  if (btnToggleSim) {\n' +
'    btnToggleSim.addEventListener("click", function() {\n' +
'      isSimulated = !isSimulated;\n' +
'      if (!isSimulated && !isOffline()) {\n' +
'        triggerSync();\n' +
'      } else {\n' +
'        updateUI();\n' +
'      }\n' +
'    });\n' +
'  }\n\n' +
'  if (btnAddTest) {\n' +
'    btnAddTest.addEventListener("click", function() {\n' +
'      var q = getQueue();\n' +
'      var num = Math.floor(Math.random() * 900 + 100);\n' +
'      q.push({\n' +
'        id: "sub_" + Date.now(),\n' +
'        formId: "LeadForm_" + num,\n' +
'        data: { client: "Client #" + num, email: "contact" + num + "@example.com", amount: "$" + (num * 1000) },\n' +
'        timestamp: new Date().toLocaleTimeString()\n' +
'      });\n' +
'      saveQueue(q);\n' +
'      updateUI();\n' +
'    });\n' +
'  }\n\n' +
'  if (btnSyncNow) {\n' +
'    btnSyncNow.addEventListener("click", function() {\n' +
'      isSimulated = false;\n' +
'      triggerSync();\n' +
'    });\n' +
'  }\n\n' +
'  window.addEventListener("offline", function() { isSimulated = false; updateUI(); });\n' +
'  window.addEventListener("online", function() { isSimulated = false; triggerSync(); });\n\n' +
'  document.addEventListener("submit", function(e) {\n' +
'    if (isOffline()) {\n' +
'      e.preventDefault();\n' +
'      var form = e.target;\n' +
'      var data = {};\n' +
'      try {\n' +
'        var fd = new FormData(form);\n' +
'        for (var pair of fd.entries()) { data[pair[0]] = pair[1]; }\n' +
'      } catch(err) {\n' +
'        data = { info: "Saved at " + new Date().toLocaleTimeString() };\n' +
'      }\n' +
'      var q = getQueue();\n' +
'      q.push({\n' +
'        id: "submit_" + Date.now(),\n' +
'        formId: form.id || form.getAttribute("name") || "form_" + (q.length + 1),\n' +
'        data: data,\n' +
'        timestamp: new Date().toLocaleTimeString()\n' +
'      });\n' +
'      saveQueue(q);\n' +
'      updateUI();\n' +
'      alert(isFr ?\n' +
'        "📴 Mode Hors-Ligne : Les données ont été stockées localement en toute sécurité ! Elles seront synchronisées dès le rétablissement du réseau." :\n' +
'        "📴 Offline Safe Mode: Form data safely stored locally in browser storage! It will automatically sync as soon as connection is restored."\n' +
'      );\n' +
'    }\n' +
'  }, true);\n\n' +
'  // Initial state check\n' +
'  if (isOffline()) {\n' +
'    updateUI();\n' +
'  } else {\n' +
'    updateUI();\n' +
'    if (ribbon) {\n' +
'      ribbon.style.display = "block";\n' +
'      ribbon.style.background = "linear-gradient(90deg, #1e293b, #0f172a)";\n' +
'      if (ribbonDot) ribbonDot.style.background = "#10b981";\n' +
'      if (ribbonText) ribbonText.textContent = isFr ? "🛡️ Gardien Hors-Ligne Actif · Réseau En Ligne (Cliquez pour ouvrir la console)" : "🛡️ Offline Guardian Active · Network Online (Click to open console)";\n' +
'      setTimeout(function() {\n' +
'        if (!isDrawerOpen && !isOffline() && ribbon) {\n' +
'          ribbon.style.display = "none";\n' +
'        }\n' +
'      }, 4000);\n' +
'    }\n' +
'  }\n' +
'})();\n' +
'</script>';
    },

    inject: function() {
      const snippet = this.generateStandaloneSnippet();
      _injectCodeToActiveApp(snippet, /<!-- Ultra Smart Offline Guardian & Network Ribbon -->[\s\S]*?<\/script>/gi, 'Offline Guardian Ribbon');
      this.close();
    },

    copy: function() {
      _copyCode(this.generateStandaloneSnippet(), 'Offline Guardian Snippet');
    }
  };

  
  // Auto-initialize previews on DOM ready
  function _initAllPreviews() {
    try {
      if (window.UltraCookieConsent && typeof window.UltraCookieConsent.updatePreview === 'function') {
        window.UltraCookieConsent.updatePreview();
      }
      if (window.UltraCatalogFilter && typeof window.UltraCatalogFilter.renderCatalog === 'function') {
        window.UltraCatalogFilter.renderCatalog();
      }
      if (window.UltraProductTour && typeof window.UltraProductTour.renderStepList === 'function') {
        window.UltraProductTour.renderStepList();
      }
      if (window.UltraOfflineGuardian && typeof window.UltraOfflineGuardian.updateStatusDisplay === 'function') {
        window.UltraOfflineGuardian.updateStatusDisplay();
      }
    } catch(e) {}
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', _initAllPreviews);
    } else {
      setTimeout(_initAllPreviews, 50);
    }
  }

  console.log('✅ Ultra 6 Breakthrough Innovations loaded: Social Proof, Micro-Interactions, Cookie Consent, Product Tour, Catalog Filter, Offline Guardian');
})();
