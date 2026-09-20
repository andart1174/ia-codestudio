// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — SPATIAL XR & WEBCAM HAND GESTURE LAB (v1.0)
// UltraSpatialXRStudio (modal-spatial-xr-studio)
// 100% Client-Side Three.js WebGL, WebXR & In-Browser Optical Motion Tracking
// Touchless Air Gestures (Pinch, Air-Tap, Palm) & Vision Pro / Meta Quest Immersive
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
      console.log('[UltraSpatialXRStudio]', msg);
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
          ? `✨ ${label || 'Contrôleur Gestuel XR'} injecté dans votre projet avec succès !`
          : `✨ ${label || 'Spatial XR Gesture Controller'} successfully injected into your project!`,
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

  
  function _createCardCanvas(type, colCss) {
    const cvs = document.createElement('canvas');
    cvs.width = 512; cvs.height = 320;
    const ctx = cvs.getContext('2d');

    // Background glass gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 320);
    grad.addColorStop(0, '#091226');
    grad.addColorStop(1, '#030611');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 320);

    // Glowing border outline
    ctx.strokeStyle = colCss || '#06b6d4';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 504, 312);

    if (type === 'crypto') {
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillText('🪙 QUANTUM CRYPTO RADAR', 24, 42);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('BTC  $94,240  +5.4%', 24, 96);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '20px monospace';
      ctx.fillText('ETH  $3,820   +3.8%  ·  SOL  $214', 24, 136);

      // Sparkline wave
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(24, 250);
      const pts = [250, 230, 240, 210, 220, 190, 205, 170, 185, 160, 150];
      for (let i = 0; i < pts.length; i++) {
        ctx.lineTo(24 + i * 44, pts[i]);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(16,185,129,0.2)';
      ctx.lineTo(24 + 10 * 44, 280);
      ctx.lineTo(24, 280);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('● REAL-TIME AIR DECK TELEMETRY', 24, 296);

    } else if (type === 'audio') {
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillText('🎵 SPATIAL AUDIO EQUALIZER', 24, 42);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px system-ui, sans-serif';
      ctx.fillText('Now Playing: "Cosmic Odyssey 60fps" · 128 BPM', 24, 80);

      // Equalizer bars
      const barCount = 14;
      for (let i = 0; i < barCount; i++) {
        const h = Math.floor(Math.sin(i * 0.5 + 1.2) * 80 + 90);
        const x = 24 + i * 33;
        const y = 240 - h;
        const bGrad = ctx.createLinearGradient(0, y, 0, 240);
        bGrad.addColorStop(0, '#ec4899');
        bGrad.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = bGrad;
        ctx.fillRect(x, y, 24, h);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('32-Bit Web Audio Engine · Spatial Binaural Sound', 24, 296);

    } else {
      // Vision OS Dock
      ctx.fillStyle = '#00f3ff';
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.fillText('🛸 SPATIAL VISION OS · HUD', 24, 42);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px monospace';
      ctx.fillText('12:48:09', 24, 105);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '18px system-ui, sans-serif';
      ctx.fillText('Zero-Latency Webcam Tracking · 60 FPS WebGL', 24, 145);

      // 3 interactive dock icons
      const icons = ['📱 Apps', '⚡ GPU: 98%', '🥽 WebXR', '🛡️ Safe'];
      for (let i = 0; i < icons.length; i++) {
        ctx.fillStyle = 'rgba(56,189,248,0.15)';
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(24 + i * 116, 180, 104, 52);
        ctx.fillRect(24 + i * 116, 180, 104, 52);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText(icons[i], 36 + i * 116, 212);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('Touchless Air Gestures Active · Pinch to Zoom', 24, 296);
    }

    return cvs;
  }

  const UltraSpatialXRStudio = {
    isOpen: false,
    isCameraActive: false,
    isWebXRAvailable: false,
    activeGesture: 'none', // 'none' | 'pinch' | 'palm' | 'air_tap' | 'swipe'
    currentTheme: 'cyan',

    scene: null,
    camera: null,
    renderer: null,
    animFrameId: null,
    spatialDeckGroup: null,
    handTrackerMesh: null,
    videoEl: null,
    videoStream: null,
    analysisCanvas: null,
    analysisCtx: null,

    themeColors: {
      cyan: { hex: 0x00f3ff, css: '#00f3ff' },
      purple: { hex: 0xa855f7, css: '#a855f7' },
      emerald: { hex: 0x10b981, css: '#10b981' },
      amber: { hex: 0xf59e0b, css: '#f59e0b' }
    },

    open() {
      const modal = document.getElementById('modal-spatial-xr-studio');
      if (!modal) {
        console.error('[UltraSpatialXRStudio] modal-spatial-xr-studio not found');
        return;
      }
      this.isOpen = true;
      modal.classList.add('show', 'active');
      modal.style.display = 'flex';
      _sound('open');

      this.checkWebXRSupport();

      setTimeout(() => {
        this.initThree();
      }, 60);

      _toast(_isFr() ? '🕶️ Studio Spatial XR & Gestes Aériens activé !' : '🕶️ Spatial WebXR & Hand Gesture Studio activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-spatial-xr-studio');
      if (modal) {
        modal.classList.remove('show', 'active');
        modal.style.display = 'none';
      }
      this.isOpen = false;
      this.stopCameraTracking();
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

    checkWebXRSupport() {
      const badge = document.getElementById('xr-support-badge');
      if (typeof navigator !== 'undefined' && navigator.xr) {
        navigator.xr.isSessionSupported('immersive-vr').then(supported => {
          this.isWebXRAvailable = supported;
          if (badge) {
            badge.textContent = supported ? '🥽 WebXR Headset Ready' : '🖥️ WebGL Spatial Emulation';
            badge.style.color = supported ? '#10b981' : '#38bdf8';
          }
        }).catch(() => {
          if (badge) badge.textContent = '🖥️ WebGL Spatial Emulation';
        });
      } else {
        if (badge) badge.textContent = '🖥️ WebGL Spatial Emulation';
      }
    },

    initThree() {
      const container = document.getElementById('spatial-xr-viewport');
      if (!container) return;

      if (this.renderer) {
        try {
          if (container.contains(this.renderer.domElement)) container.removeChild(this.renderer.domElement);
        } catch(e){}
        this.renderer.dispose();
        this.renderer = null;
      }

      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB) return;

      const w = container.clientWidth || 640;
      const h = container.clientHeight || 480;

      this.scene = new THREE_LIB.Scene();
      this.camera = new THREE_LIB.PerspectiveCamera(45, w / h, 0.1, 100);
      this.camera.position.set(0, 0.8, 5.0);

      this.renderer = new THREE_LIB.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(this.renderer.domElement);

      this.scene.add(new THREE_LIB.AmbientLight(0xffffff, 0.85));
      const col = this.themeColors[this.currentTheme].hex;
      const pLight = new THREE_LIB.PointLight(col, 3.2, 12);
      pLight.position.set(2, 3, 4);
      this.scene.add(pLight);

      this.spatialDeckGroup = new THREE_LIB.Group();
      this.scene.add(this.spatialDeckGroup);

      this.buildSpatialDeck();
      this.setupInteraction(container);

      const self = this;
      this._onResize = () => {
        if (!self.isOpen || !self.camera || !self.renderer || !container) return;
        const rw = container.clientWidth || 640;
        const rh = container.clientHeight || 480;
        self.camera.aspect = rw / rh;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(rw, rh);
      };
      window.addEventListener('resize', this._onResize);
      let t = 0;
      function loop() {
        if (!self.isOpen) return;
        self.animFrameId = requestAnimationFrame(loop);
        t += 0.016;

        if (self.spatialDeckGroup && !self.isInteracting) {
          self.spatialDeckGroup.position.y = Math.sin(t * 1.5) * 0.08;
        }

        self.renderer.render(self.scene, self.camera);
      }
      loop();
    },

    buildSpatialDeck() {
      const THREE_LIB = (typeof THREE !== 'undefined' ? THREE : (window.parent && window.parent.THREE) ? window.parent.THREE : null);
      if (!THREE_LIB || !this.spatialDeckGroup) return;

      while (this.spatialDeckGroup.children.length > 0) {
        this.spatialDeckGroup.remove(this.spatialDeckGroup.children[0]);
      }

      const col = this.themeColors[this.currentTheme].hex;
      const colCss = this.themeColors[this.currentTheme].css;
      const mode = this.currentMode || 'floating-cyl';

      // 1. Pedestal Base
      const deskGeo = new THREE_LIB.CylinderGeometry(2.4, 2.6, 0.08, 32);
      const deskMat = new THREE_LIB.MeshStandardMaterial({
        color: 0x050a18,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
      });
      const desk = new THREE_LIB.Mesh(deskGeo, deskMat);
      desk.position.set(0, -1.3, 0);
      this.spatialDeckGroup.add(desk);

      // Edge ring
      const ringGeo = new THREE_LIB.TorusGeometry(2.5, 0.025, 16, 64);
      const ringMat = new THREE_LIB.MeshBasicMaterial({ color: col });
      const ring = new THREE_LIB.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, -1.25, 0);
      this.spatialDeckGroup.add(ring);

      // 2. Build 3 Holographic Glass Cards with live canvas textures
      const cardConfigs = [
        { type: 'vision', title: 'Spatial OS', x: -1.9, y: 0.1, z: 0.35, rotY: 0.4 },
        { type: 'crypto', title: 'Crypto Terminal', x: 0, y: 0.2, z: 0, rotY: 0 },
        { type: 'audio', title: 'Audio Spectrum', x: 1.9, y: 0.1, z: 0.35, rotY: -0.4 }
      ];

      if (mode === 'spherical-dome') {
        cardConfigs[0].y = 0.9; cardConfigs[0].x = -1.4; cardConfigs[0].z = -0.3;
        cardConfigs[2].y = 0.9; cardConfigs[2].x = 1.4; cardConfigs[2].z = -0.3;
      } else if (mode === 'grid-deck') {
        cardConfigs[0].z = -0.8; cardConfigs[0].rotY = 0; cardConfigs[0].x = 0; cardConfigs[0].y = 0.8;
        cardConfigs[1].z = 0; cardConfigs[1].rotY = 0; cardConfigs[1].x = 0; cardConfigs[1].y = 0.2;
        cardConfigs[2].z = 0.8; cardConfigs[2].rotY = 0; cardConfigs[2].x = 0; cardConfigs[2].y = -0.4;
      }

      this.cards = [];
      cardConfigs.forEach((cfg, idx) => {
        const cGrp = new THREE_LIB.Group();
        cGrp.position.set(cfg.x, cfg.y, cfg.z);
        cGrp.rotation.y = cfg.rotY;

        // Front Canvas Screen
        const cvs = _createCardCanvas(cfg.type, colCss);
        const texture = new THREE_LIB.CanvasTexture(cvs);
        const frontGeo = new THREE_LIB.PlaneGeometry(1.9, 1.18);
        const frontMat = new THREE_LIB.MeshBasicMaterial({ map: texture });
        const front = new THREE_LIB.Mesh(frontGeo, frontMat);
        cGrp.add(front);

        // Glass Frame Chassis
        const boxGeo = new THREE_LIB.BoxGeometry(1.92, 1.2, 0.05);
        const boxMat = new THREE_LIB.MeshStandardMaterial({
          color: 0x070c1e,
          metalness: 0.9,
          roughness: 0.1,
          transparent: true,
          opacity: 0.85
        });
        const box = new THREE_LIB.Mesh(boxGeo, boxMat);
        box.position.z = -0.026;
        box.add(new THREE_LIB.LineSegments(new THREE_LIB.EdgesGeometry(boxGeo), new THREE_LIB.LineBasicMaterial({ color: col })));
        cGrp.add(box);

        cGrp.userData = { id: cfg.type, index: idx };
        this.spatialDeckGroup.add(cGrp);
        this.cards.push(cGrp);
      });

      // 3. Floating Reticle for Hand / Mouse
      const reticleGeo = new THREE_LIB.RingGeometry(0.08, 0.11, 24);
      const reticleMat = new THREE_LIB.MeshBasicMaterial({ color: 0x00f3ff, side: THREE_LIB.DoubleSide });
      this.handTrackerMesh = new THREE_LIB.Mesh(reticleGeo, reticleMat);
      this.handTrackerMesh.position.set(0, 0, 1.2);
      this.spatialDeckGroup.add(this.handTrackerMesh);
    },

    setupInteraction(container) {
      const self = this;
      let isDown = false, px = 0, py = 0;

      container.addEventListener('mousedown', e => {
        isDown = true;
        self.isInteracting = true;
        px = e.clientX; py = e.clientY;
        self.triggerGesture('air_tap');
      });

      window.addEventListener('mousemove', e => {
        if (!self.isOpen) return;
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 3.5;
          const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 2.5;
          if (self.handTrackerMesh) {
            self.handTrackerMesh.position.x = nx;
            self.handTrackerMesh.position.y = ny;
          }
        }
        if (!isDown) return;
        const dx = e.clientX - px;
        const dy = e.clientY - py;
        if (self.spatialDeckGroup) {
          self.spatialDeckGroup.rotation.y += dx * 0.008;
          self.spatialDeckGroup.rotation.x += dy * 0.008;
        }
        px = e.clientX; py = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        isDown = false;
        self.isInteracting = false;
      });
    },

    triggerGesture(name) {
      this.activeGesture = name;
      _sound('blip');
      const badge = document.getElementById('xr-gesture-badge');
      const desc = document.getElementById('xr-gesture-desc');

      const labels = {
        air_tap: { title: '👆 AIR TAP DETECTED', desc: 'Virtual Hologram Element Activated' },
        pinch: { title: '👌 PINCH & ROTATE', desc: '3D Spatial Deck Latched to Hand' },
        palm: { title: '✋ OPEN PALM ZERO-G', desc: 'Levitation & Orbit Neutralized' },
        swipe: { title: '👉 SPATIAL SWIPE', desc: 'Page & Workspace Translocated' }
      };

      const item = labels[name] || { title: '🖐️ STANDBY', desc: 'Awaiting hand gesture' };
      if (badge) badge.textContent = item.title;
      if (desc) desc.textContent = item.desc;

      if (this.handTrackerMesh) {
        this.handTrackerMesh.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => { if (this.handTrackerMesh) this.handTrackerMesh.scale.set(1, 1, 1); }, 250);
      }
    },

    setMode(mode) {
      if (typeof document !== 'undefined') {
        document.querySelectorAll('.xr-mode-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
        });
      }
      this.currentMode = mode;
      if (this.isOpen) this.buildSpatialDeck();
      _toast(_isFr() ? ("Mode Spatial '" + mode + "' activé") : ("Spatial mode '" + mode + "' activated"), 'info');
    },

    toggleWebcam() {
      return this.toggleCameraTracking();
    },

    enterXR() {
      return this.enterWebXR();
    },

    toggleCameraTracking() {
      if (this.isCameraActive) {
        this.stopCameraTracking();
      } else {
        this.startCameraTracking();
      }
    },

    startCameraTracking() {
      const v = document.getElementById('spatial-xr-webcam-stream');
      const btn = document.getElementById('xr-btn-camera');
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        _toast(_isFr() ? 'Caméra non supportée dans ce navigateur.' : 'Camera not supported in browser.', 'warning');
        return;
      }

      navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: 'user' } })
        .then(stream => {
          this.videoStream = stream;
          this.isCameraActive = true;
          if (v) {
            v.srcObject = stream;
            v.style.display = 'block';
            try { v.play(); } catch(e){}
          }
          if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '<span>🛑 Stop Hand Camera</span>';
            btn.style.borderColor = '#ef4444';
            btn.style.color = '#f87171';
          }

          // Offscreen optical motion differencing canvas (64x48)
          if (!this._offCanvas) {
            this._offCanvas = document.createElement('canvas');
            this._offCanvas.width = 64;
            this._offCanvas.height = 48;
            this._offCtx = this._offCanvas.getContext('2d', { willReadFrequently: true });
          }
          this._prevFrameData = null;
          let lastGestureTime = 0;

          const self = this;
          const trackMotion = () => {
            if (!self.isCameraActive || !self.isOpen) return;
            self._camAnimId = requestAnimationFrame(trackMotion);

            if (v && v.readyState >= 2 && v.videoWidth > 0 && self._offCtx) {
              try {
                self._offCtx.drawImage(v, 0, 0, 64, 48);
                const currImg = self._offCtx.getImageData(0, 0, 64, 48);
                const currData = currImg.data;

                if (self._prevFrameData) {
                  let motionPixels = 0;
                  let sumX = 0;
                  let sumY = 0;
                  const prevData = self._prevFrameData;
                  const len = currData.length;

                  for (let i = 0; i < len; i += 4) {
                    const diff = Math.abs(currData[i] - prevData[i]) +
                                 Math.abs(currData[i + 1] - prevData[i + 1]) +
                                 Math.abs(currData[i + 2] - prevData[i + 2]);
                    if (diff > 45) {
                      const pIdx = i / 4;
                      const px = pIdx % 64;
                      const py = Math.floor(pIdx / 64);
                      sumX += px;
                      sumY += py;
                      motionPixels++;
                    }
                  }

                  if (motionPixels > 16) {
                    // Mirror X for intuitive user feedback
                    const normX = 1 - (sumX / motionPixels) / 64;
                    const normY = (sumY / motionPixels) / 48;

                    const targetX = (normX - 0.5) * 4.2;
                    const targetY = -(normY - 0.5) * 3.0;

                    if (self.handTrackerMesh) {
                      self.handTrackerMesh.position.x += (targetX - self.handTrackerMesh.position.x) * 0.3;
                      self.handTrackerMesh.position.y += (targetY - self.handTrackerMesh.position.y) * 0.3;
                    }

                    if (self.spatialDeckGroup) {
                      self.spatialDeckGroup.rotation.y += (normX - 0.5) * 0.05;
                      self.spatialDeckGroup.rotation.x += (normY - 0.5) * 0.03;
                    }

                    const now = Date.now();
                    if (now - lastGestureTime > 750) {
                      if (motionPixels > 380) {
                        self.triggerGesture('palm');
                        lastGestureTime = now;
                      } else if (motionPixels > 220) {
                        self.triggerGesture('swipe');
                        lastGestureTime = now;
                      } else if (motionPixels > 85) {
                        self.triggerGesture('air_tap');
                        lastGestureTime = now;
                      } else {
                        self.triggerGesture('pinch');
                        lastGestureTime = now;
                      }
                    }
                  }
                }

                self._prevFrameData = new Uint8ClampedArray(currData);
              } catch(e){}
            }
          };

          self._camAnimId = requestAnimationFrame(trackMotion);
          _toast(_isFr() ? '📷 Suivi gestuel optique actif !' : '📷 Optical Hand Tracking online!', 'success');
        })
        .catch(err => {
          _toast(_isFr() ? 'Accès caméra refusé.' : 'Camera access denied: ' + err.message, 'warning');
        });
    },

    stopCameraTracking() {
      if (this._camAnimId) {
        cancelAnimationFrame(this._camAnimId);
        this._camAnimId = null;
      }
      this._prevFrameData = null;
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(t => t.stop());
        this.videoStream = null;
      }
      this.isCameraActive = false;
      const v = document.getElementById('spatial-xr-webcam-stream');
      if (v) v.style.display = 'none';
      const btn = document.getElementById('xr-btn-camera');
      if (btn) {
        btn.classList.remove('active');
        btn.innerHTML = '<span>📷 Webcam Hand Tracking</span>';
        btn.style.borderColor = 'rgba(56,189,248,0.5)';
        btn.style.color = '#38bdf8';
      }
    },

    enterWebXR() {
      if (this.isWebXRAvailable && navigator.xr) {
        navigator.xr.requestSession('immersive-vr')
          .then(session => {
            _toast('Entering immersive WebXR session...', 'success');
          })
          .catch(err => {
            _toast('WebXR Session: ' + err.message, 'info');
          });
      } else {
        _toast(
          _isFr()
            ? 'Casque WebXR non détecté. Mode spatial 3D émulé sur écran.'
            : 'WebXR headset not detected. Emulating 3D Spatial Deck on screen.',
          'info'
        );
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECT (LA DORINȚĂ / OPTIONAL)
    // ══════════════════════════════════════════════════════════════════════════
    // ══════════════════════════════════════════════════════════════════════════
    // 1-CLICK INJECT (LA DORINȚĂ / OPTIONAL)
    // ══════════════════════════════════════════════════════════════════════════
    inject() {
      _sound('sparkle');
      const colCss = this.themeColors[this.currentTheme].css;
      const themeHex = this.themeColors[this.currentTheme].hex;

      const snippet = '<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<!-- ULTRA SPATIAL XR & TOUCHLESS AIR-GESTURE DECK (100% Three.js & WebGL) -->\n' +
'<!-- ═══════════════════════════════════════════════════════════════════ -->\n' +
'<div id="ultra-spatial-xr-card" style="margin:24px 0;background:linear-gradient(135deg,rgba(9,14,28,0.96) 0%,rgba(6,10,23,0.98) 100%);border:1.5px solid ' + colCss + '88;border-radius:20px;padding:20px;box-shadow:0 16px 48px rgba(0,0,0,0.6), 0 0 24px ' + colCss + '33;font-family:system-ui,-apple-system,sans-serif;color:#fff;position:relative;overflow:hidden">\n' +
'  <!-- Header Bar: Title, Layout Switchers, Card Navigation, Camera Toggle -->\n' +
'  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px">\n' +
'    <div style="display:flex;align-items:center;gap:10px">\n' +
'      <span style="font-size:1.5rem">🕶️</span>\n' +
'      <div>\n' +
'        <h4 style="margin:0;font-size:1.1rem;font-weight:900;background:linear-gradient(135deg,' + colCss + ',#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Spatial XR Holographic Air Deck</h4>\n' +
'        <p style="margin:2px 0 0 0;font-size:0.75rem;color:#94a3b8">Interactive 3D Touchless Glass Screens · Air Gestures &amp; Optical Motion Tracking</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <!-- Controls Toolbar -->\n' +
'    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">\n' +
'      <div style="display:flex;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:3px;gap:4px">\n' +
'        <button class="injected-xr-layout-btn" data-layout="curved" style="background:rgba(6,182,212,0.25);border:1px solid #06b6d4;color:#fff;border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">🌀 Curved</button>\n' +
'        <button class="injected-xr-layout-btn" data-layout="dome" style="background:transparent;border:1px solid transparent;color:#94a3b8;border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">🌐 Dome</button>\n' +
'        <button class="injected-xr-layout-btn" data-layout="matrix" style="background:transparent;border:1px solid transparent;color:#94a3b8;border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">🗂️ Matrix</button>\n' +
'      </div>\n' +
'      <div style="display:flex;gap:4px">\n' +
'        <button id="injected-xr-prev-btn" style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;border-radius:10px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">◀ Prev</button>\n' +
'        <button id="injected-xr-next-btn" style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;border-radius:10px;padding:5px 10px;font-size:0.72rem;font-weight:700;cursor:pointer;transition:all 0.2s">Next ▶</button>\n' +
'      </div>\n' +
'      <button id="injected-xr-cam-btn" style="background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.2));border:1px solid rgba(16,185,129,0.6);color:#34d399;border-radius:10px;padding:5px 12px;font-size:0.72rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all 0.2s">📷 Hand Tracking</button>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <!-- Main Viewport + Integrated Floating PiP Webcam & HUD -->\n' +
'  <div style="position:relative;width:100%;height:440px;border-radius:16px;overflow:hidden;background:#030714;border:1px solid rgba(56,189,248,0.25)">\n' +
'    <div id="injected-spatial-xr-viewport" style="width:100%;height:100%;position:relative;cursor:grab"></div>\n' +
'\n' +
'    <!-- Mini PiP Webcam Tile -->\n' +
'    <div id="injected-xr-cam-card" style="display:none;position:absolute;top:14px;left:14px;width:150px;background:rgba(15,23,42,0.92);backdrop-filter:blur(12px);border:1px solid rgba(16,185,129,0.5);border-radius:12px;padding:8px;z-index:30;box-shadow:0 8px 24px rgba(0,0,0,0.6)">\n' +
'      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">\n' +
'        <span style="font-size:0.6rem;color:#34d399;font-weight:800;letter-spacing:0.04em">OPTICAL TRACKER</span>\n' +
'        <span id="injected-xr-cam-dot" style="font-size:0.55rem;color:#34d399">● LIVE</span>\n' +
'      </div>\n' +
'      <video id="injected-xr-video" playsinline autoplay muted style="width:100%;height:85px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:#000;display:block"></video>\n' +
'      <div id="injected-xr-cam-status" style="font-size:0.6rem;color:#94a3b8;margin-top:4px;text-align:center">Wave hand to steer</div>\n' +
'    </div>\n' +
'\n' +
'    <!-- Live Gesture Status HUD Overlay (Top-Right) -->\n' +
'    <div id="injected-xr-gesture-hud" style="position:absolute;top:14px;right:14px;background:rgba(15,23,42,0.9);backdrop-filter:blur(12px);border:1px solid rgba(56,189,248,0.4);border-radius:12px;padding:8px 14px;z-index:20;pointer-events:none;display:flex;flex-direction:column;align-items:flex-end">\n' +
'      <div id="injected-xr-gesture-badge" style="font-size:0.75rem;font-weight:800;color:#00f3ff;letter-spacing:0.03em">🖐️ AIR RETICLE ACTIVE</div>\n' +
'      <div id="injected-xr-gesture-sub" style="font-size:0.65rem;color:#94a3b8;margin-top:2px">Aim with cursor · Click to Air-Tap</div>\n' +
'    </div>\n' +
'\n' +
'    <!-- Bottom Instruction Pill -->\n' +
'    <div style="position:absolute;bottom:12px;left:14px;right:14px;display:flex;justify-content:center;pointer-events:none;z-index:20">\n' +
'      <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);padding:5px 14px;border-radius:20px;font-size:0.72rem;color:#94a3b8">\n' +
'        ✋ Move Hand/Mouse: Aim Reticle · 👆 Click: Air-Tap Card · 🤏 Drag: 360° Orbit · 📷 Webcam: Touchless Air Control\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n\n' +
'<script>\n' +
'(function() {\n' +
'  const container = document.getElementById("injected-spatial-xr-viewport");\n' +
'  if (!container) return;\n' +
'\n' +
'  function loadThree(cb) {\n' +
'    if (typeof THREE !== "undefined") return cb(window.THREE);\n' +
'    const s = document.createElement("script");\n' +
'    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";\n' +
'    s.onload = () => cb(window.THREE);\n' +
'    document.head.appendChild(s);\n' +
'  }\n' +
'\n' +
'  loadThree((T) => {\n' +
'    const rw = container.clientWidth || 640, rh = 440;\n' +
'    const scene = new T.Scene();\n' +
'    const camera = new T.PerspectiveCamera(45, rw / rh, 0.1, 50);\n' +
'    camera.position.set(0, 0.7, 4.8);\n' +
'\n' +
'    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });\n' +
'    renderer.setSize(rw, rh);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'\n' +
'    scene.add(new T.AmbientLight(0xffffff, 0.9));\n' +
'    const pL = new T.PointLight(' + themeHex + ', 3.2, 14);\n' +
'    pL.position.set(2, 3, 4);\n' +
'    scene.add(pL);\n' +
'\n' +
'    const deck = new T.Group();\n' +
'    scene.add(deck);\n' +
'\n' +
'    // 1. Pedestal Base & Glowing Torus Ring\n' +
'    const baseMesh = new T.Mesh(\n' +
'      new T.CylinderGeometry(2.4, 2.6, 0.08, 32),\n' +
'      new T.MeshStandardMaterial({ color: 0x050a18, metalness: 0.9, roughness: 0.2 })\n' +
'    );\n' +
'    baseMesh.position.set(0, -1.3, 0);\n' +
'    deck.add(baseMesh);\n' +
'\n' +
'    const baseRing = new T.Mesh(\n' +
'      new T.TorusGeometry(2.5, 0.025, 16, 64),\n' +
'      new T.MeshBasicMaterial({ color: ' + themeHex + ' })\n' +
'    );\n' +
'    baseRing.rotation.x = Math.PI / 2;\n' +
'    baseRing.position.set(0, -1.25, 0);\n' +
'    deck.add(baseRing);\n' +
'\n' +
'    // 2. High-Resolution Dynamic Screen Canvases (512x320)\n' +
'    const cvsVision = document.createElement("canvas"); cvsVision.width = 512; cvsVision.height = 320;\n' +
'    const ctxVision = cvsVision.getContext("2d");\n' +
'    const texVision = new T.CanvasTexture(cvsVision);\n' +
'\n' +
'    const cvsCrypto = document.createElement("canvas"); cvsCrypto.width = 512; cvsCrypto.height = 320;\n' +
'    const ctxCrypto = cvsCrypto.getContext("2d");\n' +
'    const texCrypto = new T.CanvasTexture(cvsCrypto);\n' +
'\n' +
'    const cvsAudio = document.createElement("canvas"); cvsAudio.width = 512; cvsAudio.height = 320;\n' +
'    const ctxAudio = cvsAudio.getContext("2d");\n' +
'    const texAudio = new T.CanvasTexture(cvsAudio);\n' +
'\n' +
'    // Drawing Functions for Screens with Live Dynamic Elements\n' +
'    function drawVision(ctx) {\n' +
'      const g = ctx.createLinearGradient(0, 0, 512, 320);\n' +
'      g.addColorStop(0, "#091226"); g.addColorStop(1, "#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 320);\n' +
'      ctx.strokeStyle = "#00f3ff"; ctx.lineWidth = 4; ctx.strokeRect(4, 4, 504, 312);\n' +
'      ctx.fillStyle = "#00f3ff"; ctx.font = "bold 24px system-ui, sans-serif";\n' +
'      ctx.fillText("🛸 SPATIAL VISION OS · HUD", 24, 42);\n' +
'      const d = new Date();\n' +
'      const timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => String(v).padStart(2, "0")).join(":");\n' +
'      ctx.fillStyle = "#ffffff"; ctx.font = "bold 44px monospace";\n' +
'      ctx.fillText(timeStr, 24, 105);\n' +
'      ctx.fillStyle = "#38bdf8"; ctx.font = "18px system-ui, sans-serif";\n' +
'      ctx.fillText("Zero-Latency Webcam Tracking · 60 FPS WebGL", 24, 145);\n' +
'      const icons = ["📱 Apps", "⚡ GPU: 98%", "🥽 WebXR", "🛡️ Safe"];\n' +
'      for (let i = 0; i < icons.length; i++) {\n' +
'        ctx.fillStyle = "rgba(56,189,248,0.15)"; ctx.strokeStyle = "#38bdf8";\n' +
'        ctx.strokeRect(24 + i * 116, 180, 104, 52);\n' +
'        ctx.fillRect(24 + i * 116, 180, 104, 52);\n' +
'        ctx.fillStyle = "#fff"; ctx.font = "bold 15px system-ui, sans-serif";\n' +
'        ctx.fillText(icons[i], 36 + i * 116, 212);\n' +
'      }\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui, sans-serif";\n' +
'      ctx.fillText("Touchless Air Gestures Active · Pinch to Zoom", 24, 296);\n' +
'    }\n' +
'\n' +
'    function drawCrypto(ctx, t) {\n' +
'      const g = ctx.createLinearGradient(0, 0, 512, 320);\n' +
'      g.addColorStop(0, "#091226"); g.addColorStop(1, "#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 320);\n' +
'      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 4; ctx.strokeRect(4, 4, 504, 312);\n' +
'      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 24px system-ui, sans-serif";\n' +
'      ctx.fillText("🪙 QUANTUM CRYPTO RADAR", 24, 42);\n' +
'      ctx.fillStyle = "#10b981"; ctx.font = "bold 36px monospace";\n' +
'      ctx.fillText("BTC  $94,240  +5.4%", 24, 96);\n' +
'      ctx.fillStyle = "#cbd5e1"; ctx.font = "20px monospace";\n' +
'      ctx.fillText("ETH  $3,820   +3.8%  ·  SOL  $214", 24, 136);\n' +
'      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 3;\n' +
'      ctx.beginPath(); ctx.moveTo(24, 250);\n' +
'      const pts = [245, 230, 240, 215, 225, 195, 205, 175, 185, 160, 150];\n' +
'      for (let i = 0; i < pts.length; i++) {\n' +
'        const wave = Math.sin(t * 2.2 + i * 0.7) * 7;\n' +
'        ctx.lineTo(24 + i * 44, pts[i] + wave);\n' +
'      }\n' +
'      ctx.stroke();\n' +
'      ctx.fillStyle = "rgba(16,185,129,0.18)";\n' +
'      ctx.lineTo(24 + 10 * 44, 280); ctx.lineTo(24, 280); ctx.fill();\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui, sans-serif";\n' +
'      ctx.fillText("● REAL-TIME AIR DECK TELEMETRY", 24, 296);\n' +
'    }\n' +
'\n' +
'    function drawAudio(ctx, t) {\n' +
'      const g = ctx.createLinearGradient(0, 0, 512, 320);\n' +
'      g.addColorStop(0, "#091226"); g.addColorStop(1, "#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 320);\n' +
'      ctx.strokeStyle = "#ec4899"; ctx.lineWidth = 4; ctx.strokeRect(4, 4, 504, 312);\n' +
'      ctx.fillStyle = "#ec4899"; ctx.font = "bold 24px system-ui, sans-serif";\n' +
'      ctx.fillText("🎵 SPATIAL AUDIO EQUALIZER", 24, 42);\n' +
'      ctx.fillStyle = "#cbd5e1"; ctx.font = "18px system-ui, sans-serif";\n' +
'      ctx.fillText("Now Playing: \\"Cosmic Odyssey 60fps\\" · 128 BPM", 24, 80);\n' +
'      const barCount = 14;\n' +
'      for (let i = 0; i < barCount; i++) {\n' +
'        const wave = Math.sin(t * 3.6 + i * 0.65);\n' +
'        const wave2 = Math.cos(t * 2.1 + i * 0.4);\n' +
'        const h = Math.max(16, Math.floor(((wave + wave2 + 2) / 4) * 115 + 20));\n' +
'        const x = 24 + i * 33;\n' +
'        const y = 245 - h;\n' +
'        const bGrad = ctx.createLinearGradient(0, y, 0, 245);\n' +
'        bGrad.addColorStop(0, "#ec4899"); bGrad.addColorStop(1, "#8b5cf6");\n' +
'        ctx.fillStyle = bGrad;\n' +
'        ctx.fillRect(x, y, 24, h);\n' +
'      }\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui, sans-serif";\n' +
'      ctx.fillText("32-Bit Web Audio Engine · Spatial Binaural Sound", 24, 296);\n' +
'    }\n' +
'\n' +
'    // Initial Draw\n' +
'    drawVision(ctxVision);\n' +
'    drawCrypto(ctxCrypto, 0);\n' +
'    drawAudio(ctxAudio, 0);\n' +
'\n' +
'    // 3. Card Meshes in 3D\n' +
'    const cardDefs = [\n' +
'      { id: "vision", title: "Spatial Vision OS", tex: texVision, col: 0x00f3ff },\n' +
'      { id: "crypto", title: "Quantum Crypto Radar", tex: texCrypto, col: 0x10b981 },\n' +
'      { id: "audio", title: "Spatial Audio Equalizer", tex: texAudio, col: 0xec4899 }\n' +
'    ];\n' +
'    const cardGroups = [];\n' +
'    cardDefs.forEach((cd, idx) => {\n' +
'      const grp = new T.Group();\n' +
'      const fMesh = new T.Mesh(new T.PlaneGeometry(1.9, 1.18), new T.MeshBasicMaterial({ map: cd.tex }));\n' +
'      grp.add(fMesh);\n' +
'      const bGeo = new T.BoxGeometry(1.92, 1.2, 0.05);\n' +
'      const bMesh = new T.Mesh(bGeo, new T.MeshStandardMaterial({ color: 0x070c1e, metalness: 0.9, roughness: 0.1 }));\n' +
'      bMesh.position.z = -0.026;\n' +
'      bMesh.add(new T.LineSegments(new T.EdgesGeometry(bGeo), new T.LineBasicMaterial({ color: cd.col })));\n' +
'      grp.add(bMesh);\n' +
'      grp.userData = { id: cd.id, index: idx, title: cd.title };\n' +
'      deck.add(grp);\n' +
'      cardGroups.push(grp);\n' +
'    });\n' +
'\n' +
'    // 4. Floating Cyan Hand / Air Tracking Reticle\n' +
'    const reticleMesh = new T.Mesh(\n' +
'      new T.TorusGeometry(0.09, 0.014, 16, 32),\n' +
'      new T.MeshBasicMaterial({ color: 0x00f3ff })\n' +
'    );\n' +
'    reticleMesh.position.set(0, 0, 1.25);\n' +
'    deck.add(reticleMesh);\n' +
'\n' +
'    // 5. Layout Geometries\n' +
'    const layoutConfigs = {\n' +
'      curved: [\n' +
'        { x: -1.9, y: 0.1, z: 0.35, rotY: 0.4 },\n' +
'        { x: 0, y: 0.2, z: 0, rotY: 0 },\n' +
'        { x: 1.9, y: 0.1, z: 0.35, rotY: -0.4 }\n' +
'      ],\n' +
'      dome: [\n' +
'        { x: -1.4, y: 0.9, z: -0.3, rotY: 0.3 },\n' +
'        { x: 0, y: 0.2, z: 0, rotY: 0 },\n' +
'        { x: 1.4, y: 0.9, z: -0.3, rotY: -0.3 }\n' +
'      ],\n' +
'      matrix: [\n' +
'        { x: 0, y: 0.8, z: -0.8, rotY: 0 },\n' +
'        { x: 0, y: 0.2, z: 0, rotY: 0 },\n' +
'        { x: 0, y: -0.4, z: 0.8, rotY: 0 }\n' +
'      ]\n' +
'    };\n' +
'\n' +
'    function applyLayout(k) {\n' +
'      const cfg = layoutConfigs[k] || layoutConfigs.curved;\n' +
'      cardGroups.forEach((cg, i) => {\n' +
'        cg.position.set(cfg[i].x, cfg[i].y, cfg[i].z);\n' +
'        cg.rotation.y = cfg[i].rotY;\n' +
'      });\n' +
'    }\n' +
'    applyLayout("curved");\n' +
'\n' +
'    // Layout Buttons\n' +
'    document.querySelectorAll(".injected-xr-layout-btn").forEach((btn) => {\n' +
'      btn.addEventListener("click", () => {\n' +
'        const lay = btn.getAttribute("data-layout");\n' +
'        applyLayout(lay);\n' +
'        document.querySelectorAll(".injected-xr-layout-btn").forEach((b) => {\n' +
'          const a = (b.getAttribute("data-layout") === lay);\n' +
'          b.style.background = a ? "rgba(6,182,212,0.25)" : "transparent";\n' +
'          b.style.borderColor = a ? "#06b6d4" : "transparent";\n' +
'          b.style.color = a ? "#fff" : "#94a3b8";\n' +
'        });\n' +
'      });\n' +
'    });\n' +
'\n' +
'    // Gesture Audio Feedback (Web Audio API Synthesizer)\n' +
'    let audioCtx = null;\n' +
'    function playBlip() {\n' +
'      try {\n' +
'        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n' +
'        if (audioCtx.state === "suspended") audioCtx.resume();\n' +
'        const osc = audioCtx.createOscillator();\n' +
'        const g = audioCtx.createGain();\n' +
'        osc.type = "sine";\n' +
'        osc.frequency.setValueAtTime(880, audioCtx.currentTime);\n' +
'        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.12);\n' +
'        g.gain.setValueAtTime(0.15, audioCtx.currentTime);\n' +
'        g.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);\n' +
'        osc.connect(g); g.connect(audioCtx.destination);\n' +
'        osc.start(); osc.stop(audioCtx.currentTime + 0.13);\n' +
'      } catch(e){}\n' +
'    }\n' +
'\n' +
'    function setHUD(badge, sub) {\n' +
'      const bEl = document.getElementById("injected-xr-gesture-badge");\n' +
'      const sEl = document.getElementById("injected-xr-gesture-sub");\n' +
'      if (bEl) bEl.textContent = badge;\n' +
'      if (sEl) sEl.textContent = sub;\n' +
'    }\n' +
'\n' +
'    let targetRotY = 0;\n' +
'    function triggerAirTap(cardIdx) {\n' +
'      playBlip();\n' +
'      reticleMesh.scale.set(1.6, 1.6, 1.6);\n' +
'      setTimeout(() => reticleMesh.scale.set(1, 1, 1), 220);\n' +
'      const angles = [0.4, 0, -0.4];\n' +
'      targetRotY = angles[cardIdx] !== undefined ? angles[cardIdx] : 0;\n' +
'      const title = cardDefs[cardIdx] ? cardDefs[cardIdx].title : "Screen";\n' +
'      setHUD("👆 AIR TAP DETECTED", title + " Focused Front & Center");\n' +
'    }\n' +
'\n' +
'    // Card Switcher Buttons\n' +
'    const pBtn = document.getElementById("injected-xr-prev-btn");\n' +
'    const nBtn = document.getElementById("injected-xr-next-btn");\n' +
'    if (pBtn) pBtn.addEventListener("click", () => { targetRotY += 0.4; setHUD("👉 SPATIAL NAV", "Pivoted Deck Counter-Clockwise"); });\n' +
'    if (nBtn) nBtn.addEventListener("click", () => { targetRotY -= 0.4; setHUD("👉 SPATIAL NAV", "Pivoted Deck Clockwise"); });\n' +
'\n' +
'    // Mouse & Touch 360° Interaction\n' +
'    let isDown = false, isDragging = false, px = 0, py = 0;\n' +
'    container.addEventListener("mousedown", (e) => {\n' +
'      isDown = true; isDragging = false;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'      container.style.cursor = "grabbing";\n' +
'    });\n' +
'    window.addEventListener("mousemove", (e) => {\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      if (rect.width > 0 && rect.height > 0) {\n' +
'        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 3.5;\n' +
'        const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 2.5;\n' +
'        reticleMesh.position.x = nx;\n' +
'        reticleMesh.position.y = ny;\n' +
'      }\n' +
'      if (!isDown) return;\n' +
'      const dx = e.clientX - px, dy = e.clientY - py;\n' +
'      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDragging = true;\n' +
'      deck.rotation.y += dx * 0.008;\n' +
'      deck.rotation.x += dy * 0.005;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'      setHUD("👌 PINCH & ROTATE", "3D Spatial Deck Latched to Pointer");\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => {\n' +
'      isDown = false;\n' +
'      container.style.cursor = "grab";\n' +
'    });\n' +
'\n' +
'    // Click Raycasting -> Air-Tap Selection\n' +
'    container.addEventListener("click", (e) => {\n' +
'      if (isDragging) return;\n' +
'      const rect = container.getBoundingClientRect();\n' +
'      const mouse = new T.Vector2(\n' +
'        ((e.clientX - rect.left) / rect.width) * 2 - 1,\n' +
'        -((e.clientY - rect.top) / rect.height) * 2 + 1\n' +
'      );\n' +
'      const raycaster = new T.Raycaster();\n' +
'      raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(cardGroups, true);\n' +
'      if (hits.length > 0) {\n' +
'        let p = hits[0].object;\n' +
'        while (p && p.parent !== deck && p.parent !== scene) p = p.parent;\n' +
'        if (p && p.userData && p.userData.index !== undefined) {\n' +
'          triggerAirTap(p.userData.index);\n' +
'        }\n' +
'      }\n' +
'    });\n' +
'\n' +
'    // Wheel Zoom\n' +
'    container.addEventListener("wheel", (e) => {\n' +
'      e.preventDefault();\n' +
'      camera.position.z += e.deltaY * 0.005;\n' +
'      camera.position.z = Math.max(3.0, Math.min(8.0, camera.position.z));\n' +
'    }, { passive: false });\n' +
'\n' +
'    // Optical Webcam Hand Tracker\n' +
'    let isCamActive = false, camStream = null, camAnimId = null;\n' +
'    let offCvs = null, offCtx = null, prevData = null, lastGest = 0;\n' +
'    const camBtn = document.getElementById("injected-xr-cam-btn");\n' +
'    const camCard = document.getElementById("injected-xr-cam-card");\n' +
'    const camVid = document.getElementById("injected-xr-video");\n' +
'\n' +
'    if (camBtn) {\n' +
'      camBtn.addEventListener("click", () => {\n' +
'        if (isCamActive) {\n' +
'          isCamActive = false;\n' +
'          if (camAnimId) { cancelAnimationFrame(camAnimId); camAnimId = null; }\n' +
'          if (camStream) { camStream.getTracks().forEach(t => t.stop()); camStream = null; }\n' +
'          if (camCard) camCard.style.display = "none";\n' +
'          camBtn.style.background = "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.2))";\n' +
'          camBtn.style.borderColor = "rgba(16,185,129,0.6)";\n' +
'          camBtn.style.color = "#34d399";\n' +
'          camBtn.innerHTML = "📷 Hand Tracking";\n' +
'          setHUD("🖐️ AIR RETICLE ACTIVE", "Aim with cursor · Click to Air-Tap");\n' +
'        } else {\n' +
'          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {\n' +
'            alert("Camera not supported in browser.");\n' +
'            return;\n' +
'          }\n' +
'          navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: "user" } })\n' +
'            .then((stream) => {\n' +
'              camStream = stream;\n' +
'              isCamActive = true;\n' +
'              if (camVid) { camVid.srcObject = stream; try { camVid.play(); } catch(e){} }\n' +
'              if (camCard) camCard.style.display = "block";\n' +
'              camBtn.style.background = "rgba(239,68,68,0.25)";\n' +
'              camBtn.style.borderColor = "#ef4444";\n' +
'              camBtn.style.color = "#f87171";\n' +
'              camBtn.innerHTML = "🛑 Stop Camera";\n' +
'              setHUD("📷 OPTICAL TRACKING ACTIVE", "Wave hand in front of webcam");\n' +
'\n' +
'              if (!offCvs) {\n' +
'                offCvs = document.createElement("canvas");\n' +
'                offCvs.width = 64; offCvs.height = 48;\n' +
'                offCtx = offCvs.getContext("2d", { willReadFrequently: true });\n' +
'              }\n' +
'              prevData = null;\n' +
'\n' +
'              function track() {\n' +
'                if (!isCamActive) return;\n' +
'                camAnimId = requestAnimationFrame(track);\n' +
'                if (camVid && camVid.readyState >= 2 && camVid.videoWidth > 0 && offCtx) {\n' +
'                  try {\n' +
'                    offCtx.drawImage(camVid, 0, 0, 64, 48);\n' +
'                    const curr = offCtx.getImageData(0, 0, 64, 48).data;\n' +
'                    if (prevData) {\n' +
'                      let motion = 0, sumX = 0, sumY = 0;\n' +
'                      for (let i = 0; i < curr.length; i += 4) {\n' +
'                        const diff = Math.abs(curr[i] - prevData[i]) + Math.abs(curr[i+1] - prevData[i+1]) + Math.abs(curr[i+2] - prevData[i+2]);\n' +
'                        if (diff > 45) {\n' +
'                          const p = i / 4;\n' +
'                          sumX += p % 64;\n' +
'                          sumY += Math.floor(p / 64);\n' +
'                          motion++;\n' +
'                        }\n' +
'                      }\n' +
'                      if (motion > 16) {\n' +
'                        const normX = 1 - (sumX / motion) / 64;\n' +
'                        const normY = (sumY / motion) / 48;\n' +
'                        const tx = (normX - 0.5) * 4.2;\n' +
'                        const ty = -(normY - 0.5) * 3.0;\n' +
'                        reticleMesh.position.x += (tx - reticleMesh.position.x) * 0.3;\n' +
'                        reticleMesh.position.y += (ty - reticleMesh.position.y) * 0.3;\n' +
'                        deck.rotation.y += (normX - 0.5) * 0.05;\n' +
'                        deck.rotation.x += (normY - 0.5) * 0.03;\n' +
'\n' +
'                        const now = Date.now();\n' +
'                        if (now - lastGest > 750) {\n' +
'                          if (motion > 380) {\n' +
'                            setHUD("✋ OPEN PALM ZERO-G", "Deck Levitation Active");\n' +
'                            lastGest = now;\n' +
'                          } else if (motion > 220) {\n' +
'                            setHUD("👉 SPATIAL SWIPE", "Translocating Workspace");\n' +
'                            targetRotY += (normX > 0.5 ? 0.4 : -0.4);\n' +
'                            lastGest = now;\n' +
'                          } else if (motion > 85) {\n' +
'                            triggerAirTap(1);\n' +
'                            lastGest = now;\n' +
'                          } else {\n' +
'                            setHUD("👌 PINCH & ROTATE", "Latched to Hand Motion");\n' +
'                            lastGest = now;\n' +
'                          }\n' +
'                        }\n' +
'                      }\n' +
'                    }\n' +
'                    prevData = new Uint8ClampedArray(curr);\n' +
'                  } catch(e){}\n' +
'                }\n' +
'              }\n' +
'              camAnimId = requestAnimationFrame(track);\n' +
'            })\n' +
'            .catch((err) => alert("Camera error: " + err.message));\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // Responsive Viewport Resize\n' +
'    window.addEventListener("resize", () => {\n' +
'      const w = container.clientWidth || 640, h = 440;\n' +
'      camera.aspect = w / h; camera.updateProjectionMatrix();\n' +
'      renderer.setSize(w, h);\n' +
'    });\n' +
'\n' +
'    // 60 FPS Render Loop: Animate Clock, Equalizer & Undulating Chart\n' +
'    let animTime = 0, lastSec = -1;\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      animTime += 0.016;\n' +
'\n' +
'      const curSec = Math.floor(animTime * 2);\n' +
'      if (curSec !== lastSec) {\n' +
'        lastSec = curSec;\n' +
'        drawVision(ctxVision);\n' +
'        texVision.needsUpdate = true;\n' +
'      }\n' +
'      drawCrypto(ctxCrypto, animTime);\n' +
'      texCrypto.needsUpdate = true;\n' +
'      drawAudio(ctxAudio, animTime);\n' +
'      texAudio.needsUpdate = true;\n' +
'\n' +
'      if (!isDown) {\n' +
'        deck.rotation.y += (targetRotY - deck.rotation.y) * 0.08;\n' +
'        deck.position.y = Math.sin(animTime * 1.5) * 0.08;\n' +
'      }\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'  });\n' +
'})();\n' +
'<' + '/script>';

      _injectCodeToActiveApp(snippet, /<!-- ═══════════════════════════════════════════════════════════════[\s\S]*?<!-- ULTRA SPATIAL XR & (?:AIR-GESTURE|TOUCHLESS)[\s\S]*?<\/script>/g, 'Spatial XR Deck');
    },

    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Spatial XR Hologram')) return;
      _sound('download');
      const colCss = this.themeColors[this.currentTheme].css;
      const themeHex = this.themeColors[this.currentTheme].hex;

      const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Spatial XR Hologram Air Deck</title>\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><' + '/script>\n' +
'  <style>\n' +
'    * { margin:0; padding:0; box-sizing:border-box; }\n' +
'    body { background:#03050c; color:#fff; font-family:system-ui,-apple-system,sans-serif; overflow:hidden; width:100vw; height:100vh; display:flex; flex-direction:column; }\n' +
'    #canvas-container { flex:1; width:100%; height:100%; position:relative; cursor:grab; }\n' +
'    .hud-bar { position:absolute; top:16px; left:16px; right:16px; display:flex; justify-content:space-between; align-items:center; z-index:20; pointer-events:none; flex-wrap:wrap; gap:10px; }\n' +
'    .hud-card { background:rgba(15,23,42,0.88); backdrop-filter:blur(14px); border:1px solid rgba(6,182,212,0.4); border-radius:14px; padding:10px 18px; pointer-events:auto; display:flex; align-items:center; gap:12px; box-shadow:0 8px 24px rgba(0,0,0,0.6); }\n' +
'    .hud-btn { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); color:#fff; padding:6px 14px; border-radius:10px; font-size:0.75rem; cursor:pointer; font-weight:700; transition:all 0.2s; }\n' +
'    .hud-btn:hover { background:rgba(6,182,212,0.25); border-color:#06b6d4; color:#06b6d4; }\n' +
'    .hud-btn.active { background:rgba(6,182,212,0.3); border-color:#06b6d4; color:#06b6d4; }\n' +
'    #cam-card { display:none; position:absolute; top:80px; left:16px; width:160px; background:rgba(15,23,42,0.92); backdrop-filter:blur(12px); border:1px solid rgba(16,185,129,0.5); border-radius:12px; padding:8px; z-index:30; box-shadow:0 8px 24px rgba(0,0,0,0.6); }\n' +
'    #gesture-badge { position:absolute; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.9); backdrop-filter:blur(12px); border:1px solid rgba(56,189,248,0.4); border-radius:24px; padding:8px 20px; font-size:0.78rem; font-weight:700; color:#38bdf8; pointer-events:none; z-index:20; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="hud-bar">\n' +
'    <div class="hud-card">\n' +
'      <span style="font-size:1.4rem">🕶️</span>\n' +
'      <div>\n' +
'        <div style="font-weight:900;font-size:0.95rem;background:linear-gradient(135deg,' + colCss + ',#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Spatial XR Hologram Air Deck</div>\n' +
'        <div style="font-size:0.72rem;color:#94a3b8">Touchless Air Gestures &amp; Optical Motion Tracking</div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="hud-card">\n' +
'      <button class="hud-btn" id="btn-cam" onclick="toggleCamera()">📷 Hand Tracking</button>\n' +
'      <button class="hud-btn" onclick="triggerPinch()">👌 Simulate Pinch</button>\n' +
'      <button class="hud-btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div id="cam-card">\n' +
'    <div style="font-size:0.6rem;color:#34d399;font-weight:800;margin-bottom:4px">OPTICAL TRACKER LIVE</div>\n' +
'    <video id="webcam-vid" playsinline autoplay muted style="width:100%;height:90px;object-fit:cover;border-radius:6px;background:#000;display:block"></video>\n' +
'    <div style="font-size:0.6rem;color:#94a3b8;margin-top:4px;text-align:center">Wave hand to steer</div>\n' +
'  </div>\n' +
'  <div id="gesture-badge">🖐️ AIR RETICLE ACTIVE · Hover to Aim · Click to Air-Tap</div>\n' +
'  <div id="canvas-container"></div>\n' +
'  <script>\n' +
'    const container = document.getElementById("canvas-container");\n' +
'    const scene = new THREE.Scene();\n' +
'    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);\n' +
'    camera.position.set(0, 0.7, 4.8);\n' +
'    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\n' +
'    renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n' +
'    container.appendChild(renderer.domElement);\n' +
'    scene.add(new THREE.AmbientLight(0xffffff, 0.9));\n' +
'    const pL = new THREE.PointLight(' + themeHex + ', 3.5, 14);\n' +
'    pL.position.set(2, 3, 4); scene.add(pL);\n' +
'    const deck = new THREE.Group(); scene.add(deck);\n' +
'    const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0x050a18, metalness: 0.9 }));\n' +
'    baseMesh.position.set(0, -1.3, 0); deck.add(baseMesh);\n' +
'    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.025, 16, 64), new THREE.MeshBasicMaterial({ color: ' + themeHex + ' }));\n' +
'    baseRing.rotation.x = Math.PI / 2; baseRing.position.set(0, -1.25, 0); deck.add(baseRing);\n' +
'\n' +
'    const cvsVision = document.createElement("canvas"); cvsVision.width = 512; cvsVision.height = 320;\n' +
'    const ctxVision = cvsVision.getContext("2d"); const texVision = new THREE.CanvasTexture(cvsVision);\n' +
'    const cvsCrypto = document.createElement("canvas"); cvsCrypto.width = 512; cvsCrypto.height = 320;\n' +
'    const ctxCrypto = cvsCrypto.getContext("2d"); const texCrypto = new THREE.CanvasTexture(cvsCrypto);\n' +
'    const cvsAudio = document.createElement("canvas"); cvsAudio.width = 512; cvsAudio.height = 320;\n' +
'    const ctxAudio = cvsAudio.getContext("2d"); const texAudio = new THREE.CanvasTexture(cvsAudio);\n' +
'\n' +
'    function drawVision(ctx) {\n' +
'      const g = ctx.createLinearGradient(0,0,512,320); g.addColorStop(0,"#091226"); g.addColorStop(1,"#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0,0,512,320);\n' +
'      ctx.strokeStyle = "#00f3ff"; ctx.lineWidth = 4; ctx.strokeRect(4,4,504,312);\n' +
'      ctx.fillStyle = "#00f3ff"; ctx.font = "bold 24px system-ui"; ctx.fillText("🛸 SPATIAL VISION OS · HUD", 24, 42);\n' +
'      const d = new Date(); const tStr = [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => String(v).padStart(2,"0")).join(":");\n' +
'      ctx.fillStyle = "#fff"; ctx.font = "bold 44px monospace"; ctx.fillText(tStr, 24, 105);\n' +
'      ctx.fillStyle = "#38bdf8"; ctx.font = "18px system-ui"; ctx.fillText("Zero-Latency Webcam Tracking · 60 FPS WebGL", 24, 145);\n' +
'      const icons = ["📱 Apps", "⚡ GPU: 98%", "🥽 WebXR", "🛡️ Safe"];\n' +
'      for (let i=0; i<icons.length; i++) {\n' +
'        ctx.fillStyle = "rgba(56,189,248,0.15)"; ctx.strokeStyle = "#38bdf8";\n' +
'        ctx.strokeRect(24 + i*116, 180, 104, 52); ctx.fillRect(24 + i*116, 180, 104, 52);\n' +
'        ctx.fillStyle = "#fff"; ctx.font = "bold 15px system-ui"; ctx.fillText(icons[i], 36 + i*116, 212);\n' +
'      }\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui"; ctx.fillText("Touchless Air Gestures Active · Pinch to Zoom", 24, 296);\n' +
'    }\n' +
'    function drawCrypto(ctx, t) {\n' +
'      const g = ctx.createLinearGradient(0,0,512,320); g.addColorStop(0,"#091226"); g.addColorStop(1,"#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0,0,512,320);\n' +
'      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 4; ctx.strokeRect(4,4,504,312);\n' +
'      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 24px system-ui"; ctx.fillText("🪙 QUANTUM CRYPTO RADAR", 24, 42);\n' +
'      ctx.fillStyle = "#10b981"; ctx.font = "bold 36px monospace"; ctx.fillText("BTC  $94,240  +5.4%", 24, 96);\n' +
'      ctx.fillStyle = "#cbd5e1"; ctx.font = "20px monospace"; ctx.fillText("ETH  $3,820   +3.8%  ·  SOL  $214", 24, 136);\n' +
'      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(24, 250);\n' +
'      const pts = [245, 230, 240, 215, 225, 195, 205, 175, 185, 160, 150];\n' +
'      for (let i=0; i<pts.length; i++) ctx.lineTo(24 + i*44, pts[i] + Math.sin(t*2.2 + i*0.7)*7);\n' +
'      ctx.stroke(); ctx.fillStyle = "rgba(16,185,129,0.18)"; ctx.lineTo(24 + 10*44, 280); ctx.lineTo(24, 280); ctx.fill();\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui"; ctx.fillText("● REAL-TIME AIR DECK TELEMETRY", 24, 296);\n' +
'    }\n' +
'    function drawAudio(ctx, t) {\n' +
'      const g = ctx.createLinearGradient(0,0,512,320); g.addColorStop(0,"#091226"); g.addColorStop(1,"#030611");\n' +
'      ctx.fillStyle = g; ctx.fillRect(0,0,512,320);\n' +
'      ctx.strokeStyle = "#ec4899"; ctx.lineWidth = 4; ctx.strokeRect(4,4,504,312);\n' +
'      ctx.fillStyle = "#ec4899"; ctx.font = "bold 24px system-ui"; ctx.fillText("🎵 SPATIAL AUDIO EQUALIZER", 24, 42);\n' +
'      ctx.fillStyle = "#cbd5e1"; ctx.font = "18px system-ui"; ctx.fillText("Now Playing: \\"Cosmic Odyssey 60fps\\" · 128 BPM", 24, 80);\n' +
'      for (let i=0; i<14; i++) {\n' +
'        const h = Math.max(16, Math.floor(((Math.sin(t*3.6+i*0.65)+Math.cos(t*2.1+i*0.4)+2)/4)*115+20));\n' +
'        const bGrad = ctx.createLinearGradient(0, 245-h, 0, 245); bGrad.addColorStop(0, "#ec4899"); bGrad.addColorStop(1, "#8b5cf6");\n' +
'        ctx.fillStyle = bGrad; ctx.fillRect(24 + i*33, 245-h, 24, h);\n' +
'      }\n' +
'      ctx.fillStyle = "#94a3b8"; ctx.font = "16px system-ui"; ctx.fillText("32-Bit Web Audio Engine · Spatial Binaural Sound", 24, 296);\n' +
'    }\n' +
'\n' +
'    const cardDefs = [\n' +
'      { id: "vision", title: "Spatial Vision OS", tex: texVision, col: 0x00f3ff, x: -1.9, rotY: 0.4 },\n' +
'      { id: "crypto", title: "Quantum Crypto Radar", tex: texCrypto, col: 0x10b981, x: 0, rotY: 0 },\n' +
'      { id: "audio", title: "Spatial Audio Equalizer", tex: texAudio, col: 0xec4899, x: 1.9, rotY: -0.4 }\n' +
'    ];\n' +
'    const cardGroups = [];\n' +
'    cardDefs.forEach((cd, idx) => {\n' +
'      const grp = new THREE.Group(); grp.position.set(cd.x, 0.15, cd.rotY !== 0 ? 0.35 : 0); grp.rotation.y = cd.rotY;\n' +
'      grp.add(new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.18), new THREE.MeshBasicMaterial({ map: cd.tex })));\n' +
'      const bGeo = new THREE.BoxGeometry(1.92, 1.2, 0.05);\n' +
'      const bMesh = new THREE.Mesh(bGeo, new THREE.MeshStandardMaterial({ color: 0x070c1e })); bMesh.position.z = -0.026;\n' +
'      bMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(bGeo), new THREE.LineBasicMaterial({ color: cd.col })));\n' +
'      grp.add(bMesh); grp.userData = { id: cd.id, index: idx, title: cd.title };\n' +
'      deck.add(grp); cardGroups.push(grp);\n' +
'    });\n' +
'\n' +
'    const reticle = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.014, 16, 32), new THREE.MeshBasicMaterial({ color: 0x00f3ff }));\n' +
'    reticle.position.set(0, 0, 1.25); deck.add(reticle);\n' +
'\n' +
'    let isD = false, px = 0, py = 0, targetRotY = 0;\n' +
'    container.addEventListener("mousedown", e => { isD = true; px = e.clientX; py = e.clientY; });\n' +
'    window.addEventListener("mousemove", e => {\n' +
'      const nx = (e.clientX / window.innerWidth - 0.5) * 4.0;\n' +
'      const ny = -(e.clientY / window.innerHeight - 0.5) * 3.0;\n' +
'      reticle.position.x = nx; reticle.position.y = ny;\n' +
'      if (!isD) return;\n' +
'      deck.rotation.y += (e.clientX - px) * 0.008; deck.rotation.x += (e.clientY - py) * 0.005;\n' +
'      px = e.clientX; py = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("mouseup", () => isD = false);\n' +
'\n' +
'    container.addEventListener("click", e => {\n' +
'      const mouse = new THREE.Vector2((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1);\n' +
'      const raycaster = new THREE.Raycaster(); raycaster.setFromCamera(mouse, camera);\n' +
'      const hits = raycaster.intersectObjects(cardGroups, true);\n' +
'      if (hits.length > 0) {\n' +
'        let p = hits[0].object;\n' +
'        while (p && p.parent !== deck && p.parent !== scene) p = p.parent;\n' +
'        if (p && p.userData && p.userData.index !== undefined) {\n' +
'          targetRotY = [0.4, 0, -0.4][p.userData.index];\n' +
'          reticle.scale.set(1.6, 1.6, 1.6); setTimeout(() => reticle.scale.set(1, 1, 1), 200);\n' +
'          document.getElementById("gesture-badge").textContent = "👆 AIR TAP: " + p.userData.title + " Focused";\n' +
'        }\n' +
'      }\n' +
'    });\n' +
'\n' +
'    window.triggerPinch = () => {\n' +
'      targetRotY += 0.8;\n' +
'      document.getElementById("gesture-badge").textContent = "👌 PINCH & ROTATE Triggered";\n' +
'    };\n' +
'    window.toggleFullscreen = () => {\n' +
'      if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen();\n' +
'    };\n' +
'    window.addEventListener("resize", () => {\n' +
'      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();\n' +
'      renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    });\n' +
'\n' +
'    let isCam = false, camStream = null;\n' +
'    window.toggleCamera = () => {\n' +
'      const btn = document.getElementById("btn-cam");\n' +
'      const card = document.getElementById("cam-card");\n' +
'      const vid = document.getElementById("webcam-vid");\n' +
'      if (isCam) {\n' +
'        isCam = false; if (camStream) camStream.getTracks().forEach(t => t.stop());\n' +
'        card.style.display = "none"; btn.textContent = "📷 Hand Tracking"; btn.classList.remove("active");\n' +
'      } else {\n' +
'        navigator.mediaDevices.getUserMedia({ video: true }).then(s => {\n' +
'          camStream = s; isCam = true; vid.srcObject = s; card.style.display = "block";\n' +
'          btn.textContent = "🛑 Stop Camera"; btn.classList.add("active");\n' +
'          document.getElementById("gesture-badge").textContent = "📷 OPTICAL WEBCAM ACTIVE · Wave Hand in Front of Camera";\n' +
'        }).catch(err => alert("Camera denied: " + err.message));\n' +
'      }\n' +
'    };\n' +
'\n' +
'    let animTime = 0, lastSec = -1;\n' +
'    function loop() {\n' +
'      requestAnimationFrame(loop);\n' +
'      animTime += 0.016;\n' +
'      if (Math.floor(animTime * 2) !== lastSec) { lastSec = Math.floor(animTime * 2); drawVision(ctxVision); texVision.needsUpdate = true; }\n' +
'      drawCrypto(ctxCrypto, animTime); texCrypto.needsUpdate = true;\n' +
'      drawAudio(ctxAudio, animTime); texAudio.needsUpdate = true;\n' +
'      if (!isD) { deck.rotation.y += (targetRotY - deck.rotation.y) * 0.08; deck.position.y = Math.sin(animTime * 1.5) * 0.08; }\n' +
'      renderer.render(scene, camera);\n' +
'    }\n' +
'    loop();\n' +
'  <' + '/script>\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ultra-spatial-xr-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _toast(_isFr() ? '💾 Export HTML Spatial XR téléchargé !' : '💾 Standalone Spatial XR HTML exported!', 'success');
    }
  };

  if (typeof window !== 'undefined') {
    window.UltraSpatialXRStudio = UltraSpatialXRStudio;
  }
})();
