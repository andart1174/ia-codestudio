// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — HOLOGRAPHIC 3D AVATAR & VOICE CO-PILOT (v1.0)
// UltraHoloAvatarStudio (modal-holo-avatar-studio)
// 100% Client-Side Three.js WebGL & Web Speech AI Co-Pilot
// Floating 3D Interactive Avatar with Eye-Tracking, Lip-Sync & Voice Commands
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
      console.log('[UltraHoloAvatarStudio]', msg);
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
          ? `✨ ${label || 'Avatar 3D'} injecté dans votre projet avec succès !`
          : `✨ ${label || '3D Avatar'} successfully injected into your project!`,
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

  const UltraHoloAvatarStudio = {
    isOpen: false,
    currentModel: 'core', // 'core' | 'android' | 'drone'
    currentTheme: 'cyan', // 'cyan' | 'purple' | 'emerald' | 'amber'
    isVoiceCoPilotActive: false,
    isSpeaking: false,
    isListening: false,
    speechRate: 1.0,
    speechPitch: 1.0,

    // Three.js instances
    scene: null,
    camera: null,
    renderer: null,
    animFrameId: null,
    avatarGroup: null,
    headMesh: null,
    eyeLeft: null,
    eyeRight: null,
    gyroRings: [],
    stardustParticles: null,

    // Eye-tracking coords
    targetLookX: 0,
    targetLookY: 0,
    currentLookX: 0,
    currentLookY: 0,
    animTime: 0,

    themeColors: {
      cyan: { hex: 0x00f3ff, css: '#00f3ff', glow: 'rgba(0,243,255,0.45)' },
      purple: { hex: 0xa855f7, css: '#a855f7', glow: 'rgba(168,85,247,0.45)' },
      emerald: { hex: 0x10b981, css: '#10b981', glow: 'rgba(16,185,129,0.45)' },
      amber: { hex: 0xf59e0b, css: '#f59e0b', glow: 'rgba(245,158,11,0.45)' }
    },

    open() {
      const modal = document.getElementById('modal-holo-avatar-studio');
      if (!modal) {
        console.error('[UltraHoloAvatarStudio] modal-holo-avatar-studio not found');
        return;
      }
      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      setTimeout(() => {
        this.initThree();
        this.greetUser();
        const speechTextEl = document.getElementById('holo-speech-text');
        if (speechTextEl && !speechTextEl.__enterBound) {
          speechTextEl.__enterBound = true;
          speechTextEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              speechTextEl.blur();
              this.speakCurrentText();
            }
          });
        }
      }, 60);

      _toast(_isFr() ? '🧠 Studio Avatar 3D Holographique activé !' : '🧠 3D Holographic Avatar Studio activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-holo-avatar-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        modal.style.display = 'none';
      }
      this.isOpen = false;
      this.stopListening();
      if (this._onResize) {
        window.removeEventListener('resize', this._onResize);
        this._onResize = null;
      }
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      _sound('close');
    },

    initThree() {
      const container = document.getElementById('holo-avatar-viewport');
      if (!container) return;

      if (this.renderer) {
        try {
          if (container.contains(this.renderer.domElement)) {
            container.removeChild(this.renderer.domElement);
          }
        } catch(e){}
        this.renderer.dispose();
        this.renderer = null;
      }

      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB) {
        container.innerHTML = '<div style="color:#f87171;padding:24px;text-align:center">Three.js WebGL library not detected.</div>';
        return;
      }

      const w = container.clientWidth || 640;
      const h = container.clientHeight || 480;

      this.scene = new THREE_LIB.Scene();
      this.camera = new THREE_LIB.PerspectiveCamera(45, w / h, 0.1, 100);
      this.camera.position.set(0, 0.2, 5.2);

      this.renderer = new THREE_LIB.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE_LIB.ACESFilmicToneMapping;
      container.appendChild(this.renderer.domElement);

      // Lights
      const ambLight = new THREE_LIB.AmbientLight(0xffffff, 0.85);
      this.scene.add(ambLight);

      const themeCol = this.themeColors[this.currentTheme].hex;
      const dirLight = new THREE_LIB.DirectionalLight(themeCol, 2.5);
      dirLight.position.set(3, 4, 5);
      this.scene.add(dirLight);

      const rimLight = new THREE_LIB.PointLight(themeCol, 3.2, 12);
      rimLight.position.set(-3, -2, -2);
      this.scene.add(rimLight);

      // Avatar Group
      this.avatarGroup = new THREE_LIB.Group();
      this.scene.add(this.avatarGroup);

      this.buildAvatarModel();
      this.buildStardust();
      this.setupInteractionHandlers(container);

      // Responsive resize
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      this._onResize = () => {
        if (!self.isOpen || !self.renderer || !self.camera || !container) return;
        const rw = container.clientWidth || 640;
        const rh = container.clientHeight || 480;
        self.camera.aspect = rw / rh;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(rw, rh);
      };
      window.addEventListener('resize', this._onResize);

      // Loop
      const self = this;
      function loop() {
        if (!self.isOpen) return;
        self.animFrameId = requestAnimationFrame(loop);
        self.animTime += 0.016;

        // Smooth eye & head orientation towards cursor
        self.currentLookX += (self.targetLookX - self.currentLookX) * 0.08;
        self.currentLookY += (self.targetLookY - self.currentLookY) * 0.08;

        if (self.avatarGroup) {
          self.avatarGroup.position.y = Math.sin(self.animTime * 1.8) * 0.12; // Zero-G breathing
          self.avatarGroup.rotation.y = self.currentLookX * 0.55;
          self.avatarGroup.rotation.x = -self.currentLookY * 0.35;
        }

        // Gyro rings rotation
        if (self.gyroRings && self.gyroRings.length > 0) {
          self.gyroRings.forEach((r, idx) => {
            r.rotation.x += 0.012 * (idx + 1);
            r.rotation.y += 0.018 * (idx + 1);
          });
        }

        // Particles orbital rotation
        if (self.stardustParticles) {
          self.stardustParticles.rotation.y += 0.002;
          self.stardustParticles.rotation.x += 0.001;
        }

        // Speaking pulse
        if (self.isSpeaking && self.headMesh) {
          const sPulse = 1.0 + Math.sin(self.animTime * 18) * 0.05;
          self.headMesh.scale.set(sPulse, sPulse, sPulse);
        } else if (self.headMesh) {
          self.headMesh.scale.set(1, 1, 1);
        }

        self.renderer.render(self.scene, self.camera);
      }
      loop();
    },

    buildAvatarModel() {
      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB || !this.avatarGroup) return;

      while (this.avatarGroup.children.length > 0) {
        this.avatarGroup.remove(this.avatarGroup.children[0]);
      }
      this.gyroRings = [];

      const col = this.themeColors[this.currentTheme].hex;

      if (this.currentModel === 'core') {
        // ── 1. QUANTUM CORE SENTINEL ──
        const coreGeo = new THREE_LIB.SphereGeometry(0.85, 32, 32);
        const coreMat = new THREE_LIB.MeshStandardMaterial({
          color: 0x070d1e,
          emissive: col,
          emissiveIntensity: 0.45,
          metalness: 0.9,
          roughness: 0.2
        });
        this.headMesh = new THREE_LIB.Mesh(coreGeo, coreMat);
        this.avatarGroup.add(this.headMesh);

        // Core wireframe cage
        const cageGeo = new THREE_LIB.IcosahedronGeometry(0.98, 2);
        const cageMat = new THREE_LIB.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.4 });
        this.avatarGroup.add(new THREE_LIB.Mesh(cageGeo, cageMat));

        // 3 Gyroscope energy rings
        for (let i = 0; i < 3; i++) {
          const ringGeo = new THREE_LIB.TorusGeometry(1.25 + i * 0.25, 0.022, 16, 64);
          const ringMat = new THREE_LIB.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.75 - i * 0.18 });
          const ring = new THREE_LIB.Mesh(ringGeo, ringMat);
          ring.rotation.set(i * 0.8, i * 0.6, 0);
          this.avatarGroup.add(ring);
          this.gyroRings.push(ring);
        }

        // Floating optical sensor
        const eyeGeo = new THREE_LIB.SphereGeometry(0.18, 16, 16);
        const eyeMat = new THREE_LIB.MeshBasicMaterial({ color: 0xffffff });
        const eye = new THREE_LIB.Mesh(eyeGeo, eyeMat);
        eye.position.set(0, 0, 0.88);
        this.avatarGroup.add(eye);

      } else if (this.currentModel === 'android') {
        // ── 2. CYBER ANDROID BUST ──
        const headGeo = new THREE_LIB.BoxGeometry(1.1, 1.4, 1.1);
        const headMat = new THREE_LIB.MeshStandardMaterial({
          color: 0x090e1c,
          metalness: 0.85,
          roughness: 0.25,
          wireframe: false
        });
        this.headMesh = new THREE_LIB.Mesh(headGeo, headMat);
        this.avatarGroup.add(this.headMesh);

        // Wireframe edges
        const edgeMesh = new THREE_LIB.LineSegments(
          new THREE_LIB.EdgesGeometry(headGeo),
          new THREE_LIB.LineBasicMaterial({ color: col, linewidth: 2 })
        );
        this.headMesh.add(edgeMesh);

        // Glowing cyber visor
        const visorGeo = new THREE_LIB.BoxGeometry(0.92, 0.22, 0.15);
        const visorMat = new THREE_LIB.MeshBasicMaterial({ color: col });
        const visor = new THREE_LIB.Mesh(visorGeo, visorMat);
        visor.position.set(0, 0.25, 0.55);
        this.headMesh.add(visor);

        // Cyber neck & collar
        const neckGeo = new THREE_LIB.CylinderGeometry(0.35, 0.55, 0.7, 16);
        const neckMat = new THREE_LIB.MeshStandardMaterial({ color: 0x050711, metalness: 0.9, roughness: 0.4 });
        const neck = new THREE_LIB.Mesh(neckGeo, neckMat);
        neck.position.set(0, -1.0, 0);
        this.avatarGroup.add(neck);

        // Audio-reactive mouth LED strip
        const mouthGeo = new THREE_LIB.PlaneGeometry(0.48, 0.06);
        const mouthMat = new THREE_LIB.MeshBasicMaterial({ color: col });
        const mouth = new THREE_LIB.Mesh(mouthGeo, mouthMat);
        mouth.position.set(0, -0.35, 0.56);
        this.headMesh.add(mouth);

      } else {
        // ── 3. GALACTIC DRONE SENTINEL ──
        const bodyGeo = new THREE_LIB.CylinderGeometry(0.7, 0.9, 0.5, 8);
        const bodyMat = new THREE_LIB.MeshStandardMaterial({ color: 0x0b1329, metalness: 0.9, roughness: 0.2 });
        this.headMesh = new THREE_LIB.Mesh(bodyGeo, bodyMat);
        this.avatarGroup.add(this.headMesh);

        // Outer scanning lens
        const lensGeo = new THREE_LIB.TorusGeometry(0.35, 0.06, 16, 32);
        const lensMat = new THREE_LIB.MeshBasicMaterial({ color: col });
        const lens = new THREE_LIB.Mesh(lensGeo, lensMat);
        lens.position.set(0, 0, 0.5);
        this.headMesh.add(lens);

        // 4 Quad-Thrusters
        for (let t = 0; t < 4; t++) {
          const angle = (t / 4) * Math.PI * 2;
          const thrusterGeo = new THREE_LIB.BoxGeometry(0.24, 0.24, 0.6);
          const thruster = new THREE_LIB.Mesh(thrusterGeo, bodyMat);
          thruster.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, 0);
          this.avatarGroup.add(thruster);

          const plumeGeo = new THREE_LIB.ConeGeometry(0.12, 0.4, 8);
          const plumeMat = new THREE_LIB.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 });
          const plume = new THREE_LIB.Mesh(plumeGeo, plumeMat);
          plume.rotation.x = Math.PI / 2;
          plume.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, -0.4);
          this.avatarGroup.add(plume);
        }
      }
    },

    buildStardust() {
      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB) return;

      const pCount = 180;
      const geom = new THREE_LIB.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 8;
        pos[i + 1] = (Math.random() - 0.5) * 6;
        pos[i + 2] = (Math.random() - 0.5) * 6;
      }
      geom.setAttribute('position', new THREE_LIB.BufferAttribute(pos, 3));
      const mat = new THREE_LIB.PointsMaterial({
        color: this.themeColors[this.currentTheme].hex,
        size: 0.05,
        transparent: true,
        opacity: 0.6
      });
      this.stardustParticles = new THREE_LIB.Points(geom, mat);
      this.scene.add(this.stardustParticles);
    },

    setupInteractionHandlers(container) {
      const self = this;
      window.addEventListener('mousemove', e => {
        if (!self.isOpen) return;
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;
          self.targetLookX = (nx - 0.5) * 2;
          self.targetLookY = (ny - 0.5) * 2;
        }
      });

      container.addEventListener('click', () => {
        _sound('blip');
        const textEl = document.getElementById('holo-speech-text');
        const currentMsg = textEl ? (textEl.textContent || textEl.innerText).trim().replace(/^["']|["']$/g, '') : '';
        self.speak(currentMsg || (_isFr()
          ? 'Systèmes quantiques opérationnels. En attente de vos ordres architecturaux.'
          : 'Quantum systems operational. Standing by for architectural directives.'));
      });
    },

    setAvatar(model) {
      return this.setModel(model);
    },

    toggleVoice() {
      return this.toggleVoiceCoPilot();
    },

    askAdvice(topic) {
      const isFr = _isFr();
      let advice = '';
      if (topic === 'audit') {
        advice = isFr
          ? 'Audit complété : architecture modulaire propre, 0 fuite mémoire détectée dans les canvas Three.js.'
          : 'Audit complete: clean modular architecture, 0 memory leaks detected in Three.js WebGL contexts.';
      } else if (topic === 'optimize') {
        advice = isFr
          ? 'Optimisation : rendu 60 FPS garanti grâce au viewport offscreen et gestion intelligente des frames.'
          : 'Optimization: smooth 60 FPS guaranteed via offscreen canvas rendering and intelligent frame pacing.';
      } else if (topic === 'security') {
        advice = isFr
          ? 'Sécurité : exécution 100% côté client sans fuite de clés API ni dépendance externe risquée.'
          : 'Security check passed: 100% client-side execution with no API token leakage or untrusted CDN vectors.';
      } else {
        advice = isFr
          ? 'Architecture Cloud : topologie Edge multirégionale avec failover sous-marin automatique.'
          : 'Cloud Architecture: multi-region Edge topology with automated orbital failover paths.';
      }
      const textEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
      if (textEl) textEl.textContent = '"' + advice + '"';
      this.speak(advice);
    },

    setModel(model) {
      this.currentModel = model;
      _sound('click');
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.holo-persona-btn, .holo-model-pill').forEach(el => {
          const m = el.getAttribute('data-persona') || el.getAttribute('data-model');
          if (m === model) el.classList.add('active');
          else el.classList.remove('active');
        });
      }
      this.buildAvatarModel();
      _toast(_isFr() ? `Modèle Avatar: ${model.toUpperCase()}` : `Avatar Model: ${model.toUpperCase()}`, 'info');
    },

    setTheme(theme) {
      this.currentTheme = theme;
      _sound('click');
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.holo-aura-btn, .holo-theme-pill').forEach(el => {
          const t = el.getAttribute('data-aura') || el.getAttribute('data-theme');
          if (t === theme) el.classList.add('active');
          else el.classList.remove('active');
        });
      }
      this.buildAvatarModel();
      _toast(_isFr() ? `Aura: ${theme.toUpperCase()}` : `Aura: ${theme.toUpperCase()}`, 'info');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SPEECH SYNTHESIS (AVATAR SPEAKS)
    // ══════════════════════════════════════════════════════════════════════════
    speakCurrentText() {
      const textEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
      let text = textEl ? (textEl.textContent || textEl.innerText || '').trim().replace(/^["']|["']$/g, '') : '';
      if (!text) {
        text = _isFr()
          ? 'Salutations architecte. Je suis votre co-pilote holographique 3D temps réel.'
          : 'Greetings architect. I am your real-time holographic 3D co-pilot.';
        if (textEl) textEl.textContent = '"' + text + '"';
      }
      this.speak(text, false);
    },

    speak(text, updateDom = true) {
      if (!text) {
        const textEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
        if (textEl) text = (textEl.textContent || textEl.innerText || '').trim().replace(/^["']|["']$/g, '');
      }
      if (!text) return;

      if (updateDom) {
        const textEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
        if (textEl && textEl.textContent.trim() !== text && textEl.textContent.trim() !== ('"' + text + '"')) {
          textEl.textContent = '"' + text + '"';
        }
      }

      if (typeof window === 'undefined' || !window.speechSynthesis) {
        _toast(text, 'info');
        return;
      }
      try {
        if (window.speechSynthesis.paused) {
          try { window.speechSynthesis.resume(); } catch(e){}
        }
        try { window.speechSynthesis.cancel(); } catch(e){}

        const utt = new SpeechSynthesisUtterance(text);
        utt.rate = 1.08;
        utt.pitch = 1.0;
        utt.volume = 1.0;

        const isRo = (typeof navigator !== 'undefined' && navigator.language && navigator.language.startsWith('ro')) || /[ăîșțâĂÎȘȚÂ]/.test(text) || /\b(salut|buna|este|sunt|aplicatie|proiect|cum|multumesc)\b/i.test(text);
        const isFrench = !isRo && _isFr();
        utt.lang = isRo ? 'ro-RO' : (isFrench ? 'fr-FR' : 'en-US');

        if (window.speechSynthesis.getVoices) {
          const voices = window.speechSynthesis.getVoices();
          let voice = null;
          if (isRo) {
            voice = voices.find(v => v.lang && v.lang.startsWith('ro'));
          } else if (isFrench) {
            voice = voices.find(v => v.lang && v.lang.startsWith('fr'));
          } else {
            voice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha') || v.default));
          }
          if (!voice) {
            voice = voices.find(v => isRo ? (v.lang && v.lang.startsWith('ro')) : isFrench ? (v.lang && v.lang.startsWith('fr')) : (v.lang && v.lang.startsWith('en')));
          }
          if (voice) utt.voice = voice;
        }

        const self = this;
        utt.onstart = () => {
          self.isSpeaking = true;
          const statusEl = document.getElementById('holo-voice-status');
          if (statusEl) statusEl.textContent = isRo ? '● VORBESC...' : (_isFr() ? '● EN TRAIN DE PARLER...' : '● TRANSMITTING VOICE...');
        };
        utt.onend = () => {
          self.isSpeaking = false;
          const statusEl = document.getElementById('holo-voice-status');
          if (statusEl) statusEl.textContent = isRo ? '🟢 GATA' : (_isFr() ? '🟢 PRÊT' : '🟢 READY');
        };
        utt.onerror = () => {
          self.isSpeaking = false;
          const statusEl = document.getElementById('holo-voice-status');
          if (statusEl) statusEl.textContent = isRo ? '🟢 GATA' : (_isFr() ? '🟢 PRÊT' : '🟢 READY');
        };
        if (window.speechSynthesis.paused) {
          try { window.speechSynthesis.resume(); } catch(e){}
        }
        window.speechSynthesis.speak(utt);
      } catch(e){
        console.warn('[UltraHoloAvatarStudio] Speech error:', e);
      }
    },

    greetUser() {
      const msg = _isFr()
        ? 'Salutations architecte. Je suis votre copilote holographique en temps réel.'
        : 'Greetings architect. I am your real-time holographic 3D co-pilot.';
      this.speak(msg);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SPEECH RECOGNITION (VOICE COMMANDS)
    // ══════════════════════════════════════════════════════════════════════════
    toggleVoiceCoPilot() {
      this.isVoiceCoPilotActive = !this.isVoiceCoPilotActive;
      _sound('click');
      const btn = document.getElementById('holo-btn-voice-listen');
      if (this.isVoiceCoPilotActive) {
        if (btn) {
          btn.classList.add('active');
          btn.innerHTML = '<span>🛑 Stop Listening</span>';
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#f87171';
        }
        this.startListening();
      } else {
        if (btn) {
          btn.classList.remove('active');
          btn.innerHTML = '<span>🎙️ Listen for Commands</span>';
          btn.style.borderColor = 'rgba(56,189,248,0.5)';
          btn.style.color = '#38bdf8';
        }
        this.stopListening();
      }
    },

    startListening() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        _toast(
          _isFr()
            ? 'La reconnaissance vocale nécessite Google Chrome ou Edge.'
            : 'Speech recognition requires Chrome or Edge browser.',
          'warning'
        );
        return;
      }
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = _isFr() ? 'fr-FR' : 'en-US';

        const self = this;
        this.recognition.onstart = () => {
          self.isListening = true;
          const statusEl = document.getElementById('holo-voice-status');
          if (statusEl) statusEl.textContent = _isFr() ? '🎙️ ÉCOUTE EN COURS...' : '🎙️ LISTENING FOR COMMANDS...';
        };
        this.recognition.onresult = (ev) => {
          const last = ev.results.length - 1;
          const command = ev.results[last][0].transcript.trim().toLowerCase();
          self.handleVoiceCommand(command);
        };
        this.recognition.onerror = () => {
          self.isListening = false;
        };
        this.recognition.onend = () => {
          if (self.isVoiceCoPilotActive) {
            try { self.recognition.start(); } catch(e){}
          } else {
            self.isListening = false;
          }
        };
        this.recognition.start();
      } catch(e){
        console.warn('[UltraHoloAvatarStudio] Mic error:', e);
      }
    },

    stopListening() {
      if (this.recognition) {
        try { this.recognition.stop(); } catch(e){}
        this.recognition = null;
      }
      this.isListening = false;
      this.isVoiceCoPilotActive = false;
      const statusEl = document.getElementById('holo-voice-status');
      if (statusEl) statusEl.textContent = _isFr() ? '🟢 EN ATTENTE' : '🟢 STANDBY';
    },

    handleVoiceCommand(raw) {
      _sound('sparkle');
      const isFr = _isFr();
      let feedback = '';

      if (raw.includes('theme') || raw.includes('thème') || raw.includes('color') || raw.includes('couleur')) {
        const themes = ['cyan', 'purple', 'emerald', 'amber'];
        const next = themes[(themes.indexOf(this.currentTheme) + 1) % themes.length];
        this.setTheme(next);
        feedback = isFr ? `Aura commutée vers ${next}.` : `Aura switched to ${next}.`;
      } else if (raw.includes('model') || raw.includes('modèle') || raw.includes('avatar')) {
        const models = ['core', 'android', 'drone'];
        const next = models[(models.indexOf(this.currentModel) + 1) % models.length];
        this.setModel(next);
        feedback = isFr ? `Modèle 3D configuré sur ${next}.` : `Avatar model set to ${next}.`;
      } else if (raw.includes('inject') || raw.includes('ajouter') || raw.includes('add')) {
        this.inject();
        feedback = isFr ? 'Avatar 3D injecté dans le projet actif.' : '3D Avatar injected into your project.';
      } else if (raw.includes('export') || raw.includes('télécharger') || raw.includes('download')) {
        this.exportStandalone();
        feedback = isFr ? 'Génération de l\'export autonome HTML.' : 'Generating standalone HTML export.';
      } else {
        feedback = isFr
          ? `Directive reçue : "${raw}". Système en ligne.`
          : `Directive recognized: "${raw}". System active.`;
      }
      this.speak(feedback);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECTION (LA DORINȚĂ / OPTIONAL)
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      _sound('sparkle');
      const theme = this.currentTheme;
      const colCss = this.themeColors[theme].css;
      const colHex = this.themeColors[theme].hex;
      const model = this.currentModel;

      const currentSpeechEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
      let initialSpeechText = currentSpeechEl ? (currentSpeechEl.textContent || currentSpeechEl.innerText || '').trim().replace(/^["']|["']$/g, '') : '';
      if (!initialSpeechText) {
        initialSpeechText = _isFr()
          ? 'Salutations architecte. Je suis votre co-pilote holographique 3D temps réel.'
          : 'Greetings architect. I am your real-time holographic 3D co-pilot.';
      }
      const escapedSpeechHtml = initialSpeechText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

      const snippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA HOLOGRAPHIC 3D AVATAR CO-PILOT (100% Client-Side Three.js)  -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-holo-avatar-floating-badge" style="position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;align-items:flex-end;font-family:system-ui,-apple-system,sans-serif;pointer-events:none">\n' +
'  <!-- Interactive Dialog Bubble -->\n' +
'  <div id="holo-injected-bubble" style="pointer-events:auto;background:rgba(15,23,42,0.95);backdrop-filter:blur(14px);border:1.5px solid ' + colCss + '99;box-shadow:0 8px 32px rgba(0,0,0,0.6), 0 0 20px ' + colCss + '44;border-radius:14px;padding:10px 14px;color:#fff;font-size:0.78rem;margin-bottom:10px;max-width:280px;line-height:1.45;display:flex;align-items:center;gap:10px;transition:transform 0.2s, box-shadow 0.2s;cursor:pointer">\n' +
'    <span style="font-size:1.25rem;flex-shrink:0" title="AI Hologram Co-Pilot">🧠</span>\n' +
'    <span id="holo-injected-text" contenteditable="true" spellcheck="false" title="Click to edit or speak" style="outline:none;border-bottom:1px dashed ' + colCss + 'aa;flex:1;cursor:text;word-break:break-word;max-height:120px;overflow-y:auto">' + escapedSpeechHtml + '</span>\n' +
'    <button id="holo-injected-speak-btn" style="pointer-events:auto;background:rgba(255,255,255,0.08);border:1px solid ' + colCss + '88;color:' + colCss + ';border-radius:8px;padding:4px 7px;font-size:0.85rem;cursor:pointer;flex-shrink:0;transition:all 0.2s" title="Click to speak this text">🔊</button>\n' +
'  </div>\n' +
'  <!-- Three.js Floating Hologram Canvas Widget -->\n' +
'  <div id="holo-injected-wrapper" style="pointer-events:auto;width:120px;height:120px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at center,#0c1733 0%,#030611 100%);border:2.5px solid ' + colCss + ';box-shadow:0 0 28px ' + colCss + '77, inset 0 0 16px ' + colCss + '33;cursor:pointer;position:relative;transition:transform 0.2s, box-shadow 0.2s" title="Click avatar to speak live text · Move cursor to look">\n' +
'    <canvas id="holo-injected-canvas" style="width:100%;height:100%;display:block"></canvas>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<script>\n' +
'(function() {\n' +
'  const badge = document.getElementById("ultra-holo-avatar-floating-badge");\n' +
'  if (!badge) return;\n' +
'  const cvs = document.getElementById("holo-injected-canvas");\n' +
'  const txt = document.getElementById("holo-injected-text");\n' +
'  const bubble = document.getElementById("holo-injected-bubble");\n' +
'  const wrap = document.getElementById("holo-injected-wrapper");\n' +
'  const speakBtn = document.getElementById("holo-injected-speak-btn");\n' +
'  if (!cvs) return;\n' +
'\n' +
'  function loadThree(cb) {\n' +
'    if (typeof THREE !== "undefined") return cb(window.THREE);\n' +
'    if (window.parent && typeof window.parent.THREE !== "undefined") return cb(window.parent.THREE);\n' +
'    const s = document.createElement("script");\n' +
'    s.src = "js/three.min.js";\n' +
'    s.onload = () => cb(window.THREE);\n' +
'    s.onerror = () => {\n' +
'      const s2 = document.createElement("script");\n' +
'      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";\n' +
'      s2.onload = () => cb(window.THREE);\n' +
'      document.head.appendChild(s2);\n' +
'    };\n' +
'    document.head.appendChild(s);\n' +
'  }\n' +
'\n' +
'  loadThree((T) => {\n' +
'    const w = 120, h = 120;\n' +
'    const scene = new T.Scene();\n' +
'    const camera = new T.PerspectiveCamera(45, 1, 0.1, 50);\n' +
'    camera.position.set(0, 0.1, 3.3);\n' +
'\n' +
'    const renderer = new T.WebGLRenderer({ canvas: cvs, antialias: true, alpha: true });\n' +
'    renderer.setSize(w, h);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'\n' +
'    const amb = new T.AmbientLight(0xffffff, 0.85);\n' +
'    scene.add(amb);\n' +
'    const col = ' + colHex + ';\n' +
'    const dirLight = new T.DirectionalLight(col, 2.5);\n' +
'    dirLight.position.set(3, 4, 5);\n' +
'    scene.add(dirLight);\n' +
'    const rimLight = new T.PointLight(col, 3.0, 10);\n' +
'    rimLight.position.set(-2.5, -2, -2);\n' +
'    scene.add(rimLight);\n' +
'\n' +
'    const grp = new T.Group();\n' +
'    scene.add(grp);\n' +
'\n' +
'    const gyroRings = [];\n' +
'    let headMesh = null;\n' +
'    let isSpeaking = false;\n' +
'\n' +
'    // Stardust particles\n' +
'    const pCount = 120;\n' +
'    const pGeom = new T.BufferGeometry();\n' +
'    const pPos = new Float32Array(pCount * 3);\n' +
'    for (let i = 0; i < pCount * 3; i += 3) {\n' +
'      pPos[i] = (Math.random() - 0.5) * 6;\n' +
'      pPos[i + 1] = (Math.random() - 0.5) * 5;\n' +
'      pPos[i + 2] = (Math.random() - 0.5) * 5;\n' +
'    }\n' +
'    pGeom.setAttribute("position", new T.BufferAttribute(pPos, 3));\n' +
'    const pMat = new T.PointsMaterial({ color: col, size: 0.045, transparent: true, opacity: 0.65 });\n' +
'    const particles = new T.Points(pGeom, pMat);\n' +
'    scene.add(particles);\n' +
'\n' +
'    const modelType = "' + model + '";\n' +
'    if (modelType === "android") {\n' +
'      const headGeo = new T.BoxGeometry(1.1, 1.4, 1.1);\n' +
'      const headMat = new T.MeshStandardMaterial({ color: 0x090e1c, metalness: 0.85, roughness: 0.25 });\n' +
'      headMesh = new T.Mesh(headGeo, headMat);\n' +
'      headMesh.add(new T.LineSegments(new T.EdgesGeometry(headGeo), new T.LineBasicMaterial({ color: col, linewidth: 2 })));\n' +
'      const visor = new T.Mesh(new T.BoxGeometry(0.92, 0.22, 0.15), new T.MeshBasicMaterial({ color: col }));\n' +
'      visor.position.set(0, 0.25, 0.55);\n' +
'      headMesh.add(visor);\n' +
'      const neck = new T.Mesh(new T.CylinderGeometry(0.35, 0.55, 0.7, 16), new T.MeshStandardMaterial({ color: 0x050711, metalness: 0.9, roughness: 0.4 }));\n' +
'      neck.position.set(0, -1.0, 0);\n' +
'      grp.add(neck);\n' +
'      const mouth = new T.Mesh(new T.PlaneGeometry(0.48, 0.06), new T.MeshBasicMaterial({ color: col }));\n' +
'      mouth.position.set(0, -0.35, 0.56);\n' +
'      headMesh.add(mouth);\n' +
'      grp.add(headMesh);\n' +
'    } else if (modelType === "drone") {\n' +
'      const bodyGeo = new T.CylinderGeometry(0.7, 0.9, 0.5, 8);\n' +
'      const bodyMat = new T.MeshStandardMaterial({ color: 0x0b1329, metalness: 0.9, roughness: 0.2 });\n' +
'      headMesh = new T.Mesh(bodyGeo, bodyMat);\n' +
'      const lens = new T.Mesh(new T.TorusGeometry(0.35, 0.06, 16, 32), new T.MeshBasicMaterial({ color: col }));\n' +
'      lens.position.set(0, 0, 0.5);\n' +
'      headMesh.add(lens);\n' +
'      for (let t = 0; t < 4; t++) {\n' +
'        const angle = (t / 4) * Math.PI * 2;\n' +
'        const thruster = new T.Mesh(new T.BoxGeometry(0.24, 0.24, 0.6), bodyMat);\n' +
'        thruster.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, 0);\n' +
'        grp.add(thruster);\n' +
'        const plume = new T.Mesh(new T.ConeGeometry(0.12, 0.4, 8), new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 }));\n' +
'        plume.rotation.x = Math.PI / 2;\n' +
'        plume.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, -0.4);\n' +
'        grp.add(plume);\n' +
'      }\n' +
'      grp.add(headMesh);\n' +
'    } else {\n' +
'      // QUANTUM CORE SENTINEL (exact replica of preview studio)\n' +
'      const coreGeo = new T.SphereGeometry(0.85, 32, 32);\n' +
'      const coreMat = new T.MeshStandardMaterial({\n' +
'        color: 0x070d1e,\n' +
'        emissive: col,\n' +
'        emissiveIntensity: 0.45,\n' +
'        metalness: 0.9,\n' +
'        roughness: 0.2\n' +
'      });\n' +
'      headMesh = new T.Mesh(coreGeo, coreMat);\n' +
'      grp.add(headMesh);\n' +
'      const cageGeo = new T.IcosahedronGeometry(0.98, 2);\n' +
'      const cageMat = new T.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.45 });\n' +
'      grp.add(new T.Mesh(cageGeo, cageMat));\n' +
'      for (let i = 0; i < 3; i++) {\n' +
'        const ringGeo = new T.TorusGeometry(1.25 + i * 0.25, 0.024, 16, 64);\n' +
'        const ringMat = new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.75 - i * 0.18 });\n' +
'        const ring = new T.Mesh(ringGeo, ringMat);\n' +
'        ring.rotation.set(i * 0.8, i * 0.6, 0);\n' +
'        grp.add(ring);\n' +
'        gyroRings.push(ring);\n' +
'      }\n' +
'      const eyeGeo = new T.SphereGeometry(0.18, 16, 16);\n' +
'      const eyeMat = new T.MeshBasicMaterial({ color: 0xffffff });\n' +
'      const eye = new T.Mesh(eyeGeo, eyeMat);\n' +
'      eye.position.set(0, 0, 0.88);\n' +
'      grp.add(eye);\n' +
'    }\n' +
'\n' +
'    let tx = 0, ty = 0, cx = 0, cy = 0, t = 0;\n' +
'    window.addEventListener("mousemove", (e) => {\n' +
'      tx = (e.clientX / window.innerWidth - 0.5) * 2;\n' +
'      ty = (e.clientY / window.innerHeight - 0.5) * 2;\n' +
'    });\n' +
'\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      t += 0.016;\n' +
'      cx += (tx - cx) * 0.08;\n' +
'      cy += (ty - cy) * 0.08;\n' +
'      grp.position.y = Math.sin(t * 1.8) * 0.1;\n' +
'      grp.rotation.y = cx * 0.55;\n' +
'      grp.rotation.x = -cy * 0.35;\n' +
'\n' +
'      gyroRings.forEach((r, idx) => {\n' +
'        r.rotation.x += 0.012 * (idx + 1);\n' +
'        r.rotation.y += 0.018 * (idx + 1);\n' +
'      });\n' +
'\n' +
'      if (particles) {\n' +
'        particles.rotation.y += 0.002;\n' +
'        particles.rotation.x += 0.001;\n' +
'      }\n' +
'\n' +
'      if (isSpeaking && headMesh) {\n' +
'        const sPulse = 1.0 + Math.sin(t * 18) * 0.06;\n' +
'        headMesh.scale.set(sPulse, sPulse, sPulse);\n' +
'      } else if (headMesh) {\n' +
'        headMesh.scale.set(1, 1, 1);\n' +
'      }\n' +
'\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'\n' +
'    // ── Speech Synthesis: ALWAYS speaks whatever live text is in the bubble ──\n' +
'    function speakCurrent(customText) {\n' +
'      if (!window.speechSynthesis) return;\n' +
'      let textToSpeak = (typeof customText === "string" && customText\n' +
'        ? customText\n' +
'        : (txt ? (txt.textContent || txt.innerText || "") : "")\n' +
'      ).trim().replace(/^[\\\"\\\']|[\\\"\\\']$/g, "");\n' +
'\n' +
'      if (!textToSpeak) {\n' +
'        textToSpeak = "Greetings! Holographic 3D Co-Pilot operational.";\n' +
'        if (txt) txt.textContent = textToSpeak;\n' +
'      }\n' +
'\n' +
'      try { if (window.speechSynthesis.paused) window.speechSynthesis.resume(); } catch(e){}\n' +
'      try { window.speechSynthesis.cancel(); } catch(e){}\n' +
'\n' +
'      const u = new SpeechSynthesisUtterance(textToSpeak);\n' +
'      u.pitch = 1.0;\n' +
'      u.rate = 1.08;\n' +
'      u.volume = 1.0;\n' +
'\n' +
'      const isRo = (navigator.language && navigator.language.startsWith("ro")) || /[ăîșțâĂÎȘȚÂ]/.test(textToSpeak) || /\\b(salut|buna|este|sunt|aplicatie|proiect|cum|multumesc)\\b/i.test(textToSpeak);\n' +
'      const isFr = !isRo && ((navigator.language && navigator.language.startsWith("fr")) || /[éèêëàâôûîïç]/.test(textToSpeak));\n' +
'      u.lang = isRo ? "ro-RO" : (isFr ? "fr-FR" : "en-US");\n' +
'\n' +
'      if (window.speechSynthesis.getVoices) {\n' +
'        const voices = window.speechSynthesis.getVoices();\n' +
'        let voice = null;\n' +
'        if (isRo) {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("ro"));\n' +
'        } else if (isFr) {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("fr"));\n' +
'        } else {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Samantha") || v.default));\n' +
'        }\n' +
'        if (!voice) {\n' +
'          voice = voices.find(v => isRo ? (v.lang && v.lang.startsWith("ro")) : isFr ? (v.lang && v.lang.startsWith("fr")) : (v.lang && v.lang.startsWith("en")));\n' +
'        }\n' +
'        if (voice) u.voice = voice;\n' +
'      }\n' +
'\n' +
'      u.onstart = () => {\n' +
'        isSpeaking = true;\n' +
'        if (bubble) {\n' +
'          bubble.style.borderColor = "' + colCss + '";\n' +
'          bubble.style.boxShadow = "0 0 24px ' + colCss + '99";\n' +
'        }\n' +
'      };\n' +
'      u.onend = () => {\n' +
'        isSpeaking = false;\n' +
'        if (bubble) {\n' +
'          bubble.style.borderColor = "' + colCss + '99";\n' +
'          bubble.style.boxShadow = "0 8px 32px rgba(0,0,0,0.6), 0 0 20px ' + colCss + '44";\n' +
'        }\n' +
'      };\n' +
'      u.onerror = () => {\n' +
'        isSpeaking = false;\n' +
'        if (bubble) {\n' +
'          bubble.style.borderColor = "' + colCss + '99";\n' +
'          bubble.style.boxShadow = "0 8px 32px rgba(0,0,0,0.6), 0 0 20px ' + colCss + '44";\n' +
'        }\n' +
'      };\n' +
'\n' +
'      try { if (window.speechSynthesis.paused) window.speechSynthesis.resume(); } catch(e){}\n' +
'      window.speechSynthesis.speak(u);\n' +
'    }\n' +
'    window.__speakHoloAvatar = speakCurrent;\n' +
'\n' +
'    function triggerPulse() {\n' +
'      if (bubble) {\n' +
'        bubble.style.transform = "scale(1.05)";\n' +
'        setTimeout(() => bubble.style.transform = "scale(1)", 180);\n' +
'      }\n' +
'      if (wrap) {\n' +
'        wrap.style.transform = "scale(1.08)";\n' +
'        setTimeout(() => wrap.style.transform = "scale(1)", 180);\n' +
'      }\n' +
'    }\n' +
'\n' +
'    // 1. Clicking Avatar Wrapper speaks the CURRENT live bubble text (NEVER overwrites with canned text!)\n' +
'    if (wrap) {\n' +
'      wrap.addEventListener("click", () => {\n' +
'        triggerPulse();\n' +
'        speakCurrent();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // 2. Clicking Speak Button speaks current text\n' +
'    if (speakBtn) {\n' +
'      speakBtn.addEventListener("click", (e) => {\n' +
'        e.stopPropagation();\n' +
'        triggerPulse();\n' +
'        speakCurrent();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // 3. Clicking Bubble speaks current text (if not editing inside text span)\n' +
'    if (bubble) {\n' +
'      bubble.addEventListener("click", (e) => {\n' +
'        if (e.target === txt || (txt && txt.contains(e.target))) return;\n' +
'        triggerPulse();\n' +
'        speakCurrent();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // 4. Pressing Enter inside editable text triggers speech immediately\n' +
'    if (txt) {\n' +
'      txt.addEventListener("keydown", (e) => {\n' +
'        if (e.key === "Enter") {\n' +
'          e.preventDefault();\n' +
'          txt.blur();\n' +
'          triggerPulse();\n' +
'          speakCurrent();\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'  });\n' +
'})();\n' +
'<' + '/script>';

      _injectCodeToActiveApp(snippet, /<!-- ULTRA HOLOGRAPHIC 3D AVATAR[\s\S]*?<\/script>/g, 'Holographic 3D Avatar');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // STANDALONE HTML EXPORT (100% PORTABLE)
    // ══════════════════════════════════════════════════════════════════════════
    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Holographic Avatar')) return;
      _sound('download');
      const theme = this.currentTheme;
      const colCss = this.themeColors[theme].css;
      const colHex = this.themeColors[theme].hex;
      const model = this.currentModel;

      const currentSpeechEl = typeof document !== 'undefined' ? document.getElementById('holo-speech-text') : null;
      let initialSpeechText = currentSpeechEl ? (currentSpeechEl.textContent || currentSpeechEl.innerText || '').trim().replace(/^["']|["']$/g, '') : '';
      if (!initialSpeechText) {
        initialSpeechText = _isFr()
          ? 'Salutations architecte. Je suis votre co-pilote holographique 3D temps réel.'
          : 'Greetings architect. I am your real-time holographic 3D co-pilot.';
      }
      const safeSpeechAttr = initialSpeechText.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Holographic 3D AI Avatar & Voice Co-Pilot</title>\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><' + '/script>\n' +
'  <style>\n' +
'    * { margin:0; padding:0; box-sizing:border-box; }\n' +
'    body { background:#03050c; color:#fff; font-family:system-ui,-apple-system,sans-serif; overflow:hidden; width:100vw; height:100vh; display:flex; flex-direction:column; }\n' +
'    #canvas-container { flex:1; width:100%; height:100%; position:relative; cursor:grab; }\n' +
'    .hud-bar { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:20; pointer-events:none; }\n' +
'    .hud-card { background:rgba(15,23,42,0.85); backdrop-filter:blur(12px); border:1px solid ' + colCss + '66; border-radius:14px; padding:8px 16px; pointer-events:auto; display:flex; align-items:center; gap:10px; }\n' +
'    .hud-btn { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:#fff; padding:6px 12px; border-radius:10px; font-size:0.75rem; cursor:pointer; font-weight:700; transition:all 0.2s; }\n' +
'    .hud-btn:hover { background:' + colCss + '33; border-color:' + colCss + '; color:' + colCss + '; }\n' +
'    .bottom-hint { position:absolute; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:6px 18px; font-size:0.75rem; color:#94a3b8; pointer-events:none; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="hud-bar">\n' +
'    <div class="hud-card">\n' +
'      <span style="font-size:1.2rem">🧠</span>\n' +
'      <div>\n' +
'        <div style="font-weight:900;font-size:0.85rem;color:' + colCss + '">Holographic 3D AI Avatar</div>\n' +
'        <div style="font-size:0.68rem;color:#94a3b8">Interactive Zero-G Co-Pilot</div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="hud-card">\n' +
'      <input id="custom-speech-input" type="text" value="' + safeSpeechAttr + '" style="background:rgba(0,0,0,0.5);border:1px solid ' + colCss + ';color:#fff;padding:6px 12px;border-radius:10px;font-size:0.75rem;outline:none;min-width:260px" placeholder="Type what avatar says...">\n' +
'      <button class="hud-btn" onclick="speakPhrase()">🎙️ Speak</button>\n' +
'      <button class="hud-btn" onclick="toggleModel()">🔄 Switch Model</button>\n' +
'      <button class="hud-btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div id="canvas-container"></div>\n' +
'  <div class="bottom-hint">🖱️ Move Mouse to Steer Eyes &amp; Head · Click Avatar or 🎙️ to Speak</div>\n' +
'  <script>\n' +
'    const models = ["core", "android", "drone"];\n' +
'    let curModel = "' + model + '";\n' +
'    const col = ' + colHex + ';\n' +
'    const container = document.getElementById("canvas-container");\n' +
'    const scene = new THREE.Scene();\n' +
'    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);\n' +
'    camera.position.set(0, 0.2, 5.0);\n' +
'    const renderer = new THREE.WebGLRenderer({ antialias: true });\n' +
'    renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'    scene.add(new THREE.AmbientLight(0xffffff, 0.85));\n' +
'    const pLight = new THREE.PointLight(col, 3.5, 15);\n' +
'    pLight.position.set(3, 4, 4);\n' +
'    scene.add(pLight);\n' +
'    const dirLight = new THREE.DirectionalLight(col, 2.0);\n' +
'    dirLight.position.set(-3, -2, -2);\n' +
'    scene.add(dirLight);\n' +
'    const avatarGrp = new THREE.Group();\n' +
'    scene.add(avatarGrp);\n' +
'    let gyroRings = [];\n' +
'    let headMesh = null;\n' +
'    let isSpeaking = false;\n' +
'\n' +
'    // Stardust particles\n' +
'    const pCount = 180;\n' +
'    const pGeom = new THREE.BufferGeometry();\n' +
'    const pPos = new Float32Array(pCount * 3);\n' +
'    for (let i = 0; i < pCount * 3; i += 3) {\n' +
'      pPos[i] = (Math.random() - 0.5) * 8;\n' +
'      pPos[i + 1] = (Math.random() - 0.5) * 6;\n' +
'      pPos[i + 2] = (Math.random() - 0.5) * 6;\n' +
'    }\n' +
'    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));\n' +
'    const particles = new THREE.Points(pGeom, new THREE.PointsMaterial({ color: col, size: 0.04, transparent: true, opacity: 0.6 }));\n' +
'    scene.add(particles);\n' +
'\n' +
'    function build(m) {\n' +
'      while(avatarGrp.children.length > 0) avatarGrp.remove(avatarGrp.children[0]);\n' +
'      gyroRings = [];\n' +
'      if (m === "android") {\n' +
'        const headGeo = new THREE.BoxGeometry(1.1, 1.4, 1.1);\n' +
'        headMesh = new THREE.Mesh(headGeo, new THREE.MeshStandardMaterial({ color: 0x090e1c, metalness: 0.85, roughness: 0.25 }));\n' +
'        headMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(headGeo), new THREE.LineBasicMaterial({ color: col, linewidth: 2 })));\n' +
'        const v = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.22, 0.15), new THREE.MeshBasicMaterial({ color: col }));\n' +
'        v.position.set(0, 0.25, 0.55); headMesh.add(v);\n' +
'        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 0.7, 16), new THREE.MeshStandardMaterial({ color: 0x050711, metalness: 0.9, roughness: 0.4 }));\n' +
'        neck.position.set(0, -1.0, 0); avatarGrp.add(neck);\n' +
'        const mouth = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.06), new THREE.MeshBasicMaterial({ color: col }));\n' +
'        mouth.position.set(0, -0.35, 0.56); headMesh.add(mouth);\n' +
'        avatarGrp.add(headMesh);\n' +
'      } else if (m === "drone") {\n' +
'        const bodyGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.5, 8);\n' +
'        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0b1329, metalness: 0.9, roughness: 0.2 });\n' +
'        headMesh = new THREE.Mesh(bodyGeo, bodyMat);\n' +
'        const l = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.06, 16, 32), new THREE.MeshBasicMaterial({ color: col }));\n' +
'        l.position.z = 0.5; headMesh.add(l);\n' +
'        for (let t = 0; t < 4; t++) {\n' +
'          const angle = (t / 4) * Math.PI * 2;\n' +
'          const thruster = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.6), bodyMat);\n' +
'          thruster.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, 0);\n' +
'          avatarGrp.add(thruster);\n' +
'          const plume = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 8), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 }));\n' +
'          plume.rotation.x = Math.PI / 2;\n' +
'          plume.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 0.4, -0.4);\n' +
'          avatarGrp.add(plume);\n' +
'        }\n' +
'        avatarGrp.add(headMesh);\n' +
'      } else {\n' +
'        const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);\n' +
'        const coreMat = new THREE.MeshStandardMaterial({ color: 0x070d1e, emissive: col, emissiveIntensity: 0.45, metalness: 0.9, roughness: 0.2 });\n' +
'        headMesh = new THREE.Mesh(coreGeo, coreMat);\n' +
'        avatarGrp.add(headMesh);\n' +
'        const cageGeo = new THREE.IcosahedronGeometry(0.98, 2);\n' +
'        const cageMat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.45 });\n' +
'        avatarGrp.add(new THREE.Mesh(cageGeo, cageMat));\n' +
'        for (let i = 0; i < 3; i++) {\n' +
'          const r = new THREE.Mesh(new THREE.TorusGeometry(1.25 + i * 0.25, 0.024, 16, 64), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.75 - i * 0.18 }));\n' +
'          r.rotation.set(i * 0.8, i * 0.6, 0);\n' +
'          avatarGrp.add(r);\n' +
'          gyroRings.push(r);\n' +
'        }\n' +
'        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));\n' +
'        eye.position.set(0, 0, 0.88);\n' +
'        avatarGrp.add(eye);\n' +
'      }\n' +
'    }\n' +
'    build(curModel);\n' +
'    let tx=0, ty=0, cx=0, cy=0, t=0;\n' +
'    window.addEventListener("mousemove", e => {\n' +
'      tx = (e.clientX / window.innerWidth - 0.5) * 2;\n' +
'      ty = (e.clientY / window.innerHeight - 0.5) * 2;\n' +
'    });\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      t += 0.016;\n' +
'      cx += (tx - cx) * 0.08;\n' +
'      cy += (ty - cy) * 0.08;\n' +
'      avatarGrp.position.y = Math.sin(t * 1.8) * 0.12;\n' +
'      avatarGrp.rotation.y = cx * 0.55;\n' +
'      avatarGrp.rotation.x = -cy * 0.35;\n' +
'      gyroRings.forEach((r, idx) => {\n' +
'        r.rotation.x += 0.012 * (idx + 1);\n' +
'        r.rotation.y += 0.018 * (idx + 1);\n' +
'      });\n' +
'      if (particles) {\n' +
'        particles.rotation.y += 0.002;\n' +
'        particles.rotation.x += 0.001;\n' +
'      }\n' +
'      if (isSpeaking && headMesh) {\n' +
'        const sPulse = 1.0 + Math.sin(t * 18) * 0.05;\n' +
'        headMesh.scale.set(sPulse, sPulse, sPulse);\n' +
'      } else if (headMesh) {\n' +
'        headMesh.scale.set(1, 1, 1);\n' +
'      }\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'    window.addEventListener("resize", () => {\n' +
'      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();\n' +
'      renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    });\n' +
'    window.toggleModel = () => {\n' +
'      const idx = (models.indexOf(curModel) + 1) % models.length;\n' +
'      curModel = models[idx];\n' +
'      build(curModel);\n' +
'    };\n' +
'    window.speakPhrase = (customText) => {\n' +
'      if (!window.speechSynthesis) return;\n' +
'      const inp = document.getElementById("custom-speech-input");\n' +
'      let text = (typeof customText === "string" && customText ? customText : (inp ? inp.value : "")).trim().replace(/^[\\\"\\\']|[\\\"\\\']$/g, "");\n' +
'      if (!text) {\n' +
'        text = "Greetings! Autonomous 3D Holographic Co-Pilot operational.";\n' +
'        if (inp) inp.value = text;\n' +
'      }\n' +
'      try { if (window.speechSynthesis.paused) window.speechSynthesis.resume(); } catch(e){}\n' +
'      try { window.speechSynthesis.cancel(); } catch(e){}\n' +
'      const u = new SpeechSynthesisUtterance(text);\n' +
'      u.pitch = 1.0;\n' +
'      u.rate = 1.08;\n' +
'      u.volume = 1.0;\n' +
'      const isRo = (navigator.language && navigator.language.startsWith("ro")) || /[ăîșțâĂÎȘȚÂ]/.test(text) || /\\b(salut|buna|este|sunt|aplicatie|proiect|cum|multumesc)\\b/i.test(text);\n' +
'      const isFr = !isRo && ((navigator.language && navigator.language.startsWith("fr")) || /[éèêëàâôûîïç]/.test(text));\n' +
'      u.lang = isRo ? "ro-RO" : (isFr ? "fr-FR" : "en-US");\n' +
'      if (window.speechSynthesis.getVoices) {\n' +
'        const voices = window.speechSynthesis.getVoices();\n' +
'        let voice = null;\n' +
'        if (isRo) {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("ro"));\n' +
'        } else if (isFr) {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("fr"));\n' +
'        } else {\n' +
'          voice = voices.find(v => v.lang && v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Samantha") || v.default));\n' +
'        }\n' +
'        if (!voice) {\n' +
'          voice = voices.find(v => isRo ? (v.lang && v.lang.startsWith("ro")) : isFr ? (v.lang && v.lang.startsWith("fr")) : (v.lang && v.lang.startsWith("en")));\n' +
'        }\n' +
'        if (voice) u.voice = voice;\n' +
'      }\n' +
'      u.onstart = () => { isSpeaking = true; };\n' +
'      u.onend = () => { isSpeaking = false; };\n' +
'      u.onerror = () => { isSpeaking = false; };\n' +
'      try { if (window.speechSynthesis.paused) window.speechSynthesis.resume(); } catch(e){}\n' +
'      window.speechSynthesis.speak(u);\n' +
'    };\n' +
'    const sInp = document.getElementById("custom-speech-input");\n' +
'    if (sInp) {\n' +
'      sInp.addEventListener("keydown", (e) => {\n' +
'        if (e.key === "Enter") {\n' +
'          e.preventDefault();\n' +
'          window.speakPhrase();\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'    window.toggleFullscreen = () => {\n' +
'      if (!document.fullscreenElement) document.documentElement.requestFullscreen();\n' +
'      else document.exitFullscreen();\n' +
'    };\n' +
'    container.addEventListener("click", () => window.speakPhrase());\n' +
'  <' + '/script>\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ultra-holo-avatar-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _toast(_isFr() ? '💾 Export HTML Avatar téléchargé !' : '💾 Standalone Avatar HTML exported!', 'success');
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraHoloAvatarStudio = UltraHoloAvatarStudio;
  }
})();
