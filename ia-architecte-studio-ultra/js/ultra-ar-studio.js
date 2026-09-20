// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — AR DEVICE HOLOGRAM & IN-ROOM SPATIAL SHOWCASE (v1.0)
// UltraARStudio (modal-ar-studio)
// 100% Client-Side Three.js WebGL Holograms · Real-World Camera In-Room AR Feed
// Zero-G Levitation Physics · 360° Orbit Controls · 4K Mockup Snapshot · 1-Click Injection
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
      console.log('[UltraARStudio]', msg);
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

  function _drawRoundRect(ctx, x, y, w, h, r) {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CORE AR & THREE.JS ENGINE
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraARStudio = {
    isOpen: false,
    currentDevice: 'phone', // phone | tablet | curved_display
    currentTheme: 'cyan',   // cyan | purple | emerald | gold
    isArMode: false,
    cameraFacing: 'environment', // environment | user
    videoStream: null,

    // Three.js State
    renderer: null,
    scene: null,
    camera: null,
    deviceGroup: null,
    screenMesh: null,
    screenCanvas: null,
    screenCtx: null,
    screenTexture: null,
    stardustPoints: null,
    scanlineMesh: null,
    animId: null,

    // Interaction & Orbit
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationVel: { x: 0, y: 0 },
    targetRotation: { x: 0.15, y: -0.35 },
    currentRotation: { x: 0.15, y: -0.35 },
    cameraDistance: 6.5,
    autoRotate: true,
    time: 0,

    open() {
      const modal = document.getElementById('modal-ar-studio');
      if (!modal) return;
      modal.classList.add('show', 'active');
      this.isOpen = true;
      _sound('open');

      setTimeout(() => {
        this.initThree();
        this.initScreenCanvas();
        this.buildDevice(this.currentDevice);
        this.startLoop();
      }, 50);

      _toast(_isFr() ? '🪞 Studio Hologramme 3D & AR Spatial activé !' : '🪞 3D Device Hologram & Spatial AR activated!', 'info');
    },

    close() {
      const modal = document.getElementById('modal-ar-studio');
      if (modal) modal.classList.remove('show', 'active');
      this.isOpen = false;
      this.stopLoop();
      this.stopCamera();
      _sound('close');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // THREE.JS SCENE INITIALIZATION
    // ══════════════════════════════════════════════════════════════════════════
    initThree() {
      const container = document.getElementById('ar-viewport-container');
      const canvas = document.getElementById('ar-canvas');
      if (!container || !canvas) return;

      if (typeof THREE === 'undefined') {
        _toast('Three.js library not detected. Loading...', 'warning');
        return;
      }

      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width || container.clientWidth || 800);
      const h = Math.floor(rect.height || container.clientHeight || 440);

      if (!this.renderer) {
        this.renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer.setSize(w, h);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.25;

        this.setupOrbitEvents(canvas);
      } else {
        this.renderer.setSize(w, h);
      }

      this.scene = new THREE.Scene();

      // Perspective Camera
      this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      this.camera.position.set(0, 0, this.cameraDistance);

      // Lights Setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      this.scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
      mainLight.position.set(5, 8, 6);
      this.scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
      fillLight.position.set(-6, -4, -3);
      this.scene.add(fillLight);

      const rimLight = new THREE.PointLight(0x00f3ff, 2.2, 20);
      rimLight.position.set(0, 4, 3);
      this.scene.add(rimLight);
      this.rimLight = rimLight;

      // Quantum Floating Stardust
      this.buildStardust();

      // Main Device Root Group
      this.deviceGroup = new THREE.Group();
      this.scene.add(this.deviceGroup);

      window.addEventListener('resize', () => this.onResize());
    },

    onResize() {
      const container = document.getElementById('ar-viewport-container');
      if (!container || !this.renderer || !this.camera) return;
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width || container.clientWidth || 800);
      const h = Math.floor(rect.height || container.clientHeight || 440);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    },

    buildStardust() {
      if (this.stardustPoints) {
        this.scene.remove(this.stardustPoints);
      }
      const count = 280;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

        col[i * 3]     = 0.2 + Math.random() * 0.4;
        col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        col[i * 3 + 2] = 1.0;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      this.stardustPoints = new THREE.Points(geo, mat);
      this.scene.add(this.stardustPoints);
    },

    // ══════════════════════════════════════════════════════════════════════════
    // DEVICE 3D MODEL BUILDER
    // ══════════════════════════════════════════════════════════════════════════
    buildDevice(type) {
      if (!this.deviceGroup) return;

      // Clear existing children
      while (this.deviceGroup.children.length > 0) {
        const obj = this.deviceGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        this.deviceGroup.remove(obj);
      }

      this.currentDevice = type;

      if (type === 'phone') {
        this._buildCyberPhone();
      } else if (type === 'tablet') {
        this._buildHoloSlate();
      } else if (type === 'curved_display') {
        this._buildCurvedDisplay();
      }

      // Update screen texture
      this.renderScreenTexture();
      _sound('laser');
    },

    _buildCyberPhone() {
      const w = 2.1;
      const h = 4.3;
      const d = 0.16;

      // Titanium Chassis
      const chassisGeo = new THREE.BoxGeometry(w, h, d);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x181e2b,
        metalness: 0.88,
        roughness: 0.2,
      });
      const chassis = new THREE.Mesh(chassisGeo, chassisMat);
      this.deviceGroup.add(chassis);

      // Bezel Edge Accent
      const edgeGeo = new THREE.EdgesGeometry(chassisGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.85 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      this.deviceGroup.add(edges);

      // Front Display Screen
      const screenGeo = new THREE.PlaneGeometry(w * 0.94, h * 0.94);
      const screenMat = new THREE.MeshBasicMaterial({
        map: this.screenTexture,
        side: THREE.FrontSide
      });
      this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
      this.screenMesh.position.z = d / 2 + 0.005;
      this.deviceGroup.add(this.screenMesh);

      // Back Camera Island
      const camGeo = new THREE.BoxGeometry(0.7, 1.2, 0.08);
      const camMat = new THREE.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 });
      const camIsland = new THREE.Mesh(camGeo, camMat);
      camIsland.position.set(-0.55, 1.3, -d / 2 - 0.04);
      this.deviceGroup.add(camIsland);

      // Twin Camera Lenses
      const lensGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x002244, metalness: 0.9, roughness: 0.1 });
      const lens1 = new THREE.Mesh(lensGeo, lensMat);
      lens1.position.set(-0.55, 1.55, -d / 2 - 0.09);
      const lens2 = new THREE.Mesh(lensGeo, lensMat);
      lens2.position.set(-0.55, 1.05, -d / 2 - 0.09);
      this.deviceGroup.add(lens1);
      this.deviceGroup.add(lens2);

      // Holographic Laser Scanline Plane
      const scanGeo = new THREE.PlaneGeometry(w * 0.94, 0.06);
      const scanMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      this.scanlineMesh = new THREE.Mesh(scanGeo, scanMat);
      this.scanlineMesh.position.z = d / 2 + 0.01;
      this.deviceGroup.add(this.scanlineMesh);

      this.cameraDistance = 6.8;
    },

    _buildHoloSlate() {
      const w = 4.4;
      const h = 3.1;
      const d = 0.08;

      // Translucent Glass Slab
      const slateGeo = new THREE.BoxGeometry(w, h, d);
      const slateMat = new THREE.MeshPhysicalMaterial({
        color: 0x111c2e,
        metalness: 0.15,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
        transmission: 0.5,
        clearcoat: 1.0
      });
      const slate = new THREE.Mesh(slateGeo, slateMat);
      this.deviceGroup.add(slate);

      // Glowing Neon Rim
      const edgeGeo = new THREE.EdgesGeometry(slateGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.9 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      this.deviceGroup.add(edges);

      // Front Slate Screen
      const screenGeo = new THREE.PlaneGeometry(w * 0.96, h * 0.95);
      const screenMat = new THREE.MeshBasicMaterial({
        map: this.screenTexture,
        side: THREE.DoubleSide
      });
      this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
      this.screenMesh.position.z = d / 2 + 0.005;
      this.deviceGroup.add(this.screenMesh);

      this.cameraDistance = 6.2;
    },

    _buildCurvedDisplay() {
      // Curved cylinder section representing a panoramic gaming / desktop monitor
      const radius = 4.0;
      const thetaLength = Math.PI * 0.38; // ~68 degree curve
      const height = 2.4;
      const segments = 36;

      const curveGeo = new THREE.CylinderGeometry(radius, radius, height, segments, 1, true, -thetaLength / 2, thetaLength);
      // Invert geometry so inside of curve faces camera
      curveGeo.scale(-1, 1, 1);

      const screenMat = new THREE.MeshBasicMaterial({
        map: this.screenTexture,
        side: THREE.DoubleSide
      });
      this.screenMesh = new THREE.Mesh(curveGeo, screenMat);
      this.screenMesh.position.z = radius - 1.2;
      this.deviceGroup.add(this.screenMesh);

      // Curved Edge Trim
      const edgeGeo = new THREE.EdgesGeometry(curveGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.z = radius - 1.2;
      this.deviceGroup.add(edges);

      this.cameraDistance = 5.2;
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LIVE SCREEN TEXTURE GENERATOR
    // ══════════════════════════════════════════════════════════════════════════
    initScreenCanvas() {
      if (!this.screenCanvas) {
        this.screenCanvas = document.createElement('canvas');
        this.screenCanvas.width = 1024;
        this.screenCanvas.height = 1024;
        this.screenCtx = this.screenCanvas.getContext('2d');
        this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
        this.screenTexture.minFilter = THREE.LinearFilter;
        this.screenTexture.magFilter = THREE.LinearFilter;
      }
    },

    renderScreenTexture() {
      if (!this.screenCtx || !this.screenCanvas) return;
      const ctx = this.screenCtx;
      const w = this.screenCanvas.width;
      const h = this.screenCanvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#090d1a');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#05070d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Top Status Bar (Time, Wifi, Battery)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, w, 56);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText('9:41', 40, 36);

      ctx.textAlign = 'right';
      ctx.fillText('5G  100% 🔋', w - 40, 36);
      ctx.textAlign = 'left';

      // Live App Header
      const targetApp = (typeof window !== 'undefined' && window.APP) || (typeof APP !== 'undefined' ? APP : null);
      let appTitle = 'IA Architecte Studio ULTRA';
      if (targetApp && targetApp.name) {
        appTitle = targetApp.name;
      }

      ctx.fillStyle = '#00f3ff';
      ctx.font = 'bold 36px system-ui, sans-serif';
      ctx.fillText(appTitle, 40, 120);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px system-ui, sans-serif';
      ctx.fillText('Autonomous AI Architecture & Spatial AR Interactive Display', 40, 160);

      // Hero Interactive Card
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      _drawRoundRect(ctx, 40, 195, w - 80, 260, 24);
      ctx.fill();
      ctx.stroke();

      // Card Metric Highlights
      ctx.fillStyle = '#a855f7';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText('⚡ REAL-TIME SPATIAL TELEMETRY', 70, 240);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px system-ui, sans-serif';
      ctx.fillText('99.98% Conversion', 70, 310);

      ctx.fillStyle = '#10b981';
      ctx.font = '22px system-ui, sans-serif';
      ctx.fillText('▲ +42.6% vs Classical 2D Web Layouts', 70, 350);

      // Simulated CTA Button
      const btnX = 70;
      const btnY = 380;
      const btnW = 280;
      const btnH = 50;
      const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY);
      btnGrad.addColorStop(0, '#00f3ff');
      btnGrad.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = btnGrad;
      ctx.beginPath();
      _drawRoundRect(ctx, btnX, btnY, btnW, btnH, 14);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText('🚀 LAUNCH EXPERIENCE', btnX + 28, btnY + 32);

      // Grid of 4 Interactive App Widgets
      const gridY = 485;
      const cardW = (w - 110) / 2;
      const cardH = 190;

      const widgets = [
        { title: 'Neural Core v4', sub: '98.4ms Latency · Active', col: '#00f3ff' },
        { title: 'Hyper 3D Engine', sub: '60fps WebGL Pipeline', col: '#a855f7' },
        { title: 'Spatial Audio Lab', sub: '12 Dynamic Procedural SFX', col: '#10b981' },
        { title: 'Multiverse Sync', sub: '4 Parallel Realities Live', col: '#f59e0b' }
      ];

      for (let i = 0; i < 4; i++) {
        const wx = 40 + (i % 2) * (cardW + 30);
        const wy = gridY + Math.floor(i / 2) * (cardH + 25);
        const item = widgets[i];

        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = item.col + '55';
        ctx.beginPath();
        _drawRoundRect(ctx, wx, wy, cardW, cardH, 18);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = item.col;
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.fillText(item.title, wx + 24, wy + 55);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillText(item.sub, wx + 24, wy + 95);

        // Mini status bar inside widget
        ctx.fillStyle = item.col;
        ctx.fillRect(wx + 24, wy + 130, cardW - 48, 6);
      }

      // Bottom Navigation Bar
      const navY = h - 90;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(0, navY, w, 90);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⌂ Home       ✦ Features       ⚙ Settings       ⚡ Deploy', w / 2, navY + 52);
      ctx.textAlign = 'left';

      // Flag texture for upload to GPU
      if (this.screenTexture) {
        this.screenTexture.needsUpdate = true;
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INTERACTION & 360° ORBIT CONTROLS
    // ══════════════════════════════════════════════════════════════════════════
    setupOrbitEvents(canvas) {
      const onStart = (x, y) => {
        this.isDragging = true;
        this.autoRotate = false;
        this.prevMousePos = { x, y };
      };

      const onMove = (x, y) => {
        if (!this.isDragging) return;
        const dx = x - this.prevMousePos.x;
        const dy = y - this.prevMousePos.y;
        this.prevMousePos = { x, y };

        this.targetRotation.y += dx * 0.008;
        this.targetRotation.x += dy * 0.008;

        // Clamp pitch so device doesn't invert upside down
        this.targetRotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, this.targetRotation.x));
      };

      const onEnd = () => {
        this.isDragging = false;
      };

      canvas.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onEnd);

      // Mobile Touch Support
      canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', onEnd);

      // Wheel Zoom
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.cameraDistance += e.deltaY * 0.005;
        this.cameraDistance = Math.max(3.0, Math.min(12.0, this.cameraDistance));
        if (this.camera) {
          this.camera.position.z = this.cameraDistance;
        }
      }, { passive: false });
    },

    resetView() {
      this.targetRotation = { x: 0.15, y: -0.35 };
      this.cameraDistance = (this.currentDevice === 'curved_display' ? 5.2 : 6.5);
      if (this.camera) this.camera.position.z = this.cameraDistance;
      this.autoRotate = true;
      _sound('click');
    },

    setTheme(theme) {
      this.currentTheme = theme;
      const colMap = {
        cyan: 0x00f3ff,
        purple: 0xa855f7,
        emerald: 0x10b981,
        gold: 0xf59e0b
      };
      const col = colMap[theme] || 0x00f3ff;
      if (this.rimLight) this.rimLight.color.setHex(col);

      document.querySelectorAll('.ar-theme-pill').forEach(btn => {
        if (btn.getAttribute('data-theme') === theme) {
          btn.style.borderColor = '#00f3ff';
          btn.style.boxShadow = '0 0 12px rgba(0, 243, 255, 0.4)';
        } else {
          btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          btn.style.boxShadow = 'none';
        }
      });
      _sound('click');
    },

    // ══════════════════════════════════════════════════════════════════════════
    // WEBCAM IN-ROOM AR INTEGRATION
    // ══════════════════════════════════════════════════════════════════════════
    async toggleAR() {
      const isFr = _isFr();
      const videoEl = document.getElementById('ar-video-stream');
      const studioBackdrop = document.getElementById('ar-studio-backdrop');
      const toggleBtn = document.getElementById('ar-btn-mode-toggle');

      if (this.isArMode) {
        // Switch back to Sci-Fi Studio Void
        this.stopCamera();
        this.isArMode = false;
        if (studioBackdrop) studioBackdrop.style.display = 'block';
        if (videoEl) videoEl.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.innerHTML = '<span>📷</span> ' + (isFr ? 'Activer Mode AR Caméra' : 'Enable Camera AR Mode');
          toggleBtn.style.borderColor = 'rgba(6, 182, 212, 0.5)';
        }
        _sound('click');
        _toast(isFr ? '🌌 Mode Studio Sci-Fi activé' : '🌌 Sci-Fi Studio Void activated', 'info');
      } else {
        // Activate In-Room Camera AR
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          _toast(isFr ? 'Caméra non supportée sur ce navigateur.' : 'Camera not supported on this browser.', 'error');
          return;
        }

        try {
          const constraints = {
            video: {
              facingMode: this.cameraFacing,
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            },
            audio: false
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          this.videoStream = stream;

          if (videoEl) {
            videoEl.srcObject = stream;
            videoEl.style.display = 'block';
            await videoEl.play();
          }

          if (studioBackdrop) studioBackdrop.style.display = 'none';
          this.isArMode = true;

          if (toggleBtn) {
            toggleBtn.innerHTML = '<span>🌌</span> ' + (isFr ? 'Mode Studio Sci-Fi' : 'Switch to Studio Void');
            toggleBtn.style.borderColor = '#10b981';
          }

          _sound('open');
          _toast(isFr ? '📷 Flux AR en direct activé ! Pointez votre caméra.' : '📷 Live AR camera feed active! Point your camera.', 'success');
        } catch(err) {
          console.warn('[UltraARStudio] Camera access error:', err);
          _toast(isFr ? 'Accès caméra refusé ou indisponible.' : 'Camera access denied or unavailable.', 'warning');
        }
      }
    },

    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
      const videoEl = document.getElementById('ar-video-stream');
      if (videoEl) {
        videoEl.srcObject = null;
        videoEl.style.display = 'none';
      }
    },

    // ══════════════════════════════════════════════════════════════════════════
    // ANIMATION & RENDER LOOP
    // ══════════════════════════════════════════════════════════════════════════
    startLoop() {
      this.stopLoop();

      const loop = () => {
        if (!this.isOpen) return;

        this.time += 0.02;

        // Auto-rotation when idle
        if (this.autoRotate) {
          this.targetRotation.y += 0.004;
        }

        // Smooth rotation damping
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

        if (this.deviceGroup) {
          // Zero-gravity floating levitation
          this.deviceGroup.position.y = Math.sin(this.time * 1.5) * 0.12;
          this.deviceGroup.rotation.x = this.currentRotation.x + Math.sin(this.time * 1.0) * 0.02;
          this.deviceGroup.rotation.y = this.currentRotation.y;
          this.deviceGroup.rotation.z = Math.sin(this.time * 0.75) * 0.03;
        }

        // Move sweeping holographic scanline
        if (this.scanlineMesh) {
          this.scanlineMesh.position.y = Math.sin(this.time * 2.2) * 1.8;
        }

        // Orbit stardust particles slowly
        if (this.stardustPoints) {
          this.stardustPoints.rotation.y = this.time * 0.05;
        }

        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }

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

    // ══════════════════════════════════════════════════════════════════════════
    // SNAPSHOT & 1-CLICK INJECTION
    // ══════════════════════════════════════════════════════════════════════════
    snapshot4K() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Capture 4K AR Snapshot')) return;
      const isFr = _isFr();
      if (!this.renderer) return;

      // Force high-res render snapshot
      const canvas = document.getElementById('ar-canvas');
      const videoEl = document.getElementById('ar-video-stream');

      // Create composite canvas
      const compCanvas = document.createElement('canvas');
      compCanvas.width = 1920;
      compCanvas.height = 1080;
      const ctx = compCanvas.getContext('2d');

      // 1. Draw video background if AR mode is active
      if (this.isArMode && videoEl && videoEl.readyState >= 2) {
        ctx.drawImage(videoEl, 0, 0, 1920, 1080);
      } else {
        // Draw luxury dark sci-fi background
        const bgGrad = ctx.createRadialGradient(960, 540, 100, 960, 540, 1100);
        bgGrad.addColorStop(0, '#0a1024');
        bgGrad.addColorStop(0.7, '#040711');
        bgGrad.addColorStop(1, '#000000');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1920, 1080);
      }

      // 2. Draw 3D WebGL Canvas over background
      ctx.drawImage(canvas, 0, 0, 1920, 1080);

      // 3. Watermark
      ctx.fillStyle = 'rgba(0, 243, 255, 0.65)';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText('IA ARCHITECTE STUDIO ULTRA · 3D SPATIAL AR SHOWCASE', 40, 1040);

      const a = document.createElement('a');
      a.download = `spatial-ar-showcase-${this.currentDevice}-${Date.now()}.png`;
      a.href = compCanvas.toDataURL('image/png', 0.95);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      _sound('celebrate');
      _confetti();
      _toast(isFr ? '📸 Capture 4K de l\'hologramme téléchargée !' : '📸 4K Hologram snapshot downloaded!', 'success');
    },

    inject() {
      const devType = this.currentDevice || 'phone';
      const theme = this.currentTheme || 'cyan';
      const themeColors = {
        cyan: '0x00f3ff',
        purple: '0xa855f7',
        emerald: '0x10b981',
        gold: '0xf59e0b'
      };
      const colHex = themeColors[theme] || '0x00f3ff';
      const colCss = (theme === 'purple' ? '#a855f7' : theme === 'emerald' ? '#10b981' : theme === 'gold' ? '#f59e0b' : '#00f3ff');

      const snippet = `
<!-- ═══ ULTRA AR DEVICE HOLOGRAM SHOWCASE WIDGET ═══ -->
<div id="ultra-ar-showcase-card" style="max-width:880px;margin:30px auto;background:#050814;border:1px solid ${colCss}55;border-radius:20px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.85);position:relative;overflow:hidden;font-family:system-ui,sans-serif;color:#fff">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
    <div>
      <h3 style="margin:0;font-size:1.3rem;color:${colCss};text-shadow:0 0 12px ${colCss}55">🪞 Spatial 3D Device Hologram</h3>
      <p style="margin:4px 0 0 0;font-size:0.8rem;color:#94a3b8">Interactive Zero-Gravity 3D Holographic Showcase · Drag to rotate 360° · Scroll to Zoom</p>
    </div>
    <span style="font-size:0.75rem;padding:4px 12px;background:${colCss}22;border:1px solid ${colCss}66;border-radius:12px;color:${colCss};font-weight:700">WebGL 60fps · ${devType.toUpperCase()}</span>
  </div>
  <div id="injected-ar-canvas-box" style="width:100%;height:440px;background:radial-gradient(circle at center, #0e172e 0%, #03050c 100%);border-radius:14px;position:relative;cursor:grab;overflow:hidden;box-shadow:inset 0 0 50px rgba(0,0,0,0.8)">
    <canvas id="injected-ar-canvas" style="width:100%;height:100%;display:block"></canvas>
    <div style="position:absolute;bottom:12px;left:16px;font-size:0.72rem;padding:4px 10px;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:20px;color:#94a3b8;pointer-events:none">
      🖱️ Drag to Rotate 360° · Zero-G Active
    </div>
  </div>
</div>
<script src="js/three.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function() {
  function getThree() {
    if (typeof THREE !== 'undefined' && THREE.WebGLRenderer) return THREE;
    try {
      if (typeof window !== 'undefined' && window.parent && window.parent.THREE && window.parent.THREE.WebGLRenderer) {
        return window.parent.THREE;
      }
    } catch(e) {}
    try {
      if (typeof top !== 'undefined' && top.THREE && top.THREE.WebGLRenderer) {
        return top.THREE;
      }
    } catch(e) {}
    return null;
  }

  function createScreenTextureCanvas() {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 1024;
    sCanvas.height = 1024;
    const sCtx = sCanvas.getContext('2d');
    const sw = 1024, sh = 1024;

    const grad = sCtx.createLinearGradient(0, 0, sw, sh);
    grad.addColorStop(0, '#090d1a');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#05070d');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, sw, sh);

    // Status bar
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    sCtx.fillRect(0, 0, sw, 56);
    sCtx.fillStyle = '#f8fafc';
    sCtx.font = 'bold 22px system-ui, sans-serif';
    sCtx.fillText('9:41', 40, 36);
    sCtx.textAlign = 'right';
    sCtx.fillText('5G  100% 🔋', sw - 40, 36);
    sCtx.textAlign = 'left';

    // App Title
    sCtx.fillStyle = '${colCss}';
    sCtx.font = 'bold 36px system-ui, sans-serif';
    sCtx.fillText('IA Architecte Studio ULTRA', 40, 120);
    sCtx.fillStyle = '#94a3b8';
    sCtx.font = '20px system-ui, sans-serif';
    sCtx.fillText('Autonomous AI Architecture & Spatial AR Display', 40, 160);

    // Hero Card
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    sCtx.strokeStyle = '${colCss}55';
    sCtx.lineWidth = 2;
    sCtx.beginPath();
    if (sCtx.roundRect) sCtx.roundRect(40, 195, sw - 80, 260, 24); else sCtx.rect(40, 195, sw - 80, 260);
    sCtx.fill(); sCtx.stroke();

    sCtx.fillStyle = '#a855f7';
    sCtx.font = 'bold 18px system-ui, sans-serif';
    sCtx.fillText('⚡ REAL-TIME SPATIAL TELEMETRY', 70, 240);
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 54px system-ui, sans-serif';
    sCtx.fillText('99.98% Conversion', 70, 310);
    sCtx.fillStyle = '#10b981';
    sCtx.font = '22px system-ui, sans-serif';
    sCtx.fillText('▲ +42.6% vs Classical 2D Web Layouts', 70, 350);

    // CTA
    const btnGrad = sCtx.createLinearGradient(70, 380, 350, 380);
    btnGrad.addColorStop(0, '${colCss}');
    btnGrad.addColorStop(1, '#8b5cf6');
    sCtx.fillStyle = btnGrad;
    sCtx.beginPath();
    if (sCtx.roundRect) sCtx.roundRect(70, 380, 280, 50, 14); else sCtx.rect(70, 380, 280, 50);
    sCtx.fill();
    sCtx.fillStyle = '#000';
    sCtx.font = 'bold 20px system-ui, sans-serif';
    sCtx.fillText('🚀 LAUNCH EXPERIENCE', 98, 412);

    // 4 Widgets
    const widgets = [
      { t: 'Neural Core v4', s: '98.4ms Latency · Active', c: '${colCss}' },
      { t: 'Hyper 3D Engine', s: '60fps WebGL Pipeline', c: '#a855f7' },
      { t: 'Spatial Audio Lab', s: '12 Dynamic Procedural SFX', c: '#10b981' },
      { t: 'Multiverse Sync', s: '4 Parallel Realities Live', c: '#f59e0b' }
    ];
    for (let i = 0; i < 4; i++) {
      const wx = 40 + (i % 2) * 485;
      const wy = 485 + Math.floor(i / 2) * 215;
      const item = widgets[i];
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      sCtx.strokeStyle = item.c + '55';
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(wx, wy, 455, 190, 18); else sCtx.rect(wx, wy, 455, 190);
      sCtx.fill(); sCtx.stroke();
      sCtx.fillStyle = item.c;
      sCtx.font = 'bold 24px system-ui, sans-serif';
      sCtx.fillText(item.t, wx + 24, wy + 55);
      sCtx.fillStyle = '#cbd5e1';
      sCtx.font = '18px system-ui, sans-serif';
      sCtx.fillText(item.s, wx + 24, wy + 95);
      sCtx.fillStyle = item.c;
      sCtx.fillRect(wx + 24, wy + 130, 407, 6);
    }

    // Nav Bar
    sCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    sCtx.fillRect(0, sh - 90, sw, 90);
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 22px system-ui, sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('⌂ Home       ✦ Features       ⚙ Settings       ⚡ Deploy', sw / 2, sh - 38);
    sCtx.textAlign = 'left';

    return sCanvas;
  }

  function startWebGL(box, canvas, THREE) {
    const w = box.clientWidth || 800;
    const h = box.clientHeight || 440;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch(e) {
      startPureCanvas(box, canvas);
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.z = 6.4;

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(${colHex}, 2.2, 20);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    const sCanvas = createScreenTextureCanvas();
    const screenTex = new THREE.CanvasTexture(sCanvas);
    screenTex.minFilter = THREE.LinearFilter;
    screenTex.magFilter = THREE.LinearFilter;

    const group = new THREE.Group();
    let scanlineMesh = null;

    if ('${devType}' === 'tablet') {
      const slateGeo = new THREE.BoxGeometry(4.4, 3.1, 0.08);
      const slateMat = new THREE.MeshPhysicalMaterial({ color: 0x111c2e, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.85 });
      group.add(new THREE.Mesh(slateGeo, slateMat));
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(slateGeo), new THREE.LineBasicMaterial({ color: ${colHex} })));

      const screenGeo = new THREE.PlaneGeometry(4.2, 2.95);
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.045;
      group.add(screenMesh);
    } else if ('${devType}' === 'curved_display') {
      const radius = 4.0;
      const thetaLength = Math.PI * 0.38;
      const curveGeo = new THREE.CylinderGeometry(radius, radius, 2.4, 36, 1, true, -thetaLength / 2, thetaLength);
      curveGeo.scale(-1, 1, 1);
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide });
      const screenMesh = new THREE.Mesh(curveGeo, screenMat);
      screenMesh.position.z = radius - 1.2;
      group.add(screenMesh);
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(curveGeo), new THREE.LineBasicMaterial({ color: ${colHex} }));
      edge.position.z = radius - 1.2;
      group.add(edge);
    } else {
      // Cyber Phone (default)
      const phoneGeo = new THREE.BoxGeometry(2.1, 4.3, 0.16);
      const phoneMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.2 });
      group.add(new THREE.Mesh(phoneGeo, phoneMat));
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(phoneGeo), new THREE.LineBasicMaterial({ color: ${colHex} })));

      const screenGeo = new THREE.PlaneGeometry(1.97, 4.14);
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.FrontSide });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.085;
      group.add(screenMesh);

      const camGeo = new THREE.BoxGeometry(0.7, 1.2, 0.08);
      const camMat = new THREE.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 });
      const camIsland = new THREE.Mesh(camGeo, camMat);
      camIsland.position.set(-0.55, 1.3, -0.12);
      group.add(camIsland);

      const lensGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x002244, metalness: 0.9, roughness: 0.1 });
      const lens1 = new THREE.Mesh(lensGeo, lensMat); lens1.position.set(-0.55, 1.55, -0.17);
      const lens2 = new THREE.Mesh(lensGeo, lensMat); lens2.position.set(-0.55, 1.05, -0.17);
      group.add(lens1); group.add(lens2);

      const scanGeo = new THREE.PlaneGeometry(1.97, 0.06);
      const scanMat = new THREE.MeshBasicMaterial({ color: ${colHex}, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
      scanlineMesh = new THREE.Mesh(scanGeo, scanMat);
      scanlineMesh.position.z = 0.09;
      group.add(scanlineMesh);
    }

    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.07, color: ${colHex}, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
    const dust = new THREE.Points(pGeo, pMat);
    scene.add(dust);
    scene.add(group);

    let rotX = 0.12, rotY = -0.32, isDown = false, px = 0, py = 0;
    canvas.addEventListener('mousedown', e => { isDown = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      rotY += (e.clientX - px) * 0.008;
      rotX += (e.clientY - py) * 0.008;
      rotX = Math.max(-1.4, Math.min(1.4, rotX));
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', () => isDown = false);

    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) { isDown = true; px = e.touches[0].clientX; py = e.touches[0].clientY; }
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (!isDown || e.touches.length !== 1) return;
      rotY += (e.touches[0].clientX - px) * 0.008;
      rotX += (e.touches[0].clientY - py) * 0.008;
      rotX = Math.max(-1.4, Math.min(1.4, rotX));
      px = e.touches[0].clientX; py = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => isDown = false);

    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3.5, Math.min(12.0, camera.position.z));
    }, { passive: false });

    let t = 0;
    function anim() {
      requestAnimationFrame(anim);
      t += 0.02;
      if (!isDown) rotY += 0.005;
      group.position.y = Math.sin(t * 1.5) * 0.12;
      group.rotation.x = rotX + Math.sin(t * 1.0) * 0.02;
      group.rotation.y = rotY;
      group.rotation.z = Math.sin(t * 0.75) * 0.03;
      dust.rotation.y = t * 0.05;
      if (scanlineMesh) scanlineMesh.position.y = Math.sin(t * 2.2) * 1.8;
      renderer.render(scene, camera);
    }
    anim();
  }

  function startPureCanvas(box, canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = box.clientWidth || 800;
    const h = box.clientHeight || 440;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const sCanvas = createScreenTextureCanvas();

    let rotX = 0.12, rotY = -0.32, isDown = false, px = 0, py = 0;
    let zoom = 1.0;
    canvas.addEventListener('mousedown', e => { isDown = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      rotY += (e.clientX - px) * 0.01;
      rotX += (e.clientY - py) * 0.01;
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', () => isDown = false);
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      zoom = Math.max(0.6, Math.min(1.8, zoom - e.deltaY * 0.001));
    }, { passive: false });

    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: (Math.random() - 0.5) * w * 1.2,
        y: (Math.random() - 0.5) * h * 1.2,
        z: (Math.random() - 0.5) * 400,
        r: Math.random() * 2 + 1
      });
    }

    let t = 0;
    function anim2D() {
      requestAnimationFrame(anim2D);
      t += 0.02;
      if (!isDown) rotY += 0.006;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + Math.sin(t * 1.5) * 10;

      // Orbiting stardust
      ctx.fillStyle = '${colCss}';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = rotY * 0.5 + i;
        const rx = Math.cos(angle) * p.x - Math.sin(angle) * p.z;
        const rz = Math.sin(angle) * p.x + Math.cos(angle) * p.z + 500;
        const scale = 500 / Math.max(100, rz);
        const sx = cx + rx * scale;
        const sy = cy + p.y * scale;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, 1 - rz / 900));
        ctx.beginPath();
        ctx.arc(sx, sy, p.r * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 3D Chassis Projection
      ctx.save();
      ctx.translate(cx, cy);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);

      const dw = 175 * zoom * Math.abs(cosY);
      const dh = 360 * zoom * Math.abs(cosX);

      // Glowing aura & drop shadow
      ctx.shadowColor = '${colCss}';
      ctx.shadowBlur = 35;
      ctx.fillStyle = '#0a0f1d';
      ctx.strokeStyle = '${colCss}';
      ctx.lineWidth = 3;

      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-dw / 2, -dh / 2, dw, dh, 18);
      else ctx.rect(-dw / 2, -dh / 2, dw, dh);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Front screen
      if (cosY > -0.15) {
        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-dw / 2 + 5, -dh / 2 + 5, dw - 10, dh - 10, 14);
        else ctx.rect(-dw / 2 + 5, -dh / 2 + 5, dw - 10, dh - 10);
        ctx.clip();
        ctx.drawImage(sCanvas, -dw / 2 + 5, -dh / 2 + 5, dw - 10, dh - 10);

        // Sweeping laser
        const laserY = -dh / 2 + ((Math.sin(t * 2.2) + 1) / 2) * dh;
        ctx.fillStyle = '${colCss}';
        ctx.globalAlpha = 0.65;
        ctx.fillRect(-dw / 2, laserY, dw, 4);
        ctx.restore();
      } else {
        // Rear chassis & dual camera module
        ctx.fillStyle = '#111827';
        ctx.fill();
        ctx.fillStyle = '#030712';
        ctx.fillRect(-dw * 0.3, -dh * 0.45, dw * 0.6, dh * 0.28);
        ctx.fillStyle = '${colCss}';
        ctx.beginPath();
        ctx.arc(0, -dh * 0.38, 14 * zoom, 0, Math.PI * 2);
        ctx.arc(0, -dh * 0.25, 14 * zoom, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
    anim2D();
  }

  let attempts = 0;
  function startHolo() {
    const box = document.getElementById('injected-ar-canvas-box');
    const canvas = document.getElementById('injected-ar-canvas');
    if (!box || !canvas) return;

    const THREE = getThree();
    if (THREE) {
      startWebGL(box, canvas, THREE);
    } else {
      if (attempts++ < 30) {
        setTimeout(startHolo, 50);
      } else {
        startPureCanvas(box, canvas);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startHolo);
  } else {
    startHolo();
  }
})();
<\/script>
<!-- ═══ END ULTRA AR DEVICE HOLOGRAM SHOWCASE WIDGET ═══ -->
`;

      const markerRegex = /<!-- ═══ ULTRA AR DEVICE HOLOGRAM[\s\S]*?<!-- ═══ END ULTRA AR DEVICE[\s\S]*?-->/g;
      _injectCodeToActiveApp(snippet.trim(), markerRegex, '🪞 Spatial 3D Hologram Showcase');
    },

    exportStandalone() {
      if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export Standalone AR Showcase')) return;
      const isFr = _isFr();
      const devType = this.currentDevice || 'phone';
      const theme = this.currentTheme || 'cyan';
      const themeColors = {
        cyan: '0x00f3ff',
        purple: '0xa855f7',
        emerald: '0x10b981',
        gold: '0xf59e0b'
      };
      const colHex = themeColors[theme] || '0x00f3ff';
      const colCss = (theme === 'purple' ? '#a855f7' : theme === 'emerald' ? '#10b981' : theme === 'gold' ? '#f59e0b' : '#00f3ff');

      const htmlContent = `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ultra 3D Hologram Spatial Showcase</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0;
      overflow: hidden;
      background: radial-gradient(circle at center, #0e172e 0%, #03050c 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
    }
    #canvas-container {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      cursor: grab;
    }
    #canvas-container:active {
      cursor: grabbing;
    }
    #camera-feed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      display: none;
      z-index: 5;
    }
    .hud-top {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
      z-index: 20;
      pointer-events: none;
    }
    .hud-title-box {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 14px 22px;
      border-radius: 16px;
      border: 1px solid rgba(0, 243, 255, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    .hud-title {
      font-size: 1.15rem;
      color: ${colCss};
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hud-sub {
      font-size: 0.78rem;
      color: #94a3b8;
      margin-top: 4px;
    }
    .hud-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 10px 16px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    .hud-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #cbd5e1;
      padding: 7px 14px;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .hud-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .hud-btn.active {
      border-color: ${colCss};
      background: rgba(0, 243, 255, 0.15);
      color: ${colCss};
      box-shadow: 0 0 12px rgba(0, 243, 255, 0.35);
    }
    .theme-circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.2s, border-color 0.2s;
    }
    .theme-circle:hover {
      transform: scale(1.15);
    }
    .theme-circle.active {
      border-color: #fff;
      box-shadow: 0 0 10px #fff;
      transform: scale(1.2);
    }
    .hud-bottom {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 8px 18px;
      font-size: 0.75rem;
      color: #94a3b8;
      z-index: 20;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
  <script>if(typeof THREE==='undefined'){document.write('<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"><\\/script>');}<\/script>
  <script>if(typeof THREE==='undefined'){document.write('<script src="https://unpkg.com/three@0.128.0/build/three.min.js"><\\/script>');}<\/script>
</head>
<body>
  <video id="camera-feed" playsinline autoplay muted></video>

  <div class="hud-top">
    <div class="hud-title-box">
      <div class="hud-title" id="hud-main-title">
        <span>🪞</span>
        <span>Ultra Spatial 3D Hologram Showcase</span>
      </div>
      <div class="hud-sub">
        Interactive Zero-Gravity WebGL Spatial Hologram · Drag 360° · Scroll to Zoom
      </div>
    </div>

    <div class="hud-controls">
      <!-- Models -->
      <button class="hud-btn model-btn ${devType === 'phone' ? 'active' : ''}" data-model="phone" onclick="switchModel('phone')">📱 Phone</button>
      <button class="hud-btn model-btn ${devType === 'tablet' ? 'active' : ''}" data-model="tablet" onclick="switchModel('tablet')">📟 Slate</button>
      <button class="hud-btn model-btn ${devType === 'curved_display' ? 'active' : ''}" data-model="curved_display" onclick="switchModel('curved_display')">🖥️ Cockpit</button>
      
      <div style="width: 1px; height: 18px; background: rgba(255, 255, 255, 0.15); margin: 0 4px;"></div>
      
      <!-- Themes -->
      <div class="theme-circle ${theme === 'cyan' ? 'active' : ''}" data-theme="cyan" style="background: #00f3ff;" onclick="switchTheme('cyan', 0x00f3ff, '#00f3ff')"></div>
      <div class="theme-circle ${theme === 'purple' ? 'active' : ''}" data-theme="purple" style="background: #a855f7;" onclick="switchTheme('purple', 0xa855f7, '#a855f7')"></div>
      <div class="theme-circle ${theme === 'emerald' ? 'active' : ''}" data-theme="emerald" style="background: #10b981;" onclick="switchTheme('emerald', 0x10b981, '#10b981')"></div>
      <div class="theme-circle ${theme === 'gold' ? 'active' : ''}" data-theme="gold" style="background: #f59e0b;" onclick="switchTheme('gold', 0xf59e0b, '#f59e0b')"></div>

      <div style="width: 1px; height: 18px; background: rgba(255, 255, 255, 0.15); margin: 0 4px;"></div>

      <!-- AR & Controls -->
      <button class="hud-btn" id="btn-cam-ar" onclick="toggleCameraAR()">📷 Camera AR</button>
      <button class="hud-btn" onclick="resetOrbit()">↺ Reset</button>
      <button class="hud-btn" onclick="toggleFullscreen()">⛶</button>
    </div>
  </div>

  <div class="hud-bottom">
    <span>🖱️ Drag to rotate 360°</span>
    <span>•</span>
    <span>🔍 Scroll to zoom</span>
    <span>•</span>
    <span style="color: #10b981; font-weight: 700;">🟢 Zero-G Active</span>
  </div>

  <div id="canvas-container"></div>

  <script>
  (function() {
    let currentDevice = '${devType}';
    let currentHex = ${colHex};
    let currentCss = '${colCss}';

    function createScreenTextureCanvas(accentColor) {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 1024;
      sCanvas.height = 1024;
      const sCtx = sCanvas.getContext('2d');
      const sw = 1024, sh = 1024;

      const grad = sCtx.createLinearGradient(0, 0, sw, sh);
      grad.addColorStop(0, '#090d1a');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#05070d');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, sw, sh);

      // Status bar
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      sCtx.fillRect(0, 0, sw, 56);
      sCtx.fillStyle = '#f8fafc';
      sCtx.font = 'bold 22px system-ui, sans-serif';
      sCtx.fillText('9:41', 40, 36);
      sCtx.textAlign = 'right';
      sCtx.fillText('5G  100% 🔋', sw - 40, 36);
      sCtx.textAlign = 'left';

      // App Title
      sCtx.fillStyle = accentColor;
      sCtx.font = 'bold 36px system-ui, sans-serif';
      sCtx.fillText('IA Architecte Studio ULTRA', 40, 120);
      sCtx.fillStyle = '#94a3b8';
      sCtx.font = '20px system-ui, sans-serif';
      sCtx.fillText('Autonomous AI Architecture & Spatial AR Display', 40, 160);

      // Hero Card
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      sCtx.strokeStyle = accentColor + '55';
      sCtx.lineWidth = 2;
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(40, 195, sw - 80, 260, 24); else sCtx.rect(40, 195, sw - 80, 260);
      sCtx.fill(); sCtx.stroke();

      sCtx.fillStyle = '#a855f7';
      sCtx.font = 'bold 18px system-ui, sans-serif';
      sCtx.fillText('⚡ REAL-TIME SPATIAL TELEMETRY', 70, 240);
      sCtx.fillStyle = '#ffffff';
      sCtx.font = 'bold 54px system-ui, sans-serif';
      sCtx.fillText('99.98% Conversion', 70, 310);
      sCtx.fillStyle = '#10b981';
      sCtx.font = '22px system-ui, sans-serif';
      sCtx.fillText('▲ +42.6% vs Classical 2D Web Layouts', 70, 350);

      // CTA
      const btnGrad = sCtx.createLinearGradient(70, 380, 350, 380);
      btnGrad.addColorStop(0, accentColor);
      btnGrad.addColorStop(1, '#8b5cf6');
      sCtx.fillStyle = btnGrad;
      sCtx.beginPath();
      if (sCtx.roundRect) sCtx.roundRect(70, 380, 280, 50, 14); else sCtx.rect(70, 380, 280, 50);
      sCtx.fill();
      sCtx.fillStyle = '#000';
      sCtx.font = 'bold 20px system-ui, sans-serif';
      sCtx.fillText('🚀 LAUNCH EXPERIENCE', 98, 412);

      // 4 Widgets
      const widgets = [
        { t: 'Neural Core v4', s: '98.4ms Latency · Active', c: accentColor },
        { t: 'Hyper 3D Engine', s: '60fps WebGL Pipeline', c: '#a855f7' },
        { t: 'Spatial Audio Lab', s: '12 Dynamic Procedural SFX', c: '#10b981' },
        { t: 'Multiverse Sync', s: '4 Parallel Realities Live', c: '#f59e0b' }
      ];
      for (let i = 0; i < 4; i++) {
        const wx = 40 + (i % 2) * 485;
        const wy = 485 + Math.floor(i / 2) * 215;
        const item = widgets[i];
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        sCtx.strokeStyle = item.c + '55';
        sCtx.beginPath();
        if (sCtx.roundRect) sCtx.roundRect(wx, wy, 455, 190, 18); else sCtx.rect(wx, wy, 455, 190);
        sCtx.fill(); sCtx.stroke();
        sCtx.fillStyle = item.c;
        sCtx.font = 'bold 24px system-ui, sans-serif';
        sCtx.fillText(item.t, wx + 24, wy + 55);
        sCtx.fillStyle = '#cbd5e1';
        sCtx.font = '18px system-ui, sans-serif';
        sCtx.fillText(item.s, wx + 24, wy + 95);
        sCtx.fillStyle = item.c;
        sCtx.fillRect(wx + 24, wy + 130, 407, 6);
      }

      // Nav Bar
      sCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      sCtx.fillRect(0, sh - 90, sw, 90);
      sCtx.fillStyle = '#ffffff';
      sCtx.font = 'bold 22px system-ui, sans-serif';
      sCtx.textAlign = 'center';
      sCtx.fillText('⌂ Home       ✦ Features       ⚙ Settings       ⚡ Deploy', sw / 2, sh - 38);
      sCtx.textAlign = 'left';

      return sCanvas;
    }

    const container = document.getElementById('canvas-container');

    if (typeof THREE === 'undefined') {
      runPureCanvasEngine();
      return;
    }

    function runPureCanvasEngine() {
      const cv = document.createElement('canvas');
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      container.appendChild(cv);
      const ctx = cv.getContext('2d');

      let sTex = createScreenTextureCanvas(currentCss);
      let rotX = 0.12, rotY = -0.32, zoom = 1.0;
      let isDown = false, px = 0, py = 0, t = 0;

      const particles = Array.from({ length: 60 }, () => ({
        x: (Math.random() - 0.5) * window.innerWidth,
        y: (Math.random() - 0.5) * window.innerHeight,
        sz: Math.random() * 2 + 1
      }));

      function renderFrame() {
        requestAnimationFrame(renderFrame);
        t += 0.02;
        if (!isDown) rotY += 0.005;

        ctx.clearRect(0, 0, cv.width, cv.height);

        // Stardust
        ctx.fillStyle = currentCss;
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(cv.width / 2 + p.x, cv.height / 2 + p.y + Math.sin(t + p.x) * 10, p.sz, 0, Math.PI * 2);
          ctx.globalAlpha = 0.4;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        // Floating 3D Device
        ctx.save();
        ctx.translate(cv.width / 2, cv.height / 2 + Math.sin(t * 1.5) * 12);
        ctx.scale(zoom, zoom);

        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const dw = (currentDevice === 'tablet' ? 440 : currentDevice === 'curved_display' ? 520 : 300);
        const dh = (currentDevice === 'tablet' ? 310 : currentDevice === 'curved_display' ? 320 : 600);

        ctx.shadowColor = currentCss;
        ctx.shadowBlur = 30;

        ctx.save();
        ctx.transform(cosY, sinY * sinX * 0.4, 0, cosX, 0, 0);

        // Titanium chassis
        ctx.fillStyle = '#0b1120';
        ctx.strokeStyle = currentCss;
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-dw / 2, -dh / 2, dw, dh, 22); else ctx.rect(-dw / 2, -dh / 2, dw, dh);
        ctx.fill();
        ctx.stroke();

        // Screen texture
        ctx.shadowBlur = 0;
        ctx.drawImage(sTex, -dw / 2 + 8, -dh / 2 + 8, dw - 16, dh - 16);

        // Sweeping laser scanline
        const scanY = (-dh / 2 + 15) + ((Math.sin(t * 2.2) + 1) / 2) * (dh - 30);
        const scanGrad = ctx.createLinearGradient(-dw / 2 + 10, scanY, dw / 2 - 10, scanY);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, currentCss);
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(-dw / 2 + 10, scanY, dw - 20, 4);

        ctx.restore();
        ctx.restore();
      }
      renderFrame();

      window.switchModel = function(type) {
        currentDevice = type;
        sTex = createScreenTextureCanvas(currentCss);
        document.querySelectorAll('.model-btn').forEach(btn => {
          if (btn.getAttribute('data-model') === type) btn.classList.add('active');
          else btn.classList.remove('active');
        });
      };

      window.switchTheme = function(name, hex, css) {
        currentHex = hex;
        currentCss = css;
        sTex = createScreenTextureCanvas(currentCss);
        const titleEl = document.getElementById('hud-main-title');
        if (titleEl) titleEl.style.color = css;
        document.querySelectorAll('.theme-circle').forEach(c => {
          if (c.getAttribute('data-theme') === name) c.classList.add('active');
          else c.classList.remove('active');
        });
      };

      window.resetOrbit = function() { rotX = 0.12; rotY = -0.32; zoom = 1.0; };
      window.toggleFullscreen = function() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      };

      let isCameraActive = false;
      let cameraStream = null;
      window.toggleCameraAR = async function() {
        const videoEl = document.getElementById('camera-feed');
        const btn = document.getElementById('btn-cam-ar');
        if (isCameraActive) {
          if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
          if (videoEl) videoEl.style.display = 'none';
          document.body.style.background = 'radial-gradient(circle at center, #0e172e 0%, #03050c 100%)';
          btn.textContent = '📷 Camera AR';
          btn.classList.remove('active');
          isCameraActive = false;
        } else {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Camera is not supported on this device/browser.');
            return;
          }
          try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
              audio: false
            });
            if (videoEl) {
              videoEl.srcObject = cameraStream;
              videoEl.style.display = 'block';
              await videoEl.play();
            }
            document.body.style.background = 'transparent';
            btn.textContent = '✕ Exit AR';
            btn.classList.add('active');
            isCameraActive = true;
          } catch(err) {
            alert('Could not access camera: ' + err.message);
          }
        }
      };

      window.addEventListener('mousedown', e => { isDown = true; px = e.clientX; py = e.clientY; });
      window.addEventListener('mousemove', e => {
        if (!isDown) return;
        rotY += (e.clientX - px) * 0.008;
        rotX += (e.clientY - py) * 0.008;
        rotX = Math.max(-1.4, Math.min(1.4, rotX));
        px = e.clientX; py = e.clientY;
      });
      window.addEventListener('mouseup', () => isDown = false);

      window.addEventListener('touchstart', e => {
        if (e.touches.length === 1) { isDown = true; px = e.touches[0].clientX; py = e.touches[0].clientY; }
      }, { passive: true });
      window.addEventListener('touchmove', e => {
        if (!isDown || e.touches.length !== 1) return;
        rotY += (e.touches[0].clientX - px) * 0.008;
        rotX += (e.touches[0].clientY - py) * 0.008;
        rotX = Math.max(-1.4, Math.min(1.4, rotX));
        px = e.touches[0].clientX; py = e.touches[0].clientY;
      }, { passive: true });
      window.addEventListener('touchend', () => isDown = false);

      window.addEventListener('wheel', e => {
        e.preventDefault();
        zoom += e.deltaY * -0.001;
        zoom = Math.max(0.5, Math.min(2.5, zoom));
      }, { passive: false });

      window.addEventListener('resize', () => {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
      });
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(currentHex, 2.2, 20);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    // Orbiting Cosmic Stardust
    const pCount = 240;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.08, color: currentHex, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
    const dust = new THREE.Points(pGeo, pMat);
    scene.add(dust);

    let deviceGroup = new THREE.Group();
    scene.add(deviceGroup);
    let scanlineMesh = null;
    let screenTex = null;

    function buildDevice(type, hex, css) {
      while (deviceGroup.children.length > 0) {
        const obj = deviceGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        deviceGroup.remove(obj);
      }

      const sCanvas = createScreenTextureCanvas(css);
      screenTex = new THREE.CanvasTexture(sCanvas);
      screenTex.minFilter = THREE.LinearFilter;
      screenTex.magFilter = THREE.LinearFilter;

      scanlineMesh = null;

      if (type === 'tablet') {
        const slateGeo = new THREE.BoxGeometry(4.4, 3.1, 0.08);
        const slateMat = new THREE.MeshPhysicalMaterial({ color: 0x111c2e, metalness: 0.2, roughness: 0.1, transparent: true, opacity: 0.85 });
        deviceGroup.add(new THREE.Mesh(slateGeo, slateMat));
        deviceGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(slateGeo), new THREE.LineBasicMaterial({ color: hex })));

        const screenGeo = new THREE.PlaneGeometry(4.2, 2.95);
        const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide });
        const screenMesh = new THREE.Mesh(screenGeo, screenMat);
        screenMesh.position.z = 0.045;
        deviceGroup.add(screenMesh);
        camera.position.z = 6.8;
      } else if (type === 'curved_display') {
        const radius = 4.0;
        const thetaLength = Math.PI * 0.38;
        const curveGeo = new THREE.CylinderGeometry(radius, radius, 2.4, 36, 1, true, -thetaLength / 2, thetaLength);
        curveGeo.scale(-1, 1, 1);
        const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide });
        const screenMesh = new THREE.Mesh(curveGeo, screenMat);
        screenMesh.position.z = radius - 1.2;
        deviceGroup.add(screenMesh);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(curveGeo), new THREE.LineBasicMaterial({ color: hex }));
        edge.position.z = radius - 1.2;
        deviceGroup.add(edge);
        camera.position.z = 5.6;
      } else {
        // Cyber Phone
        const phoneGeo = new THREE.BoxGeometry(2.1, 4.3, 0.16);
        const phoneMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.88, roughness: 0.2 });
        deviceGroup.add(new THREE.Mesh(phoneGeo, phoneMat));
        deviceGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(phoneGeo), new THREE.LineBasicMaterial({ color: hex })));

        const screenGeo = new THREE.PlaneGeometry(1.97, 4.14);
        const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.FrontSide });
        const screenMesh = new THREE.Mesh(screenGeo, screenMat);
        screenMesh.position.z = 0.085;
        deviceGroup.add(screenMesh);

        const camGeo = new THREE.BoxGeometry(0.7, 1.2, 0.08);
        const camMat = new THREE.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.95, roughness: 0.15 });
        const camIsland = new THREE.Mesh(camGeo, camMat);
        camIsland.position.set(-0.55, 1.3, -0.12);
        deviceGroup.add(camIsland);

        const lensGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
        lensGeo.rotateX(Math.PI / 2);
        const lensMat = new THREE.MeshStandardMaterial({ color: 0x002244, metalness: 0.9, roughness: 0.1 });
        const lens1 = new THREE.Mesh(lensGeo, lensMat); lens1.position.set(-0.55, 1.55, -0.17);
        const lens2 = new THREE.Mesh(lensGeo, lensMat); lens2.position.set(-0.55, 1.05, -0.17);
        deviceGroup.add(lens1); deviceGroup.add(lens2);

        const scanGeo = new THREE.PlaneGeometry(1.97, 0.06);
        const scanMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
        scanlineMesh = new THREE.Mesh(scanGeo, scanMat);
        scanlineMesh.position.z = 0.09;
        deviceGroup.add(scanlineMesh);
        camera.position.z = 6.4;
      }
    }

    buildDevice(currentDevice, currentHex, currentCss);

    // Interactive Model Switching
    window.switchModel = function(type) {
      currentDevice = type;
      buildDevice(currentDevice, currentHex, currentCss);
      document.querySelectorAll('.model-btn').forEach(btn => {
        if (btn.getAttribute('data-model') === type) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    };

    // Interactive Theme Switching
    window.switchTheme = function(name, hex, css) {
      currentHex = hex;
      currentCss = css;
      rimLight.color.setHex(hex);
      pMat.color.setHex(hex);
      buildDevice(currentDevice, currentHex, currentCss);

      const titleEl = document.getElementById('hud-main-title');
      if (titleEl) titleEl.style.color = css;

      document.querySelectorAll('.theme-circle').forEach(c => {
        if (c.getAttribute('data-theme') === name) c.classList.add('active');
        else c.classList.remove('active');
      });
    };

    // Reset Orbit
    window.resetOrbit = function() {
      rotX = 0.12;
      rotY = -0.32;
      camera.position.z = (currentDevice === 'tablet' ? 6.8 : currentDevice === 'curved_display' ? 5.6 : 6.4);
    };

    // Fullscreen
    window.toggleFullscreen = function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    // WebRTC Camera AR Mode
    let isCameraActive = false;
    let cameraStream = null;
    window.toggleCameraAR = async function() {
      const videoEl = document.getElementById('camera-feed');
      const btn = document.getElementById('btn-cam-ar');
      if (isCameraActive) {
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          cameraStream = null;
        }
        if (videoEl) videoEl.style.display = 'none';
        document.body.style.background = 'radial-gradient(circle at center, #0e172e 0%, #03050c 100%)';
        btn.textContent = '📷 Camera AR';
        btn.classList.remove('active');
        isCameraActive = false;
      } else {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert('Camera is not supported on this device/browser.');
          return;
        }
        try {
          cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false
          });
          if (videoEl) {
            videoEl.srcObject = cameraStream;
            videoEl.style.display = 'block';
            await videoEl.play();
          }
          document.body.style.background = 'transparent';
          btn.textContent = '✕ Exit AR';
          btn.classList.add('active');
          isCameraActive = true;
        } catch(err) {
          alert('Could not access camera: ' + err.message);
        }
      }
    };

    // Interaction Controls
    let rotX = 0.12, rotY = -0.32, isDown = false, px = 0, py = 0;
    window.addEventListener('mousedown', e => { isDown = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      rotY += (e.clientX - px) * 0.008;
      rotX += (e.clientY - py) * 0.008;
      rotX = Math.max(-1.4, Math.min(1.4, rotX));
      px = e.clientX; py = e.clientY;
    });
    window.addEventListener('mouseup', () => isDown = false);

    window.addEventListener('touchstart', e => {
      if (e.touches.length === 1) { isDown = true; px = e.touches[0].clientX; py = e.touches[0].clientY; }
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (!isDown || e.touches.length !== 1) return;
      rotY += (e.touches[0].clientX - px) * 0.008;
      rotX += (e.touches[0].clientY - py) * 0.008;
      rotX = Math.max(-1.4, Math.min(1.4, rotX));
      px = e.touches[0].clientX; py = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => isDown = false);

    window.addEventListener('wheel', e => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3.2, Math.min(14.0, camera.position.z));
    }, { passive: false });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 60fps Loop
    let t = 0;
    function anim() {
      requestAnimationFrame(anim);
      t += 0.02;
      if (!isDown) rotY += 0.005;
      deviceGroup.position.y = Math.sin(t * 1.5) * 0.12;
      deviceGroup.rotation.x = rotX + Math.sin(t * 1.0) * 0.02;
      deviceGroup.rotation.y = rotY;
      deviceGroup.rotation.z = Math.sin(t * 0.75) * 0.03;
      dust.rotation.y = t * 0.05;
      if (scanlineMesh) scanlineMesh.position.y = Math.sin(t * 2.2) * 1.8;
      renderer.render(scene, camera);
    }
    anim();
  })();
  <\/script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `spatial-ar-showcase-${devType}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

      _sound('celebrate');
      _toast(isFr ? '💾 Présentation 3D autonome téléchargée avec succès !' : '💾 Standalone 3D presentation downloaded successfully!', 'success');
    }
  };

  // Expose globally
  window.UltraARStudio = UltraARStudio;
})();
